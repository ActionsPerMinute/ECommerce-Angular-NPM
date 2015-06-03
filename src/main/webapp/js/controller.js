'use strict';

// the ProductsController contains Product objects:
function ProductsController($scope, $http, $location, $cookieStore) {
	// Instantiate the product
	if ($location.path() == '/products') {
		var prods = new Products($scope, $http, $cookieStore);
	}
}

//the ShoppingCartController contains Product objects:
function ShoppingCartController($scope, $http, $location, $cookieStore) {
	// Instantiate the shopping cart
	if ($location.path() == '/cart') {
		var prods = new ShoppingCart($scope, $http, $cookieStore);
	}
}