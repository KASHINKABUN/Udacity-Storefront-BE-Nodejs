CREATE TABLE order_table(
  id SERIAL PRIMARY KEY,
  user_id INT,
  status VARCHAR(100),
  description VARCHAR(255),
  total VARCHAR(100),
  method VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES user_table(id)
);
