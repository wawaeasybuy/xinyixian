'use strict';
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider
    // 文章页面
      .state('article-view', {
        url: '/admin/article/view',
        templateUrl: 'app/admin/article/view-article.html',
        controller: 'ViewArticleController',
        controllerAs: 'viewArticleCtrl',
        // authenticate: true
      })
      .state('article-edit', {
        url: '/admin/article/edit/:id',
        templateUrl: 'app/admin/article/edit-article.html',
        controller: 'EditArticleController',
        controllerAs: 'editArticleCtrl',
        // authenticate: true
      })
      .state('article-add', {
        url: '/admin/article/add/:id',
        templateUrl: 'app/admin/article/add-article.html',
        controller: 'AddArticleController',
        controllerAs: 'addArticleCtrl',
        // authenticate: true
      });
  });