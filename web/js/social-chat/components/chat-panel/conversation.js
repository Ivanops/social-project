/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ConversationModel', ConversationModel);

    ConversationModel.$inject = [];

    function ConversationModel() {
        var _active = {},
            _ownerUserId = '',
            _isVisitorUser = true,
            _isGuestUser = true,
            _activeConversationId = '',
            _recipientCounter = 0,
            _cfg = {};

        return {
            'setActiveConversationId': setActiveConversationId,
            'setActive': setActive,
            'getActive': getActive,
            'getIsVisitorUser': getIsVisitorUser,
            'getOwnerUserId': getOwnerUserId,
            'getIsGuestUser': getIsGuestUser,
            'getActiveConversationId': getActiveConversationId,
            'getRecipientCounter': getRecipientCounter,
            'setRecipientCounter': setRecipientCounter,
            'isPublicConversation': isPublicConversation,
            'isPrivateConversation': isPrivateConversation,
            'postOpen': postOpen,
            'cfg': setCfg
        };

        function setCfg(cfg) {
            _cfg.onActiveChange = cfg.onActiveChange;
            _cfg.onActiveConversationIdChange = cfg.onActiveConversationIdChange;
            _cfg.onRecipientCounterChange = cfg.onRecipientCounterChange;
            _cfg.onPostOpen = cfg.onPostOpen;
        }

        function setActive(active, ownerUserId, isVisitorUser, isGuestUser) {
            _active = active;
            _ownerUserId = ownerUserId;
            _isVisitorUser = isVisitorUser;
            _isGuestUser = isGuestUser;
            _recipientCounter = 0;

            callOnNNNFn('onActiveChange');
        }

        function getActive() {
            return _active;
        }

        function getIsVisitorUser() {
            return _isVisitorUser;
        }

        function getOwnerUserId() {
            return _ownerUserId;
        }

        function getIsGuestUser() {
            return _isGuestUser;
        }

        function getActiveConversationId() {
            return _activeConversationId;
        }

        function getRecipientCounter() {
            return _recipientCounter;
        }

        function setRecipientCounter(counter) {
            _recipientCounter = counter;

            callOnNNNFn('onRecipientCounterChange');
        }

        function isPublicConversation() {
            return _active.hasOwnProperty('conversationType') && _active['conversationType'] === 'PUBLIC';
        }

        function isPrivateConversation() {
            return _active.hasOwnProperty('conversationType') && _active['conversationType'] === 'PRIVATE';
        }

        function setActiveConversationId(id) {
            _activeConversationId = id;

            callOnNNNFn('onActiveConversationIdChange');
        }

        function postOpen() {
            callOnNNNFn('onPostOpen');
        }

        function callOnNNNFn(key) {
            if (_cfg.hasOwnProperty(key)) {
                var fn = _cfg[key];

                if (angular.isFunction(fn)) {
                    fn();
                }
            }
        }
    }
})();