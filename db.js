/* eslint-disable no-console */
import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const DB_URL = process.env.DATABASE_URL;

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
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS meetups;
    DROP TABLE IF EXISTS questions;
    DROP TABLE IF EXISTS rsvps;

    CREATE TABLE IF NOT EXISTS
      users(
        "id" SERIAL PRIMARY KEY,
        "firstname" VARCHAR(128) NOT NULL,
        "lastname" VARCHAR(128) NOT NULL,
        "othername" VARCHAR(128),
        "email" VARCHAR(128) NOT NULL,
        "username" VARCHAR(128) NOT NULL,
        "phoneNumber" VARCHAR(128) NOT NULL,
        "registered" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "isAdmin" BOOLEAN NOT NULL
      );
    
    CREATE TABLE IF NOT EXISTS
      meetups(
        "id" SERIAL PRIMARY KEY,
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "location" VARCHAR(128) NOT NULL,
        "images" TEXT[],
        "topic" VARCHAR(128) NOT NULL,
        "happeningOn" TIMESTAMPTZ NOT NULL,
        "tags" TEXT[] NOT NULL
      );

      CREATE TABLE IF NOT EXISTS questions (
        "id" SERIAL PRIMARY KEY,
        "createdBy" INT NOT NULL,
        "meetup" INT NOT NULL,
        "authorName" varchar(60) NOT NULL,
        "title" varchar(100) NOT NULL,
        "body" varchar(1000) NOT NULL,
        "upVoters" TEXT[],
        "downVoters" TEXT[],
        "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedOn" TIMESTAMPTZ
      );

      CREATE TABLE IF NOT EXISTS rsvps(
        "id" SERIAL PRIMARY KEY,
        "meetup" INT NOT NULL,
        "user" INT NOT NULL,
        "response" VARCHAR(6) NOT NULL
      );`;

    await this.pool.query(queryCommand)
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
      firstname, lastname, othername, email, "phoneNumber", username, "isAdmin"
      ) VALUES('Anakin', 'Skywalker', 'Ani', 'anakinskywalker@republic.com', 123123123, 'Skywalker', true
      );
      INSERT INTO users(
      firstname, lastname, othername, email, "phoneNumber", username, "isAdmin"
        ) VALUES('Bobba', 'Fet', 'Lucky', 'bobbafet@republic.com', 122122122, 'bobba', false
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
    await this.pool.query(queryCommand)
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
