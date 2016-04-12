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
        url: '/admin/article/add',
        templateUrl: 'app/admin/article/add-article.html',
        controller: 'AddArticleController',
        controllerAs: 'addArticleCtrl',
        // authenticate: true
      })


      // 分类页面
      .state('classify-view', {
        url: '/admin/classify/view',
        templateUrl: 'app/admin/classify/view-classify.html',
        controller: 'ViewClassifyController',
        controllerAs: 'viewClassifyCtrl',
        // authenticate: true
      })
      .state('classify-edit', {
        url: '/admin/classify/edit/:id',
        templateUrl: 'app/admin/classify/edit-classify.html',
        controller: 'EditClassifyController',
        controllerAs: 'editClassifyCtrl',
        // authenticate: true
      })
      .state('classify-add', {
        url: '/admin/classify/add/:id',
        templateUrl: 'app/admin/classify/add-classify.html',
        controller: 'AddClassifyController',
        controllerAs: 'addClassifyCtrl',
        // authenticate: true
      })


      // tag页面
      .state('tag-view', {
        url: '/admin/tag/view',
        templateUrl: 'app/admin/tag/view-tag.html',
        controller: 'ViewTagController',
        controllerAs: 'viewTagCtrl',
        // authenticate: true
      })
      .state('tag-edit', {
        url: '/admin/tag/edit/:id',
        templateUrl: 'app/admin/tag/edit-tag.html',
        controller: 'EditTagController',
        controllerAs: 'editTagCtrl',
        // authenticate: true
      })
      .state('tag-add', {
        url: '/admin/tag/add/:id',
        templateUrl: 'app/admin/tag/add-tag.html',
        controller: 'AddTagController',
        controllerAs: 'addTagCtrl',
        // authenticate: true
      })



      // 图库页面
      .state('image-view', {
        url: '/admin/image/view',
        templateUrl: 'app/admin/image/view-image.html',
        controller: 'ViewImageController',
        controllerAs: 'viewImageCtrl',
        // authenticate: true
      })
      .state('image-edit', {
        url: '/admin/image/edit/:id',
        templateUrl: 'app/admin/image/edit-image.html',
        controller: 'EditImageController',
        controllerAs: 'editImageCtrl',
        // authenticate: true
      })
      .state('image-add', {
        url: '/admin/image/add/:id',
        templateUrl: 'app/admin/image/add-image.html',
        controller: 'AddImageController',
        controllerAs: 'addImageCtrl',
        // authenticate: true
      });
  });