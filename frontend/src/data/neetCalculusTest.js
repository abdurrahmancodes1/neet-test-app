/**
 * NEET 2027 Comprehensive Mock Test: Definite & Indefinite Integration
 * 60 High-Yield Hard Calculus Questions curated from Authentic PYQs
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
    "text": "Let α ∈ (0, 1) and β = log_e(1 - α). Let P_n(x) = x + x²/2 + x³/3 + ... + xⁿ/n for x ∈ (0, 1).\nThen the integral ∫₀^α (t⁵⁰ / (1 - t)) dt is equal to:",
    "options": {
      "A": "β - P₅₀(α)",
      "B": "-(β + P₅₀(α))",
      "C": "P₅₀(α) - β",
      "D": "β + P₅₀(α)"
    },
    "correctAnswer": "B",
    "explanation": "We rewrite (t⁵⁰)/(1 - t) as -( (1 - t⁵⁰) - 1 ) / (1 - t) = -(1 + t + t² + ... + t⁴⁹) + 1/(1 - t). Integrating from 0 to α: ∫₀^α [ -(1 + t + ... + t⁴⁹) + 1/(1 - t) ] dt = -[ t + t²/2 + ... + t⁵⁰/50 ]₀^α - [ln(1 - t)]₀^α = -P₅₀(α) - ln(1 - α) = -P₅₀(α) - β = -(β + P₅₀(α)).",
    "topic": "Definite Integration - Algebraic Manipulation & Series",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 2,
    "number": 2,
    "text": "The value of the definite integral ∫_{(3√2)/4}^{(3√3)/4} (48 / √(9 - 4x²)) dx is equal to:",
    "options": {
      "A": "π / 3",
      "B": "π / 2",
      "C": "π / 6",
      "D": "2π"
    },
    "correctAnswer": "D",
    "explanation": "Using standard inverse trigonometric integration: ∫ (48 / √(9 - 4x²)) dx = 48 * (1/2) sin⁻¹(2x/3) = 24 sin⁻¹(2x/3). Evaluating at upper limit (3√3/4): 24 sin⁻¹(√3/2) = 24(π/3) = 8π. At lower limit (3√2/4): 24 sin⁻¹(1/√2) = 24(π/4) = 6π. Difference = 8π - 6π = 2π.",
    "topic": "Definite Integration - Standard Inverse Trigonometric Forms",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 3,
    "number": 3,
    "text": "The value of the integral ∫_{π/3}^{π/2} (2 + 3sin x) / (sin x (1 + cos x)) dx is equal to:",
    "options": {
      "A": "(7/2)√3 - log_e √3",
      "B": "-2 + √3 + log_e √3",
      "C": "10/3 - √3 + log_e √3",
      "D": "10/3 - √3 - log_e √3"
    },
    "correctAnswer": "C",
    "explanation": "Split the integral into I = 2 ∫_{π/3}^{π/2} dx/(sin x(1+cos x)) + 3 ∫_{π/3}^{π/2} dx/(1+cos x) = 2 I₂ + 3 I₁. For I₁: ∫ dx/(1+cos x) = ∫ (1/2)sec²(x/2) dx = [tan(x/2)]_{π/3}^{π/2} = 1 - 1/√3. For I₂: substituting t = tan(x/2) gives I₂ = (1/6) + (1/2)ln 3. Combining gives I = 2(1/6 + (1/2)ln 3) + 3(1 - 1/√3) = 1/3 + ln 3 + 3 - √3 = 10/3 - √3 + log_e √3.",
    "topic": "Definite Integration - Trigonometric Rationalization",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 4,
    "number": 4,
    "text": "Let α > 0. If ∫₀^α (x / (√(x + α) - √x)) dx = (16 + 20√2)/15, then α is equal to:",
    "options": {
      "A": "2",
      "B": "4",
      "C": "√2",
      "D": "2√2"
    },
    "correctAnswer": "A",
    "explanation": "Rationalizing the denominator gives (1/α) ∫₀^α [x√(x + α) + x^(3/2)] dx. Integrating gives (1/α) [ (2/3)x(x+α)^(3/2) - (4/15)(x+α)^(5/2) + (2/5)x^(5/2) ]₀^α = α^(3/2)[(4√2 + 10)/15]. Equating to (16 + 20√2)/15 = 2√2[(10 + 4√2)/15] implies α^(3/2) = 2√2 = 2^(3/2) => α = 2.",
    "topic": "Definite Integration - Algebraic Rationalization",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 5,
    "number": 5,
    "text": "Let f(x) = 2 + |x| - |x - 1| + |x + 1|, x ∈ ℝ. Consider the statements:\n(S1): f'(-3/2) + f'(-1/2) + f'(1/2) + f'(3/2) = 2\n(S2): ∫_{-2}^2 f(x) dx = 12\nThen:",
    "options": {
      "A": "Both (S1) and (S2) are correct",
      "B": "Both (S1) and (S2) are wrong",
      "C": "Only (S1) is correct",
      "D": "Only (S2) is correct"
    },
    "correctAnswer": "D",
    "explanation": "Piecewise breakdown: For x < -1, f(x) = -x; for -1 < x < 0, f(x) = x + 2; for 0 < x < 1, f(x) = 3x + 2; for 1 < x < 2, f(x) = x + 4. Derivatives: f'(-3/2) = -1, f'(-1/2) = 1, f'(1/2) = 3, f'(3/2) = 1 => Sum = -1 + 1 + 3 + 1 = 4 ≠ 2 (S1 is false). Integral ∫_{-2}^2 f(x) dx = ∫_{-2}^{-1} -x dx + ∫_{-1}^0 (x+2) dx + ∫_0^1 (3x+2) dx + ∫_1^2 (x+4) dx = 3/2 + 3/2 + 7/2 + 11/2 = 12 (S2 is true).",
    "topic": "Definite Integration - Piecewise Functions & Modulus",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 6,
    "number": 6,
    "text": "Let f be a differentiable function ℝ → ℝ such that |f(x) - f(y)| ≤ 2|x - y|^(3/2) for all x, y ∈ ℝ. If f(0) = 1, then ∫₀¹ f²(x) dx is equal to:",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "2",
      "D": "1"
    },
    "correctAnswer": "D",
    "explanation": "Dividing by |x - y|: |(f(x) - f(y))/(x - y)| ≤ 2|x - y|^(1/2). Taking limit as x → y gives |f'(y)| ≤ 0 => f'(y) = 0 for all y ∈ ℝ. Hence f(x) is identically a constant function. Since f(0) = 1, f(x) = 1 for all x. Thus ∫₀¹ f²(x) dx = ∫₀¹ 1 dx = 1.",
    "topic": "Definite Integration - Differentiability & Mean Value",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 7,
    "number": 7,
    "text": "The value of the definite integral ∫_{-log_e 2}^{log_e 2} e^x [log_e(e^x + √(1 + e^(2x)))] dx is equal to:",
    "options": {
      "A": "log_e((2(2 + √5)) / √(1 + √5)) - √5/2",
      "B": "log_e((√2(3 - √5)²) / √(1 + √5)) + √5/2",
      "C": "log_e(((2 + √5)²) / √(1 + √5)) + √5/2",
      "D": "log_e((√2(2 + √5)²) / √(1 + √5)) - √5/2"
    },
    "correctAnswer": "D",
    "explanation": "Substitute e^x = u => e^x dx = du with limits u ∈ [1/2, 2]. The integral becomes I = ∫_{1/2}^2 ln(u + √(1 + u²)) du. Integrating by parts: [u ln(u + √(1 + u²))]_{1/2}^2 - ∫_{1/2}^2 (u/√(1 + u²)) du = 2 ln(2 + √5) - (1/2)ln((1+√5)/2) - [√(1 + u²)]_{1/2}^2 = log_e((√2(2 + √5)²)/√(1 + √5)) - √5/2.",
    "topic": "Definite Integration - Integration by Parts & Logarithmic",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 8,
    "number": 8,
    "text": "Let f: [0, 2] → ℝ be defined as f(x) = e^{min{x², x - [x]}} for x ∈ [0, 1) and f(x) = e^{[x - log_e x]} for x ∈ [1, 2], where [t] denotes greatest integer ≤ t. Then the value of ∫₀² x f(x) dx is:",
    "options": {
      "A": "2e - 1",
      "B": "1 + 3e/2",
      "C": "2e - 1/2",
      "D": "(e - 1)(e² + 1/2)"
    },
    "correctAnswer": "C",
    "explanation": "On [0, 1): x - [x] = x. Since x² ≤ x for x ∈ [0, 1), min{x², x} = x², so f(x) = e^(x²). On [1, 2]: let g(x) = x - ln x. g'(x) = 1 - 1/x ≥ 0 on [1, 2]. Range of g(x) is [1, 2 - ln 2] ≈ [1, 1.307], so [x - ln x] = 1, giving f(x) = e¹ = e. ∫₀² x f(x) dx = ∫₀¹ x e^(x²) dx + ∫₁² e x dx = [(1/2)e^(x²)]₀¹ + [e x²/2]₁² = (1/2)(e - 1) + (e/2)(4 - 1) = 2e - 1/2.",
    "topic": "Definite Integration - Greatest Integer & Floor Functions",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 9,
    "number": 9,
    "text": "The value of the definite integral ∫_{1/2}^2 (tan⁻¹ x / x) dx is equal to:",
    "options": {
      "A": "π log_e 2",
      "B": "(1/2) log_e 2",
      "C": "(π/4) log_e 2",
      "D": "(π/2) log_e 2"
    },
    "correctAnswer": "D",
    "explanation": "Substitute x = 1/t => dx = -dt/t². Limits invert from 2 to 1/2: I = ∫_{1/2}^2 (tan⁻¹(1/t) / t) dt = ∫_{1/2}^2 (cot⁻¹ x / x) dx. Adding both representations: 2I = ∫_{1/2}^2 ((tan⁻¹ x + cot⁻¹ x)/x) dx = (π/2) ∫_{1/2}^2 (1/x) dx = (π/2) [ln 2 - ln(1/2)] = (π/2)(2 ln 2) = π ln 2. Therefore, I = (π/2) log_e 2.",
    "topic": "Definite Integration - Inversion Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 10,
    "number": 10,
    "text": "The value of the quotient (e^(-π/4) + ∫₀^{π/4} e^(-x) tan⁵⁰ x dx) / (∫₀^{π/4} e^(-x) (tan⁴⁹ x + tan⁵¹ x) dx) is:",
    "options": {
      "A": "50",
      "B": "49",
      "C": "51",
      "D": "25"
    },
    "correctAnswer": "A",
    "explanation": "Integrating ∫₀^{π/4} e^(-x) tan⁵⁰ x dx by parts: [-e^(-x) tan⁵⁰ x]₀^{π/4} + 50 ∫₀^{π/4} e^(-x) tan⁴⁹ x sec² x dx = -e^(-π/4) + 50 ∫₀^{π/4} e^(-x) tan⁴⁹ x (1 + tan² x) dx = -e^(-π/4) + 50 ∫₀^{π/4} e^(-x) (tan⁴⁹ x + tan⁵¹ x) dx. Rearranging: e^(-π/4) + ∫₀^{π/4} e^(-x) tan⁵⁰ x dx = 50 ∫₀^{π/4} e^(-x) (tan⁴⁹ x + tan⁵¹ x) dx. The ratio is exactly 50.",
    "topic": "Definite Integration - Reduction Formula & Integration by Parts",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 11,
    "number": 11,
    "text": "If b_n = ∫₀^{π/2} (cos²(nx) / sin x) dx, n ∈ ℕ, then which of the following is true?",
    "options": {
      "A": "b₃ - b₂, b₄ - b₃, b₅ - b₄ are in an A.P. with common difference -2",
      "B": "1/(b₃ - b₂), 1/(b₄ + b₃), 1/(b₅ - b₄) are in an A.P. with common difference -2",
      "C": "b₃ - b₂, b₄ - b₃, b₅ - b₄ are in a G.P.",
      "D": "1/(b₃ - b₂), 1/(b₄ - b₃), 1/(b₅ - b₄) are in an A.P. with common difference -2"
    },
    "correctAnswer": "D",
    "explanation": "b_n - b_{n-1} = ∫₀^{π/2} (cos(2nx) - cos(2(n-1)x))/(2 sin x) dx = ∫₀^{π/2} (-2 sin((2n-1)x) sin x)/(2 sin x) dx = -∫₀^{π/2} sin((2n-1)x) dx = [cos((2n-1)x)/(2n-1)]₀^{π/2} = -1/(2n-1). Thus 1/(b_n - b_{n-1}) = -(2n - 1). Evaluating for n = 3, 4, 5 yields -5, -7, -9, which are in A.P. with common difference d = -2.",
    "topic": "Definite Integration - Reduction Relations & Sequences",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 12,
    "number": 12,
    "text": "The value of the definite integral ∫_{-π/2}^{π/2} dx / ((1 + e^x)(sin⁶ x + cos⁶ x)) is equal to:",
    "options": {
      "A": "2π",
      "B": "0",
      "C": "π",
      "D": "π / 2"
    },
    "correctAnswer": "C",
    "explanation": "Using King's Property (x → -x): I = ∫_{-π/2}^{π/2} e^x dx / ((1 + e^x)(sin⁶ x + cos⁶ x)). Adding gives 2I = ∫_{-π/2}^{π/2} dx / (sin⁶ x + cos⁶ x) = 2 ∫₀^{π/2} dx / (sin⁶ x + cos⁶ x) => I = ∫₀^{π/2} dx / (1 - (3/4)sin² 2x) = 4 ∫₀^{π/2} dx / (4 - 3sin² 2x) = 4 * (π/4) = π.",
    "topic": "Definite Integration - King's Property ($f(a+b-x)$)",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 13,
    "number": 13,
    "text": "Let f be a real valued continuous function on [0, 1] satisfying f(x) = x + ∫₀¹ (x - t) f(t) dt. Which of the following points (x, y) lies on the curve y = f(x)?",
    "options": {
      "A": "(2, 4)",
      "B": "(4, 17)",
      "C": "(1, 2)",
      "D": "(6, 8)"
    },
    "correctAnswer": "D",
    "explanation": "Write f(x) = x(1 + ∫₀¹ f(t)dt) - ∫₀¹ t f(t)dt = αx - β. Then α = 1 + ∫₀¹ (αt - β)dt = 1 + α/2 - β => α = 2(1 - β). Also β = ∫₀¹ (αt² - βt)dt = α/3 - β/2 => 3β/2 = α/3 => α = 9β/2. Equating: 9β/2 = 2(1 - β) => 13β = 4 => β = 4/13, α = 18/13. Thus f(x) = (18x - 4)/13. For x = 6, y = f(6) = (108 - 4)/13 = 8. Hence (6, 8) lies on y = f(x).",
    "topic": "Definite Integration - Fredholm Integral Equations",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 14,
    "number": 14,
    "text": "Let f: ℝ → ℝ be defined as f(x) = a sin(π[x]/2) + [2 - x], a ∈ ℝ, where [t] is greatest integer ≤ t. If lim_{x → -1} f(x) exists, then the value of ∫₀⁴ f(x) dx is equal to:",
    "options": {
      "A": "-1",
      "B": "-2",
      "C": "1",
      "D": "2"
    },
    "correctAnswer": "B",
    "explanation": "RHL at x = -1: a sin(-π/2) + [3 - h] = -a + 2. LHL at x = -1: a sin(-π) + [3 + h] = 3. For limit to exist: -a + 2 = 3 => a = -1. Thus f(x) = -sin(π[x]/2) + [2 - x]. Over [0, 1): 0 + 1 = 1; over [1, 2): -1 + 0 = -1; over [2, 3): 0 - 1 = -1; over [3, 4): 1 - 2 = -1. Sum of integrals = 1 - 1 - 1 - 1 = -2.",
    "topic": "Definite Integration - Floor Step Functions & Continuity",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 15,
    "number": 15,
    "text": "Consider the integral I = ∫₀¹⁰ ([x] e^{[x]}) / e^{x - 1} dx, where [x] denotes greatest integer ≤ x. Then the value of I is equal to:",
    "options": {
      "A": "45(e + 1)",
      "B": "9(e - 1)",
      "C": "9(e + 1)",
      "D": "45(e - 1)"
    },
    "correctAnswer": "D",
    "explanation": "Split into sum of intervals [n, n+1] for n = 0 to 9: I = ∑_{n=0}^9 ∫_n^{n+1} n e^n e^{1-x} dx = ∑_{n=0}^9 n e^{n+1} [-e^(-x)]_n^{n+1} = ∑_{n=0}^9 n e^{n+1} (e^(-n) - e^(-n-1)) = ∑_{n=0}^9 n (e - 1) = (e - 1) ∑_{n=0}^9 n = 45(e - 1).",
    "topic": "Definite Integration - Step Functions & Series Summation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 16,
    "number": 16,
    "text": "Let f: ℝ → ℝ be defined as f(x) = e^(-x) sin x. If F: [0, 1] → ℝ is a differentiable function such that F(x) = ∫₀^x f(t) dt, then the value of ∫₀¹ (F'(x) + f(x)) e^x dx lies in the interval:",
    "options": {
      "A": "[330/360, 331/360]",
      "B": "[335/360, 336/360]",
      "C": "[327/360, 329/360]",
      "D": "[331/360, 334/360]"
    },
    "correctAnswer": "A",
    "explanation": "F'(x) = f(x) = e^(-x) sin x. Then (F'(x) + f(x))e^x = 2 e^(-x) sin x * e^x = 2 sin x. Integral I = ∫₀¹ 2 sin x dx = 2(1 - cos 1). Using Maclaurin expansion: cos 1 = 1 - 1/2! + 1/4! - 1/6! + ... = 1 - 1/2 + 1/24 - 1/720 + ... => 2(1 - cos 1) = 1 - 1/12 + 1/360 - ... = 331/360 - R. Thus the value strictly lies in [330/360, 331/360].",
    "topic": "Definite Integration - Taylor Series Bound Estimation",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 17,
    "number": 17,
    "text": "The integral ∫₆¹⁶ (log_e x²) / (log_e x² + log_e(x² - 44x + 484)) dx is equal to:",
    "options": {
      "A": "8",
      "B": "6",
      "C": "10",
      "D": "5"
    },
    "correctAnswer": "D",
    "explanation": "Notice x² - 44x + 484 = (22 - x)². Here a + b = 6 + 16 = 22. Applying King's Rule: I = ∫₆¹⁶ log_e(22 - x)² / (log_e(22 - x)² + log_e x²) dx. Adding both: 2I = ∫₆¹⁶ 1 dx = 16 - 6 = 10 => I = 5.",
    "topic": "Definite Integration - King's Rule & Symmetry",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 18,
    "number": 18,
    "text": "If I = ∫₁² dx / √(2x³ - 9x² + 12x + 4), then which bounding inequality holds?",
    "options": {
      "A": "1/6 < I² < 1/2",
      "B": "1/16 < I² < 1/9",
      "C": "1/8 < I² < 1/4",
      "D": "1/9 < I² < 1/8"
    },
    "correctAnswer": "D",
    "explanation": "Let g(x) = 2x³ - 9x² + 12x + 4. Derivative g'(x) = 6(x - 1)(x - 2) < 0 on (1, 2), so g(x) strictly decreases on [1, 2]. Maximum is g(1) = 9, minimum is g(2) = 8. Thus 1/√9 < 1/√(g(x)) < 1/√8 for all x ∈ (1, 2). Integrating over [1, 2] (interval of length 1) gives 1/3 < I < 1/√8. Squaring gives 1/9 < I² < 1/8.",
    "topic": "Definite Integration - Inequality & Monotonicity Bounds",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 19,
    "number": 19,
    "text": "The integral ∫₁^e { (x/e)^(2x) - (e/x)^x } log_e x dx is equal to:",
    "options": {
      "A": "1/2 - e - 1/e²",
      "B": "-1/2 + 1/e - 1/(2e²)",
      "C": "3/2 - 1/e - 1/(2e²)",
      "D": "3/2 - e - 1/(2e²)"
    },
    "correctAnswer": "D",
    "explanation": "Let u = (x/e)^(2x) => d/dx[(x/e)^(2x)] = 2(x/e)^(2x) ln x. Thus ∫₁^e (x/e)^(2x) ln x dx = [(1/2)(x/e)^(2x)]₁^e = (1/2)(1 - 1/e²). Similarly, d/dx[(e/x)^x] = -(e/x)^x ln x => -∫₁^e (e/x)^x ln x dx = [(e/x)^x]₁^e = 1 - e. Adding both terms: (1/2)(1 - 1/e²) + (1 - e) = 3/2 - e - 1/(2e²).",
    "topic": "Definite Integration - Special Variable Substitutions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 20,
    "number": 20,
    "text": "The value of the integral ∫_{-2}^2 (sin² x) / ([x/π] + 1/2) dx (where [x] denotes greatest integer ≤ x) is:",
    "options": {
      "A": "0",
      "B": "sin 4",
      "C": "4",
      "D": "4 - sin 4"
    },
    "correctAnswer": "A",
    "explanation": "Using property [-u] = -1 - [u] for non-integer u: f(-x) = sin²(-x) / ([-x/π] + 1/2) = sin² x / (-1 - [x/π] + 1/2) = sin² x / (-([x/π] + 1/2)) = -f(x). Thus f(x) is an odd function. The integral of any odd function over symmetric limits [-2, 2] is 0.",
    "topic": "Definite Integration - Odd and Even Functions",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 21,
    "number": 21,
    "text": "If ϕ(x) = (1/√x) ∫_{π/4}^x (4√2 sin t - 3ϕ'(t)) dt for x > 0, then ϕ'(π/4) is equal to:",
    "options": {
      "A": "8 / √π",
      "B": "4 / (6 + √π)",
      "C": "8 / (6 + √π)",
      "D": "4 / (6 - √π)"
    },
    "correctAnswer": "C",
    "explanation": "Rewrite as √x ϕ(x) = ∫_{π/4}^x (4√2 sin t - 3ϕ'(t)) dt. Differentiating both sides using product rule and Leibniz rule: (1/(2√x))ϕ(x) + √x ϕ'(x) = 4√2 sin x - 3ϕ'(x). At x = π/4: ϕ(π/4) = 0. Hence 0 + (√π/2) ϕ'(π/4) = 4√2(1/√2) - 3ϕ'(π/4) = 4 - 3ϕ'(π/4) => ((√π + 6)/2) ϕ'(π/4) = 4 => ϕ'(π/4) = 8 / (6 + √π).",
    "topic": "Definite Integration - Leibniz Rule (Differentiation under Integral)",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 22,
    "number": 22,
    "text": "The value of ∑_{n=1}^{100} ∫_{n-1}^n e^{x - [x]} dx, where [x] is greatest integer ≤ x, is:",
    "options": {
      "A": "100(1 - e)",
      "B": "100(1 + e)",
      "C": "100e",
      "D": "100(e - 1)"
    },
    "correctAnswer": "D",
    "explanation": "The fractional part function {x} = x - [x] is periodic with fundamental period 1. For every integer n, ∫_{n-1}^n e^{x - [x]} dx = ∫₀¹ e^x dx = e¹ - e⁰ = e - 1. Summing 100 identical integral segments gives 100(e - 1).",
    "topic": "Definite Integration - Periodic Functions",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 23,
    "number": 23,
    "text": "If [x] is greatest integer ≤ x, then the value of π² ∫₀² [sin(πx/2)] (x - [x])^{[x]} dx is equal to:",
    "options": {
      "A": "4(π + 1)",
      "B": "4(π - 1)",
      "C": "2(π + 1)",
      "D": "2(π - 1)"
    },
    "correctAnswer": "B",
    "explanation": "Split at x = 1: I = π² [ ∫₀¹ sin(πx/2) * x⁰ dx + ∫₁² sin(πx/2) * (x - 1)¹ dx ]. For first integral: π² [- (2/π) cos(πx/2)]₀¹ = 2π. For second integral by parts: π² [ (x - 1)(-2/π cos(πx/2)) ]₁² + π² ∫₁² (2/π) cos(πx/2) dx = 2π + 4[sin(πx/2)]₁² = 2π + 4(0 - 1) = 2π - 4. Total = 2π + 2π - 4 = 4π - 4 = 4(π - 1).",
    "topic": "Definite Integration - Discontinuous Integrands",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 24,
    "number": 24,
    "text": "The limit lim_{x → 0} (∫₀^x t sin(10t) dt) / x is equal to:",
    "options": {
      "A": "-1/10",
      "B": "1/10",
      "C": "-1/5",
      "D": "0"
    },
    "correctAnswer": "D",
    "explanation": "Using L'Hopital's Rule with Leibniz Rule: lim_{x → 0} (d/dx ∫₀^x t sin(10t) dt) / (d/dx x) = lim_{x → 0} (x sin(10x)) / 1 = 0 * 0 = 0.",
    "topic": "Definite Integration - Limits with Leibniz Rule",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 25,
    "number": 25,
    "text": "If ∫₀¹ (x²¹ + x¹⁴ + x⁷)(2x¹⁴ + 3x⁷ + 6)^{1/7} dx = (1/l)(11)^{m/n}, where l, m, n ∈ ℕ and m, n are coprime, then l + m + n is equal to:",
    "options": {
      "A": "56",
      "B": "63",
      "C": "72",
      "D": "48"
    },
    "correctAnswer": "B",
    "explanation": "Multiply x inside the radical: (x²¹ + x¹⁴ + x⁷)(2x¹⁴ + 3x⁷ + 6)^{1/7} = (x²⁰ + x¹³ + x⁶)(2x²¹ + 3x¹⁴ + 6x⁷)^{1/7}. Let t = 2x²¹ + 3x¹⁴ + 6x⁷ => dt = 42(x²⁰ + x¹³ + x⁶) dx. At x = 0, t = 0; at x = 1, t = 11. Integral = (1/42) ∫₀¹¹ t^{1/7} dt = (1/42) * (7/8) [t^{8/7}]₀¹¹ = (1/48)(11)^{8/7}. Thus l = 48, m = 8, n = 7 => l + m + n = 48 + 8 + 7 = 63.",
    "topic": "Definite Integration - Power Factorization Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 26,
    "number": 26,
    "text": "The value of the definite integral (24/π) ∫₀^{√2} ((2 - x²) / ((2 + x²)√(4 + x⁴))) dx is equal to:",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "Divide numerator and denominator by x²: (24/π) ∫₀^{√2} (2/x² - 1) / ((x + 2/x)√(x² + 4/x²)) dx. Let t = x + 2/x => dt = (1 - 2/x²) dx. Then x² + 4/x² = t² - 4. Limits: x → 0⁺ gives t → ∞, x = √2 gives t = 2√2. Integral = (24/π) ∫_{2√2}^∞ dt / (t√(t² - 4)) = (24/π) [(1/2)sec⁻¹(t/2)]_{2√2}^∞ = (12/π)[sec⁻¹(∞) - sec⁻¹(√2)] = (12/π)[π/2 - π/4] = (12/π)(π/4) = 3.",
    "topic": "Definite Integration - Euler Inverse Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 27,
    "number": 27,
    "text": "If ∫_{-0.15}^{0.15} |100x² - 1| dx = k / 3000, then the integer k is equal to:",
    "options": {
      "A": "450",
      "B": "575",
      "C": "625",
      "D": "525"
    },
    "correctAnswer": "B",
    "explanation": "Since |100x² - 1| is even, integral = 2 ∫₀^{0.15} |100x² - 1| dx. Root is at x = 0.1. Split at 0.1: 2 [ ∫₀^{0.1} (1 - 100x²) dx + ∫_{0.1}^{0.15} (100x² - 1) dx ] = 2[ (0.1 - 100(0.001)/3) + (100(0.003375 - 0.001)/3 - 0.05) ] = 2[ 0.2/3 + 0.1125 - 0.15 ] = 575/3000. Hence k = 575.",
    "topic": "Definite Integration - Modulus Function Integration",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 28,
    "number": 28,
    "text": "Let [t] denote greatest integer ≤ t. Then I = (2/π) ∫_{π/6}^{5π/6} (8[csc x] - 5[cot x]) dx is equal to:",
    "options": {
      "A": "10",
      "B": "12",
      "C": "14",
      "D": "16"
    },
    "correctAnswer": "C",
    "explanation": "For csc x on [π/6, 5π/6]: csc x ∈ [1, 2], so [csc x] = 1 on (π/6, 5π/6). Integral = 8 * (5π/6 - π/6) = 16π/3. For cot x: on [π/6, π/4), [cot x] = 1; on [π/4, π/2), [cot x] = 0; on [π/2, 3π/4), [cot x] = -1; on [3π/4, 5π/6], [cot x] = -2. Integral of [cot x] = 1(π/12) + 0 - 1(π/4) - 2(π/12) = -π/3. Value = (2/π)[16π/3 - 5(-π/3)] = (2/π)(21π/3) = 14.",
    "topic": "Definite Integration - Floor of Trigonometric Functions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 29,
    "number": 29,
    "text": "If ∫₀^{√3} (15x³) / (√(1 + x²) + √((1 + x²)³)) dx = α√2 + β√3, where α, β are integers, then α + β is equal to:",
    "options": {
      "A": "8",
      "B": "10",
      "C": "12",
      "D": "15"
    },
    "correctAnswer": "B",
    "explanation": "Put 1 + x² = t² => 2x dx = 2t dt with t from 1 to 2. Integral = 15 ∫₁² (t² - 1)t dt / (t + t³) = 15 ∫₁² (t² - 1) / (1 + t²) dt... Substituting 1 + t = u² evaluates to 16√2 - 6√3. Comparing with α√2 + β√3 gives α = 16, β = -6. Thus α + β = 16 + (-6) = 10.",
    "topic": "Definite Integration - Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 30,
    "number": 30,
    "text": "Let α = max_{0 ≤ x ≤ 2}{(9 - x²)/(5 - x)} and β = min_{0 ≤ x ≤ 2}{(9 - x²)/(5 - x)}. If ∫_{β - 8/3}^{2α - 1} max{(9 - x²)/(5 - x), x} dx = α₁ + α₂ log_e(8/15), then α₁ + α₂ is equal to:",
    "options": {
      "A": "28",
      "B": "34",
      "C": "32",
      "D": "36"
    },
    "correctAnswer": "B",
    "explanation": "Let y = (9 - x²)/(5 - x) = x + 5 + 16/(x - 5). dy/dx = 1 - 16/(x - 5)² = 0 => x = 1 in [0, 2]. y(0) = 9/5, y(1) = 2, y(2) = 5/3. Thus α = 2, β = 5/3. Lower limit = 5/3 - 8/3 = -1, upper limit = 2(2) - 1 = 3. max{(9 - x²)/(5 - x), x} is (9 - x²)/(5 - x) on [-1, 9/5] and x on [9/5, 3]. Evaluating gives 18 + 16 ln(8/15) => α₁ = 18, α₂ = 16 => α₁ + α₂ = 34.",
    "topic": "Definite Integration - Optimization & Max/Min Integrals",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 31,
    "number": 31,
    "text": "Let f(x) and g(x) be two functions satisfying f(x²) + g(4 - x) = 4x³ and g(4 - x) + g(x) = 0. The value of ∫_{-4}^4 f(x²) dx is:",
    "options": {
      "A": "256",
      "B": "512",
      "C": "128",
      "D": "1024"
    },
    "correctAnswer": "B",
    "explanation": "I = ∫_{-4}^4 f(x²) dx = 2 ∫₀⁴ f(x²) dx. By King's rule: I = 2 ∫₀⁴ f((4 - x)²) dx. Adding both: 2I = 2 ∫₀⁴ [f(x²) + f((4 - x)²)] dx => I = ∫₀⁴ [f(x²) + f((4 - x)²)] dx. From given conditions: f(x²) + g(4 - x) = 4x³ and f((4 - x)²) + g(x) = 4(4 - x)³. Adding equations: f(x²) + f((4 - x)²) + [g(4 - x) + g(x)] = 4[x³ + (4 - x)³]. Since g(4 - x) + g(x) = 0, f(x²) + f((4 - x)²) = 4[x³ + (4 - x)³]. Integral I = 4 ∫₀⁴ [x³ + (4 - x)³] dx = 4 * 128 = 512.",
    "topic": "Definite Integration - Functional Equations & King's Rule",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 32,
    "number": 32,
    "text": "Let {x} and [x] denote the fractional part and greatest integer ≤ x. If ∫₀ⁿ {x} dx, ∫₀ⁿ [x] dx and 10(n² - n) (n ∈ ℕ, n > 1) are three consecutive terms of a G.P., then n is equal to:",
    "options": {
      "A": "19",
      "B": "21",
      "C": "23",
      "D": "25"
    },
    "correctAnswer": "B",
    "explanation": "∫₀ⁿ {x} dx = n ∫₀¹ x dx = n/2. ∫₀ⁿ [x] dx = n(n - 1)/2. For G.P.: [n(n - 1)/2]² = (n/2) * 10(n² - n) => (n² - n)² / 4 = 5n(n² - n). Since n > 1, n² - n ≠ 0: (n² - n)/4 = 5n => n - 1 = 20 => n = 21.",
    "topic": "Definite Integration - Geometric Progression with Floor Functions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 33,
    "number": 33,
    "text": "Let I(x) = ∫ (x²(x sec² x + tan x) / (x tan x + 1)²) dx. If I(0) = 0, then I(π/4) is equal to:",
    "options": {
      "A": "log_e(((π + 4)²)/16) - π²/(4(π + 4))",
      "B": "log_e(((π + 4)²)/16) + π²/(4(π + 4))",
      "C": "log_e(((π + 4)²)/32) - π²/(4(π + 4))",
      "D": "log_e(((π + 4)²)/32) + π²/(4(π + 4))"
    },
    "correctAnswer": "C",
    "explanation": "Notice (x sec² x + tan x) dx = d(x tan x + 1). Integrating by parts: u = x², dv = (x sec² x + tan x)/(x tan x + 1)² dx => I(x) = -x²/(x tan x + 1) + ∫ (2x/(x tan x + 1)) dx = -x²/(x tan x + 1) + 2 ∫ (x cos x / (x sin x + cos x)) dx = -x²/(x tan x + 1) + 2 ln|x sin x + cos x| + C. Since I(0) = 0 => C = 0. At x = π/4: I(π/4) = - (π²/16) / (π/4 + 1) + 2 ln|(π/4)(1/√2) + 1/√2| = -π²/(4(π + 4)) + log_e(((π + 4)²)/32).",
    "topic": "Indefinite Integration - Integration by Parts & Trigonometric",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 34,
    "number": 34,
    "text": "Let f(x) = ∫ (2x / ((x² + 1)(x² + 3))) dx. If f(3) = (1/2)(log_e 5 - log_e 6), then f(4) is equal to:",
    "options": {
      "A": "(1/2)(log_e 17 - log_e 19)",
      "B": "log_e 17 - log_e 18",
      "C": "(1/2)(log_e 19 - log_e 17)",
      "D": "log_e 19 - log_e 20"
    },
    "correctAnswer": "A",
    "explanation": "Put x² = u => 2x dx = du. ∫ du / ((u + 1)(u + 3)) = (1/2) ∫ [1/(u + 1) - 1/(u + 3)] du = (1/2) ln((x² + 1)/(x² + 3)) + C. f(3) = (1/2) ln(10/12) + C = (1/2)(ln 5 - ln 6) + C. Given f(3) = (1/2)(ln 5 - ln 6) => C = 0. Thus f(4) = (1/2) ln(17/19) = (1/2)(log_e 17 - log_e 19).",
    "topic": "Indefinite Integration - Partial Fractions",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 35,
    "number": 35,
    "text": "The indefinite integral ∫ ((1 - 1/√3)(cos x - sin x) / (1 + (2/√3)sin 2x)) dx is equal to:",
    "options": {
      "A": "(1/2) log_e | tan(x/2 + π/12) / tan(x/2 + π/6) | + C",
      "B": "(1/2) log_e | tan(x/2 + π/6) / tan(x/2 + π/3) | + C",
      "C": "log_e | tan(x/2 + π/12) / tan(x/2 + π/2) | + C",
      "D": "(1/2) log_e | tan(x/2 - π/12) / tan(x/2 - π/6) | + C"
    },
    "correctAnswer": "A",
    "explanation": "Using standard trigonometric sum-to-product transforms: (cos x - sin x) = √2 sin(π/4 - x), and 1 + (2/√3)sin 2x = (2/√3)(sin(π/3) + sin 2x) = (4/√3) sin(x + π/6) cos(x - π/6). Converting the integrand leads to (1/2)[csc(x + π/6) - sec(π/6 - x)] dx. Integrating yields (1/2) log_e | tan(x/2 + π/12) / tan(x/2 + π/6) | + C.",
    "topic": "Indefinite Integration - Trigonometric Transformations",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 36,
    "number": 36,
    "text": "If ∫ ((cos x - sin x) / √(8 - sin 2x)) dx = a sin⁻¹((sin x + cos x)/b) + c, where c is a constant of integration, then the ordered pair (a, b) is equal to:",
    "options": {
      "A": "(-1, 3)",
      "B": "(1, -3)",
      "C": "(3, 1)",
      "D": "(1, 3)"
    },
    "correctAnswer": "D",
    "explanation": "Note that (sin x + cos x)² = 1 + sin 2x => sin 2x = (sin x + cos x)² - 1. Thus 8 - sin 2x = 9 - (sin x + cos x)². Put t = sin x + cos x => dt = (cos x - sin x) dx. ∫ dt / √(3² - t²) = sin⁻¹(t/3) + c = sin⁻¹((sin x + cos x)/3) + c. Comparing gives a = 1, b = 3, so (a, b) = (1, 3).",
    "topic": "Indefinite Integration - Standard Inverse Sine Form",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 37,
    "number": 37,
    "text": "If ∫ (e²ˣ + 2eˣ - e⁻ˣ - 1) e^{(eˣ + e⁻ˣ)} dx = g(x) e^{(eˣ + e⁻ˣ)} + c, where c is a constant of integration, then g(0) is equal to:",
    "options": {
      "A": "e²",
      "B": "1",
      "C": "2",
      "D": "e"
    },
    "correctAnswer": "C",
    "explanation": "Let eˣ = t => dx = dt/t. The integral becomes ∫ (t² + 2t - 1/t - 1) e^{(t + 1/t)} (dt/t) = ∫ (t + 2 - 1/t² - 1/t) e^{(t + 1/t)} dt = ∫ [ (t + 1)(1 - 1/t²) + 1 ] e^{(t + 1/t)} dt. Integrating by parts yields (t + 1) e^{(t + 1/t)} + c = (eˣ + 1) e^{(eˣ + e⁻ˣ)} + c. Thus g(x) = eˣ + 1, so g(0) = e⁰ + 1 = 2.",
    "topic": "Indefinite Integration - Exponential Substitutions",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 38,
    "number": 38,
    "text": "The indefinite integral ∫ ((2x³ - 1) / (x⁴ + x)) dx is equal to:",
    "options": {
      "A": "log_e | (x³ + 1) / x | + C",
      "B": "(1/2) log_e | (x³ + 1)² / x³ | + C",
      "C": "(1/2) log_e | (x³ + 1) / x² | + C",
      "D": "log_e | (x³ + 1) / x² | + C"
    },
    "correctAnswer": "A",
    "explanation": "Divide numerator and denominator by x²: ∫ (2x - 1/x²) / (x² + 1/x) dx. Let u = x² + 1/x => du = (2x - 1/x²) dx. Then the integral is ∫ du/u = ln|u| + C = ln|x² + 1/x| + C = log_e |(x³ + 1)/x| + C.",
    "topic": "Indefinite Integration - Algebraic Manipulation & Logarithmic Form",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 39,
    "number": 39,
    "text": "The integral ∫ (sin(5x/2) / sin(x/2)) dx is equal to:",
    "options": {
      "A": "2x + sin x + 2sin 2x + c",
      "B": "x + 2sin x + 2sin 2x + c",
      "C": "x + 2sin x + sin 2x + c",
      "D": "2x + sin x + sin 2x + c"
    },
    "correctAnswer": "C",
    "explanation": "Multiply numerator and denominator by 2 cos(x/2): ∫ (2 sin(5x/2) cos(x/2) / (2 sin(x/2) cos(x/2))) dx = ∫ ((sin 3x + sin 2x) / sin x) dx = ∫ ((3 sin x - 4 sin³ x + 2 sin x cos x) / sin x) dx = ∫ (3 - 4 sin² x + 2 cos x) dx = ∫ (3 - 2(1 - cos 2x) + 2 cos x) dx = ∫ (1 + 2 cos 2x + 2 cos x) dx = x + sin 2x + 2 sin x + c.",
    "topic": "Indefinite Integration - Trigonometric Sum-to-Product",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 40,
    "number": 40,
    "text": "If ∫ dx / (x³ (1 + x⁶)^{2/3}) = x f(x)(1 + x⁶)^{1/3} + C, then the function f(x) is equal to:",
    "options": {
      "A": "-1 / (6x³)",
      "B": "3 / x²",
      "C": "-1 / (2x²)",
      "D": "-1 / (2x³)"
    },
    "correctAnswer": "D",
    "explanation": "Take x⁶ out of the radical: ∫ dx / (x⁷ (1 + 1/x⁶)^{2/3}). Let t = 1 + 1/x⁶ => dt = (-6/x⁷) dx. Integral = (-1/6) ∫ t^{-2/3} dt = (-1/6) * 3 t^{1/3} + C = -(1/2)(1 + 1/x⁶)^{1/3} + C = -(1/(2x²)) (x⁶ + 1)^{1/3} + C. Comparing with x f(x)(1 + x⁶)^{1/3} => x f(x) = -1/(2x²) => f(x) = -1/(2x³).",
    "topic": "Indefinite Integration - Fractional Power Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 41,
    "number": 41,
    "text": "If I(x) = ∫ e^{sin² x} (cos x sin 2x - sin x) dx and I(0) = 1, then I(π/3) is equal to:",
    "options": {
      "A": "-(1/2) e^(3/4)",
      "B": "e^(3/4)",
      "C": "(1/2) e^(3/4)",
      "D": "-e^(3/4)"
    },
    "correctAnswer": "C",
    "explanation": "Rewrite as ∫ e^{sin² x} cos x (2 sin x cos x) dx - ∫ e^{sin² x} sin x dx. In first part, let u = cos x, dv = e^{sin² x} sin 2x dx => v = e^{sin² x}. Integrating by parts gives cos x e^{sin² x} + ∫ sin x e^{sin² x} dx - ∫ e^{sin² x} sin x dx = e^{sin² x} cos x + c. Since I(0) = 1 => 1 * 1 + c = 1 => c = 0. Thus I(x) = e^{sin² x} cos x. At x = π/3: I(π/3) = e^{3/4} cos(π/3) = (1/2) e^(3/4).",
    "topic": "Indefinite Integration - Integration by Parts with Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 42,
    "number": 42,
    "text": "Let I_n(x) = ∫₀^x 1 / (t² + 5)ⁿ dt for n = 1, 2, 3, ... Then which relation holds for n = 5?",
    "options": {
      "A": "50 I₆ - 9 I₅ = x I'₅",
      "B": "50 I₆ - 11 I₅ = x I'₅",
      "C": "50 I₆ - 9 I₅ = I'₅",
      "D": "50 I₆ - 11 I₅ = I'₅"
    },
    "correctAnswer": "A",
    "explanation": "Applying integration by parts on I_n(x): I_n(x) = [t/(t² + 5)ⁿ]₀^x + 2n ∫₀^x t² / (t² + 5)^{n+1} dt = x/(x² + 5)ⁿ + 2n ∫₀^x ((t² + 5) - 5) / (t² + 5)^{n+1} dt = x/(x² + 5)ⁿ + 2n I_n(x) - 10n I_{n+1}(x). Rearranging gives 10n I_{n+1}(x) + (1 - 2n) I_n(x) = x/(x² + 5)ⁿ = x I'_n(x). Putting n = 5 gives 50 I₆ - 9 I₅ = x I'₅.",
    "topic": "Indefinite/Reduction - Integral Reduction Formula",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 43,
    "number": 43,
    "text": "The value of the integral ∫ (sin θ sin 2θ (sin⁶θ + sin⁴θ + sin²θ) √(2sin⁴θ + 3sin²θ + 6)) / (1 - cos 2θ) dθ is:",
    "options": {
      "A": "(1/18)[9 - 2sin⁶θ - 3sin⁴θ - 6sin²θ]^(3/2) + c",
      "B": "(1/18)[11 - 18cos²θ + 9cos⁴θ - 2cos⁶θ]^(3/2) + c",
      "C": "(1/18)[11 - 18sin²θ + 9sin⁴θ - 2sin⁶θ]^(3/2) + c",
      "D": "(1/18)[9 - 2cos⁶θ + 3cos⁴θ - 6cos²θ]^(3/2) + c"
    },
    "correctAnswer": "B",
    "explanation": "Using 1 - cos 2θ = 2 sin²θ and sin 2θ = 2 sin θ cos θ: the denominator simplifies with the sine terms leaving (sin⁵θ + sin³θ + sin θ) √(2sin⁴θ + 3sin²θ + 6) (cos θ dθ). Let t = sin θ => (t⁵ + t³ + t) √(2t⁴ + 3t² + 6) dt = (t⁴ + t² + 1) √(2t⁶ + 3t⁴ + 6t²) dt. Put 2t⁶ + 3t⁴ + 6t² = z => dz = 12(t⁵ + t³ + t) dt. Integrating gives (1/18)(2sin⁶θ + 3sin⁴θ + 6sin²θ)^(3/2) + c. In terms of cos²θ, this is (1/18)[11 - 18cos²θ + 9cos⁴θ - 2cos⁶θ]^(3/2) + c.",
    "topic": "Indefinite Integration - Advanced Trigonometric & Algebraic Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 44,
    "number": 44,
    "text": "If ∫ sin⁻¹(√(x / (1 + x))) dx = A(x) tan⁻¹(√x) + B(x) + C, where C is a constant of integration, then the ordered pair (A(x), B(x)) can be:",
    "options": {
      "A": "(x + 1, -√x)",
      "B": "(x + 1, √x)",
      "C": "(x - 1, -√x)",
      "D": "(x - 1, √x)"
    },
    "correctAnswer": "A",
    "explanation": "Let x = tan²θ => dx = 2 tan θ sec²θ dθ. Then sin⁻¹(√(tan²θ / sec²θ)) = sin⁻¹(sin θ) = θ. Integral = ∫ θ (2 tan θ sec²θ dθ) = θ tan²θ - ∫ tan²θ dθ = θ tan²θ - (tan θ - θ) = (tan²θ + 1)θ - tan θ + C = (x + 1) tan⁻¹(√x) - √x + C. Comparing gives A(x) = x + 1, B(x) = -√x.",
    "topic": "Indefinite Integration - Inverse Trigonometric by Parts",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 45,
    "number": 45,
    "text": "Let α ∈ (0, π/2) be fixed. If ∫ ((tan x + tan α) / (tan x - tan α)) dx = A(x) cos 2α + B(x) sin 2α + C, then the functions A(x) and B(x) are respectively:",
    "options": {
      "A": "x - α and log_e|cos(x - α)|",
      "B": "x + α and log_e|sin(x - α)|",
      "C": "x - α and log_e|sin(x - α)|",
      "D": "x + α and log_e|sin(x + α)|"
    },
    "correctAnswer": "C",
    "explanation": "Convert tan to sin/cos: (tan x + tan α)/(tan x - tan α) = sin(x + α)/sin(x - α). Let t = x - α => x + α = t + 2α. Integral = ∫ (sin(t + 2α) / sin t) dt = ∫ [cos 2α + cot t sin 2α] dt = t cos 2α + ln|sin t| sin 2α + C = (x - α) cos 2α + log_e|sin(x - α)| sin 2α + C. Thus A(x) = x - α, B(x) = log_e|sin(x - α)|.",
    "topic": "Indefinite Integration - Trigonometric Identity Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 46,
    "number": 46,
    "text": "If ∫ x⁵ e^{-x²} dx = g(x) e^{-x²} + c, where c is a constant of integration, then g(-1) is equal to:",
    "options": {
      "A": "-5/2",
      "B": "1",
      "C": "-1/2",
      "D": "-1"
    },
    "correctAnswer": "A",
    "explanation": "Let x² = u => 2x dx = du. Integral = (1/2) ∫ u² e^{-u} du. Integrating by parts: (1/2)[ -u² e^{-u} - 2u e^{-u} - 2e^{-u} ] + c = -(1/2)(u² + 2u + 2) e^{-u} + c = -(1/2)(x⁴ + 2x² + 2) e^{-x²} + c. Thus g(x) = -(x⁴/2 + x² + 1). Evaluating at x = -1: g(-1) = -(1/2 + 1 + 1) = -5/2.",
    "topic": "Indefinite Integration - Integration by Parts with Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 47,
    "number": 47,
    "text": "The integral ∫ (e^{3 log_e 2x} + 5e^{2 log_e 2x}) / (e^{4 log_e x} + 5e^{3 log_e x} - 7e^{2 log_e x}) dx for x > 0 is equal to:",
    "options": {
      "A": "(1/4) log_e |x² + 5x - 7| + c",
      "B": "4 log_e |x² + 5x - 7| + c",
      "C": "log_e √(x² + 5x - 7) + c",
      "D": "log_e |x² + 5x - 7| + c"
    },
    "correctAnswer": "B",
    "explanation": "Simplify the logarithmic exponentials: e^{3 ln 2x} = (2x)³ = 8x³, e^{2 ln 2x} = 4x²; e^{4 ln x} = x⁴, e^{3 ln x} = x³, e^{2 ln x} = x². Numerator = 8x³ + 20x² = 4x²(2x + 5). Denominator = x⁴ + 5x³ - 7x² = x²(x² + 5x - 7). Integral = 4 ∫ ((2x + 5) / (x² + 5x - 7)) dx = 4 log_e |x² + 5x - 7| + c.",
    "topic": "Indefinite Integration - Logarithmic Exponentials Simplification",
    "difficulty": "Medium-Hard",
    "image": null
  },
  {
    "id": 48,
    "number": 48,
    "text": "The integral ∫ dx / ⁴√((x - 1)³ (x + 2)⁵) is equal to:",
    "options": {
      "A": "(4/3)((x - 1)/(x + 2))^(5/4) + C",
      "B": "(3/4)((x + 2)/(x - 1))^(5/4) + C",
      "C": "(4/3)((x - 1)/(x + 2))^(1/4) + C",
      "D": "(3/4)((x + 2)/(x - 1))^(1/4) + C"
    },
    "correctAnswer": "C",
    "explanation": "Divide denominator by (x + 2)² = (x + 2)^(8/4): ∫ dx / ( ((x - 1)/(x + 2))^(3/4) (x + 2)² ). Let t = (x - 1)/(x + 2) => dt = (3/(x + 2)²) dx. Integral = (1/3) ∫ t^{-3/4} dt = (1/3) * 4 t^{1/4} + C = (4/3) ((x - 1)/(x + 2))^(1/4) + C.",
    "topic": "Indefinite Integration - Fractional Linear Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 49,
    "number": 49,
    "text": "If ∫ dθ / (cos²θ (tan 2θ + sec 2θ)) = λ tan θ + 2 log_e|f(θ)| + C, where C is a constant of integration, then the ordered pair (λ, f(θ)) is equal to:",
    "options": {
      "A": "(1, 1 + tan θ)",
      "B": "(-1, 1 - tan θ)",
      "C": "(-1, 1 + tan θ)",
      "D": "(1, 1 - tan θ)"
    },
    "correctAnswer": "C",
    "explanation": "tan 2θ + sec 2θ = (1 + sin 2θ)/cos 2θ = (cos θ + sin θ)² / (cos²θ - sin²θ) = (1 + tan θ)/(1 - tan θ). Integral = ∫ sec²θ ((1 - tan θ)/(1 + tan θ)) dθ. Let t = tan θ => dt = sec²θ dθ. ∫ ((1 - t)/(1 + t)) dt = ∫ (-1 + 2/(1 + t)) dt = -t + 2 ln|1 + t| + C = -tan θ + 2 log_e|1 + tan θ| + C. Thus λ = -1, f(θ) = 1 + tan θ.",
    "topic": "Indefinite Integration - Multiple Angle Identities",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 50,
    "number": 50,
    "text": "Let f(x) = ∫ (√x / (1 + x)²) dx for x > 0. Then f(3) - f(1) is equal to:",
    "options": {
      "A": "π/12 + 1/2 - √3/4",
      "B": "-π/6 + 1/2 + √3/4",
      "C": "-π/12 + 1/2 + √3/4",
      "D": "π/6 + 1/2 - √3/4"
    },
    "correctAnswer": "A",
    "explanation": "Put x = tan²θ => dx = 2 tan θ sec²θ dθ. Integral = ∫ (tan θ / sec⁴θ) (2 tan θ sec²θ) dθ = 2 ∫ sin²θ dθ = ∫ (1 - cos 2θ) dθ = θ - (1/2) sin 2θ + c = θ - tan θ/(1 + tan²θ) + c = tan⁻¹(√x) - √x/(1 + x) + c. f(3) - f(1) = [tan⁻¹(√3) - √3/4] - [tan⁻¹(1) - 1/2] = (π/3 - √3/4) - (π/4 - 1/2) = π/12 + 1/2 - √3/4.",
    "topic": "Indefinite Integration - Trigonometric Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 51,
    "number": 51,
    "text": "The indefinite integral ∫ dx / ((x + 4)^(8/7) (x - 3)^(6/7)) is equal to:",
    "options": {
      "A": "((x - 3)/(x + 4))^(1/7) + C",
      "B": "-(1/13)((x - 3)/(x + 4))^(-13/7) + C",
      "C": "(1/2)((x - 3)/(x + 4))^(3/7) + C",
      "D": "-((x - 3)/(x + 4))^(-1/7) + C"
    },
    "correctAnswer": "A",
    "explanation": "Divide denominator by (x + 4)^2: ∫ dx / ( ((x - 3)/(x + 4))^(6/7) (x + 4)² ). Let t = (x - 3)/(x + 4) => dt = (7/(x + 4)²) dx. Integral = (1/7) ∫ t^{-6/7} dt = (1/7) * 7 t^{1/7} + C = ((x - 3)/(x + 4))^(1/7) + C.",
    "topic": "Indefinite Integration - Fractional Linear Transformation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 52,
    "number": 52,
    "text": "For x² ≠ nπ + 1 (n ∈ ℕ), the integral ∫ x √((2 sin(x² - 1) - sin 2(x² - 1)) / (2 sin(x² - 1) + sin 2(x² - 1))) dx is equal to:",
    "options": {
      "A": "(1/2) log_e |sec(x² - 1)| + c",
      "B": "(1/2) log_e |sec((x² - 1)/2)| + c",
      "C": "(1/2) log_e |sec²((x² - 1)/2)| + c",
      "D": "log_e |sec((x² - 1)/2)| + c"
    },
    "correctAnswer": "D",
    "explanation": "Let θ = x² - 1. (2 sin θ - sin 2θ)/(2 sin θ + sin 2θ) = (2 sin θ (1 - cos θ))/(2 sin θ (1 + cos θ)) = (2 sin²(θ/2))/(2 cos²(θ/2)) = tan²(θ/2). Square root gives tan((x² - 1)/2). The integral is ∫ x tan((x² - 1)/2) dx. Let t = (x² - 1)/2 => dt = x dx. ∫ tan t dt = ln|sec t| + c = log_e |sec((x² - 1)/2)| + c.",
    "topic": "Indefinite Integration - Half-Angle Formula & Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 53,
    "number": 53,
    "text": "If f(x) = ∫ ((5x⁸ + 7x⁶) / (x² + 1 + 2x⁷)²) dx for x ≥ 0 and f(0) = 0, then the value of f(1) is:",
    "options": {
      "A": "-1/2",
      "B": "1/2",
      "C": "-1/4",
      "D": "1/4"
    },
    "correctAnswer": "D",
    "explanation": "Divide numerator and denominator by x¹⁴: ∫ ((5x⁻⁶ + 7x⁻⁸) / (x⁻⁵ + x⁻⁷ + 2)²) dx. Let t = x⁻⁵ + x⁻⁷ + 2 => dt = (-5x⁻⁶ - 7x⁻⁸) dx. Integral = -∫ dt/t² = 1/t + C = 1 / (x⁻⁵ + x⁻⁷ + 2) + C = x⁷ / (2x⁷ + x² + 1) + C. Since f(0) = 0 => C = 0. f(1) = 1 / (2 + 1 + 1) = 1/4.",
    "topic": "Indefinite Integration - Leading Power Division Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 54,
    "number": 54,
    "text": "Let n ≥ 2 be a natural number and 0 < θ < π/2. Then ∫ ((sinⁿθ - sin θ)^(1/n) cos θ / sin^{n+1}θ) dθ is equal to:",
    "options": {
      "A": "(n / (n² - 1)) (1 - 1/sin^{n-1}θ)^((n+1)/n) + C",
      "B": "(n / (n² + 1)) (1 - 1/sin^{n-1}θ)^((n+1)/n) + C",
      "C": "(n / (n² - 1)) (1 + 1/sin^{n-1}θ)^((n+1)/n) + C",
      "D": "(n / (n² - 1)) (1 - 1/sin^{n+1}θ)^((n+1)/n) + C"
    },
    "correctAnswer": "A",
    "explanation": "Factor out sin θ from radical: (sinⁿθ(1 - 1/sin^{n-1}θ))^(1/n) = sin θ (1 - 1/sin^{n-1}θ)^(1/n). The integral is ∫ (1 - 1/sin^{n-1}θ)^(1/n) (cos θ / sinⁿθ) dθ. Let u = 1 - 1/sin^{n-1}θ => du = ((n - 1) cos θ / sinⁿθ) dθ. Integral = (1/(n - 1)) ∫ u^(1/n) du = (1/(n - 1)) * (n/(n + 1)) u^{(n+1)/n} + C = (n / (n² - 1)) (1 - 1/sin^{n-1}θ)^((n+1)/n) + C.",
    "topic": "Indefinite Integration - Power Manipulation Substitution",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 55,
    "number": 55,
    "text": "If ∫₀¹ 1 / ((5 + 2x - 2x²)(1 + e^{2 - 4x})) dx = (1/α) log_e((α + 1)/β) with α, β > 0, then α⁴ - β⁴ is equal to:",
    "options": {
      "A": "21",
      "B": "0",
      "C": "19",
      "D": "-21"
    },
    "correctAnswer": "A",
    "explanation": "Let I = ∫₀¹ dx / ((5 + 2x - 2x²)(1 + e^{2-4x})). Applying King's Rule (x → 1 - x), 5 + 2(1-x) - 2(1-x)² = 5 + 2x - 2x², and 2 - 4(1 - x) = -(2 - 4x). Thus I = ∫₀¹ e^{2-4x} dx / ((5 + 2x - 2x²)(1 + e^{2-4x})). Adding both gives 2I = ∫₀¹ dx / (5 + 2x - 2x²) = (1/2) ∫₀¹ dx / (11/4 - (x - 1/2)²) = (1/2) * (1/√11) [ln|(√11/2 + x - 1/2)/(√11/2 - x + 1/2)|]₀¹ = (1/√11) ln((√11 + 1)/√10). Thus α = √11, β = √10 => α⁴ - β⁴ = (11)² - (10)² = 121 - 100 = 21.",
    "topic": "Definite/Indefinite - Quadratic Inversion & King's Property",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 56,
    "number": 56,
    "text": "The value of the definite integral ∫₀¹ (√x dx) / ((1 + x)(1 + 3x)(3 + x)) is equal to:",
    "options": {
      "A": "(π/4)(1 - √3/6)",
      "B": "(π/8)(1 - √3/2)",
      "C": "(π/4)(1 - √3/2)",
      "D": "(π/8)(1 - √3/6)"
    },
    "correctAnswer": "B",
    "explanation": "Put x = t² => dx = 2t dt with t from 0 to 1. Integral I = ∫₀¹ (2t² dt) / ((t² + 1)(3t² + 1)(t² + 3)). Partial fraction decomposition yields (1/2) ∫₀¹ dt/(t² + 1) - (1/(8√3)) ∫₀¹ (√3 dt)/(3t² + 1) - (3/(8√3)) ∫₀¹ dt/(t² + 3)... Evaluating yields (1/2)(π/4) - (1/8)(π/6) - (3/8)(π/6) = π/8 - π√3/16 = (π/8)(1 - √3/2).",
    "topic": "Integration - Partial Fraction Decomposition with Radical",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 57,
    "number": 57,
    "text": "If ∫ ((2eˣ + 3e⁻ˣ) / (4eˣ + 7e⁻ˣ)) dx = (1/14)(u x + v log_e(4eˣ + 7e⁻ˣ)) + C, where C is a constant of integration, then u + v is equal to:",
    "options": {
      "A": "7",
      "B": "14",
      "C": "17",
      "D": "21"
    },
    "correctAnswer": "A",
    "explanation": "Write numerator 2eˣ + 3e⁻ˣ = A(4eˣ + 7e⁻ˣ) + B d/dx(4eˣ + 7e⁻ˣ) = A(4eˣ + 7e⁻ˣ) + B(4eˣ - 7e⁻ˣ). Equating coefficients: 4A + 4B = 2 => A + B = 1/2. 7A - 7B = 3 => A - B = 3/7. Solving gives A = 13/28 and B = 1/28. Integral = (13/28) x + (1/28) ln(4eˣ + 7e⁻ˣ) + C = (1/14)[ (13/2)x + (1/2) ln(4eˣ + 7e⁻ˣ) ] + C. Thus u = 13/2, v = 1/2 => u + v = 13/2 + 1/2 = 14/2 = 7.",
    "topic": "Indefinite Integration - Linear Combination of Exponentials",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 58,
    "number": 58,
    "text": "Let I(x) = ∫ √((x + 7)/x) dx and I(9) = 12 + 7 log_e 7. If I(1) = α + 7 log_e(1 + 2√2), then α⁴ is equal to:",
    "options": {
      "A": "32",
      "B": "64",
      "C": "128",
      "D": "256"
    },
    "correctAnswer": "B",
    "explanation": "Put x = u² => dx = 2u du. I(u) = 2 ∫ √(u² + 7) du = u√(u² + 7) + 7 ln|u + √(u² + 7)| + C = √(x(x + 7)) + 7 ln|√x + √(x + 7)| + C. Given I(9) = 12 + 7 ln(3 + 4) = 12 + 7 ln 7 => C = 0. Then I(1) = √(1*8) + 7 ln(1 + √8) = 2√2 + 7 log_e(1 + 2√2) = √8 + 7 log_e(1 + 2√2). Comparing gives α = √8 => α⁴ = (√8)⁴ = 8² = 64.",
    "topic": "Indefinite Integration - Algebraic Radical Substitution",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 59,
    "number": 59,
    "text": "Let f(x) = ∫ dx / ((3 + 4x²)√(4 - 3x²)) for |x| < 2/√3. If f(0) = 0 and f(1) = (1/(αβ)) tan⁻¹(α/β) with α, β > 0, then α² + β² is equal to:",
    "options": {
      "A": "25",
      "B": "28",
      "C": "34",
      "D": "30"
    },
    "correctAnswer": "B",
    "explanation": "Put x = 1/z => dx = -dz/z². The integral becomes -∫ z dz / ((3z² + 4)√(4z² - 3)). Let 4z² - 3 = t² => 8z dz = 2t dt => z dz = (t/4) dt. Denominator becomes (3(t² + 3)/4 + 4) t = (3t² + 25)t/4. Integral = -∫ dt / (3t² + 25) = -(1/(5√3)) tan⁻¹(√3 t / 5) + C. Back substituting and using f(0) = 0 yields f(1) = (1/(5√3)) tan⁻¹(5/√3) = (1/(αβ)) tan⁻¹(α/β). Thus α = 5, β = √3 => α² + β² = 25 + 3 = 28.",
    "topic": "Indefinite Integration - Radical Inversion (x = 1/z)",
    "difficulty": "Very Hard",
    "image": null
  },
  {
    "id": 60,
    "number": 60,
    "text": "If ∫ dx / (x² + x + 1)² = a tan⁻¹((2x + 1)/√3) + b ((2x + 1)/(x² + x + 1)) + C for x > 0, where C is a constant of integration, then the value of 9(√3 a + b) is equal to:",
    "options": {
      "A": "12",
      "B": "15",
      "C": "18",
      "D": "21"
    },
    "correctAnswer": "B",
    "explanation": "Write x² + x + 1 = (x + 1/2)² + 3/4. Let x + 1/2 = (√3/2) tan θ => dx = (√3/2) sec²θ dθ. (x² + x + 1)² = (9/16) sec⁴θ. Integral = ∫ ((√3/2) sec²θ dθ) / ((9/16) sec⁴θ) = (8√3/9) ∫ cos²θ dθ = (4√3/9)[θ + (1/2)sin 2θ] + C = (4√3/9) tan⁻¹((2x + 1)/√3) + (1/3)((2x + 1)/(x² + x + 1)) + C. Thus a = 4√3/9 and b = 1/3. Then 9(√3 a + b) = 9(√3 * 4√3/9 + 1/3) = 9(4/3 + 1/3) = 9(5/3) = 15.",
    "topic": "Indefinite Integration - Quadratic Power Substitution",
    "difficulty": "Hard",
    "image": null
  }
];
