/**
 * @author ivan.alban
 */

(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('alert', {
            controller: 'AlertController',
            bindings: {
                'msgSrc': '='
            },
            templateUrl: '/js/alert/alert.html'
        });
})();