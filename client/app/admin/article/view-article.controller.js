'use strict';

angular.module('xinyixianApp')
  .controller('ViewArticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category) {
       	var self=this;

       	self.page = $stateParams.page || 1;
      	self.itemsPerPage = $stateParams.itemsPerPage || 20;
      	self.category = $stateParams.category;
      	

      	//查询的page,itemsPerPage用这个变量的
    		self.pagination = {
    			page: 1,
    			itemsPerPage: 20,
    			maxSize: 5,
    			numPages: null,
    			totalItems: null
    		};

        self.selectedCategory='全部';
    		
    		self.pagination.page=self.page;
    		self.pagination.itemsPerPage=self.itemsPerPage;

       //重新生成路由
      	var doLocation=function(){
	        $location
	          .search('page', self.pagination.page)
	          .search('itemsPerPage', self.pagination.itemsPerPage)
	          .search('category', self.category)
	        console.log($location);
      	};

      	var loadArticle=function(){
      		var condition={
      			page:self.pagination.page,
      			itemsPerPage:self.pagination.itemsPerPage
      		};
          if(self.category&&self.category!='all'){
            condition=_.merge(condition,{category:self.category});
          }
      		Article.admin_index(condition,function (data){
      			self.articles=data.articles;
            //增加showState,1=草稿，2=发布，3=回收站
            _.each(self.articles,function (article){
              switch(article.state){
                case 1:
                  article.showState='草稿';
                  break;
                case 2:
                  article.showState='发布';
                  break;
                case 3:
                  article.showState='回收站';
                  break;
              }
            });
            // ng-bind="article.showState'"
      			self.pagination.page=data.page;
      			self.pagination.itemsPerPage=data.itemsPerPage;
      			self.pagination.totalItems=data.count;
      			self.pagination.numPages=self.pagination.totalItems/self.pagination.itemsPerPage;
      		});
      	};

        var loadCategory=function(){
            Category.all_index({},function (data){
                self.categories=data.categories;
                var c=_.findWhere(self.categories,{_id:self.category.toString()});
                if(c){
                  self.selectedCategory=c.name;
                }
            });
        };

       	var init=function(){
       		loadArticle();
          loadCategory();

      	};

        self.chooseCategory=function (category){
          if(category=='all'){
            self.category=category;
            self.selectedCategory='全部';
          }else{
            self.category=category._id;
            self.selectedCategory=category.name;
          }
          self.pagination.page=1;
          doLocation();
          loadArticle();
        };

        self.openCategory=function(){
            self._openCategory=!self._openCategory;
        };
        
        init();
  }]);