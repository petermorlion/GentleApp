function LoginController(drupalClient, messageService, $scope, $mdToast) {
	var vm = this;

	vm._drupalClient = drupalClient;
	vm._messageService = messageService;
	vm._scope = $scope;
	vm._mdToast = $mdToast;
	vm._headers = {'Content-Type': 'application/x-www-form-urlencoded'};

	vm.username = '';
	vm.password = '';
	vm.isLoggedIn = false;

	vm.isBusy = true;

	drupalClient.systemConnect(function(sessionData) {
		vm.isLoggedIn = sessionData.user.uid !== 0;
		vm.isBusy = false;
		$scope.$apply();
	}, function(err){
		// TODO: unit test toast
		alert(err);
	    $mdToast.show(vm._mdToast.simple().content('Het inloggen is mislukt.'));
		vm.isLoggedIn = false;
		vm.isBusy = false;
		$scope.$apply();
	}, vm._headers);
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
	          // TODO: unit test toast
	          vm._mdToast.show(vm._mdToast.simple().content('Het inloggen is mislukt.'));
	          vm._scope.$apply();
	      }, vm._headers);
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
		}, vm._headers);
};