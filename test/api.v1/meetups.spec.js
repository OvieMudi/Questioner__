import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  location: 'Outer Rim',
  images: ['http://image1.jpg', 'http://image2.jpg'],
  topic: 'The New Threat',
  happeningOn: '2019/01/07-11:00',
  tags: ['jedi', 'sith'],
};
let id;

function meetupTests() {
  describe('POST /api/v1/meetups', () => {
    it('should create a new Meetup in db', () => chai.request(server)
      .post('/api/v1/meetups')
      .type('form')
      .send(data)
      .then((res) => {
        // eslint-disable-next-line prefer-destructuring
        id = res.body.data[res.body.data.length - 1].id;
        expect(res).to.have.status(201);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('createdOn');
        expect(res.body.data[0]).to.have.property('location');
        expect(res.body.data[0]).to.have.property('images');
        expect(res.body.data[0]).to.have.property('happeningOn');
        expect(res.body.data[0]).to.have.property('tags');
      }));
  });

  describe('GET /api/v1/meetups', () => {
    it('should get all meetups in db', () => chai.request(server)
      .get('/api/v1/meetups')
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
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('createdOn');
        expect(res.body.data[0]).to.have.property('location');
        expect(res.body.data[0]).to.have.property('images');
        expect(res.body.data[0]).to.have.property('happeningOn');
        expect(res.body.data[0]).to.have.property('tags');
      }));
  });

  describe('PATCH /api/v1/meetups/:id', () => {
    it('should update an existing Meetup in db', () => chai.request(server)
      .patch(`/api/v1/meetups/${id}`)
      .type('form')
      .send({ location: 'Christophsys' })
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

  describe('DELETE /api/v1/meetups/:id', () => {
    it('should delete an existing Meetup in db', () => chai.request(server)
      .delete(`/api/v1/meetups/${id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('meetup deleted');
      }));
  });
}

export default meetupTests;
