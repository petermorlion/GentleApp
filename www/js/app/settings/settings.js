(function() {
    'use strict';
    var controllerId = 'settings';
    angular.module('gu')
        .controller(controllerId, ['$http', function($http) {
            var vm = this;
            vm.teams = ["Masters", "Open"];
        } ]);
})();