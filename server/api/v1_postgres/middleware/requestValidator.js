import joi from 'joi';
import controllerResponse from '../helpers/controllerResponse';

const validator = {
  joiValidate: (object = {}, req = {}, res = {}, next) => {
    const authSchema = joi.object().keys(object);
    const validationOptions = {
      allowUnknown: true,
      stripUnknown: true,
    };
    joi.validate(req.body, authSchema, validationOptions, (err, data) => {
      if (!err) {
        req.body = data;
        next();
      } else {
        // eslint-disable-next-line no-console
        console.error(err.message);
        const property = err.details[0].path;
        const message = `Invalid ${property}. Please review and try again`;
        controllerResponse.errorResponse(res, 400, message);
      }
    });
  },

  validateAuth(req, res, next) {
    const genericName = joi
      .string()
      .trim()
      .min(2)
      .max(20)
      .regex(/^[a-zA-Z]+$/);
    const userParams = {
      firstname: genericName,
      lastname: genericName,
      othername: genericName,
      email: joi.string().email({ minDomainAtoms: 2 }),
      username: joi
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/),
      phoneNumber: joi
        .string()
        .trim()
        .regex(/^[0-9]+$/)
        .min(10)
        .max(14),
      password: joi
        .string()
        .trim()
        .min(6)
        .max(32)
        .regex(/^\w+$/),
    };

    const patchRoute = req.route.stack.find(stack => stack.method === 'patch');
    let userObject;
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
        password: userParams.password.required(),
      };
    }
    validator.joiValidate(userObject, req, res, next);
  },

  validateAuthSignin(req, res, next) {
    const loginObject = {
      username: joi
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/)
        .required(),
      password: joi
        .string()
        .trim()
        .min(6)
        .max(32)
        .regex(/^\w+$/)
        .required(),
    };
    validator.joiValidate(loginObject, req, res, next);
  },

  validateMeetups(req, res, next) {
    const meetupParams = {
      location: joi
        .string()
        .min(3)
        .max(50),
      images: joi.string().min(10),
      topic: joi
        .string()
        .min(5)
        .max(100),
      happeningOn: joi.date().raw(),
      tags: joi.string().min(2),
    };
    const patchRoute = req.route.stack.find(stack => stack.method === 'patch');
    let meetupObject;
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
      response: joi
        .string()
        .valid(['yes', 'no', 'maybe'])
        .lowercase()
        .required(),
    };
    validator.joiValidate(rsvpObject, req, res, next);
  },

  validateQuestions(req, res, next) {
    const questionParams = {
      title: joi
        .string()
        .min(3)
        .max(100),
      body: joi
        .string()
        .min(3)
        .max(1000),
    };
    const patchRoute = req.route.stack.find(stack => stack.method === 'patch');
    let questionObject;
    if (patchRoute) {
      questionObject = questionParams;
    } else { // post route
      questionObject = {
        meetup: joi.string().regex(/^[1-9]+\d*$/).required(),
        title: questionParams.title.required(),
        body: questionParams.body.required(),
      };
    }
    validator.joiValidate(questionObject, req, res, next);
  },
};

export default validator;
