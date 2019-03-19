import app from 'express';
import questionsController from '../controllers/questionsController';
import validator from '../middleware/requestValidator';
import auth from '../middleware/verifyAuth';

const Router = app.Router();

Router.route('/')
  .post(validator.validateQuestions, auth.verifyToken, questionsController.create)
  .get(auth.verifyToken, questionsController.getAll);

Router.route('/:id')
  .get(auth.verifyToken, questionsController.getOne)
  .patch(auth.verifyToken, validator.validateQuestions, questionsController.update)
  .delete(auth.verifyToken, questionsController.delete);

Router.route('/:id/upvote')
  .patch(auth.verifyToken, questionsController.upvote);

Router.route('/:id/downvote')
  .patch(auth.verifyToken, questionsController.downvote);

export default Router;
