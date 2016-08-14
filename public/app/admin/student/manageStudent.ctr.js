(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('manageStudent', manageStudent);

    manageStudent.$inject = ['$http', '$location', 'UserService', 'FlashService', '$routeParams','$route'];

    function manageStudent($http, $location, UserService, FlashService, $routeParams,$route) {
    	var msvm = this;
    	UserService.getStudent().then(function (response) {
    		msvm.stud = response;
    	});
        msvm.deleteStudent = function(id){
            UserService.deleteStudent(id).then(function(response){
                if(response.status===true){
                    //console.log(response);
                    $route.reload();
                }
            });
        }
    }
})();