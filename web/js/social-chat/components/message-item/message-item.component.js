/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .component('messageItem', {
            controller: 'MessageItemController',
            bindings: {
                chatUser: '<',
                instance: '<'
            },
            templateUrl: '/js/social-chat/components/message-item/message-item.html'
        });
})();