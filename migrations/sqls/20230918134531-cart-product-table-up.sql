CREATE TABLE cart_product_table(
  id SERIAL PRIMARY KEY,
  cart_id INT,
  product_id INT UNIQUE,
  product_number INT,
  FOREIGN KEY (product_id) REFERENCES product_table(id)
);
