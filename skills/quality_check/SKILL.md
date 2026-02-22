---
name: quality_check
description: Evaluate code quality using flake8 (linter) and mypy (static type checker).
---

# Quality Check Skill

## Overview
This skill runs standard Python quality tools to identify code style issues, potential bugs, and type inconsistencies.

## Usage
Run the script to analyze the entire project:

```bash
./skills/quality_check/scripts/run_analysis.sh
```

## Tools
- **flake8**: Enforces PEP 8 style guide.
- **mypy**: Checks for static type errors.
