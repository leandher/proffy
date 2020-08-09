import express from 'express';

import { getTotalConnectionsController } from '@modules/connections/useCases/getTotalConnections';
import { createConnectionController } from '@modules/connections/useCases/createConnection';

const connectionRouter = express.Router();

connectionRouter.get('/', (request, response) =>
  getTotalConnectionsController.handle(request, response)
);

connectionRouter.post('/', (request, response) =>
  createConnectionController.handle(request, response)
);

export default connectionRouter;
