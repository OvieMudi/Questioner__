import app from 'express';
import questionsController from '../controllers/questionsController';

const Router = app.Router();

Router.route('/')
  .post(questionsController.create)
  .get(questionsController.getAll);

Router.route('/:id')
  .get(questionsController.getOne)
  .patch(questionsController.update)
  .delete(questionsController.delete);

Router.route('/:id/upvote')
  .patch(questionsController.upvote);

Router.route('/:id/downvote')
  .patch(questionsController.downvote);

export default Router;
