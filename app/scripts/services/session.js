'use strict';

angular.module('silverbergApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
