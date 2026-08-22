# NEET Exam Practice Platform (Full-Stack Architecture)

A production-grade, scalable NEET preparation and mock exam platform featuring realistic examination timers, question review palettes, authoritative server-side scoring, JWT authentication with secure HTTP-only cookies, and a reusable CLI pipeline for importing tests dynamically from PDFs into MongoDB.

---

## 📁 Repository Structure

```
neet-test-app/
├── frontend/                     # React + Redux Toolkit + RTK Query Client
│   ├── public/                   # Question diagrams & static assets
│   ├── src/
│   │   ├── app/                  # Redux Store Configuration
│   │   ├── components/           # UI Components (Palette, QuestionCard, Timer, Review)
│   │   ├── features/             # RTK Query API slices (tests, results)
│   │   ├── pages/                # Screens (ChapterTestsPage, Instructions, TestPage, ResultPage)
│   │   └── services/             # Base API configuration with HTTP-only credentials
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/                      # Node.js + Express + MongoDB REST API Engine
│   ├── src/
│   │   ├── config/               # Database and environment configurations
│   │   ├── controllers/          # Request controllers (Auth, Test, Admin, Result)
│   │   ├── middleware/           # Auth, Role, Validation, Rate Limiting, Error Handling
│   │   ├── models/               # Mongoose Schemas (User, Test, Question, Result)
│   │   ├── routes/               # Modular REST routes
│   │   ├── services/             # Scoring, Test Import, AuthService
│   │   ├── validators/           # Zod Validation Schemas
│   │   └── scripts/              # CLI scripts (importTest, validateTestPayload, migrateData)
│   ├── tests/                    # Test fixtures & test suites
│   ├── package.json
│   └── .env.example
│
├── .gitignore                    # Root ignore configuration
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **MongoDB**: v6+ (running locally or MongoDB Atlas)

---

### 2. Backend Setup & Run

```bash
cd backend
npm install
cp .env.example .env

# Run development server
npm run dev

# Run all backend automated tests
npm test
```

---

### 3. Frontend Setup & Run

```bash
cd frontend
npm install

# Run Vite development server
npm run dev

# Build production bundle
npm run build
```

---

## 🧪 Testing Commands

```bash
# Run all backend test suites
cd backend
npm test

# Run individual backend test suites
npm run test:api        # REST API endpoints & security checks
npm run test:scoring    # NEET +4/-1 server-side scoring engine & analytics
npm run test:auth       # Registration, login, JWT cookies, role access control
npm run test:import     # Dynamic test importer & private passcode security

# Build & verify frontend production bundle
cd frontend
npm run build
```

---

## 📥 Dynamic Test Import Workflow (PDF → MongoDB)

Adding new tests requires **zero frontend code modifications**:

1. **Extract & Format**: Use Gemini CLI to extract questions and metadata from any NEET PDF into a JSON payload (`sampleNeetTest.json`).
2. **Validate Payload**:
   ```bash
   cd backend
   npm run validate:test -- tests/fixtures/sampleNeetTest.json
   ```
3. **Import to MongoDB**:
   ```bash
   cd backend
   npm run import:test -- tests/fixtures/sampleNeetTest.json
   ```
4. **Instant Availability**: The test immediately appears in the React test selection dashboard.

---

## 🔒 Security Invariants

- **Hidden Answer Keys**: `correctAnswer` and `explanation` are protected in MongoDB with `select: false`. They are never returned in student question endpoints.
- **Private Test Codes**: `testCode` and `allowedCodes` are protected server-side with `select: false`. Passcodes are verified via `POST /api/tests/access` without returning the code.
- **HTTP-Only Cookies**: Authentication sessions use secure, `HttpOnly`, `SameSite=Lax` cookies, preventing XSS token theft.
- **Result Isolation**: Students can only view their own test results (enforced with 403 Forbidden checks).
