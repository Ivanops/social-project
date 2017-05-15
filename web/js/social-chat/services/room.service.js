/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('RoomService', RoomService);

    RoomService.$inject = ['$q', 'ChatService'];

    function RoomService($q, ChatService) {

        return {
            'openRoom': openRoom
        };

        function openRoom(resourceId, userId) {
            var deferred = $q.defer();

            ChatService.openChatRoom(resourceId, userId)
                .then(function (response) {
                    deferred.resolve();
                })
                .catch(function (error) {
                    console.error(error);

                    throw new Error('Unable to open ChatRoom for: [resourceId=' + resourceId + ', userId=' + userId + ']');
                });

            return deferred.promise;
        }
    }
})();