(function () {
    'use strict';
    var controllerId = 'points';
    angular.module('gu')
        .controller(controllerId, [function () {
            var vm = this;
            vm.title = "The title";
            vm.text = "The text";
        }]);
})();