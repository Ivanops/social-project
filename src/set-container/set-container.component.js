
(function(){
  'use strict';

  var component = {
    templateUrl: 'set-container.html',
    controller: 'containerController',
    bindings: {
      resource      : '<'
    }
  }

  angular.module('set.social.components')
    .component('setContainer', component);

})();
