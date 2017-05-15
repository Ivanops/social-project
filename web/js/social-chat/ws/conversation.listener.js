/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('ConversationWSListener', ConversationWSListener);

    ConversationWSListener.$inject = ['ParticipantsListManager', 'MessagesListManager'];

    function ConversationWSListener(ParticipantsListManager, MessagesListManager) {
        return {
            'handle': handle
        };

        function handle(msg) {
            var type = msg.type,
                message = msg.data;

            switch (type) {
                case 'createParticipant':
                    handleCreateParticipant(message);

                    break;
                case 'participantAcceptInvitation':
                    handleParticipantAcceptInvitation(message);

                    break;
                case 'createMessage':
                    handleCreateMessage(message);

                    break;
                case 'updateMessageInfo':
                    handleUpdateMessageInto(message);

                    break;
            }
        }

        function handleCreateParticipant(message) {
            ParticipantsListManager.createParticipant(message.participant);
        }

        function handleParticipantAcceptInvitation(message) {
            ParticipantsListManager.enableParticipant(message.participant);
        }

        function handleCreateMessage(data) {
            MessagesListManager.pushMsg(data.message);

        }

        function handleUpdateMessageInto(data) {
            //data.message
        }
    }
})();