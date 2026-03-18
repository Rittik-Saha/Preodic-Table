import { createLayout, utils, stagger, spring, createTimer, createAnimatable } from 'https://esm.sh/animejs@4.3.0';

// Elements data to populate the table

const ELEMENT_FIELDS = {
  SYMBOL: 0,
  NAME: 1,
  COLOR: 2,
  COLUMN: 3,
  ROW: 4,
  ATOMIC_MASS: 5,
  DENSITY: 6,
  MELTING_POINT: 7,
  BOILING_POINT: 8,
  ELECTRON_CONFIG: 9,
};
const ELEMENT_STRIDE = 10;

const elements = [
  // symbol, name, color, column, row, atomicMass, density, meltingPoint, boilingPoint, electron configaration
  'H', 'Hydrogen', 0, 1, 1, 1.008, 0.08988, -259.16, -252.88, '1s¹',
  'He', 'Helium', 1, 18, 1, 4.0026, 0.1786, -272.2, -268.93, '1s²',
  'Li', 'Lithium', 2, 1, 2, 6.94, 0.534, 180.5, 1329.85, '[He] 2s¹',
  'Be', 'Beryllium', 3, 2, 2, 9.012, 1.85, 1286.85, 2468.85, '[He] 2s²',
  'B', 'Boron', 4, 13, 2, 10.81, 2.08, 2075.85, 3926.85, '[He] 2s² 2p¹',
  'C', 'Carbon', 0, 14, 2, 12.011, 1.821, null, null, '[He] 2s² 2p²',
  'N', 'Nitrogen', 0, 15, 2, 14.007, 1.251, -210, -195.79, '[He] 2s² 2p³',
  'O', 'Oxygen', 0, 16, 2, 15.999, 1.429, -218.79, -182.96, '[He] 2s² 2p⁴',
  'F', 'Fluorine', 0, 17, 2, 18.998, 1.696, -219.67, -188.12, '[He] 2s² 2p⁵',
  'Ne', 'Neon', 1, 18, 2, 20.179, 0.9002, -248.59, -246.05, '[He] 2s² 2p⁶',
  'Na', 'Sodium', 2, 1, 3, 22.989, 0.968, 97.79, 882.94, '[Ne] 3s¹',
  'Mg', 'Magnesium', 3, 2, 3, 24.305, 1.738, 649.85, 1089.85, '[Ne] 3s²',
  'Al', 'Aluminium', 5, 13, 3, 26.981, 2.7, 660.32, 2469.85, '[Ne] 3s² 3p¹',
  'Si', 'Silicon', 4, 14, 3, 28.085, 2.329, 1413.85, 3264.85, '[Ne] 3s² 3p²',
  'P', 'Phosphorus', 0, 15, 3, 30.973, 1.823, null, null, '[Ne] 3s² 3p³',
  'S', 'Sulfur', 0, 16, 3, 32.06, 2.07, 115.21, 444.65, '[Ne] 3s² 3p⁴',
  'Cl', 'Chlorine', 0, 17, 3, 35.45, 3.2, -101.55, -34.04, '[Ne] 3s² 3p⁵',
  'Ar', 'Argon', 1, 18, 3, 39.948, 1.784, -189.34, -185.85, '[Ne] 3s² 3p⁶',
  'K', 'Potassium', 2, 1, 4, 39.098, 0.862, 63.55, 758.85, '[Ar] 4s¹',
  'Ca', 'Calcium', 3, 2, 4, 40.078, 1.55, 841.85, 1483.85, '[Ar] 4s²',
  'Sc', 'Scandium', 6, 3, 4, 44.955, 2.985, 1540.85, 2835.85, '[Ar] 3d¹ 4s²',
  'Ti', 'Titanium', 6, 4, 4, 47.867, 4.506, 1667.85, 3286.85, '[Ar] 3d² 4s²',
  'V', 'Vanadium', 6, 5, 4, 50.941, 6, 1909.85, 3406.85, '[Ar] 3d³ 4s²',
  'Cr', 'Chromium', 6, 6, 4, 51.996, 7.19, 1906.85, 2670.85, '[Ar] 3d⁵ 4s¹',
  'Mn', 'Manganese', 6, 7, 4, 54.938, 7.21, 1245.85, 2060.85, '[Ar] 3d⁵ 4s²',
  'Fe', 'Iron', 6, 8, 4, 55.845, 7.874, 1537.85, 2860.85, '[Ar] 3d⁶ 4s²',
  'Co', 'Cobalt', 6, 9, 4, 58.933, 8.9, 1494.85, 2926.85, '[Ar] 3d⁷ 4s²',
  'Ni', 'Nickel', 6, 10, 4, 58.693, 8.908, 1454.85, 2729.85, '[Ar] 3d⁸ 4s²',
  'Cu', 'Copper', 6, 11, 4, 63.546, 8.96, 1084.62, 2561.85, '[Ar] 3d¹⁰ 4s¹',
  'Zn', 'Zinc', 5, 12, 4, 65.382, 7.14, 419.53, 906.85, '[Ar] 3d¹⁰ 4s²',
  'Ga', 'Gallium', 5, 13, 4, 69.723, 5.91, 29.76, 2399.85, '[Ar] 3d¹⁰ 4s² 4p¹',
  'Ge', 'Germanium', 4, 14, 4, 72.630, 5.323, 938.25, 2832.85, '[Ar] 3d¹⁰ 4s² 4p²',
  'As', 'Arsenic', 4, 15, 4, 74.921, 5.727, null, null, '[Ar] 3d¹⁰ 4s² 4p³',
  'Se', 'Selenium', 0, 16, 4, 78.971, 4.81, 220.85, 684.85, '[Ar] 3d¹⁰ 4s² 4p⁴',
  'Br', 'Bromine', 0, 17, 4, 79.904, 3.102, -7.35, 58.85, '[Ar] 3d¹⁰ 4s² 4p⁵',
  'Kr', 'Krypton', 1, 18, 4, 83.798, 3.749, -157.37, -153.22, '[Ar] 3d¹⁰ 4s² 4p⁶',
  'Rb', 'Rubidium', 2, 1, 5, 85.467, 1.532, 39.3, 687.85, '[Kr] 5s¹',
  'Sr', 'Strontium', 3, 2, 5, 87.621, 2.64, 776.85, 1376.85, '[Kr] 5s²',
  'Y', 'Yttrium', 6, 3, 5, 88.905, 4.472, 1525.85, 2929.85, '[Kr] 4d¹ 5s²',
  'Zr', 'Zirconium', 6, 4, 5, 91.224, 6.52, 1854.85, 4376.85, '[Kr] 4d² 5s²',
  'Nb', 'Niobium', 6, 5, 5, 92.906, 8.57, 2476.85, 4743.85, '[Kr] 4d⁴ 5s¹',
  'Mo', 'Molybdenum', 6, 6, 5, 95.951, 10.28, 2622.85, 4638.85, '[Kr] 4d⁵ 5s¹',
  'Tc', 'Technetium', 6, 7, 5, 98, 11, 2156.85, 4264.85, '[Kr] 4d⁵ 5s²',
  'Ru', 'Ruthenium', 6, 8, 5, 101.072, 12.45, 2333.85, 4149.85, '[Kr] 4d⁷ 5s¹',
  'Rh', 'Rhodium', 6, 9, 5, 102.905, 12.41, 1963.85, 3694.85, '[Kr] 4d⁸ 5s¹',
  'Pd', 'Palladium', 6, 10, 5, 106.421, 12.023, 1554.9, 2962.85, '[Kr] 4d¹⁰',
  'Ag', 'Silver', 6, 11, 5, 107.868, 10.49, 961.78, 2161.85, '[Kr] 4d¹⁰ 5s¹',
  'Cd', 'Cadmium', 5, 12, 5, 112.414, 8.65, 321.07, 766.85, '[Kr] 4d¹⁰ 5s²',
  'In', 'Indium', 5, 13, 5, 114.818, 7.31, 156.6, 2071.85, '[Kr] 4d¹⁰ 5s² 5p¹',
  'Sn', 'Tin', 5, 14, 5, 118.710, 7.365, 231.93, 2601.85, '[Kr] 4d¹⁰ 5s² 5p²',
  'Sb', 'Antimony', 4, 15, 5, 121.760, 6.697, 630.63, 1634.85, '[Kr] 4d¹⁰ 5s² 5p³',
  'Te', 'Tellurium', 4, 16, 5, 127.603, 6.24, 449.51, 987.85, '[Kr] 4d¹⁰ 5s² 5p⁴',
  'I', 'Iodine', 0, 17, 5, 126.904, 4.933, 113.7, 184.25, '[Kr] 4d¹⁰ 5s² 5p⁵',
  'Xe', 'Xenon', 1, 18, 5, 131.293, 5.894, -111.75, -108.1, '[Kr] 4d¹⁰ 5s² 5p⁶',
  'Cs', 'Cesium', 2, 1, 6, 132.905, 1.93, 28.55, 670.85, '[Xe] 6s¹',
  'Ba', 'Barium', 3, 2, 6, 137.327, 3.51, 726.85, 1844.85, '[Xe] 6s²',
  'Hf', 'Hafnium', 6, 4, 6, 178.492, 13.31, 2232.85, 4602.85, '[Xe] 4f¹⁴ 5d² 6s²',
  'Ta', 'Tantalum', 6, 5, 6, 180.947, 16.69, 3016.85, 5457.85, '[Xe] 4f¹⁴ 5d³ 6s²',
  'W', 'Tungsten', 6, 6, 6, 183.841, 19.25, 3421.85, 5929.85, '[Xe] 4f¹⁴ 5d⁴ 6s²',
  'Re', 'Rhenium', 6, 7, 6, 186.207, 21.02, 3185.85, 5595.85, '[Xe] 4f¹⁴ 5d⁵ 6s²',
  'Os', 'Osmium', 6, 8, 6, 190.233, 22.59, 3032.85, 5011.85, '[Xe] 4f¹⁴ 5d⁶ 6s²',
  'Ir', 'Iridium', 6, 9, 6, 192.217, 22.56, 2445.85, 4129.85, '[Xe] 4f¹⁴ 5d⁷ 6s²',
  'Pt', 'Platinum', 6, 10, 6, 195.084, 21.45, 1768.25, 3824.85, '[Xe] 4f¹⁴ 5d⁹ 6s¹',
  'Au', 'Gold', 6, 11, 6, 196.966, 19.3, 1064.18, 2969.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
  'Hg', 'Mercury', 5, 12, 6, 200.592, 13.534, -38.83, 356.73, '[Xe] 4f¹⁴ 5d¹⁰ 6s²',
  'Tl', 'Thallium', 5, 13, 6, 204.38, 11.85, 303.85, 1472.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',
  'Pb', 'Lead', 5, 14, 6, 207.21, 11.34, 327.46, 1748.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
  'Bi', 'Bismuth', 5, 15, 6, 208.98, 9.78, 271.55, 1563.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',
  'Po', 'Polonium', 4, 16, 6, 209, 9.196, 253.85, 961.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',
  'At', 'Astatine', 0, 17, 6, 210, 6.35, 301.85, 336.85, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',
  'Rn', 'Radon', 1, 18, 6, 222, 9.73, -71.15, -61.65, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',
  'Fr', 'Francium', 2, 1, 7, 223, 1.87, 26.85, 676.85, '[Rn] 7s¹',
  'Ra', 'Radium', 3, 2, 7, 226, 5.5, 959.85, 1736.85, '[Rn] 7s²',
  'Rf', 'Rutherfordium', 6, 4, 7, 267, 23.2, 2126.85, 5526.85, '[Rn] 5f¹⁴ 6d² 7s²',
  'Db', 'Dubnium', 6, 5, 7, 268, 29.3, null, null, '[Rn] 5f¹⁴ 6d³ 7s²',
  'Sg', 'Seaborgium', 6, 6, 7, 269, 35, null, null, '[Rn] 5f¹⁴ 6d⁴ 7s²',
  'Bh', 'Bohrium', 6, 7, 7, 270, 37.1, null, null, '[Rn] 5f¹⁴ 6d⁵ 7s²',
  'Hs', 'Hassium', 6, 8, 7, 269, 40.7, -147.15, null, '[Rn] 5f¹⁴ 6d⁶ 7s²',
  'Mt', 'Meitnerium', 9, 9, 7, 278, 37.4, null, null, '[Rn] 5f¹⁴ 6d⁷ 7s²',
  'Ds', 'Darmstadtium', 9, 10, 7, 281, 34.8, null, null, '[Rn] 5f¹⁴ 6d⁸ 7s²',
  'Rg', 'Roentgenium', 9, 11, 7, 282, 28.7, null, null, '[Rn] 5f¹⁴ 6d⁹ 7s²',
  'Cn', 'Copernicium', 9, 12, 7, 285, 14, null, 3296.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s²',
  'Nh', 'Nihonium', 9, 13, 7, 286, 16, 426.85, 1156.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',
  'Fl', 'Flerovium', 9, 14, 7, 289, 14, 66.85, 146.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',
  'Mc', 'Moscovium', 9, 15, 7, 289, 13.5, 396.85, 1126.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',
  'Lv', 'Livermorium', 9, 16, 7, 293, 12.9, 435.85, 811.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',
  'Ts', 'Tennessine', 9, 17, 7, 294, 7.17, 449.85, 609.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',
  'Og', 'Oganesson', 9, 18, 7, 294, 4.95, null, 76.85, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶',
  'La', 'Lanthanum', 7, 3, 8, 138.905, 6.162, 919.85, 3463.85, '[Xe] 5d¹ 6s²',
  'Ce', 'Cerium', 7, 4, 8, 140.116, 6.77, 794.85, 3442.85, '[Xe] 4f¹ 5d¹ 6s²',
  'Pr', 'Praseodymium', 7, 5, 8, 140.907, 6.77, 934.85, 3129.85, '[Xe] 4f³ 6s²',
  'Nd', 'Neodymium', 7, 6, 8, 144.242, 7.01, 1023.85, 3073.85, '[Xe] 4f⁴ 6s²',
  'Pm', 'Promethium', 7, 7, 8, 145, 7.26, 1041.85, 2999.85, '[Xe] 4f⁵ 6s²',
  'Sm', 'Samarium', 7, 8, 8, 150.362, 7.52, 1071.85, 1899.85, '[Xe] 4f⁶ 6s²',
  'Eu', 'Europium', 7, 9, 8, 151.964, 5.264, 825.85, 1528.85, '[Xe] 4f⁷ 6s²',
  'Gd', 'Gadolinium', 7, 10, 8, 157.253, 7.9, 1311.85, 2999.85, '[Xe] 4f⁷ 5d¹ 6s²',
  'Tb', 'Terbium', 7, 11, 8, 158.925, 8.23, 1355.85, 3122.85, '[Xe] 4f⁹ 6s²',
  'Dy', 'Dysprosium', 7, 12, 8, 162.500, 8.54, 1406.85, 2566.85, '[Xe] 4f¹⁰ 6s²',
  'Ho', 'Holmium', 7, 13, 8, 164.930, 8.79, 1460.85, 2599.85, '[Xe] 4f¹¹ 6s²',
  'Er', 'Erbium', 7, 14, 8, 167.259, 9.066, 1528.85, 2867.85, '[Xe] 4f¹² 6s²',
  'Tm', 'Thulium', 7, 15, 8, 168.934, 9.32, 1544.85, 1949.85, '[Xe] 4f¹³ 6s²',
  'Yb', 'Ytterbium', 7, 16, 8, 173.045, 6.9, 823.85, 1195.85, '[Xe] 4f¹⁴ 6s²',
  'Lu', 'Lutetium', 7, 17, 8, 174.966, 9.841, 1651.85, 3401.85, '[Xe] 4f¹⁴ 5d¹ 6s²',
  'Ac', 'Actinium', 8, 3, 9, 227, 10, 1226.85, 3226.85, '[Rn] 6d¹ 7s²',
  'Th', 'Thorium', 8, 4, 9, 232.037, 11.724, 1749.85, 4787.85, '[Rn] 6d² 7s²',
  'Pa', 'Protactinium', 8, 5, 9, 231.035, 15.37, 1567.85, 4026.85, '[Rn] 5f² 6d¹ 7s²',
  'U', 'Uranium', 8, 6, 9, 238.028, 19.1, 1132.15, 4130.85, '[Rn] 5f³ 6d¹ 7s²',
  'Np', 'Neptunium', 8, 7, 9, 237, 20.45, 638.85, 4173.85, '[Rn] 5f⁴ 6d¹ 7s²',
  'Pu', 'Plutonium', 8, 8, 9, 244, 19.816, 639.35, 3231.85, '[Rn] 5f⁶ 7s²',
  'Am', 'Americium', 8, 9, 9, 243, 12, 1175.85, 2606.85, '[Rn] 5f⁷ 7s²',
  'Cm', 'Curium', 8, 10, 9, 247, 13.51, 1339.85, 3109.85, '[Rn] 5f⁷ 6d¹ 7s²',
  'Bk', 'Berkelium', 8, 11, 9, 247, 14.78, 985.85, 2626.85, '[Rn] 5f⁹ 7s²',
  'Cf', 'Californium', 8, 12, 9, 251, 15.1, 899.85, 1469.85, '[Rn] 5f¹⁰ 7s²',
  'Es', 'Einsteinium', 8, 13, 9, 252, 8.84, 859.85, 995.85, '[Rn] 5f¹¹ 7s²',
  'Fm', 'Fermium', 8, 14, 9, 257, null, 1526.85, null, '[Rn] 5f¹² 7s²',
  'Md', 'Mendelevium', 8, 15, 9, 258, null, 826.85, null, '[Rn] 5f¹³ 7s²',
  'No', 'Nobelium', 8, 16, 9, 259, null, 826.85, null, '[Rn] 5f¹⁴ 7s²',
  'Lr', 'Lawrencium', 8, 17, 9, 266, null, 1626.85, null, '[Rn] 5f¹⁴ 7s² 7p¹',
]

// Genetate the table html

const [ $sceneContent ] = utils.$('#scene-content');
const [ $template ] = utils.$('#element');
for (let i = 0, l = elements.length / ELEMENT_STRIDE; i < l; i += 1) {
  const offset = i * ELEMENT_STRIDE;
  const $el = $template.content.cloneNode(true);
  const $element = $el.querySelector('.element');
  const $number = $element.querySelector('.element-number');
  const $symbol = $element.querySelector('.element-symbol');
  const $title = $element.querySelector('.element-title');
  const $description = $element.querySelector('.element-description');
  $number.textContent = i + 1;
  $symbol.textContent = elements[offset + ELEMENT_FIELDS.SYMBOL];
  $title.textContent = elements[offset + ELEMENT_FIELDS.NAME];
  $element.dataset.color = elements[offset + ELEMENT_FIELDS.COLOR];
  $element.style.gridColumn = elements[offset + ELEMENT_FIELDS.COLUMN];
  $element.style.gridRow = elements[offset + ELEMENT_FIELDS.ROW];

 $description.innerHTML = [
    `<b>Config: ${elements[offset + ELEMENT_FIELDS.ELECTRON_CONFIG]}</b>`, 
    `Mass: ${elements[offset + ELEMENT_FIELDS.ATOMIC_MASS]} u`,
    `Density: ${elements[offset + ELEMENT_FIELDS.DENSITY]} g/cm3`,
    `Melting: ${elements[offset + ELEMENT_FIELDS.MELTING_POINT]} &deg;C`,
    `Boiling: ${elements[offset + ELEMENT_FIELDS.BOILING_POINT]} &deg;C`,
  ].join('<br>');
  $sceneContent.appendChild($el);
}

const cards = utils.$('#scene-content .element');

// Create the cards layout and register the font-size as an extra property for animation
const elementsLayout = createLayout($sceneContent, {
  properties: ['font-size'],
  duration: 2000,
  ease: 'inOutExpo',
});

// Move the scene relative to the cursor position
const sceneAnimatable = createAnimatable('#scene', { rotateX: 200, rotateY: 200 });
const pointer = { x: 0, y: 0, rotateX: 15, rotateY: 20, rx: 0, ry: 0 };

createTimer({
  onUpdate: () => {
    pointer.rx = utils.lerp(pointer.rx, pointer.rotateX, .01);
    pointer.ry = utils.lerp(pointer.ry, pointer.rotateY, .01);
    sceneAnimatable.rotateX(pointer.y * pointer.rx);
    sceneAnimatable.rotateY(pointer.x * pointer.ry);
  }
});

// The different layout tranform
const transformLayout = {
  table: () => {
    // The table view use CSS grid and has no special tranforms except for a selected element
    pointer.rotateX = 15;
    pointer.rotateY = 20;
    cards.forEach($el => {
      $el.style.opacity = 1;
      $el.style.transform = $el.classList.contains('is-expanded') ? 'translateZ(50px)' : 'translateZ(10px)';
    });
  },
  sphere: () => {
    const radius = 300;
    pointer.rotateX = 40;
    pointer.rotateY = 360;
    cards.forEach(($el, i) => {
      const offsetZ = $el.classList.contains('is-expanded') ? 20 : 0;
      const phi = Math.acos(-1 + (2 * i) / cards.length);
      const theta = Math.sqrt(cards.length * Math.PI) * phi;
      const sinPhi = Math.sin(phi);
      const x = radius * sinPhi * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * sinPhi * Math.sin(theta);
      const yaw = Math.atan2(x, z);
      const pitch = -Math.atan2(y, Math.hypot(x, z));
      $el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}rad) rotateX(${pitch}rad) translateZ(${offsetZ}px)`;
    });
  },
  helix: () => {
    pointer.rotateX = 30;
    pointer.rotateY = 300;
    const radius = 400;
    const thetaStep = 0.16;
    const verticalSpacing = 3;
    const yOffset = (cards.length * verticalSpacing) / 2;
    cards.forEach(($el, i) => {
      const offsetZ = $el.classList.contains('is-expanded') ? 20 : 0;
      const theta = i * thetaStep + Math.PI;
      const y = -(i * verticalSpacing) + yOffset;
      const x = radius * Math.sin(theta);
      const z = radius * Math.cos(theta);
      const yaw = Math.atan2(x, z);
      const pitch = -Math.atan2(y, Math.hypot(x, z) * 2);
      $el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}rad) rotateX(${pitch}rad) translateZ(${offsetZ}px)`;
    });
  },
  grid: () => {
    pointer.rotateX = 10;
    pointer.rotateY = 60;
    const cols = 5;
    const rows = 5;
    const colGap = 150;
    const rowGap = 100;
    const depthGap = 150;
    const perLayer = cols * rows;
    const layers = Math.ceil(cards.length / perLayer);
    cards.forEach(($el, i) => {
      const offsetZ = $el.classList.contains('is-expanded') ? 20 : 0;
      const col = i % cols;
      const row = Math.floor(i / cols) % rows;
      const layer = Math.floor(i / perLayer);
      const x = (col - (cols - 1) / 2) * colGap;
      const y = ((rows - 1) / 2 - row) * rowGap;
      const z = offsetZ + ((layer - (layers - 1) / 2) * depthGap);
      $el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    });
  },
  random: () => {
    // The table view use CSS grid and has no special tranforms except for a selected element
    pointer.rotateX = 15;
    pointer.rotateY = 20;
    utils.set(cards, { x: () => utils.random(-500, 500), y: () => utils.random(-500, 500), z: () => utils.random(-500, 500)})
  },
};

document.addEventListener('pointermove', event => {
  const hw = window.innerWidth * .5;
  const hh = window.innerHeight * .5;
  pointer.x = utils.mapRange(event.clientX - hw, -hw, hw, 1, -1);
  pointer.y = utils.mapRange(event.clientY - hh, -hh, hh, -1, 1);
});

const toggles = utils.$('.controls button.toggle');

document.addEventListener('click', event => {
  const $toggle = event.target.closest('.controls button.toggle');
  if ($toggle) {
    toggles.forEach(button => button.classList.remove('is-active'));
    $toggle.classList.add('is-active');
    const layoutType = $toggle.id;
    elementsLayout.update(() => {
      cards.forEach($el => $el.classList.remove('is-expanded'));
      $sceneContent.dataset.layout = layoutType;
      transformLayout[layoutType]();
    }, {
      delay: stagger([0, 750], { from: 'random' })
    });
    return;
  }
  const $card = event.target.closest('#scene-content .element');
  const shouldExpand = $card && !$card.classList.contains('is-expanded');
  elementsLayout.update(() => {
    cards.forEach($el => $el.classList.remove('is-expanded'));
    if (shouldExpand) $card.classList.add('is-expanded');
    transformLayout[$sceneContent.dataset.layout]();
  },{
    ease: spring({ bounce: .2, duration: 350 }),
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const hasExpandedCard = cards.some($el => $el.classList.contains('is-expanded'));
  if (!hasExpandedCard) return;
  elementsLayout.update(() => {
    cards.forEach($el => $el.classList.remove('is-expanded'));
    transformLayout[$sceneContent.dataset.layout]();
  },{
    ease: spring({ bounce: .3, duration: 350 }),
  });
});

// Intro animation

transformLayout.random();
utils.set(cards, { opacity: 0 });
elementsLayout.update(() => transformLayout.table(), {
  delay: stagger([0, 750], { from: 'random' })
});
