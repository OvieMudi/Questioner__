import MainController from './mainController';
import usersModel from '../models/usersModel';

class UsersController extends MainController {
  constructor(name = 'user', model = usersModel) {
    super(name, model);
  }

  async update(req, res) {
    try {
      const row = await this.model.updateUser(req.user.id, req.body);
      if (!row) return this.errorResponse(res, 404, 'Please login/register first');
      return this.successResponse(res, 200, row);
    } catch (error) {
      return this.errorResponse(res, 400, error.message);
    }
  }

  async delete(req, res) {
    try {
      const deleted = await this.model.delete(req.user.id);
      if (!deleted) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, `${this.name} deleted`);
    } catch (err) {
      return this.errorResponse(res, 400, err.message);
    }
  }
}

export default new UsersController();
