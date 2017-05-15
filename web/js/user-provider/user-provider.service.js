/**
 * @author ivan.alban
 */
(function () {
    'use strict';

    angular
        .module('socialChat')
        .factory('UserProviderService', UserProviderService);

    UserProviderService.$inject = ['$log', '$http', 'USER_PROVIDER'];

    function UserProviderService($log, $http, USER_PROVIDER) {

        return {
            findUserById: findUserById,
            searchByUsernameOrEmail: searchByUsernameOrEmail
        };

        function searchByUsernameOrEmail(cfg) {
            var data = {
                idsusers: cfg.userIds,
                usernameOrEmail: cfg.token
            };

            return $http.post(USER_PROVIDER.api + '/users/byUsernameOrEmail', data)
                .then(handleSuccessResponse)
                .catch(handleErrorResponse);
        }

        function findUserById(id) {
            return $http.get(USER_PROVIDER.api + '/users/' + id)
                .then(handleSuccessResponse)
                .catch(handleErrorResponse);
        }

        function handleSuccessResponse(response) {
            return response.data;
        }

        function handleErrorResponse(error) {

        }
    }
})();