import React, { useMemo } from 'react';
import katex from 'katex';

const chemicalElements = [
  'Ac','Ag','Al','Am','Ar','As','At','Au','B','Ba','Be','Bh','Bi','Bk','Br','C','Ca','Cd','Ce','Cf','Cl','Cm','Cn','Co','Cr','Cs','Cu','Db','Ds','Dy','Er','Es','Eu','F','Fe','Fl','Fm','Fr','Ga','Gd','Ge','H','He','Hf','Hg','Ho','Hs','I','In','Ir','K','Kr','La','Li','Lr','Lu','Lv','Mc','Md','Mg','Mn','Mo','Mt','N','Na','Nb','Nd','Ne','Nh','Ni','No','Np','O','Og','Os','P','Pa','Pb','Pd','Pm','Po','Pr','Pt','Pu','Ra','Rb','Re','Rf','Rg','Rh','Rn','Ru','S','Sb','Sc','Se','Sg','Si','Sm','Sn','Sr','Ta','Tb','Tc','Te','Th','Ti','Tl','Tm','Ts','U','V','W','Xe','Y','Yb','Zn','Zr'
];

const COMMON_WORDS = new Set([
  'IN', 'AS', 'AT', 'BE', 'NO', 'HE', 'IF', 'ON', 'OR', 'SO', 'TO', 'UP', 'US', 'AM', 'AN', 'BY', 'DO', 'GO', 'ME', 'MY', 'WE',
  'ALL', 'FOR', 'NOT', 'CAN', 'HAD', 'HAS', 'HIM', 'HIS', 'HOW', 'MAN', 'NEW', 'NOW', 'OLD', 'SEE', 'TWO', 'WAY', 'WHO', 'BOY',
  'DID', 'ITS', 'LET', 'PUT', 'SAY', 'SHE', 'TOO', 'USE', 'HER', 'CAR', 'CAT', 'DAY', 'GET', 'HOT', 'LOT', 'MAP', 'MEN', 'PAN',
  'RUN', 'SUN', 'TOP', 'WAR', 'WIN', 'YES', 'YET', 'AIR', 'END', 'FAR', 'FEW', 'KEY', 'LAW', 'LOW', 'OFF', 'OIL', 'OUT', 'RAW',
  'RED', 'SEA', 'SET', 'SIX', 'TAX', 'TEA', 'WAR', 'WAY', 'WHICH', 'WITH', 'FROM', 'THIS', 'THAT', 'HAVE', 'WERE', 'WHEN', 'WILL',
  'BECAUSE', 'BETWEEN', 'OPTION', 'OPTIONS', 'QUESTION', 'QUESTIONS', 'CHAPTER', 'SECTION', 'ANSWER', 'STATEMENT', 'STATEMENTS',
  'ACCORDING', 'FOLLOWING', 'CORRECT', 'INCORRECT', 'ENERGY', 'FORCE', 'POWER', 'MASS', 'TIME', 'SPEED', 'VELOCITY', 'PRESSURE',
  'VOLUME', 'TEMPERATURE', 'NUMBER', 'MOLE', 'MOLES', 'REACTION', 'BOND', 'BONDS', 'STRUCTURE', 'PERIODIC', 'TABLE', 'SERIES'
]);

const sortedElements = [...chemicalElements].sort((a, b) => b.length - a.length);
const elemPattern = sortedElements.join('|');

// Matches chemical formulas outside math
const formulaRegex = new RegExp(
  `\\b((?:(?:${elemPattern})\\d*|\\([A-Za-z0-9]+\\)\\d*|\\[[A-Za-z0-9]+\\]\\d*)+)(\\^\\{[0-9]*[+-]?\\}|\\^[0-9]*[+-]?|\\d+[+-]|[+-])?(?=[\\s,;:?!\\)\\]\\.]|$)`,
  'g'
);

function convertToken(match, body, charge) {
  if (COMMON_WORDS.has(match.toUpperCase())) return match;
  if (/^\d+$/.test(match)) return match;

  const hasDigit = /\d/.test(body);
  const hasParen = /[()\[\]]/.test(body);
  const hasCharge = Boolean(charge);
  const knownSmallCompounds = ['NACL', 'HCL', 'HBR', 'HI', 'HF', 'NAOH', 'KOH', 'CO', 'NO', 'CAO', 'MGO', 'CUO', 'FEO'];
  const isKnownSmall = knownSmallCompounds.includes(body.toUpperCase());

  let elementCount = 0;
  let remaining = body.replace(/[\d()\[\]]/g, '');
  while (remaining.length > 0) {
    let matched = false;
    for (const elem of sortedElements) {
      if (remaining.startsWith(elem)) {
        elementCount++;
        remaining = remaining.slice(elem.length);
        matched = true;
        break;
      }
    }
    if (!matched) break;
  }

  const isChemical =
    hasDigit ||
    hasParen ||
    hasCharge ||
    isKnownSmall ||
    (elementCount >= 2 && !COMMON_WORDS.has(match.toUpperCase()));

  if (!isChemical) return match;

  let formattedBody = body.replace(/([A-Za-z\)\]])(\d+)/g, '$1_{$2}');

  let formattedCharge = '';
  if (charge) {
    if (charge.startsWith('^{') && charge.endsWith('}')) {
      formattedCharge = charge;
    } else if (charge.startsWith('^')) {
      formattedCharge = `^{${charge.slice(1)}}`;
    } else {
      formattedCharge = `^{${charge}}`;
    }
  }

  return `$\\mathrm{${formattedBody}${formattedCharge}}$`;
}

export function preprocessFormulas(text) {
  if (!text || typeof text !== 'string') return text;

  // Split into math vs plain text
  const mathRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([^\)]+?\\\))/g;
  const parts = text.split(mathRegex);

  return parts
    .map((part, i) => {
      // Inside existing math
      if (i % 2 === 1) {
        return part.replace(/\\ce\{([^}]+)\}/g, (m, f) => {
          const body = f.replace(/([A-Za-z\)\]])(\d+)/g, '$1_{$2}');
          return `\\mathrm{${body}}`;
        });
      }

      // Plain text: convert explicit \ce{...} first
      let processed = part.replace(/\\ce\{([^}]+)\}/g, (m, f) => {
        const body = f.replace(/([A-Za-z\)\]])(\d+)/g, '$1_{$2}');
        return `$\\mathrm{${body}}$`;
      });

      // Convert implicit chemical tokens (e.g. H2S, NF3, CHCl3, O2^{2-})
      processed = processed.replace(formulaRegex, convertToken);
      return processed;
    })
    .join('');
}

const KATEX_OPTIONS = {
  throwOnError: false,
  strict: false,
  macros: {
    '\\ce': '\\mathrm{#1}',
  },
};

/**
 * MathRenderer Component
 * Renders standard text with KaTeX formulas ($...$ for inline, $$...$$ or \[...\] for block)
 * Automatically renders chemical formulas (H2S, NF3, CHCl3, O2^{2-}) with subscript/superscript formatting.
 */
export default function MathRenderer({ text = '', className = '', inline = false }) {
  const elements = useMemo(() => {
    if (!text || typeof text !== 'string') return null;

    const preprocessed = preprocessFormulas(text);

    // Matches $$...$$, \[...\], $...$, or \(...\)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([^\)]+?\\\))/g;
    const segments = preprocessed.split(regex);

    return segments.map((segment, idx) => {
      if (!segment) return null;

      // Display/Block math $$...$$ or \[...\]
      if (
        (segment.startsWith('$$') && segment.endsWith('$$')) ||
        (segment.startsWith('\\[') && segment.endsWith('\\]'))
      ) {
        const formula = segment.slice(2, -2);
        try {
          const html = katex.renderToString(formula.trim(), {
            ...KATEX_OPTIONS,
            displayMode: true,
          });
          return (
            <span
              key={idx}
              className="my-3 block overflow-x-auto text-center font-normal"
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
        const formula = segment.slice(1, -1);
        try {
          const html = katex.renderToString(formula.trim(), {
            ...KATEX_OPTIONS,
            displayMode: false,
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

