import db from '../../../db/v1/db';
import { currentUser } from '../controllers/usersController';
import { currentMeetup } from '../controllers/meetupsController';

const questionsDB = db.questions;


class Questions {
  /**
   * Create question and push to db
   * @param {Object} data - question input
   * @returns {Object} - on success
   * @throws {Error} - on failure
   */
  static createQuestion(data) {
    const { meetup: meetupIdString, title, body } = data;
    const meetupId = parseInt(meetupIdString, 10);
    const foundMeetup = db.meetups.find(meetup => meetup.id === meetupId);
    if (!foundMeetup) throw new Error('meetup not found');

    if (!title || title.length < 10) throw new Error('invalid input');

    if (!currentUser) throw new Error('create account/login first');

    const question = {
      id: parseInt(Math.random() * 1000000, 10),
      createdOn: new Date(),
      createdBy: currentUser.id,
      meetup: meetupId || currentMeetup.id,
    };

    question.title = title;
    question.body = body;
    question.votes = 0;
    questionsDB.push(question);
    return question;
  }

  /**
   * Get all questions in db
   * @param {Object} idString - question input
   * @returns {Array} - all question objects in db
   */
  static getQuestions() {
    return questionsDB;
  }

  /**
   * Get a question in db
   * @param {Object} idString - question input
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static getQuestion(idString) {
    const id = parseInt(idString, 10);
    const question = questionsDB.find(obj => obj.id === id);
    return question;
  }

  /**
   * Update existing question and push to db
   * @param {Object} idString - question input
   * @param {Object} data - question input
   * @returns {Object} - on success
   * @throws {Error} - on failure
   */
  static updateQuestion(idString, data) {
    const id = parseInt(idString, 10);
    const { title, body } = data;
    if (!title) throw new Error('invalid input');

    const question = questionsDB.find(obj => obj.id === id);
    question.title = title;
    question.body = body;
    return question;
  }

  /**
   * delete existing question
   * @param {Object} idString - question input
   * @param {Object} data - question input
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static deleteQuestion(idString) {
    const id = parseInt(idString, 10);
    const deleted = questionsDB.find((question, index) => {
      if (question.id === id) questionsDB.splice(index, 1);
      return question.id === id;
    });

    return deleted;
  }

  /**
   * Increment the votes of an existing question
   * @param {Object} idString - question input
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static upvoteQuestion(idString) {
    const id = parseInt(idString, 10);
    const question = questionsDB.find(obj => obj.id === id);
    question.votes += 1;
    return question;
  }

  /**
   * Decrement the votes of an existing question
   * @param {Object} idString - question input
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static downvoteQuestion(idString) {
    const id = parseInt(idString, 10);
    const question = questionsDB.find(obj => obj.id === id);
    question.votes -= 1;
    return question;
  }
}

export default Questions;
