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
      admin_index: {
        method: 'GET',
        params:{
          id:'admin',
          controller:'index'
        }
      },
      show:{
        method: 'GET'
      },
      update:{
        method: 'PUT'
      },
      dustbin:{
        method: 'PUT',
        params:{
          controller:'dustbin'
        }
      },
      destory:{
        method: 'DELETE'
      },
      updateIndex:{
        method: 'PUT',
        params:{
          controller:'updateIndex'
        }
      },
      dustbin_all:{
        method: 'PUT',
        params:{
          id:'dustbin',
          controller:'all'
        }
      },
      destory_all:{
        method: 'PUT',
        params:{
          id:'destory',
          controller:'all'
        }
      },
      pushArticle:{
        method: 'GET',
        params:{
          id:'push',
          controller:'article'
        }
      }
	  });
  });
