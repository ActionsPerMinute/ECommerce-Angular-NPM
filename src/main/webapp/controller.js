'use strict';
//the ShoppingCartController contains Product objects:
function ShoppingCartController($scope, $http, $location, $cookieStore) {
	// Instantiate the shopping cart
	if ($location.path() == '/cart') {
		var sc = new ShoppingCart($scope, $http, $cookieStore);
	}
}
