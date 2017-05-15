/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ConversationsModel', ConversationsModel);

    ConversationsModel.$inject = [];

    function ConversationsModel() {
        var _elements = [],
            _cfg = {};

        return {
            'getElements': getElements,
            'setElements': setElements,
            'addElement': addElement,
            'cfg': setCfg
        };

        function setCfg(cfg) {
            _cfg.onChangeModel = cfg.onChangeModel;
            _cfg.onSetConversations = cfg.onSetConversations;
        }

        function setElements(elements) {
            _elements = [];

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                _elements.push(element);
            }

            callOnChangeFunction('onSetConversations');
        }

        function getElements() {
            return _elements;
        }

        function addElement(element) {
            _elements.push(element);

            callOnChangeFunction('onChangeModel');
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