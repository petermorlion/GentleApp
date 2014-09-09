(function () {
    'use strict';
    var controllerId = 'secondary';
    angular.module('gu')
        .controller(controllerId, [function () {
            var vm = this;
            vm.title = "The secondary title";
            vm.text = "The secondary text";
        }]);
})();