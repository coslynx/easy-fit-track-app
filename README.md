<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>
<h1 align="center">
  easy-fitness-tracker-app
</h1>
<h4 align="center">Track your fitness goals, monitor progress, and share achievements easily.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend Technology">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/easy-fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/easy-fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/easy-fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The `easy-fitness-tracker-app` is a web application designed to help users track their fitness goals, monitor their progress, and share their achievements with friends. This Minimum Viable Product (MVP) is built using React for the frontend and Node.js with Express.js for the backend, along with MongoDB for data storage. It focuses on providing a simple and intuitive way for fitness enthusiasts to manage their fitness journey.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The application uses a modular architecture with separate folders for components, pages, hooks, and services.      |
| 📄 | **Documentation**  | The repository includes a README file providing a detailed overview, tech stack, and usage instructions.            |
| 🔗 | **Dependencies**   | The project utilizes React, React Router, Axios, Express.js, Mongoose, JSON Web Token (JWT), and Bcrypt.     |
| 🧩 | **Modularity**     | The codebase is divided into reusable components, context providers, and custom hooks, enhancing maintainability.     |
| 🧪 | **Testing**        | Includes unit tests for core components and utility functions, using Jest and React Testing Library.    |
| ⚡️  | **Performance**    | Optimized data fetching using custom hooks and minimized re-renders using memoization techniques.          |
| 🔐 | **Security**       | Secure user authentication with JWT, password hashing with bcrypt, and input sanitization to prevent XSS attacks. |
| 🔀 | **Version Control**| Uses Git for version control with clear commit history and branch organization.   |
| 🔌 | **Integrations**   | Provides API endpoints using Express.js, with data storage handled by MongoDB.            |
| 📶 | **Scalability**    | Designed with a cloud-native architecture, using MongoDB Atlas and containerization for future scalability.       |

## 📂 Structure
```text
    ├── components
    │   ├── common
    │   │   ├── Button.jsx
    │   │   └── Input.jsx
    │   ├── features
    │   │   ├── auth
    │   │   │   └── AuthForm.jsx
    │   │   └── goals
    │   │       ├── GoalCard.jsx
    │   │       └── GoalForm.jsx
    │   └── layout
    │       ├── Header.jsx
    │       └── Footer.jsx
    ├── pages
    │   ├── Dashboard.jsx
    │   ├── Goals.jsx
    │   └── Home.jsx
    ├── hooks
    │   ├── useAuth.js
    │   └── useFetch.js
    ├── context
    │   └── AuthContext.js
    ├── services
    │   └── api.js
    ├── utils
    │   └── helpers.js
    ├── styles
    │    └── global.css
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── types
    │   └── index.js
    ├── api
    │   └── index.js
    ├── controllers
    │   ├── authController.js
    │   └── goalController.js
    ├── models
    │   ├── goalModel.js
    │   └── userModel.js
    ├── middlewares
    │   └── authMiddleware.js
    └── tests
        ├── components
        │   ├── auth
        │   │   └── AuthForm.test.jsx
        │   └── goals
        │       └── GoalCard.test.jsx
        └── utils
            └── helpers.test.js
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18.17.1 or higher
> - npm v9.6.7 or higher
> - MongoDB Atlas account for database storage
> - Git for version control
>
### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/easy-fitness-tracker-app.git
   cd easy-fitness-tracker-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a MongoDB Atlas cluster and database.
   - Copy the connection string for use in the `.env` file.

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   - Fill in the necessary environment variables in the `.env` file:
     - `NODE_ENV`: Set to `development` or `production`.
     - `PORT`: The port the server will run on, e.g., `5000`.
     - `DB_CONNECTION_STRING`: The MongoDB Atlas connection string.
     - `JWT_SECRET`: A secret key for JWT token generation.

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the React frontend at `http://localhost:5173`.

2. Start the backend API server:
    ```bash
    npm run start
    ```
    This will start the Node.js backend API at the port specified in the `.env` file or `http://localhost:3000`.

### ⚙️ Configuration
> [!TIP]
> - **API Base URL**: The frontend API URL is configured in `services/api.js` and uses the `VITE_API_BASE_URL` environment variable.
> - **Environment Variables**: Configuration is managed through a `.env` file.
> - **Database**: The application is configured to work with MongoDB Atlas.

### 📚 Examples

- 📝 **User Signup**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/signup \
       -H "Content-Type: application/json" \
       -d '{"username": "testuser", "email": "user@example.com", "password": "password123"}'
  ```
- 📝 **User Login**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
       -H "Content-Type: application/json" \
       -d '{"email": "user@example.com", "password": "password123"}'
  ```
- 📝 **Create Goal**:
  ```bash
   curl -X POST http://localhost:3000/api/goals \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -d '{"title": "Run 5k", "description": "Run a 5k race", "startDate": "2024-08-21", "targetDate": "2024-09-21"}'
  ```
-  📝 **Get All Goals**:
    ```bash
        curl -X GET http://localhost:3000/api/goals \
        -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to a Cloud Provider
1. **Containerize the Application**: Use Docker to containerize both the frontend and backend applications for consistent deployments.

2. **Configure Environment Variables**: Set environment variables such as `NODE_ENV`, `PORT`, `DB_CONNECTION_STRING`, and `JWT_SECRET` within your hosting environment.

3. **Deploy Containers**: Use a cloud provider like AWS, Google Cloud, or Azure to host your containerized applications. Configure networking, load balancing, and database connections.

4. **Set up HTTPS**: Configure SSL certificates to use HTTPS for secure communication.

5. **Set up a Domain Name**: Configure a custom domain name if required for production deployment.

### 🔑 Environment Variables
- `NODE_ENV`: `development` or `production`.
- `PORT`: The port the server will listen on (e.g., 5000).
- `DB_CONNECTION_STRING`: Connection string for MongoDB Atlas.
- `JWT_SECRET`: Secret key for JWT token generation.

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/signup**
  - Description: Register a new user.
  - Body: `{ "username": string, "email": string, "password": string }`.
  - Response: `{ "message": string, "token": string }`.

- **POST /api/auth/login**
  - Description: Login an existing user.
  - Body: `{ "email": string, "password": string }`.
  - Response: `{ "message": string, "token": string }`.

- **GET /api/auth/profile**
  - Description: Get current user profile
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
  - Response: `{ "message": string, "user": { "id": string, "username": string, "email": string} }`.

- **POST /api/goals**
  - Description: Create a new fitness goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
  - Body: `{ "title": string, "description": string, "startDate": string, "targetDate": string }`.
  - Response: `{ "message": string, "goal": object }`.

- **GET /api/goals**
  - Description: Get all goals for the user.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
  - Response: `[array of goals]`.

-  **GET /api/goals/:id**
  - Description: Get a specific goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
  - Response: `{"id": string, "title": string, "description": string, "startDate": string, "targetDate": string}`

- **PUT /api/goals/:id**
  - Description: Update an existing goal.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
  - Body: `{ "title": string, "description": string, "startDate": string, "targetDate": string }`.
  - Response: `{ "message": string, "goal": object }`.
- **DELETE /api/goals/:id**
    - Description: Delete an existing goal.
    - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`.
    - Response: `{ "message": string }`.


### 🔒 Authentication
1. Register or login to get a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```
### 📝 Examples

```bash
# Signup new user
curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "email": "user@example.com", "password": "securepass"}'

# Response
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Login user
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass"}'

# Response
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "Run 5k", "description": "Run a 5k race", "startDate": "2024-08-21", "targetDate": "2024-09-21"}'

# Response
{
  "message": "Goal created successfully",
  "goal": {
    "id": "goal123",
    "title": "Run 5k",
     "description": "Run a 5k race",
     "startDate": "2024-08-21",
     "targetDate": "2024-09-21"
   }
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: easy-fitness-tracker-app
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>