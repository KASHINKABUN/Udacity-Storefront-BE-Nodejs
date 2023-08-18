import client from '../database';
import { USER } from '../type';
import bcrypt from 'bcrypt';

const table_name = 'user_table';

export class UserModel {
  async getUserByUsername(username: string): Promise<USER> {
    const sql = `SELECT * FROM ${table_name} WHERE username=($1)`;
    const conn = await client.connect();
    const result = await conn.query(sql, [username]);
    conn.release();
    return result.rows[0];
  }

  async index(): Promise<USER[]> {
    try {
      const sql = `SELECT * FROM ${table_name}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get user information ${error}`);
    }
  }

  async show(id: string): Promise<USER> {
    try {
      const sql = `SELECT * FROM ${table_name} WHERE id=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user information ${error}`);
    }
  }

  async create(user: USER): Promise<USER> {
    try {
      const sql = `INSERT INTO ${table_name} (username, pass_word, fullname) VALUES($1, $2, $3) RETURNING *`;
      const conn = await client.connect();
      const hashPassword = bcrypt.hashSync(
        user.pass_word,
        parseInt(process.env.SALT_ROUNDS as string),
      );
      const result = await conn.query(sql, [
        user.username,
        hashPassword,
        user.fullname,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create new user ${error}`);
    }
  }

  async delete(username: string): Promise<unknown> {
    try {
      const userFound = await this.getUserByUsername(username);
      if (userFound) {
        const sql = `DELETE FROM ${table_name} WHERE username=($1)`;
        const conn = await client.connect();
        const result = await conn.query(sql, [username]);
        conn.release();
        return result.rows[0];
      }
      throw new Error('User name was not found');
    } catch (error) {
      throw new Error(`Cannot delete user ${error}`);
    }
  }

  async updateFullName(user: USER): Promise<USER> {
    try {
      const sql = `UPDATE ${table_name} SET fullname=($1) WHERE username=($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [user.fullname, user.username]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update user information ${error}`);
    }
  }

  async authenticate(user: USER): Promise<USER> {
    try {
      const sql = `SELECT * FROM ${table_name} WHERE username=($1)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [user.username]);
      conn.release();
      if (result.rows.length) {
        const rsUser = result.rows[0];
        if (bcrypt.compareSync(user.pass_word, rsUser.pass_word)) {
          return rsUser;
        } else {
          throw new Error('Password is incorrect');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(`Cannot authenticate user information ${error}`);
    }
  }

  async changePassword(user: {
    username: string;
    old_password: string;
    new_password: string;
  }): Promise<unknown> {
    const userFound = await this.authenticate({
      username: user.username,
      pass_word: user.old_password,
    } as USER);
    if (userFound) {
      try {
        const sql = `UPDATE ${table_name} SET pass_word=($1) WHERE username=($2)`;
        const hashPassword = bcrypt.hashSync(
          user.new_password,
          parseInt(process.env.SALT_ROUNDS as string),
        );
        const conn = await client.connect();
        const result = await conn.query(sql, [hashPassword, user.username]);
        return result.rows[0];
      } catch (error) {
        throw new Error(`Cannot update user password ${error}`);
      }
    }
  }
}
