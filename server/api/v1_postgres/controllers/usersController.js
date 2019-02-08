import MainController from './mainController';
import usersModel from '../models/usersModel';

const usersController = new MainController('user', usersModel);

export default usersController;
