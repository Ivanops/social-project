/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('AddParticipantsPanelController', AddParticipantsPanelController);

    AddParticipantsPanelController.$inject = ['AddParticipantsPanelManager', 'UserProviderService'];

    function AddParticipantsPanelController(AddParticipantsPanelManager, UserProviderService) {
        var vm = this,
            _constants = {
                STATE: {
                    expanded: 'EXPANDED',
                    collapsed: 'COLLAPSED'
                }
            },
            _userIds = [];

        vm.state = _constants.STATE.collapsed;
        vm.show = false;
        vm.enabled = false;

        vm.searchForm = {
            item: null,
            hasNoResults: false,
            isLoading: false,
            hasSelection: false
        };

        vm.contactsForm = {
            users: []
        };

        vm.searchUser = function (usernameOrEmail) {
            vm.searchForm.hasSelection = false;

            return UserProviderService.searchByUsernameOrEmail({
                token: usernameOrEmail,
                userIds: _userIds
            }).then(function (data) {
                return data;
            });
        };

        vm.onSelect = function ($item) {
            vm.searchForm.hasSelection = true;
        };

        vm.addUser = function () {
            if (null !== vm.searchForm.item && vm.searchForm.hasSelection) {
                var usr = vm.searchForm.item;

                _userIds.push(usr.id);
                vm.contactsForm.users.push(usr);

                resetSearchForm();
            }
        };

        vm.removeUser = function (idx) {
            var usr = vm.contactsForm.users[idx],
                idIdx = _userIds.indexOf(usr.id);

            vm.contactsForm.users.splice(idx, 1);
            _userIds.splice(idIdx, 1);
        };

        vm.cancel = function () {
            AddParticipantsPanelManager.collapse();
        };

        vm.invite = function () {
            AddParticipantsPanelManager.collapse();
        };

        vm.$onInit = function () {
            initialize();
        };

        function initialize() {
            AddParticipantsPanelManager.listeners({
                onExpand: function () {
                    preOnExpand();
                    handleOnExpand();
                },
                onCollapse: function () {
                    handleOnCollapse();
                }
            });
        }

        function handleOnExpand() {
            _userIds.push(vm.ownerParticipant.id);

            angular.forEach(vm.participants, function (item) {
                _userIds.push(item.id);
            });
            vm.state = _constants.STATE.expanded;
        }

        function handleOnCollapse() {
            _userIds = [];
            vm.state = _constants.STATE.collapsed;

            resetSearchForm();
            resetContactsForm();
        }

        function preOnExpand() {
            _userIds = [];
            resetSearchForm();
            resetContactsForm();
        }

        function resetSearchForm() {
            vm.searchForm.item = null;
            vm.searchForm.hasNoResults = false;
            vm.searchForm.isLoading = false;
            vm.searchForm.hasSelection = false;
        }

        function resetContactsForm() {
            vm.contactsForm.users = [];
        }
    }
})();