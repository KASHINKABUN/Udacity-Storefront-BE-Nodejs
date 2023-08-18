CREATE TABLE order_product_table(
  id SERIAL PRIMARY KEY,
  order_id INT,
  product_id INT,
  product_number INT,
  FOREIGN KEY (product_id) REFERENCES product_table(id)
);
