import Router from 'koa-router';
import { router } from './router';
import './config';
import './book';

const apiRouter = new Router();

apiRouter.use('/api', router.routes()).use(router.allowedMethods())

export { apiRouter };