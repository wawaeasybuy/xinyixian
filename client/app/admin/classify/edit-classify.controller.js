'use strict';

angular.module('xinyixianApp')
  .controller('EditClassifyController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Category','Upload','Tag','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Category,Upload,Tag,Auth) {
    	var self=this;
    	if(!Auth.isAdmin()){
          return $location.path('/');
        }

    	self.id = $stateParams.id;

    	self.host=hostUrl+'?';

    	var init=function(){
    		loadCategory();
    	};

    	var loadCategory=function(){
    		Category.show({id:self.id},{},function (data){
    			self.category=data.category;
    			if(self.category.image){
                    self.showImage=upload_image_url+self.category.image;
                }
                self.showTags=_.clone(self.category.tags);
    		},function(){

    		});
    	};

    	var MAX = Math.pow(2, 32);
        var MIN = 1;
        //state=1题图，2缩略图
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
	                url: 'api/upload',
	                data: {file: file, 'filename': filename}
	            }).then(function (resp) {
	            	self.category.image=filename;
	                self.showImage=upload_image_url+filename;

	            }, function (resp) {
	                alert("上传失败");
	            }, function (evt) {
	            	self.loaded = parseInt(100.0 * evt.loaded / evt.total);
	            });
	        };
	    };

	    //保存
	    self.save=function(){
	    	self.category.tags=[];
	    	_.each(self.showTags,function (tag){
	    		self.category.tags.push(tag._id);
	    	});

	    	Category.update({id:self.id},self.category,function(){
	    		console.log("success");
	    		$state.go('classify-view');
	    	},function(){
	    		self.selectTags=[];
	    	});
	    };

	    self.cancel = function (){
	    	$state.go('classify-view');
	    };

	    //打开添加标签
	    self.openAddTag=function(){
	    	self._openAddTag=!self._openAddTag;
	    };

	    //关闭打开标签
	    self.closeOpenAddTag=function(){
	    	self._openAddTag=false;
	    };

	    //搜索标签
        self.select=function(){
            Tag.select({name:self.selectTagName},{},function (data){
                self.selectTags=data.tags;
            },function(){
            	self.selectTags=[];
            });
        };

        //选择标签
        self.chooseTag=function(tag){
            // if(self.showTags.indexOf(tag)>0){
            //     return alert('不能添加同一个标签！');
            // }
            self.showTags.push(tag);
            self._openAddTag=false;
            delete self.selectTagName;
            delete self.selectTags;
        };

        //去除标签
        self.pullTag=function(tag){
            if(confirm('确定去掉标签:'+tag.name+"?")){
                self.showTags.splice(self.showTags.indexOf(tag),1);
            }
        };

	    init();
    
  }]);