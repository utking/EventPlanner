(function() {
	angular.module('EventPlanner').
	controller('ViewEventController', [
		'$scope', 'EventsService', '$location', '$routeParams', 'AuthService',
		function($scope, EventsService, $location, $routeParams, AuthService){

			$scope.listGuests = function (str) {
				return str.split(/[,;.]/).map(function(i) {return $.trim(i);}).filter(function(i) {return i.length; } );
			};

			$scope.deleteEvent = function (event) {
				var date = new Date(event.start_datetime.toISOString().split('.')[0]);
				var delRequest = 'Are you sure you want to remove the event "' + 
					event.name + '" appointed on "' + date.toLocaleString() + '"?';
				if (confirm(delRequest)) {
					EventsService.remove(event);
					$location.path('/');
				}
			};

			if (AuthService.isGuest()) {
				$location.path('/');
			}

			$scope.event = EventsService.loadEvent($routeParams.id);
			$scope.event.start_datetime = new Date($scope.event.start_datetime);
			$scope.event.end_datetime = new Date($scope.event.end_datetime);

		}
	]);
}());