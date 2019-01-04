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

var meetupsDB = _db.default.meetups;

var Meetups =
/*#__PURE__*/
function () {
  function Meetups() {
    _classCallCheck(this, Meetups);
  }

  _createClass(Meetups, null, [{
    key: "createMeetup",

    /**
     * Create meetup in database
     * Assign a unique id to meetup
     * @param {Object} data - http request body
     * @returns {Object} - Meetup object if success
     * @throws {Error} - Error object if fail
     */
    value: function createMeetup(data) {
      var meetup = {
        id: parseInt(Math.random() * 1000000, 10),
        createdOn: new Date()
      };
      var propNames = Object.keys(_db.meetupModel);
      propNames.forEach(function (propName) {
        if (propName === 'id' || propName === 'createdOn') return; // continue next loop

        if (!data[propName] && propName !== 'images') {
          // images are optional
          throw Error("".concat(propName, " is empty/invalid"));
        }

        if (propName === 'images') {
          var images = Meetups.validateImages(data[propName]);
          meetup[propName] = images;
          return;
        }

        if (propName === 'tags') {
          var tags = Meetups.validateTags(data[propName]);
          meetup[propName] = tags;
          return;
        }

        if (propName === 'happeningOn') {
          var happeningOn = Meetups.setHappeningOn(data[propName]);
          meetup[propName] = happeningOn;
          return;
        }

        if (data[propName].length < 3) {
          throw Error("invalid ".concat(propName));
        }

        meetup[propName] = data[propName];
      }); // end forEach

      meetupsDB.push(meetup);
      return Meetups.getMeetup(meetup.id);
    }
    /**
     * Get all meetups in database
     * @returns {Array} - array of Meetup objects
     */

  }, {
    key: "getMeetups",
    value: function getMeetups() {
      return meetupsDB;
    }
    /**
     * Get all upcoming meetups in database
     * @returns {Array} - array of upcoming Meetup objects
     */

  }, {
    key: "getUpcomingMeetups",
    value: function getUpcomingMeetups() {
      var upcoming = meetupsDB.filter(function (meetup) {
        return meetup.happeningOn > new Date();
      });
      return upcoming;
    }
    /**
     * Get a Meetup object in database using a unique id
     * Assign a unique id to Meetup
     * @param {String} idString - http request.params.id
     * @returns {Object} - if Meetup is found
     * @returns {undefined} - if Meetup is not found
     */

  }, {
    key: "getMeetup",
    value: function getMeetup(idString) {
      var id = parseInt(idString, 10);
      var meetup = meetupsDB.find(function (obj) {
        return obj.id === id;
      });
      return meetup;
    }
    /**
     * Update an existing Meetup in database using a unique id
     * @param {String} idString - http request.params.id
     * @param {String} data - http request.body
     * @returns {Object} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "updateMeetup",
    value: function updateMeetup(idString, data) {
      var id = parseInt(idString, 10);
      var meetup = meetupsDB.find(function (obj) {
        return obj.id === id;
      });
      var propNames = Object.keys(data);
      propNames.forEach(function (propName) {
        if (propName === 'id' || propName === 'createdOn') return; // continue next loop

        if (!data[propName] && propName !== 'images') return; // images are optional

        if (propName === 'images') {
          var images = Meetups.validateImages(data[propName]);
          meetup[propName] = images;
          return;
        }

        if (propName === 'tags') {
          var tags = Meetups.validateTags(data[propName]);
          meetup[propName] = tags;
          return;
        }

        if (propName === 'happeningOn') {
          var happeningOn = Meetups.setHappeningOn(data[propName]);
          meetup[propName] = happeningOn;
          return;
        }

        if (data[propName].length < 3) {
          throw Error("invalid ".concat(propName));
        }

        meetup[propName] = data[propName];
      }); // end forEach

      return Meetups.getMeetup(id);
    }
    /**
     * Delete an existing Meetup in database using a unique id
     * @param {String} idString - http request.params.id
     * @returns {Object} - on success
     * @returns {undefined} - on failure
     */

  }, {
    key: "deleteMeetup",
    value: function deleteMeetup(idString) {
      var id = parseInt(idString, 10);
      var deleted = meetupsDB.find(function (meetup, index) {
        if (meetup.id === id) meetupsDB.splice(index, 1);
        return meetup.id === id;
      });
      return deleted;
    }
    /**
     * Check if Meetup images inputs are valid
     * @param {Array} imagesArray - images input
     * @returns {Array} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "validateImages",
    value: function validateImages(imagesArray) {
      var error = Error('invalid images');
      if (!(imagesArray instanceof Array)) return [];
      if (imagesArray.some(function (image) {
        return image.length < 11;
      })) throw error;
      return imagesArray;
    }
    /**
     * Check if Meetup tags inputs are valid
     * @param {Array} tagsArray - tags input
     * @returns {Array} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "validateTags",
    value: function validateTags(tagsArray) {
      var error = Error('invalid tags');
      if (!(tagsArray instanceof Array)) throw error;
      if (!tagsArray.every(function (tag) {
        return tag.length > 3;
      })) throw error;
      return tagsArray;
    }
    /**
     * Set date property for meetup objects
     * @param {String} imagesArray - images input
     * @returns {Date} - on success
     * @throws {Error} - on failure
     */

  }, {
    key: "setHappeningOn",
    value: function setHappeningOn(dateString) {
      var error = new Error('invalid date string');
      if (typeof dateString !== 'string') throw error;
      var happeningOn = new Date(dateString);
      if (!happeningOn.getDate()) throw error;
      return happeningOn;
    }
  }]);

  return Meetups;
}();

var _default = Meetups;
exports.default = _default;
//# sourceMappingURL=meetups.js.map