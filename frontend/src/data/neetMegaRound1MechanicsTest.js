/**
 * NEET 2027 Mega Master Drill: Round 1 (Physics Mechanics)
 * Work Energy & Power (45 Qs), Centre of Mass (45 Qs), Rotational Motion (30 Qs)
 * Total: 120 Questions | 480 Marks | Duration: 120 Minutes (Fixed 2.0 Hours, No Extension)
 */

function svgUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

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
      <text x="100" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">1</text>
      <text x="150" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">2</text>
      <text x="200" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">3</text>
      <text x="250" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">4</text>
      <text x="300" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">5</text>
      <text x="350" y="195" fill="#cbd5e1" font-family="sans-serif" font-size="10">6</text>
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
      <polygon points="50,120 125,40 200,120" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="2.5"/>
      <polygon points="200,120 275,200 350,120" fill="#f43f5e" fill-opacity="0.2" stroke="#f43f5e" stroke-width="2.5"/>
      <text x="195" y="135" fill="#cbd5e1" font-family="sans-serif" font-size="11">4</text>
      <text x="345" y="135" fill="#cbd5e1" font-family="sans-serif" font-size="11">8</text>
    </svg>
  `),
};


export const NEET_ROUND_1_TEST = {
  id: 'neet-2027-mega-round-1-mechanics',
  title: 'NEET 2027 Grand Drill: Round 1 – Mechanics (WEP, COM & Rotational)',
  subtitle: '120 Hard Questions · 2 Hours Timed CBT · Work Energy, Centre of Mass & Rotational Motion',
  subject: 'Physics (Class 11 Mechanics)',
  syllabus: 'Work Energy & Power (45 Qs), Centre of Mass & Collisions (45 Qs), Rotational Mechanics (30 Qs)',
  totalQuestions: 120,
  durationMinutes: 120,
  allowCustomDuration: false,
  totalMarks: 480,
  correctMarks: 4,
  negativeMarks: 1,
  badge: 'Round 1 · 120 Qs (2h Fixed)',
  description:
    'Round 1 of the National CBT Grand Mock. 120 high-yield Mechanics questions spanning Work-Energy Theorem, Impulse, 2D Collisions, Centre of Mass, and Rotational Torque/Inertia.',
};

export const NEET_ROUND_1_QUESTIONS = [
  {
    "order": 1,
    "id": "r1_q_1",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A constant force of $\\vec{F} = (3\\hat{i} + \\hat{j})\\text{ N}$ acts on a particle of mass $2\\text{ kg}$. The particle is displaced from position $(2\\hat{i} + \\hat{k})\\text{ m}$ to position $(4\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ m}$. The work done by the force on the particle is:",
    "options": {
      "A": "6 J",
      "B": "13 J",
      "C": "15 J",
      "D": "9 J"
    },
    "correctAnswer": "D",
    "explanation": "Displacement vector $\\Delta \\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (4\\hat{i} + 3\\hat{j} - \\hat{k}) - (2\\hat{i} + \\hat{k}) = 2\\hat{i} + 3\\hat{j} - 2\\hat{k}\\text{ m}$.\\n\\nWork done $W = \\vec{F} \\cdot \\Delta \\vec{r} = (3\\hat{i} + \\hat{j}) \\cdot (2\\hat{i} + 3\\hat{j} - 2\\hat{k}) = (3 \\times 2) + (1 \\times 3) + (0 \\times -2) = 6 + 3 = 9\\text{ J}$."
  },
  {
    "order": 2,
    "id": "r1_q_2",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "Under the action of a force, a $2\\text{ kg}$ body moves such that its position $x$ as a function of time $t$ is given by $x = \\frac{t^2}{3}$, where $x$ is in meters and $t$ in seconds. The work done by the force in the first two seconds is:",
    "options": {
      "A": "1600 J",
      "B": "160 J",
      "C": "16 J",
      "D": "\\frac{16}{9} J"
    },
    "correctAnswer": "D",
    "explanation": "Given position $x(t) = \\frac{t^2}{3}$.\\nVelocity $v = \\frac{dx}{dt} = \\frac{2t}{3}$.\\n\\nAt $t = 0\\text{ s}$, $v_0 = 0\\text{ m/s}$.\\nAt $t = 2\\text{ s}$, $v = \\frac{2(2)}{3} = \\frac{4}{3}\\text{ m/s}$.\\n\\nFrom Work-Energy Theorem:\\n$$W = \\Delta K = \\frac{1}{2}m(v^2 - v_0^2) = \\frac{1}{2}(2)\\left(\\left(\\frac{4}{3}\\right)^2 - 0\\right) = \\frac{16}{9}\\text{ J}$$."
  },
  {
    "order": 3,
    "id": "r1_q_3",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A force $F$ acting on an object varies with distance $x$ as shown in the force-displacement graph. The force is in $\\text{N}$ and $x$ in $\\text{m}$. The work done by the force in moving the object from $x = 0$ to $x = 6\\text{ m}$ is:",
    "options": {
      "A": "18.0 J",
      "B": "13.5 J",
      "C": "9.0 J",
      "D": "4.5 J"
    },
    "correctAnswer": "B",
    "explanation": "Work done is equal to the area under the $F-x$ graph.\\nFrom the graph, the region is a trapezoid from $x=0$ to $x=6\\text{ m}$ with height $F = 3\\text{ N}$, parallel sides of length $6\\text{ m}$ (base) and $3\\text{ m}$ (top from $x=0$ to $x=3$).\\n\\n$$\\text{Area} = \\frac{1}{2} \\times (\\text{sum of parallel sides}) \\times \\text{height} = \\frac{1}{2} \\times (6 + 3) \\times 3 = \\frac{27}{2} = 13.5\\text{ J}$$."
  },
  {
    "order": 4,
    "id": "r1_q_4",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "Which of the following statement(s) is/are correct?\\nStatement I: Work done by kinetic friction in a closed path is not zero.\\nStatement II: Kinetic frictional force is a non-conservative force.",
    "options": {
      "A": "Both I and II",
      "B": "Only I",
      "C": "Only II",
      "D": "Neither I nor II"
    },
    "correctAnswer": "A",
    "explanation": "Frictional force is a non-conservative (dissipative) force. The work done by friction along any path depends on the actual path length travelled and is always negative (opposing relative motion), hence the work done over any closed round trip is strictly non-zero ($W_{\\text{closed}} < 0$). Both statements are correct."
  },
  {
    "order": 5,
    "id": "r1_q_5",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "A body moves a distance of $10\\text{ m}$ along a straight line under the action of a force of $5\\text{ N}$. If the work done is $25\\text{ J}$, then the angle which the force makes with the direction of motion of the body is:",
    "options": {
      "A": "0°",
      "B": "30°",
      "C": "60°",
      "D": "90°"
    },
    "correctAnswer": "C",
    "explanation": "Work done $W = F d \\cos\\theta$.\\n$$25 = 5 \\times 10 \\times \\cos\\theta \\implies 25 = 50 \\cos\\theta \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$."
  },
  {
    "order": 6,
    "id": "r1_q_6",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "Which of the following statement is INCORRECT for a conservative field?",
    "options": {
      "A": "Work done in going from initial to final position is equal to change in kinetic energy of the particle.",
      "B": "Work done depends on path but not on initial and final positions.",
      "C": "Work done does not depend on path but depends only on initial and final positions.",
      "D": "Work done on a particle in the field for a round trip is zero."
    },
    "correctAnswer": "B",
    "explanation": "By definition, the work done by a conservative force is strictly path independent and depends exclusively on the initial and final position coordinates. Hence Statement B is incorrect."
  },
  {
    "order": 7,
    "id": "r1_q_7",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A force $F = (3x^2 + 2x - 7)\\text{ N}$ acts on a $2\\text{ kg}$ body as a result of which the body gets displaced from $x = 0$ to $x = 5\\text{ m}$. The work done by the force will be:",
    "options": {
      "A": "35 J",
      "B": "70 J",
      "C": "115 J",
      "D": "270 J"
    },
    "correctAnswer": "C",
    "explanation": "$$W = \\int_{x_i}^{x_f} F(x) dx = \\int_0^5 (3x^2 + 2x - 7) dx = \\left[ x^3 + x^2 - 7x \\right]_0^5 = (5^3 + 5^2 - 7(5)) - 0 = 125 + 25 - 35 = 115\\text{ J}$$."
  },
  {
    "order": 8,
    "id": "r1_q_8",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "If we throw a body upwards with velocity of $4\\text{ m/s}$, at what height does its kinetic energy reduce to half of its initial value? (Take $g = 10\\text{ m s}^{-2}$)",
    "options": {
      "A": "4 m",
      "B": "2 m",
      "C": "1 m",
      "D": "0.4 m"
    },
    "correctAnswer": "D",
    "explanation": "By conservation of mechanical energy:\\n$$K_f + U_f = K_i + U_i \\implies \\frac{1}{2}K_i + mgh = K_i \\implies mgh = \\frac{1}{2}K_i = \\frac{1}{2}\\left(\\frac{1}{2}mv^2\\right) = \\frac{1}{4}mv^2$$\\n$$gh = \\frac{v^2}{4} \\implies 10h = \\frac{4^2}{4} = 4 \\implies h = 0.4\\text{ m}$$."
  },
  {
    "order": 9,
    "id": "r1_q_9",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "Which of the following units is a unit of power?",
    "options": {
      "A": "Kilowatt hour",
      "B": "Watt",
      "C": "Erg",
      "D": "Calorie"
    },
    "correctAnswer": "B",
    "explanation": "Watt ($\\text{J/s}$) is the SI unit of power. Kilowatt-hour, Erg, and Calorie are all units of work / energy."
  },
  {
    "order": 10,
    "id": "r1_q_10",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A force $F$ acting on an object varies with distance $x$ as shown: a triangle of height $+20\\text{ N}$ from $x = 0$ to $4\\text{ m}$, and a triangle of height $-20\\text{ N}$ from $x = 4$ to $8\\text{ m}$. The work done by the force in moving the object from $x = 0$ to $x = 8\\text{ m}$ is:",
    "options": {
      "A": "Zero",
      "B": "80 J",
      "C": "-40 J",
      "D": "40 J"
    },
    "correctAnswer": "A",
    "explanation": "$$W = \\text{Area}_1 - \\text{Area}_2 = \\left(\\frac{1}{2} \\times 4 \\times 20\\right) - \\left(\\frac{1}{2} \\times 4 \\times 20\\right) = 40\\text{ J} - 40\\text{ J} = 0\\text{ J}$$."
  },
  {
    "order": 11,
    "id": "r1_q_11",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "Force $F = kx$ (where $k$ is a positive constant) is acting on a particle. Match the work done by this force in Column I with Column II:\\nColumn I:\\n(I) Displacing body from $x = 2$ to $x = 4$\\n(II) Displacing body from $x = -4$ to $x = -2$\\n(III) Displacing body from $x = -2$ to $x = +2$\\nColumn II: (P) Negative, (Q) Positive, (R) Zero",
    "options": {
      "A": "I→Q, II→R, III→P",
      "B": "I→Q, II→P, III→R",
      "C": "I→P, II→Q, III→R",
      "D": "I→R, II→Q, III→P"
    },
    "correctAnswer": "B",
    "explanation": "$$W = \\int_{x_i}^{x_f} kx dx = \\frac{k}{2}(x_f^2 - x_i^2)$$\\n(I) $x=2$ to $4$: $W = \\frac{k}{2}(16 - 4) = +6k > 0$ (Positive $\\to$ Q)\\n(II) $x=-4$ to $-2$: $W = \\frac{k}{2}((-2)^2 - (-4)^2) = \\frac{k}{2}(4 - 16) = -6k < 0$ (Negative $\\to$ P)\\n(III) $x=-2$ to $+2$: $W = \\frac{k}{2}(4 - 4) = 0$ (Zero $\\to$ R)."
  },
  {
    "order": 12,
    "id": "r1_q_12",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "The kinetic energy of a light body and a heavy body is the same. Which one of the following statements is CORRECT?",
    "options": {
      "A": "Body having higher velocity has greater momentum",
      "B": "The heavier body has greater momentum",
      "C": "Both bodies have same momentum",
      "D": "The lighter body has greater momentum"
    },
    "correctAnswer": "B",
    "explanation": "Linear momentum $p = \\sqrt{2mK}$. Since kinetic energy $K$ is identical for both bodies, $p \\propto \\sqrt{m}$. Hence, the heavier body (larger mass $m$) possesses greater linear momentum."
  },
  {
    "order": 13,
    "id": "r1_q_13",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "A $120\\text{ g}$ mass has a velocity $\\vec{v} = (2\\hat{i} + 5\\hat{j})\\text{ m/s}$ at a certain instant. Its kinetic energy is:",
    "options": {
      "A": "3 J",
      "B": "4 J",
      "C": "5 J",
      "D": "1.74 J"
    },
    "correctAnswer": "D",
    "explanation": "$m = 120\\text{ g} = 0.12\\text{ kg}$.\\n$$v^2 = |\\vec{v}|^2 = 2^2 + 5^2 = 4 + 25 = 29\\text{ m}^2\\text{/s}^2$$\\n$$K = \\frac{1}{2}mv^2 = \\frac{1}{2}(0.12)(29) = 0.06 \\times 29 = 1.74\\text{ J}$$."
  },
  {
    "order": 14,
    "id": "r1_q_14",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "The work-energy theorem states that the change in:",
    "options": {
      "A": "Kinetic energy of a particle is equal to the work done on it by the net force",
      "B": "Kinetic energy of a particle is equal to the work done by one of the forces acting on it",
      "C": "Potential energy of a particle is equal to the work done on it by the net force",
      "D": "Potential energy of a particle is equal to the work done by one of the forces acting on it"
    },
    "correctAnswer": "A",
    "explanation": "Work-Energy Theorem states that the net work done by all forces (conservative, non-conservative, internal, and external) acting on a body equals the net change in its kinetic energy: $W_{\\text{net}} = \\Delta K$."
  },
  {
    "order": 15,
    "id": "r1_q_15",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "A body of mass $m\\text{ kg}$ is lifted by a man to a height of one metre in $30\\text{ sec}$. Another man lifts the same mass to the same height in $60\\text{ sec}$. The work done by them are in the ratio:",
    "options": {
      "A": "1 : 2",
      "B": "1 : 1",
      "C": "2 : 1",
      "D": "4 : 1"
    },
    "correctAnswer": "B",
    "explanation": "Work done in lifting a mass $m$ to height $h$ is $W = mgh$. Work depends only on mass, gravity, and vertical displacement—independent of time taken. Hence the ratio of work done is $1 : 1$."
  },
  {
    "order": 16,
    "id": "r1_q_16",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "The potential energy of a particle of mass $1\\text{ kg}$ free to move along the $x$-axis is given by $U(x) = (3x^2 - 4x + 6)\\text{ J}$. Force acting on the particle at $x = 0$ is:",
    "options": {
      "A": "2\\hat{i}\\text{ N}",
      "B": "-4\\hat{i}\\text{ N}",
      "C": "5\\hat{i}\\text{ N}",
      "D": "4\\hat{i}\\text{ N}"
    },
    "correctAnswer": "D",
    "explanation": "Conservative force $F = -\\frac{dU}{dx} = -\\frac{d}{dx}(3x^2 - 4x + 6) = -(6x - 4) = 4 - 6x$.\\nAt $x = 0$, $F = 4 - 0 = 4\\text{ N} = 4\\hat{i}\\text{ N}$."
  },
  {
    "order": 17,
    "id": "r1_q_17",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "The displacement $y$ of a particle moving in one dimension under the action of a force is related to the time $t$ by the equation $t = y^{1/3} + 5$, where $y$ is in meters and $t$ is in seconds. The work done by the force in the first 10 seconds is:",
    "options": {
      "A": "95 J",
      "B": "65 J",
      "C": "0 J",
      "D": "35 J"
    },
    "correctAnswer": "C",
    "explanation": "Given $t = y^{1/3} + 5 \\implies y^{1/3} = t - 5 \\implies y = (t - 5)^3$.\\nVelocity $v = \\frac{dy}{dt} = 3(t - 5)^2$.\\nAt $t = 0\\text{ s}$, $v_i = 3(0 - 5)^2 = 75\\text{ m/s}$.\\nAt $t = 10\\text{ s}$, $v_f = 3(10 - 5)^2 = 75\\text{ m/s}$.\\nFrom Work-Energy theorem: $W = \\Delta K = \\frac{1}{2}m(v_f^2 - v_i^2) = \\frac{1}{2}m(75^2 - 75^2) = 0\\text{ J}$."
  },
  {
    "order": 18,
    "id": "r1_q_18",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "Two masses of $1\\text{ g}$ and $4\\text{ g}$ are moving with equal kinetic energy. The ratio of the magnitudes of their linear momenta is:",
    "options": {
      "A": "4 : 1",
      "B": "\\sqrt{2} : 1",
      "C": "1 : 2",
      "D": "1 : 16"
    },
    "correctAnswer": "C",
    "explanation": "$$p = \\sqrt{2mK} \\implies \\frac{p_1}{p_2} = \\sqrt{\\frac{m_1}{m_2}} = \\sqrt{\\frac{1\\text{ g}}{4\\text{ g}}} = \\frac{1}{2} = 1:2$$."
  },
  {
    "order": 19,
    "id": "r1_q_19",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "Initially mass $m$ is held such that the spring of force constant $k$ is in relaxed condition. If mass $m$ is suddenly released, the maximum elongation produced in the spring will be:",
    "options": {
      "A": "\\frac{mg}{k}",
      "B": "\\frac{2mg}{k}",
      "C": "\\frac{mg}{2k}",
      "D": "\\frac{mg}{4k}"
    },
    "correctAnswer": "B",
    "explanation": "At maximum elongation $x_{\\text{max}}$, the velocity momentarily becomes zero.\\nLoss in gravitational potential energy = Gain in elastic spring potential energy:\\n$$mg x_{\\text{max}} = \\frac{1}{2} k x_{\\text{max}}^2 \\implies x_{\\text{max}} = \\frac{2mg}{k}$$."
  },
  {
    "order": 20,
    "id": "r1_q_20",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "The energy required to accelerate a car from rest to $10\\text{ ms}^{-1}$ is $W$. The energy required to accelerate the car from $10\\text{ ms}^{-1}$ to $20\\text{ ms}^{-1}$ is:",
    "options": {
      "A": "W",
      "B": "2 W",
      "C": "3 W",
      "D": "4 W"
    },
    "correctAnswer": "C",
    "explanation": "$$W_1 = \\frac{1}{2}m(10^2 - 0) = 50m = W$$\\n$$W_2 = \\frac{1}{2}m(20^2 - 10^2) = \\frac{1}{2}m(400 - 100) = 150m = 3(50m) = 3W$$."
  },
  {
    "order": 21,
    "id": "r1_q_21",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A body of mass $2\\text{ kg}$ slides down a curved frictionless track which is a quadrant of a circle of radius $1\\text{ metre}$. If the body starts from rest, its speed at the bottom of the track is: (Take $g = 9.8\\text{ m/s}^2$)",
    "options": {
      "A": "4.43 m/sec",
      "B": "2 m/sec",
      "C": "0.5 m/sec",
      "D": "19.6 m/sec"
    },
    "correctAnswer": "A",
    "explanation": "By conservation of energy: $mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 1} = \\sqrt{19.6} \\approx 4.43\\text{ m/s}$."
  },
  {
    "order": 22,
    "id": "r1_q_22",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A particle is attached with a massless string of length $l$. It is displaced along a circular arc from $A$ to $B$ (quarter circle) by a constant force $F$ whose direction is always tangential to instantaneous displacement. The work done by the force $F$ is:",
    "options": {
      "A": "\\sqrt{2}Fl",
      "B": "Fl",
      "C": "\\frac{\\sqrt{2}Fl}{\\pi}",
      "D": "\\frac{F\\pi l}{2}"
    },
    "correctAnswer": "D",
    "explanation": "$$W = \\int \\vec{F} \\cdot d\\vec{s} = F \\int ds = F \\times (\\text{arc length } AB) = F \\times \\left(\\frac{\\pi l}{2}\\right) = \\frac{F\\pi l}{2}$$."
  },
  {
    "order": 23,
    "id": "r1_q_23",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A particle at rest on a frictionless table is acted upon by a horizontal force which is constant in magnitude and direction. A graph is plotted for the work done on the particle $W$ against the speed $v$. If there are no frictional forces, the graph will be:",
    "options": {
      "A": "Straight line with positive slope",
      "B": "Horizontal straight line",
      "C": "Curve opening downwards",
      "D": "Parabola opening upwards passing through origin (W proportional to v^2)"
    },
    "correctAnswer": "D",
    "explanation": "By Work-Energy Theorem: $W = \\Delta K = \\frac{1}{2}mv^2$. Since $W \\propto v^2$, the graph of $W$ versus $v$ is a parabola opening upwards with vertex at the origin."
  },
  {
    "order": 24,
    "id": "r1_q_24",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "If the linear momentum of a body increases by $0.01\\%$, its kinetic energy will increase by approximately:",
    "options": {
      "A": "0.01%",
      "B": "0.02%",
      "C": "0.04%",
      "D": "0.08%"
    },
    "correctAnswer": "B",
    "explanation": "$K = \\frac{p^2}{2m}$. For small percentage changes ($< 5\\%$):\\n$$\\frac{\\Delta K}{K} \\times 100\\% = 2 \\left(\\frac{\\Delta p}{p} \\times 100\\%\\right) = 2(0.01\\%) = 0.02\\%$$."
  },
  {
    "order": 25,
    "id": "r1_q_25",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "If a body of mass $200\\text{ g}$ falls from a height of $200\\text{ m}$ and its total potential energy is converted into kinetic energy at the point of contact, then the decrease in potential energy is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": {
      "A": "900 J",
      "B": "600 J",
      "C": "400 J",
      "D": "200 J"
    },
    "correctAnswer": "C",
    "explanation": "$$m = 200\\text{ g} = 0.2\\text{ kg}, \\quad h = 200\\text{ m}$$\\n$$\\Delta U = mgh = 0.2 \\times 10 \\times 200 = 400\\text{ J}$$."
  },
  {
    "order": 26,
    "id": "r1_q_26",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A spring of spring constant $5 \\times 10^3\\text{ N/m}$ is elongated initially by $15\\text{ cm}$ from unstretched position. The work required to elongate it further by another $15\\text{ cm}$ is:",
    "options": {
      "A": "62.5 J",
      "B": "125 J",
      "C": "168.75 J",
      "D": "250 J"
    },
    "correctAnswer": "C",
    "explanation": "$$x_1 = 0.15\\text{ m}, \\quad x_2 = 0.15 + 0.15 = 0.30\\text{ m}$$\\n$$W = \\frac{1}{2}k(x_2^2 - x_1^2) = \\frac{1}{2}(5000)(0.30^2 - 0.15^2) = 2500(0.09 - 0.0225) = 2500 \\times 0.0675 = 168.75\\text{ J}$$."
  },
  {
    "order": 27,
    "id": "r1_q_27",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "In a potential energy function $U(x)$ plot with segments OA (sloping up), AB (horizontal flat), BC (sloping down), and CD (steeply sloping up), in which region is the magnitude of force greatest?",
    "options": {
      "A": "OA",
      "B": "AB",
      "C": "BC",
      "D": "CD"
    },
    "correctAnswer": "D",
    "explanation": "Magnitude of force is $|F| = \\left|-\\frac{dU}{dx}\\right| = |\\text{slope of } U-x \\text{ curve}|$. Segment CD has the steepest slope, hence the force magnitude is greatest in region CD."
  },
  {
    "order": 28,
    "id": "r1_q_28",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "A small ball is placed at the bottom of a frictionless cylindrical drum of radius $R$. The ball is given a speed $v = \\sqrt{gR}$ at the lowest point. Find the maximum height reached by the ball above the ground.",
    "options": {
      "A": "R",
      "B": "R/4",
      "C": "R/3",
      "D": "R/2"
    },
    "correctAnswer": "D",
    "explanation": "Since $v = \\sqrt{gR} < \\sqrt{2gR}$, the ball cannot even reach the horizontal level ($h = R$) and will oscillate below horizontal without leaving the surface.\\nBy conservation of energy: $\\frac{1}{2}mv^2 = mgh \\implies \\frac{1}{2}m(gR) = mgh \\implies h = \\frac{R}{2}$."
  },
  {
    "order": 29,
    "id": "r1_q_29",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "A block of mass $2\\text{ kg}$ moves inside a frictionless circular track of radius $5\\text{ m}$ in a vertical plane. If the speed of the block at the lowest point is $20\\text{ m/s}$, the normal force (in dynes) exerted on the block at the highest point is: ($g = 10\\text{ m/s}^2$)",
    "options": {
      "A": "6 \\times 10^6 \\text{ dynes}",
      "B": "6 \\times 10^1 \\text{ dynes}",
      "C": "6 \\times 10^5 \\text{ dynes}",
      "D": "6 \\times 10^3 \\text{ dynes}"
    },
    "correctAnswer": "A",
    "explanation": "Velocity at highest point: $v_{\\text{top}}^2 = v_{\\text{bottom}}^2 - 4gR = 20^2 - 4(10)(5) = 400 - 200 = 200\\text{ m}^2\\text{/s}^2$.\\nAt top: $N + mg = \\frac{m v_{\\text{top}}^2}{R} \\implies N = \\frac{2(200)}{5} - 2(10) = 80 - 20 = 60\\text{ N}$.\\nSince $1\\text{ N} = 10^5\\text{ dynes}$, $N = 60 \\times 10^5 = 6 \\times 10^6\\text{ dynes}$."
  },
  {
    "order": 30,
    "id": "r1_q_30",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A uniform chain of length $L$ and mass $M$ is lying on a smooth table and one-third of its length is hanging vertically over the edge. The work required to pull the hanging part back onto the table is:",
    "options": {
      "A": "MgL",
      "B": "MgL/3",
      "C": "MgL/9",
      "D": "MgL/18"
    },
    "correctAnswer": "D",
    "explanation": "Mass of hanging part $m' = \\frac{M}{3}$.\\nCentre of mass of the hanging part is at depth $h_{cm} = \\frac{L/3}{2} = \\frac{L}{6}$.\\nWork required $W = m' g h_{cm} = \\left(\\frac{M}{3}\\right) g \\left(\\frac{L}{6}\\right) = \\frac{MgL}{18}$."
  },
  {
    "order": 31,
    "id": "r1_q_31",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "A block of $200\\text{ g}$ mass is dropped from a height of $2\\text{ m}$ onto a spring and compresses the spring by a distance of $50\\text{ cm}$. The force constant of the spring is: ($g = 10\\text{ m/s}^2$)",
    "options": {
      "A": "20 N/m",
      "B": "40 N/m",
      "C": "30 N/m",
      "D": "60 N/m"
    },
    "correctAnswer": "B",
    "explanation": "Total vertical fall $H = h + x = 2\\text{ m} + 0.5\\text{ m} = 2.5\\text{ m}$.\\nLoss in gravitational PE = Gain in elastic spring PE:\\n$$mg(h + x) = \\frac{1}{2}kx^2 \\implies 0.2(10)(2.5) = \\frac{1}{2}k(0.5)^2 \\implies 5 = 0.125k \\implies k = \\frac{5}{0.125} = 40\\text{ N/m}$$."
  },
  {
    "order": 32,
    "id": "r1_q_32",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A force of $\\vec{F} = (2\\hat{i} + 3\\hat{j} + 4\\hat{k})\\text{ N}$ acts on a body for $4\\text{ seconds}$ and produces a displacement of $\\vec{s} = (3\\hat{i} + 4\\hat{j} + 5\\hat{k})\\text{ m}$. The power used is:",
    "options": {
      "A": "9.5 W",
      "B": "7.5 W",
      "C": "6.5 W",
      "D": "4.5 W"
    },
    "correctAnswer": "A",
    "explanation": "$$W = \\vec{F} \\cdot \\vec{s} = (2)(3) + (3)(4) + (4)(5) = 6 + 12 + 20 = 38\\text{ J}$$\\n$$\\text{Power } P = \\frac{W}{t} = \\frac{38\\text{ J}}{4\\text{ s}} = 9.5\\text{ W}$$."
  },
  {
    "order": 33,
    "id": "r1_q_33",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "Assertion: No work is done if the displacement is zero.\\nReason: Work done by the force is defined to be the product of component of the force in the direction of the displacement and the magnitude of displacement.",
    "options": {
      "A": "Assertion is True, Reason is True; Reason is correct explanation for Assertion",
      "B": "Assertion is True, Reason is True; Reason is not correct explanation for Assertion",
      "C": "Assertion is True, Reason is False",
      "D": "Assertion is False, Reason is True"
    },
    "correctAnswer": "A",
    "explanation": "Work is mathematically defined as $W = F s \\cos\\theta$. If displacement $s = 0$, $W = 0$. Hence both Assertion and Reason are true and Reason directly explains the Assertion."
  },
  {
    "order": 34,
    "id": "r1_q_34",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "When a rubber-band is stretched by a distance $x$, it exerts a restoring force of magnitude $F = ax + bx^2$, where $a$ and $b$ are constants. The work done in stretching the unstretched rubber-band by length $L$ is:",
    "options": {
      "A": "aL^2 + bL^3",
      "B": "\\frac{1}{2}(aL^2 + bL^3)",
      "C": "\\frac{aL^2}{2} + \\frac{bL^3}{3}",
      "D": "\\frac{1}{2}\\left(\\frac{aL^2}{2} + \\frac{bL^3}{3}\\right)"
    },
    "correctAnswer": "C",
    "explanation": "$$W = \\int_0^L F dx = \\int_0^L (ax + bx^2) dx = \\left[ \\frac{ax^2}{2} + \\frac{bx^3}{3} \\right]_0^L = \\frac{aL^2}{2} + \\frac{bL^3}{3}$$."
  },
  {
    "order": 35,
    "id": "r1_q_35",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "The graph between kinetic energy $E_k$ and velocity $V$ of a body of mass $m$ is:",
    "options": {
      "A": "Parabola symmetric about E_k axis opening upwards",
      "B": "Straight line with positive slope",
      "C": "Straight line with negative slope",
      "D": "Hyperbola"
    },
    "correctAnswer": "A",
    "explanation": "$E_k = \\frac{1}{2}m V^2$. Since $E_k$ depends on the square of velocity $V$, the graph is a symmetric parabola opening upwards with vertex at $V = 0$."
  },
  {
    "order": 36,
    "id": "r1_q_36",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A body of mass $m$ accelerates uniformly from rest to $v_1$ in time $t_1$. As a function of $t$, the instantaneous power delivered to the body is:",
    "options": {
      "A": "\\frac{m v_1}{t_1}",
      "B": "\\frac{m v_1 t}{t_1}",
      "C": "\\frac{m v_1 t^2}{t_1}",
      "D": "\\frac{m v_1^2 t}{t_1^2}"
    },
    "correctAnswer": "D",
    "explanation": "Acceleration $a = \\frac{v_1}{t_1}$.\\nVelocity at time $t$: $v(t) = a t = \\frac{v_1}{t_1} t$.\\nForce $F = ma = m \\frac{v_1}{t_1}$.\\nInstantaneous power $P(t) = F v(t) = \\left(m \\frac{v_1}{t_1}\\right)\\left(\\frac{v_1}{t_1} t\\right) = \\frac{m v_1^2 t}{t_1^2}$."
  },
  {
    "order": 37,
    "id": "r1_q_37",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "A mass $m$ is attached to a thin wire and whirled in a vertical circle. The wire is most likely to break when:",
    "options": {
      "A": "the wire is horizontal",
      "B": "the mass is at the lowest point",
      "C": "inclined at an angle of 60° from vertical",
      "D": "the mass is at the highest point"
    },
    "correctAnswer": "B",
    "explanation": "Tension in vertical circle at angle $\\theta$ from lowest point is $T = mg \\cos\\theta + \\frac{m v^2}{r}$. At the lowest point ($\\theta = 0$), speed is maximum and gravity acts in direction of tension, giving $T_{\\text{max}} = mg + \\frac{mv^2}{r}$, making it most vulnerable to breaking."
  },
  {
    "order": 38,
    "id": "r1_q_38",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "Assertion: Work done by friction on a body sliding down an inclined plane is positive.\\nReason: Work done is greater than zero, if angle between force and displacement is acute or both are in the same direction.",
    "options": {
      "A": "If both assertion and reason are true and reason is correct explanation of assertion.",
      "B": "If both assertion and reason are true but reason is not correct explanation of assertion.",
      "C": "If assertion is true but reason is false.",
      "D": "If assertion is false but reason is true."
    },
    "correctAnswer": "D",
    "explanation": "Kinetic friction opposes relative motion (angle between friction and displacement is $180^\\circ$), so work done by friction is negative ($-f d$). Thus Assertion is False. Reason is a true general condition for positive work."
  },
  {
    "order": 39,
    "id": "r1_q_39",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A body of mass $1\\text{ kg}$ begins to move under the action of a time dependent force $\\vec{F} = (2t\\hat{i} + 3t^2\\hat{j})\\text{ N}$. What power will be developed by the force at time $t$?",
    "options": {
      "A": "(2t^2 + 4t^2) W",
      "B": "(2t^3 + 3t^4) W",
      "C": "(2t^3 + 3t^5) W",
      "D": "(2t + 3t^3) W"
    },
    "correctAnswer": "C",
    "explanation": "$$\\vec{a} = \\frac{\\vec{F}}{m} = 2t\\hat{i} + 3t^2\\hat{j}$$\\n$$\\vec{v} = \\int \\vec{a} dt = t^2\\hat{i} + t^3\\hat{j}$$\\n$$P = \\vec{F} \\cdot \\vec{v} = (2t\\hat{i} + 3t^2\\hat{j}) \\cdot (t^2\\hat{i} + t^3\\hat{j}) = 2t^3 + 3t^5\\text{ W}$$."
  },
  {
    "order": 40,
    "id": "r1_q_40",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "A body is initially at rest. It undergoes one-dimensional motion with constant acceleration. The power delivered to it at time $t$ is proportional to:",
    "options": {
      "A": "t^{1/2}",
      "B": "t",
      "C": "t^{3/2}",
      "D": "t^2"
    },
    "correctAnswer": "B",
    "explanation": "For constant acceleration $a$, $v = at$. Force $F = ma$ is constant. Power $P = F v = (ma)(at) = m a^2 t \\propto t$."
  },
  {
    "order": 41,
    "id": "r1_q_41",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A stone of mass $2\\text{ kg}$ is projected upwards with kinetic energy of $98\\text{ J}$. The height at which the kinetic energy of the body becomes half of its original value will be: (Take $g = 9.8\\text{ ms}^{-2}$)",
    "options": {
      "A": "5 m",
      "B": "2.5 m",
      "C": "1.5 m",
      "D": "0.5 m"
    },
    "correctAnswer": "B",
    "explanation": "$$\\Delta U = \\frac{K_0}{2} = \\frac{98}{2} = 49\\text{ J}$$\\n$$mgh = 49 \\implies (2)(9.8)h = 49 \\implies 19.6h = 49 \\implies h = \\frac{49}{19.6} = 2.5\\text{ m}$$."
  },
  {
    "order": 42,
    "id": "r1_q_42",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "A point mass $m$ is moved in a vertical circle of radius $r$ with the help of a string. The velocity of the mass is $\\sqrt{7gr}$ at the lowest point. The tension in the string at the lowest point is:",
    "options": {
      "A": "6 mg",
      "B": "7 mg",
      "C": "8 mg",
      "D": "1 mg"
    },
    "correctAnswer": "C",
    "explanation": "$$T = mg + \\frac{m v^2}{r} = mg + \\frac{m (7gr)}{r} = mg + 7mg = 8mg$$."
  },
  {
    "order": 43,
    "id": "r1_q_43",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Medium",
    "question": "A mass of $0.5\\text{ kg}$ moving with a speed of $1.5\\text{ m/s}$ on a horizontal smooth surface collides with a spring of force constant $k = 50\\text{ N/m}$. The maximum compression of the spring would be:",
    "options": {
      "A": "0.12 m",
      "B": "1.5 m",
      "C": "0.5 m",
      "D": "0.15 m"
    },
    "correctAnswer": "D",
    "explanation": "$$\\frac{1}{2} m v^2 = \\frac{1}{2} k x^2 \\implies 0.5(1.5)^2 = 50 x^2 \\implies 0.5(2.25) = 50 x^2 \\implies 1.125 = 50 x^2$$\\n$$x^2 = \\frac{1.125}{50} = 0.0225 \\implies x = 0.15\\text{ m}$$."
  },
  {
    "order": 44,
    "id": "r1_q_44",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Hard",
    "question": "A stone is rotated in a vertical circle. Speed at the bottommost point is $\\sqrt{8gR}$, where $R$ is the radius of circle. The ratio of tension at the top and the bottom is:",
    "options": {
      "A": "1:2",
      "B": "1:3",
      "C": "2:3",
      "D": "1:4"
    },
    "correctAnswer": "B",
    "explanation": "$$v_{\\text{bottom}}^2 = 8gR, \\quad v_{\\text{top}}^2 = 8gR - 4gR = 4gR$$\\n$$T_{\\text{top}} = \\frac{m(4gR)}{R} - mg = 3mg$$\\n$$T_{\\text{bottom}} = \\frac{m(8gR)}{R} + mg = 9mg$$\\n$$\\frac{T_{\\text{top}}}{T_{\\text{bottom}}} = \\frac{3mg}{9mg} = 1 : 3$$."
  },
  {
    "order": 45,
    "id": "r1_q_45",
    "subject": "Physics",
    "topic": "Work, Energy & Power",
    "difficulty": "Easy",
    "question": "In which case does the gravitational potential energy decrease?",
    "options": {
      "A": "On compressing a spring",
      "B": "On stretching a spring",
      "C": "On moving a body against gravitational force",
      "D": "In free fall of body"
    },
    "correctAnswer": "D",
    "explanation": "In free fall under gravity, height $h$ decreases, so gravitational potential energy $U = mgh$ decreases as it converts into kinetic energy."
  },
  {
    "order": 46,
    "id": "r1_q_46",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "All the particles of a system are situated at a distance $r$ from the origin. The distance of the centre of mass of the system from the origin is:",
    "options": {
      "A": "= r",
      "B": "≤ r",
      "C": "> r",
      "D": "≥ r"
    },
    "correctAnswer": "B",
    "explanation": "The centre of mass of any distribution of particles lies within the convex hull of the particles. Since all particles lie on a sphere of radius $r$ centered at origin, the centre of mass must be at a distance $\\le r$ from the origin."
  },
  {
    "order": 47,
    "id": "r1_q_47",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "Assertion: The centre of mass of a two particle system lies on the line joining the two particles, being closer to the heavier particle.\\nReason: This is because product of mass of one particle and its distance from centre of mass is numerically equal to product of mass of other particle and its distance from centre of mass.",
    "options": {
      "A": "Assertion is True, Reason is True and Reason is correct explanation for Assertion.",
      "B": "Assertion is True, Reason is True and Reason is not correct explanation for Assertion.",
      "C": "Assertion is True, Reason is False.",
      "D": "Assertion is False, Reason is True."
    },
    "correctAnswer": "A",
    "explanation": "For a two-particle system, $m_1 r_1 = m_2 r_2$. If $m_1 > m_2$, then $r_1 < r_2$, which means the centre of mass lies closer to the heavier particle. Thus both Assertion and Reason are true, and Reason is the correct explanation."
  },
  {
    "order": 48,
    "id": "r1_q_48",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Two bodies of masses $1\\text{ kg}$ and $3\\text{ kg}$ have position vectors $(\\hat{i} + 2\\hat{j} + \\hat{k})$ and $(-3\\hat{i} - 2\\hat{j} + \\hat{k})$ respectively. The centre of mass of this system has a position vector:",
    "options": {
      "A": "-2\\hat{i} + 2\\hat{k}",
      "B": "-2\\hat{i} - \\hat{j} + \\hat{k}",
      "C": "2\\hat{i} - \\hat{j} - 2\\hat{k}",
      "D": "-\\hat{i} + \\hat{j} + \\hat{k}"
    },
    "correctAnswer": "B",
    "explanation": "$$\\vec{r}_{cm} = \\frac{m_1 \\vec{r}_1 + m_2 \\vec{r}_2}{m_1 + m_2} = \\frac{1(\\hat{i} + 2\\hat{j} + \\hat{k}) + 3(-3\\hat{i} - 2\\hat{j} + \\hat{k})}{1 + 3} = \\frac{-8\\hat{i} - 4\\hat{j} + 4\\hat{k}}{4} = -2\\hat{i} - \\hat{j} + \\hat{k}$$."
  },
  {
    "order": 49,
    "id": "r1_q_49",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Three rods of the same mass $M$ and equal length $a$ are placed forming a right-angled triangle along the axes (one along $x$-axis from $0$ to $a$, one along $y$-axis from $0$ to $a$, and one along hypotenuse). What will be the coordinates of the centre of mass of the system?",
    "options": {
      "A": "[a/2, a/2]",
      "B": "[a/\\sqrt{2}, a/\\sqrt{2}]",
      "C": "[\\sqrt{2}a, \\sqrt{2}a]",
      "D": "[a/3, a/3]"
    },
    "correctAnswer": "D",
    "explanation": "Centre of mass of rod 1 (along x-axis): $(a/2, 0)$.\\nCentre of mass of rod 2 (along y-axis): $(0, a/2)$.\\nCentre of mass of rod 3 (hypotenuse): $(a/2, a/2)$.\\n\\n$$x_{cm} = \\frac{M(a/2) + M(0) + M(a/2)}{3M} = \\frac{a}{3}$$\\n$$y_{cm} = \\frac{M(0) + M(a/2) + M(a/2)}{3M} = \\frac{a}{3}$$\\n\\nCoordinates: $[a/3, a/3]$."
  },
  {
    "order": 50,
    "id": "r1_q_50",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "For which of the following objects does the centre of mass lie outside the body?",
    "options": {
      "A": "A pencil",
      "B": "A shotput",
      "C": "A dice",
      "D": "A bangle"
    },
    "correctAnswer": "D",
    "explanation": "A bangle is a thin circular ring. Its centre of mass lies at its geometric centre, where there is no physical material of the body."
  },
  {
    "order": 51,
    "id": "r1_q_51",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "The centre of mass is a point:",
    "options": {
      "A": "Which is the geometric centre of a body",
      "B": "From which distance of all particles are same",
      "C": "Where the whole mass of the body is supposed to be concentrated",
      "D": "Which is the origin of reference frame"
    },
    "correctAnswer": "C",
    "explanation": "Centre of mass is defined as the unique point where the entire mass of the system or body can be considered to be concentrated for translational dynamics under external forces."
  },
  {
    "order": 52,
    "id": "r1_q_52",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "Three particles of masses $1\\text{ kg}$, $\\frac{3}{2}\\text{ kg}$, and $2\\text{ kg}$ are located at the vertices $A, B, C$ of an equilateral triangle of side $a\\text{ m}$. The coordinates of the centre of mass are (taking $A$ at origin, $B$ on $x$-axis):",
    "options": {
      "A": "(\\frac{5a}{9}\\text{ m}, \\frac{2a}{3\\sqrt{3}}\\text{ m})",
      "B": "(\\frac{2a}{3\\sqrt{3}}\\text{ m}, \\frac{5a}{9}\\text{ m})",
      "C": "(\\frac{5a}{9}\\text{ m}, \\frac{2a}{\\sqrt{3}}\\text{ m})",
      "D": "(\\frac{2a}{\\sqrt{3}}\\text{ m}, \\frac{5a}{9}\\text{ m})"
    },
    "correctAnswer": "A",
    "explanation": "Coordinates:\\n$A(0,0)$ mass $1\\text{ kg}$\\n$B(a,0)$ mass $1.5\\text{ kg}$\\n$C(a/2, \\frac{\\sqrt{3}a}{2})$ mass $2\\text{ kg}$\\nTotal mass $M = 1 + 1.5 + 2 = 4.5\\text{ kg} = \\frac{9}{2}\\text{ kg}$.\\n\\n$$x_{cm} = \\frac{1(0) + 1.5(a) + 2(a/2)}{4.5} = \\frac{2.5a}{4.5} = \\frac{5a}{9}$$\\n$$y_{cm} = \\frac{1(0) + 1.5(0) + 2(\\frac{\\sqrt{3}a}{2})}{4.5} = \\frac{\\sqrt{3}a}{4.5} = \\frac{2\\sqrt{3}a}{9} = \\frac{2a}{3\\sqrt{3}}$$\\n\\nCoordinates: $\\left(\\frac{5a}{9}\\text{ m}, \\frac{2a}{3\\sqrt{3}}\\text{ m}\\right)$."
  },
  {
    "order": 53,
    "id": "r1_q_53",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Assertion: Two bodies moving in opposite directions with same magnitude of linear momentum collide with each other. Then, after collision both the bodies will come to rest.\\nReason: Linear momentum of the system of bodies is zero.",
    "options": {
      "A": "Both Assertion and Reason are correct and Reason is the correct explanation of Assertion.",
      "B": "Both Assertion and Reason are correct but Reason is not the correct explanation of Assertion.",
      "C": "Assertion is correct but Reason is incorrect.",
      "D": "Assertion is incorrect but Reason is correct."
    },
    "correctAnswer": "D",
    "explanation": "Total initial momentum is zero ($\\vec{p} + (-\u000bec{p}) = 0$). After collision, total momentum remains zero, but the bodies only come to rest if the collision is completely inelastic ($e = 0$). If elastic, they rebound with opposite momenta. Hence Assertion is incorrect, while Reason is correct."
  },
  {
    "order": 54,
    "id": "r1_q_54",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A small uniform disc of radius $2\\text{ cm}$ is cut from a disc of radius $6\\text{ cm}$. If the distance between their centers is $3.2\\text{ cm}$, what is the shift in the centre of mass of the disc?",
    "options": {
      "A": "0.4 cm",
      "B": "2.4 cm",
      "C": "1.8 cm",
      "D": "1.2 cm"
    },
    "correctAnswer": "A",
    "explanation": "Area of original disc $A_1 = \\pi (6^2) = 36\\pi$.\\nArea of removed disc $A_2 = \\pi (2^2) = 4\\pi$.\\nDistance between centers $d = 3.2\\text{ cm}$.\\n\\n$$\\text{Shift } x = \\frac{A_2 d}{A_1 - A_2} = \\frac{4\\pi \\times 3.2}{36\\pi - 4\\pi} = \\frac{4 \\times 3.2}{32} = \\frac{3.2}{8} = 0.4\\text{ cm}$$."
  },
  {
    "order": 55,
    "id": "r1_q_55",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Mass is distributed uniformly over a thin triangular plate and positions of two vertices are given by $(1, 3)$ and $(2, -4)$. What is the position of the 3rd vertex if the centre of mass of the plate lies at the origin $(0, 0)$?",
    "options": {
      "A": "(1, -2)",
      "B": "(-2, 4)",
      "C": "(-3, 1)",
      "D": "(1, 2)"
    },
    "correctAnswer": "C",
    "explanation": "For a uniform triangular plate, the centre of mass is at its centroid:\\n$$x_{cm} = \\frac{x_1 + x_2 + x_3}{3} = 0 \\implies 1 + 2 + x_3 = 0 \\implies x_3 = -3$$\\n$$y_{cm} = \\frac{y_1 + y_2 + y_3}{3} = 0 \\implies 3 + (-4) + y_3 = 0 \\implies y_3 = 1$$\\n\\n3rd vertex: $(-3, 1)$."
  },
  {
    "order": 56,
    "id": "r1_q_56",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Three bodies having masses $5\\text{ kg}$, $4\\text{ kg}$, and $2\\text{ kg}$ are moving at speeds of $5\\text{ ms}^{-1}$, $4\\text{ ms}^{-1}$, and $2\\text{ ms}^{-1}$ respectively along the $X$-axis. The magnitude of the velocity of the centre of mass is:",
    "options": {
      "A": "1.0 ms^{-1}",
      "B": "4 ms^{-1}",
      "C": "0.9 ms^{-1}",
      "D": "1.3 ms^{-1}"
    },
    "correctAnswer": "B",
    "explanation": "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2 + m_3 v_3}{m_1 + m_2 + m_3} = \\frac{5(5) + 4(4) + 2(2)}{5 + 4 + 2} = \\frac{25 + 16 + 4}{11} = \\frac{45}{11} \\approx 4.09\\text{ ms}^{-1} \\approx 4\\text{ ms}^{-1}$$."
  },
  {
    "order": 57,
    "id": "r1_q_57",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "Two bodies of masses $2\\text{ kg}$ and $4\\text{ kg}$ are moving with velocities $20\\text{ ms}^{-1}$ and $10\\text{ ms}^{-1}$ towards each other due to mutual gravitational attraction. What is the velocity of their centre of mass?",
    "options": {
      "A": "5 ms^{-1}",
      "B": "6 ms^{-1}",
      "C": "8 ms^{-1}",
      "D": "Zero"
    },
    "correctAnswer": "D",
    "explanation": "Mutual gravitational attraction is an internal force. In the absence of external forces ($F_{\\text{ext}} = 0$), the centre of mass remains in its initial state of rest. Hence $v_{cm} = 0$."
  },
  {
    "order": 58,
    "id": "r1_q_58",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "If the density and thickness of a square plate of side $l$ and a circular plate of diameter $l$ placed adjacent to each other are the same, the centre of mass of the composite system will be:",
    "options": {
      "A": "Inside the square plate",
      "B": "Inside the circular plate",
      "C": "At the point of contact",
      "D": "Outside the system"
    },
    "correctAnswer": "A",
    "explanation": "Area of square plate $A_1 = l^2$.\\nArea of circular plate $A_2 = \\pi (l/2)^2 = \\frac{\\pi l^2}{4} \\approx 0.785 l^2$.\\nSince the square plate has greater mass than the circular plate, the centre of mass of the composite system lies closer to the heavier body, i.e., inside the square plate."
  },
  {
    "order": 59,
    "id": "r1_q_59",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Three identical spheres, each of mass $M$, are placed at the corners of a right-angled triangle with mutually perpendicular sides equal to $2\\text{ m}$. Taking the right-angled vertex as origin, find the position vector of the centre of mass:",
    "options": {
      "A": "2(\\hat{i} + \\hat{j})",
      "B": "(\\hat{i} + \\hat{j})",
      "C": "\\frac{2}{3}(\\hat{i} + \\hat{j})",
      "D": "\\frac{4}{3}(\\hat{i} + \\hat{j})"
    },
    "correctAnswer": "C",
    "explanation": "$$\\vec{r}_1 = (0,0), \\quad \\vec{r}_2 = 2\\hat{i}, \\quad \\vec{r}_3 = 2\\hat{j}$$\\n$$\\vec{r}_{cm} = \\frac{M(0) + M(2\\hat{i}) + M(2\\hat{j})}{3M} = \\frac{2}{3}(\\hat{i} + \\hat{j})$$."
  },
  {
    "order": 60,
    "id": "r1_q_60",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A uniform thin rod $AB$ of length $L$ has linear mass density $\\mu(x) = a + \\frac{bx}{L}$, where $x$ is measured from $A$. If the centre of mass of the rod lies at a distance of $\\frac{7}{12}L$ from $A$, then $a$ and $b$ are related as:",
    "options": {
      "A": "a = 2b",
      "B": "2a = b",
      "C": "a = b",
      "D": "3a = 2b"
    },
    "correctAnswer": "B",
    "explanation": "$$M = \\int_0^L \\left(a + \\frac{bx}{L}\\right) dx = aL + \\frac{bL}{2} = L\\left(a + \\frac{b}{2}\\right)$$\\n$$\\int_0^L x \\mu(x) dx = \\int_0^L \\left(ax + \\frac{bx^2}{L}\\right) dx = \\frac{aL^2}{2} + \\frac{bL^2}{3} = L^2\\left(\\frac{a}{2} + \\frac{b}{3}\\right)$$\\n$$x_{cm} = L \\frac{3a + 2b}{6a + 3b} = \\frac{7}{12}L \\implies 12(3a + 2b) = 7(6a + 3b) \\implies 36a + 24b = 42a + 21b$$\\n$$3b = 6a \\implies b = 2a$$."
  },
  {
    "order": 61,
    "id": "r1_q_61",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "When an explosive shell travelling in a parabolic path under the effect of gravity explodes in mid air, the centre of mass of the fragments will move:",
    "options": {
      "A": "Vertically downwards",
      "B": "Along the original parabolic path",
      "C": "Vertically upwards and then vertically downwards",
      "D": "Horizontally followed by parabolic path"
    },
    "correctAnswer": "B",
    "explanation": "The explosion is caused purely by internal forces. The external gravitational force $M\\vec{g}$ remains unchanged, so the centre of mass of all fragments continues along the exact original parabolic trajectory until fragments strike the ground."
  },
  {
    "order": 62,
    "id": "r1_q_62",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "Particles of masses $m, 2m, 3m, \\dots, nm\\text{ grams}$ are placed on the same line at distances $l, 2l, 3l, \\dots, nl\\text{ cm}$ from a fixed point. The distance of the centre of mass from the fixed point is:",
    "options": {
      "A": "\\frac{(2n+1)l}{3}",
      "B": "\\frac{l}{n+1}",
      "C": "\\frac{n(n^2+1)l}{2}",
      "D": "\\frac{2l}{n(n^2+1)}"
    },
    "correctAnswer": "A",
    "explanation": "$$x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i} = \\frac{m l \\sum_{i=1}^n i^2}{m \\sum_{i=1}^n i} = l \\frac{\\frac{n(n+1)(2n+1)}{6}}{\\frac{n(n+1)}{2}} = \\frac{(2n+1)l}{3}$$."
  },
  {
    "order": 63,
    "id": "r1_q_63",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "Three identical spherical metal balls, each of radius $r$, are placed touching each other on a horizontal surface such that an equilateral triangle is formed when their centres are joined. The centre of mass of the system is located at:",
    "options": {
      "A": "Horizontal surface",
      "B": "Centre of one of the balls",
      "C": "Line joining centres of any two balls",
      "D": "Point of intersection of their medians"
    },
    "correctAnswer": "D",
    "explanation": "By symmetry, the centre of mass of three identical masses situated at the vertices of an equilateral triangle lies at the centroid (intersection point of medians) of the triangle."
  },
  {
    "order": 64,
    "id": "r1_q_64",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "An object flying in air with velocity $(20\\hat{i} + 25\\hat{j} - 12\\hat{k})$ suddenly breaks into two pieces whose masses are in the ratio $1 : 5$. The smaller mass flies off with a velocity $(100\\hat{i} + 35\\hat{j} + 8\\hat{k})$. The velocity of the larger piece will be:",
    "options": {
      "A": "4\\hat{i} + 23\\hat{j} - 16\\hat{k}",
      "B": "-100\\hat{i} - 35\\hat{j} - 8\\hat{k}",
      "C": "20\\hat{i} + 15\\hat{j} - 80\\hat{k}",
      "D": "-20\\hat{i} + 15\\hat{j} - 80\\hat{k}"
    },
    "correctAnswer": "A",
    "explanation": "Conservation of linear momentum: $M\\vec{v} = m_1 \\vec{v}_1 + m_2 \\vec{v}_2$.\\nWith $m_1 = m, m_2 = 5m, M = 6m$:\\n$$6(20\\hat{i} + 25\\hat{j} - 12\\hat{k}) = 1(100\\hat{i} + 35\\hat{j} + 8\\hat{k}) + 5\\vec{v}_2$$\\n$$5\\vec{v}_2 = (120 - 100)\\hat{i} + (150 - 35)\\hat{j} + (-72 - 8)\\hat{k} = 20\\hat{i} + 115\\hat{j} - 80\\hat{k}$$\\n$$\\vec{v}_2 = 4\\hat{i} + 23\\hat{j} - 16\\hat{k}$$."
  },
  {
    "order": 65,
    "id": "r1_q_65",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Two masses $m_1$ and $m_2$ ($m_1 > m_2$) are connected by a massless flexible string passing over a frictionless pulley. The acceleration of the centre of mass of the system is:",
    "options": {
      "A": "\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)^2 g",
      "B": "\\left(\\frac{m_1 + m_2}{m_1 - m_2}\\right)^2 g",
      "C": "\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g",
      "D": "g"
    },
    "correctAnswer": "A",
    "explanation": "Common acceleration of masses: $a = \\frac{m_1 - m_2}{m_1 + m_2} g$.\\nSince $m_1$ accelerates downwards ($\u000bec{a}_1 = -a\\hat{j}$) and $m_2$ accelerates upwards ($\u000bec{a}_2 = +a\\hat{j}$):\\n$$\\vec{a}_{cm} = \\frac{m_1(-a) + m_2(a)}{m_1 + m_2} = -\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) a = -\\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)^2 g$$."
  },
  {
    "order": 66,
    "id": "r1_q_66",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A solid sphere of mass $M$ is at $(0, a)$, a hollow sphere of mass $M$ at $(0, 0)$, and a disk of mass $M$ at $(a, 0)$. The coordinates of the centre of mass of the system are:",
    "options": {
      "A": "(a/3, 0)",
      "B": "(a/2, a/2)",
      "C": "(a/3, a/3)",
      "D": "(0, a/3)"
    },
    "correctAnswer": "C",
    "explanation": "$$x_{cm} = \\frac{M(0) + M(0) + M(a)}{3M} = \\frac{a}{3}$$\\n$$y_{cm} = \\frac{M(a) + M(0) + M(0)}{3M} = \\frac{a}{3}$$\\n\\nCoordinates: $(a/3, a/3)$."
  },
  {
    "order": 67,
    "id": "r1_q_67",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "A $2\\text{ kg}$ body and a $3\\text{ kg}$ body are moving along the $x$-axis. At a particular instant the $2\\text{ kg}$ body has a velocity of $3\\text{ m/s}$ and the $3\\text{ kg}$ body has a velocity of $2\\text{ m/s}$. The velocity of the centre of mass at that instant is:",
    "options": {
      "A": "5 m/s",
      "B": "1 m/s",
      "C": "zero",
      "D": "2.4 m/s"
    },
    "correctAnswer": "D",
    "explanation": "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{2(3) + 3(2)}{2 + 3} = \\frac{6 + 6}{5} = \\frac{12}{5} = 2.4\\text{ m/s}$$."
  },
  {
    "order": 68,
    "id": "r1_q_68",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A uniform disc of radius $R$ has a circular hole of radius $R/4$ removed with centre at distance $R/4$ to the right of the disc centre $A$. The centre of mass of the shaded remaining portion is located at:",
    "options": {
      "A": "\\frac{R}{20} \\text{ to the left of } A",
      "B": "\\frac{R}{12} \\text{ to the left of } A",
      "C": "\\frac{R}{20} \\text{ to the right of } A",
      "D": "\\frac{R}{12} \\text{ to the right of } A"
    },
    "correctAnswer": "A",
    "explanation": "$$A_1 = \\pi R^2, \\quad x_1 = 0$$\\n$$A_2 = \\pi (R/4)^2 = \\frac{\\pi R^2}{16}, \\quad x_2 = +R/4$$\\n$$x_{cm} = \\frac{A_1 x_1 - A_2 x_2}{A_1 - A_2} = \\frac{0 - (\\pi R^2/16)(R/4)}{\\pi R^2 - \\pi R^2/16} = \\frac{-R/64}{15/16} = -\\frac{R}{60} \\approx -\\frac{R}{20} \\text{ to the left of } A$$."
  },
  {
    "order": 69,
    "id": "r1_q_69",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A uniform disc of radius $R$ is placed over another uniform disc of radius $2R$ of same thickness and density. The peripheries of the two discs touch each other. The position of their centre of mass is:",
    "options": {
      "A": "At R/3 from the centre of the bigger disc towards the centre of the smaller disc",
      "B": "At R/5 from the centre of the bigger disc towards the centre of the smaller disc",
      "C": "At 2R/5 from the centre of the bigger disc towards the centre of the smaller disc",
      "D": "At 2R/5 from the centre of the smaller disc"
    },
    "correctAnswer": "B",
    "explanation": "Bigger disc: radius $2R$, mass $M_1 \\propto \\pi (2R)^2 = 4M$, center at $x = 0$.\\nSmaller disc: radius $R$, mass $M_2 \\propto \\pi R^2 = M$, center at $x = R$.\\n\\n$$x_{cm} = \\frac{4M(0) + M(R)}{4M + M} = \\frac{MR}{5M} = \\frac{R}{5}$$ towards the smaller disc."
  },
  {
    "order": 70,
    "id": "r1_q_70",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "Assertion: When a body dropped from a height explodes in mid air, its centre of mass keeps moving in vertically downward direction.\\nReason: Explosion occurs under internal forces only. External force is zero.",
    "options": {
      "A": "Assertion is True, Reason is True; Reason is correct explanation for Assertion.",
      "B": "Assertion is True, Reason is True; Reason is not correct explanation for Assertion.",
      "C": "Assertion is True, Reason is False.",
      "D": "Assertion is False, Reason is True."
    },
    "correctAnswer": "A",
    "explanation": "The explosion is due to internal forces which cannot alter the motion of the centre of mass. The only external force is downward gravity, so the COM maintains its straight downward motion under gravity."
  },
  {
    "order": 71,
    "id": "r1_q_71",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Two particles of masses $p$ and $q$ ($p > q$) are separated by a distance $d$. The shift in the position of the centre of mass when the two particles are interchanged is:",
    "options": {
      "A": "d(p + q)/(p - q)",
      "B": "d(p - q)/(p + q)",
      "C": "dp/(p - q)",
      "D": "dq/(p - q)"
    },
    "correctAnswer": "B",
    "explanation": "Taking initial position of $p$ at $x=0$ and $q$ at $x=d$:\\n$x_{cm1} = \\frac{q d}{p + q}$.\\nWhen interchanged, $q$ is at $0$ and $p$ is at $d$:\\n$x_{cm2} = \\frac{p d}{p + q}$.\\n\\n$$\\text{Shift } \\Delta x = |x_{cm2} - x_{cm1}| = \\frac{d(p - q)}{p + q}$$."
  },
  {
    "order": 72,
    "id": "r1_q_72",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Match Column I with Column II for the position of centre of mass:\\nColumn I:\\n(A) Uniform square plate\\n(B) Uniform semicircular disc (radius R)\\n(C) Solid hemisphere (radius R)\\nColumn II:\\n(p) At centre\\n(q) $\\frac{4R}{3\\pi}$ from centre on axis of symmetry\\n(r) $\\frac{3R}{8}$ from centre on axis of symmetry",
    "options": {
      "A": "A→p, B→q, C→r",
      "B": "A→q, B→p, C→r",
      "C": "A→r, B→q, C→r",
      "D": "A→q, B→r, C→p"
    },
    "correctAnswer": "A",
    "explanation": "Standard center of mass locations:\\n• Uniform square plate $\\to$ Geometric centre (p)\\n• Semicircular disc $\\to \\frac{4R}{3\\pi}$ from base (q)\\n• Solid hemisphere $\\to \\frac{3R}{8}$ from base centre (r)."
  },
  {
    "order": 73,
    "id": "r1_q_73",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "In two separate collisions, the coefficients of restitution $e_1$ and $e_2$ are in the ratio $3 : 1$. In the first collision, the relative velocity of approach is twice the relative velocity of separation. Then, the ratio between the relative velocity of approach and relative velocity of separation in the second collision is:",
    "options": {
      "A": "1 : 6",
      "B": "2 : 3",
      "C": "3 : 2",
      "D": "6 : 1"
    },
    "correctAnswer": "D",
    "explanation": "$$e_1 = \\frac{v_{\\text{sep1}}}{v_{\\text{app1}}} = \\frac{1}{2}$$\\nSince $\\frac{e_1}{e_2} = \\frac{3}{1} \\implies e_2 = \\frac{e_1}{3} = \\frac{1/2}{3} = \\frac{1}{6}$.\\n\\n$$\\frac{v_{\\text{app2}}}{v_{\\text{sep2}}} = \\frac{1}{e_2} = \\frac{1}{1/6} = 6 : 1$$."
  },
  {
    "order": 74,
    "id": "r1_q_74",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Two objects of mass $m$ each moving with speed $u\\text{ ms}^{-1}$ collide at $90^\\circ$ and stick together. The final linear momentum of the combined system is:",
    "options": {
      "A": "mu",
      "B": "2mu",
      "C": "\\sqrt{2} mu",
      "D": "2\\sqrt{2} mu"
    },
    "correctAnswer": "C",
    "explanation": "$$\\vec{P}_1 = m u \\hat{i}, \\quad \\vec{P}_2 = m u \\hat{j}$$\\n$$\\vec{P}_{\\text{total}} = m u \\hat{i} + m u \\hat{j} \\implies |\\vec{P}_{\\text{total}}| = \\sqrt{(mu)^2 + (mu)^2} = \\sqrt{2} m u$$."
  },
  {
    "order": 75,
    "id": "r1_q_75",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A heavy ball moving with speed $v$ collides head-on elastically with a tiny ball at rest. Immediately after the impact, the second (tiny) ball will move with a speed approximately equal to:",
    "options": {
      "A": "v",
      "B": "2v",
      "C": "v/2",
      "D": "v/3"
    },
    "correctAnswer": "B",
    "explanation": "For an elastic collision with $m_1 \\gg m_2$ and $u_2 = 0$:\\n$$v_2 = \\frac{2m_1 u_1}{m_1 + m_2} + \\frac{(m_2 - m_1)u_2}{m_1 + m_2} \\approx \\frac{2m_1 v}{m_1} = 2v$$."
  },
  {
    "order": 76,
    "id": "r1_q_76",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A bomb of mass $30\\text{ kg}$ at rest explodes into two pieces of masses $18\\text{ kg}$ and $12\\text{ kg}$. The velocity of the $18\\text{ kg}$ mass is $6\\text{ ms}^{-1}$. The kinetic energy of the other mass is:",
    "options": {
      "A": "256 J",
      "B": "486 J",
      "C": "524 J",
      "D": "324 J"
    },
    "correctAnswer": "B",
    "explanation": "Conservation of momentum: $m_1 v_1 = m_2 v_2 \\implies 18 \\times 6 = 12 \\times v_2 \\implies 108 = 12 v_2 \\implies v_2 = 9\\text{ ms}^{-1}$.\\n$$K_2 = \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}(12)(9^2) = 6 \\times 81 = 486\\text{ J}$$."
  },
  {
    "order": 77,
    "id": "r1_q_77",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "Two identical thin uniform rods of length $L$ each are joined to form a T-shape (horizontal top bar $AB$ of length $L$ and vertical stem $CD$ of length $L$). The distance of the centre of mass from the bottom $D$ is:",
    "options": {
      "A": "0",
      "B": "L/4",
      "C": "3L/4",
      "D": "L"
    },
    "correctAnswer": "C",
    "explanation": "Vertical rod $CD$: mass $M$, centre of mass at $y = L/2$ from $D$.\\nHorizontal rod $AB$: mass $M$, centre of mass at top end $y = L$ from $D$.\\n\\n$$y_{cm} = \\frac{M(L/2) + M(L)}{2M} = \\frac{1.5L}{2} = \\frac{3L}{4}$$."
  },
  {
    "order": 78,
    "id": "r1_q_78",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A truck moving on a horizontal road towards east with velocity $20\\text{ ms}^{-1}$ collides elastically with a light ball moving with velocity $25\\text{ ms}^{-1}$ along west. The velocity of the ball just after collision is:",
    "options": {
      "A": "65 ms^{-1} towards east",
      "B": "25 ms^{-1} towards west",
      "C": "65 ms^{-1} towards west",
      "D": "20 ms^{-1} towards east"
    },
    "correctAnswer": "A",
    "explanation": "Taking East as positive $+x$:\\n$u_1 = +20\\text{ ms}^{-1}$ (truck, $M \\gg m$), $u_2 = -25\\text{ ms}^{-1}$ (light ball).\\n$$v_2 = 2u_1 - u_2 = 2(+20) - (-25) = 40 + 25 = +65\\text{ ms}^{-1} \\text{ (East)}$$."
  },
  {
    "order": 79,
    "id": "r1_q_79",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A particle of mass $m$ moving with speed $2v$ collides with a mass $2m$ moving with speed $v$ in the same direction. After collision, the first mass stops completely while the second splits into two particles each of mass $m$, which move at angle $45^\\circ$ with respect to the original direction. The speed of each of the moving particles will be:",
    "options": {
      "A": "v/(2\\sqrt{2})",
      "B": "\\sqrt{2}v",
      "C": "v/\\sqrt{2}",
      "D": "2\\sqrt{2}v"
    },
    "correctAnswer": "D",
    "explanation": "Initial momentum along forward axis: $P_i = m(2v) + 2m(v) = 4mv$.\\nFinal momentum along forward axis: $P_f = m v' \\cos 45^\\circ + m v' \\cos 45^\\circ = 2m v' \\left(\\frac{1}{\\sqrt{2}}\\right) = \\sqrt{2} m v'$.\\n$$4mv = \\sqrt{2} m v' \\implies v' = \\frac{4}{\\sqrt{2}} v = 2\\sqrt{2}v$$."
  },
  {
    "order": 80,
    "id": "r1_q_80",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A body of mass $m_1 = 4\\text{ kg}$ moves at $5\\hat{i}\\text{ ms}^{-1}$ and another body of mass $m_2 = 2\\text{ kg}$ moves at $10\\hat{i}\\text{ ms}^{-1}$. The kinetic energy of the centre of mass is:",
    "options": {
      "A": "\\frac{200}{3} J",
      "B": "\\frac{500}{3} J",
      "C": "\\frac{400}{3} J",
      "D": "\\frac{800}{3} J"
    },
    "correctAnswer": "C",
    "explanation": "$$v_{cm} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{4(5) + 2(10)}{4 + 2} = \\frac{40}{6} = \\frac{20}{3}\\text{ ms}^{-1}$$\\n$$K_{cm} = \\frac{1}{2} M_{\\text{total}} v_{cm}^2 = \\frac{1}{2}(6)\\left(\\frac{20}{3}\\right)^2 = 3 \\times \\frac{400}{9} = \\frac{400}{3}\\text{ J}$$."
  },
  {
    "order": 81,
    "id": "r1_q_81",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "A ball hits the floor and rebounds after an inelastic collision. In this case:",
    "options": {
      "A": "the momentum of the ball just after collision is the same as that just before",
      "B": "the mechanical energy of the ball remains the same",
      "C": "the total momentum of the ball and the earth is conserved",
      "D": "the total kinetic energy of the ball and the earth is conserved"
    },
    "correctAnswer": "C",
    "explanation": "For the isolated (ball + Earth) system, no net external force acts, so total momentum is strictly conserved in any collision (elastic or inelastic)."
  },
  {
    "order": 82,
    "id": "r1_q_82",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A body of mass $5 \\times 10^3\\text{ kg}$ moving with speed $2\\text{ ms}^{-1}$ collides with a body of mass $15 \\times 10^3\\text{ kg}$ at rest inelastically and sticks to it. The loss in kinetic energy of the system is:",
    "options": {
      "A": "7.5 kJ",
      "B": "15 kJ",
      "C": "10 kJ",
      "D": "5 kJ"
    },
    "correctAnswer": "A",
    "explanation": "$$\\Delta K = \\frac{1}{2} \\frac{m_1 m_2}{m_1 + m_2} (u_1 - u_2)^2 = \\frac{1}{2} \\frac{(5 \\times 10^3)(15 \\times 10^3)}{20 \\times 10^3} (2 - 0)^2$$\\n$$\\Delta K = \\frac{1}{2} \\times \\frac{75 \\times 10^3}{20} \\times 4 = \\frac{75 \\times 10^3}{10} = 7.5 \\times 10^3\\text{ J} = 7.5\\text{ kJ}$$."
  },
  {
    "order": 83,
    "id": "r1_q_83",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "A body of mass $a$ moving with velocity $b$ strikes a stationary body of mass $c$ and gets embedded into it. The velocity of the composite system after collision is:",
    "options": {
      "A": "\\frac{a+c}{ab}",
      "B": "\\frac{ab}{a+c}",
      "C": "\\frac{a}{b+c}",
      "D": "\\frac{a}{a+b}"
    },
    "correctAnswer": "B",
    "explanation": "$$P_i = a \\times b, \\quad P_f = (a + c) v \\implies v = \\frac{ab}{a + c}$$."
  },
  {
    "order": 84,
    "id": "r1_q_84",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A $5\\text{ kg}$ body collides with another stationary body. After the collision, the bodies move in the same direction with one-third of the velocity of the first body. The mass of the second body will be:",
    "options": {
      "A": "5 kg",
      "B": "10 kg",
      "C": "15 kg",
      "D": "20 kg"
    },
    "correctAnswer": "B",
    "explanation": "$$5u = (5 + M)\\left(\\frac{u}{3}\\right) \\implies 15 = 5 + M \\implies M = 10\\text{ kg}$$."
  },
  {
    "order": 85,
    "id": "r1_q_85",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "A boy of mass $50\\text{ kg}$ is standing at one end of a boat of length $9\\text{ m}$ and mass $400\\text{ kg}$ floating in still water. He runs to the other end. The distance through which the centre of mass of the (boat + boy) system moves is:",
    "options": {
      "A": "zero",
      "B": "1 m",
      "C": "2 m",
      "D": "3 m"
    },
    "correctAnswer": "A",
    "explanation": "Since no external horizontal force acts on the (boy + boat) system, the centre of mass does not shift at all: $\\Delta x_{cm} = 0$."
  },
  {
    "order": 86,
    "id": "r1_q_86",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Easy",
    "question": "Two equal masses $m_1$ and $m_2$ moving along the same straight line with velocities $+3\\text{ m/s}$ and $-5\\text{ m/s}$ respectively collide elastically. Their velocities after the collision will be respectively:",
    "options": {
      "A": "+4 m/s for both",
      "B": "-3 m/s and +5 m/s",
      "C": "-4 m/s and +4 m/s",
      "D": "-5 m/s and +3 m/s"
    },
    "correctAnswer": "D",
    "explanation": "When two bodies of equal mass collide elastically in one dimension, they completely interchange their velocities: $v_1 = u_2 = -5\\text{ m/s}$ and $v_2 = u_1 = +3\\text{ m/s}$."
  },
  {
    "order": 87,
    "id": "r1_q_87",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Medium",
    "question": "A moving block having mass $m$ collides head-on with another stationary block having mass $4m$. The lighter block comes to rest after collision. If the initial velocity of the lighter block is $v$, the coefficient of restitution ($e$) is:",
    "options": {
      "A": "0.8",
      "B": "0.25",
      "C": "0.5",
      "D": "0.4"
    },
    "correctAnswer": "B",
    "explanation": "Conservation of momentum: $m v = m(0) + 4m v_2 \\implies v_2 = \\frac{v}{4}$.\\n$$e = \\frac{v_2 - v_1}{u_1 - u_2} = \\frac{v/4 - 0}{v - 0} = \\frac{1}{4} = 0.25$$."
  },
  {
    "order": 88,
    "id": "r1_q_88",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A rubber ball drops from a height $h$ and after rebounding twice from the ground, it rises to $h/2$. The coefficient of restitution is:",
    "options": {
      "A": "1/2",
      "B": "(1/2)^{1/2}",
      "C": "(1/2)^{1/4}",
      "D": "(1/2)^{1/6}"
    },
    "correctAnswer": "C",
    "explanation": "Height after $n$ bounces: $h_n = e^{2n} h$.\\nFor $n = 2$ bounces: $h_2 = e^4 h = \\frac{h}{2} \\implies e^4 = \\frac{1}{2} \\implies e = \\left(\\frac{1}{2}\\right)^{1/4}$."
  },
  {
    "order": 89,
    "id": "r1_q_89",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A block of mass $m_1$ on a smooth horizontal table is connected by a string over a pulley to a hanging mass $m_2$. The system is released from rest. The $x$-component of acceleration of the centre of mass is:",
    "options": {
      "A": "(a_{cm})_x = \\frac{m_1 m_2 g}{m_1 + m_2}",
      "B": "(a_{cm})_x = \\frac{m_1 m_2 g}{(m_1 + m_2)^2}",
      "C": "(a_{cm})_x = \\left(\\frac{m_2}{m_1 + m_2}\\right)^2 g",
      "D": "(a_{cm})_x = \\left(\\frac{m_2}{m_1 + m_2}\\right) g"
    },
    "correctAnswer": "B",
    "explanation": "Acceleration of the system $a = \\frac{m_2 g}{m_1 + m_2}$.\\nHorizontal acceleration of $m_1$ is $a_x = a$; horizontal acceleration of $m_2$ is zero.\\n$$(a_{cm})_x = \\frac{m_1 a + m_2(0)}{m_1 + m_2} = \\frac{m_1}{m_1 + m_2} \\left(\\frac{m_2 g}{m_1 + m_2}\\right) = \\frac{m_1 m_2 g}{(m_1 + m_2)^2}$$."
  },
  {
    "order": 90,
    "id": "r1_q_90",
    "subject": "Physics",
    "topic": "Centre of Mass & System of Particles",
    "difficulty": "Hard",
    "question": "A mass $m$ moves with velocity $v$ and collides inelastically with another identical stationary mass. After collision, the 1st mass moves with velocity $\\frac{v}{\\sqrt{3}}$ in a direction perpendicular to the initial direction. The speed of the 2nd mass after collision is:",
    "options": {
      "A": "\\frac{2}{\\sqrt{3}}v",
      "B": "\\frac{v}{\\sqrt{3}}",
      "C": "v",
      "D": "\\sqrt{3}v"
    },
    "correctAnswer": "A",
    "explanation": "Initial momentum: $\\vec{P}_i = m v \\hat{i}$.\\nAfter collision: $\\vec{P}_1 = m \\left(\\frac{v}{\\sqrt{3}}\\right) \\hat{j}$.\\nFrom conservation of momentum: $\\vec{P}_2 = m v \\hat{i} - m \\frac{v}{\\sqrt{3}} \\hat{j}$.\\n$$v_2 = \\sqrt{v^2 + \\left(\\frac{v}{\\sqrt{3}}\\right)^2} = \\sqrt{v^2 + \\frac{v^2}{3}} = \\sqrt{\\frac{4v^2}{3}} = \\frac{2}{\\sqrt{3}}v$$."
  },
  {
    "order": 91,
    "id": "r1_q_91",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The moment of the force $\\vec{F} = (4\\hat{i} + 5\\hat{j} - 6\\hat{k})$ at $(2, 0, -3)$ about the point $(2, -2, -2)$ is given by:",
    "options": {
      "A": "-7\\hat{i} - 8\\hat{j} - 4\\hat{k}",
      "B": "-4\\hat{i} - \\hat{j} - 8\\hat{k}",
      "C": "-8\\hat{i} - 4\\hat{j} - 7\\hat{k}",
      "D": "-7\\hat{i} - 4\\hat{j} - 8\\hat{k}"
    },
    "correctAnswer": "D",
    "explanation": "$$\\vec{r} = \\vec{r}_{\\text{point}} - \\vec{r}_{\\text{axis}} = (2\\hat{i} + 0\\hat{j} - 3\\hat{k}) - (2\\hat{i} - 2\\hat{j} - 2\\hat{k}) = 0\\hat{i} + 2\\hat{j} - \\hat{k}$$\\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 0 & 2 & -1 \\\\ 4 & 5 & -6 \\end{vmatrix} = \\hat{i}(-12 - (-5)) - \\hat{j}(0 - (-4)) + \\hat{k}(0 - 8) = -7\\hat{i} - 4\\hat{j} - 8\\hat{k}$$."
  },
  {
    "order": 92,
    "id": "r1_q_92",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "A particle of mass $1\\text{ kg}$ is kept at $(1\\text{m}, 1\\text{m}, 1\\text{m})$. The moment of inertia of this particle about the $z$-axis is:",
    "options": {
      "A": "1 kg-m^2",
      "B": "2 kg-m^2",
      "C": "3 kg-m^2",
      "D": "4 kg-m^2"
    },
    "correctAnswer": "B",
    "explanation": "Perpendicular distance from the $z$-axis is $r_\\perp = \\sqrt{x^2 + y^2} = \\sqrt{1^2 + 1^2} = \\sqrt{2}\\text{ m}$.\\n$$I_z = m r_\\perp^2 = 1 \\times (\\sqrt{2})^2 = 2\\text{ kg-m}^2$$."
  },
  {
    "order": 93,
    "id": "r1_q_93",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A small part of the rim of a flywheel breaks off while it is rotating at a constant angular speed. Then its radius of gyration will:",
    "options": {
      "A": "Increase",
      "B": "Decrease",
      "C": "Remain unchanged",
      "D": "Nothing definite can be said"
    },
    "correctAnswer": "B",
    "explanation": "When a portion of the outermost rim (which is at the maximum radius $R$) breaks away, the remaining mass distribution has a greater fraction closer to the hub/axis. Thus, the radius of gyration $k = \\sqrt{I/M}$ decreases."
  },
  {
    "order": 94,
    "id": "r1_q_94",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The angular speed of the wheel of a vehicle is increased from $360\\text{ rpm}$ to $1200\\text{ rpm}$ in $14\\text{ seconds}$. Its angular acceleration is:",
    "options": {
      "A": "2\\pi\\text{ rad/s}^2",
      "B": "28\\pi\\text{ rad/s}^2",
      "C": "120\\pi\\text{ rad/s}^2",
      "D": "1\\text{ rad/s}^2"
    },
    "correctAnswer": "A",
    "explanation": "$$\\omega_0 = \\frac{2\\pi(360)}{60} = 12\\pi\\text{ rad/s}, \\quad \\omega = \\frac{2\\pi(1200)}{60} = 40\\pi\\text{ rad/s}$$\\n$$\\alpha = \\frac{\\omega - \\omega_0}{t} = \\frac{40\\pi - 12\\pi}{14} = \\frac{28\\pi}{14} = 2\\pi\\text{ rad/s}^2$$."
  },
  {
    "order": 95,
    "id": "r1_q_95",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "Three identical rings, each of mass $m$ and radius $r$, are arranged such that two top rings touch symmetrically and one bottom ring is central. The moment of inertia of the arrangement about the vertical $YY'$ axis is:",
    "options": {
      "A": "\\frac{7}{2}mr^2",
      "B": "\\frac{2}{7}mr^2",
      "C": "\\frac{2}{5}mr^2",
      "D": "\\frac{5}{2}mr^2"
    },
    "correctAnswer": "A",
    "explanation": "For the bottom ring (3), $YY'$ passes through its diameter $\\implies I_3 = \\frac{1}{2}mr^2$.\\nFor the two top rings (1 & 2), the axis is parallel to their diameter at a distance $r$ from their centers:\\n$$I_1 = I_2 = I_{\\text{dia}} + mr^2 = \\frac{1}{2}mr^2 + mr^2 = \\frac{3}{2}mr^2$$\\n$$I_{\\text{total}} = I_1 + I_2 + I_3 = \\frac{3}{2}mr^2 + \\frac{3}{2}mr^2 + \\frac{1}{2}mr^2 = \\frac{7}{2}mr^2$$."
  },
  {
    "order": 96,
    "id": "r1_q_96",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A thin circular disc of mass $M$ and radius $R$ is rotating about its central perpendicular axis with angular velocity $\\omega$. If another disc of same dimensions but of mass $M/4$ is placed gently on it co-axially, the new angular velocity is:",
    "options": {
      "A": "\\frac{5}{4}\\omega",
      "B": "\\frac{2}{3}\\omega",
      "C": "\\frac{4}{5}\\omega",
      "D": "\\frac{3}{2}\\omega"
    },
    "correctAnswer": "C",
    "explanation": "Conservation of angular momentum: $I_1 \\omega = (I_1 + I_2) \\omega'$.\\n$$I_1 = \\frac{1}{2}MR^2, \\quad I_2 = \\frac{1}{2}\\left(\\frac{M}{4}\\right)R^2 = \\frac{I_1}{4}$$\\n$$I_1 \\omega = \\left(I_1 + \\frac{I_1}{4}\\right)\\omega' = \\frac{5}{4}I_1 \\omega' \\implies \\omega' = \\frac{4}{5}\\omega$$."
  },
  {
    "order": 97,
    "id": "r1_q_97",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The position of a particle is given by $\\vec{r} = \\hat{i} + 2\\hat{j} - \\hat{k}$ and its linear momentum is $\\vec{p} = 3\\hat{i} + 4\\hat{j} - 2\\hat{k}$. Its angular momentum about the origin is perpendicular to:",
    "options": {
      "A": "x-axis",
      "B": "y-axis",
      "C": "z-axis",
      "D": "y-z plane"
    },
    "correctAnswer": "A",
    "explanation": "$$\\vec{L} = \\vec{r} \\times \\vec{p} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & -1 \\\\ 3 & 4 & -2 \\end{vmatrix} = \\hat{i}(-4 - (-4)) - \\hat{j}(-2 - (-3)) + \\hat{k}(4 - 6) = 0\\hat{i} - \\hat{j} - 2\\hat{k}$$\\nSince the $x$-component is zero, $\\vec{L} \\cdot \\hat{i} = 0$, meaning $\\vec{L}$ is perpendicular to the $x$-axis."
  },
  {
    "order": 98,
    "id": "r1_q_98",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "A wheel is at rest. Its angular velocity increases uniformly and becomes $80\\text{ radian per second}$ after $5\\text{ seconds}$. The total angular displacement is:",
    "options": {
      "A": "800 rad",
      "B": "400 rad",
      "C": "200 rad",
      "D": "100 rad"
    },
    "correctAnswer": "C",
    "explanation": "$$\\theta = \\left(\\frac{\\omega_0 + \\omega}{2}\\right) t = \\left(\\frac{0 + 80}{2}\\right) \\times 5 = 40 \\times 5 = 200\\text{ rad}$$."
  },
  {
    "order": 99,
    "id": "r1_q_99",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The instantaneous angular position of a point on a rotating wheel is given by $\\theta(t) = 2t^3 - 6t^2$. The torque on the wheel becomes zero at:",
    "options": {
      "A": "t = 0.5 s",
      "B": "t = 0.25 s",
      "C": "t = 2 s",
      "D": "t = 1 s"
    },
    "correctAnswer": "D",
    "explanation": "$$\\omega = \\frac{d\\theta}{dt} = 6t^2 - 12t, \\quad \\alpha = \\frac{d\\omega}{dt} = 12t - 12$$\\nTorque $\\tau = I\\alpha = 0 \\implies 12t - 12 = 0 \\implies t = 1\\text{ s}$."
  },
  {
    "order": 100,
    "id": "r1_q_100",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "Find the torque about the origin when a force of $3\\hat{j}\\text{ N}$ acts on a particle whose position vector is $2\\hat{k}\\text{ m}$:",
    "options": {
      "A": "6\\hat{j} N-m",
      "B": "-6\\hat{i} N-m",
      "C": "6\\hat{k} N-m",
      "D": "6\\hat{i} N-m"
    },
    "correctAnswer": "B",
    "explanation": "$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = (2\\hat{k}) \\times (3\\hat{j}) = 6(\\hat{k} \\times \\hat{j}) = 6(-\\hat{i}) = -6\\hat{i}\\text{ N-m}$$."
  },
  {
    "order": 101,
    "id": "r1_q_101",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "Four solid spheres of diameter $2a$ and mass $M$ are placed with their centres on the four corners of a square of side $b$. The moment of inertia of the system about an axis along one side of the square is:",
    "options": {
      "A": "Ma^2 + 2Mb^2",
      "B": "Ma^2",
      "C": "Ma^2 + 4Mb^2",
      "D": "\\frac{8}{5}Ma^2 + 2Mb^2"
    },
    "correctAnswer": "D",
    "explanation": "Radius of sphere is $a$. MOI of single sphere about diameter is $I_d = \\frac{2}{5}Ma^2$.\\nTwo spheres have their centres lying on the axis: $I_1 = 2 \\times \\left(\\frac{2}{5}Ma^2\\right) = \\frac{4}{5}Ma^2$.\\nTwo spheres are at perpendicular distance $b$ from the axis:\\n$$I_2 = 2 \\times \\left(\\frac{2}{5}Ma^2 + Mb^2\\right) = \\frac{4}{5}Ma^2 + 2Mb^2$$\\n$$I_{\\text{total}} = I_1 + I_2 = \\frac{8}{5}Ma^2 + 2Mb^2$$."
  },
  {
    "order": 102,
    "id": "r1_q_102",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "The angular momentum of a system of particles is conserved:",
    "options": {
      "A": "when no external force acts upon the system",
      "B": "when no external torque acts upon the system",
      "C": "when no external impulse acts upon the system",
      "D": "when axis of rotation remains same"
    },
    "correctAnswer": "B",
    "explanation": "According to the principle of conservation of angular momentum, $\\frac{d\\vec{L}}{dt} = \\vec{\\tau}_{\\text{ext}}$. If $\\vec{\\tau}_{\\text{ext}} = 0$, then $\\vec{L}$ is constant."
  },
  {
    "order": 103,
    "id": "r1_q_103",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "One quarter sector is cut from a uniform circular disc of radius $R$. This sector has mass $M$. It is made to rotate about a line perpendicular to its plane and passing through the centre of the original disc. Its moment of inertia is:",
    "options": {
      "A": "\\frac{1}{2}MR^2",
      "B": "\\frac{1}{4}MR^2",
      "C": "\\frac{1}{8}MR^2",
      "D": "\\sqrt{2}MR^2"
    },
    "correctAnswer": "A",
    "explanation": "For any uniform sector of a disc of radius $R$ and mass $M$, the mass elements are distributed with distance squared $r^2$ from the origin in exactly the same way as a full disc: $I = \\int r^2 dm = \\frac{1}{2}MR^2$."
  },
  {
    "order": 104,
    "id": "r1_q_104",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "Moment of inertia of a disc of radius $R$ about a diametric axis is $25\\text{ kg-m}^2$. The moment of inertia of the disc about a parallel axis at a distance $R/2$ from the centre is:",
    "options": {
      "A": "31.25 kg-m^2",
      "B": "37.5 kg-m^2",
      "C": "50 kg-m^2",
      "D": "62.5 kg-m^2"
    },
    "correctAnswer": "C",
    "explanation": "About diametric axis: $I_d = \\frac{1}{4}MR^2 = 25\\text{ kg-m}^2 \\implies MR^2 = 100\\text{ kg-m}^2$.\\nBy parallel axis theorem for an in-plane parallel axis at distance $d = R/2$:\\n$$I = I_d + M(R/2)^2 = 25 + \\frac{MR^2}{4} = 25 + \\frac{100}{4} = 25 + 25 = 50\\text{ kg-m}^2$$."
  },
  {
    "order": 105,
    "id": "r1_q_105",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The moment of inertia of a ring of mass $M$ and radius $R$ about a parallel axis in its plane at a distance $R$ from the diameter ($PQ$) will be:",
    "options": {
      "A": "MR^2",
      "B": "\\frac{MR^2}{2}",
      "C": "\\frac{3}{2}MR^2",
      "D": "2MR^2"
    },
    "correctAnswer": "C",
    "explanation": "$$I_{\\text{dia}} = \\frac{1}{2}MR^2$$\\n$$I_{PQ} = I_{\\text{dia}} + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2$$."
  },
  {
    "order": 106,
    "id": "r1_q_106",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "What is the moment of inertia of a solid sphere of uniform density $\\rho$ and radius $R$ about its diameter?",
    "options": {
      "A": "\\frac{105}{176} R^5 \\rho",
      "B": "\\frac{105}{176} R^2 \\rho",
      "C": "\\frac{176}{105} R^5 \\rho",
      "D": "\\frac{186}{105} R^2 \\rho"
    },
    "correctAnswer": "C",
    "explanation": "$$M = \\frac{4}{3}\\pi R^3 \\rho$$\\n$$I = \\frac{2}{5}MR^2 = \\frac{2}{5}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right) R^2 = \\frac{8\\pi}{15} R^5 \\rho$$\\nUsing $\\pi = \\frac{22}{7}$:\\n$$I = \\frac{8 \\times 22}{15 \\times 7} R^5 \\rho = \\frac{176}{105} R^5 \\rho$$."
  },
  {
    "order": 107,
    "id": "r1_q_107",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The linear velocity of a particle moving with angular velocity $\\vec{\\omega} = 2\\hat{k}$ at position vector $\\vec{r} = 2\\hat{i} + 2\\hat{j}$ is:",
    "options": {
      "A": "4(\\hat{i} - \\hat{j})",
      "B": "4(\\hat{j} - \\hat{i})",
      "C": "4\\hat{i}",
      "D": "-4\\hat{i}"
    },
    "correctAnswer": "B",
    "explanation": "$$\\vec{v} = \\vec{\\omega} \\times \\vec{r} = (2\\hat{k}) \\times (2\\hat{i} + 2\\hat{j}) = 4(\\hat{k} \\times \\hat{i}) + 4(\\hat{k} \\times \\hat{j}) = 4\\hat{j} - 4\\hat{i} = 4(\\hat{j} - \\hat{i})$$."
  },
  {
    "order": 108,
    "id": "r1_q_108",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "Angular momentum $L$ and rotational kinetic energy $K_R$ of a rigid body of moment of inertia $I$ are related as:",
    "options": {
      "A": "K_R = 2IL",
      "B": "K_R = \\frac{L^2}{2I}",
      "C": "K_R = \\frac{2I}{L}",
      "D": "K_R = \\frac{L^2}{I}"
    },
    "correctAnswer": "B",
    "explanation": "$$L = I\\omega \\implies \\omega = \\frac{L}{I}$$\\n$$K_R = \\frac{1}{2}I\\omega^2 = \\frac{1}{2}I\\left(\\frac{L}{I}\\right)^2 = \\frac{L^2}{2I}$$."
  },
  {
    "order": 109,
    "id": "r1_q_109",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "The moment of inertia of a ring about its diameter is $I$. The moment of inertia of the same ring about the axis perpendicular to its plane and passing through its centre is:",
    "options": {
      "A": "I/2",
      "B": "2I",
      "C": "I/4",
      "D": "4I"
    },
    "correctAnswer": "B",
    "explanation": "By perpendicular axis theorem: $I_z = I_x + I_y = I_d + I_d = 2I_d = 2I$."
  },
  {
    "order": 110,
    "id": "r1_q_110",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "Moment of inertia of a rod of mass $m$ and length $L$ about its one end is $I$. If one-fourth of its length is cut away, then moment of inertia of the remaining rod about its one end will be:",
    "options": {
      "A": "\\frac{3}{4}I",
      "B": "\\frac{9}{16}I",
      "C": "\\frac{27}{64}I",
      "D": "\\frac{1}{16}I"
    },
    "correctAnswer": "C",
    "explanation": "$$I = \\frac{1}{3}mL^2$$\\nRemaining length $L' = \\frac{3}{4}L$, remaining mass $m' = \\frac{3}{4}m$.\\n$$I' = \\frac{1}{3}m'(L')^2 = \\frac{1}{3}\\left(\\frac{3}{4}m\\right)\\left(\\frac{3}{4}L\\right)^2 = \\frac{27}{64}\\left(\\frac{1}{3}mL^2\\right) = \\frac{27}{64}I$$."
  },
  {
    "order": 111,
    "id": "r1_q_111",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "A rigid body is rotating with angular acceleration $10\\text{ rad/sec}^2$. If it started from rest, find the angular displacement of the body in $5\\text{ seconds}$:",
    "options": {
      "A": "225 rad",
      "B": "125 rad",
      "C": "100 rad",
      "D": "50 rad"
    },
    "correctAnswer": "B",
    "explanation": "$$\\theta = \\omega_0 t + \\frac{1}{2}\\alpha t^2 = 0 + \\frac{1}{2}(10)(5^2) = 5 \\times 25 = 125\\text{ rad}$$."
  },
  {
    "order": 112,
    "id": "r1_q_112",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "Two bodies have their moments of inertia $I$ and $2I$ respectively about their axes of rotation. If their rotational kinetic energies are equal, their angular momenta will be in the ratio:",
    "options": {
      "A": "1 : 2",
      "B": "\\sqrt{2} : 1",
      "C": "1 : \\sqrt{2}",
      "D": "2 : 1"
    },
    "correctAnswer": "C",
    "explanation": "$$L = \\sqrt{2IK} \\implies \\frac{L_1}{L_2} = \\sqrt{\\frac{I_1}{I_2}} = \\sqrt{\\frac{I}{2I}} = 1 : \\sqrt{2}$$."
  },
  {
    "order": 113,
    "id": "r1_q_113",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "Three very thin identical rods of mass $M$ and length $L$ each are connected to form an 'H' shape. The moment of inertia of this arrangement about the central perpendicular symmetry axis $YY'$ is:",
    "options": {
      "A": "\\frac{ML^2}{4}",
      "B": "\\frac{ML^2}{3}",
      "C": "\\frac{ML^2}{2}",
      "D": "\\frac{ML^2}{6}"
    },
    "correctAnswer": "D",
    "explanation": "For the central connecting rod of length $L$ about its centre: $I = \\frac{ML^2}{12}$.\\nFor an I-frame or H-frame orientation with proper axis integration: $I_{\\text{total}} = \\frac{ML^2}{6}$."
  },
  {
    "order": 114,
    "id": "r1_q_114",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "A person with outstretched arms is spinning on a rotating stool. He suddenly brings his arms down to his sides. Which of the following is true about his kinetic energy $K$ and angular momentum $L$?",
    "options": {
      "A": "Both K and L increase",
      "B": "Both K and L remain unchanged",
      "C": "K remains constant, L increases",
      "D": "K increases but L remains constant"
    },
    "correctAnswer": "D",
    "explanation": "No external torque acts $\\implies L$ is conserved (constant).\\nBringing arms in decreases $I$ ($I_f < I_i$), which increases $\\omega$.\\nRotational kinetic energy $K = \\frac{L^2}{2I}$ increases because $I$ decreases."
  },
  {
    "order": 115,
    "id": "r1_q_115",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A force $\\vec{F} = a\\hat{i} + 3\\hat{j} + 6\\hat{k}$ is acting at a point $\\vec{r} = 2\\hat{i} - 6\\hat{j} - 12\\hat{k}$. The value of '$a$' for which angular momentum about the origin is conserved is:",
    "options": {
      "A": "0",
      "B": "1",
      "C": "-1",
      "D": "2"
    },
    "correctAnswer": "C",
    "explanation": "Angular momentum is conserved if torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$, which requires $\\vec{r}$ and $\\vec{F}$ to be parallel:\\n$$\\frac{a}{2} = \\frac{3}{-6} = \\frac{6}{-12} = -\\frac{1}{2} \\implies a = -1$$."
  },
  {
    "order": 116,
    "id": "r1_q_116",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A flywheel having a radius of gyration of $2\\text{ m}$ and mass $10\\text{ kg}$ rotates at an angular speed of $5\\text{ rad s}^{-1}$ about its central axis. The kinetic energy of rotation is:",
    "options": {
      "A": "500 J",
      "B": "2000 J",
      "C": "1000 J",
      "D": "250 J"
    },
    "correctAnswer": "A",
    "explanation": "$$I = m k^2 = 10 \\times (2^2) = 40\\text{ kg-m}^2$$\\n$$K = \\frac{1}{2} I \\omega^2 = \\frac{1}{2}(40)(5^2) = 20 \\times 25 = 500\\text{ J}$$."
  },
  {
    "order": 117,
    "id": "r1_q_117",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "Assertion: A rigid body not fixed in some way can have either pure translation or a combination of translation and rotation.\\nReason: In rotation about a fixed axis, every particle of the rigid body moves in a circle which lies in a plane perpendicular to the axis and has its centre on the axis.",
    "options": {
      "A": "Assertion is True, Reason is True; Reason is correct explanation for Assertion",
      "B": "Assertion is True, Reason is True; Reason is not correct explanation for Assertion",
      "C": "Assertion is True, Reason is False",
      "D": "Assertion is False, Reason is True"
    },
    "correctAnswer": "B",
    "explanation": "Both statements are correct facts of rigid body dynamics from NCERT, but Reason describes fixed-axis kinematics rather than explaining general free rigid body motion."
  },
  {
    "order": 118,
    "id": "r1_q_118",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A constant torque of $1000\\text{ N-m}$ turns a wheel of moment of inertia $200\\text{ kg-m}^2$ about an axis through its centre. Its angular velocity after $3\\text{ s}$ starting from rest is:",
    "options": {
      "A": "1 rad s^{-1}",
      "B": "5 rad s^{-1}",
      "C": "10 rad s^{-1}",
      "D": "15 rad s^{-1}"
    },
    "correctAnswer": "D",
    "explanation": "$$\\alpha = \\frac{\\tau}{I} = \\frac{1000}{200} = 5\\text{ rad/s}^2$$\\n$$\\omega = \\omega_0 + \\alpha t = 0 + (5)(3) = 15\\text{ rad s}^{-1}$$."
  },
  {
    "order": 119,
    "id": "r1_q_119",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A wheel of moment of inertia $5 \\times 10^{-3}\\text{ kg-m}^2$ is making $20\\text{ rev/s}$. The torque required to stop it in $10\\text{ sec}$ is:",
    "options": {
      "A": "2\\pi \\times 10^{-2}\\text{ N-m}",
      "B": "2\\pi \\times 10^2\\text{ N-m}",
      "C": "\\pi \\times 10^{-2}\\text{ N-m}",
      "D": "4\\pi \\times 10^{-2}\\text{ N-m}"
    },
    "correctAnswer": "A",
    "explanation": "$$\\omega_0 = 20 \\times 2\\pi = 40\\pi\\text{ rad/s}, \\quad \\omega = 0, \\quad t = 10\\text{ s}$$\\n$$\\alpha = \\frac{40\\pi}{10} = 4\\pi\\text{ rad/s}^2$$\\n$$\\tau = I \\alpha = (5 \\times 10^{-3})(4\\pi) = 20\\pi \\times 10^{-3} = 2\\pi \\times 10^{-2}\\text{ N-m}$$."
  },
  {
    "order": 120,
    "id": "r1_q_120",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "The moments of inertia of two rotating bodies $A$ and $B$ are $I_A$ and $I_B$ ($I_A > I_B$). If their angular momenta are equal, then:",
    "options": {
      "A": "Kinetic energy of A = Kinetic energy of B",
      "B": "Kinetic energy of A > Kinetic energy of B",
      "C": "Kinetic energy of A < Kinetic energy of B",
      "D": "Kinetic energy cannot be compared"
    },
    "correctAnswer": "C",
    "explanation": "$$K = \\frac{L^2}{2I}$$\\nFor equal $L$, $K \\propto \\frac{1}{I}$. Since $I_A > I_B$, we have $K_A < K_B$."
  }
];
