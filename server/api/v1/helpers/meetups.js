import db, { meetupModel } from '../../../db/v1/db';
import { currentUser } from '../controllers/usersController';

const meetupsDB = db.meetups;
const rsvpDB = db.rsvps;

class Meetups {
  /**
   * Create meetup in database
   * Assign a unique id to meetup
   * @param {Object} data - http request body
   * @returns {Object} - Meetup object if success
   * @throws {Error} - Error object if fail
   */
  static createMeetup(data) {
    const meetup = {
      id: parseInt(Math.random() * 1000000, 10),
      createdOn: new Date(),
    };
    const propNames = Object.keys(meetupModel);
    Meetups.validateMeetup(propNames, data, meetup);
    meetupsDB.push(meetup);
    return Meetups.getMeetup(meetup.id);
  }

  /**
   * Get all meetups in database
   * @returns {Array} - array of Meetup objects
   */
  static getMeetups() {
    return meetupsDB;
  }

  /**
   * Get all upcoming meetups in database
   * @returns {Array} - array of upcoming Meetup objects
   */
  static getUpcomingMeetups() {
    const upcoming = meetupsDB.filter(meetup => meetup.happeningOn > new Date());
    return upcoming;
  }

  /**
   * Get a Meetup object in database using a unique id
   * Assign a unique id to Meetup
   * @param {String} idString - http request.params.id
   * @returns {Object} - if Meetup is found
   * @returns {undefined} - if Meetup is not found
   */
  static getMeetup(idString) {
    const id = parseInt(idString, 10);
    const meetup = meetupsDB.find(obj => obj.id === id);
    return meetup;
  }

  /**
   * Update an existing Meetup in database using a unique id
   * @param {String} idString - http request.params.id
   * @param {String} data - http request.body
   * @returns {Object} - on success
   * @throws {Error} - on failure
   */
  static updateMeetup(idString, data) {
    const id = parseInt(idString, 10);
    const meetup = meetupsDB.find(obj => obj.id === id);
    const propNames = Object.keys(data);
    Meetups.validateMeetup(propNames, data, meetup);
    return Meetups.getMeetup(id);
  }

  /**
   * Delete an existing Meetup in database using a unique id
   * @param {String} idString - http request.params.id
   * @returns {Object} - on success
   * @returns {undefined} - on failure
   */
  static deleteMeetup(idString) {
    const id = parseInt(idString, 10);
    const deleted = meetupsDB.find((meetup, index) => {
      if (meetup.id === id) meetupsDB.splice(index, 1);
      return meetup.id === id;
    });
    return deleted;
  }

  /**
   * Check if Meetup images inputs are valid
   * @param {Array} imagesArray - images input
   * @returns {Array} - on success
   */
  static validateImages(imagesArray) {
    if (!(imagesArray instanceof Array)) return [];
    return imagesArray;
  }

  /**
   * Check if Meetup tags inputs are valid
   * @param {Array} tagsArray - tags input
   * @returns {Array} - on success
   * @throws {Error} - on failure
   */
  static validateTags(tagsArray) {
    const error = Error('invalid tags');
    if (!(tagsArray instanceof Array)) throw error;
    return tagsArray;
  }

  /**
   * Check if Meetup inputs are valid
   * @param {Array} propNames - meetup schema keys
   * @param {Object} data - form data
   * @param {Object} meetupData - default data
   * @returns {Array} - on success
   */
  static validateMeetup(propNames, data, meetupData) {
    const meetup = meetupData;
    propNames.forEach((propName) => {
      if (propName === 'id' || propName === 'createdOn') return; // continue next loop
      if (!data[propName] && propName !== 'images') return; // images are optional
      if (propName === 'images') {
        const images = Meetups.validateImages(data[propName]);
        meetup[propName] = images;
        return;
      }
      if (propName === 'tags') {
        const tags = Meetups.validateTags(data[propName]);
        meetup[propName] = tags;
        return;
      }
      if (propName === 'happeningOn') {
        const happeningOn = Meetups.setHappeningOn(data[propName]);
        meetup[propName] = happeningOn;
        return;
      }
      if (!data.location) throw Error('invalid location');
      meetup[propName] = data[propName];
    });
  }

  /**
   * Set date property for meetup objects
   * @param {String} imagesArray - images input
   * @returns {Date} - on success
   * @throws {Error} - on failure
   */
  static setHappeningOn(dateString) {
    const error = new Error('invalid date string');
    const happeningOn = new Date(dateString);
    if (!happeningOn.getDate()) throw error;
    return happeningOn;
  }

  /**
   * Create rsvp status for meetup
   * @param {String} idString - meetup id
   * @param {String} responseString - rsvp response
   * @returns {Object | undefined} - on success or failure
   */
  static createRsvp(idString, responseString) {
    const meetupId = parseInt(idString, 10);
    const response = responseString.toLowerCase();
    const rsvp = {
      id: parseInt(Math.random() * 1000000, 10),
      meetup: meetupId,
      user: currentUser.id,
      response,
    };
    if (rsvp.response === 'yes'
    || rsvp.response === 'no'
    || rsvp.response === 'maybe') {
      rsvpDB.push(rsvp);
      return {
        meetup: meetupId,
        topic: meetupsDB.find(obj => obj.id === meetupId).topic,
        status: rsvp.response,
      };
    }
    return undefined;
  }

  /**
   * Create rsvp status for meetup
   * @param {String} idString - meetup id
   * @returns {Array} - populated on success | empty on failure
   */
  static getRsvps(idString) {
    const meetupId = parseInt(idString, 10);
    const rsvps = rsvpDB.filter(rsvp => rsvp.meetup === meetupId);
    return rsvps;
  }
}

export default Meetups;
