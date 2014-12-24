describe("A loginController with stored credentials", function() {
  var drupalClient, messageService, scope, sessionData = null;

  beforeEach(function() {
    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    drupalClient = {
      systemConnect: function(success, error) {
        success(sessionData);
      }
    };

    sessionData = {
      user: {
        uid: 666
      }
    };
  });

  it("should be able to login", function() {
    var loginController = new LoginController(drupalClient, messageService, scope);

    expect(loginController.isLoggedIn).toBe(true);
    expect(loginController.isBusy).toBe(false);
    expect(scope.$apply).toHaveBeenCalled();
  });
});

describe("A loginController without stored credentials", function() {
  var drupalClient, messageService, scope, sessionData = null;

  beforeEach(function() {
    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    drupalClient = {
      systemConnect: function(success, error) {
        success(sessionData);
      }
    };

    sessionData = {
      user: {
        uid: 0
      }
    };
  });

  it("should not be able to login", function() {
    var loginController = new LoginController(drupalClient, messageService, scope);

    expect(loginController.isLoggedIn).toBe(false);
    expect(loginController.isBusy).toBe(false);
    expect(scope.$apply).toHaveBeenCalled();
  });
});

describe("A loginController with correct credentials entered by the user", function() {
  var drupalClient, messageService, scope, sessionData, loginController = null;

  beforeEach(function() {
    messageService = {
      broadcast: function() {}
    };

    spyOn(messageService, 'broadcast');

    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');

    drupalClient = {
      systemConnect: function(success, error) {},
      login: function(username, password, success, error) {
        success();
      }
    };

    spyOn(drupalClient, 'login').and.callThrough();

    loginController = new LoginController(drupalClient, messageService, scope);
  });

  it("should be able to login", function() {
    loginController.username = "User";
    loginController.password = "Pass";
    loginController.login();

    expect(loginController.isLoggedIn).toBe(true);
    expect(loginController.isBusy).toBe(false);

    expect(messageService.broadcast).toHaveBeenCalledWith('loginSuccessful');
    expect(scope.$apply).toHaveBeenCalled();
    expect(drupalClient.login).toHaveBeenCalledWith("User", "Pass", jasmine.any(Function), jasmine.any(Function));
  });
});