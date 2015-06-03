function Products($scope, $http, $cookieStore) {

	$scope.cartItems = [];

	var url = 'http://localhost:8080/AngularUI/rest/service/getallitems';
	$http.get(url).success(function(data, status, headers, config) {
		// this callback will be called asynchronously
		// when the response is available
		console.log(data);
		$scope.items = data;
	}).error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		console.log(data);
	});

	$scope.AddToCart = function(product, $event, path) {

		// Add the cart count
		if (!$("#cartCount").text() || 0 === $("#cartCount").text().length)
			$("#cartCount").text(1);
		else {
			var value = parseInt($("#cartCount").text(), 10) + 1;
			$("#cartCount").text(value);
		}

		// Change the color of cart symbol when the items are added to cart
		$("#cartCount").addClass('cart-color');
		$("#cartSymbol").addClass('cart-color');

		// Change the color of the buttons when the items are added to cart
		angular.element($event.currentTarget).addClass("disable_a_href");
		angular.element($event.currentTarget).parent().parent().siblings(
				"#btnBuy").find('.btn-success').removeClass('btn-success');
		angular.element($event.currentTarget).parent().parent().siblings(
				"#btnBuy").addClass('btn-warning');
		angular.element($event.currentTarget).parent().parent().siblings(
				"#btnBuyToggle").find('.btn-success')
				.removeClass('btn-success');
		angular.element($event.currentTarget).parent().parent().siblings(
				"#btnBuyToggle").addClass('btn-warning');

		$scope.cartItems.push(product);
		$cookieStore.put('viewcart', $scope.cartItems);
	};
};