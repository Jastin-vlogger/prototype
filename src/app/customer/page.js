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
  FileSpreadsheet, // For Excel Import
  Info, // For Info Tooltip
  Plus, // For Add
  LogOut, 
  BarChart, 
  Wallet, 
  MapPin, // Address Book
  Wrench, // Service Requests
  FileCheck, // Invoices/Docs
  Download, // Download PDF
  Truck, // Delivery
  AlertTriangle, // Overdue/Alerts
  Camera, // Image Proof
  History, // History
  Banknote, // Payments
  ArrowRightLeft, // Transactions
  Languages, // Added back for Login
  Trash2, 
  Edit2,
  Save,
  Filter,
  Star,
  RefreshCw, // For Reorder
  Map, // For Tracking Map
  TrendingUp,
  PieChart,
  Heart, // Saved Items
  RotateCcw, // Returns
  Receipt, // Invoices
  CreditCard as PaymentIcon,
  Sun, // Light Theme
  Moon, // Dark Theme
  Globe, // Language
  Check, // Checkmark
  Briefcase, // For Credit Days/Terms
  ArrowLeft, // Back button
  FileCheck2 // Doc verification
} from 'lucide-react';


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- REUSABLE HELPER & UI COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

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
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${sizeClasses[size] || 'max-w-md'} rounded-2xl shadow-xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          {onClose && (
            <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
    {toasts.map((toast) => (
      <div 
        key={toast.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full duration-300 ${
          toast.type === 'success' ? 'bg-white border-green-200 text-slate-800' : 
          toast.type === 'error' ? 'bg-white border-red-200 text-slate-800' : 'bg-slate-800 text-white'
        }`}
      >
        <div className={`p-1 rounded-full ${toast.type === 'success' ? 'bg-green-100 text-green-600' : toast.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-slate-700'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : toast.type === 'error' ? <XCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
        </div>
        <p className="text-sm font-medium">{toast.message}</p>
        <button onClick={() => removeToast(toast.id)} className="ml-2 text-slate-400 hover:text-slate-600">
          <X className="w-3 h-3" />
        </button>
      </div>
    ))}
  </div>
);

const FormInput = ({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, disabled = false, className = '', labelClassName = 'text-slate-700', required=false }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-medium mb-1 ${labelClassName}`}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
          <Icon className={`w-5 h-5 ${className.includes('text-white') ? 'text-white/50' : 'text-slate-400'}`} />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`block w-full ${Icon ? 'ps-10' : 'ps-4'} pe-4 py-2.5 border rounded-lg shadow-sm transition-colors duration-150
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100 disabled:text-slate-500
                   ${className ? className : 'border-slate-300 text-slate-900 placeholder:text-slate-400 bg-white'}`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

const FormTextArea = ({ id, label, placeholder, value, onChange, rows = 3, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1 text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm placeholder:text-slate-400 bg-white"
      placeholder={placeholder}
    />
  </div>
);

const FormSelect = ({ id, label, icon: Icon, value, onChange, children, disabled = false, className = '', labelClassName = 'text-slate-700' }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-medium mb-1 ${labelClassName}`}>
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
          <Icon className={`w-5 h-5 ${className.includes('text-white') ? 'text-white/50' : 'text-slate-400'}`} />
        </div>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full ${Icon ? 'ps-10' : 'ps-4'} pe-10 py-2.5 border rounded-lg shadow-sm 
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm 
                   disabled:bg-slate-100
                   ${className ? className : 'border-slate-300 text-slate-900 bg-white'}`}
      >
        {children}
      </select>
    </div>
  </div>
);

const PrimaryButton = ({ children, onClick, className = '', type = 'button', disabled = false, variant = 'primary' }) => {
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:border-red-500 hover:text-red-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-sm text-sm font-bold 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 transition-all duration-300 ease-in-out ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const StatCard = ({ title, value, icon: Icon, details, color = 'red' }) => {
  const colorMap = {
    red: { gradient: 'from-red-500 to-rose-600', shadow: 'hover:shadow-red-100', text: 'text-red-600', bgHover: 'group-hover:bg-red-50/30' },
    blue: { gradient: 'from-blue-500 to-indigo-600', shadow: 'hover:shadow-blue-100', text: 'text-blue-600', bgHover: 'group-hover:bg-blue-50/30' },
    green: { gradient: 'from-emerald-400 to-green-600', shadow: 'hover:shadow-emerald-100', text: 'text-emerald-600', bgHover: 'group-hover:bg-emerald-50/30' },
    orange: { gradient: 'from-orange-400 to-red-500', shadow: 'hover:shadow-orange-100', text: 'text-orange-600', bgHover: 'group-hover:bg-orange-50/30' },
    purple: { gradient: 'from-violet-500 to-purple-600', shadow: 'hover:shadow-violet-100', text: 'text-violet-600', bgHover: 'group-hover:bg-violet-50/30' },
    teal: { gradient: 'from-teal-400 to-cyan-600', shadow: 'hover:shadow-teal-100', text: 'text-teal-600', bgHover: 'group-hover:bg-teal-50/30' },
  };

  const theme = colorMap[color] || colorMap.red;

  return (
    <div className={`group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${theme.shadow} ${theme.bgHover}`}>
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className={`p-3.5 rounded-xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg shadow-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
          <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500 tracking-wide">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
          {details && <p className={`text-xs font-medium pt-1 opacity-70 ${theme.text}`}>{details}</p>}
        </div>
      </div>
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-gradient-to-br ${theme.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none`} />
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


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- ONBOARDING & AUTH FLOW COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const LoginScreen = ({ setUserState, setCurrentView, setNeedsPasswordChange, language, setLanguage, showToast }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'otp', 'forgot'
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({ email: '', password: '', company: '' });

  const handleLogin = (userTypeArg) => {
    // Simulate login logic based on type
    if (userTypeArg === 'new' || userTypeArg === 'existing') {
      showToast(`Welcome back! Logged in as ${userTypeArg === 'new' ? 'New User' : 'Existing User'}`, 'success');
      setUserState('approved');
    } else if (userTypeArg === 'pendingDocs') {
      showToast("Please complete your documentation.", "info");
      setUserState('pendingDocuments');
    } else if (userTypeArg === 'pendingApproval') {
      showToast("Account is currently under review.", "info");
      setUserState('pendingApproval');
    }
    setCurrentView('dashboard'); 
  };

  const handleSignup = () => {
    showToast("Account created successfully! Please verify OTP.", "success");
    setView('otp');
  };
  
  const handleOtp = () => {
    showToast("Verification Successful!", "success");
    setUserState('pendingDocuments'); 
    setCurrentView('dashboard');
  };

  const handleForgotPassword = () => {
    showToast("Reset link sent to your email!", "success");
    setView('login');
  };
  
  const inputClass = "bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 rounded-xl shadow-sm";
  const labelClass = "text-slate-700 font-bold ml-1";

  const renderView = () => {
    switch (view) {
      case 'signup':
        return (
          <div className="space-y-5 animate-in slide-in-from-right duration-300">
            <div className="text-start">
               <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
               <p className="text-slate-500 mt-2 text-sm">Join the Abreco family today</p>
            </div>
            
            <FormSelect id="userType" label="I am a..." icon={User} value={userType} onChange={(e) => setUserType(e.target.value)} className={inputClass} labelClassName={labelClass}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="company" label="Company Name" icon={Building} placeholder="Abreco Inc." className={inputClass} labelClassName={labelClass} />
            <FormInput id="email" label="Email Address" type="email" icon={Mail} placeholder="you@company.com" className={inputClass} labelClassName={labelClass} />
            <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" className={inputClass} labelClassName={labelClass} />
            
            <PrimaryButton onClick={handleSignup} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 rounded-xl">
              Sign Up
            </PrimaryButton>
            
            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-500">Log In</button>
            </p>
          </div>
        );
      case 'otp':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-start">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verify OTP</h2>
              <p className="text-slate-500 mt-2 text-sm">Enter the code sent to your email.</p>
            </div>
            <FormInput id="otp" label="OTP Code" icon={ShieldCheck} placeholder="123456" className={inputClass} labelClassName={labelClass} />
            <PrimaryButton onClick={handleOtp} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 rounded-xl">
              Verify Account
            </PrimaryButton>
            <p className="text-center text-sm text-slate-500">
              Didn't get a code? <button onClick={() => showToast("OTP Resent", "info")} className="font-bold text-blue-600 hover:text-blue-800">Resend</button>
            </p>
            <button onClick={() => setView('signup')} className="w-full text-xs text-slate-400 hover:text-slate-600">Back to Signup</button>
          </div>
        );
      case 'forgot':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-start">
              <button onClick={() => setView('login')} className="text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1">
                 <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Forgot Password</h2>
              <p className="text-slate-500 mt-2 text-sm">Enter your email to receive a reset link.</p>
            </div>
            <FormInput id="resetEmail" label="Email Address" icon={Mail} placeholder="you@company.com" className={inputClass} labelClassName={labelClass} />
            <PrimaryButton onClick={handleForgotPassword} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 rounded-xl">
              Send Reset Link
            </PrimaryButton>
          </div>
        );
      case 'login':
      default:
        return (
          <div className="space-y-5 animate-in slide-in-from-left duration-300">
            <div className="text-start mb-6">
               <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
               <p className="text-slate-500 mt-2 text-sm">Please sign in to access your dashboard</p>
            </div>
            
            <FormSelect id="userType" label="I am a..." icon={User} value={userType} onChange={(e) => setUserType(e.target.value)} className={inputClass} labelClassName={labelClass}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </FormSelect>
            <FormInput id="username" label="Username or Email" icon={User} placeholder="customer@company.com" className={inputClass} labelClassName={labelClass} />
            <div>
              <FormInput id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" className={inputClass} labelClassName={labelClass} />
              <div className="text-end -mt-2">
                <button onClick={() => setView('forgot')} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</button>
              </div>
            </div>
            <FormSelect id="language" label="Preferred Language" icon={Languages} value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass} labelClassName={labelClass}>
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </FormSelect>
            
            <PrimaryButton onClick={() => handleLogin('existing')} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 text-base rounded-xl">
              Sign In
            </PrimaryButton>
            
            <p className="text-center text-sm text-slate-500">
              New user?{' '}
              <button onClick={() => setView('signup')} className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-500">Create Account</button>
            </p>
            
            <div className="my-6 border-t border-slate-100 pt-4">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Demo Access</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={() => handleLogin('existing')} className="text-xs py-2 px-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">Approved User</button>
                <button onClick={() => handleLogin('new')} className="text-xs py-2 px-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">New User</button>
                <button onClick={() => handleLogin('pendingApproval')} className="text-xs py-2 px-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">Review Pending</button>
                <button onClick={() => handleLogin('pendingDocs')} className="text-xs py-2 px-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">Docs Pending</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex font-inter bg-slate-50 overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-600 via-purple-700 to-blue-700 items-center justify-center p-12 overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
         <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8">
              <Package2 className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">Welcome to Abreco</h1>
            <p className="text-lg text-blue-100 max-w-md leading-relaxed font-light">Manage your orders, payments, and account details in one seamless experience.</p>
         </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
         <div className="lg:hidden absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-blue-700"></div>
         <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg text-white"><Package2 className="w-6 h-6" /></div>
            <span className="font-bold text-slate-800 text-xl">Abreco</span>
         </div>
         <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 relative z-10">
            {renderView()}
            <div className="mt-8 text-center"><p className="text-xs text-slate-400">© 2025 Abreco Group. All rights reserved.</p></div>
         </div>
      </div>
    </div>
  );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- NEW COMPONENT: BLOCKING STATUS PAGE (Pending/Docs)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const BlockingStatusPage = ({ status, onLogout, setUserState }) => {
  const isPendingDocs = status === 'pendingDocuments';
  const [docUploaded, setDocUploaded] = useState(false);

  const handleSubmitDocs = () => {
    if (docUploaded) {
      setUserState('pendingApproval'); // Transition to review state
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6 font-inter">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className={`h-2 w-full ${isPendingDocs ? 'bg-amber-500' : 'bg-blue-600'}`}></div>
        <div className="p-10 text-center">
           <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isPendingDocs ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-600'}`}>
              {isPendingDocs ? <FileCheck2 className="w-10 h-10" /> : <Clock className="w-10 h-10" />}
           </div>
           
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
             {isPendingDocs ? 'Action Required' : 'Under Review'}
           </h1>
           <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
             {isPendingDocs 
               ? 'To activate your account, we need you to upload a valid Trade License for verification.' 
               : 'Your account is currently being reviewed by our team. We will notify you once approved.'}
           </p>

           {isPendingDocs && (
             <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <div className="flex flex-col items-center">
                   <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                   <p className="text-sm font-semibold text-slate-700">Upload Trade License</p>
                   <p className="text-xs text-slate-400 mb-4">PDF, JPG, PNG up to 5MB</p>
                   {docUploaded ? (
                     <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg text-sm font-bold">
                        <CheckCircle className="w-4 h-4" /> Ready to submit
                     </div>
                   ) : (
                     <button onClick={() => setDocUploaded(true)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm text-slate-700">
                       Choose File
                     </button>
                   )}
                </div>
             </div>
           )}

           <div className="flex flex-col gap-3">
              {isPendingDocs && (
                <button 
                  onClick={handleSubmitDocs}
                  disabled={!docUploaded}
                  className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Submit for Verification
                </button>
              )}
              <button 
                onClick={onLogout}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${isPendingDocs ? 'bg-white text-slate-500 hover:text-slate-900' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Log Out
              </button>
           </div>
        </div>
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
           <p className="text-xs text-slate-400">Need help? <a href="#" className="text-blue-600 font-bold hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- CORE DASHBOARD WIDGETS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const CreditSummaryBox = () => (
  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none h-full relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-red-600/10 rounded-full blur-xl pointer-events-none"></div>

    <div className="flex justify-between items-start mb-6 relative z-10">
      <div>
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Credit Limit</h3>
        <p className="text-3xl font-bold mt-1">AED 50,000</p>
      </div>
      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
        <Briefcase className="w-6 h-6 text-white" />
      </div>
    </div>
    
    <div className="space-y-5 relative z-10">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Utilized</span>
          <span className="font-semibold text-red-400">AED 12,500</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
         <div>
            <span className="text-xs text-slate-400 block mb-1">Available</span>
            <span className="text-lg font-semibold text-green-400">AED 37,500</span>
         </div>
         <div className="text-right">
            <span className="text-xs text-slate-400 block mb-1">Payment Terms</span>
            <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded inline-block">30 Days Net</span>
         </div>
      </div>
    </div>

    <div className="mt-6 pt-4 border-t border-slate-700 relative z-10">
      <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-400/10 px-3 py-2 rounded-lg">
        <AlertTriangle className="w-4 h-4" />
        <span>Next Due: AED 2,500 on Dec 15</span>
      </div>
    </div>
  </Card>
);

const WalletCard = () => (
  <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none h-full relative overflow-hidden">
     <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
     
     <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
           <h3 className="text-sm font-medium text-blue-100 uppercase tracking-wider">Wallet Balance</h3>
           <p className="text-3xl font-bold mt-1">AED 1,250.00</p>
        </div>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
           <Wallet className="w-6 h-6 text-white" />
        </div>
     </div>

     <div className="space-y-4 relative z-10">
        <div className="flex gap-2">
           <button className="flex-1 bg-white text-blue-600 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm">
              Top Up
           </button>
           <button className="flex-1 bg-blue-800/50 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
              Withdraw
           </button>
        </div>
        <p className="text-xs text-blue-200 text-center">
           Used for quick payments & refunds
        </p>
     </div>
  </Card>
);

const RecentOrdersWidget = ({ onViewAll, onMarkReceived }) => {
  const [orders, setOrders] = useState([
    { id: 'ORD-2931', date: 'Dec 02', status: 'Pending Delivery', eta: 'Today, 2 PM' },
    { id: 'ORD-2930', date: 'Nov 29', status: 'Delivered', eta: '-' },
  ]);

  const handleTick = (id) => {
    onMarkReceived(id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Delivered', eta: '-' } : o));
  };

  return (
    <Card noPadding={true} className="h-full">
      <CardHeader title="Recent Orders">
        <button onClick={onViewAll} className="text-sm text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <div className="divide-y divide-slate-100">
        {orders.map(order => (
          <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{order.id}</span>
                {order.status === 'Pending Delivery' && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span>}
                {order.status === 'Delivered' && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Delivered</span>}
              </div>
              <p className="text-xs text-slate-500 mt-1">{order.date} • ETA: {order.eta}</p>
            </div>
            {order.status === 'Pending Delivery' && (
              <button 
                onClick={() => handleTick(order.id)}
                className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors border border-green-200"
                title="Confirm Delivery"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

const RecentServiceWidget = ({ onViewAll }) => {
  const requests = [
    { id: 'SR-101', type: 'AC Maintenance', status: 'Estimate Pending' },
    { id: 'SR-099', type: 'Plumbing', status: 'Approved' },
  ];

  return (
    <Card noPadding={true} className="h-full">
      <CardHeader title="Active Service Requests">
        <button onClick={onViewAll} className="text-sm text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <div className="divide-y divide-slate-100">
        {requests.map(req => (
          <div key={req.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <p className="font-medium text-slate-900">{req.type}</p>
              <p className="text-xs text-slate-500">ID: {req.id}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const NotificationsPanel = () => (
  <Card className="h-full">
    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
      <Bell className="w-4 h-4" /> Notifications
    </h3>
    <div className="space-y-4">
      <div className="flex gap-3 items-start">
        <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
        <div>
          <p className="text-sm text-slate-800">Your order #ORD-2931 is out for delivery.</p>
          <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
        <div>
          <p className="text-sm text-slate-800">Invoice #INV-900 is overdue.</p>
          <p className="text-xs text-slate-400 mt-1">Yesterday</p>
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
        <div>
          <p className="text-sm text-slate-800">Estimate for SR-101 is ready for review.</p>
          <p className="text-xs text-slate-400 mt-1">2 days ago</p>
        </div>
      </div>
    </div>
  </Card>
);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- MAIN PAGES
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const DashboardView = ({ setCurrentView, showToast }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
           <p className="text-slate-500 mt-1">Overview of your account activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value="124" icon={Package} color="blue" details="Lifetime" />
        <StatCard title="Pending Deliveries" value="3" icon={Truck} color="orange" details="In Transit" />
        <StatCard title="Pending Payments" value="2" icon={CreditCard} color="red" details="Invoices Unpaid" />
        <StatCard title="Active Services" value="4" icon={Wrench} color="purple" details="Ongoing Requests" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <RecentOrdersWidget 
               onViewAll={() => setCurrentView('orders')} 
               onMarkReceived={(id) => showToast(`Order ${id} marked as delivered`, 'success')}
             />
             <RecentServiceWidget onViewAll={() => setCurrentView('services')} />
          </div>
        </div>
        <div className="space-y-6">
          <CreditSummaryBox />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

// --- ORDERS PAGE ---
const OrdersPage = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Enriched dummy data with more tracking info
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-2931', date: '2025-12-02', amount: 450.00, status: 'Pending Delivery', 
      items: [
        { name: 'Atlantic Salmon Fillet', qty: '5kg', price: 250 },
        { name: 'Organic Vegetables Mix', qty: '10kg', price: 200 }
      ],
      trackingStep: 2, // 0: Ordered, 1: Shipped, 2: Out for Delivery, 3: Delivered
      logs: [
        { time: 'Dec 02, 08:30 AM', status: 'Out for Delivery', detail: 'Driver Ahmed is on the way' },
        { time: 'Dec 02, 06:15 AM', status: 'Shipped', detail: 'Package has left the warehouse' },
        { time: 'Dec 01, 04:00 PM', status: 'Ordered', detail: 'Order received and confirmed' }
      ],
      address: 'Main Warehouse, Al Quoz'
    },
    { 
      id: 'ORD-2930', date: '2025-11-29', amount: 120.00, status: 'Delivered', 
      items: [
        { name: 'Industrial Cleaner', qty: '10L', price: 120 }
      ],
      trackingStep: 3,
      logs: [
        { time: 'Nov 29, 02:30 PM', status: 'Delivered', detail: 'Package delivered to reception' },
        { time: 'Nov 29, 09:00 AM', status: 'Out for Delivery', detail: 'Driver John is on the way' },
        { time: 'Nov 28, 05:00 PM', status: 'Shipped', detail: 'Package has left the warehouse' },
        { time: 'Nov 28, 01:00 PM', status: 'Ordered', detail: 'Order received' }
      ],
      address: 'Branch 2, Deira'
    },
    { 
      id: 'ORD-2928', date: '2025-11-25', amount: 850.50, status: 'Delivered', 
      items: [
        { name: 'Kitchen Equipment Set', qty: '1', price: 850.50 }
      ],
      trackingStep: 3,
      logs: [
        { time: 'Nov 25, 11:30 AM', status: 'Delivered', detail: 'Delivered to Main Warehouse' },
        { time: 'Nov 25, 08:00 AM', status: 'Out for Delivery', detail: 'Driver Ali is on the way' },
        { time: 'Nov 24, 02:00 PM', status: 'Ordered', detail: 'Order received' }
      ],
      address: 'Main Warehouse, Al Quoz'
    },
    { 
      id: 'ORD-2925', date: '2025-11-20', amount: 60.00, status: 'Cancelled', 
      items: [
        { name: 'Misc Supplies', qty: '1', price: 60 }
      ],
      trackingStep: 0,
      logs: [
        { time: 'Nov 20, 10:00 AM', status: 'Cancelled', detail: 'Order cancelled by user' }
      ],
      address: 'Main Warehouse, Al Quoz'
    },
  ]);

  const filteredOrders = orders.filter(o => {
    // Tab Filter
    const tabMatch = 
      activeTab === 'all' ? true :
      activeTab === 'pending' ? o.status === 'Pending Delivery' :
      activeTab === 'delivered' ? o.status === 'Delivered' :
      activeTab === 'cancelled' ? o.status === 'Cancelled' : true;
    
    // Search Filter
    const searchMatch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return tabMatch && searchMatch;
  });

  const handleAck = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to acknowledge receipt of this delivery?")) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Delivered', trackingStep: 3, logs: [{ time: 'Just Now', status: 'Delivered', detail: 'Confirmed by customer' }, ...o.logs] } : o));
      showToast(`Order ${id} confirmed successfully!`, 'success');
    }
  };

  const handleReorder = (order, e) => {
    e.stopPropagation();
    showToast(`Items from ${order.id} added to cart! (Simulation)`, 'success');
  };

  const handleCancelOrder = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(prev => prev.map(o => {
        if (o.id === id) {
          return {
            ...o,
            status: 'Cancelled',
            trackingStep: 0,
            logs: [{ time: new Date().toLocaleString(), status: 'Cancelled', detail: 'Order cancelled by customer' }, ...o.logs]
          };
        }
        return o;
      }));
      setSelectedOrder(null);
      showToast(`Order ${id} cancelled successfully`, 'info');
    }
  };

  // Tracking Steps Component
  const TrackingProgress = ({ currentStep }) => {
    const steps = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
    return (
      <div className="relative flex items-center justify-between w-full mb-8 mt-4 px-2">
        {/* Progress Line Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center group">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-white
                  ${isCompleted 
                    ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-200' 
                    : 'border-slate-300 text-slate-300'
                  }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
              </div>
              <span className={`text-xs mt-2 font-medium transition-colors ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Orders</h2>
           <p className="text-slate-500 mt-1">Track, return, or buy things again.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
           {/* Search Bar */}
           <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search all orders..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm"
              />
           </div>
           
           {/* Filter Tabs */}
           <div className="bg-white border border-slate-200 rounded-xl p-1 flex overflow-x-auto shadow-sm">
              {['all', 'pending', 'delivered', 'cancelled'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>
        </div>
      </div>

      <Card noPadding={true} className="overflow-hidden border border-slate-200 shadow-md rounded-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredOrders.length > 0 ? filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-blue-600 group-hover:underline decoration-2 underline-offset-2 mb-1">{order.id}</span>
                      <span className="text-sm font-medium text-slate-900">{order.items[0].name}</span>
                      {order.items.length > 1 && <span className="text-xs text-slate-400 mt-0.5">+{order.items.length - 1} more items</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500 font-medium">{order.date}</td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">AED {order.amount.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 mr-1.5" />}
                      {order.status === 'Pending Delivery' && <Clock className="w-3 h-3 mr-1.5" />}
                      {order.status === 'Cancelled' && <XCircle className="w-3 h-3 mr-1.5" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                     <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => handleReorder(order, e)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                          title="Buy Again"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        {order.status === 'Pending Delivery' && (
                          <button 
                            onClick={(e) => handleAck(order.id, e)}
                            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all border border-transparent hover:border-green-100"
                            title="Confirm Delivery"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-24 text-center text-slate-400 bg-slate-50/30">
                     <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                     </div>
                     <p className="font-medium text-slate-600">No orders found</p>
                     <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal title={`Order #${selectedOrder.id}`} onClose={() => setSelectedOrder(null)} size="2xl">
           <div className="space-y-8">
              {/* Tracker */}
              {selectedOrder.status !== 'Cancelled' && (
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                     <Truck className="w-4 h-4 text-slate-500" /> Shipment Status
                   </h4>
                   <TrackingProgress currentStep={selectedOrder.trackingStep} />
                </div>
              )}

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Left Col: Items */}
                 <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-4">Items Ordered</h4>
                      <div className="space-y-4">
                         {selectedOrder.items.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                                    <Package className="w-6 h-6" />
                                 </div>
                                 <div>
                                   <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                   <p className="text-xs text-slate-500 font-medium mt-0.5">Qty: {item.qty}</p>
                                 </div>
                              </div>
                              <p className="text-sm font-bold text-slate-900">AED {item.price.toFixed(2)}</p>
                           </div>
                         ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-200">
                       <span className="font-medium text-slate-500">Order Total</span>
                       <span className="font-extrabold text-2xl text-slate-900">AED {selectedOrder.amount.toFixed(2)}</span>
                    </div>
                 </div>

                 {/* Right Col: Info & Logs */}
                 <div className="space-y-8">
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                       <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Delivery Address</h4>
                       <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">
                             {selectedOrder.address}
                          </p>
                       </div>
                    </div>

                    <div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider pl-1">Timeline</h4>
                       <div className="relative border-l-2 border-slate-200 ml-3 pl-6 space-y-6">
                          {selectedOrder.logs.map((log, i) => (
                            <div key={i} className="relative">
                               <div className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${i === 0 ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                               <p className="text-sm font-bold text-slate-800">{log.status}</p>
                               <p className="text-xs text-slate-500 mt-0.5 font-medium">{log.time}</p>
                               <p className="text-xs text-slate-600 mt-1">{log.detail}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
                 <PrimaryButton variant="secondary" onClick={(e) => handleReorder(selectedOrder, e)} className="w-full sm:w-auto h-11">
                    <RefreshCw className="w-4 h-4" /> Buy Again
                 </PrimaryButton>
                 <PrimaryButton variant="secondary" onClick={() => showToast("Invoice downloaded", "success")} className="w-full sm:w-auto h-11">
                    <Download className="w-4 h-4" /> Download Invoice
                 </PrimaryButton>
                 {selectedOrder.status === 'Pending Delivery' && (
                    <>
                      <button 
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        className="w-full sm:w-auto h-11 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-transparent"
                      >
                        Cancel Order
                      </button>
                      <PrimaryButton variant="primary" onClick={(e) => { handleAck(selectedOrder.id, e); setSelectedOrder(null); }} className="w-full sm:w-auto h-11 bg-slate-900 hover:bg-slate-800">
                        Confirm Receipt
                      </PrimaryButton>
                    </>
                 )}
              </div>
           </div>
        </Modal>
      )}
    </div>
  );
};

// --- NEW PAGE: BUY AGAIN ---
const BuyAgainPage = ({ showToast }) => {
  const items = [
    { id: 1, name: "Atlantic Salmon Fillet", price: 250, lastPurchased: "Dec 02, 2025" },
    { id: 2, name: "Organic Vegetables Mix", price: 200, lastPurchased: "Dec 02, 2025" },
    { id: 3, name: "Industrial Cleaner 10L", price: 120, lastPurchased: "Nov 29, 2025" },
    { id: 4, name: "Kitchen Equipment Set", price: 850.50, lastPurchased: "Nov 25, 2025" },
    { id: 5, name: "Bulk Rice 50kg", price: 300, lastPurchased: "Nov 18, 2025" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Buy Again</h1>
        <p className="text-slate-500 mt-1">Quickly reorder your frequently purchased items.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} noPadding={true} className="group hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden rounded-2xl">
             <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center overflow-hidden">
                {/* Image Placeholder */}
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-500">
                  <Package className="w-10 h-10" />
                </div>
                
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                   <Heart className="w-5 h-5" />
                </button>
             </div>
             
             <div className="p-5">
                <div className="mb-4">
                   <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                   <p className="text-xs text-slate-500 font-medium">Last bought: {item.lastPurchased}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                   <span className="font-extrabold text-slate-900 text-lg">AED {item.price.toFixed(2)}</span>
                   <button 
                     onClick={() => showToast("Added to Cart", "success")}
                     className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                   >
                     Add to Cart
                   </button>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- NEW PAGE: RETURNS ---
const ReturnsPage = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [returns, setReturns] = useState([
     { id: 'RTN-2023', orderId: 'ORD-2930', item: 'Industrial Cleaner', status: 'Processing', date: 'Dec 03, 2025' }
  ]);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const handleNewReturn = (e) => {
    e.preventDefault();
    setReturns([...returns, { id: `RTN-${Math.floor(Math.random()*10000)}`, orderId: 'ORD-2928', item: 'Kitchen Equipment', status: 'Pending Approval', date: 'Today' }]);
    setIsReturnModalOpen(false);
    showToast("Return request submitted", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-slate-200">
         <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Returns & Refunds</h1>
            <p className="text-slate-500 mt-1">Manage your return requests and track status.</p>
         </div>
         <PrimaryButton onClick={() => setIsReturnModalOpen(true)} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 shadow-md">
           <RotateCcw className="w-4 h-4" /> Start a Return
         </PrimaryButton>
       </div>

       <div className="bg-white border border-slate-200 rounded-xl p-1 flex w-fit shadow-sm">
          <button onClick={() => setActiveTab('active')} className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'active' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>Active Returns</button>
          <button onClick={() => setActiveTab('history')} className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'history' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>History</button>
       </div>

       <Card noPadding={true} className="border border-slate-200 shadow-md rounded-2xl overflow-hidden">
         {returns.length > 0 ? (
           <div className="overflow-x-auto">
             <table className="min-w-full">
               <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                   <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Return ID</th>
                   <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                   <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Item</th>
                   <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                   <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {returns.map(ret => (
                    <tr key={ret.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-blue-600">{ret.id}</td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium">{ret.orderId}</td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-900">{ret.item}</td>
                      <td className="px-6 py-5">
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                           <Loader className="w-3 h-3 mr-1.5 animate-spin" />
                           {ret.status}
                         </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 text-right font-medium">{ret.date}</td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
         ) : (
           <div className="p-16 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <RotateCcw className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No returns found</h3>
              <p className="text-slate-500 mt-1">You don't have any active return requests.</p>
           </div>
         )}
       </Card>

       {isReturnModalOpen && (
         <Modal title="Start a Return" onClose={() => setIsReturnModalOpen(false)}>
           <form onSubmit={handleNewReturn} className="space-y-5">
              <FormSelect id="order" label="Select Order" icon={Package}>
                <option>ORD-2928 - Kitchen Equipment</option>
                <option>ORD-2931 - Atlantic Salmon</option>
              </FormSelect>
              <FormSelect id="reason" label="Reason for Return" icon={Info}>
                <option>Damaged Item</option>
                <option>Wrong Item Sent</option>
                <option>No Longer Needed</option>
              </FormSelect>
              <FormTextArea id="notes" label="Additional Comments" placeholder="Please describe the issue..." />
              <div className="pt-2">
                <PrimaryButton type="submit" className="bg-slate-900 hover:bg-slate-800">Submit Request</PrimaryButton>
              </div>
           </form>
         </Modal>
       )}
    </div>
  );
};

// --- NEW PAGE: SAVED ITEMS ---
const SavedItemsPage = ({ showToast }) => {
  const items = [
    { id: 1, name: "Premium Coffee Beans 1kg", price: 45.00, added: "2 days ago" },
    { id: 2, name: "Heavy Duty Degreaser", price: 85.00, added: "1 week ago" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Saved Items</h1>
        <p className="text-slate-500 mt-1">Items you've saved for later.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {items.map(item => (
            <Card key={item.id} noPadding={true} className="group border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
               <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
               </div>
               
               <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{item.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">Added {item.added}</p>
                  
                  <div className="flex items-end justify-between">
                     <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Price</p>
                        <p className="font-extrabold text-xl text-slate-900">AED {item.price.toFixed(2)}</p>
                     </div>
                  </div>
                  
                  <div className="flex gap-2 mt-5">
                     <PrimaryButton onClick={() => showToast("Moved to Cart", "success")} className="text-xs py-2.5 bg-slate-900 hover:bg-slate-800 shadow-none">Add to Cart</PrimaryButton>
                     <button onClick={() => showToast("Removed", "info")} className="p-2.5 border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all">
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </Card>
         ))}
         
         {/* Add Item Placeholder */}
         <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-slate-400 hover:bg-slate-50 transition-all group min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm mb-3 transition-all">
               <Plus className="w-6 h-6" />
            </div>
            <p className="font-semibold text-slate-500 group-hover:text-slate-800">Continue Shopping</p>
         </button>
      </div>
    </div>
  );
};

// --- NEW PAGE: INVOICES (Separated) ---
const InvoicesPage = ({ showToast }) => {
  const [filter, setFilter] = useState('all');
  const [invoices, setInvoices] = useState([
    { id: 'INV-901', orderRef: 'ORD-2931', date: '2025-11-30', amount: 450.00, status: 'Unpaid', dueDate: '2025-12-30' },
    { id: 'INV-900', orderRef: 'ORD-2930', date: '2025-11-20', amount: 300.00, status: 'Overdue', dueDate: '2025-12-05' },
    { id: 'INV-899', orderRef: 'ORD-2928', date: '2025-11-15', amount: 1200.00, status: 'Paid', dueDate: '2025-12-15' },
    { id: 'INV-895', orderRef: 'ORD-2921', date: '2025-11-10', amount: 150.00, status: 'Paid', dueDate: '2025-12-10' },
  ]);

  const filtered = invoices.filter(inv => {
     if (filter === 'all') return true;
     return inv.status.toLowerCase() === filter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
         <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Invoices</h1>
            <p className="text-slate-500 mt-1">View and manage your billing history.</p>
         </div>
         <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            {['all', 'unpaid', 'overdue'].map(f => (
               <button 
                  key={f}
                  onClick={() => setFilter(f)} 
                  className={`px-4 py-2 text-sm font-bold rounded-lg capitalize transition-all ${filter === f ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
               >
                  {f}
               </button>
            ))}
         </div>
       </div>

       <Card noPadding={true} className="border border-slate-200 shadow-md rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
             <table className="min-w-full">
               <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Details</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Related Order</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filtered.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                                <Receipt className="w-5 h-5" />
                             </div>
                             <span className="text-sm font-bold text-slate-900">{inv.id}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{inv.orderRef}</span>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex flex-col">
                             <span className="text-xs text-slate-500">Issued: {inv.date}</span>
                             <span className={`text-xs font-bold ${new Date(inv.dueDate) < new Date() && inv.status !== 'Paid' ? 'text-red-600' : 'text-slate-700'}`}>Due: {inv.dueDate}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-sm font-bold text-slate-900">AED {inv.amount.toFixed(2)}</td>
                       <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                             inv.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-100' : 
                             inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                           }`}>
                             {inv.status}
                           </span>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                             {inv.status !== 'Paid' && (
                               <button 
                                 onClick={() => showToast("Redirecting to Payment Gateway...", "info")} 
                                 className="text-xs bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition shadow-sm font-bold"
                               >
                                 Pay
                               </button>
                             )}
                             <button 
                               onClick={() => showToast("PDF Downloaded", "success")} 
                               className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                               title="Download PDF"
                             >
                               <Download className="w-5 h-5" />
                             </button>
                          </div>
                        </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
};

// --- SETTINGS PAGE ---
const AccountSettingsPage = ({ showToast }) => {
  const [profile, setProfile] = useState({
    name: 'Abreco Customer Inc.',
    email: 'admin@abrecocustomer.com',
    phone: '+971 50 000 0000'
  });
  
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Main Warehouse', detail: 'Warehouse 4, Al Quoz Ind Area 3, Dubai, UAE', isDefault: true }
  ]);
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', detail: '' });

  const handleProfileUpdate = () => {
    showToast("Profile updated successfully", "success");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { id: Date.now(), ...newAddress, isDefault: false }]);
    setIsAddressModalOpen(false);
    setNewAddress({ name: '', detail: '' });
    showToast("New address added", "success");
  };

  const deleteAddress = (id) => {
    if(window.confirm("Remove this address?")) {
      setAddresses(addresses.filter(a => a.id !== id));
      showToast("Address removed", "info");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your company profile and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Navigation or smaller settings if needed, here just keeping it simple or main profile */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="border border-slate-200 shadow-md rounded-2xl overflow-hidden">
              <CardHeader title="Profile Information" />
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput id="name" label="Company Name" icon={Building} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="bg-slate-50" />
                  <FormInput id="email" label="Contact Email" icon={Mail} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                  <FormInput id="phone" label="Phone Number" icon={Settings} value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                </div>
                <div className="mt-8 flex justify-end">
                   <PrimaryButton onClick={handleProfileUpdate} className="w-auto px-8 bg-slate-900 hover:bg-slate-800">
                     <Save className="w-4 h-4 mr-2" /> Save Changes
                   </PrimaryButton>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-md rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                 <h3 className="text-lg font-bold text-slate-900">Address Book</h3>
                 <button onClick={() => setIsAddressModalOpen(true)} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                   <Plus className="w-4 h-4" /> Add New
                 </button>
              </div>
              <div className="p-6">
                 <div className="space-y-4">
                   {addresses.map(addr => (
                     <div key={addr.id} className="border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-slate-50 transition-colors gap-4">
                        <div className="flex items-start gap-4">
                           <div className={`p-2.5 rounded-full ${addr.isDefault ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                              <MapPin className="w-5 h-5" />
                           </div>
                           <div>
                             <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                {addr.name}
                                {addr.isDefault && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>}
                             </h4>
                             <p className="text-sm text-slate-500 mt-1">{addr.detail}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                           <button className="text-sm text-slate-500 hover:text-slate-900 font-medium px-2">Edit</button>
                           {!addr.isDefault && (
                              <button onClick={() => deleteAddress(addr.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                           )}
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </Card>
         </div>

         {/* Right Column: Preferences / Extras */}
         <div className="space-y-6">
            <Card className="border border-slate-200 shadow-md rounded-2xl p-6 bg-slate-900 text-white">
               <h3 className="font-bold text-lg mb-2">Security</h3>
               <p className="text-sm text-slate-400 mb-6">Manage your password and 2FA settings.</p>
               <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Change Password
               </button>
            </Card>
         </div>
      </div>

      {isAddressModalOpen && (
        <Modal title="Add New Address" onClose={() => setIsAddressModalOpen(false)}>
          <form onSubmit={handleAddAddress} className="space-y-5">
             <FormInput id="addrName" label="Location Name" placeholder="e.g. Branch 2" value={newAddress.name} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} required />
             <FormTextArea id="addrDetail" label="Address Details" placeholder="Full street address..." value={newAddress.detail} onChange={(e) => setNewAddress({...newAddress, detail: e.target.value})} required />
             <div className="pt-2">
               <PrimaryButton type="submit" className="bg-slate-900 hover:bg-slate-800">Save Address</PrimaryButton>
             </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// --- FINANCIALS PAGE (Renamed to Payments & Wallet) ---
const FinancialsPage = ({ showToast }) => {
  const [tab, setTab] = useState('credit'); 
  const [transactions, setTransactions] = useState([
     { id: 'TRX-5544', date: '2025-11-28', desc: 'Payment for INV-899', amount: 1200.00, type: 'credit' },
     { id: 'TRX-5543', date: '2025-11-10', desc: 'Payment for INV-895', amount: 150.00, type: 'credit' },
     { id: 'TRX-5540', date: '2025-11-05', desc: 'Account Top-up', amount: 5000.00, type: 'credit' },
  ]);

  const requestCreditIncrease = () => {
    showToast("Credit limit increase request sent to Finance Dept.", "success");
  };

  // Simple Spending Chart (CSS Bars)
  const SpendingChart = () => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
       <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
         <BarChart className="w-5 h-5 text-slate-500" /> Monthly Spending
       </h4>
       <div className="flex items-end justify-between h-48 gap-4">
          {[
            { m: 'Jul', v: 40 }, { m: 'Aug', v: 65 }, { m: 'Sep', v: 30 }, 
            { m: 'Oct', v: 85 }, { m: 'Nov', v: 50 }, { m: 'Dec', v: 20 }
          ].map((bar, i) => (
             <div key={i} className="flex flex-col items-center gap-3 w-full">
                <div 
                   className="w-full bg-slate-100 rounded-xl relative group transition-all duration-500 hover:bg-blue-100 cursor-pointer" 
                   style={{ height: `${bar.v}%` }}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 whitespace-nowrap shadow-lg">
                     AED {bar.v * 100}
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                   </div>
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">{bar.m}</span>
             </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-slate-200">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Payments & Wallet</h1>
           <p className="text-slate-500 mt-1">Manage credit lines and digital wallet.</p>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-slate-100/50 p-1.5 rounded-xl inline-flex gap-1 border border-slate-200">
          {[
            { id: 'credit', label: 'Credit & Wallet', icon: Wallet },
            { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`
                flex items-center px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                ${tab === item.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}
              `}
            >
              <item.icon className={`mr-2 h-4 w-4 ${tab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
      </div>

      <div className="mt-2">
        {tab === 'credit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Cards */}
            <div className="lg:col-span-1 flex flex-col gap-6">
               <div className="h-64 shadow-lg rounded-2xl transition-transform hover:-translate-y-1 duration-300">
                 <CreditSummaryBox />
               </div>
               <div className="h-64 shadow-lg rounded-2xl transition-transform hover:-translate-y-1 duration-300">
                 <WalletCard />
               </div>
            </div>
            
            {/* Right Column: Charts & Actions */}
            <div className="lg:col-span-2 space-y-8">
               <SpendingChart />
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="border border-slate-200 shadow-md rounded-2xl p-6">
                   <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <PaymentIcon className="w-5 h-5 text-slate-500" /> Default Payment
                   </h4>
                   <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                             <div className="w-6 h-4 bg-blue-900 rounded-sm"></div>
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                             <p className="text-xs text-slate-500">Expires 12/28</p>
                          </div>
                       </div>
                       <CheckCircle className="w-5 h-5 text-green-500" />
                   </div>
                   <button className="text-sm text-blue-600 font-bold hover:underline">Manage Methods</button>
                 </Card>

                 <Card className="border border-slate-200 shadow-md rounded-2xl p-6 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                   <h4 className="font-bold text-lg mb-2">Need more credit?</h4>
                   <p className="text-sm text-slate-400 mb-6">Request a temporary increase for peak seasons.</p>
                   <button onClick={requestCreditIncrease} className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                     Request Increase
                   </button>
                 </Card>
               </div>
            </div>
          </div>
        )}
        
        {tab === 'transactions' && (
           <Card noPadding={true} className="border border-slate-200 shadow-md rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map(trx => (
                       <tr key={trx.id} className="hover:bg-slate-50/80 transition-colors">
                         <td className="px-6 py-5">
                            <span className="font-mono text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">{trx.id}</span>
                         </td>
                         <td className="px-6 py-5 text-sm text-slate-500 font-medium">{trx.date}</td>
                         <td className="px-6 py-5 text-sm font-semibold text-slate-900">{trx.desc}</td>
                         <td className="px-6 py-5 text-sm font-bold text-right text-green-600">+ AED {trx.amount.toFixed(2)}</td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </Card>
        )}
      </div>
    </div>
  );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- SHELL COMPONENTS (Sidebar, Header)
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const Sidebar = ({ currentView, setCurrentView, onClose, isDarkMode }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', name: 'Orders', icon: Package },
    // REMOVED 'Buy Again' from here as requested
    { id: 'invoices', name: 'Invoices', icon: Receipt }, 
    { id: 'financials', name: 'Payments & Wallet', icon: Wallet },
    { id: 'services', name: 'Service Requests', icon: Wrench },
    { id: 'saved-items', name: 'Saved Items', icon: Heart },
    { id: 'returns', name: 'Returns & Refunds', icon: RotateCcw },
    { id: 'kyc', name: 'KYC & Documents', icon: FileText },
  ];
  
  const toolItems = [
    { id: 'settings', name: 'Account Settings', icon: User },
    { id: 'help', name: 'Support', icon: CircleHelp },
  ];

  const NavLink = ({ item }) => {
    const isActive = currentView === item.id;
    return (
      <button
        onClick={() => {
          setCurrentView(item.id);
          if (onClose) onClose();
        }}
        className={`group relative flex w-full items-center justify-between px-4 py-3.5 mb-1 rounded-xl text-sm transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bg-gradient-to-r from-red-50 to-white text-red-700 font-bold shadow-[0_2px_8px_-2px_rgba(239,68,68,0.15)]'
              // UPDATED: Darker text and font-bold for better visibility ("viveable colour")
              : `text-slate-700 font-bold hover:bg-slate-100 hover:text-red-700 ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : ''}`
          }
        `}
      >
        {/* Active Indicator Line */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-red-600 rounded-r-full shadow-sm"></div>
        )}
        
        <div className="flex items-center gap-3 relative z-10">
           <div className={`
             p-1.5 rounded-lg transition-colors duration-300
             ${isActive ? 'bg-white text-red-600 shadow-sm' : 'bg-transparent group-hover:bg-white group-hover:shadow-sm'}
             ${isDarkMode && !isActive ? 'group-hover:bg-slate-700' : ''}
           `}>
             <item.icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
           </div>
           <span>{item.name}</span>
        </div>
        
        {isActive && <ChevronRight className="w-4 h-4 text-red-400 opacity-50" />}
      </button>
    );
  };

  return (
    <nav className={`w-full flex flex-col h-full border-r border-slate-100/80 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
      {/* Header / Logo */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg shadow-red-200 text-white">
              <Package2 className="w-6 h-6" />
            </div>
            <div>
              <span className={`block text-lg font-extrabold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Abreco</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Portal</span>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Decorative Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6 opacity-50"></div>
      </div>

      <div className="flex-grow overflow-y-auto px-4 pb-4 custom-scrollbar space-y-8">
        <div>
          <h6 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 pl-2">Main Menu</h6>
          <div className="space-y-0.5">
            {navItems.map((item) => <NavLink key={item.id} item={item} />)}
          </div>
        </div>
        
        <div>
          <div className={`h-px w-full mb-6 mx-2 w-[90%] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
          <h6 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 pl-2">Preferences</h6>
          <div className="space-y-0.5">
            {toolItems.map((item) => <NavLink key={item.id} item={item} />)}
          </div>
        </div>
        
        {/* Ad Box for visual flair */}
        <div className="mt-auto pt-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 text-white relative overflow-hidden group cursor-pointer border border-slate-700">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
              <div className="relative z-10">
                <h5 className="font-bold text-sm mb-1">Need Help?</h5>
                <p className="text-[10px] text-slate-300 mb-3">Contact our 24/7 support team.</p>
                <button className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors w-full text-center">
                  Get Support
                </button>
              </div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const Header = ({ onMenuClick, onLogout, currentView, showToast, language, setLanguage, isDarkMode, setIsDarkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const notifications = [
    { id: 1, text: 'Your order #ORD-2931 is out for delivery.', time: '2h ago', read: false },
    { id: 2, text: 'Invoice #INV-900 is overdue.', time: 'Yesterday', read: false },
    { id: 3, text: 'Service Request SR-101 approved.', time: '2 days ago', read: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <header className={`shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-white'}`}>
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className={`lg:hidden p-2 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className={`text-xl sm:text-2xl font-bold capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {currentView === 'kyc' ? 'KYC Documents' : currentView.replace('-', ' ')}
        </h1>
      </div>

      {/* Center Search - Visible on Desktop */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
         <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
         <input 
           type="text" 
           placeholder="Search..." 
           className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-red-500 transition-all ${
             isDarkMode 
               ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
               : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
           }`}
         />
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
        {/* Search Mobile Trigger */}
        <button className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
           <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language Selector */}
        <div className="relative group">
           <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
             <Globe className="w-5 h-5" />
           </button>
           <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 hidden group-hover:block z-50 overflow-hidden">
              <button onClick={() => setLanguage('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 flex items-center justify-between">
                English {language === 'en' && <Check className="w-3 h-3 text-green-600" />}
              </button>
              <button onClick={() => setLanguage('ar')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 flex items-center justify-between">
                Arabic {language === 'ar' && <Check className="w-3 h-3 text-green-600" />}
              </button>
           </div>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
             onClick={() => setIsNotifOpen(!isNotifOpen)}
             className={`p-2 rounded-lg relative transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
          </button>
          
          {isNotifOpen && (
             <div className="absolute top-full end-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-30 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                <div className="p-3 border-b border-slate-50 bg-slate-50 flex justify-between items-center">
                   <span className="text-sm font-bold text-slate-800">Notifications</span>
                   <button onClick={() => showToast("All marked as read", "success")} className="text-xs text-blue-600 hover:underline">Mark all read</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                   {notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                         <p className="text-sm text-slate-700">{n.text}</p>
                         <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </div>
                   ))}
                </div>
                <button className="w-full py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">View All</button>
             </div>
          )}
        </div>
        
        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button className="flex items-center group" onClick={() => setIsDropdownOpen(prev => !prev)}>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border-2 border-transparent group-hover:border-red-500 transition-all">
              AC
            </div>
            <div className="ms-3 hidden sm:block text-start">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Abreco Customer</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full end-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-20 animate-in fade-in zoom-in-95 duration-200">
              <button onClick={onLogout} className="flex items-center w-full text-start px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg">
                <LogOut className="w-4 h-4 me-2" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- APP ROOT
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export default function App() {
  const [userState, setUserState] = useState('loggedOut'); 
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    setUserState('loggedOut');
    setCurrentView('dashboard');
    setLanguage('en');
    setNeedsPasswordChange(false);
    showToast("Logged out successfully", "info");
  };

  const commonProps = { showToast };

  // Render Logic
  if (userState === 'loggedOut') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <LoginScreen 
          setUserState={setUserState}
          setCurrentView={setCurrentView}
          setNeedsPasswordChange={setNeedsPasswordChange}
          language={language}
          setLanguage={setLanguage}
          showToast={showToast}
        />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  // Handle restricted states (Pending Approval / Pending Docs)
  if (userState === 'pendingApproval' || userState === 'pendingDocuments') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <BlockingStatusPage 
          status={userState} 
          onLogout={handleLogout} 
          setUserState={setUserState}
        />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  const MainContent = () => {
    switch (currentView) {
      case 'orders': return <OrdersPage {...commonProps} />;
      case 'buy-again': return <BuyAgainPage {...commonProps} />;
      case 'invoices': return <InvoicesPage {...commonProps} />;
      case 'services': return <RecentServiceWidget {...commonProps} />; 
      case 'financials': return <FinancialsPage {...commonProps} />;
      case 'saved-items': return <SavedItemsPage {...commonProps} />;
      case 'returns': return <ReturnsPage {...commonProps} />;
      case 'kyc': return <KYCPage {...commonProps} />;
      case 'settings': return <AccountSettingsPage {...commonProps} />;
      case 'dashboard':
      default: return <DashboardView setCurrentView={setCurrentView} {...commonProps} />;
    }
  };

  return (
    <div className={`flex h-screen w-full font-inter transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="hidden lg:flex w-64 flex-shrink-0">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} isDarkMode={isDarkMode} />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div className={`fixed top-0 start-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}`}>
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} onClose={() => setIsSidebarOpen(false)} isDarkMode={isDarkMode} />
      </div>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onLogout={handleLogout} 
          currentView={currentView} 
          showToast={showToast} 
          language={language}
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
          <MainContent />
        </div>
      </main>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}