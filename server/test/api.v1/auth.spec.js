import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../app';

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  firstname: 'luke',
  lastname: 'skywalker',
  othername: 'vaderson',
  email: 'luke@oldrepublic.com',
  phoneNumber: '00661234567',
  username: 'skywalker',
  password: 'StrongPassword',
};
describe('POST /api/v1/auth/signup', () => {
  it('should #create a new User and #generate jwt', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(data)
      .end((err, res) => {
        const resData = res.body.data;
        const { user } = resData;
        expect(res).to.have.status(201);
        expect(resData).to.have.property('token');
        expect(user).to.have.property('id');
        expect(user)
          .to.have.property('firstname')
          .eql('luke');
        expect(user)
          .to.have.property('lastname')
          .eql('skywalker');
        expect(user)
          .to.have.property('othername')
          .eql('vaderson');
        expect(user)
          .to.have.property('email')
          .eql('luke@oldrepublic.com');
        expect(user)
          .to.have.property('phoneNumber')
          .eql('00661234567');
        expect(user)
          .to.have.property('username')
          .eql('skywalker');
        expect(user).to.have.property('registered');
        expect(user)
          .to.have.property('isAdmin')
          .that.is.a('boolean');
        done(err);
      });
  });
});

describe('POST /api/v1/auth/signin', () => {
  it('should #sign in a user and #generate jwt', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({
        username: data.username,
        password: data.password,
      })
      .end((err, res) => {
        const resData = res.body.data;
        const { user } = resData;
        expect(res).to.have.status(201);
        expect(resData).to.have.property('token');
        expect(user).to.have.property('id');
        expect(user)
          .to.have.property('firstname')
          .eql('luke');
        expect(user)
          .to.have.property('lastname')
          .eql('skywalker');
        expect(user)
          .to.have.property('othername')
          .eql('vaderson');
        expect(user)
          .to.have.property('email')
          .eql('luke@oldrepublic.com');
        expect(user)
          .to.have.property('phoneNumber')
          .eql('00661234567');
        expect(user)
          .to.have.property('username')
          .eql('skywalker');
        expect(user).to.have.property('registered');
        expect(user)
          .to.have.property('isAdmin')
          .that.is.a('boolean');
        done(err);
      });
  });
});
