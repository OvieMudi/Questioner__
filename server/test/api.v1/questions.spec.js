import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

chai.use(chaiHttp);

const data = {
  meetup: 2,
  title: 'Should we bring our weapons?',
  body: "Just saying... Since we're a group that hate each other.",
};
const credentials = {
  username: 'bobba',
  password: 'StrongPassword',
};
let id;
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


describe('POST /api/v1/questions', () => {
  it('should create a new question to db', () => chai.request(server)
    .post('/api/v1/questions')
    .set('x-access-token', jwtToken)
    .type('form')
    .send(data)
    .then((res) => {
      // eslint-disable-next-line prefer-destructuring
      id = res.body.data.id;
      const body = res.body.data;
      expect(res).to.have.status(201);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('createdBy');
      expect(body).to.have.property('meetup');
      expect(body).to.have.property('title');
      expect(body).to.have.property('body');
      expect(body).to.have.property('votes');
    }));
});

describe('GET /api/v1/questions', () => {
  it('should get all questions from db', () => chai.request(server)
    .get('/api/v1/questions')
    .set('x-access-token', jwtToken)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('createdOn');
      expect(res.body.data[0]).to.have.property('createdBy');
      expect(res.body.data[0]).to.have.property('meetup');
      expect(res.body.data[0]).to.have.property('title');
      expect(res.body.data[0]).to.have.property('body');
      expect(res.body.data[0]).to.have.property('votes');
    }));
});

describe('GET /api/v1/questions/:id', () => {
  it('should get one questions from db using id', () => chai.request(server)
    .get(`/api/v1/questions/${id}`)
    .set('x-access-token', jwtToken)
    .then((res) => {
      const body = res.body.data;
      expect(res).to.have.status(200);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('createdBy');
      expect(body).to.have.property('meetup');
      expect(body).to.have.property('title');
      expect(body).to.have.property('body');
      expect(body).to.have.property('votes');
    }));
});

describe('PATCH /api/v1/questions/:id', () => {
  it('should update a question in db using id', () => chai.request(server)
    .patch(`/api/v1/questions/${id}`)
    .set('x-access-token', jwtToken)
    .type('form')
    .send({ title: 'How to kill Vader' })
    .then((res) => {
      const body = res.body.data;
      expect(res).to.have.status(200);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('createdBy');
      expect(body).to.have.property('meetup');
      expect(body).to.have.property('title');
      expect(body).to.have.property('body');
      expect(body).to.have.property('votes');
    }));
});

describe('PATCH /api/v1/questions/:id/upvote', () => {
  it('should increase question votes by 1', () => chai.request(server)
    .patch(`/api/v1/questions/${id}/upvote`)
    .set('x-access-token', jwtToken)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('votes').eql(1);
    }));
});

describe('PATCH /api/v1/questions/:id/downvote', () => {
  it('should decrease question votes by 1', () => chai.request(server)
    .patch(`/api/v1/questions/${id}/downvote`)
    .set('x-access-token', jwtToken)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('votes').eql(0);
    }));
});

describe('DELETE /api/v1/questions/:id', () => {
  it('should update a question in db using id', () => chai.request(server)
    .delete(`/api/v1/questions/${id}`)
    .set('x-access-token', jwtToken)
    .then((res) => {
      expect(res).to.have.status(200);
    }));
});
