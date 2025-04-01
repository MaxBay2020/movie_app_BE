# Movie Gallery Application - Backend (Express + TypeScript)

## Overview

The backend of the Movie App is built with `Node.js`, `Express`, `TypeScript`, `TypeORM`, and `MySQL`. It provides a secure and efficient API for managing movies, authentication, and user verification. The backend also includes file management with `AWS S3`, data validation, and error handling.


## Requirement met description:
1. Deployed through `AWS EC2` and `AWS Route 53` with `systemd` service management. ✅
2. `DTO` validation on coming requests. ✅
3. `Pagination` for movie list. ✅
4. Detailed `API documentation`. ✅

## Bonus done:
1. Entity data `seeds` generated, fully usable. ✅
2. Authentication with `JWT`, stored in `HttpOnly cookie` to `prevent from XSS, CSRF attack`. ✅
3. `Middleware` verification and file uploader. ✅
4. `Custom Error class` for error management. ✅
5. `S3 file with presigned URL` implementation. ✅

## Future optimization:
1. Using `Message Queue` to handle file upload. 🔧


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


