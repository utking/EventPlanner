(function() {
	angular.module('EventPlanner').
	controller('MainController', [
		'$scope', 'EventsService', 'AuthService', '$location',
		function($scope, EventsService, AuthService, $location) {
			console.log('MainCtrl');

			$scope.events = [];

			$scope.isGuest = function () {
				return AuthService.isGuest();
			};

			$scope.deleteEvent = function (event) {
				var date = new Date(event.start_datetime.split('.')[0]);
				var delRequest = 'Are you sure you want to remove the event "' + 
					event.name + '" appointed on "' + date.toLocaleString() + '"?';
				if (confirm(delRequest)) {
					EventsService.remove(event);
					$scope.events = EventsService.load();
				}
			};

			if ($scope.isGuest()) {
				console.log('mainCtrl');
				$location.path('/login');
			} else {
				$scope.events = EventsService.load();
			}
		}
	]);
}());