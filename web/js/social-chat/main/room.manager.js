/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('RoomManager', RoomManager);

    RoomManager.$inject = ['$q', 'ChatWebSocket', 'RoomModel', 'RoomService', 'ChatService'];

    function RoomManager($q, ChatWebSocket, RoomModel, RoomService, ChatService) {
        var _resourceId = '',
            _userId = '',
            _started = false;

        return {
            'setResourceId': setResourceId,
            'setUserId': setUserId,
            'startUp': startUp,
            'openConversation': openConversation
        };

        function setResourceId(resourceId) {
            _resourceId = resourceId;
        }

        function setUserId(userId) {
            _userId = userId;
        }

        function openConversation(conversationId) {
            ChatWebSocket.subscribeChatConversation(conversationId)
                .then(function () {
                    ChatService.openConversation(RoomModel.getChatUser().id, conversationId);
                })
        }

        function startUp() {
            _started = false;

            loadResource()
                .then(function (resource) {
                    RoomModel.setResource(resource);

                    return loadUser();
                })
                .then(function (user) {
                    RoomModel.setChatUser(user);

                    return ChatWebSocket.connect();
                })
                .then(function () {
                    return ChatWebSocket.subscribeChatRoom(RoomModel.getResource().id);
                })
                .then(function () {
                    return ChatWebSocket.subscribeChatUser(RoomModel.getResource().id, RoomModel.getChatUser().id);
                })
                .then(function () {
                    return RoomService.openRoom(RoomModel.getResource().id, RoomModel.getChatUser().id);
                })
                .then(function () {
                    _started = true
                });
        }

        function loadResource() {
            var deferred = $q.defer(),
                resource = {
                    'id': _resourceId,
                    'name': 'Resource ' + _resourceId
                };

            deferred.resolve(resource);

            return deferred.promise;
        }

        function loadUser() {
            var deferred = $q.defer();

            ChatService.getUser(_userId)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    _started = false;

                    console.error(error);
                    throw new Error('Unable to initialize RoomManager for: [resourceId=' + _resourceId + ', userId=' + _userId + ']');
                });

            return deferred.promise;
        }
    }
})();