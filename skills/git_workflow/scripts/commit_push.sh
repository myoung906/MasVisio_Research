#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  echo "Usage: $0 \"Commit message\""
  exit 1
fi

COMMIT_MSG="$1"

# Stage all changes
git add .

# Commit with the provided message
git commit -m "$COMMIT_MSG"

# Push to the current branch
# This assumes the current branch tracks a remote branch
git push

echo "Changes committed and pushed successfully."
