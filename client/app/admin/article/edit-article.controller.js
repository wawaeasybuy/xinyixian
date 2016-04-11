'use strict';

angular.module('xinyixianApp')
  .controller('EditArticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article',
    function ($state, $stateParams, $location, $scope,$cookies,Article) {
    	var self=this;

        self.article={
            category:'',//分类
            remindTag:'',//提示Tag,不加入tag库,多个标签用,隔开
            tags:[],//Tag库
            title:'',//标题
            author:'',//作者
            image:'',//题图
            isBigImage:false,//是否为大图模式
            thumbnail:'',//缩略图
            summary:'',//摘要
            updateDate:'',//修改日期，默认为发布日期
            content:'',//文章内容，整个html代码，包含标签，编辑处和展示处宽度一致
            state:1,//1.草稿（未发布），2.发布，3.回收站
            speciaLink:''//特殊链接？
        };

    	var init = function(){
    		initSample();
    	};

    	self.show=function(){
        	console.log("self.aaa",self.aaa);
        	var stem = CKEDITOR.instances.editor.getData();
        	console.log(stem);
        };

        self.upload=function(file){
        // console.log("sasa");
        // console.log(file);
        if(file.length>0){
            Upload.upload({
                method: 'POST',
                url: 'api/upload',
                data: {file: file, 'username': 'hahahah'}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                self.loaded = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + self.loaded + '% ' + evt.config.data.file.name);
            });
           };
        };

        self.save=function(){
            var stem = CKEDITOR.instances.editor.getData();
            self.article.content=stem;
            console.log(self.article);
            Article.create({},self.article,function (data){
                console.log(data);
            },function(){

            });
        };

        init();
        
  }]);