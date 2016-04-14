'use strict';

angular.module('xinyixianApp')
  .controller('ViewClassifyController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Category',
    function ($state, $stateParams, $location, $scope,$cookies,Category) {
    	var self=this;

    	self.page = $stateParams.page || 1;
      	self.itemsPerPage = $stateParams.itemsPerPage || 20;
      	self.host=hostUrl+'?';
      	//查询的page,itemsPerPage用这个变量的
		self.pagination = {
			page: 1,
			itemsPerPage: 20,
			maxSize: 5,
			numPages: null,
			totalItems: null
		};
    		
		self.pagination.page=self.page;
		self.pagination.itemsPerPage=self.itemsPerPage;

		//重新生成路由
      	var doLocation=function(){
	        $location
	          .search('page', self.pagination.page)
	          .search('itemsPerPage', self.pagination.itemsPerPage);
	        console.log($location);
      	};

    	var init=function(){
    		loadCategory();
    	};

    	var loadCategory=function(){
    		var condition={
      			page:self.pagination.page,
      			itemsPerPage:self.pagination.itemsPerPage
      		};
    		Category.index(condition,function (data){
    			self.categories=data.categories;
    		});
    	};

    	init();
    	
  }]);

