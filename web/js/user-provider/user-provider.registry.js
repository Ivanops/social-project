/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('UserProviderRegistry', UserProviderRegistry);

    UserProviderRegistry.$inject = ['$q', 'UserProviderService'];

    function UserProviderRegistry($q, UserProviderService) {
        var _cache = {};

        return {
            findUser: findUser
        };

        function findUser(userId) {
            var deferred = $q.defer();

            if (_cache.hasOwnProperty(userId)) {
                deferred.resolve(_cache[userId]);
            } else {
                UserProviderService.findUserById(userId)
                    .then(function (user) {
                        register(user);

                        deferred.resolve(_cache[userId]);
                    });
            }

            return deferred.promise;
        }

        function register(user) {
            _cache[user.id] = {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                status: user.status
            };
        }
    }
})();