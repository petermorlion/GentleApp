function GentleSite(drupalClient) {
  var gentleSite = {};

  gentleSite.drupalClient = drupalClient;

  gentleSite.onSystemConnected = function() {

  };

  gentleSite.onError = function() {

  };

  gentleSite.init = function() {
    this.drupalClient.systemConnect(
      this.onSystemConnected,
      this.onError,
      {'Content-Type': 'application/json'});
  };

  gentleSite.init();
  return gentleSite;
}
