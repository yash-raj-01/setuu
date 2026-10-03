# SETU

SETU is a modern full-stack community platform for a student-driven organization. The project includes a landing page, event promotion, recruitment forms, domain-based application flow, and a backend API for storing submissions in PostgreSQL or an in-memory fallback.

This repository is structured as a monorepo with:
- a Vite + React frontend in `client/`
- an Express API in `server/`
- Prisma schema and database integration for PostgreSQL
- root-level scripts to run and build the project together

## Live Demo
https://setuu-fawn.vercel.app

## Tech Stack

Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- CORS
- dotenv

## Features

- Modern landing page with hero, about, events, team, and stories sections
- Recruitment application forms for multiple domains
- Event registration workflow
- Contact form support
- Theme toggle
- API-ready backend with PostgreSQL persistence
- In-memory fallback when database is not configured

## Project Structure

```bash
setuu/
├── client/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── lib/
│   ├── prisma/
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── prisma/
