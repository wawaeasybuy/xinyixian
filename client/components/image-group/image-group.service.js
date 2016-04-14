'use strict';

angular.module('xinyixianApp')
  .factory('ImageGroup', function ($resource) {
    return $resource('/api/image-groups/:id/:controller', {
      id: '@_id'
    },
    {
      index:{
        method:'GET'
      },
      create:{
        method:'POST'
      },
      update:{
        method:'PUT'
      },
      move:{
        method:'PUT',
        params:{
          controller:"move"
        }
      },
      destory:{
        method:'DELETE'
      }
      // show:{
      //   method: 'GET'
      // },
      // update:{
      //   method: 'PUT'
      // }
	  });
  });
