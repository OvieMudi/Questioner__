import usersTests from './api.v1/users.spec';
import meetupsTests from './api.v1/meetups.spec';
import questionsTests from './api.v1/questions.spec';

describe('Api routes', () => {
  questionsTests();
  meetupsTests();
  usersTests();
});
