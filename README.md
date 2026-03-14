# Elytra - Community Issue Reporting Platform

A full-stack web application for reporting and managing community issues with real-time tracking, voting, and surveys.

---

## Tech Stack

**Backend**
- Spring Boot 3.4.0
- Java 21
- PostgreSQL
- Spring Security + JWT
- OAuth2 (Google, GitHub)
- JPA/Hibernate

**Frontend**
- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

---

## Authentication Flow

**Local Registration**
- User submits username, email, password
- Backend validates uniqueness
- Password hashed with BCrypt
- User created with USER role
- JWT token generated and returned
- Token stored in localStorage
- User redirected to dashboard

**Local Login**
- User submits email and password
- Backend authenticates via Spring Security
- JWT token generated on success
- Token includes user ID, username, email, role
- Frontend stores token and user data
- Protected routes accessible

**OAuth2 Login (Google/GitHub)**
- User clicks OAuth provider button
- Redirected to provider login page
- Provider authenticates user
- Callback to backend with OAuth data
- Backend creates/updates user account
- JWT token generated
- Redirected to frontend with token
- Token stored and user logged in

**Token Management**
- JWT stored in localStorage
- Sent in Authorization header for API calls
- Backend validates token on protected routes
- Token refresh on profile updates (username change)
- Logout clears token and security context

**Protected Routes**
- All API endpoints require authentication except /api/auth/**
- Admin endpoints require ADMIN role
- JWT filter intercepts requests
- Invalid/expired tokens return 401

---

## User Dashboard Flow

**Initial Load**
- Fetch user issue statistics (total, pending, in progress, resolved)
- Fetch recent 4 issues by user
- Display welcome message with username
- Show stats in card grid

**Stats Display**
- Total Reports: All issues created by user
- In Progress: Issues being worked on
- Resolved: Completed issues
- Pending: Awaiting action

**Recent Activity Table**
- Shows last 4 issues
- Displays title, category, status, date
- Status badges (color-coded)
- Time ago formatting
- Click "View All" to go to My Reports

**Community Impact Widget**
- Circular progress showing resolution rate
- Percentage of resolved vs total issues
- Visual feedback on contribution

**Quick Actions**
- Report Issue button
- Community Board button
- Direct navigation shortcuts

---

## Issue Reporting Flow

**Submit Feedback Page**
- User fills form with:
  - Title (required)
  - Description (required)
  - Category selection (dropdown)
  - Priority (LOW, MEDIUM, HIGH)
  - Location (City, Zone, Area - optional)
- Form validation on submit
- API call to create issue
- Issue created with PENDING status
- Initial upvote count = 0
- Timestamp recorded
- User redirected to dashboard
- Success notification shown

**Issue Data Structure**
- Linked to user (creator)
- Linked to location (city/zone/area)
- Status: PENDING, IN_PROGRESS, RESOLVED
- Priority: LOW, MEDIUM, HIGH
- Upvotes counter
- Created/updated timestamps
- Resolved timestamp (when applicable)

---

## Community Board Flow

**Page Load**
- Fetch all issues sorted by upvotes (default)
- Display filter options (All, Pending, In Progress, Resolved)
- Show vote buttons for each issue
- Check user's vote status for each issue

**Filtering**
- Click status filter
- Fetch issues by status
- Update display
- Maintain sort by upvotes

**Voting System**
- User clicks upvote button
- API call to add/remove vote
- Backend updates issue upvote count
- Creates/deletes Upvote record
- Prevents duplicate votes
- Real-time count update
- Button state changes (filled/outline)

**Issue Details Modal**
- Click on any issue card
- Modal opens with full details
- Shows description, category, location
- Displays upvote count
- Shows status and priority
- Created date visible
- Close modal to return

**Delete Own Issues**
- Delete button visible only to issue creator
- Click delete button
- Confirmation modal appears
- Confirm to delete
- Issue removed from database
- Upvotes cascade deleted
- List refreshes

---

## My Reports Flow

**Page Load**
- Fetch all issues created by current user
- Calculate statistics
- Display in stat cards
- Show all reports in list

**Report Cards**
- Title and description
- Category and location
- Status badge
- Priority indicator
- Upvote count
- Submission date
- Resolution date (if resolved)

**Actions**
- View Details: Navigate to community board
- Share: Copy link to clipboard
- Track status changes over time

---

## Notification System Flow

**Notification Creation**
- Admin changes issue status
- Backend creates notification
- Linked to issue and user
- Type: ISSUE_UPDATE, ISSUE_RESOLVED, ISSUE_IN_PROGRESS, SYSTEM
- Initially unread

**User Notification Page**
- Fetch user notifications
- Display unread count in header
- Show notification list
- Most recent first
- Unread highlighted

**Notification Actions**
- Click to mark as read
- Delete notification
- Click issue link to view details
- Real-time badge count update

**Notification Types**
- Issue status changed to IN_PROGRESS
- Issue status changed to RESOLVED
- System announcements
- General issue updates

---

## Survey System Flow

**User View - Surveys Page**
- Fetch all active surveys
- Display survey cards
- Show title, description, question count
- Check if user already submitted

**Taking Survey**
- Click on survey card
- Navigate to survey detail page
- Display all questions
- Question types:
  - Short text input
  - Long text (textarea)
  - Single choice (radio)
  - Multiple choice (checkbox)
  - Rating (1-5 stars)
- Required field validation
- Submit responses
- Store as JSON in database
- Prevent duplicate submissions

**Survey Response Storage**
- User ID linked to response
- Survey ID linked to response
- Responses stored as JSON string
- Timestamp recorded
- One response per user per survey

---

## Admin Dashboard Flow

**Dashboard Overview**
- Total users count
- Total reports count
- Pending reports count
- Resolved reports count
- In progress reports count
- Recent users table (last 5)
- User details with report counts

**Stats Calculation**
- Real-time database queries
- Aggregated counts
- Percentage changes (mock data)
- Visual stat cards

---

## Admin User Management Flow

**User List**
- Fetch all users with stats
- Filter out admin users from display
- Show username, email, role, status
- Display report count per user
- Join date visible

**Search Functionality**
- Search by username or email
- Real-time filtering
- Case-insensitive search

**User Actions**
- View user details (navigate to detail page)
- Delete user (with confirmation)
- Cascade delete all user data

**User Detail Page**
- Full user information
- List of all user's issues
- Issue statistics
- Activity timeline

---

## Admin Issue Management Flow

**Issues List**
- Fetch all issues from all users
- Display in sortable table
- Show reporter username
- Category and upvote count
- Current status

**Filtering & Search**
- Filter by status (All, Pending, In Progress, Resolved)
- Search by title or category
- Results update in real-time
- Sort by upvotes (highest first)

**Status Management**
- Dropdown to change status
- Update triggers notification
- PENDING → IN_PROGRESS: Notify user
- IN_PROGRESS → RESOLVED: Notify user, set resolved timestamp
- Real-time UI update

**Issue Detail Modal**
- Full issue information
- Reporter details
- Location information
- Community support (upvotes)
- Quick action buttons
- Status change buttons
- Delete option

**Delete Issue**
- Confirmation dialog
- Permanent deletion
- Cascade delete upvotes and notifications
- List refreshes

---

## Admin Survey Management Flow

**Survey List**
- Display all surveys
- Show title, description
- Response count per survey
- Active/Closed status
- Creation date

**Create Survey**
- Click "Create" button
- Modal form opens
- Enter title and description
- Add questions dynamically
- Configure question types
- Add options for choice questions
- Set required fields
- Validate before submission
- Save to database

**Question Types Configuration**
- Short Text: Simple input
- Long Text: Textarea
- Single Choice: Radio buttons with options
- Multiple Choice: Checkboxes with options
- Rating: 1-5 star selection

**Survey Responses**
- Click on survey to view responses
- List all user submissions
- Show username and submission date
- View individual response details
- Export capability (future)

**Delete Survey**
- Confirmation dialog
- Deletes survey and all responses
- Permanent action

---

## Location Management Flow

**City/Zone/Area Structure**
- Hierarchical location system
- City contains multiple Zones
- Zone contains multiple Areas
- Issues can be tagged with location

**Admin Location Management**
- Add new cities
- Add zones to cities
- Add areas to zones
- Edit existing locations
- Delete locations (cascade)

**User Location Selection**
- Dropdown cascading selection
- Select city → zones load
- Select zone → areas load
- Optional for issue reporting

---

## Profile Management Flow

**View Profile**
- Display username
- Display email (read-only)
- Show profile picture
- Display role and status
- Show account creation date
- Provider info (Local/Google/GitHub)

**Update Profile**
- Change username (with uniqueness check)
- Upload profile picture (base64 or URL)
- Submit changes
- Backend validates
- New JWT token generated if username changed
- Token updated in localStorage
- UI refreshes with new data

**Profile Picture**
- OAuth users get picture from provider
- Local users can upload custom picture
- Stored as URL or base64 string
- Displayed in header and profile page

---

## Security Features

**Password Security**
- BCrypt hashing (strength 10)
- Never stored in plain text
- Validated on login
- Cannot be retrieved

**JWT Security**
- Signed with secret key
- Contains user claims
- Expiration time set
- Validated on each request
- Refresh on critical updates

**Role-Based Access**
- USER role: Standard features
- ADMIN role: Management features
- Endpoint protection via @PreAuthorize
- Frontend route guards

**CORS Configuration**
- Allowed origins: localhost:5173, localhost:3000
- Credentials allowed
- All HTTP methods supported
- Headers exposed

**Input Validation**
- Backend validation with Jakarta Validation
- Frontend form validation
- SQL injection prevention (JPA)
- XSS protection

---

## Database Schema

**Users Table**
- id, username, email, password_hash
- role (USER/ADMIN)
- status (ACTIVE/INACTIVE)
- provider (LOCAL/GOOGLE/GITHUB)
- provider_id, profile_picture
- email_verified
- created_at, updated_at

**Issues Table**
- id, user_id, title, description
- category, priority, status
- city_id, zone_id, area_id
- upvotes (counter)
- created_at, updated_at, resolved_at

**Upvotes Table**
- id, user_id, issue_id
- created_at
- Unique constraint on (user_id, issue_id)

**Surveys Table**
- id, title, description
- questions (JSON string)
- is_active
- created_at, updated_at

**Survey_Responses Table**
- id, survey_id, user_id
- responses (JSON string)
- created_at

**Notifications Table**
- id, user_id, issue_id
- message, type
- is_read
- created_at

**Cities Table**
- id, name, created_at

**Zones Table**
- id, city_id, name, created_at

**Areas Table**
- id, zone_id, name, created_at

---

## API Endpoints

**Authentication**
- POST /api/auth/signup - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- PUT /api/auth/profile - Update profile
- POST /api/auth/logout - Logout user

**Issues**
- GET /api/issues - Get all issues
- GET /api/issues/sorted-by-upvotes - Get issues by upvotes
- GET /api/issues/{id} - Get issue by ID
- GET /api/issues/user/{userId} - Get user's issues
- GET /api/issues/status/{status} - Get issues by status
- POST /api/issues - Create issue
- PUT /api/issues/{id} - Update issue
- PATCH /api/issues/{id}/status - Update status
- DELETE /api/issues/{id} - Delete issue
- GET /api/issues/user/{userId}/stats - Get user stats

**Voting**
- POST /api/issues/{id}/upvote - Add upvote
- POST /api/issues/{id}/downvote - Remove upvote
- DELETE /api/issues/{id}/vote - Remove vote
- GET /api/issues/{id}/user-vote - Check user vote

**Surveys**
- GET /api/surveys - Get all surveys
- GET /api/surveys/active - Get active surveys
- GET /api/surveys/{id} - Get survey by ID
- POST /api/surveys - Create survey
- PUT /api/surveys/{id} - Update survey
- DELETE /api/surveys/{id} - Delete survey
- POST /api/surveys/{id}/responses - Submit response
- GET /api/surveys/user/{userId}/responses - Get user responses
- GET /api/surveys/{surveyId}/check/{userId} - Check submission

**Notifications**
- GET /api/notifications/user/{userId} - Get user notifications
- GET /api/notifications/user/{userId}/unread - Get unread
- GET /api/notifications/user/{userId}/unread-count - Get count
- PATCH /api/notifications/{id}/read - Mark as read
- DELETE /api/notifications/{id} - Delete notification

**Admin**
- GET /api/admin/stats - Get dashboard stats
- GET /api/admin/users - Get all users with stats
- GET /api/admin/users/{id} - Get user with issues
- PUT /api/admin/issues/{id}/status - Update issue status
- GET /api/admin/surveys/{surveyId}/responses - Get survey responses
- POST /api/admin/surveys - Create survey (admin)
- DELETE /api/admin/surveys/{id} - Delete survey

**Locations**
- GET /api/cities - Get all cities
- GET /api/zones/city/{cityId} - Get zones by city
- GET /api/areas/zone/{zoneId} - Get areas by zone
- POST /api/cities - Create city
- POST /api/zones - Create zone
- POST /api/areas - Create area

---

## Frontend Routes

**Public Routes**
- / - Homepage
- /login - Login page
- /signup - Signup page
- /oauth2/redirect - OAuth callback handler

**User Routes (Protected)**
- /dashboard - User dashboard
- /community-board - All issues with voting
- /my-reports - User's submitted issues
- /submit-feedback - Create new issue
- /surveys - Available surveys
- /surveys/{id} - Take survey
- /notifications - User notifications
- /profile - User profile
- /settings - User settings

**Admin Routes (Protected + ADMIN role)**
- /admin - Admin dashboard
- /admin/users - User management
- /admin/users/{id} - User details
- /admin/issues - Issue management
- /admin/surveys - Survey management
- /admin/surveys/{id}/responses - Survey responses
- /admin/settings - Admin settings
- /admin/city-areas - Location management

---

## Key Features Summary

**For Users**
- Report community issues
- Vote on issues
- Track report status
- Receive notifications
- Participate in surveys
- View community board
- Profile management

**For Admins**
- Manage all issues
- Change issue status
- View all users
- Delete users/issues
- Create surveys
- View survey responses
- System statistics
- Location management

**System Features**
- Real-time updates
- Responsive design
- Search and filtering
- Role-based access
- OAuth integration
- Notification system
- Vote tracking
- Survey system
- Location hierarchy

---

## Setup Instructions

**Backend**
1. Install Java 21 and Maven
2. Setup PostgreSQL database
3. Configure application.properties
4. Set environment variables (DB credentials, JWT secret, OAuth keys)
5. Run: `mvn spring-boot:run`
6. Backend runs on port 8080

**Frontend**
1. Install Node.js
2. Run: `npm install`
3. Configure API base URL in axiosConfig.ts
4. Run: `npm run dev`
5. Frontend runs on port 5173

**Database**
- Create PostgreSQL database
- Tables auto-created by Hibernate
- Admin user created on first run
- Sample data loaded via DataInitializer

---

## Environment Variables

**Backend (.env)**
- DB_URL - PostgreSQL connection URL
- DB_USERNAME - Database username
- DB_PASSWORD - Database password
- JWT_SECRET - Secret key for JWT signing
- GOOGLE_CLIENT_ID - Google OAuth client ID
- GOOGLE_CLIENT_SECRET - Google OAuth secret
- GITHUB_CLIENT_ID - GitHub OAuth client ID
- GITHUB_CLIENT_SECRET - GitHub OAuth secret

**Frontend**
- VITE_API_URL - Backend API base URL (default: http://localhost:8080)

---

## Default Admin Account

Created automatically on first run:
- Username: admin
- Email: admin@elytra.com
- Password: admin123
- Role: ADMIN

Change password after first login!
