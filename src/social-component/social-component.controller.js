
(function(){
  'use strict';

  angular.module('set.social.components')
    .controller('socialComponentController', SocialComponentController);

  function SocialComponentController() {
    var vm = this;
    vm.name = 'Social Component controller'
  }

})();
