/* eslint-disable class-methods-use-this */
import Users from '../../../helpers/users';

// const { users } = db;

class UserController {
  constructor() {
    this._currentUser = undefined;
    this.postUser = this.postUser.bind(this);
  }

  /* postUser
    * create new user, add user to db, return user/errorMessage
  */
  postUser(req, res) {
    try {
      const user = Users.createUser(req.body);
      this._currentUser = user;
      return res.status(201).json({
        status: 201, data: [user],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, message: error.message,
      });
    }
  }

  /* getUsers
    * get all users from db, return users
  */
  getUsers(req, res) {
    const users = Users.getUsers();
    return res.status(200).json({
      status: 200, data: users,
    });
  }

  /* getUser
    * get a user from db, return user
  */
  getUser(req, res) {
    const user = Users.getUser(req.params.id);
    if (!user) {
      return res.status(404).send({
        status: 404, message: 'user not found',
      });
    }
    return res.status(200).send({
      status: 200, data: [user],
    });
  }

  /* getUsers
    * get user from db, update user info, return user
  */
  updateUser(req, res) {
    try {
      const modifiedUser = Users.updateUser(req.params.id, req.body);
      if (!modifiedUser) {
        return res.status(404).json({
          status: 404, message: 'user not found',
        });
      }
      return res.status(200).json({
        status: 200, data: [modifiedUser],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, message: error.message,
      });
    }
  }

  /* deleteUsers
    * get user from db, delete user
  */

  deleteUser(req, res) {
    const { id } = req.params;
    const deleted = Users.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({
        status: 404, message: 'user does not exist',
      });
    }
    return res.status(200).json({
      status: 200, message: 'user deleted',
    });
  }
}

export default new UserController();
