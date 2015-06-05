(function() {
	'use strict';

	angular.module('app').factory('ProductService', ProductService);

	ProductService.$inject = [ '$http' ];
	function ProductService($http) {
		var service = {};

		service.GetAllItems = GetAllItems;

		return service;

		function GetAllItems() {

			return $http(
					{
						method : 'GET',
						url : 'http://localhost:1111/AngularUI/rest/service/getallitems'
					}).then(handleSuccess,
					handleError('Error in loading products. Please try again later.'));

			// private functions
			function handleSuccess(data) {
				return data;
			}

			function handleError(error) {
				return function() {
					return {
						success : false,
						data : error
					};
				};
			}
		}
	}

})();