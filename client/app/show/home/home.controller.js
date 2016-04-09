'use strict';

angular.module('xinyixianApp')
  .controller('ViewHomeController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Article',
    function ($state, $stateParams, $location, $scope,$cookies,Article) {
       self = this;

       self.go = function(){
       	$state.go('article-view');
       };

       var loadArticle=function(){
       		Article.index({},{},function (data){
       			console.log(data);
       		});
       };

       var init=function(){
       		// loadArticle();
       };

       init();
        
  }]);