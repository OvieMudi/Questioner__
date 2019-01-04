"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../../../db/v1/db"));

var _usersController = require("../controllers/usersController");

var _meetupsController = require("../controllers/meetupsController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var questionsDB = _db.default.questions;

var Questions =
/*#__PURE__*/
function () {
  function Questions() {
    _classCallCheck(this, Questions);
  }

  _createClass(Questions, null, [{
    key: "createQuestion",

    /**
     * Create question and push to db
     * @param {Object} data - question input
     * @returns {Object} - on success
     * @throws {Error} - on failure
     */
    value: function createQuestion(data) {
      var meetupIdString = data.meetup,
          title = data.title,
          body = data.body;
      var meetupId = parseInt(meetupIdString, 10);

      var foundMeetup = _db.default.meetups.find(function (meetup) {
        return meetup.id === meetupId;
      });

      if (!foundMeetup) throw new Error('meetup not found');
      if (!title || title.length < 10) throw new Error('invalid input');
      if (!_usersController.currentUser) throw new Error('create account/login first');
      var question = {
        id: parseInt(Math.random() * 1000000, 10),
        createdOn: new Date(),
        createdBy: _usersController.currentUser.id,
        meetup: meetupId || _meetupsController.currentMeetup.id
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

  }, {
    key: "getQuestions",
    value: function getQuestions() {
      return questionsDB;
    }
    /**
     * Get a question in db
     * @param {Object} idString - question input
     * @returns {Object} - on success
     * @returns {undefined} - on failure
     */

  }, {
    key: "getQuestion",
    value: function getQuestion(idString) {
      var id = parseInt(idString, 10);
      var question = questionsDB.find(function (obj) {
        return obj.id === id;
      });
      return question;
    }
    /**
     * Update existing question and push to db
     * @param {Object} idString - question input
     * @param {Object} data - question input
     * @returns {Object} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "updateQuestion",
    value: function updateQuestion(idString, data) {
      var id = parseInt(idString, 10);
      var title = data.title,
          body = data.body;
      if (!title) throw new Error('invalid input');
      var question = questionsDB.find(function (obj) {
        return obj.id === id;
      });
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

  }, {
    key: "deleteQuestion",
    value: function deleteQuestion(idString) {
      var id = parseInt(idString, 10);
      var deleted = questionsDB.find(function (question, index) {
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

  }, {
    key: "upvoteQuestion",
    value: function upvoteQuestion(idString) {
      var id = parseInt(idString, 10);
      var question = questionsDB.find(function (obj) {
        return obj.id === id;
      });
      question.votes += 1;
      return question;
    }
    /**
     * Decrement the votes of an existing question
     * @param {Object} idString - question input
     * @returns {Object} - on success
     * @returns {undefined} - on failure
     */

  }, {
    key: "downvoteQuestion",
    value: function downvoteQuestion(idString) {
      var id = parseInt(idString, 10);
      var question = questionsDB.find(function (obj) {
        return obj.id === id;
      });
      question.votes -= 1;
      return question;
    }
  }]);

  return Questions;
}();

var _default = Questions;
exports.default = _default;
//# sourceMappingURL=questions.js.map