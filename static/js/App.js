var mainApp = angular.module('Fooder', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngFileUpload']);

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
}]);