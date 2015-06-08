(function() {
	'use strict';

	angular.module('app').controller('ShoppingCartController', ShoppingCartController);

	ShoppingCartController.$inject = [ 'UserService', 'CartService','CheckoutService','sharedProperties','FlashService', '$rootScope','$location' ];

	function ShoppingCartController(UserService, CartService,CheckoutService,sharedProperties,FlashService, $rootScope,$location) {
		var sc = this;
		CartService.user = null;
		
		console.log();
		initController();

		function initController() {
			loadCurrentUser();
			ShowHideControls();
		}
		
		function loadCurrentUser() {
			sc.user = $rootScope.globals.currentUser.username;
		}
		
		function ShowHideControls() {
			$("#licartsymbol").show();
			$("#liuser").show();
			$('#divCartContent').show();
		}
		
		//Checkout item from cart
		sc.CheckOut = function() {
			console.log("CheckOutItemsFromCart click");
			sc.dataLoading = true;
			CheckoutService.CheckOutItemsFromCart(sc.user).then(function(items) {
				console.log("CheckOutItemsFromCart");
				console.log(items);
				if (items != null && items.success != null && !items.success) {
					FlashService.Error(items.message);
					sc.dataLoading = false;
				} else if (items != null && items.data != null) {
					sharedProperties.setValue("checkoutmessage",items.data);
					$location.path('/checkout');
				}
			});
		}
		
		CartService.getCartItems(sc.user).then(function(cartItems) {
			console.log("getCartItems");
			console.log(cartItems);
			if (cartItems != null && cartItems.success != null && !cartItems.success) {
				FlashService.Error(cartItems.message);
				$('#divCartContent').hide();
			 } else if (cartItems != null && cartItems.data != null && cartItems.data.length > 0) {
					
				UpdateCartInformation(cartItems.data);
				sc.cartItems = cartItems.data;
				sc.quantity = 1;
					
				// get the total price for all items currently in the cart
				sc.getTotalPrice = function() {
					var total = 0;
					for (var i = 0; i < sc.cartItems.length; i++) {
						var item = sc.cartItems[i];
						if(item != null && item != 'undefined'){
							total += parseFloat(item.price, 10);
						}
					}
					return total;
				}
					
				// get the total quantity of all items currently in the cart
				sc.getTotalCount = function() {
					return sc.cartItems.length;
				}
					
				//Removes item from cart
				sc.RemoveFromCart = function(cartItems,cartItem, index) {
					CartService.removeItemFromCart(sc.user,cartItem.itemId).then(function(items) {
					console.log("RemoveFromCart");
					console.log(items);
					if (items != null && items.success != null && !items.success) {
						FlashService.Error(items.message);
					} else if (items != null && items.data != null) {
							if (items.data.indexOf("Deleted item id") == -1) {
								FlashService.Error(items.data);
							} else {
								var value = parseInt($("#cartCount").text(), 10) - 1;
								$("#cartCount").text(value);
								cartItems.splice(index, 1);;
							}
						}
					});
				  }
					
				}
				else{
					FlashService.Error("Your cart is empty.Please add items to your chart");
					$('#divCartContent').hide();
				}
			});
	}
})();