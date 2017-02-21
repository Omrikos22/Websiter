mainApp.controller('ProductViewController', function ($scope, $localStorage, $routeParams, CRUDService) {
      $scope.currentProductId = $routeParams.id;
      $scope.GetProductData = function() {
            $scope.products.forEach(function(product){
                if(product.id.toString() == $scope.currentProductId)
                {
                    $scope.productName = product.name;
                    $scope.productContent = product.content;
                    $scope.productPic = $scope.productsImagesRootDir + product.photo_src;
                }
            });
      }
      $scope.GetProductData()
});