import express from 'express';
import usersController from './controllers/usersController';

const Router = express.Router();

// CREATE, READ_ALL
Router.route('/api/v1/users')
  .post(usersController.postUser)
  .get(usersController.getUsers);

// READ_ONE, UPDATE, DELETE
Router.route('/api/v1/users/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default Router;
