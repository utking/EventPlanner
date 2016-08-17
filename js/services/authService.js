(function() {
	angular.module('EventPlanner').
	factory('AuthService', [
		function () {
			var _users = [];
			var _currentUser = {};
			var _authorized = false;

			var usersCount = 0;

			var _getCurrentUser = function () {
				var currentUser = localStorage.getItem('currentUser');
				try {
					_currentUser = JSON.parse(currentUser || undefined);
					_authorized = _currentUser.username ? true : false;
				} catch (e) {
					localStorage.removeItem('currentUser');
					_authorized = false;
				}
			};

			var _saveCurrentUser = function (curUser) {
				if (curUser && curUser.username) {
					localStorage.setItem('currentUser', JSON.stringify(curUser));
				} else {
					localStorage.removeItem('currentUser');
				}
			};

			var _loadItems = function () {
				usersCount = Number(localStorage.getItem('usersCount'));
				var items = [];
				if (usersCount > 0) {
					var newCount = 0;
					for (var i = 0; i < usersCount; i++) {
						var item = localStorage.getItem('user_'+i);
						try {
							items.push(JSON.parse(item || undefined));
							newCount++;
						} catch (e) {
							localStorage.removeItem('user_'+i);
						}
					}
					usersCount = newCount;
				} else {
					usersCount = 0;
					localStorage.setItem('usersCount', usersCount);
				}
				return items;
			};

			var _writeItems = function (items) {
				if (items.length) {
					for (var i = 0; i < items.length; i++) {
						localStorage.setItem('user_'+i, JSON.stringify(items[i]));
					}
				}
				localStorage.setItem('usersCount', items.length);
			};

			_users = _loadItems();
			_getCurrentUser();

			return {
				isGuest: function () {
					return !_authorized;
				},

				getUser: function () {
					return _currentUser;
				},

				logout: function () {
					_currentUser = {};
					_saveCurrentUser(_currentUser);
					_authorized = false;
				},

				checkPassword: function (username, password) {
					_authorized = false;
					var user = _users.find(function (u) {
						return u.username === username;
					});
					if (user && user.password === password) {
						_currentUser = user;
						_saveCurrentUser(_currentUser);
						_authorized = true;
					}
					return _authorized;
				},

				isExists: function (username) {
					if (!username) {
						return false;
					}
					var existingUser = _users.find(function (u) {
						return u.username === username;
					});
					return existingUser ? true : false;
				},

				createUser: function (user) {
					if (!user || !user.username || user.password !== user.confirmation
						|| !user.email) {
						console.log(!user, !user.username, user.username !== user.confirmation, !user.email, user);
						_authorized = false;
						return _authorized;
					}
					var existingUser = _users.find(function (u) {
						return u.username === user.username;
					});
					if (existingUser && existingUser.username === user.username) {
						_authorized = false;
						return _authorized;
					}
					_users.push(user);
					_currentUser = user;
					_saveCurrentUser(_currentUser);
					_authorized = true;
					_writeItems(_users);
					return user;
				}

			};
		}
	]);
}());