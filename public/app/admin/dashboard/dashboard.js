(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','$rootScope','$routeParams'];
    function DashboardController($scope,$rootScope,$routeParams) {
    	console.log($routeParams.aid+'hello');
    	$scope.aid = $routeParams.aid;
		$rootScope.header = "partials/admin_header.html";
    }

})();
