/* eslint-disable no-console */
/* import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

const users = {
  pool: new Pool({
    connectionString: DB_URL,
  }),

  query(queryString = '', params = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(queryString, params)
        .then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
    });
  },

  dbErrorMessage(error) {
    if (!error) return new Error('Oops! Something weird happened.');
    return new Error(error.detail);
  },

  async create(reqBody) {
    const queryString = `INSERT INTO users(
      firstname, lastname, othername, email, "phoneNumber", username
      ) VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;`;
    const {
      firstname, lastname, othername, email, phoneNumber, username,
    } = reqBody;
    const values = [
      firstname,
      lastname,
      othername,
      email,
      phoneNumber,
      username,
    ];

    try {
      const { rows } = await this.query(queryString, values);
      return rows[0];
    } catch (err) {
      console.error(err);
      if (err.code === '23505') throw this.dbErrorMessage(err);
      throw this.dbErrorMessage();
    }
  },

  async getall() {
    const queryString = 'SELECT * FROM users;';
    try {
      const { rows } = await this.query(queryString);
      return rows;
    } catch (err) {
      console.error(err);
      throw this.dbErrorMessage();
    }
  },


  async getOne(idString = '') {
    const id = parseInt(Number(idString), 10);
    if (!id) return null;
    const queryString = 'SELECT * FROM users WHERE id=$1;';
    try {
      const { rows } = await this.query(queryString, [id]);
      return rows[0];
    } catch (err) {
      console.log(err);
      throw this.dbErrorMessage();
    }
  },

  async update(idString, reqBody) {
    const found = await this.getOne(idString);
    if (!found) return null;
    const queryString = `UPDATE users
      SET firstname=$1, lastname=$2, othername=$3, "phoneNumber"=$4
      WHERE id=$5
      RETURNING *;`;

    // const id = parseInt(Number(idString), 10);
    const values = this.createValues(reqBody, found, idString);

    try {
      const { rows } = await this.query(queryString, values);
      return rows[0];
    } catch (err) {
      console.error(err);
      if (err.code === '23505') throw this.dbErrorMessage(err);
      throw this.dbErrorMessage();
    }
  },

  async delete(idString) {
    const id = parseInt(Number(idString), 10);
    if (!id) return null;
    const queryString = 'DELETE FROM users WHERE id=$1 RETURNING *;';
    try {
      const { rows } = await this.query(queryString, [id]);
      return rows[0];
    } catch (err) {
      console.log(err);
      throw this.dbErrorMessage();
    }
  },

  createValues(reqBody, user, idString) {
    return [
      reqBody.firstname || user.firstname,
      reqBody.lastname || user.lastname,
      reqBody.othername || user.othername,
      reqBody.phoneNumber || user.phoneNumber,
      idString,
    ];
  },
};

export default users;
 */
import Database from '../../../db/v1_postgres/model';

class Users extends Database {
  constructor(tableName = 'users') {
    super(tableName);
  }

  async update(idString, reqBody) {
    const foundUser = await this.getOne(idString);
    if (!foundUser) return null;
    const queryString = `UPDATE users
      SET firstname=$1, lastname=$2, othername=$3, "phoneNumber"=$4
      WHERE id=$5
      RETURNING *;`;

    // const id = parseInt(Number(idString), 10);
    const values = this.createValues(reqBody, foundUser, idString);

    try {
      const { rows } = await this.queryDB(queryString, values.map(prop => prop
        .toString().toLowerCase()));
      return rows[0];
    } catch (err) {
      console.error(err);
      if (err.code === '23505') throw this.dbErrorMessage(err);
      throw this.dbErrorMessage();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createValues(reqBody, user, idString) {
    return [
      reqBody.firstname || user.firstname,
      reqBody.lastname || user.lastname,
      reqBody.othername || user.othername,
      reqBody.phoneNumber || user.phoneNumber,
      idString,
    ];
  }
}

export default new Users();
