import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.use(chaiHttp);

const credentials = {
  username: 'bobba',
  password: 'StrongPassword',
};
let jwtToken;

before((done) => {
  chai
    .request(server)
    .post('/api/v1/auth/signin')
    .type('form')
    .send({
      username: credentials.username,
      password: credentials.password,
    })
    .end((err, res) => {
      jwtToken = res.body.data.token;
      done();
    });
});

describe('POST /api/v1/meetups/:id/rsvps', () => {
  it('should create a meetup rsvp status', (done) => {
    chai
      .request(server)
      .post('/api/v1/meetups/2/rsvps')
      .set('x-access-token', jwtToken)
      .type('form')
      .send({ response: 'yes' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.have.property('meetup');
        expect(res.body.data).to.have.property('topic');
        expect(res.body.data).to.have.property('status');
        done(err);
      });
  });
});

describe('GET /api/v1/meetups/:id/rsvps', () => {
  it('should get a meetup rsvp status', (done) => {
    chai
      .request(server)
      .get('/api/v1/meetups/2/rsvps')
      .set('x-access-token', jwtToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('meetup');
        done(err);
      });
  });
});
