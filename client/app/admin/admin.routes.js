'use strict';
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider

    // 文章页面
      .state('article-view', {
        url: '/admin/article/view?page&itemsPerPage&category&state',
        templateUrl: 'app/admin/article/view-article.html',
        controller: 'ViewArticleController',
        controllerAs: 'viewArticleCtrl',
        // reloadOnSearch: false
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
      .state('imageAddress-view', {
        url: '/admin/article/viewAddress?groupId',
        templateUrl: 'app/admin/article/view-imageAddress.html',
        controller: 'ViewImageAddressController',
        controllerAs: 'viewImageAddressCtrl',
        // authenticate: true
      })



      // 分类页面
      .state('classify-view', {
        url: '/admin/classify/view?page&itemsPerPage',
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
        url: '/admin/classify/add',
        templateUrl: 'app/admin/classify/add-classify.html',
        controller: 'AddClassifyController',
        controllerAs: 'addClassifyCtrl',
        // authenticate: true
      })


      // tag页面
      .state('tag-view', {
        url: '/admin/tag/view?page&itemsPerPage',
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
        url: '/admin/tag/add',
        templateUrl: 'app/admin/tag/add-tag.html',
        controller: 'AddTagController',
        controllerAs: 'addTagCtrl',
        // authenticate: true
      })



      // 图库页面
      .state('image-view', {
        url: '/admin/image/view?picturePage&group',
        templateUrl: 'app/admin/image/view-image.html',
        controller: 'ViewImageController',
        controllerAs: 'viewImageCtrl',
        // reloadOnSearch: false
        // authenticate: true
      });
  });