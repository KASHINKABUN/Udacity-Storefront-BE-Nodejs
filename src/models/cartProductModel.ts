import client from '../database';
import { CART } from '../type';
const table_name = 'cart_product_table';

export class CartProductModel {
  async getCartProduct(cart: CART): Promise<CART> {
    try {
      const sql = `SELECT product_number, product_id FROM ${table_name} WHERE cart_id=($1) AND product_id=($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [cart.id, cart.product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create cart product ${error}`);
    }
  }

  async createCartProduct(cart: CART): Promise<CART> {
    try {
      const sql = `INSERT INTO ${table_name} (cart_id, product_id, product_number) VALUES($1, $2, $3) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        cart.id,
        cart.product_id,
        cart.product_number,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create cart product ${error}`);
    }
  }

  async updateCartProduct(cart: CART): Promise<CART> {
    try {
      const sql = `UPDATE ${table_name} SET product_number=($1) WHERE product_id=($2) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        cart.product_number,
        cart.product_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create cart product ${error}`);
    }
  }

  async deleteCartProduct(cart: CART): Promise<CART> {
    try {
      const sql = `DELETE FROM ${table_name} WHERE cart_id=($1) AND product_id=($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [cart.id, cart.product_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete cart product ${error}`);
    }
  }

  async deleteCartProducts(id: number): Promise<CART> {
    try {
      const sql = `DELETE FROM ${table_name} WHERE cart_id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete all cart products ${error}`);
    }
  }
}
