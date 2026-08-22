export class ScoringService {
  /**
   * Authoritative server-side evaluation of student exam submissions.
   * @param {Array} questions - questions populated with correctAnswer and explanation
   * @param {Record<string|number,string>} submittedAnswers - student answer selections
   * @param {Object} markingScheme - { correct: 4, wrong: -1, unattempted: 0 }
   */
  static evaluateSubmission(
    questions,
    submittedAnswers = {},
    markingScheme = { correct: 4, wrong: -1, unattempted: 0 }
  ) {
    const marksCorrect = markingScheme.correct ?? 4;
    const marksWrong = markingScheme.wrong ?? -1;
    const marksUnattempted = markingScheme.unattempted ?? 0;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const evaluatedAnswers = questions.map((q) => {
      // Find student answer by question _id (string) or order (number/string)
      const selectedOption =
        submittedAnswers[q._id?.toString()] ??
        submittedAnswers[q.order] ??
        submittedAnswers[String(q.order)] ??
        null;

      let status = 'unattempted';
      let isCorrect = null;
      let marksAwarded = marksUnattempted;

      if (!selectedOption) {
        unattemptedCount += 1;
        status = 'unattempted';
      } else if (q.correctAnswer && selectedOption.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correctCount += 1;
        status = 'correct';
        isCorrect = true;
        marksAwarded = marksCorrect;
      } else {
        wrongCount += 1;
        status = 'wrong';
        isCorrect = false;
        marksAwarded = marksWrong;
      }

      return {
        questionId: q._id,
        order: q.order,
        subject: q.subject || 'General',
        chapter: q.chapter || 'General',
        topic: q.topic || 'General',
        question: q.question,
        options: q.options,
        image: q.image || null,
        selectedOption: selectedOption ? selectedOption.trim().toUpperCase() : null,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || null,
        isCorrect,
        marksAwarded,
        status,
      };
    });

    const totalQuestions = questions.length;
    const rawScore =
      correctCount * marksCorrect +
      wrongCount * marksWrong +
      unattemptedCount * marksUnattempted;

    const score = Math.max(0, rawScore);
    const maxScore = totalQuestions * marksCorrect;
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const attempted = correctCount + wrongCount;
    const accuracy = attempted > 0 ? (correctCount / attempted) * 100 : 0;

    // --- 1. Subject-Wise Performance Breakdown ---
    const subjectStats = {};
    for (const item of evaluatedAnswers) {
      const sub = item.subject || 'General';
      if (!subjectStats[sub]) {
        subjectStats[sub] = {
          subject: sub,
          total: 0,
          correct: 0,
          wrong: 0,
          unattempted: 0,
          marks: 0,
          maxMarks: 0,
        };
      }
      subjectStats[sub].total += 1;
      subjectStats[sub].maxMarks += marksCorrect;
      subjectStats[sub].marks += item.marksAwarded;
      if (item.status === 'correct') subjectStats[sub].correct += 1;
      else if (item.status === 'wrong') subjectStats[sub].wrong += 1;
      else subjectStats[sub].unattempted += 1;
    }

    const subjectPerformance = Object.values(subjectStats).map((s) => {
      const subAttempted = s.correct + s.wrong;
      const subAccuracy = subAttempted > 0 ? (s.correct / subAttempted) * 100 : 0;
      const subPercentage = s.maxMarks > 0 ? (Math.max(0, s.marks) / s.maxMarks) * 100 : 0;
      return {
        ...s,
        marks: Math.max(0, s.marks),
        accuracy: Math.round(subAccuracy * 10) / 10,
        percentage: Math.round(subPercentage * 10) / 10,
      };
    });

    // --- 2. Chapter Performance Breakdown ---
    const chapterStats = {};
    for (const item of evaluatedAnswers) {
      const chapKey = `${item.subject}::${item.chapter}`;
      if (!chapterStats[chapKey]) {
        chapterStats[chapKey] = {
          chapter: item.chapter || 'General',
          subject: item.subject || 'General',
          total: 0,
          correct: 0,
          wrong: 0,
          unattempted: 0,
        };
      }
      chapterStats[chapKey].total += 1;
      if (item.status === 'correct') chapterStats[chapKey].correct += 1;
      else if (item.status === 'wrong') chapterStats[chapKey].wrong += 1;
      else chapterStats[chapKey].unattempted += 1;
    }

    const chapterPerformance = Object.values(chapterStats).map((c) => {
      const chapAttempted = c.correct + c.wrong;
      const chapAccuracy = chapAttempted > 0 ? (c.correct / chapAttempted) * 100 : 0;
      const chapMastery = c.total > 0 ? (c.correct / c.total) * 100 : 0;
      return {
        ...c,
        accuracy: Math.round(chapAccuracy * 10) / 10,
        mastery: Math.round(chapMastery * 10) / 10,
      };
    });

    // --- 3. Topic Performance Breakdown & Weak/Strong Identification ---
    const topicStats = {};
    for (const item of evaluatedAnswers) {
      const topName = item.topic || 'General';
      if (!topicStats[topName]) {
        topicStats[topName] = {
          topic: topName,
          total: 0,
          correct: 0,
          wrong: 0,
          unattempted: 0,
        };
      }
      topicStats[topName].total += 1;
      if (item.status === 'correct') topicStats[topName].correct += 1;
      else if (item.status === 'wrong') topicStats[topName].wrong += 1;
      else topicStats[topName].unattempted += 1;
    }

    const topicPerformance = Object.values(topicStats).map((t) => {
      const topicAttempted = t.correct + t.wrong;
      const topicAccuracy = topicAttempted > 0 ? (t.correct / topicAttempted) * 100 : 0;
      const topicMastery = t.total > 0 ? (t.correct / t.total) * 100 : 0;
      return {
        ...t,
        accuracy: Math.round(topicAccuracy * 10) / 10,
        mastery: Math.round(topicMastery * 10) / 10,
      };
    });

    topicPerformance.sort((a, b) => b.total - a.total || a.topic.localeCompare(b.topic));

    const eligible = topicPerformance.filter((t) => t.correct + t.wrong > 0);
    const weakestTopics = [...eligible]
      .filter((t) => t.total > 1 || t.mastery === 0)
      .sort((a, b) => a.mastery - b.mastery || b.total - a.total)
      .slice(0, 5)
      .map((t) => t.topic);

    const strongestTopics = [...eligible]
      .sort((a, b) => b.mastery - a.mastery || b.total - a.total)
      .slice(0, 5)
      .map((t) => t.topic);

    return {
      score,
      rawScore,
      maxScore,
      percentage: Math.round(percentage * 10) / 10,
      accuracy: Math.round(accuracy * 10) / 10,
      correctCount,
      wrongCount,
      unattemptedCount,
      totalQuestions,
      evaluatedAnswers,
      subjectPerformance,
      chapterPerformance,
      topicPerformance,
      weakestTopics,
      strongestTopics,
    };
  }
}
