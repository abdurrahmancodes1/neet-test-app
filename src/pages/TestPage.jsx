import React, { useCallback, useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { questions as defaultQuestions } from '../data/questions.js';
import TestHeader from '../components/TestHeader.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import QuestionPalette from '../components/QuestionPalette.jsx';
import TestNavigation from '../components/TestNavigation.jsx';
import SubmitModal from '../components/SubmitModal.jsx';

export default function TestPage({ session, updateSession, onSubmit, test }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [autoSubmitNotice, setAutoSubmitNotice] = useState(false);

  const questions = test?.questions || defaultQuestions;
  const testTitle = test?.title || 'NEET Practice Test';

  const currentIndex = Math.min(session.currentQuestion || 0, questions.length - 1);
  const currentQuestion = questions[currentIndex] || questions[0];
  const total = questions.length;

  const answeredCount = useMemo(
    () => questions.filter((q) => session.answers?.[q.id]).length,
    [questions, session.answers]
  );
  const unansweredCount = total - answeredCount;
  const markedCount = session.markedForReview?.length || 0;

  const selectAnswer = useCallback(
    (letter) => {
      updateSession((prev) => ({
        ...prev,
        answers: { ...(prev.answers || {}), [currentQuestion.id]: letter },
      }));
    },
    [currentQuestion.id, updateSession]
  );

  const clearAnswer = useCallback(() => {
    updateSession((prev) => {
      const next = { ...(prev.answers || {}) };
      delete next[currentQuestion.id];
      return { ...prev, answers: next };
    });
  }, [currentQuestion.id, updateSession]);

  const toggleMark = useCallback(() => {
    updateSession((prev) => {
      const markedList = prev.markedForReview || [];
      const isMarked = markedList.includes(currentQuestion.id);
      return {
        ...prev,
        markedForReview: isMarked
          ? markedList.filter((id) => id !== currentQuestion.id)
          : [...markedList, currentQuestion.id],
      };
    });
  }, [currentQuestion.id, updateSession]);

  const goTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(total - 1, idx));
      updateSession((prev) => ({ ...prev, currentQuestion: clamped }));
    },
    [total, updateSession]
  );

  const handleExpire = useCallback(() => {
    setAutoSubmitNotice(true);
    onSubmit(true);
  }, [onSubmit]);

  const marked = (session.markedForReview || []).includes(currentQuestion.id);

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <TestHeader
        title={testTitle}
        endTime={session.endTime}
        onExpire={handleExpire}
        currentIndex={currentIndex}
        total={total}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-5">
        <QuestionPalette
          questions={questions}
          answers={session.answers || {}}
          marked={session.markedForReview || []}
          currentIndex={currentIndex}
          onJump={goTo}
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onSubmit={() => {
            setPaletteOpen(false);
            setModalOpen(true);
          }}
        />

        <main className="mx-auto w-full max-w-3xl flex-1">
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={total}
            selected={session.answers?.[currentQuestion.id]}
            marked={marked}
            onSelect={selectAnswer}
            onToggleMark={toggleMark}
            onClear={clearAnswer}
          />
        </main>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4">
        <TestNavigation
          onPrev={() => goTo(currentIndex - 1)}
          onNext={() => goTo(currentIndex + 1)}
          onSubmit={() => setModalOpen(true)}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
        />
      </div>

      <SubmitModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          onSubmit(false);
        }}
        answered={answeredCount}
        unanswered={unansweredCount}
        marked={markedCount}
      />

      {autoSubmitNotice && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white shadow-pop animate-rise-in">
          <AlertTriangle size={15} className="text-gold-300" />
          Time's up — your test was submitted automatically.
        </div>
      )}
    </div>
  );
}
