/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .constant('USER_PROVIDER', {
            api: 'http://localhost:9990'
        });
})();