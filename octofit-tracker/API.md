# OctoFit Tracker API Documentation

## Overview

The OctoFit Tracker backend API is a Node.js + Express application that provides RESTful endpoints for managing users, activities, teams, leaderboards, and workouts.

## Environment Detection

The API automatically detects its execution environment and builds the appropriate base URL:

### Codespaces
When running in GitHub Codespaces, the API detects the `CODESPACE_NAME` environment variable and constructs:
```
https://{CODESPACE_NAME}-8000.app.github.dev
```

### Localhost Development
When running locally without Codespaces, the API uses:
```
http://localhost:8000
```

This URL is returned in all API responses via the `apiUrl` field.

## Configuration

### Environment Variables (.env)
```env
PORT=8000                                          # Server port (required: 8000)
MONGODB_URI=mongodb://localhost:27017/octofit_db  # MongoDB connection string
NODE_ENV=development                              # Environment (development/production)
CODESPACE_NAME=<auto-detected>                    # Set by Codespaces (for reference)
```

### Starting the Server

**Development Mode** (with hot reload via tsx watch):
```bash
npm run dev
```

**Production Mode** (compiled):
```bash
npm run build
npm start
```

## API Endpoints

All endpoints support both `/path` and `/path/` formats.

### Root Endpoint
```
GET /
```

Returns server status and detected API base URL.

**Response:**
```json
{
  "message": "OctoFit Tracker API is running",
  "apiUrl": "https://stunning-pancake-q794qxwj479xc4j5w-8000.app.github.dev",
  "environment": "development",
  "port": 8000
}
```

### Users

#### Get All Users
```
GET /api/users
```

**Response:**
```json
{
  "apiUrl": "https://stunning-pancake-q794qxwj479xc4j5w-8000.app.github.dev",
  "count": 1,
  "results": [
    {
      "_id": "6a7c808c08fb203d5d9be189",
      "name": "Alice Johnson",
      "email": "alice@octofit.com",
      "goal": "Run 100 miles",
      "createdAt": "2026-08-12T14:17:48.947Z",
      "updatedAt": "2026-08-12T14:17:48.947Z"
    }
  ]
}
```

#### Create User
```
POST /api/users
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@octofit.com",
  "goal": "Run 100 miles"
}
```

**Response (Status 201):**
```json
{
  "message": "User created",
  "user": {
    "name": "Alice Johnson",
    "email": "alice@octofit.com",
    "goal": "Run 100 miles",
    "_id": "6a7c808c08fb203d5d9be189",
    "createdAt": "2026-08-12T14:17:48.947Z"
  }
}
```

### Activities

#### Get All Activities
```
GET /api/activities
```

**Response:**
```json
{
  "apiUrl": "https://stunning-pancake-q794qxwj479xc4j5w-8000.app.github.dev",
  "count": 1,
  "results": [
    {
      "_id": "6a7c809c08fb203d5d9be18a",
      "user": {
        "_id": "6a7c808c08fb203d5d9be189",
        "name": "Alice Johnson",
        "email": "alice@octofit.com",
        "goal": "Run 100 miles"
      },
      "type": "Running",
      "duration": 45,
      "calories": 450,
      "date": "2026-08-12T14:00:00.000Z",
      "createdAt": "2026-08-12T14:18:04.203Z"
    }
  ]
}
```

#### Create Activity
```
POST /api/activities
```

**Request Body:**
```json
{
  "user": "6a7c808c08fb203d5d9be189",
  "type": "Running",
  "duration": 45,
  "calories": 450,
  "date": "2026-08-12T14:00:00Z"
}
```

**Response (Status 201):**
```json
{
  "message": "Activity created",
  "activity": {
    "user": "6a7c808c08fb203d5d9be189",
    "type": "Running",
    "duration": 45,
    "calories": 450,
    "date": "2026-08-12T14:00:00.000Z",
    "_id": "6a7c809c08fb203d5d9be18a",
    "createdAt": "2026-08-12T14:18:04.203Z"
  }
}
```

### Teams

#### Get All Teams
```
GET /api/teams
```

Returns team data with populated member information.

#### Create Team
```
POST /api/teams
```

### Leaderboard

#### Get Leaderboard
```
GET /api/leaderboard
```

Returns entries sorted by score (descending) with user details populated.

### Workouts

#### Get All Workouts
```
GET /api/workouts
```

#### Create Workout
```
POST /api/workouts
```

## Data Models

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique)
  goal: string (required)
  createdAt: Date
  updatedAt: Date
}
```

### Activity Model
```typescript
{
  user: ObjectId (reference to User, required)
  type: string (required)
  duration: number (minutes)
  calories: number
  date: Date (required)
  createdAt: Date
  updatedAt: Date
}
```

### Team Model
```typescript
{
  name: string (required)
  members: ObjectId[] (references to Users)
  createdAt: Date
}
```

### LeaderboardEntry Model
```typescript
{
  user: ObjectId (reference to User, required)
  score: number (required)
  rank: number
  createdAt: Date
}
```

### Workout Model
```typescript
{
  name: string (required)
  duration: number
  difficulty: string
  description: string
  createdAt: Date
}
```

## Testing Endpoints

### Using cURL

**Test Root Endpoint:**
```bash
curl http://localhost:8000/
```

**Get Users:**
```bash
curl http://localhost:8000/api/users
```

**Create User:**
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@octofit.com","goal":"Lose 20lbs"}'
```

**Create Activity:**
```bash
curl -X POST http://localhost:8000/api/activities \
  -H "Content-Type: application/json" \
  -d '{"user":"<USER_ID>","type":"Running","duration":30,"calories":300,"date":"2026-08-12T10:00:00Z"}'
```

**Get Activities:**
```bash
curl http://localhost:8000/api/activities
```

## CORS Configuration

The API has CORS enabled for cross-origin requests from the frontend (port 5173).

## Database

- **Type**: MongoDB
- **Default Connection**: `mongodb://localhost:27017/octofit_db`
- **ODM**: Mongoose for schema validation and data management

## Error Handling

Errors return appropriate HTTP status codes:
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Production Deployment

When deploying to production Codespaces:
1. The `CODESPACE_NAME` environment variable is automatically set by GitHub
2. The API will use the Codespaces URL for all responses
3. Frontend should be configured with the same base URL from the API response
4. MongoDB should be hosted on a managed service (e.g., MongoDB Atlas)
