'use strict';

angular.module('xinyixianApp')
  .factory('Article', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET'
      }
	  });
  });
