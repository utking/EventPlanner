(function() {
	angular.module('EventPlanner').
	controller('EditEventController', [
		'$scope', 'EventsService', '$location', '$routeParams', 'AuthService',
		function($scope, EventsService, $location, $routeParams, AuthService){

			console.log('EditCtrl');

			if (AuthService.isGuest()) {
				console.log('redirect from Edit to /');
				$location.path('/');
			}

			$scope.event = {};

			$scope.cancelEdit = function () {
				$scope.event = {};
				$location.path('/');
			};

			$scope.addEvent = function (event) {
				if (EventsService.save(event)) {
					$location.path('/');
				} else {
					document.console.error('Error');
				}
			};

			$scope.event = EventsService.loadEvent($routeParams.id);
			$scope.event.start_datetime = new Date($scope.event.start_datetime);
			$scope.event.end_datetime = new Date($scope.event.end_datetime);

		}
	]);
}());

/*$scope.getDatetime = function (datetime) {
				var d;
				try {
					d = new Date(datetime);
				} catch (e) {
					d = new Date;
				}
				var result = d.getFullYear() + '-';
				result += (d.getMonth() + 1 < 10) ? '0' : '';
				result += (d.getMonth() + 1) + '-';
				result += (d.getDate() < 10) ? '0' : '';
				result += d.getDate() + 'T';
				result += (d.getHours() < 10) ? '0' : '';
				result += d.getHours() + ':';
				result += (d.getMinutes() < 10) ? '0' : '';
				result += d.getMinutes() + ':00';
				
				return result;
			};*/