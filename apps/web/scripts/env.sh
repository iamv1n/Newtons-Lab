#!/bin/bash
  echo "# Required" > .env

if [ -z "$DEPLOYMENT_ID" ]; then
  echo "WEB_PORT=8099" >> .env
  echo "API_BASE_URL=http://localhost:3099" >> .env
  echo "TOOL_BASE_URL=http://localhost:3002" >> .env
  # Add Google-related environment variables
  echo "GOOGLE_CLIENT_ID=" >> .env
  echo "GOOGLE_MAPS_API=" >> .env
fi

