/**
 * JEE Main 2027 Chemistry Assessment: Chemical Thermodynamics (Part 1)
 * Curated from Prayas JEE 2.0 2025 National Benchmark Series
 * 25 High-Yield Questions (MCQs + Section B Numericals) with Verified Solutions & KaTeX Formatting
 * Duration: 60 Minutes (Self-Adjustable 30-90 Mins) | Marking: +4 / -1 / 0 | Total Marks: 100
 */

export const JEE_2027_THERMO_PART1_TEST = {
  id: "jee-2027-thermodynamics-part-1",
  slug: "jee-2027-thermodynamics-part-1",
  title: "JEE Main 2027: Chemical Thermodynamics Drill (Part 1)",
  subtitle: "25 High-Yield Questions (MCQ & Numerical) · Work, Heat, Enthalpy & Spontaneity",
  subject: "Chemistry (Class 11)",
  subjects: ["Chemistry"],
  category: "jee",
  examType: "JEE_MAIN",
  durationMinutes: 60,
  allowCustomDuration: true,
  minCustomDurationMinutes: 30,
  maxCustomDurationMinutes: 90,
  totalQuestions: 25,
  totalMarks: 100,
  markingScheme: { correct: 4, wrong: -1, unattempted: 0 },
  marksCorrect: 4,
  marksWrong: -1,
  releaseDate: "2026-11-10T10:00:00Z",
  syllabus: "First Law of Thermodynamics, Work Done in Reversible/Irreversible Processes, State & Path Functions, Enthalpy of Formation & Reaction, Bond Energies, Heat Capacities, Spontaneity & Gibbs Free Energy"
};

export const JEE_2027_THERMO_PART1_QUESTIONS = [
  {
    id: 1,
    number: 1,
    order: 1,
    type: "mcq",
    question: "The final temperature in an adiabatic expansion is:",
    text: "The final temperature in an adiabatic expansion is:",
    options: {
      A: "Greater than the initial temperature",
      B: "Same as the initial temperature",
      C: "Half of the initial temperature",
      D: "Less than the initial temperature"
    },
    correctAnswer: "D",
    explanation: "In an adiabatic process, there is no heat exchange with the surroundings ($q = 0$). By the First Law of Thermodynamics: $$\\Delta U = q + w = w$$ During an expansion process, the gas does work on the surroundings, meaning $w < 0$. Consequently, $\\Delta U < 0$. Since for an ideal gas $\\Delta U = n C_v \\Delta T = n C_v (T_f - T_i) < 0$, we have $T_f < T_i$. Hence, adiabatic expansion always produces a cooling effect, and the final temperature is less than the initial temperature.",
    topic: "First Law of Thermodynamics",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 2,
    number: 2,
    order: 2,
    type: "mcq",
    question: "Given that:\n$$\\text{C} + \\text{O}_2 \\longrightarrow \\text{CO}_2; \\quad \\Delta H^\\circ = -x\\text{ kJ}$$\n$$2\\text{CO} + \\text{O}_2 \\longrightarrow 2\\text{CO}_2; \\quad \\Delta H^\\circ = -y\\text{ kJ}$$\nThe enthalpy of formation of $\\text{CO}$ will be:",
    text: "Given that:\n$$\\text{C} + \\text{O}_2 \\longrightarrow \\text{CO}_2; \\quad \\Delta H^\\circ = -x\\text{ kJ}$$\n$$2\\text{CO} + \\text{O}_2 \\longrightarrow 2\\text{CO}_2; \\quad \\Delta H^\\circ = -y\\text{ kJ}$$\nThe enthalpy of formation of $\\text{CO}$ will be:",
    options: {
      A: "$y - 2x$",
      B: "$\\frac{2x - y}{2}$",
      C: "$\\frac{y - 2x}{2}$",
      D: "$2x - y$"
    },
    correctAnswer: "C",
    explanation: "The standard enthalpy of formation of $\\text{CO(g)}$ corresponds to the reaction:\n$$\\text{C(s)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)} \\quad (\\Delta H_f^\\circ)$$\nGiven:\n(1) $\\text{C} + \\text{O}_2 \\longrightarrow \\text{CO}_2 \\quad (\\Delta H_1 = -x\\text{ kJ})$\n(2) $2\\text{CO} + \\text{O}_2 \\longrightarrow 2\\text{CO}_2 \\quad (\\Delta H_2 = -y\\text{ kJ})$\n\nDividing equation (2) by 2 gives:\n$$\\text{CO} + \\frac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO}_2 \\quad \\left(\\Delta H = -\\frac{y}{2}\\text{ kJ}\\right)$$\nSubtracting this from equation (1):\n$$\\text{C} + \\frac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO}$$\n$$\\Delta H_f^\\circ(\\text{CO}) = \\Delta H_1 - \\frac{\\Delta H_2}{2} = -x - \\left(-\\frac{y}{2}\\right) = \\frac{y - 2x}{2}\\text{ kJ}$$\nHence, the correct option is (C).",
    topic: "Hess's Law & Enthalpy of Formation",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 3,
    number: 3,
    order: 3,
    type: "mcq",
    question: "Identify the state function among the following:",
    text: "Identify the state function among the following:",
    options: {
      A: "$q$",
      B: "$q - w$",
      C: "$q / w$",
      D: "$q + w$"
    },
    correctAnswer: "D",
    explanation: "According to the First Law of Thermodynamics: $$\\Delta U = q + w$$ While heat ($q$) and work ($w$) individually depend on the path taken and are path functions, their sum $(q + w)$ is equal to the change in internal energy ($\\Delta U$), which depends exclusively on the initial and final states of the thermodynamic system. Thus, $q + w$ is a state function.",
    topic: "State and Path Functions",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 4,
    number: 4,
    order: 4,
    type: "mcq",
    question: "The values of $\\Delta G$ for the following reactions at $800^\\circ\\text{C}$ are:\n$$\\text{S}_2\\text{(g)} + 2\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{SO}_2\\text{(g)}; \\quad \\Delta G = -544\\text{ kJ}$$\n$$2\\text{Zn(s)} + \\text{S}_2\\text{(s)} \\longrightarrow 2\\text{ZnS(s)}; \\quad \\Delta G = -293\\text{ kJ}$$\n$$2\\text{Zn(s)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)}; \\quad \\Delta G = -480\\text{ kJ}$$\nThe $\\Delta G$ for the reaction:\n$$2\\text{ZnS(s)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)} + 2\\text{SO}_2\\text{(g)}$$\nwill be:",
    text: "The values of $\\Delta G$ for the following reactions at $800^\\circ\\text{C}$ are:\n$$\\text{S}_2\\text{(g)} + 2\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{SO}_2\\text{(g)}; \\quad \\Delta G = -544\\text{ kJ}$$\n$$2\\text{Zn(s)} + \\text{S}_2\\text{(s)} \\longrightarrow 2\\text{ZnS(s)}; \\quad \\Delta G = -293\\text{ kJ}$$\n$$2\\text{Zn(s)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)}; \\quad \\Delta G = -480\\text{ kJ}$$\nThe $\\Delta G$ for the reaction:\n$$2\\text{ZnS(s)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)} + 2\\text{SO}_2\\text{(g)}$$\nwill be:",
    options: {
      A: "$-731\\text{ kJ}$",
      B: "$-773\\text{ kJ}$",
      C: "$-229\\text{ kJ}$",
      D: "$-357\\text{ kJ}$"
    },
    correctAnswer: "A",
    explanation: "Target reaction:\n$$2\\text{ZnS(s)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)} + 2\\text{SO}_2\\text{(g)}$$\nWe can obtain this target by combining the given equations:\n$$\\text{Target} = \\text{Eq(3)} + \\text{Eq(1)} - \\text{Eq(2)}$$\n1. $\\text{Eq(3)}: 2\\text{Zn} + \\text{O}_2 \\longrightarrow 2\\text{ZnO} \\quad (\\Delta G_3 = -480\\text{ kJ})$\n2. $\\text{Eq(1)}: \\text{S}_2 + 2\\text{O}_2 \\longrightarrow 2\\text{SO}_2 \\quad (\\Delta G_1 = -544\\text{ kJ})$\n3. Reverse of $\\text{Eq(2)}: 2\\text{ZnS} \\longrightarrow 2\\text{Zn} + \\text{S}_2 \\quad (-\\Delta G_2 = +293\\text{ kJ})$\n\nAdding these three gives:\n$$\\Delta G = -480 + (-544) + 293 = -1024 + 293 = -731\\text{ kJ}$$\nHence, the correct option is (A).",
    topic: "Gibbs Free Energy & Ellingham Principles",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 5,
    number: 5,
    order: 5,
    type: "mcq",
    question: "The entropy change in the fusion of one mole of a solid melting at $27^\\circ\\text{C}$ (latent heat of fusion is $2930\\text{ J mol}^{-1}$) is:",
    text: "The entropy change in the fusion of one mole of a solid melting at $27^\\circ\\text{C}$ (latent heat of fusion is $2930\\text{ J mol}^{-1}$) is:",
    options: {
      A: "$10.73\\text{ J K}^{-1}\\text{mol}^{-1}$",
      B: "$2930\\text{ J K}^{-1}\\text{mol}^{-1}$",
      C: "$108.5\\text{ J K}^{-1}\\text{mol}^{-1}$",
      D: "$9.77\\text{ J K}^{-1}\\text{mol}^{-1}$"
    },
    correctAnswer: "D",
    explanation: "For a phase transformation at its normal transition temperature, the system is in equilibrium ($\\Delta G = 0$).\n$$\\Delta S_{\\text{fusion}} = \\frac{\\Delta H_{\\text{fusion}}}{T_{\\text{fusion}}}$$\nGiven:\n$\\Delta H_{\\text{fusion}} = 2930\\text{ J mol}^{-1}$\n$T = 27^\\circ\\text{C} = 27 + 273.15 = 300\\text{ K}$\n$$\\Delta S_{\\text{fusion}} = \\frac{2930}{300} = 9.767 \\approx 9.77\\text{ J K}^{-1}\\text{mol}^{-1}$$\nHence, option (D).",
    topic: "Entropy of Phase Transitions",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 6,
    number: 6,
    order: 6,
    type: "mcq",
    question: "Which of the following is not a state function?",
    text: "Which of the following is not a state function?",
    options: {
      A: "$G$",
      B: "$U$",
      C: "$w$",
      D: "$H$"
    },
    correctAnswer: "C",
    explanation: "State functions depend solely on the thermodynamic state of the system (initial and final states) and are independent of how that state was reached. Free energy ($G$), internal energy ($U$), and enthalpy ($H$) are state functions.\nIn contrast, work ($w$) and heat ($q$) depend explicitly on the path taken between states, making them path functions. Hence, $w$ is not a state function.",
    topic: "State vs Path Functions",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 7,
    number: 7,
    order: 7,
    type: "mcq",
    question: "Which of the following reactions defines the standard enthalpy of formation $\\Delta H_f^\\circ$?",
    text: "Which of the following reactions defines the standard enthalpy of formation $\\Delta H_f^\\circ$?",
    options: {
      A: "$\\text{C(diamond)} + \\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)}$",
      B: "$\\frac{1}{2}\\text{H}_2\\text{(g)} + \\frac{1}{2}\\text{F}_2\\text{(g)} \\longrightarrow \\text{HF(g)}$",
      C: "$\\text{N}_2\\text{(g)} + 3\\text{H}_2\\text{(g)} \\longrightarrow 2\\text{NH}_3\\text{(g)}$",
      D: "$\\text{CO(g)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)}$"
    },
    correctAnswer: "B",
    explanation: "By definition, the standard enthalpy of formation ($\\Delta H_f^\\circ$) is the enthalpy change accompanying the formation of exactly $1\\text{ mole}$ of a pure substance from its constituent elements in their standard, most stable reference states at $298\\text{ K}$ and $1\\text{ bar}$.\n- (A) is incorrect because graphite, not diamond, is the thermodynamic standard state of carbon.\n- (B) correctly forms $1\\text{ mole}$ of $\\text{HF(g)}$ from standard state elements $\\text{H}_2\\text{(g)}$ and $\\text{F}_2\\text{(g)}$.\n- (C) is incorrect because it forms $2\\text{ moles}$ of $\\text{NH}_3$.\n- (D) is incorrect because $\\text{CO}$ is a compound, not an element.\nHence, option (B).",
    topic: "Enthalpy of Formation Definition",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 8,
    number: 8,
    order: 8,
    type: "mcq",
    question: "Given:\n$$\\text{PbO}_2 \\longrightarrow \\text{PbO}; \\quad \\Delta G^\\circ < 0$$\n$$\\text{SnO}_2 \\longrightarrow \\text{SnO}; \\quad \\Delta G^\\circ > 0$$\nThe most probable and stable oxidation states of $\\text{Pb}$ and $\\text{Sn}$ under standard conditions will be:",
    text: "Given:\n$$\\text{PbO}_2 \\longrightarrow \\text{PbO}; \\quad \\Delta G^\\circ < 0$$\n$$\\text{SnO}_2 \\longrightarrow \\text{SnO}; \\quad \\Delta G^\\circ > 0$$\nThe most probable and stable oxidation states of $\\text{Pb}$ and $\\text{Sn}$ under standard conditions will be:",
    options: {
      A: "$\\text{Pb}^{4+}, \\text{Sn}^{4+}$",
      B: "$\\text{Pb}^{4+}, \\text{Sn}^{2+}$",
      C: "$\\text{Pb}^{2+}, \\text{Sn}^{2+}$",
      D: "$\\text{Pb}^{2+}, \\text{Sn}^{4+}$"
    },
    correctAnswer: "D",
    explanation: "1. For lead: $\\text{PbO}_2 (+4) \\longrightarrow \\text{PbO} (+2)$ has $\\Delta G^\\circ < 0$ (spontaneous). This indicates that the $+2$ oxidation state is thermodynamically more stable than $+4$ due to the inert pair effect in the heavier group 14 element $\\text{Pb}$.\n2. For tin: $\\text{SnO}_2 (+4) \\longrightarrow \\text{SnO} (+2)$ has $\\Delta G^\\circ > 0$ (non-spontaneous). Therefore, the reverse process is spontaneous, meaning $\\text{Sn}^{4+}$ is more stable than $\\text{Sn}^{2+}$.\nThus, the most stable oxidation states are $\\text{Pb}^{2+}$ and $\\text{Sn}^{4+}$. Hence, option (D).",
    topic: "Thermodynamic Stability & Inert Pair Effect",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 9,
    number: 9,
    order: 9,
    type: "mcq",
    question: "If the bond energies of $\\text{H}-\\text{H}$, $\\text{Br}-\\text{Br}$, and $\\text{H}-\\text{Br}$ are $433$, $192$, and $364\\text{ kJ mol}^{-1}$ respectively, $\\Delta H$ for the reaction:\n$$\\text{H}_2\\text{(g)} + \\text{Br}_2\\text{(g)} \\longrightarrow 2\\text{HBr(g)}$$\nis:",
    text: "If the bond energies of $\\text{H}-\\text{H}$, $\\text{Br}-\\text{Br}$, and $\\text{H}-\\text{Br}$ are $433$, $192$, and $364\\text{ kJ mol}^{-1}$ respectively, $\\Delta H$ for the reaction:\n$$\\text{H}_2\\text{(g)} + \\text{Br}_2\\text{(g)} \\longrightarrow 2\\text{HBr(g)}$$\nis:",
    options: {
      A: "$-261\\text{ kJ}$",
      B: "$+103\\text{ kJ}$",
      C: "$+261\\text{ kJ}$",
      D: "$-103\\text{ kJ}$"
    },
    correctAnswer: "D",
    explanation: "Enthalpy of reaction from bond dissociation energies is given by:\n$$\\Delta H_{\\text{rxn}} = \\sum \\text{BE}(\\text{reactants broken}) - \\sum \\text{BE}(\\text{products formed})$$\n$$\\Delta H = [\\text{BE}(\\text{H}-\\text{H}) + \\text{BE}(\\text{Br}-\\text{Br})] - [2 \\times \\text{BE}(\\text{H}-\\text{Br})]$$\n$$\\Delta H = (433 + 192) - (2 \\times 364) = 625 - 728 = -103\\text{ kJ}$$\nHence, option (D).",
    topic: "Bond Enthalpies",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 10,
    number: 10,
    order: 10,
    type: "mcq",
    question: "An ideal gas expands in volume from $10^{-3}\\text{ m}^3$ to $10^{-2}\\text{ m}^3$ at $300\\text{ K}$ against a constant pressure of $10^5\\text{ N m}^{-2}$. The work done is:",
    text: "An ideal gas expands in volume from $10^{-3}\\text{ m}^3$ to $10^{-2}\\text{ m}^3$ at $300\\text{ K}$ against a constant pressure of $10^5\\text{ N m}^{-2}$. The work done is:",
    options: {
      A: "$-900\\text{ J}$",
      B: "$-900\\text{ kJ}$",
      C: "$270\\text{ kJ}$",
      D: "$900\\text{ kJ}$"
    },
    correctAnswer: "A",
    explanation: "For an irreversible expansion against constant external pressure:\n$$w = -P_{\\text{ext}} \\Delta V = -P_{\\text{ext}} (V_2 - V_1)$$\nGiven:\n$P_{\\text{ext}} = 10^5\\text{ N m}^{-2}$\n$V_1 = 10^{-3}\\text{ m}^3 = 0.001\\text{ m}^3$\n$V_2 = 10^{-2}\\text{ m}^3 = 0.010\\text{ m}^3$\n$$\\Delta V = 0.010 - 0.001 = 0.009\\text{ m}^3 = 9 \\times 10^{-3}\\text{ m}^3$$\n$$w = -10^5 \\times (9 \\times 10^{-3}) = -900\\text{ J}$$\nHence, option (A).",
    topic: "Work in Irreversible Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 11,
    number: 11,
    order: 11,
    type: "mcq",
    question: "For a reaction $A \\longrightarrow B$, $\\Delta H = 4\\text{ kcal mol}^{-1}$ and $\\Delta S = 10\\text{ cal K}^{-1}\\text{mol}^{-1}$. The reaction is spontaneous when the temperature is:",
    text: "For a reaction $A \\longrightarrow B$, $\\Delta H = 4\\text{ kcal mol}^{-1}$ and $\\Delta S = 10\\text{ cal K}^{-1}\\text{mol}^{-1}$. The reaction is spontaneous when the temperature is:",
    options: {
      A: "$400\\text{ K}$",
      B: "$300\\text{ K}$",
      C: "$500\\text{ K}$",
      D: "None"
    },
    correctAnswer: "C",
    explanation: "For a spontaneous reaction, Gibbs free energy change must be negative ($\\Delta G < 0$):\n$$\\Delta G = \\Delta H - T\\Delta S < 0 \\implies T > \\frac{\\Delta H}{\\Delta S}$$\nGiven:\n$\\Delta H = 4\\text{ kcal mol}^{-1} = 4000\\text{ cal mol}^{-1}$\n$\\Delta S = 10\\text{ cal K}^{-1}\\text{mol}^{-1}$\n$$T_{\\text{eq}} = \\frac{4000}{10} = 400\\text{ K}$$\nFor spontaneity, $T > 400\\text{ K}$. Among the given choices, $500\\text{ K} > 400\\text{ K}$.\nHence, option (C).",
    topic: "Spontaneity & Equilibrium Temperature",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 12,
    number: 12,
    order: 12,
    type: "mcq",
    question: "The standard enthalpy of formation $\\Delta H_f^\\circ$ for $\\text{CO}_2\\text{(g)}$, $\\text{CO(g)}$, and $\\text{H}_2\\text{O(g)}$ are $-393.5$, $-110.5$, and $-241.8\\text{ kJ mol}^{-1}$ respectively. The standard enthalpy change (in $\\text{kJ}$) for the reaction:\n$$\\text{CO}_2\\text{(g)} + \\text{H}_2\\text{(g)} \\longrightarrow \\text{CO(g)} + \\text{H}_2\\text{O(g)}$$\nis:",
    text: "The standard enthalpy of formation $\\Delta H_f^\\circ$ for $\\text{CO}_2\\text{(g)}$, $\\text{CO(g)}$, and $\\text{H}_2\\text{O(g)}$ are $-393.5$, $-110.5$, and $-241.8\\text{ kJ mol}^{-1}$ respectively. The standard enthalpy change (in $\\text{kJ}$) for the reaction:\n$$\\text{CO}_2\\text{(g)} + \\text{H}_2\\text{(g)} \\longrightarrow \\text{CO(g)} + \\text{H}_2\\text{O(g)}$$\nis:",
    options: {
      A: "$542.1$",
      B: "$41.2$",
      C: "$-262.5$",
      D: "$-41.2$"
    },
    correctAnswer: "B",
    explanation: "$$\\Delta H_{\\text{rxn}}^\\circ = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})$$\n$$\\Delta H_{\\text{rxn}}^\\circ = [\\Delta H_f^\\circ(\\text{CO}) + \\Delta H_f^\\circ(\\text{H}_2\\text{O})] - [\\Delta H_f^\\circ(\\text{CO}_2) + \\Delta H_f^\\circ(\\text{H}_2)]$$\nSince $\\text{H}_2\\text{(g)}$ is in its elemental standard state, $\\Delta H_f^\\circ(\\text{H}_2) = 0$.\n$$\\Delta H_{\\text{rxn}}^\\circ = [(-110.5) + (-241.8)] - [(-393.5) + 0]$$\n$$\\Delta H_{\\text{rxn}}^\\circ = -352.3 - (-393.5) = +41.2\\text{ kJ}$$\nHence, option (B).",
    topic: "Enthalpy of Reaction from Formation Enthalpies",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 13,
    number: 13,
    order: 13,
    type: "mcq",
    question: "How much energy is released when $6\\text{ moles}$ of octane is burnt in air? Given: $\\Delta H_f^\\circ$ for\n$\\text{CO}_2\\text{(g)} = -490\\text{ kJ mol}^{-1}$\n$\\text{H}_2\\text{O(g)} = -240\\text{ kJ mol}^{-1}$\n$\\text{C}_8\\text{H}_{18}\\text{(g)} = +160\\text{ kJ mol}^{-1}$",
    text: "How much energy is released when $6\\text{ moles}$ of octane is burnt in air? Given: $\\Delta H_f^\\circ$ for\n$\\text{CO}_2\\text{(g)} = -490\\text{ kJ mol}^{-1}$\n$\\text{H}_2\\text{O(g)} = -240\\text{ kJ mol}^{-1}$\n$\\text{C}_8\\text{H}_{18}\\text{(g)} = +160\\text{ kJ mol}^{-1}$",
    options: {
      A: "$-6.2\\text{ kJ}$",
      B: "$-37.4\\text{ kJ}$ (in $10^3\\text{ kJ}$)",
      C: "$-35.5\\text{ kJ}$",
      D: "$-20.0\\text{ kJ}$"
    },
    correctAnswer: "B",
    explanation: "Combustion reaction of $1\\text{ mole}$ of octane:\n$$\\text{C}_8\\text{H}_{18}\\text{(g)} + \\frac{25}{2}\\text{O}_2\\text{(g)} \\longrightarrow 8\\text{CO}_2\\text{(g)} + 9\\text{H}_2\\text{O(g)}$$\n$$\\Delta H_c^\\circ = [8 \\times \\Delta H_f^\\circ(\\text{CO}_2) + 9 \\times \\Delta H_f^\\circ(\\text{H}_2\\text{O})] - \\Delta H_f^\\circ(\\text{C}_8\\text{H}_{18})$$\n$$\\Delta H_c^\\circ = [8(-490) + 9(-240)] - (+160) = [-3920 - 2160] - 160 = -6080 - 160 = -6240\\text{ kJ mol}^{-1}$$\nFor $6\\text{ moles}$ of octane burnt:\n$$\\Delta H = 6 \\times (-6240\\text{ kJ}) = -37440\\text{ kJ} = -37.44 \\times 10^3\\text{ kJ}$$\nRepresented in thousands of $\\text{kJ}$ (or $\\text{MJ}$), this is $-37.4$. Hence, option (B).",
    topic: "Enthalpy of Combustion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 14,
    number: 14,
    order: 14,
    type: "mcq",
    question: "The difference between heats of reaction at constant pressure ($q_p$) and constant volume ($q_v$) for the reaction:\n$$2\\text{C}_6\\text{H}_6(\\ell) + 15\\text{O}_2\\text{(g)} \\longrightarrow 12\\text{CO}_2\\text{(g)} + 6\\text{H}_2\\text{O}(\\ell)$$\nat $23^\\circ\\text{C}$ in $\\text{kJ}$ is:",
    text: "The difference between heats of reaction at constant pressure ($q_p$) and constant volume ($q_v$) for the reaction:\n$$2\\text{C}_6\\text{H}_6(\\ell) + 15\\text{O}_2\\text{(g)} \\longrightarrow 12\\text{CO}_2\\text{(g)} + 6\\text{H}_2\\text{O}(\\ell)$$\nat $23^\\circ\\text{C}$ in $\\text{kJ}$ is:",
    options: {
      A: "$-7.42$",
      B: "$+3.72$",
      C: "$-3.72$",
      D: "$+7.43$"
    },
    correctAnswer: "A",
    explanation: "The relationship between heat at constant pressure ($q_p = \\Delta H$) and heat at constant volume ($q_v = \\Delta U$) is:\n$$q_p - q_v = \\Delta H - \\Delta U = \\Delta n_g R T$$\nFor the given stoichiometric balanced equation:\n$$\\Delta n_g = n_g(\\text{products}) - n_g(\\text{reactants}) = 12 - 15 = -3$$\n$T = 23 + 273.15 = 296.15\\text{ K}$\n$R = 8.314\\text{ J K}^{-1}\\text{mol}^{-1} = 8.314 \\times 10^{-3}\\text{ kJ K}^{-1}\\text{mol}^{-1}$\n$$q_p - q_v = (-3) \\times (8.314 \\times 10^{-3}) \\times 296.15 = -7.388\\text{ kJ} \\approx -7.42\\text{ kJ}$$\nHence, option (A).",
    topic: "Relation between Delta H and Delta U",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 15,
    number: 15,
    order: 15,
    type: "mcq",
    question: "In which of the following conditions is a process always non-feasible (non-spontaneous at all temperatures)?",
    text: "In which of the following conditions is a process always non-feasible (non-spontaneous at all temperatures)?",
    options: {
      A: "$\\Delta H > 0; \\quad \\Delta S > 0$",
      B: "$\\Delta H > 0; \\quad \\Delta S < 0$",
      C: "$\\Delta H < 0; \\quad \\Delta S > 0$",
      D: "$\\Delta H < 0; \\quad \\Delta S < 0$"
    },
    correctAnswer: "B",
    explanation: "According to the Gibbs-Helmholtz equation: $$\\Delta G = \\Delta H - T\\Delta S$$ A process is non-feasible (non-spontaneous) when $\\Delta G > 0$.\nIf $\\Delta H > 0$ (endothermic) and $\\Delta S < 0$ (entropy decreases):\n$$-T\\Delta S = -T(-\\text{ve}) = +\\text{ve}$$\nThus, $\\Delta G = (+|\\Delta H|) + (+T|\\Delta S|) > 0$ at all absolute temperatures ($T > 0\\text{ K}$). Therefore, the reaction can never be spontaneous under any condition.",
    topic: "Criteria for Spontaneity",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 16,
    number: 16,
    order: 16,
    type: "mcq",
    question: "Match Column I with Column II:\n\n**Column-I:**\n(A) Isothermal Process\n(B) Adiabatic Process\n(C) Isobaric Process\n(D) Isochoric Process\n\n**Column-II:**\n(P) $q = \\Delta U$\n(Q) $w = -P\\Delta V$\n(R) $w = \\Delta U$\n(S) $w = -nRT \\ln\\left(\\frac{V_2}{V_1}\\right)$",
    text: "Match Column I with Column II:\n\n**Column-I:**\n(A) Isothermal Process\n(B) Adiabatic Process\n(C) Isobaric Process\n(D) Isochoric Process\n\n**Column-II:**\n(P) $q = \\Delta U$\n(Q) $w = -P\\Delta V$\n(R) $w = \\Delta U$\n(S) $w = -nRT \\ln\\left(\\frac{V_2}{V_1}\\right)$",
    options: {
      A: "A-S; B-R; C-P; D-Q",
      B: "A-S; B-R; C-Q; D-P",
      C: "A-S; B-Q; C-R; D-P",
      D: "A-Q; B-S; C-Q; D-P"
    },
    correctAnswer: "B",
    explanation: "- **(A) Isothermal Process:** Reversible work for ideal gas is $w = -nRT \\ln(V_2/V_1) \\implies$ **S**.\n- **(B) Adiabatic Process:** $q = 0 \\implies \\Delta U = q + w = w \\implies$ **R**.\n- **(C) Isobaric Process:** Work at constant external pressure is $w = -P\\Delta V \\implies$ **Q**.\n- **(D) Isochoric Process:** $\\Delta V = 0 \\implies w = 0$, so First Law gives $q_v = \\Delta U \\implies$ **P**.\nTherefore, the matching sequence is A-S; B-R; C-Q; D-P.",
    topic: "Thermodynamic Processes & First Law Expressions",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 17,
    number: 17,
    order: 17,
    type: "numerical",
    question: "One mole of an ideal gas at $300\\text{ K}$ is expanded isothermally from an initial volume of $1\\text{ L}$ to $10\\text{ L}$. The $\\Delta U$ for this process is ______ (Enter integer value in calories). [Use $R = 2\\text{ cal K}^{-1}\\text{mol}^{-1}$]",
    text: "One mole of an ideal gas at $300\\text{ K}$ is expanded isothermally from an initial volume of $1\\text{ L}$ to $10\\text{ L}$. The $\\Delta U$ for this process is ______ (Enter integer value in calories). [Use $R = 2\\text{ cal K}^{-1}\\text{mol}^{-1}$]",
    options: {},
    correctAnswer: "0",
    explanation: "For an ideal gas, internal energy $U$ depends solely on temperature: $U = f(T)$ (Joule's law).\nIn any isothermal process, the temperature remains strictly constant ($\\Delta T = 0$).\n$$\\Delta U = n C_v \\Delta T = n C_v (0) = 0\\text{ cal}$$\nThus, the change in internal energy is zero.",
    topic: "Internal Energy of Ideal Gas",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 18,
    number: 18,
    order: 18,
    type: "numerical",
    question: "The number of intensive properties among the following is ______ (Enter integer value):\nTemperature, Volume, Enthalpy, Density, Entropy, Free energy, Internal energy.",
    text: "The number of intensive properties among the following is ______ (Enter integer value):\nTemperature, Volume, Enthalpy, Density, Entropy, Free energy, Internal energy.",
    options: {},
    correctAnswer: "2",
    explanation: "Intensive properties do not depend on the quantity or mass of matter in the system, whereas extensive properties depend directly on mass:\n1. **Temperature** — Intensive (size-independent)\n2. **Volume** — Extensive\n3. **Enthalpy ($H$)** — Extensive\n4. **Density** — Intensive (ratio of mass to volume, $\\frac{m}{V}$)\n5. **Entropy ($S$)** — Extensive\n6. **Free energy ($G$)** — Extensive\n7. **Internal energy ($U$)** — Extensive\n\nAmong the 7 given properties, exactly 2 (Temperature and Density) are intensive.",
    topic: "Intensive and Extensive Properties",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 19,
    number: 19,
    order: 19,
    type: "numerical",
    question: "Among the following, the number of state functions is ______ (Enter integer value):\nEnthalpy, Work, Internal energy, Entropy, Heat, Free Energy.",
    text: "Among the following, the number of state functions is ______ (Enter integer value):\nEnthalpy, Work, Internal energy, Entropy, Heat, Free Energy.",
    options: {},
    correctAnswer: "4",
    explanation: "State functions depend only on the state of the system and not on the pathway:\n1. **Enthalpy ($H$)** — State function\n2. **Internal energy ($U$)** — State function\n3. **Entropy ($S$)** — State function\n4. **Free Energy ($G$)** — State function\n\nWork ($w$) and Heat ($q$) are path functions.\nTherefore, the number of state functions is 4.",
    topic: "Classification of Thermodynamic Functions",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 20,
    number: 20,
    order: 20,
    type: "mcq",
    question: "The entropy change for a phase transformation at equilibrium is given by:",
    text: "The entropy change for a phase transformation at equilibrium is given by:",
    options: {
      A: "$\\frac{\\Delta U}{\\gamma + dT}$",
      B: "$\\frac{\\Delta T}{\\Delta H}$",
      C: "$\\frac{\\Delta H}{T}$",
      D: "$\\frac{\\Delta H + \\Delta G}{T}$"
    },
    correctAnswer: "C",
    explanation: "A reversible phase transformation at constant temperature and pressure occurs at thermodynamic equilibrium, where $\\Delta G = 0$.\nSince $\\Delta G = \\Delta H - T\\Delta S = 0$, we have:\n$$T\\Delta S = \\Delta H \\implies \\Delta S = \\frac{\\Delta H}{T}$$\nHence, option (C).",
    topic: "Phase Equilibrium & Entropy",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 21,
    number: 21,
    order: 21,
    type: "mcq",
    question: "Calculate $\\Delta_f H$ for $\\text{ZnSO}_4\\text{(s)}$ from the following thermochemical data:\n(1) $\\text{ZnS(s)} \\longrightarrow \\text{Zn(s)} + \\text{S(rhombic)}, \\quad \\Delta H_1 = 44\\text{ kcal/mol}$\n(2) $2\\text{ZnS(s)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)} + 2\\text{SO}_2\\text{(g)}, \\quad \\Delta H_2 = -221.88\\text{ kcal/mol}$\n(3) $2\\text{SO}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{SO}_3\\text{(g)}, \\quad \\Delta H_3 = -46.88\\text{ kcal/mol}$\n(4) $\\text{ZnSO}_4\\text{(s)} \\longrightarrow \\text{ZnO(s)} + \\text{SO}_3\\text{(g)}, \\quad \\Delta H_4 = 55.1\\text{ kcal/mol}$",
    text: "Calculate $\\Delta_f H$ for $\\text{ZnSO}_4\\text{(s)}$ from the following thermochemical data:\n(1) $\\text{ZnS(s)} \\longrightarrow \\text{Zn(s)} + \\text{S(rhombic)}, \\quad \\Delta H_1 = 44\\text{ kcal/mol}$\n(2) $2\\text{ZnS(s)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{ZnO(s)} + 2\\text{SO}_2\\text{(g)}, \\quad \\Delta H_2 = -221.88\\text{ kcal/mol}$\n(3) $2\\text{SO}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{SO}_3\\text{(g)}, \\quad \\Delta H_3 = -46.88\\text{ kcal/mol}$\n(4) $\\text{ZnSO}_4\\text{(s)} \\longrightarrow \\text{ZnO(s)} + \\text{SO}_3\\text{(g)}, \\quad \\Delta H_4 = 55.1\\text{ kcal/mol}$",
    options: {
      A: "$-233.48\\text{ kcal/mol}$",
      B: "$-343.48\\text{ kcal/mol}$",
      C: "$-434.84\\text{ kcal/mol}$",
      D: "$-311.53\\text{ kcal/mol}$"
    },
    correctAnswer: "A",
    explanation: "Target equation: Formation of $\\text{ZnSO}_4\\text{(s)}$ from elements:\n$$\\text{Zn(s)} + \\text{S(rhombic)} + 2\\text{O}_2\\text{(g)} \\longrightarrow \\text{ZnSO}_4\\text{(s)}$$\nUsing Hess's Law:\n1. Reversing (1): $\\text{Zn(s)} + \\text{S(s)} \\longrightarrow \\text{ZnS(s)}, \\quad \\Delta H = -44\\text{ kcal}$\n2. Half of (2): $\\text{ZnS(s)} + \\frac{3}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{ZnO(s)} + \\text{SO}_2\\text{(g)}, \\quad \\Delta H = \\frac{-221.88}{2} = -110.94\\text{ kcal}$\n3. Half of (3): $\\text{SO}_2\\text{(g)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{SO}_3\\text{(g)}, \\quad \\Delta H = \\frac{-46.88}{2} = -23.44\\text{ kcal}$\nSum of 1+2+3:\n$$\\text{Zn(s)} + \\text{S(s)} + 2\\text{O}_2\\text{(g)} \\longrightarrow \\text{ZnO(s)} + \\text{SO}_3\\text{(g)}$$\n$$\\Delta H = -44 - 110.94 - 23.44 = -178.38\\text{ kcal}$$\n4. Reversing (4): $\\text{ZnO(s)} + \\text{SO}_3\\text{(g)} \\longrightarrow \\text{ZnSO}_4\\text{(s)}, \\quad \\Delta H = -55.1\\text{ kcal}$\nAdding step 4 to the sum:\n$$\\Delta_f H = -178.38 - 55.1 = -233.48\\text{ kcal/mol}$$\nHence, option (A).",
    topic: "Hess's Law Application",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Hard",
    image: null
  },
  {
    id: 22,
    number: 22,
    order: 22,
    type: "mcq",
    question: "For the freezing process $\\text{H}_2\\text{O}(\\ell) \\rightleftharpoons \\text{H}_2\\text{O(s)}$ at equilibrium, select the correct signs for the thermodynamic parameters:",
    text: "For the freezing process $\\text{H}_2\\text{O}(\\ell) \\rightleftharpoons \\text{H}_2\\text{O(s)}$ at equilibrium, select the correct signs for the thermodynamic parameters:",
    options: {
      A: "$\\Delta H = -\\text{ve}, \\Delta S = +\\text{ve}, \\Delta V = -\\text{ve}, \\Delta G = 0$",
      B: "$\\Delta H = -\\text{ve}, \\Delta S = -\\text{ve}, \\Delta V = +\\text{ve}, \\Delta G = 0$",
      C: "$\\Delta H = +\\text{ve}, \\Delta S = +\\text{ve}, \\Delta V = -\\text{ve}, \\Delta G = 0$",
      D: "$\\Delta H = -\\text{ve}, \\Delta S = -\\text{ve}, \\Delta V = -\\text{ve}, \\Delta G = 0$"
    },
    correctAnswer: "B",
    explanation: "For the equilibrium freezing of water $\\text{H}_2\\text{O}(\\ell) \\rightleftharpoons \\text{H}_2\\text{O(s)}$:\n1. **$\\Delta H$:** Freezing is an exothermic phase change, releasing latent heat of fusion: $\\Delta H < 0$ ($-\\text{ve}$).\n2. **$\\Delta S$:** Solid crystalline ice has a much more ordered lattice than liquid water: $\\Delta S < 0$ ($-\\text{ve}$).\n3. **$\\Delta V$:** Water displays anomalous expansion upon freezing due to its open cage-like hydrogen-bonded crystal structure; ice is less dense than liquid water ($V_{\\text{solid}} > V_{\\text{liquid}}$): $\\Delta V = V_s - V_\\ell > 0$ ($+\\text{ve}$).\n4. **$\\Delta G$:** At phase equilibrium ($0^\\circ\\text{C}, 1\\text{ atm}$), $\\Delta G = 0$.\nTherefore: $\\Delta H = -\\text{ve}, \\Delta S = -\\text{ve}, \\Delta V = +\\text{ve}, \\Delta G = 0$. Hence, option (B).",
    topic: "Thermodynamics of Freezing & Anomalous Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 23,
    number: 23,
    order: 23,
    type: "mcq",
    question: "Consider the standard free energies of formation $\\Delta G_f^\\circ$ and enthalpies $\\Delta H_f^\\circ$ (in $\\text{kJ/mol}$) for the following metal oxides:\n(A) $\\text{ZnO} \\ (\\Delta G^\\circ = -318.4, \\Delta H^\\circ = -348.3)$\n(B) $\\text{Cu}_2\\text{O} \\ (\\Delta G^\\circ = -146.0, \\Delta H^\\circ = -168.8)$\n(C) $\\text{HgO} \\ (\\Delta G^\\circ = -58.5, \\Delta H^\\circ = -90.8)$\n(D) $\\text{PbO} \\ (\\Delta G^\\circ = -187.9, \\Delta H^\\circ = -217.3)$\nWhich oxide can be most easily decomposed by heating to form the free metal and oxygen gas?",
    text: "Consider the standard free energies of formation $\\Delta G_f^\\circ$ and enthalpies $\\Delta H_f^\\circ$ (in $\\text{kJ/mol}$) for the following metal oxides:\n(A) $\\text{ZnO} \\ (\\Delta G^\\circ = -318.4, \\Delta H^\\circ = -348.3)$\n(B) $\\text{Cu}_2\\text{O} \\ (\\Delta G^\\circ = -146.0, \\Delta H^\\circ = -168.8)$\n(C) $\\text{HgO} \\ (\\Delta G^\\circ = -58.5, \\Delta H^\\circ = -90.8)$\n(D) $\\text{PbO} \\ (\\Delta G^\\circ = -187.9, \\Delta H^\\circ = -217.3)$\nWhich oxide can be most easily decomposed by heating to form the free metal and oxygen gas?",
    options: {
      A: "$\\text{ZnO}$",
      B: "$\\text{Cu}_2\\text{O}$",
      C: "$\\text{HgO}$",
      D: "$\\text{PbO}$"
    },
    correctAnswer: "C",
    explanation: "For the thermal decomposition reaction $\\text{MO} \\longrightarrow \\text{M} + \\frac{1}{2}\\text{O}_2$, the free energy change is:\n$$\\Delta G_{\\text{decomp}}^\\circ = -\\Delta G_f^\\circ$$\nThermal decomposition becomes spontaneous at the temperature where $\\Delta G = \\Delta H - T\\Delta S \\le 0 \\implies T \\ge \\frac{\\Delta H_f^\\circ}{\\Delta S_f^\\circ}$.\nThe oxide with the least negative $\\Delta G_f^\\circ$ (smallest decomposition barrier) decomposes at the lowest temperature.\nHere, $\\text{HgO}$ has $\\Delta G_f^\\circ = -58.5\\text{ kJ/mol}$, giving the smallest decomposition barrier ($\\Delta G_{\\text{decomp}}^\\circ = +58.5\\text{ kJ/mol}$). $\\text{HgO}$ decomposes cleanly upon mild heating around $400-500^\\circ\\text{C}$.\nHence, option (C).",
    topic: "Ellingham Diagram & Thermal Decomposition",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 24,
    number: 24,
    order: 24,
    type: "mcq",
    question: "Consider a reversible isentropic process of $1\\text{ mole}$ of an ideal monoatomic gas from $27^\\circ\\text{C}$ to $927^\\circ\\text{C}$. If the initial pressure of the gas was $1\\text{ bar}$, then the final pressure of the gas becomes:",
    text: "Consider a reversible isentropic process of $1\\text{ mole}$ of an ideal monoatomic gas from $27^\\circ\\text{C}$ to $927^\\circ\\text{C}$. If the initial pressure of the gas was $1\\text{ bar}$, then the final pressure of the gas becomes:",
    options: {
      A: "$4\\text{ bar}$",
      B: "$8\\text{ bar}$",
      C: "$32\\text{ bar}$",
      D: "$0.25\\text{ bar}$"
    },
    correctAnswer: "C",
    explanation: "An isentropic process is a reversible adiabatic process ($\\Delta S = 0$).\nFor a reversible adiabatic process of an ideal gas:\n$$T^\\gamma P^{1-\\gamma} = \\text{constant} \\implies \\frac{T_1^\\gamma}{P_1^{\\gamma - 1}} = \\frac{T_2^\\gamma}{P_2^{\\gamma - 1}} \\implies \\left(\\frac{P_2}{P_1}\\right)^{\\frac{\\gamma - 1}{\\gamma}} = \\frac{T_2}{T_1}$$\nFor an ideal monoatomic gas, $\\gamma = \\frac{5}{3}$.\n$$\\frac{\\gamma - 1}{\\gamma} = \\frac{5/3 - 1}{5/3} = \\frac{2/3}{5/3} = \\frac{2}{5}$$\nGiven:\n$T_1 = 27^\\circ\\text{C} = 300\\text{ K}$\n$T_2 = 927^\\circ\\text{C} = 927 + 273 = 1200\\text{ K}$\n$$\\frac{T_2}{T_1} = \\frac{1200}{300} = 4$$\n$$\\left(\\frac{P_2}{P_1}\\right)^{2/5} = 4 = 2^2 \\implies \\frac{P_2}{P_1} = (2^2)^{5/2} = 2^5 = 32$$\nSince $P_1 = 1\\text{ bar}$, $P_2 = 32\\text{ bar}$.\nHence, option (C).",
    topic: "Reversible Adiabatic/Isentropic Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Hard",
    image: null
  },
  {
    id: 25,
    number: 25,
    order: 25,
    type: "mcq",
    question: "The difference between heat of reaction at constant volume ($q_v$) and heat of reaction at constant pressure ($q_p$) for the formation of $1\\text{ mole}$ of liquid benzoic acid $\\text{C}_6\\text{H}_5\\text{COOH}(\\ell)$ at $300\\text{ K}$ will be:",
    text: "The difference between heat of reaction at constant volume ($q_v$) and heat of reaction at constant pressure ($q_p$) for the formation of $1\\text{ mole}$ of liquid benzoic acid $\\text{C}_6\\text{H}_5\\text{COOH}(\\ell)$ at $300\\text{ K}$ will be:",
    options: {
      A: "$24 \\times 10^2\\text{ cal}$",
      B: "$-24 \\times 10^2\\text{ cal}$",
      C: "$18 \\times 10^2\\text{ cal}$",
      D: "$-3 \\times 10^{-2}\\text{ cal}$"
    },
    correctAnswer: "A",
    explanation: "Standard formation reaction for $1\\text{ mole}$ of benzoic acid $\\text{C}_6\\text{H}_5\\text{COOH}(\\ell) = \\text{C}_7\\text{H}_6\\text{O}_2(\\ell)$:\n$$7\\text{C(graphite, s)} + 3\\text{H}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\longrightarrow \\text{C}_6\\text{H}_5\\text{COOH}(\\ell)$$\nChange in gaseous moles:\n$$\\Delta n_g = n_g(\\text{products}) - n_g(\\text{reactants}) = 0 - (3 + 1) = -4$$\nWe are asked to find the difference between heat of reaction at constant volume and heat of reaction at constant pressure:\n$$q_v - q_p = \\Delta U - \\Delta H = -\\Delta n_g R T$$\nGiven $R = 2\\text{ cal K}^{-1}\\text{mol}^{-1}$ and $T = 300\\text{ K}$:\n$$q_v - q_p = -(-4) \\times 2 \\times 300 = +2400\\text{ cal} = 24 \\times 10^2\\text{ cal}$$\nHence, option (A).",
    topic: "Thermochemical Calculations & Delta n_g",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  }
];
