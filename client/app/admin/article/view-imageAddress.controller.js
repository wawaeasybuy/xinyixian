'use strict';
angular.module('xinyixianApp')
  .controller('ViewImageAddressController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'ImageGroup',
    function ($state, $stateParams, $location, $scope, $cookies, ImageGroup) {
       	var self=this;
        self.group = $stateParams.groupId;
       	self.picturePage = 1;
       	self.showLoadMore = true;
       	self.lib_image_url=lib_image_url;

    	//重新生成路由
      	var doLocation=function(){
	        $location
	          .search('groupId', self.group);
	        // console.log($location);
      	};

       	var loadGroups=function(){
        	ImageGroup.index({},function (data){
        		self.groups=data.groups;
        		if(!self.group){
        			self.group=_.findWhere(self.groups,{sign:'1'})._id;
        		}
        		var c=_.findWhere(self.groups,{_id:self.group});
                if(!c){
                    self.group=_.findWhere(self.groups,{sign:'1'})._id;
                    c=_.findWhere(self.groups,{_id:self.group});
                }
        		c.style="background:#CCCCCC";
        		//载入图片
        		reloadImage();
        	});
        };

        //reloadImage,initImage
        var reloadImage=function(){
        	var c=_.findWhere(self.groups,{_id:self.group});
        	self.showImages=c.images.slice(0,self.picturePage*16);
        	if(c.images.length <= self.picturePage*16){
	           self.showLoadMore = false;
	        }
        };

        self.loadMore=function(){
          self.picturePage++;
          reloadImage();
        };

        //选择组,2页2页每页8
        self.chooseGroup=function (group){
          self.group=group._id;
          doLocation();
        };

        var init=function(){
        	loadGroups();
        };

        init();
  }]);