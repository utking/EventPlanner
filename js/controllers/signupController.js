'use strict';
(function() {
	angular.module('EventPlanner').
	controller('SignupController', [
		'$scope', 'AuthService', '$location',
		function($scope, AuthService, $location) {

			$scope.newUser = {};

			var usernameDeniedRegex = /[^a-zA-Z0-9_]/;

			$scope.checkUsername = function () {
				var username = document.querySelector('#username').value;
				var messages = [];
				if (usernameDeniedRegex.test(username)) {
					messages.push('Username can only contain characters, numbers, points, and underscore symbols');
				}
				if (username.length < 3) {
					messages.push('Username shoud be at least 3 characters long');
				}
				if (messages.length) {
					document.querySelector('#username').setCustomValidity(messages.join('\n'));
				} else {
					document.querySelector('#username').setCustomValidity('');
				}
			};

			$scope.checkValidity = function () {
				var username = document.querySelector('#username').value,
					password = document.querySelector('#password').value,
					confirm = document.querySelector('#confirm').value,
					email = document.querySelector('#email').value;
				var messages = {
					username: [],
					password: [],
					confirm: [],
					email: []
				};
				if (usernameDeniedRegex.test(username)) {
					messages.username.push('Username can only contain characters, numbers, points, and underscore symbols');
				}
				if (username.length < 3) {
					messages.username.push('Username shoud be at least 3 characters long');
				}

				if (AuthService.isExists(username)) {
					messages.username.push('This username is not available');
				}

				if (password !== confirm) {
					messages.confirm.push('Password and confirmation are not equal');
				}
				if (password.length < 16 || password.length > 100) {
					messages.password.push('Password must contain from 16 to 100 characters. Current length is ' + password.length);
				} else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || 
					!/[\!\@\#\$\%\^\&\*\(\)\_\+\[\]]/.test(password)) {
					messages.password.push('Password should contain upper and lower case characters, special symbols, and digits');
				}
				if (email.length < 3) {
					messages.email.push('Email has to be specified');
				}

				if (messages.username.length || messages.password.length || messages.email.length || messages.confirm.length) {
					if (messages.username.length) {
						document.querySelector('#username').setCustomValidity(messages.username.join('\n'));
					} else {
						document.querySelector('#username').setCustomValidity('');
					}
					if (messages.password.length) {
						document.querySelector('#password').setCustomValidity(messages.password.join('\n'));
					} else {
						document.querySelector('#password').setCustomValidity('');
					}
					if (messages.confirm.length) {
						document.querySelector('#confirm').setCustomValidity(messages.confirm.join('\n'));
					} else {
						document.querySelector('#confirm').setCustomValidity('');
					}

					if (messages.email.length) {
						document.querySelector('#email').setCustomValidity(messages.email.join('\n'));
					} else {
						document.querySelector('#email').setCustomValidity('');
					}
				} else {
					document.querySelector('#username').setCustomValidity('');
					document.querySelector('#password').setCustomValidity('');
					document.querySelector('#confirm').setCustomValidity('');
					document.querySelector('#email').setCustomValidity('');
				}
			};

			$scope.registerUser = function (user) {
				if (AuthService.createUser(user)) {
					$location.path('/');
				}
				
			};

			$scope.cancelSignup = function () {
				$scope.event = {};
				$location.path('/');
			};

			$scope.isGuest = function () {
				return AuthService.isGuest();
			};

			if (!$scope.isGuest() && $location.path() === '/signup') {
				console.log('redirect from Signup to /');
				$location.path('/');
			}

		}
	]);
}());