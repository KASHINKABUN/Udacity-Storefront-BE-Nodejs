export type ORDER = {
  id: number;
  product_id: number;
  user_id: number;
  product_number: number;
  status: string;
  description: string;
  total: number;
  method: string;
};

export type ORDER_RES = {
  id: number;
  product_name: string;
  product_description: string;
  product_image: string;
  first_price: string;
  discount_price: string;
  product_number: number;
  order_id: number;
  status: string;
  description: string;
};
