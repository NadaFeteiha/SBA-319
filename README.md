# Weather API Backend

This is a Weather API application built with Node.js, Express, and Mongose. It provides endpoints for managing users, locations, and weather data.

## Features

- **User Management:** Register, update, delete, and retrieve users.
- **Location Management:** Add, retrieve, and manage cities.
- **Weather Data:** Associate weather information with locations.
- **Security & Scalability:** Middleware like Helmet and CORS for protection.
- **MongoDB Integration:** Persistent storage for users, locations, and weather data.

## API Endpoints

### Base URL

```
http://localhost:4000/weather-api
```

### User Routes

- `GET /user/` - Welcome message.
- `GET /user/all` - Retrieve all users.
- `POST /user/register` - Register a new user.
- `GET /user/:username` - Retrieve a user by username.
- `PATCH /user/:username` - Update a user's name or email.
- `DELETE /user/:username` - Delete a user.
- `POST /user/:userId/add-city` - Add a city to a user's locations.

### Location Routes

- `GET /location/` - Welcome message.
- `GET /location/cities` - Retrieve all cities.
- `POST /location/` - Add a new city.

## Project Structure

```
.env
.gitignore
index.js
package.json
README.md

models/
    Location.js
    Users.js
    Weather.js

public/
    css/
        style.css
    js/
        main.js

routes/
    location.routes.js
    user.routes.js

views/
    index.pug
```

## Technologies Used

- **Node.js** - JavaScript runtime.
- **Express** - Web framework.
- **MongoDB** - NoSQL database.
- **Mongoose** - MongoDB object modeling.
- **Pug** - Template engine for API documentation.
- **Helmet** - Security middleware.
- **CORS** - Cross-Origin Resource Sharing.
- **dotenv** - Environment variable management.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NadaFeteiha/SBA-319.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd <new-project-name>
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a **``** file in the root directory and add the following:**

   ```ini
   MONGODB_URI="YOUR_MONGO_DB_CONNECTION"
   ```

5. **Start the server:**

   ```bash
   npm start
   ```
