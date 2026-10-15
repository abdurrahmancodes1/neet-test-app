/**
 * Client-side SVG Sanitizer with Strict Allowlist Defense-in-Depth
 * Uses DOMParser and XMLSerializer to guarantee zero executable code execution.
 */

const ALLOWED_TAGS = new Set([
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

const ALLOWED_ATTRS = new Set([
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
  'preserveaspectratio',
]);

/**
 * Recursively cleans DOM nodes against allowlists.
 */
function cleanNode(node) {
  // If not element, allow text and CDATA, ignore comments and PIs
  if (node.nodeType !== 1) {
    if (node.nodeType === 8) {
      // Remove comments
      node.parentNode?.removeChild(node);
    }
    return;
  }

  const tagName = node.tagName.toLowerCase().split(':').pop();

  // If element is not in allowlist, remove completely
  if (!ALLOWED_TAGS.has(tagName)) {
    node.parentNode?.removeChild(node);
    return;
  }

  // Sanitize attributes
  const attrs = Array.from(node.attributes);
  for (const attr of attrs) {
    const attrName = attr.name.toLowerCase();
    const attrVal = attr.value.trim();

    // Check allowlist
    if (!ALLOWED_ATTRS.has(attrName)) {
      node.removeAttribute(attr.name);
      continue;
    }

    // Strip any event handler
    if (attrName.startsWith('on')) {
      node.removeAttribute(attr.name);
      continue;
    }

    // Strip javascript: / data: / vbscript:
    if (/^(?:javascript|vbscript|data:text\/html)/i.test(attrVal)) {
      node.removeAttribute(attr.name);
      continue;
    }

    // External href check: only local anchor references like "#arrow" allowed
    if ((attrName === 'href' || attrName === 'xlink:href') && !attrVal.startsWith('#')) {
      node.removeAttribute(attr.name);
      continue;
    }

    // Prohibit dynamic CSS in style attribute
    if (attrName === 'style' && /(?:expression|behavior|javascript:|-moz-binding)/i.test(attrVal)) {
      node.removeAttribute(attr.name);
      continue;
    }
  }

  // Recurse children
  const children = Array.from(node.childNodes);
  for (const child of children) {
    cleanNode(child);
  }
}

/**
 * Sanitizes an untrusted SVG string safely in the browser.
 * @param {string} rawSvg
 * @returns {string} Clean SVG markup string
 */
export function sanitizeSvgClient(rawSvg) {
  if (!rawSvg || typeof rawSvg !== 'string') return '';

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, 'image/svg+xml');

    // Check for XML parse errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      console.warn('SVG parse error:', parserError.textContent);
      return '';
    }

    const svgElement = doc.documentElement;
    if (!svgElement || svgElement.tagName.toLowerCase() !== 'svg') {
      return '';
    }

    cleanNode(svgElement);

    // Ensure responsive attributes
    if (!svgElement.getAttribute('viewBox')) {
      const w = svgElement.getAttribute('width');
      const h = svgElement.getAttribute('height');
      if (w && h && !isNaN(parseFloat(w)) && !isNaN(parseFloat(h))) {
        svgElement.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
      } else {
        svgElement.setAttribute('viewBox', '0 0 500 350');
      }
    }

    if (!svgElement.getAttribute('preserveAspectRatio')) {
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgElement);
  } catch (err) {
    console.error('Error during client SVG sanitization:', err);
    return '';
  }
}
