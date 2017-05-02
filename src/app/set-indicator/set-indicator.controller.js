(function() {
  'use strict';

  angular.module('set.social.components')
    .controller('indicatorController', IndicatorController);

  IndicatorController.inject = ['$rootScope', '$timeout'];

  function IndicatorController($rootScope, $timeout) {

    var vm = this;
    vm.$onInit = onInit;
    vm.click = click;

    function onInit() {
      if (vm.config) {
        vm.class    = vm.config.class;
        vm.name     = vm.config.name;
        vm.counter  = vm.config.counter;
       }
      // vm.notificationCounter();
    };

    function click() {
      vm.onOpen()
    };

    vm.notificationCounter = function () {
      $rootScope.$on('notification-counter', function (event, data) {
        /*$timeout(function () {
          angular.element(document.querySelector('#indicator')).triggerHandler('click');
          // angular.element('#indicator').triggerHandler('click');
        }, 0);*/
        vm.counter = data;
      });
    };
  }
})();