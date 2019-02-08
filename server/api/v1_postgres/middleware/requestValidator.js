import joi from 'joi';
import controllerResponse from '../helpers/controllerResponse';

const validator = {
  joiValidate: (object = {}, req = {}, res = {}, next) => {
    const authSchema = joi.object().keys(object);
    const validationOptions = {
      allowUnknown: true, stripUnknown: true,
    };
    joi.validate(req.body, authSchema, validationOptions, (err, data) => {
      if (err) {
        console.error(err.message);
        const property = err.details[0].path;
        const message = `Invalid ${property}. Please review and try again`;
        controllerResponse.errorResponse(res, 400, message);
      } else {
        req.body = data;
        next();
      }
    });
  },

  validateAuth(req, res, next) {
    let userObject;
    const genericName = joi.string().min(2).max(20).regex(/^[a-zA-Z]+$/)
      .trim();
    const userParams = {
      firstname: genericName,
      lastname: genericName,
      othername: genericName,
      email: joi.string().email({ minDomainAtoms: 2 }),
      username: joi.string().regex(/^[a-zA-Z0-9]+$/).trim(),
      phoneNumber: joi.string().regex(/^[0-9]+$/).trim()
        .min(10)
        .max(14),
    };
    const patchRoute = req.route.stack.find(stack => stack.method === 'patch');
    if (patchRoute) {
      userObject = userParams;
    } else {
      userObject = {
        firstname: userParams.firstname.required(),
        lastname: userParams.lastname.required(),
        othername: userParams.othername,
        email: userParams.email.required(),
        username: userParams.username.required(),
        phoneNumber: userParams.phoneNumber.required(),
      };
    }
    validator.joiValidate(userObject, req, res, next);
  },

  validateMeetups(req, res, next) {
    let meetupObject;
    const meetupParams = {
      location: joi.string().min(3).max(50),
      images: joi.string().min(10),
      topic: joi.string().min(5).max(100),
      happeningOn: joi.date().raw(),
      tags: joi.string().min(2),
    };
    const patchRoute = req.route.stack.find(stack => stack.method === 'patch');
    if (patchRoute) {
      meetupObject = meetupParams;
    } else {
      meetupObject = {
        location: meetupParams.location.required(),
        images: meetupParams.images,
        topic: meetupParams.topic.required(),
        happeningOn: meetupParams.happeningOn.required(),
        tags: meetupParams.tags.required(),
      };
    }
    validator.joiValidate(meetupObject, req, res, next);
  },

  validateRsvps(req, res, next) {
    const rsvpObject = {
      response: joi.string().valid(['yes', 'no', 'maybe']).lowercase().required(),
    };
    validator.joiValidate(rsvpObject, req, res, next);
  },
};


export default validator;
