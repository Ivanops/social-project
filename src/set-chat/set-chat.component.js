(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name chat.component
   * @description
   * Component Chat
   */

  var component = {
    controller: 'chatController',
    bindings: {
      resource: '<',
      data : '<',
      serviceName  : '<',
      resourceName : '<'
    },
    templateUrl: 'set-chat.html'
  }

  angular.module('set.social.components')
    .component('setChat', component);
})();