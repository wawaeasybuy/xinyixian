'use strict';
// console.log("aaaaaaa");
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('view-home', {
        url: '/show/home/view',
        templateUrl: 'app/show/home/home.html',
        controller: 'ViewHomeController',
        controllerAs: 'viewHomeCtrl',
        // authenticate: true
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/show/home/home.html',
        controller: 'ViewHomeController',
        controllerAs: 'viewHomeCtrl',
        // authenticate: false
      })
      .state('view-article', {
        url: '/show/article/view/:id',
        templateUrl: 'app/show/article/article.html',
        controller: 'ViewAarticleController',
        controllerAs: 'viewArticleCtrl',
        // authenticate: true
      });
  });