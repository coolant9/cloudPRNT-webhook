//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import './common/env';
import Server from './common/server';
import routes from './routes';

const router = new Server().router(routes);
export default router.listen(process.env.PORT);
