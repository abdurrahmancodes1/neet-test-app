export const MARKS_CORRECT = 4;
export const MARKS_WRONG = -1;

/**
 * Computes NEET-style scoring plus per-question status for a set of answers.
 * Pure computation utility — independent of static question files.
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
    const qKey = q.order ?? q.id ?? q._id ?? idx + 1;
    const selected =
      answers[qKey] ??
      (q._id && answers[q._id]) ??
      (q.order && answers[q.order]) ??
      (q.id && answers[q.id]) ??
      null;

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
      id: qKey,
      questionNumber: qKey,
      topic: q.topic || 'General',
      subject: q.subject || 'NEET',
      question: q.question,
      options: q.options || {},
      image: q.image || null,
      selected: selected || null,
      correctAnswer: q.correctAnswer || null,
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
