import supertest from 'supertest';
import app from '../index';
import { OrderModel, UserModel } from '../models';
import { ORDER, USER } from '../type';
const request = supertest(app);

describe('Order model', () => {
  const ORDER_MODEL = new OrderModel();
  let token: string;
  beforeEach(async () => {
    const result = await request
      .post('/validate-information')
      .send({ username: 'test', pass_word: 'test' });
    token = JSON.parse(result.text)?.data || '';
  });

  it('all method should be defined', () => {
    expect(ORDER_MODEL.index).toBeDefined();
    expect(ORDER_MODEL.getProductById).toBeDefined();
    expect(ORDER_MODEL.createOrder).toBeDefined();
    expect(ORDER_MODEL.updateCart).toBeDefined();
  });

  describe('create order api', () => {
    it('invalid request', () => {
      request.post('/order').expect(406);
      request.post('/order').send({ product_id: 1 }).expect(406);
      request.post('/order').send({ product_id: 1, user_id: 1 }).expect(406);
      request
        .post('/order')
        .send({ product_id: 1, user_id: 1, product_number: 1 })
        .expect(406);
    });

    it('create order successfully', async () => {
      request
        .post('/order')
        .set({ authorization: token })
        .send({ product_id: 1, user_id: 1, product_number: 1 })
        .expect(200);
    });
  });

  describe('get order api', () => {
    it('invalid param', () => {
      request.get('/order/1').expect(406);
    });

    it('get order successfully', () => {
      request.get('/order/1').set({ authorization: token }).expect(200);
    });
  });

  describe('update number of product in order', () => {
    it('invalid request', () => {
      request.put('/order/1').set({ authorization: token }).expect(406);
      request.put('/order/1').send({ product_id: 1 }).expect(406);
      request
        .put('/order/1')
        .send({ product_id: 1, product_number: 100 })
        .expect(406);
      request
        .put('/order/1')
        .send({ product_id: 1, product_number: 100, user_id: 1 })
        .expect(406);
    });

    it('update successfully', () => {
      request
        .put('/order/1')
        .set({ authorization: token })
        .send({ product_id: 1, product_number: 100, user_id: 1 })
        .expect(200);
    });
  });

  describe('delete order product API', () => {
    it('invalid request', () => {
      request.delete('/order').set({ authorization: token }).expect(406);
      request
        .delete('/order?order_id=1')
        .set({ authorization: token })
        .expect(406);
      request.delete('/order?order_id=1&product_id=1').expect(406);
    });

    it('delete order product successfully', () => {
      request
        .delete('/order?order_id=1&product_id=1')
        .set({ authorization: token })
        .expect(200);
    });
  });
});
