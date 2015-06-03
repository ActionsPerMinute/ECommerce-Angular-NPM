'use strict';
// App Module: the name AngularStore matches the ng-app attribute in the main
// <html> tag
// the route provides parses the URL and injects the appropriate partial page
var app = angular.module('ECommerceApp', [ 'ngRoute','ngCookies' ]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/products', {
		templateUrl : 'partials/Products.html',
		controller : ProductsController
	}).when('/cart', {
		templateUrl : 'partials/ShoppingCart.html',
		controller : ShoppingCartController
	}).otherwise({
		redirectTo : '/products'
	});
} ]);

app.run(function($rootScope,$location) {
	$rootScope.navigatetocart = function(path) {
		$location.path(path);
	};
})