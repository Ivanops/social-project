/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('MessageItemController', MessageItemController);

    MessageItemController.$inject = [];

    function MessageItemController() {
        var vm = this;

        vm.$onInit = function () {
            initialize();
        };

        function initialize() {
        }
    }
})();