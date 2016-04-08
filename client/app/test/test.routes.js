'use strict';
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
angular.module('xinyixianApp')
  .config(function($stateProvider) {
    $stateProvider

      // 餐厅
      .state('admin-restaurant-view', {
        url: '/admin/restaurant/view?itemsPerPage&page&name',
        templateUrl: 'app/admin/restaurant/view-restaurant.html',
        controller: 'AdminViewRestaurantController',
        controllerAs: 'viewRestaurantCtrl',
        // authenticate: true
      });
  });