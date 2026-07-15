import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'student' },
      { name: 'Mason Lee', email: 'mason@example.com', role: 'student' },
      { name: 'Priya Patel', email: 'priya@example.com', role: 'coach' },
    ]);

    await Team.insertMany([
      { name: 'Trail Blazers', members: 4, sport: 'running' },
      { name: 'Core Crushers', members: 5, sport: 'strength' },
    ]);

    await Activity.insertMany([
      { type: 'run', duration: 30, points: 120, userId: users[0]._id.toString() },
      { type: 'strength', duration: 45, points: 140, userId: users[1]._id.toString() },
      { type: 'walk', duration: 20, points: 80, userId: users[2]._id.toString() },
    ]);

    await LeaderboardEntry.insertMany([
      { name: 'Ava Chen', points: 120, streak: 5 },
      { name: 'Mason Lee', points: 140, streak: 3 },
      { name: 'Priya Patel', points: 80, streak: 2 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Circuit', difficulty: 'medium', duration: 25 },
      { name: 'Core Strength', difficulty: 'hard', duration: 35 },
      { name: 'Morning Walk', difficulty: 'easy', duration: 20 },
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
