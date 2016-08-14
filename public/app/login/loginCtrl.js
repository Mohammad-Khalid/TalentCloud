(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$log', '$http', '$location', '$uibModal', 'AuthenticationService', 'FlashService'];

    function LoginController($scope, $log, $http, $location, $uibModal, AuthenticationService, FlashService) {





        // login model code

        $scope.items = {};

        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            $scope.items.loginName = size;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }



})();

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, AuthenticationService, FlashService) {
    var vm = this;
    vm.res;
    vm.login = login;

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        console.log('ITS WOOOOOORKING');
        AuthenticationService.Login(vm.user.username, vm.user.password, function (response) {
            vm.res = response;
            if (response.status) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $uibModalInstance.dismiss();
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



    $scope.items = items;


    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});