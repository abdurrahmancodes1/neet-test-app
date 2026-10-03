/**
 * NEET 2026 & Re-NEET 2026: Physics & Chemistry Core Drill
 * Curated 55 Official Questions from NEET 2026 (Code 11) and Re-NEET 2026 (Code 50)
 * Topics:
 *  - Physics: Vectors, Basic Math, Units & Dimensions, Rectilinear Motion, Projectile Motion,
 *             Circular Motion, Work, Energy & Power, System of Particles & Rotational Motion
 *  - Chemistry: Some Basic Concepts of Chemistry, Structure of Atom, Classification of Elements & Periodicity,
 *               Chemical Bonding and Molecular Structure, Chemical Thermodynamics
 *
 * Duration: 55 Minutes (1 min/Q NEET Standard) | Marking: +4 / -1 / 0 | Total Marks: 220
 */

export const NEET_2026_CORE_TEST = {
  id: "neet-2026-core-mechanics-chemistry",
  title: "NEET 2026 & Re-NEET: Physics & Chemistry Core Drill",
  subtitle: "55 Authentic Questions from NEET 2026 & Re-NEET · Class 11 Core Mechanics & Physical/Inorganic Chemistry",
  subject: "Physics & Chemistry Core Foundation (Class 11)",
  durationMinutes: 55,
  totalQuestions: 55,
  totalMarks: 220,
  marksCorrect: 4,
  marksWrong: -1,
  syllabus: "Physics (Vectors, Basic Math, Units & Dimensions, Rectilinear & Projectile Motion, Circular Motion, Work Energy & Power, Rotational Motion), Chemistry (Some Basic Concepts, Structure of Atom, Periodic Classification, Chemical Bonding, Chemical Thermodynamics)"
};

export const NEET_2026_CORE_QUESTIONS = [
  // --- PHYSICS SECTION (Q1 - Q28) ---
  {
    id: 1,
    number: 1,
    subject: "Physics",
    text: "The speed of light in vacuum is taken as unity. If light takes $6\\text{ min } 40\\text{ s}$ to reach the Earth from the Sun, the distance between the Sun and the Earth in the new unit is:",
    options: {
      A: "$3 \\times 10^8$",
      B: "$500$",
      C: "$3 \\times 10^{10}$",
      D: "$400$"
    },
    correctAnswer: "D",
    explanation: "Speed in new system $v = 1\\text{ unit/s}$.\nTime $t = 6\\text{ min } 40\\text{ s} = (6 \\times 60) + 40 = 400\\text{ s}$.\nDistance $d = v \\times t = 1 \\times 400 = 400\\text{ new units}$.",
    topic: "Units and Dimensions - New Systems of Units",
    difficulty: "Easy",
    image: null
  },
  {
    id: 2,
    number: 2,
    subject: "Physics",
    text: "The angular speed of a flywheel is increased from $600\\text{ rpm}$ to $1200\\text{ rpm}$ in $10\\text{ s}$. The number of revolutions completed by the flywheel during this time is:",
    options: {
      A: "$900$",
      B: "$600$",
      C: "$150$",
      D: "$300$"
    },
    correctAnswer: "C",
    explanation: "Initial angular speed $\\omega_1 = \\frac{2\\pi \\times 600}{60} = 20\\pi\\text{ rad/s}$.\nFinal angular speed $\\omega_2 = \\frac{2\\pi \\times 1200}{60} = 40\\pi\\text{ rad/s}$.\nAngular acceleration $\\alpha = \\frac{\\omega_2 - \\omega_1}{t} = \\frac{40\\pi - 20\\pi}{10} = 2\\pi\\text{ rad/s}^2$.\nUsing equation $\\omega_2^2 = \\omega_1^2 + 2\\alpha\\theta$:\n$$(40\\pi)^2 = (20\\pi)^2 + 2(2\\pi)\\theta \\implies 1200\\pi^2 = 4\\pi\\theta \\implies \\theta = 300\\pi\\text{ rad}$$\nNumber of revolutions $N = \\frac{\\theta}{2\\pi} = \\frac{300\\pi}{2\\pi} = 150$.",
    topic: "System of Particles and Rotational Motion - Angular Kinematics",
    difficulty: "Medium",
    image: null
  },
  {
    id: 3,
    number: 3,
    subject: "Physics",
    text: "The amount of work done to raise a mass $m$ from the surface of the Earth to a height equal to the radius of the Earth $R$ will be:",
    options: {
      A: "$2mgR$",
      B: "$\\frac{mgR}{4}$",
      C: "$mgR$",
      D: "$\\frac{mgR}{2}$"
    },
    correctAnswer: "D",
    explanation: "Work done $W = U_f - U_i$.\nInitial potential energy on surface: $U_i = -\\frac{GMm}{R}$.\nFinal potential energy at height $h = R$ (distance $2R$ from center): $U_f = -\\frac{GMm}{2R}$.\n$$W = -\\frac{GMm}{2R} - \\left(-\\frac{GMm}{R}\\right) = \\frac{GMm}{2R} = \\frac{gR^2 m}{2R} = \\frac{mgR}{2}.$$",
    topic: "Work, Energy, and Power - Gravitational Potential Energy",
    difficulty: "Medium",
    image: null
  },
  {
    id: 4,
    number: 4,
    subject: "Physics",
    text: "Each side of a metallic cube of mass $5.580\\text{ kg}$ is measured to be $9.0\\text{ cm}$. Keeping significant figures in view, the density of the material of the cube can be best expressed as $X \\times 10^3\\text{ kg m}^{-3}$, where the value of $X$ is:",
    options: {
      A: "$7.654$",
      B: "$7.6$",
      C: "$7.65$",
      D: "$7.7$"
    },
    correctAnswer: "D",
    explanation: "$$\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{5.580\\text{ kg}}{(9.0 \\times 10^{-2}\\text{ m})^3} = \\frac{5.580}{729 \\times 10^{-6}} = 7654.32\\text{ kg m}^{-3} = 7.654 \\times 10^3\\text{ kg m}^{-3}$$\nSince the length $9.0\\text{ cm}$ has 2 significant figures, the final result must be rounded off to 2 significant figures $\\implies 7.7 \\times 10^3\\text{ kg m}^{-3}$, so $X = 7.7$.",
    topic: "Units and Dimensions - Significant Figures in Measurements",
    difficulty: "Medium",
    image: null
  },
  {
    id: 5,
    number: 5,
    subject: "Physics",
    text: "A ball is thrown vertically upward and falls back to the ground. Neglecting air resistance, which of the following velocity-time ($v-t$) plots correctly represents the entire flight of the ball?",
    options: {
      A: "A straight line with constant negative slope starting from positive $v_0$, crossing $v=0$, and reaching $-v_0$",
      B: "A parabola opening upwards starting and ending at $v=0$",
      C: "A horizontal straight line representing constant velocity",
      D: "A V-shaped curve with sharp reversal at the top"
    },
    correctAnswer: "A",
    explanation: "Throughout the flight in vertical motion under gravity, the acceleration is constant and directed downward ($a = -g$).\nTherefore, the slope of the $v-t$ curve must be constant and negative throughout ($\\frac{dv}{dt} = -g$).\nVelocity begins at positive $+v_0$, decreases linearly to $0$ at the apex, and becomes negative as the ball descends.",
    topic: "Rectilinear Motion - Kinematics Graphs & Free Fall",
    difficulty: "Easy",
    image: null
  },
  {
    id: 6,
    number: 6,
    subject: "Physics",
    text: "The sum of kinetic energy and potential energy of a simple pendulum bob is $0.02\\text{ joule}$. The mass of the bob is $20\\text{ g}$. The speed of the pendulum bob at the equilibrium position is approximately:",
    options: {
      A: "$0.2\\text{ m/s}$",
      B: "$1.41\\text{ m/s}$",
      C: "$14.1\\text{ m/s}$",
      D: "$2.0\\text{ m/s}$"
    },
    correctAnswer: "B",
    explanation: "At the equilibrium position (lowest point), potential energy is zero ($PE = 0$), so total mechanical energy is entirely kinetic energy:\n$$E_{\\text{total}} = \\frac{1}{2}mv^2 \\implies 0.02 = \\frac{1}{2}(20 \\times 10^{-3}\\text{ kg}) v^2$$\n$$0.02 = 10^{-2} v^2 \\implies v^2 = 2 \\implies v = \\sqrt{2} \\approx 1.41\\text{ m/s}.$$",
    topic: "Work, Energy, and Power - Conservation of Mechanical Energy",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 7,
    number: 7,
    subject: "Physics",
    text: "The magnitude and direction of the acceleration produced in a body of mass $5\\text{ kg}$ when two mutually perpendicular forces $8\\text{ N}$ and $6\\text{ N}$ act on it, are respectively:",
    options: {
      A: "$20\\text{ m s}^{-2};\\ \\tan^{-1}(4/3)\\text{ with } 8\\text{ N force}$",
      B: "$2\\text{ m s}^{-2};\\ \\tan^{-1}(3/4)\\text{ with } 6\\text{ N force}$",
      C: "$2\\text{ m s}^{-2};\\ \\tan^{-1}(4/3)\\text{ with } 8\\text{ N force}$",
      D: "$2\\text{ m s}^{-2};\\ \\tan^{-1}(3/4)\\text{ with } 8\\text{ N force}$"
    },
    correctAnswer: "D",
    explanation: "Net force $F_{\\text{net}} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = 10\\text{ N}$.\nMagnitude of acceleration $a = \\frac{F_{\\text{net}}}{m} = \\frac{10\\text{ N}}{5\\text{ kg}} = 2\\text{ m s}^{-2}$.\nDirection with respect to the $8\\text{ N}$ force:\n$$\\tan\\theta = \\frac{F_2}{F_1} = \\frac{6}{8} = \\frac{3}{4} \\implies \\theta = \\tan^{-1}\\left(\\frac{3}{4}\\right)\\text{ with } 8\\text{ N force}.$$",
    topic: "Vectors - Resultant Force & Direction",
    difficulty: "Easy",
    image: null
  },
  {
    id: 8,
    number: 8,
    subject: "Physics",
    text: "The power of a crane, which lifts a mass of $1000\\text{ kg}$ to a vertical height of $20\\text{ m}$ in $10\\text{ s}$ is: (Take $g = 9.8\\text{ m/s}^2$)",
    options: {
      A: "$19.6\\text{ W}$",
      B: "$39.2\\text{ W}$",
      C: "$19.6\\text{ kW}$",
      D: "$39.2\\text{ kW}$"
    },
    correctAnswer: "C",
    explanation: "$$\\text{Power} = \\frac{\\text{Work Done}}{\\text{Time}} = \\frac{mgh}{t} = \\frac{1000 \\times 9.8 \\times 20}{10} = 19600\\text{ W} = 19.6\\text{ kW}.$$",
    topic: "Work, Energy, and Power - Work and Power Calculations",
    difficulty: "Easy",
    image: null
  },
  {
    id: 9,
    number: 9,
    subject: "Physics",
    text: "In a vernier calliper, $20\\text{ VSD}$ (vernier scale divisions) coincide with $16\\text{ MSD}$ (main scale divisions, each of length $1\\text{ mm}$). The least count of the vernier callipers is:",
    options: {
      A: "$0.2\\text{ cm}$",
      B: "$0.01\\text{ cm}$",
      C: "$0.02\\text{ cm}$",
      D: "$0.1\\text{ cm}$"
    },
    correctAnswer: "C",
    explanation: "Least count $\\text{L.C.} = 1\\text{ MSD} - 1\\text{ VSD}$.\nGiven $20\\text{ VSD} = 16\\text{ MSD} \\implies 1\\text{ VSD} = \\frac{16}{20}\\text{ MSD} = \\frac{4}{5}\\text{ MSD}$.\n$$\\text{L.C.} = 1\\text{ MSD} - \\frac{4}{5}\\text{ MSD} = \\frac{1}{5}\\text{ MSD} = \\frac{1}{5}\\text{ mm} = 0.2\\text{ mm} = 0.02\\text{ cm}.$$",
    topic: "Units and Dimensions - Vernier Callipers & Least Count",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 10,
    number: 10,
    subject: "Physics",
    text: "When a ruler falls vertically, five different persons catch it with different reaction times: $t_A = 0.20\\text{ s}, t_B = 0.22\\text{ s}, t_C = 0.18\\text{ s}, t_D = 0.19\\text{ s}, t_E = 0.21\\text{ s}$. The correct descending order of distance travelled by the ruler for each person is:",
    options: {
      A: "$B > E > A > C > D$",
      B: "$C > D > A > B > E$",
      C: "$B > E > A > D > C$",
      D: "$C > D > A > E > B$"
    },
    correctAnswer: "C",
    explanation: "Distance travelled by the freely falling ruler $s = \\frac{1}{2}gt^2 \\implies s \\propto t^2$.\nDescending order of reaction times:\n$$t_B (0.22\\text{ s}) > t_E (0.21\\text{ s}) > t_A (0.20\\text{ s}) > t_D (0.19\\text{ s}) > t_C (0.18\\text{ s})$$\nTherefore, descending order of distance covered is $S_B > S_E > S_A > S_D > S_C$.",
    topic: "Rectilinear Motion - Free Fall & Reaction Time",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 11,
    number: 11,
    subject: "Physics",
    text: "A student conducting an experiment to determine the effective length $L$ of a simple pendulum notes down the time taken for $30\\text{ oscillations}$ as $60\\text{ s}$. Taking $\\pi^2 = 9.8$ and $g = 9.8\\text{ m/s}^2$, the length of the simple pendulum is:",
    options: {
      A: "$0.75\\text{ m}$",
      B: "$1.5\\text{ m}$",
      C: "$2\\text{ m}$",
      D: "$1\\text{ m}$"
    },
    correctAnswer: "D",
    explanation: "Time period for 1 oscillation $T = \\frac{60\\text{ s}}{30} = 2\\text{ s}$.\nUsing $T = 2\\pi\\sqrt{\\frac{L}{g}} \\implies T^2 = \\frac{4\\pi^2 L}{g} \\implies L = \\frac{g T^2}{4\\pi^2}$.\n$$L = \\frac{9.8 \\times 2^2}{4 \\times 9.8} = \\frac{4}{4} = 1\\text{ m}.$$",
    topic: "Units and Dimensions - Measurements & Mathematical Formulas",
    difficulty: "Easy",
    image: null
  },
  {
    id: 12,
    number: 12,
    subject: "Physics",
    text: "An electric heater supplies heat to a system at a rate of $100\\text{ W}$. If the system performs work at a rate of $75\\text{ J/s}$, then the rate at which internal energy increases will be:",
    options: {
      A: "$75\\text{ W}$",
      B: "$100\\text{ W}$",
      C: "$125\\text{ W}$",
      D: "$25\\text{ W}$"
    },
    correctAnswer: "D",
    explanation: "Using the First Law of Thermodynamics: $\\frac{dQ}{dt} = \\frac{dU}{dt} + \\frac{dW}{dt}$.\n$$100\\text{ W} = \\frac{dU}{dt} + 75\\text{ W} \\implies \\frac{dU}{dt} = 100 - 75 = 25\\text{ W}.$$",
    topic: "Chemical Thermodynamics - First Law Rate of Internal Energy Change",
    difficulty: "Easy",
    image: null
  },
  {
    id: 13,
    number: 13,
    subject: "Physics",
    text: "A thin wire of length $L$ and linear mass density $m$ is bent into a circular ring (in the $xy$-plane) with centre $C$. The moment of inertia of the ring about a tangential axis $yy'$ in its plane will be:",
    options: {
      A: "$\\frac{3mL^3}{8\\pi}$",
      B: "$\\frac{3mL^3}{8\\pi^2}$",
      C: "$\\frac{3mL^2}{8\\pi}$",
      D: "$\\frac{3mL^2}{8\\pi^2}$"
    },
    correctAnswer: "B",
    explanation: "Total mass of the ring $M = m \\times L$.\nCircumference $L = 2\\pi R \\implies R = \\frac{L}{2\\pi}$.\nMoment of inertia about diameter in the plane: $I_{\\text{dia}} = \\frac{1}{2}MR^2$.\nUsing parallel axis theorem for tangential axis in the plane:\n$$I_{yy'} = I_{\\text{dia}} + MR^2 = \\frac{3}{2}MR^2 = \\frac{3}{2}(mL)\\left(\\frac{L}{2\\pi}\\right)^2 = \\frac{3mL^3}{8\\pi^2}.$$",
    topic: "System of Particles and Rotational Motion - Moment of Inertia of Ring",
    difficulty: "Hard",
    image: null
  },
  {
    id: 14,
    number: 14,
    subject: "Physics",
    text: "A particle of mass $M$ moves along a horizontal $x$-axis from $x = 0$ to $x = L$. The coefficient of kinetic friction varies with $x$ as $\\mu_k(x) = \\mu_0 - \\alpha x$, where $\\mu_0, \\alpha$ are constants, such that $\\mu_k(L) = 0$. The total work done by the frictional force during the motion is $n \\mu_0 MgL$. The value of $n$ is:",
    options: {
      A: "$3$",
      B: "$1$",
      C: "$\\frac{1}{3}$",
      D: "$\\frac{1}{2}$"
    },
    correctAnswer: "D",
    explanation: "Since $\\mu_k(L) = 0 \\implies \\mu_0 - \\alpha L = 0 \\implies \\alpha = \\frac{\\mu_0}{L}$.\nFriction force $f_k(x) = \\mu_k(x)Mg = (\\mu_0 - \\alpha x)Mg$.\nWork done magnitude:\n$$W = \\int_0^L (\\mu_0 - \\alpha x)Mg \\, dx = Mg \\left[ \\mu_0 L - \\frac{\\alpha L^2}{2} \\right] = Mg \\left[ \\mu_0 L - \\frac{\\mu_0 L}{2} \\right] = \\frac{1}{2}\\mu_0 MgL$$\nComparing with $n\\mu_0MgL \\implies n = \\frac{1}{2}$.",
    topic: "Work, Energy, and Power - Variable Friction & Definite Integration",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 15,
    number: 15,
    subject: "Physics",
    text: "A particle moves along a straight line with position given by $s(t) = \\alpha t^2 - \\beta t + \\gamma$, where $\\alpha = 1\\text{ m s}^{-2}, \\beta = 6\\text{ m s}^{-1}$ and $\\gamma = 5\\text{ m}$. The average speed of the particle from $t = 0$ to $t = 6\\text{ s}$ is:",
    options: {
      A: "$12\\text{ m s}^{-1}$",
      B: "$6\\text{ m s}^{-1}$",
      C: "$3\\text{ m s}^{-1}$",
      D: "$0\\text{ m s}^{-1}$"
    },
    correctAnswer: "C",
    explanation: "Velocity $v(t) = \\frac{ds}{dt} = 2t - 6$. Particle stops and turns around at $t = 3\\text{ s}$.\n- Position at $t = 0$: $s(0) = 5\\text{ m}$.\n- Position at $t = 3\\text{ s}$: $s(3) = 1(3)^2 - 6(3) + 5 = -4\\text{ m}$. Distance $d_1 = |(-4) - 5| = 9\\text{ m}$.\n- Position at $t = 6\\text{ s}$: $s(6) = 1(6)^2 - 6(6) + 5 = 5\\text{ m}$. Distance $d_2 = |5 - (-4)| = 9\\text{ m}$.\nTotal distance covered $= 9 + 9 = 18\\text{ m}$.\n$$\\text{Average Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}} = \\frac{18\\text{ m}}{6\\text{ s}} = 3\\text{ m s}^{-1}.$$",
    topic: "Rectilinear Motion - Average Speed & Reversal of Direction",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 16,
    number: 16,
    subject: "Physics",
    text: "In an adiabatic expansion, the temperature of one mole of an ideal monatomic gas ($\\gamma = 5/3$) decreases from $60\\text{ K}$ to $50\\text{ K}$. The work done by the gas in the process is: (Take $R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: {
      A: "$41.5\\text{ J}$",
      B: "$83\\text{ J}$",
      C: "$124.5\\text{ J}$",
      D: "$166\\text{ J}$"
    },
    correctAnswer: "C",
    explanation: "Work done in an adiabatic expansion:\n$$W = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{1 \\times 8.3 \\times (60 - 50)}{\\frac{5}{3} - 1} = \\frac{83}{\\frac{2}{3}} = \\frac{83 \\times 3}{2} = 124.5\\text{ J}.$$",
    topic: "Chemical Thermodynamics - Work in Adiabatic Processes",
    difficulty: "Medium",
    image: null
  },
  {
    id: 17,
    number: 17,
    subject: "Physics",
    text: "A photon and an electron, each of $20\\text{ eV}$ energy, move in free space. The ratio of linear momentum of the electron $p_e$ to that of the photon $p_{\\text{Ph}}$, $\\frac{p_e}{p_{\\text{Ph}}}$, is: [Take $c = 3 \\times 10^8\\text{ m/s}, e = 1.6 \\times 10^{-19}\\text{ C}, m_e = 9 \\times 10^{-31}\\text{ kg}$]",
    options: {
      A: "$\\frac{2}{450}$",
      B: "$\\frac{1}{250}$",
      C: "$225$",
      D: "$275$"
    },
    correctAnswer: "C",
    explanation: "Photon momentum $p_{\\text{Ph}} = \\frac{E}{c} = \\frac{20 \\times 1.6 \\times 10^{-19}}{3 \\times 10^8} = 1.0667 \\times 10^{-26}\\text{ kg m/s}$.\nElectron momentum $p_e = \\sqrt{2 m_e E} = \\sqrt{2 \\times 9 \\times 10^{-31} \\times 20 \\times 1.6 \\times 10^{-19}} = \\sqrt{5.76 \\times 10^{-48}} = 2.4 \\times 10^{-24}\\text{ kg m/s}$.\n$$\\frac{p_e}{p_{\\text{Ph}}} = \\frac{2.4 \\times 10^{-24}}{1.0667 \\times 10^{-26}} = 225.$$",
    topic: "Structure of Atom - Momentum and de Broglie Relations",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 18,
    number: 18,
    subject: "Physics",
    text: "A frictionless circular wire of unit radius is fixed on the horizontal plane. Two point particles of unit mass start moving simultaneously from point $A (\\theta = \\pi/2)$ with identical uniform angular speeds in opposite directions, and meet again at point $B (\\theta = -\\pi/2)$. The magnitude of the total linear momentum $P$ of the system as a function of $\\theta$ is represented by:",
    options: {
      A: "A constant horizontal line",
      B: "A monotonically decreasing linear function",
      C: "A symmetrical arch curve rising from zero at $\\theta = \\pi/2$ to a peak at $\\theta = 0$ and returning to zero at $\\theta = -\\pi/2$",
      D: "A parabolic curve opening upwards with a minimum at $\\theta = 0$"
    },
    correctAnswer: "C",
    explanation: "Velocities of the two particles at angle $\\theta$: $\\vec{v}_1 = -v\\sin\\theta \\hat{i} + v\\cos\\theta \\hat{j}$ and $\\vec{v}_2 = v\\sin\\theta \\hat{i} + v\\cos\\theta \\hat{j}$.\nTotal linear momentum $\\vec{P} = m\\vec{v}_1 + m\\vec{v}_2 = 2mv\\cos\\theta \\hat{j}$.\nMagnitude $P(\\theta) = 2mv\\cos\\theta$.\n- At $\\theta = \\pi/2$: $P = 0$.\n- At $\\theta = 0$: $P = 2mv$ (maximum).\n- At $\\theta = -\\pi/2$: $P = 0$.\nThis matches a symmetrical inverted cosine arch (Option C).",
    topic: "Circular Motion & Vectors - Momentum of Multi-Particle Systems",
    difficulty: "Hard",
    image: null
  },
  {
    id: 19,
    number: 19,
    subject: "Physics",
    text: "One main scale division of a Vernier calliper is $1\\text{ mm}$ and the number of divisions on the Vernier scale is $10$. When both jaws touch each other, the Vernier scale zero lies to the left of the main scale zero, and the $4^{\\text{th}}$ Vernier division coincides with a main scale division. If this Vernier calliper measures the length of a wire to be $1.00\\text{ cm}$, the actual length of the wire is:",
    options: {
      A: "$0.60\\text{ cm}$",
      B: "$0.96\\text{ cm}$",
      C: "$1.00\\text{ cm}$",
      D: "$1.06\\text{ cm}$"
    },
    correctAnswer: "D",
    explanation: "Least Count $\\text{L.C.} = \\frac{1\\text{ mm}}{10} = 0.1\\text{ mm} = 0.01\\text{ cm}$.\nNegative zero error $= -(10 - 4) \\times \\text{L.C.} = -6 \\times 0.01\\text{ cm} = -0.06\\text{ cm}$.\n$$\\text{Actual length} = \\text{Observed reading} - (\\text{Zero error}) = 1.00 - (-0.06) = 1.06\\text{ cm}.$$",
    topic: "Units and Dimensions - Zero Error & Corrections",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 20,
    number: 20,
    subject: "Physics",
    text: "A solid sphere $A$ of radius $R$ and mass $M$ is attached at a point to a smaller solid sphere $B$ of radius $r < R$ and mass $m < M$. The line joining their centres is horizontal. The moment of inertia of the system about a vertical axis passing through the centre of $A$ is $I_A$ and about a vertical axis passing through the centre of $B$ is $I_B$. The difference $I_A - I_B$ is:",
    options: {
      A: "$(M - m)(R + r)^2$",
      B: "$(m - M)(R + r)^2$",
      C: "$(m - M)(R - r)^2$",
      D: "$0$"
    },
    correctAnswer: "B",
    explanation: "Distance between the centres of spheres $A$ and $B$ is $d = R + r$.\n- $I_A = I_{A0} + [I_{B0} + m(R + r)^2]$\n- $I_B = I_{B0} + [I_{A0} + M(R + r)^2]$\n$$I_A - I_B = m(R + r)^2 - M(R + r)^2 = (m - M)(R + r)^2.$$",
    topic: "System of Particles and Rotational Motion - Parallel Axis Theorem",
    difficulty: "Medium",
    image: null
  },
  {
    id: 21,
    number: 21,
    subject: "Physics",
    text: "Consider a spring-mass simple harmonic oscillator in one dimension ($m\\text{ kg}, k\\text{ N m}^{-1}$). If the graph of speed $v$ as a function of extension $x$ on the $(x, v)$ plane forms a perfect circle, then:",
    options: {
      A: "$k = \\frac{1}{m}$",
      B: "$k = m$",
      C: "$k = m^2$",
      D: "$k = \\sqrt{m}$"
    },
    correctAnswer: "B",
    explanation: "Total energy $E = \\frac{1}{2}mv^2 + \\frac{1}{2}kx^2 \\implies \\frac{v^2}{2E/m} + \\frac{x^2}{2E/k} = 1$.\nFor this phase-space trajectory to be a circle, the semi-axes must be equal:\n$$\\frac{2E}{m} = \\frac{2E}{k} \\implies k = m.$$",
    topic: "Work, Energy, and Power - Energy Relations & Trajectories",
    difficulty: "Medium",
    image: null
  },
  {
    id: 22,
    number: 22,
    subject: "Physics",
    text: "A thin horizontal disc rotates with constant angular velocity about a fixed vertical axis passing through its centre $O$. Its angular momentum computed about two fixed points $A$ and $B$ in the plane (where $OB = 2 \\times OA$) are $L_A$ and $L_B$ respectively. The ratio $\\frac{L_A}{L_B}$ is:",
    options: {
      A: "$\\frac{1}{4}$",
      B: "$\\frac{1}{2}$",
      C: "$1$",
      D: "$2$"
    },
    correctAnswer: "C",
    explanation: "For a rigid body rotating about a fixed axis through its stationary centre of mass ($\\vec{v}_{\\text{CM}} = 0$), the total angular momentum about any point $P$ is:\n$$\\vec{L}_P = \\vec{L}_{\\text{CM}} + \\vec{r}_P \\times M\\vec{v}_{\\text{CM}} = I\\vec{\\omega} + 0 = I\\vec{\\omega}$$\nSince this is independent of the choice of origin, $L_A = L_B \\implies \\frac{L_A}{L_B} = 1$.",
    topic: "System of Particles and Rotational Motion - Angular Momentum of Rigid Bodies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 23,
    number: 23,
    subject: "Physics",
    text: "If $\\sigma_s, k_B,$ and $b$ represent Stefan-Boltzmann constant, Boltzmann constant, and Wien's displacement law constant respectively, the dimensional formula of $\\sigma_s k_B^{-1} b$ is:",
    options: {
      A: "$[L^{-1}T^{-1}K^{-2}]$",
      B: "$[L^{-1}K^{-2}]$",
      C: "$[L^{-1}T^{-1}K^{-3}]$",
      D: "$[L^{-1}T^{-1}K^{-4}]$"
    },
    correctAnswer: "A",
    explanation: "Dimensions:\n- $[\\sigma_s] = [M^1 L^0 T^{-3} K^{-4}]$\n- $[k_B] = [M^1 L^2 T^{-2} K^{-1}]$\n- $[b] = [L^1 K^1]$\n$$[\\sigma_s k_B^{-1} b] = \\frac{[M^1 T^{-3} K^{-4}][L^1 K^1]}{[M^1 L^2 T^{-2} K^{-1}]} = [L^{-1} T^{-1} K^{-2}].$$",
    topic: "Units and Dimensions - Dimensional Analysis of Physical Constants",
    difficulty: "Hard",
    image: null
  },
  {
    id: 24,
    number: 24,
    subject: "Physics",
    text: "One mole of an ideal monatomic gas undergoes a rectangular cyclic process on a $P-V$ diagram between pressures $100\\text{ N/m}^2$ and $300\\text{ N/m}^2$ and volumes $2\\text{ m}^3$ and $5\\text{ m}^3$. The net heat supplied to the gas in one complete cycle is:",
    options: {
      A: "$400\\text{ J}$",
      B: "$500\\text{ J}$",
      C: "$600\\text{ J}$",
      D: "$800\\text{ J}$"
    },
    correctAnswer: "C",
    explanation: "In a cyclic process, net $\\Delta U = 0 \\implies Q_{\\text{net}} = W_{\\text{net}} = \\text{Area of } P-V \\text{ loop}$.\n$$Q_{\\text{net}} = (P_2 - P_1)(V_2 - V_1) = (300 - 100)\\text{ N/m}^2 \\times (5 - 2)\\text{ m}^3 = 200 \\times 3 = 600\\text{ J}.$$",
    topic: "Chemical Thermodynamics - Heat and Work in Cyclic Processes",
    difficulty: "Medium",
    image: null
  },
  {
    id: 25,
    number: 25,
    subject: "Physics",
    text: "An electron revolves in an excited state of a hydrogen atom with velocity $v = \\sqrt{25.6} \\times 10^5\\text{ m s}^{-1}$. If the radius of the orbit is $x \\times 10^{-9}\\text{ m}$, the value of $x$ is: [Take $m_e = 9 \\times 10^{-31}\\text{ kg}, e = 1.6 \\times 10^{-19}\\text{ C}, \\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2\\text{C}^{-2}$]",
    options: {
      A: "$4$",
      B: "$3$",
      C: "$2$",
      D: "$1$"
    },
    correctAnswer: "D",
    explanation: "Centripetal force for electron: $\\frac{m_e v^2}{r} = \\frac{k e^2}{r^2} \\implies r = \\frac{k e^2}{m_e v^2}$.\n$$r = \\frac{(9 \\times 10^9) \\times (1.6 \\times 10^{-19})^2}{(9 \\times 10^{-31}) \\times (25.6 \\times 10^{10})} = \\frac{2.56 \\times 10^{-29}}{2.56 \\times 10^{-20}} = 1.0 \\times 10^{-9}\\text{ m} \\implies x = 1.$$",
    topic: "Structure of Atom & Circular Motion - Bohr Atomic Model Dynamics",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 26,
    number: 26,
    subject: "Physics",
    text: "A car travels on a circular racetrack of radius $50\\text{ m}$ banked at an angle $\\theta$. If the car travels at $10\\text{ m s}^{-1}$ with zero lateral friction, the value of $\\theta$ is: (Take $g = 10\\text{ m s}^{-2}$)",
    options: {
      A: "$\\tan^{-1}(1/5)$",
      B: "$\\tan^{-1}(2/5)$",
      C: "$\\tan^{-1}(\\sqrt{3}/2)$",
      D: "$\\tan^{-1}(2\\sqrt{3})$"
    },
    correctAnswer: "A",
    explanation: "For frictionless optimum banking speed:\n$$\\tan\\theta = \\frac{v^2}{rg} = \\frac{10^2}{50 \\times 10} = \\frac{100}{500} = \\frac{1}{5} \\implies \\theta = \\tan^{-1}\\left(\\frac{1}{5}\\right).$$",
    topic: "Circular Motion - Banking of Circular Tracks",
    difficulty: "Easy",
    image: null
  },
  {
    id: 27,
    number: 27,
    subject: "Physics",
    text: "Bob $B$ of mass $m$ at rest is hanging vertically from the ceiling via a massless string of length $10\\text{ m}$. Point mass $A$ of mass $m$ travelling horizontally with speed $10\\text{ m s}^{-1}$ hits bob $B$ in a head-on elastic collision. The height $h$ to which bob $B$ rises is: (Take $g = 10\\text{ m s}^{-2}$)",
    options: {
      A: "$8\\text{ m}$",
      B: "$7\\text{ m}$",
      C: "$5\\text{ m}$",
      D: "$2.5\\text{ m}$"
    },
    correctAnswer: "C",
    explanation: "For equal masses in elastic collision, velocities exchange completely. Bob $B$ acquires $v = 10\\text{ m s}^{-1}$.\nBy conservation of energy: $mgh = \\frac{1}{2}mv^2 \\implies h = \\frac{v^2}{2g} = \\frac{100}{20} = 5\\text{ m}$.",
    topic: "Work, Energy, and Power - Elastic Collisions & Vertical Motion",
    difficulty: "Medium",
    image: null
  },
  {
    id: 28,
    number: 28,
    subject: "Physics",
    text: "An ideal gas is composed of polyatomic molecules with $3\\text{ translational}$, $3\\text{ rotational}$, and $f$ vibrational modes. If the heat capacity ratio $\\frac{C_P}{C_V} = \\frac{8}{7}$, the value of $f$ is:",
    options: {
      A: "$4$",
      B: "$3$",
      C: "$2$",
      D: "$1$"
    },
    correctAnswer: "A",
    explanation: "$$C_V = 3\\left(\\frac{R}{2}\\right) + 3\\left(\\frac{R}{2}\\right) + f R = (3 + f)R$$\n$$C_P = C_V + R = (4 + f)R$$\n$$\\frac{C_P}{C_V} = \\frac{4 + f}{3 + f} = \\frac{8}{7} \\implies 28 + 7f = 24 + 8f \\implies f = 4.$$",
    topic: "Chemical Thermodynamics - Equipartition of Energy & Heat Capacities",
    difficulty: "Medium-Hard",
    image: null
  },

  // --- CHEMISTRY SECTION (Q29 - Q55) ---
  {
    id: 29,
    number: 29,
    subject: "Chemistry",
    text: "Consider the reaction: $2A(g) + B(g) \\to 2D(g)$ with $\\Delta U^\\circ = -10\\text{ kJ mol}^{-1}$ and $\\Delta S^\\circ = -44\\text{ J K}^{-1}\\text{ mol}^{-1}$ at $298\\text{ K}$. Identify the value of $\\Delta G^\\circ$ and the spontaneity of the reaction at $298\\text{ K}$: (Given: $R = 8.31\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: {
      A: "$-1.635\\text{ kJ mol}^{-1}\\text{, spontaneous}$",
      B: "$-0.63568\\text{ kJ mol}^{-1}\\text{, spontaneous}$",
      C: "$+0.63568\\text{ kJ mol}^{-1}\\text{, non-spontaneous}$",
      D: "$+1.635\\text{ kJ mol}^{-1}\\text{, non-spontaneous}$"
    },
    correctAnswer: "C",
    explanation: "Change in gaseous moles $\\Delta n_g = 2 - (2 + 1) = -1$.\n$$\\Delta H^\\circ = \\Delta U^\\circ + \\Delta n_g RT = -10 - \\frac{1 \\times 298 \\times 8.31}{1000} = -10 - 2.4764 = -12.4764\\text{ kJ mol}^{-1}$$\n$$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ = -12.4764 - \\frac{298(-44)}{1000} = -12.4764 + 13.112 = +0.63568\\text{ kJ mol}^{-1}$$\nSince $\\Delta G^\\circ > 0$, the reaction is non-spontaneous at $298\\text{ K}$.",
    topic: "Chemical Thermodynamics - Gibbs Free Energy & Spontaneity",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 30,
    number: 30,
    subject: "Chemistry",
    text: "Match List I with List II:\nList I (Quantum Numbers: $n, l$):\nA. $n = 2, l = 1$\nB. $n = 4, l = 0$\nC. $n = 5, l = 3$\nD. $n = 3, l = 2$\nList II (Orbital):\nI. $3d$\nII. $2p$\nIII. $4s$\nIV. $5f$",
    options: {
      A: "A-IV, B-II, C-III, D-I",
      B: "A-II, B-III, C-I, D-IV",
      C: "A-II, B-III, C-IV, D-I",
      D: "A-I, B-II, C-III, D-IV"
    },
    correctAnswer: "C",
    explanation: "Value of azimuthal quantum number $l$: $0 \\to s, 1 \\to p, 2 \\to d, 3 \\to f$.\n- $n = 2, l = 1 \\implies 2p$ (II)\n- $n = 4, l = 0 \\implies 4s$ (III)\n- $n = 5, l = 3 \\implies 5f$ (IV)\n- $n = 3, l = 2 \\implies 3d$ (I)\nCorrect matching: A-II, B-III, C-IV, D-I.",
    topic: "Structure of Atom - Quantum Numbers and Subshell Designations",
    difficulty: "Easy",
    image: null
  },
  {
    id: 31,
    number: 31,
    subject: "Chemistry",
    text: "A bulb is rated at $150\\text{ watt}$, converting $8\\%$ of its electrical energy into light. If the energy of one photon is $4.42 \\times 10^{-19}\\text{ J}$, how many photons are emitted by the bulb per second?",
    options: {
      A: "$2.71 \\times 10^{19}$",
      B: "$4.06 \\times 10^{19}$",
      C: "$27.2 \\times 10^{19}$",
      D: "$1.35 \\times 10^{19}$"
    },
    correctAnswer: "A",
    explanation: "Light energy emitted per second $E = 150 \\times \\frac{8}{100} = 12\\text{ J/s}$.\n$$\\text{Number of photons } n = \\frac{E}{E_{\\text{photon}}} = \\frac{12}{4.42 \\times 10^{-19}} = 2.715 \\times 10^{19}.$$",
    topic: "Structure of Atom - Planck's Quantum Theory & Photon Emission",
    difficulty: "Medium",
    image: null
  },
  {
    id: 32,
    number: 32,
    subject: "Chemistry",
    text: "Match List I with List II:\nList I (Molecules):\nA. $\\text{C}_2\\text{H}_4$\nB. $\\text{C}_2\\text{H}_2$\nC. $\\text{CH}_4$\nD. $\\text{NH}_3$\nList II (Bonds & Lone Pairs):\nI. $3\\ \\sigma\\text{ bonds}, 2\\ \\pi\\text{ bonds}$\nII. $3\\ \\sigma\\text{ bonds}, 1\\text{ lone pair}$\nIII. $4\\ \\sigma\\text{ bonds}$\nIV. $5\\ \\sigma\\text{ bonds}, 1\\ \\pi\\text{ bond}$",
    options: {
      A: "A-III, B-IV, C-II, D-I",
      B: "A-IV, B-I, C-III, D-II",
      C: "A-I, B-II, C-IV, D-III",
      D: "A-II, B-III, C-I, D-IV"
    },
    correctAnswer: "B",
    explanation: "- $\\text{C}_2\\text{H}_4$ (ethene): $5\\ \\sigma\\text{ bonds}, 1\\ \\pi\\text{ bond}$ (IV)\n- $\\text{C}_2\\text{H}_2$ (ethyne): $3\\ \\sigma\\text{ bonds}, 2\\ \\pi\\text{ bonds}$ (I)\n- $\\text{CH}_4$ (methane): $4\\ \\sigma\\text{ bonds}$ (III)\n- $\\text{NH}_3$ (ammonia): $3\\ \\sigma\\text{ bonds}, 1\\text{ lone pair}$ (II)\nMatch: A-IV, B-I, C-III, D-II.",
    topic: "Chemical Bonding and Molecular Structure - Sigma and Pi Bonds",
    difficulty: "Easy",
    image: null
  },
  {
    id: 33,
    number: 33,
    subject: "Chemistry",
    text: "The number of hydrogen atoms present in $5.4\\text{ g}$ of urea is:\n(Given: Molar mass of urea $= 60\\text{ g mol}^{-1}$, $N_A = 6.022 \\times 10^{23}\\text{ particles mol}^{-1}$)",
    options: {
      A: "$1.084 \\times 10^{23}$",
      B: "$1.084 \\times 10^{22}$",
      C: "$2.168 \\times 10^{22}$",
      D: "$2.168 \\times 10^{23}$"
    },
    correctAnswer: "D",
    explanation: "Structure of urea: $\\text{NH}_2\\text{CONH}_2$ ($4\\text{ H atoms per molecule}$).\n$$\\text{Moles of urea} = \\frac{5.4\\text{ g}}{60\\text{ g mol}^{-1}} = 0.09\\text{ mol}$$\n$$\\text{Number of H atoms} = 0.09 \\times 4 \\times 6.022 \\times 10^{23} = 2.168 \\times 10^{23}.$$",
    topic: "Some Basic Concepts of Chemistry - Mole Concept Calculations",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 34,
    number: 34,
    subject: "Chemistry",
    text: "Identify the INCORRECT statement from the following:",
    options: {
      A: "Nitrogen can form $p\\pi-p\\pi$ multiple bonds with itself",
      B: "$\\text{P}(\\text{C}_2\\text{H}_5)_3$ and $\\text{As}(\\text{C}_6\\text{H}_5)_3$ form $d\\pi-d\\pi$ bonds with transition metals",
      C: "Phosphorus, arsenic and antimony show catenation property",
      D: "Nitrogen can form $d\\pi-p\\pi$ bond with oxygen"
    },
    correctAnswer: "D",
    explanation: "Nitrogen has no $d$-orbitals in its valence shell ($n=2$). Therefore, it cannot form $d\\pi-p\\pi$ bonds. Statement D is incorrect.",
    topic: "Chemical Bonding and Molecular Structure - Multiple Bonding & d-Orbital Participation",
    difficulty: "Medium",
    image: null
  },
  {
    id: 35,
    number: 35,
    subject: "Chemistry",
    text: "The correct order of increasing metallic character of $\\text{Na}, \\text{Be}, \\text{P}, \\text{Mg}$ and $\\text{Si}$ is:",
    options: {
      A: "$\\text{P} < \\text{Si} < \\text{Be} < \\text{Mg} < \\text{Na}$",
      B: "$\\text{P} < \\text{Si} < \\text{Na} < \\text{Mg} < \\text{Be}$",
      C: "$\\text{P} < \\text{Mg} < \\text{Be} < \\text{Si} < \\text{Na}$",
      D: "$\\text{Be} < \\text{Si} < \\text{P} < \\text{Mg} < \\text{Na}$"
    },
    correctAnswer: "A",
    explanation: "Metallic character decreases left to right across a period and increases down a group.\n- Across Period 3: $\\text{P} < \\text{Si} < \\text{Mg} < \\text{Na}$.\n- Beryllium ($\\text{Be}$) is less metallic than $\\text{Mg}$ but more metallic than metalloid $\\text{Si}$ and non-metal $\\text{P}$.\nCorrect order: $\\text{P} < \\text{Si} < \\text{Be} < \\text{Mg} < \\text{Na}$.",
    topic: "Classification of Elements and Periodicity - Periodic Trends in Metallic Character",
    difficulty: "Medium",
    image: null
  },
  {
    id: 36,
    number: 36,
    subject: "Chemistry",
    text: "Identify the correct statements from the following:\n(A) The molality of $2.5\\text{ g}$ of ethanoic acid (molar mass: $60\\text{ g mol}^{-1}$) in $75\\text{ g}$ of benzene solution is $0.556\\text{ m}$.\n(B) The molarity of a solution containing $5\\text{ g}$ of $\\text{NaOH}$ in $450\\text{ mL}$ of solution is $0.278\\text{ M}$ at $298\\text{ K}$.\n(C) Aquatic species are more comfortable in cold water due to higher dissolved oxygen solubility.\n(D) The solubility of a gas in liquid increases with decrease in pressure.\n(E) For a binary mixture of $A$ and $B$, the mole fraction of $B$ will be $x_B = \\frac{n_A}{n_A + n_B}$.",
    options: {
      A: "A, B and C only",
      B: "A and B only",
      C: "A and C only",
      D: "A, D and E only"
    },
    correctAnswer: "A",
    explanation: "- Molality $= \\frac{2.5 \\times 1000}{60 \\times 75} = 0.556\\text{ m}$ (A is true).\n- Molarity $= \\frac{5 \\times 1000}{40 \\times 450} = 0.278\\text{ M}$ (B is true).\n- Lower temperature increases gas solubility, making aquatic life more comfortable (C is true).\n- Statement D is false ($P \\propto \\text{solubility}$). Statement E is false ($x_B = n_B/(n_A + n_B)$).",
    topic: "Some Basic Concepts of Chemistry - Concentration Terms",
    difficulty: "Medium",
    image: null
  },
  {
    id: 37,
    number: 37,
    subject: "Chemistry",
    text: "At a certain temperature $T\\text{ K}$, $500\\text{ J}$ of heat is absorbed by a system and work of $200\\text{ J}$ is done by the system. The change in internal energy ($\\Delta U$) of the system is:",
    options: {
      A: "$400\\text{ J}$",
      B: "$300\\text{ J}$",
      C: "$700\\text{ J}$",
      D: "$500\\text{ J}$"
    },
    correctAnswer: "B",
    explanation: "From the First Law of Thermodynamics: $\\Delta U = q + w$.\n- Heat absorbed: $q = +500\\text{ J}$.\n- Work done by the system: $w = -200\\text{ J}$.\n$$\\Delta U = 500 - 200 = 300\\text{ J}.$$",
    topic: "Chemical Thermodynamics - First Law Calculations",
    difficulty: "Easy",
    image: null
  },
  {
    id: 38,
    number: 38,
    subject: "Chemistry",
    text: "Identify the correct statement about $\\text{ClF}_3$ from the following options:",
    options: {
      A: "It has T-shaped geometry with two lone pairs on Cl atom",
      B: "It has T-shaped geometry with three lone pairs on Cl atom",
      C: "It has a trigonal pyramidal geometry with two lone pairs on Cl atom",
      D: "It has a planar trigonal geometry with two lone pairs on Cl atom"
    },
    correctAnswer: "A",
    explanation: "$\\text{ClF}_3$ has 3 bond pairs and 2 lone pairs on the central chlorine atom ($sp^3d$ hybridization). The lone pairs occupy equatorial positions, resulting in a bent T-shaped molecular geometry.",
    topic: "Chemical Bonding and Molecular Structure - VSEPR & Geometry of Interhalogens",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 39,
    number: 39,
    subject: "Chemistry",
    text: "Identify the INCORRECT statement from the following:",
    options: {
      A: "Carbon has the ability to form $p\\pi-p\\pi$ multiple bonds with itself",
      B: "$\\text{ECl}_3$ ($\\text{E} = \\text{B}$ and $\\text{Al}$) is a monomer when $\\text{E} = \\text{B}$ and a dimer when $\\text{E} = \\text{Al}$",
      C: "The order of catenation property of Group 14 elements is $\\text{C} \\gg \\text{Si} > \\text{Ge} \\approx \\text{Sn}$",
      D: "Oxygen exhibits only $-2$ oxidation state"
    },
    correctAnswer: "D",
    explanation: "Oxygen exhibits oxidation state of $0$ in $\\text{O}_2$, $-1$ in peroxides ($\\text{H}_2\\text{O}_2$), $-\\frac{1}{2}$ in superoxides ($\\text{KO}_2$), and $+2$ in $\\text{OF}_2$. Statement D is incorrect.",
    topic: "Classification of Elements and Periodicity - Oxidation States & Periodic Trends",
    difficulty: "Medium",
    image: null
  },
  {
    id: 40,
    number: 40,
    subject: "Chemistry",
    text: "In the Lewis structure of Ozone ($\\text{O}_3$), where atom 2 is doubly bonded to central atom 1 and has 2 lone pairs, central atom 1 has 1 lone pair, and atom 3 is singly bonded to atom 1 and has 3 lone pairs, the formal charges on oxygen atoms 2, 1, and 3 are respectively:",
    options: {
      A: "$-1, 0, +1$",
      B: "$0, +1, -1$",
      C: "$0, 0, 0$",
      D: "$+1, 0, -1$"
    },
    correctAnswer: "B",
    explanation: "Formal charge $= V - L - \\frac{1}{2}S$:\n- Atom 2: $6 - 4 - 2 = 0$.\n- Central Atom 1: $6 - 2 - 3 = +1$.\n- Atom 3: $6 - 6 - 1 = -1$.\nOrder of formal charges on 2, 1, 3 is $0, +1, -1$.",
    topic: "Chemical Bonding and Molecular Structure - Formal Charges in Resonance Structures",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 41,
    number: 41,
    subject: "Chemistry",
    text: "When $1\\text{ dm}^3$ of $\\text{CO}_2$ gas is passed over hot coke, the volume of gaseous mixture after complete reaction at STP becomes $1.4\\text{ dm}^3$. The composition of the gaseous mixture at STP is:",
    options: {
      A: "$0.8\\text{ dm}^3\\text{ of CO, } 0.8\\text{ dm}^3\\text{ of CO}_2$",
      B: "$0.8\\text{ dm}^3\\text{ of CO, } 0.6\\text{ dm}^3\\text{ of CO}_2$",
      C: "$0.6\\text{ dm}^3\\text{ of CO, } 0.8\\text{ dm}^3\\text{ of CO}_2$",
      D: "$0.6\\text{ dm}^3\\text{ of CO, } 0.4\\text{ dm}^3\\text{ of CO}_2$"
    },
    correctAnswer: "B",
    explanation: "Reaction: $\\text{CO}_2(g) + \\text{C}(s) \\to 2\\text{CO}(g)$.\n- Initial volume: $1\\text{ dm}^3$ of $\\text{CO}_2$.\n- At equilibrium: $(1 - x) + 2x = 1 + x = 1.4 \\implies x = 0.4\\text{ dm}^3$.\nVolume of $\\text{CO}_2 = 1 - 0.4 = 0.6\\text{ dm}^3$.\nVolume of $\\text{CO} = 2(0.4) = 0.8\\text{ dm}^3$.",
    topic: "Some Basic Concepts of Chemistry - Gas Stoichiometry & Volume Relations",
    difficulty: "Medium",
    image: null
  },
  {
    id: 42,
    number: 42,
    subject: "Chemistry",
    text: "Identify the INCORRECT statement from the following:",
    options: {
      A: "The largest and the smallest species among $\\text{Mg}, \\text{Mg}^{2+}, \\text{Al}$ and $\\text{Al}^{3+}$ are $\\text{Al}$ and $\\text{Mg}^{2+}$ respectively",
      B: "The IUPAC name of the element with atomic number 107 is Unnilseptium",
      C: "The similarity in behaviour of $\\text{Li}$ with $\\text{Mg}$ is referred to as 'diagonal relationship'",
      D: "The oxidation state and covalency of $\\text{Al}$ in $[\\text{AlCl}(\\text{H}_2\\text{O})_5]^{2+}$ are $3$ and $6$, respectively"
    },
    correctAnswer: "A",
    explanation: "Among $\\text{Mg}, \\text{Mg}^{2+}, \\text{Al}$ and $\\text{Al}^{3+}$, the largest species is neutral $\\text{Mg}$ and the smallest is $\\text{Al}^{3+}$ (due to highest effective nuclear charge $Z=13$ with $10$ electrons). Statement A is incorrect.",
    topic: "Classification of Elements and Periodicity - Periodic Radii Trends",
    difficulty: "Medium",
    image: null
  },
  {
    id: 43,
    number: 43,
    subject: "Chemistry",
    text: "The numbers $17.0145$ and $21.0235$ were rounded to three figures after the decimal point. The resulting numbers, respectively, are:",
    options: {
      A: "$17.014\\text{ and } 21.023$",
      B: "$17.015\\text{ and } 21.023$",
      C: "$17.014\\text{ and } 21.024$",
      D: "$17.015\\text{ and } 21.024$"
    },
    correctAnswer: "C",
    explanation: "Rules for rounding off:\n- In $17.0145$: The digit to drop is 5 preceded by an even digit (4) $\\implies$ stays unchanged as $17.014$.\n- In $21.0235$: The digit to drop is 5 preceded by an odd digit (3) $\\implies$ increased by 1 to $21.024$.",
    topic: "Some Basic Concepts of Chemistry - Rules of Rounding Off",
    difficulty: "Medium",
    image: null
  },
  {
    id: 44,
    number: 44,
    subject: "Chemistry",
    text: "Among the following options, the correct decreasing trend in the negative electron gain enthalpy is:",
    options: {
      A: "$\\text{F} > \\text{Cl} > \\text{Br} > \\text{I}$",
      B: "$\\text{Br} > \\text{Cl} > \\text{F} > \\text{I}$",
      C: "$\\text{Cl} > \\text{F} > \\text{Br} > \\text{I}$",
      D: "$\\text{I} > \\text{Br} > \\text{Cl} > \\text{F}$"
    },
    correctAnswer: "C",
    explanation: "Chlorine has higher negative electron gain enthalpy than Fluorine because Fluorine has a very compact $2p$ subshell leading to significant inter-electronic repulsion when an extra electron enters. Correct trend: $\\text{Cl} > \\text{F} > \\text{Br} > \\text{I}$.",
    topic: "Classification of Elements and Periodicity - Electron Gain Enthalpy Trends",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 45,
    number: 45,
    subject: "Chemistry",
    text: "Two moles of an ideal gas undergo free expansion from $10\\text{ L}$ to $100\\text{ L}$ at $300\\text{ K}$ into a vacuum. The values of $\\Delta S_{\\text{system}}$ and $\\Delta S_{\\text{surroundings}}$ are: ($R$ is the universal gas constant)",
    options: {
      A: "$\\Delta S_{\\text{system}} = 0;\\ \\Delta S_{\\text{surroundings}} = 0$",
      B: "$\\Delta S_{\\text{system}} = 4.606 R;\\ \\Delta S_{\\text{surroundings}} = -4.606 R$",
      C: "$\\Delta S_{\\text{system}} = 0;\\ \\Delta S_{\\text{surroundings}} = 4.606 R$",
      D: "$\\Delta S_{\\text{system}} = 4.606 R;\\ \\Delta S_{\\text{surroundings}} = 0$"
    },
    correctAnswer: "D",
    explanation: "In free expansion against vacuum ($P_{\\text{ext}} = 0$), $w = 0$ and $q = 0$.\n- Since $q_{\\text{surroundings}} = 0 \\implies \\Delta S_{\\text{surroundings}} = 0$.\n- For the ideal gas:\n$$\\Delta S_{\\text{system}} = n R \\ln\\left(\\frac{V_2}{V_1}\\right) = 2 R \\times 2.303 \\log_{10}\\left(\\frac{100}{10}\\right) = 4.606 R.$$",
    topic: "Chemical Thermodynamics - Entropy Changes in Free Expansion",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 46,
    number: 46,
    subject: "Chemistry",
    text: "The amount of carbon dioxide evolved upon complete combustion of $116\\text{ g}$ of $n$-butane is: (Given atomic masses in amu: $\\text{H} = 1, \\text{C} = 12, \\text{O} = 16$)",
    options: {
      A: "$352\\text{ g}$",
      B: "$322\\text{ g}$",
      C: "$176\\text{ g}$",
      D: "$362\\text{ g}$"
    },
    correctAnswer: "A",
    explanation: "Combustion reaction: $\\text{C}_4\\text{H}_{10} + \\frac{13}{2}\\text{O}_2 \\to 4\\text{CO}_2 + 5\\text{H}_2\\text{O}$.\n$$\\text{Molar mass of butane} = 58\\text{ g mol}^{-1} \\implies n = \\frac{116}{58} = 2\\text{ mol}$$\n$$\\text{Moles of }\\text{CO}_2 = 2 \\times 4 = 8\\text{ mol}$$\n$$\\text{Mass of }\\text{CO}_2 = 8 \\times 44 = 352\\text{ g}.$$",
    topic: "Some Basic Concepts of Chemistry - Stoichiometry Calculations",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 47,
    number: 47,
    subject: "Chemistry",
    text: "Consider a reversible Carnot thermodynamic cycle for $1.0\\text{ mol}$ of an ideal gas where process 1 is isothermal at $T_1$ from $V_1$ to $V_2$, process 2 is adiabatic, process 3 is isothermal at $T_2$ from $V_3$ to $V_4$, and process 4 is adiabatic. The correct expression for the total isothermal work $(w_1 + w_3)$ is: [use $R = 2\\text{ cal K}^{-1}\\text{ mol}^{-1}$]",
    options: {
      A: "$w_1 + w_3 = -2T_1\\ln\\left(\\frac{V_2}{V_1}\\right) - 2T_2\\ln\\left(\\frac{V_4}{V_3}\\right)$",
      B: "$w_2 + w_4 = \\Delta U_2 - \\Delta U_4$",
      C: "$w_1 + w_2 = 2T_1\\ln\\left(\\frac{V_2}{V_1}\\right)$",
      D: "$w_1 + w_2 + w_3 + w_4 = 0$"
    },
    correctAnswer: "A",
    explanation: "In isothermal reversible processes for $1.0\\text{ mol}$ with $R = 2\\text{ cal K}^{-1}\\text{ mol}^{-1}$:\n- $w_1 = -nRT_1\\ln\\left(\\frac{V_2}{V_1}\\right) = -2T_1\\ln\\left(\\frac{V_2}{V_1}\\right)$\n- $w_3 = -nRT_2\\ln\\left(\\frac{V_4}{V_3}\\right) = -2T_2\\ln\\left(\\frac{V_4}{V_3}\\right)$\nSum of isothermal works $w_1 + w_3 = -2T_1\\ln\\left(\\frac{V_2}{V_1}\\right) - 2T_2\\ln\\left(\\frac{V_4}{V_3}\\right)$.",
    topic: "Chemical Thermodynamics - Reversible Work in Cyclic Processes",
    difficulty: "Hard",
    image: null
  },
  {
    id: 48,
    number: 48,
    subject: "Chemistry",
    text: "Given below are two statements:\nAssertion A: The first ionization enthalpy of Oxygen is lower than that of Nitrogen and Fluorine.\nReason R: The loss of an electron from Oxygen leads to a stable half-filled $2p^3$ subshell.\nChoose the most appropriate answer:",
    options: {
      A: "Both A and R are correct and R is the correct explanation of A",
      B: "Both A and R are correct and R is NOT the correct explanation of A",
      C: "A is correct but R is not correct",
      D: "A is not correct but R is correct"
    },
    correctAnswer: "A",
    explanation: "Oxygen ($2s^2 2p^4$) has paired electrons in one of its $2p$ orbitals. Losing one electron relieves repulsion and achieves the stable half-filled $2p^3$ subshell, making its first ionization energy lower than that of Nitrogen ($2s^2 2p^3$) and Fluorine ($2s^2 2p^5$). Both A and R are correct, and R explains A.",
    topic: "Classification of Elements and Periodicity - Ionization Enthalpy Anomalies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 49,
    number: 49,
    subject: "Chemistry",
    text: "The correct statement regarding the valence orbitals and covalency is:",
    options: {
      A: "Boron has a maximum covalency of four",
      B: "Beryllium has three valence orbitals",
      C: "Magnesium has a maximum covalency of four",
      D: "Aluminium has five valence orbitals"
    },
    correctAnswer: "A",
    explanation: "Boron has 4 valence orbitals ($2s, 2p_x, 2p_y, 2p_z$) in its second shell and lacks $d$-orbitals, which limits its maximum covalency to four.",
    topic: "Chemical Bonding and Periodicity - Maximum Covalency of Second Period Elements",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 50,
    number: 50,
    subject: "Chemistry",
    text: "A protein undergoes reversible thermal denaturation from native state $N$ to denatured state $D$ according to $N \\rightleftharpoons D$. At $60^\\circ\\text{C}$, the concentrations of $N$ and $D$ are equal at equilibrium, and $\\Delta H^\\circ = 666\\text{ kJ mol}^{-1}$. The standard entropy change ($\\Delta S^\\circ$ in $\\text{kJ K}^{-1}\\text{ mol}^{-1}$) is closest to:",
    options: {
      A: "$2.0$",
      B: "$2000.0$",
      C: "$333.0$",
      D: "$11.1$"
    },
    correctAnswer: "A",
    explanation: "At equilibrium with $[N] = [D]$, $K = 1 \\implies \\Delta G^\\circ = 0$.\n$$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ = 0 \\implies \\Delta S^\\circ = \\frac{\\Delta H^\\circ}{T}$$\n$$T = 60 + 273 = 333\\text{ K} \\implies \\Delta S^\\circ = \\frac{666\\text{ kJ mol}^{-1}}{333\\text{ K}} = 2.0\\text{ kJ K}^{-1}\\text{ mol}^{-1}.$$",
    topic: "Chemical Thermodynamics - Denaturation & Equilibrium Entropy",
    difficulty: "Medium",
    image: null
  },
  {
    id: 51,
    number: 51,
    subject: "Chemistry",
    text: "Match the species in List I with their geometry in List II:\nList I (Species):\nA. $\\text{PCl}_5$\nB. $\\text{BrF}_5$\nC. $\\text{BF}_4^-$\nD. $[\\text{Ni}(\\text{CN})_4]^{2-}$\nList II (Geometry):\nI. Tetrahedral\nII. Square Planar\nIII. Trigonal bipyramidal\nIV. Square pyramidal",
    options: {
      A: "A-IV, B-III, C-I, D-II",
      B: "A-III, B-IV, C-I, D-II",
      C: "A-III, B-I, C-II, D-IV",
      D: "A-III, B-II, C-I, D-IV"
    },
    correctAnswer: "B",
    explanation: "- $\\text{PCl}_5$: Trigonal bipyramidal (III)\n- $\\text{BrF}_5$: Square pyramidal (IV)\n- $\\text{BF}_4^-$: Tetrahedral (I)\n- $[\\text{Ni}(\\text{CN})_4]^{2-}$: Square planar (II)\nMatch: A-III, B-IV, C-I, D-II.",
    topic: "Chemical Bonding and Molecular Structure - Molecular Geometries",
    difficulty: "Medium",
    image: null
  },
  {
    id: 52,
    number: 52,
    subject: "Chemistry",
    text: "The correct decreasing order of oxidation state of the underlined atom in each molecule is:",
    options: {
      A: "$\\text{P}_4\\text{O}_{10} > \\text{SO}_3 > \\text{H}_2\\text{O}$",
      B: "$\\underline{\\text{N}}_2\\text{O}_5 > \\underline{\\text{Al}}_2\\text{O}_3 > \\text{H}_2\\underline{\\text{S}}$",
      C: "$\\text{PbO}_2 > \\text{N}_2\\text{O}_3 > \\text{SO}_3$",
      D: "$\\text{P}_4\\text{O}_6 > \\text{Cl}_2\\text{O}_7 > \\text{AlH}_3$"
    },
    correctAnswer: "B",
    explanation: "Oxidation numbers: in $\\text{N}_2\\text{O}_5$, $\\text{N} = +5$; in $\\text{Al}_2\\text{O}_3$, $\\text{Al} = +3$; in $\\text{H}_2\\text{S}$, $\\text{S} = -2$. Decreasing order: $+5 > +3 > -2$.",
    topic: "Some Basic Concepts of Chemistry - Oxidation Number Calculation",
    difficulty: "Easy",
    image: null
  },
  {
    id: 53,
    number: 53,
    subject: "Chemistry",
    text: "Consider the schematic plot of radial wavefunction $\\psi_r$ against distance $r$ from the nucleus. An orbital whose radial wavefunction $\\psi_r$ intersects the radial axis $\\psi_r = 0$ at two distinct points before decaying to zero possesses:",
    options: {
      A: "Zero radial nodes",
      B: "One radial node",
      C: "Two radial nodes",
      D: "Three radial nodes"
    },
    correctAnswer: "C",
    explanation: "Radial nodes occur at values of $r$ where the radial wave function $\\psi_r = 0$. Since the wave function intersects the zero axis twice, the orbital possesses exactly 2 radial nodes (e.g. $3s$ orbital with $n - l - 1 = 3 - 0 - 1 = 2$).",
    topic: "Structure of Atom - Radial Wavefunctions & Nodes",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 54,
    number: 54,
    subject: "Chemistry",
    text: "Arrange the following compounds in the increasing order of molecular polarity:\nA. $\\text{CH}_3\\text{CH}_2\\text{OCH}_2\\text{CH}_3$ (Diethyl ether)\nB. $\\text{CH}_3\\text{CH}_2\\text{OH}$ (Ethanol)\nC. $\\text{CH}_3\\text{COCH}_3$ (Acetone)\nD. $\\text{CH}_3\\text{COOH}$ (Acetic acid)",
    options: {
      A: "$A < B < C < D$",
      B: "$C < A < D < B$",
      C: "$C < A < B < D$",
      D: "$A < C < B < D$"
    },
    correctAnswer: "D",
    explanation: "Polarity order: Ether ($A$) has weak dipole < Ketone ($C$) has polar carbonyl dipole < Alcohol ($B$) has strong hydrogen bonding < Carboxylic acid ($D$) has extensive hydrogen bonding and dimerization. Order: $A < C < B < D$.",
    topic: "Chemical Bonding and Molecular Structure - Dipole Moments & Polarity",
    difficulty: "Medium",
    image: null
  },
  {
    id: 55,
    number: 55,
    subject: "Chemistry",
    text: "According to Molecular Orbital Theory (MOT), the highest occupied molecular orbital (HOMO) for the $\\text{Ne}_2$ molecule ($20\\text{ electrons}$) is:",
    options: {
      A: "$\\pi_{2p}$",
      B: "$\\sigma_{2p}$",
      C: "$\\pi^*_{2p}$",
      D: "$\\sigma^*_{2p}$"
    },
    correctAnswer: "D",
    explanation: "For $20\\text{ electrons}$ in $\\text{Ne}_2$:\n$$\\sigma_{1s}^2\\ \\sigma^*_{1s}^2\\ \\sigma_{2s}^2\\ \\sigma^*_{2s}^2\\ \\sigma_{2p_z}^2\\ (\\pi_{2p_x}^2 = \\pi_{2p_y}^2)\\ (\\pi^*_{2p_x}^2 = \\pi^*_{2p_y}^2)\\ \\sigma^*_{2p_z}^2$$\nThe highest filled molecular orbital is the antibonding $\\sigma^*_{2p_z}$ orbital.",
    topic: "Chemical Bonding and Molecular Structure - Molecular Orbital Theory (MOT)",
    difficulty: "Medium-Hard",
    image: null
  }
];
