import MainController from './mainController';
import usersModel from '../models/usersModel';

class UsersController extends MainController {}

const usersController = new UsersController('user', usersModel);

export default usersController;
