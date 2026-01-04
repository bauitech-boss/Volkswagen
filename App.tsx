
import React, { useState, useMemo, useEffect } from 'react';
import { Tab, Part, Car, Customer, Sale, MaintenanceRecord, Condition } from './types';
import Sidebar from './components/Sidebar';
import VBotAssistant from './components/VBotAssistant';
import { mockParts, mockCars, mockCustomers, mockSales, mockMaintenance } from './data/mockData';

const CARS_PER_PAGE = 2000;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(mockMaintenance);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  
  // Pagination State for Showroom
  const [carsLimit, setCarsLimit] = useState(CARS_PER_PAGE);

  // Reset pagination when filters change
  useEffect(() => {
    setCarsLimit(CARS_PER_PAGE);
  }, [searchQuery, selectedCondition, activeTab]);
  
  // UI States
  const [showAddPart, setShowAddPart] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showScheduleService, setShowScheduleService] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState<{type: 'Part' | 'Car', id: string} | null>(null);

  // Derived Data
  const categories = useMemo(() => ['All', ...new Set(parts.map(p => p.category))], [parts]);
  
  const filteredParts = useMemo(() => 
    parts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.oemNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
    [parts, searchQuery, selectedCategory]
  );

  const filteredCarsFullList = useMemo(() => 
    cars.filter(c => {
      const matchesSearch = c.model.toLowerCase().includes(searchQuery.toLowerCase()) || c.vin.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCondition = selectedCondition === 'All' || c.condition === selectedCondition;
      return matchesSearch && matchesCondition;
    }),
    [cars, searchQuery, selectedCondition]
  );

  const filteredCarsPaginated = useMemo(() => 
    filteredCarsFullList.slice(0, carsLimit),
    [filteredCarsFullList, carsLimit]
  );

  const filteredCustomers = useMemo(() => 
    customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [customers, searchQuery]
  );

  const getCustomerSpending = (customerId: string) => {
    return sales
      .filter(s => s.customerId === customerId)
      .reduce((sum, s) => sum + s.amount, 0);
  };

  // Logic Handlers
  const handleRecordSale = (customerId: string) => {
    if (!showSaleModal) return;
    const { type, id } = showSaleModal;
    const date = new Date().toISOString().split('T')[0];
    
    if (type === 'Car') {
      const car = cars.find(c => c.id === id);
      if (car) {
        const newSale: Sale = { id: `S${Date.now()}`, type: 'Car', itemId: car.id, customerId, amount: car.price, date };
        setSales([newSale, ...sales]);
        setCars(cars.filter(c => c.id !== id));
      }
    } else {
      const part = parts.find(p => p.id === id);
      if (part && part.stock > 0) {
        const newSale: Sale = { id: `S${Date.now()}`, type: 'Part', itemId: part.id, customerId, amount: part.price, date };
        setSales([newSale, ...sales]);
        setParts(parts.map(p => p.id === id ? { ...p, stock: p.stock - 1 } : p));
      }
    }
    setShowSaleModal(null);
  };

  const handleAddPart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPart: Part = {
      id: `P${Date.now()}`,
      name: formData.get('name') as string,
      oemNumber: formData.get('oem') as string,
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string),
      price: parseFloat(formData.get('price') as string),
      compatibility: [(formData.get('compatibility') as string)]
    };
    setParts([newPart, ...parts]);
    setShowAddPart(false);
  };

  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCar: Car = {
      id: `C${Date.now()}`,
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string),
      vin: formData.get('vin') as string,
      condition: formData.get('condition') as Condition,
      price: parseFloat(formData.get('price') as string),
      mileage: parseInt(formData.get('mileage') as string),
      image: (formData.get('image') as string) || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800'
    };
    setCars([newCar, ...cars]);
    setShowAddCar(false);
  };

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCust: Customer = {
      id: `CU${Date.now()}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      ownedCars: []
    };
    setCustomers([newCust, ...customers]);
    setShowAddCustomer(false);
  };

  const handleScheduleService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRecord: MaintenanceRecord = {
      id: `M${Date.now()}`,
      vin: formData.get('vin') as string,
      customerId: formData.get('customerId') as string,
      serviceType: formData.get('serviceType') as string,
      date: formData.get('date') as string,
      notes: formData.get('notes') as string,
      status: 'Scheduled'
    };
    setMaintenance([newRecord, ...maintenance]);
    setShowScheduleService(false);
  };

  const deletePart = (id: string) => {
    if (window.confirm('Are you sure you want to remove this part from inventory?')) {
      setParts(parts.filter(p => p.id !== id));
    }
  };

  const deleteCar = (id: string) => {
    if (window.confirm('Are you sure you want to remove this vehicle listing?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const updateMaintenanceStatus = (id: string) => {
    setMaintenance(prev => prev.map(m => {
      if (m.id !== id) return m;
      const nextStatus: MaintenanceRecord['status'] = 
        m.status === 'Scheduled' ? 'In Progress' : 
        m.status === 'In Progress' ? 'Completed' : 'Completed';
      return { ...m, status: nextStatus };
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-gray-800">Operational Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="Parts in Stock" value={parts.reduce((acc, p) => acc + p.stock, 0).toLocaleString()} color="blue" />
              <StatCard label="Active Car Listings" value={cars.length.toLocaleString()} color="emerald" />
              <StatCard label="Total Customers" value={customers.length.toString()} color="purple" />
              <StatCard label="Total Revenue" value={`$${sales.reduce((acc, s) => acc + s.amount, 0).toLocaleString()}`} color="orange" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Recent Sales Activity</h3>
                <div className="space-y-4">
                  {sales.length > 0 ? sales.slice(0, 5).map(s => (
                    <div key={s.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{s.type} Sale</p>
                        <p className="text-xs text-gray-500">{s.date} • {customers.find(c => c.id === s.customerId)?.name}</p>
                      </div>
                      <p className="font-bold text-blue-600">${s.amount.toLocaleString()}</p>
                    </div>
                  )) : <p className="text-gray-400 text-sm py-4 italic text-center">No recent transactions</p>}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Urgent Maintenance</h3>
                <div className="space-y-4">
                  {maintenance.filter(m => m.status !== 'Completed').length > 0 ? 
                    maintenance.filter(m => m.status !== 'Completed').slice(0, 5).map(m => (
                      <div key={m.id} className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                        <div>
                          <p className="font-medium text-gray-900">{m.serviceType}</p>
                          <p className="text-xs text-gray-600">VIN: {m.vin}</p>
                        </div>
                        <button 
                          onClick={() => updateMaintenanceStatus(m.id)}
                          className="text-xs font-bold uppercase tracking-wider bg-white px-3 py-1 rounded border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          {m.status === 'Scheduled' ? 'Start' : 'Finish'}
                        </button>
                      </div>
                    )) : <p className="text-gray-400 text-sm py-4 italic text-center">No pending service records</p>}
                </div>
              </div>
            </div>
          </div>
        );

      case Tab.PartsInventory:
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Parts Inventory</h2>
              <div className="flex flex-wrap w-full md:w-auto gap-3">
                <select 
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Search parts..."
                  className="flex-1 md:w-48 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setShowAddPart(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm">Add Part</button>
              </div>
            </div>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] font-bold border-b">
                  <tr>
                    <th className="px-6 py-4">Part Details</th>
                    <th className="px-6 py-4">OEM #</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredParts.map(part => (
                    <tr key={part.id} className="hover:bg-gray-50 text-sm transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{part.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{part.category}</p>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">{part.oemNumber}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${part.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                          {part.stock} left
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700">${part.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => setShowSaleModal({type: 'Part', id: part.id})} className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase disabled:opacity-30">Sell</button>
                        <button onClick={() => deletePart(part.id)} className="text-gray-300 group-hover:text-red-400 hover:!text-red-600 transition-colors">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredParts.length === 0 && <div className="p-20 text-center text-gray-400">No parts found matching your criteria.</div>}
            </div>
          </div>
        );

      case Tab.CarShowroom:
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Vehicle Showroom</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Showing {Math.min(filteredCarsFullList.length, carsLimit).toLocaleString()} of {filteredCarsFullList.length.toLocaleString()} matching units</p>
              </div>
              <div className="flex flex-wrap w-full md:w-auto gap-3">
                <select 
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  <option value="All">All Conditions</option>
                  <option value="New">New</option>
                  <option value="Semi-New">Semi-New</option>
                  <option value="Used">Used</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search model/VIN..."
                  className="flex-1 md:w-48 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setShowAddCar(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700">Add Vehicle</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredCarsPaginated.map(car => (
                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group hover:shadow-xl transition-all relative">
                  <button onClick={() => deleteCar(car.id)} className="absolute top-2 left-2 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  <div className="h-44 relative overflow-hidden">
                    <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg ${
                      car.condition === 'New' ? 'bg-blue-600 text-white' : 
                      car.condition === 'Semi-New' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {car.condition}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-black text-gray-900 leading-tight">{car.model}</h3>
                      <span className="text-xs font-bold text-gray-400">{car.year}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono truncate">VIN: {car.vin}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                        <p className="text-[9px] text-gray-400 uppercase font-black">MSRP</p>
                        <p className="text-base font-black text-blue-600">${car.price.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl text-right border border-gray-100">
                        <p className="text-[9px] text-gray-400 uppercase font-black">Mileage</p>
                        <p className="text-base font-black text-gray-700 truncate">{car.mileage.toLocaleString()} <span className="text-[10px] font-normal">km</span></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowSaleModal({type: 'Car', id: car.id})}
                      className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 text-sm"
                    >
                      Process Sale
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCarsFullList.length > carsLimit && (
              <div className="flex flex-col items-center py-10 gap-4">
                <button 
                  onClick={() => setCarsLimit(prev => prev + CARS_PER_PAGE)}
                  className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  LOAD MORE VEHICLES 
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{filteredCarsFullList.length - carsLimit} remaining</span>
                </button>
              </div>
            )}

            {filteredCarsFullList.length === 0 && <div className="p-20 text-center text-gray-400 bg-white rounded-2xl border border-dashed">No vehicles matching your selection.</div>}
          </div>
        );

      case Tab.Maintenance:
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Service Bay Queue</h2>
              <button onClick={() => setShowScheduleService(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md">Schedule Appointment</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase border-b">
                  <tr>
                    <th className="px-6 py-4">Service Type & Notes</th>
                    <th className="px-6 py-4">Vehicle Identity</th>
                    <th className="px-6 py-4">Appt. Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {maintenance.map(rec => (
                    <tr key={rec.id} className="text-sm hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 max-w-xs">
                        <p className="font-black text-gray-900">{rec.serviceType}</p>
                        <p className="text-[11px] text-gray-400 leading-tight">{rec.notes}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded inline-block mb-1">{rec.vin}</p>
                        <p className="text-xs font-bold text-blue-600">{customers.find(c => c.id === rec.customerId)?.name || 'Guest'}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700">{rec.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          rec.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                          rec.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {rec.status !== 'Completed' ? (
                          <button 
                            onClick={() => updateMaintenanceStatus(rec.id)}
                            className="bg-white border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-black transition-all shadow-sm"
                          >
                            {rec.status === 'Scheduled' ? 'Open Ticket' : 'Close Ticket'}
                          </button>
                        ) : <span className="text-emerald-500 text-xs font-bold">Invoiced</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case Tab.Customers:
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Client Portfolio</h2>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Search clients..."
                  className="w-64 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setShowAddCustomer(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 shadow-md">Register Client</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map(cust => (
                <div key={cust.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:rotate-6 transition-transform">
                      {cust.name[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg leading-tight">{cust.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{cust.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-[9px] uppercase font-bold text-gray-400">Total Spent</p>
                      <p className="text-sm font-black text-emerald-600">${getCustomerSpending(cust.id).toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-[9px] uppercase font-bold text-gray-400">Cars Owned</p>
                      <p className="text-sm font-black text-blue-600">{cust.ownedCars.length}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {cust.ownedCars.map(vin => (
                      <div key={vin} className="bg-blue-50/30 px-3 py-1.5 rounded-lg text-[10px] font-mono text-gray-600 flex justify-between items-center border border-blue-100/50">
                        <span>{vin}</span>
                        <span className="text-blue-500 font-bold hover:underline cursor-pointer">Specs</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case Tab.SalesHistory:
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800">Transaction Ledger</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase border-b">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Executed On</th>
                    <th className="px-6 py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.map(sale => (
                    <tr key={sale.id} className="text-sm hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] text-gray-400">{sale.id}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${sale.type === 'Car' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                          {sale.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {customers.find(c => c.id === sale.customerId)?.name || 'Walk-in Client'}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{sale.date}</td>
                      <td className="px-6 py-4 font-black text-emerald-600 text-right text-lg">${sale.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return <div className="text-center py-20 text-gray-500 italic">This module is currently receiving system updates...</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSearchQuery(''); setSelectedCategory('All'); setSelectedCondition('All'); }} />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-1">VolksManager Enterprise Edition</h1>
            <p className="text-sm text-gray-500 font-medium">Session Active: {activeTab}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-gray-400 uppercase">Fleet Inventory Status</span>
              <span className="text-sm font-black text-emerald-500 flex items-center justify-end gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> {cars.length.toLocaleString()} Units Online</span>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>

      {/* Sale Confirmation Modal */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-500 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-gray-900">Authorize Sale</h3>
              <button onClick={() => setShowSaleModal(null)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <p className="text-gray-500 text-sm mb-6 font-medium">Please link this transaction to an existing customer profile to proceed:</p>
            <div className="max-h-72 overflow-y-auto space-y-2 mb-8 pr-2">
              {customers.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => handleRecordSale(c.id)}
                  className="w-full text-left p-4 border border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
                >
                  <div>
                    <span className="font-black text-gray-900 block">{c.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">LTV: ${getCustomerSpending(c.id).toLocaleString()}</span>
                  </div>
                  <span className="text-blue-600 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-inner opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
               <button onClick={() => { setShowSaleModal(null); setShowAddCustomer(true); }} className="text-blue-600 text-xs font-bold hover:underline">Register New Client First</button>
               <button onClick={() => setShowSaleModal(null)} className="text-gray-400 font-bold px-4 py-2 hover:bg-gray-50 rounded-xl text-xs uppercase tracking-widest">Abort</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Part Modal */}
      {showAddPart && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <form onSubmit={handleAddPart} className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 border border-white/20">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Stock Induction</h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block ml-1">Official Part Name</label>
                <input required name="name" type="text" placeholder="e.g. MK7 Turbocharger Rev T" className="w-full border-gray-100 bg-gray-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none border" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block ml-1">OEM Number</label>
                <input required name="oem" type="text" placeholder="06K 145 722 T" className="w-full border-gray-100 bg-gray-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none border" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block ml-1">Classification</label>
                <select name="category" className="w-full border-gray-100 bg-gray-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none border">
                  {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="Uncategorized">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block ml-1">Unit Price ($)</label>
                <input required name="price" type="number" step="0.01" placeholder="0.00" className="w-full border-gray-100 bg-gray-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none border" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block ml-1">Starting Stock</label>
                <input required name="stock" type="number" placeholder="0" className="w-full border-gray-100 bg-gray-50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none border" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setShowAddPart(false)} className="px-6 py-3 text-gray-400 font-bold uppercase text-xs tracking-widest hover:bg-gray-50 rounded-xl">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">Finalize Entry</button>
            </div>
          </form>
        </div>
      )}

      <VBotAssistant context={{ parts, cars, maintenance, customers }} />
    </div>
  );
};

// Helper Components
interface StatCardProps {
  label: string;
  value: string;
  color: 'blue' | 'emerald' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  const colors = {
    blue: 'border-blue-500 text-blue-600',
    emerald: 'border-emerald-500 text-emerald-600',
    purple: 'border-purple-500 text-purple-600',
    orange: 'border-orange-500 text-orange-600'
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${colors[color]} hover:translate-y-[-4px] transition-all cursor-default border group`}>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-gray-600 transition-colors">{label}</p>
      <p className="text-2xl font-black mt-1 leading-none">{value}</p>
    </div>
  );
};

export default App;
