'use strict';

angular.module('xinyixianApp')
  .controller('AboutUsController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Auth) {
       var self=this;

       self.aboutXinyixian = true;
       self.contractXinyixian = false;
       self.showQdcode = false;
       //图片文件目录
      self.hostDir=upload_image_url;

      var isInitCode=true;
       //载入category,
		var loadCategory=function(){
			var condition={
				page:1,
				itemsPerPage:4
			};
			Category.index(condition,function (data){
				self.categories=data.categories;
				var c=_.findWhere(self.categories,{_id:self.category});
			});
		};

    	var init=function(){
        	loadCategory();
    	};


       self.openAboutXinyixian = function (){
       		self.aboutXinyixian = true;
       		self.contractXinyixian = false;
       };

       self.openContractXinyixian = function (){
       		self.aboutXinyixian = false;
       		self.contractXinyixian = true;
       };

       //初始化二维码状态
       var qdcode_init = function (){
        self.QdcodeBgcolor1 = '';
        self.QdcodeBgcolor2 = '';
        self.showWechatQdcode = false;
        self.showQqQdcode = false;
       };
       // 打开二维码
       self.openQqQdcode = function (){
        qdcode_init();
        isInitCode=false;
        if(self.showQdcode&&self.qdcode == "../assets/images/wechatQrcode.png"){
          self.qdcode = "../assets/images/qqQrcode.png";
          self.QdcodeBgcolor2 = 'background-color:#fff';
          self.showQqQdcode = true;
        }else{
          self.showQdcode = !self.showQdcode;
          if(self.showQdcode){
            self.qdcode = "../assets/images/qqQrcode.png";
            self.QdcodeBgcolor2 = 'background-color:#fff';
            self.showQqQdcode = true;
          }
        }
        
       };
       self.openWechatQdcode = function (){
        qdcode_init();
        isInitCode=false;
        if(self.showQdcode&&self.qdcode == "../assets/images/qqQrcode.png"){
          self.qdcode = "../assets/images/wechatQrcode.png";
          self.QdcodeBgcolor1 = 'background-color:#fff';
          self.showWechatQdcode = true;
        }else{
          self.showQdcode = !self.showQdcode;
          if(self.showQdcode){
            self.qdcode = "../assets/images/wechatQrcode.png";
            self.QdcodeBgcolor1 = 'background-color:#fff';
            self.showWechatQdcode = true;
          }
        }
       };

       //点击空白初始化二维码
       self.initCode=function(){
        if (isInitCode) {
          qdcode_init();
          self.showQdcode=false;
          self.showQdcode=false;
        };
        isInitCode=true;
          // qdcode_init();
       };

      init();
  }]);

