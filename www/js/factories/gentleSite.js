function GentleSite(drupalClient, $q, $rootScope) {
  var gentleSite = {};

  gentleSite.headers = {'Content-Type': 'application/json'};
  gentleSite.isLoggedIn = false;

  gentleSite.onSystemConnected = function(sessionData) {
    gentleSite.isLoggedIn = true;
    gentleSite.uid = sessionData.user.uid;
  };

  gentleSite.onError = function() {
    // TODO handle error
  };

  gentleSite.init = function() {
    drupalClient.systemConnect(
      this.onSystemConnected,
      this.onError,
      this.headers);
  };

  gentleSite.login = function(username, password) {
    var deferred = $q.defer();

    drupalClient.login(
      username,
      password,
      function(userData) {
        gentleSite.uid = userData.uid;
        deferred.resolve(userData);
        $rootScope.$apply();
      },
      function(e) {
        deferred.reject(e);
        $rootScope.$apply();
      },
      this.headers);

    return deferred.promise;
  };

  gentleSite.logout = function() {
    var deferred = $q.defer();

    drupalClient.logout(
      function() {
        gentleSite.uid = undefined;
        deferred.resolve();
        $rootScope.$apply();
      },
      function(e) {
        deferred.reject(e);
        $rootScope.$apply();
      },
      this.headers
    );

    return deferred.promise;
  };

  gentleSite.get = function(servicePath) {
    var deferred = $q.defer();

    drupalClient.makeAuthenticatedRequest(
    {
      httpMethod: 'GET',
      servicePath: servicePath,
      contentType: 'application/json'
    },
    function(data) {
      deferred.resolve(data);
      $rootScope.$apply();
    },
    function(e) {
      deferred.reject(e);
      $rootScope.$apply();
    },
    this.headers);

    return deferred.promise;
  };

  gentleSite.init();
  return gentleSite;
}
