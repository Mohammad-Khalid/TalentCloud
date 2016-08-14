(function () {
    'use strict';

    angular
        .module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
        .config(config)
        .run(run)
        .constant('serviceUrl', 'http://localhost:3000');

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider

            .when('/adminlogin', {
                templateUrl: 'app/admin/login/login.html',

            })
            .when('/home', {
                templateUrl: 'app/home/home.html'
            })
            .when('/fileupload', {
                templateUrl: 'app/file/file_upload.html'

            })
            .when('/dashboard', {
                templateUrl: 'app/admin/dashboard/dashboard.html'
            })
            .when('/user', {
                templateUrl: 'app/student/dashboard/dashboard.html'

            })
            .when('/student', {
                templateUrl: 'app/admin/student/student.html',
                controller: "StudentController"
            })
            .when('/organization', {
                templateUrl: 'app/admin/organization/organization.html'
            })
            .when('/organization-manage', {
                templateUrl: 'app/admin/organization/organization-manage.html'
            })
            .when('/mangeOrganization', {
                templateUrl: 'app/admin/organization/dashboard.html'
            })
            .when('/editOrganization', {
                templateUrl: 'app/admin/organization/organization-edit.html'
            })
            .when('/students-manage', {
                templateUrl: 'app/admin/student/student-manage.html'
            })
            .when('/editStudent', {
                templateUrl: 'app/admin/student/student-edit.html'
            })
            .when('/parents-manage', {
                templateUrl: 'app/admin/parents/parents-manage.html'
            })
            .when('/entity-manage', {
                templateUrl: 'app/admin/organization/dashboard-2.html'
            })
            .when('/teachers', {
                templateUrl: 'app/admin/teachers/teachers.html'
            })
            .when('/teachers-manage', {
                templateUrl: 'app/admin/teachers/teachers-manage.html'
            })
            .when('/editTeacher', {
                templateUrl: 'app/admin/teachers/teachers-edit.html'
            })
            .when('/parents', {
                templateUrl: 'app/admin/parents/parents.html'

            })
            .when('/student_dashboard', {
                templateUrl: 'app/student/dashboard/dashboard.html'

            })
            .when('/teacher_dashboard', {
                templateUrl: 'app/teachers/dashboard/dashboard.html'

            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
        $rootScope.header = "partials/header.html";
        // keep user logged in after page refresh
        /*     $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            }); */
    }

})();