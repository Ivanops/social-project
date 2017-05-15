/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ParticipantsListManager', ParticipantsListManager);

    ParticipantsListManager.$inject = ['UserProviderRegistry'];

    function ParticipantsListManager(UserProviderRegistry) {
        var _constants = {
                PARTICIPANT_TYPE: {
                    OWNER: 'OWNER',
                    DEFAULT: 'DEFAULT',
                    GUEST: 'GUEST'
                },
                LISTENER_NAME: {
                    ON_PRE_INIT: 'onPreInit',
                    ON_POST_INIT: 'onPostInit',
                    ON_SET_OWNER_PARTICIPANT: 'onSetOwnerParticipant',
                    ON_ADD_PARTICIPANT: 'onAddParticipant',
                    ON_POST_CREATE_PARTICIPANT: 'onPostCreateParticipant'
                }
            },
            _listeners = {
                onPreInit: null,
                onPostInit: null,
                onSetOwnerParticipant: null,
                onAddParticipant: null,
                onPostCreateParticipant: null
            };

        return {
            init: init,
            isDefaultParticipant: isDefaultParticipant,
            createParticipant: createParticipant,
            enableParticipant: enableParticipant,
            listeners: listeners
        };


        function isDefaultParticipant(item) {
            return _constants.PARTICIPANT_TYPE.DEFAULT === item.type;
        }

        function createParticipant(element) {
            var userId = element.userId,
                type = element.type;

            var item = create(userId, type);
            addParticipant(item);

            if (null !== _listeners.onPostCreateParticipant) {
                _listeners.onPostCreateParticipant.notify(item);
            }
        }

        function enableParticipant(item) {
        }

        function listeners(cfg) {
            regListener(_constants.LISTENER_NAME.ON_PRE_INIT, {
                notify: function () {
                    cfg.onPreInit();
                }
            });

            regListener(_constants.LISTENER_NAME.ON_POST_INIT, {
                notify: function () {
                    cfg.onPostInit();
                }
            });

            regListener(_constants.LISTENER_NAME.ON_SET_OWNER_PARTICIPANT, {
                notify: function (item) {
                    cfg.onSetOwnerParticipant(item);
                }
            });

            regListener(_constants.LISTENER_NAME.ON_ADD_PARTICIPANT, {
                notify: function (item) {
                    cfg.onAddParticipant(item);
                }
            });

            regListener(_constants.LISTENER_NAME.ON_POST_CREATE_PARTICIPANT, {
                notify: function (item) {
                    cfg.onPostCreateParticipant(item);
                }
            });
        }

        function init(cfg) {
            if (null !== _listeners.onPreInit) {
                _listeners.onPreInit.notify();
            }

            angular.forEach(cfg.participants, function (item) {
                addParticipant(item);
            });

            if (null !== _listeners.onPostInit) {
                _listeners.onPostInit.notify();
            }
        }

        function setOwnerParticipant(item) {
            UserProviderRegistry.findUser(item.id)
                .then(function (usr) {
                    item.data = usr;
                });

            if (null !== _listeners.onSetOwnerParticipant) {
                _listeners.onSetOwnerParticipant.notify(item);
            }
        }

        function pushParticipant(item) {
            UserProviderRegistry.findUser(item.id)
                .then(function (usr) {
                    item.data = usr;
                });

            if (null !== _listeners.onAddParticipant) {
                _listeners.onAddParticipant.notify(item);
            }
        }

        function addParticipant(element) {
            var userId = element.userId,
                type = element.type;

            var item = create(userId, type);

            if (_constants.PARTICIPANT_TYPE.OWNER === type) {
                setOwnerParticipant(item);
            } else {
                pushParticipant(item);
            }
        }

        function create(userId, type) {
            return {
                'id': userId,
                'type': type,
                'data': null
            };
        }

        function regListener(name, obj) {
            _listeners[name] = obj;
        }
    }
})();