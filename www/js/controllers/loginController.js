function LoginController(drupalClient, messageService, $scope) {
	var vm = this;

	vm._drupalClient = drupalClient;
	vm._messageService = messageService;
	vm._scope = $scope;

	vm.username = '';
	vm.password = '';
	vm.isLoggedIn = false;

	vm.isBusy = true;

	drupalClient.systemConnect(function(sessionData) {
		vm.isLoggedIn = sessionData.user.uid !== 0;
		vm.isBusy = false;
		$scope.$apply();
	}, function(){
		vm.isLoggedIn = false;
		vm.isBusy = false;
		$scope.$apply();
	});
};

LoginController.prototype.login = function() {
	var vm = this;
	vm.isBusy = true;
		vm._drupalClient.login(vm.username, vm.password,
	      function (userData) {
	          vm._messageService.broadcast('loginSuccessful');
	          vm.isLoggedIn = true;
	          vm.isBusy = false;
	          vm._scope.$apply();
	      },
	      function (err) {
	          vm.isLoggedIn = false;
	          vm.isBusy = false;
	          // TODO: error handling
	          vm._scope.$apply();
	      });
};

LoginController.prototype.logout = function() {
	var vm = this;
	vm.isBusy = true;
		vm._drupalClient.logout(function() {
			vm._messageService.broadcast('logoutSuccessful');
			vm.isLoggedIn = false;
			vm.isBusy = false;
			vm._scope.$apply();
		}, function(err) {
			// TODO: error handling
			vm.isBusy = false;
			vm._scope.$apply();
		});
};