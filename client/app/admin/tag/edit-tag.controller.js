'use strict';

angular.module('xinyixianApp')
  .controller('EditTagController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Tag',
    function ($state, $stateParams, $location, $scope,$cookies,Tag) {
    	var self=this;

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