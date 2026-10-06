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
    const qNum = q.number ?? q.order ?? q.id ?? idx + 1;
    const selected =
      answers[q.id] ??
      answers[String(q.id)] ??
      answers[q.number] ??
      answers[String(q.number)] ??
      answers[q.order] ??
      answers[String(q.order)] ??
      answers[idx + 1] ??
      answers[String(idx + 1)] ??
      answers[q._id] ??
      null;

    const cleanSelected = selected ? String(selected).trim().toUpperCase() : null;
    const cleanCorrect = q.correctAnswer ? String(q.correctAnswer).trim().toUpperCase() : '';

    let status = 'unattempted';
    if (!cleanSelected) {
      unattempted += 1;
      status = 'unattempted';
    } else if (cleanCorrect && cleanSelected === cleanCorrect) {
      correct += 1;
      status = 'correct';
    } else {
      wrong += 1;
      status = 'wrong';
    }

    return {
      id: q.id ?? qNum,
      questionNumber: qNum,
      order: q.order ?? qNum,
      topic: q.topic || 'General',
      subject: q.subject || 'Physics',
      difficulty: q.difficulty || 'Medium',
      question: q.text ?? q.question ?? '',
      options: q.options || {},
      image: q.image || null,
      selected: cleanSelected,
      correctAnswer: cleanCorrect,
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

  // Topic Performance breakdown
  const topicMap = {};
  perQuestion.forEach((pq) => {
    const topicName = pq.topic || 'General';
    if (!topicMap[topicName]) {
      topicMap[topicName] = { topic: topicName, total: 0, correct: 0, wrong: 0, unattempted: 0 };
    }
    topicMap[topicName].total += 1;
    if (pq.status === 'correct') topicMap[topicName].correct += 1;
    else if (pq.status === 'wrong') topicMap[topicName].wrong += 1;
    else topicMap[topicName].unattempted += 1;
  });

  const topicPerformance = Object.values(topicMap).map((t) => ({
    ...t,
    mastery: t.total > 0 ? Math.round((t.correct / t.total) * 1000) / 10 : 0,
  }));

  const sortedByMastery = [...topicPerformance].sort((a, b) => a.mastery - b.mastery);
  const weakestTopics = sortedByMastery.filter((t) => t.mastery < 70).slice(0, 3);
  const strongestTopics = [...topicPerformance]
    .filter((t) => t.correct > 0)
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 3);

  return {
    correct,
    wrong,
    unattempted,
    rawScore,
    score,
    maxScore,
    percentage: Math.round(percentage * 10) / 10,
    accuracy: Math.round(accuracy * 10) / 10,
    totalQuestions,
    topicPerformance,
    weakestTopics,
    strongestTopics,
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

/**
 * Predicts NEET score, Section score, All India Rank (AIR) band, and national percentile
 * specifically for the two newly added comprehensive drills:
 * 1. 'neet-biology-core-drill' (Biology Core Foundation Drill - 50 Qs / 200 Marks)
 * 2. 'neet-mechanics-chemical-bonding-drill' (Mechanics & Chemical Bonding Drill - 120 Qs / 480 Marks)
 */
export function getNeetPrediction(testId, score, maxScore, accuracy = 0, correct = 0, wrong = 0) {
  const isBiology = testId === 'neet-biology-core-drill';
  const isMechanicsBonding = testId === 'neet-mechanics-chemical-bonding-drill';

  if (!isBiology && !isMechanicsBonding) {
    return null; // Prediction active specifically for the two tests added today
  }

  const fraction = maxScore > 0 ? Math.max(0, score / maxScore) : 0;

  if (isBiology) {
    const projectedSectionScore = Math.min(360, Math.round(fraction * 360));
    const projectedNeetScore = Math.min(720, Math.round(fraction * 720));

    let percentile = 0;
    let airBand = '';
    let statusBadge = '';
    let tone = 'emerald';
    let recommendation = '';

    if (projectedNeetScore >= 680) {
      percentile = 99.85;
      airBand = 'AIR < 1,000 (Top 0.15%)';
      statusBadge = 'AIIMS & Premier GMC Qualifier';
      tone = 'emerald';
      recommendation = 'Exceptional Botany & Human Physiology command. Continue speed drills and revise NCERT micro-details.';
    } else if (projectedNeetScore >= 630) {
      percentile = 99.1;
      airBand = 'AIR 1,000 – 6,000';
      statusBadge = 'Top State Govt Medical College';
      tone = 'teal';
      recommendation = 'Strong grasp. Eliminate negative marks on statement-based questions to comfortably cross 350+ in Biology.';
    } else if (projectedNeetScore >= 580) {
      percentile = 97.8;
      airBand = 'AIR 6,000 – 18,000';
      statusBadge = 'Government Medical College (MBBS)';
      tone = 'blue';
      recommendation = 'Solid foundation. Focus on weaker chapters highlighted in diagnostics below to push score into top tier.';
    } else if (projectedNeetScore >= 500) {
      percentile = 93.5;
      airBand = 'AIR 18,000 – 50,000';
      statusBadge = 'Borderline GMC / Dental Qualifier';
      tone = 'amber';
      recommendation = 'Revise NCERT floral formulas, cell cycle stages, and excretory/circulatory pathways.';
    } else {
      percentile = Math.max(50, Math.round(fraction * 100));
      airBand = 'AIR > 50,000';
      statusBadge = 'Intensive Revision Needed';
      tone = 'rose';
      recommendation = 'Target high-yield NCERT chapters (Cell Unit, Biomolecules, Breathing & Circulation) and re-take the drill.';
    }

    return {
      testId,
      testType: 'biology',
      sectionName: 'Biology (Botany & Zoology)',
      projectedSectionScore,
      projectedSectionMax: 360,
      projectedNeetScore,
      projectedNeetMax: 720,
      percentile,
      airBand,
      statusBadge,
      tone,
      recommendation,
    };
  }

  if (isMechanicsBonding) {
    const projectedSectionScore = Math.min(360, Math.round(fraction * 360));
    const projectedNeetScore = Math.min(720, Math.round(fraction * 720));

    let percentile = 0;
    let airBand = '';
    let statusBadge = '';
    let tone = 'violet';
    let recommendation = '';

    if (projectedNeetScore >= 680) {
      percentile = 99.9;
      airBand = 'AIR < 800 (National Elite)';
      statusBadge = 'Top 0.1% National Ranker';
      tone = 'emerald';
      recommendation = 'Mastery across Rigid Body Mechanics & Chemical Bonding! Vector torques and MO configurations are exam-perfect.';
    } else if (projectedNeetScore >= 630) {
      percentile = 99.2;
      airBand = 'AIR 800 – 5,000';
      statusBadge = 'Premier Medical & Central College';
      tone = 'violet';
      recommendation = 'Superb performance in difficult topics. Fine-tune rotational equilibrium and VSEPR exception cases.';
    } else if (projectedNeetScore >= 580) {
      percentile = 98.0;
      airBand = 'AIR 5,000 – 16,000';
      statusBadge = 'Government Medical College (MBBS)';
      tone = 'blue';
      recommendation = 'Strong analytical problem-solving. Review 2D collision momentum vectors and backbonding concepts.';
    } else if (projectedNeetScore >= 500) {
      percentile = 94.0;
      airBand = 'AIR 16,000 – 45,000';
      statusBadge = 'GMC / High State Merit';
      tone = 'amber';
      recommendation = 'Practice more Parallel Axis theorem problems, dipole vector calculations, and hybridization steps.';
    } else {
      percentile = Math.max(50, Math.round(fraction * 100));
      airBand = 'AIR > 45,000';
      statusBadge = 'Core Remediation Needed';
      tone = 'rose';
      recommendation = 'Focus on Work-Energy theorem basics, VSEPR shapes, and hybridization identification.';
    }

    return {
      testId,
      testType: 'mechanics_bonding',
      sectionName: 'Physics & Chemistry (Mechanics + Chemical Bonding)',
      projectedSectionScore,
      projectedSectionMax: 360,
      projectedNeetScore,
      projectedNeetMax: 720,
      percentile,
      airBand,
      statusBadge,
      tone,
      recommendation,
    };
  }

  return null;
}

