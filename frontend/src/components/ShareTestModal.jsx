import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Send,
  Globe,
  Award,
  Clock,
  BookOpen,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function ShareTestModal({
  open,
  onClose,
  test,
  result = null, // Optional result if shared from ResultPage
}) {
  const { isLight } = useTheme();
  const [copied, setCopied] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !test) return null;

  const testKey = test.slug || test.id || test._id || '';
  const testTitle = test.title || 'Standard CBT Examination';
  const totalQ = test.totalQuestions || test.questions?.length || 25;
  const duration = test.durationMinutes || 60;
  const totalMarks = test.totalMarks || totalQ * 4;
  const isJee =
    String(test.category || '').toLowerCase() === 'jee' ||
    String(test.examType || '').toUpperCase().includes('JEE') ||
    String(testKey).toLowerCase().includes('jee');

  // Build the direct shareable URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const shareUrl = `${origin}${pathname}?test=${encodeURIComponent(testKey)}`;

  // Share text message
  let shareText = '';
  if (result) {
    shareText = `⚡ I scored ${result.score}/${result.maxScore || totalMarks} (${result.percentage?.toFixed(1) || 0}%) with ${result.accuracy?.toFixed(1) || 0}% accuracy on "${testTitle}"! Can you beat my score? Attempt the CBT drill here:`;
  } else {
    shareText = `🎯 Attempt "${testTitle}" on the CBT Exam Portal!\n• ${totalQ} Questions · ${duration} Minutes · ${totalMarks} Marks (+4 / -1)\n• Instant KaTeX step-by-step solutions & percentile projection.\nStart examination here:`;
  }

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const temp = document.createElement('textarea');
        temp.value = shareUrl;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: testTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing via Web Share API:', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n${shareUrl}`
  )}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const modalContent = (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-mono"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-lg rounded-2xl border p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900'
            : 'bg-[#080D1A] border-blue-900/50 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div
          className={`pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl ${
            isJee ? 'bg-amber-500/10' : 'bg-blue-500/10'
          }`}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3.5 mb-4 border-inherit">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                isJee
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              <Share2 size={16} />
            </div>
            <div>
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                  isJee ? 'text-amber-400' : 'text-blue-400'
                }`}
              >
                {result ? '[SHARE SCORECARD / TEST]' : '[SHARE EXAMINATION INVITATION]'}
              </span>
              <h2 className="font-mono text-base sm:text-lg font-black tracking-tight">
                {result ? 'Share Your Performance' : 'Invite Batchmates & Peers'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition ${
              isLight
                ? 'border-slate-200 hover:bg-slate-100 text-slate-600'
                : 'border-white/10 hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Test Summary Card */}
        <div
          className={`rounded-xl border p-3.5 mb-4 space-y-2 ${
            isJee
              ? isLight
                ? 'bg-amber-50/70 border-amber-200 text-slate-900'
                : 'bg-amber-950/20 border-amber-500/30 text-slate-200'
              : isLight
              ? 'bg-blue-50/70 border-blue-200 text-slate-900'
              : 'bg-blue-950/20 border-blue-900/40 text-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                isJee
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {isJee ? '🎯 JEE MAIN 2027' : '⚡ NEET 2027'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              CBT MOCK DRILL
            </span>
          </div>

          <h3 className="font-mono text-sm sm:text-base font-bold leading-snug">
            {testTitle}
          </h3>

          {/* If Result exists, show student scorecard snippet */}
          {result && (
            <div
              className={`rounded-lg border p-2.5 flex items-center justify-between text-xs font-mono ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#060A14] border-blue-900/40'
              }`}
            >
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Your Score</span>
                <strong className="text-base font-mono font-black text-emerald-500">
                  {result.score} / {result.maxScore || totalMarks}
                </strong>
                <span className="text-[11px] ml-1.5 font-bold">
                  ({result.percentage?.toFixed(1)}%)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
                <strong className="text-sm font-mono font-bold text-blue-400">
                  {result.accuracy?.toFixed(1)}%
                </strong>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono font-semibold text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock size={12} className={isJee ? 'text-amber-400' : 'text-blue-400'} />
              <span>{duration} Mins</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <BookOpen size={12} className={isJee ? 'text-amber-400' : 'text-blue-400'} />
              <span>{totalQ} Questions</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Award size={12} className="text-emerald-400" />
              <span>{totalMarks} Marks (+4/-1)</span>
            </span>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-1.5 mb-4">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Direct Test Link:</span>
            {copied && (
              <span className="text-emerald-400 flex items-center gap-1 normal-case font-bold">
                <Check size={12} /> Copied to clipboard!
              </span>
            )}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => e.target.select()}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs font-mono outline-hidden select-all ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-[#060A14] border-blue-900/40 text-slate-200'
              }`}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Social / Instant Messaging Buttons */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Share Directly Via:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-3 transition font-bold ${
                isLight
                  ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900'
                  : 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
              }`}
            >
              <MessageCircle size={15} className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-3 transition font-bold ${
                isLight
                  ? 'border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-900'
                  : 'border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300'
              }`}
            >
              <Send size={14} className="text-sky-400" />
              <span>Telegram</span>
            </a>

            {/* Native Share (or Twitter if native not supported) */}
            {typeof navigator !== 'undefined' && navigator.share ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-3 transition font-bold ${
                  isLight
                    ? 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-900'
                    : 'border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300'
                }`}
              >
                <Share2 size={14} className="text-indigo-400" />
                <span>Device Share</span>
              </button>
            ) : (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-3 transition font-bold ${
                  isLight
                    ? 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
                }`}
              >
                <Globe size={14} />
                <span>X / Twitter</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-[10px] font-mono text-center text-slate-500 leading-relaxed">
          Recipients can click the link to immediately open the examination instructions and launch the timed CBT drill.
        </p>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
