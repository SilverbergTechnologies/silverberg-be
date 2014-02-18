'use strict';

angular.module('silverbergApp')
  .controller('createUserCtrl', function ($scope, Auth, $location) {
    $scope.user = {};

    $scope.register = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          // Is this necessary?
          role : $scope.user.admin ? 'administrator' : 'user'
        })
        .then( function() {
          // Redirect home
          $location.path('/users');
        })
      }
    };
  });