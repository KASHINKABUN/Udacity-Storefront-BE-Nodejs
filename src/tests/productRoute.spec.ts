import supertest from 'supertest';
import app from '../index';
import { ProductModel } from '../models';
const request = supertest(app);
describe('product model', () => {
  const PRODUCT_MODEL = new ProductModel();
  it('all method should be defined', () => {
    expect(PRODUCT_MODEL.index).toBeDefined();
    expect(PRODUCT_MODEL.createProduct).toBeDefined();
    expect(PRODUCT_MODEL.show).toBeDefined();
  });
  describe('get product list api', () => {
    it('invalid token', () => {
      request.get('/products').expect(406);
      request.get('/products').set({ authorization: 'Bearer' }).expect(406);
    });

    it('valid token', async () => {
      process.env.TOKEN_SECRET = 'sdhasjkdhjkashuir2314jk23h5kjhljlikj4312';
      const result = await request
        .post('/validate-information')
        .send({ username: 'test', pass_word: 'test' });
      request
        .get('products')
        .set({ authorization: JSON.parse(result.text)?.data || '' })
        .expect(200);
    });
  });

  describe('create product api', () => {
    it('invalid body data', () => {
      request.post('/product').send({}).expect(406);
      request.post('/product').send({ product_name: 'test' }).expect(406);
      request
        .post('/product')
        .send({ product_name: 'test', product_image: 'test' })
        .expect(406);
      request
        .post('/product')
        .send({
          product_name: 'test',
          product_image: 'test',
          product_description: 'test',
        })
        .expect(406);
      request
        .post('/product')
        .send({
          product_name: 'test',
          product_image: 'test',
          product_description: 'test',
          first_price: 500,
        })
        .expect(406);
      request
        .post('/product')
        .send({
          product_name: 'test',
          product_image: 'test',
          product_description: 'test',
          discount_price: 500,
        })
        .expect(406);
    });

    it('create product successfully', async () => {
      process.env.TOKEN_SECRET = 'sdhasjkdhjkashuir2314jk23h5kjhljlikj4312';
      const result = await request
        .post('/validate-information')
        .send({ username: 'test', pass_word: 'test' });
      request
        .post('/product')
        .set({ authorization: JSON.parse(result.text)?.data || '' })
        .send({
          product_name: 'test',
          product_image: 'test',
          product_description: 'test',
          first_price: 600,
          discount_price: 500,
        })
        .expect(200);
    });
  });
});
