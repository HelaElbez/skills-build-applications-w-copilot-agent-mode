import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import LeaderboardEntry from './models/leaderboard';
import Workout from './models/workout';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiBaseUrl(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
  });
});

app.get(['/api/users', '/api/users/'], async (req, res) => {
  const users = await User.find();
  res.json({ apiUrl: getApiBaseUrl(), count: users.length, results: users });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: 'User created', user });
});

app.get(['/api/teams', '/api/teams/'], async (req, res) => {
  const teams = await Team.find().populate('members', 'name email goal');
  res.json({ apiUrl: getApiBaseUrl(), count: teams.length, results: teams });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  const created = await Team.findById(team._id).populate('members', 'name email goal');
  res.status(201).json({ message: 'Team created', team: created });
});

app.get(['/api/activities', '/api/activities/'], async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email goal');
  res.json({ apiUrl: getApiBaseUrl(), count: activities.length, results: activities });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json({ message: 'Activity created', activity });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ score: -1 })
    .populate('user', 'name email goal');
  res.json({ apiUrl: getApiBaseUrl(), count: leaderboard.length, results: leaderboard });
});

app.get(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workouts = await Workout.find();
  res.json({ apiUrl: getApiBaseUrl(), count: workouts.length, results: workouts });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json({ message: 'Workout created', workout });
});

export { app };

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`OctoFit API server running on http://localhost:${PORT}`);
    console.log(`Codespaces API URL: ${getApiBaseUrl()}`);
  });
}
