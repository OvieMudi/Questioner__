"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rsvpModel = exports.meetupModel = exports.userModel = void 0;

/*
  * Export entries that emulate model objects
  * Users
  * Meetups
  * Questions
  * RSVPs
*/
var userModel = {
  id: Number,
  firstname: String,
  lastname: String,
  othername: String,
  email: String,
  username: String,
  phoneNumber: String,
  registered: Date,
  isAdmin: Boolean
};
exports.userModel = userModel;
var meetupModel = {
  id: Number,
  createdOn: Date,
  location: String,
  images: [String, String],
  topic: String,
  happeningOn: Date,
  tags: [String, String]
};
exports.meetupModel = meetupModel;
var rsvpModel = {
  id: Number,
  meetup: Number,
  user: Number,
  response: String
};
exports.rsvpModel = rsvpModel;
var _default = {
  users: [{
    id: 12345678,
    firstname: 'Luke',
    lastname: 'Skywalker',
    othername: 'Korl',
    email: 'korlmarcus@oldrepublic.com',
    username: 'Korl Marcus',
    phoneNumber: '+1234567890',
    registered: new Date('2018/01/11-11:00'),
    isAdmin: true
  }, {
    id: 12345679,
    firstname: 'Count',
    lastname: 'Dooku',
    othername: 'Tyrannus',
    email: 'thecount@oldrepublic.com',
    username: 'Count',
    phoneNumber: '+1234567891',
    registered: new Date('2018/01/11-11:00'),
    isAdmin: true
  }],
  meetups: [{
    id: 11223344,
    createdOn: new Date('2018/01/11-09:00'),
    location: 'Felucia',
    images: ['http://image1.jpg', 'http://image2.jpg'],
    topic: 'Republic or Separatist',
    happeningOn: new Date('4019/01/07-11:00'),
    tags: ['republic', 'separatist']
  }],
  questions: [{
    id: 123123123,
    createdOn: new Date('2018/01/11-11:00'),
    createdBy: 12345678,
    // (Luke Skywalker)
    meetup: 11223344,
    // (republic or separatist)
    title: 'Should we bring our weapons?',
    body: "Just saying... Since we're a group that hate each other.",
    votes: 400
  }]
};
exports.default = _default;
//# sourceMappingURL=db.js.map