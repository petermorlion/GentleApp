function LoginController(gentleSite, messageService, $mdToast) {
	var vm = this;

	vm._gentleSite = gentleSite;
	vm._messageService = messageService;
	vm._mdToast = $mdToast;

	vm.username = '';
	vm.password = '';
	vm.isLoggedIn = gentleSite.isLoggedIn;

	vm.isBusy = false;
}

LoginController.prototype.login = function() {
	var vm = this;
	vm.isBusy = true;
	vm._gentleSite.login(vm.username, vm.password).then(function() {
		vm._messageService.broadcast('loginSuccessful');
		vm.isLoggedIn = true;
		vm.isBusy = false;
	}).catch(function() {
		vm.isLoggedIn = false;
		vm.isBusy = false;
		vm._mdToast.show(vm._mdToast.simple().content('Het inloggen is mislukt.'));
	});
};

LoginController.prototype.logout = function() {
	var vm = this;
	vm.isBusy = true;
	vm._gentleSite.logout().then(function() {
		vm._messageService.broadcast('logoutSuccessful');
		vm.isLoggedIn = false;
		vm.isBusy = false;
	}).catch(function() {
		vm.isLoggedIn = false;
		vm.isBusy = false;
		vm._mdToast.show(vm._mdToast.simple().content('Het uitloggen is mislukt.'));
	});
};
