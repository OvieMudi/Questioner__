import app from 'express';
import meetupsController from '../controllers/meetupsController';
import validator from '../middleware/requestValidator';
import auth from '../middleware/verifyAuth';

const Router = app.Router();

Router.route('/')
  .post(validator.validateMeetups, auth.verifyToken, meetupsController.create)
  .get(meetupsController.getAll);

Router.route('/:id')
  .get(meetupsController.getOne)
  .patch(validator.validateMeetups, auth.verifyToken, meetupsController.update)
  .delete(auth.verifyToken, meetupsController.delete);

Router.route('/:id/rsvps')
  .post(auth.verifyToken, validator.validateRsvps, meetupsController.createRsvp)
  .get(auth.verifyToken, meetupsController.getAllRsvps);

/* Router.route('/:id/rsvps/:id')
  .patch(validator.validateRsvps, meetupsController.update); */

export default Router;
