/* eslint-disable no-console */
import pool from './dbPool';
import dbErrorMessage from './dbErrorMessage';

class Database {
  constructor(tableName = '') {
    this._tableName = tableName;
    this.queryDB = pool.queryDB;
    this.dbErrorMessage = dbErrorMessage;
  }

  async create(reqBody = {}) {
    let columns = '';
    let templates = '';
    const values = [];
    Object.keys(reqBody).forEach((propName, idx) => {
      columns += idx > 0 ? `, "${propName}"` : `"${propName}"`;
      templates += idx > 0 ? `, $${idx + 1}` : `$${idx + 1}`;
      values.push(reqBody[propName].toString().toLowerCase());
    });
    const queryString = `INSERT INTO ${this._tableName}(${columns})
      VALUES(${templates}) RETURNING *;`;

    try {
      const { rows } = await this.queryDB(queryString, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      if (err.code === '23505') throw this.dbErrorMessage(err);
      throw this.dbErrorMessage();
    }
  }

  async getAll() {
    const queryString = `SELECT *  FROM ${this._tableName};`;
    try {
      const { rows } = await this.queryDB(queryString);
      return rows;
    } catch (err) {
      console.error(err);
      throw this.dbErrorMessage();
    }
  }

  async getOne(idString) {
    const id = parseInt(Number(idString), 10);
    if (!id) return null;
    const queryString = `SELECT * FROM ${this._tableName} WHERE id=$1;`;
    try {
      const { rows } = await this.queryDB(queryString, [id]);
      return rows[0];
    } catch (err) {
      console.log(err);
      throw this.dbErrorMessage();
    }
  }

  async delete(idString) {
    const id = parseInt(Number(idString), 10);
    if (!id) return null;
    const queryString = `DELETE FROM ${this._tableName} WHERE id=$1 RETURNING *;`;
    try {
      const { rows } = await this.queryDB(queryString, [id]);
      return rows[0];
    } catch (err) {
      console.log(err);
      throw this.dbErrorMessage();
    }
  }
}

export default Database;
