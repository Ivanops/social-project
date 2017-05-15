/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('AddParticipantsPanelManager', AddParticipantsPanelManager);

    AddParticipantsPanelManager.$inject = [];

    function AddParticipantsPanelManager() {
        var _constants = {
                LISTENER_NAME: {
                    ON_EXPAND: 'onExpand',
                    ON_COLLAPSE: 'onCollapse'
                }
            },
            _listeners = {
                onExpand: null,
                onCollapse: null
            };

        return {
            expand: expand,
            collapse: collapse,
            listeners: listeners
        };

        function listeners(cfg) {
            regListener(_constants.LISTENER_NAME.ON_EXPAND, {
                notify: function () {
                    cfg.onExpand();
                }
            });

            regListener(_constants.LISTENER_NAME.ON_COLLAPSE, {
                notify: function () {
                    cfg.onCollapse();
                }
            });
        }

        function expand() {
            if (null !== _listeners.onExpand) {
                _listeners.onExpand.notify();
            }
        }

        function collapse() {
            if (null !== _listeners.onCollapse) {
                _listeners.onCollapse.notify();
            }
        }

        function regListener(name, obj) {
            _listeners[name] = obj;
        }
    }
})();