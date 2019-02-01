import MainController from './mainController';
import usersModel from '../models/usersModel';

/* const usersController = {
  successResponse(res = {}, status = 200, data) {
    if (data === 'user deleted') {
      return res.status(status).json({
        status, message: data,
      });
    }
    return res.status(status).json({
      status, data,
    });
  },

  errorResponse(res = {}, status = 200, error) {
    return res.status(status).json({
      status, error,
    });
  },

  async create(req, res) {
    try {
      const row = await users.create(req.body);
      usersController.successResponse(res, 201, row);
    } catch (error) {
      usersController.errorResponse(res, 400, error.message);
    }
  },

  async getAll(req, res) {
    try {
      const rows = await users.getAll();
      usersController.successResponse(res, 200, rows);
    } catch (error) {
      usersController.errorResponse(res, 500, error.message);
    }
  },

  async getOne(req, res) {
    try {
      const row = await users.getOne(req.params.id);
      if (!row) return usersController.errorResponse(res, 404, 'user does not exist');
      return usersController.successResponse(res, 200, row);
    } catch (error) {
      return usersController.errorResponse(res, 500, error.message);
    }
  },

  async update(req, res) {
    try {
      const row = await users.update(req.params.id, req.body);
      if (!row) return usersController.errorResponse(res, 404, 'user does not exist');
      return usersController.successResponse(res, 200, row);
    } catch (error) {
      return usersController.errorResponse(res, 500, error.message);
    }
  },

  async delete(req, res) {
    try {
      const deleted = await users.delete(req.params.id);
      if (!deleted) return usersController.errorResponse(res, 404, 'user does not exist');
      return usersController.successResponse(res, 200, 'user deleted');
    } catch (err) {
      return usersController.errorResponse(res, 500, err.message);
    }
  },
}; */

const usersController = new MainController('user', usersModel);

export default usersController;
