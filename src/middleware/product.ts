import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../common';

export const isParamProductId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.id) {
    res.status(406).json(BaseResponse({ message: 'API missing product id' }));
    return;
  }
  next();
};

export const isBodyProductName = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.product_name) {
    res.status(406).json(BaseResponse({ message: 'API missing product name' }));
    return;
  }
  next();
};

export const isBodyPrice = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.first_price || !req.body.discount_price) {
    res
      .status(406)
      .json(
        BaseResponse({ message: 'API missing first price or discount price' }),
      );
    return;
  }
  next();
};

export const isBodyProductDescription = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.product_description) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API missing product description' }));
    return;
  }
  next();
};

export const isBodyProductImage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.product_image) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API missing product image' }));
    return;
  }
  next();
};
