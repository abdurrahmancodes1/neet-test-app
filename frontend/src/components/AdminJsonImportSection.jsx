import React, { useState, useCallback } from 'react';
import {
  FileCode,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  HelpCircle,
  Eye,
  ArrowLeft,
  Sparkles,
  Zap,
  Clock,
  Layers,
  BookOpen,
  Send,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { API_BASE } from '../utils/auth.js';
import MathRenderer from './MathRenderer.jsx';
import SafeSvgRenderer from './SafeSvgRenderer.jsx';

export default function AdminJsonImportSection({
  user,
  onTestCreated,
  onLaunchTest,
}) {
  const { isLight } = useTheme();

  // State
  const [jsonText, setJsonText] = useState('');
  const [fileName, setFileName] = useState('');
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'paste'
  const [showPromptGuide, setShowPromptGuide] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Workflow state: 'input' | 'preview' | 'success'
  const [workflowStep, setWorkflowStep] = useState('input');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [createdTestResult, setCreatedTestResult] = useState(null);
  const [publishImmediately, setPublishImmediately] = useState(true);

  // ChatGPT / Gemini Prompt template
  const AI_PROMPT_TEMPLATE = `You are an expert NEET/JEE Examination Paper Digitizer.
Extract all questions from the attached PDF document and convert them into a strict, validated JSON format.

REQUIREMENTS:
1. Output ONLY valid, parseable JSON conforming to this schema. No markdown backticks, no commentary.
2. For all equations and mathematical formulas, use standard LaTeX enclosed in $...$ (inline) or $$...$$ (block).
3. For any diagrams, circuit illustrations, graphs, or geometric figures, DO NOT use external image URLs or base64 images.
   Instead, embed clean, valid inline SVG markup inside "questionImage": { "type": "svg", "data": "<svg ...>...</svg>" }.
   - If a question has no diagram, set "questionImage": null.
   - Use viewBox (e.g. viewBox="0 0 500 320") so SVG scales responsively.
   - Use high-contrast colors (e.g. #0F172A, #2563EB, #EF4444).
4. Provide step-by-step explanations in the "explanation" field for each question.
5. If any figure cannot be reconstructed accurately or details are uncertain, record a brief note in the "warnings" array.

JSON SCHEMA:
{
  "schemaVersion": "1.0",
  "title": "<Exam Title>",
  "examType": "JEE_MAIN", // or "NEET"
  "type": "chapter", // or "full_mock"
  "subjects": ["Physics"],
  "chapters": ["<Chapter Name>"],
  "durationMinutes": 60,
  "difficulty": "Hard",
  "markingScheme": { "correct": 4, "wrong": -1, "unattempted": 0 },
  "status": "published",
  "questions": [
    {
      "id": "q1",
      "order": 1,
      "subject": "Physics",
      "chapter": "<Chapter Name>",
      "topic": "<Topic Name>",
      "difficulty": "Hard",
      "type": "mcq",
      "question": "Question text with LaTeX like $F = ma$...",
      "questionImage": {
        "type": "svg",
        "data": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 400 300\\">...</svg>"
      },
      "options": {
        "A": "Option A text...",
        "B": "Option B text...",
        "C": "Option C text...",
        "D": "Option D text..."
      },
      "correctAnswer": "A",
      "explanation": "Step-by-step solution with LaTeX...",
      "warnings": []
    }
  ]
}`;

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setJsonText(content);
        setValidationErrors([]);
      }
    };
    reader.readAsText(file);
  };

  // Format / Beautify JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setValidationErrors([]);
    } catch (err) {
      setValidationErrors([`Invalid JSON syntax: ${err.message}`]);
    }
  };

  // Copy AI prompt to clipboard
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_PROMPT_TEMPLATE);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Validate & Dry-run Preview
  const handleValidateAndPreview = async () => {
    if (!jsonText.trim()) {
      setValidationErrors(['Please select a JSON file or paste JSON markup to continue.']);
      return;
    }

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(jsonText);
    } catch (err) {
      setValidationErrors([`JSON Syntax Error: ${err.message}`]);
      return;
    }

    setIsValidating(true);
    setValidationErrors([]);

    try {
      const token = user?.token;
      const res = await fetch(`${API_BASE}/admin/tests/import-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify(parsedPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorList = Array.isArray(data.errors)
          ? data.errors.map((e) => (typeof e === 'string' ? e : `${e.field}: ${e.message}`))
          : [data.message || 'Validation failed'];
        setValidationErrors(errorList);
        return;
      }

      setPreviewData(data.data);
      setWorkflowStep('preview');
    } catch (err) {
      setValidationErrors([`Network or Server Error: ${err.message}`]);
    } finally {
      setIsValidating(false);
    }
  };

  // Confirm Import & Create in MongoDB
  const handleConfirmImport = async () => {
    if (!previewData) return;

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(jsonText);
      } catch {
        parsedPayload = previewData.test;
      }

      parsedPayload.status = publishImmediately ? 'published' : 'draft';

      const token = user?.token;
      const res = await fetch(
        `${API_BASE}/admin/tests/import?publishImmediately=${publishImmediately}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify(parsedPayload),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create test in database');
      }

      setCreatedTestResult(data.data);
      setWorkflowStep('success');

      // Notify parent to refresh tests directory & register locally
      if (onTestCreated) {
        onTestCreated({
          ...data.data.test,
          questions: previewData.questions,
        });
      }
    } catch (err) {
      setValidationErrors([err.message]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to import another test
  const handleReset = () => {
    setJsonText('');
    setFileName('');
    setPreviewData(null);
    setCreatedTestResult(null);
    setValidationErrors([]);
    setWorkflowStep('input');
  };

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div
        className={`rounded-3xl border p-5 sm:p-7 shadow-xl space-y-4 transition-colors ${
          isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-[#0B0F19]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500 font-bold">
                <FileCode size={16} />
              </span>
              <h2
                className={`font-sans text-lg sm:text-xl font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Automated Question Paper Import (JSON)
              </h2>
            </div>
            <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Seamlessly import full NEET &amp; JEE question papers converted from PDFs with inline
              vector SVGs &amp; KaTeX equations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download Sample Template */}
            <a
              href="/sample-test-import.json"
              download="sample-test-import.json"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                isLight
                  ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Download size={13} className="text-blue-500" />
              <span>Sample JSON Template</span>
            </a>

            {/* AI Prompt Guide Toggle */}
            <button
              type="button"
              onClick={() => setShowPromptGuide((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                showPromptGuide
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : isLight
                  ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
              }`}
            >
              <Sparkles size={13} />
              <span>AI Conversion Prompt</span>
              {showPromptGuide ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>

        {/* AI PROMPT ACCORDION */}
        {showPromptGuide && (
          <div
            className={`animate-fade-in rounded-2xl border p-4 sm:p-5 text-xs space-y-3 transition-colors ${
              isLight
                ? 'border-blue-200 bg-blue-50/60 text-slate-800'
                : 'border-blue-500/30 bg-blue-950/20 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <HelpCircle size={14} /> ChatGPT / Gemini Conversion Workflow Prompt
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold border transition ${
                  copiedPrompt
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : isLight
                    ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {copiedPrompt ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              Attach your PDF paper to <strong>ChatGPT</strong> or <strong>Gemini</strong> and paste
              this prompt. The AI will extract all questions, format mathematical formulas in LaTeX,
              reconstruct diagrams in clean inline SVG, and output ready-to-import JSON.
            </p>
            <pre
              className={`p-3 rounded-xl overflow-x-auto font-mono text-[11px] max-h-48 border ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#05070B] border-white/10 text-blue-300'
              }`}
            >
              {AI_PROMPT_TEMPLATE}
            </pre>
          </div>
        )}
      </div>

      {/* ERROR BANNER */}
      {validationErrors.length > 0 && (
        <div
          className={`animate-fade-in rounded-2xl border p-4 sm:p-5 text-xs space-y-2 ${
            isLight
              ? 'border-rose-200 bg-rose-50 text-rose-900'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm text-rose-600 dark:text-rose-400">
            <XCircle size={16} /> Validation Issues Detected ({validationErrors.length})
          </div>
          <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* STEP 1: INPUT MODE (Upload or Direct Paste) */}
      {workflowStep === 'input' && (
        <div
          className={`rounded-3xl border p-5 sm:p-7 shadow-xl space-y-5 transition-colors ${
            isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-[#0B0F19]'
          }`}
        >
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 border-b pb-4">
            <button
              type="button"
              onClick={() => setInputMode('upload')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                inputMode === 'upload'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              <UploadCloud size={14} /> Upload JSON File
            </button>
            <button
              type="button"
              onClick={() => setInputMode('paste')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                inputMode === 'paste'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              <FileCode size={14} /> Paste JSON Text
            </button>
          </div>

          {/* Upload Dropzone */}
          {inputMode === 'upload' ? (
            <div className="space-y-4">
              <label
                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
                  isLight
                    ? 'border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20'
                    : 'border-white/10 hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/[0.04]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 mb-3">
                  <UploadCloud size={24} />
                </div>
                <span className="text-sm font-bold">
                  {fileName ? fileName : 'Choose or drop your .json test file here'}
                </span>
                <span className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Accepts JSON files up to 10MB with embedded vector SVG diagrams
                </span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {fileName && (
                <div
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-xs font-medium ${
                    isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
                  }`}
                >
                  <span className="truncate max-w-sm font-mono">{fileName}</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Loaded
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Direct Textarea Paste */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Paste your raw JSON content below:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFormatJson}
                    className="text-blue-500 hover:underline font-bold"
                  >
                    Format / Beautify
                  </button>
                  <span className="text-slate-500">•</span>
                  <button
                    type="button"
                    onClick={() => setJsonText('')}
                    className="text-rose-500 hover:underline font-bold"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                rows={12}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='{\n  "schemaVersion": "1.0",\n  "title": "My Practice Test",\n  "questions": [...]\n}'
                className={`w-full rounded-2xl border p-4 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isLight
                    ? 'border-slate-300 bg-slate-50 text-slate-900'
                    : 'border-white/10 bg-[#070A12] text-slate-200'
                }`}
              />
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={isValidating || !jsonText.trim()}
              onClick={handleValidateAndPreview}
              className={`rounded-full px-6 py-2.5 text-xs font-bold transition flex items-center gap-2 shadow-md ${
                isValidating || !jsonText.trim()
                  ? 'opacity-50 cursor-not-allowed bg-blue-600/50 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
              }`}
            >
              {isValidating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Validating Schema &amp; SVG Diagrams...</span>
                </>
              ) : (
                <>
                  <Eye size={14} />
                  <span>Validate &amp; Preview Test</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PREVIEW MODE */}
      {workflowStep === 'preview' && previewData && (
        <div className="space-y-6 animate-fade-in">
          {/* Preview Navigation & Confirmation Bar */}
          <div
            className={`rounded-3xl border p-5 sm:p-7 shadow-xl space-y-5 transition-colors ${
              isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-[#0B0F19]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <button
                type="button"
                onClick={() => setWorkflowStep('input')}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <ArrowLeft size={13} /> Edit / Re-upload JSON
              </button>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={publishImmediately}
                    onChange={(e) => setPublishImmediately(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Publish Immediately (Available to Candidates)</span>
                </label>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmImport}
                  className={`rounded-full px-6 py-2 text-xs font-extrabold transition flex items-center gap-2 shadow-lg ${
                    isSubmitting
                      ? 'bg-emerald-600/50 text-white cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Creating in MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Confirm &amp; Create Test</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div
                className={`rounded-2xl border p-3 ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase opacity-70">Exam Title</span>
                <p className="mt-1 font-bold text-sm truncate">{previewData.test.title}</p>
              </div>

              <div
                className={`rounded-2xl border p-3 ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase opacity-70">
                  Exam Type &amp; Category
                </span>
                <p className="mt-1 font-bold text-sm text-blue-500">
                  {previewData.test.examType} • {previewData.test.type}
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3 ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase opacity-70">
                  Questions &amp; Marks
                </span>
                <p className="mt-1 font-bold text-sm">
                  {previewData.test.totalQuestions} Qs • {previewData.test.totalMarks} Marks
                </p>
              </div>

              <div
                className={`rounded-2xl border p-3 ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase opacity-70">
                  Duration &amp; Scheme
                </span>
                <p className="mt-1 font-bold text-sm">
                  {previewData.test.durationMinutes}m (+{previewData.test.markingScheme?.correct} / −
                  {Math.abs(previewData.test.markingScheme?.wrong)})
                </p>
              </div>
            </div>

            {/* Inferred or Warning notes */}
            {previewData.warnings?.length > 0 && (
              <div
                className={`rounded-xl border p-3.5 text-xs space-y-1 ${
                  isLight
                    ? 'border-amber-200 bg-amber-50 text-amber-900'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}
              >
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-500" />
                  Notes &amp; Inferred Values ({previewData.warnings.length}):
                </span>
                <ul className="list-disc pl-5 text-[11px] space-y-0.5">
                  {previewData.warnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Question-by-Question Interactive Review */}
          <div className="space-y-4">
            <h3
              className={`font-sans text-base sm:text-lg font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <BookOpen size={18} className="text-blue-500" />
              <span>Question Paper Verification ({previewData.questions.length} Items)</span>
            </h3>

            {previewData.questions.map((q, idx) => (
              <div
                key={q.id || idx}
                className={`rounded-3xl border p-5 sm:p-6 space-y-4 shadow-md transition-colors ${
                  isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#0B0F19]'
                }`}
              >
                {/* Header bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 px-3 py-0.5 font-mono text-xs font-bold">
                      Q#{q.order || idx + 1}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {q.subject} • {q.chapter}
                    </span>
                    <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
                      {q.difficulty}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">
                    +{q.marks} / {q.negativeMarks} Marks
                  </span>
                </div>

                {/* Question Stem with KaTeX */}
                <div className="text-sm sm:text-base font-medium leading-relaxed">
                  <MathRenderer text={q.question} />
                </div>

                {/* Inline SVG Diagram */}
                {q.questionImage?.data && (
                  <SafeSvgRenderer
                    svgData={q.questionImage.data}
                    title={`Diagram for Question #${q.order || idx + 1}`}
                  />
                )}

                {/* Options Grid */}
                <div className="grid gap-2 text-xs sm:grid-cols-2 pt-1">
                  {Object.entries(q.options || {}).map(([key, optText]) => {
                    const isCorrect = key.toUpperCase() === (q.correctAnswer || '').toUpperCase();
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border p-3 transition flex items-start gap-2.5 ${
                          isCorrect
                            ? isLight
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500'
                              : 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500'
                            : isLight
                            ? 'border-slate-200 bg-slate-50 text-slate-700'
                            : 'border-white/10 bg-[#070A12] text-slate-300'
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isLight
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {key}
                        </span>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <MathRenderer text={optText} inline />
                          {isCorrect && (
                            <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400">
                              (Correct Answer)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div
                    className={`rounded-2xl border p-4 text-xs space-y-2 ${
                      isLight
                        ? 'border-blue-200 bg-blue-50/70 text-slate-800'
                        : 'border-blue-500/20 bg-blue-950/20 text-slate-200'
                    }`}
                  >
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      💡 Verified Solution &amp; Concept:
                    </p>
                    <MathRenderer text={q.explanation} />
                    {q.explanationImage?.data && (
                      <SafeSvgRenderer
                        svgData={q.explanationImage.data}
                        title={`Solution Diagram #${q.order || idx + 1}`}
                        maxHeight="max-h-56"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Confirmation Action */}
          <div className="flex justify-end pt-4 pb-8">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmImport}
              className={`rounded-full px-8 py-3 text-sm font-extrabold transition flex items-center gap-2 shadow-xl ${
                isSubmitting
                  ? 'bg-emerald-600/50 text-white cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Creating Test in MongoDB...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Confirm &amp; Create Test Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CREATION SUCCESS */}
      {workflowStep === 'success' && createdTestResult && (
        <div
          className={`animate-rise-in rounded-3xl border p-6 sm:p-10 shadow-2xl text-center space-y-6 max-w-2xl mx-auto transition-colors ${
            isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#0B0F19]'
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 shadow-glow">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <h3
              className={`font-sans text-xl sm:text-2xl font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Question Paper Successfully Created!
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              The test has been published as a platform-wide examination and is immediately available to all candidates in the{' '}
              <strong className="text-blue-500 font-bold">
                {createdTestResult.test?.category === 'jee' ? 'JEE 2027' : 'NEET 2027'}
              </strong>{' '}
              category.
            </p>
          </div>

          {/* Test Specs Summary */}
          <div
            className={`rounded-2xl border p-4 text-xs space-y-2 text-left ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}
          >
            <div className="flex justify-between">
              <span className="text-slate-500">Test Title:</span>
              <strong className="text-slate-900 dark:text-white">
                {createdTestResult.test?.title}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Slug Identifier:</span>
              <code className="text-blue-500 font-bold">{createdTestResult.test?.slug}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Questions Inserted:</span>
              <strong>{createdTestResult.insertedCount} Questions</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Marks:</span>
              <strong>{createdTestResult.test?.totalMarks} Marks</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-2 py-0.5 font-bold uppercase text-[10px]">
                {createdTestResult.test?.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category &amp; Target:</span>
              <span className="rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 px-2 py-0.5 font-bold uppercase text-[10px]">
                {createdTestResult.test?.category === 'jee' ? 'JEE 2027' : 'NEET 2027'} ({createdTestResult.test?.examType || 'CBT'})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Visibility:</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-bold text-[10px]">
                Global Platform Test (All Students)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onLaunchTest && (
              <button
                type="button"
                onClick={() => onLaunchTest(createdTestResult.test?.slug || createdTestResult.test?.id)}
                className="rounded-full bg-blue-600 px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-blue-500 shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <Zap size={14} /> Launch CBT Exam Now
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className={`rounded-full border px-5 py-2.5 text-xs font-bold transition ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Import Another Paper
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
