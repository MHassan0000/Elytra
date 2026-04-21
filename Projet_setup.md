# Elytra Project Setup Guide

This guide provides instructions on how to set up and run the Elytra project, including both the Frontend and Backend components.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (for Frontend)
- **JDK 21** (for Backend)
- **Maven** (for Backend build)
- **PostgreSQL 18** (for Database)

---

## 1. Database Setup (PostgreSQL)

Before running the backend, you need to set up the PostgreSQL database.

1.  **Install PostgreSQL 18** if you haven't already.
2.  Open your terminal or command prompt (or use pgAdmin) to access the PostgreSQL shell (`psql`).
3.  Run the following SQL commands to create the database and user (matching the configuration in the backend `.env`):

```sql
-- Connect to postgres
-- psql -U postgres

-- Create the database
CREATE DATABASE elytra;

-- The default 'postgres' user usually exists.
-- Set a strong local password for your postgres user:
ALTER USER postgres WITH PASSWORD '<your_strong_db_password>';

-- Verify connection privileges (optional, usually default is fine for local)
GRANT ALL PRIVILEGES ON DATABASE elytra TO postgres;
```

---

## 2. Backend Setup

The backend is built with Spring Boot and Maven. It requires a `.env` file for configuration.

### Configuration

1.  Navigate to the **Backend** directory:
    ```powershell
    cd Backend
    ```
2.  Create a new file named `.env` in the `Backend` directory.
3.  Copy and paste the following configuration into the `.env` file, replacing all placeholder values with your own:

    ```env
    # Database Configuration
    DB_URL=jdbc:postgresql://localhost:5432/elytra
    DB_USERNAME=your_db_user
    DB_PASSWORD=your_db_password

    # JWT Configuration
    JWT_SECRET=your_long_random_jwt_secret_min_32_bytes
    JWT_EXPIRATION=86400000

    # Google OAuth2
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # GitHub OAuth2
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret

    APP_ADMIN_EMAIL=admin@elytra.com
    APP_ADMIN_USERNAME=admin
    APP_ADMIN_PASSWORD=your_strong_admin_password
    ```

### Running the Backend

1.  While in the `Backend` directory, use the provided PowerShell script to load the environment variables and start the server:

    ```powershell
    ./run-with-env.ps1
    ```

    _Note: This script loads variables from `.env` and runs `mvn spring-boot:run`._

---

## 3. Frontend Setup

The frontend is a React application built with Vite.

### Installation & Running

1.  Open a new terminal and navigate to the **Frontend** directory:

    ```powershell
    cd Frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    npm i
    ```

3.  Build the project (optional check):

    ```bash
    npm run build
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

---

## Summary of Commands

**Backend Terminal:**

```powershell
cd Backend
# Ensure .env is created
./run-with-env.ps1
```

**Frontend Terminal:**

```powershell
cd Frontend
npm i
npm run dev
```
