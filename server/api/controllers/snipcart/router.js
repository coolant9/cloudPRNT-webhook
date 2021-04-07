//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post("/", controller.webhook);