(function() {
	angular.module('EventPlanner').
	controller('AddEventController', [
		'$scope', 'EventsService', '$location', 'AuthService',
		function($scope, EventsService, $location, AuthService){

			console.log('AddCtrl');

			if (AuthService.isGuest()) {
				console.log('redirect from Add to /');
				$location.path('/');
			}

			$scope.event = {};

			$scope.cancelEdit = function () {
				$scope.event = {};
				$location.path('/');
			};

			$scope.addEvent = function (event) {
				if (EventsService.create(event)) {
					$location.path('/');
				} else {
					document.console.error('Error');
				}
			};
		}
	]);
}());