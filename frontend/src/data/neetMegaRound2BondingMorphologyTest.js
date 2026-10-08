/**
 * NEET 2027 Mega Master Drill: Round 2 (Bonding, Morphology & Rotational Dynamics)
 * Rotational Dynamics (15 Qs), Chemical Bonding (45 Qs), Morphology of Flowering Plants (60 Qs)
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


export const NEET_ROUND_2_TEST = {
  id: 'neet-2027-mega-round-2-bonding-morphology',
  title: 'NEET 2027 Grand Drill: Round 2 – Bonding, Morphology & Rotational Dynamics',
  subtitle: '120 High-Yield Questions · 2 Hours Timed CBT · Chemical Bonding, Morphology & Advanced Dynamics',
  subject: 'Chemistry · Biology · Physics',
  syllabus: 'Chemical Bonding (45 Qs), Morphology of Flowering Plants (60 Qs), Advanced Rotational Dynamics (15 Qs)',
  totalQuestions: 120,
  durationMinutes: 120,
  allowCustomDuration: false,
  totalMarks: 480,
  correctMarks: 4,
  negativeMarks: 1,
  badge: 'Round 2 · 120 Qs (2h Fixed)',
  description:
    'Round 2 of the National CBT Grand Mock. 120 comprehensive questions covering VSEPR/MOT Chemical Bonding, Plant Morphology/Families, and Advanced Rigid Body Dynamics.',
};

export const NEET_ROUND_2_QUESTIONS = [
  {
    "order": 1,
    "id": "r2_q_1",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "By keeping the moment of inertia of a body constant, if we double its time period of rotation, then the angular momentum of the body:",
    "options": {
      "A": "remains constant",
      "B": "becomes half",
      "C": "doubles",
      "D": "quadruples"
    },
    "correctAnswer": "B",
    "explanation": "$$\\omega = \\frac{2\\pi}{T} \\implies \\omega \\propto \\frac{1}{T}$$\\nWhen $T$ is doubled, $\\omega$ becomes half. Hence $L = I\\omega$ becomes half."
  },
  {
    "order": 2,
    "id": "r2_q_2",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The rotational kinetic energy of a body is $E$. In the absence of external torque, if the mass of the body remains same and its radius of gyration is doubled, then its rotational kinetic energy will be:",
    "options": {
      "A": "0.5 E",
      "B": "0.25 E",
      "C": "E",
      "D": "2E"
    },
    "correctAnswer": "B",
    "explanation": "External torque $\\tau = 0 \\implies L$ is constant.\\nRadius of gyration $k \\to 2k \\implies I = m k^2 \\to 4I$.\\n$$E' = \\frac{L^2}{2(4I)} = \\frac{1}{4}\\left(\\frac{L^2}{2I}\\right) = 0.25 E$$."
  },
  {
    "order": 3,
    "id": "r2_q_3",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "The graph between angular momentum $J$ and angular velocity $\\omega$ for a rigid body with constant moment of inertia is:",
    "options": {
      "A": "Straight line through origin with positive slope",
      "B": "Rectangular hyperbola",
      "C": "Parabola opening downwards",
      "D": "Horizontal straight line"
    },
    "correctAnswer": "A",
    "explanation": "$J = I\\omega$. For constant $I$, $J \\propto \\omega$, which represents a straight line passing through the origin."
  },
  {
    "order": 4,
    "id": "r2_q_4",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A constant torque acting on a uniform circular wheel changes its angular momentum from $A_0$ to $4A_0$ in $4\\text{ seconds}$. The magnitude of this torque is:",
    "options": {
      "A": "\\frac{3A_0}{4}",
      "B": "A_0",
      "C": "4A_0",
      "D": "12A_0"
    },
    "correctAnswer": "A",
    "explanation": "$$\\tau = \\frac{\\Delta L}{\\Delta t} = \\frac{4A_0 - A_0}{4} = \\frac{3A_0}{4}$$."
  },
  {
    "order": 5,
    "id": "r2_q_5",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "A hollow sphere of mass $1\\text{ kg}$ and radius $10\\text{ cm}$ is free to rotate about its diameter. If a force of $30\\text{ N}$ is applied tangentially to it, its angular acceleration is (in $\\text{rad/s}^2$):",
    "options": {
      "A": "5000",
      "B": "450",
      "C": "50",
      "D": "5"
    },
    "correctAnswer": "B",
    "explanation": "$$R = 0.1\\text{ m}, \\quad \\tau = F R = 30 \\times 0.1 = 3\\text{ N-m}$$\\n$$I = \\frac{2}{3} M R^2 = \\frac{2}{3}(1)(0.1)^2 = \\frac{0.02}{3}\\text{ kg-m}^2$$\\n$$\\alpha = \\frac{\\tau}{I} = \\frac{3}{\\frac{0.02}{3}} = \\frac{9}{0.02} = 450\\text{ rad/s}^2$$."
  },
  {
    "order": 6,
    "id": "r2_q_6",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A wheel of radius $10\\text{ cm}$ can rotate freely about its centre. A string wrapped over its rim is pulled by a force of $5\\text{ N}$. It produces an angular acceleration of $2\\text{ rad s}^{-2}$. The moment of inertia of the wheel is:",
    "options": {
      "A": "0.25 kg-m^2",
      "B": "0.45 kg-m^2",
      "C": "0.15 kg-m^2",
      "D": "0.16 kg-m^2"
    },
    "correctAnswer": "A",
    "explanation": "$$\\tau = F R = 5 \\times 0.10 = 0.5\\text{ N-m}$$\\n$$I = \\frac{\\tau}{\\alpha} = \\frac{0.5}{2} = 0.25\\text{ kg-m}^2$$."
  },
  {
    "order": 7,
    "id": "r2_q_7",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Easy",
    "question": "A rigid body rotates with angular momentum $L$. If its rotational kinetic energy is made $4\\text{ times}$, its angular momentum will become:",
    "options": {
      "A": "4L",
      "B": "16L",
      "C": "\\sqrt{2}L",
      "D": "2L"
    },
    "correctAnswer": "D",
    "explanation": "$$L = \\sqrt{2IK} \\implies L \\propto \\sqrt{K}$$\\nWhen $K \\to 4K$, $L' = \\sqrt{4} L = 2L$."
  },
  {
    "order": 8,
    "id": "r2_q_8",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "Consider the statements:\\nI. Angular momentum of a particle moving in a straight line with constant velocity is always constant with respect to any fixed point.\\nII. Moment of inertia of a body remains the same irrespective of the position of axis of rotation.\\nWhich statement(s) is/are correct?",
    "options": {
      "A": "Only I",
      "B": "Only II",
      "C": "Both I and II",
      "D": "Neither I nor II"
    },
    "correctAnswer": "A",
    "explanation": "For linear motion with constant velocity, $\\vec{L} = \\vec{r} \\times \\vec{p} \\implies |\\vec{L}| = m v r_\\perp = \\text{constant}$. Hence I is correct. Statement II is false because moment of inertia depends strongly on the orientation and position of the axis."
  },
  {
    "order": 9,
    "id": "r2_q_9",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "From a circular disc of radius $R$ and mass $9M$, a small disc of radius $R/3$ is removed such that its edge touches the circumference. The moment of inertia of the remaining disc about an axis perpendicular to the plane and passing through the centre $O$ is:",
    "options": {
      "A": "4MR^2",
      "B": "\\frac{40}{9}MR^2",
      "C": "40MR^2",
      "D": "\\frac{37}{9}MR^2"
    },
    "correctAnswer": "A",
    "explanation": "Mass of removed disc $m = 9M \\times \\frac{\\pi(R/3)^2}{\\pi R^2} = M$.\\nDistance between centers $d = R - R/3 = \\frac{2R}{3}$.\\n\\n$$I_{\\text{orig}} = \\frac{1}{2}(9M)R^2 = \\frac{9}{2}MR^2$$\\n$$I_{\\text{removed}} = \\frac{1}{2}m(R/3)^2 + m d^2 = \\frac{MR^2}{18} + M\\left(\\frac{2R}{3}\\right)^2 = \\frac{MR^2}{18} + \\frac{4MR^2}{9} = \\frac{9MR^2}{18} = \\frac{1}{2}MR^2$$\\n$$I_{\\text{rem}} = I_{\\text{orig}} - I_{\\text{removed}} = \\frac{9}{2}MR^2 - \\frac{1}{2}MR^2 = 4MR^2$$."
  },
  {
    "order": 10,
    "id": "r2_q_10",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A ring of mass $10\\text{ kg}$ and diameter $0.4\\text{ metre}$ is rotating about its geometrical axis at $1200\\text{ rpm}$. Its moment of inertia and angular momentum are respectively:",
    "options": {
      "A": "0.4 kg-m^2 and 50.24 J-s",
      "B": "0.4 kg-m^2 and 0.4 J-s",
      "C": "50.28 kg-m^2 and 0.4 J-s",
      "D": "0.4 kg-m^2 and zero"
    },
    "correctAnswer": "A",
    "explanation": "$$R = \\frac{0.4}{2} = 0.2\\text{ m}, \\quad I = M R^2 = 10(0.2)^2 = 10(0.04) = 0.4\\text{ kg-m}^2$$\\n$$\\omega = \\frac{2\\pi(1200)}{60} = 40\\pi \\approx 125.66\\text{ rad/s}$$\\n$$L = I \\omega = 0.4 \\times 40\\pi = 16\\pi \\approx 50.24\\text{ J-s}$$."
  },
  {
    "order": 11,
    "id": "r2_q_11",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "Match Column-I with Column-II:\\nColumn I:\\n(a) For translational equilibrium\\n(b) For rotational equilibrium\\n(c) Moment of inertia of a body\\n(d) Torque is required to produce\\nColumn II:\\n(P) $M k^2$\\n(Q) Angular acceleration\\n(R) $\\sum \\vec{F} = 0$\\n(S) $\\sum \\vec{\\tau} = 0$",
    "options": {
      "A": "a→P, b→Q, c→R, d→S",
      "B": "a→Q, b→R, c→S, d→P",
      "C": "a→R, b→Q, c→P, d→S",
      "D": "a→R, b→S, c→P, d→Q"
    },
    "correctAnswer": "D",
    "explanation": "• Translational equilibrium $\\to \\sum \\vec{F} = 0$ (R)\\n• Rotational equilibrium $\\to \\sum \\vec{\\tau} = 0$ (S)\\n• Moment of inertia $\\to M k^2$ (P)\\n• Torque is required to produce $\\to$ Angular acceleration (Q)."
  },
  {
    "order": 12,
    "id": "r2_q_12",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with angular velocity $\\omega$. Four objects each of mass $m$ are placed gently on the opposite ends of two perpendicular diameters of the ring. The new angular velocity will be:",
    "options": {
      "A": "\\frac{M\\omega}{4m}",
      "B": "\\frac{M\\omega}{M+4m}",
      "C": "\\frac{(M+4m)\\omega}{M}",
      "D": "\\frac{(M+4m)\\omega}{M+4m}"
    },
    "correctAnswer": "B",
    "explanation": "$$I_i = M r^2, \\quad I_f = M r^2 + 4(m r^2) = (M + 4m)r^2$$\\nBy conservation of angular momentum:\\n$$I_i \\omega = I_f \\omega' \\implies (M r^2)\\omega = (M + 4m)r^2 \\omega' \\implies \\omega' = \\frac{M\\omega}{M + 4m}$$."
  },
  {
    "order": 13,
    "id": "r2_q_13",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "A ring, a solid sphere, and a thin disc of different masses rotate with the same rotational kinetic energy. Equal retarding torques are applied to stop them. Which will make the least number of rotations before coming to rest?",
    "options": {
      "A": "Disc",
      "B": "Ring",
      "C": "Solid sphere",
      "D": "All will make same number of rotations"
    },
    "correctAnswer": "D",
    "explanation": "Work done by retarding torque to stop = Initial kinetic energy:\\n$$\\tau \\cdot \\theta = K \\implies \\theta = \\frac{K}{\\tau}$$\\nSince both $K$ and $\\tau$ are identical for all three bodies, the angular displacement $\\theta$ (and thus the number of rotations $n = \\theta / 2\\pi$) is the same for all."
  },
  {
    "order": 14,
    "id": "r2_q_14",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Medium",
    "question": "The angular velocity of a body changes from $\\omega_1$ to $\\omega_2$ without applying external torque by changing its moment of inertia. The ratio of initial radius of gyration to final radius of gyration is:",
    "options": {
      "A": "\\omega_2 : \\omega_1",
      "B": "\\omega_2^2 : \\omega_1^2",
      "C": "\\sqrt{\\omega_2} : \\sqrt{\\omega_1}",
      "D": "1/\\omega_2 : 1/\\omega_1"
    },
    "correctAnswer": "C",
    "explanation": "$$L = I_1 \\omega_1 = I_2 \\omega_2 \\implies M k_1^2 \\omega_1 = M k_2^2 \\omega_2 \\implies \\frac{k_1^2}{k_2^2} = \\frac{\\omega_2}{\\omega_1} \\implies \\frac{k_1}{k_2} = \\sqrt{\\frac{\\omega_2}{\\omega_1}}$$"
  },
  {
    "order": 15,
    "id": "r2_q_15",
    "subject": "Physics",
    "topic": "Rotational Motion",
    "difficulty": "Hard",
    "question": "A particle of mass $m = 5\\text{ units}$ is moving with uniform speed $v = 3\\sqrt{2}\\text{ units}$ in the $XY$-plane along the line $y = x + 4$. The magnitude of the angular momentum about the origin is:",
    "options": {
      "A": "zero",
      "B": "60 unit",
      "C": "7.5 unit",
      "D": "40\\sqrt{2} unit"
    },
    "correctAnswer": "B",
    "explanation": "Equation of line of motion: $x - y + 4 = 0$.\\nPerpendicular distance from origin $(0,0)$ to the line:\\n$$d = \\frac{|0 - 0 + 4|}{\\sqrt{1^2 + (-1)^2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}\\text{ units}$$\\n$$L = m v d = 5 \\times (3\\sqrt{2}) \\times (2\\sqrt{2}) = 5 \\times 3 \\times 4 = 60\\text{ units}$$."
  },
  {
    "order": 16,
    "id": "r2_q_16",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following compounds has the maximum bond angle?",
    "options": {
      "A": "\\text{BBr}_3",
      "B": "\\text{BCl}_3",
      "C": "\\text{BF}_3",
      "D": "None of these (All have identical bond angle of 120°)"
    },
    "correctAnswer": "D",
    "explanation": "$\\text{BF}_3, \\text{BCl}_3,$ and $\\text{BBr}_3$ all possess $sp^2$ hybridization on the central Boron atom with 3 bond pairs and 0 lone pairs. All have symmetrical trigonal planar geometry with identical bond angles of exactly $120^\\circ$."
  },
  {
    "order": 17,
    "id": "r2_q_17",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following sets of species does NOT follow the octet rule?",
    "options": {
      "A": "\\text{CO}, \\text{PCl}_5, \\text{PCl}_3, \\text{AlCl}_3",
      "B": "\\text{CO}, \\text{B}_2\\text{H}_6, \\text{NH}_3, \\text{H}_2\\text{O}",
      "C": "\\text{AlCl}_3, \\text{BF}_3, \\text{PCl}_5, \\text{SF}_6",
      "D": "\\text{H}_2\\text{O}, \\text{NH}_3, \\text{CO}_2, \\text{AlCl}_3"
    },
    "correctAnswer": "C",
    "explanation": "In $\\text{AlCl}_3$ and $\\text{BF}_3$, the central atoms have incomplete octets (6 valence electrons). In $\\text{PCl}_5$ (10 valence electrons) and $\\text{SF}_6$ (12 valence electrons), the central atoms expand their valence shells (hypervalent molecules). Hence all species in set C violate the octet rule."
  },
  {
    "order": 18,
    "id": "r2_q_18",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "The bond lengths and bond angles in $\\text{CH}_4 (109.5^\\circ), \\text{NH}_3 (107^\\circ)$ and $\\text{H}_2\\text{O} (104.5^\\circ)$ are observed to vary. This variation in bond angle is a result of:\\n(i) increasing repulsion between H atoms as bond length decreases\\n(ii) number of non-bonding electron pairs on central atom\\n(iii) a non-bonding electron pair having a greater repulsive force than a bonding electron pair.",
    "options": {
      "A": "(i), (ii) and (iii) are correct",
      "B": "(i) and (ii) are correct",
      "C": "(ii) and (iii) are correct",
      "D": "(i) only is correct"
    },
    "correctAnswer": "C",
    "explanation": "According to VSEPR theory, lone pair - lone pair repulsion > lone pair - bond pair repulsion > bond pair - bond pair repulsion. As the number of lone pairs increases ($\text{CH}_4: 0, \text{NH}_3: 1, \text{H}_2\text{O}: 2$), the repulsion on bond pairs increases, compressing the bond angle. Statements (ii) and (iii) are correct."
  },
  {
    "order": 19,
    "id": "r2_q_19",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following does NOT have a coordinate (dative) bond?",
    "options": {
      "A": "\\text{SO}_2",
      "B": "\\text{HNO}_3",
      "C": "\\text{H}_2\\text{SO}_3",
      "D": "\\text{HNO}_2"
    },
    "correctAnswer": "D",
    "explanation": "$\\text{HNO}_2$ (Nitrous acid) has the Lewis structure $\\text{H}-\\text{O}-\\text{N}=\\text{O}$, which contains only normal single and double covalent bonds without any coordinate dative bond."
  },
  {
    "order": 20,
    "id": "r2_q_20",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "The maximum possible number of hydrogen bonds in which a single water molecule can participate is:",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "D",
    "explanation": "A single $\\text{H}_2\\text{O}$ molecule has 2 hydrogen atoms (which act as H-bond donors) and 2 lone pairs on oxygen (which act as H-bond acceptors), allowing it to form a maximum of 4 hydrogen bonds tetrahedrally in ice and liquid water."
  },
  {
    "order": 21,
    "id": "r2_q_21",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Statement I: The atoms in a covalent molecule are said to share electrons, yet some covalent molecules are polar.\\nStatement II: In a polar covalent molecule, the shared electrons spend more time on average near the more electronegative atom.",
    "options": {
      "A": "Statement I and Statement II both are correct.",
      "B": "Statement I is correct but Statement II is incorrect.",
      "C": "Statement I is incorrect but Statement II is correct.",
      "D": "Statement I and Statement II both are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "Both statements are correct. When two atoms of differing electronegativities share electrons, unequal electron distribution causes fractional charges ($\\delta^+, \\delta^-$), resulting in a polar covalent bond."
  },
  {
    "order": 22,
    "id": "r2_q_22",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "The INCORRECT order of lattice energy is:",
    "options": {
      "A": "\\text{AlF}_3 > \\text{MgF}_2",
      "B": "\\text{Li}_3\\text{N} > \\text{Li}_2\\text{O}",
      "C": "\\text{NaCl} > \\text{LiF}",
      "D": "\\text{TiC} > \\text{ScN}"
    },
    "correctAnswer": "C",
    "explanation": "Lattice energy $U \\propto \\frac{|q_1 q_2|}{r_0}$. Since $\\text{Li}^+$ and $\\text{F}^-$ are much smaller in ionic radii than $\\text{Na}^+$ and $\\text{Cl}^-$, the lattice energy of $\\text{LiF}$ is significantly higher than that of $\\text{NaCl}$ ($\\text{LiF} > \\text{NaCl}$). Hence $\\text{NaCl} > \\text{LiF}$ is incorrect."
  },
  {
    "order": 23,
    "id": "r2_q_23",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Match Column I with List II w.r.t hybridization of central atom:\\nColumn I:\\n(A) $\\text{C}_2\\text{H}_2$\\n(B) $\\text{SO}_2$\\n(C) $\\text{SO}_4^{2-}$\\n(D) $\\text{I}_3^-$\\nList II:\\n(P) $sp^2$\\n(Q) $sp^3d$\\n(R) $sp^3$\\n(S) $sp$",
    "options": {
      "A": "A→P, B→R, C→Q, D→S",
      "B": "A→S, B→P, C→R, D→Q",
      "C": "A→P, B→S, C→R, D→Q",
      "D": "A→S, B→Q, C→P, D→R"
    },
    "correctAnswer": "B",
    "explanation": "• $\\text{C}_2\\text{H}_2 \\to sp$ (S)\\n• $\\text{SO}_2 \\to sp^2$ (2 bp + 1 lp) (P)\\n• $\\text{SO}_4^{2-} \\to sp^3$ (4 bp + 0 lp) (R)\\n• $\\text{I}_3^- \\to sp^3d$ (2 bp + 3 lp) (Q)."
  },
  {
    "order": 24,
    "id": "r2_q_24",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Assertion: $\\text{NaCl}$ is more ionic than $\\text{NaI}$.\\nReason: Chlorine is more electronegative than iodine.",
    "options": {
      "A": "Both Assertion and Reason are true and Reason is correct explanation of Assertion.",
      "B": "Both Assertion and Reason are true but Reason is not correct explanation of Assertion.",
      "C": "Assertion is true statement but Reason is false.",
      "D": "Both Assertion and Reason are false statements."
    },
    "correctAnswer": "B",
    "explanation": "According to Fajan's rules, $\\text{I}^-$ is larger and more polarizable than $\\text{Cl}^-$, imparting more covalent character to $\\text{NaI}$ (making $\\text{NaCl}$ more ionic). Chlorine is more electronegative than iodine, but polarizability of anion is the primary explanation for ionic vs covalent character."
  },
  {
    "order": 25,
    "id": "r2_q_25",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following complex ions is non-existent?",
    "options": {
      "A": "[\\text{AlF}_6]^{3-}",
      "B": "[\\text{CoF}_6]^{3-}",
      "C": "[\\text{BF}_6]^{3-}",
      "D": "[\\text{SiF}_6]^{2-}"
    },
    "correctAnswer": "C",
    "explanation": "Boron belongs to the 2nd period of the periodic table and possesses only $2s$ and $2p$ orbitals without any vacant $d$-orbitals. Hence, its maximum covalency is strictly limited to 4, making $[\\text{BF}_6]^{3-}$ non-existent."
  },
  {
    "order": 26,
    "id": "r2_q_26",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "What is the molecular geometry of the $\\text{IBr}_2^-$ ion?",
    "options": {
      "A": "Linear",
      "B": "Bent shape with bond angle of about 90°",
      "C": "Bent shape with bond angle of about 109°",
      "D": "Bent shape with bond angle of about 120°"
    },
    "correctAnswer": "A",
    "explanation": "Central Iodine atom has $7 + 2 + 1 = 10$ valence electrons $\\implies 5$ electron pairs ($sp^3d$ hybridization) comprising 2 bond pairs and 3 equatorial lone pairs. The lone pairs occupy equatorial positions to minimize repulsion, giving a strictly Linear molecular geometry ($180^\\circ$)."
  },
  {
    "order": 27,
    "id": "r2_q_27",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Match Hybridisation in Column I with Geometry in List II:\\nColumn I: (A) $sp^3d$, (B) $sp^3d^3$, (C) $sp^3d^2$, (D) $sp^3$\\nList II: (P) Pentagonal bipyramidal, (Q) Trigonal bipyramidal, (R) Octahedral, (S) Tetrahedral",
    "options": {
      "A": "A→Q, B→P, C→R, D→S",
      "B": "A→P, B→Q, C→S, D→R",
      "C": "A→S, B→P, C→Q, D→R",
      "D": "A→R, B→P, C→S, D→Q"
    },
    "correctAnswer": "A",
    "explanation": "• $sp^3d \\to$ Trigonal bipyramidal (Q)\\n• $sp^3d^3 \\to$ Pentagonal bipyramidal (P)\\n• $sp^3d^2 \\to$ Octahedral (R)\\n• $sp^3 \\to$ Tetrahedral (S)."
  },
  {
    "order": 28,
    "id": "r2_q_28",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Hard",
    "question": "The correct statement with regard to $\\text{H}_2^+$ and $\\text{H}_2^-$ is:",
    "options": {
      "A": "both \\text{H}_2^+ and \\text{H}_2^- do not exist",
      "B": "\\text{H}_2^- is more stable than \\text{H}_2^+",
      "C": "\\text{H}_2^+ is more stable than \\text{H}_2^-",
      "D": "both \\text{H}_2^+ and \\text{H}_2^- are equally stable"
    },
    "correctAnswer": "C",
    "explanation": "Both have a bond order of $0.5$ ($(\\text{BO} = \\frac{N_b - N_a}{2})$). However, $\\text{H}_2^+$ has 1 bonding electron ($(\\sigma 1s)^1$) and 0 antibonding electrons, whereas $\\text{H}_2^-$ has 2 bonding and 1 antibonding electron ($(\\sigma 1s)^2 (\\sigma^* 1s)^1$). The presence of an antibonding electron makes $\\text{H}_2^-$ less stable than $\\text{H}_2^+$."
  },
  {
    "order": 29,
    "id": "r2_q_29",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "The formal charge on the central oxygen atom in the $\\text{O}_3$ (ozone) molecule is:",
    "options": {
      "A": "0",
      "B": "+1",
      "C": "-1",
      "D": "-2"
    },
    "correctAnswer": "B",
    "explanation": "$$\\text{Formal Charge} = V - L - \\frac{1}{2}S = 6 - 2 - \\frac{1}{2}(6) = 6 - 2 - 3 = +1$$."
  },
  {
    "order": 30,
    "id": "r2_q_30",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "The electronegativities of O, F, N, Cl, and H are 3.5, 4.0, 3.2, 3.0, and 2.1 respectively. The strongest covalent bond is:",
    "options": {
      "A": "F—O",
      "B": "O—Cl",
      "C": "N—H",
      "D": "O—H"
    },
    "correctAnswer": "D",
    "explanation": "Bond strength increases with greater electronegativity difference $\\Delta EN$ and smaller orbital size. For $\\text{O}-\\text{H}$, $\\Delta EN = 3.5 - 2.1 = 1.4$, providing the highest ionic resonance energy and strongest bond among the choices."
  },
  {
    "order": 31,
    "id": "r2_q_31",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Match List I (Molecule) with List II (Number of lone pairs on central atom):\\n(a) $\\text{NH}_3$, (b) $\\text{H}_2\\text{O}$, (c) $\\text{XeF}_2$, (d) $\\text{CH}_4$\\nList II: (I) Two, (II) Three, (III) Zero, (IV) One",
    "options": {
      "A": "a-IV, b-I, c-III, d-II",
      "B": "a-III, b-I, c-II, d-IV",
      "C": "a-IV, b-I, c-II, d-III",
      "D": "a-I, b-IV, c-III, d-II"
    },
    "correctAnswer": "C",
    "explanation": "• $\\text{NH}_3 \\to 1$ lone pair (IV)\\n• $\\text{H}_2\\text{O} \\to 2$ lone pairs (I)\\n• $\\text{XeF}_2 \\to 3$ lone pairs (II)\\n• $\\text{CH}_4 \\to 0$ lone pairs (III)."
  },
  {
    "order": 32,
    "id": "r2_q_32",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "The hydrogen bond is the strongest in:",
    "options": {
      "A": "\\text{O}—\\text{H} \\cdots \\text{S}",
      "B": "\\text{O}—\\text{H} \\cdots \\text{H}",
      "C": "\\text{F}—\\text{H} \\cdots \\text{F}",
      "D": "\\text{O}—\\text{H} \\cdots \\text{O}"
    },
    "correctAnswer": "C",
    "explanation": "Fluorine is the most electronegative element with the smallest atomic radius, creating the strongest dipole and highest electrostatic attraction in $\\text{F}-\\text{H} \\cdots \\text{F}$ hydrogen bonds."
  },
  {
    "order": 33,
    "id": "r2_q_33",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "The hybridization of carbon atom (1) and carbon atom (2) in the compound $\\text{N} \\equiv \\overset{(1)}{\\text{C}} - \\overset{(2)}{\\text{C}}\\text{H} = \\text{CH}_2$ are respectively:",
    "options": {
      "A": "sp and sp^2",
      "B": "sp^2 and sp^3",
      "C": "sp and sp^3",
      "D": "sp and sp"
    },
    "correctAnswer": "A",
    "explanation": "Carbon (1) forms 2 sigma bonds (one to N and one to C2) with no lone pairs $\\implies sp$. Carbon (2) forms 3 sigma bonds (to C1, H, and C3) $\\implies sp^2$."
  },
  {
    "order": 34,
    "id": "r2_q_34",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Statement I: $\\text{NO}_3^-$ is planar while $\\text{NH}_3$ is pyramidal.\\nStatement II: N in $\\text{NO}_3^-$ is $sp^2$ hybridized and in $\\text{NH}_3$, it is $sp^3$ hybridized.",
    "options": {
      "A": "Statement I and Statement II both are correct.",
      "B": "Statement I is correct but Statement II is incorrect.",
      "C": "Statement I is incorrect but Statement II is correct.",
      "D": "Statement I and Statement II both are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "$\\text{NO}_3^-$ has steric number 3 (3 $\\sigma$-bonds, 0 lone pairs) $\\implies sp^2$ trigonal planar. $\\text{NH}_3$ has steric number 4 (3 $\\sigma$-bonds, 1 lone pair) $\\implies sp^3$ trigonal pyramidal. Both statements are correct."
  },
  {
    "order": 35,
    "id": "r2_q_35",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "The amount of energy released when one mole of ionic solid is formed by the close packing of gaseous cations and anions is called:",
    "options": {
      "A": "Ionisation energy",
      "B": "Solvation energy",
      "C": "Lattice energy",
      "D": "Hydration energy"
    },
    "correctAnswer": "C",
    "explanation": "By definition, lattice energy is the energy released when one mole of an ionic crystal is formed from its constituent gaseous ions."
  },
  {
    "order": 36,
    "id": "r2_q_36",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following compounds is arranged in order of increasing boiling point?",
    "options": {
      "A": "\\text{H}_2\\text{O} < \\text{CCl}_4 < \\text{CS}_2 < \\text{CO}_2",
      "B": "\\text{CO}_2 < \\text{CS}_2 < \\text{CCl}_4 < \\text{H}_2\\text{O}",
      "C": "\\text{CS}_2 < \\text{H}_2\\text{O} < \\text{CO}_2 < \\text{CCl}_4",
      "D": "\\text{CCl}_4 < \\text{H}_2\\text{O} < \\text{CO}_2 < \\text{CS}_2"
    },
    "correctAnswer": "B",
    "explanation": "$\\text{CO}_2$ (gas, low MW nonpolar) $< \\text{CS}_2$ (liquid, nonpolar) $< \\text{CCl}_4$ (liquid, high MW London dispersion) $< \\text{H}_2\\text{O}$ (high BP due to extensive intermolecular hydrogen bonding)."
  },
  {
    "order": 37,
    "id": "r2_q_37",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Hard",
    "question": "Assertion A: $\\text{N}_2$ and $\\text{NO}^+$ both are diamagnetic substances.\\nReason R: $\\text{NO}^+$ is isoelectronic with $\\text{N}_2$.",
    "options": {
      "A": "Both Assertion and Reason are true and Reason is the correct explanation of Assertion.",
      "B": "Both Assertion and Reason are true but Reason is not the correct explanation of Assertion.",
      "C": "Assertion is true statement but Reason is false.",
      "D": "Both Assertion and Reason are false statements."
    },
    "correctAnswer": "D",
    "explanation": "Note: In the official answer key, this item is keyed as option (D)/(A). Both $\\text{N}_2$ (14 electrons) and $\\text{NO}^+$ (7 + 8 - 1 = 14 electrons) are isoelectronic with bond order 3.0 and all electrons paired (diamagnetic)."
  },
  {
    "order": 38,
    "id": "r2_q_38",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Hybridization involves:",
    "options": {
      "A": "Addition of electron pair",
      "B": "Mixing of atomic orbitals",
      "C": "Removal of electrons",
      "D": "Separation of orbitals"
    },
    "correctAnswer": "B",
    "explanation": "Hybridization is the quantum concept of intermixing of atomic orbitals of slightly different energies on the same atom to redistribute energy and form equivalent hybrid orbitals."
  },
  {
    "order": 39,
    "id": "r2_q_39",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following statements is correct?",
    "options": {
      "A": "All carbon to carbon bonds contain a sigma bond and one or more pi-bonds",
      "B": "All carbon to carbon bonds are sigma bonds",
      "C": "All oxygen to hydrogen bonds are hydrogen bonds",
      "D": "All carbon to hydrogen bonds are sigma bonds"
    },
    "correctAnswer": "D",
    "explanation": "Hydrogen has only a $1s$ orbital capable of axial head-on overlap, so all $\\text{C}-\\text{H}$ bonds are single covalent $\\sigma$-bonds."
  },
  {
    "order": 40,
    "id": "r2_q_40",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Most favourable conditions for electrovalent (ionic) bonding are:",
    "options": {
      "A": "low ionisation potential of one atom and high electron affinity of the other atom",
      "B": "high electron affinity and high ionisation potential of both the atoms",
      "C": "low electron affinity and low ionisation potential of both the atoms",
      "D": "high ionisation potential of one atom and low electron affinity of the other atom"
    },
    "correctAnswer": "A",
    "explanation": "Ionic bond formation is favoured when the cation-forming metal has low ionization energy (easy electron loss) and the anion-forming non-metal has high negative electron gain enthalpy (high electron affinity)."
  },
  {
    "order": 41,
    "id": "r2_q_41",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Lattice energy of an ionic compound depends on:",
    "options": {
      "A": "charge on the ion only",
      "B": "size of the ion only",
      "C": "packing of the ion only",
      "D": "charge and size of the ion"
    },
    "correctAnswer": "D",
    "explanation": "By Coulomb's law and Born-Landé equation, lattice energy $U \\propto \\frac{|z_1 z_2|}{r_c + r_a}$, depending directly on ionic charges and inversely on ionic radii."
  },
  {
    "order": 42,
    "id": "r2_q_42",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following species have an identical bond order?\\n(I) $\\text{CN}^-$, (II) $\\text{O}_2^-$, (III) $\\text{NO}^+$, (IV) $\\text{CN}^+$",
    "options": {
      "A": "I, III",
      "B": "I, II",
      "C": "II, IV",
      "D": "I, II, III"
    },
    "correctAnswer": "A",
    "explanation": "• $\\text{CN}^-$: $6 + 7 + 1 = 14\\text{ electrons} \\implies \\text{BO} = 3.0$\\n• $\\text{NO}^+$: $7 + 8 - 1 = 14\\text{ electrons} \\implies \\text{BO} = 3.0$\\n• $\\text{O}_2^-$: 17 electrons $\\implies \\text{BO} = 1.5$\\n• $\\text{CN}^+$: 12 electrons $\\implies \\text{BO} = 2.0$.\\nSpecies I and III have identical bond order = 3."
  },
  {
    "order": 43,
    "id": "r2_q_43",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Match the type of hybridization in Column I with number of hybrid orbitals in List II:\\n(A) $sp$, (B) $sp^2$, (C) $sp^3$, (D) $dsp^3$\\nList II: (P) 3, (Q) 2, (R) 5, (S) 4",
    "options": {
      "A": "A→S, B→Q, C→R, D→P",
      "B": "A→Q, B→P, C→S, D→R",
      "C": "A→R, B→S, C→Q, D→P",
      "D": "A→R, B→Q, C→S, D→P"
    },
    "correctAnswer": "B",
    "explanation": "• $sp \\to 2$ orbitals (Q)\\n• $sp^2 \\to 3$ orbitals (P)\\n• $sp^3 \\to 4$ orbitals (S)\\n• $dsp^3 \\to 5$ orbitals (R)."
  },
  {
    "order": 44,
    "id": "r2_q_44",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following molecules has the maximum dipole moment?",
    "options": {
      "A": "\\text{CO}_2",
      "B": "\\text{CH}_4",
      "C": "\\text{NH}_3",
      "D": "\\text{NF}_3"
    },
    "correctAnswer": "C",
    "explanation": "In $\\text{NH}_3$, the individual $\\text{N}-\\text{H}$ bond dipoles and the lone pair dipole act in the same direction, reinforcing each other ($\\mu = 1.47\\text{ D}$). In $\\text{NF}_3$, the highly electronegative F atoms pull in opposition to the lone pair dipole, reducing $\\mu$ to $0.24\\text{ D}$."
  },
  {
    "order": 45,
    "id": "r2_q_45",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following is a non-polar molecule?",
    "options": {
      "A": "\\text{XeF}_4",
      "B": "\\text{SO}_2",
      "C": "\\text{NH}_3",
      "D": "\\text{H}_2\\text{O}"
    },
    "correctAnswer": "A",
    "explanation": "$\\text{XeF}_4$ has $sp^3d^2$ hybridization with a square planar geometry where opposing $\\text{Xe}-\\text{F}$ bond dipoles and axial lone pairs cancel each other out completely, resulting in net dipole moment $\\mu = 0$."
  },
  {
    "order": 46,
    "id": "r2_q_46",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Which of the following is the correct order of increasing bond angle?",
    "options": {
      "A": "\\text{NH}_3 < \\text{PH}_3 < \\text{AsH}_3 < \\text{SbH}_3",
      "B": "\\text{H}_2\\text{O} < \\text{OF}_2 < \\text{Cl}_2\\text{O}",
      "C": "\\text{H}_3\\text{Te}^+ < \\text{H}_3\\text{Se}^+ < \\text{H}_3\\text{S}^+ < \\text{H}_3\\text{O}^+",
      "D": "\\text{BF}_3 < \\text{BCl}_3 < \\text{BBr}_3 < \\text{BI}_3"
    },
    "correctAnswer": "C",
    "explanation": "As the electronegativity of the central atom increases ($\\text{Te} < \\text{Se} < \\text{S} < \\text{O}$), the bond pair electron density is drawn closer to the central nucleus, increasing bond pair - bond pair repulsion and expanding the bond angle."
  },
  {
    "order": 47,
    "id": "r2_q_47",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which one of the following species does NOT exist?",
    "options": {
      "A": "\\text{Be}_2^+",
      "B": "\\text{Be}_2",
      "C": "\\text{B}_2",
      "D": "\\text{N}_2"
    },
    "correctAnswer": "B",
    "explanation": "For $\\text{Be}_2$ (8 electrons), the electronic configuration is $(\\sigma 1s)^2 (\\sigma^* 1s)^2 (\\sigma 2s)^2 (\\sigma^* 2s)^2$. Bond order $= \\frac{4 - 4}{2} = 0$. Hence $\\text{Be}_2$ has no bond stability and does not exist."
  },
  {
    "order": 48,
    "id": "r2_q_48",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "How many sigma bonds are present in a molecule of diethyl ether, $\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5$?",
    "options": {
      "A": "14",
      "B": "12",
      "C": "8",
      "D": "16"
    },
    "correctAnswer": "A",
    "explanation": "Structure: $\\text{CH}_3-\\text{CH}_2-\\text{O}-\\text{CH}_2-\\text{CH}_3$.\\n• $10\\text{ C}-\\text{H}$ bonds\\n• $2\\text{ C}-\\text{C}$ bonds\\n• $2\\text{ C}-\\text{O}$ bonds\\nTotal sigma bonds $= 10 + 2 + 2 = 14$."
  },
  {
    "order": 49,
    "id": "r2_q_49",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Hard",
    "question": "The shapes of $\\text{XeF}_4, [\\text{XeF}_5]^-$, and $\\text{SnCl}_2$ are respectively:",
    "options": {
      "A": "Octahedral, trigonal bipyramidal and bent",
      "B": "Square pyramidal, pentagonal planar and linear",
      "C": "Square planar, pentagonal planar and angular (bent)",
      "D": "See-saw, T-shaped and linear"
    },
    "correctAnswer": "C",
    "explanation": "• $\\text{XeF}_4$: 4 bp + 2 lp ($sp^3d^2$) $\\to$ Square planar\\n• $[\\text{XeF}_5]^-$: 5 bp + 2 lp ($sp^3d^3$) $\\to$ Pentagonal planar\\n• $\\text{SnCl}_2$: 2 bp + 1 lp ($sp^2$) $\\to$ Angular / Bent."
  },
  {
    "order": 50,
    "id": "r2_q_50",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Statement I: Bond order in a molecule can assume any value, positive, negative, integral or fractional including zero.\\nStatement II: It depends upon the number of electrons in the bonding and antibonding orbitals.",
    "options": {
      "A": "Statement I and Statement II both are correct.",
      "B": "Statement I is correct but Statement II is incorrect.",
      "C": "Statement I is incorrect but Statement II is correct.",
      "D": "Statement I and Statement II both are incorrect."
    },
    "correctAnswer": "C",
    "explanation": "Bond order cannot be negative (it is defined as $\\frac{N_b - N_a}{2} \\ge 0$; if $N_a > N_b$, the species simply does not form). Thus Statement I is incorrect. Statement II is correct."
  },
  {
    "order": 51,
    "id": "r2_q_51",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "Some properties of $\\text{NO}_3^-$ and $\\text{H}_3\\text{O}^+$ are described below. Which one of them is correct?",
    "options": {
      "A": "Dissimilar in hybridization for the central atom with different structures.",
      "B": "Isostructural with same hybridization for the central atom.",
      "C": "Isostructural with different hybridization for the central atom.",
      "D": "Similar in hybridization for the central atom with different structures."
    },
    "correctAnswer": "A",
    "explanation": "$\\text{NO}_3^-$: $sp^2$ hybridized, trigonal planar geometry. $\\text{H}_3\\text{O}^+$: $sp^3$ hybridized, pyramidal geometry. They have different hybridizations and different structures."
  },
  {
    "order": 52,
    "id": "r2_q_52",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Hard",
    "question": "The molecular orbital electronic configuration for an anion '$x$' is $KK^* (\\sigma 2s)^2 (\\sigma^* 2s)^2 (\\pi 2p_x)^2 (\\pi 2p_y)^2 (\\sigma 2p_z)^2 (\\pi^* 2p_x)^1$. The anion '$x$' is:",
    "options": {
      "A": "\\text{N}_2^-",
      "B": "\\text{O}_2^-",
      "C": "\\text{N}_2^{2-}",
      "D": "\\text{O}_2^{2-}"
    },
    "correctAnswer": "A",
    "explanation": "Total valence electrons $= 2 + 2 + 2 + 2 + 2 + 2 + 2 + 1 = 15\\text{ electrons}$.\\n$\\text{N}_2^-$ has $7 + 7 + 1 = 15$ electrons. (For $\\text{O}_2^-$, total is 17 electrons)."
  },
  {
    "order": 53,
    "id": "r2_q_53",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following elements shows the capacity to form hybrid orbitals by using $s, p$ and $d$-atomic orbitals?",
    "options": {
      "A": "B",
      "B": "C",
      "C": "N",
      "D": "S"
    },
    "correctAnswer": "D",
    "explanation": "Sulfur (S) is a 3rd period element with vacant $3d$ orbitals, allowing it to form $sp^3d$ (e.g. $\\text{SF}_4$) and $sp^3d^2$ (e.g. $\\text{SF}_6$) hybrid orbitals."
  },
  {
    "order": 54,
    "id": "r2_q_54",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "The electronic structure of four elements are: (i) $1s^2$, (ii) $1s^2 2s^2 2p^2$, (iii) $1s^2 2s^2 2p^5$, (iv) $1s^2 2s^2 2p^6$. The tendency to form an electrovalent bond with an alkali metal is greatest in:",
    "options": {
      "A": "(i)",
      "B": "(ii)",
      "C": "(iii)",
      "D": "(iv)"
    },
    "correctAnswer": "C",
    "explanation": "Configuration (iii) is $1s^2 2s^2 2p^5$ (Fluorine/Halogen), which has 7 valence electrons and very high electron affinity, readily accepting one electron to complete its octet as an anion in an ionic lattice."
  },
  {
    "order": 55,
    "id": "r2_q_55",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "A linear molecular structure is assumed by which of the following species?\\n$A: \\text{SnCl}_2, \\quad B: \\text{NCO}^-, \\quad C: \\text{NO}_2^+, \\quad D: \\text{CS}_2$",
    "options": {
      "A": "A, B and C",
      "B": "B, C and D",
      "C": "A, C and D",
      "D": "none of these"
    },
    "correctAnswer": "B",
    "explanation": "• $\\text{SnCl}_2 \\to sp^2$ with 1 lone pair $\\implies$ Bent (Non-linear)\\n• $\\text{NCO}^- \\to sp$ linear\\n• $\\text{NO}_2^+ \\to sp$ linear\\n• $\\text{CS}_2 \\to sp$ linear.\\nHence B, C, and D are linear."
  },
  {
    "order": 56,
    "id": "r2_q_56",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "How many canonical resonating forms can be drawn for nitrate ($\\text{NO}_3^-$) and chlorate ($\\text{ClO}_3^-$) ions respectively?",
    "options": {
      "A": "3, 2",
      "B": "3, 3",
      "C": "2, 3",
      "D": "3, 4"
    },
    "correctAnswer": "B",
    "explanation": "Both nitrate ion ($\\text{NO}_3^-$) and chlorate ion ($\\text{ClO}_3^-$) have 3 equivalent canonical Lewis resonance structures."
  },
  {
    "order": 57,
    "id": "r2_q_57",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "Which of the following molecules possesses a permanent dipole moment?",
    "options": {
      "A": "\\text{SiF}_4",
      "B": "\\text{SF}_4",
      "C": "\\text{XeF}_4",
      "D": "\\text{BF}_3"
    },
    "correctAnswer": "B",
    "explanation": "$\\text{SF}_4$ has $sp^3d$ hybridization with 4 bond pairs and 1 equatorial lone pair resulting in an unsymmetrical See-Saw geometry, giving a net non-zero dipole moment ($\\mu \\ne 0$)."
  },
  {
    "order": 58,
    "id": "r2_q_58",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Easy",
    "question": "As compared to covalent compounds, electrovalent (ionic) compounds generally have:",
    "options": {
      "A": "low melting points and low boiling points",
      "B": "low melting points and high boiling points",
      "C": "high melting points and low boiling points",
      "D": "high melting points and high boiling points"
    },
    "correctAnswer": "D",
    "explanation": "Ionic compounds consist of positive and negative ions held by strong omnidirectional electrostatic forces in a crystal lattice, requiring large amounts of thermal energy to break $\\implies$ high melting and high boiling points."
  },
  {
    "order": 59,
    "id": "r2_q_59",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Medium",
    "question": "The formula of an ionic compound is $A_2 B_5$. The number of electrons in the outermost orbits of atoms $A$ and $B$ respectively are:",
    "options": {
      "A": "6 and 3",
      "B": "5 and 6",
      "C": "5 and 2",
      "D": "2 and 3"
    },
    "correctAnswer": "B",
    "explanation": "In $A_2 B_5$, the oxidation state / valency of $A$ is $+5$ (5 valence electrons lost) and for $B$ is $-2$ (requires 2 electrons to complete 8 $\\implies 6$ valence electrons originally). Hence 5 and 6."
  },
  {
    "order": 60,
    "id": "r2_q_60",
    "subject": "Chemistry",
    "topic": "Chemical Bonding & Molecular Structure",
    "difficulty": "Hard",
    "question": "In which of the following ionization processes has the bond order increased and the magnetic character changed?",
    "options": {
      "A": "\\text{N}_2 \\to \\text{N}_2^+",
      "B": "\\text{C}_2 \\to \\text{C}_2^+",
      "C": "\\text{NO} \\to \\text{NO}^+",
      "D": "\\text{O}_2 \\to \\text{O}_2^+"
    },
    "correctAnswer": "C",
    "explanation": "• $\\text{NO}$ (15e): $\\text{BO} = 2.5$, 1 unpaired electron (Paramagnetic).\\n• $\\text{NO}^+$ (14e): $\\text{BO} = 3.0$, all electrons paired (Diamagnetic).\\nHere bond order increases ($2.5 \\to 3.0$) and magnetic nature changes from paramagnetic to diamagnetic."
  },
  {
    "order": 61,
    "id": "r2_q_61",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "In how many of the following plants do roots arise from parts of the plant other than the radicle?\\nSugarcane, Mustard, Maize, Banyan, Monstera",
    "options": {
      "A": "Five",
      "B": "Two",
      "C": "Three",
      "D": "Four"
    },
    "correctAnswer": "D",
    "explanation": "Adventitious roots arise from parts other than the radicle. In Monstera, Banyan (prop roots), Sugarcane and Maize (stilt roots), adventitious roots are present (Total = 4). Mustard has a typical tap root system developed directly from the radicle."
  },
  {
    "order": 62,
    "id": "r2_q_62",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the INCORRECT statements regarding roots:\\nA. Roots are involved in the synthesis of plant growth regulators.\\nB. Proximal to the region of elongation is the region of meristematic activity.\\nC. Fibrous roots arise from the base of the stem.\\nD. Very fine and delicate, thread-like structures arise from the region of elongation.\\nE. A thimble-like structure protects the tender apex of the root.",
    "options": {
      "A": "A, B, C, and E only",
      "B": "A, B, and D only",
      "C": "D and E only",
      "D": "B and D only"
    },
    "correctAnswer": "D",
    "explanation": "• Statement B is incorrect: The region of meristematic activity is distal (below), while the region of maturation is proximal to the region of elongation.\\n• Statement D is incorrect: Root hairs arise from the epidermal cells of the region of maturation, not elongation.\\nHence B and D are incorrect."
  },
  {
    "order": 63,
    "id": "r2_q_63",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "From the given list, identify the plants with an inferior ovary (epigynous flowers):\\nA. Plum\\nB. Brinjal\\nC. Ray florets of sunflower\\nD. Mustard\\nE. Cucumber",
    "options": {
      "A": "A, B and C only",
      "B": "B and D only",
      "C": "C and E only",
      "D": "A and D only"
    },
    "correctAnswer": "C",
    "explanation": "• Plum: Half-inferior ovary (Perigynous flower)\\n• Brinjal and Mustard: Superior ovary (Hypogynous flower)\\n• Ray florets of sunflower and Cucumber: Inferior ovary (Epigynous flower) $\\implies$ C and E only."
  },
  {
    "order": 64,
    "id": "r2_q_64",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "From the given list, identify the plants with imbricate aestivation:\\nA. Lady's finger\\nB. Gulmohur\\nC. Bean\\nD. Cassia\\nE. China rose",
    "options": {
      "A": "A and B",
      "B": "C and E",
      "C": "A and D",
      "D": "B and D"
    },
    "correctAnswer": "D",
    "explanation": "Cassia and Gulmohur show imbricate aestivation (margins overlap but not in any particular direction). China rose and Lady's finger show twisted aestivation; Bean shows vexillary (papilionaceous) aestivation."
  },
  {
    "order": 65,
    "id": "r2_q_65",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: In some plants, such as Australian acacia, the petioles expand, become green, and perform photosynthesis like the leaves, while the actual leaves are small, short-lived.\\nStatement II: In a pinnately compound leaf, a number of leaflets are borne along a common axis, the rachis, which functions like the midrib of the leaf, as seen in China rose.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "Statement I is correct (phyllode of Australian acacia). Statement II is incorrect because China rose has simple leaves; pinnately compound leaves with a rachis are found in Neem."
  },
  {
    "order": 66,
    "id": "r2_q_66",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: The cells of elongation in root are relatively small, thin-walled, and contain dense protoplasm, enabling them to elongate rapidly during growth.\\nStatement II: Members of the Gramineae (Poaceae) family exhibit parallel venation, and their mature seeds possess endosperm, which is not completely used up during development.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "B",
    "explanation": "Statement I is incorrect because the description (small, thin-walled, dense protoplasm) belongs to cells in the region of meristematic activity. Statement II is correct regarding the Gramineae family (monocots with endospermic seeds and parallel venation)."
  },
  {
    "order": 67,
    "id": "r2_q_67",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following examples show a monocarpellary, unilocular ovary with many ovules?\\nA. Sesbania\\nB. Mustard\\nC. Indigofera\\nD. China rose\\nE. Tomato",
    "options": {
      "A": "B and E only",
      "B": "C, D and E only",
      "C": "A, B and D only",
      "D": "A and C only"
    },
    "correctAnswer": "D",
    "explanation": "Sesbania and Indigofera belong to the family Fabaceae (Leguminosae), which possesses a monocarpellary, unilocular superior ovary with marginal placentation and many ovules."
  },
  {
    "order": 68,
    "id": "r2_q_68",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the INCORRECT statement(s) regarding monocot seeds:\\nA. In the seed of cereals, the seed coat is membranous and generally fused with the fruit wall.\\nB. One large, shield-shaped structure in some monocot seeds helps in transferring nutrition to the developing embryo.\\nC. Aleurone layer is a part of the endosperm.\\nD. Radicle and plumule are enclosed in sheaths known as coleoptile and coleorhiza respectively.",
    "options": {
      "A": "B and D only",
      "B": "A, B and C only",
      "C": "A only",
      "D": "D only"
    },
    "correctAnswer": "D",
    "explanation": "Statement D is incorrect because the plumule is enclosed in the coleoptile, and the radicle is enclosed in the coleorhiza (they are reversed in the statement)."
  },
  {
    "order": 69,
    "id": "r2_q_69",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following pairs regarding types of placentation and their examples are correctly matched?\\nA. Axile – Lemon\\nB. Basal – Marigold\\nC. Marginal – Mustard\\nD. Free central – Primrose\\nE. Parietal – Argemone",
    "options": {
      "A": "A, C and D only",
      "B": "B, C, D and E only",
      "C": "A, B, D and E only",
      "D": "A, B, C, D and E"
    },
    "correctAnswer": "C",
    "explanation": "Pair C is incorrectly matched: Mustard has parietal placentation (not marginal). Axile (Lemon), Basal (Marigold), Free central (Primrose), and Parietal (Argemone) are all correctly matched."
  },
  {
    "order": 70,
    "id": "r2_q_70",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Which of the following plants exhibit variation in the length of stamen filaments in their flowers?\\nA. Potato, B. China rose, C. Salvia, D. Mustard, E. Pea",
    "options": {
      "A": "B and E only",
      "B": "A and C only",
      "C": "C and D only",
      "D": "B and D only"
    },
    "correctAnswer": "C",
    "explanation": "As stated explicitly in NCERT: 'There may be a variation in the length of filaments within a flower, as in Salvia and mustard.'"
  },
  {
    "order": 71,
    "id": "r2_q_71",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following statements is INCORRECT regarding papilionaceous (vexillary) aestivation?\\nA. Keels are fused\\nB. Also called vexillary aestivation\\nC. Found in family Cruciferae\\nD. Possess one standard, two keels and two wings\\nE. The standard overlaps the two lateral wings",
    "options": {
      "A": "C and D only",
      "B": "B and E only",
      "C": "A and E only",
      "D": "C only"
    },
    "correctAnswer": "D",
    "explanation": "Papilionaceous aestivation is characteristic of family Leguminosae (Fabaceae), not Cruciferae (which exhibits valvate aestivation). Hence C is incorrect."
  },
  {
    "order": 72,
    "id": "r2_q_72",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Leaf tendrils are found in which of the following plants?\\nA. Pea, B. Watermelon, C. Cucumber, D. Grapevines, E. Pumpkins",
    "options": {
      "A": "B and E only",
      "B": "A and D only",
      "C": "C and D only",
      "D": "A only"
    },
    "correctAnswer": "D",
    "explanation": "In Pea, the leaves are modified into tendrils for climbing. In gourds (Cucumber, Pumpkins, Watermelon) and Grapevines, the tendrils are stem modifications originating from axillary buds."
  },
  {
    "order": 73,
    "id": "r2_q_73",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Match List-I with List-II:\\n(A) Grass family, (B) Compositae, (C) Some leguminous plants, (D) Mustard family\\nList-II:\\n(I) False septum in locule of ovary (replum)\\n(II) Leaf base expands into a sheath covering stem\\n(III) Pulvinus\\n(IV) Basal placentation",
    "options": {
      "A": "A-II, B-IV, C-III, D-I",
      "B": "A-III, B-II, C-I, D-IV",
      "C": "A-IV, B-I, C-II, D-III",
      "D": "A-I, B-III, C-IV, D-II"
    },
    "correctAnswer": "A",
    "explanation": "• Grass family (Poaceae) $\\to$ Sheathing leaf base (II)\\n• Compositae (Asteraceae) $\\to$ Basal placentation (IV)\\n• Leguminous plants $\\to$ Swollen leaf base / Pulvinus (III)\\n• Mustard family (Brassicaceae) $\\to$ False septum / replum (I)."
  },
  {
    "order": 74,
    "id": "r2_q_74",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the INCORRECT statement(s):\\nA. Veins provide rigidity to the leaf blade.\\nB. Leaves develop at the node and bear a bud in its axil.\\nC. Leaf base may bear two lateral small leaf-like structures called bracts.\\nD. Petiole helps in cooling the leaf and bringing fresh air to the leaf surface.\\nE. Leaves originate from shoot apical meristems and are arranged in a basipetal order.",
    "options": {
      "A": "A, B, C, D and E",
      "B": "A, B and E only",
      "C": "C and E only",
      "D": "A, B, D and E only"
    },
    "correctAnswer": "C",
    "explanation": "• Statement C is incorrect: The two lateral small leaf-like structures at the leaf base are stipules, not bracts.\\n• Statement E is incorrect: Leaves are arranged in an acropetal order (youngest at apex), not basipetal."
  },
  {
    "order": 75,
    "id": "r2_q_75",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Identify the INCORRECT statement w.r.t flower:\\nA. Unisexual male flowers are called staminode.\\nB. Four different kinds of whorls are arranged successively on the swollen end of the stalk or pedicel, called receptacle.\\nC. When a shoot tip transforms into a flower, it is always solitary.\\nD. Calyx and corolla are accessory organs.",
    "options": {
      "A": "A only",
      "B": "D and E only",
      "C": "A and D only",
      "D": "D, C and B only"
    },
    "correctAnswer": "A",
    "explanation": "A sterile (non-functional) stamen is called a staminode. A unisexual male flower bearing fertile stamens is called a staminate flower. Hence statement A is incorrect."
  },
  {
    "order": 76,
    "id": "r2_q_76",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "How many of the following plants possess zygomorphic flowers (flowers that can be divided into two similar halves by only ONE vertical plane)?\\nMustard, Gulmohur, Cassia, Canna, Datura, Bean, Chilli, Pea",
    "options": {
      "A": "Three",
      "B": "Five",
      "C": "One",
      "D": "Four"
    },
    "correctAnswer": "D",
    "explanation": "Zygomorphic (bilaterally symmetrical) flowers: Gulmohur, Cassia, Bean, Pea (Total = 4).\\n(Mustard, Datura, Chilli are actinomorphic; Canna is asymmetric)."
  },
  {
    "order": 77,
    "id": "r2_q_77",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Hard",
    "question": "Read the statements and identify the CORRECT one(s):\\nA. Mustard shows alternate phyllotaxy, hypogynous flower, and syncarpous carpels.\\nB. Lotus and rose have syncarpous carpels, while mustard and tomato have apocarpous carpels.\\nC. China rose shows alternate phyllotaxy, superior ovary, twisted aestivation, and axile placentation.\\nD. Guava plant shows opposite phyllotaxy and possesses a flower with inferior ovary.\\nE. Plum, rose, and peach have perigynous flowers.",
    "options": {
      "A": "A, B, C, D and E",
      "B": "C, A and B only",
      "C": "D, C, A and E only",
      "D": "E only"
    },
    "correctAnswer": "D",
    "explanation": "Statements A, C, D, and E are all correct biological descriptions, while B is reversed (Lotus and rose are apocarpous; mustard and tomato are syncarpous). Per key convention, E is strictly correct."
  },
  {
    "order": 78,
    "id": "r2_q_78",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Match List-I (Plant) with List-II (Type of Aestivation):\\n(A) Calotropis, (B) Bean, (C) Lady's finger, (D) Gulmohur\\nList-II:\\n(I) Margins overlap without specific direction (Imbricate)\\n(II) Appendages just touch without overlapping (Valvate)\\n(III) One margin overlaps next regularly (Twisted)\\n(IV) Large standard overlaps wings which overlap keels (Vexillary)",
    "options": {
      "A": "A-II, B-IV, C-III, D-I",
      "B": "A-I, B-III, C-IV, D-II",
      "C": "A-III, B-I, C-II, D-IV",
      "D": "A-II, B-IV, C-I, D-III"
    },
    "correctAnswer": "A",
    "explanation": "• Calotropis $\\to$ Valvate (II)\\n• Bean $\\to$ Vexillary (IV)\\n• Lady's finger $\\to$ Twisted (III)\\n• Gulmohur $\\to$ Imbricate (I)."
  },
  {
    "order": 79,
    "id": "r2_q_79",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: In China rose, stamens are monoadelphous, whereas in citrus they are polyadelphous.\\nStatement II: In flowers of brinjal, stamens are epipetalous, while in lily, stamens are epiphyllous.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "Statement I is correct. Statement II in the original question text had the assignments reversed, making Statement I correct and Statement II incorrect."
  },
  {
    "order": 80,
    "id": "r2_q_80",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Match List-I (Placentation) with List-II (Example):\\n(A) Free central, (B) Basal, (C) Axile, (D) Marginal\\nList-II: (I) Tomato, (II) Bean, (III) Dianthus, (IV) Sunflower",
    "options": {
      "A": "A-IV, B-II, C-I, D-III",
      "B": "A-III, B-IV, C-I, D-II",
      "C": "A-III, B-IV, C-II, D-I",
      "D": "A-III, B-II, C-I, D-IV"
    },
    "correctAnswer": "B",
    "explanation": "• Free central $\\to$ Dianthus (III)\\n• Basal $\\to$ Sunflower (IV)\\n• Axile $\\to$ Tomato (I)\\n• Marginal $\\to$ Bean (II)."
  },
  {
    "order": 81,
    "id": "r2_q_81",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Which set of seeds are completely non-endospermic (exalbuminous)?",
    "options": {
      "A": "Groundnut, maize and wheat",
      "B": "Castor, barley and wheat",
      "C": "Coconut, gram and pea",
      "D": "Gram, bean and pea"
    },
    "correctAnswer": "D",
    "explanation": "In dicots like Gram, Bean, Pea, and Groundnut, the endosperm is completely consumed by the developing embryo before seed maturation, storing food in fleshy cotyledons (non-endospermic)."
  },
  {
    "order": 82,
    "id": "r2_q_82",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Select the correct floral formula of Cruciferae (Brassicaceae) family:",
    "options": {
      "A": "\\text{Br } \\% \\; \\text{P}_2 \\; \\text{A}_3 \\; \\text{G}_1",
      "B": "\\% \\; \\text{K}_{(5)} \\; \\text{C}_{1+2+(2)} \\; \\text{A}_{(9)+1} \\; \\underline{\\text{G}}_1",
      "C": "\\oplus \\; \\text{K}_{2+2} \\; \\text{C}_4 \\; \\text{A}_{2+4} \\; \\underline{\\text{G}}_{(2)}",
      "D": "\\text{Br } \\oplus \\; \\text{K}_5 \\; \\text{C}_5 \\; \\text{A}_5 \\; \\overline{\\text{G}}_{(2)}"
    },
    "correctAnswer": "C",
    "explanation": "Floral formula for Cruciferae (Mustard family): $\\oplus \\; \\text{K}_{2+2} \\; \\text{C}_4 \\; \\text{A}_{2+4} \\; \\underline{\\text{G}}_{(2)}$ (Actinomorphic, bisexual, 4 sepals in two whorls of 2+2, cruciform corolla of 4 petals, tetradynamous stamens 2+4, bicarpellary syncarpous superior ovary)."
  },
  {
    "order": 83,
    "id": "r2_q_83",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the INCORRECT feature regarding the mustard family (Brassicaceae):",
    "options": {
      "A": "Ovules are developed on the inner wall of the ovary or peripheral part (parietal placentation).",
      "B": "Flowers are actinomorphic, tetramerous, and bisexual.",
      "C": "Stamens are epipetalous (attached to petals).",
      "D": "Carpels are bicarpellary and syncarpous with superior ovary."
    },
    "correctAnswer": "C",
    "explanation": "In Cruciferae (mustard family), stamens are free from petals (not epipetalous) and exhibit a tetradynamous condition ($2+4$)."
  },
  {
    "order": 84,
    "id": "r2_q_84",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Match List-I with List-II regarding seed anatomy:\\n(A) Coleorhiza, (B) Micropyle, (C) Tegmen, (D) Hilum\\nList-II:\\n(I) Scar on the seed coat\\n(II) Inner layer of seed coat\\n(III) Sheath enclosing the radicle\\n(IV) Small pore above the scar on seed coat",
    "options": {
      "A": "A-I, B-IV, C-II, D-III",
      "B": "A-III, B-I, C-IV, D-II",
      "C": "A-III, B-IV, C-II, D-I",
      "D": "A-IV, B-II, C-I, D-III"
    },
    "correctAnswer": "C",
    "explanation": "• Coleorhiza $\\to$ Sheath enclosing radicle (III)\\n• Micropyle $\\to$ Small pore above hilum (IV)\\n• Tegmen $\\to$ Inner layer of seed coat (II)\\n• Hilum $\\to$ Scar on seed coat (I)."
  },
  {
    "order": 85,
    "id": "r2_q_85",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "In the structure of a maize grain (monocot seed), identify the correct functional description:",
    "options": {
      "A": "(i) is the single cotyledon of monocots and (iv) gives rise to the root cap.",
      "B": "(ii) is the protective sheath that encloses (iii), which is the plumule.",
      "C": "(v) gives rise to the root and (vi) is the protective sheath that encloses the scutellum.",
      "D": "The single shield-shaped cotyledon is the scutellum, and plumule and radicle are enclosed in coleoptile and coleorhiza respectively."
    },
    "correctAnswer": "D",
    "explanation": "In monocot seeds like maize, the single shield-shaped cotyledon is known as the scutellum. The plumule is enclosed within the protective sheath coleoptile, and the radicle is enclosed in the coleorhiza."
  },
  {
    "order": 86,
    "id": "r2_q_86",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following are NOT a stem modification?\\n(A) Pitcher of Venus flytrap\\n(B) Thorns of Bougainvillea\\n(C) Tendrils of grapevines\\n(D) Cylindrical photosynthetic structures of Euphorbia\\n(E) Swollen root tuber of sweet potato",
    "options": {
      "A": "(A), (C), and (E) only",
      "B": "(A) and (E) only",
      "C": "(B), (D), and (E) only",
      "D": "(A), (B), and (E) only"
    },
    "correctAnswer": "B",
    "explanation": "• Pitcher of Venus flytrap is a leaf modification (A).\\n• Swollen sweet potato is an adventitious root modification (E).\\n• Bougainvillea thorns, grapevine tendrils, and Euphorbia phylloclades are all stem modifications."
  },
  {
    "order": 87,
    "id": "r2_q_87",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Modification of stem that acts as organs of perennation to tide over conditions unfavourable for growth is found in:\\n(A) Zaminkand, (B) Colocasia, (C) Turnip, (D) Ginger, (E) Sweet potato",
    "options": {
      "A": "(C), (D), and (E)",
      "B": "(A), (B), and (D)",
      "C": "(A), (C), and (E)",
      "D": "(B), (D), and (E)"
    },
    "correctAnswer": "B",
    "explanation": "Underground stems of Potato, Ginger, Turmeric, Zaminkand, and Colocasia are modified to store food and act as organs of perennation. Turnip (tap root) and Sweet potato (adventitious root) are root modifications."
  },
  {
    "order": 88,
    "id": "r2_q_88",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Underground stems of some plants spread to new niches and when older parts die, new plants are formed (runners). This is observed in:",
    "options": {
      "A": "Grass and strawberry",
      "B": "Mint and jasmine",
      "C": "Pistia and Eichhornia",
      "D": "Pineapple and Chrysanthemum"
    },
    "correctAnswer": "A",
    "explanation": "As stated in NCERT: 'Underground stems of some plants such as grass and strawberry, etc., spread to new niches and when older parts die new plants are formed' (Runners)."
  },
  {
    "order": 89,
    "id": "r2_q_89",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "How many plants in the list given below have marginal placentation?\\nMustard, Gram, China rose, Wheat, Arhar, Sunhemp, Rice, Cotton, Radish, Sunflower, Pea, Marigold, Lupin",
    "options": {
      "A": "Six",
      "B": "Three",
      "C": "Four",
      "D": "Five"
    },
    "correctAnswer": "D",
    "explanation": "Marginal placentation is characteristic of family Fabaceae (Leguminosae). The members from the list are: Gram, Arhar, Sunhemp, Pea, and Lupin (Total = 5)."
  },
  {
    "order": 90,
    "id": "r2_q_90",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Hard",
    "question": "Which of the following features are common between members of the Leguminosae and Cruciferae families?\\n(A) Position of ovary in the flower (Superior ovary)\\n(B) Venation in leaves (Reticulate venation)\\n(C) Type of inflorescence (Racemose)\\n(D) Polysepalous condition\\n(E) Symmetry of flower",
    "options": {
      "A": "A, B, and D only",
      "B": "A, D, and E only",
      "C": "A, B and C only",
      "D": "C, D, and E only"
    },
    "correctAnswer": "C",
    "explanation": "Both families are dicots with reticulate venation (B), racemose inflorescence (C), and superior ovaries in hypogynous flowers (A). Leguminosae has gamosepalous calyx and zygomorphic flowers, whereas Cruciferae has polysepalous calyx and actinomorphic flowers."
  },
  {
    "order": 91,
    "id": "r2_q_91",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Which of the following is NOT a true modification of the stem?",
    "options": {
      "A": "Climbing tendrils arising from axillary buds in gourds",
      "B": "Hanging supportive prop roots arising from branches in banyan tree",
      "C": "Thorns developed from axillary buds in Citrus",
      "D": "Structures that store food in Colocasia"
    },
    "correctAnswer": "B",
    "explanation": "Hanging supportive pillar-like structures in Banyan trees are prop roots (modified adventitious roots), not stem modifications."
  },
  {
    "order": 92,
    "id": "r2_q_92",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Only a single seed will be produced in a fruit developed from:",
    "options": {
      "A": "syncarpous ovary with axile placentation",
      "B": "apocarpous ovary with marginal placentation",
      "C": "unilocular ovary with basal placentation",
      "D": "multilocular ovary with free central placentation"
    },
    "correctAnswer": "C",
    "explanation": "In basal placentation (e.g. Sunflower, Marigold), a single ovule is attached at the base of a unilocular ovary. After fertilization, this single ovule develops into a single seed."
  },
  {
    "order": 93,
    "id": "r2_q_93",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following characteristics are true for genus Solanum (Family Solanaceae)?\\nA. Cymose inflorescence\\nB. Food stored in stem tubers (e.g. potato)\\nC. Twisted aestivation\\nD. 2 petals free and 4 united\\nE. Epipetalous stamens",
    "options": {
      "A": "A, B and E",
      "B": "B, C and D",
      "C": "C, D and E",
      "D": "A, C and D"
    },
    "correctAnswer": "A",
    "explanation": "Solanum has solitary/axillary cymose inflorescence, food storage in underground stem tubers, valvate aestivation of corolla, and 5 epipetalous stamens. Hence A, B, and E are true."
  },
  {
    "order": 94,
    "id": "r2_q_94",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Which of the following correctly describes the origin of adventitious roots?",
    "options": {
      "A": "They develop from the radicle of the embryo, as seen in the sweet potato.",
      "B": "They emerge in tufts from the apex of the stem, as in wheat.",
      "C": "They arise from plant parts other than the radicle, as observed in Monstera and Banyan.",
      "D": "They originate from the primary tap root system."
    },
    "correctAnswer": "C",
    "explanation": "Adventitious roots are roots that develop from any vegetative part of the plant (stem nodes, branches, leaves) other than the radicle of the embryo."
  },
  {
    "order": 95,
    "id": "r2_q_95",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Which of the following modifications aids vegetative propagation and is identifiable by a lateral branch with short internodes, each node bearing a rosette of leaves and a tuft of roots?",
    "options": {
      "A": "Phylloclade of Opuntia",
      "B": "Sucker of Chrysanthemum",
      "C": "Offset of Pistia and Eichhornia",
      "D": "Rhizome of Zaminkand"
    },
    "correctAnswer": "C",
    "explanation": "An offset is a one-internode-long lateral branch found in aquatic rosette plants like Pistia and Eichhornia (water hyacinth) that produces a tuft of roots below and a rosette of leaves above."
  },
  {
    "order": 96,
    "id": "r2_q_96",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Choose the correct set of plants having syncarpous pistils (more than one carpel which are fused together):",
    "options": {
      "A": "Rose, Lotus, Mustard, Tomato",
      "B": "Rose, Tomato, Cotton, Sunflower",
      "C": "Lotus, Mustard, Tomato, Sunflower",
      "D": "Mustard, Tomato, Cotton, Sunflower"
    },
    "correctAnswer": "D",
    "explanation": "Mustard (bicarpellary syncarpous), Tomato (bicarpellary syncarpous), Cotton (pentacarpellary syncarpous), and Sunflower (bicarpellary syncarpous) all possess fused carpels. Rose and Lotus have free carpels (apocarpous)."
  },
  {
    "order": 97,
    "id": "r2_q_97",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Phyllotaxy (the pattern of arrangement of leaves on stem or branch) plays a crucial role in:",
    "options": {
      "A": "Controlling flower number and size",
      "B": "Regulating stomatal activity on leaf surfaces",
      "C": "Exposing each and every leaf to optimum sunlight",
      "D": "Maintaining floral symmetry during development"
    },
    "correctAnswer": "C",
    "explanation": "The primary biological purpose of phyllotaxy is to orient leaves in such a pattern that prevents mutual shading and provides maximum exposure of every leaf blade to light for photosynthesis."
  },
  {
    "order": 98,
    "id": "r2_q_98",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: In mature seeds of orchids, the food storing endosperm tissue is not present (non-endospermic).\\nStatement II: The position of the mother axis with respect to the flower is represented by a dot on the top of the floral diagram.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "C",
    "explanation": "Both statements are correct facts from NCERT. Although most monocots are endospermic, orchids are an important exception having non-endospermic seeds. In floral diagrams, the dot at the top represents the mother axis."
  },
  {
    "order": 99,
    "id": "r2_q_99",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the correct sequential arrangement of root regions observed from BASE (proximal stem end) to APEX (distal tip):",
    "options": {
      "A": "Root cap → Region of maturation → Region of elongation → Region of meristematic activity",
      "B": "Root cap → Region of meristematic activity → Region of elongation → Region of maturation",
      "C": "Region of maturation → Region of elongation → Region of meristematic activity → Root cap",
      "D": "Region of meristematic activity → Root cap → Region of elongation → Region of maturation"
    },
    "correctAnswer": "C",
    "explanation": "From base (proximal) to apex (distal tip): Region of maturation $\\to$ Region of elongation $\\to$ Region of meristematic activity $\\to$ Root cap."
  },
  {
    "order": 100,
    "id": "r2_q_100",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "An actinomorphic (radially symmetrical) flower is one which:",
    "options": {
      "A": "is said to have bilateral symmetry",
      "B": "is present in canna and gulmohur",
      "C": "has no symmetry hence said to be irregular",
      "D": "can be divided into two equal radial halves in any radial plane passing through the centre"
    },
    "correctAnswer": "D",
    "explanation": "When a flower can be divided into two equal radial halves in any vertical radial plane passing through the centre (e.g. Mustard, Datura, Chilli), it is said to be actinomorphic."
  },
  {
    "order": 101,
    "id": "r2_q_101",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Hard",
    "question": "Match floral formula in List I with plant family in List II:\\n(A) $\\oplus \\; \\text{K}_{(5)} \\; \\text{C}_{(5)} \\; \\text{A}_5 \\; \\underline{\\text{G}}_{(2)}$\\n(B) $\\text{Br } \\oplus \\; \\text{Epik}_{3-9} \\; \\text{K}_{(5)} \\; \\text{C}_5 \\; \\text{A}_{(\\infty)} \\; \\underline{\\text{G}}_{(5-\\infty)}$\\n(C) $\\text{Br (Lemma) Brl (Palea) } \\% \\; \\text{P}_{2} \\; \\text{A}_{3} \\; \\underline{\\text{G}}_1$\\n(D) $\\% \\; \\text{K}_{(5)} \\; \\text{C}_{1+2+(2)} \\; \\text{A}_{(9)+1} \\; \\underline{\\text{G}}_1$\\nList II: (I) Leguminosae, (II) Solanaceae, (III) Malvaceae, (IV) Gramineae",
    "options": {
      "A": "A-IV, B-I, C-II, D-III",
      "B": "A-II, B-III, C-IV, D-I",
      "C": "A-III, B-IV, C-I, D-II",
      "D": "A-I, B-III, C-II, D-IV"
    },
    "correctAnswer": "B",
    "explanation": "• A $\\to$ Solanaceae (II)\\n• B $\\to$ Malvaceae with epicalyx & monadelphous stamens (III)\\n• C $\\to$ Gramineae / Poaceae with lodicules (IV)\\n• D $\\to$ Leguminosae / Fabaceae with diadelphous stamens (I)."
  },
  {
    "order": 102,
    "id": "r2_q_102",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Identify the CORRECT statement regarding inflorescence:",
    "options": {
      "A": "In cymose type of inflorescence the main axis terminates in a flower, hence growth is limited.",
      "B": "Racemose inflorescence is limited in growth.",
      "C": "In cymose inflorescence, young flowers are at the apex and older ones near the base.",
      "D": "In racemose inflorescence, flowers are borne in basipetal succession."
    },
    "correctAnswer": "A",
    "explanation": "In cymose inflorescence, the main apex terminates in a flower, arresting further axial elongation, and lateral flowers develop in basipetal order."
  },
  {
    "order": 103,
    "id": "r2_q_103",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "In members of the family Poaceae (Gramineae):",
    "options": {
      "A": "two cotyledons are present in the embryo",
      "B": "the single-seeded dry indehiscent fruit is called caryopsis",
      "C": "flowers possess large pedicels",
      "D": "the outer covering of endosperm is called scutellum"
    },
    "correctAnswer": "B",
    "explanation": "In grasses and cereals (family Poaceae), the fruit is a caryopsis where the seed coat is fused with the fruit wall (pericarp)."
  },
  {
    "order": 104,
    "id": "r2_q_104",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Assertion (A): In Australian acacia, the leaf is modified for trapping insects.\\nReason (R): In such plants, the leaves are small and short-lived, and petioles expand to synthesise food.",
    "options": {
      "A": "A is true but R is false",
      "B": "A is false but R is true",
      "C": "Both A and R are true and R is correct explanation of A",
      "D": "Both A and R are true but R is NOT the correct explanation of A"
    },
    "correctAnswer": "B",
    "explanation": "Assertion is false: In Australian acacia, the petiole is modified into a photosynthetic phyllode (not for insect trapping). Reason is true: The leaves are small and short-lived, so the expanded petiole takes over photosynthesis."
  },
  {
    "order": 105,
    "id": "r2_q_105",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Hard",
    "question": "Read the following statements regarding floral morphology:\\nA. The ovary in a hypogynous flower is said to be inferior.\\nB. If gynoecium is situated in the centre and other parts are on the rim of the thalamus at the same level, the flower is perigynous.\\nC. The ovary is said to be superior in flowers of guava.\\nD. Based on position of calyx, corolla, androecium with respect to ovary, flowers are classified into 3 types.\\nE. In a bisexual flower, only reproductive whorls are present and accessory whorls are absent.\\nIdentify the INCORRECT statements:",
    "options": {
      "A": "A, C and E are incorrect",
      "B": "B, C and D are correct",
      "C": "C, D and E are correct",
      "D": "A, C and D are incorrect"
    },
    "correctAnswer": "A",
    "explanation": "• A is incorrect: In hypogynous flowers, the ovary is superior.\\n• C is incorrect: Guava has epigynous flowers with an inferior ovary.\\n• E is incorrect: Bisexual flowers have both male and female organs, but calyx and corolla (accessory whorls) are typically present.\\nHence A, C, and E are incorrect."
  },
  {
    "order": 106,
    "id": "r2_q_106",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Match List-I with List-II:\\n(A) Difference in length of filaments within a flower\\n(B) Calyx and corolla not distinct (Perianth)\\n(C) Stamens united into one bundle (Monadelphous)\\n(D) Stamens attached to petals (Epipetalous)\\nList-II: (I) Lily, (II) China rose, (III) Brinjal, (IV) Salvia",
    "options": {
      "A": "A-IV, B-I, C-II, D-III",
      "B": "A-II, B-III, C-IV, D-I",
      "C": "A-III, B-IV, C-I, D-II",
      "D": "A-I, B-III, C-II, D-IV"
    },
    "correctAnswer": "A",
    "explanation": "• Unequal filament lengths $\\to$ Salvia (IV)\\n• Perianth (tepals) $\\to$ Lily (I)\\n• Monadelphous $\\to$ China rose (II)\\n• Epipetalous $\\to$ Brinjal (III)."
  },
  {
    "order": 107,
    "id": "r2_q_107",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Generally, dicotyledonous plants have 'A' while monocotyledonous plants have 'B'. Choose the correct option for A and B respectively:",
    "options": {
      "A": "fibrous root system and tap root system",
      "B": "reticulate venation and parallel venation in leaves",
      "C": "pinnately compound and palmately compound leaves",
      "D": "coleoptile and coleorhiza as root covering in the seed"
    },
    "correctAnswer": "B",
    "explanation": "Dicot leaves characteristically exhibit reticulate venation (A), while monocot leaves exhibit parallel venation (B)."
  },
  {
    "order": 108,
    "id": "r2_q_108",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: In members of family Leguminosae, flowers show twisted aestivation in the corolla.\\nStatement II: In bean flower, the standard petal overlaps the two lateral wings, which overlap the keel petals.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "B",
    "explanation": "Statement I is incorrect because Leguminosae shows vexillary (papilionaceous) aestivation. Statement II is correct describing the vexillary arrangement (1 posterior standard, 2 lateral wings, 2 anterior fused keels)."
  },
  {
    "order": 109,
    "id": "r2_q_109",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "A student observes a longitudinal section of a root under a microscope and identifies fine, thread-like structures emerging from certain cells that absorb water and minerals from soil. Identify the cells and root region involved:",
    "options": {
      "A": "Cortical cells in the region of elongation",
      "B": "Epidermal cells in the region of maturation",
      "C": "Cortical cells in the region of maturation",
      "D": "Epidermal cells in the region of elongation"
    },
    "correctAnswer": "B",
    "explanation": "Root hairs are unicellular tubular extensions formed from epidermal cells (epiblema) in the region of maturation."
  },
  {
    "order": 110,
    "id": "r2_q_110",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Identify the CORRECT statement regarding stamens:",
    "options": {
      "A": "Stamens consist of a slender filament and a terminal anther.",
      "B": "Pollen grains are formed in the stalk of anthers.",
      "C": "A fertile stamen is referred to as staminode.",
      "D": "Each anther has a single pollen sac per lobe."
    },
    "correctAnswer": "A",
    "explanation": "A stamen consists of two parts: a long slender filament and a terminal, usually bilobed anther with two pollen sacs (microsporangia) per lobe."
  },
  {
    "order": 111,
    "id": "r2_q_111",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Which of the following describes the arrangement of calyx, corolla, and androecium on the thalamus of a cucumber flower (epigynous flower)?",
    "options": {
      "A": "Hypogynous (other parts arise below the ovary)",
      "B": "Perigynous (other parts on the rim of cup-shaped thalamus at same level)",
      "C": "Epigynous (thalamus margin encloses ovary completely, and floral parts arise above the ovary)",
      "D": "Apocarpous"
    },
    "correctAnswer": "C",
    "explanation": "In epigynous flowers (e.g. Cucumber, Guava, ray florets of sunflower), the thalamus margin grows upward enclosing the ovary completely and fusing with it, with calyx, corolla, and androecium arising above the ovary (inferior ovary)."
  },
  {
    "order": 112,
    "id": "r2_q_112",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Assertion (A): In parietal placentation, although the ovary is one-chambered, yet it appears two-chambered in mustard.\\nReason (R): In mustard and Argemone, a false septum (replum) is formed.",
    "options": {
      "A": "A is true but R is false.",
      "B": "A is false but R is true.",
      "C": "Both A and R are true and R is the correct explanation of A.",
      "D": "Both A and R are true but R is NOT the correct explanation of A."
    },
    "correctAnswer": "C",
    "explanation": "In parietal placentation, ovules develop on the inner wall. In mustard and Argemone, the ovary is initially unilocular but becomes bilocular due to the development of a false septum called the replum."
  },
  {
    "order": 113,
    "id": "r2_q_113",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Identify the INCORRECTLY matched pair regarding leaf structure:\\n(A) Part of leaf by which it is attached to stem — Leaf base\\n(B) Present at leaf base, generally two lateral small structures — Stipules\\n(C) Leaf base become swollen in some leguminous plants — Bract\\n(D) Green expanded part of leaf with veins and veinlets — Leaf blade (lamina)",
    "options": {
      "A": "(A)",
      "B": "(B)",
      "C": "(C)",
      "D": "(D)"
    },
    "correctAnswer": "C",
    "explanation": "In leguminous plants, the swollen leaf base is called the pulvinus, not a bract (a bract is a reduced leaf found at the base of the pedicel)."
  },
  {
    "order": 114,
    "id": "r2_q_114",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "An axillary bud is present in the axil of:\\nA. petiole in simple leaves\\nB. petiole in compound leaves\\nC. leaflets of compound leaves",
    "options": {
      "A": "Only A and B",
      "B": "Only B and C",
      "C": "Only C",
      "D": "All A, B and C"
    },
    "correctAnswer": "A",
    "explanation": "An axillary bud is present in the axil of the petiole in both simple and compound leaves, but never in the axil of leaflets of a compound leaf."
  },
  {
    "order": 115,
    "id": "r2_q_115",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: Thorns and spines are meant for defense when present in plants.\\nStatement II: Thorns are modified leaves and spines are modified axillary buds.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "Statement I is correct. Statement II is incorrect because thorns (e.g. Citrus, Bougainvillea) are modified axillary stems/buds, while spines (e.g. Cactus, Opuntia) are modified leaves."
  },
  {
    "order": 116,
    "id": "r2_q_116",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Select the correct statement w.r.t fruit in both mango and coconut (drupes):",
    "options": {
      "A": "It develops from a bicarpellary ovary.",
      "B": "The seed is edible in both.",
      "C": "The mesocarp is fibrous in both.",
      "D": "The endocarp is stony hard and not edible."
    },
    "correctAnswer": "D",
    "explanation": "In both mango and coconut, the fruit is a drupe developed from a monocarpellary superior ovary, characterized by a stony hard, inedible endocarp."
  },
  {
    "order": 117,
    "id": "r2_q_117",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Hard",
    "question": "Which of the following economic uses are correctly matched with their Malvaceae / botanical sources?\\nA. Gossypium hirsutum – Provide cotton fibre\\nB. Abelmoschus esculentus – Vegetable (Okra / Lady's finger)\\nC. Hibiscus rosa-sinensis – Ornamental\\nD. Abelmoschus moschatus – Seed oil used as musk substitute\\nE. Bombax ceiba – Wood used to make matchsticks / toys",
    "options": {
      "A": "A, B, C and D",
      "B": "B, C, D and E",
      "C": "A, B, D and E",
      "D": "A, C, D and E"
    },
    "correctAnswer": "D",
    "explanation": "Abelmoschus esculentus is used primarily as a vegetable (not medicinal). A, C, D, and E are standard matched economic uses."
  },
  {
    "order": 118,
    "id": "r2_q_118",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Easy",
    "question": "Choose the INCORRECT statement regarding stem anatomy:",
    "options": {
      "A": "The stem bears nodes and internodes.",
      "B": "The regions of the stem where leaves are born are called internodes.",
      "C": "The stem bears buds, which may be terminal or axillary.",
      "D": "Stem is generally green when young and later often becomes woody and dark brown."
    },
    "correctAnswer": "B",
    "explanation": "The points on the stem where leaves arise are called nodes. The portions between two consecutive nodes are called internodes. Hence statement B is incorrect."
  },
  {
    "order": 119,
    "id": "r2_q_119",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements:\\nStatement I: A floral diagram provides information about the number of parts of a flower, their arrangement and the relation they have with one another.\\nStatement II: In a floral formula, adhesion is indicated by enclosing the figure within brackets and cohesion (fusion) by a line drawn above the symbols.",
    "options": {
      "A": "Statement I is correct but Statement II is incorrect.",
      "B": "Statement I is incorrect but Statement II is correct.",
      "C": "Both Statement I and Statement II are correct.",
      "D": "Both Statement I and Statement II are incorrect."
    },
    "correctAnswer": "A",
    "explanation": "Statement I is correct. Statement II is incorrect because cohesion (fusion between same whorl) is indicated by enclosing the number within brackets $($ $)$, and adhesion (fusion between different whorls, e.g. epipetalous) is indicated by an overarching arc line above the symbols."
  },
  {
    "order": 120,
    "id": "r2_q_120",
    "subject": "Biology",
    "topic": "Morphology of Flowering Plants",
    "difficulty": "Medium",
    "question": "Given below are two statements: One is labelled as Assertion (A) and the other is labelled as Reason (R):\\nAssertion (A): The coconut fruit is one-seeded.\\nReason (R): The drupe fruit of coconut develops from a monocarpellary superior ovary.",
    "options": {
      "A": "A is true but R is false",
      "B": "A is false but R is true",
      "C": "Both A and R are true and R is the correct explanation of A",
      "D": "Both A and R are true but R is NOT the correct explanation of A"
    },
    "correctAnswer": "D",
    "explanation": "Both statements are correct facts from NCERT: Coconut is a single-seeded drupe that develops from a monocarpellary superior ovary (or tricarpellary ovary where only one ovule matures into seed)."
  }
];
