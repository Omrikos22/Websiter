mainApp.controller('IndexController', function ($scope, $rootScope, $localStorage, $location, CRUDService) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (!$localStorage.currentUser) {
                $scope.isConnect = false;
            }
            else
            {
                $scope.isConnect = true;
            }
        });

    $scope.Logout = function () {
        delete $localStorage.currentUser;
        location.reload();
    };

    $scope.GetPages = function () {
        CRUDService.GetPages().then(
            function success(response) {
                $scope.pages = response.data.reverse();
            },
            function error(response) {
            }
        );
    }
});