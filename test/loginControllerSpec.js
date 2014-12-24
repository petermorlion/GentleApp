describe("A loginController with credentials", function() {
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

    var loginController = new LoginController(drupalClient);

    expect(loginController.isLoggedIn).toBe(true);
    expect(loginController.isBusy).toBe(false);
  });
});

