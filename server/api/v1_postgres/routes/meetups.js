import app from 'express';
import meetupsController from '../controllers/meetupsController';
import validator from '../middleware/requestValidator';

const Router = app.Router();

Router.route('/')
  .post(validator.validateMeetups, meetupsController.create)
  .get(meetupsController.getAll);

Router.route('/:id')
  .get(meetupsController.getOne)
  .patch(validator.validateMeetups, meetupsController.update)
  .delete(meetupsController.delete);

Router.route('/:id/rsvps')
  .post(validator.validateRsvps, meetupsController.createRsvp)
  .get(meetupsController.getAllRsvps);

Router.route('/:id/rsvps/:id')
  .patch(validator.validateRsvps, meetupsController.update);


export default Router;
