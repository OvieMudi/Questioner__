import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/index';

chai.use(chaiHttp);

const data = {
  title: 'Should we bring our weapons?',
  body: "Just saying... Since we're a group that hate each other.",
  meetup: 11223344,
};
let id;


describe('POST /api/v1/questions', () => {
  it('should create a new question to db', () => chai.request(server)
    .post('/api/v1/questions')
    .type('form')
    .send(data)
    .then((res) => {
      // eslint-disable-next-line prefer-destructuring
      id = res.body.data[res.body.data.length - 1].id;
      expect(res).to.have.status(201);
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('createdOn');
      expect(res.body.data[0]).to.have.property('createdBy');
      expect(res.body.data[0]).to.have.property('meetup');
      expect(res.body.data[0]).to.have.property('title');
      expect(res.body.data[0]).to.have.property('body');
      expect(res.body.data[0]).to.have.property('votes');
    }));
});

describe('GET /api/v1/questions', () => {
  it('should get all questions from db', () => chai.request(server)
    .get('/api/v1/questions')
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

describe('PATCH /api/v1/questions/:id', () => {
  it('should update a question in db using id', () => chai.request(server)
    .patch(`/api/v1/questions/${id}`)
    .type('form')
    .send({ title: 'How to kill Vader', body: '' })
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

describe('PATCH /api/v1/questions/:id', () => {
  it('should increase question votes by 1', () => chai.request(server)
    .patch(`/api/v1/questions/${id}/upvote`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('votes').eql(1);
    }));
});

describe('PATCH /api/v1/questions/:id', () => {
  it('should decrease question votes by 1', () => chai.request(server)
    .patch(`/api/v1/questions/${id}/downvote`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('votes').eql(0);
    }));
});

describe('DELETE /api/v1/questions/:id', () => {
  it('should update a question in db using id', () => chai.request(server)
    .delete(`/api/v1/questions/${id}`)
    .then((res) => {
      expect(res).to.have.status(200);
    }));
});
