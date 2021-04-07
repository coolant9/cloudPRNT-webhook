//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import l from '../../common/logger';
import db from './order.db.service';
const flatten = require('flat').flatten;

class OrderService {
  async all() {
    l.info(`${this.constructor.name}.all()`);
    return await db.all();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  async create(order) {
    l.info(`Creating a new order ${JSON.stringify(order)}`);
    order.printStatus = "NEW";
    const x = await db.insert(order);
    return x;
    
  }

  async findNew() {
    const newOrders = await db.findOrderTypes("NEW");
    let jobId = "";
    if (newOrders.length > 0) {
      const job = await db.createJob({
        jobId: 42
      });
      l.info(`Created job ${JSON.stringify(job)}`);
      jobId = job.id;


      await newOrders.forEach(async order => {
        l.info(`Updating ${JSON.stringify(order)}`);
        const updates = {
          jobId: job.id,
          printStatus: "BATCHED"
        };
        l.info(`Updating ${JSON.stringify(order)}`);
        await db.updateOrder(order,  updates);
      });
    }
    return {
      newOrders: newOrders,
      jobToken: jobId
    }
  }

  async retrieveJobOrders(jobId) {
    const reserved = ["printStatus", "createdAt", "updatedAt", "jobId", "id", "productId"];
    const orders = await db.findOrderTypes("BATCHED");
    l.info(`${JSON.stringify(orders.length)}`);
    const lines = []
    const indent = (key) =>{
      const count = key.split('.');
      const len = count.length
      return Array(len).join(' ') +  count[len-1];
    }
    
    const ordersPrint =  orders.map(order=>{
      const olines = flatten(order.toJSON());
      console.log(olines);
      for (let key in olines){
        if((reserved.filter(r=>indent(key).indexOf(r)!=-1)).length===0){
          lines.push(`${indent(key)}: ${olines[key]}`);
        }
      }
      lines.push("***************");
    });
    return lines;
  }

  async completeProcessingBatched(){
    const orders = await db.findOrderTypes("BATCHED");
    await orders.forEach(async order => {
      l.info(`Updating ${JSON.stringify(order)}`);
      const updates = {
        printStatus: "PRINTED"
      };
      l.info(`Updating ${JSON.stringify(order)}`);
      await db.updateOrder(order,  updates);
    });
  }
}

export default new OrderService();