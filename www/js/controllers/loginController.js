function LoginController(drupalClient, messageService, $scope) {
	var vm = this;

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

	vm.login = function() {
		vm.isBusy = true;
		drupalClient.login(vm.username, vm.password,
	      function (userData) {
	          messageService.broadcast('loginSuccessful');
	          vm.isLoggedIn = true;
	          vm.isBusy = false;
	          $scope.$apply();
	      },
	      function (err) {
	          vm.isLoggedIn = false;
	          vm.isBusy = false;
	          alert(err);
	          $scope.$apply();
	      });
	};

	vm.logout = function() {
		vm.isBusy = true;
		drupalClient.logout(function() {
			messageService.broadcast('logoutSuccessful');
			vm.isLoggedIn = false;
			vm.isBusy = false;
			$scope.$apply();
		}, function(err) {
			alert(err);
			vm.isBusy = false;
			$scope.$apply();
		});
	}
};