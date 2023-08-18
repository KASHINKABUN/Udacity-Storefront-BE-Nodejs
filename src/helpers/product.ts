import { PRODUCT } from '../type';

export const getTotalProductPrice = (products: PRODUCT[]) => {
  let sum = 0;
  products.forEach((product: PRODUCT) => {
    const price: number = Number(product.discount_price.split('$')[0]);
    sum += price;
  });
  return sum;
};
