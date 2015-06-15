'use strict';

//Items service used to communicate Items REST endpoints
angular.module('items').factory('Items', ['$resource',
	function($resource) {
		return $resource('items/:itemId', { itemId: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);