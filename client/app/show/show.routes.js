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
      .state('list-view', {
        url: '/show/list/view',
        templateUrl: 'app/show/articlelist/articlelist.html',
        controller: 'ViewListController',
        controllerAs: 'viewListCtrl',
        // authenticate: true
      });
  });