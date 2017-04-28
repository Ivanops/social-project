
(function(){
  'use strict';
  var app = angular.module('set.social.components');
  app.component('setNavigator', {
    bindings: {
      resource : '<'
    },
    templateUrl: 'set-navigator.html',
    controller: 'navigatorController'
  });
})();
