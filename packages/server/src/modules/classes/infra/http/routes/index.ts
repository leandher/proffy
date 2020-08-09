import express from 'express';

import { createClassController } from '@modules/classes/useCases/createClass';
import { findClassesController } from '@modules/classes/useCases/findClasses';

const classRouter = express.Router();

classRouter.get('/', (request, response) =>
  findClassesController.handle(request, response)
);

classRouter.post('/', (request, response) =>
  createClassController.handle(request, response)
);

export default classRouter;
