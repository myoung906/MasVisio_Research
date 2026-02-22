#!/bin/bash

# Ensure virtual environment is active (optional, depends on user workflow)
# source venv/bin/activate

echo "Running flake8..."
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics --exclude=venv,.git,__pycache__
flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics --exclude=venv,.git,__pycache__

echo -e "\nRunning mypy..."
mypy . --ignore-missing-imports --exclude venv
