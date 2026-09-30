/**
 * NEET 2027 Comprehensive Mock Test: Definite & Indefinite Integration
 * 60 High-Yield Hard Calculus Questions formatted with KaTeX LaTeX for pristine CBT typesetting
 * Duration: 144 Minutes (2 Hours 24 Minutes - JEE standard: 2.4 min/Q) | Marking: +4 / -1 / 0
 */

export const NEET_CALCULUS_TEST = {
  "id": "neet-definite-indefinite-calculus",
  "title": "NEET 2027: Definite & Indefinite Integration (Calculus Mastery Drill)",
  "subtitle": "60 Hardest JEE-Standard Calculus Questions · 144 Minutes Timed CBT (2.4 min/Q JEE Standard)",
  "subject": "Mathematics & Physics Calculus Foundation (Class 12)",
  "durationMinutes": 144,
  "totalQuestions": 60,
  "totalMarks": 240,
  "marksCorrect": 4,
  "marksWrong": -1,
  "syllabus": "Indefinite Integration (Substitution, By Parts, Partial Fractions, Radical Inversion), Definite Integration (King's Property, Leibniz Rule, Reduction Formulae, Periodic Functions, Greatest Integer [x] & Fractional Part {x}, Bounded Integrals)"
};

export const NEET_CALCULUS_QUESTIONS = [
  {
    "id": 1,
    "number": 1,
    "text": "Let $\\alpha \\in (0, 1)$ and $\\beta = \\log_e(1 - \\alpha)$. Let $P_n(x) = x + \\frac{x^2}{2} + \\frac{x^3}{3} + \\dots + \\frac{x^n}{n}$ for $x \\in (0, 1)$.\n\nThen the integral $\\int_0^\\alpha \\frac{t^{50}}{1 - t} \\, dt$ is equal to:",
    "options": {
      "A": "$\\beta - P_{50}(\\alpha)$",
      "B": "$-(\\beta + P_{50}(\\alpha))$",
      "C": "$P_{50}(\\alpha) - \\beta$",
      "D": "$\\beta + P_{50}(\\alpha)$"
    },
    "correctAnswer": "B",
    "explanation": "Rewrite $\\frac{t^{50}}{1 - t} = -\\frac{1 - t^{50} - 1}{1 - t} = -(1 + t + t^2 + \\dots + t^{49}) + \\frac{1}{1 - t}$.\n\nIntegrating from $0$ to $\\alpha$:\n$$\\int_0^\\alpha \\left[ -(1 + t + \\dots + t^{49}) + \\frac{1}{1 - t} \\right] dt = -\\left[ t + \\frac{t^2}{2} + \\dots + \\frac{t^{50}}{50} \\right]_0^\\alpha - [\\ln(1 - t)]_0^\\alpha$$\n$$= -P_{50}(\\alpha) - \\ln(1 - \\alpha) = -P_{50}(\\alpha) - \\beta = -(\\beta + P_{50}(\\alpha)).$$",
    "topic": "Definite Integration - Algebraic Manipulation & Series",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 2,
    "number": 2,
    "text": "The value of the definite integral $\\int_{\\frac{3\\sqrt{2}}{4}}^{\\frac{3\\sqrt{3}}{4}} \\frac{48}{\\sqrt{9 - 4x^2}} \\, dx$ is equal to:",
    "options": {
      "A": "$\\frac{\\pi}{3}$",
      "B": "$\\frac{\\pi}{2}$",
      "C": "$\\frac{\\pi}{6}$",
      "D": "$2\\pi$"
    },
    "correctAnswer": "D",
    "explanation": "Standard form: $\\int \\frac{48}{\\sqrt{9 - 4x^2}} \\, dx = 48 \\cdot \\frac{1}{2} \\sin^{-1}\\left(\\frac{2x}{3}\\right) = 24\\sin^{-1}\\left(\\frac{2x}{3}\\right)$.\n\n- At upper limit $x = \\frac{3\\sqrt{3}}{4}$: $24\\sin^{-1}\\left(\\frac{\\sqrt{3}}{2}\\right) = 24\\left(\\frac{\\pi}{3}\\right) = 8\\pi$.\n- At lower limit $x = \\frac{3\\sqrt{2}}{4}$: $24\\sin^{-1}\\left(\\frac{1}{\\sqrt{2}}\\right) = 24\\left(\\frac{\\pi}{4}\\right) = 6\\pi$.\n\nDifference $= 8\\pi - 6\\pi = 2\\pi$.",
    "topic": "Definite Integration - Standard Inverse Trigonometric Forms",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 3,
    "number": 3,
    "text": "The value of the integral $\\int_{\\pi/3}^{\\pi/2} \\frac{2 + 3\\sin x}{\\sin x (1 + \\cos x)} \\, dx$ is equal to:",
    "options": {
      "A": "$\\frac{7}{2}\\sqrt{3} - \\log_e \\sqrt{3}$",
      "B": "$-2 + \\sqrt{3} + \\log_e \\sqrt{3}$",
      "C": "$\\frac{10}{3} - \\sqrt{3} + \\log_e \\sqrt{3}$",
      "D": "$\\frac{10}{3} - \\sqrt{3} - \\log_e \\sqrt{3}$"
    },
    "correctAnswer": "C",
    "explanation": "Separate into $I = 2\\int_{\\pi/3}^{\\pi/2} \\frac{dx}{\\sin x (1 + \\cos x)} + 3\\int_{\\pi/3}^{\\pi/2} \\frac{dx}{1 + \\cos x} = 2I_2 + 3I_1$.\n\n- $I_1 = \\int_{\\pi/3}^{\\pi/2} \\frac{1}{2}\\sec^2(x/2) \\, dx = [\\tan(x/2)]_{\\pi/3}^{\\pi/2} = 1 - \\frac{1}{\\sqrt{3}}$.\n- $I_2 = \\int_{\\pi/3}^{\\pi/2} \\frac{dx}{\\sin x(1+\\cos x)} = \\frac{1}{6} + \\frac{1}{2}\\ln 3$.\n\nCombining: $I = 2\\left(\\frac{1}{6} + \\frac{1}{2}\\ln 3\\right) + 3\\left(1 - \\frac{1}{\\sqrt{3}}\\right) = \\frac{10}{3} - \\sqrt{3} + \\log_e \\sqrt{3}$.",
    "topic": "Definite Integration - Trigonometric Rationalization",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 4,
    "number": 4,
    "text": "Let $\\alpha > 0$. If $\\int_0^\\alpha \\frac{x}{\\sqrt{x + \\alpha} - \\sqrt{x}} \\, dx = \\frac{16 + 20\\sqrt{2}}{15}$, then $\\alpha$ is equal to:",
    "options": {
      "A": "$2$",
      "B": "$4$",
      "C": "$\\sqrt{2}$",
      "D": "$2\\sqrt{2}$"
    },
    "correctAnswer": "A",
    "explanation": "Rationalize the denominator:\n$$\\frac{1}{\\alpha} \\int_0^\\alpha \\left[x\\sqrt{x + \\alpha} + x^{3/2}\\right] dx = \\alpha^{3/2} \\left[\\frac{4\\sqrt{2} + 10}{15}\\right]$$\nEquating to $\\frac{16 + 20\\sqrt{2}}{15} = 2\\sqrt{2}\\left[\\frac{10 + 4\\sqrt{2}}{15}\\right]$ implies $\\alpha^{3/2} = 2\\sqrt{2} = 2^{3/2} \\implies \\alpha = 2$.",
    "topic": "Definite Integration - Algebraic Rationalization",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 5,
    "number": 5,
    "text": "Let $f(x) = 2 + |x| - |x - 1| + |x + 1|, \\, x \\in \\mathbb{R}$. Consider the statements:\n\n$(S_1): f'\\left(-\\frac{3}{2}\\right) + f'\\left(-\\frac{1}{2}\\right) + f'\\left(\\frac{1}{2}\\right) + f'\\left(\\frac{3}{2}\\right) = 2$\n$(S_2): \\int_{-2}^2 f(x) \\, dx = 12$\n\nThen:",
    "options": {
      "A": "Both $(S_1)$ and $(S_2)$ are correct",
      "B": "Both $(S_1)$ and $(S_2)$ are wrong",
      "C": "Only $(S_1)$ is correct",
      "D": "Only $(S_2)$ is correct"
    },
    "correctAnswer": "D",
    "explanation": "Piecewise breakdown:\n- $x < -1$: $f(x) = -x \\implies f'(-3/2) = -1$\n- $-1 < x < 0$: $f(x) = x + 2 \\implies f'(-1/2) = 1$\n- $0 < x < 1$: $f(x) = 3x + 2 \\implies f'(1/2) = 3$\n- $1 < x < 2$: $f(x) = x + 4 \\implies f'(3/2) = 1$\n\nSum of derivatives $= -1 + 1 + 3 + 1 = 4 \\ne 2$ ($S_1$ is false).\n\nIntegral $\\int_{-2}^2 f(x) \\, dx = \\int_{-2}^{-1}(-x)dx + \\int_{-1}^0(x+2)dx + \\int_0^1(3x+2)dx + \\int_1^2(x+4)dx = \\frac{3}{2} + \\frac{3}{2} + \\frac{7}{2} + \\frac{11}{2} = 12$ ($S_2$ is true).",
    "topic": "Definite Integration - Piecewise Functions & Modulus",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 6,
    "number": 6,
    "text": "Let $f$ be a differentiable function $\\mathbb{R} \\to \\mathbb{R}$ such that $|f(x) - f(y)| \\le 2|x - y|^{3/2}$ for all $x, y \\in \\mathbb{R}$. If $f(0) = 1$, then $\\int_0^1 f^2(x) \\, dx$ is equal to:",
    "options": {
      "A": "$0$",
      "B": "$\\frac{1}{2}$",
      "C": "$2$",
      "D": "$1$"
    },
    "correctAnswer": "D",
    "explanation": "Dividing by $|x - y|$:\n$$\\left| \\frac{f(x) - f(y)}{x - y} \\right| \\le 2|x - y|^{1/2}$$\nTaking the limit as $x \\to y$ gives $|f'(y)| \\le 0 \\implies f'(y) = 0$ for all $y \\in \\mathbb{R}$.\n\nHence $f(x)$ is a constant function. Since $f(0) = 1$, $f(x) = 1$ for all $x$.\n$$\\int_0^1 f^2(x) \\, dx = \\int_0^1 1 \\, dx = 1.$$",
    "topic": "Definite Integration - Differentiability & Mean Value",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 7,
    "number": 7,
    "text": "The value of the definite integral $\\int_{-\\log_e 2}^{\\log_e 2} e^x \\left[\\log_e\\left(e^x + \\sqrt{1 + e^{2x}}\\right)\\right] \\, dx$ is equal to:",
    "options": {
      "A": "$\\log_e\\left(\\frac{2(2 + \\sqrt{5})}{\\sqrt{1 + \\sqrt{5}}}\\right) - \\frac{\\sqrt{5}}{2}$",
      "B": "$\\log_e\\left(\\frac{\\sqrt{2}(3 - \\sqrt{5})^2}{\\sqrt{1 + \\sqrt{5}}}\\right) + \\frac{\\sqrt{5}}{2}$",
      "C": "$\\log_e\\left(\\frac{(2 + \\sqrt{5})^2}{\\sqrt{1 + \\sqrt{5}}}\\right) + \\frac{\\sqrt{5}}{2}$",
      "D": "$\\log_e\\left(\\frac{\\sqrt{2}(2 + \\sqrt{5})^2}{\\sqrt{1 + \\sqrt{5}}}\\right) - \\frac{\\sqrt{5}}{2}$"
    },
    "correctAnswer": "D",
    "explanation": "Substitute $e^x = u \\implies e^x dx = du$ with limits $u \\in [1/2, 2]$:\n$$I = \\int_{1/2}^2 \\ln\\left(u + \\sqrt{1 + u^2}\\right) du$$\nIntegrating by parts:\n$$= \\left[ u \\ln\\left(u + \\sqrt{1 + u^2}\\right) \\right]_{1/2}^2 - \\int_{1/2}^2 \\frac{u}{\\sqrt{1 + u^2}} du$$\n$$= 2\\ln(2 + \\sqrt{5}) - \\frac{1}{2}\\ln\\left(\\frac{1 + \\sqrt{5}}{2}\\right) - \\left[\\sqrt{1 + u^2}\\right]_{1/2}^2 = \\log_e\\left(\\frac{\\sqrt{2}(2 + \\sqrt{5})^2}{\\sqrt{1 + \\sqrt{5}}}\\right) - \\frac{\\sqrt{5}}{2}.$$",
    "topic": "Definite Integration - Integration by Parts & Logarithmic",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 8,
    "number": 8,
    "text": "Let $f: [0, 2] \\to \\mathbb{R}$ be defined as:\n$$f(x) = \\begin{cases} e^{\\min\\{x^2, x - [x]\\}}, & x \\in [0, 1) \\\\ e^{[x - \\log_e x]}, & x \\in [1, 2] \\end{cases}$$\nwhere $[t]$ denotes the greatest integer $\\le t$. Then the value of $\\int_0^2 x f(x) \\, dx$ is:",
    "options": {
      "A": "$2e - 1$",
      "B": "$1 + \\frac{3e}{2}$",
      "C": "$2e - \\frac{1}{2}$",
      "D": "$(e - 1)\\left(e^2 + \\frac{1}{2}\\right)$"
    },
    "correctAnswer": "C",
    "explanation": "- On $[0, 1)$: $x - [x] = x$. Since $x^2 \\le x$ on $[0, 1)$, $\\min\\{x^2, x\\} = x^2 \\implies f(x) = e^{x^2}$.\n- On $[1, 2]$: let $g(x) = x - \\ln x$. Since $g'(x) = 1 - 1/x \\ge 0$, range is $[1, 2 - \\ln 2] \\subset [1, 1.307) \\implies [x - \\ln x] = 1 \\implies f(x) = e^1 = e$.\n\n$$\\int_0^2 x f(x) \\, dx = \\int_0^1 x e^{x^2} dx + \\int_1^2 e x \\, dx = \\frac{1}{2}(e - 1) + \\frac{e}{2}(4 - 1) = 2e - \\frac{1}{2}.$$",
    "topic": "Definite Integration - Greatest Integer & Floor Functions",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 9,
    "number": 9,
    "text": "The value of the definite integral $\\int_{1/2}^2 \\frac{\\tan^{-1} x}{x} \\, dx$ is equal to:",
    "options": {
      "A": "$\\pi \\log_e 2$",
      "B": "$\\frac{1}{2} \\log_e 2$",
      "C": "$\\frac{\\pi}{4} \\log_e 2$",
      "D": "$\\frac{\\pi}{2} \\log_e 2$"
    },
    "correctAnswer": "D",
    "explanation": "Substitute $x = 1/t \\implies dx = -dt/t^2$. Limits invert to $[2, 1/2]$:\n$$I = \\int_{1/2}^2 \\frac{\\cot^{-1} x}{x} \\, dx$$\nAdding both forms:\n$$2I = \\int_{1/2}^2 \\frac{\\tan^{-1} x + \\cot^{-1} x}{x} \\, dx = \\frac{\\pi}{2} \\int_{1/2}^2 \\frac{dx}{x} = \\frac{\\pi}{2}[\\ln 2 - \\ln(1/2)] = \\pi \\ln 2 \\implies I = \\frac{\\pi}{2} \\log_e 2.$$",
    "topic": "Definite Integration - Inversion Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 10,
    "number": 10,
    "text": "The value of the quotient:\n$$\\frac{e^{-\\pi/4} + \\int_0^{\\pi/4} e^{-x} \\tan^{50} x \\, dx}{\\int_0^{\\pi/4} e^{-x} (\\tan^{49} x + \\tan^{51} x) \\, dx}$$\nis equal to:",
    "options": {
      "A": "$50$",
      "B": "$49$",
      "C": "$51$",
      "D": "$25$"
    },
    "correctAnswer": "A",
    "explanation": "Integrate $\\int_0^{\\pi/4} e^{-x} \\tan^{50} x \\, dx$ by parts:\n$$= [-e^{-x}\\tan^{50} x]_0^{\\pi/4} + 50\\int_0^{\\pi/4} e^{-x}\\tan^{49} x \\sec^2 x \\, dx$$\n$$= -e^{-\\pi/4} + 50\\int_0^{\\pi/4} e^{-x}(\\tan^{49} x + \\tan^{51} x) \\, dx$$\n$$\\implies e^{-\\pi/4} + \\int_0^{\\pi/4} e^{-x} \\tan^{50} x \\, dx = 50\\int_0^{\\pi/4} e^{-x}(\\tan^{49} x + \\tan^{51} x) \\, dx.$$\nHence the ratio is exactly $50$.",
    "topic": "Definite Integration - Reduction Formula & Integration by Parts",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 11,
    "number": 11,
    "text": "If $b_n = \\int_0^{\\pi/2} \\frac{\\cos^2(nx)}{\\sin x} \\, dx, \\, n \\in \\mathbb{N}$, then which of the following statements is true?",
    "options": {
      "A": "$b_3 - b_2, b_4 - b_3, b_5 - b_4$ are in an A.P. with common difference $-2$",
      "B": "$\\frac{1}{b_3 - b_2}, \\frac{1}{b_4 + b_3}, \\frac{1}{b_5 - b_4}$ are in an A.P. with common difference $-2$",
      "C": "$b_3 - b_2, b_4 - b_3, b_5 - b_4$ are in a G.P.",
      "D": "$\\frac{1}{b_3 - b_2}, \\frac{1}{b_4 - b_3}, \\frac{1}{b_5 - b_4}$ are in an A.P. with common difference $-2$"
    },
    "correctAnswer": "D",
    "explanation": "$$b_n - b_{n-1} = \\int_0^{\\pi/2} \\frac{\\cos(2nx) - \\cos(2(n-1)x)}{2\\sin x} \\, dx = -\\int_0^{\\pi/2} \\sin((2n-1)x) \\, dx = -\\frac{1}{2n-1}$$\n$$\\implies \\frac{1}{b_n - b_{n-1}} = -(2n - 1)$$\nFor $n = 3, 4, 5$, the values are $-5, -7, -9$, which form an A.P. with common difference $d = -2$.",
    "topic": "Definite Integration - Reduction Relations & Sequences",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 12,
    "number": 12,
    "text": "The value of the definite integral $\\int_{-\\pi/2}^{\\pi/2} \\frac{dx}{(1 + e^x)(\\sin^6 x + \\cos^6 x)}$ is equal to:",
    "options": {
      "A": "$2\\pi$",
      "B": "$0$",
      "C": "$\\pi$",
      "D": "$\\frac{\\pi}{2}$"
    },
    "correctAnswer": "C",
    "explanation": "Using King's Property ($x \\to -x$):\n$$I = \\int_{-\\pi/2}^{\\pi/2} \\frac{e^x dx}{(1 + e^x)(\\sin^6 x + \\cos^6 x)}$$\nAdding both:\n$$2I = \\int_{-\\pi/2}^{\\pi/2} \\frac{dx}{\\sin^6 x + \\cos^6 x} = 2\\int_0^{\\pi/2} \\frac{dx}{\\sin^6 x + \\cos^6 x} = 2\\pi \\implies I = \\pi.$$",
    "topic": "Definite Integration - King's Property ($f(a+b-x)$)",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 13,
    "number": 13,
    "text": "Let $f$ be a real-valued continuous function on $[0, 1]$ satisfying $f(x) = x + \\int_0^1 (x - t) f(t) \\, dt$. Which of the following points $(x, y)$ lies on the curve $y = f(x)$?",
    "options": {
      "A": "$(2, 4)$",
      "B": "$(4, 17)$",
      "C": "$(1, 2)$",
      "D": "$(6, 8)$"
    },
    "correctAnswer": "D",
    "explanation": "Write $f(x) = \\alpha x - \\beta$, where $\\alpha = 1 + \\int_0^1 f(t)dt$ and $\\beta = \\int_0^1 t f(t)dt$.\n\nSolving the linear system yields $\\alpha = \\frac{18}{13}, \\beta = \\frac{4}{13} \\implies f(x) = \\frac{18x - 4}{13}$.\n\nFor $x = 6$: $y = f(6) = \\frac{18(6) - 4}{13} = \\frac{104}{13} = 8$. Hence $(6, 8)$ lies on the curve.",
    "topic": "Definite Integration - Fredholm Integral Equations",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 14,
    "number": 14,
    "text": "Let $f: \\mathbb{R} \\to \\mathbb{R}$ be defined as $f(x) = a \\sin\\left(\\frac{\\pi [x]}{2}\\right) + [2 - x], \\, a \\in \\mathbb{R}$, where $[t]$ is the greatest integer $\\le t$. If $\\lim_{x \\to -1} f(x)$ exists, then the value of $\\int_0^4 f(x) \\, dx$ is equal to:",
    "options": {
      "A": "$-1$",
      "B": "$-2$",
      "C": "$1$",
      "D": "$2$"
    },
    "correctAnswer": "B",
    "explanation": "RHL at $x = -1$: $-a + 2$. LHL at $x = -1$: $3$. Equating gives $a = -1$.\n\nIntegrating $f(x) = -\\sin(\\pi[x]/2) + [2 - x]$ over $[0, 4]$ across intervals $[0, 1), [1, 2), [2, 3), [3, 4)$ yields $1 - 1 - 1 - 1 = -2$.",
    "topic": "Definite Integration - Floor Step Functions & Continuity",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 15,
    "number": 15,
    "text": "Consider the integral $I = \\int_0^{10} \\frac{[x] e^{[x]}}{e^{x - 1}} \\, dx$, where $[x]$ denotes the greatest integer $\\le x$. Then the value of $I$ is equal to:",
    "options": {
      "A": "$45(e + 1)$",
      "B": "$9(e - 1)$",
      "C": "$9(e + 1)$",
      "D": "$45(e - 1)$"
    },
    "correctAnswer": "D",
    "explanation": "Split into sum over $n = 0$ to $9$:\n$$I = \\sum_{n=0}^9 \\int_n^{n+1} n e^n e^{1-x} dx = \\sum_{n=0}^9 n(e - 1) = (e - 1) \\sum_{n=0}^9 n = 45(e - 1).$$",
    "topic": "Definite Integration - Step Functions & Series Summation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 16,
    "number": 16,
    "text": "Let $f: \\mathbb{R} \\to \\mathbb{R}$ be defined as $f(x) = e^{-x} \\sin x$. If $F: [0, 1] \\to \\mathbb{R}$ is a differentiable function such that $F(x) = \\int_0^x f(t) \\, dt$, then the value of $\\int_0^1 (F'(x) + f(x)) e^x \\, dx$ lies in the interval:",
    "options": {
      "A": "$\\left[\\frac{330}{360}, \\frac{331}{360}\\right]$",
      "B": "$\\left[\\frac{335}{360}, \\frac{336}{360}\\right]$",
      "C": "$\\left[\\frac{327}{360}, \\frac{329}{360}\\right]$",
      "D": "$\\left[\\frac{331}{360}, \\frac{334}{360}\\right]$"
    },
    "correctAnswer": "A",
    "explanation": "$F'(x) = f(x) = e^{-x} \\sin x \\implies (F'(x) + f(x))e^x = 2\\sin x$.\n\n$$I = \\int_0^1 2\\sin x \\, dx = 2(1 - \\cos 1) = 2\\left(\\frac{1}{2!} - \\frac{1}{4!} + \\frac{1}{6!} - \\dots\\right) = 1 - \\frac{1}{12} + \\frac{1}{360} - \\dots = \\frac{331}{360} - R.$$\nThus the value lies in $\\left[\\frac{330}{360}, \\frac{331}{360}\\right]$.",
    "topic": "Definite Integration - Taylor Series Bound Estimation",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 17,
    "number": 17,
    "text": "The integral $\\int_6^{16} \\frac{\\log_e x^2}{\\log_e x^2 + \\log_e(x^2 - 44x + 484)} \\, dx$ is equal to:",
    "options": {
      "A": "$8$",
      "B": "$6$",
      "C": "$10$",
      "D": "$5$"
    },
    "correctAnswer": "D",
    "explanation": "Notice $x^2 - 44x + 484 = (22 - x)^2$. Here $a + b = 6 + 16 = 22$.\n\nApplying King's rule:\n$$2I = \\int_6^{16} 1 \\, dx = 16 - 6 = 10 \\implies I = 5.$$",
    "topic": "Definite Integration - King's Rule & Symmetry",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 18,
    "number": 18,
    "text": "If $I = \\int_1^2 \\frac{dx}{\\sqrt{2x^3 - 9x^2 + 12x + 4}}$, then which of the following inequality bounds holds?",
    "options": {
      "A": "$\\frac{1}{6} < I^2 < \\frac{1}{2}$",
      "B": "$\\frac{1}{16} < I^2 < \\frac{1}{9}$",
      "C": "$\\frac{1}{8} < I^2 < \\frac{1}{4}$",
      "D": "$\\frac{1}{9} < I^2 < \\frac{1}{8}$"
    },
    "correctAnswer": "D",
    "explanation": "Let $g(x) = 2x^3 - 9x^2 + 12x + 4$. Since $g'(x) = 6(x-1)(x-2) < 0$ on $(1, 2)$, $g(x)$ is strictly decreasing. Maximum is $g(1) = 9$, minimum is $g(2) = 8$.\n\n$$\\frac{1}{\\sqrt{9}} < I < \\frac{1}{\\sqrt{8}} \\implies \\frac{1}{3} < I < \\frac{1}{\\sqrt{8}} \\implies \\frac{1}{9} < I^2 < \\frac{1}{8}.$$",
    "topic": "Definite Integration - Inequality & Monotonicity Bounds",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 19,
    "number": 19,
    "text": "The integral $\\int_1^e \\left\\{ \\left(\\frac{x}{e}\\right)^{2x} - \\left(\\frac{e}{x}\\right)^x \\right\\} \\log_e x \\, dx$ is equal to:",
    "options": {
      "A": "$\\frac{1}{2} - e - \\frac{1}{e^2}$",
      "B": "$-\\frac{1}{2} + \\frac{1}{e} - \\frac{1}{2e^2}$",
      "C": "$\\frac{3}{2} - \\frac{1}{e} - \\frac{1}{2e^2}$",
      "D": "$\\frac{3}{2} - e - \\frac{1}{2e^2}$"
    },
    "correctAnswer": "D",
    "explanation": "Recognizing derivatives:\n- $\\frac{d}{dx}[(x/e)^{2x}] = 2(x/e)^{2x}\\ln x \\implies \\int_1^e (x/e)^{2x}\\ln x \\, dx = \\frac{1}{2}\\left(1 - \\frac{1}{e^2}\\right)$.\n- $\\frac{d}{dx}[(e/x)^x] = -(e/x)^x\\ln x \\implies -\\int_1^e (e/x)^x\\ln x \\, dx = 1 - e$.\n\nSum $= \\frac{3}{2} - e - \\frac{1}{2e^2}$.",
    "topic": "Definite Integration - Special Variable Substitutions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 20,
    "number": 20,
    "text": "The value of the integral $\\int_{-2}^2 \\frac{\\sin^2 x}{\\left[\\frac{x}{\\pi}\\right] + \\frac{1}{2}} \\, dx$ (where $[x]$ denotes the greatest integer $\\le x$) is:",
    "options": {
      "A": "$0$",
      "B": "$\\sin 4$",
      "C": "$4$",
      "D": "$4 - \\sin 4$"
    },
    "correctAnswer": "A",
    "explanation": "Using $[-u] = -1 - [u]$ for non-integers:\n$$f(-x) = \\frac{\\sin^2 x}{[-x/\\pi] + 1/2} = \\frac{\\sin^2 x}{-1 - [x/\\pi] + 1/2} = -f(x).$$\nThus $f(x)$ is an odd function. Integrating an odd function over symmetric bounds $[-2, 2]$ gives $0$.",
    "topic": "Definite Integration - Odd and Even Functions",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 21,
    "number": 21,
    "text": "If $\\phi(x) = \\frac{1}{\\sqrt{x}} \\int_{\\pi/4}^x (4\\sqrt{2} \\sin t - 3\\phi'(t)) \\, dt$ for $x > 0$, then $\\phi'\\left(\\frac{\\pi}{4}\\right)$ is equal to:",
    "options": {
      "A": "$\\frac{8}{\\sqrt{pi}}$",
      "B": "$\\frac{4}{6 + \\sqrt{pi}}$",
      "C": "$\\frac{8}{6 + \\sqrt{pi}}$",
      "D": "$\\frac{4}{6 - \\sqrt{pi}}$"
    },
    "correctAnswer": "C",
    "explanation": "Rewrite as $\\sqrt{x}\\phi(x) = \\int_{\\pi/4}^x (4\\sqrt{2}\\sin t - 3\\phi'(t))dt$. Differentiating by Leibniz rule:\n$$\\frac{1}{2\\sqrt{x}}\\phi(x) + \\sqrt{x}\\phi'(x) = 4\\sqrt{2}\\sin x - 3\\phi'(x)$$\nAt $x = \\pi/4$, $\\phi(\\pi/4) = 0 \\implies \\frac{\\sqrt{\\pi}}{2}\\phi'(\\pi/4) + 3\\phi'(\\pi/4) = 4 \\implies \\phi'(\\pi/4) = \\frac{8}{6 + \\sqrt{\\pi}}$.",
    "topic": "Definite Integration - Leibniz Rule (Differentiation under Integral)",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 22,
    "number": 22,
    "text": "The value of $\\sum_{n=1}^{100} \\int_{n-1}^n e^{x - [x]} \\, dx$, where $[x]$ is the greatest integer $\\le x$, is:",
    "options": {
      "A": "$100(1 - e)$",
      "B": "$100(1 + e)$",
      "C": "$100e$",
      "D": "$100(e - 1)$"
    },
    "correctAnswer": "D",
    "explanation": "Since ${x} = x - [x]$ is periodic with period $1$, each integral $\\int_{n-1}^n e^{\\{x\\}} dx = \\int_0^1 e^x dx = e - 1$.\nSumming $100$ terms gives $100(e - 1)$.",
    "topic": "Definite Integration - Periodic Functions",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 23,
    "number": 23,
    "text": "If $[x]$ is the greatest integer $\\le x$, then the value of $\\pi^2 \\int_0^2 \\left[\\sin\\left(\\frac{\\pi x}{2}\\right)\\right] (x - [x])^{[x]} \\, dx$ is equal to:",
    "options": {
      "A": "$4(\\pi + 1)$",
      "B": "$4(\\pi - 1)$",
      "C": "$2(\\pi + 1)$",
      "D": "$2(\\pi - 1)$"
    },
    "correctAnswer": "B",
    "explanation": "Evaluating over $[0, 1]$ and $[1, 2]$ using integration by parts yields $2\\pi + 2\\pi - 4 = 4(\\pi - 1)$.",
    "topic": "Definite Integration - Discontinuous Integrands",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 24,
    "number": 24,
    "text": "The limit $\\lim_{x \\to 0} \\frac{\\int_0^x t \\sin(10t) \\, dt}{x}$ is equal to:",
    "options": {
      "A": "$-\\frac{1}{10}$",
      "B": "$\\frac{1}{10}$",
      "C": "$-\\frac{1}{5}$",
      "D": "$0$"
    },
    "correctAnswer": "D",
    "explanation": "Using L'Hopital's Rule and Leibniz Rule: $\\lim_{x \\to 0} \\frac{x\\sin(10x)}{1} = 0$.",
    "topic": "Definite Integration - Limits with Leibniz Rule",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 25,
    "number": 25,
    "text": "If $\\int_0^1 (x^{21} + x^{14} + x^7)(2x^{14} + 3x^7 + 6)^{1/7} \\, dx = \\frac{1}{l}(11)^{m/n}$, where $l, m, n \\in \\mathbb{N}$ and $m, n$ are coprime, then $l + m + n$ is equal to:",
    "options": {
      "A": "$56$",
      "B": "$63$",
      "C": "$72$",
      "D": "$48$"
    },
    "correctAnswer": "B",
    "explanation": "Substitute $t = 2x^{21} + 3x^{14} + 6x^7 \\implies dt = 42(x^{20} + x^{13} + x^6)dx$.\n$$\\frac{1}{42}\\int_0^{11} t^{1/7} dt = \\frac{1}{48}(11)^{8/7} \\implies l = 48, m = 8, n = 7 \\implies l + m + n = 63.$$",
    "topic": "Definite Integration - Power Factorization Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 26,
    "number": 26,
    "text": "The value of the definite integral $\\frac{24}{\\pi} \\int_0^{\\sqrt{2}} \\frac{2 - x^2}{(2 + x^2)\\sqrt{4 + x^4}} \\, dx$ is equal to:",
    "options": {
      "A": "$1$",
      "B": "$2$",
      "C": "$3$",
      "D": "$4$"
    },
    "correctAnswer": "C",
    "explanation": "Divide by $x^2$ and substitute $t = x + 2/x$. Integral transforms to $\\frac{24}{\\pi} \\int_{2\\sqrt{2}}^\\infty \\frac{dt}{t\\sqrt{t^2 - 4}} = \\frac{12}{\\pi}[\\sec^{-1}(\\infty) - \\sec^{-1}(\\sqrt{2})] = \\frac{12}{\\pi}\\left(\\frac{\\pi}{4}\\right) = 3$.",
    "topic": "Definite Integration - Euler Inverse Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 27,
    "number": 27,
    "text": "If $\\int_{-0.15}^{0.15} |100x^2 - 1| \\, dx = \\frac{k}{3000}$, then the integer $k$ is equal to:",
    "options": {
      "A": "$450$",
      "B": "$575$",
      "C": "$625$",
      "D": "$525$"
    },
    "correctAnswer": "B",
    "explanation": "Since integrand is even, $2\\int_0^{0.15} |100x^2 - 1| dx = 2\\left[\\int_0^{0.1}(1 - 100x^2)dx + \\int_{0.1}^{0.15}(100x^2 - 1)dx\\right] = \\frac{575}{3000} \\implies k = 575$.",
    "topic": "Definite Integration - Modulus Function Integration",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 28,
    "number": 28,
    "text": "Let $[t]$ denote the greatest integer $\\le t$. Then $I = \\frac{2}{\\pi} \\int_{\\pi/6}^{5\\pi/6} (8[\\csc x] - 5[\\cot x]) \\, dx$ is equal to:",
    "options": {
      "A": "$10$",
      "B": "$12$",
      "C": "$14$",
      "D": "$16$"
    },
    "correctAnswer": "C",
    "explanation": "- $\\int_{\\pi/6}^{5\\pi/6} 8[\\csc x] dx = 8(2\\pi/3) = 16\\pi/3$.\n- $\\int_{\\pi/6}^{5\\pi/6} [\\cot x] dx = -\\pi/3$.\n\nCombining: $\\frac{2}{\\pi}\\left[ \\frac{16\\pi}{3} - 5\\left(-\\frac{\\pi}{3}\\right) \\right] = \\frac{2}{\\pi}\\left(\\frac{21\\pi}{3}\\right) = 14$.",
    "topic": "Definite Integration - Floor of Trigonometric Functions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 29,
    "number": 29,
    "text": "If $\\int_0^{\\sqrt{3}} \\frac{15x^3}{\\sqrt{1 + x^2} + \\sqrt{(1 + x^2)^3}} \\, dx = \\alpha\\sqrt{2} + \\beta\\sqrt{3}$, where $\\alpha, \\beta$ are integers, then $\\alpha + \\beta$ is equal to:",
    "options": {
      "A": "$8$",
      "B": "$10$",
      "C": "$12$",
      "D": "$15$"
    },
    "correctAnswer": "B",
    "explanation": "Substitute $1 + x^2 = t^2 \\implies \\alpha = 16, \\beta = -6 \\implies \\alpha + \\beta = 10$.",
    "topic": "Definite Integration - Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 30,
    "number": 30,
    "text": "Let $\\alpha = \\max_{0 \\le x \\le 2}\\left\\{\\frac{9 - x^2}{5 - x}\\right\\}$ and $\\beta = \\min_{0 \\le x \\le 2}\\left\\{\\frac{9 - x^2}{5 - x}\\right\\}$. If $\\int_{\\beta - \\frac{8}{3}}^{2\\alpha - 1} \\max\\left\\{\\frac{9 - x^2}{5 - x}, x\\right\\} \\, dx = \\alpha_1 + \\alpha_2 \\log_e\\left(\\frac{8}{15}\\right)$, then $\\alpha_1 + \\alpha_2$ is equal to:",
    "options": {
      "A": "$28$",
      "B": "$34$",
      "C": "$32$",
      "D": "$36$"
    },
    "correctAnswer": "B",
    "explanation": "Critical points give $\\alpha = 2, \\beta = 5/3$. Limits are $[-1, 3]$. Integral evaluates to $18 + 16\\ln(8/15) \\implies \\alpha_1 = 18, \\alpha_2 = 16 \\implies \\alpha_1 + \\alpha_2 = 34$.",
    "topic": "Definite Integration - Optimization & Max/Min Integrals",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 31,
    "number": 31,
    "text": "Let $f(x)$ and $g(x)$ be two functions satisfying $f(x^2) + g(4 - x) = 4x^3$ and $g(4 - x) + g(x) = 0$. The value of $\\int_{-4}^4 f(x^2) \\, dx$ is:",
    "options": {
      "A": "$256$",
      "B": "$512$",
      "C": "$128$",
      "D": "$1024$"
    },
    "correctAnswer": "B",
    "explanation": "By King's Property and functional symmetry: $f(x^2) + f((4-x)^2) = 4[x^3 + (4-x)^3]$.\n$$\\int_0^4 4[x^3 + (4-x)^3] dx = 4(128) = 512.$$",
    "topic": "Definite Integration - Functional Equations & King's Rule",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 32,
    "number": 32,
    "text": "Let $\\{x\\}$ and $[x]$ denote the fractional part and greatest integer $\\le x$. If $\\int_0^n \\{x\\} \\, dx, \\int_0^n [x] \\, dx$ and $10(n^2 - n)$ ($n \\in \\mathbb{N}, n > 1$) are three consecutive terms of a G.P., then $n$ is equal to:",
    "options": {
      "A": "$19$",
      "B": "$21$",
      "C": "$23$",
      "D": "$25$"
    },
    "correctAnswer": "B",
    "explanation": "Terms are $n/2, n(n-1)/2, 10(n^2 - n)$. In G.P.: $[n(n-1)/2]^2 = (n/2)\\cdot 10(n^2 - n) \\implies n - 1 = 20 \\implies n = 21$.",
    "topic": "Definite Integration - Geometric Progression with Floor Functions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 33,
    "number": 33,
    "text": "Let $I(x) = \\int \\frac{x^2(x\\sec^2 x + \\tan x)}{(x\\tan x + 1)^2} \\, dx$. If $I(0) = 0$, then $I\\left(\\frac{\\pi}{4}\\right)$ is equal to:",
    "options": {
      "A": "$\\log_e\\left(\\frac{(\\pi + 4)^2}{16}\\right) - \\frac{\\pi^2}{4(\\pi + 4)}$",
      "B": "$\\log_e\\left(\\frac{(\\pi + 4)^2}{16}\\right) + \\frac{\\pi^2}{4(\\pi + 4)}$",
      "C": "$\\log_e\\left(\\frac{(\\pi + 4)^2}{32}\\right) - \\frac{\\pi^2}{4(\\pi + 4)}$",
      "D": "$\\log_e\\left(\\frac{(\\pi + 4)^2}{32}\\right) + \\frac{\\pi^2}{4(\\pi + 4)}$"
    },
    "correctAnswer": "C",
    "explanation": "Integrating by parts gives $I(x) = -\\frac{x^2}{x\\tan x + 1} + 2\\ln|x\\sin x + \\cos x| + C$.\nAt $x = \\pi/4$, $I(\\pi/4) = \\log_e\\left(\\frac{(\\pi + 4)^2}{32}\\right) - \\frac{\\pi^2}{4(\\pi + 4)}$.",
    "topic": "Indefinite Integration - Integration by Parts & Trigonometric",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 34,
    "number": 34,
    "text": "Let $f(x) = \\int \\frac{2x}{(x^2 + 1)(x^2 + 3)} \\, dx$. If $f(3) = \\frac{1}{2}(\\log_e 5 - \\log_e 6)$, then $f(4)$ is equal to:",
    "options": {
      "A": "$\\frac{1}{2}(\\log_e 17 - \\log_e 19)$",
      "B": "$\\log_e 17 - \\log_e 18$",
      "C": "$\\frac{1}{2}(\\log_e 19 - \\log_e 17)$",
      "D": "$\\log_e 19 - \\log_e 20$"
    },
    "correctAnswer": "A",
    "explanation": "$f(x) = \\frac{1}{2}\\ln\\left(\\frac{x^2 + 1}{x^2 + 3}\\right) + C$. Since $f(3) = \\frac{1}{2}(\\ln 5 - \\ln 6) \\implies C = 0$.\n$$f(4) = \\frac{1}{2}\\ln(17/19) = \\frac{1}{2}(\\log_e 17 - \\log_e 19).$$",
    "topic": "Indefinite Integration - Partial Fractions",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 35,
    "number": 35,
    "text": "The indefinite integral $\\int \\frac{\\left(1 - \\frac{1}{\\sqrt{3}}\\right)(\\cos x - \\sin x)}{1 + \\frac{2}{\\sqrt{3}}\\sin 2x} \\, dx$ is equal to:",
    "options": {
      "A": "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}\\right| + C$",
      "B": "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{6}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{3}\\right)}\\right| + C$",
      "C": "$\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} + \\frac{\\pi}{2}\\right)}\\right| + C$",
      "D": "$\\frac{1}{2}\\log_e\\left|\\frac{\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{12}\\right)}{\\tan\\left(\\frac{x}{2} - \\frac{\\pi}{6}\\right)}\\right| + C$"
    },
    "correctAnswer": "A",
    "explanation": "Transforms to $\\frac{1}{2}[\\csc(x + \\pi/6) - \\sec(\\pi/6 - x)] dx \\implies \\frac{1}{2}\\log_e\\left|\\frac{\\tan(x/2 + \\pi/12)}{\\tan(x/2 + \\pi/6)}\\right| + C$.",
    "topic": "Indefinite Integration - Trigonometric Transformations",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 36,
    "number": 36,
    "text": "If $\\int \\frac{\\cos x - \\sin x}{\\sqrt{8 - \\sin 2x}} \\, dx = a\\sin^{-1}\\left(\\frac{\\sin x + \\cos x}{b}\\right) + c$, where $c$ is a constant of integration, then the ordered pair $(a, b)$ is equal to:",
    "options": {
      "A": "$(-1, 3)$",
      "B": "$(1, -3)$",
      "C": "$(3, 1)$",
      "D": "$(1, 3)$"
    },
    "correctAnswer": "D",
    "explanation": "Put $t = \\sin x + \\cos x \\implies dt = (\\cos x - \\sin x)dx$.\n$$\\int \\frac{dt}{\\sqrt{9 - t^2}} = \\sin^{-1}(t/3) + c = \\sin^{-1}\\left(\\frac{\\sin x + \\cos x}{3}\\right) + c \\implies (a, b) = (1, 3).$$",
    "topic": "Indefinite Integration - Standard Inverse Sine Form",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 37,
    "number": 37,
    "text": "If $\\int (e^{2x} + 2e^x - e^{-x} - 1) e^{(e^x + e^{-x})} \\, dx = g(x) e^{(e^x + e^{-x})} + c$, where $c$ is a constant of integration, then $g(0)$ is equal to:",
    "options": {
      "A": "$e^2$",
      "B": "$1$",
      "C": "$2$",
      "D": "$e$"
    },
    "correctAnswer": "C",
    "explanation": "Integration yields $(e^x + 1)e^{(e^x + e^{-x})} + c \\implies g(x) = e^x + 1 \\implies g(0) = 2$.",
    "topic": "Indefinite Integration - Exponential Substitutions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 38,
    "number": 38,
    "text": "The indefinite integral $\\int \\frac{2x^3 - 1}{x^4 + x} \\, dx$ is equal to:",
    "options": {
      "A": "$\\log_e\\left|\\frac{x^3 + 1}{x}\\right| + C$",
      "B": "$\\frac{1}{2}\\log_e\\left|\\frac{(x^3 + 1)^2}{x^3}\\right| + C$",
      "C": "$\\frac{1}{2}\\log_e\\left|\\frac{x^3 + 1}{x^2}\\right| + C$",
      "D": "$\\log_e\\left|\\frac{x^3 + 1}{x^2}\\right| + C$"
    },
    "correctAnswer": "A",
    "explanation": "Divide by $x^2$: $\\int \\frac{2x - 1/x^2}{x^2 + 1/x} \\, dx = \\ln|x^2 + 1/x| + C = \\log_e\\left|\\frac{x^3 + 1}{x}\\right| + C$.",
    "topic": "Indefinite Integration - Algebraic Manipulation & Logarithmic Form",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 39,
    "number": 39,
    "text": "The integral $\\int \\frac{\\sin(5x/2)}{\\sin(x/2)} \\, dx$ is equal to:",
    "options": {
      "A": "$2x + \\sin x + 2\\sin 2x + c$",
      "B": "$x + 2\\sin x + 2\\sin 2x + c$",
      "C": "$x + 2\\sin x + \\sin 2x + c$",
      "D": "$2x + \\sin x + \\sin 2x + c$"
    },
    "correctAnswer": "C",
    "explanation": "$$\\int \\frac{\\sin 3x + \\sin 2x}{\\sin x} dx = \\int (1 + 2\\cos 2x + 2\\cos x) dx = x + \\sin 2x + 2\\sin x + c.$$",
    "topic": "Indefinite Integration - Trigonometric Sum-to-Product",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 40,
    "number": 40,
    "text": "If $\\int \\frac{dx}{x^3(1 + x^6)^{2/3}} = x f(x)(1 + x^6)^{1/3} + C$, then the function $f(x)$ is equal to:",
    "options": {
      "A": "$-\\frac{1}{6x^3}$",
      "B": "$\\frac{3}{x^2}$",
      "C": "$-\\frac{1}{2x^2}$",
      "D": "$-\\frac{1}{2x^3}$"
    },
    "correctAnswer": "D",
    "explanation": "Substitute $t = 1 + 1/x^6 \\implies -\\frac{1}{2x^2}(x^6 + 1)^{1/3} + C \\implies x f(x) = -\\frac{1}{2x^2} \\implies f(x) = -\\frac{1}{2x^3}$.",
    "topic": "Indefinite Integration - Fractional Power Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 41,
    "number": 41,
    "text": "If $I(x) = \\int e^{\\sin^2 x}(\\cos x \\sin 2x - \\sin x) \\, dx$ and $I(0) = 1$, then $I\\left(\\frac{\\pi}{3}\\right)$ is equal to:",
    "options": {
      "A": "$-\\frac{1}{2}e^{3/4}$",
      "B": "$e^{3/4}$",
      "C": "$\\frac{1}{2}e^{3/4}$",
      "D": "$-e^{3/4}$"
    },
    "correctAnswer": "C",
    "explanation": "$I(x) = e^{\\sin^2 x}\\cos x + c$. Since $I(0) = 1 \\implies c = 0$.\n$$I(\\pi/3) = e^{3/4}\\cos(\\pi/3) = \\frac{1}{2}e^{3/4}.$$",
    "topic": "Indefinite Integration - Integration by Parts with Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 42,
    "number": 42,
    "text": "Let $I_n(x) = \\int_0^x \\frac{1}{(t^2 + 5)^n} \\, dt$ for $n = 1, 2, 3, \\dots$ Then which relation holds for $n = 5$?",
    "options": {
      "A": "$50 I_6 - 9 I_5 = x I'_5$",
      "B": "$50 I_6 - 11 I_5 = x I'_5$",
      "C": "$50 I_6 - 9 I_5 = I'_5$",
      "D": "$50 I_6 - 11 I_5 = I'_5$"
    },
    "correctAnswer": "A",
    "explanation": "Reduction formula: $10n I_{n+1}(x) + (1 - 2n)I_n(x) = x I'_n(x)$. For $n = 5$: $50 I_6 - 9 I_5 = x I'_5$.",
    "topic": "Indefinite/Reduction - Integral Reduction Formula",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 43,
    "number": 43,
    "text": "The value of the integral:\n$$\\int \\frac{\\sin\\theta \\sin 2\\theta (\\sin^6\\theta + \\sin^4\\theta + \\sin^2\\theta) \\sqrt{2\\sin^4\\theta + 3\\sin^2\\theta + 6}}{1 - \\cos 2\\theta} \\, d\\theta$$\nis equal to:",
    "options": {
      "A": "$\\frac{1}{18}[9 - 2\\sin^6\\theta - 3\\sin^4\\theta - 6\\sin^2\\theta]^{3/2} + c$",
      "B": "$\\frac{1}{18}[11 - 18\\cos^2\\theta + 9\\cos^4\\theta - 2\\cos^6\\theta]^{3/2} + c$",
      "C": "$\\frac{1}{18}[11 - 18\\sin^2\\theta + 9\\sin^4\\theta - 2\\sin^6\\theta]^{3/2} + c$",
      "D": "$\\frac{1}{18}[9 - 2\\cos^6\\theta + 3\\cos^4\\theta - 6\\cos^2\\theta]^{3/2} + c$"
    },
    "correctAnswer": "B",
    "explanation": "Simplifies to $\\frac{1}{18}(2\\sin^6\\theta + 3\\sin^4\\theta + 6\\sin^2\\theta)^{3/2} + c = \\frac{1}{18}[11 - 18\\cos^2\\theta + 9\\cos^4\\theta - 2\\cos^6\\theta]^{3/2} + c$.",
    "topic": "Indefinite Integration - Advanced Trigonometric & Algebraic Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 44,
    "number": 44,
    "text": "If $\\int \\sin^{-1}\\left(\\sqrt{\\frac{x}{1 + x}}\\right) \\, dx = A(x)\\tan^{-1}(\\sqrt{x}) + B(x) + C$, where $C$ is a constant of integration, then the ordered pair $(A(x), B(x))$ can be:",
    "options": {
      "A": "$(x + 1, -\\sqrt{x})$",
      "B": "$(x + 1, \\sqrt{x})$",
      "C": "$(x - 1, -\\sqrt{x})$",
      "D": "$(x - 1, \\sqrt{x})$"
    },
    "correctAnswer": "A",
    "explanation": "Substitute $x = \\tan^2\\theta \\implies (x + 1)\\tan^{-1}(\\sqrt{x}) - \\sqrt{x} + C \\implies A(x) = x + 1, B(x) = -\\sqrt{x}$.",
    "topic": "Indefinite Integration - Inverse Trigonometric by Parts",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 45,
    "number": 45,
    "text": "Let $\\alpha \\in (0, \\pi/2)$ be fixed. If $\\int \\frac{\\tan x + \\tan\\alpha}{\\tan x - \\tan\\alpha} \\, dx = A(x)\\cos 2\\alpha + B(x)\\sin 2\\alpha + C$, then $A(x)$ and $B(x)$ are respectively:",
    "options": {
      "A": "$x - \\alpha$ and $\\log_e|\\cos(x - \\alpha)|$",
      "B": "$x + \\alpha$ and $\\log_e|\\sin(x - \\alpha)|$",
      "C": "$x - \\alpha$ and $\\log_e|\\sin(x - \\alpha)|$",
      "D": "$x + \\alpha$ and $\\log_e|\\sin(x + \\alpha)|$"
    },
    "correctAnswer": "C",
    "explanation": "$$\\int \\frac{\\sin(x + \\alpha)}{\\sin(x - \\alpha)} dx = (x - \\alpha)\\cos 2\\alpha + \\log_e|\\sin(x - \\alpha)|\\sin 2\\alpha + C.$$",
    "topic": "Indefinite Integration - Trigonometric Identity Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 46,
    "number": 46,
    "text": "If $\\int x^5 e^{-x^2} \\, dx = g(x)e^{-x^2} + c$, where $c$ is a constant of integration, then $g(-1)$ is equal to:",
    "options": {
      "A": "$-\\frac{5}{2}$",
      "B": "$1$",
      "C": "$-\\frac{1}{2}$",
      "D": "$-1$"
    },
    "correctAnswer": "A",
    "explanation": "$g(x) = -\\left(\\frac{x^4}{2} + x^2 + 1\\right) \\implies g(-1) = -\\left(\\frac{1}{2} + 1 + 1\\right) = -\\frac{5}{2}$.",
    "topic": "Indefinite Integration - Integration by Parts with Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 47,
    "number": 47,
    "text": "The integral $\\int \\frac{e^{3\\log_e 2x} + 5e^{2\\log_e 2x}}{e^{4\\log_e x} + 5e^{3\\log_e x} - 7e^{2\\log_e x}} \\, dx$ for $x > 0$ is equal to:",
    "options": {
      "A": "$\\frac{1}{4}\\log_e|x^2 + 5x - 7| + c$",
      "B": "$4\\log_e|x^2 + 5x - 7| + c$",
      "C": "$\\log_e\\sqrt{x^2 + 5x - 7} + c$",
      "D": "$\\log_e|x^2 + 5x - 7| + c$"
    },
    "correctAnswer": "B",
    "explanation": "$$\\int \\frac{8x^3 + 20x^2}{x^4 + 5x^3 - 7x^2} dx = 4\\int \\frac{2x + 5}{x^2 + 5x - 7} dx = 4\\log_e|x^2 + 5x - 7| + c.$$",
    "topic": "Indefinite Integration - Logarithmic Exponentials Simplification",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 48,
    "number": 48,
    "text": "The integral $\\int \\frac{dx}{\\sqrt[4]{(x - 1)^3(x + 2)^5}}$ is equal to:",
    "options": {
      "A": "$\\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{5/4} + C$",
      "B": "$\\frac{3}{4}\\left(\\frac{x + 2}{x - 1}\\right)^{5/4} + C$",
      "C": "$\\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{1/4} + C$",
      "D": "$\\frac{3}{4}\\left(\\frac{x + 2}{x - 1}\\right)^{1/4} + C$"
    },
    "correctAnswer": "C",
    "explanation": "Substitute $t = \\frac{x - 1}{x + 2} \\implies dt = \\frac{3}{(x + 2)^2}dx \\implies \\frac{1}{3}\\int t^{-3/4} dt = \\frac{4}{3}\\left(\\frac{x - 1}{x + 2}\\right)^{1/4} + C$.",
    "topic": "Indefinite Integration - Fractional Linear Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 49,
    "number": 49,
    "text": "If $\\int \\frac{d\\theta}{\\cos^2\\theta(\\tan 2\\theta + \\sec 2\\theta)} = \\lambda\\tan\\theta + 2\\log_e|f(\\theta)| + C$, where $C$ is a constant of integration, then $(\\lambda, f(\\theta))$ is equal to:",
    "options": {
      "A": "$(1, 1 + \\tan\\theta)$",
      "B": "$(-1, 1 - \\tan\\theta)$",
      "C": "$(-1, 1 + \\tan\\theta)$",
      "D": "$(1, 1 - \\tan\\theta)$"
    },
    "correctAnswer": "C",
    "explanation": "$$\\int \\frac{1 - \\tan\\theta}{1 + \\tan\\theta}\\sec^2\\theta \\, d\\theta = -\\tan\\theta + 2\\log_e|1 + \\tan\\theta| + C \\implies \\lambda = -1, f(\\theta) = 1 + \\tan\\theta.$$",
    "topic": "Indefinite Integration - Multiple Angle Identities",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 50,
    "number": 50,
    "text": "Let $f(x) = \\int \\frac{\\sqrt{x}}{(1 + x)^2} \\, dx$ for $x > 0$. Then $f(3) - f(1)$ is equal to:",
    "options": {
      "A": "$\\frac{\\pi}{12} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}$",
      "B": "$-\\frac{\\pi}{6} + \\frac{1}{2} + \\frac{\\sqrt{3}}{4}$",
      "C": "$-\\frac{\\pi}{12} + \\frac{1}{2} + \\frac{\\sqrt{3}}{4}$",
      "D": "$\\frac{\\pi}{6} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}$"
    },
    "correctAnswer": "A",
    "explanation": "$f(x) = \\tan^{-1}(\\sqrt{x}) - \\frac{\\sqrt{x}}{1 + x} + c$.\n$$f(3) - f(1) = \\left(\\frac{\\pi}{3} - \\frac{\\sqrt{3}}{4}\\right) - \\left(\\frac{\\pi}{4} - \\frac{1}{2}\\right) = \\frac{\\pi}{12} + \\frac{1}{2} - \\frac{\\sqrt{3}}{4}.$$",
    "topic": "Indefinite Integration - Trigonometric Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 51,
    "number": 51,
    "text": "The indefinite integral $\\int \\frac{dx}{(x + 4)^{8/7}(x - 3)^{6/7}}$ is equal to:",
    "options": {
      "A": "$\\left(\\frac{x - 3}{x + 4}\\right)^{1/7} + C$",
      "B": "$-\\frac{1}{13}\\left(\\frac{x - 3}{x + 4}\\right)^{-13/7} + C$",
      "C": "$\\frac{1}{2}\\left(\\frac{x - 3}{x + 4}\\right)^{3/7} + C$",
      "D": "$-\\left(\\frac{x - 3}{x + 4}\\right)^{-1/7} + C$"
    },
    "correctAnswer": "A",
    "explanation": "Substitute $t = \\frac{x - 3}{x + 4} \\implies \\frac{1}{7}\\int t^{-6/7} dt = \\left(\\frac{x - 3}{x + 4}\\right)^{1/7} + C$.",
    "topic": "Indefinite Integration - Fractional Linear Transformation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 52,
    "number": 52,
    "text": "For $x^2 \\ne n\\pi + 1$ ($n \\in \\mathbb{N}$), the integral:\n$$\\int x \\sqrt{\\frac{2\\sin(x^2 - 1) - \\sin 2(x^2 - 1)}{2\\sin(x^2 - 1) + \\sin 2(x^2 - 1)}} \\, dx$$\nis equal to:",
    "options": {
      "A": "$\\frac{1}{2}\\log_e|\\sec(x^2 - 1)| + c$",
      "B": "$\\frac{1}{2}\\log_e\\left|\\sec\\left(\\frac{x^2 - 1}{2}\\right)\\right| + c$",
      "C": "$\\frac{1}{2}\\log_e\\left|\\sec^2\\left(\\frac{x^2 - 1}{2}\\right)\\right| + c$",
      "D": "$\\log_e\\left|\\sec\\left(\\frac{x^2 - 1}{2}\\right)\\right| + c$"
    },
    "correctAnswer": "D",
    "explanation": "Half-angle simplification gives $\\tan((x^2 - 1)/2)$. Integrating $\\int x\\tan((x^2 - 1)/2)dx = \\log_e|\\sec((x^2 - 1)/2)| + c$.",
    "topic": "Indefinite Integration - Half-Angle Formula & Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 53,
    "number": 53,
    "text": "If $f(x) = \\int \\frac{5x^8 + 7x^6}{(x^2 + 1 + 2x^7)^2} \\, dx$ for $x \\ge 0$ and $f(0) = 0$, then $f(1)$ is equal to:",
    "options": {
      "A": "$-\\frac{1}{2}$",
      "B": "$\\frac{1}{2}$",
      "C": "$-\\frac{1}{4}$",
      "D": "$\\frac{1}{4}$"
    },
    "correctAnswer": "D",
    "explanation": "$f(x) = \\frac{x^7}{2x^7 + x^2 + 1} \\implies f(1) = \\frac{1}{2(1) + 1 + 1} = \\frac{1}{4}$.",
    "topic": "Indefinite Integration - Leading Power Division Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 54,
    "number": 54,
    "text": "Let $n \\ge 2$ be a natural number and $0 < \\theta < \\pi/2$. Then:\n$$\\int \\frac{(\\sin^n\\theta - \\sin\\theta)^{1/n}\\cos\\theta}{\\sin^{n+1}\\theta} \\, d\\theta$$\nis equal to:",
    "options": {
      "A": "$\\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + C$",
      "B": "$\\frac{n}{n^2 + 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + C$",
      "C": "$\\frac{n}{n^2 - 1}\\left(1 + \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + C$",
      "D": "$\\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n+1}\\theta}\\right)^{\\frac{n+1}{n}} + C$"
    },
    "correctAnswer": "A",
    "explanation": "Factor out $\\sin\\theta$ and substitute $u = 1 - 1/\\sin^{n-1}\\theta \\implies \\frac{n}{n^2 - 1}\\left(1 - \\frac{1}{\\sin^{n-1}\\theta}\\right)^{\\frac{n+1}{n}} + C$.",
    "topic": "Indefinite Integration - Power Manipulation Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 55,
    "number": 55,
    "text": "If $\\int_0^1 \\frac{1}{(5 + 2x - 2x^2)(1 + e^{2 - 4x})} \\, dx = \\frac{1}{\\alpha}\\log_e\\left(\\frac{\\alpha + 1}{\\beta}\\right)$ with $\\alpha, \\beta > 0$, then $\\alpha^4 - \\beta^4$ is equal to:",
    "options": {
      "A": "$21$",
      "B": "$0$",
      "C": "$19$",
      "D": "$-21$"
    },
    "correctAnswer": "A",
    "explanation": "$2I = \\int_0^1 \\frac{dx}{5 + 2x - 2x^2} = \\frac{1}{\\sqrt{11}}\\ln\\left(\\frac{\\sqrt{11} + 1}{\\sqrt{10}}\\right) \\implies \\alpha = \\sqrt{11}, \\beta = \\sqrt{10} \\implies \\alpha^4 - \\beta^4 = 121 - 100 = 21$.",
    "topic": "Definite/Indefinite - Quadratic Inversion & King's Property",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 56,
    "number": 56,
    "text": "The value of the definite integral $\\int_0^1 \\frac{\\sqrt{x} \\, dx}{(1 + x)(1 + 3x)(3 + x)}$ is equal to:",
    "options": {
      "A": "$\\frac{\\pi}{4}\\left(1 - \\frac{\\sqrt{3}}{6}\\right)$",
      "B": "$\\frac{\\pi}{8}\\left(1 - \\frac{\\sqrt{3}}{2}\\right)$",
      "C": "$\\frac{\\pi}{4}\\left(1 - \\frac{\\sqrt{3}}{2}\\right)$",
      "D": "$\\frac{\\pi}{8}\\left(1 - \\frac{\\sqrt{3}}{6}\\right)$"
    },
    "correctAnswer": "B",
    "explanation": "Substitute $x = t^2$ and decompose into partial fractions: $\\frac{\\pi}{8} - \\frac{\\pi\\sqrt{3}}{16} = \\frac{\\pi}{8}\\left(1 - \\frac{\\sqrt{3}}{2}\\right)$.",
    "topic": "Integration - Partial Fraction Decomposition with Radical",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 57,
    "number": 57,
    "text": "If $\\int \\frac{2e^x + 3e^{-x}}{4e^x + 7e^{-x}} \\, dx = \\frac{1}{14}\\left(u x + v \\log_e(4e^x + 7e^{-x})\\right) + C$, where $C$ is a constant of integration, then $u + v$ is equal to:",
    "options": {
      "A": "$7$",
      "B": "$14$",
      "C": "$17$",
      "D": "$21$"
    },
    "correctAnswer": "A",
    "explanation": "$$\\int \\frac{2e^x + 3e^{-x}}{4e^x + 7e^{-x}} dx = \\frac{13}{28}x + \\frac{1}{28}\\ln(4e^x + 7e^{-x}) + C = \\frac{1}{14}\\left[\\frac{13}{2}x + \\frac{1}{2}\\ln(4e^x + 7e^{-x})\\right] + C$$\n$$\\implies u = \\frac{13}{2}, v = \\frac{1}{2} \\implies u + v = 7.$$",
    "topic": "Indefinite Integration - Linear Combination of Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 58,
    "number": 58,
    "text": "Let $I(x) = \\int \\sqrt{\\frac{x + 7}{x}} \\, dx$ and $I(9) = 12 + 7\\log_e 7$. If $I(1) = \\alpha + 7\\log_e(1 + 2\\sqrt{2})$, then $\\alpha^4$ is equal to:",
    "options": {
      "A": "$32$",
      "B": "$64$",
      "C": "$128$",
      "D": "$256$"
    },
    "correctAnswer": "B",
    "explanation": "$I(x) = \\sqrt{x(x + 7)} + 7\\ln|\\sqrt{x} + \\sqrt{x + 7}| + C$. Since $I(9) = 12 + 7\\ln 7 \\implies C = 0$.\n$$I(1) = \\sqrt{8} + 7\\ln(1 + 2\\sqrt{2}) \\implies \\alpha = \\sqrt{8} \\implies \\alpha^4 = 64.$$",
    "topic": "Indefinite Integration - Algebraic Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 59,
    "number": 59,
    "text": "Let $f(x) = \\int \\frac{dx}{(3 + 4x^2)\\sqrt{4 - 3x^2}}$ for $|x| < \\frac{2}{\\sqrt{3}}$. If $f(0) = 0$ and $f(1) = \\frac{1}{\\alpha\\beta}\\tan^{-1}\\left(\\frac{\\alpha}{\\beta}\\right)$ with $\\alpha, \\beta > 0$, then $\\alpha^2 + \\beta^2$ is equal to:",
    "options": {
      "A": "$25$",
      "B": "$28$",
      "C": "$34$",
      "D": "$30$"
    },
    "correctAnswer": "B",
    "explanation": "Substitute $x = 1/z \\implies f(1) = \\frac{1}{5\\sqrt{3}}\\tan^{-1}(5/\\sqrt{3}) \\implies \\alpha = 5, \\beta = \\sqrt{3} \\implies \\alpha^2 + \\beta^2 = 25 + 3 = 28$.",
    "topic": "Indefinite Integration - Radical Inversion ($x = 1/z$)",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 60,
    "number": 60,
    "text": "If $\\int \\frac{dx}{(x^2 + x + 1)^2} = a\\tan^{-1}\\left(\\frac{2x + 1}{\\sqrt{3}}\\right) + b\\left(\\frac{2x + 1}{x^2 + x + 1}\\right) + C$ for $x > 0$, where $C$ is a constant of integration, then the value of $9(\\sqrt{3}a + b)$ is equal to:",
    "options": {
      "A": "$12$",
      "B": "$15$",
      "C": "$18$",
      "D": "$21$"
    },
    "correctAnswer": "B",
    "explanation": "$a = \\frac{4\\sqrt{3}}{9}, b = \\frac{1}{3} \\implies 9(\\sqrt{3}a + b) = 9\\left(\\frac{4}{3} + \\frac{1}{3}\\right) = 15$.",
    "topic": "Indefinite Integration - Quadratic Power Substitution",
    "difficulty": "Hard",
    "image": null
  }
];
