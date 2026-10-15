import React, { useMemo, useState } from 'react';
import { sanitizeSvgClient } from '../utils/sanitizeSvg.js';
import { ImageIcon, ZoomIn, ZoomOut, AlertTriangle } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

/**
 * SafeSvgRenderer
 * Safely renders untrusted inline SVG vector diagrams with client-side sanitization,
 * responsive scaling, aspect ratio preservation, and dark/light mode compatibility.
 */
export default function SafeSvgRenderer({
  svgData,
  title = 'Reference Diagram',
  caption = null,
  className = '',
  maxHeight = 'max-h-72',
}) {
  const { isLight } = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);

  const cleanSvg = useMemo(() => {
    if (!svgData || typeof svgData !== 'string') return null;
    return sanitizeSvgClient(svgData);
  }, [svgData]);

  if (!cleanSvg) {
    return (
      <div
        className={`my-4 flex items-center gap-2 rounded-xl border p-4 text-xs font-semibold ${
          isLight
            ? 'border-amber-200 bg-amber-50 text-amber-800'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
        }`}
      >
        <AlertTriangle size={16} className="shrink-0 text-amber-500" />
        <span>Diagram could not be rendered safely. Please check SVG markup.</span>
      </div>
    );
  }

  return (
    <div className={`my-5 flex flex-col items-center w-full ${className}`}>
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-2xl border transition-all duration-200 shadow-md ${
          isLight
            ? 'border-slate-200 bg-white ring-1 ring-slate-100'
            : 'border-white/10 bg-[#070A12]'
        }`}
      >
        {/* Diagram Header / Toolbar */}
        <div
          className={`flex items-center justify-between border-b px-4 py-2.5 text-xs font-semibold ${
            isLight
              ? 'border-slate-200 bg-slate-50 text-slate-700'
              : 'border-white/10 bg-white/5 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <ImageIcon size={12} />
            </span>
            <span className="font-bold">{title}</span>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-300 border border-blue-500/20">
              SVG
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            title={isZoomed ? 'Reset zoom' : 'Enlarge diagram'}
            className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition ${
              isLight
                ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {isZoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
            <span>{isZoomed ? 'Standard' : 'Enlarge'}</span>
          </button>
        </div>

        {/* SVG Canvas Container */}
        <div
          className={`flex justify-center items-center p-3 sm:p-5 overflow-x-auto transition-all ${
            isLight ? 'bg-slate-50/70' : 'bg-slate-950/40'
          }`}
        >
          <div
            className={`flex items-center justify-center w-full transition-all duration-300 [&>svg]:w-full [&>svg]:h-auto [&>svg]:mx-auto ${
              isZoomed ? 'max-w-2xl max-h-[500px]' : `max-w-lg ${maxHeight}`
            }`}
            dangerouslySetInnerHTML={{ __html: cleanSvg }}
          />
        </div>

        {/* Optional Caption */}
        {caption && (
          <div
            className={`border-t px-4 py-2 text-[11px] font-medium text-center ${
              isLight
                ? 'border-slate-200 bg-slate-50 text-slate-500'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
