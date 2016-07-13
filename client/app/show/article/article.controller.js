'use strict';

angular.module('xinyixianApp')
  .controller('ViewAarticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Auth) {

       var self=this;

      

       self.id = $stateParams.id;
       self.category = $stateParams.category;
       self.tag = $stateParams.tag;


       self.showBigImageModel=false;
       self.showQdcode = false;

       var isInitCode=true;
       //图片文件目录
      	self.hostDir=upload_image_url;

       var loadAirticle=function(){
       		Article.show({id:self.id},function (data){
       			self.article=data.article;
       			self.articleImage=self.hostDir+self.article.image;
            if(!Auth.isAdmin()&&self.article.state!="2"){
              return $location.path('/');
            }
            if(self.article.isBigImage){
              self.showBigImageModel=true;
            }
            //title
            document.title="'"+self.article.title+"'"+"| 新一线城市研究所";
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

       self.changeArticleUp = function (){
        var condition = {
          id:self.id,
          index:self.article.index,
          state: 1,
          category:self.category,
          tag:self.tag 
        };
        Article.change(condition,{},function (data){
          $state.go("view-article",{id:data.article._id,category:self.category,tag:self.tag});
        },function (){
          alert("该文章为第一篇文章");
        });
       };

       self.changeArticleDown = function (){
        var condition = {
          id:self.id,
          index:self.article.index,
          state: 2,
          category:self.category,
          tag:self.tag 
        };
        Article.change(condition,{},function (data){
          $state.go("view-article",{id:data.article._id,category:self.category,tag:self.tag});
        },function (){
          alert("该文章为最后一篇文章");
        });
       };

       var init=function(){
       		loadAirticle();
       		loadCategory();
       };

       self.closeBigImageModel=function(){
        self.showBigImageModel=false;
       };

       //初始化二维码状态
       var qdcode_init = function (){
        self.QdcodeBgcolor1 = '';
        self.QdcodeBgcolor2 = '';
        self.showWechatQdcode = false;
        self.showQqQdcode = false;
       };
       // 打开二维码
       self.openWechatQdcode = function (){
        qdcode_init();
        self.QdcodeBgcolor1 = 'background-color:#fff;';
        isInitCode=false;
        self.showWechatQdcode = true;
       };
       self.openQqQdcode = function (){
        qdcode_init();
        self.QdcodeBgcolor2 = 'background-color:#fff;';
        isInitCode=false;
        self.showQqQdcode = true;
       };
       

       //点击空白初始化二维码
       self.initCode=function(){
        if (isInitCode) {
          qdcode_init();
          self.showQdcode=false;
          self.showQdcode=false;
        };
        isInitCode=true;
          // qdcode_init();
       };

      //增加阅读量
       self.addpv=function(id){
          Article.addPv({id:id},{},function(){
            
          });
       };


    init();
  }]);

