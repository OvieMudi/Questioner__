"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersController = _interopRequireDefault(require("./controllers/usersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router(); // CREATE, READ_ALL


Router.route('/api/v1/users').post(_usersController.default.postUser).get(_usersController.default.getUsers); // READ_ONE, UPDATE, DELETE

Router.route('/api/v1/users/:id').get(_usersController.default.getUser).patch(_usersController.default.updateUser).delete(_usersController.default.deleteUser);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=users.js.map