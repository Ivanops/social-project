/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('MessagesListController', MessagesListController);

    MessagesListController.$inject = ['MessagesListManager'];

    function MessagesListController(MessagesListManager) {
        var vm = this,
            _timeMillis = (new Date()).getTime();

        vm.loadPrevious = function () {

        };

        vm.loadRecipient = function (item) {

        };

        vm.$onInit = function () {
            initialize();
        };

        function initialize() {
            MessagesListManager.listeners({
                onPreInit: function () {
                    handlePreInit();
                },
                onPostInit: function () {
                    handlePostInit();
                },
                onAddMsg: function (item) {
                    handleAddMsg(item);
                },
                onPushMsg: function (item) {
                }
            });
        }

        function handlePreInit() {
            vm.messages = [];
        }

        function handlePostInit() {

        }

        function handleAddMsg(item) {
            _timeMillis = item.createdDate;
            item.answer = vm.chatUser.id !== item.userId;

            vm.messages.unshift(item);
        }
    }
})();