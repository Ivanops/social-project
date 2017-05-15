/**
 * @author ivan.alban
 */

(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('userIcon', {
            controller: 'UserIconController',
            bindings: {
                instance: '<',
                showState: '<?',
                showName: '<?',
                showTooltip: '<?'
            },
            templateUrl: '/js/user-provider/user-icon/user-icon.html'
        });
})();