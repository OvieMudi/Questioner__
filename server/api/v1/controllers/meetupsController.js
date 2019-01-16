import Meetups from '../helpers/meetups';
import db from '../../../db/v1/db';

// eslint-disable-next-line import/no-mutable-exports
let currentMeetup = db.meetups[0];

class MeetupsController {
  /**
   * Create new meetup in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static postMeetup(req, res) {
    try {
      const meetup = Meetups.createMeetup(req.body);
      currentMeetup = meetup;
      return res.status(201).json({
        status: 201, data: meetup,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  /**
   * Get all meetups objects in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getMeetups(req, res) {
    const meetup = Meetups.getMeetups();
    return res.status(200).json({
      status: 200, data: meetup,
    });
  }

  /**
   * Get all upcoming meetups in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getUpcoming(req, res) {
    const upcoming = Meetups.getUpcomingMeetups();
    return res.status(200).json({
      status: 200, data: upcoming,
    });
  }

  /**
   * Get a meetup object in database using a unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getMeetup(req, res) {
    const meetup = Meetups.getMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: 404, error: 'meetup does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: meetup,
    });
  }

  /**
   * Update a meetup object in database using a unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static updateMeetup(req, res) {
    try {
      const updatedMeetup = Meetups.updateMeetup(req.params.id, req.body);
      if (!updatedMeetup) {
        return res.status(404).json({
          status: 404, error: 'meetup does not exist',
        });
      }
      currentMeetup = updatedMeetup;
      return res.status(200).json({
        status: 200, data: updatedMeetup,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  /**
   * Delete a meetup object in database using a unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static deleteMeetup(req, res) {
    const deleted = Meetups.deleteMeetup(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 404, error: 'meetup does not exist',
      });
    }
    currentMeetup = db.meetups[db.meetups.length - 1];
    return res.status(200).json({
      status: 200, message: 'meetup deleted',
    });
  }

  /**
   * Create a meetup rsvp status in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static postRsvp(req, res) {
    const rsvp = Meetups.createRsvp(req.params.id, req.body.response);
    if (!rsvp) {
      return res.status(400).json({
        status: 400, error: 'invalid data',
      });
    }
    return res.status(201).json({
      status: 201, data: rsvp,
    });
  }

  /**
   * Get all meetup rsvp status in database
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getRsvps(req, res) {
    const rsvp = Meetups.getRsvps(req.params.id);
    return res.status(200).json({
      status: 200, data: rsvp,
    });
  }
}

export default MeetupsController;
export { currentMeetup };
