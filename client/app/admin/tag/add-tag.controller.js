'use strict';

angular.module('xinyixianApp')
  .controller('AddTagController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Tag','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Tag,Auth) {
    	var self=this;
        if(!Auth.isAdmin()){
            return $location.path('/');
        }
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