import app from 'express';
import usersController from '../controllers/usersController';
import validator from '../middleware/requestValidator';

const Router = app.Router();

Router.route('/')
  .post(validator.validateAuth, usersController.create)
  .get(usersController.getAll);

Router.route('/:id')
  .get(usersController.getOne)
  .patch(validator.validateAuth, usersController.update)
  .delete(usersController.delete);

export default Router;
