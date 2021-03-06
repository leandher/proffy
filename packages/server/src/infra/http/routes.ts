import { Router } from 'express';

import classRouter from '@modules/classes/infra/http/routes';
import connectionRouter from '@modules/connections/infra/http/routes';
import userRouter from '@modules/users/infra/http/routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/connections', connectionRouter);
routes.use('/classes', classRouter);

export default routes;
