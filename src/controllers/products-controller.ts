import { Request, Response } from 'express';
import pool from '../common/postgres-connector';

class ProductsController {
  public async getAll(req: Request, res: Response) {
    console.info(`PRODUCTS -> GET | Fetching products list`);

    try {
      const client = await pool.connect();

      const sql = 'SELECT * FROM products';
      const { rows } = await client.query(sql);
      const products = rows;

      client.release();

      res.send(products);
      console.info(`PRODUCTS -> GET | Succesfully fetched!`);
    } catch (error) {
      console.error(`PRODUCTS -> GET | Failed fetching!`);
      res.status(400).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    const { user_id, name, description, price } = req.body;

    console.info(
      `PRODUCTS -> POST | Creating product ${JSON.stringify(
        req.body
      )} to user ${user_id}`
    );

    try {
      const client = await pool.connect();

      const sql = `INSERT INTO products(id_product, user_id, name, description, price, published_at) VALUES(nextval('products_sequence'),$1,$2,$3,$4,$5);`;
      const values = [user_id, name, description, price, new Date()];

      let result = await client.query(sql, values);

      client.release();

      if (result.command != 'INSERT')
        throw Error(
          'Could not save product to database, please try again latter!'
        );

      res.status(201).send();

      console.info(`PRODUCTS -> POST | Succesfully created!`);
    } catch (error) {
      console.error(`PRODUCTS -> POST | Failed creating!`);
      res.status(400).send(error);
    }
  }
}

export default ProductsController;
