import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(connectionString);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

export default mongoose.connection;
