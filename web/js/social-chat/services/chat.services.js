/**
 * @author ctola
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ChatService', ChatService);

    ChatService.$inject = ['APPLICATION', '$http', '$q'];
    function ChatService(APPLICATION, $http, $q) {
        var service = {
            openChatRoom: openChatRoom,
            openConversation: openConversation,
            createConversation: createConversation,
            updateConversation: updateConversation,
            sendChatMessage: sendChatMessage,
            getMessages: getMessages,
            getInfoUser: getInfoUser,
            getUser: getUser,
            searchRecipient: searchRecipient,
            searchContacts: searchContacts,
            sendNotificationJoinToContacts: sendNotificationJoinToContacts,
            deleteTextMessage: deleteTextMessage
        };

        function createConversation(userId, label, resourceId) {
            var data = {
                label: label,
                resourceId: resourceId
            };
            var global = $http.post(APPLICATION.URL_SERVICE + '/users/' + userId + '/conversations', data);
            return global;
        }

        function openChatRoom(resourceId, userId) {
            return _doGet(APPLICATION.URL_SERVICE + '/chatRooms/resource/' + resourceId + '/user/' + userId);
        }

        function openConversation(userId, conversationId) {
            return _doGet(APPLICATION.URL_SERVICE + '/users/' + userId + '/conversations/' + conversationId);
        }

        function updateConversation(userId, conversationId, label, conversationType) {
            var data = {
                "conversationType": conversationType,
                "label": label
            };

            $http.put(APPLICATION.URL_SERVICE + '/users/' + userId + '/conversations/' + conversationId, data);
        }

        function sendChatMessage(content, conversationId, userId) {
            var data = {
                content: content,
                conversationId: conversationId
            };
            var global = $http.post(APPLICATION.URL_SERVICE + '/users/' + userId + '/textMessages', data);
            return global;
        }

        function deleteTextMessage(userId, messageId) {
            var global = $http.delete(APPLICATION.URL_SERVICE + '/users/' + userId + '/textMessages/' + messageId);

            return global;
        }

        function getMessages(conversationId, currenDateMillis) {
            var global = $http.get(APPLICATION.URL_SERVICE + '/conversations/' + conversationId + '/messages?currentDateMillis=' + currenDateMillis);
            return global;
        }

        function getInfoUser(userId) {
            var global = $http.get(APPLICATION.URL_SERVICE_USER + '/users/' + userId);
            return global;
        }

        function getUser(userId) {
            return _doGet(APPLICATION.URL_SERVICE_USER + '/users/' + userId);
        }

        function searchRecipient(userId, messageId) {
            return _doGet(APPLICATION.URL_SERVICE + '/users/' + userId + '/recipients/searchByMessageId?messageId=' + messageId);
        }

        function searchContacts(usernameOrEmail, participantsIds) {
            var data = {
                idsusers: participantsIds,
                usernameOrEmail: usernameOrEmail
            };
            var global = $http.post(APPLICATION.URL_SERVICE_USER + '/users/byUsernameOrEmail', data);
            return global;
        }

        function sendNotificationJoinToContacts(conversationId, listContacts, userId) {
            var data = {
                conversationId: conversationId,
                externalUsers: [
                    {
                        "email": "string"
                    }
                ],
                internalUsers: listContacts
            };
            return $http.post(APPLICATION.URL_SERVICE + '/users/' + userId + '/participants', data);
        }

        function _doGet(url) {
            var global = $http.get(url);

            return global;
        }

        return service;
    }
})();