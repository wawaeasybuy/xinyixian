'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category) {
       self = this;

      self.page = $stateParams.page || 1;
      self.itemsPerPage = $stateParams.itemsPerPage || 20;
      self.category = $stateParams.id;
      self.tag = $stateParams.tag;
      //图片文件目录
      self.hostDir=upload_image_url;

      self.pagination = {
        page: 1,
        itemsPerPage: 20,
        maxSize: 5,
        numPages: null,
        totalItems: null
      };

      self.pagination.page=self.page;
      self.pagination.itemsPerPage=self.itemsPerPage;
      // console.log("self.itemsPerPage",self.itemsPerPage);

      //重新生成路由
      var doLocation=function(){
        $location
          .search('page', self.pagination.page)
          .search('itemsPerPage', self.pagination.itemsPerPage)
          .search('id', self.category)
          .search('tag', self.tag);
        console.log($location);
      };

       self.go = function(){
       	$state.go('article-view');
       };
       //tag,category目前两者存一
       var loadArticle=function(){
          var condition={
            page:self.pagination.page,
            itemsPerPage:self.pagination.itemsPerPage
          };
          if(self.category&&self.category!='all'){
            condition=_.merge(condition,{category:self.category});
          }
          if(self.tag){
            condition=_.merge(condition,{tags:self.tag});
          }

       		Article.index(condition,function (data){
       			self.articles=data.articles;
            var i=1+self.itemsPerPage*(self.page-1);
            _.each(self.articles,function (article){
              article.i=i;
              i++;
            });
            self.pagination.page=data.page;
            self.pagination.totalItems=data.count;
            self.pagination.numPages=self.pagination.totalItems/self.pagination.itemsPerPage;
       		});
       };

       //载入category,
       var loadCategory=function(){
        var condition={
          page:1,
          itemsPerPage:4
        };
        Category.index(condition,function (data){
          self.categories=data.categories;
        });

       };

       var init=function(){
       		loadArticle();
          loadCategory();
       };

       //换页
       self.pageChanged=function(){
        doLocation();
       };

       init();
        
  }]);