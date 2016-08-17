(function() {
	angular.module('EventPlanner').
	controller('LogoutController', [
		'$scope', 'AuthService', '$location',
		function($scope, AuthService, $location) {
			AuthService.logout();
			$location.path('/');
		}
	]);
}());