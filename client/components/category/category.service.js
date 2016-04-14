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
      },
      index_admin:{
        method: 'GET',
        params:{
          id:'admin',
          controller:'category'
        }
      },
      update: {
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
      },
      create:{
        method:'POST'
      },
      show:{
        method:'GET'
      }
      // show:{
      //   method: 'GET'
      // },
      // update:{
      //   method: 'PUT'
      // }
	  });
  });
