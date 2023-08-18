import client from '../database';
import { ORDER, ORDER_RES } from '../type';
const table_name = 'order_table';
const product_table = 'product_table';
const order_product_table = 'order_product_table';
const user_table = 'user_table';

export class OrderModel {
  async index(): Promise<ORDER[]> {
    try {
      const sql = `SELECT * FROM ${table_name}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get order list ${error}`);
    }
  }

  async createOrder(order: ORDER): Promise<ORDER> {
    try {
      const sql = `INSERT INTO ${table_name} (user_id, status, description, total, method) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.user_id,
        order.status,
        order.description,
        order.total,
        order.method,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order ${error}`);
    }
  }

  async getOrderByUserId(user_id: number): Promise<ORDER[]> {
    try {
      const sql = `SELECT * FROM ${table_name} WHERE user_id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getProductById(user_id: number): Promise<ORDER_RES[]> {
    try {
      const sql = `
      SELECT ${product_table}.id, ${product_table}.product_name, ${product_table}.product_description,
      ${product_table}.product_image, ${product_table}.first_price, ${product_table}.discount_price,
      ${order_product_table}.product_number, ${table_name}.id as order_id 
      FROM ${table_name}
      INNER JOIN ${user_table} ON ${user_table}.id=($1) 
      INNER JOIN ${order_product_table} ON ${order_product_table}.order_id=${table_name}.id
      INNER JOIN ${product_table} ON ${order_product_table}.product_id=${product_table}.id
      `;
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
