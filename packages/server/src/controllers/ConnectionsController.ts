import { Request, Response } from 'express';

import db from '../database/connection';

export default class ConnectionsController {
  async index(req: Request, res: Response) {
    const [total] = await db('connections').count('* as total');

    return res.json(total);
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    const trx = await db.transaction();

    try {
      await trx('connections').insert({ user_id });

      await trx.commit();

      return res.sendStatus(201);
    } catch (error) {
      await trx.rollback();
      return res
        .status(400)
        .json({ message: 'Unexpected error while creating new class' });
    }
  }
}
