# Start-up Steps

### Docker Deployment

#### Standalone Backend

```bash
# Default port (3131)
# Build and Run
docker-compose -f docker-compose.be.yml up --build

# Run
docker-compose -f docker-compose.be.yml up 


# Custom port
Run
BACKEND_PORT=3333 FRONTEND_PORT=5353 docker-compose -f docker-compose.be.yml up 
```

#### Standalone Frontend

```bash
# Default port (5151)
# Build and Run
docker-compose -f docker-compose.fe.yml up --build

# Run
docker-compose -f docker-compose.fe.yml up 


# Custom port
# Run
BACKEND_PORT=3333 FRONTEND_PORT=5353 docker-compose -f docker-compose.fe.yml up 
```

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


[README](README.md)

[Devepment Journey](./DEVELOPMENT_JOURNEY.md)

