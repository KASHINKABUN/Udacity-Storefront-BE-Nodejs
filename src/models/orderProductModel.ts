import client from '../database';
import { ORDER } from '../type';
const table_name = 'order_product_table';

export class OrderProductModel {
  async getOrderProduct(order: ORDER): Promise<ORDER> {
    try {
      const sql = `SELECT product_number, product_id FROM ${table_name} WHERE order_id=($1) AND product_id=($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [order.id, order.product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get order product ${error}`);
    }
  }

  async createOrderProduct(order: ORDER): Promise<ORDER> {
    try {
      const sql = `INSERT INTO ${table_name} (order_id, product_id, product_number) VALUES($1, $2, $3) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.id,
        order.product_id,
        order.product_number,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order product ${error}`);
    }
  }

  async updateOrderProduct(order: ORDER): Promise<ORDER> {
    try {
      const sql = `UPDATE ${table_name} SET product_number=($1) WHERE product_id=($2) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.product_number,
        order.product_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update order product ${error}`);
    }
  }

  async deleteOrderProduct(order: ORDER): Promise<ORDER> {
    try {
      const sql = `DELETE FROM ${table_name} WHERE order_id=($1) AND product_id=($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [order.id, order.product_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete order product ${error}`);
    }
  }
}
