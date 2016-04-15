'use strict';

angular.module('xinyixianApp')
  .controller('ViewAarticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Auth) {
       var self=this;

      

       self.id = $stateParams.id;
       self.category = $stateParams.category;
       self.tag = $stateParams.tag;
       
       //图片文件目录
      	self.hostDir=upload_image_url;

       var loadAirticle=function(){
       		Article.show({id:self.id},function (data){
       			self.article=data.article;
       			self.articleImage=self.hostDir+self.article.image;
            if(!Auth.isAdmin()&&self.article.state!="2"){
              return $location.path('/');
            }
            loadPushAirticle();
       		});
       };

       var loadCategory=function(){
	       	var condition={
	          page:1,
	          itemsPerPage:4
	        };
	        Category.index(condition,function (data){
	          self.categories=data.categories;
	        });
       };

       var loadPushAirticle=function(){
          var condition={};
          if(self.category){
            condition=_.merge(condition,{category:self.category});
          }
          if(self.tag){
            condition=_.merge(condition,{tag:self.tag});
          }
          Article.pushArticle(condition,{},function (data){
            self.pushArticles=data.articles;
            var count=self.pushArticles.length;
            _.each(self.pushArticles,function (article){
              article.i=count;
              count--;
            });
          },function(){

          });
       };

       var init=function(){
       		loadAirticle();
       		loadCategory();
       };
        init();
  }]);

