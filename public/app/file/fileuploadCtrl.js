(function () {
    'use strict';

    angular.module('myApp').controller('fileUploadCtrl', ['fileUploadService','$location',
'$routeParams', '$scope', fileUploadCtrl]);

    function fileUploadCtrl(fileUploadService,$location,
$routeParams,$scope) { /**/
        var fuvm = this;
        var formdata = new FormData();
        console.log($routeParams.type);

        fuvm.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                console.log((value.name).substring((value.name).lastIndexOf(".")+1));
                if((value.name).substring((value.name).lastIndexOf(".")+1) == 'csv')
                    formdata.append("file",value);
                //else formdata.append(key,value);
                formdata.append(key, value);
            });
        };

        // NOW UPLOAD THE FILES.
        fuvm.uploadFiles = function () {
            /*  alert("sjhdfd");*/
            var obj={"org_id":$routeParams.org_id,"user_type":$routeParams.type,"aid":$routeParams.aid};
            fileUploadService.uploadFile(formdata,obj).then(function (data) {
                fuvm.uploadResponse = data;
                if(data.status === true){
                    $location.url("/students-manage?org_id="+obj.org_id+"&aid="+obj.aid);
                }
                console.log(fuvm.uploadResponse);
            });
        }
    }
})();