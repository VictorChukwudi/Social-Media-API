# Social Media API

This project is a social media API built with Node.js, Express, Typescript, Redis, and Socket.IO. It provides functionalities for user registration, login, post creation with text and media, following other users, commenting and liking posts, and real-time notifications using sockets.

## Features

- User Authentication (Registration & Login) using Jsonwebtoken
- Post Creation (Text and Optional Media)
- User Following
- Post Commenting and Liking
- Real-time Notifications (Sockets)
- Caching with Redis

## Technologies Used

- Node.js: JavaScript runtime environment for server-side development. (https://nodejs.org/en)
- Express.js: Web framework for building APIs with Node.js. (https://expressjs.com/)
- Typescript: Superset of JavaScript that adds static typing for improved code maintainability. (https://www.typescriptlang.org/docs)
- Redis: In-memory, key-value data store for caching frequently accessed data. (https://redis.io/)
- Socket.IO: Real-time communication library for enabling websockets. (https://socket.io/docs/v4/())
- MongoDB: NoSQL database for storing user information, posts, and relationships. (https://www.mongodb.com/)
- Cloudinary: Media store for storing images and videos.(https://cloudinary.com/documentation/node_quickstart)

## Prerequisite
1. Node.js and npm installed on your system.
2. MongoDB Atlas with connection string.
3. Redis on cloud with connection string.
4. Cloudinary account with secrets and keys.
   

## Installation
1. Clone the repository
   ```
   git clone https://gitlab.com/assessment4842214/social-api.git
   ```
2. Install dependencies
   ```
   cd social-api
   npm install
   ```
3. Configure environment variables (.env file)
   ```
   PORT= your_server_port
   MONGODB_URI= mongodb_uri_from_atlas_or_local_mongodb
   JWT_SECRET= jsonwebtoken_secret
   CLOUDINARY_CLOUD_NAME= cloudinary_cloud_name
   CLOUDINARY_API_KEY= cloudinary_api_key
   CLOUDINARY_API_SECRET= cloudinary_api_secret
   REDIS_URL= remote_redis_url
   ```
4. Start the server 
   ```
   npm start
   ```
## API Endpoints
### Authentication
- `POST /api/auth/register:` Register a new user.
- `POST /api/auth/login:` Login an existing user.
  
### User Actions (Protected Using JWT)
- `GET /api/users/:userId/follow:` Folow or unfollow a user.
- `GET /api/users/notification:` A user get his/her followers.
- `GET /api/users/followers:` A user get his/her followers.
- `GET /api/users/followings: ` A user get users following him/her.

### Post Actions (Protected Using JWT)
- `GET /api/posts/:postId/like:` User likes or unlikes a post.
- `GET /api/posts/personal:` User fetches all his/her posts.
- `GET /api/posts/feed:` Users fetches all posts from those they follow
- `GET /api/posts/:postId:` User fetches a single post.
- `POST /api/posts/:postId/comment:` User comments on a post.
- `POST /api/posts/create:` User create a post.
  
## Usage
1. Register a new user using the /api/auth/register endpoint.
2. Login with the registered user using the /api/auth/login endpoint to obtain an authentication token.
3. Use the obtained token to access protected endpoints for user actions, post creation, commenting, and liking.
4. Utilize the provided socket connections for real-time notifications on comments and likes.
   
## Documentation
Click [here](https://documenter.getpostman.com/view/19721625/2sA35MxJGP) to get the full documentation of this API.