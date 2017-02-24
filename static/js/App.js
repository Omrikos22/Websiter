var mainApp = angular.module('Fooder', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngFileUpload', 'ui.bootstrap']);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/Index', {
        templateUrl: 'static/Pages/Templates/home.HTML',
        controller: 'GenericContentPageController'
    })
    .when('/Products', {
        templateUrl: 'static/Pages/Templates/products.HTML',
        controller: 'ProductsController'
    })
    .when('/Login', {
        templateUrl: 'static/Pages/Templates/Login.HTML',
        controller: 'LoginController'
    })
    .when('/Manage', {
        templateUrl: 'static/Pages/Templates/Manage.HTML',
        controller: 'ManageController'
    })
    .when('/pages/:name', {
        templateUrl: 'static/Pages/Templates/GenericContentPage.HTML',
        controller: 'GenericContentPageController'
    })
    .when('/product/:id', {
        templateUrl: 'static/Pages/Templates/ProductView.HTML',
        controller: 'ProductViewController'
    })
    .otherwise({
        redirectTo: '/Index'
    });
}]).animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});