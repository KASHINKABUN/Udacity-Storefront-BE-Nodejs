import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../common';

export const isParamUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.user_id) {
    res.status(406).json(BaseResponse({ message: 'API missing user id' }));
    return;
  }
  next();
};

export const isBodyProductId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.product_id) {
    res.status(406).json(BaseResponse({ message: 'API missing product id' }));
    return;
  }
  next();
};

export const isBodyUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.user_id) {
    res.status(406).json(BaseResponse({ message: 'API missing user id' }));
    return;
  }
  next();
};

export const isBodyProductNumber = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.product_number) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API missing product number' }));
    return;
  }
  next();
};

export const isParamCartId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.cart_id) {
    res.status(406).json(BaseResponse({ message: 'API missing cart id' }));
    return;
  }
  next();
};

export const isQueryCartId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.cart_id) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API query missing cart id' }));
    return;
  }
  next();
};

export const isQueryProductId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.product_id) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API query missing product id' }));
    return;
  }
  next();
};
