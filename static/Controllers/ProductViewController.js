mainApp.controller('ProductViewController', function ($scope, $localStorage, $routeParams, CRUDService) {
      $scope.currentProductId = $routeParams.id;
      $scope.GetProductData = function() {
            $scope.products.forEach(function(product){
                if(product.id.toString() == $scope.currentProductId)
                {
                    $scope.productName = product.name;
                    $scope.productContent = product.content;
                    if(product.photo_src == "undefined"){
                        $scope.productPic = $scope.noImagePhoto;
                    }
                    else
                    {
                        $scope.productPic = $scope.productsImagesRootDir + product.photo_src;
                    }
                }
            });
      }
      $scope.GetProductData()
});