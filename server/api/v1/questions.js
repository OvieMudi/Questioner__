import express from 'express';
import questionsController from './controllers/questionsController';

const Router = express.Router();

Router.route('/api/v1/questions')
  .post(questionsController.postQuestion)
  .get(questionsController.getQuestions);

Router.route('/api/v1/questions/:id')
  .get(questionsController.getQuestion)
  .patch(questionsController.updateQuestion)
  .delete(questionsController.deleteQuestion);

Router.route('/api/v1/questions/:id/upvote')
  .patch(questionsController.upvoteQuestion);

Router.route('/api/v1/questions/:id/downvote')
  .patch(questionsController.downvoteQuestion);

export default Router;
