/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('addParticipantsPanel', {
            controller: 'AddParticipantsPanelController',
            bindings: {
                chatUser: '<',
                conversation: '<',
                participants: '<',
                ownerParticipant: '<'
            },
            templateUrl: '/js/social-chat/components/add-participants-panel/add-participants-panel.html'
        });
})();