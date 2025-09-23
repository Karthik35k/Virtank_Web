Virtank Backend (Express)

Quick demo API for auth, foods and orders.

Endpoints
- GET `/` health
- POST `/api/auth/login` { email, password } → returns `{ ok, user, token }`
- POST `/api/auth/logout`
- GET `/api/foods` → list sample foods
- GET `/api/orders` → list created orders (memory)
- POST `/api/orders` { items, total, userId }

Run locally
```bash
cd backend
npm install
npm run dev
# API at http://localhost:4000
```

MySQL setup (optional)
```bash
# Create database and tables
# Open your MySQL client and run:
#   SOURCE /full/path/to/backend/schema.sql;

# or copy/paste the SQL file contents

# Environment variables (create .env in backend/)
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=virtank
```

Demo credentials
- User: `user@virtank.com` / `user123`
- Admin: `admin@virtank.com` / `admin123`

Note: This uses in-memory data for simplicity. Replace with a real DB for production.


