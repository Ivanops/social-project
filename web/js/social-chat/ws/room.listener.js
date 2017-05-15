/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('RoomWSListener', RoomWSListener);

    RoomWSListener.$inject = ['ConversationsModel', 'ConversationModel'];

    function RoomWSListener(ConversationsModel, ConversationModel) {
        return {
            'handle': handle
        };

        function handle(msg) {
            var type = msg.type,
                message = msg.data;

            switch (type) {
                case 'conversationalAction':

                    break;
                case 'createConversation':
                    handleCreateConversation(message);

                    break;
                case 'updateConversation':

                    break;
            }
        }

        function handleCreateConversation(message) {
            ConversationsModel.addElement(message.conversation);

            if (ConversationsModel.getElements().length === 1) {
                var conversations = ConversationsModel.getElements(),
                    conversation = conversations[0];

                ConversationModel.setActiveConversationId(conversation.id);
            }
        }
    }
})();