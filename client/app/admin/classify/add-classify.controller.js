'use strict';

angular.module('xinyixianApp')
  .controller('AddClassifyController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Category','Upload',
    function ($state, $stateParams, $location, $scope,$cookies,Category,Upload) {
    	var self=this;

    	self.category={
    		name:'',
    		image:''
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
	    	Category.create({},self.category,function(){
	    		console.log("success");
	    	},function(){

	    	});
	    };
  }]);