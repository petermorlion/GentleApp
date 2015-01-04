function AppController(messageService, $scope, drupalClient, $state, $rootScope) {
	var vm = this;

	vm._headers = {'Content-Type': 'application/json'};

	vm.isMenuOpen = false;

	vm.menuItems = [
		{ sref: 'app.home', label: 'Home' },
		{ sref: 'app.login', label: 'Inloggen' },
	];

	$rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
	    drupalClient.systemConnect(function(sessionData) {
			if (sessionData.user.uid !== 0) {
				// TODO: test, UI, manual test
				vm.isBusy = false;
			}
			else {
				$state.go('app.login');
			}
		}, function(err){
			// TODO: handle error
		}, vm._headers);
	});

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