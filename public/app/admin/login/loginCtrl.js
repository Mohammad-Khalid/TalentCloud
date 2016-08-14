(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('AdminLoginController', AdminLoginController);

    AdminLoginController.$inject = ['$http', '$location', '$log', 'AuthenticationService', 'FlashService'];

    function AdminLoginController($http, $location, $log, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;
        vm.res;
        console.log("login");
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;

            AuthenticationService.Login(vm.user.username, vm.user.password, function (response) {
                vm.res = response;
                if (response.status) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    if (response.user.user_type == 0)
                        $location.url('/dashboard?aid=' + response.user.AID);
                    else
                        $location.path('/user');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }



})();