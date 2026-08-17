import { questions, MARKS_CORRECT, MARKS_WRONG, TOTAL_QUESTIONS } from '../data/questions.js';

/**
 * Computes NEET-style scoring plus per-question status for a set of answers.
 * @param {Record<number,string>} answers - map of questionId -> selected option letter
 */
export function computeResult(answers) {
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  const perQuestion = questions.map((q) => {
    const selected = answers[q.id];
    let status;
    if (!selected) {
      unattempted += 1;
      status = 'unattempted';
    } else if (selected === q.correctAnswer) {
      correct += 1;
      status = 'correct';
    } else {
      wrong += 1;
      status = 'wrong';
    }
    return {
      id: q.id,
      topic: q.topic,
      selected: selected || null,
      correctAnswer: q.correctAnswer,
      status,
    };
  });

  const rawScore = correct * MARKS_CORRECT + wrong * MARKS_WRONG;
  const score = Math.max(0, rawScore);
  const maxScore = TOTAL_QUESTIONS * MARKS_CORRECT;
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const attempted = correct + wrong;
  const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;

  return {
    correct,
    wrong,
    unattempted,
    rawScore,
    score,
    maxScore,
    percentage,
    accuracy,
    perQuestion,
  };
}

export function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

export function formatClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
