'use strict';

angular.module('xinyixianApp')
  .factory('Article', function ($resource) {
    return $resource('/api/articles/:id/:controller', {
      id: '@_id'
    },
    {
      
      create:{
        method: 'POST'
      },
      index: {
        method: 'GET'
      },
      show:{
        method: 'GET'
      },
      update:{
        method: 'PUT'
      }
	  });
  });
