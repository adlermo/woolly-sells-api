import { Request, Response } from 'express';
import pool from '../common/postgres-connector';

class UsersController {
  public async getAll(req: Request, res: Response) {
    console.info(`USERS -> GET  | Fetching users list`);

    try {
      const client = await pool.connect();

      const sql = 'SELECT * FROM users';
      const { rows } = await client.query(sql);

      const users = rows;

      client.release();

      res.send(users);

      console.info(`USERS -> GET  | Succesfully fetched!`);
    } catch (error) {
      console.error(`USERS -> GET  | Failed fetching!`);
      res.status(400).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    // TODO validate mandatory creation params

    console.info(`USERS -> POST | Creating user ${name}`);

    try {
      const client = await pool.connect();

      const sql = `INSERT INTO users(id_user, name, email, passw) VALUES(nextval('users_sequence'),$1,$2,$3);`;
      const values = [name, email, password];

      let result = await client.query(sql, values);

      client.release();

      if (result.command != 'INSERT')
        throw Error("Couldn't save user to database, please try again latter!");

      res.status(201).send();

      console.info(`USERS -> POST | Succesfully created!`);
    } catch (error) {
      console.error(`USERS -> POST | Failed creating!`);
      res.status(400).send(error);
    }
  }
}

export default UsersController;
