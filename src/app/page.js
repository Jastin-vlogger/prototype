"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  // General Icons
  LayoutDashboard, Package, ShoppingCart, CreditCard,
  Settings, CircleHelp, Search, Bell, ChevronRight,
  ChevronDown, Menu, X, MoreHorizontal, User, Lock, Mail, Building,
  UploadCloud, FileText, Clock, CheckCircle, XCircle, Loader, ShieldCheck,
  Package2, // Main Logo
  Calendar, // For Expiry Date
  Barcode, // For SKU
  Image as ImageIcon, // For Product Image
  Globe, // For Origin
  Languages, // For Language Selector
  FileSpreadsheet, // For Excel Import
  ClipboardList, // For SOA
  Gavel, // For Bidding
  Info, // For Info Tooltip
  Plus, // For Add
  Ruler, // For Units of Measure
  Warehouse, // For Stock
  LogOut, // <-- Added LogOut icon
  
  // Stat Icons
  MoveUpRight, MoveDownRight, PackageOpen, Boxes, DollarSign,
  
} from 'lucide-react';


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- REUSABLE HELPER & UI COMPONENTS (New Abreco Theme v2)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// Define logo colors
// Red: approx #e51a4c (using tailwind red-600)
// Blue: approx #0067b1 (using tailwind blue-700)
// Gray: approx #5a5a5a (using tailwind slate-600)

/**
 * A reusable modal component for popups.
 */
const Modal = ({ children, title, onClose, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${sizeClasses[size] || 'max-w-md'} rounded-2xl shadow-xl flex flex-col`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
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
 * Reusable input field for forms.
 */
const FormInput = ({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-slate-300 rounded-lg shadow-sm transition-colors duration-150
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100 disabled:text-slate-500`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

/**
 * Reusable Select dropdown for forms.
 */
const FormSelect = ({ id, label, icon: Icon, value, onChange, children, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 border border-slate-300 rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100`}
      >
        {children}
      </select>
    </div>
  </div>
);

/**
 * Reusable Toggle Switch
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
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
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
 * Reusable button for primary actions.
 */
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

/**
 * Reusable Stat Card from the original dashboard.
 * NOW WITH 'highlight' PROP
 */
const StatCard = ({ title, value, change, changeType, icon, details, highlight = false }) => {
  const IconComponent = icon;
  const ChangeIcon = changeType === 'positive' ? MoveUpRight : MoveDownRight;
  
  // Default white card styles
  let cardClasses = 'bg-white'; // Removed shadow/border, will be on parent Card
  let titleClasses = 'text-slate-500';
  let valueClasses = 'text-slate-900';
  let detailsClasses = 'text-slate-400';
  let iconBgClasses = 'bg-slate-100';
  let iconColorClasses = 'text-slate-700';
  let changeClasses = changeType === 'positive' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50';

  // Highlighted logo gradient card styles
  if (highlight) {
    cardClasses = 'bg-gradient-to-br from-red-600 to-blue-700 text-white';
    titleClasses = 'text-red-100';
    valueClasses = 'text-white';
    detailsClasses = 'text-red-200';
    iconBgClasses = 'bg-white/20'; // Translucent white
    iconColorClasses = 'text-white';
    changeClasses = changeType === 'positive' ? 'bg-white/20 text-white' : 'bg-white/20 text-white';
  }

  return (
    <div className={`p-5 rounded-2xl flex flex-col justify-between ${cardClasses}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-lg ${iconBgClasses}`}>
          <IconComponent className={`w-6 h-6 ${iconColorClasses}`} />
        </div>
        <div className={`flex items-center text-sm font-medium p-2 rounded-full ${changeClasses}`}>
          <ChangeIcon className="w-4 h-4 mr-1" />
          {change}%
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
 * Reusable Card component for layout
 */
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

const CardFooter = ({ children }) => (
  <div className="p-5 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
    {children}
  </div>
);


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- ONBOARDING & AUTH FLOW COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * 1. LOGIN / SIGNUP / OTP
 * A screen to handle all initial auth, with simulation buttons.
 */
const LoginScreen = ({ setUserState, setCurrentView, setNeedsPasswordChange }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'otp'
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState('vendor'); // 'vendor' or 'customer'

  const handleLogin = (userType) => {
    if (userType === 'new') {
      setUserState('approved');
      setNeedsPasswordChange(true); // Trigger password change modal
    } else if (userType === 'existing') {
      setUserState('approved');
      setNeedsPasswordChange(false);
    } else if (userType === 'pendingDocs') {
      setUserState('pendingDocuments');
    } else if (userType === 'pendingApproval') {
      setUserState('pendingApproval');
    }
    setCurrentView('dashboard'); // Always go to dashboard, App component will route
  };

  const handleSignup = () => setView('otp');
  const handleOtp = () => {
    setUserState('pendingDocuments'); // New user, needs to upload docs
    setCurrentView('dashboard');
  };
  
  const renderView = () => {
    switch (view) {
      case 'signup':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-slate-900">Create Vendor Account</h2>
            
            <FormSelect
              id="userType"
              label="I am a..."
              icon={User}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            
            <FormInput id="company" label="Company Name" type="text" icon={Building} placeholder="Abreco Inc." />
            <FormInput id="email" label="Email Address" type="email" icon={Mail} placeholder="you@company.com" />
            <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
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
            <FormInput id="otp" label="OTP Code" type="text" icon={ShieldCheck} placeholder="123456" />
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
            <h2 className="text-3xl font-bold text-center text-slate-900">Vendor Portal Login</h2>
            
            <FormSelect
              id="userType"
              label="I am a..."
              icon={User}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            
            <FormInput id="username" label="Username or Email" type="text" icon={User} placeholder="vendor@company.com" />
            <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            
            <FormSelect
              id="language"
              label="Preferred Language"
              icon={Languages}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </FormSelect>
            
            <PrimaryButton onClick={() => handleLogin('existing')}>Log In</PrimaryButton>
            <p className="text-center text-sm">
              New vendor?{' '}
              <button onClick={() => setView('signup')} className="font-medium text-red-600 hover:text-red-500">
                Register here
              </button>
            </p>
            
            {/* --- SIMULATION CONTROLS --- */}
            <div className="my-6 border-t border-slate-200 pt-4">
              <p className="text-center text-xs font-semibold text-slate-500 uppercase">For Demo: Simulate Login As...</p>
              <div className="flex flex-col space-y-2 mt-3">
                <button onClick={() => handleLogin('existing')} className="w-full text-sm py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  Approved Vendor
                </button>
                <button onClick={() => handleLogin('new')} className="w-full text-sm py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  New Vendor (1st Login)
                </button>
                <button onClick={() => handleLogin('pendingApproval')} className="w-full text-sm py-2 px-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                  Vendor (Docs in Review)
                </button>
                <button onClick={() => handleLogin('pendingDocs')} className="w-full text-sm py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  Vendor (Needs to Upload Docs)
                </button>
              </div>
            </div>
            {/* --- END SIMULATION --- */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex font-inter">
      {/* --- Left Branding Panel --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-blue-600 items-center justify-center p-12 text-white relative">
        <div className="flex flex-col items-center text-center">
          <Package2 className="w-24 h-24 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Abreco Vendor Portal</h1>
          <p className="text-lg text-red-100">Manage your products, orders, and payments all in one place.</p>
        </div>
        <div className="absolute bottom-8 text-sm text-red-200">
          © 2025 Abreco. All rights reserved.
        </div>
      </div>
      
      {/* --- Right Form Panel --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
          <div className="flex justify-center mb-8 lg:hidden">
            <Package2 className="w-16 h-16 text-red-600" />
          </div>
          {renderView()}
        </div>
      </div>
    </div>
  );
};


/**
 * 2. UPLOAD DOCUMENTS SCREEN
 * Shown when userState is 'pendingDocuments'.
 */
const UploadDocumentsScreen = ({ 
  docStatus, 
  setDocStatus, 
  paymentTerm, 
  setPaymentTerm, 
  setUserState 
}) => {
  const [expiryDate, setExpiryDate] = useState('');

  const handleUpload = (docType) => {
    setDocStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
  };

  const allDocsUploaded = Object.values(docStatus).every(s => s === 'uploaded');
  const paymentTermSelected = paymentTerm && paymentTerm !== 'default';

  // Check for expiry date notification
  const isExpired = useMemo(() => {
    if (!expiryDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    return expiry <= today;
  }, [expiryDate]);
  
  const isExpiringSoon = useMemo(() => {
    if (!expiryDate || isExpired) return false;
    const today = new Date();
    const soon = new Date();
    soon.setDate(today.getDate() + 30); // 30 day warning
    const expiry = new Date(expiryDate);
    return expiry > today && expiry <= soon;
  }, [expiryDate]);

  const DocumentCard = ({ title, docKey, status }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        {status === 'missing' && <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Missing</span>}
        {status === 'uploaded' && <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Uploaded</span>}
      </div>
      <p className="text-sm text-slate-500 mt-2">Upload your business trade license or equivalent KYC document.</p>
      <button 
        onClick={() => handleUpload(docKey)}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <UploadCloud className="w-5 h-5" />
        {status === 'missing' ? 'Upload Document' : 'Re-upload'}
      </button>
    </div>
  );
  
  return (
    <div className="min-h-screen w-full bg-slate-100 p-4 md:p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
            <Package2 className="w-12 h-12 text-red-600" />
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, Vendor!</h1>
          <p className="text-lg text-slate-600 mt-2">To activate your account, please upload the required documents and select your payment terms.</p>
        </div>
        
        {/* Expiry Date Notification */}
        {isExpired && (
          <div className="my-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg flex items-center gap-3">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Your Trade License has expired! Please upload a new one.</p>
          </div>
        )}
        {isExpiringSoon && (
          <div className="my-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg flex items-center gap-3">
            <Clock className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Your Trade License is expiring in 30 days. Please remember to renew and upload it.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DocumentCard title="Trade License" docKey="tradeLicense" status={docStatus.tradeLicense} />
          <DocumentCard title="KYC Documents" docKey="kyc" status={docStatus.kyc} />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <label htmlFor="expiry" className="block text-lg font-semibold text-slate-800 mb-2">
            Trade License Expiry Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="date"
              id="expiry"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <FormSelect
            id="paymentTerm"
            label="Payment Terms"
            icon={CreditCard}
            value={paymentTerm}
            onChange={(e) => setPaymentTerm(e.target.value)}
          >
            <option value="default">Select a payment term...</option>
            <option value="Weekly">Weekly</option>
            <option value="30 Days">30 Days</option>
            <option value="60 Days">60 Days</option>
          </FormSelect>
          <p className="text-xs text-slate-500 mt-2">This is the term you agree to for invoice payments. Admin will review this selection.</p>
        </div>

        <div className="mt-8">
          <PrimaryButton 
            onClick={() => setUserState('pendingApproval')}
            disabled={!allDocsUploaded || !expiryDate || !paymentTermSelected}
            className={(!allDocsUploaded || !expiryDate || !paymentTermSelected) ? 'bg-gray-400 cursor-not-allowed' : ''}
          >
            Submit for Review
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. WAITING FOR APPROVAL SCREEN
 * Shown when userState is 'pendingApproval'.
 */
const WaitingForApprovalScreen = ({ setUserState, setNeedsPasswordChange, docStatus, paymentTerm }) => (
  <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-inter">
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
      <div className="flex justify-center mb-6">
        <Loader className="w-16 h-16 text-red-600 animate-spin" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 text-center">Application Submitted!</h1>
      <p className="text-lg text-slate-600 mt-3 text-center">Your documents are now under review by the Abreco team.</p>
      
      <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-lg text-slate-800 mb-4">Your Submitted Information:</h4>
        <ul className="space-y-3">
          {Object.entries(docStatus).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 capitalize">
                {key === 'tradeLicense' ? 'Trade License' : 'KYC Documents'}
              </span>
              {value === 'uploaded' ? (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                  <CheckCircle className="w-5 h-5" /> Uploaded
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <XCircle className="w-5 h-5" /> Missing
                </span>
              )}
            </li>
          ))}
          <li className="flex items-center justify-between border-t border-slate-200 pt-3 mt-3">
            <span className="text-sm font-medium text-slate-700">Payment Term</span>
            <span className="text-sm font-semibold text-red-600">{paymentTerm}</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <h4 className="font-semibold text-slate-800">Current Status:</h4>
        <p className="text-base text-yellow-600 font-medium">Pending 2-Level Approval (Buyer & Admin)</p>
      </div>
      
      {/* --- SIMULATION CONTROL --- */}
      <div className="mt-8 border-t border-slate-200 pt-6">
         <p className="text-center text-xs font-semibold text-slate-500 uppercase mb-3">For Demo:</p>
        <PrimaryButton onClick={() => {
          setUserState('approved');
          setNeedsPasswordChange(true); // First login after approval
        }}>
          Simulate Admin Approval
        </PrimaryButton>
      </div>
      {/* --- END SIMULATION --- */}
    </div>
  </div>
);

/**
 * 4. FORCE PASSWORD CHANGE MODAL
 * Shown when userState is 'approved' AND needsPasswordChange is true.
 */
const ForcePasswordChangeModal = ({ setNeedsPasswordChange }) => (
  <Modal title="Create New Password" onClose={() => {}}> {/* No close button */}
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Welcome! As a security measure, you must create a new password before accessing the portal.
      </p>
      <FormInput id="newPass" label="New Password" type="password" icon={Lock} placeholder="••••••••" />
      <FormInput id="confirmPass" label="Confirm New Password" type="password" icon={Lock} placeholder="••••••••" />
      <PrimaryButton onClick={() => setNeedsPasswordChange(false)}>
        Set New Password
      </PrimaryButton>
    </div>
  </Modal>
);


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- FULL PORTAL PAGE COMPONENTS (After Approval)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * 5A. DASHBOARD VIEW
 */
const DashboardView = () => {
  // --- Donut Chart ---
  const DonutChart = () => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const salesPercent = 51;
    const salesOffset = circumference - (salesPercent / 100) * circumference;
    const goodsOffset = 0;

    return (
      <div className="relative flex flex-col items-center justify-center">
        <svg className="w-36 h-36 sm:w-48 sm:h-48" viewBox="0 0 120 120">
          <circle className="text-blue-100" strokeWidth="15" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
          <circle className="text-red-500" strokeWidth="15" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" strokeDasharray={circumference} strokeDashoffset={salesOffset} transform="rotate(-90 60 60)" />
          <circle className="text-blue-700" strokeWidth="15" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" strokeDasharray={circumference} strokeDashoffset={goodsOffset} transform="rotate(93 60 60)" />
        </svg>
        <div className="mt-4 w-full space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center"><span className="w-3 h-3 bg-blue-700 rounded-full mr-2"></span><span className="text-sm text-slate-500">Products Sales</span></div>
            <div className="text-right"><p className="text-sm font-semibold text-slate-900">AED 5,700</p><p className="text-xs text-green-500">+51%</p></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span><span className="text-sm text-slate-500">Home Goods</span></div>
            <p className="text-sm font-semibold text-slate-900">AED 2,500</p>
          </div>
        </div>
      </div>
    );
  };

  // --- Bar Chart ---
  const SalesBarChart = () => {
    const salesData = [
      { month: 'Jan', sales: 75, product: 60 }, { month: 'Feb', sales: 40, product: 20 }, { month: 'Mar', sales: 65, product: 50 },
      { month: 'Apr', sales: 30, product: 15 }, { month: 'May', sales: 80, product: 90 }, { month: 'Jun', sales: 25, product: 10 }, { month: 'Jul', sales: 60, product: 45 },
    ];
    return (
      <Card noPadding={true}>
        <CardHeader title="Sales by Month">
          <button className="flex items-center text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors">
            This year <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center"><span className="w-3 h-3 bg-blue-200 rounded-full mr-2"></span><span className="text-sm text-slate-500">Seen product</span></div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span><span className="text-sm text-slate-500">Sales</span></div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-1 sm:space-x-2">
            {salesData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center relative h-full">
                {data.month === 'May' && (
                  <div className="absolute -top-20 w-36 bg-slate-900 text-white text-xs rounded-lg p-2 shadow-lg z-10">
                    <div className="flex justify-between mb-1"><span className="flex items-center"><span className="w-2 h-2 bg-blue-200 rounded-full mr-1.5"></span>Products</span><span>AED 8,600</span></div>
                    <div className="flex justify-between"><span className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-1.5"></span>Products</span><span>AED 8,788</span></div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-900 -mb-1"></div>
                  </div>
                )}
                <div className="flex-1 flex items-end w-full gap-1">
                  <div className="flex-1 bg-blue-200 rounded-t-md" style={{ height: `${data.product}%` }}></div>
                  <div className="flex-1 bg-red-600 rounded-t-md" style={{ height: `${data.sales}%` }}></div>
                </div>
                <span className="text-xs text-slate-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // --- Recent Orders ---
  const RecentOrders = () => {
    const orders = [{ id: 1, name: 'Electronicy', percent: 19.8 }, { id: 2, name: 'Clothing', percent: 16.8 }, { id: 7, name: 'Home Goods', percent: 29.7 }];
    return (
      <Card noPadding={true}>
        <CardHeader title="Recent Orders">
           <button className="flex items-center text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors">Today <ChevronDown className="w-4 h-4 ml-1" /></button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">Product Cassucs</p>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between items-center">
                <div className="flex items-center"><span className="text-sm font-medium text-slate-400 mr-3">{order.id}</span><span className="text-sm font-medium text-slate-700">{order.name}</span></div>
                <span className="text-sm font-semibold text-green-500">{order.percent}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  // --- Main Dashboard Layout ---
  return (
    <div className="grid gap-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value="5,123" 
          change="+15.8%" 
          changeType="positive" 
          icon={ShoppingCart} 
          details="Orders vs last month"
          highlight={true} // <-- This makes it colorful
        />
        <Card className="shadow-lg"><StatCard 
          title="Pending Shipments" 
          value="345" 
          change="-9%" 
          changeType="negative" 
          icon={PackageOpen} 
          details="Orders vs last month" 
        /></Card>
        <Card className="shadow-lg"><StatCard 
          title="Available Stock" 
          value="68.50" 
          change="-8%" 
          changeType="negative" 
          icon={Boxes} 
          details="Orders vs last month" 
        /></Card>
        <Card className="shadow-lg"><StatCard 
          title="Total Revenue" 
          value="AED 45,789" 
          change="+12.6%" 
          changeType="positive" 
          icon={DollarSign} 
          details="Products month" 
        /></Card>
      </div>
      {/* Row 2: Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><SalesBarChart /></div>
        <div className="flex flex-col gap-6">
          <Card noPadding={true}>
            <CardHeader title="Product Categories">
              <button className="flex items-center text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors">Today <ChevronDown className="w-4 h-4 ml-1" /></button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-4">Track your customer locations</p>
              <DonutChart />
            </CardContent>
          </Card>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

/**
 * 5B. PRODUCT MANAGEMENT PAGE
 * New page to show product list, status, and add new products.
 */
const ProductManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'services'
  
  const [products, setProducts] = useState([
    { id: 1, type: 'product', name: 'KitchenMaster Blender', sku: 'KM-B-001', price: 170.00, status: 'Approved', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P1' },
    { id: 2, type: 'product', name: 'Organic Cotton Towels', sku: 'OCT-G-004', price: 80.00, status: 'Pending', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P2' },
    { id: 3, type: 'product', name: 'Smart LED Bulb', sku: 'SLB-W-002', price: 55.50, status: 'Rejected', reason: 'Image resolution too low.', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P3' },
    { id: 4, type: 'service', name: 'Extended Warranty', sku: 'EW-001', price: 100.00, status: 'Approved', image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=S1' },
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.type === (activeTab === 'products' ? 'product' : 'service'));
  }, [products, activeTab]);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Approved': return <span className="flex items-center gap-1.5 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" />{status}</span>;
      case 'Pending': return <span className="flex items-center gap-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />{status}</span>;
      case 'Rejected': return <span className="flex items-center gap-1.5 text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" />{status}</span>;
      default: return null;
    }
  };
  
  const TabButton = ({ label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-3 text-sm font-medium transition-colors
        ${activeTab === tabName 
          ? 'border-b-2 border-red-600 text-red-600' 
          : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <>
      {showAddModal && <AddProductModal 
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />}
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <PrimaryButton 
            onClick={() => {}} 
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700" 
            disabled // Disabled for demo
          >
            <FileSpreadsheet className="w-4 h-4" /> Import from Excel
          </PrimaryButton>
          <PrimaryButton onClick={() => setShowAddModal(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add New Entry
          </PrimaryButton>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <TabButton label="Products" tabName="products" />
          <TabButton label="Services" tabName="services" />
        </nav>
      </div>

      <Card noPadding={true}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Product / Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Selling Price (AED)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">AED {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={product.status} />
                    {product.status === 'Rejected' && <p className="text-xs text-red-600 mt-1">{product.reason}</p>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

/**
 * 5B-1. ADD PRODUCT MODAL (New, with cascading logic)
 */
const AddProductModal = ({ onClose, onAddProduct }) => {
  // Form State
  const [entryType, setEntryType] = useState('Product');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [selectedHeader, setSelectedHeader] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('');
  const [selectedMerchCat, setSelectedMerchCat] = useState('');
  const [unitConversions, setUnitConversions] = useState({ outer: '', carton: '' });
  const [stock, setStock] = useState({ single: '', outer: '', carton: '' });
  const [isTaxable, setIsTaxable] = useState(true);
  const [sellingPrice, setSellingPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [description, setDescription] = useState('');

  // --- New Hierarchical Data Structure ---
  const categorizationData = {
    Product: {
      Fresh: {
        Fish: {},
        Chicken: {},
        'Fruit & Veg': {}
      },
      Frozen: {
        Seafood: {},
        Poultry: {},
        Meat: {},
        'Fruit & Veg': {}
      },
      Chilled: {
        'Dairy products': {}
      },
      Ambient: {
        'Cooking ingredients': {},
        Pulses: {},
        Sauces: {},
        Ketchup: {},
        Beverages: {},
        Oil: {},
        'Canned items': {}
      }
    },
    Service: {
      'Kitchen Equipments and Utensils': {},
      Furniture: {},
      Signboards: {},
      'Repairs & Maintenance': {
        'AC maintenance': {},
        'Electrical & Plumbing': {},
        'Paintaining': {}
      },
      'Pest Control': {},
      'Food Safety & Quality Assurance': {
        'Trainings for food hygiene': {},
        'HACCP': {}
      }
    }
  };
  
  // --- Dummy Data for Independent Dropdown ---
  const merchandiseCategories = ['MCAT-01 (General)', 'MCAT-02 (Taxable)', 'MCAT-03 (Seasonal)', 'MCAT-04 (Services)'];
  
  // --- Memoized Options for Cascading ---
  const headerOptions = useMemo(() => {
    return categorizationData[entryType] ? Object.keys(categorizationData[entryType]) : [];
  }, [entryType]);

  const deptOptions = useMemo(() => {
    return selectedHeader && categorizationData[entryType]?.[selectedHeader]
      ? Object.keys(categorizationData[entryType][selectedHeader])
      : [];
  }, [entryType, selectedHeader]);

  const catOptions = useMemo(() => {
    return selectedHeader && selectedDept && categorizationData[entryType]?.[selectedHeader]?.[selectedDept]
      ? Object.keys(categorizationData[entryType][selectedHeader][selectedDept])
      : [];
  }, [entryType, selectedHeader, selectedDept]);

  const subcatOptions = useMemo(() => {
    // This will be empty based on the user's data, which is correct.
    return selectedHeader && selectedDept && selectedCat && categorizationData[entryType]?.[selectedHeader]?.[selectedDept]?.[selectedCat]
      ? Object.keys(categorizationData[entryType][selectedHeader][selectedDept][selectedCat])
      : [];
  }, [entryType, selectedHeader, selectedDept, selectedCat]);

  // --- Handlers for UoM and Stock ---
  const handleConversionChange = (e) => {
    const { name, value } = e.target;
    setUnitConversions(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStock(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // Simple unique ID
      type: entryType.toLowerCase(),
      name: productName,
      sku: sku,
      price: parseFloat(sellingPrice) || 0,
      status: 'Pending', // New products are pending approval
      image: `https://placehold.co/40x40/E2E8F0/4A5568?text=${productName.substring(0,2) || 'P'}`,
      //... add all other form fields here if needed
    };
    onAddProduct(newProduct);
    onClose();
  };

  return (
    <Modal title="Add New Entry" onClose={onClose} size="3xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormSelect 
          id="entryType" 
          label="Entry Type" 
          icon={Package}
          value={entryType}
          onChange={(e) => {
            setEntryType(e.target.value);
            setSelectedHeader('');
            setSelectedDept('');
            setSelectedCat('');
            setSelectedSubcat('');
          }}
        >
          <option value="Product">Product</option>
          <option value="Service">Service</option>
        </FormSelect>
        
        <FormInput id="name" label="Product Name" type="text" icon={Package} placeholder="e.g., Smart LED Bulb" value={productName} onChange={(e) => setProductName(e.target.value)} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput id="sku" label="SKU" type="text" icon={Barcode} placeholder="e.g., SLB-W-002" value={sku} onChange={(e) => setSku(e.target.value)} />
          <FormInput id="barcode" label="Barcode" type="text" icon={Barcode} placeholder="123456789012" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Categorization</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <FormSelect 
              id="header" 
              label="Primary Header"
              value={selectedHeader}
              onChange={(e) => {
                setSelectedHeader(e.target.value);
                setSelectedDept('');
                setSelectedCat('');
                setSelectedSubcat('');
              }}
              disabled={headerOptions.length === 0}
            >
              <option value="">Select Header...</option>
              {headerOptions.map(item => <option key={item} value={item}>{item}</option>)}
            </FormSelect>
            
            <FormSelect 
              id="dept" 
              label="Department"
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setSelectedCat('');
                setSelectedSubcat('');
              }}
              disabled={deptOptions.length === 0}
            >
              <option value="">Select Department...</option>
              {deptOptions.map(item => <option key={item} value={item}>{item}</option>)}
            </FormSelect>
            
            <FormSelect 
              id="cat" 
              label="Category"
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
                setSelectedSubcat('');
              }}
              disabled={catOptions.length === 0}
            >
              <option value="">Select Category...</option>
              {catOptions.map(item => <option key={item} value={item}>{item}</option>)}
            </FormSelect>
            
            <FormSelect 
              id="subcat" 
              label="Subcategory"
              value={selectedSubcat}
              onChange={(e) => setSelectedSubcat(e.target.value)}
              disabled={subcatOptions.length === 0}
            >
              <option value="">Select Subcategory...</option>
              {subcatOptions.map(item => <option key={item} value={item}>{item}</option>)}
            </FormSelect>
            
            <FormSelect id="merch" label="Merchandise Category" value={selectedMerchCat} onChange={(e) => setSelectedMerchCat(e.target.value)}>
              <option value="">Select Category...</option>
              {merchandiseCategories.map(item => <option key={item} value={item}>{item}</option>)}
            </FormSelect>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* UOM Section */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Units of Measure</h4>
            
            {/* Base Unit: Single */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <FormInput label="Base Unit" type="text" value="Single" disabled />
              </div>
              <div className="w-28">
                <FormInput label="Conversion" type="number" value="1" disabled />
              </div>
            </div>
            
            {/* Unit: Outer */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <FormInput label="Unit Name" type="text" value="Outer" disabled />
              </div>
              <div className="w-28">
                <FormInput
                  id="conv-outer"
                  name="outer"
                  label="Conversion"
                  type="number"
                  placeholder="e.g., 20"
                  value={unitConversions.outer}
                  onChange={handleConversionChange}
                />
              </div>
            </div>
            
            {/* Unit: Carton */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <FormInput label="Unit Name" type="text" value="Carton" disabled />
              </div>
              <div className="w-28">
                <FormInput
                  id="conv-carton"
                  name="carton"
                  label="Conversion"
                  type="number"
                  placeholder="e.g., 100"
                  value={unitConversions.carton}
                  onChange={handleConversionChange}
                />
              </div>
            </div>
          </div>
          
          {/* Initial Stock Section */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Initial Stock Quantity</h4>
            
            {/* Stock: Single */}
            <FormInput
              id="stock-single"
              name="single"
              label="Single (Base Unit)"
              type="number"
              placeholder="e.g., 50"
              icon={Warehouse}
              value={stock.single}
              onChange={handleStockChange}
            />
            
            {/* Stock: Outer */}
            <FormInput
              id="stock-outer"
              name="outer"
              label="Outer"
              type="number"
              placeholder="e.g., 10"
              icon={Warehouse}
              value={stock.outer}
              onChange={handleStockChange}
            />
            
            {/* Stock: Carton */}
            <FormInput
              id="stock-carton"
              name="carton"
              label="Carton"
              type="number"
              placeholder="e.g., 5"
              icon={Warehouse}
              value={stock.carton}
              onChange={handleStockChange}
            />
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-800">Flags</h4>
          <ToggleSwitch id="taxable" label="Taxable" enabled={isTaxable} setEnabled={setIsTaxable} />
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Pricing (AED)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput id="sellingPrice" label="Selling Price to Abreco" type="number" placeholder="55.50" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price Range (for Customers)</label>
              <div className="flex items-center gap-2">
                <FormInput id="minPrice" type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <span className="text-slate-500">-</span>
                <FormInput id="maxPrice" type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea id="description" rows="3" className="block w-full p-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="Product details..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Images</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
              <div className="flex text-sm text-slate-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <PrimaryButton type="submit">
            Submit for Approval
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

/**
 * 5C. ORDER MANAGEMENT PAGE (POs & GRNs)
 * New page to show Purchase Orders.
 */
const OrderManagementPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { 
      id: 'PO-10562', 
      date: '2025-10-28', 
      amount: 1250.00, 
      status: 'GRN Received',
      lineItems: [
        { id: 1, sku: 'KM-B-001', name: 'KitchenMaster Blender', qty: 5, price: 170.00 },
        { id: 2, sku: 'SLB-W-002', name: 'Smart LED Bulb', qty: 20, price: 20.00 },
      ],
      shipTo: 'Abreco Main Warehouse, Dubai, UAE',
      billTo: 'Abreco Accounts Dept, Dubai, UAE'
    },
    { 
      id: 'PO-10561', 
      date: '2025-10-25', 
      amount: 800.50, 
      status: 'Shipped',
      lineItems: [
        { id: 1, sku: 'OCT-G-004', name: 'Organic Cotton Towels', qty: 10, price: 80.05 },
      ],
      shipTo: 'Abreco Jebel Ali, Dubai, UAE',
      billTo: 'Abreco Accounts Dept, Dubai, UAE'
    },
    { 
      id: 'PO-10560', 
      date: '2025-10-22', 
      amount: 320.00, 
      status: 'Pending Pickup',
      lineItems: [
        { id: 1, sku: 'XYZ-001', name: 'Basic Widget', qty: 2, price: 160.00 },
      ],
      shipTo: 'Abreco Main Warehouse, Dubai, UAE',
      billTo: 'Abreco Accounts Dept, Dubai, UAE'
    },
  ];

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'GRN Received': return <span className="flex items-center gap-1.5 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" />{status}</span>;
      case 'Shipped': return <span className="flex items-center gap-1.5 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"><PackageOpen className="w-3 h-3" />{status}</span>;
      case 'Pending Pickup': return <span className="flex items-center gap-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />{status}</span>;
      default: return null;
    }
  };

  return (
    <>
      {selectedOrder && (
        <PODetailsModal 
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Order Management (POs)</h1>
      <Card noPadding={true}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">PO Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount (AED)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">AED {order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

/**
 * 5C-1. PO DETAILS MODAL (New Functional Component)
 * This modal opens when "View Details" is clicked.
 */
const PODetailsModal = ({ order, onClose }) => {
  return (
    <Modal title={`PO Details: ${order.id}`} onClose={onClose} size="2xl">
      <div className="space-y-6">
        {/* --- Summary --- */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="text-xs font-medium text-slate-500">PO Number</label>
            <p className="text-sm font-semibold text-slate-900">{order.id}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Date Issued</label>
            <p className="text-sm font-semibold text-slate-900">{order.date}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Status</label>
            <p className="text-sm font-semibold text-slate-900">{order.status}</p>
          </div>
        </div>
        
        {/* --- Line Items --- */}
        <div>
          <h4 className="text-lg font-semibold text-slate-900 mb-2">Line Items</h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">SKU</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
                  <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Qty</th>
                  <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Unit Price (AED)</th>
                  <th scope="col" className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Total (AED)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {order.lineItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-slate-500">{item.sku}</td>
                    <td className="px-4 py-2 text-sm font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-slate-500 text-right">{item.qty}</td>
                    <td className="px-4 py-2 text-sm text-slate-500 text-right">{item.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm font-semibold text-slate-900 text-right">{(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50">
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-right text-sm font-bold text-slate-900">GRAND TOTAL</td>
                  <td className="px-4 py-2 text-right text-sm font-bold text-slate-900">AED {order.amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* --- Addresses --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h5 className="text-sm font-semibold text-slate-900 mb-1">Ship To</h5>
            <p className="text-sm text-slate-600">{order.shipTo}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h5 className="text-sm font-semibold text-slate-900 mb-1">Bill To</h5>
            <p className="text-sm text-slate-600">{order.billTo}</p>
          </div>
        </div>
        
        {/* --- Footer Button --- */}
        <div className="pt-4 border-t border-slate-200">
          <PrimaryButton onClick={onClose} className="w-auto">
            Close
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

/**
 * 5D. PAYMENT PAGE
 */
const PaymentPage = () => {
  const payments = [
    { id: 'INV-732', po: 'PO-10560', amount: 320.00, status: 'Settled', date: '2025-10-28' },
    { id: 'INV-731', po: 'PO-10558', amount: 1400.00, status: 'Settled', date: '2025-10-21' },
    { id: 'INV-730', po: 'PO-10555', amount: 610.50, status: 'Pending', date: '2025-10-19' },
  ];
  
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Settled': return <span className="flex items-center gap-1.5 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" />{status}</span>;
      case 'Pending': return <span className="flex items-center gap-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />{status}</span>;
      default: return null;
    }
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Payments & Invoices</h1>
      <Card noPadding={true}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice #</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Related PO</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount (AED)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Settlement Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{p.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{p.po}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">AED {p.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{p.status === 'Settled' ? p.date : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/**
 * 5E. STATEMENT OF ACCOUNT (SOA) PAGE
 */
const StatementOfAccountPage = () => {
  const soaData = [
    { date: '2025-10-01', desc: 'Opening Balance', inv: '', debit: 0, credit: 0, balance: 1500.00 },
    { date: '2025-10-10', desc: 'Payment Received', inv: 'INV-729', debit: 0, credit: 610.50, balance: 889.50 },
    { date: '2025-10-15', desc: 'Invoice', inv: 'INV-730', debit: 610.50, credit: 0, balance: 1500.00 },
    { date: '2025-10-21', desc: 'Payment Received', inv: 'INV-731', debit: 0, credit: 1400.00, balance: 100.00 },
    { date: '2025-10-22', desc: 'Invoice', inv: 'INV-731', debit: 1400.00, credit: 0, balance: 1500.00 },
    { date: '2025-10-28', desc: 'Payment Received', inv: 'INV-732', debit: 0, credit: 320.00, balance: -220.00 },
  ];
  const finalBalance = -220.00; // Example
  
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Statement of Account</h1>
      <Card noPadding={true}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice #</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Debit (AED)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Credit (AED)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Balance (AED)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {soaData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.desc}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{row.inv}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{row.debit > 0 ? row.debit.toFixed(2) : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{row.credit > 0 ? row.credit.toFixed(2) : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 text-right">{row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50">
              <tr>
                <td colSpan="5" className="px-6 py-3 text-right text-sm font-bold text-slate-900 uppercase">Final Balance</td>
                <td className={`px-6 py-3 text-right text-sm font-bold ${finalBalance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                  {finalBalance.toFixed(2)} AED
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </>
  );
}

/**
 * 5F. BIDDING MODULE PAGE (v15 Update)
 */
const BiddingModulePage = () => {
  const [bids, setBids] = useState({
    'KM-B-001': { price: '', notes: '' },
    'OCT-G-004': { price: '', notes: '' }
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submittedBids, setSubmittedBids] = useState({}); // Tracks submitted SKUs and prices

  const products = [
    { id: 1, name: 'KitchenMaster Blender', sku: 'KM-B-001', highBid: 150.00, quantity: 100, image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P1' },
    { id: 2, name: 'Organic Cotton Towels', sku: 'OCT-G-004', highBid: 75.00, quantity: 500, image: 'https://placehold.co/40x40/E2E8F0/4A5568?text=P2' },
  ];

  const handleBidChange = (sku, field, value) => {
    setBids(prev => ({
      ...prev,
      [sku]: {
        ...prev[sku],
        [field]: value
      }
    }));
  };
  
  const getEstimatedTotal = (sku, quantity) => {
    const price = parseFloat(bids[sku].price);
    if (!price || isNaN(price)) {
      return 0;
    }
    return price * quantity;
  };
  
  const handleSubmitBid = (sku) => {
    // Find product name for success message
    const product = products.find(p => p.sku === sku);
    if (!product) return;

    const submittedPrice = parseFloat(bids[sku].price); // Get the price
    if (isNaN(submittedPrice) || submittedPrice <= 0) {
        alert("Please enter a valid, positive price."); // Using simple alert for demo
        return; 
    }

    // Set success message and show modal
    setSuccessMessage(`Your bid for "${product.name}" has been successfully submitted!`);
    setShowSuccess(true);
    
    // Add to submitted list, storing the PRICE
    setSubmittedBids(prev => ({
      ...prev,
      [sku]: submittedPrice
    }));
  };
  
  return (
    <>
      {showSuccess && (
        <Modal title="Bid Submitted!" onClose={() => setShowSuccess(false)} size="sm">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Success!</h3>
            <p className="text-sm text-slate-600 mb-6">{successMessage}</p>
            <PrimaryButton onClick={() => setShowSuccess(false)} className="w-auto">
              Close
            </PrimaryButton>
          </div>
        </Modal>
      )}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Bidding Module</h1>
        {/* Global Submit Button Removed */}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 flex items-center gap-3">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">These are high-demand products assigned by admin. Place your best purchasing price (your selling price to Abreco) to win the PO. Admin will see the lowest price.</p>
      </div>
      
      <div className="space-y-6">
        {products.map((product) => {
          const submittedPrice = submittedBids[product.sku]; // e.g., 145.00 or undefined
          const isSubmitted = typeof submittedPrice === 'number';
          const hasPrice = !!bids[product.sku].price;
          
          let bidStatus = null; // null, 'best', 'good', 'high'
          if (isSubmitted) {
            const currentLowest = product.highBid; // This is the hidden benchmark
            const myBid = submittedPrice;
            
            if (myBid <= currentLowest) {
              bidStatus = 'best'; // Green
            } else if (myBid <= currentLowest * 1.1) { // Within 10%
              bidStatus = 'good'; // Orange
            } else {
              bidStatus = 'high'; // Red
            }
          }

          // --- NEW LOGIC for card color ---
          let cardStyleClass = '';
          if (isSubmitted) {
            switch (bidStatus) {
              case 'best':
                cardStyleClass = 'bg-green-50 border-2 border-green-400'; // Light green bg
                break;
              case 'good':
                cardStyleClass = 'bg-orange-50 border-2 border-orange-400'; // Light orange bg
                break;
              case 'high':
                cardStyleClass = 'bg-red-50 border-2 border-red-400'; // Light red bg
                break;
              default:
                cardStyleClass = ''; // Default
            }
          }
          // --- END NEW LOGIC ---

          return (
            <Card 
              key={product.id} 
              noPadding={true}
              className={cardStyleClass} // <-- Apply the dynamic class here
            >
              <div className="flex flex-col lg:flex-row">
                {/* --- Product Info --- */}
                <div className="w-full lg:w-1/3 p-5">
                  <div className="flex items-center">
                    <img className="h-16 w-16 rounded-lg object-cover" src={product.image} alt={product.name} />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Wanted Quantity:</span>
                      <span className="text-sm font-medium text-slate-900">{product.quantity} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Your Bid Status:</span>
                      {isSubmitted ? (
                        <>
                          {bidStatus === 'best' && (
                            <span className="text-sm font-semibold text-white bg-green-500 px-3 py-1 rounded-full">Lowest Bid</span>
                          )}
                          {bidStatus === 'good' && (
                            <span className="text-sm font-semibold text-white bg-orange-500 px-3 py-1 rounded-full">Good Bid</span>
                          )}
                          {bidStatus === 'high' && (
                            <span className="text-sm font-semibold text-white bg-red-600 px-3 py-1 rounded-full">High Bid</span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm font-medium text-slate-400 italic">Not yet submitted</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* --- Bidding Area --- */}
                <div className="w-full lg:w-2/3 bg-slate-50 p-5 rounded-b-2xl lg:rounded-l-none lg:rounded-r-2xl border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput 
                      id={`bid-price-${product.sku}`} 
                      label="Your Price per Unit (AED)"
                      type="number"
                      placeholder="e.g., 145.00"
                      value={bids[product.sku].price}
                      onChange={(e) => handleBidChange(product.sku, 'price', e.target.value)}
                      disabled={isSubmitted}
                    />
                    <FormInput 
                      id={`bid-notes-${product.sku}`} 
                      label="Notes / Estimate Details"
                      type="text"
                      placeholder="e.g., Price valid for 30 days"
                      value={bids[product.sku].notes}
                      onChange={(e) => handleBidChange(product.sku, 'notes', e.target.value)}
                      disabled={isSubmitted}
                    />
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
                    <div>
                      <span className="text-sm text-slate-500">Estimated Total: </span>
                      <span className="text-xl font-bold text-red-600">
                        AED {getEstimatedTotal(product.sku, product.quantity).toFixed(2)}
                      </span>
                    </div>
                    <PrimaryButton 
                      onClick={() => handleSubmitBid(product.sku)} 
                      className="w-full sm:w-auto mt-4 sm:mt-0"
                      disabled={!hasPrice || isSubmitted}
                    >
                      {isSubmitted ? 'Bid Submitted' : 'Submit Bid'}
                    </PrimaryButton>
                  </div>
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
 * 5G. SETTINGS PAGE (New Functional Page)
 */
const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Settings</h1>
      
      {/* --- Notification Settings --- */}
      <Card noPadding={true}>
        <CardHeader title="Notifications" />
        <CardContent className="space-y-4">
          <ToggleSwitch
            id="email-notifications"
            label="Email Notifications"
            enabled={emailNotifications}
            setEnabled={setEmailNotifications}
          />
          <ToggleSwitch
            id="in-app-notifications"
            label="In-App Notifications"
            enabled={inAppNotifications}
            setEnabled={setInAppNotifications}
          />
        </CardContent>
      </Card>
      
      {/* --- Security Settings --- */}
      <Card noPadding={true}>
        <CardHeader title="Change Password" />
        <CardContent className="space-y-4">
          <FormInput id="current-password" label="Current Password" type="password" icon={Lock} />
          <FormInput id="new-password" label="New Password" type="password" icon={Lock} />
          <FormInput id="confirm-password" label="Confirm New Password" type="password" icon={Lock} />
        </CardContent>
        <CardFooter>
          <PrimaryButton className="w-auto">Save Changes</PrimaryButton>
        </CardFooter>
      </Card>
    </div>
  );
};

/**
 * 5H. HELP PAGE (New Functional Page)
 */
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5"
      >
        <span className="text-lg font-medium text-slate-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 text-slate-600">
          {children}
        </div>
      )}
    </div>
  );
};

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Help & Support</h1>
      
      <Card noPadding={true}>
        <CardHeader title="Frequently Asked Questions (FAQ)" />
        <CardContent>
          <AccordionItem title="How do I add a new product?">
            <p>Navigate to the "Products" page from the sidebar, then click the "Add New Entry" button. Fill out the required fields in the modal and click "Submit for Approval".</p>
          </AccordionItem>
          <AccordionItem title="Where can I see the status of my orders?">
            <p>Go to the "Orders (PO)" page. You will see a list of all your Purchase Orders and their current status, such as "Pending Pickup", "Shipped", or "GRN Received".</p>
          </AccordionItem>
          <AccordionItem title="How do I update my password?">
            <p>Go to the "Settings" page. In the "Change Password" section, enter your current password and your new password, then click "Save Changes".</p>
          </AccordionItem>
          <AccordionItem title="What are Payment Terms?">
            <p>Payment Terms are selected during your initial document upload. This determines the payment cycle for your invoices, such as "Weekly", "30 Days", or "60 Days".</p>
          </AccordionItem>
        </CardContent>
      </Card>
    </div>
  );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- FULL PORTAL SHELL (Sidebar, Header)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

/**
 * 5. PORTAL - SIDEBAR (Modified)
 * Now uses onClick to set view state.
 */
const Sidebar = ({ currentView, setCurrentView, onClose }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders (PO)', icon: ShoppingCart },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'soa', name: 'Statement of Account', icon: ClipboardList },
    { id: 'bidding', name: 'Bidding', icon: Gavel },
  ];
  
  const toolItems = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Help', icon: CircleHelp },
  ];

  const NavLink = ({ item }) => (
    <button
      onClick={() => {
        setCurrentView(item.id);
        if (onClose) onClose(); // Close mobile menu on click
      }}
      className={`flex w-full items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors duration-150
        ${
          currentView === item.id
            ? 'bg-red-50 text-red-600 font-semibold'
            : 'text-slate-600 hover:bg-slate-100 font-medium'
        }
      `}
    >
      <div className="flex items-center">
        <item.icon className="w-5 h-5 mr-3" />
        <span>{item.name}</span>
      </div>
      {item.chevron && <ChevronRight className="w-4 h-4 text-slate-400" />}
    </button>
  );

  return (
    <nav className="w-full bg-white flex flex-col h-full p-4 shadow-sm">
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center">
          <Package2 className="w-8 h-8 text-red-600" />
          <span className="text-xl font-bold text-slate-900 ml-2">Abreco</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-slate-500 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        <h6 className="text-xs font-semibold text-slate-400 uppercase px-4 mb-2">Menu</h6>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </div>
        
        <h6 className="text-xs font-semibold text-slate-400 uppercase px-4 mt-6 mb-2">Tools</h6>
        <div className="space-y-1">
          {toolItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

/**
 * 5. PORTAL - HEADER (Modified)
 * Made responsive and added logout.
 */
const Header = ({ onMenuClick, onLogout, currentView }) => {
  const viewTitles = {
    dashboard: 'Dashboard',
    products: 'Product Management',
    orders: 'Order Management',
    payments: 'Payments & Invoices',
    soa: 'Statement of Account',
    bidding: 'Bidding Module',
    settings: 'Settings',
    help: 'Help & Support',
  };
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
            {viewTitles[currentView] || 'Vendor Portal'}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center group"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <img
              src="https://placehold.co/40x40/E2E8F0/4A5568?text=AV"
              alt="Vendor Alex"
              className={`w-10 h-10 rounded-full border-2 ${isDropdownOpen ? 'border-red-500' : 'border-slate-200'} group-hover:border-red-500 transition-colors`}
            />
            <div className="ml-3 hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Vendor Alex</p>
              <p className="text-xs text-slate-500">Axster Store</p>
            </div>
          </button>
          {/* Simple Dropdown for Logout */}
          {isDropdownOpen && (
            <div 
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-20"
            >
              <button 
                onClick={onLogout}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- MAIN APP COMPONENT (State Machine)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
export default function App() {
  /**
   * Main application state machine.
   * userState: 'loggedOut', 'pendingDocuments', 'pendingApproval', 'approved'
   * currentView: 'dashboard', 'products', 'orders', 'payments', 'settings'
   * needsPasswordChange: boolean
   */
  const [userState, setUserState] = useState('loggedOut');
  const [currentView, setCurrentView] = useState('dashboard');
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for onboarding flow
  const [docStatus, setDocStatus] = useState({ tradeLicense: 'missing', kyc: 'missing' });
  const [paymentTerm, setPaymentTerm] = useState('default');
  
  const handleLogout = () => {
    setUserState('loggedOut');
    setCurrentView('dashboard');
    setNeedsPasswordChange(false);
    // Reset onboarding state
    setDocStatus({ tradeLicense: 'missing', kyc: 'missing' });
    setPaymentTerm('default');
  };

  // --- 1. RENDER AUTH/LOGIN FLOW ---
  if (userState === 'loggedOut') {
    return (
      <LoginScreen 
        setUserState={setUserState}
        setCurrentView={setCurrentView}
        setNeedsPasswordChange={setNeedsPasswordChange}
      />
    );
  }

  // --- 2. RENDER DOCUMENT UPLOAD FLOW ---
  if (userState === 'pendingDocuments') {
    return (
      <UploadDocumentsScreen 
        docStatus={docStatus}
        setDocStatus={setDocStatus}
        paymentTerm={paymentTerm}
        setPaymentTerm={setPaymentTerm}
        setUserState={setUserState} 
      />
    );
  }

  // --- 3. RENDER PENDING APPROVAL FLOW ---
  if (userState === 'pendingApproval') {
    return (
      <WaitingForApprovalScreen 
        setUserState={setUserState}
        setNeedsPasswordChange={setNeedsPasswordChange}
        docStatus={docStatus}
        paymentTerm={paymentTerm}
      />
    );
  }

  // --- 4. RENDER FULL, APPROVED PORTAL ---
  if (userState === 'approved') {
    // This component renders the correct page based on currentView
    const MainContent = () => {
      switch (currentView) {
        case 'products':
          return <ProductManagementPage />;
        case 'orders':
          return <OrderManagementPage />;
        case 'payments':
          return <PaymentPage />;
        case 'soa':
          return <StatementOfAccountPage />;
        case 'bidding':
          return <BiddingModulePage />;
        case 'settings':
          return <SettingsPage />;
        case 'help':
          return <HelpPage />;
        case 'dashboard':
        default:
          return <DashboardView />;
      }
    };
    
    return (
      <div className="flex h-screen w-full bg-slate-100 font-inter">
        {/* --- Desktop Sidebar --- */}
        <div className="hidden lg:flex w-64 flex-shrink-0">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        </div>

        {/* --- Mobile Sidebar (Overlay & Drawer) --- */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        </div>

        {/* --- Main Content Area --- */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header 
            onMenuClick={() => setIsSidebarOpen(true)}
            onLogout={handleLogout}
            currentView={currentView}
          />
          <div className="flex-grow p-4 sm:p-6">
            <MainContent />
          </div>
        </main>
        
        {/* --- Password Change Modal (if needed) --- */}
        {needsPasswordChange && (
          <ForcePasswordChangeModal setNeedsPasswordChange={setNeedsPasswordChange} />
        )}
      </div>
    );
  }
  
  // Fallback
  return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
}

