var mainApp = angular.module('Fooder', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngFileUpload', 'ngMaterial', 'jkAngularCarousel']);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/Index', {
        templateUrl: 'static/Pages/Templates/home.html',
        controller: 'GenericContentPageController'
    })
    .when('/Products', {
        templateUrl: 'static/Pages/Templates/products.html',
        controller: 'ProductsController'
    })
    .when('/Login', {
        templateUrl: 'static/Pages/Templates/Login.html',
        controller: 'LoginController'
    })
    .when('/Manage', {
        templateUrl: 'static/Pages/Templates/Manage.html',
        controller: 'ManageController'
    })
    .when('/pages/:name', {
        templateUrl: 'static/Pages/Templates/GenericContentPage.html',
        controller: 'GenericContentPageController'
    })
    .when('/product/:id', {
        templateUrl: 'static/Pages/Templates/ProductView.html',
        controller: 'ProductViewController'
    })
    .otherwise({
        redirectTo: '/Index'
    });
}])