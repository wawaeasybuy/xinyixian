'use strict';

angular.module('xinyixianApp')
  .controller('EditArticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article',
    function ($state, $stateParams, $location, $scope,$cookies,Article) {
    	var self=this;

    	var init = function(){
    		initSample();
    	};

    	self.show=function(){
        	console.log("self.aaa",self.aaa);
        	var stem = CKEDITOR.instances.editor.getData();
        	console.log(stem);
        };

        init();
        
  }]);