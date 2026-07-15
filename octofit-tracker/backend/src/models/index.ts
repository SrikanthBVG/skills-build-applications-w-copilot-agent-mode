import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
}

export interface ITeam extends Document {
  name: string;
  members: number;
  sport: string;
}

export interface IActivity extends Document {
  type: string;
  duration: number;
  points: number;
  userId: string;
}

export interface ILeaderboardEntry extends Document {
  name: string;
  points: number;
  streak: number;
}

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: { type: Number, default: 0 },
  sport: { type: String, default: 'fitness' },
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  points: { type: Number, required: true },
  userId: { type: String, required: true },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, default: 0 },
});

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
