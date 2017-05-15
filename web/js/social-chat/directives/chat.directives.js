/**
 * @author ivan.alban
 */

(function () {
    'use strict';

    angular
        .module('socialChat')
        .directive('onRender', OnRender);

    OnRender.$inject = ['$animate'];

    function OnRender($animate) {
        return {
            scope: {
                'onRender': '&'
            },
            link: function (scope, element, attributes) {
                $animate.on('enter', element,
                    function callback(element, phase) {
                        if ('start' === phase) {
                            scope.onRender({'item': 'this value is passed in the function'});
                        }
                    }
                );
            }
        };
    }
})();