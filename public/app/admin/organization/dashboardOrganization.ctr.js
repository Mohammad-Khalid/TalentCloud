(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('dashboardOrganization', dashboardOrganization);

    dashboardOrganization.$inject = ['$scope','$location',
'$routeParams','$route','UserService'];

    function dashboardOrganization($scope,$location,
$routeParams,$route,UserService) {
    	var dovm =this;
    	dovm.org_id = $routeParams.org_id;
    	dovm.aid = $routeParams.aid;
    }
})();