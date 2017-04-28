(function() {

  'use strict';
  /**
   * @ngdoc function
   * @name modal.component
   * @description
   * Component Indicator
   */

  angular.module('set.social.components')
    .component('setIndicator', {
    templateUrl: 'set-indicator.html',
    controller: 'indicatorController',
    bindings: {
      config: "<",
      resource: "<",
      open: '&'
    }
  });
})();