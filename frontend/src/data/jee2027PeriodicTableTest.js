/**
 * JEE Main 2027 Chemistry Assessment: Classification of Elements and Periodicity in Properties
 * Curated from 2021-2025 Official JEE Main PYQs and Arjuna JEE Cadbury Challenges
 * 30 High-Yield, Distinct Questions with Verified Solutions & KaTeX Formatting
 * Duration: 60 Minutes (Standard JEE Main Chemistry Sectional Time) | Marking: +4 / -1 / 0
 */

export const JEE_2027_PERIODIC_TEST = {
  id: "jee-2027-periodic-properties-mastery-drill",
  title: "JEE Main 2027: Classification of Elements & Periodicity in Properties",
  subtitle: "30 High-Yield JEE PYQs & Expected 2027 Questions · 60 Mins CBT Examination",
  subject: "Chemistry (Class 11)",
  durationMinutes: 60,
  allowCustomDuration: false,
  totalQuestions: 30,
  totalMarks: 120,
  marksCorrect: 4,
  marksWrong: -1,
  syllabus: "Modern Periodic Law, Isoelectronic Radii, Ionization Enthalpies & Anomalies, Electron Gain Enthalpy, Electronegativity, Oxide Nature, Slater's Rules & Heavy Element Configurations"
};

export const JEE_2027_PERIODIC_QUESTIONS = [
  {
    id: 1,
    number: 1,
    text: "Which one of the following sets of isoelectronic ions represents the correct order of increasing ionic radii? (Atomic numbers: $\\text{N} = 7, \\text{O} = 8, \\text{F} = 9, \\text{Na} = 11, \\text{Mg} = 12$)",
    options: {
      A: "$\\text{Mg}^{2+} < \\text{Na}^+ < \\text{F}^- < \\text{O}^{2-} < \\text{N}^{3-}$",
      B: "$\\text{N}^{3-} < \\text{O}^{2-} < \\text{F}^- < \\text{Na}^+ < \\text{Mg}^{2+}$",
      C: "$\\text{F}^- < \\text{Na}^+ < \\text{O}^{2-} < \\text{Mg}^{2+} < \\text{N}^{3-}$",
      D: "$\\text{Na}^+ < \\text{F}^- < \\text{Mg}^{2+} < \\text{O}^{2-} < \\text{N}^{3-}$"
    },
    correctAnswer: "A",
    explanation: "All listed species possess 10 electrons ($1s^2 2s^2 2p^6$). For isoelectronic species, the effective nuclear charge ($Z_{\\text{eff}} = Z/e$) increases with atomic number $Z$: $\\text{N}(7/10=0.7) < \\text{O}(8/10=0.8) < \\text{F}(9/10=0.9) < \\text{Na}(11/10=1.1) < \\text{Mg}(12/10=1.2)$. Greater positive nuclear charge exerts a stronger electrostatic pull on the electron cloud, shrinking the ionic radius. Hence: $\\text{Mg}^{2+} (0.72\\text{ \\AA}) < \\text{Na}^+ (1.02\\text{ \\AA}) < \\text{F}^- (1.33\\text{ \\AA}) < \\text{O}^{2-} (1.40\\text{ \\AA}) < \\text{N}^{3-} (1.71\\text{ \\AA})$.",
    topic: "Ionic Radii & Isoelectronic Series",
    difficulty: "Medium",
    image: null
  },
  {
    id: 2,
    number: 2,
    text: "The successive five ionization enthalpies ($\\text{IE}_1$ to $\\text{IE}_5$) of an element are $800, 2427, 3658, 25024$, and $32824\\text{ kJ mol}^{-1}$, respectively. In which group of the modern periodic table is this element present? [JEE Main 2025]",
    options: {
      A: "Group 2",
      B: "Group 14",
      C: "Group 4",
      D: "Group 13"
    },
    correctAnswer: "D",
    explanation: "There is a progressive increase from $\\text{IE}_1$ to $\\text{IE}_3$ ($800 \\to 2427 \\to 3658\\text{ kJ mol}^{-1}$), followed by a massive jump of $21366\\text{ kJ mol}^{-1}$ between $\\text{IE}_3$ and $\\text{IE}_4$ ($3658 \\to 25024\\text{ kJ mol}^{-1}$, nearly a $7\\times$ increase). This sharp discontinuity indicates that the fourth electron must be removed from a stable, completely filled inner noble gas core ($n-1$ shell). Thus, the element possesses exactly 3 valence electrons ($ns^2 np^1$), characteristic of Group 13 (e.g., Aluminium).",
    topic: "Successive Ionization Enthalpies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 3,
    number: 3,
    text: "The first ionization enthalpies ($\\Delta_i H_1$) of beryllium ($\\text{Be}$), boron ($\\text{B}$), nitrogen ($\\text{N}$), and oxygen ($\\text{O}$) follow the order: [JEE Main 2022]",
    options: {
      A: "$\\text{O} < \\text{N} < \\text{B} < \\text{Be}$",
      B: "$\\text{Be} < \\text{B} < \\text{N} < \\text{O}$",
      C: "$\\text{B} < \\text{Be} < \\text{N} < \\text{O}$",
      D: "$\\text{B} < \\text{Be} < \\text{O} < \\text{N}$"
    },
    correctAnswer: "D",
    explanation: "Two major anomalies occur across Period 2 due to orbital stability:\n1. $\\text{Be} (1s^2 2s^2)$ has a completely filled $2s$ subshell and higher penetration power compared to $\\text{B} (1s^2 2s^2 2p^1)$, where removing a $2p$ electron is energetically easier. Thus $\\text{IE}_1(\\text{Be}) = 899\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{B}) = 801\\text{ kJ mol}^{-1}$.\n2. $\\text{N} (1s^2 2s^2 2p^3)$ possesses an extra-stable half-filled $2p$ subshell, whereas $\\text{O} (1s^2 2s^2 2p^4)$ experiences interelectronic pairing repulsion in the $2p_x$ orbital, facilitating electron loss. Thus $\\text{IE}_1(\\text{N}) = 1402\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{O}) = 1314\\text{ kJ mol}^{-1}$.\nOverall order: $\\text{B} < \\text{Be} < \\text{O} < \\text{N}$.",
    topic: "Ionization Enthalpy Anomalies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 4,
    number: 4,
    text: "Outermost electronic configurations of four third-period elements are given below:\n(A) $3s^2$ ($\\text{Mg}$)\n(B) $3s^2 3p^1$ ($\\text{Al}$)\n(C) $3s^2 3p^3$ ($\\text{P}$)\n(D) $3s^2 3p^4$ ($\\text{S}$)\nThe correct order of first ionization enthalpy ($\\text{IE}_1$) for them is: [JEE Main 2022]",
    options: {
      A: "$\\text{A} < \\text{B} < \\text{C} < \\text{D}$",
      B: "$\\text{B} < \\text{A} < \\text{D} < \\text{C}$",
      C: "$\\text{B} < \\text{D} < \\text{A} < \\text{C}$",
      D: "$\\text{B} < \\text{A} < \\text{C} < \\text{D}$"
    },
    correctAnswer: "B",
    explanation: "In Period 3:\n- $\\text{Al}$ ($3s^2 3p^1$, $577\\text{ kJ mol}^{-1}$) has lower $\\text{IE}_1$ than $\\text{Mg}$ ($3s^2$, $737\\text{ kJ mol}^{-1}$) because a $3p$ electron is more shielded and farther from the nucleus than a penetrating $3s$ electron.\n- $\\text{P}$ ($3s^2 3p^3$, $1012\\text{ kJ mol}^{-1}$) has higher $\\text{IE}_1$ than $\\text{S}$ ($3s^2 3p^4$, $1000\\text{ kJ mol}^{-1}$) due to the stability of the half-filled $3p^3$ configuration and pairing repulsion in $\\text{S}$.\nTherefore, the increasing order is $\\text{Al (B)} < \\text{Mg (A)} < \\text{S (D)} < \\text{P (C)}$.",
    topic: "Ionization Enthalpy Trends",
    difficulty: "Hard",
    image: null
  },
  {
    id: 5,
    number: 5,
    text: "Which of the following statements regarding the periodic properties of Group 13 elements ($\\text{B}, \\text{Al}, \\text{Ga}, \\text{In}, \\text{Tl}$) is INCORRECT? [JEE Main 2025]",
    options: {
      A: "The atomic radius order is $\\text{B} < \\text{Ga} < \\text{Al} < \\text{In} < \\text{Tl}$.",
      B: "The first ionization enthalpy order is $\\text{B} > \\text{Tl} > \\text{Ga} > \\text{Al} > \\text{In}$.",
      C: "The atomic radius order is $\\text{B} < \\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$.",
      D: "$\\text{Ga}$ has a smaller atomic radius than $\\text{Al}$ due to ineffective shielding by $3d$ electrons (transition contraction)."
    },
    correctAnswer: "C",
    explanation: "Statement C is incorrect. The atomic radius of $\\text{Ga}$ ($135\\text{ pm}$) is smaller than that of $\\text{Al}$ ($143\\text{ pm}$). Between $\\text{Al}$ ($Z=13$) and $\\text{Ga}$ ($Z=31$), ten $3d$ electrons intervene. Because $d$-orbitals have poor shielding ability, the effective nuclear charge increases substantially, drawing the valence electrons inward (transition contraction). Hence, the actual atomic radius order is $\\text{B} < \\text{Ga} < \\text{Al} < \\text{In} < \\text{Tl}$.",
    topic: "Group 13 Anomalies & Transition Contraction",
    difficulty: "Hard",
    image: null
  },
  {
    id: 6,
    number: 6,
    text: "Given below are two statements regarding electron gain enthalpy ($\\Delta_{eg}H$):\nStatement I: The negative electron gain enthalpy of chlorine is more negative than that of fluorine.\nStatement II: In Group 16, oxygen has the most negative electron gain enthalpy among all group members.\nIn the light of the above statements, choose the correct answer: [JEE Main 2023, 2025]",
    options: {
      A: "Both Statement I and Statement II are true",
      B: "Statement I is true but Statement II is false",
      C: "Statement I is false but Statement II is true",
      D: "Both Statement I and Statement II are false"
    },
    correctAnswer: "B",
    explanation: "Statement I is true: $\\Delta_{eg}H(\\text{Cl}) = -349\\text{ kJ mol}^{-1}$, while $\\Delta_{eg}H(\\text{F}) = -328\\text{ kJ mol}^{-1}$. The extremely compact $2p$ subshell in fluorine causes significant electron-electron repulsion when an extra electron enters, lowering the released energy compared to the more spacious $3p$ subshell of chlorine.\nStatement II is false: In Group 16, oxygen has the LEAST negative electron gain enthalpy ($\\Delta_{eg}H = -141\\text{ kJ mol}^{-1}$) due to similar compact $2p$ repulsion. The order of negative $\\Delta_{eg}H$ is $\\text{S} (-200) > \\text{Se} (-195) > \\text{Te} (-190) > \\text{Po} (-174) > \\text{O} (-141\\text{ kJ mol}^{-1})$.",
    topic: "Electron Gain Enthalpy Trends",
    difficulty: "Medium",
    image: null
  },
  {
    id: 7,
    number: 7,
    text: "Which of the following statements regarding the second electron gain enthalpy ($\\Delta_{eg}H_2$) is correct?",
    options: {
      A: "The formation of $\\text{O}^{2-}(g)$ from $\\text{O}^-(g)$ is an exothermic process because a stable octet is attained.",
      B: "The second electron gain enthalpy of oxygen is positive because of electrostatic repulsion between the incoming electron and the negatively charged $\\text{O}^-$ anion.",
      C: "The electron affinity of noble gases has large positive values.",
      D: "Addition of an electron to $\\text{N}(g)$ releases more energy than addition of an electron to $\\text{C}(g)$."
    },
    correctAnswer: "B",
    explanation: "Although $\\text{O}^{2-}$ attains a stable neon octet configuration, adding an electron to a negatively charged ion ($\\text{O}^-(g) + e^- \\to \\text{O}^{2-}(g)$) experiences strong electrostatic repulsion. Energy must be supplied from outside to overcome this repulsion, making $\\Delta_{eg}H_2$ strongly endothermic/positive ($+780\\text{ kJ mol}^{-1}$). Thus, second electron gain enthalpy is always positive.",
    topic: "Second Electron Gain Enthalpy",
    difficulty: "Medium",
    image: null
  },
  {
    id: 8,
    number: 8,
    text: "Match List-I (Oxide) with List-II (Nature of Oxide): [JEE Main 2021, 2022]\nList-I:\n(A) $\\text{Cl}_2\\text{O}_7$\n(B) $\\text{Na}_2\\text{O}$\n(C) $\\text{Al}_2\\text{O}_3$\n(D) $\\text{N}_2\\text{O}$\nList-II:\n(I) Amphoteric\n(II) Basic\n(III) Neutral\n(IV) Strongly Acidic",
    options: {
      A: "A-IV, B-II, C-I, D-III",
      B: "A-IV, B-III, C-I, D-II",
      C: "A-I, B-II, C-IV, D-III",
      D: "A-IV, B-II, C-III, D-I"
    },
    correctAnswer: "A",
    explanation: "1. $\\text{Cl}_2\\text{O}_7$: Chlorine is in $+7$ oxidation state; its aqueous solution is perchloric acid ($\\text{HClO}_4$), a superacid $\\implies$ Strongly Acidic (IV).\n2. $\\text{Na}_2\\text{O}$: Reacts vigorously with water to produce $\\text{NaOH}$ $\\implies$ Basic (II).\n3. $\\text{Al}_2\\text{O}_3$: Reacts with both mineral acids (forming $\\text{Al}^{3+}$) and strong alkalis (forming aluminate $[\\text{Al}(\\text{OH})_4]^-$) $\\implies$ Amphoteric (I).\n4. $\\text{N}_2\\text{O}$: Nitrous oxide is neutral, failing to react with either acids or bases $\\implies$ Neutral (III).\nCorrect matching: A-IV, B-II, C-I, D-III.",
    topic: "Oxide Classification",
    difficulty: "Easy",
    image: null
  },
  {
    id: 9,
    number: 9,
    text: "Given below are the following oxides:\n$\\text{Na}_2\\text{O}, \\text{As}_2\\text{O}_3, \\text{N}_2\\text{O}, \\text{NO}, \\text{Cl}_2\\text{O}_7, \\text{ZnO}, \\text{CrO}$\nThe number of amphoteric oxides among them is: [JEE Main 2022]",
    options: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    },
    correctAnswer: "B",
    explanation: "Analysis of each oxide:\n- $\\text{Na}_2\\text{O}$: Basic\n- $\\text{As}_2\\text{O}_3$: Amphoteric (reacts with $\\text{HCl}$ and $\\text{NaOH}$)\n- $\\text{N}_2\\text{O}$: Neutral\n- $\\text{NO}$: Neutral\n- $\\text{Cl}_2\\text{O}_7$: Strongly Acidic\n- $\\text{ZnO}$: Amphoteric (forms zincates with base and $\\text{Zn}^{2+}$ with acid)\n- $\\text{CrO}$: Basic (low oxidation state $+2$ of transition metal is basic; $+3$ $\\text{Cr}_2\\text{O}_3$ is amphoteric, $+6$ $\\text{CrO}_3$ is acidic).\nHence, exactly 2 oxides ($\\text{As}_2\\text{O}_3$ and $\\text{ZnO}$) are amphoteric.",
    topic: "Amphoteric Oxides Count",
    difficulty: "Medium",
    image: null
  },
  {
    id: 10,
    number: 10,
    text: "In Moseley's experiment on the characteristic X-ray spectra of elements, frequency $\\nu$ of the emitted X-rays was correlated with atomic parameters. Which of the following statements is correct? [JEE Main 2023, 2025]",
    options: {
      A: "A plot of $\\nu$ against atomic number $Z$ is a straight line.",
      B: "A plot of $\\sqrt{\\nu}$ against atomic mass $A$ is a straight line.",
      C: "A plot of $\\sqrt{\\nu}$ against atomic number $Z$ yields a straight line with equation $\\sqrt{\\nu} = a(Z - b)$.",
      D: "Moseley proved that atomic mass is the fundamental property determining periodic behavior."
    },
    correctAnswer: "C",
    explanation: "H.G.J. Moseley bombarded high-speed electrons on different metal targets and observed characteristic X-rays. He discovered that a plot of $\\sqrt{\\nu}$ (where $\\nu$ is the frequency of emitted X-rays) against atomic number $Z$ gave a straight line: $\\sqrt{\\nu} = a(Z - b)$, where $a$ and $b$ are constants characteristic of the spectral series. Plots against atomic mass showed distinct fluctuations. This proved conclusively that atomic number ($Z$), not atomic mass, is the fundamental property of elements.",
    topic: "Moseley's Law & Modern Periodic Law",
    difficulty: "Medium",
    image: null
  },
  {
    id: 11,
    number: 11,
    text: "The ground state electronic configuration of Platinum ($\\text{Pt}$, atomic number $Z = 78$) is: [JEE Main 2022]",
    options: {
      A: "$[\\text{Xe}] 4f^{14} 5d^9 6s^1$",
      B: "$[\\text{Xe}] 4f^{14} 5d^8 6s^2$",
      C: "$[\\text{Xe}] 4f^{14} 5d^{10} 6s^0$",
      D: "$[\\text{Kr}] 4f^{14} 5d^9 6s^1$"
    },
    correctAnswer: "A",
    explanation: "Platinum ($Z=78$) has an anomalous electron configuration: $[\\text{Xe}] 4f^{14} 5d^9 6s^1$. Relativistic contraction of the $6s$ orbital and favorable exchange energy in the $5d$ subshell stabilize the $5d^9 6s^1$ configuration over $5d^8 6s^2$. (In the same triad, Nickel is $3d^8 4s^2$ while Palladium $Z=46$ is $[\\text{Kr}] 4d^{10} 5s^0$).",
    topic: "Transition Metal Electronic Configurations",
    difficulty: "Medium",
    image: null
  },
  {
    id: 12,
    number: 12,
    text: "For Zinc ($\\text{Zn}$, $Z = 30$) with configuration $1s^2 2s^2 2p^6 3s^2 3p^6 3d^{10} 4s^2$, the effective nuclear charge ($Z_{\\text{eff}}$) for a $4s$ valence electron and for a $3d$ electron according to Slater's rules are respectively: [Arjuna Challenge 03]",
    options: {
      A: "$4.35$ and $8.85$",
      B: "$8.85$ and $4.35$",
      C: "$25.65$ and $21.15$",
      D: "$5.00$ and $9.50$"
    },
    correctAnswer: "A",
    explanation: "Applying Slater's rules:\n1. For a $4s$ electron ($n=4$):\n   - Same group ($4s$): $1 \\times 0.35 = 0.35$\n   - $(n-1)$ shell ($3s, 3p, 3d$): $18 \\times 0.85 = 15.30$\n   - $(n-2)$ and deeper ($1s, 2s, 2p$): $10 \\times 1.00 = 10.00$\n   - $\\sigma_{4s} = 0.35 + 15.30 + 10.00 = 25.65$\n   - $Z_{\\text{eff}}(4s) = Z - \\sigma = 30 - 25.65 = 4.35$.\n2. For a $3d$ electron:\n   - Electrons in $4s$ lie outside and contribute $0$.\n   - Other electrons in $(3d)$ group: $9 \\times 0.35 = 3.15$.\n   - All electrons in lower groups ($1s, 2s, 2p, 3s, 3p$): $18 \\times 1.00 = 18.00$.\n   - $\\sigma_{3d} = 3.15 + 18.00 = 21.15$\n   - $Z_{\\text{eff}}(3d) = 30 - 21.15 = 8.85$.",
    topic: "Slater's Rules & Effective Nuclear Charge",
    difficulty: "Hard",
    image: null
  },
  {
    id: 13,
    number: 13,
    text: "For solid chlorine, the internuclear distance between two bonded chlorine atoms in a $\\text{Cl}_2$ molecule is $198\\text{ pm}$, and the distance between the nuclei of two adjacent non-bonded chlorine atoms of neighboring molecules is $360\\text{ pm}$. The covalent radius, Van der Waals radius, and their difference are respectively: [Arjuna Challenge 04 & JEE Main 2022]",
    options: {
      A: "$99\\text{ pm}, 180\\text{ pm}$, and $81\\text{ pm}$",
      B: "$198\\text{ pm}, 360\\text{ pm}$, and $162\\text{ pm}$",
      C: "$99\\text{ pm}, 360\\text{ pm}$, and $261\\text{ pm}$",
      D: "$180\\text{ pm}, 99\\text{ pm}$, and $81\\text{ pm}$"
    },
    correctAnswer: "A",
    explanation: "By definition:\n- Covalent radius $r_{\\text{cov}} = \\frac{1}{2} d_{\\text{bonded}} = \\frac{198\\text{ pm}}{2} = 99\\text{ pm}$.\n- Van der Waals radius $r_{\\text{vdw}} = \\frac{1}{2} d_{\\text{non-bonded}} = \\frac{360\\text{ pm}}{2} = 180\\text{ pm}$.\n- Difference: $r_{\\text{vdw}} - r_{\\text{cov}} = 180\\text{ pm} - 99\\text{ pm} = 81\\text{ pm}$.",
    topic: "Covalent vs Van der Waals Radii",
    difficulty: "Easy",
    image: null
  },
  {
    id: 14,
    number: 14,
    text: "The covalency and oxidation state respectively of boron in the tetrafluoroborate anion, $[\\text{BF}_4]^-$, are: [JEE Main 2023]",
    options: {
      A: "$4$ and $+3$",
      B: "$4$ and $+4$",
      C: "$3$ and $+4$",
      D: "$3$ and $+5$"
    },
    correctAnswer: "A",
    explanation: "In $[\\text{BF}_4]^-$, boron forms four covalent bonds (three standard shared electron pairs with $\\text{F}$ and one coordinate bond where $\\text{F}^-$ donates a lone pair into boron's empty $2p$ orbital), meaning its covalency is $4$. For the oxidation state: Let $\\text{OS}(\\text{B}) = x$. Each fluorine has an oxidation state of $-1$. Thus, $x + 4(-1) = -1 \\implies x = +3$.",
    topic: "Covalency & Oxidation States",
    difficulty: "Easy",
    image: null
  },
  {
    id: 15,
    number: 15,
    text: "An element with atomic number $Z = 77$ (Iridium) belongs to which period, group, and block of the periodic table? [Arjuna Challenge 03]",
    options: {
      A: "Period 6, Group 9, d-block",
      B: "Period 6, Group 7, f-block",
      C: "Period 7, Group 9, d-block",
      D: "Period 5, Group 9, p-block"
    },
    correctAnswer: "A",
    explanation: "The electronic configuration of $Z = 77$ (Iridium, $\\text{Ir}$) is $[\\text{Xe}]_{54} 4f^{14} 5d^7 6s^2$.\n- The highest principal quantum number $n = 6 \\implies$ Period 6.\n- The differentiating electron enters the $5d$ subshell $\implies$ d-block.\n- Group number for a d-block element = $(n-1)d \\text{ electrons} + ns \\text{ electrons} = 7 + 2 = 9$ (Cobalt triad).",
    topic: "Position of Heavy Elements",
    difficulty: "Medium",
    image: null
  },
  {
    id: 16,
    number: 16,
    text: "For two metals $\\text{X}$ and $\\text{Y}$, the differences between their second and first ionization enthalpies $(\\text{IE}_2 - \\text{IE}_1)$ are $19.3\\text{ eV}$ and $7.5\\text{ eV}$, respectively. Which of the following statements regarding the stability of their oxidation states is correct? [Arjuna Challenge 05]",
    options: {
      A: "$\\text{X}^+$ is more stable than $\\text{X}^{2+}$, and $\\text{Y}^{2+}$ is more stable than $\\text{Y}^+$",
      B: "$\\text{X}^{2+}$ is more stable than $\\text{X}^+$, and $\\text{Y}^+$ is more stable than $\\text{Y}^{2+}$",
      C: "Both $\\text{X}^+$ and $\\text{Y}^+$ are more stable than their divalent ions",
      D: "Both $\\text{X}^{2+}$ and $\\text{Y}^{2+}$ are more stable than their univalent ions"
    },
    correctAnswer: "A",
    explanation: "According to periodic thermodynamic criteria:\n1. If $(\\text{IE}_2 - \\text{IE}_1) \\ge 16\\text{ eV}$, removing the second electron requires an exorbitant amount of energy that cannot be recovered through lattice or hydration enthalpy; hence the lower univalent state ($\\text{X}^+$) is stable (as in alkali metals like $\\text{Na}$). Here, $\\Delta \\text{IE} = 19.3\\text{ eV} > 16\\text{ eV} \\implies \\text{X}^+$ is stable.\n2. If $(\\text{IE}_2 - \\text{IE}_1) \\le 11\\text{ eV}$, the lattice or hydration energy of the divalent cation readily compensates for $\\text{IE}_2$; hence the higher divalent state ($\\text{Y}^{2+}$) is stable (as in alkaline earth metals like $\\text{Mg}$). Here, $\\Delta \\text{IE} = 7.5\\text{ eV} < 11\\text{ eV} \\implies \\text{Y}^{2+}$ is stable.",
    topic: "Oxidation State Stability & Ionization Gaps",
    difficulty: "Hard",
    image: null
  },
  {
    id: 17,
    number: 17,
    text: "In which of the following ionic compounds is the ratio of cation radius to anion radius ($r_+ / r_-$) minimum? [Arjuna Challenge 04]",
    options: {
      A: "$\\text{RbI}$",
      B: "$\\text{LiI}$",
      C: "$\\text{BeF}_2$",
      D: "$\\text{CsBr}$"
    },
    correctAnswer: "B",
    explanation: "Among the alkali metal halides, $\\text{Li}^+$ is the smallest cation ($r = 76\\text{ pm}$) due to having only 2 core electrons with a $+3$ nuclear charge, while $\\text{I}^-$ is the largest common halide anion ($r = 220\\text{ pm}$) with 54 electrons. Hence, the radius ratio $r(\\text{Li}^+) / r(\\text{I}^-) \\approx 0.35$ is the smallest among all alkali halides, causing maximum cation polarizing power and significant covalent character (Fajans' rule).",
    topic: "Cation-to-Anion Radius Ratio",
    difficulty: "Medium",
    image: null
  },
  {
    id: 18,
    number: 18,
    text: "Which of the following metals has a melting point of approximately $30^\\circ\\text{C}$ and a boiling point above $2200^\\circ\\text{C}$, remaining in the liquid state inside boiling water ($100^\\circ\\text{C}$)? [JEE Main 2023]",
    options: {
      A: "$\\text{Cs}$",
      B: "$\\text{Ga}$",
      C: "$\\text{Li}$",
      D: "$\\text{Br}_2$"
    },
    correctAnswer: "B",
    explanation: "Gallium ($\\text{Ga}$, Group 13) has an exceptionally low melting point of $29.8^\\circ\\text{C}$ ($303\\text{ K}$) due to its unusual crystal packing containing discrete $\\text{Ga}_2$ molecules, but a very high boiling point of $2403^\\circ\\text{C}$ ($2676\\text{ K}$). Therefore, in pure boiling water at $100^\\circ\\text{C}$, Gallium remains safely in the liquid state. (Cesium reacts explosively with water, Lithium melts at $180^\\circ\\text{C}$, and Bromine is a non-metal with boiling point $58.8^\\circ\\text{C}$).",
    topic: "Physical Properties & Melting Points",
    difficulty: "Easy",
    image: null
  },
  {
    id: 19,
    number: 19,
    text: "The element having the highest first ionization enthalpy in the entire periodic table, yet having virtually zero electron affinity, is: [Arjuna Challenge 06]",
    options: {
      A: "$\\text{H}$",
      B: "$\\text{F}$",
      C: "$\\text{He}$",
      D: "$\\text{Be}$"
    },
    correctAnswer: "C",
    explanation: "Helium ($\\text{He}$, $1s^2$) possesses the highest first ionization enthalpy of any element ($\\text{IE}_1 = 2372\\text{ kJ mol}^{-1}$) because its two electrons are bound in the innermost $K$-shell ($n=1$) directly to a $+2$ nuclear charge with zero shielding from inner electrons. However, adding an electron to form $\\text{He}^-$ would require placing it into the higher $2s$ subshell, which is energetically unfavorable (endothermic, $\\Delta_{eg}H > 0$), giving it an electron affinity of zero.",
    topic: "Helium Ionization & Electron Affinity",
    difficulty: "Easy",
    image: null
  },
  {
    id: 20,
    number: 20,
    text: "Which of the following pairs of elements does NOT exhibit a diagonal relationship in the periodic table? [JEE Main 2021]",
    options: {
      A: "$\\text{Li}$ and $\\text{Mg}$",
      B: "$\\text{Be}$ and $\\text{Al}$",
      C: "$\\text{B}$ and $\\text{Si}$",
      D: "$\\text{Li}$ and $\\text{Na}$"
    },
    correctAnswer: "D",
    explanation: "Diagonal relationships arise between second-period and third-period elements placed diagonally to each other because the decrease in size across a period counterbalances the increase in size down a group, producing nearly identical polarizing powers (ionic potential $\\phi = \\text{charge}/\\text{radius}$):\n- $\\text{Li}$ and $\\text{Mg}$ (Group 1 to Group 2)\n- $\\text{Be}$ and $\\text{Al}$ (Group 2 to Group 13)\n- $\\text{B}$ and $\\text{Si}$ (Group 13 to Group 14)\n$\\text{Li}$ and $\\text{Na}$ belong to the SAME vertical group (Group 1) and exhibit regular group congenership, not a diagonal relationship.",
    topic: "Diagonal Relationships",
    difficulty: "Easy",
    image: null
  },
  {
    id: 21,
    number: 21,
    text: "Which of the following electronegativity orders on Pauling's scale is INCORRECT? [JEE Main 2025]",
    options: {
      A: "$\\text{S} < \\text{Cl} < \\text{O} < \\text{F}$",
      B: "$\\text{Al} < \\text{Mg} < \\text{B} < \\text{N}$",
      C: "$\\text{Al} < \\text{Si} < \\text{C} < \\text{N}$",
      D: "$\\text{Mg} < \\text{Be} < \\text{B} < \\text{N}$"
    },
    correctAnswer: "B",
    explanation: "On Pauling's electronegativity scale:\n- $\\text{Mg} = 1.2$\n- $\\text{Al} = 1.5$\n- $\\text{B} = 2.0$\n- $\\text{N} = 3.0$\nAcross Period 3, electronegativity increases from left to right as nuclear charge increases: $\\text{Mg} (1.2) < \\text{Al} (1.5)$. Thus, the statement $\\text{Al} < \\text{Mg}$ in option B is false. The correct order is $\\text{Mg} < \\text{Al} < \\text{B} < \\text{N}$.",
    topic: "Electronegativity Orders",
    difficulty: "Medium",
    image: null
  },
  {
    id: 22,
    number: 22,
    text: "The correct decreasing order of metallic character for the elements $\\text{Na}, \\text{Mg}, \\text{Be}, \\text{Si}, \\text{P}$ is: [JEE Main 2022, 2023]",
    options: {
      A: "$\\text{Na} > \\text{Mg} > \\text{Be} > \\text{Si} > \\text{P}$",
      B: "$\\text{P} > \\text{Si} > \\text{Be} > \\text{Mg} > \\text{Na}$",
      C: "$\\text{Si} > \\text{P} > \\text{Be} > \\text{Na} > \\text{Mg}$",
      D: "$\\text{Be} > \\text{Na} > \\text{Mg} > \\text{Si} > \\text{P}$"
    },
    correctAnswer: "A",
    explanation: "Metallic character correlates with ease of electron loss (low ionization enthalpy). It increases down a group and decreases across a period from left to right:\n- $\\text{Na}$ is an alkali metal with the lowest $\\text{IE}$ $\\implies$ most metallic.\n- $\\text{Mg}$ is an alkaline earth metal in Period 3 ($\text{Na} > \\text{Mg}$).\n- $\\text{Be}$ is in Period 2 above $\\text{Mg}$; smaller size gives it higher $\\text{IE}$ ($\text{Mg} > \\text{Be}$).\n- $\\text{Si}$ is a metalloid/semiconductor ($\text{Be} > \\text{Si}$).\n- $\\text{P}$ is a non-metal ($\text{Si} > \\text{P}$).\nDecreasing metallic character order: $\\text{Na} > \\text{Mg} > \\text{Be} > \\text{Si} > \\text{P}$.",
    topic: "Periodic Variation of Metallic Character",
    difficulty: "Easy",
    image: null
  },
  {
    id: 23,
    number: 23,
    text: "The ionic radius of $\\text{Na}^+$ ion is $1.02\\text{ \\AA}$. The ionic radii in $\\text{\\AA}$ of $\\text{Mg}^{2+}$ and $\\text{Al}^{3+}$, respectively, are: [JEE Main 2021]",
    options: {
      A: "$1.05$ and $0.99$",
      B: "$0.72$ and $0.54$",
      C: "$0.85$ and $0.99$",
      D: "$0.68$ and $0.72$"
    },
    correctAnswer: "B",
    explanation: "$\\text{Na}^+, \\text{Mg}^{2+}$, and $\\text{Al}^{3+}$ are isoelectronic with 10 electrons. With increasing nuclear charge ($Z = 11 \\to 12 \\to 13$), the effective nuclear charge increases, contracting the ionic shell: $r(\\text{Al}^{3+}) < r(\\text{Mg}^{2+}) < r(\\text{Na}^+) = 1.02\\text{ \\AA}$. Only option B ($0.72\\text{ \\AA}$ for $\\text{Mg}^{2+}$ and $0.54\\text{ \\AA}$ for $\\text{Al}^{3+}$) satisfies both $r < 1.02\\text{ \\AA}$ and $r(\\text{Mg}^{2+}) > r(\\text{Al}^{3+})$.",
    topic: "Isoelectronic Radii Values",
    difficulty: "Easy",
    image: null
  },
  {
    id: 24,
    number: 24,
    text: "The elemental characteristics of elements $\\text{X}, \\text{Y}$, and $\\text{Z}$ with atomic numbers $33, 53$, and $83$, respectively, are: [JEE Main 2021]",
    options: {
      A: "$\\text{X}$ and $\\text{Y}$ are metalloids and $\\text{Z}$ is a metal.",
      B: "$\\text{X}$ is a metalloid, $\\text{Y}$ is a non-metal, and $\\text{Z}$ is a metal.",
      C: "$\\text{X}, \\text{Y}$, and $\\text{Z}$ are all metals.",
      D: "$\\text{X}$ and $\\text{Z}$ are non-metals and $\\text{Y}$ is a metalloid."
    },
    correctAnswer: "B",
    explanation: "Identifying the elements by atomic number:\n- $Z = 33$ is Arsenic ($\\text{As}$, Group 15, Period 4): behaves as a metalloid.\n- $Z = 53$ is Iodine ($\\text{I}$, Group 17, Period 5): halogen non-metal.\n- $Z = 83$ is Bismuth ($\\text{Bi}$, Group 15, Period 6): heavy element in Group 15 with predominant metallic character.\nTherefore, $\\text{X}$ is a metalloid, $\\text{Y}$ is a non-metal, and $\\text{Z}$ is a metal.",
    topic: "Metal, Non-metal & Metalloid Classification",
    difficulty: "Medium",
    image: null
  },
  {
    id: 25,
    number: 25,
    text: "For which of the following gaseous transformations is the LEAST amount of energy required? [Arjuna Challenge 05]",
    options: {
      A: "$\\text{F}^-(g) \\to \\text{F}(g) + e^-$",
      B: "$\\text{P}^-(g) \\to \\text{P}(g) + e^-$",
      C: "$\\text{S}^-(g) \\to \\text{S}(g) + e^-$",
      D: "$\\text{Cl}^-(g) \\to \\text{Cl}(g) + e^-$"
    },
    correctAnswer: "B",
    explanation: "The energy required to detach an electron from a mononegative anion $\\text{A}^-(g) \\to \\text{A}(g) + e^-$ is numerically equal to the electron affinity ($\\text{EA}$) of atom $\\text{A}$. Neutral phosphorus atom has an extra-stable half-filled $3p^3$ configuration. In $\\text{P}^-$, the extra electron occupies a $3p$ orbital ($3p^4$) with significant electron pairing repulsion. Hence, $\\text{P}^-$ readily releases the electron to regain the stable half-filled $3p^3$ state. Its electron affinity is the lowest among non-metals ($\\approx 72\\text{ kJ mol}^{-1}$, versus $\\text{S} \\approx 200, \\text{F} \\approx 328, \\text{Cl} \\approx 349\\text{ kJ mol}^{-1}$).",
    topic: "Electron Detachment Energy & Configuration Stability",
    difficulty: "Hard",
    image: null
  },
  {
    id: 26,
    number: 26,
    text: "Calculate the value of electron gain enthalpy ($\\Delta_{eg}H$) of chlorine at $300\\text{ K}$ if its electron affinity ($\\text{EA}$) is $90\\text{ kcal mol}^{-1}$. (Take $R = 2\\text{ cal K}^{-1}\\text{ mol}^{-1}$) [Arjuna Challenge 06]",
    options: {
      A: "$-91.5\\text{ kcal mol}^{-1}$",
      B: "$+65.5\\text{ kcal mol}^{-1}$",
      C: "$-98.5\\text{ kcal mol}^{-1}$",
      D: "$-121\\text{ kcal mol}^{-1}$"
    },
    correctAnswer: "A",
    explanation: "The thermodynamic formula connecting electron gain enthalpy and electron affinity is:\n$$\\Delta_{eg}H = -\\text{EA} - \\frac{5}{2}RT$$\nSubstituting the given values:\n$$\\Delta_{eg}H = -90\\text{ kcal mol}^{-1} - \\frac{5}{2} \\times \\frac{2 \\times 300}{1000}\\text{ kcal mol}^{-1}$$\n$$\\Delta_{eg}H = -90 - 1.5 = -91.5\\text{ kcal mol}^{-1}$$.",
    topic: "Thermodynamics of Electron Gain Enthalpy",
    difficulty: "Hard",
    image: null
  },
  {
    id: 27,
    number: 27,
    text: "In the modern long form of the periodic table, the transition elements (d-block) are accommodated in which of the following groups? [Arjuna Challenge 02]",
    options: {
      A: "Groups 3 to 12 (formerly IIIB to IIB)",
      B: "Groups 2 to 13",
      C: "Groups 1 to 8",
      D: "Groups 4 to 11"
    },
    correctAnswer: "A",
    explanation: "In the modern IUPAC periodic table, transition elements comprise the d-block and span 10 columns from Group 3 (Scandium triad, formerly Group IIIB) to Group 12 (Zinc triad, formerly Group IIB), placed between the reactive s-block metals (Groups 1-2) and the p-block non-metals/metalloids (Groups 13-18).",
    topic: "Periodic Table Group Nomenclature",
    difficulty: "Easy",
    image: null
  },
  {
    id: 28,
    number: 28,
    text: "Which of the following statements are NOT true about the modern periodic table? [JEE Main 2025]\n(A) The physical and chemical properties of elements are periodic functions of their atomic weights.\n(B) Elements having similar outer electronic configurations are arranged in the same period.\n(C) The number of elements in a period is the same as the number of atomic orbitals available in the energy level being filled.",
    options: {
      A: "A and B Only",
      B: "A, B, and C",
      C: "C Only",
      D: "B and C Only"
    },
    correctAnswer: "B",
    explanation: "Evaluation of statements:\n(A) False: Modern Periodic Law states properties are periodic functions of ATOMIC NUMBERS, not atomic weights.\n(B) False: Elements with similar valence electronic configurations are arranged in the same GROUP (vertical column), not period.\n(C) False: By Pauli's exclusion principle, each orbital accommodates up to 2 electrons. Therefore, the number of elements in a period is TWICE the number of available atomic orbitals in that energy level, not the same.\nHence, all three statements (A, B, and C) are NOT true.",
    topic: "Fundamental Periodic Table Principles",
    difficulty: "Medium",
    image: null
  },
  {
    id: 29,
    number: 29,
    text: "An electropositive element $\\text{E}$ has an ionization enthalpy of $374\\text{ kJ mol}^{-1}$. It reacts with non-metals $\\text{A}, \\text{B}, \\text{C}$, and $\\text{D}$ having electron gain enthalpies of $-328, -349, -325$, and $-295\\text{ kJ mol}^{-1}$, respectively. The correct decreasing order of ionic character for the binary products is: [JEE Main 2025]",
    options: {
      A: "$\\text{EA} > \\text{EB} > \\text{EC} > \\text{ED}$",
      B: "$\\text{EB} > \\text{EA} > \\text{EC} > \\text{ED}$",
      C: "$\\text{ED} > \\text{EC} > \\text{EA} > \\text{EB}$",
      D: "$\\text{ED} > \\text{EC} > \\text{EB} > \\text{EA}$"
    },
    correctAnswer: "B",
    explanation: "Ionic character in a binary compound increases with increasing electronegativity difference between the combining elements. Highly negative electron gain enthalpy strongly correlates with higher electronegativity and electron affinity in non-metals. Ranking the non-metals by magnitude of $|\\Delta_{eg}H|$:\n$$\\text{B} (349\\text{ kJ mol}^{-1}) > \\text{A} (328) > \\text{C} (325) > \\text{D} (295)$$\nThus, the resulting electronegativity difference and percentage ionic character follow the sequence: $\\text{EB} > \\text{EA} > \\text{EC} > \\text{ED}$.",
    topic: "Ionic Character & Electronegativity Difference",
    difficulty: "Medium",
    image: null
  },
  {
    id: 30,
    number: 30,
    text: "Consider the following statements regarding atomic structure and periodicity:\n(I) Spin multiplicity ($2S + 1$) of $3d$ electrons in Chromium ($\\text{Cr}$) and Manganese ($\\text{Mn}$) atoms in their ground states is identical.\n(II) Plutonium ($Z = 94$) belongs to the $5f$ actinide series and is a transuranic element.\n(III) The effective nuclear charge ($Z_{\\text{eff}}$) for a $1s$ electron of Hydrogen atom is exactly $1$.\nWhich of the above statements is/are TRUE? [Arjuna Challenge 02 & 03]",
    options: {
      A: "(I), (II), and (III)",
      B: "(I) and (II) Only",
      C: "(II) and (III) Only",
      D: "(I) and (III) Only"
    },
    correctAnswer: "A",
    explanation: "All three statements are factually and theoretically correct:\n- (I) True: Ground state $\\text{Cr}$ is $[\\text{Ar}] 3d^5 4s^1$ (5 unpaired $3d$ electrons, $S = 5/2 \\implies 2S+1 = 6$). Ground state $\\text{Mn}$ is $[\\text{Ar}] 3d^5 4s^2$ (also 5 unpaired $3d$ electrons, $S = 5/2 \\implies 2S+1 = 6$). Hence, multiplicity for $3d$ electrons is identical.\n- (II) True: $Z = 94$ is Plutonium ($\\text{Pu}$), located in the $5f$ actinide series ($Z=89\\text{ to }103$). Because $Z > 92$ (Uranium), it is classified as a transuranic element.\n- (III) True: For a neutral Hydrogen atom with a single electron ($1s^1$), there are no other electrons to cause shielding ($\\sigma = 0$). By Slater's rule, $Z_{\\text{eff}} = Z - \\sigma = 1 - 0 = 1$.",
    topic: "Multiplicity, Actinides & Hydrogen Zeff",
    difficulty: "Hard",
    image: null
  }
];
