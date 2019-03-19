import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

const { expect } = chai;
chai.use(chaiHttp);

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

describe('GET /api/v1/users', () => {
  it('should get all Users in db', () => chai
    .request(server)
    .get('/api/v1/users')
    .set('x-access-token', jwtToken)
    .then((res) => {
      const data1 = res.body.data[0];
      // eslint-disable-next-line prefer-destructuring
      id = res.body.data[1].id;
      expect(res).to.have.status(200);
      expect(data1).to.have.property('id');
      expect(data1).to.have.property('firstname');
      expect(data1).to.have.property('lastname');
      expect(data1).to.have.property('othername');
      expect(data1).to.have.property('email');
      expect(data1).to.have.property('phoneNumber');
      expect(data1).to.have.property('username');
      expect(data1).to.have.property('registered');
      expect(data1).to.have.property('isAdmin');
    }));
});

describe('GET /api/v1/users/:id', () => {
  it('should get information of a User from db', (done) => {
    chai
      .request(server)
      .get(`/api/v1/users/${id}`)
      .end((err, res) => {
        const body = res.body.data;
        expect(res).to.have.status(200);
        expect(body).to.have.property('id');
        expect(body).to.have.property('firstname');
        expect(body).to.have.property('lastname');
        expect(body).to.have.property('othername');
        expect(body).to.have.property('email');
        expect(body).to.have.property('phoneNumber');
        expect(body).to.have.property('username');
        expect(body).to.have.property('registered');
        expect(body).to.have.property('isAdmin');
        done(err);
      });
  });
  it('should not find user with invalid id', (done) => {
    chai
      .request(server)
      .get('/api/v1/users/_INVALID_ID_')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property('error')
          .eql('user does not exist');
        done(err);
      });
  });
});

describe('PATCH /api/v1/users/:id', () => {
  it('should update a User record in db', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/users/${id}`)
      .set('x-access-token', jwtToken)
      .type('form')
      .send({ othername: 'LastJediMaster' })
      .end((err, res) => {
        const body = res.body.data;
        expect(res).to.have.status(200);
        expect(body).to.have.property('id');
        expect(body).to.have.property('firstname');
        expect(body).to.have.property('lastname');
        expect(body)
          .to.have.property('othername')
          .eql('lastjedimaster');
        expect(body).to.have.property('email');
        expect(body).to.have.property('phoneNumber');
        expect(body).to.have.property('username');
        expect(body).to.have.property('registered');
        expect(body).to.have.property('isAdmin');
        done(err);
      });
  });
});

describe('DELETE /api/v1/users/:id', () => {
  it('should delete User information', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/users/${id}`)
      .set('x-access-token', jwtToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.eql('user deleted');
        done(err);
      });
  });
  it('should not find deleted data', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/users/${id}`)
      .set('x-access-token', jwtToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });
});
