"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _questions = _interopRequireDefault(require("../helpers/questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var questionsController =
/*#__PURE__*/
function () {
  function questionsController() {
    _classCallCheck(this, questionsController);
  }

  _createClass(questionsController, null, [{
    key: "postQuestion",

    /**
     * Create new question object in db
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */
    value: function postQuestion(req, res) {
      try {
        var question = _questions.default.createQuestion(req.body);

        return res.status(201).json({
          status: 201,
          data: [question]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }
    }
    /**
     * Get all questions objects in db
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "getQuestions",
    value: function getQuestions(req, res) {
      var questions = _questions.default.getQuestions();

      return res.status(200).json({
        status: 200,
        data: questions
      });
    }
    /**
     * Get one question objects in db
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "getQuestion",
    value: function getQuestion(req, res) {
      var question = _questions.default.getQuestion(req.params.id);

      if (!question) {
        return res.status(404).json({
          status: 200,
          error: 'question does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [question]
      });
    }
    /**
     * Update a question object in database using a unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "updateQuestion",
    value: function updateQuestion(req, res) {
      try {
        var updatedQuestion = _questions.default.updateQuestion(req.params.id, req.body);

        if (!updatedQuestion) {
          return res.status(404).json({
            status: 404,
            error: 'question does not exist'
          });
        }

        return res.status(200).json({
          status: 200,
          data: [updatedQuestion]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }
    }
    /**
     * Delete a question object from db
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "deleteQuestion",
    value: function deleteQuestion(req, res) {
      var deleted = _questions.default.deleteQuestion(req.params.id);

      if (!deleted) {
        res.status(404).json({
          status: 404,
          error: 'question does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'question deleted'
      });
    }
    /**
     * Increment votes of a question object
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "upvoteQuestion",
    value: function upvoteQuestion(req, res) {
      var upvoted = _questions.default.upvoteQuestion(req.params.id);

      if (!upvoted) {
        return res.status(404).json({
          status: 404,
          error: 'question does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [upvoted]
      });
    }
    /**
       * Decrement votes of a question object
       * @param {Object} req - server request
       * @param {Object} res - server response
       * @returns {JSON} - custom server response with error/success
       */

  }, {
    key: "downvoteQuestion",
    value: function downvoteQuestion(req, res) {
      var downvoted = _questions.default.downvoteQuestion(req.params.id);

      if (!downvoted) {
        return res.status(404).json({
          status: 404,
          error: 'question does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [downvoted]
      });
    }
  }]);

  return questionsController;
}();

var _default = questionsController;
exports.default = _default;
//# sourceMappingURL=questionsController.js.map