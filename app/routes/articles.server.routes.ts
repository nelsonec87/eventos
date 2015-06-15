///<reference path="../controllers/articles.server.controller.ts" />

import users = require('../../app/controllers/users.server.controller')
import articles = require('../../app/controllers/articles.server.controller')
import express = require('express')

export = function(app: express.Express) {
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	app.param('articleId', articles.articleByID);
};
