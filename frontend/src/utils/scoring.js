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
 * Subject-Aware NEET 720 Score, AIR Rank, and NTA Percentile Predictor.
 * - For Physics + Chemistry tests (Hard mechanics, Bonding, etc.): Auto-assumes Biology (Botany & Zoology out of 360)
 *   calibrated against high-yield NCERT benchmarks and question difficulty weight.
 * - For Biology tests: Auto-assumes Physics & Chemistry (out of 360).
 * - Calibrated against authentic NTA NEET national rank-versus-score percentiles.
 */
export function getNeetPrediction(testId, score, maxScore, accuracy = 0, correct = 0, wrong = 0) {
  if (!testId || maxScore <= 0) return null;

  const rawTestId = String(testId).toLowerCase().trim();

  // Allow for the 2 newly added comprehensive tests plus core chapter suites
  const isGrandMega =
    rawTestId.includes('grand') ||
    rawTestId.includes('mega') ||
    (rawTestId.includes('mechanics') && rawTestId.includes('morphology'));

  const isBiology =
    !isGrandMega &&
    (rawTestId.includes('biology') ||
      rawTestId.includes('botany') ||
      rawTestId.includes('zoology'));

  const isMechanicsBonding =
    !isGrandMega &&
    (rawTestId.includes('mechanics') ||
      rawTestId.includes('bonding') ||
      rawTestId.includes('core-drill') ||
      rawTestId.includes('2026-core') ||
      rawTestId.includes('calculus') ||
      rawTestId.includes('work-energy'));

  if (!isGrandMega && !isBiology && !isMechanicsBonding) {
    return null;
  }

  const fraction = Math.max(0, Math.min(1, score / maxScore));
  const totalAttempted = correct + wrong;
  const acc =
    accuracy > 0
      ? Math.min(100, Math.max(0, accuracy))
      : totalAttempted > 0
      ? (correct / totalAttempted) * 100
      : fraction * 100;

  // 1. Identify Subject Composition & Difficulty Weight
  let testType = 'physics_chemistry';
  let testedSectionName = 'Physics & Chemistry';
  let otherSectionName = 'Biology (Botany & Zoology)';
  let difficultyLevel = 'High (JEE / Hard NEET Level)';

  if (isGrandMega) {
    testType = 'full_syllabus';
    testedSectionName = 'Physics, Chemistry & Biology (All 240 Qs)';
    otherSectionName = 'Full Comprehensive Curriculum';
    difficultyLevel = 'National Full Master Benchmark';
  } else if (isBiology) {
    testType = 'biology';
    testedSectionName = 'Biology (Botany & Human Physiology)';
    otherSectionName = 'Physics & Chemistry';
    difficultyLevel = 'Standard NEET Benchmark';
  } else {
    testType = 'physics_chemistry';
    testedSectionName = 'Physics & Chemistry (Mechanics & Chemical Bonding)';
    otherSectionName = 'Biology (Botany & Zoology)';
    difficultyLevel = 'Advanced (JEE & High-Yield NEET Mechanics)';
  }

  // 2. Compute Tested Section Score (Scaled to 360) with Question Difficulty Bonus
  const difficultyBonus = isGrandMega ? 0 : !isBiology ? Math.min(18, (acc / 100) * 14) : Math.min(8, (acc / 100) * 6);
  let scaledSectionScore = isGrandMega ? Math.round(fraction * 360) : Math.round(fraction * 360 + difficultyBonus);
  scaledSectionScore = Math.min(360, Math.max(0, scaledSectionScore));

  // 3. Compute Auto-Assumed Complementary Subject Score (out of 360)
  let assumedOtherScore = 0;
  let assumedSectionNote = '';

  if (isGrandMega) {
    assumedOtherScore = Math.round(fraction * 360);
    assumedSectionNote = 'Direct Tri-Subject (Physics, Chemistry & Botany) evaluation based on full 240 question paper.';
  } else if (isBiology) {
    // Student took Biology test -> Auto-assume Physics & Chemistry score (out of 360)
    // Physics & Chemistry is harder than Biology for NEET students
    if (fraction >= 0.90 && acc >= 92) {
      assumedOtherScore = Math.round(295 + (fraction - 0.90) * 350 + (acc - 92) * 1.5);
      assumedOtherScore = Math.min(345, Math.max(290, assumedOtherScore));
    } else if (fraction >= 0.75 && acc >= 80) {
      assumedOtherScore = Math.round(245 + (fraction - 0.75) * 300);
      assumedOtherScore = Math.min(290, Math.max(235, assumedOtherScore));
    } else if (fraction >= 0.55) {
      assumedOtherScore = Math.round(180 + (fraction - 0.55) * 250);
      assumedOtherScore = Math.min(235, Math.max(170, assumedOtherScore));
    } else if (fraction >= 0.35) {
      assumedOtherScore = Math.round(120 + (fraction - 0.35) * 200);
      assumedOtherScore = Math.min(170, Math.max(110, assumedOtherScore));
    } else {
      assumedOtherScore = Math.round(Math.max(40, fraction * 220));
    }
    assumedSectionNote =
      'Auto-assumed Physics & Chemistry score calibrated from candidate conceptual accuracy and negative mark penalty.';
  } else {
    // Student took Physics + Chemistry test -> Auto-assume Biology score (out of 360)
    // Strong aspirants scoring high in difficult Physics/Chemistry easily score 325-355 in NCERT Biology
    if (fraction >= 0.85 && acc >= 85) {
      assumedOtherScore = Math.round(336 + (fraction - 0.85) * 130 + (acc - 85) * 0.7);
      assumedOtherScore = Math.min(358, Math.max(332, assumedOtherScore));
    } else if (fraction >= 0.70 && acc >= 75) {
      assumedOtherScore = Math.round(302 + (fraction - 0.70) * 200);
      assumedOtherScore = Math.min(335, Math.max(295, assumedOtherScore));
    } else if (fraction >= 0.50) {
      assumedOtherScore = Math.round(242 + (fraction - 0.50) * 260);
      assumedOtherScore = Math.min(295, Math.max(235, assumedOtherScore));
    } else if (fraction >= 0.30) {
      assumedOtherScore = Math.round(175 + (fraction - 0.30) * 300);
      assumedOtherScore = Math.min(235, Math.max(160, assumedOtherScore));
    } else {
      assumedOtherScore = Math.round(Math.max(60, fraction * 350));
    }
    assumedSectionNote =
      'Auto-assumed Biology score (Botany & Zoology) based on high-yield NCERT baseline for hard Physics + Chemistry mastery.';
  }

  // 4. Calculate Total Estimated NEET Score (out of 720)
  const totalEstimatedNeet = Math.min(720, Math.max(0, scaledSectionScore + assumedOtherScore));

  // 5. Calculate Realistic All India Rank (AIR) and NTA Percentile
  let percentile = 0;
  let airBand = '';
  let statusBadge = '';
  let tone = 'blue';
  let recommendation = '';

  if (totalEstimatedNeet >= 685) {
    percentile = 99.92;
    airBand = 'AIR 1 – 500 (National Elite)';
    statusBadge = 'AIIMS New Delhi & Top Central GMCs';
    tone = 'emerald';
    recommendation =
      'Exceptional mastery across hard Physics Mechanics and Chemical Bonding! Vector torques, collisions, and MO configurations are exam-perfect.';
  } else if (totalEstimatedNeet >= 645) {
    percentile = 99.35;
    airBand = 'AIR 500 – 3,500';
    statusBadge = 'Top State Govt Medical College (MBBS)';
    tone = 'teal';
    recommendation =
      'Superb performance in difficult topics. Eliminate minor negative marking on calculation traps to comfortably cross 680+ in NEET.';
  } else if (totalEstimatedNeet >= 605) {
    percentile = 98.2;
    airBand = 'AIR 3,500 – 14,000';
    statusBadge = 'Confirmed Govt Medical College (MBBS Seat)';
    tone = 'violet';
    recommendation =
      'Strong problem-solving foundation. Review 2D collision vectors, rotational equilibrium, and VSEPR exceptions highlighted in diagnostics.';
  } else if (totalEstimatedNeet >= 550) {
    percentile = 95.8;
    airBand = 'AIR 14,000 – 35,000';
    statusBadge = 'State Merit GMC Qualifier';
    tone = 'blue';
    recommendation =
      'Good foundational grasp. Focus on high-error topics to boost accuracy beyond 85% and secure a top tier government college.';
  } else if (totalEstimatedNeet >= 475) {
    percentile = 91.0;
    airBand = 'AIR 35,000 – 80,000';
    statusBadge = 'Borderline GMC / Dental Qualifier';
    tone = 'amber';
    recommendation =
      'Solid effort on challenging questions. Practice more Work-Energy theorem numericals, dipole moment vectors, and hybridization steps.';
  } else {
    percentile = Math.max(45, Math.round((totalEstimatedNeet / 720) * 1000) / 10);
    airBand = 'AIR > 80,000';
    statusBadge = 'Core Remediation & Practice Required';
    tone = 'rose';
    recommendation =
      'Focus on basic formulas in Mechanics and Chemical Bonding. Review the step-by-step solutions for incorrect questions below and re-attempt.';
  }

  return {
    testId: rawTestId,
    testType,
    testedSectionName,
    otherSectionName,
    scaledSectionScore,
    sectionMax: 360,
    assumedOtherScore,
    otherMax: 360,
    totalEstimatedNeet,
    projectedNeetScore: totalEstimatedNeet,
    projectedNeetMax: 720,
    projectedSectionScore: scaledSectionScore,
    projectedSectionMax: 360,
    percentile,
    airBand,
    statusBadge,
    tone,
    difficultyLevel,
    assumedSectionNote,
    recommendation,
  };
}


