import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import connectDB from './server/config/db.js';
import authRoutes from './server/routes/auth.js';
import ridesRoutes from './server/routes/rides.js';
import preferencesRoutes from './server/routes/preferences.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
const staticRoot = process.cwd();
let dbInitialized = false;

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (dbInitialized) return next();
  try {
    await connectDB();
    dbInitialized = true;
    return next();
  } catch (error) {
    console.error('DB init error:', error);
    return res.status(500).json({ error: 'Database connection failed.' });
  }
});

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

app.use(express.static(staticRoot));

app.use('/api/auth', authRoutes);
app.use('/api/rides', ridesRoutes);
app.use('/api/preferences', preferencesRoutes);

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Support direct navigation to static HTML pages when all paths are rewritten to this function.
app.get('/:page', (req, res, next) => {
  const { page } = req.params;
  if (!page || extname(page)) return next();

  const candidate = join(staticRoot, `${page}.html`);
  if (existsSync(candidate)) {
    return res.sendFile(candidate);
  }
  return next();
});

export default app;
