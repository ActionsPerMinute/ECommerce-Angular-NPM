(function() {
	'use strict';

	angular.module('app').controller('CheckoutController', CheckoutController);

	CheckoutController.$inject = [ '$rootScope','sharedProperties' ];

	function CheckoutController($rootScope,sharedProperties) {
		var cc = this;
		cc.user = null;
		
		initController();

		function initController() {
			loadCurrentUser();
			ShowHideControls();
		}
		function loadCurrentUser() {
			cc.user = $rootScope.globals.currentUser.username;
		}
		
		function ShowHideControls() {
			$("#licartsymbol").hide();
			$("#liuser").show();
		}
		if(sharedProperties.getValue("checkoutmessage") != null && sharedProperties.getValue("checkoutmessage") != undefined){
			cc.checkoutmessage = sharedProperties.getValue("checkoutmessage");
		}
	}
})();