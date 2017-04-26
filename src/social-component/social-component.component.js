
 (function(){
  'use strict';

  var component = {
    templateUrl: 'social-component.html'
    //controller: 'containerBoxController',
    // bindings: {
    //   resource      : '<',
    //   resourceName  : '<',
    //   serviceName   : '<',
    //   isOpen        : '='
    // }
  }

  angular.module('set.social.components')
    .component('setSocialComponent', component);

 })();
