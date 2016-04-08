'use strict';
// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
angular.module('xinyixianApp').config(function ($stateProvider) {
  $stateProvider

  // 餐厅
  .state('test-upload', {
    url: '/admin/test-upload',
    templateUrl: 'app/test/test.html',
    controller: 'AdminViewRestaurantController',
    controllerAs: 'viewRestaurantCtrl'
  });
});
// authenticate: true
//# sourceMappingURL=test.routes.js.map
