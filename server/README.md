# Project Title

Project Description

## Technologies Used

- Node.js
- Express

## Getting Started

To get started with the project, follow the steps below:

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open your web browser and navigate to `http://localhost:3000`.

## API Documentation

This module defines the routes for CRUD operations on the `Review` model.

### Methods

- `GET /`: Returns a list of all reviews.
  - Response:
    - Success (200): Returns an array of reviews.
    - Failure (400): Returns a JSON object with a `message` property indicating an error occurred.

- `GET /review/:id`: Returns the review with the specified `id`.
  - Request Params:
    - `id`: The id of the review to retrieve.
  - Response:
    - Success (200): Returns the review with the specified `id`.
    - Failure (400): Returns a JSON object with a `message` property indicating an error occurred.

- `POST /review`: Creates a new review.
  - Request Body:
    - `title`: The title of the review.
    - `content`: The content of the review.
  - Response:
    - Success (201): Returns a JSON object with a `message` property indicating the review was successfully created.
    - Failure (400): Returns a JSON object with a `message` property indicating an error occurred.

- `PUT /review/:id`: Updates the review with the specified `id`.
  - Request Params:
    - `id`: The id of the review to update.
  - Request Body:
    - `title`: The updated title of the review.
    - `content`: The updated content of the review.
  - Response:
    - Success (201): Returns a JSON object with a `message` property indicating the review was successfully updated.
    - Failure (400): Returns a JSON object with a `message` property indicating an error occurred.

- `DELETE /review/:id`: Deletes the review with the specified `id`.
  - Request Params:
    - `id`: The id of the review to delete.
  - Response:
    - Success (201): Returns a JSON object with a `message` property indicating the review was successfully deleted.
    - Failure (400): Returns a JSON object with a `message` property indicating an error occurred.2

## Database

This project uses a Mongo database. The database schema can be found in the `models` file.

## Known Issues

Due to lack of time, there might be some bugs in the app and not all the best practices were followed.



!Note 

THe Env FIls are included in the code too as i hardcoded the connection string in the front end code.
was going to setup a proxy but ran out of time. 

