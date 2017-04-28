
(function() {

  'use strict';

  angular.module('set.social.components')
    .controller('containerController', ContainerController);

  ContainerController.$inject = ['$rootScope'];

  function ContainerController($rootScope) {

    var vm = this;
    vm.$onInit = onInit;
    vm.isOpenModal = false;
    vm.changeIsOpenModal =  changeIsOpenModal;

    function changeIsOpenModal() {
      vm.isOpenModal = !vm.isOpenModal;
    }

    function onInit() {
      vm.configChat = {
        "name"  : "Social Chat",
        "class" : "chat-icon",
        "counter": 0
      };
    };
  }
})();