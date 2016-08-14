(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('manageOrganizationCtr', manageOrganizationCtr);

    manageOrganizationCtr.$inject = ['$scope','$routeParams','$route','UserService'];

    function manageOrganizationCtr($scope,$routeParams,$route,UserService) {
        var moc = this;
        //console.log($route.current.$$route.aid);
        //$location.url('/dashboard?aid=abc');
        UserService.getAllOrganization().then(function (response) {
                //console.log(response);
                //alert(JSON.stringify(response));
                moc.org = response;
                moc.org.aid = $routeParams.aid;
            }); 
        moc.deleteOrganization = deleteOrganization;
        function deleteOrganization(org_id){
            UserService.deleteOrganization(org_id).then(function(response){
                if(response.status===true){
                    //console.log(response);
                    $route.reload();
                }
            });
        }  
    }
})();