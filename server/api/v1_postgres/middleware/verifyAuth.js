import jwt from 'jsonwebtoken';
import controllerResponse from '../helpers/controllerResponse';
import usersModel from '../models/usersModel';

const auth = {
  async verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers.authorization || '';
    if (token.startsWith('Bearer')) token = token.slice(7, token.length);
    if (!token) return controllerResponse.errorResponse(res, 400, 'token not provided');
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_STRING);
      const user = await usersModel.getOne(decoded.userId);
      if (!user) return controllerResponse.errorResponse(res, 400, 'user not found');
      req.user = { id: decoded.userId };
      return next();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return controllerResponse.errorResponse(res, 400, err.message);
    }
  },
};

export default auth;
