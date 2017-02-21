mainApp.controller('IndexController', function ($scope, $rootScope, $localStorage, $location, CRUDService) {
    $scope.productsImagesRootDir = "static/images/products/";
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
    $scope.GetAllProducts = function() {
            CRUDService.GetAllProducts().then(
            function success(response) {
               $scope.products = response.data;
               if($scope.products.length > 0)
               {
                   $scope.CurrentEditorProductId = $scope.products[0].id;
                   $scope.CurrentEditorProductName = $scope.products[0].name;
                   $scope.CurrentEditorProductContent = $scope.products[0].content;
                   $scope.CurrentEditorPicFile = $scope.products[0].photo_src;
               }
            },
            function error(response) {
            }
        );
    }
    $scope.GetPages();
    $scope.GetAllProducts();
});