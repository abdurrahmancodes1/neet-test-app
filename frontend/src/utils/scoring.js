export const MARKS_CORRECT = 4;
export const MARKS_WRONG = -1;

/**
 * Computes NEET-style scoring plus per-question status for a set of answers.
 * Pure computation utility — independent of external database.
 * @param {Record<string|number,string>} answers - map of question identifier -> selected option letter
 * @param {Array} [questionList=[]] - list of question objects
 * @param {number} [marksCorrect=4] - marks for correct answer
 * @param {number} [marksWrong=-1] - negative marks for wrong answer
 */
export function computeResult(
  answers = {},
  questionList = [],
  marksCorrect = MARKS_CORRECT,
  marksWrong = MARKS_WRONG
) {
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  const perQuestion = questionList.map((q, idx) => {
    const qKey = q.number ?? q.id ?? idx + 1;
    const selected = answers[qKey] ?? answers[q.id] ?? answers[String(qKey)] ?? null;

    let status = 'unattempted';
    if (!selected) {
      unattempted += 1;
      status = 'unattempted';
    } else if (q.correctAnswer && selected.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
      correct += 1;
      status = 'correct';
    } else {
      wrong += 1;
      status = 'wrong';
    }

    return {
      id: q.id ?? qKey,
      questionNumber: q.number ?? qKey,
      topic: q.topic || 'Work, Energy and Power',
      subject: q.subject || 'Physics',
      difficulty: q.difficulty || 'Medium',
      question: q.text ?? q.question,
      options: q.options || {},
      image: q.image || null,
      selected: selected || null,
      correctAnswer: q.correctAnswer || null,
      explanation: q.explanation || null,
      status,
    };
  });

  const totalQuestions = questionList.length;
  const rawScore = correct * marksCorrect + wrong * marksWrong;
  const score = Math.max(0, rawScore);
  const maxScore = totalQuestions * marksCorrect;
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
    percentage: Math.round(percentage * 10) / 10,
    accuracy: Math.round(accuracy * 10) / 10,
    perQuestion,
  };
}

export function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

export function formatClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
