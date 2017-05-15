/**
 * @author ctola
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .constant('APPLICATION', {
            'URL_SERVICE': 'http://localhost:8881',
            'URL_SOCKET': 'http://localhost:8881/chat-ws',
            'URL_SERVICE_USER': 'http://localhost:9990',
            'URL_AVATAR': 'https://randomuser.me/api/portraits',
            'AVATAR_THUMBNAIL': '/thumb',
            'AVATAR_MEDIUM': '/med',
            'AVATAR_MEN': '/men',
            'AVATAR_WOMEN': '/women',
            'URL_SOCKET_NOTIFICATION': 'http://localhost:8190/notification-ws',
            'URL_NOTIFICATION_SERVICE': 'http://localhost:8190',
        });
})();