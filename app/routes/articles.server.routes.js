///<reference path="../controllers/articles.server.controller.ts" />
var users = require('../../app/controllers/users.server.controller');
var articles = require('../../app/controllers/articles.server.controller');
module.exports = function (app) {
    app.route('/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);
    app.route('/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    app.param('articleId', articles.articleByID);
};
