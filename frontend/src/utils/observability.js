import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

// Helper to check if we're in test environment
const isTestEnv = process.env.NODE_ENV === 'test';

// TODO: Move to a proper analytics service in prod
// For now, just log to console for debugging
const reportWebVitals = (metric) => {
  if (!isTestEnv) {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
  }
};

// Set up core web vitals monitoring
export const initWebVitals = () => {
  if (!isTestEnv) {
    // These are the main metrics we care about for now
    getCLS(reportWebVitals);  // Layout shifts
    getFID(reportWebVitals);  // Input responsiveness
    getLCP(reportWebVitals);  // Loading performance
    getFCP(reportWebVitals);  // First paint
    getTTFB(reportWebVitals);  // Time to first byte
  }
};

// Basic error logging - expand this when we add proper error tracking
export const logError = (error, errorInfo) => {
  if (!isTestEnv) {
    // Log the basics for now
    console.error('[Error]', error.message);
    if (errorInfo) {
      console.error('[Error Context]', errorInfo);
    }
    // TODO: Add stack trace in dev only
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
  }
};

// Track user actions - we'll need to add more events as we go
export const trackUserInteraction = (action, data = {}) => {
  if (!isTestEnv) {
    // Simple event logging for now
    console.log(`[User Action] ${action}`, {
      ...data,
      time: new Date().toLocaleTimeString() // Using local time for easier debugging
    });
  }
};

// API call tracking - basic for now, will enhance with more details later
export const trackApiCall = (endpoint, method, status, duration) => {
  if (!isTestEnv) {
    console.log(`[API] ${method} ${endpoint}`, {
      status,
      duration: `${Math.round(duration)}ms`, // Round to whole ms for readability
      time: new Date().toLocaleTimeString()
    });
  }
};

// Component tracking - might be too verbose, we'll see
export const trackComponentRender = (componentName, props = {}) => {
  // Only log in dev for now
  if (process.env.NODE_ENV === 'development' && !isTestEnv) {
    console.log(`[Render] ${componentName}`, {
      props: Object.keys(props), // Just log prop names to avoid noise
      time: new Date().toLocaleTimeString()
    });
  }
};

// Cache tracking - added this later when we noticed performance issues
export const trackCachePerformance = (action, data = {}) => {
  if (!isTestEnv) {
    console.log(`[Cache] ${action}`, {
      ...data,
      time: new Date().toLocaleTimeString()
    });
  }
}; 