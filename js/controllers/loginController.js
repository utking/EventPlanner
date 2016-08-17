(function() {
	angular.module('EventPlanner').
	controller('LoginController', [
		'$scope', 'EventsService', 'AuthService', '$location',
		function($scope, EventsService, AuthService, $location) {

			$scope.user = {};

			$scope.isGuest = function () {
				return AuthService.isGuest();
			};

			$scope.login = function (user) {
				if (AuthService.checkPassword(user.username, user.password)) {
					$location.path('/');
				} else {
					$scope.error = 'Authorization failed!';
				}
			};

			if (!$scope.isGuest()) {
				$location.path('/');
			}

		}
	]);
}());