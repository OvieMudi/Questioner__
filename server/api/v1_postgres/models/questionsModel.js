import Model from '../../../db/v1_postgres/model';


class QuestionsModel extends Model {
  async update(idString, reqBody) {
    const foundQuestion = await this.getOne(idString);
    if (!foundQuestion) return null;

    const queryString = `UPDATE questions
      SET title=$1, body=$2, "updatedOn"=CURRENT_TIMESTAMP
      WHERE id=$3
      RETURNING *;`;
    const values = [
      reqBody.title || foundQuestion.title,
      reqBody.body || foundQuestion.body,
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

  async upvote(idString) {
    const foundQuestion = await this.getOne(idString);
    if (!foundQuestion) return null;

    let questionVotes = foundQuestion.votes;
    questionVotes += 1;

    const queryString = `UPDATE questions
      SET votes=${questionVotes}
      RETURNING *;`;

    try {
      const { rows } = await this.queryDB(queryString);
      const {
        id, title, body, votes,
      } = rows[0];

      return {
        meetup: id,
        title,
        body,
        votes,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw this.dbErrorMessage(err);
    }
  }

  async downvote(idString) {
    const foundQuestion = await this.getOne(idString);
    if (!foundQuestion) return null;

    let questionVotes = foundQuestion.votes;
    questionVotes -= 1;

    const queryString = `UPDATE questions
      SET votes=${questionVotes}
      RETURNING *;`;

    try {
      const { rows } = await this.queryDB(queryString);
      const {
        id, title, body, votes,
      } = rows[0];

      return {
        meetup: id,
        title,
        body,
        votes,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw this.dbErrorMessage(err);
    }
  }
}

const questionsModel = new QuestionsModel('questions');

export default questionsModel;
