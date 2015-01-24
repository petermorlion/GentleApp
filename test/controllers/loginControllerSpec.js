describe('A loginController with correct credentials entered by the user', function() {
  var gentleSite, messageService, sessionData, loginController, $rootScope = null;

  beforeEach(inject(function(_$rootScope_, $q) {
    $rootScope = _$rootScope_;

    var deferred = $q.defer();
    deferred.resolve({});

    messageService = {
      broadcast: function() {}
    };

    spyOn(messageService, 'broadcast');

    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    gentleSite = {
      login: function(username, password) {}
    };

    spyOn(gentleSite, 'login').and.returnValue(deferred.promise);

    loginController = new LoginController(gentleSite, messageService, null);

    loginController.username = "User";
    loginController.password = "Pass";

    loginController.login();

    $rootScope.$apply();
  }));

  it("should be able to login", function() {
    expect(loginController.isLoggedIn).toBe(true);
    expect(loginController.isBusy).toBe(false);
  });

  it('should broadcast the successful login', function() {
    expect(messageService.broadcast).toHaveBeenCalledWith('loginSuccessful');
  });
});

describe('A loginController with incorrect credentials entered by the user', function() {
  var gentleSite, messageService, sessionData, loginController, $rootScope, toast, mdToast = null;

  beforeEach(inject(function(_$rootScope_, $q) {
    $rootScope = _$rootScope_;

    var deferred = $q.defer();
    deferred.reject({});

    messageService = {
      broadcast: function() {}
    };

    spyOn(messageService, 'broadcast');

    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    gentleSite = {
      login: function(username, password) {}
    };
    spyOn(gentleSite, 'login').and.returnValue(deferred.promise);

    toast = {
      content: function(){
        return toast;
      }
    };
    spyOn(toast, 'content').and.callThrough();

    mdToast = {
      simple: function() {
        return toast;
      },
      show: function() {}
    };
    spyOn(mdToast, 'simple').and.callThrough();
    spyOn(mdToast, 'show');

    loginController = new LoginController(gentleSite, messageService, mdToast);

    loginController.username = "User";
    loginController.password = "Pass";

    loginController.login();

    $rootScope.$apply();
  }));

  it("should not be able to login", function() {
    expect(loginController.isLoggedIn).toBe(false);
    expect(loginController.isBusy).toBe(false);
  });

  it('should broadcast the unsuccessful login', function() {
    expect(toast.content).toHaveBeenCalledWith('Het inloggen is mislukt.');
    expect(mdToast.show).toHaveBeenCalledWith(toast);
  });
});

describe('A loginController with logged in user', function() {
  var gentleSite, messageService, sessionData, loginController, $rootScope = null;

  beforeEach(inject(function(_$rootScope_, $q) {
    gentleSite = {
      isLoggedIn: true
    };

    loginController = new LoginController(gentleSite, messageService, null);
  }));

  it ('should mark itsself as logged in', function() {
    expect(loginController.isLoggedIn).toBe(true);
  });
});

describe('A loginController when logging out', function() {
  var gentleSite, messageService, sessionData, loginController, $rootScope = null;

  beforeEach(inject(function(_$rootScope_, $q) {
    $rootScope = _$rootScope_;

    var deferred = $q.defer();
    deferred.resolve({});

    messageService = {
      broadcast: function() {}
    };

    spyOn(messageService, 'broadcast');

    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    gentleSite = {
      logout: function(username, password) {}
    };

    spyOn(gentleSite, 'logout').and.returnValue(deferred.promise);

    loginController = new LoginController(gentleSite, messageService, null);

    loginController.logout();

    $rootScope.$apply();
  }));

  it("should be able to logout", function() {
    expect(loginController.isLoggedIn).toBe(false);
    expect(loginController.isBusy).toBe(false);
  });

  it('should broadcast the successful logout', function() {
    expect(messageService.broadcast).toHaveBeenCalledWith('logoutSuccessful');
  });
});
