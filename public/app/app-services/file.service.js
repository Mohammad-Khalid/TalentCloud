(function () {
    'use strict';

    angular.module('myApp').factory('fileUploadService', ['$http', '$q', fileUploadService]);

    function fileUploadService($http, $q, $ionicLoading, AUTH_TOKEN, serviceUrl) {
        var self = this;

        function uploadFile(formdata,obj) {

            var deferred = $q.defer();
            var uploadurl;
            //console.log(formdata);
            if(obj.user_type == 'student')
                uploadurl = '/student';
            else if(obj.user_type == 'teacher')
                uploadurl = '/teacher';
            else 
                uploadurl = '/parent';
            //console.log(uploadurl);
            formdata.append("org_id",obj.org_id);
            var request = {
                method: 'POST',
                url: uploadurl,
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (data) {
                    //console.log("Uploading :" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }
        function submitFile(formdata,obj) {
            console.log(obj);
            var uploadurl;
            if(obj.user_type_uid == 1){
                 uploadurl = '/student';
                 formdata.append("stud",JSON.stringify(obj));
            }
            else if(obj.user_type_uid == 2){
                uploadurl = '/teacher';
                formdata.append("teach",JSON.stringify(obj));
            }
            else{
                uploadurl = '/parent';
                formdata.append("parent",JSON.stringify(obj));
            } 
            var deferred = $q.defer();
            var request = {
                method: 'PUT',
                url: uploadurl,
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (data) {
                    //console.log("Uploading :" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }
        return {
            uploadFile: uploadFile,
            submitFile: submitFile
        };
    };
})();