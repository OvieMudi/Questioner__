"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _questionsController = _interopRequireDefault(require("./controllers/questionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router();

Router.route('/api/v1/questions').post(_questionsController.default.postQuestion).get(_questionsController.default.getQuestions);
Router.route('/api/v1/questions/:id').get(_questionsController.default.getQuestion).patch(_questionsController.default.updateQuestion).delete(_questionsController.default.deleteQuestion);
Router.route('/api/v1/questions/:id/upvote').patch(_questionsController.default.upvoteQuestion);
Router.route('/api/v1/questions/:id/downvote').patch(_questionsController.default.downvoteQuestion);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=questions.js.map