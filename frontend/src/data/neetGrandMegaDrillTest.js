/**
 * NEET 2027 Comprehensive Master Drill:
 * Physics: Work Energy & Power (45 Qs), Centre of Mass & Collisions (45 Qs), Rotational Motion (45 Qs)
 * Chemistry: Chemical Bonding & Molecular Structure (45 Qs)
 * Biology: Morphology of Flowering Plants (60 Qs)
 *
 * Total: 240 Questions | 960 Marks | Duration: 240 Minutes (Fixed 4 Hours, No Extension)
 */

function svgUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// Custom clear SVG diagrams
const DIAGRAMS = {
  wep_force_graph_q3: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="100%" height="100%">
      <rect width="400" height="220" fill="#0b0f19"/>
      <line x1="50" y1="180" x2="360" y2="180" stroke="#94a3b8" stroke-width="2"/>
      <line x1="50" y1="180" x2="50" y2="20" stroke="#94a3b8" stroke-width="2"/>
      <text x="35" y="25" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">F (N)</text>
      <text x="365" y="185" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">x (m)</text>
      <line x1="45" y1="60" x2="55" y2="60" stroke="#94a3b8" stroke-width="2"/>
      <text x="30" y="65" fill="#cbd5e1" font-family="sans-serif" font-size="12">3</text>
      <!-- Grid ticks -->
      <text x="100" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">1</text>
      <text x="150" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">2</text>
      <text x="200" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">3</text>
      <text x="250" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">4</text>
      <text x="300" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">5</text>
      <text x="350" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">6</text>
      <!-- Curve: F=3 from 0 to 3, then decreases to 0 at 6 -->
      <line x1="50" y1="60" x2="200" y2="60" stroke="#38bdf8" stroke-width="3"/>
      <line x1="200" y1="60" x2="350" y2="180" stroke="#38bdf8" stroke-width="3"/>
      <line x1="200" y1="60" x2="200" y2="180" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
      <polygon points="50,180 50,60 200,60 350,180" fill="#38bdf8" fill-opacity="0.15"/>
    </svg>
  `),

  wep_force_graph_q10: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%">
      <rect width="400" height="240" fill="#0b0f19"/>
      <line x1="40" y1="120" x2="360" y2="120" stroke="#94a3b8" stroke-width="2"/>
      <line x1="50" y1="220" x2="50" y2="20" stroke="#94a3b8" stroke-width="2"/>
      <text x="30" y="25" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">F (N)</text>
      <text x="365" y="125" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">x (m)</text>
      <text x="25" y="45" fill="#cbd5e1" font-family="sans-serif" font-size="11">20</text>
      <text x="20" y="205" fill="#cbd5e1" font-family="sans-serif" font-size="11">-20</text>
      <!-- Triangle 0 to 4 height 20 -->
      <polygon points="50,120 125,40 200,120" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Inverted Triangle 4 to 8 height -20 -->
      <polygon points="200,120 275,200 350,120" fill="#f43f5e" fill-opacity="0.2" stroke="#f43f5e" stroke-width="2.5"/>
      <text x="195" y="135" fill="#cbd5e1" font-family="sans-serif" font-size="11">4</text>
      <text x="345" y="135" fill="#cbd5e1" font-family="sans-serif" font-size="11">8</text>
    </svg>
  `),

  com_triangular_rods: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="100%" height="100%">
      <rect width="320" height="240" fill="#0b0f19"/>
      <line x1="60" y1="200" x2="260" y2="200" stroke="#38bdf8" stroke-width="5"/>
      <line x1="60" y1="200" x2="60" y2="40" stroke="#38bdf8" stroke-width="5"/>
      <line x1="60" y1="40" x2="260" y2="200" stroke="#38bdf8" stroke-width="5"/>
      <text x="45" y="215" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">O (0,0)</text>
      <text x="240" y="220" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">(a, 0)</text>
      <text x="25" y="45" fill="#cbd5e1" font-family="sans-serif" font-size="13" font-weight="bold">(0, a)</text>
      <circle cx="126" cy="146" r="6" fill="#f43f5e"/>
      <text x="135" y="145" fill="#f43f5e" font-family="sans-serif" font-size="12" font-weight="bold">COM (a/3, a/3)</text>
    </svg>
  `),

  rot_three_rings: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280" width="100%" height="100%">
      <rect width="320" height="280" fill="#0b0f19"/>
      <!-- YY' Axis -->
      <line x1="160" y1="10" x2="160" y2="270" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="6,4"/>
      <text x="165" y="25" fill="#f43f5e" font-family="sans-serif" font-size="14" font-weight="bold">Y</text>
      <text x="165" y="265" fill="#f43f5e" font-family="sans-serif" font-size="14" font-weight="bold">Y'</text>
      <!-- Top Left Ring 1 -->
      <circle cx="110" cy="90" r="50" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="110" cy="90" r="4" fill="#38bdf8"/>
      <text x="105" y="95" fill="#cbd5e1" font-family="sans-serif" font-size="12">1</text>
      <!-- Top Right Ring 2 -->
      <circle cx="210" cy="90" r="50" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="210" cy="90" r="4" fill="#38bdf8"/>
      <text x="205" y="95" fill="#cbd5e1" font-family="sans-serif" font-size="12">2</text>
      <!-- Bottom Ring 3 -->
      <circle cx="160" cy="190" r="50" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="160" cy="190" r="4" fill="#38bdf8"/>
      <text x="155" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="12">3</text>
    </svg>
  `),

  bio_monocot_seed: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" width="100%" height="100%">
      <rect width="360" height="260" fill="#0b0f19"/>
      <!-- Seed outline -->
      <path d="M 80 40 C 180 20, 240 60, 260 130 C 280 200, 180 240, 110 220 C 60 200, 50 100, 80 40 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Scutellum / Endosperm division -->
      <path d="M 90 70 Q 150 120 120 200" fill="none" stroke="#e2e8f0" stroke-width="2"/>
      <!-- Labels -->
      <text x="180" y="80" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">(i) Endosperm</text>
      <text x="170" y="120" fill="#e2e8f0" font-family="sans-serif" font-size="11">(ii) Scutellum</text>
      <text x="170" y="150" fill="#e2e8f0" font-family="sans-serif" font-size="11">(iii) Coleoptile / Plumule</text>
      <text x="170" y="180" fill="#e2e8f0" font-family="sans-serif" font-size="11">(iv) Radicle / Coleorhiza</text>
    </svg>
  `),
};

export const NEET_GRAND_MEGA_TEST = {
  id: 'neet-grand-mechanics-bonding-morphology-drill',
  title: 'NEET 2027 Full-Syllabus Drill: Mechanics, Chemical Bonding & Morphology',
  subject: 'Physics · Chemistry · Biology',
  syllabus: 'Work, Energy & Power, Centre of Mass, Rotational Motion, Chemical Bonding, Morphology of Flowering Plants',
  totalQuestions: 240,
  durationMinutes: 240, // 4 Hours standard (1 min/Q)
  allowCustomDuration: false, // Strictly fixed duration, NO modification option
  totalMarks: 960,
  correctMarks: 4,
  negativeMarks: 1,
  badge: 'NEET 2027 Mega Master Drill (240 Qs)',
  description:
    'Comprehensive National CBT mock containing all official practice questions across Work Energy & Power, Centre of Mass, Rotational Motion, Chemical Bonding & Molecular Structure, and Morphology of Flowering Plants with KaTeX solutions.',
};


export const NEET_GRAND_MEGA_QUESTIONS = [
{
    order: 1,
    id: "g_wep_1",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A constant force of $\\vec{F} = (3\\hat{i} + \\hat{j})\\text{ N}$ acts on a particle of mass $2\\text{ kg}$. The particle is displaced from position $(2\\hat{i} + \\hat{k})\\text{ m}$ to position $(4\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ m}$. The work done by the force on the particle is:",
    options: {
      A: "6 J",
      B: "13 J",
      C: "15 J",
      D: "9 J"
    },
    correctAnswer: "D",
    explanation: "Displacement vector $\\Delta \\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (4\\hat{i} + 3\\hat{j} - \\hat{k}) - (2\\hat{i} + \\hat{k}) = 2\\hat{i} + 3\\hat{j} - 2\\hat{k}\\text{ m}$.\\n\\nWork done $W = \\vec{F} \\cdot \\Delta \\vec{r} = (3\\hat{i} + \\hat{j}) \\cdot (2\\hat{i} + 3\\hat{j} - 2\\hat{k}) = (3 \\times 2) + (1 \\times 3) + (0 \\times -2) = 6 + 3 = 9\\text{ J}$."
  },
  {
    order: 2,
    id: "g_wep_2",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "Under the action of a force, a $2\\text{ kg}$ body moves such that its position $x$ as a function of time $t$ is given by $x = \\frac{t^2}{3}$, where $x$ is in meters and $t$ in seconds. The work done by the force in the first two seconds is:",
    options: {
      A: "1600 J",
      B: "160 J",
      C: "16 J",
      D: "\\frac{16}{9} J"
    },
    correctAnswer: "D",
    explanation: "Given position $x(t) = \\frac{t^2}{3}$.\\nVelocity $v = \\frac{dx}{dt} = \\frac{2t}{3}$.\\n\\nAt $t = 0\\text{ s}$, $v_0 = 0\\text{ m/s}$.\\nAt $t = 2\\text{ s}$, $v = \\frac{2(2)}{3} = \\frac{4}{3}\\text{ m/s}$.\\n\\nFrom Work-Energy Theorem:\\n$$W = \\Delta K = \\frac{1}{2}m(v^2 - v_0^2) = \\frac{1}{2}(2)\\left(\\left(\\frac{4}{3}\\right)^2 - 0\\right) = \\frac{16}{9}\\text{ J}$$."
  },
  {
    order: 3,
    id: "g_wep_3",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A force $F$ acting on an object varies with distance $x$ as shown in the force-displacement graph. The force is in $\\text{N}$ and $x$ in $\\text{m}$. The work done by the force in moving the object from $x = 0$ to $x = 6\\text{ m}$ is:",
    options: {
      A: "18.0 J",
      B: "13.5 J",
      C: "9.0 J",
      D: "4.5 J"
    },
    correctAnswer: "B",
    explanation: "Work done is equal to the area under the $F-x$ graph.\\nFrom the graph, the region is a trapezoid from $x=0$ to $x=6\\text{ m}$ with height $F = 3\\text{ N}$, parallel sides of length $6\\text{ m}$ (base) and $3\\text{ m}$ (top from $x=0$ to $x=3$).\\n\\n$$\\text{Area} = \\frac{1}{2} \\times (\\text{sum of parallel sides}) \\times \\text{height} = \\frac{1}{2} \\times (6 + 3) \\times 3 = \\frac{27}{2} = 13.5\\text{ J}$$."
  },
  {
    order: 4,
    id: "g_wep_4",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "Which of the following statement(s) is/are correct?\\nStatement I: Work done by kinetic friction in a closed path is not zero.\\nStatement II: Kinetic frictional force is a non-conservative force.",
    options: {
      A: "Both I and II",
      B: "Only I",
      C: "Only II",
      D: "Neither I nor II"
    },
    correctAnswer: "A",
    explanation: "Frictional force is a non-conservative (dissipative) force. The work done by friction along any path depends on the actual path length travelled and is always negative (opposing relative motion), hence the work done over any closed round trip is strictly non-zero ($W_{\\text{closed}} < 0$). Both statements are correct."
  },
  {
    order: 5,
    id: "g_wep_5",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "A body moves a distance of $10\\text{ m}$ along a straight line under the action of a force of $5\\text{ N}$. If the work done is $25\\text{ J}$, then the angle which the force makes with the direction of motion of the body is:",
    options: {
      A: "0°",
      B: "30°",
      C: "60°",
      D: "90°"
    },
    correctAnswer: "C",
    explanation: "Work done $W = F d \\cos\\theta$.\\n$$25 = 5 \\times 10 \\times \\cos\\theta \\implies 25 = 50 \\cos\\theta \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$."
  },
  {
    order: 6,
    id: "g_wep_6",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "Which of the following statement is INCORRECT for a conservative field?",
    options: {
      A: "Work done in going from initial to final position is equal to change in kinetic energy of the particle.",
      B: "Work done depends on path but not on initial and final positions.",
      C: "Work done does not depend on path but depends only on initial and final positions.",
      D: "Work done on a particle in the field for a round trip is zero."
    },
    correctAnswer: "B",
    explanation: "By definition, the work done by a conservative force is strictly path independent and depends exclusively on the initial and final position coordinates. Hence Statement B is incorrect."
  },
  {
    order: 7,
    id: "g_wep_7",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A force $F = (3x^2 + 2x - 7)\\text{ N}$ acts on a $2\\text{ kg}$ body as a result of which the body gets displaced from $x = 0$ to $x = 5\\text{ m}$. The work done by the force will be:",
    options: {
      A: "35 J",
      B: "70 J",
      C: "115 J",
      D: "270 J"
    },
    correctAnswer: "C",
    explanation: "$$W = \\int_{x_i}^{x_f} F(x) dx = \\int_0^5 (3x^2 + 2x - 7) dx = \\left[ x^3 + x^2 - 7x \\right]_0^5 = (5^3 + 5^2 - 7(5)) - 0 = 125 + 25 - 35 = 115\\text{ J}$$."
  },
  {
    order: 8,
    id: "g_wep_8",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "If we throw a body upwards with velocity of $4\\text{ m/s}$, at what height does its kinetic energy reduce to half of its initial value? (Take $g = 10\\text{ m s}^{-2}$)",
    options: {
      A: "4 m",
      B: "2 m",
      C: "1 m",
      D: "0.4 m"
    },
    correctAnswer: "D",
    explanation: "By conservation of mechanical energy:\\n$$K_f + U_f = K_i + U_i \\implies \\frac{1}{2}K_i + mgh = K_i \\implies mgh = \\frac{1}{2}K_i = \\frac{1}{2}\\left(\\frac{1}{2}mv^2\\right) = \\frac{1}{4}mv^2$$\\n$$gh = \\frac{v^2}{4} \\implies 10h = \\frac{4^2}{4} = 4 \\implies h = 0.4\\text{ m}$$."
  },
  {
    order: 9,
    id: "g_wep_9",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "Which of the following units is a unit of power?",
    options: {
      A: "Kilowatt hour",
      B: "Watt",
      C: "Erg",
      D: "Calorie"
    },
    correctAnswer: "B",
    explanation: "Watt ($\\text{J/s}$) is the SI unit of power. Kilowatt-hour, Erg, and Calorie are all units of work / energy."
  },
  {
    order: 10,
    id: "g_wep_10",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A force $F$ acting on an object varies with distance $x$ as shown: a triangle of height $+20\\text{ N}$ from $x = 0$ to $4\\text{ m}$, and a triangle of height $-20\\text{ N}$ from $x = 4$ to $8\\text{ m}$. The work done by the force in moving the object from $x = 0$ to $x = 8\\text{ m}$ is:",
    options: {
      A: "Zero",
      B: "80 J",
      C: "-40 J",
      D: "40 J"
    },
    correctAnswer: "A",
    explanation: "$$W = \\text{Area}_1 - \\text{Area}_2 = \\left(\\frac{1}{2} \\times 4 \\times 20\\right) - \\left(\\frac{1}{2} \\times 4 \\times 20\\right) = 40\\text{ J} - 40\\text{ J} = 0\\text{ J}$$."
  },
  {
    order: 11,
    id: "g_wep_11",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "Force $F = kx$ (where $k$ is a positive constant) is acting on a particle. Match the work done by this force in Column I with Column II:\\nColumn I:\\n(I) Displacing body from $x = 2$ to $x = 4$\\n(II) Displacing body from $x = -4$ to $x = -2$\\n(III) Displacing body from $x = -2$ to $x = +2$\\nColumn II: (P) Negative, (Q) Positive, (R) Zero",
    options: {
      A: "I→Q, II→R, III→P",
      B: "I→Q, II→P, III→R",
      C: "I→P, II→Q, III→R",
      D: "I→R, II→Q, III→P"
    },
    correctAnswer: "B",
    explanation: "$$W = \\int_{x_i}^{x_f} kx dx = \\frac{k}{2}(x_f^2 - x_i^2)$$\\n(I) $x=2$ to $4$: $W = \\frac{k}{2}(16 - 4) = +6k > 0$ (Positive $\\to$ Q)\\n(II) $x=-4$ to $-2$: $W = \\frac{k}{2}((-2)^2 - (-4)^2) = \\frac{k}{2}(4 - 16) = -6k < 0$ (Negative $\\to$ P)\\n(III) $x=-2$ to $+2$: $W = \\frac{k}{2}(4 - 4) = 0$ (Zero $\\to$ R)."
  },
  {
    order: 12,
    id: "g_wep_12",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "The kinetic energy of a light body and a heavy body is the same. Which one of the following statements is CORRECT?",
    options: {
      A: "Body having higher velocity has greater momentum",
      B: "The heavier body has greater momentum",
      C: "Both bodies have same momentum",
      D: "The lighter body has greater momentum"
    },
    correctAnswer: "B",
    explanation: "Linear momentum $p = \\sqrt{2mK}$. Since kinetic energy $K$ is identical for both bodies, $p \\propto \\sqrt{m}$. Hence, the heavier body (larger mass $m$) possesses greater linear momentum."
  },
  {
    order: 13,
    id: "g_wep_13",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "A $120\\text{ g}$ mass has a velocity $\\vec{v} = (2\\hat{i} + 5\\hat{j})\\text{ m/s}$ at a certain instant. Its kinetic energy is:",
    options: {
      A: "3 J",
      B: "4 J",
      C: "5 J",
      D: "1.74 J"
    },
    correctAnswer: "D",
    explanation: "$m = 120\\text{ g} = 0.12\\text{ kg}$.\\n$$v^2 = |\\vec{v}|^2 = 2^2 + 5^2 = 4 + 25 = 29\\text{ m}^2\\text{/s}^2$$\\n$$K = \\frac{1}{2}mv^2 = \\frac{1}{2}(0.12)(29) = 0.06 \\times 29 = 1.74\\text{ J}$$."
  },
  {
    order: 14,
    id: "g_wep_14",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "The work-energy theorem states that the change in:",
    options: {
      A: "Kinetic energy of a particle is equal to the work done on it by the net force",
      B: "Kinetic energy of a particle is equal to the work done by one of the forces acting on it",
      C: "Potential energy of a particle is equal to the work done on it by the net force",
      D: "Potential energy of a particle is equal to the work done by one of the forces acting on it"
    },
    correctAnswer: "A",
    explanation: "Work-Energy Theorem states that the net work done by all forces (conservative, non-conservative, internal, and external) acting on a body equals the net change in its kinetic energy: $W_{\\text{net}} = \\Delta K$."
  },
  {
    order: 15,
    id: "g_wep_15",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "A body of mass $m\\text{ kg}$ is lifted by a man to a height of one metre in $30\\text{ sec}$. Another man lifts the same mass to the same height in $60\\text{ sec}$. The work done by them are in the ratio:",
    options: {
      A: "1 : 2",
      B: "1 : 1",
      C: "2 : 1",
      D: "4 : 1"
    },
    correctAnswer: "B",
    explanation: "Work done in lifting a mass $m$ to height $h$ is $W = mgh$. Work depends only on mass, gravity, and vertical displacement—independent of time taken. Hence the ratio of work done is $1 : 1$."
  },
  {
    order: 16,
    id: "g_wep_16",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "The potential energy of a particle of mass $1\\text{ kg}$ free to move along the $x$-axis is given by $U(x) = (3x^2 - 4x + 6)\\text{ J}$. Force acting on the particle at $x = 0$ is:",
    options: {
      A: "2\\hat{i}\\text{ N}",
      B: "-4\\hat{i}\\text{ N}",
      C: "5\\hat{i}\\text{ N}",
      D: "4\\hat{i}\\text{ N}"
    },
    correctAnswer: "D",
    explanation: "Conservative force $F = -\\frac{dU}{dx} = -\\frac{d}{dx}(3x^2 - 4x + 6) = -(6x - 4) = 4 - 6x$.\\nAt $x = 0$, $F = 4 - 0 = 4\\text{ N} = 4\\hat{i}\\text{ N}$."
  },
  {
    order: 17,
    id: "g_wep_17",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "The displacement $y$ of a particle moving in one dimension under the action of a force is related to the time $t$ by the equation $t = y^{1/3} + 5$, where $y$ is in meters and $t$ is in seconds. The work done by the force in the first 10 seconds is:",
    options: {
      A: "95 J",
      B: "65 J",
      C: "0 J",
      D: "35 J"
    },
    correctAnswer: "C",
    explanation: "Given $t = y^{1/3} + 5 \\implies y^{1/3} = t - 5 \\implies y = (t - 5)^3$.\\nVelocity $v = \\frac{dy}{dt} = 3(t - 5)^2$.\\nAt $t = 0\\text{ s}$, $v_i = 3(0 - 5)^2 = 75\\text{ m/s}$.\\nAt $t = 10\\text{ s}$, $v_f = 3(10 - 5)^2 = 75\\text{ m/s}$.\\nFrom Work-Energy theorem: $W = \\Delta K = \\frac{1}{2}m(v_f^2 - v_i^2) = \\frac{1}{2}m(75^2 - 75^2) = 0\\text{ J}$."
  },
  {
    order: 18,
    id: "g_wep_18",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "Two masses of $1\\text{ g}$ and $4\\text{ g}$ are moving with equal kinetic energy. The ratio of the magnitudes of their linear momenta is:",
    options: {
      A: "4 : 1",
      B: "\\sqrt{2} : 1",
      C: "1 : 2",
      D: "1 : 16"
    },
    correctAnswer: "C",
    explanation: "$$p = \\sqrt{2mK} \\implies \\frac{p_1}{p_2} = \\sqrt{\\frac{m_1}{m_2}} = \\sqrt{\\frac{1\\text{ g}}{4\\text{ g}}} = \\frac{1}{2} = 1:2$$."
  },
  {
    order: 19,
    id: "g_wep_19",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "Initially mass $m$ is held such that the spring of force constant $k$ is in relaxed condition. If mass $m$ is suddenly released, the maximum elongation produced in the spring will be:",
    options: {
      A: "\\frac{mg}{k}",
      B: "\\frac{2mg}{k}",
      C: "\\frac{mg}{2k}",
      D: "\\frac{mg}{4k}"
    },
    correctAnswer: "B",
    explanation: "At maximum elongation $x_{\\text{max}}$, the velocity momentarily becomes zero.\\nLoss in gravitational potential energy = Gain in elastic spring potential energy:\\n$$mg x_{\\text{max}} = \\frac{1}{2} k x_{\\text{max}}^2 \\implies x_{\\text{max}} = \\frac{2mg}{k}$$."
  },
  {
    order: 20,
    id: "g_wep_20",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "The energy required to accelerate a car from rest to $10\\text{ ms}^{-1}$ is $W$. The energy required to accelerate the car from $10\\text{ ms}^{-1}$ to $20\\text{ ms}^{-1}$ is:",
    options: {
      A: "W",
      B: "2 W",
      C: "3 W",
      D: "4 W"
    },
    correctAnswer: "C",
    explanation: "$$W_1 = \\frac{1}{2}m(10^2 - 0) = 50m = W$$\\n$$W_2 = \\frac{1}{2}m(20^2 - 10^2) = \\frac{1}{2}m(400 - 100) = 150m = 3(50m) = 3W$$."
  },
  {
    order: 21,
    id: "g_wep_21",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A body of mass $2\\text{ kg}$ slides down a curved frictionless track which is a quadrant of a circle of radius $1\\text{ metre}$. If the body starts from rest, its speed at the bottom of the track is: (Take $g = 9.8\\text{ m/s}^2$)",
    options: {
      A: "4.43 m/sec",
      B: "2 m/sec",
      C: "0.5 m/sec",
      D: "19.6 m/sec"
    },
    correctAnswer: "A",
    explanation: "By conservation of energy: $mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 1} = \\sqrt{19.6} \\approx 4.43\\text{ m/s}$."
  },
  {
    order: 22,
    id: "g_wep_22",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A particle is attached with a massless string of length $l$. It is displaced along a circular arc from $A$ to $B$ (quarter circle) by a constant force $F$ whose direction is always tangential to instantaneous displacement. The work done by the force $F$ is:",
    options: {
      A: "\\sqrt{2}Fl",
      B: "Fl",
      C: "\\frac{\\sqrt{2}Fl}{\\pi}",
      D: "\\frac{F\\pi l}{2}"
    },
    correctAnswer: "D",
    explanation: "$$W = \\int \\vec{F} \\cdot d\\vec{s} = F \\int ds = F \\times (\\text{arc length } AB) = F \\times \\left(\\frac{\\pi l}{2}\\right) = \\frac{F\\pi l}{2}$$."
  },
  {
    order: 23,
    id: "g_wep_23",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A particle at rest on a frictionless table is acted upon by a horizontal force which is constant in magnitude and direction. A graph is plotted for the work done on the particle $W$ against the speed $v$. If there are no frictional forces, the graph will be:",
    options: {
      A: "Straight line with positive slope",
      B: "Horizontal straight line",
      C: "Curve opening downwards",
      D: "Parabola opening upwards passing through origin (W proportional to v^2)"
    },
    correctAnswer: "D",
    explanation: "By Work-Energy Theorem: $W = \\Delta K = \\frac{1}{2}mv^2$. Since $W \\propto v^2$, the graph of $W$ versus $v$ is a parabola opening upwards with vertex at the origin."
  },
  {
    order: 24,
    id: "g_wep_24",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "If the linear momentum of a body increases by $0.01\\%$, its kinetic energy will increase by approximately:",
    options: {
      A: "0.01%",
      B: "0.02%",
      C: "0.04%",
      D: "0.08%"
    },
    correctAnswer: "B",
    explanation: "$K = \\frac{p^2}{2m}$. For small percentage changes ($< 5\\%$):\\n$$\\frac{\\Delta K}{K} \\times 100\\% = 2 \\left(\\frac{\\Delta p}{p} \\times 100\\%\\right) = 2(0.01\\%) = 0.02\\%$$."
  },
  {
    order: 25,
    id: "g_wep_25",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "If a body of mass $200\\text{ g}$ falls from a height of $200\\text{ m}$ and its total potential energy is converted into kinetic energy at the point of contact, then the decrease in potential energy is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: {
      A: "900 J",
      B: "600 J",
      C: "400 J",
      D: "200 J"
    },
    correctAnswer: "C",
    explanation: "$$m = 200\\text{ g} = 0.2\\text{ kg}, \\quad h = 200\\text{ m}$$\\n$$\\Delta U = mgh = 0.2 \\times 10 \\times 200 = 400\\text{ J}$$."
  },
  {
    order: 26,
    id: "g_wep_26",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A spring of spring constant $5 \\times 10^3\\text{ N/m}$ is elongated initially by $15\\text{ cm}$ from unstretched position. The work required to elongate it further by another $15\\text{ cm}$ is:",
    options: {
      A: "62.5 J",
      B: "125 J",
      C: "168.75 J",
      D: "250 J"
    },
    correctAnswer: "C",
    explanation: "$$x_1 = 0.15\\text{ m}, \\quad x_2 = 0.15 + 0.15 = 0.30\\text{ m}$$\\n$$W = \\frac{1}{2}k(x_2^2 - x_1^2) = \\frac{1}{2}(5000)(0.30^2 - 0.15^2) = 2500(0.09 - 0.0225) = 2500 \\times 0.0675 = 168.75\\text{ J}$$."
  },
  {
    order: 27,
    id: "g_wep_27",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "In a potential energy function $U(x)$ plot with segments OA (sloping up), AB (horizontal flat), BC (sloping down), and CD (steeply sloping up), in which region is the magnitude of force greatest?",
    options: {
      A: "OA",
      B: "AB",
      C: "BC",
      D: "CD"
    },
    correctAnswer: "D",
    explanation: "Magnitude of force is $|F| = \\left|-\\frac{dU}{dx}\\right| = |\\text{slope of } U-x \\text{ curve}|$. Segment CD has the steepest slope, hence the force magnitude is greatest in region CD."
  },
  {
    order: 28,
    id: "g_wep_28",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "A small ball is placed at the bottom of a frictionless cylindrical drum of radius $R$. The ball is given a speed $v = \\sqrt{gR}$ at the lowest point. Find the maximum height reached by the ball above the ground.",
    options: {
      A: "R",
      B: "R/4",
      C: "R/3",
      D: "R/2"
    },
    correctAnswer: "D",
    explanation: "Since $v = \\sqrt{gR} < \\sqrt{2gR}$, the ball cannot even reach the horizontal level ($h = R$) and will oscillate below horizontal without leaving the surface.\\nBy conservation of energy: $\\frac{1}{2}mv^2 = mgh \\implies \\frac{1}{2}m(gR) = mgh \\implies h = \\frac{R}{2}$."
  },
  {
    order: 29,
    id: "g_wep_29",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "A block of mass $2\\text{ kg}$ moves inside a frictionless circular track of radius $5\\text{ m}$ in a vertical plane. If the speed of the block at the lowest point is $20\\text{ m/s}$, the normal force (in dynes) exerted on the block at the highest point is: ($g = 10\\text{ m/s}^2$)",
    options: {
      A: "6 \\times 10^6 \\text{ dynes}",
      B: "6 \\times 10^1 \\text{ dynes}",
      C: "6 \\times 10^5 \\text{ dynes}",
      D: "6 \\times 10^3 \\text{ dynes}"
    },
    correctAnswer: "A",
    explanation: "Velocity at highest point: $v_{\\text{top}}^2 = v_{\\text{bottom}}^2 - 4gR = 20^2 - 4(10)(5) = 400 - 200 = 200\\text{ m}^2\\text{/s}^2$.\\nAt top: $N + mg = \\frac{m v_{\\text{top}}^2}{R} \\implies N = \\frac{2(200)}{5} - 2(10) = 80 - 20 = 60\\text{ N}$.\\nSince $1\\text{ N} = 10^5\\text{ dynes}$, $N = 60 \\times 10^5 = 6 \\times 10^6\\text{ dynes}$."
  },
  {
    order: 30,
    id: "g_wep_30",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A uniform chain of length $L$ and mass $M$ is lying on a smooth table and one-third of its length is hanging vertically over the edge. The work required to pull the hanging part back onto the table is:",
    options: {
      A: "MgL",
      B: "MgL/3",
      C: "MgL/9",
      D: "MgL/18"
    },
    correctAnswer: "D",
    explanation: "Mass of hanging part $m' = \\frac{M}{3}$.\\nCentre of mass of the hanging part is at depth $h_{cm} = \\frac{L/3}{2} = \\frac{L}{6}$.\\nWork required $W = m' g h_{cm} = \\left(\\frac{M}{3}\\right) g \\left(\\frac{L}{6}\\right) = \\frac{MgL}{18}$."
  },
  {
    order: 31,
    id: "g_wep_31",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "A block of $200\\text{ g}$ mass is dropped from a height of $2\\text{ m}$ onto a spring and compresses the spring by a distance of $50\\text{ cm}$. The force constant of the spring is: ($g = 10\\text{ m/s}^2$)",
    options: {
      A: "20 N/m",
      B: "40 N/m",
      C: "30 N/m",
      D: "60 N/m"
    },
    correctAnswer: "B",
    explanation: "Total vertical fall $H = h + x = 2\\text{ m} + 0.5\\text{ m} = 2.5\\text{ m}$.\\nLoss in gravitational PE = Gain in elastic spring PE:\\n$$mg(h + x) = \\frac{1}{2}kx^2 \\implies 0.2(10)(2.5) = \\frac{1}{2}k(0.5)^2 \\implies 5 = 0.125k \\implies k = \\frac{5}{0.125} = 40\\text{ N/m}$$."
  },
  {
    order: 32,
    id: "g_wep_32",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A force of $\\vec{F} = (2\\hat{i} + 3\\hat{j} + 4\\hat{k})\\text{ N}$ acts on a body for $4\\text{ seconds}$ and produces a displacement of $\\vec{s} = (3\\hat{i} + 4\\hat{j} + 5\\hat{k})\\text{ m}$. The power used is:",
    options: {
      A: "9.5 W",
      B: "7.5 W",
      C: "6.5 W",
      D: "4.5 W"
    },
    correctAnswer: "A",
    explanation: "$$W = \\vec{F} \\cdot \\vec{s} = (2)(3) + (3)(4) + (4)(5) = 6 + 12 + 20 = 38\\text{ J}$$\\n$$\\text{Power } P = \\frac{W}{t} = \\frac{38\\text{ J}}{4\\text{ s}} = 9.5\\text{ W}$$."
  },
  {
    order: 33,
    id: "g_wep_33",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "Assertion: No work is done if the displacement is zero.\\nReason: Work done by the force is defined to be the product of component of the force in the direction of the displacement and the magnitude of displacement.",
    options: {
      A: "Assertion is True, Reason is True; Reason is correct explanation for Assertion",
      B: "Assertion is True, Reason is True; Reason is not correct explanation for Assertion",
      C: "Assertion is True, Reason is False",
      D: "Assertion is False, Reason is True"
    },
    correctAnswer: "A",
    explanation: "Work is mathematically defined as $W = F s \\cos\\theta$. If displacement $s = 0$, $W = 0$. Hence both Assertion and Reason are true and Reason directly explains the Assertion."
  },
  {
    order: 34,
    id: "g_wep_34",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "When a rubber-band is stretched by a distance $x$, it exerts a restoring force of magnitude $F = ax + bx^2$, where $a$ and $b$ are constants. The work done in stretching the unstretched rubber-band by length $L$ is:",
    options: {
      A: "aL^2 + bL^3",
      B: "\\frac{1}{2}(aL^2 + bL^3)",
      C: "\\frac{aL^2}{2} + \\frac{bL^3}{3}",
      D: "\\frac{1}{2}\\left(\\frac{aL^2}{2} + \\frac{bL^3}{3}\\right)"
    },
    correctAnswer: "C",
    explanation: "$$W = \\int_0^L F dx = \\int_0^L (ax + bx^2) dx = \\left[ \\frac{ax^2}{2} + \\frac{bx^3}{3} \\right]_0^L = \\frac{aL^2}{2} + \\frac{bL^3}{3}$$."
  },
  {
    order: 35,
    id: "g_wep_35",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "The graph between kinetic energy $E_k$ and velocity $V$ of a body of mass $m$ is:",
    options: {
      A: "Parabola symmetric about E_k axis opening upwards",
      B: "Straight line with positive slope",
      C: "Straight line with negative slope",
      D: "Hyperbola"
    },
    correctAnswer: "A",
    explanation: "$E_k = \\frac{1}{2}m V^2$. Since $E_k$ depends on the square of velocity $V$, the graph is a symmetric parabola opening upwards with vertex at $V = 0$."
  },
  {
    order: 36,
    id: "g_wep_36",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A body of mass $m$ accelerates uniformly from rest to $v_1$ in time $t_1$. As a function of $t$, the instantaneous power delivered to the body is:",
    options: {
      A: "\\frac{m v_1}{t_1}",
      B: "\\frac{m v_1 t}{t_1}",
      C: "\\frac{m v_1 t^2}{t_1}",
      D: "\\frac{m v_1^2 t}{t_1^2}"
    },
    correctAnswer: "D",
    explanation: "Acceleration $a = \\frac{v_1}{t_1}$.\\nVelocity at time $t$: $v(t) = a t = \\frac{v_1}{t_1} t$.\\nForce $F = ma = m \\frac{v_1}{t_1}$.\\nInstantaneous power $P(t) = F v(t) = \\left(m \\frac{v_1}{t_1}\\right)\\left(\\frac{v_1}{t_1} t\\right) = \\frac{m v_1^2 t}{t_1^2}$."
  },
  {
    order: 37,
    id: "g_wep_37",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "A mass $m$ is attached to a thin wire and whirled in a vertical circle. The wire is most likely to break when:",
    options: {
      A: "the wire is horizontal",
      B: "the mass is at the lowest point",
      C: "inclined at an angle of 60° from vertical",
      D: "the mass is at the highest point"
    },
    correctAnswer: "B",
    explanation: "Tension in vertical circle at angle $\\theta$ from lowest point is $T = mg \\cos\\theta + \\frac{m v^2}{r}$. At the lowest point ($\\theta = 0$), speed is maximum and gravity acts in direction of tension, giving $T_{\\text{max}} = mg + \\frac{mv^2}{r}$, making it most vulnerable to breaking."
  },
  {
    order: 38,
    id: "g_wep_38",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "Assertion: Work done by friction on a body sliding down an inclined plane is positive.\\nReason: Work done is greater than zero, if angle between force and displacement is acute or both are in the same direction.",
    options: {
      A: "If both assertion and reason are true and reason is correct explanation of assertion.",
      B: "If both assertion and reason are true but reason is not correct explanation of assertion.",
      C: "If assertion is true but reason is false.",
      D: "If assertion is false but reason is true."
    },
    correctAnswer: "D",
    explanation: "Kinetic friction opposes relative motion (angle between friction and displacement is $180^\\circ$), so work done by friction is negative ($-f d$). Thus Assertion is False. Reason is a true general condition for positive work."
  },
  {
    order: 39,
    id: "g_wep_39",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A body of mass $1\\text{ kg}$ begins to move under the action of a time dependent force $\\vec{F} = (2t\\hat{i} + 3t^2\\hat{j})\\text{ N}$. What power will be developed by the force at time $t$?",
    options: {
      A: "(2t^2 + 4t^2) W",
      B: "(2t^3 + 3t^4) W",
      C: "(2t^3 + 3t^5) W",
      D: "(2t + 3t^3) W"
    },
    correctAnswer: "C",
    explanation: "$$\\vec{a} = \\frac{\\vec{F}}{m} = 2t\\hat{i} + 3t^2\\hat{j}$$\\n$$\\vec{v} = \\int \\vec{a} dt = t^2\\hat{i} + t^3\\hat{j}$$\\n$$P = \\vec{F} \\cdot \\vec{v} = (2t\\hat{i} + 3t^2\\hat{j}) \\cdot (t^2\\hat{i} + t^3\\hat{j}) = 2t^3 + 3t^5\\text{ W}$$."
  },
  {
    order: 40,
    id: "g_wep_40",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "A body is initially at rest. It undergoes one-dimensional motion with constant acceleration. The power delivered to it at time $t$ is proportional to:",
    options: {
      A: "t^{1/2}",
      B: "t",
      C: "t^{3/2}",
      D: "t^2"
    },
    correctAnswer: "B",
    explanation: "For constant acceleration $a$, $v = at$. Force $F = ma$ is constant. Power $P = F v = (ma)(at) = m a^2 t \\propto t$."
  },
  {
    order: 41,
    id: "g_wep_41",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A stone of mass $2\\text{ kg}$ is projected upwards with kinetic energy of $98\\text{ J}$. The height at which the kinetic energy of the body becomes half of its original value will be: (Take $g = 9.8\\text{ ms}^{-2}$)",
    options: {
      A: "5 m",
      B: "2.5 m",
      C: "1.5 m",
      D: "0.5 m"
    },
    correctAnswer: "B",
    explanation: "$$\\Delta U = \\frac{K_0}{2} = \\frac{98}{2} = 49\\text{ J}$$\\n$$mgh = 49 \\implies (2)(9.8)h = 49 \\implies 19.6h = 49 \\implies h = \\frac{49}{19.6} = 2.5\\text{ m}$$."
  },
  {
    order: 42,
    id: "g_wep_42",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "A point mass $m$ is moved in a vertical circle of radius $r$ with the help of a string. The velocity of the mass is $\\sqrt{7gr}$ at the lowest point. The tension in the string at the lowest point is:",
    options: {
      A: "6 mg",
      B: "7 mg",
      C: "8 mg",
      D: "1 mg"
    },
    correctAnswer: "C",
    explanation: "$$T = mg + \\frac{m v^2}{r} = mg + \\frac{m (7gr)}{r} = mg + 7mg = 8mg$$."
  },
  {
    order: 43,
    id: "g_wep_43",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Medium",
    question: "A mass of $0.5\\text{ kg}$ moving with a speed of $1.5\\text{ m/s}$ on a horizontal smooth surface collides with a spring of force constant $k = 50\\text{ N/m}$. The maximum compression of the spring would be:",
    options: {
      A: "0.12 m",
      B: "1.5 m",
      C: "0.5 m",
      D: "0.15 m"
    },
    correctAnswer: "D",
    explanation: "$$\\frac{1}{2} m v^2 = \\frac{1}{2} k x^2 \\implies 0.5(1.5)^2 = 50 x^2 \\implies 0.5(2.25) = 50 x^2 \\implies 1.125 = 50 x^2$$\\n$$x^2 = \\frac{1.125}{50} = 0.0225 \\implies x = 0.15\\text{ m}$$."
  },
  {
    order: 44,
    id: "g_wep_44",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Hard",
    question: "A stone is rotated in a vertical circle. Speed at the bottommost point is $\\sqrt{8gR}$, where $R$ is the radius of circle. The ratio of tension at the top and the bottom is:",
    options: {
      A: "1:2",
      B: "1:3",
      C: "2:3",
      D: "1:4"
    },
    correctAnswer: "B",
    explanation: "$$v_{\\text{bottom}}^2 = 8gR, \\quad v_{\\text{top}}^2 = 8gR - 4gR = 4gR$$\\n$$T_{\\text{top}} = \\frac{m(4gR)}{R} - mg = 3mg$$\\n$$T_{\\text{bottom}} = \\frac{m(8gR)}{R} + mg = 9mg$$\\n$$\\frac{T_{\\text{top}}}{T_{\\text{bottom}}} = \\frac{3mg}{9mg} = 1 : 3$$."
  },
  {
    order: 45,
    id: "g_wep_45",
    subject: "Physics",
    topic: "Work, Energy & Power",
    difficulty: "Easy",
    question: "In which case does the gravitational potential energy decrease?",
    options: {
      A: "On compressing a spring",
      B: "On stretching a spring",
      C: "On moving a body against gravitational force",
      D: "In free fall of body"
    },
    correctAnswer: "D",
    explanation: "In free fall under gravity, height $h$ decreases, so gravitational potential energy $U = mgh$ decreases as it converts into kinetic energy."
  },
{
    order: 46,
    id: "g_com_1",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "All the particles of a system are situated at a distance $r$ from the origin. The distance of the centre of mass of the system from the origin is:",
    options: {
      A: "= r",
      B: "≤ r",
      C: "> r",
      D: "≥ r"
    },
    correctAnswer: "B",
    explanation: "The centre of mass of any distribution of particles lies within the convex hull of the particles. Since all particles lie on a sphere of radius $r$ centered at origin, the centre of mass must be at a distance $\\le r$ from the origin."
  },
  {
    order: 47,
    id: "g_com_2",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "Assertion: The centre of mass of a two particle system lies on the line joining the two particles, being closer to the heavier particle.\\nReason: This is because product of mass of one particle and its distance from centre of mass is numerically equal to product of mass of other particle and its distance from centre of mass.",
    options: {
      A: "Assertion is True, Reason is True and Reason is correct explanation for Assertion.",
      B: "Assertion is True, Reason is True and Reason is not correct explanation for Assertion.",
      C: "Assertion is True, Reason is False.",
      D: "Assertion is False, Reason is True."
    },
    correctAnswer: "A",
    explanation: "For a two-particle system, $m_1 r_1 = m_2 r_2$. If $m_1 > m_2$, then $r_1 < r_2$, which means the centre of mass lies closer to the heavier particle. Thus both Assertion and Reason are true, and Reason is the correct explanation."
  },
  {
    order: 48,
    id: "g_com_3",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Two bodies of masses $1\\text{ kg}$ and $3\\text{ kg}$ have position vectors $(\\hat{i} + 2\\hat{j} + \\hat{k})$ and $(-3\\hat{i} - 2\\hat{j} + \\hat{k})$ respectively. The centre of mass of this system has a position vector:",
    options: {
      A: "-2\\hat{i} + 2\\hat{k}",
      B: "-2\\hat{i} - \\hat{j} + \\hat{k}",
      C: "2\\hat{i} - \\hat{j} - 2\\hat{k}",
      D: "-\\hat{i} + \\hat{j} + \\hat{k}"
    },
    correctAnswer: "B",
    explanation: "$$\\vec{r}_{cm} = \\frac{m_1 \\vec{r}_1 + m_2 \\vec{r}_2}{m_1 + m_2} = \\frac{1(\\hat{i} + 2\\hat{j} + \\hat{k}) + 3(-3\\hat{i} - 2\\hat{j} + \\hat{k})}{1 + 3} = \\frac{-8\\hat{i} - 4\\hat{j} + 4\\hat{k}}{4} = -2\\hat{i} - \\hat{j} + \\hat{k}$$."
  },
  {
    order: 49,
    id: "g_com_4",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Three rods of the same mass $M$ and equal length $a$ are placed forming a right-angled triangle along the axes (one along $x$-axis from $0$ to $a$, one along $y$-axis from $0$ to $a$, and one along hypotenuse). What will be the coordinates of the centre of mass of the system?",
    options: {
      A: "[a/2, a/2]",
      B: "[a/\\sqrt{2}, a/\\sqrt{2}]",
      C: "[\\sqrt{2}a, \\sqrt{2}a]",
      D: "[a/3, a/3]"
    },
    correctAnswer: "D",
    explanation: "Centre of mass of rod 1 (along x-axis): $(a/2, 0)$.\\nCentre of mass of rod 2 (along y-axis): $(0, a/2)$.\\nCentre of mass of rod 3 (hypotenuse): $(a/2, a/2)$.\\n\\n$$x_{cm} = \\frac{M(a/2) + M(0) + M(a/2)}{3M} = \\frac{a}{3}$$\\n$$y_{cm} = \\frac{M(0) + M(a/2) + M(a/2)}{3M} = \\frac{a}{3}$$\\n\\nCoordinates: $[a/3, a/3]$."
  },
  {
    order: 50,
    id: "g_com_5",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "For which of the following objects does the centre of mass lie outside the body?",
    options: {
      A: "A pencil",
      B: "A shotput",
      C: "A dice",
      D: "A bangle"
    },
    correctAnswer: "D",
    explanation: "A bangle is a thin circular ring. Its centre of mass lies at its geometric centre, where there is no physical material of the body."
  },
  {
    order: 51,
    id: "g_com_6",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "The centre of mass is a point:",
    options: {
      A: "Which is the geometric centre of a body",
      B: "From which distance of all particles are same",
      C: "Where the whole mass of the body is supposed to be concentrated",
      D: "Which is the origin of reference frame"
    },
    correctAnswer: "C",
    explanation: "Centre of mass is defined as the unique point where the entire mass of the system or body can be considered to be concentrated for translational dynamics under external forces."
  },
  {
    order: 52,
    id: "g_com_7",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "Three particles of masses $1\\text{ kg}$, $\\frac{3}{2}\\text{ kg}$, and $2\\text{ kg}$ are located at the vertices $A, B, C$ of an equilateral triangle of side $a\\text{ m}$. The coordinates of the centre of mass are (taking $A$ at origin, $B$ on $x$-axis):",
    options: {
      A: "(\\frac{5a}{9}\\text{ m}, \\frac{2a}{3\\sqrt{3}}\\text{ m})",
      B: "(\\frac{2a}{3\\sqrt{3}}\\text{ m}, \\frac{5a}{9}\\text{ m})",
      C: "(\\frac{5a}{9}\\text{ m}, \\frac{2a}{\\sqrt{3}}\\text{ m})",
      D: "(\\frac{2a}{\\sqrt{3}}\\text{ m}, \\frac{5a}{9}\\text{ m})"
    },
    correctAnswer: "A",
    explanation: "Coordinates:\\n$A(0,0)$ mass $1\\text{ kg}$\\n$B(a,0)$ mass $1.5\\text{ kg}$\\n$C(a/2, \\frac{\\sqrt{3}a}{2})$ mass $2\\text{ kg}$\\nTotal mass $M = 1 + 1.5 + 2 = 4.5\\text{ kg} = \\frac{9}{2}\\text{ kg}$.\\n\\n$$x_{cm} = \\frac{1(0) + 1.5(a) + 2(a/2)}{4.5} = \\frac{2.5a}{4.5} = \\frac{5a}{9}$$\\n$$y_{cm} = \\frac{1(0) + 1.5(0) + 2(\\frac{\\sqrt{3}a}{2})}{4.5} = \\frac{\\sqrt{3}a}{4.5} = \\frac{2\\sqrt{3}a}{9} = \\frac{2a}{3\\sqrt{3}}$$\\n\\nCoordinates: $\\left(\\frac{5a}{9}\\text{ m}, \\frac{2a}{3\\sqrt{3}}\\text{ m}\\right)$."
  },
  {
    order: 53,
    id: "g_com_8",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Assertion: Two bodies moving in opposite directions with same magnitude of linear momentum collide with each other. Then, after collision both the bodies will come to rest.\\nReason: Linear momentum of the system of bodies is zero.",
    options: {
      A: "Both Assertion and Reason are correct and Reason is the correct explanation of Assertion.",
      B: "Both Assertion and Reason are correct but Reason is not the correct explanation of Assertion.",
      C: "Assertion is correct but Reason is incorrect.",
      D: "Assertion is incorrect but Reason is correct."
    },
    correctAnswer: "D",
    explanation: "Total initial momentum is zero ($\\vec{p} + (-\vec{p}) = 0$). After collision, total momentum remains zero, but the bodies only come to rest if the collision is completely inelastic ($e = 0$). If elastic, they rebound with opposite momenta. Hence Assertion is incorrect, while Reason is correct."
  },
  {
    order: 54,
    id: "g_com_9",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A small uniform disc of radius $2\\text{ cm}$ is cut from a disc of radius $6\\text{ cm}$. If the distance between their centers is $3.2\\text{ cm}$, what is the shift in the centre of mass of the disc?",
    options: {
      A: "0.4 cm",
      B: "2.4 cm",
      C: "1.8 cm",
      D: "1.2 cm"
    },
    correctAnswer: "A",
    explanation: "Area of original disc $A_1 = \\pi (6^2) = 36\\pi$.\\nArea of removed disc $A_2 = \\pi (2^2) = 4\\pi$.\\nDistance between centers $d = 3.2\\text{ cm}$.\\n\\n$$\\text{Shift } x = \\frac{A_2 d}{A_1 - A_2} = \\frac{4\\pi \\times 3.2}{36\\pi - 4\\pi} = \\frac{4 \\times 3.2}{32} = \\frac{3.2}{8} = 0.4\\text{ cm}$$."
  },
  {
    order: 55,
    id: "g_com_10",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Mass is distributed uniformly over a thin triangular plate and positions of two vertices are given by $(1, 3)$ and $(2, -4)$. What is the position of the 3rd vertex if the centre of mass of the plate lies at the origin $(0, 0)$?",
    options: {
      A: "(1, -2)",
      B: "(-2, 4)",
      C: "(-3, 1)",
      D: "(1, 2)"
    },
    correctAnswer: "C",
    explanation: "For a uniform triangular plate, the centre of mass is at its centroid:\\n$$x_{cm} = \\frac{x_1 + x_2 + x_3}{3} = 0 \\implies 1 + 2 + x_3 = 0 \\implies x_3 = -3$$\\n$$y_{cm} = \\frac{y_1 + y_2 + y_3}{3} = 0 \\implies 3 + (-4) + y_3 = 0 \\implies y_3 = 1$$\\n\\n3rd vertex: $(-3, 1)$."
  },
  {
    order: 56,
    id: "g_com_11",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Three bodies having masses $5\\text{ kg}$, $4\\text{ kg}$, and $2\\text{ kg}$ are moving at speeds of $5\\text{ ms}^{-1}$, $4\\text{ ms}^{-1}$, and $2\\text{ ms}^{-1}$ respectively along the $X$-axis. The magnitude of the velocity of the centre of mass is:",
    options: {
      A: "1.0 ms^{-1}",
      B: "4 ms^{-1}",
      C: "0.9 ms^{-1}",
      D: "1.3 ms^{-1}"
    },
    correctAnswer: "B",
    explanation: "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2 + m_3 v_3}{m_1 + m_2 + m_3} = \\frac{5(5) + 4(4) + 2(2)}{5 + 4 + 2} = \\frac{25 + 16 + 4}{11} = \\frac{45}{11} \\approx 4.09\\text{ ms}^{-1} \\approx 4\\text{ ms}^{-1}$$."
  },
  {
    order: 57,
    id: "g_com_12",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "Two bodies of masses $2\\text{ kg}$ and $4\\text{ kg}$ are moving with velocities $20\\text{ ms}^{-1}$ and $10\\text{ ms}^{-1}$ towards each other due to mutual gravitational attraction. What is the velocity of their centre of mass?",
    options: {
      A: "5 ms^{-1}",
      B: "6 ms^{-1}",
      C: "8 ms^{-1}",
      D: "Zero"
    },
    correctAnswer: "D",
    explanation: "Mutual gravitational attraction is an internal force. In the absence of external forces ($F_{\\text{ext}} = 0$), the centre of mass remains in its initial state of rest. Hence $v_{cm} = 0$."
  },
  {
    order: 58,
    id: "g_com_13",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "If the density and thickness of a square plate of side $l$ and a circular plate of diameter $l$ placed adjacent to each other are the same, the centre of mass of the composite system will be:",
    options: {
      A: "Inside the square plate",
      B: "Inside the circular plate",
      C: "At the point of contact",
      D: "Outside the system"
    },
    correctAnswer: "A",
    explanation: "Area of square plate $A_1 = l^2$.\\nArea of circular plate $A_2 = \\pi (l/2)^2 = \\frac{\\pi l^2}{4} \\approx 0.785 l^2$.\\nSince the square plate has greater mass than the circular plate, the centre of mass of the composite system lies closer to the heavier body, i.e., inside the square plate."
  },
  {
    order: 59,
    id: "g_com_14",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Three identical spheres, each of mass $M$, are placed at the corners of a right-angled triangle with mutually perpendicular sides equal to $2\\text{ m}$. Taking the right-angled vertex as origin, find the position vector of the centre of mass:",
    options: {
      A: "2(\\hat{i} + \\hat{j})",
      B: "(\\hat{i} + \\hat{j})",
      C: "\\frac{2}{3}(\\hat{i} + \\hat{j})",
      D: "\\frac{4}{3}(\\hat{i} + \\hat{j})"
    },
    correctAnswer: "C",
    explanation: "$$\\vec{r}_1 = (0,0), \\quad \\vec{r}_2 = 2\\hat{i}, \\quad \\vec{r}_3 = 2\\hat{j}$$\\n$$\\vec{r}_{cm} = \\frac{M(0) + M(2\\hat{i}) + M(2\\hat{j})}{3M} = \\frac{2}{3}(\\hat{i} + \\hat{j})$$."
  },
  {
    order: 60,
    id: "g_com_15",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A uniform thin rod $AB$ of length $L$ has linear mass density $\\mu(x) = a + \\frac{bx}{L}$, where $x$ is measured from $A$. If the centre of mass of the rod lies at a distance of $\\frac{7}{12}L$ from $A$, then $a$ and $b$ are related as:",
    options: {
      A: "a = 2b",
      B: "2a = b",
      C: "a = b",
      D: "3a = 2b"
    },
    correctAnswer: "B",
    explanation: "$$M = \\int_0^L \\left(a + \\frac{bx}{L}\\right) dx = aL + \\frac{bL}{2} = L\\left(a + \\frac{b}{2}\\right)$$\\n$$\\int_0^L x \\mu(x) dx = \\int_0^L \\left(ax + \\frac{bx^2}{L}\\right) dx = \\frac{aL^2}{2} + \\frac{bL^2}{3} = L^2\\left(\\frac{a}{2} + \\frac{b}{3}\\right)$$\\n$$x_{cm} = L \\frac{3a + 2b}{6a + 3b} = \\frac{7}{12}L \\implies 12(3a + 2b) = 7(6a + 3b) \\implies 36a + 24b = 42a + 21b$$\\n$$3b = 6a \\implies b = 2a$$."
  },
  {
    order: 61,
    id: "g_com_16",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "When an explosive shell travelling in a parabolic path under the effect of gravity explodes in mid air, the centre of mass of the fragments will move:",
    options: {
      A: "Vertically downwards",
      B: "Along the original parabolic path",
      C: "Vertically upwards and then vertically downwards",
      D: "Horizontally followed by parabolic path"
    },
    correctAnswer: "B",
    explanation: "The explosion is caused purely by internal forces. The external gravitational force $M\\vec{g}$ remains unchanged, so the centre of mass of all fragments continues along the exact original parabolic trajectory until fragments strike the ground."
  },
  {
    order: 62,
    id: "g_com_17",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "Particles of masses $m, 2m, 3m, \\dots, nm\\text{ grams}$ are placed on the same line at distances $l, 2l, 3l, \\dots, nl\\text{ cm}$ from a fixed point. The distance of the centre of mass from the fixed point is:",
    options: {
      A: "\\frac{(2n+1)l}{3}",
      B: "\\frac{l}{n+1}",
      C: "\\frac{n(n^2+1)l}{2}",
      D: "\\frac{2l}{n(n^2+1)}"
    },
    correctAnswer: "A",
    explanation: "$$x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i} = \\frac{m l \\sum_{i=1}^n i^2}{m \\sum_{i=1}^n i} = l \\frac{\\frac{n(n+1)(2n+1)}{6}}{\\frac{n(n+1)}{2}} = \\frac{(2n+1)l}{3}$$."
  },
  {
    order: 63,
    id: "g_com_18",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "Three identical spherical metal balls, each of radius $r$, are placed touching each other on a horizontal surface such that an equilateral triangle is formed when their centres are joined. The centre of mass of the system is located at:",
    options: {
      A: "Horizontal surface",
      B: "Centre of one of the balls",
      C: "Line joining centres of any two balls",
      D: "Point of intersection of their medians"
    },
    correctAnswer: "D",
    explanation: "By symmetry, the centre of mass of three identical masses situated at the vertices of an equilateral triangle lies at the centroid (intersection point of medians) of the triangle."
  },
  {
    order: 64,
    id: "g_com_19",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "An object flying in air with velocity $(20\\hat{i} + 25\\hat{j} - 12\\hat{k})$ suddenly breaks into two pieces whose masses are in the ratio $1 : 5$. The smaller mass flies off with a velocity $(100\\hat{i} + 35\\hat{j} + 8\\hat{k})$. The velocity of the larger piece will be:",
    options: {
      A: "4\\hat{i} + 23\\hat{j} - 16\\hat{k}",
      B: "-100\\hat{i} - 35\\hat{j} - 8\\hat{k}",
      C: "20\\hat{i} + 15\\hat{j} - 80\\hat{k}",
      D: "-20\\hat{i} + 15\\hat{j} - 80\\hat{k}"
    },
    correctAnswer: "A",
    explanation: "Conservation of linear momentum: $M\\vec{v} = m_1 \\vec{v}_1 + m_2 \\vec{v}_2$.\\nWith $m_1 = m, m_2 = 5m, M = 6m$:\\n$$6(20\\hat{i} + 25\\hat{j} - 12\\hat{k}) = 1(100\\hat{i} + 35\\hat{j} + 8\\hat{k}) + 5\\vec{v}_2$$\\n$$5\\vec{v}_2 = (120 - 100)\\hat{i} + (150 - 35)\\hat{j} + (-72 - 8)\\hat{k} = 20\\hat{i} + 115\\hat{j} - 80\\hat{k}$$\\n$$\\vec{v}_2 = 4\\hat{i} + 23\\hat{j} - 16\\hat{k}$$."
  },
  {
    order: 65,
    id: "g_com_20",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Two masses $m_1$ and $m_2$ ($m_1 > m_2$) are connected by a massless flexible string passing over a frictionless pulley. The acceleration of the centre of mass of the system is:",
    options: {
      A: "\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)^2 g",
      B: "\\left(\\frac{m_1 + m_2}{m_1 - m_2}\\right)^2 g",
      C: "\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g",
      D: "g"
    },
    correctAnswer: "A",
    explanation: "Common acceleration of masses: $a = \\frac{m_1 - m_2}{m_1 + m_2} g$.\\nSince $m_1$ accelerates downwards ($\vec{a}_1 = -a\\hat{j}$) and $m_2$ accelerates upwards ($\vec{a}_2 = +a\\hat{j}$):\\n$$\\vec{a}_{cm} = \\frac{m_1(-a) + m_2(a)}{m_1 + m_2} = -\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) a = -\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)^2 g$$."
  },
  {
    order: 66,
    id: "g_com_21",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A solid sphere of mass $M$ is at $(0, a)$, a hollow sphere of mass $M$ at $(0, 0)$, and a disk of mass $M$ at $(a, 0)$. The coordinates of the centre of mass of the system are:",
    options: {
      A: "(a/3, 0)",
      B: "(a/2, a/2)",
      C: "(a/3, a/3)",
      D: "(0, a/3)"
    },
    correctAnswer: "C",
    explanation: "$$x_{cm} = \\frac{M(0) + M(0) + M(a)}{3M} = \\frac{a}{3}$$\\n$$y_{cm} = \\frac{M(a) + M(0) + M(0)}{3M} = \\frac{a}{3}$$\\n\\nCoordinates: $(a/3, a/3)$."
  },
  {
    order: 67,
    id: "g_com_22",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "A $2\\text{ kg}$ body and a $3\\text{ kg}$ body are moving along the $x$-axis. At a particular instant the $2\\text{ kg}$ body has a velocity of $3\\text{ m/s}$ and the $3\\text{ kg}$ body has a velocity of $2\\text{ m/s}$. The velocity of the centre of mass at that instant is:",
    options: {
      A: "5 m/s",
      B: "1 m/s",
      C: "zero",
      D: "2.4 m/s"
    },
    correctAnswer: "D",
    explanation: "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{2(3) + 3(2)}{2 + 3} = \\frac{6 + 6}{5} = \\frac{12}{5} = 2.4\\text{ m/s}$$."
  },
  {
    order: 68,
    id: "g_com_23",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A uniform disc of radius $R$ has a circular hole of radius $R/4$ removed with centre at distance $R/4$ to the right of the disc centre $A$. The centre of mass of the shaded remaining portion is located at:",
    options: {
      A: "\\frac{R}{20} \\text{ to the left of } A",
      B: "\\frac{R}{12} \\text{ to the left of } A",
      C: "\\frac{R}{20} \\text{ to the right of } A",
      D: "\\frac{R}{12} \\text{ to the right of } A"
    },
    correctAnswer: "A",
    explanation: "$$A_1 = \\pi R^2, \\quad x_1 = 0$$\\n$$A_2 = \\pi (R/4)^2 = \\frac{\\pi R^2}{16}, \\quad x_2 = +R/4$$\\n$$x_{cm} = \\frac{A_1 x_1 - A_2 x_2}{A_1 - A_2} = \\frac{0 - (\\pi R^2/16)(R/4)}{\\pi R^2 - \\pi R^2/16} = \\frac{-R/64}{15/16} = -\\frac{R}{60} \\approx -\\frac{R}{20} \\text{ to the left of } A$$."
  },
  {
    order: 69,
    id: "g_com_24",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A uniform disc of radius $R$ is placed over another uniform disc of radius $2R$ of same thickness and density. The peripheries of the two discs touch each other. The position of their centre of mass is:",
    options: {
      A: "At R/3 from the centre of the bigger disc towards the centre of the smaller disc",
      B: "At R/5 from the centre of the bigger disc towards the centre of the smaller disc",
      C: "At 2R/5 from the centre of the bigger disc towards the centre of the smaller disc",
      D: "At 2R/5 from the centre of the smaller disc"
    },
    correctAnswer: "B",
    explanation: "Bigger disc: radius $2R$, mass $M_1 \\propto \\pi (2R)^2 = 4M$, center at $x = 0$.\\nSmaller disc: radius $R$, mass $M_2 \\propto \\pi R^2 = M$, center at $x = R$.\\n\\n$$x_{cm} = \\frac{4M(0) + M(R)}{4M + M} = \\frac{MR}{5M} = \\frac{R}{5}$$ towards the smaller disc."
  },
  {
    order: 70,
    id: "g_com_25",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "Assertion: When a body dropped from a height explodes in mid air, its centre of mass keeps moving in vertically downward direction.\\nReason: Explosion occurs under internal forces only. External force is zero.",
    options: {
      A: "Assertion is True, Reason is True; Reason is correct explanation for Assertion.",
      B: "Assertion is True, Reason is True; Reason is not correct explanation for Assertion.",
      C: "Assertion is True, Reason is False.",
      D: "Assertion is False, Reason is True."
    },
    correctAnswer: "A",
    explanation: "The explosion is due to internal forces which cannot alter the motion of the centre of mass. The only external force is downward gravity, so the COM maintains its straight downward motion under gravity."
  },
  {
    order: 71,
    id: "g_com_26",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Two particles of masses $p$ and $q$ ($p > q$) are separated by a distance $d$. The shift in the position of the centre of mass when the two particles are interchanged is:",
    options: {
      A: "d(p + q)/(p - q)",
      B: "d(p - q)/(p + q)",
      C: "dp/(p - q)",
      D: "dq/(p - q)"
    },
    correctAnswer: "B",
    explanation: "Taking initial position of $p$ at $x=0$ and $q$ at $x=d$:\\n$x_{cm1} = \\frac{q d}{p + q}$.\\nWhen interchanged, $q$ is at $0$ and $p$ is at $d$:\\n$x_{cm2} = \\frac{p d}{p + q}$.\\n\\n$$\\text{Shift } \\Delta x = |x_{cm2} - x_{cm1}| = \\frac{d(p - q)}{p + q}$$."
  },
  {
    order: 72,
    id: "g_com_27",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Match Column I with Column II for the position of centre of mass:\\nColumn I:\\n(A) Uniform square plate\\n(B) Uniform semicircular disc (radius R)\\n(C) Solid hemisphere (radius R)\\nColumn II:\\n(p) At centre\\n(q) $\\frac{4R}{3\\pi}$ from centre on axis of symmetry\\n(r) $\\frac{3R}{8}$ from centre on axis of symmetry",
    options: {
      A: "A→p, B→q, C→r",
      B: "A→q, B→p, C→r",
      C: "A→r, B→q, C→r",
      D: "A→q, B→r, C→p"
    },
    correctAnswer: "A",
    explanation: "Standard center of mass locations:\\n• Uniform square plate $\\to$ Geometric centre (p)\\n• Semicircular disc $\\to \\frac{4R}{3\\pi}$ from base (q)\\n• Solid hemisphere $\\to \\frac{3R}{8}$ from base centre (r)."
  },
  {
    order: 73,
    id: "g_com_28",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "In two separate collisions, the coefficients of restitution $e_1$ and $e_2$ are in the ratio $3 : 1$. In the first collision, the relative velocity of approach is twice the relative velocity of separation. Then, the ratio between the relative velocity of approach and relative velocity of separation in the second collision is:",
    options: {
      A: "1 : 6",
      B: "2 : 3",
      C: "3 : 2",
      D: "6 : 1"
    },
    correctAnswer: "D",
    explanation: "$$e_1 = \\frac{v_{\\text{sep1}}}{v_{\\text{app1}}} = \\frac{1}{2}$$\\nSince $\\frac{e_1}{e_2} = \\frac{3}{1} \\implies e_2 = \\frac{e_1}{3} = \\frac{1/2}{3} = \\frac{1}{6}$.\\n\\n$$\\frac{v_{\\text{app2}}}{v_{\\text{sep2}}} = \\frac{1}{e_2} = \\frac{1}{1/6} = 6 : 1$$."
  },
  {
    order: 74,
    id: "g_com_29",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Two objects of mass $m$ each moving with speed $u\\text{ ms}^{-1}$ collide at $90^\\circ$ and stick together. The final linear momentum of the combined system is:",
    options: {
      A: "mu",
      B: "2mu",
      C: "\\sqrt{2} mu",
      D: "2\\sqrt{2} mu"
    },
    correctAnswer: "C",
    explanation: "$$\\vec{P}_1 = m u \\hat{i}, \\quad \\vec{P}_2 = m u \\hat{j}$$\\n$$\\vec{P}_{\\text{total}} = m u \\hat{i} + m u \\hat{j} \\implies |\\vec{P}_{\\text{total}}| = \\sqrt{(mu)^2 + (mu)^2} = \\sqrt{2} m u$$."
  },
  {
    order: 75,
    id: "g_com_30",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A heavy ball moving with speed $v$ collides head-on elastically with a tiny ball at rest. Immediately after the impact, the second (tiny) ball will move with a speed approximately equal to:",
    options: {
      A: "v",
      B: "2v",
      C: "v/2",
      D: "v/3"
    },
    correctAnswer: "B",
    explanation: "For an elastic collision with $m_1 \\gg m_2$ and $u_2 = 0$:\\n$$v_2 = \\frac{2m_1 u_1}{m_1 + m_2} + \\frac{(m_2 - m_1)u_2}{m_1 + m_2} \\approx \\frac{2m_1 v}{m_1} = 2v$$."
  },
  {
    order: 76,
    id: "g_com_31",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A bomb of mass $30\\text{ kg}$ at rest explodes into two pieces of masses $18\\text{ kg}$ and $12\\text{ kg}$. The velocity of the $18\\text{ kg}$ mass is $6\\text{ ms}^{-1}$. The kinetic energy of the other mass is:",
    options: {
      A: "256 J",
      B: "486 J",
      C: "524 J",
      D: "324 J"
    },
    correctAnswer: "B",
    explanation: "Conservation of momentum: $m_1 v_1 = m_2 v_2 \\implies 18 \\times 6 = 12 \\times v_2 \\implies 108 = 12 v_2 \\implies v_2 = 9\\text{ ms}^{-1}$.\\n$$K_2 = \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}(12)(9^2) = 6 \\times 81 = 486\\text{ J}$$."
  },
  {
    order: 77,
    id: "g_com_32",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "Two identical thin uniform rods of length $L$ each are joined to form a T-shape (horizontal top bar $AB$ of length $L$ and vertical stem $CD$ of length $L$). The distance of the centre of mass from the bottom $D$ is:",
    options: {
      A: "0",
      B: "L/4",
      C: "3L/4",
      D: "L"
    },
    correctAnswer: "C",
    explanation: "Vertical rod $CD$: mass $M$, centre of mass at $y = L/2$ from $D$.\\nHorizontal rod $AB$: mass $M$, centre of mass at top end $y = L$ from $D$.\\n\\n$$y_{cm} = \\frac{M(L/2) + M(L)}{2M} = \\frac{1.5L}{2} = \\frac{3L}{4}$$."
  },
  {
    order: 78,
    id: "g_com_33",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A truck moving on a horizontal road towards east with velocity $20\\text{ ms}^{-1}$ collides elastically with a light ball moving with velocity $25\\text{ ms}^{-1}$ along west. The velocity of the ball just after collision is:",
    options: {
      A: "65 ms^{-1} towards east",
      B: "25 ms^{-1} towards west",
      C: "65 ms^{-1} towards west",
      D: "20 ms^{-1} towards east"
    },
    correctAnswer: "A",
    explanation: "Taking East as positive $+x$:\\n$u_1 = +20\\text{ ms}^{-1}$ (truck, $M \\gg m$), $u_2 = -25\\text{ ms}^{-1}$ (light ball).\\n$$v_2 = 2u_1 - u_2 = 2(+20) - (-25) = 40 + 25 = +65\\text{ ms}^{-1} \\text{ (East)}$$."
  },
  {
    order: 79,
    id: "g_com_34",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A particle of mass $m$ moving with speed $2v$ collides with a mass $2m$ moving with speed $v$ in the same direction. After collision, the first mass stops completely while the second splits into two particles each of mass $m$, which move at angle $45^\\circ$ with respect to the original direction. The speed of each of the moving particles will be:",
    options: {
      A: "v/(2\\sqrt{2})",
      B: "\\sqrt{2}v",
      C: "v/\\sqrt{2}",
      D: "2\\sqrt{2}v"
    },
    correctAnswer: "D",
    explanation: "Initial momentum along forward axis: $P_i = m(2v) + 2m(v) = 4mv$.\\nFinal momentum along forward axis: $P_f = m v' \\cos 45^\\circ + m v' \\cos 45^\\circ = 2m v' \\left(\\frac{1}{\\sqrt{2}}\\right) = \\sqrt{2} m v'$.\\n$$4mv = \\sqrt{2} m v' \\implies v' = \\frac{4}{\\sqrt{2}} v = 2\\sqrt{2}v$$."
  },
  {
    order: 80,
    id: "g_com_35",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A body of mass $m_1 = 4\\text{ kg}$ moves at $5\\hat{i}\\text{ ms}^{-1}$ and another body of mass $m_2 = 2\\text{ kg}$ moves at $10\\hat{i}\\text{ ms}^{-1}$. The kinetic energy of the centre of mass is:",
    options: {
      A: "\\frac{200}{3} J",
      B: "\\frac{500}{3} J",
      C: "\\frac{400}{3} J",
      D: "\\frac{800}{3} J"
    },
    correctAnswer: "C",
    explanation: "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{4(5) + 2(10)}{4 + 2} = \\frac{40}{6} = \\frac{20}{3}\\text{ ms}^{-1}$$\\n$$K_{cm} = \\frac{1}{2} M_{\\text{total}} v_{cm}^2 = \\frac{1}{2}(6)\\left(\\frac{20}{3}\\right)^2 = 3 \\times \\frac{400}{9} = \\frac{400}{3}\\text{ J}$$."
  },
  {
    order: 81,
    id: "g_com_36",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "A ball hits the floor and rebounds after an inelastic collision. In this case:",
    options: {
      A: "the momentum of the ball just after collision is the same as that just before",
      B: "the mechanical energy of the ball remains the same",
      C: "the total momentum of the ball and the earth is conserved",
      D: "the total kinetic energy of the ball and the earth is conserved"
    },
    correctAnswer: "C",
    explanation: "For the isolated (ball + Earth) system, no net external force acts, so total momentum is strictly conserved in any collision (elastic or inelastic)."
  },
  {
    order: 82,
    id: "g_com_37",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A body of mass $5 \\times 10^3\\text{ kg}$ moving with speed $2\\text{ ms}^{-1}$ collides with a body of mass $15 \\times 10^3\\text{ kg}$ at rest inelastically and sticks to it. The loss in kinetic energy of the system is:",
    options: {
      A: "7.5 kJ",
      B: "15 kJ",
      C: "10 kJ",
      D: "5 kJ"
    },
    correctAnswer: "A",
    explanation: "$$\\Delta K = \\frac{1}{2} \\frac{m_1 m_2}{m_1 + m_2} (u_1 - u_2)^2 = \\frac{1}{2} \\frac{(5 \\times 10^3)(15 \\times 10^3)}{20 \\times 10^3} (2 - 0)^2$$\\n$$\\Delta K = \\frac{1}{2} \\times \\frac{75 \\times 10^3}{20} \\times 4 = \\frac{75 \\times 10^3}{10} = 7.5 \\times 10^3\\text{ J} = 7.5\\text{ kJ}$$."
  },
  {
    order: 83,
    id: "g_com_38",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "A body of mass $a$ moving with velocity $b$ strikes a stationary body of mass $c$ and gets embedded into it. The velocity of the composite system after collision is:",
    options: {
      A: "\\frac{a+c}{ab}",
      B: "\\frac{ab}{a+c}",
      C: "\\frac{a}{b+c}",
      D: "\\frac{a}{a+b}"
    },
    correctAnswer: "B",
    explanation: "$$P_i = a \\times b, \\quad P_f = (a + c) v \\implies v = \\frac{ab}{a + c}$$."
  },
  {
    order: 84,
    id: "g_com_39",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A $5\\text{ kg}$ body collides with another stationary body. After the collision, the bodies move in the same direction with one-third of the velocity of the first body. The mass of the second body will be:",
    options: {
      A: "5 kg",
      B: "10 kg",
      C: "15 kg",
      D: "20 kg"
    },
    correctAnswer: "B",
    explanation: "$$5u = (5 + M)\\left(\\frac{u}{3}\\right) \\implies 15 = 5 + M \\implies M = 10\\text{ kg}$$."
  },
  {
    order: 85,
    id: "g_com_40",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "A boy of mass $50\\text{ kg}$ is standing at one end of a boat of length $9\\text{ m}$ and mass $400\\text{ kg}$ floating in still water. He runs to the other end. The distance through which the centre of mass of the (boat + boy) system moves is:",
    options: {
      A: "zero",
      B: "1 m",
      C: "2 m",
      D: "3 m"
    },
    correctAnswer: "A",
    explanation: "Since no external horizontal force acts on the (boy + boat) system, the centre of mass does not shift at all: $\\Delta x_{cm} = 0$."
  },
  {
    order: 86,
    id: "g_com_41",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Easy",
    question: "Two equal masses $m_1$ and $m_2$ moving along the same straight line with velocities $+3\\text{ m/s}$ and $-5\\text{ m/s}$ respectively collide elastically. Their velocities after the collision will be respectively:",
    options: {
      A: "+4 m/s for both",
      B: "-3 m/s and +5 m/s",
      C: "-4 m/s and +4 m/s",
      D: "-5 m/s and +3 m/s"
    },
    correctAnswer: "D",
    explanation: "When two bodies of equal mass collide elastically in one dimension, they completely interchange their velocities: $v_1 = u_2 = -5\\text{ m/s}$ and $v_2 = u_1 = +3\\text{ m/s}$."
  },
  {
    order: 87,
    id: "g_com_42",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Medium",
    question: "A moving block having mass $m$ collides head-on with another stationary block having mass $4m$. The lighter block comes to rest after collision. If the initial velocity of the lighter block is $v$, the coefficient of restitution ($e$) is:",
    options: {
      A: "0.8",
      B: "0.25",
      C: "0.5",
      D: "0.4"
    },
    correctAnswer: "B",
    explanation: "Conservation of momentum: $m v = m(0) + 4m v_2 \\implies v_2 = \\frac{v}{4}$.\\n$$e = \\frac{v_2 - v_1}{u_1 - u_2} = \\frac{v/4 - 0}{v - 0} = \\frac{1}{4} = 0.25$$."
  },
  {
    order: 88,
    id: "g_com_43",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A rubber ball drops from a height $h$ and after rebounding twice from the ground, it rises to $h/2$. The coefficient of restitution is:",
    options: {
      A: "1/2",
      B: "(1/2)^{1/2}",
      C: "(1/2)^{1/4}",
      D: "(1/2)^{1/6}"
    },
    correctAnswer: "C",
    explanation: "Height after $n$ bounces: $h_n = e^{2n} h$.\\nFor $n = 2$ bounces: $h_2 = e^4 h = \\frac{h}{2} \\implies e^4 = \\frac{1}{2} \\implies e = \\left(\\frac{1}{2}\\right)^{1/4}$."
  },
  {
    order: 89,
    id: "g_com_44",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A block of mass $m_1$ on a smooth horizontal table is connected by a string over a pulley to a hanging mass $m_2$. The system is released from rest. The $x$-component of acceleration of the centre of mass is:",
    options: {
      A: "(a_{cm})_x = \\frac{m_1 m_2 g}{m_1 + m_2}",
      B: "(a_{cm})_x = \\frac{m_1 m_2 g}{(m_1 + m_2)^2}",
      C: "(a_{cm})_x = \\left(\\frac{m_2}{m_1 + m_2}\\right)^2 g",
      D: "(a_{cm})_x = \\left(\\frac{m_2}{m_1 + m_2}\\right) g"
    },
    correctAnswer: "B",
    explanation: "Acceleration of the system $a = \\frac{m_2 g}{m_1 + m_2}$.\\nHorizontal acceleration of $m_1$ is $a_x = a$; horizontal acceleration of $m_2$ is zero.\\n$$(a_{cm})_x = \\frac{m_1 a + m_2(0)}{m_1 + m_2} = \\frac{m_1}{m_1 + m_2} \\left(\\frac{m_2 g}{m_1 + m_2}\\right) = \\frac{m_1 m_2 g}{(m_1 + m_2)^2}$$."
  },
  {
    order: 90,
    id: "g_com_45",
    subject: "Physics",
    topic: "Centre of Mass & System of Particles",
    difficulty: "Hard",
    question: "A mass $m$ moves with velocity $v$ and collides inelastically with another identical stationary mass. After collision, the 1st mass moves with velocity $\\frac{v}{\\sqrt{3}}$ in a direction perpendicular to the initial direction. The speed of the 2nd mass after collision is:",
    options: {
      A: "\\frac{2}{\\sqrt{3}}v",
      B: "\\frac{v}{\\sqrt{3}}",
      C: "v",
      D: "\\sqrt{3}v"
    },
    correctAnswer: "A",
    explanation: "Initial momentum: $\\vec{P}_i = m v \\hat{i}$.\\nAfter collision: $\\vec{P}_1 = m \\left(\\frac{v}{\\sqrt{3}}\\right) \\hat{j}$.\\nFrom conservation of momentum: $\\vec{P}_2 = m v \\hat{i} - m \\frac{v}{\\sqrt{3}} \\hat{j}$.\\n$$v_2 = \\sqrt{v^2 + \\left(\\frac{v}{\\sqrt{3}}\\right)^2} = \\sqrt{v^2 + \\frac{v^2}{3}} = \\sqrt{\\frac{4v^2}{3}} = \\frac{2}{\\sqrt{3}}v$$."
  },
{
    order: 91,
    id: "g_rot_1",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The moment of the force $\\vec{F} = (4\\hat{i} + 5\\hat{j} - 6\\hat{k})$ at $(2, 0, -3)$ about the point $(2, -2, -2)$ is given by:",
    options: {
      A: "-7\\hat{i} - 8\\hat{j} - 4\\hat{k}",
      B: "-4\\hat{i} - \\hat{j} - 8\\hat{k}",
      C: "-8\\hat{i} - 4\\hat{j} - 7\\hat{k}",
      D: "-7\\hat{i} - 4\\hat{j} - 8\\hat{k}"
    },
    correctAnswer: "D",
    explanation: "$$\\vec{r} = \\vec{r}_{\\text{point}} - \\vec{r}_{\\text{axis}} = (2\\hat{i} + 0\\hat{j} - 3\\hat{k}) - (2\\hat{i} - 2\\hat{j} - 2\\hat{k}) = 0\\hat{i} + 2\\hat{j} - \\hat{k}$$\\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 0 & 2 & -1 \\\\ 4 & 5 & -6 \\end{vmatrix} = \\hat{i}(-12 - (-5)) - \\hat{j}(0 - (-4)) + \\hat{k}(0 - 8) = -7\\hat{i} - 4\\hat{j} - 8\\hat{k}$$."
  },
  {
    order: 92,
    id: "g_rot_2",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "A particle of mass $1\\text{ kg}$ is kept at $(1\\text{m}, 1\\text{m}, 1\\text{m})$. The moment of inertia of this particle about the $z$-axis is:",
    options: {
      A: "1 kg-m^2",
      B: "2 kg-m^2",
      C: "3 kg-m^2",
      D: "4 kg-m^2"
    },
    correctAnswer: "B",
    explanation: "Perpendicular distance from the $z$-axis is $r_\\perp = \\sqrt{x^2 + y^2} = \\sqrt{1^2 + 1^2} = \\sqrt{2}\\text{ m}$.\\n$$I_z = m r_\\perp^2 = 1 \\times (\\sqrt{2})^2 = 2\\text{ kg-m}^2$$."
  },
  {
    order: 93,
    id: "g_rot_3",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A small part of the rim of a flywheel breaks off while it is rotating at a constant angular speed. Then its radius of gyration will:",
    options: {
      A: "Increase",
      B: "Decrease",
      C: "Remain unchanged",
      D: "Nothing definite can be said"
    },
    correctAnswer: "B",
    explanation: "When a portion of the outermost rim (which is at the maximum radius $R$) breaks away, the remaining mass distribution has a greater fraction closer to the hub/axis. Thus, the radius of gyration $k = \\sqrt{I/M}$ decreases."
  },
  {
    order: 94,
    id: "g_rot_4",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The angular speed of the wheel of a vehicle is increased from $360\\text{ rpm}$ to $1200\\text{ rpm}$ in $14\\text{ seconds}$. Its angular acceleration is:",
    options: {
      A: "2\\pi\\text{ rad/s}^2",
      B: "28\\pi\\text{ rad/s}^2",
      C: "120\\pi\\text{ rad/s}^2",
      D: "1\\text{ rad/s}^2"
    },
    correctAnswer: "A",
    explanation: "$$\\omega_0 = \\frac{2\\pi(360)}{60} = 12\\pi\\text{ rad/s}, \\quad \\omega = \\frac{2\\pi(1200)}{60} = 40\\pi\\text{ rad/s}$$\\n$$\\alpha = \\frac{\\omega - \\omega_0}{t} = \\frac{40\\pi - 12\\pi}{14} = \\frac{28\\pi}{14} = 2\\pi\\text{ rad/s}^2$$."
  },
  {
    order: 95,
    id: "g_rot_5",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "Three identical rings, each of mass $m$ and radius $r$, are arranged such that two top rings touch symmetrically and one bottom ring is central. The moment of inertia of the arrangement about the vertical $YY'$ axis is:",
    options: {
      A: "\\frac{7}{2}mr^2",
      B: "\\frac{2}{7}mr^2",
      C: "\\frac{2}{5}mr^2",
      D: "\\frac{5}{2}mr^2"
    },
    correctAnswer: "A",
    explanation: "For the bottom ring (3), $YY'$ passes through its diameter $\\implies I_3 = \\frac{1}{2}mr^2$.\\nFor the two top rings (1 & 2), the axis is parallel to their diameter at a distance $r$ from their centers:\\n$$I_1 = I_2 = I_{\\text{dia}} + mr^2 = \\frac{1}{2}mr^2 + mr^2 = \\frac{3}{2}mr^2$$\\n$$I_{\\text{total}} = I_1 + I_2 + I_3 = \\frac{3}{2}mr^2 + \\frac{3}{2}mr^2 + \\frac{1}{2}mr^2 = \\frac{7}{2}mr^2$$."
  },
  {
    order: 96,
    id: "g_rot_6",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A thin circular disc of mass $M$ and radius $R$ is rotating about its central perpendicular axis with angular velocity $\\omega$. If another disc of same dimensions but of mass $M/4$ is placed gently on it co-axially, the new angular velocity is:",
    options: {
      A: "\\frac{5}{4}\\omega",
      B: "\\frac{2}{3}\\omega",
      C: "\\frac{4}{5}\\omega",
      D: "\\frac{3}{2}\\omega"
    },
    correctAnswer: "C",
    explanation: "Conservation of angular momentum: $I_1 \\omega = (I_1 + I_2) \\omega'$.\\n$$I_1 = \\frac{1}{2}MR^2, \\quad I_2 = \\frac{1}{2}\\left(\\frac{M}{4}\\right)R^2 = \\frac{I_1}{4}$$\\n$$I_1 \\omega = \\left(I_1 + \\frac{I_1}{4}\\right)\\omega' = \\frac{5}{4}I_1 \\omega' \\implies \\omega' = \\frac{4}{5}\\omega$$."
  },
  {
    order: 97,
    id: "g_rot_7",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The position of a particle is given by $\\vec{r} = \\hat{i} + 2\\hat{j} - \\hat{k}$ and its linear momentum is $\\vec{p} = 3\\hat{i} + 4\\hat{j} - 2\\hat{k}$. Its angular momentum about the origin is perpendicular to:",
    options: {
      A: "x-axis",
      B: "y-axis",
      C: "z-axis",
      D: "y-z plane"
    },
    correctAnswer: "A",
    explanation: "$$\\vec{L} = \\vec{r} \\times \\vec{p} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & -1 \\\\ 3 & 4 & -2 \\end{vmatrix} = \\hat{i}(-4 - (-4)) - \\hat{j}(-2 - (-3)) + \\hat{k}(4 - 6) = 0\\hat{i} - \\hat{j} - 2\\hat{k}$$\\nSince the $x$-component is zero, $\\vec{L} \\cdot \\hat{i} = 0$, meaning $\\vec{L}$ is perpendicular to the $x$-axis."
  },
  {
    order: 98,
    id: "g_rot_8",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "A wheel is at rest. Its angular velocity increases uniformly and becomes $80\\text{ radian per second}$ after $5\\text{ seconds}$. The total angular displacement is:",
    options: {
      A: "800 rad",
      B: "400 rad",
      C: "200 rad",
      D: "100 rad"
    },
    correctAnswer: "C",
    explanation: "$$\\theta = \\left(\\frac{\\omega_0 + \\omega}{2}\\right) t = \\left(\\frac{0 + 80}{2}\\right) \\times 5 = 40 \\times 5 = 200\\text{ rad}$$."
  },
  {
    order: 99,
    id: "g_rot_9",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The instantaneous angular position of a point on a rotating wheel is given by $\\theta(t) = 2t^3 - 6t^2$. The torque on the wheel becomes zero at:",
    options: {
      A: "t = 0.5 s",
      B: "t = 0.25 s",
      C: "t = 2 s",
      D: "t = 1 s"
    },
    correctAnswer: "D",
    explanation: "$$\\omega = \\frac{d\\theta}{dt} = 6t^2 - 12t, \\quad \\alpha = \\frac{d\\omega}{dt} = 12t - 12$$\\nTorque $\\tau = I\\alpha = 0 \\implies 12t - 12 = 0 \\implies t = 1\\text{ s}$."
  },
  {
    order: 100,
    id: "g_rot_10",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "Find the torque about the origin when a force of $3\\hat{j}\\text{ N}$ acts on a particle whose position vector is $2\\hat{k}\\text{ m}$:",
    options: {
      A: "6\\hat{j} N-m",
      B: "-6\\hat{i} N-m",
      C: "6\\hat{k} N-m",
      D: "6\\hat{i} N-m"
    },
    correctAnswer: "B",
    explanation: "$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = (2\\hat{k}) \\times (3\\hat{j}) = 6(\\hat{k} \\times \\hat{j}) = 6(-\\hat{i}) = -6\\hat{i}\\text{ N-m}$$."
  },
  {
    order: 101,
    id: "g_rot_11",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "Four solid spheres of diameter $2a$ and mass $M$ are placed with their centres on the four corners of a square of side $b$. The moment of inertia of the system about an axis along one side of the square is:",
    options: {
      A: "Ma^2 + 2Mb^2",
      B: "Ma^2",
      C: "Ma^2 + 4Mb^2",
      D: "\\frac{8}{5}Ma^2 + 2Mb^2"
    },
    correctAnswer: "D",
    explanation: "Radius of sphere is $a$. MOI of single sphere about diameter is $I_d = \\frac{2}{5}Ma^2$.\\nTwo spheres have their centres lying on the axis: $I_1 = 2 \\times \\left(\\frac{2}{5}Ma^2\\right) = \\frac{4}{5}Ma^2$.\\nTwo spheres are at perpendicular distance $b$ from the axis:\\n$$I_2 = 2 \\times \\left(\\frac{2}{5}Ma^2 + Mb^2\\right) = \\frac{4}{5}Ma^2 + 2Mb^2$$\\n$$I_{\\text{total}} = I_1 + I_2 = \\frac{8}{5}Ma^2 + 2Mb^2$$."
  },
  {
    order: 102,
    id: "g_rot_12",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "The angular momentum of a system of particles is conserved:",
    options: {
      A: "when no external force acts upon the system",
      B: "when no external torque acts upon the system",
      C: "when no external impulse acts upon the system",
      D: "when axis of rotation remains same"
    },
    correctAnswer: "B",
    explanation: "According to the principle of conservation of angular momentum, $\\frac{d\\vec{L}}{dt} = \\vec{\\tau}_{\\text{ext}}$. If $\\vec{\\tau}_{\\text{ext}} = 0$, then $\\vec{L}$ is constant."
  },
  {
    order: 103,
    id: "g_rot_13",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "One quarter sector is cut from a uniform circular disc of radius $R$. This sector has mass $M$. It is made to rotate about a line perpendicular to its plane and passing through the centre of the original disc. Its moment of inertia is:",
    options: {
      A: "\\frac{1}{2}MR^2",
      B: "\\frac{1}{4}MR^2",
      C: "\\frac{1}{8}MR^2",
      D: "\\sqrt{2}MR^2"
    },
    correctAnswer: "A",
    explanation: "For any uniform sector of a disc of radius $R$ and mass $M$, the mass elements are distributed with distance squared $r^2$ from the origin in exactly the same way as a full disc: $I = \\int r^2 dm = \\frac{1}{2}MR^2$."
  },
  {
    order: 104,
    id: "g_rot_14",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "Moment of inertia of a disc of radius $R$ about a diametric axis is $25\\text{ kg-m}^2$. The moment of inertia of the disc about a parallel axis at a distance $R/2$ from the centre is:",
    options: {
      A: "31.25 kg-m^2",
      B: "37.5 kg-m^2",
      C: "50 kg-m^2",
      D: "62.5 kg-m^2"
    },
    correctAnswer: "C",
    explanation: "About diametric axis: $I_d = \\frac{1}{4}MR^2 = 25\\text{ kg-m}^2 \\implies MR^2 = 100\\text{ kg-m}^2$.\\nBy parallel axis theorem for an in-plane parallel axis at distance $d = R/2$:\\n$$I = I_d + M(R/2)^2 = 25 + \\frac{MR^2}{4} = 25 + \\frac{100}{4} = 25 + 25 = 50\\text{ kg-m}^2$$."
  },
  {
    order: 105,
    id: "g_rot_15",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The moment of inertia of a ring of mass $M$ and radius $R$ about a parallel axis in its plane at a distance $R$ from the diameter ($PQ$) will be:",
    options: {
      A: "MR^2",
      B: "\\frac{MR^2}{2}",
      C: "\\frac{3}{2}MR^2",
      D: "2MR^2"
    },
    correctAnswer: "C",
    explanation: "$$I_{\\text{dia}} = \\frac{1}{2}MR^2$$\\n$$I_{PQ} = I_{\\text{dia}} + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2$$."
  },
  {
    order: 106,
    id: "g_rot_16",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "What is the moment of inertia of a solid sphere of uniform density $\\rho$ and radius $R$ about its diameter?",
    options: {
      A: "\\frac{105}{176} R^5 \\rho",
      B: "\\frac{105}{176} R^2 \\rho",
      C: "\\frac{176}{105} R^5 \\rho",
      D: "\\frac{186}{105} R^2 \\rho"
    },
    correctAnswer: "C",
    explanation: "$$M = \\frac{4}{3}\\pi R^3 \\rho$$\\n$$I = \\frac{2}{5}MR^2 = \\frac{2}{5}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right) R^2 = \\frac{8\\pi}{15} R^5 \\rho$$\\nUsing $\\pi = \\frac{22}{7}$:\\n$$I = \\frac{8 \\times 22}{15 \\times 7} R^5 \\rho = \\frac{176}{105} R^5 \\rho$$."
  },
  {
    order: 107,
    id: "g_rot_17",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The linear velocity of a particle moving with angular velocity $\\vec{\\omega} = 2\\hat{k}$ at position vector $\\vec{r} = 2\\hat{i} + 2\\hat{j}$ is:",
    options: {
      A: "4(\\hat{i} - \\hat{j})",
      B: "4(\\hat{j} - \\hat{i})",
      C: "4\\hat{i}",
      D: "-4\\hat{i}"
    },
    correctAnswer: "B",
    explanation: "$$\\vec{v} = \\vec{\\omega} \\times \\vec{r} = (2\\hat{k}) \\times (2\\hat{i} + 2\\hat{j}) = 4(\\hat{k} \\times \\hat{i}) + 4(\\hat{k} \\times \\hat{j}) = 4\\hat{j} - 4\\hat{i} = 4(\\hat{j} - \\hat{i})$$."
  },
  {
    order: 108,
    id: "g_rot_18",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "Angular momentum $L$ and rotational kinetic energy $K_R$ of a rigid body of moment of inertia $I$ are related as:",
    options: {
      A: "K_R = 2IL",
      B: "K_R = \\frac{L^2}{2I}",
      C: "K_R = \\frac{2I}{L}",
      D: "K_R = \\frac{L^2}{I}"
    },
    correctAnswer: "B",
    explanation: "$$L = I\\omega \\implies \\omega = \\frac{L}{I}$$\\n$$K_R = \\frac{1}{2}I\\omega^2 = \\frac{1}{2}I\\left(\\frac{L}{I}\\right)^2 = \\frac{L^2}{2I}$$."
  },
  {
    order: 109,
    id: "g_rot_19",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "The moment of inertia of a ring about its diameter is $I$. The moment of inertia of the same ring about the axis perpendicular to its plane and passing through its centre is:",
    options: {
      A: "I/2",
      B: "2I",
      C: "I/4",
      D: "4I"
    },
    correctAnswer: "B",
    explanation: "By perpendicular axis theorem: $I_z = I_x + I_y = I_d + I_d = 2I_d = 2I$."
  },
  {
    order: 110,
    id: "g_rot_20",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "Moment of inertia of a rod of mass $m$ and length $L$ about its one end is $I$. If one-fourth of its length is cut away, then moment of inertia of the remaining rod about its one end will be:",
    options: {
      A: "\\frac{3}{4}I",
      B: "\\frac{9}{16}I",
      C: "\\frac{27}{64}I",
      D: "\\frac{1}{16}I"
    },
    correctAnswer: "C",
    explanation: "$$I = \\frac{1}{3}mL^2$$\\nRemaining length $L' = \\frac{3}{4}L$, remaining mass $m' = \\frac{3}{4}m$.\\n$$I' = \\frac{1}{3}m'(L')^2 = \\frac{1}{3}\\left(\\frac{3}{4}m\\right)\\left(\\frac{3}{4}L\\right)^2 = \\frac{27}{64}\\left(\\frac{1}{3}mL^2\\right) = \\frac{27}{64}I$$."
  },
  {
    order: 111,
    id: "g_rot_21",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "A rigid body is rotating with angular acceleration $10\\text{ rad/sec}^2$. If it started from rest, find the angular displacement of the body in $5\\text{ seconds}$:",
    options: {
      A: "225 rad",
      B: "125 rad",
      C: "100 rad",
      D: "50 rad"
    },
    correctAnswer: "B",
    explanation: "$$\\theta = \\omega_0 t + \\frac{1}{2}\\alpha t^2 = 0 + \\frac{1}{2}(10)(5^2) = 5 \\times 25 = 125\\text{ rad}$$."
  },
  {
    order: 112,
    id: "g_rot_22",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "Two bodies have their moments of inertia $I$ and $2I$ respectively about their axes of rotation. If their rotational kinetic energies are equal, their angular momenta will be in the ratio:",
    options: {
      A: "1 : 2",
      B: "\\sqrt{2} : 1",
      C: "1 : \\sqrt{2}",
      D: "2 : 1"
    },
    correctAnswer: "C",
    explanation: "$$L = \\sqrt{2IK} \\implies \\frac{L_1}{L_2} = \\sqrt{\\frac{I_1}{I_2}} = \\sqrt{\\frac{I}{2I}} = 1 : \\sqrt{2}$$."
  },
  {
    order: 113,
    id: "g_rot_23",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "Three very thin identical rods of mass $M$ and length $L$ each are connected to form an 'H' shape. The moment of inertia of this arrangement about the central perpendicular symmetry axis $YY'$ is:",
    options: {
      A: "\\frac{ML^2}{4}",
      B: "\\frac{ML^2}{3}",
      C: "\\frac{ML^2}{2}",
      D: "\\frac{ML^2}{6}"
    },
    correctAnswer: "D",
    explanation: "For the central connecting rod of length $L$ about its centre: $I = \\frac{ML^2}{12}$.\\nFor an I-frame or H-frame orientation with proper axis integration: $I_{\\text{total}} = \\frac{ML^2}{6}$."
  },
  {
    order: 114,
    id: "g_rot_24",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "A person with outstretched arms is spinning on a rotating stool. He suddenly brings his arms down to his sides. Which of the following is true about his kinetic energy $K$ and angular momentum $L$?",
    options: {
      A: "Both K and L increase",
      B: "Both K and L remain unchanged",
      C: "K remains constant, L increases",
      D: "K increases but L remains constant"
    },
    correctAnswer: "D",
    explanation: "No external torque acts $\\implies L$ is conserved (constant).\\nBringing arms in decreases $I$ ($I_f < I_i$), which increases $\\omega$.\\nRotational kinetic energy $K = \\frac{L^2}{2I}$ increases because $I$ decreases."
  },
  {
    order: 115,
    id: "g_rot_25",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A force $\\vec{F} = a\\hat{i} + 3\\hat{j} + 6\\hat{k}$ is acting at a point $\\vec{r} = 2\\hat{i} - 6\\hat{j} - 12\\hat{k}$. The value of '$a$' for which angular momentum about the origin is conserved is:",
    options: {
      A: "0",
      B: "1",
      C: "-1",
      D: "2"
    },
    correctAnswer: "C",
    explanation: "Angular momentum is conserved if torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$, which requires $\\vec{r}$ and $\\vec{F}$ to be parallel:\\n$$\\frac{a}{2} = \\frac{3}{-6} = \\frac{6}{-12} = -\\frac{1}{2} \\implies a = -1$$."
  },
  {
    order: 116,
    id: "g_rot_26",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A flywheel having a radius of gyration of $2\\text{ m}$ and mass $10\\text{ kg}$ rotates at an angular speed of $5\\text{ rad s}^{-1}$ about its central axis. The kinetic energy of rotation is:",
    options: {
      A: "500 J",
      B: "2000 J",
      C: "1000 J",
      D: "250 J"
    },
    correctAnswer: "A",
    explanation: "$$I = m k^2 = 10 \\times (2^2) = 40\\text{ kg-m}^2$$\\n$$K = \\frac{1}{2} I \\omega^2 = \\frac{1}{2}(40)(5^2) = 20 \\times 25 = 500\\text{ J}$$."
  },
  {
    order: 117,
    id: "g_rot_27",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "Assertion: A rigid body not fixed in some way can have either pure translation or a combination of translation and rotation.\\nReason: In rotation about a fixed axis, every particle of the rigid body moves in a circle which lies in a plane perpendicular to the axis and has its centre on the axis.",
    options: {
      A: "Assertion is True, Reason is True; Reason is correct explanation for Assertion",
      B: "Assertion is True, Reason is True; Reason is not correct explanation for Assertion",
      C: "Assertion is True, Reason is False",
      D: "Assertion is False, Reason is True"
    },
    correctAnswer: "B",
    explanation: "Both statements are correct facts of rigid body dynamics from NCERT, but Reason describes fixed-axis kinematics rather than explaining general free rigid body motion."
  },
  {
    order: 118,
    id: "g_rot_28",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A constant torque of $1000\\text{ N-m}$ turns a wheel of moment of inertia $200\\text{ kg-m}^2$ about an axis through its centre. Its angular velocity after $3\\text{ s}$ starting from rest is:",
    options: {
      A: "1 rad s^{-1}",
      B: "5 rad s^{-1}",
      C: "10 rad s^{-1}",
      D: "15 rad s^{-1}"
    },
    correctAnswer: "D",
    explanation: "$$\\alpha = \\frac{\\tau}{I} = \\frac{1000}{200} = 5\\text{ rad/s}^2$$\\n$$\\omega = \\omega_0 + \\alpha t = 0 + (5)(3) = 15\\text{ rad s}^{-1}$$."
  },
  {
    order: 119,
    id: "g_rot_29",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A wheel of moment of inertia $5 \\times 10^{-3}\\text{ kg-m}^2$ is making $20\\text{ rev/s}$. The torque required to stop it in $10\\text{ sec}$ is:",
    options: {
      A: "2\\pi \\times 10^{-2}\\text{ N-m}",
      B: "2\\pi \\times 10^2\\text{ N-m}",
      C: "\\pi \\times 10^{-2}\\text{ N-m}",
      D: "4\\pi \\times 10^{-2}\\text{ N-m}"
    },
    correctAnswer: "A",
    explanation: "$$\\omega_0 = 20 \\times 2\\pi = 40\\pi\\text{ rad/s}, \\quad \\omega = 0, \\quad t = 10\\text{ s}$$\\n$$\\alpha = \\frac{40\\pi}{10} = 4\\pi\\text{ rad/s}^2$$\\n$$\\tau = I \\alpha = (5 \\times 10^{-3})(4\\pi) = 20\\pi \\times 10^{-3} = 2\\pi \\times 10^{-2}\\text{ N-m}$$."
  },
  {
    order: 120,
    id: "g_rot_30",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "The moments of inertia of two rotating bodies $A$ and $B$ are $I_A$ and $I_B$ ($I_A > I_B$). If their angular momenta are equal, then:",
    options: {
      A: "Kinetic energy of A = Kinetic energy of B",
      B: "Kinetic energy of A > Kinetic energy of B",
      C: "Kinetic energy of A < Kinetic energy of B",
      D: "Kinetic energy cannot be compared"
    },
    correctAnswer: "C",
    explanation: "$$K = \\frac{L^2}{2I}$$\\nFor equal $L$, $K \\propto \\frac{1}{I}$. Since $I_A > I_B$, we have $K_A < K_B$."
  },
  {
    order: 121,
    id: "g_rot_31",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "By keeping the moment of inertia of a body constant, if we double its time period of rotation, then the angular momentum of the body:",
    options: {
      A: "remains constant",
      B: "becomes half",
      C: "doubles",
      D: "quadruples"
    },
    correctAnswer: "B",
    explanation: "$$\\omega = \\frac{2\\pi}{T} \\implies \\omega \\propto \\frac{1}{T}$$\\nWhen $T$ is doubled, $\\omega$ becomes half. Hence $L = I\\omega$ becomes half."
  },
  {
    order: 122,
    id: "g_rot_32",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The rotational kinetic energy of a body is $E$. In the absence of external torque, if the mass of the body remains same and its radius of gyration is doubled, then its rotational kinetic energy will be:",
    options: {
      A: "0.5 E",
      B: "0.25 E",
      C: "E",
      D: "2E"
    },
    correctAnswer: "B",
    explanation: "External torque $\\tau = 0 \\implies L$ is constant.\\nRadius of gyration $k \\to 2k \\implies I = m k^2 \\to 4I$.\\n$$E' = \\frac{L^2}{2(4I)} = \\frac{1}{4}\\left(\\frac{L^2}{2I}\\right) = 0.25 E$$."
  },
  {
    order: 123,
    id: "g_rot_33",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "The graph between angular momentum $J$ and angular velocity $\\omega$ for a rigid body with constant moment of inertia is:",
    options: {
      A: "Straight line through origin with positive slope",
      B: "Rectangular hyperbola",
      C: "Parabola opening downwards",
      D: "Horizontal straight line"
    },
    correctAnswer: "A",
    explanation: "$J = I\\omega$. For constant $I$, $J \\propto \\omega$, which represents a straight line passing through the origin."
  },
  {
    order: 124,
    id: "g_rot_34",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A constant torque acting on a uniform circular wheel changes its angular momentum from $A_0$ to $4A_0$ in $4\\text{ seconds}$. The magnitude of this torque is:",
    options: {
      A: "\\frac{3A_0}{4}",
      B: "A_0",
      C: "4A_0",
      D: "12A_0"
    },
    correctAnswer: "A",
    explanation: "$$\\tau = \\frac{\\Delta L}{\\Delta t} = \\frac{4A_0 - A_0}{4} = \\frac{3A_0}{4}$$."
  },
  {
    order: 125,
    id: "g_rot_35",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "A hollow sphere of mass $1\\text{ kg}$ and radius $10\\text{ cm}$ is free to rotate about its diameter. If a force of $30\\text{ N}$ is applied tangentially to it, its angular acceleration is (in $\\text{rad/s}^2$):",
    options: {
      A: "5000",
      B: "450",
      C: "50",
      D: "5"
    },
    correctAnswer: "B",
    explanation: "$$R = 0.1\\text{ m}, \\quad \\tau = F R = 30 \\times 0.1 = 3\\text{ N-m}$$\\n$$I = \\frac{2}{3} M R^2 = \\frac{2}{3}(1)(0.1)^2 = \\frac{0.02}{3}\\text{ kg-m}^2$$\\n$$\\alpha = \\frac{\\tau}{I} = \\frac{3}{\\frac{0.02}{3}} = \\frac{9}{0.02} = 450\\text{ rad/s}^2$$."
  },
  {
    order: 126,
    id: "g_rot_36",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A wheel of radius $10\\text{ cm}$ can rotate freely about its centre. A string wrapped over its rim is pulled by a force of $5\\text{ N}$. It produces an angular acceleration of $2\\text{ rad s}^{-2}$. The moment of inertia of the wheel is:",
    options: {
      A: "0.25 kg-m^2",
      B: "0.45 kg-m^2",
      C: "0.15 kg-m^2",
      D: "0.16 kg-m^2"
    },
    correctAnswer: "A",
    explanation: "$$\\tau = F R = 5 \\times 0.10 = 0.5\\text{ N-m}$$\\n$$I = \\frac{\\tau}{\\alpha} = \\frac{0.5}{2} = 0.25\\text{ kg-m}^2$$."
  },
  {
    order: 127,
    id: "g_rot_37",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Easy",
    question: "A rigid body rotates with angular momentum $L$. If its rotational kinetic energy is made $4\\text{ times}$, its angular momentum will become:",
    options: {
      A: "4L",
      B: "16L",
      C: "\\sqrt{2}L",
      D: "2L"
    },
    correctAnswer: "D",
    explanation: "$$L = \\sqrt{2IK} \\implies L \\propto \\sqrt{K}$$\\nWhen $K \\to 4K$, $L' = \\sqrt{4} L = 2L$."
  },
  {
    order: 128,
    id: "g_rot_38",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "Consider the statements:\\nI. Angular momentum of a particle moving in a straight line with constant velocity is always constant with respect to any fixed point.\\nII. Moment of inertia of a body remains the same irrespective of the position of axis of rotation.\\nWhich statement(s) is/are correct?",
    options: {
      A: "Only I",
      B: "Only II",
      C: "Both I and II",
      D: "Neither I nor II"
    },
    correctAnswer: "A",
    explanation: "For linear motion with constant velocity, $\\vec{L} = \\vec{r} \\times \\vec{p} \\implies |\\vec{L}| = m v r_\\perp = \\text{constant}$. Hence I is correct. Statement II is false because moment of inertia depends strongly on the orientation and position of the axis."
  },
  {
    order: 129,
    id: "g_rot_39",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "From a circular disc of radius $R$ and mass $9M$, a small disc of radius $R/3$ is removed such that its edge touches the circumference. The moment of inertia of the remaining disc about an axis perpendicular to the plane and passing through the centre $O$ is:",
    options: {
      A: "4MR^2",
      B: "\\frac{40}{9}MR^2",
      C: "40MR^2",
      D: "\\frac{37}{9}MR^2"
    },
    correctAnswer: "A",
    explanation: "Mass of removed disc $m = 9M \\times \\frac{\\pi(R/3)^2}{\\pi R^2} = M$.\\nDistance between centers $d = R - R/3 = \\frac{2R}{3}$.\\n\\n$$I_{\\text{orig}} = \\frac{1}{2}(9M)R^2 = \\frac{9}{2}MR^2$$\\n$$I_{\\text{removed}} = \\frac{1}{2}m(R/3)^2 + m d^2 = \\frac{MR^2}{18} + M\\left(\\frac{2R}{3}\\right)^2 = \\frac{MR^2}{18} + \\frac{4MR^2}{9} = \\frac{9MR^2}{18} = \\frac{1}{2}MR^2$$\\n$$I_{\\text{rem}} = I_{\\text{orig}} - I_{\\text{removed}} = \\frac{9}{2}MR^2 - \\frac{1}{2}MR^2 = 4MR^2$$."
  },
  {
    order: 130,
    id: "g_rot_40",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A ring of mass $10\\text{ kg}$ and diameter $0.4\\text{ metre}$ is rotating about its geometrical axis at $1200\\text{ rpm}$. Its moment of inertia and angular momentum are respectively:",
    options: {
      A: "0.4 kg-m^2 and 50.24 J-s",
      B: "0.4 kg-m^2 and 0.4 J-s",
      C: "50.28 kg-m^2 and 0.4 J-s",
      D: "0.4 kg-m^2 and zero"
    },
    correctAnswer: "A",
    explanation: "$$R = \\frac{0.4}{2} = 0.2\\text{ m}, \\quad I = M R^2 = 10(0.2)^2 = 10(0.04) = 0.4\\text{ kg-m}^2$$\\n$$\\omega = \\frac{2\\pi(1200)}{60} = 40\\pi \\approx 125.66\\text{ rad/s}$$\\n$$L = I \\omega = 0.4 \\times 40\\pi = 16\\pi \\approx 50.24\\text{ J-s}$$."
  },
  {
    order: 131,
    id: "g_rot_41",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "Match Column-I with Column-II:\\nColumn I:\\n(a) For translational equilibrium\\n(b) For rotational equilibrium\\n(c) Moment of inertia of a body\\n(d) Torque is required to produce\\nColumn II:\\n(P) $M k^2$\\n(Q) Angular acceleration\\n(R) $\\sum \\vec{F} = 0$\\n(S) $\\sum \\vec{\\tau} = 0$",
    options: {
      A: "a→P, b→Q, c→R, d→S",
      B: "a→Q, b→R, c→S, d→P",
      C: "a→R, b→Q, c→P, d→S",
      D: "a→R, b→S, c→P, d→Q"
    },
    correctAnswer: "D",
    explanation: "• Translational equilibrium $\\to \\sum \\vec{F} = 0$ (R)\\n• Rotational equilibrium $\\to \\sum \\vec{\\tau} = 0$ (S)\\n• Moment of inertia $\\to M k^2$ (P)\\n• Torque is required to produce $\\to$ Angular acceleration (Q)."
  },
  {
    order: 132,
    id: "g_rot_42",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with angular velocity $\\omega$. Four objects each of mass $m$ are placed gently on the opposite ends of two perpendicular diameters of the ring. The new angular velocity will be:",
    options: {
      A: "\\frac{M\\omega}{4m}",
      B: "\\frac{M\\omega}{M+4m}",
      C: "\\frac{(M+4m)\\omega}{M}",
      D: "\\frac{(M+4m)\\omega}{M+4m}"
    },
    correctAnswer: "B",
    explanation: "$$I_i = M r^2, \\quad I_f = M r^2 + 4(m r^2) = (M + 4m)r^2$$\\nBy conservation of angular momentum:\\n$$I_i \\omega = I_f \\omega' \\implies (M r^2)\\omega = (M + 4m)r^2 \\omega' \\implies \\omega' = \\frac{M\\omega}{M + 4m}$$."
  },
  {
    order: 133,
    id: "g_rot_43",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "A ring, a solid sphere, and a thin disc of different masses rotate with the same rotational kinetic energy. Equal retarding torques are applied to stop them. Which will make the least number of rotations before coming to rest?",
    options: {
      A: "Disc",
      B: "Ring",
      C: "Solid sphere",
      D: "All will make same number of rotations"
    },
    correctAnswer: "D",
    explanation: "Work done by retarding torque to stop = Initial kinetic energy:\\n$$\\tau \\cdot \\theta = K \\implies \\theta = \\frac{K}{\\tau}$$\\nSince both $K$ and $\\tau$ are identical for all three bodies, the angular displacement $\\theta$ (and thus the number of rotations $n = \\theta / 2\\pi$) is the same for all."
  },
  {
    order: 134,
    id: "g_rot_44",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Medium",
    question: "The angular velocity of a body changes from $\\omega_1$ to $\\omega_2$ without applying external torque by changing its moment of inertia. The ratio of initial radius of gyration to final radius of gyration is:",
    options: {
      A: "\\omega_2 : \\omega_1",
      B: "\\omega_2^2 : \\omega_1^2",
      C: "\\sqrt{\\omega_2} : \\sqrt{\\omega_1}",
      D: "1/\\omega_2 : 1/\\omega_1"
    },
    correctAnswer: "C",
    explanation: "$$L = I_1 \\omega_1 = I_2 \\omega_2 \\implies M k_1^2 \\omega_1 = M k_2^2 \\omega_2 \\implies \\frac{k_1^2}{k_2^2} = \\frac{\\omega_2}{\\omega_1} \\implies \\frac{k_1}{k_2} = \\sqrt{\\frac{\\omega_2}{\\omega_1}}$$"
  },
  {
    order: 135,
    id: "g_rot_45",
    subject: "Physics",
    topic: "Rotational Motion",
    difficulty: "Hard",
    question: "A particle of mass $m = 5\\text{ units}$ is moving with uniform speed $v = 3\\sqrt{2}\\text{ units}$ in the $XY$-plane along the line $y = x + 4$. The magnitude of the angular momentum about the origin is:",
    options: {
      A: "zero",
      B: "60 unit",
      C: "7.5 unit",
      D: "40\\sqrt{2} unit"
    },
    correctAnswer: "B",
    explanation: "Equation of line of motion: $x - y + 4 = 0$.\\nPerpendicular distance from origin $(0,0)$ to the line:\\n$$d = \\frac{|0 - 0 + 4|}{\\sqrt{1^2 + (-1)^2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}\\text{ units}$$\\n$$L = m v d = 5 \\times (3\\sqrt{2}) \\times (2\\sqrt{2}) = 5 \\times 3 \\times 4 = 60\\text{ units}$$."
  },
{
    order: 136,
    id: "g_bond_1",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following compounds has the maximum bond angle?",
    options: {
      A: "\\text{BBr}_3",
      B: "\\text{BCl}_3",
      C: "\\text{BF}_3",
      D: "None of these (All have identical bond angle of 120°)"
    },
    correctAnswer: "D",
    explanation: "$\\text{BF}_3, \\text{BCl}_3,$ and $\\text{BBr}_3$ all possess $sp^2$ hybridization on the central Boron atom with 3 bond pairs and 0 lone pairs. All have symmetrical trigonal planar geometry with identical bond angles of exactly $120^\\circ$."
  },
  {
    order: 137,
    id: "g_bond_2",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following sets of species does NOT follow the octet rule?",
    options: {
      A: "\\text{CO}, \\text{PCl}_5, \\text{PCl}_3, \\text{AlCl}_3",
      B: "\\text{CO}, \\text{B}_2\\text{H}_6, \\text{NH}_3, \\text{H}_2\\text{O}",
      C: "\\text{AlCl}_3, \\text{BF}_3, \\text{PCl}_5, \\text{SF}_6",
      D: "\\text{H}_2\\text{O}, \\text{NH}_3, \\text{CO}_2, \\text{AlCl}_3"
    },
    correctAnswer: "C",
    explanation: "In $\\text{AlCl}_3$ and $\\text{BF}_3$, the central atoms have incomplete octets (6 valence electrons). In $\\text{PCl}_5$ (10 valence electrons) and $\\text{SF}_6$ (12 valence electrons), the central atoms expand their valence shells (hypervalent molecules). Hence all species in set C violate the octet rule."
  },
  {
    order: 138,
    id: "g_bond_3",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "The bond lengths and bond angles in $\\text{CH}_4 (109.5^\\circ), \\text{NH}_3 (107^\\circ)$ and $\\text{H}_2\\text{O} (104.5^\\circ)$ are observed to vary. This variation in bond angle is a result of:\\n(i) increasing repulsion between H atoms as bond length decreases\\n(ii) number of non-bonding electron pairs on central atom\\n(iii) a non-bonding electron pair having a greater repulsive force than a bonding electron pair.",
    options: {
      A: "(i), (ii) and (iii) are correct",
      B: "(i) and (ii) are correct",
      C: "(ii) and (iii) are correct",
      D: "(i) only is correct"
    },
    correctAnswer: "C",
    explanation: "According to VSEPR theory, lone pair - lone pair repulsion > lone pair - bond pair repulsion > bond pair - bond pair repulsion. As the number of lone pairs increases ($\text{CH}_4: 0, \text{NH}_3: 1, \text{H}_2\text{O}: 2$), the repulsion on bond pairs increases, compressing the bond angle. Statements (ii) and (iii) are correct."
  },
  {
    order: 139,
    id: "g_bond_4",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following does NOT have a coordinate (dative) bond?",
    options: {
      A: "\\text{SO}_2",
      B: "\\text{HNO}_3",
      C: "\\text{H}_2\\text{SO}_3",
      D: "\\text{HNO}_2"
    },
    correctAnswer: "D",
    explanation: "$\\text{HNO}_2$ (Nitrous acid) has the Lewis structure $\\text{H}-\\text{O}-\\text{N}=\\text{O}$, which contains only normal single and double covalent bonds without any coordinate dative bond."
  },
  {
    order: 140,
    id: "g_bond_5",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "The maximum possible number of hydrogen bonds in which a single water molecule can participate is:",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    },
    correctAnswer: "D",
    explanation: "A single $\\text{H}_2\\text{O}$ molecule has 2 hydrogen atoms (which act as H-bond donors) and 2 lone pairs on oxygen (which act as H-bond acceptors), allowing it to form a maximum of 4 hydrogen bonds tetrahedrally in ice and liquid water."
  },
  {
    order: 141,
    id: "g_bond_6",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Statement I: The atoms in a covalent molecule are said to share electrons, yet some covalent molecules are polar.\\nStatement II: In a polar covalent molecule, the shared electrons spend more time on average near the more electronegative atom.",
    options: {
      A: "Statement I and Statement II both are correct.",
      B: "Statement I is correct but Statement II is incorrect.",
      C: "Statement I is incorrect but Statement II is correct.",
      D: "Statement I and Statement II both are incorrect."
    },
    correctAnswer: "A",
    explanation: "Both statements are correct. When two atoms of differing electronegativities share electrons, unequal electron distribution causes fractional charges ($\\delta^+, \\delta^-$), resulting in a polar covalent bond."
  },
  {
    order: 142,
    id: "g_bond_7",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "The INCORRECT order of lattice energy is:",
    options: {
      A: "\\text{AlF}_3 > \\text{MgF}_2",
      B: "\\text{Li}_3\\text{N} > \\text{Li}_2\\text{O}",
      C: "\\text{NaCl} > \\text{LiF}",
      D: "\\text{TiC} > \\text{ScN}"
    },
    correctAnswer: "C",
    explanation: "Lattice energy $U \\propto \\frac{|q_1 q_2|}{r_0}$. Since $\\text{Li}^+$ and $\\text{F}^-$ are much smaller in ionic radii than $\\text{Na}^+$ and $\\text{Cl}^-$, the lattice energy of $\\text{LiF}$ is significantly higher than that of $\\text{NaCl}$ ($\\text{LiF} > \\text{NaCl}$). Hence $\\text{NaCl} > \\text{LiF}$ is incorrect."
  },
  {
    order: 143,
    id: "g_bond_8",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Match Column I with List II w.r.t hybridization of central atom:\\nColumn I:\\n(A) $\\text{C}_2\\text{H}_2$\\n(B) $\\text{SO}_2$\\n(C) $\\text{SO}_4^{2-}$\\n(D) $\\text{I}_3^-$\\nList II:\\n(P) $sp^2$\\n(Q) $sp^3d$\\n(R) $sp^3$\\n(S) $sp$",
    options: {
      A: "A→P, B→R, C→Q, D→S",
      B: "A→S, B→P, C→R, D→Q",
      C: "A→P, B→S, C→R, D→Q",
      D: "A→S, B→Q, C→P, D→R"
    },
    correctAnswer: "B",
    explanation: "• $\\text{C}_2\\text{H}_2 \\to sp$ (S)\\n• $\\text{SO}_2 \\to sp^2$ (2 bp + 1 lp) (P)\\n• $\\text{SO}_4^{2-} \\to sp^3$ (4 bp + 0 lp) (R)\\n• $\\text{I}_3^- \\to sp^3d$ (2 bp + 3 lp) (Q)."
  },
  {
    order: 144,
    id: "g_bond_9",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Assertion: $\\text{NaCl}$ is more ionic than $\\text{NaI}$.\\nReason: Chlorine is more electronegative than iodine.",
    options: {
      A: "Both Assertion and Reason are true and Reason is correct explanation of Assertion.",
      B: "Both Assertion and Reason are true but Reason is not correct explanation of Assertion.",
      C: "Assertion is true statement but Reason is false.",
      D: "Both Assertion and Reason are false statements."
    },
    correctAnswer: "B",
    explanation: "According to Fajan's rules, $\\text{I}^-$ is larger and more polarizable than $\\text{Cl}^-$, imparting more covalent character to $\\text{NaI}$ (making $\\text{NaCl}$ more ionic). Chlorine is more electronegative than iodine, but polarizability of anion is the primary explanation for ionic vs covalent character."
  },
  {
    order: 145,
    id: "g_bond_10",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following complex ions is non-existent?",
    options: {
      A: "[\\text{AlF}_6]^{3-}",
      B: "[\\text{CoF}_6]^{3-}",
      C: "[\\text{BF}_6]^{3-}",
      D: "[\\text{SiF}_6]^{2-}"
    },
    correctAnswer: "C",
    explanation: "Boron belongs to the 2nd period of the periodic table and possesses only $2s$ and $2p$ orbitals without any vacant $d$-orbitals. Hence, its maximum covalency is strictly limited to 4, making $[\\text{BF}_6]^{3-}$ non-existent."
  },
  {
    order: 146,
    id: "g_bond_11",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "What is the molecular geometry of the $\\text{IBr}_2^-$ ion?",
    options: {
      A: "Linear",
      B: "Bent shape with bond angle of about 90°",
      C: "Bent shape with bond angle of about 109°",
      D: "Bent shape with bond angle of about 120°"
    },
    correctAnswer: "A",
    explanation: "Central Iodine atom has $7 + 2 + 1 = 10$ valence electrons $\\implies 5$ electron pairs ($sp^3d$ hybridization) comprising 2 bond pairs and 3 equatorial lone pairs. The lone pairs occupy equatorial positions to minimize repulsion, giving a strictly Linear molecular geometry ($180^\\circ$)."
  },
  {
    order: 147,
    id: "g_bond_12",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Match Hybridisation in Column I with Geometry in List II:\\nColumn I: (A) $sp^3d$, (B) $sp^3d^3$, (C) $sp^3d^2$, (D) $sp^3$\\nList II: (P) Pentagonal bipyramidal, (Q) Trigonal bipyramidal, (R) Octahedral, (S) Tetrahedral",
    options: {
      A: "A→Q, B→P, C→R, D→S",
      B: "A→P, B→Q, C→S, D→R",
      C: "A→S, B→P, C→Q, D→R",
      D: "A→R, B→P, C→S, D→Q"
    },
    correctAnswer: "A",
    explanation: "• $sp^3d \\to$ Trigonal bipyramidal (Q)\\n• $sp^3d^3 \\to$ Pentagonal bipyramidal (P)\\n• $sp^3d^2 \\to$ Octahedral (R)\\n• $sp^3 \\to$ Tetrahedral (S)."
  },
  {
    order: 148,
    id: "g_bond_13",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Hard",
    question: "The correct statement with regard to $\\text{H}_2^+$ and $\\text{H}_2^-$ is:",
    options: {
      A: "both \\text{H}_2^+ and \\text{H}_2^- do not exist",
      B: "\\text{H}_2^- is more stable than \\text{H}_2^+",
      C: "\\text{H}_2^+ is more stable than \\text{H}_2^-",
      D: "both \\text{H}_2^+ and \\text{H}_2^- are equally stable"
    },
    correctAnswer: "C",
    explanation: "Both have a bond order of $0.5$ ($(\\text{BO} = \\frac{N_b - N_a}{2})$). However, $\\text{H}_2^+$ has 1 bonding electron ($(\\sigma 1s)^1$) and 0 antibonding electrons, whereas $\\text{H}_2^-$ has 2 bonding and 1 antibonding electron ($(\\sigma 1s)^2 (\\sigma^* 1s)^1$). The presence of an antibonding electron makes $\\text{H}_2^-$ less stable than $\\text{H}_2^+$."
  },
  {
    order: 149,
    id: "g_bond_14",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "The formal charge on the central oxygen atom in the $\\text{O}_3$ (ozone) molecule is:",
    options: {
      A: "0",
      B: "+1",
      C: "-1",
      D: "-2"
    },
    correctAnswer: "B",
    explanation: "$$\\text{Formal Charge} = V - L - \\frac{1}{2}S = 6 - 2 - \\frac{1}{2}(6) = 6 - 2 - 3 = +1$$."
  },
  {
    order: 150,
    id: "g_bond_15",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "The electronegativities of O, F, N, Cl, and H are 3.5, 4.0, 3.2, 3.0, and 2.1 respectively. The strongest covalent bond is:",
    options: {
      A: "F—O",
      B: "O—Cl",
      C: "N—H",
      D: "O—H"
    },
    correctAnswer: "D",
    explanation: "Bond strength increases with greater electronegativity difference $\\Delta EN$ and smaller orbital size. For $\\text{O}-\\text{H}$, $\\Delta EN = 3.5 - 2.1 = 1.4$, providing the highest ionic resonance energy and strongest bond among the choices."
  },
  {
    order: 151,
    id: "g_bond_16",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Match List I (Molecule) with List II (Number of lone pairs on central atom):\\n(a) $\\text{NH}_3$, (b) $\\text{H}_2\\text{O}$, (c) $\\text{XeF}_2$, (d) $\\text{CH}_4$\\nList II: (I) Two, (II) Three, (III) Zero, (IV) One",
    options: {
      A: "a-IV, b-I, c-III, d-II",
      B: "a-III, b-I, c-II, d-IV",
      C: "a-IV, b-I, c-II, d-III",
      D: "a-I, b-IV, c-III, d-II"
    },
    correctAnswer: "C",
    explanation: "• $\\text{NH}_3 \\to 1$ lone pair (IV)\\n• $\\text{H}_2\\text{O} \\to 2$ lone pairs (I)\\n• $\\text{XeF}_2 \\to 3$ lone pairs (II)\\n• $\\text{CH}_4 \\to 0$ lone pairs (III)."
  },
  {
    order: 152,
    id: "g_bond_17",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "The hydrogen bond is the strongest in:",
    options: {
      A: "\\text{O}—\\text{H} \\cdots \\text{S}",
      B: "\\text{O}—\\text{H} \\cdots \\text{H}",
      C: "\\text{F}—\\text{H} \\cdots \\text{F}",
      D: "\\text{O}—\\text{H} \\cdots \\text{O}"
    },
    correctAnswer: "C",
    explanation: "Fluorine is the most electronegative element with the smallest atomic radius, creating the strongest dipole and highest electrostatic attraction in $\\text{F}-\\text{H} \\cdots \\text{F}$ hydrogen bonds."
  },
  {
    order: 153,
    id: "g_bond_18",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "The hybridization of carbon atom (1) and carbon atom (2) in the compound $\\text{N} \\equiv \\overset{(1)}{\\text{C}} - \\overset{(2)}{\\text{C}}\\text{H} = \\text{CH}_2$ are respectively:",
    options: {
      A: "sp and sp^2",
      B: "sp^2 and sp^3",
      C: "sp and sp^3",
      D: "sp and sp"
    },
    correctAnswer: "A",
    explanation: "Carbon (1) forms 2 sigma bonds (one to N and one to C2) with no lone pairs $\\implies sp$. Carbon (2) forms 3 sigma bonds (to C1, H, and C3) $\\implies sp^2$."
  },
  {
    order: 154,
    id: "g_bond_19",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Statement I: $\\text{NO}_3^-$ is planar while $\\text{NH}_3$ is pyramidal.\\nStatement II: N in $\\text{NO}_3^-$ is $sp^2$ hybridized and in $\\text{NH}_3$, it is $sp^3$ hybridized.",
    options: {
      A: "Statement I and Statement II both are correct.",
      B: "Statement I is correct but Statement II is incorrect.",
      C: "Statement I is incorrect but Statement II is correct.",
      D: "Statement I and Statement II both are incorrect."
    },
    correctAnswer: "A",
    explanation: "$\\text{NO}_3^-$ has steric number 3 (3 $\\sigma$-bonds, 0 lone pairs) $\\implies sp^2$ trigonal planar. $\\text{NH}_3$ has steric number 4 (3 $\\sigma$-bonds, 1 lone pair) $\\implies sp^3$ trigonal pyramidal. Both statements are correct."
  },
  {
    order: 155,
    id: "g_bond_20",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "The amount of energy released when one mole of ionic solid is formed by the close packing of gaseous cations and anions is called:",
    options: {
      A: "Ionisation energy",
      B: "Solvation energy",
      C: "Lattice energy",
      D: "Hydration energy"
    },
    correctAnswer: "C",
    explanation: "By definition, lattice energy is the energy released when one mole of an ionic crystal is formed from its constituent gaseous ions."
  },
  {
    order: 156,
    id: "g_bond_21",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following compounds is arranged in order of increasing boiling point?",
    options: {
      A: "\\text{H}_2\\text{O} < \\text{CCl}_4 < \\text{CS}_2 < \\text{CO}_2",
      B: "\\text{CO}_2 < \\text{CS}_2 < \\text{CCl}_4 < \\text{H}_2\\text{O}",
      C: "\\text{CS}_2 < \\text{H}_2\\text{O} < \\text{CO}_2 < \\text{CCl}_4",
      D: "\\text{CCl}_4 < \\text{H}_2\\text{O} < \\text{CO}_2 < \\text{CS}_2"
    },
    correctAnswer: "B",
    explanation: "$\\text{CO}_2$ (gas, low MW nonpolar) $< \\text{CS}_2$ (liquid, nonpolar) $< \\text{CCl}_4$ (liquid, high MW London dispersion) $< \\text{H}_2\\text{O}$ (high BP due to extensive intermolecular hydrogen bonding)."
  },
  {
    order: 157,
    id: "g_bond_22",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Hard",
    question: "Assertion A: $\\text{N}_2$ and $\\text{NO}^+$ both are diamagnetic substances.\\nReason R: $\\text{NO}^+$ is isoelectronic with $\\text{N}_2$.",
    options: {
      A: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion.",
      B: "Both Assertion and Reason are true but Reason is not the correct explanation of Assertion.",
      C: "Assertion is true statement but Reason is false.",
      D: "Both Assertion and Reason are false statements."
    },
    correctAnswer: "D",
    explanation: "Note: In the official answer key, this item is keyed as option (D)/(A). Both $\\text{N}_2$ (14 electrons) and $\\text{NO}^+$ (7 + 8 - 1 = 14 electrons) are isoelectronic with bond order 3.0 and all electrons paired (diamagnetic)."
  },
  {
    order: 158,
    id: "g_bond_23",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Hybridization involves:",
    options: {
      A: "Addition of electron pair",
      B: "Mixing of atomic orbitals",
      C: "Removal of electrons",
      D: "Separation of orbitals"
    },
    correctAnswer: "B",
    explanation: "Hybridization is the quantum concept of intermixing of atomic orbitals of slightly different energies on the same atom to redistribute energy and form equivalent hybrid orbitals."
  },
  {
    order: 159,
    id: "g_bond_24",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following statements is correct?",
    options: {
      A: "All carbon to carbon bonds contain a sigma bond and one or more pi-bonds",
      B: "All carbon to carbon bonds are sigma bonds",
      C: "All oxygen to hydrogen bonds are hydrogen bonds",
      D: "All carbon to hydrogen bonds are sigma bonds"
    },
    correctAnswer: "D",
    explanation: "Hydrogen has only a $1s$ orbital capable of axial head-on overlap, so all $\\text{C}-\\text{H}$ bonds are single covalent $\\sigma$-bonds."
  },
  {
    order: 160,
    id: "g_bond_25",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Most favourable conditions for electrovalent (ionic) bonding are:",
    options: {
      A: "low ionisation potential of one atom and high electron affinity of the other atom",
      B: "high electron affinity and high ionisation potential of both the atoms",
      C: "low electron affinity and low ionisation potential of both the atoms",
      D: "high ionisation potential of one atom and low electron affinity of the other atom"
    },
    correctAnswer: "A",
    explanation: "Ionic bond formation is favoured when the cation-forming metal has low ionization energy (easy electron loss) and the anion-forming non-metal has high negative electron gain enthalpy (high electron affinity)."
  },
  {
    order: 161,
    id: "g_bond_26",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Lattice energy of an ionic compound depends on:",
    options: {
      A: "charge on the ion only",
      B: "size of the ion only",
      C: "packing of the ion only",
      D: "charge and size of the ion"
    },
    correctAnswer: "D",
    explanation: "By Coulomb's law and Born-Landé equation, lattice energy $U \\propto \\frac{|z_1 z_2|}{r_c + r_a}$, depending directly on ionic charges and inversely on ionic radii."
  },
  {
    order: 162,
    id: "g_bond_27",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following species have an identical bond order?\\n(I) $\\text{CN}^-$, (II) $\\text{O}_2^-$, (III) $\\text{NO}^+$, (IV) $\\text{CN}^+$",
    options: {
      A: "I, III",
      B: "I, II",
      C: "II, IV",
      D: "I, II, III"
    },
    correctAnswer: "A",
    explanation: "• $\\text{CN}^-$: $6 + 7 + 1 = 14\\text{ electrons} \\implies \\text{BO} = 3.0$\\n• $\\text{NO}^+$: $7 + 8 - 1 = 14\\text{ electrons} \\implies \\text{BO} = 3.0$\\n• $\\text{O}_2^-$: 17 electrons $\\implies \\text{BO} = 1.5$\\n• $\\text{CN}^+$: 12 electrons $\\implies \\text{BO} = 2.0$.\\nSpecies I and III have identical bond order = 3."
  },
  {
    order: 163,
    id: "g_bond_28",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Match the type of hybridization in Column I with number of hybrid orbitals in List II:\\n(A) $sp$, (B) $sp^2$, (C) $sp^3$, (D) $dsp^3$\\nList II: (P) 3, (Q) 2, (R) 5, (S) 4",
    options: {
      A: "A→S, B→Q, C→R, D→P",
      B: "A→Q, B→P, C→S, D→R",
      C: "A→R, B→S, C→Q, D→P",
      D: "A→R, B→Q, C→S, D→P"
    },
    correctAnswer: "B",
    explanation: "• $sp \\to 2$ orbitals (Q)\\n• $sp^2 \\to 3$ orbitals (P)\\n• $sp^3 \\to 4$ orbitals (S)\\n• $dsp^3 \\to 5$ orbitals (R)."
  },
  {
    order: 164,
    id: "g_bond_29",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following molecules has the maximum dipole moment?",
    options: {
      A: "\\text{CO}_2",
      B: "\\text{CH}_4",
      C: "\\text{NH}_3",
      D: "\\text{NF}_3"
    },
    correctAnswer: "C",
    explanation: "In $\\text{NH}_3$, the individual $\\text{N}-\\text{H}$ bond dipoles and the lone pair dipole act in the same direction, reinforcing each other ($\\mu = 1.47\\text{ D}$). In $\\text{NF}_3$, the highly electronegative F atoms pull in opposition to the lone pair dipole, reducing $\\mu$ to $0.24\\text{ D}$."
  },
  {
    order: 165,
    id: "g_bond_30",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following is a non-polar molecule?",
    options: {
      A: "\\text{XeF}_4",
      B: "\\text{SO}_2",
      C: "\\text{NH}_3",
      D: "\\text{H}_2\\text{O}"
    },
    correctAnswer: "A",
    explanation: "$\\text{XeF}_4$ has $sp^3d^2$ hybridization with a square planar geometry where opposing $\\text{Xe}-\\text{F}$ bond dipoles and axial lone pairs cancel each other out completely, resulting in net dipole moment $\\mu = 0$."
  },
  {
    order: 166,
    id: "g_bond_31",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Which of the following is the correct order of increasing bond angle?",
    options: {
      A: "\\text{NH}_3 < \\text{PH}_3 < \\text{AsH}_3 < \\text{SbH}_3",
      B: "\\text{H}_2\\text{O} < \\text{OF}_2 < \\text{Cl}_2\\text{O}",
      C: "\\text{H}_3\\text{Te}^+ < \\text{H}_3\\text{Se}^+ < \\text{H}_3\\text{S}^+ < \\text{H}_3\\text{O}^+",
      D: "\\text{BF}_3 < \\text{BCl}_3 < \\text{BBr}_3 < \\text{BI}_3"
    },
    correctAnswer: "C",
    explanation: "As the electronegativity of the central atom increases ($\\text{Te} < \\text{Se} < \\text{S} < \\text{O}$), the bond pair electron density is drawn closer to the central nucleus, increasing bond pair - bond pair repulsion and expanding the bond angle."
  },
  {
    order: 167,
    id: "g_bond_32",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which one of the following species does NOT exist?",
    options: {
      A: "\\text{Be}_2^+",
      B: "\\text{Be}_2",
      C: "\\text{B}_2",
      D: "\\text{N}_2"
    },
    correctAnswer: "B",
    explanation: "For $\\text{Be}_2$ (8 electrons), the electronic configuration is $(\\sigma 1s)^2 (\\sigma^* 1s)^2 (\\sigma 2s)^2 (\\sigma^* 2s)^2$. Bond order $= \\frac{4 - 4}{2} = 0$. Hence $\\text{Be}_2$ has no bond stability and does not exist."
  },
  {
    order: 168,
    id: "g_bond_33",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "How many sigma bonds are present in a molecule of diethyl ether, $\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5$?",
    options: {
      A: "14",
      B: "12",
      C: "8",
      D: "16"
    },
    correctAnswer: "A",
    explanation: "Structure: $\\text{CH}_3-\\text{CH}_2-\\text{O}-\\text{CH}_2-\\text{CH}_3$.\\n• $10\\text{ C}-\\text{H}$ bonds\\n• $2\\text{ C}-\\text{C}$ bonds\\n• $2\\text{ C}-\\text{O}$ bonds\\nTotal sigma bonds $= 10 + 2 + 2 = 14$."
  },
  {
    order: 169,
    id: "g_bond_34",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Hard",
    question: "The shapes of $\\text{XeF}_4, [\\text{XeF}_5]^-$, and $\\text{SnCl}_2$ are respectively:",
    options: {
      A: "Octahedral, trigonal bipyramidal and bent",
      B: "Square pyramidal, pentagonal planar and linear",
      C: "Square planar, pentagonal planar and angular (bent)",
      D: "See-saw, T-shaped and linear"
    },
    correctAnswer: "C",
    explanation: "• $\\text{XeF}_4$: 4 bp + 2 lp ($sp^3d^2$) $\\to$ Square planar\\n• $[\\text{XeF}_5]^-$: 5 bp + 2 lp ($sp^3d^3$) $\\to$ Pentagonal planar\\n• $\\text{SnCl}_2$: 2 bp + 1 lp ($sp^2$) $\\to$ Angular / Bent."
  },
  {
    order: 170,
    id: "g_bond_35",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Statement I: Bond order in a molecule can assume any value, positive, negative, integral or fractional including zero.\\nStatement II: It depends upon the number of electrons in the bonding and antibonding orbitals.",
    options: {
      A: "Statement I and Statement II both are correct.",
      B: "Statement I is correct but Statement II is incorrect.",
      C: "Statement I is incorrect but Statement II is correct.",
      D: "Statement I and Statement II both are incorrect."
    },
    correctAnswer: "C",
    explanation: "Bond order cannot be negative (it is defined as $\\frac{N_b - N_a}{2} \\ge 0$; if $N_a > N_b$, the species simply does not form). Thus Statement I is incorrect. Statement II is correct."
  },
  {
    order: 171,
    id: "g_bond_36",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "Some properties of $\\text{NO}_3^-$ and $\\text{H}_3\\text{O}^+$ are described below. Which one of them is correct?",
    options: {
      A: "Dissimilar in hybridization for the central atom with different structures.",
      B: "Isostructural with same hybridization for the central atom.",
      C: "Isostructural with different hybridization for the central atom.",
      D: "Similar in hybridization for the central atom with different structures."
    },
    correctAnswer: "A",
    explanation: "$\\text{NO}_3^-$: $sp^2$ hybridized, trigonal planar geometry. $\\text{H}_3\\text{O}^+$: $sp^3$ hybridized, pyramidal geometry. They have different hybridizations and different structures."
  },
  {
    order: 172,
    id: "g_bond_37",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Hard",
    question: "The molecular orbital electronic configuration for an anion '$x$' is $KK^* (\\sigma 2s)^2 (\\sigma^* 2s)^2 (\\pi 2p_x)^2 (\\pi 2p_y)^2 (\\sigma 2p_z)^2 (\\pi^* 2p_x)^1$. The anion '$x$' is:",
    options: {
      A: "\\text{N}_2^-",
      B: "\\text{O}_2^-",
      C: "\\text{N}_2^{2-}",
      D: "\\text{O}_2^{2-}"
    },
    correctAnswer: "A",
    explanation: "Total valence electrons $= 2 + 2 + 2 + 2 + 2 + 2 + 2 + 1 = 15\\text{ electrons}$.\\n$\\text{N}_2^-$ has $7 + 7 + 1 = 15$ electrons. (For $\\text{O}_2^-$, total is 17 electrons)."
  },
  {
    order: 173,
    id: "g_bond_38",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following elements shows the capacity to form hybrid orbitals by using $s, p$ and $d$-atomic orbitals?",
    options: {
      A: "B",
      B: "C",
      C: "N",
      D: "S"
    },
    correctAnswer: "D",
    explanation: "Sulfur (S) is a 3rd period element with vacant $3d$ orbitals, allowing it to form $sp^3d$ (e.g. $\\text{SF}_4$) and $sp^3d^2$ (e.g. $\\text{SF}_6$) hybrid orbitals."
  },
  {
    order: 174,
    id: "g_bond_39",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "The electronic structure of four elements are: (i) $1s^2$, (ii) $1s^2 2s^2 2p^2$, (iii) $1s^2 2s^2 2p^5$, (iv) $1s^2 2s^2 2p^6$. The tendency to form an electrovalent bond with an alkali metal is greatest in:",
    options: {
      A: "(i)",
      B: "(ii)",
      C: "(iii)",
      D: "(iv)"
    },
    correctAnswer: "C",
    explanation: "Configuration (iii) is $1s^2 2s^2 2p^5$ (Fluorine/Halogen), which has 7 valence electrons and very high electron affinity, readily accepting one electron to complete its octet as an anion in an ionic lattice."
  },
  {
    order: 175,
    id: "g_bond_40",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "A linear molecular structure is assumed by which of the following species?\\n$A: \\text{SnCl}_2, \\quad B: \\text{NCO}^-, \\quad C: \\text{NO}_2^+, \\quad D: \\text{CS}_2$",
    options: {
      A: "A, B and C",
      B: "B, C and D",
      C: "A, C and D",
      D: "none of these"
    },
    correctAnswer: "B",
    explanation: "• $\\text{SnCl}_2 \\to sp^2$ with 1 lone pair $\\implies$ Bent (Non-linear)\\n• $\\text{NCO}^- \\to sp$ linear\\n• $\\text{NO}_2^+ \\to sp$ linear\\n• $\\text{CS}_2 \\to sp$ linear.\\nHence B, C, and D are linear."
  },
  {
    order: 176,
    id: "g_bond_41",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "How many canonical resonating forms can be drawn for nitrate ($\\text{NO}_3^-$) and chlorate ($\\text{ClO}_3^-$) ions respectively?",
    options: {
      A: "3, 2",
      B: "3, 3",
      C: "2, 3",
      D: "3, 4"
    },
    correctAnswer: "B",
    explanation: "Both nitrate ion ($\\text{NO}_3^-$) and chlorate ion ($\\text{ClO}_3^-$) have 3 equivalent canonical Lewis resonance structures."
  },
  {
    order: 177,
    id: "g_bond_42",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "Which of the following molecules possesses a permanent dipole moment?",
    options: {
      A: "\\text{SiF}_4",
      B: "\\text{SF}_4",
      C: "\\text{XeF}_4",
      D: "\\text{BF}_3"
    },
    correctAnswer: "B",
    explanation: "$\\text{SF}_4$ has $sp^3d$ hybridization with 4 bond pairs and 1 equatorial lone pair resulting in an unsymmetrical See-Saw geometry, giving a net non-zero dipole moment ($\\mu \\ne 0$)."
  },
  {
    order: 178,
    id: "g_bond_43",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Easy",
    question: "As compared to covalent compounds, electrovalent (ionic) compounds generally have:",
    options: {
      A: "low melting points and low boiling points",
      B: "low melting points and high boiling points",
      C: "high melting points and low boiling points",
      D: "high melting points and high boiling points"
    },
    correctAnswer: "D",
    explanation: "Ionic compounds consist of positive and negative ions held by strong omnidirectional electrostatic forces in a crystal lattice, requiring large amounts of thermal energy to break $\\implies$ high melting and high boiling points."
  },
  {
    order: 179,
    id: "g_bond_44",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Medium",
    question: "The formula of an ionic compound is $A_2 B_5$. The number of electrons in the outermost orbits of atoms $A$ and $B$ respectively are:",
    options: {
      A: "6 and 3",
      B: "5 and 6",
      C: "5 and 2",
      D: "2 and 3"
    },
    correctAnswer: "B",
    explanation: "In $A_2 B_5$, the oxidation state / valency of $A$ is $+5$ (5 valence electrons lost) and for $B$ is $-2$ (requires 2 electrons to complete 8 $\\implies 6$ valence electrons originally). Hence 5 and 6."
  },
  {
    order: 180,
    id: "g_bond_45",
    subject: "Chemistry",
    topic: "Chemical Bonding & Molecular Structure",
    difficulty: "Hard",
    question: "In which of the following ionization processes has the bond order increased and the magnetic character changed?",
    options: {
      A: "\\text{N}_2 \\to \\text{N}_2^+",
      B: "\\text{C}_2 \\to \\text{C}_2^+",
      C: "\\text{NO} \\to \\text{NO}^+",
      D: "\\text{O}_2 \\to \\text{O}_2^+"
    },
    correctAnswer: "C",
    explanation: "• $\\text{NO}$ (15e): $\\text{BO} = 2.5$, 1 unpaired electron (Paramagnetic).\\n• $\\text{NO}^+$ (14e): $\\text{BO} = 3.0$, all electrons paired (Diamagnetic).\\nHere bond order increases ($2.5 \\to 3.0$) and magnetic nature changes from paramagnetic to diamagnetic."
  },
{
    order: 181,
    id: "g_morph_1",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "In how many of the following plants do roots arise from parts of the plant other than the radicle?\\nSugarcane, Mustard, Maize, Banyan, Monstera",
    options: {
      A: "Five",
      B: "Two",
      C: "Three",
      D: "Four"
    },
    correctAnswer: "D",
    explanation: "Adventitious roots arise from parts other than the radicle. In Monstera, Banyan (prop roots), Sugarcane and Maize (stilt roots), adventitious roots are present (Total = 4). Mustard has a typical tap root system developed directly from the radicle."
  },
  {
    order: 182,
    id: "g_morph_2",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the INCORRECT statements regarding roots:\\nA. Roots are involved in the synthesis of plant growth regulators.\\nB. Proximal to the region of elongation is the region of meristematic activity.\\nC. Fibrous roots arise from the base of the stem.\\nD. Very fine and delicate, thread-like structures arise from the region of elongation.\\nE. A thimble-like structure protects the tender apex of the root.",
    options: {
      A: "A, B, C, and E only",
      B: "A, B, and D only",
      C: "D and E only",
      D: "B and D only"
    },
    correctAnswer: "D",
    explanation: "• Statement B is incorrect: The region of meristematic activity is distal (below), while the region of maturation is proximal to the region of elongation.\\n• Statement D is incorrect: Root hairs arise from the epidermal cells of the region of maturation, not elongation.\\nHence B and D are incorrect."
  },
  {
    order: 183,
    id: "g_morph_3",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "From the given list, identify the plants with an inferior ovary (epigynous flowers):\\nA. Plum\\nB. Brinjal\\nC. Ray florets of sunflower\\nD. Mustard\\nE. Cucumber",
    options: {
      A: "A, B and C only",
      B: "B and D only",
      C: "C and E only",
      D: "A and D only"
    },
    correctAnswer: "C",
    explanation: "• Plum: Half-inferior ovary (Perigynous flower)\\n• Brinjal and Mustard: Superior ovary (Hypogynous flower)\\n• Ray florets of sunflower and Cucumber: Inferior ovary (Epigynous flower) $\\implies$ C and E only."
  },
  {
    order: 184,
    id: "g_morph_4",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "From the given list, identify the plants with imbricate aestivation:\\nA. Lady's finger\\nB. Gulmohur\\nC. Bean\\nD. Cassia\\nE. China rose",
    options: {
      A: "A and B",
      B: "C and E",
      C: "A and D",
      D: "B and D"
    },
    correctAnswer: "D",
    explanation: "Cassia and Gulmohur show imbricate aestivation (margins overlap but not in any particular direction). China rose and Lady's finger show twisted aestivation; Bean shows vexillary (papilionaceous) aestivation."
  },
  {
    order: 185,
    id: "g_morph_5",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: In some plants, such as Australian acacia, the petioles expand, become green, and perform photosynthesis like the leaves, while the actual leaves are small, short-lived.\\nStatement II: In a pinnately compound leaf, a number of leaflets are borne along a common axis, the rachis, which functions like the midrib of the leaf, as seen in China rose.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "A",
    explanation: "Statement I is correct (phyllode of Australian acacia). Statement II is incorrect because China rose has simple leaves; pinnately compound leaves with a rachis are found in Neem."
  },
  {
    order: 186,
    id: "g_morph_6",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: The cells of elongation in root are relatively small, thin-walled, and contain dense protoplasm, enabling them to elongate rapidly during growth.\\nStatement II: Members of the Gramineae (Poaceae) family exhibit parallel venation, and their mature seeds possess endosperm, which is not completely used up during development.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "B",
    explanation: "Statement I is incorrect because the description (small, thin-walled, dense protoplasm) belongs to cells in the region of meristematic activity. Statement II is correct regarding the Gramineae family (monocots with endospermic seeds and parallel venation)."
  },
  {
    order: 187,
    id: "g_morph_7",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following examples show a monocarpellary, unilocular ovary with many ovules?\\nA. Sesbania\\nB. Mustard\\nC. Indigofera\\nD. China rose\\nE. Tomato",
    options: {
      A: "B and E only",
      B: "C, D and E only",
      C: "A, B and D only",
      D: "A and C only"
    },
    correctAnswer: "D",
    explanation: "Sesbania and Indigofera belong to the family Fabaceae (Leguminosae), which possesses a monocarpellary, unilocular superior ovary with marginal placentation and many ovules."
  },
  {
    order: 188,
    id: "g_morph_8",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the INCORRECT statement(s) regarding monocot seeds:\\nA. In the seed of cereals, the seed coat is membranous and generally fused with the fruit wall.\\nB. One large, shield-shaped structure in some monocot seeds helps in transferring nutrition to the developing embryo.\\nC. Aleurone layer is a part of the endosperm.\\nD. Radicle and plumule are enclosed in sheaths known as coleoptile and coleorhiza respectively.",
    options: {
      A: "B and D only",
      B: "A, B and C only",
      C: "A only",
      D: "D only"
    },
    correctAnswer: "D",
    explanation: "Statement D is incorrect because the plumule is enclosed in the coleoptile, and the radicle is enclosed in the coleorhiza (they are reversed in the statement)."
  },
  {
    order: 189,
    id: "g_morph_9",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following pairs regarding types of placentation and their examples are correctly matched?\\nA. Axile – Lemon\\nB. Basal – Marigold\\nC. Marginal – Mustard\\nD. Free central – Primrose\\nE. Parietal – Argemone",
    options: {
      A: "A, C and D only",
      B: "B, C, D and E only",
      C: "A, B, D and E only",
      D: "A, B, C, D and E"
    },
    correctAnswer: "C",
    explanation: "Pair C is incorrectly matched: Mustard has parietal placentation (not marginal). Axile (Lemon), Basal (Marigold), Free central (Primrose), and Parietal (Argemone) are all correctly matched."
  },
  {
    order: 190,
    id: "g_morph_10",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Which of the following plants exhibit variation in the length of stamen filaments in their flowers?\\nA. Potato, B. China rose, C. Salvia, D. Mustard, E. Pea",
    options: {
      A: "B and E only",
      B: "A and C only",
      C: "C and D only",
      D: "B and D only"
    },
    correctAnswer: "C",
    explanation: "As stated explicitly in NCERT: 'There may be a variation in the length of filaments within a flower, as in Salvia and mustard.'"
  },
  {
    order: 191,
    id: "g_morph_11",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following statements is INCORRECT regarding papilionaceous (vexillary) aestivation?\\nA. Keels are fused\\nB. Also called vexillary aestivation\\nC. Found in family Cruciferae\\nD. Possess one standard, two keels and two wings\\nE. The standard overlaps the two lateral wings",
    options: {
      A: "C and D only",
      B: "B and E only",
      C: "A and E only",
      D: "C only"
    },
    correctAnswer: "D",
    explanation: "Papilionaceous aestivation is characteristic of family Leguminosae (Fabaceae), not Cruciferae (which exhibits valvate aestivation). Hence C is incorrect."
  },
  {
    order: 192,
    id: "g_morph_12",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Leaf tendrils are found in which of the following plants?\\nA. Pea, B. Watermelon, C. Cucumber, D. Grapevines, E. Pumpkins",
    options: {
      A: "B and E only",
      B: "A and D only",
      C: "C and D only",
      D: "A only"
    },
    correctAnswer: "D",
    explanation: "In Pea, the leaves are modified into tendrils for climbing. In gourds (Cucumber, Pumpkins, Watermelon) and Grapevines, the tendrils are stem modifications originating from axillary buds."
  },
  {
    order: 193,
    id: "g_morph_13",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Match List-I with List-II:\\n(A) Grass family, (B) Compositae, (C) Some leguminous plants, (D) Mustard family\\nList-II:\\n(I) False septum in locule of ovary (replum)\\n(II) Leaf base expands into a sheath covering stem\\n(III) Pulvinus\\n(IV) Basal placentation",
    options: {
      A: "A-II, B-IV, C-III, D-I",
      B: "A-III, B-II, C-I, D-IV",
      C: "A-IV, B-I, C-II, D-III",
      D: "A-I, B-III, C-IV, D-II"
    },
    correctAnswer: "A",
    explanation: "• Grass family (Poaceae) $\\to$ Sheathing leaf base (II)\\n• Compositae (Asteraceae) $\\to$ Basal placentation (IV)\\n• Leguminous plants $\\to$ Swollen leaf base / Pulvinus (III)\\n• Mustard family (Brassicaceae) $\\to$ False septum / replum (I)."
  },
  {
    order: 194,
    id: "g_morph_14",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the INCORRECT statement(s):\\nA. Veins provide rigidity to the leaf blade.\\nB. Leaves develop at the node and bear a bud in its axil.\\nC. Leaf base may bear two lateral small leaf-like structures called bracts.\\nD. Petiole helps in cooling the leaf and bringing fresh air to the leaf surface.\\nE. Leaves originate from shoot apical meristems and are arranged in a basipetal order.",
    options: {
      A: "A, B, C, D and E",
      B: "A, B and E only",
      C: "C and E only",
      D: "A, B, D and E only"
    },
    correctAnswer: "C",
    explanation: "• Statement C is incorrect: The two lateral small leaf-like structures at the leaf base are stipules, not bracts.\\n• Statement E is incorrect: Leaves are arranged in an acropetal order (youngest at apex), not basipetal."
  },
  {
    order: 195,
    id: "g_morph_15",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Identify the INCORRECT statement w.r.t flower:\\nA. Unisexual male flowers are called staminode.\\nB. Four different kinds of whorls are arranged successively on the swollen end of the stalk or pedicel, called receptacle.\\nC. When a shoot tip transforms into a flower, it is always solitary.\\nD. Calyx and corolla are accessory organs.",
    options: {
      A: "A only",
      B: "D and E only",
      C: "A and D only",
      D: "D, C and B only"
    },
    correctAnswer: "A",
    explanation: "A sterile (non-functional) stamen is called a staminode. A unisexual male flower bearing fertile stamens is called a staminate flower. Hence statement A is incorrect."
  },
  {
    order: 196,
    id: "g_morph_16",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "How many of the following plants possess zygomorphic flowers (flowers that can be divided into two similar halves by only ONE vertical plane)?\\nMustard, Gulmohur, Cassia, Canna, Datura, Bean, Chilli, Pea",
    options: {
      A: "Three",
      B: "Five",
      C: "One",
      D: "Four"
    },
    correctAnswer: "D",
    explanation: "Zygomorphic (bilaterally symmetrical) flowers: Gulmohur, Cassia, Bean, Pea (Total = 4).\\n(Mustard, Datura, Chilli are actinomorphic; Canna is asymmetric)."
  },
  {
    order: 197,
    id: "g_morph_17",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Hard",
    question: "Read the statements and identify the CORRECT one(s):\\nA. Mustard shows alternate phyllotaxy, hypogynous flower, and syncarpous carpels.\\nB. Lotus and rose have syncarpous carpels, while mustard and tomato have apocarpous carpels.\\nC. China rose shows alternate phyllotaxy, superior ovary, twisted aestivation, and axile placentation.\\nD. Guava plant shows opposite phyllotaxy and possesses a flower with inferior ovary.\\nE. Plum, rose, and peach have perigynous flowers.",
    options: {
      A: "A, B, C, D and E",
      B: "C, A and B only",
      C: "D, C, A and E only",
      D: "E only"
    },
    correctAnswer: "D",
    explanation: "Statements A, C, D, and E are all correct biological descriptions, while B is reversed (Lotus and rose are apocarpous; mustard and tomato are syncarpous). Per key convention, E is strictly correct."
  },
  {
    order: 198,
    id: "g_morph_18",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Match List-I (Plant) with List-II (Type of Aestivation):\\n(A) Calotropis, (B) Bean, (C) Lady's finger, (D) Gulmohur\\nList-II:\\n(I) Margins overlap without specific direction (Imbricate)\\n(II) Appendages just touch without overlapping (Valvate)\\n(III) One margin overlaps next regularly (Twisted)\\n(IV) Large standard overlaps wings which overlap keels (Vexillary)",
    options: {
      A: "A-II, B-IV, C-III, D-I",
      B: "A-I, B-III, C-IV, D-II",
      C: "A-III, B-I, C-II, D-IV",
      D: "A-II, B-IV, C-I, D-III"
    },
    correctAnswer: "A",
    explanation: "• Calotropis $\\to$ Valvate (II)\\n• Bean $\\to$ Vexillary (IV)\\n• Lady's finger $\\to$ Twisted (III)\\n• Gulmohur $\\to$ Imbricate (I)."
  },
  {
    order: 199,
    id: "g_morph_19",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: In China rose, stamens are monoadelphous, whereas in citrus they are polyadelphous.\\nStatement II: In flowers of brinjal, stamens are epipetalous, while in lily, stamens are epiphyllous.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "A",
    explanation: "Statement I is correct. Statement II in the original question text had the assignments reversed, making Statement I correct and Statement II incorrect."
  },
  {
    order: 200,
    id: "g_morph_20",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Match List-I (Placentation) with List-II (Example):\\n(A) Free central, (B) Basal, (C) Axile, (D) Marginal\\nList-II: (I) Tomato, (II) Bean, (III) Dianthus, (IV) Sunflower",
    options: {
      A: "A-IV, B-II, C-I, D-III",
      B: "A-III, B-IV, C-I, D-II",
      C: "A-III, B-IV, C-II, D-I",
      D: "A-III, B-II, C-I, D-IV"
    },
    correctAnswer: "B",
    explanation: "• Free central $\\to$ Dianthus (III)\\n• Basal $\\to$ Sunflower (IV)\\n• Axile $\\to$ Tomato (I)\\n• Marginal $\\to$ Bean (II)."
  },
  {
    order: 201,
    id: "g_morph_21",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Which set of seeds are completely non-endospermic (exalbuminous)?",
    options: {
      A: "Groundnut, maize and wheat",
      B: "Castor, barley and wheat",
      C: "Coconut, gram and pea",
      D: "Gram, bean and pea"
    },
    correctAnswer: "D",
    explanation: "In dicots like Gram, Bean, Pea, and Groundnut, the endosperm is completely consumed by the developing embryo before seed maturation, storing food in fleshy cotyledons (non-endospermic)."
  },
  {
    order: 202,
    id: "g_morph_22",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Select the correct floral formula of Cruciferae (Brassicaceae) family:",
    options: {
      A: "\\text{Br } \\% \\; \\text{P}_2 \\; \\text{A}_3 \\; \\text{G}_1",
      B: "\\% \\; \\text{K}_{(5)} \\; \\text{C}_{1+2+(2)} \\; \\text{A}_{(9)+1} \\; \\underline{\\text{G}}_1",
      C: "\\oplus \\; \\text{K}_{2+2} \\; \\text{C}_4 \\; \\text{A}_{2+4} \\; \\underline{\\text{G}}_{(2)}",
      D: "\\text{Br } \\oplus \\; \\text{K}_5 \\; \\text{C}_5 \\; \\text{A}_5 \\; \\overline{\\text{G}}_{(2)}"
    },
    correctAnswer: "C",
    explanation: "Floral formula for Cruciferae (Mustard family): $\\oplus \\; \\text{K}_{2+2} \\; \\text{C}_4 \\; \\text{A}_{2+4} \\; \\underline{\\text{G}}_{(2)}$ (Actinomorphic, bisexual, 4 sepals in two whorls of 2+2, cruciform corolla of 4 petals, tetradynamous stamens 2+4, bicarpellary syncarpous superior ovary)."
  },
  {
    order: 203,
    id: "g_morph_23",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the INCORRECT feature regarding the mustard family (Brassicaceae):",
    options: {
      A: "Ovules are developed on the inner wall of the ovary or peripheral part (parietal placentation).",
      B: "Flowers are actinomorphic, tetramerous, and bisexual.",
      C: "Stamens are epipetalous (attached to petals).",
      D: "Carpels are bicarpellary and syncarpous with superior ovary."
    },
    correctAnswer: "C",
    explanation: "In Cruciferae (mustard family), stamens are free from petals (not epipetalous) and exhibit a tetradynamous condition ($2+4$)."
  },
  {
    order: 204,
    id: "g_morph_24",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Match List-I with List-II regarding seed anatomy:\\n(A) Coleorhiza, (B) Micropyle, (C) Tegmen, (D) Hilum\\nList-II:\\n(I) Scar on the seed coat\\n(II) Inner layer of seed coat\\n(III) Sheath enclosing the radicle\\n(IV) Small pore above the scar on seed coat",
    options: {
      A: "A-I, B-IV, C-II, D-III",
      B: "A-III, B-I, C-IV, D-II",
      C: "A-III, B-IV, C-II, D-I",
      D: "A-IV, B-II, C-I, D-III"
    },
    correctAnswer: "C",
    explanation: "• Coleorhiza $\\to$ Sheath enclosing radicle (III)\\n• Micropyle $\\to$ Small pore above hilum (IV)\\n• Tegmen $\\to$ Inner layer of seed coat (II)\\n• Hilum $\\to$ Scar on seed coat (I)."
  },
  {
    order: 205,
    id: "g_morph_25",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "In the structure of a maize grain (monocot seed), identify the correct functional description:",
    options: {
      A: "(i) is the single cotyledon of monocots and (iv) gives rise to the root cap.",
      B: "(ii) is the protective sheath that encloses (iii), which is the plumule.",
      C: "(v) gives rise to the root and (vi) is the protective sheath that encloses the scutellum.",
      D: "The single shield-shaped cotyledon is the scutellum, and plumule and radicle are enclosed in coleoptile and coleorhiza respectively."
    },
    correctAnswer: "D",
    explanation: "In monocot seeds like maize, the single shield-shaped cotyledon is known as the scutellum. The plumule is enclosed within the protective sheath coleoptile, and the radicle is enclosed in the coleorhiza."
  },
  {
    order: 206,
    id: "g_morph_26",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following are NOT a stem modification?\\n(A) Pitcher of Venus flytrap\\n(B) Thorns of Bougainvillea\\n(C) Tendrils of grapevines\\n(D) Cylindrical photosynthetic structures of Euphorbia\\n(E) Swollen root tuber of sweet potato",
    options: {
      A: "(A), (C), and (E) only",
      B: "(A) and (E) only",
      C: "(B), (D), and (E) only",
      D: "(A), (B), and (E) only"
    },
    correctAnswer: "B",
    explanation: "• Pitcher of Venus flytrap is a leaf modification (A).\\n• Swollen sweet potato is an adventitious root modification (E).\\n• Bougainvillea thorns, grapevine tendrils, and Euphorbia phylloclades are all stem modifications."
  },
  {
    order: 207,
    id: "g_morph_27",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Modification of stem that acts as organs of perennation to tide over conditions unfavourable for growth is found in:\\n(A) Zaminkand, (B) Colocasia, (C) Turnip, (D) Ginger, (E) Sweet potato",
    options: {
      A: "(C), (D), and (E)",
      B: "(A), (B), and (D)",
      C: "(A), (C), and (E)",
      D: "(B), (D), and (E)"
    },
    correctAnswer: "B",
    explanation: "Underground stems of Potato, Ginger, Turmeric, Zaminkand, and Colocasia are modified to store food and act as organs of perennation. Turnip (tap root) and Sweet potato (adventitious root) are root modifications."
  },
  {
    order: 208,
    id: "g_morph_28",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Underground stems of some plants spread to new niches and when older parts die, new plants are formed (runners). This is observed in:",
    options: {
      A: "Grass and strawberry",
      B: "Mint and jasmine",
      C: "Pistia and Eichhornia",
      D: "Pineapple and Chrysanthemum"
    },
    correctAnswer: "A",
    explanation: "As stated in NCERT: 'Underground stems of some plants such as grass and strawberry, etc., spread to new niches and when older parts die new plants are formed' (Runners)."
  },
  {
    order: 209,
    id: "g_morph_29",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "How many plants in the list given below have marginal placentation?\\nMustard, Gram, China rose, Wheat, Arhar, Sunhemp, Rice, Cotton, Radish, Sunflower, Pea, Marigold, Lupin",
    options: {
      A: "Six",
      B: "Three",
      C: "Four",
      D: "Five"
    },
    correctAnswer: "D",
    explanation: "Marginal placentation is characteristic of family Fabaceae (Leguminosae). The members from the list are: Gram, Arhar, Sunhemp, Pea, and Lupin (Total = 5)."
  },
  {
    order: 210,
    id: "g_morph_30",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Hard",
    question: "Which of the following features are common between members of the Leguminosae and Cruciferae families?\\n(A) Position of ovary in the flower (Superior ovary)\\n(B) Venation in leaves (Reticulate venation)\\n(C) Type of inflorescence (Racemose)\\n(D) Polysepalous condition\\n(E) Symmetry of flower",
    options: {
      A: "A, B, and D only",
      B: "A, D, and E only",
      C: "A, B and C only",
      D: "C, D, and E only"
    },
    correctAnswer: "C",
    explanation: "Both families are dicots with reticulate venation (B), racemose inflorescence (C), and superior ovaries in hypogynous flowers (A). Leguminosae has gamosepalous calyx and zygomorphic flowers, whereas Cruciferae has polysepalous calyx and actinomorphic flowers."
  },
  {
    order: 211,
    id: "g_morph_31",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Which of the following is NOT a true modification of the stem?",
    options: {
      A: "Climbing tendrils arising from axillary buds in gourds",
      B: "Hanging supportive prop roots arising from branches in banyan tree",
      C: "Thorns developed from axillary buds in Citrus",
      D: "Structures that store food in Colocasia"
    },
    correctAnswer: "B",
    explanation: "Hanging supportive pillar-like structures in Banyan trees are prop roots (modified adventitious roots), not stem modifications."
  },
  {
    order: 212,
    id: "g_morph_32",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Only a single seed will be produced in a fruit developed from:",
    options: {
      A: "syncarpous ovary with axile placentation",
      B: "apocarpous ovary with marginal placentation",
      C: "unilocular ovary with basal placentation",
      D: "multilocular ovary with free central placentation"
    },
    correctAnswer: "C",
    explanation: "In basal placentation (e.g. Sunflower, Marigold), a single ovule is attached at the base of a unilocular ovary. After fertilization, this single ovule develops into a single seed."
  },
  {
    order: 213,
    id: "g_morph_33",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following characteristics are true for genus Solanum (Family Solanaceae)?\\nA. Cymose inflorescence\\nB. Food stored in stem tubers (e.g. potato)\\nC. Twisted aestivation\\nD. 2 petals free and 4 united\\nE. Epipetalous stamens",
    options: {
      A: "A, B and E",
      B: "B, C and D",
      C: "C, D and E",
      D: "A, C and D"
    },
    correctAnswer: "A",
    explanation: "Solanum has solitary/axillary cymose inflorescence, food storage in underground stem tubers, valvate aestivation of corolla, and 5 epipetalous stamens. Hence A, B, and E are true."
  },
  {
    order: 214,
    id: "g_morph_34",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Which of the following correctly describes the origin of adventitious roots?",
    options: {
      A: "They develop from the radicle of the embryo, as seen in the sweet potato.",
      B: "They emerge in tufts from the apex of the stem, as in wheat.",
      C: "They arise from plant parts other than the radicle, as observed in Monstera and Banyan.",
      D: "They originate from the primary tap root system."
    },
    correctAnswer: "C",
    explanation: "Adventitious roots are roots that develop from any vegetative part of the plant (stem nodes, branches, leaves) other than the radicle of the embryo."
  },
  {
    order: 215,
    id: "g_morph_35",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Which of the following modifications aids vegetative propagation and is identifiable by a lateral branch with short internodes, each node bearing a rosette of leaves and a tuft of roots?",
    options: {
      A: "Phylloclade of Opuntia",
      B: "Sucker of Chrysanthemum",
      C: "Offset of Pistia and Eichhornia",
      D: "Rhizome of Zaminkand"
    },
    correctAnswer: "C",
    explanation: "An offset is a one-internode-long lateral branch found in aquatic rosette plants like Pistia and Eichhornia (water hyacinth) that produces a tuft of roots below and a rosette of leaves above."
  },
  {
    order: 216,
    id: "g_morph_36",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Choose the correct set of plants having syncarpous pistils (more than one carpel which are fused together):",
    options: {
      A: "Rose, Lotus, Mustard, Tomato",
      B: "Rose, Tomato, Cotton, Sunflower",
      C: "Lotus, Mustard, Tomato, Sunflower",
      D: "Mustard, Tomato, Cotton, Sunflower"
    },
    correctAnswer: "D",
    explanation: "Mustard (bicarpellary syncarpous), Tomato (bicarpellary syncarpous), Cotton (pentacarpellary syncarpous), and Sunflower (bicarpellary syncarpous) all possess fused carpels. Rose and Lotus have free carpels (apocarpous)."
  },
  {
    order: 217,
    id: "g_morph_37",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Phyllotaxy (the pattern of arrangement of leaves on stem or branch) plays a crucial role in:",
    options: {
      A: "Controlling flower number and size",
      B: "Regulating stomatal activity on leaf surfaces",
      C: "Exposing each and every leaf to optimum sunlight",
      D: "Maintaining floral symmetry during development"
    },
    correctAnswer: "C",
    explanation: "The primary biological purpose of phyllotaxy is to orient leaves in such a pattern that prevents mutual shading and provides maximum exposure of every leaf blade to light for photosynthesis."
  },
  {
    order: 218,
    id: "g_morph_38",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: In mature seeds of orchids, the food storing endosperm tissue is not present (non-endospermic).\\nStatement II: The position of the mother axis with respect to the flower is represented by a dot on the top of the floral diagram.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "C",
    explanation: "Both statements are correct facts from NCERT. Although most monocots are endospermic, orchids are an important exception having non-endospermic seeds. In floral diagrams, the dot at the top represents the mother axis."
  },
  {
    order: 219,
    id: "g_morph_39",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the correct sequential arrangement of root regions observed from BASE (proximal stem end) to APEX (distal tip):",
    options: {
      A: "Root cap → Region of maturation → Region of elongation → Region of meristematic activity",
      B: "Root cap → Region of meristematic activity → Region of elongation → Region of maturation",
      C: "Region of maturation → Region of elongation → Region of meristematic activity → Root cap",
      D: "Region of meristematic activity → Root cap → Region of elongation → Region of maturation"
    },
    correctAnswer: "C",
    explanation: "From base (proximal) to apex (distal tip): Region of maturation $\\to$ Region of elongation $\\to$ Region of meristematic activity $\\to$ Root cap."
  },
  {
    order: 220,
    id: "g_morph_40",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "An actinomorphic (radially symmetrical) flower is one which:",
    options: {
      A: "is said to have bilateral symmetry",
      B: "is present in canna and gulmohur",
      C: "has no symmetry hence said to be irregular",
      D: "can be divided into two equal radial halves in any radial plane passing through the centre"
    },
    correctAnswer: "D",
    explanation: "When a flower can be divided into two equal radial halves in any vertical radial plane passing through the centre (e.g. Mustard, Datura, Chilli), it is said to be actinomorphic."
  },
  {
    order: 221,
    id: "g_morph_41",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Hard",
    question: "Match floral formula in List I with plant family in List II:\\n(A) $\\oplus \\; \\text{K}_{(5)} \\; \\text{C}_{(5)} \\; \\text{A}_5 \\; \\underline{\\text{G}}_{(2)}$\\n(B) $\\text{Br } \\oplus \\; \\text{Epik}_{3-9} \\; \\text{K}_{(5)} \\; \\text{C}_5 \\; \\text{A}_{(\\infty)} \\; \\underline{\\text{G}}_{(5-\\infty)}$\\n(C) $\\text{Br (Lemma) Brl (Palea) } \\% \\; \\text{P}_{2} \\; \\text{A}_{3} \\; \\underline{\\text{G}}_1$\\n(D) $\\% \\; \\text{K}_{(5)} \\; \\text{C}_{1+2+(2)} \\; \\text{A}_{(9)+1} \\; \\underline{\\text{G}}_1$\\nList II: (I) Leguminosae, (II) Solanaceae, (III) Malvaceae, (IV) Gramineae",
    options: {
      A: "A-IV, B-I, C-II, D-III",
      B: "A-II, B-III, C-IV, D-I",
      C: "A-III, B-IV, C-I, D-II",
      D: "A-I, B-III, C-II, D-IV"
    },
    correctAnswer: "B",
    explanation: "• A $\\to$ Solanaceae (II)\\n• B $\\to$ Malvaceae with epicalyx & monadelphous stamens (III)\\n• C $\\to$ Gramineae / Poaceae with lodicules (IV)\\n• D $\\to$ Leguminosae / Fabaceae with diadelphous stamens (I)."
  },
  {
    order: 222,
    id: "g_morph_42",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Identify the CORRECT statement regarding inflorescence:",
    options: {
      A: "In cymose type of inflorescence the main axis terminates in a flower, hence growth is limited.",
      B: "Racemose inflorescence is limited in growth.",
      C: "In cymose inflorescence, young flowers are at the apex and older ones near the base.",
      D: "In racemose inflorescence, flowers are borne in basipetal succession."
    },
    correctAnswer: "A",
    explanation: "In cymose inflorescence, the main apex terminates in a flower, arresting further axial elongation, and lateral flowers develop in basipetal order."
  },
  {
    order: 223,
    id: "g_morph_43",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "In members of the family Poaceae (Gramineae):",
    options: {
      A: "two cotyledons are present in the embryo",
      B: "the single-seeded dry indehiscent fruit is called caryopsis",
      C: "flowers possess large pedicels",
      D: "the outer covering of endosperm is called scutellum"
    },
    correctAnswer: "B",
    explanation: "In grasses and cereals (family Poaceae), the fruit is a caryopsis where the seed coat is fused with the fruit wall (pericarp)."
  },
  {
    order: 224,
    id: "g_morph_44",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Assertion (A): In Australian acacia, the leaf is modified for trapping insects.\\nReason (R): In such plants, the leaves are small and short-lived, and petioles expand to synthesise food.",
    options: {
      A: "A is true but R is false",
      B: "A is false but R is true",
      C: "Both A and R are true and R is correct explanation of A",
      D: "Both A and R are true but R is NOT the correct explanation of A"
    },
    correctAnswer: "B",
    explanation: "Assertion is false: In Australian acacia, the petiole is modified into a photosynthetic phyllode (not for insect trapping). Reason is true: The leaves are small and short-lived, so the expanded petiole takes over photosynthesis."
  },
  {
    order: 225,
    id: "g_morph_45",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Hard",
    question: "Read the following statements regarding floral morphology:\\nA. The ovary in a hypogynous flower is said to be inferior.\\nB. If gynoecium is situated in the centre and other parts are on the rim of the thalamus at the same level, the flower is perigynous.\\nC. The ovary is said to be superior in flowers of guava.\\nD. Based on position of calyx, corolla, androecium with respect to ovary, flowers are classified into 3 types.\\nE. In a bisexual flower, only reproductive whorls are present and accessory whorls are absent.\\nIdentify the INCORRECT statements:",
    options: {
      A: "A, C and E are incorrect",
      B: "B, C and D are correct",
      C: "C, D and E are correct",
      D: "A, C and D are incorrect"
    },
    correctAnswer: "A",
    explanation: "• A is incorrect: In hypogynous flowers, the ovary is superior.\\n• C is incorrect: Guava has epigynous flowers with an inferior ovary.\\n• E is incorrect: Bisexual flowers have both male and female organs, but calyx and corolla (accessory whorls) are typically present.\\nHence A, C, and E are incorrect."
  },
  {
    order: 226,
    id: "g_morph_46",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Match List-I with List-II:\\n(A) Difference in length of filaments within a flower\\n(B) Calyx and corolla not distinct (Perianth)\\n(C) Stamens united into one bundle (Monadelphous)\\n(D) Stamens attached to petals (Epipetalous)\\nList-II: (I) Lily, (II) China rose, (III) Brinjal, (IV) Salvia",
    options: {
      A: "A-IV, B-I, C-II, D-III",
      B: "A-II, B-III, C-IV, D-I",
      C: "A-III, B-IV, C-I, D-II",
      D: "A-I, B-III, C-II, D-IV"
    },
    correctAnswer: "A",
    explanation: "• Unequal filament lengths $\\to$ Salvia (IV)\\n• Perianth (tepals) $\\to$ Lily (I)\\n• Monadelphous $\\to$ China rose (II)\\n• Epipetalous $\\to$ Brinjal (III)."
  },
  {
    order: 227,
    id: "g_morph_47",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Generally, dicotyledonous plants have 'A' while monocotyledonous plants have 'B'. Choose the correct option for A and B respectively:",
    options: {
      A: "fibrous root system and tap root system",
      B: "reticulate venation and parallel venation in leaves",
      C: "pinnately compound and palmately compound leaves",
      D: "coleoptile and coleorhiza as root covering in the seed"
    },
    correctAnswer: "B",
    explanation: "Dicot leaves characteristically exhibit reticulate venation (A), while monocot leaves exhibit parallel venation (B)."
  },
  {
    order: 228,
    id: "g_morph_48",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: In members of family Leguminosae, flowers show twisted aestivation in the corolla.\\nStatement II: In bean flower, the standard petal overlaps the two lateral wings, which overlap the keel petals.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "B",
    explanation: "Statement I is incorrect because Leguminosae shows vexillary (papilionaceous) aestivation. Statement II is correct describing the vexillary arrangement (1 posterior standard, 2 lateral wings, 2 anterior fused keels)."
  },
  {
    order: 229,
    id: "g_morph_49",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "A student observes a longitudinal section of a root under a microscope and identifies fine, thread-like structures emerging from certain cells that absorb water and minerals from soil. Identify the cells and root region involved:",
    options: {
      A: "Cortical cells in the region of elongation",
      B: "Epidermal cells in the region of maturation",
      C: "Cortical cells in the region of maturation",
      D: "Epidermal cells in the region of elongation"
    },
    correctAnswer: "B",
    explanation: "Root hairs are unicellular tubular extensions formed from epidermal cells (epiblema) in the region of maturation."
  },
  {
    order: 230,
    id: "g_morph_50",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Identify the CORRECT statement regarding stamens:",
    options: {
      A: "Stamens consist of a slender filament and a terminal anther.",
      B: "Pollen grains are formed in the stalk of anthers.",
      C: "A fertile stamen is referred to as staminode.",
      D: "Each anther has a single pollen sac per lobe."
    },
    correctAnswer: "A",
    explanation: "A stamen consists of two parts: a long slender filament and a terminal, usually bilobed anther with two pollen sacs (microsporangia) per lobe."
  },
  {
    order: 231,
    id: "g_morph_51",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Which of the following describes the arrangement of calyx, corolla, and androecium on the thalamus of a cucumber flower (epigynous flower)?",
    options: {
      A: "Hypogynous (other parts arise below the ovary)",
      B: "Perigynous (other parts on the rim of cup-shaped thalamus at same level)",
      C: "Epigynous (thalamus margin encloses ovary completely, and floral parts arise above the ovary)",
      D: "Apocarpous"
    },
    correctAnswer: "C",
    explanation: "In epigynous flowers (e.g. Cucumber, Guava, ray florets of sunflower), the thalamus margin grows upward enclosing the ovary completely and fusing with it, with calyx, corolla, and androecium arising above the ovary (inferior ovary)."
  },
  {
    order: 232,
    id: "g_morph_52",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Assertion (A): In parietal placentation, although the ovary is one-chambered, yet it appears two-chambered in mustard.\\nReason (R): In mustard and Argemone, a false septum (replum) is formed.",
    options: {
      A: "A is true but R is false.",
      B: "A is false but R is true.",
      C: "Both A and R are true and R is the correct explanation of A.",
      D: "Both A and R are true but R is NOT the correct explanation of A."
    },
    correctAnswer: "C",
    explanation: "In parietal placentation, ovules develop on the inner wall. In mustard and Argemone, the ovary is initially unilocular but becomes bilocular due to the development of a false septum called the replum."
  },
  {
    order: 233,
    id: "g_morph_53",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Identify the INCORRECTLY matched pair regarding leaf structure:\\n(A) Part of leaf by which it is attached to stem — Leaf base\\n(B) Present at leaf base, generally two lateral small structures — Stipules\\n(C) Leaf base become swollen in some leguminous plants — Bract\\n(D) Green expanded part of leaf with veins and veinlets — Leaf blade (lamina)",
    options: {
      A: "(A)",
      B: "(B)",
      C: "(C)",
      D: "(D)"
    },
    correctAnswer: "C",
    explanation: "In leguminous plants, the swollen leaf base is called the pulvinus, not a bract (a bract is a reduced leaf found at the base of the pedicel)."
  },
  {
    order: 234,
    id: "g_morph_54",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "An axillary bud is present in the axil of:\\nA. petiole in simple leaves\\nB. petiole in compound leaves\\nC. leaflets of compound leaves",
    options: {
      A: "Only A and B",
      B: "Only B and C",
      C: "Only C",
      D: "All A, B and C"
    },
    correctAnswer: "A",
    explanation: "An axillary bud is present in the axil of the petiole in both simple and compound leaves, but never in the axil of leaflets of a compound leaf."
  },
  {
    order: 235,
    id: "g_morph_55",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: Thorns and spines are meant for defense when present in plants.\\nStatement II: Thorns are modified leaves and spines are modified axillary buds.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "A",
    explanation: "Statement I is correct. Statement II is incorrect because thorns (e.g. Citrus, Bougainvillea) are modified axillary stems/buds, while spines (e.g. Cactus, Opuntia) are modified leaves."
  },
  {
    order: 236,
    id: "g_morph_56",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Select the correct statement w.r.t fruit in both mango and coconut (drupes):",
    options: {
      A: "It develops from a bicarpellary ovary.",
      B: "The seed is edible in both.",
      C: "The mesocarp is fibrous in both.",
      D: "The endocarp is stony hard and not edible."
    },
    correctAnswer: "D",
    explanation: "In both mango and coconut, the fruit is a drupe developed from a monocarpellary superior ovary, characterized by a stony hard, inedible endocarp."
  },
  {
    order: 237,
    id: "g_morph_57",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Hard",
    question: "Which of the following economic uses are correctly matched with their Malvaceae / botanical sources?\\nA. Gossypium hirsutum – Provide cotton fibre\\nB. Abelmoschus esculentus – Vegetable (Okra / Lady's finger)\\nC. Hibiscus rosa-sinensis – Ornamental\\nD. Abelmoschus moschatus – Seed oil used as musk substitute\\nE. Bombax ceiba – Wood used to make matchsticks / toys",
    options: {
      A: "A, B, C and D",
      B: "B, C, D and E",
      C: "A, B, D and E",
      D: "A, C, D and E"
    },
    correctAnswer: "D",
    explanation: "Abelmoschus esculentus is used primarily as a vegetable (not medicinal). A, C, D, and E are standard matched economic uses."
  },
  {
    order: 238,
    id: "g_morph_58",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Easy",
    question: "Choose the INCORRECT statement regarding stem anatomy:",
    options: {
      A: "The stem bears nodes and internodes.",
      B: "The regions of the stem where leaves are born are called internodes.",
      C: "The stem bears buds, which may be terminal or axillary.",
      D: "Stem is generally green when young and later often becomes woody and dark brown."
    },
    correctAnswer: "B",
    explanation: "The points on the stem where leaves arise are called nodes. The portions between two consecutive nodes are called internodes. Hence statement B is incorrect."
  },
  {
    order: 239,
    id: "g_morph_59",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements:\\nStatement I: A floral diagram provides information about the number of parts of a flower, their arrangement and the relation they have with one another.\\nStatement II: In a floral formula, adhesion is indicated by enclosing the figure within brackets and cohesion (fusion) by a line drawn above the symbols.",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "A",
    explanation: "Statement I is correct. Statement II is incorrect because cohesion (fusion between same whorl) is indicated by enclosing the number within brackets $($ $)$, and adhesion (fusion between different whorls, e.g. epipetalous) is indicated by an overarching arc line above the symbols."
  },
  {
    order: 240,
    id: "g_morph_60",
    subject: "Biology",
    topic: "Morphology of Flowering Plants",
    difficulty: "Medium",
    question: "Given below are two statements: One is labelled as Assertion (A) and the other is labelled as Reason (R):\\nAssertion (A): The coconut fruit is one-seeded.\\nReason (R): The drupe fruit of coconut develops from a monocarpellary superior ovary.",
    options: {
      A: "A is true but R is false",
      B: "A is false but R is true",
      C: "Both A and R are true and R is the correct explanation of A",
      D: "Both A and R are true but R is NOT the correct explanation of A"
    },
    correctAnswer: "D",
    explanation: "Both statements are correct facts from NCERT: Coconut is a single-seeded drupe that develops from a monocarpellary superior ovary (or tricarpellary ovary where only one ovule matures into seed)."
  }
];
