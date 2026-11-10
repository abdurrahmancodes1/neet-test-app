/**
 * JEE Main 2027 Chemistry Assessment: Chemical Thermodynamics (Part 2)
 * Curated from Prayas JEE 2.0 2025 National Benchmark Series
 * 25 High-Yield Questions (MCQs + Section B Numericals) with Verified Solutions & KaTeX Formatting
 * Duration: 60 Minutes (Self-Adjustable 30-90 Mins) | Marking: +4 / -1 / 0 | Total Marks: 100
 */

export const JEE_2027_THERMO_PART2_TEST = {
  id: "jee-2027-thermodynamics-part-2",
  slug: "jee-2027-thermodynamics-part-2",
  title: "JEE Main 2027: Chemical Thermodynamics Drill (Part 2)",
  subtitle: "25 High-Yield Questions (MCQ & Numerical) · Hess's Law, Cyclic Processes & Calorimetry",
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
  releaseDate: "2026-11-10T12:00:00Z",
  syllabus: "Hess's Law of Constant Heat Summation, Born-Haber Cycle, Resonance Energy, Bomb Calorimetry, P-V Diagrams & Cyclic Work, Isothermal/Adiabatic Gas Expansions, Third Law & Phase Entropy"
};

export const JEE_2027_THERMO_PART2_QUESTIONS = [
  {
    id: 1,
    number: 1,
    order: 1,
    type: "mcq",
    question: "Calculate the enthalpy change $\\Delta H$ of the following homogeneous gaseous reaction:\n$$\\text{CH}_3\\text{COCH}_3\\text{(g)} + 2\\text{O}_2\\text{(g)} \\longrightarrow \\text{CH}_3\\text{COOH(g)} + \\text{CO}_2\\text{(g)} + \\text{H}_2\\text{O(g)}$$\nfrom the following bond energy and resonance energy data:\n- Bond energies ($\\text{kJ/mol}$): $\\text{C}-\\text{H} = 414; \\quad \\text{C}-\\text{C} = 348; \\quad \\text{C}=\\text{O} = 580; \\quad \\text{C}-\\text{O} = 354; \\quad \\text{O}=\\text{O} = 610; \\quad \\text{O}-\\text{H} = 462$\n- Magnitude of resonance energies ($\\text{kJ/mol}$): $-\\text{COOH} = 118; \\quad \\text{CO}_2 = 140$",
    text: "Calculate the enthalpy change $\\Delta H$ of the following homogeneous gaseous reaction:\n$$\\text{CH}_3\\text{COCH}_3\\text{(g)} + 2\\text{O}_2\\text{(g)} \\longrightarrow \\text{CH}_3\\text{COOH(g)} + \\text{CO}_2\\text{(g)} + \\text{H}_2\\text{O(g)}$$\nfrom the following bond energy and resonance energy data:\n- Bond energies ($\\text{kJ/mol}$): $\\text{C}-\\text{H} = 414; \\quad \\text{C}-\\text{C} = 348; \\quad \\text{C}=\\text{O} = 580; \\quad \\text{C}-\\text{O} = 354; \\quad \\text{O}=\\text{O} = 610; \\quad \\text{O}-\\text{H} = 462$\n- Magnitude of resonance energies ($\\text{kJ/mol}$): $-\\text{COOH} = 118; \\quad \\text{CO}_2 = 140$",
    options: {
      A: "$-348\\text{ kJ}$",
      B: "$168\\text{ kJ}$",
      C: "$-168\\text{ kJ}$",
      D: "$-348\\text{ kJ}$"
    },
    correctAnswer: "D",
    explanation: "Energy absorbed in breaking bonds of reactants:\n- In $\\text{CH}_3\\text{COCH}_3$: $6(\\text{C}-\\text{H}) + 2(\\text{C}-\\text{C}) + 1(\\text{C}=\\text{O}) = 6(414) + 2(348) + 580 = 2484 + 696 + 580 = 3760\\text{ kJ}$\n- In $2\\text{O}_2$: $2(\\text{O}=\\text{O}) = 2(610) = 1220\\text{ kJ}$\n$$\\text{Total reactant bond energy} = 3760 + 1220 = 4980\\text{ kJ}$$\n\nEnergy released in forming products (including resonance stabilization):\n- In $\\text{CH}_3\\text{COOH}$: $3(\\text{C}-\\text{H}) + 1(\\text{C}-\\text{C}) + 1(\\text{C}=\\text{O}) + 1(\\text{C}-\\text{O}) + 1(\\text{O}-\\text{H}) + \\text{RE} = 3(414) + 348 + 580 + 354 + 462 + 118 = 1242 + 1862 = 3104\\text{ kJ}$\n- In $\\text{CO}_2$: $2(\\text{C}=\\text{O}) + \\text{RE} = 2(580) + 140 = 1160 + 140 = 1300\\text{ kJ}$\n- In $\\text{H}_2\\text{O}$: $2(\\text{O}-\\text{H}) = 2(462) = 924\\text{ kJ}$\n$$\\text{Total product energy released} = 3104 + 1300 + 924 = 5328\\text{ kJ}$$\n$$\\Delta H = 4980 - 5328 = -348\\text{ kJ}$$\nHence, option (D).",
    topic: "Enthalpy of Reaction from Bond & Resonance Energies",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Hard",
    image: null
  },
  {
    id: 2,
    number: 2,
    order: 2,
    type: "mcq",
    question: "What is the change in internal energy ($\\Delta U$) when a gas contracts from $377\\text{ mL}$ to $177\\text{ mL}$ under a constant external pressure of $1520\\text{ torr}$, while at the same time being cooled by removing $124\\text{ J}$ of heat?",
    text: "What is the change in internal energy ($\\Delta U$) when a gas contracts from $377\\text{ mL}$ to $177\\text{ mL}$ under a constant external pressure of $1520\\text{ torr}$, while at the same time being cooled by removing $124\\text{ J}$ of heat?",
    options: {
      A: "$40.52\\text{ J}$",
      B: "$-83.48\\text{ J}$",
      C: "$-248\\text{ J}$",
      D: "None of these"
    },
    correctAnswer: "B",
    explanation: "According to the First Law of Thermodynamics: $$\\Delta U = q + w$$\n1. Heat removed from system: $q = -124\\text{ J}$.\n2. External pressure: $P_{\\text{ext}} = 1520\\text{ torr} = \\frac{1520}{760}\\text{ atm} = 2\\text{ atm} = 2 \\times 101.325\\text{ J L}^{-1}$.\n3. Volume change: $\\Delta V = 177 - 377 = -200\\text{ mL} = -0.200\\text{ L}$.\n4. Work done on the gas: $$w = -P_{\\text{ext}} \\Delta V = -(2\\text{ atm}) \\times (-0.200\\text{ L}) = +0.400\\text{ L atm}$$\nConverting to Joules: $w = 0.400 \\times 101.325\\text{ J} = +40.52\\text{ J}$.\n$$\\Delta U = -124\\text{ J} + 40.52\\text{ J} = -83.48\\text{ J}$$\nHence, option (B).",
    topic: "First Law Calculations",
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
    question: "For the auto-ionization of water at $25^\\circ\\text{C}$:\n$$\\text{H}_2\\text{O}(\\ell) \\rightleftharpoons \\text{H}^+\\text{(aq)} + \\text{OH}^-\\text{(aq)}$$\nthe equilibrium constant $K_w = 10^{-14}$. What is $\\Delta G^\\circ$ for the process?",
    text: "For the auto-ionization of water at $25^\\circ\\text{C}$:\n$$\\text{H}_2\\text{O}(\\ell) \\rightleftharpoons \\text{H}^+\\text{(aq)} + \\text{OH}^-\\text{(aq)}$$\nthe equilibrium constant $K_w = 10^{-14}$. What is $\\Delta G^\\circ$ for the process?",
    options: {
      A: "$\\simeq 8 \\times 10^4\\text{ J}$",
      B: "$\\simeq 3.5 \\times 10^4\\text{ J}$",
      C: "$\\simeq 10^4\\text{ J}$",
      D: "None of these"
    },
    correctAnswer: "A",
    explanation: "Standard Gibbs free energy change is related to the equilibrium constant by:\n$$\\Delta G^\\circ = -RT \\ln K = -2.303 RT \\log_{10} K$$\nGiven $T = 25 + 273.15 = 298.15\\text{ K}$, $R = 8.314\\text{ J K}^{-1}\\text{mol}^{-1}$, and $K = 10^{-14}$:\n$$\\Delta G^\\circ = -2.303 \\times 8.314 \\times 298.15 \\times \\log_{10}(10^{-14})$$\n$$\\Delta G^\\circ = -2.303 \\times 8.314 \\times 298.15 \\times (-14) = +79885\\text{ J} \\simeq 8 \\times 10^4\\text{ J}$$\nHence, option (A).",
    topic: "Equilibrium Constant & Delta G",
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
    question: "Sublimation energy of $\\text{Ca}$ is $121\\text{ kJ/mol}$. Dissociation energy of $\\text{Cl}_2$ is $242.8\\text{ kJ/mol}$, the total ionization energy of $\\text{Ca(g)} \\longrightarrow \\text{Ca}^{2+}\\text{(g)}$ is $2422\\text{ kJ/mol}$ and electron affinity of $\\text{Cl}$ is $-355\\text{ kJ/mol}$. Lattice energy of $\\text{CaCl}_2$ is $-2430.8\\text{ kJ/mol}$. What is $\\Delta H$ for the process:\n$$\\text{Ca(s)} + \\text{Cl}_2\\text{(g)} \\longrightarrow \\text{CaCl}_2\\text{(s)}?$$",
    text: "Sublimation energy of $\\text{Ca}$ is $121\\text{ kJ/mol}$. Dissociation energy of $\\text{Cl}_2$ is $242.8\\text{ kJ/mol}$, the total ionization energy of $\\text{Ca(g)} \\longrightarrow \\text{Ca}^{2+}\\text{(g)}$ is $2422\\text{ kJ/mol}$ and electron affinity of $\\text{Cl}$ is $-355\\text{ kJ/mol}$. Lattice energy of $\\text{CaCl}_2$ is $-2430.8\\text{ kJ/mol}$. What is $\\Delta H$ for the process:\n$$\\text{Ca(s)} + \\text{Cl}_2\\text{(g)} \\longrightarrow \\text{CaCl}_2\\text{(s)}?$$",
    options: {
      A: "$-355\\text{ kJ mol}^{-1}$",
      B: "$+3550\\text{ kJ mol}^{-1}$",
      C: "$-35.5\\text{ kJ mol}^{-1}$",
      D: "$-1720\\text{ kJ mol}^{-1}$"
    },
    correctAnswer: "A",
    explanation: "By the Born-Haber cycle for crystalline calcium chloride $\\text{CaCl}_2\\text{(s)}$:\n$$\\Delta H_f^\\circ = \\Delta H_{\\text{sub}}(\\text{Ca}) + \\text{IE}_{\\text{total}}(\\text{Ca}) + \\Delta H_{\\text{diss}}(\\text{Cl}_2) + 2 \\times \\text{EA}(\\text{Cl}) + U_{\\text{lattice}}$$\nNote: $1\\text{ mole}$ of $\\text{Cl}_2$ dissociates into $2\\text{ moles}$ of $\\text{Cl}$ atoms, each acquiring an electron: $2 \\times (-355) = -710\\text{ kJ/mol}$.\n$$\\Delta H_f^\\circ = 121 + 2422 + 242.8 - 710 - 2430.8$$\n$$\\Delta H_f^\\circ = 2785.8 - 3140.8 = -355\\text{ kJ mol}^{-1}$$\nHence, option (A).",
    topic: "Born-Haber Cycle & Lattice Enthalpy",
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
    question: "One mole of an ideal gas at $25^\\circ\\text{C}$ expands in volume from $1.0\\text{ L}$ to $4.0\\text{ L}$ at constant temperature. What work (in $\\text{J}$) is done if the gas expands against vacuum ($P_{\\text{external}} = 0$)?",
    text: "One mole of an ideal gas at $25^\\circ\\text{C}$ expands in volume from $1.0\\text{ L}$ to $4.0\\text{ L}$ at constant temperature. What work (in $\\text{J}$) is done if the gas expands against vacuum ($P_{\\text{external}} = 0$)?",
    options: {
      A: "$-4.0 \\times 10^2$",
      B: "$-3.0 \\times 10^2$",
      C: "$-1.0 \\times 10^2$",
      D: "Zero"
    },
    correctAnswer: "D",
    explanation: "Thermodynamic work against external opposing pressure is defined as:\n$$w = -\\int P_{\\text{ext}} dV$$\nWhen an expansion takes place against vacuum, the external opposing pressure is zero ($P_{\\text{external}} = 0$). Such an expansion is known as free expansion.\n$$w = -\\int 0 \\cdot dV = 0\\text{ J}$$\nHence, option (D).",
    topic: "Free Expansion of Ideal Gas",
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
    question: "A $0.05\\text{ L}$ sample of $0.2\\text{ M}$ aqueous hydrochloric acid is added to $0.05\\text{ L}$ of $0.2\\text{ M}$ aqueous ammonia in a calorimeter. Heat capacity of the entire calorimeter system is $480\\text{ J/K}$. The temperature increase observed is $1.09\\text{ K}$. Calculate $\\Delta_r H^\\circ$ in $\\text{kJ/mol}$ for the reaction:\n$$\\text{HCl(aq)} + \\text{NH}_3\\text{(aq)} \\longrightarrow \\text{NH}_4\\text{Cl(aq)}$$",
    text: "A $0.05\\text{ L}$ sample of $0.2\\text{ M}$ aqueous hydrochloric acid is added to $0.05\\text{ L}$ of $0.2\\text{ M}$ aqueous ammonia in a calorimeter. Heat capacity of the entire calorimeter system is $480\\text{ J/K}$. The temperature increase observed is $1.09\\text{ K}$. Calculate $\\Delta_r H^\\circ$ in $\\text{kJ/mol}$ for the reaction:\n$$\\text{HCl(aq)} + \\text{NH}_3\\text{(aq)} \\longrightarrow \\text{NH}_4\\text{Cl(aq)}$$",
    options: {
      A: "$-52.32$",
      B: "$-61.1$",
      C: "$-55.8$",
      D: "$-58.2$"
    },
    correctAnswer: "A",
    explanation: "Number of moles reacting:\n$$n = 0.05\\text{ L} \\times 0.2\\text{ mol/L} = 0.01\\text{ mol}$$\nHeat absorbed by calorimeter system:\n$$q_{\\text{cal}} = C_{\\text{sys}} \\Delta T = (480\\text{ J/K}) \\times (1.09\\text{ K}) = 523.2\\text{ J} = 0.5232\\text{ kJ}$$\nHeat released by neutralization reaction: $q_{\\text{rxn}} = -523.2\\text{ J} = -0.5232\\text{ kJ}$.\n$$\\Delta_r H^\\circ = \\frac{q_{\\text{rxn}}}{n} = \\frac{-0.5232\\text{ kJ}}{0.01\\text{ mol}} = -52.32\\text{ kJ/mol}$$\nHence, option (A).",
    topic: "Calorimetry & Enthalpy of Neutralization",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 7,
    number: 7,
    order: 7,
    type: "mcq",
    question: "An ideal gas undergoes isothermal compression from $5\\text{ m}^3$ to $1\\text{ m}^3$ against a constant external pressure of $4\\text{ N m}^{-2}$. Heat released in this process is used to increase the temperature of $1\\text{ mole}$ of $\\text{Al}$. If the molar heat capacity of $\\text{Al}$ is $24\\text{ J mol}^{-1}\\text{K}^{-1}$, the temperature of $\\text{Al}$ increases by:",
    text: "An ideal gas undergoes isothermal compression from $5\\text{ m}^3$ to $1\\text{ m}^3$ against a constant external pressure of $4\\text{ N m}^{-2}$. Heat released in this process is used to increase the temperature of $1\\text{ mole}$ of $\\text{Al}$. If the molar heat capacity of $\\text{Al}$ is $24\\text{ J mol}^{-1}\\text{K}^{-1}$, the temperature of $\\text{Al}$ increases by:",
    options: {
      A: "$\\frac{3}{2}\\text{ K}$",
      B: "$1\\text{ K}$",
      C: "$2\\text{ K}$",
      D: "$\\frac{2}{3}\\text{ K}$"
    },
    correctAnswer: "D",
    explanation: "For an isothermal compression of an ideal gas: $\\Delta U = 0 \\implies q + w = 0 \\implies q_{\\text{released}} = w$.\nWork done on the gas:\n$$w = -P_{\\text{ext}} (V_2 - V_1) = -4\\text{ N m}^{-2} \\times (1 - 5)\\text{ m}^3 = -4 \\times (-4) = +16\\text{ J}$$\nHeat released by the gas = $16\\text{ J}$.\nThis heat warms $1\\text{ mole}$ of aluminium:\n$$q = n C_m \\Delta T \\implies 16 = 1 \\times 24 \\times \\Delta T \\implies \\Delta T = \\frac{16}{24} = \\frac{2}{3}\\text{ K}$$\nHence, option (D).",
    topic: "Compression Work and Heat Capacity",
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
    question: "$18\\text{ g}$ of ice is converted into water at $0^\\circ\\text{C}$ and $1\\text{ atm}$. The entropies of $\\text{H}_2\\text{O(s)}$ and $\\text{H}_2\\text{O}(\\ell)$ are $38.2$ and $60\\text{ J mol}^{-1}\\text{K}^{-1}$ respectively. The enthalpy change for this conversion is:",
    text: "$18\\text{ g}$ of ice is converted into water at $0^\\circ\\text{C}$ and $1\\text{ atm}$. The entropies of $\\text{H}_2\\text{O(s)}$ and $\\text{H}_2\\text{O}(\\ell)$ are $38.2$ and $60\\text{ J mol}^{-1}\\text{K}^{-1}$ respectively. The enthalpy change for this conversion is:",
    options: {
      A: "$5951.4\\text{ J/mol}$",
      B: "$595.14\\text{ J/mol}$",
      C: "$-5951.4\\text{ J/mol}$",
      D: "None of these"
    },
    correctAnswer: "A",
    explanation: "At the normal melting temperature ($T = 0^\\circ\\text{C} = 273\\text{ K}$), solid ice and liquid water are in thermodynamic equilibrium ($\\Delta G = 0$).\n$$\\Delta S_{\\text{fusion}} = S(\\text{liquid}) - S(\\text{solid}) = 60 - 38.2 = 21.8\\text{ J mol}^{-1}\\text{K}^{-1}$$\n$$\\Delta H_{\\text{fusion}} = T \\Delta S_{\\text{fusion}} = 273\\text{ K} \\times 21.8\\text{ J mol}^{-1}\\text{K}^{-1} = 5951.4\\text{ J/mol}$$\nHence, option (A).",
    topic: "Entropy and Enthalpy of Fusion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 9,
    number: 9,
    order: 9,
    type: "mcq",
    question: "Out of internal energy (I), boiling point (II), pH (III), and E.M.F. of the cell (IV), the intensive properties are:",
    text: "Out of internal energy (I), boiling point (II), pH (III), and E.M.F. of the cell (IV), the intensive properties are:",
    options: {
      A: "I, II",
      B: "II, III, IV",
      C: "I, III, IV",
      D: "All of these"
    },
    correctAnswer: "B",
    explanation: "- **Internal energy (I):** Depends directly on the mass/quantity of matter in the system $\\implies$ Extensive property.\n- **Boiling point (II):** Characteristic property of a substance, independent of sample size $\\implies$ Intensive property.\n- **pH (III):** Defined as $-\\log[\\text{H}^+]$, which is a concentration ratio $\\implies$ Intensive property.\n- **E.M.F. of the cell (IV):** Electric potential difference ($E_\\text{cell}$) is independent of cell volume/mass (unlike $\\Delta G = -nFE$, which is extensive) $\\implies$ Intensive property.\nTherefore, II, III, and IV are intensive properties. Hence, option (B).",
    topic: "Intensive vs Extensive Properties",
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
    question: "The heat capacity of a bomb calorimeter is $500\\text{ J/}^\\circ\\text{C}$. A $2^\\circ\\text{C}$ rise in temperature has been observed on the combustion of $0.1\\text{ g}$ of methane ($\\text{CH}_4$). What is the value of $\\Delta E$ (or $\\Delta U$) per mole of methane?",
    text: "The heat capacity of a bomb calorimeter is $500\\text{ J/}^\\circ\\text{C}$. A $2^\\circ\\text{C}$ rise in temperature has been observed on the combustion of $0.1\\text{ g}$ of methane ($\\text{CH}_4$). What is the value of $\\Delta E$ (or $\\Delta U$) per mole of methane?",
    options: {
      A: "$1\\text{ kJ}$",
      B: "$160\\text{ kJ}$",
      C: "$-160\\text{ kJ}$",
      D: "$-1\\text{ kJ}$"
    },
    correctAnswer: "C",
    explanation: "A bomb calorimeter operates at constant volume, so the heat measured is $q_v = \\Delta E$.\nHeat absorbed by the calorimeter:\n$$q_{\\text{cal}} = C \\Delta T = (500\\text{ J/}^\\circ\\text{C}) \\times (2^\\circ\\text{C}) = 1000\\text{ J} = 1\\text{ kJ}$$\nHeat released by $0.1\\text{ g}$ of methane: $q_v = -1\\text{ kJ}$.\nMolar mass of $\\text{CH}_4 = 12 + 4 = 16\\text{ g mol}^{-1}$.\nMoles of methane burnt:\n$$n = \\frac{0.1\\text{ g}}{16\\text{ g mol}^{-1}} = \\frac{1}{160}\\text{ mol}$$\n$$\\Delta E = \\frac{q_v}{n} = \\frac{-1\\text{ kJ}}{1/160\\text{ mol}} = -160\\text{ kJ mol}^{-1}$$\nHence, option (C).",
    topic: "Bomb Calorimetry & Delta U",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 11,
    number: 11,
    order: 11,
    type: "numerical",
    question: "If three moles of an ideal gas at $300\\text{ K}$ expand isothermally from $30\\text{ dm}^3$ to $45\\text{ dm}^3$ against a constant opposing pressure of $80\\text{ kPa}$, then the amount of heat transferred is ______ J (Enter integer value).",
    text: "If three moles of an ideal gas at $300\\text{ K}$ expand isothermally from $30\\text{ dm}^3$ to $45\\text{ dm}^3$ against a constant opposing pressure of $80\\text{ kPa}$, then the amount of heat transferred is ______ J (Enter integer value).",
    options: {},
    correctAnswer: "1200",
    explanation: "For an isothermal expansion of an ideal gas, $\\Delta U = 0$.\nBy the First Law of Thermodynamics: $$\\Delta U = q + w \\implies q = -w$$\nWork done against constant opposing pressure:\n$$w = -P_{\\text{ext}} \\Delta V = -P_{\\text{ext}} (V_2 - V_1)$$\nGiven:\n$P_{\\text{ext}} = 80\\text{ kPa} = 80 \\times 10^3\\text{ Pa}$\n$V_1 = 30\\text{ dm}^3 = 30 \\times 10^{-3}\\text{ m}^3$\n$V_2 = 45\\text{ dm}^3 = 45 \\times 10^{-3}\\text{ m}^3$\n$$\\Delta V = 15 \\times 10^{-3}\\text{ m}^3$$\n$$w = -(80 \\times 10^3) \\times (15 \\times 10^{-3}) = -1200\\text{ J}$$\nTherefore, heat transferred is:\n$$q = -w = -(-1200\\text{ J}) = 1200\\text{ J}$$\nHence, the integer answer is 1200.",
    topic: "Isothermal Irreversible Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 12,
    number: 12,
    order: 12,
    type: "mcq",
    question: "Which of the following statements is not correct?",
    text: "Which of the following statements is not correct?",
    options: {
      A: "$\\Delta G$ is positive for a non-spontaneous reaction",
      B: "$\\Delta G$ is positive for a spontaneous reaction",
      C: "$\\Delta G$ is negative for a spontaneous reaction",
      D: "$\\Delta G$ is zero for a reversible reaction at equilibrium"
    },
    correctAnswer: "B",
    explanation: "According to the Second Law of Thermodynamics, for any spontaneous reaction occurring at constant temperature and pressure, the Gibbs free energy must strictly decrease: $$\\Delta G < 0 \\quad (\\text{negative})$$\nStatement (B) asserts that $\\Delta G$ is positive for a spontaneous reaction, which is incorrect. Hence, option (B).",
    topic: "Spontaneity Criteria",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 13,
    number: 13,
    order: 13,
    type: "numerical",
    question: "Standard enthalpy of vapourisation for $\\text{CCl}_4$ is $30.5\\text{ kJ mol}^{-1}$. Heat required for vapourisation of $284\\text{ g}$ of $\\text{CCl}_4$ at constant temperature is ______ kJ (nearest integer). [Given molar mass in $\\text{g mol}^{-1}$: $\\text{C} = 12, \\text{Cl} = 35.5$]",
    text: "Standard enthalpy of vapourisation for $\\text{CCl}_4$ is $30.5\\text{ kJ mol}^{-1}$. Heat required for vapourisation of $284\\text{ g}$ of $\\text{CCl}_4$ at constant temperature is ______ kJ (nearest integer). [Given molar mass in $\\text{g mol}^{-1}$: $\\text{C} = 12, \\text{Cl} = 35.5$]",
    options: {},
    correctAnswer: "56",
    explanation: "Molar mass of carbon tetrachloride $\\text{CCl}_4 = 12 + (4 \\times 35.5) = 154\\text{ g mol}^{-1}$.\nNumber of moles of $\\text{CCl}_4$:\n$$n = \\frac{284\\text{ g}}{154\\text{ g mol}^{-1}} \\approx 1.844\\text{ mol}$$\nHeat required for vapourisation:\n$$q = n \\times \\Delta_{\\text{vap}} H^\\circ = 1.844\\text{ mol} \\times 30.5\\text{ kJ mol}^{-1} \\approx 56.24\\text{ kJ}$$\nRounding off to the nearest integer gives 56.",
    topic: "Enthalpy of Vapourisation",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 14,
    number: 14,
    order: 14,
    type: "numerical",
    question: "An ideal gas undergoes a cyclic transformation starting from point A and returning to A by tracing the path $A \\longrightarrow B \\longrightarrow C \\longrightarrow A$ as shown in the $V-P$ diagram below. The total work done in the process is ______ J (Enter integer value).",
    text: "An ideal gas undergoes a cyclic transformation starting from point A and returning to A by tracing the path $A \\longrightarrow B \\longrightarrow C \\longrightarrow A$ as shown in the $V-P$ diagram below. The total work done in the process is ______ J (Enter integer value).",
    options: {},
    correctAnswer: "200",
    explanation: "For any cyclic process on a $P-V$ indicator diagram, the magnitude of work done is equal to the enclosed area of the cycle:\n$$\\text{Work} = \\text{Area of right-angled } \\Delta ABC = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height}$$\nFrom the diagram:\n- Base along pressure axis ($P$): $\\Delta P = 30\\text{ kPa} - 10\\text{ kPa} = 20\\text{ kPa} = 20 \\times 10^3\\text{ Pa}$\n- Height along volume axis ($V$): $\\Delta V = 30\\text{ dm}^3 - 10\\text{ dm}^3 = 20\\text{ dm}^3 = 20 \\times 10^{-3}\\text{ m}^3$\n$$\\text{Work} = \\frac{1}{2} \\times (20 \\times 10^{-3}\\text{ m}^3) \\times (20 \\times 10^3\\text{ Pa}) = \\frac{1}{2} \\times 400 = 200\\text{ J}$$\nHence, the integer answer is 200.",
    topic: "Work Done in Cyclic Processes",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    questionImage: {
      data: `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="320" height="260" fill="#0A0E1A" rx="12"/>
  <line x1="60" y1="20" x2="60" y2="210" stroke="#94A3B8" stroke-width="2"/>
  <polygon points="60,15 56,25 64,25" fill="#94A3B8"/>
  <line x1="50" y1="210" x2="300" y2="210" stroke="#94A3B8" stroke-width="2"/>
  <polygon points="305,210 295,206 295,214" fill="#94A3B8"/>
  <text x="35" y="25" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">V</text>
  <text x="20" y="40" fill="#94A3B8" font-family="monospace" font-size="10">(dm³)</text>
  <text x="250" y="240" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">P (kPa)</text>
  <text x="40" y="214" fill="#94A3B8" font-family="monospace" font-size="10">0</text>
  <line x1="55" y1="150" x2="65" y2="150" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="35" y="154" fill="#94A3B8" font-family="monospace" font-size="10">10</text>
  <line x1="55" y1="30" x2="65" y2="30" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="35" y="34" fill="#94A3B8" font-family="monospace" font-size="10">30</text>
  <line x1="130" y1="205" x2="130" y2="215" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="123" y="228" fill="#94A3B8" font-family="monospace" font-size="10">10</text>
  <line x1="200" y1="205" x2="200" y2="215" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="193" y="228" fill="#94A3B8" font-family="monospace" font-size="10">20</text>
  <line x1="270" y1="205" x2="270" y2="215" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="263" y="228" fill="#94A3B8" font-family="monospace" font-size="10">30</text>
  <line x1="60" y1="30" x2="130" y2="30" stroke="#475569" stroke-dasharray="4,4" stroke-width="1"/>
  <line x1="60" y1="150" x2="270" y2="150" stroke="#475569" stroke-dasharray="4,4" stroke-width="1"/>
  <line x1="130" y1="150" x2="130" y2="210" stroke="#475569" stroke-dasharray="4,4" stroke-width="1"/>
  <line x1="270" y1="150" x2="270" y2="210" stroke="#475569" stroke-dasharray="4,4" stroke-width="1"/>
  <polygon points="130,150 130,30 270,150" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="130,85 126,95 134,95" fill="#38BDF8"/>
  <polygon points="204,94 193,90 200,82" fill="#38BDF8"/>
  <polygon points="195,150 205,146 205,154" fill="#38BDF8"/>
  <circle cx="130" cy="150" r="4" fill="#38BDF8"/>
  <text x="115" y="165" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">A</text>
  <circle cx="130" cy="30" r="4" fill="#38BDF8"/>
  <text x="125" y="20" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">B</text>
  <circle cx="270" cy="150" r="4" fill="#38BDF8"/>
  <text x="278" y="155" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">C</text>
</svg>`
    },
    image: null
  },
  {
    id: 15,
    number: 15,
    order: 15,
    type: "numerical",
    question: "Two reactions are given below:\n(1) $2\\text{Fe(s)} + \\frac{3}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{Fe}_2\\text{O}_3\\text{(s)}, \\quad \\Delta H^\\circ = -822\\text{ kJ/mol}$\n(2) $\\text{C(s)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)}, \\quad \\Delta H^\\circ = -110\\text{ kJ/mol}$\nThen the enthalpy change for the carbothermic reduction reaction:\n$$3\\text{C(s)} + \\text{Fe}_2\\text{O}_3\\text{(s)} \\longrightarrow 2\\text{Fe(s)} + 3\\text{CO(g)}$$\nis ______ kJ/mol (Enter integer value).",
    text: "Two reactions are given below:\n(1) $2\\text{Fe(s)} + \\frac{3}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{Fe}_2\\text{O}_3\\text{(s)}, \\quad \\Delta H^\\circ = -822\\text{ kJ/mol}$\n(2) $\\text{C(s)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)}, \\quad \\Delta H^\\circ = -110\\text{ kJ/mol}$\nThen the enthalpy change for the carbothermic reduction reaction:\n$$3\\text{C(s)} + \\text{Fe}_2\\text{O}_3\\text{(s)} \\longrightarrow 2\\text{Fe(s)} + 3\\text{CO(g)}$$\nis ______ kJ/mol (Enter integer value).",
    options: {},
    correctAnswer: "492",
    explanation: "For the target reaction: $$3\\text{C(s)} + \\text{Fe}_2\\text{O}_3\\text{(s)} \\longrightarrow 2\\text{Fe(s)} + 3\\text{CO(g)}$$\n$$\\Delta H_{\\text{rxn}}^\\circ = [2 \\times \\Delta H_f^\\circ(\\text{Fe}) + 3 \\times \\Delta H_f^\\circ(\\text{CO})] - [3 \\times \\Delta H_f^\\circ(\\text{C}) + \\Delta H_f^\\circ(\\text{Fe}_2\\text{O}_3)]$$\nStandard states of elements $\\text{Fe(s)}$ and $\\text{C(s)}$ have $\\Delta H_f^\\circ = 0$.\n$$\\Delta H_{\\text{rxn}}^\\circ = 3(-110) - (-822) = -330 + 822 = +492\\text{ kJ/mol}$$\nHence, the integer answer is 492.",
    topic: "Hess's Law & Metallurgy Thermochemistry",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 16,
    number: 16,
    order: 16,
    type: "mcq",
    question: "Choose the correct thermodynamic option for the free expansion of an ideal gas under adiabatic conditions:",
    text: "Choose the correct thermodynamic option for the free expansion of an ideal gas under adiabatic conditions:",
    options: {
      A: "$q \\neq 0, \\Delta T = 0, w = 0$",
      B: "$q = 0, \\Delta T = 0, w = 0$",
      C: "$q = 0, \\Delta T < 0, w \\neq 0$",
      D: "$q = 0, \\Delta T \\neq 0, w = 0$"
    },
    correctAnswer: "B",
    explanation: "1. For an adiabatic process: no heat enters or leaves the system, so $q = 0$.\n2. For free expansion: expansion against vacuum occurs with $P_{\\text{ext}} = 0$, so work done $w = -\\int P_{\\text{ext}} dV = 0$.\n3. Applying First Law: $\\Delta U = q + w = 0 + 0 = 0$.\n4. For an ideal gas: $\\Delta U = n C_v \\Delta T = 0 \\implies \\Delta T = 0$.\nTherefore: $q = 0, \\Delta T = 0, w = 0$. Hence, option (B).",
    topic: "Adiabatic Free Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 17,
    number: 17,
    order: 17,
    type: "mcq",
    question: "Given:\n(1) $2\\text{CO(g)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{CO}_2\\text{(g)}, \\quad \\Delta H_1^\\circ = -x\\text{ kJ mol}^{-1}$\n(2) $\\text{C(graphite)} + \\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)}, \\quad \\Delta H_2^\\circ = -y\\text{ kJ mol}^{-1}$\nThe standard enthalpy $\\Delta H^\\circ$ for the reaction:\n$$\\text{C(graphite)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)}$$\nis:",
    text: "Given:\n(1) $2\\text{CO(g)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{CO}_2\\text{(g)}, \\quad \\Delta H_1^\\circ = -x\\text{ kJ mol}^{-1}$\n(2) $\\text{C(graphite)} + \\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)}, \\quad \\Delta H_2^\\circ = -y\\text{ kJ mol}^{-1}$\nThe standard enthalpy $\\Delta H^\\circ$ for the reaction:\n$$\\text{C(graphite)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)}$$\nis:",
    options: {
      A: "$\\frac{x - 2y}{2}$",
      B: "$\\frac{x + 2y}{2}$",
      C: "$\\frac{2x - y}{2}$",
      D: "$2y - x$"
    },
    correctAnswer: "A",
    explanation: "Target equation:\n$$\\text{C(graphite)} + \\frac{1}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO(g)}$$\nFrom equation (2):\n$$\\text{C} + \\text{O}_2 \\longrightarrow \\text{CO}_2, \\quad \\Delta H = -y$$\nReversing equation (1) and dividing by 2:\n$$\\text{CO}_2 \\longrightarrow \\text{CO} + \\frac{1}{2}\\text{O}_2, \\quad \\Delta H = -\\left(-\\frac{x}{2}\\right) = +\\frac{x}{2}$$\nAdding both equations:\n$$\\text{C} + \\frac{1}{2}\\text{O}_2 \\longrightarrow \\text{CO}$$\n$$\\Delta H^\\circ = -y + \\frac{x}{2} = \\frac{x - 2y}{2}\\text{ kJ mol}^{-1}$$\nHence, option (A).",
    topic: "Hess's Law Algebraic Manipulations",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 18,
    number: 18,
    order: 18,
    type: "mcq",
    question: "Which of the following thermodynamic relations are correct?\n(A) $\\Delta U = q + P\\Delta V$\n(B) $\\Delta G = \\Delta H - T\\Delta S$\n(C) $\\Delta S = \\frac{q_{\\text{rev}}}{T}$\n(D) $\\Delta H = \\Delta U - \\Delta n_g R T$\n\nChoose the most appropriate answer from the options below:",
    text: "Which of the following thermodynamic relations are correct?\n(A) $\\Delta U = q + P\\Delta V$\n(B) $\\Delta G = \\Delta H - T\\Delta S$\n(C) $\\Delta S = \\frac{q_{\\text{rev}}}{T}$\n(D) $\\Delta H = \\Delta U - \\Delta n_g R T$\n\nChoose the most appropriate answer from the options below:",
    options: {
      A: "(C) and (D) only",
      B: "(B) and (C) only",
      C: "(A) and (B) only",
      D: "(B) and (D) only"
    },
    correctAnswer: "B",
    explanation: "- **(A):** The First Law with expansion work is $\\Delta U = q + w = q - P_{\\text{ext}}\\Delta V$. Thus, $\\Delta U = q + P\\Delta V$ has an incorrect sign.\n- **(B):** $\\Delta G = \\Delta H - T\\Delta S$ is the fundamental Gibbs-Helmholtz definition $\\implies$ **Correct**.\n- **(C):** $\\Delta S = \\frac{q_{\\text{rev}}}{T}$ is Clausius's definition of entropy change $\\implies$ **Correct**.\n- **(D):** The correct enthalpy relationship is $\\Delta H = \\Delta U + \\Delta n_g R T$. The minus sign makes it incorrect.\nTherefore, only (B) and (C) are correct. Hence, option (B).",
    topic: "Thermodynamic Formulae & Relations",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 19,
    number: 19,
    order: 19,
    type: "mcq",
    question: "The true statement amongst the following is:",
    text: "The true statement amongst the following is:",
    options: {
      A: "$S$ is a function of temperature but $\\Delta S$ is not a function of temperature.",
      B: "Both $\\Delta S$ and $S$ are functions of temperature.",
      C: "$S$ is not a function of temperature but $\\Delta S$ is a function of temperature.",
      D: "Both $S$ and $\\Delta S$ are not functions of temperature."
    },
    correctAnswer: "B",
    explanation: "At constant pressure:\n$$dS = \\frac{C_p}{T} dT \\implies S(T) = S(0) + \\int_0^T \\frac{C_p}{T} dT$$\nThus, absolute entropy $S$ is a direct function of temperature.\nSimilarly, the change in entropy between temperatures $T_1$ and $T_2$ is:\n$$\\Delta S = \\int_{T_1}^{T_2} \\frac{C_p}{T} dT = C_p \\ln\\left(\\frac{T_2}{T_1}\\right)$$\nThis shows that $\\Delta S$ is also a function of temperature.\nTherefore, both $S$ and $\\Delta S$ are functions of temperature. Hence, option (B).",
    topic: "Temperature Dependence of Entropy",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 20,
    number: 20,
    order: 20,
    type: "numerical",
    question: "When $5\\text{ moles}$ of helium gas expand isothermally and reversibly at $300\\text{ K}$ from $10\\text{ litre}$ to $20\\text{ litre}$, the magnitude of the maximum work obtained is ______ J (nearest integer). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$ and $\\log_{10} 2 = 0.3010$]",
    text: "When $5\\text{ moles}$ of helium gas expand isothermally and reversibly at $300\\text{ K}$ from $10\\text{ litre}$ to $20\\text{ litre}$, the magnitude of the maximum work obtained is ______ J (nearest integer). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$ and $\\log_{10} 2 = 0.3010$]",
    options: {},
    correctAnswer: "8630",
    explanation: "For an isothermal and reversible expansion of an ideal gas:\n$$w_{\\text{max}} = -2.303 n R T \\log_{10}\\left(\\frac{V_2}{V_1}\\right)$$\nMagnitude of maximum work $|w|$:\n$$|w| = 2.303 \\times 5 \\times 8.3 \\times 300 \\times \\log_{10}\\left(\\frac{20}{10}\\right)$$\n$$|w| = 2.303 \\times 5 \\times 8.3 \\times 300 \\times 0.3010$$\n$$|w| = (2.303 \\times 0.3010) \\times (5 \\times 8.3 \\times 300) = 0.6932 \\times 12450 = 8630.34\\text{ J}$$\nRounding to the nearest integer gives 8630.",
    topic: "Reversible Isothermal Work",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  },
  {
    id: 21,
    number: 21,
    order: 21,
    type: "numerical",
    question: "$4.0\\text{ L}$ of an ideal gas is allowed to expand isothermally into a vacuum until the total volume reaches $20\\text{ L}$. The amount of heat absorbed in this expansion is ______ L atm (Enter integer value).",
    text: "$4.0\\text{ L}$ of an ideal gas is allowed to expand isothermally into a vacuum until the total volume reaches $20\\text{ L}$. The amount of heat absorbed in this expansion is ______ L atm (Enter integer value).",
    options: {},
    correctAnswer: "0",
    explanation: "Expansion into vacuum is free expansion:\n$$P_{\\text{ext}} = 0 \\implies w = -P_{\\text{ext}}\\Delta V = 0\\text{ L atm}$$\nFor an isothermal process involving an ideal gas:\n$$\\Delta U = n C_v \\Delta T = 0$$\nBy the First Law of Thermodynamics: $$\\Delta U = q + w \\implies q = \\Delta U - w = 0 - 0 = 0\\text{ L atm}$$\nThus, the heat absorbed in this free expansion is 0.",
    topic: "Isothermal Free Expansion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Easy",
    image: null
  },
  {
    id: 22,
    number: 22,
    order: 22,
    type: "numerical",
    question: "Five moles of an ideal gas at $293\\text{ K}$ expand isothermally from an initial pressure of $2.1\\text{ MPa}$ to $1.3\\text{ MPa}$ against a constant external pressure of $4.3\\text{ MPa}$. The heat transferred in this process is ______ kJ (Rounded-off to the nearest integer). [Use $R = 8.314\\text{ J mol}^{-1}\\text{K}^{-1}$]",
    text: "Five moles of an ideal gas at $293\\text{ K}$ expand isothermally from an initial pressure of $2.1\\text{ MPa}$ to $1.3\\text{ MPa}$ against a constant external pressure of $4.3\\text{ MPa}$. The heat transferred in this process is ______ kJ (Rounded-off to the nearest integer). [Use $R = 8.314\\text{ J mol}^{-1}\\text{K}^{-1}$]",
    options: {},
    correctAnswer: "15",
    explanation: "For an isothermal process of an ideal gas: $\\Delta U = 0 \\implies q = -w$.\nWork done against constant external pressure:\n$$w = -P_{\\text{ext}} (V_2 - V_1) = -P_{\\text{ext}} \\left(\\frac{nRT}{P_2} - \\frac{nRT}{P_1}\\right) = -nRT P_{\\text{ext}} \\left(\\frac{1}{P_2} - \\frac{1}{P_1}\\right)$$\nGiven:\n$n = 5\\text{ mol}$\n$T = 293\\text{ K}$\n$P_{\\text{ext}} = 4.3\\text{ MPa}$\n$P_1 = 2.1\\text{ MPa}, \\quad P_2 = 1.3\\text{ MPa}$\n$$\\left(\\frac{1}{1.3} - \\frac{1}{2.1}\\right) = \\frac{2.1 - 1.3}{2.73} = \\frac{0.8}{2.73} \\approx 0.29304$$\n$$w = -5 \\times 8.314 \\times 293 \\times 4.3 \\times 0.29304 = -15372\\text{ J} \\approx -15.37\\text{ kJ}$$\nHeat transferred: $q = -w = +15.37\\text{ kJ} \\approx 15\\text{ kJ}$.\nHence, the integer answer is 15.",
    topic: "Isothermal Irreversible Expansion against External Pressure",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Hard",
    image: null
  },
  {
    id: 23,
    number: 23,
    order: 23,
    type: "numerical",
    question: "The magnitude of work done by a gas that undergoes a reversible expansion along the path ABC shown in the figure below is ______ J (Enter numerical value).",
    text: "The magnitude of work done by a gas that undergoes a reversible expansion along the path ABC shown in the figure below is ______ J (Enter numerical value).",
    options: {},
    correctAnswer: "48",
    explanation: "The work done during expansion is represented by the total area under the path $ABC$ down to $P = 0$:\n$$\\text{Total Work} = W_{AB} + W_{BC}$$\n1. Along path $AB$: Isobaric expansion from $V = 4\\text{ m}^3$ to $V = 8\\text{ m}^3$ at constant pressure $P = 8\\text{ Pa}$:\n$$W_{AB} = P \\Delta V = 8\\text{ Pa} \\times (8 - 4)\\text{ m}^3 = 8 \\times 4 = 32\\text{ J}$$\n2. Along path $BC$: Linear expansion from $(V = 8\\text{ m}^3, P = 8\\text{ Pa})$ to $(V = 12\\text{ m}^3, P = 0\\text{ Pa})$:\n$$W_{BC} = \\text{Area of triangle} = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height} = \\frac{1}{2} \\times (12 - 8) \\times 8 = \\frac{1}{2} \\times 4 \\times 8 = 16\\text{ J}$$\n$$\\text{Total Work} = 32 + 16 = 48\\text{ J}$$\nHence, the numerical answer is 48.",
    topic: "P-V Indicator Diagram Work",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    questionImage: {
      data: `<svg viewBox="0 0 340 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="340" height="250" fill="#0A0E1A" rx="12"/>
  <line x1="50" y1="25" x2="50" y2="200" stroke="#94A3B8" stroke-width="2"/>
  <polygon points="50,20 46,30 54,30" fill="#94A3B8"/>
  <line x1="45" y1="200" x2="315" y2="200" stroke="#94A3B8" stroke-width="2"/>
  <polygon points="320,200 310,196 310,204" fill="#94A3B8"/>
  <text x="20" y="25" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">Pressure</text>
  <text x="32" y="38" fill="#94A3B8" font-family="monospace" font-size="10">(Pa)</text>
  <text x="250" y="230" fill="#F59E0B" font-family="monospace" font-size="11" font-weight="bold">Volume (m³)</text>
  <line x1="45" y1="140" x2="55" y2="140" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="30" y="144" fill="#94A3B8" font-family="monospace" font-size="10">4</text>
  <line x1="45" y1="110" x2="55" y2="110" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="30" y="114" fill="#94A3B8" font-family="monospace" font-size="10">6</text>
  <line x1="45" y1="80" x2="55" y2="80" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="30" y="84" fill="#94A3B8" font-family="monospace" font-size="10">8</text>
  <line x1="45" y1="50" x2="55" y2="50" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="25" y="54" fill="#94A3B8" font-family="monospace" font-size="10">10</text>
  <text x="26" y="214" fill="#94A3B8" font-family="monospace" font-size="9">(2, 2)</text>
  <line x1="90" y1="195" x2="90" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="87" y="218" fill="#94A3B8" font-family="monospace" font-size="10">2</text>
  <line x1="130" y1="195" x2="130" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="127" y="218" fill="#94A3B8" font-family="monospace" font-size="10">4</text>
  <line x1="170" y1="195" x2="170" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="167" y="218" fill="#94A3B8" font-family="monospace" font-size="10">6</text>
  <line x1="210" y1="195" x2="210" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="207" y="218" fill="#94A3B8" font-family="monospace" font-size="10">8</text>
  <line x1="250" y1="195" x2="250" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="244" y="218" fill="#94A3B8" font-family="monospace" font-size="10">10</text>
  <line x1="290" y1="195" x2="290" y2="205" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="284" y="218" fill="#94A3B8" font-family="monospace" font-size="10">12</text>
  <polygon points="130,200 130,80 210,80 290,200" fill="rgba(245, 158, 11, 0.15)"/>
  <line x1="50" y1="80" x2="130" y2="80" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="130" y1="80" x2="130" y2="200" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="210" y1="80" x2="210" y2="200" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="130" y1="80" x2="210" y2="80" stroke="#F59E0B" stroke-width="3"/>
  <line x1="210" y1="80" x2="290" y2="200" stroke="#F59E0B" stroke-width="3"/>
  <circle cx="130" cy="80" r="4.5" fill="#F59E0B"/>
  <text x="122" y="70" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">A</text>
  <circle cx="210" cy="80" r="4.5" fill="#F59E0B"/>
  <text x="205" y="70" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">B</text>
  <circle cx="290" cy="200" r="4.5" fill="#F59E0B"/>
  <text x="296" y="196" fill="#F8FAFC" font-family="monospace" font-size="12" font-weight="bold">C</text>
</svg>`
    },
    image: null
  },
  {
    id: 24,
    number: 24,
    order: 24,
    type: "numerical",
    question: "For complete combustion of ethene:\n$$\\text{C}_2\\text{H}_4\\text{(g)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{CO}_2\\text{(g)} + 2\\text{H}_2\\text{O}(\\ell)$$\nthe amount of heat produced as measured in a bomb calorimeter is $1406\\text{ kJ mol}^{-1}$ at $300\\text{ K}$. The minimum value of $T\\Delta S$ needed to reach equilibrium is $(-) \\text{______ kJ}$ (Enter integer value). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$]",
    text: "For complete combustion of ethene:\n$$\\text{C}_2\\text{H}_4\\text{(g)} + 3\\text{O}_2\\text{(g)} \\longrightarrow 2\\text{CO}_2\\text{(g)} + 2\\text{H}_2\\text{O}(\\ell)$$\nthe amount of heat produced as measured in a bomb calorimeter is $1406\\text{ kJ mol}^{-1}$ at $300\\text{ K}$. The minimum value of $T\\Delta S$ needed to reach equilibrium is $(-) \\text{______ kJ}$ (Enter integer value). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$]",
    options: {},
    correctAnswer: "1411",
    explanation: "In a bomb calorimeter (constant volume), the heat measured is $\\Delta U = -1406\\text{ kJ mol}^{-1}$.\n$$\\Delta H = \\Delta U + \\Delta n_g R T$$\nHere $\\Delta n_g = n_g(\\text{products}) - n_g(\\text{reactants}) = 2 - (1 + 3) = -2$.\n$$\\Delta n_g R T = (-2) \\times (8.3 \\times 10^{-3}\\text{ kJ K}^{-1}) \\times 300\\text{ K} = -4.98\\text{ kJ}$$\n$$\\Delta H = -1406 + (-4.98) = -1410.98\\text{ kJ} \\approx -1411\\text{ kJ}$$\nAt equilibrium, $\\Delta G = 0 \\implies \\Delta H - T\\Delta S = 0 \\implies T\\Delta S = \\Delta H = -1411\\text{ kJ}$.\nHence, the magnitude of $(-) T\\Delta S$ needed is 1411.",
    topic: "Bomb Calorimeter & Equilibrium Criterion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Hard",
    image: null
  },
  {
    id: 25,
    number: 25,
    order: 25,
    type: "numerical",
    question: "For complete combustion of methanol:\n$$\\text{CH}_3\\text{OH}(\\ell) + \\frac{3}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)} + 2\\text{H}_2\\text{O}(\\ell)$$\nthe amount of heat produced as measured by bomb calorimeter is $726\\text{ kJ mol}^{-1}$ at $27^\\circ\\text{C}$. The enthalpy of combustion for the reaction is $-x\\text{ kJ mol}^{-1}$, where $x$ is ______ (Nearest integer). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$]",
    text: "For complete combustion of methanol:\n$$\\text{CH}_3\\text{OH}(\\ell) + \\frac{3}{2}\\text{O}_2\\text{(g)} \\longrightarrow \\text{CO}_2\\text{(g)} + 2\\text{H}_2\\text{O}(\\ell)$$\nthe amount of heat produced as measured by bomb calorimeter is $726\\text{ kJ mol}^{-1}$ at $27^\\circ\\text{C}$. The enthalpy of combustion for the reaction is $-x\\text{ kJ mol}^{-1}$, where $x$ is ______ (Nearest integer). [Given: $R = 8.3\\text{ J K}^{-1}\\text{mol}^{-1}$]",
    options: {},
    correctAnswer: "727",
    explanation: "In a bomb calorimeter (constant volume), the measured heat is $\\Delta U = -726\\text{ kJ mol}^{-1}$.\n$$\\Delta H = \\Delta U + \\Delta n_g R T$$\nChange in gaseous moles:\n$$\\Delta n_g = 1 - 1.5 = -0.5$$\n$T = 27 + 273.15 = 300\\text{ K}$, $R = 8.3 \\times 10^{-3}\\text{ kJ K}^{-1}\\text{mol}^{-1}$.\n$$\\Delta n_g R T = (-0.5) \\times (8.3 \\times 10^{-3}) \\times 300 = -1.245\\text{ kJ}$$\n$$\\Delta H = -726 - 1.245 = -727.245\\text{ kJ mol}^{-1} \\approx -727\\text{ kJ mol}^{-1}$$\nTherefore, the enthalpy of combustion is $-727\\text{ kJ mol}^{-1}$, meaning $x = 727$.",
    topic: "Bomb Calorimeter & Enthalpy of Combustion",
    chapter: "Thermodynamics",
    subject: "Chemistry",
    difficulty: "Medium",
    image: null
  }
];
