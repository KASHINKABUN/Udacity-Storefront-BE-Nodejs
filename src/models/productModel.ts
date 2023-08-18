import client from '../database';
import { PRODUCT } from '../type';

const table_name = 'product_table';

export class ProductModel {
  async index(): Promise<PRODUCT[]> {
    try {
      const sql = `SELECT * FROM ${table_name}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get product list ${error}`);
    }
  }

  async show(id: number): Promise<PRODUCT> {
    try {
      const sql = `SELECT * FROM ${table_name} WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }

  async createProduct(product: PRODUCT): Promise<PRODUCT> {
    try {
      const sql = `INSERT INTO ${table_name} (product_name, first_price, discount_price, product_description, product_image) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.product_name,
        product.first_price,
        product.discount_price,
        product.product_description,
        product.product_image,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create products ${error}`);
    }
  }
}
