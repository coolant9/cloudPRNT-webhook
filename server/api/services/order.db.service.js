//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import l from '../../common/logger';

const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'db.sqlite'
// })
const sequelize = new Sequelize('postgres://vsipyxyxsvbzvd:7287047596bf53db6d60dca57b45d847296c4d1d868f203b3c0006a36fc00015@ec2-107-22-245-82.compute-1.amazonaws.com:5432/dop6rrehjvn1d?sslmode=require')
import define_models from '../../common/order';

class OrderDatabase {
    constructor(){
      const entities = define_models(sequelize);
      for (const model in entities){
        entities[model](sequelize);
      }
      sequelize.sync().then(l.info("Schema created"));
    }
    async all(){
      const orders = await sequelize.models.order.findAll();
      return orders;
    }
    async insert(order) {
      const o = await sequelize.models.order.create(order, {
        include: [
          {model: sequelize.models.product, include: [sequelize.models.option]}]
      });
      return o;
    }
    async findOrderTypes(type){
      const newOrders = await sequelize.models.order.findAll({
        where: {
          printStatus: type
        },
        include: [{model: sequelize.models.product, include: [sequelize.models.option]}]
      });
      return newOrders;
    }

    async createJob(job){
      const o = await sequelize.models.job.create(job);
      return o;
    }

    async updateOrder(orderModel, updates){
      const o = await sequelize.models.order.update(updates, {
        where: {
          id: orderModel.id
        }
      });
      return o;
    }

    async findJob(id) {
      const job = await sequelize.models.job.findByPk(id);
      return job;
    }

    async getOrdersJob(jobid) {
      const orders = await sequelize.models.order.findAll({
        where: {
          jobId: jobid
        },
        include: [{model: sequelize.models.product, include: [sequelize.models.option]}]
      });
      return orders;
    }
}


export default new OrderDatabase();