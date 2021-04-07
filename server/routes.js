//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import snipcartRouter from './api/controllers/snipcart/router';
import cloudprntRouter from "./api/controllers/cloudprnt/router";

export default function routes(app) {
  app.use('/api/v1/snipcart', snipcartRouter);
  app.use('/api/v1/cloudprnt', cloudprntRouter);
}
