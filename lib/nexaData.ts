export interface NexaProduct {
  id: string;
  partNumber: string;
  name: string;
  industry: string;
  application: string;
  family: string;
  material: string;
  dimensions: string;
  capacity: string;
  certification: string[];
  components: {
    name: string;
    spec: string;
    material: string;
    offset: [number, number, number]; // Vector offset for exploded view
  }[];
  basePrice: number;
  leadTime: string;
  description: string;
  hotspots: {
    title: string;
    category: 'MATERIAL' | 'DIMENSIONS' | 'CAPACITY' | 'CERTIFICATION' | 'APPLICATION' | 'COMPONENTS';
    detail: string;
    position: [number, number, number];
  }[];
}

export interface CrmLead {
  id: string;
  rfqNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  country: string;
  productName: string;
  partNumber: string;
  quantity: number;
  estimatedValue: number;
  stage: 'New Lead' | 'Qualified' | 'Quotation' | 'Negotiation' | 'Won' | 'Production' | 'Dispatch' | 'Completed';
  leadScore: number;
  assignedSalesperson: string;
  requiredDate: string;
  specifications: string;
  createdTime: string;
  activityLog: { time: string; note: string }[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  warehouse: string;
  category: string;
  stockQty: number;
  minReorderLevel: number;
  unitCost: number;
  status: 'OPTIMAL' | 'LOW_STOCK' | 'CRITICAL';
  batchNumber: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  quoteRef: string;
  date: string;
  totalAmount: number;
  status: 'In Production' | 'Quality Control' | 'In Transit' | 'Delivered';
  vesselName?: string;
  trackingNumber: string;
  originPort: string;
  destPort: string;
  eta: string;
  items: { part: string; qty: number; unitPrice: number }[];
}

export const INITIAL_PRODUCTS: NexaProduct[] = [
  {
    id: 'prod-x1',
    partNumber: 'NX-X1-TURBO',
    name: 'NEXA-X1 Superalloy Turbomachinery Rotor',
    industry: 'Aerospace & Defense',
    application: 'Extreme Temperature Turbines',
    family: 'NEXA-X1 Turbo Rotor',
    material: 'Inconel 718 Nickel-Chromium Superalloy',
    dimensions: '320mm x 140mm x 450mm | Ra 0.2µm Finish',
    capacity: '75,000 N Radial Load | 18,500 RPM Max Speed',
    certification: ['AS9100D Aerospace', 'ISO 9001:2015', 'IATF 16949'],
    leadTime: '14 Working Days',
    basePrice: 12500,
    description: 'Precision vacuum-investment cast and 5-axis CNC diamond-milled rotor core designed for extreme thermal gradient environments up to 1,150°C.',
    hotspots: [
      {
        title: 'Material Spec',
        category: 'MATERIAL',
        detail: 'Inconel 718 Nickel Superalloy with thermal barrier ceramic coating (TBC). Tensile strength 1,375 MPa.',
        position: [0, 1.2, 0.8],
      },
      {
        title: 'Micro Dimensions',
        category: 'DIMENSIONS',
        detail: 'Diameter 320.00mm ±0.002mm. Dynamic balance grade G 1.0 according to ISO 1940.',
        position: [1.2, 0.4, 0],
      },
      {
        title: 'Load Capacity',
        category: 'CAPACITY',
        detail: '75,000 N radial centrifugal load limit. Max burst speed tested to 22,000 RPM.',
        position: [0, -0.8, 1.0],
      },
      {
        title: 'Compliance & Audit',
        category: 'CERTIFICATION',
        detail: 'AS9100D Aerospace certified with EN 10204 3.1 Mill Test Inspection certificates included.',
        position: [-1.2, 0.6, -0.4],
      },
      {
        title: 'Primary Application',
        category: 'APPLICATION',
        detail: 'Commercial jet turbine propulsion, hypersonic propulsion units, and industrial power generation gas turbines.',
        position: [0.6, -1.1, -0.6],
      },
      {
        title: '5 Sub-Assembly Units',
        category: 'COMPONENTS',
        detail: 'Includes Core Rotor Disk, Diamond Blade Elements, Locking Ring Collar, Ceramic Seal Gasket, and Shaft Flange.',
        position: [-0.6, 1.0, 0.5],
      },
    ],
    components: [
      { name: 'Core Rotor Disk', spec: 'Forged Inconel 718 Core', material: 'Inconel 718', offset: [0, 0, 0] },
      { name: 'Turbine Blade Ring', spec: 'Aerofoil Single-Crystal Blades', material: 'CMSX-4 Nickel Alloy', offset: [0, 1.8, 0] },
      { name: 'Precision Core Shaft', spec: 'Splined Drive Shaft Ra 0.1µm', material: 'Nitrided 4340 Alloy Steel', offset: [0, -1.8, 0] },
      { name: 'High-Pressure Ceramic Ring', spec: 'Silicon Nitride Si3N4 Seal', material: 'Structural Ceramic', offset: [1.6, 0, 0] },
      { name: 'Retention Lock Collar', spec: 'Self-Locking Multi-Bolt Flange', material: 'Titanium Grade 5', offset: [-1.6, 0, 0] },
    ],
  },
  {
    id: 'prod-v2',
    partNumber: 'NX-VALVE-500',
    name: 'NEXA-VALVE High-Pressure Cryogenic Manifold',
    industry: 'Energy & Offshore',
    application: 'High-Pressure Flow Control',
    family: 'NEXA-VALVE High-Pressure Manifold',
    material: 'Duplex 2205 Super Stainless / Hastelloy C-276',
    dimensions: '480mm x 310mm x 280mm | Flange Class 2500',
    capacity: '500 Bar (7,250 PSI) Pressure | -196°C to +350°C',
    certification: ['API 6A', 'ISO 15848-1 Fugitive Emissions', 'PED 2014/68/EU'],
    leadTime: '10 Working Days',
    basePrice: 8800,
    description: 'Forged zero-leakage cryogenic flow manifold engineered for subsea oil & gas exploration and liquid hydrogen transfer networks.',
    hotspots: [
      {
        title: 'Cryogenic Metallurgy',
        category: 'MATERIAL',
        detail: 'Hastelloy C-276 trim with Duplex 2205 body. Resistance to PREN > 40 pitting corrosion.',
        position: [0, 1.0, 0.6],
      },
      {
        title: 'Flange Dimensions',
        category: 'DIMENSIONS',
        detail: 'ANSI/ASME B16.5 Class 2500 ring joint flange profile with 8-bolt circle layout.',
        position: [1.1, 0, 0.4],
      },
      {
        title: 'Pressure Ceiling',
        category: 'CAPACITY',
        detail: 'Burst test rating exceeding 1,250 Bar. Nitrogen leak test at 500 Bar zero bubble rate.',
        position: [-1.0, -0.5, 0.5],
      },
      {
        title: 'Offshore Compliance',
        category: 'CERTIFICATION',
        detail: 'API 6A PSL 3G certified. ISO 15848-1 Class AH helium tight seal compliance.',
        position: [0.5, -1.0, -0.8],
      },
      {
        title: 'Offshore & Hydrogen',
        category: 'APPLICATION',
        detail: 'LNG terminal regasification lines, deepsea subsea wellheads, and aerospace rocket liquid propellant lines.',
        position: [-0.8, 0.8, -0.6],
      },
      {
        title: 'Modular Valve Assembly',
        category: 'COMPONENTS',
        detail: 'Comprises Dual Seat Rings, Stellite Hard-Faced Ball Plug, Stem Packing, and Actuator Bracket.',
        position: [0, 0, 1.2],
      },
    ],
    components: [
      { name: 'Forged Valve Body', spec: 'Duplex 2205 Monoblock', material: 'UNS S31803 Stainless', offset: [0, 0, 0] },
      { name: 'Stellite Hard-Faced Ball', spec: 'Spherical Tolerance 0.001mm', material: 'Stellite 6 Coating', offset: [0, 0, 1.9] },
      { name: 'Cryogenic Stem Extension', spec: 'Thermal Isolation Bonnet', material: '316L Stainless Steel', offset: [0, 1.9, 0] },
      { name: 'Dual PTFE Seat Gaskets', spec: 'Graphite Reinforced Lip Seals', material: 'PTFE / PEEK Compound', offset: [-1.8, 0, 0] },
      { name: 'ISO Actuator Mounting Flange', spec: 'ISO 5211 Direct Mount Pad', material: 'Stainless Steel', offset: [1.8, 0, 0] },
    ],
  },
  {
    id: 'prod-h3',
    partNumber: 'NX-HYDRA-88',
    name: 'NEXA-HYDRA Heavy Hydro-Mechanical Cylinder',
    industry: 'Heavy Machinery & Mining',
    application: 'Precision Motion Transmissions',
    family: 'NEXA-HYDRA Heavy Cylinder',
    material: 'Nitrided 4340 Chrome-Moly Steel & Ceramic Rod',
    dimensions: 'Bore 250mm | Stroke 1200mm | Rod 160mm',
    capacity: '2,400 kN Push Force | 350 Bar Continuous',
    certification: ['ISO 6022 Heavy Duty', 'CE Machinery Safety', 'DIN 24333'],
    leadTime: '18 Working Days',
    basePrice: 16200,
    description: 'Heavy duty mining hydraulic actuator featuring induction-hardened chrome-ceramic rod finish for harsh abrasive quarry environments.',
    hotspots: [
      {
        title: 'Induction Steel & Rod',
        category: 'MATERIAL',
        detail: 'AISI 4340 alloy steel cylinder barrel with plasma-nitrided 68 HRC ceramic rod coating.',
        position: [0, 1.2, 0],
      },
      {
        title: 'Piston Dimensions',
        category: 'DIMENSIONS',
        detail: 'Bore 250mm, Stroke 1,200mm, Total extended length 2,850mm.',
        position: [1.4, 0, 0],
      },
      {
        title: '2,400 kN Hydraulic Thrust',
        category: 'CAPACITY',
        detail: 'Nominal thrust 240 tonnes force continuous at 350 Bar operating pressure.',
        position: [-1.2, 0, 0],
      },
      {
        title: 'Heavy Industry DIN Standard',
        category: 'CERTIFICATION',
        detail: 'Built to ISO 6022 and DIN 24333 fluid power standard specifications.',
        position: [0, -1.1, 0.6],
      },
      {
        title: 'Mining & Heavy Construction',
        category: 'APPLICATION',
        detail: 'Autonomous open-pit mining excavators, hydraulic press brakes, and tunneling boring shields.',
        position: [-0.6, -0.6, -0.8],
      },
      {
        title: 'Sealed Cylinder Array',
        category: 'COMPONENTS',
        detail: 'Sub-components: Nitrided Barrel, Ceramic Plated Piston Rod, Bronze Guide Bushings, Polyurethane Seals.',
        position: [0, 0.8, -1.0],
      },
    ],
    components: [
      { name: 'Thick-Wall Cylinder Barrel', spec: 'Honed Inside Ra 0.15µm', material: '4340 Chrome Moly Steel', offset: [0, 0, 0] },
      { name: 'Ceramic Plated Piston Rod', spec: 'Induction Hardened 68 HRC', material: 'Alloy Steel + Cermet', offset: [2.2, 0, 0] },
      { name: 'Heavy Duty Piston Head', spec: 'Double Acting Quad Seals', material: 'Ductile Iron GGG-70', offset: [-2.2, 0, 0] },
      { name: 'Front Gland End Cap', spec: 'Bronze Bushings + Wiper Seal', material: 'Forged Carbon Steel', offset: [0, 1.8, 0] },
      { name: 'Clever Mounting Clevis Eye', spec: 'Spherical Bearing Joint', material: 'Forged Alloy Steel', offset: [0, -1.8, 0] },
    ],
  },
  {
    id: 'prod-g4',
    partNumber: 'NX-GEAR-93',
    name: 'NEXA-GEAR Zero-Backlash Planetary Transmission',
    industry: 'Precision Robotics & Industrial Automation',
    application: 'Precision Motion Transmissions',
    family: 'NEXA-GEAR Planetary Drive',
    material: 'Case-Hardened 9310 Alloy Steel & Carbon Fiber Housing',
    dimensions: 'Frame Size 180mm | Reduction 50:1 | Backlash < 1 arcmin',
    capacity: '3,200 Nm Nominal Torque | 98.2% Efficiency',
    certification: ['ISO 9001:2015', 'CE Automation Directive', 'ROHS Compliant'],
    leadTime: '8 Working Days',
    basePrice: 6400,
    description: 'Ultra-precision high-torque planetary gearbox engineered for 6-axis industrial robots and satellite tracking antenna pedestals.',
    hotspots: [
      {
        title: 'Helical Case-Hardened Gears',
        category: 'MATERIAL',
        detail: 'Carburized AISI 9310 nickel-alloy gears with DLC (Diamond-Like Carbon) low friction coating.',
        position: [0, 1.0, 0],
      },
      {
        title: 'Frame 180mm',
        category: 'DIMENSIONS',
        detail: 'Compact 180mm square flange footprint with precision keyless clamping hub.',
        position: [0.9, 0, 0.5],
      },
      {
        title: '3,200 Nm Peak Torque',
        category: 'CAPACITY',
        detail: 'Torsional rigidity 180 Nm/arcmin. Torsional backlash under 1 arcminute guaranteed.',
        position: [-0.9, 0, 0.5],
      },
      {
        title: 'Precision Robotics Standards',
        category: 'CERTIFICATION',
        detail: 'Full laser gear tooth inspection report provided with each individual unit serial.',
        position: [0, -1.0, 0],
      },
      {
        title: 'Robotics & Aerospace Tracking',
        category: 'APPLICATION',
        detail: 'Heavy payload industrial articulated robot joints, CNC rotary tables, and radar pedestals.',
        position: [0.5, -0.5, -0.8],
      },
      {
        title: '5 Planet Gear Assembly',
        category: 'COMPONENTS',
        detail: 'Includes Sun Gear Input, Planet Carrier, Internal Ring Gear, Needle Bearings, and Output Shaft.',
        position: [-0.5, 0.5, -0.8],
      },
    ],
    components: [
      { name: 'Internal Helical Ring Gear', spec: 'Monoblock Steel Ring', material: 'Carburized 9310 Steel', offset: [0, 0, 0] },
      { name: 'Precision Sun Input Shaft', spec: 'Zero-Backlash Tooth Form', material: 'Nitralloy 135M', offset: [0, 0, -2.0] },
      { name: 'Planet Gear Cluster (5x)', spec: 'Ground Tooth Ra 0.2µm', material: '9310 Alloy Steel', offset: [0, 1.8, 0] },
      { name: 'Monoblock Planet Carrier', spec: 'High-Rigidity Dual Bearing', material: 'Forged Aluminum 7075-T6', offset: [0, -1.8, 0] },
      { name: 'Carbon Fiber Outer Casing', spec: 'Vibration Dampening Shell', material: 'Autoclave Carbon Composite', offset: [1.8, 0, 0] },
    ],
  },
];

export const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-101',
    rfqNumber: 'RFQ-2026-8891',
    companyName: 'Airbus Safran Launchers Gmbh',
    contactName: 'Dr. Henrik Vance',
    email: 'h.vance@airbussafran.de',
    country: 'Germany',
    productName: 'NEXA-X1 Superalloy Turbomachinery Rotor',
    partNumber: 'NX-X1-TURBO',
    quantity: 120,
    estimatedValue: 1500000,
    stage: 'Quotation',
    leadScore: 98,
    assignedSalesperson: 'Marcus Vance (Sr. Aerospace)',
    requiredDate: '2026-10-15',
    specifications: 'Custom Inconel 718 with EN 10204 3.1 Mill Test reports and X-ray radiograph inspection of all blade root fillets.',
    createdTime: '2026-07-31 18:22 UTC',
    activityLog: [
      { time: '2026-07-31 18:22', note: 'RFQ received via NEXA Online Platform' },
      { time: '2026-07-31 18:23', note: 'AI Lead Scoring assigned 98/100 (Tier A Aerospace Account)' },
      { time: '2026-07-31 18:25', note: 'Technical Feasibility Check PASSED by Automated Engineering Rules' },
      { time: '2026-07-31 18:30', note: 'Quotation QT-8891 generated ($1,500,000 for 120 units)' },
    ],
  },
  {
    id: 'lead-102',
    rfqNumber: 'RFQ-2026-8892',
    companyName: 'Saudi Aramco Offshore Operations',
    contactName: 'Tariq Al-Mansoor',
    email: 't.almansoor@aramco.com.sa',
    country: 'Saudi Arabia',
    productName: 'NEXA-VALVE High-Pressure Cryogenic Manifold',
    partNumber: 'NX-VALVE-500',
    quantity: 250,
    estimatedValue: 2200000,
    stage: 'Negotiation',
    leadScore: 94,
    assignedSalesperson: 'Elena Rostova (Offshore Energy)',
    requiredDate: '2026-09-30',
    specifications: 'Duplex 2205 Stainless body, API 6A PSL 3G, Flange Class 2500 ring joint layout.',
    createdTime: '2026-07-30 14:10 UTC',
    activityLog: [
      { time: '2026-07-30 14:10', note: 'RFQ received for Safaniya offshore field project' },
      { time: '2026-07-30 15:00', note: 'Initial Quote QT-8892 issued ($2.2M)' },
      { time: '2026-07-31 11:15', note: 'Client requested 5% volume discount & expedited air freight' },
    ],
  },
  {
    id: 'lead-103',
    rfqNumber: 'RFQ-2026-8893',
    companyName: 'Komatsu Heavy Industries',
    contactName: 'Kenji Sato',
    email: 'k-sato@komatsu.co.jp',
    country: 'Japan',
    productName: 'NEXA-HYDRA Heavy Hydro-Mechanical Cylinder',
    partNumber: 'NX-HYDRA-88',
    quantity: 80,
    estimatedValue: 1296000,
    stage: 'Won',
    leadScore: 92,
    assignedSalesperson: 'Kenji Takahashi (Asia Pacific Lead)',
    requiredDate: '2026-11-01',
    specifications: 'Induction hardened 68 HRC ceramic piston rod, ISO 6022 mounting clevis eye.',
    createdTime: '2026-07-28 09:40 UTC',
    activityLog: [
      { time: '2026-07-28 09:40', note: 'RFQ submitted from Komatsu Osaka plant team' },
      { time: '2026-07-29 10:00', note: 'Quotation approved and contract signed' },
      { time: '2026-07-30 16:00', note: 'Work Order WO-9941 issued to Stuttgart Plant 1' },
    ],
  },
  {
    id: 'lead-104',
    rfqNumber: 'RFQ-2026-8894',
    companyName: 'KUKA Robotics GmbH',
    contactName: 'Stefan Weber',
    email: 's.weber@kuka.de',
    country: 'Germany',
    productName: 'NEXA-GEAR Zero-Backlash Planetary Transmission',
    partNumber: 'NX-GEAR-93',
    quantity: 500,
    estimatedValue: 3200000,
    stage: 'Production',
    leadScore: 96,
    assignedSalesperson: 'Marcus Vance (Automation Lead)',
    requiredDate: '2026-08-20',
    specifications: 'Frame 180mm, Case-hardened 9310 steel gears, DLC low friction coating.',
    createdTime: '2026-07-25 11:00 UTC',
    activityLog: [
      { time: '2026-07-25 11:00', note: 'RFQ converted from framework OEM agreement' },
      { time: '2026-07-26 14:00', note: 'Purchase Order PO-7711 confirmed ($3.2M)' },
      { time: '2026-07-27 08:30', note: 'CNC Gear Hobbing Batch #G93-2026 in active production' },
    ],
  },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-01', sku: 'RM-INC-718', name: 'Inconel 718 Vacuum Ingot Bar Stock', warehouse: 'Stuttgart Plant 1', category: 'Raw Superalloys', stockQty: 18500, minReorderLevel: 5000, unitCost: 145, status: 'OPTIMAL', batchNumber: 'BT-8841-INC' },
  { id: 'inv-02', sku: 'RM-DUP-2205', name: 'Duplex 2205 Forging Billets', warehouse: 'Houston Logistics Hub', category: 'Raw Stainless Steel', stockQty: 4200, minReorderLevel: 6000, unitCost: 68, status: 'LOW_STOCK', batchNumber: 'BT-7712-DUP' },
  { id: 'inv-03', sku: 'CP-TURB-01', name: 'NEXA-X1 Finished Rotor Cores', warehouse: 'Stuttgart Plant 1', category: 'Finished Assemblies', stockQty: 42, minReorderLevel: 15, unitCost: 8200, status: 'OPTIMAL', batchNumber: 'BT-9901-X1' },
  { id: 'inv-04', sku: 'CP-VALVE-500', name: 'NEXA-VALVE Monoblock Housings', warehouse: 'Singapore Port Depot', category: 'Sub-Assemblies', stockQty: 8, minReorderLevel: 20, unitCost: 4500, status: 'CRITICAL', batchNumber: 'BT-3320-V2' },
  { id: 'inv-05', sku: 'CP-HYDRA-88', name: 'Induction Hardened Rod Stock 160mm', warehouse: 'Houston Logistics Hub', category: 'Raw Machinery Steel', stockQty: 340, minReorderLevel: 100, unitCost: 620, status: 'OPTIMAL', batchNumber: 'BT-4410-HYD' },
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-881',
    orderNumber: 'ORD-2026-9041',
    quoteRef: 'QT-8894',
    date: '2026-07-26',
    totalAmount: 3200000,
    status: 'In Production',
    trackingNumber: 'NEXA-LOG-771892',
    originPort: 'Hamburg Port, Germany',
    destPort: 'Nagoya Logistics Hub, Japan',
    eta: '2026-08-22',
    items: [{ part: 'NX-GEAR-93 Zero-Backlash Planetary Drive', qty: 500, unitPrice: 6400 }],
  },
  {
    id: 'ord-882',
    orderNumber: 'ORD-2026-9022',
    quoteRef: 'QT-8830',
    date: '2026-07-15',
    totalAmount: 880000,
    status: 'In Transit',
    vesselName: 'Ever Given / MV Nexa Voyager',
    trackingNumber: 'NEXA-VESSEL-8821',
    originPort: 'Rotterdam Europort, NL',
    destPort: 'Houston Deepwater Port, US',
    eta: '2026-08-08',
    items: [{ part: 'NX-VALVE-500 Cryogenic Valve Manifold', qty: 100, unitPrice: 8800 }],
  },
];
