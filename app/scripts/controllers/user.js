'use strict';

angular.module('silverbergApp')
    .controller('UserDetailCtrl', function ($scope, $location, $http,$stateParams) {
        var id = $stateParams.id;
        $scope.user = {};
        $http.get('/api/users/'+id).success(function(user){
            $scope.user = user;
        })
    });