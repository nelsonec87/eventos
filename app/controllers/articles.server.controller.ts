///<reference path="../../typings/node/node.d.ts" />
///<reference path="../../typings/sequelize/sequelize.d.ts" />
///<reference path="../../typings/express/express.d.ts" />
 
import errorHandler = require('./errors.server.controller')
import db = require('../../config/mysql')
import _ = require('lodash')
import ArticleTS = require("../models/article")
import xp = require('express')

var Article: ArticleTS.Model = db.Article;

interface ReqArticle extends xp.Request {
	article?: ArticleTS.Instance;
}

class ArticlesController {

	/**
	 * Create a article
	 */
	create(req: ReqArticle, res: xp.Response) {
		var article = Article.build(req.body);
		article.UserId = req.user.id;

		article.save().then(() => {
			res.json(article);
		}).catch((err: Error) => {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
	}

	/**
	 * Show the current article
	 */
	read(req: ReqArticle, res: xp.Response) {
		res.json(req.article);
	}

	/**
	 * Update a article
	 */
	update(req: ReqArticle, res: xp.Response) {
		var article = req.article;
		article = <ArticleTS.Instance>_.extend(article, req.body);

		article.save().then(() => {
			res.json(article);
		}).catch((err: Error) => {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
	}

	/**
	 * Delete an article
	 */
	delete(req: ReqArticle, res: xp.Response) {
		var article = req.article;

		article.destroy().then(() => {
			res.json(article);
		}).catch((err: Error) => {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
	};

	/**
	 * List of Articles
	 */
	list(req: ReqArticle, res: xp.Response) {
		Article.findAll({
			include: [{ model: db.User, attributes: ['displayName'] }],
			order: [['createdAt', 'DESC']]
		}).then((articles: ArticleTS.Instance[]) => {
			res.json(articles);
		}).catch((err: Error) => {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		});
	};

	/**
	 * Article middleware
	 */
	articleByID(req: ReqArticle, res: xp.Response, next: (err?: Error) => void, id: number) {
		Article.find({
			where: { id: id },
			include: [{ model: db.User, attributes: ['displayName'] }]
		}).then((article: ArticleTS.Instance) => {
			if (!article) {
				return res.status(404).send({
					message: 'Article not found'
				});
			}
			req.article = article;
			next();
		}).catch((err: Error) => {
			return next(err);
		});
	};

	/**
	 * Article authorization middleware
	 */
	hasAuthorization(req: ReqArticle, res: xp.Response, next: (err?: Error) => void) {
		if (req.article.UserId !== req.user.id) {
			return res.status(403).send({
				message: 'User is not authorized'
			});
		}
		next();
	};

}

export = new ArticlesController();