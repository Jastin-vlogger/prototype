"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// --- External Script Loaders ---
// These functions load the chart.js library from a CDN.
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
};

const loadChartJs = async () => {
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
  } catch (error) {
    console.error(error);
  }
};

// --- Icon Component ---
// Replaces the icon library with inline SVGs to fix preview issues.
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    LayoutDashboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
    Package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    List: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
    History: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M12 8v4l2 2"/></svg>,
    HelpCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    LogOut: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    ShoppingCart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    PackageSearch: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>,
    Archive: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>,
    Truck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>,
    ChevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>,
    ChevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    Minus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/></svg>,
    Warehouse: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3 6.5l8-4.2a2 2 0 0 1 2 0l8 4.2a2 2 0 0 1 1 1.85Z"/><path d="M22 22V11l-10-5-10 5v11"/><path d="M16 19h-4v-6h4v6Z"/><path d="M12 19v-6"/><path d="M12 8L2 13"/><path d="M22 13L12 8"/></svg>,
    Fingerprint: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 12a2 2 0 0 1 2 2c0 1.02.1 2.51.26 4"/><path d="M14 10a2 2 0 0 0-2-2"/><path d="M12 14a2 2 0 0 1 2-2"/><path d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10c0 4.8-3.2 8.8-7.5 9.8"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .13-4.2-.23-6.15"/><path d="M16 4.13c1.8.63 3.3 1.9 4.3 3.6"/><path d="M4.1 16c-.2-2-.13-4.2.23-6.15"/><path d="M8 4.13c-1.8.63-3.3 1.9-4.3 3.6"/><path d="M7 18a2 2 0 0 0-2-2"/><path d="M17 18a2 2 0 0 1 2-2"/></svg>,
    HardDriveUpload: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 16v-7m3 3-3-3-3 3"/><rect width="20" height="8" x="2" y="4" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="m2 16 2.1 3.5c.2.4.6.5 1 .5h13.8c.4 0 .8-.2 1-.5L22 16"/></svg>,
    ArrowRightLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>,
    ScanLine: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>,
    Check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>,
    AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
    UserCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>,
    Bell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
    Smartphone: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
    Filter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  };
  return icons[name] || <svg className={className} />;
};

// --- Initial Dummy Data ---

const initialProducts = [
  { id: 'p1', name: 'Wireless Mouse', sku: 'WM-1001', stock: 120, vanStock: 5 },
  { id: 'p2', name: '4K Monitor', sku: '4K-2002', stock: 45, vanStock: 2 },
  { id: 'p3', name: 'Mechanical Keyboard', sku: 'MK-3003', stock: 75, vanStock: 3 },
  { id: 'p4', name: 'USB-C Hub', sku: 'HUB-4004', stock: 200, vanStock: 10 },
  { id: 'p5', name: 'Noise-Cancelling Headphones', sku: 'NCH-5005', stock: 8, vanStock: 1 },
  { id: 'p6', name: 'Webcam 1080p', sku: 'WC-6006', stock: 60, vanStock: 0 },
];

const initialOrders = [
  {
    id: '#1201',
    customer: 'Tech Solutions Ltd.',
    picker: 'Alex',
    status: 'Assigned',
    items: [
      { id: 'p1', qty: 2 },
      { id: 'p3', qty: 1 },
    ],
  },
  {
    id: '#1202',
    customer: 'Creative Minds Inc.',
    picker: 'Alex',
    status: 'Assigned',
    items: [
      { id: 'p2', qty: 1 },
      { id: 'p4', qty: 3 },
      { id: 'p5', qty: 1 },
    ],
  },
  {
    id: '#1203',
    customer: 'Global Enterprises',
    picker: 'Maria',
    status: 'Assigned',
    items: [{ id: 'p6', qty: 5 }],
  },
  {
    id: '#1204',
    customer: 'Innovate Co.',
    picker: null,
    status: 'New',
    items: [{ id: 'p1', qty: 10 }],
  },
  {
    id: '#1205',
    customer: 'Data Corp',
    picker: 'Alex',
    status: 'Stock Shortage',
    items: [{ id: 'p5', qty: 10 }],
  },
  {
    id: '#1206',
    customer: 'Future Gadgets',
    picker: 'Maria',
    status: 'Packed',
    items: [{ id: 'p3', qty: 2 }],
  },
  {
    id: '#1207',
    customer: 'NextGen Systems',
    picker: 'Alex',
    status: 'Out for Delivery',
    items: [{ id: 'p4', qty: 1 }],
  },
];

const initialPOs = [
  {
    id: 'PO-001',
    vendor: 'Supplier A',
    status: 'Pending',
    items: [
      { id: 'p1', qty: 50 },
      { id: 'p3', qty: 25 },
    ],
  },
  {
    id: 'PO-002',
    vendor: 'Supplier B',
    status: 'Pending',
    items: [{ id: 'p5', qty: 20 }],
  },
];

const initialTransferReport = [
  { id: 'T-001', type: 'Transfer', product: 'Wireless Mouse', qty: 5, date: '2025-10-30T10:30:00Z', user: 'Alex' },
  { id: 'T-002', type: 'Transfer', product: '4K Monitor', qty: 2, date: '2025-10-30T10:31:00Z', user: 'Alex' },
  { id: 'T-003', type: 'Return', product: 'Wireless Mouse', qty: 1, date: '2025-10-30T18:05:00Z', user: 'Alex' },
];

// --- Helper Functions ---

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const getProductDetails = (products, item) => {
  const product = products.find(p => p.id === item.id);
  return product ? { name: product.name, sku: product.sku, stock: product.stock } : {};
};

const getStatusColor = (status) => {
  switch (status) {
    case 'New':
      return 'bg-gray-200 text-gray-700';
    case 'Assigned':
      return 'bg-blue-100 text-blue-700';
    case 'Stock Shortage':
      return 'bg-red-100 text-red-700';
    case 'Packed':
      return 'bg-yellow-100 text-yellow-700';
    case 'Out for Delivery':
      return 'bg-indigo-100 text-indigo-700';
    case 'Delivered':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

const getReportTypeColor = (type) => {
  switch (type) {
    case 'Transfer':
      return 'bg-blue-100 text-blue-700';
    case 'Return':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

// --- Main App Component ---
export default function App() {
  // --- State ---
  const [user, setUser] = useState(null); // { name: 'Alex', role: 'Picker' }
  const [page, setPage] = useState('login'); // login, dashboard, orders, orderDetail, inventory, receive, van, report, settings, help
  const [activeOrder, setActiveOrder] = useState(null);
  const [erpStatus, setErpStatus] = useState('Synced'); // Synced, Syncing, Error
  const [notification, setNotification] = useState(null); // { type, message }
  const [isChartJsLoaded, setIsChartJsLoaded] = useState(false);

  // Data State
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [purchaseOrders, setPurchaseOrders] = useState(initialPOs);
  const [transferReport, setTransferReport] = useState(initialTransferReport);

  // --- Effects ---
  // Load Chart.js on mount
  useEffect(() => {
    loadChartJs().then(() => {
      setIsChartJsLoaded(true);
    });
  }, []);

  // ERP Sync Simulation
  const simulateErpSync = (action) => {
    setErpStatus('Syncing');
    action();
    setTimeout(() => {
      setErpStatus('Synced');
    }, 1000); // 1 second sync delay
  };

  // Notification Timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // --- Page Navigation ---
  const navigateTo = (targetPage, orderId = null) => {
    if (orderId) {
      const order = orders.find(o => o.id === orderId);
      setActiveOrder(order);
    }
    setPage(targetPage);
  };

  // --- Event Handlers ---
  const handleLogin = (role) => {
    setUser({ name: role === 'Picker' ? 'Alex (Picker)' : 'Maria (Manager)', role });
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  // --- Render Logic ---
  const renderPage = () => {
    if (page === 'login') {
      return <LoginPage onLogin={handleLogin} />;
    }

    // All pages below are part of the main app shell
    return (
      <div className="flex flex-col h-screen font-inter">
        {/* Header */}
        <Header user={user} erpStatus={erpStatus} onBack={page !== 'dashboard' ? () => navigateTo('dashboard') : null} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 pb-20">
          <div className="p-4 max-w-4xl mx-auto">
            {notification && <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
            
            {page === 'dashboard' && <DashboardPage stats={getStats()} isChartJsLoaded={isChartJsLoaded} orders={orders} products={products} />}
            {page === 'orders' && <OrderListPage orders={orders} setOrders={setOrders} user={user} navigateTo={navigateTo} />}
            {page ==='orderDetail' && activeOrder && <OrderDetailPage order={activeOrder} products={products} user={user} setOrders={setOrders} setProducts={setProducts} setPage={setPage} setErpStatus={simulateErpSync} setTransferReport={setTransferReport} />}
            {page === 'inventory' && <InventoryPage products={products} />}
            {page === 'receive' && <ReceiveStockPage purchaseOrders={purchaseOrders} setPurchaseOrders={setPurchaseOrders} products={products} setProducts={setProducts} setErpStatus={simulateErpSync} setNotification={setNotification} />}
            {page === 'van' && <VanTransferPage products={products} setProducts={setProducts} setErpStatus={simulateErpSync} setNotification={setNotification} user={user} setTransferReport={setTransferReport} />}
            {page === 'report' && <TransferReportPage report={transferReport} />}
            {page === 'profile' && <ProfilePage user={user} onLogout={handleLogout} navigateTo={navigateTo} />}
            {page === 'settings' && <SettingsPage />}
            {page === 'help' && <HelpPage />}
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activePage={page} navigateTo={setPage} user={user} />
      </div>
    );
  };

  // --- Data Calculations ---
  const getStats = () => {
    const totalVanStock = products.reduce((acc, p) => acc + p.vanStock, 0);
    return {
      totalOrders: orders.length,
      totalOrdersChange: 15.8,
      pendingShipments: orders.filter(o => o.status === 'Packed').length,
      pendingShipmentsChange: -9,
      availableStock: products.reduce((acc, p) => acc + p.stock, 0),
      availableStockChange: -8,
      totalVanStock: totalVanStock,
      vanStockChange: 2.5,
    };
  };

  return <div className="h-screen bg-gray-100">{renderPage()}</div>;
}

// --- Page Components ---

function LoginPage({ onLogin }) {
  const [loginRole, setLoginRole] = useState('Picker');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginRole);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center justify-center p-4">
      <Icon name="Warehouse" className="w-20 h-20 text-red-600 mb-8" />
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Portal Login</h3>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="role">
                I am a...
              </label>
              <select
                id="role"
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                style={{ appearance: 'none', background: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2720%27%20height%3D%2720%27%20fill%3D%27none%27%20stroke%3D%27currentColor%27%20stroke-width%3D%272%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20class%3D%27feather%20feather-chevron-down%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27%2F%3E%3C%2Fsvg%3E") no-repeat right 1rem center / 1em', paddingRight: '2.5rem' }}
              >
                <option value="Picker">Picker</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="username">
                Username or Email
              </label>
              <input
                type="email"
                id="username"
                placeholder="vendor@company.com"
                defaultValue="picker@abreco.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="········"
                defaultValue="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="language">
                Preferred Language
              </label>
              <select
                id="language"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                style={{ appearance: 'none', background: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2720%27%20height%3D%2720%27%20fill%3D%27none%27%20stroke%3D%27currentColor%27%20stroke-width%3D%272%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20class%3D%27feather%20feather-chevron-down%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27%2F%3E%3C%2Fsvg%3E") no-repeat right 1rem center / 1em', paddingRight: '2.5rem' }}
                defaultValue="English"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

function Header({ user, erpStatus, onBack }) {
  const erpColor = erpStatus === 'Synced' ? 'text-green-500' : erpStatus === 'Syncing' ? 'text-yellow-500' : 'text-red-500';

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        {onBack ? (
          <button onClick={onBack} className="text-gray-600">
            <Icon name="ChevronLeft" className="w-7 h-7" />
          </button>
        ) : (
          <h1 className="text-xl font-bold text-red-600">Abreco</h1>
        )}
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-800">{user.name}</span>
        <div className="flex items-center space-x-1">
          <span className={classNames("w-2 h-2 rounded-full", erpStatus === 'Synced' ? 'bg-green-500' : erpStatus === 'Syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500')}></span>
          <span className={classNames("text-xs font-medium", erpColor)}>
            ERP: {erpStatus}
          </span>
        </div>
      </div>
      <div>
        {/* Placeholder for notifications icon or similar */}
        <div className="w-7 h-7"></div>
      </div>
    </header>
  );
}

function BottomNav({ activePage, navigateTo, user }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', roles: ['Picker', 'Manager'] },
    { id: 'orders', label: 'Orders', icon: 'Package', roles: ['Picker', 'Manager'] },
    { id: 'inventory', label: 'Inventory', icon: 'List', roles: ['Picker', 'Manager'] },
    { id: 'van', label: 'Van Transfer', icon: 'ArrowRightLeft', roles: ['Picker', 'Manager'] },
    { id: 'profile', label: 'Profile', icon: 'User', roles: ['Picker', 'Manager'] },
  ];

  const userNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner flex justify-around z-10">
      {userNavItems.map(item => (
        <button
          key={item.id}
          onClick={() => navigateTo(item.id)}
          className={classNames(
            "flex flex-col items-center justify-center p-3 text-sm font-medium",
            activePage === item.id ? 'text-blue-600' : 'text-gray-500'
          )}
        >
          <Icon name={item.icon} className="w-6 h-6 mb-1" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function DashboardPage({ stats, isChartJsLoaded, orders, products }) {
  const salesChartRef = useRef(null);
  const catChartRef = useRef(null);
  const salesChartInstance = useRef(null);
  const catChartInstance = useRef(null);

  // --- Sales Chart ---
  useEffect(() => {
    if (isChartJsLoaded && salesChartRef.current && window.Chart) {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
      const ctx = salesChartRef.current.getContext('2d');
      salesChartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Seen product',
              data: [500, 450, 600, 550, 650, 600, 700],
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
              borderRadius: 4,
            },
            {
              label: 'Sales',
              data: [400, 400, 550, 500, 600, 550, 650],
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 1,
              borderRadius: 4,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { position: 'top', align: 'start' }
          }
        }
      });
    }
    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
        salesChartInstance.current = null;
      }
    };
  }, [isChartJsLoaded]);

  // --- Categories Chart ---
  useEffect(() => {
    if (isChartJsLoaded && catChartRef.current && window.Chart) {
      if (catChartInstance.current) {
        catChartInstance.current.destroy();
      }
      const ctx = catChartRef.current.getContext('2d');
      catChartInstance.current = new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Clothing', 'Home Goods'],
          datasets: [{
            data: [5700, 1900, 2500],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: false }
          },
          cutout: '70%'
        }
      });
    }
    return () => {
      if (catChartInstance.current) {
        catChartInstance.current.destroy();
        catChartInstance.current = null;
      }
    };
  }, [isChartJsLoaded]);


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      
      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sales by Month</h3>
            <button className="text-sm text-gray-500">This year <Icon name="ChevronDown" className="inline w-4 h-4" /></button>
          </div>
          <div className="h-80">
            {isChartJsLoaded ? (
              <canvas ref={salesChartRef}></canvas>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h3>
          <div className="h-80 relative">
            {isChartJsLoaded ? (
              <canvas ref={catChartRef}></canvas>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
            )}
          </div>
        </div>

        <RecentOrders orders={orders} />
        <LowStockItems products={products} />
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, percentage, trend, description, gradient = false }) {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? '▲' : '▼';

  return (
    <div className={classNames(
      "p-5 rounded-lg shadow-sm relative overflow-hidden",
      gradient ? "bg-gradient-to-br from-red-500 to-blue-600 text-white" : "bg-white text-gray-800"
    )}>
      <div className="flex justify-between items-start">
        <div className={classNames(
          "p-3 rounded-full",
          gradient ? "bg-white bg-opacity-20" : "bg-gray-100"
        )}>
          <Icon name={icon} className={classNames("w-6 h-6", gradient ? "text-white" : "text-blue-600")} />
        </div>
        <div className={classNames(
          "flex items-center text-sm font-semibold",
          gradient ? "text-white" : trendColor
        )}>
          <span>{trendIcon}</span>
          <span>{percentage}%</span>
        </div>
      </div>
      <div className="mt-4">
        <p className={classNames("text-sm", gradient ? "text-gray-200" : "text-gray-500")}>{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className={classNames("text-xs mt-1", gradient ? "text-gray-200" : "text-gray-500")}>{description}</p>
      </div>
    </div>
  );
}

function RecentOrders({ orders }) {
  const recentOrders = orders.slice(0, 5);
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{order.id}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <span className={classNames("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(order.status))}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LowStockItems({ products }) {
  const lowStock = products.filter(p => p.stock < 10).slice(0, 5);
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Low Stock Items</h3>
      <div className="space-y-4">
        {lowStock.length === 0 && <p className="text-sm text-gray-500">No items are low on stock.</p>}
        {lowStock.map(product => (
          <div key={product.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">{product.sku}</p>
            </div>
            <span className="text-lg font-bold text-red-500">{product.stock}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderListPage({ orders, setOrders, user, navigateTo }) {
  const [showAssignModal, setShowAssignModal] = useState(null);

  const filteredOrders = useMemo(() => {
    if (user.role === 'Manager') {
      return orders;
    }
    return orders.filter(o => o.picker === user.name.split(' ')[0] || o.status === 'New');
  }, [orders, user.role, user.name]);

  const handleAssign = (orderId, pickerName) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: 'Assigned', picker: pickerName } : o
      )
    );
    setShowAssignModal(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
      {filteredOrders.map(order => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <button onClick={() => navigateTo('orderDetail', order.id)} className="text-lg font-semibold text-blue-600 hover:underline">{order.id}</button>
              <span className={classNames("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(order.status))}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
            <p className="text-sm text-gray-500">
              Picker: <span className="font-medium text-gray-700">{order.picker || 'Unassigned'}</span>
            </p>
          </div>
          {user.role === 'Manager' && order.status === 'New' && (
            <div className="bg-gray-50 p-4 border-t">
              <button 
                onClick={() => setShowAssignModal(order.id)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Assign to Picker
              </button>
            </div>
          )}
          {user.role === 'Picker' && order.status === 'Assigned' && (
            <div className="bg-gray-50 p-4 border-t">
              <button 
                onClick={() => navigateTo('orderDetail', order.id)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Start Picking
              </button>
            </div>
          )}
        </div>
      ))}
      
      {showAssignModal && (
        <Modal title="Assign Picker" onClose={() => setShowAssignModal(null)}>
          <div className="space-y-3">
            <p>Assign order <span className="font-bold">{showAssignModal}</span> to:</p>
            <button 
              onClick={() => handleAssign(showAssignModal, 'Alex')}
              className="w-full bg-blue-100 text-blue-700 p-3 rounded-lg"
            >
              Alex (Picker)
            </button>
            <button 
              onClick={() => handleAssign(showAssignModal, 'Maria')}
              className="w-full bg-blue-100 text-blue-700 p-3 rounded-lg"
            >
              Maria (Picker)
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function OrderDetailPage({ order, products, user, setOrders, setProducts, setPage, setErpStatus, setTransferReport }) {
  const [scannedItems, setScannedItems] = useState({});
  const [showScan, setShowScan] = useState(null);
  const [warehouseAccessed, setWarehouseAccessed] = useState(false);
  const [showAssignDelivery, setShowAssignDelivery] = useState(false);

  const orderItems = order.items.map(item => ({
    ...item,
    ...getProductDetails(products, item),
    scanned: scannedItems[item.id] || 0,
  }));

  const allItemsScanned = orderItems.every(item => item.scanned === item.qty);

  const handleBiometricAuth = () => {
    // Simplified: automatically grant access
    setWarehouseAccessed(true);
  };
  
  const handleScan = (itemId) => {
    setShowScan(null);
    setScannedItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };
  
  const updateOrderStatus = (newStatus) => {
    setErpStatus(() => {
      setOrders(prevOrders =>
        prevOrders.map(o => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
      // If packed, reduce stock
      if (newStatus === 'Packed') {
        setProducts(prevProducts =>
          prevProducts.map(p => {
            const itemInOrder = order.items.find(item => item.id === p.id);
            if (itemInOrder) {
              return { ...p, stock: p.stock - itemInOrder.qty };
            }
            return p;
          })
        );
      }
    });
    setPage('orders');
  };
  
  const handleAssignDelivery = () => {
    updateOrderStatus('Out for Delivery');
    setShowAssignDelivery(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">{order.id}</h2>
          <span className={classNames("px-2 py-1 text-sm font-medium rounded-full", getStatusColor(order.status))}>
            {order.status}
          </span>
        </div>
        <p className="text-lg text-gray-600">{order.customer}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Items to Pick</h3>
        
        {!warehouseAccessed && order.status === 'Assigned' && (
          <button
            onClick={handleBiometricAuth}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="Fingerprint" />
            <span>Access Warehouse (Biometric)</span>
          </button>
        )}

        {warehouseAccessed && (
          <div className="space-y-3">
            {orderItems.map(item => (
              <div key={item.id} className="border p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Qty: {item.qty}</p>
                    <p className={classNames(
                      "text-sm font-medium",
                      item.scanned === item.qty ? 'text-green-600' : 'text-gray-500'
                    )}>
                      Scanned: {item.scanned}
                    </p>
                  </div>
                </div>
                {item.scanned < item.qty && (
                  <button 
                    onClick={() => setShowScan(item)}
                    className="w-full mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-2"
                  >
                    <Icon name="ScanLine" className="w-5 h-5" />
                    <span>Scan Item</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {warehouseAccessed && order.status === 'Assigned' && (
        <div className="bg-white rounded-lg shadow-sm p-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => updateOrderStatus('Stock Shortage')}
            className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="AlertCircle" />
            <span>Report Shortage</span>
          </button>
          <button
            onClick={() => updateOrderStatus('Packed')}
            disabled={!allItemsScanned}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Icon name="Check" />
            <span>Mark as Packed</span>
          </button>
        </div>
      )}
      
      {user.role === 'Manager' && order.status === 'Packed' && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <button
            onClick={() => setShowAssignDelivery(true)}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="UserCheck" />
            <span>Assign to Delivery</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showScan && (
        <Modal title={`Scan ${showScan.name}`} onClose={() => setShowScan(null)}>
          <div className="text-center">
            <Icon name="ScanLine" className="w-24 h-24 text-gray-400 mx-auto animate-pulse" />
            <p className="text-lg text-gray-600 my-4">Simulating barcode scan...</p>
            <button
              onClick={() => handleScan(showScan.id)}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium"
            >
              Confirm Scan
            </button>
          </div>
        </Modal>
      )}
      
      {showAssignDelivery && (
        <Modal title="Assign Delivery" onClose={() => setShowAssignDelivery(false)}>
          <div className="space-y-3">
            <p>Assign order <span className="font-bold">{order.id}</span> to delivery person:</p>
            <button 
              onClick={handleAssignDelivery}
              className="w-full bg-indigo-100 text-indigo-700 p-3 rounded-lg"
            >
              David (Delivery)
            </button>
            <button 
              onClick={handleAssignDelivery}
              className="w-full bg-indigo-100 text-indigo-700 p-3 rounded-lg"
            >
              Sarah (Delivery)
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function InventoryPage({ products }) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Inventory</h2>
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{product.stock}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
            <div className="text-right pl-4 border-l ml-4">
              <p className="text-2xl font-bold text-blue-600">{product.vanStock}</p>
              <p className="text-sm text-gray-500">In Van</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReceiveStockPage({ purchaseOrders, setPurchaseOrders, products, setProducts, setErpStatus, setNotification }) {
  const [selectedPO, setSelectedPO] = useState(null);

  const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending');

  const handleReceive = (po) => {
    setErpStatus(() => {
      // Update PO status
      setPurchaseOrders(prevPOs =>
        prevPOs.map(p => (p.id === po.id ? { ...p, status: 'Received' } : p))
      );
      
      // Update product stock
      setProducts(prevProducts =>
        prevProducts.map(prod => {
          const itemInPO = po.items.find(item => item.id === prod.id);
          if (itemInPO) {
            return { ...prod, stock: prod.stock + itemInPO.qty };
          }
          return prod;
        })
      );
    });
    
    setNotification({ type: 'success', message: `Stock from ${po.id} received and synced.` });
    setSelectedPO(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Receive Stock</h2>
      
      {pendingPOs.map(po => (
        <div key={po.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg text-gray-800">{po.id}</p>
              <p className="text-sm text-gray-500">Vendor: {po.vendor}</p>
            </div>
            <button
              onClick={() => setSelectedPO(po)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Receive
            </button>
          </div>
        </div>
      ))}
      
      {pendingPOs.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-gray-500">No pending purchase orders.</p>
        </div>
      )}
      
      {selectedPO && (
        <Modal title={`Receive ${selectedPO.id}`} onClose={() => setSelectedPO(null)}>
          <div className="space-y-3">
            <p className="font-medium">Verify items from {selectedPO.vendor}:</p>
            <ul className="list-disc list-inside bg-gray-50 p-3 rounded-lg">
              {selectedPO.items.map(item => {
                const product = getProductDetails(products, item);
                return <li key={item.id}>{product.name} (Qty: {item.qty})</li>;
              })}
            </ul>
            <button
              onClick={() => handleReceive(selectedPO)}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium"
            >
              Confirm & Update Stock
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function VanTransferPage({ products, setProducts, setErpStatus, setNotification, user, setTransferReport }) {
  const [transferList, setTransferList] = useState([]);
  const [returnList, setReturnList] = useState([]);

  const findProduct = (id) => products.find(p => p.id === id);

  const addToList = (listType, productId) => {
    if (!productId) return;
    const list = listType === 'transfer' ? transferList : returnList;
    const setList = listType === 'transfer' ? setTransferList : setReturnList;
    
    if (list.find(item => item.id === productId)) return; // Avoid duplicates
    
    setList(prev => [...prev, { ...findProduct(productId), qty: 1 }]);
  };
  
  const updateQty = (listType, productId, newQty) => {
    const list = listType === 'transfer' ? transferList : returnList;
    const setList = listType === 'transfer' ? setTransferList : setReturnList;
    const product = findProduct(productId);
    
    let qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 1) qty = 1;

    if (listType === 'transfer' && qty > product.stock) qty = product.stock;
    if (listType === 'return' && qty > product.vanStock) qty = product.vanStock;
    
    setList(prev => prev.map(item => (item.id === productId ? { ...item, qty } : item)));
  };

  const removeFromList = (listType, productId) => {
    const setList = listType === 'transfer' ? setTransferList : setReturnList;
    setList(prev => prev.filter(item => item.id !== productId));
  };

  const executeTransfer = (listType) => {
    const list = listType === 'transfer' ? transferList : returnList;
    const setList = listType === 'transfer' ? setTransferList : setReturnList;
    const type = listType === 'transfer' ? 'Transfer' : 'Return';

    setErpStatus(() => {
      setProducts(prevProducts =>
        prevProducts.map(p => {
          const itemInList = list.find(item => item.id === p.id);
          if (!itemInList) return p;
          
          if (listType === 'transfer') {
            return { ...p, stock: p.stock - itemInList.qty, vanStock: p.vanStock + itemInList.qty };
          } else {
            return { ...p, stock: p.stock + itemInList.qty, vanStock: p.vanStock - itemInList.qty };
          }
        })
      );
      
      // Update transfer report
      const newReportEntries = list.map(item => ({
        id: `T-${Date.now()}-${item.id}`,
        type: type,
        product: item.name,
        qty: item.qty,
        date: new Date().toISOString(),
        user: user.name.split(' ')[0],
      }));
      setTransferReport(prev => [...prev, ...newReportEntries]);
    });
    
    setNotification({ type: 'success', message: `${type} complete and synced.` });
    setList([]);
  };

  const renderProductSelector = (listType, list) => {
    const availableProducts = products.filter(p => 
      !list.find(item => item.id === p.id) &&
      (listType === 'transfer' ? p.stock > 0 : p.vanStock > 0)
    );
    
    return (
      <select 
        onChange={(e) => addToList(listType, e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white"
        value=""
      >
        <option value="">-- Add a product --</option>
        {availableProducts.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} (In Stock: {p.stock} | In Van: {p.vanStock})
          </option>
        ))}
      </select>
    );
  };
  
  const renderList = (listType, list) => (
    <div className="space-y-3">
      {list.map(item => (
        <div key={item.id} className="flex items-center space-x-2">
          <button onClick={() => removeFromList(listType, item.id)} className="text-red-500">
            <Icon name="X" className="w-5 h-5" />
          </button>
          <span className="flex-1 text-gray-700">{item.name}</span>
          <input
            type="number"
            value={item.qty}
            onChange={(e) => updateQty(listType, item.id, e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-lg text-center"
            min="1"
            max={listType === 'transfer' ? item.stock : item.vanStock}
          />
        </div>
      ))}
      {renderProductSelector(listType, list)}
      <button
        onClick={() => executeTransfer(listType)}
        disabled={list.length === 0}
        className={classNames(
          "w-full text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50",
          listType === 'transfer' ? "bg-blue-600" : "bg-green-600"
        )}
      >
        {listType === 'transfer' ? 'Transfer to Van' : 'Return to Warehouse'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Van Stock Transfer</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Transfer to Van</h3>
        {renderList('transfer', transferList)}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Return from Van</h3>
        {renderList('return', returnList)}
      </div>
    </div>
  );
}

function ProfilePage({ user, onLogout, navigateTo }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center pt-8">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
          {user.name[0]}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.name}</h2>
        <p className="text-lg text-gray-500">{user.role}</p>
      </div>
      
      <div className="space-y-2">
        <ProfileButton icon="Settings" label="Settings" onClick={() => navigateTo('settings')} />
        <ProfileButton icon="History" label="Transfer Report" onClick={() => navigateTo('report')} />
        <ProfileButton icon="HelpCircle" label="Help & Support" onClick={() => navigateTo('help')} />
      </div>
      
      <div className="pt-4">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <Icon name="LogOut" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function ProfileButton({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-3">
        <Icon name={icon} className="w-6 h-6 text-blue-600" />
        <span className="text-lg font-medium text-gray-700">{label}</span>
      </div>
      <Icon name="ChevronRight" className="w-6 h-6 text-gray-400" />
    </button>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> Alex (Picker)</p>
          <p><strong>Email:</strong> picker@abreco.com</p>
          <p><strong>Role:</strong> Picker</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
        <div className="space-y-3">
          <Switch label="New Order Assigned" enabled={true} />
          <Switch label="Stock Shortage Alerts" enabled={true} />
          <Switch label="Delivery Updates" enabled={false} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Connected Devices</h3>
        <div className="space-y-2">
          <DeviceStatus icon="Smartphone" name="Mobile App" status="Connected" />
          <DeviceStatus icon="ScanLine" name="Barcode Scanner" status="Connected" />
        </div>
      </div>
    </div>
  );
}

function Switch({ label, enabled }) {
  const [isOn, setIsOn] = useState(enabled);
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={classNames(
          "w-12 h-6 rounded-full p-1 flex items-center transition-colors",
          isOn ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
        )}
      >
        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
      </button>
    </div>
  );
}

function DeviceStatus({ icon, name, status }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Icon name={icon} className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">{name}</span>
      </div>
      <span className="text-green-600 font-medium">{status}</span>
    </div>
  );
}

function HelpPage() {
  const faqData = [
    { q: "How do I start picking an order?", a: "Go to the 'Orders' tab, find an order with 'Assigned' status, and tap it. Then tap 'Access Warehouse' to begin." },
    { q: "What happens if an item is out of stock?", a: "After accessing the warehouse, tap the 'Report Shortage' button. This will change the order status and notify your manager." },
    { q: "How do I scan an item?", a: "On the order details page, tap the 'Scan Item' button for the product you are picking. A scanner simulation will appear." },
    { q: "Why can't I mark an order as 'Packed'?", a: "You must scan all items in the order first. The 'Mark as Packed' button will become active once all items are scanned." },
    { q: "What is 'Van Transfer'?", a: "This page allows you to move stock from the main warehouse to your van, or return unsold stock from your van to the warehouse. This keeps the ERP system's stock levels accurate." },
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Help & Support</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-semibold text-gray-800">{faq.q}</p>
              <p className="text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Support</h3>
        <p className="text-gray-600">Still need help? Contact your manager or email <a href="mailto:support@abreco.com" className="text-blue-600">support@abreco.com</a>.</p>
      </div>
    </div>
  );
}

function TransferReportPage({ report }) {
  const [filter, setFilter] = useState('All');
  
  const filteredReport = useMemo(() => {
    if (filter === 'All') return report;
    return report.filter(item => item.type === filter);
  }, [report, filter]);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Transfer Report</h2>
      
      <div className="flex items-center space-x-2">
        <Icon name="Filter" className="w-5 h-5 text-gray-500" />
        <select onChange={(e) => setFilter(e.target.value)} className="p-2 border border-gray-300 rounded-lg bg-white">
          <option value="All">All Types</option>
          <option value="Transfer">Transfers</option>
          <option value="Return">Returns</option>
        </select>
      </div>
      
      <div className="space-y-3">
        {filteredReport.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg text-gray-800">{item.product}</p>
                <p className="text-sm text-gray-500">Qty: <span className="font-bold">{item.qty}</span></p>
                <p className="text-sm text-gray-500">By: {item.user}</p>
              </div>
              <div className="text-right">
                <span className={classNames("px-2 py-1 text-xs font-medium rounded-full", getReportTypeColor(item.type))}>
                  {item.type}
                </span>
                <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- Utility Components ---

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function Notification({ type, message, onClose }) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={classNames("p-4 rounded-lg text-white flex justify-between items-center mb-4", bgColor)}>
      <p>{message}</p>
      <button onClick={onClose} className="text-white opacity-80 hover:opacity-100">
        <Icon name="X" className="w-5 h-5" />
      </button>
    </div>
  );
}