import userTests from './api.v1/users.spec';
import meetupTests from './api.v1/meetups.spec';

describe('Api routes', () => {
  userTests();
  meetupTests();
});
