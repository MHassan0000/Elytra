# Elytra

Community-powered issue reporting platform where citizens report problems, vote on priorities, and track resolutions in real-time.

## ⚡ Tech Stack

**Backend:** Spring Boot 3.4 • Java 21 • PostgreSQL • JWT • OAuth2  
**Frontend:** React 18 • TypeScript • Vite • TailwindCSS

## Core Features

### For Users
- **Report Issues** - Submit community problems with location, category, and priority
- **Vote & Engage** - Upvote issues to show community support
- **Track Progress** - Real-time status updates (Pending → In Progress → Resolved)
- **Get Notified** - Receive updates when your reports are addressed
- **Take Surveys** - Participate in community feedback surveys

### For Admins
- **Manage Issues** - Update status, view details, delete reports
- **User Management** - View all users, activity stats, and manage accounts
- **Create Surveys** - Build custom surveys with multiple question types
- **Analytics Dashboard** - Track platform statistics and trends
- **Location Management** - Organize issues by City → Zone → Area

## Authentication

**Local Auth:** Email/password with BCrypt + JWT  
**OAuth2:** Google & GitHub single sign-on  
**Security:** Role-based access (USER/ADMIN), protected routes, token validation

## Key Flows

### Issue Lifecycle
```
User Reports → Pending → Admin Reviews → In Progress → Resolved → User Notified
```

### Voting System
- One vote per user per issue
- Real-time upvote counter
- Prevents duplicate votes
- Issues sorted by popularity

### Survey System
- 5 question types: Text, Textarea, Radio, Checkbox, Rating
- One response per user
- Admin views all responses
- JSON storage for flexibility

## Database Schema

```
Users → Issues → Upvotes
     ↓         ↓
Notifications  ↓
     ↓    Surveys → Survey_Responses
Cities → Zones → Areas
```

## Quick Start

### Backend
```bash
# Setup PostgreSQL database
# Configure .env file
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

### Environment Variables
```env
# Backend
DB_URL=jdbc:postgresql://localhost:5432/elytra
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

# Frontend
VITE_API_URL=http://localhost:8080
```

## Default Admin

```
Email: admin@elytra.com
Password: set via APP_ADMIN_PASSWORD
```
Set `APP_ADMIN_PASSWORD` in `Backend/.env` before first startup.

## Main Routes

**Public:** `/` `/login` `/signup`  
**User:** `/dashboard` `/community-board` `/my-reports` `/submit-feedback` `/surveys` `/notifications`  
**Admin:** `/admin` `/admin/users` `/admin/issues` `/admin/surveys`

## API Highlights

```
POST   /api/auth/signup              Register
POST   /api/auth/login               Login
GET    /api/issues                   All issues
POST   /api/issues                   Create issue
POST   /api/issues/{id}/upvote       Vote
PATCH  /api/issues/{id}/status       Update status (Admin)
GET    /api/admin/stats              Dashboard stats
POST   /api/surveys                  Create survey
```

## Features at a Glance
 
 Real-time notifications  
 Responsive design  
 Search & filter  
 OAuth integration  
 Vote tracking  
 Survey builder  
 Location hierarchy  
 Role-based access  
 Profile management  
 Admin analytics
