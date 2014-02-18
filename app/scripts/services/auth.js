'use strict';

angular.module('silverbergApp')
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {

        // Get currentUser from cookie
        $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');

        return {

            // Log user in
            login: function (user, callback) {
                var cb = callback || angular.noop;

                return Session.save({
                    email: user.email,
                    password: user.password
                }, function (user) {
                    $rootScope.currentUser = user;
                    return cb();
                }, function (err) {
                    return cb(err);
                }).$promise;
            },

            // Log user out
            logout: function (callback) {
                var cb = callback || angular.noop;

                return Session.delete(function () {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function (err) {
                        return cb(err);
                    }).$promise;
            },

            // New user
            createUser: function (user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function (user) {
                        return cb(user);
                    },
                    function (err) {
                        return cb(err);
                    }).$promise;
            },

            // New password
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.update({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function (user) {
                    return cb(user);
                }, function (err) {
                    return cb(err);
                }).$promise;
            },

            // Get user info
            currentUser: function () {
                return User.get();
            },

            // Check if logged in
            isLoggedIn: function () {
                var user = $rootScope.currentUser;
                return !!user;
            },
        };
    });