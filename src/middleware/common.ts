import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../common';
import jwt from 'jsonwebtoken';

export const isHeaderToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    res
      .status(406)
      .json(BaseResponse({ message: 'API missing authorization' }));
    return;
  }
  next();
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization || '';
  const token = authorizationHeader.split('Bearer ')[1];
  if (!token || !authorizationHeader) {
    res.status(409).json(BaseResponse({ message: 'Token was missing' }));
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET || '', (error) => {
    if (error) {
      res
        .status(409)
        .json(BaseResponse({ message: error?.message || 'Token is invalid' }));
      return;
    }
    next();
  });
};
