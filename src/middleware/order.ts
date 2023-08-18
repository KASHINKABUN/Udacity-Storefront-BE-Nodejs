import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../common';

export const isBodyProductsInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  type ProductInformation = { id: number; product_number: number };
  const products = req.body.products as Array<ProductInformation>;
  if (!products || !products.length) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API missing product information' }));
    return;
  }
  const result = products.findIndex((product: ProductInformation) => {
    return (
      !product.id ||
      !product.product_number ||
      typeof product.id != 'number' ||
      typeof product.product_number !== 'number' ||
      product.product_number <= 0
    );
  });
  if (result !== -1) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API product information is invalid' }));
    return;
  }
  next();
};
