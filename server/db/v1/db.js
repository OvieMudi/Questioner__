/**
  * Export entries that emulate model objects
  * Users
  * Meetups
  * Questions
  * RSVPs
*/
export const userModel = {
  id: Number,
  firstname: String,
  lastname: String,
  othername: String,
  email: String,
  username: String,
  phoneNumber: String,
  registered: Date,
  isAdmin: Boolean,
};

export const meetupModel = {
  id: Number,
  createdOn: Date,
  location: String,
  images: [String, String],
  topic: String,
  happeningOn: Date,
  tags: [String, String],
};

export const question = {
  id: Number,
  createdOn: Date,
  createdBy: Number,
  meetup: Number,
  title: String,
  body: String,
  votes: Number,
};

export const rsvp = {
  id: Number,
  meetup: Number,
  user: Number,
  response: String,
};

/*
  * Export database
*/
export default {
  users: [{
    id: 12345678,
    firstname: 'Luke',
    lastname: 'Skywalker',
    othername: 'Korl',
    email: 'korlmarcus@oldrepublic.com',
    username: 'Korl Marcus',
    phoneNumber: '+1234567890',
    registered: new Date(),
    isAdmin: true,
  }],

  meetups: [{
    id: 11223344,
    createdOn: new Date(),
    location: 'Felucia',
    images: ['http://image1.jpg', 'http://image2.jpg'],
    topic: 'Republic or Separatist',
    happeningOn: new Date('4019/01/07-11:00'),
    tags: ['republic', 'separatist'],
  }],
};
