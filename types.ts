
export type Condition = 'New' | 'Semi-New' | 'Used';

export interface Part {
  id: string;
  name: string;
  oemNumber: string;
  category: string;
  compatibility: string[];
  stock: number;
  price: number;
}

export interface Car {
  id: string;
  model: string;
  year: number;
  vin: string;
  condition: Condition;
  price: number;
  mileage: number;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ownedCars: string[]; // VINs
}

export interface Sale {
  id: string;
  type: 'Part' | 'Car';
  itemId: string;
  customerId: string;
  amount: number;
  date: string;
}

export interface MaintenanceRecord {
  id: string;
  vin: string;
  customerId: string;
  serviceType: string;
  date: string;
  notes: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

export enum Tab {
  Dashboard = 'Dashboard',
  PartsInventory = 'Parts Inventory',
  CarShowroom = 'Car Showroom',
  Maintenance = 'Maintenance',
  SalesHistory = 'Sales History',
  Customers = 'Customers'
}
