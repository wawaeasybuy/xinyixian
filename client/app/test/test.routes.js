'use strict';
// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider

      // 餐厅
      .state('test-upload', {
        url: '/admin/test-upload',
        templateUrl: 'app/test/test.html',
        controller: 'AdminViewRestaurantController',
        controllerAs: 'viewRestaurantCtrl',
        // authenticate: true
      })
      .state('test-edit', {
        url: '/admin/test-edit',
        templateUrl: 'app/test/articleEdit.html',
        controller: 'AdminViewRestaurantController',
        controllerAs: 'viewRestaurantCtrl',
        // authenticate: true
      });
  });