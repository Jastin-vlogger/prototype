"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard, ShoppingCart, CreditCard,
  Settings, CircleHelp, Search, Bell, ChevronRight,
  ChevronDown, Menu, X, User, Lock, Mail, Building,
  UploadCloud, FileText, Clock, CheckCircle, XCircle, Loader, ShieldCheck,
  Package2, // Main Logo
  Languages, // For Language Selector
  ClipboardList, // For SOA
  Info, // For Info Tooltip
  Package, // Re-imported for Product Mgmt
  Edit, Trash2, Eye, Plus, Filter, Tag, Layers, Ruler, Barcode, 
  Image as ImageIcon,
  AlertCircle, Truck, FileCheck,
  Copy, FilePenLine, ArrowRight, Wrench,
  DollarSign, // Added DollarSign icon here
  Briefcase, Calendar, Globe, FileSignature, CheckSquare, ShieldAlert, // New icons for Service Flow
  History, Download, ListFilter, MapPin, CalendarDays, Receipt, Phone, Printer, RotateCcw,
  MoreHorizontal, ArrowUpDown, Play, // Added Play icon
  FileQuestion, ClipboardCheck, Timer, HardHat, Gavel, // New Icons for Service RFQ
  Trophy, Frown, TrendingDown, TrendingUp, Minus, // Icons for Bidding
  FileSpreadsheet, AlertTriangle, Ban, ScrollText, PieChart, BarChart3, // New icons for Payments
  Smartphone, Mail as MailIcon, Globe as GlobeIcon // Icons for Settings
} from 'lucide-react';


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- REUSABLE HELPER & UI COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const Modal = ({ children, title, onClose, size = 'md', footer }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-6xl',
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm font-sans antialiased text-slate-600 text-sm"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${sizeClasses[size] || 'max-w-md'} rounded-2xl shadow-2xl flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200 flex-shrink-0 bg-white rounded-t-2xl">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto flex-grow bg-slate-50/50">
          {children}
        </div>
        {footer && (
            <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl flex-shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {footer}
            </div>
        )}
      </div>
    </div>
  );
};

const FormInput = ({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, disabled = false, required = false, hint = null, readOnly = false, maxLength }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        className={`block w-full ${Icon ? 'ps-9' : 'ps-4'} pe-4 py-2 border border-slate-300 rounded-lg shadow-sm transition-all duration-150
                   focus:ring-2 focus:ring-red-500/20 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100 disabled:text-slate-500 read-only:bg-slate-100 read-only:text-slate-500`}
        placeholder={placeholder}
      />
    </div>
    {hint && <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Info className="w-3 h-3"/> {hint}</p>}
  </div>
);

const FormSelect = ({ id, label, icon: Icon, value, onChange, children, disabled = false, required = false, hint = null }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`block w-full ${Icon ? 'ps-9' : 'ps-4'} pe-10 py-2 border border-slate-300 rounded-lg shadow-sm appearance-none
                   focus:ring-2 focus:ring-red-500/20 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100 disabled:text-slate-500 bg-white`}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
    {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
  </div>
);

const ToggleSwitch = ({ id, label, enabled, setEnabled, disabled = false, helpText }) => (
  <div className="flex items-center justify-between">
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {helpText && <p className="text-xs text-slate-500">{helpText}</p>}
    </div>
    <button
      id={id}
      type="button"
      onClick={() => !disabled && setEnabled(!enabled)}
      disabled={disabled}
      className={`${
        enabled ? 'bg-red-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  </div>
);

const PrimaryButton = ({ children, onClick, className = '', type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
               bg-red-600 hover:bg-red-700 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
               disabled:bg-gray-400 disabled:cursor-not-allowed 
               transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
);

const StatCard = ({ title, value, change, changeType, icon, details, variant = 'white' }) => {
  const IconComponent = icon;
  
  const variants = {
    white: {
        card: 'bg-white border border-slate-100 shadow-xl',
        title: 'text-slate-500',
        value: 'text-slate-900',
        details: 'text-slate-400',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-700',
        changePositive: 'text-green-600 bg-green-50',
        changeNegative: 'text-red-600 bg-red-50'
    },
    orange: {
        card: 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-200/50 shadow-xl text-white',
        title: 'text-orange-50 font-medium',
        value: 'text-white drop-shadow-sm',
        details: 'text-orange-100',
        iconBg: 'bg-white/20 backdrop-blur-sm',
        iconColor: 'text-white',
        changePositive: 'text-white bg-white/20 backdrop-blur-sm',
        changeNegative: 'text-white bg-white/20 backdrop-blur-sm'
    },
    blue: {
        card: 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-200/50 shadow-xl text-white',
        title: 'text-blue-50 font-medium',
        value: 'text-white drop-shadow-sm',
        details: 'text-orange-100',
        iconBg: 'bg-white/20 backdrop-blur-sm',
        iconColor: 'text-white',
        changePositive: 'text-white bg-white/20 backdrop-blur-sm',
        changeNegative: 'text-white bg-white/20 backdrop-blur-sm'
    },
    purple: {
        card: 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-200/50 shadow-xl text-white',
        title: 'text-indigo-50 font-medium',
        value: 'text-white drop-shadow-sm',
        details: 'text-indigo-100',
        iconBg: 'bg-white/20 backdrop-blur-sm',
        iconColor: 'text-white',
        changePositive: 'text-white bg-white/20 backdrop-blur-sm',
        changeNegative: 'text-white bg-white/20 backdrop-blur-sm'
    },
    green: {
        card: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-200/50 shadow-xl text-white',
        title: 'text-emerald-50 font-medium',
        value: 'text-white drop-shadow-sm',
        details: 'text-emerald-100',
        iconBg: 'bg-white/20 backdrop-blur-sm',
        iconColor: 'text-white',
        changePositive: 'text-white bg-white/20 backdrop-blur-sm',
        changeNegative: 'text-white bg-white/20 backdrop-blur-sm'
    }
  };

  const currentVariant = variants[variant] || variants.white;

  return (
    <div className={`p-6 rounded-3xl flex flex-col justify-between h-full ${currentVariant.card}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3.5 rounded-2xl ${currentVariant.iconBg}`}>
          <IconComponent className={`w-7 h-7 ${currentVariant.iconColor}`} />
        </div>
        <div className={`flex items-center text-xs font-bold py-1 px-2.5 rounded-full ${changeType === 'positive' ? currentVariant.changePositive : currentVariant.changeNegative}`}>
          {change}
        </div>
      </div>
      <div>
        <h3 className={`text-sm tracking-wide ${currentVariant.title}`}>{title}</h3>
        <p className={`text-3xl font-extrabold mt-1 tracking-tight ${currentVariant.value}`}>{value}</p>
        <p className={`text-xs mt-3 opacity-90 ${currentVariant.details}`}>{details}</p>
      </div>
    </div>
  );
};

const Card = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
    {noPadding ? children : <div className="p-5">{children}</div>}
  </div>
);

const CardHeader = ({ title, children }) => (
  <div className="flex flex-col sm:flex-row justify-between sm:items-center p-5 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    {children && <div className="mt-3 sm:mt-0">{children}</div>}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        'Approved': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
        'Rejected': 'bg-rose-50 text-rose-700 border-rose-200',
        'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
        'New': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
        'Accepted': 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
        'In Progress': 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
        'Delivered': 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20',
        'Completed': 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20',
        'Quoted': 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20',
        'Work Order': 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20',
        'Declined': 'bg-gray-100 text-gray-500 ring-1 ring-gray-400/20',
        'Paid': 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20',
        'Overdue': 'bg-red-100 text-red-800 ring-1 ring-red-600/20',
        'Partial': 'bg-orange-100 text-orange-800 ring-1 ring-orange-600/20',
        'Under Review': 'bg-blue-50 text-blue-700 ring-1 ring-blue-400/20',
        'Resolved': 'bg-green-50 text-green-700 ring-1 ring-green-400/20',
    };
    const icons = {
        'Approved': CheckCircle,
        'Pending': Clock,
        'Rejected': XCircle,
        'Draft': FileText,
        'Accepted': CheckCircle,
        'Delivered': Truck,
        'Quoted': ClipboardCheck,
        'Work Order': HardHat,
        'Completed': CheckCircle,
        'Paid': CheckCircle,
        'Overdue': AlertTriangle,
        'Partial': PieChart,
        'Resolved': CheckCircle
    };
    const Icon = icons[status] || Info;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
            <Icon className="w-3.5 h-3.5 me-1.5" /> {status === 'Pending' ? 'Pending Approval' : status}
        </span>
    );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- ONBOARDING & AUTH FLOW COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const LoginScreen = ({ setUserState, setCurrentView, setNeedsPasswordChange, language, setLanguage }) => {
  const [view, setView] = useState('login');
  const [userType, setUserType] = useState('vendor');

  const handleLogin = (uType) => {
    if (uType === 'new') {
      setUserState('approved');
      setNeedsPasswordChange(false);
    } else if (uType === 'existing') {
      setUserState('approved');
      setNeedsPasswordChange(false);
    } else if (uType === 'pendingDocs') {
      setUserState('pendingDocuments');
    } else if (uType === 'pendingApproval') {
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
            <h2 className="text-3xl font-bold text-center text-slate-900">Create Vendor Account</h2>
            <FormSelect id="userType" label="I am a..." icon={User} value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="company" label="Company Name" type="text" icon={Building} placeholder="Abreco Inc." />
            <FormInput id="email" label="Email Address" type="email" icon={Mail} placeholder="you@company.com" />
            <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            <PrimaryButton onClick={handleSignup}>Sign Up</PrimaryButton>
            <p className="text-center text-sm">Already have an account? <button onClick={() => setView('login')} className="font-medium text-red-600 hover:text-red-500">Log In</button></p>
          </div>
        );
      case 'otp':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Verify OTP</h2>
            <p className="text-center text-sm text-slate-600">Enter the 6-digit code sent to your email.</p>
            <FormInput id="otp" label="OTP Code" type="text" icon={ShieldCheck} placeholder="123456" />
            <PrimaryButton onClick={handleOtp}>Verify Account</PrimaryButton>
          </div>
        );
      case 'login':
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Vendor Portal Login</h2>
            <FormSelect id="userType" label="I am a..." icon={User} value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="username" label="Username or Email" type="text" icon={User} placeholder="vendor@company.com" />
            <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            <FormSelect id="language" label="Preferred Language" icon={Languages} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </FormSelect>
            <PrimaryButton onClick={() => handleLogin('existing')}>Log In</PrimaryButton>
            <p className="text-center text-sm">New vendor? <button onClick={() => setView('signup')} className="font-medium text-red-600 hover:text-red-500">Register here</button></p>
            
            <div className="my-6 border-t border-slate-200 pt-4">
              <p className="text-center text-xs font-semibold text-slate-500 uppercase">For Demo: Simulate Login As...</p>
              <div className="flex flex-col space-y-2 mt-3">
                <button onClick={() => handleLogin('existing')} className="w-full text-sm py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Approved Vendor</button>
                <button onClick={() => handleLogin('new')} className="w-full text-sm py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">New Vendor (1st Login)</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-sans antialiased text-slate-600 text-sm">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-blue-600 items-center justify-center p-12 text-white relative">
        <div className="flex flex-col items-center text-center">
          <Package2 className="w-24 h-24 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Abreco Vendor Portal</h1>
          <p className="text-lg text-red-100">Manage your products, orders, and payments all in one place.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

const UploadDocumentsScreen = ({ docStatus, setDocStatus, paymentTerm, setPaymentTerm, setUserState }) => {
  const [expiryDate, setExpiryDate] = useState('');
  const handleUpload = (docType) => setDocStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
  const allDocsUploaded = Object.values(docStatus).every(s => s === 'uploaded');
  const paymentTermSelected = paymentTerm && paymentTerm !== 'default';

  const DocumentCard = ({ title, docKey, status }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-red-600 me-3" />
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        {status === 'missing' && <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Missing</span>}
        {status === 'uploaded' && <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Uploaded</span>}
      </div>
      <button onClick={() => handleUpload(docKey)} className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
        <UploadCloud className="w-5 h-5" /> {status === 'missing' ? 'Upload Document' : 'Re-upload'}
      </button>
    </div>
  );
  
  return (
    <div className="min-h-screen w-full bg-slate-100 p-4 md:p-8 font-sans antialiased text-slate-600 text-sm">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, Vendor!</h1>
          <p className="text-lg text-slate-600 mt-2">Please upload required documents.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DocumentCard title="Trade License" docKey="tradeLicense" status={docStatus.tradeLicense} />
          <DocumentCard title="KYC Documents" docKey="kyc" status={docStatus.kyc} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <label className="block text-lg font-semibold text-slate-800 mb-2">Trade License Expiry Date</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <FormSelect id="paymentTerm" label="Payment Terms" icon={CreditCard} value={paymentTerm} onChange={(e) => setPaymentTerm(e.target.value)}>
            <option value="default">Select a payment term...</option>
            <option value="Weekly">Weekly</option>
            <option value="30 Days">30 Days</option>
            <option value="60 Days">60 Days</option>
          </FormSelect>
        </div>
        <div className="mt-8">
          <PrimaryButton onClick={() => setUserState('pendingApproval')} disabled={!allDocsUploaded || !expiryDate || !paymentTermSelected} className={(!allDocsUploaded || !expiryDate || !paymentTermSelected) ? 'bg-gray-400 cursor-not-allowed' : ''}>
            Submit for Review
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const WaitingForApprovalScreen = ({ setUserState, setNeedsPasswordChange, docStatus, paymentTerm }) => (
  <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-sans antialiased text-slate-600 text-sm">
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl text-center">
      <Loader className="w-16 h-16 text-red-600 animate-spin mx-auto" />
      <h1 className="text-3xl font-bold text-slate-900 mt-4">Application Submitted!</h1>
      <p className="text-lg text-slate-600 mt-3">Your documents are under review.</p>
      <div className="mt-8 border-t border-slate-200 pt-6">
        <PrimaryButton onClick={() => { setUserState('approved'); setNeedsPasswordChange(false); }}>Simulate Admin Approval</PrimaryButton>
      </div>
    </div>
  </div>
);

const ForcePasswordChangeModal = ({ setNeedsPasswordChange }) => (
  <Modal title="Create New Password" onClose={() => {}}> 
    <div className="space-y-6">
      <p className="text-sm text-slate-600">Please create a new password.</p>
      <FormInput id="newPass" label="New Password" type="password" icon={Lock} placeholder="••••••••" />
      <FormInput id="confirmPass" label="Confirm New Password" type="password" icon={Lock} placeholder="••••••••" />
      <PrimaryButton onClick={() => setNeedsPasswordChange(false)}>Set New Password</PrimaryButton>
    </div>
  </Modal>
);

const PlaceholderView = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-slate-400 animate-in fade-in zoom-in-95 duration-500">
    <div className="bg-slate-50 p-8 rounded-full mb-6 ring-1 ring-slate-100 shadow-sm">
      <Icon className="w-16 h-16 text-slate-300" />
    </div>
    <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-xs text-center">This module is currently under development and will be available soon.</p>
  </div>
);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- BIDDING & AUCTIONS MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const BiddingManagementPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [bidForm, setBidForm] = useState({
        price: '',
        leadTime: '',
        validity: '',
        remarks: '',
        file: null
    });

    // Mock Data: Bids
    const [bids, setBids] = useState([
        {
            id: 'BID-101', refNo: 'BID-2025-101', type: 'Product', category: 'Grocery',
            summary: 'Supply of Basmati Rice 10kg', qty: '500 Units',
            startDate: '2025-12-01', endDate: '2025-12-25T18:00:00',
            location: 'S3 - Central', status: 'Open',
            requirements: { paymentTerms: '45 Days', validity: '30 Days', deliveryDate: '2026-01-15' },
            items: [{ name: 'Basmati Rice Premium 10kg', spec: 'Aged 2 years, Long Grain', unit: 'Bag', qty: 500 }],
            vendorBid: null // Not submitted yet
        },
        {
            id: 'BID-102', refNo: 'BID-2025-102', type: 'Service', category: 'Maintenance',
            summary: 'Annual CCTV Maintenance Contract', qty: '4 Locations',
            startDate: '2025-12-05', endDate: '2025-12-28T14:00:00',
            location: 'All Warehouses', status: 'Open',
            requirements: { paymentTerms: '30 Days', validity: '60 Days', deliveryDate: '2026-01-01' },
            items: [{ name: 'CCTV AMC', spec: 'Quarterly maintenance visits & emergency support', unit: 'Lot', qty: 1 }],
            vendorBid: { 
                price: 12000, leadTime: '5 Days', validity: '60 Days', remarks: 'Includes spare parts upto 500 AED', 
                submittedDate: '2025-12-10', status: 'Under Review', position: 'low' // Green
            }
        },
        {
            id: 'BID-103', refNo: 'BID-2025-099', type: 'Product', category: 'Packaging',
            summary: 'Cardboard Boxes (Size L)', qty: '10,000 Units',
            startDate: '2025-11-15', endDate: '2025-11-30T18:00:00',
            location: 'S7 - Regional', status: 'Closed',
            requirements: { paymentTerms: '60 Days', validity: '30 Days', deliveryDate: '2025-12-15' },
            items: [{ name: 'Corrugated Box 50x50x50', spec: '5 Ply, Printed Logo', unit: 'Pcs', qty: 10000 }],
            vendorBid: { 
                price: 5500, leadTime: '10 Days', validity: '30 Days', remarks: '', 
                submittedDate: '2025-11-28', status: 'Lost', position: 'high', awardDetails: { awardedTo: 'PackMaster Ltd', awardedPrice: 5100 }
            }
        },
        {
            id: 'BID-104', refNo: 'BID-2025-098', type: 'Product', category: 'Frozen',
            summary: 'Frozen Peas 500g', qty: '2000 Units',
            startDate: '2025-11-10', endDate: '2025-11-25T18:00:00',
            location: 'S5 - Cold Chain', status: 'Awarded',
            requirements: { paymentTerms: '30 Days', validity: '30 Days', deliveryDate: '2025-12-05' },
            items: [{ name: 'Frozen Green Peas', spec: 'Grade A', unit: 'Pack', qty: 2000 }],
            vendorBid: { 
                price: 4200, leadTime: '2 Days', validity: '30 Days', remarks: '', 
                submittedDate: '2025-11-20', status: 'Awarded', position: 'low', awardDate: '2025-12-01', poRef: 'PO-9955'
            }
        },
        {
            id: 'BID-105', refNo: 'BID-2025-105', type: 'Product', category: 'Grocery',
            summary: 'Sunflower Oil 1L', qty: '1000 Bottles',
            startDate: '2025-12-18', endDate: '2025-12-20T12:00:00', // Closing soon
            location: 'S3 - Central', status: 'Open',
            requirements: { paymentTerms: 'Immediate', validity: '15 Days', deliveryDate: '2025-12-22' },
            items: [{ name: 'Sunflower Oil', spec: 'Refined', unit: 'Bottle', qty: 1000 }],
            vendorBid: {
                price: 8500, leadTime: '1 Day', validity: '15 Days', remarks: '',
                submittedDate: '2025-12-19', status: 'Submitted', position: 'mid' // Yellow
            }
        }
    ]);

    const [history, setHistory] = useState([
        { date: '2025-12-19 10:30', refNo: 'BID-2025-105', action: 'Submitted', remarks: 'Initial offer placed.' },
        { date: '2025-12-10 14:15', refNo: 'BID-2025-102', action: 'Submitted', remarks: 'Initial offer placed.' },
        { date: '2025-12-01 09:00', refNo: 'BID-2025-098', action: 'Awarded', remarks: 'Bid won. PO Generated.' },
        { date: '2025-11-30 18:00', refNo: 'BID-2025-099', action: 'Closed', remarks: 'Bid evaluation completed.' },
    ]);

    // Helpers
    const getBidPositionColor = (pos) => {
        if (pos === 'low') return 'bg-green-100 text-green-700 ring-green-600/20'; // Good (Low price)
        if (pos === 'mid') return 'bg-amber-100 text-amber-700 ring-amber-600/20'; // Average
        return 'bg-red-50 text-red-700 ring-red-600/20'; // Bad (High price)
    };

    const getBidPositionLabel = (pos) => {
        if (pos === 'low') return 'Competitive (Low)';
        if (pos === 'mid') return 'Competitive (Mid)';
        return 'Not Competitive (High)';
    };

    const getBidStatusBadge = (status) => {
        if (status === 'Open') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-700/10">Open</span>;
        if (status === 'Closed') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 ring-1 ring-slate-600/10">Closed</span>;
        if (status === 'Awarded') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">Awarded</span>;
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 ring-1 ring-gray-600/10">{status}</span>;
    };

    const canEditBid = (bid) => {
        if (!bid || !bid.vendorBid) return false;
        const isExpired = new Date() > new Date(bid.endDate);
        const isOpen = bid.status === 'Open';
        return isOpen && !isExpired;
    };

    // Actions
    const handleOpenBid = (bid) => {
        setSelectedBid(bid);
        setShowDetailModal(true);
    };

    const handleOpenSubmit = (bid, editMode = false) => {
        setSelectedBid(bid);
        setIsEditing(editMode);
        if (editMode && bid.vendorBid) {
            setBidForm({
                price: bid.vendorBid.price,
                leadTime: bid.vendorBid.leadTime,
                validity: bid.vendorBid.validity,
                remarks: bid.vendorBid.remarks,
                file: null
            });
        } else {
            setBidForm({ price: '', leadTime: '', validity: '', remarks: '', file: null });
        }
        setShowSubmitModal(true);
    };

    const handleSubmitBid = () => {
        if (!bidForm.price || !bidForm.leadTime) {
            alert('Price and Lead Time are required.');
            return;
        }

        // Logic to update bid
        const updatedBids = bids.map(b => {
            if (b.id === selectedBid.id) {
                // Mocking position logic change on edit
                const newPosition = isEditing ? 'low' : 'mid'; // Just a mock change
                return {
                    ...b,
                    vendorBid: {
                        ...bidForm,
                        submittedDate: new Date().toISOString(),
                        status: isEditing ? 'Revision Submitted' : 'Submitted',
                        position: newPosition
                    }
                };
            }
            return b;
        });

        setBids(updatedBids);
        
        // Add to history
        const newHistory = {
            date: new Date().toLocaleString(),
            refNo: selectedBid.refNo,
            action: isEditing ? 'Edited' : 'Submitted',
            remarks: isEditing ? 'Bid revised by vendor.' : 'Bid submitted by vendor.'
        };
        setHistory([newHistory, ...history]);

        setShowSubmitModal(false);
        alert(isEditing ? 'Bid Revised Successfully!' : 'Bid Submitted Successfully!');
    };

    // Filter Logic
    const getFilteredBids = () => {
        switch (activeTab) {
            case 'Open Bids':
                return bids.filter(b => b.status === 'Open' && !b.vendorBid);
            case 'My Submitted Bids':
                return bids.filter(b => b.vendorBid);
            case 'Awarded Bids':
                return bids.filter(b => b.status === 'Awarded' && b.vendorBid); // Only show if vendor participated and status is Awarded (Mock logic assuming if Awarded status is set globally, this vendor won it if they have awardDetails, but simplified here)
            case 'Lost or Closed':
                return bids.filter(b => (b.status === 'Closed' || (b.status === 'Awarded' && b.vendorBid?.status !== 'Awarded'))); // Simplified logic
            default:
                return bids;
        }
    };

    const filteredBids = getFilteredBids();

    // Dashboard Stats
    const stats = {
        open: bids.filter(b => b.status === 'Open' && !b.vendorBid).length,
        submitted: bids.filter(b => b.vendorBid).length,
        awarded: bids.filter(b => b.vendorBid?.status === 'Awarded').length,
        lost: bids.filter(b => b.vendorBid?.status === 'Lost').length,
        closingSoon: bids.filter(b => {
            const end = new Date(b.endDate);
            const now = new Date();
            const diffHours = (end - now) / 36e5;
            return b.status === 'Open' && diffHours > 0 && diffHours <= 48;
        }).length
    };

    const tabs = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'slate' },
        { id: 'Open Bids', label: 'Open Bids', icon: Gavel, color: 'blue' },
        { id: 'My Submitted Bids', label: 'My Submitted Bids', icon: FileSignature, color: 'indigo' },
        { id: 'Awarded Bids', label: 'Awarded Bids', icon: Trophy, color: 'emerald' },
        { id: 'Lost or Closed', label: 'Lost or Closed Bids', icon: XCircle, color: 'rose' },
        { id: 'Bid History', label: 'Bid History', icon: History, color: 'slate' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Bidding & Auctions</h1>
                    <p className="text-slate-500 text-sm mt-1">Participate in RFPs and reverse auctions.</p>
                </div>
            </div>

            {/* Navigation Tabs - ENHANCED WRAPPED & READABLE */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="border-b border-slate-200 p-2">
                    <div className="flex flex-wrap gap-2 bg-slate-50/80 rounded-xl p-1.5">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            
                            // Dynamic Styles
                            const styles = {
                                slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                                blue:    isActive ? 'bg-blue-600 text-white ring-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                                indigo:  isActive ? 'bg-indigo-600 text-white ring-indigo-700' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700',
                                emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                                rose:    isActive ? 'bg-rose-600 text-white ring-rose-700' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700',
                            };
                            const currentStyle = styles[tab.color] || styles.slate;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex flex-col sm:flex-row items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm flex-1 min-w-[45%] sm:min-w-fit h-auto
                                        ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                        ${currentStyle}
                                    `}
                                >
                                    <tab.icon className={`w-4 h-4 mb-1 sm:mb-0 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                    <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* --- TAB CONTENT --- */}
                
                {/* 1. DASHBOARD */}
                {activeTab === 'Dashboard' && (
                    <div className="p-6 bg-slate-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                            <StatCard title="Open Bids" value={stats.open} change="Active" changeType="neutral" icon={Gavel} variant="blue" />
                            <StatCard title="Submitted" value={stats.submitted} change="In Review" changeType="neutral" icon={FileSignature} variant="white" />
                            <StatCard title="Awarded" value={stats.awarded} change="Wins" changeType="positive" icon={Trophy} variant="green" />
                            <StatCard title="Lost" value={stats.lost} change="Missed" changeType="negative" icon={Frown} variant="white" />
                            <StatCard title="Closing Soon" value={stats.closingSoon} change="< 48h" changeType="negative" icon={Clock} variant="orange" />
                        </div>

                        {stats.closingSoon > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-orange-50">
                                    <h3 className="font-bold text-orange-800 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5"/> Bids Closing Soon
                                    </h3>
                                    <span className="text-xs font-semibold text-orange-700 bg-white/50 px-2 py-1 rounded">Action Required</span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {bids.filter(b => {
                                        const end = new Date(b.endDate);
                                        const now = new Date();
                                        const diffHours = (end - now) / 36e5;
                                        return b.status === 'Open' && diffHours > 0 && diffHours <= 48;
                                    }).map(bid => (
                                        <div key={bid.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                                            <div>
                                                <div className="font-bold text-slate-800">{bid.summary}</div>
                                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                                                    <span className="font-mono">{bid.refNo}</span>
                                                    <span>•</span>
                                                    <span className="text-red-600 font-medium flex items-center gap-1"><Timer className="w-3 h-3"/> Ends: {bid.endDate.replace('T', ' ')}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenBid(bid)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye className="w-4 h-4"/></button>
                                                {!bid.vendorBid && <button onClick={() => handleOpenSubmit(bid)} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">Bid Now</button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. OPEN BIDS & OTHERS TABLE VIEW */}
                {activeTab !== 'Dashboard' && activeTab !== 'Bid History' && (
                    <>
                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4 p-4 bg-slate-50">
                            {filteredBids.length > 0 ? filteredBids.map((bid) => (
                                <div key={bid.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{bid.summary}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-1">{bid.refNo}</div>
                                        </div>
                                        {getBidStatusBadge(bid.vendorBid ? bid.vendorBid.status : bid.status)}
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                                        <div className="bg-slate-50 p-2 rounded">
                                            <span className="block text-slate-400 text-[10px] uppercase">Type</span>
                                            {bid.type} / {bid.category}
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded">
                                            <span className="block text-slate-400 text-[10px] uppercase">Location</span>
                                            {bid.location}
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded">
                                            <span className="block text-slate-400 text-[10px] uppercase">End Date</span>
                                            <span className="text-red-600">{bid.endDate.split('T')[0]}</span>
                                        </div>
                                        {activeTab === 'My Submitted Bids' && (
                                            <div className="bg-indigo-50 p-2 rounded">
                                                <span className="block text-indigo-400 text-[10px] uppercase">My Quote</span>
                                                <span className="font-bold text-indigo-700">AED {bid.vendorBid.price.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                        <button onClick={() => handleOpenBid(bid)} className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50">
                                            <Eye className="w-3 h-3" /> View
                                        </button>
                                        
                                        {activeTab === 'Open Bids' && !bid.vendorBid && (
                                            <button onClick={() => handleOpenSubmit(bid)} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-sm">
                                                Submit Bid
                                            </button>
                                        )}

                                        {activeTab === 'My Submitted Bids' && canEditBid(bid) && (
                                            <button onClick={() => handleOpenSubmit(bid, true)} className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold rounded-lg hover:bg-orange-100">
                                                <Edit className="w-3 h-3" /> Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-slate-500 text-sm">No bids found.</div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Bid Details</th>
                                        <th className="px-6 py-4">Type / Category</th>
                                        <th className="px-6 py-4 text-center">Dates</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        {activeTab === 'My Submitted Bids' && <th className="px-6 py-4 text-right">My Quote</th>}
                                        {activeTab === 'My Submitted Bids' && <th className="px-6 py-4 text-center">Position</th>}
                                        {activeTab === 'Awarded Bids' && <th className="px-6 py-4 text-right">Awarded Amount</th>}
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {filteredBids.length > 0 ? filteredBids.map((bid) => (
                                        <tr key={bid.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 align-top">
                                                <div className="font-bold text-slate-900 text-sm">{bid.summary}</div>
                                                <div className="text-xs text-slate-500 font-mono mt-1">{bid.refNo}</div>
                                                <div className="text-xs text-slate-600 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {bid.location}</div>
                                            </td>
                                            {/* ... existing table cells ... */}
                                            <td className="px-6 py-4 align-top">
                                                <div className="text-sm font-medium text-slate-700">{bid.type}</div>
                                                <div className="text-xs text-slate-500">{bid.category}</div>
                                                <div className="mt-1 text-xs font-semibold bg-slate-100 inline-block px-2 py-0.5 rounded text-slate-600">Qty: {bid.qty}</div>
                                            </td>
                                            <td className="px-6 py-4 align-top text-center text-xs">
                                                <div className="text-slate-500">Start: {bid.startDate}</div>
                                                <div className="text-red-600 font-medium mt-1">End: {bid.endDate.split('T')[0]}</div>
                                                <div className="text-red-400">{bid.endDate.split('T')[1]}</div>
                                            </td>
                                            <td className="px-6 py-4 align-top text-center">
                                                {getBidStatusBadge(bid.vendorBid ? bid.vendorBid.status : bid.status)}
                                            </td>

                                            {activeTab === 'My Submitted Bids' && (
                                                <>
                                                    <td className="px-6 py-4 align-top text-right">
                                                        <div className="font-bold text-slate-900">AED {bid.vendorBid.price.toLocaleString()}</div>
                                                        <div className="text-xs text-slate-500">{bid.vendorBid.leadTime} Lead Time</div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top text-center">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ring-1 ${getBidPositionColor(bid.vendorBid.position)}`}>
                                                            {bid.vendorBid.position === 'low' ? <TrendingDown className="w-3 h-3"/> : bid.vendorBid.position === 'mid' ? <Minus className="w-3 h-3"/> : <TrendingUp className="w-3 h-3"/>}
                                                            {getBidPositionLabel(bid.vendorBid.position)}
                                                        </span>
                                                    </td>
                                                </>
                                            )}

                                            {activeTab === 'Awarded Bids' && (
                                                <td className="px-6 py-4 align-top text-right">
                                                    <div className="font-bold text-green-700">AED {bid.vendorBid.price.toLocaleString()}</div>
                                                    <div className="text-xs text-slate-500 font-mono">PO: {bid.vendorBid.poRef}</div>
                                                </td>
                                            )}

                                            <td className="px-6 py-4 align-top text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleOpenBid(bid)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    
                                                    {activeTab === 'Open Bids' && !bid.vendorBid && (
                                                        <button onClick={() => handleOpenSubmit(bid)} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-sm">
                                                            Submit Bid
                                                        </button>
                                                    )}

                                                    {activeTab === 'My Submitted Bids' && canEditBid(bid) && (
                                                        <button onClick={() => handleOpenSubmit(bid, true)} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Bid">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    )}

                                                    {activeTab === 'Awarded Bids' && (
                                                        <button onClick={() => alert('Redirecting to PO...')} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View PO">
                                                            <ShoppingCart className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-slate-500 text-sm">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                                        <Search className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                    <p>No bids found in this category.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* 3. HISTORY VIEW */}
                {activeTab === 'Bid History' && (
                    <>
                        <div className="md:hidden space-y-4 p-4 bg-slate-50">
                            {history.map((h, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                        <span className="font-mono">{h.date}</span>
                                        <span className="font-bold text-slate-900">{h.refNo}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${h.action === 'Awarded' ? 'bg-green-100 text-green-700' : h.action === 'Submitted' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {h.action}
                                        </span>
                                        <span className="text-xs text-slate-500 italic truncate max-w-[150px]">{h.remarks}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Date & Time</th>
                                        <th className="px-6 py-4">Bid Reference</th>
                                        <th className="px-6 py-4">Action Type</th>
                                        <th className="px-6 py-4">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {history.map((h, i) => (
                                        <tr key={i} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">{h.date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">{h.refNo}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${h.action === 'Awarded' ? 'bg-green-100 text-green-700' : h.action === 'Submitted' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {h.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{h.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* --- MODALS --- */}

            {/* 1. Bid Details Modal (Read-Only) */}
            {showDetailModal && selectedBid && (
                <Modal 
                    title={`Bid Details: ${selectedBid.refNo}`} 
                    onClose={() => setShowDetailModal(false)} 
                    size="4xl"
                    footer={
                        <div className="flex justify-end gap-3 w-full">
                            <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">Close</button>
                            {selectedBid.status === 'Open' && !selectedBid.vendorBid && (
                                <PrimaryButton onClick={() => { setShowDetailModal(false); handleOpenSubmit(selectedBid); }} className="w-auto">Submit Bid</PrimaryButton>
                            )}
                        </div>
                    }
                >
                    <div className="space-y-6">
                        {/* Header Details */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{selectedBid.summary}</h3>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">{selectedBid.type} • {selectedBid.category}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-500">Closing Date</div>
                                    <div className="text-red-600 font-bold">{selectedBid.endDate.replace('T', ' ')}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Location</label>
                                    <p className="font-medium text-slate-900">{selectedBid.location}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Required Date</label>
                                    <p className="font-medium text-slate-900">{selectedBid.requirements.deliveryDate}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Payment Terms</label>
                                    <p className="font-medium text-slate-900">{selectedBid.requirements.paymentTerms}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Req. Validity</label>
                                    <p className="font-medium text-slate-900">{selectedBid.requirements.validity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Line Items Scope</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-100 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Item / Service</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Specification</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center">Unit</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center">Est. Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {selectedBid.items.map((item, idx) => (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0">
                                                <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                                                <td className="px-4 py-3 text-sm text-slate-600">{item.spec}</td>
                                                <td className="px-4 py-3 text-center text-sm">{item.unit}</td>
                                                <td className="px-4 py-3 text-center text-sm font-bold">{item.qty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* 2. Submit/Edit Bid Modal */}
            {showSubmitModal && selectedBid && (
                <Modal 
                    title={isEditing ? `Edit Bid: ${selectedBid.refNo}` : `Submit Bid: ${selectedBid.refNo}`}
                    onClose={() => setShowSubmitModal(false)}
                    size="3xl"
                    footer={
                        <div className="flex justify-between items-center w-full">
                            <div className="text-xs text-slate-500">
                                {isEditing ? 'Creating new bid version (v2)' : 'All submissions are final after closing.'}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setShowSubmitModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
                                <PrimaryButton onClick={handleSubmitBid} className="w-auto">{isEditing ? 'Update Bid' : 'Submit Bid'}</PrimaryButton>
                            </div>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-4">
                            <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600">
                                <Gavel className="w-6 h-6"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-indigo-900">{selectedBid.summary}</h4>
                                <p className="text-xs text-indigo-700">Ref: {selectedBid.refNo} | Closing: {selectedBid.endDate.replace('T', ' ')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <FormInput 
                                    id="bidPrice" label="Total Bid Value (AED)" type="number" icon={DollarSign}
                                    placeholder="0.00" required
                                    value={bidForm.price}
                                    onChange={(e) => setBidForm({...bidForm, price: Number(e.target.value)})}
                                />
                                <p className="text-xs text-slate-500 mt-1">Inclusive of all charges except VAT.</p>
                            </div>
                            <div>
                                <FormInput 
                                    id="leadTime" label="Delivery Lead Time" icon={Timer}
                                    placeholder="e.g. 5 Days" required
                                    value={bidForm.leadTime}
                                    onChange={(e) => setBidForm({...bidForm, leadTime: e.target.value})}
                                />
                            </div>
                            <div>
                                <FormInput 
                                    id="validity" label="Bid Validity Period" icon={Calendar}
                                    placeholder="e.g. 30 Days"
                                    value={bidForm.validity}
                                    onChange={(e) => setBidForm({...bidForm, validity: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Attachment</label>
                                <div className="border border-slate-300 border-dashed rounded-lg px-4 py-2 flex items-center justify-between bg-slate-50">
                                    <span className="text-sm text-slate-500">Upload Quotation / Spec PDF</span>
                                    <button className="text-xs bg-white border border-slate-300 px-2 py-1 rounded shadow-sm hover:bg-slate-100">Browse</button>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Remarks / Notes</label>
                                <textarea 
                                    rows={3}
                                    className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Add any specific conditions or inclusions..."
                                    value={bidForm.remarks}
                                    onChange={(e) => setBidForm({...bidForm, remarks: e.target.value})}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- GRN MANAGEMENT MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const GRNManagementPage = ({ grnList }) => {
    const [activeTab, setActiveTab] = useState('All'); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filterWarehouse, setFilterWarehouse] = useState('All');
    const [selectedGRN, setSelectedGRN] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const tabs = [
        { id: 'All', label: 'All GRNs', icon: ListFilter, color: 'slate' },
        { id: 'Pending', label: 'Pending GRNs', icon: Clock, color: 'amber' },
        { id: 'Completed', label: 'Completed GRNs', icon: CheckCircle, color: 'emerald' },
        { id: 'History', label: 'GRN History', icon: History, color: 'slate' }
    ];

    const filteredGRNs = useMemo(() => {
        return grnList.filter(grn => {
            // Tab Filter
            if (activeTab === 'Pending' && grn.status !== 'Pending') return false;
            if (activeTab === 'Completed' && grn.status !== 'Completed') return false;
            // History tab shows all, but conceptually could be limited by date range in a real app
            
            // Search Filter
            const lowerTerm = searchTerm.toLowerCase();
            const matchesSearch = 
                grn.grnNumber.toLowerCase().includes(lowerTerm) ||
                grn.poNumber.toLowerCase().includes(lowerTerm) ||
                (grn.invoiceNumber && grn.invoiceNumber.toLowerCase().includes(lowerTerm));

            // Warehouse Filter
            const matchesWarehouse = filterWarehouse === 'All' || grn.warehouse === filterWarehouse;

            return matchesSearch && matchesWarehouse;
        });
    }, [grnList, activeTab, searchTerm, filterWarehouse]);

    const handleViewDetails = (grn) => {
        setSelectedGRN(grn);
        setShowDetailModal(true);
    };

    const handleDownload = (grnNumber) => {
        alert(`Downloading GRN PDF: ${grnNumber}...`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">GRN Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Goods Received Notes & Inventory Acceptance Logs.</p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                {/* 1. Tabs - ENHANCED WRAPPED & READABLE */}
                <div className="border-b border-slate-200 p-2">
                    <div className="flex flex-wrap gap-2 bg-slate-50/80 rounded-xl p-1.5">
                        {tabs.map((tab) => {
                            const count = tab.id === 'All' || tab.id === 'History' 
                                        ? grnList.length 
                                        : grnList.filter(g => g.status === tab.id).length;
                            const isActive = activeTab === tab.id;
                            
                            const styles = {
                                slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                                amber:   isActive ? 'bg-amber-500 text-white ring-amber-600' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700',
                                emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                            };
                            const currentStyle = styles[tab.color] || styles.slate;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex flex-col sm:flex-row items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm flex-1 min-w-[40%] sm:min-w-fit h-auto
                                        ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                        ${currentStyle}
                                    `}
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-2">
                                        <tab.icon className={`w-4 h-4 mb-1 sm:mb-0 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                        <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                                    </div>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Filters */}
                <div className="p-4 border-b border-slate-200 bg-white flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search by GRN, PO, or Invoice No..." 
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                            value={filterWarehouse}
                            onChange={(e) => setFilterWarehouse(e.target.value)}
                        >
                            <option value="All">All Warehouses</option>
                            <option value="S3 - Central">S3 - Central</option>
                            <option value="S5 - Cold Chain">S5 - Cold Chain</option>
                            <option value="S7 - Regional">S7 - Regional</option>
                        </select>
                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">
                            <Download className="w-4 h-4" /> Export
                        </button>
                    </div>
                </div>

                {/* 3. Dynamic Table */}
                <>
                    <div className="md:hidden space-y-4 p-4 bg-slate-50">
                        {filteredGRNs.length > 0 ? filteredGRNs.map((grn) => (
                            <div key={grn.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="font-bold text-indigo-600 text-sm">{grn.grnNumber}</div>
                                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <CalendarDays className="w-3 h-3"/> {grn.grnDate}
                                        </div>
                                    </div>
                                    <StatusBadge status={grn.status} />
                                </div>
                                <div className="text-xs text-slate-600 mb-2">PO: <span className="font-mono">{grn.poNumber}</span></div>
                                {activeTab !== 'Pending' && <div className="text-xs text-slate-600 mb-2">Inv: <span className="font-mono">{grn.invoiceNumber || 'N/A'}</span></div>}
                                <div className="bg-slate-50 p-2 rounded text-xs flex justify-between items-center mb-3">
                                    <span>Received: <span className="font-bold">{grn.totalReceivedQty}</span></span>
                                    {(grn.shortageQty > 0 || grn.damageQty > 0) && (
                                        <span className="text-red-600 font-bold">Issues Found</span>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handleViewDetails(grn)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">View Details</button>
                                    {activeTab !== 'Pending' && <button onClick={() => handleDownload(grn.grnNumber)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">PDF</button>}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-500 text-sm">No GRNs found.</div>
                        )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">GRN Details</th>
                                    {activeTab !== 'Pending' && <th className="px-6 py-4">Invoice Info</th>}
                                    <th className="px-6 py-4">Warehouse</th>
                                    <th className="px-6 py-4 text-center">Quantities (Rec / Short / Dmg)</th>
                                    {activeTab === 'Pending' && <th className="px-6 py-4">Invoice Status</th>}
                                    {activeTab === 'History' && <th className="px-6 py-4">Remarks</th>}
                                    {activeTab !== 'History' && <th className="px-6 py-4 text-center">Status</th>}
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredGRNs.length > 0 ? filteredGRNs.map((grn) => (
                                    <tr key={grn.id} className="group hover:bg-slate-50 transition-colors">
                                        {/* ... existing table rows ... */}
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-indigo-600 text-sm">{grn.grnNumber}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                <CalendarDays className="w-3 h-3"/> {grn.grnDate}
                                            </div>
                                            <div className="text-xs text-slate-600 font-mono mt-1">PO: {grn.poNumber}</div>
                                        </td>
                                        
                                        {activeTab !== 'Pending' && (
                                            <td className="px-6 py-4 align-top text-sm text-slate-600">
                                                {grn.invoiceNumber ? (
                                                    <span className="font-medium">{grn.invoiceNumber}</span>
                                                ) : (
                                                    <span className="text-slate-400 italic">Not generated</span>
                                                )}
                                            </td>
                                        )}

                                        <td className="px-6 py-4 align-top text-sm text-slate-600">
                                            {grn.warehouse}
                                        </td>

                                        <td className="px-6 py-4 align-top text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-sm font-bold text-slate-900">{grn.totalReceivedQty}</span>
                                                <div className="flex gap-2 mt-1 text-[10px] font-bold">
                                                    {(grn.shortageQty > 0 || grn.damageQty > 0) ? (
                                                        <>
                                                            <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100" title="Shortage">S: {grn.shortageQty}</span>
                                                            <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100" title="Damage">D: {grn.damageQty}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">Perfect</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {activeTab === 'Pending' && (
                                            <td className="px-6 py-4 align-top">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                    Awaiting Invoice
                                                </span>
                                            </td>
                                        )}

                                        {activeTab === 'History' && (
                                            <td className="px-6 py-4 align-top text-xs text-slate-500 max-w-xs truncate">
                                                {grn.remarks}
                                            </td>
                                        )}

                                        {activeTab !== 'History' && (
                                            <td className="px-6 py-4 align-top text-center">
                                                <StatusBadge status={grn.status} />
                                            </td>
                                        )}

                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleViewDetails(grn)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {activeTab !== 'Pending' && (
                                                    <button onClick={() => handleDownload(grn.grnNumber)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Download PDF">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={activeTab === 'Pending' ? 6 : 7} className="px-6 py-12 text-center text-slate-500 text-sm">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                                    <ClipboardCheck className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <p>No GRNs found in this category.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            </div>

            {/* GRN Details Modal (Read-Only) */}
            {showDetailModal && selectedGRN && (
                <Modal 
                    title={`GRN Details: ${selectedGRN.grnNumber}`} 
                    onClose={() => setShowDetailModal(false)} 
                    size="4xl"
                    footer={
                        <div className="flex justify-between items-center w-full">
                            <div className="text-xs text-slate-500 italic">
                                * This document is generated from ERP and is read-only.
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">Close</button>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        {/* Header Details */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Header Information</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">GRN Date</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.grnDate}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Warehouse</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.warehouse}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Purchase Order</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.poNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Purchase Invoice</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.invoiceNumber || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Supplier</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.supplierName}</p>
                                    <span className="text-xs text-slate-500 font-mono">{selectedGRN.supplierCode}</span>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Received By</label>
                                    <p className="font-medium text-slate-900">{selectedGRN.receivedBy}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Remarks</label>
                                    <p className="font-medium text-slate-900 italic">{selectedGRN.remarks}</p>
                                </div>
                            </div>
                        </div>

                        {/* Item Level Table */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pl-1">Item Details</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-100 border-b border-slate-200">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Item Info</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center">Unit</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center">Ordered</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center bg-blue-50/50 text-blue-800">Received</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center text-red-600">Short/Dmg</th>
                                            <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-center bg-green-50/50 text-green-800">Accepted</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white text-sm">
                                        {selectedGRN.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-900">{item.productName}</div>
                                                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                                                        Code: {item.itemCode} | Barcode: {item.barcode}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center text-slate-600">{item.unit}</td>
                                                <td className="px-4 py-3 text-center font-medium text-slate-600">{item.orderedQty}</td>
                                                <td className="px-4 py-3 text-center font-bold text-blue-700 bg-blue-50/30">{item.receivedQty}</td>
                                                <td className="px-4 py-3 text-center">
                                                    {(item.shortageQty > 0 || item.damageQty > 0) ? (
                                                        <div className="flex flex-col text-xs font-bold">
                                                            {item.shortageQty > 0 && <span className="text-amber-600">Short: {item.shortageQty}</span>}
                                                            {item.damageQty > 0 && <span className="text-red-600">Dmg: {item.damageQty}</span>}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center font-bold text-green-700 bg-green-50/30">{item.acceptedQty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Logic Notices */}
                        {(selectedGRN.shortageQty > 0 || selectedGRN.damageQty > 0) && (
                            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="text-sm font-bold text-amber-800">Credit Note Triggered</h5>
                                    <p className="text-xs text-amber-700 mt-1">
                                        Discrepancies found (Shortage/Damage). A Credit Note request has been automatically generated in the ERP referencing this GRN. Payment will be processed for <strong>Accepted Quantities</strong> only.
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-slate-400 justify-end">
                            <ShieldCheck className="w-4 h-4"/>
                            <span>Data synced with ERP Finance Module</span>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- FULL PORTAL PAGE COMPONENTS (After Approval)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const DashboardView = ({ setCurrentView }) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button onClick={() => setCurrentView('orders')} className="text-start transition-transform hover:scale-[1.02] focus:outline-none">
          <StatCard title="New Orders" value="48" change="+12.5%" changeType="positive" icon={ShoppingCart} details="Last 30 days" variant="orange" />
        </button>
        <button onClick={() => setCurrentView('products-new')} className="text-start transition-transform hover:scale-[1.02] focus:outline-none">
          <StatCard title="Pending Products" value="36" change="+4" changeType="positive" icon={Package} details="Awaiting approval" variant="purple" />
        </button>
        <button onClick={() => setCurrentView('payments')} className="text-start transition-transform hover:scale-[1.02] focus:outline-none">
          <StatCard title="Total Revenue" value="AED 45k" change="+18.6%" changeType="positive" icon={DollarSign} details="Vs last month" variant="green" />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card noPadding={true}>
                <CardHeader title="Sales by Month">
                    <button className="flex items-center text-sm text-slate-600 bg-slate-100 p-2 rounded-lg">This year <ChevronDown className="w-4 h-4 ms-1" /></button>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                    {[75, 40, 65, 30, 80, 25, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-red-600 rounded-t-md" style={{ height: `${h}%` }}></div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card noPadding={true}>
          <CardHeader title="Recent Activity" />
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3"><ShoppingCart className="w-5 h-5 text-blue-600" /><span className="text-sm">New PO #10562 received</span></li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-sm">Vendor Profile verified</span></li>
              <li className="flex gap-3"><Package className="w-5 h-5 text-purple-600" /><span className="text-sm">5 New products added</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- SERVICE RFQ MANAGEMENT MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const ServiceRFQManagementPage = ({ serviceRFQs, setServiceRFQs }) => {
    const [activeTab, setActiveTab] = useState('New'); // New, Quoted, Work Order, Completed, History
    const [selectedRFQ, setSelectedRFQ] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [quoteData, setQuoteData] = useState({ price: '', timeline: '', notes: '' });

    const tabs = [
        { id: 'New', label: 'New Requests', icon: FileQuestion, color: 'blue' },
        { id: 'Quoted', label: 'Submitted Quotes', icon: ClipboardCheck, color: 'indigo' },
        { id: 'Work Order', label: 'Work Orders', icon: HardHat, color: 'emerald' },
        { id: 'Completed', label: 'Completed Jobs', icon: CheckCircle, color: 'slate' },
        { id: 'Declined', label: 'Declined Requests', icon: XCircle, color: 'rose' }
    ];

    const filteredRFQs = useMemo(() => {
        return serviceRFQs.filter(rfq => rfq.status === activeTab);
    }, [serviceRFQs, activeTab]);

    const handleOpenDetail = (rfq) => {
        setSelectedRFQ(rfq);
        setQuoteData(rfq.quoteDetails || { price: '', timeline: '', notes: '' });
        setShowDetailModal(true);
    };

    const handleSubmitQuote = () => {
        if (!quoteData.price || !quoteData.timeline) {
            alert("Please fill in price and timeline.");
            return;
        }
        
        setServiceRFQs(prev => prev.map(item => 
            item.id === selectedRFQ.id ? { 
                ...item, 
                status: 'Quoted', 
                quoteDetails: { ...quoteData, submittedDate: new Date().toISOString().split('T')[0] } 
            } : item
        ));
        setShowDetailModal(false);
        alert(`Quote submitted for ${selectedRFQ.id}`);
    };

    const handleDeclineRFQ = () => {
        if (window.confirm("Are you sure you want to decline this request?")) {
            setServiceRFQs(prev => prev.map(item => 
                item.id === selectedRFQ.id ? { ...item, status: 'Declined' } : item
            ));
            setShowDetailModal(false);
        }
    };

    const handleSimulateApproval = () => {
        // Dev tool to move Quoted -> Work Order
        setServiceRFQs(prev => prev.map(item => 
            item.id === selectedRFQ.id ? { ...item, status: 'Work Order', woDate: new Date().toISOString().split('T')[0] } : item
        ));
        setShowDetailModal(false);
        alert(`Simulated: Quote approved. Work Order generated.`);
    };

    const handleMarkCompleted = () => {
        if (window.confirm("Mark this work as completed?")) {
             setServiceRFQs(prev => prev.map(item => 
                item.id === selectedRFQ.id ? { ...item, status: 'Completed', completionDate: new Date().toISOString().split('T')[0] } : item
            ));
            setShowDetailModal(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Service RFQs</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage assigned service requests and work orders.</p>
                </div>
            </div>

            {/* Tabs - Responsive Wrapped & Readable */}
             <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="border-b border-slate-200 p-2">
                    <div className="flex flex-wrap gap-2 bg-slate-50/80 rounded-xl p-1.5">
                        {tabs.map((tab) => {
                            const count = serviceRFQs.filter(r => r.status === tab.id).length;
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            
                             // Dynamic Color Styles for Active State (Solid Colors)
                            const styles = {
                                slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                                blue:    isActive ? 'bg-blue-600 text-white ring-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                                emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                                indigo:  isActive ? 'bg-indigo-600 text-white ring-indigo-700' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700',
                                rose:    isActive ? 'bg-rose-600 text-white ring-rose-700' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700',
                            };
                            const currentStyle = styles[tab.color] || styles.slate;
                            
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        relative flex flex-col sm:flex-row items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm flex-1 min-w-[45%] sm:min-w-fit h-auto
                                        ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                        ${currentStyle}
                                    `}
                                >
                                    <Icon className={`w-4 h-4 mb-1 sm:mb-0 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                    <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                                    {count > 0 && (
                                        <span className={`
                                            ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold min-w-[20px] text-center
                                            ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}
                                        `}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Table */}
                 <>
                    <div className="md:hidden space-y-4 p-4 bg-slate-50">
                        {filteredRFQs.length > 0 ? filteredRFQs.map((rfq) => (
                            <div key={rfq.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-xs text-slate-500 font-mono mb-1">{rfq.id}</div>
                                        <div className="text-sm font-bold text-slate-900 line-clamp-2">{rfq.serviceName}</div>
                                    </div>
                                    <StatusBadge status={rfq.status} />
                                </div>
                                <div className="text-xs text-slate-600 mb-2 line-clamp-2">{rfq.description}</div>
                                <div className="flex gap-2 text-xs text-slate-500 mb-4">
                                    <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1"><MapPin className="w-3 h-3"/> {rfq.location}</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1"><Calendar className="w-3 h-3"/> Due: {rfq.dueDate}</span>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={() => handleOpenDetail(rfq)} className="w-full sm:w-auto px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100">
                                        {rfq.status === 'New' ? 'Prepare Quote' : 'View Details'}
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-500 text-sm">No requests found.</div>
                        )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">RFQ ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Required</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Due Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredRFQs.length > 0 ? filteredRFQs.map((rfq) => (
                                    <tr key={rfq.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 align-middle font-mono text-sm font-medium text-slate-600">{rfq.id}</td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="text-sm font-bold text-slate-900">{rfq.serviceName}</div>
                                            <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{rfq.description}</div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-sm text-slate-600">{rfq.location}</td>
                                        <td className="px-6 py-4 align-middle text-center text-sm font-medium text-slate-600">{rfq.dueDate}</td>
                                        <td className="px-6 py-4 align-middle text-center"><StatusBadge status={rfq.status} /></td>
                                        <td className="px-6 py-4 align-middle text-right">
                                            <button onClick={() => handleOpenDetail(rfq)} className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                {rfq.status === 'New' ? 'Prepare Quote' : 'View Details'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-sm">No requests found in this status.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </>
            </div>

            {/* RFQ Detail Modal */}
            {showDetailModal && selectedRFQ && (
                <Modal 
                    title={
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedRFQ.status === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                {selectedRFQ.status === 'New' ? <FileQuestion className="w-5 h-5"/> : <ClipboardList className="w-5 h-5"/>}
                            </div>
                            <div>
                                <span className="block text-lg font-bold">{selectedRFQ.serviceName}</span>
                                <span className="block text-xs font-normal text-slate-500 font-mono">{selectedRFQ.id}</span>
                            </div>
                        </div>
                    }
                    onClose={() => setShowDetailModal(false)}
                    size="3xl"
                    footer={
                        selectedRFQ.status === 'New' ? (
                            <div className="flex justify-between w-full">
                                <button onClick={handleDeclineRFQ} className="px-4 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-lg transition-colors text-sm uppercase tracking-wide">Decline Request</button>
                                <div className="flex gap-3">
                                    <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
                                    <PrimaryButton onClick={handleSubmitQuote} className="w-auto">Submit Quotation</PrimaryButton>
                                </div>
                            </div>
                        ) : selectedRFQ.status === 'Quoted' ? (
                            <div className="flex justify-end gap-3 w-full">
                                <div className="mr-auto flex items-center gap-2 text-amber-600 text-xs font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                    <Clock className="w-3 h-3"/> Awaiting Buyer Approval
                                </div>
                                <button onClick={handleSimulateApproval} className="text-xs text-slate-400 hover:text-indigo-600 underline">Simulate Approval (Dev)</button>
                                <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">Close</button>
                            </div>
                        ) : selectedRFQ.status === 'Work Order' ? (
                             <div className="flex justify-between w-full">
                                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                    <HardHat className="w-3 h-3"/> Active Work Order
                                </div>
                                <PrimaryButton onClick={handleMarkCompleted} className="w-auto bg-emerald-600 hover:bg-emerald-700">Mark as Completed</PrimaryButton>
                            </div>
                        ) : (
                            <div className="flex justify-end w-full">
                                <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">Close</button>
                            </div>
                        )
                    }
                >
                    <div className="space-y-6">
                        {/* 1. Request Details */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Scope of Work</h4>
                            <p className="text-sm text-slate-800 leading-relaxed mb-4">{selectedRFQ.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Location</label>
                                    <p className="text-sm font-medium text-slate-900 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400"/> {selectedRFQ.location}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Requested By</label>
                                    <p className="text-sm font-medium text-slate-900">{selectedRFQ.requester}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Due Date</label>
                                    <p className="text-sm font-medium text-slate-900 flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400"/> {selectedRFQ.dueDate}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 uppercase font-bold">Priority</label>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">High</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quotation Form (Or View) */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                {selectedRFQ.status === 'New' ? <Edit className="w-4 h-4"/> : <ClipboardList className="w-4 h-4"/>} 
                                {selectedRFQ.status === 'New' ? 'Prepare Quotation' : 'Submitted Quotation Details'}
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <FormInput 
                                        id="quotePrice" 
                                        label="Total Price (AED)" 
                                        type="number" 
                                        icon={DollarSign}
                                        value={quoteData.price}
                                        onChange={(e) => setQuoteData({...quoteData, price: e.target.value})}
                                        disabled={selectedRFQ.status !== 'New'}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <FormInput 
                                        id="quoteTimeline" 
                                        label="Estimated Timeline (Days)" 
                                        type="number" 
                                        icon={Timer}
                                        value={quoteData.timeline}
                                        onChange={(e) => setQuoteData({...quoteData, timeline: e.target.value})}
                                        disabled={selectedRFQ.status !== 'New'}
                                        placeholder="e.g. 3"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Additional Notes / Exclusions</label>
                                    <textarea 
                                        rows={3}
                                        className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
                                        value={quoteData.notes}
                                        onChange={(e) => setQuoteData({...quoteData, notes: e.target.value})}
                                        disabled={selectedRFQ.status !== 'New'}
                                        placeholder="Specify any dependencies, exclusions or clarifications..."
                                    ></textarea>
                                </div>
                            </div>

                             {selectedRFQ.status === 'New' && (
                                <div className="mt-4 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 text-sm gap-2 cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-colors">
                                    <UploadCloud className="w-5 h-5"/>
                                    <span>Upload Formal Proposal (PDF) - Optional</span>
                                </div>
                            )}
                        </div>

                        {/* 3. Work Order Status (If applicable) */}
                        {selectedRFQ.status === 'Work Order' && (
                             <div className="mt-6 border-t border-slate-200 pt-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <HardHat className="w-4 h-4"/> Execution
                                </h4>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
                                    <div className="bg-white p-3 rounded-full shadow-sm text-emerald-600">
                                        <CheckCircle className="w-6 h-6"/>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-emerald-900">Work Order Active</h5>
                                        <p className="text-sm text-emerald-700">Please proceed with the service execution as per the approved quote. Once done, mark as completed.</p>
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- PAYMENTS & INVOICES MODULE (UPDATED)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const PaymentsPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDisputeModal, setShowDisputeModal] = useState(false);
    const [disputeForm, setDisputeForm] = useState({ invoiceNo: '', type: 'Short Payment', amount: '', remarks: '', file: null });

    // --- MOCK DATA ---
    const soaData = [
        // Opening Balance
        { id: 0, date: '2025-10-01', transNo: 'OPENING', type: 'Opening', desc: 'Opening Balance', debit: 0, credit: 0, balance: 2500.00 },
        // Transactions
        { id: 1, date: '2025-10-10', transNo: 'INV-2024-099', type: 'Invoice', desc: 'Purchase Invoice #INV-2024-099', debit: 2500.00, credit: 0, balance: 5000.00, ref: 'PO-9800', dueDate: '2025-11-09' },
        { id: 2, date: '2025-11-15', transNo: 'PAY-8810', type: 'Payment', desc: 'Payment Received - Cheque', debit: 0, credit: 12500.00, balance: -7500.00, ref: 'CHQ-101' }, // Payment is Credit here per instruction
        { id: 3, date: '2025-11-25', transNo: 'INV-2025-002', type: 'Invoice', desc: 'Purchase Invoice #INV-2025-002', debit: 4200.00, credit: 0, balance: -3300.00, ref: 'PO-9955', dueDate: '2025-12-25' },
        { id: 4, date: '2025-12-15', transNo: 'INV-2025-001', type: 'Invoice', desc: 'Purchase Invoice #INV-2025-001', debit: 14500.50, credit: 0, balance: 11200.50, ref: 'PO-9982', dueDate: '2026-01-14' },
        { id: 5, date: '2025-12-18', transNo: 'INV-2025-003', type: 'Invoice', desc: 'Purchase Invoice #INV-2025-003', debit: 8200.00, credit: 0, balance: 19400.50, ref: 'PO-9985', dueDate: '2026-01-17' },
        { id: 6, date: '2025-12-20', transNo: 'PAY-8821', type: 'Payment', desc: 'Payment Received - Bank Transfer', debit: 0, credit: 4200.00, balance: 15200.50, ref: 'TRF-559' },
        { id: 7, date: '2025-12-21', transNo: 'CN-2025-001', type: 'Credit Note', desc: 'CN for Damaged Goods (INV-2025-001)', debit: 0, credit: 500.00, balance: 14700.50, ref: 'INV-2025-001' }
    ];

    const [disputes, setDisputes] = useState([
        { id: 1, invoiceNo: 'INV-2024-099', type: 'Short Payment', amount: 500, status: 'Under Review', date: '2025-11-20' }
    ]);

    // Recalculate Running Balance for Display Correctness
    let runningBalance = soaData[0].balance;
    const computedSoa = soaData.slice(1).map(item => {
        runningBalance = runningBalance + item.debit - item.credit;
        return { ...item, balance: runningBalance };
    });
    // Add Opening Back
    const fullSoa = [soaData[0], ...computedSoa];

    // Derived Lists
    const pendingInvoices = computedSoa.filter(i => i.type === 'Invoice').map(inv => {
        // Find credits applied to this invoice (Mock logic: assumption based on balance or explicit linking)
        // For simpler display, we use the logic: Invoice Amount - (Paid/CNs). 
        // Here we mock "Paid Amount" based on status for the demo.
        const isPaid = inv.transNo === 'INV-2025-002'; // Fully Paid example
        const isPartial = false;
        const paidAmt = isPaid ? inv.debit : 0;
        const balance = inv.debit - paidAmt;
        
        // Aging
        const due = new Date(inv.dueDate);
        const today = new Date();
        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isOverdue = today > due && balance > 0;

        return { 
            ...inv, 
            paid: paidAmt, 
            balanceAmt: balance, 
            aging: balance > 0 ? (isOverdue ? diffDays : 0) : 0,
            status: balance === 0 ? 'Paid' : isOverdue ? 'Overdue' : 'Pending'
        };
    }).filter(i => i.status !== 'Paid');

    const receivedPayments = computedSoa.filter(i => i.type === 'Payment');
    const creditNotes = computedSoa.filter(i => i.type === 'Credit Note');

    // Dashboard Stats
    const totalOutstanding = fullSoa[fullSoa.length - 1].balance;
    const overdueAmount = pendingInvoices.filter(i => i.status === 'Overdue').reduce((acc, curr) => acc + curr.balanceAmt, 0);
    const paymentsThisMonth = receivedPayments.filter(p => p.date.startsWith('2025-12')).reduce((acc, curr) => acc + curr.credit, 0);
    const cnBalance = 2500; // Mock Available CN Balance

    const handleDisputeSubmit = () => {
        setDisputes([...disputes, { 
            id: Date.now(), 
            invoiceNo: disputeForm.invoiceNo, 
            type: disputeForm.type, 
            amount: Number(disputeForm.amount), 
            status: 'Open', 
            date: new Date().toISOString().split('T')[0] 
        }]);
        setShowDisputeModal(false);
        setDisputeForm({ invoiceNo: '', type: 'Short Payment', amount: '', remarks: '', file: null });
        alert('Dispute raised successfully.');
    };

    const tabs = [
        { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'slate' },
        { id: 'Pending Payments', icon: Clock, label: 'Pending Payments', color: 'amber' },
        { id: 'Received Payments', icon: CheckCircle, label: 'Received Payments', color: 'emerald' },
        { id: 'Payment History', icon: History, label: 'Payment History', color: 'slate' },
        { id: 'SOA', icon: ScrollText, label: 'Statement of Account', color: 'indigo' },
        { id: 'Invoices & CNs', icon: FileSpreadsheet, label: 'Invoices & Credit Notes', color: 'blue' },
        { id: 'Payment Disputes', icon: AlertTriangle, label: 'Payment Disputes', color: 'rose' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Payments & Finance</h1>
                    <p className="text-slate-500 text-sm mt-1">Financial overview, statements, and dispute management.</p>
                </div>
            </div>

            {/* Navigation Tabs - ENHANCED WRAPPED & READABLE */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="border-b border-slate-200 p-2">
                    <div className="flex flex-wrap gap-2 bg-slate-50/80 rounded-xl p-1.5">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            
                            const styles = {
                                slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                                amber:   isActive ? 'bg-amber-500 text-white ring-amber-600' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700',
                                emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                                indigo:  isActive ? 'bg-indigo-600 text-white ring-indigo-700' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700',
                                blue:    isActive ? 'bg-blue-600 text-white ring-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                                rose:    isActive ? 'bg-rose-600 text-white ring-rose-700' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700',
                            };
                            const currentStyle = styles[tab.color] || styles.slate;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex flex-col sm:flex-row items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm flex-1 min-w-[45%] sm:min-w-fit h-auto
                                        ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                        ${currentStyle}
                                    `}
                                >
                                    <tab.icon className={`w-4 h-4 mb-1 sm:mb-0 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                    <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* --- DASHBOARD TAB --- */}
                {activeTab === 'Dashboard' && (
                    <div className="p-6 bg-slate-50/50">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                            <StatCard title="Total Outstanding" value={`AED ${totalOutstanding.toLocaleString()}`} change="Credit Bal" changeType="neutral" icon={Briefcase} variant="blue" />
                            <StatCard title="Overdue Amount" value={`AED ${overdueAmount.toLocaleString()}`} change={overdueAmount > 0 ? "Critical" : "Clear"} changeType={overdueAmount > 0 ? "negative" : "positive"} icon={AlertCircle} variant={overdueAmount > 0 ? "orange" : "green"} />
                            <StatCard title="Payments (Dec)" value={`AED ${paymentsThisMonth.toLocaleString()}`} change="Received" changeType="positive" icon={CheckCircle} variant="white" />
                            <StatCard title="Next Payment" value="Jan 15" change="Expected" changeType="neutral" icon={Calendar} variant="white" />
                            <StatCard title="Avail. Credit Notes" value={`AED ${cnBalance.toLocaleString()}`} change="Unused" changeType="positive" icon={FileText} variant="purple" />
                        </div>

                        {/* Charts Area (Mocked Visuals) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card title="Monthly Debit vs Credit">
                                <div className="h-64 flex items-end justify-between gap-4 px-4">
                                    {['Oct', 'Nov', 'Dec'].map((m, i) => (
                                        <div key={m} className="flex-1 flex flex-col justify-end gap-1 group">
                                            <div className="w-full flex gap-1 h-full items-end justify-center">
                                                <div className={`w-8 bg-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-600 ${i===0?'h-[20%]':i===1?'h-[40%]':'h-[80%]'}`} title="Debit"></div>
                                                <div className={`w-8 bg-green-500 rounded-t-sm transition-all duration-500 hover:bg-green-600 ${i===0?'h-[0%]':i===1?'h-[70%]':'h-[30%]'}`} title="Credit"></div>
                                            </div>
                                            <span className="text-xs text-center text-slate-500 font-medium">{m}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-6 mt-4 text-xs">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Debit (Invoices)</div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Credit (Payments)</div>
                                </div>
                            </Card>

                            <Card title="Invoice Aging Buckets">
                                <div className="h-64 flex items-center justify-center">
                                    <div className="w-full max-w-md space-y-4">
                                        {[
                                            { label: '0-30 Days', val: 65, color: 'bg-green-500' },
                                            { label: '31-60 Days', val: 20, color: 'bg-yellow-400' },
                                            { label: '61-90 Days', val: 10, color: 'bg-orange-500' },
                                            { label: '90+ Days', val: 5, color: 'bg-red-500' },
                                        ].map((bucket) => (
                                            <div key={bucket.label}>
                                                <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                                                    <span>{bucket.label}</span>
                                                    <span>{bucket.val}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                    <div className={`${bucket.color} h-2.5 rounded-full`} style={{ width: `${bucket.val}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* --- PENDING PAYMENTS TAB --- */}
                {activeTab === 'Pending Payments' && (
                    <>
                        <div className="md:hidden space-y-4 p-4 bg-slate-50">
                            {pendingInvoices.map((inv) => (
                                <div key={inv.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{inv.transNo}</div>
                                            <div className="text-xs text-slate-500">{inv.date}</div>
                                        </div>
                                        <StatusBadge status={inv.status} />
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-100 pt-3 mt-2">
                                        <div className="text-xs text-slate-600">
                                            <div className="mb-1">Ref: {inv.ref}</div>
                                            <div>Aging: {inv.aging > 0 ? <span className="text-red-600 font-bold">{inv.aging} Days</span> : '-'}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400">Balance Amount</div>
                                            <div className="font-bold text-slate-900 text-lg">AED {inv.balanceAmt.toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <button onClick={() => alert('Viewing ERP Invoice...')} className="py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">View Invoice</button>
                                        <button onClick={() => { setDisputeForm({...disputeForm, invoiceNo: inv.transNo}); setShowDisputeModal(true); }} className="py-2 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50">Raise Dispute</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Invoice Details</th>
                                        <th className="px-6 py-4">Ref Numbers</th>
                                        <th className="px-6 py-4 text-right">Debit (AED)</th>
                                        <th className="px-6 py-4 text-right">Balance (AED)</th>
                                        <th className="px-6 py-4 text-center">Aging</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {pendingInvoices.length > 0 ? pendingInvoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 text-sm">{inv.transNo}</div>
                                                <div className="text-xs text-slate-500 mt-1">{inv.date}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-600 font-mono">
                                                <div>PO: {inv.ref}</div>
                                                <div>GRN: Auto-Ref</div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-slate-900">{inv.debit.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-900">{inv.balanceAmt.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                {inv.aging > 0 ? <span className="text-red-600 font-bold">{inv.aging} Days</span> : <span className="text-slate-400">-</span>}
                                            </td>
                                            <td className="px-6 py-4 text-center"><StatusBadge status={inv.status} /></td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => alert('Viewing ERP Invoice...')} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg"><Eye className="w-4 h-4"/></button>
                                                    <button onClick={() => { setDisputeForm({...disputeForm, invoiceNo: inv.transNo}); setShowDisputeModal(true); }} className="p-2 text-slate-400 hover:text-red-600 rounded-lg" title="Raise Dispute"><AlertTriangle className="w-4 h-4"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">No pending payments.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* --- RECEIVED PAYMENTS TAB --- */}
                {activeTab === 'Received Payments' && (
                    <>
                        <div className="md:hidden space-y-4 p-4 bg-slate-50">
                            {receivedPayments.map((pay) => (
                                <div key={pay.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{pay.transNo}</div>
                                            <div className="text-xs text-slate-500">{pay.date}</div>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{pay.desc.split(' - ')[1] || 'Payment'}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="text-xs font-mono text-slate-600">Ref: {pay.ref}</div>
                                        <div className="font-bold text-green-700">AED {pay.credit.toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Transaction Date</th>
                                        <th className="px-6 py-4">Transaction No</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Reference</th>
                                        <th className="px-6 py-4 text-right">Credit Amount (AED)</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {receivedPayments.map((pay) => (
                                        <tr key={pay.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm text-slate-600">{pay.date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{pay.transNo}</td>
                                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{pay.desc.split(' - ')[1] || 'Payment'}</span></td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-600">{pay.ref}</td>
                                            <td className="px-6 py-4 text-right font-bold text-green-700">{pay.credit.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600 p-2"><Download className="w-4 h-4"/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* --- PAYMENT HISTORY / LEDGER TAB --- */}
                {activeTab === 'Payment History' && (
                    <>
                        <div className="md:hidden space-y-4 p-4 bg-slate-50">
                            {fullSoa.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-slate-500">{item.date}</span>
                                        <span className="text-xs font-bold text-slate-900">{item.transNo}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-800 mb-2">{item.desc}</div>
                                    <div className="flex justify-between text-xs border-t border-slate-100 pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400">Amount</span>
                                            <span className={`font-bold ${item.credit > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                                                {item.credit > 0 ? `+${item.credit.toLocaleString()}` : `-${item.debit.toLocaleString()}`}
                                            </span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-slate-400">Balance</span>
                                            <span className="font-bold text-slate-900">{item.balance.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Trans No</th>
                                        <th className="px-6 py-4">Description</th>
                                        <th className="px-6 py-4 text-right">Debit</th>
                                        <th className="px-6 py-4 text-right">Credit</th>
                                        <th className="px-6 py-4 text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {fullSoa.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm text-slate-600">{item.date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.transNo}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{item.desc}</td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-900">{item.debit > 0 ? item.debit.toLocaleString() : '-'}</td>
                                            <td className="px-6 py-4 text-right text-sm text-green-700">{item.credit > 0 ? item.credit.toLocaleString() : '-'}</td>
                                            <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{item.balance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* --- SOA TAB --- */}
                {activeTab === 'SOA' && (
                    <div className="p-8 bg-white min-h-[600px] flex flex-col items-center">
                        <div className="w-full max-w-4xl border border-slate-200 shadow-xl rounded-none bg-white p-10 font-mono text-sm">
                            <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 uppercase">Statement of Account</h2>
                                    <p className="mt-1">Abreco Trading LLC</p>
                                    <p>Dubai, UAE</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">Vendor: Royal Harvest Foods</p>
                                    <p>Date: {new Date().toLocaleDateString()}</p>
                                    <p>Currency: AED</p>
                                </div>
                            </div>
                            
                            <table className="w-full text-left mb-8">
                                <thead className="border-b border-slate-400">
                                    <tr>
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Ref No</th>
                                        <th className="py-2">Description</th>
                                        <th className="py-2 text-right">Debit</th>
                                        <th className="py-2 text-right">Credit</th>
                                        <th className="py-2 text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fullSoa.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100">
                                            <td className="py-3">{item.date}</td>
                                            <td className="py-3">{item.transNo}</td>
                                            <td className="py-3">{item.desc}</td>
                                            <td className="py-3 text-right">{item.debit > 0 ? item.debit.toFixed(2) : ''}</td>
                                            <td className="py-3 text-right">{item.credit > 0 ? item.credit.toFixed(2) : ''}</td>
                                            <td className="py-3 text-right font-bold">{item.balance.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-end border-t-2 border-slate-800 pt-4">
                                <div className="w-64">
                                    <div className="flex justify-between py-1">
                                        <span>Closing Balance:</span>
                                        <span className="font-bold">{totalOutstanding.toLocaleString()} AED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"><Download className="w-4 h-4"/> Download PDF</button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded hover:bg-slate-50"><FileSpreadsheet className="w-4 h-4"/> Export Excel</button>
                        </div>
                    </div>
                )}

                {/* --- INVOICES & CN TAB --- */}
                {activeTab === 'Invoices & CNs' && (
                    <div className="p-6">
                        <div className="space-y-8">
                            {/* Invoices Section */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><FileText className="w-5 h-5"/> Invoices</h3>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Invoice #</th>
                                                <th className="px-4 py-3 font-semibold">Date</th>
                                                <th className="px-4 py-3 font-semibold text-right">Net</th>
                                                <th className="px-4 py-3 font-semibold text-right">VAT</th>
                                                <th className="px-4 py-3 font-semibold text-right">Total</th>
                                                <th className="px-4 py-3 font-semibold text-center">Status</th>
                                                <th className="px-4 py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {computedSoa.filter(i => i.type === 'Invoice').map(inv => (
                                                <tr key={inv.id}>
                                                    <td className="px-4 py-3 font-medium">{inv.transNo}</td>
                                                    <td className="px-4 py-3 text-slate-500">{inv.date}</td>
                                                    <td className="px-4 py-3 text-right">{(inv.debit * 0.95).toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-right">{(inv.debit * 0.05).toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-right font-bold">{inv.debit.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-center"><StatusBadge status="Approved"/></td>
                                                    <td className="px-4 py-3 text-right"><button className="text-blue-600 hover:underline">View</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Credit Notes Section */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><FileSpreadsheet className="w-5 h-5"/> Credit Notes</h3>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">CN #</th>
                                                <th className="px-4 py-3 font-semibold">Date</th>
                                                <th className="px-4 py-3 font-semibold">Reason</th>
                                                <th className="px-4 py-3 font-semibold">Related Invoice</th>
                                                <th className="px-4 py-3 font-semibold text-right">Total Credit</th>
                                                <th className="px-4 py-3 font-semibold text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {creditNotes.map(cn => (
                                                <tr key={cn.id}>
                                                    <td className="px-4 py-3 font-medium">{cn.transNo}</td>
                                                    <td className="px-4 py-3 text-slate-500">{cn.date}</td>
                                                    <td className="px-4 py-3">{cn.desc}</td>
                                                    <td className="px-4 py-3 font-mono text-slate-600">{cn.ref}</td>
                                                    <td className="px-4 py-3 text-right font-bold text-green-600">{cn.credit.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-center"><StatusBadge status="Applied"/></td>
                                                </tr>
                                            ))}
                                            {creditNotes.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No credit notes found.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DISPUTES TAB --- */}
                {activeTab === 'Payment Disputes' && (
                    <>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Active Disputes</h3>
                                <PrimaryButton onClick={() => setShowDisputeModal(true)} className="w-auto"><Plus className="w-4 h-4"/> Raise Dispute</PrimaryButton>
                            </div>
                            <div className="md:hidden space-y-4">
                                {disputes.map(d => (
                                    <div key={d.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                        <div className="flex justify-between mb-2">
                                            <div className="font-bold text-slate-900">{d.invoiceNo}</div>
                                            <StatusBadge status={d.status} />
                                        </div>
                                        <div className="text-sm text-slate-600 mb-2">{d.type}</div>
                                        <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-2">
                                            <span>Date: {d.date}</span>
                                            <span className="font-bold text-slate-900">AED {d.amount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block border border-slate-200 rounded-lg overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Invoice Ref</th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Dispute Type</th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Amount</th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-center">Date</th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {disputes.map(d => (
                                            <tr key={d.id}>
                                                <td className="px-6 py-4 font-bold text-slate-900">{d.invoiceNo}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{d.type}</td>
                                                <td className="px-6 py-4 font-medium text-slate-900">AED {d.amount}</td>
                                                <td className="px-6 py-4 text-center text-sm text-slate-500">{d.date}</td>
                                                <td className="px-6 py-4 text-center"><StatusBadge status={d.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Dispute Modal */}
            {showDisputeModal && (
                <Modal title="Raise Payment Dispute" onClose={() => setShowDisputeModal(false)}>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">Disputes can only be raised for invoices that are not fully settled or have discrepancies.</p>
                        
                        <FormSelect id="dispInv" label="Select Invoice" value={disputeForm.invoiceNo} onChange={(e) => setDisputeForm({...disputeForm, invoiceNo: e.target.value})}>
                            <option value="">Select Invoice...</option>
                            {pendingInvoices.map(i => <option key={i.id} value={i.transNo}>{i.transNo} (Bal: {i.balanceAmt})</option>)}
                        </FormSelect>

                        <FormSelect id="dispType" label="Dispute Type" value={disputeForm.type} onChange={(e) => setDisputeForm({...disputeForm, type: e.target.value})}>
                            <option value="Short Payment">Short Payment</option>
                            <option value="Missing Payment">Missing Payment</option>
                            <option value="Credit Note Mismatch">Credit Note Mismatch</option>
                            <option value="Tax Issue">Tax / VAT Issue</option>
                        </FormSelect>

                        <FormInput 
                            id="dispAmt" label="Disputed Amount (AED)" type="number" 
                            value={disputeForm.amount} onChange={(e) => setDisputeForm({...disputeForm, amount: e.target.value})}
                        />

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Detailed Remarks</label>
                            <textarea 
                                rows={3}
                                className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 sm:text-sm"
                                placeholder="Explain the issue..."
                                value={disputeForm.remarks}
                                onChange={(e) => setDisputeForm({...disputeForm, remarks: e.target.value})}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Evidence (Optional)</label>
                            <div className="border border-slate-300 border-dashed rounded-lg p-4 flex items-center justify-center bg-slate-50 cursor-pointer">
                                <span className="text-xs text-slate-500 flex items-center gap-2"><UploadCloud className="w-4 h-4"/> Upload Statement/Proof</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <PrimaryButton onClick={handleDisputeSubmit}>Submit Dispute</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- REPORTS & ANALYTICS MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const ReportsPage = ({ purchaseOrders = [], grnList = [], serviceRFQs = [], products = [] }) => {
    const [activeReport, setActiveReport] = useState('Dashboard');
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // --- MOCK DATA FOR MISSING CONTEXTS (Invoices, Payments, Bids) ---
    // In a real app, these would come from the same props/context as the other modules
    const mockInvoices = [
        { id: 'INV-001', date: '2025-12-15', ref: 'PO-9982', gross: 15225.50, tax: 725.00, net: 14500.50, status: 'Paid' },
        { id: 'INV-002', date: '2025-12-18', ref: 'PO-9985', gross: 8610.00, tax: 410.00, net: 8200.00, status: 'Pending' },
        { id: 'INV-003', date: '2025-12-20', ref: 'GRN-2025-895', gross: 2205.00, tax: 105.00, net: 2100.00, status: 'Overdue' },
    ];

    const mockPayments = [
        { id: 'PAY-101', date: '2025-12-01', ref: 'INV-001', method: 'Bank Transfer', amount: 15225.50, balance: 0, status: 'Completed' },
        { id: 'PAY-102', date: '2025-11-15', ref: 'INV-2024-099', method: 'Cheque', amount: 2500.00, balance: 0, status: 'Completed' },
    ];

    const mockBids = [
        { id: 'BID-101', category: 'Grocery', date: '2025-12-01', amount: 12500, rank: 'Low', status: 'Won' },
        { id: 'BID-102', category: 'Maintenance', date: '2025-12-10', amount: 4500, rank: 'High', status: 'Lost' },
        { id: 'BID-105', category: 'Grocery', date: '2025-12-19', amount: 8500, rank: 'Medium', status: 'Active' },
    ];

    // --- CALCULATED METRICS ---
    const metrics = {
        totalPO: purchaseOrders.length,
        completedPO: purchaseOrders.filter(p => ['Delivered', 'Completed'].includes(p.status)).length,
        pendingPO: purchaseOrders.filter(p => ['New', 'In Progress', 'Accepted'].includes(p.status)).length,
        totalGRN: grnList.length,
        totalInvoiced: mockInvoices.reduce((sum, inv) => sum + inv.gross, 0),
        outstandingPay: mockInvoices.filter(i => i.status !== 'Paid').reduce((sum, inv) => sum + inv.gross, 0),
        totalServices: serviceRFQs.length,
        activeBids: mockBids.filter(b => b.status === 'Active').length
    };

    const reportTypes = [
        { id: 'Dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'PurchaseOrders', label: 'Purchase Order Reports', icon: ShoppingCart },
        { id: 'GRN', label: 'GRN Reports', icon: ClipboardCheck },
        { id: 'Invoices', label: 'Invoice Reports', icon: FileText },
        { id: 'Payments', label: 'Payment & Settlement', icon: CreditCard },
        { id: 'Services', label: 'Service Reports', icon: Briefcase },
        { id: 'Bids', label: 'Bidding Reports', icon: Gavel },
        { id: 'Products', label: 'Product Activity', icon: Package }
    ];

    const renderDashboard = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Purchase Orders" value={metrics.totalPO} change="All Time" changeType="neutral" icon={ShoppingCart} variant="blue" />
                <StatCard title="Pending Orders" value={metrics.pendingPO} change="Action Req." changeType="neutral" icon={Clock} variant="orange" />
                <StatCard title="Completed Orders" value={metrics.completedPO} change="Fulfilled" changeType="positive" icon={CheckCircle} variant="green" />
                <StatCard title="Total GRNs" value={metrics.totalGRN} change="Received" changeType="neutral" icon={ClipboardCheck} variant="white" />
                
                <StatCard title="Total Invoiced" value={`AED ${metrics.totalInvoiced.toLocaleString()}`} change="Gross" changeType="neutral" icon={FileText} variant="purple" />
                <StatCard title="Outstanding" value={`AED ${metrics.outstandingPay.toLocaleString()}`} change="Pending Pay" changeType="negative" icon={AlertCircle} variant="white" />
                <StatCard title="Service Orders" value={metrics.totalServices} change="Total" changeType="neutral" icon={HardHat} variant="blue" />
                <StatCard title="Active Bids" value={metrics.activeBids} change="Live" changeType="neutral" icon={Gavel} variant="white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Quick Actions">
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveReport('PurchaseOrders')} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors text-left">
                            <h4 className="font-bold text-slate-800">View Orders</h4>
                            <p className="text-xs text-slate-500 mt-1">Check detailed PO status logs</p>
                        </button>
                        <button onClick={() => setActiveReport('Invoices')} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors text-left">
                            <h4 className="font-bold text-slate-800">Track Invoices</h4>
                            <p className="text-xs text-slate-500 mt-1">Monitor payments and due dates</p>
                        </button>
                    </div>
                </Card>
                <Card title="System Status">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 mb-2">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600"/>
                            <span className="text-sm font-medium text-green-800">Vendor Account Active</span>
                        </div>
                        <span className="text-xs text-green-700">Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3">
                            <Info className="w-5 h-5 text-blue-600"/>
                            <span className="text-sm font-medium text-blue-800">Compliance Documents</span>
                        </div>
                        <span className="text-xs text-blue-700">Up to Date</span>
                    </div>
                </Card>
            </div>
        </div>
    );

    // Reusable Table Renderer
    const ReportTable = ({ columns, data, onExport }) => (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <select 
                        className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active / Open</option>
                        <option value="Closed">Closed / Paid</option>
                    </select>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50" onClick={onExport}>
                        <FileSpreadsheet className="w-4 h-4"/> Export XLS
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <Printer className="w-4 h-4"/> Print
                    </button>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4 bg-slate-50">
                {data.filter(item => {
                    const matchesSearch = Object.values(item).some(val => 
                        String(val).toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    const status = item.status || item.paymentStatus || item.approvalStatus;
                    const matchesStatus = statusFilter === 'All' || 
                        (statusFilter === 'Active' && ['New', 'Pending', 'In Progress', 'Active', 'Won', 'Approved'].includes(status)) ||
                        (statusFilter === 'Closed' && ['Paid', 'Completed', 'Delivered', 'Closed', 'Rejected'].includes(status));
                    return matchesSearch && matchesStatus;
                }).map((row, rIdx) => (
                    <div key={rIdx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        {columns.map((col, cIdx) => (
                            <div key={cIdx} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                                <span className="text-xs font-semibold text-slate-500 uppercase">{col.header}</span>
                                <span className={`text-sm ${col.className || 'text-slate-700'}`}>
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.filter(item => {
                            // Basic filter logic
                            const matchesSearch = Object.values(item).some(val => 
                                String(val).toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            // Simple status filter map - customizable per report
                            const status = item.status || item.paymentStatus || item.approvalStatus;
                            const matchesStatus = statusFilter === 'All' || 
                                (statusFilter === 'Active' && ['New', 'Pending', 'In Progress', 'Active', 'Won', 'Approved'].includes(status)) ||
                                (statusFilter === 'Closed' && ['Paid', 'Completed', 'Delivered', 'Closed', 'Rejected'].includes(status));
                            
                            return matchesSearch && matchesStatus;
                        }).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                {columns.map((col, cIdx) => (
                                    <td key={cIdx} className={`px-6 py-4 text-sm ${col.className || 'text-slate-700'} ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}>
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // --- VIEW LOGIC SWITCHER ---
    const renderContent = () => {
        switch (activeReport) {
            case 'PurchaseOrders':
                return (
                    <ReportTable 
                        data={purchaseOrders}
                        columns={[
                            { header: 'PO Number', accessor: 'poNo', className: 'font-bold' },
                            { header: 'Date', accessor: 'date' },
                            { header: 'Warehouse', accessor: 'warehouse' },
                            { header: 'Items', accessor: 'totalItems', align: 'center' },
                            { header: 'Net Amount', render: (row) => `AED ${row.netAmount.toLocaleString()}`, align: 'right', className: 'font-mono' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' }
                        ]}
                    />
                );
            case 'GRN':
                return (
                    <ReportTable 
                        data={grnList}
                        columns={[
                            { header: 'GRN Number', accessor: 'grnNumber', className: 'font-bold text-indigo-600' },
                            { header: 'Related PO', accessor: 'poNumber', className: 'font-mono' },
                            { header: 'Date', accessor: 'grnDate' },
                            { header: 'Received', accessor: 'totalReceivedQty', align: 'center' },
                            { header: 'Shortage', render: (row) => row.shortageQty > 0 ? <span className="text-red-600 font-bold">{row.shortageQty}</span> : '-', align: 'center' },
                            { header: 'Accepted', accessor: 'totalReceivedQty', align: 'center' }, // Simplified mock logic
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' }
                        ]}
                    />
                );
            case 'Invoices':
                return (
                    <ReportTable 
                        data={mockInvoices}
                        columns={[
                            { header: 'Invoice #', accessor: 'id', className: 'font-bold' },
                            { header: 'Date', accessor: 'date' },
                            { header: 'Ref Doc', accessor: 'ref', className: 'font-mono text-slate-500' },
                            { header: 'Gross Amt', render: (row) => `AED ${row.gross.toLocaleString()}`, align: 'right' },
                            { header: 'Tax', render: (row) => `AED ${row.tax.toLocaleString()}`, align: 'right', className: 'text-slate-500' },
                            { header: 'Net Payable', render: (row) => `AED ${row.net.toLocaleString()}`, align: 'right', className: 'font-bold text-slate-900' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' }
                        ]}
                    />
                );
            case 'Payments':
                return (
                    <ReportTable 
                        data={mockPayments}
                        columns={[
                            { header: 'Payment Ref', accessor: 'id', className: 'font-mono' },
                            { header: 'Inv Ref', accessor: 'ref', className: 'font-bold' },
                            { header: 'Date', accessor: 'date' },
                            { header: 'Method', accessor: 'method' },
                            { header: 'Paid Amount', render: (row) => `AED ${row.amount.toLocaleString()}`, align: 'right', className: 'font-bold text-green-700' },
                            { header: 'Balance', render: (row) => `AED ${row.balance.toLocaleString()}`, align: 'right' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' }
                        ]}
                    />
                );
            case 'Services':
                return (
                    <ReportTable 
                        data={serviceRFQs}
                        columns={[
                            { header: 'Request #', accessor: 'id', className: 'font-mono' },
                            { header: 'Service Type', accessor: 'serviceName' },
                            { header: 'Quoted Amt', render: (row) => row.quoteDetails ? `AED ${row.quoteDetails.price}` : '-', align: 'right' },
                            { header: 'Approved Amt', render: (row) => row.status === 'Work Order' || row.status === 'Completed' ? `AED ${row.quoteDetails.price}` : '-', align: 'right', className: 'font-bold' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' },
                            { header: 'Completion', render: (row) => row.completionDate || '-', align: 'center' }
                        ]}
                    />
                );
            case 'Bids':
                return (
                    <ReportTable 
                        data={mockBids}
                        columns={[
                            { header: 'Bid ID', accessor: 'id', className: 'font-mono' },
                            { header: 'Category', accessor: 'category' },
                            { header: 'Date', accessor: 'date' },
                            { header: 'Your Bid', render: (row) => `AED ${row.amount.toLocaleString()}`, align: 'right', className: 'font-bold' },
                            { header: 'Rank Indicator', render: (row) => (
                                <span className={`px-2 py-1 rounded text-xs font-bold ${row.rank === 'Low' ? 'bg-green-100 text-green-700' : row.rank === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {row.rank}
                                </span>
                            ), align: 'center' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' }
                        ]}
                    />
                );
            case 'Products':
                return (
                    <ReportTable 
                        data={products}
                        columns={[
                            { header: 'Product / Service Name', accessor: 'name', className: 'font-medium' },
                            { header: 'SKU', accessor: 'sku', className: 'font-mono text-xs' },
                            { header: 'Entry Type', render: (row) => row.header === 'Service' ? 'Service' : 'Product', align: 'center' },
                            { header: 'Submission Date', accessor: 'date' },
                            { header: 'Status', render: (row) => <StatusBadge status={row.status} />, align: 'center' },
                            { header: 'Live Date', render: (row) => row.status === 'Approved' ? row.date : '-', align: 'center' }
                        ]}
                    />
                );
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-100px)] overflow-hidden bg-slate-100 rounded-xl border border-slate-200">
            {/* Sidebar Navigation for Reports - Responsive */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 flex flex-col h-auto md:h-full">
                <div className="p-4 md:p-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm md:text-base">
                        <BarChart3 className="w-5 h-5 text-red-600" /> Reports Hub
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 hidden md:block">Consolidated view of your data</p>
                </div>
                
                {/* Mobile Grid / Desktop List */}
                <div className="p-2 md:p-3 overflow-y-auto grid grid-cols-2 gap-2 md:flex md:flex-col md:space-y-1">
                    {reportTypes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveReport(item.id); setSearchQuery(''); setStatusFilter('All'); }}
                            className={`flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm font-bold transition-all ${
                                activeReport === item.id 
                                ? 'bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50 md:bg-transparent'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${activeReport === item.id ? 'text-red-600' : 'text-slate-400'}`} />
                            <span className="text-center md:text-left">{item.label.replace('Reports', '')}</span>
                        </button>
                    ))}
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 mt-auto hidden md:block">
                    <div className="text-xs text-slate-500 font-medium mb-2">Filter by Date Range</div>
                    <select 
                        value={dateRange} 
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-red-500 outline-none"
                    >
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-[600px] md:h-full overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 p-4 md:p-6 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-slate-900">
                            {reportTypes.find(r => r.id === activeReport)?.label}
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-1">
                            {activeReport === 'Dashboard' 
                                ? 'Key performance metrics and summary.' 
                                : `Detailed report for ${dateRange.toLowerCase()}.`
                            }
                        </p>
                    </div>
                    {/* Mobile Date Filter */}
                    <div className="md:hidden">
                         <select 
                            value={dateRange} 
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:ring-1 focus:ring-red-500 outline-none"
                        >
                            <option>30 Days</option>
                            <option>YTD</option>
                        </select>
                    </div>
                    <div className="hidden md:block text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        Read-Only View
                    </div>
                </div>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- HELP & SUPPORT MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const HelpPage = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const videos = [
        { id: 1, title: 'Portal Overview & Navigation', duration: '3:45', thumbnail: 'bg-blue-100', color: 'text-blue-600', description: 'A quick tour of the dashboard and main menu items.' },
        { id: 2, title: 'How to Submit a Product', duration: '5:20', thumbnail: 'bg-green-100', color: 'text-green-600', description: 'Step-by-step guide to adding new items to your catalog.' },
        { id: 3, title: 'Managing Purchase Orders', duration: '4:10', thumbnail: 'bg-orange-100', color: 'text-orange-600', description: 'Learn how to accept, process, and deliver orders.' },
        { id: 4, title: 'Understanding Payments & SOA', duration: '6:00', thumbnail: 'bg-purple-100', color: 'text-purple-600', description: 'Deep dive into financial statements and payment cycles.' },
    ];

    const faqs = [
        { q: 'How do I update my Trade License?', a: 'Navigate to Settings > Company Profile to upload new documents. Once uploaded, they will be sent for verification by our compliance team.' },
        { q: 'When are payments processed?', a: 'Payments are processed weekly on Thursdays for all invoices due within that week, subject to your agreed payment terms (e.g., 30 Days).' },
        { q: 'Why was my product rejected?', a: 'Check the "Denied" tab in Product Management. The rejection reason is listed there. Common reasons include missing barcodes, incorrect pricing, or poor image quality.' },
        { q: 'Can I edit a PO after acceptance?', a: 'No. Once accepted, a PO is a binding contract. If you cannot fulfill it, please contact the procurement team immediately to request a cancellation or amendment.' },
        { q: 'How do I raise a dispute for short payment?', a: 'Go to the Payments module > Payment Disputes tab. Click "Raise Dispute", select the invoice number, and attach any supporting evidence.' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Help Center</h1>
                <p className="text-slate-500 text-sm mt-1">Tutorials, guides, and frequently asked questions to get you started.</p>
            </div>

            {/* Video Tutorials Section */}
            <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-red-600" /> Video Tutorials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div 
                            key={video.id} 
                            onClick={() => setPlayingVideo(video)}
                            className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className={`aspect-video ${video.thumbnail} relative flex items-center justify-center`}>
                                {/* Play Button Overlay */}
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform z-10">
                                    <Play className={`w-5 h-5 ${video.color} fill-current ml-1`} />
                                </div>
                                {/* Duration Badge */}
                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition-colors line-clamp-1">{video.title}</h3>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 group-hover:underline">
                                    Watch Video <ArrowRight className="w-3 h-3"/>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CircleHelp className="w-5 h-5 text-red-600" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                                >
                                    <span className={`font-semibold text-sm ${openFaq === index ? 'text-red-600' : 'text-slate-800'}`}>{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 pt-0 text-sm text-slate-600 bg-slate-50/30 border-t border-slate-100 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Card */}
                <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Still need help?</h2>
                    <Card>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900">Vendor Support</h3>
                            <p className="text-sm text-slate-500 mt-1 mb-4">Available Mon-Fri, 9am - 6pm (GST)</p>
                            
                            <a href="#" onClick={(e) => e.preventDefault()} className="block w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 mb-3 transition-colors shadow-sm">
                                Email Support
                            </a>
                            <button className="block w-full py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                Call +971 4 123 4567
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Video Player Modal */}
            {playingVideo && (
                <Modal 
                    title={playingVideo.title} 
                    onClose={() => setPlayingVideo(null)} 
                    size="4xl"
                >
                    <div className="space-y-4">
                        <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative shadow-2xl">
                            <iframe 
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/lxRwEPvL-mQ?autoplay=1" 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{playingVideo.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">{playingVideo.description}</p>
                                <p className="text-xs text-slate-400 mt-2">Duration: {playingVideo.duration} • Posted by Vendor Success Team</p>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                                <Download className="w-4 h-4"/> Download Transcript
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- SETTINGS MODULE (NEW)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [isEditing, setIsEditing] = useState(false);

    // Mock State for Profile
    const [profile, setProfile] = useState({
        companyName: 'Royal Harvest Foods LLC',
        trn: '100234567890003',
        email: 'contact@royalharvest.com',
        phone: '+971 50 123 4567',
        address: 'Warehouse No. 4, Al Quoz Industrial Area 3, Dubai, UAE',
        website: 'https://www.royalharvest.com',
        licenseNo: 'CN-1234567'
    });

    // Mock State for Bank Details
    const [bankDetails, setBankDetails] = useState({
        bankName: 'Emirates NBD',
        accountNumber: '10120230340455',
        iban: 'AE0202000010120230340455',
        swift: 'EBIBAE',
        beneficiary: 'Royal Harvest Foods LLC'
    });

    // Mock State for Users
    const [users, setUsers] = useState([
        { id: 1, name: 'Ahmed Al-Sayed', email: 'ahmed@royalharvest.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Sarah Jones', email: 'sarah@royalharvest.com', role: 'Sales', status: 'Active' },
        { id: 3, name: 'Logistics Team', email: 'logistics@royalharvest.com', role: 'Viewer', status: 'Inactive' },
    ]);

    // Mock State for Notifications
    const [notifications, setNotifications] = useState({
        emailOrders: true,
        emailPayments: true,
        smsAlerts: false,
        marketing: false,
        securityAlerts: true
    });

    const handleSaveProfile = () => {
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const tabs = [
        { id: 'Profile', icon: Building, label: 'Company Profile' },
        { id: 'Bank', icon: CreditCard, label: 'Bank Details' },
        { id: 'Users', icon: User, label: 'User Management' },
        { id: 'Notifications', icon: Bell, label: 'Notifications' },
        { id: 'Security', icon: Lock, label: 'Security' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <Card>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Company Information</h3>
                                <button 
                                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </button>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Logo Section */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden group">
                                        <Building className="w-12 h-12 text-slate-400" />
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <span className="text-xs text-white font-medium">Change Logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500">ID: VEN-001</span>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput id="compName" label="Company Name" value={profile.companyName} onChange={(e) => setProfile({...profile, companyName: e.target.value})} disabled={!isEditing} icon={Building} />
                                    <FormInput id="license" label="Trade License No." value={profile.licenseNo} onChange={(e) => setProfile({...profile, licenseNo: e.target.value})} disabled={!isEditing} icon={FileText} />
                                    <FormInput id="trn" label="Tax Registration No (TRN)" value={profile.trn} onChange={(e) => setProfile({...profile, trn: e.target.value})} disabled={!isEditing} icon={FileCheck} />
                                    <FormInput id="website" label="Website" value={profile.website} onChange={(e) => setProfile({...profile, website: e.target.value})} disabled={!isEditing} icon={GlobeIcon} />
                                    <FormInput id="email" label="Official Email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} disabled={!isEditing} icon={MailIcon} />
                                    <FormInput id="phone" label="Phone Number" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} disabled={!isEditing} icon={Phone} />
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 tracking-wider">Registered Address</label>
                                        <textarea 
                                            rows={2} 
                                            disabled={!isEditing}
                                            value={profile.address}
                                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                                            className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        
                        <Card>
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Documents Status</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">Trade License</p>
                                            <p className="text-xs text-green-600 font-medium">Valid until Dec 2026</p>
                                        </div>
                                    </div>
                                    <button className="text-xs text-blue-600 font-bold hover:underline">Update</button>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">VAT Certificate</p>
                                            <p className="text-xs text-green-600 font-medium">Verified</p>
                                        </div>
                                    </div>
                                    <button className="text-xs text-blue-600 font-bold hover:underline">View</button>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            
            case 'Bank':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <Card>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Bank Account Details</h3>
                                    <p className="text-sm text-slate-500 mt-1">Used for processing weekly payouts.</p>
                                </div>
                                <div className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100 flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Admin Only
                                </div>
                            </div>
                            
                            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white shadow-xl mb-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <CreditCard className="w-48 h-48" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-slate-400 text-sm font-medium mb-1">Beneficiary Name</div>
                                    <div className="text-xl font-bold tracking-wide mb-6">{bankDetails.beneficiary}</div>
                                    
                                    <div className="grid grid-cols-2 gap-8 mb-6">
                                        <div>
                                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Bank Name</div>
                                            <div className="font-semibold">{bankDetails.bankName}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">SWIFT / BIC</div>
                                            <div className="font-mono font-semibold">{bankDetails.swift}</div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">IBAN</div>
                                        <div className="font-mono text-lg tracking-widest">{bankDetails.iban}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                                    <Edit className="w-4 h-4" /> Request Change
                                </button>
                            </div>
                        </Card>
                    </div>
                );

            case 'Users':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">User Management</h3>
                            <PrimaryButton className="w-auto shadow-sm" onClick={() => alert('Add User Modal would open here')}>
                                <Plus className="w-4 h-4" /> Add User
                            </PrimaryButton>
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-gray-500'}`}></span>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600 p-2"><MoreHorizontal className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'Notifications':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <Card>
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Notification Preferences</h3>
                            <div className="space-y-6">
                                <ToggleSwitch 
                                    id="notif_orders" 
                                    label="New Order Alerts" 
                                    helpText="Receive an email when a new Purchase Order is raised."
                                    enabled={notifications.emailOrders} 
                                    setEnabled={(val) => setNotifications({...notifications, emailOrders: val})}
                                />
                                <hr className="border-slate-100" />
                                <ToggleSwitch 
                                    id="notif_pay" 
                                    label="Payment Confirmations" 
                                    helpText="Receive alerts when payments are processed or credited."
                                    enabled={notifications.emailPayments} 
                                    setEnabled={(val) => setNotifications({...notifications, emailPayments: val})}
                                />
                                <hr className="border-slate-100" />
                                <ToggleSwitch 
                                    id="notif_sms" 
                                    label="SMS Notifications" 
                                    helpText="Get critical alerts (e.g. returns/rejections) via SMS."
                                    enabled={notifications.smsAlerts} 
                                    setEnabled={(val) => setNotifications({...notifications, smsAlerts: val})}
                                />
                                <hr className="border-slate-100" />
                                <ToggleSwitch 
                                    id="notif_sec" 
                                    label="Security Alerts" 
                                    helpText="Login attempts from new devices."
                                    enabled={notifications.securityAlerts} 
                                    setEnabled={(val) => setNotifications({...notifications, securityAlerts: val})}
                                />
                            </div>
                        </Card>
                    </div>
                );

            case 'Security':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <Card>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-50 rounded-full">
                                    <Lock className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Password & Authentication</h3>
                                    <p className="text-sm text-slate-500">Manage how you sign in to your account.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                    <div>
                                        <p className="font-bold text-slate-800">Password</p>
                                        <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                                    </div>
                                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">Change Password</button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                    <div>
                                        <p className="font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
                                        <p className="text-xs text-slate-500">Adds an extra layer of security to your account.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase mr-2">Disabled</span>
                                        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Enable</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        
                        <Card>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 text-red-600">Danger Zone</h3>
                            <p className="text-sm text-slate-600 mb-4">Once you deactivate your account, there is no going back. Please be certain.</p>
                            <button className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-bold hover:bg-red-100">
                                Deactivate Account
                            </button>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your company profile, users, and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-all border-l-4 ${
                                    activeTab === tab.id 
                                    ? 'bg-slate-50 text-red-600 border-red-600' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent'
                                }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'fill-current' : ''}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[500px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- EXISTING PRODUCT OVERVIEW DASHBOARD
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const ProductOverviewView = ({ setCurrentView, products, updateRequests, onAddNew }) => {
    // Dynamic Stats Calculation
    const totalSKUs = products.length;
    const activeProducts = products.filter(p => p.status === 'Approved').length;
    const pendingProducts = products.filter(p => p.status === 'Pending').length;
    const pendingUpdates = updateRequests ? updateRequests.filter(r => r.status === 'Pending').length : 0;
    const totalPending = pendingProducts + pendingUpdates;
    
    // Mock low stock for demo purposes
    const lowStock = Math.floor(activeProducts * 0.1); 

    // Category Distribution Logic
    const categoryCounts = products.reduce((acc, p) => {
        const dept = p.header || 'Other'; // Using Header as main grouper for chart
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});
    
    // Just finding top 3 for display
    const topCategories = Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Product Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Snapshot of your catalog performance and status.</p>
                </div>
                <PrimaryButton className="w-full sm:w-auto" onClick={onAddNew}>
                    <Plus className="w-4 h-4" /> Add New Product
                </PrimaryButton>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total SKUs" 
                    value={totalSKUs} 
                    change="+2" 
                    changeType="positive" 
                    icon={Package} 
                    details="Total items in catalog" 
                    variant="blue" 
                />
                <StatCard 
                    title="Active Products" 
                    value={activeProducts} 
                    change="+0" 
                    changeType="neutral" 
                    icon={CheckCircle} 
                    details="Live and orderable" 
                    variant="green" 
                />
                <StatCard 
                    title="Pending Approval" 
                    value={totalPending} 
                    change="+1" 
                    changeType="positive" 
                    icon={Clock} 
                    details="New items & updates" 
                    variant="orange" 
                />
                <StatCard 
                    title="Low Stock Alerts" 
                    value={lowStock} 
                    change="-1" 
                    changeType="positive" 
                    icon={AlertCircle} 
                    details="SKUs below reorder point" 
                    variant="purple" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Distribution */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader title="Products by Header" />
                        <CardContent>
                            <div className="space-y-4">
                                {topCategories.map(([name, count], index) => {
                                    const pct = Math.round((count / totalSKUs) * 100);
                                    const colors = ['bg-blue-600', 'bg-emerald-500', 'bg-purple-500'];
                                    return (
                                        <div key={name}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-slate-700">{name}</span>
                                                <span className="text-slate-500">{count} SKUs ({pct}%)</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                <div className={`${colors[index % 3]} h-2.5 rounded-full`} style={{ width: `${pct}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {topCategories.length === 0 && <p className="text-sm text-slate-500">No products available.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity Feed */}
                <Card className="h-full">
                    <CardHeader title="Recent Product Activity" />
                    <CardContent>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {products.slice(0, 3).map((p, i) => (
                                <div key={p.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${p.status === 'Approved' ? 'bg-green-500' : p.status === 'Pending' ? 'bg-blue-500' : 'bg-slate-400'}`}>
                                        {p.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-3 rounded border border-slate-100 shadow-sm ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900 text-xs">{p.status === 'Approved' ? 'Product Approved' : 'New Product'}</div>
                                            <time className="font-mono italic text-[10px] text-slate-500">{p.date}</time>
                                        </div>
                                        <div className="text-slate-500 text-xs">"{p.name}" updated.</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- SERVICE OVERVIEW DASHBOARD
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const ServiceOverviewView = ({ setCurrentView, products, updateRequests, onAddNew }) => {
    // Filter Data for Services
    const services = products.filter(p => p.header === 'Service');
    
    // Stats Calculations
    const totalServices = services.length;
    const activeServices = services.filter(p => p.status === 'Approved').length;
    const pendingServices = services.filter(p => p.status === 'Pending').length;
    
    // LOGICAL CALCULATION for Expiring Soon:
    // Defined as contracts ending within the next 30 days from Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);

    const expiringSoon = services.filter(s => {
        if (!s.contractEnd || s.status !== 'Approved') return false;
        const expiry = new Date(s.contractEnd);
        return expiry >= today && expiry <= thirtyDaysLater;
    }).length;

    // Category Distribution Logic
    const categoryCounts = services.reduce((acc, p) => {
        const cat = p.category || 'Other';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});
    
    const topCategories = Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Service Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Snapshot of your service portfolio and performance.</p>
                </div>
                <PrimaryButton className="w-full sm:w-auto shadow-md shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" onClick={onAddNew}>
                    <Plus className="w-4 h-4" /> Add New Service
                </PrimaryButton>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Services" 
                    value={totalServices} 
                    change="+5" 
                    changeType="positive" 
                    icon={Briefcase} 
                    details="Total listed services" 
                    variant="blue" 
                />
                <StatCard 
                    title="Active Contracts" 
                    value={activeServices} 
                    change="+2" 
                    changeType="positive" 
                    icon={FileCheck} 
                    details="Currently active" 
                    variant="green" 
                />
                <StatCard 
                    title="Pending Approvals" 
                    value={pendingServices} 
                    change="+1" 
                    changeType="neutral" 
                    icon={Clock} 
                    details="Awaiting review" 
                    variant="orange" 
                />
                <StatCard 
                    title="Expiring Soon" 
                    value={expiringSoon} 
                    change={expiringSoon > 0 ? `+${expiringSoon}` : "0"} 
                    changeType={expiringSoon > 0 ? "negative" : "neutral"} 
                    icon={AlertCircle} 
                    details="Renewals due < 30 days" 
                    variant="purple" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Distribution */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader title="Services by Category" />
                        <CardContent>
                            <div className="space-y-5">
                                {topCategories.map(([name, count], index) => {
                                    const pct = totalServices > 0 ? Math.round((count / totalServices) * 100) : 0;
                                    const colors = ['bg-indigo-600', 'bg-cyan-500', 'bg-teal-500'];
                                    return (
                                        <div key={name}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-bold text-slate-700">{name}</span>
                                                <span className="text-slate-500 font-medium">{count} Services ({pct}%)</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                                <div className={`${colors[index % 3]} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {topCategories.length === 0 && <p className="text-sm text-slate-500 italic">No services found.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity Feed */}
                <Card className="h-full">
                    <CardHeader title="Recent Service Activity" />
                    <CardContent>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent pl-2">
                            {services.slice(0, 3).map((p, i) => (
                                <div key={p.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${p.status === 'Approved' ? 'bg-green-500' : p.status === 'Pending' ? 'bg-indigo-500' : 'bg-slate-400'}`}>
                                        {p.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-3 rounded-lg border border-slate-100 shadow-sm ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className={`font-bold text-xs ${p.status === 'Approved' ? 'text-green-700' : 'text-indigo-700'}`}>
                                                {p.status === 'Approved' ? 'Service Active' : 'New Request'}
                                            </div>
                                            <time className="font-mono italic text-[10px] text-slate-400">{p.date}</time>
                                        </div>
                                        <div className="text-slate-600 text-xs truncate font-medium">"{p.name}"</div>
                                        <div className="text-[10px] text-slate-400 mt-1">{p.category}</div>
                                    </div>
                                </div>
                            ))}
                            {services.length === 0 && <div className="pl-6 text-sm text-slate-500">No recent activity.</div>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- NEW MODALS FOR ACTIONS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const UpdateRequestModal = ({ product, onClose, onSubmit }) => {
    const [changeType, setChangeType] = useState('Price Change');
    const [currentValue, setCurrentValue] = useState('');
    const [requestedValue, setRequestedValue] = useState('');
    const [unit, setUnit] = useState('');

    const handleSubmit = () => {
        if (!requestedValue) {
            alert('Please enter a requested value.');
            return;
        }
        onSubmit({
            changeType,
            currentValue: currentValue || 'N/A',
            requestedValue,
            unit
        });
    };

    const footer = (
        <div className="flex justify-end gap-3 w-full">
            <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">Cancel</button>
            <PrimaryButton onClick={handleSubmit} className="w-auto">Submit Request</PrimaryButton>
        </div>
    );

    return (
        <Modal title={`Request Update: ${product.name}`} onClose={onClose} footer={footer}>
            <div className="space-y-4">
                <p className="text-sm text-slate-600">Submit a request to update specific product details. Changes require admin approval.</p>
                
                <FormSelect id="changeType" label="Change Type" value={changeType} onChange={(e) => setChangeType(e.target.value)}>
                    <option value="Price Change">Price Change</option>
                    <option value="MOQ Update">MOQ Update</option>
                    <option value="Content Update">Content/Description</option>
                    <option value="Other">Other</option>
                </FormSelect>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput id="currentVal" label="Current Value (Optional)" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} placeholder="e.g. 45.00" />
                    <FormInput id="reqVal" label="Requested Value" value={requestedValue} onChange={(e) => setRequestedValue(e.target.value)} placeholder="e.g. 48.00" required />
                </div>
                
                <FormInput id="unit" label="Unit (Optional)" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g. AED, Units" />
            </div>
        </Modal>
    );
};

const ViewRequestModal = ({ request, onClose }) => {
    return (
        <Modal title="Update Request Details" onClose={onClose} footer={<div className="flex justify-end w-full"><button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">Close</button></div>}>
            <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <img src={request.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                        <h4 className="font-bold text-slate-900">{request.productName}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-1">{request.sku}</p>
                        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${request.status === 'Pending' ? 'bg-blue-100 text-blue-700' : request.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {request.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Change Type</label>
                        <p className="text-sm font-medium text-slate-900">{request.changeType}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Submitted Date</label>
                        <p className="text-sm font-medium text-slate-900">{request.date}</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h5 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Proposed Changes</h5>
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-500 line-through">{request.currentValue}</div>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                        <div className="font-bold text-blue-600">{request.requestedValue} <span className="text-xs text-slate-500 font-normal">{request.unit}</span></div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- PRODUCT MANAGEMENT MODULE
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const AddProductModal = ({ onClose, initialData, mode = 'add', onSave, defaultType = 'Product' }) => {
    // 1. Entry Type
    const [entryType, setEntryType] = useState(initialData?.header === 'Service' ? 'Service' : defaultType);

    // 2. Basic Info (Product)
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        brand: '', 
        vendorCode: '',
        sku: 'Admin Controlled', 
        status: 'Draft'          
    });

    // 2a. Product Categorization (Moved from below to state initialization)
    const [categorization, setCategorization] = useState({
        header: '',
        headerOther: '',
        department: '',
        departmentOther: '',
        category: '',
        categoryOther: '',
        subcategory: '',
        subcategoryOther: '',
        merchCategory: '',
    });

    // --- SERVICE SPECIFIC STATE ---
    const [serviceInfo, setServiceInfo] = useState({
        // A. Basic
        name: '', category: '', subcategory: '', vendorCode: '', status: 'Draft',
        // B. Classification
        serviceType: 'One-Time', department: '', locations: [], merchCategory: '', locationsOther: '',
        // C. Scope
        shortDesc: '', detailedScope: '', includedServices: [''], excludedServices: [''],
        // D. Pricing
        pricingType: 'Fixed Price', price: '', hourlyRate: '', minHours: '', billingCycle: 'Monthly', unitType: '', unitPrice: '',
        // E. SLA
        availability: '', responseTime: '', resolutionTime: '', escalationContact: '', penaltyClause: false,
        // F. Coverage
        coverageArea: '', maxRequests: '', onsite: false, remote: false, emergencySupport: false,
        // G. Compliance
        vatApplicable: true, vatPercent: '5%',
        // H. Contract
        contractStart: '', contractEnd: '', autoRenewal: false, noticePeriod: 30
    });

    // --- MASTER DATA CONFIGURATION ---
    const masterData = {
        headers: ['Fresh', 'Frozen', 'Chilled', 'Ambient'],
        departments: {
            'Grocery': {
                'Dairy & Eggs': ['Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream', 'Labneh', 'Eggs', 'Milk Alternatives', 'Laban'],
                'Rice, Pasta & Pulses': ['Basmati Rice', 'Jasmine Rice', 'Egyptian Rice', 'Wheat Flour', 'Pulses & Lentils', 'Pasta', 'Noodles', 'Couscous', 'Quinoa'],
                'Cooking Oils & Ghee': ['Sunflower Oil', 'Olive Oil', 'Corn Oil', 'Vegetable Oil', 'Ghee', 'Coconut Oil', 'Canola Oil'],
                'Beverages': ['Juices', 'Soft Drinks', 'Water', 'Coffee', 'Tea', 'Energy Drinks', 'Syrups', 'Powdered Drinks', 'Malt Drinks'],
                'Frozen Foods': ['Frozen Meat', 'Frozen Vegetables', 'Ice Cream', 'Ready Meals', 'Frozen Seafood', 'Frozen Poultry', 'Frozen Pastries', 'French Fries', 'Frozen Fruits'],
                'Canned & Preserved': ['Canned Vegetables', 'Canned Fruit', 'Canned Fish', 'Beans', 'Tomato Paste', 'Coconut Milk', 'Pickles', 'Olives', 'Hummus'],
                'Confectionery & Sweets': ['Chocolates', 'Candies', 'Biscuits & Cookies', 'Gum', 'Wafers', 'Marshmallows', 'Dates', 'Halawa'],
                'Condiments & Sauces': ['Ketchup', 'Mayonnaise', 'Mustard', 'Hot Sauce', 'Soy Sauce', 'Vinegar', 'Salad Dressings', 'BBQ Sauce', 'Cooking Sauces'],
                'Bakery': ['Bread', 'Buns', 'Croissants', 'Tortillas', 'Cakes', 'Muffins', 'Arabic Bread', 'Toast'],
                'Snacks': ['Chips', 'Nuts', 'Popcorn', 'Crackers', 'Dried Fruit', 'Seeds', 'Pretzels'],
                'Spices & Seasonings': ['Whole Spices', 'Powdered Spices', 'Herbs', 'Salt', 'Sugar', 'Seasoning Mixes', 'Saffron', 'Stock Cubes'],
                'Breakfast & Cereals': ['Corn Flakes', 'Oats', 'Granola', 'Muesli', 'Breakfast Bars', 'Pancake Mix'],
                'Jams, Honey & Spreads': ['Jam', 'Honey', 'Peanut Butter', 'Chocolate Spread', 'Tahini', 'Molasses'],
                'Baking Supplies': ['Baking Powder', 'Yeast', 'Cake Mixes', 'Vanilla Essence', 'Food Coloring', 'Cocoa Powder', 'Corn Starch'],
                'Baby Food': ['Baby Formula', 'Baby Cereals', 'Baby Snacks', 'Baby Purees']
            },
            'Non-Food': {
                'Cleaning': ['Detergents', 'Dishwashing Liquid', 'Air Fresheners', 'Bleach', 'Floor Cleaners', 'Glass Cleaners', 'Sponges & Scrubbers', 'Laundry Softener'],
                'Personal Care': ['Soaps', 'Shampoos', 'Toothpaste', 'Deodorants', 'Hand Wash', 'Sanitizers', 'Body Lotions', 'Shaving Needs'],
                'Paper Products': ['Toilet Rolls', 'Tissues', 'Kitchen Towels', 'Napkins', 'Facial Tissues', 'Wet Wipes'],
                'Disposables': ['Plastic Cups', 'Foam Plates', 'Cutlery', 'Garbage Bags', 'Aluminum Foil', 'Cling Film', 'Food Containers', 'Baking Paper'],
                'Kitchen Essentials': ['Batteries', 'Light Bulbs', 'Matches', 'Lighters', 'Food Storage Bags']
            }
        },
        merchCategories: ['MCAT-01 (General)', 'MCAT-02 (Taxable)', 'MCAT-03 (Seasonal)', 'MCAT-04 (Services)'],
        
        // SERVICE MASTER DATA
        serviceCategories: {
            'Furniture': ['Assembly', 'Repair', 'Upholstery', 'Restoration'],
            'Software': ['SaaS Subscription', 'Custom Development', 'Maintenance', 'Support', 'Integration'],
            'Maintenance': ['HVAC', 'Electrical', 'Plumbing', 'General Repairs'],
            'Cleaning': ['Deep Cleaning', 'Regular Janitorial', 'Sanitization', 'Window Cleaning'],
            'Security': ['Manned Guarding', 'CCTV Monitoring', 'Access Control', 'Patrol'],
            'Logistics': ['Last Mile Delivery', 'Warehousing', 'Freight Forwarding', 'Fleet Management'],
            'Other': ['Consulting', 'Marketing', 'Training']
        },
        serviceDepartments: ['IT', 'Facilities', 'Operations', 'Finance', 'Admin', 'Other'],
        serviceLocations: ['Store', 'Warehouse', 'Head Office', 'Remote/Virtual'],
        pricingModels: ['Fixed Price', 'Hourly Rate', 'Monthly / Annual Subscription', 'Per Unit / Per Area']
    };

    // Helper: Get Categories based on selected Department
    const getCategories = () => {
        if (!categorization.department || categorization.department === 'Other') return [];
        return Object.keys(masterData.departments[categorization.department] || {});
    };

    // Helper: Get Subcategories based on selected Category
    const getSubcategories = () => {
        if (!categorization.department || !categorization.category || categorization.category === 'Other') return [];
        return masterData.departments[categorization.department]?.[categorization.category] || [];
    };

    // Helper for Service Subcategories
    const getServiceSubcategories = () => {
        return masterData.serviceCategories[serviceInfo.category] || [];
    };

    // 4. Product Attributes (Dynamic)
    const [attributes, setAttributes] = useState([
        { id: 1, name: 'Dietary Info', nameOther: '', value: 'Organic' }
    ]);

    // 5. Units (Repeatable)
    const [units, setUnits] = useState([
        { id: 1, name: 'Single', conversion: 1, type: 'pcs', barcode: '', sellPrice: '', custPrice: '', moq: 1 }
    ]);

    // 6. Supply & Logistics
    const [supplyLogistics, setSupplyLogistics] = useState({
        leadTime: '',
        countryOfOrigin: '',
        countryOfOriginOther: '',
        storageCondition: '',
        storageConditionOther: ''
    });

    // 7. Tax & Compliance
    const [taxCompliance, setTaxCompliance] = useState({
        taxable: true,
        taxRate: '5% VAT',
        taxRateOther: ''
    });

    // 8. Description & Media
    const [media, setMedia] = useState({
        description: '',
        images: [
            'https://placehold.co/200x200/e2e8f0/475569?text=Front+View',
            'https://placehold.co/200x200/e2e8f0/475569?text=Back+View',
            'https://placehold.co/200x200/e2e8f0/475569?text=Nutritional'
        ],
        docs: []
    });

    // 9. Status & Submission - Metadata (Dynamic)
    const submissionMeta = {
        currentStatus: entryType === 'Product' ? basicInfo.status : serviceInfo.status,
        version: '1.0', 
        submittedDate: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    };

    // Effect to populate data for editing/fixing
    useEffect(() => {
        if (initialData) {
            setBasicInfo({
                name: initialData.name || '',
                brand: initialData.brand || '',
                vendorCode: initialData.vendorCode || '',
                sku: initialData.sku || 'Admin Controlled',
                status: initialData.status === 'Rejected' ? 'Draft' : (initialData.status || 'Draft')
            });
            
            setCategorization(prev => ({
                ...prev,
                header: initialData.header || '',
                category: initialData.category || '',
                subcategory: initialData.subcategory || '',
                department: 'Grocery', 
            }));
            
            // Map other fields if available...
        }
    }, [initialData]);


    // Validation
    const [errors, setErrors] = useState({});

    // Handlers
    const handleBasicChange = (e) => setBasicInfo({...basicInfo, [e.target.name]: e.target.value});
    
    // --- SERVICE HANDLERS ---
    const handleServiceChange = (field, value) => {
        setServiceInfo(prev => {
            const newState = { ...prev, [field]: value };
            // Reset subcategory if category changes
            if (field === 'category') newState.subcategory = '';
            return newState;
        });
    };

    const handleServiceListChange = (type, index, value) => {
        const list = type === 'included' ? [...serviceInfo.includedServices] : [...serviceInfo.excludedServices];
        list[index] = value;
        setServiceInfo(prev => ({ ...prev, [type === 'included' ? 'includedServices' : 'excludedServices']: list }));
    };

    const addServiceListItem = (type) => {
        const field = type === 'included' ? 'includedServices' : 'excludedServices';
        setServiceInfo(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeServiceListItem = (type, index) => {
        const field = type === 'included' ? 'includedServices' : 'excludedServices';
        setServiceInfo(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    const toggleLocation = (loc) => {
        setServiceInfo(prev => {
            const current = prev.locations;
            return {
                ...prev,
                locations: current.includes(loc) ? current.filter(l => l !== loc) : [...current, loc]
            };
        });
    };

    const handleCatChange = (e) => {
        const { name, value } = e.target;
        setCategorization(prev => {
            const newState = { ...prev, [name]: value };
            
            // Cascading Logic: Clear children if parent changes
            if (name === 'department') {
                newState.category = '';
                newState.categoryOther = '';
                newState.subcategory = '';
                newState.subcategoryOther = '';
            }
            if (name === 'category') {
                newState.subcategory = '';
                newState.subcategoryOther = '';
            }

            // Reset "Other" text input if dropdown changes to a known value
            if (name === 'header' && value !== 'Other') newState.headerOther = '';
            if (name === 'department' && value !== 'Other') newState.departmentOther = '';
            if (name === 'category' && value !== 'Other') newState.categoryOther = '';
            if (name === 'subcategory' && value !== 'Other') newState.subcategoryOther = '';
            return newState;
        });
    };

    // Attribute Handlers
    const addAttribute = () => {
        const newId = attributes.length ? Math.max(...attributes.map(a => a.id)) + 1 : 1;
        setAttributes([...attributes, { id: newId, name: '', nameOther: '', value: '' }]);
    };
    const removeAttribute = (id) => setAttributes(attributes.filter(a => a.id !== id));
    const updateAttribute = (id, field, value) => {
        setAttributes(attributes.map(a => a.id === id ? { ...a, [field]: value } : a));
    };
    
    // Unit Handlers
    const addUnit = () => {
        const newId = units.length ? Math.max(...units.map(u => u.id)) + 1 : 1;
        setUnits([...units, { id: newId, name: '', conversion: '', type: 'pcs', barcode: '', sellPrice: '', custPrice: '', moq: 1 } ]);
    };
    const removeUnit = (id) => setUnits(units.filter(u => u.id !== id));
    const updateUnit = (id, field, value) => {
        setUnits(units.map(u => u.id === id ? { ...u, [field]: value } : u));
    };

    // Helper to get unit hint
    const getUnitHint = (unitName) => {
        switch(unitName) {
            case 'Single': return 'Base retail unit (e.g. 1 Bottle)';
            case 'Outer': return 'Inner pack containing multiple singles (e.g. Shrink wrap of 6)';
            case 'Carton': return 'Shipping box containing singles or outers';
            case 'Pallet': return 'Bulk shipping load containing cartons';
            default: return 'Select unit hierarchy type';
        }
    };

    // Logistics Handler
    const handleLogisticsChange = (e) => {
        const { name, value } = e.target;
        setSupplyLogistics(prev => {
            const newState = { ...prev, [name]: value };
            if (name === 'countryOfOrigin' && value !== 'Other') newState.countryOfOriginOther = '';
            if (name === 'storageCondition' && value !== 'Other') newState.storageConditionOther = '';
            return newState;
        });
    };

    // Tax Handler
    const handleTaxChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTaxCompliance(prev => {
            const newState = { ...prev, [name]: type === 'checkbox' ? checked : value };
            if (name === 'taxRate' && value !== 'Other') newState.taxRateOther = '';
            return newState;
        });
    };
    
    // Media Handler
    const handleMediaChange = (e) => setMedia({...media, [e.target.name]: e.target.value});
    
    // Helper to simulate adding an image
    const handleAddImage = () => {
        if (media.images.length < 5) {
            setMedia(prev => ({
                ...prev, 
                images: [...prev.images, `https://placehold.co/200x200/e2e8f0/475569?text=Image+${prev.images.length + 1}`]
            }));
        }
    };

    // Helper to remove image
    const handleRemoveImage = (index) => {
        setMedia(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (entryType === 'Product') {
            if (!basicInfo.name) newErrors.name = "Product name is required";
            if (!basicInfo.brand) newErrors.brand = "Brand name is required";
            if (!basicInfo.vendorCode) newErrors.vendorCode = "Vendor Code is required";
            
            if (!categorization.header) newErrors.header = "Primary header is required";
            if (categorization.header === 'Other' && !categorization.headerOther) newErrors.header = "Please specify header";
            
            if (!categorization.department) newErrors.department = "Department is required";
            if (categorization.department === 'Other' && !categorization.departmentOther) newErrors.department = "Please specify department";

            // Validate Units
            units.forEach((u, i) => {
                 if(!u.barcode) newErrors[`unit_barcode_${u.id}`] = true;
                 if(!u.sellPrice) newErrors[`unit_price_${u.id}`] = true;
                 if(!u.moq) newErrors[`unit_moq_${u.id}`] = true;
            });

            if (!supplyLogistics.leadTime) newErrors.leadTime = "Lead time required";
            if (!supplyLogistics.countryOfOrigin) newErrors.countryOfOrigin = "Origin required";
            if (supplyLogistics.countryOfOrigin === 'Other' && !supplyLogistics.countryOfOriginOther) newErrors.countryOfOrigin = "Specify origin";
            
            if (supplyLogistics.storageCondition === 'Other' && !supplyLogistics.storageConditionOther) newErrors.storageCondition = "Specify storage";

            if (taxCompliance.taxable && taxCompliance.taxRate === 'Other' && !taxCompliance.taxRateOther) newErrors.taxRate = "Specify tax rate";
        } else {
            // Service Validation
            if (!serviceInfo.name) newErrors.serviceName = "Service Name is required";
            if (!serviceInfo.category) newErrors.serviceCategory = "Category is required";
            if (!serviceInfo.department) newErrors.serviceDepartment = "Department is required";
            if (!serviceInfo.shortDesc) newErrors.shortDesc = "Description is required";
            if (serviceInfo.locations.length === 0) newErrors.locations = "Select at least one location";
            
            if (serviceInfo.pricingType === 'Fixed Price' && !serviceInfo.price) newErrors.price = "Total Price required";
            if (serviceInfo.pricingType === 'Hourly Rate' && !serviceInfo.hourlyRate) newErrors.hourlyRate = "Hourly Rate required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (action) => {
        if (action === 'Submit' && !validate()) {
            alert("Please fill in all required fields marked with *");
            return;
        }
        
        const finalStatus = action === 'Draft' ? 'Draft' : 'Pending';
        
        let payload = {};

        if (entryType === 'Product') {
            payload = {
                id: initialData ? initialData.id : Date.now(), 
                name: basicInfo.name,
                brand: basicInfo.brand,
                sku: basicInfo.sku,
                status: finalStatus,
                header: categorization.header === 'Other' ? categorization.headerOther : categorization.header,
                category: categorization.category === 'Other' ? categorization.categoryOther : categorization.category,
                subcategory: categorization.subcategory === 'Other' ? categorization.subcategoryOther : categorization.subcategory,
                units: units.length,
                date: new Date().toISOString().split('T')[0],
                image: media.images[0] || 'https://placehold.co/40x40/f1f5f9/475569?text=New'
            };
        } else {
            payload = {
                id: initialData ? initialData.id : Date.now(),
                name: serviceInfo.name,
                brand: serviceInfo.vendorCode, // Mapping vendor code to brand field for table view
                sku: 'SVC-' + Math.floor(Math.random() * 10000),
                status: finalStatus,
                header: 'Service',
                category: serviceInfo.category,
                subcategory: serviceInfo.subcategory,
                units: 1,
                date: new Date().toISOString().split('T')[0],
                contractEnd: serviceInfo.contractEnd,
                image: 'https://placehold.co/40x40/e0e7ff/4338ca?text=SVC'
            };
        }

        if (onSave) onSave(payload);
        onClose();
    };

    const isViewOnly = mode === 'view';

    const footerContent = !isViewOnly && (
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
             <div className="text-sm text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <span><span className="text-red-500 font-bold">*</span> Indicates required fields</span>
             </div>
             <div className="flex gap-3 w-full sm:w-auto">
                 <button 
                    onClick={() => handleSubmit('Draft')} 
                    className="flex-1 sm:flex-none px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 bg-white transition-colors"
                 >
                    Save Draft
                 </button>
                 <PrimaryButton onClick={() => handleSubmit('Submit')} className="flex-1 sm:flex-none w-auto">
                    Submit for Approval
                 </PrimaryButton>
             </div>
        </div>
    );

    const renderServiceForm = () => (
        <div className="space-y-8 animate-in fade-in duration-300">
             {/* A. Service Basic Information */}
             <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Tag className="w-5 h-5 text-indigo-600" /> A. Service Basic Information</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FormInput 
                                id="serviceName" label="Service Name" placeholder="e.g. Office HVAC Maintenance" required
                                value={serviceInfo.name} onChange={(e) => handleServiceChange('name', e.target.value)}
                                hint="Service name should clearly describe the scope of work"
                            />
                            {errors.serviceName && <p className="text-xs text-red-500 mt-1">{errors.serviceName}</p>}
                        </div>
                        <FormInput 
                            id="serviceVendorCode" label="Vendor Service Code" placeholder="e.g. SVC-001" 
                            value={serviceInfo.vendorCode} onChange={(e) => handleServiceChange('vendorCode', e.target.value)}
                        />
                        <div className="space-y-3">
                            <FormSelect 
                                id="serviceCategory" label="Service Category" required
                                value={serviceInfo.category} onChange={(e) => handleServiceChange('category', e.target.value)}
                            >
                                <option value="">Select Category...</option>
                                {Object.keys(masterData.serviceCategories).map(c => <option key={c} value={c}>{c}</option>)}
                            </FormSelect>
                            {errors.serviceCategory && <p className="text-xs text-red-500 mt-1">{errors.serviceCategory}</p>}
                        </div>
                         <div className="space-y-3">
                            <FormSelect 
                                id="serviceSubcategory" label="Service Subcategory" 
                                value={serviceInfo.subcategory} onChange={(e) => handleServiceChange('subcategory', e.target.value)}
                                disabled={!serviceInfo.category}
                            >
                                <option value="">Select Subcategory...</option>
                                {getServiceSubcategories().map(s => <option key={s} value={s}>{s}</option>)}
                            </FormSelect>
                        </div>
                        <FormInput 
                            id="serviceStatus" label="Service Status" value={serviceInfo.status} readOnly={true} disabled={true}
                        />
                    </div>
                </Card>
            </div>

            {/* B. Service Classification */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-600" /> B. Service Classification</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormSelect 
                            id="serviceType" label="Service Type" required
                            value={serviceInfo.serviceType} onChange={(e) => handleServiceChange('serviceType', e.target.value)}
                        >
                            <option value="One-Time">One-Time</option>
                            <option value="Recurring">Recurring</option>
                            <option value="On-Demand">On-Demand</option>
                        </FormSelect>
                        
                        <div>
                            <FormSelect 
                                id="serviceDepartment" label="Department" required
                                value={serviceInfo.department} onChange={(e) => handleServiceChange('department', e.target.value)}
                            >
                                <option value="">Select Department...</option>
                                {masterData.serviceDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                            </FormSelect>
                            {errors.serviceDepartment && <p className="text-xs text-red-500 mt-1">{errors.serviceDepartment}</p>}
                        </div>

                        <FormSelect 
                            id="merchCategory" label="Merchandise Category" 
                            value={serviceInfo.merchCategory} onChange={(e) => handleServiceChange('merchCategory', e.target.value)}
                        >
                            <option value="">Select Category...</option>
                            {masterData.merchCategories.map(mc => <option key={mc} value={mc}>{mc}</option>)}
                        </FormSelect>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Applicable Locations <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-3">
                            {masterData.serviceLocations.map(loc => (
                                <label key={loc} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${serviceInfo.locations.includes(loc) ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-medium' : 'bg-white border-slate-300 hover:bg-slate-50'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={serviceInfo.locations.includes(loc)}
                                        onChange={() => toggleLocation(loc)}
                                        className="w-4 h-4 accent-indigo-600 rounded"
                                    />
                                    {loc}
                                </label>
                            ))}
                        </div>
                        {errors.locations && <p className="text-xs text-red-500 mt-1">{errors.locations}</p>}
                    </div>
                </Card>
            </div>

            {/* C. Service Description & Scope */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600" /> C. Service Description & Scope</h3>
                <Card>
                    <div className="space-y-6">
                        <div>
                            <FormInput 
                                id="shortDesc" label="Short Description" placeholder="Brief summary (max 150 chars)" maxLength={150} required
                                value={serviceInfo.shortDesc} onChange={(e) => handleServiceChange('shortDesc', e.target.value)}
                            />
                            {errors.shortDesc && <p className="text-xs text-red-500 mt-1">{errors.shortDesc}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Detailed Scope of Work</label>
                            <textarea 
                                rows={4}
                                value={serviceInfo.detailedScope}
                                onChange={(e) => handleServiceChange('detailedScope', e.target.value)}
                                className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Define the full scope, methodologies, and deliverables..."
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-1">Clearly define what is included to avoid contract disputes.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Included Services</label>
                                    <button onClick={() => addServiceListItem('included')} className="text-xs text-indigo-600 font-medium hover:underline">+ Add Item</button>
                                </div>
                                <div className="space-y-2">
                                    {serviceInfo.includedServices.map((item, i) => (
                                        <div key={i} className="flex gap-2">
                                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                            <input 
                                                type="text" 
                                                value={item}
                                                onChange={(e) => handleServiceListChange('included', i, e.target.value)}
                                                className="block w-full px-3 py-1.5 text-sm border-b border-slate-200 focus:border-indigo-500 focus:outline-none bg-transparent"
                                                placeholder="e.g. Spare parts up to $50"
                                            />
                                            {serviceInfo.includedServices.length > 1 && (
                                                <button onClick={() => removeServiceListItem('included', i)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Item"><X className="w-4 h-4" /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Excluded Services</label>
                                    <button onClick={() => addServiceListItem('excluded')} className="text-xs text-indigo-600 font-medium hover:underline">+ Add Item</button>
                                </div>
                                <div className="space-y-2">
                                    {serviceInfo.excludedServices.map((item, i) => (
                                        <div key={i} className="flex gap-2">
                                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                            <input 
                                                type="text" 
                                                value={item}
                                                onChange={(e) => handleServiceListChange('excluded', i, e.target.value)}
                                                className="block w-full px-3 py-1.5 text-sm border-b border-slate-200 focus:border-indigo-500 focus:outline-none bg-transparent"
                                                placeholder="e.g. Major component replacement"
                                            />
                                            {serviceInfo.excludedServices.length > 1 && (
                                                <button onClick={() => removeServiceListItem('excluded', i)} className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Item"><X className="w-4 h-4" /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* D. Service Pricing Model */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><DollarSign className="w-5 h-5 text-indigo-600" /> D. Service Pricing Model</h3>
                <Card>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Pricing Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {masterData.pricingModels.map(type => (
                                <label key={type} className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-center h-20 ${serviceInfo.pricingType === type ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold ring-1 ring-indigo-500' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                                    <input 
                                        type="radio" 
                                        name="pricingType"
                                        value={type}
                                        checked={serviceInfo.pricingType === type}
                                        onChange={(e) => handleServiceChange('pricingType', e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className="text-sm">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        {serviceInfo.pricingType === 'Fixed Price' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <FormInput 
                                        id="totalPrice" label="Total Project Price (AED)" type="number" required
                                        value={serviceInfo.price} onChange={(e) => handleServiceChange('price', e.target.value)}
                                        icon={DollarSign}
                                    />
                                    {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                                </div>
                            </div>
                        )}

                        {serviceInfo.pricingType === 'Hourly Rate' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <FormInput 
                                        id="hourlyRate" label="Rate per Hour (AED)" type="number" required
                                        value={serviceInfo.hourlyRate} onChange={(e) => handleServiceChange('hourlyRate', e.target.value)}
                                        icon={Clock}
                                    />
                                    {errors.hourlyRate && <p className="text-xs text-red-500 mt-1">{errors.hourlyRate}</p>}
                                </div>
                                <FormInput 
                                    id="minHours" label="Minimum Hours" type="number" placeholder="e.g. 2"
                                    value={serviceInfo.minHours} onChange={(e) => handleServiceChange('minHours', e.target.value)}
                                />
                            </div>
                        )}

                        {serviceInfo.pricingType === 'Monthly / Annual Subscription' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormSelect 
                                    id="billingCycle" label="Billing Cycle" 
                                    value={serviceInfo.billingCycle} onChange={(e) => handleServiceChange('billingCycle', e.target.value)}
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                </FormSelect>
                                <FormInput 
                                    id="pricePerCycle" label="Price per Cycle (AED)" type="number"
                                    value={serviceInfo.price} onChange={(e) => handleServiceChange('price', e.target.value)}
                                    icon={DollarSign}
                                />
                            </div>
                        )}

                        {serviceInfo.pricingType === 'Per Unit / Per Area' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput 
                                    id="unitType" label="Unit Type" placeholder="e.g. Sq Ft, Device, User"
                                    value={serviceInfo.unitType} onChange={(e) => handleServiceChange('unitType', e.target.value)}
                                />
                                <FormInput 
                                    id="pricePerUnit" label="Price per Unit (AED)" type="number"
                                    value={serviceInfo.unitPrice} onChange={(e) => handleServiceChange('unitPrice', e.target.value)}
                                    icon={DollarSign}
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* E. Service Level Agreement (SLA) */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-indigo-600" /> E. Service Level Agreement (SLA)</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <FormInput 
                            id="slaAvailability" label="Service Availability" placeholder="e.g. 9am - 6pm, Mon-Fri"
                            value={serviceInfo.availability} onChange={(e) => handleServiceChange('availability', e.target.value)}
                         />
                         <FormInput 
                            id="slaResponse" label="Response Time" placeholder="e.g. 2 Hours"
                            value={serviceInfo.responseTime} onChange={(e) => handleServiceChange('responseTime', e.target.value)}
                         />
                         <FormInput 
                            id="slaResolution" label="Resolution Time" placeholder="e.g. 24 Hours"
                            value={serviceInfo.resolutionTime} onChange={(e) => handleServiceChange('resolutionTime', e.target.value)}
                         />
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-6">
                         <div className="w-full md:w-1/2">
                            <FormInput 
                                id="slaEscalation" label="Escalation Contact" placeholder="Email or Phone Number" icon={User}
                                value={serviceInfo.escalationContact} onChange={(e) => handleServiceChange('escalationContact', e.target.value)}
                            />
                         </div>
                         <div className="w-full md:w-auto p-4 bg-orange-50 border border-orange-100 rounded-xl">
                            <ToggleSwitch 
                                id="penaltyClause" label="Includes Penalty / Credit Clause" 
                                enabled={serviceInfo.penaltyClause} setEnabled={(val) => handleServiceChange('penaltyClause', val)}
                                helpText="If SLAs are missed, credits apply."
                            />
                         </div>
                    </div>
                </Card>
            </div>

            {/* F. Service Coverage & Capacity */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Globe className="w-5 h-5 text-indigo-600" /> F. Service Coverage & Capacity</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <FormInput 
                            id="coverageArea" label="Coverage Area" placeholder="e.g. Dubai, Abu Dhabi, All UAE"
                            value={serviceInfo.coverageArea} onChange={(e) => handleServiceChange('coverageArea', e.target.value)}
                        />
                         <FormInput 
                            id="maxRequests" label="Max Requests Capacity" placeholder="e.g. 50 per month"
                            value={serviceInfo.maxRequests} onChange={(e) => handleServiceChange('maxRequests', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={serviceInfo.onsite} onChange={(e) => handleServiceChange('onsite', e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
                            <span className="text-sm font-medium text-slate-700">On-site Support</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={serviceInfo.remote} onChange={(e) => handleServiceChange('remote', e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
                            <span className="text-sm font-medium text-slate-700">Remote Support</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={serviceInfo.emergencySupport} onChange={(e) => handleServiceChange('emergencySupport', e.target.checked)} className="w-4 h-4 accent-red-600 rounded" />
                            <span className="text-sm font-bold text-red-600">Emergency Support Available</span>
                        </label>
                    </div>
                </Card>
            </div>

            {/* G. Compliance & Documents */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><FileCheck className="w-5 h-5 text-indigo-600" /> G. Compliance & Documents</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <span className="text-sm font-medium text-slate-700">Service Agreement / Brochure</span>
                            <span className="text-xs text-slate-400 mt-1">PDF only (Max 5MB)</span>
                            <button className="mt-3 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Upload</button>
                        </div>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <span className="text-sm font-medium text-slate-700">Certifications / Licenses</span>
                            <span className="text-xs text-slate-400 mt-1">PDF, JPG (Max 5MB)</span>
                            <button className="mt-3 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Upload</button>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
                        <ToggleSwitch 
                            id="vatApplicable" label="VAT / Tax Applicable" 
                            enabled={serviceInfo.vatApplicable} setEnabled={(val) => handleServiceChange('vatApplicable', val)}
                        />
                        {serviceInfo.vatApplicable && (
                            <div className="w-32">
                                <FormInput 
                                    id="vatPercent" label="Percentage" value={serviceInfo.vatPercent} 
                                    onChange={(e) => handleServiceChange('vatPercent', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* H. Contract & Validity */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-600" /> H. Contract & Validity</h3>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Contract Start Date</label>
                             <div className="relative">
                                 <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                 <input type="date" className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={serviceInfo.contractStart} onChange={(e) => handleServiceChange('contractStart', e.target.value)}
                                 />
                             </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Contract End Date</label>
                             <div className="relative">
                                 <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                 <input type="date" className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={serviceInfo.contractEnd} onChange={(e) => handleServiceChange('contractEnd', e.target.value)}
                                 />
                             </div>
                        </div>
                        <div className="flex flex-col justify-center space-y-3 pt-4">
                             <ToggleSwitch 
                                id="autoRenewal" label="Auto-Renewal" 
                                enabled={serviceInfo.autoRenewal} setEnabled={(val) => handleServiceChange('autoRenewal', val)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 w-full md:w-1/2">
                         <FormInput 
                            id="noticePeriod" label="Termination Notice Period (Days)" type="number"
                            value={serviceInfo.noticePeriod} onChange={(e) => handleServiceChange('noticePeriod', e.target.value)}
                         />
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <Modal 
            title={isViewOnly ? "View Details" : initialData ? "Fix & Resubmit" : `Add New ${entryType}`}
            onClose={onClose} 
            size="5xl" 
            footer={footerContent}
        >
            <div className={`space-y-8 pb-4 ${isViewOnly ? 'pointer-events-none opacity-80' : ''}`}>
                
                {/* Entry Type Selector */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                    <label className="block text-sm font-bold text-slate-900 mb-3">Select Entry Type <span className="text-red-500">*</span></label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${entryType === 'Product' ? 'bg-white border-red-500 text-red-700 font-bold ring-2 ring-red-500 shadow-md' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
                            <input type="radio" name="entryType" value="Product" checked={entryType === 'Product'} onChange={() => setEntryType('Product')} className="w-4 h-4 accent-red-600" />
                            <Package className="w-5 h-5" />
                            <span>Product (Physical Item)</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${entryType === 'Service' ? 'bg-white border-indigo-500 text-indigo-700 font-bold ring-2 ring-indigo-500 shadow-md' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'}`}>
                            <input type="radio" name="entryType" value="Service" checked={entryType === 'Service'} onChange={() => setEntryType('Service')} className="w-4 h-4 accent-indigo-600" />
                            <Briefcase className="w-5 h-5" />
                            <span>Service (Intangible/Labor)</span>
                        </label>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {entryType === 'Product' ? "For physical goods with inventory, barcodes, and shipping requirements." : "For labor, consulting, maintenance, or subscription-based offerings."}
                    </p>
                </div>

                {entryType === 'Product' ? (
                    <>
                        {/* 1. Basic Information */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Tag className="w-5 h-5 text-red-600" /> 1. Basic Information</h3>
                            <Card>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <FormInput 
                                                id="name" name="name" label="Product Name" placeholder="e.g. Al Rawabi Fresh Milk 2L" required 
                                                value={basicInfo.name} onChange={handleBasicChange}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        
                                        <div>
                                            <FormInput 
                                                id="brand" name="brand" label="Brand Name" placeholder="e.g. Al Rawabi" required 
                                                value={basicInfo.brand} onChange={handleBasicChange}
                                            />
                                            {errors.brand && <p className="text-xs text-red-500 mt-1">{errors.brand}</p>}
                                        </div>

                                        <div>
                                            <FormInput 
                                                id="vendorCode" name="vendorCode" label="Vendor Product Code" placeholder="e.g. VEN-001" required
                                                value={basicInfo.vendorCode} onChange={handleBasicChange}
                                            />
                                            {errors.vendorCode && <p className="text-xs text-red-500 mt-1">{errors.vendorCode}</p>}
                                        </div>

                                        <FormInput 
                                            id="sku" name="sku" label="System SKU (Admin Controlled)" value={basicInfo.sku} readOnly={true} disabled={true}
                                            hint="SKU will be generated automatically after admin approval"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 2. Categorization */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Layers className="w-5 h-5 text-red-600" /> 2. Categorization</h3>
                            <Card>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Header */}
                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="header" name="header" label="Primary Header" required
                                            value={categorization.header} onChange={handleCatChange}
                                            hint="Controls storage & logistics workflow"
                                        >
                                            <option value="">Select Header...</option>
                                            {masterData.headers.map(h => <option key={h} value={h}>{h}</option>)}
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {categorization.header === 'Other' && (
                                            <FormInput 
                                                id="headerOther" name="headerOther" placeholder="Specify Other Header"
                                                value={categorization.headerOther} onChange={handleCatChange}
                                            />
                                        )}
                                        {errors.header && <p className="text-xs text-red-500">{errors.header}</p>}
                                    </div>
                                    
                                    {/* Department */}
                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="department" name="department" label="Department" required
                                            value={categorization.department} onChange={handleCatChange}
                                        >
                                            <option value="">Select Department...</option>
                                            {Object.keys(masterData.departments).map(d => <option key={d} value={d}>{d}</option>)}
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {categorization.department === 'Other' && (
                                            <FormInput 
                                                id="departmentOther" name="departmentOther" placeholder="Specify Other Department"
                                                value={categorization.departmentOther} onChange={handleCatChange}
                                            />
                                        )}
                                        {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="category" name="category" label="Category"
                                            value={categorization.category} onChange={handleCatChange}
                                            disabled={!categorization.department || categorization.department === 'Other'}
                                        >
                                            <option value="">Select Category...</option>
                                            {getCategories().map(c => <option key={c} value={c}>{c}</option>)}
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {categorization.category === 'Other' && (
                                            <FormInput 
                                                id="categoryOther" name="categoryOther" placeholder="Specify Other Category"
                                                value={categorization.categoryOther} onChange={handleCatChange}
                                            />
                                        )}
                                    </div>

                                    {/* Subcategory */}
                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="subcategory" name="subcategory" label="Subcategory"
                                            value={categorization.subcategory} onChange={handleCatChange}
                                            disabled={!categorization.category || categorization.category === 'Other'}
                                        >
                                            <option value="">Select Subcategory...</option>
                                            {getSubcategories().map(s => <option key={s} value={s}>{s}</option>)}
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {categorization.subcategory === 'Other' && (
                                            <FormInput 
                                                id="subcategoryOther" name="subcategoryOther" placeholder="Specify Other Subcategory"
                                                value={categorization.subcategoryOther} onChange={handleCatChange}
                                            />
                                        )}
                                    </div>

                                    {/* Merch Category */}
                                    <div className="md:col-span-2">
                                        <FormSelect 
                                            id="merchCategory" name="merchCategory" label="Merchandise Category"
                                            value={categorization.merchCategory} onChange={handleCatChange}
                                        >
                                            <option value="">Select Category...</option>
                                            {masterData.merchCategories.map(mc => <option key={mc} value={mc}>{mc}</option>)}
                                        </FormSelect>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 3. Product Attributes (Dynamic) */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Filter className="w-5 h-5 text-red-600" /> 3. Product Attributes (Dynamic)</h3>
                                <button type="button" onClick={addAttribute} className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors">
                                    <Plus className="w-4 h-4" /> Add Attribute
                                </button>
                            </div>
                            <Card>
                                {attributes.length > 0 ? (
                                    <div className="space-y-4">
                                        {attributes.map((attr, index) => (
                                            <div key={attr.id} className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-start ${index > 0 ? 'pt-4 border-t border-slate-100' : ''}`}>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-slate-700">Attribute Name</label>
                                                    <select 
                                                        value={attr.name}
                                                        onChange={(e) => updateAttribute(attr.id, 'name', e.target.value)}
                                                        className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    >
                                                        <option value="">Select Attribute...</option>
                                                        <option value="Flavor">Flavor</option>
                                                        <option value="Dietary Info">Dietary Info (e.g. Gluten Free)</option>
                                                        <option value="Allergen Info">Allergen Info</option>
                                                        <option value="Fat Percentage">Fat Percentage</option>
                                                        <option value="Packaging Material">Packaging Material</option>
                                                        <option value="Shelf Life">Shelf Life</option>
                                                        <option value="Storage Temperature">Storage Temperature</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {attr.name === 'Other' && (
                                                        <input 
                                                            type="text" 
                                                            value={attr.nameOther}
                                                            onChange={(e) => updateAttribute(attr.id, 'nameOther', e.target.value)}
                                                            placeholder="Specify Attribute Name"
                                                            className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex gap-2 items-start">
                                                    <div className="flex-grow space-y-2">
                                                        <label className="block text-sm font-medium text-slate-700">Value</label>
                                                        <input 
                                                            type="text" 
                                                            value={attr.value}
                                                            onChange={(e) => updateAttribute(attr.id, 'value', e.target.value)}
                                                            className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                            placeholder="e.g. Strawberry"
                                                        />
                                                    </div>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeAttribute(attr.id)}
                                                        className="mt-7 p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remove Attribute"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-slate-500 text-sm">
                                        No attributes added. Click "Add Attribute" to define product specifics.
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* 4. Units & Pricing */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                             <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Ruler className="w-5 h-5 text-red-600" /> 4. Units & Pricing (Repeatable)</h3>
                                <button type="button" onClick={addUnit} className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors">
                                    <Plus className="w-4 h-4" /> Add Another Unit
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {units.map((unit, index) => (
                                    <div key={unit.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group hover:border-red-300 hover:shadow-md transition-all">
                                        <div className="absolute top-4 right-4">
                                             <button 
                                                type="button" 
                                                onClick={() => removeUnit(unit.id)}
                                                disabled={units.length === 1}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                title="Remove Unit"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <h4 className="text-xs font-extrabold text-slate-400 mb-4 uppercase tracking-wider">Unit #{index + 1}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                             <FormSelect 
                                                id={`u_name_${unit.id}`} label="Unit Name" 
                                                value={unit.name} onChange={(e) => updateUnit(unit.id, 'name', e.target.value)}
                                                hint={getUnitHint(unit.name)}
                                             >
                                                <option value="Single">Single</option>
                                                <option value="Outer">Outer</option>
                                                <option value="Carton">Carton</option>
                                                <option value="Pallet">Pallet</option>
                                             </FormSelect>

                                             <FormInput 
                                                id={`u_conv_${unit.id}`} label="Conversion (No.)" type="number" placeholder="1"
                                                value={unit.conversion} onChange={(e) => updateUnit(unit.id, 'conversion', e.target.value)}
                                                hint="Number of base units (Singles) in this larger unit."
                                             />
                                             
                                             <FormSelect 
                                                id={`u_type_${unit.id}`} label="Unit Type" 
                                                value={unit.type} onChange={(e) => updateUnit(unit.id, 'type', e.target.value)}
                                             >
                                                <option value="pcs">pcs</option>
                                                <option value="kg">kg</option>
                                                <option value="g">g</option>
                                                <option value="ltr">ltr</option>
                                                <option value="ml">ml</option>
                                                <option value="set">set</option>
                                                <option value="pair">pair</option>
                                             </FormSelect>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                                             <div className={errors[`unit_barcode_${unit.id}`] ? "text-red-600" : ""}>
                                                <FormInput 
                                                    id={`u_bar_${unit.id}`} label="Barcode" icon={Barcode} placeholder="Unique identifier" required
                                                    value={unit.barcode} onChange={(e) => updateUnit(unit.id, 'barcode', e.target.value)}
                                                    hint="Mandatory before dispatch."
                                                />
                                             </div>
                                             <div className={errors[`unit_price_${unit.id}`] ? "text-red-600" : ""}>
                                                <FormInput 
                                                    id={`u_sell_${unit.id}`} label="Selling Price (AED)" type="number" icon={DollarSign} required
                                                    value={unit.sellPrice} onChange={(e) => updateUnit(unit.id, 'sellPrice', e.target.value)}
                                                />
                                             </div>
                                             <FormInput 
                                                id={`u_cust_${unit.id}`} label="Customer Price (AED)" type="number" placeholder="Suggested"
                                                value={unit.custPrice} onChange={(e) => updateUnit(unit.id, 'custPrice', e.target.value)}
                                             />
                                             <div className={errors[`unit_moq_${unit.id}`] ? "text-red-600" : ""}>
                                                <FormInput 
                                                    id={`u_moq_${unit.id}`} label="MOQ" type="number" required
                                                    value={unit.moq} onChange={(e) => updateUnit(unit.id, 'moq', e.target.value)}
                                                />
                                             </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Supply & Logistics */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Truck className="w-5 h-5 text-red-600" /> 5. Supply & Logistics</h3>
                            <Card>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormInput 
                                        id="leadTime" name="leadTime" label="Lead Time (Days)" type="number" placeholder="e.g. 7" required
                                        value={supplyLogistics.leadTime} onChange={handleLogisticsChange}
                                    />
                                    
                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="countryOfOrigin" name="countryOfOrigin" label="Country of Origin" required
                                            value={supplyLogistics.countryOfOrigin} onChange={handleLogisticsChange}
                                        >
                                            <option value="">Select Country...</option>
                                            <option value="UAE">UAE</option>
                                            <option value="India">India</option>
                                            <option value="China">China</option>
                                            <option value="Vietnam">Vietnam</option>
                                            <option value="USA">USA</option>
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {supplyLogistics.countryOfOrigin === 'Other' && (
                                            <FormInput 
                                                id="countryOfOriginOther" name="countryOfOriginOther" placeholder="Specify Country"
                                                value={supplyLogistics.countryOfOriginOther} onChange={handleLogisticsChange}
                                            />
                                        )}
                                        {errors.countryOfOrigin && <p className="text-xs text-red-500">{errors.countryOfOrigin}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <FormSelect 
                                            id="storageCondition" name="storageCondition" label="Storage Condition" required
                                            value={supplyLogistics.storageCondition} onChange={handleLogisticsChange}
                                        >
                                            <option value="">Select Condition...</option>
                                            <option value="Ambient">Ambient</option>
                                            <option value="Chilled">Chilled</option>
                                            <option value="Frozen">Frozen</option>
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {supplyLogistics.storageCondition === 'Other' && (
                                            <FormInput 
                                                id="storageConditionOther" name="storageConditionOther" placeholder="Specify Storage Condition"
                                                value={supplyLogistics.storageConditionOther} onChange={handleLogisticsChange}
                                            />
                                        )}
                                        {errors.storageCondition && <p className="text-xs text-red-500">{errors.storageCondition}</p>}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 6. Tax & Compliance */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><FileCheck className="w-5 h-5 text-red-600" /> 6. Tax & Compliance</h3>
                            <Card>
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="flex items-center h-full pt-6">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="taxable" 
                                                checked={taxCompliance.taxable} 
                                                onChange={handleTaxChange}
                                                className="w-5 h-5 accent-red-600 rounded"
                                            />
                                            <span className="text-sm font-medium text-slate-700">Taxable Product</span>
                                        </label>
                                    </div>
                                    
                                    <div className="flex-grow max-w-sm space-y-3">
                                        <FormSelect 
                                            id="taxRate" name="taxRate" label="Tax Rate" disabled={!taxCompliance.taxable}
                                            value={taxCompliance.taxRate} onChange={handleTaxChange}
                                        >
                                            <option value="5% VAT">5% VAT</option>
                                            <option value="0% Zero-Rated">0% Zero-Rated</option>
                                            <option value="Exempt">Exempt</option>
                                            <option value="Other">Other</option>
                                        </FormSelect>
                                        {taxCompliance.taxable && taxCompliance.taxRate === 'Other' && (
                                            <FormInput 
                                                id="taxRateOther" name="taxRateOther" placeholder="Specify Tax Rate (e.g. 10%)"
                                                value={taxCompliance.taxRateOther} onChange={handleTaxChange}
                                            />
                                        )}
                                        {errors.taxRate && <p className="text-xs text-red-500">{errors.taxRate}</p>}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 7. Description & Media */}
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-red-600" /> 7. Description & Media</h3>
                            <Card>
                                 <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Product Description</label>
                                        <textarea 
                                            rows={3} 
                                            name="description"
                                            value={media.description}
                                            onChange={handleMediaChange}
                                            className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            placeholder="Enter detailed product description..."
                                        ></textarea>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                                Product Images (Max 5) <span className="text-xs font-normal text-slate-500 ml-1">- {media.images.length}/5 uploaded</span>
                                            </label>
                                            
                                            <div className="grid grid-cols-3 gap-4">
                                                {media.images.map((img, index) => (
                                                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                                                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="absolute top-1 right-1 p-1 bg-white/90 rounded-full text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                                            title="Remove Image"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                
                                                {media.images.length < 5 && (
                                                    <button 
                                                        type="button"
                                                        onClick={handleAddImage}
                                                        className="border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all aspect-square"
                                                    >
                                                        <UploadCloud className="w-6 h-6 mb-1" />
                                                        <span className="text-xs font-medium">Add Image</span>
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Recommended: 1000x1000px, White background. PNG, JPG up to 10MB.</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-3">Supporting Documents</label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors h-48">
                                                <FileText className="w-10 h-10 mb-3 text-slate-300" />
                                                <span className="text-sm font-medium text-slate-700">Click to upload documents</span>
                                                <span className="text-xs text-slate-400 mt-1 text-center">Certificates of Analysis (COA),<br/>Material Safety Data Sheets (MSDS), etc.</span>
                                                <span className="mt-3 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">Browse Files</span>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            </Card>
                        </div>
                    </>
                ) : (
                    renderServiceForm()
                )}

                 {/* 8. Status & Submission Metadata */}
                 <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-slate-700" /> {entryType === 'Product' ? '8' : 'I'}. Status & Submission</h3>
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <FormInput 
                                id="currentStatus" label="Current Status" value={submissionMeta.currentStatus} readOnly={true} disabled={true}
                             />
                             <FormInput 
                                id="version" label="Version" value={submissionMeta.version} readOnly={true} disabled={true}
                             />
                             <FormInput 
                                id="submittedDate" label="Submitted Date" value={submissionMeta.submittedDate} readOnly={true} disabled={true}
                             />
                        </div>
                    </Card>
                </div>

            </div>
        </Modal>
    );
};

const ProductManagementPage = ({ currentView, setCurrentView, products, setProducts, updateRequests, setUpdateRequests }) => {
    const isServiceView = currentView.startsWith('services-');
    const entityName = isServiceView ? 'Service' : 'Product';
    const basePrefix = isServiceView ? 'services-' : 'products-';

    // Determine the active tab based on the current view ID
    const getTabFromView = (view) => {
        if (view.includes('-new')) return 'submitted';
        if (view.includes('-update')) return 'update_req';
        if (view.includes('-approved')) return 'approved';
        if (view.includes('-denied')) return 'rejected';
        return 'submitted';
    };

    const initialTab = getTabFromView(currentView);

    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [viewRequestModalOpen, setViewRequestModalOpen] = useState(false);
    
    // Filters
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterHeader, setFilterHeader] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        setActiveTab(getTabFromView(currentView));
        // Reset filters when switching views
        setSearchTerm('');
        setFilterCategory('All');
        setFilterHeader('All');
        setFilterStatus('All');
    }, [currentView]);

    const handleSaveProduct = (productData) => {
        if (modalMode === 'edit') {
            setProducts(products.map(p => p.id === productData.id ? productData : p));
        } else {
            setProducts([productData, ...products]);
        }
    };

    const handleCloneProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
            name: `${product.name} (Copy)`,
            status: 'Draft',
            sku: 'Draft-Clone',
            date: new Date().toISOString().split('T')[0]
        };
        setProducts([newProduct, ...products]);
        alert(`${entityName} cloned as draft: ${newProduct.name}`);
        setCurrentView(isServiceView ? 'services-new' : 'products-new'); 
    };

    const handleDeleteProduct = (id) => {
        if(window.confirm('Are you sure you want to delete this draft?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    // NEW: Handle withdrawing a pending product request
    const handleWithdrawProduct = (id) => {
        if(window.confirm('Are you sure you want to withdraw this request? It will revert to Draft status.')) {
            setProducts(products.map(p => p.id === id ? { ...p, status: 'Draft' } : p));
        }
    };

    const handleRequestUpdateClick = (product) => {
        setEditingProduct(product);
        setRequestModalOpen(true);
    };

    const handleSubmitUpdateRequest = (reqData) => {
        const newReq = {
            id: Date.now(),
            productName: editingProduct.name,
            sku: editingProduct.sku,
            changeType: reqData.changeType,
            currentValue: reqData.currentValue,
            requestedValue: reqData.requestedValue,
            unit: reqData.unit,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            image: editingProduct.image
        };
        setUpdateRequests([newReq, ...updateRequests]);
        setRequestModalOpen(false);
        setEditingProduct(null);
        alert("Update request submitted successfully!");
    };

    const handleCancelUpdateRequest = (id) => {
        if (window.confirm('Are you sure you want to withdraw this update request?')) {
            setUpdateRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    const handleViewRequest = (req) => {
        setSelectedRequest(req);
        setViewRequestModalOpen(true);
    };

    const handleFixResubmit = (product) => {
        setEditingProduct(product);
        setModalMode('edit');
        setShowAddModal(true);
    };

    const handleViewProduct = (product) => {
        setEditingProduct(product);
        setModalMode('view');
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setEditingProduct(null);
        setModalMode('add');
    };

    const handleOpenAddModal = () => {
        setModalMode('add');
        setEditingProduct(null);
        setShowAddModal(true);
    };

    const filteredProducts = useMemo(() => {
        let items = products;
        
        // 1. Filter by Mode (Product vs Service)
        if (isServiceView) {
            items = items.filter(p => p.header === 'Service');
        } else {
            items = items.filter(p => p.header !== 'Service');
        }

        // 2. Filter by Tab Status
        if (activeTab === 'submitted') items = items.filter(p => p.status === 'Pending' || p.status === 'Draft');
        if (activeTab === 'approved') items = items.filter(p => p.status === 'Approved');
        if (activeTab === 'rejected') items = items.filter(p => p.status === 'Rejected');
        
        // 3. Search Filter
        if (searchTerm) {
            items = items.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // 4. Dropdown Filters
        if (filterCategory !== 'All') items = items.filter(p => p.category === filterCategory);
        if (filterHeader !== 'All') items = items.filter(p => p.header === filterHeader);
        if (filterStatus !== 'All') items = items.filter(p => p.status === filterStatus);

        return items;
    }, [activeTab, products, searchTerm, filterCategory, filterHeader, filterStatus, isServiceView]);

    const filteredUpdateRequests = useMemo(() => {
        if (activeTab !== 'update_req') return [];
        let items = updateRequests;
        if (searchTerm) {
            items = items.filter(p => 
                p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterStatus !== 'All') items = items.filter(p => p.status === filterStatus);
        return items;
    }, [activeTab, updateRequests, searchTerm, filterStatus]);

    const uniqueCategories = [...new Set(products.filter(p => isServiceView ? p.header === 'Service' : p.header !== 'Service').map(p => p.category))];
    const uniqueHeaders = [...new Set(products.filter(p => isServiceView ? p.header === 'Service' : p.header !== 'Service').map(p => p.header))];
    const uniqueStatuses = activeTab === 'submitted' ? ['Draft', 'Pending'] : 
                           activeTab === 'update_req' ? ['Pending', 'Approved', 'Rejected'] :
                           [...new Set(products.filter(p => isServiceView ? p.header === 'Service' : p.header !== 'Service').map(p => p.status))];

    // Dynamic Title Logic
    const getPageTitle = () => {
        if (isServiceView) {
             if (currentView === 'services-new') return 'New Service Requests';
             if (currentView === 'services-approved') return 'Approved Services';
             if (currentView === 'services-update') return 'Service Update Requests';
             if (currentView === 'services-denied') return 'Denied Services';
             return 'Service Management';
        } else {
             if (currentView === 'products-new') return 'New Product Requests';
             if (currentView === 'products-approved') return 'Approved Products';
             if (currentView === 'products-update') return 'Product Update Requests';
             if (currentView === 'products-denied') return 'Denied Products';
             return 'Product Management';
        }
    };

    const getPageDescription = () => {
        if (isServiceView) {
            if (currentView === 'services-new') return 'View and manage your service submission requests.';
            if (currentView === 'services-approved') return 'View and manage your active service contracts.';
            if (currentView === 'services-update') return 'Track status of requested changes to existing services.';
            if (currentView === 'services-denied') return 'Review denied services and resubmit fixes.';
            return 'Manage your complete service portfolio.';
        } else {
            if (currentView === 'products-new') return 'View and manage your product submission requests.';
            if (currentView === 'products-approved') return 'View and manage your active approved catalogue.';
            if (currentView === 'products-update') return 'Track status of requested changes to existing products.';
            if (currentView === 'products-denied') return 'Review denied items and resubmit fixes.';
            return 'Manage your complete product catalogue.';
        }
    };

    // Tabs configuration with Colors
    const tabs = [
        { id: `${basePrefix}overview`, label: 'Overview', color: 'slate' },
        { id: `${basePrefix}new`, label: 'New Requests', color: 'blue' },
        { id: `${basePrefix}update`, label: 'Update Requests', color: 'amber' },
        { id: `${basePrefix}approved`, label: 'Approved', color: 'emerald' },
        { id: `${basePrefix}denied`, label: 'Denied', color: 'rose' },
    ];

    return (
        <div className="space-y-6">
            {showAddModal && <AddProductModal onClose={handleCloseModal} initialData={editingProduct} mode={modalMode} onSave={handleSaveProduct} defaultType={isServiceView ? 'Service' : 'Product'} />}
            {requestModalOpen && <UpdateRequestModal product={editingProduct} onClose={() => setRequestModalOpen(false)} onSubmit={handleSubmitUpdateRequest} />}
            {viewRequestModalOpen && <ViewRequestModal request={selectedRequest} onClose={() => setViewRequestModalOpen(false)} />}
            
            {/* Tab Navigation - ENHANCED WRAPPED GRID & READABLE */}
            <div className="bg-white border-b border-slate-200 px-4 -mx-4 sm:-mx-6 sticky top-0 z-10 shadow-sm">
                <div className="flex flex-wrap md:grid md:grid-cols-5 gap-2 py-2 px-2 bg-slate-50/90 backdrop-blur-sm rounded-b-xl border-t border-slate-100">
                    {tabs.map((tab) => {
                        const isActive = currentView === tab.id;
                        
                        const styles = {
                            slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                            blue:    isActive ? 'bg-blue-600 text-white ring-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                            amber:   isActive ? 'bg-amber-500 text-white ring-amber-600' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700',
                            emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                            rose:    isActive ? 'bg-rose-600 text-white ring-rose-700' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700',
                        };
                        const currentStyle = styles[tab.color] || styles.slate;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentView(tab.id)}
                                className={`
                                    flex items-center justify-center py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm flex-1 min-w-[45%] md:min-w-0 h-auto
                                    ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                    ${currentStyle}
                                `}
                            >
                                <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {currentView === 'products-overview' ? (
                 <ProductOverviewView setCurrentView={setCurrentView} products={products} updateRequests={updateRequests} onAddNew={handleOpenAddModal} />
            ) : currentView === 'services-overview' ? (
                 <ServiceOverviewView setCurrentView={setCurrentView} products={products} updateRequests={updateRequests} onAddNew={handleOpenAddModal} />
            ) : (
                <>
                <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
                        <p className="text-slate-500 text-sm mt-1">{getPageDescription()}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                        <button 
                            onClick={() => alert(`Import functionality for ${entityName}s will allow bulk upload via CSV/Excel.`)} 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
                        >
                            <UploadCloud className="w-4 h-4" /> Import
                        </button>
                        <button 
                            onClick={() => alert(`Exporting ${entityName}s list to CSV...`)} 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
                        >
                            <Download className="w-4 h-4" /> Export
                        </button>
                        <PrimaryButton className="flex-1 sm:flex-none w-full sm:w-auto shadow-md shadow-red-200" onClick={() => { setModalMode('add'); setEditingProduct(null); setShowAddModal(true); }}>
                            <Plus className="w-4 h-4" /> Add New {entityName}
                        </PrimaryButton>
                    </div>
                </div>

                <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden" noPadding={true}>
                    <div className="p-4 border-b border-slate-200 bg-white space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full lg:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder={`Search by name, ${isServiceView ? 'vendor code' : 'brand'}, or SKU...`} 
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                                {activeTab !== 'update_req' && (
                                    <>
                                        {/* Header Filter - Hide for Services as it's always 'Service' */}
                                        {!isServiceView && (
                                            <select 
                                                className="px-3 py-2.5 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                                                value={filterHeader}
                                                onChange={(e) => setFilterHeader(e.target.value)}
                                            >
                                                <option value="All">All Headers</option>
                                                {uniqueHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                            </select>
                                        )}

                                        <select 
                                            className="px-3 py-2.5 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                        >
                                            <option value="All">All Categories</option>
                                            {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </>
                                )}

                                {activeTab !== 'approved' && activeTab !== 'rejected' && (
                                    <select 
                                        className="px-3 py-2.5 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="All">All Statuses</option>
                                        {uniqueStatuses.map(s => <option key={s} value={s}>{s === 'Pending' ? 'Pending Approval' : s}</option>)}
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {/* ... (Update Request Table) ... */}
                        {activeTab === 'update_req' ? (
                            <>
                                <div className="md:hidden space-y-4 p-4">
                                    {filteredUpdateRequests.map((req) => (
                                        <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                            <div className="flex gap-4 mb-3">
                                                <img src={req.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <div className="font-bold text-sm">{req.productName}</div>
                                                    <div className="text-xs text-slate-500">{req.sku}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mb-3 text-sm">
                                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{req.changeType}</span>
                                                <StatusBadge status={req.status} />
                                            </div>
                                            <div className="flex items-center gap-2 text-sm mb-3 bg-slate-50 p-2 rounded">
                                                <span className="text-slate-400 line-through">{req.currentValue}</span>
                                                <ArrowRight className="w-3 h-3 text-slate-400" />
                                                <span className="font-bold text-blue-600">{req.requestedValue} {req.unit}</span>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleViewRequest(req)} className="px-3 py-1.5 border rounded text-xs">View</button>
                                                {req.status === 'Pending' && <button onClick={() => handleCancelUpdateRequest(req.id)} className="px-3 py-1.5 border border-red-200 text-red-600 rounded text-xs">Withdraw</button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <table className="hidden md:table w-full text-left border-collapse table-fixed min-w-[1200px]">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr className="divide-x divide-slate-200">
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Image</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-64">{entityName} Info</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Change Type</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Current vs Requested</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Status</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Submitted Date</th>
                                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {filteredUpdateRequests.length > 0 ? (
                                            filteredUpdateRequests.map((req) => (
                                                <tr key={req.id} className="hover:bg-slate-50 transition-all divide-x divide-slate-100 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                                            <img src={req.image} alt={req.productName} className="w-full h-full object-cover" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-slate-900 truncate">{req.productName}</div>
                                                        <div className="text-xs text-slate-500 font-mono mt-0.5">{req.sku}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                            {req.changeType}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span className="text-slate-400 line-through decoration-slate-300">{req.currentValue}</span>
                                                            <ArrowRight className="w-4 h-4 text-slate-300" />
                                                            <span className="font-semibold text-blue-600">{req.requestedValue} <span className="text-xs text-slate-400 font-normal">{req.unit}</span></span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={req.status} /></td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{req.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => handleViewRequest(req)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            {req.status === 'Pending' && (
                                                                <button onClick={() => handleCancelUpdateRequest(req.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Withdraw Request">
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-500 text-sm">No update requests found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                        ) : activeTab === 'rejected' ? (
                            <>
                                <div className="md:hidden space-y-4 p-4">
                                    {filteredProducts.map((product) => (
                                        <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                            <div className="flex gap-3 mb-3">
                                                <img src={product.image} alt="" className="w-16 h-16 rounded object-cover" />
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">{product.name}</div>
                                                    <div className="text-xs text-slate-500">{product.category} &gt; {product.subcategory}</div>
                                                </div>
                                            </div>
                                            <div className="bg-red-50 text-red-700 p-2 rounded text-xs mb-3 font-medium border border-red-100">
                                                Reason: {product.reason}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleFixResubmit(product)} className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-xs font-bold">Fix</button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="px-3 py-1.5 border border-red-200 text-red-600 rounded text-xs">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <table className="hidden md:table w-full text-left border-collapse table-fixed min-w-[1200px]">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr className="divide-x divide-slate-200">
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Image</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-64">{entityName} Name</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-48">Category</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-red-600 uppercase tracking-wider bg-red-50/50">Rejection Reason</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Rejected Date</th>
                                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-slate-50 transition-all divide-x divide-slate-100 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-slate-900 group-hover:text-red-700 transition-colors truncate">{product.name}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5 font-medium">{product.brand}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center text-sm text-slate-600">
                                                            <span className="font-medium text-slate-800">{product.category}</span>
                                                            <ChevronRight className="w-3 h-3 mx-1 text-slate-300" />
                                                            <span className="text-slate-500">{product.subcategory}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-normal">
                                                        <div className="text-xs text-red-700 font-medium bg-red-50 p-2 rounded-lg border border-red-100 leading-snug">
                                                            {product.reason || 'No reason provided'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{product.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => handleViewProduct(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleFixResubmit(product)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm" title="Fix & Resubmit">
                                                                <Wrench className="w-3 h-3" /> Fix
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500 text-sm">No denied {isServiceView ? 'services' : 'products'} found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <div className="md:hidden space-y-4 p-4">
                                    {filteredProducts.map((product) => (
                                        <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                            <div className="flex gap-4 mb-2">
                                                <img src={product.image} alt="" className="w-12 h-12 rounded object-cover border border-slate-100" />
                                                <div className="overflow-hidden">
                                                    <div className="font-bold text-sm text-slate-900 truncate">{product.name}</div>
                                                    <div className="text-xs text-slate-500">{product.sku}</div>
                                                    <div className="text-xs text-slate-400 mt-1">{product.category}</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mb-3 border-t border-slate-50 pt-2">
                                                <div className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">
                                                    {isServiceView ? `AED ${product.price || product.hourlyRate}` : `${product.units} Units`}
                                                </div>
                                                <StatusBadge status={product.status} />
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleViewProduct(product)} className="px-3 py-1.5 border rounded-lg text-xs font-medium">View</button>
                                                {product.status === 'Approved' && (
                                                    <>
                                                        <button onClick={() => handleRequestUpdateClick(product)} className="px-3 py-1.5 border border-orange-200 text-orange-600 rounded-lg text-xs font-medium">Update</button>
                                                        <button onClick={() => handleCloneProduct(product)} className="px-3 py-1.5 border border-purple-200 text-purple-600 rounded-lg text-xs font-medium">Clone</button>
                                                    </>
                                                )}
                                                {product.status === 'Draft' && (
                                                    <>
                                                        <button onClick={() => handleFixResubmit(product)} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">Edit</button>
                                                        <button onClick={() => handleDeleteProduct(product.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium">Delete</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <table className="hidden md:table w-full text-left border-collapse table-fixed min-w-[1200px]">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr className="divide-x divide-slate-200">
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">Image</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-64">{entityName} Name</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-36">SKU</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                            <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">{isServiceView ? 'Rate/Price' : 'Units'}</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Status</th>
                                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-slate-50 transition-all divide-x divide-slate-100 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-slate-900 group-hover:text-red-700 transition-colors truncate">{product.name}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5 font-medium">{product.brand}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono font-medium tracking-tight">{product.sku}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center text-sm text-slate-600">
                                                            <span className="font-medium text-slate-800">{product.category}</span>
                                                            <ChevronRight className="w-3 h-3 mx-1 text-slate-300" />
                                                            <span className="text-slate-500">{product.subcategory}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className="inline-flex items-center justify-center bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">
                                                            {isServiceView ? product.price || product.hourlyRate : product.units}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={product.status} /></td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end gap-2">
                                                            {/* 👁 View Product Details (Read-only) - Always Available */}
                                                            <button onClick={() => handleViewProduct(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            
                                                            {product.status === 'Approved' && (
                                                                <>
                                                                    <button onClick={() => handleRequestUpdateClick(product)} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Request Update">
                                                                        <FilePenLine className="w-4 h-4" />
                                                                    </button>
                                                                    <button onClick={() => handleCloneProduct(product)} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Clone">
                                                                        <Copy className="w-4 h-4" />
                                                                    </button>
                                                                </>
                                                            )}

                                                            {/* 🗑 Withdraw Request - Pending Only (Disabled after approval/review starts) */}
                                                            {product.status === 'Pending' && (
                                                                <button onClick={() => handleWithdrawProduct(product.id)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Withdraw Request">
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            )}

                                                            {(product.status === 'Draft') && (
                                                                <>
                                                                    {/* ✏️ Edit Product - Allowed until reviewed (Draft) */}
                                                                    <button onClick={() => handleFixResubmit(product)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Product">
                                                                        <Edit className="w-4 h-4" />
                                                                    </button>

                                                                    {/* 📤 Resubmit - If sent back for correction (Draft) */}
                                                                    <button onClick={() => handleFixResubmit(product)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Submit / Resubmit">
                                                                        <UploadCloud className="w-4 h-4" />
                                                                    </button>

                                                                    {/* Delete Draft */}
                                                                    <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Draft">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                                            <Search className="w-6 h-6 text-slate-400" />
                                                        </div>
                                                        <p className="text-sm font-medium text-slate-900">No {isServiceView ? 'services' : 'products'} found</p>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            Try adjusting your filters or search query to find what you're looking for.
                                                        </p>
                                                        <button 
                                                            onClick={() => {setSearchTerm(''); setFilterCategory('All'); setFilterHeader('All'); setFilterStatus('All');}}
                                                            className="mt-4 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                                                        >
                                                            Clear all filters
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    {/* Pagination UI - Spreadsheet style */}
                    <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center px-8">
                        <div className="text-xs font-medium text-slate-500">
                            Page 1 of 1 <span className="mx-2">|</span> {activeTab === 'update_req' ? filteredUpdateRequests.length : filteredProducts.length} Records Found
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1.5 border border-slate-300 rounded-lg bg-white text-slate-400 hover:text-slate-600" disabled><ChevronRight className="w-4 h-4 rotate-180" /></button>
                            <button className="p-1.5 border border-slate-300 rounded-lg bg-white text-slate-400 hover:text-slate-600" disabled><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </Card>
                </>
            )}
        </div>
    );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- PURCHASE ORDER MANAGEMENT MODULE
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const OrderManagementPage = ({ purchaseOrders, setPurchaseOrders }) => {
    const [activeTab, setActiveTab] = useState('All'); 
    const [selectedPO, setSelectedPO] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    
    // Updated States for Rejection
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedRejectedItems, setSelectedRejectedItems] = useState([]); // Track items selected for rejection
    
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filters, setFilters] = useState({
        status: 'All',
        warehouse: 'All',
    });

    const handleAction = (po, action) => {
        setSelectedPO(po);
        if (action === 'accept') setShowAcceptModal(true);
        if (action === 'reject') {
            setRejectionReason(''); // Reset reason
            setSelectedRejectedItems([]); // Reset selected items
            setShowRejectModal(true);
        }
        if (action === 'view') setShowDetailModal(true);
        if (action === 'process') confirmProcessing(po);
    };

    const toggleRejectedItem = (itemName) => {
        setSelectedRejectedItems(prev => 
            prev.includes(itemName) 
                ? prev.filter(i => i !== itemName) 
                : [...prev, itemName]
        );
    };

    const confirmAccept = () => {
        setPurchaseOrders(prev => prev.map(item => 
            item.id === selectedPO.id ? { ...item, status: 'Accepted', acceptedAt: new Date().toISOString() } : item
        ));
        setShowAcceptModal(false);
        if (showDetailModal) setShowDetailModal(false);
        alert(`PO #${selectedPO.poNo} Accepted Successfully.`);
    };

    const confirmProcessing = (poOrSelected) => {
        const targetId = poOrSelected.id || selectedPO.id;
        setPurchaseOrders(prev => prev.map(item => 
            item.id === targetId ? { ...item, status: 'In Progress', processingStartedAt: new Date().toISOString() } : item
        ));
        if (showDetailModal) setShowDetailModal(false);
        alert(`PO has been moved to Processing.`);
    }

    const confirmDelivery = (poOrSelected) => {
        const targetId = poOrSelected.id || selectedPO.id;
        setPurchaseOrders(prev => prev.map(item => 
            item.id === targetId ? { ...item, status: 'Delivered', deliveredAt: new Date().toISOString() } : item
        ));
        if (showDetailModal) setShowDetailModal(false);
        alert(`PO has been marked as Delivered.`);
    }

    const confirmReject = () => {
        if (!rejectionReason.trim()) return alert("Rejection reason is mandatory.");
        
        setPurchaseOrders(prev => prev.map(item => 
            item.id === selectedPO.id ? { 
                ...item, 
                status: 'Rejected', 
                rejectionReason, 
                rejectedItems: selectedRejectedItems, // Store selected items
                rejectedAt: new Date().toLocaleDateString('en-GB') 
            } : item
        ));
        setShowRejectModal(false);
        if (showDetailModal) setShowDetailModal(false);
        setRejectionReason('');
        setSelectedRejectedItems([]);
        alert(`PO #${selectedPO.poNo} has been Rejected.`);
    };

    // Tabs matching standard Data Table designs with Modern Color Config
    const tabs = [
        { id: 'All', label: 'All Orders', icon: ListFilter, color: 'slate' },
        { id: 'New', label: 'New Orders', icon: AlertCircle, color: 'blue' },
        { id: 'Accepted', label: 'Accepted Orders', icon: CheckCircle, color: 'emerald' },
        { id: 'In Progress', label: 'Processing Orders', icon: Clock, color: 'amber' },
        { id: 'Delivered', label: 'Delivered Orders', icon: Truck, color: 'indigo' },
        { id: 'Rejected', label: 'Rejected Orders', icon: XCircle, color: 'rose' }
    ];

    const filteredPOs = useMemo(() => {
        return purchaseOrders.filter(po => {
            // 1. Tab Filter
            const matchesTab = activeTab === 'All' ? true : po.status === activeTab;
            
            // 2. Search Filter
            const matchesSearch = searchTerm === '' ? true : 
                po.poNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                po.vendorCode.toLowerCase().includes(searchTerm.toLowerCase());

            // 3. Dropdown Filters
            const matchesWH = filters.warehouse === 'All' ? true : po.warehouse === filters.warehouse;

            return matchesTab && matchesSearch && matchesWH;
        });
    }, [purchaseOrders, activeTab, searchTerm, filters]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Purchase Orders</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and fulfill your incoming orders.</p>
                </div>
                <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                {/* 1. Tabs & Toolbar Section - ENHANCED WRAPPED & READABLE */}
                <div className="border-b border-slate-200 p-2">
                    <div className="flex flex-wrap gap-2 bg-slate-50/80 rounded-xl p-1.5">
                        {tabs.map((tab) => {
                            const count = purchaseOrders.filter(o => tab.id === 'All' ? true : o.status === tab.id).length;
                            const isActive = activeTab === tab.id;
                            
                            const styles = {
                                slate:   isActive ? 'bg-slate-800 text-white ring-slate-900' : 'text-slate-600 hover:bg-slate-100',
                                blue:    isActive ? 'bg-blue-600 text-white ring-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                                emerald: isActive ? 'bg-emerald-600 text-white ring-emerald-700' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
                                amber:   isActive ? 'bg-amber-500 text-white ring-amber-600' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700',
                                indigo:  isActive ? 'bg-indigo-600 text-white ring-indigo-700' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700',
                                rose:    isActive ? 'bg-rose-600 text-white ring-rose-700' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700',
                            };
                            const currentStyle = styles[tab.color] || styles.slate;
                            const Icon = tab.icon;
                            
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        relative flex flex-col sm:flex-row items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm flex-1 min-w-[45%] sm:min-w-fit h-auto
                                        ${isActive ? 'shadow-md ring-1 scale-[1.02]' : 'border border-transparent hover:border-slate-200'}
                                        ${currentStyle}
                                    `}
                                >
                                    <Icon className={`w-4 h-4 mb-1 sm:mb-0 ${isActive ? 'text-white' : 'opacity-70'}`} />
                                    <span className="text-center whitespace-normal leading-tight">{tab.label}</span>
                                    {count > 0 && (
                                        <span className={`
                                            ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold min-w-[20px] text-center
                                            ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}
                                        `}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Filter Bar */}
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 shadow-sm">
                            <ListFilter className="w-4 h-4" />
                            <span className="font-medium">Filter</span>
                        </div>
                        <select 
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-600 focus:ring-2 focus:ring-red-500 outline-none shadow-sm cursor-pointer"
                            value={filters.warehouse}
                            onChange={(e) => setFilters({...filters, warehouse: e.target.value})}
                        >
                            <option value="All">All Warehouses</option>
                            <option value="S3">S3 - Central</option>
                            <option value="S5">S5 - Cold Chain</option>
                            <option value="S7">S7 - Regional</option>
                        </select>
                    </div>
                </div>

                {/* 3. Data Table */}
                <>
                    <div className="md:hidden space-y-4 p-4 bg-slate-50">
                        {filteredPOs.length > 0 ? filteredPOs.map((po) => (
                            <div key={po.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-2">
                                    <div onClick={() => handleAction(po, 'view')}>
                                        <div className="text-lg font-bold text-slate-900">#{po.poNo}</div>
                                        <div className="text-xs text-slate-500">{po.date}</div>
                                    </div>
                                    <StatusBadge status={po.status} />
                                </div>
                                
                                {activeTab === 'Rejected' ? (
                                    <div className="mb-3 bg-red-50 p-2 rounded text-xs text-red-700 border border-red-100">
                                        <span className="font-bold block mb-1">Reason:</span>
                                        {po.rejectionReason}
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-end border-t border-slate-100 pt-3 mt-2">
                                        <div className="text-xs text-slate-600">
                                            <div className="mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {po.warehouse}</div>
                                            <div className="bg-slate-100 px-2 py-0.5 rounded inline-block">{po.paymentTerms}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400">Net Amount</div>
                                            <div className="font-bold text-slate-900 text-lg">AED {po.netAmount.toLocaleString()}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-slate-50">
                                    <button onClick={() => handleAction(po, 'view')} className="px-3 py-1.5 border rounded-lg text-xs font-bold text-slate-600">View</button>
                                    
                                    {po.status === 'New' && (
                                        <>
                                            <button onClick={() => handleAction(po, 'accept')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold">Accept</button>
                                            <button onClick={() => handleAction(po, 'reject')} className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold">Reject</button>
                                        </>
                                    )}
                                    {po.status === 'Accepted' && <button onClick={() => confirmProcessing(po)} className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold">Process</button>}
                                    {po.status === 'In Progress' && <button onClick={() => confirmDelivery(po)} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold">Deliver</button>}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-500 text-sm">No orders found.</div>
                        )}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">PO No</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">PO Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Supplier Code</th>
                                    
                                    {activeTab === 'Rejected' ? (
                                        <>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rejection Reason</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unavailable Items</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rejected Date</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Warehouse</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Terms</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Net Amount</th>
                                        </>
                                    )}
                                    
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredPOs.length > 0 ? filteredPOs.map((po) => (
                                    <tr key={po.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 align-middle">
                                            <button onClick={() => handleAction(po, 'view')} className="text-sm font-bold text-slate-900 hover:text-red-600 transition-colors">#{po.poNo}</button>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="text-sm text-slate-600 font-medium">{po.date}</div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="text-sm font-medium text-slate-900">{po.vendorCode}</div>
                                        </td>

                                        {activeTab === 'Rejected' ? (
                                            <>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded border border-red-100 max-w-xs truncate" title={po.rejectionReason}>
                                                        {po.rejectionReason}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className="text-xs text-slate-500">
                                                        {po.rejectedItems && po.rejectedItems.length > 0 ? (
                                                            <ul className="list-disc list-inside">
                                                                {po.rejectedItems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="italic text-slate-400">All Items</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className="text-sm text-slate-600">{po.rejectedAt}</div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className="text-sm text-slate-600">{po.warehouse}</div>
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${po.paymentTerms === 'Immediate' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                        {po.paymentTerms}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 align-middle text-right">
                                                    <span className="text-sm font-medium text-slate-900">AED {po.netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                                </td>
                                            </>
                                        )}

                                        <td className="px-6 py-4 align-middle text-center">
                                            <StatusBadge status={po.status} />
                                        </td>
                                        
                                        <td className="px-6 py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleAction(po, 'view')} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                
                                                <button onClick={() => alert(`Downloading PO #${po.poNo}`)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download PDF">
                                                    <Download className="w-4 h-4" />
                                                </button>

                                                {po.status === 'New' && (
                                                    <>
                                                        <button onClick={() => handleAction(po, 'accept')} className="p-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-all shadow-sm ring-1 ring-emerald-700/10" title="Accept PO">
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleAction(po, 'reject')} className="p-2 bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-all shadow-sm ring-1 ring-rose-700/10" title="Reject PO">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}

                                                {po.status === 'Accepted' && (
                                                    <button onClick={() => confirmProcessing(po)} className="p-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-all shadow-sm ring-1 ring-orange-700/10" title="Go to Delivery">
                                                        <Truck className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {po.status === 'In Progress' && (
                                                    <button onClick={() => confirmDelivery(po)} className="p-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-all shadow-sm ring-1 ring-purple-700/10" title="Update Delivery Status">
                                                        <Truck className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={activeTab === 'Rejected' ? 8 : 8} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                                    <Search className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-900">No orders found</p>
                                                <p className="text-xs text-slate-500 mt-1">Try adjusting your filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            </div>

            {/* Enhanced PO Detail Page (Modal) */}
            {showDetailModal && selectedPO && (
                <Modal 
                    title={`Purchase Order Details - ${selectedPO.poNo}`} 
                    onClose={() => setShowDetailModal(false)} 
                    size="5xl"
                    footer={
                        selectedPO.status === 'New' ? (
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                                <div className="flex items-center gap-2 text-amber-600 text-xs font-medium">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Action Required: Review terms before acceptance.</span>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button onClick={() => handleAction(selectedPO, 'reject')} className="flex-1 sm:flex-none px-6 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-all shadow-md shadow-rose-200">Reject Order</button>
                                    <button onClick={() => handleAction(selectedPO, 'accept')} className="flex-1 sm:flex-none px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">Accept Order</button>
                                </div>
                            </div>
                        ) : selectedPO.status === 'In Progress' ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2 text-purple-600 text-xs font-medium">
                                    <Truck className="w-4 h-4" />
                                    <span>Status: Delivery In Progress</span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => confirmDelivery(selectedPO)} className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-all shadow-md shadow-purple-200">
                                        <CheckCircle className="w-4 h-4" /> Mark Delivered
                                    </button>
                                    <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all">
                                        <Printer className="w-4 h-4" /> Print Order
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                    <History className="w-4 h-4" />
                                    <span>Status: <span className={`${selectedPO.status === 'Accepted' ? 'text-emerald-600' : selectedPO.status === 'Delivered' ? 'text-purple-600' : 'text-slate-900'}`}>{selectedPO.status}</span></span>
                                </div>
                                <div className="flex gap-3">
                                    {selectedPO.status === 'Accepted' && (
                                        <button onClick={() => confirmProcessing(selectedPO)} className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-all shadow-md shadow-orange-200">
                                            <Truck className="w-4 h-4" /> Go to Delivery
                                        </button>
                                    )}
                                    <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all">
                                        <Printer className="w-4 h-4" /> Print Order
                                    </button>
                                </div>
                            </div>
                        )
                    }
                >
                    <div className="space-y-6 font-inter">
                        {/* 1. Header Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-md text-white">
                                        <Package2 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Abreco Trading LLC</h2>
                                        <p className="text-slate-500 text-sm mt-1">Industrial Area 4, Dubai, UAE</p>
                                        <p className="text-slate-400 text-xs mt-0.5">TRN: 100234567890003</p>
                                    </div>
                                </div>
                                <div className="text-right mt-6 md:mt-0">
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Purchase Order</div>
                                    <div className="text-2xl font-bold text-slate-900">#{selectedPO.poNo}</div>
                                    <div className="mt-2 inline-flex">
                                        <StatusBadge status={selectedPO.status} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Vendor Info Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                                    <Building className="w-4 h-4 text-slate-400" /> Vendor Details
                                </h4>
                                <div className="mt-auto">
                                    <p className="text-sm font-bold text-slate-900">Royal Harvest Foods LLC</p>
                                    <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-50 inline-block px-2 py-0.5 rounded border border-slate-100">Code: {selectedPO.vendorCode}</p>
                                    <p className="text-xs text-slate-500 mt-2">Al Quoz Industrial 3, Dubai</p>
                                    <p className="text-xs text-slate-500">contact@royalharvest.com</p>
                                </div>
                            </div>

                            {/* Shipping Info Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-slate-400" /> Ship To
                                </h4>
                                <div className="mt-auto">
                                    <p className="text-sm font-bold text-slate-900">Abreco Warehouse {selectedPO.warehouse}</p>
                                    <p className="text-xs text-slate-500 mt-1">Plot 552-120, Jebel Ali Freezone</p>
                                    <p className="text-xs text-slate-500">Dubai, United Arab Emirates</p>
                                    <p className="text-xs text-slate-500">+971 4 888 5555</p>
                                </div>
                            </div>

                            {/* PO Meta Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                                    <FileText className="w-4 h-4 text-slate-400" /> Order Info
                                </h4>
                                <div className="space-y-3 mt-auto">
                                    <div className="flex justify-between text-xs border-b border-slate-50 pb-2">
                                        <span className="text-slate-500">Issue Date</span>
                                        <span className="text-slate-900 font-semibold">{selectedPO.date}</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-slate-50 pb-2">
                                        <span className="text-slate-500">Delivery Due</span>
                                        <span className="text-slate-900 font-semibold">{selectedPO.deliveryDate}</span>
                                    </div>
                                    <div className="flex justify-between text-xs pt-1">
                                        <span className="text-slate-500">Payment Terms</span>
                                        <span className="text-slate-900 font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">{selectedPO.paymentTerms}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Items Table Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h4 className="text-sm font-bold text-slate-900">Order Items</h4>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-white border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 text-center">#</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Description</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-center">Qty</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-right">Unit Price</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {selectedPO.items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4 text-center text-xs font-medium text-slate-400">{idx + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                                                <div className="text-xs text-slate-500 mt-0.5 font-mono">SKU: {item.sku}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-slate-700 bg-slate-50/50">{item.qty}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-slate-600">{item.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                            <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">{(item.qty * item.unitPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 4. Footer Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Terms Card */}
                            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                                <div>
                                    <h5 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Terms & Conditions</h5>
                                    <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <li>Goods must be delivered to the specified warehouse between 8:00 AM and 4:00 PM.</li>
                                        <li>Invoice must reference the PO number.</li>
                                        <li>Damaged goods will be returned at supplier's expense.</li>
                                    </ul>
                                </div>
                                <div className="mt-4 flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                    <Info className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-xs font-medium">Please confirm this order within 48 hours.</p>
                                </div>
                            </div>

                            {/* Totals Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h5 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Financial Summary</h5>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span>AED {selectedPO.netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                                        <span>Tax (5% VAT)</span>
                                        <span>AED {(selectedPO.netAmount * 0.05).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span>AED 0.00</span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-4 mt-2 flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-900">Total Amount</span>
                                        <span className="text-2xl font-bold text-slate-900 tracking-tight">
                                            <span className="text-xs text-slate-400 font-medium mr-1">AED</span>
                                            {(selectedPO.netAmount * 1.05).toLocaleString(undefined, {minimumFractionDigits: 2})}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Modal: Accept Confirmation */}
            {showAcceptModal && (
                <Modal title="Accept Purchase Order" onClose={() => setShowAcceptModal(false)} size="sm"
                    footer={
                        <div className="flex gap-3 w-full">
                            <button onClick={() => setShowAcceptModal(false)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                            <PrimaryButton onClick={confirmAccept} className="flex-1 py-3 h-auto text-xs font-black uppercase tracking-widest">Confirm PO</PrimaryButton>
                        </div>
                    }
                >
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 tracking-tight">Accept PO #{selectedPO?.poNo}?</h4>
                        <p className="text-sm text-slate-500 font-medium mt-3 px-4 leading-relaxed">By confirming, you acknowledge receipt of this PO and commit to fulfilling it by <span className="text-slate-900 font-black">{selectedPO?.deliveryDate}</span>.</p>
                    </div>
                </Modal>
            )}

            {/* Modal: Reject Feedback */}
            {showRejectModal && (
                <Modal title="Reject Purchase Order" onClose={() => setShowRejectModal(false)} size="md"
                    footer={
                        <div className="flex gap-3 w-full">
                            <button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                            <button onClick={confirmReject} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-200 transition-all">Submit Rejection</button>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-rose-50 text-rose-700 rounded-2xl border-2 border-rose-100">
                            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-black uppercase tracking-wider leading-none">Mandatory Rejection Data</p>
                                <p className="text-xs font-medium mt-2 leading-relaxed opacity-80">Please specify the reason for rejection and indicate which items are unavailable.</p>
                            </div>
                        </div>

                        {/* Rejection Reason */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Rejection Reason <span className="text-red-500">*</span></label>
                            <textarea 
                                rows={3}
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="block w-full p-4 border-2 border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium placeholder:text-slate-300 shadow-inner"
                                placeholder="State reason (e.g. Stock Unavailable, Discontinued Product...)"
                            ></textarea>
                        </div>

                        {/* Unavailable Items Selection */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Select Unavailable Items (Out of Stock)</label>
                            <div className="bg-slate-50 rounded-2xl border-2 border-slate-100 p-4 max-h-48 overflow-y-auto space-y-2">
                                {selectedPO?.items.map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-red-200 hover:shadow-sm transition-all">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedRejectedItems.includes(item.name)}
                                            onChange={() => toggleRejectedItem(item.name)}
                                            className="w-5 h-5 accent-red-600 rounded-md"
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-slate-700">{item.name}</div>
                                            <div className="text-xs text-slate-400 font-mono">SKU: {item.sku}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 text-right">Selected items will be flagged to the admin.</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const Sidebar = ({ currentView, setCurrentView, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState({ 'products': true, 'services': true });

  const toggleMenu = (menuId, hasSubItems) => {
      if (!hasSubItems) return;
      setExpandedMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));
  };
    const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products-overview', name: 'Product Management', icon: Package }, // Flattened
    { id: 'services-overview', name: 'Service Management', icon: Briefcase }, // Flattened
    { id: 'service-rfqs', name: 'Service RFQs', icon: FileQuestion }, 
    { id: 'bidding', name: 'Bidding & Auctions', icon: Gavel },
    { id: 'orders', name: 'Orders (PO)', icon: ShoppingCart },
    { id: 'grn', name: 'GRN Management', icon: ClipboardCheck },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Help', icon: CircleHelp },
  ];

  return (
    <nav className="w-full bg-white flex flex-col h-full shadow-xl transition-all duration-300 border-r border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-xl shadow-lg shadow-red-600/20">
                <Package2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Abreco</span>
        </div>
        {onClose && <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>}
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Main Menu</div>
        {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus[item.id];
            // Check if current view belongs to this main item (e.g. products-new belongs to products-overview)
            const isActive = currentView === item.id || (item.id === 'products-overview' && currentView.startsWith('products-')) || (item.id === 'services-overview' && currentView.startsWith('services-'));

            return (
                <div key={item.id} className="mb-1">
                    <button 
                        onClick={() => { 
                            if(hasSubItems) toggleMenu(item.id, true);
                            else { setCurrentView(item.id); if (onClose) onClose(); }
                        }} 
                        className={`flex w-full items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group relative overflow-hidden select-none
                        ${isActive && !hasSubItems
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20 translate-x-1' 
                            : 'text-slate-900 hover:bg-slate-50 hover:text-black hover:translate-x-1'}`}
                    >
                        <item.icon className={`w-5 h-5 me-3 transition-colors ${isActive && !hasSubItems ? 'text-white' : 'text-slate-800 group-hover:text-red-600'}`} />
                        <span className="relative z-10 flex-1 text-left">{item.name}</span>
                        {hasSubItems && (
                            <ChevronDown className={`w-4 h-4 opacity-70 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                        {!hasSubItems && isActive && <ChevronRight className="w-4 h-4 ms-auto opacity-70" />}
                    </button>

                    {/* Sub Menu Items */}
                    {hasSubItems && isExpanded && (
                        <div className="mt-1 space-y-1 pl-4 pr-1">
                            {item.subItems.map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={() => { setCurrentView(subItem.id); if (onClose) onClose(); }}
                                    className={`flex w-full items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-150
                                    ${currentView === subItem.id 
                                        ? 'bg-red-50 text-red-700' 
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                >
                                    <span>{subItem.name}</span>
                                    {subItem.count !== undefined && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${currentView === subItem.id ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {subItem.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs text-slate-500 text-center">© 2025 Abreco Inc.<br/>Vendor Portal v2.0</p>
          </div>
      </div>
    </nav>
  );
};

const Header = ({ onMenuClick, onLogout, currentView }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Purchase Order', message: 'PO #9995 received from Abreco.', time: '2 mins ago', type: 'order', unread: true },
    { id: 2, title: 'Product Approved', message: 'Premium Jasmine Rice is now live.', time: '1 hour ago', type: 'success', unread: true },
    { id: 3, title: 'Document Expiring', message: 'Trade License expires in 5 days.', time: '1 day ago', type: 'warning', unread: false },
    { id: 4, title: 'Payment Processed', message: 'Payment for INV-2025-001 initiated.', time: '2 days ago', type: 'info', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({...n, unread: false})));
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-slate-100 relative z-20">
      {/* Left side ... */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"><Menu className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold text-slate-900 capitalize font-black tracking-tight">
            {currentView === 'service-rfqs' ? 'Service RFQ Hub' : currentView === 'grn' ? 'Goods Receipt Note (GRN)' : currentView === 'bidding' ? 'Bidding & Auctions' : currentView.startsWith('products-') ? 'Catalog Hub' : currentView.startsWith('services-') ? 'Service Portfolio' : currentView.replace('-', ' ')}
        </h1>
      </div>

      {/* Right side ... */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
            <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className={`p-2 rounded-lg transition-colors relative group ${showNotifs ? 'bg-red-50 text-red-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
                <Bell className={`w-5 h-5 ${showNotifs ? 'fill-current' : ''}`} />
                {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white animate-pulse"></span>}
            </button>

            {/* Dropdown - Mobile: Fixed Center / Desktop: Absolute Right */}
            {showNotifs && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)}></div>
                    <div className="fixed top-20 left-4 right-4 sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-3 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllRead} className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline">
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors ${notif.unread ? 'bg-red-50/30' : ''}`}>
                                            <div className={`mt-1 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                                                notif.type === 'order' ? 'bg-blue-100 text-blue-600' :
                                                notif.type === 'success' ? 'bg-green-100 text-green-600' :
                                                notif.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {notif.type === 'order' ? <ShoppingCart className="w-4 h-4"/> :
                                                 notif.type === 'success' ? <CheckCircle className="w-4 h-4"/> :
                                                 notif.type === 'warning' ? <AlertTriangle className="w-4 h-4"/> : <Info className="w-4 h-4"/>}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className={`text-sm font-semibold ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</p>
                                                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                                            </div>
                                            {notif.unread && <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500 text-sm">No notifications</div>
                            )}
                        </div>
                        <div className="p-3 border-t border-slate-50 bg-slate-50/50 text-center">
                            <button className="text-xs font-bold text-slate-600 hover:text-slate-900">View All Activity</button>
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100" onClick={onLogout}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200"><User className="w-5 h-5 text-slate-500" /></div>
            <span className="text-sm font-black text-slate-700 hidden sm:block">Logout</span>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const [userState, setUserState] = useState('loggedOut');
  const [currentView, setCurrentView] = useState('dashboard');
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('en'); 
  
  const [docStatus, setDocStatus] = useState({ tradeLicense: 'missing', kyc: 'missing' });
  const [paymentTerm, setPaymentTerm] = useState('default');

  // NEW: Lifted State for GRNs
  const [grnList, setGrnList] = useState([
    {
        id: 'GRN-001', grnNumber: 'GRN-2025-882', grnDate: '2025-12-18', poNumber: 'PO-9982', invoiceNumber: 'INV-2025-998',
        warehouse: 'S3 - Central', totalReceivedQty: 100, shortageQty: 0, damageQty: 0, status: 'Completed',
        supplierName: 'Royal Harvest Foods LLC', supplierCode: 'VEN-001', receivedBy: 'John Doe (Logistics)', remarks: 'Received in good condition.',
        items: [
            { itemCode: 'ITM-101', barcode: '890123456789', productName: 'Basmati Rice Premium 10kg', unit: 'Bag', orderedQty: 100, receivedQty: 100, shortageQty: 0, damageQty: 0, acceptedQty: 100 }
        ]
    },
    {
        id: 'GRN-002', grnNumber: 'GRN-2025-889', grnDate: '2025-12-19', poNumber: 'PO-9985', invoiceNumber: null,
        warehouse: 'S5 - Cold Chain', totalReceivedQty: 200, shortageQty: 0, damageQty: 0, status: 'Pending',
        supplierName: 'Royal Harvest Foods LLC', supplierCode: 'VEN-001', receivedBy: 'Jane Smith (Warehouse)', remarks: 'Awaiting Invoice submission.',
        items: [
            { itemCode: 'ITM-303', barcode: '890987654321', productName: 'Frozen Chicken Breasts 2kg', unit: 'Ctn', orderedQty: 200, receivedQty: 200, shortageQty: 0, damageQty: 0, acceptedQty: 200 }
        ]
    },
    {
        id: 'GRN-003', grnNumber: 'GRN-2025-895', grnDate: '2025-12-20', poNumber: 'PO-9990', invoiceNumber: 'INV-2025-1002',
        warehouse: 'S3 - Central', totalReceivedQty: 70, shortageQty: 5, damageQty: 2, status: 'Completed',
        supplierName: 'Royal Harvest Foods LLC', supplierCode: 'VEN-001', receivedBy: 'Mike Ross (Inbound)', remarks: 'Damaged items segregated.',
        items: [
            { itemCode: 'ITM-404', barcode: '890112233445', productName: 'Wheat Flour 5kg', unit: 'Bag', orderedQty: 70, receivedQty: 70, shortageQty: 5, damageQty: 2, acceptedQty: 63 }
        ]
    }
  ]);

  // Lifted State for Products (Combined Product & Service Data)
  const [products, setProducts] = useState([
    { 
        id: 101, name: 'Premium Jasmine Rice 5kg', brand: 'Royal Harvest', sku: 'RH-JAS-5KG', status: 'Approved', price: 45.00, date: '2025-10-15',
        image: 'https://placehold.co/40x40/f1f5f9/475569?text=Rice', category: 'Rice & Grains', subcategory: 'Jasmine Rice', header: 'Grocery', units: 1
    },
    { 
        id: 102, name: 'Organic Coconut Oil 500ml', brand: 'NaturePure', sku: 'NP-COC-500', status: 'Pending', price: 22.50, date: '2025-10-28',
        image: 'https://placehold.co/40x40/f1f5f9/475569?text=Oil', category: 'Cooking Oils & Ghee', subcategory: 'Coconut Oil', header: 'Grocery', units: 2
    },
    { 
        id: 103, name: 'Spicy Mango Pickle', brand: 'Grandma Recipes', sku: 'GR-PKL-MNGO', status: 'Pending', price: 12.00, date: '2025-10-29',
        image: 'https://placehold.co/40x40/f1f5f9/475569?text=Pickle', category: 'Canned & Preserved', subcategory: 'Pickles', header: 'Grocery', units: 1
    },
    { 
        id: 104, name: 'Whole Wheat Flour 10kg', brand: 'Daily Bread', sku: 'DB-WHT-10KG', status: 'Approved', price: 38.00, date: '2025-09-10',
        image: 'https://placehold.co/40x40/f1f5f9/475569?text=Flour', category: 'Rice, Pasta & Pulses', subcategory: 'Wheat Flour', header: 'Grocery', units: 1
    },
    { 
        id: 105, name: 'Frozen Chicken Nuggets', brand: 'QuickBite', sku: 'QB-NUG-1KG', status: 'Rejected', price: 28.00, date: '2025-10-01', reason: 'Packaging Issue - Incorrect Labeling',
        image: 'https://placehold.co/40x40/f1f5f9/475569?text=Nuggets', category: 'Frozen Foods', subcategory: 'Frozen Poultry', header: 'Frozen', units: 3
    },
    // --- MOCK SERVICE DATA ---
    {
        id: 301, name: 'Office HVAC Maintenance', brand: 'SVC-HVAC-01', sku: 'SVC-1001', status: 'Approved', price: 5000, date: '2025-11-01',
        contractEnd: '2026-01-05', // Expiring soon relative to Dec 18, 2025
        image: 'https://placehold.co/40x40/e0e7ff/4338ca?text=HVAC', category: 'Maintenance', subcategory: 'HVAC', header: 'Service', units: 'Yearly'
    },
    {
        id: 302, name: 'IT Support Contract (L1)', brand: 'SVC-IT-01', sku: 'SVC-1002', status: 'Pending', price: 250, date: '2025-12-01',
        image: 'https://placehold.co/40x40/e0e7ff/4338ca?text=IT', category: 'Software', subcategory: 'Support', header: 'Service', units: 'Hourly'
    },
    {
        id: 303, name: 'Deep Cleaning - Warehouse A', brand: 'SVC-CLN-05', sku: 'SVC-1003', status: 'Draft', price: 1200, date: '2025-12-15',
        image: 'https://placehold.co/40x40/e0e7ff/4338ca?text=Clean', category: 'Cleaning', subcategory: 'Deep Cleaning', header: 'Service', units: 'One-Time'
    },
    {
        id: 304, name: 'Security Patrol - Night Shift', brand: 'SVC-SEC-09', sku: 'SVC-1004', status: 'Approved', price: 8000, date: '2025-11-05', 
        contractEnd: '2026-01-12', // Expiring soon relative to Dec 18, 2025
        image: 'https://placehold.co/40x40/e0e7ff/4338ca?text=Sec', category: 'Security', subcategory: 'Patrol', header: 'Service', units: 'Monthly'
    }
  ]);

  // Lifted State for Update Requests
  const [updateRequests, setUpdateRequests] = useState([
    {
        id: 201, productName: 'Premium Jasmine Rice 5kg', sku: 'RH-JAS-5KG', 
        changeType: 'Price Change', currentValue: '45.00', requestedValue: '48.50', unit: 'AED',
        status: 'Pending', date: '2025-10-30', image: 'https://placehold.co/40x40/f1f5f9/475569?text=Rice'
    },
    {
        id: 202, productName: 'Whole Wheat Flour 10kg', sku: 'DB-WHT-10KG', 
        changeType: 'MOQ Update', currentValue: '10', requestedValue: '5', unit: 'Units',
        status: 'Approved', date: '2025-10-28', image: 'https://placehold.co/40x40/f1f5f9/475569?text=Flour'
    },
    {
        id: 203, productName: 'Instant Coffee 200g', sku: 'MB-COF-200', 
        changeType: 'Attribute Change', currentValue: 'Shelf Life: 12M', requestedValue: 'Shelf Life: 18M', unit: '',
        status: 'Rejected', date: '2025-10-25', image: 'https://placehold.co/40x40/f1f5f9/475569?text=Coffee', reason: 'Requires proof of validation'
    }
  ]);

  // NEW: Lifted State for Service RFQs (Separate from Products/POs)
  const [serviceRFQs, setServiceRFQs] = useState([
    {
        id: 'RFQ-1001', serviceName: 'Annual HVAC Maintenance - HQ', location: 'Dubai HQ', 
        requestDate: '2025-12-15', dueDate: '2025-12-20', status: 'New', 
        description: 'Complete inspection and servicing of 50 AC units including split and central systems.',
        requester: 'Facilities Dept', quoteDetails: null
    },
    {
        id: 'RFQ-1002', serviceName: 'Warehouse Deep Cleaning', location: 'Warehouse S3', 
        requestDate: '2025-12-10', dueDate: '2025-12-18', status: 'Quoted', 
        description: 'Deep cleaning of 5000 sqft warehouse floor space and racks.',
        requester: 'Operations Team', 
        quoteDetails: { price: '4500', timeline: '3', notes: 'Includes chemicals and labor', submittedDate: '2025-12-12' }
    },
    {
        id: 'RFQ-1003', serviceName: 'CCTV Camera Repair', location: 'Store 005', 
        requestDate: '2025-12-05', dueDate: '2025-12-10', status: 'Work Order', 
        description: 'Repair 3 faulty cameras in the main aisle.',
        requester: 'Security Dept', woDate: '2025-12-11',
        quoteDetails: { price: '1200', timeline: '1', notes: 'Spare parts included', submittedDate: '2025-12-06' }
    },
     {
        id: 'RFQ-1004', serviceName: 'Generator Maintenance', location: 'Jebel Ali Site', 
        requestDate: '2025-11-20', dueDate: '2025-11-25', status: 'Completed', 
        description: 'Routine maintenance for backup generator.',
        requester: 'Engineering Dept', woDate: '2025-11-22', completionDate: '2025-11-28',
        quoteDetails: { price: '2000', timeline: '2', notes: 'Done', submittedDate: '2025-11-21' }
    }
  ]);

  // NEW: Lifted State for Purchase Orders
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
        id: 1, poNo: 'PO-9982', date: '2025-12-10', vendorCode: 'VEN-001', warehouse: 'S3', paymentTerms: '30 Days',
        totalItems: 12, netAmount: 14500.50, deliveryDate: '2025-12-25', status: 'New',
        items: [
            { name: 'Basmati Rice Premium 10kg', sku: 'BR-101', qty: 100, unitPrice: 85.00 },
            { name: 'Sunflower Oil 5L', sku: 'SO-202', qty: 50, unitPrice: 120.00 }
        ]
    },
    {
        id: 2, poNo: 'PO-9985', date: '2025-12-12', vendorCode: 'VEN-001', warehouse: 'S5', paymentTerms: 'Immediate',
        totalItems: 5, netAmount: 8200.00, deliveryDate: '2025-12-20', status: 'Accepted',
        items: [
            { name: 'Frozen Chicken Breasts 2kg', sku: 'FC-303', qty: 200, unitPrice: 41.00 }
        ]
    },
    {
        id: 3, poNo: 'PO-9990', date: '2025-12-14', vendorCode: 'VEN-001', warehouse: 'S3', paymentTerms: '15 Days',
        totalItems: 8, netAmount: 2100.00, deliveryDate: '2025-12-22', status: 'New',
        items: [
            { name: 'Wheat Flour 5kg', sku: 'WF-404', qty: 70, unitPrice: 30.00 }
        ]
    },
    {
        id: 4, poNo: 'PO-9995', date: '2025-12-01', vendorCode: 'VEN-001', warehouse: 'S7', paymentTerms: '30 Days',
        totalItems: 2, netAmount: 500.00, deliveryDate: '2025-12-05', status: 'Delivered',
        items: [{ name: 'Test Product', sku: 'T-01', qty: 10, unitPrice: 50.00 }]
    }
  ]);
  
  const handleLogout = () => {
    setUserState('loggedOut');
    setCurrentView('dashboard');
    setNeedsPasswordChange(false);
    setLanguage('en'); 
    setDocStatus({ tradeLicense: 'missing', kyc: 'missing' });
    setPaymentTerm('default');
  };

  if (userState === 'loggedOut') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <LoginScreen 
          setUserState={setUserState}
          setCurrentView={setCurrentView}
          setNeedsPasswordChange={setNeedsPasswordChange}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    );
  }

  if (userState === 'pendingDocuments') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
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

  if (userState === 'pendingApproval') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <WaitingForApprovalScreen 
          setUserState={setUserState}
          setNeedsPasswordChange={setNeedsPasswordChange}
          docStatus={docStatus}
          paymentTerm={paymentTerm}
        />
      </div>
    );
  }

  if (userState === 'approved') {
    const MainContent = () => {
        if (currentView.startsWith('products-') || currentView.startsWith('services-')) {
            return (
                <ProductManagementPage 
                    currentView={currentView} 
                    setCurrentView={setCurrentView} 
                    products={products} 
                    setProducts={setProducts}
                    updateRequests={updateRequests}
                    setUpdateRequests={setUpdateRequests}
                />
            );
        }

        switch (currentView) {
            case 'orders': return <OrderManagementPage purchaseOrders={purchaseOrders} setPurchaseOrders={setPurchaseOrders} />;
            case 'service-rfqs': return <ServiceRFQManagementPage serviceRFQs={serviceRFQs} setServiceRFQs={setServiceRFQs} />;
            case 'grn': return <GRNManagementPage grnList={grnList} />;
            case 'bidding': return <BiddingManagementPage />;
            case 'payments': return <PaymentsPage />;
            case 'reports': return <ReportsPage purchaseOrders={purchaseOrders} grnList={grnList} serviceRFQs={serviceRFQs} products={products} />;
            case 'help': return <HelpPage />;
            case 'settings': return <SettingsPage />;
            case 'dashboard':
            default: return <DashboardView setCurrentView={setCurrentView} />;
        }
    };
    
    return (
      <div className="flex h-screen w-full bg-slate-100 font-sans antialiased text-slate-600 text-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="hidden lg:flex w-64 flex-shrink-0">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        </div>
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
        <div className={`fixed top-0 start-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}`}>
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => setIsSidebarOpen(true)} onLogout={handleLogout} currentView={currentView} />
          <div className="flex-grow p-4 sm:p-6">
            <MainContent />
          </div>
        </main>
        {needsPasswordChange && <ForcePasswordChangeModal setNeedsPasswordChange={setNeedsPasswordChange} />}
      </div>
    );
  }
  return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
}