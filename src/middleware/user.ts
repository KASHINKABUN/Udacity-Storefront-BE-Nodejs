import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../common';

export const isBodyPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.pass_word) {
    res.status(406).json(BaseResponse({ message: 'API missing password' }));
    return;
  }
  next();
};

export const isBodyUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.username) {
    res.status(406).json(BaseResponse({ message: 'API missing username' }));
    return;
  }
  next();
};

export const isBodyFullname = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.fullname) {
    res.status(406).json(BaseResponse({ message: 'API missing fullname' }));
    return;
  }
  next();
};

export const isQueryUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.username) {
    res.status(406).json(BaseResponse({ message: 'API missing user name' }));
    return;
  }
  next();
};

export const isBodyOldPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.old_password) {
    res.status(406).json(BaseResponse({ message: 'API missing old password' }));
    return;
  }
  next();
};

export const isBodyNewPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.new_password) {
    res.status(406).json(BaseResponse({ message: 'API missing new password' }));
    return;
  }
  next();
};
