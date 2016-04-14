'use strict';

angular.module('xinyixianApp')
  .controller('ViewImageController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'ImageGroup','Upload',
    function ($state, $stateParams, $location, $scope,$cookies,ImageGroup,Upload) {
    	var self=this;

    	self.lib_image_url=lib_image_url;
    	console.log(self.lib_image_url);
    	// self.page = $stateParams.page || 1;
      	self.picturePage = $stateParams.picturePage || 0;
    	self.group = $stateParams.group;

        //重新生成路由
      	var doLocation=function(){
	        $location
	          .search('group', self.group)
	          .search('picturePage', self.picturePage);
	          
	        console.log($location);
      	};

      	//初始化group选中状态
      	var initGroupChoosed=function(){
      		_.each(self.groups,function (group){
      			group.style="";
      		});
      		// console.log(self.groups);
      		var c=_.findWhere(self.groups,{_id:self.group});
        	c.style="background:#CCCCCC";
      	};

        var loadGroups=function(){
        	ImageGroup.index({},function (data){
        		self.groups=data.groups;
        		if(!self.group){
        			self.group=_.findWhere(self.groups,{sign:'1'})._id;
        		}
        		var c=_.findWhere(self.groups,{_id:self.group});
        		c.style="background:#CCCCCC";
        		//载入图片
        		reloadImage();
        	});
        };

        var init=function(){
        	loadGroups();
        };

        var MAX = Math.pow(2, 32);
        var MIN = 1;

    	self.upload=function(file){
        // console.log("sasa");
        // console.log(file);
        if(file.length>0){
            var file=file[0];
            var now = new Date().getTime();
            var nowStr = now.toString();
            var rand = (Math.floor(Math.random() * (MAX - MIN)) + MIN).toString();
            var randStr = rand.toString();
            var filename = nowStr + '_' + randStr + '_' + file.name.replace(/[^0-9a-z\.]+/gi, '');
            console.log(filename);
            Upload.upload({
                method: 'POST',
                url: 'api/upload/lib',
                data: {file: file, 'filename': filename,"groupId":self.group}
            }).then(function (resp) {
            	loadGroups();
            }, function (resp) {
                alert("上传失败");
            }, function (evt) {
            	self.loaded1 = parseInt(100.0 * evt.loaded / evt.total);
            });
           };
        };

        //选择组,2页2页每页8
        self.chooseGroup=function (group){
        	self.group=group._id;
        	self.picturePage=0;
        	doLocation();
        	initGroupChoosed();
        	self.loadMore();
        };

        //reloadImage,initImage
        var reloadImage=function(){
        	var c=_.findWhere(self.groups,{_id:self.group});
        	self.showImages=c.images.slice(0,15+self.picturePage*16);
        	if(c.images.length <= (15+self.picturePage*16)){
	           self.showLoadMore = false;
	        }
        };

        //loadmore
        self.loadMore=function(){
        	doLocation();
        	var c=_.findWhere(self.groups,{_id:self.group});
        	self.showImages=c.images.slice(0,15+self.picturePage*16);
        	if(c.images.length <= (15+self.picturePage*16)){
	           self.showLoadMore = false;
	        }
	        self.picturePage++;
        };

        //打开新增分组页面
        self.openAddGroup=function(){
        	self._openAddGroup=!self._openAddGroup;
        };

        //取消新增
        self.cancel=function(){
        	self._openAddGroup=false;
        };

        //打开编辑图片按钮
        self.openEditImage=function(){
        	self._openEditImage=!self._openEditImage;
        };

        //移除对应组中的图片
        self.pullImage=function(image){
        	if(confirm("确认删除图片?")){
        		var c=_.findWhere(self.groups,{_id:self.group});
	        	c.images.splice(c.images.indexOf(image),1);
	        	ImageGroup.update({id:c._id},c,function(){
	        		loadGroups();
	        	},function(){

	        	});
        	}
        	
        };

        //新增图片分组
        self.addGroup=function(){
        	// console.log(self.newGroupName);
        	ImageGroup.create({},{name:self.newGroupName},function(){
        		delete self.newGroupName;
        		self._openAddGroup=false;
        		loadGroups();
        	},function(){

        	});
        	
        };

        init();

  }]);

