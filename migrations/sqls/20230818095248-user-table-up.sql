CREATE TABLE user_table(
  id SERIAL PRIMARY KEY,
  username VARCHAR(150) UNIQUE,
  pass_word VARCHAR(255),
  fullname VARCHAR(255)
);
