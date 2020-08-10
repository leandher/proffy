import express from 'express';

import { createConnectionController } from '@modules/connections/useCases/createConnection';
import { getTotalConnectionsController } from '@modules/connections/useCases/getTotalConnections';

const connectionRouter = express.Router();

connectionRouter.get('/', (request, response) =>
  getTotalConnectionsController.handle(request, response),
);

connectionRouter.post('/', (request, response) =>
  createConnectionController.handle(request, response),
);

export default connectionRouter;
