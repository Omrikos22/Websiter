mainApp.controller('IndexController', function ($scope, $rootScope, $localStorage, $location, CRUDService) {
    $scope.productsImagesRootDir = "static/images/products/";
    $scope.contentPagesImageRootDir = "static/images/pages/";
    $scope.noImagePhoto = "static/images/noImg/NoPhoto.png";
    $scope.currentIndex = 0;
    $scope.myInterval = 30;
    $scope.slides = [
            {image: 'static/images/slider/img1.png'},
            {image: 'static/images/slider/img2.png'},
            {image: 'static/images/slider/img3.png'}
        ];
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };
    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
     $scope.slides = [
            {image: 'static/images/slider/img1.png', description: 'Image 00'},
            {image: 'static/images/slider/img2.png', description: 'Image 02'},
            {image: 'static/images/slider/img3.png', description: 'Image 03'}
        ];

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
                if($scope.pages.length > 0)
                {
                    $scope.currentEditorContentPageId = $scope.pages[1].id;
                    $scope.currentEditorContentPageName = $scope.pages[1].name;
                    $scope.currentEditorContentPageContent = $scope.pages[1].content;
                    $scope.currentEditorContentPagePicFile = $scope.pages[1].photo_src;
                }
            },
            function error(response) {
            }
        );
    }
    $scope.GetProducts = function() {
            CRUDService.GetAllProducts().then(
            function success(response) {
               $scope.products = response.data;
               if($scope.products.length > 0)
               {
                   $scope.currentEditorProductId = $scope.products[1].id;
                   $scope.currentEditorProductName = $scope.products[1].name;
                   $scope.currentEditorProductContent = $scope.products[1].content;
                   $scope.currentEditorPicFile = $scope.products[1].photo_src;
               }
            },
            function error(response) {
            }
        );
    }
    $scope.GetPages();
    $scope.GetProducts();
});