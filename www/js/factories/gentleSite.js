function GentleSite(drupalClient, $q, $rootScope) {
  var gentleSite = {};

  gentleSite.headers = {'Content-Type': 'application/json'};
  gentleSite.isLoggedIn = false;

  gentleSite.onSystemConnected = function() {
    gentleSite.isLoggedIn = true;
  };

  gentleSite.onError = function() {

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
        deferred.resolve(userData);
        $rootScope.$apply();
      },
      function(e) {
        deferred.reject(e);
        $rootScope.$apply();
      },
      this.headers);

    return deferred.promise();
  };

  gentleSite.logout = function() {
    var deferred = $q.defer();

    drupalClient.logout(
      function() {
        deferred.resolve();
        $rootScope.$apply();
      },
      function(e) {
        deferred.reject(e);
        $rootScope.$apply();
      },
      this.headers
    );

    return deferred.promise();
  };

  gentleSite.init();
  return gentleSite;
}
