'use strict';

angular.module('silverbergApp')
    .controller('UsersCtrl', function ($scope, $location, $http) {
        $scope.users = [];
        $http.get('/api/users/all').success(function(users){
            $scope.users = users;
        })
    });