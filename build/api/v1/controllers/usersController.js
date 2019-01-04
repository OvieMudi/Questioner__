"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentUser = exports.default = void 0;

var _users = _interopRequireDefault(require("../helpers/users"));

var _db = _interopRequireDefault(require("../../../db/v1/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line import/no-mutable-exports
var currentUser = _db.default.users[0];
exports.currentUser = currentUser;

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: "postUser",

    /**
     * Create new user in database
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {Object} - custom server response with error/success
     */
    value: function postUser(req, res) {
      try {
        var user = _users.default.createUser(req.body);

        exports.currentUser = currentUser = user;
        return res.status(201).json({
          status: 201,
          data: [user]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error.message
        });
      }
    }
    /**
     * Get all users from database
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {Object} - custom server response with error/success
     */

  }, {
    key: "getUsers",
    value: function getUsers(req, res) {
      var users = _users.default.getUsers();

      return res.status(200).json({
        status: 200,
        data: users
      });
    }
    /**
     * Get a users from database using unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {Object} - custom server response with error/success
     */

  }, {
    key: "getUser",
    value: function getUser(req, res) {
      var user = _users.default.getUser(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'user does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [user]
      });
    }
    /**
     * Update user in database using unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {Object} - custom server response with error/success
     */

  }, {
    key: "updateUser",
    value: function updateUser(req, res) {
      try {
        var modifiedUser = _users.default.updateUser(req.params.id, req.body);

        if (!modifiedUser) {
          return res.status(404).json({
            status: 404,
            message: 'user does not exit'
          });
        }

        return res.status(200).json({
          status: 200,
          data: [modifiedUser]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error.message
        });
      }
    }
    /**
     * Delete user in database using unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {Object} - custom server response with error/success
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      var id = req.params.id;

      var deleted = _users.default.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({
          status: 404,
          message: 'user does not exist'
        });
      }

      exports.currentUser = currentUser = undefined;
      return res.status(200).json({
        status: 200,
        message: 'user deleted'
      });
    }
  }]);

  return UsersController;
}();

var _default = UsersController;
exports.default = _default;
//# sourceMappingURL=usersController.js.map