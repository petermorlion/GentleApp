function GentleSite(drupalClient, $q) {
  var gentleSite = {};

  gentleSite.drupalClient = drupalClient;
  gentleSite.headers = {'Content-Type': 'application/json'};

  gentleSite.onSystemConnected = function() {

  };

  gentleSite.onError = function() {

  };

  gentleSite.init = function() {
    this.drupalClient.systemConnect(
      this.onSystemConnected,
      this.onError,
      this.headers);
  };

  gentleSite.login = function(username, password) {
    var deferred = $q.defer();

    this.drupalClient.login(
      username,
      password,
      function(userData) {
        deferred.resolve(userData);
      },
      function(e) {
        deferred.reject(e);
      },
      this.headers);

    return deferred.promise();
  };

  gentleSite.init();
  return gentleSite;
}
