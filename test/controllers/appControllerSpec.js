describe('An appController, when viewContentLoading and not logged in', function() {
	var messageService, scope, drupalClient, sessionData, state = null
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

		drupalClient = {
			systemConnect: function(success, error) {
		        success(sessionData);
		    }
		};

		spyOn(drupalClient, 'systemConnect').and.callThrough();

		state = {
			go: function(to) {}
		};

		spyOn(state, 'go');
	});

	it('should redirect to the login page', function() {
		var appController = new AppController(messageService, scope, drupalClient, state);

		eventHandler();

		expect(drupalClient.systemConnect).toHaveBeenCalledWith(
	      	jasmine.any(Function),
	      	jasmine.any(Function),
	      	jasmine.objectContaining({'Content-Type': 'application/json'}));

		expect(state.go).toHaveBeenCalledWith('app.login');

		expect(scope.$on).toHaveBeenCalledWith('$viewContentLoaded', jasmine.any(Function));
	});
});

describe('An appController, when closing the menu', function() {
	var messageService, scope, drupalClient, rootScope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};
		drupalClient = {
			systemConnect: function() {}
		};
		rootScope = {
			$on: function() {}
		};
	});

	it('should set the menu as closed', function() {
		var appController = new AppController(messageService, scope, drupalClient, null, rootScope);

		appController.closeMenu();

		expect(appController.isMenuOpen).toBe(false);
	});
});

describe('An appController, when opening the menu', function() {
	var messageService, scope, drupalClient, rootScope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};
		drupalClient = {
			systemConnect: function() {}
		};
		rootScope = {
			$on: function() {}
		};
	});

	it('should set the menu as opened', function() {
		var appController = new AppController(messageService, scope, drupalClient, null, rootScope);

		appController.openMenu();

		expect(appController.isMenuOpen).toBe(true);
	});
});
