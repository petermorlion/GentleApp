describe("A loginController with correct credentials entered by the user", function() {
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

/*describe("A loginController with incorrect credentials entered by the user", function() {
  var drupalClient, messageService, scope, sessionData, toast, loginController, mdToast = null;

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
        error();
      }
    };

    spyOn(drupalClient, 'login').and.callThrough();

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

    loginController = new LoginController(drupalClient, messageService, scope, mdToast);
  });

  it("should not be able to login", function() {
    loginController.username = 'User';
    loginController.password = 'Pass';
    loginController.login();

    expect(loginController.isLoggedIn).toBe(false);
    expect(loginController.isBusy).toBe(false);

    expect(messageService.broadcast).not.toHaveBeenCalled();
    expect(scope.$apply).toHaveBeenCalled();
    expect(drupalClient.login).toHaveBeenCalledWith(
      'User',
      'Pass',
      jasmine.any(Function),
      jasmine.any(Function),
      jasmine.objectContaining({'Content-Type': 'application/json'}));
    expect(toast.content).toHaveBeenCalledWith('Het inloggen is mislukt.');
    expect(mdToast.show).toHaveBeenCalledWith(toast);
  });
});
*/
