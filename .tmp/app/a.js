'use strict';

angular.module('xinyixianApp').config(function ($stateProvider) {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'app/test.html',
    controller: 'TestCtrl',
    controllerAs: 'tsCtrl'
    // authenticate: true
  });
});
//# sourceMappingURL=a.js.map
