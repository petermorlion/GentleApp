(function() {
    'use strict';
    var controllerId = 'settings';
    angular.module('gu')
        .controller(controllerId, [function() {
            var vm = this;
            vm.teams = ["Masters", "Open"];
        } ]);
})();