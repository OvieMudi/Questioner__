"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentMeetup = exports.default = void 0;

var _meetups = _interopRequireDefault(require("../helpers/meetups"));

var _db = _interopRequireDefault(require("../../../db/v1/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line import/no-mutable-exports
var currentMeetup = _db.default.meetups[0];
exports.currentMeetup = currentMeetup;

var MeetupsController =
/*#__PURE__*/
function () {
  function MeetupsController() {
    _classCallCheck(this, MeetupsController);
  }

  _createClass(MeetupsController, null, [{
    key: "postMeetup",

    /**
     * Create new meetup in database
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */
    value: function postMeetup(req, res) {
      try {
        var meetup = _meetups.default.createMeetup(req.body);

        exports.currentMeetup = currentMeetup = meetup;
        return res.status(201).json({
          status: 201,
          data: [meetup]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }
    }
    /**
     * Get all meetups objects in database
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "getMeetups",
    value: function getMeetups(req, res) {
      var meetup = _meetups.default.getMeetups();

      return res.status(200).json({
        status: 200,
        data: meetup
      });
    }
    /**
     * Get all upcoming meetups in database
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "getUpcoming",
    value: function getUpcoming(req, res) {
      var upcoming = _meetups.default.getUpcomingMeetups();

      return res.status(200).json({
        status: 200,
        data: upcoming
      });
    }
    /**
     * Get a meetup object in database using a unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "getMeetup",
    value: function getMeetup(req, res) {
      var meetup = _meetups.default.getMeetup(req.params.id);

      if (!meetup) {
        return res.status(404).json({
          status: 404,
          error: 'meetup does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [meetup]
      });
    }
    /**
     * Update a meetup object in database using a unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "updateMeetup",
    value: function updateMeetup(req, res) {
      try {
        var updatedMeetup = _meetups.default.updateMeetup(req.params.id, req.body);

        if (!updatedMeetup) {
          return res.status(404).json({
            status: 404,
            error: 'meetup does not exist'
          });
        }

        exports.currentMeetup = currentMeetup = updatedMeetup;
        return res.status(200).json({
          status: 200,
          data: [updatedMeetup]
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }
    }
    /**
     * Delete a meetup object in database using a unique id
     * @param {Object} req - server request
     * @param {Object} res - server response
     * @returns {JSON} - custom server response with error/success
     */

  }, {
    key: "deleteMeetup",
    value: function deleteMeetup(req, res) {
      var deleted = _meetups.default.deleteMeetup(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          status: 404,
          error: 'meetup does not exist'
        });
      }

      exports.currentMeetup = currentMeetup = _db.default.meetups[_db.default.meetups.length - 1];
      return res.status(200).json({
        status: 200,
        message: 'meetup deleted'
      });
    }
  }]);

  return MeetupsController;
}();

var _default = MeetupsController;
exports.default = _default;
//# sourceMappingURL=meetupsController.js.map