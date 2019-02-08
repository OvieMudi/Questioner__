import DatabaseModel from '../../../db/v1_postgres/model';
import psqlArray from '../helpers/stringToPsqlArray';

class MeetupsModel extends DatabaseModel {
  async getUpcoming() {
    const queryString = 'SELECT *  FROM meetups WHERE "happeningOn" > NOW();';
    try {
      const { rows } = await this.queryDB(queryString);
      return rows;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw this.dbErrorMessage();
    }
  }

  async update(idString, reqBody) {
    const foundMeetup = await this.getOne(idString);
    if (!foundMeetup) return null;

    const queryString = `UPDATE meetups
      SET location=$1, images=$2, topic=$3, "happeningOn"=$4, tags=$5
      WHERE id=$6
      RETURNING *;`;

    const images = reqBody.images ? psqlArray(reqBody.images.split(/,\s/))
      : psqlArray(foundMeetup.images.join());
    const tags = reqBody.tags ? psqlArray(reqBody.tags.split(/,\s/))
      : psqlArray(foundMeetup.tags.join());

    const values = [
      reqBody.location || foundMeetup.location,
      images,
      reqBody.topic || foundMeetup.topic,
      reqBody.happeningOn || foundMeetup.happeningOn,
      tags,
      idString,
    ];

    try {
      const { rows } = await this.queryDB(queryString, values);
      return rows[0];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw this.dbErrorMessage(err);
    }
  }

  async createRsvp(req) {
    const meetupIdString = req.params.id;
    const queryString = `INSERT INTO rsvps(
      "meetup", "user", "response"
    ) VALUES(
      $1, $2, $3
    ) RETURNING *;`;
    const values = [meetupIdString, 1, req.body.response];
    try {
      const { rows } = await this.queryDB(queryString, values);
      const meetup = await this.getOne(meetupIdString);
      return {
        meetup: rows[0].meetup,
        topic: meetup.topic,
        status: rows[0].response,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      throw this.dbErrorMessage(err);
    }
  }

  async getAllRsvps() {
    const queryString = 'SELECT * FROM rsvps;';
    try {
      const { rows } = await this.queryDB(queryString);
      return rows;
    } catch (err) {
      console.error(err);
      throw this.dbErrorMessage(err);
    }
  }
}

export default new MeetupsModel('meetups');
