/**
 * NEET 2027 Comprehensive Mock Test: Work, Energy and Power
 * 60 High-Yield Questions with Verified Diagrams & Solutions
 * Duration: 120 Minutes (2 Hours) | Marking: +4 / -1 / 0
 */

export const NEET_WEP_TEST = {
  "id": "neet-work-energy-power",
  "title": "NEET 2027: Work, Energy and Power (Full Chapter Drill)",
  "subtitle": "60 Hard NEET-Level Questions \u00b7 2 Hours Timed CBT Examination",
  "subject": "Physics (Class 11)",
  "durationMinutes": 120,
  "totalQuestions": 60,
  "totalMarks": 240,
  "marksCorrect": 4,
  "marksWrong": -1,
  "syllabus": "Work Done by Constant & Variable Force, Work-Energy Theorem, Kinetic & Potential Energy, Conservative & Non-Conservative Forces, Power, Vertical Circular Motion, Spring Dynamics & Systems"
};

export const NEET_WEP_QUESTIONS = [
  {
    "id": 1,
    "number": 1,
    "text": "If we throw a body upwards with velocity of 4 m/s, at what height does its kinetic energy reduce to half of the initial value? (Take g = 10 m s\u207b\u00b2)",
    "options": {
      "A": "4 m",
      "B": "2 m",
      "C": "1 m",
      "D": "0.4 m"
    },
    "correctAnswer": "D",
    "explanation": "Initial KE = (1/2)mv\u00b2 = (1/2)m(16) = 8m. When KE is halved, KE = 4m. By conservation of mechanical energy: Loss in KE = Gain in PE => 8m - 4m = mgh => 4m = m(10)h => h = 4/10 = 0.4 m.",
    "topic": "Conservation of Energy",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 2,
    "number": 2,
    "text": "A force F acting on the object varies with distance x as shown. The force is in N and x in m. The work done by the force in moving the object from x = 0 to x = 6 m is:\n\n(F is constant at 3 N from x = 0 to x = 3 m, then decreases linearly from 3 N at x = 3 m to 0 N at x = 6 m)",
    "options": {
      "A": "18.0 J",
      "B": "13.5 J",
      "C": "9.0 J",
      "D": "4.5 J"
    },
    "correctAnswer": "B",
    "explanation": "Work done = Area under F-x graph from x = 0 to 6 m. Area = Rectangle (0 to 3) + Triangle (3 to 6) = (3 * 3) + (1/2 * 3 * 3) = 9 + 4.5 = 13.5 J.",
    "topic": "Work Done by Variable Force",
    "difficulty": "Medium",
    "image": "/questions/wep/q2_force_graph.png"
  },
  {
    "id": 3,
    "number": 3,
    "text": "Which of the following units is a unit of power?",
    "options": {
      "A": "Kilowatt hour",
      "B": "Watt",
      "C": "Erg",
      "D": "Calorie"
    },
    "correctAnswer": "B",
    "explanation": "Watt (J/s) is the SI unit of power. Kilowatt hour, Erg, and Calorie are units of energy/work.",
    "topic": "Power & Units",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 4,
    "number": 4,
    "text": "A mass m is attached to a thin wire and whirled in a vertical circle. The wire is most likely to break when:",
    "options": {
      "A": "the wire is horizontal.",
      "B": "the mass is at the lowest point.",
      "C": "inclined at an angle of 60\u00b0 from vertical.",
      "D": "the mass is at the highest point."
    },
    "correctAnswer": "B",
    "explanation": "In vertical circular motion, tension in string is maximum at the lowest point: T_bottom = mg + mv\u00b2/R. Hence it is most likely to break at the lowest point.",
    "topic": "Vertical Circular Motion",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 5,
    "number": 5,
    "text": "The kinetic energy of a light body and a heavy body is same. Which one of the following statements is CORRECT?",
    "options": {
      "A": "Body having higher velocity has greater momentum",
      "B": "The heavier body has greater momentum",
      "C": "Both bodies have same momentum",
      "D": "The lighter body has greater momentum"
    },
    "correctAnswer": "B",
    "explanation": "Momentum p = \u221a(2m * KE). Since KE is the same, p \u221d \u221am. The heavier body (larger mass m) has greater momentum.",
    "topic": "Kinetic Energy and Momentum",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 6,
    "number": 6,
    "text": "Assertion: No work is done if the displacement is zero.\nReason: Work done by the force is defined to be the product of component of the force in the direction of the displacement and the magnitude of displacement.",
    "options": {
      "A": "Assertion is True, Reason is True; Reason is correct explanation for Assertion",
      "B": "Assertion is True, Reason is True; Reason is not correct explanation for Assertion",
      "C": "Assertion is True, Reason is False",
      "D": "Assertion is False, Reason is True"
    },
    "correctAnswer": "A",
    "explanation": "Work W = F * d * cos(\u03b8). If displacement d = 0, work done is zero. Reason correctly defines work.",
    "topic": "Work Definition",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 7,
    "number": 7,
    "text": "A mass of 0.5 kg moving with a speed of 1.5 m/s on a horizontal smooth surface, collides with a nearly weightless spring of force constant k = 50 N/m. The maximum compression of the spring would be:",
    "options": {
      "A": "0.12 m",
      "B": "1.5 m",
      "C": "0.5 m",
      "D": "0.15 m"
    },
    "correctAnswer": "D",
    "explanation": "By conservation of energy: (1/2)mv\u00b2 = (1/2)kx\u00b2 => 0.5 * (1.5)\u00b2 = 50 * x\u00b2 => 0.5 * 2.25 = 50 * x\u00b2 => 1.125 / 50 = x\u00b2 => x\u00b2 = 0.0225 => x = 0.15 m.",
    "topic": "Spring Potential Energy",
    "difficulty": "Hard",
    "image": "/questions/wep/q7_spring_collision.png"
  },
  {
    "id": 8,
    "number": 8,
    "text": "Force F = kx (where k is a positive constant) is acting on a particle. Work done by this force in Column I in different situations is to be matched with Column II:\n\nColumn I:\n(I) Work done in displacing body from x = 2 to x = 4\n(II) Work done in displacing body from x = -4 to x = -2\n(III) Work done in displacing body from x = -2 to x = +2\n\nColumn II:\n(P) Negative\n(Q) Positive\n(R) Zero",
    "options": {
      "A": "I\u2192Q, II\u2192R, III\u2192P",
      "B": "I\u2192Q, II\u2192P, III\u2192R",
      "C": "I\u2192P, II\u2192Q, III\u2192R",
      "D": "I\u2192R, II\u2192Q, III\u2192P"
    },
    "correctAnswer": "B",
    "explanation": "W = \u222b F dx = \u222b kx dx = (k/2)(x_f\u00b2 - x_i\u00b2). For (I): (k/2)(16 - 4) = +6k (Positive -> Q). For (II): (k/2)(4 - 16) = -6k (Negative -> P). For (III): (k/2)(4 - 4) = 0 (Zero -> R). Hence B is correct.",
    "topic": "Work by Variable Force",
    "difficulty": "Hard",
    "image": "/questions/wep/q8_column_match.png"
  },
  {
    "id": 9,
    "number": 9,
    "text": "A force F = (3x\u00b2 + 2x - 7) N acts on a 2 kg body as a result of which the body gets displaced from x = 0 to x = 5 m. The work done by the force will be:",
    "options": {
      "A": "35 J",
      "B": "70 J",
      "C": "115 J",
      "D": "270 J"
    },
    "correctAnswer": "C",
    "explanation": "W = \u222b\u2080\u2075 (3x\u00b2 + 2x - 7) dx = [x\u00b3 + x\u00b2 - 7x]\u2080\u2075 = (125 + 25 - 35) - 0 = 115 J.",
    "topic": "Integration Work",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 10,
    "number": 10,
    "text": "A body of mass m kg is lifted by a man to a height of one metre in 30 sec. Another man lifts the same mass to the same height in 60 sec. The work done by them are in the ratio:",
    "options": {
      "A": "1 : 2",
      "B": "1 : 1",
      "C": "2 : 1",
      "D": "4 : 1"
    },
    "correctAnswer": "B",
    "explanation": "Work done against gravity depends only on m, g, and h: W = mgh. It is independent of the time taken. Hence the ratio of work done is 1 : 1.",
    "topic": "Work vs Power",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 11,
    "number": 11,
    "text": "A uniform chain of length L and mass M is lying on a smooth table and one third of its length is hanging vertically down over the edge of the table. If g is acceleration due to gravity, the work required to pull the hanging part on the table is:",
    "options": {
      "A": "MgL",
      "B": "MgL/3",
      "C": "MgL/9",
      "D": "MgL/18"
    },
    "correctAnswer": "D",
    "explanation": "Mass of hanging part = M/3. Center of mass of hanging part is at distance (L/3)/2 = L/6 below the table edge. Work done = m_hang * g * h_cm = (M/3) * g * (L/6) = MgL/18.",
    "topic": "Work on Chain / Extended Bodies",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 12,
    "number": 12,
    "text": "In which case does the potential energy decrease?",
    "options": {
      "A": "On compressing a spring",
      "B": "On stretching a spring",
      "C": "On moving a body against gravitational force",
      "D": "In free fall of body"
    },
    "correctAnswer": "D",
    "explanation": "During free fall, height h decreases, so gravitational potential energy U = mgh decreases (converting into kinetic energy).",
    "topic": "Potential Energy",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 13,
    "number": 13,
    "text": "A body of mass 1 kg begins to move under the action of a time dependent force F = (2t i\u0302 + 3t\u00b2 j\u0302) N, where i\u0302 and j\u0302 are unit vectors along X and Y-axis. What power will be developed by the force at time (t)?",
    "options": {
      "A": "(2t\u00b2 + 4t\u00b2) W",
      "B": "(2t\u00b3 + 3t\u2074) W",
      "C": "(2t\u00b3 + 3t\u2075) W",
      "D": "(2t + 3t\u00b3) W"
    },
    "correctAnswer": "C",
    "explanation": "a = F/m = (2t i\u0302 + 3t\u00b2 j\u0302). Velocity v = \u222b a dt = (t\u00b2 i\u0302 + t\u00b3 j\u0302). Instantaneous Power P = F \u00b7 v = (2t)(t\u00b2) + (3t\u00b2)(t\u00b3) = 2t\u00b3 + 3t\u2075 W.",
    "topic": "Instantaneous Power",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 14,
    "number": 14,
    "text": "A force of (2i\u0302 + 3j\u0302 + 4k\u0302) N acts on a body for 4 seconds, produces a displacement of (3i\u0302 + 4j\u0302 + 5k\u0302) m. The power used is:",
    "options": {
      "A": "9.5 W",
      "B": "7.5 W",
      "C": "6.5 W",
      "D": "4.5 W"
    },
    "correctAnswer": "A",
    "explanation": "Work W = F \u00b7 d = (2*3 + 3*4 + 4*5) = 6 + 12 + 20 = 38 J. Average power P = W/t = 38 / 4 = 9.5 W.",
    "topic": "Dot Product and Power",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 15,
    "number": 15,
    "text": "Two masses of 1 g and 4 g are moving with equal kinetic energy. The ratio of the magnitudes of their momenta is:",
    "options": {
      "A": "4 : 1",
      "B": "\u221a2 : 1",
      "C": "1 : 2",
      "D": "1 : 16"
    },
    "correctAnswer": "C",
    "explanation": "p = \u221a(2m * KE). Since KE is equal, p\u2081/p\u2082 = \u221a(m\u2081/m\u2082) = \u221a(1/4) = 1/2.",
    "topic": "Momentum and Energy",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 16,
    "number": 16,
    "text": "The graph between kinetic energy E_k and velocity V is:",
    "options": {
      "A": "Parabola opening upwards with vertex at origin (E_k \u221d V\u00b2)",
      "B": "Straight line passing through origin",
      "C": "Downward sloping straight line",
      "D": "Rectangular hyperbola"
    },
    "correctAnswer": "A",
    "explanation": "E_k = (1/2)mV\u00b2. Since E_k is directly proportional to V\u00b2, the graph is a parabola symmetric about the E_k axis opening upwards.",
    "topic": "Graphs in Mechanics",
    "difficulty": "Easy",
    "image": "/questions/wep/q16_ke_graphs.png"
  },
  {
    "id": 17,
    "number": 17,
    "text": "A point mass m is moved in a vertical circle of radius r with the help of a string. The velocity of the mass is \u221a(7gr) at the lowest point. The tension in the string at the lowest point is:",
    "options": {
      "A": "6 mg",
      "B": "7 mg",
      "C": "8 mg",
      "D": "1 mg"
    },
    "correctAnswer": "C",
    "explanation": "T_bottom = mg + mv\u00b2/r = mg + m(7gr)/r = mg + 7mg = 8 mg.",
    "topic": "Vertical Circle Dynamics",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 18,
    "number": 18,
    "text": "A force F acting on an object varies with distance x linearly: F = 20 N at x = 0, decreasing linearly to 0 at x = 4 m, and reaches -20 N at x = 8 m. The work done by the force in moving the object from x = 0 to x = 8 m is:",
    "options": {
      "A": "Zero",
      "B": "80 J",
      "C": "-40 J",
      "D": "40 J"
    },
    "correctAnswer": "A",
    "explanation": "Area from 0 to 4 = (1/2 * 4 * 20) = +40 J. Area from 4 to 8 = (1/2 * 4 * -20) = -40 J. Total work done = +40 - 40 = 0 J.",
    "topic": "F-x Graph Analysis",
    "difficulty": "Medium",
    "image": "/questions/wep/q18_force_distance.png"
  },
  {
    "id": 19,
    "number": 19,
    "text": "If a body of mass 200 g falls from a height 200 m and its total potential energy is converted into kinetic energy at the point of contact of the body with the surface, then decrease in potential energy of the body at the contact is: (Take g = 10 ms\u207b\u00b2)",
    "options": {
      "A": "900 J",
      "B": "600 J",
      "C": "400 J",
      "D": "200 J"
    },
    "correctAnswer": "C",
    "explanation": "Decrease in PE = mgh = 0.2 kg * 10 m/s\u00b2 * 200 m = 400 J.",
    "topic": "Conservation of Mechanical Energy",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 20,
    "number": 20,
    "text": "A particle at rest on a frictionless table is acted upon by a horizontal force which is constant in magnitude and direction. A graph is plotted for the work done on the particle W against the speed of the particle v. The graph will look like:",
    "options": {
      "A": "Straight line through origin",
      "B": "Exponential growth curve",
      "C": "Downward facing curve",
      "D": "Parabola opening upwards (W \u221d v\u00b2)"
    },
    "correctAnswer": "D",
    "explanation": "By work-energy theorem: W = \u0394KE = (1/2)mv\u00b2 - 0 = (1/2)mv\u00b2. Hence W is proportional to v\u00b2, which is a parabola opening upwards.",
    "topic": "Work-Energy Theorem Graph",
    "difficulty": "Medium",
    "image": "/questions/wep/q20_work_graphs.png"
  },
  {
    "id": 21,
    "number": 21,
    "text": "If the momentum of a body increases by 0.01%, its kinetic energy will increase by:",
    "options": {
      "A": "0.01%",
      "B": "0.02%",
      "C": "0.04%",
      "D": "0.08%"
    },
    "correctAnswer": "B",
    "explanation": "KE = p\u00b2/(2m). For small percentage changes: %\u0394KE \u2248 2 * %\u0394p = 2 * (0.01%) = 0.02%.",
    "topic": "Approximation in Energy",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 22,
    "number": 22,
    "text": "A body moves a distance of 10 m along a straight line under the action of a force of 5 N. If the work done is 25 J, then the angle which the force makes with the direction of motion of the body is:",
    "options": {
      "A": "0\u00b0",
      "B": "30\u00b0",
      "C": "60\u00b0",
      "D": "90\u00b0"
    },
    "correctAnswer": "C",
    "explanation": "W = F * d * cos(\u03b8) => 25 = 5 * 10 * cos(\u03b8) => 25 = 50 cos(\u03b8) => cos(\u03b8) = 1/2 => \u03b8 = 60\u00b0.",
    "topic": "Work Formula",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 23,
    "number": 23,
    "text": "Which of the following statements is incorrect for a conservative field?",
    "options": {
      "A": "Work done in going from initial to final position is equal to change in kinetic energy of the particle.",
      "B": "Work done depends on path but not on initial and final positions.",
      "C": "Work done does not depend on path but depends only on initial and final positions.",
      "D": "Work done on a particle in the field for a round trip is zero."
    },
    "correctAnswer": "B",
    "explanation": "For a conservative field, work done is completely independent of the path followed. Therefore, statement B is incorrect.",
    "topic": "Conservative Forces",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 24,
    "number": 24,
    "text": "A block of mass 2 kg moves inside a frictionless circular track of radius 5 m in a vertical plane. If speed of block at lowest point of track is 20 m/s, the normal force (in dynes) exerted on block at highest point of track is: (g = 10 m/s\u00b2)",
    "options": {
      "A": "6 \u00d7 10\u2076",
      "B": "6 \u00d7 10\u00b9",
      "C": "6 \u00d7 10\u2075",
      "D": "6 \u00d7 10\u00b3"
    },
    "correctAnswer": "A",
    "explanation": "By energy conservation: v_top\u00b2 = v_bot\u00b2 - 4gR = 400 - 4(10)(5) = 400 - 200 = 200 m\u00b2/s\u00b2. At highest point: N + mg = mv_top\u00b2/R => N = 2*(200)/5 - 2*10 = 80 - 20 = 60 N. In dynes: 60 N = 60 * 10\u2075 dynes = 6 \u00d7 10\u2076 dynes.",
    "topic": "Vertical Circle Track",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 25,
    "number": 25,
    "text": "A body is initially at rest. It undergoes one-dimensional motion with constant acceleration. The power delivered to it at time t is proportional to:",
    "options": {
      "A": "t^(1/2)",
      "B": "t",
      "C": "t^(3/2)",
      "D": "t\u00b2"
    },
    "correctAnswer": "B",
    "explanation": "Power P = F * v = (m * a) * (a * t) = m * a\u00b2 * t. Since m and a are constant, P \u221d t.",
    "topic": "Power and Kinematics",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 26,
    "number": 26,
    "text": "A potential energy function U(x) for a particle has sections OA (steepest downward slope), AB (flat minimum), BC (moderate upward slope), and CD (steeper upward slope). In which region is the magnitude of the force on the particle greatest?",
    "options": {
      "A": "OA",
      "B": "AB",
      "C": "BC",
      "D": "CD"
    },
    "correctAnswer": "D",
    "explanation": "Force F = -dU/dx. Magnitude of force is greatest where the absolute slope |dU/dx| of the U-x graph is steepest, which is region CD.",
    "topic": "Potential Energy and Force",
    "difficulty": "Hard",
    "image": "/questions/wep/q26_pe_curve.png"
  },
  {
    "id": 27,
    "number": 27,
    "text": "When a rubber-band is stretched by a distance x, it exerts a restoring force of magnitude F = ax + bx\u00b2 where a and b are constants. The work done in stretching the unstretched rubber-band by L is:",
    "options": {
      "A": "aL\u00b2 + bL\u00b3",
      "B": "(1/2)(aL\u00b2 + bL\u00b3)",
      "C": "(aL\u00b2/2) + (bL\u00b3/3)",
      "D": "(1/2)(aL\u00b2/2 + bL\u00b3/3)"
    },
    "correctAnswer": "C",
    "explanation": "Work done = \u222b\u2080\u1d38 (ax + bx\u00b2) dx = [a x\u00b2/2 + b x\u00b3/3]\u2080\u1d38 = aL\u00b2/2 + bL\u00b3/3.",
    "topic": "Variable Restoring Force",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 28,
    "number": 28,
    "text": "Which of the following statement(s) is/are correct?\nStatement I: Work done by kinetic friction in a closed path is not zero.\nStatement II: Kinetic frictional force is a non-conservative force.",
    "options": {
      "A": "Both I and II",
      "B": "Only I",
      "C": "Only II",
      "D": "Neither I nor II"
    },
    "correctAnswer": "A",
    "explanation": "Friction always opposes relative motion, so work done by friction along a closed loop is negative (non-zero). Hence friction is a non-conservative force. Both statements are correct.",
    "topic": "Friction and Non-conservative Forces",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 29,
    "number": 29,
    "text": "A block of 200 g mass is dropped from a height of 2 m on to a spring and compresses the spring by a distance of 50 cm. The force constant of the spring is:",
    "options": {
      "A": "20 N/m",
      "B": "40 N/m",
      "C": "30 N/m",
      "D": "60 N/m"
    },
    "correctAnswer": "B",
    "explanation": "Total vertical descent h = 2 m + 0.5 m = 2.5 m. Loss in gravitational PE = Gain in spring PE => mg(h + x) = (1/2)kx\u00b2 => (0.2 * 10 * 2.5) = (1/2) * k * (0.5)\u00b2 => 5 = (1/2) * k * 0.25 => 5 = 0.125 k => k = 5 / 0.125 = 40 N/m.",
    "topic": "Spring and Gravity Conservation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 30,
    "number": 30,
    "text": "The displacement y of a particle moving in one dimension under the action of a force is related to time t by the equation t = y^(1/3) + 5, where y is in meter and t is in seconds. The work done by the force in the first 10 seconds is:",
    "options": {
      "A": "95 J",
      "B": "65 J",
      "C": "0 J",
      "D": "35 J"
    },
    "correctAnswer": "C",
    "explanation": "t = y^(1/3) + 5 => y^(1/3) = t - 5 => y = (t - 5)\u00b3. Velocity v = dy/dt = 3(t - 5)\u00b2. At t = 0 s, v = 3(-5)\u00b2 = 75 m/s. At t = 10 s, v = 3(10 - 5)\u00b2 = 75 m/s. Since initial and final speed are identical (75 m/s), \u0394KE = 0. By work-energy theorem, Work done = 0 J.",
    "topic": "Work-Energy Theorem Application",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 31,
    "number": 31,
    "text": "The work-energy theorem states that the change in:",
    "options": {
      "A": "Kinetic energy of a particle is equal to the work done on it by the net force",
      "B": "Kinetic energy of a particle is equal to the work done by one of the forces acting on it",
      "C": "Potential energy of a particle is equal to the work done on it by the net force",
      "D": "Potential energy of a particle is equal to the work done by one of the forces acting on it."
    },
    "correctAnswer": "A",
    "explanation": "Work-Energy Theorem: Total work done by all forces (net force) acting on a body equals the change in its kinetic energy: W_net = \u0394K.",
    "topic": "Work-Energy Theorem",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 32,
    "number": 32,
    "text": "A stone is rotated in a vertical circle. Speed at bottommost point is \u221a(8gR), where R is the radius of circle. The ratio of tension at the top and the bottom is:",
    "options": {
      "A": "1 : 2",
      "B": "1 : 3",
      "C": "2 : 3",
      "D": "1 : 4"
    },
    "correctAnswer": "B",
    "explanation": "v_bot\u00b2 = 8gR. v_top\u00b2 = v_bot\u00b2 - 4gR = 4gR. T_bot = mg + m(8gR)/R = 9mg. T_top = m(4gR)/R - mg = 3mg. T_top / T_bot = 3mg / 9mg = 1/3.",
    "topic": "Vertical Circle Tension Ratio",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 33,
    "number": 33,
    "text": "The potential energy of a particle of mass 1 kg free to move along the x-axis is given by U(x) = (3x\u00b2 - 4x + 6) J. Force acting on the particle at x = 0 is:",
    "options": {
      "A": "2 i\u0302 N",
      "B": "-4 i\u0302 N",
      "C": "5 i\u0302 N",
      "D": "4 i\u0302 N"
    },
    "correctAnswer": "D",
    "explanation": "F = -dU/dx = -(6x - 4) = 4 - 6x. At x = 0, F = +4 N = 4 i\u0302 N.",
    "topic": "Force from Potential Energy",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 34,
    "number": 34,
    "text": "Assertion : Work done by friction on a body sliding down an inclined plane is positive.\nReason: Work done is greater than zero if angle between force and displacement is acute or both are in same direction.",
    "options": {
      "A": "If both assertion and reason are true and the reason is the correct explanation of the assertion.",
      "B": "If both assertion and reason are true but reason is not the correct explanation of the assertion.",
      "C": "If assertion is true but reason is false.",
      "D": "If assertion is false but reason is true."
    },
    "correctAnswer": "D",
    "explanation": "Friction opposes motion down the incline (acts up the incline, \u03b8 = 180\u00b0), so work done by friction is negative. Assertion is false; Reason correctly explains positive work.",
    "topic": "Assertion Reason Work",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 35,
    "number": 35,
    "text": "Initially mass m is suspended by a vertical spring of stiffness k and is held in relaxed condition. If mass m is suddenly released, the maximum elongation in the spring will be:",
    "options": {
      "A": "mg/k",
      "B": "2mg/k",
      "C": "mg/(2k)",
      "D": "mg/(4k)"
    },
    "correctAnswer": "B",
    "explanation": "By energy conservation from release to maximum elongation x_max: Loss in gravitational PE = Gain in spring PE => mg x_max = (1/2) k x_max\u00b2 => x_max = 2mg/k.",
    "topic": "Maximum Spring Elongation",
    "difficulty": "Medium",
    "image": "/questions/wep/q35_vertical_spring.png"
  },
  {
    "id": 36,
    "number": 36,
    "text": "A body of mass m accelerates uniformly from rest to v\u2081 in time t\u2081. As a function of time t, the instantaneous power delivered to the body is:",
    "options": {
      "A": "(m v\u2081) / t\u2081",
      "B": "(m v\u2081 t) / t\u2081",
      "C": "(m v\u2081 t\u00b2) / t\u2081",
      "D": "(m v\u2081\u00b2 t) / t\u2081\u00b2"
    },
    "correctAnswer": "D",
    "explanation": "Acceleration a = v\u2081 / t\u2081. Force F = ma = m v\u2081 / t\u2081. Velocity at time t: v(t) = at = (v\u2081 / t\u2081) t. Instantaneous power P = F * v = (m v\u2081 / t\u2081) * (v\u2081 t / t\u2081) = (m v\u2081\u00b2 t) / t\u2081\u00b2.",
    "topic": "Power and Time Relation",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 37,
    "number": 37,
    "text": "A spring of spring constant 5 \u00d7 10\u00b3 N/m is elongated initially by 15 cm from the unstretched position. Then the work required to elongate further by another 15 cm is:",
    "options": {
      "A": "62.5 J",
      "B": "125 J",
      "C": "168.75 J",
      "D": "250 J"
    },
    "correctAnswer": "C",
    "explanation": "W = (1/2)k(x\u2082\u00b2 - x\u2081\u00b2). Here x\u2081 = 0.15 m, x\u2082 = 0.30 m. W = 0.5 * 5000 * (0.09 - 0.0225) = 2500 * 0.0675 = 168.75 J.",
    "topic": "Work Done on Spring",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 38,
    "number": 38,
    "text": "A constant force of (3i\u0302 + j\u0302) N acts on a particle of mass 2 kg. The particle is displaced from position (2i\u0302 + k\u0302) m to position (4i\u0302 + 3j\u0302 - k\u0302) m. The work done by the force on the particle is:",
    "options": {
      "A": "6 J",
      "B": "13 J",
      "C": "15 J",
      "D": "9 J"
    },
    "correctAnswer": "D",
    "explanation": "Displacement \u0394r = r\u2082 - r\u2081 = (4 - 2)i\u0302 + (3 - 0)j\u0302 + (-1 - 1)k\u0302 = (2i\u0302 + 3j\u0302 - 2k\u0302) m. Work W = F \u00b7 \u0394r = (3*2) + (1*3) + (0*-2) = 6 + 3 + 0 = 9 J.",
    "topic": "3D Work Calculation",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 39,
    "number": 39,
    "text": "A small ball is placed at the bottom of a frictionless cylindrical drum of radius R. The ball is given a speed v = \u221a(gR) at the lowest point. Find the maximum height of the ball above the ground:",
    "options": {
      "A": "R",
      "B": "R/4",
      "C": "R/3",
      "D": "R/2"
    },
    "correctAnswer": "D",
    "explanation": "Since v = \u221a(gR) < \u221a(2gR), the ball will not cross the horizontal level (\u03b8 \u2264 90\u00b0). By energy conservation: (1/2)m v\u00b2 = mgh => (1/2)m (gR) = mgh => h = R/2.",
    "topic": "Vertical Circular Motion Height",
    "difficulty": "Hard",
    "image": "/questions/wep/q39_ball_drum.png"
  },
  {
    "id": 40,
    "number": 40,
    "text": "A body of mass 2 kg slides down a curved track which is a quadrant of a circle of radius 1 metre. All surfaces are frictionless. If the body starts from rest, its speed at the bottom of the track is: (g = 9.8 m/s\u00b2)",
    "options": {
      "A": "4.43 m/s",
      "B": "2 m/s",
      "C": "0.5 m/s",
      "D": "19.6 m/s"
    },
    "correctAnswer": "A",
    "explanation": "Loss in PE = Gain in KE => mgR = (1/2)mv\u00b2 => v = \u221a(2gR) = \u221a(2 * 9.8 * 1) = \u221a19.6 \u2248 4.43 m/s.",
    "topic": "Conservation of Mechanical Energy",
    "difficulty": "Medium",
    "image": "/questions/wep/q40_curved_track.png"
  },
  {
    "id": 41,
    "number": 41,
    "text": "The energy required to accelerate a car from rest to 10 ms\u207b\u00b9 is W. The energy required to accelerate the car from 10 ms\u207b\u00b9 to 20 ms\u207b\u00b9 is:",
    "options": {
      "A": "W",
      "B": "2 W",
      "C": "3 W",
      "D": "4 W"
    },
    "correctAnswer": "C",
    "explanation": "W\u2081 = (1/2)m(10\u00b2 - 0\u00b2) = 50m = W. W\u2082 = (1/2)m(20\u00b2 - 10\u00b2) = (1/2)m(400 - 100) = 150m = 3 * (50m) = 3W.",
    "topic": "Work-Energy Theorem",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 42,
    "number": 42,
    "text": "A 120 g mass has a velocity v = (2i\u0302 + 5j\u0302) m/s at a certain instant. Its kinetic energy is:",
    "options": {
      "A": "3 J",
      "B": "4 J",
      "C": "5 J",
      "D": "1.74 J"
    },
    "correctAnswer": "D",
    "explanation": "v\u00b2 = |v|\u00b2 = 2\u00b2 + 5\u00b2 = 4 + 25 = 29 m\u00b2/s\u00b2. KE = (1/2)mv\u00b2 = 0.5 * 0.12 kg * 29 = 0.06 * 29 = 1.74 J.",
    "topic": "Kinetic Energy with Vector Velocity",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 43,
    "number": 43,
    "text": "Under the action of a force, a 2 kg body moves such that its position x as a function of time t is given by x = t\u00b2/3, where x is in meters and t in seconds. The work done by the force in the first two seconds is:",
    "options": {
      "A": "1600 J",
      "B": "160 J",
      "C": "16 J",
      "D": "16/9 J"
    },
    "correctAnswer": "D",
    "explanation": "Velocity v = dx/dt = 2t/3. At t = 0, v = 0. At t = 2 s, v = 4/3 m/s. Work done W = \u0394KE = (1/2)m(v\u00b2 - 0) = (1/2)(2)(4/3)\u00b2 = 16/9 J.",
    "topic": "Work and Calculus",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 44,
    "number": 44,
    "text": "A particle of mass m is attached to a string of length l. It is displaced along a quarter circle of radius l from horizontal to vertical by a constant magnitude force F whose direction is always tangential (acting along instantaneous displacement). The work done by the force F is:",
    "options": {
      "A": "\u221a2 F l",
      "B": "F l",
      "C": "(\u221a2 F l) / \u03c0",
      "D": "(F \u03c0 l) / 2"
    },
    "correctAnswer": "D",
    "explanation": "Since force F is always along the instantaneous displacement tangent (cos 0\u00b0 = 1), W = \u222b F ds = F * (Arc length of quarter circle) = F * (\u03c0 l / 2).",
    "topic": "Work on Curved Path",
    "difficulty": "Hard",
    "image": "/questions/wep/q44_string_circle.png"
  },
  {
    "id": 45,
    "number": 45,
    "text": "A stone of mass 2 kg is projected upwards with kinetic energy of 98 J. The height at which the kinetic energy of the body becomes half of its original value will be: (Take g = 9.8 ms\u207b\u00b2)",
    "options": {
      "A": "5 m",
      "B": "2.5 m",
      "C": "1.5 m",
      "D": "0.5 m"
    },
    "correctAnswer": "B",
    "explanation": "Initial KE = 98 J. Half KE = 49 J. Loss in KE = Gain in PE => 49 = mgh => 49 = (2)(9.8)h => 49 = 19.6 h => h = 49 / 19.6 = 2.5 m.",
    "topic": "Energy Conservation in Projectile",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 46,
    "number": 46,
    "text": "A block of mass 40 gram is given an initial speed of 4 m/s when the spring is relaxed. The surface between the block and horizontal ground is rough with coefficient of friction 0.01. If the spring constant (K) of the spring is 2 N/m, then the maximum compression (x_max) in the spring can be obtained by the quadratic equation: (g = 10 m/s\u00b2)",
    "options": {
      "A": "x\u00b2_max - 0.0004 x_max - 0.36 = 0",
      "B": "x\u00b2_max + 0.004 x_max + 0.32 = 0",
      "C": "x\u00b2_max + 0.004 x_max - 0.32 = 0",
      "D": "x\u00b2_max - 0.004 x_max - 0.32 = 0"
    },
    "correctAnswer": "C",
    "explanation": "By work-energy theorem: (1/2)mv\u00b2 = (1/2)K x_max\u00b2 + \u03bcmg x_max => 0.5*(0.04)*(16) = 0.5*(2)*x_max\u00b2 + (0.01)*(0.04)*(10)*x_max => 0.32 = x_max\u00b2 + 0.004 x_max => x\u00b2_max + 0.004 x_max - 0.32 = 0.",
    "topic": "Spring and Friction Work-Energy",
    "difficulty": "Hard",
    "image": "/questions/wep/q46_jee_spring_block.png"
  },
  {
    "id": 47,
    "number": 47,
    "text": "Given below are two statements:\nStatement I: An object moves from position r\u2081 to r\u2082 under a conservative force field F\u20d7. The work done by the force is W = -\u222b_{r\u2081}^{r\u2082} F\u20d7 \u00b7 dr\u20d7.\nStatement II: Any object moving from one location to another can follow infinite number of paths. Therefore, the amount of work done by the object changes with the path it follows for a conservative force.\n\nIn the light of the above statements, choose the correct answer:",
    "options": {
      "A": "Statement I is true but Statement II is false",
      "B": "Both Statement I and Statement II are false",
      "C": "Statement I is false but Statement II is true",
      "D": "Both Statement I and Statement II are true"
    },
    "correctAnswer": "B",
    "explanation": "Work done by a force is W = +\u222b F\u20d7 \u00b7 dr\u20d7 (the negative sign defines change in potential energy \u0394U = -W). Statement II is false because conservative work is strictly path independent. Hence both statements are false.",
    "topic": "Conservative Force & Potential Energy",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 48,
    "number": 48,
    "text": "Two blocks with masses 100 g and 200 g are attached to the ends of springs A and B. The energy stored in A is E. The energy stored in B, when spring constants k_A and k_B satisfy the relation 4k_A = 3k_B and springs are in equilibrium under gravity, is:",
    "options": {
      "A": "2 E",
      "B": "(4/3) E",
      "C": "4 E",
      "D": "3 E"
    },
    "correctAnswer": "D",
    "explanation": "At equilibrium, spring elongation x = mg/k. Stored energy U = (1/2)kx\u00b2 = (1/2)k(mg/k)\u00b2 = (m\u00b2g\u00b2)/(2k). Therefore, U_B / U_A = (m_B/m_A)\u00b2 * (k_A/k_B) = (200/100)\u00b2 * (3/4) = 4 * (3/4) = 3. Thus U_B = 3E.",
    "topic": "Spring Energy in Equilibrium",
    "difficulty": "Hard",
    "image": "/questions/wep/q48_jee_springs_ab.png"
  },
  {
    "id": 49,
    "number": 49,
    "text": "If the kinetic energy of a moving body becomes four times its initial kinetic energy, then the percentage change in its momentum will be:",
    "options": {
      "A": "100 %",
      "B": "200 %",
      "C": "300 %",
      "D": "400 %"
    },
    "correctAnswer": "A",
    "explanation": "p = \u221a(2m KE). If KE becomes 4 * KE_initial, p_final = \u221a(4) * p_initial = 2 * p_initial. Percentage increase = ((2p - p)/p) * 100% = 100%.",
    "topic": "Percentage Change in Momentum",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 50,
    "number": 50,
    "text": "Water is pumped from a depth of 10 m and delivered through a pipe of cross-section 10\u207b\u00b2 m\u00b2 up to a height of 10 m. If it is needed to deliver a volume of 0.2 m\u00b3 per second, find the power required. (g = 10 m/s\u00b2, density of water = 1000 kg/m\u00b3)",
    "options": {
      "A": "80 kW",
      "B": "160 kW",
      "C": "40 kW",
      "D": "20 kW"
    },
    "correctAnswer": "A",
    "explanation": "Mass flow rate dm/dt = \u03c1 * (dV/dt) = 1000 * 0.2 = 200 kg/s. Velocity of water v = (dV/dt) / Area = 0.2 / 10\u207b\u00b2 = 20 m/s. Total height H = 10 + 10 = 20 m. Power P = (dm/dt) * g * H + (1/2)(dm/dt) * v\u00b2 = 200 * 10 * 20 + 0.5 * 200 * (400) = 40,000 + 40,000 = 80,000 W = 80 kW.",
    "topic": "Pump Power Calculation",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 51,
    "number": 51,
    "text": "A particle is moved from (0, 0) to (a, a) under a force F\u20d7 = (3i\u0302 + 4j\u0302) N along two different paths. Path 1 is OP (direct diagonal) and Path 2 is OQP (along axes). Let W\u2081 and W\u2082 be the work done by this force in these two paths. Then:",
    "options": {
      "A": "W\u2081 = W\u2082",
      "B": "W\u2081 = 2 W\u2082",
      "C": "W\u2082 = 2 W\u2081",
      "D": "W\u2082 = 4 W\u2081"
    },
    "correctAnswer": "A",
    "explanation": "Since force F\u20d7 = (3i\u0302 + 4j\u0302) is constant, it is conservative. The work done by any conservative force is strictly path-independent: W\u2081 = W\u2082 = 3a + 4a = 7a J.",
    "topic": "Path Independence of Work",
    "difficulty": "Medium",
    "image": "/questions/wep/q51_jee_paths.png"
  },
  {
    "id": 52,
    "number": 52,
    "text": "The potential energy of a particle oscillating on x-axis is given as U = 20 + (x - 2)\u00b2 where U is in Joules and x is in meters. Total mechanical energy of the particle is 36 J. Find the maximum kinetic energy of the particle (in J):",
    "options": {
      "A": "16 J",
      "B": "20 J",
      "C": "36 J",
      "D": "4 J"
    },
    "correctAnswer": "A",
    "explanation": "Minimum potential energy U_min occurs at x = 2 m: U_min = 20 + 0 = 20 J. Maximum KE = Total Mechanical Energy - U_min = 36 J - 20 J = 16 J.",
    "topic": "Oscillation and Maximum KE",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 53,
    "number": 53,
    "text": "In a shotput event an athlete throws the shotput of mass 10 kg with an initial speed of 1 m/s at 45\u00b0 from a height 1.5 m above ground. Assuming air resistance to be negligible and acceleration due to gravity to be 10 m/s\u00b2, the kinetic energy of the shotput when it just reaches the ground will be:",
    "options": {
      "A": "2.5 J",
      "B": "5.0 J",
      "C": "52.5 J",
      "D": "155.0 J"
    },
    "correctAnswer": "D",
    "explanation": "By conservation of mechanical energy: KE_final = KE_initial + PE_initial = (1/2)mv\u00b2 + mgh = 0.5 * 10 * (1)\u00b2 + 10 * 10 * 1.5 = 5 + 150 = 155.0 J.",
    "topic": "Projectile Energy Conservation",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 54,
    "number": 54,
    "text": "A body is moving unidirectionally under the influence of a source of constant power P. Its displacement s in time t is proportional to t^(n/2). Find n:",
    "options": {
      "A": "2",
      "B": "3",
      "C": "1/2",
      "D": "3/2"
    },
    "correctAnswer": "B",
    "explanation": "P = F * v = m * v * (dv/dt) = constant. Integrating: v \u221d t^(1/2). Displacement s = \u222b v dt \u221d t^(3/2) = t^(n/2). Therefore n = 3.",
    "topic": "Constant Power Delivery",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 55,
    "number": 55,
    "text": "The potential energy (in joules) function of a particle in a region of space is given as U = (2x\u00b2 + 3y\u00b3 + 2z). Here x, y and z are in metres. Find the magnitude of x-component of force (in Newton) acting on the particle at point P(1m, 2m, 3m):",
    "options": {
      "A": "4 N",
      "B": "6 N",
      "C": "2 N",
      "D": "12 N"
    },
    "correctAnswer": "A",
    "explanation": "F_x = -\u2202U/\u2202x = -\u2202(2x\u00b2)/\u2202x = -4x. At point P(1, 2, 3), |F_x| = |-4(1)| = 4 N.",
    "topic": "Partial Derivatives in Conservative Field",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 56,
    "number": 56,
    "text": "A body of mass 0.5 kg travels in a straight line with velocity v = a x^(3/2) where a = 5 m^(-1/2) s^(-1). The work done by the net force during its displacement from x = 0 to x = 2 m is:",
    "options": {
      "A": "1.5 J",
      "B": "50 J",
      "C": "10 J",
      "D": "100 J"
    },
    "correctAnswer": "B",
    "explanation": "At x = 0, v\u2081 = 0. At x = 2 m, v\u2082 = 5 * (2)^(3/2) => v\u2082\u00b2 = 25 * 8 = 200 m\u00b2/s\u00b2. By work-energy theorem: W = (1/2)m(v\u2082\u00b2 - v\u2081\u00b2) = 0.5 * 0.5 * 200 = 50 J.",
    "topic": "Work-Energy Theorem with Velocity Function",
    "difficulty": "Hard",
    "image": null
  },
  {
    "id": 57,
    "number": 57,
    "text": "When a conservative force does positive work on a body:",
    "options": {
      "A": "the potential energy increases",
      "B": "the potential energy decreases",
      "C": "total energy increases",
      "D": "total energy decreases"
    },
    "correctAnswer": "B",
    "explanation": "Change in potential energy is defined as \u0394U = -W_conservative. If W_conservative > 0, then \u0394U < 0 (potential energy decreases).",
    "topic": "Work and Potential Energy Relation",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 58,
    "number": 58,
    "text": "A spring of force constant 200 N/m is stretched slowly from its natural length by 10 cm. Work done by the spring force is:",
    "options": {
      "A": "20 Joule",
      "B": "-20 Joule",
      "C": "1 Joule",
      "D": "-1 Joule"
    },
    "correctAnswer": "D",
    "explanation": "Spring force F_s = -kx acts in the direction opposite to displacement. Work done by spring force W_s = -(1/2)kx\u00b2 = -0.5 * 200 * (0.1)\u00b2 = -1 Joule.",
    "topic": "Work Done by Spring",
    "difficulty": "Medium",
    "image": null
  },
  {
    "id": 59,
    "number": 59,
    "text": "Work done by a non-conservative force (such as friction):",
    "options": {
      "A": "does not change the momentum",
      "B": "is path independent",
      "C": "does not change the kinetic energy",
      "D": "is path dependent"
    },
    "correctAnswer": "D",
    "explanation": "Non-conservative forces (friction, air resistance, viscous force) dissipate energy and their work done depends on the actual path taken between two points.",
    "topic": "Non-conservative Force Properties",
    "difficulty": "Easy",
    "image": null
  },
  {
    "id": 60,
    "number": 60,
    "text": "The work done in extending a spring by x\u2080 from relaxed length is w\u2080. Find the additional work done in further extending the spring by x\u2080 (from x\u2080 to 2x\u2080):",
    "options": {
      "A": "3 w\u2080",
      "B": "2 w\u2080",
      "C": "w\u2080",
      "D": "4 w\u2080"
    },
    "correctAnswer": "A",
    "explanation": "Initial work w\u2080 = (1/2)k(x\u2080\u00b2 - 0) = (1/2)k x\u2080\u00b2. Work to stretch to 2x\u2080 = (1/2)k(2x\u2080)\u00b2 = 4 * ((1/2)k x\u2080\u00b2) = 4w\u2080. Additional work needed = 4w\u2080 - w\u2080 = 3w\u2080.",
    "topic": "Spring Extension Work Proportions",
    "difficulty": "Medium",
    "image": "/questions/wep/q60_jee_spring_f.png"
  }
];
