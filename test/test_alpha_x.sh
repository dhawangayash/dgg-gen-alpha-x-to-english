#!/bin/bash
echo "Testing English to Gen Z (Alpha-x) translation..."
curl -s -X POST http://localhost:8080/api/translate/to-alpha-x \
     -H "Content-Type: application/json" \
     -d '{"text": "hello world"}'
echo -e "\n"

echo "Testing English to Gen Z (Alpha-x) translation with vibes (period)..."
curl -s -X POST http://localhost:8080/api/translate/to-alpha-x \
     -H "Content-Type: application/json" \
     -d '{"text": "hello world."}'
echo -e "\n"

echo "Testing Gen Z (Alpha-x) to English translation..."
curl -s -X POST http://localhost:8080/api/translate/to-english \
     -H "Content-Type: application/json" \
     -d '{"text": "low-key aura farming"}'
echo -e "\n"
