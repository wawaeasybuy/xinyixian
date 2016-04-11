'use strict';

angular.module('xinyixianApp')
  .factory('Article', function ($resource) {
    return $resource('/api/articles/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET'
      },
      create:{
        method: 'POST'
      }
	  });
  });
