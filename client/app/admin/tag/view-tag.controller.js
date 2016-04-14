'use strict';

angular.module('xinyixianApp')
  .controller('ViewTagController', ['$state', '$stateParams', '$location', '$scope', '$cookies', 'Tag',
    function ($state, $stateParams, $location, $scope, $cookies, Tag) {
    	var self=this;

    	var page = $stateParams.page || 1;
        var itemsPerPage = $stateParams.itemsPerPage || 10;

        self.pagination = {
          page: page,
          itemsPerPage: itemsPerPage,
          maxSize: 5,
          numPages: null,
          totalItems: null
        };

    	var init = function (){
    		loadTags();
    	};

    	var loadTags = function (){
    		 var condition = {
                itemsPerPage:self.pagination.itemsPerPage,
                page:self.pagination.page,
            };
    		Tag.index(condition,{},function (data){
    			self.tags = data.tags;
    			// console.log(self.tags);
    			var count = self.pagination.itemsPerPage*(self.pagination.page-1)+1;
                self.pagination.totalItems = data.count;
                self.pagination.numPages = self.pagination.totalItems/self.pagination.itemsPerPage;
    		},function (){

    		});
    	};

      //选择勾选删除
        self.chooseDelete=function (tag){
          // console.log("@@");
          tag.isSelected=!tag.isSelected;
          if(!tag.isSelected){
            self.selectedAll=false;
          }
        };

        //全选删除
        self.chooseAllDelete=function(){
          _.each(self.tags,function (tag){
            if(self.selectedAll){
              tag.isSelected=false;
            }else{
              tag.isSelected=true;
            }
            
          });
          if(self.selectedAll){
              self.selectedAll=false;
            }else{
              self.selectedAll=true;
            }
        };

        //删除
        self.destory=function(tagId){
          if(confirm("确认删除该标签？")){
            Tag.destory({id:tagId},{},function(){
              loadTags();
            },function(){

            });
          }
        };

        //批量移至回收站，批量彻底删除
        self.dustbin_all=function(){
          if(confirm('确认删除这些标签？')){
            var arr=[];
            _.each(self.tags,function (tag){
              if(tag.isSelected){
                arr.push(tag._id);
              }
            });
            Tag.destory_all({},{tags:arr},function(){
              loadTags();
            },function(){

            });
          }
          
          
        };


    init();
  }]);

