import jwt from 'jsonwebtoken';
import controllerResponse from '../helpers/controllerResponse';
import usersModel from '../models/usersModel';

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return controllerResponse.errorResponse(res, 400, 'token not provided');
    try {
      const verified = await jwt.verify(token, process.env.SECRET_STRING);
      const user = await usersModel.getOne(verified.userId);
      if (!user) return controllerResponse.errorResponse(res, 400, 'invalid/expired token');
      req.user = { id: verified.userId };
      return next();
    } catch (err) {
      return controllerResponse.errorResponse(res, 400, err.message);
    }
  },
};

export default auth;
