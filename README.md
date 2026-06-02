# College Event Registration Portal
**Assignment Reference:** `ISP-WEB-2631`

A full-stack web application where college administrators can manage events and students can register for them.

---

## 📋 Table of Contents
1. [Tech Stack](#-tech-stack)
2. [Features](#-features)
3. [Prerequisites](#-prerequisites)
4. [Step-by-Step Setup](#-step-by-step-setup)
   - [Step 1: Clone the Repository](#step-1-clone-the-repository)
   - [Step 2: Set Up MySQL](#step-2-set-up-mysql)
   - [Step 3: Seed the Database](#step-3-seed-the-database)
   - [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
   - [Step 5: Start the Backend (Flask)](#step-5-start-the-backend-flask)
   - [Step 6: Start the Frontend (React)](#step-6-start-the-frontend-react)
5. [Sample Credentials](#-sample-credentials)
6. [Environment Variables](#-environment-variables)
7. [Common Issues & Fixes](#-common-issues--fixes)
8. [Known Issues](#-known-issues)

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 (Vite)                   |
| Backend    | Python 3.11 / Flask               |
| Database   | MySQL 8+ / MySQL 9+               |
| Auth       | JWT (JSON Web Tokens via PyJWT)   |
| Styling    | Custom CSS (no external framework)|

---

## ✨ Features

### Admin
- Create events (name, date, venue, max capacity)
- View all events with live registration counts
- Capacity fill bar with color coding:
  - 🟢 Green — below 50% full
  - 🟡 Amber — 50–79% full
  - 🔴 Red — 80%+ full
- View full list of registered students per event

### Student
- Browse all upcoming events (sorted by date)
- Register for any event that is not full
- View personal registration history
- Events marked **Full** and register button disabled when capacity is reached
- Cannot register for the same event twice — clear error shown

---

## ✅ Prerequisites

Make sure the following are installed before you start:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18 or higher | https://nodejs.org |
| Python | v3.11 or higher | https://python.org/downloads |
| MySQL Community Server | v8.x or v9.x | https://dev.mysql.com/downloads/mysql |
| Git | Any recent version | https://git-scm.com |

> **Windows users:** During MySQL installation, choose **"Developer Default"** setup type. This also installs MySQL Workbench, which you will need for seeding the database.

---

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd inspirante-Trishal
```

---

### Step 2: Set Up MySQL

#### If MySQL is freshly installed
MySQL Community Server must be **running** before you proceed. After installation, the MySQL service usually starts automatically. You can verify:
- **Windows:** Open **Services** (press `Win + R`, type `services.msc`), find **MySQL97** (or MySQL80), and make sure its status is **Running**.

#### ⚠️ Important for Windows users
The `mysql` command may **not be recognized** in your terminal even if MySQL is installed. This is because the MySQL `bin` folder is not added to your system PATH by default.

**Fix:** Use MySQL Workbench (recommended) or the full path to `mysql.exe` (shown in Step 3 below).

---

### Step 3: Seed the Database

This creates the `event_portal` database, all tables, and inserts the sample admin, 11 student accounts, and 5 events.

#### Option A: Using MySQL Workbench ✅ (Recommended for Windows)
1. Open **MySQL Workbench** (search in Start Menu)
2. Click your local connection (e.g., `Local instance MySQL97`)
3. Enter your root password and connect
4. In the top menu go to **File → Open SQL Script**
5. Navigate to and open: `server/seed.sql`
6. Press **Ctrl + Shift + Enter** or click the ⚡ button to execute the entire script
7. You should see success messages in the output panel

#### Option B: Using PowerShell (Windows)
Standard `<` redirection doesn't work in PowerShell. Use this instead:

```powershell
Get-Content ".\inspirante-Trishal\server\seed.sql" | & "C:\Program Files\MySQL\MySQL Server 9.7\bin\mysql.exe" -u root -p
```
> Adjust the path version number (`9.7` → `8.0`) to match your installed MySQL version. It will prompt for your root password.

#### Option C: Using Command Prompt (cmd)
```cmd
"C:\Program Files\MySQL\MySQL Server 9.7\bin\mysql.exe" -u root -p < "path\to\server\seed.sql"
```

#### Option D: Mac / Linux
```bash
mysql -u root -p < server/seed.sql
```

---

### Step 4: Configure Environment Variables

1. Copy the example env file into the `server` folder:
   ```bash
   # Mac/Linux
   cp .env.example server/.env

   # Windows PowerShell
   Copy-Item .env.example server\.env
   ```

2. Open `server/.env` and update these values:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=your_mysql_root_password_here
   DB_NAME=event_portal
   JWT_SECRET=change_this_to_a_long_random_string
   FLASK_ENV=development
   ```

   > **Only `DB_PASS` needs to change.** Set it to the root password you chose during MySQL installation.

---

### Step 5: Start the Backend (Flask)

Open a terminal and run:

```bash
cd server

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the Flask server
python app.py
```

The backend will start at: **http://localhost:8000**

You should see:
```
 * Running on http://0.0.0.0:8000
 * Debug mode: on
```

> If you see `Error connecting to MySQL`, double-check your `DB_PASS` in `server/.env` and make sure the MySQL service is running.

---

### Step 6: Start the Frontend (React)

Open a **second, separate terminal** and run:

```bash
cd client
npm install
npm run dev
```

The frontend will start at: **http://localhost:5173**

Open this URL in your browser — the app is ready to use!

---

## 🔑 Sample Credentials

### Admin
| Field    | Value            |
|----------|------------------|
| Username | `admin`          |
| Password | `inspirante2026` |

### Students (all use the same password)

| Full Name      | Username        | Password     |
|----------------|-----------------|--------------|
| Asha Rao       | `asha.rao`      | `  ` |
| Ravi Shetty    | `ravi.shetty`   | `student123` |
| Meera Nair     | `meera.nair`    | `student123` |
| Kiran Bhat     | `kiran.bhat`    | `student123` |
| Divya Kamath   | `divya.kamath`  | `student123` |
| Suresh Pai     | `suresh.pai`    | `student123` |
| Ananya Hegde   | `ananya.hegde`  | `student123` |
| Rohan Shenoy   | `rohan.shenoy`  | `student123` |
| Nisha Prabhu   | `nisha.prabhu`  | `student123` |
| Tejas Mallya   | `tejas.mallya`  | `student123` |
| Priya Bangera  | `priya.bangera` | `student123` |

---

## 🔐 Environment Variables

All environment variables are read by the Flask backend from `server/.env`.

| Variable      | Description                                      | Default        |
|---------------|--------------------------------------------------|----------------|
| `DB_HOST`     | MySQL server hostname                            | `localhost`    |
| `DB_PORT`     | MySQL server port                                | `3306`         |
| `DB_USER`     | MySQL username                                   | `root`         |
| `DB_PASS`     | MySQL password                                   | *(must be set)*|
| `DB_NAME`     | Name of the database to use                      | `event_portal` |
| `JWT_SECRET`  | Secret key for signing JWT tokens                | *(must be set)*|
| `FLASK_ENV`   | Flask environment (`development` / `production`) | `development`  |

---

## 🔧 Common Issues & Fixes

### ❌ `'mysql' is not recognized` (Windows)
MySQL's `bin` folder is not in your system PATH. Use MySQL Workbench to run the seed file (see Step 3, Option A), or use the full path to `mysql.exe`.

### ❌ `The '<' operator is reserved for future use` (PowerShell)
PowerShell does not support the `<` input redirection operator. Use the `Get-Content | &` method shown in Step 3 Option B, or use MySQL Workbench instead.

### ❌ `Error connecting to MySQL` / `Access denied`
- Check that your MySQL service is running (see Step 2).
- Verify `DB_PASS` in `server/.env` matches your MySQL root password exactly (it is case-sensitive).
- Make sure you ran the seed script so the `event_portal` database exists.

### ❌ `ModuleNotFoundError` when running `python app.py`
Your virtual environment is not activated. Run `venv\Scripts\activate` (Windows) before `python app.py`.

### ❌ Frontend shows network errors / can't reach API
- Make sure the Flask server is running on port **8000**.
- Make sure you started the frontend with `npm run dev` (not `npm dev run`).
- Both terminals (backend and frontend) must be running at the same time.

### ❌ `CORS` errors in browser console
The backend already has CORS enabled for all origins in development mode. If you still see this, make sure Flask is running and not crashed.

---

## ⚠️ Known Issues

- **Plain-text passwords:** Passwords are stored as plain text. In a real production app, `bcrypt` hashing would be used.
- **Token in sessionStorage:** The JWT token is stored in `sessionStorage`. For production, an `httpOnly` cookie would be safer against XSS attacks.

---

*All 10 behaviour checklist items from the assignment brief pass successfully.*
