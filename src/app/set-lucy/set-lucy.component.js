(function(){
  'use strict';
  /**
  *  Module social component
  *
  * Description Componente related to avatar of Lucy
  */
  var component = {
    templateUrl: 'set-lucy.html',
    controller: 'lucyController'
  }

  angular.module('set.social.components')
    .component('setLucy', component);

})();