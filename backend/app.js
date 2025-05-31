const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { logger, metrics } = require('./observability');

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
dotenv.config({ path: envFile });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const romanNumeralRoutes = require('./routes/romanNumeralRoutes');
const frontendPort = process.env.FRONTEND_PORT || 5173;
const frontendHost = process.env.FRONTEND_HOST || 'localhost';  
const frontendOrigin = `http://${frontendHost}:${frontendPort}`;

// Enable CORS for all origins in production
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
};

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    metrics.httpRequestDuration.observe(
      { method: req.method, route: req.path, status_code: res.statusCode },
      duration
    );
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(3)}s`,
    });
  });
  next();
});

app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

// Base route
app.get('/', (req, res) => {
  res.send(`Roman Numeral API is running. Try /romannumeral?number={number} or /metrics`);
});

app.use('/romannumeral', romanNumeralRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// For any other route, serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server started on port ${PORT}`);
});

module.exports = app; // Export the app for testing
