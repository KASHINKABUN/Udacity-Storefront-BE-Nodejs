import { Application, Request, Response } from 'express';
import { OrderModel } from '../models/orderModel';
import { ORDER, ORDER_RES, PRODUCT } from '../type';
import {
  CartModel,
  CartProductModel,
  OrderProductModel,
  ProductModel,
} from '../models';
import { BaseResponse } from '../common';
import { isBodyUserId, isParamUserId, verifyAuthToken } from '../middleware';
import { isBodyProductsInfo } from '../middleware/order';
import { getTotalProductPrice } from '../helpers';

const orderRoute = (app: Application) => {
  app.get('/order/:user_id', [verifyAuthToken, isParamUserId], getOrder);
  app.post(
    '/order',
    [verifyAuthToken, isBodyUserId, isBodyProductsInfo],
    createOrder,
  );
};

const ORDER_MODEL = new OrderModel();
const ORDER_PRODUCT_MODEL = new OrderProductModel();
const PRODUCT_MODEL = new ProductModel();
const CART_PRODUCT_MODEL = new CartProductModel();
const CART_MODEL = new CartModel();

const totalProductPrice = async (
  products: Array<{ id: number; product_number: number }>,
) => {
  const productList: PRODUCT[] = await Promise.all(
    products.map((product: { id: number; product_number: number }) =>
      PRODUCT_MODEL.show(product.id),
    ),
  );
  return getTotalProductPrice(productList);
};

const createOrder = async (req: Request, res: Response) => {
  const product_list_id = req.body.products;
  const total = await totalProductPrice(req.body.products);
  ORDER_MODEL.createOrder({
    ...req.body,
    status: 'SHIPPING',
    description: 'Your order now is shipping to your address!',
    total: total,
    method: 'CREDIT',
  }).then((rsData: ORDER) => {
    product_list_id.forEach(
      (new_product: { id: number; product_number: number }) => {
        ORDER_PRODUCT_MODEL.createOrderProduct({
          ...req.body,
          id: rsData.id,
          product_id: new_product.id,
          product_number: new_product.product_number,
        }).then(() => {});
        CART_PRODUCT_MODEL.deleteCartProducts(req.body.cart_id).then(() => {
          CART_MODEL.deleteCart(req.body.cart_id);
        });
      },
    );
    res
      .status(200)
      .json(BaseResponse({ message: 'Create order successfully' }));
  });
};

const getOrder = (req: Request, res: Response) => {
  const user_id = req.params.user_id as unknown as number;
  ORDER_MODEL.getProductById(user_id).then((data: Array<ORDER_RES>) => {
    try {
      const result = data.reduce(
        (
          group: { [key: number | string]: Array<unknown> },
          product: ORDER_RES,
        ) => {
          const { order_id } = product;
          group[order_id] = group[order_id] ?? [];
          group[order_id].push(product);
          return group;
        },
        {},
      );
      ORDER_MODEL.getOrderByUserId(user_id).then((rsData: ORDER[]) => {
        res.status(200).json(
          BaseResponse({
            data: {
              orders: rsData,
              products: result,
            },
            message: 'Get order information successfully',
          }),
        );
      });
    } catch (error) {}
  });
};

export default orderRoute;
