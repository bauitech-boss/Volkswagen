import { Part, Car, Customer, Sale, MaintenanceRecord, Condition } from '../types';

export const mockParts: Part[] = [
  // Existing Parts (1-53)
  { id: 'P1', name: 'DSG Transmission Fluid', oemNumber: 'G 052 182 A2', category: 'Lubricants', compatibility: ['Golf GTI', 'Jetta GLI', 'Tiguan'], stock: 24, price: 25.99 },
  { id: 'P2', name: 'Oil Filter', oemNumber: '06L 115 562 B', category: 'Filters', compatibility: ['Golf R', 'Arteon', 'Polo'], stock: 50, price: 12.50 },
  { id: 'P3', name: 'Brake Pads (Front)', oemNumber: '5Q0 698 151', category: 'Brakes', compatibility: ['Golf 7', 'Passat B8'], stock: 15, price: 89.00 },
  { id: 'P4', name: 'Timing Belt Kit', oemNumber: '03L 198 119', category: 'Engine', compatibility: ['TDI Engines'], stock: 8, price: 145.00 },
  { id: 'P5', name: 'Iridium Spark Plugs (Set of 4)', oemNumber: '06K 905 601 L', category: 'Ignition', compatibility: ['Golf 7.5 GTI', 'Arteon', 'Tiguan 2.0T'], stock: 40, price: 64.00 },
  { id: 'P6', name: 'Cabin Air Filter (Activated Carbon)', oemNumber: '5Q0 819 653', category: 'Filters', compatibility: ['MQB Platform (Golf, Jetta, Tiguan)'], stock: 35, price: 22.50 },
  { id: 'P7', name: 'AGM Battery (72Ah)', oemNumber: '000 915 105 CC', category: 'Electrical', compatibility: ['Universal VW Fitment'], stock: 12, price: 210.00 },
  { id: 'P8', name: 'Windshield Wiper Blades (Pair)', oemNumber: '5G1 998 002', category: 'Body', compatibility: ['Golf Mk7', 'Golf Mk8'], stock: 60, price: 45.00 },
  { id: 'P9', name: 'G12evo Ready Mix Coolant (1L)', oemNumber: 'G 12E 050 A2', category: 'Lubricants', compatibility: ['All Modern VW Models'], stock: 100, price: 18.00 },
  { id: 'P10', name: 'Xenon Headlight Bulb (D3S)', oemNumber: 'N 107 218 05', category: 'Lighting', compatibility: ['Passat B8', 'Touareg', 'Tiguan AD1'], stock: 6, price: 135.00 },
  { id: 'P11', name: 'Alternator (140A)', oemNumber: '06F 903 023 F', category: 'Electrical', compatibility: ['Jetta Mk6', 'Eos', 'Scirocco'], stock: 4, price: 380.00 },
  { id: 'P12', name: 'Suspension Strut (Front)', oemNumber: '5Q0 413 023', category: 'Suspension', compatibility: ['Golf Mk7', 'Sportwagen'], stock: 10, price: 115.00 },
  { id: 'P13', name: 'Water Pump & Thermostat Assembly', oemNumber: '06L 121 111 H', category: 'Cooling', compatibility: ['EA888 Gen 3 Engines'], stock: 5, price: 299.00 },
  { id: 'P14', name: 'Brake Rotor (Front 312mm)', oemNumber: '1K0 615 301 AA', category: 'Brakes', compatibility: ['Golf GTI', 'Jetta'], stock: 20, price: 75.00 },
  { id: 'P15', name: 'Ignition Coil Pack (Red Top)', oemNumber: '06E 905 115 G', category: 'Ignition', compatibility: ['2.0T TSI Engines'], stock: 32, price: 35.00 },
  { id: 'P16', name: 'Fuel Injector (TSI Direct Injection)', oemNumber: '06H 906 036 G', category: 'Fuel System', compatibility: ['Golf 6', 'Beetle'], stock: 16, price: 110.00 },
  { id: 'P17', name: 'Rear Wheel Bearing Hub Assembly', oemNumber: '5Q0 598 611', category: 'Drivetrain', compatibility: ['MQB FWD Models'], stock: 14, price: 125.00 },
  { id: 'P18', name: 'Turbocharger Rev T', oemNumber: '06K 145 722 T', category: 'Engine', compatibility: ['Golf R', 'S3'], stock: 2, price: 1450.00 },
  { id: 'P19', name: 'Control Arm Bushing (Solid)', oemNumber: '1K0 407 182', category: 'Suspension', compatibility: ['Golf 5/6/7'], stock: 40, price: 15.00 },
  { id: 'P20', name: 'Expansion Tank (Coolant)', oemNumber: '5Q0 121 407 G', category: 'Cooling', compatibility: ['Golf 7', 'Passat B8'], stock: 12, price: 42.00 },
  { id: 'P21', name: 'High Pressure Fuel Pump (HPFP)', oemNumber: '06L 127 025 N', category: 'Fuel System', compatibility: ['EA888 Gen 3'], stock: 6, price: 320.00 },
  { id: 'P22', name: 'Tie Rod End (Outer Left)', oemNumber: '1K0 423 811 J', category: 'Steering', compatibility: ['Various Models'], stock: 18, price: 38.00 },
  { id: 'P23', name: 'Oxygen Sensor (Front)', oemNumber: '06K 906 262 H', category: 'Exhaust', compatibility: ['2.0T Engines'], stock: 9, price: 185.00 },
  { id: 'P24', name: 'MAP Sensor', oemNumber: '038 906 051 C', category: 'Electrical', compatibility: ['TDI Engines'], stock: 25, price: 48.00 },
  { id: 'P25', name: 'Serpentine Belt', oemNumber: '06L 903 137 A', category: 'Engine', compatibility: ['2.0T Engines'], stock: 45, price: 28.00 },
  { id: 'P26', name: 'Oil Pan (Steel Upgrade)', oemNumber: '06K 103 600 R', category: 'Engine', compatibility: ['MQB 2.0T'], stock: 15, price: 95.00 },
  { id: 'P27', name: 'Intake Manifold Flap Motor', oemNumber: '06L 133 312 E', category: 'Engine', compatibility: ['2.0T TSI'], stock: 7, price: 145.00 },
  { id: 'P28', name: 'Door Lock Actuator (Front Right)', oemNumber: '5K1 837 016', category: 'Body', compatibility: ['Golf 6', 'Jetta 6'], stock: 5, price: 165.00 },
  { id: 'P29', name: 'ABS Speed Sensor (Rear)', oemNumber: 'WHT 003 859 B', category: 'Brakes', compatibility: ['Golf 7'], stock: 30, price: 25.00 },
  { id: 'P30', name: 'Camshaft Follower (HPFP)', oemNumber: '06D 109 309 C', category: 'Engine', compatibility: ['2.0T FSI'], stock: 50, price: 19.00 },
  { id: 'P31', name: 'Window Regulator (Driver Front)', oemNumber: '1K4 839 461 A', category: 'Body', compatibility: ['Golf 5/6'], stock: 8, price: 110.00 },
  { id: 'P32', name: 'Clutch Kit (Manual 6-Speed)', oemNumber: '06K 141 015 J', category: 'Drivetrain', compatibility: ['Golf GTI'], stock: 3, price: 540.00 },
  { id: 'P33', name: 'Intercooler Pipe (Cold Side)', oemNumber: '5Q0 145 832', category: 'Engine', compatibility: ['MQB Platform'], stock: 10, price: 72.00 },
  { id: 'P34', name: 'CV Boot Kit (Inner)', oemNumber: '1K0 498 201 G', category: 'Drivetrain', compatibility: ['Various Models'], stock: 22, price: 24.00 },
  { id: 'P35', name: 'Radiator Fan Assembly', oemNumber: '1K0 959 455 ES', category: 'Cooling', compatibility: ['Passat', 'CC', 'Tiguan'], stock: 4, price: 195.00 },
  { id: 'P36', name: 'PCV Valve (Oil Separator)', oemNumber: '06K 103 495 AH', category: 'Engine', compatibility: ['EA888 Gen 3'], stock: 28, price: 135.00 },
  { id: 'P37', name: 'Washer Pump', oemNumber: '1K6 955 651', category: 'Body', compatibility: ['Universal Fit'], stock: 40, price: 12.00 },
  { id: 'P38', name: 'Air Intake Filter (Performance)', oemNumber: '5Q0 129 620 B', category: 'Filters', compatibility: ['Golf R', 'GTI'], stock: 15, price: 55.00 },
  { id: 'P39', name: 'Glow Plug (Set of 4)', oemNumber: '03L 963 319', category: 'Ignition', compatibility: ['2.0 TDI'], stock: 20, price: 88.00 },
  { id: 'P40', name: 'Sunroof Seal', oemNumber: '1K9 877 209 A', category: 'Body', compatibility: ['Tiguan', 'Sportwagen'], stock: 6, price: 65.00 },
  { id: 'P41', name: 'Mirror Glass (Heated Left)', oemNumber: '5G0 857 521', category: 'Body', compatibility: ['Golf 7'], stock: 14, price: 42.00 },
  { id: 'P42', name: 'Shift Knob (Golf Ball Design)', oemNumber: '5G1 711 113 DC', category: 'Interior', compatibility: ['Golf GTI'], stock: 5, price: 185.00 },
  { id: 'P43', name: 'Floor Mats (Monster Mats)', oemNumber: '5G1 061 501 041', category: 'Accessories', compatibility: ['Golf 7/8'], stock: 20, price: 110.00 },
  { id: 'P44', name: 'Cargo Net', oemNumber: '5N0 065 111', category: 'Accessories', compatibility: ['Tiguan'], stock: 15, price: 45.00 },
  { id: 'P45', name: 'Rear Spoiler (Gloss Black)', oemNumber: '5G6 071 644', category: 'Body', compatibility: ['Golf'], stock: 3, price: 350.00 },
  { id: 'P46', name: 'Valve Cover Gasket', oemNumber: '03L 103 483 C', category: 'Engine', compatibility: ['2.0 TDI'], stock: 30, price: 32.00 },
  { id: 'P47', name: 'Power Steering Pump', oemNumber: '1K0 423 094 L', category: 'Steering', compatibility: ['Golf 5/6'], stock: 2, price: 280.00 },
  { id: 'P48', name: 'Anti-Roll Bar Links (Rear)', oemNumber: '1K0 505 465 K', category: 'Suspension', compatibility: ['Multi-Link Rear'], stock: 25, price: 22.00 },
  { id: 'P49', name: 'Fuel Filter', oemNumber: '1K0 127 434 B', category: 'Filters', compatibility: ['TDI Models'], stock: 50, price: 35.00 },
  { id: 'P50', name: 'Headlight Lens (Pair)', oemNumber: '5G0 941 005', category: 'Lighting', compatibility: ['Golf 7'], stock: 10, price: 95.00 },
  { id: 'P51', name: 'Blind Spot Monitor Sensor', oemNumber: '5Q0 907 066 B', category: 'Electrical', compatibility: ['Various Models'], stock: 4, price: 410.00 },
  { id: 'P52', name: 'Oil Cooler', oemNumber: '03L 117 021 C', category: 'Cooling', compatibility: ['TDI Engines'], stock: 8, price: 85.00 },
  { id: 'P53', name: 'ABS Wheel Speed Sensor (Front)', oemNumber: 'WHT 003 857', category: 'Electrical', compatibility: ['Golf 7', 'Passat', 'Tiguan', 'Jetta'], stock: 15, price: 34.50 },
  { id: 'P54', name: 'Variable Valve Timing (VVT) Solenoid', oemNumber: '06H 109 257 C', category: 'Engine', compatibility: ['2.0T TSI'], stock: 12, price: 89.00 },
  { id: 'P55', name: 'Automatic Transmission Filter Kit', oemNumber: '09G 325 429 E', category: 'Drivetrain', compatibility: ['6-Speed Auto'], stock: 8, price: 68.00 },
  { id: 'P56', name: 'Engine Mount (Front)', oemNumber: '5Q0 199 262 BE', category: 'Engine', compatibility: ['MQB Platform'], stock: 6, price: 142.00 },
  { id: 'P57', name: 'Secondary Air Injection Pump', oemNumber: '07K 131 333 A', category: 'Exhaust', compatibility: ['2.5L 5-Cyl'], stock: 3, price: 245.00 },
  { id: 'P58', name: 'Brake Master Cylinder', oemNumber: '5Q1 611 021 B', category: 'Brakes', compatibility: ['Golf 7', 'A3'], stock: 4, price: 175.00 },
  { id: 'P59', name: 'Thermostat Housing Gasket', oemNumber: '06L 121 119 D', category: 'Cooling', compatibility: ['Gen 3 EA888'], stock: 40, price: 8.50 },
  { id: 'P60', name: 'Drive Belt Tensioner', oemNumber: '06L 903 133 D', category: 'Engine', compatibility: ['2.0T TSI'], stock: 10, price: 54.00 },
  { id: 'P61', name: 'Fog Light Assembly (Left)', oemNumber: '5G0 941 661 G', category: 'Lighting', compatibility: ['Golf MK7 GTI'], stock: 5, price: 125.00 },
  { id: 'P62', name: 'Turbocharger Diverter Valve', oemNumber: '06H 145 710 D', category: 'Engine', compatibility: ['2.0T FSI/TSI'], stock: 22, price: 72.00 },
  { id: 'P63', name: 'Heater Core', oemNumber: '5Q0 819 031 A', category: 'Cooling', compatibility: ['MQB Models'], stock: 3, price: 110.00 },
  { id: 'P64', name: 'Parking Brake Switch', oemNumber: '5G0 927 225 D', category: 'Interior', compatibility: ['Golf 7'], stock: 15, price: 45.00 },
  { id: 'P65', name: 'Fuel Tank Cap', oemNumber: '5Q0 201 550 L', category: 'Fuel System', compatibility: ['Universal Modern VW'], stock: 25, price: 28.00 },
  { id: 'P66', name: 'Camshaft Position Sensor', oemNumber: '06K 907 601 A', category: 'Electrical', compatibility: ['2.0T TSI'], stock: 18, price: 55.00 },
  { id: 'P67', name: 'Lower Control Arm (Front Left)', oemNumber: '5Q0 407 151 J', category: 'Suspension', compatibility: ['Golf 7', 'Tiguan'], stock: 7, price: 135.00 },
  { id: 'P68', name: 'Tail Light Assembly (Inner Right)', oemNumber: '5G0 945 094 M', category: 'Lighting', compatibility: ['Golf MK7'], stock: 4, price: 115.00 },
  { id: 'P69', name: 'Expansion Valve (AC)', oemNumber: '5Q0 816 679', category: 'Cooling', compatibility: ['Various Models'], stock: 9, price: 42.00 },
  { id: 'P70', name: 'Wheel Bolt Cover Set (Chrome)', oemNumber: '1K0 601 173 9B9', category: 'Accessories', compatibility: ['Universal VW'], stock: 30, price: 22.00 },
  { id: 'P71', name: 'Vacuum Pump', oemNumber: '06L 145 100 L', category: 'Engine', compatibility: ['2.0T TSI'], stock: 5, price: 285.00 },
  { id: 'P72', name: 'Brake Vacuum Hose', oemNumber: '1K0 612 041 CH', category: 'Brakes', compatibility: ['Golf 5/6'], stock: 12, price: 34.00 },
  { id: 'P73', name: 'Instrument Cluster Screen', oemNumber: '5G1 920 791 B', category: 'Interior', compatibility: ['Digital Cockpit VW'], stock: 2, price: 850.00 },
  { id: 'P74', name: 'Hood Latch Assembly', oemNumber: '5G1 823 509 B', category: 'Body', compatibility: ['Golf 7'], stock: 6, price: 58.00 },
  { id: 'P75', name: 'Mass Air Flow (MAF) Sensor', oemNumber: '06J 906 461 D', category: 'Electrical', compatibility: ['2.0T Engines'], stock: 14, price: 165.00 },
  { id: 'P76', name: 'Knock Sensor', oemNumber: '06K 905 377', category: 'Electrical', compatibility: ['EA888 Engines'], stock: 10, price: 48.00 },
  { id: 'P77', name: 'Oil Pressure Switch', oemNumber: '06L 919 081', category: 'Electrical', compatibility: ['Gen 3 TSI'], stock: 20, price: 24.00 },
  { id: 'P78', name: 'Wiper Motor (Rear)', oemNumber: '5G6 955 711 A', category: 'Body', compatibility: ['Golf 7'], stock: 5, price: 145.00 },
  { id: 'P79', name: 'Coolant Temperature Sensor', oemNumber: '06K 919 525', category: 'Electrical', compatibility: ['MQB Models'], stock: 35, price: 18.00 },
  { id: 'P80', name: 'Manual Transmission Shift Cable', oemNumber: '5G0 711 265 AD', category: 'Drivetrain', compatibility: ['6-Speed Manual'], stock: 4, price: 92.00 },
  { id: 'P81', name: 'Crankshaft Pulley (Harmonic Balancer)', oemNumber: '06L 105 243 B', category: 'Engine', compatibility: ['2.0T TSI'], stock: 6, price: 115.00 },
  { id: 'P82', name: 'Blower Motor Resistor', oemNumber: '5Q0 907 521 D', category: 'Cooling', compatibility: ['Climatronic Systems'], stock: 12, price: 65.00 },
  { id: 'P83', name: 'Side Marker Light (Orange)', oemNumber: '5G0 945 071', category: 'Lighting', compatibility: ['Jetta/Golf US Spec'], stock: 20, price: 25.00 },
  { id: 'P84', name: 'Steering Column Clock Spring', oemNumber: '5K0 953 549 B', category: 'Steering', compatibility: ['Various Models'], stock: 3, price: 210.00 },
  { id: 'P85', name: 'Trunk Release Switch', oemNumber: '3C0 959 831 A', category: 'Interior', compatibility: ['Passat B6/B7'], stock: 8, price: 32.00 },
  { id: 'P86', name: 'Differential Fluid (Haldex)', oemNumber: 'G 060 175 A2', category: 'Lubricants', compatibility: ['4Motion Systems'], stock: 15, price: 48.00 },
  { id: 'P87', name: 'Haldex Gen 5 Pump', oemNumber: '0CQ 598 549', category: 'Drivetrain', compatibility: ['Golf R', 'Tiguan 4Mo'], stock: 2, price: 320.00 },
  { id: 'P88', name: 'Fuel Tank Pressure Sensor', oemNumber: '06K 906 051', category: 'Fuel System', compatibility: ['Modern TSI'], stock: 11, price: 62.00 },
  { id: 'P89', name: 'Valve Stem Seal Set', oemNumber: '036 109 675 A', category: 'Engine', compatibility: ['16V Engines'], stock: 50, price: 24.00 },
  { id: 'P90', name: 'Exhaust Hanger (Rubber)', oemNumber: '1K0 253 147', category: 'Exhaust', compatibility: ['Universal VW'], stock: 40, price: 12.00 },
  { id: 'P91', name: 'Turbo Inlet Pipe (High Flow)', oemNumber: '06K 129 627 E', category: 'Engine', compatibility: ['2.0T MQB'], stock: 10, price: 145.00 },
  { id: 'P92', name: 'Sun Visor (Left with Mirror)', oemNumber: '5G0 857 551 AJ', category: 'Interior', compatibility: ['Golf 7'], stock: 4, price: 110.00 },
  { id: 'P93', name: 'Seat Recline Handle', oemNumber: '1K0 881 671', category: 'Interior', compatibility: ['Golf 5/6'], stock: 15, price: 14.00 },
  { id: 'P94', name: 'Engine Splash Shield (Undertray)', oemNumber: '5Q0 825 235 L', category: 'Body', compatibility: ['MQB Platform'], stock: 7, price: 85.00 },
  { id: 'P95', name: 'Radiator Hose (Upper)', oemNumber: '5Q0 122 101 AT', category: 'Cooling', compatibility: ['Golf 7'], stock: 12, price: 38.00 },
  { id: 'P96', name: 'Air Conditioning Compressor', oemNumber: '5Q0 820 803 K', category: 'Cooling', compatibility: ['Various MQB'], stock: 3, price: 450.00 },
  { id: 'P97', name: 'Brake Shield (Front Left)', oemNumber: '5Q0 615 311 G', category: 'Brakes', compatibility: ['Golf MK7'], stock: 8, price: 28.00 },
  { id: 'P98', name: 'Ignition Switch', oemNumber: '1K0 905 841', category: 'Electrical', compatibility: ['Jetta/Golf MK5'], stock: 10, price: 42.00 },
  { id: 'P99', name: 'Rear View Mirror (Auto Dimming)', oemNumber: '5G0 857 511 C', category: 'Interior', compatibility: ['Golf 7'], stock: 3, price: 215.00 },
  { id: 'P100', name: 'Oil Level Sensor', oemNumber: '06L 907 660 D', category: 'Electrical', compatibility: ['Modern EA888'], stock: 14, price: 82.00 },
  { id: 'P101', name: 'Center Console Armrest Lid', oemNumber: '5G0 864 207', category: 'Interior', compatibility: ['Golf 7'], stock: 5, price: 75.00 },
  { id: 'P102', name: 'Fuel Filler Flap Actuator', oemNumber: '5G0 810 773 D', category: 'Body', compatibility: ['Golf 7'], stock: 12, price: 48.00 },
  { id: 'P103', name: 'Clutch Slave Cylinder', oemNumber: '5Q0 721 261 L', category: 'Drivetrain', compatibility: ['6-Speed Manual MQB'], stock: 6, price: 110.00 },
];

const vwModels = ['Golf R', 'GTI', 'Tiguan', 'ID.4', 'Atlas', 'Arteon', 'Jetta', 'Polo', 'Passat', 'Touareg', 'Taos', 'ID. Buzz', 'T-Roc', 'Amarok', 'Scirocco', 'Beetle', 'ID.3', 'ID.7', 'T-Cross'];
const conditions: Condition[] = ['New', 'Semi-New', 'Used'];
const images = [
  'https://images.unsplash.com/photo-1621342613803-08709339e80b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606148644561-910408d6605d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1651581451000-090680376510?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1616744334415-32e6573c004c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?auto=format&fit=crop&q=80&w=800'
];

const generateCars = (count: number): Car[] => {
  const cars: Car[] = [];
  const trims = ['Edition 50', 'Performance', 'Life', 'Style', 'Elegance', 'R-Line', 'Base', 'Premium Plus', 'Black Edition'];
  
  for (let i = 1; i <= count; i++) {
    const model = vwModels[Math.floor(Math.random() * vwModels.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const trim = trims[Math.floor(Math.random() * trims.length)];
    const year = 2012 + Math.floor(Math.random() * 13);
    const price = condition === 'New' ? 35000 + Math.floor(Math.random() * 45000) : 12000 + Math.floor(Math.random() * 30000);
    const mileage = condition === 'New' ? 0 : 5000 + Math.floor(Math.random() * 120000);
    
    // Generate a semi-realistic VIN
    const randomSuffix = Math.random().toString(36).substring(2, 12).toUpperCase();
    const vin = `WVW${year % 10}${Math.random().toString(36).substring(2, 3).toUpperCase()}${randomSuffix}`;

    cars.push({
      id: `C_LARGE_${i}`,
      model: `${model} ${trim}`,
      year,
      vin,
      condition,
      price,
      mileage,
      image: images[Math.floor(Math.random() * images.length)]
    });
  }
  return cars;
};

export const mockCars: Car[] = [
  // Static established cars
  { id: 'C1', model: 'Golf R Heritage', year: 2024, vin: 'WVWZZZ123456', condition: 'New', price: 46000, mileage: 0, image: 'https://images.unsplash.com/photo-1621342613803-08709339e80b?auto=format&fit=crop&q=80&w=800' },
  { id: 'C2', model: 'Tiguan SEL Premium', year: 2022, vin: '3VWZZZ789012', condition: 'Semi-New', price: 32500, mileage: 12500, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800' },
  { id: 'C3', model: 'Beetle Classic', year: 2015, vin: '3VWZZZ345678', condition: 'Used', price: 15900, mileage: 65000, image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800' },
  ...generateCars(3000) // The requested 3000 additional vehicles
];

export const mockCustomers: Customer[] = [
  { id: 'CU1', name: 'Hans Müller', email: 'hans@volks.de', phone: '+49 123 456789', ownedCars: ['WVWZZZ123456'] },
  { id: 'CU2', name: 'Sarah Jones', email: 'sarah.j@email.com', phone: '+1 555 0199', ownedCars: ['3VWZZZ789012'] },
  { id: 'CU3', name: 'Elena Petrova', email: 'elena.p@provider.com', phone: '+44 20 7946 0000', ownedCars: ['WVWZZZ221100', 'WVWZZZ009988'] },
  { id: 'CU4', name: 'Lucas Schmidt', email: 'lucas.schmidt@berlin-mail.de', phone: '+49 30 123456', ownedCars: ['WVWZZZ17ZEW1'] },
  { id: 'CU5', name: 'Maria García', email: 'm.garcia@hola.es', phone: '+34 912 345 678', ownedCars: ['WVGZZZA1Z223'] },
  { id: 'CU6', name: 'David Wilson', email: 'david.wilson@uk-web.co.uk', phone: '+44 161 234 5678', ownedCars: ['WVWZZZEDZ334'] },
  { id: 'CU7', name: 'Yuki Tanaka', email: 'y.tanaka@tokyo-net.jp', phone: '+81 3 1234 5678', ownedCars: ['WV1ZZZS6Z445'] },
  { id: 'CU8', name: 'Chloe Lefebvre', email: 'chloe.l@paris-mail.fr', phone: '+33 1 23 45 67 89', ownedCars: ['WVWZZZ13Z556'] },
  { id: 'CU9', name: 'Marco Rossi', email: 'm.rossi@roma-italia.it', phone: '+39 06 1234567', ownedCars: ['WVGZZZC1Z667'] },
  { id: 'CU10', name: 'Ahmed Al-Farsi', email: 'ahmed.farsi@dubai-mail.ae', phone: '+971 4 123 4567', ownedCars: ['WVWZZZ50Z778'] },
  { id: 'CU11', name: 'Isabella Conti', email: 'i.conti@milan-design.it', phone: '+39 02 7654321', ownedCars: ['WV2ZZZ7HZ889'] },
  { id: 'CU12', name: 'Kevin O\'Sullivan', email: 'kevin.os@dublin-net.ie', phone: '+353 1 234 5678', ownedCars: ['WVWZZZAWZ990'] },
  { id: 'CU13', name: 'Anna Nowak', email: 'a.nowak@warsaw-web.pl', phone: '+48 22 123 45 67', ownedCars: ['WVWZZZ7NZ001'] },
  { id: 'CU14', name: 'Jean-Pierre Dubois', email: 'jp.dubois@lyon-mail.fr', phone: '+33 4 12 34 56 78', ownedCars: [] },
  { id: 'CU15', name: 'Sofia Andersson', email: 's.andersson@stockholm-net.se', phone: '+46 8 123 45 67', ownedCars: [] },
];

export const mockSales: Sale[] = [
  { id: 'S1', type: 'Car', itemId: 'C2', customerId: 'CU2', amount: 32500, date: '2023-10-15' },
  { id: 'S2', type: 'Part', itemId: 'P3', customerId: 'CU1', amount: 89.00, date: '2023-11-20' },
  { id: 'S3', type: 'Part', itemId: 'P7', customerId: 'CU3', amount: 210.00, date: '2024-01-05' },
];

export const mockMaintenance: MaintenanceRecord[] = [
  { id: 'M1', vin: 'WVWZZZ123456', customerId: 'CU1', serviceType: 'First Oil Service', date: '2024-02-15', notes: 'Standard checkup', status: 'Scheduled' },
  { id: 'M2', vin: '3VWZZZ789012', customerId: 'CU2', serviceType: 'DSG Service', date: '2023-12-01', notes: 'Filter and fluid change', status: 'Completed' },
  { id: 'M3', vin: 'WVWZZZ221100', customerId: 'CU3', serviceType: 'Brake Inspection', date: '2024-03-10', notes: 'Customer reports squeaking', status: 'Scheduled' },
];
