﻿mainApp.controller('IndexController', function ($scope, $rootScope, $localStorage, $location, CRUDService) {
    $scope.homePageContent = "";
    $scope.productsImagesRootDir = "static/images/products/";
    $scope.contentPagesImageRootDir = "static/images/pages/";
    $scope.noImagePhoto = "static/images/noImg/NoPhoto.png";
    $scope.slides = [
            {src: 'static/images/slider/drink_machine.jpg'},
            {src: 'static/images/slider/hot_pizza.jpg'},
            {src: 'static/images/slider/pancake.jpg'},
            {src: 'static/images/slider/pancake_in_made.jpg'},
            {src: 'static/images/slider/sahlav.jpg'}
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

    $scope.GetUnPermanentPages = function () {
        CRUDService.GetPages().then(
            function success(response) {
                pages = response.data;
                $scope.unPermanentPages = [];
                pages.forEach(function(page){
                    if(page.permanent == 0)
                    {
                        $scope.unPermanentPages.push(page);
                    }
                    else
                    {
                        return;
                    }
                });
                $scope.pages = $scope.pages.reverse();
            },
            function error(response) {
            }
        );
    };
    $scope.GetPages = function () {
        CRUDService.GetPages().then(
            function success(response) {
                pages = response.data;
                $scope.pages = [];
                pages.forEach(function(page){
                    $scope.pages.push(page);
                    if(page.name == "דף הבית")
                    {
                        $scope.homePageContent = page.content;
                    }
                });
                $scope.pages = $scope.pages.reverse();
                if($scope.pages.length > 0)
                {
                    $scope.currentEditorContentPageId = $scope.pages[0].id;
                    $scope.currentEditorContentPageName = $scope.pages[0].name;
                    $scope.currentEditorContentPageContent = $scope.pages[0].content;
                    $scope.currentEditorContentPagePicFile = $scope.pages[0].photo_src;
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
                   $scope.currentEditorProductId = $scope.products[0].id;
                   $scope.currentEditorProductName = $scope.products[0].name;
                   $scope.currentEditorProductContent = $scope.products[0].content;
                   $scope.currentEditorPicFile = $scope.products[0].photo_src;
               }
            },
            function error(response) {
            }
        );
    }
    $scope.GetPages();
    $scope.GetProducts();
});