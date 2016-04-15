'use strict';

angular.module('xinyixianApp')
  .controller('ViewClassifyController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Category','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Category,Auth) {
    	var self=this;
      if(!Auth.isAdmin()){
        return $location.path('/');
      }

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
    		Category.index_admin(condition,{},function (data){
    			self.categories=data.categories;
          self.pagination.page=data.page;
          self.pagination.totalItems=data.count;
          self.pagination.numPages=self.pagination.totalItems/self.pagination.itemsPerPage;
    		},function(){});
    	};

      //删除分类
      self.destory=function(category){
        if(confirm("确认删除该分类？")){
          Category.destory({id:category._id},{},function(){
            loadCategory();
          },function(){

          });
        }
      };

      //选择删除
      self.choosenDelete=function(category){
        category.isSelected=!category.isSelected;
        if(!category.isSelected){
          self.selectedAll=false;
        }
      };

      //全选删除
      self.chooseAllDelete=function(){
        _.each(self.categories,function (category){
          if(self.selectedAll){
            category.isSelected=false;
          }else{
            category.isSelected=true;
          }
          
        });
        if(self.selectedAll){
          self.selectedAll=false;
        }else{
          self.selectedAll=true;
        }
        //去掉默认分类的勾选
        _.findWhere(self.categories,{sign:'1'}).isSelected=false;
      };

      //批量删除
      self.destory_all=function(){
        if(confirm("确认删除这些分类?")){
          var arr=[];
          _.each(self.categories,function (category){
            if(category.isSelected){
              arr.push(category._id);
            }
          });
          Category.destory_all({},{categories:arr},function(){
            loadCategory();
            self.selectedAll=false;
          },function(){

          });
        }
        
      };

    	init();
    	
  }]);

