//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post("/", controller.poll)
  .get("/", controller.retrieve)
  .delete("/", controller.complete);