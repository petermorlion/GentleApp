describe('A loginController', function() {
  var $rootScope, deferred, loginController, gentleSite, messageService, toast, mdToast = null;

  beforeEach(inject(function(_$rootScope_, $q) {
    $rootScope = _$rootScope_;

    deferred = $q.defer();

    gentleSite = {
      login: function(username, password) {},
      logout: function() {}
    };

    spyOn(gentleSite, 'login').and.returnValue(deferred.promise);
    spyOn(gentleSite, 'logout').and.returnValue(deferred.promise);

    messageService = {
      broadcast: function() {}
    };

    spyOn(messageService, 'broadcast');

    toast = {
      content: function(){}
    };

    spyOn(toast, 'content').and.returnValue(toast);

    mdToast = {
      simple: function() {},
      show: function() {}
    };

    spyOn(mdToast, 'simple').and.returnValue(toast);
    spyOn(mdToast, 'show');

    loginController = new LoginController(gentleSite, messageService, mdToast);
  }));

  describe('with correct credentials when logging in', function() {
    beforeEach(function() {
      loginController.username = "User";
      loginController.password = "Pass";

      loginController.login();
      deferred.resolve({});
      $rootScope.$apply();
    });

    it('should be able to login', function() {
      expect(loginController.isLoggedIn).toBe(true);
      expect(loginController.isBusy).toBe(false);
    });

    it('should call the gentleSite with the provided credentials', function() {
      expect(gentleSite.login).toHaveBeenCalledWith("User", "Pass");
    });

    it('should broadcast the successful login', function() {
      expect(messageService.broadcast).toHaveBeenCalledWith('loginSuccessful');
    });
  });

  describe('with incorrect credentials when logging in', function() {
    beforeEach(function() {
      loginController.username = "User";
      loginController.password = "Pass";

      loginController.login();
      deferred.reject({});
      $rootScope.$apply();
    });

    it("should not be able to login", function() {
      expect(loginController.isLoggedIn).toBe(false);
      expect(loginController.isBusy).toBe(false);
    });

    it('should call the gentleSite with the provided credentials', function() {
      expect(gentleSite.login).toHaveBeenCalledWith("User", "Pass");
    });

    it('should broadcast the unsuccessful login', function() {
      expect(toast.content).toHaveBeenCalledWith('Het inloggen is mislukt.');
    });

    it('should show a message to the user', function() {
      expect(mdToast.show).toHaveBeenCalledWith(toast);
    });
  });

  describe('when logging out', function() {
    beforeEach(function() {
      loginController.isLoggedIn = true;

      loginController.logout();
      deferred.resolve();
      $rootScope.$apply();
    });

    it("should be able to logout", function() {
      expect(loginController.isLoggedIn).toBe(false);
      expect(loginController.isBusy).toBe(false);
    });

    it('should broadcast the successful logout', function() {
      expect(messageService.broadcast).toHaveBeenCalledWith('logoutSuccessful');
    });
  });
});
