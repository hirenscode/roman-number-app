const { logger } = require('../observability');

const configureCors = () => {
  const frontendPort = process.env.FRONTEND_PORT || 5151;
  const frontendHost = process.env.FRONTEND_HOST || 'localhost';  
  const frontendOrigin = `http://${frontendHost}:${frontendPort}`;
  const frontendOriginAlt = `http://0.0.0.0:${frontendPort}`;

  // Enable CORS in development, test, or if explicitly configured for production
  const enableCors = process.env.NODE_ENV === 'development' || 
                    process.env.NODE_ENV === 'test' || 
                    process.env.ENABLE_CORS === 'true';

  const corsOptions = enableCors ? {
    origin: (origin, callback) => {
      // In test environment, always return the exact origin
      if (process.env.NODE_ENV === 'test') {
        callback(null, origin);
        return;
      }
      
      const allowedOrigins = [frontendOrigin, frontendOriginAlt];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // This ensures the exact origin is returned instead of '*'
    optionsSuccessStatus: 200 
  } : false;

  // Log CORS configuration
  if (enableCors) {
    logger.info('CORS Policy configured', {
      allowedOrigins: process.env.NODE_ENV === 'test' ? 'dynamic' : [frontendOrigin, frontendOriginAlt],
      optionsSuccessStatus: corsOptions.optionsSuccessStatus,
      environment: process.env.NODE_ENV
    });
  } else {
    logger.info('CORS is disabled', {
      environment: process.env.NODE_ENV
    });
  }

  return corsOptions;
};

module.exports = configureCors;