'use strict';
// console.log("aaaaaaa");
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('view-home', {
        url: '/show/home/view?page&itemsPerPage&id&tag',//id为category,tag为tag
        templateUrl: 'app/show/home/home.html',
        controller: 'ViewHomeController',
        controllerAs: 'viewHomeCtrl',
        // authenticate: true
      })
      .state('main', {
        url: '/?page&itemsPerPage&id&tag',//id为category,tag为tag
        templateUrl: 'app/show/home/home.html',
        controller: 'ViewHomeController',
        controllerAs: 'viewHomeCtrl',
        // authenticate: false
      })
      .state('view-article', {
        url: '/show/article/view/:id?&catgeory&tag',//category为category,tag为tag
        templateUrl: 'app/show/article/article.html',
        controller: 'ViewAarticleController',
        controllerAs: 'viewArticleCtrl',
        // authenticate: true
      })
      .state('about_us', {
        url: '/about_us?state',//state，1=关于新一线，2=联系新一线
        templateUrl: 'app/show/about_us/about_us.html',
        controller: 'AboutUsController',
        controllerAs: 'aboutCtrl',
        // authenticate: true
      });
  });