import MainController from './mainController';
import usersModel from '../models/usersModel';
import authHelper from '../helpers/authHelper';

class AuthController extends MainController {
  constructor(name = 'user', model = usersModel) {
    super(name, model);
    this.signin = this.signin.bind(this);
  }

  async create(req, res) {
    try {
      const newUser = await this.model.create(req.body);
      const token = authHelper.generateToken(newUser.id);
      res.status(201).json({
        status: 201,
        data: {
          token,
          user: newUser,
        },
      });
    } catch (error) {
      this.errorResponse(res, 400, error.message);
    }
  }

  async signin(req, res) {
    try {
      const user = await this.model.getOneUser(req.body.username);
      if (!user) return this.errorResponse(res, 400, 'username or password incorrect');

      const validPassword = authHelper.comparePassword(req.body.password, user.password);

      if (!validPassword) return this.errorResponse(res, 400, 'username or password incorrect');

      const token = authHelper.generateToken(user.id);
      user.password = undefined;
      return res.status(201).json({
        status: 201,
        data: {
          token,
          user,
        },
      });
    } catch (err) {
      return this.errorResponse(res, 400, err.message);
    }
  }
}

export default new AuthController();
