/* eslint-disable no-console */
import Database from '../../../db/v1_postgres/model';

class UsersModel extends Database {
  constructor(tableName = 'users') {
    super(tableName);
  }

  async create(reqBody = {}) {
    const { columns, templates, values } = this.createEntries(reqBody);
    const createUserQuery = `INSERT INTO users(${columns})
      VALUES(${templates})
      RETURNING *;
    `;
    try {
      const { rows } = await this.queryDB(createUserQuery, values);
      const row = rows[0];
      return {
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        othername: row.othername,
        email: row.email,
        username: row.username,
        phoneNumber: row.phoneNumber,
        registered: row.registered,
        isAdmin: row.isAdmin,
      };
    } catch (err) {
      throw this.dbErrorMessage(err);
    }
  }

  async getOneUser(username = '') {
    const queryString = `SELECT * FROM ${this._tableName} WHERE username='${username}';`;
    try {
      const { rows } = await this.queryDB(queryString);
      return rows[0];
    } catch (err) {
      console.log(err);
      throw this.dbErrorMessage();
    }
  }

  async updateUser(idString, reqBody) {
    const foundUser = await this.getOne(idString);
    if (!foundUser) return null;
    const queryString = `UPDATE users
      SET firstname=$1, lastname=$2, othername=$3, "phoneNumber"=$4
      WHERE id=$5
      RETURNING *;`;

    const values = this.createValues(reqBody, foundUser, idString);

    try {
      const { rows } = await this.queryDB(
        queryString,
        values.map(prop => prop.toString().toLowerCase()),
      );
      return rows[0];
    } catch (err) {
      console.error(err);
      throw this.dbErrorMessage(err);
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

export default new UsersModel();
