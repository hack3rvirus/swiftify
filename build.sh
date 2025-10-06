#!/bin/bash

# Custom build script for Netlify
# This ensures only the frontend is built and Python is never installed

echo "Starting custom frontend build..."

cd frontend

# Install Node.js dependencies
npm install

# Build the frontend
npm run build

echo "Frontend build completed successfully"
