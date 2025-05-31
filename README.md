# Roman Number Converter

A full-stack application that converts numbers to Roman numerals, built with React (Frontend) and Node.js (Backend).

For a detailed walkthrough of the development process, including technical decisions, implementation details, and architectural choices, please see my [Development Journey](./DEVELOPMENT_JOURNEY.md) documentation. A concise version is also available [here](./SHORT_DEVELOPMENT_JOURNEY)

## Features

- Convert numbers to Roman numerals
- Dark/Light mode theming
- Form validation
- Local storage for remembering last converted number
- Caching for improved performance
- Comprehensive observability (logs, metrics, traces)
- Docker containerization support

## Tech Stack

### Frontend

- React with Vite
- Adobe React Spectrum for UI components
- Web Vitals for performance monitoring
- Custom hooks for local storage management

### Backend

- Node.js with Express
- In-memory caching
- Winston for logging
- Prometheus for metrics
- OpenTelemetry for tracing

## Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd roman-number-app
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers:

Backend:

```bash
# Default port (5002)
cd backend
npm start

# Custom port
cd backend
PORT=3000 npm start
```

Frontend:

```bash
# Default port (5173)
cd frontend
npm run dev

# Custom port
cd frontend
VITE_BACKEND_PORT=3000 npm run dev
```

The application will be available at, by default

- Frontend: http://localhost:5173
- Backend: http://localhost:5002

Port numbers can be configured as environment variables

### Docker Deployment

#### Standalone Backend

```bash
# Default port (3131)
Build
docker-compose -f docker-compose.be.yml --build

Run
docker-compose -f docker-compose.be.yml up 


# Custom port
Run
BACKEND_PORT=3333 FRONTEND_PORT=5353 docker-compose -f docker-compose.be.yml up 
```

#### Standalone Frontend

```bash
# Default port (5151)
Build
docker-compose -f docker-compose.fe.yml --build

Run
docker-compose -f docker-compose.fe.yml up 


# Custom port
Run
BACKEND_PORT=3333 FRONTEND_PORT=5353 docker-compose -f docker-compose.fe.yml up 
```

#### Multiple Backend with One or many frontend

Simple Load Balancer Setup (Docker Compose + Nginx):

Good for: Fixed number of backend instances
Pros:

- Simpler to set up and maintain
- Less overhead

Good for development and small-scale production
Cons:

- Manual scaling (need to manually add/remove containers)
- No automatic failover
- No automatic health checks

Kubernetes Setup:

Good for: Dynamic scaling, high availability

Pros:

- Automatic scaling based on load
- Automatic failover
- Health checks and self-healing
- Service discovery

Cons:

- More complex to set up and maintain
- Higher resource overhead
- Steeper learning curve

#### Full Stack

```bash
# Default ports
docker-compose up --build

# Custom ports
BACKEND_PORT=3131 FRONTEND_PORT=5151 BACKEND_HOST=localhost FRONTEND_HOST=localhost docker-compose --build
```

The full stack application will be available at:
- Frontend: http://localhost:5151 (default) or http://localhost:${FRONTEND_PORT}
- Backend: http://localhost:3131 (default) or http://localhost:${BACKEND_PORT}

## Environment Variables

Create a `.env` file in the root directory based on `.env.sample`:

```env
# Port Configuration
BACKEND_PORT=<PORT_NUMBER_FOR_BACKEND_SERVICE>  # Default: 5002
FRONTEND_PORT=<PORT_NUMBER_FOR_FRONTEND_APP>    # Default: 5173

# Host Configuration
BACKEND_HOST=<HOST_NAME_FOR_BACKEND_SERVICE>    # Default: localhost
FRONTEND_HOST=<HOST_NAME_FOR_FRONTEND_APP>      # Default: localhost

# Environment Configuration
NODE_ENV=<NODE_ENVIRONMENT_LEVEL>               # Default: development
LOG_LEVEL=<LOG_LEVEL_FOR_BACKEND_SERVICE>       # Default: info
```

### Backend
- `PORT`: Backend server port (default: 5002)
- `FRONTEND_PORT`: Frontend server port (default: 5173)
- `FRONTEND_HOST`: Frontend host (default: localhost)
- `LOG_LEVEL`: INFO, DEBUG or WARN, can be set.

### Frontend

- `VITE_BACKEND_HOST`: Backend host (default: localhost)
- `VITE_BACKEND_PORT`: Backend port (default: 5002)

## Observability

### Backend

- Logs: Available through Winston logger
- Metrics: Available at `/metrics` endpoint
- Traces: Implemented using OpenTelemetry

### Frontend

- Performance metrics: Web Vitals
- User interactions tracking
- API call monitoring
- Component render tracking
- Error tracking
- Cache performance monitoring

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Project Structure

```
roman-number-app/
├── backend/
│   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── observability/
│   │   └── tests/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── utils/
│   │   │   └── hooks/
│   │   └── tests/
│   └── docker-compose.yml
```

