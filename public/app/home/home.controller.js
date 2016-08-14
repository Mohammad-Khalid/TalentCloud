(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeLoginController', HomeLoginController);

    HomeLoginController.$inject = ['$scope', '$log', '$http', '$location', '$uibModal', 'AuthenticationService', 'FlashService'];

    function HomeLoginController($scope, $log, $http, $location, $uibModal, AuthenticationService, FlashService) {





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

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, AuthenticationService, FlashService, $location) {
    var vm = this;
    vm.res;
    vm.login = login;

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        console.log('ITS WPRKING');
        AuthenticationService.memberLogin(vm.user.username, vm.user.password, vm.user.code, function (response) {
            vm.res = response;
            if (response.status) {
                $scope.cancel();
                AuthenticationService.SetCredentials(vm.username, vm.password);
                if (response.user.user_type_uid == 1)
                    $location.url('/student_dashboard');
                else if (response.user.user_type_uid == 2)
                    $location.path('/teacher_dashboard');
                else
                    $location.path('/teacher_dashboard');

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