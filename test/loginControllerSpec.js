describe("A loginController with credentials", function() {
  var messageService, scope = null;

  beforeEach(function() {
    scope = {
      $apply: function() {}
    };

    spyOn(scope, '$apply');
  });

  it("should login initially", function() {
    var drupalClient = {
      systemConnect: function(success, error) {
        var sessionData = {
          user: {
            uid: 666
          }
        };
        
        success(sessionData);
      }
    };

    var loginController = new LoginController(drupalClient, messageService, scope);

    expect(loginController.isLoggedIn).toBe(true);
    expect(loginController.isBusy).toBe(false);
    expect(scope.$apply).toHaveBeenCalled();
  });
});

