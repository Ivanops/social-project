/**
 * @author ivan.alban
 */

(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ChatWebSocket', ChatWebSocket);

    ChatWebSocket.$inject = ['$rootScope', '$q', 'APPLICATION', 'RoomWSListener', 'ChatUserWSListener', 'ConversationWSListener'];

    function ChatWebSocket($rootScope, $q, APPLICATION, RoomWSListener, ChatUserWSListener, ConversationWSListener) {
        var _connected = false,
            _stompClient = {},
            _headers = {},
            _subscribers = {};

        var doSubscribe = function (key, path, listener) {
            if (!_connected) {
                throw new Error('Chat Web Socket is not connected');
            }

            if (_subscribers.hasOwnProperty(key)) {
                doUnSubscribe(key);
            }

            _subscribers[key] = _stompClient.subscribe(path, function (msg) {
                $rootScope.$apply(function () {
                    if (angular.isFunction(listener)) {
                        listener(JSON.parse(msg.body));
                    }
                });
            });
        };

        var doUnSubscribe = function (key) {
            var subscription = _subscribers[key];

            if (null !== subscription) {
                subscription.unsubscribe();
            }

            delete _subscribers[key];
        };

        var service = function () {
            var _self = this;

            _self.connect = function () {
                var socket = new SockJS(APPLICATION.URL_SOCKET),
                    deferred = $q.defer();

                _subscribers = {};

                _stompClient = Stomp.over(socket);
                _stompClient.connect(
                    _headers,
                    function (frame) {
                        _connected = true;

                        deferred.resolve();
                    },
                    function (error) {
                        _connected = false;

                        console.error(error);
                        throw new Error('Unable to establish a websocket connection');
                    }
                );

                return deferred.promise;
            };

            _self.enableSubscription = function (key, path, listener) {
                var deferred = $q.defer();

                try {
                    doSubscribe(key, path, listener);

                    deferred.resolve();
                } catch (error) {
                    deferred.reject({
                        'msg': 'Unable subscribe to ' + path
                    });
                }

                return deferred.promise;
            };

            _self.subscribeChatRoom = function (resourceId) {
                return _self.enableSubscription(
                    'chatRoom', '/topic/chatRoom/' + resourceId,
                    function (msg) {
                        RoomWSListener.handle(msg);
                    });
            };

            _self.subscribeChatUser = function (resourceId, userId) {
                return _self.enableSubscription(
                    'chatUser', '/topic/chatRoom/' + resourceId + '/' + userId,
                    function (msg) {
                        ChatUserWSListener.handle(msg);
                    });
            };

            _self.subscribeChatConversation = function (conversationId) {
                return _self.enableSubscription(
                    'chatConversation', '/topic/message/' + conversationId,
                    function (msg) {
                        ConversationWSListener.handle(msg);
                    });
            };
        };

        return new service();
    }
})();