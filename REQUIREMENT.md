# API Route Group information
1. User Route Group

| RouteName | Method | Query/Body | is token required? | Description |
|-----------------|------------------|------------------- |
| /users | GET | - | - | [HIDDEN] to get all users in the database |
| /validate-information | POST | username, pass_word | - | validate user information and return the token if valid |
| /user-information | POST | username, pass_word, fullname | - | [HIDDEN] API to create a new user |
| /user-information | PUT | fullname, username | TOKEN | update user fullname information |
| /user-information | DELETE | username | TOKEN | delete user information |
| /user-password | PUT | username, old_password, new_password | TOKEN | update password information |


2. Product Route Group

| RouteName | Method | Query/Body | is token required? | Description |
|-----------------|------------------|------------------- |
| /products | GET | - | TOKEN | get all products |
| /product | GET | id | TOKEN | get a product detail information |
| /product | POST | product_name, product_image, product_description, first_price, discount_price | TOKEN | create a new product information |

3. Order Route Group

| RouteName | Method | Query/Body | is token required? | Description |
|-----------------|------------------|------------------- |
| /order | GET | - | TOKEN | get all products in order |
| /order | POST | product_id, user_id, product_number | TOKEN | add product into order |
| /order/:order_id | PUT | product_id, user_id, product_number, id as order_id | TOKEN | Update product number in order |

# Database schema information
1. user_table

| key | type |
|-----------------|------------------|
| id | SERIAL PRIMARY KEY |
| username | VARCHAR(150) UNIQUE |
| pass_word | VARCHAR(255) |
| fullname | VARCHAR(255) |

2. product_table

| key | type |
|-----------------|------------------|
| id | SERIAL PRIMARY KEY |
| product_name | VARCHAR(255) |
| first_price | VARCHAR(100) |
| discount_price | VARCHAR(100) |
| product_description | VARCHAR(255) |
| product_image | VARCHAR(255) |

3. order_table

| key | type |  description
|-----------------|------------------|------------------|
| id | SERIAL PRIMARY KEY | - |
| user_id | INT | FOREIGN KEY (user_id) REFERENCES user_table(id) |

4. order_product_table

| key | type |  description
|-----------------|------------------|------------------|
| id | SERIAL PRIMARY KEY | - |
| product_id | INT | FOREIGN KEY (user_id) REFERENCES user_table(id) |
| order_id | INT | - |
| product_number | INT | - |