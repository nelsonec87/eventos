///<reference path="../../typings/node/node.d.ts" />
///<reference path="../../typings/sequelize/sequelize.d.ts" />
///<reference path="../../typings/express/express.d.ts" />
var errorHandler = require('./errors.server.controller');
var db = require('../../config/mysql');
var _ = require('lodash');
var Article = db.Article;
var ArticlesController = (function () {
    function ArticlesController() {
    }
    ArticlesController.prototype.create = function (req, res) {
        var article = Article.build(req.body);
        article.UserId = req.user.id;
        article.save().then(function () {
            res.json(article);
        }).catch(function (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    };
    ArticlesController.prototype.read = function (req, res) {
        res.json(req.article);
    };
    ArticlesController.prototype.update = function (req, res) {
        var article = req.article;
        article = _.extend(article, req.body);
        article.save().then(function () {
            res.json(article);
        }).catch(function (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    };
    ArticlesController.prototype.delete = function (req, res) {
        var article = req.article;
        article.destroy().then(function () {
            res.json(article);
        }).catch(function (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    };
    ;
    ArticlesController.prototype.list = function (req, res) {
        Article.findAll({
            include: [{ model: db.User, attributes: ['displayName'] }],
            order: [['createdAt', 'DESC']]
        }).then(function (articles) {
            res.json(articles);
        }).catch(function (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    };
    ;
    ArticlesController.prototype.articleByID = function (req, res, next, id) {
        Article.find({
            where: { id: id },
            include: [{ model: db.User, attributes: ['displayName'] }]
        }).then(function (article) {
            if (!article) {
                return res.status(404).send({
                    message: 'Article not found'
                });
            }
            req.article = article;
            next();
        }).catch(function (err) {
            return next(err);
        });
    };
    ;
    ArticlesController.prototype.hasAuthorization = function (req, res, next) {
        if (req.article.UserId !== req.user.id) {
            return res.status(403).send({
                message: 'User is not authorized'
            });
        }
        next();
    };
    ;
    return ArticlesController;
})();
module.exports = new ArticlesController();
