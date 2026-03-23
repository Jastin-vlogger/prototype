"use client";

import React, { useState, useMemo } from 'react';
import { 
  Users, DollarSign, Calendar, LogOut, Bell, FileText, 
  Shield, Upload, Download, CheckCircle, AlertCircle, 
  Building, ChevronRight, FileBadge, UserPlus, 
  Menu, X, Home, Network, Target, MapPin, 
  Search, Plus, Clock, CalendarDays, Wallet, CreditCard,
  Briefcase, Settings, BarChart3, Fingerprint, FileArchive, ChevronDown,
  Package, LayoutDashboard, UserCheck, FileBox, HelpCircle, ChevronLeft,
  FileMinus, FilePlus, FileSignature, User, RefreshCw, XCircle, Wrench,
  TrendingUp, History, Globe
} from 'lucide-react';

// --- ENTERPRISE MOCK DATA ---
const COMPANIES = ['Kaizen Global Holdings', 'Kaizen Tech FZCO'];
const BASES = ['Dubai (HQ)', 'Abu Dhabi', 'Sharjah Freezone', 'Remote'];

const OFFBOARDING_STEPS = [
  'Resignation Letter', 
  'Asset Handover', 
  'Exit Interview', 
  'Loan Settlement', 
  'Final Settlement', 
  'Visa Cancellation',
  'Job handover'
];

const ONBOARDING_STEPS = [
  'Document Collection', 'Contract Signing', 'IT Asset Allocation', 
  'Orientation', 'Work Setup'
];

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-001', name: 'John Doe', role: 'Employee', status: 'Probation',
    company: 'Kaizen Tech FZCO', department: 'Engineering',
    visaBase: 'Dubai (HQ)', workBase: 'Sharjah Freezone',
    baseSalary: 6000, probationEndDate: '2026-03-15', probationIncrement: 1500,
    probationConfirmed: false,
    leavePolicy: { type: 'Monthly', rate: 1, balance: 5 },
    shift: { name: 'Standard Day', weekends: ['Saturday', 'Sunday'] },
    loans: { advance: 500, fixed: 0, history: [] },
    incrementHistory: [
      { date: '2024-01-01', amount: 500, type: 'Annual Review', previousSalary: 5500, newSalary: 6000 }
    ],
    labourCards: ['LC-847294', 'LC-112394'],
    bankDetails: { bank: 'Emirates NBD', iban: 'AE123456789' }
  },
  {
    id: 'EMP-002', name: 'Jane Smith', role: 'HR Admin', status: 'Active',
    company: 'Kaizen Global Holdings', department: 'Human Resources',
    visaBase: 'Dubai (HQ)', workBase: 'Dubai (HQ)',
    baseSalary: 12000, probationEndDate: '2024-01-15', probationIncrement: 0,
    probationConfirmed: true,
    leavePolicy: { type: 'Yearly', rate: 30, balance: 22 },
    shift: { name: 'Standard Day', weekends: ['Saturday', 'Sunday'] },
    loans: { advance: 0, fixed: 200, history: [] },
    incrementHistory: [],
    labourCards: ['LC-553211'],
    bankDetails: { bank: 'ADCB', iban: 'AE987654321' }
  },
  {
    id: 'EMP-003', name: 'Mike Johnson', role: 'Employee', status: 'Offboarding',
    company: 'Kaizen Tech FZCO', department: 'Sales',
    visaBase: 'Abu Dhabi', workBase: 'Abu Dhabi',
    baseSalary: 7000, offboardingStep: 2, // 0-indexed
    leavePolicy: { type: 'Yearly', rate: 30, balance: 10 },
    shift: { name: 'Flexible', weekends: ['Sunday'] },
    loans: { advance: 0, fixed: 0, history: [] },
    incrementHistory: [],
    labourCards: ['LC-998877'],
    bankDetails: { bank: 'Mashreq', iban: '' }
  },
  {
    id: 'EMP-004', name: 'Sarah Connor', role: 'Employee', status: 'Onboarding',
    company: 'Kaizen Global Holdings', department: 'Marketing',
    visaBase: 'Dubai (HQ)', workBase: 'Dubai (HQ)',
    baseSalary: 8000, onboardingStep: 1, // 0-indexed
    leavePolicy: { type: 'Monthly', rate: 1, balance: 0 },
    shift: { name: 'Standard Day', weekends: ['Saturday', 'Sunday'] },
    loans: { advance: 0, fixed: 0, history: [] },
    incrementHistory: [],
    labourCards: [], bankDetails: { bank: '', iban: '' }
  },
  {
    id: 'EMP-005', name: 'David Miller', role: 'Employee', status: 'Onboarding',
    company: 'Kaizen Tech FZCO', department: 'Engineering',
    visaBase: 'Abu Dhabi', workBase: 'Abu Dhabi',
    baseSalary: 9500, onboardingStep: 3, // 0-indexed
    leavePolicy: { type: 'Yearly', rate: 30, balance: 0 },
    shift: { name: 'Flexible', weekends: ['Saturday', 'Sunday'] },
    loans: { advance: 0, fixed: 0, history: [] },
    incrementHistory: [],
    labourCards: [], bankDetails: { bank: '', iban: '' }
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'reminder', text: 'EMP-001 (John Doe) probation ended on Mar 15. HR Confirmation required to apply AED 1500 increment.', target: 'HR Admin' },
  { id: 2, type: 'birthday', text: '🎂 Upcoming Birthday: Jane Smith on Mar 25.', target: 'All' },
  { id: 3, type: 'alert', text: 'Abu Dhabi Branch: Required IT maintenance this weekend.', target: 'Abu Dhabi' }
];

const POLICIES = [
  { id: 1, title: 'Code of Conduct 2026', type: 'Company Policy' },
  { id: 2, title: 'Leave & Attendance Policy', type: 'HR Policy' },
  { id: 3, title: 'IT Asset Acceptable Use', type: 'Internal Guideline' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const login = (role) => {
    const user = employees.find(e => e.role === role);
    setCurrentUser(user);
    setActiveTab('Dashboard');
  };

  if (!currentUser) return <LoginScreen onLogin={login} />;

  const isAdmin = currentUser.role === 'System Admin';
  const isHR = currentUser.role === 'HR Admin' || isAdmin;

  const MENU_ITEMS = [
    { group: 'Main', items: [
      { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'Employees', icon: Users, label: 'Employees', reqHR: true },
      { id: 'Onboarding', icon: UserPlus, label: 'Onboarding', reqHR: true },
      { id: 'Offboarding', icon: LogOut, label: 'Offboarding', reqHR: true },
      { id: 'Payroll', icon: DollarSign, label: 'Payroll', reqHR: true },
      { id: 'Loans', icon: Wallet, label: 'Loan Management', reqHR: true },
      { id: 'Appraisal', icon: Target, label: 'Salary Increment & Appraisal Management', reqHR: true },
      { id: 'Attendance', icon: Clock, label: 'Attendance' },
      { id: 'Documents', icon: FileText, label: 'Documents' },
      { id: 'Assets', icon: Package, label: 'Assets' },
      { id: 'MyRequests', icon: FileSignature, label: 'My Requests' },
      { id: 'Reports', icon: BarChart3, label: 'Reports', reqHR: true },
      { id: 'Masters', icon: Settings, label: 'Masters', reqAdmin: true }
    ]}
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex font-sans text-slate-800">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] text-slate-300 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            {/* Kaizen Logo */}
            <div className="flex items-end gap-1">
              <div className="w-2 h-3 bg-[#F1C40F] rounded-sm"></div>
              <div className="w-2 h-5 bg-[#D4AF37] rounded-sm"></div>
              <div className="w-2 h-7 bg-[#B8860B] rounded-sm"></div>
            </div>
            <span className="font-black text-white text-xl tracking-tight uppercase ml-1">Kaizen</span>
          </div>
          <button className="hidden lg:flex w-6 h-6 bg-white text-slate-900 rounded items-center justify-center hover:bg-slate-200 transition">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {MENU_ITEMS[0].items.map(item => {
            if (item.reqAdmin && !isAdmin) return null;
            if (item.reqHR && !isHR) return null;
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-[#D4AF37]' : 'opacity-70'} />
                  {item.label}
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button onClick={() => setCurrentUser(null)} className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl transition-colors text-sm font-medium">
            <LogOut size={18} className="opacity-70" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 p-4 lg:px-8 flex justify-between items-center shrink-0 z-10 sticky top-0 h-20">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-600 hover:text-[#D4AF37]">
              <Menu size={24} />
            </button>
            
            {/* Main Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 w-full max-w-2xl focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#FDF9ED] transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees, documents, assets..." 
                className="bg-transparent outline-none w-full text-sm font-medium text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-100 transition relative">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-slate-50 rounded-full"></span>
            </button>

            {/* Profile Badge */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-1 pr-4 py-1 cursor-pointer hover:bg-slate-100 transition">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="leading-tight hidden sm:block">
                <p className="text-xs font-bold text-slate-800">Welcome, {currentUser.name}</p>
                <p className="text-[10px] text-slate-500 font-medium">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          {toast && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-top-4 border border-slate-700">
              <CheckCircle size={18} className="text-[#D4AF37] shrink-0" />
              <span className="text-sm font-bold">{toast}</span>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {activeTab === 'Dashboard' && <DashboardView user={currentUser} employees={employees} setEmployees={setEmployees} isHR={isHR} showToast={showToast} />}
            {activeTab === 'Announcements' && <CommunicationView user={currentUser} notifications={notifications} showToast={showToast} />}
            {activeTab === 'Employees' && <EmployeeDirectory employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {activeTab === 'Onboarding' && <OnboardingView employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {activeTab === 'Attendance' && <AttendanceView employees={employees} showToast={showToast} />}
            {activeTab === 'Documents' && <DocumentLibraryView showToast={showToast} />}
            {activeTab === 'Assets' && <AssetsView showToast={showToast} />}
            {activeTab === 'Leave' && <LeaveManagement user={currentUser} employees={employees} isHR={isHR} showToast={showToast} />}
            {activeTab === 'Payroll' && <PayrollManagement employees={employees} showToast={showToast} />}
            {activeTab === 'Loans' && <LoanManagement employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {activeTab === 'MyRequests' && <MyRequestsView showToast={showToast} />}
            {activeTab === 'Offboarding' && <OffboardingView employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {activeTab === 'Appraisal' && <AppraisalView employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {activeTab === 'SelfService' && <SelfService user={currentUser} showToast={showToast} />}
            {activeTab === 'Policies' && <PoliciesView />}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- AUTH ---
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('admin@kaizengroup.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin')) {
      onLogin('HR Admin');
    } else {
      onLogin('Employee');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col md:flex-row max-w-3xl w-full rounded-[1.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
        
        {/* Left Side: Branding */}
        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            {/* Gold Upward Trend Logo for Kaizen */}
            <div className="flex items-end gap-1.5">
              <div className="w-3 h-4 bg-[#F1C40F] rounded-sm shadow-sm"></div>
              <div className="w-3 h-8 bg-[#D4AF37] rounded-sm shadow-sm"></div>
              <div className="w-3 h-12 bg-[#B8860B] rounded-sm shadow-sm"></div>
            </div>
            <span className="text-4xl font-black text-[#B8860B] tracking-tight uppercase ml-1">Kaizen</span>
          </div>
          
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-2 text-center">
            KAIZEN GROUP <span className="text-[#D4AF37] italic">HRM</span>
          </h1>
          <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em] mt-3 font-bold text-center">
            Enterprise Master Access
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 bg-[#131927] p-10 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-8">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e2638] border border-[#D4AF37]/50 text-white placeholder-slate-500 text-sm rounded-xl py-3.5 pl-4 pr-12 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" 
                placeholder="Email" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-600/30 p-1.5 rounded-lg flex items-center justify-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e2638] border border-slate-700/50 text-white placeholder-slate-500 text-sm rounded-xl py-3.5 px-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" 
                placeholder="Password" 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#996515] text-white font-bold py-3.5 rounded-xl shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] transition-all uppercase tracking-wider text-sm mt-6"
            >
              Login
            </button>
          </form>
          
          <p className="text-slate-500 text-xs mt-6 text-center">
            Demo: <span className="text-[#D4AF37] cursor-pointer" onClick={() => setEmail('admin@kaizengroup.com')}>admin@</span> or <span className="text-[#D4AF37] cursor-pointer" onClick={() => setEmail('employee@kaizengroup.com')}>employee@</span>
          </p>
        </div>
        
      </div>
    </div>
  );
}

// --- VIEWS ---

function DashboardView({ user, employees, setEmployees, isHR, showToast }) {
  if (!isHR) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, {user.name}</h1>
          <p className="text-slate-500 text-sm">Access your self-service portal, view policies, or manage your requests.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">My Leave Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#D4AF37]">{user.leavePolicy.balance}</span>
              <span className="text-sm font-bold text-slate-500">Days</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">My Shift</span>
            <span className="text-xl font-black text-slate-800">{user.shift.name}</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Current Base Pay</span>
            <span className="text-2xl font-black text-slate-800">AED {user.baseSalary}</span>
          </div>
        </div>
      </div>
    );
  }

  // Exact Match for the Admin Dashboard layout in the provided image
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      
      {/* 4 Top Highlight Cards - Keeping the screenshot specific background colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blue Card */}
        <div className="bg-[#3b82f6] rounded-[2rem] p-6 text-center text-white relative shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)] transform transition hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Users size={20} className="text-white opacity-90" />
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">Total Employees</h3>
          <p className="text-4xl font-black mb-1">{employees.length}</p>
          <p className="text-[10px] italic opacity-80">+0 This Month</p>
        </div>

        {/* Red Card */}
        <div className="bg-[#e11d48] rounded-[2rem] p-6 text-center text-white relative shadow-[0_15px_30px_-10px_rgba(225,29,72,0.5)] transform transition hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <AlertCircle size={20} className="text-white opacity-90" />
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">Documents Expiring</h3>
          <p className="text-4xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">This Month</p>
        </div>

        {/* Light Blue Card */}
        <div className="bg-[#4f46e5] rounded-[2rem] p-6 text-center text-white relative shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] transform transition hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Clock size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">Pending Approvals</h3>
          <p className="text-4xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0 Urgent</p>
        </div>

        {/* Dark/Black Card */}
        <div className="bg-[#0f172a] rounded-[2rem] p-6 text-center text-white relative shadow-[0_15px_30px_-10px_rgba(15,23,42,0.5)] transform transition hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Package size={20} className="text-white opacity-90" />
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">Assets In Service</h3>
          <p className="text-4xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0 Due</p>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => showToast('Opening Employee Form')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#D4AF37] hover:bg-[#FDF9ED] text-slate-700 py-3.5 px-4 rounded-xl text-sm font-bold transition">
            <UserPlus size={18} className="text-[#D4AF37]" /> Add Employee
          </button>
          <button onClick={() => showToast('Navigating to Payroll')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#D4AF37] hover:bg-[#FDF9ED] text-slate-700 py-3.5 px-4 rounded-xl text-sm font-bold transition">
            <DollarSign size={18} className="text-[#D4AF37]" /> Process Payroll
          </button>
          <button onClick={() => showToast('Opening Document Vault')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#D4AF37] hover:bg-[#FDF9ED] text-slate-700 py-3.5 px-4 rounded-xl text-sm font-bold transition">
            <FileText size={18} className="text-[#D4AF37]" /> View Documents
          </button>
          <button onClick={() => showToast('Generating Master Report')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#D4AF37] hover:bg-[#FDF9ED] text-slate-700 py-3.5 px-4 rounded-xl text-sm font-bold transition">
            <BarChart3 size={18} className="text-[#D4AF37]" /> Generate Report
          </button>
        </div>
      </div>

      {/* Banner Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Blue Banner */}
        <div className="bg-[#3b82f6] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-white">
            <FileMinus size={18} className="opacity-90" />
            <span className="font-bold text-sm">Company Document Expiries</span>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-4 rounded-lg transition backdrop-blur-sm border border-white/10">
            View All
          </button>
        </div>

        {/* Orange Banner */}
        <div className="bg-[#ea580c] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-white">
            <AlertCircle size={18} className="opacity-90" />
            <span className="font-bold text-sm">Employee Visa / ID Expiries</span>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-4 rounded-lg transition backdrop-blur-sm border border-white/10">
            View All
          </button>
        </div>

        {/* Yellow Banner */}
        <div className="bg-[#d97706] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-white">
            <Clock size={18} className="opacity-90" />
            <span className="font-bold text-sm">Pending Approvals</span>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-4 rounded-lg transition backdrop-blur-sm border border-white/10">
            View All
          </button>
        </div>

        {/* Green Banner */}
        <div className="bg-[#16a34a] rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-white">
            <CalendarDays size={18} className="opacity-90" />
            <span className="font-bold text-sm">Today's Attendance</span>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-4 rounded-lg transition backdrop-blur-sm border border-white/10">
            View Details
          </button>
        </div>
      </div>

    </div>
  );
}

function CommunicationView({ user, notifications, showToast }) {
  const isHR = user.role === 'HR Admin';
  const relevantAlerts = notifications.filter(n => 
    n.target === 'All' || n.target === user.workBase || n.target === user.company || (isHR && n.target === 'HR Admin')
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">Announcements & Alerts</h2>
        {isHR && (
          <button className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">+ New Broadcast</button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {relevantAlerts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No active announcements for your cluster.</div>
        ) : (
          relevantAlerts.map((n, i) => (
            <div key={n.id} className={`p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50 transition`}>
              <div className="w-12 h-12 rounded-2xl bg-[#FDF9ED] text-[#B8860B] flex items-center justify-center shrink-0">
                <Bell size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                    Target: {n.target}
                  </span>
                </div>
                <p className="text-slate-800 font-medium">{n.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EmployeeDirectory({ employees, setEmployees, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const confirmProbation = (id) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, probationConfirmed: true, status: 'Active' } : emp
    ));
    showToast('Probation completion confirmed. Updated salary will reflect in next payroll.');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto relative">
      {showForm && <EmployeeForm onClose={() => setShowForm(false)} onSave={() => {setShowForm(false); showToast('Employee successfully onboarded.');}} />}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and view all employee information</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 text-sm shadow-sm">
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* Filter & Action Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or email..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D4AF37] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%0-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Sales</option>
            </select>
          </div>
          <div className="w-full md:w-56">
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D4AF37] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%0-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]">
              <option>All Branches</option>
              <option>Dubai (HQ)</option>
              <option>Abu Dhabi</option>
              <option>Sharjah Freezone</option>
            </select>
          </div>
          <div className="w-full md:w-40">
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D4AF37] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%0-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_1rem_center]">
              <option>All Status</option>
              <option>Active</option>
              <option>Probation</option>
              <option>Offboarding</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col gap-1">
            <button className="text-[#D4AF37] flex items-center gap-1.5 text-sm font-medium hover:underline">
              <Upload size={16} /> Import
            </button>
            <span className="text-xs text-slate-400">Showing {employees.length} Employees</span>
          </div>
          <button className="text-[#D4AF37] flex items-center gap-1.5 text-sm font-medium hover:underline">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#D4AF37] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Employee</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Join Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                    No employee available
                  </td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FDF9ED] text-[#B8860B] flex items-center justify-center font-bold text-sm shrink-0">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{emp.name}</p>
                          <p className="text-[11px] text-slate-500">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {emp.department}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {emp.name.split(' ')[0].toLowerCase()}@kaizengroup.com
                      <p className="text-[11px] text-slate-400 mt-0.5">+971 50 123 4567</p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {emp.probationEndDate ? new Date(new Date(emp.probationEndDate).getTime() - (180 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '01 Jan 2024'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide border w-fit ${
                          emp.status === 'Probation' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                          emp.status === 'Offboarding' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {emp.status}
                        </span>
                        {emp.status === 'Probation' && new Date() >= new Date(emp.probationEndDate) && !emp.probationConfirmed && (
                          <span className="text-[9px] text-red-500 font-bold uppercase animate-pulse flex items-center gap-1">
                            <AlertCircle size={10} /> Conf. Required
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {emp.status === 'Probation' && !emp.probationConfirmed && (
                          <button 
                            onClick={() => confirmProbation(emp.id)}
                            className="bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-700 transition shadow-sm"
                            title="Confirm Probation Completion"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}
                        <button className="text-slate-400 hover:text-[#D4AF37] p-1 rounded-lg hover:bg-[#FDF9ED] transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EmployeeForm({ onClose, onSave }) {
  const [labourCards, setLabourCards] = useState([{ no: '', expiry: '' }]);

  const addLabourCard = () => setLabourCards([...labourCards, { no: '', expiry: '' }]);
  const removeLabourCard = (index) => setLabourCards(labourCards.filter((_, i) => i !== index));

  // Reusable Input Field Component
  const InputField = ({ label, placeholder, type = "text" }) => (
    <div>
      <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" />
    </div>
  );

  // Reusable Select Field Component
  const SelectField = ({ label, options }) => (
    <div>
      <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="relative">
        <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none transition-all">
          {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-50 flex justify-center items-start pt-10 pb-10 sm:p-10 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[700px] flex flex-col relative my-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-slate-800">Add Employee</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-8 py-6 space-y-8">
          
          {/* Basic Information */}
          <div>
            <div className="border-b border-slate-100 pb-2 mb-5">
              <h3 className="text-base font-medium text-slate-800">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="EMPLOYEE ID" placeholder="Enter Employee ID" />
              <InputField label="EMPLOYEE NAME" placeholder="Enter Full Name" />
              
              <SelectField label="COMPANY" options={['Select Company', 'Kaizen Global Holdings', 'Kaizen Tech FZCO']} />
              <SelectField label="ROLE" options={['Select Role', 'Employee', 'Manager', 'HR Admin', 'System Admin']} />
              
              <SelectField label="DEPARTMENT" options={['Select Department', 'Engineering', 'Human Resources', 'Sales', 'Finance']} />
              <SelectField label="BRANCH" options={['Select Branch', 'Dubai (HQ)', 'Abu Dhabi', 'Sharjah Freezone', 'Remote']} />
              <SelectField label="DESIGNATION" options={['Select Designation', 'Software Engineer', 'HR Specialist', 'Sales Executive']} />
              
              <InputField label="EMAIL" placeholder="email@company.com" type="email" />
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">PHONE NUMBER</label>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition-all bg-white">
                  <div className="bg-slate-100 px-3 py-2.5 text-sm text-slate-700 font-medium border-r border-slate-200">+971</div>
                  <input type="text" placeholder="50 123 4567" className="w-full px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none" />
                </div>
              </div>
              
              <SelectField label="STATUS" options={['Onboarding', 'Active', 'Inactive', 'On Leave', 'Probation']} />
              <SelectField label="SHIFT" options={['Select Shift', 'Standard Day', 'Night Shift', 'Flexible']} />
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <div className="border-b border-slate-100 pb-2 mb-5">
              <h3 className="text-base font-medium text-slate-800">Employment Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="JOINING DATE" type="date" />
              <SelectField label="EMPLOYEE TYPE" options={['Select Employee Type', 'Full-Time', 'Part-Time', 'Contract']} />
              
              {/* Dynamic Multiple Labour Cards */}
              <div className="col-span-full space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold text-[#B8860B] uppercase tracking-widest">Labour Cards</label>
                  <button type="button" onClick={addLabourCard} className="text-[#D4AF37] flex items-center gap-1 text-[10px] font-black uppercase hover:underline">
                    <Plus size={14} /> Add Card
                  </button>
                </div>
                {labourCards.map((card, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 relative group">
                    <InputField label={`LABOR CARD NO ${idx + 1}`} placeholder="Enter Card No" />
                    <InputField label="EXPIRY DATE" type="date" />
                    {labourCards.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeLabourCard(idx)}
                        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <InputField label="AGENT ID (WPS)" placeholder="Enter Agent ID" />
              <SelectField label="ACCOMMODATION" options={['Select Option', 'Company Provided', 'Not Provided']} />
              
              <InputField label="BASIC SALARY (AED)" placeholder="0.00" type="number" />
              <InputField label="ALLOWANCE (AED)" placeholder="0.00" type="number" />
              
              <InputField label="HRA (AED)" placeholder="0.00" type="number" />
              <InputField label="TOTAL SALARY (AED)" placeholder="0.00" type="number" />
              
              <InputField label="PROBATION END DATE" type="date" />
              <InputField label="INCREMENT AFTER PROBATION (AED)" placeholder="0.00" type="number" />

              <InputField label="VISA NO" placeholder="Enter Visa No" />
              <InputField label="VISA FILE NO" placeholder="Enter Visa File No" />
              
              <InputField label="VISA EXPIRY" type="date" />
              <SelectField label="VISA COMPANY" options={['Select Company', 'Kaizen Global Holdings', 'Kaizen Tech FZCO']} />
              
              <SelectField label="WORK PERMIT COMPANY" options={['Select Company', 'Kaizen Global Holdings', 'Kaizen Tech FZCO']} />
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <div className="border-b border-slate-100 pb-2 mb-5">
              <h3 className="text-base font-medium text-slate-800">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="DATE OF BIRTH" type="date" />
              <InputField label="PERSONAL ID (14 DIGIT)" placeholder="0000 0000 0000 00" />
              
              <InputField label="NATIONALITY" placeholder="Enter Nationality" />
              <InputField label="UAE ADDRESS" placeholder="Enter Address" />
              
              <InputField label="PASSPORT NO" placeholder="Enter Passport No" />
              <InputField label="PASSPORT EXPIRY" type="date" />
              
              <InputField label="EMIRATES ID NO" placeholder="Enter Emirates ID No" />
              <InputField label="EMIRATES ID EXPIRY" type="date" />
            </div>
          </div>

          {/* Bank Information */}
          <div>
            <div className="border-b border-slate-100 pb-2 mb-5">
              <h3 className="text-base font-medium text-slate-800">Bank Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <InputField label="BANK NAME" placeholder="e.g. Emirates NBD" />
              <InputField label="IBAN" placeholder="AE00 0000 0000 0000 0000 00" />
              
              <InputField label="ACCOUNT NUMBER" placeholder="Enter Account Number" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-xl z-10">
          <button type="button" onClick={onClose} className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={onSave} className="px-5 py-2.5 bg-[#D4AF37] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#B8860B] transition-colors">
            Add Employee
          </button>
        </div>

      </div>
    </div>
  );
}

function AttendanceView({ employees, showToast }) {
  const [viewMode, setViewMode] = useState('Monthly View');
  const [selectedDate, setSelectedDate] = useState('2026-03-23');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Helper to generate days for monthly view
  const getDaysInMonth = (monthStr, yearStr) => {
    const monthIndex = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr, 10);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = i + 1;
      const dayOfWeek = new Date(year, monthIndex, date).getDay();
      const dayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayOfWeek];
      // Highlight Sunday as the red weekend as shown in screenshot
      const isWeekend = dayOfWeek === 0; 
      return { date, dayName, isWeekend };
    });
  };

  const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Attendance Tracking</h2>
          <p className="text-sm text-slate-500 mt-1">Monitor employee attendance and shift management</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => showToast('Biometric data synced successfully.')} 
            className="flex-1 sm:flex-none bg-[#3b82f6] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <RefreshCw size={16} /> Sync Biometric
          </button>
          <button 
            onClick={() => showToast('Attendance report exported.')} 
            className="flex-1 sm:flex-none bg-[#3b82f6] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* View Toggles */}
      <div className="flex gap-3">
        <button 
          onClick={() => setViewMode('Daily View')} 
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition border ${
            viewMode === 'Daily View' 
              ? 'border-blue-300 bg-blue-50 text-[#3b82f6]' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
          }`}
        >
          Daily View
        </button>
        <button 
          onClick={() => setViewMode('Monthly View')} 
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition border ${
            viewMode === 'Monthly View' 
              ? 'border-blue-300 bg-blue-50 text-[#3b82f6]' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
          }`}
        >
          Monthly View
        </button>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {/* Present */}
        <div className="bg-[#16a34a] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(22,163,74,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <CheckCircle size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Present</h3>
          <p className="text-3xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0%</p>
        </div>
        
        {/* Late */}
        <div className="bg-[#ea580c] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(234,88,12,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <AlertCircle size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Late</h3>
          <p className="text-3xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0%</p>
        </div>
        
        {/* Absent */}
        <div className="bg-[#e11d48] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(225,29,72,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <XCircle size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Absent</h3>
          <p className="text-3xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0%</p>
        </div>
        
        {/* On Leave */}
        <div className="bg-[#f97316] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(249,115,22,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <CalendarDays size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">On Leave</h3>
          <p className="text-3xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">0%</p>
        </div>
        
        {/* Total */}
        <div className="bg-[#3b82f6] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)] transform transition hover:-translate-y-1 sm:col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Clock size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Total</h3>
          <p className="text-3xl font-black mb-1">0</p>
          <p className="text-[10px] italic opacity-80">Employees</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {viewMode === 'Daily View' ? (
            <>
              {/* Daily View Specific Filter First */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all" 
                />
              </div>
            </>
          ) : (
            <>
              {/* Monthly View Specific Filters First */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
                <div className="relative">
                  <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
                <div className="relative">
                  <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                    {['2024', '2025', '2026', '2027'].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {/* Common Company / Department Filters */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Companies</option>
                <option>Kaizen Global Holdings</option>
                <option>Kaizen Tech FZCO</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Work Based Company</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Work Based</option>
                <option>Kaizen Global Holdings</option>
                <option>Kaizen Tech FZCO</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Visa Based Company</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Visa Based</option>
                <option>Kaizen Global Holdings</option>
                <option>Kaizen Tech FZCO</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Human Resources</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Branch</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Branches</option>
                <option>Dubai (HQ)</option>
                <option>Abu Dhabi</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Shift</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                <option>All Shifts</option>
                <option>Standard Day</option>
                <option>Night Shift</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {viewMode === 'Daily View' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-white">
                  <option>All Statuses</option>
                  <option>Present</option>
                  <option>Late</option>
                  <option>Absent</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Search Name/ID..." 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all" 
            />
          </div>
        </div>
      </div>

      {/* Dynamic Data Table based on View Mode */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {viewMode === 'Daily View' ? (
          <>
            <div className="bg-[#3b82f6] p-4 border-b border-blue-600">
              <h3 className="text-white font-bold text-sm">Attendance Records - {selectedDate}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#2563eb] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-4 pl-6 font-semibold">Employee</th>
                    <th className="p-4 font-semibold">Shift</th>
                    <th className="p-4 font-semibold">Check In</th>
                    <th className="p-4 font-semibold">Check Out</th>
                    <th className="p-4 font-semibold">Work Hours</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-slate-500 font-medium">
                      No employees found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#3b82f6] p-4 border-b border-blue-600">
              <h3 className="text-white font-bold text-sm">Monthly Attendance - {selectedMonth} {selectedYear}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#2563eb] text-white text-[10px] font-bold uppercase">
                    <th className="p-3 pl-6 text-left border-r border-blue-400/30 sticky left-0 bg-[#2563eb] z-10 w-48">Employee</th>
                    <th className="p-3 text-center border-r border-blue-400/30 sticky left-48 bg-[#2563eb] z-10 w-16">Stats</th>
                    {daysInSelectedMonth.map(d => (
                      <th key={d.date} className={`p-1.5 text-center border-r border-blue-400/30 min-w-[32px] ${d.isWeekend ? 'bg-[#dc2626]' : ''}`}>
                        <div className="text-[11px] font-bold leading-tight">{d.date}</div>
                        <div className="text-[8px] font-normal opacity-90">{d.dayName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td colSpan={daysInSelectedMonth.length + 2} className="p-12 text-center text-slate-500 font-medium">
                      No records found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DocumentLibraryView({ showToast }) {
  const [viewMode, setViewMode] = useState('list');
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto relative">
      
      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-bold text-slate-800">Upload Company Document</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Document Name</label>
                  <input type="text" placeholder="e.g. Trade License" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Company</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                      <option>Select Company</option>
                      <option>Kaizen Global Holdings</option>
                      <option>Kaizen Tech FZCO</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Company Document Type</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                      <option>Select Type</option>
                      <option>Trade License</option>
                      <option>Tax Certificate</option>
                      <option>Establishment Card</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Location / Branch</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                      <option>Select Location</option>
                      <option>Dubai (HQ)</option>
                      <option>Abu Dhabi</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Issue Date (Optional)</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Expiry Date</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-slate-600 mb-3">Upload File (PDF/Image)</p>
                <div className="flex items-center gap-3">
                   <input type="file" className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-colors" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-center sm:justify-end gap-3 bg-white">
              <button onClick={() => setShowUploadModal(false)} className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                Cancel
              </button>
              <button onClick={() => { setShowUploadModal(false); showToast('Document uploaded successfully.'); }} className="px-5 py-2.5 bg-[#D4AF37] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#B8860B] transition-colors w-full sm:w-auto">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Library</h2>
          <p className="text-sm text-slate-500 mt-1">Manage company documents and track expiry dates</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          <Upload size={16} /> Upload Document
        </button>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Documents */}
        <div className="bg-[#2563eb] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <FileText size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Total Documents</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* Valid */}
        <div className="bg-[#16a34a] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(22,163,74,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <FileText size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Valid</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* Expiring Soon */}
        <div className="bg-[#ea580c] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(234,88,12,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <AlertCircle size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Expiring Soon</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* Expired */}
        <div className="bg-[#e11d48] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(225,29,72,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <AlertCircle size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90">Expired</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <button className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition focus:outline-none focus:border-[#D4AF37]">
              <Search size={18} />
            </button>
          </div>
          <div className="relative flex-1">
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#D4AF37] bg-white">
              <option>All Types</option>
              <option>Trade License</option>
              <option>Office Lease</option>
              <option>Insurance</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#D4AF37] bg-white">
              <option>All Status</option>
              <option>Valid</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-500">Showing 0 of 0 documents</span>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode('list')} 
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'list' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#D4AF37]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#2563eb] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Document</th>
                <th className="p-4 font-semibold">Company / Location</th>
                <th className="p-4 font-semibold">Issue Date</th>
                <th className="p-4 font-semibold">Expiry Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                  No documents found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Expiry Reminders Config Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 text-sm">
          <CalendarDays size={18} className="text-slate-500" /> Expiry Reminders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-200 rounded-xl p-5 hover:border-red-300 transition-colors">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Critical Alert</h4>
            <p className="text-sm text-slate-600 mb-3">Notify 7 days before expiry</p>
            <p className="text-xs text-slate-400">Send to: Admin, Department Head</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Warning Alert</h4>
            <p className="text-sm text-slate-600 mb-3">Notify 30 days before expiry</p>
            <p className="text-xs text-slate-400">Send to: Admin, Responsible Person</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 hover:border-[#D4AF37] transition-colors">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Early Warning</h4>
            <p className="text-sm text-slate-600 mb-3">Notify 60 days before expiry</p>
            <p className="text-xs text-slate-400">Send to: Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssetsView({ showToast }) {
  const [activeAlertTab, setActiveAlertTab] = useState('Warranty');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto relative">
      
      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-bold text-slate-800">Add Asset</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Asset Name *" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <input type="text" placeholder="Serial Number" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                
                <div className="relative">
                  <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                    <option>Select Asset Type *</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Vehicles</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                    <option>Select Category *</option>
                    <option>Laptops</option>
                    <option>Mobiles</option>
                    <option>Desks</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div>
                  <input type="text" placeholder="Location *" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <input type="text" placeholder="Sub Location" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>

                <div className="relative">
                  <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]">
                    <option>-- Select Custodian (Optional) --</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div>
                  <input type="text" placeholder="Department" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>

                <div>
                  <input type="number" placeholder="Purchase Cost (AED) *" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <input type="date" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>

                <div>
                  <input type="number" placeholder="Warranty Period (Years)" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <input type="date" className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-center sm:justify-end gap-3 bg-white">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                Cancel
              </button>
              <button onClick={() => { setShowAddModal(false); showToast('Asset added successfully.'); }} className="px-5 py-2.5 bg-[#D4AF37] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#B8860B] transition-colors w-full sm:w-auto">
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Asset Register</h2>
          <p className="text-sm text-slate-500 mt-1">Track and manage company assets and equipment</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => showToast('Import dialog opened.')}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            Import Assets
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <Plus size={16} /> Add Asset
          </button>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Assets */}
        <div className="bg-[#2563eb] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Package size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Total Assets</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* In Use */}
        <div className="bg-[#16a34a] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(22,163,74,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Package size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">In Use</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* Available */}
        <div className="bg-[#ea580c] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(234,88,12,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Package size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Available</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
        
        {/* Maintenance */}
        <div className="bg-[#e11d48] rounded-2xl p-6 text-center text-white shadow-[0_15px_30px_-10px_rgba(225,29,72,0.5)] transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <Wrench size={18} className="text-white opacity-90" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Maintenance</h3>
          <p className="text-3xl font-black mb-1">0</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:auto flex-1 max-w-3xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search assets by name or ID..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm" 
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-40">
            <div className="relative">
              <select className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 appearance-none focus:outline-none focus:border-[#D4AF37] shadow-sm bg-white">
                <option>All Types</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Vehicles</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 appearance-none focus:outline-none focus:border-[#D4AF37] shadow-sm bg-white">
                <option>All Status</option>
                <option>In Use</option>
                <option>Available</option>
                <option>Maintenance</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={() => showToast('Exporting assets list...')}
            className="text-[#16a34a] flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            <Download size={16} /> Export Assets
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 font-medium">Showing 0 of 0 assets</p>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#2563eb] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6 font-semibold">Asset Details</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Custodian</th>
                <th className="p-4 font-semibold">Purchase Info</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                  No assets found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Warranty & AMC Tracker */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col min-h-[200px]">
          <h3 className="font-bold text-slate-800 text-sm">Warranty & AMC Tracker</h3>
          <p className="text-xs text-slate-500 mb-6">Monitor warranty and maintenance contract expiries</p>
          
          <div className="flex-1 flex flex-col items-start justify-center">
            <Package size={24} className="text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-800">No assets with warranty information</p>
            <p className="text-xs text-slate-400 mt-1">Add warranty period when creating assets to track expiry</p>
          </div>
        </div>

        {/* Asset Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col min-h-[200px]">
          <h3 className="font-bold text-slate-800 text-sm">Asset Alerts</h3>
          <p className="text-xs text-slate-500 mb-6">Upcoming expiries and service due dates</p>
          
          <div className="flex gap-6 border-b border-slate-100 mb-6">
            <button 
              onClick={() => setActiveAlertTab('Warranty')}
              className={`pb-2 text-xs font-semibold transition-colors ${activeAlertTab === 'Warranty' ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Warranty
            </button>
            <button 
              onClick={() => setActiveAlertTab('Service Due')}
              className={`pb-2 text-xs font-semibold transition-colors ${activeAlertTab === 'Service Due' ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Service Due
            </button>
            <button 
              onClick={() => setActiveAlertTab('AMC')}
              className={`pb-2 text-xs font-semibold transition-colors ${activeAlertTab === 'AMC' ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              AMC
            </button>
          </div>

          <div className="flex-1 flex flex-col items-start justify-center">
            <CheckCircle size={20} className="text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-800">No {activeAlertTab.toLowerCase()} expiring soon</p>
            <p className="text-xs text-slate-400 mt-1">All assets have valid {activeAlertTab === 'Warranty' ? 'warranties' : activeAlertTab === 'AMC' ? 'contracts' : 'service dates'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaveManagement({ user, employees, isHR, showToast }) {
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [days, setDays] = useState(1);
  const [hasDoc, setHasDoc] = useState(false);
  const isProbation = user.status === 'Probation';

  const handleRequest = () => {
    // Sick leave > 1 day documentation rule
    if (leaveType === 'Sick Leave' && days > 1 && !hasDoc) {
      showToast('Consecutive sick leave requires medical documentation. Leave will be UNPAID from Day 2.');
      return;
    }
    
    let paidStatus = "Processed.";
    if (isProbation) {
        paidStatus = "Unpaid due to Probation Policy.";
    } else {
        // Apply tiered payment brackets
        if (days <= 15) paidStatus = "Status: Fully Paid.";
        else if (days <= 45) paidStatus = "Status: Half Paid.";
        else if (days <= 90) paidStatus = "Status: Unpaid.";
        else paidStatus = "Limit Exceeded (Max 90 days).";
    }

    showToast(`Leave application submitted for ${days} days. ${paidStatus}`);
    setDays(1); setHasDoc(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black text-slate-800">Leave Management</h2>

      {isProbation && !isHR && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
          <AlertCircle className="shrink-0 mt-0.5 text-orange-500" />
          <div>
            <p className="font-bold text-sm">Probation Policy Notice</p>
            <p className="text-xs mt-1">During probation, all approved leaves are legally treated as <strong className="uppercase">Unpaid Leave</strong>.</p>
          </div>
        </div>
      )}

      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-700">
        <h4 className="font-bold text-sm mb-4 flex items-center gap-2"><FileText size={18} className="text-[#D4AF37]"/> Leave Payment Rules</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong>Up to 15 Days:</strong> 
            <span className="text-emerald-400 block mt-1 font-bold">Fully Paid</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong>16 to 45 Days:</strong> 
            <span className="text-yellow-400 block mt-1 font-bold">Half Paid</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong>46 to 90 Days:</strong> 
            <span className="text-red-400 block mt-1 font-bold">Unpaid</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 italic">
          Documentation Policy: Consecutive sick leave ({'>'} 1 day) without a medical document is Unpaid from Day 2.
        </p>
      </div>

      {!isHR && (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Apply for Leave</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Leave Type</label>
                <select value={leaveType} onChange={e=>setLeaveType(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50 text-sm font-medium outline-none">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Consecutive Days</label>
                <input type="number" min="1" max="90" value={days} onChange={e=>setDays(Number(e.target.value))} className="w-full p-3 border rounded-xl bg-slate-50 text-sm font-medium" />
              </div>
            </div>

            {leaveType === 'Sick Leave' && days > 1 && (
              <div className="p-5 bg-red-50/50 border border-red-200 rounded-2xl space-y-4">
                <div className="flex gap-3 text-red-800 text-sm">
                  <AlertCircle size={20} className="shrink-0 text-red-500" />
                  <div>
                    <p className="font-bold">Medical Document Required</p>
                    <p className="text-xs">Consecutive sick leave for 2 or more days requires proof. If not attached, salary is deducted from the second day.</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-red-200 bg-white p-4 rounded-xl text-center text-red-500 hover:bg-red-50 transition cursor-pointer">
                  <Upload size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold">Upload Medical Certificate</p>
                </div>
                <label className="flex items-center gap-3 cursor-pointer bg-white p-3 border border-red-200 rounded-xl hover:bg-red-50 transition shadow-sm">
                  <input type="checkbox" checked={hasDoc} onChange={e => setHasDoc(e.target.checked)} className="w-5 h-5 rounded accent-red-600" />
                  <span className="text-sm font-bold text-slate-700">Document Attached</span>
                </label>
              </div>
            )}

            <button onClick={handleRequest} className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#D4AF37]/30 hover:bg-[#B8860B] transition-all">Submit Application</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PayrollManagement({ employees, showToast }) {
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [isGenerated, setIsGenerated] = useState(false);
  const [statusStep, setStatusStep] = useState(1);
  const [reportToggle, setReportToggle] = useState('Work Permit'); // New Report Mode State

  const handleGenerate = () => {
    setStatusStep(2);
    setTimeout(() => {
      setIsGenerated(true);
      setStatusStep(3);
      showToast(`Payroll successfully generated for ${selectedMonth}`);
    }, 800);
  };

  const calculateEffectiveSalary = (emp) => {
    const isProbationOver = new Date() >= new Date(emp.probationEndDate);
    if (isProbationOver && emp.probationConfirmed) {
      return emp.baseSalary + (emp.probationIncrement || 0);
    }
    return emp.baseSalary;
  };

  const totals = useMemo(() => {
    if (!isGenerated) return { basic: 0, allowances: 0, deductions: 0, net: 0 };
    return employees.reduce((acc, emp) => {
      const basic = calculateEffectiveSalary(emp);
      const allowances = basic * 0.4;
      const deductions = (emp.loans?.advance || 0) + (emp.loans?.fixed || 0);
      return {
        basic: acc.basic + basic,
        allowances: acc.allowances + allowances,
        deductions: acc.deductions + deductions,
        net: acc.net + (basic + allowances - deductions)
      };
    }, { basic: 0, allowances: 0, deductions: 0, net: 0 });
  }, [employees, isGenerated]);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payroll Processing</h2>
          <p className="text-sm text-slate-500 mt-1">Manage monthly salary processing and compliance</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm text-slate-700 font-medium"
          />
          <button 
            onClick={() => showToast('WPS ZIP Package generated: Separate files created for each Bank Account.')}
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium text-sm shadow-sm transition"
          >
            <Download size={16} /> Export WPS ZIP Package
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#3b82f6] rounded-2xl p-6 text-center text-white relative shadow-lg transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <DollarSign size={18} className="text-white" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">Total Basic Salary</h3>
          <p className="text-3xl font-black mb-1">{totals.basic.toLocaleString()} AED</p>
        </div>

        <div className="bg-[#16a34a] rounded-2xl p-6 text-center text-white relative shadow-lg transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <DollarSign size={18} className="text-white" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">Total Allowances</h3>
          <p className="text-3xl font-black mb-1">{totals.allowances.toLocaleString()} AED</p>
        </div>

        <div className="bg-[#e11d48] rounded-2xl p-6 text-center text-white relative shadow-lg transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <DollarSign size={18} className="text-white" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">Total Deductions</h3>
          <p className="text-3xl font-black mb-1">{totals.deductions.toLocaleString()} AED</p>
        </div>

        <div className="bg-[#4f46e5] rounded-2xl p-6 text-center text-white relative shadow-lg transform transition hover:-translate-y-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <DollarSign size={18} className="text-white" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">Net Payable</h3>
          <p className="text-3xl font-black mb-1">{totals.net.toLocaleString()} AED</p>
        </div>
      </div>

      {/* Payroll Status Stepper */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Payroll Status</h3>
            <p className="text-sm text-slate-500">Current processing status for {new Date(selectedMonth).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerated}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition ${isGenerated ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#D4AF37] hover:bg-[#B8860B] text-white'}`}
          >
            {isGenerated ? 'Payroll Generated' : 'Generate Payroll'}
          </button>
        </div>

        <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto mb-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-100 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#D4AF37] -z-10 transition-all duration-500" style={{ width: statusStep === 1 ? '0%' : statusStep === 2 ? '50%' : '100%' }}></div>

          <div className="flex items-center gap-3 bg-white pr-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${statusStep >= 1 ? 'bg-[#FDF9ED] text-[#D4AF37]' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <span className={`text-sm font-medium ${statusStep >= 1 ? 'text-[#D4AF37]' : 'text-slate-400'}`}>Draft</span>
          </div>

          <div className="flex items-center gap-3 bg-white px-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${statusStep >= 2 ? 'bg-[#FDF9ED] text-[#D4AF37]' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <span className={`text-sm font-medium ${statusStep >= 2 ? 'text-[#D4AF37]' : 'text-slate-400'}`}>Processing</span>
          </div>

          <div className="flex items-center gap-3 bg-white pl-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${statusStep >= 3 ? 'bg-[#D4AF37] text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
            <span className={`text-sm font-medium ${statusStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Completed</span>
          </div>
        </div>
      </div>

      {/* Employee Payroll Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header Row with Report Toggle */}
        <div className="bg-[#D4AF37] p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <h3 className="text-white font-bold text-lg">Employee Payroll Details</h3>
            <div className="flex bg-white/20 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <button 
                  onClick={() => setReportToggle('Work Permit')} 
                  className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${reportToggle === 'Work Permit' ? 'bg-white text-[#B8860B] shadow-sm' : 'text-white hover:bg-white/10'}`}
                >
                  Work Permit Report
                </button>
                <button 
                  onClick={() => setReportToggle('Work Visa')} 
                  className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${reportToggle === 'Work Visa' ? 'bg-white text-[#B8860B] shadow-sm' : 'text-white hover:bg-white/10'}`}
                >
                  Work Visa Report
                </button>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none border border-white/30 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm">
              Export Excel
            </button>
            <button className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm">
              Add Adjustments
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#B8860B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Employee</th>
                <th className="p-4">{reportToggle === 'Work Permit' ? 'Work Permit Company' : 'Work Visa Company'}</th>
                <th className="p-4">Basic Salary</th>
                <th className="p-4">Allowances</th>
                <th className="p-4">Deductions</th>
                <th className="p-4">Net Salary</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!isGenerated ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500 font-medium">
                    No payroll records found. Click to generate.
                  </td>
                </tr>
              ) : (
                employees.map(emp => {
                  const basic = calculateEffectiveSalary(emp);
                  const allowances = basic * 0.4;
                  const deductions = (emp.loans?.advance || 0) + (emp.loans?.fixed || 0);
                  const net = basic + allowances - deductions;

                  return (
                    <tr key={emp.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-slate-800 text-sm">{emp.name}</p>
                        <p className="text-[11px] text-slate-500">{emp.id}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700">
                        {reportToggle === 'Work Permit' ? emp.company : emp.visaBase}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700">
                        <div className="flex flex-col">
                          <span>{basic.toLocaleString()} AED</span>
                          {basic > emp.baseSalary && <span className="text-[9px] text-emerald-600 font-bold uppercase">(Probation Increment Applied)</span>}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-emerald-600">{allowances.toLocaleString()} AED</td>
                      <td className="p-4 text-sm font-medium text-red-500">{deductions > 0 ? `-${deductions.toLocaleString()}` : '0'} AED</td>
                      <td className="p-4 text-sm font-bold text-slate-800">{net.toLocaleString()} AED</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                            <button className="text-slate-400 hover:text-[#D4AF37] p-1.5 rounded-lg hover:bg-[#FDF9ED] transition" title="View Payslip">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                            <button 
                                onClick={() => showToast(`Total Annual CTC: ${(basic * 1.4 * 12).toLocaleString()} AED`)}
                                className="text-[10px] font-black text-[#D4AF37] hover:text-[#B8860B] transition-colors border border-[#D4AF37]/30 px-2 py-1 rounded-md uppercase tracking-tight"
                            >
                                View CTC
                            </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WPS Compliance Tools */}
      <div>
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 mt-8">
          <FileText size={18} className="text-slate-600" /> WPS Compliance Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            onClick={() => showToast('SIF ZIP Package created: Individual bank SIFs included.')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition cursor-pointer group"
          >
            <div className="flex justify-between items-start gap-4">
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#D4AF37] transition">Generate SIF ZIP</h4>
              <p className="text-xs text-slate-500 text-right leading-tight">ZIP package with separate bank files</p>
            </div>
          </div>
          
          <div 
            onClick={() => showToast('Work Visa Based Report generated for all clusters.')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition cursor-pointer group"
          >
            <div className="flex justify-between items-start gap-4">
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#D4AF37] transition">Work Visa Report</h4>
              <p className="text-xs text-slate-500 text-right leading-tight">Payroll report grouped by Visa Base Location</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition cursor-pointer group">
            <div className="flex justify-between items-start gap-4">
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#D4AF37] transition">MOL Report</h4>
              <p className="text-xs text-slate-500 text-right leading-tight">Ministry of Labour compliance</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition cursor-pointer group">
            <div className="flex justify-between items-start gap-4">
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#D4AF37] transition">History</h4>
              <p className="text-xs text-slate-500 text-right leading-tight">Past payroll transactions</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function MyRequestsView({ showToast }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
        <FileSignature size={28} className="text-[#D4AF37]" /> My Requests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-[#FDF9ED] text-[#B8860B] rounded-2xl flex items-center justify-center mb-6">
            <Calendar size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">Approve Leave</h3>
          <p className="text-xs text-slate-500 flex-1 mb-6 leading-relaxed">Check the current status of your submitted leave applications or view historical records.</p>
          <button onClick={() => showToast('Redirecting to Leave Status...')} className="w-full py-3 bg-[#D4AF37] text-white rounded-xl text-xs font-bold hover:bg-[#B8860B] transition-all shadow-sm">View Status</button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-[#FDF9ED] text-[#B8860B] rounded-2xl flex items-center justify-center mb-6">
            <DollarSign size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">Salary Advance</h3>
          <p className="text-xs text-slate-500 flex-1 mb-6 leading-relaxed">Submit a request for an immediate salary advance to be adjusted in the next payroll cycle.</p>
          <button onClick={() => showToast('Salary Advance request form opened.')} className="w-full py-3 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-sm">Request Now</button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-12 h-12 bg-[#FDF9ED] text-[#B8860B] rounded-2xl flex items-center justify-center mb-6">
            <Wallet size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">Loan</h3>
          <p className="text-xs text-slate-500 flex-1 mb-6 leading-relaxed">Apply for long-term fixed loans with manual or automatic monthly deduction options.</p>
          <button onClick={() => showToast('Loan application form opened.')} className="w-full py-3 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-sm">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

function AppraisalView({ employees, setEmployees, showToast }) {
  const [selectedId, setSelectedId] = useState('');
  const [incAmount, setIncAmount] = useState('');

  const selectedEmp = employees.find(e => e.id === selectedId);

  const handleConfirm = () => {
    if (!selectedId || !incAmount || isNaN(incAmount)) {
      showToast('Please select an employee and enter a valid amount.');
      return;
    }

    const amount = parseFloat(incAmount);
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        const newSalary = emp.baseSalary + amount;
        const historyEntry = {
          date: new Date().toISOString().split('T')[0],
          amount: amount,
          type: 'Manual Appraisal',
          previousSalary: emp.baseSalary,
          newSalary: newSalary
        };
        return {
          ...emp,
          baseSalary: newSalary,
          incrementHistory: [historyEntry, ...(emp.incrementHistory || [])]
        };
      }
      return emp;
    }));

    setIncAmount('');
    showToast(`Increment of ${amount} AED applied successfully to ${selectedEmp.name}`);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Salary Increment & Appraisal</h2>
          <p className="text-sm text-slate-500 mt-1">Manage employee appraisals and track adjustment history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
          <div className="bg-[#D4AF37] p-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <TrendingUp size={18} /> Apply Increment
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Select Employee</label>
              <div className="relative">
                <select 
                  value={selectedId} 
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none bg-white transition-all"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.id})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {selectedEmp && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Base Salary</p>
                <p className="text-xl font-black text-slate-800">{selectedEmp.baseSalary.toLocaleString()} <span className="text-xs font-bold text-slate-400">AED</span></p>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Increment Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={incAmount}
                  onChange={(e) => setIncAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  AED
                </div>
              </div>
            </div>

            <button 
              onClick={handleConfirm}
              className="w-full py-3 bg-[#D4AF37] text-white rounded-lg text-sm font-bold hover:bg-[#B8860B] transition-all shadow-sm"
            >
              Confirm Adjustment
            </button>
          </div>
        </div>

        {/* Right Column: History List */}
        <div className="lg:col-span-2">
          {!selectedEmp ? (
            <div className="bg-white rounded-xl border border-slate-200 border-dashed p-16 text-center">
              <History size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Select an employee to view increment history</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-[#B8860B] p-4 flex items-center justify-between">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <History size={18} /> Adjustment History - {selectedEmp.name}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b bg-slate-50">
                      <th className="p-4 pl-6">Adjustment Date</th>
                      <th className="p-4">Inc. Amount</th>
                      <th className="p-4">Previous Salary</th>
                      <th className="p-4 pr-6">New Salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(!selectedEmp.incrementHistory || selectedEmp.incrementHistory.length === 0) ? (
                      <tr>
                        <td colSpan="4" className="p-12 text-center text-slate-400 text-sm italic font-medium">
                          No historical adjustment records found.
                        </td>
                      </tr>
                    ) : (
                      selectedEmp.incrementHistory.map((h, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 pl-6">
                            <p className="text-sm font-bold text-slate-800">{h.date}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{h.type}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-bold text-emerald-600">+{h.amount.toLocaleString()} AED</span>
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-medium text-slate-500">{h.previousSalary.toLocaleString()} AED</span>
                          </td>
                          <td className="p-4 pr-6">
                            <span className="text-sm font-bold text-slate-900">{h.newSalary.toLocaleString()} AED</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OffboardingView({ employees, setEmployees, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const offboardingEmps = employees.filter(e => 
    e.status === 'Offboarding' && 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedEmp = employees.find(e => e.id === selectedEmpId);

  const advanceStep = (empId, currentStep) => {
    if (currentStep >= OFFBOARDING_STEPS.length - 1) {
      showToast('Offboarding Finalized. Employee archived.');
      setEmployees(emps => emps.map(e => e.id === empId ? { ...e, status: 'Archived' } : e));
      setSelectedEmpId(null);
      return;
    }
    setEmployees(emps => emps.map(e => e.id === empId ? { ...e, offboardingStep: currentStep + 1 } : e));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[500px] max-w-[1400px] mx-auto">
      {/* Left Panel - Queue */}
      <div className="w-full lg:w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-100 bg-[#fafafa] rounded-t-xl">
          <h2 className="text-base font-bold text-slate-800 mb-4">Offboarding Management</h2>
          <input 
            type="text" 
            placeholder="Search employee..." 
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {offboardingEmps.length === 0 ? (
            <div className="text-center text-slate-500 text-[15px] mt-4">
              No employees found.
            </div>
          ) : (
            <div className="space-y-3">
              {offboardingEmps.map(emp => (
                <div 
                  key={emp.id} 
                  onClick={() => setSelectedEmpId(emp.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedEmpId === emp.id 
                      ? 'border-[#D4AF37] bg-[#FDF9ED]' 
                      : 'border-slate-100 hover:border-[#D4AF37] hover:bg-[#FDF9ED]'
                  }`}
                >
                  <p className="font-bold text-sm text-slate-800">{emp.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{emp.department} • {emp.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {!selectedEmp ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
            <LogOut size={42} strokeWidth={1.5} className="mb-4 text-slate-800" />
            <p className="text-[15px] text-slate-400">Select an employee to manage offboarding</p>
          </div>
        ) : (
          <div className="p-6 md:p-10 overflow-y-auto h-full flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-slate-100 pb-8">
              <div>
                <h3 className="font-black text-2xl text-slate-800">{selectedEmp.name}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{selectedEmp.company} • {selectedEmp.department}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase px-2">Pending Step:</span>
                <span className="bg-[#FDF9ED] text-[#B8860B] border border-[#D4AF37]/30 text-sm font-bold px-4 py-2 rounded-lg">{OFFBOARDING_STEPS[selectedEmp.offboardingStep]}</span>
                <button onClick={() => advanceStep(selectedEmp.id, selectedEmp.offboardingStep)} className="bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm ml-2 hover:bg-slate-700 transition">
                  Mark Complete
                </button>
              </div>
            </div>

            <div className="relative pt-4 pb-2 overflow-x-auto custom-scrollbar w-full">
              <div className="min-w-[900px] w-full px-8">
                <div className="relative w-full">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -z-10 transform -translate-y-1/2 rounded-full"></div>
                  <div className="absolute top-1/2 left-0 h-1.5 bg-[#D4AF37] -z-10 transform -translate-y-1/2 transition-all duration-700 rounded-full"
                    style={{ width: `${(selectedEmp.offboardingStep / (OFFBOARDING_STEPS.length - 1)) * 100}%` }}></div>

                  <div className="flex justify-between w-full">
                    {OFFBOARDING_STEPS.map((step, index) => {
                      const isCompleted = index < selectedEmp.offboardingStep;
                      const isCurrent = index === selectedEmp.offboardingStep;
                      return (
                        <div key={step} className="flex flex-col items-center gap-4 w-28 relative group">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base transition-all duration-300 ${
                            isCompleted ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/40' : 
                            isCurrent ? 'bg-white border-[5px] border-[#D4AF37] text-[#B8860B] scale-110 shadow-lg' : 
                            'bg-white border-[5px] border-slate-100 text-slate-300'
                          }`}>
                            {isCompleted ? <CheckCircle size={24} /> : index + 1}
                          </div>
                          <span className={`text-[10px] font-black text-center leading-tight uppercase tracking-wider ${
                            isCompleted ? 'text-slate-800' : isCurrent ? 'text-[#B8860B]' : 'text-slate-400'
                          }`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SelfService({ user, showToast }) {
  const [activeCert, setActiveCert] = useState(null);

  const requestCert = (certName) => setActiveCert(certName);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800">ESS Document Vault</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 h-fit">
          <h3 className="font-bold text-lg mb-1 text-slate-800">Generate Official Documents</h3>
          <p className="text-xs text-slate-500 mb-6">Instantly generate verifiable HR documents.</p>
          <div className="space-y-3">
            {['Payslip (Current Cycle)', 'Salary Certificate', 'Employment / Experience Letter', 'Bonafide Certificate'].map(cert => (
              <button 
                key={cert} onClick={() => requestCert(cert)}
                className={`w-full flex items-center justify-between p-4 border rounded-2xl transition text-left text-sm font-bold ${
                  activeCert === cert ? 'border-[#D4AF37] bg-[#FDF9ED] text-[#B8860B] shadow-inner' : 'border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                {cert}
                <ChevronRight size={18} className={activeCert === cert ? "text-[#D4AF37]" : "text-slate-400"} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-100 p-8 rounded-[2rem] flex flex-col items-center justify-center border border-slate-200 min-h-[500px]">
          {activeCert ? (
            <>
              <div className="bg-white w-full max-w-sm shadow-2xl aspect-[1/1.414] p-8 relative flex flex-col origin-top">
                {/* Clear Display of Company Name in Document Header */}
                <div className="border-b-4 border-slate-800 pb-4 mb-6 text-center">
                  <h1 className="text-xl font-black text-slate-900 tracking-widest uppercase">{user.company}</h1>
                  <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">{user.workBase} • hr@{user.company.replace(/\s/g,'').toLowerCase()}.com</p>
                </div>
                
                {activeCert.includes('Payslip') && (
                    <div className="absolute top-8 right-8 text-[10px] font-black text-slate-300 uppercase tracking-tighter opacity-50 rotate-12">
                        Official Payslip
                    </div>
                )}

                <h2 className="text-sm font-black text-slate-800 underline mb-6 uppercase text-center">{activeCert}</h2>
                
                <div className="text-[10px] text-left text-slate-700 space-y-4 flex-1 leading-relaxed">
                  <p>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
                  
                  {activeCert.includes('Payslip') ? (
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-3 border border-slate-200 rounded">
                            <p className="font-bold text-slate-900 border-b border-slate-200 mb-1 pb-1">EMPLOYER DETAILS</p>
                            <p className="text-[9px] font-bold">COMPANY: {user.company}</p>
                            <p className="text-[9px]">LOCATION: {user.workBase}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="border border-slate-100 p-2">
                                <p className="font-bold text-[8px] uppercase text-slate-400 mb-1">Employee Info</p>
                                <p><strong>{user.name}</strong></p>
                                <p>ID: {user.id}</p>
                             </div>
                             <div className="border border-slate-100 p-2">
                                <p className="font-bold text-[8px] uppercase text-slate-400 mb-1">Period</p>
                                <p>MARCH 2026</p>
                                <p>STATUS: PAID</p>
                             </div>
                        </div>
                        <div className="border border-slate-800 p-2 mt-4">
                            <div className="flex justify-between font-bold border-b border-slate-800 mb-1">
                                <span>DESCRIPTION</span>
                                <span>AMOUNT (AED)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Basic Salary</span>
                                <span>{user.baseSalary}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Allowances</span>
                                <span>{(user.baseSalary * 0.4).toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-800 mt-2 pt-1 font-black text-slate-900">
                                <span>NET PAYABLE</span>
                                <span>{(user.baseSalary * 1.4).toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <>
                        <p>To Whom It May Concern,</p>
                        <p>This is to certify that Mr/Ms. <strong>{user.name}</strong> (ID: {user.id}) is an employee of <strong>{user.company}</strong>, assigned to the <strong>{user.department}</strong> department.</p>
                        <div className="space-y-2 mt-6">
                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                            <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                        </div>
                    </>
                  )}
                </div>
                <div className="pt-6 mt-auto border-t-2 border-slate-100 text-left">
                  <div className="w-20 h-8 border-b-2 border-blue-900 mb-2 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg')] bg-contain bg-no-repeat bg-center opacity-40"></div>
                  <p className="text-[8px] font-black uppercase text-slate-800">Authorized HR Signatory</p>
                </div>
              </div>
              <button onClick={()=>showToast(`${activeCert} Downloaded Successfully.`)} className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl hover:bg-slate-800">
                <Download size={18} /> Download Official PDF
              </button>
            </>
          ) : (
            <div className="text-slate-400 text-center"><FileText size={48} className="mx-auto mb-4 opacity-50"/><p className="text-sm font-bold">Select document to preview</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

function PoliciesView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800">Company & HR Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POLICIES.map(policy => (
          <div key={policy.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition cursor-pointer flex flex-col h-full">
            <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
              <FileText size={28} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 leading-tight flex-1">{policy.title}</h3>
            <span className="bg-[#FDF9ED] text-[#B8860B] text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded inline-block w-fit mt-4">
              {policy.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingView({ employees, setEmployees, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const onboardingEmps = employees.filter(e => 
    e.status === 'Onboarding' && 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedEmp = employees.find(e => e.id === selectedEmpId);

  const advanceStep = (empId, currentStep) => {
    if (currentStep >= ONBOARDING_STEPS.length - 1) {
      showToast('Onboarding Complete. Employee is now Active.');
      setEmployees(emps => emps.map(e => e.id === empId ? { ...e, status: 'Active' } : e));
      setSelectedEmpId(null);
      return;
    }
    setEmployees(emps => emps.map(e => e.id === empId ? { ...e, onboardingStep: currentStep + 1 } : e));
    showToast('Onboarding Step Completed.');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[500px] max-w-[1400px] mx-auto">
      {/* Left Panel - Queue */}
      <div className="w-full lg:w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-100 bg-[#fafafa] rounded-t-xl">
          <h2 className="text-base font-bold text-slate-800 mb-4">Onboarding Queue</h2>
          <input 
            type="text" 
            placeholder="Search employee..." 
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {onboardingEmps.length === 0 ? (
            <div className="text-center text-slate-500 text-[15px] mt-4">
              No employees found.
            </div>
          ) : (
            <div className="space-y-3">
              {onboardingEmps.map(emp => (
                <div 
                  key={emp.id} 
                  onClick={() => setSelectedEmpId(emp.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedEmpId === emp.id 
                      ? 'border-[#D4AF37] bg-[#FDF9ED]' 
                      : 'border-slate-100 hover:border-[#D4AF37] hover:bg-[#FDF9ED]'
                  }`}
                >
                  <p className="font-bold text-sm text-slate-800">{emp.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{emp.department} • {emp.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {!selectedEmp ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
            <User size={42} strokeWidth={1.5} className="mb-4 text-slate-800" />
            <p className="text-[15px] text-slate-400">Select an employee to view onboarding progress</p>
          </div>
        ) : (
          <div className="p-6 md:p-10 overflow-y-auto h-full flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-slate-100 pb-8">
              <div>
                <h3 className="font-black text-2xl text-slate-800">{selectedEmp.name}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{selectedEmp.company} • {selectedEmp.department}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase px-2">Current Step:</span>
                <span className="bg-[#e0f2fe] text-[#2563eb] border border-[#bfdbfe] text-sm font-bold px-4 py-2 rounded-lg">{ONBOARDING_STEPS[selectedEmp.onboardingStep || 0]}</span>
                <button onClick={() => advanceStep(selectedEmp.id, selectedEmp.onboardingStep || 0)} className="bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm ml-2 hover:bg-slate-700 transition">
                  Mark Complete
                </button>
              </div>
            </div>

            <div className="relative pt-4 pb-2 overflow-x-auto custom-scrollbar w-full">
              <div className="min-w-[800px] w-full px-8">
                <div className="relative w-full">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -z-10 transform -translate-y-1/2 rounded-full"></div>
                  <div className="absolute top-1/2 left-0 h-1.5 bg-[#3b82f6] -z-10 transform -translate-y-1/2 transition-all duration-700 rounded-full"
                    style={{ width: `${((selectedEmp.onboardingStep || 0) / (ONBOARDING_STEPS.length - 1)) * 100}%` }}></div>

                  <div className="flex justify-between w-full">
                    {ONBOARDING_STEPS.map((step, index) => {
                      const currentStep = selectedEmp.onboardingStep || 0;
                      const isCompleted = index < currentStep;
                      const isCurrent = index === currentStep;
                      return (
                        <div key={step} className="flex flex-col items-center gap-4 w-28 relative group">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base transition-all duration-300 ${
                            isCompleted ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-200' : 
                            isCurrent ? 'bg-white border-[5px] border-[#3b82f6] text-[#3b82f6] scale-110 shadow-lg' : 
                            'bg-white border-[5px] border-slate-100 text-slate-300'
                          }`}>
                            {isCompleted ? <CheckCircle size={24} /> : index + 1}
                          </div>
                          <span className={`text-[10px] font-black text-center leading-tight uppercase tracking-wider ${
                            isCompleted ? 'text-slate-800' : isCurrent ? 'text-[#3b82f6]' : 'text-slate-400'
                          }`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}