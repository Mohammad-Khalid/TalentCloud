(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('studentEditController', studentEditController);

    studentEditController.$inject = ['$http', '$location', 'UserService', 'FlashService', '$routeParams','fileUploadService'];

    function studentEditController($http, $location, UserService, FlashService, $routeParams,fileUploadService) {
    	var sevm = this;
    	//sevm.ID = $routeParams.account_id;
    	UserService.studentEdit($routeParams.account_id).then(function(response){
    		console.log(response);
    		sevm.stud = response;
    	});
        var formdata = new FormData();
        sevm.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                console.log((value.name).substring((value.name).lastIndexOf(".")+1));
                if((value.name).substring((value.name).lastIndexOf(".")+1) == 'csv')
                    formdata.append("file",value);
                //else formdata.append(key,value);
                formdata.append(key, value);
            });
        };
        sevm.submit = function(){
            console.log(formdata);
            fileUploadService.submitFile(formdata,sevm.stud).then(function(res){
                if(res.status === true){
                    $location.url("/students-manage");
                }
            });
        };
    }
})();