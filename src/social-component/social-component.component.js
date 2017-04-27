
(function(){
  'use strict';

  var component = {
    templateUrl: 'social-component.html',
    controller: 'socialComponentController',
    controllerAs: 'vm'
    // bindings: {
    //   resource      : '<',
    //   resourceName  : '<',
    //   serviceName   : '<',
    //   isOpen        : '='
    // }
  }

  angular.module('set.social.components')
    .component('setBox', component);

})();
