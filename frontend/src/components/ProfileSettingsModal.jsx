import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Calendar, CheckCircle2, AlertCircle, Loader2, Save, Target } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { updateUserProfile, formatISTDateTime } from '../utils/auth.js';

export default function ProfileSettingsModal({ open, onClose, user, onUserUpdated }) {
  const { isLight } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [targetExam, setTargetExam] = useState(user?.targetExam || 'NEET 2027');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update local fields if user changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setTargetExam(user.targetExam || 'NEET 2027');
    }
  }, [user]);

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // Support Escape key to close
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }

    setLoading(true);
    const res = await updateUserProfile({
      name: cleanName,
      targetExam: targetExam.trim(),
    });
    setLoading(false);

    if (res.success && res.user) {
      setSuccess('Profile updated successfully!');
      if (onUserUpdated) {
        onUserUpdated(res.user);
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError(res.error || 'Failed to update profile. Please try again.');
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-settings-title"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-xl border p-5 sm:p-6 shadow-2xl font-mono max-h-[90vh] overflow-y-auto transition-all ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900 shadow-xl'
            : 'bg-[#0B0F19] border-blue-900/40 text-white shadow-2xl'
        }`}
      >
        {/* Terminal Header */}
        <div
          className={`flex items-center justify-between border-b pb-3.5 ${
            isLight ? 'border-slate-200' : 'border-blue-900/40'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <User size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">
                  [PROFILE CONFIG]
                </span>
              </div>
              <h3
                id="profile-settings-title"
                className="font-bold text-sm sm:text-base leading-tight tracking-tight text-slate-100"
              >
                CANDIDATE CREDENTIALS
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Profile Settings"
            className={`rounded p-1.5 transition ${
              isLight
                ? 'hover:bg-slate-100 text-slate-500'
                : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {error && (
            <div className="flex items-center gap-2 rounded bg-rose-500/15 border border-rose-500/30 p-2.5 text-xs text-rose-400">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-xs text-emerald-400">
              <CheckCircle2 size={15} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              Candidate Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arshiya Nesar"
              required
              className={`w-full rounded border px-3 py-2 text-xs font-mono focus:border-blue-500 focus:outline-none transition ${
                isLight
                  ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                  : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-600 focus:bg-[#0A1020]'
              }`}
            />
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              Registered Email <span className="text-[10px] text-slate-500">(Locked ID)</span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={`w-full rounded border px-3 py-2 text-xs font-mono cursor-not-allowed opacity-75 ${
                isLight
                  ? 'border-slate-200 bg-slate-100 text-slate-600'
                  : 'border-white/5 bg-[#05070B] text-slate-400'
              }`}
            />
          </div>

          {/* Target Exam */}
          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              Target Examination
            </label>
            <div className="relative">
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className={`w-full rounded border px-3 py-2 text-xs font-mono focus:border-blue-500 focus:outline-none transition cursor-pointer ${
                  isLight
                    ? 'border-slate-300 bg-slate-50 text-slate-900'
                    : 'border-white/10 bg-[#070A12] text-white focus:bg-[#0A1020]'
                }`}
              >
                <option value="NEET 2027">NEET 2027 (Medical Aspirant)</option>
                <option value="NEET 2026">NEET 2026 (Target Batch)</option>
                <option value="JEE Main 2027">JEE Main 2027 (Engineering)</option>
                <option value="JEE Advanced 2027">JEE Advanced 2027</option>
                <option value="Class 10 Foundation">Class 10 Foundation</option>
                <option value="Class 9 Foundation">Class 9 Foundation</option>
              </select>
            </div>
          </div>

          {/* Registration Date (IST) */}
          <div
            className={`rounded border p-2.5 flex items-center justify-between text-[11px] ${
              isLight
                ? 'border-slate-200 bg-slate-50 text-slate-700'
                : 'border-white/5 bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-blue-400" />
              <span>Registered (IST):</span>
            </div>
            <span className="font-mono font-bold text-blue-400">
              {formatISTDateTime(user?.createdAt || user?.registeredAt)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`rounded px-3.5 py-1.5 text-xs font-bold transition ${
                isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-slate-400'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
