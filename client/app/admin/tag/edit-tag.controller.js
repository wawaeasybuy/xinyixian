'use strict';

angular.module('xinyixianApp')
  .controller('EditTagController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Tag','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Tag,Auth) {
    	var self=this;
        if(!Auth.isAdmin()){
            return $location.path('/');
        }
    	self.id = $stateParams.id;

    	self.tag={
    		name:name
    	};

    	var init = function (){
    		loadTag();
    	};

    	var loadTag = function (){
    		Tag.show({id:self.id},function (data){
    			self.tag = data.tag;
    		},function (){

    		});
    	};


    	self.save = function (){
    		if(!self.tag.name){
    			return alert("name is required");
    		}
    		console.log("aaaa");
			Tag.update({id:self.id},{name:self.tag.name},function (data){
    			$state.go('tag-view');
    		},function (){

    		});
    	};

    	self.cancel = function (){
    		$state.go('tag-view');
    	};


    init();
  }]);