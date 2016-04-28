'use strict';
angular.module('xinyixianApp')
  .controller('ViewImageAddressController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'ImageGroup',
    function ($state, $stateParams, $location, $scope, $cookies, ImageGroup) {
       	var self=this;
       	self.picturePage = $stateParams.page || 1;
       	self.showLoadMore = true;
       	self.lib_image_url=lib_image_url;

    	//重新生成路由
      	// var doLocation=function(){
	      //   $location
	      //     .search('page', self.pagination.page)
	      //     .search('itemsPerPage', self.pagination.itemsPerPage);
	      //   // console.log($location);
      	// };

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
        		// c.style="background:#CCCCCC";
        		//载入图片
        		reloadImage();
        	});
        };

        //reloadImage,initImage
        var reloadImage=function(){
        	console.log(self.group);
        	var c=_.findWhere(self.groups,{_id:self.group});
        	console.log(c);
        	console.log(self.picturePage);
        	self.showImages=c.images.slice(0,self.picturePage*16);
        	if(c.images.length <= self.picturePage*16){
	           self.showLoadMore = false;
	        }
	        console.log(self.showImages);
        };



        var init=function(){
        	loadGroups();
        };

        init();
  }]);