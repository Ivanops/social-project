/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ChatUserWSListener', ChatUserWSListener);

    ChatUserWSListener.$inject = ['ConversationsModel', 'ConversationModel', 'ParticipantsListManager', 'MessagesListManager'];

    function ChatUserWSListener(ConversationsModel, ConversationModel, ParticipantsListManager, MessagesListManager) {
        return {
            'handle': handle
        };

        function handle(msg) {
            var type = msg.type,
                message = msg.data;

            switch (type) {
                case 'initializeUserRoom':
                    handleInitializeUserRoom(message);

                    break;
                case 'openConversation':
                    handleOpenConversation(message);

                    break;
                case 'unReadMessagesCounter':
                    handleUnReadMsgCounter(message);

                    break;
            }
        }

        function handleOpenConversation(message) {
            ConversationModel.setActive(message.conversation,
                message.owner.userId,
                message.visitorUser,
                message.guestParticipant);


            ParticipantsListManager.init({
                participants: message.participants
            });

            MessagesListManager.init({
                messages: message.messages
            });

            ConversationModel.postOpen();
        }

        function handleInitializeUserRoom(message) {
            ConversationsModel.setElements(message.conversations);

            if (ConversationsModel.getElements().length > 0) {
                var conversations = ConversationsModel.getElements(),
                    conversation = conversations[0];

                ConversationModel.setActiveConversationId(conversation.id);
            }
        }

        function handleUnReadMsgCounter(message) {
            if (ConversationModel.getActive().id === message.conversation.id) {
                ConversationModel.setRecipientCounter(message.counter);
            }
        }
    }
})();