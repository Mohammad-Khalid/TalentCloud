(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('teacherEditController', teacherEditController);

    teacherEditController.$inject = ['$http', '$location', 'UserService', 'FlashService', '$routeParams','fileUploadService'];

    function teacherEditController($http, $location, UserService, FlashService, $routeParams,fileUploadService) {
    	var tevm = this;
    	//sevm.ID = $routeParams.account_id;
    	UserService.teacherEdit($routeParams.account_id).then(function(response){
    		//console.log(response);
    		tevm.teach = response;
    	});
        var formdata = new FormData();
        tevm.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                console.log((value.name).substring((value.name).lastIndexOf(".")+1));
                if((value.name).substring((value.name).lastIndexOf(".")+1) == 'csv')
                    formdata.append("file",value);
                //else formdata.append(key,value);
                formdata.append(key, value);
            });
        };
        tevm.submit = function(){
            //console.log(formdata);
            fileUploadService.submitFile(formdata,tevm.teach).then(function(res){
                if(res.status === true){
                    $location.url("/teachers-manage");
                }
            });
        };
    }
})();