/*global angular */
angular.module('socialChat').controller('LoginController', function ($scope, $location, $http, User, $localStorage, RoomManager) {
    'use strict';
    var login = this;
    $scope.User = User;
    login.userLogin = function () {

        if (this.username) {
            var result = $http.post('http://localhost:9990/login', this.username).
                then(function (response) {
                    console.log(response.data);
                    $scope.User.id = response.data.id;
                    $scope.User.username = response.data.username;
                    $scope.User.name = response.data.name;

                    $localStorage.User = response.data;
                    $localStorage.resourceId = login.resourceId;

                    RoomManager.setResourceId(login.resourceId);
                    RoomManager.setUserId(response.data.id);

                    $location.path("/chat");
                });

        } else {
            alert('invalid username');
        }
    };
});
