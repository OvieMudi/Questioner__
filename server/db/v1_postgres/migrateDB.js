/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';
import { DB_URL } from './dbConnection';

config();

const database = {
  pool: new Pool({
    connectionString: DB_URL,
  }),

  async createAllTables() {
    console.log(`CONNECTING TO DB: ${DB_URL}`);
    this.pool.on('connect', () => {
      console.log('CONNECTED TO DATABASE');
    });

    const queryCommand = `
    DROP TABLE IF EXISTS users, meetups, questions, rsvps CASCADE;

    CREATE TABLE IF NOT EXISTS
      users(
        "id" SERIAL PRIMARY KEY,
        "firstname" VARCHAR(128) NOT NULL,
        "lastname" VARCHAR(128) NOT NULL,
        "othername" VARCHAR(128),
        "email" VARCHAR(128) UNIQUE NOT NULL,
        "username" VARCHAR(128) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(128) UNIQUE NOT NULL,
        "registered" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "password" VARCHAR(128) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      );
    
    CREATE TABLE IF NOT EXISTS
      meetups(
        "id" SERIAL PRIMARY KEY,
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "location" VARCHAR(128) NOT NULL,
        "images" TEXT[],
        "topic" VARCHAR(128) NOT NULL,
        "happeningOn" TIMESTAMPTZ NOT NULL,
        "tags" TEXT[] NOT NULL
      );

      CREATE TABLE IF NOT EXISTS questions (
        "id" SERIAL PRIMARY KEY,
        "createdBy" INT REFERENCES users (id) ON DELETE CASCADE,
        "meetup" INT REFERENCES meetups (id) ON DELETE CASCADE,
        "authorName" varchar(60) NOT NULL,
        "title" varchar(100) NOT NULL,
        "body" varchar(1000) NOT NULL,
        "votes" INT DEFAULT 0,
        "upVoters" TEXT[],
        "downVoters" TEXT[],
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedOn" TIMESTAMPTZ
      );

      CREATE TABLE IF NOT EXISTS rsvps(
        "id" SERIAL PRIMARY KEY,
        "meetup" INT REFERENCES meetups (id) ON DELETE CASCADE,
        "user" INT REFERENCES users (id) ON DELETE CASCADE,
        "response" VARCHAR(8) NOT NULL
      );
      
      CREATE VIEW users_view 
        AS
        SELECT  "id", "firstname", "lastname", "othername", "email",
          "username", "phoneNumber", "registered", "isAdmin"
        FROM users;

      CREATE VIEW meetups_view 
        AS
        SELECT  * FROM meetups;

      CREATE VIEW questions_view 
        AS
        SELECT  * FROM questions;

      CREATE VIEW rsvps_view 
        AS
        SELECT  * FROM rsvps;
      `;

    await this.pool
      .query(queryCommand)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  async seedAllTables() {
    const queryCommand = `
      INSERT INTO users(
      firstname, lastname, othername, email, "phoneNumber", username, password, "isAdmin"
      ) VALUES('Anakin', 'Skywalker', 'Ani', 'anakinskywalker@republic.com', 123123123, 'Skywalkerr', 'strongpassword', true
      );
      INSERT INTO users(
      firstname, lastname, othername, email, "phoneNumber", username, password
        ) VALUES('Bobba', 'Fet', 'Lucky', 'bobbafet@republic.com', '122122122', 'bobba', 'randompassword'
      );
      
      INSERT INTO meetups(
        location, topic, "happeningOn", tags
      ) VALUES(
        'Outer Rim', 'Handling your Lightsaber right', '3016-06-22 11:10', '{lightsaber, elegant swordsmanship}'
      );
      INSERT INTO meetups(
        location, images, topic, "happeningOn", tags
      ) VALUES(
        'Felucia', '{"http://image1.jpg", "http://image2.jpg"}', 'Preserving the ecosystem and life forms', '3016-06-25 11:10', '{felucia, preservation}'
      );
      
      INSERT INTO questions(
        "createdBy", meetup, "authorName", title, body
      ) VALUES(
        2, 1, 'Bobba', 'Will there be a Lightsaber giveaway?', 'I lost my lightsaber in a bet recently, can I get another?'
      );

      INSERT INTO rsvps(
        meetup, "user", response
      ) VALUES(
        1, 2, 'yes'
      );`;

    await this.createAllTables();
    await this.pool
      .query(queryCommand)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    await this.pool.end();
  },
};

database.seedAllTables();
