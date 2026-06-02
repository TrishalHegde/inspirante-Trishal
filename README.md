# College Event Registration Portal

This is the submission for the internship assignment `ISP-WEB-2631`.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python 3.11+
- MySQL 8.x

### 1. Database Setup
Ensure you have MySQL installed and running. Create the database and insert sample data by running the seed script:
```bash
mysql -u root -p < server/seed.sql
```

### 2. Backend Setup (Flask)
```bash
cd server
python -m venv venv
# Activate the virtual environment
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
```
*Note: Make sure to copy `.env.example` to `server/.env` and adjust the database credentials accordingly.*

### 3. Frontend Setup (React/Vite)
```bash
cd client
npm install
npm run dev
```

### Known Issues
- Currently setting up...
