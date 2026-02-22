# bkit Setup and Usage Guide

## Overview
`bkit` (Vibecoding Kit) is a set of tools designed to enhance the AI coding experience, particularly with PDCA (Plan-Do-Check-Act) methodologies. As it operates as a plugin for your AI environment (Claude Code or Gemini CLI), it requires installation on your local machine.

## Installation

### For Claude Code (Recommended)
1.  Open your terminal.
2.  Launch Claude Code.
3.  Type `/market` to open the marketplace (or follow on-screen instructions if different for your version).
4.  Search for "bkit" or "Vibecoding Kit".
5.  Install the plugin.

### For Gemini CLI
1.  Ensure you have Gemini CLI installed (`gemini --version`).
2.  Install the bkit plugin using the specific installation command provided by the `bkit-gemini` repository or marketplace.
    *   *Example*: `gemini plugin install bkit` (Verify exact command from source).

## Verification
After installation, run:
```bash
bkit --version
```
or check the list of installed plugins in your AI tool.

## Features
- **PDCA Workflow**: enforces structured planning and execution.
- **Context Engineering**: Optimizes context for better AI responses.
- **Agent Teams**: Simulates a team of agents for complex tasks.
