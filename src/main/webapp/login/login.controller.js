(function() {
	'use strict';

	angular.module('app').controller('LoginController',LoginController);

	LoginController.$inject = [ '$location', 'AuthenticationService','FlashService','$rootScope' ];
	function LoginController($location, AuthenticationService, FlashService,$rootScope) {
		
		var lc = this;
		lc.login = login;
		
		$("#licartsymbol").hide();
		$("#liuser").hide();

		(function initController() {
			// reset login status
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			lc.dataLoading = true;
			AuthenticationService.Login(lc.username, lc.password, function(response) {
				if (response.success) {
					AuthenticationService.SetCredentials(lc.username,lc.password);
					$rootScope.flash = null;
					$location.path('/');
				} else {
					FlashService.Error(response.message);
					lc.dataLoading = false;
				}
			});
		};
	}

})();