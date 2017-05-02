
(function() {
  'use strict';
  var app = angular.module('set.social.components');
  app.controller('navigatorController', NavigatorController);

  NavigatorController.$inject = [];
  function NavigatorController() {
    var vm = this;
    var userSend = '';
    var counterLast = 0;
    vm.$onInit = onInit;
    vm.click = click;
    vm.close = close;


    function onInit() {
      vm.counter  = 0;
      // vm.notificationCounter();
      // vm.userId = sessionService.getUserStorage().id;
    };

    function close() {
      vm.onClose();
    };

    function click() {
      vm.counter = vm.counter +1;
    };

    vm.notificationCounter = function () {
      $rootScope.$on('chat-edit-message-response-position-ws-counter-byusers', function (event, data) {
        var listParticipants = data.body.content;
        if(listParticipants.countUnread === undefined){
          listParticipants.forEach(function(element) {
            if(element.participant.userId === vm.userId){
              vm.counter = element.countUnread;
              //break;
            }
          });

        }else{
          userSend = listParticipants.userId;
          if(vm.userId === userSend && userSend !== ''){
            vm.counter = listParticipants.countUnread;
          }

        }

      });
      $rootScope.$on('chat-edit-message-response-position-ws-counter-user', function (event, data) {
        userSend = data.body.content.messages.sender.userId;
        if(vm.userId !== userSend && userSend !== ''){
          vm.counter = counterLast;
        }
      });
      $rootScope.$on('chat-edit-message-response-position-ws-counter', function (event, data) {
        console.log('POSTION:',data.body.content.countUnread);
        counterLast = data.body.content.countUnread;
      });
    };
  }
})();