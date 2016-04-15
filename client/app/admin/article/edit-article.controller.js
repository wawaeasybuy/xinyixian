'use strict';

angular.module('xinyixianApp')
  .controller('EditArticleController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Upload','Category','Tag',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Upload,Category,Tag) {
    	var self=this;

        self.id = $stateParams.id;

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

        //初始化显示图片，默认一张图片
        // self.showImage=defalut_image;
        // self.showThumbnail=defalut_image;

    	var init = function(){
    		initSample();
            loadArticle();
            loadCategory();
            // var open=true;
            // while(open){
            //     CKEDITOR.instances.editor.insertHtml('<p>dsadfasdadasda<img alt="" src="http://localhost:9000/assets/upload/upload_images/25d6a93b88cd7a87d433485bc540f85b.jpeg" style="height:62px; width:100px" /></p>');
            // }
        };
        
        var loadCategory=function(){
            Category.all_index({},function (data){
                self.categories=data.categories;

                // var c=_.findWhere(self.categories,{_id:self.article.category});
                // if(c){
                //     self.showCategory=c;
                // }else{
                //     self.showCategory=_.findWhere(self.categories,{sign:'1'});
                // }
            });
        };

        //将remindTag改成Stringg
        var getString=function (arr){
            var str='';
            if(arr.length>0){
                str=arr[0];
            }
            for(var i=1;i<arr.length;i++){
                str=str+','+arr[i];
            }
            return str;
        };

        var loadArticle=function(){
            Article.show({id:self.id},function (data){
                self.article=data.article;
                self.article.remindTag=getString(self.article.remindTag);
                if(self.article.image){
                    self.showImage=upload_image_url+self.article.image;
                }
                if(self.article.thumbnail){
                    self.showThumbnail=upload_image_url+self.article.thumbnail;
                }
                self.showCategory=self.article.category;
                //clone tag,清空原tag
                self.showTags=_.clone(self.article.tags);
                self.article.tags=[];
                // console.log(self.showThumbnail);
                // CKEDITOR.instances.editor.insertHtml(self.article.content);
            });
        };

    	self.show=function(){
        	var stem = CKEDITOR.instances.editor.getData();
        	console.log(stem);
            CKEDITOR.instances.editor.setData(self.article.content);
        };

        //打开updateDate日历
        self.openDate=function(){
            self._updateDate=!self._updateDate;
        };

        self.openCategory=function(){
            self._openCategory=!self._openCategory;
        };

        self.openAddTag=function(){
            self._openAddTag=!self._openAddTag;
        };

        self.closeOpenAddTag=function(){
            self._openAddTag=false;
        };

        self.chooseCategory=function (category){
            self.showCategory=category;
            self._openCategory=false;
        };

        var MAX = Math.pow(2, 32);
        var MIN = 1;
        //state=1题图，2缩略图
        self.upload=function(file,state){
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
                switch(state){
                    case 1:
                        self.article.image=filename;
                        self.showImage=upload_image_url+filename;
                        break;
                    case 2:
                        self.article.thumbnail=filename;
                        self.showThumbnail=upload_image_url+filename;
                        break;
                }
            }, function (resp) {
                alert("上传失败");
            }, function (evt) {
                switch(state){
                    case 1:
                        self.loaded1 = parseInt(100.0 * evt.loaded / evt.total);
                        break;
                    case 2:
                        self.loaded2 = parseInt(100.0 * evt.loaded / evt.total);
                        break;
                }
            });
           };
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

        //选择是否为大图模式
        self.chooseBigImage=function(){
            self.article.isBigImage=!self.article.isBigImage
        };

        self.save=function(){
            var stem = CKEDITOR.instances.editor.getData();
            self.article.content=stem;
            self.article.category=self.showCategory._id;
            _.each(self.showTags,function (tag){
                self.article.tags.push(tag._id);
            });
            console.log(self.article);
            Article.update({id:self.id},self.article,function (data){
                console.log('success');
            },function(){

            });
            $state.go('article-view');
            // Article.create({},self.article,function (data){
            //     console.log(data);
            // },function(){

            // });
        };

        self.cancel = function (){
            $state.go('article-view');
        };

        init();
        setTimeout(function(){
            CKEDITOR.instances.editor.setData(self.article.content);
        },1000);
  }]);

