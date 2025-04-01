# Movie Gallery Application - Backend (Express + TypeScript)

## Overview

The backend of the Movie App is built with `Node.js`, `Express`, `TypeScript`, `TypeORM`, and `MySQL`. It provides a secure and efficient API for managing movies, authentication, and user verification. The backend also includes file management with `AWS S3`, data validation, and error handling.

## Features
1. Movie Management
+ Query all movies with pagination
+ Query a movie by movieId
+ Create a new movie
+ Update an existing movie

2. Authentication & Security
+ JWT-based authentication
+ Secure storage of JWT in HttpOnly cookies
+ User verification middleware

3. AWS S3 Integration
+ File management
+ Presigned URL generation

4. Data Validation
+ DTO (Data Transfer Object) validation to strictly validate incoming requests

5. Database Management
+ TypeORM for database interactions
+ Seeding and factory functions to populate initial data

6. Error Handling
+ Custom Error class for managing errors

7. API Documentation
+ Detailed API documentation for endpoints and responses


## Installation
1. Clone the repository:
```shell
git clone https://github.com/MaxBay2020/movie_app_BE
cd movie_app_FE
```

2. Install dependencies:
```shell
npm install 
# or 
yarn
```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure it based on `.env.example` file.

4. Run database sync:
```shell
npm run schema:sync
# or
yarn schema:sync
```

5. Seed the database:
```shell
npm run seed
# or
yarn seed 
```

6. Start the development server:
```shell
npm run dev
# or 
yarn dev  
```

7. For production build:
```shell
npm run build
# or
yarn build

npm start
# or
yarn start 
```


# Requirement met description:
1. `Pagination` for query all movies.
2. `DTO` validation implemented, more secure and robust.
3. `Pagination` for query all movies.
4. Detailed `API documentation`

# Bonus done:
5. Entity data `seeds` generated, fully usable.
6. Authentication with `JWT`, stored in HttpOnly cookie to `prevent from XSS, CSRF attack`.
7. `Pagination` for query all movies.
8. `Middleware` verification and file uploader.
9. `Custom Error class` created for error management.
10. `S3 file with presigned URL` management implementation.

# Future optimization:
1. Using Message Queue to handle file upload.
