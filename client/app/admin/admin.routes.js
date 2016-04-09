'use strict';
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('article-view', {
        url: '/admin/article/view',
        templateUrl: 'app/admin/article/view-article.html',
        controller: 'ViewArticleController',
        controllerAs: 'viewArticleCtrl',
        // authenticate: true
      })
      .state('article-edit', {
        url: '/admin/article/edit',
        templateUrl: 'app/admin/article/edit-article.html',
        controller: 'EditArticleController',
        controllerAs: 'editArticleCtrl',
        // authenticate: true
      });
  });