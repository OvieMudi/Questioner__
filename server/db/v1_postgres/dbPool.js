import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DB_URL,
});

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
