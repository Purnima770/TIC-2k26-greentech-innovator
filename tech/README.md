# 🌾 GreenTech Pro — Agritourism Platform

Full-stack project: Node.js/Express backend + Vanilla JS frontend, connected to MongoDB with JWT auth and Razorpay payments.

---

## 📁 Project Structure

```
greentech/
├── backend/          ← Express API server
│   ├── models/       ← Mongoose models (User, Farm, Booking)
│   ├── routes/       ← API routes (auth, farms, payment, AI, bookings)
│   ├── middleware/   ← JWT auth middleware
│   ├── server.js     ← Entry point
│   ├── .env          ← Environment variables (edit this!)
│   └── package.json
└── frontend/         ← Static HTML/CSS/JS frontend
    ├── index.html
    ├── script.js     ← All API calls wired to backend
    └── style.css
```

---

## ⚙️ Setup & Run

### 1. Install MongoDB
Make sure MongoDB is running locally on port 27017.
- Windows: https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community && brew services start mongodb-community`

### 2. Configure Backend
Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/greentech
JWT_SECRET=your_strong_secret_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ANTHROPIC_API_KEY=your_anthropic_api_key   ← for AI Trip Planner
```

### 3. Start Backend
```bash
cd backend
npm install
npm start        # production
# or
npm run dev      # with auto-reload (needs: npm install -g nodemon)
```
Server runs at: http://localhost:5000

### 4. Open Frontend
Simply open `frontend/index.html` in your browser.
No build step needed — it's plain HTML/CSS/JS.

---

## 🔌 What's Connected

| Feature | Frontend | Backend | Database |
|---|---|---|---|
| Register / Login | ✅ Modal forms | ✅ `/api/auth/register` `/api/auth/login` | ✅ MongoDB Users |
| Farm Listings | ✅ Auto-loads from DB | ✅ `/api/farms` | ✅ MongoDB Farms |
| List Your Farm | ✅ Farmer modal | ✅ `/api/farms` (POST, auth) | ✅ Saved to DB |
| Razorpay Payment | ✅ Checkout opens | ✅ `/api/payment/create-order` + `/verify` | ✅ Booking saved |
| My Bookings | ✅ Dashboard | ✅ `/api/bookings/my` | ✅ MongoDB Bookings |
| AI Trip Planner | ✅ Input on home page | ✅ `/api/ai/recommend` (proxy) | — |
| JWT Auth | ✅ Token in localStorage | ✅ All protected routes | — |

---

## 🔑 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, get JWT |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/farms | No | List all farms |
| POST | /api/farms | Yes | Add new farm |
| PUT | /api/farms/:id | Yes | Update own farm |
| POST | /api/farms/seed | No | Seed demo data |
| POST | /api/payment/create-order | No | Create Razorpay order |
| POST | /api/payment/verify | No | Verify payment signature |
| POST | /api/bookings | Yes | Create booking |
| GET | /api/bookings/my | Yes | My bookings |
| POST | /api/ai/recommend | No | AI farm recommendations |

---

## 🌐 Deployment

**Backend** → Deploy to Render / Railway:
- Set all `.env` variables in the platform's environment settings
- Update `frontend/script.js` line 1: `const API = 'https://your-backend-url.com/api';`

**Frontend** → Deploy to Vercel / Netlify / GitHub Pages:
- Just upload the `frontend/` folder as a static site

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs, Razorpay SDK
- **Database**: MongoDB
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Payments**: Razorpay
- **AI**: Anthropic Claude API (via backend proxy)
