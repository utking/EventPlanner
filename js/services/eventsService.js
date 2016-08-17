(function() {
	angular.module('EventPlanner').
	factory('EventsService', [
		function () {
			var eventsCount = 0;
			var events = [];

			var _loadItems = function () {
				eventsCount = Number(localStorage.getItem('eventsCount'));
				var items = [];
				if (eventsCount > 0) {
					var newCount = 0;
					for (var i = 0; i < eventsCount; i++) {
						var item = localStorage.getItem('event_'+i);
						try {
							items.push(JSON.parse(item || undefined));
							newCount++;
						} catch (e) {
							localStorage.removeItem('event_'+i);
						}
					}
					eventsCount = newCount;
				} else {
					eventsCount = 0;
					localStorage.setItem('eventsCount', eventsCount);
				}
				return items;
			};
			var _writeItems = function (items) {
				if (items.length) {
					for (var i = 0; i < items.length; i++) {
						localStorage.setItem('event_'+i, JSON.stringify(items[i]));
					}
				}
				localStorage.setItem('eventsCount', items.length);
			};

			var _findItem = function (event) {
				if (!event || !event.id) {
					return false;
				}
				var itemIndex = events.findIndex(function(i) {
					return Number(i.id) === Number(event.id);
				});
				return itemIndex;
			};

			return {
				load: function () {
					events = _loadItems();
					return events;
				},

				create: function (event) {
					if (events.length) {
						event.id = events[events.length-1].id + 1;
					} else {
						event.id = 1;
					}
					events.push(event);
					_writeItems(events);
					return event;
				},

				save: function (event) {
					var itemIndex = _findItem(event);
					if (itemIndex < 0) {
						return false;
					}
					
					events[itemIndex] = event;
					_writeItems(events);
					return event;
				},

				loadEvent: function (id) {
					events = _loadItems();
					return events.find(function (e) {
						return Number(id) === Number(e.id);
					});
				},

				remove: function (event) {
					var itemIndex = _findItem(event);
					if (itemIndex < 0) {
						return false;
					}
					events.splice(itemIndex, 1);
					_writeItems(events);
					return event;
				}
			};
		}
	]);
}());