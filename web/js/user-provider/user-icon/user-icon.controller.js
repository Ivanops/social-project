/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('UserIconController', UserIconController);

    UserIconController.$inject = [];

    function UserIconController() {
        var vm = this;

        vm.$onInit = function () {
            initialize();
        };

        function initialize() {
            if (angular.isUndefined(vm.showState)) {
                vm.showState = false;
            }

            if (angular.isUndefined(vm.showName)) {
                vm.showName = false
            }

            if (angular.isUndefined(vm.showTooltip)) {
                vm.showTooltip = true;
            }
        }
    }
})();