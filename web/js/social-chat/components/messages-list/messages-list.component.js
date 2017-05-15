/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('messagesList', {
            controller: 'MessagesListController',
            bindings: {
                chatUser: '<',
                messages: '='
            },
            templateUrl: '/js/social-chat/components/messages-list/messages-list.html'
        });
})();