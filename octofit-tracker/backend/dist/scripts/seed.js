"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to octofit_db');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        const users = await models_1.User.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'student' },
            { name: 'Mason Lee', email: 'mason@example.com', role: 'student' },
            { name: 'Priya Patel', email: 'priya@example.com', role: 'coach' },
        ]);
        await models_1.Team.insertMany([
            { name: 'Trail Blazers', members: 4, sport: 'running' },
            { name: 'Core Crushers', members: 5, sport: 'strength' },
        ]);
        await models_1.Activity.insertMany([
            { type: 'run', duration: 30, points: 120, userId: users[0]._id.toString() },
            { type: 'strength', duration: 45, points: 140, userId: users[1]._id.toString() },
            { type: 'walk', duration: 20, points: 80, userId: users[2]._id.toString() },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { name: 'Ava Chen', points: 120, streak: 5 },
            { name: 'Mason Lee', points: 140, streak: 3 },
            { name: 'Priya Patel', points: 80, streak: 2 },
        ]);
        await models_1.Workout.insertMany([
            { name: 'HIIT Circuit', difficulty: 'medium', duration: 25 },
            { name: 'Core Strength', difficulty: 'hard', duration: 35 },
            { name: 'Morning Walk', difficulty: 'easy', duration: 20 },
        ]);
        console.log('Database seeding complete');
        await (0, database_1.disconnectDatabase)();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
