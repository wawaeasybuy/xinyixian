'use strict';

angular.module('xinyixianApp')
  .controller('AddTagController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Tag',
    function ($state, $stateParams, $location, $scope,$cookies,Tag) {
    	var self=this;

    	self.tags={
    		name:name
    	};


    	self.save = function (){
    		if(!self.tags.name){
    			return alert("name is required");
    		}
    		console.log("aaaa");
			Tag.create({},{name:self.tags.name},function (data){
    			$state.go('tag-view');
    		},function (){

    		});
    	};

    	self.cancel = function (){
    		$state.go('tag-view');
    	};

    
  }]);