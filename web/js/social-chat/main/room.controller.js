/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .controller('RoomController', RoomController);

    RoomController.$inject = ['$scope', 'ChatService', 'RoomManager', 'RoomModel', 'ConversationsModel', 'ConversationModel', 'AlertService', 'MessageService', 'AddParticipantsPanelManager'];

    function RoomController($scope, ChatService, RoomManager, RoomModel, ConversationsModel, ConversationModel, AlertService, MessageService, AddParticipantsPanelManager) {
        var vm = this;

        vm.sendButtonEnabled = false;

        vm.chatTextareaEnabled = false;

        vm.enableConversationOptions = false;

        vm.messagesPanel = {
            'messages': []
        };

        vm.chatUser = {};
        vm.resource = {};
        vm.conversations = [];

        vm.activeConversation = null;
        vm.visitorUser = true;
        vm.ownerUser = false;

        vm.isPublicConversation = true;
        vm.isPrivateConversation = false;
        vm.isGuestUser = false;
        vm.recipientCounter = 0;
        vm.conversationAlerts = [];

        vm.conversationPanel = {
            'opened': false,
            'label': ''
        };

        vm.participantPanel = {
            'participants': [],
            'ownerParticipant': {}
        };

        vm.msg = {
            'text': ''
        };

        vm.$onInit = function () {
            vm._initListeners();

            RoomModel.cfg({
                'onChangeResource': function () {
                    vm.resource = RoomModel.getResource();
                },
                'onChangeChatUser': function () {
                    vm.chatUser = RoomModel.getChatUser();
                }
            });

            ConversationsModel.cfg({
                'onSetConversations': function () {
                    vm._setConversations();
                },
                'onChangeModel': function () {
                    vm.conversations = ConversationsModel.getElements();
                }
            });

            ConversationModel.cfg({
                'onPostOpen': function () {
                    vm._postOpenConversation();
                },
                'onRecipientCounterChange': function () {
                    vm.recipientCounter = ConversationModel.getRecipientCounter();
                },
                'onActiveChange': function () {
                    vm.enableConversationOptions = true;

                    vm.activeConversation = ConversationModel.getActive();
                    vm.visitorUser = ConversationModel.getIsVisitorUser();
                    vm.ownerUser = ConversationModel.getOwnerUserId() === RoomModel.getChatUser().id;
                    vm.isPublicConversation = ConversationModel.isPublicConversation();
                    vm.isPrivateConversation = ConversationModel.isPrivateConversation();
                    vm.isGuestUser = ConversationModel.getIsGuestUser();
                    vm.recipientCounter = ConversationModel.getRecipientCounter();


                    vm.conversationAlerts = [];


                    vm.chatTextareaEnabled = false;
                },
                'onActiveConversationIdChange': function () {
                    RoomManager.openConversation(ConversationModel.getActiveConversationId());
                }
            });

            AlertService.cfg({
                'onAlert': function (alert) {
                    vm.conversationAlerts.push(alert);
                }
            });

            RoomManager.startUp();
        };

        vm.joinToConversation = function () {

        };

        vm.doPrivateConversation = function () {
        };

        vm.doPublicConversation = function () {

        };

        vm.sendMessage = function () {
            var content = vm.msg.text;

            if (content) {
                MessageService.createTextMessage(ConversationModel.getActive().id, content)
                    .then(function () {
                        vm.msg.text = '';
                    });
            }
        };

        vm.openConversation = function (conversation) {
            ConversationModel.setActiveConversationId(conversation.id);
        };

        vm.openConversationPanel = function () {
            vm.conversationPanel.opened = true;
            vm.conversationPanel.label = '';
        };

        vm.createConversation = function ($event) {
            var keyCode = $event.which || $event.keyCode;

            if (keyCode === 13) {
                vm.conversationPanel.opened = false;

                ChatService.createConversation(RoomModel.getChatUser().id, vm.conversationPanel.label, RoomModel.getResource().id);
            }
        };

        vm.showParticipantPanel = function () {
            AddParticipantsPanelManager.expand();
        };


        vm._initListeners = function () {
        };

        vm._postOpenConversation = function () {
            if (!ConversationModel.getIsVisitorUser() && !ConversationModel.getIsGuestUser()) {
                vm.chatTextareaEnabled = true;

            }
        };


        vm._setConversations = function () {
            vm.enableConversationOptions = false;

            vm.conversations = ConversationsModel.getElements();

            if (ConversationsModel.getElements() == 0) {
                vm.activeConversation = null;

                AlertService.fireYesNoAlert({
                    'msg': 'Do you want create a conversation?',
                    'onYes': function () {
                        vm.openConversationPanel();
                    }
                });
            }
        }
    }
})();