import app from 'express';
import questionsController from '../controllers/questionsController';
import validator from '../middleware/requestValidator';

const Router = app.Router();

Router.route('/')
  .post(validator.validateQuestions, questionsController.create)
  .get(questionsController.getAll);

Router.route('/:id')
  .get(questionsController.getOne)
  .patch(validator.validateQuestions, questionsController.update)
  .delete(questionsController.delete);

Router.route('/:id/upvote')
  .patch(questionsController.upvote);

Router.route('/:id/downvote')
  .patch(questionsController.downvote);

export default Router;
