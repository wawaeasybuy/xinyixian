'use strict';

angular.module('xinyixianApp').controller('LoginCtrl', function ($scope, Auth, $location, $stateParams) {
  $scope.user = {};
  $scope.errors = {};

  self.role = $stateParams.role || 0;

  Auth.logout();
  if (self.role != 'admin') {
    $location.path('/');
    return;
  }

  $scope.login = function (form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function () {
        // Logged in, redirect to home
        $location.path('/');
      }).catch(function (err) {
        $scope.errors.other = err.message;
      });
    }
  };
});
//# sourceMappingURL=login.controller.js.map
