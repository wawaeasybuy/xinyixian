'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Upload',
    function ($state, $stateParams, $location, $scope,$cookies,Upload) {
       self = this;

       self.go = function(){
       	$state.go('article-view');
       };
        
  }]);