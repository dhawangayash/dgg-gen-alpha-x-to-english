#!/bin/bash

# Alpha-x Uber Start Script
# Starts Spring Boot (8080) and Next.js (3000)

echo "🚀 Starting Alpha-x Translator Full Stack..."

# Function to handle cleanup on exit
cleanup() {
    echo -e "\n🛑 Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# 1. Start Backend (Spring Boot)
echo "🍃 Starting Kotlin Backend on port 8080..."
./gradlew bootRun > backend.log 2>&1 &
BACKEND_PID=$!

# 2. Start Frontend (Next.js)
echo "⚛️ Starting Next.js Frontend on port 3000..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "⏳ Waiting for servers to warm up..."
echo "📊 Logs: tail -f backend.log or tail -f frontend.log"
echo "✅ App will be ready at http://localhost:3000"

# Keep script running
wait
