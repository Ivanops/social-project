/*global angular */
var socialChat = angular.module('socialChat', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ui.bootstrap',
    'zInfiniteScroll'
]);

socialChat.config(function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
        .when('/', {
            templateUrl: '../html/login.html',
            controller: 'LoginController'
        })
        .when('/chat', {
            templateUrl: '../html/chat.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

socialChat.factory('User', function () {
    'use strict';
    return {id: '', username: '', name: ''};
});

socialChat.factory('Resource', function () {
    'use strict';
    return {id: '', label: ''};
});
