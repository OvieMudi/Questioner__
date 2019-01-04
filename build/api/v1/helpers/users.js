"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireWildcard(require("../../../db/v1/db"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userDB = _db.default.users;

var Users =
/*#__PURE__*/
function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: "createUser",

    /**
     * Create user in database
     * Assign a unique id to user
     * @param {Object} data - http request body
     * @returns {Object} - User object if success
     * @throws {Error} - Error object if fail
     */
    value: function createUser(data) {
      var user = {
        id: parseInt(Math.random() * 1000000, 10)
      };
      var propNames = Object.keys(_db.userModel);
      propNames.forEach(function (propName) {
        if (propName === 'id' || propName === 'registered' || propName === 'isAdmin') return;

        if (!data[propName] || data[propName] < 2) {
          throw new Error("".concat(propName, " is empty/invalid"));
        }

        user[propName] = data[propName];
      });
      user.registered = new Date();
      user.isAdmin = false;
      userDB.push(user); // RETURN NEW USER OBJECT

      return Users.getUser(user.id);
    }
    /**
     * Get all users in database
     * @returns {Array} - array of user objects
     */

  }, {
    key: "getUsers",
    value: function getUsers() {
      return userDB;
    }
    /**
     * Get a User in database using a unique id
     * Assign a unique id to user
     * @param {String} idString - http request.params.id
     * @returns {Object} - if User is found
     * @returns {undefined} - if User is not found
     */

  }, {
    key: "getUser",
    value: function getUser(idString) {
      var id = parseInt(idString, 10);
      var user = userDB.find(function (obj) {
        return obj.id === id;
      });
      return user;
    }
    /**
     * Update an existing user in database using a unique id
     * @param {String} idString - http request.params.id
     * @param {String} data - http request.body
     * @returns {Object} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "updateUser",
    value: function updateUser(idString, data) {
      var id = parseInt(idString, 10);
      var user = userDB.find(function (obj) {
        return obj.id === id;
      });
      var propNames = Object.keys(data);
      propNames.forEach(function (propName) {
        if (!data[propName] || data[propName].length < 2) {
          // THROW EXCEPTION
          throw new Error("".concat(propName, " is empty/invalid"));
        }

        if (propName !== 'id' || propName !== 'createdOn') user[propName] = data[propName];
      });
      return Users.getUser(id);
    }
    /**
     * Delete an existing user in database using a unique id
     * @param {String} idString - http request.params.id
     * @returns {Object} - on success
     * @returns {undefined} - on failure
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(idString) {
      var id = parseInt(idString, 10);
      var deleted = userDB.find(function (user, index) {
        if (user.id === id) userDB.splice(index, 1);
        return user.id === id;
      });
      return deleted;
    }
  }]);

  return Users;
}();

var _default = Users;
exports.default = _default;
//# sourceMappingURL=users.js.map