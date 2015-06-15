'use strict';

// Configuring the new module
angular.module('items').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('sidebar', 'Items', 'items', 'dropdown', '/items(/create)?');
		Menus.addSubMenuItem('sidebar', 'items', 'List Items', 'items');
		Menus.addSubMenuItem('sidebar', 'items', 'New Item', 'items/create');
	}
]);
