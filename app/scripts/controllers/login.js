'use strict';

angular.module('silverbergApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Redirect home
          $location.path('/');
        })
      }
    };
  });