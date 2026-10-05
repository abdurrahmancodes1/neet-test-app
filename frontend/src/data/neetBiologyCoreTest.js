/**
 * NEET 2026 & Re-NEET 2026: Biology Core Foundation Drill
 * 50 Authentic Questions Filtered Strictly from NEET 2026 (Code 11) & Re-NEET 2026 (Code 50)
 *
 * Topics Included (Class 11 Botany & Human Physiology):
 *  1. The Living World
 *  2. Biological Classification
 *  3. Morphology of Flowering Plants
 *  4. Anatomy of Flowering Plants
 *  5. Cell: The Unit of Life
 *  6. Cell Cycle and Cell Division
 *  7. Biomolecules (Cellular Constituents)
 *  8. Structural Organisation in Animals
 *  9. Breathing and Exchange of Gases (Human Physiology)
 * 10. Body Fluids and Circulation (Human Physiology)
 * 11. Excretory Products and Their Elimination (Human Physiology)
 * 12. Locomotion and Movement (Human Physiology)
 *
 * Duration: 50 Minutes (1 min/Q NEET Standard) | Marking: +4 / -1 / 0 | Total Marks: 200
 */

export const NEET_BIOLOGY_TEST = {
  id: "neet-biology-class11-core-drill",
  title: "NEET 2026 & Re-NEET: Biology Core Foundation Drill",
  subtitle: "50 Authentic Questions from NEET 2026 & Re-NEET · Class 11 Botany & Human Physiology",
  subject: "Biology (Botany & Human Physiology)",
  durationMinutes: 50,
  totalQuestions: 50,
  totalMarks: 200,
  marksCorrect: 4,
  marksWrong: -1,
  syllabus: "The Living World, Biological Classification, Morphology & Anatomy of Flowering Plants, Cell: The Unit of Life, Cell Cycle & Division, Biomolecules, Breathing & Exchange of Gases, Body Fluids & Circulation, Excretory Products & Elimination, Locomotion & Movement"
};

export const NEET_BIOLOGY_QUESTIONS = [
  // --- THE LIVING WORLD & BIOLOGICAL CLASSIFICATION ---
  {
    id: 1,
    number: 1,
    subject: "Botany",
    text: "Which one of the following statements is NOT true about the universal rules of binomial nomenclature?",
    options: {
      A: "Biological names are generally in Latin and written in italics.",
      B: "Both words in a biological name, when handwritten, are separately underlined.",
      C: "The specific epithet in the biological name starts with a small letter.",
      D: "The first word in the biological name represents the specific epithet, while the second component denotes the genus."
    },
    correctAnswer: "D",
    explanation: "According to the universal rules of binomial nomenclature, the first word denotes the **Genus** (which begins with a capital letter), while the second word denotes the **specific epithet** (which begins with a small letter). Hence, statement D is incorrect.",
    topic: "The Living World - Rules of Binomial Nomenclature",
    difficulty: "Easy",
    image: null
  },
  {
    id: 2,
    number: 2,
    subject: "Botany",
    text: "Match List I with List II regarding the taxonomic hierarchy of Mango (*Mangifera indica*):\n- List I (Taxonomic Category):\n  A. Family\n  B. Genus\n  C. Class\n  D. Phylum / Division\n  E. Order\n- List II (Taxon):\n  I. Sapindales\n  II. Dicotyledonae\n  III. Anacardiaceae\n  IV. Angiospermae\n  V. *Mangifera*\nChoose the correct option:",
    options: {
      A: "A-I, B-V, C-II, D-IV, E-III",
      B: "A-II, B-I, C-III, D-IV, E-V",
      C: "A-II, B-III, C-V, D-I, E-IV",
      D: "A-III, B-V, C-II, D-IV, E-I"
    },
    correctAnswer: "D",
    explanation: "Taxonomic categories of Mango (*Mangifera indica*):\n- Family: Anacardiaceae (III)\n- Genus: *Mangifera* (V)\n- Class: Dicotyledonae (II)\n- Division: Angiospermae (IV)\n- Order: Sapindales (I)\nCorrect match: A-III, B-V, C-II, D-IV, E-I.",
    topic: "The Living World - Taxonomic Categories",
    difficulty: "Medium",
    image: null
  },
  {
    id: 3,
    number: 3,
    subject: "Botany",
    text: "Arrange the following taxonomic categories in correct ASCENDING order:\n(a) Genus\n(b) Class\n(c) Order\n(d) Phylum / Division\n(e) Family\n(f) Kingdom\n(g) Species\nChoose the correct answer from the options given below:",
    options: {
      A: "(g) $\\to$ (a) $\\to$ (e) $\\to$ (c) $\\to$ (b) $\\to$ (d) $\\to$ (f)",
      B: "(a) $\\to$ (c) $\\to$ (d) $\\to$ (g) $\\to$ (f) $\\to$ (b) $\\to$ (e)",
      C: "(g) $\\to$ (c) $\\to$ (d) $\\to$ (b) $\\to$ (e) $\\to$ (a) $\\to$ (f)",
      D: "(f) $\\to$ (c) $\\to$ (b) $\\to$ (g) $\\to$ (d) $\\to$ (e) $\\to$ (a)"
    },
    correctAnswer: "A",
    explanation: "The correct ascending order of obligate taxonomic hierarchy from lowest to highest category is:\n$$\\text{Species (g)} \\to \\text{Genus (a)} \\to \\text{Family (e)} \\to \\text{Order (c)} \\to \\text{Class (b)} \\to \\text{Phylum/Division (d)} \\to \\text{Kingdom (f)}.$$",
    topic: "The Living World - Taxonomic Hierarchy",
    difficulty: "Easy",
    image: null
  },
  {
    id: 4,
    number: 4,
    subject: "Botany",
    text: "Genus represents:",
    options: {
      A: "an individual plant or animal organism.",
      B: "a localized population of plants and animals.",
      C: "a group of closely related species with common characters.",
      D: "a group of closely related plant and animal families."
    },
    correctAnswer: "C",
    explanation: "A Genus comprises a group of related species which has more characters in common in comparison to species of other genera. For example, *Panthera leo* (lion), *Panthera pardus* (leopard), and *Panthera tigris* (tiger) are species belonging to the same genus *Panthera*.",
    topic: "The Living World - Concept of Genus",
    difficulty: "Easy",
    image: null
  },
  {
    id: 5,
    number: 5,
    subject: "Botany",
    text: "The main criteria used for the Five Kingdom Classification proposed by R.H. Whittaker (1969) included:\nA. Cell structure\nB. Body organization\nC. Presence of flagellum\nD. Mode of nutrition & Reproduction\nE. Phylogenetic relationships\nChoose the correct option:",
    options: {
      A: "A, B, C, D and E",
      B: "B, C and D only",
      C: "A, B, D and E only",
      D: "A, B and E only"
    },
    correctAnswer: "C",
    explanation: "The major criteria used by R.H. Whittaker for five-kingdom classification were:\n1. Cell structure (prokaryotic vs eukaryotic)\n2. Body organization (unicellular vs multicellular)\n3. Mode of nutrition (autotrophic vs heterotrophic)\n4. Reproduction\n5. Phylogenetic relationships.\nPresence of flagellum was not a primary criterion.",
    topic: "Biological Classification - Five Kingdom System Criteria",
    difficulty: "Medium",
    image: null
  },
  {
    id: 6,
    number: 6,
    subject: "Botany",
    text: "Symbiotic associations between fungi and algae are called:",
    options: {
      A: "Lichens",
      B: "Sponges",
      C: "Mycorrhiza",
      D: "Chrysophytes"
    },
    correctAnswer: "A",
    explanation: "Lichens are mutually useful symbiotic associations between an alga (phycobiont - autotrophic, prepares food) and a fungus (mycobiont - heterotrophic, provides shelter and absorbs mineral nutrients and water).",
    topic: "Biological Classification - Lichens",
    difficulty: "Easy",
    image: null
  },
  {
    id: 7,
    number: 7,
    subject: "Botany",
    text: "Mad cow disease (Bovine Spongiform Encephalopathy) in cattle is caused by an infectious agent known as:",
    options: {
      A: "Prions",
      B: "Viroids",
      C: "*Aspergillus* sp.",
      D: "*Mycoplasma* sp."
    },
    correctAnswer: "A",
    explanation: "Bovine Spongiform Encephalopathy (BSE), commonly called mad cow disease in cattle and its human variant Cr-Jacob disease (CJD), is caused by abnormally folded proteinaceous infectious particles called **Prions**.",
    topic: "Biological Classification - Prions & Viroids",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 8,
    number: 8,
    subject: "Botany",
    text: "Match List I with List II regarding bacterial morphology:\n- List I (Bacterial Shape):\n  A. Spherical\n  B. Rod-shaped\n  C. Comma-shaped\n  D. Spiral-shaped\n- List II (Category Name):\n  I. *Vibrio*\n  II. *Cocci*\n  III. *Spirilla*\n  IV. *Bacilli*\nChoose the correct option:",
    options: {
      A: "A-I, B-III, C-II, D-IV",
      B: "A-III, B-II, C-I, D-IV",
      C: "A-II, B-I, C-IV, D-III",
      D: "A-II, B-IV, C-I, D-III"
    },
    correctAnswer: "D",
    explanation: "Bacteria are grouped into four categories based on their shape:\n- Spherical $\\to$ *Coccus* / *Cocci* (II)\n- Rod-shaped $\\to$ *Bacillus* / *Bacilli* (IV)\n- Comma-shaped $\\to$ *Vibrio* (I)\n- Spiral-shaped $\\to$ *Spirillum* / *Spirilla* (III)\nCorrect match: A-II, B-IV, C-I, D-III.",
    topic: "Biological Classification - Bacterial Shapes",
    difficulty: "Easy",
    image: null
  },
  {
    id: 9,
    number: 9,
    subject: "Botany",
    text: "Match List I with List II regarding the sexual cycle of Kingdom Fungi:\n- List I (Process):\n  A. Fusion of protoplasms between two motile or non-motile gametes\n  B. Fusion of two haploid nuclei\n  C. Generation of haploid spores by reduction division in zygote\n- List II (Term):\n  I. Meiosis\n  II. Plasmogamy\n  III. Karyogamy\nChoose the correct option:",
    options: {
      A: "A-II, B-III, C-I",
      B: "A-II, B-I, C-III",
      C: "A-III, B-II, C-I",
      D: "A-I, B-III, C-II"
    },
    correctAnswer: "A",
    explanation: "The sexual reproduction in fungi involves three sequential steps:\n1. **Plasmogamy:** Fusion of protoplasms between two gametes (A-II).\n2. **Karyogamy:** Fusion of two nuclei (B-III).\n3. **Meiosis:** Reduction division in zygote resulting in haploid spores (C-I).",
    topic: "Biological Classification - Kingdom Fungi Reproduction",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 10,
    number: 10,
    subject: "Botany",
    text: "Which of the following organisms is NOT a prokaryote?",
    options: {
      A: "Bacteria",
      B: "Blue green algae (Cyanobacteria)",
      C: "*Mycoplasma*",
      D: "Fungi"
    },
    correctAnswer: "D",
    explanation: "Fungi are true **eukaryotic** organisms possessing a membrane-bound nucleus and specialized membrane-bound organelles. Bacteria, Cyanobacteria (BGA), and *Mycoplasma* belong to Kingdom Monera and are prokaryotic.",
    topic: "Biological Classification - Prokaryotes vs Eukaryotes",
    difficulty: "Easy",
    image: null
  },

  // --- MORPHOLOGY & ANATOMY OF FLOWERING PLANTS ---
  {
    id: 11,
    number: 11,
    subject: "Botany",
    text: "In angiosperms, unicellular root hairs arise from which one of the following regions of the root?",
    options: {
      A: "The root cap zone",
      B: "The region of meristematic activity",
      C: "The region of elongation",
      D: "The region of maturation"
    },
    correctAnswer: "D",
    explanation: "Proximal to the region of elongation is the **region of maturation**. In this zone, epidermal cells differentiate and mature, and some epidermal cells form very fine, delicate, thread-like tubular outgrowths called root hairs for water and mineral absorption.",
    topic: "Morphology of Flowering Plants - Regions of Root",
    difficulty: "Easy",
    image: null
  },
  {
    id: 12,
    number: 12,
    subject: "Botany",
    text: "Which of the following floral formulas is the correct representation for the family Solanaceae?",
    options: {
      A: "$\\% \\ \\text{\\textdied} \\ \\text{K}_{(5)} \\ \\text{C}_{1+2+(2)} \\ \\text{A}_{(9)+1} \\ \\underline{\\text{G}}_1$",
      B: "$\\oplus \\ \\text{\\textdied} \\ \\text{K}_{(5)} \\ \\overbracket{\\text{C}_{(5)} \\ \\text{A}_5} \\ \\underline{\\text{G}}_{(2)}$",
      C: "$\\oplus \\ \\text{\\textdied} \\ \\text{K}_5 \\ \\text{C}_5 \\ \\text{A}_5 \\ \\underline{\\text{G}}_{(2)}$",
      D: "$\\oplus \\ \\text{\\textdied} \\ \\text{P}_{(3+3)} \\ \\text{A}_{3+3} \\ \\underline{\\text{G}}_{(3)}$"
    },
    correctAnswer: "B",
    explanation: "Family Solanaceae has actinomorphic ($\\oplus$), bisexual ($\\text{\\textdied}$), pentamerous flowers with gamosepalous calyx ($\\text{K}_{(5)}$), gamopetalous corolla ($\\text{C}_{(5)}$), epipetalous stamens ($\\overbracket{\\text{C}_{(5)} \\ \\text{A}_5}$), and bicarpellary syncarpous superior ovary ($\\underline{\\text{G}}_{(2)}$).",
    topic: "Morphology of Flowering Plants - Floral Formula of Solanaceae",
    difficulty: "Medium",
    image: null
  },
  {
    id: 13,
    number: 13,
    subject: "Botany",
    text: "Which of the following are characteristic diagnostic features of the Solanaceae family?\n(a) Flowers are bisexual and actinomorphic\n(b) Calyx has five united sepals with persistent nature\n(c) Androecium has five epipetalous stamens\n(d) Ovary is inferior and unilocular\nChoose the correct option:",
    options: {
      A: "(a), (b) and (c) only",
      B: "(d) only",
      C: "(a) and (b) only",
      D: "(b), (c) and (d) only"
    },
    correctAnswer: "A",
    explanation: "In Solanaceae, the ovary is **superior** (not inferior), bicarpellary, syncarpous, and bilocular with swollen placenta. Statements (a), (b), and (c) are correct diagnostic features.",
    topic: "Morphology of Flowering Plants - Family Solanaceae",
    difficulty: "Medium",
    image: null
  },
  {
    id: 14,
    number: 14,
    subject: "Botany",
    text: "In a racemose inflorescence, ______________.",
    options: {
      A: "The main axis terminates in a flower and has limited growth.",
      B: "Flowers are solitary and terminal.",
      C: "The growth of the peduncle is strictly basipetal.",
      D: "The main axis continues to grow and flowers are borne laterally in an acropetal succession."
    },
    correctAnswer: "D",
    explanation: "In racemose inflorescence, the main axis (peduncle) continues to grow indefinitely and does not terminate in a flower; the flowers are borne laterally in an **acropetal succession** (older flowers at the base, younger flowers towards the apex).",
    topic: "Morphology of Flowering Plants - Inflorescence Types",
    difficulty: "Easy",
    image: null
  },
  {
    id: 15,
    number: 15,
    subject: "Botany",
    text: "Match List I with List II regarding placentation types:\n- List I (Placentation Type):\n  A. Marginal placentation\n  B. Axile placentation\n  C. Parietal placentation\n  D. Basal placentation\n- List II (Plant Example):\n  I. Mustard\n  II. Pea\n  III. Marigold\n  IV. Lemon\nChoose the correct option:",
    options: {
      A: "A-II, B-IV, C-I, D-III",
      B: "A-I, B-III, C-II, D-IV",
      C: "A-III, B-I, C-IV, D-II",
      D: "A-IV, B-II, C-I, D-III"
    },
    correctAnswer: "A",
    explanation: "Placentation matches:\n- Marginal $\\to$ Pea (II)\n- Axile $\\to$ Lemon / Tomato (IV)\n- Parietal $\\to$ Mustard / *Argemone* (I)\n- Basal $\\to$ Marigold / Sunflower (III)\nCorrect match: A-II, B-IV, C-I, D-III.",
    topic: "Morphology of Flowering Plants - Types of Placentation",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 16,
    number: 16,
    subject: "Botany",
    text: "Match List I with List II regarding placentation examples:\n- List I (Placentation):\n  A. Marginal placentation\n  B. Axile placentation\n  C. Parietal placentation\n  D. Free central placentation\n- List II (Example):\n  I. *Argemone*\n  II. Tomato\n  III. Primrose\n  IV. Pea\nChoose the correct option:",
    options: {
      A: "A-II, B-IV, C-I, D-III",
      B: "A-IV, B-II, C-III, D-I",
      C: "A-IV, B-III, C-I, D-II",
      D: "A-IV, B-II, C-I, D-III"
    },
    correctAnswer: "D",
    explanation: "Matching:\n- Marginal $\\to$ Pea (IV)\n- Axile $\\to$ Tomato (II)\n- Parietal $\\to$ *Argemone* (I)\n- Free central $\\to$ Primrose / *Dianthus* (III)\nCorrect match: A-IV, B-II, C-I, D-III.",
    topic: "Morphology of Flowering Plants - Placentation",
    difficulty: "Medium",
    image: null
  },
  {
    id: 17,
    number: 17,
    subject: "Botany",
    text: "Phyllotaxy is defined as the pattern of arrangement of:",
    options: {
      A: "leaves on the stem or branch.",
      B: "flowers on the floral axis.",
      C: "ovules within the ovary chamber.",
      D: "sepals and petals in the floral bud."
    },
    correctAnswer: "A",
    explanation: "Phyllotaxy is the pattern of arrangement of leaves on the stem or branch. It is typically of three types: alternate (e.g. mustard), opposite (e.g. *Calotropis*), and whorled (e.g. *Alstonia*).",
    topic: "Morphology of Flowering Plants - Phyllotaxy",
    difficulty: "Easy",
    image: null
  },
  {
    id: 18,
    number: 18,
    subject: "Botany",
    text: "The main physiological function of large, empty, colourless bulliform (motor) cells present in the adaxial epidermis of grass leaves is:",
    options: {
      A: "to make the leaf surface impermeable to fungal pathogens.",
      B: "to store carbohydrates synthesized during photosynthesis.",
      C: "to perform active stomatal gaseous exchange.",
      D: "to minimize water loss during water stress by curling the leaf inwards."
    },
    correctAnswer: "D",
    explanation: "In grasses, bulliform cells are large, bubble-shaped empty cells on the upper epidermis. When they absorb water and are turgid, the leaf surface is exposed. When they are flaccid due to water stress, they cause the leaves to curl inward to minimize water loss by transpiration.",
    topic: "Anatomy of Flowering Plants - Bulliform Cells in Monocot Leaves",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 19,
    number: 19,
    subject: "Botany",
    text: "Match List I with List II regarding plant anatomical tissues:\n- List I (Tissue / Structure):\n  A. Conjunctive tissue\n  B. Casparian strips\n  C. Subsidiary cells\n  D. Starch sheath\n- List II (Description / Location):\n  I. Specialised epidermal cells in the vicinity of guard cells\n  II. Endodermal cells of dicot stem rich in starch grains\n  III. Parenchymatous tissue located between xylem and phloem in roots\n  IV. Endodermal cells of roots with suberin deposition\nChoose the correct option:",
    options: {
      A: "A-IV, B-III, C-I, D-II",
      B: "A-III, B-IV, C-II, D-I",
      C: "A-III, B-IV, C-I, D-II",
      D: "A-IV, B-III, C-II, D-I"
    },
    correctAnswer: "C",
    explanation: "Anatomical structures:\n- Conjunctive tissue $\\to$ Parenchymatous cells between xylem and phloem patches in roots (A-III).\n- Casparian strips $\\to$ Suberin bands in endodermis of roots (B-IV).\n- Subsidiary cells $\\to$ Specialized epidermal cells adjacent to stomatal guard cells (C-I).\n- Starch sheath $\\to$ Starch-rich endodermis layer in dicot stems (D-II).\nCorrect match: A-III, B-IV, C-I, D-II.",
    topic: "Anatomy of Flowering Plants - Tissue Systems",
    difficulty: "Medium",
    image: null
  },
  {
    id: 20,
    number: 20,
    subject: "Botany",
    text: "The length of a plant stem at time $t = 0$ is $20\\text{ cm}$. If the arithmetic growth rate of the stem is $30\\text{ cm/day}$, what will be the length of the stem at the end of the $7^{\\text{th}}$ day?",
    options: {
      A: "$50\\text{ cm}$",
      B: "$170\\text{ cm}$",
      C: "$230\\text{ cm}$",
      D: "$460\\text{ cm}$"
    },
    correctAnswer: "C",
    explanation: "Using the linear arithmetic growth equation:\n$$L_t = L_0 + rt$$\nwhere $L_0 = 20\\text{ cm}$, growth rate $r = 30\\text{ cm/day}$, time $t = 7\\text{ days}$:\n$$L_7 = 20 + (30 \\times 7) = 20 + 210 = 230\\text{ cm}.$$",
    topic: "Cell & Plant Growth - Arithmetic Growth Calculations",
    difficulty: "Easy",
    image: null
  },

  // --- CELL: THE UNIT OF LIFE & CELL CYCLE ---
  {
    id: 21,
    number: 21,
    subject: "Botany",
    text: "The Classical Cell Theory was formulated by:",
    options: {
      A: "Matthias Schleiden and Theodor Schwann",
      B: "Robert Brown and Robert Hooke",
      C: "S.J. Singer and G.L. Nicolson",
      D: "Antonie van Leeuwenhoek"
    },
    correctAnswer: "A",
    explanation: "In 1838, Matthias Schleiden (German botanist) and in 1839, Theodor Schwann (British zoologist) together formulated the Cell Theory. Rudolf Virchow (1855) later expanded it with *Omnis cellula-e cellula*.",
    topic: "Cell: The Unit of Life - History of Cell Theory",
    difficulty: "Easy",
    image: null
  },
  {
    id: 22,
    number: 22,
    subject: "Botany",
    text: "Which one of the following is the specific nuclear sub-compartment dedicated to active ribosomal RNA (rRNA) synthesis?",
    options: {
      A: "Centrosome",
      B: "Chromatin",
      C: "Nucleolus",
      D: "Kinetochore"
    },
    correctAnswer: "C",
    explanation: "The **Nucleolus** is a non-membrane bound spherical structure present in the nucleoplasm. It is continuous with the rest of the nucleoplasm and is the active site for ribosomal RNA (rRNA) synthesis.",
    topic: "Cell: The Unit of Life - Nucleolus Function",
    difficulty: "Easy",
    image: null
  },
  {
    id: 23,
    number: 23,
    subject: "Botany",
    text: "Non-membrane bound cell organelles found in BOTH prokaryotic and eukaryotic cells are:",
    options: {
      A: "Ribosomes",
      B: "Lysosomes",
      C: "Centrosomes",
      D: "Mitochondria"
    },
    correctAnswer: "A",
    explanation: "Ribosomes are non-membrane bound ribonucleoprotein organelles present in both prokaryotes ($70S$) and eukaryotes ($80S$ in cytoplasm, $70S$ in chloroplasts/mitochondria). Lysosomes and mitochondria are membrane-bound, and centrosomes are absent in higher plant cells.",
    topic: "Cell: The Unit of Life - Ribosomes & Universal Organelles",
    difficulty: "Easy",
    image: null
  },
  {
    id: 24,
    number: 24,
    subject: "Botany",
    text: "Which of the following are characteristic features of prokaryotic cells?\n(a) Ribosomes are composed of $50S$ and $30S$ subunits forming a $70S$ ribosome\n(b) Small circular extra-chromosomal DNA called plasmids may be present\n(c) Membranous infoldings of plasma membrane form mesosomes\n(d) Membrane-bound microbodies called peroxisomes are present\nChoose the correct answer:",
    options: {
      A: "(b) and (c) only",
      B: "(a) and (c) only",
      C: "(a), (c) and (d) only",
      D: "(a), (b) and (c) only"
    },
    correctAnswer: "D",
    explanation: "Prokaryotic cells possess $70S$ ribosomes ($50S + 30S$), plasmids, and mesosomes. Peroxisomes are single-membrane bound microbodies found exclusively in eukaryotes.",
    topic: "Cell: The Unit of Life - Prokaryotic Cell Structure",
    difficulty: "Medium",
    image: null
  },
  {
    id: 25,
    number: 25,
    subject: "Botany",
    text: "The inner mitochondrial membrane encloses a dense, proteinaceous fluid called the:",
    options: {
      A: "Matrix",
      B: "Cytosol",
      C: "Stroma",
      D: "Nucleoplasm"
    },
    correctAnswer: "A",
    explanation: "Mitochondria have two membranes; the outer membrane is smooth, while the inner membrane forms numerous infoldings called cristae that enclose the dense homogenous semi-fluid **matrix** containing enzymes for the Krebs cycle.",
    topic: "Cell: The Unit of Life - Mitochondria Structure",
    difficulty: "Easy",
    image: null
  },
  {
    id: 26,
    number: 26,
    subject: "Botany",
    text: "Match List I with List II regarding cellular organelles and membrane structures:\n- List I:\n  A. Cristae\n  B. Cisternae\n  C. Thylakoids\n  D. Phospholipids\n- List II:\n  I. Flat membranous sacs arranged in stroma of chloroplasts\n  II. Infoldings of inner mitochondrial membrane\n  III. Fundamental lipid bilayer of plasma membrane\n  IV. Disc-shaped stacked cisternae in Golgi apparatus\nChoose the correct option:",
    options: {
      A: "A-III, B-IV, C-I, D-II",
      B: "A-II, B-IV, C-I, D-III",
      C: "A-II, B-IV, C-III, D-I",
      D: "A-IV, B-III, C-I, D-II"
    },
    correctAnswer: "B",
    explanation: "Structural components:\n- Cristae $\\to$ Inner mitochondrial infoldings (A-II)\n- Cisternae $\\to$ Golgi apparatus sacs (B-IV)\n- Thylakoids $\\to$ Flattened chloroplast stroma sacs (C-I)\n- Phospholipids $\\to$ Cell membrane bilayer (D-III)\nCorrect match: A-II, B-IV, C-I, D-III.",
    topic: "Cell: The Unit of Life - Organelles Morphology",
    difficulty: "Medium",
    image: null
  },
  {
    id: 27,
    number: 27,
    subject: "Botany",
    text: "The specific plastids that synthesize and store fat-soluble carotenoid pigments such as carotene and xanthophyll are called:",
    options: {
      A: "Chloroplasts",
      B: "Chromoplasts",
      C: "Aleuroplasts",
      D: "Amyloplasts"
    },
    correctAnswer: "B",
    explanation: "**Chromoplasts** contain fat-soluble carotenoid pigments like carotene, xanthophylls, and others, giving plant parts (petals, fruits) yellow, orange, or red color. (Aleuroplasts store proteins, amyloplasts store starch).",
    topic: "Cell: The Unit of Life - Plastid Types",
    difficulty: "Easy",
    image: null
  },
  {
    id: 28,
    number: 28,
    subject: "Botany",
    text: "The Endomembrane System of a eukaryotic cell comprises which of the following group of coordinated organelles?",
    options: {
      A: "Endoplasmic reticulum, Golgi complex, Lysosomes, and Vacuoles",
      B: "Endoplasmic reticulum, Chloroplasts, Peroxisomes, and Vacuoles",
      C: "Mitochondria, Chloroplasts, Peroxisomes, and Vacuoles",
      D: "Golgi complex, Chloroplasts, Peroxisomes, and Vacuoles"
    },
    correctAnswer: "A",
    explanation: "While each organelle is structurally and functionally distinct, the **Endoplasmic Reticulum, Golgi complex, Lysosomes, and Vacuoles** are grouped together as the endomembrane system because their functions are closely coordinated. Mitochondria, chloroplasts, and peroxisomes are not part of the endomembrane system.",
    topic: "Cell: The Unit of Life - Endomembrane System",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 29,
    number: 29,
    subject: "Botany",
    text: "Smooth Endoplasmic Reticulum (SER) is primarily specialized as the major cellular site for:",
    options: {
      A: "attachment of $80S$ ribosomes for active protein translation.",
      B: "synthesis of lipids and steroid hormones.",
      C: "hydrolytic digestion of cellular macromolecules.",
      D: "photosynthetic carbon fixation and carbohydrate synthesis."
    },
    correctAnswer: "B",
    explanation: "Smooth endoplasmic reticulum (SER) is devoid of ribosomes on its surface and acts as the primary site for the synthesis of lipids. In animal cells, lipid-like steroidal hormones are synthesized in SER.",
    topic: "Cell: The Unit of Life - Endoplasmic Reticulum Functions",
    difficulty: "Easy",
    image: null
  },
  {
    id: 30,
    number: 30,
    subject: "Botany",
    text: "Select the CORRECT statements regarding the plasma membrane in eukaryotic cells:\nA. The membrane of human erythrocytes (RBCs) has approximately $52\\%$ protein and $40\\%$ lipids.\nB. Phospholipids are arranged in a continuous bilayer with hydrophobic tails directed inward.\nC. Tubular extensions of the plasma membrane called mesosomes are present.\nD. Non-polar hydrophobic tails of saturated hydrocarbons are shielded from aqueous surroundings.\nE. A thick protective glycocalyx coat is present on the outer surface of all eukaryotic membranes.\nChoose the correct option:",
    options: {
      A: "C, D and E only",
      B: "B, C and E only",
      C: "A, B and D only",
      D: "A, C and E only"
    },
    correctAnswer: "C",
    explanation: "Statements A, B, and D are correct. Mesosomes (C) and Glycocalyx (E) are characteristic structural features of prokaryotic bacterial cell envelopes, not general eukaryotic cells.",
    topic: "Cell: The Unit of Life - Fluid Mosaic Membrane Model",
    difficulty: "Medium",
    image: null
  },
  {
    id: 31,
    number: 31,
    subject: "Botany",
    text: "Match List I with List II regarding phases of the eukaryotic Cell Cycle:\n- List I (Phase):\n  A. $G_1$ phase\n  B. $S$ phase\n  C. $G_2$ phase\n  D. $M$ phase\n- List II (Key Cellular Event):\n  I. Equational division (Mitosis) where chromosomes separate\n  II. Cell is metabolically active and continuously grows without DNA replication\n  III. DNA replication occurs and DNA content per cell doubles ($2C \\to 4C$)\n  IV. Synthesis of proteins continues in preparation for mitosis while cell growth proceeds\nChoose the correct option:",
    options: {
      A: "A-IV, B-I, C-II, D-III",
      B: "A-I, B-II, C-III, D-IV",
      C: "A-III, B-IV, C-I, D-II",
      D: "A-II, B-III, C-IV, D-I"
    },
    correctAnswer: "D",
    explanation: "Cell cycle events:\n- $G_1$ phase $\\to$ Metabolically active, continuous cell growth, no DNA replication (II).\n- $S$ phase $\\to$ Synthesis phase, DNA replication doubles from $2C$ to $4C$ (III).\n- $G_2$ phase $\\to$ Proteins synthesized in preparation for mitosis (IV).\n- $M$ phase $\\to$ Mitotic karyokinesis and cytokinesis (I).\nCorrect match: A-II, B-III, C-IV, D-I.",
    topic: "Cell Cycle and Cell Division - Interphase and M Phase",
    difficulty: "Medium",
    image: null
  },
  {
    id: 32,
    number: 32,
    subject: "Botany",
    text: "The correct sequence of phases in the standard eukaryotic cell cycle is:",
    options: {
      A: "$G_1 \\to G_2 \\to S \\to M$",
      B: "$G_1 \\to M \\to G_2 \\to S$",
      C: "$G_1 \\to S \\to G_2 \\to M$",
      D: "$S \\to M \\to G_2 \\to G_1$"
    },
    correctAnswer: "C",
    explanation: "The eukaryotic cell cycle sequentially progresses from Gap 1 ($G_1$) $\\to$ Synthesis ($S$) $\\to$ Gap 2 ($G_2$) $\\to$ Mitosis ($M$), followed by Cytokinesis.",
    topic: "Cell Cycle and Cell Division - Cell Cycle Progression",
    difficulty: "Easy",
    image: null
  },

  // --- BIOMOLECULES ---
  {
    id: 33,
    number: 33,
    subject: "Zoology",
    text: "An $\\alpha$-helix is a prominent secondary conformational motif found in which level of protein structure?",
    options: {
      A: "Secondary structure",
      B: "Tertiary structure",
      C: "Primary structure",
      D: "Quaternary structure"
    },
    correctAnswer: "A",
    explanation: "The $\\alpha$-helix and $\\beta$-pleated sheet are fundamental conformations of the **Secondary structure** of proteins, stabilized by regular intramolecular hydrogen bonds between peptide amide groups.",
    topic: "Biomolecules - Protein Structural Levels",
    difficulty: "Easy",
    image: null
  },
  {
    id: 34,
    number: 34,
    subject: "Zoology",
    text: "Which of the following statements are CORRECT regarding the packaging of DNA helix in chromatin?\nA. Histones are organized to form a core unit of eight protein molecules called a histone octamer.\nB. Histones are negatively charged basic proteins.\nC. Histones are rich in basic amino acid residues - lysine and arginine.\nD. Positively charged DNA is wrapped around the negatively charged histone octamer.\nE. Packaging of chromatin at higher levels requires non-histone chromosomal (NHC) proteins.\nChoose the correct option:",
    options: {
      A: "A, C and E only",
      B: "B, D and E only",
      C: "C, D and E only",
      D: "A, B and D only"
    },
    correctAnswer: "A",
    explanation: "Histones are **positively charged** basic proteins rich in lysine and arginine. Negatively charged DNA wraps around the positive histone octamer to form a nucleosome. Statements A, C, and E are correct.",
    topic: "Biomolecules & Cell - DNA Packaging & Nucleosome",
    difficulty: "Medium",
    image: null
  },
  {
    id: 35,
    number: 35,
    subject: "Zoology",
    text: "Identify the CORRECT statements about biomolecules:\nA. Lipids are generally water-soluble polymers.\nB. Proteins are heteropolymers of amino acids linked by peptide bonds.\nC. Polysaccharides are long polymeric chains of monosaccharide sugars.\nD. Adenine and guanine are substituted single-ring pyrimidines.\nE. Almost all enzymes are catalytic proteins.\nChoose the correct option:",
    options: {
      A: "B, D and E only",
      B: "B, C and E only",
      C: "A, B and C only",
      D: "C, D and E only"
    },
    correctAnswer: "B",
    explanation: "Statements B, C, and E are correct. Lipids are water-insoluble non-polymers (A is false); Adenine and Guanine are double-ring **purines**, not pyrimidines (D is false).",
    topic: "Biomolecules - Classes of Macromolecules",
    difficulty: "Medium",
    image: null
  },
  {
    id: 36,
    number: 36,
    subject: "Zoology",
    text: "Which of the following statements are CORRECT regarding amino acids?\nA. They are organic compounds containing an amino group and an acidic group on the $\\alpha$-carbon (substituted methanes).\nB. Serine is an aromatic amino acid.\nC. Valine is a neutral aliphatic amino acid.\nD. Lysine is an acidic dicarboxylic amino acid.\nChoose the correct option:",
    options: {
      A: "C and D only",
      B: "B and C only",
      C: "A and C only",
      D: "A and B only"
    },
    correctAnswer: "C",
    explanation: "Statements A and C are correct. Serine is a hydroxy/alcoholic amino acid (not aromatic; aromatic amino acids are tyrosine, phenylalanine, tryptophan). Lysine is a **basic** amino acid (glutamic acid and aspartic acid are acidic).",
    topic: "Biomolecules - Amino Acid Classification",
    difficulty: "Medium",
    image: null
  },
  {
    id: 37,
    number: 37,
    subject: "Zoology",
    text: "Match List I with List II regarding secondary metabolites and cellular macromolecules:\n- List I (Biomolecule):\n  A. Trypsin\n  B. Morphine\n  C. Concanavalin A\n  D. Collagen\n- List II (Category / Function):\n  I. Intercellular ground substance protein\n  II. Lectin\n  III. Proteolytic enzyme\n  IV. Alkaloid secondary metabolite\nChoose the correct option:",
    options: {
      A: "A-III, B-IV, C-II, D-I",
      B: "A-I, B-II, C-III, D-IV",
      C: "A-IV, B-III, C-II, D-I",
      D: "A-III, B-II, C-IV, D-I"
    },
    correctAnswer: "A",
    explanation: "Biomolecule categories:\n- Trypsin $\\to$ Proteolytic enzyme (A-III)\n- Morphine $\\to$ Alkaloid (B-IV)\n- Concanavalin A $\\to$ Lectin (C-II)\n- Collagen $\\to$ Intercellular ground substance protein (D-I)\nCorrect match: A-III, B-IV, C-II, D-I.",
    topic: "Biomolecules - Secondary Metabolites & Proteins",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 38,
    number: 38,
    subject: "Zoology",
    text: "The following biochemical reaction depicts the catalytic action of a specific class of enzymes:\n$$\\begin{array}{cc} \\text{X} & \\text{Y} \\\\ | & | \\\\ \\text{C} & - \\text{C} \\end{array} \\xrightarrow{\\text{E}} \\text{X}-\\text{Y} + \\text{C}=\\text{C}$$\nIdentify the enzyme class 'E' from the options below:",
    options: {
      A: "Transferases",
      B: "Isomerases",
      C: "Lyases",
      D: "Ligases"
    },
    correctAnswer: "C",
    explanation: "**Lyases** are enzymes that catalyze the cleavage and removal of chemical groups from substrates by mechanisms other than hydrolysis, leaving double bonds behind in the product.",
    topic: "Biomolecules - Enzyme Classification & Mechanisms",
    difficulty: "Medium",
    image: null
  },
  {
    id: 39,
    number: 39,
    subject: "Zoology",
    text: "Match List I with List II regarding biomacromolecules and their biological roles:\n- List I:\n  A. Starch\n  B. Antibody\n  C. Concanavalin A\n  D. GLUT-4\n- List II:\n  I. Fights infectious pathogens\n  II. Storage homopolysaccharide of glucose in plants\n  III. Enables insulin-dependent glucose transport into cells\n  IV. Plant lectin carbohydrate-binding protein\nChoose the correct option:",
    options: {
      A: "A-I, B-II, C-IV, D-III",
      B: "A-II, B-I, C-IV, D-III",
      C: "A-II, B-I, C-III, D-IV",
      D: "A-I, B-II, C-III, D-IV"
    },
    correctAnswer: "B",
    explanation: "Macromolecule roles:\n- Starch $\\to$ Plant energy storage polysaccharide (A-II)\n- Antibody $\\to$ Immune defense against infections (B-I)\n- Concanavalin A $\\to$ Plant lectin (C-IV)\n- GLUT-4 $\\to$ Facilitates glucose transport into cells (D-III)\nCorrect match: A-II, B-I, C-IV, D-III.",
    topic: "Biomolecules - Proteins & Carbohydrates",
    difficulty: "Medium",
    image: null
  },
  {
    id: 40,
    number: 40,
    subject: "Zoology",
    text: "Arrange the following chemical elements in DESCENDING order of their percentage contribution to the total weight of the human body:\n(a) Oxygen\n(b) Carbon\n(c) Hydrogen\n(d) Nitrogen\nChoose the correct option:",
    options: {
      A: "(a) > (b) > (d) > (c)",
      B: "(c) > (a) > (b) > (d)",
      C: "(b) > (c) > (d) > (a)",
      D: "(b) > (a) > (c) > (d)"
    },
    correctAnswer: "A",
    explanation: "Elemental composition of the human body by weight:\n- Oxygen (a): $\\approx 65.0\\%$\n- Carbon (b): $\\approx 18.5\\%$\n- Nitrogen (d): $\\approx 3.3\\%$\n- Hydrogen (c): $\\approx 0.5\\%$\nDescending order: $\\text{Oxygen (a)} > \\text{Carbon (b)} > \\text{Nitrogen (d)} > \\text{Hydrogen (c)}$.",
    topic: "Biomolecules - Elemental Analysis of Living Tissue",
    difficulty: "Medium-Hard",
    image: null
  },

  // --- HUMAN PHYSIOLOGY ---
  {
    id: 41,
    number: 41,
    subject: "Zoology",
    text: "In humans, the physiological process of respiration occurs in specific sequential steps. Arrange the following steps in the CORRECT order:\nA. Diffusion of $\\text{O}_2$ and $\\text{CO}_2$ between blood and tissues\nB. Diffusion of gases ($\\text{O}_2$ and $\\text{CO}_2$) across alveolar membrane\nC. Pulmonary ventilation (breathing) by which atmospheric air is drawn in and $\\text{CO}_2$-rich alveolar air is released\nD. Cellular respiration (utilization of $\\text{O}_2$ by cells for catabolic reactions)\nE. Transport of respiratory gases by blood\nChoose the correct sequence:",
    options: {
      A: "A $\\to$ B $\\to$ C $\\to$ D $\\to$ E",
      B: "E $\\to$ A $\\to$ C $\\to$ D $\\to$ B",
      C: "C $\\to$ B $\\to$ E $\\to$ A $\\to$ D",
      D: "C $\\to$ A $\\to$ B $\\to$ E $\\to$ D"
    },
    correctAnswer: "C",
    explanation: "The correct physiological sequence of respiration in humans is:\n1. Pulmonary ventilation (C)\n2. Alveolar gas diffusion (B)\n3. Transport of gases by blood (E)\n4. Diffusion between blood and tissues (A)\n5. Cellular respiration (D).\nCorrect order: C $\\to$ B $\\to$ E $\\to$ A $\\to$ D.",
    topic: "Breathing and Exchange of Gases - Steps of Respiration",
    difficulty: "Medium",
    image: null
  },
  {
    id: 42,
    number: 42,
    subject: "Zoology",
    text: "Match List I with List II regarding human pulmonary respiratory volumes:\n- List I (Respiratory Volume):\n  A. ERV (Expiratory Reserve Volume)\n  B. RV (Residual Volume)\n  C. IRV (Inspiratory Reserve Volume)\n  D. TV (Tidal Volume)\n- List II (Volume in mL):\n  I. $2500 - 3000\\text{ mL}$\n  II. $500\\text{ mL}$\n  III. $1000 - 1100\\text{ mL}$\n  IV. $1100 - 1200\\text{ mL}$\nChoose the correct option:",
    options: {
      A: "A-III, B-IV, C-I, D-II",
      B: "A-III, B-I, C-IV, D-II",
      C: "A-I, B-III, C-II, D-IV",
      D: "A-I, B-II, C-III, D-IV"
    },
    correctAnswer: "A",
    explanation: "Standard spirometry respiratory volumes:\n- ERV $\\to 1000 - 1100\\text{ mL}$ (A-III)\n- RV $\\to 1100 - 1200\\text{ mL}$ (B-IV)\n- IRV $\\to 2500 - 3000\\text{ mL}$ (C-I)\n- TV $\\to 500\\text{ mL}$ (D-II)\nCorrect match: A-III, B-IV, C-I, D-II.",
    topic: "Breathing and Exchange of Gases - Respiratory Volumes & Capacities",
    difficulty: "Easy-Medium",
    image: null
  },
  {
    id: 43,
    number: 43,
    subject: "Zoology",
    text: "The total WBC count of a healthy person's blood sample is $8000\\text{ / mm}^3$. What are the expected counts of eosinophils and lymphocytes in this sample respectively?",
    options: {
      A: "$300 - 500\\text{ / mm}^3\\text{ and } 1200 - 1500\\text{ / mm}^3$",
      B: "$160 - 240\\text{ / mm}^3\\text{ and } 1600 - 2000\\text{ / mm}^3$",
      C: "$300 - 500\\text{ / mm}^3\\text{ and } 500 - 700\\text{ / mm}^3$",
      D: "$100 - 120\\text{ / mm}^3\\text{ and } 160 - 200\\text{ / mm}^3$"
    },
    correctAnswer: "B",
    explanation: "In normal human blood:\n- Eosinophils account for $2 - 3\\%$ of total WBCs: $2\\% \\text{ to } 3\\% \\text{ of } 8000 = 160 - 240\\text{ / mm}^3$.\n- Lymphocytes account for $20 - 25\\%$ of total WBCs: $20\\% \\text{ to } 25\\% \\text{ of } 8000 = 1600 - 2000\\text{ / mm}^3$.",
    topic: "Body Fluids and Circulation - Formed Elements of Blood",
    difficulty: "Medium",
    image: null
  },
  {
    id: 44,
    number: 44,
    subject: "Zoology",
    text: "The number of electrical action potentials generated per minute by the Sino-Atrial Node (SAN) in a resting healthy human heart is:",
    options: {
      A: "$28 - 30$",
      B: "$70 - 75$",
      C: "$100 - 110$",
      D: "$120 - 140$"
    },
    correctAnswer: "B",
    explanation: "The Sino-Atrial Node (SAN) generates the maximum number of action potentials, i.e., $70 - 75\\text{ min}^{-1}$, and is responsible for initiating and maintaining the rhythmic contractile activity of the heart. Hence, it is called the pacemaker.",
    topic: "Body Fluids and Circulation - Cardiac Conduction & Pacemaker",
    difficulty: "Easy",
    image: null
  },
  {
    id: 45,
    number: 45,
    subject: "Zoology",
    text: "The atrioventricular opening between the right atrium and the right ventricle of the human heart is guarded by the:",
    options: {
      A: "Bicuspid (Mitral) valve",
      B: "Tricuspid valve",
      C: "Aortic semilunar valve",
      D: "Eustachian valve"
    },
    correctAnswer: "B",
    explanation: "The opening between the right atrium and right ventricle is guarded by a valve formed of three muscular flaps or cusps, the **tricuspid valve**, whereas a bicuspid or mitral valve guards the opening between the left atrium and the left ventricle.",
    topic: "Body Fluids and Circulation - Human Heart Valves",
    difficulty: "Easy",
    image: null
  },
  {
    id: 46,
    number: 46,
    subject: "Zoology",
    text: "Arrange the following physiological events occurring in the Renin-Angiotensin-Aldosterone System (RAAS) in the CORRECT functional order:\nA. Increase in systemic blood pressure and Glomerular Filtration Rate (GFR)\nB. Reabsorption of $\\text{Na}^+$ and water from distal parts of the renal tubule stimulated by aldosterone\nC. Fall in renal blood flow / Glomerular Filtration Rate (GFR)\nD. Vasoconstriction of arterioles by Angiotensin II and stimulation of adrenal cortex to release aldosterone\nE. Juxtaglomerular (JG) cells release renin, which converts angiotensinogen into Angiotensin I, then to Angiotensin II\nChoose the correct option:",
    options: {
      A: "A $\\to$ C $\\to$ E $\\to$ B $\\to$ D",
      B: "C $\\to$ A $\\to$ B $\\to$ D $\\to$ E",
      C: "A $\\to$ D $\\to$ B $\\to$ E $\\to$ C",
      D: "C $\\to$ E $\\to$ D $\\to$ B $\\to$ A"
    },
    correctAnswer: "D",
    explanation: "RAAS sequence:\n1. A fall in GFR/blood pressure activates JG cells (C)\n2. Renin converts angiotensinogen $\\to$ Angiotensin I $\\to$ Angiotensin II (E)\n3. Angiotensin II causes vasoconstriction and triggers aldosterone release (D)\n4. Aldosterone promotes $\\text{Na}^+$ and $\\text{H}_2\\text{O}$ reabsorption in DCT (B)\n5. Blood pressure and GFR increase back to normal (A).\nOrder: C $\\to$ E $\\to$ D $\\to$ B $\\to$ A.",
    topic: "Excretory Products and Their Elimination - Regulation of Kidney Function (RAAS)",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 47,
    number: 47,
    subject: "Zoology",
    text: "The Juxtaglomerular Apparatus (JGA) is a specialized microscopic regulatory structure formed by cellular modifications in:",
    options: {
      A: "Distal convoluted tubule (DCT) and efferent renal arteriole",
      B: "Proximal convoluted tubule (PCT) and efferent renal arteriole",
      C: "Proximal convoluted tubule (PCT) and afferent renal arteriole",
      D: "Distal convoluted tubule (DCT) and afferent renal arteriole"
    },
    correctAnswer: "D",
    explanation: "JGA is a specialized sensitive region formed by cellular modifications in the **distal convoluted tubule (macula densa)** and the **afferent arteriole (JG cells)** at the location of their physical contact.",
    topic: "Excretory Products and Their Elimination - JGA Structure",
    difficulty: "Medium",
    image: null
  },
  {
    id: 48,
    number: 48,
    subject: "Zoology",
    text: "Which of the following statements regarding tubular reabsorption in the Loop of Henle are CORRECT?\n(a) The descending limb of the Loop of Henle is permeable to water but almost impermeable to electrolytes.\n(b) The medullary interstitial gradient causes the filtrate to become concentrated as it moves down the descending limb.\n(c) The ascending limb is permeable to water and impermeable to electrolytes.\n(d) Active or passive transport of electrolytes ($\\text{NaCl}$) occurs in the ascending limb of Henle's loop.\nChoose the correct option:",
    options: {
      A: "(a) and (b) only",
      B: "(b), (c) and (d) only",
      C: "(a), (b) and (c) only",
      D: "(a), (b) and (d) only"
    },
    correctAnswer: "D",
    explanation: "Statements (a), (b), and (d) are correct. Statement (c) is false because the **ascending limb is impermeable to water** and allows transport of electrolytes actively or passively into the medullary interstitium.",
    topic: "Excretory Products and Their Elimination - Loop of Henle Reabsorption",
    difficulty: "Medium-Hard",
    image: null
  },
  {
    id: 49,
    number: 49,
    subject: "Zoology",
    text: "Choose the CORRECT statements regarding the mechanism of skeletal muscle contraction:\nA. A motor neuron delivers a neural impulse from the CNS to the sarcolemma via the neuromuscular junction.\nB. The action potential spreads through the sarcolemma and triggers the release of $\\text{Ca}^{2+}$ ions from the sarcoplasmic reticulum into the sarcoplasm.\nC. Increase in $\\text{Ca}^{2+}$ binds to troponin on actin filaments, removing the masking of active sites for myosin.\nD. Myosin heads bind to exposed active sites on actin to form cross-bridges.\nE. Shortening of sarcomere occurs as actin filaments are pulled toward the centre of the 'A' band.\nChoose the correct option:",
    options: {
      A: "C and D only",
      B: "A and B only",
      C: "C and E only",
      D: "A, B, C, D and E"
    },
    correctAnswer: "D",
    explanation: "All statements A, B, C, D, and E are scientifically accurate descriptions of the sliding filament theory of skeletal muscle contraction mediated by acetylcholine, $\\text{Ca}^{2+}$, troponin, and actin-myosin cross-bridge cycling.",
    topic: "Locomotion and Movement - Sliding Filament Theory",
    difficulty: "Medium",
    image: null
  },
  {
    id: 50,
    number: 50,
    subject: "Zoology",
    text: "The correct anatomical sequence of the human vertebral column regions from HEAD to TOE is:",
    options: {
      A: "Cervical vertebra $\\to$ Thoracic vertebra $\\to$ Sacrum $\\to$ Lumbar vertebra",
      B: "Sacrum $\\to$ Lumbar vertebra $\\to$ Thoracic vertebra $\\to$ Cervical vertebra",
      C: "Cervical vertebra $\\to$ Lumbar vertebra $\\to$ Thoracic vertebra $\\to$ Sacrum",
      D: "Cervical vertebra $\\to$ Thoracic vertebra $\\to$ Lumbar vertebra $\\to$ Sacrum $\\to$ Coccyx"
    },
    correctAnswer: "D",
    explanation: "The human vertebral column is formed by 26 vertebrae arranged cranio-caudally (head to toe):\n$$\\text{Cervical (7)} \\to \\text{Thoracic (12)} \\to \\text{Lumbar (5)} \\to \\text{Sacrum (1 fused)} \\to \\text{Coccyx (1 fused)}.$$",
    topic: "Locomotion and Movement - Vertebral Column Anatomy",
    difficulty: "Easy",
    image: null
  }
];
