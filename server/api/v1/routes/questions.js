import express from 'express';
import questionsController from '../controllers/questionsController';

const Router = express.Router();

Router.route('/')
  .post(questionsController.postQuestion)
  .get(questionsController.getQuestions);

Router.route('/:id')
  .get(questionsController.getQuestion)
  .patch(questionsController.updateQuestion)
  .delete(questionsController.deleteQuestion);

Router.route('/:id/upvote')
  .patch(questionsController.upvoteQuestion);

Router.route('/:id/downvote')
  .patch(questionsController.downvoteQuestion);

export default Router;
