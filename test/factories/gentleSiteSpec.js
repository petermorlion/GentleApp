describe('A GentleSite', function() {
  var gentleSite, drupalClient, deferred, $q, $rootScope = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function(success, error) {},
      login: function(username, password) {},
      logout: function() {}
    };

    deferred = {
      promise: function() {
        promise = {};
        return promise;
      },
      resolve: function() {},
      reject: function() {}
    };

    spyOn(deferred, 'resolve');
    spyOn(deferred, 'reject');

    $q = {
      defer: function() {
        return deferred;
      }
    };

    $rootScope = {
      $apply: function() {}
    };

    spyOn($rootScope, '$apply');
  });

  describe('when session exists', function() {
    beforeEach(function() {
      drupalClient.systemConnect = function(success, error) {
        success({
          user: { uid: 10 }
        });
      };

      spyOn(drupalClient, 'systemConnect').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);
    });

    it('should call the drupalClient', function() {
      expect(drupalClient.systemConnect).toHaveBeenCalledWith(
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should mark itself as logged in', function() {
      expect(gentleSite.isLoggedIn).toBe(true);
    });

    it('should set the uid', function() {
      expect(gentleSite.uid).toBe(10);
    });
  });

  describe('when logging in', function() {
    beforeEach(function() {
      drupalClient.login = function(username, password, success, error) {
        userData = { uid: 10 };
        success(userData);
      };

      spyOn(drupalClient, 'login').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);

      result = gentleSite.login('u', 'p');
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should login via the drupalClient', function() {
      expect(drupalClient.login).toHaveBeenCalledWith(
        'u',
        'p',
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the resolve function of the deferred', function() {
      expect(deferred.resolve).toHaveBeenCalledWith(userData);
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });

    it('should set the uid', function() {
      expect(gentleSite.uid).toBe(10);
    });
  });

  describe('when failed to log in', function(){
    var e = null;

    beforeEach(function() {
      e = {};
      drupalClient.login = function(username, password, success, error) {
        error(e);
      };

      spyOn(drupalClient, 'login').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);

      result = gentleSite.login('u', 'p');
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should tried to login via the drupalClient', function() {
      expect(drupalClient.login).toHaveBeenCalledWith(
        'u',
        'p',
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the reject function of the deferred', function() {
      expect(deferred.reject).toHaveBeenCalledWith(e);
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });

    it('should clear the uid', function() {
      expect(gentleSite.uid).toBe(undefined);
    });
  });

  describe('when logging out', function() {
    beforeEach(function() {
      drupalClient.logout = function(success, error) {
        success();
      };

      spyOn(drupalClient, 'logout').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);
      gentleSite.uid = 10;

      result = gentleSite.logout();
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should logout via the drupalClient', function() {
      expect(drupalClient.logout).toHaveBeenCalledWith(
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the resolve function of the deferred', function() {
      expect(deferred.resolve).toHaveBeenCalled();
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });

    it('should clear the uid', function() {
      expect(gentleSite.uid).toBe(undefined);
    });
  });

  describe('when failing to log out', function() {
    var e = null;

    beforeEach(function() {
      e = {};

      drupalClient.logout = function(success, error) {
        e = {};
        error(e);
      };

      spyOn(drupalClient, 'logout').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);

      result = gentleSite.logout();
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should tried to logout via the drupalClient', function() {
      expect(drupalClient.logout).toHaveBeenCalledWith(
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the reject function of the deferred', function() {
      expect(deferred.reject).toHaveBeenCalledWith(e);
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });
  });

  describe('when getting successfully', function() {
    var serverResult = null;

    beforeEach(function() {
      serverResult = {};

      drupalClient.makeAuthenticatedRequest = function(options, success, error, headers) {
        success(serverResult);
      };

      spyOn(drupalClient, 'makeAuthenticatedRequest').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);

      result = gentleSite.get('saldo/10');
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should tried to make an authenticated request via the drupalClient', function() {
      expect(drupalClient.makeAuthenticatedRequest).toHaveBeenCalledWith(
        jasmine.objectContaining({
          'httpMethod': 'GET',
          'servicePath': 'saldo/10',
          'contentType': 'application/json'
        }),
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the resolve function of the deferred', function() {
      expect(deferred.resolve).toHaveBeenCalled();
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });
  });

  describe('when getting fails', function() {
    var e = null;

    beforeEach(function() {
      e = {};

      drupalClient.makeAuthenticatedRequest = function(options, success, error, headers) {
        error(e);
      };

      spyOn(drupalClient, 'makeAuthenticatedRequest').and.callThrough();

      gentleSite = new GentleSite(drupalClient, $q, $rootScope);

      result = gentleSite.get('saldo/10');
    });

    it('should return a Promise', function() {
      expect(result()).toBe(promise);
    });

    it('should tried to make an authenticated request via the drupalClient', function() {
      expect(drupalClient.makeAuthenticatedRequest).toHaveBeenCalledWith(
        jasmine.objectContaining({
          'httpMethod': 'GET',
          'servicePath': 'saldo/10',
          'contentType': 'application/json'
        }),
        jasmine.any(Function),
        jasmine.any(Function),
        jasmine.objectContaining({'Content-Type': 'application/json'}));
      });

    it('should have called the reject function of the deferred', function() {
      expect(deferred.reject).toHaveBeenCalledWith(e);
    });

    it('should trigger the digest cycle', function() {
      expect($rootScope.$apply).toHaveBeenCalled();
    });
  });
});
