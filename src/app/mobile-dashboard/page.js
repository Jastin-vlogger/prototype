"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Truck, User, Bell, Package, FileText, QrCode, Phone, 
  ShieldCheck, MapPin, CheckCircle, XCircle, Clock, ArrowLeft, Plus, 
  ScanLine, LogOut, Settings, Star, HelpCircle, 
  AlertTriangle, ChevronRight, Inbox, RefreshCw, Send,
  Briefcase, History, MessageSquare, Moon, ToggleLeft, ToggleRight, Mail,
  Camera, CheckSquare, List
} from 'lucide-react';

// --- Mock Data (with Product Details) ---

const MOCK_ORDERS = [
  {
    id: 'ORD1001',
    status: 'new', // 'new', 'accepted', 'picked-up', 'out-for-delivery', 'verified', 'delivered', 'failed'
    customerName: 'Alice Smith',
    address: '123 Main St, Anytown, USA 12345',
    packageWeight: '2.5 kg',
    specialInstructions: 'Leave at front door. Beware of dog.',
    otp: '1234',
    timestamp: new Date().setMinutes(new Date().getMinutes() - 15),
    products: [
      { id: 'P01', name: 'Premium VR Headset', qty: 1 },
      { id: 'P02', name: 'Extra Controller (Left)', qty: 1 },
    ]
  },
  {
    id: 'ORD1002',
    status: 'accepted',
    customerName: 'Bob Johnson',
    address: '456 Oak Ave, Somecity, USA 54321',
    packageWeight: '0.8 kg',
    specialInstructions: 'Call upon arrival.',
    otp: '5678',
    timestamp: new Date().setHours(new Date().getHours() - 1),
    products: [
      { id: 'P03', name: 'Smart Watch Series 8', qty: 1 },
    ]
  },
  {
    id: 'ORD1003',
    status: 'out-for-delivery',
    customerName: 'Charlie Brown',
    address: '789 Pine Ln, Otherville, USA 67890',
    packageWeight: '5.1 kg',
    specialInstructions: 'Fragile, handle with care.',
    otp: '9876',
    timestamp: new Date().setHours(new Date().getHours() - 2),
    products: [
      { id: 'P04', name: 'Large Glass Vase', qty: 1 },
      { id: 'P05', name: 'Decorative Stones (Set of 20)', qty: 2 },
    ]
  },
  {
    id: 'ORD1004',
    status: 'delivered',
    customerName: 'David Lee',
    address: '101 Maple Dr, Everytown, USA 10112',
    packageWeight: '1.2 kg',
    specialInstructions: '',
    otp: '1122',
    timestamp: new Date().setDate(new Date().getDate() - 1),
    products: [
      { id: 'P06', name: 'Wireless Earbuds', qty: 1 },
    ]
  },
  {
    id: 'ORD1005',
    status: 'failed',
    customerName: 'Eva Green',
    address: '202 Birch Rd, Lastplace, USA 22334',
    packageWeight: '3.0 kg',
    specialInstructions: 'Customer not available. Rescheduled for tomorrow.',
    otp: '3344',
    timestamp: new Date().setDate(new Date().getDate() - 2),
    products: [
      { id: 'P07', name: 'Yoga Mat (Red)', qty: 1 },
      { id: 'P08', name: 'Water Bottle', qty: 1 },
    ]
  },
  {
    id: 'ORD1006',
    status: 'new',
    customerName: 'Frank White',
    address: '303 Cedar Pl, Newville, USA 44556',
    packageWeight: '0.5 kg',
    specialInstructions: 'Apartment #3B. Use buzzer.',
    otp: '4567',
    timestamp: new Date().setMinutes(new Date().getMinutes() - 5),
    products: [
      { id: 'P09', name: 'Coffee Beans (1kg)', qty: 1 },
    ]
  },
  {
    id: 'ORD1007',
    status: 'picked-up',
    customerName: 'Grace Kim',
    address: '404 Elm St, Metrotown, USA 77889',
    packageWeight: '1.8 kg',
    specialInstructions: 'Business address, deliver to reception.',
    otp: '7890',
    timestamp: new Date().setHours(new Date().getHours() - 3),
    products: [
      { id: 'P10', name: 'Office Chair (Black)', qty: 1 },
    ]
  },
  {
    id: 'ORD1008',
    status: 'delivered',
    customerName: 'Henry Chen',
    address: '505 Spruce Way, Suburbia, USA 99001',
    packageWeight: '10.2 kg',
    specialInstructions: 'Heavy package. Handle with care.',
    otp: '0123',
    timestamp: new Date().setDate(new Date().getDate() - 3),
    products: [
      { id: 'P11', name: 'Dumbbell Set (20kg)', qty: 1 },
    ]
  },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'New order ORD1001 assigned to you.', time: '10m ago', read: false },
  { id: 2, text: 'Route change: Heavy traffic on Main St. Rerouting...', time: '1h ago', read: false },
  { id: 3, text: 'Customer update for ORD1003: "Please ring bell twice".', time: '2h ago', read: true },
  { id: 5, text: 'New order ORD1006 assigned to you.', time: '5m ago', read: false },
  { id: 6, text: 'Reminder: Shift ends in 1 hour.', time: '7h ago', read: true },
];

const MOCK_USER = {
  name: 'Devin Patel',
  id: 'DP-052',
  vehicle: 'Blue E-Bike (Reg: EB-45-XYZ)',
  shift: 'Active (Started: 9:00 AM)',
  avatarUrl: `https://placehold.co/100x100/EBF4FF/4299E1?text=DP`
};

const MOCK_CHAT = [
  { id: 1, from: 'support', text: 'Hi Devin, how can I help you today?', time: '10:30 AM' },
  { id: 2, from: 'user', text: 'Hi, I\'m having trouble finding the address for ORD1003.', time: '10:31 AM' },
  { id: 3, from: 'support', text: 'Understood. The customer note says "789 Pine Ln, behind the main grocery store." Does that help?', time: '10:32 AM' },
  { id: 4, from: 'user', text: 'Ah, yes! Perfect. Thank you!', time: '10:32 AM' },
];

// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('login'); // 'login', 'dashboard', 'deliveries', 'history', 'profile', 'deliveryDetail', 'scan', 'onDelivery', 'notifications', 'issues', 'supportChat', 'settings'
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toast, setToast] = useState(null); // { message: '', type: 'success' | 'error' | 'info' }
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  
  const currentOrder = useMemo(() => {
    return orders.find(o => o.id === currentOrderId);
  }, [currentOrderId, orders]);

  // --- Utility Functions ---

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const updateOrderStatus = (orderId, newStatus, newInstructions = null) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              status: newStatus, 
              specialInstructions: newInstructions !== null ? newInstructions : order.specialInstructions 
            }
          : order
      )
    );
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    setPage('dashboard');
    showToast(`Welcome back, ${MOCK_USER.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  const navigate = (targetPage, orderId = null) => {
    if (orderId) {
      setCurrentOrderId(orderId);
    }
    // Don't reset order ID if just navigating between main tabs
    if (!['dashboard', 'deliveries', 'history', 'profile'].includes(targetPage)) {
      window.scrollTo(0, 0); // Scroll to top on page change
    }
    setPage(targetPage);
  };
  
  const handleAcceptDelivery = (orderId) => {
    updateOrderStatus(orderId, 'accepted');
    setNotifications([
      { id: Date.now(), text: `Order ${orderId} accepted. Proceed to pickup.`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Order Accepted!', 'success');
    navigate('deliveries');
  };
  
  const handleScanPackage = (orderId) => {
    updateOrderStatus(orderId, 'picked-up');
    setNotifications([
      { id: Date.now(), text: `Package ${orderId} picked up.`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Package Scanned & Picked Up', 'success');
    navigate('onDelivery', orderId);
  };

  const handleOutForDelivery = (orderId) => {
    updateOrderStatus(orderId, 'out-for-delivery');
    setNotifications([
      { id: Date.now(), text: `Order ${orderId} is out for delivery.`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Status: Out for Delivery', 'success');
  };

  const handleVerifyOtp = (orderId, otpInput) => {
    if (otpInput === currentOrder?.otp) {
      updateOrderStatus(orderId, 'verified');
      setNotifications([
        { id: Date.now(), text: `Order ${orderId} OTP Verified.`, time: 'Just now', read: false },
        ...notifications
      ]);
      showToast('OTP Verified! Please confirm delivery.', 'success');
      setIsOtpModalOpen(false);
    } else {
      showToast('Invalid OTP. Please try again.', 'error');
    }
  };
  
  const handleConfirmDelivery = (orderId) => {
    updateOrderStatus(orderId, 'delivered');
    setNotifications([
      { id: Date.now(), text: `Order ${orderId} successfully delivered.`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Delivery Confirmed! Invoice Synced.', 'success');
    navigate('dashboard');
  };
  
  const handleReportIssue = (orderId, reason) => {
    const instruction = `Issue Reported: ${reason}. Awaiting further action.`;
    updateOrderStatus(orderId, 'failed', instruction);
    setNotifications([
      { id: Date.now(), text: `Issue reported for ${orderId}: ${reason}`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Issue Reported Successfully', 'error');
    navigate('dashboard');
  }

  // --- Render Functions for Pages ---

  const renderPage = () => {
    if (!user) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (page) {
      case 'dashboard':
        return <DashboardScreen orders={orders} navigate={navigate} showToast={showToast} />;
      case 'deliveries':
        return <DeliveriesScreen orders={orders} navigate={navigate} />;
      case 'history':
        return <DeliveryHistoryScreen orders={orders} navigate={navigate} />;
      // 'earnings' case removed
      case 'profile':
        return <ProfileScreen user={user} onLogout={handleLogout} navigate={navigate} />;
      case 'deliveryDetail':
        return <DeliveryDetailScreen order={currentOrder} onAccept={handleAcceptDelivery} />;
      case 'scan':
        return <ScanScreen order={currentOrder} onScan={handleScanPackage} />;
      case 'onDelivery':
        return <OnDeliveryScreen 
                  order={currentOrder} 
                  onOutForDelivery={handleOutForDelivery} 
                  onOpenOtp={() => setIsOtpModalOpen(true)} 
                  onReportIssue={() => navigate('issues', currentOrder.id)}
                  onConfirmDelivery={handleConfirmDelivery}
                  showToast={showToast}
                />;
      case 'notifications':
        return <NotificationsScreen notifications={notifications} setNotifications={setNotifications} />;
      case 'issues':
        return <IssuesScreen order={currentOrder} onReport={handleReportIssue} />;
      case 'supportChat':
        return <SupportChatScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen orders={orders} navigate={navigate} showToast={showToast} />;
    }
  };
  
  const mainPages = ['dashboard', 'deliveries', 'history', 'profile']; // 'earnings' removed

  return (
    <div className="font-sans">
      {/* This container simulates the mobile phone screen */}
      <div className="relative mx-auto h-screen max-w-md flex flex-col bg-gray-50 shadow-2xl overflow-hidden">
        
        {user && (
          <Header 
            page={page} 
            navigate={navigate} 
            unreadCount={notifications.filter(n => !n.read).length}
          />
        )}
        
        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto pb-20">
          {renderPage()}
        </main>
        
        {user && mainPages.includes(page) && <BottomNavBar currentPage={page} navigate={navigate} />}

        {/* Global Modals and Toasts */}
        {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        
        {isOtpModalOpen && currentOrder && (
          <OtpModal 
            order={currentOrder}
            onClose={() => setIsOtpModalOpen(false)}
            onVerify={handleVerifyOtp}
          />
        )}
      </div>
    </div>
  );
}

// --- Screens Components ---

// --- MODIFIED LoginScreen ---
function LoginScreen({ onLogin }) {
  const commonInputStyle = "w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-red-500";
  
  return (
    <div className="flex h-full flex-col items-center justify-start bg-gray-100 p-6 pt-16">
      <Package size={64} className="mb-8 text-red-600" />
      
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Portal Login</h1>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">I am a...</label>
            {/* This select is visual only, to match the design */}
            <select 
              className={commonInputStyle + " bg-white"}
              disabled 
            >
              <option>Delivery Agent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Agent ID or Email</label>
            <input 
              type="text" 
              defaultValue="DP-052" // Using agent ID as default for demo
              className={commonInputStyle}
              placeholder="agent@company.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              defaultValue="••••••••" // Dummy password for demo
              className={commonInputStyle}
              placeholder="••••••••" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Language</label>
            {/* This select is visual only, to match the design */}
            <select 
              className={commonInputStyle + " bg-white"}
              disabled
            >
              <option>English</option>
            </select>
          </div>
          
          <button 
            onClick={onLogin}
            className="w-full rounded-lg bg-red-600 py-3 font-bold text-white shadow-md transition duration-300 hover:bg-red-700 mt-4"
          >
            Log In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          New user?{' '}
          <a href="#" className="font-semibold text-red-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

function Header({ page, navigate, unreadCount }) {
  const pageTitles = {
    'dashboard': 'Dashboard',
    'deliveries': 'Deliveries',
    'history': 'Delivery History',
    // 'earnings' removed
    'profile': 'My Profile',
    'deliveryDetail': 'Order Details',
    'scan': 'Scan Package',
    'onDelivery': 'Active Delivery',
    'notifications': 'Notifications',
    'issues': 'Report an Issue',
    'supportChat': 'Support Chat',
    'settings': 'Settings'
  };

  const title = pageTitles[page] || 'Dashboard';
  const showBack = !['dashboard', 'deliveries', 'history', 'profile'].includes(page); // 'earnings' removed
  
  const getBackTarget = () => {
    switch(page) {
      case 'deliveryDetail': return 'deliveries';
      case 'scan': return 'deliveries';
      case 'onDelivery': return 'deliveries';
      case 'issues': return 'onDelivery';
      case 'notifications': return 'dashboard';
      case 'supportChat': return 'dashboard';
      case 'settings': return 'profile';
      default: return 'dashboard';
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md">
      <div className="flex items-center">
        {showBack ? (
          <button onClick={() => navigate(getBackTarget())} className="mr-2 p-2 text-gray-600">
            <ArrowLeft size={24} />
          </button>
        ) : <div className="w-10"></div>}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <button onClick={() => navigate('notifications')} className="relative p-2 text-gray-600">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
}

function BottomNavBar({ currentPage, navigate }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Deliveries', icon: Briefcase, page: 'deliveries' },
    { name: 'History', icon: History, page: 'history' },
    // { name: 'Earnings', icon: DollarSign, page: 'earnings' }, // Removed
    { name: 'Profile', icon: User, page: 'profile' },
  ];

  return (
    <nav className="fixed bottom-0 z-40 flex h-16 w-full max-w-md items-center justify-around border-t border-gray-200 bg-white shadow-inner">
      {navItems.map(item => {
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.page)}
            className={`flex flex-col items-center justify-center p-2 transition-colors duration-200 w-full ${
              isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}

function DashboardScreen({ orders, navigate, showToast }) {
  const stats = {
    active: orders.filter(o => ['accepted', 'picked-up', 'out-for-delivery', 'verified'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'delivered' && new Date(o.timestamp).toDateString() === new Date().toDateString()).length,
    pending: orders.filter(o => o.status === 'new').length,
    failedToday: orders.filter(o => o.status === 'failed' && new Date(o.timestamp).toDateString() === new Date().toDateString()).length, // Replaced earnings
  };

  return (
    <div className="p-4 space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Active Deliveries" value={stats.active} icon={Truck} color="blue" />
        <StatCard title="Completed Today" value={stats.completed} icon={CheckCircle} color="green" />
        <StatCard title="Pending Pickups" value={stats.pending} icon={Inbox} color="yellow" />
        <StatCard title="Failed Today" value={stats.failedToday} icon={XCircle} color="red" /> {/* Replaced Earnings */}
      </div>

      {/* Quick Action Buttons */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <ActionButton 
            icon={Plus} 
            label="New Delivery" 
            onClick={() => navigate('deliveries')} 
            badge={stats.pending} 
            iconColor="text-blue-500" // Custom icon color
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100" // Custom background
            shadowColor="shadow-blue-200/50" // Custom shadow
          />
          <ActionButton 
            icon={RefreshCw} 
            label="Active" 
            onClick={() => navigate('deliveries')} 
            badge={stats.active} 
            iconColor="text-green-500"
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
            shadowColor="shadow-green-200/50"
          />
          <ActionButton 
            icon={ScanLine} 
            label="Scan QR" 
            onClick={() => navigate('scan')} 
            iconColor="text-purple-500"
            bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
            shadowColor="shadow-purple-200/50"
          />
          <ActionButton 
            icon={ShieldCheck} 
            label="Delivery OTP" 
            onClick={() => {
              navigate('deliveries');
              showToast('Please select an active delivery to enter OTP', 'info');
            }} 
            iconColor="text-orange-500"
            bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
            shadowColor="shadow-orange-200/50"
          />
          <ActionButton 
            icon={Send} 
            label="Out for Delivery" 
            onClick={() => navigate('deliveries')} 
            iconColor="text-cyan-500"
            bgColor="bg-gradient-to-br from-cyan-50 to-cyan-100"
            shadowColor="shadow-cyan-200/50"
          />
          <ActionButton 
            icon={AlertTriangle} 
            label="Report Issue" 
            onClick={() => navigate('issues')} 
            iconColor="text-red-500"
            bgColor="bg-gradient-to-br from-red-50 to-red-100"
            shadowColor="shadow-red-200/50"
          />
        </div>
      </div>
      
      {/* Pending Assignment Card */}
      {stats.pending > 0 && (
        <div 
          className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-md cursor-pointer hover:shadow-xl transition-shadow text-white"
          onClick={() => navigate('deliveries')}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">New Assignment!</h3>
              <p className="text-blue-100">You have {stats.pending} new order(s) waiting.</p>
            </div>
            <ChevronRight size={24} className="animate-pulse" />
          </div>
        </div>
      )}

      {/* Quick Access Menu */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
         <h3 className="text-lg font-semibold mb-3 text-gray-800">Menu</h3>
         <div className="space-y-1">
          <MenuItem icon={History} label="Delivery History" onClick={() => navigate('history')} />
          <MenuItem icon={AlertTriangle} label="Issues & Returns" onClick={() => navigate('issues')} />
          {/* <MenuItem icon={DollarSign} label="Earnings & Incentives" onClick={() => navigate('earnings')} /> */} {/* Removed */}
          <MenuItem icon={MessageSquare} label="Support Chat" onClick={() => navigate('supportChat')} />
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const gradients = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-500 to-indigo-600',
    red: 'from-red-500 to-red-600', // Added for Failed
  };

  return (
    <div className={`rounded-xl bg-gradient-to-br ${gradients[color]} p-4 shadow-md flex items-center space-x-3 text-white transform transition-transform hover:scale-105`}>
      <div className="rounded-full p-3 bg-white/20 text-white">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, badge, iconColor = "text-blue-600", bgColor = "bg-blue-50", shadowColor = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center space-y-1 rounded-lg ${bgColor} p-3 text-gray-700 shadow-md ${shadowColor} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
    >
      {badge > 0 && (
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm">
          {badge}
        </span>
      )}
      <Icon size={28} className={`${iconColor}`} /> {/* Increased icon size */}
      <span className="text-xs font-semibold">{label}</span> {/* Slightly bolder label */}
    </button>
  );
}

function MenuItem({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-lg p-3 text-gray-700 hover:bg-blue-50">
      <div className="flex items-center space-x-3">
        <Icon size={20} className="text-blue-600" />
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </button>
  );
}

function DeliveriesScreen({ orders, navigate }) {
  const [tab, setTab] = useState('new'); // 'new' or 'active'
  
  const newOrders = orders.filter(o => o.status === 'new');
  const activeOrders = orders.filter(o => ['accepted', 'picked-up', 'out-for-delivery', 'verified'].includes(o.status));

  const getAction = (order) => {
    switch (order.status) {
      case 'accepted':
        return { page: 'scan', label: 'Scan at Warehouse' };
      case 'picked-up':
      case 'out-for-delivery':
        return { page: 'onDelivery', label: 'View Active Delivery' };
      case 'verified':
        return { page: 'onDelivery', label: 'Confirm Delivery' };
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex bg-white border-b border-gray-200 sticky top-16 z-30">
        <button 
          onClick={() => setTab('new')}
          className={`w-1/2 p-4 font-semibold ${tab === 'new' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          New Assignments ({newOrders.length})
        </button>
        <button 
          onClick={() => setTab('active')}
          className={`w-1/2 p-4 font-semibold ${tab === 'active' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Active Deliveries ({activeOrders.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 space-y-4">
        {tab === 'new' && (
          <div>
            {newOrders.length > 0 ? (
              newOrders.map(order => (
                <OrderCard key={order.id} order={order} onClick={() => navigate('deliveryDetail', order.id)} actionLabel="View Details & Accept" />
              ))
            ) : (
              <EmptyState icon={Inbox} title="No new assignments" subtitle="You're all caught up!" />
            )}
          </div>
        )}
        
        {tab === 'active' && (
          <div>
            {activeOrders.length > 0 ? (
              activeOrders.map(order => {
                const action = getAction(order);
                return (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onClick={() => navigate(action.page, order.id)} 
                    actionLabel={action.label}
                  />
                );
              })
            ) : (
              <EmptyState icon={Truck} title="No active deliveries" subtitle="Accept a new assignment to get started." />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DeliveryHistoryScreen({ orders, navigate }) {
  const completedOrders = orders.filter(o => ['delivered', 'failed'].includes(o.status));

  return (
    <div className="p-4 space-y-4">
      {completedOrders.length > 0 ? (
        completedOrders.map(order => (
          <OrderCard key={order.id} order={order} onClick={() => {}} />
        ))
      ) : (
        <EmptyState icon={History} title="No Delivery History" subtitle="Your completed deliveries will appear here." />
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="text-center text-gray-500 pt-16">
      <Icon size={48} className="mx-auto mb-4" />
      <p className="text-lg font-medium">{title}</p>
      <p>{subtitle}</p>
    </div>
  );
}

function OrderCard({ order, onClick, actionLabel }) {
  const statusInfo = {
    new: { text: 'New', color: 'bg-blue-500' },
    accepted: { text: 'Accepted', color: 'bg-purple-500' },
    'picked-up': { text: 'Picked Up', color: 'text-gray-800 bg-yellow-400' },
    'out-for-delivery': { text: 'Out for Delivery', color: 'bg-orange-500' },
    verified: { text: 'Verified (Confirm)', color: 'bg-cyan-500' },
    delivered: { text: 'Delivered', color: 'bg-green-500' },
    failed: { text: 'Failed', color: 'bg-red-600' },
  };
  
  const { text, color } = statusInfo[order.status] || { text: 'Unknown', color: 'bg-gray-500' };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-shadow hover:shadow-lg" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
        <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${color}`}>
          {text}
        </span>
      </div>
      <p className="text-gray-700 font-medium mb-1">{order.customerName}</p>
      <div className="flex items-start text-sm text-gray-600 mb-3">
        <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
        <span>{order.address}</span>
      </div>
      {actionLabel && (
        <button className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function DeliveryDetailScreen({ order, onAccept }) {
  if (!order) return <EmptyState icon={FileText} title="Order not found" subtitle="Please go back and select an order." />;

  return (
    <div className="p-4 space-y-4">
      {/* Order Info Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.id}</h2>
        <InfoRow icon={User} label="Customer" value={order.customerName} />
        <InfoRow icon={MapPin} label="Address" value={order.address} />
        <InfoRow icon={Package} label="Package Weight" value={order.packageWeight} />
        <InfoRow icon={FileText} label="Instructions" value={order.specialInstructions || 'None'} />
      </div>
      
      {/* Product Details Card */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Details</h3>
        <div className="space-y-2">
          {order.products.map(product => (
            <div key={product.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">{product.name}</span>
              <span className="font-bold text-gray-800">Qty: {product.qty}</span>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => onAccept(order.id)}
        className="w-full rounded-lg bg-green-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-green-700"
      >
        Accept Delivery
      </button>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
      <Icon size={18} className="mr-3 mt-1 text-blue-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-md font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ScanScreen({ order, onScan }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Scan Package for Order:</h2>
      <p className="text-2xl font-bold text-blue-600 mb-6">{order ? order.id : 'N/A'}</p>
      
      <div className="relative mx-auto w-64 h-64 rounded-lg bg-gray-800 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Simulated Scanner Line */}
        <div className="absolute w-full h-1 bg-red-500 shadow-lg animate-scan"></div>
        <QrCode size={150} className="text-gray-600" />
      </div>
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite alternate;
        }
      `}</style>
      
      <p className="text-gray-600 my-6">Align the order QR code with the scanner.</p>
      
      <button 
        onClick={() => onScan(order.id)}
        disabled={!order}
        className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-blue-700 disabled:opacity-50"
      >
        <ScanLine size={20} className="inline mr-2" />
        Simulate Package Scan
      </button>
    </div>
  );
}

function OnDeliveryScreen({ order, onOutForDelivery, onOpenOtp, onReportIssue, onConfirmDelivery, showToast }) {
  if (!order) return <EmptyState icon={Truck} title="No active delivery" subtitle="Please select an active delivery to view." />;
  
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="p-0">
      {/* Map Placeholder */}
      <div className="relative h-64 w-full bg-gray-300 flex items-center justify-center text-gray-500">
        [Image of a city map with route]
        <p className="font-semibold">Map Navigation Placeholder</p>
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
          <MapPin size={20} className="text-blue-600" />
        </button>
      </div>
      
      {/* Delivery Info */}
      <div className="p-4 space-y-4 bg-white rounded-t-2xl -mt-4 relative shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.id}</h2>
        <InfoRow icon={User} label="Customer" value={order.customerName} />
        <InfoRow icon={MapPin} label="Deliver To" value={order.address} />
        <InfoRow icon={FileText} label="Instructions" value={order.specialInstructions || 'None'} />

        {/* Product Details Collapsible */}
        <div className="rounded-lg border border-gray-200">
          <button 
            onClick={() => setShowProducts(!showProducts)}
            className="flex justify-between items-center w-full p-3 font-semibold text-gray-700"
          >
            <div className="flex items-center space-x-2">
              <List size={18} className="text-blue-600" />
              <span>Show Product Details</span>
            </div>
            <ChevronRight size={20} className={`transition-transform ${showProducts ? 'rotate-90' : ''}`} />
          </button>
          {showProducts && (
            <div className="p-3 border-t border-gray-200 space-y-2">
              {order.products.map(product => (
                <div key={product.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{product.name}</span>
                  <span className="font-bold text-gray-800">Qty: {product.qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          
          {order.status === 'picked-up' && (
            <button 
              onClick={() => onOutForDelivery(order.id)}
              className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-orange-600"
            >
              <Truck size={20} className="inline mr-2" />
              Mark as "Out for Delivery"
            </button>
          )}
          
          {order.status === 'out-for-delivery' && (
             <button 
              onClick={onOpenOtp}
              className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-blue-700"
            >
              <ShieldCheck size={20} className="inline mr-2" />
              Verify Customer OTP
            </button>
          )}
          
          {order.status === 'verified' && (
            <>
              <button 
                onClick={() => onConfirmDelivery(order.id)}
                className="w-full rounded-lg bg-green-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-green-700 animate-pulse"
              >
                <CheckSquare size={20} className="inline mr-2" />
                Confirm Delivery & Sync Invoice
              </button>
              <button 
                onClick={() => showToast('Proof of Delivery captured (Simulated)', 'info')}
                className="w-full rounded-lg bg-gray-700 py-3 font-semibold text-white shadow transition duration-300 hover:bg-gray-800"
              >
                <Camera size={18} className="inline mr-2" />
                Capture Proof of Delivery
              </button>
            </>
          )}

          <div className="flex space-x-3">
             <a 
              href="tel:0000000000" // Placeholder phone number
              className="w-full text-center rounded-lg bg-blue-100 py-3 font-semibold text-blue-700 shadow-sm transition duration-300 hover:bg-blue-200"
            >
              <Phone size={18} className="inline mr-2" />
              Call Customer
            </a>
             <button 
              onClick={onReportIssue}
              className="w-full rounded-lg bg-red-100 py-3 font-semibold text-red-700 shadow-sm transition duration-300 hover:bg-red-200"
            >
              <AlertTriangle size={18} className="inline mr-2" />
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen({ notifications, setNotifications }) {
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="p-0">
      {notifications.length > 0 ? (
        notifications.map(n => (
          <div 
            key={n.id} 
            onClick={() => markAsRead(n.id)}
            className={`p-4 border-b border-gray-200 ${!n.read ? 'bg-blue-50' : 'bg-white'}`}
          >
            <p className={`font-medium ${!n.read ? 'text-gray-800' : 'text-gray-600'}`}>{n.text}</p>
            <p className="text-sm text-gray-500">{n.time}</p>
          </div>
        ))
      ) : (
        <EmptyState icon={Bell} title="No new notifications" subtitle="We'll let you know when something comes up." />
      )}
    </div>
  );
}

function ProfileScreen({ user, onLogout, navigate }) {
  return (
    <div className="p-4 space-y-5">
      {/* Profile Header */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md flex items-center space-x-4">
        <img 
          src={user.avatarUrl}
          alt="Profile Avatar" 
          className="w-20 h-20 rounded-full border-4 border-blue-200"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">Agent ID: {user.id}</p>
        </div>
      </div>
      
      {/* Vehicle & Shift Info */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md space-y-3">
        <InfoRow icon={Truck} label="Vehicle" value={user.vehicle} />
        <InfoRow icon={Clock} label="Shift Status" value={user.shift} />
      </div>

      {/* Performance */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Performance</h3>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">98.5%</p>
            <p className="text-sm text-gray-500">On-Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 flex items-center justify-center">
              <Star size={20} className="mr-1 fill-current text-yellow-400" /> 4.9
            </p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
          {/* Incentives div removed */}
        </div>
      </div>
      
      {/* Menu */}
       <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
         <MenuItem icon={Settings} label="Settings" onClick={() => navigate('settings')} />
         <MenuItem icon={HelpCircle} label="Help & Support" onClick={() => navigate('supportChat')} />
       </div>
       
       <button
        onClick={onLogout}
        className="w-full rounded-lg bg-red-100 py-3 font-bold text-red-600 shadow-sm transition duration-300 hover:bg-red-200"
       >
         <LogOut size={20} className="inline mr-2" />
         Sign Out
       </button>
    </div>
  );
}

function IssuesScreen({ order, onReport }) {
  const [reason, setReason] = useState('');
  
  const issueReasons = [
    'Customer Not Available', 
    'Reschedule Delivery', 
    'Package Damaged',
    'Wrong Address',
    'Customer Refused',
    'Other'
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Report Issue for:</h2>
      <p className="text-2xl font-bold text-blue-600 mb-4">{order ? order.id : 'N/A (No order selected)'}</p>
      
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <label className="block text-sm font-medium text-gray-600 mb-2">Select Reason:</label>
        <select 
          value={reason} 
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a reason --</option>
          {issueReasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Add remarks (optional)..."
        ></textarea>
        
        <button className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-100 mt-4">
          Upload Photo (Optional)
        </button>
      </div>
      
      <button 
        onClick={() => onReport(order.id, reason)}
        disabled={!reason || !order}
        className="w-full rounded-lg bg-red-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AlertTriangle size={20} className="inline mr-2" />
        Submit Issue Report
      </button>
    </div>
  );
}

// EarningsScreen function entirely removed

function SupportChatScreen() {
  const [messages, setMessages] = useState(MOCK_CHAT);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [
      ...messages,
      { id: Date.Now(), from: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setMessages(newMessages);
    setInput('');
    
    // Simulate support reply
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { id: Date.now() + 1, from: 'support', text: 'Thank you for your message. An agent will be with you shortly.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-xl p-3 max-w-xs ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 shadow-md'}`}>
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-grow rounded-full border border-gray-300 p-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="ml-3 p-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="p-4 space-y-5">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Preferences</h3>
        <SettingToggle 
          icon={Moon} 
          label="Dark Mode" 
          enabled={darkMode} 
          onChange={() => setDarkMode(p => !p)} 
        />
        <SettingToggle 
          icon={Mail} 
          label="Email Notifications" 
          enabled={emailNotifs} 
          onChange={() => setEmailNotifs(p => !p)} 
        />
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
         <MenuItem icon={ShieldCheck} label="Account Security" onClick={() => {}} />
         <MenuItem icon={FileText} label="Privacy Policy" onClick={() => {}} />
      </div>
    </div>
  );
}

function SettingToggle({ icon: Icon, label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <Icon size={20} className="text-gray-600" />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <button onClick={onChange}>
        {enabled ? <ToggleRight size={36} className="text-blue-600" /> : <ToggleLeft size={36} className="text-gray-400" />}
      </button>
    </div>
  );
}


// --- Global Utility Components ---

function Toast({ message, type, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade out
    }, 2700);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };
  
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <AlertTriangle size={20} />
  }

  return (
    <div 
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm rounded-lg ${colors[type]} p-4 text-white shadow-2xl transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

function OtpModal({ order, onClose, onVerify }) {
  const [otpInput, setOtpInput] = useState('');

  const handleSubmit = () => {
    onVerify(order.id, otpInput);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600">
          <XCircle size={24} />
        </button>
        
        <div className="text-center">
          <ShieldCheck size={48} className="mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Delivery</h2>
          <p className="text-gray-600 mb-4">
            Ask the customer <span className="font-bold">{order.customerName}</span> for their 4-digit verification OTP.
          </p>
          
          <input
            type="tel"
            maxLength="4"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-48 mx-auto text-center text-4xl font-bold tracking-[.5em] p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="----"
          />
          
          <button 
            onClick={handleSubmit}
            disabled={otpInput.length !== 4}
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-blue-700 mt-6 disabled:opacity-50"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}