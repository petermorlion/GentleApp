describe('An appController, when viewContentLoading and not logged in', function() {
	var messageService, scope, drupalClient, sessionData, state, rootScope = null
	var eventHandler = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};

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

		rootScope = {
			$on: function(eventName, callback) {
				eventHandler = callback;
			}
		};

		spyOn(rootScope, '$on').and.callThrough();
	});

	it('should redirect to the login page', function() {
		var appController = new AppController(messageService, scope, drupalClient, state, rootScope);

		eventHandler();

		expect(drupalClient.systemConnect).toHaveBeenCalledWith(
	      	jasmine.any(Function), 
	      	jasmine.any(Function),
	      	jasmine.objectContaining({'Content-Type': 'application/json'}));

		expect(state.go).toHaveBeenCalledWith('app.login');

		expect(rootScope.$on).toHaveBeenCalledWith('$viewContentLoading', jasmine.any(Function));
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