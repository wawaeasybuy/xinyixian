'use strict';

angular.module('xinyixianApp')
  .controller('ViewAarticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category) {
       var self=this;
       self.id = $stateParams.id;
       
       //图片文件目录
      	self.hostDir=upload_image_url;

       var loadAirticle=function(){
       		Article.show({id:self.id},function (data){
       			self.article=data.article;
       			self.articleImage=self.hostDir+self.article.image;
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
       var init=function(){
       		loadAirticle();
       		loadCategory();
       };
        init();
  }]);

