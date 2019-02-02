import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  location: 'Outer Rim',
  images: ['http://image1.jpg', 'http://image2.jpg'],
  topic: 'The New Threat ',
  happeningOn: '2019/01/07-11:00',
  tags: ['jedi', 'sith'],
};

let id;


describe('POST /api/v1/meetups', () => {
  it('should create a new Meetup in db', () => chai.request(server)
    .post('/api/v1/meetups')
    .type('form')
    .send(data)
    .then((res) => {
      const body = res.body.data;
      // eslint-disable-next-line prefer-destructuring
      id = body.id;
      expect(res).to.have.status(201);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('location');
      expect(body).to.have.property('images');
      expect(body).to.have.property('happeningOn');
      expect(body).to.have.property('tags');
    }));

  const noLocation = { ...data }; // copy data
  noLocation.location = '';
  it('should return error if location is missing', () => chai.request(server)
    .post('/api/v1/meetups')
    .type('form')
    .send(noLocation)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    }));
});


describe('GET /api/v1/meetups', () => {
  it('should get all meetups in db', () => chai.request(server)
    .get('/api/v1/meetups')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('topic');
      expect(res.body.data[0]).to.have.property('createdOn');
      expect(res.body.data[0]).to.have.property('location');
      expect(res.body.data[0]).to.have.property('images');
      expect(res.body.data[0]).to.have.property('happeningOn');
      expect(res.body.data[0]).to.have.property('tags');
    }));
});


describe('GET /api/v1/meetups/upcoming', () => {
  it('should get all upcoming meetups in db', () => chai.request(server)
    .get('/api/v1/meetups/upcoming')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('createdOn');
      expect(res.body.data[0]).to.have.property('location');
      expect(res.body.data[0]).to.have.property('images');
      expect(res.body.data[0]).to.have.property('happeningOn');
      expect(res.body.data[0]).to.have.property('tags');
    }));
});


describe('GET /api/v1/meetups:id', () => {
  it('should get a meetup from db', () => chai.request(server)
    .get(`/api/v1/meetups/${id}`)
    .then((res) => {
      const body = res.body.data;
      expect(res).to.have.status(200);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('location');
      expect(body).to.have.property('images');
      expect(body).to.have.property('happeningOn');
      expect(body).to.have.property('tags');
    }));

  it('should return error for invalid/deleted data', () => chai.request(server)
    .get('/api/v1/meetups/INVALID_ID')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    }));
});

describe('PATCH /api/v1/meetups/:id', () => {
  it('should update an existing Meetup in db', () => chai.request(server)
    .patch(`/api/v1/meetups/${id}`)
    .type('form')
    .send({ location: 'Christophsys' })
    .then((res) => {
      const body = res.body.data;
      expect(res).to.have.status(200);
      expect(body).to.have.property('id');
      expect(body).to.have.property('createdOn');
      expect(body).to.have.property('location');
      expect(body).to.have.property('images');
      expect(body).to.have.property('happeningOn');
      expect(body).to.have.property('tags');
    }));

  it('should return error for invalid/deleted data', () => chai.request(server)
    .patch('/api/v1/meetups/INVALID_ID')
    .send({})
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    }));
});

describe('DELETE /api/v1/meetups/:id', () => {
  it('should delete an existing Meetup in db', () => chai.request(server)
    .delete(`/api/v1/meetups/${id}`)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.eql('meetup deleted');
    }));

  it('should return error for invalid/deleted data', () => chai.request(server)
    .delete(`/api/v1/meetups/${id}`)
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    }));
});
