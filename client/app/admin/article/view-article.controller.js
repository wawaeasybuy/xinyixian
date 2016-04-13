'use strict';

angular.module('xinyixianApp')
  .controller('ViewArticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category) {
       	var self=this;

       	self.page = $stateParams.page || 1;
      	self.itemsPerPage = $stateParams.itemsPerPage || 20;
      	self.category = $stateParams.category;
        self.state = $stateParams.state;
      	

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
        //sattes:1草稿，2发布，3回收站
        self.states=[{_id:1,name:'草稿'},{_id:2,name:'发布'},{_id:3,name:'回收站'}];
        switch(self.state){
          case 1:
            self.selectedState='草稿';
            break;
          case 2:
            self.selectedState='发布';
            break;
          case 3:
            self.selectedState='回收站';
            break;
          default:
            self.selectedState='全部';
            break;
        }

       //重新生成路由
      	var doLocation=function(){
	        $location
	          .search('page', self.pagination.page)
	          .search('itemsPerPage', self.pagination.itemsPerPage)
	          .search('category', self.category)
            .search('state', self.state);
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
          // console.log(self.state);
          if(self.state&&self.state!='all'){
            condition=_.merge(condition,{state:self.state});
          }
      		Article.admin_index(condition,function (data){
      			self.articles=data.articles;
            var getStringArr=function(arr){
              var str='';
              if(arr.length>0){
                str=arr[0];
                for(var i=1;i<arr.length;i++){
                  str=str+','+arr[i];
                }
              }
              return str;
            };
            //初始化remindTag，showTags，isReadyDelete
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
              article.remindTag=getStringArr(article.remindTag);
              article.showTags=getStringArr(article.tags);
              // article.isReadyDelete=false;
            });
            // ng-bind="article.showState'"
      			self.pagination.page=data.page;
      			self.pagination.totalItems=data.count;
      			self.pagination.numPages=self.pagination.totalItems/self.pagination.itemsPerPage;
      		});
      	};

        var loadCategory=function(){
            Category.all_index({},function (data){
                self.categories=data.categories;
                if(self.category){
                  var c=_.findWhere(self.categories,{_id:self.category.toString()});
                  if(c){
                    self.selectedCategory=c.name;
                  }
                }
                
            });
        };

       	var init=function(){
       		loadArticle();
          loadCategory();
      	};

        var initOpen=function(){
          self._openState=false;
          self._openCategory=false;
          self.selectedAll=false;
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
          initOpen();
        };

        self.chooseState=function (state){
          if(state=='all'){
            self.state=state;
            self.selectedState='全部';
          }else{
            self.state=state._id;
            self.selectedState=state.name;
          }
          self.pagination.page=1;
          doLocation();
          loadArticle();
          initOpen();
        };

        self.openCategory=function(){
            self._openCategory=!self._openCategory;
        };
        
        self.openState=function(){
            self._openState=!self._openState;
        };

        //删除至回收站,如果已经是回收站内容提示删除为永久删除，确认删除
        //1草稿，2发布，3回收站
        self.dustbin=function(article){
          var state=article.state;
          console.log(article);
          if(state=='3'){
            if(confirm("该文章已在回收站,将永久删除,确认删除？")){
              Article.destory({id:article._id},function(){
                loadArticle();
              });
            }
          }else{
            if(confirm("确认移动至回收站？")){
              Article.dustbin({id:article._id},{},function (){
                loadArticle();
              },function(){

              });
            }
            
          }
        };

        //移动文章序号,1为上移，2为下移
        self.updateIndex=function(article,num){
          Article.updateIndex({id:article._id,state:num},{},function(){
            loadArticle();
            initOpen();
          },function (err){
            switch(err.data.error.msg){
              case 'article already is the frist':
              console.log('x');
                alert('该文章已经是第一篇文章！');
                break;
              case 'article already is the latest':
              console.log('y');
                alert('该文章已经是最后一篇文章！');
                break;
            }
          });
        };

        //发布
        self.release=function(id){
          Article.update({id:id},{state:2},function(){
            loadArticle();
            initOpen();
          },function(){

          });
        };

        //撤销发布
        self.cancelRelease=function(id){
          Article.update({id:id},{state:1},function(){
            loadArticle();
            initOpen();
          },function(){
            
          });
        };

        //选择勾选删除
        self.chooseDelete=function (article){
          article.isSelected=!article.isSelected;
          if(!article.isSelected){
            self.selectedAll=false;
          }
        };

        //全选删除
        self.chooseAllDelete=function(){
          _.each(self.articles,function (article){
            if(self.selectedAll){
              article.isSelected=false;
            }else{
              article.isSelected=true;
            }
            
          });
          if(self.selectedAll){
              self.selectedAll=false;
            }else{
              self.selectedAll=true;
            }
        };

        //批量移至回收站，批量彻底删除
        self.dustbin_all=function(){
          var arr=[];
          _.each(self.articles,function (article){
            if(article.isSelected){
              arr.push(article._id);
            }
          });
          if(self.state!=3){
            if(confirm("确定将选中文章移动至回收站？若要彻底删除,请选择状态为回收站,再点击。")){
              Article.dustbin_all({},{articles:arr},function (){
                console.log('success');
                loadArticle();
                initOpen();
              },function(){

              });
            }
          }else{
            if(confirm("确定将选中文章彻底删除？")){
              Article.destory_all({},{articles:arr},function (){
                console.log('success');
                loadArticle();
                initOpen();
              },function(){

              });
            }
          }
        };
        
        init();
  }]);