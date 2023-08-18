import client from '../database';
import { CART, PRODUCT } from '../type';
const table_name = 'cart_table';
const product_table = 'product_table';
const cart_product_table = 'cart_product_table';
const user_table = 'user_table';

export class CartModel {
  async index(): Promise<CART[]> {
    try {
      const sql = `SELECT * FROM ${table_name}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get cart list ${error}`);
    }
  }

  async createCart(cart: CART): Promise<CART> {
    try {
      const sql = `INSERT INTO ${table_name} (user_id) VALUES($1) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [cart.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create cart ${error}`);
    }
  }

  async getProductById(user_id: number): Promise<PRODUCT[]> {
    try {
      const sql = `
      SELECT ${product_table}.id, ${product_table}.product_name, ${product_table}.product_description, ${product_table}.product_image, ${product_table}.first_price, ${product_table}.discount_price, ${cart_product_table}.product_number, ${table_name}.id as cart_id
      FROM ${table_name}
      INNER JOIN ${user_table} ON ${user_table}.id=($1) 
      INNER JOIN ${cart_product_table} ON ${cart_product_table}.cart_id=${table_name}.id
      INNER JOIN ${product_table} ON ${cart_product_table}.product_id=${product_table}.id 
      `;
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCartByUserId(user_id: number): Promise<CART> {
    try {
      const sql = `SELECT * FROM ${table_name} WHERE user_id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateCart(cart: CART): Promise<CART> {
    try {
      const sql = `UPDATE ${table_name} SET product_number=($1) WHERE id=($2) AND user_id=($3) AND product_id=($4)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        cart.product_number,
        cart.id,
        cart.user_id,
        cart.product_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update cart information ${error}`);
    }
  }

  async deleteCart(id: number): Promise<CART> {
    try {
      const sql = `DELETE FROM ${table_name} WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete cart information ${error}`);
    }
  }
}
