CREATE TABLE cart_table(
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE,
  FOREIGN KEY (user_id) REFERENCES user_table(id)
);
