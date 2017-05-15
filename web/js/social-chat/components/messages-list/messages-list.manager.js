/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('MessagesListManager', MessagesListManager);

    MessagesListManager.$inject = ['UserProviderRegistry'];

    function MessagesListManager(UserProviderRegistry) {
        var _constants = {
                MSG_TYPE: {
                    TEXT: 'TEXT'
                },
                MSG_STATE: {
                    READ: 'READ',
                    UNREAD: 'UNREAD'
                }
            },
            _listeners = {
                onPreInit: null,
                onPostInit: null,
                onAddMsg: null,
                onPushMsg: null
            };

        return {
            addMsgs: addMsgs,
            pushMsg: pushMsg,
            updateMsgInfo: updateMsgInfo,
            init: init,
            listeners: listeners
        };

        function init(cfg) {
            if (null !== _listeners.onPreInit) {
                _listeners.onPreInit.notify();
            }

            addMsgs(cfg.messages);

            if (null !== _listeners.onPostInit) {
                _listeners.onPostInit.notify();
            }
        }

        function addMsgs(items) {
            angular.forEach(items, function (item) {
                addMsg(item);
            });
        }

        function updateMsgInfo(item) {

        }

        function pushMsg(item) {
            var type = item.type,
                msg = item.message,
                instance = null;

            switch (type) {
                case _constants.MSG_TYPE.TEXT:
                    instance = createTextMsg(msg, item.textContent);

                    break;
            }

            if (null !== instance) {
                UserProviderRegistry.findUser(instance.userId)
                    .then(function (usr) {
                        instance.user = usr;
                    });

                if (null !== _listeners.onPushMsg) {
                    _listeners.onPushMsg.notify(instance);
                }
            }
        }

        function addMsg(item) {
            var type = item.type,
                msg = item.message,
                instance = null;

            switch (type) {
                case _constants.MSG_TYPE.TEXT:
                    instance = createTextMsg(msg, item.textContent);

                    break;
            }

            if (null !== instance) {
                UserProviderRegistry.findUser(instance.userId)
                    .then(function (usr) {
                        instance.user = usr;
                    });

                if (null !== _listeners.onAddMsg) {
                    _listeners.onAddMsg.notify(instance);
                }
            }
        }

        function createTextMsg(msg, content) {
            var item = create(msg);

            if (msg.deleted) {
                item.content = 'This message has been deleted';
            } else {
                item.content = content.value;
            }

            return item;
        }

        function create(msg) {
            return {
                'id': msg.id,
                'viewedAll': msg.viewedAll,
                'edited': msg.edited,
                'deleted': msg.deleted,
                'createdDate': msg.createdDate,
                'contentType': msg.contentType,
                'userId': msg.sender.userId,
                'state': _constants.MSG_STATE.UNREAD,
                'user': null
            };
        }

        function listeners(cfg) {
            if (isFunction(cfg.onPreInit)) {
                regOnPreInit(cfg);
            }

            if (isFunction(cfg.onPostInit)) {
                regOnPostInit(cfg);
            }

            if (isFunction(cfg.onAddMsg)) {
                regOnAddMsg(cfg);
            }

            if (isFunction(cfg.onPushMsg)) {
                regOnPushMsg(cfg);
            }
        }

        function isFunction(fn) {
            return null !== fn && angular.isFunction(fn);
        }

        function regOnPreInit(cfg) {
            var fn = cfg.onPreInit;

            _listeners.onPreInit = {
                notify: function () {
                    fn();
                }
            };
        }

        function regOnPostInit(cfg) {
            var fn = cfg.onPostInit;

            _listeners.onPostInit = {
                notify: function () {
                    fn();
                }
            };
        }

        function regOnAddMsg(cfg) {
            var fn = cfg.onAddMsg;

            _listeners.onAddMsg = {
                notify: function (item) {
                    fn(item);
                }
            };
        }

        function regOnPushMsg(cfg) {
            var fn = cfg.onPushMsg;

            _listeners.onPushMsg = {
                notify: function (item) {
                    fn(item);
                }
            };
        }
    }
})();