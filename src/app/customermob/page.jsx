"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Search, Mic, ShoppingCart, Heart, User, Menu, X, 
  ChevronRight, ArrowRight, Star, ShoppingBag, Wrench, 
  Apple, ThermometerSnowflake, Milk, Soup, Utensils, 
  Armchair, Layout, Bug, ClipboardCheck, Facebook, 
  Instagram, Twitter, MapPin, Phone, Mail, CheckCircle, 
  Zap, Package, Truck, Sparkles, Send, Box, Snowflake,
  Droplet, Monitor, Home, Shield, PenTool, LogIn, UserPlus, Info, HelpCircle,
  ChevronDown, ChevronUp, Sun, Moon, Volume2, Trash2, Plus, Minus, CreditCard,
  Filter, SlidersHorizontal, Clock, Tag, Share2, Award, ArrowLeft, Copy, Percent,
  Timer, Flame, Watch, Receipt, Globe, Grid, Bell, Package2, ArrowUpDown, MessageCircle, Navigation,
  Wallet, Building2, Briefcase, PlusCircle, Banknote, Map, Gift, LogOut, Calendar,
  FileText, Download, Printer, FileCheck, Eye, AlertCircle, FileClock,
  ArrowUpRight, ArrowDownLeft, RefreshCcw, History, Lock
} from 'lucide-react';

// --- TRANSLATION DATA ---
const TRANSLATIONS = {
  en: {
    home: "Home",
    shop: "Shop",
    categories: "Collections",
    services: "Services",
    products: "Products",
    wishlist: "Wishlist",
    profile: "Profile",
    cart: "Cart",
    search: "Search fresh food, services...",
    deliverTo: "Deliver to",
    dailyDeals: "Daily Deals",
    exclusiveOffers: "Exclusive",
    viewAll: "View All",
    quickServices: "Quick Services",
    trending: "Trending Now",
    recent: "Buy Again",
    checkout: "Checkout",
    total: "Total",
    addItem: "Add",
    book: "Book",
    filters: "Filters",
    sort: "Sort",
    apply: "Apply Filters",
    trackOrder: "Track Order",
    orders: "Orders"
  }
};

// --- MOCK DATA ---
const SEASONAL_SLIDES = [
  {
    id: 1,
    title: "Fresh Harvest",
    subtitle: "Organic Fruits & Veg",
    discount: "60% OFF",
    bgImage: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-green-900/90 via-emerald-900/80 to-teal-900/40",
    accent: "text-green-400",
    buttonColor: "bg-green-400 text-emerald-900"
  },
  {
    id: 2,
    title: "Butcher's Cut",
    subtitle: "Premium Wagyu & Lamb",
    discount: "Buy 2 Get 1",
    bgImage: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-rose-900/90 via-red-900/80 to-transparent",
    accent: "text-rose-400",
    buttonColor: "bg-rose-500 text-white"
  }
];

const CATEGORIES_DATA = {
  products: [
    {
      id: 'fresh',
      title: 'Fresh Market',
      icon: <Apple className="w-8 h-8" />,
      textGradient: 'from-emerald-400 via-green-400 to-teal-400',
      accent: 'text-emerald-500',
      subCardBg: 'bg-gradient-to-br from-emerald-600 to-green-500',
      buttonGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      glow: 'shadow-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
      subcategories: [
        { name: 'Fish & Seafood', icon: <div className="w-6 h-6">🐟</div> },
        { name: 'Fresh Chicken', icon: <div className="w-6 h-6">🍗</div> },
        { name: 'Fruits & Veg', icon: <Apple className="w-6 h-6"/> },
        { name: 'Organic', icon: <div className="w-6 h-6">🌿</div> }
      ]
    },
    {
      id: 'frozen',
      title: 'Frozen Goods',
      icon: <ThermometerSnowflake className="w-8 h-8" />,
      textGradient: 'from-cyan-400 via-blue-400 to-indigo-400',
      accent: 'text-cyan-500',
      subCardBg: 'bg-gradient-to-br from-cyan-600 to-blue-500',
      buttonGradient: 'bg-gradient-to-r from-cyan-600 to-blue-600',
      glow: 'shadow-cyan-500/30',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Ice Cream', icon: <Snowflake className="w-6 h-6"/> },
          { name: 'Frozen Meat', icon: <Box className="w-6 h-6"/> },
          { name: 'Ready Meals', icon: <Package className="w-6 h-6"/> },
          { name: 'Vegetables', icon: <div className="w-6 h-6">🥦</div> }
      ]
    },
    {
      id: 'chilled',
      title: 'Chilled & Dairy',
      icon: <Milk className="w-8 h-8" />,
      textGradient: 'from-yellow-300 via-amber-400 to-orange-400',
      accent: 'text-amber-500',
      subCardBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      buttonGradient: 'bg-gradient-to-r from-amber-600 to-orange-600',
      glow: 'shadow-amber-500/30',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Milk & Laban', icon: <Droplet className="w-6 h-6"/> },
          { name: 'Cheeses', icon: <Box className="w-6 h-6"/> },
          { name: 'Yogurts', icon: <Milk className="w-6 h-6"/> },
          { name: 'Butter', icon: <Box className="w-6 h-6"/> }
      ]
    },
    {
      id: 'ambient',
      title: 'Pantry',
      icon: <Soup className="w-8 h-8" />,
      textGradient: 'from-rose-400 via-pink-500 to-purple-500',
      accent: 'text-rose-500',
      subCardBg: 'bg-gradient-to-br from-rose-600 to-pink-600',
      buttonGradient: 'bg-gradient-to-r from-rose-600 to-pink-600',
      glow: 'shadow-rose-500/30',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Rice & Pulses', icon: <Box className="w-6 h-6"/> },
          { name: 'Oils & Ghee', icon: <Droplet className="w-6 h-6"/> },
          { name: 'Canned Food', icon: <Package className="w-6 h-6"/> },
          { name: 'Spices', icon: <Sparkles className="w-6 h-6"/> }
      ]
    }
  ],
  services: [
    {
      id: 'maintenance',
      title: 'Maintenance',
      icon: <Wrench className="w-8 h-8" />,
      textGradient: 'from-orange-400 via-red-500 to-rose-500',
      accent: 'text-orange-500',
      subCardBg: 'bg-gradient-to-br from-orange-600 to-red-600',
      buttonGradient: 'bg-gradient-to-r from-orange-600 to-red-600',
      glow: 'shadow-orange-500/30',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'HVAC / AC', icon: <Snowflake className="w-6 h-6"/> },
          { name: 'Plumbing', icon: <Droplet className="w-6 h-6"/> },
          { name: 'Electrical', icon: <Zap className="w-6 h-6"/> },
          { name: 'General Repairs', icon: <Wrench className="w-6 h-6"/> }
      ]
    },
    {
      id: 'furniture',
      title: 'Furniture',
      icon: <Armchair className="w-8 h-8" />,
      textGradient: 'from-amber-400 via-orange-500 to-yellow-500',
      accent: 'text-amber-500',
      subCardBg: 'bg-gradient-to-br from-amber-600 to-orange-600',
      buttonGradient: 'bg-gradient-to-r from-amber-600 to-orange-600',
      glow: 'shadow-amber-500/30',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Upholstery', icon: <Armchair className="w-6 h-6"/> },
          { name: 'Repair', icon: <Wrench className="w-6 h-6"/> },
          { name: 'Custom Made', icon: <PenTool className="w-6 h-6"/> },
          { name: 'Outdoor', icon: <Sun className="w-6 h-6"/> }
      ]
    },
    {
      id: 'pest_control',
      title: 'Pest Control',
      icon: <Bug className="w-8 h-8" />,
      textGradient: 'from-emerald-400 via-teal-500 to-green-500',
      accent: 'text-emerald-500',
      subCardBg: 'bg-gradient-to-br from-emerald-600 to-teal-600',
      buttonGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      glow: 'shadow-emerald-500/30',
      image: 'https://images.unsplash.com/photo-1632838320392-ae701d006c82?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Kitchen Insects', icon: <Bug className="w-6 h-6"/> },
          { name: 'Rodent Control', icon: <Shield className="w-6 h-6"/> },
          { name: 'Fumigation', icon: <Box className="w-6 h-6"/> },
          { name: 'Prevention', icon: <CheckCircle className="w-6 h-6"/> }
      ]
    },
    {
      id: 'equipment',
      title: 'Equipment',
      icon: <Utensils className="w-8 h-8" />,
      textGradient: 'from-blue-400 via-indigo-500 to-violet-500',
      accent: 'text-blue-500',
      subCardBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      buttonGradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/30',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Kitchen Equip', icon: <Flame className="w-6 h-6"/> },
          { name: 'Refrigeration', icon: <Snowflake className="w-6 h-6"/> },
          { name: 'Ovens & Grills', icon: <Flame className="w-6 h-6"/> },
          { name: 'Coffee Machines', icon: <Box className="w-6 h-6"/> }
      ]
    },
    {
      id: 'softwares',
      title: 'Softwares',
      icon: <Monitor className="w-8 h-8" />,
      textGradient: 'from-purple-400 via-fuchsia-500 to-pink-500',
      accent: 'text-purple-500',
      subCardBg: 'bg-gradient-to-br from-purple-600 to-fuchsia-600',
      buttonGradient: 'bg-gradient-to-r from-purple-600 to-fuchsia-600',
      glow: 'shadow-purple-500/30',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'POS Systems', icon: <CreditCard className="w-6 h-6"/> },
          { name: 'Inventory Mgmt', icon: <Box className="w-6 h-6"/> },
          { name: 'Accounting', icon: <Receipt className="w-6 h-6"/> },
          { name: 'HR Software', icon: <User className="w-6 h-6"/> }
      ]
    },
    {
      id: 'training',
      title: 'Training',
      icon: <ClipboardCheck className="w-8 h-8" />,
      textGradient: 'from-cyan-400 via-sky-500 to-blue-500',
      accent: 'text-cyan-500',
      subCardBg: 'bg-gradient-to-br from-cyan-600 to-sky-600',
      buttonGradient: 'bg-gradient-to-r from-cyan-600 to-sky-600',
      glow: 'shadow-cyan-500/30',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Food Safety', icon: <Shield className="w-6 h-6"/> },
          { name: 'Customer Service', icon: <UserPlus className="w-6 h-6"/> },
          { name: 'Barista', icon: <Box className="w-6 h-6"/> },
          { name: 'Management', icon: <Briefcase className="w-6 h-6"/> }
      ]
    }
  ]
};

const STATIC_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Salmon Fillet',
    mainCategory: 'Fresh Market',
    subCategory: 'Fish & Seafood',
    category: 'Fish & Seafood',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviews: 124,
    discount: '18% OFF',
    isTimeLimited: true,
    isExpress: true,
    images: [
      'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615141982880-19ed7e6656fa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sustainably sourced, sashimi-grade Norwegian salmon fillet.',
    offers: [
        { title: 'Bulk Savings', desc: 'Buy 5kg+ and get flat 15% Off' },
        { title: 'Freshness Guarantee', desc: '100% refund if not delivered fresh' }
    ]
  },
  {
    id: 101,
    name: 'Tiger Prawns (500g)',
    mainCategory: 'Fresh Market',
    subCategory: 'Fish & Seafood',
    category: 'Fish & Seafood',
    price: 35.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviews: 56,
    discount: null,
    isExpress: true,
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625943555419-56a2cb596640?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Large, juicy tiger prawns perfect for curries or grilling.',
    offers: [
        { title: 'Bundle Deal', desc: 'Add Lemon & Garlic for just AED 5' }
    ]
  },
  {
    id: 2,
    name: 'Organic Whole Chicken',
    mainCategory: 'Fresh Market',
    subCategory: 'Fresh Chicken',
    category: 'Fresh Chicken',
    price: 28.50,
    originalPrice: 35.00,
    rating: 4.6,
    reviews: 89,
    discount: '15% OFF',
    isExpress: false,
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Free-range, antibiotic-free whole organic chicken.',
    offers: [
        { title: 'Buy More, Save More', desc: 'Buy 3 packs, get 1 free' }
    ]
  },
  {
    id: 3,
    name: 'Farm Fresh Avocados',
    mainCategory: 'Fresh Market',
    subCategory: 'Fruits & Veg',
    category: 'Fruits & Veg',
    price: 18.00,
    originalPrice: 22.00,
    rating: 4.9,
    reviews: 210,
    discount: 'Deal',
    isExpress: true,
    isTimeLimited: true,
    images: [
      'https://images.unsplash.com/photo-1523049673856-356c3047010d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Creamy, ripe Hass avocados perfect for guacamole.',
    offers: []
  },
  {
    id: 4,
    name: 'Organic Raw Honey',
    mainCategory: 'Pantry',
    subCategory: 'Spices', 
    category: 'Pantry',
    price: 45.00,
    originalPrice: 60.00,
    rating: 5.0,
    reviews: 45,
    discount: '25% OFF',
    isExpress: false,
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Pure, raw organic honey sourced from wild flower meadows.',
    offers: []
  },
  {
    id: 5,
    name: 'Frozen Green Peas',
    mainCategory: 'Frozen Goods',
    subCategory: 'Vegetables',
    category: 'Vegetables',
    price: 8.50,
    originalPrice: 10.00,
    rating: 4.5,
    reviews: 65,
    discount: '10% OFF',
    isExpress: true,
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1593010959062-09945a0b7794?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sweet and tender garden peas, flash-frozen.',
    offers: []
  }
];

const GENERATED_PRODUCTS = Array(15).fill(null).map((_, i) => ({
    id: `gen-${i}`,
    name: `Bulk Item ${i + 1}`,
    mainCategory: i % 2 === 0 ? 'Pantry' : 'Fresh Market',
    subCategory: i % 2 === 0 ? 'Rice & Pulses' : 'Fruits & Veg',
    category: i % 2 === 0 ? 'Pantry' : 'Fresh Market',
    price: (Math.random() * 100 + 10).toFixed(2),
    originalPrice: (Math.random() * 150 + 20).toFixed(2),
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 500),
    discount: i % 3 === 0 ? 'Deal' : null,
    isExpress: i % 2 === 0,
    isTimeLimited: false,
    images: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bulk item description placeholder.',
    offers: []
}));

const MOCK_PRODUCTS = [...STATIC_PRODUCTS, ...GENERATED_PRODUCTS];

const MOCK_ORDERS = [
    { 
        id: '839202', 
        date: 'Oct 14, 2023', 
        status: 'In Transit', 
        total: 156.00, 
        items: [
            { name: 'Organic Whole Chicken', qty: 2, price: 28.50 }
        ],
        payment: 'Credit Limit',
        type: 'product',
        active: true
    },
    { 
        id: '839201', 
        date: 'Oct 12, 2023', 
        status: 'Delivered', 
        total: 135.00, 
        items: [
            { name: 'Premium Salmon Fillet', qty: 2, price: 45.00 },
            { name: 'Organic Raw Honey', qty: 1, price: 45.00 }
        ],
        payment: 'Credit Limit',
        type: 'product',
        active: false
    },
    { 
        id: '839190', 
        date: 'Oct 10, 2023', 
        status: 'Delivered', 
        total: 82.50, 
        items: [
            { name: 'Organic Whole Chicken', qty: 1, price: 28.50 },
            { name: 'Farm Fresh Avocados', qty: 3, price: 18.00 }
        ],
        payment: 'Wallet',
        type: 'product',
        active: false
    },
    { 
        id: '839150', 
        date: 'Sep 28, 2023', 
        status: 'Cancelled', 
        total: 35.00, 
        items: [
            { name: 'Tiger Prawns (500g)', qty: 1, price: 35.00 }
        ],
        payment: 'Credit Limit',
        type: 'product',
        active: false
    }
];

const MOCK_SERVICE_REQUESTS = [
    {
        id: 'SR-9921',
        service: 'HVAC Maintenance',
        subType: 'AC Repair',
        date: 'Oct 14, 2023',
        status: 'Pending Estimate',
        description: 'AC unit leaking water in main dining area.',
        type: 'service',
        active: true
    },
    {
        id: 'SR-8820',
        service: 'Pest Control',
        subType: 'General Prevention',
        date: 'Oct 01, 2023',
        status: 'Scheduled',
        appointmentDate: 'Oct 16, 2023 - 10:00 AM',
        description: 'Monthly routine check for kitchen area.',
        type: 'service',
        active: true
    },
    {
        id: 'SR-7712',
        service: 'Equipment Repair',
        subType: 'Oven Maintenance',
        date: 'Sep 20, 2023',
        status: 'Completed',
        amount: 450.00,
        description: 'Thermostat replacement and general servicing.',
        type: 'service',
        active: false
    },
    {
        id: 'SR-6651',
        service: 'Furniture',
        subType: 'Upholstery',
        date: 'Sep 10, 2023',
        status: 'Cancelled',
        description: 'Re-upholstery of 5 dining chairs.',
        type: 'service',
        active: false
    }
];

const MOCK_FINANCIALS = {
  invoices: [
    { id: 'INV-2023-884', date: '12 Oct 2023', dueDate: '27 Oct 2023', amount: 135.00, status: 'Pending', items: 2 },
    { id: 'INV-2023-832', date: '05 Oct 2023', dueDate: '20 Oct 2023', amount: 42.50, status: 'Paid', items: 1 },
    { id: 'INV-2023-791', date: '28 Sep 2023', dueDate: '13 Oct 2023', amount: 850.00, status: 'Overdue', items: 15 },
    { id: 'INV-2023-755', date: '15 Sep 2023', dueDate: '30 Sep 2023', amount: 120.00, status: 'Paid', items: 4 },
    { id: 'INV-2023-720', date: '01 Sep 2023', dueDate: '16 Sep 2023', amount: 345.00, status: 'Paid', items: 8 },
  ],
  receipts: [
    { id: 'REC-9928', date: '05 Oct 2023', amount: 42.50, method: 'Credit Limit Auto-Pay' },
    { id: 'REC-9921', date: '15 Sep 2023', amount: 120.00, method: 'Bank Transfer' },
    { id: 'REC-9880', date: '01 Sep 2023', amount: 345.00, method: 'Company Wallet' },
  ],
  statements: [
    { id: 'ST-OCT-23', month: 'October 2023', generated: '01 Nov 2023', balance: 177.50, status: 'Generated' },
    { id: 'ST-SEP-23', month: 'September 2023', generated: '01 Oct 2023', balance: 0.00, status: 'Closed' },
    { id: 'ST-AUG-23', month: 'August 2023', generated: '01 Sep 2023', balance: 0.00, status: 'Closed' },
  ]
};

const MOCK_TRANSACTIONS = [
    { id: 'TXN-9921', type: 'debit', amount: 135.00, date: '12 Oct 2023, 10:45 AM', description: 'Order #839201 Payment', status: 'Completed', method: 'Wallet' },
    { id: 'TXN-9920', type: 'topup', amount: 500.00, date: '10 Oct 2023, 09:00 AM', description: 'Wallet Top-up', status: 'Completed', method: 'Bank Transfer' },
    { id: 'TXN-9918', type: 'refund', amount: 45.00, date: '08 Oct 2023, 02:30 PM', description: 'Refund: Item Unavailable', status: 'Completed', method: 'System' },
    { id: 'TXN-9915', type: 'debit', amount: 82.50, date: '05 Oct 2023, 11:15 AM', description: 'Order #839190 Payment', status: 'Completed', method: 'Credit Limit' },
    { id: 'TXN-9912', type: 'debit', amount: 210.00, date: '03 Oct 2023, 01:20 PM', description: 'Order #839185 Payment', status: 'Completed', method: 'Wallet' },
    { id: 'TXN-9910', type: 'credit', amount: 1000.00, date: '01 Oct 2023, 10:00 AM', description: 'Monthly Credit Allocation', status: 'Completed', method: 'Admin' },
    { id: 'TXN-9905', type: 'debit', amount: 450.00, date: '20 Sep 2023, 04:15 PM', description: 'Service: #SR-7712 Repair', status: 'Completed', method: 'Wallet' },
    { id: 'TXN-9902', type: 'topup', amount: 1500.00, date: '15 Sep 2023, 09:30 AM', description: 'Wallet Top-up', status: 'Completed', method: 'Credit Card' },
    { id: 'TXN-9899', type: 'debit', amount: 65.00, date: '12 Sep 2023, 11:00 AM', description: 'Order #839110 Payment', status: 'Completed', method: 'COD' },
    { id: 'TXN-9895', type: 'refund', amount: 12.50, date: '10 Sep 2023, 10:00 AM', description: 'Refund: Damaged Item', status: 'Completed', method: 'System' },
];

// --- COMPONENTS ---

const SeasonalHeroSlider = ({ isDarkMode, onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SEASONAL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[220px] md:h-[300px] rounded-3xl overflow-hidden shadow-xl group mt-4">
        {SEASONAL_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={slide.bgImage} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start z-20">
              <span className={`px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase mb-2 border border-white/20`}>
                {slide.discount}
              </span>
              <h2 className={`text-3xl font-black text-white mb-1 leading-none drop-shadow-md`}>
                {slide.title}
              </h2>
              <p className={`text-sm font-medium text-white/90 mb-4 max-w-[200px]`}>
                {slide.subtitle}
              </p>
              <button 
                onClick={onShopNow} 
                className={`px-5 py-2 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-transform ${slide.buttonColor}`}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {SEASONAL_SLIDES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
          ))}
        </div>
    </div>
  );
};

const QuickServiceGrid = ({ services, onServiceClick, isDarkMode }) => {
    return (
        <div className="grid grid-cols-4 gap-3 my-6">
            {services.slice(0, 4).map((service, idx) => (
                <div 
                    key={idx} 
                    onClick={() => onServiceClick(service.title)}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-active:scale-95 ${service.subCardBg} text-white`}>
                        {React.cloneElement(service.icon, { className: "w-6 h-6" })}
                    </div>
                    <span className={`text-[10px] font-bold text-center leading-tight ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        {service.title}
                    </span>
                </div>
            ))}
        </div>
    );
};

const TimerOffers = ({ title, products, onProductClick, onAddToCart, isDarkMode }) => {
    const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 14400);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center gap-2">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-600 text-white text-xs font-mono font-bold animate-pulse">
                        <Timer className="w-3 h-3" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
                <span className="text-xs text-rose-500 font-bold">View All</span>
            </div>
            
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory px-1" style={{ scrollbarWidth: 'none' }}>
                {products.map((product) => (
                    <div 
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className={`min-w-[160px] w-[160px] snap-start rounded-2xl border p-3 flex flex-col cursor-pointer active:scale-95 transition-transform ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                                <Flame className="w-3 h-3 fill-current" />
                                {product.discount || 'HOT'}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onAddToCart(product.name, 1); }}
                                className="absolute bottom-2 right-2 w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-1 mt-auto">
                            <h4 className={`text-xs font-bold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-rose-500">AED {product.price}</span>
                                {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">AED {product.originalPrice}</span>}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2">
                                <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                            </div>
                            <span className="text-[9px] text-gray-500 block text-right">Selling fast!</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HorizontalProductList = ({ title, products, onProductClick, onAddToCart, isDarkMode }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                <span className="text-xs text-indigo-500 font-bold">See All</span>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory px-1" style={{ scrollbarWidth: 'none' }}>
                {products.map((product) => (
                    <div 
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className={`min-w-[160px] w-[160px] snap-start rounded-2xl border p-3 flex flex-col cursor-pointer active:scale-95 transition-transform ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            {product.discount && (
                                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                    {product.discount}
                                </span>
                            )}
                            <button 
                                onClick={(e) => { e.stopPropagation(); onAddToCart(product.name, 1, product.price); }}
                                className="absolute bottom-2 right-2 w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <h4 className={`text-xs font-bold line-clamp-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h4>
                        <div className="mt-auto">
                            <span className={`text-xs text-gray-500 block mb-1`}>{product.category}</span>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-sm font-bold text-indigo-500`}>AED {product.price}</span>
                                {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">{product.originalPrice}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BottomNav = ({ currentView, onChangeView, cartCount, isDarkMode, t }) => {
    const navItems = [
        { id: 'home', icon: <Home className="w-6 h-6" />, label: t('home') },
        { id: 'categories', icon: <Grid className="w-6 h-6" />, label: t('categories') },
        { id: 'products', icon: <Package2 className="w-6 h-6" />, label: t('products') },
        { id: 'orders', icon: <ClipboardCheck className="w-6 h-6" />, label: t('orders') },
        { id: 'profile', icon: <User className="w-6 h-6" />, label: t('profile') },
    ];

    return (
        <div className={`fixed bottom-0 left-0 w-full px-2 py-2 pb-5 z-50 border-t backdrop-blur-lg ${isDarkMode ? 'bg-[#0B1120]/90 border-white/5' : 'bg-white/95 border-gray-200'}`}>
            <div className="flex justify-around items-center">
                {navItems.map((item) => {
                    const isActive = currentView === item.id || (item.id === 'home' && currentView === 'shop');
                    return (
                        <button 
                            key={item.id}
                            onClick={() => onChangeView(item.id)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${isActive ? 'text-indigo-500' : isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}
                        >
                            <div className={`relative ${isActive ? 'transform -translate-y-1' : ''} transition-transform`}>
                                {item.icon}
                                {item.badge > 0 && (
                                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#0B1120]">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 scale-0'} transition-all absolute -bottom-1`}>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const OneFile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState({ main: null, sub: null }); 
  const [viewingCategory, setViewingCategory] = useState(null); 
  
  // Orders Page State
  const [orderTab, setOrderTab] = useState('products'); // 'products' | 'services'
  const [orderFilter, setOrderFilter] = useState('all'); // 'all' | 'active' | 'past' | 'cancelled'

  const [cart, setCart] = useState([
      { name: 'Premium Salmon Fillet', qty: 2, price: 45.00, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200' }, 
      { name: 'Organic Raw Honey', qty: 1, price: 45.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200' }
  ]);
  const [wishlist, setWishlist] = useState([
      MOCK_PRODUCTS[2], // Organic Whole Chicken
      MOCK_PRODUCTS[3], // Farm Fresh Avocados
      MOCK_PRODUCTS[5]  // Frozen Green Peas
  ].filter(Boolean)); 
  
  const [toast, setToast] = useState(null); 
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [location, setLocation] = useState("Main Restaurant, Business Bay");
  const [currentLang, setCurrentLang] = useState('en');
  
  // Product Page State
  const [isProductFilterOpen, setIsProductFilterOpen] = useState(false);
  const [productSort, setProductSort] = useState('featured');
  const [productFilters, setProductFilters] = useState({
      minPrice: '',
      maxPrice: '',
      categories: [],
      rating: 0
  });

  const [financialTab, setFinancialTab] = useState('invoices'); 
  const [selectedFinancialDoc, setSelectedFinancialDoc] = useState(null);
  const [financialData, setFinancialData] = useState(MOCK_FINANCIALS);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Transaction State
  const [transactionFilter, setTransactionFilter] = useState('all'); // all, in, out

  // Service Booking State
  const [selectedServiceBooking, setSelectedServiceBooking] = useState(null);
  const [serviceBookingStep, setServiceBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
      propertyType: 'restaurant',
      urgency: 'standard',
      serviceSpecificAnswer: '',
      description: '',
      datePreference: '',
      contactName: '',
      contactPhone: ''
  });
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  
  // Order Tracking State
  const [trackingState, setTrackingState] = useState(0);
  
  // B2B & Checkout State
  const [savedAddresses, setSavedAddresses] = useState([
      { id: 1, label: 'Main Restaurant', address: 'Shop 4, Marina Walk, Dubai' },
      { id: 2, label: 'Central Kitchen', address: 'Warehouse 12, Al Quoz 3, Dubai' }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({ label: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('credit_limit'); 
  const [orderNote, setOrderNote] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const [isWidgetListening, setIsWidgetListening] = useState(false);
  const [widgetTranscript, setWidgetTranscript] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
      if (currentView === 'order-tracking') {
          const interval = setInterval(() => {
              setTrackingState(prev => prev < 3 ? prev + 1 : prev);
          }, 4000); 
          return () => clearInterval(interval);
      }
  }, [currentView]);

  const t = useCallback((key) => {
    return TRANSLATIONS[currentLang][key] || key;
  }, [currentLang]);

  // --- ACTIONS ---
  const addToCart = (itemName, quantity, price) => {
    let finalPrice = price;
    let finalImage = '';
    
    if (!finalPrice || !finalImage) {
        const product = MOCK_PRODUCTS.find(p => p.name === itemName);
        finalPrice = product ? parseFloat(product.price) : 45.00;
        finalImage = product ? product.images[0] : 'https://placehold.co/200';
    }

    setCart(prev => {
        const existingIndex = prev.findIndex(i => i.name === itemName);
        if (existingIndex > -1) {
            const newCart = [...prev];
            newCart[existingIndex].qty += quantity;
            return newCart;
        }
        return [...prev, { name: itemName, qty: quantity, price: finalPrice, image: finalImage }];
    });
    showToast(`Added ${quantity}x ${itemName}`, 'success');
  };

  const updateCartQty = (itemName, delta) => {
      setCart(prev => prev.map(item => {
          if (item.name === itemName) {
              const newQty = Math.max(1, item.qty + delta);
              return { ...item, qty: newQty };
          }
          return item;
      }));
  };

  const removeFromCart = (itemName) => {
      setCart(prev => prev.filter(item => item.name !== itemName));
      showToast(`${itemName} removed`, 'info');
  };

  const showToast = (message, type = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
  };

  const processCommand = (command, source = 'header') => {
      const cleanCmd = command.toLowerCase().replace(/^(add|search|find)\s+(with\s+|for\s+)?/i, "$1 ").trim();

      if (cleanCmd.startsWith("add")) {
          const parts = cleanCmd.replace("add", "").trim().split(" ");
          let quantity = 1;
          let potentialItemName = parts.join(" ");

          const lastPart = parts[parts.length - 1];
          if (!isNaN(lastPart)) {
              quantity = parseInt(lastPart);
              potentialItemName = parts.slice(0, -1).join(" ");
          }

          const matchedItem = MOCK_PRODUCTS.find(item => 
              item.name.toLowerCase().includes(potentialItemName) || 
              item.name.toLowerCase().includes(potentialItemName.replace(/s$/, "")) 
          );

          if (matchedItem) {
              addToCart(matchedItem.name, quantity, matchedItem.price);
          } else {
              showToast(`Could not find item: ${potentialItemName}`, "info");
          }
      } 
      else if (cleanCmd.startsWith("search") || cleanCmd.startsWith("find")) {
          const query = cleanCmd.replace(/search|find/g, "").trim();
          showToast(`Searching for: ${query}`, "info");
      }
  };

  const startVoiceRecognition = (source = 'header') => {
    if (!('webkitSpeechRecognition' in window)) {
        showToast("Voice not supported in this browser", "error");
        if (source === 'header') setIsVoiceListening(true);
        else setIsWidgetListening(true);
        
        setTimeout(() => {
            const mockText = "add fresh chicken";
            if (source === 'header') setTranscript(mockText);
            else setWidgetTranscript(mockText);
            
            setTimeout(() => {
                processCommand(mockText, source);
                if (source === 'header') setIsVoiceListening(false);
                else setIsWidgetListening(false);
                if (source === 'widget') setWidgetTranscript("");
            }, 1000);
        }, 1500);
        return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => {
        if (source === 'header') setIsVoiceListening(true);
        else setIsWidgetListening(true);
    };

    recognition.onend = () => {
        if (source === 'header') setIsVoiceListening(false);
        else setIsWidgetListening(false);
    };

    recognition.onresult = (event) => {
        const transcriptText = event.results[0][0].transcript;
        if (source === 'header') setTranscript(transcriptText);
        else setWidgetTranscript(transcriptText);

        if (event.results[0].isFinal) {
            processCommand(transcriptText, source);
            if (source === 'widget') setTimeout(() => setWidgetTranscript(""), 2000);
        }
    };

    recognition.start();
  };

  const handleProductClick = (product) => {
      setSelectedProduct(product);
      setActiveImageIndex(0); 
      setCurrentView('product-detail');
      window.scrollTo(0,0);
  };

  const handleOrderClick = (order) => {
      setSelectedOrder(order);
      setCurrentView('order-detail');
      window.scrollTo(0,0);
  };

  const handleReorder = (order) => {
      order.items.forEach(item => {
          addToCart(item.name, item.qty, item.price);
      });
      setCurrentView('cart');
      showToast("Items added to cart", "success");
  };

  const handleServiceClick = (serviceTitle) => {
      const category = CATEGORIES_DATA.services.find(c => c.title === serviceTitle);
      if(category) {
          setViewingCategory(category);
          setCurrentView('subcategories'); 
      }
  };

  const handleSubCategoryClick = (subName) => {
      const isService = CATEGORIES_DATA.services.some(cat => cat.title === viewingCategory?.title);
      if (isService) {
          handleServiceBooking(viewingCategory.title, subName);
      } else {
          setActiveFilter({ main: viewingCategory?.title, sub: subName });
          setCurrentView('product-list');
      }
  };

  const handleServiceBooking = (mainCategory, serviceName) => {
    const serviceCat = CATEGORIES_DATA.services.find(c => c.title === mainCategory);
    const subCat = serviceCat?.subcategories.find(s => s.name === serviceName);
    
    setSelectedServiceBooking({
        mainCategory,
        subCategory: serviceName,
        icon: subCat?.icon || serviceCat?.icon,
        accent: serviceCat?.accent || 'text-indigo-500'
    });
    setServiceBookingStep(1);
    setIsBookingSuccess(false);
    setBookingDetails({
        propertyType: 'restaurant',
        urgency: 'standard',
        serviceSpecificAnswer: '',
        description: '',
        datePreference: '',
        contactName: '',
        contactPhone: ''
    });
    setCurrentView('service-booking');
  };

  const handleBookingInputChange = (e) => {
      const { name, value } = e.target;
      setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleEstimateRequest = () => {
      setIsBookingSuccess(true);
      showToast("Request sent! We'll contact you shortly.", "success");
  };

  const handlePlaceOrder = () => {
      setTrackingState(0);
      setCart([]);
      setCurrentView('order-tracking');
      showToast("Order Placed Successfully!", "success");
  };

  const toggleTheme = () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const removeFromWishlist = (productId) => {
      setWishlist(prev => prev.filter(item => item.id !== productId));
      showToast("Removed from wishlist", "info");
  };

  const moveToCart = (product) => {
      addToCart(product.name, 1, product.price);
      removeFromWishlist(product.id);
  };

  const handleFinancialDocClick = (doc) => {
      setSelectedFinancialDoc({ ...doc, type: financialTab });
      setCurrentView('financial-detail');
      window.scrollTo(0,0);
  };

  const toggleSelectionMode = () => {
      setIsSelectionMode(!isSelectionMode);
      setSelectedInvoiceIds([]);
  };

  const toggleInvoiceSelection = (id) => {
      setSelectedInvoiceIds(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
  };

  const handlePaySelectedInvoices = () => {
      if (selectedInvoiceIds.length === 0) return;
      
      showToast(`Processing payment for ${selectedInvoiceIds.length} invoices...`, "info");
      
      setTimeout(() => {
          setFinancialData(prev => ({
              ...prev,
              invoices: prev.invoices.map(inv => 
                  selectedInvoiceIds.includes(inv.id) ? { ...inv, status: 'Paid' } : inv
              )
          }));
          setSelectedInvoiceIds([]);
          setIsSelectionMode(false);
          showToast("Invoices paid successfully", "success");
      }, 1500);
  };

  const handlePayInvoice = () => {
      if (!selectedFinancialDoc) return;
      
      showToast("Processing payment...", "info");
      
      setTimeout(() => {
          // Update the main data state
          setFinancialData(prev => ({
              ...prev,
              invoices: prev.invoices.map(inv => 
                  inv.id === selectedFinancialDoc.id ? { ...inv, status: 'Paid' } : inv
              )
          }));

          // Update the currently viewed document
          setSelectedFinancialDoc(prev => ({ ...prev, status: 'Paid' }));
          
          showToast(`Invoice ${selectedFinancialDoc.id} paid successfully`, "success");
      }, 1500);
  };

  const handleAddNewAddress = () => {
      if (!newAddressForm.label || !newAddressForm.address) {
          showToast("Please fill all fields", "error");
          return;
      }
      const newId = savedAddresses.length + 1;
      const newAddr = { id: newId, ...newAddressForm };
      setSavedAddresses([...savedAddresses, newAddr]);
      setSelectedAddressId(newId);
      setIsAddingNewAddress(false);
      setIsAddressModalOpen(false);
      setNewAddressForm({ label: '', address: '' });
      showToast("New address added", "success");
  };

  const deleteAddress = (id) => {
      if (savedAddresses.length <= 1) {
          showToast("Cannot delete the last address", "error");
          return;
      }
      setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
      if (selectedAddressId === id) {
          setSelectedAddressId(savedAddresses[0].id);
      }
      showToast("Address removed", "success");
  }

  const appBgClass = isDarkMode ? 'bg-[#0B1120] text-slate-200' : 'bg-gray-50 text-gray-900';
  const cardClass = isDarkMode ? 'bg-[#151C2C] border-white/5' : 'bg-white border-gray-100 shadow-sm';
  const inputBgClass = isDarkMode ? 'bg-[#1E293B] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';

  const shouldShowBottomNav = !['product-detail', 'service-booking', 'checkout', 'order-tracking', 'address-book', 'financial-docs', 'financial-detail', 'cart', 'transactions'].includes(currentView);

  const renderHome = () => (
      <div className="pb-24 animate-fade-in px-4">
          <SeasonalHeroSlider isDarkMode={isDarkMode} onShopNow={() => setCurrentView('categories')} />
          
          <div className="mt-6">
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('quickServices')}</h3>
              <QuickServiceGrid services={CATEGORIES_DATA.services} onServiceClick={handleServiceClick} isDarkMode={isDarkMode} />
          </div>

          <TimerOffers 
              title="Flash Sales" 
              products={MOCK_PRODUCTS.filter(p => p.isTimeLimited || p.discount)} 
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
              isDarkMode={isDarkMode}
          />

          <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('products')} Categories</h3>
                  <button onClick={() => setCurrentView('categories')} className="text-xs text-indigo-500 font-bold">{t('viewAll')}</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES_DATA.products.map((cat, i) => (
                      <div 
                        key={i}
                        onClick={() => { setViewingCategory(cat); setCurrentView('subcategories'); }}
                        className={`p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden cursor-pointer ${cat.subCardBg}`}
                      >
                          <span className="relative z-10 font-bold text-white text-lg">{cat.title}</span>
                          <div className="absolute right-[-10px] bottom-[-10px] opacity-30 transform rotate-12 scale-150 text-white">
                              {cat.icon}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('services')} Categories</h3>
                  <button onClick={() => setCurrentView('services')} className="text-xs text-indigo-500 font-bold">{t('viewAll')}</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES_DATA.services.map((cat, i) => (
                      <div 
                        key={i}
                        onClick={() => handleServiceClick(cat.title)}
                        className={`p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden cursor-pointer ${cat.subCardBg}`}
                      >
                          <span className="relative z-10 font-bold text-white text-lg">{cat.title}</span>
                          <div className="absolute right-[-10px] bottom-[-10px] opacity-30 transform rotate-12 scale-150 text-white">
                              {cat.icon}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <HorizontalProductList 
              title={t('dailyDeals')} 
              products={[...MOCK_PRODUCTS].reverse()} 
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
              isDarkMode={isDarkMode}
          />
      </div>
  );

  const renderOrders = () => {
    // Filter Data Logic
    const filterData = (data) => {
        if (orderFilter === 'all') return data;
        if (orderFilter === 'active') return data.filter(item => 
            ['In Transit', 'Preparing', 'Placed', 'Pending Estimate', 'Scheduled'].includes(item.status) || item.active
        );
        if (orderFilter === 'past') return data.filter(item => ['Delivered', 'Completed'].includes(item.status));
        if (orderFilter === 'cancelled') return data.filter(item => item.status === 'Cancelled');
        return data;
    };

    const displayData = orderTab === 'products' ? filterData(MOCK_ORDERS) : filterData(MOCK_SERVICE_REQUESTS);

    return (
      <div className="pb-24 px-4 pt-4 animate-fade-in">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Activity</h2>

          {/* Type Toggle Tabs */}
          <div className={`p-1 rounded-2xl mb-6 flex ${isDarkMode ? 'bg-[#151C2C] border border-white/5' : 'bg-gray-100'}`}>
              <button 
                  onClick={() => setOrderTab('products')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${orderTab === 'products' ? (isDarkMode ? 'bg-[#1E293B] text-white shadow-lg' : 'bg-white text-indigo-600 shadow-sm') : 'text-gray-500 hover:text-gray-400'}`}
              >
                  <Package className="w-4 h-4" /> Product Orders
              </button>
              <button 
                  onClick={() => setOrderTab('services')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${orderTab === 'services' ? (isDarkMode ? 'bg-[#1E293B] text-white shadow-lg' : 'bg-white text-indigo-600 shadow-sm') : 'text-gray-500 hover:text-gray-400'}`}
              >
                  <Wrench className="w-4 h-4" /> Estimate Requests
              </button>
          </div>

          {/* Horizontal Filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-2">
              {[
                  { id: 'all', label: 'All' },
                  { id: 'active', label: 'Active' },
                  { id: 'past', label: 'Past' },
                  { id: 'cancelled', label: 'Cancelled' }
              ].map((filter) => (
                  <button
                      key={filter.id}
                      onClick={() => setOrderFilter(filter.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                          orderFilter === filter.id 
                              ? 'bg-indigo-600 border-indigo-600 text-white' 
                              : isDarkMode ? 'border-white/10 text-slate-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                      {filter.label}
                  </button>
              ))}
          </div>

          {/* Content List */}
          <div className="space-y-4">
              {displayData.length === 0 ? (
                  <div className="text-center py-12 opacity-50">
                      {orderTab === 'products' ? <Package className="w-16 h-16 mx-auto mb-4" /> : <ClipboardCheck className="w-16 h-16 mx-auto mb-4" />}
                      <p>No {orderTab} found.</p>
                  </div>
              ) : (
                  displayData.map((item) => (
                      <div 
                          key={item.id} 
                          onClick={() => {
                              if (orderTab === 'products') {
                                  if (['In Transit', 'Preparing', 'Placed'].includes(item.status)) {
                                      setTrackingState(1); 
                                      setCurrentView('order-tracking');
                                  } else {
                                      handleOrderClick(item);
                                  }
                              } else {
                                  // For Service Requests - could expand to a detail view
                                  showToast(`Request #${item.id}: ${item.status}`, 'info');
                              }
                          }}
                          className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform ${cardClass} relative overflow-hidden`}
                      >
                          {/* Status Color Strip */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                              ['Delivered', 'Completed'].includes(item.status) ? 'bg-green-500' :
                              item.status === 'Cancelled' ? 'bg-rose-500' : 
                              'bg-indigo-500'
                          }`}></div>

                          <div className="flex justify-between items-start pl-3">
                              <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                      item.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500' : 
                                      ['Delivered', 'Completed'].includes(item.status) ? 'bg-green-500/10 text-green-500' :
                                      'bg-indigo-500/10 text-indigo-500'
                                  }`}>
                                      {orderTab === 'products' ? <Package className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                                  </div>
                                  <div>
                                      <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                          {orderTab === 'products' ? `Order #${item.id}` : item.subType}
                                      </h4>
                                      <p className="text-xs text-gray-500">
                                          {orderTab === 'products' ? item.date : item.service}
                                      </p>
                                  </div>
                              </div>
                              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                                  ['Delivered', 'Completed'].includes(item.status) ? 'border-green-500/20 text-green-500 bg-green-500/10' :
                                  item.status === 'Cancelled' ? 'border-rose-500/20 text-rose-500 bg-rose-500/10' :
                                  'border-indigo-500/20 text-indigo-500 bg-indigo-500/10'
                              }`}>
                                  {item.status}
                              </span>
                          </div>

                          <div className="pl-3 border-t border-dashed border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
                               {orderTab === 'products' ? (
                                   <>
                                      <div className="flex -space-x-2">
                                          {[...Array(Math.min(3, item.items.length))].map((_, i) => (
                                              <div key={i} className={`w-6 h-6 rounded-full border-2 ${isDarkMode ? 'border-[#151C2C] bg-gray-700' : 'border-white bg-gray-200'}`}></div>
                                          ))}
                                          {item.items.length > 3 && (
                                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${isDarkMode ? 'border-[#151C2C] bg-gray-800 text-white' : 'border-white bg-gray-300 text-gray-600'}`}>
                                                  +{item.items.length - 3}
                                              </div>
                                          )}
                                      </div>
                                      <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED {item.total.toFixed(2)}</span>
                                   </>
                               ) : (
                                   <>
                                      <span className="text-xs text-gray-500 line-clamp-1 flex-1 mr-2">{item.description}</span>
                                      {item.amount ? (
                                           <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED {item.amount.toFixed(2)}</span>
                                      ) : (
                                           <span className="text-[10px] text-gray-400 italic">Estimate Requested</span>
                                      )}
                                   </>
                               )}
                          </div>
                      </div>
                  ))
              )}
          </div>
      </div>
    );
  };

  const renderCheckout = () => {
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const deliveryFee = 15.00;
      const total = subtotal + deliveryFee;
      const currentAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

      return (
          <div className="pb-32 animate-fade-in relative z-50">
               <div className="sticky top-0 z-40 p-4 pt-6 flex justify-between items-center backdrop-blur-md bg-opacity-90">
                  <button 
                    onClick={() => setCurrentView('cart')} 
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                  >
                      <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Checkout</h2>
                  <div className="w-9" /> 
              </div>

              <div className="px-4 space-y-6">
                  {/* Delivery Address - B2B Logic */}
                  <div className={`p-4 rounded-2xl border ${cardClass}`}>
                      <div className="flex justify-between items-center mb-3">
                          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delivery Address</h3>
                          <button 
                              onClick={() => { setIsAddressModalOpen(true); setIsAddingNewAddress(false); }}
                              className="text-xs text-indigo-500 font-bold px-3 py-1 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20"
                          >
                              Change
                          </button>
                      </div>
                      <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                              <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                              <span className={`block text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                                  {currentAddress?.label || 'Select Address'}
                              </span>
                              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                                  {currentAddress?.address || 'No address selected'}
                              </p>
                          </div>
                      </div>
                      <div className="mt-4 h-24 rounded-xl overflow-hidden relative">
                           {/* Placeholder for Map */}
                           <div className={`w-full h-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} flex items-center justify-center`}>
                               <span className="text-xs text-gray-500">Map Preview - {currentAddress?.label}</span>
                           </div>
                      </div>
                  </div>

                  {/* Delivery Time */}
                  <div className={`p-4 rounded-2xl border ${cardClass}`}>
                      <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delivery Time</h3>
                      <div className="flex gap-3">
                          <div className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${isDarkMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-indigo-600 bg-indigo-50'}`}>
                              <Zap className="w-5 h-5 text-indigo-500" />
                              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Express</span>
                              <span className="text-[10px] text-gray-500">45 mins</span>
                          </div>
                          <div className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <Clock className="w-5 h-5 text-gray-400" />
                              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Scheduled</span>
                              <span className="text-[10px] text-gray-500">Choose Time</span>
                          </div>
                      </div>
                  </div>

                  {/* Payment Method - B2B Options */}
                  <div className={`p-4 rounded-2xl border ${cardClass}`}>
                      <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Payment Method</h3>
                      <div className="space-y-3">
                          
                          {/* Credit Limit Pay */}
                          <div 
                              onClick={() => setPaymentMethod('credit_limit')}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'credit_limit' ? (isDarkMode ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-600 bg-emerald-50') : (isDarkMode ? 'border-white/10' : 'border-gray-200')}`}
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                     <Briefcase className="w-4 h-4 text-emerald-500" />
                                  </div>
                                  <div>
                                      <span className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Credit Limit Pay</span>
                                      <span className="text-[10px] text-emerald-500 font-bold">Available: AED 8,500</span>
                                  </div>
                              </div>
                              {paymentMethod === 'credit_limit' && <CheckCircle className="w-5 h-5 text-emerald-500 fill-current" />}
                          </div>

                          {/* Company Wallet */}
                          <div 
                              onClick={() => setPaymentMethod('wallet')}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'wallet' ? (isDarkMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-indigo-600 bg-indigo-50') : (isDarkMode ? 'border-white/10' : 'border-gray-200')}`}
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                     <Wallet className="w-4 h-4 text-indigo-500" />
                                  </div>
                                  <div>
                                      <span className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Company Wallet</span>
                                      <span className="text-[10px] text-gray-500">Balance: AED 450.00</span>
                                  </div>
                              </div>
                              {paymentMethod === 'wallet' && <CheckCircle className="w-5 h-5 text-indigo-500 fill-current" />}
                          </div>

                          {/* Cash on Delivery */}
                          <div 
                              onClick={() => setPaymentMethod('cod')}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? (isDarkMode ? 'border-amber-500 bg-amber-500/10' : 'border-amber-600 bg-amber-50') : (isDarkMode ? 'border-white/10' : 'border-gray-200')}`}
                          >
                              <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                     <Banknote className="w-4 h-4 text-amber-500" />
                                  </div>
                                  <div>
                                      <span className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cash on Delivery</span>
                                      <span className="text-[10px] text-gray-500">Pay when received</span>
                                  </div>
                              </div>
                              {paymentMethod === 'cod' && <CheckCircle className="w-5 h-5 text-amber-500 fill-current" />}
                          </div>
                      </div>
                  </div>

                  {/* Order Summary */}
                  <div className={`p-4 rounded-2xl border ${cardClass}`}>
                      <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Summary</h3>
                      <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                              <span className="text-gray-500">Subtotal</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>AED {subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-gray-500">Delivery Fee</span>
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>AED {deliveryFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                              <span className="font-bold text-rose-500">AED {total.toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Sticky Pay Button */}
              <div className={`fixed bottom-0 w-full p-4 pb-8 border-t backdrop-blur-xl z-[60] ${isDarkMode ? 'bg-[#0B1120]/90 border-white/10' : 'bg-white/90 border-gray-200'}`}>
                  <button 
                      onClick={handlePlaceOrder}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                      Place Order — AED {total.toFixed(2)}
                  </button>
              </div>

              {/* Address Selection Modal */}
              {isAddressModalOpen && (
                  <div className="fixed inset-0 z-[70] flex items-end justify-center">
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)}></div>
                      <div className={`relative w-full rounded-t-[2rem] p-6 max-h-[85vh] overflow-y-auto animate-slide-in-right ${isDarkMode ? 'bg-[#151C2C]' : 'bg-white'}`}>
                          <div className="flex justify-between items-center mb-6">
                              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {isAddingNewAddress ? 'Add New Address' : 'Select Address'}
                              </h3>
                              <button onClick={() => setIsAddressModalOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                  <X className="w-5 h-5" />
                              </button>
                          </div>

                          {!isAddingNewAddress ? (
                              <div className="space-y-4">
                                  {savedAddresses.map((addr) => (
                                      <div 
                                          key={addr.id}
                                          onClick={() => { setSelectedAddressId(addr.id); setIsAddressModalOpen(false); }}
                                          className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer ${selectedAddressId === addr.id ? (isDarkMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-indigo-600 bg-indigo-50') : (isDarkMode ? 'border-white/10' : 'border-gray-200')}`}
                                      >
                                          <div className={`p-2 rounded-full ${selectedAddressId === addr.id ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                              <Building2 className="w-5 h-5" />
                                          </div>
                                          <div className="flex-1">
                                              <span className={`block font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{addr.label}</span>
                                              <span className="text-xs text-gray-500">{addr.address}</span>
                                          </div>
                                          {selectedAddressId === addr.id && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                                      </div>
                                  ))}
                                  
                                  <button 
                                      onClick={() => setIsAddingNewAddress(true)}
                                      className={`w-full py-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 font-bold ${isDarkMode ? 'border-white/20 text-slate-300 hover:bg-white/5' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                  >
                                      <PlusCircle className="w-5 h-5" /> Add New Address
                                  </button>
                              </div>
                          ) : (
                              <div className="space-y-4">
                                  <div>
                                      <label className={`block text-xs font-bold mb-2 uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location Label (e.g., Branch 2)</label>
                                      <input 
                                          type="text" 
                                          value={newAddressForm.label}
                                          onChange={(e) => setNewAddressForm({...newAddressForm, label: e.target.value})}
                                          className={`w-full p-4 rounded-xl border outline-none ${inputBgClass}`}
                                          placeholder="Enter label"
                                      />
                                  </div>
                                  <div>
                                      <label className={`block text-xs font-bold mb-2 uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full Address</label>
                                      <textarea 
                                          rows="3"
                                          value={newAddressForm.address}
                                          onChange={(e) => setNewAddressForm({...newAddressForm, address: e.target.value})}
                                          className={`w-full p-4 rounded-xl border outline-none ${inputBgClass}`}
                                          placeholder="Enter street, building, area..."
                                      />
                                  </div>
                                  <div className="pt-4 flex gap-3">
                                      <button 
                                          onClick={() => setIsAddingNewAddress(false)}
                                          className={`flex-1 py-3 rounded-xl font-bold border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}
                                      >
                                          Cancel
                                      </button>
                                      <button 
                                          onClick={handleAddNewAddress}
                                          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                                      >
                                          Save Address
                                      </button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              )}
          </div>
      );
  };

  const renderAddressBook = () => {
      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in min-h-screen relative z-50">
               {/* Header */}
               <div className="flex items-center gap-2 mb-6">
                   <button 
                       onClick={() => setCurrentView('profile')}
                       className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                   >
                       <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Address Book</h2>
               </div>

               {isAddingNewAddress ? (
                   <div className={`p-6 rounded-2xl border animate-fade-in ${cardClass}`}>
                       <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Location</h3>
                       <div className="space-y-4">
                            <div>
                                <label className={`block text-xs font-bold mb-2 uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location Label</label>
                                <input 
                                    type="text" 
                                    value={newAddressForm.label}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, label: e.target.value})}
                                    className={`w-full p-4 rounded-xl border outline-none ${inputBgClass}`}
                                    placeholder="e.g. Downtown Branch"
                                />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold mb-2 uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address Details</label>
                                <textarea 
                                    rows="3"
                                    value={newAddressForm.address}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, address: e.target.value})}
                                    className={`w-full p-4 rounded-xl border outline-none ${inputBgClass}`}
                                    placeholder="Street name, building no, etc."
                                />
                            </div>
                            <div className="h-40 rounded-xl overflow-hidden relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-dashed border-gray-400 dark:border-gray-600">
                                <div className="text-center">
                                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    <span className="text-xs text-gray-500">Map Integration Placeholder</span>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button 
                                    onClick={() => { setIsAddingNewAddress(false); setNewAddressForm({label: '', address: ''}); }}
                                    className={`flex-1 py-3 rounded-xl font-bold border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        handleAddNewAddress();
                                        setIsAddingNewAddress(false);
                                    }}
                                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                                >
                                    Save Location
                                </button>
                            </div>
                       </div>
                   </div>
               ) : (
                   <div className="space-y-4">
                       {savedAddresses.map((addr) => (
                           <div key={addr.id} className={`p-4 rounded-2xl border flex items-start gap-4 ${cardClass}`}>
                               <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                   <Building2 className="w-6 h-6" />
                               </div>
                               <div className="flex-1">
                                   <div className="flex justify-between items-start">
                                       <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{addr.label}</h4>
                                       <button 
                                           onClick={() => deleteAddress(addr.id)}
                                           className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                                       >
                                           <Trash2 className="w-4 h-4" />
                                       </button>
                                   </div>
                                   <p className={`text-sm mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{addr.address}</p>
                                   {selectedAddressId === addr.id && (
                                       <span className="inline-block mt-3 text-[10px] font-bold px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                                           Default for Delivery
                                       </span>
                                   )}
                               </div>
                           </div>
                       ))}
                       
                       <button 
                           onClick={() => setIsAddingNewAddress(true)}
                           className={`w-full py-5 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 font-bold transition-all ${isDarkMode ? 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-white/30' : 'border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400'}`}
                       >
                           <PlusCircle className="w-5 h-5" /> Add New Location
                       </button>
                   </div>
               )}
          </div>
      );
  };

  const renderWishlist = () => {
      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('wishlist')} ({wishlist.length})
              </h2>

              {wishlist.length === 0 ? (
                  <div className="text-center py-20 opacity-50">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Your wishlist is empty.</p>
                      <button 
                          onClick={() => setCurrentView('home')} 
                          className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                      >
                          Explore Products
                      </button>
                  </div>
              ) : (
                  <div className="grid grid-cols-2 gap-4">
                      {wishlist.map((product) => (
                          <div 
                              key={product.id}
                              onClick={() => handleProductClick(product)}
                              className={`group relative p-3 rounded-2xl border flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform ${cardClass}`}
                          >
                              {/* Image Container */}
                              <div className="h-40 rounded-xl bg-gray-100 overflow-hidden relative">
                                  <img 
                                      src={product.images[0]} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                  />
                                  
                                  {/* Remove Button */}
                                  <button 
                                      onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id); }}
                                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"
                                  >
                                      <X className="w-4 h-4" />
                                  </button>

                                  {/* Discount Tag */}
                                  {product.discount && (
                                      <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-lg">
                                          {product.discount}
                                      </span>
                                  )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 flex flex-col">
                                  <h4 className={`text-sm font-bold line-clamp-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {product.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                                  
                                  <div className="mt-auto flex items-center justify-between">
                                      <span className="font-bold text-indigo-500">AED {product.price}</span>
                                      <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                                          <Star className="w-3 h-3 fill-current" /> {product.rating}
                                      </div>
                                  </div>

                                  <button 
                                      onClick={(e) => { e.stopPropagation(); moveToCart(product); }}
                                      className={`mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-900'}`}
                                  >
                                      <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      );
  };

  const renderFinancialDocs = () => {
      const tabs = [
          { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4"/> },
          { id: 'receipts', label: 'Receipts', icon: <Receipt className="w-4 h-4"/> },
          { id: 'statements', label: 'Statements', icon: <FileClock className="w-4 h-4"/> }
      ];

      const getData = () => {
          switch(financialTab) {
              case 'invoices': return financialData.invoices;
              case 'receipts': return financialData.receipts;
              case 'statements': return financialData.statements;
              default: return [];
          }
      };

      const selectedTotal = financialData.invoices
        .filter(inv => selectedInvoiceIds.includes(inv.id))
        .reduce((sum, inv) => sum + inv.amount, 0);

      return (
          <div className="pb-24 px-4 pt-4 animate-fade-in relative z-50">
              <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                       <button 
                           onClick={() => setCurrentView('profile')}
                           className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                       >
                           <ArrowLeft className="w-5 h-5" />
                       </button>
                       <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Financials</h2>
                   </div>
                   {financialTab === 'invoices' && (
                       <button 
                           onClick={toggleSelectionMode}
                           className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${isSelectionMode ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'}`}
                       >
                           {isSelectionMode ? 'Cancel' : 'Select'}
                       </button>
                   )}
              </div>

              {/* Tabs */}
              <div className={`flex p-1 rounded-xl mb-6 ${isDarkMode ? 'bg-[#151C2C] border border-white/5' : 'bg-gray-100'}`}>
                  {tabs.map(tab => (
                      <button
                          key={tab.id}
                          onClick={() => {
                              setFinancialTab(tab.id);
                              if(isSelectionMode) toggleSelectionMode();
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${financialTab === tab.id ? (isDarkMode ? 'bg-[#1E293B] text-white shadow-md' : 'bg-white text-indigo-600 shadow-sm') : 'text-gray-500'}`}
                      >
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                  ))}
              </div>

              {/* List */}
              <div className={`space-y-4 ${isSelectionMode ? 'mb-24' : ''}`}>
                  {getData().map((item, i) => {
                      const isSelected = selectedInvoiceIds.includes(item.id);
                      const isPayable = financialTab === 'invoices' && item.status !== 'Paid';

                      return (
                      <div 
                          key={i}
                          onClick={() => {
                              if (isSelectionMode && isPayable) {
                                  toggleInvoiceSelection(item.id);
                              } else if (!isSelectionMode) {
                                  handleFinancialDocClick(item);
                              }
                          }}
                          className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform ${cardClass} ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-500/5' : ''}`}
                      >
                          <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                  {isSelectionMode && financialTab === 'invoices' ? (
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-500 text-white' : isPayable ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') : 'opacity-30'}`}>
                                           {isSelected ? <CheckCircle className="w-6 h-6" /> : isPayable ? <div className="w-5 h-5 rounded-md border-2 border-gray-400 opacity-50"></div> : <X className="w-5 h-5"/>}
                                      </div>
                                  ) : (
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                          financialTab === 'invoices' ? (item.status === 'Paid' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' : item.status === 'Overdue' ? 'bg-rose-100 text-rose-500 dark:bg-rose-500/10' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10') :
                                          financialTab === 'receipts' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300'
                                      }`}>
                                          {financialTab === 'invoices' ? <FileText className="w-5 h-5"/> : financialTab === 'receipts' ? <CheckCircle className="w-5 h-5"/> : <FileClock className="w-5 h-5"/>}
                                      </div>
                                  )}

                                  <div className={isSelectionMode && !isPayable ? 'opacity-50' : ''}>
                                      <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                          {item.id || item.month}
                                      </h4>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                          item.status === 'Paid' ? 'bg-emerald-500 text-white' :
                                          item.status === 'Overdue' ? 'bg-rose-500 text-white' :
                                          item.status === 'Pending' ? 'bg-amber-500 text-white' :
                                          'bg-gray-500 text-white'
                                      }`}>
                                          {item.status || 'Completed'}
                                      </span>
                                  </div>
                              </div>
                              <div className={`text-right ${isSelectionMode && !isPayable ? 'opacity-50' : ''}`}>
                                  <span className={`block font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                      AED {item.amount?.toFixed(2) || item.balance?.toFixed(2)}
                                  </span>
                                  <span className="text-[10px] text-gray-500">{item.date || item.generated}</span>
                              </div>
                          </div>
                          
                          <div className={`w-full h-px ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}></div>
                          
                          <div className={`flex justify-between items-center ${isSelectionMode && !isPayable ? 'opacity-50' : ''}`}>
                              <span className="text-xs text-gray-500">
                                  {financialTab === 'invoices' ? `Due: ${item.dueDate} • ${item.items} Items` : 
                                   financialTab === 'receipts' ? `Paid via ${item.method}` : 
                                   'Monthly Statement'}
                              </span>
                              {!isSelectionMode && (
                                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-500">
                                      View <ChevronRight className="w-3 h-3" />
                                  </div>
                              )}
                          </div>
                      </div>
                  )})}
              </div>

              {/* Selection Action Bar */}
              {isSelectionMode && (
                  <div className={`fixed bottom-0 left-0 w-full p-4 pb-8 border-t backdrop-blur-xl z-[60] animate-slide-in-right ${isDarkMode ? 'bg-[#0B1120]/90 border-white/10' : 'bg-white/90 border-gray-200'}`}>
                      <button 
                          onClick={handlePaySelectedInvoices}
                          disabled={selectedInvoiceIds.length === 0}
                          className={`w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${selectedInvoiceIds.length > 0 ? 'bg-indigo-600 text-white active:scale-95' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                      >
                          <span>{selectedInvoiceIds.length > 0 ? `Pay ${selectedInvoiceIds.length} Selected` : 'Select Invoices to Pay'}</span>
                          {selectedInvoiceIds.length > 0 && (
                              <span className="bg-white/20 px-2 py-0.5 rounded text-sm">AED {selectedTotal.toFixed(2)}</span>
                          )}
                      </button>
                  </div>
              )}
          </div>
      );
  };

  const renderFinancialDetail = () => {
      if (!selectedFinancialDoc) return null;
      const isInvoice = selectedFinancialDoc.type === 'invoices';
      
      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in relative z-50">
               <div className="flex items-center gap-2 mb-6">
                   <button 
                       onClick={() => setCurrentView('financial-docs')}
                       className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                   >
                       <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                       {isInvoice ? 'Invoice Details' : selectedFinancialDoc.type === 'receipts' ? 'Receipt Details' : 'Statement'}
                   </h2>
               </div>

               {/* PDF-like View */}
               <div className={`p-6 rounded-2xl border mb-6 relative overflow-hidden ${isDarkMode ? 'bg-white text-gray-900' : 'bg-white text-gray-900'}`}>
                   {/* Watermark-ish effect */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                       <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200" alt="" className="w-64 h-64 object-contain grayscale" />
                   </div>

                   <div className="flex justify-between items-start mb-8 relative z-10">
                       <div className="flex items-center gap-2">
                           <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
                           <div>
                               <h3 className="font-bold text-lg leading-none">SkyMarket</h3>
                               <p className="text-[10px] text-gray-500">Wholesale & Distribution</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <h4 className="font-bold text-gray-400 uppercase tracking-widest text-sm">{isInvoice ? 'INVOICE' : 'DOCUMENT'}</h4>
                           <p className="font-bold">{selectedFinancialDoc.id}</p>
                       </div>
                   </div>

                   <div className="flex justify-between mb-8 text-xs relative z-10">
                       <div>
                           <p className="text-gray-500 mb-1">Bill To:</p>
                           <p className="font-bold">The Golden Fork</p>
                           <p className="text-gray-500">Business Bay, Dubai</p>
                           <p className="text-gray-500">TRN: 1002938472193</p>
                       </div>
                       <div className="text-right">
                           <p className="text-gray-500 mb-1">Details:</p>
                           <p><span className="text-gray-500">Date:</span> {selectedFinancialDoc.date || selectedFinancialDoc.generated}</p>
                           {isInvoice && <p><span className="text-gray-500">Due:</span> {selectedFinancialDoc.dueDate}</p>}
                           <p><span className="text-gray-500">Status:</span> <span className={selectedFinancialDoc.status === 'Paid' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{selectedFinancialDoc.status}</span></p>
                       </div>
                   </div>

                   {/* Mock Line Items */}
                   <div className="mb-8 relative z-10">
                       <table className="w-full text-xs">
                           <thead>
                               <tr className="border-b border-gray-200">
                                   <th className="text-left py-2 font-bold text-gray-500">Item</th>
                                   <th className="text-center py-2 font-bold text-gray-500">Qty</th>
                                   <th className="text-right py-2 font-bold text-gray-500">Total</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr className="border-b border-gray-100">
                                   <td className="py-2">Premium Salmon Fillet</td>
                                   <td className="text-center py-2">2</td>
                                   <td className="text-right py-2">AED 90.00</td>
                               </tr>
                               <tr className="border-b border-gray-100">
                                   <td className="py-2">Organic Raw Honey</td>
                                   <td className="text-center py-2">1</td>
                                   <td className="text-right py-2">AED 45.00</td>
                               </tr>
                               <tr className="border-b border-gray-100">
                                    <td className="py-2">Delivery Fees</td>
                                    <td className="text-center py-2">-</td>
                                    <td className="text-right py-2">AED 0.00</td>
                               </tr>
                           </tbody>
                       </table>
                   </div>

                   <div className="flex justify-end relative z-10">
                       <div className="w-1/2">
                           <div className="flex justify-between text-xs mb-1">
                               <span className="text-gray-500">Subtotal</span>
                               <span>AED {selectedFinancialDoc.amount?.toFixed(2) || selectedFinancialDoc.balance?.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between text-xs mb-2">
                               <span className="text-gray-500">VAT (5%)</span>
                               <span>AED {((selectedFinancialDoc.amount || selectedFinancialDoc.balance) * 0.05).toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2">
                               <span>Total</span>
                               <span>AED {((selectedFinancialDoc.amount || selectedFinancialDoc.balance) * 1.05).toFixed(2)}</span>
                           </div>
                       </div>
                   </div>
               </div>

               {/* Actions */}
               <div className="grid grid-cols-2 gap-3">
                   <button className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}>
                       <Download className="w-4 h-4" /> Download PDF
                   </button>
                   <button className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}>
                       <Share2 className="w-4 h-4" /> Share
                   </button>
                   {isInvoice && selectedFinancialDoc.status !== 'Paid' && (
                       <button 
                           onClick={handlePayInvoice}
                           className="col-span-2 py-4 rounded-xl font-bold bg-indigo-600 text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                       >
                           <CreditCard className="w-4 h-4" /> Pay Now
                       </button>
                   )}
               </div>
          </div>
      );
  };

  const renderTransactions = () => {
      const getFilteredTransactions = () => {
          if (transactionFilter === 'debit') return MOCK_TRANSACTIONS.filter(t => t.type === 'debit');
          if (transactionFilter === 'topup') return MOCK_TRANSACTIONS.filter(t => t.type === 'topup');
          if (transactionFilter === 'refund') return MOCK_TRANSACTIONS.filter(t => t.type === 'refund');
          if (transactionFilter === 'credit') return MOCK_TRANSACTIONS.filter(t => t.type === 'credit');
          return MOCK_TRANSACTIONS;
      };

      const transactions = getFilteredTransactions();

      // Calculate totals for the current view
      const totalIn = transactions.filter(t => ['topup', 'credit', 'refund'].includes(t.type)).reduce((acc, t) => acc + t.amount, 0);
      const totalOut = transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);

      return (
          <div className="pb-24 px-4 pt-4 animate-fade-in relative z-50">
               {/* Header */}
               <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                       <button 
                           onClick={() => setCurrentView('profile')}
                           className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                       >
                           <ArrowLeft className="w-5 h-5" />
                       </button>
                       <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Transactions</h2>
                   </div>
                   <button className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
                       <Download className="w-5 h-5" />
                   </button>
               </div>

               {/* Current Balance Card */}
               <div className={`p-6 rounded-3xl mb-8 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-600 to-purple-600'} text-white shadow-xl`}>
                   <div className="relative z-10">
                       <span className="text-indigo-200 text-sm font-medium mb-1 block">Net Balance (Selected Period)</span>
                       <h1 className="text-4xl font-bold mb-6">AED {(totalIn - totalOut).toFixed(2)}</h1>
                       <div className="flex gap-4">
                           <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                               <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                   <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                               </div>
                               <div>
                                   <span className="text-[10px] text-indigo-200 block">Money In</span>
                                   <span className="text-sm font-bold">AED {totalIn.toFixed(0)}</span>
                               </div>
                           </div>
                           <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                               <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center">
                                   <ArrowUpRight className="w-4 h-4 text-rose-400" />
                               </div>
                               <div>
                                   <span className="text-[10px] text-indigo-200 block">Money Out</span>
                                   <span className="text-sm font-bold">AED {totalOut.toFixed(0)}</span>
                               </div>
                           </div>
                       </div>
                   </div>
                   {/* Background Decor */}
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
               </div>

               {/* Detailed Filters */}
               <div className="mb-2">
                   <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Filter By Type</h3>
                   <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                      {[
                          { id: 'all', label: 'All', icon: null },
                          { id: 'debit', label: 'Payments', icon: <ArrowUpRight className="w-3 h-3"/> },
                          { id: 'topup', label: 'Top-ups', icon: <PlusCircle className="w-3 h-3"/> },
                          { id: 'refund', label: 'Refunds', icon: <RefreshCcw className="w-3 h-3"/> },
                          { id: 'credit', label: 'Credits', icon: <Award className="w-3 h-3"/> }
                      ].map((filter) => (
                          <button
                              key={filter.id}
                              onClick={() => setTransactionFilter(filter.id)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                                  transactionFilter === filter.id 
                                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                      : isDarkMode ? 'border-white/10 text-slate-400 hover:bg-white/5 bg-[#151C2C]' : 'border-gray-200 text-gray-500 hover:bg-white bg-gray-50'
                              }`}
                          >
                              {filter.icon}
                              {filter.label}
                          </button>
                      ))}
                   </div>
               </div>

               {/* Transaction List */}
               <div className="space-y-3">
                   {transactions.map((txn, i) => {
                       const isRefund = txn.type === 'refund';
                       const isTopup = txn.type === 'topup';
                       const isCredit = txn.type === 'credit';
                       const isIncoming = isRefund || isTopup || isCredit;
                       
                       // Determine icon and color based on type
                       let icon = <ArrowUpRight className="w-5 h-5" />;
                       let colorClass = 'bg-rose-500/10 text-rose-500';
                       
                       if (isRefund) {
                           icon = <RefreshCcw className="w-5 h-5" />;
                           colorClass = 'bg-amber-500/10 text-amber-500';
                       } else if (isTopup) {
                           icon = <PlusCircle className="w-5 h-5" />;
                           colorClass = 'bg-emerald-500/10 text-emerald-500';
                       } else if (isCredit) {
                           icon = <Award className="w-5 h-5" />;
                           colorClass = 'bg-blue-500/10 text-blue-500';
                       }

                       return (
                           <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 ${cardClass}`}>
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                                   {icon}
                               </div>
                               <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-start mb-1">
                                       <h4 className={`font-bold text-sm truncate pr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{txn.description}</h4>
                                       <span className={`font-bold whitespace-nowrap ${isIncoming ? 'text-emerald-500' : 'text-rose-500'}`}>
                                           {isIncoming ? '+' : '-'} AED {txn.amount.toFixed(2)}
                                       </span>
                                   </div>
                                   <div className="flex justify-between items-center">
                                       <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">{txn.date}</span>
                                            <span className="text-[10px] text-gray-400 mt-0.5">{txn.method}</span>
                                       </div>
                                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                           txn.status === 'Completed' ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-100 text-emerald-600') : 'bg-yellow-500/10 text-yellow-500'
                                       }`}>
                                           {txn.type}
                                       </span>
                                   </div>
                               </div>
                           </div>
                       );
                   })}
               </div>
          </div>
      );
  };

  const renderOrderDetail = () => {
      if (!selectedOrder) return null;

      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in relative z-50">
               {/* Header */}
               <div className="flex items-center gap-2 mb-6">
                   <button 
                       onClick={() => setCurrentView('orders')}
                       className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                   >
                       <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Order Details</h2>
               </div>

               {/* Status Card */}
               <div className={`p-6 rounded-[2rem] mb-6 flex flex-col items-center text-center gap-3 border ${isDarkMode ? 'bg-[#151C2C] border-white/5' : 'bg-white border-gray-100'}`}>
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedOrder.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-500' : 'bg-green-500/20 text-green-500'}`}>
                       {selectedOrder.status === 'Cancelled' ? <X className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                   </div>
                   <div>
                       <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.status}</h3>
                       <p className="text-gray-500 text-sm mt-1">Order #{selectedOrder.id}</p>
                       <p className="text-gray-500 text-xs">{selectedOrder.date} at 10:30 AM</p>
                   </div>
               </div>

               {/* Order Items */}
               <div className="mb-6">
                   <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Items Ordered</h3>
                   <div className={`rounded-2xl border overflow-hidden ${cardClass}`}>
                       {selectedOrder.items.map((item, i) => (
                           <div key={i} className={`p-4 flex justify-between items-center border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                               <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                       {item.qty}x
                                   </div>
                                   <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</span>
                               </div>
                               <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED {(item.price * item.qty).toFixed(2)}</span>
                           </div>
                       ))}
                   </div>
               </div>

               {/* Payment Info */}
               <div className={`p-4 rounded-2xl border mb-6 flex justify-between items-center ${cardClass}`}>
                   <div>
                       <span className="text-xs text-gray-500 block">Payment Method</span>
                       <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.payment}</span>
                   </div>
                   <div className="text-right">
                       <span className="text-xs text-gray-500 block">Total Amount</span>
                       <span className="font-bold text-lg text-rose-500">AED {selectedOrder.total.toFixed(2)}</span>
                   </div>
               </div>

               {/* Actions */}
               <div className="flex gap-3">
                   <button className={`flex-1 py-4 rounded-xl font-bold border flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}>
                       <HelpCircle className="w-4 h-4" /> Help
                   </button>
                   <button 
                       onClick={() => handleReorder(selectedOrder)}
                       className="flex-[2] py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
                   >
                       <ShoppingCart className="w-4 h-4" /> Reorder All
                   </button>
               </div>
          </div>
      );
  };

  const renderOrderTracking = () => {
      const steps = [
          { title: "Order Placed", time: "10:30 AM", icon: <ClipboardCheck className="w-5 h-5" /> },
          { title: "Preparing", time: "10:35 AM", icon: <Package className="w-5 h-5" /> },
          { title: "On the Way", time: "10:45 AM", icon: <Truck className="w-5 h-5" /> },
          { title: "Delivered", time: "11:00 AM", icon: <CheckCircle className="w-5 h-5" /> }
      ];

      return (
          <div className="h-screen flex flex-col relative z-50 bg-gray-100 dark:bg-slate-900 animate-fade-in">
              {/* Map Area */}
              <div className="flex-1 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-gray-200 to-gray-300 dark:from-indigo-900 dark:to-slate-900"></div>
                   
                   <div className="absolute top-1/4 left-1/4 animate-pulse">
                       <div className="w-12 h-12 bg-indigo-500/30 rounded-full flex items-center justify-center">
                           <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-lg"></div>
                       </div>
                   </div>
                   
                   <div className="absolute bottom-1/3 right-1/3">
                        <div className="relative">
                           <div className="w-12 h-12 bg-rose-500/30 rounded-full flex items-center justify-center animate-ping absolute inset-0"></div>
                           <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-xl relative z-10 border-4 border-white dark:border-slate-800">
                               <Truck className="w-6 h-6" />
                           </div>
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-md text-xs font-bold whitespace-nowrap">
                               5 mins away
                           </div>
                        </div>
                   </div>
                   
                   <button 
                       onClick={() => setCurrentView('home')}
                       className="absolute top-6 left-4 z-20 p-3 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur shadow-lg"
                   >
                       <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                   </button>
              </div>

              {/* Bottom Sheet Status */}
              <div className={`relative -mt-6 rounded-t-[2rem] p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-[#0B1120]' : 'bg-white'}`}>
                   <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6 opacity-50"></div>
                   
                   <div className="flex justify-between items-center mb-8">
                       <div>
                           <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Delivery</span>
                           <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10:55 AM</h2>
                       </div>
                       <div className="text-right">
                           <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order ID</span>
                           <p className={`font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>#839201</p>
                       </div>
                   </div>

                   {/* Stepper */}
                   <div className="mb-8 relative">
                       <div className="absolute top-5 left-4 bottom-5 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                       <div className="space-y-6 relative">
                           {steps.map((step, idx) => {
                               const isActive = idx <= trackingState;
                               const isCurrent = idx === trackingState;
                               return (
                                   <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                       <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-800'}`}>
                                           {isCurrent ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" /> : step.icon}
                                       </div>
                                       <div className="flex-1 flex justify-between items-center">
                                           <span className={`font-bold text-sm ${isActive ? (isDarkMode ? 'text-white' : 'text-gray-900') : 'text-gray-500'}`}>{step.title}</span>
                                           <span className="text-xs text-gray-500">{step.time}</span>
                                       </div>
                                   </div>
                               );
                           })}
                       </div>
                   </div>

                   {/* Driver Card */}
                   <div className={`p-4 rounded-2xl border flex items-center gap-4 ${cardClass}`}>
                       <div className="relative">
                           <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-full object-cover" alt="Driver" />
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                       </div>
                       <div className="flex-1">
                           <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ahmed Hassan</h4>
                           <div className="flex items-center gap-1">
                               <Star className="w-3 h-3 text-yellow-500 fill-current" />
                               <span className="text-xs text-gray-500">4.9 • Bike Delivery</span>
                           </div>
                       </div>
                       <div className="flex gap-2">
                           <button className="p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 transition-colors">
                               <Phone className="w-5 h-5" />
                           </button>
                           <button className="p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 transition-colors">
                               <MessageCircle className="w-5 h-5" />
                           </button>
                       </div>
                   </div>
                   
                   {/* Delivery Confirmation */}
                   {trackingState === 3 && (
                       <div className={`mt-6 p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} animate-fade-in`}>
                           <h3 className={`text-center font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Delivery Confirmation</h3>
                           
                           <div className="flex justify-between items-center mb-6 px-4">
                               <div className="text-center">
                                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Share with Driver</span>
                                   <div className="flex items-center justify-center gap-2 text-indigo-500">
                                      <Lock className="w-4 h-4" />
                                      <span className="text-2xl font-mono font-bold">4829</span>
                                   </div>
                               </div>
                               <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
                               <div className="text-center">
                                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Time</span>
                                   <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10:55</span>
                               </div>
                           </div>

                           <button 
                               onClick={() => {
                                   showToast("Delivery Confirmed!", "success");
                                   setTimeout(() => setCurrentView('home'), 1000);
                               }} 
                               className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                           >
                               <CheckCircle className="w-5 h-5" /> Confirm Receipt
                           </button>
                           <p className="text-center text-xs text-gray-500 mt-3">
                               By confirming, you acknowledge receipt of all items.
                           </p>
                       </div>
                   )}
              </div>
          </div>
      );
  };

  const renderProductDetail = () => {
      if(!selectedProduct) return null;

      const specs = [
        { label: 'SKU', value: `SKY-${selectedProduct.id.toString().split('-')[1] || '001'}` },
        { label: 'Category', value: selectedProduct.category },
        { label: 'Origin', value: 'UAE Local Farms' },
        { label: 'Storage', value: selectedProduct.mainCategory === 'Frozen Goods' ? 'Frozen (-18°C)' : 'Chilled' },
        { label: 'Delivery', value: selectedProduct.isExpress ? 'Express (Tomorrow)' : 'Standard (2 Days)' }
      ];

      const similarProducts = MOCK_PRODUCTS.filter(p => p.mainCategory === selectedProduct.mainCategory && p.id !== selectedProduct.id).slice(0, 5);

      return (
          <div className={`pb-32 animate-fade-in min-h-screen relative z-50 ${appBgClass}`}>
              {/* Header / Nav */}
              <div className="fixed top-0 w-full z-40 p-4 pt-6 flex justify-between items-center pointer-events-none">
                  <button 
                    onClick={() => setCurrentView('home')} 
                    className="pointer-events-auto p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-black dark:text-white shadow-lg border border-gray-100 dark:border-white/10"
                  >
                      <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-3 pointer-events-auto">
                     <button className="p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-black dark:text-white shadow-lg border border-gray-100 dark:border-white/10">
                        <Share2 className="w-5 h-5" />
                     </button>
                     <button className="p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-black dark:text-white shadow-lg border border-gray-100 dark:border-white/10">
                        <Heart className="w-5 h-5" />
                     </button>
                  </div>
              </div>

              {/* Image Gallery */}
              <div className="h-[50vh] w-full bg-gray-100 relative overflow-hidden group">
                  <img 
                    src={selectedProduct.images[activeImageIndex]} 
                    className="w-full h-full object-cover transition-opacity duration-300" 
                    alt={selectedProduct.name} 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Gallery Dots */}
                  {selectedProduct.images.length > 1 && (
                      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-2 z-20">
                          {selectedProduct.images.map((_, idx) => (
                              <button 
                                  key={idx}
                                  onClick={() => setActiveImageIndex(idx)}
                                  className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === activeImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                              />
                          ))}
                      </div>
                  )}

                  {/* Thumbnail Strip Overlay */}
                  {selectedProduct.images.length > 1 && (
                      <div className="absolute bottom-24 right-4 flex flex-col gap-2 z-20">
                          {selectedProduct.images.map((img, idx) => (
                              <div 
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden cursor-pointer transition-all shadow-lg ${idx === activeImageIndex ? 'border-rose-500 scale-110' : 'border-white/50 opacity-70 hover:opacity-100'}`}
                              >
                                  <img src={img} className="w-full h-full object-cover" alt="" />
                              </div>
                          ))}
                      </div>
                  )}
              </div>

              {/* Content Container */}
              <div className={`relative -mt-10 rounded-t-[2.5rem] p-6 min-h-[60vh] ${isDarkMode ? 'bg-[#0B1120]' : 'bg-white'} shadow-[0_-10px_40px_rgba(0,0,0,0.1)]`}>
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-8 opacity-50"></div>

                  <div className="mb-8">
                      <div className="flex justify-between items-start mb-3 gap-4">
                          <div>
                              <div className="flex items-center gap-2 mb-2">
                                  {selectedProduct.isExpress && (
                                      <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                                          <Zap className="w-3 h-3 fill-current" /> Express
                                      </span>
                                  )}
                                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{selectedProduct.category}</span>
                              </div>
                              <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProduct.name}</h1>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                              <span className="text-3xl font-bold text-rose-600">AED {selectedProduct.price}</span>
                              {selectedProduct.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">AED {selectedProduct.originalPrice}</span>
                              )}
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-3 py-3 border-y border-dashed border-gray-200 dark:border-white/10">
                          <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                              ))}
                          </div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProduct.rating}</span>
                          <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>({selectedProduct.reviews} reviews)</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>In Stock</span>
                      </div>
                  </div>

                  {selectedProduct.offers && selectedProduct.offers.length > 0 && (
                      <div className="mb-8 space-y-3">
                          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Product Offers</h3>
                          {selectedProduct.offers.map((offer, i) => (
                              <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                                  <Tag className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                  <div>
                                      <h4 className={`font-bold text-sm mb-0.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>{offer.title}</h4>
                                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{offer.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}

                  <div className="mb-8">
                      <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {selectedProduct.description}
                      </p>
                  </div>

                  <div className="mb-10">
                      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Product Specifications</h3>
                      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                          {specs.map((spec, i) => (
                              <div key={i} className={`flex justify-between items-center p-4 text-sm border-b last:border-0 ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                                  <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>{spec.label}</span>
                                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{spec.value}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {similarProducts.length > 0 && (
                      <div className="mb-4">
                          <HorizontalProductList 
                              title="You Might Also Like" 
                              products={similarProducts} 
                              onProductClick={handleProductClick}
                              onAddToCart={addToCart}
                              isDarkMode={isDarkMode}
                          />
                      </div>
                  )}
              </div>

              {/* Sticky Bottom Action Bar - Now safe from BottomNav overlap */}
              <div className={`fixed bottom-0 w-full p-4 pb-8 border-t backdrop-blur-xl z-[60] flex gap-3 ${isDarkMode ? 'bg-[#0B1120]/90 border-white/10' : 'bg-white/90 border-gray-200'}`}>
                  <div className={`flex items-center gap-3 px-3 py-3 rounded-2xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                      <button className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}><Minus className="w-5 h-5" /></button>
                      <span className="font-bold text-lg w-4 text-center">1</span>
                      <button className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}><Plus className="w-5 h-5" /></button>
                  </div>
                  
                  {/* Add To Cart Button */}
                  <button 
                      onClick={() => addToCart(selectedProduct.name, 1, selectedProduct.price)}
                      className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-900'}`}
                  >
                      <ShoppingCart className="w-5 h-5" /> Add
                  </button>

                  {/* Buy Now Button */}
                  <button 
                      onClick={() => { 
                          addToCart(selectedProduct.name, 1, selectedProduct.price); 
                          setCurrentView('cart');
                      }}
                      className="flex-[1.5] bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                      Buy Now
                  </button>
              </div>
          </div>
      );
  };

  const renderProductList = () => {
      const filteredProducts = MOCK_PRODUCTS.filter(p => p.subCategory === activeFilter.sub);
      const displayProducts = filteredProducts.length > 0 ? filteredProducts : Array(4).fill(null).map((_, i) => ({
          id: `demo-${i}`,
          name: `${activeFilter.sub} Item ${i+1}`,
          category: activeFilter.main,
          subCategory: activeFilter.sub,
          price: (Math.random() * 50 + 20).toFixed(2),
          images: ['https://placehold.co/400x400/1e293b/ffffff?text=Product'],
          description: `Fresh and high quality ${activeFilter.sub}.`
      }));

      return (
          <div className="pb-24 px-4 pt-4 animate-fade-in">
              <button 
                onClick={() => setCurrentView('subcategories')} 
                className={`flex items-center gap-2 text-sm mb-4 font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}
              >
                  <ArrowLeft className="w-4 h-4"/> Back to Categories
              </button>
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{activeFilter.sub}</h2>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Showing best results for you.</p>
              <div className="grid grid-cols-2 gap-4">
                  {displayProducts.map((product, i) => (
                      <div 
                        key={product.id} 
                        onClick={() => handleProductClick(product)}
                        className={`p-3 rounded-2xl border flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform ${cardClass}`}
                      >
                          <div className="h-32 rounded-xl bg-gray-100 overflow-hidden relative">
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                              <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(product.name, 1, product.price); }}
                                className="absolute bottom-2 right-2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                          </div>
                          <div>
                              <h4 className={`text-sm font-bold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h4>
                              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                              <span className="font-bold text-indigo-500">AED {product.price}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  const renderAllProducts = () => {
      // Filtering Logic
      const activeFilterCount = (productFilters.minPrice ? 1 : 0) + 
                                (productFilters.maxPrice ? 1 : 0) + 
                                (productFilters.categories.length > 0 ? 1 : 0) + 
                                (productFilters.rating > 0 ? 1 : 0);

      const filtered = MOCK_PRODUCTS.filter(p => {
          const matchesCategory = productFilters.categories.length === 0 || productFilters.categories.includes(p.mainCategory);
          const matchesPrice = (!productFilters.minPrice || parseFloat(p.price) >= parseFloat(productFilters.minPrice)) && 
                               (!productFilters.maxPrice || parseFloat(p.price) <= parseFloat(productFilters.maxPrice));
          const matchesRating = !productFilters.rating || parseFloat(p.rating) >= productFilters.rating;
          return matchesCategory && matchesPrice && matchesRating;
      }).sort((a, b) => {
          if (productSort === 'price_asc') return parseFloat(a.price) - parseFloat(b.price);
          if (productSort === 'price_desc') return parseFloat(b.price) - parseFloat(a.price);
          // Featured: Prioritize Discounts -> Express -> High Rating
          if (productSort === 'featured') {
              const scoreA = (a.discount ? 10 : 0) + (a.isExpress ? 5 : 0) + parseFloat(a.rating);
              const scoreB = (b.discount ? 10 : 0) + (b.isExpress ? 5 : 0) + parseFloat(b.rating);
              return scoreB - scoreA;
          }
          return 0; 
      });

      return (
          <div className="pb-24 animate-fade-in relative">
              {/* Sticky Header with Sort/Filter - Adjusted Position to prevent overlap with Main Header */}
              <div className={`sticky top-[7.5rem] z-30 px-4 py-3 flex gap-3 backdrop-blur-md border-b ${isDarkMode ? 'bg-[#0B1120]/90 border-white/5' : 'bg-white/90 border-gray-200'}`}>
                  <button 
                      onClick={() => setIsProductFilterOpen(true)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold border transition-colors relative ${isDarkMode ? 'bg-[#1E293B] border-white/10 text-white hover:bg-[#2A3649]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                      <Filter className="w-4 h-4" /> {t('filters')}
                      {activeFilterCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border border-white dark:border-[#1E293B]"></span>
                      )}
                  </button>
                  <div className="relative flex-1">
                      <select 
                          value={productSort}
                          onChange={(e) => setProductSort(e.target.value)}
                          className={`w-full appearance-none py-2.5 px-4 pl-10 rounded-xl text-sm font-bold border outline-none cursor-pointer ${isDarkMode ? 'bg-[#1E293B] border-white/10 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                      >
                          <option value="featured">Featured</option>
                          <option value="price_asc">Price: Low to High</option>
                          <option value="price_desc">Price: High to Low</option>
                      </select>
                      <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
                  </div>
              </div>

              {/* Product List */}
              <div className="px-3 pt-4">
                  {filtered.length === 0 ? (
                      <div className="text-center py-20">
                          <Package2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="opacity-70">No products match your filters.</p>
                          <button 
                              onClick={() => setProductFilters({ minPrice: '', maxPrice: '', categories: [], rating: 0 })}
                              className="mt-4 text-indigo-500 font-bold text-sm"
                          >
                              Clear Filters
                          </button>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filtered.map((product) => {
                              const isWished = wishlist.some(item => item.id === product.id);
                              return (
                              <div 
                                  key={product.id} 
                                  onClick={() => handleProductClick(product)}
                                  className={`relative rounded-[2rem] overflow-hidden border transition-all duration-300 group ${cardClass}`}
                              >
                                  <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                      
                                      <button 
                                          onClick={(e) => { 
                                              e.stopPropagation(); 
                                              if (isWished) {
                                                  setWishlist(prev => prev.filter(i => i.id !== product.id));
                                                  showToast(`Removed ${product.name} from wishlist`, "info");
                                              } else {
                                                  setWishlist(prev => [...prev, product]);
                                                  showToast(`Added ${product.name} to wishlist`, "success");
                                              }
                                          }}
                                          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg border ${isWished ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white/40 border-white/20 hover:bg-white text-black'}`}
                                      >
                                          <Heart className={`w-5 h-5 ${isWished ? 'fill-current' : ''}`} />
                                      </button>

                                      {product.discount && (
                                          <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                                              {product.discount}
                                          </div>
                                      )}

                                      {product.isExpress && (
                                          <div className="absolute bottom-4 left-4 bg-sky-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                                              <Zap className="w-3 h-3 fill-current" /> Express
                                          </div>
                                      )}
                                  </div>

                                  <div className="p-5">
                                      <div className="mb-3">
                                          <div className="flex justify-between items-start gap-2">
                                              <h3 className={`text-lg font-bold leading-tight line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                                              <div className="flex items-center gap-1 shrink-0 bg-yellow-500/10 px-2 py-1 rounded-lg">
                                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                  <span className="text-xs font-bold text-yellow-600">{product.rating}</span>
                                              </div>
                                          </div>
                                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{product.category}</p>
                                      </div>

                                      {(product.offers && product.offers.length > 0) ? (
                                          <div className="mb-4">
                                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-dashed ${isDarkMode ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-emerald-600/30 text-emerald-700 bg-emerald-50'}`}>
                                                  <Tag className="w-3 h-3" /> {product.offers.length} Offers Available
                                              </span>
                                          </div>
                                      ) : (
                                          <div className="mb-4 h-[26px]"></div> 
                                      )}

                                      <div className="flex items-baseline gap-2 mb-5">
                                          <span className="text-2xl font-bold text-rose-500">AED {product.price}</span>
                                          {product.originalPrice && <span className="text-sm text-gray-400 line-through">AED {product.originalPrice}</span>}
                                      </div>

                                      <div className="flex gap-3 mt-auto">
                                          <button 
                                              onClick={(e) => { e.stopPropagation(); addToCart(product.name, 1, product.price); }}
                                              className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-white' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
                                          >
                                              <ShoppingCart className="w-4 h-4" /> Add
                                          </button>
                                          <button 
                                              onClick={(e) => { 
                                                  e.stopPropagation(); 
                                                  addToCart(product.name, 1, product.price); 
                                                  setCurrentView('checkout');
                                              }}
                                              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                                          >
                                              Buy Now
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          )})}
                      </div>
                  )}
              </div>

              {isProductFilterOpen && (
                  <div className="fixed inset-0 z-[100] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsProductFilterOpen(false)}></div>
                      <div className={`relative w-full rounded-t-[2rem] p-6 max-h-[85vh] overflow-y-auto ${isDarkMode ? 'bg-[#151C2C]' : 'bg-white'} animate-slide-in-right`}>
                          <div className="flex justify-between items-center mb-6">
                              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('filters')}</h3>
                              <button onClick={() => setIsProductFilterOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                  <X className="w-5 h-5" />
                              </button>
                          </div>

                          <div className="mb-6">
                              <h4 className={`font-bold mb-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Price Range</h4>
                              <div className="flex gap-4">
                                  <input 
                                      type="number" 
                                      placeholder="Min" 
                                      value={productFilters.minPrice}
                                      onChange={(e) => setProductFilters({...productFilters, minPrice: e.target.value})}
                                      className={`w-full p-3 rounded-xl border outline-none ${inputBgClass}`} 
                                  />
                                  <input 
                                      type="number" 
                                      placeholder="Max" 
                                      value={productFilters.maxPrice}
                                      onChange={(e) => setProductFilters({...productFilters, maxPrice: e.target.value})}
                                      className={`w-full p-3 rounded-xl border outline-none ${inputBgClass}`} 
                                  />
                              </div>
                          </div>

                          <div className="mb-6">
                              <h4 className={`font-bold mb-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Categories</h4>
                              <div className="flex flex-wrap gap-2">
                                  {CATEGORIES_DATA.products.map((cat, i) => (
                                      <button 
                                          key={i}
                                          onClick={() => {
                                              const newCats = productFilters.categories.includes(cat.title)
                                                  ? productFilters.categories.filter(c => c !== cat.title)
                                                  : [...productFilters.categories, cat.title];
                                              setProductFilters({...productFilters, categories: newCats});
                                          }}
                                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                              productFilters.categories.includes(cat.title)
                                                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                                                  : isDarkMode ? 'border-white/10 text-slate-400' : 'border-gray-200 text-gray-600'
                                          }`}
                                      >
                                          {cat.title}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="mb-8">
                              <h4 className={`font-bold mb-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Rating</h4>
                              <div className="flex gap-2">
                                  {[4, 3, 2].map((r) => (
                                      <button 
                                          key={r}
                                          onClick={() => setProductFilters({...productFilters, rating: r})}
                                          className={`px-4 py-2 rounded-xl border flex items-center gap-1 transition-all ${
                                              productFilters.rating === r
                                                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' 
                                                  : isDarkMode ? 'border-white/10 text-slate-400' : 'border-gray-200 text-gray-600'
                                          }`}
                                      >
                                          {r}+ <Star className="w-3 h-3 fill-current" />
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="flex gap-3">
                              <button 
                                  onClick={() => setProductFilters({ minPrice: '', maxPrice: '', categories: [], rating: 0 })}
                                  className={`flex-1 py-4 rounded-xl font-bold border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-300 text-gray-700'}`}
                              >
                                  Reset
                              </button>
                              <button 
                                  onClick={() => setIsProductFilterOpen(false)}
                                  className="flex-[2] py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                              >
                                  Show Results
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
  };

  const renderServiceBookingFlow = () => {
      if (isBookingSuccess) {
          return (
              <div className="pb-24 px-6 pt-12 animate-fade-in text-center min-h-[60vh] flex flex-col justify-center items-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6 animate-bounce">
                      <Award className="w-10 h-10" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Request Sent!</h2>
                  <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      We have received your request for <strong>{selectedServiceBooking.subCategory}</strong>. Our team will send you an estimate shortly.
                  </p>
                  <button 
                      onClick={() => setCurrentView('home')} 
                      className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                  >
                      Back to Home
                  </button>
              </div>
          );
      }

      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in relative z-50">
              <button 
                onClick={() => setCurrentView('subcategories')} 
                className={`flex items-center gap-2 text-sm mb-6 font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}
              >
                  <ArrowLeft className="w-4 h-4"/> Cancel
              </button>

              <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'} ${selectedServiceBooking.accent}`}>
                      {React.cloneElement(selectedServiceBooking.icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                      <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedServiceBooking.subCategory}</h2>
                      <p className="text-xs text-gray-500">{selectedServiceBooking.mainCategory}</p>
                  </div>
              </div>

              <div className="flex justify-between mb-8 px-2">
                  {[1, 2, 3].map(step => (
                      <div key={step} className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${serviceBookingStep >= step ? 'bg-indigo-600 text-white' : isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-500'}`}>
                              {step}
                          </div>
                          <span className="text-[10px] text-gray-500">{step === 1 ? 'Scope' : step === 2 ? 'Details' : 'Contact'}</span>
                      </div>
                  ))}
              </div>

              {serviceBookingStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                      <div>
                          <label className={`text-sm font-bold mb-3 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Establishment Type</label>
                          <div className="grid grid-cols-2 gap-3">
                              {['Restaurant', 'Cafe', 'Cloud Kitchen', 'Hotel'].map(type => (
                                  <div 
                                      key={type}
                                      onClick={() => setBookingDetails(prev => ({ ...prev, propertyType: type }))}
                                      className={`p-4 rounded-xl border text-center capitalize cursor-pointer transition-all ${bookingDetails.propertyType === type ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500 font-bold' : cardClass}`}
                                  >
                                      {type}
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div>
                          <label className={`text-sm font-bold mb-3 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Urgency</label>
                          <div className="grid grid-cols-2 gap-3">
                              {['standard', 'emergency'].map(type => (
                                  <div 
                                      key={type}
                                      onClick={() => setBookingDetails(prev => ({ ...prev, urgency: type }))}
                                      className={`p-4 rounded-xl border text-center capitalize cursor-pointer transition-all ${bookingDetails.urgency === type ? 'border-rose-500 bg-rose-500/10 text-rose-500 font-bold' : cardClass}`}
                                  >
                                      {type}
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="pt-4">
                          <button onClick={() => setServiceBookingStep(2)} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg">Next Step</button>
                      </div>
                  </div>
              )}

              {serviceBookingStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                      <div>
                          <label className={`text-sm font-bold mb-2 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Description</label>
                          <textarea 
                              name="description"
                              value={bookingDetails.description}
                              onChange={handleBookingInputChange}
                              placeholder="Describe the issue..."
                              rows="4"
                              className={`w-full rounded-xl p-4 outline-none border focus:border-indigo-500 ${inputBgClass}`}
                          ></textarea>
                      </div>
                      <div>
                          <label className={`text-sm font-bold mb-2 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Preferred Date</label>
                          <input 
                              type="datetime-local"
                              name="datePreference"
                              value={bookingDetails.datePreference}
                              onChange={handleBookingInputChange}
                              className={`w-full rounded-xl p-4 outline-none border focus:border-indigo-500 ${inputBgClass}`}
                          />
                      </div>
                      <div className="flex gap-3 pt-4">
                          <button onClick={() => setServiceBookingStep(1)} className={`flex-1 py-4 rounded-2xl font-bold border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>Back</button>
                          <button onClick={() => setServiceBookingStep(3)} className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg">Next</button>
                      </div>
                  </div>
              )}

              {serviceBookingStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                      <div>
                          <label className={`text-sm font-bold mb-2 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Contact Name</label>
                          <input 
                              type="text"
                              name="contactName"
                              value={bookingDetails.contactName}
                              onChange={handleBookingInputChange}
                              placeholder="Your Name"
                              className={`w-full rounded-xl p-4 outline-none border focus:border-indigo-500 ${inputBgClass}`}
                          />
                      </div>
                      <div>
                          <label className={`text-sm font-bold mb-2 block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Phone Number</label>
                          <input 
                              type="tel"
                              name="contactPhone"
                              value={bookingDetails.contactPhone}
                              onChange={handleBookingInputChange}
                              placeholder="+971..."
                              className={`w-full rounded-xl p-4 outline-none border focus:border-indigo-500 ${inputBgClass}`}
                          />
                      </div>
                      <div className="flex gap-3 pt-4">
                          <button onClick={() => setServiceBookingStep(2)} className={`flex-1 py-4 rounded-2xl font-bold border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>Back</button>
                          <button onClick={handleEstimateRequest} className="flex-[2] py-4 rounded-2xl bg-emerald-600 text-white font-bold shadow-lg">Request Estimate</button>
                      </div>
                  </div>
              )}
          </div>
      );
  };

  const renderServices = () => (
      <div className="pb-24 px-4 pt-4 animate-fade-in">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('services')}</h2>
          <div className="grid grid-cols-1 gap-4">
              {CATEGORIES_DATA.services.map((cat, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 ${cardClass}`} onClick={() => handleServiceClick(cat.title)}>
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${cat.subCardBg} text-white`}>
                          {cat.icon}
                      </div>
                      <div className="flex-1">
                          <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cat.title}</h3>
                          <p className="text-xs text-gray-500">{cat.subcategories.length} Types Available</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
              ))}
          </div>
      </div>
  );

  const renderCart = () => {
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const deliveryThreshold = 1000;
      const progress = Math.min((subtotal / deliveryThreshold) * 100, 100);
      const deliveryFee = subtotal >= deliveryThreshold ? 0 : 25.00;
      const tax = subtotal * 0.05; // 5% VAT
      const grandTotal = subtotal + deliveryFee + tax;

      // Upsell items (Quick Add)
      const essentials = MOCK_PRODUCTS.slice(0, 5); 

      return (
          <div className="pb-32 px-4 pt-4 animate-fade-in relative z-50">
              <div className="flex items-center gap-2 mb-6">
                   <button 
                       onClick={() => setCurrentView('home')}
                       className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                   >
                       <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('cart')} ({cart.length})</h2>
              </div>

              {/* Free Delivery Meter */}
              <div className={`p-4 rounded-2xl mb-6 border ${isDarkMode ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-white/10' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'}`}>
                  <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {subtotal >= deliveryThreshold ? 'Free Delivery Unlocked!' : `Add AED ${(deliveryThreshold - subtotal).toFixed(2)} for Free Delivery`}
                      </span>
                      <Truck className={`w-5 h-5 ${subtotal >= deliveryThreshold ? 'text-green-500' : 'text-indigo-500'}`} />
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                          className={`h-full transition-all duration-1000 ${subtotal >= deliveryThreshold ? 'bg-green-500' : 'bg-indigo-500'}`} 
                          style={{ width: `${progress}%` }}
                      ></div>
                  </div>
              </div>

              {cart.length === 0 ? (
                  <div className="text-center py-20 opacity-50">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
                      <p>Your cart is empty.</p>
                      <button onClick={() => setCurrentView('home')} className="mt-4 text-indigo-500 font-bold">Start Shopping</button>
                  </div>
              ) : (
                  <>
                      {/* Cart Items List */}
                      <div className="space-y-4 mb-8">
                          {cart.map((item, i) => (
                              <div key={i} className={`p-3 rounded-2xl border flex gap-3 ${cardClass}`}>
                                  <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                      <img src={item.image || 'https://placehold.co/200'} className="w-full h-full object-cover" alt={item.name} />
                                  </div>
                                  <div className="flex-1 flex flex-col justify-between">
                                      <div className="flex justify-between items-start">
                                          <h4 className={`font-bold text-sm line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                                          <button onClick={() => removeFromCart(item.name)} className="text-gray-400 hover:text-rose-500">
                                              <Trash2 className="w-4 h-4" />
                                          </button>
                                      </div>
                                      <div className="flex justify-between items-end">
                                          <span className="font-bold text-indigo-500">AED {(item.price * item.qty).toFixed(2)}</span>
                                          <div className={`flex items-center gap-3 px-2 py-1 rounded-lg border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                                              <button onClick={() => updateCartQty(item.name, -1)}><Minus className="w-4 h-4" /></button>
                                              <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                              <button onClick={() => updateCartQty(item.name, 1)}><Plus className="w-4 h-4" /></button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>

                      {/* Upsell / Last Minute Essentials */}
                      <div className="mb-8">
                          <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Last Minute Essentials</h3>
                          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
                              {essentials.map((prod) => (
                                  <div key={prod.id} className={`min-w-[120px] p-2 rounded-xl border flex flex-col items-center text-center gap-2 ${cardClass}`}>
                                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                          <img src={prod.images[0]} className="w-full h-full object-cover" />
                                      </div>
                                      <span className={`text-[10px] font-bold line-clamp-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{prod.name}</span>
                                      <button 
                                          onClick={() => addToCart(prod.name, 1, prod.price)}
                                          className="text-[10px] font-bold text-indigo-500 border border-indigo-500/30 px-2 py-1 rounded-lg w-full"
                                      >
                                          Add +
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Order Note & Promo Code */}
                      <div className="space-y-4 mb-8">
                          <div className={`p-4 rounded-2xl border ${cardClass}`}>
                              <div className="flex items-center gap-2 mb-2">
                                  <MessageCircle className="w-4 h-4 text-gray-400" />
                                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Order Instructions</span>
                              </div>
                              <textarea 
                                  rows="2"
                                  placeholder="e.g., Deliver to rear entrance, call upon arrival..."
                                  value={orderNote}
                                  onChange={(e) => setOrderNote(e.target.value)}
                                  className={`w-full p-3 rounded-xl text-sm outline-none bg-transparent resize-none ${isDarkMode ? 'placeholder-slate-500 text-white' : 'placeholder-gray-400 text-gray-900'}`}
                              />
                          </div>

                          <div className={`p-3 rounded-2xl border flex items-center gap-2 ${cardClass}`}>
                              <Tag className="w-4 h-4 text-gray-400 ml-2" />
                              <input 
                                  type="text"
                                  placeholder="Promo Code"
                                  value={promoCode}
                                  onChange={(e) => setPromoCode(e.target.value)}
                                  className="flex-1 bg-transparent outline-none text-sm p-2"
                              />
                              <button className="text-xs font-bold text-indigo-500 px-3">Apply</button>
                          </div>
                      </div>

                      {/* Bill Details */}
                      <div className={`p-5 rounded-2xl border mb-24 ${cardClass}`}>
                          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bill Details</h3>
                          <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                  <span className="text-gray-500">Item Total</span>
                                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>AED {subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500">Delivery Fee</span>
                                  <span className={deliveryFee === 0 ? 'text-green-500 font-bold' : (isDarkMode ? 'text-white' : 'text-gray-900')}>
                                      {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee.toFixed(2)}`}
                                  </span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500">VAT (5%)</span>
                                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>AED {tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Grand Total</span>
                                  <span className="font-bold text-lg text-rose-500">AED {grandTotal.toFixed(2)}</span>
                              </div>
                          </div>
                      </div>

                      {/* Sticky Checkout Button */}
                      <div className={`fixed bottom-0 left-0 w-full p-4 pb-8 border-t backdrop-blur-xl z-[60] ${isDarkMode ? 'bg-[#0B1120]/90 border-white/10' : 'bg-white/90 border-gray-200'}`}>
                          <button 
                              onClick={() => setCurrentView('checkout')}
                              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                          >
                              <span>Checkout</span>
                              <span>AED {grandTotal.toFixed(2)}</span>
                          </button>
                      </div>
                  </>
              )}
          </div>
      );
  };

  const renderProfile = () => (
      <div className="pb-24 px-4 pt-4 animate-fade-in">
          {/* B2B Header Card */}
          <div className={`p-6 rounded-3xl mb-6 flex items-center gap-5 border relative overflow-hidden ${isDarkMode ? 'bg-[#151C2C] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shrink-0 z-10">
                  <div className={`w-full h-full rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#0B1120]' : 'bg-white'}`}>
                      <Utensils className="w-8 h-8 text-indigo-500" />
                  </div>
              </div>
              <div className="flex-1 z-10">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>The Golden Fork</h2>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                          Verified Business
                      </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                      <Briefcase className="w-3 h-3" />
                      ID: #B2B-88392
                  </div>
              </div>
              {/* Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10`}></div>
          </div>

          {/* Business Wallet Summary */}
          <div className="grid grid-cols-2 gap-3 mb-8">
              <div 
                  onClick={() => setCurrentView('transactions')}
                  className={`p-4 rounded-2xl border cursor-pointer active:scale-95 transition-transform ${cardClass}`}
              >
                  <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs text-gray-500 font-bold uppercase">Wallet Balance</span>
                  </div>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED 450.00</span>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-indigo-500 font-bold">
                      View History <ChevronRight className="w-3 h-3" />
                  </div>
              </div>
              
              <div className={`p-4 rounded-2xl border ${cardClass}`}>
                  <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-gray-500 font-bold uppercase">Total Limit</span>
                  </div>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED 8,500</span>
              </div>

              <div className={`p-4 rounded-2xl border ${cardClass}`}>
                  <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-4 h-4 text-rose-500" />
                      <span className="text-xs text-gray-500 font-bold uppercase">Used Credit</span>
                  </div>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AED 3,250</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                      <div className="bg-rose-500 h-1 rounded-full" style={{ width: '38%' }}></div>
                  </div>
              </div>

              <div className={`p-4 rounded-2xl border ${cardClass}`}>
                  <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-sky-500" />
                      <span className="text-xs text-gray-500 font-bold uppercase">Credit Days</span>
                  </div>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>45 Days</span>
                  <span className="text-[10px] text-gray-500 block mt-1">Next Due: 15 Oct</span>
              </div>
          </div>

          <div className="space-y-2">
              <div 
                  onClick={() => setCurrentView('order-tracking')}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${cardClass}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <Package className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Live Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
              </div>

              <div 
                  onClick={() => setCurrentView('address-book')}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${cardClass}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Branch Locations</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>

              {/* NEW: All Transactions Menu Item */}
              <div 
                  onClick={() => setCurrentView('transactions')}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${cardClass}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <History className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>All Transactions</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>

              <div 
                  onClick={() => setCurrentView('financial-docs')}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${cardClass}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <Receipt className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Invoices & Statements</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>

              <div className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer ${cardClass}`}>
                  <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <UserPlus className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                       </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Manage Staff</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>

              <div className={`p-4 rounded-xl border flex justify-between items-center mt-6 ${cardClass}`}>
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                      </div>
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Dark Mode</span>
                  </div>
                  <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : ''}`} />
                  </button>
              </div>
              
              <button className={`w-full py-4 mt-6 rounded-xl font-bold flex items-center justify-center gap-2 border ${isDarkMode ? 'border-rose-500/30 text-rose-500 hover:bg-rose-500/10' : 'border-rose-200 text-rose-600 hover:bg-rose-50'}`}>
                  <LogOut className="w-4 h-4" /> Sign Out
              </button>
          </div>
      </div>
  );

  const renderCategories = () => {
    const renderCategoryCard = (cat, index, type) => (
        <div 
            key={index} 
            onClick={() => { 
                if (type === 'service') {
                    handleServiceClick(cat.title);
                } else {
                    setViewingCategory(cat); 
                    setCurrentView('subcategories'); 
                }
            }}
            className={`group relative p-5 rounded-[2rem] flex flex-col justify-between h-44 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-[#151C2C] border border-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}
        >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${cat.textGradient}`}></div>

            <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${cat.subCardBg}`}>
                    {React.cloneElement(cat.icon, { className: "w-6 h-6" })}
                </div>
                {index === 0 && (
                    <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Top
                    </span>
                )}
            </div>
            
            <div className="relative z-10 mt-auto">
                <h4 className={`text-lg font-bold leading-tight mb-1 group-hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cat.title}</h4>
                <span className={`text-xs font-medium flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {cat.subcategories.length} {type === 'service' ? 'services' : 'collections'} <ChevronRight className="w-3 h-3" />
                </span>
            </div>
            
            {/* Decorative Background Blob */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 blur-2xl transition-opacity group-hover:opacity-10 ${cat.subCardBg}`}></div>
        </div>
    );

    return (
        <div className="pb-24 animate-fade-in min-h-screen relative">
             {/* Header Section with Search */}
             <div className={`px-5 pt-6 pb-6 sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#0B1120]/80 border-white/5' : 'bg-white/80 border-gray-200'}`}>
                <h2 className={`text-3xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Explore <span className="text-indigo-500">Categories</span>
                </h2>
                
                {/* Custom Search Bar for Categories */}
                <div className={`relative flex items-center p-1 rounded-2xl transition-all duration-300 ${isDarkMode ? 'bg-black/20 ring-1 ring-white/10 focus-within:ring-indigo-500/50' : 'bg-gray-100 ring-1 ring-gray-200 focus-within:ring-indigo-500/50'}`}>
                    <Search className={`w-5 h-5 ml-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input 
                        type="text" 
                        placeholder="Search categories..."
                        className="w-full bg-transparent border-none outline-none p-3 text-sm font-medium" 
                    />
                </div>
             </div>

             <div className="px-4 mt-6">
                {/* Products Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <ShoppingBag className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Products</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {CATEGORIES_DATA.products.map((cat, i) => renderCategoryCard(cat, i, 'product'))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <Wrench className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Professional Services</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {CATEGORIES_DATA.services.map((cat, i) => renderCategoryCard(cat, i, 'service'))}
                    </div>
                </div>
             </div>
        </div>
    );
};

  return (
    <div className={`min-h-screen font-sans ${appBgClass} overflow-x-hidden`}>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
      `}</style>

      {/* Main Header - Hide on Checkout/Tracking/Categories/Cart */}
      {!['product-detail', 'service-booking', 'checkout', 'order-tracking', 'address-book', 'categories', 'financial-docs', 'financial-detail', 'cart'].includes(currentView) && (
          <header className={`sticky top-0 z-40 px-4 py-3 backdrop-blur-md border-b ${isDarkMode ? 'bg-[#0B1120]/90 border-white/5' : 'bg-white/90 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500 shrink-0">
                          <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{t('deliverTo')}</span>
                          <span className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location}</span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />
                  </div>
                  <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={toggleTheme}
                        className={`p-2 rounded-full border relative ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-gray-700'}`}
                      >
                          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={() => setCurrentView('wishlist')}
                        className={`p-2 rounded-full border relative ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-gray-700'}`}
                      >
                          <Heart className="w-5 h-5" />
                          {wishlist.length > 0 && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0B1120]"></span>
                          )}
                      </button>
                      <button 
                        onClick={() => setCurrentView('cart')}
                        className={`p-2 rounded-full border relative ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-gray-700'}`}
                      >
                          <ShoppingCart className="w-5 h-5" />
                          {cart.reduce((a, c) => a + c.qty, 0) > 0 && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#0B1120]"></span>
                          )}
                      </button>
                      <button className={`p-2 rounded-full border ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-200 text-gray-700'}`}>
                          <Bell className="w-5 h-5" />
                      </button>
                  </div>
              </div>
              <div className={`relative flex items-center ${isDarkMode ? 'bg-[#1E293B]' : 'bg-gray-100'} rounded-xl px-3 py-2.5`}>
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder={t('search')} 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                  />
                  <Mic className="w-4 h-4 text-gray-400 ml-2" />
              </div>
          </header>
      )}

      {toast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-bold animate-fade-in">
              {toast.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Info className="w-4 h-4" />}
              {toast.message}
          </div>
      )}

      <main className="pt-2">
          {currentView === 'home' && renderHome()}
          {currentView === 'categories' && renderCategories()}
          {currentView === 'products' && renderAllProducts()}
          {currentView === 'services' && renderServices()}
          {currentView === 'cart' && renderCart()}
          {currentView === 'orders' && renderOrders()}
          {currentView === 'order-detail' && renderOrderDetail()} 
          {currentView === 'profile' && renderProfile()}
          {currentView === 'financial-docs' && renderFinancialDocs()}
          {currentView === 'financial-detail' && renderFinancialDetail()}
          {currentView === 'product-detail' && renderProductDetail()}
          {currentView === 'product-list' && renderProductList()}
          {currentView === 'service-booking' && renderServiceBookingFlow()}
          {currentView === 'checkout' && renderCheckout()}
          {currentView === 'order-tracking' && renderOrderTracking()}
          {currentView === 'address-book' && renderAddressBook()}
          {currentView === 'wishlist' && renderWishlist()}
          {currentView === 'transactions' && renderTransactions()}
          {currentView === 'subcategories' && viewingCategory && (
              <div className="pb-24 px-4 pt-4 animate-fade-in">
                  <button onClick={() => setCurrentView('categories')} className={`flex items-center gap-2 text-sm mb-4 font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <ArrowLeft className="w-4 h-4"/> Back to Collections
                  </button>
                  <div className="mb-6">
                      <h2 className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{viewingCategory.title}</h2>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Explore sub-categories</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      {viewingCategory.subcategories.map((sub, i) => (
                          <div 
                              key={i} 
                              onClick={() => handleSubCategoryClick(sub.name)}
                              className={`p-5 rounded-[2rem] border flex flex-col items-start justify-between cursor-pointer active:scale-95 transition-all h-32 hover:shadow-lg ${cardClass}`}
                          >
                              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                {sub.icon}
                              </div>
                              <div className="w-full flex justify-between items-end">
                                <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sub.name}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </main>

      <div className={`fixed ${shouldShowBottomNav ? 'bottom-24' : 'bottom-6'} right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300`}>
        {(isWidgetListening || widgetTranscript) && (
          <div className={`mb-2 px-4 py-2 rounded-xl backdrop-blur-md shadow-xl animate-fade-in max-w-[200px] text-right border ${isDarkMode ? 'bg-black/80 border-white/10 text-white' : 'bg-white/90 border-gray-200 text-gray-900'}`}>
            <p className="text-sm font-medium">{widgetTranscript || "Listening..."}</p>
          </div>
        )}
        
        <button 
          onClick={() => startVoiceRecognition('widget')}
          className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center ${isWidgetListening ? 'bg-gradient-to-r from-rose-500 to-pink-600 animate-pulse ring-4 ring-rose-500/30' : 'bg-gradient-to-r from-indigo-600 to-blue-600'}`}
        >
           {isWidgetListening ? <Volume2 className="w-6 h-6 text-white animate-bounce" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
      </div>

      {shouldShowBottomNav && (
        <BottomNav 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          cartCount={cart.reduce((a,c) => a + c.qty, 0)} 
          isDarkMode={isDarkMode}
          t={t}
        />
      )}

    </div>
  );
};

export default OneFile;