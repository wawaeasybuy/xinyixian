'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article',
    function ($state, $stateParams, $location, $scope,$cookies,Article) {
       self = this;

      self.page = $stateParams.page || 1;
      self.itemsPerPage = $stateParams.itemsPerPage || 20;

      self.pagination = {
        page: 1,
        itemsPerPage: 20,
        maxSize: 5,
        numPages: null,
        totalItems: null
      };
      //重新生成路由
      var doLocation=function(){
        $location
          .search('page', self.pagination.page)
          .search('itemsPerPage', self.pagination.itemsPerPage)
        console.log($location);
      };

       self.go = function(){
       	$state.go('article-view');
       };

       var loadArticle=function(){
       		Article.index({},function (data){
       			self.articles=data.articles;
       		});
       };

       var init=function(){
       		loadArticle();
       };

       init();
        
  }]);