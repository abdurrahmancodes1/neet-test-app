# Chemical Bonding & Molecular Structure — NEET Mock Test

A fully client-side, 63-question, 60-minute NEET-style mock test built with
React + Vite + Tailwind CSS, based on the "Chemical Bonding and Molecular
Structure" practice sheet (Yakeen NEET 2.0 2025).

## Features

- All 63 questions from the source PDF, with the verified answer key
- Real countdown timer (timestamp-based, accurate across tab switches),
  auto-submits at 00:00, with 10-minute and 5-minute warnings
- Question palette with answered / unanswered / marked-for-review states
- Mark for review, clear response, jump to any question
- NEET marking scheme: +4 correct, −1 wrong, 0 unattempted (score floor at 0)
- Resume on refresh via localStorage — answers, timer, and current question
  are all restored
- Instant result dashboard: score, percentage, accuracy, time taken
- Topic-wise performance breakdown with weakest/strongest areas and charts
- Full question review mode with filters (All / Wrong / Correct /
  Unattempted / Marked)
- Retake flow that resets everything and starts a fresh attempt
- Responsive, mobile-first layout with sticky header/footer navigation
- Keyboard-accessible controls and visible focus states

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       # Timer, QuestionCard, QuestionPalette, Charts, etc.
├── data/questions.js # Single source of truth for all 63 questions
├── pages/            # TestPage.jsx, ResultPage.jsx
├── utils/            # scoring.js, analytics.js, storage.js
├── App.jsx           # State machine: NOT_STARTED → IN_PROGRESS → SUBMITTED
├── main.jsx
└── index.css
```

## Notes on chemical notation

Formulas, ionic charges, and hybridisation notation (H₂O, SO₄²⁻, sp³, σ, π,
etc.) are rendered using proper Unicode sub/superscript characters directly
in the question data, so no extra math-rendering library is required and the
text stays fully selectable and accessible.
# neet-test-app
