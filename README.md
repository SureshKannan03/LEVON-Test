# Project Name

## Description

This project is a comprehensive Node.js and Express application that includes an authentication system, a notification system with real-time WebSocket updates, a product management RESTful API, and a user management system using MongoDB. The project uses JWT for authentication and Winston for logging

## Features

- Authentication System: User registration, login, and role-based access control.
- Notification System: Real-time notification creation and broadcasting via WebSockets.
- Product Management API: CRUD operations for managing products.
- User Management API: CRUD operations for managing users in a MongoDB database.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```

Install Dependencies: npm install

Run the Application: npm start

Navigate to the project directory: cd repository

Install dependencies: npm install

Configuration
Logging Configuration:

The project uses Winston for logging. Logs are saved in the logs directory with daily rotation and retention for the last 7 days. The logger.js file configures Winston with console and file transports.

Error Handling:

Custom error handling is implemented to capture and log errors. Different error types are logged with specific messages, including user registration and login errors.

Routes
/register
Method: POST
Description: Registers a new user.

Request Body:
{
"email": "suresh@example.com",
"password": "password123",
"role": "admin"
}

Response:
201 Created: User registered successfully.
400 Bad Request: Validation errors.
500 Internal Server Error: Server errors.

/login
Method: POST
Description: Logs in a user and returns a JWT.

Request Body:
{
"email": "suresh@example.com",
"password": "password123",
"role": "admin"
}

Response:
200 OK: Login successful, returns email and token.
400 Bad Request: Missing credentials.
401 Unauthorized: Invalid credentials.
500 Internal Server Error: Server errors.

/settings
Method: GET
Description: Provides access to user settings if the user is authenticated and has the "admin" role.
Middleware: authenticateToken

Response:
200 OK: Access granted to settings.
403 Forbidden: Permission denied.
500 Internal Server Error: Server errors.

Middleware
authenticateToken: Middleware for JWT authentication. Ensures that requests to /settings are authenticated.

## Notification System

This project includes a notification system that allows the creation and broadcasting of notifications to connected clients in real-time using WebSockets.

Features
Create Notification: Allows users to create notifications that are saved to the database and broadcasted to all connected clients.
Real-time Updates: Notifications are emitted via WebSockets, allowing clients to receive updates instantly.

Routes

/notifications
Method: POST
Description: Creates a new notification and broadcasts it to connected clients.
Request Body:
{
"message": "notification message"
}

Response:
201 Created: Notification created and sent successfully.
500 Internal Server Error: Server errors.

Implementation Details

Notification Model: The notification is created using the Notification model and saved to the database.
WebSocket Integration: The notification is broadcasted to all connected clients using a WebSocket connection (io.emit("newNotification", notification)).
Logging: The system logs the success and error messages using Winston for easier debugging and monitoring.

## Product Management API

This project includes a RESTful API for managing products. The API supports operations like retrieving all products, getting a product by ID, creating a new product, updating an existing product, and deleting a product.

Features
Get All Products: Retrieve a list of all available products.
Get Product by ID: Retrieve details of a specific product by its ID.
Create Product: Add a new product to the database.
Update Product by ID: Modify details of an existing product using its ID.
Delete Product by ID: Remove a product from the database using its ID.

Routes
/products
Method: GET
Description: Fetches all products.

Response:
200 OK: Returns an array of all products.

/products/:id
Method: GET
Description: Fetches a product by its ID.

Parameters:
:id - The ID of the product to retrieve.

Response:
200 OK: Returns the product details.
404 Not Found: Product not found.

/products
Method: POST
Description: Creates a new product.

Request Body:
{
"name": "Product Name",
"price": 100,
"category": "Category Name"
}

Response:
201 Created: Product created successfully.
400 Bad Request: Validation failed.

/products/:id
Method: PUT
Description: Updates an existing product by its ID.
Parameters:
:id - The ID of the product to update.

Request Body: (similar to POST)
{
"name": "Updated Product Name",
"price": 120,
"category": "Updated Category"
}
Response:
200 OK: Product updated successfully.
404 Not Found: Product not found.
400 Bad Request: Validation failed.

/products/:id
Method: DELETE
Description: Deletes a product by its ID.
Parameters:
:id - The ID of the product to delete.
Response:
204 No Content: Product deleted successfully.
404 Not Found: Product not found.

Middleware
validateProduct: Middleware that validates the product data before creating or updating a product. Ensures that required fields are present and properly formatted.

## User Management API

This project includes a RESTful API for managing users in a MongoDB database. The API allows for creating, retrieving, updating, and deleting user records.

Features
Create User: Add a new user to the database.
Get All Users: Retrieve a list of all users.
Get User by ID: Retrieve details of a specific user by their ID.
Update User: Modify details of an existing user.
Delete User: Remove a user from the database.

API Endpoints
POST /users
Description: Create a new user.
Request Body:
{
"name": "John Doe",
"email": "johndoe@example.com",
"password": "Password123"
}

Response:
201 Created: User successfully created.
400 Bad Request: Invalid input data or user already exists.
GET /users
Description: Retrieve all users.

Response:
200 OK: Returns an array of all users with a total user count.
GET /users/:id
Description: Retrieve a specific user by their ID.
Parameters:
:id - The ID of the user to retrieve.
Response:
200 OK: Returns the user details.
404 Not Found: User not found.

PUT /users/:id
Description: Update an existing user by their ID.
Parameters:
:id - The ID of the user to update.
Request Body: (Optional fields)
{
"name": "Updated Name",
"email": "updatedemail@example.com",
"password": "NewPassword123"
}
Response:
200 OK: User successfully updated.
404 Not Found: User not found.
400 Bad Request: Invalid input data.

DELETE /users/:id
Description: Delete a user by their ID.
Parameters:
:id - The ID of the user to delete.
Response:
200 OK: User successfully deleted.
404 Not Found: User not found.

## Middleware

This API uses middleware to validate user input before creating or updating a user. Make sure that the required fields are present and properly formatted.
