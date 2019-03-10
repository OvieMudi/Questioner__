import app from 'express';
import validator from '../middleware/requestValidator';
import authController from '../controllers/authController';

const Router = app.Router();

Router.route('/signup').post(validator.validateAuth, authController.create);
Router.route('/signin').post(validator.validateAuthSignin, authController.signin);

export default Router;
