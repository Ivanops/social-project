/**
 * Created by mjimenez on 5/10/2017.
 */
(function () {
  'use strict';

  var app = angular.module('socialChat');
  app.controller('notificationController', NotificationController);

  NotificationController.$inject = ['$rootScope','$scope', '$q','NotificationService','APPLICATION','RoomModel','$timeout'];//, 'notificationService', 'sessionService', 'setSocialDataService'

  function NotificationController($rootScope, $scope, $q,NotificationService,APPLICATION, RoomModel,$timeout) {//notificationService, sessionService, setSocialDataService
    var vm = this;
    var userId = RoomModel.getChatUser().id;
    vm.textLink = 'See All';
    vm.config = {};
    vm.messages = [];

    vm.$onInit = function () {
      /*vm.loadConfig();
        $timeout(function() {
          userId = RoomModel.getChatUser().id;
          NotificationService.connectNotification(RoomModel.getChatUser().id);
        }, 500);
        vm.loadOpenNotifications();
        vm.loadNewNotification();
       vm.setupCounterNotifications();*/
    };

    vm.loadConfig = function () {
      vm.config = {
        "name"    : "Social Notification",
        "id"      : "socialNotification",
        "class"   : "notification-icon",
        "expand"  : false,
        "counter" : 0
      };
    };

    vm.click = function() {
      vm.loadOpenNotifications();
    };

    vm.seeAll = function () {
      vm.config.expand = !vm.config.expand;
      if(vm.config.expand){
        vm.textLink = 'See Less';
      }else{
        vm.textLink = 'See All';
      }
    };

    vm.loadOpenNotifications = function () {
      userId = RoomModel.getChatUser().id;
        var currentmillis = Date.now();
        NotificationService.getNotifications(APPLICATION.URL_NOTIFICATION_SERVICE, userId, currentmillis).then(function (response) {
          var message = null;
          var arrayMessage = [];
          angular.forEach(response.data.content, function (data) {
            if(data.actionCode === 'PARTICIPANT_MEMBER_GUEST'  || data.actionCode === 'JOIN_TO_CONVERSATION') {
              message = {
                actionCode: data.actionCode,
                value: data.label,
                date: data.notificationDate,
                notificationId: data.notificationId,
                avatar: data.payload.senderAvatar,
                email: data.payload.email,
                owner: data.payload.senderName,
                userName: data.payload.userName,
                resource: data.resourceId,
                state: data.state,
                senderUserId: data.senderUserId,
                conversationId: data.payload.conversationId,
                userId:data.userId
              };
            } else if (data.actionCode === 'TEXT_MSG_CREATED') {
              message = {
                actionCode: data.actionCode,
                value: data.label,
                date: data.notificationDate,
                notificationId: data.notificationId,
                avatar: data.payload.avatar,
                owner: data.payload.owner,
                resource: data.resourceId,
                state: data.state,
                senderUserId: data.senderUserId,
                conversationId: data.payload.conversationId
              };
            }
            arrayMessage.push(message);
          });
          vm.messages = arrayMessage;
        });
    };

    vm.loadNewNotification = function () {
      $rootScope.$on('new-notification', function (event, data) {
        var messageResponse = {};
        if(data.actionCode === 'PARTICIPANT_MEMBER_GUEST'  || data.actionCode === 'JOIN_TO_CONVERSATION') {
          messageResponse = {
            actionCode: data.actionCode,
            value: data.label,
            date: data.notificationDate,
            notificationId: data.notificationId,
            avatar: data.payload.senderAvatar,
            email: data.payload.email,
            owner: data.payload.senderName,
            userName: data.payload.userName,
            resource: data.resourceId,
            state: data.state,
            senderUserId: data.senderUserId,
            conversationId: data.payload.conversationId,
            userId:data.userId
          };
        } else if (data.actionCode === 'TEXT_MSG_CREATED') {
          messageResponse = {
            actionCode: data.actionCode,
            value: data.label,
            date: data.notificationDate,
            notificationId: data.notificationId,
            avatar: data.payload.avatar,
            owner: data.payload.owner,
            resource: data.resourceId,
            state: data.state,
            senderUserId: data.senderUserId,
            conversationId: data.payload.conversationId
          };
        }
        vm.messages.push(messageResponse);
        vm.config.counter = vm.config.counter + 1;
        vm.counter = vm.config.counter;
        $scope.$apply();
      });
    };

    vm.readNotificationMessage = function (data) {
        var state = {"state": "READ"};
        NotificationService.updateMessage(APPLICATION.URL_NOTIFICATION_SERVICE, data.notificationId, state).then(function (response) {
          angular.forEach(vm.messages, function (message, key) {
            if(message.notificationId === response.data.content.id){
              message.state = response.data.content.state;
              vm.config.counter = vm.config.counter - 1;
              vm.counter = vm.config.counter;
            }
          });
        });
    };

    vm.lazyLoadNotifications = function () {
      var currentmillis = vm.messages[vm.messages.length - 1].date;
      NotificationService.getNotifications(APPLICATION.URL_SOCKET_NOTIFICATION, userId, currentmillis).then(function (response) {
        var message = null;
        angular.forEach(response.content, function (data) {
          if(data.actionCode === 'PARTICIPANT_MEMBER_GUEST' || data.actionCode === 'JOIN_TO_CONVERSATION') {
            message = {
              actionCode: data.actionCode,
              value: data.label,
              date: data.notificationDate,
              notificationId: data.notificationId,
              avatar: data.payload.senderAvatar,
              email: data.payload.email,
              owner: data.payload.senderName,
              userName: data.payload.userName,
              resource: data.resourceId,
              state: data.state,
              senderUserId: data.senderUserId,
              conversationId: data.payload.conversationId,
              userId:data.userId
            };
          } else if (data.actionCode === 'TEXT_MSG_CREATED') {
            message = {
              actionCode: data.actionCode,
              value: data.label,
              date: data.notificationDate,
              notificationId: data.notificationId,
              avatar: data.payload.avatar,
              owner: data.payload.owner,
              resource: data.resourceId,
              state: data.state,
              senderUserId: data.senderUserId,
              conversationId: data.payload.conversationId
            };
          }
          vm.messages.unshift(message)
        });
      });
    };

    vm.setupCounterNotifications = function () {
      $rootScope.$on('unreadNotifications-response', function (event, data) {
        vm.config.counter = data.counter;
        vm.counter = data.counter;
        $scope.$apply();
      });
    };

    vm.getUserNotification = function (url, userId) {
      NotificationService.getUser(url, userId);
    };

    vm.addParticipantYes = function (message) {

      var user = {
        answer: "ACCEPT",
        conversationId: message.conversationId,
        guestUserId: userId
      }
      NotificationService.processInvitation(APPLICATION.URL_SERVICE, user).then(function (response) {
        console.log(response);
      });
      vm.readNotificationMessage(message);

    };

    vm.addParticipantNo = function (message) {
      var user = {
        answer: "REJECT",
        conversationId: message.conversationId,
        guestUserId: userId
      }
      NotificationService.processInvitation(APPLICATION.URL_SERVICE, user).then(function (response) {
        console.log(response);
      });
      vm.readNotificationMessage(message);
    };

  }
})();