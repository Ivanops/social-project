(function() {

  'use strict';
  /**
   * @ngdoc function
   * @name modal.component
   * @description
   * Component Indicator
   */

  var component = {
    templateUrl: 'set-indicator.html',
    controller: 'indicatorController',
    bindings: {
      config: "<",
      resource: "<",
      onOpen: '&'
    }
  }

  angular.module('set.social.components')
    .component('setIndicator', component);

})();