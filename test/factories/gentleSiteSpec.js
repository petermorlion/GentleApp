describe('A GentleSite, when creating with session', function() {
  var gentleSite, drupalClient = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function(success, error) {
        success();
      }
    };

    spyOn(drupalClient, 'systemConnect').and.callThrough();

    gentleSite = new GentleSite(drupalClient, null);
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
});

describe('A GentleSite, when logging out', function() {
  var gentleSite, drupalClient, $q, result, promise, userData, deferred, $rootScope = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {},
      logout: function(success, error) {
        success();
      }
    };
    spyOn(drupalClient, 'logout').and.callThrough();

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

    result = gentleSite.logout();
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
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
});

describe('A GentleSite, when failing to log out', function() {
  var gentleSite, drupalClient, $q, result, promise, userData, deferred, $rootScope, e = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {},
      logout: function(success, error) {
        e = {};
        error(e);
      }
    };
    spyOn(drupalClient, 'logout').and.callThrough();

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

    result = gentleSite.logout();
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
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

describe('A gentleSite, when getting successfully', function() {
  var gentleSite, drupalClient, $q, result, promise, serverResult, deferred, $rootScope = null;

  beforeEach(function() {
    serverResult = {};

    drupalClient = {
      systemConnect: function() {},
      makeAuthenticatedRequest: function(options, success, error, headers) {
        success(serverResult);
      }
    };
    spyOn(drupalClient, 'makeAuthenticatedRequest').and.callThrough();

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

    result = gentleSite.get('saldo/10');
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
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

describe('A gentleSite, when getting fails', function() {
  var gentleSite, drupalClient, $q, result, promise, deferred, $rootScope, e = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {},
      makeAuthenticatedRequest: function(options, success, error, headers) {
        e = {};
        error(e);
      }
    };
    spyOn(drupalClient, 'makeAuthenticatedRequest').and.callThrough();

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

    result = gentleSite.get('saldo/10');
  });

  it('should return a Promise', function() {
    expect(result).toBe(promise);
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
