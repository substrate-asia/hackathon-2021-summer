import Router from 'koa-router';
import { getArgv } from '../../argv';
import { retiveContracts } from '../../contract';
import { router } from './router';
import { TestParams } from '../../common';

const userRouter = new Router();

userRouter.get('/', async (ctx, next) => {
  const contracts = await retiveContracts();
  const argv = getArgv();
  const body: TestParams = {
    endpoint: argv.endpoint,
    contracts: contracts,
    mnemonics: argv.mnemonics || [],
  };

  ctx.body = body;
  next();
});

router.use('/config', userRouter.routes())
  .use(userRouter.allowedMethods());
