/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('AlertController', AlertController);

    AlertController.$inject = [];

    function AlertController() {
        var vm = this;

        vm.doYes = function (element) {
            vm._executeFn(element.yes);

            vm._remove(element);
        };

        vm.doNo = function (element) {
            vm._executeFn(element.no);

            vm._remove(element);
        };

        vm.doOk = function (element) {
            vm._executeFn(element.ok);

            vm._remove(element);
        };

        vm._remove = function (element) {
            var idx = vm.msgSrc.indexOf(element);

            if (idx > -1) {
                vm.msgSrc.splice(idx, 1);
            }
        };

        vm._executeFn = function (fn) {
            if (null !== fn && angular.isFunction(fn)) {
                fn();
            }
        };
    }
})();