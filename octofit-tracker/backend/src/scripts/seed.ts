import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ava Patel', email: 'ava@octofit.app', goal: 'Build endurance' },
      { name: 'Marcus Lee', email: 'marcus@octofit.app', goal: 'Strength gains' },
      { name: 'Nia Gomez', email: 'nia@octofit.app', goal: 'Improve mobility' },
      { name: 'Lena Kim', email: 'lena@octofit.app', goal: 'Train for a triathlon' },
    ]);

    const teams = await Team.create([
      {
        name: 'Trailblazers',
        members: [users[0]._id, users[3]._id],
        weeklyGoal: 'Complete 120 miles',
      },
      {
        name: 'Iron Circuit',
        members: [users[1]._id],
        weeklyGoal: 'Hit 5 strength sessions',
      },
      {
        name: 'Recovery Crew',
        members: [users[2]._id],
        weeklyGoal: 'Log 3 mobility sessions',
      },
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Run',
        duration: 42,
        calories: 390,
        date: new Date('2026-08-10'),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        duration: 55,
        calories: 430,
        date: new Date('2026-08-09'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        duration: 30,
        calories: 180,
        date: new Date('2026-08-11'),
      },
      {
        user: users[3]._id,
        type: 'Swim',
        duration: 50,
        calories: 520,
        date: new Date('2026-08-12'),
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.create([
      { user: users[0]._id, score: 980, streak: 12, rank: 1 },
      { user: users[1]._id, score: 940, streak: 9, rank: 2 },
      { user: users[2]._id, score: 910, streak: 7, rank: 3 },
      { user: users[3]._id, score: 870, streak: 5, rank: 4 },
    ]);

    const workouts = await Workout.create([
      {
        title: '5K Builder',
        focus: 'Cardio',
        duration: 35,
        difficulty: 'Intermediate',
        description: 'Progressive 5K training to improve pace and endurance.',
      },
      {
        title: 'Power Circuit',
        focus: 'Strength',
        duration: 45,
        difficulty: 'Advanced',
        description: 'Full-body strength circuit with dynamic power moves.',
      },
      {
        title: 'Mobility Reset',
        focus: 'Recovery',
        duration: 20,
        difficulty: 'Beginner',
        description: 'Gentle mobility flow to reduce stiffness and improve range.',
      },
      {
        title: 'Triathlon Prep',
        focus: 'Endurance',
        duration: 60,
        difficulty: 'Advanced',
        description: 'Swim-bike-run combination for longer endurance sessions.',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ${workouts.length} workouts.`);

    await mongoose.disconnect();
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
