(function() {
	'use strict';

	angular.module('app').controller('ProductsController', ProductsController);
	
	ProductsController.$inject = [ 'UserService', 'ProductService','CartService','sharedProperties','FlashService', '$rootScope' ];

	function ProductsController(UserService, ProductService, CartService,sharedProperties,FlashService,$rootScope) {
		var pc = this;
		pc.user = null;
		
		pc.serviceurl = ECommerceApp.Constants.SERVICEURL;
		initController();

		function initController() {
			loadCurrentUser();
			ShowHideControls();
		}
		function loadCurrentUser() {
			pc.user = $rootScope.globals.currentUser.username;
		}
		
		function ShowHideControls() {
			$("#licartsymbol").show();
			$("#liuser").show();
		}
		
		//Get cart items
		CartService.getCartItems(pc.user).then(function(cartItems) {
			console.log("getCartItems");
			console.log(cartItems);
			if (cartItems != null && cartItems.success != null && !cartItems.success) {
				FlashService.Error(cartItems.message);
			} else if (cartItems != null && cartItems.data != null && cartItems.data.length > 0) {
				UpdateCartInformation(cartItems.data);
			}
		});
		
		//Get all items
		ProductService.GetAllItems().then(function(items) {
			console.log("GetAllItems");
			console.log(items);
			if (items != null && items.success != null && !items.success) {
				FlashService.Error(items.message);
			} else if (items != null && items.data != null) {
				pc.items = items.data;
			}
		});
		
		//Add to Cart
		pc.AddToCart = function(product, $event) {
			CartService.addItemToCart(pc.user, product.id).then(function(items) {
				console.log("addItemToCart");
				console.log(items);
				if (items != null && items.success != null && !items.success) {
					FlashService.Error(items.message);
				} else if (items != null && items.data != null && parseInt(items.data.cartSize) > 0) {
					// Add the cart count
					if (!$("#cartCount").text() || 0 === $("#cartCount").text().length)
						$("#cartCount").text(1);
					else {
						var value = parseInt($("#cartCount").text(), 10) + 1;
						$("#cartCount").text(value);
				}
				
				ChangeCartSymbolColor();	

				// Change the color of the buttons when the
				// items are added to cart
				angular.element($event.currentTarget).addClass("disable_a_href");
				angular.element($event.currentTarget).find('.btn-success').removeClass('btn-success');
				angular.element($event.currentTarget).addClass('btn-warning');
				}
			});
		};
	};
	
})();