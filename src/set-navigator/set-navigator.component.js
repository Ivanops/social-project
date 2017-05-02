
(function(){
  'use strict';
  var component = {
    bindings: {
      resource : '<',
      onClose: '&'
    },
    templateUrl: 'set-navigator.html',
    controller: 'navigatorController'
  }

  angular.module('set.social.components')
    .component('setNavigator', component);

})();
