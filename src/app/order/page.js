"use client"
import React, { useState, useMemo, Fragment } from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  RefreshCcw,
  Truck,
  Menu,
  X,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  DollarSign,
  ShoppingCart,
  Phone,
  Building,
  Mail,
  MoreVertical,
  Search,
  ArrowRight,
  UserCheck,
  PackageCheck,
  Wallet,
  ClipboardList,
  Lock,
  Languages,
  LogOut,
  ArrowUp,
  ArrowDown,
  BarChart,
  Bell,
  HelpCircle,
  Briefcase,
  CreditCard,
  Shield,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';


// --- MOCK DATA (ENHANCED) ---
const mockCustomers = [
  { id: 1, contactPerson: 'Alice Smith', email: 'alice@example.com', phone: '+1-202-555-0182', businessName: 'Alice\'s Cafe', businessType: 'Cafe', taxId: 'GSTIN12345ABCDE', date: '2025-10-28', status: 'Pending Manager', docs: [{ name: 'ID Proof.pdf' }, { name: 'Business License.pdf' }], details: 'New cafe startup.' },
  { id: 2, contactPerson: 'Bob Johnson', email: 'bob.j@corporate.com', phone: '+1-303-555-0121', businessName: 'Corporate Catering Inc.', businessType: 'Catering', taxId: 'GSTIN56789FGHIJ', date: '2025-10-27', status: 'Pending Admin', docs: [{ name: 'ID.pdf' }, { name: 'CompanyReg.pdf' }], details: 'Large restaurant chain.' },
  { id: 3, contactPerson: 'Charlie Brown', email: 'charlie@foodtruck.com', phone: '+1-404-555-0159', businessName: 'Charlie\'s Food Truck', businessType: 'Food Truck', taxId: 'GSTIN13579BDHFJ', date: '2025-10-27', status: 'Pending Finance', docs: [{ name: 'Passport.pdf' }], details: 'Mobile food vendor.' },
  { id: 4, contactPerson: 'David Lee', email: 'david.lee@grocers.com', phone: '+1-505-555-0177', businessName: 'Lee\'s Local Grocers', businessType: 'Grocery', taxId: 'GSTIN24680ACEGI', date: '2025-10-26', status: 'Approved', docs: [{ name: 'ID.pdf' }], details: 'Local grocery store.' },
  { id: 5, contactPerson: 'Eva Chen', email: 'eva.c@caterers.net', phone: '+1-606-555-0134', businessName: 'Eva\'s Events', businessType: 'Catering', taxId: 'GSTIN98765ZXCVB', date: '2025-10-25', status: 'Revoked', docs: [{ name: 'ID_unclear.jpg' }], details: 'Catering service. ID was blurry.' },
];

const mockProductOrders = [
  { id: 1001, customer: 'Lee\'s Local Grocers', date: '2025-10-28', status: 'Received', type: 'Normal', total: 250.00, picker: null, delivery: null, items: [{ sku: 'FR-001', name: 'Apples', qty: 5, unit: 'kg' }, { sku: 'DR-003', name: 'Milk', qty: 10, unit: 'L' }] },
  { id: 1002, customer: 'Alice\'s Cafe', date: '2025-10-28', status: 'Picking', type: 'Perishable', total: 120.00, picker: 'Seafood Vendor', delivery: null, items: [{ sku: 'SF-002', name: 'Fresh Salmon', qty: 10, unit: 'kg' }] },
  { id: 1003, customer: 'Corporate Catering Inc.', date: '2025-10-27', status: 'Picking', type: 'Normal', total: 1500.00, picker: 'Picker 1 (John)', delivery: null, items: [{ sku: 'CH-005', name: 'Imported Cheese', qty: 20, unit: 'kg' }, { sku: 'MT-001', name: 'Beef Tenderloin', qty: 15, unit: 'kg' }] },
  { id: 1004, customer: 'Lee\'s Local Grocers', date: '2025-10-27', status: 'Packed', type: 'Normal', total: 300.00, picker: 'Picker 2 (Jane)', delivery: null, items: [{ sku: 'VG-007', name: 'Tomatoes', qty: 50, unit: 'kg' }, { sku: 'VG-012', name: 'Lettuce', qty: 20, unit: 'box' }] },
  { id: 1005, customer: 'Eva\'s Events', date: '2025-10-26', status: 'Invoiced', type: 'Normal', total: 80.00, picker: 'Picker 1 (John)', delivery: null, items: [{ sku: 'DP-002', name: 'Flour', qty: 2, unit: 'bag (25kg)' }] },
  { id: 1006, customer: 'Corporate Catering Inc.', date: '2025-10-26', status: 'Dispatched', type: 'Normal', total: 450.00, picker: 'Picker 2 (Jane)', delivery: 'Delivery 1 (Mike)', items: [{ sku: 'OI-001', name: 'Olive Oil', qty: 3, unit: 'case (6x1L)' }] },
  { id: 1007, customer: 'Alice\'s Cafe', date: '2025-10-25', status: 'Delivered', type: 'Normal', total: 190.00, picker: 'Picker 1 (John)', delivery: 'Delivery 2 (Sara)', items: [{ sku: 'VG-007', name: 'Tomatoes', qty: 20, unit: 'kg' }, { sku: 'FR-004', name: 'Oranges', qty: 1, unit: 'box' }] },
];

const mockServiceOrders = [
  { id: 2001, customer: 'Corporate Catering Inc.', service: 'Kitchen Deep Clean', date: '2025-10-28', status: 'Received', vendor: null, estimate: null, description: 'Standard quarterly deep clean for main kitchen.' },
  { id: 2002, customer: 'Alice\'s Cafe', service: 'Freezer Repair', date: '2025-10-27', status: 'Vendor Assigned', vendor: 'CoolTech Repairs', estimate: null, description: 'Walk-in freezer unit #2 is not holding temperature.' },
  { id: 2003, customer: 'Lee\'s Local Grocers', service: 'Plumbing Check', date: '2025-10-27', status: 'Estimate Sent', vendor: 'QuickPlumb', estimate: 150.00, description: 'Sink in prep area is leaking.' },
  { id: 2004, customer: 'Corporate Catering Inc.', service: 'Equipment Install', date: '2025-10-26', status: 'Customer Approved', vendor: 'ProInstalls', estimate: 800.00, description: 'Installation of new industrial oven, Model #XYZ.' },
  { id: 2005, customer: 'Eva\'s Events', service: 'Pest Control', date: '2025-10-25', status: 'Completed', vendor: 'BugFree Solutions', estimate: 200.00, description: 'Monthly pest control service for storage area.' },
  { id: 2006, customer: 'Alice\'s Cafe', service: 'Knife Sharpening', date: '2025-10-24', status: 'Invoiced', vendor: 'EdgeMasters', estimate: 50.00, description: 'Standard set of 10 kitchen knives.' },
];

const mockRefunds = [
  { id: 3001, orderId: 1003, customer: 'Corporate Catering Inc.', reason: 'Stock Shortage', item: 'Imported Cheese (5kg)', status: 'Pending', date: '2025-10-28', notes: 'Item was out of stock, customer pre-paid.' },
  { id: 3002, orderId: 1007, customer: 'Alice\'s Cafe', reason: 'Return', item: 'Organic Tomatoes (1 box)', status: 'Sent to Finance', date: '2025-10-27', notes: 'Customer reported tomatoes were overripe on delivery.' },
  { id: 3003, orderId: 1001, customer: 'Lee\'s Local Grocers', reason: 'Return', item: 'Broken Eggs (1 tray)', status: 'Wallet Credited', date: '2025-10-26', notes: 'Driver reported breakage during transit. Credited to wallet as requested.' },
];

const mockPickers = ['Picker 1 (John)', 'Picker 2 (Jane)', 'Picker 3 (Alex)'];
const mockDeliveryPersons = ['Delivery 1 (Mike)', 'Delivery 2 (Sara)', 'Delivery 3 (Chris)'];
const mockVendors = [
  { id: 1, name: 'Seafood Vendor', status: 'Active', activeOrders: 1, contactPerson: 'Sam Tuna', contactEmail: 'sam@seafood.com', since: '2023-01-15' },
  { id: 2, name: 'FreshMeats Ltd.', status: 'Active', activeOrders: 0, contactPerson: 'Betty Beef', contactEmail: 'betty@freshmeats.com', since: '2022-05-20' },
  { id: 3, name: 'DailyDairy Co.', status: 'Inactive', activeOrders: 0, contactPerson: 'Chris Cheese', contactEmail: 'chris@dailydairy.co', since: '2023-07-10' },
  { id: 4, name: 'CoolTech Repairs', status: 'Active', activeOrders: 1, contactPerson: 'Rick Frost', contactEmail: 'rick@cooltech.com', since: '2024-02-01' },
  { id: 5, name: 'QuickPlumb', status: 'Active', activeOrders: 1, contactPerson: 'Piper Leak', contactEmail: 'piper@quickplumb.net', since: '2023-11-30' },
  { id: 6, name: 'ProInstalls', status: 'Active', activeOrders: 1, contactPerson: 'Ivan Staller', contactEmail: 'ivan@proinstalls.com', since: '2024-06-01' },
];


// --- UTILITY COMPONENTS ---

/**
 * Reusable Abreco Logo SVG
 */
const AbrecoLogo = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C16.2908 0 18.514 0.613511 20.4633 1.7766C22.4125 2.93969 24.0202 4.6061 25.1396 6.6063C26.259 8.6065 26.8571 10.8659 26.8927 13.181C26.9282 15.4962 26.3996 17.7813 25.352 19.8184L25.3516 19.8192L14.475 27.925C14.3213 28.033 14.1565 28.086 13.9875 28.0815C13.8185 28.077 13.655 28.015 13.5133 27.9016L2.64837 19.8192C1.60039 17.7813 1.07178 15.4962 1.10733 13.181C1.14288 10.8659 1.74103 8.6065 2.8604 6.6063C3.97978 4.6061 5.5875 2.93969 7.53673 1.7766C9.48596 0.613511 11.7092 0 14 0Z" fill="#F43F5E"/>
  </svg>
);


/**
 * Reusable Button Component (NEW)
 */
const Button = React.forwardRef(({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-red-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    'danger-ghost': 'text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    icon: 'p-2',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

/**
 * Reusable Card Component (NEW)
 */
const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between p-5 border-b border-gray-200">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-5 bg-gray-50 border-t border-gray-200 rounded-b-xl ${className}`}>
    {children}
  </div>
);


/**
 * Reusable component for status badges
 */
const Badge = ({ text, color }) => {
  const colorClasses = {
    blue: 'bg-red-100 text-red-800', // Changed blue to red theme
    gray: 'bg-gray-100 text-gray-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    indigo: 'bg-purple-100 text-purple-800', // Changed indigo to purple
  };
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[color] || colorClasses.gray}`}>
      {text}
    </span>
  );
};

/**
 * Reusable modal component (Updated with new Button)
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900" id="modal-title">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable stat card for the dashboard (Updated Red/Gradient Design from image)
 */
const StatCard = ({ title, value, subtext, icon, change, variant = 'default' }) => {
  const isPrimary = variant === 'primary';
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');

  const containerClasses = isPrimary
    ? 'bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg'
    : 'bg-white text-gray-900 shadow-md';
  
  const titleClasses = isPrimary ? 'text-red-100' : 'text-gray-500';
  const valueClasses = isPrimary ? 'text-white' : 'text-gray-900';
  const iconContainerClasses = isPrimary ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600';
  
  let changeClasses = '';
  if (isPositive) changeClasses = 'text-green-600';
  if (isNegative) changeClasses = 'text-red-600';
  
  // Use Tailwind classes for positive/negative change
  if (isPositive) changeClasses = isPrimary ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700';
  if (isNegative) changeClasses = isPrimary ? 'bg-red-100 text-red-700' : 'bg-red-100 text-red-700';


  return (
    <div className={`p-5 rounded-xl ${containerClasses}`}>
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${iconContainerClasses}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        {change && (
          <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${changeClasses}`}>
            {isPositive ? <ArrowUp size={14} className="mr-0.5" /> : <ArrowDown size={14} className="mr-0.5" />}
            {change.substring(1)}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className={`text-sm font-medium ${titleClasses}`}>{title}</p>
        <p className={`text-3xl font-semibold ${valueClasses}`}>{value}</p>
        <p className={`text-xs ${titleClasses}`}>{subtext}</p>
      </div>
    </div>
  );
};


/**
 * Reusable sidebar link (New Red Design)
 */
const SidebarLink = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
      ${active
        ? 'bg-red-100 text-red-600 font-semibold' // Active state (red)
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900' // Inactive state
      }
    `}
  >
    {React.cloneElement(icon, { size: 20 })}
    <span className="ml-3">{text}</span>
  </button>
);

/**
 * Reusable sidebar menu heading (New Design)
 */
const MenuHeading = ({ text }) => (
  <h6 className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
    {text}
  </h6>
);

/**
 * Reusable Input Component (NEW)
 */
const Input = ({ id, label, type = 'text', placeholder, icon, ...props }) => (
  <div>
    {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {React.cloneElement(icon, { size: 16, className: 'text-gray-400' })}
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
        {...props}
      />
    </div>
  </div>
);

/**
 * Reusable Toggle Component (NEW)
 */
const Toggle = ({ enabled, setEnabled, label, description }) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ${
        enabled ? 'bg-red-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);


// --- "PAGE" COMPONENTS ---

/**
 * Login Page (Updated to Order Manager)
 */
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Gradient Panel */}
      <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-blue-600 text-white p-12 text-center relative">
        
        {/* Main Content (centered by flex) */}
        <AbrecoLogo className="w-20 h-20" />
        <h1 className="text-4xl font-bold mt-6">Abreco Order Manager Portal</h1>
        <p className="text-lg mt-2 text-blue-100">
          Manage your products, orders, and payments all in one place.
        </p>

        {/* Bottom Copyright Text (centered) */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Abreco. All rights reserved.
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Manager Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am an...
              </label>
              <div className="relative">
                <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100">
                  <User size={16} className="text-gray-400" />
                  <span className="ml-2 text-gray-700">Order Manager</span>
                </div>
              </div>
            </div>

            <Input
              id="email"
              label="Username or Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@company.com"
              icon={<Mail />}
            />
            
            <Input
              id="password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              icon={<Lock />}
            />

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Languages size={16} className="text-gray-400" />
                </span>
                <select
                  id="language"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option>English</option>
                  <option>Español</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </span>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Log In
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            New manager?{' '}
            <a href="#" className="font-medium text-red-600 hover:text-red-500">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};


/**
 * Dashboard Overview Page
 * (Workflow Step 1 & 6) - Updated for new workflow
 */
const DashboardOverview = ({ customers, productOrders, serviceOrders, refunds, onNavigate }) => {
  const pendingVerifications = customers.filter(c => c.status !== 'Approved' && c.status !== 'Revoked').length;
  const activeProductOrders = productOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Invoiced').length;
  const dispatchedOrders = productOrders.filter(o => o.status === 'Dispatched').length;
  const refundRequests = refunds.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Friday, November 1st 2025</p>
      </div>
      
      {/* Stats Grid - Updated to match new workflow text */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Pending Verifications" 
          value={pendingVerifications} 
          subtext="Customers awaiting approval"
          icon={<UserCheck />} 
          change="-9%" // Mock change
          variant="primary" 
        />
        <StatCard 
          title="Active Product Orders" 
          value={activeProductOrders} 
          subtext="Orders in picking/packing"
          icon={<ShoppingCart />} 
          change="+15.8%" // Mock change
        />
        <StatCard 
          title="Dispatched Orders" 
          value={dispatchedOrders} 
          subtext="Orders out for delivery"
          icon={<Truck />} 
          change="-8%" // Mock change
        />
        <StatCard 
          title="Pending Refunds" 
          value={refundRequests} 
          subtext="Requests awaiting finance"
          icon={<RefreshCcw />} 
          change="+12.6%" // Mock change
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader title="Recent Activity" />
          <CardContent className="p-0">
            <div className="space-y-4 max-h-96 overflow-y-auto p-5">
              {
                [...productOrders, ...serviceOrders]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map(order => (
                    <div key={order.id} className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${order.service ? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'}`}>
                        {order.service ? <Settings size={20} /> : <ShoppingCart size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">New {order.service ? 'Service' : 'Product'} Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer} - <span className="font-medium">{order.status}</span></p>
                      </div>
                      <span className="text-sm text-gray-400 ml-auto flex-shrink-0">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  ))
              }
            </div>
          </CardContent>
        </Card>

        {/* Quick Access / Summary */}
        <Card>
          <CardHeader title="Quick Access" />
          <CardContent>
            <div className="space-y-3">
              <QuickAccessLink 
                title="Manage Verifications" 
                value={pendingVerifications} 
                onClick={() => onNavigate('customers')} 
                icon={<UserCheck size={18} className="text-red-600" />} 
              />
              <QuickAccessLink 
                title="Process Refunds" 
                value={refundRequests} 
                onClick={() => onNavigate('refunds')} 
                icon={<Wallet size={18} className="text-red-600" />}
              />
              <QuickAccessLink 
                title="Track Deliveries" 
                value={dispatchedOrders} 
                onClick={() => onNavigate('product-orders')} 
                icon={<Truck size={18} className="text-green-600" />}
              />
              <QuickAccessLink 
                title="View Vendor Status" 
                value={mockVendors.filter(v => v.activeOrders > 0).length} 
                onClick={() => onNavigate('vendors')} 
                icon={<Building size={18} className="text-gray-600" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const QuickAccessLink = ({ title, value, onClick, icon }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{value}</span>
      <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-transform" />
    </div>
  </button>
);

/**
 * Customer Verification Page
 * (Workflow Step 2) - Logic matches new workflow
 */
const CustomerVerification = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleView = (customer) => {
    setModalContent(
      <ViewCustomerDetails customer={customer} onClose={() => setModalOpen(false)} getStatusBadge={getStatusBadge} />
    );
    setModalOpen(true);
  };
  
  const handleApprove = (id) => {
    setCustomers(customers.map(c => {
      if (c.id === id) {
        if (c.status === 'Pending Manager') return { ...c, status: 'Pending Admin' };
        if (c.status === 'Pending Admin') return { ...c, status: 'Pending Finance' };
        if (c.status === 'Pending Finance') return { ...c, status: 'Approved' };
      }
      return c;
    }));
  };
  
  const handleRevoke = (customer) => {
    setModalContent(
      <RevokeCustomer customer={customer} onClose={() => setModalOpen(false)} onRevoke={(id, reason) => {
        setCustomers(customers.map(c => 
          c.id === id ? { ...c, status: 'Revoked', details: `Revoked: ${reason}` } : c
        ));
        setModalOpen(false);
      }} />
    );
    setModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending Manager': return <Badge text={status} color="yellow" />;
      case 'Pending Admin': return <Badge text={status} color="blue" />; // Now red
      case 'Pending Finance': return <Badge text={status} color="indigo" />; // Now purple
      case 'Approved': return <Badge text={status} color="green" />;
      case 'Revoked': return <Badge text={status} color="red" />;
      default: return <Badge text={status} color="gray" />;
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">Customer Verification</h2>
      
      {/* Search Bar */}
      <Input
        id="search-customer"
        placeholder="Search customers by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={<Search />}
      />

      {/* Customer Table */}
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.businessName}</div>
                      <div className="text-sm text-gray-500">{customer.contactPerson}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(customer.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(customer)}>View</Button>
                  {customer.status !== 'Approved' && customer.status !== 'Revoked' && (
                    <Button variant="ghost" size="sm" onClick={() => handleApprove(customer.id)} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      {customer.status === 'Pending Finance' ? 'Approve' : 'Forward'}
                    </Button>
                  )}
                  {customer.status !== 'Approved' && customer.status !== 'Revoked' && (
                    <Button variant="danger-ghost" size="sm" onClick={() => handleRevoke(customer)}>Revoke</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Customer Details">
        {modalContent}
      </Modal>
    </div>
  );
};

// Modal Content for Viewing Customer
const ViewCustomerDetails = ({ customer, onClose, getStatusBadge }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h4 className="text-lg font-semibold">{customer.businessName}</h4>
      <p className="text-sm text-gray-500 flex items-center"><User size={14} className="mr-2" /> <strong>Contact:</strong> {customer.contactPerson}</p>
      <p className="text-sm text-gray-500 flex items-center"><Briefcase size={14} className="mr-2" /> <strong>Type:</strong> {customer.businessType}</p>
      <p className="text-sm text-gray-500 flex items-center"><Mail size={14} className="mr-2" /> {customer.email}</p>
      <p className="text-sm text-gray-500 flex items-center"><Phone size={14} className="mr-2" /> {customer.phone}</p>
      <p className="text-sm text-gray-500"><strong>Tax ID:</strong> {customer.taxId}</p>
      <p className="text-sm text-gray-500"><strong>Submitted:</strong> {customer.date}</p>
      <div className="flex items-center space-x-2 pt-1">
        <strong className="text-sm font-medium text-gray-900">Status:</strong>
        {getStatusBadge ? getStatusBadge(customer.status) : <span className="text-sm text-gray-500">{customer.status}</span>}
      </div>
      <p className="text-sm text-gray-500 pt-1"><strong>Details:</strong> {customer.details}</p>
    </div>
    <div>
      <h5 className="text-md font-semibold mb-2">Submitted Documents</h5>
      <ul className="space-y-2">
        {customer.docs.map(doc => (
          <li key={doc.name} className="flex items-center text-sm text-red-600">
            <FileText size={16} className="mr-2" />
            <a href="#" className="hover:underline">{doc.name}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex justify-end pt-4">
      <Button
        variant="secondary"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  </div>
);

// Modal Content for Revoking Customer
const RevokeCustomer = ({ customer, onClose, onRevoke }) => {
  const [reason, setReason] = useState("");
  return (
    <div className="space-y-4">
      <p>You are about to revoke the application for <strong>{customer.businessName}</strong>. Please provide a reason.</p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows="3"
        placeholder="e.g., Submitted document is unclear, please re-upload."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      ></textarea>
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => onRevoke(customer.id, reason)}
          disabled={!reason}
          className="disabled:opacity-50"
        >
          Revoke Submission
        </Button>
      </div>
    </div>
  );
};


/**
 * Product Orders Page
 * (Workflow Step 4) - Updated for new "auto-assign" workflow
 */
const ProductOrders = () => {
  const [orders, setOrders] = useState(mockProductOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAction = (order, action) => {
    switch (action) {
      case 'Assign Picker':
        setModalContent(
          <AssignWorker 
            title="Assign Picker" 
            workers={mockPickers} 
            onAssign={(worker) => {
              setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Picking', picker: worker } : o));
              setModalOpen(false);
            }} 
            onClose={() => setModalOpen(false)}
          />
        );
        setModalOpen(true);
        break;
      case 'Mark as Packed':
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Packed' } : o));
        break;
      // "Assign Picker" is removed to simulate auto-assignment
      case 'Generate Invoice':
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Invoiced' } : o));
        // In real app, this would trigger ERP sync
        break;
      case 'Assign Delivery':
        setModalContent(
          <AssignWorker 
            title="Assign Delivery Person" 
            workers={mockDeliveryPersons} 
            onAssign={(worker) => {
              setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Dispatched', delivery: worker } : o));
              setModalOpen(false);
            }} 
            onClose={() => setModalOpen(false)}
          />
        );
        setModalOpen(true);
        break;
      case 'Mark Delivered':
         setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Delivered' } : o));
        break;
      case 'View':
        setModalContent(
          <ViewProductOrderDetails order={order} onClose={() => setModalOpen(false)} />
        );
        setModalOpen(true);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Received': return <Badge text={status} color="gray" />;
      case 'Picking': return <Badge text={status} color="yellow" />;
      case 'Packed': return <Badge text={status} color="blue" />; // Now red
      case 'Invoiced': return <Badge text={status} color="indigo" />; // Now purple
      case 'Dispatched': return <Badge text={status} color="green" />;
      case 'Delivered': return <Badge text={status} color="green" />;
      default: return <Badge text={status} color="gray" />;
    }
  };

  const getActions = (order) => {
    // Special handling for Perishable (matches new workflow)
    if (order.type === 'Perishable' && order.status === 'Received') {
      return <span className="text-sm text-gray-500 italic">Auto-assigned to vendor</span>;
    }
    
    // Updated workflow for Normal orders
    switch (order.status) {
      case 'Received': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Assign Picker')}>Assign Picker</Button>
        </div>
      );
      case 'Picking': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Mark as Packed')} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">Mark as Packed</Button>
        </div>
      );
      case 'Packed': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Generate Invoice')} className="text-green-600 hover:text-green-700 hover:bg-green-50">Generate Invoice</Button>
        </div>
      );
      case 'Invoiced': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Assign Delivery')}>Assign Delivery</Button>
        </div>
      );
      case 'Dispatched': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Mark Delivered')} className="text-green-600 hover:text-green-700 hover:bg-green-50">Mark Delivered</Button>
        </div>
      );
      case 'Delivered': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <span className="text-sm text-green-700 font-medium ml-2">Completed</span>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">Product Orders</h2>
      
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Picker/Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.type === 'Perishable' ? <Badge text="Perishable" color="red" /> : <Badge text="Normal" color="gray" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.picker || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.delivery || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{getActions(order)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Order Action">
        {modalContent}
      </Modal>
    </div>
  );
};

// Modal Content for Viewing Product Order
const ViewProductOrderDetails = ({ order, onClose }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h4 className="text-lg font-semibold">Order #{order.id}</h4>
      <p className="text-sm text-gray-500"><strong>Customer:</strong> {order.customer}</p>
      <p className="text-sm text-gray-500"><strong>Date:</strong> {order.date}</p>
      <p className="text-sm text-gray-500"><strong>Status:</strong> {order.status}</p>
      <p className="text-sm text-gray-500"><strong>Type:</strong> {order.type}</p>
      <p className="text-sm text-gray-500"><strong>Picker/Vendor:</strong> {order.picker || 'N/A'}</p>
      <p className="text-sm text-gray-500"><strong>Delivery:</strong> {order.delivery || 'N/A'}</p>
    </div>
    
    <div>
      <h5 className="text-md font-semibold mb-2">Order Items</h5>
      <div className="max-h-40 overflow-y-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map(item => (
              <tr key={item.sku}>
                <td className="px-4 py-2 text-sm text-gray-500">{item.sku}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.qty} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="text-right">
      <h5 className="text-lg font-semibold">Total: ${order.total.toFixed(2)}</h5>
    </div>

    <div className="flex justify-end pt-4">
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);


// Modal Content for Assigning Worker
const AssignWorker = ({ title, workers, onAssign, onClose }) => {
  const [selected, setSelected] = useState(workers[0]);
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">{title}</h4>
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {workers.map(w => <option key={w} value={w}>{w}</option>)}
      </select>
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={() => onAssign(selected)}>Assign</Button>
      </div>
    </div>
  );
};

/**
 * Service Orders Page
 * (Workflow Step 5) - Updated for new "auto-assign" workflow
 */
const ServiceOrders = () => {
  const [orders, setOrders] = useState(mockServiceOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAction = (order, action) => {
    switch (action) {
      case 'Assign Vendor':
        setModalContent(
          <AssignWorker 
            title="Assign Vendor" 
            workers={mockVendors.map(v => v.name)} 
            onAssign={(worker) => {
              setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Vendor Assigned', vendor: worker } : o));
              setModalOpen(false);
            }} 
            onClose={() => setModalOpen(false)}
          />
        );
        setModalOpen(true);
        break;
      // "Assign Vendor" is removed to simulate auto-assignment
      case 'Mark Approved':
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Customer Approved' } : o));
        break;
      case 'Mark Completed':
         setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o));
        break;
      case 'Generate Invoice':
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Invoiced' } : o));
        // In real app, this would trigger ERP sync
        break;
      case 'View':
        setModalContent(
          <ViewServiceOrderDetails order={order} onClose={() => setModalOpen(false)} />
        );
        setModalOpen(true);
        break;
      default:
        break;
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Received': return <Badge text={status} color="gray" />;
      case 'Vendor Assigned': return <Badge text={status} color="yellow" />;
      case 'Estimate Sent': return <Badge text={status} color="blue" />; // Now red
      case 'Customer Approved': return <Badge text={status} color="indigo" />; // Now purple
      case 'Completed': return <Badge text={status} color="green" />;
      case 'Invoiced': return <Badge text={status} color="green" />;
      default: return <Badge text={status} color="gray" />;
    }
  };

  const getActions = (order) => {
    switch (order.status) {
      case 'Received': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Assign Vendor')}>Assign Vendor</Button>
        </div>
      );
      case 'Vendor Assigned': return (
        <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
      );
      case 'Estimate Sent': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Mark Approved')}>Mark Approved</Button>
        </div>
      );
      case 'Customer Approved': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Mark Completed')} className="text-green-600 hover:text-green-700 hover:bg-green-50">Mark Completed</Button>
        </div>
      );
      case 'Completed': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'Generate Invoice')} className="text-green-600 hover:text-green-700 hover:bg-green-50">Generate Invoice</Button>
        </div>
      );
      case 'Invoiced': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleAction(order, 'View')}>View</Button>
          <span className="text-sm text-green-700 font-medium ml-2">Completed</span>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">Service Orders</h2>
      
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estimate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.vendor || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.estimate ? `$${order.estimate.toFixed(2)}` : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{getActions(order)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Service Order Action">
        {modalContent}
      </Modal>
    </div>
  );
};

// Modal Content for Viewing Service Order
const ViewServiceOrderDetails = ({ order, onClose }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h4 className="text-lg font-semibold">Service Order #{order.id}</h4>
      <p className="text-sm text-gray-500"><strong>Customer:</strong> {order.customer}</p>
      <p className="text-sm text-gray-500"><strong>Service:</strong> {order.service}</p>
      <p className="text-sm text-gray-500"><strong>Date:</strong> {order.date}</p>
      <p className="text-sm text-gray-500"><strong>Status:</strong> {order.status}</p>
      <p className="text-sm text-gray-500"><strong>Vendor:</strong> {order.vendor || 'N/A'}</p>
      <p className="text-sm text-gray-500"><strong>Estimate:</strong> {order.estimate ? `$${order.estimate.toFixed(2)}` : 'N/A'}</p>
    </div>
    
    <div>
      <h5 className="text-md font-semibold mb-2">Service Description</h5>
      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{order.description}</p>
    </div>

    <div className="flex justify-end pt-4">
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);


/**
 * Refund Requests Page
 * (Workflow Step 4 - Issues) - Logic matches new workflow
 */
const RefundRequests = () => {
  const [refunds, setRefunds] = useState(mockRefunds);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const handleAction = (id, action) => {
    if (action === 'Send to Finance') {
      setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'Sent to Finance' } : r));
    }
    if (action === 'Credit Wallet') {
      setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'Wallet Credited' } : r));
    }
  };

  const handleView = (refund) => {
    setModalContent(
      <ViewRefundDetails refund={refund} onClose={() => setModalOpen(false)} />
    );
    setModalOpen(true);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return <Badge text={status} color="yellow" />;
      case 'Sent to Finance': return <Badge text={status} color="blue" />; // Now red
      case 'Wallet Credited': return <Badge text={status} color="green" />;
      default: return <Badge text={status} color="gray" />;
    }
  };
  
  const getActions = (refund) => {
    switch (refund.status) {
      case 'Pending': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleView(refund)}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(refund.id, 'Send to Finance')}>Send to Finance</Button>
        </div>
      );
      case 'Sent to Finance': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleView(refund)}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction(refund.id, 'Credit Wallet')} className="text-green-600 hover:text-green-700 hover:bg-green-50">Mark as Credited</Button>
        </div>
      );
      case 'Wallet Credited': return (
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleView(refund)}>View</Button>
          <span className="text-sm text-green-700 font-medium ml-2">Completed</span>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">Refunds & Returns</h2>
      
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {refunds.map(refund => (
              <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{refund.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{refund.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{refund.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap"><Badge text={refund.reason} color="red" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{refund.item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(refund.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{getActions(refund)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Refund Request Details">
        {modalContent}
      </Modal>
    </div>
  );
};

// Modal Content for Viewing Refund
const ViewRefundDetails = ({ refund, onClose }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h4 className="text-lg font-semibold">Refund Request #{refund.id}</h4>
      <p className="text-sm text-gray-500"><strong>Original Order:</strong> #{refund.orderId}</p>
      <p className="text-sm text-gray-500"><strong>Customer:</strong> {refund.customer}</p>
      <p className="text-sm text-gray-500"><strong>Request Date:</strong> {refund.date}</p>
      <p className="text-sm text-gray-500"><strong>Status:</strong> {refund.status}</p>
      <p className="text-sm text-gray-500"><strong>Reason:</strong> {refund.reason}</p>
      <p className="text-sm text-gray-500"><strong>Item:</strong> {refund.item}</p>
    </div>
    
    <div>
      <h5 className="text-md font-semibold mb-2">Internal Notes</h5>
      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">{refund.notes}</p>
    </div>

    <div className="flex justify-end pt-4">
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);


/**
 * Vendor Updates Page
 */
const VendorUpdates = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleView = (vendor) => {
    setModalContent(
      <ViewVendorDetails vendor={vendor} onClose={() => setModalOpen(false)} />
    );
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">Vendor Updates</h2>
      
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockVendors.map(vendor => (
              <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vendor.status === 'Active' ? <Badge text="Active" color="green" /> : <Badge text="Inactive" color="gray" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{vendor.activeOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm" onClick={() => handleView(vendor)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Vendor Details">
        {modalContent}
      </Modal>
    </div>
  );
};

// Modal Content for Viewing Vendor
const ViewVendorDetails = ({ vendor, onClose }) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h4 className="text-lg font-semibold">{vendor.name}</h4>
      <p className="text-sm text-gray-500"><strong>Status:</strong> {vendor.status}</p>
      <p className="text-sm text-gray-500"><strong>Active Orders:</strong> {vendor.activeOrders}</p>
      <p className="text-sm text-gray-500"><strong>Partner Since:</strong> {vendor.since}</p>
    </div>
    
    <div>
      <h5 className="text-md font-semibold mb-2">Contact Information</h5>
      <p className="text-sm text-gray-500 flex items-center"><User size={14} className="mr-2" /> {vendor.contactPerson}</p>
      <p className="text-sm text-gray-500 flex items-center"><Mail size={14} className="mr-2" /> {vendor.contactEmail}</p>
    </div>

    <div className="flex justify-end pt-4">
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);

/**
 * Settings Page (NEW DUMMY CONTENT)
 */
const SettingsPage = () => {
  const [profile, setProfile] = useState({ name: 'Vendor Alex', email: 'alex@vendorstore.com' });
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900">Settings</h2>
      
      {/* Profile Settings */}
      <Card>
        <CardHeader 
          title="Profile" 
          subtitle="This information will be displayed publicly."
        />
        <CardContent className="space-y-4">
          <Input 
            id="name" 
            label="Full Name" 
            value={profile.name} 
            onChange={e => setProfile({...profile, name: e.target.value})}
            icon={<User />}
          />
          <Input 
            id="email" 
            label="Email Address" 
            type="email"
            value={profile.email} 
            onChange={e => setProfile({...profile, email: e.target.value})}
            icon={<Mail />}
          />
        </CardContent>
        <CardFooter className="text-right">
          <Button variant="primary">Save Profile</Button>
        </CardFooter>
      </Card>
      
      {/* Notifications Settings */}
      <Card>
        <CardHeader 
          title="Notifications" 
          subtitle="Manage how you receive notifications."
        />
        <CardContent className="space-y-4">
          <Toggle 
            label="Email Notifications"
            description="Receive email updates for new orders and status changes."
            enabled={notifEmail}
            setEnabled={setNotifEmail}
          />
          <Toggle 
            label="Push Notifications"
            description="Receive push notifications on your devices (coming soon)."
            enabled={notifPush}
            setEnabled={setNotifPush}
          />
        </CardContent>
        <CardFooter className="text-right">
          <Button variant="primary">Save Notifications</Button>
        </CardFooter>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader 
          title="Change Password" 
          subtitle="Update your password for better security."
        />
        <CardContent className="space-y-4">
          <Input 
            id="current-pass" 
            label="Current Password" 
            type="password"
            value={password.current} 
            onChange={e => setPassword({...password, current: e.target.value})}
            icon={<Lock />}
          />
          <Input 
            id="new-pass" 
            label="New Password" 
            type="password"
            value={password.new} 
            onChange={e => setPassword({...password, new: e.target.value})}
            icon={<Lock />}
          />
           <Input 
            id="confirm-pass" 
            label="Confirm New Password" 
            type="password"
            value={password.confirm} 
            onChange={e => setPassword({...password, confirm: e.target.value})}
            icon={<Lock />}
          />
        </CardContent>
        <CardFooter className="text-right">
          <Button variant="primary">Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

/**
 * Help Page (NEW DUMMY CONTENT)
 */
const HelpPage = () => {
  const faqs = [
    { q: 'How do I approve a new customer?', a: 'Navigate to the "Customer Verification" page. Find the customer with status "Pending Manager" and click the "Forward" button. This will send it to the next approval stage.' },
    { q: 'How do I assign a delivery person?', a: 'On the "Product Orders" page, find an order with the status "Invoiced". Click the "Assign Delivery" button, select a person from the list, and click "Assign".' },
    { q: 'What does the "Perishable" order type mean?', a: 'Perishable orders (like fresh seafood) are automatically forwarded to a specialized third-party vendor instead of being handled by internal pickers.' },
    { q: 'How are refunds processed?', a: 'On the "Refunds & Returns" page, find a "Pending" request. Click "Send to Finance" to get it approved. Once finance confirms, you can click "Mark as Credited" to complete the process.' },
  ];
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900">Help & Support</h2>
      
      {/* Contact Card */}
      <Card>
         <CardHeader 
          title="Contact Support" 
          subtitle="Can't find an answer? Reach out to us directly."
        />
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Button variant="primary" className="w-full md:w-auto">
            <Mail size={18} className="mr-2" /> Email Support
          </Button>
          <Button variant="secondary" className="w-full md:w-auto">
            <Phone size={18} className="mr-2" /> Call Us (9am-5pm)
          </Button>
        </CardContent>
      </Card>
      
      {/* FAQ Card */}
      <Card>
        <CardHeader 
          title="Frequently Asked Questions" 
        />
        <CardContent className="space-y-6 divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <h4 className="text-md font-semibold text-gray-900">{faq.q}</h4>
              <p className="text-sm text-gray-600 mt-2">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Updated nav items to match the new workflow
  const navItems = [
    { type: 'heading', text: 'Menu' },
    { type: 'link', id: 'dashboard', text: 'Dashboard', icon: <LayoutDashboard /> },
    { type: 'link', id: 'customers', text: 'Customer Verification', icon: <UserCheck /> },
    { type: 'link', id: 'product-orders', text: 'Product Orders', icon: <ShoppingCart /> },
    { type: 'link', id: 'service-orders', text: 'Service Orders', icon: <Settings /> },
    { type: 'link', id: 'refunds', text: 'Refunds & Returns', icon: <RefreshCcw /> },
    { type: 'link', id: 'vendors', text: 'Vendor Updates', icon: <Building /> },
    
    { type: 'heading', text: 'Tools' },
    { type: 'link', id: 'settings', text: 'Settings', icon: <Settings /> },
    { type: 'link', id: 'help', text: 'Help', icon: <HelpCircle /> },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard'); // Reset to dashboard view on logout
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview 
                  customers={mockCustomers} 
                  productOrders={mockProductOrders} 
                  serviceOrders={mockServiceOrders} 
                  refunds={mockRefunds}
                  onNavigate={setCurrentPage}
                />;
      case 'customers':
        return <CustomerVerification />;
      case 'product-orders':
        return <ProductOrders />;
      case 'service-orders':
        return <ServiceOrders />;
      case 'refunds':
        return <RefundRequests />;
      case 'vendors':
        return <VendorUpdates />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardOverview />;
    }
  };

  // If not logged in, show the Login Page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If logged in, show the Dashboard
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white text-gray-800 p-4 transform transition-transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex md:flex-col shadow-sm
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <AbrecoLogo />
            <span className="text-2xl font-bold text-gray-800">Abreco</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => {
            if (item.type === 'heading') {
              return <MenuHeading key={index} text={item.text} />;
            }
            if (item.type === 'link') {
              return (
                <SidebarLink
                  key={item.id}
                  icon={item.icon}
                  text={item.text}
                  active={currentPage === item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsSidebarOpen(false);
                  }}
                />
              );
            }
            return null;
          })}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto pt-4">          
          <div className="mt-4">
             <SidebarLink
              icon={<LogOut />}
              text="Logout"
              active={false}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </Button>
            
            {/* Header Title (contextual) */}
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
                {
                  (navItems.find(item => item.id === currentPage) || {text: 'Dashboard'}).text
                }
              </h1>
            </div>

            {/* Header Icons & User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </Button>
              
              {/* Profile Dropdown (NEW) */}
              <HeadlessMenu as="div" className="relative">
                <HeadlessMenu.Button className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500">
                  <div className="w-9 h-9 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center overflow-hidden font-semibold">
                    AV
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-800 text-left">Vendor Alex</p>
                    <p className="text-xs text-gray-500 text-left">Vendor Store</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                </HeadlessMenu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-1 py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setCurrentPage('settings')}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <Settings size={16} className="mr-2" />
                            Settings
                          </button>
                        )}
                      </HeadlessMenu.Item>
                       <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setCurrentPage('help')}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <HelpCircle size={16} className="mr-2" />
                            Help
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                    <div className="px-1 py-1">
                       <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <LogOut size={16} className="mr-2" />
                            Logout
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  </HeadlessMenu.Items>
                </Transition>
              </HeadlessMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}