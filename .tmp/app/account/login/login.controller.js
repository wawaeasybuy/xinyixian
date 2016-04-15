'use strict';

angular.module('xinyixianApp').controller('LoginCtrl', function ($scope, Auth, $location, $stateParams, User) {
  $scope.user = {};
  $scope.errors = {};

  self.role = $stateParams.role || 0;

  Auth.logout();
  if (self.role != 'admin') {
    return $location.path('/');
  }

  $scope.login = function (form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function () {
        // // Logged in, redirect to home
        User.get({}, function (data) {
          if (data.role == "admin") {
            console.log("$location.path('article-view');");
            $location.path('/admin/article/view');
          }
        });
        //
      }).catch(function (err) {
        $scope.errors.other = err.message;
      });
    }
  };
});
//# sourceMappingURL=login.controller.js.map
