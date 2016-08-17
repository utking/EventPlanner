/* eslint-env angular */
(function () {
	angular.module('EventPlanner').
	config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {

			$routeProvider.
			when('/', {
				controller: 'MainController',
				templateUrl: '/js/views/table.html'
			}).
			when('/create', {
				controller: 'AddEventController',
				templateUrl: '/js/views/form.html'
			}).
			when('/edit/:id', {
				controller: 'EditEventController',
				templateUrl: '/js/views/form.html'
			}).
			when('/view/:id', {
				controller: 'ViewEventController',
				templateUrl: '/js/views/details.html'
			}).
			when('/signup', {
				controller: 'SignupController',
				templateUrl: '/js/views/auth/signup.html'
			}).
			when('/login', {
				controller: 'LoginController',
				templateUrl: '/js/views/auth/login.html'
			}).
			when('/logout', {
				controller: 'LogoutController',
				templateUrl: '/js/views/table.html'
			}).
			otherwise({
				controller: 'MainController',
				templateUrl: '/js/views/table.html'
			});

		}
	]);
}());