# Udacity-storefront-BE-nodejs
## Setup and Prerequisites
1. Clone repository to your computer
2. Install the dependencies `npm install`. The host should be available at http://localhost:4000
3. `db-migrate up` to init postgres database
4. `sudo su` to enter your adminstrator
5. `su - postgres` to enter your postgres command
6. `psql`
7. Run below commands
- `CREATE DATABASE storefront;`
- `\c storefronttest;`
- `CREATE TABLE user_table( id SERIAL PRIMARY KEY, username VARCHAR(150) UNIQUE, pass_word VARCHAR(255), fullname VARCHAR(255));`
- `CREATE TABLE order_table(id SERIAL PRIMARY KEY, user_id INT UNIQUE, FOREIGN KEY (user_id) REFERENCES user_table(id));`

## RUN
1. `npm start` to host the source code
2. `npm run test` to run jasmine testing (cancel the host first by using crtl + C)
3. `npm run lint` to run eslint formatter

## Database config
1. Production database
- PostgreSQL host: `127.0.0.1`
- Database name: `storefront`
- User: `postgres`
- Password: `000`
2. Test database (for unit test)
- PostgreSQL host: `127.0.0.1`
- Database name: `storefronttest`
- User: `postgres`
- Password: `000`

## Unit test result
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1694075285/StoreFrontNodeJSBackEnd/storefront13_vmgtkh.png)

## Available endpoint
1. http://localhost:4001/user-information
- Method: POST
- Description: Create user information

| Name | Type | Description |
|-----------------|------------------|------------------- |
| username | String | user name |
| pass_word | String | user password |
| fullname | String | user full name |

- Result image:
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693468300/StoreFrontNodeJSBackEnd/storefront2_socjim.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693468149/StoreFrontNodeJSBackEnd/storefront1_b5csxi.png)

2. http:localhost:4001/validate-information
- Method: POST
- Description: Validate user information

| Name | Type | Description |
|-----------------|------------------|------------------- |
| username | String | user name |
| pass_word | String | user password |
- Result image:
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693468637/StoreFrontNodeJSBackEnd/storefront4_ui7zye.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693468637/StoreFrontNodeJSBackEnd/storefront3_al57jo.png)

3. http:localhost:4001/product
- Method: POST
- Description: create a product

| Name | Type | Description |
|-----------------|------------------|------------------- |
| product_name | String | product name |
| product_image | String | product image URL |
| product_description | String | Product description |
| first_price | String | default price of product |
| discount_price | String | latest price |

- Result image:
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693469325/StoreFrontNodeJSBackEnd/storefront6_imdpfj.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693469325/StoreFrontNodeJSBackEnd/storefront5_izzdql.png)

4. http:localhost:4001/products
- Method: GET
- Description: Get all products
- Header: Authorization/Bearer <Your token>
- Result image:
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693469657/StoreFrontNodeJSBackEnd/storefront7_eeu8ka.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693469657/StoreFrontNodeJSBackEnd/storefront8_xz6ee6.png)

5. http:localhost:4001/user-password
- Method: PUT
- Description: Change user password

| Name | Type | Description |
|-----------------|------------------|------------------- |
| username | String | user name |
| old_password | String | currently user password |
| new_password | String | new user password |

![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693479224/StoreFrontNodeJSBackEnd/storefront9_botmpd.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693479224/StoreFrontNodeJSBackEnd/storefront10_cekvjl.png)

6. http:localhost:4001/user-information?username=admin
- Method: Delete
- Description: Delete user information

| Name | Type | Description |
|-----------------|------------------|------------------- |
| username | String | user name |

![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693479400/StoreFrontNodeJSBackEnd/storefront12_yobbzb.png)
![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1693479400/StoreFrontNodeJSBackEnd/storefront11_clh6ls.png)

7. http:localhost:4001/order
- Method: Post
- Header: Authorization/Bearer <Your token>
- Description: Create new order

| Name | Type | Description |
|-----------------|------------------|------------------- |
| product_id | number | product id |
| user_id | number | user id |
| product_number | number | number of product |

![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1694075501/StoreFrontNodeJSBackEnd/storefront15_ad4ywd.png)

8. http:localhost:4001/order/:user_id
- Method: GET
- Header: Authorization/Bearer <Your token>
- Description: Get all product in order

![image](https://res.cloudinary.com/ddyzzqqod/image/upload/v1694075502/StoreFrontNodeJSBackEnd/storefront14_wkwvbs.png)

9. http:localhost:4001/order/:order_id
- Method: PUT
- Header: Authorization/Bearer <Your token>
- Description: Update product number in order

| Name | Type | Description |
|-----------------|------------------|------------------- |
| product_id | number | product id |
| user_id | number | user id |
| product_number | number | product number |
| id | number | order id |


10. http:localhost:4001/order?order_id&product_id
- Method: DELETE
- Header: Authorization/Bearer <Your token>
- Description: delete the relation between order and product

| Name | Type | Description |
|-----------------|------------------|------------------- |
| order_id | number | order id |
| product_id | number | product id |
