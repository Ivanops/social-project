/**
 * @author ctola
 */
(function () {
  'use strict';

  angular
    .module('socialChat')
    .factory('NotificationService', NotificationService);

  NotificationService.$inject = ['APPLICATION', '$http', '$q','$rootScope','RoomModel'];
  function NotificationService(APPLICATION, $http, $q,$rootScope,RoomModel) {
    var vm = this;
    var _connected = false,
      _stompClient = {},
      _headers = {},
      _subscribers = {};
    var webSocketClient = null;
    var userId = userId
    vm.counter = 0;

    var service = {
      connectNotification:connectNotification,
      getCounter            : getCounter,
      getNotifications      : getNotifications,
      getUser               : getUser,
      updateMessage         : updateMessage,
      processInvitation     : processInvitation
    };

    function connectNotification(userId) {
      var socket = new SockJS(APPLICATION.URL_SOCKET_NOTIFICATION),
        deferred = $q.defer();

      _subscribers = {};

      _stompClient = Stomp.over(socket);
      webSocketClient = _stompClient;
      _stompClient.connect(
        _headers,
        function (frame) {
          _connected = true;
          _stompClient.subscribe('/topic/' + userId + '/messages', function (messageResponse) {
            var response = JSON.parse(messageResponse.body);

            if('unreadNotifications' === response.type) {
             $rootScope.$emit('unreadNotifications-response', response);
              vm.counter = response.counter;
             } else if ('newNotification' === response.type) {
             $rootScope.$emit('new-notification', response);
             }
          });

          getCounter(userId);

          deferred.resolve();
        },
        function (error) {
          _connected = false;

          console.error(error);
          throw new Error('Unable to establish a websocket connection');
        }
      );

      return deferred.promise;
    }

    function getCounter(userId) {
      webSocketClient.send('/app/subscribe/'+userId, {});
    }

    function getNotifications(url, userId, time) {
      var optionsObj = {
        relevantScope: $rootScope.$new(),
        showLoading: true
      };
      //console.log(url+'/notifications/user/'+userId+'?dateMillis='+time);
      return $http.get(url+'/notifications/user/'+userId+'?dateMillis='+time, optionsObj);
    }

    function processInvitation(url, data) {
      return $http.post(url+'/participants/invitation', data);
    }

    function getUser(url, userId) {
      var optionsObj = {
        relevantScope: $rootScope.$new(),
        showLoading: true
      };
      return $http.get(url+'/users/'+userId, optionsObj);
    }

    function updateMessage(url, notificationId, state) {
      var optionsObj = {
        relevantScope: $rootScope.$new(),
        showLoading: true
      };
      return $http.put(url+'/notifications/'+notificationId, state, optionsObj);
    }

    // Message Item
    // function setWebSocketClientMessageItem(client) {
    //   messageItemService.setWebSocketClient(client);
    // }



    return service;
  }
})();