import express from 'express';
import meetupsController from '../controllers/meetupsController';

const Router = express.Router();

// CREATE, READ_ALL
Router.route('/')
  .post(meetupsController.postMeetup)
  .get(meetupsController.getMeetups);

Router.route('/upcoming')
  .get(meetupsController.getUpcoming);

Router.route('/:id')
  .get(meetupsController.getMeetup)
  .patch(meetupsController.updateMeetup)
  .delete(meetupsController.deleteMeetup);

Router.route('/:id/rsvps')
  .post(meetupsController.postRsvp)
  .get(meetupsController.getRsvps);

export default Router;
