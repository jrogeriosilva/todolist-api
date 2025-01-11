# Todo List API

A simple REST API for managing tasks built with NestJS.

## Description

This project is a task management API that allows users to:
- Create tasks
- List all tasks
- Get task by ID
- Update tasks
- Delete tasks
- Mark tasks as complete/incomplete

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Installation

```bash
# Clone this repository

cd todo-list

npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Endpoints

- `POST /tasks` - Create a new task
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get task by ID
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/complete` - Toggle task completion

## Tech Stack

- NestJS
- TypeScript
- Jest
- Class Validator
- CORS