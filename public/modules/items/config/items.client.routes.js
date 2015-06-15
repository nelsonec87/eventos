'use strict';

//Setting up route
angular.module('items').config(['$stateProvider',
	function($stateProvider) {
		// Items state routing
		$stateProvider.
		state('app.listItems', {
			url: '/items',
			templateUrl: 'modules/items/views/list-items.client.view.html'
		}).
		state('app.createItem', {
			url: '/items/create',
			templateUrl: 'modules/items/views/create-item.client.view.html'
		}).
		state('app.viewItem', {
			url: '/items/:itemId',
			templateUrl: 'modules/items/views/view-item.client.view.html',
			controller: 'ItemsController'
		}).
		state('app.editItem', {
			url: '/items/:itemId/edit',
			templateUrl: 'modules/items/views/edit-item.client.view.html'
		});
	}
]);