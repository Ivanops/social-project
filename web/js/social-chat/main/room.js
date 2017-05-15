/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('RoomModel', RoomModel);

    RoomModel.$inject = [];

    function RoomModel() {
        var _resource = {},
            _chatUser = {},
            _cfg = {};

        return {
            'setResource': setResource,
            'getResource': getResource,
            'setChatUser': setChatUser,
            'getChatUser': getChatUser,
            'cfg': setCfg
        };

        function setCfg(cfg) {
            _cfg.onChangeResource = cfg.onChangeResource;
            _cfg.onChangeChatUser = cfg.onChangeChatUser;
        }

        function setResource(resource) {
            _resource = resource;

            callOnChangeFunction('onChangeResource');
        }

        function setChatUser(user) {
            _chatUser = user;

            callOnChangeFunction('onChangeChatUser');
        }

        function getResource() {
            return _resource;
        }

        function getChatUser() {
            return _chatUser;
        }

        function callOnChangeFunction(key) {
            if (_cfg.hasOwnProperty(key)) {
                var fn = _cfg[key];

                if (angular.isFunction(fn)) {
                    fn();
                }
            }
        }
    }
})();