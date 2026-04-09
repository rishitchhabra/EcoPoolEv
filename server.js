import app from './app.js';

const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚗 EcoPool EV server running at http://localhost:${PORT}`);
    console.log(`📦 API available at http://localhost:${PORT}/api\n`);
  });
}

export default app;
