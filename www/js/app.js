angular

.module('gentleApp', ['ngMaterial', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/app");

	$stateProvider
		.state('app', { url: '/app', templateUrl: 'partials/app.html', controller: 'AppController as vm' })
		.state('app.home', { url: '/home', templateUrl: 'partials/home.html' })
		.state('app.saldo', { url: '/saldo', templateUrl: 'partials/saldo.html', controller: 'SaldoController as vm' })
		.state('app.login', { url: '/login', templateUrl: 'partials/login.html', controller: 'LoginController as vm' })
}])

.factory('drupalClient', DrupalClient)
.factory('gentleSite', ['drupalClient', '$q', '$rootScope', GentleSite])
.factory('messageService', ['$rootScope', MessageService])

.controller('LoginController', ['gentleSite', 'messageService', '$scope', '$mdToast', LoginController])
.controller('AppController', ['messageService', '$scope', 'gentleSite', '$state', '$rootScope', AppController])
.controller('SaldoController', ['gentleSite', '$scope', SaldoController]);
