'use strict';

angular.module('xinyixianApp')
  .controller('LoginCtrl', function ($scope, Auth, $location,$stateParams,User) {
    $scope.user = {};
    $scope.errors = {};
    var self=this;

    self.role = $stateParams.role || 0;

    Auth.logout();
    if(self.role!='admin'){
      return $location.path('/');
    }

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        if(self.codeNum!=self.code){
          alert("验证码错误！请注意大小写！");
          self.initCode();
          delete self.codeNum;
          return;
        }
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // // Logged in, redirect to home
          User.get({},function (data){
            if(data.role=="admin"){
              console.log("$location.path('article-view');");
              $location.path('/admin/article/view');
            }
          });
          // 
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }else{
        alert("请填写登录信息！");
      }
    };

    var getRandNum=function (num){
      var str='';
      var getNum=function(){
        return parseInt(Math.random()*75+48);
      }
      var i=0;
      var n;
      // console.log(String.fromCharCode(getNum()));
      while(i<num){
        n=getNum();
        if(n<58||(n>64&&n<91)||n>96){
          str+=String.fromCharCode(n);
          i++;
        }
        
      }
      return str;
    };
    self.initCode=function(){
      self.code=getRandNum(5);
    };

    self.initCode();

    

  });
