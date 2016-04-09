'use strict';
console.log("aaaaaaa");
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home-view', {
        url: '/show/home/view',
        templateUrl: 'app/show/home/home.html',
        controller: 'ViewHomeController',
        controllerAs: 'viewHomeCtrl',
        // authenticate: true
      })
      .state('article-view', {
        url: '/show/article/view',
        templateUrl: 'app/show/article/article.html',
        controller: 'ViewAarticleController',
        controllerAs: 'viewArticleCtrl',
        // authenticate: true
      });
  });