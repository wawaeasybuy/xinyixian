'use strict';

angular.module('xinyixianApp')
  .controller('AboutUsController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article','Category','Auth',
    function ($state, $stateParams, $location, $scope,$cookies,Article,Category,Auth) {
       var self=this;

       self.aboutXinyixian = true;
       self.contractXinyixian = false;
       self.showQdcode = false;


       //载入category,
		// var loadCategory=function(){
		// 	var condition={
		// 		page:1,
		// 		itemsPerPage:4
		// 	};
		// 	Category.index(condition,function (data){
		// 		self.categories=data.categories;
		// 		var c=_.findWhere(self.categories,{_id:self.category});
		// 		if(c){
		// 		    self.showSelected=c.name;
		// 		    c.style="border:5px solid #0f0";
		// 		}
		// 	});
		// };

    	var init=function(){
        	// loadCategory();
    	};


       self.openAboutXinyixian = function (){
       		self.aboutXinyixian = true;
       		self.contractXinyixian = false;
       };

       self.openContractXinyixian = function (){
       		self.aboutXinyixian = false;
       		self.contractXinyixian = true;
       };

       // 打开二维码
       self.openQqQdcode = function (){
        self.showQdcode = !self.showQdcode;
        self.qdcode = "../assets/images/qqQrcode.png";
       };
       self.openWechatQdcode = function (){
        self.showQdcode = !self.showQdcode;
        self.qdcode = "../assets/images/wechatQrcode.png";
       };

      init();
  }]);

