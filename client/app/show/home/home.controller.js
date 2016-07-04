'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Tag',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Tag) {
      //title
      document.title="新一线城市研究所";

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
      self.showSelected="所 有 文 章";
      self.showOpen = true;

      self.changeStyle = "";

      self.showQdcode = false;

      var isInitCode=true;

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
        var open=true;
        if(self.category||self.tag){
          open=false;
        }
        delete self.category;
        delete self.tag;
        delete self.retrieval;
        self.articles=[];
        doLocation();
        if(open){
          loadArticle();
        }
        
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

       //将tag转化为str
       var getStringArr=function(arr){
          var str='';
          if(arr.length>0){
            str=arr[0].name;
            for(var i=1;i<arr.length;i++){
              str=str+','+arr[i].name;
            }
          }
          return str;
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
              article.showTag=getStringArr(article.tags);
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
              //title
              document.title="'"+self.showSelected+"'"+"| 新一线城市研究所";
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
            //title
            document.title="'"+self.showSelected+"'"+"| 新一线城市研究所";
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

       var qdcode_init = function (){
        self.QdcodeBgcolor1 = '';
        self.QdcodeBgcolor2 = '';
        self.showWechatQdcode = false;
        self.showQqQdcode = false;
       };

       // 打开二维码
       self.openQqQdcode = function (){
        qdcode_init();
        isInitCode=false;
        if(self.showQdcode&&self.qdcode == "../assets/images/wechatQrcode.png"){
          self.qdcode = "../assets/images/qqQrcode.png";
          self.QdcodeBgcolor2 = 'background-color:#fff';
          self.showQqQdcode = true;
        }else{
          self.showQdcode = !self.showQdcode;
          if(self.showQdcode){
            self.qdcode = "../assets/images/qqQrcode.png";
            self.QdcodeBgcolor2 = 'background-color:#fff';
            self.showQqQdcode = true;
          }
        }
        
       };
       self.openWechatQdcode = function (){
        qdcode_init();
        isInitCode=false;
        if(self.showQdcode&&self.qdcode == "../assets/images/qqQrcode.png"){
          self.qdcode = "../assets/images/wechatQrcode.png";
          self.QdcodeBgcolor1 = 'background-color:#fff';
          self.showWechatQdcode = true;
        }else{
          self.showQdcode = !self.showQdcode;
          if(self.showQdcode){
            self.qdcode = "../assets/images/wechatQrcode.png";
            self.QdcodeBgcolor1 = 'background-color:#fff';
            self.showWechatQdcode = true;
          }
        }
       };

        //搜索
       self.select=function(){
        // console.log("query");
          
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
       //增加阅读量
       self.addpv=function(id){
          Article.addPv({id:id},{},function(){
            
          });
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

       //
       // self.go=function(article){
       //    console.log("xxxx");
       //    $location.absUrl("http://wwww.baidu.com");
       // };
  }]);