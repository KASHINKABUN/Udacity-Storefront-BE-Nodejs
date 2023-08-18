import { Application, Request, Response } from 'express';
import { ProductModel } from '../models';
import { PRODUCT } from '../type';
import { BaseResponse } from '../common';
import {
  isBodyPrice,
  isBodyProductDescription,
  isParamProductId,
  isBodyProductImage,
  isBodyProductName,
  verifyAuthToken,
} from '../middleware';

const productRoute = (app: Application) => {
  app.get('/products', [verifyAuthToken], getProductList);
  app.get('/product', [isParamProductId, verifyAuthToken], getProductDetail);
  app.post(
    '/product',
    [
      isBodyProductName,
      isBodyProductImage,
      isBodyProductDescription,
      isBodyPrice,
      verifyAuthToken,
    ],
    createProduct,
  );
};

const PRODUCT_MODEL = new ProductModel();

const getProductList = (req: Request, res: Response) => {
  PRODUCT_MODEL.index()
    .then((data: PRODUCT[]) => {
      res.status(200).json(
        BaseResponse({
          data: data,
          message: 'Get product list successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const getProductDetail = (req: Request, res: Response) => {
  PRODUCT_MODEL.show(Number(req.query.id))
    .then((data: PRODUCT) => {
      res
        .status(200)
        .json(
          BaseResponse({ data: data, message: 'Get product successfully' }),
        );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const createProduct = (req: Request, res: Response) => {
  const {
    product_name,
    first_price,
    discount_price,
    product_description,
    product_image,
  } = req.body;
  PRODUCT_MODEL.createProduct({
    product_name,
    first_price,
    discount_price,
    product_description,
    product_image,
  } as PRODUCT)
    .then((data: PRODUCT) => {
      res
        .status(200)
        .json(
          BaseResponse({ data: data, message: 'Create product successfully' }),
        );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

export default productRoute;
