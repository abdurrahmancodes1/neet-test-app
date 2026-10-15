import React, { useState } from 'react';
import { X, User, Calendar, Award, CheckCircle2, AlertCircle, Loader2, Save } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { updateUserProfile, formatISTDateTime } from '../utils/auth.js';

export default function ProfileSettingsModal({ open, onClose, user, onUserUpdated }) {
  const { isLight } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [rollNumber, setRollNumber] = useState(user?.rollNumber || '');
  const [targetExam, setTargetExam] = useState(user?.targetExam || 'NEET 2027');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      rollNumber: rollNumber.trim() || null,
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
      }, 1200);
    } else {
      setError(res.error || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-3xl border p-6 sm:p-7 shadow-2xl transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900 shadow-xl' : 'bg-[#0B0F19] border-white/10 text-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <User size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">Candidate Profile</h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Manage candidate details and preparation target
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full p-1.5 transition ${
              isLight ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-slate-400'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-2xl bg-rose-500/15 border border-rose-500/30 p-3 text-xs text-rose-500">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-500">
              <CheckCircle2 size={15} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arshiya Nesar"
              required
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition ${
                isLight
                  ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                  : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-500'
              }`}
            />
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Email Address <span className="text-[10px] text-slate-500">(Permanent)</span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-xs sm:text-sm cursor-not-allowed opacity-75 ${
                isLight ? 'border-slate-200 bg-slate-100 text-slate-600' : 'border-white/5 bg-[#05070B] text-slate-400'
              }`}
            />
          </div>

          {/* Roll / Candidate ID */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Roll Number / Registration Code <span className="text-[10px] text-slate-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. NEET-2027-0482"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition font-mono ${
                isLight
                  ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                  : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-500'
              }`}
            />
          </div>

          {/* Target Exam */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Target Examination
            </label>
            <select
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition cursor-pointer ${
                isLight ? 'border-slate-300 bg-slate-50 text-slate-900' : 'border-white/10 bg-[#070A12] text-white'
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

          {/* Registration Date (IST) */}
          <div
            className={`rounded-2xl border p-3 flex items-center justify-between text-xs ${
              isLight ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/5 bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" />
              <span>Registered On:</span>
            </div>
            <span className="font-mono font-semibold">
              {formatISTDateTime(user?.createdAt || user?.registeredAt)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-slate-400'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
