import app from 'express';
import usersController from '../controllers/usersController';
import validator from '../middleware/requestValidator';
import auth from '../middleware/verifyAuth';

const Router = app.Router();

Router.route('/').get(auth.verifyToken, usersController.getAll);

Router.route('/:id')
  .get(usersController.getOne)
  .patch(validator.validateAuth, auth.verifyToken, usersController.update)
  .delete(auth.verifyToken, usersController.delete);

// Router.route('/logout').delete(usersController.logout);

export default Router;
