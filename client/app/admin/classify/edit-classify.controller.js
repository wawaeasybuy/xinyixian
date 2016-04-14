'use strict';

angular.module('xinyixianApp')
  .controller('EditClassifyController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Category','Upload',
    function ($state, $stateParams, $location, $scope,$cookies,Category,Upload) {
    	var self=this;

    	self.id = $stateParams.id;

    	var init=function(){
    		loadCategory();
    	};

    	var loadCategory=function(){
    		Category.show({id:self.id},{},function (data){
    			self.category=data.category;
    			if(self.category.image){
                    self.showImage=upload_image_url+self.category.image;
                }
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
	    	Category.update({id:self.id},self.category,function(){
	    		console.log("success");
	    		$state.go('classify-view');
	    	},function(){

	    	});
	    };

	    self.cancel = function (){
	    	$state.go('classify-view');
	    };

	    init();
    
  }]);