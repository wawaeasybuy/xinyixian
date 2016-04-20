// 'use strict';
//全局host根目录
var hostUrl="http://121.196.221.242:8080";
var upload_image_url="../assets/upload/upload_images/";
var lib_image_url=hostUrl+"/assets/upload/images_lib/";
var defalut_image="../assets/";
var app=angular.module('xinyixianApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  // '720kb.datepicker',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth,$state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        //若没有登录，则使用游客身份登录
        if(!loggedIn){
          Auth.login({email:'tourist@tourist.com',password:'tourist'},function(){

          });
        }
        // $location.path('/show/home/view');
      });
    });
  });

app.filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
      return $sce.trustAsHtml(text);
  };
}]);