import { Application, Request, Response } from 'express';
import { UserModel } from '../models';
import { BaseResponse } from '../common';
import { USER } from '../type';
import {
  isBodyFullname,
  isBodyNewPassword,
  isBodyOldPassword,
  isBodyPassword,
  isBodyUsername,
  isQueryUsername,
  verifyAuthToken,
} from '../middleware';
import jwt from 'jsonwebtoken';

const userRoute = (app: Application) => {
  app.get('/users', getAllUsers);
  app.post(
    '/validate-information',
    [isBodyUsername, isBodyPassword],
    validateUserInformation,
  );
  app.post(
    '/user-information',
    [isBodyUsername, isBodyPassword, isBodyFullname],
    createUserInformation,
  );
  app.put(
    '/user-information',
    [isBodyFullname, isBodyUsername, verifyAuthToken],
    updateUserInformation,
  );
  app.delete(
    '/user-information',
    [isQueryUsername, verifyAuthToken],
    deleteUser,
  );
  app.put(
    '/user-password',
    [isBodyUsername, isBodyOldPassword, isBodyNewPassword, verifyAuthToken],
    updateUserPassword,
  );
};

const User = new UserModel();

const getAllUsers = (req: Request, res: Response) => {
  User.index()
    .then((data: USER[]) => {
      res
        .status(200)
        .json(
          BaseResponse({ data: data, message: 'Get all users successfully' }),
        );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const createUserInformation = async (req: Request, res: Response) => {
  const { username, pass_word, fullname } = req.body;
  User.create({ username, pass_word, fullname } as USER)
    .then((data: USER) => {
      res
        .status(200)
        .json(
          BaseResponse({ data: data, message: 'Create new user successfully' }),
        );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const validateUserInformation = async (req: Request, res: Response) => {
  const { username, pass_word } = req.body;
  User.authenticate({ username, pass_word } as USER)
    .then((data: USER) => {
      const token = jwt.sign({ username }, process.env.TOKEN_SECRET as string, {
        expiresIn: 3600,
      });
      res.status(200).json(
        BaseResponse({
          data: {
            token: token,
            user: {
              id: data.id,
              username: data.username,
              fullname: data.fullname,
            },
          },
          message: 'Validate successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const updateUserInformation = async (req: Request, res: Response) => {
  const { username, fullname } = req.body;
  User.updateFullName({ username, fullname } as USER)
    .then((data: USER) => {
      res.status(200).json(
        BaseResponse({
          data: data,
          message: 'Update user information successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const updateUserPassword = async (req: Request, res: Response) => {
  const { username, old_password, new_password } = req.body;
  User.changePassword({ username, old_password, new_password })
    .then(() => {
      res.status(200).json(
        BaseResponse({
          data: null,
          message: 'Update user password successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.query as { username: string };
  User.delete(username)
    .then(() => {
      res.status(200).json(
        BaseResponse({
          data: null,
          message: 'Delete user information successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

export default userRoute;
