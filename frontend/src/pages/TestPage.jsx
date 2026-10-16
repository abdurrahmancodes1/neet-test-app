import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import TestHeader from '../components/TestHeader.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import QuestionPalette from '../components/QuestionPalette.jsx';
import TestNavigation from '../components/TestNavigation.jsx';
import SubmitModal from '../components/SubmitModal.jsx';
import { useTheme } from '../utils/themeContext.jsx';

function getQKey(q) {
  return q ? (q.order ?? q.id ?? q._id) : null;
}

export default function TestPage({ session, updateSession, onSubmit, test }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [autoSubmitNotice, setAutoSubmitNotice] = useState(false);
  const submittingRef = useRef(false);

  const questions = test?.questions || [];
  const testTitle = test?.title || 'NEET Practice Test';

  const currentIndex = Math.min(session.currentQuestion || 0, Math.max(0, questions.length - 1));
  const currentQuestion = questions[currentIndex] || questions[0] || {};
  const currentKey = getQKey(currentQuestion);
  const total = questions.length;

  const answeredCount = useMemo(
    () =>
      questions.filter((q) => {
        const k = getQKey(q);
        return Boolean(
          session.answers?.[k] ??
          (q._id && session.answers?.[q._id]) ??
          (q.order && session.answers?.[q.order]) ??
          (q.id && session.answers?.[q.id])
        );
      }).length,
    [questions, session.answers]
  );
  const unansweredCount = total - answeredCount;
  const markedCount = session.markedForReview?.length || 0;

  const selectAnswer = useCallback(
    (letter) => {
      if (!currentKey) return;
      updateSession((prev) => ({
        ...prev,
        answers: { ...(prev.answers || {}), [currentKey]: letter },
      }));
    },
    [currentKey, updateSession]
  );

  const clearAnswer = useCallback(() => {
    if (!currentKey) return;
    updateSession((prev) => {
      const next = { ...(prev.answers || {}) };
      delete next[currentKey];
      if (currentQuestion._id) delete next[currentQuestion._id];
      if (currentQuestion.order) delete next[currentQuestion.order];
      if (currentQuestion.id) delete next[currentQuestion.id];
      return { ...prev, answers: next };
    });
  }, [currentKey, currentQuestion, updateSession]);

  const toggleMark = useCallback(() => {
    if (!currentKey) return;
    updateSession((prev) => {
      const markedList = prev.markedForReview || [];
      const isMarked =
        markedList.includes(currentKey) ||
        (currentQuestion._id && markedList.includes(currentQuestion._id)) ||
        (currentQuestion.order && markedList.includes(currentQuestion.order)) ||
        (currentQuestion.id && markedList.includes(currentQuestion.id));

      return {
        ...prev,
        markedForReview: isMarked
          ? markedList.filter(
              (id) =>
                id !== currentKey &&
                id !== currentQuestion._id &&
                id !== currentQuestion.order &&
                id !== currentQuestion.id
            )
          : [...markedList, currentKey],
      };
    });
  }, [currentKey, currentQuestion, updateSession]);

  const goTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(total - 1, idx));
      updateSession((prev) => ({ ...prev, currentQuestion: clamped }));
    },
    [total, updateSession]
  );

  const handleExpire = useCallback(() => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setAutoSubmitNotice(true);
    onSubmit(true);
  }, [onSubmit]);

  const marked = Boolean(
    (session.markedForReview || []).includes(currentKey) ||
    (currentQuestion._id && (session.markedForReview || []).includes(currentQuestion._id)) ||
    (currentQuestion.order && (session.markedForReview || []).includes(currentQuestion.order)) ||
    (currentQuestion.id && (session.markedForReview || []).includes(currentQuestion.id))
  );

  const selectedAnswer =
    session.answers?.[currentKey] ??
    (currentQuestion._id && session.answers?.[currentQuestion._id]) ??
    (currentQuestion.order && session.answers?.[currentQuestion.order]) ??
    (currentQuestion.id && session.answers?.[currentQuestion.id]);

  // Keyboard navigation for CBT (ArrowLeft -> Previous, ArrowRight -> Next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        goTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goTo(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goTo]);

  const { isLight } = useTheme();

  if (questions.length === 0) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#05070B]'}`}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className={`text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading test questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen flex-col transition-colors duration-200 ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'}`}>
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
            selected={selectedAnswer}
            marked={marked}
            onSelect={selectAnswer}
            onToggleMark={toggleMark}
            onClear={clearAnswer}
          />
        </main>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 pb-4">
        <TestNavigation
          onPrev={() => goTo(currentIndex - 1)}
          onNext={() => goTo(currentIndex + 1)}
          onSubmit={() => setModalOpen(true)}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
          marked={marked}
          onToggleMark={toggleMark}
          hasAnswer={Boolean(selectedAnswer)}
          onClearAnswer={clearAnswer}
        />
      </div>

      <SubmitModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          if (submittingRef.current) return;
          submittingRef.current = true;
          setModalOpen(false);
          onSubmit(false);
        }}
        answered={answeredCount}
        unanswered={unansweredCount}
        marked={markedCount}
      />

      {autoSubmitNotice && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto flex w-fit items-center gap-2 rounded-full bg-slate-900 border border-slate-700 px-4 py-2 text-sm font-medium text-white shadow-2xl animate-rise-in">
          <AlertTriangle size={15} className="text-amber-400" />
          Time's up — your test was submitted automatically.
        </div>
      )}
    </div>
  );
}
