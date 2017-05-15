/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('participantsList', {
            controller: 'ParticipantsListController',
            bindings: {
                chatUser: '<',
                conversation: '<',
                participants: '=',
                ownerParticipant: '='
            },
            templateUrl: '/js/social-chat/components/participants-list/participants-list.html'
        });
})();