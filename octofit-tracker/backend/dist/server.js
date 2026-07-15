"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
const modelMap = {
    users: models_1.User,
    teams: models_1.Team,
    activities: models_1.Activity,
    leaderboard: models_1.LeaderboardEntry,
    workouts: models_1.Workout,
};
const registerResourceRoutes = (resourceName) => {
    const routePath = `/api/${resourceName}`;
    const Model = modelMap[resourceName];
    app.get([routePath, `${routePath}/`], async (_req, res) => {
        const items = await Model.find({}).lean();
        res.json(items);
    });
    app.post([routePath, `${routePath}/`], async (req, res) => {
        const item = await Model.create(req.body);
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
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
        app.listen(port, '0.0.0.0', () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
