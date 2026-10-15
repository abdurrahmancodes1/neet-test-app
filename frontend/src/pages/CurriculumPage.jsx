import React, { useState } from 'react';
import {
  BookOpen,
  Zap,
  Target,
  Award,
  Layers,
  GraduationCap,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Atom,
  Dna,
  Scale,
  Flame,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import Navbar from '../components/Navbar.jsx';
import GlobalLeaderboardModal from '../components/GlobalLeaderboardModal.jsx';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { JEE_2027_PERIODIC_TEST } from '../data/jee2027PeriodicTableTest.js';

export default function CurriculumPage({
  user,
  onStartTest,
  onBrowseTests,
  onGoToDashboard,
  onGoToAdmin,
  onLogout,
  onUserUpdated,
}) {
  const { isLight } = useTheme();
  const [selectedTrack, setSelectedTrack] = useState('neet'); // 'neet' | 'jee' | 'foundation'
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);

  const handleNav = (screen) => {
    if (screen === 'dashboard') {
      if (onGoToDashboard) onGoToDashboard();
    } else if (screen === 'tests' || screen === 'chapters') {
      if (onBrowseTests) onBrowseTests();
    } else if (screen === 'admin') {
      if (onGoToAdmin) onGoToAdmin();
    }
  };

  const tracks = [
    {
      id: 'neet',
      label: 'NEET 2027 Track',
      badge: 'Physics · Chem · Biology',
      icon: Zap,
    },
    {
      id: 'jee',
      label: 'JEE Main 2027 Track',
      badge: 'PCM & Percentile Matrix',
      icon: Target,
    },
    {
      id: 'foundation',
      label: 'Foundation (Class 8–10)',
      badge: 'CBSE & Olympiad Guide',
      icon: GraduationCap,
    },
  ];

  return (
    <main
      className={`min-h-screen px-4 py-4 sm:py-6 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] blur-3xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent'
        }`}
      />

      <div className="mx-auto max-w-5xl space-y-8 relative z-10 animate-fade-in">
        {/* Unified Navigation Bar */}
        <Navbar
          currentScreen="curriculum"
          user={user}
          onNavigate={handleNav}
          onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          onLogout={onLogout}
          onUserUpdated={onUserUpdated}
        />

        {/* Curriculum Header */}
        <section
          className={`rounded-3xl border p-6 sm:p-7 shadow-xl relative overflow-hidden transition ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
              : 'bg-gradient-to-r from-[#0C1222] via-[#090D18] to-[#0C1222] border-white/10 text-white shadow-2xl'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  National Curriculum Blueprint
                </span>
              </div>
              <h1 className={`font-sans text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Curriculum Portal &amp; Syllabus Drills
              </h1>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Official chapter weightages, NTA-aligned learning blueprints, and direct CBT mock drill launchers for NEET &amp; JEE 2027.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={onBrowseTests}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-blue-600/25 transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Browse All Tests</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Track Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tracks.map((trk) => {
            const Icon = trk.icon;
            const isActive = selectedTrack === trk.id;
            return (
              <button
                key={trk.id}
                type="button"
                onClick={() => setSelectedTrack(trk.id)}
                className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? isLight
                      ? 'border-blue-500 bg-blue-50/80 text-slate-900 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-blue-500 bg-gradient-to-b from-[#0D1528] to-[#0B0F19] text-white shadow-lg ring-1 ring-blue-500'
                    : isLight
                    ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
                    : 'border-white/10 bg-[#0B0F19] text-slate-300 hover:bg-[#0D121F]'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isLight
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${isActive ? (isLight ? 'text-slate-900' : 'text-white') : ''}`}>
                    {trk.label}
                  </p>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {trk.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* TRACK 1: NEET 2027 CURRICULUM */}
        {selectedTrack === 'neet' && (
          <div className="space-y-6 animate-fade-in">
            {/* Physics Module */}
            <div
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
                isLight ? 'bg-white border-blue-200 text-slate-900' : 'bg-[#0B0F19] border-blue-500/30 text-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">NEET Physics Blueprint</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Core high-yield domains with strict adherence to the latest NMC/NTA NEET syllabus.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_ROUND_1_TEST.id)}
                  className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Practice Mechanics Drill</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Domain 1 · Mechanics</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Work, Energy &amp; Rotational Dynamics</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Work-Energy Theorem, Conservative Forces, COM Dynamics, Moment of Inertia &amp; Torques. (Strictly excludes pure rolling).
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-blue-500 font-bold">~14% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Domain 2 · Electrodynamics</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Fields, Potential &amp; Currents</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Coulomb's Law, Gauss's Theorem, Capacitance, Kirchhoff's Laws, Biot-Savart Law &amp; Electromagnetic Induction.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-blue-500 font-bold">~16% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Domain 3 · Modern Physics</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Atoms, Nuclei &amp; Semis</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Photoelectric effect, de Broglie wavelength, Bohr model, Nuclear binding energy, and p-n junction diodes.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-blue-500 font-bold">~12% Paper Weightage</span>
                </div>
              </div>
            </div>

            {/* Chemistry Module */}
            <div
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
                isLight ? 'bg-white border-emerald-200 text-slate-900' : 'bg-[#0B0F19] border-emerald-500/30 text-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Atom size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">NEET Chemistry Blueprint</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Physical calculations, molecular geometry, and high-yield organic reaction mechanisms.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_ROUND_2_TEST.id)}
                  className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Practice Chemistry Drill</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Inorganic &amp; Bonding</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Chemical Bonding &amp; MOT</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    VSEPR molecular shapes, hybridization sp3d/sp3d2, molecular orbital bond orders, and dipole moments.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-emerald-500 font-bold">~15% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Physical Chemistry</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Thermodynamics &amp; Equilibrium</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Enthalpy, entropy, Gibbs energy spontaneity, ionic pH calculations, buffers, and electrochemistry.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-emerald-500 font-bold">~14% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Organic Mechanisms</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>GOC &amp; Reaction Tracks</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Electrophilic aromatic substitution, nucleophilic addition, aldehydes, ketones, and biomolecules.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-emerald-500 font-bold">~15% Paper Weightage</span>
                </div>
              </div>
            </div>

            {/* Biology Module */}
            <div
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
                isLight ? 'bg-white border-teal-200 text-slate-900' : 'bg-[#0B0F19] border-teal-500/30 text-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                    <Dna size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">NEET Biology Blueprint</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Botany &amp; Zoology with NCERT line-by-line focus, diagrams, and assertion-reason mastery.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_BIOLOGY_TEST.id)}
                  className="rounded-full bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Practice Biology Drill</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>Botany Core</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Plant Morphology &amp; Physiology</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Floral formulas (Fabaceae, Solanaceae, Liliaceae), Photosynthesis C3/C4 pathways, and Respiration.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-teal-500 font-bold">~18% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>Genetics &amp; Evolution</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Molecular Inheritance</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    DNA replication, transcription, genetic code, operon models, pedigree charts, and recombinant DNA.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-teal-500 font-bold">~20% Paper Weightage</span>
                </div>

                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>Human Physiology</span>
                  <p className={`font-bold text-sm mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Organ Systems &amp; Neural Control</p>
                  <p className={`mt-1 text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Cardiac cycle, nephron countercurrent multiplier, nerve impulse transmission, and endocrine feedback loops.
                  </p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-teal-500 font-bold">~18% Paper Weightage</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRACK 2: JEE MAIN 2027 CURRICULUM & CUTOFF MATRIX */}
        {selectedTrack === 'jee' && (
          <div className="space-y-6 animate-fade-in">
            {/* JEE Header & Action */}
            <div
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl space-y-4 ${
                isLight ? 'bg-white border-amber-200 text-slate-900' : 'bg-[#0B0F19] border-amber-500/30 text-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg">JEE Main 2027 Architecture</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Strict JEE Main pattern with 60 Questions, 90 Minutes duration, and standard +4 / -1 scheme.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(JEE_2027_PERIODIC_TEST.id)}
                  className="rounded-full bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Launch JEE Periodic Table CBT</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Official Cutoff & Percentile Predictor Matrix */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-amber-500/20">
                <div className={`p-3.5 border-b text-xs font-bold ${
                  isLight ? 'bg-amber-50/80 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-white/10 text-amber-300'
                }`}>
                  Official JEE Main 2027 Score, Percentile &amp; Qualifying Cutoff Benchmark Matrix
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                        isLight ? 'border-amber-200 bg-amber-50/40 text-amber-900' : 'border-white/10 bg-[#070A12] text-slate-400'
                      }`}>
                        <th className="p-3">Percentile</th>
                        <th className="p-3">Hard Paper (95-104m)</th>
                        <th className="p-3">Moderate Paper</th>
                        <th className="p-3">Easy Paper</th>
                        <th className="p-3">NIT &amp; IIIT Branch Forecast</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-mono ${isLight ? 'divide-amber-100 text-slate-800' : 'divide-white/5 text-slate-300'}`}>
                      <tr className={isLight ? 'bg-amber-50/30' : 'bg-amber-500/5'}>
                        <td className="p-3 font-black text-amber-500">99.5+ %tile</td>
                        <td className="p-3 font-bold">95–104 Marks</td>
                        <td className="p-3">105–112 Marks</td>
                        <td className="p-3">114–120 Marks</td>
                        <td className="p-3 font-sans text-xs">AIR 1–650 · Top NITs CSE (Trichy, Surathkal, Warangal)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-amber-500">99.0+ %tile</td>
                        <td className="p-3 font-bold">72–78 Marks</td>
                        <td className="p-3">82–88 Marks</td>
                        <td className="p-3">92–98 Marks</td>
                        <td className="p-3 font-sans text-xs">AIR ~14,000 · Top NITs CSE &amp; ECE Cutoff</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-blue-500">98.0+ %tile</td>
                        <td className="p-3 font-bold">62–71 Marks</td>
                        <td className="p-3">72–81 Marks</td>
                        <td className="p-3">82–91 Marks</td>
                        <td className="p-3 font-sans text-xs">AIR ~28,000 · Top NITs Core Branches (Mechanical, EEE)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-indigo-500">95.0+ %tile</td>
                        <td className="p-3 font-bold">48–60 Marks</td>
                        <td className="p-3">58–70 Marks</td>
                        <td className="p-3">68–80 Marks</td>
                        <td className="p-3 font-sans text-xs">AIR ~70,000 · State Engineering Merit &amp; Top IIITs</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-rose-500">93.2+ %tile</td>
                        <td className="p-3 font-bold">42–46 Marks</td>
                        <td className="p-3">50–55 Marks</td>
                        <td className="p-3">60–65 Marks</td>
                        <td className="p-3 font-sans text-xs">AIR ~96,000 · ⚡ Official JEE Advanced Eligibility Cutoff</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRACK 3: FOUNDATION (CLASS 8, 9, 10) */}
        {selectedTrack === 'foundation' && (
          <div className="space-y-6 animate-fade-in">
            <div
              className={`rounded-3xl border p-8 text-center sm:p-12 ${
                isLight ? 'border-slate-200 bg-white text-slate-800 shadow-sm' : 'border-white/10 bg-[#0B0F19] text-white shadow-xl'
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-500 shadow-glow">
                <GraduationCap size={32} />
              </div>
              <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Junior &amp; High School Foundation Series
              </span>
              <h2 className={`mt-3 font-serif italic text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Class 8, 9 &amp; 10 Foundation Modules
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Build competitive aptitude and early foundation skills for Olympiads, NTSE, and early NEET/JEE preparation.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Class 10</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Board &amp; NTSE</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Light reflection, Chemical reactions &amp; Life processes.</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Class 9</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Foundation Science</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Laws of motion, Gravitation, Matter &amp; Cell structure.</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Class 8</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Junior Olympiad</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Force &amp; Pressure, Friction, and Linear equations.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Leaderboard Modal */}
        <GlobalLeaderboardModal
          open={leaderboardModalOpen}
          onClose={() => setLeaderboardModalOpen(false)}
          currentUserEmail={user?.email}
          isAdmin={user?.role === 'admin'}
        />
      </div>
    </main>
  );
}
