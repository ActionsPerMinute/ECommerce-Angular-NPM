function ShoppingCart($scope, $http, $cookieStore) {
	var cartArray = $cookieStore.get('viewcart');
	$scope.shoppingCartItems = JSON.parse(JSON.stringify(cartArray));
	$scope.quantity = 1;
	
	// get the total price for all items currently in the cart
	$scope.getTotalPrice = function () {
	    var total = 0;
	    for (var i = 0; i < $scope.shoppingCartItems.length; i++) {
	        var item = $scope.shoppingCartItems[i];
	        console.log(item);
	        total += parseFloat(item.price,10);
	    }
	    return total;
	}
	
	// get the total quantity of all items currently in the cart
	$scope.getTotalCount = function () {
		return $scope.shoppingCartItems.length;
	}
};