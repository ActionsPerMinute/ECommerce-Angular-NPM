(function() {
	'use strict';

	angular.module('app').controller('ProductsController', ProductsController);

	ProductsController.$inject = [ 'UserService', 'ProductService',
			'$rootScope' ];

	function ProductsController(UserService, ProductService, $rootScope) {
		var pc = this;
		pc.user = null;

		initController();

		function initController() {
			loadCurrentUser();
		}
		function loadCurrentUser() {
			pc.user = $rootScope.globals.currentUser.username;
		}
		ProductService.GetAllItems().then(function(items) {
			console.log(items);
			if (items != null && items.success != null && !items.success) {
				FlashService.Error(items.message);
			} else if(items != null && items.data != null){
				pc.items = items.data;
			}
		});

		pc.AddToCart = function(product, $event, path) {

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
					"#btnBuyToggle").find('.btn-success').removeClass(
					'btn-success');
			angular.element($event.currentTarget).parent().parent().siblings(
					"#btnBuyToggle").addClass('btn-warning');
		};
	}
})();