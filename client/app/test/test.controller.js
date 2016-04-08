'use strict';

angular.module('xinyixianApp')
  .controller('AdminViewRestaurantController', ['$state', '$stateParams', '$location', '$scope','$cookies', 'Upload',
    function ($state, $stateParams, $location, $scope,$cookies,Upload) {
       var self=this;
       self.uploadlList=function(file){
        console.log("sasa");
        console.log(file);
        if(file.length>0){
            Upload.upload({
                method: 'POST',
                url: 'api/upload',
                data: {file: file, 'username': 'hahahah'}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
           };
        }
        
  }]);
