import Router from 'koa-router';
import { router } from './router';
const bookRouter = new Router();

bookRouter.get('/a', async (ctx, next) => {
  ctx.body = 1;
  
  next();
});

bookRouter.get('/buy/:uuid', async (ctx, next) => {
  ctx.body = {
    a: 1,
    b: 2,
  };
  next();
});

router.use('/book', bookRouter.routes())
  .use(bookRouter.allowedMethods());
