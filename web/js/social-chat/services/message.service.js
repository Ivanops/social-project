/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$q', 'ChatService', 'RoomModel'];

    function MessageService($q, ChatService, RoomModel) {

        return {
            'findRecipient': findRecipient,
            'findMessages': findMessages,
            'createTextMessage': createTextMessage
        };

        function findMessages(conversationId, timeMillis) {
            var deferred = $q.defer();

            ChatService.getMessages(conversationId, timeMillis)
                .then(function (response) {
                    var messages = response.data.content;


                    deferred.resolve();
                })
                .catch(function (error) {
                    console.error(error);

                    throw new Error('Unable to call ChatService.getMessages()');
                });

            return deferred.promise;
        }

        function createTextMessage(conversationId, content) {
            var deferred = $q.defer();

            ChatService.sendChatMessage(content, conversationId, RoomModel.getChatUser().id)
                .then(function (response) {
                    deferred.resolve();
                })
                .catch(function (error) {
                    console.error(error);

                    throw new Error('Unable to call ChatService.sendChatMessage()');
                });

            return deferred.promise;
        }

        function findRecipient(item) {
            var deferred = $q.defer();

            if (item.state === 'UNREAD') {
                ChatService.searchRecipient(RoomModel.getChatUser().id, item.id)
                    .then(function (response) {
                        var state = response.data.content.state;

                        deferred.resolve(state);
                    })
                    .catch(function (error) {
                        console.error(error);

                        throw new Error('Unable to call ChatService.searchRecipient()');
                    });
            } else {
                deferred.resolve(item.state);
            }

            return deferred.promise;
        }
    }
})();