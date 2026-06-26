# 2301921690072

2301921690072 is a production-ready, full-stack Software as a Service (SaaS) application built to demonstrate robust architecture, security, and best practices.

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Material UI (MUI) v5 with custom dark theme
- **State Management**: React Context API
- **HTTP Client**: Axios with custom interceptors

### Backend
- **Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth (JWT)
- **Logging**: Custom `logging-package` middleware

## ✨ Features

- **Authentication**: Secure Signup, Login, and Logout using Supabase Auth.
- **Protected Routes**: Frontend routing secured with Higher-Order Components.
- **Profile Management**: View and edit user profiles, synchronized with the database.
- **Dashboard**: Overview of key metrics and statistics.
- **Activity Logs**: Secure timeline of user and system events.
- **Settings**: Application preferences management.
- **Error Handling**: Global React Error Boundaries and robust Express Error Middleware.
- **Zero Console Logging**: Strict adherence to security standards by routing all logs to a dedicated evaluation server.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase project (for Authentication and Database)

### Environment Variables

You need to configure the environment variables for both the frontend and backend.

#### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development

# Prisma Database URL
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/postgres?sslmode=require"

# Supabase Auth configuration
SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
```

#### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexus
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Initialize Database**
   ```bash
   cd ../backend
   npx prisma generate
   npx prisma db push
   ```

### Running the Application

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 📚 API Documentation

### Auth Routes (`/api/v1/auth`)
- `POST /signup`: Register a new user
  - Body: `{ email, password, firstName, lastName }`
- `POST /login`: Authenticate a user
  - Body: `{ email, password }`
- `POST /logout`: Invalidate user session

### Profile Routes (`/api/v1/profile`)
- `GET /`: Fetch current user profile
  - Headers: `Authorization: Bearer <token>`
- `PUT /`: Update current user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ firstName, lastName }`

### Log Routes (`/api/v1/logs`)
- `POST /`: Submit frontend logs to the evaluation server
  - Body: `{ level, package, message }`

## 🛡️ Security

- **Rate Limiting**: API endpoints are protected against brute-force attacks using `express-rate-limit`.
- **Security Headers**: Standard security headers are enforced via `helmet`.
- **CORS**: Cross-Origin Resource Sharing is configured to prevent unauthorized domain access.
- **JWT Verification**: Token validation is handled via Supabase Auth services.
- **Data Validation**: Request payload validation is enforced using `express-validator`.
