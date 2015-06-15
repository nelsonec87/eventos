import sequelize = require('sequelize')

export interface Pojo {
    id: number;
	firstName: string;
	lastName: string;
}

export interface Instance extends sequelize.Instance<Instance, Pojo>, Pojo { }
