'use strict';

angular.module('xinyixianApp')
  .controller('ViewTagController', ['$state', '$stateParams', '$location', '$scope', '$cookies', 'Tag',
    function ($state, $stateParams, $location, $scope, $cookies, Tag) {
    	var self=this;

    	var page = $stateParams.page || 1;
        var itemsPerPage = $stateParams.itemsPerPage || 10;

        self.pagination = {
          page: page,
          itemsPerPage: itemsPerPage,
          maxSize: 5,
          numPages: null,
          totalItems: null
        };

    	var init = function (){
    		loadTags();
    	};

    	var loadTags = function (){
    		 var condition = {
                itemsPerPage:self.pagination.itemsPerPage,
                page:self.pagination.page,
            };
    		Tag.index(condition,{},function (data){
    			self.tags = data.tags;
    			console.log(self.tags);
    			var count = self.pagination.itemsPerPage*(self.pagination.page-1)+1;
                self.pagination.totalItems = data.count;
                self.pagination.numPages = self.pagination.totalItems/self.pagination.itemsPerPage;
    		},function (){

    		});
    	};


    init();
  }]);

