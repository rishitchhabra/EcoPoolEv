import mongoose from 'mongoose';

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to your environment variables.');
  }

  // Reuse connection across local hot reloads and Vercel function invocations.
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  connectionPromise = mongoose.connect(process.env.MONGODB_URI)
    .then(conn => {
      console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
      return conn;
    })
    .catch(error => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
};

export default connectDB;
