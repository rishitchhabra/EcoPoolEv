import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './server/config/db.js';
import authRoutes from './server/routes/auth.js';
import ridesRoutes from './server/routes/rides.js';
import preferencesRoutes from './server/routes/preferences.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

await connectDB();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction
  }
}));

app.use(express.static(__dirname));

app.use('/api/auth', authRoutes);
app.use('/api/rides', ridesRoutes);
app.use('/api/preferences', preferencesRoutes);

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

export default app;
