const winston = require('winston');
const promClient = require('prom-client');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// TODO: Consider moving these to environment variables in production
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const SERVICE_NAME = 'roman-numeral-app';

// Initialize Prometheus metrics
const register = new promClient.Registry();
// Collect default Node.js metrics (memory, CPU, etc.)
promClient.collectDefaultMetrics({ 
  register,
  // Lower the default timeout to avoid hanging in case of issues
  timeout: 5000 
});

// Custom metrics for our specific use case
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  // Buckets tuned for our expected response times
  // Most requests should be under 1s, but we want to catch slow ones
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

const romanConversionCounter = new promClient.Counter({
  name: 'roman_conversion_total',
  help: 'Total number of Roman numeral conversions',
  labelNames: ['status'],
  registers: [register],
});

// Cache performance metrics
const cacheMetrics = {
  hits: new promClient.Counter({
    name: 'roman_cache_hits_total',
    help: 'Total number of cache hits for Roman numeral conversions',
    registers: [register],
  }),
  misses: new promClient.Counter({
    name: 'roman_cache_misses_total',
    help: 'Total number of cache misses for Roman numeral conversions',
    registers: [register],
  }),
  size: new promClient.Gauge({
    name: 'roman_cache_size',
    help: 'Current size of the Roman numeral cache',
    registers: [register],
  }),
  hitRatio: new promClient.Gauge({
    name: 'roman_cache_hit_ratio',
    help: 'Ratio of cache hits to total requests',
    registers: [register],
  })
};

// TODO: Add more specific metrics as needed:
// - Input number ranges
// - Most common conversions
// - Error types

// Winston logger setup
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'test' ? 'error' : LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      silent: process.env.NODE_ENV === 'test' // Disable console output during tests
    }),
    // TODO: Add file transport in production
    // new winston.transports.File({ 
    //   filename: 'error.log', 
    //   level: 'error' 
    // }),
  ],
});

// Add some useful logging utilities
logger.startup = (message) => {
  logger.info(`🚀 ${message}`);
};

logger.errorWithContext = (message, error, context = {}) => {
  logger.error(message, {
    error: error.message,
    stack: error.stack,
    ...context
  });
};

// OpenTelemetry setup
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: SERVICE_NAME,
  // TODO: Configure proper exporter in production
  // resource: new Resource({
  //   [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
  //   [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  // }),
});

// Start the SDK
const startSDK = async () => {
  try {
    await sdk.start();
    logger.startup('OpenTelemetry SDK started');
  } catch (error) {
    logger.errorWithContext('Failed to start OpenTelemetry SDK', error);
  }
};

// Start the SDK
startSDK();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM signal, shutting down...');
  try {
    await sdk.shutdown();
    logger.info('OpenTelemetry SDK shut down successfully');
    process.exit(0);
  } catch (error) {
    logger.errorWithContext('Error during shutdown', error);
    process.exit(1);
  }
});

// Export our observability tools
module.exports = {
  logger,
  metrics: {
    httpRequestDuration,
    romanConversionCounter,
    cacheMetrics,
    register,
  },
}; 