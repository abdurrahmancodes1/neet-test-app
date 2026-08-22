# Architecture Documentation — NEET Exam Test Application

This document records the baseline architecture of the NEET Exam Test Application prior to the full-stack scalable platform migration.

---

## 1. Current Architecture Overview

The current system is a **purely client-side Single Page Application (SPA)** built with **React 18**, **Vite 5**, and **Tailwind CSS 3**.

```
[Browser Client]
  │
  ├── UI Pages & Components (React)
  ├── Static Bundled Test Data (src/data/questions.js, test2Questions.js, tests.js)
  ├── Local State (App.jsx screen routing & session tracking)
  ├── Client-side Scoring Engine (src/utils/scoring.js)
  ├── Analytics Engine (src/utils/analytics.js)
  └── Persistence (Browser LocalStorage)
```

---

## 2. Directory Structure

```
├── public/
│   └── questions/
│       ├── q8.png, q15.png, ... (Test 1 diagram images)
│       └── test2/
│           ├── q1.svg, q3.svg, ... (Test 2 vector diagram images)
├── scripts/
│   └── validate-questions.mjs     # Question structure & answer-key validation
├── src/
│   ├── components/
│   │   ├── Charts.jsx             # Recharts (Score donut & topic breakdown)
│   │   ├── OptionButton.jsx       # MCQ radio option button
│   │   ├── QuestionCard.jsx       # Question text, diagram, options, and actions
│   │   ├── QuestionPalette.jsx    # Question grid palette (desktop sidebar & mobile drawer)
│   │   ├── QuestionReview.jsx     # Post-submission answer review by status
│   │   ├── ResultSummary.jsx      # Scorecard, accuracy, time analysis
│   │   ├── SubmitModal.jsx        # Confirmation modal before submitting
│   │   ├── TestHeader.jsx         # Sticky header with timer, test title, palette toggle
│   │   ├── TestNavigation.jsx     # Prev / Next / Submit controls
│   │   ├── Timer.jsx              # Countdown timer with warning thresholds
│   │   └── TopicAnalysis.jsx      # Topic mastery rankings (weak / strong areas)
│   ├── data/
│   │   ├── questions.js           # Test 1 static dataset (45 Laws of Motion questions)
│   │   ├── test2Questions.js      # Test 2 static dataset (67 Physics & Chemistry questions)
│   │   └── tests.js               # Multi-test registry (metadata, test codes, syllabus)
│   ├── pages/
│   │   ├── ChapterTestsPage.jsx   # Test selection cards
│   │   ├── LoginPage.jsx          # Client-side mock login
│   │   ├── ResultPage.jsx         # Post-submission dashboard
│   │   ├── TestInstructionsPage.jsx # Rules, marking scheme, test code validation
│   │   └── TestPage.jsx           # Main test-taking workspace
│   ├── utils/
│   │   ├── analytics.js           # Topic mastery and performance stats
│   │   ├── scoring.js             # NEET scoring (+4 / -1 / 0) and formatting
│   │   └── storage.js             # LocalStorage session load/save/clear
│   ├── App.jsx                    # Root state, screen router, fullscreen listener
│   ├── index.css                  # Tailwind styles and typography
│   └── main.jsx                   # React entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Data & State Management

1. **Test Data**:
   - Stored statically in JavaScript arrays (`src/data/`).
   - Each question contains: `id`, `sourceQuestionNumber`, `subject`, `chapter`, `difficulty`, `type`, `topic`, `question`, `options` (A–D), `correctAnswer`, and optional `image`.
2. **Access Security**:
   - `TestInstructionsPage.jsx` validates a `testCode` (e.g., `NEET-LOM`, `AITS-01`) before unlocking the exam.
3. **Session Persistence**:
   - `storage.js` serializes user state into browser `localStorage` keyed by `testId`.
   - Stores: `state` (`NOT_STARTED` | `IN_PROGRESS` | `SUBMITTED`), `answers`, `markedForReview`, `currentQuestion`, `startTime`, `endTime`, `submittedAt`, and `autoSubmitted`.
4. **Scoring & Verification**:
   - `scoring.js` computes results in the browser (+4 for correct, -1 for wrong, 0 for unattempted).
   - `analytics.js` aggregates scores by topic to categorize weak vs strong areas.

---

## 4. Current Strengths to Preserve
- Responsive, distraction-free NEET exam interface.
- Complete navigation and question palette with status indicators (Answered, Unanswered, Marked, Answered+Marked).
- Fullscreen enforcement with auto-submit safeguard.
- Deep topic mastery analytics and visual charts.

---

## 5. Migration Objectives for Full-Stack Target
- **Decouple Data from Frontend**: Move test and question definitions to MongoDB via REST APIs.
- **Secure Answer Verification**: Keep `correctAnswer` hidden on the server until submission.
- **Dynamic Test Management**: Allow adding new tests from PDFs/JSON without modifying React code.
- **Unified Server State**: Use RTK Query to manage test fetching, caching, and result submission.
