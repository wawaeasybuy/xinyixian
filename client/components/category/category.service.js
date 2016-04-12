'use strict';

angular.module('xinyixianApp')
  .factory('Category', function ($resource) {
    return $resource('/api/categories/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET'
      },
      all_index: {
        method: 'GET',
        params:{
          id:'all',
          controller:'category'
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
