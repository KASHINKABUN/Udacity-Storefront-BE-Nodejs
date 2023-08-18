import { Application, Request, Response } from 'express';
import {
  isParamCartId,
  isBodyProductId,
  isBodyProductNumber,
  isBodyUserId,
  isParamUserId,
  verifyAuthToken,
  isQueryCartId,
  isQueryProductId,
} from '../middleware';
import { CartModel, CartProductModel } from '../models';
import { CART, PRODUCT } from '../type';
import { BaseResponse } from '../common';

const cartRoute = (app: Application) => {
  app.get('/cart/:user_id', [verifyAuthToken, isParamUserId], getCart);
  app.post(
    '/cart',
    [verifyAuthToken, isBodyProductId, isBodyUserId, isBodyProductNumber],
    createCart,
  );
  app.put(
    '/cart/:cart_id',
    [
      verifyAuthToken,
      isBodyProductId,
      isBodyUserId,
      isBodyProductNumber,
      isParamCartId,
    ],
    updateCart,
  );
  app.delete(
    '/cart',
    [verifyAuthToken, isQueryCartId, isQueryProductId],
    deleteCartProduct,
  );
};

const CART_MODEL = new CartModel();
const CART_PRODUCT_MODEL = new CartProductModel();

const getCart = (req: Request, res: Response) => {
  const user_id = req.params.user_id as unknown as number;
  CART_MODEL.getProductById(user_id)
    .then((data: PRODUCT[]) => {
      res.status(200).json(
        BaseResponse({
          data: data,
          message: 'Get product cart successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error.message }));
    });
};

const createCart = (req: Request, res: Response) => {
  function createCartProduct(data: CART) {
    CART_PRODUCT_MODEL.getCartProduct(data).then((rsData: CART) => {
      if (rsData) {
        CART_PRODUCT_MODEL.updateCartProduct(data).then((rstData: CART) => {
          res.status(200).json(
            BaseResponse({
              data: rstData,
              message: 'Add product successfully',
            }),
          );
        });
      } else {
        CART_PRODUCT_MODEL.createCartProduct(data).then((rstData: CART) => {
          res.status(200).json(
            BaseResponse({
              data: rstData,
              message: 'Add product successfully',
            }),
          );
        });
      }
    });
  }

  CART_MODEL.getCartByUserId(req.body.user_id).then((data: CART) => {
    if (data?.id) {
      createCartProduct({ ...req.body, id: data.id });
    } else {
      CART_MODEL.createCart(req.body as CART)
        .then((data: CART) => {
          createCartProduct({ ...req.body, id: data.id });
        })
        .catch((error) => {
          res
            .status(405)
            .json(BaseResponse({ message: `Cannot create cart ${error}` }));
        });
    }
  });
};

const updateCart = (req: Request, res: Response) => {
  CART_MODEL.updateCart(req.body as CART)
    .then((data: CART) => {
      res
        .status(200)
        .json(
          BaseResponse({ data: data, message: 'Update cart successfully' }),
        );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error }));
    });
};

const deleteCartProduct = (req: Request, res: Response) => {
  CART_PRODUCT_MODEL.deleteCartProduct({
    ...req.query,
    id: req.query.cart_id,
  } as unknown as CART)
    .then(() => {
      res.status(200).json(
        BaseResponse({
          data: null,
          message: 'Delete cart product successfully',
        }),
      );
    })
    .catch((error) => {
      res.status(405).json(BaseResponse({ message: error }));
    });
};

export default cartRoute;
