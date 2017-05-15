/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('AlertService', AlertService);

    AlertService.$inject = [];

    function AlertService() {
        var _cfg = {};

        return {
            'fireYesNoAlert': fireYesNoAlert,
            'fireInfoAlert': fireInfoAlert,
            'cfg': setCfg
        };

        function setCfg(cfg) {
            _cfg.onAlert = cfg.onAlert;
        }

        function fireYesNoAlert(cfg) {
            var item = {
                'msg': cfg.msg,
                'type': 'yes_no'
            };

            if (angular.isFunction(cfg.onYes)) {
                item.yes = function () {
                    cfg.onYes();
                }
            }

            if (angular.isFunction(cfg.onNo)) {
                item.no = function () {
                    cfg.onNo();
                }
            }

            callOnAlertFn(item);
        }

        function fireInfoAlert(cfg) {
            var item = {
                'msg': cfg.msg,
                'type': 'info'
            };

            if (angular.isFunction(cfg.onOk)) {
                item.ok = function () {
                    cfg.onOk();
                }
            }

            callOnAlertFn(item);
        }

        function callOnAlertFn(alert) {
            var fn = _cfg.onAlert;

            if (null !== fn && angular.isFunction(fn)) {
                fn(alert);
            }
        }
    }
})();