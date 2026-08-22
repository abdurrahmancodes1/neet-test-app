// Extracted from pdf/neet-test-2.pdf (Dropper NEET Test Series)
// Selected chapters: Units and Measurements, Mathematical Tools, Motion in a Straight Line, Motion in a Plane, Some Basic Concepts of Chemistry.

const q = (id, sourceQuestionNumber, subject, chapter, topic, question, options, correctAnswer, image = null) => ({
  id,
  sourceQuestionNumber,
  subject,
  chapter,
  difficulty: 'Hard',
  type: 'mcq',
  topic,
  question,
  options,
  correctAnswer,
  image,
});

export const test2Questions = [
  // --- PHYSICS (Questions 1 - 45) ---
  q(1, 1, 'Physics', 'Units and Measurements', 'Vernier Caliper Least Count',
    'A student designs an improvised vernier caliper using two identical wedge shaped scales as shown in figure (a), reading of length of a rod is taken as shown in figure (b). Assume perfect alignment and no zero error, what is the least count of this improvised vernier caliper? (each divisions are equally spaced = l)',
    { A: 'l', B: 'l tan θ', C: 'l sec θ − l', D: 'l cos θ − l' },
    'C', '/questions/test2/q1.svg'),

  q(2, 2, 'Physics', 'Motion in a Straight Line', 'Velocity-Position Function',
    'For a particle moving in a straight line, velocity v as a function of position x is given by v(x) = 4 − 2x. Given that at t = 0, x = 0 which of the following equation, gives position x of particle as function of time t?',
    { A: 'x = 2e⁻²ᵗ', B: 'x = 4e⁻²ᵗ', C: 'x = 2(1 − e⁻²ᵗ)', D: 'x = 4(1 − e⁻²ᵗ)' },
    'C'),

  q(3, 3, 'Physics', 'Motion in a Plane', 'Motion on Chords of Vertical Circle',
    'Two wires AB (diameter) and AC are fixed on a vertical circular loop of radius R. A small frictionless bead is released from rest along the two wires one by one from A. The incorrect statement(s) is/are: (g is acceleration due to gravity)',
    {
      A: 'Time taken to reach the points B and C from A is same',
      B: 'Time taken to reach the point C is √(4R/g)',
      C: 'Speed of bead at B and C are same',
      D: 'Both (2) and (3)',
    },
    'C', '/questions/test2/q3.svg'),

  q(4, 4, 'Physics', 'Motion in a Plane', 'Average Acceleration in Circular Path',
    'A particle is moving in a circular path of radius R with constant speed v. During the time interval, when it moves from A to B as shown in figure, the magnitude of average acceleration is equal to:',
    {
      A: '((√3 + 1)v²) / (7√2 πR)',
      B: '(6v²) / (7√2 πR)',
      C: '(6(√3 + 1)v²) / (7√2 R)',
      D: '(6(√3 + 1)v²) / (7√2 πR)',
    },
    'D', '/questions/test2/q4.svg'),

  q(5, 5, 'Physics', 'Motion in a Plane', '2D Trajectory Acceleration',
    'A particle is moving in x-y plane on path y = 2x − x² + 4, where x and y are in metre. Its x component of velocity is constant and is equal to 4 m s⁻¹. Acceleration of the particle at x = 1 m is',
    { A: '−4 m s⁻²', B: '−8 m s⁻²', C: '−32 m s⁻²', D: '−16 m s⁻²' },
    'C'),

  q(6, 6, 'Physics', 'Units and Measurements', 'Error in Pendulum Gravity Measurement',
    'In an experiment to determine acceleration due to gravity g, a student measures length of simple pendulum l = (100.0 ± 0.1) cm. He records time for 20 oscillations as (40 ± 1) s. Then, correct statement is:',
    {
      A: 'Error ΔT in time period T is 1 s.',
      B: 'Maximum percentage error in time period T is 5%',
      C: 'Maximum percentage error in the measurement of g is 2.6%',
      D: 'Maximum percentage error in the measurement of g is 5.1%',
    },
    'D'),

  q(7, 7, 'Physics', 'Motion in a Plane', 'Change in Velocity Magnitude in Projectile',
    'A particle is projected in air with speed u at an angle θ₀ with horizontal. The magnitude of change in magnitude of velocity between the point of projection and the maximum height is:',
    { A: 'u', B: 'u sin θ₀', C: 'u (1 − sin θ₀)', D: 'u (1 − cos θ₀)' },
    'D'),

  q(8, 8, 'Physics', 'Units and Measurements', 'Propagation of Errors',
    'A physical quantity P is dependent on other physical quantities a, b, c and d respectively as P = (a² b) / (√c d³). If percentage errors in a, b, c and d are 2%, 1%, 1% and 2% respectively then maximum percentage error in P will be:',
    { A: '8.5%', B: '11.5%', C: '6.5%', D: '7%' },
    'B'),

  q(9, 9, 'Physics', 'Mathematical Tools', 'Derivative of Constant Function',
    'The value of d/dx [cos (60°)] is:',
    { A: '√3 / 2', B: '1/2', C: '1/√2', D: '0' },
    'D'),

  q(10, 10, 'Physics', 'Motion in a Plane', 'Assertion-Reason: Projectile Rate of Velocity Change',
    'Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A): In projectile motion, magnitude of rate of change of velocity is variable.\nReason (R): In projectile motion, speed first decreases then increases.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below.',
    {
      A: 'Both (A) and (R) are true and (R) is the correct explanation of (A).',
      B: 'Both (A) and (R) are true but (R) is not the correct explanation of (A).',
      C: '(A) is true but (R) is false.',
      D: '(A) is false but (R) is true.',
    },
    'D'),

  q(11, 11, 'Physics', 'Motion in a Straight Line', 'Ascending Lift Kinematics',
    'A lift starts ascending from rest with constant acceleration of 2 m s⁻², then with constant velocity and finally comes to rest with constant retardation of 2 m s⁻². If total time taken is 10 s and total distance covered is 32 m, then maximum speed with which lift travels, is:',
    { A: '4 m s⁻¹', B: '8 m s⁻¹', C: '12 m s⁻¹', D: '6 m s⁻¹' },
    'A'),

  q(12, 12, 'Physics', 'Mathematical Tools', 'Circular Motion Derivative Identities',
    'For a particle moving in a circular path with constant speed, at a given instant, its velocity is v⃗. Then correct statement is:',
    {
      A: '|dv⃗/dt| = d/dt|v⃗| ≠ 0',
      B: '|dv⃗/dt| = 0; d/dt|v⃗| ≠ 0',
      C: 'd/dt|v⃗| = 0; |dv⃗/dt| ≠ 0',
      D: '|dv⃗/dt| = d/dt|v⃗| = 0',
    },
    'C'),

  q(13, 13, 'Physics', 'Units and Measurements', 'Pitch of Screw Gauge',
    'A screw gauge has least count 0.01 mm and the number of circular scale divisions is 100. The pitch of the screw gauge is',
    { A: '1 cm', B: '0.001 cm', C: '0.1 cm', D: '0.0001 cm' },
    'C'),

  q(14, 14, 'Physics', 'Motion in a Plane', 'Sum of Heights for Equal Range',
    'A projectile is projected with same speed 20 m s⁻¹ at two different angles of projections with horizontal such that their horizontal range is same in two cases. If H₁ and H₂ be the maximum heights respectively in two cases, then (H₁ + H₂) is equal to (g = 10 m s⁻²)',
    { A: '40 m', B: '80 m', C: '60 m', D: '20 m' },
    'D'),

  q(15, 15, 'Physics', 'Units and Measurements', 'Dimensional Equation Solving',
    'Kinetic energy of a particle moving along x-axis as a function of its position (r) and time (t) is given as K = (A r^(2/3)) / (B + t³). If force acting on the particle depends on A, B and length L as F = Aˣ Bʸ Lᶻ, then the value of x² − y + z is:',
    { A: '2/3', B: '5/3', C: '1/3', D: '4/3' },
    'B'),

  q(16, 16, 'Physics', 'Motion in a Plane', 'Projectile Fired Downward from Tower',
    'A particle is projected from the top of a tower as shown in figure, then the distance from the foot of the tower where it will strike the ground will be: (g = 10 m s⁻²)',
    { A: '(4000/3) m', B: '(5000/3) m', C: '1000 m', D: '2000 m' },
    'C', '/questions/test2/q16.svg'),

  q(17, 17, 'Physics', 'Motion in a Straight Line', 'Match List: Motion under Polynomial Law',
    'A particle is moving along the x axis. Its position (x) with time (t) is given by x = 3t² − t³/2, where x is in metre and t is in second. Match the condition of list-I with time interval and instant of list-II.\n\nList-I:\nA. Velocity and acceleration will be in the same direction\nB. Particle is at origin\nC. Particle is retarding\nD. speed is zero\n\nList-II:\nP. At t = 0 and t = 4 s\nQ. 0 < t < 2 s\nR. At t = 0 and t = 6 s\nS. 2 s < t < 4 s\n\nChoose the correct answer from the options given below.',
    {
      A: '(A)→(S), (B)→(P), (C)→(Q), (D)→(R)',
      B: '(A)→(Q), (B)→(P), (C)→(S), (D)→(R)',
      C: '(A)→(R), (B)→(S), (C)→(P), (D)→(Q)',
      D: '(A)→(Q), (B)→(R), (C)→(S), (D)→(P)',
    },
    'D'),

  q(18, 18, 'Physics', 'Motion in a Straight Line', 'Velocity-Position Graph Under Constant Retardation',
    'A particle is moving in a straight line with velocity v₀ = +√20 m s⁻¹ at x = 0. It is having a constant retardation of 2 m s⁻². Which of the following graph correctly represents variation of velocity v with position x?',
    {
      A: 'Graph (1)',
      B: 'Graph (2)',
      C: 'Graph (3)',
      D: 'Graph (4)',
    },
    'B', '/questions/test2/q18.svg'),

  q(19, 19, 'Physics', 'Motion in a Straight Line', 'Vertical Motion with Constant Air Resistance',
    'A particle is thrown vertically upward with a velocity 40 m s⁻¹ where air resistance produces a constant retardation of 2 m s⁻². It reaches the ground after some time, then (g = 10 m s⁻²)',
    {
      A: 'time of ascent, tₐ = 5√(2/3) s',
      B: 'time of descent, t_d = (10/3) s',
      C: 'Maximum height reached, H = (100/3) m',
      D: 'Speed just before striking the ground is v = 40√(2/3) m s⁻¹',
    },
    'D'),

  q(20, 20, 'Physics', 'Mathematical Tools', 'Perpendicular Vectors Parameter',
    'Two vectors A⃗ = αî − 2ĵ + 4k̂ and B⃗ = αî − αĵ − 2k̂ are perpendicular to each other. The value(s) of α is/are:',
    { A: '2', B: '−4', C: '−2', D: 'Both (1) and (2)' },
    'D'),

  q(21, 21, 'Physics', 'Mathematical Tools', 'Parallelogram Area via Diagonals',
    'Diagonals of a parallelogram are represented by D⃗₁ = (6î + 4ĵ) m and D⃗₂ = (−4ĵ) m respectively. Area of this parallelogram is:',
    { A: '24 m²', B: '12 m²', C: '16 m²', D: '18 m²' },
    'B'),

  q(22, 22, 'Physics', 'Motion in a Plane', 'Angle of Projection from Heights Ratio',
    'In ground to ground projectile motion, the speed of a projectile at its maximum height is √(6/7) times its speed at half the maximum height. The angle of projection of the projectile with horizontal is:',
    { A: '60°', B: '53°', C: '30°', D: '45°' },
    'C'),

  q(23, 23, 'Physics', 'Motion in a Straight Line', 'Characteristics of Constant Velocity Motion',
    'If a particle is moving with constant velocity then which of the following statements are correct?\n(A) Instantaneous velocity is equal to average velocity in any time interval.\n(B) Instantaneous speed is equal to magnitude of instantaneous velocity.\n(C) Acceleration is zero\n(D) Distance covered is equal to magnitude of displacement in any time interval',
    {
      A: '(A), (B) and (D) only',
      B: '(A), (B) and (C) only',
      C: '(A), (B), (C) and (D)',
      D: '(A) and (B) only',
    },
    'C'),

  q(24, 24, 'Physics', 'Motion in a Straight Line', 'Train Crossing Pole Acceleration',
    'A train moving with constant acceleration crosses an electric pole. When engine of the train crosses the pole, speed of train is 5 m s⁻¹ and 10 m s⁻¹ when end of the train crosses it. What is the speed of the train when two-third of the train has yet to cross the pole?',
    { A: '√(125/2) m s⁻¹', B: '(√125)/2 m s⁻¹', C: '(15/√3) m s⁻¹', D: '5√2 m s⁻¹' },
    'D'),

  q(25, 25, 'Physics', 'Units and Measurements', 'Statement on Significant Figures',
    'Given below are two statements:\nStatement I: The sum of numbers 436.32, 227.2 and 0.301 with appropriate significant figures is 663.8\nStatement II: If total displacement of a particle is measured as (12.0 ± 0.1) m in time interval (3.0 ± 0.1) s, then average velocity upto correct significant figures is (3.00 ± 0.10) m s⁻¹\n\nIn the light of the above statements, choose the correct answer from the options given below:',
    {
      A: 'Both Statement I and Statement II are correct.',
      B: 'Both Statement I and Statement II are incorrect.',
      C: 'Statement I is correct but Statement II is incorrect.',
      D: 'Statement I is incorrect but Statement II is correct.',
    },
    'C'),

  q(26, 26, 'Physics', 'Units and Measurements', 'Meaningful Dimensional Combinations',
    'If A, B and C are physical quantities having different dimensions, then which of the following expression may give a meaningful quantity?',
    { A: '(A − B) / C', B: '(A + C) / B', C: 'AB + C', D: '(BC) / A' },
    'D'),

  q(27, 27, 'Physics', 'Units and Measurements', 'Unit of Mass in Custom System',
    'In an imaginary system, unit of force is 100 N, unit of length is 10 m and unit of time is 60 s. The unit of mass in the new system is:',
    { A: '3600 kg', B: '36000 kg', C: '360 kg', D: '36 kg' },
    'B'),

  q(28, 28, 'Physics', 'Mathematical Tools', 'Local Minimum of Cubic Polynomial',
    'The minimum value of function y = x³ − 12x is:',
    { A: '−2', B: '2', C: '−16', D: '16' },
    'C'),

  q(29, 29, 'Physics', 'Motion in a Plane', 'Rain-Man Problem Actual Velocity',
    'When a man moves on a horizontal straight road with velocity 3 m s⁻¹, rain appears to be falling vertically downward. When he increases his velocity to 6 m s⁻¹, rain strikes him at angle 30° with the vertical. The actual speed of rain w.r.t. ground is:',
    { A: '3√3 m s⁻¹', B: '6 m s⁻¹', C: '6√3 m s⁻¹', D: '9 m s⁻¹' },
    'B'),

  q(30, 30, 'Physics', 'Mathematical Tools', 'Trigonometric Definite Integral',
    'Evaluate ∫₀^(π/4) (cos² x − sin² x) dx',
    { A: '0', B: '1/2', C: '−1/2', D: '1' },
    'B'),

  q(31, 31, 'Physics', 'Mathematical Tools', 'Slopes of Tangents',
    'Given y = 4x − 2x², then slope of tangent to the curve at x = 0 and at x = 1 respectively, are',
    { A: '0, 4', B: '0, 0', C: '4, 0', D: '4, 4' },
    'C'),

  q(32, 32, 'Physics', 'Motion in a Plane', 'River Swimmer Drift at Angle',
    'A super swimmer who can swim with speed 5 m s⁻¹ in still water, wants to cross a 500 m wide river flowing with speed 4 m s⁻¹. If swimmer swims making an angle 127° with downstream, then drift of the swimmer when it reaches the opposite bank, is:',
    { A: 'zero', B: '100 m', C: '150 m', D: '125 m' },
    'D'),

  q(33, 33, 'Physics', 'Mathematical Tools', 'Angle Between Two Vectors from Resultant',
    'Given three vectors A⃗, B⃗ and R⃗ such that R⃗ = A⃗ + B⃗. R⃗ is perpendicular to A⃗ and |R⃗| = 6. If |A⃗| + |B⃗| = 18; then the angle between A⃗ and B⃗ is:',
    { A: '135°', B: '150°', C: '127°', D: '143°' },
    'D'),

  q(34, 34, 'Physics', 'Motion in a Straight Line', 'Average Speed of Stone Thrown from Tower',
    'A stone is thrown vertically upward with speed 20 m s⁻¹ from the top of a tower of height 25 m. The average speed of the stone for its entire journey until it hits the ground, is (g = 10 m s⁻²)',
    { A: '6.25 m s⁻¹', B: '5 m s⁻¹', C: '20 m s⁻¹', D: '13 m s⁻¹' },
    'D'),

  q(35, 35, 'Physics', 'Motion in a Straight Line', 'Minimum Retardation to Avoid Rear-End Collision',
    'Two cars A and B are moving on a straight road in the same direction with speeds 20 m s⁻¹ and 10 m s⁻¹ respectively, with B ahead of A by 5 m. Sensing a collision, driver of car B starts increasing the speed at the rate of 4 m s⁻². At the same instant what effort should driver of car A make to avoid a collision?',
    {
      A: 'He should continue with same speed.',
      B: 'He should apply brakes to produce a minimum retardation of 10 m s⁻².',
      C: 'He should apply brakes to produce a minimum retardation of 6 m s⁻².',
      D: 'He should apply brakes to produce a minimum retardation of 20 m s⁻².',
    },
    'C'),

  q(36, 36, 'Physics', 'Motion in a Plane', 'Speed at Arbitrary Angle in Projectile Motion',
    'A particle is thrown with the speed u at an angle α with the horizontal. When the particle makes an angle β with the horizontal, its speed will be:',
    { A: 'u cos α', B: 'u cos α sec β', C: 'u cos α cos β', D: 'u sec α cos β' },
    'B'),

  q(37, 37, 'Physics', 'Motion in a Straight Line', 'Time from 1/a vs v Graphical Integration',
    'An ambulance moving along a straight line is rushing a patient to the hospital. The acceleration (a) of the ambulance depends on its speed (v). The graph below shows 1/a (in s²/m) on the y-axis and speed v (in m/s) on the x-axis. Find the total time taken by the ambulance to increase its speed from 2 m/s to 4 m/s.',
    { A: '4 s', B: '6 s', C: '8 s', D: '12 s' },
    'B', '/questions/test2/q37.svg'),

  q(38, 38, 'Physics', 'Motion in a Plane', 'Collision Ratio for Two Projectiles',
    'A particle is projected from point O with velocity v₁ at an angle 30° with the horizontal and at the same instant another particle is projected from point P which is vertically below the highest point with velocity v₂ in vertically upward direction as shown. For the two particles to collide the ratio v₁/v₂ will be:',
    { A: '1', B: '2', C: '0.5', D: '1.5' },
    'B', '/questions/test2/q38.svg'),

  q(39, 39, 'Physics', 'Mathematical Tools', 'Graph of Linear Intercept Equation',
    'Which of the following graphs represents equation x/3 + y/4 = 1?',
    {
      A: 'Graph (1)',
      B: 'Graph (2)',
      C: 'Graph (3)',
      D: 'Graph (4)',
    },
    'B', '/questions/test2/q39.svg'),

  q(40, 40, 'Physics', 'Motion in a Straight Line', 'v²/x vs t Graph for Uniform Acceleration',
    'A body starts from rest from origin and moves with constant acceleration. Let v be its velocity at time t and x be its displacement from origin at time t. Choose the correct graph between v²/x and t.',
    {
      A: 'Graph (1)',
      B: 'Graph (2)',
      C: 'Graph (3)',
      D: 'Graph (4)',
    },
    'C', '/questions/test2/q40.svg'),

  q(41, 41, 'Physics', 'Motion in a Straight Line', 'Terminal Speed under Viscous Drag',
    'Acceleration a (in m s⁻²) of an object falling through a fluid is given by a = (8 − 2v) where v is speed of object in m s⁻¹. After a long time, it falls with constant speed. The constant speed is:',
    { A: '8 m s⁻¹', B: '4 m s⁻¹', C: '2 m s⁻¹', D: '6 m s⁻¹' },
    'B'),

  q(42, 42, 'Physics', 'Motion in a Straight Line', 'Minimum Speed to Catch Accelerating Bus',
    'A boy wants to catch a bus at a distance 25 m away from him. Bus starts from rest with constant acceleration 2 m s⁻². The minimum constant speed with which boy should run to catch the bus is:',
    { A: '25 m s⁻¹', B: '12.5 m s⁻¹', C: '8 m s⁻¹', D: '10 m s⁻¹' },
    'D'),

  q(43, 43, 'Physics', 'Units and Measurements', 'Composition of Significant Figures',
    'The significant figures in a measurement consist of:',
    {
      A: 'All reliable digits only',
      B: 'All reliable digits plus first uncertain digit',
      C: 'All uncertain digits only',
      D: 'First reliable digit and all uncertain digits',
    },
    'B'),

  q(44, 44, 'Physics', 'Motion in a Straight Line', 'Time for Velocity to Nullify in a-t Graph',
    'The acceleration-time graph of an object moving in a straight line is shown below. The initial velocity of the object is zero. Find the time when the velocity of object becomes zero again.',
    { A: '8 s', B: '11.65 s', C: '12 s', D: '14 s' },
    'B', '/questions/test2/q44.svg'),

  q(45, 45, 'Physics', 'Motion in a Straight Line', 'Distance Traveled in 3rd Second',
    'For a particle moving in a straight line, position x (in m) as function of time t (in s) is given by, x = 25t − 5t². Distance covered by the particle in the 3rd second of its motion is:',
    { A: 'zero', B: '5 m', C: '10 m', D: '2.5 m' },
    'D'),

  // --- CHEMISTRY: SOME BASIC CONCEPTS OF CHEMISTRY (Questions 46 - 67) ---
  q(46, 47, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Mole Percentage in Benzene',
    'The percentage composition of carbon by moles in benzene is:',
    { A: '25%', B: '50%', C: '75%', D: '35%' },
    'B'),

  q(47, 49, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Temperature Dependence of Concentration Units',
    'How many concentration terms among the following are temperature dependent?\n\nMolarity, Molality, Mole fraction, density, % by mass',
    { A: '2', B: '3', C: '4', D: '5' },
    'A'),

  q(48, 51, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Match List: Mole and Particle Calculations',
    'Match List-I with List-II.\n\nList-I:\n(A) 1g H₂(g)\n(B) 0.2 mol O₂(g)\n(C) 1 g molecules of N₂(g)\n(D) 52 u of He\n\nList-II:\n(I) Weighs 6.4 g\n(II) Weighs 28 g\n(III) Contain 13 atoms\n(IV) Occupies 11.2 L at STP\n\nChoose the correct answer from the options given below:',
    {
      A: 'A-III; B-II; C-IV; D-I',
      B: 'A-II; B-I; C-IV; D-III',
      C: 'A-IV; B-I; C-II; D-III',
      D: 'A-IV; B-II; C-I; D-III',
    },
    'C'),

  q(49, 53, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Dalton\'s Theory and SI Fundamentals',
    'Incorrect statement among the following is:',
    {
      A: 'the SI unit of amount of substance is mole',
      B: 'formula mass is used for NaCl instead of molecular mass.',
      C: 'Dalton’s theory could explain the laws of gaseous volumes.',
      D: 'one atomic mass unit is the mass exactly equal to one-twelfth of the mass of one carbon-12 atom.',
    },
    'C'),

  q(50, 55, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Methane Combustion Oxygen Volume',
    'Volume of O₂(g) required at STP for complete combustion of 8 g of methane is:',
    { A: '5.6 L', B: '22.4 L', C: '11.2 L', D: '2.8 L' },
    'B'),

  q(51, 57, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Molality of Urea Solution',
    'Molality of an aqueous solution of urea (NH₂CONH₂) containing 10% urea by mass is:',
    { A: '2.35 m', B: '1.85 m', C: '0.65 m', D: '3.15 m' },
    'B'),

  q(52, 59, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Validity of Law of Multiple Proportions',
    'Law of multiple proportions is valid for which of following pairs?',
    { A: 'N₂O and N₂O₅', B: 'N₂ and N₂O', C: 'N₂ and O₂', D: 'O₂ and O₃' },
    'A'),

  q(53, 61, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Significant Figures in Scientific Notation',
    'Number of significant figures in 2.01 × 10² is:',
    { A: '3', B: '5', C: '2', D: '4' },
    'A'),

  q(54, 63, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Molecular Formula Determination',
    'The molecular formula of a compound (molar mass = 99 g) containing 25% carbon, 71% chlorine and 4% hydrogen by mass is:',
    { A: 'CH₂Cl₂', B: 'C₂H₄Cl₂', C: 'CH₃Cl', D: 'C₂H₂Cl₂' },
    'B'),

  q(55, 65, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Celsius to Fahrenheit Conversion',
    '0°C is equivalent to:',
    { A: '23 °F', B: '32 °F', C: '16 °F', D: '48 °F' },
    'B'),

  q(56, 67, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Valence Electrons in Nitride Mass Sample',
    'Number of valence electrons in 0.7 g of N³⁻ ion is:',
    { A: '0.4 N_A', B: '0.25 N_A', C: '0.2 N_A', D: '0.65 N_A' },
    'A'),

  q(57, 69, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Mass Percent of Carbon in Carbon Dioxide',
    'Mass percentage of carbon in CO₂ is:',
    { A: '14.83%', B: '32.35%', C: '21.18%', D: '27.27%' },
    'D'),

  q(58, 71, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Mass of Single SO2 Molecule',
    'Mass of one molecule of SO₂ gas at STP is:',
    { A: '64 g', B: '64 / N_A g', C: 'N_A / 64 g', D: '64 N_A g' },
    'B'),

  q(59, 73, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Match List: SI Metric Prefixes',
    'Match List-I with List-II.\n\nList-I (Multiple):\n(A) 10⁻²\n(B) 10⁻⁶\n(C) 10⁻¹²\n(D) 10⁻⁹\n\nList-II (Prefix):\n(I) Micro\n(II) Pico\n(III) Centi\n(IV) Nano\n\nChoose the correct answer from the options given below:',
    {
      A: 'A-III; B-II; C-IV; D-I',
      B: 'A-IV; B-III; C-I; D-II',
      C: 'A-II; B-IV; C-I; D-III',
      D: 'A-III; B-I; C-II; D-IV',
    },
    'D'),

  q(60, 75, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Initial Mass from Removed Molecules',
    'If 1.8 × 10⁻³ mol of H₂ is left after removing 3.011 × 10²¹ molecules of H₂ from its sample, the initial mass of H₂ sample is:',
    { A: '13.6 mg', B: '6.8 mg', C: '3.4 mg', D: '1.52 mg' },
    'A'),

  q(61, 77, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Postulates of Dalton\'s Atomic Theory',
    'The correct postulates of the Dalton\'s atomic theory are:\n(A) Compounds are formed when atoms of different element combine in a fixed ratio.\n(B) Chemical reactions involve reorganisation of atoms.\n(C) All atoms of given element have identical properties.\n(D) Matter consists of divisible atoms.\n(E) Atoms can be created or destroyed in a chemical reaction.\n\nChoose the correct answer from the options given below:',
    {
      A: 'A, B, C only',
      B: 'A, B, D only',
      C: 'B, C, D only',
      D: 'C, D, E only',
    },
    'A'),

  q(62, 79, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Molarity Calculation with Percentage and Density',
    'The molarity of HCl solution containing 36.5% HCl by mass and density 1.4 g mL⁻¹ is:',
    { A: '7 M', B: '10.5 M', C: '14 M', D: '17.5 M' },
    'C'),

  q(63, 81, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Comparing Total Number of Atoms in Given Masses',
    'Number of atoms in the following samples of substance is largest in:',
    { A: '4 g hydrogen gas', B: '32 g ozone', C: '71 g chlorine gas', D: '2.3 g sodium' },
    'A'),

  q(64, 83, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Limiting Reagent in Haber Reaction',
    'Consider the reaction:\nN₂(g) + 3H₂(g) → 2NH₃(g)\n\nIn which of the following combinations, H₂ act as limiting reagent:',
    {
      A: '28 g N₂ + 12 g H₂',
      B: '14 g N₂ + 2 g H₂',
      C: '7 g N₂ + 4 g H₂',
      D: '28 g N₂ + 8 g H₂',
    },
    'B'),

  q(65, 85, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Assertion-Reason: Isotopes and Average Atomic Mass',
    'Given below are two statements: one is labelled as Assertion A and other is labelled as Reason R:\n\nAssertion A: Carbon exist as mixture of three isotopes ¹²C, ¹³C and ¹⁴C.\nReason R: Average atomic mass of carbon is 12.011 u.\n\nIn the light of above statements, choose the correct answer from the options given below:',
    {
      A: 'A is true but R is false.',
      B: 'A is false but R is true.',
      C: 'Both A and R are true and R is the correct explanation of A.',
      D: 'Both A and R are true and R is NOT the correct explanation of A.',
    },
    'D'),

  q(66, 87, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Moles of Solute Invariance on Dilution',
    'On diluting 100 mL of 0.2M NaOH solution by 900 mL of water, the mole of NaOH in resulting diluted solution will be:',
    { A: '0.18 mol', B: '0.0009 mol', C: '0.002 mol', D: '0.02 mol' },
    'D'),

  q(67, 89, 'Chemistry', 'Some Basic Concepts of Chemistry', 'Mass of Oxygen in Water Moles',
    'The amount of oxygen in 0.2 mol of water is:',
    { A: '1.6 g', B: '3.2 g', C: '0.8 g', D: '5.4 g' },
    'B'),
];

export const TEST2_TOTAL_QUESTIONS = test2Questions.length; // 67
export const TEST2_DURATION_MINUTES = 67; // 1 minute per question as per NEET exam strategy
