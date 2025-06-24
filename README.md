# Rehearsal Scheduler

A comprehensive web application for bands to schedule rehearsals, track attendance, send automated reminders, and suggest optimal rehearsal times based on member availability.

## Features

- **User Authentication and Band Management**
  - Secure login and registration
  - Create and manage bands/groups
  - Invite members with role assignments

- **Smart Scheduling**
  - Calendar-based scheduling interface
  - Availability polling with conflict detection
  - Algorithm to suggest optimal rehearsal times
  - Recurring rehearsal setup

- **Attendance Tracking**
  - RSVP functionality
  - Attendance history and reporting
  - Absence notifications

- **Rehearsal Organization**
  - Song database with metadata
  - Drag-and-drop setlist builder
  - Time estimation for rehearsal planning
  - Venue/location management

- **Communication Tools**
  - Automated email and push notifications
  - Customizable reminder templates
  - Resource sharing (sheet music, audio, etc.)

- **Mobile Responsive**
  - Fully responsive design for all devices
  - Progressive Web App capabilities

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI components
- FullCalendar for scheduling interface

### Backend
- Node.js with Express
- RESTful API with JWT authentication
- PostgreSQL database with Sequelize/Prisma ORM
- Redis for caching

### DevOps
- Docker containerization
- AWS deployment (EC2, RDS, S3)
- GitHub Actions CI/CD pipeline

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL
- Redis

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/rehearsal-scheduler-20250624.git
   cd rehearsal-scheduler-20250624
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   ```bash
   # Backend .env
   cp backend/.env.example backend/.env
   # Frontend .env
   cp frontend/.env.example frontend/.env
   ```

4. Set up the database
   ```bash
   # Using Docker
   docker-compose up -d postgres redis

   # Or manually with PostgreSQL
   createdb rehearsal_scheduler
   cd backend
   npm run migrate
   ```

5. Start the development servers
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm start
   ```

6. Access the application at `http://localhost:3000`

### Using Docker

You can also run the entire application using Docker:

```bash
docker-compose up -d
```

This will set up the frontend, backend, PostgreSQL, and Redis services.

## Deployment

### Manual Deployment

1. Build the frontend
   ```bash
   cd frontend
   npm run build
   ```

2. Set up your production environment variables
3. Deploy to your server of choice

### Using AWS

Instructions for deploying to AWS with EC2, RDS, and S3 are available in the [deployment documentation](docs/deployment.md).

## Development Roadmap

- Phase 1: Core Authentication and Band Management
- Phase 2: Scheduling and Availability Features
- Phase 3: Setlist and Resource Management
- Phase 4: Analytics and Advanced Features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.