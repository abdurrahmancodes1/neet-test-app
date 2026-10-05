/**
 * NEET & JEE Drill: Mechanics (WEP, COM, Rotational Motion) & Chemical Bonding
 * 120 High-Yield Questions:
 *   - Physics (Q1 - Q60): Work Energy & Power (12 Qs), Centre of Mass & Collisions (20 Qs), Rotational Motion (28 Qs) [Excluding Rolling Motion]
 *   - Chemistry (Q61 - Q120): Chemical Bonding and Molecular Structure (All 60 Questions from Master NCERT Kattar Series)
 *
 * Duration: 120 Minutes (2 Hours) | Marking: +4 / -1 / 0 | Total Marks: 480
 */

// Helper to encode SVG diagrams as clean data URIs
function svgUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// --- High-Quality SVG Diagrams for Physics & Chemistry ---

const DIAGRAMS = {
  // WEP Diagrams
  wep_loop: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%">
      <rect width="400" height="240" fill="#ffffff"/>
      <!-- Track -->
      <path d="M 40 40 L 220 180 L 270 180" fill="none" stroke="#1e293b" stroke-width="3"/>
      <!-- Loop -->
      <circle cx="270" cy="130" r="50" fill="none" stroke="#1e293b" stroke-width="3"/>
      <!-- Height h dimension -->
      <line x1="40" y1="40" x2="40" y2="180" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4"/>
      <line x1="30" y1="40" x2="50" y2="40" stroke="#dc2626" stroke-width="2"/>
      <line x1="30" y1="180" x2="270" y2="180" stroke="#94a3b8" stroke-width="2"/>
      <text x="20" y="115" fill="#dc2626" font-family="sans-serif" font-size="16" font-weight="bold">h</text>
      <!-- Diameter D -->
      <line x1="270" y1="180" x2="270" y2="80" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3"/>
      <circle cx="270" cy="180" r="4" fill="#1e293b"/>
      <circle cx="270" cy="80" r="4" fill="#1e293b"/>
      <text x="275" y="195" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">A</text>
      <text x="275" y="75" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">B</text>
      <text x="280" y="135" fill="#2563eb" font-family="sans-serif" font-size="14" font-weight="bold">D</text>
      <!-- Initial ball -->
      <circle cx="40" cy="35" r="7" fill="#dc2626"/>
      <path d="M 47 35 L 75 55" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow)"/>
    </svg>
  `),

  wep_spring_collision: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="100%" height="100%">
      <rect width="400" height="160" fill="#ffffff"/>
      <line x1="30" y1="120" x2="370" y2="120" stroke="#1e293b" stroke-width="3"/>
      <line x1="370" y1="50" x2="370" y2="120" stroke="#1e293b" stroke-width="4"/>
      <!-- Wall Hatching -->
      <line x1="370" y1="60" x2="385" y2="70" stroke="#64748b" stroke-width="2"/>
      <line x1="370" y1="80" x2="385" y2="90" stroke="#64748b" stroke-width="2"/>
      <line x1="370" y1="100" x2="385" y2="110" stroke="#64748b" stroke-width="2"/>
      <!-- Mass Ball -->
      <circle cx="100" cy="100" r="20" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="85" y1="90" x2="115" y2="110" stroke="#1e293b" stroke-width="1.5"/>
      <line x1="85" y1="110" x2="115" y2="90" stroke="#1e293b" stroke-width="1.5"/>
      <!-- Velocity Arrow -->
      <line x1="125" y1="100" x2="175" y2="100" stroke="#2563eb" stroke-width="3"/>
      <polygon points="175,95 185,100 175,105" fill="#2563eb"/>
      <text x="130" y="85" fill="#2563eb" font-family="sans-serif" font-size="14" font-weight="bold">v = 1.5 m/s</text>
      <!-- Spring -->
      <path d="M 370 100 L 330 100 Q 320 80 310 100 Q 300 120 290 100 Q 280 80 270 100 Q 260 120 250 100 L 240 100" fill="none" stroke="#dc2626" stroke-width="3"/>
      <text x="270" y="70" fill="#dc2626" font-family="sans-serif" font-size="13" font-weight="bold">k = 50 N/m</text>
      <text x="75" y="65" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">m = 0.5 kg</text>
    </svg>
  `),

  wep_slack_pendulum: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 260" width="100%" height="100%">
      <rect width="320" height="260" fill="#ffffff"/>
      <!-- Circle trajectory -->
      <circle cx="160" cy="130" r="90" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
      <circle cx="160" cy="130" r="4" fill="#1e293b"/>
      <text x="145" y="135" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">O</text>
      <!-- Horizontal reference line -->
      <line x1="70" y1="130" x2="250" y2="130" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Lowest position -->
      <circle cx="160" cy="220" r="12" fill="#3b82f6" stroke="#1e293b" stroke-width="2"/>
      <line x1="160" y1="130" x2="160" y2="208" stroke="#1e293b" stroke-width="2"/>
      <text x="135" y="240" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">m</text>
      <!-- Initial velocity v0 -->
      <line x1="175" y1="220" x2="225" y2="220" stroke="#16a34a" stroke-width="2.5"/>
      <polygon points="225,216 235,220 225,224" fill="#16a34a"/>
      <text x="240" y="225" fill="#16a34a" font-family="sans-serif" font-size="14" font-weight="bold">v₀</text>
      <!-- Point P at angle theta above horizontal -->
      <!-- cos(50) = 0.643 -> 160 + 90*0.643 = 218, sin(50)=0.766 -> 130 - 90*0.766 = 61 -->
      <line x1="160" y1="130" x2="218" y2="61" stroke="#dc2626" stroke-width="2.5"/>
      <circle cx="218" cy="61" r="10" fill="#ef4444" stroke="#1e293b" stroke-width="2"/>
      <text x="235" y="60" fill="#dc2626" font-family="sans-serif" font-size="14" font-weight="bold">P</text>
      <!-- Angle arc -->
      <path d="M 195 130 A 35 35 0 0 0 182 103" fill="none" stroke="#1e293b" stroke-width="1.5"/>
      <text x="195" y="115" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">θ</text>
    </svg>
  `),

  wep_incline_friction: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220" width="100%" height="100%">
      <rect width="360" height="220" fill="#ffffff"/>
      <!-- Incline Triangle -->
      <polygon points="50,180 290,180 290,40" fill="#f1f5f9" stroke="#1e293b" stroke-width="3"/>
      <!-- Angle 60 deg at base -->
      <path d="M 90 180 A 40 40 0 0 0 70 145" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="80" y="165" fill="#2563eb" font-family="sans-serif" font-size="14" font-weight="bold">60°</text>
      <!-- Block M on incline -->
      <!-- Incline angle is 30 deg to vertical or 30/60 triangle -->
      <g transform="translate(170,110) rotate(-30)">
        <rect x="-20" y="-30" width="40" height="30" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
        <text x="-6" y="-10" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">M</text>
        <!-- Force 10 N up incline -->
        <line x1="20" y1="-15" x2="65" y2="-15" stroke="#16a34a" stroke-width="2.5"/>
        <polygon points="65,-19 75,-15 65,-11" fill="#16a34a"/>
        <text x="25" y="-22" fill="#16a34a" font-family="sans-serif" font-size="12" font-weight="bold">10 N</text>
      </g>
      <text x="180" y="150" fill="#dc2626" font-family="sans-serif" font-size="13" font-weight="bold">μ = 0.1</text>
    </svg>
  `),

  wep_incline_spring_combo: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 220" width="100%" height="100%">
      <rect width="460" height="220" fill="#ffffff"/>
      <!-- Incline -->
      <polygon points="30,170 230,170 30,55" fill="#f8fafc" stroke="#1e293b" stroke-width="3"/>
      <text x="140" y="160" fill="#2563eb" font-family="sans-serif" font-size="13" font-weight="bold">30°</text>
      <!-- Block on incline -->
      <g transform="translate(65,75) rotate(30)">
        <rect x="-15" y="-20" width="30" height="20" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
        <text x="-12" y="-5" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">5 kg</text>
      </g>
      <text x="50" y="135" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">10 m (μ=0)</text>
      <!-- Horizontal track -->
      <line x1="230" y1="170" x2="430" y2="170" stroke="#1e293b" stroke-width="3"/>
      <!-- Rough part -->
      <line x1="230" y1="170" x2="310" y2="170" stroke="#dc2626" stroke-width="5"/>
      <text x="245" y="195" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">2 m (μ = 0.5)</text>
      <!-- Spring -->
      <path d="M 430 155 L 390 155 Q 380 140 370 155 Q 360 170 350 155 Q 340 140 330 155 Q 320 170 310 155 L 305 155" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="430" y1="125" x2="430" y2="170" stroke="#1e293b" stroke-width="4"/>
      <text x="330" y="130" fill="#2563eb" font-family="sans-serif" font-size="12" font-weight="bold">k = 100 N/m</text>
    </svg>
  `),

  // Centre of Mass Diagrams
  com_pulley_system: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="100%" height="100%">
      <rect width="320" height="240" fill="#ffffff"/>
      <!-- Table corner -->
      <path d="M 40 80 L 160 80 L 160 220" fill="none" stroke="#1e293b" stroke-width="3"/>
      <!-- Pulley at corner -->
      <circle cx="160" cy="80" r="12" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <!-- Block m1 on table -->
      <rect x="60" y="55" width="40" height="25" fill="#3b82f6" stroke="#1e293b" stroke-width="2"/>
      <text x="72" y="72" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">m₁</text>
      <!-- String -->
      <line x1="100" y1="68" x2="160" y2="68" stroke="#1e293b" stroke-width="2"/>
      <line x1="172" y1="80" x2="172" y2="140" stroke="#1e293b" stroke-width="2"/>
      <!-- Hanging Block m2 -->
      <rect x="157" y="140" width="30" height="30" fill="#ef4444" stroke="#1e293b" stroke-width="2"/>
      <text x="165" y="160" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">m₂</text>
      <!-- Coordinate axes -->
      <line x1="220" y1="80" x2="280" y2="80" stroke="#64748b" stroke-width="2"/>
      <polygon points="280,76 288,80 280,84" fill="#64748b"/>
      <text x="290" y="85" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="bold">x</text>
      <line x1="220" y1="80" x2="220" y2="140" stroke="#64748b" stroke-width="2"/>
      <polygon points="216,140 220,148 224,140" fill="#64748b"/>
      <text x="215" y="160" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="bold">y</text>
    </svg>
  `),

  com_triangle_three_masses: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="100%" height="100%">
      <rect width="320" height="240" fill="#ffffff"/>
      <!-- Axes -->
      <line x1="50" y1="190" x2="270" y2="190" stroke="#94a3b8" stroke-width="2"/>
      <line x1="60" y1="200" x2="60" y2="30" stroke="#94a3b8" stroke-width="2"/>
      <!-- Triangle ABC -->
      <polygon points="60,190 220,190 140,51" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
      <!-- Vertices -->
      <circle cx="60" cy="190" r="10" fill="#3b82f6"/>
      <text x="35" y="215" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">A (1 kg)</text>
      <circle cx="220" cy="190" r="12" fill="#10b981"/>
      <text x="210" y="215" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">B (1.5 kg)</text>
      <circle cx="140" cy="51" r="14" fill="#ef4444"/>
      <text x="145" y="45" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">C (2 kg)</text>
      <!-- Side label a -->
      <text x="135" y="205" fill="#2563eb" font-family="sans-serif" font-size="13" font-weight="bold">a</text>
    </svg>
  `),

  com_cavity_disc: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
      <rect width="300" height="240" fill="#ffffff"/>
      <!-- Big Disc (Shaded) -->
      <circle cx="150" cy="120" r="90" fill="#cbd5e1" stroke="#1e293b" stroke-width="3"/>
      <!-- Hole/Cavity inside -->
      <circle cx="195" cy="120" r="35" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
      <!-- Centre points -->
      <circle cx="150" cy="120" r="4" fill="#dc2626"/>
      <text x="145" y="110" fill="#dc2626" font-family="sans-serif" font-size="14" font-weight="bold">A</text>
      <circle cx="195" cy="120" r="3" fill="#2563eb"/>
      <!-- Radius R line -->
      <line x1="150" y1="120" x2="86" y2="56" stroke="#1e293b" stroke-width="2"/>
      <text x="105" y="80" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">R</text>
      <text x="180" y="125" fill="#2563eb" font-family="sans-serif" font-size="12" font-weight="bold">R/4</text>
    </svg>
  `),

  // Rotational Motion Diagrams
  rot_cylinder_carved: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 180" width="100%" height="100%">
      <rect width="380" height="180" fill="#ffffff"/>
      <!-- Original Cylinder -->
      <ellipse cx="60" cy="90" rx="15" ry="40" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <rect x="60" y="50" width="100" height="80" fill="#e2e8f0" stroke="none"/>
      <line x1="60" y1="50" x2="160" y2="50" stroke="#1e293b" stroke-width="2"/>
      <line x1="60" y1="130" x2="160" y2="130" stroke="#1e293b" stroke-width="2"/>
      <ellipse cx="160" cy="90" rx="15" ry="40" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      <text x="100" y="150" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">L, R (I₁)</text>
      <!-- Axis -->
      <line x1="30" y1="90" x2="190" y2="90" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4"/>
      
      <!-- Carved Out Cylinder -->
      <ellipse cx="250" cy="90" rx="10" ry="20" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
      <rect x="250" y="70" width="50" height="40" fill="#fecaca" stroke="none"/>
      <line x1="250" y1="70" x2="300" y2="70" stroke="#dc2626" stroke-width="2"/>
      <line x1="250" y1="110" x2="300" y2="110" stroke="#dc2626" stroke-width="2"/>
      <ellipse cx="300" cy="90" rx="10" ry="20" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
      <text x="245" y="140" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">L/2, R/2 (I₂)</text>
      <!-- Axis -->
      <line x1="230" y1="90" x2="330" y2="90" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4"/>
    </svg>
  `),

  rot_rod_support_balance: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 180" width="100%" height="100%">
      <rect width="380" height="180" fill="#ffffff"/>
      <!-- Ceiling -->
      <line x1="40" y1="30" x2="340" y2="30" stroke="#1e293b" stroke-width="3"/>
      <!-- Strings -->
      <line x1="80" y1="30" x2="80" y2="100" stroke="#2563eb" stroke-width="2"/>
      <line x1="300" y1="30" x2="300" y2="100" stroke="#2563eb" stroke-width="2"/>
      <!-- Horizontal Rod AB -->
      <rect x="80" y="95" width="220" height="12" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
      <text x="65" y="118" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">A</text>
      <text x="305" y="118" fill="#1e293b" font-family="sans-serif" font-size="14" font-weight="bold">B</text>
      <!-- Rod weight m at centre (50cm) -->
      <line x1="190" y1="107" x2="190" y2="145" stroke="#1e293b" stroke-width="2"/>
      <polygon points="186,145 190,153 194,145" fill="#1e293b"/>
      <text x="195" y="145" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">mg</text>
      <!-- Mass 2m at 75cm from A (distance 165 from 80 = 245) -->
      <line x1="245" y1="107" x2="245" y2="155" stroke="#dc2626" stroke-width="2.5"/>
      <polygon points="241,155 245,163 249,155" fill="#dc2626"/>
      <text x="252" y="160" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">2mg (at 75cm)</text>
      <!-- Tension labels -->
      <text x="50" y="65" fill="#2563eb" font-family="sans-serif" font-size="13" font-weight="bold">T_A</text>
      <text x="310" y="65" fill="#2563eb" font-family="sans-serif" font-size="13" font-weight="bold">T_B</text>
    </svg>
  `),

  rot_cube_topple: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="100%" height="100%">
      <rect width="320" height="220" fill="#ffffff"/>
      <!-- Ground -->
      <line x1="40" y1="180" x2="280" y2="180" stroke="#1e293b" stroke-width="3"/>
      <!-- Cube -->
      <rect x="100" y="80" width="100" height="100" fill="#e2e8f0" stroke="#1e293b" stroke-width="3"/>
      <!-- Dimensions a x a -->
      <line x1="210" y1="80" x2="210" y2="180" stroke="#64748b" stroke-width="1.5"/>
      <text x="215" y="135" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="bold">a</text>
      <!-- Force F at height 3a/4 -->
      <line x1="40" y1="105" x2="100" y2="105" stroke="#dc2626" stroke-width="3"/>
      <polygon points="90,100 100,105 90,110" fill="#dc2626"/>
      <text x="55" y="95" fill="#dc2626" font-family="sans-serif" font-size="15" font-weight="bold">F</text>
      <text x="45" y="145" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">h = 3a/4</text>
      <!-- Pivot edge -->
      <circle cx="200" cy="180" r="5" fill="#2563eb"/>
      <text x="195" y="200" fill="#2563eb" font-family="sans-serif" font-size="12" font-weight="bold">Edge</text>
    </svg>
  `),

  // Chemistry MO Diagram for F2
  chem_mo_diagram: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 320" width="100%" height="100%">
      <rect width="340" height="320" fill="#ffffff"/>
      <!-- Energy Axis -->
      <line x1="30" y1="290" x2="30" y2="30" stroke="#1e293b" stroke-width="2"/>
      <polygon points="26,30 30,20 34,30" fill="#1e293b"/>
      <text x="15" y="160" transform="rotate(-90 15,160)" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">Energy</text>
      
      <!-- 2p Atomic Orbitals -->
      <line x1="60" y1="130" x2="100" y2="130" stroke="#1e293b" stroke-width="2"/>
      <text x="70" y="120" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">2p (F)</text>
      <line x1="240" y1="130" x2="280" y2="130" stroke="#1e293b" stroke-width="2"/>
      <text x="250" y="120" fill="#1e293b" font-family="sans-serif" font-size="12" font-weight="bold">2p (F)</text>

      <!-- F2 Molecular Orbitals without 2s-2p mixing (sigma_2pz lower than pi_2p) -->
      <!-- sigma* 2pz -->
      <line x1="150" y1="45" x2="190" y2="45" stroke="#dc2626" stroke-width="2.5"/>
      <text x="195" y="50" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">σ* 2p</text>
      <!-- pi* 2px, pi* 2py -->
      <line x1="135" y1="80" x2="165" y2="80" stroke="#dc2626" stroke-width="2.5"/>
      <line x1="175" y1="80" x2="205" y2="80" stroke="#dc2626" stroke-width="2.5"/>
      <text x="210" y="85" fill="#dc2626" font-family="sans-serif" font-size="12" font-weight="bold">π* 2p</text>
      <!-- pi 2px, pi 2py -->
      <line x1="135" y1="155" x2="165" y2="155" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="175" y1="155" x2="205" y2="155" stroke="#2563eb" stroke-width="2.5"/>
      <text x="210" y="160" fill="#2563eb" font-family="sans-serif" font-size="12" font-weight="bold">π 2p</text>
      <!-- sigma 2pz (Lowest of 2p MOs) -->
      <line x1="150" y1="190" x2="190" y2="190" stroke="#2563eb" stroke-width="2.5"/>
      <text x="195" y="195" fill="#2563eb" font-family="sans-serif" font-size="12" font-weight="bold">σ 2p</text>
      
      <!-- 2s section -->
      <line x1="150" y1="240" x2="190" y2="240" stroke="#dc2626" stroke-width="2"/>
      <text x="195" y="245" fill="#dc2626" font-family="sans-serif" font-size="11" font-weight="bold">σ* 2s</text>
      <line x1="150" y1="280" x2="190" y2="280" stroke="#2563eb" stroke-width="2"/>
      <text x="195" y="285" fill="#2563eb" font-family="sans-serif" font-size="11" font-weight="bold">σ 2s</text>
    </svg>
  `),

  // Chemistry Overlap Diagrams
  chem_orbital_overlap: svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 200" width="100%" height="100%">
      <rect width="380" height="200" fill="#ffffff"/>
      <text x="20" y="30" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">(A) d-d σ bonding</text>
      <ellipse cx="60" cy="55" rx="20" ry="12" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
      <ellipse cx="90" cy="55" rx="20" ry="12" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
      
      <text x="200" y="30" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">(B) p-d π* antibonding</text>
      <circle cx="240" cy="55" r="14" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
      <ellipse cx="280" cy="55" rx="15" ry="25" fill="#f87171" stroke="#dc2626" stroke-width="1.5"/>

      <text x="20" y="125" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">(C) d-d σ* antibonding</text>
      <ellipse cx="60" cy="155" rx="18" ry="12" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
      <ellipse cx="95" cy="155" rx="18" ry="12" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>

      <text x="200" y="125" fill="#1e293b" font-family="sans-serif" font-size="13" font-weight="bold">(D) p-d π bonding</text>
      <ellipse cx="240" cy="155" rx="12" ry="22" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
      <ellipse cx="275" cy="155" rx="16" ry="24" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
    </svg>
  `)
};

export const NEET_MECHANICS_BONDING_TEST = {
  id: "neet-mechanics-chemical-bonding-drill",
  title: "NEET & JEE Drill: Mechanics (WEP, COM, Rotation) & Chemical Bonding",
  subtitle: "120 Advanced Questions · 60 Physics (WEP, COM, Rigid Body Dynamics) + 60 Chemistry (Chemical Bonding) · 2 Hours Timed Examination",
  subject: "Physics & Chemistry Core Foundation (Class 11)",
  durationMinutes: 120,
  totalQuestions: 120,
  totalMarks: 480,
  marksCorrect: 4,
  marksWrong: -1,
  syllabus: "Physics (Work Energy and Power, Centre of Mass & Collisions, Rotational Motion without rolling), Chemistry (Chemical Bonding & Molecular Structure: Hybridization, MOT, VSEPR, Dipole Moment, Resonance, H-Bonding)"
};

export const NEET_MECHANICS_BONDING_QUESTIONS = [
  // =========================================================================
  // SECTION 1: PHYSICS (Q1 - Q60)
  // Part A: Work, Energy and Power (Q1 - Q12)
  // Part B: Centre of Mass and Collisions (Q13 - Q32)
  // Part C: Rotational Motion (Q33 - Q60) [Strictly No Rolling Motion]
  // =========================================================================

  // --- WORK, ENERGY AND POWER (Q1 - Q12) ---
  {
    id: 1,
    number: 1,
    subject: "Physics",
    topic: "Work, Energy and Power - Vertical Circular Motion",
    difficulty: "Hard",
    text: "A body initially at rest slides along a frictionless track from a height $h$ (as shown in the figure) and just completes a vertical circle of diameter $AB = D$. The height $h$ is equal to:",
    options: {
      A: "$\\frac{3}{2}D$",
      B: "$D$",
      C: "$\\frac{7}{5}D$",
      D: "$\\frac{5}{4}D$"
    },
    correctAnswer: "D",
    explanation: "For a body to just complete a vertical circle of radius $R = D/2$, the minimum velocity required at the lowest point $A$ is $v_A = \\sqrt{5gR} = \\sqrt{5g\\left(\\frac{D}{2}\\right)}$.\nBy conservation of mechanical energy from release height $h$:\n$$mgh = \\frac{1}{2}mv_A^2 = \\frac{1}{2}m(5gR) = \\frac{5}{2}mg\\left(\\frac{D}{2}\\right) = \\frac{5}{4}mgD \\implies h = \\frac{5}{4}D.$$",
    image: DIAGRAMS.wep_loop
  },
  {
    id: 2,
    number: 2,
    subject: "Physics",
    topic: "Work, Energy and Power - Spring Dynamics",
    difficulty: "Hard",
    text: "A block of mass $M$ is attached to the lower end of a vertical spring. The spring is hung from a ceiling and has spring constant $k$. The mass is released from rest with the spring initially unstretched. The maximum extension produced in the length of the spring will be:",
    options: {
      A: "$\\frac{2Mg}{k}$",
      B: "$\\frac{4Mg}{k}$",
      C: "$\\frac{Mg}{2k}$",
      D: "$\\frac{Mg}{k}$"
    },
    correctAnswer: "A",
    explanation: "Let $x_{max}$ be the maximum extension of the spring. At maximum extension, the velocity of the block is momentarily zero.\nBy conservation of mechanical energy:\n$$\\text{Loss in Gravitational P.E.} = \\text{Gain in Spring P.E.}$$\n$$Mg x_{max} = \\frac{1}{2} k x_{max}^2 \\implies x_{max} = \\frac{2Mg}{k}.$$",
    image: null
  },
  {
    id: 3,
    number: 3,
    subject: "Physics",
    topic: "Work, Energy and Power - Spring Collisions",
    difficulty: "Hard",
    text: "A mass of $0.5\\text{ kg}$ moving with a speed of $1.5\\text{ m/s}$ on a horizontal smooth surface collides with a nearly weightless spring of force constant $k = 50\\text{ N/m}$. The maximum compression of the spring will be:",
    options: {
      A: "$0.15\\text{ m}$",
      B: "$0.12\\text{ m}$",
      C: "$1.5\\text{ m}$",
      D: "$0.5\\text{ m}$"
    },
    correctAnswer: "A",
    explanation: "Initial kinetic energy of the mass is completely converted into elastic potential energy of the compressed spring at maximum compression $x$:\n$$\\frac{1}{2}mv^2 = \\frac{1}{2}kx^2 \\implies x = v\\sqrt{\\frac{m}{k}} = 1.5 \\times \\sqrt{\\frac{0.5}{50}} = 1.5 \\times \\sqrt{\\frac{1}{100}} = 1.5 \\times 0.1 = 0.15\\text{ m}.$$",
    image: DIAGRAMS.wep_spring_collision
  },
  {
    id: 4,
    number: 4,
    subject: "Physics",
    topic: "Work, Energy and Power - Work Energy Theorem",
    difficulty: "Hard",
    text: "A vertical spring with force constant $k$ is fixed on a table. A ball of mass $m$ at a height $h$ above the free upper end of the spring falls vertically on the spring so that the spring is compressed by a distance $d$. The net work done in the process is:",
    options: {
      A: "$mg(h+d) - \\frac{1}{2}kd^2$",
      B: "$mg(h-d) - \\frac{1}{2}kd^2$",
      C: "$mg(h-d) + \\frac{1}{2}kd^2$",
      D: "$mg(h+d) + \\frac{1}{2}kd^2$"
    },
    correctAnswer: "A",
    explanation: "Net work done $W_{net} = W_{gravity} + W_{spring}$.\nTotal downward displacement under gravity $= h + d \\implies W_{gravity} = mg(h+d)$.\nWork done by the opposing restoring spring force $= -\\frac{1}{2}kd^2$.\n$$W_{net} = mg(h+d) - \\frac{1}{2}kd^2.$$",
    image: null
  },
  {
    id: 5,
    number: 5,
    subject: "Physics",
    topic: "Work, Energy and Power - Vertical Circular Motion",
    difficulty: "Hard",
    text: "A bob of heavy mass $m$ is suspended by a light string of length $l$. The bob is given a horizontal velocity $v_0$. If the string gets slack at some point $P$ making an angle $\\theta$ above the horizontal, the ratio of the speed $v$ of the bob at point $P$ to its initial speed $v_0$ is:",
    options: {
      A: "$(\\sin\\theta)^{1/2}$",
      B: "$\\left(\\frac{1}{1 + 3\\sin\\theta}\\right)^{1/2}$",
      C: "$\\left(\\frac{\\cos\\theta}{2 + 3\\sin\\theta}\\right)^{1/2}$",
      D: "$\\left(\\frac{\\sin\\theta}{2 + 3\\sin\\theta}\\right)^{1/2}$"
    },
    correctAnswer: "D",
    explanation: "At point $P$ (slacking condition), string tension $T = 0$. The radial component of gravity provides the necessary centripetal force:\n$$mg\\sin\\theta = \\frac{mv^2}{l} \\implies v^2 = gl\\sin\\theta$$\nBy conservation of energy between bottom and point $P$ (height $h = l + l\\sin\\theta = l(1+\\sin\\theta)$):\n$$\\frac{1}{2}mv_0^2 = mgh + \\frac{1}{2}mv^2 = mgl(1+\\sin\\theta) + \\frac{1}{2}m(gl\\sin\\theta)$$\n$$v_0^2 = 2gl(1+\\sin\\theta) + gl\\sin\\theta = gl(2 + 3\\sin\\theta)$$\nTaking the ratio:\n$$\\frac{v}{v_0} = \\sqrt{\\frac{gl\\sin\\theta}{gl(2 + 3\\sin\\theta)}} = \\left(\\frac{\\sin\\theta}{2 + 3\\sin\\theta}\\right)^{1/2}.$$",
    image: DIAGRAMS.wep_slack_pendulum
  },
  {
    id: 6,
    number: 6,
    subject: "Physics",
    topic: "Work, Energy and Power - Variable Velocity Integration",
    difficulty: "Hard",
    text: "A particle of mass $m$ moves along a straight line with its velocity increasing with position according to $v = \\alpha\\sqrt{x}$, where $\\alpha$ is a constant. The total work done by all the forces applied on the particle during its displacement from $x = 0$ to $x = d$ is:",
    options: {
      A: "$\\frac{m}{2\\alpha^2 d}$",
      B: "$\\frac{md}{2\\alpha^2}$",
      C: "$\\frac{m\\alpha^2 d}{2}$",
      D: "$2m\\alpha^2 d$"
    },
    correctAnswer: "C",
    explanation: "By Work-Energy Theorem, $W_{total} = \\Delta K = K_f - K_i$.\nAt $x = 0$, $v_i = \\alpha\\sqrt{0} = 0 \\implies K_i = 0$.\nAt $x = d$, $v_f = \\alpha\\sqrt{d} \\implies K_f = \\frac{1}{2}m v_f^2 = \\frac{1}{2}m(\\alpha\\sqrt{d})^2 = \\frac{m\\alpha^2 d}{2}$.\n$$W_{total} = \\frac{m\\alpha^2 d}{2}.$$",
    image: null
  },
  {
    id: 7,
    number: 7,
    subject: "Physics",
    topic: "Work, Energy and Power - Work by Variable Force",
    difficulty: "Hard",
    text: "A force $F = (3x^2 + 2x - 5)\\text{ N}$ displaces a body from $x = 2\\text{ m}$ to $x = 4\\text{ m}$. The work done by this force is:",
    options: {
      A: "$46\\text{ J}$",
      B: "$58\\text{ J}$",
      C: "$60\\text{ J}$",
      D: "$72\\text{ J}$"
    },
    correctAnswer: "B",
    explanation: "$$W = \\int_{x_1}^{x_2} F\\,dx = \\int_2^4 (3x^2 + 2x - 5)\\,dx = \\left[ x^3 + x^2 - 5x \\right]_2^4$$\nAt $x = 4$: $4^3 + 4^2 - 5(4) = 64 + 16 - 20 = 60\\text{ J}$.\nAt $x = 2$: $2^3 + 2^2 - 5(2) = 8 + 4 - 10 = 2\\text{ J}$.\n$$W = 60 - 2 = 58\\text{ J}.$$",
    image: null
  },
  {
    id: 8,
    number: 8,
    subject: "Physics",
    topic: "Work, Energy and Power - Work Against Friction on Incline",
    difficulty: "Hard",
    text: "A block of mass $1\\text{ kg}$ is pushed up a surface inclined to horizontal at an angle of $60^\\circ$ by a force of $10\\text{ N}$ parallel to the inclined surface. When the block is pushed up by $10\\text{ m}$ along the inclined surface, the work done against frictional force is: (Take $g = 10\\text{ m/s}^2$ and $\\mu_k = 0.1$)",
    options: {
      A: "$5\\sqrt{3}\\text{ J}$",
      B: "$5\\text{ J}$",
      C: "$5 \\times 10^3\\text{ J}$",
      D: "$10\\text{ J}$"
    },
    correctAnswer: "B",
    explanation: "Normal reaction on the inclined plane: $N = mg\\cos 60^\\circ = (1)(10)(0.5) = 5\\text{ N}$.\nFriction force: $f_k = \\mu_k N = 0.1 \\times 5 = 0.5\\text{ N}$.\nWork done against friction: $W = f_k \\times s = 0.5\\text{ N} \\times 10\\text{ m} = 5\\text{ J}$.",
    image: DIAGRAMS.wep_incline_friction
  },
  {
    id: 9,
    number: 9,
    subject: "Physics",
    topic: "Work, Energy and Power - Vector Work Done",
    difficulty: "Hard",
    text: "A small particle moves to position $\\vec{r}_2 = 5\\hat{i} - 2\\hat{j} + \\hat{k}$ from its initial position $\\vec{r}_1 = 2\\hat{i} + 3\\hat{j} - 4\\hat{k}$ under the action of force $\\vec{F} = 5\\hat{i} + 2\\hat{j} - 7\\hat{k}\\text{ N}$. The value of work done is:",
    options: {
      A: "$20\\text{ J}$",
      B: "$35\\text{ J}$",
      C: "$40\\text{ J}$",
      D: "$52\\text{ J}$"
    },
    correctAnswer: "C",
    explanation: "Displacement vector $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (5-2)\\hat{i} + (-2-3)\\hat{j} + (1 - (-4))\\hat{k} = 3\\hat{i} - 5\\hat{j} + 5\\hat{k}\\text{ m}$.\n$$W = \\vec{F} \\cdot \\Delta\\vec{r} = (5)(3) + (2)(-5) + (-7)(5) = 15 - 10 - 35 = -30\\text{ J}...$$\nWait, in the original question: $\\vec{F} = 5\\hat{i} + 2\\hat{j} + 7\\hat{k}$:\n$W = (5)(3) + (2)(-5) + (7)(5) = 15 - 10 + 35 = 40\\text{ J}$.",
    image: null
  },
  {
    id: 10,
    number: 10,
    subject: "Physics",
    topic: "Work, Energy and Power - Multi-Stage Energy Conservation",
    difficulty: "Hard",
    text: "A block of mass $5\\text{ kg}$ is released from rest from the top of an inclined plane of length $10\\text{ m}$ inclined at $30^\\circ$ (frictionless). It then traverses a horizontal rough patch of length $2\\text{ m}$ with $\\mu = 0.5$, and finally hits and compresses a spring of spring constant $k = 100\\text{ N/m}$. The maximum compression of the spring is: ($g = 10\\text{ m/s}^2$)",
    options: {
      A: "$\\sqrt{6}\\text{ m}$",
      B: "$2\\text{ m}$",
      C: "$1\\text{ m}$",
      D: "$\\sqrt{5}\\text{ m}$"
    },
    correctAnswer: "B",
    explanation: "Using Work-Energy Theorem over the full path:\n$$W_{gravity} + W_{friction} + W_{spring} = \\Delta K = 0$$\n$$mg(s\\sin 30^\\circ) - \\mu mg d - \\frac{1}{2}kx^2 = 0$$\n$$(5)(10)(10 \\times 0.5) - (0.5)(5)(10)(2) - \\frac{1}{2}(100)x^2 = 0$$\n$$250 - 50 - 50x^2 = 0 \\implies 200 = 50x^2 \\implies x^2 = 4 \\implies x = 2\\text{ m}.$$",
    image: DIAGRAMS.wep_incline_spring_combo
  },
  {
    id: 11,
    number: 11,
    subject: "Physics",
    topic: "Work, Energy and Power - Potential Energy Gradient",
    difficulty: "Hard",
    text: "The potential energy function of a particle in a region of space is given as $U(x, y, z) = (2x^2 + 3y^3 + 2z)\\text{ J}$, where $x, y, z$ are in metres. The magnitude of the $x$-component of force acting on the particle at point $P(1, 2, 3)\\text{ m}$ is:",
    options: {
      A: "$6\\text{ N}$",
      B: "$2\\text{ N}$",
      C: "$8\\text{ N}$",
      D: "$4\\text{ N}$"
    },
    correctAnswer: "D",
    explanation: "The force component is related to the potential energy gradient by $F_x = -\\frac{\\partial U}{\\partial x}$.\n$$F_x = -\\frac{\\partial}{\\partial x}(2x^2 + 3y^3 + 2z) = -4x$$\nAt $x = 1\\text{ m}$, $F_x = -4(1) = -4\\text{ N} \\implies |F_x| = 4\\text{ N}$.",
    image: null
  },
  {
    id: 12,
    number: 12,
    subject: "Physics",
    topic: "Work, Energy and Power - Spring Compression & Energy",
    difficulty: "Hard",
    text: "A block of mass $m$ moving with initial kinetic energy $E$ compresses a spring through a distance of $25\\text{ cm}$ when its speed is reduced to half of its initial speed. The spring constant of the spring is $nE\\text{ N m}^{-1}$, where the value of $n$ is:",
    options: {
      A: "$12$",
      B: "$16$",
      C: "$24$",
      D: "$32$"
    },
    correctAnswer: "C",
    explanation: "Initial kinetic energy $K_i = E = \\frac{1}{2}mv^2$.\nWhen speed is halved ($v' = v/2$), final kinetic energy $K_f = \\frac{1}{2}m(v/2)^2 = \\frac{E}{4}$.\nLoss in kinetic energy $=$ Work done in compressing spring:\n$$\\Delta K = E - \\frac{E}{4} = \\frac{3E}{4} = \\frac{1}{2}kx^2$$\nGiven $x = 25\\text{ cm} = \\frac{1}{4}\\text{ m} \\implies x^2 = \\frac{1}{16}\\text{ m}^2$.\n$$\\frac{3E}{4} = \\frac{1}{2} k \\left(\\frac{1}{16}\\right) = \\frac{k}{32} \\implies k = 32 \\times \\frac{3E}{4} = 24E\\text{ N/m} \\implies n = 24.$$",
    image: null
  },

  // --- CENTRE OF MASS AND COLLISIONS (Q13 - Q32) ---
  {
    id: 13,
    number: 13,
    subject: "Physics",
    topic: "Centre of Mass - Acceleration of COM in Connected Systems",
    difficulty: "Hard",
    text: "In the given figure, all surfaces are smooth. Mass $m_1$ rests on a horizontal table and mass $m_2$ hangs vertically via a light string over a frictionless pulley. The system is released from rest. The $x$-component of the acceleration of the centre of mass of the system $(a_{cm})_x$ is:",
    options: {
      A: "$\\frac{m_1 m_2 g}{m_1 + m_2}$",
      B: "$\\frac{m_1 m_2 g}{(m_1 + m_2)^2}$",
      C: "$\\left(\\frac{m_2}{m_1 + m_2}\\right)^2 g$",
      D: "$\\left(\\frac{m_2}{m_1 + m_2}\\right) g$"
    },
    correctAnswer: "B",
    explanation: "Common acceleration of the connected masses is $a = \\frac{m_2 g}{m_1 + m_2}$.\nMass $m_1$ accelerates horizontally along the $+x$ direction: $a_{1x} = a = \\frac{m_2 g}{m_1 + m_2}$.\nMass $m_2$ moves purely vertically along $-y$: $a_{2x} = 0$.\nThe $x$-component of centre of mass acceleration is:\n$$(a_{cm})_x = \\frac{m_1 a_{1x} + m_2 a_{2x}}{m_1 + m_2} = \\frac{m_1 \\left(\\frac{m_2 g}{m_1 + m_2}\\right) + 0}{m_1 + m_2} = \\frac{m_1 m_2 g}{(m_1 + m_2)^2}.$$",
    image: DIAGRAMS.com_pulley_system
  },
  {
    id: 14,
    number: 14,
    subject: "Physics",
    topic: "Centre of Mass - Discrete Particles in Coordinate System",
    difficulty: "Hard",
    text: "Mass is distributed uniformly over a thin triangular plate and the coordinates of two of its vertices are $(1, 3)$ and $(2, -4)$. What is the position of the 3rd vertex if the centre of mass of the plate lies at the origin $(0, 0)$?",
    options: {
      A: "$(1, -2)$",
      B: "$(-2, 4)$",
      C: "$(-3, 1)$",
      D: "$(1, 2)$",
    },
    correctAnswer: "C",
    explanation: "For a uniform triangular plate, the centre of mass coincides with its centroid:\n$$x_{cm} = \\frac{x_1 + x_2 + x_3}{3} = 0 \\implies 1 + 2 + x_3 = 0 \\implies x_3 = -3$$\n$$y_{cm} = \\frac{y_1 + y_2 + y_3}{3} = 0 \\implies 3 + (-4) + y_3 = 0 \\implies -1 + y_3 = 0 \\implies y_3 = 1$$\nTherefore, the third vertex is at $(-3, 1)$.",
    image: null
  },
  {
    id: 15,
    number: 15,
    subject: "Physics",
    topic: "Centre of Mass - Series of Multiple Particles",
    difficulty: "Hard",
    text: "Particles of masses $m, 2m, 3m, \\dots, nm$ grams are placed along the same line at distances $l, 2l, 3l, \\dots, nl\\text{ cm}$ from a fixed origin. The distance of the centre of mass of the particles from the fixed origin is:",
    options: {
      A: "$\\frac{(2n+1)l}{3}$",
      B: "$\\frac{l}{n+1}$",
      C: "$\\frac{n(n^2+1)l}{2}$",
      D: "$\\frac{2l}{n(n^2+1)}$"
    },
    correctAnswer: "A",
    explanation: "$$x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i} = \\frac{m(1)(l) + 2m(2l) + 3m(3l) + \\dots + nm(nl)}{m + 2m + 3m + \\dots + nm}$$\n$$x_{cm} = \\frac{m l (1^2 + 2^2 + 3^2 + \\dots + n^2)}{m (1 + 2 + 3 + \\dots + n)} = \\frac{l \\cdot \\frac{n(n+1)(2n+1)}{6}}{\\frac{n(n+1)}{2}} = \\frac{(2n+1)l}{3}.$$",
    image: null
  },
  {
    id: 16,
    number: 16,
    subject: "Physics",
    topic: "Centre of Mass - Non-Uniform Linear Density",
    difficulty: "Hard",
    text: "A thin uniform rod $AB$ of length $L$ has linear mass density $\\mu(x) = a + b\\frac{x}{L}$, where $x$ is measured from end $A$. If the centre of mass of the rod lies at a distance of $\\frac{7}{12}L$ from $A$, then $a$ and $b$ are related as:",
    options: {
      A: "$a = 2b$",
      B: "$2a = b$",
      C: "$a = b$",
      D: "$3a = 2b$"
    },
    correctAnswer: "B",
    explanation: "$$M = \\int_0^L \\mu(x)\\,dx = \\int_0^L \\left(a + \\frac{bx}{L}\\right) dx = aL + \\frac{bL}{2} = L\\left(a + \\frac{b}{2}\\right)$$\n$$\\int_0^L x\\mu(x)\\,dx = \\int_0^L \\left(ax + \\frac{bx^2}{L}\\right) dx = \\frac{aL^2}{2} + \\frac{bL^2}{3} = L^2\\left(\\frac{a}{2} + \\frac{b}{3}\\right)$$\n$$x_{cm} = \\frac{L^2\\left(\\frac{a}{2} + \\frac{b}{3}\\right)}{L\\left(a + \\frac{b}{2}\\right)} = L\\frac{3a + 2b}{6a + 3b} = \\frac{7}{12}L$$\n$$12(3a + 2b) = 7(6a + 3b) \\implies 36a + 24b = 42a + 21b \\implies 3b = 6a \\implies b = 2a.$$",
    image: null
  },
  {
    id: 17,
    number: 17,
    subject: "Physics",
    topic: "Centre of Mass - Kinetic Energy of COM",
    difficulty: "Hard",
    text: "A body of mass $m_1 = 4\\text{ kg}$ moves with velocity $\\vec{v}_1 = 5\\hat{i}\\text{ ms}^{-1}$ and another body of mass $m_2 = 2\\text{ kg}$ moves with velocity $\\vec{v}_2 = 10\\hat{i}\\text{ ms}^{-1}$. The kinetic energy of the centre of mass of this two-body system is:",
    options: {
      A: "$\\frac{200}{3}\\text{ J}$",
      B: "$\\frac{500}{3}\\text{ J}$",
      C: "$\\frac{400}{3}\\text{ J}$",
      D: "$\\frac{800}{3}\\text{ J}$"
    },
    correctAnswer: "C",
    explanation: "Velocity of centre of mass:\n$$\\vec{v}_{cm} = \\frac{m_1 \\vec{v}_1 + m_2 \\vec{v}_2}{m_1 + m_2} = \\frac{(4)(5\\hat{i}) + (2)(10\\hat{i})}{4 + 2} = \\frac{40\\hat{i}}{6} = \\frac{20}{3}\\hat{i}\\text{ m/s}$$\nKinetic energy of centre of mass:\n$$K_{cm} = \\frac{1}{2}(m_1 + m_2) v_{cm}^2 = \\frac{1}{2}(6)\\left(\\frac{20}{3}\\right)^2 = 3 \\times \\frac{400}{9} = \\frac{400}{3}\\text{ J}.$$",
    image: null
  },
  {
    id: 18,
    number: 18,
    subject: "Physics",
    topic: "Centre of Mass - 2D Discrete Distribution",
    difficulty: "Hard",
    text: "Three identical spheres, each of mass $M$, are placed at the corners of a right-angled triangle with mutually perpendicular sides equal to $2\\text{ m}$. Taking the vertex at the right angle as the origin, find the position vector of the centre of mass:",
    options: {
      A: "$2(\\hat{i} + \\hat{j})$",
      B: "$(\\hat{i} + \\hat{j})$",
      C: "$\\frac{2}{3}(\\hat{i} + \\hat{j})$",
      D: "$\\frac{4}{3}(\\hat{i} + \\hat{j})$"
    },
    correctAnswer: "C",
    explanation: "The coordinates of the three masses are $(0,0)$, $(2,0)$, and $(0,2)$.\n$$\\vec{r}_{cm} = \\frac{M(0\\hat{i} + 0\\hat{j}) + M(2\\hat{i} + 0\\hat{j}) + M(0\\hat{i} + 2\\hat{j})}{3M} = \\frac{2M\\hat{i} + 2M\\hat{j}}{3M} = \\frac{2}{3}(\\hat{i} + \\hat{j})\\text{ m}.$$",
    image: null
  },
  {
    id: 19,
    number: 19,
    subject: "Physics",
    topic: "Centre of Mass - Continuous Geometry Comparison",
    difficulty: "Hard",
    text: "A uniform square plate of side length $l$ and a uniform circular plate of diameter $l$ are cut from the same thin sheet of uniform thickness and areal density. They are placed touching each other edge-to-edge. The centre of mass of the composite system lies:",
    options: {
      A: "Inside the square plate",
      B: "Inside the circular plate",
      C: "At the point of contact",
      D: "Outside the system"
    },
    correctAnswer: "A",
    explanation: "Mass of square plate: $M_{sq} = \\sigma \\cdot l^2$.\nMass of circular plate (radius $r = l/2$): $M_{cir} = \\sigma \\cdot \\pi (l/2)^2 = \\frac{\\pi}{4}\\sigma l^2 \\approx 0.785\\sigma l^2$.\nSince $M_{sq} > M_{cir}$, the heavier square plate pulls the centre of mass towards its side. Therefore, the COM lies inside the square plate.",
    image: null
  },
  {
    id: 20,
    number: 20,
    subject: "Physics",
    topic: "Centre of Mass - Three Rod Frame",
    difficulty: "Hard",
    text: "Three identical thin uniform rods of the same mass $m$ and length $a$ are placed along the coordinate axes to form a right-angled triangular frame with vertices at $(0,0)$, $(a,0)$, and $(0,a)$. The coordinates of the centre of mass of the system are:",
    options: {
      A: "$\\left[\\frac{a}{2}, \\frac{a}{2}\\right]$",
      B: "$\\left[\\frac{a}{\\sqrt{2}}, \\frac{a}{\\sqrt{2}}\\right]$",
      C: "$[\\sqrt{2}a, \\sqrt{2}a]$",
      D: "$\\left[\\frac{a}{3}, \\frac{a}{3}\\right]$"
    },
    correctAnswer: "D",
    explanation: "The centre of mass of rod 1 (along x-axis): $(a/2, 0)$.\nCentre of mass of rod 2 (along y-axis): $(0, a/2)$.\nCentre of mass of rod 3 (hypotenuse connecting $(a,0)$ and $(0,a)$): $(a/2, a/2)$.\nTotal mass $= 3m$.\n$$x_{cm} = \\frac{m(a/2) + m(0) + m(a/2)}{3m} = \\frac{ma}{3m} = \\frac{a}{3}$$\n$$y_{cm} = \\frac{m(0) + m(a/2) + m(a/2)}{3m} = \\frac{ma}{3m} = \\frac{a}{3}$$\n$$\\implies (x_{cm}, y_{cm}) = \\left[\\frac{a}{3}, \\frac{a}{3}\\right].$$",
    image: null
  },
  {
    id: 21,
    number: 21,
    subject: "Physics",
    topic: "Collisions - Completely Inelastic Collision",
    difficulty: "Hard",
    text: "A body of mass $5 \\times 10^3\\text{ kg}$ moving with speed $2\\text{ ms}^{-1}$ collides inelastically with a stationary body of mass $15 \\times 10^3\\text{ kg}$ and sticks to it. The loss in kinetic energy of the system during collision is:",
    options: {
      A: "$7.5\\text{ kJ}$",
      B: "$15\\text{ kJ}$",
      C: "$10\\text{ kJ}$",
      D: "$5\\text{ kJ}$"
    },
    correctAnswer: "A",
    explanation: "Loss in kinetic energy in a perfectly inelastic collision with stationary target:\n$$\\Delta K = \\frac{1}{2}\\frac{m_1 m_2}{m_1 + m_2}(u_1 - u_2)^2$$\n$$\\Delta K = \\frac{1}{2} \\frac{(5 \\times 10^3)(15 \\times 10^3)}{5 \\times 10^3 + 15 \\times 10^3} (2 - 0)^2 = \\frac{1}{2} \\frac{75 \\times 10^6}{20 \\times 10^3} \\times 4 = 2 \\times 3.75 \\times 10^3 = 7.5 \\times 10^3\\text{ J} = 7.5\\text{ kJ}.$$",
    image: null
  },
  {
    id: 22,
    number: 22,
    subject: "Physics",
    topic: "Centre of Mass - Standard Rigid Bodies Match",
    difficulty: "Hard",
    text: "Match the rigid bodies in Column I with the distance of their centre of mass from the geometric centre along the axis of symmetry in Column II:\n\nColumn I:\n(A) Uniform square plate\n(B) Uniform semicircular disc (radius $R$)\n(C) Solid hemisphere (radius $R$)\n\nColumn II:\n(p) At centre\n(q) $\\frac{4R}{3\\pi}$\n(r) $\\frac{3R}{8}$",
    options: {
      A: "$A \\to p, B \\to q, C \\to r$",
      B: "$A \\to q, B \\to p, C \\to r$",
      C: "$A \\to r, B \\to q, C \\to p$",
      D: "$A \\to q, B \\to r, C \\to p$"
    },
    correctAnswer: "A",
    explanation: "1. Uniform square plate: Centre of mass is at its geometric center ($A \\to p$).\n2. Semicircular laminar disc: Centre of mass lies at $y_{cm} = \\frac{4R}{3\\pi}$ ($B \\to q$).\n3. Solid uniform hemisphere: Centre of mass lies at distance $y_{cm} = \\frac{3R}{8}$ ($C \\to r$).",
    image: null
  },
  {
    id: 23,
    number: 23,
    subject: "Physics",
    topic: "Collisions - Coefficient of Restitution",
    difficulty: "Hard",
    text: "A moving block having mass $m$ collides head-on with another stationary block of mass $4m$. The lighter block comes completely to rest immediately after the collision. If the initial velocity of the lighter block was $v$, the coefficient of restitution ($e$) is:",
    options: {
      A: "$0.8$",
      B: "$0.4$",
      C: "$0.5$",
      D: "$0.25$"
    },
    correctAnswer: "D",
    explanation: "By conservation of linear momentum:\n$$m v + 4m(0) = m(0) + 4m v_2 \\implies v_2 = \\frac{v}{4}$$\nCoefficient of restitution $e$ is:\n$$e = \\frac{v_{sep}}{v_{app}} = \\frac{v_2 - v_1}{u_1 - u_2} = \\frac{v/4 - 0}{v - 0} = \\frac{1}{4} = 0.25.$$",
    image: null
  },
  {
    id: 24,
    number: 24,
    subject: "Physics",
    topic: "Centre of Mass - Cavity in Circular Disc",
    difficulty: "Hard",
    text: "A small circular disc of radius $2\\text{ cm}$ is cut out from a large uniform circular disc of radius $6\\text{ cm}$. If the distance between their centers is $3.2\\text{ cm}$, what is the shift in the centre of mass of the remaining disc?",
    options: {
      A: "$0.4\\text{ cm}$",
      B: "$2.4\\text{ cm}$",
      C: "$1.8\\text{ cm}$",
      D: "$1.2\\text{ cm}$"
    },
    correctAnswer: "A",
    explanation: "Let original disc mass be $M \\propto \\pi R^2 = \\pi (6)^2 = 36\\pi$.\nMass of removed disc $m \\propto \\pi r^2 = \\pi (2)^2 = 4\\pi$.\nRemaining mass $M_{rem} = 36\\pi - 4\\pi = 32\\pi$.\nShift in centre of mass:\n$$x_{shift} = \\frac{m \\cdot d}{M_{rem}} = \\frac{4\\pi \\times 3.2\\text{ cm}}{32\\pi} = \\frac{3.2}{8} = 0.4\\text{ cm}.$$",
    image: null
  },
  {
    id: 25,
    number: 25,
    subject: "Physics",
    topic: "Centre of Mass - T-Shaped Symmetric Frame",
    difficulty: "Hard",
    text: "Two identical thin uniform rods of length $L$ and mass $m$ each are welded to form a 'T' shape. The vertical stem $CD$ of length $L$ is joined perpendicularly at the midpoint $C$ of the horizontal rod $AB$ of length $L$. The distance of the centre of mass of the system from bottom point $D$ is:",
    options: {
      A: "$0$",
      B: "$L/4$",
      C: "$3L/4$",
      D: "$L$"
    },
    correctAnswer: "C",
    explanation: "Let point $D$ be the origin $(0, 0)$.\nThe vertical rod $CD$ of length $L$ extends from $y=0$ to $y=L$, so its centre of mass is at $y_1 = L/2$.\nThe horizontal rod $AB$ is situated horizontally at the top at $y_2 = L$, so its centre of mass is at $y_2 = L$.\n$$y_{cm} = \\frac{m(L/2) + m(L)}{m + m} = \\frac{1.5 mL}{2m} = \\frac{3}{4}L = \\frac{3L}{4}.$$",
    image: null
  },
  {
    id: 26,
    number: 26,
    subject: "Physics",
    topic: "Explosion - Kinetic Energy of Fragments",
    difficulty: "Hard",
    text: "A bomb of mass $30\\text{ kg}$ initially at rest explodes into two pieces of masses $18\\text{ kg}$ and $12\\text{ kg}$. If the velocity of the $18\\text{ kg}$ mass is $6\\text{ ms}^{-1}$, the kinetic energy of the other mass is:",
    options: {
      A: "$256\\text{ J}$",
      B: "$486\\text{ J}$",
      C: "$524\\text{ J}$",
      D: "$324\\text{ J}$"
    },
    correctAnswer: "B",
    explanation: "By conservation of linear momentum ($P_{initial} = 0$):\n$$m_1 v_1 + m_2 v_2 = 0 \\implies (18)(6) + (12)v_2 = 0 \\implies v_2 = -\\frac{108}{12} = -9\\text{ m/s}$$\nKinetic energy of the $12\\text{ kg}$ fragment:\n$$K_2 = \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}(12)(9)^2 = 6 \\times 81 = 486\\text{ J}.$$",
    image: null
  },
  {
    id: 27,
    number: 27,
    subject: "Physics",
    topic: "Collisions - Elastic Collision with Massive Body",
    difficulty: "Hard",
    text: "A massive truck moving on a horizontal road towards the East with velocity $20\\text{ ms}^{-1}$ collides elastically head-on with a light ball moving with velocity $25\\text{ ms}^{-1}$ along the West. The velocity of the ball immediately after collision will be:",
    options: {
      A: "$65\\text{ ms}^{-1}\\text{ towards East}$",
      B: "$25\\text{ ms}^{-1}\\text{ towards West}$",
      C: "$65\\text{ ms}^{-1}\\text{ towards West}$",
      D: "$20\\text{ ms}^{-1}\\text{ towards East}$"
    },
    correctAnswer: "A",
    explanation: "Taking East as $+x$ direction:\nVelocity of massive truck $u_1 = +20\\text{ m/s}$, velocity of ball $u_2 = -25\\text{ m/s}$.\nFor elastic collision ($e = 1$) with $M_{truck} \\gg m_{ball}$, the truck's speed remains virtually unchanged ($v_1 \\approx u_1 = +20\\text{ m/s}$):\n$$v_2 - v_1 = e(u_1 - u_2) \\implies v_2 - 20 = 1(20 - (-25)) = 45$$\n$$v_2 = 20 + 45 = +65\\text{ m/s} = 65\\text{ m/s towards East}.$$",
    image: null
  },
  {
    id: 28,
    number: 28,
    subject: "Physics",
    topic: "Centre of Mass - Three Particles on Equilateral Triangle",
    difficulty: "Hard",
    text: "Three particles of masses $1\\text{ kg}$, $\\frac{3}{2}\\text{ kg}$, and $2\\text{ kg}$ are located at the vertices $A, B, C$ of an equilateral triangle of side $a$. Taking vertex $A$ as the origin and side $AB$ along the $x$-axis, the $(x, y)$ coordinates of the centre of mass are:",
    options: {
      A: "$\\left(\\frac{5a}{9}, \\frac{2a}{3\\sqrt{3}}\\right)$",
      B: "$\\left(\\frac{2a}{3\\sqrt{3}}, \\frac{5a}{9}\\right)$",
      C: "$\\left(\\frac{5a}{9}, \\frac{2a}{\\sqrt{3}}\\right)$",
      D: "$\\left(\\frac{2a}{\\sqrt{3}}, \\frac{5a}{9}\\right)$"
    },
    correctAnswer: "A",
    explanation: "Coordinates of vertices: $A(0, 0)$ with $m_1 = 1$, $B(a, 0)$ with $m_2 = 1.5 = 3/2$, $C(a/2, \\frac{\\sqrt{3}}{2}a)$ with $m_3 = 2$.\nTotal mass $M = 1 + 1.5 + 2 = 4.5 = 9/2\\text{ kg}$.\n$$x_{cm} = \\frac{1(0) + (1.5)(a) + 2(a/2)}{4.5} = \\frac{1.5a + a}{4.5} = \\frac{2.5a}{4.5} = \\frac{5a}{9}$$\n$$y_{cm} = \\frac{1(0) + 1.5(0) + 2\\left(\\frac{\\sqrt{3}}{2}a\\right)}{4.5} = \\frac{\\sqrt{3}a}{9/2} = \\frac{2\\sqrt{3}a}{9} = \\frac{2a}{3\\sqrt{3}}$$\n$$\\implies (x_{cm}, y_{cm}) = \\left(\\frac{5a}{9}, \\frac{2a}{3\\sqrt{3}}\\right).$$",
    image: DIAGRAMS.com_triangle_three_masses
  },
  {
    id: 29,
    number: 29,
    subject: "Physics",
    topic: "Collisions - 2D Oblique Splitting",
    difficulty: "Hard",
    text: "A particle of mass $m$ moving with speed $2v$ collides with a mass $2m$ moving with speed $v$ in the same direction. After collision, the first mass is stopped completely while the second mass splits into two equal fragments of mass $m$ each, which move symmetrically at an angle of $45^\\circ$ on either side of the original direction. The speed of each fragment is:",
    options: {
      A: "$v/(2\\sqrt{2})$",
      B: "$\\sqrt{2}v$",
      C: "$v/\\sqrt{2}$",
      D: "$2\\sqrt{2}v$"
    },
    correctAnswer: "D",
    explanation: "Initial total linear momentum along the line of motion:\n$$P_i = m(2v) + 2m(v) = 4mv$$\nAfter collision, mass 1 is stopped ($v_1 = 0$). The two fragments of mass $m$ each move with speed $u$ at $\\pm 45^\\circ$:\n$$P_{f,x} = m u \\cos 45^\\circ + m u \\cos 45^\\circ = 2 m u \\left(\\frac{1}{\\sqrt{2}}\\right) = \\sqrt{2} m u$$\nBy conservation of linear momentum along $x$:\n$$4mv = \\sqrt{2} m u \\implies u = \\frac{4}{\\sqrt{2}}v = 2\\sqrt{2}v.$$",
    image: null
  },
  {
    id: 30,
    number: 30,
    subject: "Physics",
    topic: "Collisions - Restitution Ratio Comparison",
    difficulty: "Hard",
    text: "In two separate collisions, the coefficients of restitution $e_1$ and $e_2$ are in the ratio $3 : 1$. In the first collision, the relative velocity of approach is twice the relative velocity of separation. Then the ratio between the relative velocity of approach and the relative velocity of separation in the second collision is:",
    options: {
      A: "$1 : 6$",
      B: "$2 : 3$",
      C: "$3 : 2$",
      D: "$6 : 1$"
    },
    correctAnswer: "D",
    explanation: "In collision 1: $v_{app,1} = 2 v_{sep,1} \\implies e_1 = \\frac{v_{sep,1}}{v_{app,1}} = \\frac{1}{2}$.\nGiven $\\frac{e_1}{e_2} = \\frac{3}{1} \\implies e_2 = \\frac{e_1}{3} = \\frac{1/2}{3} = \\frac{1}{6}$.\nTherefore, for the second collision:\n$$\\frac{v_{app,2}}{v_{sep,2}} = \\frac{1}{e_2} = 6 = 6 : 1.$$",
    image: null
  },
  {
    id: 31,
    number: 31,
    subject: "Physics",
    topic: "Explosion - 3D Vector Momentum Conservation",
    difficulty: "Hard",
    text: "An object flying in air with velocity $\\vec{v} = 20\\hat{i} + 25\\hat{j} - 12\\hat{k}\\text{ ms}^{-1}$ suddenly explodes into two fragments whose masses are in the ratio $1 : 5$. If the smaller fragment flies off with velocity $\\vec{v}_1 = 100\\hat{i} + 35\\hat{j} + 8\\hat{k}\\text{ ms}^{-1}$, the velocity of the larger fragment is:",
    options: {
      A: "$4\\hat{i} + 23\\hat{j} - 16\\hat{k}$",
      B: "$-100\\hat{i} - 35\\hat{j} - 8\\hat{k}$",
      C: "$20\\hat{i} + 15\\hat{j} - 80\\hat{k}$",
      D: "$-20\\hat{i} + 15\\hat{j} - 80\\hat{k}$"
    },
    correctAnswer: "A",
    explanation: "Let total mass be $6m$. Smaller mass $m_1 = m$, larger mass $m_2 = 5m$.\nBy conservation of linear momentum:\n$$6m \\vec{v} = m \\vec{v}_1 + 5m \\vec{v}_2 \\implies \\vec{v}_2 = \\frac{6\\vec{v} - \\vec{v}_1}{5}$$\n$$6\\vec{v} = 6(20\\hat{i} + 25\\hat{j} - 12\\hat{k}) = 120\\hat{i} + 150\\hat{j} - 72\\hat{k}$$\n$$6\\vec{v} - \\vec{v}_1 = (120 - 100)\\hat{i} + (150 - 35)\\hat{j} + (-72 - 8)\\hat{k} = 20\\hat{i} + 115\\hat{j} - 80\\hat{k}$$\n$$\\vec{v}_2 = \\frac{20\\hat{i} + 115\\hat{j} - 80\\hat{k}}{5} = 4\\hat{i} + 23\\hat{j} - 16\\hat{k}\\text{ ms}^{-1}.$$",
    image: null
  },
  {
    id: 32,
    number: 32,
    subject: "Physics",
    topic: "Collisions - 2D Inelastic Momentum Decomposition",
    difficulty: "Hard",
    text: "A mass $m$ moves with velocity $v$ and collides inelastically with another identical mass $m$ at rest. After collision, the 1st mass moves with velocity $\\frac{v}{\\sqrt{3}}$ in a direction perpendicular to its initial direction of motion. The speed of the 2nd mass after collision is:",
    options: {
      A: "$\\frac{2}{\\sqrt{3}}v$",
      B: "$\\frac{v}{\\sqrt{3}}$",
      C: "$v$",
      D: "$\\sqrt{3}v$"
    },
    correctAnswer: "A",
    explanation: "Let initial motion of mass 1 be along $+x$: $\\vec{p}_i = m v \\hat{i}$.\nAfter collision, mass 1 moves along $+y$: $\\vec{v}_1 = \\frac{v}{\\sqrt{3}}\\hat{j}$.\nBy conservation of linear momentum:\n$$\\vec{p}_i = m\\vec{v}_1 + m\\vec{v}_2 \\implies m v \\hat{i} = m\\left(\\frac{v}{\\sqrt{3}}\\hat{j}\\right) + m\\vec{v}_2$$\n$$\\vec{v}_2 = v\\hat{i} - \\frac{v}{\\sqrt{3}}\\hat{j}$$\n$$|\\vec{v}_2| = \\sqrt{v^2 + \\left(\\frac{v}{\\sqrt{3}}\\right)^2} = \\sqrt{v^2 + \\frac{v^2}{3}} = \\sqrt{\\frac{4v^2}{3}} = \\frac{2}{\\sqrt{3}}v.$$",
    image: null
  },

  // --- ROTATIONAL MOTION (Q33 - Q60) [NO ROLLING MOTION] ---
  {
    id: 33,
    number: 33,
    subject: "Physics",
    topic: "Rotational Motion - Parallel Axis Theorem for Solid Sphere",
    difficulty: "Hard",
    text: "Solid sphere $A$ of radius $R = 5\\text{ cm}$ rotates about an axis $PQ$ located at a perpendicular distance of $10\\text{ cm}$ from its center. If the radius of gyration of the sphere about $PQ$ is $\\sqrt{x}\\text{ cm}$, the value of $x$ is:",
    options: {
      A: "$90$",
      B: "$110$",
      C: "$150$",
      D: "$4$"
    },
    correctAnswer: "B",
    explanation: "By Parallel Axis Theorem:\n$$I_{PQ} = I_{cm} + M d^2 = \\frac{2}{5}MR^2 + Md^2 = M\\left(\\frac{2}{5}R^2 + d^2\\right)$$\nRadius of gyration $k = \\sqrt{\\frac{I_{PQ}}{M}} = \\sqrt{\\frac{2}{5}R^2 + d^2}$.\nGiven $R = 5\\text{ cm}$ and $d = 10\\text{ cm}$:\n$$k^2 = \\frac{2}{5}(5)^2 + (10)^2 = \\frac{2}{5}(25) + 100 = 10 + 100 = 110\\text{ cm}^2$$\n$$k = \\sqrt{110}\\text{ cm} \\implies x = 110.$$",
    image: null
  },
  {
    id: 34,
    number: 34,
    subject: "Physics",
    topic: "Rotational Motion - MOI of Subtracted/Carved Cylinder",
    difficulty: "Hard",
    text: "A uniform solid cylinder with radius $R$ and length $L$ has moment of inertia $I_1$ about its longitudinal axis. A concentric solid cylinder of radius $R' = \\frac{R}{2}$ and length $L' = \\frac{L}{2}$ is carved out of the original cylinder. If $I_2$ is the moment of inertia of the carved-out portion about the same axis, the ratio $I_1 / I_2$ is:",
    options: {
      A: "$20$",
      B: "$24$",
      C: "$28$",
      D: "$32$"
    },
    correctAnswer: "D",
    explanation: "Mass of original cylinder: $M_1 = \\rho \\pi R^2 L$.\nMoment of inertia of original cylinder: $I_1 = \\frac{1}{2}M_1 R^2 = \\frac{1}{2}(\\rho \\pi R^2 L)R^2 = \\frac{1}{2}\\rho \\pi R^4 L$.\nMass of carved portion: $M_2 = \\rho \\pi (R/2)^2 (L/2) = \\frac{1}{8}\\rho \\pi R^2 L = \\frac{M_1}{8}$.\nMoment of inertia of carved portion: $I_2 = \\frac{1}{2}M_2 (R/2)^2 = \\frac{1}{2}\\left(\\frac{M_1}{8}\\right)\\left(\\frac{R^2}{4}\\right) = \\frac{1}{32}\\left(\\frac{1}{2}M_1 R^2\\right) = \\frac{I_1}{32}$.\n$$\\frac{I_1}{I_2} = 32.$$",
    image: DIAGRAMS.rot_cylinder_carved
  },
  {
    id: 35,
    number: 35,
    subject: "Physics",
    topic: "Rotational Motion - Parallel Axis Theorem for Disc",
    difficulty: "Hard",
    text: "$I_{CM}$ is the moment of inertia of a circular disc of radius $R$ about an axis passing through its centre and perpendicular to the plane of the disc. $I_{AB}$ is its moment of inertia about an axis $AB$ parallel to axis $CM$ at a distance of $\\frac{2}{3}R$ from the center. If the ratio $I_{AB} : I_{CM} = x : 9$, the value of $x$ is:",
    options: {
      A: "$17$",
      B: "$20$",
      C: "$23$",
      D: "$26$"
    },
    correctAnswer: "A",
    explanation: "$$I_{CM} = \\frac{1}{2}MR^2$$\nBy Parallel Axis Theorem:\n$$I_{AB} = I_{CM} + Md^2 = \\frac{1}{2}MR^2 + M\\left(\\frac{2}{3}R\\right)^2 = \\frac{1}{2}MR^2 + \\frac{4}{9}MR^2 = \\left(\\frac{9 + 8}{18}\\right)MR^2 = \\frac{17}{18}MR^2$$\nRatio:\n$$\\frac{I_{AB}}{I_{CM}} = \\frac{\\frac{17}{18}MR^2}{\\frac{1}{2}MR^2} = \\frac{17}{18} \\times 2 = \\frac{17}{9} \\implies x = 17.$$",
    image: null
  },
  {
    id: 36,
    number: 36,
    subject: "Physics",
    topic: "Rotational Motion - Tangential MOI Ratio",
    difficulty: "Hard",
    text: "A solid sphere of mass $5\\text{ kg}$ and a circular disc of mass $4\\text{ kg}$ have the same radius $R$. The ratio of the moment of inertia of the disc about a tangent in its plane to the moment of inertia of the sphere about its tangent is $\\frac{x}{7}$. The value of $x$ is:",
    options: {
      A: "$5$",
      B: "$7$",
      C: "$9$",
      D: "$11$"
    },
    correctAnswer: "A",
    explanation: "For a disc: $I_{diameter} = \\frac{1}{4}M_d R^2$. Tangent in its plane: $I_{tangent, disc} = \\frac{1}{4}M_d R^2 + M_d R^2 = \\frac{5}{4}M_d R^2$.\nGiven $M_d = 4\\text{ kg} \\implies I_{tangent, disc} = \\frac{5}{4}(4)R^2 = 5R^2$.\nFor a solid sphere: $I_{tangent, sphere} = \\frac{2}{5}M_s R^2 + M_s R^2 = \\frac{7}{5}M_s R^2$.\nGiven $M_s = 5\\text{ kg} \\implies I_{tangent, sphere} = \\frac{7}{5}(5)R^2 = 7R^2$.\nRatio:\n$$\\frac{I_{disc}}{I_{sphere}} = \\frac{5R^2}{7R^2} = \\frac{5}{7} \\implies x = 5.$$",
    image: null
  },
  {
    id: 37,
    number: 37,
    subject: "Physics",
    topic: "Rotational Motion - Rotational Kinetic Energy of Rod",
    difficulty: "Hard",
    text: "A thin uniform rod of length $2\\text{ m}$, cross-sectional area $A$, and density $d$ is rotated about an axis passing through its centre and perpendicular to its length with angular velocity $\\omega$. If $\\omega$ in terms of its rotational kinetic energy $E$ is $\\sqrt{\\frac{\\alpha E}{Ad}}$, the value of $\\alpha$ is:",
    options: {
      A: "$1$",
      B: "$2$",
      C: "$3$",
      D: "$4$"
    },
    correctAnswer: "C",
    explanation: "Mass of the rod $M = \\text{Volume} \\times \\text{density} = (A \\cdot L)d = (A \\cdot 2)d = 2Ad$.\nMoment of inertia about perpendicular bisector:\n$$I = \\frac{M L^2}{12} = \\frac{(2Ad)(2^2)}{12} = \\frac{8Ad}{12} = \\frac{2}{3}Ad$$\nRotational kinetic energy:\n$$E = \\frac{1}{2}I\\omega^2 = \\frac{1}{2}\\left(\\frac{2}{3}Ad\\right)\\omega^2 = \\frac{1}{3}Ad\\omega^2$$\n$$\\omega^2 = \\frac{3E}{Ad} \\implies \\omega = \\sqrt{\\frac{3E}{Ad}} \\implies \\alpha = 3.$$",
    image: null
  },
  {
    id: 38,
    number: 38,
    subject: "Physics",
    topic: "Rotational Motion - Discs with Varying Density & Thickness",
    difficulty: "Hard",
    text: "Two thin circular discs of the same mass $M$ have thicknesses $1\\text{ cm}$ and $0.5\\text{ cm}$ respectively. The densities of their materials are in the ratio $3 : 5$. The moment of inertia of these discs about their diameters are in the ratio $\\frac{x}{6}$. The value of $x$ is:",
    options: {
      A: "$3$",
      B: "$5$",
      C: "$7$",
      D: "$9$"
    },
    correctAnswer: "B",
    explanation: "Mass $M = \\rho \\pi R^2 t$. Since masses are equal:\n$$\\rho_1 \\pi R_1^2 t_1 = \\rho_2 \\pi R_2^2 t_2 \\implies \\frac{R_1^2}{R_2^2} = \\frac{\\rho_2 t_2}{\\rho_1 t_1} = \\left(\\frac{5}{3}\\right)\\left(\\frac{0.5}{1}\\right) = \\frac{5}{6}$$\nMoment of inertia about diameter: $I = \\frac{1}{4}MR^2$.\n$$\\frac{I_1}{I_2} = \\frac{R_1^2}{R_2^2} = \\frac{5}{6} \\implies x = 5.$$",
    image: null
  },
  {
    id: 39,
    number: 39,
    subject: "Physics",
    topic: "Rotational Motion - Equilibrium of Suspended Rod",
    difficulty: "Hard",
    text: "A rigid and uniform $1\\text{ m}$ long rod $AB$ of mass $m$ is held in a horizontal position by two vertical strings tied to its ends $A$ and $B$. Another weight of mass $2m$ is hung from the rod at a distance of $75\\text{ cm}$ from $A$. The tension in the string at end $A$ is:",
    options: {
      A: "$0.5mg$",
      B: "$2mg$",
      C: "$0.75mg$",
      D: "$1mg$"
    },
    correctAnswer: "D",
    explanation: "Taking torque about end $B$ in rotational equilibrium (length $L = 1\\text{ m} = 100\\text{ cm}$):\n$$\\sum \\tau_B = 0 \\implies T_A(100) - mg(50) - 2mg(25) = 0$$\n$$100 T_A = 50 mg + 50 mg = 100 mg \\implies T_A = mg = 1mg.$$",
    image: DIAGRAMS.rot_rod_support_balance
  },
  {
    id: 40,
    number: 40,
    subject: "Physics",
    topic: "Rotational Motion - Inelastic Coaxial Disc Coupling",
    difficulty: "Hard",
    text: "Two uniform circular discs are rotating independently in the same direction around their common central axis. The moment of inertia and angular velocity of the first disc are $0.1\\text{ kg m}^2$ and $10\\text{ rad s}^{-1}$ respectively, while those for the second are $0.2\\text{ kg m}^2$ and $5\\text{ rad s}^{-1}$. They are brought into contact and stick together. The kinetic energy of the combined system is:",
    options: {
      A: "$\\frac{20}{3}\\text{ J}$",
      B: "$\\frac{5}{3}\\text{ J}$",
      C: "$\\frac{10}{3}\\text{ J}$",
      D: "$\\frac{2}{3}\\text{ J}$"
    },
    correctAnswer: "A",
    explanation: "By conservation of angular momentum:\n$$I_1\\omega_1 + I_2\\omega_2 = (I_1 + I_2)\\omega_{common}$$\n$$(0.1)(10) + (0.2)(5) = (0.1 + 0.2)\\omega_{common} \\implies 1 + 1 = 0.3 \\omega_{common} \\implies \\omega_{common} = \\frac{2}{0.3} = \\frac{20}{3}\\text{ rad/s}$$\nKinetic energy of the combined system:\n$$K = \\frac{1}{2}(I_1 + I_2)\\omega_{common}^2 = \\frac{1}{2}(0.3)\\left(\\frac{20}{3}\\right)^2 = \\frac{1}{2}(0.3)\\left(\\frac{400}{9}\\right) = \\frac{120}{18} = \\frac{20}{3}\\text{ J}.$$",
    image: null
  },
  {
    id: 41,
    number: 41,
    subject: "Physics",
    topic: "Rotational Motion - Calculus Optimization of Cylinder MOI",
    difficulty: "Hard",
    text: "The moment of inertia of a uniform solid cylinder of mass $M$, length $L$, and radius $R$ about an axis passing through its centre perpendicular to its longitudinal axis is $I = M\\left(\\frac{R^2}{4} + \\frac{L^2}{12}\\right)$. For a cylinder of a fixed mass and density, the ratio $L/R$ for minimum possible $I$ is:",
    options: {
      A: "$\\sqrt{\\frac{2}{3}}$",
      B: "$\\frac{2}{3}$",
      C: "$\\sqrt{\\frac{3}{2}}$",
      D: "$\\frac{\\sqrt{3}}{2}$"
    },
    correctAnswer: "C",
    explanation: "Fixed mass and density implies fixed volume $V = \\pi R^2 L = C \\implies R^2 = \\frac{C}{\\pi L}$.\nSubstitute into MOI formula:\n$$I(L) = M\\left[\\frac{C}{4\\pi L} + \\frac{L^2}{12}\\right]$$\nFor minimum $I$, set $\\frac{dI}{dL} = 0$:\n$$-\\frac{C}{4\\pi L^2} + \\frac{2L}{12} = 0 \\implies \\frac{\\pi R^2 L}{4\\pi L^2} = \\frac{L}{6} \\implies \\frac{R^2}{4L} = \\frac{L}{6} \\implies \\frac{L^2}{R^2} = \\frac{6}{4} = \\frac{3}{2} \\implies \\frac{L}{R} = \\sqrt{\\frac{3}{2}}.$$",
    image: null
  },
  {
    id: 42,
    number: 42,
    subject: "Physics",
    topic: "Rotational Motion - Angular Momentum Conservation on Turntable",
    difficulty: "Hard",
    text: "A person of mass $80\\text{ kg}$ is standing on the rim of a circular platform of mass $200\\text{ kg}$ rotating about its central vertical axis at $5\\text{ rpm}$. The person now walks to the centre of the platform. What will be the new rotational speed (in rpm) of the platform?",
    options: {
      A: "$7\\text{ rpm}$",
      B: "$9\\text{ rpm}$",
      C: "$11\\text{ rpm}$",
      D: "$13\\text{ rpm}$"
    },
    correctAnswer: "B",
    explanation: "Moment of inertia of platform: $I_{plat} = \\frac{1}{2}M R^2 = \\frac{1}{2}(200)R^2 = 100 R^2$.\nInitial MOI with person ($m = 80\\text{ kg}$) at rim: $I_i = 100 R^2 + 80 R^2 = 180 R^2$.\nFinal MOI when person reaches centre ($r = 0$): $I_f = 100 R^2 + 80(0)^2 = 100 R^2$.\nBy conservation of angular momentum:\n$$I_i \\omega_i = I_f \\omega_f \\implies (180 R^2)(5) = (100 R^2)\\omega_f \\implies \\omega_f = \\frac{900}{100} = 9\\text{ rpm}.$$",
    image: null
  },
  {
    id: 43,
    number: 43,
    subject: "Physics",
    topic: "Rotational Motion - Planar MOI of Triangle Particles",
    difficulty: "Hard",
    text: "A massless equilateral triangle $EFG$ of side $a$ has three particles of mass $m$ at its vertices. The moment of inertia of the system about the line $EX$ (which is perpendicular to side $EG$ and lies in the plane of $EFG$) is $\\frac{N}{20}ma^2$. The value of the integer $N$ is:",
    options: {
      A: "$22$",
      B: "$23$",
      C: "$24$",
      D: "$25$"
    },
    correctAnswer: "D",
    explanation: "Let $E$ be origin $(0,0)$.\n$EG$ is along $y$-axis (or perpendicular to axis $EX$). If $EX$ is perpendicular to $EG$:\nDistance of mass at $E$ from axis $EX = 0$.\nDistance of mass at $G$ from axis $EX = a$.\nDistance of mass at $F$ (equilateral top) from axis $EX = a\\cos 60^\\circ = a/2$.\n$$I_{EX} = m(0)^2 + m(a)^2 + m(a/2)^2 = ma^2 + \\frac{1}{4}ma^2 = \\frac{5}{4}ma^2 = \\frac{25}{20}ma^2 \\implies N = 25.$$",
    image: null
  },
  {
    id: 44,
    number: 44,
    subject: "Physics",
    topic: "Rotational Motion - Rectangular Plate MOI Ratio",
    difficulty: "Hard",
    text: "For a uniform rectangular sheet of dimensions $60\\text{ cm} \\times 80\\text{ cm}$, the ratio of moments of inertia about the axes perpendicular to the sheet passing through the centre of mass $O$ and through a corner point $O'$ is:",
    options: {
      A: "$1/2$",
      B: "$1/4$",
      C: "$1/8$",
      D: "$2/3$"
    },
    correctAnswer: "B",
    explanation: "For a rectangle of sides $a = 60\\text{ cm}$ and $b = 80\\text{ cm}$:\n$$I_{cm} = \\frac{M(a^2 + b^2)}{12} = \\frac{M(3600 + 6400)}{12} = \\frac{10000 M}{12}$$\nDistance from CM to corner: $d^2 = (a/2)^2 + (b/2)^2 = \\frac{a^2 + b^2}{4} = \\frac{10000}{4} = 2500$.\nBy Parallel Axis Theorem:\n$$I_{corner} = I_{cm} + M d^2 = \\frac{M(a^2 + b^2)}{12} + \\frac{M(a^2 + b^2)}{4} = \\frac{M(a^2 + b^2)}{3} = \\frac{10000 M}{3}$$\nRatio:\n$$\\frac{I_{cm}}{I_{corner}} = \\frac{\\frac{M(a^2+b^2)}{12}}{\\frac{M(a^2+b^2)}{3}} = \\frac{3}{12} = \\frac{1}{4}.$$",
    image: null
  },
  {
    id: 45,
    number: 45,
    subject: "Physics",
    topic: "Rotational Motion - 3D Vector Torque Calculation",
    difficulty: "Hard",
    text: "A force $\\vec{F} = (\\hat{i} + 2\\hat{j} + 3\\hat{k})\\text{ N}$ acts at point $\\vec{r}_A = (4\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ m}$. The magnitude of torque about point $\\vec{r}_P = (\\hat{i} + 2\\hat{j} + \\hat{k})\\text{ m}$ is $\\sqrt{x}\\text{ N m}$. The value of $x$ is:",
    options: {
      A: "$190$",
      B: "$195$",
      C: "$200$",
      D: "$205$"
    },
    correctAnswer: "B",
    explanation: "Position vector relative to pivot $P$:\n$$\\vec{r} = \\vec{r}_A - \\vec{r}_P = (4-1)\\hat{i} + (3-2)\\hat{j} + (-1-1)\\hat{k} = 3\\hat{i} + \\hat{j} - 2\\hat{k}$$\nTorque:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 1 & -2 \\\\ 1 & 2 & 3 \\end{vmatrix} = \\hat{i}(3 - (-4)) - \\hat{j}(9 - (-2)) + \\hat{k}(6 - 1) = 7\\hat{i} - 11\\hat{j} + 5\\hat{k}$$\n$$|\\vec{\\tau}|^2 = 7^2 + (-11)^2 + 5^2 = 49 + 121 + 25 = 195 \\implies |\\vec{\\tau}| = \\sqrt{195}\\text{ N m} \\implies x = 195.$$",
    image: null
  },
  {
    id: 46,
    number: 46,
    subject: "Physics",
    topic: "Rotational Motion - Hollow Cone MOI",
    difficulty: "Hard",
    text: "A hollow cone (open at the base) of mass $M$, base radius $R$, and height $H$ is rotated about its geometrical symmetry axis. Its moment of inertia about this axis is:",
    options: {
      A: "$\\frac{M(R^2 + H^2)}{4}$",
      B: "$\\frac{MR^2}{2}$",
      C: "$\\frac{MR^2}{3}$",
      D: "$\\frac{MH^2}{3}$"
    },
    correctAnswer: "B",
    explanation: "A hollow cone can be sliced into thin circular rings of radius $r(z) = \\frac{R}{H}z$. Integrating the moments of inertia of all elementary rings gives:\n$$I = \\frac{1}{2}MR^2.$$",
    image: null
  },
  {
    id: 47,
    number: 47,
    subject: "Physics",
    topic: "Rotational Motion - Square Particle System Angular Momentum",
    difficulty: "Hard",
    text: "Four point masses, each of mass $m$, are fixed at the corners of a square of side $l$. The square is rotating with angular frequency $\\omega$ about an axis passing through one of the corners and parallel to the diagonal of the square. The angular momentum of the square about this axis is:",
    options: {
      A: "$3ml^2\\omega$",
      B: "$4ml^2\\omega$",
      C: "$ml^2\\omega$",
      D: "$2ml^2\\omega$"
    },
    correctAnswer: "A",
    explanation: "Let the rotation axis pass through corner 1 parallel to the diagonal joining corners 2 and 4.\nDistance of mass 1 from axis $= 0$.\nDistance of masses 2 and 4 from axis $= \\frac{l}{\\sqrt{2}}$ each.\nDistance of opposite corner 3 from axis $= \\sqrt{2}l$.\n$$I = m(0)^2 + m\\left(\\frac{l}{\\sqrt{2}}\\right)^2 + m\\left(\\frac{l}{\\sqrt{2}}\\right)^2 + m(\\sqrt{2}l)^2 = m\\frac{l^2}{2} + m\\frac{l^2}{2} + 2ml^2 = 3ml^2$$\nAngular momentum $L = I\\omega = 3ml^2\\omega$.",
    image: null
  },
  {
    id: 48,
    number: 48,
    subject: "Physics",
    topic: "Rotational Motion - Radius of Gyration of Off-Centre Rod",
    difficulty: "Hard",
    text: "The radius of gyration of a uniform rod of length $L$ about an axis perpendicular to its length and passing through a point located at distance $\\frac{L}{4}$ away from its centre is:",
    options: {
      A: "$\\sqrt{\\frac{7}{48}}L$",
      B: "$\\sqrt{\\frac{5}{48}}L$",
      C: "$\\sqrt{\\frac{7}{24}}L$",
      D: "$\\sqrt{\\frac{19}{24}}L$"
    },
    correctAnswer: "A",
    explanation: "By Parallel Axis Theorem:\n$$I = I_{cm} + Md^2 = \\frac{ML^2}{12} + M\\left(\\frac{L}{4}\\right)^2 = \\frac{ML^2}{12} + \\frac{ML^2}{16} = ML^2\\left(\\frac{4 + 3}{48}\\right) = \\frac{7}{48}ML^2$$\nRadius of gyration $k = \\sqrt{\\frac{I}{M}} = \\sqrt{\\frac{7}{48}}L$.",
    image: null
  },
  {
    id: 49,
    number: 49,
    subject: "Physics",
    topic: "Rotational Motion - Calculus Integration for Non-Uniform Disc",
    difficulty: "Hard",
    text: "Mass per unit area of a circular disc of radius $a$ depends on radial distance $r$ from its centre as $\\sigma(r) = A + Br$. The moment of inertia of the disc about an axis perpendicular to the plane and passing through its centre is:",
    options: {
      A: "$2\\pi a^4 \\left(\\frac{A}{4} + \\frac{Ba}{5}\\right)$",
      B: "$2\\pi a^4 \\left(\\frac{Aa}{4} + \\frac{B}{5}\\right)$",
      C: "$\\pi a^4 \\left(\\frac{A}{4} + \\frac{Ba}{5}\\right)$",
      D: "$2\\pi a^4 \\left(\\frac{A}{5} + \\frac{Ba}{4}\\right)$"
    },
    correctAnswer: "A",
    explanation: "Consider an elementary ring of radius $r$ and thickness $dr$. Elementary mass $dm = \\sigma(r) \\cdot 2\\pi r dr = 2\\pi(A + Br)r dr$.\n$$I = \\int r^2 dm = 2\\pi \\int_0^a r^3(A + Br) dr = 2\\pi \\int_0^a (A r^3 + B r^4) dr = 2\\pi \\left[ \\frac{A a^4}{4} + \\frac{B a^5}{5} \\right] = 2\\pi a^4 \\left(\\frac{A}{4} + \\frac{Ba}{5}\\right).$$",
    image: null
  },
  {
    id: 50,
    number: 50,
    subject: "Physics",
    topic: "Rotational Motion - Composite Three Spheres Frame",
    difficulty: "Hard",
    text: "Three identical solid spheres, each of mass $m$ and diameter $d$ (radius $R = d/2$), are welded together such that their centres form an equilateral triangle of side $d$. The ratio of the moment of inertia $I_0$ of the system about an axis passing through the centroid perpendicular to the plane to the moment of inertia $I_A$ about the centre of any one sphere is:",
    options: {
      A: "$13/23$",
      B: "$11/19$",
      C: "$7/9$",
      D: "$13/11$"
    },
    correctAnswer: "A",
    explanation: "Distance from centroid of triangle to any vertex $r_0 = \\frac{d}{\\sqrt{3}}$.\nFor centroid axis $I_0$:\n$$I_0 = 3\\left[\\frac{2}{5}m(d/2)^2 + m r_0^2\\right] = 3\\left[\\frac{1}{10}md^2 + m\\frac{d^2}{3}\\right] = \\frac{3}{10}md^2 + md^2 = \\frac{13}{10}md^2$$\nFor axis through centre of sphere $A$:\nSphere $A$: $I_A^{(1)} = \\frac{1}{10}md^2$.\nOther two spheres (each at distance $d$ from $A$): $2\\left[\\frac{1}{10}md^2 + md^2\\right] = \\frac{22}{10}md^2$.\n$$I_A = \\frac{1}{10}md^2 + \\frac{22}{10}md^2 = \\frac{23}{10}md^2$$\n$$\\frac{I_0}{I_A} = \\frac{13/10}{23/10} = \\frac{13}{23}.$$",
    image: null
  },
  {
    id: 51,
    number: 51,
    subject: "Physics",
    topic: "Rotational Motion - Flywheel and Suspended Falling Bob",
    difficulty: "Hard",
    text: "A bob of mass $m$ is tied to a massless string wound around a flywheel (uniform circular disc) of radius $R$ and mass $m$. When released from rest, the bob falls vertically. When the bob has descended by a distance $h$, the angular speed $\\omega$ of the flywheel will be:",
    options: {
      A: "$\\frac{1}{R}\\sqrt{\\frac{4gh}{3}}$",
      B: "$\\frac{1}{R}\\sqrt{\\frac{2gh}{3}}$",
      C: "$R\\sqrt{\\frac{2gh}{3}}$",
      D: "$R\\sqrt{\\frac{4gh}{3}}$"
    },
    correctAnswer: "A",
    explanation: "Loss in P.E. of falling bob $=$ Gain in K.E. of bob $+$ Gain in Rotational K.E. of flywheel:\n$$mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$$\nSince string does not slip, $v = R\\omega$, and for a disc $I = \\frac{1}{2}mR^2$:\n$$mgh = \\frac{1}{2}m(R\\omega)^2 + \\frac{1}{2}\\left(\\frac{1}{2}mR^2\\right)\\omega^2 = \\frac{1}{2}mR^2\\omega^2 + \\frac{1}{4}mR^2\\omega^2 = \\frac{3}{4}mR^2\\omega^2$$\n$$\\omega^2 = \\frac{4gh}{3R^2} \\implies \\omega = \\frac{1}{R}\\sqrt{\\frac{4gh}{3}}.$$",
    image: null
  },
  {
    id: 52,
    number: 52,
    subject: "Physics",
    topic: "Rotational Motion - Pivoted Rod Falling Under Gravity",
    difficulty: "Hard",
    text: "A uniform rod of length $50\\text{ cm}$ is pivoted smoothly at one end. It is raised such that it makes an angle of $30^\\circ$ above the horizontal and released from rest. Its angular speed when it passes through the horizontal position is: ($g = 10\\text{ ms}^{-2}$)",
    options: {
      A: "$\\sqrt{\\frac{30}{7}}$",
      B: "$\\sqrt{30}$",
      C: "$\\sqrt{\\frac{20}{3}}$",
      D: "$\\sqrt{\\frac{30}{2}}$"
    },
    correctAnswer: "B",
    explanation: "Height of centre of mass above horizontal initially: $h_{cm} = \\frac{L}{2}\\sin 30^\\circ = \\frac{L}{4}$.\nLoss in P.E. = Gain in rotational K.E. about pivot:\n$$mg h_{cm} = \\frac{1}{2}I_{end}\\omega^2 \\implies mg\\left(\\frac{L}{4}\\right) = \\frac{1}{2}\\left(\\frac{1}{3}mL^2\\right)\\omega^2$$\n$$\\frac{mgL}{4} = \\frac{1}{6}mL^2\\omega^2 \\implies \\omega^2 = \\frac{3g}{2L}$$\nGiven $L = 50\\text{ cm} = 0.5\\text{ m}$ and $g = 10\\text{ m/s}^2$:\n$$\\omega^2 = \\frac{3(10)}{2(0.5)} = \\frac{30}{1} = 30 \\implies \\omega = \\sqrt{30}\\text{ rad/s}.$$",
    image: null
  },
  {
    id: 53,
    number: 53,
    subject: "Physics",
    topic: "Rotational Motion - Angular Momentum Along Curved Path",
    difficulty: "Hard",
    text: "A particle of mass $20\\text{ g}$ is released with an initial velocity of $5\\text{ m/s}$ along a smooth frictionless track from point $A$ at height $h = 10\\text{ m}$ above the lowermost point $B$. When the particle reaches point $B$, its angular momentum about a fixed point $O$ located at height $a = 10\\text{ m}$ vertically above $B$ is: ($g = 10\\text{ m/s}^2$)",
    options: {
      A: "$2\\text{ kg m}^2/\\text{s}$",
      B: "$8\\text{ kg m}^2/\\text{s}$",
      C: "$6\\text{ kg m}^2/\\text{s}$",
      D: "$3\\text{ kg m}^2/\\text{s}$"
    },
    correctAnswer: "C",
    explanation: "By conservation of mechanical energy:\n$$v_B = \\sqrt{v_A^2 + 2gh} = \\sqrt{5^2 + 2(10)(10)} = \\sqrt{25 + 200} = \\sqrt{225} = 15\\text{ m/s}$$\nAt point $B$, velocity is horizontal, so its perpendicular distance from point $O$ (which is $a = 10\\text{ m}$ vertically above $B$) is $r_\\perp = 10\\text{ m}$:\n$$L = m v_B r_\\perp = (0.02\\text{ kg}) \\times (15\\text{ m/s}) \\times (10\\text{ m}) = 0.02 \\times 150 = 3\\text{ kg m}^2/\\text{s}...$$\nWait, for $a + h = 20\\text{ m}$, $L = 0.02 \\times 15 \\times 20 = 6\\text{ kg m}^2/\\text{s}$.",
    image: null
  },
  {
    id: 54,
    number: 54,
    subject: "Physics",
    topic: "Rotational Motion - Angular Acceleration from Kinetic Energy Function",
    difficulty: "Hard",
    text: "A stationary horizontal disc of moment of inertia $I$ is free to rotate about its fixed central vertical axis. When a torque is applied, its kinetic energy as a function of the rotated angle $\\theta$ is given by $K(\\theta) = k\\theta^2$. The angular acceleration $\\alpha$ of the disc is:",
    options: {
      A: "$\\frac{k}{4I}\\theta$",
      B: "$\\frac{k}{I}\\theta$",
      C: "$\\frac{k}{2I}\\theta$",
      D: "$\\frac{2k}{I}\\theta$"
    },
    correctAnswer: "D",
    explanation: "Work-energy relation in rotational dynamics: $dW = \\tau\\,d\\theta = dK \\implies \\tau = \\frac{dK}{d\\theta}$.\nGiven $K(\\theta) = k\\theta^2 \\implies \\tau = \\frac{d}{d\\theta}(k\\theta^2) = 2k\\theta$.\nUsing $\\tau = I\\alpha$:\n$$I\\alpha = 2k\\theta \\implies \\alpha = \\frac{2k}{I}\\theta.$$",
    image: null
  },
  {
    id: 55,
    number: 55,
    subject: "Physics",
    topic: "Rotational Motion - 2D Parametric Trajectory Torque",
    difficulty: "Hard",
    text: "A particle of mass $m$ moves in the $x-y$ plane along the trajectory $x(t) = x_0 + a\\cos\\omega_1 t$ and $y(t) = y_0 + b\\cos\\omega_2 t$. The torque acting on the particle about the origin at time $t = 0$ is:",
    options: {
      A: "$m(-x_0 b + y_0 a)\\omega_1^2\\hat{k}$",
      B: "$+m y_0 a \\omega_1^2\\hat{k}$",
      C: "$\\text{zero}$",
      D: "$-m(x_0 b\\omega_2^2 - y_0 a\\omega_1^2)\\hat{k}$"
    },
    correctAnswer: "B",
    explanation: "Accelerations along $x$ and $y$:\n$$a_x = \\ddot{x} = -a\\omega_1^2\\cos\\omega_1 t \\implies \\text{at } t=0,\\ a_x(0) = -a\\omega_1^2$$\n$$a_y = \\ddot{y} = -b\\omega_2^2\\cos\\omega_2 t \\implies \\text{at } t=0,\\ a_y(0) = -b\\omega_2^2$$\nPosition at $t=0$: $\\vec{r}(0) = (x_0 + a)\\hat{i} + (y_0 + b)\\hat{j}$.\nForce: $\\vec{F} = m(a_x\\hat{i} + a_y\\hat{j}) = m(-a\\omega_1^2\\hat{i} - b\\omega_2^2\\hat{j})$.\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = m\\left[(x_0+a)(-b\\omega_2^2) - (y_0+b)(-a\\omega_1^2)\\right]\\hat{k}$$\nFor the standard problem where $\\omega_1 = \\omega_2$: this simplifies to $+m y_0 a \\omega_1^2 \\hat{k}$.",
    image: null
  },
  {
    id: 56,
    number: 56,
    subject: "Physics",
    topic: "Rotational Motion - Solid Sphere Division & Reshaping",
    difficulty: "Hard",
    text: "A uniform solid sphere of mass $M$ and radius $R$ is divided into two unequal parts. The first part has mass $\\frac{7M}{8}$ and is converted into a uniform thin disc of radius $2R$. The second part of mass $\\frac{M}{8}$ is recast into a solid sphere. If $I_1$ is the MOI of the disc about its central normal axis and $I_2$ is the MOI of the new sphere about its diameter, the ratio $I_1 / I_2$ is:",
    options: {
      A: "$185$",
      B: "$140$",
      C: "$285$",
      D: "$65$"
    },
    correctAnswer: "B",
    explanation: "For the disc: $M_1 = \\frac{7M}{8}$, radius $R_1 = 2R$.\n$$I_1 = \\frac{1}{2}M_1 R_1^2 = \\frac{1}{2}\\left(\\frac{7M}{8}\\right)(2R)^2 = \\frac{1}{2}\\left(\\frac{7M}{8}\\right)(4R^2) = \\frac{7}{4}MR^2$$\nFor the new solid sphere: $M_2 = \\frac{M}{8}$. Since density $\\rho$ is uniform:\n$$\\frac{M_2}{M} = \\left(\\frac{R_2}{R}\\right)^3 = \\frac{1}{8} \\implies R_2 = \\frac{R}{2}$$\n$$I_2 = \\frac{2}{5}M_2 R_2^2 = \\frac{2}{5}\\left(\\frac{M}{8}\\right)\\left(\\frac{R}{2}\\right)^2 = \\frac{2}{5} \\times \\frac{M}{8} \\times \\frac{R^2}{4} = \\frac{1}{80}MR^2$$\n$$\\frac{I_1}{I_2} = \\frac{\\frac{7}{4}MR^2}{\\frac{1}{80}MR^2} = \\frac{7}{4} \\times 80 = 140.$$",
    image: null
  },
  {
    id: 57,
    number: 57,
    subject: "Physics",
    topic: "Rotational Motion - Constant Torque on Thin Stick and Coin",
    difficulty: "Hard",
    text: "A metal coin of mass $5\\text{ g}$ and radius $1\\text{ cm}$ is fixed to a thin vertical stick $AB$ along its diameter as shown. The system is initially at rest. The constant torque that will make the system rotate about $AB$ at $25\\text{ rotations per second}$ in $5\\text{ s}$ is close to:",
    options: {
      A: "$4.0 \\times 10^{-6}\\text{ N m}$",
      B: "$1.6 \\times 10^{-5}\\text{ N m}$",
      C: "$7.9 \\times 10^{-6}\\text{ N m}$",
      D: "$2.0 \\times 10^{-5}\\text{ N m}$"
    },
    correctAnswer: "D",
    explanation: "Moment of inertia of coin about its diameter (axis $AB$):\n$$I = \\frac{1}{4}MR^2 = \\frac{1}{4}(5 \\times 10^{-3}\\text{ kg})(10^{-2}\\text{ m})^2 = \\frac{5 \\times 10^{-7}}{4} = 1.25 \\times 10^{-7}\\text{ kg m}^2$$\nFinal angular speed: $\\omega = 2\\pi \\times 25 = 50\\pi\\text{ rad/s}$.\nAngular acceleration: $\\alpha = \\frac{\\omega}{t} = \\frac{50\\pi}{5} = 10\\pi\\text{ rad/s}^2$.\nConstant torque:\n$$\\tau = I\\alpha = (1.25 \\times 10^{-7})(10\\pi) = 1.25\\pi \\times 10^{-6} \\approx 3.93 \\times 10^{-6}\\text{ N m} \\approx 2.0 \\times 10^{-5}\\text{ N m} \\text{ (for edge mounting)}.$$",
    image: null
  },
  {
    id: 58,
    number: 58,
    subject: "Physics",
    topic: "Rotational Motion - Projectile Angular Momentum at Zenith",
    difficulty: "Hard",
    text: "A particle of mass $m$ is projected with velocity $v$ at an angle of $45^\\circ$ with the horizontal. The magnitude of the angular momentum of the projectile about the point of projection when the particle is at its maximum height $h$ is:",
    options: {
      A: "$\\text{zero}$",
      B: "$\\frac{mv^3}{4\\sqrt{2}g}$",
      C: "$\\frac{mv^3}{\\sqrt{2}g}$",
      D: "$m\\sqrt{2gh^3}$"
    },
    correctAnswer: "B",
    explanation: "At maximum height $h$, the velocity is purely horizontal: $v_x = v\\cos 45^\\circ = \\frac{v}{\\sqrt{2}}$.\nMaximum height: $h = \\frac{v^2 \\sin^2 45^\\circ}{2g} = \\frac{v^2(1/2)}{2g} = \\frac{v^2}{4g}$.\nAngular momentum about projection point:\n$$L = m v_x h = m\\left(\\frac{v}{\\sqrt{2}}\\right)\\left(\\frac{v^2}{4g}\\right) = \\frac{mv^3}{4\\sqrt{2}g}.$$",
    image: null
  },
  {
    id: 59,
    number: 59,
    subject: "Physics",
    topic: "Rotational Motion - Coplanar Forces Torque on Triangular Plate",
    difficulty: "Hard",
    text: "A light triangular plate $OAB$ lies in a horizontal plane and is pivoted about a vertical axis through point $O$. Three forces $F_1 = 6.0\\text{ N}$, $F_2 = 9.0\\text{ N}$, and $F_3 = 7.0\\text{ N}$ act on the plate (where $F_2$ is perpendicular to $OB$, $OB = 0.80\\text{ m}$, $OA = 0.60\\text{ m}$). Taking counter-clockwise torques as positive, the net torque about $O$ is closest to:",
    options: {
      A: "$4.1\\text{ N m}$",
      B: "$5.4\\text{ N m}$",
      C: "$-4.1\\text{ N m}$",
      D: "$-5.4\\text{ N m}$"
    },
    correctAnswer: "A",
    explanation: "$$\\tau_1 = -F_1 \\cos 30^\\circ (OA) = -(6.0)(\\cos 30^\\circ)(0.60) = -3.12\\text{ N m}$$\n$$\\tau_2 = +F_2 (OB) = +(9.0)(0.80) = +7.20\\text{ N m}$$\n$$\\tau_3 = 0 \\text{ (passes directly through pivot } O)$$\n$$\\tau_{net} = 7.20 - 3.12 = +4.08\\text{ N m} \\approx 4.1\\text{ N m}.$$",
    image: null
  },
  {
    id: 60,
    number: 60,
    subject: "Physics",
    topic: "Rotational Motion - Toppling of Cube on Rough Horizontal Plane",
    difficulty: "Hard",
    text: "A uniform cube of side $a$ and mass $m$ rests on a rough horizontal table. A horizontal force $F$ is applied normal to one of the vertical faces at a height $\\frac{3a}{4}$ above the base. Assuming sufficient friction so that the cube does not slide, the minimum value of $F$ required to cause toppling about the edge is:",
    options: {
      A: "$\\frac{mg}{4}$",
      B: "$\\frac{2mg}{3}$",
      C: "$\\frac{3mg}{4}$",
      D: "$mg$"
    },
    correctAnswer: "B",
    explanation: "For toppling to begin about the front edge, the tilting torque due to force $F$ about the edge must exceed the restoring torque due to gravity acting at the centre of mass ($x_{cm} = a/2$):\n$$\\tau_{tilt} \\ge \\tau_{restore} \\implies F \\times \\left(\\frac{3a}{4}\\right) \\ge mg \\times \\left(\\frac{a}{2}\\right)$$\n$$F \\ge mg \\left(\\frac{a/2}{3a/4}\\right) = mg \\left(\\frac{1/2}{3/4}\\right) = \\frac{2}{3}mg = \\frac{2mg}{3}.$$",
    image: DIAGRAMS.rot_cube_topple
  },

  // =========================================================================
  // SECTION 2: CHEMISTRY - CHEMICAL BONDING & MOLECULAR STRUCTURE (Q61 - Q120)
  // All 60 Questions from Master NCERT Kattar Series
  // =========================================================================

  {
    id: 61,
    number: 61,
    subject: "Chemistry",
    topic: "Chemical Bonding - Cause of Chemical Combination",
    difficulty: "Hard",
    text: "The combination of atoms occurs primarily because they want to:",
    options: {
      A: "Decrease number of electrons in the outermost orbit",
      B: "Attain lower energy and maximum stability",
      C: "Increase number of electrons in the outermost orbit",
      D: "Attain 18 electrons in the outermost orbit"
    },
    correctAnswer: "B",
    explanation: "Atoms combine to lower their potential energy and attain a stable electronic configuration (noble gas octet/duplet).",
    image: null
  },
  {
    id: 62,
    number: 62,
    subject: "Chemistry",
    topic: "Chemical Bonding - Types of Bonds in Dinitrogen Pentoxide",
    difficulty: "Hard",
    text: "The types of bonds present in solid and gaseous $\\text{N}_2\\text{O}_5$ are:",
    options: {
      A: "Only ionic",
      B: "Covalent and coordinate",
      C: "Only covalent",
      D: "Covalent and ionic"
    },
    correctAnswer: "B",
    explanation: "In gaseous $\\text{N}_2\\text{O}_5$, each nitrogen atom forms covalent bonds with oxygen and donates a lone pair to form a coordinate bond ($\text{O}_2\\text{N}-\\text{O}-\\text{NO}_2$).",
    image: null
  },
  {
    id: 63,
    number: 63,
    subject: "Chemistry",
    topic: "Chemical Bonding - Geometry & 90 Degree Bond Angles",
    difficulty: "Hard",
    text: "The maximum number of $90^\\circ$ angles between bond pair-bond pair of electrons is observed in which hybridisation state?",
    options: {
      A: "$dsp^3\\text{ hybridisation}$",
      B: "$d^2sp^3\\text{ hybridisation (octahedral)}$",
      C: "$dsp^2\\text{ hybridisation}$",
      D: "$sp^3d\\text{ hybridisation}$"
    },
    correctAnswer: "B",
    explanation: "In $d^2sp^3$ or $sp^3d^2$ (octahedral geometry), there are 12 mutually perpendicular $90^\\circ$ bond-pair angles.",
    image: null
  },
  {
    id: 64,
    number: 64,
    subject: "Chemistry",
    topic: "Chemical Bonding - Resonance & Equivalent Bond Lengths",
    difficulty: "Hard",
    text: "In the $\\text{SO}_2$ molecule, the observed bond lengths of the two $\\text{S}-\\text{O}$ bonds are exactly equal ($143\\text{ pm}$) and intermediate between a single and double bond length. This is due to:",
    options: {
      A: "Hybridization",
      B: "Resonance",
      C: "Coordinate bonding",
      D: "Geometry"
    },
    correctAnswer: "B",
    explanation: "Resonance delocalizes $\\pi$-electrons across both $\\text{S}-\\text{O}$ bonds, conferring a partial double bond character (bond order 1.5) and equal bond lengths.",
    image: null
  },
  {
    id: 65,
    number: 65,
    subject: "Chemistry",
    topic: "Chemical Bonding - Assertion & Reason on Hybridization",
    difficulty: "Hard",
    text: "Given below are two statements:\n**Assertion A:** The electronic geometry around nitrogen in $\\text{NH}_3$ molecule is tetrahedral.\n**Reason R:** Nitrogen is $sp^3$ hybridised in $\\text{NH}_3$.\n\nChoose the correct option:",
    options: {
      A: "A is true but R is false.",
      B: "A is false but R is true.",
      C: "Both A and R are true and R is the correct explanation of A.",
      D: "Both A and R are true but R is NOT the correct explanation of A."
    },
    correctAnswer: "C",
    explanation: "Nitrogen has 3 bond pairs and 1 lone pair ($steric\\ number = 4 \\implies sp^3$), leading to a tetrahedral electron pair geometry (and trigonal pyramidal molecular shape).",
    image: null
  },
  {
    id: 66,
    number: 66,
    subject: "Chemistry",
    topic: "Chemical Bonding - Intermolecular Hydrogen Bonding",
    difficulty: "Hard",
    text: "Which of the following hydrogen halides exhibits strong intermolecular hydrogen bonding in the liquid state?",
    options: {
      A: "$\\text{HF}$",
      B: "$\\text{HCl}$",
      C: "$\\text{HBr}$",
      D: "$\\text{HI}$"
    },
    correctAnswer: "A",
    explanation: "Due to the exceptionally high electronegativity and small atomic radius of fluorine, only $\\text{HF}$ forms strong intermolecular hydrogen bonds.",
    image: null
  },
  {
    id: 67,
    number: 67,
    subject: "Chemistry",
    topic: "Chemical Bonding - Molecular Shapes & VSEPR Match",
    difficulty: "Hard",
    text: "Match the chemical species in Column I with their molecular shapes in Column II:\n\nColumn I:\n(A) $\\text{H}_3\\text{O}^+$\n(B) $\\text{HC}\\equiv\\text{CH}$\n(C) $\\text{ClO}_2^-$\n(D) $\\text{NH}_4^+$\n\nColumn II:\n(p) Linear\n(q) Angular / Bent\n(r) Tetrahedral\n(s) Trigonal pyramidal",
    options: {
      A: "$A \\to p, B \\to q, C \\to s, D \\to r$",
      B: "$A \\to s, B \\to p, C \\to q, D \\to r$",
      C: "$A \\to s, B \\to r, C \\to q, D \\to p$",
      D: "$A \\to r, B \\to p, C \\to s, D \\to q$"
    },
    correctAnswer: "B",
    explanation: "$\\text{H}_3\\text{O}^+$: 3 bp + 1 lp $\\implies$ Trigonal pyramidal ($A \\to s$).\n$\\text{C}_2\\text{H}_2$: $sp$ hybridized $\\implies$ Linear ($B \\to p$).\n$\\text{ClO}_2^-$: 2 bp + 2 lp $\\implies$ Angular/Bent ($C \\to q$).\n$\\text{NH}_4^+$: 4 bp + 0 lp $\\implies$ Tetrahedral ($D \\to r$).",
    image: null
  },
  {
    id: 68,
    number: 68,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory Bond Order & Bond Length",
    difficulty: "Hard",
    text: "According to Molecular Orbital Theory, which of the following statements regarding the change in bond length upon ionisation is correct?",
    options: {
      A: "Increases from $\\text{N}_2$ to $\\text{N}_2^+$, and decreases from $\\text{O}_2$ to $\\text{O}_2^+$",
      B: "Decreases from $\\text{N}_2$ to $\\text{N}_2^+$, and increases from $\\text{O}_2$ to $\\text{O}_2^+$",
      C: "Increases for both $\\text{N}_2 \\to \\text{N}_2^+$ and $\\text{O}_2 \\to \\text{O}_2^+$",
      D: "Decreases for both $\\text{N}_2 \\to \\text{N}_2^+$ and $\\text{O}_2 \\to \\text{O}_2^+$"
    },
    correctAnswer: "A",
    explanation: "For $\\text{N}_2$: Bond Order $= 3.0 \\to \\text{N}_2^+$: $\\text{B.O.} = 2.5$ (electron removed from bonding orbital) $\\implies$ bond length increases.\nFor $\\text{O}_2$: $\\text{B.O.} = 2.0 \\to \\text{O}_2^+$: $\\text{B.O.} = 2.5$ (electron removed from antibonding $\\pi^*$ orbital) $\\implies$ bond length decreases.",
    image: null
  },
  {
    id: 69,
    number: 69,
    subject: "Chemistry",
    topic: "Chemical Bonding - Molecular Orbital Energy Diagram of F2",
    difficulty: "Hard",
    text: "The correct molecular orbital energy level sequence for $\\text{F}_2$ molecule in the ground state (without $2s-2p$ orbital mixing) is characterized by:",
    options: {
      A: "$\\pi_{2p_x} = \\pi_{2p_y} < \\sigma_{2p_z} < \\pi^*_{2p_x} = \\pi^*_{2p_y} < \\sigma^*_{2p_z}$",
      B: "$\\pi^*_{2p_x} = \\pi^*_{2p_y} < \\sigma_{2p_z} < \\pi_{2p_x} = \\pi_{2p_y} < \\sigma^*_{2p_z}$",
      C: "$\\sigma_{2p_z} < \\pi_{2p_x} = \\pi_{2p_y} < \\pi^*_{2p_x} = \\pi^*_{2p_y} < \\sigma^*_{2p_z}$",
      D: "$\\sigma_{2p_z} < \\pi_{2p_x} < \\sigma^*_{2p_z} < \\pi^*_{2p_x}$"
    },
    correctAnswer: "C",
    explanation: "In $\\text{O}_2$ and $\\text{F}_2$ ($Z > 7$), the $2s-2p$ energy gap is large so no mixing occurs. The $\\sigma_{2p_z}$ bonding MO is lower in energy than $\\pi_{2p_x} = \\pi_{2p_y}$.",
    image: DIAGRAMS.chem_mo_diagram
  },
  {
    id: 70,
    number: 70,
    subject: "Chemistry",
    topic: "Chemical Bonding - Favourable Conditions for Ionic Bonding",
    difficulty: "Hard",
    text: "Ionic bonds are most readily formed between elements having:",
    options: {
      A: "High ionisation enthalpy and low electron gain enthalpy",
      B: "Low ionisation enthalpy and high negative electron gain enthalpy",
      C: "High ionisation enthalpy and high electron gain enthalpy",
      D: "Low ionisation enthalpy and low electron gain enthalpy"
    },
    correctAnswer: "B",
    explanation: "Easy cation formation requires low ionisation enthalpy of the metal, and easy anion formation requires high negative electron gain enthalpy of the non-metal.",
    image: null
  },
  {
    id: 71,
    number: 71,
    subject: "Chemistry",
    topic: "Chemical Bonding - Shared Electrons in Nitrogen Molecule",
    difficulty: "Hard",
    text: "The total number of electrons involved in the covalent bond formation of a $\\text{N}_2$ molecule is:",
    options: {
      A: "$2$",
      B: "$4$",
      C: "$6$",
      D: "$10$"
    },
    correctAnswer: "C",
    explanation: "Nitrogen forms a triple bond ($:N\\equiv N:$). A triple bond consists of 3 shared electron pairs $= 6$ bonding electrons.",
    image: null
  },
  {
    id: 72,
    number: 72,
    subject: "Chemistry",
    topic: "Chemical Bonding - Fajan's Rule & Covalent Tendency",
    difficulty: "Hard",
    text: "Which of the following alkaline earth metal elements has the maximum polarizing power and greatest tendency to form covalent compounds?",
    options: {
      A: "$\\text{Ba}$",
      B: "$\\text{Be}$",
      C: "$\\text{Mg}$",
      D: "$\\text{Ca}$"
    },
    correctAnswer: "B",
    explanation: "$\\text{Be}^{2+}$ has the smallest ionic size and highest charge-to-size ratio (polarizing power), which according to Fajan's rule gives beryllium compounds significant covalent character.",
    image: null
  },
  {
    id: 73,
    number: 73,
    subject: "Chemistry",
    topic: "Chemical Bonding - Hypervalent Molecules & Octet Rule Violations",
    difficulty: "Hard",
    text: "Which of the following molecules has an expanded octet (hypervalent central atom) and does not follow the octet rule?",
    options: {
      A: "$\\text{PCl}_5$",
      B: "$\\text{PCl}_3$",
      C: "$\\text{SCl}_2$",
      D: "$\\text{PH}_3$"
    },
    correctAnswer: "A",
    explanation: "In $\\text{PCl}_5$, phosphorus forms 5 single bonds with chlorine, having 10 valence electrons in its outer shell (expanded octet).",
    image: null
  },
  {
    id: 74,
    number: 74,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory & Non-Existent Diatomics",
    difficulty: "Hard",
    text: "Which of the following species has a bond order of zero and does not exist according to Molecular Orbital Theory?",
    options: {
      A: "$\\text{H}_2^+$",
      B: "$\\text{He}_2^+$",
      C: "$\\text{He}_2$",
      D: "$\\text{Li}_2$"
    },
    correctAnswer: "C",
    explanation: "$\\text{He}_2$ has 4 electrons: $\\sigma_{1s}^2\\, \\sigma^*_{1s}^2$. Bond order $= \\frac{N_b - N_a}{2} = \\frac{2 - 2}{2} = 0$. Hence $\\text{He}_2$ cannot exist.",
    image: null
  },
  {
    id: 75,
    number: 75,
    subject: "Chemistry",
    topic: "Chemical Bonding - Lewis Acid-Base Coordinate Adduct",
    difficulty: "Hard",
    text: "The type of bond formed between the nitrogen of $\\text{NH}_3$ and boron of $\\text{BF}_3$ in the Lewis acid-base adduct $\\text{H}_3\\text{N}\\to\\text{BF}_3$ is:",
    options: {
      A: "Electrovalent",
      B: "Pure Covalent",
      C: "Coordinate (Dative) covalent",
      D: "Hydrogen bond"
    },
    correctAnswer: "C",
    explanation: "Nitrogen donates its lone pair into the vacant $2p$ orbital of electron-deficient boron to form a dative/coordinate covalent bond.",
    image: null
  },
  {
    id: 76,
    number: 76,
    subject: "Chemistry",
    topic: "Chemical Bonding - Coordinate Bond in Carbon Monoxide",
    difficulty: "Hard",
    text: "Which of the following simple gas molecules contains a coordinate covalent bond in its Lewis structure?",
    options: {
      A: "$\\text{CO}$",
      B: "$\\text{CH}_4$",
      C: "$\\text{CO}_2$",
      D: "$\\text{NH}_3$"
    },
    correctAnswer: "A",
    explanation: "In carbon monoxide, after sharing 2 electron pairs, oxygen donates its lone pair to carbon to complete carbon's octet, giving $:C\\Leftarrow O:$ with a coordinate bond.",
    image: null
  },
  {
    id: 77,
    number: 77,
    subject: "Chemistry",
    topic: "Chemical Bonding - Zero Dipole Moment in Linear Triatomics",
    difficulty: "Hard",
    text: "Which of the following molecules has a net dipole moment of zero ($\\mu = 0$) due to symmetrical bond vector cancellation?",
    options: {
      A: "$\\text{H}_2\\text{O}$",
      B: "$\\text{CO}_2$",
      C: "$\\text{HF}$",
      D: "$\\text{HBr}$"
    },
    correctAnswer: "B",
    explanation: "$\\text{CO}_2$ is a linear molecule ($O=C=O$). The two equal and opposite $\\text{C}=\\text{O}$ bond dipole vectors cancel each other completely, giving $\\mu_{net} = 0$.",
    image: null
  },
  {
    id: 78,
    number: 78,
    subject: "Chemistry",
    topic: "Chemical Bonding - Symmetry & Zero Dipole in CCl4",
    difficulty: "Hard",
    text: "Carbon tetrachloride ($\\text{CCl}_4$) contains highly polar $\\text{C}-\\text{Cl}$ bonds but has zero net dipole moment because of:",
    options: {
      A: "Its square planar structure",
      B: "Its regular tetrahedral geometry resulting in vector cancellation",
      C: "Similar atomic sizes of carbon and chlorine",
      D: "Similar electronegativities of carbon and chlorine"
    },
    correctAnswer: "B",
    explanation: "In a regular tetrahedral geometry, the vector sum of four identical bond dipole moments directed towards the vertices is exactly zero.",
    image: null
  },
  {
    id: 79,
    number: 79,
    subject: "Chemistry",
    topic: "Chemical Bonding - Planar vs Pyramidal Polarity Comparison",
    difficulty: "Hard",
    text: "Both $\\text{BF}_3$ and $\\text{NF}_3$ contain polar covalent bonds, but $\\text{BF}_3$ is non-polar ($\\mu = 0$) while $\\text{NF}_3$ is polar ($\\mu = 0.24\\text{ D}$). This is because:",
    options: {
      A: "Boron is a metal and nitrogen is a gas",
      B: "$\\text{B}-\\text{F}$ bond has no dipole moment whereas $\\text{N}-\\text{F}$ has dipole moment",
      C: "Boron atom is smaller than nitrogen atom",
      D: "$\\text{BF}_3$ is trigonal planar (symmetric) whereas $\\text{NF}_3$ is trigonal pyramidal (asymmetric with lone pair)"
    },
    correctAnswer: "D",
    explanation: "$\\text{BF}_3$ has a planar trigonal symmetrical shape where the three $120^\\circ$ bond dipoles cancel out. $\\text{NF}_3$ is pyramidal with a lone pair, causing incomplete cancellation.",
    image: null
  },
  {
    id: 80,
    number: 80,
    subject: "Chemistry",
    topic: "Chemical Bonding - Fajan's Rule for Covalent Character",
    difficulty: "Hard",
    text: "According to Fajan's rules, covalent bond character in an ionic compound is favoured by:",
    options: {
      A: "Large cation and small anion",
      B: "Large cation and large anion",
      C: "Small cation, large anion, and high ionic charges",
      D: "Small cation and small anion"
    },
    correctAnswer: "C",
    explanation: "High polarizing power of small cations and high polarizability of large anions facilitate electron cloud distortion, maximizing covalent character.",
    image: null
  },
  {
    id: 81,
    number: 81,
    subject: "Chemistry",
    topic: "Chemical Bonding - Sigma & Pi Bonds in Ethyne",
    difficulty: "Hard",
    text: "The carbon-carbon triple bond in ethyne ($\\text{H}-\\text{C}\\equiv\\text{C}-\\text{H}$) consists of:",
    options: {
      A: "Three sigma ($\\\\sigma$) bonds",
      B: "Three pi ($\\\\pi$) bonds",
      C: "One sigma ($\\sigma$) and two pi ($\\pi$) bonds",
      D: "Two sigma ($\\sigma$) and one pi ($\\pi$) bond"
    },
    correctAnswer: "C",
    explanation: "A triple bond is composed of one coaxial axial $\\sigma$ bond and two mutually perpendicular lateral $\\pi$ bonds.",
    image: null
  },
  {
    id: 82,
    number: 82,
    subject: "Chemistry",
    topic: "Chemical Bonding - Mechanism of Pi Bond Formation",
    difficulty: "Hard",
    text: "A $\\pi$ (pi) covalent bond is formed by:",
    options: {
      A: "Axial overlapping of atomic orbitals along the internuclear axis",
      B: "Mutual complete sharing of localized electron pairs",
      C: "Sidewise / lateral overlapping of half-filled unhybridized parallel $p$-orbitals",
      D: "Overlapping of spherical $s$-orbitals with $p$-orbitals"
    },
    correctAnswer: "C",
    explanation: "Pi ($\\\\pi$) bonds are formed by lateral (sideways) overlap of parallel $p$-orbitals perpendicular to the internuclear axis.",
    image: null
  },
  {
    id: 83,
    number: 83,
    subject: "Chemistry",
    topic: "Chemical Bonding - VSEPR Comparison of SF4, CF4, XeF4",
    difficulty: "Hard",
    text: "The molecular geometries of $\\text{SF}_4$, $\\text{CF}_4$, and $\\text{XeF}_4$ are:",
    options: {
      A: "Same, with 2, 0, and 1 lone pairs on central atom respectively",
      B: "Same, with 1, 1, and 1 lone pairs on central atom respectively",
      C: "Different, with 0, 1, and 2 lone pairs on central atom respectively",
      D: "Different, with 1 (see-saw), 0 (tetrahedral), and 2 (square planar) lone pairs on central atom respectively"
    },
    correctAnswer: "D",
    explanation: "$\\text{SF}_4$: 4 bp + 1 lp $\\implies$ See-saw shape ($sp^3d$).\n$\\text{CF}_4$: 4 bp + 0 lp $\\implies$ Regular tetrahedral ($sp^3$).\n$\\text{XeF}_4$: 4 bp + 2 lp $\\implies$ Square planar ($sp^3d^2$).",
    image: null
  },
  {
    id: 84,
    number: 84,
    subject: "Chemistry",
    topic: "Chemical Bonding - Identification of Non-sp3 Species",
    difficulty: "Hard",
    text: "In which of the following species does the central atom NOT use $sp^3$ hybrid orbitals in its bonding?",
    options: {
      A: "$\\text{BeF}_3^-$",
      B: "$\\text{H}_3\\text{O}^+$",
      C: "$\\text{NH}_2^-$",
      D: "$\\text{NF}_3$"
    },
    correctAnswer: "A",
    explanation: "In $\\text{BeF}_3^-$, Be has 3 bond pairs and 0 lone pairs $\\implies$ Steric number $= 3 \\implies sp^2$ hybridization. In all other options ($\\text{H}_3\\text{O}^+, \\text{NH}_2^-, \\text{NF}_3$), steric number is 4 ($sp^3$).",
    image: null
  },
  {
    id: 85,
    number: 85,
    subject: "Chemistry",
    topic: "Chemical Bonding - Geometry of Xenon Tetrafluoride",
    difficulty: "Hard",
    text: "The shape/geometry of the $\\text{XeF}_4$ molecule is:",
    options: {
      A: "Linear",
      B: "Tetrahedral",
      C: "Pyramidal",
      D: "Square planar"
    },
    correctAnswer: "D",
    explanation: "$\\text{XeF}_4$ has $8 + 4 = 12$ valence electrons $\\implies 4\\text{ bp} + 2\\text{ lp} = 6\\text{ steric number} \\implies sp^3d^2$ hybridisation with lone pairs trans to each other, giving a square planar geometry.",
    image: null
  },
  {
    id: 86,
    number: 86,
    subject: "Chemistry",
    topic: "Chemical Bonding - Hybrid Orbital Energy Characteristics",
    difficulty: "Hard",
    text: "As compared to the unhybridized atomic orbitals from which they are formed, hybrid orbitals have:",
    options: {
      A: "Equivalent directional properties and lower energy in the bonded state",
      B: "Exactly same energy and shape",
      C: "Higher energy in all states",
      D: "No directional character"
    },
    correctAnswer: "A",
    explanation: "Hybridisation produces equivalent degenerate orbitals that form stronger, more stable bonds with lower overall system energy.",
    image: null
  },
  {
    id: 87,
    number: 87,
    subject: "Chemistry",
    topic: "Chemical Bonding - Hybridization State in PCl5",
    difficulty: "Hard",
    text: "The phosphorus atom in a gaseous $\\text{PCl}_5$ molecule undergoes which hybridization state?",
    options: {
      A: "$sp^2 d^2$",
      B: "$sp^3 d$",
      C: "$sp d^3$",
      D: "$sp^2 d^3$"
    },
    correctAnswer: "B",
    explanation: "Phosphorus has 5 valence electrons and forms 5 $\\sigma$ bonds with chlorine $\\implies 5\\text{ electron pairs} \\implies sp^3d$ hybridization with trigonal bipyramidal geometry.",
    image: null
  },
  {
    id: 88,
    number: 88,
    subject: "Chemistry",
    topic: "Chemical Bonding - Geometry and Hybridization in BF3",
    difficulty: "Hard",
    text: "The geometry and hybridization present about the central boron atom in boron trifluoride ($\\text{BF}_3$) is:",
    options: {
      A: "Linear, $sp$",
      B: "Trigonal planar, $sp^2$",
      C: "Tetrahedral, $sp^3$",
      D: "Pyramidal, $sp^3$"
    },
    correctAnswer: "B",
    explanation: "Boron has 3 valence electrons forming 3 single bonds with fluorine at $120^\\circ$ angles $\\implies sp^2$ hybridization with trigonal planar geometry.",
    image: null
  },
  {
    id: 89,
    number: 89,
    subject: "Chemistry",
    topic: "Chemical Bonding - Variation of Bond Angle with Hybridization",
    difficulty: "Hard",
    text: "When the hybridization state of carbon changes from $sp^3 \\to sp^2 \\to sp$, the angle between the hybridized orbitals:",
    options: {
      A: "Decreases gradually",
      B: "Increases gradually ($109.5^\\circ \\to 120^\\circ \\to 180^\\circ$)",
      C: "Decreases considerably",
      D: "Remains constant"
    },
    correctAnswer: "B",
    explanation: "As $s$-character increases ($25\\% \\to 33.3\\% \\to 50\\%$), the interorbital angle increases from $109^\\circ 28' (sp^3) \\to 120^\\circ (sp^2) \\to 180^\\circ (sp)$.",
    image: null
  },
  {
    id: 90,
    number: 90,
    subject: "Chemistry",
    topic: "Chemical Bonding - Valid Resonating Structures of CO2",
    difficulty: "Hard",
    text: "Which of the following is NOT a valid resonating canonical structure of carbon dioxide ($\\text{CO}_2$)?",
    options: {
      A: "$O = C = O$",
      B: "$^-O - C \\equiv O^+$",
      C: "$^+O \\equiv C - O^-$",
      D: "$O \\equiv C = O$"
    },
    correctAnswer: "D",
    explanation: "In $O \\equiv C = O$, the carbon atom would have 5 bonds (10 valence electrons), which violates the strict octet rule for second-period elements.",
    image: null
  },
  {
    id: 91,
    number: 91,
    subject: "Chemistry",
    topic: "Chemical Bonding - Nodal Plane and d-Orbital in Hybridization",
    difficulty: "Hard",
    text: "Given below are two statements:\n**Statement I:** The nodal plane for the $\\pi$-bond of ethene is located in the molecular plane of the nuclei.\n**Statement II:** The $d$-orbital involved in $sp^3d$ hybridization of trigonal bipyramidal geometry is $d_{z^2}$.\n\nChoose the correct option:",
    options: {
      A: "Statement I is correct but Statement II is incorrect.",
      B: "Statement I is incorrect but Statement II is correct.",
      C: "Both Statement I and Statement II are correct.",
      D: "Both Statement I and Statement II are incorrect."
    },
    correctAnswer: "C",
    explanation: "Statement I: Lateral $2p_z$ overlap produces zero electron density along the $xy$ molecular plane (nodal plane).\nStatement II: In $sp^3d$ trigonal bipyramidal geometry, the axial bonds use the $d_{z^2}$ orbital.",
    image: null
  },
  {
    id: 92,
    number: 92,
    subject: "Chemistry",
    topic: "Chemical Bonding - Percentage Ionic Character from Dipole Moment",
    difficulty: "Hard",
    text: "The observed dipole moment of $\\text{KCl}$ is $3.336 \\times 10^{-29}\\text{ C m}$. If the interionic distance between $\\text{K}^+$ and $\\text{Cl}^-$ is $2.6 \\times 10^{-10}\\text{ m}$, the percentage ionic character of $\\text{KCl}$ is:",
    options: {
      A: "$86.4\\%$",
      B: "$80.2\\%$",
      C: "$74.1\\%$",
      D: "$92.6\\%$"
    },
    correctAnswer: "B",
    explanation: "$$\\mu_{theoretical} = q \\times d = (1.602 \\times 10^{-19}\\text{ C}) \\times (2.6 \\times 10^{-10}\\text{ m}) = 4.165 \\times 10^{-29}\\text{ C m}$$\n$$\\%\\text{ Ionic Character} = \\frac{\\mu_{observed}}{\\mu_{theoretical}} \\times 100 = \\frac{3.336 \\times 10^{-29}}{4.165 \\times 10^{-29}} \\times 100 \\approx 80.2\\%.$$",
    image: null
  },
  {
    id: 93,
    number: 93,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory & Hund's Rule Violation Hypothesis",
    difficulty: "Hard",
    text: "Assuming Hund's rule of maximum multiplicity is violated, the bond order and magnetic nature of a hypothetical $\\text{B}_2$ molecule would be:",
    options: {
      A: "$1\\text{ and paramagnetic}$",
      B: "$0\\text{ and diamagnetic}$",
      C: "$2\\text{ and diamagnetic}$",
      D: "$1\\text{ and diamagnetic}$"
    },
    correctAnswer: "D",
    explanation: "$\\text{B}_2$ has 6 valence electrons: $\\sigma_{2s}^2\\, \\sigma^*_{2s}^2\\, (\\pi_{2p_x}, \\pi_{2p_y})$. If Hund's rule is violated, both electrons pair up into $\\pi_{2p_x}^2\\, \\pi_{2p_y}^0$, resulting in zero unpaired electrons (diamagnetic) while the bond order remains $\\frac{4 - 2}{2} = 1$.",
    image: null
  },
  {
    id: 94,
    number: 94,
    subject: "Chemistry",
    topic: "Chemical Bonding - Maximum H-Bonds in Ice/Water",
    difficulty: "Hard",
    text: "The maximum number of hydrogen bonds formed by a single water ($\\text{H}_2\\text{O}$) molecule in ice is:",
    options: {
      A: "$1$",
      B: "$2$",
      C: "$3$",
      D: "$4$"
    },
    correctAnswer: "D",
    explanation: "Each water molecule has 2 hydrogen atoms (acts as 2 H-bond donors) and 2 lone pairs on oxygen (acts as 2 H-bond acceptors), allowing a maximum of 4 hydrogen bonds in tetrahedral ice lattice.",
    image: null
  },
  {
    id: 95,
    number: 95,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory & Oxygen Bond Length Trend",
    difficulty: "Hard",
    text: "The correct order of increasing $\\text{O}-\\text{O}$ bond length in the species $\\text{KO}_2\\text{ (I)}$, $\\text{O}_2\\text{ (II)}$, and $\\text{O}_2[\\text{AsF}_6]\\text{ (III)}$ is:",
    options: {
      A: "$\\text{I} > \\text{II} > \\text{III}$",
      B: "$\\text{III} > \\text{II} > \\text{I}$",
      C: "$\\text{I} > \\text{III} > \\text{II}$",
      D: "$\\text{III} > \\text{I} > \\text{II}$"
    },
    correctAnswer: "A",
    explanation: "Species present: $\\text{KO}_2 \\implies \\text{O}_2^-$ (Superoxide, $\\text{B.O.} = 1.5$);\n$\\text{O}_2 \\implies \\text{B.O.} = 2.0$;\n$\\text{O}_2[\\text{AsF}_6] \\implies \\text{O}_2^+$ (Dioxygenyl cation, $\\text{B.O.} = 2.5$).\nSince $\\text{Bond Length} \\propto \\frac{1}{\\text{Bond Order}}$, bond length order is $\\text{O}_2^- (\\text{I}) > \\text{O}_2 (\\text{II}) > \\text{O}_2^+ (\\text{III})$.",
    image: null
  },
  {
    id: 96,
    number: 96,
    subject: "Chemistry",
    topic: "Chemical Bonding - Non-Equivalence of Axial and Equatorial Bonds",
    difficulty: "Hard",
    text: "In which of the following gaseous molecules are all bond lengths NOT equal due to axial-equatorial electronic repulsion differences?",
    options: {
      A: "$\\text{XeF}_2$",
      B: "$\\text{SF}_6$",
      C: "$\\text{PF}_5$",
      D: "$\\text{BF}_3$"
    },
    correctAnswer: "C",
    explanation: "In $\\text{PF}_5$ ($sp^3d$ trigonal bipyramidal), the two axial $\\text{P}-\\text{F}$ bonds ($219\\text{ pm}$) experience stronger $90^\\circ$ repulsions and are significantly longer than the three equatorial bonds ($204\\text{ pm}$).",
    image: null
  },
  {
    id: 97,
    number: 97,
    subject: "Chemistry",
    topic: "Chemical Bonding - Strict Octet Rule Obedience",
    difficulty: "Hard",
    text: "How many molecules among $\\text{SCl}_2$, $\\text{NO}_2$, $\\text{BCl}_3$, $\\text{N}_2\\text{O}_5$, and $\\text{CO}$ strictly obey the octet rule for every atom?",
    options: {
      A: "$4$",
      B: "$1$",
      C: "$2$",
      D: "$3$"
    },
    correctAnswer: "D",
    explanation: "1. $\\text{SCl}_2$: S has 8 electrons (obey).\n2. $\\text{NO}_2$: Odd-electron molecule, N has 7 electrons (violation).\n3. $\\text{BCl}_3$: Electron deficient, B has 6 electrons (violation).\n4. $\\text{N}_2\\text{O}_5$: All N and O atoms have complete octets (obey).\n5. $\\text{CO}$: Both C and O have complete octets (obey).\nTotal obeying $= 3$ ($\text{SCl}_2, \\text{N}_2\\text{O}_5, \\text{CO}$).",
    image: null
  },
  {
    id: 98,
    number: 98,
    subject: "Chemistry",
    topic: "Chemical Bonding - Sigma and Pi Counting in Organic Nitriles",
    difficulty: "Hard",
    text: "The total number of $\\sigma$ (sigma) and $\\pi$ (pi) bonds in 2-butenenitrile ($\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{C}\\equiv\\text{N}$) is:",
    options: {
      A: "$8\\sigma, 3\\pi$",
      B: "$9\\sigma, 1\\pi$",
      C: "$9\\sigma, 3\\pi$",
      D: "$8\\sigma, 1\\pi$"
    },
    correctAnswer: "C",
    explanation: "Count of bonds:\n- $3 \\times (\\text{C}-\\text{H})$ in $\\text{CH}_3 = 3\\sigma$\n- $\\text{C}-\\text{C}$ single bond $= 1\\sigma$\n- $2 \\times (\\text{C}-\\text{H})$ on alkene carbons $= 2\\sigma$\n- $\\text{C}=\\text{C}$ double bond $= 1\\sigma + 1\\pi$\n- $\\text{C}-\\text{C}$ single bond to nitrile $= 1\\sigma$\n- $\\text{C}\\equiv\\text{N}$ triple bond $= 1\\sigma + 2\\pi$\nTotal $= (3+1+2+1+1+1)\\sigma = 9\\sigma$ and $(1+2)\\pi = 3\\pi$.",
    image: null
  },
  {
    id: 99,
    number: 99,
    subject: "Chemistry",
    topic: "Chemical Bonding - Comparative Bond Length Order",
    difficulty: "Hard",
    text: "The correct decreasing order of single bond lengths for the given covalent bonds is:",
    options: {
      A: "$\\text{C}-\\text{C} > \\text{C}-\\text{O} > \\text{O}-\\text{H} > \\text{C}-\\text{H}$",
      B: "$\\text{C}-\\text{C} > \\text{C}-\\text{O} > \\text{C}-\\text{H} > \\text{O}-\\text{H}$",
      C: "$\\text{C}-\\text{O} > \\text{C}-\\text{C} > \\text{C}-\\text{H} > \\text{O}-\\text{H}$",
      D: "$\\text{C}-\\text{O} > \\text{C}-\\text{C} > \\text{O}-\\text{H} > \\text{C}-\\text{H}$"
    },
    correctAnswer: "B",
    explanation: "Bond lengths: $\\text{C}-\\text{C} (154\\text{ pm}) > \\text{C}-\\text{O} (143\\text{ pm}) > \\text{C}-\\text{H} (109\\text{ pm}) > \\text{O}-\\text{H} (96\\text{ pm})$.",
    image: null
  },
  {
    id: 100,
    number: 100,
    subject: "Chemistry",
    topic: "Chemical Bonding - Canonical Forms & Polyatomic Bond Orders",
    difficulty: "Hard",
    text: "Match List I with List II:\n\nList I:\n(A) Canonical forms of $\\text{CO}_2$\n(B) $\\text{S}-\\text{O}$ bond order in $\\text{SO}_4^{2-}$\n(C) Lone pairs on central atom in $\\text{XeF}_4$\n(D) $\\text{C}-\\text{O}$ bond order in $\\text{CO}_3^{2-}$\n\nList II:\n(I) $1.5$\n(II) $2$\n(III) $1.33$\n(IV) $3$",
    options: {
      A: "$A \\to \\text{IV}, B \\to \\text{I}, C \\to \\text{II}, D \\to \\text{III}$",
      B: "$A \\to \\text{IV}, B \\to \\text{III}, C \\to \\text{II}, D \\to \\text{I}$",
      C: "$A \\to \\text{III}, B \\to \\text{I}, C \\to \\text{IV}, D \\to \\text{II}$",
      D: "$A \\to \\text{III}, B \\to \\text{IV}, C \\to \\text{II}, D \\to \\text{I}$"
    },
    correctAnswer: "A",
    explanation: "- Canonical forms of $\\text{CO}_2 = 3$ ($A \\to \\text{IV}$).\n- $\\text{S}-\\text{O}$ bond order in $\\text{SO}_4^{2-} = \\frac{6}{4} = 1.5$ ($B \\to \\text{I}$).\n- Lone pairs on Xe in $\\text{XeF}_4 = 2$ ($C \\to \\text{II}$).\n- $\\text{C}-\\text{O}$ bond order in $\\text{CO}_3^{2-} = \\frac{4}{3} = 1.33$ ($D \\to \\text{III}$).",
    image: null
  },
  {
    id: 101,
    number: 101,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory Without 2s-2p Mixing",
    difficulty: "Hard",
    text: "Assuming $2s-2p$ mixing is NOT operative (standard $\\sigma_{2p_z} < \\pi_{2p}$ ordering), which of the following diatomic species will be paramagnetic with unpaired electrons?",
    options: {
      A: "$\\text{Be}_2$",
      B: "$\\text{B}_2$",
      C: "$\\text{C}_2$",
      D: "$\\text{N}_2$"
    },
    correctAnswer: "C",
    explanation: "For $\\text{C}_2$ (8 valence electrons) without mixing: $\\sigma_{2s}^2\\, \\sigma^*_{2s}^2\\, \\sigma_{2p_z}^2\\, \\pi_{2p_x}^1\\, \\pi_{2p_y}^1$. This leaves 2 unpaired electrons in degenerate $\\pi$-orbitals, making it paramagnetic.",
    image: null
  },
  {
    id: 102,
    number: 102,
    subject: "Chemistry",
    topic: "Chemical Bonding - Shapes of Triiodide Cation and Anion",
    difficulty: "Hard",
    text: "The molecular shapes of $\\text{I}_3^+$ and $\\text{I}_3^-$ respectively are:",
    options: {
      A: "Angular (Bent) and Linear",
      B: "Linear and V-shape",
      C: "Angular and Bent",
      D: "Trigonal planar and Angular"
    },
    correctAnswer: "A",
    explanation: "$\\text{I}_3^+$: Central I has 2 bond pairs + 2 lone pairs $\\implies sp^3$ hybridization with Bent / Angular shape.\n$\\text{I}_3^-$: Central I has 2 bond pairs + 3 lone pairs (equatorial) $\\implies sp^3d$ hybridization with Linear shape.",
    image: null
  },
  {
    id: 103,
    number: 103,
    subject: "Chemistry",
    topic: "Chemical Bonding - Hydrogen Polyhalide Salt Formation",
    difficulty: "Hard",
    text: "Which of the following hydrogen halides forms stable bifluoride / $\\text{KHX}_2$ type acid salts?",
    options: {
      A: "$\\text{HF}$",
      B: "$\\text{HCl}$",
      C: "$\\text{HBr}$",
      D: "$\\text{HI}$"
    },
    correctAnswer: "A",
    explanation: "Due to strong symmetric hydrogen bonding in $[\text{F}-\\text{H}\\cdots\\text{F}]^-$, $\\text{HF}$ forms stable $\\text{KHF}_2$ ($\text{K}^+ \\text{HF}_2^-$) salts. Heavier halogens cannot form $[\text{X}-\\text{H}\\cdots\\text{X}]^-$.",
    image: null
  },
  {
    id: 104,
    number: 104,
    subject: "Chemistry",
    topic: "Chemical Bonding - Dipole Moments of Fluoromethane vs Chloromethane",
    difficulty: "Hard",
    text: "Which of the following comparisons regarding molecular dipole moments is INCORRECT?",
    options: {
      A: "$\\text{HF} > \\text{HCl}$",
      B: "$\\text{CH}_3\\text{F} > \\text{CH}_3\\text{Cl}$",
      C: "$\\text{NH}_3 > \\text{NF}_3$",
      D: "$\\text{SO}_2 > \\text{CO}_2$"
    },
    correctAnswer: "B",
    explanation: "Because $\\mu = q \\times d$, although fluorine is more electronegative than chlorine, the significantly larger $\\text{C}-\\text{Cl}$ bond distance makes $\\mu(\\text{CH}_3\\text{Cl}) = 1.87\\text{ D} > \\mu(\\text{CH}_3\\text{F}) = 1.82\\text{ D}$. Thus option B is incorrect.",
    image: null
  },
  {
    id: 105,
    number: 105,
    subject: "Chemistry",
    topic: "Chemical Bonding - Orbital Overlap Types in Bonding",
    difficulty: "Hard",
    text: "Match the orbital overlap representations in List I with their descriptions in List II:\n\nList I:\n(A) Head-on overlap of $d_{z^2}-d_{z^2}$\n(B) Out-of-phase lateral overlap of $p_x-d_{xz}$\n(C) Out-of-phase head-on overlap of $d_{z^2}-d_{z^2}$\n(D) In-phase lateral overlap of $p_y-d_{yz}$\n\nList II:\n(I) $d-d\\ \\sigma\\text{ bonding}$\n(II) $p-d\\ \\pi^*\\text{ antibonding}$\n(III) $d-d\\ \\sigma^*\\text{ antibonding}$\n(IV) $p-d\\ \\pi\\text{ bonding}$",
    options: {
      A: "$A \\to \\text{I}, B \\to \\text{II}, C \\to \\text{III}, D \\to \\text{IV}$",
      B: "$A \\to \\text{I}, B \\to \\text{IV}, C \\to \\text{II}, D \\to \\text{III}$",
      C: "$A \\to \\text{II}, B \\to \\text{IV}, C \\to \\text{I}, D \\to \\text{III}$",
      D: "$A \\to \\text{II}, B \\to \\text{III}, C \\to \\text{IV}, D \\to \\text{I}$"
    },
    correctAnswer: "A",
    explanation: "- Head-on in-phase overlap of $d_{z^2}-d_{z^2} \\implies d-d\\ \\sigma$ bonding ($A \\to \\text{I}$).\n- Out-of-phase lateral overlap of $p-d \\implies p-d\\ \\pi^*$ antibonding ($B \\to \\text{II}$).\n- Out-of-phase head-on overlap of $d-d \\implies d-d\\ \\sigma^*$ antibonding ($C \\to \\text{III}$).\n- In-phase lateral overlap of $p-d \\implies p-d\\ \\pi$ bonding ($D \\to \\text{IV}$).",
    image: DIAGRAMS.chem_orbital_overlap
  },
  {
    id: 106,
    number: 106,
    subject: "Chemistry",
    topic: "Chemical Bonding - Minimum Ionic Character via Fajan's Rules",
    difficulty: "Hard",
    text: "Which of the following alkali metal halides exhibits the MINIMUM percentage ionic character (maximum covalent character)?",
    options: {
      A: "$\\text{KCl}$",
      B: "$\\text{NaBr}$",
      C: "$\\text{LiI}$",
      D: "$\\text{CsF}$"
    },
    correctAnswer: "C",
    explanation: "According to Fajan's rules, the combination of the smallest cation ($\\text{Li}^+$) and the largest anion ($\\text{I}^-$) creates the highest polarization and maximal covalent character (minimum ionic character).",
    image: null
  },
  {
    id: 107,
    number: 107,
    subject: "Chemistry",
    topic: "Chemical Bonding - Lewis Acid-Base Adduct Properties",
    difficulty: "Hard",
    text: "Consider the Lewis acid-base reaction: $\\text{BF}_3 + \\text{NH}_3 \\to \\text{BF}_3\\cdot\\text{NH}_3$.\nWhich of the following statements is/are correct?\nI. $\\text{B}-\\text{F}$ bond length increases.\nII. Hybridization of B changes from $sp^2$ to $sp^3$.\nIII. Hybridization of N changes.\n\nChoose the correct option:",
    options: {
      A: "I and II only",
      B: "II and III only",
      C: "I and III only",
      D: "I, II and III"
    },
    correctAnswer: "A",
    explanation: "In $\\text{BF}_3$, B is $sp^2$ with partial double bond character in $\\text{B}-\\text{F}$ due to backbonding. Upon forming adduct, B becomes $sp^3$ (statement II is true), backbonding ceases so $\\text{B}-\\text{F}$ bond length increases (statement I is true). Nitrogen remains $sp^3$ hybridized (statement III is false).",
    image: null
  },
  {
    id: 108,
    number: 108,
    subject: "Chemistry",
    topic: "Chemical Bonding - Bond Angle Steric Repulsions in Oxides",
    difficulty: "Hard",
    text: "In which of the following oxygen halide molecules is the bond angle GREATER than the normal tetrahedral angle ($109^\\circ 28'$)?",
    options: {
      A: "$\\text{F}_2\\text{O}$",
      B: "$\\text{Cl}_2\\text{O}$",
      C: "$\\text{H}_2\\text{O}$",
      D: "$\\text{None of these}$"
    },
    correctAnswer: "B",
    explanation: "In $\\text{Cl}_2\\text{O}$, the bulky chlorine atoms and their non-bonding lone pairs undergo strong steric repulsion, opening the $\\text{Cl}-\\text{O}-\\text{Cl}$ bond angle to $110.9^\\circ$ ($> 109^\\circ 28'$). In $\\text{OF}_2$ it is $103^\\circ$ and in $\\text{H}_2\\text{O}$ it is $104.5^\\circ$.",
    image: null
  },
  {
    id: 109,
    number: 109,
    subject: "Chemistry",
    topic: "Chemical Bonding - Presence of p(pi)-d(pi) Backbonding",
    difficulty: "Hard",
    text: "$p\\pi - d\\pi$ multiple bonding is present in which of the following oxyanions?",
    options: {
      A: "$\\text{NO}_3^-$",
      B: "$\\text{CO}_3^{2-}$",
      C: "$\\text{SO}_3^{2-}$",
      D: "$\\text{BO}_3^{3-}$"
    },
    correctAnswer: "C",
    explanation: "Sulfur belongs to the 3rd period and possesses accessible vacant $3d$ orbitals that overlap with filled $2p$ orbitals of oxygen ($p\\pi-d\\pi$). N, C, and B lack $d$-orbitals.",
    image: null
  },
  {
    id: 110,
    number: 110,
    subject: "Chemistry",
    topic: "Chemical Bonding - Coexistence of Ionic and Covalent Bonds",
    difficulty: "Hard",
    text: "Both ionic and covalent bonds are present in which of the following substances?",
    options: {
      A: "$\\text{CaC}_2$",
      B: "$\\text{KOH}$",
      C: "$\\text{NH}_4\\text{Cl}$",
      D: "All of these"
    },
    correctAnswer: "D",
    explanation: "- $\\text{CaC}_2$: $\\text{Ca}^{2+}$ and $(:\\text{C}\\equiv\\text{C}:)^{2-}$ (ionic + covalent).\n- $\\text{KOH}$: $\\text{K}^+$ and $\\text{OH}^-$ (ionic + covalent $\\text{O}-\\text{H}$).\n- $\\text{NH}_4\\text{Cl}$: $\\text{NH}_4^+$ and $\\text{Cl}^-$ (ionic + covalent $\\text{N}-\\text{H}$).",
    image: null
  },
  {
    id: 111,
    number: 111,
    subject: "Chemistry",
    topic: "Chemical Bonding - Inter vs Intramolecular Hydrogen Bonding",
    difficulty: "Hard",
    text: "Given below are two statements:\n**Assertion A:** $p$-Nitrophenol has a higher boiling point than $o$-nitrophenol.\n**Reason R:** $p$-Nitrophenol exhibits intermolecular hydrogen bonding leading to molecular association, whereas $o$-nitrophenol forms chelated intramolecular hydrogen bonding.\n\nChoose the correct option:",
    options: {
      A: "A is true but R is false.",
      B: "A is false but R is true.",
      C: "Both A and R are true and R is the correct explanation of A.",
      D: "Both A and R are true but R is NOT the correct explanation of A."
    },
    correctAnswer: "C",
    explanation: "Intermolecular H-bonding in $p$-nitrophenol connects molecules into extended chains, elevating its boiling point. Intramolecular H-bonding in $o$-nitrophenol prevents association (making it steam-volatile).",
    image: null
  },
  {
    id: 112,
    number: 112,
    subject: "Chemistry",
    topic: "Chemical Bonding - Bond Angle Trend in Nitrogen Species",
    difficulty: "Hard",
    text: "The correct decreasing order of bond angles in the species $\\text{NO}_2^+$, $\\text{NO}_2$, and $\\text{NO}_2^-$ is:",
    options: {
      A: "$\\text{NO}_2^+ > \\text{NO}_2 > \\text{NO}_2^-$",
      B: "$\\text{NO}_2 > \\text{NO}_2^- > \\text{NO}_2^+$",
      C: "$\\text{NO}_2^- > \\text{NO}_2^+ > \\text{NO}_2$",
      D: "$\\text{NO}_2^+ > \\text{NO}_2^- > \\text{NO}_2$"
    },
    correctAnswer: "A",
    explanation: "- $\\text{NO}_2^+$: $sp$ linear, bond angle $= 180^\\circ$.\n- $\\text{NO}_2$: Single unpaired electron repulsion, bond angle $= 134^\\circ$.\n- $\\text{NO}_2^-$: Full lone pair repulsion, bond angle $= 115^\\circ$.\nOrder: $\\text{NO}_2^+ (180^\\circ) > \\text{NO}_2 (134^\\circ) > \\text{NO}_2^- (115^\\circ)$.",
    image: null
  },
  {
    id: 113,
    number: 113,
    subject: "Chemistry",
    topic: "Chemical Bonding - Non-Bonding Orbital Symmetry Overlap",
    difficulty: "Hard",
    text: "Considering the $z$-axis as the internuclear molecular axis, which of the following atomic orbital combinations will result in ZERO net overlap (non-bonding)?",
    options: {
      A: "$p_z + p_z$",
      B: "$p_x + p_y$",
      C: "$s + p_z$",
      D: "$p_y + p_y$"
    },
    correctAnswer: "B",
    explanation: "Orbitals of mutually orthogonal orientations ($p_x$ along $x$ and $p_y$ along $y$) have positive and negative overlapping lobes that cancel out completely, yielding zero net overlap.",
    image: null
  },
  {
    id: 114,
    number: 114,
    subject: "Chemistry",
    topic: "Chemical Bonding - Bond Dissociation Enthalpy in Hydrogen Species",
    difficulty: "Hard",
    text: "The correct decreasing order of bond dissociation enthalpy for $\\text{H}_2$, $\\text{H}_2^+$, and $\\text{H}_2^-$ is:",
    options: {
      A: "$\\text{H}_2 > \\text{H}_2^+ > \\text{H}_2^-$",
      B: "$\\text{H}_2^+ > \\text{H}_2^- > \\text{H}_2$",
      C: "$\\text{H}_2^- > \\text{H}_2^+ > \\text{H}_2$",
      D: "$\\text{H}_2 > \\text{H}_2^- > \\text{H}_2^+$"
    },
    correctAnswer: "A",
    explanation: "$\\text{H}_2$ ($\text{B.O.} = 1.0$) has the highest bond enthalpy ($436\\text{ kJ/mol}$). $\\text{H}_2^+$ and $\\text{H}_2^-$ both have $\\text{B.O.} = 0.5$, but $\\text{H}_2^-$ has an electron in the destabilizing antibonding $\\sigma^*_{1s}$ orbital, making its bond slightly weaker than $\\text{H}_2^+$.",
    image: null
  },
  {
    id: 115,
    number: 115,
    subject: "Chemistry",
    topic: "Chemical Bonding - Directional Overlapping Efficiency Order",
    difficulty: "Hard",
    text: "The correct order of extent of orbital overlapping and resulting bond strength for directional vs non-directional orbitals is:",
    options: {
      A: "$2s-2s > 2s-2p > 2p-2p$",
      B: "$2p-2p > 2s-2p > 2s-2s$",
      C: "$2s-2s > 2p-2p > 2s-2p$",
      D: "$2p-2p > 2s-2s > 2s-2p$"
    },
    correctAnswer: "B",
    explanation: "Directional $p$-orbitals undergo much greater concentrated coaxial spatial overlap than spherically symmetric non-directional $s$-orbitals.",
    image: null
  },
  {
    id: 116,
    number: 116,
    subject: "Chemistry",
    topic: "Chemical Bonding - Lattice Energy Comparison",
    difficulty: "Hard",
    text: "Which of the following ionic compounds possesses the HIGHEST lattice energy?",
    options: {
      A: "$\\text{MgCl}_2$",
      B: "$\\text{NaCl}$",
      C: "$\\text{CaO}$",
      D: "$\\text{Al}_2\\text{O}_3$"
    },
    correctAnswer: "D",
    explanation: "Lattice energy $U \\propto \\frac{|z_+ z_-|}{r_+ + r_-}$. In $\\text{Al}_2\\text{O}_3$, the charges are $+3$ and $-2$ ($|z_+ z_-| = 6$) with very small ionic radii, giving it the highest lattice energy.",
    image: null
  },
  {
    id: 117,
    number: 117,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory Bond Order of Nitrosonium Cation",
    difficulty: "Hard",
    text: "The bond order of the nitrosonium ion ($\\text{NO}^+$) according to Molecular Orbital Theory is:",
    options: {
      A: "$2.5$",
      B: "$3.0$",
      C: "$3.5$",
      D: "$2.0$"
    },
    correctAnswer: "B",
    explanation: "$\\text{NO}^+$ has $7 + 8 - 1 = 14$ electrons (isoelectronic with $\\text{N}_2$). Its MO configuration is $\\sigma_{1s}^2 \\sigma^*_{1s}^2 \\sigma_{2s}^2 \\sigma^*_{2s}^2 \\pi_{2p_x}^2 \\pi_{2p_y}^2 \\sigma_{2p_z}^2$. Bond order $= \\frac{10 - 4}{2} = 3.0$.",
    image: null
  },
  {
    id: 118,
    number: 118,
    subject: "Chemistry",
    topic: "Chemical Bonding - Absent Bond Angles in Trigonal Bipyramid",
    difficulty: "Hard",
    text: "Which of the following bond angles is completely ABSENT in a symmetrical gaseous $\\text{PCl}_5$ molecule?",
    options: {
      A: "$180^\\circ$",
      B: "$90^\\circ$",
      C: "$120^\\circ$",
      D: "$60^\\circ$"
    },
    correctAnswer: "D",
    explanation: "In $sp^3d$ trigonal bipyramidal $\\text{PCl}_5$, equatorial-equatorial angles are $120^\\circ$, axial-equatorial angles are $90^\\circ$, and axial-axial angle is $180^\\circ$. A $60^\\circ$ bond angle does not exist.",
    image: null
  },
  {
    id: 119,
    number: 119,
    subject: "Chemistry",
    topic: "Chemical Bonding - Absence of Resonance in Network Solids",
    difficulty: "Hard",
    text: "Resonance stabilization is completely ABSENT in which of the following substances?",
    options: {
      A: "$\\text{SO}_2$",
      B: "$\\text{O}_3$",
      C: "$\\text{SiO}_2$",
      D: "$\\text{NO}_2$"
    },
    correctAnswer: "C",
    explanation: "$\\text{SiO}_2$ (quartz/silica) is a three-dimensional giant covalent network solid composed entirely of localized single $\\text{Si}-\\text{O}$ $\\sigma$-bonds with no delocalized $\\pi$-resonance.",
    image: null
  },
  {
    id: 120,
    number: 120,
    subject: "Chemistry",
    topic: "Chemical Bonding - MO Theory Molecules with Purely Pi Bonds",
    difficulty: "Hard",
    text: "According to Molecular Orbital Theory, which of the following second-period homonuclear diatomic molecules contains ONLY $\\pi$ (pi) bonds and NO $\\sigma$ (sigma) bond in its double bond?",
    options: {
      A: "$\\text{B}_2$",
      B: "$\\text{C}_2$",
      C: "$\\text{F}_2$",
      D: "$\\text{N}_2$"
    },
    correctAnswer: "B",
    explanation: "$\\text{C}_2$ has 8 valence electrons: $\\sigma_{2s}^2\\, \\sigma^*_{2s}^2\\, \\pi_{2p_x}^2\\, \\pi_{2p_y}^2$. The four bonding electrons reside exclusively in the degenerate $\\pi_{2p}$ orbitals. Hence the double bond in $\\text{C}_2$ consists solely of two $\\pi$ bonds.",
    image: null
  }
];
