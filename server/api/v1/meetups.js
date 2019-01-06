import express from 'express';
import meetupsController from './controllers/meetupsController';

const Router = express.Router();

// CREATE, READ_ALL
Router.route('/api/v1/meetups')
  .post(meetupsController.postMeetup)
  .get(meetupsController.getMeetups);

Router.route('/api/v1/meetups/upcoming')
  .get(meetupsController.getUpcoming);

Router.route('/api/v1/meetups/:id')
  .get(meetupsController.getMeetup)
  .patch(meetupsController.updateMeetup)
  .delete(meetupsController.deleteMeetup);

Router.route('/api/v1/meetups/:id/rsvps')
  .post(meetupsController.postRsvp)
  .get(meetupsController.getRsvps);

export default Router;
