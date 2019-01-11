import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

const meetupData = {
  location: 'Outer Rim',
  images: ['http://image1.jpg', 'http://image2.jpg'],
  topic: 'The New Threat',
  happeningOn: '2019/01/07-11:00',
  tags: ['jedi', 'sith'],
};
let id;

// create new meetup
before(() => {
  chai.request(server)
    .post('/api/v1/meetups/')
    .type('form')
    .send(meetupData)
    .then((res) => {
      // eslint-disable-next-line prefer-destructuring
      id = res.body.data.id;
    });
});
// delete created meetup
after(() => {
  chai.request(server)
    .delete(`/api/v1/meetups/${id}`)
    .then();
});

describe('POST /api/v1/meetups/:id/rsvps', () => {
  it('create a meetup rsvp status', () => chai.request(server)
    .post(`/api/v1/meetups/${id}/rsvps`)
    .type('form')
    .send({ response: 'yes' })
    .then((res) => {
      expect(res).to.have.status(201);
      expect(res.body.data).to.have.property('meetup');
      expect(res.body.data).to.have.property('topic');
      expect(res.body.data).to.have.property('status');
    }));
});


describe('GET /api/v1/meetups/:id/rsvps', () => {
  it('create a meetup rsvp status', () => chai.request(server)
    .get(`/api/v1/meetups/${id}/rsvps`)
    .then((res) => {
      expect(res).to.have.status(200);
    }));
});
