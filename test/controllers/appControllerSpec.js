describe('An appController, when viewContentLoading and not logged in', function() {
	var messageService, scope, gentleSite, sessionData, state = null
	var eventHandler = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function(eventName, callback) {
				if (eventName === '$viewContentLoaded') {
					eventHandler = callback;
				}
			}
		};
		spyOn(scope, '$on').and.callThrough();

		sessionData = {
	    	user: {
	        	uid: 0
	      	}
	    };

		gentleSite = {
			isLoggedIn: false
		};

		state = {
			go: function(to) {}
		};

		spyOn(state, 'go');
	});

	it('should redirect to the login page', function() {
		var appController = new AppController(messageService, scope, gentleSite, state);

		eventHandler();

		expect(state.go).toHaveBeenCalledWith('app.login');

		expect(scope.$on).toHaveBeenCalledWith('$viewContentLoaded', jasmine.any(Function));
	});
});

describe('An appController, when closing the menu', function() {
	var messageService, scope, rootScope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};

		rootScope = {
			$on: function() {}
		};
	});

	it('should set the menu as closed', function() {
		var appController = new AppController(messageService, scope, null, null, rootScope);

		appController.closeMenu();

		expect(appController.isMenuOpen).toBe(false);
	});
});

describe('An appController, when opening the menu', function() {
	var messageService, scope, rootScope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};
		
		rootScope = {
			$on: function() {}
		};
	});

	it('should set the menu as opened', function() {
		var appController = new AppController(messageService, scope, null, null, rootScope);

		appController.openMenu();

		expect(appController.isMenuOpen).toBe(true);
	});
});
