# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19 (Vite), Node.js/Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   └── Running on: http://localhost:5173
├── backend/           # Node.js + Express + TypeScript
│   └── Running on: http://localhost:8000
└── MongoDB Database
    └── Connection: mongodb://localhost:27017/octofit_db
```

## Services & Ports

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or Docker)

## Setup Instructions

### 1. Start MongoDB

#### Option A: Local MongoDB
```bash
# Ensure MongoDB is running locally on port 27017
mongod
```

#### Option B: Docker MongoDB
```bash
docker run -d -p 27017:27017 --name octofit-mongo mongo:latest
```

### 2. Install Backend Dependencies

```bash
cd octofit-tracker/backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd octofit-tracker/frontend
npm install
```

## Running the Application

### Backend Development Server

```bash
cd octofit-tracker/backend
npm run dev
```

The backend server will start on `http://localhost:8000` and connect to MongoDB on `mongodb://localhost:27017/octofit_db`.

### Frontend Development Server

```bash
cd octofit-tracker/frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Build for Production

#### Backend
```bash
cd octofit-tracker/backend
npm run build
npm start
```

#### Frontend
```bash
cd octofit-tracker/frontend
npm run build
```

## Environment Configuration

### Backend (.env)

Copy `.env.example` to `.env` and configure:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit_db
NODE_ENV=development
```

### Frontend (.env)

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=http://localhost:8000
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Oxlint** - Linter

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Language
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - NoSQL database (default connection on port 27017)

## API Endpoints

The frontend is configured with a proxy to the backend. All requests to `/api/*` will be forwarded to `http://localhost:8000`.

Example: `http://localhost:5173/api/users` → `http://localhost:8000/users`

## Development Workflow

1. Start MongoDB
2. Start the backend server (`npm run dev`)
3. Start the frontend dev server (`npm run dev`)
4. Access the application at `http://localhost:5173`

## License

See LICENSE file in the root directory.
