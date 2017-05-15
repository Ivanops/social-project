/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ParticipantsService', ParticipantsService);

    ParticipantsService.$inject = ['$log', '$http', 'SOCIAL_CHAT'];

    function ParticipantsService($log, $http, SOCIAL_CHAT) {
        return {};
    }
})();