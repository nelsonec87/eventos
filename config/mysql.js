var Sequelize = require('sequelize'),
	fs = require('fs'),
	path = require('path'),
	config = require('./config');


var db = {};

var sequelize = new Sequelize(config.db.db, config.db.user, config.db.pass, { logging: false, host: config.db.host, "dialect": "mysql" });

fs
	.readdirSync(__dirname + '/../app/models')
	.filter(function (file) {
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
	.forEach(function (file) {
	var model = sequelize["import"](path.join(__dirname + '/../app/models', file));
	db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
    return sequelize.sync(/*{ force: true }*/).catch(function(err){
        if(err)
            console.error('Could not connect to MySQL!', err);
    });
})
.then(function(){
    sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
});

module.exports = db;