(function() {
    'use strict';
    var controllerId = 'main';
    angular.module('gu')
        .controller(controllerId, [function() {
            var vm = this;
            vm.title = "The title";
            vm.text = "The text";
        } ]);
})();