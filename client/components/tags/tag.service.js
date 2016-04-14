'use strict';

angular.module('xinyixianApp')
  .factory('Tag', function ($resource) {
    return $resource('/api/tags/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET'
      },
      select: {
        method: 'GET',
        params:{
          id:'select',
          controller:'tag'
        }
      },
      create: {
        method: 'POST',
      },
      show:{
        method: 'GET'
      },
      update:{
        method: 'PUT'
      },
      destory:{
        method:'DELETE'
      },
      destory_all:{
        method:'PUT',
        params:{
          id:'destory',
          controller:'all'
        }
      }

	  });
  });
