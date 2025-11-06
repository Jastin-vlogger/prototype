"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { 
    LayoutDashboard, 
    Users, 
    Package, 
    ShoppingCart, 
    FileText, 
    Gavel, 
    BarChart3, 
    Bell, 
    ChevronDown, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    FileCheck,
    DollarSign,
    Plus,
    Edit2,
    Eye,
    Menu,
    LogOut,
    Mail,
    Lock,
    Building, 
    ListTodo, 
    ClipboardCheck, 
    Truck,
    Clock,
    TrendingUp,
    ScrollText,
    Receipt,
    ListOrdered
} from 'lucide-react';

// --- Mock Data ---

const MOCK_USER = {
    name: "Ferra Alexandra",
    role: "Buying Head - Food",
    avatar: "https://placehold.co/100x100/6366f1/FFFFFF?text=FA" 
};

const MOCK_VENDORS = [
    {
        id: 'v1001',
        name: 'FreshProduce Inc.',
        status: 'Pending Approval', 
        submittedOn: '2025-10-28',
        contact: 'sales@freshproduce.com',
        documents: [
            { id: 'doc1', name: 'Business License.pdf', status: 'Verified' },
            { id: 'doc2', name: 'Food Safety Certificate.pdf', status: 'Verified' },
            { id: 'doc3', name: 'Tax ID.pdf', status: 'Verified' },
        ],
        submittedPaymentTerms: '30 Days',
        approvedPaymentTerms: '',
        revocationReason: '',
    },
    {
        id: 'v1002',
        name: 'Gourmet Meats Ltd.',
        status: 'Revoked',
        submittedOn: '2025-10-27',
        contact: 'contact@gourmetmeats.com',
        documents: [
            { id: 'doc4', name: 'TradeLicense.pdf', status: 'Verified' },
            { id: 'doc5', name: 'Insurance_Policy.pdf', status: 'Re-upload Required' },
        ],
        submittedPaymentTerms: '60 Days',
        approvedPaymentTerms: '',
        revocationReason: 'Insurance Policy is expired. Please re-upload a valid document.',
    },
    {
        id: 'v1003',
        name: 'DairyBest Farms',
        status: 'Approved',
        submittedOn: '2025-10-25',
        contact: 'orders@dairybest.com',
        documents: [
            { id: 'doc6', name: 'Organic_Certification.pdf', status: 'Verified' },
        ],
        submittedPaymentTerms: 'Weekly',
        approvedPaymentTerms: 'Weekly',
        revocationReason: '',
    },
    {
        id: 'v1004',
        name: 'Global Imports',
        status: 'Pending L2 Approval', 
        submittedOn: '2025-10-29',
        contact: 'admin@globalimports.com',
        documents: [
            { id: 'doc7', name: 'Import_Export_License.pdf', status: 'Verified' },
        ],
        submittedPaymentTerms: '90 Days',
        approvedPaymentTerms: '90 Days',
        revocationReason: '',
    }
];

const MOCK_PRODUCTS = [
    {
        id: 'p2001',
        name: 'Organic Avocados (Case)',
        vendorId: 'v1001',
        vendorName: 'FreshProduce Inc.',
        status: 'Pending Review', 
        sku: 'FP-AVO-01',
        department: 'Produce',
        category: 'Fruits',
        subcategory: 'Tropical',
        unitType: 'Carton',
        barcode: '890123456789',
        taxable: true,
        imageUrl: 'https://placehold.co/400x400/84cc16/FFFFFF?text=Avocados',
        description: 'Case of 48 premium organic Hass avocados.',
        vendorPrice: 165.00,
        buyerSellingPrice: 0, 
        revocationReason: '',
    },
    {
        id: 'p2002',
        name: 'Grass-Fed Ribeye Steak',
        vendorId: 'v1002',
        vendorName: 'Gourmet Meats Ltd.',
        status: 'Approved',
        sku: 'GM-RBY-05',
        department: 'Meat & Poultry',
        category: 'Beef',
        subcategory: 'Steak',
        unitType: 'Single',
        barcode: '890123456790',
        taxable: true,
        imageUrl: 'https://placehold.co/400x400/f87171/FFFFFF?text=Steak',
        description: '12oz Grass-Fed Ribeye Steak, vacuum sealed.',
        vendorPrice: 46.00,
        buyerSellingPrice: 75.00,
        revocationReason: '',
    },
    {
        id: 'p2003',
        name: 'Organic Whole Milk (Gallon)',
        vendorId: 'v1003',
        vendorName: 'DairyBest Farms',
        status: 'Revoked',
        sku: 'DB-MLK-02',
        department: 'Dairy',
        category: 'Milk',
        subcategory: 'Cow Milk',
        unitType: 'Single',
        barcode: '890123456791',
        taxable: false,
        imageUrl: 'https://placehold.co/400x400/dbeafe/FFFFFF?text=Milk',
        description: 'Gallon of Grade A Organic Whole Milk.',
        vendorPrice: 12.00,
        buyerSellingPrice: 0,
        revocationReason: 'Incorrect SKU provided. Please update and resubmit.',
    }
];

const MOCK_POS = [
    {
        id: 'PO-9001',
        vendorId: 'v1003',
        vendorName: 'DairyBest Farms',
        createdDate: '2025-10-30',
        erpId: 'ERP-7762',
        status: 'Warehouse Received', 
        total: 6000.00,
        items: [
            { id: 'p2003', name: 'Organic Whole Milk', qtyOrdered: 500, qtyReceived: 500, price: 12.00 }
        ]
    },
    {
        id: 'PO-9002',
        vendorId: 'v1002',
        vendorName: 'Gourmet Meats Ltd.',
        createdDate: '2025-10-29',
        erpId: 'ERP-7750',
        status: 'Vendor Confirmed',
        total: 92000.00,
        items: [
            { id: 'p2002', name: 'Grass-Fed Ribeye Steak', qtyOrdered: 2000, qtyReceived: 0, price: 46.00 }
        ]
    },
     {
        id: 'PO-9003',
        vendorId: 'v1001',
        vendorName: 'FreshProduce Inc.',
        createdDate: '2025-10-25',
        erpId: 'ERP-7730',
        status: 'Sent to Vendor',
        total: 15000.00,
        items: [
             { id: 'p2001', name: 'Organic Avocados (Case)', qtyOrdered: 90, qtyReceived: 0, price: 165.00 }
        ]
    }
];

const MOCK_BIDS = [
    {
        id: 'b3001',
        productName: 'Imported Olive Oil (1L)',
        status: 'Ongoing',
        deadline: '2025-11-05T17:00:00',
        vendors: [
            { id: 'v1004', name: 'Global Imports', price: null, status: 'Not Responded' },
            { id: 'v1001', name: 'FreshProduce Inc.', price: 57.00, status: 'Responded' },
            { id: 'v1005', name: 'EuroFoods', price: 55.50, status: 'Responded' },
        ]
    },
    {
        id: 'b3002',
        productName: 'Organic Avocados (Case)',
        status: 'Closed',
        deadline: '2025-10-25T17:00:00',
        awardedTo: 'v1001',
        vendors: [
            { id: 'v1001', name: 'FreshProduce Inc.', price: 165.00, status: 'Awarded' },
            { id: 'v1004', name: 'Global Imports', price: 172.00, status: 'Responded' },
        ]
    }
];

const MOCK_GRNS = [
    { id: 'GRN-1001', poId: 'PO-9001', vendor: 'DairyBest Farms', date: '2025-10-31', totalReceived: 6000.00, confirmed: true, discrepancy: false, syncStatus: 'ERP Synced' },
    { id: 'GRN-1002', poId: 'PO-9002', vendor: 'Gourmet Meats Ltd.', date: '2025-10-31', totalReceived: 80000.00, confirmed: false, discrepancy: true, syncStatus: 'Pending ERP Sync' },
];

const MOCK_PAYMENTS = [
    { id: 'P-5001', vendor: 'DairyBest Farms', amount: 6000.00, dueDate: '2025-11-06', status: 'Pending', terms: 'Weekly', lastSOP: '2025-10-28', poId: 'PO-9001' },
    { id: 'P-5002', vendor: 'Gourmet Meats Ltd.', amount: 92000.00, dueDate: '2025-12-28', status: 'Due in 60 Days', terms: '60 Days', lastSOP: '2025-10-29', poId: 'PO-9002' },
    { id: 'P-5003', vendor: 'FreshProduce Inc.', amount: 15000.00, dueDate: '2025-11-25', status: 'Due in 30 Days', terms: '30 Days', lastSOP: '2025-10-25', poId: 'PO-9003' },
    { id: 'P-5004', vendor: 'Global Imports', amount: 550.00, dueDate: '2025-11-01', status: 'Overdue', terms: '90 Days', lastSOP: '2025-08-01', poId: 'N/A' },
];


// --- Utility Components ---

// Modal Component
const Modal = ({ children, onClose, title }) => (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-modal-in"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <XCircle size={24} />
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
);

// Styled Button
const Button = ({ children, onClick, variant = 'primary', icon: Icon, className = '', ...props }) => {
    const baseStyle = 'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 active:scale-[0.98] shadow-lg';
    
    // Updated variants based on the last image (Bright Red and Gray/Slate)
    const variants = {
        primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500', 
        secondary: 'bg-slate-400 text-white hover:bg-slate-500 focus:ring-slate-300',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500', // Keep for functional clarity
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500', // Keep for functional clarity
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 shadow-none'
    };
    
    // Override for login page button to remain red (as per Image 1, and previous instruction)
    if (props['data-login-button']) {
        variants.primary = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
    }

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

// Styled Input
const Input = ({ label, id, icon: Icon, ...props }) => (
    <div className="w-full">
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <div className="relative">
            {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
            <input 
                id={id}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${Icon ? 'pl-10' : ''}`}
                {...props}
            />
        </div>
    </div>
);

// Styled Select
const Select = ({ label, id, children, ...props }) => (
     <div className="w-full">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select 
            id={id}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            {...props}
        >
            {children}
        </select>
    </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
    const styles = {
        'Pending Approval': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Pending L2 Approval': 'bg-blue-100 text-blue-800 border-blue-300',
        'Pending Review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Approved': 'bg-green-100 text-green-800 border-green-300',
        'Revoked': 'bg-red-100 text-red-800 border-red-300',
        'Ongoing': 'bg-blue-100 text-blue-800 border-blue-300',
        'Closed': 'bg-gray-200 text-gray-800 border-gray-300',
        'Warehouse Received': 'bg-purple-100 text-purple-800 border-purple-300',
        'Vendor Confirmed': 'bg-slate-400 text-white border-slate-300', // Updated color
        'Sent to Vendor': 'bg-cyan-100 text-cyan-800 border-cyan-300',
        'Draft': 'bg-gray-200 text-gray-800 border-gray-300',
        'GRN Updated': 'bg-green-100 text-green-800 border-green-300',
        'Responded': 'bg-green-100 text-green-800 border-green-300',
        'Not Responded': 'bg-gray-200 text-gray-800 border-gray-300',
        'Awarded': 'bg-yellow-400 text-yellow-900 border-yellow-500 font-semibold',
        'ERP Synced': 'bg-green-100 text-green-800 border-green-300',
        'Pending ERP Sync': 'bg-red-100 text-red-800 border-red-300',
        'Overdue': 'bg-red-600 text-white font-bold',
        'Pending': 'bg-yellow-500 text-white font-bold',
        'Due in 60 Days': 'bg-blue-100 text-blue-800',
        'Due in 30 Days': 'bg-indigo-100 text-indigo-800',
        'Verified': 'bg-green-500 text-white font-semibold',
        'Re-upload Required': 'bg-red-500 text-white font-semibold'
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

// Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-2xl p-4 sm:p-6 transition-shadow hover:shadow-3xl ${className}`}>
        {children}
    </div>
);

// Stat Card - Adjusted colors to match Image 2 Dashboard
const StatCard = ({ title, value, change, icon: Icon, color }) => {
    const isPositive = change && change.startsWith('+');
    
    // Ensure change text color is white for visibility on dark backgrounds
    let changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    
    let iconBgClass = 'bg-gray-200';
    let iconColorClass = 'text-gray-700';
    let textClass = 'text-gray-900';
    let changeWrapperClass = 'bg-gray-100';

    if (color === 'primary_gradient') {
        // Total Orders card: Red-to-Purple Gradient, white text inside the gradient section
        iconBgClass = 'bg-gradient-to-br from-red-500 to-fuchsia-600 shadow-xl shadow-red-300/50';
        iconColorClass = 'text-white';
        changeColor = 'text-white'; // Change text color for visibility on dark gradient
        
        return (
            <Card className="p-0 overflow-hidden text-white shadow-xl bg-gradient-to-br from-red-500 to-fuchsia-600 hover:ring-2 ring-offset-2 ring-fuchsia-400 transition-all duration-300 ease-out">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Icon size={24} className="text-white" />
                        {change && (
                            <span className={`flex items-center text-xs font-medium ${changeColor} px-2 py-0.5 rounded-full bg-white/20`}>
                                {change}
                            </span>
                        )}
                    </div>
                    <p className="text-xl font-semibold mb-1">{title}</p>
                    <p className="text-4xl font-bold">{value}</p>
                    <p className="text-sm opacity-80 mt-1">Orders vs last month</p>
                </div>
            </Card>
        );

    } else if (color === 'secondary_red') {
        // Pending Shipments: Muted Red
        iconBgClass = 'bg-red-100';
        iconColorClass = 'text-red-500';
    } else if (color === 'secondary_pink') {
        // Available Stock: Muted Pink/Fuchsia
        iconBgClass = 'bg-fuchsia-100';
        iconColorClass = 'text-fuchsia-500';
    } else if (color === 'secondary_blue') {
        // Total Revenue: Muted Blue
        iconBgClass = 'bg-blue-100';
        iconColorClass = 'text-blue-500';
    }

    return (
        <Card className="hover:ring-2 ring-offset-2 ring-red-300 transition-all duration-300 ease-out">
            <div className="flex items-center justify-between">
                <span className={`p-3 rounded-full ${iconBgClass}`}>
                    <Icon size={24} className={`${iconColorClass}`} />
                </span>
                {change && (
                    <span className={`flex items-center text-xs font-medium ${changeColor} px-2 py-0.5 rounded-full ${changeWrapperClass}`}>
                        {change}
                    </span>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-500">{title}</p>
                <p className={`text-3xl font-bold ${textClass}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-1">
                    {title === 'Total Revenue' ? 'Products month' : 'Orders vs last month'}
                </p>
            </div>
        </Card>
    );
};

// --- Page Components ---

// 0. Login Page 
const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('buyer@abreco.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            if (email === 'buyer@abreco.com' && password === 'password') {
                onLogin();
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row w-full font-inter">
            {/* Left Side (Branding - Full Height, Custom Gradient) */}
            <div className="w-full md:w-1/2 min-h-64 md:min-h-screen bg-gradient-to-br from-red-600 to-indigo-800 p-8 md:p-12 text-white flex flex-col justify-center items-center relative shadow-lg">
                <div className="max-w-md text-center">
                    <span className="p-4 bg-white/30 rounded-full inline-block mb-6">
                        <Truck size={48} className="text-white" />
                    </span>
                    <h1 className="text-4xl font-bold mb-4">Abreco Buyer Portal</h1>
                    <p className="text-lg text-white/90">
                        Manage your vendors, products, and procurement all in one place.
                    </p>
                </div>
                {/* Footer/Copyright */}
                <p className="absolute bottom-4 text-sm text-white/70">
                    © 2025 Abreco. All rights reserved.
                </p>
            </div>

            {/* Right Side (Form - Centered) */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
                <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Buyer Portal Login</h3>
                    <p className="text-gray-600 mb-8">Please sign in to your account.</p>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input 
                            label="Username or Email"
                            id="email"
                            type="email"
                            placeholder="buyer@abreco.com"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                         <Input 
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {error && (
                            <p className="text-sm text-red-600 flex items-center gap-2">
                                <AlertCircle size={16} /> {error}
                            </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm font-medium text-red-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full py-3"
                            disabled={isLoading}
                            data-login-button="true" // Flag to keep this specific button red
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// 1. Dashboard Page
const DashboardPage = ({ data, onNavigate }) => {
    const stats = {
        pendingVendors: data.vendors.filter(v => v.status === 'Pending Approval').length,
        pendingProducts: data.products.filter(p => p.status === 'Pending Review').length,
        activePOs: data.pos.filter(p => p.status !== 'GRN Updated' && p.status !== 'Draft').length,
        ongoingBids: data.bids.filter(b => b.status === 'Ongoing').length,
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Gradient Card - Total Orders (Matches image) */}
            <StatCard 
                title="Total Orders" 
                value="5,123" 
                change="+15.8%" 
                icon={ShoppingCart}
                color="primary_gradient" 
            />
            {/* Secondary Card - Pending Shipments (Matches image) */}
            <StatCard 
                title="Pending Shipments" 
                value="345" 
                change="-9%" 
                icon={Building} 
                color="secondary_red" 
            />
            {/* Secondary Card - Available Stock (Matches image) */}
            <StatCard 
                title="Available Stock" 
                value="68.50" 
                change="-5%" 
                icon={Package}
                color="secondary_pink" 
            />
            {/* Secondary Card - Total Revenue (Matches image) */}
            <StatCard 
                title="Total Revenue" 
                value="AED 45,789" 
                change="+12.6%" 
                icon={DollarSign}
                color="secondary_blue" 
            />

            {/* --- VISUAL DATA SECTION --- */}
            
            {/* Sales by Month Mock Chart */}
            <Card className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Sales by Month (AED)</h3>
                     <Select id="year-filter" value="This year" onChange={() => {}} className="w-32 py-1 text-sm">
                        <option>This year</option>
                        <option>Last year</option>
                    </Select>
                </div>
                <div className="h-64 w-full flex items-end gap-3 justify-between p-2 border-b">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, index) => (
                        <div key={month} className="flex flex-col items-center h-full justify-end w-1/7">
                             {/* Seen Product (Light Blue) */}
                            <div 
                                className="w-4 bg-blue-200 rounded-t-sm" 
                                style={{ height: `${(index + 1) * 10 + 20}%` }}
                            ></div>
                            {/* Sales (Red) */}
                            <div 
                                className="w-4 bg-red-600 rounded-t-sm mt-1" 
                                style={{ height: `${(7 - index) * 10 + 20}%` }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">{month}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center text-sm text-gray-600">
                        <span className="w-3 h-3 bg-blue-200 rounded-full mr-2"></span> Seen product
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                        <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span> Sales
                    </span>
                </div>
            </Card>

            {/* Product Categories Mock Chart */}
            <Card className="lg:col-span-1">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Product Categories</h3>
                     <Select id="date-filter" value="Today" onChange={() => {}} className="w-24 py-1 text-sm">
                        <option>Today</option>
                        <option>Week</option>
                    </Select>
                </div>
                <div className="flex flex-col items-center">
                    {/* Mock Doughnut Chart (SVG) */}
                    <div className="w-32 h-32 my-4 relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10"></circle>
                            {/* Blue segment (50%) */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="10" strokeDasharray="141.37 282.74" strokeDashoffset="0"></circle>
                            {/* Red segment (30%) */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" strokeWidth="10" strokeDasharray="84.82 282.74" strokeDashoffset="-141.37"></circle>
                             {/* Yellow segment (20%) */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#facc15" strokeWidth="10" strokeDasharray="56.54 282.74" strokeDashoffset="-226.19"></circle>
                        </svg>
                    </div>
                    <div className="space-y-2 w-full mt-2">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center text-sm text-gray-600"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span> Food</span>
                            <span className="font-semibold text-gray-800">50%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center text-sm text-gray-600"><span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span> Non-Food</span>
                            <span className="font-semibold text-gray-800">30%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center text-sm text-gray-600"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Consumables</span>
                            <span className="font-semibold text-gray-800">20%</span>
                        </div>
                    </div>
                </div>
            </Card>
            
            {/* Recent Orders Card */}
            <Card className="lg:col-span-1">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent PO Status</h3>
                     <Select id="po-filter" value="Today" onChange={() => {}} className="w-24 py-1 text-sm">
                        <option>Today</option>
                        <option>Week</option>
                    </Select>
                </div>
                <ul className="space-y-3">
                    {data.pos.slice(0, 4).map(po => (
                        <li key={po.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-800">{po.vendorName}</p>
                                <p className="text-xs text-gray-500">{po.id}</p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                                <StatusBadge status={po.status} />
                            </div>
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Top Products in Review</h3>
                <ul className="space-y-3">
                     {data.products.filter(p => p.status === 'Pending Review').slice(0, 3).map((p, index) => (
                        <li key={p.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{index + 1}. {p.name}</span>
                            <StatusBadge status="Pending Review" />
                        </li>
                    ))}
                </ul>
            </Card>

            {/* --- END VISUAL DATA SECTION --- */}

        </div>
    );
};

// 2. Vendor Management Page 
const VendorManagementPage = ({ vendors, onUpdateVendor }) => {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [filter, setFilter] = useState('All');

    const filteredVendors = useMemo(() => {
        if (filter === 'All') return vendors;
        return vendors.filter(v => v.status === filter);
    }, [vendors, filter]);

    const handleUpdate = (vendorId, updates) => {
        onUpdateVendor(vendorId, updates);
        setSelectedVendor(prev => ({...prev, ...updates}));
    };

    return (
        <Card className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vendor Queue</h2>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['All', 'Pending Approval', 'Pending L2 Approval', 'Revoked', 'Approved'].map(f => (
                    <Button 
                        key={f} 
                        variant={filter === f ? 'primary' : 'secondary'}
                        onClick={() => setFilter(f)}
                        className="text-sm flex-shrink-0"
                    >
                        {f}
                    </Button>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted Terms</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVendors.map(vendor => (
                            <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.submittedOn}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.submittedPaymentTerms}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={vendor.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="ghost" icon={Edit2} onClick={() => setSelectedVendor(vendor)}>
                                        Review
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                {filteredVendors.map(vendor => (
                    <div key={vendor.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-gray-900">{vendor.name}</span>
                            <StatusBadge status={vendor.status} />
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Submitted:</strong> {vendor.submittedOn}</p>
                            <p><strong>Terms:</strong> {vendor.submittedPaymentTerms}</p>
                        </div>
                        <Button 
                            variant="primary" 
                            icon={Edit2} 
                            onClick={() => setSelectedVendor(vendor)}
                            className="w-full mt-4"
                        >
                            Review
                        </Button>
                    </div>
                ))}
            </div>

            {selectedVendor && (
                <VendorReviewModal 
                    vendor={selectedVendor}
                    onClose={() => setSelectedVendor(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </Card>
    );
};

// Document Viewer Placeholder Modal
const DocumentViewerModal = ({ documentName, onClose }) => (
    <Modal onClose={onClose} title={`Viewing Document: ${documentName}`}>
        <div className="p-4 bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center text-gray-600 border-dashed border-2 border-gray-300">
            <FileText size={48} />
            <p className="mt-3 text-lg font-medium">Document Preview Placeholder</p>
            <p className="text-sm">This simulates opening **{documentName}** for the buyer to review.</p>
        </div>
        <div className="mt-4 text-right">
            <Button variant="secondary" onClick={onClose}>Close Viewer</Button>
        </div>
    </Modal>
);

// Vendor Review Modal (Fully functional with state updates)
const VendorReviewModal = ({ vendor, onClose, onUpdate }) => {
    const [approvedTerms, setApprovedTerms] = useState(vendor.approvedPaymentTerms || vendor.submittedPaymentTerms);
    const [revocationReason, setRevocationReason] = useState(vendor.revocationReason || '');
    const [docToView, setDocToView] = useState(null); // State for opening document viewer

    const handleRevoke = () => {
        if (!revocationReason) {
            console.error('Please provide a reason for revocation.');
            return;
        }
        onUpdate(vendor.id, { status: 'Revoked', revocationReason: revocationReason });
        console.log(`[ACTION] Revoke & Re-upload requested for ${vendor.name}. Reason: ${revocationReason}`);
        onClose();
    };

    const handleApprove = () => {
        onUpdate(vendor.id, { status: 'Pending L2 Approval', approvedPaymentTerms: approvedTerms });
        console.log(`[ACTION] Vendor ${vendor.name} approved by Buyer (L1) and sent to Admin (L2) with terms: ${approvedTerms}`);
        onClose();
    };

    return (
        <>
            <Modal onClose={onClose} title={`Review Vendor: ${vendor.name}`}>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Vendor Details</h4>
                        <p><span className="font-medium">Contact:</span> {vendor.contact}</p>
                        <p><span className="font-medium">Submitted:</span> {vendor.submittedOn}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Uploaded Documents (Click to View)</h4>
                        <ul className="space-y-2">
                            {vendor.documents.map(doc => (
                                <li key={doc.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                    onClick={() => setDocToView(doc.name)}
                                >
                                    <span className="text-red-600 hover:underline">{doc.name}</span>
                                    <StatusBadge status={doc.status} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {vendor.status === 'Revoked' && (
                        <div className="p-3 bg-red-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Reason for Revocation</h4>
                            <p className="text-red-600">{vendor.revocationReason}</p>
                        </div>
                    )}
                    
                    {vendor.status !== 'Approved' && vendor.status !== 'Pending L2 Approval' && (
                        <>
                            <Select 
                                label="Abreco Approved Payment Terms (Editable)"
                                id="paymentTerms"
                                value={approvedTerms}
                                onChange={e => setApprovedTerms(e.target.value)}
                            >
                                <option value="Weekly">Weekly</option>
                                <option value="30 Days">30 Days</option>
                                <option value="60 Days">60 Days</option>
                                <option value="90 Days">90 Days</option>
                            </Select>

                            <div className="w-full">
                                <label htmlFor="revocationReason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Revocation/Re-upload Reason
                                </label>
                                <textarea 
                                    id="revocationReason"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="e.g., 'Please re-upload expired business license...'"
                                    value={revocationReason}
                                    onChange={e => setRevocationReason(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                                <Button 
                                    variant="danger" 
                                    icon={XCircle}
                                    onClick={handleRevoke}
                                    disabled={!revocationReason}
                                    className="w-full sm:w-auto"
                                >
                                    Revoke & Request Re-upload
                                </Button>
                                <Button 
                                    variant="success" 
                                    icon={CheckCircle}
                                    onClick={handleApprove}
                                    className="w-full sm:w-auto"
                                >
                                    Approve & Send to Admin (L2)
                                </Button>
                            </div>
                        </>
                    )}

                    {vendor.status === 'Pending L2 Approval' && (
                        <div className="p-4 bg-blue-50 rounded-lg text-blue-700 flex items-center gap-2">
                            <AlertCircle size={20} />
                            <span>This vendor has been approved and is now pending L2 Admin approval.</span>
                        </div>
                    )}
                </div>
            </Modal>
            {docToView && (
                <DocumentViewerModal documentName={docToView} onClose={() => setDocToView(null)} />
            )}
        </>
    );
};

// 3. Product Review Page 
const ProductReviewPage = ({ products, onUpdateProduct }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState('Pending Review');

    const filteredProducts = useMemo(() => {
        if (filter === 'All') return products;
        return products.filter(p => p.status === filter);
    }, [products, filter]);

    const handleUpdate = (productId, updates) => {
        onUpdateProduct(productId, updates);
        setSelectedProduct(prev => ({...prev, ...updates}));
    };
    
    return (
        <Card className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Review Queue</h2>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['Pending Review', 'All', 'Revoked', 'Approved'].map(f => (
                    <Button 
                        key={f} 
                        variant={filter === f ? 'primary' : 'secondary'}
                        onClick={() => setFilter(f)}
                        className="text-sm flex-shrink-0"
                    >
                        {f}
                    </Button>
                ))}
            </div>

            {/* Desktop Table View */}
             <div className="overflow-x-auto hidden lg:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.vendorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">AED {product.vendorPrice.toFixed(2)}</td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {product.buyerSellingPrice > 0 ? `AED ${product.buyerSellingPrice.toFixed(2)}` : 'Not Set'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={product.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="ghost" icon={Edit2} onClick={() => setSelectedProduct(product)}>
                                        Review
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                {filteredProducts.map(product => (
                     <div key={product.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-lg font-semibold text-gray-900">{product.name}</span>
                            <StatusBadge status={product.status} />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{product.vendorName}</p>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><strong>Vendor Price:</strong> AED {product.vendorPrice.toFixed(2)}</p>
                            <p><strong>Selling Price:</strong> {product.buyerSellingPrice > 0 ? `AED ${product.buyerSellingPrice.toFixed(2)}` : 'Not Set'}</p>
                        </div>
                        <Button 
                            variant="primary" 
                            icon={Edit2} 
                            onClick={() => setSelectedProduct(product)}
                            className="w-full mt-4"
                        >
                            Review
                        </Button>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <ProductReviewModal 
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </Card>
    );
};

// Product Review Modal (Fully functional with state updates)
const ProductReviewModal = ({ product, onClose, onUpdate }) => {
    const [sellingPrice, setSellingPrice] = useState(product.buyerSellingPrice || '');
    const [revocationReason, setRevocationReason] = useState(product.revocationReason || '');

    const handleRevoke = () => {
        if (!revocationReason) {
             console.error('Please provide a reason for revocation.');
            return;
        }
        onUpdate(product.id, { status: 'Revoked', revocationReason: revocationReason });
        console.log(`[ACTION] Product ${product.name} revoked. Vendor must re-add/update. Reason: ${revocationReason}`);
        onClose();
    };

    const handleApprove = () => {
        if (!sellingPrice || sellingPrice <= 0) {
            console.error('Please set a valid selling price.');
            return;
        }
        onUpdate(product.id, { status: 'Approved', buyerSellingPrice: parseFloat(sellingPrice) });
        console.log(`[ACTION] Product ${product.name} approved with Selling Price: AED ${parseFloat(sellingPrice).toFixed(2)}. Sent to Admin (L2).`);
        onClose();
    };

    return (
        <Modal onClose={onClose} title={`Review Product: ${product.name}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover aspect-square" />
                    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Vendor Description</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Product Details</h4>
                        <div className="text-sm space-y-1">
                            <p><span className="font-medium">SKU:</span> {product.sku}</p>
                            <p><span className="font-medium">Department:</span> {product.department}</p>
                            <p><span className="font-medium">Category:</span> {product.category}</p>
                            <p><span className="font-medium">Unit Type:</span> {product.unitType}</p>
                            <p><span className="font-medium">Taxable:</span> {product.taxable ? 'Yes' : 'No'}</p>
                            <p><span className="font-medium">Barcode:</span> {product.barcode}</p>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-sm font-medium text-gray-600">Vendor Price (Cost)</label>
                        <p className="text-2xl font-bold text-gray-900">AED {product.vendorPrice.toFixed(2)}</p>
                    </div>
                    
                     {product.status === 'Revoked' && (
                        <div className="p-3 bg-red-50 rounded-lg">
                            <h4 className="font-semibold text-red-700">Reason for Revocation</h4>
                            <p className="text-red-600">{product.revocationReason}</p>
                        </div>
                    )}

                    {product.status !== 'Approved' && (
                        <>
                            <Input 
                                label="Your Selling Price (to Customer)"
                                id="sellingPrice"
                                type="number"
                                placeholder="e.g., 75.00"
                                value={sellingPrice}
                                onChange={e => setSellingPrice(e.target.value)}
                            />
                            
                            <div className="w-full">
                                <label htmlFor="prodRevocationReason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Revocation Reason
                                </label>
                                <textarea 
                                    id="prodRevocationReason"
                                    rows="2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="e.g., 'Incorrect image, please update...'"
                                    value={revocationReason}
                                    onChange={e => setRevocationReason(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                                <Button 
                                    variant="danger" 
                                    icon={XCircle}
                                    onClick={handleRevoke}
                                    disabled={!revocationReason}
                                    className="w-full sm:w-auto"
                                >
                                    Revoke
                                </Button>
                                <Button 
                                    variant="success" 
                                    icon={CheckCircle}
                                    onClick={handleApprove}
                                    className="w-full sm:w-auto"
                                >
                                    Approve Product
                                </Button>
                            </div>
                        </>
                    )}

                    {product.status === 'Approved' && (
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-700">Approved Selling Price</h4>
                            <p className="text-2xl font-bold text-green-800">AED {product.buyerSellingPrice.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

// PO Details Modal
const POModal = ({ po, onClose }) => {
    return (
        <Modal onClose={onClose} title={`Purchase Order: ${po.id}`}>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4 text-sm">
                    <p><strong>ERP ID:</strong> {po.erpId}</p>
                    <p><strong>Vendor:</strong> {po.vendorName}</p>
                    <p><strong>Date Created:</strong> {po.createdDate}</p>
                    <p><strong>Total Value:</strong> <span className="font-bold text-lg text-red-600">AED {po.total.toFixed(2)}</span></p>
                </div>
                
                <h4 className="font-semibold text-gray-700 mt-2">Status History</h4>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    {['Draft', 'Sent to Vendor', 'Vendor Confirmed', 'Warehouse Received', 'GRN Updated'].map((s, index) => (
                        <div key={s} className="flex items-center text-xs flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${s === po.status || index <= ['Draft', 'Sent to Vendor', 'Vendor Confirmed', 'Warehouse Received', 'GRN Updated'].indexOf(po.status) ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                            <span className="ml-1 text-gray-700">{s}</span>
                            {index < 4 && <div className={`h-0.5 w-8 mx-1 ${index < ['Draft', 'Sent to Vendor', 'Vendor Confirmed', 'Warehouse Received', 'GRN Updated'].indexOf(po.status) ? 'bg-red-600' : 'bg-gray-300'}`}></div>}
                        </div>
                    ))}
                </div>

                <h4 className="font-semibold text-gray-700 mt-4">Order Items</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ordered Qty</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Received Qty</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {po.items.map(item => (
                                <tr key={item.id}>
                                    <td className="px-3 py-2 font-medium">{item.name}</td>
                                    <td className="px-3 py-2 text-center">AED {item.price.toFixed(2)}</td>
                                    <td className="px-3 py-2 text-center">{item.qtyOrdered}</td>
                                    <td className="px-3 py-2 text-center text-gray-900 font-semibold">{item.qtyReceived || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

// 4. Purchase Order Page (Clicking PO ID opens detailed modal)
const PurchaseOrdersPage = ({ pos, vendors, onAddPO }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPO, setSelectedPO] = useState(null);

    return (
        <Card className="w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Purchase Orders</h2>
                <Button icon={Plus} onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto flex-shrink-0">
                    Simulate PO from ERP
                </Button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                This list simulates POs synced from your ERP. After creation in ERP, they appear here and are synced to the vendor.
            </p>

            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ERP ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pos.map(po => (
                            <tr key={po.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 cursor-pointer hover:underline" onClick={() => setSelectedPO(po)}>{po.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.erpId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.vendorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AED {po.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={po.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                     <Button variant="ghost" icon={Eye} onClick={() => setSelectedPO(po)}>View Details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                {pos.map(po => (
                    <div key={po.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-lg font-semibold text-red-600 cursor-pointer hover:underline" onClick={() => setSelectedPO(po)}>{po.id}</span>
                             <StatusBadge status={po.status} />
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Vendor:</strong> {po.vendorName}</p>
                            <p><strong>ERP ID:</strong> {po.erpId}</p>
                            <p><strong>Total:</strong> AED {po.total.toFixed(2)}</p>
                        </div>
                         <Button variant="secondary" icon={Eye} onClick={() => setSelectedPO(po)} className="w-full mt-3">View Details</Button>
                    </div>
                ))}
            </div>
            
            {showCreateModal && (
                <SimulatePOModal 
                    vendors={vendors.filter(v => v.status === 'Approved')}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={onAddPO}
                />
            )}
            {selectedPO && (
                 <POModal po={selectedPO} onClose={() => setSelectedPO(null)} />
            )}
        </Card>
    );
};

// Simulate PO Modal (Functional PO creation)
const SimulatePOModal = ({ vendors, onClose, onCreate }) => {
    const [vendorId, setVendorId] = useState(vendors[0]?.id || '');
    const [amount, setAmount] = useState(5000);

    const handleSubmit = () => {
        const vendor = vendors.find(v => v.id === vendorId);
        if (!vendor) {
            console.error("No approved vendor selected.");
            return;
        }
        const newPO = {
            id: `PO-${Math.floor(Math.random() * 1000) + 9000}`,
            vendorId: vendor.id,
            vendorName: vendor.name,
            createdDate: new Date().toISOString().split('T')[0],
            erpId: `ERP-${Math.floor(Math.random() * 1000) + 8000}`,
            status: 'Sent to Vendor',
            total: parseFloat(amount),
            items: [{ id: 'p-sim', name: 'Simulated Product', qtyOrdered: 1, qtyReceived: 0, price: parseFloat(amount) }]
        };
        onCreate(newPO);
        console.log(`[ACTION] New PO simulated from ERP: ${newPO.id}. Synced to Vendor Portal.`);
        onClose();
    };

    return (
        <Modal onClose={onClose} title="Simulate PO Sync from ERP">
            <div className="space-y-4">
                <p>This simulates a PO being created in your ERP and syncing to the portal.</p>
                {vendors.length > 0 ? (
                    <>
                        <Select 
                            label="Select Approved Vendor" 
                            id="po-vendor"
                            value={vendorId}
                            onChange={e => setVendorId(e.target.value)}
                        >
                            {vendors.map(v => (
                                <option key={v.id} value={v.id}>{v.name}</option>
                            ))}
                        </Select>
                        <Input 
                            label="Total PO Amount (AED)"
                            id="po-amount"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSubmit} icon={FileText}>
                                Create & Sync PO
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="text-red-600 p-4 bg-red-50 rounded-lg">
                        You must have at least one 'Approved' vendor to simulate a PO.
                    </p>
                )}
            </div>
        </Modal>
    );
};

// 5. Bidding Page
const BiddingPage = ({ bids, products, vendors, onAddBid, onUpdateBid }) => {
    const [view, setView] = useState('dashboard'); 
    const [selectedBid, setSelectedBid] = useState(null);

    const handleStartNew = () => setView('new');
    
    const handleViewDetails = (bid) => {
        setSelectedBid(bid);
        setView('details');
    };
    
    const handleCreateBid = (newBidData) => {
        const newBid = {
            id: `b-${Math.floor(Math.random() * 1000) + 3000}`,
            status: 'Ongoing',
            ...newBidData
        };
        onAddBid(newBid);
        console.log(`[ACTION] New Bidding round created for ${newBid.productName}.`);
        setView('dashboard');
    };

    const handleAwardBid = (bidId, vendor) => {
        onUpdateBid(bidId, { status: 'Closed', awardedTo: vendor.id });
        console.log(`[ACTION] Bid for ${selectedBid.productName} awarded to ${vendor.name}. Simulating PO creation.`);
        setView('dashboard');
    };

    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center md:col-span-2 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Bidding Dashboard</h2>
                <Button icon={Plus} onClick={handleStartNew} className="w-full sm:w-auto">Start New Bidding</Button>
            </div>
            <Card>
                <h3 className="font-semibold text-gray-700 mb-4">Ongoing Bids</h3>
                <ul className="space-y-3">
                    {bids.filter(b => b.status === 'Ongoing').map(bid => (
                        <li key={bid.id} className="p-3 rounded-lg border flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div>
                                <p className="font-medium">{bid.productName}</p>
                                <p className="text-sm text-red-600">
                                    Closes: {new Date(bid.deadline).toLocaleString()}
                                </p>
                            </div>
                            <Button variant="secondary" size="sm" icon={Eye} onClick={() => handleViewDetails(bid)} className="w-full sm:w-auto">
                                View
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card>
                <h3 className="font-semibold text-gray-700 mb-4">Closed Bids</h3>
                <ul className="space-y-3">
                     {bids.filter(b => b.status === 'Closed').map(bid => (
                        <li key={bid.id} className="p-3 rounded-lg border bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div>
                                <p className="font-medium text-gray-600">{bid.productName}</p>
                                <p className="text-sm text-gray-500">
                                    Awarded to: {bids.find(b => b.id === bid.id)?.vendors.find(v => v.id === bid.awardedTo)?.name || 'N/A'}
                                </p>
                            </div>
                             <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleViewDetails(bid)} className="w-full sm:w-auto">
                                View
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
    
    if (view === 'new') {
        return <StartBiddingPage 
                    products={products} 
                    vendors={vendors} 
                    onSubmit={handleCreateBid}
                    onCancel={() => setView('dashboard')} 
                />;
    }
    
    if (view === 'details' && selectedBid) {
        return <BidDetailsPage 
                    bid={selectedBid} 
                    onAward={handleAwardBid}
                    onBack={() => setView('dashboard')} 
                />;
    }

    return renderDashboard();
};

// Start New Bid Page (Functional form)
const StartBiddingPage = ({ products, vendors, onSubmit, onCancel }) => {
    const [productId, setProductId] = useState(products[0]?.id || '');
    const [selectedVendorIds, setSelectedVendorIds] = useState([]);
    const [deadline, setDeadline] = useState('');

    const approvedVendors = vendors.filter(v => v.status === 'Approved');

    const toggleVendor = (id) => {
        setSelectedVendorIds(prev => 
            prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        const product = products.find(p => p.id === productId);
        const selectedVendors = vendors
            .filter(v => selectedVendorIds.includes(v.id))
            .map(v => ({ id: v.id, name: v.name, price: null, status: 'Not Responded' }));
            
        if (!product || selectedVendors.length === 0 || !deadline) {
            console.error("Please fill all fields.");
            return;
        }

        onSubmit({
            productName: product.name,
            deadline,
            vendors: selectedVendors
        });
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Start New Bidding Process</h2>
            <div className="space-y-4">
                <Select 
                    label="Select Product for Bidding"
                    id="bid-product"
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                >
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.vendorName})</option>
                    ))}
                </Select>
                <Input 
                    label="Bidding Deadline"
                    id="bid-deadline"
                    type="datetime-local"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Vendors to Invite</label>
                    {approvedVendors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border rounded-lg max-h-48 overflow-y-auto">
                            {approvedVendors.map(v => (
                                <label key={v.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        className="rounded text-red-600 focus:ring-red-500"
                                        checked={selectedVendorIds.includes(v.id)}
                                        onChange={() => toggleVendor(v.id)}
                                    />
                                    {v.name}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">No approved vendors available to invite.</p>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                    <Button variant="secondary" onClick={onCancel} className="w-full sm:w-auto">Cancel</Button>
                    <Button 
                        variant="primary" 
                        icon={Gavel} 
                        onClick={handleSubmit} 
                        className="w-full sm:w-auto"
                        disabled={approvedVendors.length === 0}
                    >
                        Start Bidding
                    </Button>
                </div>
            </div>
        </Card>
    );
};

// Bid Details Page (Functional awarding logic)
const BidDetailsPage = ({ bid, onAward, onBack }) => {
    
    const sortedVendors = useMemo(() => {
        return [...bid.vendors].sort((a, b) => {
            if (a.price === null) return 1;
            if (b.price === null) return -1;
            return a.price - b.price;
        });
    }, [bid.vendors]);

    return (
        <Card>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Bid Details: {bid.productName}</h2>
                <Button variant="secondary" onClick={onBack} className="w-full sm:w-auto">Back to Dashboard</Button>
            </div>
            
            <div className="mb-4">
                <p className="text-gray-600">
                    Status: <StatusBadge status={bid.status} />
                </p>
                {bid.status === 'Ongoing' && (
                    <p className="text-red-600 font-medium">
                        Deadline: {new Date(bid.deadline).toLocaleString()}
                    </p>
                )}
            </div>

            <h3 className="font-semibold text-gray-700 mb-3">Vendor Quotes</h3>
            
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedVendors.map((v, index) => (
                            <tr key={v.id} className={index === 0 && v.price !== null ? 'bg-green-50' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={v.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    {v.price !== null ? `AED ${v.price.toFixed(2)}` : 'N/A'}
                                    {index === 0 && v.price !== null && (
                                        <span className="ml-2 text-xs text-green-700 font-bold">(Lowest)</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    {bid.status === 'Ongoing' && v.status === 'Responded' && (
                                        <Button 
                                            variant="success" 
                                            icon={CheckCircle}
                                            onClick={() => onAward(bid.id, v)}
                                        >
                                            Approve Bid & Raise PO
                                        </Button>
                                    )}
                                    {bid.status === 'Closed' && bid.awardedTo === v.id && (
                                        <StatusBadge status="Awarded" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                {sortedVendors.map((v, index) => (
                    <div key={v.id} className={`p-4 border rounded-lg shadow-sm ${index === 0 && v.price !== null ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-gray-900">{v.name}</span>
                            <StatusBadge status={v.status} />
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p className="text-lg font-bold">
                                {v.price !== null ? `AED ${v.price.toFixed(2)}` : 'No Bid'}
                                {index === 0 && v.price !== null && (
                                    <span className="ml-2 text-sm text-green-700 font-bold">(Lowest)</span>
                                )}
                            </p>
                        </div>
                        {bid.status === 'Ongoing' && v.status === 'Responded' && (
                            <Button 
                                variant="success" 
                                icon={CheckCircle}
                                onClick={() => onAward(bid.id, v)}
                                className="w-full mt-4"
                            >
                                Approve Bid & Raise PO
                            </Button>
                        )}
                        {bid.status === 'Closed' && bid.awardedTo === v.id && (
                            <div className="mt-4">
                                <StatusBadge status="Awarded" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

// 6. GRN View Page 
const GRNViewPage = ({ grns, pos }) => {
    const [selectedGrn, setSelectedGrn] = useState(null);
    const [filter, setFilter] = useState('All');

    const filteredGrns = useMemo(() => {
        if (filter === 'All') return grns;
        return grns.filter(g => g.syncStatus === filter);
    }, [grns, filter]);
    
    const getPoDetails = (poId) => pos.find(p => p.id === poId);

    const GRNDetailsModal = ({ grn, onClose }) => {
        const po = getPoDetails(grn.poId);
        const poItems = po ? po.items.map(item => {
            // Simulate 80% received for the discrepant GRN
            const received = grn.discrepancy ? Math.round(item.qtyOrdered * 0.8) : item.qtyOrdered;
            return { ...item, qtyReceived: received, discrepancy: received < item.qtyOrdered };
        }) : [];

        return (
            <Modal onClose={onClose} title={`GRN Details: ${grn.id}`}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <p><strong>PO ID:</strong> {grn.poId}</p>
                        <p><strong>Vendor:</strong> {grn.vendor}</p>
                        <p><strong>GRN Date:</strong> {grn.date}</p>
                        <p><strong>Total Value:</strong> AED {grn.totalReceived.toFixed(2)}</p>
                    </div>

                    <h4 className="font-semibold text-gray-700 mt-2">Item-wise Confirmation</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ordered</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Received</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {poItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-3 py-2 font-medium">{item.name}</td>
                                        <td className="px-3 py-2 text-center">{item.qtyOrdered}</td>
                                        <td className="px-3 py-2 text-center text-gray-900 font-semibold">{item.qtyReceived}</td>
                                        <td className="px-3 py-2 text-center">
                                            {item.qtyReceived < item.qtyOrdered ? (
                                                <StatusBadge status="Pending ERP Sync" />
                                            ) : (
                                                <StatusBadge status="GRN Updated" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     {grn.discrepancy && (
                         <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                            <AlertCircle size={16} className="inline mr-2"/>
                            **DISCREPANCY:** Warehouse confirmed less quantity than ordered. ERP sync is pending reconciliation.
                        </div>
                    )}
                </div>
            </Modal>
        );
    };

    return (
        <Card className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">GRN (Goods Received Note) View</h2>
            <p className="text-sm text-gray-500 mb-4">
                This table shows the warehouse receiving confirmation, including quantity confirmation for each product. Data synced from ERP.
            </p>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['All', 'ERP Synced', 'Pending ERP Sync'].map(f => (
                    <Button 
                        key={f} 
                        variant={filter === f ? 'primary' : 'secondary'}
                        onClick={() => setFilter(f)}
                        className="text-sm flex-shrink-0"
                    >
                        {f}
                    </Button>
                ))}
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GRN ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sync Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredGrns.map(grn => (
                            <tr key={grn.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grn.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{grn.poId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grn.vendor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grn.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={grn.syncStatus} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="ghost" icon={Eye} onClick={() => setSelectedGrn(grn)}>
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedGrn && (
                <GRNDetailsModal grn={selectedGrn} onClose={() => setSelectedGrn(null)} />
            )}
        </Card>
    );
};

// Payment Details Modal (Statement of Account simulation)
const PaymentModal = ({ payment, onClose }) => {
    
    // Mock Transaction Data for SOP
    const transactions = useMemo(() => ([
        { date: '2025-08-01', description: 'Opening Balance', reference: 'N/A', debit: 0, credit: 550.00, balance: 550.00 },
        { date: '2025-10-25', description: `PO ${payment.poId} Value`, reference: payment.poId, debit: payment.amount, credit: 0, balance: 550.00 + payment.amount },
        { date: '2025-10-30', description: 'Payment on Account', reference: 'PAY-1002', debit: 0, credit: 5000.00, balance: 550.00 + payment.amount - 5000.00 },
    ]), [payment]);

    const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);
    const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
    const finalBalance = totalDebit - totalCredit;

    return (
        <Modal onClose={onClose} title={`Statement of Account (SOP): ${payment.vendor}`}>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b pb-4 text-sm">
                    <p><strong>Payment ID:</strong> {payment.id}</p>
                    <p><strong>Terms:</strong> {payment.terms}</p>
                    <p><strong>Last SOP Date:</strong> {payment.lastSOP}</p>
                    <p><strong>Current Status:</strong> <StatusBadge status={payment.status} /></p>
                </div>

                <h4 className="font-semibold text-gray-700 mt-2">Transaction Details</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Debit (PO Value)</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Credit (Payment)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((t, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2 text-gray-600">{t.date}</td>
                                    <td className="px-3 py-2 font-medium">{t.description}</td>
                                    <td className="px-3 py-2 text-right text-red-600 font-semibold">AED {t.debit.toFixed(2)}</td>
                                    <td className="px-3 py-2 text-right text-green-600 font-semibold">AED {t.credit.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-100 font-bold">
                            <tr>
                                <td colSpan="2" className="px-3 py-2 text-right">NET BALANCE DUE</td>
                                <td colSpan="2" className="px-3 py-2 text-right text-lg text-red-600">AED {finalBalance.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Modal>
    );
};


// 7. Vendor Payments Page (Clicking View/Amount opens SOP Modal)
const VendorPaymentsPage = ({ payments }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);

    return (
        <Card className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vendor Payments & SOP</h2>
            <p className="text-sm text-gray-500 mb-4">
                Monitor vendor payment statuses, due dates, and access statements of account (SOP) synced from the finance system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard 
                    title="Overdue Payments" 
                    value={payments.filter(p => p.status === 'Overdue').length} 
                    icon={AlertCircle}
                    color="secondary_red" 
                />
                <StatCard 
                    title="Total Payable (Next 30 Days)" 
                    value={`AED ${payments.filter(p => p.status === 'Pending' || p.status === 'Due in 30 Days').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}`} 
                    icon={DollarSign}
                    color="secondary_blue" 
                />
                 <StatCard 
                    title="Avg. Payment Terms" 
                    value="45 Days" 
                    icon={Clock}
                    color="secondary_pink" 
                />
            </div>

            <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Terms</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">SOP</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.vendor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{p.poId}</td>
                                <td 
                                    className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 cursor-pointer hover:underline"
                                    onClick={() => setSelectedPayment(p)}
                                >
                                    AED {p.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{p.terms}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{p.dueDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={p.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="secondary" icon={FileCheck} className="text-sm" onClick={() => setSelectedPayment(p)}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedPayment && (
                <PaymentModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
            )}
        </Card>
    );
};

// 8. Reports Page
const ReportsPage = ({ vendors, products }) => {
    
    // Mock Report Data Logic
    const approvedProductsCount = products.filter(p => p.status === 'Approved').length;
    const pendingProductsCount = products.filter(p => p.status === 'Pending Review').length;
    const approvedVendorCount = vendors.filter(v => v.status === 'Approved').length;
    
    const approvalRate = products.length > 0 ? ((approvedProductsCount / products.length) * 100).toFixed(1) : 0;

    const ReportCard = ({ title, value, unit, icon: Icon, color }) => (
        <Card className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <p className="text-lg font-bold text-gray-900">{value}{unit}</p>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </Card>
    );

    return (
        <Card className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Procurement Reports & Analytics</h2>
            <p className="text-sm text-gray-500 mb-4">
                Access key metrics on vendor activity, product efficiency, and system approval trends.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <ReportCard 
                    title="Active Vendors" 
                    value={approvedVendorCount} 
                    unit="" 
                    icon={Users}
                    color="bg-green-500"
                />
                <ReportCard 
                    title="Approved Products" 
                    value={approvedProductsCount} 
                    unit="" 
                    icon={Package}
                    color="bg-slate-500" // Updated color
                />
                 <ReportCard 
                    title="Approval Rate (Products)" 
                    value={approvalRate} 
                    unit="%" 
                    icon={TrendingUp}
                    color="bg-yellow-500"
                />
                 <ReportCard 
                    title="Pending for Buyer Review" 
                    value={pendingProductsCount} 
                    unit="" 
                    icon={AlertCircle}
                    color="bg-red-500"
                />
            </div>
            
            <h3 className="font-semibold text-gray-800 mt-6 mb-3 border-t pt-4">Vendor Activity Report (Mock Data)</h3>
            <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Products</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending Approval</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {vendors.map(v => (
                            <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{products.filter(p => p.vendorId === v.id).length}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{products.filter(p => p.vendorId === v.id && p.status === 'Pending Review').length}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {v.status === 'Revoked' ? 'Re-upload Needed' : 'Verified'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.submittedOn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};


// --- New Placeholder Pages ---
const SettingsPage = () => (
    <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User & System Settings</h2>
        
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-t pt-4">Profile and Preferences</h3>
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <p><strong>Buying Head Role:</strong> Food - Non-Food Category</p>
            <p><strong>Primary Currency:</strong> AED (Cannot be changed)</p>
            <p><strong>Default View:</strong> Purchase Orders</p>
            <Button variant="secondary" icon={Edit2} className="mt-2">Update Profile Details</Button>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-t pt-4">Notification Settings</h3>
        <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between items-center p-2 border-b">
                <span>Alert on New Vendor Submission</span>
                <input type="checkbox" defaultChecked className="rounded text-red-600 focus:ring-red-500" />
            </li>
            <li className="flex justify-between items-center p-2 border-b">
                <span>Alert on Vendor Product Resubmission</span>
                 <input type="checkbox" defaultChecked className="rounded text-red-600 focus:ring-red-500" />
            </li>
            <li className="flex justify-between items-center p-2">
                <span>Alert on Warehouse GRN Discrepancy</span>
                 <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
            </li>
        </ul>
    </Card>
);

const HelpPage = () => (
    <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Help & Support Center</h2>
        
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-t pt-4">Contact Support</h3>
        <div className="space-y-2 p-3 bg-red-50 rounded-lg">
            <p><strong>Email:</strong> support@abreco.com</p>
            <p><strong>Phone:</strong> +971 4 555 1234</p>
            <p><strong>Hours:</strong> Sunday - Thursday, 9:00 AM - 5:00 PM (GST)</p>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-t pt-4">FAQ Topics</h3>
        <ul className="space-y-2 text-red-600">
            <li><a href="#" className="hover:underline">How do I edit Vendor Payment Terms?</a></li>
            <li><a href="#" className="hover:underline">What does 'Pending L2 Approval' mean?</a></li>
            <li><a href="#" className="hover:underline">How are GRN discrepancies handled by the ERP?</a></li>
            <li><a href="#" className="hover:underline">Bidding: How to award a bid and track PO generation?</a></li>
        </ul>
    </Card>
);

// --- Main App Components ---

// Sidebar Component - Styled to match image
const Sidebar = ({ currentPage, onNavigate, isOpen, onClose, onLogout }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
        { name: 'Products', icon: Package, page: 'products' }, 
        { name: 'Orders (PO)', icon: ShoppingCart, page: 'pos' }, 
        { name: 'Payments', icon: DollarSign, page: 'payments' }, 
        { name: 'Statement of Account', icon: ScrollText, page: 'sop' }, 
        { name: 'Bidding', icon: Gavel, page: 'bidding' },
    ];
    
    // Tools section
    const toolItems = [
         { name: 'Vendors', icon: Building, page: 'vendors' }, 
         { name: 'GRN View', icon: ClipboardCheck, page: 'grn' }, 
         { name: 'Reports', icon: BarChart3, page: 'reports' }, 
         { name: 'Settings', icon: ListOrdered, page: 'settings' }, 
         { name: 'Help', icon: Receipt, page: 'help' }, 
    ];


    const NavLink = ({ item }) => {
        const isActive = currentPage === item.page;
        return (
            <button
                onClick={() => {
                    onNavigate(item.page);
                    onClose(); 
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 relative
                    ${isActive 
                        ? 'bg-red-50 text-red-600 font-semibold' // Active link: light red background, red text
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                `}
            >
                <item.icon size={20} className={`ml-1 ${isActive ? 'text-red-600' : ''}`} />
                <span className="ml-4 text-left">{item.name}</span>
            </button>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            
            {/* Sidebar */}
            <div className={`w-64 bg-white h-screen fixed top-0 left-0 shadow-lg p-5 flex flex-col z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex items-center gap-2 mb-8">
                    <span className="p-2 bg-red-600 rounded-lg"> 
                        <Truck size={24} className="text-white" />
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900">Abreco</h1>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-4">Menu</p>
                    {navItems.map(item => (
                        <NavLink key={item.page} item={item} />
                    ))}

                    <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4 pt-4 border-t">Tools</p>
                    {toolItems.map(item => (
                        <NavLink key={item.page} item={item} />
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t">
                    <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span className="ml-4 font-medium">Log Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

// Header Component
const Header = ({ user, onMenuClick }) => {
    return (
        <header className="bg-white h-20 fixed top-0 left-0 lg:left-64 right-0 border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 z-20">
            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-500 hover:text-gray-800" onClick={onMenuClick}>
                <Menu size={24} />
            </button>
            
            {/* Title / Dashboard text aligned left */}
            <h2 className="text-xl font-bold text-gray-900 hidden lg:block">Dashboard</h2>
            
            <div className="flex items-center gap-4 ml-auto">
                <button className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell size={22} />
                </button>
                <div className="flex items-center gap-3">
                    <img 
                        src={user.avatar} 
                        alt="User Avatar" 
                        className="w-10 h-10 rounded-full border-2 border-red-500" // Border color adjusted
                        onError={(e) => { e.target.src = 'https://placehold.co/100x100/dc2626/FFFFFF?text=FA'; }}
                    />
                    <div className="hidden sm:block">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <button className="text-gray-500 hover:text-gray-800 hidden sm:block">
                        <ChevronDown size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

// Main Dashboard Layout
const DashboardLayout = ({ onLogout }) => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // --- Main Data State ---
    const [vendors, setVendors] = useState(MOCK_VENDORS);
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [pos, setPos] = useState(MOCK_POS);
    const [bids, setBids] =useState(MOCK_BIDS);
    const [grns, setGrns] = useState(MOCK_GRNS); 
    const [payments, setPayments] = useState(MOCK_PAYMENTS); 

    // --- Data Update Handlers ---
    const handleUpdateVendor = (vendorId, updates) => {
        setVendors(prevVendors => 
            prevVendors.map(v => 
                v.id === vendorId ? { ...v, ...updates } : v
            )
        );
    };

    const handleUpdateProduct = (productId, updates) => {
        setProducts(prevProducts =>
            prevProducts.map(p => 
                p.id === productId ? { ...p, ...updates } : p
            )
        );
    };

    const handleAddPO = (newPO) => {
        setPos(prevPOs => [newPO, ...prevPOs]);
    };
    
    const handleAddBid = (newBid) => {
        setBids(prevBids => [newBid, ...prevBids]);
    };

    const handleUpdateBid = (bidId, updates) => {
        setBids(prevBids => 
            prevBids.map(b => 
                b.id === bidId ? { ...b, ...updates } : b
            )
        );
    };

    // --- Page Rendering Logic ---
    const renderPage = () => {
        const allData = { vendors, products, pos, bids, grns, payments };
        
        switch (currentPage) {
            case 'dashboard':
                return <DashboardPage data={allData} onNavigate={setCurrentPage} />;
            case 'vendors':
                return <VendorManagementPage vendors={vendors} onUpdateVendor={handleUpdateVendor} />;
            case 'products':
                return <ProductReviewPage products={products} onUpdateProduct={handleUpdateProduct} />;
            case 'pos':
                return <PurchaseOrdersPage pos={pos} vendors={vendors} onAddPO={handleAddPO} />;
            case 'bidding':
                return <BiddingPage 
                            bids={bids} 
                            products={products} 
                            vendors={vendors} 
                            onAddBid={handleAddBid}
                            onUpdateBid={handleUpdateBid} 
                        />;
            case 'grn':
                return <GRNViewPage grns={grns} pos={pos} />;
            case 'payments':
            case 'sop': // Payments and SOP pages use the same underlying component
                return <VendorPaymentsPage payments={payments} />;
            case 'reports':
                return <ReportsPage vendors={vendors} products={products} />;
            case 'settings':
                return <SettingsPage />;
            case 'help':
                return <HelpPage />;
            default:
                return <DashboardPage data={allData} onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-inter">
            {/* FIX: Convert boolean props to string for the style tag */}
            <style jsx="true" global="true">{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                @keyframes modal-in {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-modal-in {
                    animation: modal-in 0.2s ease-out forwards;
                }
            `}</style>
            <Sidebar 
                currentPage={currentPage} 
                onNavigate={setCurrentPage} 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={onLogout}
            />
            <Header user={MOCK_USER} onMenuClick={() => setIsSidebarOpen(true)} />

            <main className="lg:ml-64 pt-20 transition-all duration-300 ease-in-out">
                <div className="p-4 sm:p-8">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};


// --- App Component (Main) ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return <DashboardLayout onLogout={handleLogout} />;
}