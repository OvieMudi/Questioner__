import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const dbENV = {
  development: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  deployment: '',
  production: '',
};
const nodeENV = process.env.NODE_ENV;
const DB_URL = dbENV[nodeENV];

const pool = new Pool({
  connectionString: DB_URL,
});

export { DB_URL };
export default {
  queryDB(queryString = '', params = []) {
    return new Promise((resolve, reject) => {
      pool.query(queryString, params)
        .then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};
