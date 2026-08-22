/**
 * Builds topic-wise performance stats from the per-question result list.
 * @param {Array} perQuestion - result.perQuestion from computeResult
 */
export function computeTopicPerformance(perQuestion) {
  const byTopic = {};

  perQuestion.forEach((q) => {
    if (!byTopic[q.topic]) {
      byTopic[q.topic] = { topic: q.topic, correct: 0, wrong: 0, unattempted: 0, total: 0 };
    }
    byTopic[q.topic].total += 1;
    if (q.status === 'correct') byTopic[q.topic].correct += 1;
    else if (q.status === 'wrong') byTopic[q.topic].wrong += 1;
    else byTopic[q.topic].unattempted += 1;
  });

  const topics = Object.values(byTopic).map((t) => {
    const attempted = t.correct + t.wrong;
    const accuracy = attempted > 0 ? (t.correct / attempted) * 100 : 0;
    // Overall mastery treats unattempted as not-yet-earned, for ranking weak/strong areas.
    const mastery = t.total > 0 ? (t.correct / t.total) * 100 : 0;
    return { ...t, accuracy, mastery, attempted };
  });

  topics.sort((a, b) => b.total - a.total || a.topic.localeCompare(b.topic));

  return topics;
}

/**
 * Returns weakest and strongest topics, ignoring topics with a single question
 * for the "weakest" ranking unless they scored 0% (a clear signal even with n=1).
 */
export function getWeakStrongTopics(topics) {
  const eligible = topics.filter((t) => t.attempted > 0);

  const weakest = [...eligible]
    .filter((t) => t.total > 1 || t.mastery === 0)
    .sort((a, b) => a.mastery - b.mastery || b.total - a.total)
    .slice(0, 5);

  const strongest = [...eligible]
    .sort((a, b) => b.mastery - a.mastery || b.total - a.total)
    .slice(0, 5);

  return { weakest, strongest };
}
