function LoginController(gentleSite, messageService, $mdToast) {
	var vm = this;

	vm._gentleSite = gentleSite;
	vm._messageService = messageService;
	vm._mdToast = $mdToast;

	vm.username = '';
	vm.password = '';
	vm.isLoggedIn = false;

	vm.isBusy = true;
};

LoginController.prototype.login = function() {
	var vm = this;
	vm.isBusy = true;
	vm._gentleSite.login(vm.username, vm.password).then(function() {
		vm._messageService.broadcast('loginSuccessful');
		vm.isLoggedIn = true;
		vm.isBusy = false;
	});
	/*
	,
      function (userData) {

          vm._scope.$apply();
      },
      function (err) {
          vm.isLoggedIn = false;
          vm.isBusy = false;
          // TODO: unit test toast
          vm._mdToast.show(vm._mdToast.simple().content('Het inloggen is mislukt.'));
          vm._scope.$apply();
      }, vm._headers*/
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
