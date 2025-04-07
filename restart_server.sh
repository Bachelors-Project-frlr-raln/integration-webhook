#!/bin/bash

# Get the PID of the service running on port 3009
PID=$(lsof -ti :3009)

if [ -n "$PID" ]; then
  echo "Stopping service running on port 3009 with PID: $PID"
  kill "$PID"

  # Wait for the service to shut down
  while kill -0 "$PID" 2>/dev/null; do
    echo "Waiting for service to shut down..."
    sleep 5
  done
  echo "Service stopped."
else
  echo "No service running on port 3009."
fi

# Remove the output.log file
if [ -f "output.log" ]; then
  echo "Removing output.log file..."
  rm output.log
else
  echo "output.log file does not exist."
fi

# Start the server
echo "Starting the server..."
nohup npm start > output.log 2>&1 &

echo "Server started. Logs are being written to output.log."