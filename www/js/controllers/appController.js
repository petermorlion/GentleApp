function AppController(messageService, $scope) {
	var vm = this;

	vm.isMenuOpen = false;

	vm.menuItems = [
		{ sref: 'app.home', label: 'Home' },
		{ sref: 'app.login', label: 'Inloggen' },
	];

	$scope.$on('loginSuccessful', function(){
		for (var i = 0; i < vm.menuItems.length; i++) {
			if (vm.menuItems[i].sref === 'app.login') {
				vm.menuItems[i].label = 'Afmelden';
			}
		};
	});

	$scope.$on('logoutSuccessful', function(){
		for (var i = 0; i < vm.menuItems.length; i++) {
			if (vm.menuItems[i].sref === 'app.login') {
				vm.menuItems[i].label = 'Inloggen';
			}
		};
	});
}

AppController.prototype.closeMenu = function() {
	this.isMenuOpen = false;
};

AppController.prototype.openMenu = function() {
	this.isMenuOpen = true;
};