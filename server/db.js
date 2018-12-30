/*
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
  Tags: [String, String],
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
    id: 1234567,
    firstname: 'Luke',
    lastname: 'Skywalker',
    othername: 'Korl',
    email: 'korlmarcus@oldrepublic.com',
    username: 'Korl Marcus',
    phoneNumber: '+1234567890',
    registered: new Date(),
    isAdmin: true,
  }],
};
