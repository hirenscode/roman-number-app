#!/bin/bash

# Start backend
cd /app/backend
PORT=$PORT npm start &

# Start frontend
cd /app/frontend
serve -s dist -l $PORT &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $? 
 