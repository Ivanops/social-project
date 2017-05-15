/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('ParticipantsListController', ParticipantsListController);

    ParticipantsListController.$inject = ['ParticipantsListManager'];

    function ParticipantsListController(ParticipantsListManager) {
        var vm = this;

        vm.isOwnerUser = false;
        vm.show = false;
        vm.enabled = false;

        vm.$onInit = function () {
            initialize();
        };

        function initialize() {
            ParticipantsListManager.listeners({
                onPreInit: function () {
                    handlePreInit();
                },
                onPostInit: function () {
                    handlePostInit();
                },
                onSetOwnerParticipant: function (item) {
                    handleSetOwnerParticipant(item);
                },
                onAddParticipant: function (item) {
                    handleAddParticipant(item);
                },
                onPostCreateParticipant: function (item) {
                    handlePostCreateParticipant(item);
                }
            });
        }

        function handlePreInit() {
            vm.isOwnerUser = false;
            vm.show = false;
            vm.enabled = false;

            vm.participants = [];
            vm.ownerParticipant = null;
        }

        function handleAddParticipant(item) {
            vm.participants.push(item);
        }

        function handleSetOwnerParticipant(item) {
            vm.ownerParticipant = item;
        }

        function handlePostInit() {
            vm.show = angular.isDefined(vm.chatUser) && angular.isDefined(vm.ownerParticipant) && angular.isDefined(vm.conversation);
            vm.isOwnerUser = vm.ownerParticipant.id === vm.chatUser.id;

            if (vm.isOwnerUser) {
                vm.enabled = true;
            } else {
                enableForUser(vm.chatUser.id);
            }
        }

        function handlePostCreateParticipant(item) {

        }

        function enableForUser(userId) {
            var participant = null;

            for (var i = 0; i < vm.participants.length; i++) {
                var item = vm.participants[i];

                if (item.id === userId) {
                    participant = item;

                    break;
                }
            }

            vm.enabled = null !== participant && ParticipantsListManager.isDefaultParticipant(participant);
        }
    }
})();