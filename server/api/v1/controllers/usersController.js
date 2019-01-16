import Users from '../helpers/users';
import db from '../../../db/v1/db';

// eslint-disable-next-line import/no-mutable-exports
let currentUser = db.users[0];

class UsersController {
  /**
   * Create new user in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom server response with error/success
   */
  static postUser(req, res) {
    try {
      const user = Users.createUser(req.body);
      currentUser = user;
      return res.status(201).json({
        status: 201, data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, message: error.message,
      });
    }
  }

  /**
   * Get all users from database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom server response with error/success
   */
  static getUsers(req, res) {
    const users = Users.getUsers();
    return res.status(200).json({
      status: 200, data: users,
    });
  }

  /**
   * Get a users from database using unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom server response with error/success
   */
  static getUser(req, res) {
    const user = Users.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 404, message: 'user does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: user,
    });
  }

  /**
   * Update user in database using unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom server response with error/success
   */
  static updateUser(req, res) {
    try {
      const modifiedUser = Users.updateUser(req.params.id, req.body);
      if (!modifiedUser) {
        return res.status(404).json({
          status: 404, message: 'user does not exit',
        });
      }
      return res.status(200).json({
        status: 200, data: modifiedUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, message: error.message,
      });
    }
  }

  /**
   * Delete user in database using unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom server response with error/success
   */
  static deleteUser(req, res) {
    const { id } = req.params;
    const deleted = Users.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({
        status: 404, message: 'user does not exist',
      });
    }
    currentUser = undefined;
    return res.status(200).json({
      status: 200, message: 'user deleted',
    });
  }
}

export default UsersController;
export { currentUser };
