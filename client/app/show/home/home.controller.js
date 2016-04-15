'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Tag',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Tag) {
       self = this;

      self.category = $stateParams.id;
      self.tag = $stateParams.tag;
      //图片文件目录
      self.hostDir=upload_image_url;

      self.pagination = {
        page: 1,
        itemsPerPage: 20,
        totalItems: null
      };
      self.articles=[];
      self._loadMore=true;
      // console.log("self.itemsPerPage",self.itemsPerPage);
      self.showSelected="所有文章";

      //重新生成路由
      var doLocation=function(){
        $location
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

       			self.articles=self.articles.concat(data.articles);
            // console.log(self.articles);
            self.pagination.page=data.page;
            self.pagination.totalItems=data.count;
            var count=data.count;
            _.each(self.articles,function (article){
              article.i=count;
              count--;
            });
            if(self.pagination.page*self.pagination.itemsPerPage>=self.pagination.totalItems){
              self._loadMore=false;
            }

       		});
       };

       //载入tag
       var loadTag=function(){
          var condition={
            page:1,
            itemsPerPage:16
          };
          Tag.index(condition,{},function (data){
            self.tags=data.tags;
            var c=_.findWhere(self.tags,{_id:self.tag});
            if(c){
              self.showSelected=c.name;
            }
          },function(){ 

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
          var c=_.findWhere(self.categories,{_id:self.category});
          if(c){
            self.showSelected=c.name;
          }
        });

       };

       var init=function(){
       		loadArticle();
          loadCategory();
          loadTag();
       };

       //loadMore
       self.loadMore=function(){
        self.pagination.page++;
        loadArticle();
       };

       init();

       //鼠标滑过时,1=category,2=tag
       self.mousehover=function(info,state){
          // console.log(category);
          if(info){
            switch(state){
              case 1:
                
                break;
              case 2:
                
                break;
            }
            self.showSelected=info.name;
          }else{
            self.mouseout();
          }
          
       };

       //鼠标移出
       self.mouseout=function(){
          _.each(self.tags,function (tag){
            tag.style="background:#9a9a9a"
          });
          self.showSelected='全部文章';
          var c=_.findWhere(self.categories,{_id:self.category});
          if(c){
            self.showSelected=c.name;
          }
          c=_.findWhere(self.tags,{_id:self.tag});
          if(c){
            self.showSelected=c.name;
          }
       };
        
  }]);