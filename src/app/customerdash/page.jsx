"use client"
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
    Briefcase, // Business Info
    Users, // Contacts
    Globe, // Website
    Phone, // Mobile
    Trash2, // Delete
    Landmark, // Bank
    CheckSquare, // Preferences
    ClipboardCheck, // Review
    Check, // Added Check icon
    CreditCard as CardIcon, // Renamed to avoid conflict
    Heart, // NEW: For Saved Items
    ShoppingBag, // NEW: For Add to Cart
    RefreshCw, // For Re-order
    ChevronRight as ChevronRightIcon,
    AlertCircle, // For Return Status
    Undo2, // For Refund Icon
    Repeat, // For Replace Icon
    MinusCircle, // For Shortage Icon
    PackageOpen, // For Partial Delivery
    BoxSelect, // For Checklist
    Minus, // For Qty Stepper
    KeyRound, // For OTP
    Sun, // For Light Mode
    Moon, // For Dark Mode
    PlayCircle, // NEW: For Video
    MessageCircle, // NEW: For Chat
    ChevronUp, // NEW: For Accordion
    Printer, // Added for Invoice View
    Eye, // Added Eye icon for View
    ThumbsUp, // For Approval
    ThumbsDown, // For Rejection
    UserCheck, // For Technician
    Filter // NEW: For Filters

} from 'lucide-react';


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- CONSTANTS & MOCK DATA
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const INITIAL_ORDERS = [
    { id: 'ORD-2935', date: '2025-12-03', amount: 320.00, status: 'Partially Delivered', items: 'Frozen Meat Selection', extraItems: 2, eta: '-' },
    { id: 'ORD-2931', date: '2025-12-02', amount: 450.00, status: 'Pending Delivery', items: 'Atlantic Salmon Fillet', extraItems: 1, eta: 'Today, 2 PM' },
    { id: 'ORD-2930', date: '2025-11-29', amount: 120.00, status: 'Delivered', items: 'Industrial Cleaner', extraItems: 0, eta: '-' },
    { id: 'ORD-2928', date: '2025-11-25', amount: 850.50, status: 'Delivered', items: 'Kitchen Equipment Set', extraItems: 2, eta: '-' },
    { id: 'ORD-2925', date: '2025-11-20', amount: 60.00, status: 'Cancelled', items: 'Misc Supplies', extraItems: 0, eta: '-' },
    // Added Dummy Returns Data
    { id: 'ORD-2920', date: '2025-11-18', amount: 215.50, status: 'Delivered', items: 'Bulk Spices Pack', extraItems: 4, eta: '-', returnStatus: 'Processing' },
    { id: 'ORD-2918', date: '2025-11-15', amount: 1200.00, status: 'Returned', items: 'Commercial Blender', extraItems: 0, eta: '-', returnStatus: 'Approved' },
    { id: 'ORD-2912', date: '2025-11-10', amount: 45.00, status: 'Refunded', items: 'Sample Box (Pack of 5)', extraItems: 0, eta: '-', returnStatus: 'Refunded' },
];

const INITIAL_SAVED_ITEMS = [
    { id: 101, name: 'Premium Basmati Rice (Royal)', sku: 'GRA-005', price: 45.00, unit: '5kg Bag', status: 'In Stock', image: 'rice' },
    { id: 102, name: 'Frozen Chicken Breast', sku: 'FRZ-102', price: 18.50, unit: '1kg Pack', status: 'In Stock', image: 'chicken' },
    { id: 103, name: 'Industrial Floor Cleaner', sku: 'CLN-882', price: 120.00, unit: '20L Drum', status: 'Low Stock', image: 'cleaner' },
    { id: 104, name: 'Organic Avocados (Kenya)', sku: 'VEG-303', price: 85.00, unit: 'Box (4kg)', status: 'Out of Stock', image: 'avocado' }
];

const INITIAL_SERVICES = [
    {
        id: 'SR-101',
        type: 'AC Maintenance',
        date: '2025-12-01',
        status: 'Estimate Pending',
        desc: 'Leaking water in Server Room unit. Needs urgent check.',
        location: 'Main Warehouse, Server Room',
        estimate: {
            amount: 350.00,
            validUntil: '2025-12-10',
            items: [
                { desc: 'Diagnostic Fee', cost: 100 },
                { desc: 'Gas Refill (R410A)', cost: 150 },
                { desc: 'Leakage Repair & Sealant', cost: 100 }
            ]
        }
    },
    {
        id: 'SR-100',
        type: 'Deep Cleaning',
        date: '2025-11-28',
        status: 'Approved',
        desc: 'Quarterly deep clean of kitchen area.',
        location: 'Kitchen Branch 1',
        technician: { name: 'CleanPro Team A', phone: '+971 50 111 2222', rating: 4.9 },
        schedule: 'Dec 05, 2025 - 09:00 AM'
    },
    {
        id: 'SR-099',
        type: 'Plumbing',
        date: '2025-11-15',
        status: 'Completed',
        desc: 'Fix kitchen sink blockage.',
        location: 'Kitchen Branch 1',
        technician: { name: 'QuickFix Maintenance', phone: '+971 52 333 4444', rating: 4.5 },
        completedDate: 'Nov 16, 2025',
        finalCost: 150.00
    }
];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- TOAST NOTIFICATION SYSTEM
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
const ToastContext = React.createContext(null);

const ToastContainer = ({ toasts, removeToast }) => (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
            <div key={toast.id} className={`pointer-events-auto transform transition-all duration-300 animate-in slide-in-from-right fade-in flex items-center p-4 rounded-xl shadow-lg border w-80 backdrop-blur-md ${toast.type === 'success' ? 'bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100' :
                toast.type === 'error' ? 'bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100' :
                    'bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                }`}>
                <div className={`mr-3 p-1 rounded-full ${toast.type === 'success' ? 'bg-green-100 dark:bg-green-800' : toast.type === 'error' ? 'bg-red-100 dark:bg-red-800' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : toast.type === 'error' ? <XCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <div className="flex-1 text-sm font-medium">{toast.message}</div>
                <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70"><X className="w-4 h-4" /></button>
            </div>
        ))}
    </div>
);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- REUSABLE HELPER & UI COMPONENTS
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const Modal = ({ children, title, onClose, size = 'md', noPadding = false }) => {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-4xl',
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-slate-900 w-[95%] sm:w-full ${sizeClasses[size] || 'max-w-md'} rounded-2xl shadow-2xl flex flex-col max-h-[90vh] border dark:border-slate-800`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h3>
                    {onClose && (
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className={`overflow-y-auto ${noPadding ? '' : 'p-4 sm:p-6'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const FormInput = ({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, disabled = false, readOnly = false, className = '', labelClassName = '', required = false, name }) => (
    <div className="w-full">
        <label htmlFor={id} className={`block text-sm font-medium mb-1 ${labelClassName || 'text-slate-700 dark:text-slate-300'}`}>{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            {Icon && <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"><Icon className={`w-5 h-5 ${className.includes('text-white') ? 'text-white/50' : 'text-slate-400'}`} /></div>}
            <input
                type={type}
                id={id}
                name={name || id}
                value={value !== undefined && value !== null ? value : ''}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                className={`block w-full ${Icon ? 'ps-10' : 'ps-4'} pe-4 py-2.5 border rounded-lg shadow-sm transition-colors duration-150 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500 ${className ? className : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-950'}`}
                placeholder={placeholder}
            />
        </div>
    </div>
);

const FormSelect = ({ id, label, icon: Icon, value, onChange, children, disabled = false, className = '', labelClassName = '', required = false, name }) => (
    <div className="w-full">
        <label htmlFor={id} className={`block text-sm font-medium mb-1 ${labelClassName || 'text-slate-700 dark:text-slate-300'}`}>{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative">
            {Icon && <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"><Icon className={`w-5 h-5 ${className.includes('text-white') ? 'text-white/50' : 'text-slate-400'}`} /></div>}
            <select
                id={id}
                name={name || id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`block w-full ${Icon ? 'ps-10' : 'ps-4'} pe-10 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm disabled:bg-slate-100 dark:disabled:bg-slate-800 ${className ? className : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-white dark:bg-slate-950'}`}
            >
                {children}
            </select>
        </div>
    </div>
);

const PrimaryButton = ({ children, onClick, className = '', type = 'button', disabled = false, variant = 'primary' }) => {
    const baseClasses = "w-full flex justify-center items-center gap-2 py-3 px-4 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:cursor-not-allowed";
    const variants = {
        primary: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400 dark:bg-red-600 dark:hover:bg-red-700",
        secondary: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-slate-500 disabled:bg-slate-100",
        outline: "border-red-600 text-red-600 dark:text-red-400 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500"
    };
    return <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}>{children}</button>;
};

const StatCard = ({ title, value, icon: Icon, details, color = 'red', onClick }) => {
    const colorMap = {
        red: { gradient: 'from-rose-500 to-red-600', shadow: 'shadow-rose-500/20' },
        blue: { gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
        green: { gradient: 'from-emerald-400 to-green-600', shadow: 'shadow-emerald-500/20' },
        orange: { gradient: 'from-orange-400 to-pink-600', shadow: 'shadow-orange-500/20' },
        purple: { gradient: 'from-violet-500 to-fuchsia-600', shadow: 'shadow-violet-500/20' },
        teal: { gradient: 'from-cyan-400 to-teal-600', shadow: 'shadow-cyan-500/20' },
    };
    const theme = colorMap[color] || colorMap.red;

    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.shadow} ${onClick ? 'cursor-pointer' : ''}`}
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} transition-all duration-300`}></div>

            {/* Glassmorphism Pattern / Texture Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:bg-white/20"></div>
            <div className="absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-black/10 blur-2xl"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner ring-1 ring-white/30 text-white transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-white/80">{title}</p>
                    <h3 className="mt-1 text-3xl font-black text-white tracking-tight drop-shadow-sm">{value}</h3>
                    {details && (
                        <div className="mt-3 inline-flex items-center rounded-lg bg-black/10 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/10">
                            {details}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Card = ({ children, className = '', noPadding = false, onClick }) => (
    // Updated to rounded-3xl and softer shadow/border for the "light theme feel"
    <div onClick={onClick} className={`bg-white dark:bg-slate-800/60 dark:backdrop-blur-md dark:border-slate-700/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 dark:border-slate-700 ${className} ${onClick ? 'cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow' : ''}`}>
        {noPadding ? children : <div className="p-5 sm:p-6">{children}</div>}
    </div>
);

const CardHeader = ({ title, children }) => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 gap-2 sm:gap-0">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        {children && <div className="mt-0">{children}</div>}
    </div>
);

const CardContent = ({ children, className = '' }) => (
    <div className={`p-4 sm:p-5 ${className}`}>
        {children}
    </div>
);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- CART & CART DRAWER
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, checkout }) => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ease-out border-l dark:border-slate-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                    <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white"><ShoppingBag className="w-5 h-5" /> Your Cart ({cartItems.length})</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full dark:text-white"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <ShoppingCart className="w-16 h-16 opacity-20" />
                            <p>Your cart is empty.</p>
                            <button onClick={onClose} className="text-blue-600 font-bold hover:underline">Start Browsing</button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.cartId} className="flex gap-4 p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-sm transition-shadow dark:bg-slate-800/50">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                                    <Package className="w-8 h-8" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-sm line-clamp-2 dark:text-white">{item.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.unit}</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border dark:border-slate-700">
                                            <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-red-600 dark:text-slate-400"><Minus className="w-3 h-3" /></button>
                                            <span className="text-xs font-bold w-6 text-center dark:text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-blue-600 dark:text-slate-400"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <p className="font-bold text-sm dark:text-white">AED {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-4">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900 dark:text-white">AED {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300 text-sm">
                        <span>VAT (5%)</span>
                        <span className="font-bold text-slate-900 dark:text-white">AED {(total * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span>Total</span>
                        <span>AED {(total * 1.05).toFixed(2)}</span>
                    </div>
                    <PrimaryButton onClick={checkout} disabled={cartItems.length === 0}>
                        Checkout Now
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

// ... (DeliveryChecklistModal, ReturnRequestModal - UNCHANGED from previous)
const DeliveryChecklistModal = ({ order, onClose, onConfirm }) => {
    const [items, setItems] = useState([]);
    const [receivedQuantities, setReceivedQuantities] = useState({});
    const [step, setStep] = useState(1); // 1: Verify Quantities, 2: OTP/Confirm
    const [otp, setOtp] = useState('');

    useEffect(() => {
        // Mock items
        const generatedItems = [
            { id: 'itm-001', name: order.items, qty: 5, unit: 'kg' }, // Changed to 5kg for demo of qty
            ...Array.from({ length: order.extraItems || 0 }).map((_, i) => ({
                id: `itm-ext-${i + 2}`,
                name: `Extra Item #${i + 1} (Misc)`,
                qty: 1,
                unit: 'Unit'
            }))
        ];
        setItems(generatedItems);

        // Default received = ordered
        const initialQty = {};
        generatedItems.forEach(i => initialQty[i.id] = i.qty);
        setReceivedQuantities(initialQty);
    }, [order]);

    const handleQtyChange = (id, delta) => {
        setReceivedQuantities(prev => {
            const current = prev[id] || 0;
            const item = items.find(i => i.id === id);
            const max = item.qty;
            const newVal = Math.max(0, Math.min(max, current + delta));
            return { ...prev, [id]: newVal };
        });
    };

    const handleNext = () => setStep(2);

    const handleFinalConfirm = () => {
        // In a real app, validate OTP here
        if (otp.length < 4) {
            console.warn("Please enter a valid 4-digit Delivery PIN"); // Using console.warn instead of alert
            return;
        }

        const discrepancies = items.filter(i => receivedQuantities[i.id] < i.qty).map(i => ({
            id: i.id,
            name: i.name,
            ordered: i.qty,
            received: receivedQuantities[i.id],
            missing: i.qty - receivedQuantities[i.id]
        }));

        const status = discrepancies.length > 0 ? 'Partially Delivered' : 'Delivered';
        onConfirm({ status, discrepancies });
    };

    const isShortage = items.some(i => receivedQuantities[i.id] < i.qty);

    if (step === 2) {
        return (
            <Modal title="Acknowledge Delivery" onClose={onClose} size="sm">
                <div className="space-y-6 text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${isShortage ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>
                        {isShortage ? <AlertTriangle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            {isShortage ? 'Confirm with Shortages' : 'Confirm Full Receipt'}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            {isShortage
                                ? 'You are acknowledging receipt with missing items. A shortage ticket will be raised automatically.'
                                : 'You are acknowledging receipt of all items in good condition.'}
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Delivery PIN / OTP</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-center font-mono text-lg tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="0 0 0 0"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-center">Ask the driver for the delivery PIN</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="flex-1 py-3 text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 font-bold rounded-lg">Back</button>
                        <PrimaryButton onClick={handleFinalConfirm} className="flex-1" disabled={otp.length < 4}>
                            Confirm Receipt
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <Modal title="Verify Items & Quantities" onClose={onClose} size="lg">
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex gap-3">
                    <BoxSelect className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-200">Check Received Quantities</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">Please count the items. If any are missing, reduce the quantity below.</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {items.map(item => {
                        const received = receivedQuantities[item.id];
                        const isMissing = received < item.qty;
                        return (
                            <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all ${isMissing ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                                <div className="mb-3 sm:mb-0">
                                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Ordered: {item.qty} {item.unit}</p>
                                    {isMissing && (
                                        <span className="inline-block mt-1 text-[10px] font-bold bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                            Shortage: {item.qty - received} {item.unit}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm self-start sm:self-auto">
                                    <button
                                        onClick={() => handleQtyChange(item.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors disabled:opacity-50"
                                        disabled={received <= 0}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-slate-900 dark:text-white">{received}</span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors disabled:opacity-50"
                                        disabled={received >= item.qty}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button onClick={onClose} className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 font-medium">Cancel</button>
                    <PrimaryButton onClick={handleNext} className="w-auto px-6">
                        Next: Confirm
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

const ReturnRequestModal = ({ order, onClose, onSubmit }) => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [itemDetails, setItemDetails] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate mock detailed items from the order summary
    useEffect(() => {
        const generatedItems = [
            { id: 'itm-001', name: order.items, qty: 1, unit: 'Unit' },
            ...Array.from({ length: order.extraItems || 0 }).map((_, i) => ({
                id: `itm-ext-${i + 2}`,
                name: `Extra Item #${i + 1} (Misc)`,
                qty: 1,
                unit: 'Unit'
            }))
        ];
        setItems(generatedItems);
    }, [order]);

    const toggleItem = (id) => {
        setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
        // Initialize details if selecting
        if (!selectedItems[id] && !itemDetails[id]) {
            setItemDetails(prev => ({
                ...prev,
                [id]: { action: 'refund', reason: '', comments: '', proof: null }
            }));
        }
    };

    const updateDetail = (id, field, value) => {
        setItemDetails(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const handleActionChange = (id, action) => {
        updateDetail(id, 'action', action);
        // Reset reason when action changes as reasons might differ
        updateDetail(id, 'reason', '');
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            const report = Object.keys(selectedItems)
                .filter(key => selectedItems[key])
                .map(key => ({
                    itemId: key,
                    itemName: items.find(i => i.id === key).name,
                    ...itemDetails[key]
                }));

            onSubmit(report);
            setIsSubmitting(false);
        }, 1500);
    };

    const getReasons = (action) => {
        switch (action) {
            case 'refund': return ['Item Damaged', 'Item Expired', 'Wrong Item Sent', 'Quality Issue', 'Ordered by Mistake'];
            case 'replace': return ['Item Damaged', 'Wrong Item Sent', 'Near Expiry'];
            case 'shortage': return ['Item Missing from Box', 'Empty Box Received'];
            default: return [];
        }
    };

    const hasSelectedItems = Object.keys(selectedItems).some(k => selectedItems[k]);
    const allReasonsFilled = Object.keys(selectedItems)
        .filter(k => selectedItems[k])
        .every(k => itemDetails[k]?.reason !== '');

    return (
        <Modal title={`Report Issue: Order #${order.id}`} onClose={onClose} size="2xl">
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <p className="font-bold">Return & Issue Policy</p>
                        <p className="mt-1">Please select the items you have an issue with. For damaged items, photo proof is required for faster processing.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Select Items</h4>
                    {items.map(item => (
                        <div key={item.id} className={`border rounded-xl p-4 transition-all duration-300 ${selectedItems[item.id] ? 'border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10 shadow-sm' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded text-red-600 focus:ring-red-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                                    checked={!!selectedItems[item.id]}
                                    onChange={() => toggleItem(item.id)}
                                />
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.qty} {item.unit}</p>
                                </div>
                            </div>

                            {/* Collapsible Details Area */}
                            {selectedItems[item.id] && itemDetails[item.id] && (
                                <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700 pl-8 space-y-4 animate-in slide-in-from-top-2 fade-in">

                                    {/* Action Selector */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">What's the issue?</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: 'refund', label: 'Refund', icon: Undo2 },
                                                { id: 'replace', label: 'Replace', icon: Repeat },
                                                { id: 'shortage', label: 'Shortage', icon: MinusCircle }
                                            ].map(type => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => handleActionChange(item.id, type.id)}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-all ${itemDetails[item.id].action === type.id
                                                        ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-800 dark:border-white shadow-md'
                                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    <type.icon className="w-5 h-5 mb-1" />
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reason Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Reason</label>
                                        <select
                                            className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                                            value={itemDetails[item.id].reason}
                                            onChange={(e) => updateDetail(item.id, 'reason', e.target.value)}
                                        >
                                            <option value="">Select a reason...</option>
                                            {getReasons(itemDetails[item.id].action).map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Proof Upload (Conditional) */}
                                    {itemDetails[item.id].action !== 'shortage' && (
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Upload Proof (Photo)</label>
                                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:border-red-300 dark:hover:border-red-500 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-900/50">
                                                <Camera className="w-6 h-6 mb-1" />
                                                <span className="text-xs">Click to upload image</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Comments */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Additional Comments</label>
                                        <textarea
                                            className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none min-h-[80px]"
                                            placeholder="Describe the issue in detail..."
                                            value={itemDetails[item.id].comments}
                                            onChange={(e) => updateDetail(item.id, 'comments', e.target.value)}
                                        />
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                    <PrimaryButton
                        onClick={handleSubmit}
                        className="w-auto px-6"
                        disabled={!hasSelectedItems || !allReasonsFilled || isSubmitting}
                    >
                        {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" /> Submitting...</> : 'Submit Request'}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

const OnboardingWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [customDocName, setCustomDocName] = useState('image_ba5dbd.png'); // Pre-fill with the uploaded file name
    const [formData, setFormData] = useState({
        companyName: '',
        businessType: 'Restaurant',
        isCustomBusinessType: false,
        aboutBusiness: '',
        licenseNo: '',
        vatNo: '',
        addresses: [{ id: Date.now(), name: 'Main Office', details: '' }],
        contacts: [{ id: Date.now(), name: '', role: '', phone: '', whatsapp: '', email: '', isCustomRole: false }], // Added whatsapp field
        // Updated documents structure to support status and rejection flow
        documents: [
            {
                id: 1,
                name: 'Trade License Copy',
                status: 'pending_review',
                steps: [{ label: 'Uploaded', status: 'completed' }, { label: 'Review', status: 'current' }, { label: 'Approved', status: 'pending' }]
            },
            {
                id: 2,
                name: 'VAT Certificate',
                status: 'revoked',
                rejectionReason: 'Document expired. Please upload a valid certificate.',
                steps: [{ label: 'Uploaded', status: 'completed' }, { label: 'Review', status: 'error' }, { label: 'Approved', status: 'pending' }]
            },
            {
                id: 3,
                name: 'Passport Copy (Owner)',
                status: 'pending_upload',
                steps: [{ label: 'Uploaded', status: 'pending' }, { label: 'Review', status: 'pending' }, { label: 'Approved', status: 'pending' }]
            }
        ],
        bankName: '',
        iban: '',
        phone: '',
        beneficiary: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Address Handlers
    const handleAddressChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            addresses: prev.addresses.map(addr => addr.id === id ? { ...addr, [field]: value } : addr)
        }));
    };

    const addAddress = () => {
        setFormData(prev => ({
            ...prev,
            addresses: [...prev.addresses, { id: Date.now(), name: '', details: '' }]
        }));
    };

    const removeAddress = (id) => {
        if (formData.addresses.length <= 1) {
            // NOTE: Changed alert() usage to console log/no-op as per instructions, but kept the logic for demo clarity.
            console.warn("At least one address is required.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            addresses: prev.addresses.filter(addr => addr.id !== id)
        }));
    };

    // Contact Handlers (NEW)
    const handleContactChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            contacts: prev.contacts.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
    };

    const addContact = () => {
        setFormData(prev => ({
            ...prev,
            contacts: [...prev.contacts, { id: Date.now(), name: '', role: '', phone: '', whatsapp: '', email: '', isCustomRole: false }]
        }));
    };

    const removeContact = (id) => {
        if (formData.contacts.length <= 1) {
            console.warn("At least one contact person is required.");
            return;
        }
        setFormData(prev => ({
            ...prev,
            contacts: prev.contacts.filter(c => c.id !== id)
        }));
    };

    // NEW: Handler for adding custom documents
    const handleAddDocument = () => {
        if (customDocName.trim()) {
            const newDoc = {
                id: Date.now(),
                name: customDocName.trim(),
                status: 'pending_upload',
                steps: [{ label: 'Uploaded', status: 'pending' }, { label: 'Review', status: 'pending' }, { label: 'Approved', status: 'pending' }]
            };
            // Prevent duplicate addition for the current session/demo
            if (!formData.documents.some(d => d.name === customDocName.trim())) {
                setFormData(prev => ({ ...prev, documents: [...prev.documents, newDoc] }));
            }
            setCustomDocName('');
        }
    };

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                documents: prev.documents.map(doc => {
                    if (doc.id === id) {
                        return {
                            ...doc,
                            status: 'pending_review',
                            rejectionReason: null,
                            steps: [{ label: 'Uploaded', status: 'completed' }, { label: 'Review', status: 'current' }, { label: 'Approved', status: 'pending' }]
                        };
                    }
                    return doc;
                })
            }));
        }
    };

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(prev => prev + 1);
        }, 800);
    };

    const steps = [
        { id: 1, label: "Business Details", icon: Building },
        { id: 2, label: "Add Contacts", icon: Users }, // Added Step
        { id: 3, label: "KYC Uploads", icon: UploadCloud },
        { id: 4, label: "Financial Info", icon: Landmark },
        { id: 5, label: "Review & Submit", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 font-inter">
            <Card className="w-full max-w-2xl" noPadding>
                {/* Header / Stepper */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-lg"><Package2 className="w-6 h-6" /></div>
                            <h2 className="text-2xl font-bold">Customer Registration</h2>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/20 -z-0"></div>
                            {steps.map((s) => {
                                const isActive = s.id === step;
                                const isCompleted = s.id < step;
                                return (
                                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive ? 'bg-white text-slate-900 scale-110 shadow-lg' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                            {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8">
                    {step === 1 && (
                        <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Business Information</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Please provide your official company details as per your trade license.</p>

                            {/* Company & Business Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput id="companyName" name="companyName" label="Company Name" icon={Building} placeholder="Legal Entity Name" value={formData.companyName} onChange={handleChange} />

                                {/* Custom Business Type Logic */}
                                <div className="w-full">
                                    <label htmlFor="businessType" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Business Type</label>
                                    {formData.isCustomBusinessType ? (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                                                    <Briefcase className="w-5 h-5 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="businessType"
                                                    name="businessType"
                                                    value={formData.businessType}
                                                    onChange={handleChange}
                                                    placeholder="Enter Business Type"
                                                    className="block w-full ps-10 pe-4 py-2.5 border rounded-lg shadow-sm transition-colors duration-150 focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-950"
                                                    autoFocus
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, isCustomBusinessType: false, businessType: 'Restaurant' })}
                                                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 border border-slate-200 dark:border-slate-700 transition-colors"
                                                title="Back to list"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                                                <Briefcase className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <select
                                                id="businessType"
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Other') {
                                                        setFormData({ ...formData, isCustomBusinessType: true, businessType: '' });
                                                    } else {
                                                        handleChange(e);
                                                    }
                                                }}
                                                className="block w-full ps-10 pe-10 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-white dark:bg-slate-950 appearance-none"
                                            >
                                                <option value="Restaurant">Restaurant</option>
                                                <option value="Hotel">Hotel</option>
                                                <option value="Retail">Retail</option>
                                                <option value="Catering">Catering</option>
                                                <option value="Other">Other (Type Custom)</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* About Business */}
                            <div>
                                <label htmlFor="aboutBusiness" className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">About Business</label>
                                <textarea
                                    id="aboutBusiness"
                                    name="aboutBusiness"
                                    className="block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-950"
                                    placeholder="Tell us briefly about your business operations..."
                                    rows="2"
                                    value={formData.aboutBusiness}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* License & VAT */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput id="licenseNo" name="licenseNo" label="Trade License No." icon={FileText} placeholder="e.g. CN-1234567" value={formData.licenseNo} onChange={handleChange} />
                                <FormInput id="vatNo" name="vatNo" label="VAT TRN" icon={FileSpreadsheet} placeholder="15-digit TRN" value={formData.vatNo} onChange={handleChange} />
                            </div>

                            <FormInput id="phone" name="phone" label="Office Phone" icon={Phone} placeholder="+971 4 000 0000" value={formData.phone} onChange={handleChange} />

                            {/* Multiple Addresses Section */}
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Registered Addresses</label>
                                    <button type="button" onClick={addAddress} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> Add Address
                                    </button>
                                </div>

                                {formData.addresses.map((addr, index) => (
                                    <div key={addr.id} className="flex flex-col sm:flex-row gap-2 items-start bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="flex-1 w-full space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Location Name (e.g. Main Branch)"
                                                className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                value={addr.name}
                                                onChange={(e) => handleAddressChange(addr.id, 'name', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Full Address Details"
                                                className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                value={addr.details}
                                                onChange={(e) => handleAddressChange(addr.id, 'details', e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(addr.id)}
                                            className="self-end sm:self-start p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                            title="Remove Address"
                                            disabled={formData.addresses.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* NEW STEP: Additional Contacts */}
                    {step === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Additional Contacts</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Add key stakeholders for this account.</p>
                                </div>
                                <button type="button" onClick={addContact} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Contact
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.contacts.map((contact, index) => (
                                    <div key={contact.id} className="relative p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Contact #{index + 1}</h4>
                                            {formData.contacts.length > 1 && (
                                                <button
                                                    onClick={() => removeContact(contact.id)}
                                                    className="text-xs text-red-500 hover:text-red-700 font-bold"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Jane Doe"
                                                    className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                    value={contact.name}
                                                    onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Designation / Role</label>
                                                {contact.isCustomRole ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Role"
                                                            className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                            value={contact.role}
                                                            onChange={(e) => handleContactChange(contact.id, 'role', e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                handleContactChange(contact.id, 'isCustomRole', false);
                                                                handleContactChange(contact.id, 'role', '');
                                                            }}
                                                            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                                                            title="Select from list"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <select
                                                        className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                        value={contact.role}
                                                        onChange={(e) => {
                                                            if (e.target.value === 'Other') {
                                                                handleContactChange(contact.id, 'isCustomRole', true);
                                                                handleContactChange(contact.id, 'role', '');
                                                            } else {
                                                                handleContactChange(contact.id, 'role', e.target.value);
                                                            }
                                                        }}
                                                    >
                                                        <option value="">Select Role</option>
                                                        <option value="Manager">Manager</option>
                                                        <option value="Procurement">Procurement</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Owner">Owner</option>
                                                        <option value="Other">Other (Type Custom)</option>
                                                    </select>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+971 50 ..."
                                                    className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                    value={contact.phone}
                                                    onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">WhatsApp Number</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+971 50 ..."
                                                    className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                    value={contact.whatsapp}
                                                    onChange={(e) => handleContactChange(contact.id, 'whatsapp', e.target.value)}
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-400">Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="email@company.com"
                                                    className="w-full p-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                                    value={contact.email}
                                                    onChange={(e) => handleContactChange(contact.id, 'email', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Document Upload</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Upload clear copies of your valid trade license and VAT certificate.</p>
                            </div>

                            {/* NEW: Custom Document Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add other document (e.g. Power of Attorney)"
                                    className="flex-1 p-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-red-500 outline-none dark:text-white"
                                    value={customDocName}
                                    onChange={(e) => setCustomDocName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddDocument()}
                                />
                                <button
                                    onClick={handleAddDocument}
                                    className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap flex items-center gap-1"
                                    disabled={!customDocName.trim()}
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>

                            {formData.documents.map((doc) => (
                                <div key={doc.id} className={`border rounded-xl p-4 transition-all ${doc.status === 'revoked' ? 'border-red-200 bg-red-50/20 dark:border-red-900/50' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${doc.status === 'revoked' ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                {doc.status === 'revoked' ? <AlertTriangle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</p>
                                                <p className="text-xs text-slate-500 capitalize">{doc.status.replace('_', ' ')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3-Level Tracker */}
                                    <div className="mb-4 px-2">
                                        <div className="flex justify-between mb-2 relative">
                                            {/* Background Line */}
                                            <div className="absolute top-2.5 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-700 -z-0"></div>

                                            {doc.steps.map((step, idx) => (
                                                <div key={idx} className="flex flex-col items-center relative z-10">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 text-[8px] font-bold transition-colors ${step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                                                        step.status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                                                            step.status === 'current' ? 'bg-blue-600 border-blue-600 text-white' :
                                                                'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300'
                                                        }`}>
                                                        {step.status === 'completed' ? <Check className="w-3 h-3" /> : step.status === 'error' ? <X className="w-3 h-3" /> : idx + 1}
                                                    </div>
                                                    <span className={`text-[10px] mt-1 font-bold ${step.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                                                        step.status === 'error' ? 'text-red-600 dark:text-red-400' :
                                                            step.status === 'current' ? 'text-blue-600 dark:text-blue-400' :
                                                                'text-slate-400'
                                                        }`}>{step.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status / Upload Area */}
                                    {doc.status === 'revoked' ? (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg animate-in fade-in">
                                            <div className="flex gap-2 mb-2">
                                                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold text-red-700 dark:text-red-300">Action Required</p>
                                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">{doc.rejectionReason}</p>
                                                </div>
                                            </div>
                                            <label className="flex items-center justify-center w-full p-2 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 border-dashed rounded-md cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                                <UploadCloud className="w-4 h-4 text-red-500 mr-2" />
                                                <span className="text-xs font-bold text-red-600 dark:text-red-400">Re-upload Document</span>
                                                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} accept=".pdf,.jpg,.png" />
                                            </label>
                                        </div>
                                    ) : doc.status === 'pending_upload' ? (
                                        <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Click to upload</span>
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} accept=".pdf,.jpg,.png" />
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="text-xs font-bold text-green-700 dark:text-green-300">File Uploaded & Under Review</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bank Details</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Provide bank details for refunds and financial transactions.</p>
                            <FormInput id="bankName" name="bankName" label="Bank Name" icon={Landmark} placeholder="e.g. Emirates NBD" value={formData.bankName} onChange={handleChange} />
                            <FormInput id="iban" name="iban" label="IBAN Number" icon={CreditCard} placeholder="AE00 0000 0000 0000 0000 000" value={formData.iban} onChange={handleChange} />
                            <FormInput id="beneficiary" name="beneficiary" label="Beneficiary Name" icon={User} placeholder="Same as Trade License Name" value={formData.beneficiary} onChange={handleChange} />
                        </div>
                    )}

                    {step === 5 && (
                        <div className="text-center py-8 animate-in zoom-in fade-in duration-300">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="2xl font-bold text-slate-900 dark:text-white mb-2">Registration Submitted!</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                                Your application ID is <span className="font-mono font-bold text-slate-900 dark:text-white">#REG-2025-882</span>.
                                Our compliance team will review your documents within 24-48 hours.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl text-left max-w-sm mx-auto mb-8">
                                <div className="flex gap-3">
                                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <p className="text-sm text-blue-800 dark:text-blue-200">You can still log in to track your status, but ordering will be enabled after approval.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 flex justify-between bg-slate-50 dark:bg-slate-900/50 rounded-b-3xl">
                    {step < 5 ? (
                        <>
                            <button
                                onClick={() => step > 1 ? setStep(s => s - 1) : onComplete()}
                                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-bold px-4 py-2"
                            >
                                {step === 1 ? 'Cancel' : 'Back'}
                            </button>
                            <PrimaryButton onClick={handleNext} className="w-auto px-8" disabled={loading}>
                                {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Continue'}
                            </PrimaryButton>
                        </>
                    ) : (
                        <PrimaryButton onClick={onComplete} className="w-full">Go to Dashboard</PrimaryButton>
                    )}
                </div>
            </Card>
        </div>
    );
};

const LoginScreen = ({ onLoginSuccess, setUserState, setCurrentView, setNeedsPasswordChange, language, setLanguage, isDark, toggleTheme }) => {
    const [view, setView] = useState('login');
    const [userType, setUserType] = useState('customer');
    const [signupData, setSignupData] = useState({ fullName: '', email: '', mobile: '', password: '', confirmPassword: '', otp: '', agreedToTerms: false });
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    const handleInputChange = (e) => { setSignupData({ ...signupData, [e.target.name]: e.target.value }); };
    const handleLoginChange = (e) => { setLoginData({ ...loginData, [e.target.name]: e.target.value }); };
    const sendOtp = () => { if (!signupData.mobile) { console.warn("Please enter a mobile number"); return; } setOtpSent(true); setOtpTimer(30); };
    useEffect(() => { let interval; if (otpTimer > 0) { interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000); } return () => clearInterval(interval); }, [otpTimer]);
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (simulatedType) => {
        if (simulatedType === 'new') { setUserState('onboarding'); return; }
        if (simulatedType === 'pendingApproval') { setUserState('pendingApproval'); return; }

        setIsLoading(true);
        try {
            const resp = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginData.username, password: loginData.password })
            });
            const data = await resp.json();
            if (data.success) {
                onLoginSuccess(data.customer);
            } else {
                console.error(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Login error", err);
        } finally {
            setIsLoading(false);
        }
    };
    const submitSignup = () => {
        if (signupData.password !== signupData.confirmPassword) { console.warn("Passwords do not match!"); return; }
        if (!signupData.agreedToTerms) { console.warn("Please agree to the Terms and Conditions to proceed."); return; }
        setUserState('onboarding');
    };

    // Dynamic styles based on theme
    const inputClass = `border-2 text-sm sm:text-base rounded-xl shadow-sm transition-all duration-300 focus:ring-4 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:bg-slate-900 focus:border-blue-500 focus:ring-blue-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-blue-600/10'}`;
    const labelClass = `font-bold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`;

    const renderView = () => {
        if (view === 'signup') {
            return (
                <div className="space-y-5 animate-in slide-in-from-right">
                    <div className="text-start">
                        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Create Account</h2>
                        <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} mt-2 text-sm`}>Step 1: Basic Information</p>
                    </div>
                    <FormInput id="fullName" name="fullName" label="Full Name" type="text" icon={User} placeholder="John Doe" className={inputClass} labelClassName={labelClass} value={signupData.fullName} onChange={handleInputChange} />
                    <FormInput id="email" name="email" label="Email Address" type="email" icon={Mail} placeholder="john@example.com" className={inputClass} labelClassName={labelClass} value={signupData.email} onChange={handleInputChange} />
                    <div className="relative">
                        <FormInput id="mobile" name="mobile" label="Mobile Number" type="tel" icon={Phone} placeholder="050 123 4567" className={inputClass} labelClassName={labelClass} value={signupData.mobile} onChange={handleInputChange} />
                        <button onClick={sendOtp} disabled={otpSent && otpTimer > 0} className="absolute right-2 top-8 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors disabled:text-slate-400 disabled:hover:bg-transparent">{otpTimer > 0 ? `Resend in ${otpTimer}s` : (otpSent ? 'Resend OTP' : 'Send OTP')}</button>
                    </div>
                    {otpSent && (<FormInput id="otp" name="otp" label="Enter OTP" type="text" icon={ShieldCheck} placeholder="123456" className={inputClass} labelClassName={labelClass} value={signupData.otp} onChange={handleInputChange} />)}
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput id="password" name="password" label="Password" type="password" icon={Lock} placeholder="••••••••" className={inputClass} labelClassName={labelClass} value={signupData.password} onChange={handleInputChange} />
                        <FormInput id="confirmPassword" name="confirmPassword" label="Confirm" type="password" icon={Lock} placeholder="••••••••" className={inputClass} labelClassName={labelClass} value={signupData.confirmPassword} onChange={handleInputChange} />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start gap-3 mt-2">
                        <div className="flex h-6 items-center">
                            <input
                                id="agreedToTerms"
                                name="agreedToTerms"
                                type="checkbox"
                                checked={signupData.agreedToTerms}
                                onChange={(e) => setSignupData({ ...signupData, agreedToTerms: e.target.checked })}
                                className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-red-600 focus:ring-red-500 cursor-pointer transition-all"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="agreedToTerms" className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'} cursor-pointer select-none`}>
                                I agree to the <button className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors" onClick={(e) => e.preventDefault()}>Terms & Conditions</button> and <button className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors" onClick={(e) => e.preventDefault()}>Privacy Policy</button>.
                            </label>
                        </div>
                    </div>

                    <PrimaryButton onClick={submitSignup} disabled={!signupData.agreedToTerms} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed">Create & Continue</PrimaryButton>
                    <p className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Already have an account?{' '}<button onClick={() => setView('login')} className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-500">Log In</button></p>
                </div>
            );
        }
        return (
            <div className="space-y-6 animate-in slide-in-from-left">
                <div className="text-start mb-8">
                    <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h2>
                    <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} mt-2 text-sm`}>Please sign in to access your dashboard</p>
                </div>
                <FormSelect id="userType" label="I am a..." icon={User} value={userType} onChange={(e) => setUserType(e.target.value)} className={inputClass} labelClassName={labelClass}>
                    <option value="vendor">Vendor</option>
                    <option value="customer">Customer</option>
                </FormSelect>
                <FormInput id="username" name="username" label="Customer ID" type="text" icon={User} placeholder="e.g. 10761" className={inputClass} labelClassName={labelClass} value={loginData.username} onChange={handleLoginChange} />
                <div>
                    <FormInput id="password" name="password" label="Customer Code" type="password" icon={Lock} placeholder="e.g. AR1681" className={inputClass} labelClassName={labelClass} value={loginData.password} onChange={handleLoginChange} />
                    <div className="text-end -mt-2">
                        <button onClick={() => console.log("Password reset link sent to your email.")} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Forgot password?</button>
                    </div>
                </div>
                <FormSelect id="language" label="Preferred Language" icon={Languages} value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass} labelClassName={labelClass}>
                    <option value="en">English</option>
                    <option value="ar">العربية (Arabic)</option>
                </FormSelect>
                <PrimaryButton onClick={() => handleLogin()} disabled={isLoading} className="bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 shadow-xl shadow-blue-200 text-white font-bold py-3.5 text-base rounded-xl">{isLoading ? 'Signing In...' : 'Sign In'}</PrimaryButton>
                <p className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>New user?{' '}<button onClick={() => setView('signup')} className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-500">Create Account</button></p>
                <div className="opacity-0 hover:opacity-100 transition-opacity absolute bottom-2 left-2 flex gap-1">
                    <button onClick={() => handleLogin('new')} className="text-[10px] bg-red-100 p-1">Dev: New</button>
                    <button onClick={() => handleLogin('pendingApproval')} className="text-[10px] bg-orange-100 p-1">Dev: Pending</button>
                </div>
            </div>
        );
    };

    return (
        <div className={`min-h-screen w-full flex font-inter overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0B1121]' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
            {/* Desktop Left Side - Restored Split with Red/Blue Gradient */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-600 to-blue-800 items-center justify-center p-12 overflow-hidden">
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

            {/* Mobile/Right Side - Form Container */}
            <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col">
                {/* Header for mobile/toggle */}
                <div className="w-full p-6 flex items-center justify-between shrink-0">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg text-white">
                            <Package2 className="w-6 h-6" />
                        </div>
                        <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-800'}`}>Abreco</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-200'}`}
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center p-4 sm:p-8 lg:p-12">
                    <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl relative z-10 transition-all duration-300 ${isDark ? 'bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20' : 'bg-white border-2 border-slate-200 shadow-2xl shadow-slate-400/20 ring-1 ring-slate-100'}`}>
                        {renderView()}
                        <div className="mt-8 text-center">
                            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>© 2025 Abreco Group. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PendingApprovalScreen = ({ onLogout }) => {
    return (<div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-white flex flex-col items-center justify-center p-6 text-center"><h2 className="text-2xl font-bold mb-2">Pending Approval</h2><p className="mb-4 text-slate-500 dark:text-slate-400">Your account is currently under review.</p><PrimaryButton onClick={onLogout} className="w-auto">Sign Out</PrimaryButton></div>);
};

const CreditSummaryBox = ({ payableAmount = 0, onPayClick }) => (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-800/60 dark:backdrop-blur-md rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-[0_2px_20px_rgb(0,0,0,0.04)] p-5 sm:p-6 lg:p-8 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div><div className="flex items-center gap-2 mb-2"><span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span><span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Credit Limit</span></div><div className="flex items-baseline gap-1"><span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">AED 50,000</span></div></div>
                <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 shadow-sm rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"><Wallet className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>
            </div>
            <div>
                <div className="flex flex-wrap justify-between items-end mb-3 gap-2"><div><span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">Utilization</span><span className="text-[10px] sm:text-xs text-slate-400">25% used of total limit</span></div><span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">25%</span></div>
                <div className="h-3 sm:h-4 w-full bg-slate-50 dark:bg-slate-700 rounded-full border border-slate-100 dark:border-slate-600 p-0.5 sm:p-1 shadow-inner relative overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-1/4 shadow-sm relative overflow-hidden group/bar"><div className="absolute inset-0 bg-white/30 -translate-x-full animate-[shimmer_2s_infinite]"></div></div></div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6"><div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100/50 dark:border-slate-600/50 hover:bg-red-50/50 dark:hover:bg-red-900/20 hover:border-red-100 transition-colors group/stat cursor-default"><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 group-hover/stat:text-red-500 dark:group-hover/stat:text-red-400 transition-colors">Used</p><p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">12,500</p></div><div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100/50 dark:border-slate-600/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 hover:border-emerald-100 transition-colors group/stat cursor-default"><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 group-hover/stat:text-emerald-500 dark:group-hover/stat:text-emerald-400 transition-colors">Available</p><p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">37,500</p></div></div>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="p-2 sm:p-2.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl"><Clock className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <div><p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Next Due</p><p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Dec 15</p></div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="flex justify-between w-full sm:w-auto sm:block text-right gap-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Next Payable</p>
                        <p className="text-sm font-bold text-red-600 dark:text-red-400">AED {payableAmount.toFixed(2)}</p>
                    </div>
                    <button onClick={onPayClick} className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900 dark:bg-indigo-600 hover:bg-blue-600 dark:hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-200 dark:shadow-indigo-900/30 hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95">Pay Bill <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                </div>
            </div>
        </div>
    </div>
);

const RecentOrdersWidget = ({ orders, onViewAll, onUpdateOrder, addToast }) => {
    const recentOrders = orders.slice(0, 3);
    const handleTick = (e, id) => {
        e.stopPropagation();
        if (window.confirm("Confirm delivery receipt for this order?")) {
            onUpdateOrder(id, { status: 'Delivered', eta: '-' });
            addToast("Order marked as delivered", "success");
        }
    };
    return (
        <Card noPadding={true} className="h-full"><CardHeader title="Recent Orders"><button onClick={onViewAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button></CardHeader><div className="divide-y divide-slate-100 dark:divide-slate-700">{recentOrders.map(order => (<div key={order.id} onClick={onViewAll} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"><div><div className="flex items-center gap-2"><span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{order.id}</span>{order.status === 'Pending Delivery' && <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">Pending</span>}{order.status === 'Delivered' && <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Delivered</span>}{order.status === 'Partially Delivered' && <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full">Partial</span>}{order.status === 'Cancelled' && <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">Cancelled</span>}</div><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{order.date} • ETA: {order.eta || '-'}</p></div>{order.status === 'Pending Delivery' && (<button onClick={(e) => handleTick(e, order.id)} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors border border-green-200 dark:border-green-800" title="Confirm Delivery"><CheckCircle className="w-5 h-5" /></button>)}</div>))}</div></Card>
    );
};

const RecentServiceWidget = ({ onViewAll }) => {
    const requests = [{ id: 'SR-101', type: 'AC Maintenance', status: 'Estimate Pending' }, { id: 'SR-099', type: 'Plumbing', status: 'Approved' }];
    return (
        <Card noPadding={true} className="h-full"><CardHeader title="Active Service Requests"><button onClick={onViewAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button></CardHeader><div className="divide-y divide-slate-100 dark:divide-slate-700">{requests.map(req => (<div key={req.id} onClick={onViewAll} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"><div><p className="font-medium text-slate-900 dark:text-white text-sm sm:text-base">{req.type}</p><p className="text-xs text-slate-500 dark:text-slate-400">ID: {req.id}</p></div><span className={`text-xs px-2 py-1 rounded-full font-medium ${req.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>{req.status}</span></div>))}</div></Card>
    );
};

const NotificationsPanel = () => (
    <Card className="h-full"><h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h3><div className="space-y-4"><div className="flex gap-3 items-start"><div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div><div><p className="text-sm text-slate-800 dark:text-slate-200">Your order #ORD-2931 is out for delivery.</p><p className="text-xs text-slate-400 mt-1">2 hours ago</p></div></div><div className="flex gap-3 items-start"><div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></div><div><p className="text-sm text-slate-800 dark:text-slate-200">Invoice #INV-2930 is pending payment.</p><p className="text-xs text-slate-400 mt-1">Yesterday</p></div></div><div className="flex gap-3 items-start"><div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div><div><p className="text-sm text-slate-800 dark:text-slate-200">Estimate for SR-101 is ready for review.</p><p className="text-xs text-slate-400 mt-1">2 days ago</p></div></div></div></Card>
);

const PayBillModal = ({ orders, onClose, onPay, initialSelection = [] }) => {
    const dueBills = useMemo(() => orders.filter(o => o.status === 'Delivered' || o.status === 'Partially Delivered'), [orders]);
    // Use initial selection if provided, otherwise select all
    const [selectedIds, setSelectedIds] = useState(initialSelection.length > 0 ? initialSelection : dueBills.map(b => b.id));
    const [isPaying, setIsPaying] = useState(false);
    const totalAmount = dueBills.filter(bill => selectedIds.includes(bill.id)).reduce((sum, bill) => sum + bill.amount, 0);

    const toggleBill = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleAll = () => {
        setSelectedIds(selectedIds.length === dueBills.length ? [] : dueBills.map(b => b.id));
    };

    const handlePay = () => { setIsPaying(true); setTimeout(() => { onPay(selectedIds); setIsPaying(false); onClose(); }, 1500); };

    if (dueBills.length === 0) return <Modal title="Pay Bills" onClose={onClose}><div className="text-center py-8 dark:text-white">No pending bills.</div></Modal>;
    return (
        <Modal title="Pay Outstanding Bills" onClose={onClose} size="lg">
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 gap-4">
                    <div>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Total Payable</p>
                        <p className="2xl font-bold text-blue-900 dark:text-blue-100">AED {totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                        {/* FIX 1: Removed extra closing curly brace '}' after "Selected" */}
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-bold">{selectedIds.length} Selected</span>
                    </div>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 flex items-center border-b border-slate-200 dark:border-slate-700">
                        <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300 dark:border-slate-600 dark:bg-slate-700 mr-3" checked={selectedIds.length === dueBills.length && dueBills.length > 0} onChange={toggleAll} />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select All Due Bills</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
                        {dueBills.map(bill => (
                            <div key={bill.id} className="p-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <input type="checkbox" className="w-4 h-4 text-red-600 rounded bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600" checked={selectedIds.includes(bill.id)} onChange={() => toggleBill(bill.id)} />
                                <div className="flex-1"><p className="text-sm font-bold dark:text-white">{bill.id}</p><p className="text-xs text-slate-500 dark:text-slate-400">{bill.date}</p></div>
                                <p className="text-sm font-bold dark:text-white">AED {bill.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <PrimaryButton onClick={handlePay} disabled={selectedIds.length === 0 || isPaying}>{isPaying ? 'Processing...' : `Pay AED ${totalAmount.toFixed(2)}`}</PrimaryButton>
            </div>
        </Modal>
    );
};

const DashboardView = ({ setCurrentView, orders, onUpdateOrder, addToast }) => {
    const [showPayModal, setShowPayModal] = useState(false);
    const payableAmount = useMemo(() => orders.filter(o => o.status === 'Delivered' || o.status === 'Partially Delivered').reduce((sum, o) => sum + o.amount, 0), [orders]);
    const handlePayment = (paidIds) => {
        paidIds.forEach(id => { onUpdateOrder(id, { status: 'Paid', eta: '-' }); });
        addToast(`Successfully paid AED ${payableAmount.toFixed(2)}`, "success");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400 tracking-tight">Dashboard</h2><p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your account activity.</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Orders" value={orders.length} icon={Package} color="blue" details="Lifetime" onClick={() => setCurrentView('orders')} />
            <StatCard title="Pending Deliveries" value={orders.filter(o => o.status === 'Pending Delivery').length} icon={Truck} color="orange" details="In Transit" onClick={() => setCurrentView('orders')} />
            <StatCard title="Pending Invoices" value={orders.filter(o => o.status === 'Delivered').length} icon={CreditCard} color="red" details="Action Needed" onClick={() => setCurrentView('financials')} />
            <StatCard title="Active Services" value="4" icon={Wrench} color="purple" details="Ongoing Requests" onClick={() => setCurrentView('services')} />
        </div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><RecentOrdersWidget orders={orders} onViewAll={() => setCurrentView('orders')} onUpdateOrder={onUpdateOrder} addToast={addToast} /><RecentServiceWidget onViewAll={() => setCurrentView('services')} /></div></div><div className="space-y-6"><CreditSummaryBox payableAmount={payableAmount} onPayClick={() => setShowPayModal(true)} /><NotificationsPanel /></div></div>{showPayModal && (<PayBillModal orders={orders} onClose={() => setShowPayModal(false)} onPay={handlePayment} />)}</div>
    );
};

const OrderDetailsModal = ({ order, onClose, onConfirmReceipt, onCancelOrder, onReturnOrder, addToCart, addToast }) => {
    const timeline = [
        { label: 'Ordered', date: 'Dec 01, 04:00 PM', completed: true },
        { label: 'Shipped', date: 'Dec 02, 06:15 AM', completed: true },
        { label: 'Out for Delivery', date: 'Dec 02, 08:30 AM', completed: true },
        { label: 'Delivered', date: order.status === 'Delivered' ? 'Dec 02, 02:15 PM' : order.status === 'Partially Delivered' ? 'Partial' : '-', completed: order.status === 'Delivered' || order.status === 'Partially Delivered' },
    ];

    const getStepStatus = (index) => {
        if (order.status === 'Cancelled') return 'cancelled';
        if (order.status === 'Delivered') return 'completed';
        if (order.status === 'Partially Delivered' && index === 3) return 'partial';
        return index <= 2 ? 'completed' : 'pending';
    };

    const handleBuyAgain = () => {
        // Mock converting order item string to cart item
        addToCart({
            id: Date.now(),
            name: order.items,
            unit: 'Reordered Pack',
            price: order.amount,
            quantity: 1
        });
        addToast(`Added ${order.items} to cart`, "success");
    };

    const handleDownloadInvoice = () => {
        addToast("Downloading Invoice...", "default");
        setTimeout(() => addToast("Download Completed", "success"), 1500);
    };

    return (
        <Modal title={`Order #${order.id}`} onClose={onClose} size="3xl" noPadding={true}>
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 sm:p-6">

                {/* Return Status Banner */}
                {order.returnStatus && (
                    <div className="mb-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <div>
                            <p className="text-sm font-bold text-orange-800 dark:text-orange-200">Return / Issue Reported</p>
                            <p className="text-xs text-orange-600 dark:text-orange-300">Our team is reviewing your report. You will be contacted shortly.</p>
                        </div>
                    </div>
                )}

                {order.status === 'Partially Delivered' && !order.returnStatus && (
                    <div className="mb-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-4 flex items-center gap-3">
                        <PackageOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                            <p className="text-sm font-bold text-purple-800 dark:text-purple-200">Partial Delivery Confirmed</p>
                            <p className="text-xs text-purple-600 dark:text-purple-300">You have marked some items as missing. A shortage report has been auto-generated.</p>
                        </div>
                    </div>
                )}

                {/* Responsive Status Stepper */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-6 overflow-x-auto">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Shipment Status
                    </h4>
                    <div className="min-w-[300px] relative flex justify-between items-center px-4 md:px-12">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
                        {['Ordered', 'Shipped', 'Out', 'Delivered'].map((step, idx) => {
                            const status = getStepStatus(idx);
                            const isCompleted = status === 'completed';
                            const isPartial = status === 'partial';
                            return (
                                <div key={step} className="flex flex-col items-center bg-white dark:bg-slate-800 px-2">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20' : isPartial ? 'bg-purple-100 dark:bg-purple-900 border-purple-500 text-purple-600 dark:text-purple-300 shadow-lg shadow-purple-200 dark:shadow-purple-900/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-300 dark:text-slate-600'}`}>
                                        {isCompleted ? <Check className="w-5 h-5" /> : isPartial ? <PackageOpen className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />}
                                    </div>
                                    <span className={`text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-tight text-center ${isCompleted ? 'text-green-600 dark:text-green-400' : isPartial ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Items Ordered</h4>
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-50 dark:divide-slate-700">
                                <div className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-300 flex-shrink-0">
                                        <Package className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{order.items}</h5>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Qty: 5kg</p>
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">AED {(order.amount * 0.6).toFixed(2)}</p>
                                </div>
                                {order.extraItems > 0 && (
                                    <div className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-300 flex-shrink-0">
                                            <Package className="w-6 h-6 sm:w-8 sm:h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Misc Items ({order.extraItems})</h5>
                                            {/* FIX 2: Removed extra closing curly brace '}' after unit(s) */}
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {order.extraItems} unit(s)</p>
                                        </div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">AED {(order.amount * 0.4).toFixed(2)}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center mt-4 px-2">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Order Total</span>
                                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">AED {order.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <h6 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3">Delivery Address</h6>
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">Main Warehouse,<br />Al Quoz</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                            <h6 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-4">Timeline</h6>
                            <div className="space-y-6 relative pl-2">
                                <div className="absolute top-2 left-[19px] h-full w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                                {timeline.map((event, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 z-10 flex-shrink-0 ${event.completed ? 'bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                        <div><p className="text-sm font-bold text-slate-900 dark:text-white">{event.label}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{event.date}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-b-2xl flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex gap-3 w-full sm:w-auto">
                    <button onClick={handleBuyAgain} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Buy Again
                    </button>
                    <button onClick={handleDownloadInvoice} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <Download className="w-4 h-4" /> Invoice
                    </button>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    {/* Return Button - Only for Delivered and not already returned */}
                    {(order.status === 'Delivered' || order.status === 'Partially Delivered') && !order.returnStatus && (
                        <button onClick={onReturnOrder} className="flex-1 sm:flex-none px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 rounded-lg text-sm font-bold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> Report Issue
                        </button>
                    )}

                    {order.status !== 'Delivered' && order.status !== 'Partially Delivered' && order.status !== 'Cancelled' && (
                        <>
                            <button onClick={onCancelOrder} className="flex-1 sm:flex-none px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">Cancel</button>
                            <button onClick={onConfirmReceipt} className="flex-1 sm:flex-none px-6 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-600 shadow-lg shadow-slate-200 dark:shadow-slate-900/50 transition-all hover:-translate-y-0.5 active:translate-y-0">Confirm</button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

const OrdersPage = ({ orders, onUpdateOrder, addToCart, addToast }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    // New Time Filter State
    const [timeFilter, setTimeFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isDeliveryChecklistOpen, setIsDeliveryChecklistOpen] = useState(false);

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.items.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all' ? true : activeTab === 'pending' ? o.status === 'Pending Delivery' : activeTab === 'delivered' ? o.status === 'Delivered' : activeTab === 'cancelled' ? o.status === 'Cancelled' : true;

        // Time Filter Logic
        let matchesTime = true;
        if (timeFilter !== 'all') {
            const orderDate = new Date(o.date);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            switch (timeFilter) {
                case 'today':
                    matchesTime = orderDate.toDateString() === today.toDateString();
                    break;
                case 'this_month':
                    matchesTime = orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
                    break;
                case 'last_month':
                    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    matchesTime = orderDate.getMonth() === lastMonth.getMonth() && orderDate.getFullYear() === lastMonth.getFullYear();
                    break;
                case 'last_3_months':
                    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
                    matchesTime = orderDate >= threeMonthsAgo;
                    break;
                case 'this_year':
                    matchesTime = orderDate.getFullYear() === now.getFullYear();
                    break;
                case 'custom':
                    if (dateRange.start) {
                        matchesTime = matchesTime && orderDate >= new Date(dateRange.start);
                    }
                    if (dateRange.end) {
                        const end = new Date(dateRange.end);
                        end.setHours(23, 59, 59, 999); // Include end of day
                        matchesTime = matchesTime && orderDate <= end;
                    }
                    break;
                default:
                    break;
            }
        }

        return matchesSearch && matchesTab && matchesTime;
    });

    const handleConfirmReceipt = () => {
        // Open checklist instead of direct confirmation
        if (selectedOrder) {
            setIsDeliveryChecklistOpen(true);
        }
    };

    const handleChecklistConfirm = ({ status, missingCount }) => {
        onUpdateOrder(selectedOrder.id, { status, eta: '-' });
        if (status === 'Partially Delivered') {
            // Auto-trigger return status/alert
            onUpdateOrder(selectedOrder.id, { status, returnStatus: 'Auto-Shortage', eta: '-' });
            addToast(`Order marked Partial. ${missingCount} items missing.`, "default");
        } else {
            addToast("Order marked as Delivered", "success");
        }
        setIsDeliveryChecklistOpen(false);
        setSelectedOrder(null);
    };

    const handleCancelOrder = () => {
        if (selectedOrder && window.confirm('Are you sure?')) {
            onUpdateOrder(selectedOrder.id, { status: 'Cancelled' });
            addToast("Order cancelled successfully", "success");
            setSelectedOrder(null);
        }
    };

    const handleReturnSubmit = (returnDetails) => {
        // In a real app, send returnDetails to API
        onUpdateOrder(selectedOrder.id, { returnStatus: 'Requested' });
        setIsReturnModalOpen(false);
        setSelectedOrder(prev => ({ ...prev, returnStatus: 'Requested' }));
        addToast('Return request submitted successfully.', "success");
    };

    const handleReorder = (e, order) => {
        e.stopPropagation();
        addToCart({
            id: Date.now(),
            name: order.items,
            unit: 'Reordered Pack',
            price: order.amount,
            quantity: 1
        });
        addToast(`Added ${order.items} to cart`, "success");
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div><h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400 tracking-tight">Your Orders</h1><p className="text-slate-500 dark:text-slate-400 mt-1">Track, return, or buy things again.</p></div>
            <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto flex-1">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 dark:text-white outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>

                    {/* Time Filter Dropdown */}
                    <div className="relative w-full sm:w-48">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 dark:text-white outline-none appearance-none cursor-pointer font-medium text-slate-600 dark:text-slate-300"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="this_month">This Month</option>
                            <option value="last_month">Last Month</option>
                            <option value="last_3_months">Last 3 Months</option>
                            <option value="this_year">This Year</option>
                            <option value="custom">Custom Date</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Custom Date Pickers */}
                    {timeFilter === 'custom' && (
                        <div className="flex items-center gap-2 w-full sm:w-auto animate-in fade-in slide-in-from-left-2">
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                className="w-full sm:w-auto px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 dark:text-white outline-none text-slate-600"
                            />
                            <span className="text-slate-400">-</span>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                className="w-full sm:w-auto px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 dark:text-white outline-none text-slate-600"
                            />
                        </div>
                    )}
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg w-full xl:w-auto overflow-x-auto no-scrollbar"><div className="flex space-x-1">{['All', 'Pending', 'Delivered', 'Cancelled'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`flex-1 xl:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>{tab}</button>))}</div></div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex-grow">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Order Details</div><div className="col-span-2">Date</div><div className="col-span-2">Total</div><div className="col-span-2">Status</div><div className="col-span-3 text-right">Actions</div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredOrders.length === 0 ? (<div className="p-12 text-center text-slate-400">No orders found.</div>) : (
                        filteredOrders.map(order => (
                            <div key={order.id} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 p-4 items-start md:items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                <div className="w-full md:col-span-3 flex justify-between md:block items-center">
                                    <div>
                                        <span className="block font-bold text-blue-600 dark:text-blue-400 mb-0.5 group-hover:underline">{order.id}</span>
                                        <span className="block text-sm font-medium text-slate-900 dark:text-white truncate">{order.items}</span>
                                        {order.extraItems > 0 && <span className="text-xs text-slate-400">+ {order.extraItems} more items</span>}
                                    </div>
                                    <div className="md:hidden"><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>{order.status}</span></div>
                                </div>
                                <div className="w-full md:col-span-2 text-sm text-slate-600 dark:text-slate-400 font-medium flex justify-between md:block"><span className="md:hidden text-slate-400 text-xs uppercase font-bold">Ordered On</span>{order.date}</div>
                                <div className="w-full md:col-span-2 text-sm font-bold text-slate-900 dark:text-white flex justify-between md:block"><span className="md:hidden text-slate-400 text-xs uppercase font-bold">Total Amount</span>AED {order.amount.toFixed(2)}</div>
                                <div className="hidden md:block col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50' : order.status === 'Cancelled' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/50' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50'}`}>{order.status}</span>
                                    {order.returnStatus && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800">Issue Reported</span>}
                                </div>
                                <div className="w-full md:col-span-3 flex justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700"><button onClick={(e) => handleReorder(e, order)} className="flex-1 md:flex-none p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg md:rounded-full transition-colors flex items-center justify-center gap-2 md:gap-0" title="Reorder"><RefreshCw className="w-4 h-4" /> <span className="md:hidden text-xs font-bold">Reorder</span></button>{order.status === 'Pending Delivery' && (<button onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); setIsDeliveryChecklistOpen(true); }} className="flex-1 md:flex-none p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg md:rounded-full transition-colors flex items-center justify-center gap-2 md:gap-0" title="Confirm Receipt"><CheckCircle className="w-4 h-4" /> <span className="md:hidden text-xs font-bold">Accept</span></button>)}<button className="hidden md:block p-2 text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 rounded-full transition-colors"><ChevronRightIcon className="w-4 h-4" /></button></div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onConfirmReceipt={handleConfirmReceipt}
                    onCancelOrder={handleCancelOrder}
                    onReturnOrder={() => setIsReturnModalOpen(true)}
                    addToCart={addToCart}
                    addToast={addToast}
                />
            )}

            {/* Return Request Modal (Nested) */}
            {isReturnModalOpen && selectedOrder && (
                <ReturnRequestModal
                    order={selectedOrder}
                    onClose={() => setIsReturnModalOpen(false)}
                    onSubmit={handleReturnSubmit}
                />
            )}

            {/* Delivery Checklist Modal */}
            {isDeliveryChecklistOpen && selectedOrder && (
                <DeliveryChecklistModal
                    order={selectedOrder}
                    onClose={() => setIsDeliveryChecklistOpen(false)}
                    onConfirm={handleChecklistConfirm}
                />
            )}
        </div>
    );
};

const ServiceDetailsModal = ({ service, onClose, onUpdateStatus, onApproveEstimate }) => {
    // Generate a simple timeline for the service
    const timeline = [
        { status: 'Requested', date: service.date, done: true },
        { status: 'Estimate Sent', date: service.status === 'Estimate Pending' ? 'Today' : 'Dec 02, 2025', done: true },
        { status: 'Approved', date: service.status === 'Approved' || service.status === 'Completed' ? (service.schedule || 'Dec 03, 2025') : '-', done: service.status === 'Approved' || service.status === 'Completed' },
        { status: 'Completed', date: service.status === 'Completed' ? (service.completedDate || 'Pending') : '-', done: service.status === 'Completed' }
    ];

    const handleDownloadEstimate = () => {
        // Mock download interaction
        const link = document.createElement('a');
        link.href = '#';
        link.download = `Estimate_${service.id}.pdf`;
        console.log(`Downloading Estimate PDF for Service Request ${service.id}...`); // Replaced alert
    };

    return (
        <Modal title={`Service Request #${service.id}`} onClose={onClose} size="lg">
            <div className="space-y-6">
                {/* Top Status Banner */}
                <div className={`flex items-center justify-between p-4 rounded-xl border ${service.status === 'Estimate Pending' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' : service.status === 'Approved' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${service.status === 'Estimate Pending' ? 'bg-orange-100 text-orange-600' : service.status === 'Approved' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {service.status === 'Estimate Pending' ? <FileText className="w-5 h-5" /> : service.status === 'Approved' ? <Calendar className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div>
                            <h4 className={`font-bold ${service.status === 'Estimate Pending' ? 'text-orange-900 dark:text-orange-100' : service.status === 'Approved' ? 'text-blue-900 dark:text-blue-100' : 'text-green-900 dark:text-green-100'}`}>
                                {service.status}
                            </h4>
                            <p className="text-xs opacity-80 dark:text-slate-300">
                                {service.status === 'Estimate Pending' ? 'Please review the estimate below.' : service.status === 'Approved' ? 'Technician scheduled.' : 'Service successfully completed.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service Type</p>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{service.type}</h3>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                <p className="text-sm text-slate-700 dark:text-slate-300">{service.location}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Description</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">{service.desc}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Technician Details (Only if Approved/Completed) */}
                        {(service.status === 'Approved' || service.status === 'Completed') && service.technician && (
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                                <h5 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-500" /> Assigned Technician</h5>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                        {service.technician.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{service.technician.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <span>⭐ {service.technician.rating}</span>
                                            <span>•</span>
                                            <span>{service.technician.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                {service.schedule && (
                                    <div className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-2 rounded-lg text-center font-medium">
                                        Scheduled: {service.schedule}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Timeline Widget */}
                        <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-700 space-y-6 py-2">
                            {timeline.map((step, idx) => (
                                <div key={idx} className="relative">
                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${step.done ? 'bg-green-500 border-green-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}></div>
                                    <p className={`text-xs font-bold ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.status}</p>
                                    <p className="text-[10px] text-slate-400">{step.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Estimate Approval Section */}
                {service.status === 'Estimate Pending' && service.estimate && (
                    <div className="mt-6 border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><FileText className="w-5 h-5" /> Cost Estimate</h4>
                            <button onClick={handleDownloadEstimate} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Download className="w-3 h-3" /> Download PDF
                            </button>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-4 py-3">Item / Service</th>
                                        <th className="px-4 py-3 text-right">Cost (AED)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {service.estimate.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{item.desc}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{item.cost.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white">
                                    <tr>
                                        <td className="px-4 py-3 text-right">Total Estimate</td>
                                        <td className="px-4 py-3 text-right text-lg">AED {service.estimate.amount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="flex gap-3 mt-4 justify-end">
                            <button onClick={onClose} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                                <ThumbsDown className="w-4 h-4" /> Reject
                            </button>
                            <PrimaryButton onClick={onApproveEstimate} className="w-auto px-6">
                                <ThumbsUp className="w-4 h-4" /> Approve Estimate
                            </PrimaryButton>
                        </div>
                    </div>
                )}

                {/* Completed State Actions */}
                {service.status !== 'Estimate Pending' && service.status !== 'Completed' && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                        <button onClick={onUpdateStatus} className="text-red-600 text-sm font-bold hover:underline">Mark as Completed</button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

const ServiceRequestsPage = ({ addToast }) => {
    const [activeTab, setActiveTab] = useState('active');
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState(INITIAL_SERVICES);

    const filtered = services.filter(s => {
        if (activeTab === 'active') return s.status !== 'Completed';
        if (activeTab === 'history') return s.status === 'Completed';
        return true;
    });

    const handleUpdateStatus = () => {
        setServices(prev => prev.map(s => s.id === selectedService.id ? { ...s, status: 'Completed', completedDate: new Date().toLocaleDateString() } : s));
        addToast("Service marked as completed", "success");
        setSelectedService(null);
    };

    const handleApproveEstimate = () => {
        setServices(prev => prev.map(s => s.id === selectedService.id ? {
            ...s,
            status: 'Approved',
            schedule: 'Pending Scheduling',
            technician: { name: 'To Be Assigned', phone: '-', rating: '-' }
        } : s));
        addToast("Estimate Approved! A technician will be assigned shortly.", "success");
        setSelectedService(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400">Service Requests</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => setActiveTab('active')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'active' ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>Active</button>
                    <button onClick={() => setActiveTab('history')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'history' ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>History</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(req => (
                    <Card key={req.id} onClick={() => setSelectedService(req)} className="hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"><Wrench className="w-6 h-6" /></div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${req.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : req.status === 'Approved' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>{req.status}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{req.type}</h3>
                        <p className="text-xs text-slate-400 mb-2">Ref: {req.id} • {req.date}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{req.desc}</p>

                        {/* Quick Action Hints */}
                        {req.status === 'Estimate Pending' && (
                            <div className="mt-3 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg flex items-center gap-1">
                                <FileText className="w-3 h-3" /> Estimate Received: AED {req.estimate?.amount}
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                            <button className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 flex items-center">View Details <ChevronRight className="w-4 h-4 ml-1" /></button>
                        </div>
                    </Card>
                ))}
            </div>
            {selectedService && (
                <ServiceDetailsModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    onUpdateStatus={handleUpdateStatus}
                    onApproveEstimate={handleApproveEstimate}
                />
            )}
        </div>
    );
};

// --- NEW COMPONENT: INVOICE DETAILS MODAL ---
const InvoiceDetailsModal = ({ invoice, onClose, onPay }) => {
    const [isPaying, setIsPaying] = useState(false);

    const handlePay = () => {
        setIsPaying(true);
        // Simulate processing payment
        setTimeout(() => {
            onPay(invoice.orderId);
            setIsPaying(false);
            onClose();
        }, 1500);
    };

    // Mock Tax Calculation (Reverse calc from total for demo)
    const subtotal = invoice.amount / 1.05;
    const vat = invoice.amount - subtotal;

    return (
        <Modal title={`Invoice #${invoice.invoiceId}`} onClose={onClose} size="lg">
            <div className="space-y-6">
                {/* Status Banner */}
                <div className={`flex items-center justify-between p-4 rounded-xl border ${invoice.status === 'Paid' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' : invoice.status === 'Draft' ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400'}`}>
                    <div className="flex items-center gap-2">
                        {invoice.status === 'Paid' ? <CheckCircle className="w-5 h-5" /> : invoice.status === 'Draft' ? <FileText className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        <span className="font-bold">Status: {invoice.status}</span>
                    </div>
                    {invoice.status !== 'Paid' && <span className="text-sm font-medium">Due Date: {invoice.date}</span>}
                </div>

                {/* Invoice Paper Design */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 rounded-xl shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-8 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-red-600 mb-3">
                                <Package2 className="w-8 h-8" />
                                <span className="font-bold 2xl tracking-tight text-slate-900 dark:text-white">Abreco</span>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                                <p>Dubai Investment Park</p>
                                <p>Dubai, UAE</p>
                                <p>TRN: 1002938475662</p>
                                <p>+971 4 000 0000</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <h1 className="text-3xl font-black text-slate-200 dark:text-slate-700 mb-2 tracking-wide">INVOICE</h1>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">#{invoice.invoiceId}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Date Issued: {invoice.date}</p>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bill To</p>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Abreco Customer Inc.</h4>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 space-y-1">
                                <p>Warehouse 4, Al Quoz Ind Area 3</p>
                                <p>Dubai, United Arab Emirates</p>
                                <p>TRN: 5594837281903</p>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Details</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1"><span className="text-slate-400 w-24 inline-block text-left">Ref No:</span> {invoice.orderId}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1"><span className="text-slate-400 w-24 inline-block text-left">Payment:</span> Credit (30 Days)</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="text-slate-400 w-24 inline-block text-left">Currency:</span> AED</p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="mb-8 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-700">
                                <tr>
                                    <th className="py-3 pl-4 rounded-l-lg">Description</th>
                                    <th className="py-3 text-right">Qty</th>
                                    <th className="py-3 text-right">Unit Price</th>
                                    <th className="py-3 pr-4 text-right rounded-r-lg">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                <tr>
                                    <td className="py-4 pl-4 font-bold text-slate-900 dark:text-white">
                                        {invoice.items}
                                        <p className="text-xs font-normal text-slate-500 mt-0.5">Main Order Item</p>
                                    </td>
                                    <td className="py-4 text-right text-slate-500">1</td>
                                    <td className="py-4 text-right text-slate-500">{subtotal.toFixed(2)}</td>
                                    <td className="py-4 pr-4 text-right font-bold text-slate-900 dark:text-white">{subtotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end border-t border-slate-100 dark:border-slate-700 pt-6">
                        <div className="w-full sm:w-64 space-y-3">
                            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-medium">{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                                <span>VAT (5%)</span>
                                <span className="font-medium">{vat.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black text-slate-900 dark:text-white pt-3 border-t-2 border-slate-100 dark:border-slate-700 mt-2">
                                <span>Total</span>
                                <span>AED {invoice.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                    <button className="px-4 py-3 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="px-4 py-3 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    {invoice.status === 'Pending Payment' && (
                        <PrimaryButton onClick={handlePay} className="w-full sm:w-auto px-8" disabled={isPaying}>
                            {isPaying ? <><Loader className="w-4 h-4 animate-spin" /> Processing...</> : `Pay AED ${invoice.amount.toFixed(2)}`}
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </Modal>
    );
};

const FinancialsPage = ({ orders, onUpdateOrder, addToast }) => {
    const [tab, setTab] = useState('credit');
    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);

    // -- NEW: Filter States --
    const [invoiceFilters, setInvoiceFilters] = useState({ status: 'all', time: 'all' });
    const [ledgerFilters, setLedgerFilters] = useState({ type: 'all', time: 'all' });

    // -- Mock Ledger Data (Moved from render to constant for filtering) --
    const LEDGER_DATA = [
        { id: 1, date: '2025-12-01', desc: 'Invoice #INV-2930', dr: 120.00, cr: 0, bal: 12500.00, type: 'inv' },
        { id: 2, date: '2025-11-28', desc: 'Payment Received - Bank Transfer', dr: 0, cr: 2000.00, bal: 12620.00, type: 'pay' },
        { id: 3, date: '2025-11-25', desc: 'Invoice #INV-2928', dr: 850.50, cr: 0, bal: 14620.00, type: 'inv' },
        { id: 4, date: '2025-11-20', desc: 'Credit Note #CN-001 - Damaged Goods', dr: 0, cr: 50.00, bal: 15470.50, type: 'cn' },
        { id: 5, date: '2025-11-18', desc: 'Invoice #INV-2925', dr: 60.00, cr: 0, bal: 15520.50, type: 'inv' },
    ];

    // Helper for Date Filtering
    const checkDateMatch = (dateStr, filter) => {
        if (filter === 'all') return true;
        const date = new Date(dateStr);
        const now = new Date('2025-12-02'); // Assuming 'now' is Dec 2025 for demo consistency

        if (filter === 'this_month') {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }
        if (filter === 'last_month') {
            return date.getMonth() === now.getMonth() - 1 && date.getFullYear() === now.getFullYear();
        }
        return true;
    };

    const invoices = orders.filter(order => order.status !== 'Cancelled').map(order => ({
        invoiceId: `INV-${order.id.split('-')[1]}`,
        orderId: order.id,
        date: order.date,
        amount: order.amount,
        status: order.status === 'Pending Delivery' ? 'Draft' : order.status === 'Paid' ? 'Paid' : 'Pending Payment',
        items: order.items
    }));

    // -- Filtered Data Logic --
    const filteredInvoices = invoices.filter(inv => {
        const matchStatus = invoiceFilters.status === 'all' ? true :
            invoiceFilters.status === 'pending' ? inv.status === 'Pending Payment' :
                invoiceFilters.status === 'paid' ? inv.status === 'Paid' :
                    inv.status === 'Draft';
        const matchTime = checkDateMatch(inv.date, invoiceFilters.time);
        return matchStatus && matchTime;
    });

    const filteredLedger = LEDGER_DATA.filter(row => {
        const matchType = ledgerFilters.type === 'all' ? true : row.type === ledgerFilters.type;
        const matchTime = checkDateMatch(row.date, ledgerFilters.time);
        return matchType && matchTime;
    });

    const payableInvoices = useMemo(() => invoices.filter(inv => inv.status === 'Pending Payment'), [invoices]);
    const payableAmount = useMemo(() => orders.filter(o => o.status === 'Delivered' || o.status === 'Partially Delivered').reduce((sum, o) => sum + o.amount, 0), [orders]);

    // ... existing monthlySpend and walletBalance logic ...
    const monthlySpend = useMemo(() => {
        const now = new Date('2025-12-02');
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        return orders.filter(o => {
            const d = new Date(o.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear && ['Delivered', 'Paid', 'Pending Delivery', 'Partially Delivered'].includes(o.status);
        }).reduce((sum, o) => sum + o.amount, 0);
    }, [orders]);

    const walletBalance = 1250.00;

    const handlePayment = (paidIds) => {
        if (onUpdateOrder) {
            const idsToPay = Array.isArray(paidIds) ? paidIds : [paidIds];
            idsToPay.forEach(id => onUpdateOrder(id, { status: 'Paid', eta: '-' }));
        }
        addToast("Payment Successful! Thank you.", "success");
        setSelectedOrderIds([]);
        setSelectedInvoice(null);
    };

    // ... existing selection handlers ...
    const toggleInvoiceSelection = (orderId) => {
        setSelectedOrderIds(prev => prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]);
    };

    const handleSelectAll = () => {
        // Logic applied only to filtered view to avoid confusion
        const pendingInFiltered = filteredInvoices.filter(inv => inv.status === 'Pending Payment');

        if (selectedOrderIds.length > 0) {
            setSelectedOrderIds([]);
        } else {
            setSelectedOrderIds(pendingInFiltered.map(inv => inv.orderId));
        }
    };

    const handleDownload = (name) => {
        addToast(`Downloading ${name}...`, "default");
        setTimeout(() => addToast("Download Completed", "success"), 2000);
    };

    const selectedTotal = invoices
        .filter(inv => selectedOrderIds.includes(inv.orderId))
        .reduce((sum, inv) => sum + inv.amount, 0);

    return (
        <div className="space-y-6">
            {/* ... existing header and stat cards ... */}
            <div className="flex justify-between items-end">
                <h1 className="2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400">Financials</h1>
            </div>

            {/* ... existing stat cards ... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <StatCard title="Wallet Balance" value={`AED ${walletBalance.toFixed(2)}`} icon={Wallet} color="teal" details="Available" onClick={() => setTab('credit')} />
                <StatCard title="Monthly Spend" value={`AED ${monthlySpend.toFixed(2)}`} icon={BarChart} color="purple" details="December 2025" onClick={() => setTab('transactions')} />
                <StatCard title="Outstanding Due" value={`AED ${payableAmount.toFixed(2)}`} icon={AlertTriangle} color="orange" details={`${orders.filter(o => o.status === 'Delivered' || o.status === 'Partially Delivered').length} Invoices`} onClick={() => setTab('invoices')} />
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700 overflow-x-auto mt-8">
                <nav className="-mb-px flex space-x-8 min-w-max px-2">
                    {[
                        { id: 'credit', label: 'Credit Overview', icon: Wallet },
                        { id: 'ledger', label: 'Credit Ledger', icon: History },
                        { id: 'invoices', label: 'Invoices', icon: FileCheck },
                        { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft }
                    ].map((item) => (
                        <button key={item.id} onClick={() => setTab(item.id)} className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${tab === item.id ? 'border-red-600 dark:border-red-500 text-red-600 dark:text-red-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                            <item.icon className={`-ml-0.5 mr-2 h-5 w-5 ${tab === item.id ? 'text-red-600 dark:text-red-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500'}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {tab === 'credit' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="lg:col-span-2">
                            <CreditSummaryBox payableAmount={payableAmount} onPayClick={() => setShowPayModal(true)} />
                        </div>
                    </div>
                )}

                {tab === 'ledger' && (
                    <Card noPadding={true}>
                        {/* Header with Filters */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl gap-4">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Credit Ledger</h3>
                                <p className="text-xs text-slate-500">Track all credit movements</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                {/* Time Filter */}
                                <div className="relative">
                                    <select
                                        value={ledgerFilters.time}
                                        onChange={(e) => setLedgerFilters({ ...ledgerFilters, time: e.target.value })}
                                        className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Dates</option>
                                        <option value="this_month">This Month</option>
                                        <option value="last_month">Last Month</option>
                                    </select>
                                    <Calendar className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>

                                {/* Type Filter */}
                                <div className="relative">
                                    <select
                                        value={ledgerFilters.type}
                                        onChange={(e) => setLedgerFilters({ ...ledgerFilters, type: e.target.value })}
                                        className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Transactions</option>
                                        <option value="inv">Invoices (DR)</option>
                                        <option value="pay">Payments (CR)</option>
                                        <option value="cn">Credit Notes</option>
                                    </select>
                                    <Filter className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>

                                <button onClick={() => handleDownload("Credit_Ledger.csv")} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-start text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-start text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-end text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Debit (DR)</th>
                                        <th className="px-6 py-3 text-end text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Credit (CR)</th>
                                        <th className="px-6 py-3 text-end text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                                    {filteredLedger.length === 0 ? (
                                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">No records matching your filters.</td></tr>
                                    ) : (
                                        filteredLedger.map((row) => (
                                            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{row.date}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${row.type === 'inv' ? 'bg-red-500' : row.type === 'pay' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                                                        {row.desc}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-end text-red-600 dark:text-red-400 font-bold whitespace-nowrap">{row.dr > 0 ? `AED ${row.dr.toFixed(2)}` : '-'}</td>
                                                <td className="px-6 py-4 text-sm text-end text-green-600 dark:text-green-400 font-bold whitespace-nowrap">{row.cr > 0 ? `AED ${row.cr.toFixed(2)}` : '-'}</td>
                                                <td className="px-6 py-4 text-sm text-end font-black text-slate-700 dark:text-slate-300 whitespace-nowrap">AED {row.bal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {tab === 'invoices' && (
                    <Card noPadding={true} className="overflow-hidden flex flex-col">

                        {/* Header Toolbar with Filters */}
                        <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50">
                            {selectedOrderIds.length > 0 ? (
                                <div className="flex items-center gap-3 animate-in fade-in w-full sm:w-auto">
                                    <span className="text-sm font-bold text-blue-800 dark:text-blue-200">{selectedOrderIds.length} selected</span>
                                    <button
                                        onClick={() => setShowPayModal(true)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                    >
                                        Pay AED {selectedTotal.toFixed(2)} <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="hidden sm:block text-sm font-bold text-slate-500 ml-2">Invoice Management</div>
                            )}

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                {/* Time Filter */}
                                <div className="relative">
                                    <select
                                        value={invoiceFilters.time}
                                        onChange={(e) => setInvoiceFilters({ ...invoiceFilters, time: e.target.value })}
                                        className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Dates</option>
                                        <option value="this_month">This Month</option>
                                        <option value="last_month">Last Month</option>
                                    </select>
                                    <Calendar className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <select
                                        value={invoiceFilters.status}
                                        onChange={(e) => setInvoiceFilters({ ...invoiceFilters, status: e.target.value })}
                                        className="appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="pending">Pending Payment</option>
                                        <option value="paid">Paid</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    <Filter className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th className="px-4 py-3 w-10">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 dark:border-slate-600 dark:bg-slate-700 text-blue-600 focus:ring-blue-500"
                                                onChange={handleSelectAll}
                                                checked={selectedOrderIds.length > 0 && selectedOrderIds.length === filteredInvoices.filter(i => i.status === 'Pending Payment').length}
                                                disabled={filteredInvoices.filter(i => i.status === 'Pending Payment').length === 0}
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Invoice #</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Order Ref</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Date</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Amount</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Status</th>
                                        <th className="px-6 py-3 text-end text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {filteredInvoices.length === 0 ? (
                                        <tr><td colSpan="7" className="p-6 text-center text-slate-500 dark:text-slate-400">No invoices match your filters.</td></tr>
                                    ) : filteredInvoices.map((inv) => (
                                        <tr key={inv.invoiceId} className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${selectedOrderIds.includes(inv.orderId) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                                            <td className="px-4 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 dark:border-slate-600 dark:bg-slate-700 text-blue-600 focus:ring-blue-500 disabled:opacity-30"
                                                    checked={selectedOrderIds.includes(inv.orderId)}
                                                    onChange={() => toggleInvoiceSelection(inv.orderId)}
                                                    disabled={inv.status !== 'Pending Payment'}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <button onClick={() => setSelectedInvoice(inv)} className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300">
                                                    {inv.invoiceId}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{inv.orderId}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{inv.date}</td>
                                            <td className="px-6 py-4 text-sm font-medium dark:text-white whitespace-nowrap">AED {inv.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-xs px-2 py-1 rounded-full ${inv.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : inv.status === 'Pending Payment' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-end whitespace-nowrap">
                                                <button onClick={() => handleDownload(`${inv.invoiceId}.pdf`)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"><Download className="w-5 h-5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* ... transactions tab ... */}
                {tab === 'transactions' && (
                    <Card noPadding={true}>
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl">
                            <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                            <button onClick={() => handleDownload("Transactions_Log.csv")} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                <Download className="w-3 h-3" /> Export CSV
                            </button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {[
                                { id: 'TXN-9981', date: '01 Dec 2025, 09:30 AM', desc: 'Paid Invoice #INV-2928', amount: -850.50, status: 'Success' },
                                { id: 'TXN-9975', date: '28 Nov 2025, 14:15 PM', desc: 'Wallet Top-up (Bank Transfer)', amount: 2000.00, status: 'Success' },
                                { id: 'TXN-9960', date: '25 Nov 2025, 11:00 AM', desc: 'Paid Invoice #INV-2925', amount: -60.00, status: 'Success' },
                            ].map((txn) => (
                                <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{txn.desc}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{txn.date} • {txn.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>{txn.amount > 0 ? '+' : ''} AED {Math.abs(txn.amount).toFixed(2)}</p>
                                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase font-bold">{txn.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

            </div>

            {showPayModal && (
                <PayBillModal
                    orders={orders}
                    onClose={() => setShowPayModal(false)}
                    onPay={handlePayment}
                    initialSelection={tab === 'invoices' ? selectedOrderIds : []}
                />
            )}

            {selectedInvoice && (
                <InvoiceDetailsModal
                    invoice={selectedInvoice}
                    onClose={() => setSelectedInvoice(null)}
                    onPay={handlePayment}
                />
            )}
        </div>
    );
};

const KYCPage = ({ addToast }) => {
    // Enhanced mock data with 3-level steps and rejection reasons
    const [documents, setDocuments] = useState([
        {
            id: 1,
            title: 'Trade License',
            date: 'Nov 10, 2024',
            status: 'Verified',
            details: 'Expiry Date: 2026-11-10 \n License No: TRD-998877',
            icon: FileText,
            steps: [
                { label: 'Uploaded', status: 'completed' },
                { label: 'Review', status: 'completed' },
                { label: 'Approved', status: 'completed' }
            ]
        },
        {
            id: 2,
            title: 'VAT Certificate',
            date: 'Dec 01, 2025',
            status: 'Under Review',
            details: 'Submitted on Dec 01. Reviewer remarks pending.',
            icon: ShieldCheck,
            steps: [
                { label: 'Uploaded', status: 'completed' },
                { label: 'Review', status: 'current' },
                { label: 'Approved', status: 'pending' }
            ]
        },
        {
            id: 3,
            title: 'Tenancy Contract',
            date: 'Oct 15, 2024',
            status: 'Revoked',
            details: 'Document rejected due to blurriness.',
            rejectionReason: 'The uploaded copy is blurry and the expiry date is not visible. Please upload a high-resolution scan.',
            icon: Building,
            steps: [
                { label: 'Uploaded', status: 'completed' },
                { label: 'Review', status: 'error' },
                { label: 'Approved', status: 'pending' }
            ]
        }
    ]);
    const [previewDoc, setPreviewDoc] = useState(null);

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            setDocuments(prevDocs => prevDocs.map(doc => {
                if (doc.id === id) {
                    return {
                        ...doc,
                        status: 'Under Review',
                        rejectionReason: null, // Clear rejection
                        date: new Date().toLocaleDateString(),
                        details: `Re-uploaded: ${file.name}. Pending review.`,
                        steps: [
                            { label: 'Uploaded', status: 'completed' },
                            { label: 'Review', status: 'current' },
                            { label: 'Approved', status: 'pending' }
                        ]
                    };
                }
                return doc;
            }));
            addToast(`Successfully resubmitted ${file.name}`, "success");
        }
    };

    const handleNewUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.jpg,.png';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const newDoc = {
                    id: Date.now(),
                    title: file.name,
                    date: new Date().toLocaleDateString(),
                    status: 'Under Review',
                    details: 'Uploaded just now. Pending verification.',
                    icon: FileText,
                    steps: [
                        { label: 'Uploaded', status: 'completed' },
                        { label: 'Review', status: 'current' },
                        { label: 'Approved', status: 'pending' }
                    ]
                };
                setDocuments([...documents, newDoc]);
                addToast("Document uploaded successfully.", "success");
            }
        };
        input.click();
    };

    const handleDownload = (doc) => {
        addToast(`Downloading ${doc.title}...`, "default");
        setTimeout(() => addToast("Download Completed", "success"), 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400">KYC & Documents</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage compliance documents and check verification status.</p>
                </div>
                <PrimaryButton onClick={handleNewUpload} className="w-auto bg-slate-800 hover:bg-slate-900"><UploadCloud className="w-4 h-4" /> Upload New Document</PrimaryButton>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {documents.map((doc) => (
                    <Card key={doc.id} className={`transition-all duration-300 ${doc.status === 'Revoked' ? 'ring-2 ring-red-500/20 dark:ring-red-500/40 bg-red-50/10 dark:bg-red-900/5' : ''}`}>
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left: Icon & Info */}
                            <div className="flex-1">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl mt-1 ${doc.status === 'Verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : doc.status === 'Revoked' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                                        <doc.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{doc.title}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={() => setPreviewDoc(doc)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors" title="Preview"><Eye className="w-4 h-4" /></button>
                                                <button onClick={() => handleDownload(doc)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Last Updated: {doc.date}</p>
                                        <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            {doc.details}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Tracker & Status */}
                            <div className="w-full md:w-80 flex-shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 md:pl-6 pt-4 md:pt-0">

                                {/* 3-Level Tracker */}
                                <div className="mb-4">
                                    <div className="flex justify-between mb-2">
                                        {doc.steps.map((step, idx) => (
                                            <div key={idx} className="flex flex-col items-center flex-1 relative">
                                                {/* Connector Line */}
                                                {idx < doc.steps.length - 1 && (
                                                    <div className={`absolute top-2.5 left-1/2 w-full h-0.5 z-0 ${step.status === 'completed' && doc.steps[idx + 1].status !== 'pending' ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                                )}
                                                {/* Dot */}
                                                <div className={`w-5 h-5 rounded-full z-10 flex items-center justify-center border-2 text-[10px] font-bold transition-colors ${step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                                                    step.status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                                                        step.status === 'current' ? 'bg-blue-600 border-blue-600 text-white animate-pulse' :
                                                            'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300'
                                                    }`}>
                                                    {step.status === 'completed' ? <Check className="w-3 h-3" /> : step.status === 'error' ? <X className="w-3 h-3" /> : idx + 1}
                                                </div>
                                                <span className={`text-[10px] mt-1 font-bold ${step.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                                                    step.status === 'error' ? 'text-red-600 dark:text-red-400' :
                                                        step.status === 'current' ? 'text-blue-600 dark:text-blue-400' :
                                                            'text-slate-400'
                                                    }`}>{step.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status or Rejection Box */}
                                {doc.status === 'Revoked' ? (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-red-700 dark:text-red-300">Action Required</p>
                                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{doc.rejectionReason}</p>
                                            </div>
                                        </div>
                                        <label className="flex items-center justify-center w-full p-2 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 border-dashed rounded-md cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors group/upload">
                                            <UploadCloud className="w-4 h-4 text-red-500 mr-2 group-hover/upload:scale-110 transition-transform" />
                                            <span className="text-xs font-bold text-red-600 dark:text-red-400">Click to Re-upload</span>
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} accept=".pdf,.jpg,.png" />
                                        </label>
                                    </div>
                                ) : (
                                    <div className={`p-3 rounded-lg text-center border ${doc.status === 'Verified' ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'}`}>
                                        <p className={`text-xs font-bold uppercase tracking-wider ${doc.status === 'Verified' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>Current Status</p>
                                        <p className={`text-sm font-bold mt-1 ${doc.status === 'Verified' ? 'text-slate-900 dark:text-white' : 'text-blue-600 dark:text-blue-400'}`}>{doc.status}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>))}
            </div>

            {previewDoc && (
                <Modal title={previewDoc.title} onClose={() => setPreviewDoc(null)} size="lg">
                    <div className="space-y-6">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 aspect-video flex flex-col items-center justify-center text-slate-400">
                            <FileText className="w-16 h-16 mb-2 opacity-50" />
                            <p className="font-bold">Document Preview</p>
                            <p className="text-xs">{previewDoc.title}.pdf</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Status</p>
                                <span className={`text-sm font-bold ${previewDoc.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>{previewDoc.status}</span>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Uploaded Date</p>
                                <p className="text-sm font-bold dark:text-white">{previewDoc.date}</p>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Details</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{previewDoc.details}</p>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button onClick={() => setPreviewDoc(null)} className="px-4 py-2 text-slate-500 hover:text-slate-700 font-bold">Close</button>
                            <PrimaryButton onClick={() => { handleDownload(previewDoc); setPreviewDoc(null); }} className="w-auto">
                                <Download className="w-4 h-4" /> Download Original
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const AddAddressModal = ({ onClose, onAdd }) => {
    const [addr, setAddr] = useState({ name: '', details: '' });
    const handleSubmit = () => {
        if (!addr.name || !addr.details) return console.warn("Please fill all fields"); // Replaced alert
        onAdd(addr);
    };
    return (
        <Modal title="Add New Address" onClose={onClose}>
            <div className="space-y-4">
                <FormInput id="addrName" label="Location Name" placeholder="e.g. Branch 2" value={addr.name} onChange={e => setAddr({ ...addr, name: e.target.value })} />
                <FormInput id="addrDetails" label="Address Details" placeholder="Full address..." value={addr.details} onChange={e => setAddr({ ...addr, details: e.target.value })} />
                <PrimaryButton onClick={handleSubmit}>Save Address</PrimaryButton>
            </div>
        </Modal>
    );
};

const AddCardModal = ({ onClose, onAdd }) => {
    const [card, setCard] = useState({ number: '', expiry: '', name: '' });
    const handleSubmit = () => {
        if (!card.number || !card.expiry) return console.warn("Please fill all fields"); // Replaced alert
        onAdd({ type: 'Visa', last4: card.number.slice(-4), expiry: card.expiry, holder: card.name, isDefault: false });
    };
    return (
        <Modal title="Add Payment Method" onClose={onClose}>
            <div className="space-y-4">
                <FormInput id="cName" label="Cardholder Name" placeholder="Name on card" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                <FormInput id="cNum" label="Card Number" placeholder="0000 0000 0000 0000" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                <FormInput id="cExp" label="Expiry" placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                <PrimaryButton onClick={handleSubmit}>Save Card</PrimaryButton>
            </div>
        </Modal>
    );
};

const AccountSettingsPage = ({ addToast }) => {
    const [paymentMethods, setPaymentMethods] = useState([{ id: 1, type: 'Visa', last4: '4242', expiry: '12/28', holder: 'Abreco Admin', isDefault: true }, { id: 2, type: 'Mastercard', last4: '8899', expiry: '09/26', holder: 'Abreco Admin', isDefault: false },]);
    const [addresses, setAddresses] = useState([{ id: 1, name: 'Main Warehouse', details: 'Warehouse 4, Al Quoz Ind Area 3, Dubai, UAE', isDefault: true }]);
    const [showAddrModal, setShowAddrModal] = useState(false);
    const [showCardModal, setShowCardModal] = useState(false);

    const setDefaultPayment = (id) => {
        setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
        addToast("Default payment method updated", "success");
    };
    const handleAddAddress = (addr) => {
        setAddresses([...addresses, { id: Date.now(), ...addr, isDefault: false }]);
        setShowAddrModal(false);
        addToast("New address added successfully", "success");
    };
    const handleAddCard = (card) => {
        setPaymentMethods([...paymentMethods, { id: Date.now(), ...card }]);
        setShowCardModal(false);
        addToast("New card added successfully", "success");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400 mb-6">Account Settings</h1>

            <Card noPadding={true}>
                <CardHeader title="Profile Information" />
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormInput id="name" label="Company Name" value="Abreco Customer Inc." disabled readOnly className="bg-slate-50" /><FormInput id="email" label="Contact Email" value="admin@abrecocustomer.com" readOnly /><FormInput id="phone" label="Phone Number" value="+971 50 000 0000" readOnly /></div>
                </CardContent>
            </Card>

            <Card noPadding={true}>
                <CardHeader title="Address Book">
                    <button onClick={() => setShowAddrModal(true)} className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add New Address</button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {addresses.map(addr => (
                            <div key={addr.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">{addr.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{addr.details}</p>
                                    </div>
                                </div>
                                {addr.isDefault && <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">Default</span>}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card noPadding={true}>
                <CardHeader title="Payment Methods">
                    <button onClick={() => setShowCardModal(true)} className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add Card</button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">{paymentMethods.map(pm => (<div key={pm.id} className={`border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all ${pm.isDefault ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'}`}><div className="flex items-center gap-4 mb-3 sm:mb-0"><div className={`p-3 rounded-xl ${pm.isDefault ? 'bg-white dark:bg-green-900/20 text-green-600 dark:text-green-400 shadow-sm' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}><CardIcon className="w-6 h-6" /></div><div><div className="flex items-center gap-2"><h4 className="font-bold text-slate-900 dark:text-white">{pm.type} ending in {pm.last4}</h4>{pm.isDefault && <span className="text-[10px] bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Default</span>}</div><p className="text-sm text-slate-500 dark:text-slate-400">Expires {pm.expiry} • {pm.holder}</p></div></div>{!pm.isDefault ? (<button onClick={() => setDefaultPayment(pm.id)} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">Set as Default</button>) : (<div className="text-green-600 dark:text-green-400 flex items-center gap-1 text-sm font-bold"><CheckCircle className="w-4 h-4" /> Active</div>)}</div>))}</div>
                </CardContent>
            </Card>

            {showAddrModal && <AddAddressModal onClose={() => setShowAddrModal(false)} onAdd={handleAddAddress} />}
            {showCardModal && <AddCardModal onClose={() => setShowCardModal(false)} onAdd={handleAddCard} />}
        </div>
    );
};

const SavedItemsPage = ({ addToCart, addToast }) => {
    const [savedItems, setSavedItems] = useState(INITIAL_SAVED_ITEMS);

    const removeItem = (id) => {
        if (window.confirm('Remove this item from your saved list?')) {
            setSavedItems(prev => prev.filter(item => item.id !== id));
            addToast("Item removed from saved list", "default");
        }
    };

    const handleMoveToCart = (item) => {
        if (item.status === 'Out of Stock') {
            addToast('Sorry, this item is currently out of stock.', "error");
            return;
        }
        addToCart({
            id: item.id,
            name: item.name,
            unit: item.unit,
            price: item.price,
            quantity: 1
        });
        addToast(`Successfully added ${item.name} to your cart!`, "success");
    };

    if (savedItems.length === 0) { return (<div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4"><div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full"><Heart className="w-10 h-10 text-slate-400" /></div><h2 className="xl font-bold text-slate-800 dark:text-white">No Saved Items</h2><p className="text-slate-500 dark:text-slate-400 max-w-sm">Items you save for later will appear here. Start browsing products to build your wishlist.</p><PrimaryButton className="w-auto">Browse Products</PrimaryButton></div>); }
    return (<div className="space-y-6 animate-in fade-in duration-500"><div className="flex justify-between items-center"><h1 className="2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400">Saved Items</h1><span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">{savedItems.length} Items</span></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{savedItems.map((item) => (<div key={item.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"><div className="h-48 bg-slate-100 dark:bg-slate-700 relative flex items-center justify-center overflow-hidden"><Package className="w-16 h-16 text-slate-300 dark:text-slate-500 group-hover:scale-110 transition-transform duration-500" /><div className="absolute top-3 left-3"><span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${item.status === 'In Stock' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : item.status === 'Low Stock' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>{item.status}</span></div></div><div className="p-5 flex-1 flex flex-col"><div className="flex-1"><p className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-1">{item.sku}</p><h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 line-clamp-2">{item.name}</h3><p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{item.unit}</p></div><div className="flex items-end justify-between mb-4"><span className="xl font-bold text-slate-900 dark:text-white">AED {item.price.toFixed(2)}</span></div><div className="flex gap-2"><button onClick={() => handleMoveToCart(item)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-colors ${item.status === 'Out of Stock' ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-slate-200'}`} disabled={item.status === 'Out of Stock'}><ShoppingBag className="w-4 h-4" /> {item.status === 'Out of Stock' ? 'No Stock' : 'Add to Cart'}</button><button onClick={() => removeItem(item.id)} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Remove"><Trash2 className="w-5 h-5" /></button></div></div></div>))}</div></div>);
};

const ReturnsPage = ({ orders, setCurrentView, addToCart, addToast }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const returns = orders.filter(o => o.returnStatus);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Refunded': return 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'Approved': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'Processing':
            default: return 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Refunded': return <CheckCircle className="w-3 h-3" />;
            case 'Approved': return <Check className="w-3 h-3" />;
            case 'Processing':
            default: return <Clock className="w-3 h-3" />;
        }
    };

    if (returns.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-in fade-in">
                <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full"><Undo2 className="w-12 h-12 text-slate-400" /></div>
                <h2 className="xl font-bold text-slate-800 dark:text-white">No Returns Yet</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">You haven't requested any refunds, replacements, or shortage reports yet.</p>
                <PrimaryButton className="w-auto" onClick={() => setCurrentView('orders')}>Go to Orders</PrimaryButton>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div><h1 className="2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-800 dark:from-red-500 dark:to-blue-400 tracking-tight">Returns & Refunds</h1><p className="text-slate-500 dark:text-slate-400 mt-1">Track the status of your reported issues.</p></div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-4">Order & Items</div>
                    <div className="col-span-2">Date Reported</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Details</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {returns.map(order => (
                        <div key={order.id} onClick={() => setSelectedOrder(order)} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 p-4 items-start md:items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">

                            {/* Order & Items */}
                            <div className="w-full md:col-span-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl border border-orange-100 dark:border-orange-900/30 flex-shrink-0">
                                        <Undo2 className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{order.id}</span>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                                            <Package className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="truncate">{order.items}</span>
                                            {order.extraItems > 0 && <span className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 rounded-full">+{order.extraItems}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="w-full md:col-span-2 flex justify-between md:block">
                                <span className="md:hidden text-xs font-bold text-slate-400 uppercase">Reported</span>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{new Date(order.date).toLocaleDateString()}</span>
                            </div>

                            {/* Status */}
                            <div className="w-full md:col-span-2 flex justify-between md:block">
                                <span className="md:hidden text-xs font-bold text-slate-400 uppercase">Status</span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.returnStatus)}`}>
                                    {getStatusIcon(order.returnStatus)} {order.returnStatus || 'Processing'}
                                </span>
                            </div>

                            {/* Details Message */}
                            <div className="w-full md:col-span-3 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Info className="w-4 h-4 flex-shrink-0 text-blue-500 hidden md:block" />
                                <span className="line-clamp-1 md:line-clamp-2">
                                    {order.returnStatus === 'Refunded' ? 'Refund processed to wallet.' :
                                        order.returnStatus === 'Approved' ? 'Return pickup scheduled.' :
                                            'Request is currently under review.'}
                                </span>
                            </div>

                            {/* Action */}
                            <div className="w-full md:col-span-1 flex justify-end">
                                <button className="p-2 text-slate-300 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 rounded-full transition-colors">
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    addToCart={addToCart}
                    addToast={addToast}
                    onConfirmReceipt={() => { }} // No-op for returns view
                    onCancelOrder={() => { }} // No-op for returns view
                    onReturnOrder={() => { }} // No-op for returns view
                />
            )}
        </div>
    );
};

// --- NEW SUPPORT PAGE COMPONENT ---
const SupportPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { q: "How do I track my delivery?", a: "You can track your delivery in real-time by navigating to the 'Orders' page. Select the order you wish to track, and click on the 'Track Shipment' button to see the current status and estimated arrival time." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard), Bank Transfers, and Cash on Delivery for verified business accounts. You can manage your payment methods in Account Settings." },
        { q: "How do I report a damaged item?", a: "Go to the 'Orders' page, select the relevant order, and click 'Report Issue'. You can select the damaged item, upload a photo proof, and choose whether you want a refund or replacement." },
        { q: "Can I change my delivery address after ordering?", a: "If the order status is 'Ordered' or 'Pending', you can contact support to update the address. Once the status is 'Shipped', the address cannot be changed." },
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">How can we help you?</h1>
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Search for answers..." className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 dark:bg-slate-800 dark:text-white outline-none transition-all" />
                </div>
            </div>

            {/* Video Tutorial Section */}
            <Card className="overflow-hidden border-none shadow-xl ring-1 ring-slate-900/5" noPadding>
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                            <PlayCircle className="w-6 h-6" />
                        </div>
                        <h2 className="2xl font-bold mb-2">Platform Walkthrough</h2>
                        <p className="text-blue-100 mb-6 leading-relaxed">Watch this quick 2-minute video to learn how to manage orders, track payments, and handle returns efficiently on the Abreco Portal.</p>
                        <button className="self-start px-6 py-2.5 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">Watch Video</button>
                    </div>
                    <div className="relative bg-slate-100 dark:bg-slate-800 aspect-video md:aspect-auto flex items-center justify-center group cursor-pointer">
                        {/* Placeholder for Video Embed */}
                        <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/40 group-hover:bg-slate-900/0 transition-colors"></div>
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video Thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300">
                                <PlayCircle className="w-8 h-8 text-blue-600" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* FAQ Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <h3 className="xl font-bold text-slate-900 dark:text-white mb-2">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                        {faqs.map((item, idx) => (
                            <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden transition-all duration-200 hover:shadow-md">
                                <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 dark:text-slate-200">
                                    {item.q}
                                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 bg-slate-50 dark:bg-slate-800/50">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Side Panel */}
                <div className="space-y-4">
                    <h3 className="xl font-bold text-slate-900 dark:text-white mb-2">Contact Us</h3>
                    <Card>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                                <MessageCircle className="w-6 h-6" />
                                <div>
                                    <p className="font-bold text-sm">Live Chat</p>
                                    <p className="text-xs opacity-80">Available 9am - 6pm</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                <Mail className="w-6 h-6" />
                                <div>
                                    <p className="font-bold text-sm">Email Support</p>
                                    <p className="text-xs opacity-80">Response within 24h</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                <Phone className="w-6 h-6" />
                                <div>
                                    <p className="font-bold text-sm">Call Us</p>
                                    <p className="text-xs opacity-80">+971 4 000 0000</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                            <PrimaryButton>Start a Ticket</PrimaryButton>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ currentView, setCurrentView, onClose }) => {
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 'orders', name: 'Orders', icon: Package, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        { id: 'returns', name: 'Returns & Refunds', icon: Undo2, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
        { id: 'saved-items', name: 'Saved Items', icon: Heart, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-900/20' },
        { id: 'services', name: 'Service Requests', icon: Wrench, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { id: 'financials', name: 'Financials', icon: Banknote, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { id: 'kyc', name: 'KYC & Documents', icon: FileText, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
    ];
    const toolItems = [
        { id: 'settings', name: 'Account Settings', icon: User, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
        { id: 'help', name: 'Support', icon: CircleHelp, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    ];

    const NavLink = ({ item }) => {
        const isActive = currentView === item.id;
        return (
            <button
                onClick={() => { setCurrentView(item.id); if (onClose) onClose(); }}
                className={`group relative flex w-full items-center justify-between px-4 py-4 mb-3 rounded-2xl transition-all duration-300 border backdrop-blur-md
                    ${isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg shadow-slate-900/20 dark:shadow-white/10 scale-[1.02]'
                        : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5'
                    }`}
            >
                <div className="flex items-center gap-4 z-10">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white dark:text-slate-900' : `${item.bg} ${item.color} group-hover:scale-110 shadow-sm`}`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{item.name}</span>
                </div>

                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100'}`} />
            </button>
        );
    };

    return (
        <nav className="w-full bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex flex-col h-full p-4 shadow-2xl z-50">
            <div className="flex items-center justify-between px-2 mb-8 mt-2">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-red-600 to-red-500 p-2.5 rounded-xl shadow-lg shadow-red-500/30">
                        <Package2 className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="block xl font-black text-slate-900 dark:text-white tracking-tight">Abreco</span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Portal</span>
                    </div>
                </div>
                {onClose && (<button onClick={onClose} className="lg:hidden p-2 text-slate-500 bg-white dark:bg-slate-800 rounded-full hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-700"><X className="w-5 h-5" /></button>)}
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar px-1">
                <div className="mb-6">
                    <h6 className="text-[10px] font-black text-slate-400/80 uppercase tracking-widest px-4 mb-4">Main Menu</h6>
                    <div className="space-y-1">{navItems.map((item) => <NavLink key={item.id} item={item} />)}</div>
                </div>

                <div>
                    <h6 className="text-[10px] font-black text-slate-400/80 uppercase tracking-widest px-4 mb-4">Settings</h6>
                    <div className="space-y-1">{toolItems.map((item) => <NavLink key={item.id} item={item} />)}</div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 px-2">
                <button
                    onClick={() => { setCurrentView('settings'); if (onClose) onClose(); }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm group cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border-2 border-white dark:border-slate-800 shadow-sm">AC</div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Abreco Cust.</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">View Profile</p>
                    </div>
                    <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                </button>
            </div>
        </nav>
    );
};

const Header = ({ onMenuClick, onLogout, currentView, isDark, toggleTheme, cartCount, openCart }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    return (
        <header className="bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"><Menu className="w-6 h-6" /></button>
                <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white capitalize truncate max-w-[200px] sm:max-w-none">{currentView === 'kyc' ? 'KYC Documents' : currentView.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
                {/* Visit Shop Button */}
                <a
                    href="/customer4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${isDark ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700 hover:text-blue-300' : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm'}`}
                >
                    <Globe className="w-4 h-4" />
                    <span>Visit Shop</span>
                </a>

                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-all ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 shadow-sm hover:bg-slate-200'}`}
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Cart Button */}
                <button onClick={openCart} className="p-2 relative rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm">{cartCount}</span>}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><Bell className="w-5 h-5" /></button>
                    {isNotifOpen && (
                        <div className="absolute top-full end-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 z-20 p-2">
                            <h4 className="text-sm font-bold p-2 text-slate-900 dark:text-white border-b dark:border-slate-700 mb-2">Notifications</h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                <div className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Order Out for Delivery</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Order #ORD-2931 is on its way.</p>
                                </div>
                                <div className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Payment Due</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Invoice #INV-2930 is pending.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button className="flex items-center group" onClick={() => setIsDropdownOpen(prev => !prev)}>
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border-2 border-transparent group-hover:border-red-500 transition-all">AC</div>
                        <div className="ms-3 hidden sm:block text-start">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Abreco Customer</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">View Profile</p>
                        </div>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full end-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 z-20">
                            <button onClick={onLogout} className="flex items-center w-full text-start px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg">
                                <LogOut className="w-4 h-4 me-2" /> Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default function App() {
    const [userState, setUserState] = useState('loggedOut');
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isDark, setIsDark] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    const fetchOrders = useCallback(async (customerId) => {
        setIsLoadingOrders(true);
        try {
            const resp = await fetch(`/api/orders?customerId=${customerId}`);
            const data = await resp.json();
            const mapped = data.map(o => ({
                ...o,
                amount: o.total || o.amount,
                items: Array.isArray(o.items) ? o.items.map(i => i.name).join(', ') : o.items,
                extraItems: Array.isArray(o.items) ? Math.max(0, o.items.length - 1) : 0,
                date: o.date ? new Date(o.date).toLocaleDateString('en-CA') : 'N/A'
            }));
            setOrders(mapped);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setIsLoadingOrders(false);
        }
    }, []);

    // --- Persistence Logic ---
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                const customerData = JSON.parse(savedUser);
                setCustomer(customerData);
                setUserState('approved');
                setCurrentView('dashboard');
                fetchOrders(customerData.code);
            } catch (err) {
                console.error("Failed to restore session", err);
                localStorage.removeItem('currentUser');
            }
        }
    }, [fetchOrders]);

    const onLoginSuccess = (customerData) => {
        localStorage.setItem('currentUser', JSON.stringify(customerData));
        setCustomer(customerData);
        setUserState('approved');
        setCurrentView('dashboard');
        fetchOrders(customerData.code);
    };

    const handleUpdateOrder = (id, updates) => { setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o)); };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCustomer(null);
        setOrders([]);
        setUserState('loggedOut');
        setCurrentView('dashboard');
        setLanguage('en');
        setNeedsPasswordChange(false);
    };

    const [toasts, setToasts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // --- Theme Logic ---
    const toggleTheme = () => setIsDark(!isDark);

    // --- Toast Logic ---
    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    };
    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    // --- Cart Logic ---
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, cartId: Date.now(), quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateCartQuantity = (cartId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.cartId === cartId) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setCart([]);
        addToast("Order placed successfully!", "success");
        // In a real app, this would post to API and add to orders list
        setOrders(prev => [{
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleDateString('en-CA'),
            amount: cart.reduce((acc, i) => acc + (i.price * i.quantity), 0),
            status: 'Pending Delivery',
            items: 'New Web Order',
            extraItems: cart.length - 1,
            eta: 'Pending'
        }, ...prev]);
    };

    // --- Auth & Data Logic ---
    const completeOnboarding = () => { setUserState('pendingApproval'); };

    return (
        <div className={`${isDark ? 'dark' : ''} h-full w-full`}>
            {userState === 'loggedOut' ? (
                <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <LoginScreen onLoginSuccess={onLoginSuccess} setUserState={setUserState} setCurrentView={setCurrentView} setNeedsPasswordChange={setNeedsPasswordChange} language={language} setLanguage={setLanguage} isDark={isDark} toggleTheme={toggleTheme} />
                </div>
            ) : userState === 'onboarding' ? (
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-white">
                    <OnboardingWizard onComplete={completeOnboarding} />
                </div>
            ) : userState === 'pendingApproval' ? (
                <PendingApprovalScreen onLogout={handleLogout} />
            ) : (
                <div className={`flex h-screen w-full font-inter transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {/* Dark Mode Background */}
                    {isDark && (
                        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2e1065] via-[#0f172a] to-[#020617] opacity-100"></div>
                    )}

                    <ToastContainer toasts={toasts} removeToast={removeToast} />
                    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateCartQuantity} checkout={handleCheckout} />

                    <div className="hidden lg:flex w-64 flex-shrink-0 z-10"><Sidebar currentView={currentView} setCurrentView={setCurrentView} /></div>
                    {isSidebarOpen && (<div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>)}
                    <div className={`fixed inset-y-0 start-0 w-64 bg-white dark:bg-slate-900 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}`}><Sidebar currentView={currentView} setCurrentView={setCurrentView} onClose={() => setIsSidebarOpen(false)} /></div>

                    <main className="flex-1 flex flex-col overflow-y-auto z-10 relative">
                        <Header
                            onMenuClick={() => setIsSidebarOpen(true)}
                            onLogout={handleLogout}
                            currentView={currentView}
                            isDark={isDark}
                            toggleTheme={toggleTheme}
                            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                            openCart={() => setIsCartOpen(true)}
                        />
                        <div className="flex-grow p-4 sm:p-6">
                            {(() => {
                                switch (currentView) {
                                    case 'orders': return <OrdersPage orders={orders} onUpdateOrder={handleUpdateOrder} addToCart={addToCart} addToast={addToast} />;
                                    case 'returns': return <ReturnsPage orders={orders} setCurrentView={setCurrentView} addToCart={addToCart} addToast={addToast} />;
                                    case 'saved-items': return <SavedItemsPage addToCart={addToCart} addToast={addToast} />;
                                    case 'services': return <ServiceRequestsPage addToast={addToast} />;
                                    case 'financials': return <FinancialsPage orders={orders} onUpdateOrder={handleUpdateOrder} addToast={addToast} />;
                                    case 'kyc': return <KYCPage addToast={addToast} />;
                                    case 'settings': return <AccountSettingsPage addToast={addToast} />;
                                    case 'help': return <SupportPage />;
                                    case 'dashboard': default: return <DashboardView setCurrentView={setCurrentView} orders={orders} onUpdateOrder={handleUpdateOrder} addToast={addToast} />;
                                }
                            })()}
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}