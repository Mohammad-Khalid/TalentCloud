(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('editOrganizationCtr', editOrganizationCtr);

    editOrganizationCtr.$inject = ['$http', '$location', 'UserService', 'FlashService', '$routeParams'];

    function editOrganizationCtr($http, $location, UserService, FlashService, $routeParams) {
        var eovm = this;
        /*console.log($routeParams.org_id);
            eovm.org_id = $routeParams.org_id;
			console.log(eovm);*/
        eovm.updateOrganization = updateOrganization;
        eovm.org = {
            address: {}
        };
        UserService.editOrganizatin($routeParams.org_id).then(function (response) {
            //console.log(response);
            /*if(response.status === true)
            {
            	$location.path('/organization-manage');
            }*/
            eovm.org.org_id = response[0].ORGID;
            eovm.org.created_by = response[0].created_by;
            eovm.org.full_oname = response[0].FULL_ONAME;
            eovm.org.oname = response[0].ONAME;
            eovm.org.org_code = response[0].ORG_CODE;
            eovm.org.primary_phone = response[0].PRIMARY_PHONE;
            eovm.org.secondary_phone = response[0].SECONDARY_PHONE;
            eovm.org.email = response[0].email;
            eovm.org.comments = response[0].COMMENTS;
            eovm.org.address.address_1 = response[0].address_1;
            eovm.org.address.address_2 = response[0].address_2;
            eovm.org.address.address_city = response[0].address_city;
            eovm.org.address.address_zipcode = response[0].address_zipcode;
            eovm.org.address.address_state = response[0].address_state;
            eovm.org.address.address_country = response[0].address_country;
            //console.log(eovm.org);
        });

        function updateOrganization(org_id) {
            console.log(eovm.org);
            UserService.updateOrganization(eovm.org).then(function (res) {
                //console.log("************");
                //console.log(res);
                if (res.status === true) {
                    $location.path('/organization-manage');
                }
            });
        }
    }

})();