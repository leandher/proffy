import express from 'express';

import { createClassController } from '@modules/classes/useCases/createClass';
import { findClassesController } from '@modules/classes/useCases/findClasses';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const classRouter = express.Router();

classRouter.use(ensureAuthenticated);

classRouter.get('/', (request, response) => findClassesController.handle(request, response));

classRouter.post('/', (request, response) => createClassController.handle(request, response));

export default classRouter;
