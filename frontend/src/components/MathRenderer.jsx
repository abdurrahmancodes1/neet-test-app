import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * MathRenderer Component
 * Renders standard text with LaTeX formulas ($...$ for inline, $$...$$ or \[...\] for block)
 * Formats mathematical equations to match official JEE/NEET paper standards.
 */
export default function MathRenderer({ text = '', className = '', inline = false }) {
  const elements = useMemo(() => {
    if (!text || typeof text !== 'string') return null;

    // Matches $$...$$, \[...\], $...$, or \(...\)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([^\)]+?\\\))/g;
    const segments = text.split(regex);

    return segments.map((segment, idx) => {
      if (!segment) return null;

      // Display/Block math $$...$$ or \[...\]
      if (
        (segment.startsWith('$$') && segment.endsWith('$$')) ||
        (segment.startsWith('\\[') && segment.endsWith('\\]'))
      ) {
        const formula = segment.startsWith('$$') ? segment.slice(2, -2) : segment.slice(2, -2);
        try {
          const html = katex.renderToString(formula.trim(), {
            displayMode: true,
            throwOnError: false,
          });
          return (
            <span
              key={idx}
              className="my-3 block overflow-x-auto text-center font-normal text-slate-100"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <span key={idx}>{segment}</span>;
        }
      }

      // Inline math $...$ or \(...\)
      if (
        (segment.startsWith('$') && segment.endsWith('$')) ||
        (segment.startsWith('\\(') && segment.endsWith('\\)'))
      ) {
        const formula = segment.startsWith('$') ? segment.slice(1, -1) : segment.slice(2, -2);
        try {
          const html = katex.renderToString(formula.trim(), {
            displayMode: false,
            throwOnError: false,
          });
          return (
            <span
              key={idx}
              className="inline-block font-normal align-middle px-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (e) {
          return <span key={idx}>{segment}</span>;
        }
      }

      // Normal text with newlines
      return (
        <span key={idx} className="whitespace-pre-line">
          {segment}
        </span>
      );
    });
  }, [text]);

  const Tag = inline ? 'span' : 'div';
  return <Tag className={className}>{elements}</Tag>;
}
