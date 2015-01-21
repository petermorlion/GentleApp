function AppController(messageService, $scope, gentleSite, $state) {
	var vm = this;

	vm._headers = {'Content-Type': 'application/json'};

	vm._state = $state;

	vm.isMenuOpen = false;
	vm.isMenuVisible = false;
	vm.menuItems = [];

	$scope.$on('$viewContentLoaded', function(event, viewConfig){
		if (!gentleSite.isLoggedIn) {
			vm.onLoggedOut();
		}
	});

	$scope.$on('loginSuccessful', function() { vm.onLoggedIn(); });

	$scope.$on('logoutSuccessful', function() { vm.onLoggedOut(); });

	console.log('Created AppController');
}

AppController.prototype.closeMenu = function() {
	this.isMenuOpen = false;
};

AppController.prototype.openMenu = function() {
	this.isMenuOpen = true;
};

AppController.prototype.onLoggedIn = function() {
	this.menuItems = [
		{ sref: 'app.home', label: 'Home' },
		{ sref: 'app.saldo', label: 'Saldo' },
		{ sref: 'app.login', label: 'Afmelden' },
	];

	// TODO: test, UI, manual test
	this.isMenuVisible = true;
};

AppController.prototype.onLoggedOut = function() {
	// TODO: test, UI, manual test
	this.isMenuVisible = false;
	this._state.go('app.login');
};
