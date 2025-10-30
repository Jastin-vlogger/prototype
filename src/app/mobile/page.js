"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  // We will use Lucide icons for this web-based mobile app
  LayoutDashboard, Package, ShoppingCart, CreditCard,
  Settings, CircleHelp, Search, Bell, ChevronRight,
  ChevronDown, Menu, X, MoreHorizontal, User, Lock, Mail, Building,
  UploadCloud, FileText, Clock, CheckCircle, XCircle, Loader, ShieldCheck,
  Package2, // Main Logo
  Calendar, // For Expiry Date
  Gavel, // For Bidding
  Info, // For Info Tooltip
  LogOut,
  MoveUpRight, MoveDownRight, PackageOpen, Boxes, DollarSign,
  ClipboardList, // For Statement of Account
  Plus, // For Quick Actions
  Briefcase, // For Quick Actions
  UserCheck, // For Profile
  ChevronRightSquare
} from 'lucide-react';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- A. REUSABLE HELPER & UI COMPONENTS (React-DOM)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * B1. Reusable Modal (React-DOM)
 */
const AppModal = ({ children, title, onClose, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${sizeClasses[size] || 'max-w-md'} rounded-2xl shadow-xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * B2. Reusable FormInput (React-DOM)
 */
const FormInput = ({ id, label, type = 'text', placeholder, value, onChange, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Simplified for mobile
      disabled={disabled}
      className={`block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm 
                 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                 disabled:bg-slate-100 disabled:text-slate-500`}
      placeholder={placeholder}
    />
  </div>
);

/**
 * B3. Reusable FormSelect (React-DOM)
 */
const FormSelect = ({ id, label, value, onChange, children, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm 
                 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                 disabled:bg-slate-100`}
    >
      {children}
    </select>
  </div>
);

/**
 * B4. Reusable ToggleSwitch (React-DOM)
 */
const ToggleSwitch = ({ id, label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <button
      id={id}
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? 'bg-red-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  </div>
);

/**
 * B5. Reusable PrimaryButton (React-DOM)
 */
const PrimaryButton = ({ children, onClick, className = '', type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white 
               bg-red-600 hover:bg-red-700 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
               disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

/**
 * B6. Reusable StatCard (React-DOM)
 */
const StatCard = ({ title, value, change, changeType, icon: Icon, details, highlight = false }) => {
  const ChangeIcon = changeType === 'positive' ? MoveUpRight : MoveDownRight;
  
  // Dynamic classes for highlight
  const cardClasses = highlight ? 'bg-gradient-to-br from-red-600 to-blue-700 text-white' : 'bg-white';
  const titleClasses = highlight ? 'text-red-100' : 'text-slate-500';
  const valueClasses = highlight ? 'text-white' : 'text-slate-900';
  const detailsClasses = highlight ? 'text-red-200' : 'text-slate-400';
  const iconBgClasses = highlight ? 'bg-white/20' : 'bg-slate-100';
  const iconColorClasses = highlight ? 'text-white' : 'text-slate-700';
  const changeClasses = highlight
    ? 'bg-white/20 text-white'
    : (changeType === 'positive' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50');

  return (
    <div className={`p-5 rounded-2xl shadow-lg flex flex-col justify-between ${cardClasses}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-lg ${iconBgClasses}`}>
          <Icon className={`w-6 h-6 ${iconColorClasses}`} />
        </div>
        <div className={`flex items-center text-sm font-medium p-2 rounded-full ${changeClasses}`}>
          <ChangeIcon className="w-4 h-4 mr-1" />
          {change}
        </div>
      </div>
      <div>
        <h3 className={`text-sm font-medium ${titleClasses}`}>{title}</h3>
        <p className={`text-3xl font-bold mt-1 ${valueClasses}`}>{value}</p>
        <p className={`text-xs mt-2 ${detailsClasses}`}>{details}</p>
      </div>
    </div>
  );
};

/**
 * B7. Reusable Card (React-DOM)
 */
const Card = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
    {noPadding ? children : <div className="p-5">{children}</div>}
  </div>
);

const CardHeader = ({ title, children }) => (
  <div className="flex justify-between items-center p-5 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    {children && <div>{children}</div>}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

/**
 * B8. Reusable SettingsItem (NEW)
 * Used in the settings page for navigation
 */
const SettingsItem = ({ title, description, icon: Icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg"
  >
    <div className="p-3 rounded-lg bg-red-100 text-red-600 mr-4">
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1 text-left">
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-400" />
  </button>
);


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- C. ONBOARDING & AUTH FLOW COMPONENTS (React-DOM)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * C1. LoginScreen
 */
const LoginScreen = ({ setUserState, setCurrentView, setNeedsPasswordChange }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'otp'
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState('vendor');

  // Handlers are identical to web
  const handleLogin = (userType) => {
    if (userType === 'new') {
      setUserState('approved');
      setNeedsPasswordChange(true);
    } else if (userType === 'existing') {
      setUserState('approved');
      setNeedsPasswordChange(false);
    } else if (userType === 'pendingDocs') {
      setUserState('pendingDocuments');
    } else if (userType === 'pendingApproval') {
      setUserState('pendingApproval');
    }
    setCurrentView('dashboard');
  };
  const handleSignup = () => setView('otp');
  const handleOtp = () => {
    setUserState('pendingDocuments');
    setCurrentView('dashboard');
  };
  
  const renderView = () => {
    switch (view) {
      case 'signup':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Create Account</h2>
            <FormSelect id="userType" label="I am a..." value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="company" label="Company Name" type="text" placeholder="Abreco Inc." />
            <FormInput id="email" label="Email Address" type="email" placeholder="you@company.com" />
            <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
            <PrimaryButton onClick={handleSignup}>Sign Up</PrimaryButton>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="font-medium text-red-600 hover:text-red-500">
                Log In
              </button>
            </p>
          </div>
        );
      case 'otp':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Verify OTP</h2>
            <p className="text-center text-sm text-slate-600">Enter the 6-digit code sent to your email.</p>
            <FormInput id="otp" label="OTP Code" type="text" placeholder="123456" />
            <PrimaryButton onClick={handleOtp}>Verify Account</PrimaryButton>
            <p className="text-center text-sm">
              Didn't get a code?{' '}
              <button className="font-medium text-red-600 hover:text-red-500">
                Resend
              </button>
            </p>
          </div>
        );
      case 'login':
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Portal Login</h2>
            <FormSelect id="userType" label="I am a..." value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="username" label="Username or Email" type="text" placeholder="vendor@company.com" />
            <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
            <FormSelect id="language" label="Preferred Language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </FormSelect>
            <PrimaryButton onClick={() => handleLogin('existing')}>Log In</PrimaryButton>
            <p className="text-center text-sm">
              New user?{' '}
              <button onClick={() => setView('signup')} className="font-medium text-red-600 hover:text-red-500">
                Register here
              </button>
            </p>
            
            {/* Simulation Controls */}
            <div className="my-6 border-t border-slate-200 pt-4">
              <p className="text-center text-xs font-semibold text-slate-500 uppercase">For Demo: Simulate Login As...</p>
              <div className="flex flex-col space-y-2 mt-3">
                <button onClick={() => handleLogin('existing')} className="w-full text-sm py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Approved Vendor
                </button>
                <button onClick={() => handleLogin('new')} className="w-full text-sm py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  New Vendor (1st Login)
                </button>
                <button onClick={() => handleLogin('pendingApproval')} className="w-full text-sm py-2 px-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                  Vendor (Docs in Review)
                </button>
                <button onClick={() => handleLogin('pendingDocs')} className="w-full text-sm py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                  Vendor (Needs to Upload Docs)
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Package2 className="w-16 h-16 text-red-600" />
        </div>
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

/**
 * C2. UploadDocumentsScreen
 */
const UploadDocumentsScreen = ({ docStatus, setDocStatus, paymentTerm, setPaymentTerm, setUserState }) => {
  const [expiryDate, setExpiryDate] = useState('');
  
  // Handlers and logic are identical
  const handleUpload = (docType) => {
    setDocStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
  };
  const allDocsUploaded = Object.values(docStatus).every(s => s === 'uploaded');
  const paymentTermSelected = paymentTerm && paymentTerm !== 'default';
  
  const DocumentCard = ({ title, docKey, status }) => (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {status === 'missing' && <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Missing</span>}
        {status === 'uploaded' && <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Uploaded</span>}
      </div>
      <p className="text-sm text-slate-500 mt-2">Upload your business trade license or equivalent KYC document.</p>
      <button 
        onClick={() => handleUpload(docKey)}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <UploadCloud className="w-5 h-5" />
        {status === 'missing' ? 'Upload Document' : 'Re-upload'}
      </button>
    </Card>
  );
  
  return (
    <div className="w-full min-h-screen bg-slate-100 p-4">
      <div className="flex justify-center my-6">
          <Package2 className="w-12 h-12 text-red-600" />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Welcome, Vendor!</h1>
        <p className="text-lg text-slate-600 mt-2">Please upload your documents.</p>
      </div>
      
      <div className="space-y-6">
        <DocumentCard title="Trade License" docKey="tradeLicense" status={docStatus.tradeLicense} />
        <DocumentCard title="KYC Documents" docKey="kyc" status={docStatus.kyc} />
        
        <Card>
          <FormInput
            id="expiry"
            label="Trade License Expiry Date"
            type="date"
            value={expiryDate}
            onChange={(val) => setExpiryDate(val)}
          />
        </Card>
        
        <Card>
          <FormSelect
            id="paymentTerm"
            label="Payment Terms"
            value={paymentTerm}
            onChange={(e) => setPaymentTerm(e.target.value)}
          >
            <option value="default">Select a payment term...</option>
            <option value="Weekly">Weekly</option>
            <option value="30 Days">30 Days</option>
            <option value="60 Days">60 Days</option>
          </FormSelect>
        </Card>
        
        <PrimaryButton 
          onClick={() => setUserState('pendingApproval')}
          disabled={!allDocsUploaded || !expiryDate || !paymentTermSelected}
        >
          Submit for Review
        </PrimaryButton>
      </div>
    </div>
  );
};

/**
 * C3. WaitingForApprovalScreen
 */
const WaitingForApprovalScreen = ({ setUserState, setNeedsPasswordChange, docStatus, paymentTerm }) => (
  <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <div className="flex flex-col items-center text-center">
        <Loader className="w-16 h-16 text-red-600 animate-spin mb-6" />
        <h1 className="text-3xl font-bold text-slate-900">Application Submitted!</h1>
        <p className="text-lg text-slate-600 mt-3">Your documents are under review.</p>
        
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 w-full text-left space-y-3">
          <h4 className="font-semibold text-lg text-slate-800">Submitted Info:</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Trade License</span>
            <span className="text-sm font-medium text-green-600">Uploaded</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">KYC Documents</span>
            <span className="text-sm font-medium text-green-600">Uploaded</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3 mt-3">
            <span className="text-sm font-medium">Payment Term</span>
            <span className="text-sm font-semibold text-red-600">{paymentTerm}</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg w-full">
          <h4 className="font-semibold text-slate-800">Status:</h4>
          <p className="text-base text-yellow-600 font-medium">Pending 2-Level Approval</p>
        </div>
        
        <div className="mt-8 border-t border-slate-200 pt-6 w-full">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase mb-3">For Demo:</p>
          <PrimaryButton onClick={() => {
            setUserState('approved');
            setNeedsPasswordChange(true);
          }}>
            Simulate Admin Approval
          </PrimaryButton>
        </div>
      </div>
    </Card>
  </div>
);

/**
 * C4. ForcePasswordChangeModal
 */
const ForcePasswordChangeModal = ({ setNeedsPasswordChange }) => (
  <AppModal title="Create New Password" onClose={() => {}}> {/* No close button */}
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Welcome! As a security measure, you must create a new password.
      </p>
      <FormInput id="newPass" label="New Password" type="password" placeholder="••••••••" />
      <FormInput id="confirmPass" label="Confirm New Password" type="password" placeholder="••••••••" />
      <PrimaryButton onClick={() => setNeedsPasswordChange(false)}>
        Set New Password
      </PrimaryButton>
    </div>
  </AppModal>
);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- D. FULL PORTAL PAGE COMPONENTS (React-DOM)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * D1. DashboardView (REWORKED)
 */
const DashboardView = ({ setCurrentView }) => {
  return (
    <div className="space-y-6">
      {/* --- Stat Cards --- */}
      <StatCard 
        title="Total Orders" 
        value="5,123" 
        change="+15.8%" 
        changeType="positive" 
        icon={ShoppingCart} 
        details="Orders vs last month"
        highlight={true}
      />
      <StatCard 
        title="Pending Shipments" 
        value="345" 
        change="-9%" 
        changeType="negative" 
        icon={PackageOpen} 
        details="Orders vs last month" 
      />
      <StatCard 
        title="Available Stock" 
        value="68.50" 
        change="-8%" 
        changeType="negative" 
        icon={Boxes} 
        details="Orders vs last month" 
      />
      
      {/* --- Quick Actions (NEW) --- */}
      <Card>
        <CardHeader title="Quick Actions" />
        <CardContent className="flex gap-4">
          <button 
            onClick={() => setCurrentView('products')}
            className="flex-1 flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg"
          >
            <Plus className="w-8 h-8 text-red-600" />
            <span className="text-sm font-medium text-red-700 mt-2">Add Product</span>
          </button>
          <button 
            onClick={() => setCurrentView('orders')}
            className="flex-1 flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
          >
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 mt-2">View Orders</span>
          </button>
        </CardContent>
      </Card>
      
      {/* --- Recent Activity (NEW) --- */}
      <Card>
        <CardHeader title="Recent Activity" />
        <CardContent>
          <ul className="divide-y divide-slate-200">
            <li className="flex items-center py-3">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <p className="text-sm text-slate-600">Order <span className="font-medium text-slate-800">#PO-10562</span> was delivered.</p>
              <span className="text-xs text-slate-400 ml-auto">1h ago</span>
            </li>
            <li className="flex items-center py-3">
              <Package className="w-6 h-6 text-blue-500 mr-3" />
              <p className="text-sm text-slate-600">New product <span className="font-medium text-slate-800">"KM-B-001"</span> was approved.</p>
              <span className="text-xs text-slate-400 ml-auto">4h ago</span>
            </li>
            <li className="flex items-center py-3">
              <XCircle className="w-6 h-6 text-red-500 mr-3" />
              <p className="text-sm text-slate-600">Bid for <span className="font-medium text-slate-800">"OCT-G-004"</span> was rejected.</p>
              <span className="text-xs text-slate-400 ml-auto">1d ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * D2. ProductManagementPage
 */
const ProductManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, type: 'product', name: 'KitchenMaster Blender', sku: 'KM-B-001', price: 170.00, status: 'Approved', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P1' },
    { id: 2, type: 'product', name: 'Organic Cotton Towels', sku: 'OCT-G-004', price: 80.00, status: 'Pending', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P2' },
  ]);
  const filteredProducts = useMemo(() => products.filter(p => p.type === (activeTab === 'products' ? 'product' : 'service')), [products, activeTab]);
  const handleAddProduct = (newProduct) => setProducts(prev => [...prev, newProduct]);

  const StatusBadge = ({ status }) => {
    if (status === 'Approved') return <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{status}</span>;
    if (status === 'Pending') return <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{status}</span>;
    if (status === 'Rejected') return <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{status}</span>;
    return null;
  };
  
  const TabButton = ({ label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 py-3 text-sm font-medium text-center ${
        activeTab === tabName 
          ? 'border-b-2 border-red-600 text-red-600' 
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {showAddModal && <AppModal title="Add New Entry" onClose={() => setShowAddModal(false)} size="lg">
        {/* Placeholder: Full Add Product Form would go here */}
        <p className="text-slate-600 mb-4">This is where the full "Add Product" form would live, with inputs for name, SKU, price, description, images, etc.</p>
        <PrimaryButton onClick={() => setShowAddModal(false)}>Close</PrimaryButton>
      </AppModal>}
      
      <PrimaryButton onClick={() => setShowAddModal(true)} className="mb-4">
        <Plus className="w-5 h-5 mr-1" />
        Add New Entry
      </PrimaryButton>
      
      <div className="flex border-b border-slate-200 mb-4">
        <TabButton label="Products" tabName="products" />
        <TabButton label="Services" tabName="services" />
      </div>
      
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <div className="flex items-center">
              <img src={product.image} className="w-12 h-12 rounded-lg mr-4" alt={product.name} />
              <div className="flex-1">
                <p className="text-base font-medium text-slate-900">{product.name}</p>
                <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                <p className="text-sm text-slate-500">AED {product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4">
              <StatusBadge status={product.status} />
              <button className="text-red-600"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

/**
 * D4. OrderManagementPage
 */
const OrderManagementPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = [
    { id: 'PO-10562', date: '2025-10-28', amount: 1250.00, status: 'GRN Received' },
    { id: 'PO-10561', date: '2025-10-25', amount: 800.50, status: 'Shipped' },
  ];
  
  const StatusBadge = ({ status }) => {
    if (status === 'GRN Received') return <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{status}</span>;
    if (status === 'Shipped') return <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{status}</span>;
    if (status === 'Pending Pickup') return <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{status}</span>;
    return null;
  };

  return (
    <>
      {selectedOrder && (
        <AppModal title={`PO Details: ${selectedOrder.id}`} onClose={() => setSelectedOrder(null)}>
          <div className="space-y-4">
            <p><span className="font-medium text-slate-500">Status:</span> {selectedOrder.status}</p>
            <p><span className="font-medium text-slate-500">Amount:</span> AED {selectedOrder.amount.toFixed(2)}</p>
            <p><span className="font-medium text-slate-500">Date:</span> {selectedOrder.date}</p>
            <p className="text-slate-600 mt-4">This is where line items, shipping details, and tracking information for the PO would be displayed.</p>
            <PrimaryButton onClick={() => setSelectedOrder(null)}>Close</PrimaryButton>
          </div>
        </AppModal>
      )}
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-medium text-red-600">{order.id}</p>
                <p className="text-sm text-slate-500">{order.date}</p>
              </div>
              <p className="text-lg font-semibold text-slate-800">AED {order.amount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4">
              <StatusBadge status={order.status} />
              <button onClick={() => setSelectedOrder(order)} className="text-sm font-medium text-red-600">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

/**
 * D6. BiddingModulePage
 */
const BiddingModulePage = () => {
  const [bids, setBids] = useState({ 'KM-B-001': { price: '', notes: '' }, 'OCT-G-004': { price: '', notes: '' } });
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedBids, setSubmittedBids] = useState({});
  
  const products = [
    { id: 1, name: 'KitchenMaster Blender', sku: 'KM-B-001', highBid: 150.00, quantity: 100, image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P1' },
    { id: 2, name: 'Organic Cotton Towels', sku: 'OCT-G-004', highBid: 75.00, quantity: 500, image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P2' },
  ];
  
  // Handlers
  const handleBidChange = (sku, field, value) => setBids(prev => ({ ...prev, [sku]: { ...prev[sku], [field]: value } }));
  const getEstimatedTotal = (sku, quantity) => {
    const price = parseFloat(bids[sku].price);
    return (!price || isNaN(price)) ? 0 : price * quantity;
  };
  const handleSubmitBid = (sku) => {
    const submittedPrice = parseFloat(bids[sku].price);
    if (isNaN(submittedPrice) || submittedPrice <= 0) return;
    setShowSuccess(true);
    setSubmittedBids(prev => ({ ...prev, [sku]: submittedPrice }));
  };

  return (
    <>
      {showSuccess && (
        <AppModal title="Bid Submitted!" onClose={() => setShowSuccess(false)} size="sm">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Success!</h3>
            <p className="text-sm text-slate-600 mb-6">Your bid has been submitted.</p>
            <PrimaryButton onClick={() => setShowSuccess(false)} className="w-auto mx-auto">
              Close
            </PrimaryButton>
          </div>
        </AppModal>
      )}

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm">Place your best price to win the PO. Admin will see the lowest price.</p>
      </div>
      
      <div className="space-y-6">
        {products.map((product) => {
          const submittedPrice = submittedBids[product.sku];
          const isSubmitted = typeof submittedPrice === 'number';
          let bidStatus = null;
          if (isSubmitted) {
            if (submittedPrice <= product.highBid) bidStatus = 'best';
            else if (submittedPrice <= product.highBid * 1.1) bidStatus = 'good';
            else if (submittedPrice > product.highBid * 1.1) bidStatus = 'high';
          }
          
          let cardClasses = '';
          if (isSubmitted) {
            if (bidStatus === 'best') cardClasses = 'bg-green-50 border border-green-400';
            else if (bidStatus === 'good') cardClasses = 'bg-orange-50 border border-orange-400';
            else if (bidStatus === 'high') cardClasses = 'bg-red-50 border border-red-400';
          }

          return (
            <Card key={product.id} className={cardClasses}>
              {/* Product Info */}
              <div className="flex items-center">
                <img src={product.image} className="w-12 h-12 rounded-lg mr-4" alt={product.name} />
                <div className="flex-1">
                  <p className="text-base font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-sm text-slate-500">Wanted Qty:</span>
                <span className="text-sm font-medium text-slate-900">{product.quantity} units</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-slate-500">Your Status:</span>
                {isSubmitted ? (
                  <>
                    {bidStatus === 'best' && <span className="text-sm font-semibold text-white bg-green-500 px-3 py-0.5 rounded-full">Lowest Bid</span>}
                    {bidStatus === 'good' && <span className="text-sm font-semibold text-white bg-orange-500 px-3 py-0.5 rounded-full">Good Bid</span>}
                    {bidStatus === 'high' && <span className="text-sm font-semibold text-white bg-red-600 px-3 py-0.5 rounded-full">High Bid</span>}
                  </>
                ) : <span className="text-sm font-medium text-slate-400 italic">Not submitted</span>}
              </div>
              
              {/* Bidding Area */}
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                <FormInput
                  label="Your Price per Unit (AED)"
                  type="number"
                  placeholder="e.g., 145.00"
                  value={bids[product.sku].price}
                  onChange={(val) => handleBidChange(product.sku, 'price', val)}
                  disabled={isSubmitted}
                />
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-slate-500">Est. Total:</span>
                    <p className="text-xl font-bold text-red-600">
                      AED {getEstimatedTotal(product.sku, product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <PrimaryButton
                    onClick={() => handleSubmitBid(product.sku)}
                    disabled={!bids[product.sku].price || isSubmitted}
                    className="w-auto"
                  >
                    {isSubmitted ? 'Submitted' : 'Submit Bid'}
                  </PrimaryButton>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

/**
 * D7. PaymentPage (NEW - Detailed)
 */
const PaymentPage = () => {
  const payments = [
    { id: 'INV-3012', date: '2025-10-25', amount: 1250.00, status: 'Paid' },
    { id: 'INV-3008', date: '2025-10-18', amount: 800.50, status: 'Paid' },
    { id: 'INV-3005', date: '2025-10-11', amount: 4320.00, status: 'Paid' },
  ];
  return (
    <Card>
      <CardHeader title="Payment History" />
      <CardContent>
        <ul className="divide-y divide-slate-200">
          {payments.map(p => (
            <li key={p.id} className="flex justify-between items-center py-4">
              <div>
                <p className="text-base font-medium text-slate-800">{p.id}</p>
                <p className="text-sm text-slate-500">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-slate-800">AED {p.amount.toFixed(2)}</p>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{p.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

/**
 * D8. StatementOfAccountPage (NEW - Detailed)
 */
const StatementOfAccountPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="text-center">
          <p className="text-sm font-medium text-slate-500">Current Balance</p>
          <p className="text-4xl font-bold text-red-600 mt-1">AED 8,530.00</p>
          <p className="text-sm text-slate-500 mt-2">As of 30 Oct 2025</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader title="Download Statements" />
        <CardContent className="space-y-3">
          <FormSelect id="month" label="Select Month">
            <option>October 2025</option>
            <option>September 2025</option>
            <option>August 2025</option>
          </FormSelect>
          <PrimaryButton onClick={() => {
            // In a real app, this would trigger a download.
            // For the demo, we use a simple alert.
            alert("Downloading statement for the selected month...");
          }}>
            <FileText className="w-5 h-5 mr-2" />
            Download PDF
          </PrimaryButton>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * D9. SettingsPage (REWORKED)
 */
const SettingsPage = ({ setCurrentView }) => {
  return (
    <div className="space-y-4">
      <SettingsItem 
        title="My Profile"
        description="View and edit your company details"
        icon={UserCheck}
        onClick={() => alert('Profile page placeholder')}
      />
      <SettingsItem 
        title="Payments"
        description="View your payment history"
        icon={CreditCard}
        onClick={() => setCurrentView('payments')}
      />
      <SettingsItem 
        title="Statement of Account"
        description="Download your monthly statement (SOP)"
        icon={ClipboardList}
        onClick={() => setCurrentView('soa')}
      />
      <SettingsItem 
        title="Help & Support"
        description="Get help and contact us"
        icon={CircleHelp}
        onClick={() => setCurrentView('help')}
      />
    </div>
  );
};

/**
 * D10. HelpPage (NEW - Detailed)
 */
const HelpPage = () => {
  const faqs = [
    { q: 'How do I submit a bid?', a: 'Navigate to the "Bidding" tab, enter your price per unit in the active items, and click "Submit Bid".' },
    { q: 'Where can I find my payments?', a: 'Go to Settings > Payments to see your full payment history.' },
    { q: 'How do I download my Statement of Account (SOP)?', a: 'Go to Settings > Statement of Account, select the month, and click Download.' },
  ];
  return (
    <Card>
      <CardHeader title="Help & Support" />
      <CardContent>
        <h4 className="text-lg font-semibold text-slate-800 mb-3">FAQs</h4>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="pb-4 border-b border-slate-200 last:border-b-0">
              <h5 className="font-semibold text-slate-700">{faq.q}</h5>
              <p className="text-sm text-slate-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- E. NEW MOBILE-SPECIFIC COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * E1. Page Header (NEW)
 * Sits at the top of each scrollable page
 */
const PageHeader = ({ currentView, onLogout }) => {
  const viewTitles = {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    payments: 'Payments',
    soa: 'Statement',
    bidding: 'Bidding',
    settings: 'Settings',
    help: 'Help',
  };
  
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-slate-900">
        {viewTitles[currentView] || 'Portal'}
      </h1>
      <button onClick={onLogout} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
        <LogOut className="w-6 h-6" />
      </button>
    </header>
  );
};

/**
 * E2. Bottom Nav Bar (NEW)
 * Sits fixed at the bottom of the screen
 */
const BottomNavBar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'bidding', name: 'Bidding', icon: Gavel },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];
  
  // These pages are "nested" under settings
  const hiddenViews = ['payments', 'soa', 'help'];
  
  let activeView = currentView;
  if (hiddenViews.includes(currentView)) {
    activeView = 'settings'; // Highlight "Settings" if we are on a nested page
  }
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.05)] border-t border-slate-200 flex justify-around">
      {navItems.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center w-1/5 p-2 rounded-lg ${
              isActive ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- F. MAIN APP COMPONENT (State Machine) - UPDATED
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
export default function App() {
  const [userState, setUserState] = useState('loggedOut');
  const [currentView, setCurrentView] = useState('dashboard');
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  
  const [docStatus, setDocStatus] = useState({ tradeLicense: 'missing', kyc: 'missing' });
  const [paymentTerm, setPaymentTerm] = useState('default');
  
  // Handlers
  const handleLogout = () => {
    setUserState('loggedOut');
    setCurrentView('dashboard');
    setNeedsPasswordChange(false);
    setDocStatus({ tradeLicense: 'missing', kyc: 'missing' });
    setPaymentTerm('default');
  };

  // --- 1. RENDER AUTH/LOGIN FLOW ---
  if (userState === 'loggedOut') {
    return (
      <div className="max-w-md mx-auto bg-slate-100 shadow-2xl">
        <LoginScreen 
          setUserState={setUserState}
          setCurrentView={setCurrentView}
          setNeedsPasswordChange={setNeedsPasswordChange}
        />
      </div>
    );
  }

  // --- 2. RENDER DOCUMENT UPLOAD FLOW ---
  if (userState === 'pendingDocuments') {
    return (
      <div className="max-w-md mx-auto bg-slate-100 shadow-2xl min-h-screen">
        <UploadDocumentsScreen 
          docStatus={docStatus}
          setDocStatus={setDocStatus}
          paymentTerm={paymentTerm}
          setPaymentTerm={setPaymentTerm}
          setUserState={setUserState} 
        />
      </div>
    );
  }

  // --- 3. RENDER PENDING APPROVAL FLOW ---
  if (userState === 'pendingApproval') {
    return (
      <div className="max-w-md mx-auto bg-slate-100 shadow-2xl min-h-screen">
        <WaitingForApprovalScreen 
          setUserState={setUserState}
          setNeedsPasswordChange={setNeedsPasswordChange}
          docStatus={docStatus}
          paymentTerm={paymentTerm}
        />
      </div>
    );
  }

  // --- 4. RENDER FULL, APPROVED PORTAL ---
  if (userState === 'approved') {
    const MainContent = () => {
      switch (currentView) {
        case 'products': return <ProductManagementPage />;
        case 'orders': return <OrderManagementPage />;
        case 'payments': return <PaymentPage />;
        case 'soa': return <StatementOfAccountPage />;
        case 'bidding': return <BiddingModulePage />;
        case 'settings': return <SettingsPage setCurrentView={setCurrentView} />;
        case 'help': return <HelpPage />;
        case 'dashboard':
        default: return <DashboardView setCurrentView={setCurrentView} />;
      }
    };
    
    return (
      <div className="max-w-md mx-auto bg-slate-100 shadow-2xl min-h-screen flex flex-col">
        
        {/* --- Main Content Area --- */}
        {/* Added pb-20 for padding to ensure content isn't hidden by the bottom nav */}
        <main className="flex-grow p-4 pb-20">
          <PageHeader currentView={currentView} onLogout={handleLogout} />
          <MainContent />
        </main>
        
        {/* --- Bottom Nav Bar --- */}
        <BottomNavBar currentView={currentView} setCurrentView={setCurrentView} />
        
        {/* --- Password Change Modal (if needed) --- */}
        {needsPasswordChange && (
          <ForcePasswordChangeModal setNeedsPasswordChange={setNeedsPasswordChange} />
        )}
      </div>
    );
  }
  
  return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
}


