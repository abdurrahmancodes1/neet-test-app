/**
 * Deduplicate rapid burst submissions (e.g. from timer retry loops or network retries)
 * Keeps the first authentic submission in any burst within 60 seconds
 * for the same student, test, and score.
 */
export function filterBurstDuplicates(results) {
  if (!Array.isArray(results) || results.length <= 1) return results || [];

  // Sort chronologically ascending to preserve the original authentic attempt
  const sorted = [...results].sort((a, b) => {
    const timeA = new Date(a.createdAt || a.submittedAt || a.timestamp || 0).getTime();
    const timeB = new Date(b.createdAt || b.submittedAt || b.timestamp || 0).getTime();
    return timeA - timeB;
  });

  const unique = [];
  const seenIds = new Set();

  for (const r of sorted) {
    const rId = (r._id?.toString() || r.attemptId || r.id || '').toString();
    if (rId && seenIds.has(rId)) {
      continue;
    }

    const rTime = new Date(r.createdAt || r.submittedAt || r.timestamp || 0).getTime();
    const rEmail = (r.studentEmail || r.userId?.email || r.userId || '').toString().toLowerCase().trim();
    const rTest = (r.testId || '').toString();
    const rScore = r.score;

    const isDuplicate = unique.some((u) => {
      const uTime = new Date(u.createdAt || u.submittedAt || u.timestamp || 0).getTime();
      const uEmail = (u.studentEmail || u.userId?.email || u.userId || '').toString().toLowerCase().trim();
      const uTest = (u.testId || '').toString();
      const uScore = u.score;

      // Same student, same test, same score within 60 seconds
      if (rEmail && uEmail && rEmail === uEmail && rTest === uTest && rScore === uScore) {
        if (Math.abs(rTime - uTime) <= 60000) {
          return true;
        }
      }
      return false;
    });

    if (!isDuplicate) {
      unique.push(r);
      if (rId) seenIds.add(rId);
    }
  }

  // Restore descending order (most recent first) for callers
  return unique.sort((a, b) => {
    const timeA = new Date(a.createdAt || a.submittedAt || a.timestamp || 0).getTime();
    const timeB = new Date(b.createdAt || b.submittedAt || b.timestamp || 0).getTime();
    return timeB - timeA;
  });
}
