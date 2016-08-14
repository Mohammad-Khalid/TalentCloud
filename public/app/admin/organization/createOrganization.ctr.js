(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('createOrganizationCtr', createOrganizationCtr);

    createOrganizationCtr.$inject = ['$http', '$location', 'UserService', 'FlashService','$routeParams'];
    function createOrganizationCtr($http, $location, UserService, FlashService,$routeParams) {
		var coc = this;
		coc.createOrganizatin =createOrganizatin;
		function createOrganizatin(){
            console.log($routeParams.aid);
            coc.org.aid = $routeParams.aid;
			//console.log(coc.org);
			UserService.createOrganizatin(coc).then(function (response) {
                console.log(response);
                if(response.status === true)
                {
                	$location.path('/organization-manage');
                }
            });
		}
    }

})();
