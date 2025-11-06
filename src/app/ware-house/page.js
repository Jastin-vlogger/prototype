"use client"
import React, { useState, useEffect, useMemo } from 'react';
let ChartJS;

// --- CDN Imports ---
// These are loaded from the environment
// const { Bar, Doughnut } = window.ReactChartjs2; // Removed this line
if (typeof window !== 'undefined') {
const ChartJS = window.Chart;
}
// --- End CDN Imports ---


// Register Chart.js components
if (ChartJS) {
  ChartJS.register(
    ChartJS.CategoryScale, 
    ChartJS.LinearScale, 
    ChartJS.BarElement, 
    ChartJS.Title, 
    ChartJS.Tooltip, 
    ChartJS.Legend, 
    ChartJS.ArcElement
  );
}

// --- Icon Component ---
// Replaces lucide-react for preview compatibility
function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    Check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>,
    ChevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
    ChevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16.5 9.4 7.5 4.6"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    Warehouse: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M15 22v-8"/><path d="M9 22v-8"/></svg>,
    PackageOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><path d="m14 6-3-1.7L8 6"/><path d="M12 12 3.3 7"/></svg>,
    Truck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 17h4V5H2v12h3"/><path d="M14 17h5v-3.11"/><path d="M20 17h1.72a2 2 0 0 0 1.94-2.51l-1.55-5.28A2 2 0 0 0 18.21 8H14v9Z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Bell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
    Search: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    HelpCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
    LogOut: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>,
    Menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>,
    ShoppingCart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    PackageSearch: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2.24-1.28"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>,
    AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
    Archive: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/><path d="M22 4H2v4h20V4Z"/></svg>,
    BarChart2: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
    Boxes: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><path d="M12 12 3.3 7"/><path d="M20.7 7 12 12"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    ClipboardList: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
    ScanLine: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>,
    Fingerprint: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 12a2 2 0 0 1 2 2c0 1.02.1 2.51.26 4"/><path d="M14 10a2 2 0 0 0-2-2"/><path d="M12 14a2 2 0 0 1 2-2"/><path d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10c0 4.8-3.2 8.8-7.5 9.8"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .13-4.2-.23-6.15"/><path d="M16 4.13c1.8.63 3.3 1.9 4.3 3.6"/><path d="M4.1 16c-.2-2-.13-4.2.23-6.15"/><path d="M8 4.13c-1.8.63-3.3 1.9-4.3 3.6"/><path d="M7 18a2 2 0 0 0-2-2"/><path d="M17 18a2 2 0 0 1 2-2"/></svg>,
    HardDriveUpload: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 16v-7m3 3-3-3-3 3"/><rect width="20" height="8" x="2" y="4" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="m2 16 2.1 3.5c.2.4.6.5 1 .5h13.8c.4 0 .8-.2 1-.5L22 16"/></svg>,
    ArrowRightLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  };
  return icons[name] || null;
}
// --- End Icon Component ---


// --- MOCK DATA ---
const initialProducts = [
  { id: 1, name: 'Wireless Mouse', sku: 'LOGI-M510', stock: 120, vanStock: 10, category: 'Electronics' },
  { id: 2, name: '4K Monitor', sku: 'DELL-U2723QE', stock: 75, vanStock: 5, category: 'Electronics' },
  { id: 3, name: 'Mechanical Keyboard', sku: 'RAZER-BWV3', stock: 90, vanStock: 8, category: 'Electronics' },
  { id: 4, name: 'USB-C Hub', sku: 'ANKR-A8346', stock: 250, vanStock: 20, category: 'Accessories' },
  { id: 5, name: 'Ergonomic Chair', sku: 'HM-AERON', stock: 30, vanStock: 2, category: 'Furniture' },
  { id: 6, name: 'Standing Desk', sku: 'VARIDESK-P60', stock: 45, vanStock: 3, category: 'Furniture' },
  { id: 7, name: 'Laptop Stand', sku: 'RAIN-MSTAND', stock: 150, vanStock: 15, category: 'Accessories' },
  { id: 8, name: 'Webcam', sku: 'LOGI-C920', stock: 8, vanStock: 5, category: 'Electronics' },
  { id: 9, name: 'Desk Mat', sku: 'GROVEMADE-L', stock: 5, vanStock: 2, category: 'Accessories' },
];

const initialOrders = [
  { 
    id: 1001, 
    customer: 'Tech Solutions Ltd.', 
    status: 'Pending', 
    assignedTo: null, 
    items: [
      { productId: 1, name: 'Wireless Mouse', quantity: 10 },
      { productId: 3, name: 'Mechanical Keyboard', quantity: 5 }
    ] 
  },
  { 
    id: 1002, 
    customer: 'Office Essentials Inc.', 
    status: 'Assigned', 
    assignedTo: 'picker1', 
    items: [
      { productId: 2, name: '4K Monitor', quantity: 2 },
      { productId: 5, name: 'Ergonomic Chair', quantity: 2 },
      { productId: 7, name: 'Laptop Stand', quantity: 4 }
    ] 
  },
  { 
    id: 1003, 
    customer: 'Global Exports', 
    status: 'Packed', 
    assignedTo: 'picker1', 
    items: [{ productId: 4, name: 'USB-C Hub', quantity: 50 }] 
  },
  { 
    id: 1004, 
    customer: 'Creative Minds LLC', 
    status: 'Out for Delivery', 
    assignedTo: 'picker1', 
    deliveryPerson: 'delivery1',
    items: [{ productId: 6, name: 'Standing Desk', quantity: 1 }] 
  },
  { 
    id: 1005, 
    customer: 'Home Office Setup', 
    status: 'Stock Shortage', 
    assignedTo: 'picker1', 
    items: [
      { productId: 8, name: 'Webcam', quantity: 10 }, // Stock is 8
      { productId: 9, name: 'Desk Mat', quantity: 5 }
    ] 
  },
  { 
    id: 1006, 
    customer: 'Startup Hub', 
    status: 'Delivered', 
    assignedTo: 'picker2', 
    deliveryPerson: 'delivery2',
    items: [{ productId: 1, name: 'Wireless Mouse', quantity: 20 }] 
  },
  { 
    id: 1007, 
    customer: 'Co-work Space', 
    status: 'Pending', 
    assignedTo: null, 
    items: [
      { productId: 5, name: 'Ergonomic Chair', quantity: 10 },
      { productId: 6, name: 'Standing Desk', quantity: 10 }
    ] 
  },
];

const initialPOs = [
  { id: 'PO-2001', vendor: 'Logi Suppliers', status: 'Pending', items: [{ productId: 1, name: 'Wireless Mouse', quantity: 50 }] },
  { id: 'PO-2002', vendor: 'Dell Partners', status: 'Received', items: [{ productId: 2, name: '4K Monitor', quantity: 25 }] },
  { id: 'PO-2003', vendor: 'Herman Miller', status: 'Pending', items: [{ productId: 5, name: 'Ergonomic Chair', quantity: 20 }] },
];

const initialTransferLog = [
  { id: 'T-001', type: 'transfer', date: '2025-10-31 09:15', user: 'Alex Johnson', items: [{ name: 'Wireless Mouse', quantity: 10 }] },
  { id: 'R-001', type: 'return', date: '2025-10-31 17:30', user: 'Alex Johnson', items: [{ name: 'Wireless Mouse', quantity: 2 }] },
  { id: 'T-002', type: 'transfer', date: '2025-11-01 10:00', user: 'Alex Johnson', items: [{ name: '4K Monitor', quantity: 5 }, { name: 'USB-C Hub', quantity: 10 }] },
];

const users = {
  picker1: { id: 'picker1', name: 'Alex Johnson', role: 'Picker' },
  manager1: { id: 'manager1', name: 'Sarah Chen', role: 'Manager' },
};

// --- CHART DATA OPTIONS ---
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
        borderDash: [5, 5],
      },
    },
  },
};

const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Seen product',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: '#d6dcf0', // Light blue/purple
      borderRadius: 6,
    },
    {
      label: 'Sales',
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: '#f04242', // Red
      borderRadius: 6,
    },
  ],
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: false,
    },
  },
};

const doughnutChartData = {
  labels: ['Products Sales', 'Home Goods'],
  datasets: [
    {
      data: [5700, 2500],
      backgroundColor: ['#3b82f6', '#d6dcf0'], // Blue, Light blue/purple
      borderColor: ['#3b82f6', '#d6dcf0'],
      borderWidth: 1,
    },
  ],
};


// --- HELPER COMPONENTS ---

function StatusBadge({ status }) {
  const statusConfig = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Assigned': 'bg-blue-100 text-blue-800',
    'Packed': 'bg-green-100 text-green-800',
    'Stock Shortage': 'bg-red-100 text-red-800',
    'Out for Delivery': 'bg-cyan-100 text-cyan-800',
    'Delivered': 'bg-gray-100 text-gray-800',
    'Received': 'bg-green-100 text-green-800',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}

function KpiCard({ title, value, icon: IconName, percentage, trend, gradient = false, description }) {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  
  if (gradient) {
    return (
      <div className={`p-5 rounded-lg shadow-sm text-white bg-gradient-to-br from-red-600 to-blue-500`}>
        <div className="flex justify-between items-center mb-2">
           <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Icon name={IconName} className="w-5 h-5" />
           </div>
           <span className={`flex items-center text-sm font-medium text-white`}>
             <span className="mr-1">{trend === 'up' ? '▲' : '▼'}</span>
             {percentage}%
           </span>
        </div>
        <p className="text-sm text-red-100 font-medium">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-red-200 mt-1">{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon name={IconName} className="w-5 h-5 text-gray-600" />
        </div>
        <span className={`flex items-center text-sm font-medium ${trendColor}`}>
          <span className="mr-1">{trend === 'up' ? '▲' : '▼'}</span>
          {percentage}%
        </span>
      </div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );
}

function ProductCategories() {
  const Doughnut = window.ReactChartjs2?.Doughnut;

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Product Categories</h3>
        <button className="text-sm text-gray-500">Today <Icon name="ChevronDown" className="inline w-4 h-4" /></button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Track your customer locations</p>
      <div className="h-60 relative">
        {Doughnut ? (
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
        )}
      </div>
    </div>
  );
}

function RecentOrders({ orders }) {
  const recent = orders.slice(0, 5); // Show top 5
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        <button className="text-sm text-gray-500">Today <Icon name="ChevronDown" className="inline w-4 h-4" /></button>
      </div>
      <div className="space-y-3">
        {recent.map(order => (
          <div key={order.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Order #{order.id}</p>
              <p className="text-xs text-gray-500">{order.customer}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LowStockItems({ products }) {
  const lowStock = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock).slice(0, 5);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Low Stock Items</h3>
        <button className="text-sm text-blue-600 font-medium">View All</button>
      </div>
      <div className="space-y-3">
        {lowStock.length > 0 ? lowStock.map(product => (
          <div key={product.id} className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{product.name}</span>
            <span className="text-sm font-bold text-red-600">{product.stock} units</span>
          </div>
        )) : (
          <p className="text-sm text-gray-500">No items are low on stock.</p>
        )}
      </div>
    </div>
  );
}

// --- MAIN PAGES ---

function DashboardPage({ orders, products, vanStock, userRole }) {
  const Bar = window.ReactChartjs2?.Bar;

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingShipments = orders.filter(o => o.status === 'Packed').length;
    const availableStock = products.reduce((acc, p) => acc + p.stock, 0);
    const totalVanStock = products.reduce((acc, p) => acc + p.vanStock, 0);

    // Mock percentage changes
    const totalOrdersChange = 15.8;
    const pendingShipmentsChange = -9.0;
    const availableStockChange = -8.0;
    const vanStockChange = 5.2;

    return {
      totalOrders,
      pendingShipments,
      availableStock,
      totalOrdersChange,
      pendingShipmentsChange,
      availableStockChange,
      totalVanStock,
      vanStockChange
    };
  }, [orders, products, vanStock]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon="ShoppingCart"
          percentage={stats.totalOrdersChange} 
          trend="up"
          gradient={true}
          description="Orders vs last month"
        />
        <KpiCard 
          title="Pending Shipments" 
          value={stats.pendingShipments} 
          icon="PackageSearch"
          percentage={stats.pendingShipmentsChange} 
          trend="down"
          description="Orders vs last month"
        />
        <KpiCard 
          title="Available Stock" 
          value={stats.availableStock} 
          icon="Archive"
          percentage={stats.availableStockChange} 
          trend="down"
          description="Orders vs last month"
        />
        <KpiCard
          title="Total Items in Van"
          value={stats.totalVanStock}
          icon="Truck"
          percentage={stats.vanStockChange}
          trend={stats.vanStockChange >= 0 ? "up" : "down"}
          description="Current items in van"
        />
      </div>
      
      {/* Main Layout Grid: Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sales by Month */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sales by Month</h3>
            <button className="text-sm text-gray-500">This year <Icon name="ChevronDown" className="inline w-4 h-4" /></button>
          </div>
          <div className="h-80">
            {Bar ? (
              <Bar options={barChartOptions} data={barChartData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
            )}
          </div>
        </div>
        
        {/* Right Column: Categories and Recent Orders */}
        <div className="flex flex-col space-y-4">
          <ProductCategories />
          <RecentOrders orders={orders} />
          <LowStockItems products={products} />
        </div>
      </div>
    </div>
  );
}

function OrderListPage({ orders, setOrders, user, setPage }) {
  const [filter, setFilter] = useState('All');
  
  const userOrders = useMemo(() => {
    return orders.filter(order => {
      if (user.role === 'Picker') {
        return order.assignedTo === user.id;
      }
      return true; // Manager sees all
    });
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return userOrders;
    return userOrders.filter(o => o.status === filter);
  }, [userOrders, filter]);

  const assignOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(o => 
        o.id === orderId ? { ...o, assignedTo: 'picker1', status: 'Assigned' } : o
      )
    );
    // In real app, this would be a selection of pickers
    // showNotification('Order assigned to Alex Johnson');
  };

  const acceptOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: 'Assigned' } : o
      )
    );
  };

  const filters = ['All', 'Pending', 'Assigned', 'Packed', 'Stock Shortage', 'Out for Delivery', 'Delivered'];

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.assignedTo ? users[order.assignedTo]?.name : 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user.role === 'Manager' && order.status === 'Pending' && (
                      <button onClick={() => assignOrder(order.id)} className="text-blue-600 hover:text-blue-900">Assign</button>
                    )}
                    {user.role === 'Picker' && order.status === 'Assigned' && !order.items.some(item => item.scanned) && (
                       <button onClick={() => setPage(['orderDetail', order.id])} className="text-green-600 hover:text-green-900">Start Picking</button>
                    )}
                     {order.status !== 'Pending' && !(user.role === 'Picker' && order.status === 'Assigned') && (
                      <button onClick={() => setPage(['orderDetail', order.id])} className="text-blue-600 hover:text-blue-900">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrderDetailPage({ orderId, orders, setOrders, user, setPage, triggerErpSync }) {
  const [order, setOrder] = useState(null);
  const [scannedItems, setScannedItems] = useState({});
  const [showBiometric, setShowBiometric] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showAssignDelivery, setShowAssignDelivery] = useState(false);
  const [warehouseAccessed, setWarehouseAccessed] = useState(false);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      // Initialize scannedItems state from order
      const initialScans = {};
      foundOrder.items.forEach(item => {
        initialScans[item.productId] = item.scanned || 0;
      });
      setScannedItems(initialScans);
    }
  }, [orderId, orders]);

  const handleScan = (productId) => {
    if (!warehouseAccessed) {
      alert("Please access the warehouse using biometric authentication first.");
      return;
    }
    setShowScanner(true);
    // Simulate scan
    setTimeout(() => {
      setScannedItems(prev => {
        const newCount = (prev[productId] || 0) + 1;
        const item = order.items.find(i => i.productId === productId);
        if (newCount > item.quantity) {
          alert("Scanned more items than required!");
          return prev;
        }
        
        // Update order state as well
        setOrders(prevOrders => prevOrders.map(o => 
          o.id === orderId ? {
            ...o,
            items: o.items.map(i => 
              i.productId === productId ? { ...i, scanned: newCount } : i
            )
          } : o
        ));
        
        setShowScanner(false);
        return { ...prev, [productId]: newCount };
      });
    }, 1000);
  };

  const handleBiometric = () => {
    setShowBiometric(true);
    // Simulate biometric scan
    setTimeout(() => {
      setWarehouseAccessed(true);
      setShowBiometric(false);
    }, 1500);
  };

  const handleMarkAsPacked = () => {
    triggerErpSync(true);
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: 'Packed' } : o
      )
    );
    setPage(['orders']);
    triggerErpSync(false);
  };
  
  const handleReportShortage = (productId) => {
    triggerErpSync(true);
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: 'Stock Shortage' } : o
      )
    );
    // In a real app, notify manager
    alert("Stock shortage reported to Order Manager.");
    setPage(['orders']);
    triggerErpSync(false);
  };

  const handleAssignDelivery = () => {
    triggerErpSync(true);
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: 'Out for Delivery', deliveryPerson: 'delivery2' } : o
      )
    );
    setShowAssignDelivery(false);
    triggerErpSync(false);
  };

  if (!order) return <div>Loading...</div>;

  const allItemsScanned = order.items.every(item => scannedItems[item.productId] === item.quantity);
  const canPick = user.role === 'Picker' && order.status === 'Assigned';

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={() => setPage(['orders'])} className="flex items-center text-sm text-blue-600 hover:underline">
        <Icon name="ChevronLeft" className="w-4 h-4 mr-1" />
        Back to Orders
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Order #{order.id}</h2>
          <p className="text-gray-600">Customer: {order.customer}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Status:</span>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Action Buttons */}
      {canPick && !warehouseAccessed && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <Icon name="Fingerprint" className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-bold text-blue-800">Warehouse Access Required</h3>
              <p className="text-sm text-blue-700">Please use biometric authentication to access the warehouse before picking.</p>
              <button
                onClick={handleBiometric}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
              >
                Authenticate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scanned</th>
                {canPick && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map(item => {
                const scanned = scannedItems[item.productId] || 0;
                const isComplete = scanned === item.quantity;
                return (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{initialProducts.find(p => p.id === item.productId)?.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${isComplete ? 'text-green-600' : 'text-gray-900'}`}>
                      {scanned}
                    </td>
                    {canPick && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleScan(item.productId)}
                          disabled={isComplete || !warehouseAccessed}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs shadow-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                        >
                          <Icon name="ScanLine" className="w-4 h-4 mr-1" />
                          Scan
                        </button>
                        <button
                          onClick={() => handleReportShortage(item.productId)}
                          disabled={!warehouseAccessed}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs shadow-sm hover:bg-red-700 disabled:bg-gray-300"
                        >
                          <Icon name="AlertCircle" className="w-4 h-4 mr-1" />
                          Shortage
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="flex justify-end space-x-4">
        {user.role === 'Picker' && order.status === 'Assigned' && (
          <button
            onClick={handleMarkAsPacked}
            disabled={!allItemsScanned}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <Icon name="Package" className="w-5 h-5 mr-2" />
            Mark as Packed
          </button>
        )}
        {user.role === 'Manager' && order.status === 'Packed' && (
          <button
            onClick={() => setShowAssignDelivery(true)}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg shadow-sm hover:bg-cyan-700 flex items-center"
          >
            <Icon name="Truck" className="w-5 h-5 mr-2" />
            Assign for Delivery
          </button>
        )}
      </div>

      {/* Modals */}
      {showBiometric && (
        <Modal title="Biometric Scan" onClose={() => setShowBiometric(false)}>
          <div className="flex flex-col items-center justify-center p-6">
            <Icon name="Fingerprint" className="w-24 h-24 text-blue-600 animate-pulse" />
            <p className="mt-4 text-lg font-medium text-gray-700">Place your finger on the scanner...</p>
            <p className="text-sm text-gray-500">Authenticating warehouse access.</p>
          </div>
        </Modal>
      )}
      {showScanner && (
        <Modal title="Scanning Item" onClose={() => setShowScanner(false)}>
          <div className="flex flex-col items-center justify-center p-6">
            <Icon name="ScanLine" className="w-24 h-24 text-blue-600 animate-pulse" />
            <p className="mt-4 text-lg font-medium text-gray-700">Scanning barcode...</p>
          </div>
        </Modal>
      )}
      {showAssignDelivery && (
        <Modal title="Assign Delivery" onClose={() => setShowAssignDelivery(false)}>
          <div className="p-4 space-y-4">
            <p className="text-gray-700">Select an available delivery person:</p>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="delivery1">John Doe (3 deliveries)</option>
              <option value="delivery2">Jane Smith (1 delivery)</option>
              <option value="delivery3">Mike Brown (Available)</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAssignDelivery(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDelivery}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

function InventoryPage({ products, setProducts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Inventory</h2>
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {/* Inventory List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Van Stock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.vanStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReceiveStockPage({ pos, setPos, products, setProducts, triggerErpSync }) {
  const [selectedPo, setSelectedPo] = useState(null);
  
  const handleReceive = (poId, items) => {
    triggerErpSync(true);
    // Update PO status
    setPos(prevPos => prevPos.map(po => 
      po.id === poId ? { ...po, status: 'Received' } : po
    ));
    
    // Update product stock
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      items.forEach(item => {
        const productIndex = newProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
          newProducts[productIndex].stock += item.quantity;
        }
      });
      return newProducts;
    });

    setSelectedPo(null);
    triggerErpSync(false);
  };

  const pendingPOs = pos.filter(po => po.status === 'Pending');

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Receive Stock from Vendor</h2>
      <p className="text-gray-600">Select a Purchase Order (PO) to receive items.</p>

      {/* PO List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingPOs.map(po => (
                <tr key={po.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{po.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{po.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => setSelectedPo(po)} className="text-blue-600 hover:text-blue-900">Receive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingPOs.length === 0 && (
            <p className="p-4 text-center text-gray-500">No pending purchase orders.</p>
          )}
        </div>
      </div>

      {/* Receive Modal */}
      {selectedPo && (
        <Modal title={`Receive PO: ${selectedPo.id}`} onClose={() => setSelectedPo(null)}>
          <div className="p-4 space-y-4">
            <p className="font-medium text-gray-800">Vendor: {selectedPo.vendor}</p>
            <p className="text-sm font-medium text-gray-700">Items to Receive:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {selectedPo.items.map(item => (
                <li key={item.productId}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">Verify items and update system as "Received". This will add quantities against the PO and sync with ERP.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedPo(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReceive(selectedPo.id, selectedPo.items)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Received
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function VanTransferPage({ products, setProducts, triggerErpSync, setTransferLog, user }) {
  const [transferList, setTransferList] = useState([{ productId: 1, quantity: 1 }]);
  const [returnList, setReturnList] = useState([{ productId: 1, quantity: 1 }]);

  // --- Transfer List Functions ---
  const handleTransferItemChange = (index, field, value) => {
    const newList = [...transferList];
    newList[index][field] = field === 'quantity' ? parseInt(value, 10) || 0 : parseInt(value, 10);
    setTransferList(newList);
  };

  const addTransferItem = () => {
    setTransferList([...transferList, { productId: 1, quantity: 1 }]);
  };

  const removeTransferItem = (index) => {
    const newList = transferList.filter((_, i) => i !== index);
    setTransferList(newList);
  };
  
  // --- Return List Functions ---
  const handleReturnItemChange = (index, field, value) => {
    const newList = [...returnList];
    newList[index][field] = field === 'quantity' ? parseInt(value, 10) || 0 : parseInt(value, 10);
    setReturnList(newList);
  };

  const addReturnItem = () => {
    setReturnList([...returnList, { productId: 1, quantity: 1 }]);
  };

  const removeReturnItem = (index) => {
    const newList = returnList.filter((_, i) => i !== index);
    setReturnList(newList);
  };

  // --- Logic Functions ---
  const handleTransferToVan = () => {
    triggerErpSync(true);
    let allValid = true;
    
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      for (const item of transferList) {
        const productIndex = newProducts.findIndex(p => p.id === item.productId);
        if (productIndex === -1 || newProducts[productIndex].stock < item.quantity) {
          allValid = false;
          alert(`Not enough stock for ${newProducts[productIndex]?.name || 'unknown item'}. Available: ${newProducts[productIndex]?.stock || 0}`);
          break;
        }
      }
      
      if (!allValid) return prevProducts; // Abort update

      // All valid, proceed with transfer
      transferList.forEach(item => {
        const productIndex = newProducts.findIndex(p => p.id === item.productId);
        newProducts[productIndex].stock -= item.quantity;
        newProducts[productIndex].vanStock += item.quantity;
      });
      return newProducts;
    });

    if (allValid) {
      // Add to log
      const logEntry = {
        id: `T-${String(Date.now()).slice(-4)}`,
        type: 'transfer',
        date: new Date().toLocaleString(),
        user: user.name,
        items: transferList.map(item => ({
          name: products.find(p => p.id === item.productId).name,
          quantity: item.quantity
        }))
      };
      setTransferLog(prevLog => [logEntry, ...prevLog]);
      
      alert("Stock successfully transferred to van.");
      setTransferList([{ productId: 1, quantity: 1 }]);
    }
    triggerErpSync(false);
  };
  
  const handleReturnToWarehouse = () => {
    triggerErpSync(true);
    let allValid = true;

    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      for (const item of returnList) {
        const productIndex = newProducts.findIndex(p => p.id === item.productId);
        if (productIndex === -1 || newProducts[productIndex].vanStock < item.quantity) {
          allValid = false;
          alert(`Not enough van stock for ${newProducts[productIndex]?.name || 'unknown item'} to return. Available: ${newProducts[productIndex]?.vanStock || 0}`);
          break;
        }
      }

      if (!allValid) return prevProducts; // Abort update

      // All valid, proceed with return
      returnList.forEach(item => {
        const productIndex = newProducts.findIndex(p => p.id === item.productId);
        newProducts[productIndex].stock += item.quantity;
        newProducts[productIndex].vanStock -= item.quantity;
      });
      return newProducts;
    });

    if (allValid) {
      // Add to log
      const logEntry = {
        id: `R-${String(Date.now()).slice(-4)}`,
        type: 'return',
        date: new Date().toLocaleString(),
        user: user.name,
        items: returnList.map(item => ({
          name: products.find(p => p.id === item.productId).name,
          quantity: item.quantity
        }))
      };
      setTransferLog(prevLog => [logEntry, ...prevLog]);

      alert("Stock successfully returned to warehouse.");
      setReturnList([{ productId: 1, quantity: 1 }]);
    }
    triggerErpSync(false);
  };

  const renderItemList = (list, onChange, onRemove, onAdd) => (
    <div className="space-y-2">
      {list.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <select
            value={item.productId}
            onChange={(e) => onChange(index, 'productId', e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onChange(index, 'quantity', e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-lg"
            placeholder="Qty"
          />
          <button
            onClick={() => onRemove(index)}
            className="p-2 text-red-500 hover:text-red-700"
            disabled={list.length <= 1}
          >
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="text-sm text-blue-600 hover:underline"
      >
        + Add another item
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Van Sale & Stock Transfer</h2>
      
      {/* Transfer to Van */}
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer to Van</h3>
        <div className="space-y-4">
          {renderItemList(transferList, handleTransferItemChange, removeTransferItem, addTransferItem)}
          <button
            onClick={handleTransferToVan}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 flex items-center justify-center"
          >
            <Icon name="Truck" className="w-5 h-5 mr-2" />
            Transfer to Van
          </button>
        </div>
      </div>
      
      {/* Return from Van */}
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Return from Van</h3>
        <div className="space-y-4">
          {renderItemList(returnList, handleReturnItemChange, removeReturnItem, addReturnItem)}
          <button
            onClick={handleReturnToWarehouse}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 flex items-center justify-center"
          >
            <Icon name="Warehouse" className="w-5 h-5 mr-2" />
            Return to Warehouse
          </button>
        </div>
      </div>
    </div>
  );
}

function VanTransferReportPage({ transferLog }) {
  const [filter, setFilter] = useState('all');
  
  const filteredLog = transferLog.filter(entry => filter === 'all' || entry.type === filter);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Van Transfer Report</h2>
      
      <div className="flex space-x-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'}`}>All</button>
        <button onClick={() => setFilter('transfer')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'transfer' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'}`}>Transfers</button>
        <button onClick={() => setFilter('return')} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'return' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'}`}>Returns</button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLog.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${entry.type === 'transfer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {entry.type === 'transfer' ? 'To Van' : 'From Van'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{entry.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.items.map((item, i) => `${item.name} (Qty: ${item.quantity})`).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ user }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={user.name} disabled className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" value={user.role} disabled className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input type="text" value={user.id} disabled className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Push Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Device Settings */}
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Connected Devices</h3>
         <div className="space-y-2">
            <p className="text-sm text-gray-600">Barcode Scanner: <span className="font-medium text-green-600">Connected (Model: ZB-100A)</span></p>
            <p className="text-sm text-gray-600">Biometric Scanner: <span className="font-medium text-green-600">Connected (Model: FS-80H)</span></p>
         </div>
      </div>
    </div>
  );
}

function HelpPage() {
  const faqs = [
    { q: "How do I scan an item?", a: "Navigate to the order details page. After authenticating warehouse access, press the 'Scan' button for the item you are picking. The app will simulate a scan. Repeat for every unit required." },
    { q: "What happens if I report a shortage?", a: "Reporting a shortage will immediately update the order status to 'Stock Shortage' and send a notification to the Order Manager. This allows them to contact the customer and adjust the order." },
    { q: "How do I return items from the van?", a: "Go to the 'Van Transfer' page. Use the 'Return from Van' module. Add the products and quantities you are returning from the van to the warehouse, then press 'Return to Warehouse'." },
    { q: "Who assigns orders to me?", a: "The Order Manager assigns pending orders to available pickers. You will see assigned orders appear on your 'Orders' page." }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Help & Support</h2>
      
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-700">{faq.q}</h4>
              <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Support</h3>
        <p className="text-sm text-gray-600">If you are experiencing a critical issue, please contact your shift manager or IT support at <span className="font-medium text-blue-600">support@abrecowarehouse.com</span>.</p>
      </div>
    </div>
  );
}


function LoginPage({ setUser, setPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const simulateLogin = (role) => {
    const user = role === 'Picker' ? users.picker1 : users.manager1;
    setUser(user);
    setPage(['dashboard']);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-blue-500 text-white p-12 flex-col justify-between">
        <div>
          <div className="mb-12">
            <Icon name="PackageOpen" className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Abreco Warehouse Portal</h1>
          <p className="text-xl text-red-100">
            Manage your products, orders, and logistics all in one place.
          </p>
        </div>
        <div className="text-sm text-red-200">
          © 2025 Abreco. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Warehouse Portal Login</h2>
            <p className="text-gray-600 mb-8 text-center">Welcome back. Please log in.</p>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="iam">
                  I am a...
                </label>
                <div className="relative">
                  <select
                    id="iam"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option>Picker</option>
                    <option>Manager</option>
                  </select>
                  <Icon name="User" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username or Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="picker@abrecowarehouse.com"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Icon name="User" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Icon name="Fingerprint" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                onClick={() => simulateLogin('Picker')} // Default to Picker for the main button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                Log In
              </button>
            </form>
            
            <div className="mt-8">
              <p className="text-center text-gray-600 text-sm mb-4">FOR DEMO: SIMULATE LOGIN AS...</p>
              <div className="space-y-3">
                <button
                  onClick={() => simulateLogin('Picker')}
                  className="w-full text-center py-3 px-4 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200"
                >
                  Login as Picker
                </button>
                <button
                  onClick={() => simulateLogin('Manager')}
                  className="w-full text-center py-3 px-4 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200"
                >
                  Login as Manager
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg z-50">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, user, setUser, isMobileOpen, setMobileOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: "BarChart2", roles: ['Picker', 'Manager'] },
    { id: 'orders', label: 'Orders', icon: "ClipboardList", roles: ['Picker', 'Manager'] },
    { id: 'inventory', label: 'Inventory', icon: "Boxes", roles: ['Picker', 'Manager'] },
    { id: 'receiveStock', label: 'Receive Stock', icon: "HardDriveUpload", roles: ['Picker', 'Manager'] },
    { id: 'vanTransfer', label: 'Van Transfer', icon: "ArrowRightLeft", roles: ['Picker', 'Manager'] },
    { id: 'vanTransferReport', label: 'Transfer Report', icon: "FileText", roles: ['Manager'] },
  ];
  
  const tools = [
    { id: 'settings', label: 'Settings', icon: "Settings", roles: ['Picker', 'Manager'] },
    { id: 'help', label: 'Help', icon: "HelpCircle", roles: ['Picker', 'Manager'] },
  ];

  const NavLink = ({ item }) => {
    if (!item.roles.includes(user.role)) return null;
    const isActive = page[0] === item.id;
    return (
      <button
        onClick={() => {
          setPage([item.id]);
          setMobileOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 rounded-lg ${
          isActive
            ? 'bg-red-50 text-red-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon name={item.icon} className="w-5 h-5 mr-3" />
        <span className="font-medium text-sm">{item.label}</span>
      </button>
    );
  };
  
  const handleLogout = () => {
    setUser(null);
    setPage(['login']);
  };

  return (
    <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-2xl font-bold text-red-600">Abreco</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h3>
            {menuItems.map(item => <NavLink key={item.id} item={item} />)}
          </div>
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</h3>
            {tools.map(item => <NavLink key={item.id} item={item} />)}
          </div>
        </nav>
        
        {/* Footer/Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Icon name="LogOut" className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ user, setMobileOpen, isSyncing }) {
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-4 lg:px-8">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden p-2 text-gray-600"
      >
        <Icon name="Menu" className="w-6 h-6" />
      </button>
      
      {/* ERP Status (Moved to left for mobile) */}
      <div className="flex items-center">
         <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            isSyncing
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-xs font-medium">{isSyncing ? 'Syncing...' : 'ERP Synced'}</span>
          </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Icon name="Search" className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Icon name="Bell" className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-semibold text-sm">
            {getInitials(user.name)}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(['login']); // ['dashboard'], ['orders'], ['orderDetail', 1001]
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // App Data State
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [pos, setPos] = useState(initialPOs);
  const [vanStock, setVanStock] = useState({}); // This is now derived from products
  const [transferLog, setTransferLog] = useState(initialTransferLog);

  // Derived van stock for dashboard
  useEffect(() => {
    const newVanStock = {};
    products.forEach(p => {
      newVanStock[p.id] = p.vanStock;
    });
    setVanStock(newVanStock);
  }, [products]);

  // ERP Sync Simulation
  const triggerErpSync = (start) => {
    if (start) {
      setIsSyncing(true);
    } else {
      setTimeout(() => {
        setIsSyncing(false);
      }, 1000); // Simulate sync time
    }
  };

  const renderPage = () => {
    const pageId = page[0];
    switch (pageId) {
      case 'dashboard':
        return <DashboardPage orders={orders} products={products} vanStock={vanStock} userRole={user.role} />;
      case 'orders':
        return <OrderListPage orders={orders} setOrders={setOrders} user={user} setPage={setPage} />;
      case 'orderDetail':
        const orderId = page[1];
        return <OrderDetailPage orderId={orderId} orders={orders} setOrders={setOrders} user={user} setPage={setPage} triggerErpSync={triggerErpSync} />;
      case 'inventory':
        return <InventoryPage products={products} setProducts={setProducts} />;
      case 'receiveStock':
        return <ReceiveStockPage pos={pos} setPos={setPos} products={products} setProducts={setProducts} triggerErpSync={triggerErpSync} />;
      case 'vanTransfer':
        return <VanTransferPage products={products} setProducts={setProducts} triggerErpSync={triggerErpSync} setTransferLog={setTransferLog} user={user} />;
      case 'vanTransferReport':
        return <VanTransferReportPage transferLog={transferLog} />;
      case 'settings':
        return <SettingsPage user={user} />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardPage orders={orders} products={products} vanStock={vanStock} userRole={user.role} />;
    }
  };

  if (!user) {
    return <LoginPage setUser={setUser} setPage={setPage} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile background overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <Sidebar 
        page={page} 
        setPage={setPage} 
        user={user} 
        setUser={setUser} 
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          setMobileOpen={setMobileOpen} 
          isSyncing={isSyncing} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}