const dotenv = require('dotenv');
const cors = require('cors');
const { logger, metrics } = require('./observability');
const configureCors = require('./config/cors');

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
dotenv.config({ path: envFile });

const express = require('express');
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5002;

const romanNumeralRoutes = require('./routes/romanNumeralRoutes');
const frontendPort = process.env.FRONTEND_PORT || 5173;
const frontendHost = process.env.FRONTEND_HOST || 'localhost';  
const frontendOrigin = `http://${frontendHost}:${frontendPort}`;
const frontendOriginAlt = `http://0.0.0.0:${frontendPort}`;

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

// Apply CORS configuration
app.use(cors(configureCors()));

// Middleware to parse JSON
app.use(express.json());

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

// Base route
app.get('/', (req, res) => {
  const host = process.env.NODE_ENV === 'test' ? '{host}' : 'localhost';
  const port = process.env.NODE_ENV === 'test' ? '{port}' : BACKEND_PORT;
  res.send(`No API at this endpoint, please try hitting http://${host}:${port}/romannumeral?number={number} or http://${host}:${port}/metrics to see metrics`);
});

app.use('/romannumeral', romanNumeralRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Conditionally start server only if the script is run directly
if (require.main === module) {
  app.listen(BACKEND_PORT, () => {
    const host = process.env.NODE_ENV === 'test' ? '{host}' : 'localhost';
    const port = process.env.NODE_ENV === 'test' ? '{port}' : BACKEND_PORT;
    logger.startup(`Backend server is running on port ${BACKEND_PORT}, you can access backend using http://${host}:${port}`);
    logger.info(`Server started`, {
      port: BACKEND_PORT,
      frontendOrigin,
      environment: process.env.NODE_ENV || 'development'
    });
  });
}

module.exports = app; // Export the app for testing
