import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  firstname: 'Luke',
  lastname: 'Skywalker',
  othername: 'Vaderson',
  email: 'luke@oldrepublic.com',
  phoneNumber: '00661234567',
  username: 'skywalker',
};
let id;

function userTests() {
  describe('POST /api/v1/users', () => {
    it('should create a new User in db', () => chai.request(server)
      .post('/api/v1/users')
      .type('form')
      .send(data)
      .then((res) => {
        // eslint-disable-next-line prefer-destructuring
        id = res.body.data[res.body.data.length - 1].id;
        expect(res).to.have.status(201);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname').eql('Luke');
        expect(res.body.data[0]).to.have.property('lastname').eql('Skywalker');
        expect(res.body.data[0]).to.have.property('othername').eql('Vaderson');
        expect(res.body.data[0]).to.have.property('email').eql('luke@oldrepublic.com');
        expect(res.body.data[0]).to.have.property('phoneNumber').eql('00661234567');
        expect(res.body.data[0]).to.have.property('username').eql('skywalker');
        expect(res.body.data[0]).to.have.property('registered');
        expect(res.body.data[0]).to.have.property('isAdmin').that.is.a('boolean');
      }));
  });
  describe('GET /api/v1/users', () => {
    it('should get all Users in db', () => chai.request(server)
      .get('/api/v1/users')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('othername');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('phoneNumber');
        expect(res.body.data[0]).to.have.property('username');
        expect(res.body.data[0]).to.have.property('registered');
        expect(res.body.data[0]).to.have.property('isAdmin');
      }));
  });
  describe('GET /api/v1/users/:id', () => {
    it('should get information of a User from db', () => chai.request(server)
      .get(`/api/v1/users/${id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('othername');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('phoneNumber');
        expect(res.body.data[0]).to.have.property('username');
        expect(res.body.data[0]).to.have.property('registered');
        expect(res.body.data[0]).to.have.property('isAdmin');
      }));
    it('should not find user with invalid id', () => chai.request(server)
      .get('/api/v1/users/_INVALID_ID_')
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').eql('user does not exist');
      }));
  });
  describe('Patch /api/v1/users', () => {
    it('should update a User record in db', () => chai.request(server)
      .patch(`/api/v1/users/${id}`)
      .type('form')
      .send({ othername: 'Last Jedi Master' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('othername').eql('Last Jedi Master');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('phoneNumber');
        expect(res.body.data[0]).to.have.property('username');
        expect(res.body.data[0]).to.have.property('registered');
        expect(res.body.data[0]).to.have.property('isAdmin');
      }));
  });
  describe('DELETE /api/v1/users/:id', () => {
    it('should update User information', () => chai.request(server)
      .delete(`/api/v1/users/${id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('user deleted');
      }));
    it('should not find deleted data', () => chai.request(server)
      .delete(`/api/v1/users/${id}`)
      .then((res) => {
        expect(res).to.have.status(404);
      }));
  });
}

export default userTests;
