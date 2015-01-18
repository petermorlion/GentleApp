describe('A GentleSite, when creating', function() {
  var gentleSite, drupalClient = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {}
    };

    spyOn(drupalClient, 'systemConnect');

    gentleSite = new GentleSite(drupalClient, null);
  });

  it('should call the drupalClient', function() {
    expect(drupalClient.systemConnect).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.any(Function),
      jasmine.objectContaining({'Content-Type': 'application/json'}));
  });
});

describe('A GentleSite, when logging in', function() {
  var gentleSite, drupalClient, $q, result, promise, userData, deferred, $rootScope = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {},
      login: function(username, password, success, error) {
        userData = {};
        success(userData);
      }
    };
    spyOn(drupalClient, 'login').and.callThrough();

    deferred = {
      promise: function() {
        promise = {};
        return promise;
      },
      resolve: function() {}
    };
    spyOn(deferred, 'resolve');

    $q = {
      defer: function() {
        return deferred;
      }
    };

    $rootScope = {
      $apply: function() {}
    };
    spyOn($rootScope, '$apply');

    gentleSite = new GentleSite(drupalClient, $q, $rootScope);

    result = gentleSite.login('u', 'p');
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
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
});

describe('A GentleSite, when failed to log in', function() {
  var gentleSite, drupalClient, $q, result, promise, e, deferred, $rootScope = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {},
      login: function(username, password, success, error) {
        e = {};
        error(e);
      }
    };
    spyOn(drupalClient, 'login').and.callThrough();

    deferred = {
      promise: function() {
        promise = {};
        return promise;
      },
      reject: function() {}
    };
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

    gentleSite = new GentleSite(drupalClient, $q, $rootScope);

    result = gentleSite.login('u', 'p');
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
  });

  it('should login via the drupalClient', function() {
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
  });
