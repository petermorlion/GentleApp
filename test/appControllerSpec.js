describe('An appController, when closing the menu', function() {
	var messageService, scope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};
	});

	it('should set the menu as closed', function() {
		var appController = new AppController(messageService, scope);

		appController.closeMenu();

		expect(appController.isMenuOpen).toBe(false);
	});
});

describe('An appController, when opening the menu', function() {
	var messageService, scope = null;

	beforeEach(function() {
		messageService = {};
		scope = {
			$on: function() {}
		};
	});

	it('should set the menu as opened', function() {
		var appController = new AppController(messageService, scope);

		appController.openMenu();

		expect(appController.isMenuOpen).toBe(true);
	});
});