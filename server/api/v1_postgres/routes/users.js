import app from 'express';
import usersController from '../controllers/usersController';

const Router = app.Router();

Router.route('/')
  .post(usersController.create)
  .get(usersController.getAll);

Router.route('/:id')
  .get(usersController.getOne)
  .patch(usersController.update)
  .delete(usersController.delete);

export default Router;
