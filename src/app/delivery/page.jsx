"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Truck, User, Bell, Package, FileText, QrCode, Phone, 
  ShieldCheck, MapPin, CheckCircle, XCircle, Clock, ArrowLeft, Plus, 
  ScanLine, LogOut, Settings, Star, HelpCircle, 
  AlertTriangle, ChevronRight, Inbox, RefreshCw, Send,
  Briefcase, History, MessageSquare, Moon, ToggleLeft, ToggleRight, Mail,
  Camera, CheckSquare, List, DollarSign, FileSignature, ThumbsUp, TrendingUp,
  Trophy, Calendar, Filter, Medal, Crown, Lock, UserCheck, BarChart2, Search
} from 'lucide-react';

const AED_RATE = 3.67; // 1 USD = 3.67 AED
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  const aedAmount = amount * AED_RATE;
  return `AED ${aedAmount.toFixed(2)}`;
};

// --- Mock Data ---

const MOCK_ORDERS = [
  {
    id: 'ORD1001',
    status: 'new', 
    customerName: 'Alice Smith',
    address: '123 Main St, Anytown, USA 12345',
    packageWeight: '2.5 kg',
    specialInstructions: 'Leave at front door. Beware of dog.',
    otp: '1234',
    timestamp: new Date().setMinutes(new Date().getMinutes() - 15),
    promisedTime: new Date().setHours(new Date().getHours() + 2),
    actualDeliveryTime: null,
    products: [
      { id: 'P01', name: 'Premium VR Headset', qty: 1 },
      { id: 'P02', name: 'Extra Controller (Left)', qty: 1 },
      { id: 'P99', name: 'Lens Cleaning Kit', qty: 1 },
    ],
    paymentMethod: 'Prepaid',
    orderValue: 450.00, 
    amountToCollect: 0,
    cashCollected: null,
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
    promisedTime: new Date().setHours(new Date().getHours() + 1),
    actualDeliveryTime: null,
    products: [
      { id: 'P03', name: 'Smart Watch Series 8', qty: 1 },
      { id: 'P12', name: 'Silicone Strap (Black)', qty: 1 },
    ],
    paymentMethod: 'Cash on Delivery',
    orderValue: 149.99,
    amountToCollect: 149.99,
    cashCollected: null,
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
    promisedTime: new Date().setHours(new Date().getHours() + 3),
    actualDeliveryTime: null,
    products: [
      { id: 'P04', name: 'Large Glass Vase', qty: 1 },
      { id: 'P05', name: 'Decorative Stones (Set of 20)', qty: 2 },
    ],
    paymentMethod: 'Cash on Delivery',
    orderValue: 75.50,
    amountToCollect: 75.50,
    cashCollected: null,
  },
  {
    id: 'ORD1004',
    status: 'delivered',
    customerName: 'David Lee',
    address: '101 Maple Dr, Everytown, USA 10112',
    packageWeight: '1.2 kg',
    specialInstructions: '',
    otp: '1122',
    timestamp: new Date().setHours(new Date().getHours() - 4), 
    promisedTime: new Date().setHours(new Date().getHours() - 2),
    actualDeliveryTime: new Date().setHours(new Date().getHours() - 3),
    products: [
      { id: 'P06', name: 'Wireless Earbuds', qty: 1 },
    ],
    paymentMethod: 'Prepaid',
    orderValue: 120.00,
    amountToCollect: 0,
    cashCollected: null,
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
    promisedTime: new Date().setDate(new Date().getDate() - 2),
    actualDeliveryTime: null,
    products: [
      { id: 'P07', name: 'Yoga Mat (Red)', qty: 1 },
      { id: 'P08', name: 'Water Bottle', qty: 1 },
    ],
    paymentMethod: 'Prepaid',
    orderValue: 45.00,
    amountToCollect: 0,
    cashCollected: null,
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
    promisedTime: new Date().setHours(new Date().getHours() + 5),
    actualDeliveryTime: null,
    products: [
      { id: 'P09', name: 'Coffee Beans (1kg)', qty: 1 },
    ],
    paymentMethod: 'Cash on Delivery',
    orderValue: 22.00,
    amountToCollect: 22.00,
    cashCollected: null,
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
    promisedTime: new Date().setHours(new Date().getHours() + 4),
    actualDeliveryTime: null,
    products: [
      { id: 'P10', name: 'Office Chair (Black)', qty: 1 },
      { id: 'P20', name: 'Lumbar Support Cushion', qty: 1 },
    ],
    paymentMethod: 'Prepaid',
    orderValue: 250.00,
    amountToCollect: 0,
    cashCollected: null,
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
    promisedTime: new Date().setDate(new Date().getDate() - 3),
    actualDeliveryTime: new Date().setDate(new Date().getDate() - 3),
    products: [
      { id: 'P11', name: 'Dumbbell Set (20kg)', qty: 1 },
    ],
    paymentMethod: 'Cash on Delivery',
    orderValue: 89.99,
    amountToCollect: 89.99,
    cashCollected: 89.99,
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
  status: 'Available', 
  avatarUrl: `https://placehold.co/100x100/EBF4FF/4299E1?text=DP`
};

const MOCK_CHAT = [
  { id: 1, from: 'support', text: 'Hi Devin, how can I help you today?', time: '10:30 AM' },
  { id: 2, from: 'user', text: 'Hi, I\'m having trouble finding the address for ORD1003.', time: '10:31 AM' },
  { id: 3, from: 'support', text: 'Understood. The customer note says "789 Pine Ln, behind the main grocery store." Does that help?', time: '10:32 AM' },
  { id: 4, from: 'user', text: 'Ah, yes! Perfect. Thank you!', time: '10:32 AM' },
];

const MOCK_TEAM_PERFORMANCE = {
  myRating: 4.9, 
  teamAverageRating: 4.6,
  teamAverageDeliveries: 120, 
};

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sarah Jenkins', deliveries: 152, rating: 4.9, avatar: 'SJ' },
  { rank: 2, name: 'Mike Ross', deliveries: 148, rating: 4.8, avatar: 'MR' },
  { rank: 3, name: 'John Doe', deliveries: 135, rating: 4.7, avatar: 'JD' },
  { rank: 4, name: 'Devin Patel (You)', deliveries: 120, rating: 4.9, avatar: 'DP' },
  { rank: 5, name: 'Emily White', deliveries: 115, rating: 4.6, avatar: 'EW' },
  { rank: 6, name: 'Chris Green', deliveries: 110, rating: 4.5, avatar: 'CG' },
];

// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('login'); 
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toast, setToast] = useState(null); 
  
  const [navParams, setNavParams] = useState({}); 

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const currentOrder = useMemo(() => {
    return orders.find(o => o.id === currentOrderId);
  }, [currentOrderId, orders]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const updateOrderStatus = (orderId, newStatus, newInstructions = null) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
            const updates = {
                status: newStatus,
                specialInstructions: newInstructions !== null ? newInstructions : order.specialInstructions
            };
            if (newStatus === 'delivered' && !order.actualDeliveryTime) {
                updates.actualDeliveryTime = Date.now();
            }
            return { ...order, ...updates };
        }
        return order;
      })
    );
  };
  
  const handleStatusChange = (newStatus) => {
    setUser(prev => ({ ...prev, status: newStatus }));
    showToast(`Status updated to: ${newStatus}`, newStatus === 'Available' ? 'success' : 'info');
  };

  const handleLogin = (selectedRole) => {
    let assignedRole = selectedRole;
    if (selectedRole === 'Delivery Agent') {
      assignedRole = 'Warehouse Delivery Agent'; 
    }
    setUser({
      ...MOCK_USER,
      role: assignedRole
    });
    setPage('dashboard');
    showToast(`Welcome back, ${MOCK_USER.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  const navigate = (targetPage, orderId = null, params = {}) => {
    if (orderId) {
      setCurrentOrderId(orderId);
    }
    setNavParams(params);
    
    if (!['dashboard', 'deliveries', 'history', 'profile'].includes(targetPage)) {
      window.scrollTo(0, 0); 
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
  
  const handlePickup = (orderId) => {
    updateOrderStatus(orderId, 'picked-up');
    setNotifications([
      { id: Date.now(), text: `Package ${orderId} picked up.`, time: 'Just now', read: false },
      ...notifications
    ]);
    showToast('Package Picked Up', 'success');
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
  
  const checkPaymentAndProceed = (orderId) => {
    const orderToCheck = orders.find(o => o.id === orderId);
    if (!orderToCheck) return;

    if (orderToCheck.paymentMethod === 'Cash on Delivery') {
       setIsCashModalOpen(true);
    } else {
       finalizeDelivery(orderId);
    }
  };

  const finalizeDelivery = (orderId) => {
    updateOrderStatus(orderId, 'delivered');
    setNotifications([
      { id: Date.now(), text: `Order ${orderId} successfully delivered.`, time: 'Just now', read: false },
      ...notifications
    ]);
    setIsSuccessModalOpen(true);
  };

  const handleClientAcknowledgement = (orderId) => {
    updateOrderStatus(orderId, 'verified');
    showToast('Client Acknowledgement Received!', 'success');
    setTimeout(() => checkPaymentAndProceed(orderId), 500);
  };

  const handleVerifyOtp = (orderId, otpInput) => {
    if (otpInput === currentOrder?.otp) {
      updateOrderStatus(orderId, 'verified');
      showToast('OTP Verified!', 'success');
      setIsOtpModalOpen(false);
      setTimeout(() => checkPaymentAndProceed(orderId), 500);
    } else {
      showToast('Invalid OTP. Please try again.', 'error');
    }
  };
  
  const handleLogCash = (orderId, amount) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, cashCollected: parseFloat(amount) }
          : order
      )
    );
    setIsCashModalOpen(false);
    finalizeDelivery(orderId);
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
        return <DeliveryHistoryScreen orders={orders} navigate={navigate} initialFilter={navParams.initialFilter} />;
      case 'profile':
        return <ProfileScreen user={user} onLogout={handleLogout} navigate={navigate} orders={orders} onStatusChange={handleStatusChange} />;
      case 'deliveryDetail':
        return <DeliveryDetailScreen order={currentOrder} onAccept={handleAcceptDelivery} />;
      case 'onDelivery':
        return <OnDeliveryScreen 
                  order={currentOrder} 
                  onPickup={handlePickup}
                  onOutForDelivery={handleOutForDelivery} 
                  onOpenOtp={() => setIsOtpModalOpen(true)} 
                  onOpenCash={() => setIsCashModalOpen(true)}
                  onReportIssue={() => navigate('issues', currentOrder.id)}
                  onClientAcknowledge={handleClientAcknowledgement}
                  showToast={showToast}
                />;
      case 'receipt':
        return <ReceiptScreen order={currentOrder} navigate={navigate} />;
      case 'notifications':
        return <NotificationsScreen notifications={notifications} setNotifications={setNotifications} />;
      case 'issues':
        return <IssuesScreen order={currentOrder} onReport={handleReportIssue} />;
      case 'supportChat':
        return <SupportChatScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'cashReport':
        return <CashReportScreen orders={orders} />;
      default:
        return <DashboardScreen orders={orders} navigate={navigate} showToast={showToast} />;
    }
  };
  
  const mainPages = ['dashboard', 'deliveries', 'history', 'profile'];

  return (
    <div className="font-sans">
      <div className="relative mx-auto h-screen max-w-md flex flex-col bg-gray-50 shadow-2xl overflow-hidden">
        {user && (
          <Header 
            page={page} 
            navigate={navigate} 
            unreadCount={notifications.filter(n => !n.read).length}
          />
        )}
        <main className="flex-grow overflow-y-auto pb-20">
          {renderPage()}
        </main>
        {user && mainPages.includes(page) && <BottomNavBar currentPage={page} navigate={navigate} />}
        {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        
        {isOtpModalOpen && currentOrder && (
          <OtpModal 
            order={currentOrder}
            onClose={() => setIsOtpModalOpen(false)}
            onVerify={handleVerifyOtp}
          />
        )}
        {isCashModalOpen && currentOrder && (
          <CashModal 
            order={currentOrder}
            onClose={() => setIsCashModalOpen(false)}
            onConfirm={handleLogCash}
          />
        )}
        {isSuccessModalOpen && (
          <SuccessModal 
             onViewReceipt={() => {
               setIsSuccessModalOpen(false);
               navigate('receipt', currentOrderId);
             }}
             onReturnDashboard={() => {
               setIsSuccessModalOpen(false);
               navigate('dashboard');
             }}
          />
        )}
      </div>
    </div>
  );
}

// --- Screens Components ---

function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('Delivery Agent');

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-red-600 to-blue-700 p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-48 h-48 rounded-full bg-blue-400/20 blur-2xl"></div>
        <div className="absolute bottom-0 right-10 w-56 h-56 rounded-full bg-red-400/20 blur-3xl"></div>
      </div>

      <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg shadow-xl animate-pulse ring-4 ring-white/10">
        <Package size={48} className="text-white" />
      </div>
      
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-md p-8 shadow-2xl border border-white/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium">Log in to your delivery portal</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wide">Role</label>
             <div className="relative">
                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-4 pl-12 text-gray-700 font-medium focus:border-red-500 focus:ring-red-500 transition-shadow shadow-sm appearance-none"
                >
                  <option value="Delivery Agent">Delivery Agent</option>
                  <option value="Van Sale">Van Sale</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={16} />
             </div>
          </div>
          
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wide">Agent ID</label>
             <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  defaultValue="DP-052"
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-4 pl-12 text-gray-700 font-medium focus:border-red-500 focus:ring-red-500 transition-shadow shadow-sm placeholder:text-gray-400"
                  placeholder="agent@company.com" 
                />
             </div>
          </div>
          
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wide">Password</label>
             <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  defaultValue="••••••••"
                  className="w-full rounded-xl border-gray-200 bg-gray-50 p-4 pl-12 text-gray-700 font-medium focus:border-red-500 focus:ring-red-500 transition-shadow shadow-sm placeholder:text-gray-400"
                  placeholder="••••••••" 
                />
             </div>
          </div>
          
          <div className="text-right pt-1">
            <a href="#" className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">
              Forgot Password?
            </a>
          </div>
          
          <button 
            onClick={() => onLogin(role)}
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-blue-600 py-4 font-bold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:from-red-700 hover:to-blue-700 active:scale-95"
          >
            Log In
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-white/60 text-xs font-medium tracking-wide">
        © 2025 DELIVERY PARTNER APP v2.1
      </p>
    </div>
  );
}

function Header({ page, navigate, unreadCount }) {
  const pageTitles = {
    'dashboard': 'Dashboard',
    'deliveries': 'Deliveries',
    'history': 'Delivery History',
    'profile': 'My Profile',
    'deliveryDetail': 'Order Details',
    'onDelivery': 'Active Delivery',
    'receipt': 'Transaction Receipt',
    'notifications': 'Notifications',
    'issues': 'Report an Issue',
    'supportChat': 'Support Chat',
    'settings': 'Settings',
    'cashReport': 'Cash Report'
  };

  const title = pageTitles[page] || 'Dashboard';
  const showBack = !['dashboard', 'deliveries', 'history', 'profile'].includes(page);
  
  const getBackTarget = () => {
    switch(page) {
      case 'deliveryDetail': return 'deliveries';
      case 'onDelivery': return 'deliveries';
      case 'issues': return 'onDelivery';
      case 'receipt': return 'dashboard';
      case 'notifications': return 'dashboard';
      case 'supportChat': return 'dashboard';
      case 'settings': return 'profile';
      case 'cashReport': return 'profile';
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
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const activeOrders = orders.filter(o => ['accepted', 'picked-up', 'out-for-delivery', 'verified'].includes(o.status));
    const pendingOrders = orders.filter(o => o.status === 'new');
    const deliveredOrders = orders.filter(o => o.status === 'delivered');

    const active = activeOrders.length;
    const completedToday = deliveredOrders.filter(o => new Date(o.timestamp).toDateString() === todayStr).length;
    const pending = pendingOrders.length;
    const cashInHand = orders
      .filter(o => o.cashCollected !== null)
      .reduce((sum, o) => sum + o.cashCollected, 0);

    const todayOrders = deliveredOrders.filter(o => new Date(o.timestamp).toDateString() === todayStr);
    const todayCount = todayOrders.length;
    const todayValue = todayOrders.reduce((sum, o) => sum + (o.orderValue || 0), 0);

    const monthOrders = deliveredOrders.filter(o => {
      const d = new Date(o.timestamp);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    const monthCount = monthOrders.length;
    const monthValue = monthOrders.reduce((sum, o) => sum + (o.orderValue || 0), 0);

    const allTimeCount = deliveredOrders.length;

    return { 
      active, 
      completedToday, 
      pending, 
      cashInHand,
      todayCount, 
      todayValue, 
      monthCount, 
      monthValue, 
      allTimeCount 
    };
  }, [orders]);

  return (
    <div className="p-4 space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Active Deliveries" value={stats.active} icon={Truck} color="blue" />
        <StatCard title="Completed Today" value={stats.completedToday} icon={CheckCircle} color="green" />
        <StatCard title="Pending Pickups" value={stats.pending} icon={Inbox} color="yellow" />
        <StatCard title="Total Cash in Hand" value={formatCurrency(stats.cashInHand)} icon={DollarSign} color="purple" />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <TrendingUp size={20} className="mr-2 text-blue-600"/> Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <PerformanceMiniCard 
             label="Today's Revenue"
             value={formatCurrency(stats.todayValue)}
             subtext={`${stats.todayCount} orders`}
             icon={DollarSign}
             color="bg-gradient-to-br from-fuchsia-600 to-purple-700"
             onClick={() => navigate('history', null, { initialFilter: 'today' })}
          />
          <PerformanceMiniCard 
             label="Month's Revenue"
             value={formatCurrency(stats.monthValue)}
             subtext={`${stats.monthCount} orders`}
             icon={Calendar}
             color="bg-gradient-to-br from-cyan-500 to-blue-600"
             onClick={() => navigate('history', null, { initialFilter: 'month' })}
          />
           <PerformanceMiniCard 
             label="Total Deliveries"
             value={stats.allTimeCount}
             subtext="Lifetime"
             icon={Briefcase}
             color="bg-gradient-to-br from-emerald-500 to-teal-600"
             onClick={() => navigate('history', null, { initialFilter: 'all' })}
          />
           <PerformanceMiniCard 
             label="Global Rank"
             value="#4"
             subtext="Top 5%"
             icon={Trophy}
             color="bg-gradient-to-br from-amber-400 to-orange-500"
             onClick={() => setIsLeaderboardOpen(true)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <ActionButton 
            icon={Plus} 
            label="New Delivery" 
            onClick={() => navigate('deliveries')} 
            badge={stats.pending} 
            color="blue"
          />
          <ActionButton 
            icon={RefreshCw} 
            label="Active" 
            onClick={() => navigate('deliveries')} 
            badge={stats.active} 
            color="green"
          />
          <ActionButton 
            icon={ShieldCheck} 
            label="Delivery OTP" 
            onClick={() => {
              navigate('deliveries');
              showToast('Please select an active delivery to enter OTP', 'info');
            }} 
            color="orange"
          />
          <ActionButton 
            icon={Send} 
            label="Out for Delivery" 
            onClick={() => navigate('deliveries')} 
            color="cyan"
          />
          <ActionButton 
            icon={AlertTriangle} 
            label="Report Issue" 
            onClick={() => navigate('issues')} 
            color="red"
          />
        </div>
      </div>
      
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

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
         <h3 className="text-lg font-semibold mb-3 text-gray-800">Menu</h3>
         <div className="space-y-1">
          <MenuItem icon={History} label="Delivery History" onClick={() => navigate('history')} />
          <MenuItem icon={AlertTriangle} label="Issues & Returns" onClick={() => navigate('issues')} />
          <MenuItem icon={MessageSquare} label="Support Chat" onClick={() => navigate('supportChat')} />
         </div>
      </div>

      {isLeaderboardOpen && (
        <LeaderboardModal onClose={() => setIsLeaderboardOpen(false)} />
      )}
    </div>
  );
}

function StatCard({ title, value, subValue, icon: Icon, color }) {
  const gradients = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-500 to-indigo-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className={`rounded-xl bg-gradient-to-br ${gradients[color]} p-4 shadow-md flex items-center space-x-3 text-white transform transition-transform hover:scale-105`}>
      <div className="rounded-full p-3 bg-white/20 text-white">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-2xl font-bold leading-none">{value}</p>
        {subValue && <p className="text-xs mt-1 text-white/90 font-medium">{subValue}</p>}
      </div>
    </div>
  );
}

function PerformanceMiniCard({ label, value, subtext, color, icon: Icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-4 ${color} text-white shadow-lg ${onClick ? 'cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl' : ''}`}
    >
       <div className="relative z-10 flex flex-col h-full justify-between">
         <div className="flex items-center space-x-1 mb-2 opacity-90">
            <p className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-1">{label}</p>
         </div>
         <div>
            <p className="text-2xl font-black tracking-tight drop-shadow-sm">{value}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {subtext}
              </span>
            </div>
         </div>
       </div>
       
       {Icon && (
         <Icon 
            size={80} 
            className="absolute -bottom-4 -right-4 text-white opacity-10 transform rotate-12 pointer-events-none" 
         />
       )}
       
       <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
    </div>
  )
}

function ActionButton({ icon: Icon, label, onClick, badge, color }) {
  const styles = {
    blue: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-200/50",
    green: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-200/50",
    purple: "bg-gradient-to-br from-violet-500 to-purple-600 shadow-purple-200/50",
    orange: "bg-gradient-to-br from-orange-400 to-amber-600 shadow-orange-200/50",
    cyan: "bg-gradient-to-br from-cyan-500 to-sky-600 shadow-cyan-200/50",
    red: "bg-gradient-to-br from-rose-500 to-red-600 shadow-red-200/50",
  };

  const bgClass = styles[color] || styles.blue;

  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center rounded-2xl ${bgClass} p-3 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 border border-white/10`}
    >
      {badge > 0 && (
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-red-600 shadow-sm ring-2 ring-red-500/20">
          {badge}
        </span>
      )}
      <div className="mb-2 rounded-full bg-white/20 p-2 backdrop-blur-sm shadow-inner ring-1 ring-white/30">
        <Icon size={24} className="text-white drop-shadow-sm" />
      </div>
      <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-sm">{label}</span>
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

function LeaderboardModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-6 text-center text-white shrink-0 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full">
            <XCircle size={24} />
          </button>
          <div className="inline-block p-3 rounded-full bg-white/20 mb-2 backdrop-blur-md border border-white/30">
            <Trophy size={40} className="text-yellow-300 drop-shadow-md" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Top Performers</h2>
          <p className="text-blue-100 text-xs font-medium mt-1 opacity-80">NOVEMBER 2025 • REGIONAL</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {MOCK_LEADERBOARD.map((agent, index) => {
            const isTop1 = agent.rank === 1;
            const isTop2 = agent.rank === 2;
            const isTop3 = agent.rank === 3;
            const isMe = agent.name.includes('(You)');
            
            let cardStyles = "bg-white border-gray-100 text-gray-600";
            let rankStyles = "bg-gray-100 text-gray-500";
            let avatarStyles = "bg-gray-200 text-gray-500";
            let borderClass = "border";

            if (isTop1) {
              cardStyles = "bg-gradient-to-r from-yellow-50 to-amber-50";
              borderClass = "border-yellow-300 shadow-md shadow-yellow-100/50";
              rankStyles = "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm";
              avatarStyles = "bg-yellow-100 text-yellow-700 border-2 border-yellow-300";
            } else if (isTop2) {
              cardStyles = "bg-gradient-to-r from-slate-50 to-gray-50";
              borderClass = "border-slate-300 shadow-sm";
              rankStyles = "bg-gradient-to-br from-slate-400 to-gray-500 text-white shadow-sm";
              avatarStyles = "bg-slate-100 text-slate-700 border-2 border-slate-300";
            } else if (isTop3) {
              cardStyles = "bg-gradient-to-r from-orange-50 to-stone-50";
              borderClass = "border-orange-200 shadow-sm";
              rankStyles = "bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-sm";
              avatarStyles = "bg-orange-100 text-orange-700 border-2 border-orange-300";
            } else if (isMe) {
              cardStyles = "bg-blue-50";
              borderClass = "border-blue-200 shadow-sm ring-1 ring-blue-200";
              rankStyles = "bg-blue-200 text-blue-700";
              avatarStyles = "bg-blue-200 text-blue-700 border-2 border-blue-300";
            }

            return (
              <div 
                key={agent.rank} 
                className={`flex items-center justify-between p-3 rounded-xl border ${borderClass} ${cardStyles} transition-transform duration-200 hover:scale-[1.01]`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-inner ${rankStyles}`}>
                     {agent.rank}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${avatarStyles}`}>
                      {agent.avatar}
                    </div>
                    <div className="text-left">
                       <div className="flex items-center">
                        <p className={`font-bold text-sm ${isMe ? 'text-blue-800' : 'text-gray-800'}`}>
                          {agent.name}
                        </p>
                        {isTop1 && <Crown size={14} className="ml-1 text-yellow-500 fill-current" />}
                       </div>
                       <div className="flex items-center text-[10px] font-medium opacity-70">
                         <Star size={10} className="text-yellow-500 fill-current mr-1" />
                         {agent.rating.toFixed(1)} RATING
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-black text-lg ${isTop1 ? 'text-yellow-600' : isTop2 ? 'text-slate-600' : isTop3 ? 'text-orange-700' : 'text-gray-700'}`}>
                    {agent.deliveries}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-wider opacity-60">Orders</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DeliveriesScreen({ orders, navigate }) {
  const [tab, setTab] = useState('new'); // 'new' or 'active'
  const [searchTerm, setSearchTerm] = useState('');
  
  const newOrders = orders.filter(o => o.status === 'new');
  const activeOrders = orders.filter(o => ['accepted', 'picked-up', 'out-for-delivery', 'verified'].includes(o.status));

  const filterOrders = (list) => {
    if (!searchTerm) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(o => 
      o.id.toLowerCase().includes(term) || 
      o.customerName.toLowerCase().includes(term) ||
      o.address.toLowerCase().includes(term)
    );
  };

  const filteredNew = filterOrders(newOrders);
  const filteredActive = filterOrders(activeOrders);

  const getAction = (order) => {
    switch (order.status) {
      case 'accepted':
        return { page: 'onDelivery', label: 'Pickup Package' };
      case 'picked-up':
      case 'out-for-delivery':
        return { page: 'onDelivery', label: 'View Active Delivery' };
      case 'verified':
        return { page: 'onDelivery', label: 'View Payment Status' };
      default:
        return null;
    }
  };

  return (
    <div>
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

      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Filter orders by Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {tab === 'new' && (
          <div>
            {filteredNew.length > 0 ? (
              filteredNew.map(order => (
                <OrderCard key={order.id} order={order} onClick={() => navigate('deliveryDetail', order.id)} actionLabel="View Details & Accept" />
              ))
            ) : (
              <EmptyState icon={Inbox} title="No matching assignments" subtitle={searchTerm ? "Try a different search term." : "You're all caught up!"} />
            )}
          </div>
        )}
        
        {tab === 'active' && (
          <div>
            {filteredActive.length > 0 ? (
              filteredActive.map(order => {
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
              <EmptyState icon={Truck} title="No active deliveries" subtitle={searchTerm ? "Try a different search term." : "Accept a new assignment to get started."} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DeliveryHistoryScreen({ orders, navigate, initialFilter = 'all' }) {
  const [filterTime, setFilterTime] = useState(initialFilter); 

  useEffect(() => {
    if (initialFilter) setFilterTime(initialFilter);
  }, [initialFilter]);

  const completedOrders = orders.filter(o => ['delivered', 'failed', 'returned', 'damaged'].includes(o.status));

  const filteredOrders = useMemo(() => {
    const now = new Date();
    const todayStr = now.toDateString();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (filterTime === 'today') {
      return completedOrders.filter(o => new Date(o.timestamp).toDateString() === todayStr);
    }
    if (filterTime === 'month') {
      return completedOrders.filter(o => {
        const d = new Date(o.timestamp);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
    }
    
    if (filterTime === 'delivered') {
      return completedOrders.filter(o => o.status === 'delivered');
    }
    if (filterTime === 'not_delivered') {
      return completedOrders.filter(o => o.status === 'failed');
    }
    if (filterTime === 'returned') {
      return completedOrders.filter(o => 
        o.status === 'returned' || 
        (o.specialInstructions && o.specialInstructions.toLowerCase().includes('return'))
      );
    }
    if (filterTime === 'damaged') {
      return completedOrders.filter(o => 
        o.status === 'damaged' || 
        (o.specialInstructions && o.specialInstructions.toLowerCase().includes('damage'))
      );
    }

    return completedOrders; 
  }, [completedOrders, filterTime]);

  return (
    <div>
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 p-2">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar">
           <FilterButton 
             label="All Time" 
             isActive={filterTime === 'all'} 
             onClick={() => setFilterTime('all')} 
             icon={History}
           />
           <FilterButton 
             label="This Month" 
             isActive={filterTime === 'month'} 
             onClick={() => setFilterTime('month')} 
             icon={Calendar}
           />
           <FilterButton 
             label="Today" 
             isActive={filterTime === 'today'} 
             onClick={() => setFilterTime('today')} 
             icon={Clock}
           />
           <FilterButton 
             label="Delivered" 
             isActive={filterTime === 'delivered'} 
             onClick={() => setFilterTime('delivered')} 
             icon={CheckCircle}
           />
           <FilterButton 
             label="Not Delivered" 
             isActive={filterTime === 'not_delivered'} 
             onClick={() => setFilterTime('not_delivered')} 
             icon={XCircle}
           />
           <FilterButton 
             label="Returned" 
             isActive={filterTime === 'returned'} 
             onClick={() => setFilterTime('returned')} 
             icon={RefreshCw}
           />
           <FilterButton 
             label="Damaged" 
             isActive={filterTime === 'damaged'} 
             onClick={() => setFilterTime('damaged')} 
             icon={AlertTriangle}
           />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
           <span>Showing {filteredOrders.length} order(s)</span>
           <span className="bg-gray-100 px-2 py-1 rounded capitalize font-medium">
             {filterTime.replace('_', ' ')}
           </span>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard 
               key={order.id} 
               order={order} 
               onClick={() => navigate('deliveryDetail', order.id)}
            />
          ))
        ) : (
          <EmptyState icon={Filter} title="No orders found" subtitle={`No deliveries found for filter: "${filterTime.replace('_', ' ')}".`} />
        )}
      </div>
    </div>
  );
}

function FilterButton({ label, isActive, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {Icon && <Icon size={14} />}
      <span>{label}</span>
    </button>
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
    verified: { text: 'Verified', color: 'bg-cyan-500' },
    delivered: { text: 'Delivered', color: 'bg-green-500' },
    failed: { text: 'Failed', color: 'bg-red-600' },
    returned: { text: 'Returned', color: 'bg-gray-600' },
    damaged: { text: 'Damaged', color: 'bg-red-800' },
  };
  
  const { text, color } = statusInfo[order.status] || { text: 'Unknown', color: 'bg-gray-500' };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-shadow hover:shadow-lg" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
          <p className="text-xs text-gray-500">{formatTimestamp(order.timestamp)}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${color}`}>
          {text}
        </span>
      </div>
      <p className="text-gray-700 font-medium mb-1">{order.customerName}</p>
      <div className="flex items-start text-sm text-gray-600 mb-3">
        <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
        <span>{order.address}</span>
      </div>
      
      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="font-medium text-gray-700 flex items-center">
          <Package size={16} className="mr-1 text-gray-400" />
          {order.packageWeight}
        </span>
        {order.paymentMethod === 'Cash on Delivery' && (
          <span className="font-bold text-green-600 flex items-center">
            <DollarSign size={16} className="mr-1" />
            COD: {formatCurrency(order.amountToCollect)}
          </span>
        )}
        {order.specialInstructions && (
          <span className="font-semibold text-red-600 flex items-center">
            <AlertTriangle size={16} className="mr-1" />
            Instructions
          </span>
        )}
      </div>
      
      {/* Always Visible Detail Link */}
      <div className="mt-3 flex justify-end items-center border-t border-gray-50 pt-2">
          <span className="text-xs font-bold text-blue-600 flex items-center hover:underline">
            View Details <ChevronRight size={14} className="ml-1" />
          </span>
      </div>

      {actionLabel && (
        <button className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 mt-3">
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
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.id}</h2>
        <InfoRow icon={User} label="Customer" value={order.customerName} />
        <InfoRow icon={MapPin} label="Address" value={order.address} />
        <InfoRow icon={Package} label="Package Weight" value={order.packageWeight} />
        
        <div className="mt-4 pt-2 border-t border-gray-100">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-gray-500">
                 <FileText size={18} className="mr-2 text-blue-600" />
                 <span className="text-sm font-medium">Special Instructions</span>
              </div>
           </div>
           <div className={`p-4 rounded-xl border ${order.specialInstructions ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-100'}`}>
              {order.specialInstructions ? (
                 <div className="flex items-start">
                    <AlertTriangle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-bold text-gray-800 leading-relaxed">
                       "{order.specialInstructions}"
                    </p>
                 </div>
              ) : (
                 <p className="text-sm text-gray-400 italic">No instructions provided by customer.</p>
              )}
           </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment Details</h3>
        <InfoRow 
          icon={DollarSign} 
          label="Payment Method" 
          value={order.paymentMethod} 
        />
        <InfoRow 
            icon={DollarSign} 
            label="Order Value" 
            value={formatCurrency(order.orderValue)}
          />
        {order.paymentMethod === 'Cash on Delivery' && (
          <InfoRow 
            icon={DollarSign} 
            label="Amount to Collect" 
            value={formatCurrency(order.amountToCollect)}
          />
        )}
      </div>
      
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
      
      {/* Conditional Accept Button - Only for New Orders */}
      {order.status === 'new' && (
        <button 
            onClick={() => onAccept(order.id)}
            className="w-full rounded-lg bg-green-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-green-700"
        >
            Accept Delivery
        </button>
      )}
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

function OnDeliveryScreen({ order, onPickup, onOutForDelivery, onOpenOtp, onOpenCash, onReportIssue, onClientAcknowledge, showToast }) {
  if (!order) return <EmptyState icon={Truck} title="No active delivery" subtitle="Please select an active delivery to view." />;
  
  const [showProducts, setShowProducts] = useState(false);
  
  const isAtDoor = order.status === 'out-for-delivery';

  const handleOpenMaps = () => {
    const query = encodeURIComponent(order.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="p-0">
      <div className="relative h-72 w-full bg-gray-200 shadow-md">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          title="Delivery Route"
          src="https://www.openstreetmap.org/export/embed.html?bbox=55.265,25.195,55.295,25.215&layer=mapnik"
          className="w-full h-full opacity-90"
        ></iframe>
        
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        
        <button 
          onClick={handleOpenMaps}
          className="absolute bottom-4 right-4 flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transform transition hover:scale-105 active:bg-blue-700"
        >
          <MapPin size={20} className="fill-current" />
          <span className="font-bold text-sm">Start Navigation</span>
        </button>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-white/50">
           <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
           Live GPS
        </div>
      </div>
      
      <div className="p-4 space-y-4 bg-white rounded-t-2xl -mt-6 relative shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.id}</h2>
        <InfoRow icon={User} label="Customer" value={order.customerName} />
        <InfoRow icon={MapPin} label="Deliver To" value={order.address} />
        
        <div className={`p-4 rounded-xl border ${order.specialInstructions ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
             <div className="flex items-center mb-2">
                <FileText size={16} className={`mr-2 ${order.specialInstructions ? 'text-red-500' : 'text-gray-400'}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${order.specialInstructions ? 'text-red-600' : 'text-gray-400'}`}>Delivery Instructions</span>
             </div>
             {order.specialInstructions ? (
                <div className="flex items-start">
                   <AlertTriangle size={18} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                   <p className="text-sm font-bold text-gray-800">
                      {order.specialInstructions}
                   </p>
                </div>
             ) : (
                <p className="text-sm text-gray-400 italic pl-6">None provided.</p>
             )}
        </div>

        <InfoRow 
          icon={DollarSign} 
          label="Payment" 
          value={
            order.paymentMethod === 'Cash on Delivery' 
            ? `COD: ${formatCurrency(order.amountToCollect)}`
            : 'Prepaid'
          } 
        />

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
        
        <div className="space-y-3 pt-4">
          
          {order.status === 'accepted' && (
            <button 
              onClick={() => onPickup(order.id)}
              className="w-full rounded-lg bg-purple-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-purple-700"
            >
              <Package size={20} className="inline mr-2" />
              Confirm Pickup
            </button>
          )}

          {order.status === 'picked-up' && (
            <button 
              onClick={() => onOutForDelivery(order.id)}
              className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-orange-600"
            >
              <Truck size={20} className="inline mr-2" />
              Mark as "Out for Delivery"
            </button>
          )}
          
          {isAtDoor && (
            <>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={onOpenOtp}
                  className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-blue-700"
                >
                  <ShieldCheck size={20} className="inline mr-2" />
                  Verify Customer OTP
                </button>
                
                <button 
                  onClick={() => onClientAcknowledge(order.id)}
                  className="w-full rounded-lg border-2 border-blue-600 py-4 font-bold text-blue-600 text-lg shadow-sm transition duration-300 hover:bg-blue-50"
                >
                  <FileSignature size={20} className="inline mr-2" />
                  Client Acknowledgement
                </button>
              </div>
            </>
          )}
          
          {order.status === 'verified' && (
             <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold">Order Verified!</p>
                <p className="text-sm text-green-600">Processing payment logic...</p>
             </div>
          )}

          <div className="flex space-x-3 mt-2">
             <a 
              href="tel:0000000000" 
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

function ProfileScreen({ user, onLogout, navigate, orders, onStatusChange }) { 
  const totalDeliveries = useMemo(() => {
    return orders.filter(o => o.status === 'delivered').length;
  }, [orders]);

  const kpis = useMemo(() => {
      const deliveredOrders = orders.filter(o => o.status === 'delivered');
      const failedOrders = orders.filter(o => o.status === 'failed');
      const totalAttempted = deliveredOrders.length + failedOrders.length;

      let onTimeCount = 0;
      deliveredOrders.forEach(o => {
          if (!o.actualDeliveryTime || o.actualDeliveryTime <= o.promisedTime) {
              onTimeCount++;
          }
      });
      const onTimeRate = totalAttempted > 0 ? ((onTimeCount / totalAttempted) * 100).toFixed(1) : '100';
      const returnRate = totalAttempted > 0 ? ((failedOrders.length / totalAttempted) * 100).toFixed(1) : '0.0';

      const cashOrders = orders.filter(o => o.cashCollected !== null);
      let correctCashCount = 0;
      cashOrders.forEach(o => {
          if (Math.abs(o.cashCollected - o.amountToCollect) < 0.01) {
              correctCashCount++;
          }
      });
      const cashAccuracy = cashOrders.length > 0 ? ((correctCashCount / cashOrders.length) * 100).toFixed(0) : '100';

      return [
          { label: 'On-Time Delivery', value: `${onTimeRate}%`, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Return Rate', value: `${returnRate}%`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Drop Time', value: '12m', color: 'text-purple-600', bg: 'bg-purple-50' }, 
          { label: 'Cash Accuracy', value: `${cashAccuracy}%`, color: 'text-orange-600', bg: 'bg-orange-50' },
      ];
  }, [orders]);

  return (
    <div className="p-4 space-y-5">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md flex items-center space-x-4">
        <img 
          src={user.avatarUrl}
          alt="Profile Avatar" 
          className="w-20 h-20 rounded-full border-4 border-blue-200"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">Agent ID: {user.id}</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded">{user.role}</span>
        </div>
      </div>
      
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md space-y-3">
        <InfoRow icon={Truck} label="Vehicle" value={user.vehicle} />
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center">
            <Clock size={18} className="mr-3 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Availability</p>
              <p className={`text-md font-bold ${user.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                 {user.status}
              </p>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
             <button 
               onClick={() => onStatusChange('Available')}
               className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${user.status === 'Available' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
             >
               Free
             </button>
             <button 
               onClick={() => onStatusChange('Not Free')}
               className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${user.status === 'Not Free' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500'}`}
             >
               Busy
             </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            <BarChart2 size={20} className="mr-2 text-blue-600" />
            Key Performance Indicators
        </h3>
        <div className="grid grid-cols-2 gap-3">
            {kpis.map((kpi, i) => (
                <div key={i} className={`p-3 rounded-lg ${kpi.bg} border border-gray-100 flex flex-col items-center text-center`}>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                    <p className={`text-2xl font-black ${kpi.color} mt-1`}>{kpi.value}</p>
                </div>
            ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">My Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          <PerformanceMetric
            label="Total Orders Delivered"
            value={totalDeliveries}
            comparisonValue={MOCK_TEAM_PERFORMANCE.teamAverageDeliveries}
            comparisonLabel="vs. Team Avg"
          />
          <PerformanceMetric
            label="My Customer Rating"
            value={MOCK_TEAM_PERFORMANCE.myRating.toFixed(1)}
            comparisonValue={MOCK_TEAM_PERFORMANCE.teamAverageRating.toFixed(1)}
            comparisonLabel="vs. Team Avg"
            unit={<Star size={16} className="inline fill-current text-yellow-400" />}
          />
        </div>
      </div>
      
       <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
         <MenuItem icon={DollarSign} label="Cash Report" onClick={() => navigate('cashReport')} />
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

function SupportChatScreen() {
  const [messages, setMessages] = useState(MOCK_CHAT);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [
      ...messages,
      { id: Date.now(), from: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setMessages(newMessages);
    setInput('');
    
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

function ReceiptScreen({ order, navigate }) {
  const transactionId = useMemo(() => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `TXN-${order.id}-${randomSuffix}`;
  }, [order.id]);

  const amount = order.cashCollected || order.orderValue;
  const isCash = order.paymentMethod === 'Cash on Delivery';

  return (
     <div className="p-4 space-y-4">
        <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            <div className="bg-gray-50 p-6 text-center border-b-2 border-dashed border-gray-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-3">
                    <CheckCircle size={24} />
                </div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">
                  {isCash ? 'CASH RECEIPT' : 'PAYMENT RECEIPT'}
                </h2>
                <p className="text-gray-500 text-xs font-medium mt-1">
                   {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                </p>
            </div>

            <div className="p-6 text-center border-b border-gray-100">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Amount Received</p>
               <p className="text-4xl font-black text-gray-900 mt-2">{formatCurrency(amount)}</p>
               {isCash && (
                 <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded-full tracking-wide">
                    Paid via Cash
                 </span>
               )}
            </div>

            <div className="p-6 space-y-4 bg-white">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Order Ref</span>
                    <span className="font-bold text-gray-800 text-lg">{order.id}</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500 mt-1">Customer</span>
                    <div className="text-right">
                        <p className="font-bold text-gray-800 text-sm">{order.customerName}</p>
                        <p className="text-xs text-gray-400 max-w-[180px] truncate">{order.address}</p>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">Item Details</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {order.products.map((p, i) => (
                          <div key={i} className="flex justify-between text-sm">
                              <span className="text-gray-600">{p.name}</span>
                              <span className="font-bold text-gray-900">x{p.qty}</span>
                          </div>
                      ))}
                    </div>
                </div>

                <div className="pt-4 mt-2 flex flex-col items-center text-center space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Transaction ID</p>
                    <p className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{transactionId}</p>
                </div>
            </div>
            
            <div className="relative h-2 bg-gray-100 w-full">
               <div className="absolute top-0 w-full h-2 bg-[linear-gradient(45deg,transparent_33.333%,#ffffff_33.333%,#ffffff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#ffffff_33.333%,#ffffff_66.667%,transparent_66.667%)] bg-[length:10px_20px] bg-[position:0_10px]"></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <button className="w-full rounded-lg bg-white border border-gray-300 py-3 font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 flex items-center justify-center">
              <Send size={18} className="mr-2" /> Share
           </button>
           <button 
              onClick={() => navigate('dashboard')}
              className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-lg transition duration-300 hover:bg-blue-700"
            >
              Done
           </button>
        </div>
     </div>
  )
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

function CashReportScreen({ orders }) {
  const cashTransactions = orders.filter(o => o.cashCollected !== null && o.cashCollected > 0);
  const totalCash = cashTransactions.reduce((sum, o) => sum + o.cashCollected, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 shadow-lg text-white">
        <p className="text-sm font-medium text-white/80 mb-1">Total Cash in Hand</p>
        <p className="text-4xl font-bold">{formatCurrency(totalCash)}</p>
        <p className="text-sm text-white/80 mt-2">{cashTransactions.length} cash transaction(s)</p>
      </div>
      
      <div className="rounded-xl border border-gray-100 bg-white shadow-md">
        <h3 className="text-lg font-semibold p-4 border-b border-gray-100 text-gray-800">Transaction Details</h3>
        {cashTransactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {cashTransactions.map(order => (
              <div key={order.id} className="flex justify-between items-center p-4">
                <div>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className="font-bold text-lg text-green-600">
                  +{formatCurrency(order.cashCollected)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 text-gray-500">No cash transactions recorded yet.</p>
        )}
      </div>
    </div>
  );
}

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

function CashModal({ order, onClose, onConfirm }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (amount.trim() === '' || isNaN(parseFloat(amount))) {
      return; // Or show an error
    }
    onConfirm(order.id, amount);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600">
          <XCircle size={24} />
        </button>
        
        <div className="text-center">
          <DollarSign size={48} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Log Cash Payment</h2>
          <p className="text-gray-600 mb-1">Order: <span className="font-bold">{order.id}</span></p>
          <p className="text-gray-600 mb-4">
            Amount to Collect: <span className="font-bold text-lg text-green-700">{formatCurrency(order.amountToCollect)}</span>
          </p>
          
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">Amount Received</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-left text-2xl font-bold p-3 pl-12 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={amount.trim() === ''}
            className="w-full rounded-lg bg-green-600 py-3 font-bold text-white text-lg shadow-lg transition duration-300 hover:bg-green-700 mt-6 disabled:opacity-50"
          >
            Confirm Cash Received
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ onViewReceipt, onReturnDashboard }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center">
        
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100">
          <ThumbsUp size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Completed!</h2>
        <p className="text-gray-600 mb-8">
          The order has been successfully marked as delivered.
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={onViewReceipt}
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition duration-300 hover:bg-blue-700"
          >
            View Receipt
          </button>
          
          <button 
            onClick={onReturnDashboard}
            className="w-full rounded-lg bg-white border-2 border-gray-300 py-3 font-bold text-gray-700 shadow-sm transition duration-300 hover:bg-gray-50"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function PerformanceMetric({ label, value, comparisonValue, comparisonLabel, unit }) {
  const isBetter = value >= comparisonValue;
  const comparisonColor = isBetter ? 'text-green-500' : 'text-red-500';

  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-blue-600 my-1">
        {value} {unit}
      </p>
      <div className="text-xs">
        <span className={comparisonColor}>
          {comparisonValue} {unit}
        </span>
        <span className="text-gray-500"> {comparisonLabel}</span>
      </div>
    </div>
  );
}