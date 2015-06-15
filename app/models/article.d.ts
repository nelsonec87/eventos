import sequelize = require('sequelize')

export interface Pojo
{
    id:number;
    title?:string;
    content?:string;
	UserId?:number
}

export interface Instance extends sequelize.Instance<Instance, Pojo>, Pojo {}

export interface Model extends sequelize.Model<Instance, Pojo>{}


