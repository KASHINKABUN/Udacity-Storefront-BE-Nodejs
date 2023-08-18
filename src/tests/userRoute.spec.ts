import supertest from 'supertest';
import app from '../index';
import { UserModel } from '../models';
const request = supertest(app);

const TOKEN_SECRET = 'sdhasjkdhjkashuir2314jk23h5kjhljlikj4312';
describe('user model', () => {
  const USER_MODEL = new UserModel();
  it('all method should be defined', () => {
    expect(USER_MODEL.index).toBeDefined();
    expect(USER_MODEL.create).toBeDefined();
    expect(USER_MODEL.updateFullName).toBeDefined();
    expect(USER_MODEL.authenticate).toBeDefined();
    expect(USER_MODEL.changePassword).toBeDefined();
    expect(USER_MODEL.delete).toBeDefined();
    expect(USER_MODEL.show).toBeDefined();
    expect(USER_MODEL.getUserByUsername).toBeDefined();
  });

  describe('user-information api', () => {
    it('Missed password', async () => {
      const result = await request
        .post('/user-information')
        .send({ username: 'test', fullname: 'test' });
      expect(result.status).toEqual(406);
      expect(JSON.parse(result.text).message).toEqual('API missing password');
    });

    it('Missed user name', async () => {
      const result = await request
        .post('/user-information')
        .send({ fullname: 'test' });
      expect(result.status).toEqual(406);
      expect(JSON.parse(result.text).message).toEqual('API missing username');
    });

    it('Missed full name', async () => {
      const result = await request
        .post('/user-information')
        .send({ username: 'test', pass_word: 'test' });
      expect(result.status).toEqual(406);
      expect(JSON.parse(result.text).message).toEqual('API missing fullname');
    });

    describe('create user', () => {
      it('Should create user successfully', async () => {
        request
          .post('/user-information')
          .send({ username: 'test', pass_word: 'test', fullname: 'test' })
          .expect(200);
      });
    });
  });

  describe('get users api', () => {
    it('get successfully', async () => {
      request.get('/users').expect(200);
    });
  });

  describe('validate information api', () => {
    it('missing user name', async () => {
      const result = await request.post('/validate-information').send({});
      expect(result.status).toEqual(406);
    });

    it('missing password', async () => {
      const result = await request
        .post('/validate-information')
        .send({ username: 'test' });
      expect(result.status).toEqual(406);
    });

    it('should return token', async () => {
      process.env.TOKEN_SECRET = TOKEN_SECRET;
      request
        .post('/validate-information')
        .send({ username: 'test', pass_word: 'test' })
        .expect(200);
    });
  });

  describe('update user information api', () => {
    it('invalid body data', () => {
      request.put('/user-information').send({}).expect(406);
      request.put('/user-information').send({ fullname: 'test' }).expect(406);
      request
        .put('/user-information')
        .send({ fullname: 'test', username: 'test' })
        .expect(406);
    });

    it('valid body data', async () => {
      process.env.TOKEN_SECRET = TOKEN_SECRET;
      const result = await request
        .post('/validate-information')
        .send({ username: 'test', pass_word: 'test' });
      request
        .put('/user-information')
        .send({ fullname: 'test', username: 'test' })
        .set({ authorization: JSON.parse(result.text)?.data || '' })
        .expect(200);
    });
  });

  describe('update user password api', () => {
    it('invalid body data', () => {
      request.put('/user-password').send({}).expect(406);
      request.put('/user-password').send({ username: 'test' }).expect(406);
      request
        .put('/user-password')
        .send({ username: 'test', old_password: 'test' })
        .expect(406);
      request
        .put('/user-password')
        .send({ username: 'test', old_password: 'test', new_password: 'test' })
        .expect(406);
    });

    it('valid body data', async () => {
      process.env.TOKEN_SECRET = TOKEN_SECRET;
      const result = await request
        .post('/validate-information')
        .send({ username: 'test', pass_word: 'test' });
      request
        .put('/user-password')
        .send({ username: 'test', old_password: 'test', new_password: 'test' })
        .set({ authorization: JSON.parse(result.text)?.data || '' })
        .expect(200);
    });
  });
});
