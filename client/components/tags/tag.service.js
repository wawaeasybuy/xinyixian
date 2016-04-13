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
      }
      // show:{
      //   method: 'GET'
      // },
      // update:{
      //   method: 'PUT'
      // }
	  });
  });
