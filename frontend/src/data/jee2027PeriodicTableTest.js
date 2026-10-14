/**
 * JEE Main 2027 Chemistry Assessment: Classification of Elements and Periodicity in Properties
 * Curated from 2021-2025 Official JEE Main PYQs and National Benchmark Drills
 * 60 High-Yield, Distinct Questions with Verified Solutions & KaTeX Formatting
 * Duration: 90 Minutes (Self-Adjustable up to 1 Hr 30 Mins) | Marking: +4 / -1 / 0 | Total Marks: 240
 */

export const JEE_2027_PERIODIC_TEST = {
  id: "jee-2027-periodic-properties-mastery-drill",
  title: "JEE Main 2027: Classification of Elements & Periodicity in Properties",
  subtitle: "60 High-Yield JEE PYQs & Expected 2027 Questions · 90 Mins (Adjustable) CBT Exam",
  subject: "Chemistry (Class 11)",
  durationMinutes: 90,
  allowCustomDuration: true,
  minCustomDurationMinutes: 30,
  maxCustomDurationMinutes: 90,
  totalQuestions: 60,
  totalMarks: 240,
  marksCorrect: 4,
  marksWrong: -1,
  syllabus: "Modern Periodic Law, Isoelectronic Radii, Ionization Enthalpies & Anomalies, Electron Gain Enthalpy, Electronegativity Scales, Lanthanoid Contraction, Slater's Rules, Heavy Elements & Strict JEE Normalization"
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
      B: "$\\text{B} < \\text{Be} < \\text{O} < \\text{N}$",
      C: "$\\text{Be} < \\text{B} < \\text{O} < \\text{N}$",
      D: "$\\text{B} < \\text{Be} < \\text{N} < \\text{O}$"
    },
    correctAnswer: "B",
    explanation: "Two major anomalies occur in Period 2:\n1. $\\text{Be} (1s^2 2s^2)$ has a completely filled, penetrating $2s$ subshell, whereas $\\text{B} (1s^2 2s^2 2p^1)$ loses a more shielded, higher-energy $2p$ electron. Hence, $\\text{IE}_1(\\text{Be}) = 899\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{B}) = 801\\text{ kJ mol}^{-1}$.\n2. $\\text{N} (1s^2 2s^2 2p^3)$ possesses an extra-stable half-filled $2p$ subshell, whereas $\\text{O} (1s^2 2s^2 2p^4)$ experiences inter-electronic repulsion between the paired electrons in one of the $2p$ orbitals. Hence, $\\text{IE}_1(\\text{N}) = 1402\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{O}) = 1314\\text{ kJ mol}^{-1}$.\nCombining both gives: $\\text{B} (801) < \\text{Be} (899) < \\text{O} (1314) < \\text{N} (1402\\text{ kJ mol}^{-1})$.",
    topic: "Period 2 Ionization Enthalpy Anomalies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 4,
    number: 4,
    text: "Identify the correct order of first ionization enthalpy for the Period 3 elements: $\\text{Na}, \\text{Mg}, \\text{Al}, \\text{Si}, \\text{P}, \\text{S}$. [JEE Main 2021]",
    options: {
      A: "$\\text{Na} < \\text{Al} < \\text{Mg} < \\text{Si} < \\text{S} < \\text{P}$",
      B: "$\\text{Na} < \\text{Mg} < \\text{Al} < \\text{Si} < \\text{P} < \\text{S}$",
      C: "$\\text{Al} < \\text{Na} < \\text{Mg} < \\text{Si} < \\text{S} < \\text{P}$",
      D: "$\\text{Na} < \\text{Al} < \\text{Mg} < \\text{Si} < \\text{P} < \\text{S}$"
    },
    correctAnswer: "A",
    explanation: "Across Period 3, the regular increase in nuclear charge is interrupted by two electronic configuration stabilities:\n1. $\\text{Mg} (3s^2)$ has higher $\\text{IE}_1$ than $\\text{Al} (3s^2 3p^1)$ because removing an electron from a penetrating $3s$ orbital requires more energy than removing a shielded $3p$ electron ($737\\text{ vs } 577\\text{ kJ mol}^{-1}$).\n2. $\\text{P} (3s^2 3p^3)$ has a half-filled, symmetrically distributed $3p$ subshell with higher exchange energy than $\\text{S} (3s^2 3p^4)$, so $\\text{IE}_1(\\text{P}) = 1012\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{S}) = 999\\text{ kJ mol}^{-1}$.\nThus, the correct increasing sequence is: $\\text{Na} < \\text{Al} < \\text{Mg} < \\text{Si} < \\text{S} < \\text{P}$.",
    topic: "Period 3 Ionization Enthalpy Anomalies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 5,
    number: 5,
    text: "Which of the following statements regarding Group 13 elements is FALSE? [JEE Main 2023]",
    options: {
      A: "The atomic radius of Gallium ($\\text{Ga}$) is smaller than that of Aluminium ($\\text{Al}$).",
      B: "The first ionization enthalpy of Thallium ($\\text{Tl}$) is higher than that of Indium ($\\text{In}$).",
      C: "The order of atomic radii is: $\\text{B} < \\text{Ga} < \\text{Al} < \\text{In} < \\text{Tl}$.",
      D: "The first ionization enthalpy decreases continuously from Boron down to Thallium."
    },
    correctAnswer: "D",
    explanation: "Statement D is false. The ionization enthalpies of Group 13 elements do NOT decrease smoothly down the column. Due to the intervention of poor-shielding $3d^{10}$ electrons in $\\text{Ga}$ ($d$-block transition contraction) and $4f^{14}$ electrons in $\\text{Tl}$ (lanthanoid contraction), the effective nuclear charge increases unexpectedly, making $\\text{IE}_1(\\text{Ga}) > \\text{IE}_1(\\text{Al})$ and $\\text{IE}_1(\\text{Tl}) > \\text{IE}_1(\\text{In})$. The actual order is $\\text{B} (801) > \\text{Tl} (589) > \\text{Ga} (579) > \\text{Al} (577) > \\text{In} (558\\text{ kJ mol}^{-1})$.",
    topic: "Group 13 Contractions & Radii Anomalies",
    difficulty: "Hard",
    image: null
  },
  {
    id: 6,
    number: 6,
    text: "The correct order of electron gain enthalpy with negative sign (i.e. most negative to least negative / magnitude of $\\Delta_{eg}H$) for Group 16 elements is: [JEE Main 2024]",
    options: {
      A: "$\\text{O} > \\text{S} > \\text{Se} > \\text{Te}$",
      B: "$\\text{S} > \\text{Se} > \\text{Te} > \\text{Po} > \\text{O}$",
      C: "$\\text{S} > \\text{O} > \\text{Se} > \\text{Te} > \\text{Po}$",
      D: "$\\text{Se} > \\text{S} > \\text{O} > \\text{Te} > \\text{Po}$"
    },
    correctAnswer: "B",
    explanation: "Oxygen has an exceptionally small, compact $2p$ subshell where the incoming electron experiences strong inter-electronic electrostatic repulsion. In Sulphur ($\\text{S}$), the $3p$ subshell is larger and more diffuse, easily accommodating the extra electron. Hence, Sulphur has the most negative electron gain enthalpy in Group 16. Down the group below $\\text{S}$, the enthalpy becomes less negative due to increasing size. Oxygen ends up with the least negative value in the entire family: $\\text{S} (-200) > \\text{Se} (-195) > \\text{Te} (-190) > \\text{Po} (-174) > \\text{O} (-141\\text{ kJ mol}^{-1})$.",
    topic: "Electron Gain Enthalpy Trends in Group 16",
    difficulty: "Medium",
    image: null
  },
  {
    id: 7,
    number: 7,
    text: "The formation of the oxide ion $\\text{O}^{2-}(\\text{g})$ from oxygen atom requires first an exothermic and then an endothermic step as shown below:\n$$\\text{O}(\\text{g}) + \\text{e}^- \\to \\text{O}^-(\\text{g}); \\quad \\Delta_{eg}H_1 = -141\\text{ kJ mol}^{-1}$$\n$$\\text{O}^-(\\text{g}) + \\text{e}^- \\to \\text{O}^{2-}(\\text{g}); \\quad \\Delta_{eg}H_2 = +780\\text{ kJ mol}^{-1}$$\nWhat is the primary reason why $\\Delta_{eg}H_2$ is highly positive (endothermic)? [JEE Main 2021]",
    options: {
      A: "Oxygen has high electronegativity.",
      B: "Addition of electron in $\\text{O}^-$ is strongly opposed by electrostatic repulsion between like charges.",
      C: "$\\text{O}^-$ ion has a stable noble gas configuration.",
      D: "The size of $\\text{O}^-$ is smaller than neutral oxygen atom."
    },
    correctAnswer: "B",
    explanation: "The addition of a second electron to a negatively charged ion ($\\text{O}^-$) is strongly counteracted by inter-electronic Coulombic repulsion between the existing unit negative charge and the incoming electron. Overcoming this severe electrostatic barrier requires substantial energy, making the second electron gain enthalpy ($\\Delta_{eg}H_2$) invariably positive (endothermic) for all elements.",
    topic: "Successive Electron Gain Enthalpies",
    difficulty: "Easy",
    image: null
  },
  {
    id: 8,
    number: 8,
    text: "Match List-I with List-II regarding the nature of oxides:\nList-I (Oxide): (A) $\\text{Cl}_2\\text{O}_7$, (B) $\\text{Na}_2\\text{O}$, (C) $\\text{Al}_2\\text{O}_3$, (D) $\\text{N}_2\\text{O}$\nList-II (Nature): (I) Amphoteric, (II) Neutral, (III) Basic, (IV) Acidic\nChoose the correct answer from the options given below: [JEE Main 2021]",
    options: {
      A: "A-IV, B-III, C-I, D-II",
      B: "A-IV, B-I, C-III, D-II",
      C: "A-II, B-III, C-I, D-IV",
      D: "A-I, B-II, C-III, D-IV"
    },
    correctAnswer: "A",
    explanation: "- $\\text{Cl}_2\\text{O}_7$: Highly acidic non-metallic anhydride forming perchloric acid $\\text{HClO}_4$ in water $\\implies$ (IV).\n- $\\text{Na}_2\\text{O}$: Strongly basic alkali metal oxide reacting vigorously to form $\\text{NaOH}$ $\\implies$ (III).\n- $\\text{Al}_2\\text{O}_3$: Amphoteric oxide reacting with both acids (forming $\\text{Al}^{3+}$) and strong bases (forming $[\\text{Al(OH)}_4]^-$) $\\implies$ (I).\n- $\\text{N}_2\\text{O}$: Nitrous oxide is a non-reactive, neutral oxide $\\implies$ (II).\nTherefore, the correct matching is A-IV, B-III, C-I, D-II.",
    topic: "Classification of Oxides",
    difficulty: "Medium",
    image: null
  },
  {
    id: 9,
    number: 9,
    text: "Among the following oxides:\n$$\\text{CO}, \\text{NO}, \\text{N}_2\\text{O}, \\text{Al}_2\\text{O}_3, \\text{ZnO}, \\text{SnO}_2, \\text{PbO}_2, \\text{BeO}, \\text{Cr}_2\\text{O}_3, \\text{SiO}_2$$\nhow many oxides are AMPHOTERIC in nature? [JEE Main 2023 / 2024]",
    options: {
      A: "4",
      B: "6",
      C: "5",
      D: "7"
    },
    correctAnswer: "B",
    explanation: "Let us classify every listed oxide:\n- Neutral oxides (3): $\\text{CO}, \\text{NO}, \\text{N}_2\\text{O}$.\n- Acidic oxide (1): $\\text{SiO}_2$ (reacts only with bases like $\\text{HF}$ / hot concentrated $\\text{NaOH}$).\n- Amphoteric oxides (6): $\\text{Al}_2\\text{O}_3, \\text{ZnO}, \\text{SnO}_2, \\text{PbO}_2, \\text{BeO}, \\text{Cr}_2\\text{O}_3$.\nThus, exactly 6 oxides are amphoteric.",
    topic: "Amphoteric Oxides Counting",
    difficulty: "Hard",
    image: null
  },
  {
    id: 10,
    number: 10,
    text: "Moseley studied the characteristic X-ray spectra of a series of elements. The mathematical relation he deduced between the frequency ($\\nu$) of the spectral line and atomic number ($Z$) is: [JEE Main Benchmark]",
    options: {
      A: "$\\nu = a(Z - b)^2$",
      B: "$\\sqrt{\\nu} = a(Z - b)$",
      C: "$\\nu^2 = a(Z - b)$",
      D: "$\\sqrt{\\nu} = a(Z - b)^2$"
    },
    correctAnswer: "B",
    explanation: "Henry Moseley (1913) analyzed characteristic X-ray emission lines and discovered that a plot of $\\sqrt{\\nu}$ against atomic number $Z$ yielded a straight line: $\\sqrt{\\nu} = a(Z - b)$, where $a$ and $b$ are constants characteristic of the spectral series ($K_\\alpha$). This provided definitive physical evidence that atomic number, not atomic weight, is the fundamental property governing periodic classification.",
    topic: "Moseley's Law & Modern Periodic Law",
    difficulty: "Easy",
    image: null
  },
  {
    id: 11,
    number: 11,
    text: "The ground state electronic configuration of Platinum ($\\text{Pt}$, atomic number $Z = 78$) is: [JEE Main Benchmark]",
    options: {
      A: "$[\\text{Xe}] 4f^{14} 5d^8 6s^2$",
      B: "$[\\text{Xe}] 4f^{14} 5d^9 6s^1$",
      C: "$[\\text{Xe}] 4f^{14} 5d^{10} 6s^0$",
      D: "$[\\text{Xe}] 4f^{13} 5d^9 6s^2$"
    },
    correctAnswer: "B",
    explanation: "Platinum is an anomalous d-block element. Due to small energy differences between $5d$ and $6s$ coupled with relativistic stabilization and exchange energy, one electron shifts from $6s$ to $5d$, yielding: $\\text{Pt} (Z=78): [\\text{Xe}] 4f^{14} 5d^9 6s^1$. (Compare with Nickel: $[\\text{Ar}]3d^8 4s^2$, and Palladium: $[\\text{Kr}]4d^{10}5s^0$).",
    topic: "Heavy Metal Electronic Configurations",
    difficulty: "Medium",
    image: null
  },
  {
    id: 12,
    number: 12,
    text: "According to Slater's rules, the effective nuclear charge ($Z_{\\text{eff}}$) experienced by a $4s$ valence electron in a neutral Zinc atom ($\\text{Zn}$, $Z = 30$) is: [JEE Main Benchmark]",
    options: {
      A: "$4.35$",
      B: "$8.85$",
      C: "$5.65$",
      D: "$12.00$"
    },
    correctAnswer: "A",
    explanation: "Electronic configuration of Zinc ($Z=30$): $(1s)^2 (2s, 2p)^8 (3s, 3p)^8 (3d)^{10} (4s)^2$.\nTo calculate shielding constant $\\sigma$ for one $4s$ electron:\n1. Other electron in $(4s)$ shell: $1 \\times 0.35 = 0.35$\n2. Electrons in $(n-1)$ shell (i.e., $3s, 3p, 3d = 8 + 10 = 18$): $18 \\times 0.85 = 15.30$\n3. Electrons in $(n-2)$ and deeper shells ($1s, 2s, 2p = 2 + 8 = 10$): $10 \\times 1.00 = 10.00$\nTotal screening constant $\\sigma = 0.35 + 15.30 + 10.00 = 25.65$.\nEffective nuclear charge $Z_{\\text{eff}} = Z - \\sigma = 30 - 25.65 = 4.35$.",
    topic: "Slater's Rules & Effective Nuclear Charge",
    difficulty: "Hard",
    image: null
  },
  {
    id: 13,
    number: 13,
    text: "The covalent radius and van der Waals radius of Chlorine atom are respectively: [JEE Advanced Concept Drill]",
    options: {
      A: "$180\\text{ pm}$ and $99\\text{ pm}$",
      B: "$99\\text{ pm}$ and $180\\text{ pm}$",
      C: "$99\\text{ pm}$ and $99\\text{ pm}$",
      D: "$140\\text{ pm}$ and $140\\text{ pm}$"
    },
    correctAnswer: "B",
    explanation: "Covalent radius is half the internuclear distance between two covalently bonded atoms (in a $\\text{Cl}_2$ molecule, distance $= 198\\text{ pm} \\implies r_{\\text{cov}} = 99\\text{ pm}$). Van der Waals radius represents half the distance between two non-bonded adjacent chlorine nuclei belonging to neighboring molecules in the solid state ($360\\text{ pm} \\implies r_{\\text{vdW}} = 180\\text{ pm}$). Van der Waals radius is always larger than covalent radius ($r_{\\text{vdW}} > r_{\\text{cov}}$).",
    topic: "Covalent vs Van der Waals Radii",
    difficulty: "Easy",
    image: null
  },
  {
    id: 14,
    number: 14,
    text: "In the fluoroborate anion $[\\text{BF}_4]^-$, the covalency and formal oxidation state of the central Boron atom are respectively: [JEE Advanced Concept Drill]",
    options: {
      A: "$3$ and $+3$",
      B: "$4$ and $+3$",
      C: "$4$ and $-1$",
      D: "$3$ and $-1$"
    },
    correctAnswer: "B",
    explanation: "Covalency is the total number of electron pairs shared (covalent bonds formed) by an atom. Boron forms 4 two-center two-electron $\\text{B}-\\text{F}$ covalent bonds (three standard covalent bonds and one coordinate bond using its vacant $2p$ orbital with an incoming $:F^-$), so its covalency is 4. The oxidation state of Boron is determined by: $x + 4(-1) = -1 \\implies x = +3$.",
    topic: "Covalency vs Oxidation State",
    difficulty: "Medium",
    image: null
  },
  {
    id: 15,
    number: 15,
    text: "An element has atomic number $Z = 77$. In the modern periodic table, it is placed in: [JEE Main Benchmark]",
    options: {
      A: "Period 6, Group 9, d-block",
      B: "Period 6, Group 8, d-block",
      C: "Period 7, Group 9, d-block",
      D: "Period 6, Group 3, f-block"
    },
    correctAnswer: "A",
    explanation: "Element $Z = 77$ is Iridium ($\\text{Ir}$). Electronic configuration: $[\\text{Xe}]_{54} 4f^{14} 5d^7 6s^2$. The principal quantum number of the outermost shell is $n=6$, so it resides in Period 6. The differentiating electrons enter the $5d$ subshell, placing it in the d-block. The group number for d-block is (valence $s$ electrons + penultimate $d$ electrons) $= 2 + 7 = 9$.",
    topic: "Element Location from Atomic Number",
    difficulty: "Medium",
    image: null
  },
  {
    id: 16,
    number: 16,
    text: "For a divalent metal $\\text{M}$, if the difference between successive ionization enthalpies ($\\Delta \\text{IE} = \\text{IE}_2 - \\text{IE}_1$) is greater than $16\\text{ eV}$, which oxidation state is thermodynamically favored? [JEE Advanced Ranking Drill]",
    options: {
      A: "$+2$",
      B: "$+1$",
      C: "$+3$",
      D: "$0$"
    },
    correctAnswer: "B",
    explanation: "By empirical ionization enthalpy rules:\n- If $\\text{IE}_{n+1} - \\text{IE}_n > 16\\text{ eV}$, the lower oxidation state is stable because the extra lattice/hydration enthalpy cannot compensate for such a massive energy deficit (e.g., in alkali metals $\\text{IE}_2 - \\text{IE}_1 > 16\\text{ eV}$, so $\\text{M}^+$ is stable).\n- If $\\text{IE}_{n+1} - \\text{IE}_n < 11\\text{ eV}$, the higher oxidation state is stable (e.g., in alkaline earth metals $\\text{IE}_2 - \\text{IE}_1 \\approx 9-10\\text{ eV}$, so $\\text{M}^{2+}$ is formed).\nHence, if $\\Delta \\text{IE} > 16\\text{ eV}$, the $+1$ oxidation state is favored.",
    topic: "Oxidation State Stability via Ionization Gap",
    difficulty: "Hard",
    image: null
  },
  {
    id: 17,
    number: 17,
    text: "Which of the following alkali metal halides has the MINIMUM cation-to-anion radius ratio ($r_+ / r_-$)? [JEE Advanced Concept Drill]",
    options: {
      A: "$\\text{LiF}$",
      B: "$\\text{CsI}$",
      C: "$\\text{LiI}$",
      D: "$\\text{CsF}$"
    },
    correctAnswer: "C",
    explanation: "To minimize the ratio $r_+ / r_-$, we require the smallest possible cation combined with the largest possible anion. Among alkali metals, $\\text{Li}^+$ is the smallest cation ($r = 0.76\\text{ \\AA}$), and among halides, $\\text{I}^-$ is the largest anion ($r = 2.20\\text{ \\AA}$). Thus, $\\text{LiI}$ has the minimum radius ratio ($0.76 / 2.20 = 0.345$), causing it to exhibit high covalent character and low melting point.",
    topic: "Ionic Radii Ratios & Polarizability",
    difficulty: "Medium",
    image: null
  },
  {
    id: 18,
    number: 18,
    text: "Which metal has an unusually low melting point ($303\\text{ K}$) and remains in the liquid state over a remarkably wide temperature range up to its boiling point ($2676\\text{ K}$), making it ideal for high-temperature thermometry? [JEE Advanced Concept Drill]",
    options: {
      A: "Indium ($\\text{In}$)",
      B: "Gallium ($\\text{Ga}$)",
      C: "Mercury ($\\text{Hg}$)",
      D: "Caesium ($\\text{Cs}$)"
    },
    correctAnswer: "B",
    explanation: "Gallium ($\\text{Ga}$) has an unusual orthorhombic crystal lattice consisting of discrete $\\text{Ga}_2$ diatomic molecular pairs rather than a close-packed metallic network. Consequently, it melts just above room temperature at $30.3^\\circ\\text{C}$ ($303.3\\text{ K}$), but its metallic boiling point is very high ($2676\\text{ K}$). This massive liquid range of over $2370^\\circ\\text{C}$ makes Gallium unique for measuring high temperatures.",
    topic: "Periodic Physical Anomalies of Group 13",
    difficulty: "Easy",
    image: null
  },
  {
    id: 19,
    number: 19,
    text: "An element $\\text{X}$ has exceptionally high first ionization enthalpy ($\\approx 2372\\text{ kJ mol}^{-1}$), but virtually ZERO electron affinity ($\\Delta_{eg}H > 0$). Identify element $\\text{X}$: [JEE Advanced Ranking Drill]",
    options: {
      A: "Hydrogen ($\\text{H}$)",
      B: "Fluorine ($\\text{F}$)",
      C: "Helium ($\\text{He}$)",
      D: "Neon ($\\text{Ne}$)"
    },
    correctAnswer: "C",
    explanation: "Helium ($1s^2$) has the highest first ionization enthalpy of all known elements ($2372\\text{ kJ mol}^{-1}$) because its two electrons reside in the $K$-shell closest to the unshielded nucleus ($Z=2$). Because its $1s$ shell is completely filled, adding another electron would require placing it into the higher-energy $2s$ subshell against nuclear attraction, yielding an unstable anion with endothermic electron gain enthalpy ($\\Delta_{eg}H > 0$).",
    topic: "Helium Electronic Stability & Ionization Peak",
    difficulty: "Easy",
    image: null
  },
  {
    id: 20,
    number: 20,
    text: "Which of the following pairs does NOT represent a valid diagonal relationship in the modern periodic table? [JEE Advanced Ranking Drill]",
    options: {
      A: "$\\text{Li}$ and $\\text{Mg}$",
      B: "$\\text{Be}$ and $\\text{Al}$",
      C: "$\\text{B}$ and $\\text{Si}$",
      D: "$\\text{Li}$ and $\\text{Na}$"
    },
    correctAnswer: "D",
    explanation: "Diagonal relationships occur between diagonally adjacent elements of Period 2 and Period 3 due to similarity in ionic potential (charge/radius ratio $\\phi$): $\\text{Li}$ is diagonally related to $\\text{Mg}$; $\\text{Be}$ is diagonally related to $\\text{Al}$; $\\text{B}$ is diagonally related to $\\text{Si}$. $\\text{Li}$ and $\\text{Na}$ belong to the SAME vertical group (Group 1, alkali metals), not a diagonal pair.",
    topic: "Diagonal Relationships",
    difficulty: "Easy",
    image: null
  },
  {
    id: 21,
    number: 21,
    text: "On the Pauling electronegativity scale, which of the following is the correct order of electronegativity for the elements $\\text{Al}, \\text{Si}, \\text{P}, \\text{S}, \\text{Cl}$? [JEE Main 2022]",
    options: {
      A: "$\\text{Al} < \\text{Si} < \\text{P} < \\text{S} < \\text{Cl}$",
      B: "$\\text{Si} < \\text{Al} < \\text{P} < \\text{S} < \\text{Cl}$",
      C: "$\\text{Al} < \\text{P} < \\text{Si} < \\text{S} < \\text{Cl}$",
      D: "$\\text{Cl} < \\text{S} < \\text{P} < \\text{Si} < \\text{Al}$"
    },
    correctAnswer: "A",
    explanation: "Across Period 3 from left to right, effective nuclear charge increases continuously while atomic radius contracts. Consequently, the tendency of an atom in a molecule to attract shared bonding electrons increases steadily: $\\text{Al} (1.61) < \\text{Si} (1.90) < \\text{P} (2.19) < \\text{S} (2.58) < \\text{Cl} (3.16)$.",
    topic: "Electronegativity Trends Across Period 3",
    difficulty: "Easy",
    image: null
  },
  {
    id: 22,
    number: 22,
    text: "The correct order of metallic character for the elements $\\text{Na}, \\text{Mg}, \\text{Be}, \\text{Si}$, and $\\text{P}$ is: [JEE Main 2021]",
    options: {
      A: "$\\text{Na} > \\text{Mg} > \\text{Be} > \\text{Si} > \\text{P}$",
      B: "$\\text{Be} > \\text{Na} > \\text{Mg} > \\text{Si} > \\text{P}$",
      C: "$\\text{Na} > \\text{Mg} > \\text{Si} > \\text{P} > \\text{Be}$",
      D: "$\\text{P} > \\text{Si} > \\text{Be} > \\text{Mg} > \\text{Na}$"
    },
    correctAnswer: "A",
    explanation: "Metallic character increases down a group (due to decreasing ionization enthalpy) and decreases across a period (due to increasing effective nuclear charge). $\\text{Na}$ is the most electropositive alkali metal. Between $\\text{Mg}$ and $\\text{Be}$, $\\text{Mg}$ is below $\\text{Be}$ in Group 2 and thus more metallic than $\\text{Be}$. Silicon is a metalloid, and Phosphorus is a non-metal. Hence: $\\text{Na} > \\text{Mg} > \\text{Be} > \\text{Si} > \\text{P}$.",
    topic: "Metallic Character Periodic Trends",
    difficulty: "Medium",
    image: null
  },
  {
    id: 23,
    number: 23,
    text: "The ionic radius of $\\text{Na}^+$ is $1.02\\text{ \\AA}$. The expected ionic radii of $\\text{Mg}^{2+}$ and $\\text{Al}^{3+}$ respectively are: [JEE Advanced Concept Drill]",
    options: {
      A: "$1.05\\text{ \\AA}$ and $0.99\\text{ \\AA}$",
      B: "$0.72\\text{ \\AA}$ and $0.54\\text{ \\AA}$",
      C: "$0.85\\text{ \\AA}$ and $1.02\\text{ \\AA}$",
      D: "$0.72\\text{ \\AA}$ and $1.15\\text{ \\AA}$"
    },
    correctAnswer: "B",
    explanation: "$\\text{Na}^+ (Z=11), \\text{Mg}^{2+} (Z=12)$, and $\\text{Al}^{3+} (Z=13)$ form an isoelectronic series with 10 electrons. As the nuclear charge $Z$ increases from 11 to 12 to 13, the ratio $Z/e$ increases ($1.1 \\to 1.2 \\to 1.3$), pulling the outer electron shells closer. Therefore, $r(\\text{Al}^{3+}) < r(\\text{Mg}^{2+}) < r(\\text{Na}^+)$. Since $\\text{Na}^+ = 1.02\\text{ \\AA}$, both $\\text{Mg}^{2+}$ and $\\text{Al}^{3+}$ must have radii significantly less than $1.02\\text{ \\AA}$, with $r(\\text{Mg}^{2+}) > r(\\text{Al}^{3+})$. The authentic values are $0.72\\text{ \\AA}$ and $0.54\\text{ \\AA}$.",
    topic: "Quantitative Deduction of Isoelectronic Radii",
    difficulty: "Medium",
    image: null
  },
  {
    id: 24,
    number: 24,
    text: "The elements with atomic numbers $Z = 33, 53$, and $83$ are respectively: [JEE Main Benchmark]",
    options: {
      A: "Non-metal, metal, metalloid",
      B: "Metalloid, non-metal, metal",
      C: "Metal, metalloid, non-metal",
      D: "Non-metal, metalloid, metal"
    },
    correctAnswer: "B",
    explanation: "- $Z = 33$: Arsenic ($\\text{As}$, Group 15), a classic metalloid exhibiting amphoteric behavior.\n- $Z = 53$: Iodine ($\\text{I}$, Group 17), a halogen and non-metal.\n- $Z = 83$: Bismuth ($\\text{Bi}$, Group 15), a post-transition heavy metal.\nTherefore: Metalloid, non-metal, metal.",
    topic: "Element Characterization by Atomic Number",
    difficulty: "Easy",
    image: null
  },
  {
    id: 25,
    number: 25,
    text: "Among the anions $\\text{C}^-, \\text{N}^-, \\text{P}^-$, and $\\text{Si}^-$, the one from which removal of an electron requires the LEAST energy (i.e. lowest detachment energy) is: [JEE Main High-Yield Concept]",
    options: {
      A: "$\\text{C}^-$",
      B: "$\\text{P}^-$",
      C: "$\\text{N}^-$",
      D: "$\\text{Si}^-$"
    },
    correctAnswer: "B",
    explanation: "Neutral Phosphorus has a stable half-filled configuration: $[\\text{Ne}] 3s^2 3p^3$. When it accepts an electron to form $\\text{P}^-$, the electron must enter a half-filled subshell creating an electron pair ($3p^4$), experiencing pairing repulsion. Removing an electron from $\\text{P}^-$ restores the extra-stable half-filled $3p^3$ subshell of neutral $\\text{P}$. Thus, electron detachment from $\\text{P}^-$ is energetically the most favorable (lowest detachment energy).",
    topic: "Anion Stability & Detachment Energy",
    difficulty: "Hard",
    image: null
  },
  {
    id: 26,
    number: 26,
    text: "If the electron affinity of a gaseous non-metal atom is $90\\text{ kcal mol}^{-1}$ at $300\\text{ K}$, what is its electron gain enthalpy ($\\Delta_{eg}H$)? (Take $R = 2\\text{ cal K}^{-1}\\text{ mol}^{-1}$) [JEE Main High-Yield Concept]",
    options: {
      A: "$-91.5\\text{ kcal mol}^{-1}$",
      B: "$-88.5\\text{ kcal mol}^{-1}$",
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
    text: "In the modern long form of the periodic table, the transition elements (d-block) are accommodated in which of the following groups? [JEE Main Benchmark]",
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
    text: "Consider the following statements regarding atomic structure and periodicity:\n(I) Spin multiplicity ($2S + 1$) of $3d$ electrons in Chromium ($\\text{Cr}$) and Manganese ($\\text{Mn}$) atoms in their ground states is identical.\n(II) Plutonium ($Z = 94$) belongs to the $5f$ actinide series and is a transuranic element.\n(III) The effective nuclear charge ($Z_{\\text{eff}}$) for a $1s$ electron of Hydrogen atom is exactly $1$.\nWhich of the above statements is/are TRUE? [JEE Advanced Multi-Concept Drill]",
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
  },
  {
    id: 31,
    number: 31,
    text: "The atomic and ionic radii of Zirconium ($\\text{Zr}$, $4d$) and Hafnium ($\\text{Hf}$, $5d$) are almost identical ($\\approx 160\\text{ pm}$ and $159\\text{ pm}$) due to: [JEE Main 2022 / 2024]",
    options: {
      A: "Lanthanoid contraction",
      B: "Diagonal relationship",
      C: "Shielding effect of $d$-electrons",
      D: "Inert pair effect"
    },
    correctAnswer: "A",
    explanation: "Before Hafnium ($Z=72$), 14 electrons fill the inner $4f$ subshell ($Z=58$ to $71$). Because $f$-orbitals are very diffuse, they exert exceptionally poor shielding against nuclear charge. As a result, the effective nuclear charge increases progressively, pulling the outer electron shells closer. This phenomenon, known as Lanthanoid Contraction, almost exactly cancels the expected size expansion from $n=4$ to $n=5$, rendering the radii of $\\text{Zr}$ ($160\\text{ pm}$) and $\\text{Hf}$ ($159\\text{ pm}$) virtually indistinguishable.",
    topic: "Lanthanoid Contraction Consequences",
    difficulty: "Easy",
    image: null
  },
  {
    id: 32,
    number: 32,
    text: "The correct order of second ionization enthalpy ($\\text{IE}_2$) for the elements $\\text{C}, \\text{N}, \\text{O}$, and $\\text{F}$ is: [JEE Main 2023]",
    options: {
      A: "$\\text{O} > \\text{F} > \\text{N} > \\text{C}$",
      B: "$\\text{F} > \\text{O} > \\text{N} > \\text{C}$",
      C: "$\\text{O} > \\text{N} > \\text{F} > \\text{C}$",
      D: "$\\text{N} > \\text{O} > \\text{F} > \\text{C}$"
    },
    correctAnswer: "A",
    explanation: "To determine $\\text{IE}_2$, consider the electronic configurations of the unipositive ions:\n- $\\text{C}^+: 1s^2 2s^2 2p^1$\n- $\\text{N}^+: 1s^2 2s^2 2p^2$\n- $\\text{O}^+: 1s^2 2s^2 2p^3$ (extra-stable half-filled $2p^3$ subshell)\n- $\\text{F}^+: 1s^2 2s^2 2p^4$\nRemoving an electron from the stable half-filled $2p^3$ subshell of $\\text{O}^+$ requires immense energy, exceeding that of $\\text{F}^+$ despite Fluorine's higher nuclear charge. Thus, $\\text{IE}_2(\\text{O}) = 3388\\text{ kJ mol}^{-1} > \\text{IE}_2(\\text{F}) = 3374\\text{ kJ mol}^{-1} > \\text{IE}_2(\\text{N}) = 2856 > \\text{IE}_2(\\text{C}) = 2352\\text{ kJ mol}^{-1}$. Order: $\\text{O} > \\text{F} > \\text{N} > \\text{C}$.",
    topic: "Second Ionization Enthalpy Order",
    difficulty: "Hard",
    image: null
  },
  {
    id: 33,
    number: 33,
    text: "According to the Mulliken scale, electronegativity ($\\chi_M$) is defined as the arithmetic mean of ionization energy and electron affinity. If $\\text{IE}$ and $\\text{EA}$ are given in electron volts ($\\text{eV}$), the formula is: [JEE Main High-Yield Concept]",
    options: {
      A: "$\\chi_M = \\frac{\\text{IE} + \\text{EA}}{2}$",
      B: "$\\chi_M = \\frac{\\text{IE} - \\text{EA}}{2}$",
      C: "$\\chi_M = \\sqrt{\\text{IE} \\times \\text{EA}}$",
      D: "$\\chi_M = \\frac{\\text{IE} + \\text{EA}}{544}$"
    },
    correctAnswer: "A",
    explanation: "Robert Mulliken proposed that an atom's tendency to attract electrons in a bond is proportional to its resistance to losing electrons ($\\text{IE}$) and its tendency to gain electrons ($\\text{EA}$). Hence, Mulliken electronegativity is: $\\chi_M = \\frac{\\text{IE} + \\text{EA}}{2}$ (when values are in $\\text{eV}$). To convert Mulliken's values to the standard Pauling scale, the empirical relationship is $\\chi_P \\approx \\frac{\\chi_M}{2.8}$ (or $\\frac{\\text{IE} + \\text{EA}}{5.6}$ in $\\text{eV}$, and $\\frac{\\text{IE} + \\text{EA}}{544}$ in $\\text{kJ mol}^{-1}$).",
    topic: "Electronegativity Scales (Pauling vs Mulliken)",
    difficulty: "Medium",
    image: null
  },
  {
    id: 34,
    number: 34,
    text: "Which of the following properties of Lithium ($\\text{Li}$) and Magnesium ($\\text{Mg}$) does NOT demonstrate their diagonal relationship? [JEE Main 2021]",
    options: {
      A: "Both $\\text{Li}$ and $\\text{Mg}$ form stable nitrides ($\\text{Li}_3\\text{N}$ and $\\text{Mg}_3\\text{N}_2$) on direct heating in nitrogen.",
      B: "Both their carbonates decompose on heating to evolve $\\text{CO}_2$ gas.",
      C: "Both their chlorides are deliquescent and crystallize as hydrates ($\\text{LiCl}\\cdot 2\\text{H}_2\\text{O}$ and $\\text{MgCl}_2\\cdot 6\\text{H}_2\\text{O}$).",
      D: "Both $\\text{Li}$ and $\\text{Mg}$ form solid, stable hydrogen carbonates (bicarbonates) at room temperature."
    },
    correctAnswer: "D",
    explanation: "Statement D is false (and hence the correct answer). Neither Lithium nor Magnesium forms a solid hydrogen carbonate (bicarbonate); both $\\text{LiHCO}_3$ and $\\text{Mg(HCO}_3)_2$ exist only in aqueous solution and decompose upon isolation. Statements A, B, and C are true shared characteristics resulting from their close polarizing power (charge/radius ratio).",
    topic: "Diagonal Relationship Chemical Properties",
    difficulty: "Hard",
    image: null
  },
  {
    id: 35,
    number: 35,
    text: "Noble gases have unexpectedly larger atomic radii compared to the preceding halogens in the same period because: [JEE Advanced Concept Drill]",
    options: {
      A: "Their radii are reported as van der Waals radii, whereas halogen radii are reported as covalent radii.",
      B: "They possess an extra principal energy level.",
      C: "Their effective nuclear charge is substantially lower than that of halogens.",
      D: "Their electron-electron repulsion completely overcomes nuclear attraction."
    },
    correctAnswer: "A",
    explanation: "Because noble gases have completely filled valence shells ($ns^2 np^6$) and do not form stable homonuclear covalent bonds, their atomic radii cannot be measured as covalent radii. Instead, their reported values are van der Waals radii (half the distance between two non-bonded atoms in crystal/liquid phase). Since van der Waals radii are inherently larger than covalent radii by $40-60\\%$, Neon ($\\approx 160\\text{ pm}$) appears larger than Fluorine ($r_{\\text{cov}} = 72\\text{ pm}$).",
    topic: "Noble Gas Radii vs Halogens",
    difficulty: "Medium",
    image: null
  },
  {
    id: 36,
    number: 36,
    text: "The densities of alkali metals generally increase down the group from Lithium to Caesium, but Potassium ($\\text{K}$) has a lower density than Sodium ($\\text{Na}$). What is the reason for this anomaly? [JEE Main 2024]",
    options: {
      A: "Potassium has a lower atomic mass than Sodium.",
      B: "There is an abnormal expansion in atomic volume from $\\text{Na}$ to $\\text{K}$ due to the introduction of vacant $3d$ orbitals.",
      C: "Potassium crystalizes in face-centered cubic while Sodium is body-centered cubic.",
      D: "Potassium has stronger metallic bonding than Sodium."
    },
    correctAnswer: "B",
    explanation: "Density is defined as mass/volume ($\\rho = M/V$). From $\\text{Na}$ ($Z=11$) to $\\text{K}$ ($Z=19$), the atomic mass increases by about $70\\%$, but the atomic volume increases by over $100\\%$ due to the creation of the $n=4$ shell with empty $3d$ orbitals causing abnormal spatial expansion. Because the volume expansion outweighs the mass increment, Potassium ($0.86\\text{ g cm}^{-3}$) is less dense than Sodium ($0.97\\text{ g cm}^{-3}$).",
    topic: "Alkali Metal Physical Density Anomaly",
    difficulty: "Medium",
    image: null
  },
  {
    id: 37,
    number: 37,
    text: "The correct sequence of acidic, amphoteric, and basic nature for the hydroxides of Group 13 elements: $\\text{B(OH)}_3, \\text{Al(OH)}_3, \\text{TlOH}$ is: [JEE Advanced Ranking Drill]",
    options: {
      A: "Acidic, Amphoteric, Strongly Basic",
      B: "Basic, Amphoteric, Acidic",
      C: "Amphoteric, Acidic, Basic",
      D: "Acidic, Basic, Amphoteric"
    },
    correctAnswer: "A",
    explanation: "Down Group 13, the metallic character increases while electronegativity drops:\n- $\\text{B(OH)}_3$ (Boric acid): Weak monobasic Lewis acid that accepts $\\text{OH}^-$ from water: $\\text{B(OH)}_3 + 2\\text{H}_2\\text{O} \\rightleftharpoons [\\text{B(OH)}_4]^- + \\text{H}_3\\text{O}^+$.\n- $\\text{Al(OH)}_3$: Amphoteric, dissolves in both acids (yielding $\\text{Al}^{3+}$) and strong alkalis (yielding $[\\text{Al(OH)}_4]^-$).\n- $\\text{TlOH}$: Strongly basic hydroxide, behaving like alkali metal hydroxides ($\\text{NaOH}$) due to the stability of the large univalent $\\text{Tl}^+$ ion (inert pair effect).",
    topic: "Group 13 Hydroxides Acidity/Basicity Trend",
    difficulty: "Medium",
    image: null
  },
  {
    id: 38,
    number: 38,
    text: "According to official IUPAC systematic nomenclature, an element with atomic number $Z = 119$ will have the name, symbol, and predicted group: [JEE Main 2023]",
    options: {
      A: "Ununennium, Uue, Group 1",
      B: "Ununoctium, Uuo, Group 18",
      C: "Ununhexium, Uuh, Group 16",
      D: "Biunseptium, Bus, Group 2"
    },
    correctAnswer: "A",
    explanation: "By IUPAC numerical roots: $1 = \\text{un}$, $1 = \\text{un}$, $9 = \\text{enn}$. Ending with '-ium' yields **Ununennium** with chemical symbol **Uue**. Since Period 7 completes at $Z = 118$ (Oganesson, noble gas Group 18), element $119$ will start Period 8 and reside in **Group 1** (alkali metals, configuration $[\\text{Og}] 8s^1$).",
    topic: "IUPAC Nomenclature of Superheavy Elements",
    difficulty: "Easy",
    image: null
  },
  {
    id: 39,
    number: 39,
    text: "The correct decreasing order of the screening (shielding) effect for electrons in different subshells of the same principal energy level is: [JEE Main Benchmark]",
    options: {
      A: "$s > p > d > f$",
      B: "$f > d > p > s$",
      C: "$s > d > p > f$",
      D: "$d > f > p > s$"
    },
    correctAnswer: "A",
    explanation: "Shielding effectiveness depends on how deeply an orbital penetrates toward the nucleus and its spatial symmetry. Spherical $s$-orbitals have non-zero probability at the nucleus and the highest radial density, shielding outer electrons most effectively. As azimuthal quantum number $l$ increases, orbitals become increasingly diffuse with planar nodes: $s (l=0) > p (l=1) > d (l=2) > f (l=3)$. Poor shielding by $d$ and $f$ electrons is the root cause of both transition contraction and lanthanoid contraction.",
    topic: "Screening Effect & Subshell Penetration",
    difficulty: "Easy",
    image: null
  },
  {
    id: 40,
    number: 40,
    text: "Compare the first and second ionization enthalpies of Copper ($\\text{Cu}$, $Z=29$) and Zinc ($\\text{Zn}$, $Z=30$). Which statement is CORRECT? [JEE Main 2022]",
    options: {
      A: "$\\text{IE}_1(\\text{Zn}) > \\text{IE}_1(\\text{Cu})$ and $\\text{IE}_2(\\text{Cu}) > \\text{IE}_2(\\text{Zn})$",
      B: "$\\text{IE}_1(\\text{Cu}) > \\text{IE}_1(\\text{Zn})$ and $\\text{IE}_2(\\text{Cu}) > \\text{IE}_2(\\text{Zn})$",
      C: "$\\text{IE}_1(\\text{Zn}) > \\text{IE}_1(\\text{Cu})$ and $\\text{IE}_2(\\text{Zn}) > \\text{IE}_2(\\text{Cu})$",
      D: "$\\text{IE}_1(\\text{Cu}) > \\text{IE}_1(\\text{Zn})$ and $\\text{IE}_2(\\text{Zn}) > \\text{IE}_2(\\text{Cu})$"
    },
    correctAnswer: "A",
    explanation: "- For $\\text{IE}_1$: $\\text{Zn}$ has configuration $[\\text{Ar}] 3d^{10} 4s^2$ (completely filled $4s$ subshell), while $\\text{Cu}$ is $[\\text{Ar}] 3d^{10} 4s^1$. Removing the first electron from $\\text{Zn}$ breaks a stable $4s^2$ subshell with higher $Z$. Hence $\\text{IE}_1(\\text{Zn}) = 906\\text{ kJ mol}^{-1} > \\text{IE}_1(\\text{Cu}) = 745\\text{ kJ mol}^{-1}$.\n- For $\\text{IE}_2$: $\\text{Cu}^+$ has configuration $[\\text{Ar}] 3d^{10}$ (completely filled, stable d-shell), while $\\text{Zn}^+$ is $[\\text{Ar}] 3d^{10} 4s^1$. Removing the second electron from $\\text{Cu}^+$ disrupts the stable $3d^{10}$ octet, requiring $1958\\text{ kJ mol}^{-1}$, whereas $\\text{Zn}^+$ loses its single $4s^1$ electron requiring only $1733\\text{ kJ mol}^{-1}$. Hence $\\text{IE}_2(\\text{Cu}) > \\text{IE}_2(\\text{Zn})$.",
    topic: "Ionization Enthalpy Comparison of 3d Metals",
    difficulty: "Hard",
    image: null
  },
  {
    id: 41,
    number: 41,
    text: "The correct decreasing order of ionic mobility in aqueous solution for alkali metal ions is: [JEE Main 2021 / 2023]",
    options: {
      A: "$\\text{Cs}^+ > \\text{Rb}^+ > \\text{K}^+ > \\text{Na}^+ > \\text{Li}^+$",
      B: "$\\text{Li}^+ > \\text{Na}^+ > \\text{K}^+ > \\text{Rb}^+ > \\text{Cs}^+$",
      C: "$\\text{K}^+ > \\text{Rb}^+ > \\text{Cs}^+ > \\text{Na}^+ > \\text{Li}^+$",
      D: "$\\text{Cs}^+ > \\text{Li}^+ > \\text{Rb}^+ > \\text{K}^+ > \\text{Na}^+$"
    },
    correctAnswer: "A",
    explanation: "Due to its tiny gaseous radius ($0.76\\text{ \\AA}$), the $\\text{Li}^+$ ion has the highest charge density and polarizing power, attracting a thick hydration shell of water molecules. Consequently, hydrated $\\text{Li}^+$ is the largest and heaviest ion in aqueous solution, moving the slowest under an electric field. $\\text{Cs}^+$ has the largest bare radius, the lowest charge density, the smallest hydration shell, and therefore the highest ionic mobility: $\\text{Cs}^+ > \\text{Rb}^+ > \\text{K}^+ > \\text{Na}^+ > \\text{Li}^+$.",
    topic: "Hydration Enthalpy & Aqueous Ionic Mobility",
    difficulty: "Medium",
    image: null
  },
  {
    id: 42,
    number: 42,
    text: "Which of the following elements has an ENDOTHERMIC (positive) first electron gain enthalpy ($\\Delta_{eg}H > 0$)? [JEE Main 2022]",
    options: {
      A: "Nitrogen ($\\text{N}$)",
      B: "Oxygen ($\\text{O}$)",
      C: "Fluorine ($\\text{F}$)",
      D: "Carbon ($\\text{C}$)"
    },
    correctAnswer: "A",
    explanation: "Nitrogen has a ground state electronic configuration of $1s^2 2s^2 2p^3$ with an extra-stable half-filled $2p$ subshell. Adding an electron disrupts this stable exchange configuration and forces electron pairing in a compact $2p$ orbital, producing repulsive forces. Therefore, work must be done on the system to attach an electron, resulting in a positive electron gain enthalpy: $\\Delta_{eg}H(\\text{N}) = +31\\text{ kJ mol}^{-1}$ (compared to $-141$ for $\\text{O}$, $-328$ for $\\text{F}$, and $-122$ for $\\text{C}$).",
    topic: "Positive Electron Gain Enthalpy of Nitrogen",
    difficulty: "Medium",
    image: null
  },
  {
    id: 43,
    number: 43,
    text: "In the periodic table, the 14 Lanthanoid elements ($Z = 58$ to $71$) and 14 Actinoid elements ($Z = 90$ to $103$) formally belong to which group? [JEE Main Benchmark]",
    options: {
      A: "Group 3",
      B: "Group 4",
      C: "Group 2",
      D: "Group 6"
    },
    correctAnswer: "A",
    explanation: "Lanthanum ($Z=57$) and Actinium ($Z=89$) belong to Group 3 (d-block). The 14 lanthanoids (Cerium to Lutetium) and 14 actinoids (Thorium to Lawrencium) result from the filling of $(n-2)f$ inner subshells while maintaining the chemistry characteristic of Group 3. Formally, all 28 f-block elements are regarded as members of Group 3 in Period 6 and Period 7 respectively.",
    topic: "Group Classification of Inner Transition Elements",
    difficulty: "Easy",
    image: null
  },
  {
    id: 44,
    number: 44,
    text: "The oxidation state and maximum covalency of Nitrogen in dinitrogen pentoxide ($\\text{N}_2\\text{O}_5$) are respectively: [JEE Main 2024]",
    options: {
      A: "$+5$ and $4$",
      B: "$+5$ and $5$",
      C: "$+3$ and $4$",
      D: "$+5$ and $3$"
    },
    correctAnswer: "A",
    explanation: "In $\\text{N}_2\\text{O}_5$, each Nitrogen has formal oxidation state $+5$ ($2x + 5(-2) = 0 \\implies x = +5$). However, Nitrogen belongs to Period 2 and has only four valence orbitals ($2s, 2p_x, 2p_y, 2p_z$) with NO vacant d-orbitals available for valence expansion. It cannot form more than 4 covalent/coordinate bonds under any condition. Hence, its maximum covalency is strictly 4.",
    topic: "Nitrogen Oxidation State vs Octet Covalency Limit",
    difficulty: "Medium",
    image: null
  },
  {
    id: 45,
    number: 45,
    text: "Using Slater's rules, calculate the screening constant ($\\sigma$) for a valence $2p$ electron in a neutral Carbon atom ($Z = 6$): [JEE Main Benchmark]",
    options: {
      A: "$2.75$",
      B: "$3.25$",
      C: "$2.40$",
      D: "$3.15$"
    },
    correctAnswer: "A",
    explanation: "Electronic configuration of Carbon ($Z=6$): $(1s)^2 (2s, 2p)^4$.\nFor an electron in the $(2s, 2p)$ group:\n1. Other electrons in the same $(2s, 2p)$ shell: $(4 - 1) = 3$ electrons $\\implies 3 \\times 0.35 = 1.05$.\n2. Electrons in $(n-1)$ shell (i.e. $1s$): $2$ electrons $\\implies 2 \\times 0.85 = 1.70$.\nTotal screening constant $\\sigma = 1.05 + 1.70 = 2.75$.\nEffective nuclear charge $Z_{\\text{eff}} = 6 - 2.75 = 3.25$.",
    topic: "Slater's Screening Constant for Period 2",
    difficulty: "Medium",
    image: null
  },
  {
    id: 46,
    number: 46,
    text: "Across the $3d$ transition series from $\\text{Sc}$ to $\\text{Zn}$, how do the atomic radii vary? [JEE Main 2023]",
    options: {
      A: "Decrease sharply from $\\text{Sc}$ to $\\text{Cr}$, remain almost constant from $\\text{Mn}$ to $\\text{Ni}$, and slightly increase at $\\text{Cu}$ and $\\text{Zn}$.",
      B: "Decrease continuously from $\\text{Sc}$ to $\\text{Zn}$.",
      C: "Increase continuously from $\\text{Sc}$ to $\\text{Zn}$.",
      D: "Remain strictly constant across all ten elements."
    },
    correctAnswer: "A",
    explanation: "The radius trend across the 3d series exhibits three distinct regimes:\n1. $\\text{Sc} \\to \\text{Cr}$: Nuclear charge increases faster than screening by added d-electrons, causing radius to contract ($162\\text{ pm} \\to 128\\text{ pm}$).\n2. $\\text{Mn} \\to \\text{Ni}$: The screening by inner $3d$ electrons almost exactly balances the increasing nuclear charge, keeping radii practically constant ($\\,\\approx 125-127\\text{ pm}$).\n3. $\\text{Cu} \\to \\text{Zn}$: At the end of the series, pairing of all 10 $d$-electrons produces significant inter-electronic repulsion that expands the outer $4s$ cloud slightly ($\\text{Zn} = 134\\text{ pm}$).",
    topic: "3d Transition Series Radii Profile",
    difficulty: "Medium",
    image: null
  },
  {
    id: 47,
    number: 47,
    text: "The correct increasing order of basic strength of the alkali metal hydroxides in water is: [JEE Main 2021]",
    options: {
      A: "$\\text{LiOH} < \\text{NaOH} < \\text{KOH} < \\text{RbOH} < \\text{CsOH}$",
      B: "$\\text{CsOH} < \\text{RbOH} < \\text{KOH} < \\text{NaOH} < \\text{LiOH}$",
      C: "$\\text{LiOH} < \\text{KOH} < \\text{NaOH} < \\text{RbOH} < \\text{CsOH}$",
      D: "$\\text{NaOH} < \\text{LiOH} < \\text{KOH} < \\text{CsOH} < \\text{RbOH}$"
    },
    correctAnswer: "A",
    explanation: "Down Group 1 from $\\text{Li}$ to $\\text{Cs}$, the cation radius increases ($r_{\\text{Li}^+} < r_{\\text{Na}^+} < r_{\\text{K}^+} < r_{\\text{Rb}^+} < r_{\\text{Cs}^+}$). The $\\text{M}-\\text{OH}$ bond length increases and bond dissociation enthalpy drops correspondingly. Consequently, cleavage of the $\\text{M}-\\text{OH}$ bond to release $\\text{OH}^-$ ions occurs most readily in $\\text{CsOH}$, making $\\text{CsOH}$ the strongest Arrhenius/Bronsted base in the series.",
    topic: "Basicity of Alkali Hydroxides",
    difficulty: "Easy",
    image: null
  },
  {
    id: 48,
    number: 48,
    text: "Flerovium ($\\text{Fl}$, atomic number $Z = 114$) has the valence shell electronic configuration: [JEE Main 2024]",
    options: {
      A: "$[\\text{Rn}] 5f^{14} 6d^{10} 7s^2 7p^2$",
      B: "$[\\text{Rn}] 5f^{14} 6d^{10} 7s^2 7p^4$",
      C: "$[\\text{Xe}] 4f^{14} 5d^{10} 6s^2 6p^2$",
      D: "$[\\text{Rn}] 5f^{14} 6d^{10} 7s^1 7p^3$"
    },
    correctAnswer: "A",
    explanation: "Radon has $Z=86$. Filling the remaining 28 electrons according to the Aufbau principle: $5f^{14} (14) + 6d^{10} (10) + 7s^2 (2) + 7p^2 (2) = 28$ electrons. Total $Z = 86 + 28 = 114$. With valence configuration $7s^2 7p^2$, Flerovium is placed in Period 7 and Group 14 (Carbon family, beneath Lead).",
    topic: "Superheavy Element Configuration ($Z=114$)",
    difficulty: "Medium",
    image: null
  },
  {
    id: 49,
    number: 49,
    text: "According to Fajan's rules, the percentage of covalent character in an ionic compound increases with: [JEE Advanced Concept Drill]",
    options: {
      A: "Smaller cation, larger anion, and higher charges on both ions",
      B: "Larger cation, smaller anion, and lower charges on both ions",
      C: "Smaller cation and smaller anion with noble gas pseudo-core",
      D: "Larger cation and larger anion"
    },
    correctAnswer: "A",
    explanation: "Covalent character arises from polarization (distortion of the anion's electron cloud by the cation's electrostatic field). By Fajan's rules, polarization is maximized when:\n1. The cation is small (high charge density).\n2. The anion is large (loosely held valence electrons, high polarizability).\n3. Both ions carry high magnitude charges.\n4. Cation has pseudo-noble gas configuration ($ns^2 np^6 nd^{10}$, e.g. $\\text{Cu}^+$ vs $\\text{Na}^+$).",
    topic: "Fajan's Rules & Polarizability",
    difficulty: "Easy",
    image: null
  },
  {
    id: 50,
    number: 50,
    text: "The first electron gain enthalpies of Alkaline Earth Metals (Beryllium, Magnesium, Calcium) are: [JEE Main 2021]",
    options: {
      A: "Positive or nearly zero due to completely filled $ns^2$ subshells",
      B: "Highly negative like halogens",
      C: "More negative than alkali metals",
      D: "Equal to their first ionization enthalpies"
    },
    correctAnswer: "A",
    explanation: "Alkaline earth metals (Group 2) have completely filled, stable $ns^2$ valence subshells (e.g. $\\text{Be}: 1s^2 2s^2; \\text{Mg}: [\\text{Ne}] 3s^2$). An incoming electron must enter the higher-energy, vacant $np$ subshell, which is strongly shielded by the inner electrons and the $ns^2$ pair. Thus, the process is not energetically favorable, and $\\Delta_{eg}H_1$ is positive or essentially zero ($\\text{Be} \\approx +66\\text{ kJ mol}^{-1}$).",
    topic: "Group 2 Electron Gain Enthalpies",
    difficulty: "Medium",
    image: null
  },
  {
    id: 51,
    number: 51,
    text: "The thermal stability of alkaline earth metal carbonates increases down the group as: [JEE Main 2023]\n$$\\text{BeCO}_3 < \\text{MgCO}_3 < \\text{CaCO}_3 < \\text{SrCO}_3 < \\text{BaCO}_3$$\nThe thermodynamic explanation for this trend is that: [JEE Advanced Ranking Drill]",
    options: {
      A: "Larger cations have lower polarizing power and better stabilize the large $\\text{CO}_3^{2-}$ anion in the crystal lattice.",
      B: "The lattice energy of the carbonate increases down the group.",
      C: "Barium has lower electronegativity than Beryllium.",
      D: "The hydration enthalpy of the metal ion increases down the group."
    },
    correctAnswer: "A",
    explanation: "Decomposition of carbonate yields metal oxide: $\\text{MCO}_3(\\text{s}) \\to \\text{MO}(\\text{s}) + \\text{CO}_2(\\text{g})$. The small $\\text{Be}^{2+}$ ion has very high polarizing power, polarizing and weakening the $\\text{C}-\\text{O}$ bond in the large, polarizable carbonate anion ($\\text{CO}_3^{2-}$), promoting low-temperature decomposition into $\\text{BeO}$. Down the group, as cation size increases from $\\text{Mg}^{2+}$ to $\\text{Ba}^{2+}$, polarizing power diminishes, the lattice stability of $\\text{MCO}_3$ relative to $\\text{MO}$ increases, and decomposition temperature rises dramatically ($\\text{BeCO}_3 < 100^\\circ\\text{C}$ while $\\text{BaCO}_3 > 1360^\\circ\\text{C}$).",
    topic: "Carbonates Thermal Stability Trend",
    difficulty: "Hard",
    image: null
  },
  {
    id: 52,
    number: 52,
    text: "Which of the following elements has the HIGHEST electrical and thermal conductivity of all known metals at room temperature? [JEE Main Benchmark]",
    options: {
      A: "Copper ($\\text{Cu}$)",
      B: "Silver ($\\text{Ag}$)",
      C: "Gold ($\\text{Au}$)",
      D: "Aluminium ($\\text{Al}$)"
    },
    correctAnswer: "B",
    explanation: "Silver ($\\text{Ag}$, $Z = 47$) has the highest electrical conductivity ($6.30 \\times 10^7\\text{ S/m}$) and thermal conductivity ($429\\text{ W/m}\\cdot\\text{K}$) of all metals at room temperature due to its single free $5s$ valence electron with minimal electron-phonon scattering and high metallic orbital overlap. Copper is second, and Gold is third.",
    topic: "Electrical Conductivity Apex in Transition Metals",
    difficulty: "Easy",
    image: null
  },
  {
    id: 53,
    number: 53,
    text: "Which block of the periodic table is UNIQUE in containing metals, non-metals, and metalloids all within the same block? [JEE Main Benchmark]",
    options: {
      A: "p-block",
      B: "s-block",
      C: "d-block",
      D: "f-block"
    },
    correctAnswer: "A",
    explanation: "The p-block is the only region of the periodic table that contains all three primary classes of elements:\n- Non-metals: Carbon, Nitrogen, Oxygen, Fluorine, Phosphorus, Sulphur, Chlorine, Selenium, Bromine, Iodine, Noble gases.\n- Metalloids: Boron, Silicon, Germanium, Arsenic, Antimony, Tellurium.\n- Metals: Aluminium, Gallium, Indium, Thallium, Tin, Lead, Bismuth, Polonium.\nThe s, d, and f-blocks consist exclusively of metallic elements (except Hydrogen and Helium).",
    topic: "p-Block Elemental Diversity",
    difficulty: "Easy",
    image: null
  },
  {
    id: 54,
    number: 54,
    text: "The bond dissociation energy formula derived by Linus Pauling to calculate electronegativity difference ($\\Delta = \\chi_A - \\chi_B$) between atoms $\\text{A}$ and $\\text{B}$ in $\\text{kcal mol}^{-1}$ is: [JEE Main High-Yield Concept]",
    options: {
      A: "$\\chi_A - \\chi_B = 0.208 \\sqrt{E_{\\text{A-B}} - \\sqrt{E_{\\text{A-A}} \\times E_{\\text{B-B}}}}$",
      B: "$\\chi_A - \\chi_B = 0.102 \\sqrt{E_{\\text{A-B}} - \\sqrt{E_{\\text{A-A}} \\times E_{\\text{B-B}}}}$",
      C: "$\\chi_A - \\chi_B = \\frac{E_{\\text{A-B}}}{E_{\\text{A-A}} + E_{\\text{B-B}}}$",
      D: "$\\chi_A - \\chi_B = 0.208 (E_{\\text{A-B}} - E_{\\text{A-A}})"
    },
    correctAnswer: "A",
    explanation: "Linus Pauling observed that polar bonds $\\text{A}-\\text{B}$ are stronger than the geometric mean of pure covalent homonuclear bonds $\\sqrt{E_{\\text{A-A}} \\times E_{\\text{B-B}}}$ due to extra ionic resonance stabilization. The excess energy is $\\Delta = E_{\\text{A-B}} - \\sqrt{E_{\\text{A-A}} \\times E_{\\text{B-B}}}$. In units of $\\text{kcal mol}^{-1}$, the conversion factor is $0.208$, giving $\\chi_A - \\chi_B = 0.208 \\sqrt{\\Delta}$. (In units of $\\text{kJ mol}^{-1}$, the conversion factor is $0.102$).",
    topic: "Pauling Electronegativity Derivation",
    difficulty: "Hard",
    image: null
  },
  {
    id: 55,
    number: 55,
    text: "Which of the following non-metals exists as a liquid at room temperature ($298\\text{ K}$ and $1\\text{ atm}$)? [JEE Main 2021]",
    options: {
      A: "Bromine ($\\text{Br}_2$)",
      B: "Chlorine ($\\text{Cl}_2$)",
      C: "Iodine ($\\text{I}_2$)",
      D: "Mercury ($\\text{Hg}$)"
    },
    correctAnswer: "A",
    explanation: "Bromine ($\\text{Br}_2$) is the only NON-METAL in the periodic table that exists as a liquid under standard temperature and pressure ($25^\\circ\\text{C}$ and $1\\text{ atm}$, dark reddish-brown liquid with melting point $-7.2^\\circ\\text{C}$ and boiling point $58.8^\\circ\\text{C}$). Mercury ($\\text{Hg}$) is also a liquid, but it is a transition metal, not a non-metal.",
    topic: "Physical States in the Periodic Table",
    difficulty: "Easy",
    image: null
  },
  {
    id: 56,
    number: 56,
    text: "The correct order of increasing ionic radii for the halide ions $\\text{F}^-, \\text{Cl}^-, \\text{Br}^-$, and $\\text{I}^-$ is: [JEE Advanced Concept Drill]",
    options: {
      A: "$\\text{F}^- < \\text{Cl}^- < \\text{Br}^- < \\text{I}^-$",
      B: "$\\text{I}^- < \\text{Br}^- < \\text{Cl}^- < \\text{F}^-$",
      C: "$\\text{F}^- < \\text{Br}^- < \\text{Cl}^- < \\text{I}^-$",
      D: "$\\text{Cl}^- < \\text{F}^- < \\text{Br}^- < \\text{I}^-$"
    },
    correctAnswer: "A",
    explanation: "Down Group 17 from Fluorine to Iodine, an extra principal electron shell is added at each step ($n=2$ for $\\text{F}^-, n=3$ for $\\text{Cl}^-, n=4$ for $\\text{Br}^-$, and $n=5$ for $\\text{I}^-$). The increased shielding by inner electron cores outweighs the increase in nuclear charge, resulting in larger electron clouds: $\\text{F}^- (133\\text{ pm}) < \\text{Cl}^- (181\\text{ pm}) < \\text{Br}^- (196\\text{ pm}) < \\text{I}^- (220\\text{ pm})$.",
    topic: "Halide Ionic Radii Trend",
    difficulty: "Easy",
    image: null
  },
  {
    id: 57,
    number: 57,
    text: "Which of the following elements has the LARGEST first ionization enthalpy among the $5d$ transition series, even exceeding that of Gold ($\\text{Au}$) and Mercury ($\\text{Hg}$)? [JEE Advanced Ranking Drill]",
    options: {
      A: "Mercury ($\\text{Hg}$)",
      B: "Tungsten ($\\text{W}$)",
      C: "Hafnium ($\\text{Hf}$)",
      D: "Osmium ($\\text{Os}$)"
    },
    correctAnswer: "A",
    explanation: "Mercury ($\\text{Hg}, Z=80$) has the ground state configuration $[\\text{Xe}] 4f^{14} 5d^{10} 6s^2$. Due to relativistic contraction of the $6s$ orbital combined with the poor shielding of both the 14 $4f$ and 10 $5d$ electrons, the effective nuclear charge pulling on the completely filled $6s^2$ electron pair is extremely high. Consequently, Mercury has the highest first ionization enthalpy in the $5d$ series ($\\text{IE}_1 = 1007\\text{ kJ mol}^{-1}$), behaving almost like a noble gas and accounting for its liquid state.",
    topic: "Relativistic & Contraction Effects on Mercury",
    difficulty: "Hard",
    image: null
  },
  {
    id: 58,
    number: 58,
    text: "The correct decreasing order of electronegativity on the Pauling scale for the elements Carbon, Nitrogen, Oxygen, and Fluorine is: [JEE Main 2021]",
    options: {
      A: "$\\text{F} > \\text{O} > \\text{N} > \\text{C}$",
      B: "$\\text{F} > \\text{N} > \\text{O} > \\text{C}$",
      C: "$\\text{O} > \\text{F} > \\text{N} > \\text{C}$",
      D: "$\\text{F} > \\text{O} > \\text{C} > \\text{N}$"
    },
    correctAnswer: "A",
    explanation: "Across Period 2, electronegativity increases progressively from Lithium to Fluorine as atomic radius contracts and effective nuclear charge increases without adding any inner screening shells: $\\text{F} (4.0) > \\text{O} (3.5) > \\text{N} (3.0) > \\text{C} (2.5)$. Fluorine is the most electronegative element in the entire periodic table.",
    topic: "Period 2 Electronegativity Gradient",
    difficulty: "Easy",
    image: null
  },
  {
    id: 59,
    number: 59,
    text: "A neutral atom has the valence shell configuration $4s^2 4p^5$. In which period, group, and block of the periodic table does this element belong? [JEE Main Benchmark]",
    options: {
      A: "Period 4, Group 17, p-block",
      B: "Period 4, Group 15, p-block",
      C: "Period 4, Group 7, d-block",
      D: "Period 3, Group 17, p-block"
    },
    correctAnswer: "A",
    explanation: "The principal quantum number of the outermost valence shell is $n=4$, so it is in Period 4. The differentiating electron is entering the $4p$ subshell, so it belongs to the p-block. For p-block elements, the group number is $12 +$ (number of $p$ electrons) $= 12 + 5 = 17$ (or $10 +$ valence electrons $= 10 + 7 = 17$). This element is Bromine ($\\text{Br}$, $Z = 35$).",
    topic: "Element Identification from Valence Configuration",
    difficulty: "Easy",
    image: null
  },
  {
    id: 60,
    number: 60,
    text: "Consider the following statements regarding periodic trends:\n(1) The second electron gain enthalpy ($\\Delta_{eg}H_2$) of Sulphur is positive (endothermic).\n(2) The atomic radius of $\\text{Ga}$ is less than $\\text{Al}$ due to poor shielding of $3d$ electrons.\n(3) Electronegativity of an element is not a constant invariant property; it varies with the hybridization state of the atom ($\\text{sp} > \\text{sp}^2 > \\text{sp}^3$).\nWhich of the above statements is/are CORRECT? [JEE Main 2025 Benchmark]",
    options: {
      A: "(1), (2), and (3)",
      B: "(1) and (2) Only",
      C: "(2) and (3) Only",
      D: "(1) and (3) Only"
    },
    correctAnswer: "A",
    explanation: "All three statements are completely true:\n(1) True: Adding an electron to any uninegative anion ($\\text{S}^- + \\text{e}^- \\to \\text{S}^{2-}$) encounters strong electrostatic repulsion, so $\\Delta_{eg}H_2$ is always endothermic ($> 0$).\n(2) True: In Gallium ($Z=31$), the 10 $3d$ electrons exert poor shielding, causing high $Z_{\\text{eff}}$ which pulls the valence shell closer, making $r_{\\text{Ga}} (135\\text{ pm}) < r_{\\text{Al}} (143\\text{ pm})$.\n(3) True: Electronegativity increases with increasing percentage s-character because s-electrons are closer to the nucleus: $\\text{sp} (50\\% s) > \\text{sp}^2 (33.3\\% s) > \\text{sp}^3 (25\\% s)$.",
    topic: "Comprehensive Periodic Trends Synthesis",
    difficulty: "Hard",
    image: null
  }
];
