(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('manageTeacher', manageTeacher);

    manageTeacher.$inject = ['$http', '$location', 'UserService', 'FlashService', '$routeParams','$route'];

    function manageTeacher($http, $location, UserService, FlashService, $routeParams,$route) {
    	var mtvm = this;
        //alert("hiiiiiiiiii");
    	UserService.getTeacher().then(function (response) {
    		mtvm.teach = response;
    	});
        mtvm.deleteStudent = function(id){
            UserService.deleteTeacher(id).then(function(response){
                if(response.status===true){
                    //console.log(response);
                    $route.reload();
                }
            });
        }
    }
})();