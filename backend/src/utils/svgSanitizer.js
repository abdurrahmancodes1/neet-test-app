import { AppError } from './AppError.js';

// Strict Allowlist of permitted SVG elements
const ALLOWED_ELEMENTS = new Set([
  'svg',
  'g',
  'path',
  'line',
  'rect',
  'circle',
  'ellipse',
  'polyline',
  'polygon',
  'text',
  'tspan',
  'defs',
  'marker',
  'pattern',
  'lineargradient',
  'radialgradient',
  'stop',
  'style',
  'use',
  'clippath',
  'mask',
  'title',
  'desc',
]);

// Strict Allowlist of permitted SVG presentation and geometry attributes
const ALLOWED_ATTRIBUTES = new Set([
  'viewbox',
  'width',
  'height',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'd',
  'points',
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-opacity',
  'opacity',
  'font-size',
  'font-family',
  'font-weight',
  'font-style',
  'text-anchor',
  'dominant-baseline',
  'transform',
  'transform-origin',
  'id',
  'marker-start',
  'marker-mid',
  'marker-end',
  'stop-color',
  'stop-opacity',
  'offset',
  'style',
  'class',
  'xmlns',
  'xmlns:xlink',
  'dx',
  'dy',
  'clip-path',
  'mask',
  'patternunits',
  'gradientunits',
  'href',
  'xlink:href',
]);

// Forbidden tags that immediately disqualify the SVG
const FORBIDDEN_TAGS_REGEX = /<\s*(script|foreignobject|iframe|object|embed|applet|meta|link|base|form|input|button|textarea|audio|video)/i;

// Forbidden attributes: event handlers (onload, onclick, etc.) preceded by space or opening tag
const FORBIDDEN_EVENTS_REGEX = /(?:[\s<])on[a-zA-Z]+\s*=/i;

// Forbidden protocols or data URIs
const FORBIDDEN_PROTOCOLS_REGEX = /(javascript|vbscript|data:text\/html|data:application\/javascript)/i;

// Maximum allowed SVG size (250 KB)
const MAX_SVG_SIZE_BYTES = 250 * 1024;

/**
 * Validates and sanitizes inline SVG markup.
 * @param {string} rawSvg - SVG markup string
 * @param {string} contextName - Identifier for error reporting (e.g. "Question 1 diagram")
 * @returns {{ sanitizedSvg: string, warnings: string[] }}
 */
export function sanitizeSvg(rawSvg, contextName = 'Diagram') {
  if (!rawSvg || typeof rawSvg !== 'string') {
    throw new AppError(`${contextName}: SVG data must be a non-empty string`, 400);
  }

  const trimmed = rawSvg.trim();

  // 1. Size constraint
  if (Buffer.byteLength(trimmed, 'utf8') > MAX_SVG_SIZE_BYTES) {
    throw new AppError(
      `${contextName}: SVG diagram exceeds maximum allowed size of 250KB`,
      400
    );
  }

  // 2. Must start and end with SVG root tag
  if (!trimmed.toLowerCase().includes('<svg') || !trimmed.toLowerCase().includes('</svg>')) {
    throw new AppError(
      `${contextName}: Malformed SVG - missing required <svg> or </svg> tags`,
      400
    );
  }

  // 3. Security checks for forbidden tags
  if (FORBIDDEN_TAGS_REGEX.test(trimmed)) {
    throw new AppError(
      `${contextName}: Security violation - SVG contains forbidden executable tags (<script>, <foreignObject>, <iframe>, etc.)`,
      400
    );
  }

  // 4. Security checks for event handlers (onload, onerror, etc.)
  if (FORBIDDEN_EVENTS_REGEX.test(trimmed)) {
    throw new AppError(
      `${contextName}: Security violation - SVG contains prohibited event handler attributes (onload, onerror, etc.)`,
      400
    );
  }

  // 5. Security checks for malicious protocols
  if (FORBIDDEN_PROTOCOLS_REGEX.test(trimmed)) {
    throw new AppError(
      `${contextName}: Security violation - SVG contains unsafe pseudo-protocols (javascript:, vbscript:)`,
      400
    );
  }

  // 6. Security checks for external URLs in href / xlink:href
  // Only internal ID anchors like "#myGradient" are permitted
  const hrefMatches = trimmed.matchAll(/(?:href|xlink:href)\s*=\s*["']([^"']+)["']/gi);
  for (const match of hrefMatches) {
    const target = match[1]?.trim() || '';
    if (target && !target.startsWith('#')) {
      throw new AppError(
        `${contextName}: External or absolute hyperlinks (${target}) are not allowed in diagram SVGs`,
        400
      );
    }
  }

  // 7. Security checks for CSS expressions or url(...) in style
  if (/expression\s*\(|behavior\s*:|-moz-binding/i.test(trimmed)) {
    throw new AppError(
      `${contextName}: Prohibited dynamic styles or expressions detected in SVG`,
      400
    );
  }

  // 8. Enforce / synthesize responsive viewBox
  let sanitized = trimmed;
  const warnings = [];

  const svgOpenTagMatch = sanitized.match(/<svg\b([^>]*)>/i);
  if (!svgOpenTagMatch) {
    throw new AppError(`${contextName}: Unable to parse root <svg> tag attributes`, 400);
  }

  const rootAttributes = svgOpenTagMatch[1] || '';
  const hasViewBox = /viewBox\s*=/i.test(rootAttributes);

  if (!hasViewBox) {
    // Attempt to synthesize from width and height
    const widthMatch = rootAttributes.match(/width\s*=\s*["']?(\d+(?:\.\d+)?)/i);
    const heightMatch = rootAttributes.match(/height\s*=\s*["']?(\d+(?:\.\d+)?)/i);

    if (widthMatch && heightMatch) {
      const w = parseFloat(widthMatch[1]);
      const h = parseFloat(heightMatch[1]);
      if (w > 0 && h > 0) {
        // Inject synthesized viewBox into root tag
        sanitized = sanitized.replace(
          /<svg\b/i,
          `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" `
        );
        warnings.push(`Synthesized missing viewBox="0 0 ${w} ${h}" from dimensions.`);
      }
    } else {
      // Default fallback viewBox for standard test illustrations
      sanitized = sanitized.replace(
        /<svg\b/i,
        `<svg viewBox="0 0 500 350" preserveAspectRatio="xMidYMid meet" `
      );
      warnings.push(`Added default viewBox="0 0 500 350" for responsive scaling.`);
    }
  } else if (!/preserveAspectRatio\s*=/i.test(rootAttributes)) {
    sanitized = sanitized.replace(
      /<svg\b/i,
      `<svg preserveAspectRatio="xMidYMid meet" `
    );
  }

  // 9. Ensure standard xmlns namespace
  if (!/xmlns\s*=/i.test(sanitized)) {
    sanitized = sanitized.replace(
      /<svg\b/i,
      `<svg xmlns="http://www.w3.org/2000/svg" `
    );
  }

  return {
    sanitizedSvg: sanitized,
    warnings,
  };
}
