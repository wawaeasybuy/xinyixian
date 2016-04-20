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
      self.showOpen = true;

      self.changeStyle = "";

      self.showQdcode = false;

      self.styleChange = function (){
          self.showOpen = false;
          self.changeStyle="position: fixed;top:0px;left: 0%;opacity: 0.8;";
          self.openNav = "opacity:0;transition:0.2s linear;"
        // position: fixed;top:0px;left: 0%;opacity: 0.8;
      };
      self.closeNav = function (){
        self.showOpen = true;
        self.changeStyle="";
        self.openNav = "opacity:1;transition:0.2s linear 0.6s;"
      };
      self.loadAgain = function (){
        delete self.category;
        delete self.tag;
        delete self.retrieval;
        self.articles=[];
        self._loadMore=true;
        loadArticle();
      };

      if(self.tag){
        delete self.category;
      }

      //重新生成路由
      var doLocation=function(){
        $location
          .search('id', self.category)
          .search('tag', self.tag);
        // console.log($location);
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
          if(self.retrieval){
            condition=_.merge(condition,{retrieval:self.retrieval});
          }
          if(self.category&&self.category!='all'){
            condition=_.merge(condition,{category:self.category});
          }
          if(self.tag){
            condition=_.merge(condition,{tag:self.tag});
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
              c.style="background:#0f0";
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
            c.style="border:5px solid #0f0";
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
            // console.log(info);
            switch(state){
              case 1:
                // console.log("highlight");
                highlight(info);
                break;
            }
            self.showSelected=info.name;
          }else{
            self.mouseout();
          }
          
       };

       //让二级目录亮
       var highlight=function(info){
          _.each(self.tags,function (tag){
            if(info.tags.indexOf(tag._id)>-1){
              tag.style="background:#0f0";
            }
          });
       };

       //鼠标移出
       self.mouseout=function(){
          _.each(self.tags,function (tag){
            tag.style="";
          });
          self.showSelected='全部文章';
          var c=_.findWhere(self.categories,{_id:self.category});
          if(c){
            self.showSelected=c.name;
            c.style="border:5px solid #0f0";
          }
          //tags
          c=_.findWhere(self.tags,{_id:self.tag});
          if(c){
            self.showSelected=c.name;
            c.style="background:#0f0";
          }
       };

       //重置category,tag
       var borderInit=function(){
          _.each(self.tags,function (tag){
            tag.style='';
          });
          _.each(self.categories,function (category){
            category.style='';
          });
       };

       //选择种类
       self.chooseCategory=function(category){
          //重置category,tag
          borderInit();
          self.category=category._id;
          delete self.tag;
          doLocation();
          // category.style="border:5px solid #0f0";

          // console.log(category);

       };

       //选择tag
       self.chooseTag=function(tag){
          borderInit();
          self.tag=tag._id;
          delete self.category;
          doLocation();
       };  

       // 打开二维码
       self.openQqQdcode = function (){
        
        if(self.showQdcode&&self.qdcode == "../assets/images/wechatQrcode.png"){
          self.qdcode = "../assets/images/qqQrcode.png";
        }else{
          self.showQdcode = !self.showQdcode;
          self.qdcode = "../assets/images/qqQrcode.png";
        }
        
       };
       self.openWechatQdcode = function (){
        if(self.showQdcode&&self.qdcode == "../assets/images/qqQrcode.png"){
          self.qdcode = "../assets/images/wechatQrcode.png";
        }else{
          self.showQdcode = !self.showQdcode;
          self.qdcode = "../assets/images/wechatQrcode.png";
        }
       };

        //搜索
       self.select=function(){
        // console.log("query");
          if(!self.retrieval){return;}
          self._loadMore=true;
          self.pagination.page=1;
          var condition={
            page:self.pagination.page,
            itemsPerPage:self.pagination.itemsPerPage
          };
          if(self.retrieval){
            condition=_.merge(condition,{retrieval:self.retrieval});
          }
          if(self.category&&self.category!='all'){
            condition=_.merge(condition,{category:self.category});
          }
          if(self.tag){
            condition=_.merge(condition,{tag:self.tag});
          }

          Article.index(condition,function (data){

            self.articles=data.articles;
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

  }]);