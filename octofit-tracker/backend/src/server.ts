import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

const modelMap = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
};

const registerResourceRoutes = (resourceName: keyof typeof modelMap) => {
  const routePath = `/api/${resourceName}`;
  const Model = modelMap[resourceName];

  app.get([routePath, `${routePath}/`], async (_req, res) => {
    const items = await (Model as any).find({}).lean();
    res.json(items);
  });

  app.post([routePath, `${routePath}/`], async (req, res) => {
    const item = await (Model as any).create(req.body);
    res.status(201).json(item);
  });
};

registerResourceRoutes('users');
registerResourceRoutes('teams');
registerResourceRoutes('activities');
registerResourceRoutes('leaderboard');
registerResourceRoutes('workouts');

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
