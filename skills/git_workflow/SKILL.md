---
name: git_workflow
description: Automate the atomic commit and push workflow defined in AGENTS.md. Ensures consistent commit messages and immediate pushing to the remote repository.
---

# Git Workflow Skill

## Overview
This skill provides scripts to automate the project's atomic commit and push policy.

## Usage
Run the script to stage, commit, and push changes in one go.

```bash
./skills/git_workflow/scripts/commit_push.sh "Your commit message"
```

## Prerequisites
- Git configured with `user.name` and `user.email`.
- Remote `origin` set up.
- Credentials stored (e.g., via credential helper or SSH key).
