"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _meetupsController = _interopRequireDefault(require("./controllers/meetupsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router(); // CREATE, READ_ALL


Router.route('/api/v1/meetups').post(_meetupsController.default.postMeetup).get(_meetupsController.default.getMeetups);
Router.route('/api/v1/meetups/upcoming').get(_meetupsController.default.getUpcoming);
Router.route('/api/v1/meetups/:id').get(_meetupsController.default.getMeetup).patch(_meetupsController.default.updateMeetup).delete(_meetupsController.default.deleteMeetup);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=meetups.js.map