(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','$rootScope'];
    function DashboardController($scope,$rootScope) {
		$rootScope.header = "partials/admin_header.html";
    }

})();
