/* eslint-disable no-console */
/* eslint no-param-reassign: ["error", { "props": false }] */
import pool from './dbConnection';
import dbErrorMessage from './dbErrorMessage';
import formatToArray from '../../api/v1_postgres/helpers/stringToPsqlArray';

class DatabaseModel {
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
      if (propName === 'images' || propName === 'tags') {
        reqBody[propName] = formatToArray(reqBody[propName]);
      }
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
      throw this.dbErrorMessage(err);
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

export default DatabaseModel;