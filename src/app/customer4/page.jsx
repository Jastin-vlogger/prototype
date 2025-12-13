"use client";
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
  Timer, Flame, Watch, Receipt, Globe
} from 'lucide-react';

// --- TRANSLATION DATA ---
const TRANSLATIONS = {
  en: {
    home: "Home",
    shop: "Shop Now",
    categories: "Categories",
    services: "Book Services",
    wishlist: "My Wishlist",
    about: "About Us",
    contact: "Contact",
    cart: "My Cart",
    search: "Search 'Fresh Chicken' or say 'Add Fish 2'...",
    deliverTo: "Deliver to",
    dailyDeals: "Today's Deals",
    exclusiveOffers: "Exclusive Offers",
    viewAll: "View All",
    moveToCart: "Move to Cart",
    removeItem: "Remove Item",
    wishlistEmpty: "Your wishlist is empty",
    startBrowsing: "Start Browsing",
    orderSummary: "Order Summary",
    checkout: "Checkout",
    placeOrder: "Place Order",
    products: "Products",
    getApp: "Get the SkyMarket App",
    b2bPartner: "UAE's Premier Restaurant Supply Partner",
    onePlatform: "One Platform.",
    startShopping: "Start Shopping",
    backToShop: "Back to Shop",
    backToHome: "Back to Home",
    backToCategories: "Back to Categories",
    orderStatus: "Order Status Timeline",
    orderID: "Order ID:",
    orderDate: "Order Date:",
    payment: "Payment:",
    hotDeals: "Hot Deals",
    premiumProducts: "Premium Products",
    expertServices: "Expert Services",
    viewSubcategories: "View Subcategories",
    browse: "Browse",
    orderTracking: "Order Tracking",
    orderPlaced: "Order Placed",
    confirmedPreparing: "Confirmed & Preparing",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    shippingAddress: "Shipping Address",
    paymentMethod: "Payment Method",
    reviewConfirm: "Review & Confirm",
  },
  ar: {
    home: "الرئيسية",
    shop: "تسوق الآن",
    categories: "الفئات",
    services: "حجز خدمات",
    wishlist: "قائمة الأمنيات",
    about: "من نحن",
    contact: "اتصل بنا",
    cart: "سلتي",
    search: "ابحث عن 'دجاج طازج' أو قل 'أضف سمك 2'...",
    deliverTo: "التوصيل إلى",
    dailyDeals: "عروض اليوم",
    exclusiveOffers: "عروض حصرية",
    viewAll: "عرض الكل",
    moveToCart: "نقل إلى السلة",
    removeItem: "إزالة المنتج",
    wishlistEmpty: "قائمة الأمنيات فارغة",
    startBrowsing: "ابدأ التصفح",
    orderSummary: "ملخص الطلب",
    checkout: "إتمام الشراء",
    placeOrder: "إرسال الطلب",
    products: "المنتجات",
    getApp: "احصل على تطبيق SkyMarket",
    b2bPartner: "شريك التوريد الأول للمطاعم في الإمارات",
    onePlatform: "منصة واحدة.",
    startShopping: "ابدأ التسوق",
    backToShop: "العودة للتسوق",
    backToHome: "العودة للرئيسية",
    backToCategories: "العودة للفئات",
    orderStatus: "الجدول الزمني لحالة الطلب",
    orderID: "رقم الطلب:",
    orderDate: "تاريخ الطلب:",
    payment: "طريقة الدفع:",
    hotDeals: "صفقات ساخنة",
    premiumProducts: "منتجات ممتازة",
    expertServices: "خدمات متخصصة",
    viewSubcategories: "عرض الفئات الفرعية",
    browse: "تصفح",
    orderTracking: "تتبع الطلب",
    orderPlaced: "تم تقديم الطلب",
    confirmedPreparing: "تم التأكيد والتحضير",
    outForDelivery: "في الطريق للتوصيل",
    delivered: "تم التوصيل",
    shippingAddress: "عنوان الشحن",
    paymentMethod: "طريقة الدفع",
    reviewConfirm: "المراجعة والتأكيد",
  },
  jp: {
    home: "ホーム",
    shop: "今すぐ購入",
    categories: "カテゴリー",
    services: "サービス予約",
    wishlist: "ウィッシュリスト",
    about: "会社概要",
    contact: "お問い合わせ",
    cart: "カート",
    search: "「生鶏肉」を検索、または「魚を2つ追加」と言ってください...",
    deliverTo: "配達先",
    dailyDeals: "今日のセール",
    exclusiveOffers: "限定オファー",
    viewAll: "すべて表示",
    moveToCart: "カートへ移動",
    removeItem: "アイテムを削除",
    wishlistEmpty: "ウィッシュリストは空です",
    startBrowsing: "閲覧開始",
    orderSummary: "注文概要",
    checkout: "チェックアウト",
    placeOrder: "注文確定",
    products: "製品",
    getApp: "SkyMarketアプリを入手",
    b2bPartner: "UAEを代表するレストランサプライヤー",
    onePlatform: "単一プラットフォーム。",
    startShopping: "ショッピング開始",
    backToShop: "ショップに戻る",
    backToHome: "ホームに戻る",
    backToCategories: "カテゴリーに戻る",
    orderStatus: "注文ステータスのタイムライン",
    orderID: "注文ID:",
    orderDate: "注文日:",
    payment: "支払い方法:",
    hotDeals: "ホットディール",
    premiumProducts: "プレミアム製品",
    expertServices: "専門サービス",
    viewSubcategories: "サブカテゴリーを見る",
    browse: "閲覧",
    orderTracking: "注文追跡",
    orderPlaced: "注文完了",
    confirmedPreparing: "確認・準備中",
    outForDelivery: "配送中",
    delivered: "配達済み",
    shippingAddress: "配送先住所",
    paymentMethod: "支払い方法",
    reviewConfirm: "確認と確定",
  }
};

const LANG_OPTIONS = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'jp', name: '日本語' },
];

// --- MOCK DATA REMAINS THE SAME ---

const SEASONAL_SLIDES = [
  {
    id: 1,
    title: "Fresh Harvest Festival",
    subtitle: "Organic Fruits & Vegetables from Local Farms",
    discount: "Up to 60% OFF",
    bgImage: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-green-900/90 via-emerald-900/80 to-teal-900/40",
    accent: "text-green-400",
    buttonColor: "bg-green-400 text-emerald-900"
  },
  {
    id: 2,
    title: "Butcher's Weekly Special",
    subtitle: "Premium Cuts of Wagyu, Lamb & Poultry",
    discount: "Buy 2 Get 1 Free",
    bgImage: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-rose-900/90 via-red-900/80 to-transparent",
    accent: "text-rose-400",
    buttonColor: "bg-rose-500 text-white"
  },
  {
    id: 3,
    title: "Mega Pantry Stock-Up",
    subtitle: "Bulk Savings on Rice, Oil, Spices & More",
    discount: "Flat 40% OFF",
    bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
    gradient: "from-amber-900/90 via-orange-900/80 to-transparent",
    accent: "text-amber-400",
    buttonColor: "bg-amber-400 text-amber-900"
  }
];

const TODAYS_DEALS = [
  {
    id: 'td1',
    name: "Australian Angus Ribeye (250g)",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400",
    price: 45,
    original: 65,
    discount: "30% OFF",
    endsIn: 12400, // seconds remaining
    endTime: "08:30 PM",
    tag: "Deal of the Day"
  },
  {
    id: 'td2',
    name: "Organic Strawberries (500g)",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=400",
    price: 15,
    original: 25,
    discount: "40% OFF",
    endsIn: 8600,
    endTime: "07:15 PM",
    tag: "Best Seller"
  },
  {
    id: 'td3',
    name: "Royal Basmati Rice (5kg)",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    price: 35,
    original: 55,
    discount: "36% OFF",
    endsIn: 18000,
    endTime: "10:00 PM",
    tag: "Limited Time"
  },
  {
    id: 'td4',
    name: "Extra Virgin Olive Oil (1L)",
    image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=400",
    price: 28,
    original: 45,
    discount: "38% OFF",
    endsIn: 5000,
    endTime: "06:00 PM",
    tag: "Flash Deal"
  }
];

const OFFERS_DATA = [
  {
    id: 1,
    title: "Organic Veggie Bundle",
    subtitle: "Farm to Table Freshness",
    discount: "30% OFF",
    code: "VEG30",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&q=80&w=800",
    gradient: "from-green-600/90 to-emerald-900/90",
    textColor: "text-emerald-100"
  },
  {
    id: 2,
    title: "Premium Nuts Collection",
    subtitle: "Almonds, Cashews & Walnuts",
    discount: "AED 50 OFF",
    code: "NUTS50",
    image: "https://images.unsplash.com/photo-1536591375315-1988d6960991?auto=format&fit=crop&q=80&w=800",
    gradient: "from-amber-700/90 to-orange-900/90",
    textColor: "text-amber-100"
  },
  {
    id: 3,
    title: "Fresh Seafood Platter",
    subtitle: "Weekend Special Catch",
    discount: "Buy 1 Get 1 Free",
    code: "SEAFOOD",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
    gradient: "from-blue-600/90 to-indigo-900/90",
    textColor: "text-blue-100"
  },
  {
     id: 4,
     title: "Exotic Fruit Basket",
     subtitle: "Dragon Fruit, Mango & More",
     discount: "20% Cashback",
     code: "FRUIT20",
     image: "https://images.unsplash.com/photo-1519996529931-28324d1a290f?auto=format&fit=crop&q=80&w=800",
     gradient: "from-rose-600/90 to-red-800/90",
     textColor: "text-rose-100"
  },
  {
      id: 5,
      title: "Bulk Pantry Essentials",
      subtitle: "Rice, Oil & Spices",
      discount: "15% OFF Bulk",
      code: "PANTRY15",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800",
      gradient: "from-purple-600/90 to-indigo-900/90",
      textColor: "text-purple-100"
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
      textGradient: 'from-blue-400 via-indigo-500 to-violet-500',
      accent: 'text-blue-500',
      subCardBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      buttonGradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/30',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'AC Repair', icon: <Snowflake className="w-6 h-6"/> },
          { name: 'Electrical', icon: <Zap className="w-6 h-6"/> },
          { name: 'Plumbing', icon: <Droplet className="w-6 h-6"/> },
          { name: 'Painting', icon: <PenTool className="w-6 h-6"/> }
      ]
    },
    {
      id: 'furniture',
      title: 'Furniture',
      icon: <Armchair className="w-8 h-8" />,
      textGradient: 'from-fuchsia-400 via-purple-500 to-pink-500',
      accent: 'text-fuchsia-500',
      subCardBg: 'bg-gradient-to-br from-fuchsia-600 to-purple-600',
      buttonGradient: 'bg-gradient-to-r from-fuchsia-600 to-purple-600',
      glow: 'shadow-fuchsia-500/30',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Office Chairs', icon: <Armchair className="w-6 h-6"/> },
          { name: 'Desks', icon: <Layout className="w-6 h-6"/> },
          { name: 'Sofas', icon: <Armchair className="w-6 h-6"/> },
          { name: 'Storage', icon: <Box className="w-6 h-6"/> }
      ]
    },
    {
      id: 'pest',
      title: 'Pest Control',
      icon: <Bug className="w-8 h-8" />,
      textGradient: 'from-red-400 via-rose-500 to-pink-500',
      accent: 'text-red-500',
      subCardBg: 'bg-gradient-to-br from-red-600 to-rose-600',
      buttonGradient: 'bg-gradient-to-r from-red-600 to-rose-600',
      glow: 'shadow-red-500/30',
      image: 'https://images.unsplash.com/photo-1632838320392-ae701d006c82?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Residential', icon: <Home className="w-6 h-6"/> },
          { name: 'Commercial', icon: <Layout className="w-6 h-6"/> },
          { name: 'Fumigation', icon: <Bug className="w-6 h-6"/> },
          { name: 'Termite', icon: <Shield className="w-6 h-6"/> }
      ]
    },
    {
      id: 'equipment',
      title: 'Equipment',
      icon: <Monitor className="w-8 h-8" />,
      textGradient: 'from-violet-400 via-purple-500 to-indigo-500',
      accent: 'text-violet-500',
      subCardBg: 'bg-gradient-to-br from-violet-600 to-purple-600',
      buttonGradient: 'bg-gradient-to-r from-violet-600 to-purple-600',
      glow: 'shadow-violet-500/30',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
      subcategories: [
          { name: 'Ovens', icon: <Box className="w-6 h-6"/> },
          { name: 'Mixers', icon: <Zap className="w-6 h-6"/> },
          { name: 'Freezers', icon: <Snowflake className="w-6 h-6"/> },
          { name: 'Grills', icon: <Layout className="w-6 h-6"/> }
      ]
    }
  ]
};

const CATEGORY_FILTERS = {
  'Fruits & Veg': {
      title: 'Produce Specs',
      options: ['Organic', 'Locally Grown', 'Hydroponic', 'Pre-Cut & Peeled', 'Bundle Offers']
  },
  'Fish & Seafood': {
      title: 'Seafood Type',
      options: ['Wild Caught', 'Farm Raised', 'Sashimi Grade', 'Whole Fish', 'Fillets']
  },
  'Fresh Chicken': {
      title: 'Poultry Options',
      options: ['Free Range', 'Corn Fed', 'Antibiotic Free', 'Marinated', 'Whole Bird']
  },
  'Organic': {
      title: 'Certifications',
      options: ['USDA Organic', 'EU Organic', 'Bio-Dynamic', 'Non-GMO Project']
  },
  'Pantry': {
      title: 'Dietary & Origin',
      options: ['Gluten Free', 'Vegan', 'Keto Friendly', 'Imported', 'Local Favorites']
  },
  'Frozen Goods': {
      title: 'Frozen Type',
      options: ['Ready to Eat', 'Cook form Frozen', 'No Preservatives', 'Family Packs']
  },
  'default': {
      title: 'Popular Filters',
      options: ['On Sale', 'Best Sellers', 'New Arrivals', 'Express Delivery']
  }
};

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Fresh Salmon Fillet',
    mainCategory: 'Fresh Market',
    subCategory: 'Fish & Seafood',
    category: 'Fish & Seafood',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviews: 124,
    discount: '18% OFF',
    isTimeLimited: true,
    images: [
      'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sustainably sourced, sashimi-grade Norwegian salmon fillet. Rich in Omega-3 fatty acids and perfect for grilling, baking, or pan-searing. Delivered fresh daily in temperature-controlled packaging.',
    offers: [
        { title: 'Bank Offer', desc: '5% Instant Discount on ADCB Cards' },
        { title: 'Partner Offer', desc: 'Buy 2 get 10% off on frozen veggies' }
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
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Large, juicy tiger prawns perfect for curries or grilling.',
    offers: []
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
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Free-range, antibiotic-free whole organic chicken. Raised on natural grain feed for superior taste and texture. Ideal for roasting.',
    offers: [
        { title: 'Coupon', desc: 'Save AED 5 with code FRESH5' }
    ]
  },
  {
    id: 3,
    name: 'Farm Fresh Avocados (Kg)',
    mainCategory: 'Fresh Market',
    subCategory: 'Fruits & Veg',
    category: 'Fruits & Veg',
    price: 18.00,
    originalPrice: 22.00,
    rating: 4.9,
    reviews: 210,
    discount: 'Deal of Day',
    isTimeLimited: true,
    images: [
      'https://images.unsplash.com/photo-1523049673856-356c3047010d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Creamy, ripe Hass avocados perfect for guacamole, toast, or salads. Hand-picked at peak ripeness.',
    offers: []
  },
  {
    id: 4,
    name: 'Organic Raw Honey (500g)',
    mainCategory: 'Pantry',
    subCategory: 'Spices', 
    category: 'Pantry',
    price: 45.00,
    originalPrice: 60.00,
    rating: 5.0,
    reviews: 45,
    discount: '25% OFF',
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587049352851-8d4e8918d2f9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Pure, raw organic honey sourced from wild flower meadows. Rich in antioxidants and natural enzymes. Unfiltered and unpasteurized.',
    offers: [
        { title: 'Bulk Buy', desc: 'Buy 2 Get 1 Free' }
    ]
  },
  {
    id: 5,
    name: 'Frozen Green Peas (500g)',
    mainCategory: 'Frozen Goods',
    subCategory: 'Vegetables',
    category: 'Vegetables',
    price: 8.50,
    originalPrice: 10.00,
    rating: 4.5,
    reviews: 65,
    discount: '10% OFF',
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1593010959062-09945a0b7794?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sweet and tender garden peas, flash-frozen to lock in nutrients and flavor.',
    offers: []
  },
  {
    id: 6,
    name: 'Vanilla Bean Ice Cream (1L)',
    mainCategory: 'Frozen Goods',
    subCategory: 'Ice Cream',
    category: 'Ice Cream',
    price: 25.00,
    originalPrice: 32.00,
    rating: 4.9,
    reviews: 300,
    discount: 'Best Seller',
    isTimeLimited: false,
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Rich and creamy vanilla ice cream made with real Madagascar vanilla beans.',
    offers: []
  },
  {
    id: 7,
    name: 'Extra Virgin Olive Oil (5L)',
    mainCategory: 'Pantry',
    subCategory: 'Oils & Ghee',
    category: 'Oils & Ghee',
    price: 180.00,
    originalPrice: 220.00,
    rating: 4.8,
    reviews: 92,
    discount: 'Save AED 40',
    isTimeLimited: true,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Cold-pressed extra virgin olive oil. Ideal for dressings, cooking, and baking. Imported from Spain.',
    offers: []
  }
];

// --- HELPER FUNCTIONS ---
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const SeasonalHeroSlider = ({ isDarkMode = true, onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SEASONAL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
             <span className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs mb-2 block flex items-center gap-2 drop-shadow-sm">
                 <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 inline-block"></span>
                 Fresh Updates
             </span>
             <h2 className={`text-3xl font-bold drop-shadow-md ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Offers</span></h2>
        </div>
      </div>

      <div className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
        {SEASONAL_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image */}
            <img src={slide.bgImage} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center items-start z-20">
              <span className={`px-4 py-2 rounded-full border bg-black/30 backdrop-blur-md text-white font-bold uppercase tracking-widest text-xs mb-6 border-white/20 animate-fade-in`}>
                {slide.discount}
              </span>
              <h2 className={`text-5xl md:text-7xl font-black text-white mb-4 leading-none drop-shadow-xl animate-slide-in-right`}>
                {slide.title}
              </h2>
              <p className={`text-xl md:text-3xl font-light text-white/90 mb-8 max-w-xl animate-fade-in`}>
                {slide.subtitle}
              </p>
              <button 
                onClick={onShopNow} 
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform ${slide.buttonColor}`}
              >
                Shop the Sale
              </button>
            </div>
          </div>
        ))}
        
        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {SEASONAL_SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TodaysDealsSlider = ({ isDarkMode = true, onAddToCart, onDealClick, t }) => {
  const scrollRef = useRef(null);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
         const newTimers = { ...prev };
         TODAYS_DEALS.forEach(deal => {
           const current = newTimers[deal.id] !== undefined ? newTimers[deal.id] : deal.endsIn;
           newTimers[deal.id] = current > 0 ? current - 1 : 0;
         });
         return newTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const cardClass = isDarkMode ? 'bg-slate-800/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-200 shadow-lg';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
             <span className="text-rose-400 font-bold tracking-[0.2em] uppercase text-xs mb-2 block flex items-center gap-2 drop-shadow-sm">
                 <span className="w-8 h-[2px] bg-gradient-to-r from-rose-400 to-orange-400 inline-block"></span>
                 {t('hotDeals')}
             </span>
             <h2 className={`text-3xl font-bold drop-shadow-md ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('dailyDeals')}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className={`p-2 rounded-full border ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}>
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <button onClick={() => scroll('right')} className={`p-2 rounded-full border ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}>
            <ArrowRight className="w-5 h-5"/>
          </button>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        {TODAYS_DEALS.map((deal) => (
          <div 
            key={deal.id} 
            onClick={() => onDealClick && onDealClick(deal)}
            className={`min-w-[280px] md:min-w-[320px] snap-center p-4 rounded-[2rem] border relative group transition-all hover:-translate-y-2 cursor-pointer ${cardClass}`}
          >
             <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
               {deal.discount}
             </div>
             <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-white">
               <img src={deal.image} alt={deal.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
             </div>
             <div className="space-y-2">
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 text-rose-500 text-xs font-bold">
                     <Timer className="w-3 h-3" />
                     <span>Ends in {formatTime(timers[deal.id] !== undefined ? timers[deal.id] : deal.endsIn)}</span>
                   </div>
                   <div className="flex items-center gap-2 text-gray-500 text-xs font-medium pl-5">
                       <Watch className="w-3 h-3" />
                       <span>Ends at {deal.endTime}</span>
                   </div>
               </div>
               
               <h4 className={`font-bold text-lg truncate ${textClass}`}>{deal.name}</h4>
               <div className="flex items-baseline gap-2">
                 <span className={`text-xl font-bold ${textClass}`}>AED {deal.price}</span>
                 <span className={`text-sm line-through ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>AED {deal.original}</span>
               </div>
               <button 
                 onClick={(e) => { 
                    e.stopPropagation();
                    onAddToCart && onAddToCart(deal.name);
                 }} 
                 className="w-full mt-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-500 transition-colors"
               >
                 Add to Cart
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OneFile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [activeFilter, setActiveFilter] = useState({ main: null, sub: null }); 
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); 
  const [viewingCategory, setViewingCategory] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null); 
  const [scrolled, setScrolled] = useState(false);
  
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [cart, setCart] = useState([
      { name: 'Fresh Chicken', qty: 2 }, 
      { name: 'Organic Raw Honey (500g)', qty: 1 }
  ]);
  
  const [wishlist, setWishlist] = useState([
      MOCK_PRODUCTS.find(p => p.id === 1), 
      MOCK_PRODUCTS.find(p => p.id === 3) 
  ].filter(Boolean)); 
  
  const [toast, setToast] = useState(null); 

  const [isWidgetListening, setIsWidgetListening] = useState(false);
  const [widgetTranscript, setWidgetTranscript] = useState("");

  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const [isOfferHovered, setIsOfferHovered] = useState(false); 
  
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0); 
  const heroRef = useRef(null);
  
  const offerSliderRef = useRef(null);
  
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [mockAddresses, setMockAddresses] = useState([
      { id: 1, name: "Central Warehouse 1", line1: "Industrial City, Plot 4A", city: "Dubai", phone: "50-1234567" },
      { id: 2, name: "Cloud Kitchen - JLT", line1: "JLT Cluster Q, Unit 501", city: "Dubai", phone: "55-9876543" },
  ]);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(null);

  const [currentTrack, setCurrentTrack] = useState(1);
  const totalSteps = 4;
  
  // --- NEW STATE: Language ---
  const [currentLang, setCurrentLang] = useState('en');

  // --- NEW STATE: Service Booking ---
  const [selectedServiceBooking, setSelectedServiceBooking] = useState(null);
  const [serviceBookingStep, setServiceBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
      description: '',
      datePreference: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
  });
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  // --- END NEW STATE ---


  const t = useCallback((key) => {
    return TRANSLATIONS[currentLang][key] || key;
  }, [currentLang]);
  // --- END Language State/Function ---


  const mockTrackingSteps = [
      { statusKey: 'orderPlaced', time: '10:00 AM', icon: <ClipboardCheck className="w-5 h-5"/> },
      { statusKey: 'confirmedPreparing', time: '10:15 AM', icon: <Soup className="w-5 h-5"/> },
      { statusKey: 'outForDelivery', time: '12:30 PM', icon: <Truck className="w-5 h-5"/> },
      { statusKey: 'delivered', time: '01:45 PM', icon: <CheckCircle className="w-5 h-5"/> },
  ];

  const heroTexts = [
    { text: "For Fine Dining.", gradient: "from-indigo-400 via-purple-400 to-pink-400" },
    { text: "For Busy Cafes.", gradient: "from-rose-400 via-orange-400 to-yellow-400" },
    { text: "For Cloud Kitchens.", gradient: "from-emerald-400 via-teal-400 to-cyan-400" },
    { text: "For 5-Star Hotels.", gradient: "from-blue-400 via-cyan-400 to-sky-400" }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
            if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            return prev; 
        });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tracking simulation effect
  useEffect(() => {
    let interval;
    if (currentView === 'order-tracking' && orderPlaced && currentTrack < totalSteps) {
      interval = setInterval(() => {
        setCurrentTrack(prev => (prev < totalSteps ? prev + 1 : prev));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentView, orderPlaced, currentTrack]);


  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const allSearchableItems = useMemo(() => {
    let items = [];
    [...CATEGORIES_DATA.products, ...CATEGORIES_DATA.services].forEach(cat => {
        cat.subcategories.forEach(sub => {
            items.push({ name: sub.name, type: 'Subcategory', parent: cat.title });
        });
        items.push({ name: cat.title, type: 'Category' });
    });
    return items;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev + 1) % heroTexts.length);
      setFadeKey((prev) => prev + 1); 
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOfferHovered) return;

    const interval = setInterval(() => {
        if (offerSliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = offerSliderRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 20) {
                offerSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                offerSliderRef.current.scrollBy({ left: 350, behavior: 'smooth' }); 
            }
        }
    }, 3500); 

    return () => clearInterval(interval);
  }, [isOfferHovered]);

  useEffect(() => {
      handleLocationFetch();
  }, []);

  const handleLocationFetch = () => {
    setIsLocating(true);
    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setTimeout(() => {
                    setLocation("Business Bay, Dubai"); 
                    setIsLocating(false);
                }, 1500);
            },
            (error) => {
                let errorMessage = "Location access denied or unavailable.";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                        break;
                }
                
                console.warn("Geolocation warning:", errorMessage); 
                
                setIsLocating(false);
                
                if (!location) {
                    setLocation("Dubai, UAE"); 
                }
            },
            { timeout: 5000, maximumAge: 0 } 
        );
    } else {
        setIsLocating(false);
        showToast("Geolocation is not supported by this browser.", "error");
    }
  };

  const processCommand = (command, source = 'header') => {
      const cleanCmd = command.replace(/^(add|search|find)\s+(with\s+|for\s+)?/i, "$1 ").trim();

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
              item.name.toLowerCase().includes(potentialItemName.toLowerCase())
          );

          if (matchedItem) {
              addToCart(matchedItem.name, quantity);
              showToast(`Added ${quantity} ${matchedItem.name}(s) to cart!`, "success");
          } else {
              showToast(`Could not find item: ${potentialItemName}`, "info");
          }
      } 
      else if (cleanCmd.startsWith("search") || cleanCmd.startsWith("find")) {
          const query = cleanCmd.replace(/search|find/g, "").trim();
          showToast(`Searching for: ${query}`, "info");
          if (source === 'header') setTranscript(query);
      } else {
          showToast("Command not recognized. Try 'Add [Item] [Qty]'", "info");
      }
  };

  const startVoiceRecognition = (source = 'header') => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        showToast("Voice search not supported in this browser.", "info");
        simulateVoiceCommand(source); 
        return;
    }

    const recognition = new SpeechRecognition();
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
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        if (source === 'header') setTranscript(currentTranscript);
        else setWidgetTranscript(currentTranscript);

        if (event.results[0].isFinal) {
           processCommand(currentTranscript.toLowerCase(), source);
           if (source === 'widget') setTimeout(() => setWidgetTranscript(""), 2000); 
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (source === 'header') setIsVoiceListening(false);
        else setIsWidgetListening(false);
        showToast("Voice recognition failed. Try again.", "info");
    };

    recognition.start();
  };

  const simulateVoiceCommand = (source) => {
      if (source === 'header') setIsVoiceListening(true);
      else setIsWidgetListening(true);

      const mockCommand = "add fresh chicken 5"; 
      
      if (source === 'header') setTranscript("Listening...");
      else setWidgetTranscript("Listening...");

      setTimeout(() => {
          if (source === 'header') setTranscript(mockCommand);
          else setWidgetTranscript(mockCommand);
          
          processCommand(mockCommand, source);
          
          if (source === 'header') setIsVoiceListening(false);
          else {
              setIsWidgetListening(false);
              setTimeout(() => setWidgetTranscript(""), 2000);
          }
      }, 2000);
  };

  const addToCart = (itemName, quantity) => {
      setCart(prev => {
          const existing = prev.find(i => i.name === itemName);
          if (existing) {
              return prev.map(i => i.name === itemName ? { ...i, qty: i.qty + quantity } : i);
          }
          return [...prev, { name: itemName, qty: quantity }];
      });
  };

  const updateCartQty = (itemName, delta) => {
      setCart(prev => prev.map(item => {
          if (item.name === itemName) {
              return { ...item, qty: Math.max(1, item.qty + delta) };
          }
          return item;
      }));
  };

  const removeFromCart = (itemName) => {
      setCart(prev => prev.filter(item => item.name !== itemName));
  };

  const addToWishlist = (product) => {
      if (!wishlist.find(item => item.id === product.id)) {
          setWishlist(prev => [...prev, product]);
          showToast(`Added ${product.name} to wishlist!`, "success");
      } else {
          setWishlist(prev => prev.filter(item => item.id !== product.id)); 
          showToast(`Removed ${product.name} from wishlist.`, "info");
      }
  };

  const removeFromWishlist = (productId) => {
      setWishlist(prev => prev.filter(item => item.id !== productId));
      showToast("Item removed from wishlist.", "info");
  };

  const moveToCart = (product) => {
      removeFromWishlist(product.id); 
      addToCart(product.name, 1); 
      setCurrentView('cart'); 
      showToast(`Moved ${product.name} to cart!`, "success");
  };

  const handleApplyPromo = () => {
    if (!promoCodeInput) return;
    const code = promoCodeInput.toUpperCase().trim();
    
    const promos = {
        'VEG30': { type: 'percent', value: 0.30 },
        'NUTS50': { type: 'flat', value: 50 },
        'SEAFOOD': { type: 'percent', value: 0.50 }, 
        'FRUIT20': { type: 'percent', value: 0.20 },
        'PANTRY15': { type: 'percent', value: 0.15 },
        'FRESH5': { type: 'flat', value: 5 },
        'MEGA50': { type: 'percent', value: 0.50 },
        'BULK': { type: 'percent', value: 0.33 },
        'FLASH30': { type: 'percent', value: 0.30 },
        'WELCOME20': { type: 'percent', value: 0.20 },
        'SKY10': { type: 'percent', value: 0.10 }
    };

    if (promos[code]) {
        setAppliedPromo({ code, ...promos[code] });
        showToast(`Promo code ${code} applied!`, "success");
        setPromoCodeInput("");
    } else {
        showToast("Invalid promo code", "error");
    }
  };

  const removePromo = () => {
      setAppliedPromo(null);
      showToast("Promo code removed", "info");
  };

  const getItemDetails = (name) => {
    const mockP = MOCK_PRODUCTS.find(p => p.name === name);
    if (mockP) return { image: mockP.images[0], icon: <Package className="w-6 h-6"/>, category: mockP.category, price: mockP.price };

    for (const cat of [...CATEGORIES_DATA.products, ...CATEGORIES_DATA.services]) {
        for (const sub of cat.subcategories) {
            if (sub.name === name) {
                return {
                    image: cat.image,
                    icon: sub.icon,
                    category: cat.title,
                    price: 24.99 
                };
            }
        }
    }
    return { 
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200', 
        icon: <Box className="w-6 h-6"/>, 
        category: 'General',
        price: 19.99 
    };
  };

  const showToast = (message, type = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4000);
  };

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const handleProductClick = (product) => {
      setSelectedProduct(product);
      setCurrentView('product-detail');
      window.scrollTo(0,0);
  };

  const handleCategoryClick = (type, value) => {
      setActiveFilter({ main: type === 'main' ? value : null, sub: type === 'sub' ? value : null });
      setCurrentView('shop');
      window.scrollTo(0,0);
  };
  
  const scrollOfferSlider = (direction) => {
      if(offerSliderRef.current) {
          const scrollAmount = direction === 'left' ? -400 : 400;
          offerSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };
  
  const copyToClipboard = (code) => {
      navigator.clipboard.writeText(code);
      showToast(`Coupon code ${code} copied!`, "success");
  };

  const appBgClass = isDarkMode ? 'bg-[#0B1120] text-slate-200' : 'bg-gray-50 text-gray-900';
  const cardClass = isDarkMode ? 'glass-dark' : 'glass-light shadow-xl border-gray-200';
  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-gray-600';
  const textHeadingClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const inputBgClass = isDarkMode ? 'bg-[#1E293B]/80 border-white/10 text-slate-200 placeholder-slate-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500';
  const mobileMenuBg = isDarkMode ? 'bg-[#0B1120]' : 'bg-white';
  const mobileMenuItemBg = isDarkMode ? 'bg-[#1E293B] text-white' : 'bg-gray-100 text-gray-900';

  const calculateTotals = () => {
    const subtotal = cart.reduce((acc, item) => {
        const details = getItemDetails(item.name);
        return acc + (details.price * item.qty);
    }, 0);
    
    let discountAmount = 0;
    if (appliedPromo) {
        if (appliedPromo.type === 'percent') {
            discountAmount = subtotal * appliedPromo.value;
        } else if (appliedPromo.type === 'flat') {
            discountAmount = appliedPromo.value;
        }
        if (discountAmount > subtotal) discountAmount = subtotal;
    }

    const taxRate = 0.05;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * taxRate;
    const shipping = 0.00;
    const total = taxableAmount + tax + shipping;

    return { subtotal, tax, shipping, total, discountAmount };
  };

  const OrderSummaryCard = useCallback(({ totals, buttonText, buttonAction, buttonDisabled = false, isReadOnly = false, items = [] }) => (
    <div className={`sticky top-32 p-8 rounded-[2rem] border ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <h3 className={`text-xl font-bold mb-6 ${textHeadingClass}`}>{t('orderSummary')}</h3>
      
      {/* Read Only Items List for Checkout/Order Page */}
      {isReadOnly && items.length > 0 && (
        <div className="mb-6 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
           {items.map((item, i) => (
             <div key={i} className="flex justify-between text-sm">
                <span className={textMutedClass}>{item.qty}x {item.name}</span>
                <span className={`font-medium ${textHeadingClass}`}>AED {(getItemDetails(item.name).price * item.qty).toFixed(2)}</span>
             </div>
           ))}
           <div className={`h-px w-full my-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        </div>
      )}

      {/* Promo Code Input Section */}
      {!isReadOnly && (
          <div className="mb-6">
              {!appliedPromo ? (
                  <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Promo Code" 
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        className={`flex-1 py-2 px-4 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 transition-all uppercase ${inputBgClass}`}
                      />
                      <button 
                        onClick={handleApplyPromo}
                        className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-500 font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all"
                      >
                        Apply
                      </button>
                  </div>
              ) : (
                  <div className={`flex justify-between items-center p-3 rounded-xl border ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                      <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-bold text-emerald-500">{appliedPromo.code} Applied</span>
                      </div>
                      <button onClick={removePromo} className="text-rose-500 hover:bg-rose-500/10 p-1 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                      </button>
                  </div>
              )}
          </div>
      )}

      <div className="space-y-4 mb-8">
          <div className={`flex justify-between text-sm ${textMutedClass}`}>
              <span>Subtotal ({items.length || cart.length} items)</span>
              <span>AED {totals.subtotal.toFixed(2)}</span>
          </div>
          
          {/* Discount Row */}
          {totals.discountAmount > 0 && (
            <div className={`flex justify-between text-sm font-medium text-emerald-500 animate-fade-in`}>
                <span>Discount</span>
                <span>- AED {totals.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className={`flex justify-between text-sm ${textMutedClass}`}>
              <span>Tax (5%)</span>
              <span>AED {totals.tax.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between text-sm ${textMutedClass}`}>
              <span>Shipping</span>
              <span className="text-emerald-500">Free</span>
          </div>
          <div className={`h-px w-full my-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          <div className={`flex justify-between text-xl font-bold ${textHeadingClass}`}>
              <span>Total</span>
              <span>AED {totals.total.toFixed(2)}</span>
          </div>
      </div>
      {buttonText && (
          <button 
              onClick={buttonAction}
              disabled={buttonDisabled}
              className={`w-full py-4 rounded-xl font-bold shadow-lg transition-transform ${buttonDisabled ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20 hover:scale-[1.02]'}`}
          >
              {buttonText}
          </button>
      )}
    </div>
  ), [cart.length, isDarkMode, cardClass, textHeadingClass, textMutedClass, promoCodeInput, appliedPromo, inputBgClass, t]);

  const renderOfferSection = () => (
    <section className="py-12 relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
            <div>
                 <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-2 block flex items-center gap-2">
                     <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500 inline-block"></span>
                     {t('hotDeals')}
                 </span>
                 <h2 className={`text-3xl font-bold ${textHeadingClass}`}>{t('exclusiveOffers')}</h2>
            </div>
            <div className="flex gap-2">
                <button onClick={() => scrollOfferSlider('left')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button onClick={() => scrollOfferSlider('right')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div 
            ref={offerSliderRef}
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}
            onTouchStart={() => setIsOfferHovered(true)}
            onTouchEnd={() => setIsOfferHovered(false)}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {OFFERS_DATA.map((offer) => (
                <div 
                    key={offer.id} 
                    className={`snap-center shrink-0 w-[85vw] md:w-[400px] h-[500px] rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                >
                    {/* Background Image */}
                    <img 
                        src={offer.image} 
                        alt={offer.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/1e293b/ffffff?text=" + offer.title.replace(/ /g, "+"); }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient}`}></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="mb-auto">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in">
                                Limited Time
                            </span>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className={`text-3xl font-bold leading-tight mb-2 text-white`}>{offer.title}</h3>
                                <p className={`text-lg font-medium opacity-90 ${offer.textColor}`}>{offer.subtitle}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                                <div className="p-3 bg-white/20 rounded-xl text-white">
                                    <Percent className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xl">{offer.discount}</p>
                                    <p className="text-white/70 text-xs">Use Code: <span className="font-mono font-bold text-white">{offer.code}</span></p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => copyToClipboard(offer.code)}
                                    className="p-4 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors"
                                    title="Copy Code"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setCurrentView('shop')}
                                    className="flex-1 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                                >
                                    {t('shop')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );

  const renderShopPage = () => {
      const filteredProducts = MOCK_PRODUCTS.filter(product => {
          if (activeFilter.sub) {
              return product.subCategory === activeFilter.sub;
          }
          if (activeFilter.main) {
              return product.mainCategory === activeFilter.main;
          }
          return true;
      });

      let dynamicFilters = CATEGORY_FILTERS['default'];
      if (activeFilter.sub && CATEGORY_FILTERS[activeFilter.sub]) {
          dynamicFilters = CATEGORY_FILTERS[activeFilter.sub];
      } else if (activeFilter.main && CATEGORY_FILTERS[activeFilter.main]) {
          dynamicFilters = CATEGORY_FILTERS[activeFilter.main];
      }

      const currentCategoryTitle = activeFilter.sub || activeFilter.main || "All Products";
      const shopOffers = [
          {
              id: 's1',
              title: `Mega Deal: ${currentCategoryTitle}`,
              subtitle: "Limited time discounts on top rated items",
              discount: "Up to 50% OFF",
              code: "MEGA50",
              image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
              gradient: "from-indigo-600/90 to-purple-600/90"
          },
          {
              id: 's2',
              title: "Bulk Saver Special",
              subtitle: `Stock up on ${currentCategoryTitle} today`,
              discount: "Buy 2 Get 1 Free",
              code: "BULK",
              image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
              gradient: "from-emerald-600/90 to-teal-600/90"
          },
          {
              id: 's3',
              title: "Flash Sale Alert",
              subtitle: "Ends in 24 hours. Don't miss out!",
              discount: "Flat 30% OFF",
              code: "FLASH30",
              image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800",
              gradient: "from-rose-600/90 to-orange-600/90"
          }
      ];

      const groupedProducts = {};
      if (activeFilter.sub) {
          groupedProducts[activeFilter.sub] = filteredProducts;
      } else {
          filteredProducts.forEach(p => {
              if (!groupedProducts[p.subCategory]) {
                  groupedProducts[p.subCategory] = [];
              }
              groupedProducts[p.subCategory].push(p);
          });
      }

      return (
          <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
              
              <div className="mb-12">
                   <div className="flex items-center justify-between mb-6">
                       <div>
                           <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-2 block flex items-center gap-2">
                               <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500 inline-block"></span>
                               {t('exclusiveOffers')}
                           </span>
                           <h2 className={`text-2xl font-bold ${textHeadingClass}`}>Deals on <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">{currentCategoryTitle}</span></h2>
                      </div>
                       <div className="flex gap-2">
                          <button onClick={() => scrollOfferSlider('left')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                              <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button onClick={() => scrollOfferSlider('right')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                              <ArrowRight className="w-5 h-5" />
                          </button>
                      </div>
                  </div>

                  <div 
                      ref={offerSliderRef}
                      onMouseEnter={() => setIsOfferHovered(true)}
                      onMouseLeave={() => setIsOfferHovered(false)}
                      onTouchStart={() => setIsOfferHovered(true)}
                      onTouchEnd={() => setIsOfferHovered(false)}
                      className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" 
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                      {shopOffers.map((offer, idx) => (
                           <div 
                              key={idx} 
                              className={`snap-center shrink-0 w-[85vw] md:w-[400px] h-[300px] md:h-[350px] rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                          >
                              <img 
                                  src={offer.image} 
                                  alt={offer.title}
                                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/1e293b/ffffff?text=" + offer.title.replace(/ /g, "+"); }}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient}`}></div>
                              
                               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                  <div className="mb-auto">
                                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                                          {offer.discount}
                                      </span>
                                  </div>
                                  <h3 className={`text-2xl font-bold leading-tight mb-2 text-white drop-shadow-md`}>{offer.title}</h3>
                                  <p className={`text-base font-medium opacity-90 text-white/90 mb-4 drop-shadow-sm`}>{offer.subtitle}</p>
                                   <div className="flex gap-3">
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); copyToClipboard(offer.code); }}
                                          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors"
                                          title="Copy Code"
                                      >
                                          <Copy className="w-5 h-5" />
                                      </button>
                                      <button className="flex-1 py-3 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm">
                                          View Details
                                      </button>
                                  </div>
                               </div>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-1/4">
                      <div className={`sticky top-32 rounded-3xl border overflow-hidden transition-all ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                          <div 
                              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                              className={`p-6 flex items-center justify-between cursor-pointer lg:cursor-default ${isFiltersOpen ? 'border-b border-gray-500/10' : ''}`}
                          >
                              <h3 className={`text-xl font-bold ${textHeadingClass} flex items-center gap-2`}>
                                  <Filter className="w-5 h-5 text-indigo-500"/> Filters
                              </h3>
                              
                              <div className="flex items-center gap-3">
                                  {(activeFilter.main || activeFilter.sub) && (
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); setActiveFilter({ main: null, sub: null }); }} 
                                          className="text-xs text-rose-500 font-bold hover:underline"
                                      >
                                          Clear
                                      </button>
                                  )}
                                  <div className="lg:hidden text-gray-500">
                                      {isFiltersOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                                  </div>
                              </div>
                          </div>

                          <div className={`px-6 pb-6 ${isFiltersOpen ? 'block animate-fade-in' : 'hidden lg:block'}`}>
                              <div className="mb-8 mt-4">
                                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${textMutedClass}`}>{t('categories')}</h4>
                                  <div className="space-y-2">
                                      {CATEGORIES_DATA.products.map((cat, i) => (
                                          <div key={i}>
                                              <label 
                                                  onClick={() => setActiveFilter({ main: cat.title, sub: null })}
                                                  className="flex items-center gap-3 cursor-pointer group mb-1"
                                              >
                                                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${activeFilter.main === cat.title ? 'bg-indigo-500 border-indigo-500' : isDarkMode ? 'border-slate-600 group-hover:border-indigo-500' : 'border-gray-300'}`}>
                                                      {activeFilter.main === cat.title && <CheckCircle className="w-3 h-3 text-white" />}
                                                  </div>
                                                  <span className={`text-sm font-bold ${activeFilter.main === cat.title ? 'text-indigo-500' : textMutedClass}`}>{cat.title}</span>
                                              </label>
                                              {(activeFilter.main === cat.title) && (
                                                  <div className="ml-8 space-y-1 mt-1 border-l-2 border-indigo-500/20 pl-3">
                                                      {cat.subcategories.map((sub, j) => (
                                                          <div 
                                                              key={j} 
                                                              onClick={(e) => { e.stopPropagation(); setActiveFilter({ main: null, sub: sub.name }); }}
                                                              className={`text-xs cursor-pointer hover:text-indigo-500 transition-colors ${activeFilter.sub === sub.name ? 'text-indigo-500 font-bold' : textMutedClass}`}
                                                          >
                                                              {sub.name}
                                                          </div>
                                                      ))}
                                                  </div>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              <div className="mb-8 animate-fade-in">
                                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${textMutedClass}`}>{dynamicFilters.title}</h4>
                                  <div className="space-y-2">
                                      {dynamicFilters.options.map((option, i) => (
                                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isDarkMode ? 'border-slate-600 group-hover:border-indigo-500 bg-slate-800' : 'border-gray-300 bg-white'}`}>
                                              </div>
                                              <span className={`text-sm ${textMutedClass} group-hover:text-indigo-500 transition-colors`}>{option}</span>
                                          </label>
                                      ))}
                                  </div>
                              </div>

                              <div className="mb-0">
                                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${textMutedClass}`}>Price (AED)</h4>
                                  <div className="flex items-center gap-2 mb-4">
                                      <input type="number" placeholder="Min" className={`w-full py-2 px-3 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${inputBgClass}`} />
                                      <span className={textMutedClass}>-</span>
                                      <input type="number" placeholder="Max" className={`w-full py-2 px-3 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 ${inputBgClass}`} />
                                  </div>
                                  <button className="w-full py-2 rounded-xl bg-indigo-500/10 text-indigo-500 font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all">Apply</button>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="w-full lg:w-3/4">
                      <div className="flex items-center justify-between mb-6">
                          <div>
                              <h2 className={`text-2xl font-bold ${textHeadingClass}`}>
                                  {activeFilter.sub ? activeFilter.sub : activeFilter.main ? activeFilter.main : 'All Grocery Products'}
                              </h2>
                              <span className={textMutedClass}>Showing <strong>{filteredProducts.length}</strong> results</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <span className={`text-sm ${textMutedClass} hidden sm:inline`}>Sort by:</span>
                              <select className={`border rounded-lg py-1.5 px-3 text-sm focus:outline-none cursor-pointer ${inputBgClass}`}>
                                  <option>Recommended</option>
                                  <option>Price: Low to High</option>
                                  <option>Price: High to Low</option>
                                  <option>Newest Arrivals</option>
                              </select>
                          </div>
                      </div>

                      {Object.keys(groupedProducts).length === 0 ? (
                          <div className="text-center py-20">
                              <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                  <Search className="w-8 h-8 text-slate-400" />
                              </div>
                              <h3 className={`text-xl font-bold mb-2 ${textHeadingClass}`}>No products found</h3>
                              <p className={textMutedClass}>Try adjusting your filters or category.</p>
                          </div>
                      ) : (
                          <div className="space-y-12">
                              {Object.entries(groupedProducts).map(([subCatName, products]) => (
                                  <div key={subCatName}>
                                      {!activeFilter.sub && (
                                          <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${textHeadingClass}`}>
                                              <span className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></span>
                                              {subCatName}
                                          </h3>
                                      )}
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                          {products.map((product) => {
                                              const isWished = wishlist.some(item => item.id === product.id);
                                              return (
                                              <div key={product.id} onClick={() => handleProductClick(product)} className={`group relative rounded-[2rem] overflow-hidden border cursor-pointer hover:-translate-y-2 transition-all duration-300 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                                  {product.discount && (
                                                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-lg">
                                                          {product.discount}
                                                      </div>
                                                  )}
                                                  
                                                  <div className="relative h-64 overflow-hidden">
                                                      <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-black/80' : 'from-white'}`}></div>
                                                      <img src={product.images[0]} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/1e293b/ffffff?text=" + product.name.replace(/ /g, "+"); }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                      
                                                      <button 
                                                        onClick={(e) => { 
                                                          e.stopPropagation(); 
                                                          addToWishlist(product);
                                                        }}
                                                        className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${isWished ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-rose-500'}`}
                                                      >
                                                          <Heart className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} />
                                                      </button>
                                                  </div>

                                                  <div className="p-5">
                                                      <div className="flex items-center gap-2 mb-2">
                                                          <div className="flex text-yellow-400 text-xs">
                                                              {[...Array(5)].map((_, i) => (
                                                                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-500'}`} />
                                                              ))}
                                                          </div>
                                                          <span className={`text-xs ${textMutedClass}`}>({product.reviews})</span>
                                                      </div>
                                                      <h3 className={`text-lg font-bold mb-1 leading-tight group-hover:text-indigo-500 transition-colors ${textHeadingClass}`}>{product.name}</h3>
                                                      <div className={`text-xs mb-4 uppercase tracking-wider font-semibold text-emerald-500`}>{product.category}</div>
                                                      
                                                      <div className="flex items-center justify-between mt-auto">
                                                          <div>
                                                              <span className={`text-xl font-bold ${textHeadingClass}`}>AED {product.price}</span>
                                                              {product.originalPrice && <span className={`text-sm ml-2 line-through ${textMutedClass}`}>AED {product.originalPrice}</span>}
                                                          </div>
                           
                                                          <div className="flex gap-2">
                                                              <button 
                                                                  onClick={(e) => { 
                                                                      e.stopPropagation(); 
                                                                      addToCart(product.name, 1);
                                                                      setCurrentView('checkout');
                                                                      setCheckoutStep(1);
                                                                  }}
                                                                  className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 hover:scale-110 transition-transform"
                                                                  title="Buy Now"
                                                              >
                                                                  <CreditCard className="w-5 h-5" />
                                                              </button>
                                                              <button 
                                                                  onClick={(e) => { e.stopPropagation(); addToCart(product.name, 1); showToast(`Added ${product.name}`, 'success'); }}
                                                                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 hover:scale-110 transition-transform"
                                                                  title="Add to Cart"
                                                              >
                                                                  <ShoppingBag className="w-5 h-5" />
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          )})}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          </section>
      );
  };

  const renderProductDetail = () => {
    if (!selectedProduct) return null;

    const isWished = wishlist.some(item => item.id === selectedProduct.id);

    const specs = [
        { label: 'SKU', value: `SKY-${selectedProduct.id.toString().padStart(6, '0')}` },
        { label: 'Origin', value: ['Fish & Seafood', 'Oils & Ghee'].includes(selectedProduct.mainCategory) ? 'Imported' : 'Local Farms (UAE)' },
        { label: 'Shelf Life', value: selectedProduct.mainCategory === 'Frozen Goods' ? '6 Months' : selectedProduct.mainCategory === 'Pantry' ? '12 Months' : '3-5 Days' },
        { label: 'Storage', value: selectedProduct.mainCategory === 'Frozen Goods' ? 'Frozen (-18°C)' : selectedProduct.mainCategory === 'Fresh Market' ? 'Chilled (0-4°C)' : 'Ambient / Dry' },
        { label: 'Pack Size', value: selectedProduct.name.includes('kg') ? '1 Kg Pack' : selectedProduct.name.includes('5L') ? '5 Liter Can' : 'Standard Unit' },
        { label: 'Min. Order', value: '1 Unit' }
    ];

    const handleBuyNow = () => {
        addToCart(selectedProduct.name, 1);
        setCurrentView('checkout');
        setCheckoutStep(1);
    };

    const recentOrders = MOCK_PRODUCTS
        .filter(p => p.id !== selectedProduct.id)
        .slice(0, 4);

    let suggestedProducts = MOCK_PRODUCTS.filter(p => p.mainCategory === selectedProduct.mainCategory && p.id !== selectedProduct.id);
    if (suggestedProducts.length < 2) {
        suggestedProducts = [...suggestedProducts, ...MOCK_PRODUCTS.filter(p => p.mainCategory !== selectedProduct.mainCategory && p.id !== selectedProduct.id)].slice(0, 4);
    } else {
        suggestedProducts = suggestedProducts.slice(0, 4);
    }

    return (
      <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
        <button 
          onClick={() => setCurrentView('shop')}
          className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
        >
          <ArrowLeft className="w-4 h-4" /> {t('backToShop')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
           <div className="space-y-4">
              <div className={`rounded-[2.5rem] overflow-hidden relative aspect-square border ${isDarkMode ? 'border-white/10' : 'border-gray-200 shadow-xl'}`}>
                 <img src={selectedProduct.images[0]} alt={selectedProduct.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/1e293b/ffffff?text=" + selectedProduct.name.replace(/ /g, "+"); }} className="w-full h-full object-cover" />
                 {selectedProduct.discount && (
                    <span className="absolute top-6 left-6 px-4 py-2 bg-rose-500 text-white font-bold rounded-full shadow-lg text-sm">
                      {selectedProduct.discount}
                    </span>
                 )}
                 <button 
                   onClick={(e) => { 
                     e.stopPropagation(); 
                     addToWishlist(selectedProduct);
                   }}
                   className={`absolute top-6 right-6 z-20 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${isWished ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-rose-500'}`}
                 >
                     <Heart className="w-6 h-6" fill={isWished ? 'currentColor' : 'none'} />
                 </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {selectedProduct.images.slice(0,3).map((img, i) => (
                    <div key={i} className={`rounded-2xl overflow-hidden aspect-square border cursor-pointer hover:border-indigo-500 transition-all ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                       <img src={img} alt="" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/1e293b/ffffff?text=Image+" + (i + 1); }} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex flex-col">
              <div className="mb-6">
                 <h1 className={`text-3xl md:text-5xl font-bold mb-4 leading-tight ${textHeadingClass}`}>{selectedProduct.name}</h1>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex text-yellow-400">
                       {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-gray-600'}`} />
                       ))}
                    </div>
                    <span className={`text-sm ${textMutedClass}`}>{selectedProduct.reviews} Verified Reviews</span>
                 </div>
                 <div className="flex items-baseline gap-4">
                    <span className={`text-4xl font-bold ${textHeadingClass}`}>AED {selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                       <span className={`text-xl line-through ${textMutedClass}`}>AED {selectedProduct.originalPrice}</span>
                    )}
                 </div>
              </div>

              <div className={`p-6 rounded-3xl mb-8 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                 <p className={`leading-relaxed ${textMutedClass}`}>{selectedProduct.description}</p>
                 
                 <div className="mt-6 pt-6 border-t border-dashed border-gray-500/30">
                     <h4 className={`font-bold mb-4 ${textHeadingClass} flex items-center gap-2`}><ClipboardCheck className="w-4 h-4 text-indigo-500"/> Product Specifications</h4>
                     <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                                <span className={textMutedClass}>{spec.label}</span>
                                <span className={`font-medium ${textHeadingClass}`}>{spec.value}</span>
                            </div>
                        ))}
                     </div>
                 </div>
              </div>

              {selectedProduct.offers && selectedProduct.offers.length > 0 && (
                  <div className="mb-8 space-y-3">
                      {selectedProduct.offers.map((offer, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                              <Tag className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                              <div>
                                  <h4 className={`text-sm font-bold text-indigo-500`}>{offer.title}</h4>
                                  <p className={`text-xs ${textMutedClass}`}>{offer.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              <div className="mt-auto space-y-4">
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className={`flex w-full sm:w-auto items-center justify-between border rounded-xl px-4 py-3 ${isDarkMode ? 'border-white/20 bg-black/20' : 'border-gray-200 bg-white'}`}>
                       <button className="p-1 hover:text-indigo-500"><Minus className="w-4 h-4" /></button>
                       <span className={`mx-6 font-bold ${textHeadingClass}`}>1</span>
                       <button className="p-1 hover:text-indigo-500"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="flex w-full gap-3">
                        <button 
                           onClick={() => { addToCart(selectedProduct.name, 1); showToast('Added to cart', 'success'); }}
                           className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                           <ShoppingBag className="w-5 h-5" /> Add to Cart
                        </button>
                        <button 
                           onClick={handleBuyNow}
                           className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                           <CreditCard className="w-5 h-5" /> Buy Now
                        </button>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 text-xs font-medium text-center">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                       <Truck className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                       <span className={textMutedClass}>Free Delivery</span>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                       <Shield className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                       <span className={textMutedClass}>Quality Guarantee</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Suggested Products Section */}
        <div className="border-t border-dashed border-gray-500/30 pt-12 mb-12">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${textHeadingClass}`}>
                <Sparkles className="w-6 h-6 text-indigo-500"/> Suggested For You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedProducts.map(product => (
                    <div 
                        key={product.id} 
                        onClick={() => handleProductClick(product)}
                        className={`group relative rounded-2xl overflow-hidden border cursor-pointer hover:-translate-y-2 transition-all duration-300 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                    >
                        <div className="absolute top-3 right-3 z-10 bg-indigo-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                           Recommended
                        </div>
                        <div className="h-40 overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-black/60' : 'from-white/60'}`}></div>
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                            <h4 className={`font-bold text-sm mb-1 truncate ${textHeadingClass}`}>{product.name}</h4>
                            <p className={`text-xs mb-3 ${textMutedClass}`}>{product.category}</p>
                            <div className="flex items-center justify-between">
                                <span className={`font-bold text-indigo-500`}>AED {product.price}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addToCart(product.name, 1); showToast('Added suggestion', 'success'); }}
                                    className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t border-dashed border-gray-500/30 pt-12">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${textHeadingClass}`}>
                <Clock className="w-6 h-6 text-indigo-500"/> Recently Ordered
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentOrders.map(product => (
                    <div 
                        key={product.id} 
                        onClick={() => handleProductClick(product)}
                        className={`group relative rounded-2xl overflow-hidden border cursor-pointer hover:-translate-y-2 transition-all duration-300 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                    >
                        <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                            Last ordered: 2d ago
                        </div>
                        <div className="h-40 overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-black/60' : 'from-white/60'}`}></div>
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                            <h4 className={`font-bold text-sm mb-1 truncate ${textHeadingClass}`}>{product.name}</h4>
                            <p className={`text-xs mb-3 ${textMutedClass}`}>{product.category}</p>
                            <div className="flex items-center justify-between">
                                <span className={`font-bold text-indigo-500`}>AED {product.price}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addToCart(product.name, 1); showToast('Re-ordered item', 'success'); }}
                                    className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </section>
    );
  };

  const renderCartPage = () => {
    const totals = calculateTotals();

    return (
      <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
         <h1 className={`text-4xl font-bold mb-8 ${textHeadingClass}`}>{t('cart')}</h1>
         
         {cart.length === 0 ? (
             <div className="text-center py-20">
                 <ShoppingBag className={`w-20 h-20 mx-auto mb-4 ${textMutedClass}`} />
                 <h2 className={`text-2xl font-bold mb-2 ${textHeadingClass}`}>Your cart is empty</h2>
                 <button onClick={() => setCurrentView('shop')} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">{t('startShopping')}</button>
             </div>
         ) : (
             <div className="flex flex-col lg:flex-row gap-12">
                 <div className="w-full lg:w-2/3 space-y-6">
                     {cart.map((item, i) => {
                         const details = getItemDetails(item.name);
                         return (
                             <div key={i} className={`p-4 rounded-3xl border flex items-center gap-6 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                 <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                     <img src={details.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/1e293b/ffffff?text=" + item.name.replace(/ /g, "+"); }} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="flex-1">
                                     <div className="flex justify-between items-start mb-2">
                                         <div>
                                            <h3 className={`font-bold text-lg ${textHeadingClass}`}>{item.name}</h3>
                                            <span className={`text-sm ${textMutedClass}`}>{details.category}</span>
                                         </div>
                                         <button onClick={() => removeFromCart(item.name)} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                                     </div>
                                     <div className="flex justify-between items-end">
                                         <div className={`flex items-center border rounded-lg px-2 py-1 gap-3 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                             <button onClick={() => updateCartQty(item.name, -1)} className="p-1"><Minus className="w-3 h-3" /></button>
                                             <span className={`text-sm font-bold ${textHeadingClass}`}>{item.qty}</span>
                                             <button onClick={() => updateCartQty(item.name, 1)} className="p-1"><Plus className="w-3 h-3" /></button>
                                         </div>
                                         <span className={`font-bold text-lg ${textHeadingClass}`}>AED {(details.price * item.qty).toFixed(2)}</span>
                                     </div>
                                 </div>
                             </div>
                         );
                     })}
                 </div>

                 <div className="w-full lg:w-1/3">
                    <OrderSummaryCard
                        totals={totals}
                        buttonText="Proceed to Checkout"
                        buttonAction={() => { 
                            setCurrentView('checkout'); 
                            setCheckoutStep(1);
                            window.scrollTo(0, 0); 
                        }}
                        buttonDisabled={cart.length === 0}
                    />
                 </div>
             </div>
         )}
      </section>
    );
  };
  
  const renderWishlistPage = () => {
      return (
          <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
              <h1 className={`text-4xl font-bold mb-8 ${textHeadingClass}`}>{t('wishlist')}</h1>
              
              {wishlist.length === 0 ? (
                  <div className="text-center py-20">
                      <Heart className={`w-20 h-20 mx-auto mb-4 text-rose-500`} fill="currentColor" />
                      <h2 className={`text-2xl font-bold mb-2 ${textHeadingClass}`}>{t('wishlistEmpty')}</h2>
                      <p className={textMutedClass}>Save items you love here to easily purchase them later.</p>
                      <button onClick={() => setCurrentView('shop')} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">{t('startBrowsing')}</button>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {wishlist.map((product) => (
                          <div key={product.id} className={`group relative rounded-[2rem] overflow-hidden border transition-all duration-300 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                              
                              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                                  <button 
                                      onClick={() => removeFromWishlist(product.id)}
                                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-600 transition-colors shadow-lg"
                                      title={t('removeItem')}
                                  >
                                      <X className="w-4 h-4" />
                                  </button>
                              </div>

                              <div onClick={() => handleProductClick(product)} className="cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.name} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/1e293b/ffffff?text=" + product.name.replace(/ /g, "+"); }} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                </div>
                              </div>

                              <div className="p-5 flex flex-col">
                                  <h3 className={`text-lg font-bold mb-1 leading-tight ${textHeadingClass}`}>{product.name}</h3>
                                  <div className={`text-xs mb-3 uppercase tracking-wider font-semibold ${product.discount ? 'text-rose-500' : 'text-emerald-500'}`}>{product.category}</div>
                                  
                                  <div className="flex items-baseline gap-2 mb-4">
                                      <span className={`text-xl font-bold ${textHeadingClass}`}>AED {product.price}</span>
                                      {product.originalPrice && <span className={`text-sm line-through ${textMutedClass}`}>AED {product.originalPrice}</span>}
                                  </div>

                                  <button 
                                      onClick={() => moveToCart(product)}
                                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                                  >
                                      <ShoppingBag className="w-4 h-4" /> {t('moveToCart')}
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </section>
      );
  };

  const renderCheckoutPage = () => {
    const totals = calculateTotals();
    const currentAddress = mockAddresses.find(a => a.id === selectedAddress);

    const handlePlaceOrder = () => {
        if (!currentAddress || !selectedPayment) {
            showToast("Please select an address and payment method.", "error");
            return;
        }

        setOrderPlaced({ 
            id: 'ORD-' + Math.floor(Math.random() * 90000 + 10000),
            date: new Date().toLocaleDateString(),
            address: currentAddress,
            payment: selectedPayment,
            totals: totals,
            items: [...cart] 
        });
        
        setCart([]); 
        setAppliedPromo(null); 
        setCurrentView('order-tracking');
        setCurrentTrack(1); 
        window.scrollTo(0,0);
    };

    const getStepActions = () => {
        switch (checkoutStep) {
            case 1:
                return {
                    text: "Continue to Payment",
                    action: () => {
                        if (!currentAddress) {
                            showToast("Please select a shipping address", "error");
                            return;
                        }
                        setCheckoutStep(2);
                        window.scrollTo(0, 0);
                    },
                    disabled: !currentAddress
                };
            case 2:
                return {
                    text: t('reviewConfirm'),
                    action: () => {
                        if (!selectedPayment) {
                            showToast("Please select a payment method", "error");
                            return;
                        }
                        setCheckoutStep(3);
                        window.scrollTo(0, 0);
                    },
                    disabled: !selectedPayment
                };
            case 3:
                return {
                    text: `${t('placeOrder')} (AED ${totals.total.toFixed(2)})`,
                    action: handlePlaceOrder,
                    disabled: false
                };
            default:
                return { text: "Next", action: () => {}, disabled: true };
        }
    };

    const stepActions = getStepActions();

    const renderStep1Address = () => (
        <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textHeadingClass}`}>1. {t('shippingAddress')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAddresses.map(address => (
                    <div 
                        key={address.id} 
                        onClick={() => { setSelectedAddress(address.id); setIsAddingNewAddress(false); }}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedAddress === address.id ? 'border-indigo-500 ring-2 ring-indigo-500' : isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <div className="flex justify-between items-start">
                             <h4 className={`font-bold mb-1 ${textHeadingClass}`}>{address.name}</h4>
                             {selectedAddress === address.id && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                        </div>
                        <p className={`text-sm ${textMutedClass}`}>{address.line1}, {address.city}</p>
                        <p className={`text-xs ${textMutedClass}`}>Phone: {address.phone}</p>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="flex items-center gap-2 text-indigo-500 font-bold text-sm hover:underline"
            >
                {isAddingNewAddress ? <Minus className="w-4 h-4"/> : <Plus className="w-4 h-4"/>} 
                {isAddingNewAddress ? 'Cancel New Address' : 'Add New Address'}
            </button>

            {isAddingNewAddress && (
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <h4 className={`font-bold mb-4 ${textHeadingClass}`}>New Address Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Location Nickname (e.g., Central Kitchen)" className={`col-span-2 ${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        <input type="text" placeholder="Street/Building/Plot Number" className={`${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        <input type="text" placeholder="City" className={`${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        <input type="text" placeholder="Phone Number" className={`col-span-2 ${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                    </div>
                    <button 
                        onClick={() => { 
                            const newId = mockAddresses.length + 1;
                            setMockAddresses([...mockAddresses, { id: newId, name: "New Warehouse Site", line1: "Mock Street 1", city: "Dubai", phone: "50-1000000" }]);
                            setSelectedAddress(newId);
                            setIsAddingNewAddress(false);
                            showToast("New address added and selected.", "success");
                        }}
                        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors"
                    >
                        Save & Use
                    </button>
                </div>
            )}
            
            <div className="lg:hidden mt-8">
                <button 
                    onClick={stepActions.action} 
                    disabled={stepActions.disabled}
                    className={`w-full px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${!stepActions.disabled ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'}`}
                >
                    {stepActions.text} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderStep2Payment = () => (
        <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textHeadingClass}`}>2. {t('paymentMethod')}</h2>

            <div className="space-y-4">
                {[
                  {id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-6 h-6"/>}, 
                  {id: 'cod', name: 'Cash on Delivery', icon: <Box className="w-6 h-6"/>},
                  {id: 'wallet', name: 'SkyMarket Wallet', icon: <Tag className="w-6 h-6"/>},
                  {id: 'credit', name: 'Credit Payment', icon: <Receipt className="w-6 h-6"/>},
                ].map(payment => (
                    <div 
                        key={payment.id} 
                        onClick={() => setSelectedPayment(payment.id)}
                        className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${selectedPayment === payment.id ? 'border-emerald-500 ring-2 ring-emerald-500' : isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        {payment.icon}
                        <span className={`font-bold flex-1 ${textHeadingClass}`}>{payment.name}</span>
                        {selectedPayment === payment.id && <CheckCircle className="w-5 h-5 text-emerald-500"/>}
                    </div>
                ))}
            </div>

            {selectedPayment === 'card' && (
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <h4 className={`font-bold mb-4 ${textHeadingClass}`}>Card Details</h4>
                    <div className="space-y-3">
                        <input type="text" placeholder="Card Number" className={`w-full ${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        <input type="text" placeholder="Cardholder Name" className={`w-full ${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" className={`${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                            <input type="text" placeholder="CVV" className={`${inputBgClass} py-2 px-3 rounded-lg text-sm`} />
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex flex-col-reverse md:flex-row gap-4 mt-8">
                <button 
                    onClick={() => setCheckoutStep(1)} 
                    className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <button 
                    onClick={stepActions.action} 
                    disabled={stepActions.disabled}
                    className={`lg:hidden flex-1 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${!stepActions.disabled ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'}`}
                >
                    {stepActions.text} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderStep3Review = () => (
        <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textHeadingClass}`}>3. {t('reviewConfirm')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className={`font-bold ${textHeadingClass}`}>Ship To</h4>
                        <button onClick={() => setCheckoutStep(1)} className="text-sm text-indigo-500 hover:underline">Change</button>
                    </div>
                    <p className={`font-medium ${textHeadingClass}`}>{currentAddress.name}</p>
                    <p className={`text-sm ${textMutedClass}`}>{currentAddress.line1}</p>
                    <p className={`text-sm ${textMutedClass}`}>{currentAddress.city} | {currentAddress.phone}</p>
                </div>

                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className={`font-bold ${textHeadingClass}`}>{t('paymentMethod')}</h4>
                        <button onClick={() => setCheckoutStep(2)} className="text-sm text-emerald-500 hover:underline">Change</button>
                    </div>
                    <p className={`font-medium ${textHeadingClass}`}>
                        {selectedPayment === 'card' && 'Credit Card (Mock Ending in ****1234)'}
                        {selectedPayment === 'cod' && 'Cash on Delivery (COD)'}
                        {selectedPayment === 'wallet' && 'SkyMarket Wallet'}
                        {selectedPayment === 'credit' && 'Credit Payment (Net 30)'}
                    </p>
                    <p className={`text-sm ${textMutedClass}`}>
                        {selectedPayment === 'cod' && 'Pay AED ' + totals.total.toFixed(2) + ' upon arrival.'}
                        {selectedPayment === 'credit' && 'Invoice sent to email. Payment due in 30 days.'}
                        {selectedPayment !== 'cod' && selectedPayment !== 'credit' && 'Secure payment method.'}
                    </p>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-4 mt-8">
                <button 
                    onClick={() => setCheckoutStep(2)} 
                    className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <button 
                    onClick={handlePlaceOrder} 
                    className={`lg:hidden flex-1 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/20 hover:scale-[1.02]`}
                >
                    {stepActions.text} <ShoppingBag className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <h1 className={`text-4xl font-bold mb-8 ${textHeadingClass}`}>{t('checkout')}</h1>
            
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/3 space-y-10">
                    <div className={`flex justify-between items-center p-4 rounded-xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}>
                        {[1, 2, 3].map(step => (
                            <div key={step} className="flex items-center">
                                <div 
                                    onClick={() => step < checkoutStep && setCheckoutStep(step)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${checkoutStep === step ? 'bg-indigo-600 text-white' : checkoutStep > step ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'}`}
                                >
                                    {checkoutStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                                </div>
                                <span className={`ml-2 hidden sm:inline text-sm font-medium ${checkoutStep === step ? 'text-indigo-500' : textMutedClass}`}>
                                    {step === 1 ? t('shippingAddress') : step === 2 ? t('paymentMethod') : t('reviewConfirm')}
                                </span>
                                {step < 3 && <div className={`w-16 h-0.5 mx-2 transition-all ${checkoutStep > step ? 'bg-emerald-500' : isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>}
                            </div>
                        ))}
                    </div>

                    {checkoutStep === 1 && renderStep1Address()}
                    {checkoutStep === 2 && renderStep2Payment()}
                    {checkoutStep === 3 && renderStep3Review()}
                </div>

                <div className="w-full lg:w-1/3">
                    <OrderSummaryCard 
                        totals={totals} 
                        buttonText={stepActions.text} 
                        buttonAction={stepActions.action} 
                        buttonDisabled={stepActions.disabled}
                        items={cart} 
                        isReadOnly={checkoutStep === 3} 
                    />
                </div>
            </div>
        </section>
    );
  };

    const renderOrderTracking = () => {
    if (!orderPlaced) return (
        <div className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 text-center">
            <h1 className={`text-4xl font-bold mb-4 ${textHeadingClass}`}>No Recent Order</h1>
            <p className={textMutedClass}>Please place an order first.</p>
            <button onClick={() => setCurrentView('shop')} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">{t('startShopping')}</button>
        </div>
    );
    
    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <h1 className={`text-4xl font-bold mb-2 ${textHeadingClass}`}>{t('orderTracking')} #{orderPlaced.id}</h1>
            <p className={`text-xl font-medium mb-12 ${currentTrack === totalSteps ? 'text-emerald-500' : 'text-indigo-500'}`}>
                {t(mockTrackingSteps[currentTrack - 1]?.statusKey) || 'Processing'}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className={`lg:col-span-2 p-8 rounded-[2.5rem] border ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <h3 className={`text-2xl font-bold mb-8 ${textHeadingClass}`}>{t('orderStatus')}</h3>
                    <div className="relative border-l-4 border-indigo-500/30 ml-4 pl-8">
                        {mockTrackingSteps.map((step, index) => {
                            const isActive = index < currentTrack;
                            const isCurrent = index === currentTrack - 1;
                            
                            return (
                                <div key={index} className="mb-8 relative">
                                    <div className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 shadow-xl shadow-indigo-600/30' : isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`}>
                                        {isActive ? <CheckCircle className="w-4 h-4 text-white" /> : React.cloneElement(step.icon, { className: 'w-4 h-4 text-white/80' })}
                                    </div>
                                    
                                    <h4 className={`font-bold ${textHeadingClass} ${isCurrent ? 'text-indigo-500' : ''}`}>{t(step.statusKey)}</h4>
                                    <p className={`text-sm ${textMutedClass}`}>{step.time}</p>
                                    {isCurrent && <span className="text-xs text-indigo-500 animate-pulse block mt-1">Estimated Arrival: ~1:45 PM</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <div className={`p-6 rounded-2xl border ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <h4 className={`font-bold mb-4 ${textHeadingClass}`}>Order Details</h4>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between"><span className={textMutedClass}>{t('orderID')}</span> <span className="font-medium">{orderPlaced.id}</span></p>
                            <p className="flex justify-between"><span className={textMutedClass}>{t('orderDate')}</span> <span className="font-medium">{orderPlaced.date}</span></p>
                            <p className="flex justify-between"><span className={textMutedClass}>{t('payment')}</span> <span className="font-medium">
                                {orderPlaced.payment === 'cod' ? 'Cash on Delivery' : 
                                 orderPlaced.payment === 'credit' ? 'Credit Payment' :
                                 orderPlaced.payment === 'wallet' ? 'SkyMarket Wallet' : 'Credit Card'}
                            </span></p>
                        </div>
                    </div>
                    
                    <OrderSummaryCard 
                        totals={orderPlaced.totals} 
                        buttonText={t('backToHome')} 
                        buttonAction={() => { setCurrentView('home'); setOrderPlaced(null); }} 
                        isReadOnly={true}
                        items={orderPlaced.items}
                    />
                </div>
            </div>
        </section>
    );
  };
  
  const renderCategoriesPage = () => {
    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <button 
                onClick={() => setCurrentView('home')}
                className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
            >
                <ArrowLeft className="w-4 h-4" /> {t('backToHome')}
            </button>
            
            <div className="mb-8 text-center md:text-left">
                <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeadingClass}`}>All {t('categories')}</h1>
                <p className={`text-lg ${textMutedClass}`}>Select a category to explore our fresh produce and pantry essentials.</p>
            </div>

            <div className="mb-12">
                 {renderOfferSection()}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CATEGORIES_DATA.products.map((cat, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => { setViewingCategory(cat); setCurrentView('subcategories'); }}
                        className={`relative rounded-[2.5rem] overflow-hidden p-1 flex flex-col group border-t hover:border-white/20 transition-all cursor-pointer hover:-translate-y-2 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                    >
                         <div className="relative h-64 rounded-[2rem] overflow-hidden m-2">
                             <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-[#0B1120]' : 'from-white'}`}></div>
                             <img 
                                src={cat.image} 
                                alt={cat.title} 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/1e293b/ffffff?text=" + cat.title.replace(/ /g, "+"); }}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                             />
                             
                             <div className={`absolute top-4 right-4 z-20 backdrop-blur-md p-3 rounded-2xl border text-white ${cat.glow} ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/30 border-white/30'}`}>
                                {React.cloneElement(cat.icon, { className: "w-8 h-8" })}
                            </div>
                            
                            <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start gap-1">
                                <h3 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.textGradient}`}>{cat.title}</h3>
                                <p className="text-sm text-gray-400 font-medium">{cat.subcategories.length} Subcategories</p>
                            </div>
                         </div>

                         <div className="px-6 pb-6 mt-auto">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setViewingCategory(cat); setCurrentView('subcategories'); }}
                                className={`w-full py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-wider ${cat.buttonGradient} shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2`}
                            >
                                {t('viewSubcategories')} <ArrowRight className="w-4 h-4"/>
                            </button>
                         </div>
                    </div>
                ))}
            </div>
        </section>
    );
  };

  const renderSubcategoriesPage = () => {
    if (!viewingCategory) return null;

    const subCategoryOffers = viewingCategory.subcategories.map((sub, idx) => ({
        id: `sub-offer-${idx}`,
        title: `Best of ${sub.name}`,
        subtitle: `Exclusive deals on premium ${sub.name}`,
        discount: `${20 + idx * 5}% OFF`, 
        code: `${sub.name.substring(0, 3).toUpperCase()}${20 + idx * 5}`,
        image: viewingCategory.image, 
        gradient: idx % 2 === 0 ? viewingCategory.textGradient.replace("text-", "from-").replace("via-", "to-") : "from-indigo-600/90 to-purple-600/90",
    }));

    const displayOffers = subCategoryOffers.length < 3 ? [...subCategoryOffers, ...subCategoryOffers] : subCategoryOffers;

    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <button 
                onClick={() => setCurrentView('categories')}
                className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
            >
                <ArrowLeft className="w-4 h-4" /> {t('backToCategories')}
            </button>
            
            <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
                 <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${viewingCategory.subCardBg} text-white shadow-xl shrink-0`}>
                    {React.cloneElement(viewingCategory.icon, { className: "w-8 h-8" })}
                 </div>
                 <div>
                    <h1 className={`text-3xl md:text-5xl font-bold mb-2 ${textHeadingClass}`}>{viewingCategory.title}</h1>
                    <p className={`text-lg ${textMutedClass}`}>Browse exclusive offers and subcategories.</p>
                 </div>
            </div>

            <div className="mb-16">
                 <div className="flex items-center justify-between mb-6">
                     <div>
                         <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-2 block flex items-center gap-2">
                             <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500 inline-block"></span>
                             Limited Time
                         </span>
                         <h2 className={`text-2xl font-bold ${textHeadingClass}`}>Offers on <span className={`text-transparent bg-clip-text bg-gradient-to-r ${viewingCategory.textGradient}`}>{viewingCategory.title}</span></h2>
                    </div>
                     <div className="flex gap-2">
                        <button onClick={() => scrollOfferSlider('left')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scrollOfferSlider('right')} className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-800'}`}>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div 
                    ref={offerSliderRef}
                    onMouseEnter={() => setIsOfferHovered(true)}
                    onMouseLeave={() => setIsOfferHovered(false)}
                    onTouchStart={() => setIsOfferHovered(true)}
                    onTouchEnd={() => setIsOfferHovered(false)}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayOffers.map((offer, idx) => (
                         <div 
                            key={idx} 
                            onClick={() => handleCategoryClick('sub', viewingCategory.subcategories[idx % viewingCategory.subcategories.length]?.name)}
                            className={`snap-center shrink-0 w-[85vw] md:w-[380px] h-[400px] rounded-[2.5rem] relative overflow-hidden group shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                        >
                            {/* Image */}
                            <img 
                                src={offer.image} 
                                alt={offer.title}
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/1e293b/ffffff?text=" + offer.title.replace(/ /g, "+"); }}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient || 'from-black/90 to-transparent'}`}></div>
                            
                            {/* Content */}
                             <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                                        {offer.discount}
                                    </span>
                                </div>
                                <h3 className={`text-3xl font-bold leading-tight mb-2 text-white drop-shadow-md`}>{offer.title}</h3>
                                <p className={`text-lg font-medium opacity-90 text-white/90 mb-6 drop-shadow-sm`}>{offer.subtitle}</p>
                                 <div className="flex gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); copyToClipboard(offer.code); }}
                                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors"
                                        title="Copy Code"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <button 
                                        className="flex-1 py-3 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {t('shop')} <ArrowRight className="w-4 h-4"/>
                                    </button>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {viewingCategory.subcategories.map((sub, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleCategoryClick('sub', sub.name)}
                        className={`group relative rounded-[2rem] overflow-hidden p-6 flex flex-col items-center justify-center text-center gap-4 border transition-all cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                        style={{ minHeight: '220px' }}
                    >
                         <div className={`absolute inset-0 bg-gradient-to-br ${viewingCategory.textGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                         
                         <div className={`p-5 rounded-full transition-transform duration-500 group-hover:scale-110 shadow-lg ${viewingCategory.subCardBg} text-white`}>
                            {React.cloneElement(sub.icon, { className: "w-8 h-8" })}
                         </div>
                         
                         <div>
                            <h3 className={`text-xl font-bold ${textHeadingClass} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${viewingCategory.textGradient} transition-all`}>
                                {sub.name}
                            </h3>
                            <span className={`text-xs mt-2 inline-block px-3 py-1 rounded-full border ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-gray-200 text-gray-500'} group-hover:border-transparent group-hover:bg-indigo-500 group-hover:text-white transition-all`}>
                                Browse Items
                            </span>
                         </div>
                    </div>
                ))}
            </div>
        </section>
    );
  };

  const renderAboutPage = () => {
    return (
      <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
        <button 
          onClick={() => setCurrentView('home')}
          className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
        >
          <ArrowLeft className="w-4 h-4" /> {t('backToHome')}
        </button>

        <div className="text-center mb-16">
            <span className="text-indigo-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Story</span>
            <h1 className={`text-4xl md:text-6xl font-black mb-6 ${textHeadingClass}`}>
                We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">SkyMarket</span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${textMutedClass}`}>
                Bridging the gap between local farmers and global kitchens with technology, transparency, and trust.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
                { label: "Active Partners", value: "5,000+", icon: <User className="w-6 h-6 text-indigo-500"/> },
                { label: "Daily Orders", value: "12k+", icon: <ShoppingBag className="w-6 h-6 text-rose-500"/> },
                { label: "Cities Covered", value: "25+", icon: <MapPin className="w-6 h-6 text-emerald-500"/> },
                { label: "Satisfaction", value: "99.8%", icon: <Heart className="w-6 h-6 text-pink-500"/> }
            ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-3xl border text-center ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        {stat.icon}
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${textHeadingClass}`}>{stat.value}</h3>
                    <p className={`text-sm font-medium ${textMutedClass}`}>{stat.label}</p>
                </div>
            ))}
        </div>

        <div className={`rounded-[3rem] p-8 md:p-12 mb-20 relative overflow-hidden border ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white shadow-xl border-gray-200'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                    <h2 className={`text-3xl md:text-4xl font-bold ${textHeadingClass}`}>Reimagining the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">B2B Supply Chain</span></h2>
                    <p className={`text-lg leading-relaxed ${textMutedClass}`}>
                        Founded in 2020, SkyMarket started with a simple mission: to empower local producers by connecting them directly with commercial kitchens. We believe that fresh ingredients shouldn't come with logistical nightmares.
                    </p>
                    <p className={`text-lg leading-relaxed ${textMutedClass}`}>
                        Today, we utilize AI-driven logistics to ensure that 90% of our produce travels less than 24 hours from farm to fork, reducing waste and maximizing freshness.
                    </p>
                </div>
                <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
                     <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
                        alt="Warehouse Operations" 
                        className="w-full h-full object-cover"
                     />
                     <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/80' : 'from-black/40'} to-transparent flex items-end p-8`}>
                        <div className="text-white">
                            <p className="font-bold text-lg">Central Hub, Dubai</p>
                            <p className="opacity-80 text-sm">Operating 24/7 to serve you better.</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>

        <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${textHeadingClass}`}>Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Sustainability First", desc: "We prioritize eco-friendly packaging and electric fleets to minimize our carbon footprint.", icon: <Apple className="w-8 h-8 text-green-500"/>, color: "from-green-500/20 to-emerald-500/20" },
                    { title: "Tech-Driven", desc: "Using advanced AI to predict demand and prevent food waste before it happens.", icon: <Zap className="w-8 h-8 text-yellow-500"/>, color: "from-yellow-500/20 to-orange-500/20" },
                    { title: "Community Focused", desc: "Supporting over 200 local farms and small businesses across the region.", icon: <UserPlus className="w-8 h-8 text-blue-500"/>, color: "from-blue-500/20 to-indigo-500/20" }
                ].map((val, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] border relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${val.color} blur-3xl group-hover:blur-2xl transition-all`}></div>
                        <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                            {val.icon}
                        </div>
                        <h3 className={`text-xl font-bold mb-4 ${textHeadingClass}`}>{val.title}</h3>
                        <p className={`leading-relaxed ${textMutedClass}`}>{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center">
            <h2 className={`text-2xl font-bold mb-6 ${textHeadingClass}`}>Ready to transform your supply chain?</h2>
            <div className="flex justify-center gap-4">
                <button onClick={() => setCurrentView('contact')} className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/25 hover:scale-105 transition-transform">
                    {t('contact')} Sales
                </button>
                <button onClick={() => setCurrentView('shop')} className={`px-8 py-4 rounded-xl border font-bold hover:scale-105 transition-transform ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>
                    Browse Catalog
                </button>
            </div>
        </div>
      </section>
    );
  };

  const renderContactPage = () => {
    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <button 
              onClick={() => setCurrentView('home')}
              className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
            >
              <ArrowLeft className="w-4 h-4" /> {t('backToHome')}
            </button>

            <div className="text-center mb-12">
                <h1 className={`text-4xl md:text-5xl font-black mb-4 ${textHeadingClass}`}>
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Touch</span>
                </h1>
                <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${textMutedClass}`}>
                    We're here to answer your questions and help you find the perfect supply solution for your business.
                </p>
            </div>

            <div className={`relative z-40 p-8 md:p-12 rounded-[2.5rem] border shadow-2xl overflow-hidden group ${cardClass}`}>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-600/20 via-purple-600/20 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-6">
                        <h3 className={`text-3xl font-bold leading-tight ${textHeadingClass}`}>
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Contact Details</span>
                        </h3>
                        <p className={`text-lg max-w-md ${textMutedClass}`}>
                            Reach out to our dedicated B2B sales or support teams via phone or email during business hours.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className={`flex items-center gap-4 ${textMutedClass}`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-indigo-500 block">Sales & Bulk Orders</span>
                                    <span>+971 4 123 4567</span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-4 ${textMutedClass}`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                     <span className="text-sm font-bold text-indigo-500 block">General Inquiries</span>
                                     <span>hello@skymarket.com</span>
                                </div>
                            </div>
                            <div className={`flex items-start gap-4 ${textMutedClass}`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                     <span className="text-sm font-bold text-indigo-500 block">Headquarters</span>
                                     <span>123 Market Street, Suite 400, Business Bay, Dubai, UAE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={`space-y-4 p-6 rounded-3xl border backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Name</label>
                                <input type="text" placeholder="John Doe" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} />
                            </div>
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Email</label>
                                <input type="email" placeholder="john@example.com" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Subject</label>
                            <select className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer ${inputBgClass}`}>
                                <option>General Inquiry</option>
                                <option>Bulk Order Quote</option>
                                <option>Partnership</option>
                                <option>Support</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Message</label>
                            <textarea rows="4" placeholder="How can we help you?" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none ${inputBgClass}`}></textarea>
                        </div>
                        <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" /> Send Message
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-20 text-center">
                <h2 className={`text-2xl font-bold mb-4 ${textHeadingClass}`}>Need Urgent Support?</h2>
                <p className={`text-lg mb-6 ${textMutedClass}`}>
                    For immediate assistance, call our 24/7 hotline or visit our help center.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/25 hover:scale-105 transition-transform flex items-center gap-2">
                        <Phone className="w-5 h-5"/> Call Hotline
                    </button>
                    <button className={`px-8 py-4 rounded-xl border font-bold hover:scale-105 transition-transform flex items-center gap-2 ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>
                        <HelpCircle className="w-5 h-5"/> Visit Help Center
                    </button>
                </div>
            </div>
        </section>
    );
  };

  // --- SERVICE BOOKING FLOW HANDLERS ---
  const handleServiceBooking = (mainCategory, serviceName) => {
    const serviceCat = CATEGORIES_DATA.services.find(c => c.title === mainCategory);
    if (!serviceCat) return;

    setSelectedServiceBooking({
        mainCategory: mainCategory,
        subCategory: serviceName,
        icon: serviceCat.subcategories.find(s => s.name === serviceName)?.icon || serviceCat.icon,
        accent: serviceCat.accent,
        buttonGradient: serviceCat.buttonGradient
    });
    setServiceBookingStep(1);
    setIsBookingSuccess(false);
    setBookingDetails({
        description: '',
        datePreference: '',
        contactName: '',
        contactEmail: '',
        contactPhone: ''
    });
    setCurrentView('service-booking');
    window.scrollTo(0,0);
  };

  const getServiceItems = (catTitle) => {
      const categoryData = CATEGORIES_DATA.services.find(c => c.title === catTitle);
      if (!categoryData) return [];
      
      return categoryData.subcategories.map((sub, i) => ({
          id: `service-${catTitle}-${i}`,
          name: sub.name, 
          category: catTitle,
          price: (Math.random() * 500 + 100).toFixed(2), 
          images: [categoryData.image],
          rating: 4.9,
          isTimeLimited: false,
          reviews: 75 + i * 5
      }));
  };

  const renderServiceBookingFlow = () => {
    if (!selectedServiceBooking) {
        return (
            <div className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 text-center">
                <h1 className={`text-4xl font-bold mb-4 ${textHeadingClass}`}>Service Not Selected</h1>
                <p className={textMutedClass}>Please select a service from the catalog.</p>
                <button onClick={() => setCurrentView('services')} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">{t('expertServices')}</button>
            </div>
        );
    }
    
    const { mainCategory, subCategory, icon, buttonGradient, accent } = selectedServiceBooking;

    const StepIndicator = ({ step, title }) => (
        <div className="flex items-center">
            <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    serviceBookingStep === step ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 
                    serviceBookingStep > step ? 'bg-emerald-500 text-white' : 
                    isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'
                }`}
            >
                {serviceBookingStep > step ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            <span className={`ml-3 hidden sm:inline text-sm font-medium ${serviceBookingStep === step ? 'text-indigo-500' : textMutedClass}`}>{title}</span>
            {step < 3 && <div className={`w-12 h-0.5 mx-2 transition-all ${serviceBookingStep > step ? 'bg-emerald-500' : isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>}
        </div>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleEstimateRequest = () => {
        if (!bookingDetails.contactName || !bookingDetails.contactEmail || !bookingDetails.description) {
            showToast("Please fill in all required fields.", "error");
            return;
        }
        // Simulate API call delay
        showToast("Requesting estimate...", "info");
        setTimeout(() => {
            setIsBookingSuccess(true);
            showToast("Estimate request submitted successfully! We will contact you soon.", "success");
        }, 1500);
    };

    const renderStepContent = () => {
        switch (serviceBookingStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className={`text-2xl font-bold ${textHeadingClass} flex items-center gap-3`}>
                             {React.cloneElement(icon, { className: `w-6 h-6 ${accent}` })} {t('services')}: {subCategory}
                        </h2>
                        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                            <p className={textMutedClass}>
                                You are requesting an estimate for **{subCategory}** service under the **{mainCategory}** category. 
                                Our certified professionals will review your requirements and provide a detailed quote.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={() => setServiceBookingStep(2)}
                                className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${buttonGradient} shadow-lg shadow-indigo-600/30 hover:scale-[1.02]`}
                            >
                                Add Requirements <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className={`text-2xl font-bold ${textHeadingClass}`}>2. Specify Service Requirements</h2>
                        <div className="space-y-4">
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Detailed Description of Issue/Work Needed <span className="text-rose-500">*</span></label>
                            <textarea 
                                name="description"
                                value={bookingDetails.description}
                                onChange={handleInputChange}
                                rows="4" 
                                placeholder={`E.g., "The air conditioning unit in the main server room is making a loud noise and blowing hot air."`} 
                                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none ${inputBgClass}`}
                            ></textarea>
                            
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Preferred Date/Time for Visit</label>
                            <input 
                                type="datetime-local" 
                                name="datePreference"
                                value={bookingDetails.datePreference}
                                onChange={handleInputChange}
                                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} 
                            />
                            
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Upload Photo/Diagram (Optional)</label>
                            <div className={`w-full border border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors ${inputBgClass}`}>
                                <Plus className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                                <span className="text-sm">Click to upload or drag & drop files</span>
                                <span className={`text-xs block mt-1 ${textMutedClass}`}>Max file size: 5MB</span>
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <button 
                                onClick={() => setServiceBookingStep(1)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button 
                                onClick={() => setServiceBookingStep(3)}
                                disabled={!bookingDetails.description}
                                className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${!bookingDetails.description ? 'bg-gray-500/50 cursor-not-allowed' : buttonGradient} shadow-lg shadow-indigo-600/30 hover:scale-[1.02]`}
                            >
                                Continue to Contact <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className={`text-2xl font-bold ${textHeadingClass}`}>3. Contact & Estimate Request</h2>
                        <div className="space-y-4">
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Full Name <span className="text-rose-500">*</span></label>
                            <input 
                                type="text" 
                                name="contactName"
                                value={bookingDetails.contactName}
                                onChange={handleInputChange}
                                placeholder="Your Name" 
                                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} 
                            />
                            
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Email Address <span className="text-rose-500">*</span></label>
                            <input 
                                type="email" 
                                name="contactEmail"
                                value={bookingDetails.contactEmail}
                                onChange={handleInputChange}
                                placeholder="your.email@business.com" 
                                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} 
                            />
                            
                            <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Phone Number</label>
                            <input 
                                type="tel" 
                                name="contactPhone"
                                value={bookingDetails.contactPhone}
                                onChange={handleInputChange}
                                placeholder="+971 50 XXX XXXX" 
                                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} 
                            />
                        </div>

                        <div className="flex justify-between gap-4 pt-4">
                            <button 
                                onClick={() => setServiceBookingStep(2)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button 
                                onClick={handleEstimateRequest}
                                disabled={!bookingDetails.contactName || !bookingDetails.contactEmail}
                                className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${!bookingDetails.contactName || !bookingDetails.contactEmail ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} shadow-lg shadow-emerald-600/30 hover:scale-[1.02]`}
                            >
                                Request Estimate <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
            <button 
                onClick={() => setCurrentView('services')}
                className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
            >
                <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>
            
            <div className="mb-8">
                 <h1 className={`text-4xl font-bold ${textHeadingClass}`}>Book Service: <span className={`text-transparent bg-clip-text bg-gradient-to-r ${buttonGradient}`}>{subCategory}</span></h1>
                 <p className={`text-lg ${textMutedClass}`}>Step-by-step guide to request an expert service estimate.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-2 space-y-8">
                    {/* Step Indicators */}
                    <div className={`flex justify-between items-center p-4 rounded-xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}>
                        <StepIndicator step={1} title="Service" />
                        <StepIndicator step={2} title="Requirements" />
                        <StepIndicator step={3} title="Contact & Send" />
                    </div>

                    {/* Content Card */}
                    <div className={`p-8 rounded-[2.5rem] border ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        {isBookingSuccess ? (
                            <div className="text-center py-12 space-y-6">
                                <Award className="w-20 h-20 mx-auto text-emerald-500 animate-bounce" />
                                <h2 className={`text-3xl font-bold ${textHeadingClass}`}>Estimate Request Sent!</h2>
                                <p className={textMutedClass}>
                                    Thank you for your request for **{subCategory}**. We have received your requirements and contact information. 
                                    A dedicated service manager will contact you at **{bookingDetails.contactEmail || 'your provided email'}** within 4 business hours to confirm details and provide a formal estimate.
                                </p>
                                <button 
                                    onClick={() => setCurrentView('home')}
                                    className="mt-4 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors"
                                >
                                    Back to Home
                                </button>
                            </div>
                        ) : (
                            renderStepContent()
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className={`sticky top-32 p-8 rounded-[2rem] border ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-bold mb-6 ${textHeadingClass}`}>Booking Information</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl bg-white/5 text-indigo-500`}>
                                     {React.cloneElement(icon, { className: "w-5 h-5" })}
                                </div>
                                <div>
                                    <p className={`font-bold ${textHeadingClass}`}>{subCategory}</p>
                                    <p className={`text-xs ${textMutedClass}`}>{mainCategory}</p>
                                </div>
                            </div>
                            
                            <div className={`h-px w-full my-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>

                            <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${textMutedClass}`}>Your Details</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between items-start">
                                    <span className={textMutedClass}>Name:</span>
                                    <span className={`font-medium text-right ${textHeadingClass}`}>{bookingDetails.contactName || 'Pending'}</span>
                                </li>
                                <li className="flex justify-between items-start">
                                    <span className={textMutedClass}>Email:</span>
                                    <span className={`font-medium text-right ${textHeadingClass}`}>{bookingDetails.contactEmail || 'Pending'}</span>
                                </li>
                                <li className="flex justify-between items-start">
                                    <span className={textMutedClass}>Date Pref:</span>
                                    <span className={`font-medium text-right ${textHeadingClass}`}>{bookingDetails.datePreference ? new Date(bookingDetails.datePreference).toLocaleDateString() : 'Anytime'}</span>
                                </li>
                            </ul>

                            {serviceBookingStep >= 2 && bookingDetails.description && (
                                <>
                                    <div className={`h-px w-full my-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${textMutedClass}`}>Description</h4>
                                    <p className={`text-xs italic leading-relaxed max-h-24 overflow-y-auto ${textMutedClass}`}>{bookingDetails.description}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  };
  // --- END SERVICE BOOKING FLOW HANDLERS ---

  const renderCatalogPage = (type) => {
    const isProduct = type === 'products';
    const title = isProduct ? 'Product Catalog' : 'Service Catalog';
    const gradient = isProduct ? 'from-rose-400 via-pink-500 to-purple-500' : 'from-cyan-400 via-blue-500 to-indigo-500';
    
    const mainCategories = isProduct ? CATEGORIES_DATA.products : CATEGORIES_DATA.services;

    const getCategoryProducts = (catTitle) => {
        let prods = MOCK_PRODUCTS.filter(p => p.mainCategory === catTitle);
        if (prods.length > 0 && prods.length < 5) {
            prods = [...prods, ...prods, ...prods].slice(0, 6).map((p, i) => ({...p, id: p.id + '_dup_' + i}));
        }
        if (prods.length === 0) {
           return Array(5).fill(null).map((_, i) => ({
               id: `generic-${i}`,
               name: `${catTitle} Item ${i+1}`,
               category: catTitle,
               price: (Math.random() * 50 + 10).toFixed(2),
               images: [`https://placehold.co/400x400/1e293b/ffffff?text=${catTitle.split(' ')[0]}+${i+1}`],
               rating: 4.5
           }));
        }
        return prods;
    };

    return (
      <section className="pt-32 pb-24 min-h-screen relative z-20 container mx-auto px-4 md:px-6 animate-fade-in">
        <button 
          onClick={() => setCurrentView('home')}
          className={`mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-medium ${isDarkMode ? 'border-white/10 hover:bg-white/10 text-slate-200' : 'border-gray-200 hover:bg-gray-100 text-gray-700'}`}
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> {t('backToHome')}
        </button>

        <div className="mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeadingClass}`}>
                Full <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>{title}</span>
            </h2>
            <p className={`text-lg ${textMutedClass}`}>Browse our complete range of {isProduct ? t('premiumProducts') : t('expertServices')} with exclusive category offers.</p>
        </div>

        <div className="space-y-20">
            {mainCategories.map((category, idx) => {
                const categoryItems = isProduct ? getCategoryProducts(category.title) : getServiceItems(category.title);
                
                return (
                    <div key={idx} className="relative">
                        <div className="flex items-center justify-between mb-6 px-2">
                             <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${category.subCardBg} text-white shadow-lg`}>
                                    {React.cloneElement(category.icon, { className: "w-6 h-6" })}
                                </div>
                                <h3 className={`text-2xl md:text-3xl font-bold ${textHeadingClass}`}>{category.title}</h3>
                             </div>
                             <button 
                                onClick={() => { handleCategoryClick('main', category.title); }}
                                className={`text-sm font-bold uppercase tracking-wider hover:underline ${category.accent}`}
                             >
                                {t('viewAll')}
                             </button>
                        </div>

                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar px-2" style={{ scrollbarWidth: 'none' }}>
                            
                            <div className={`snap-center shrink-0 w-[85vw] md:w-[350px] h-[420px] rounded-[2.5rem] relative overflow-hidden group shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]`}>
                                <img 
                                    src={category.image} 
                                    alt={category.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.textGradient.replace('text', 'from-black/80 via-black/20 to-transparent')}`}></div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs font-bold uppercase tracking-wider mb-auto self-start">
                                        Special Offer
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Up to 30% OFF</h3>
                                    <p className="text-white/90 font-medium mb-6">On select {category.title} items this week.</p>
                                    <button className={`w-full py-3 rounded-xl font-bold text-sm bg-white text-gray-900 shadow-lg`}>
                                        {isProduct ? t('shop') : 'Book'} {category.title}
                                    </button>
                                </div>
                            </div>

                            {categoryItems.map((item, pIdx) => {
                                 const isWished = wishlist.some(w => w.id === item.id);
                                 return (
                                <div 
                                    key={pIdx}
                                    onClick={() => isProduct ? handleProductClick(item) : handleServiceBooking(category.title, item.name)}
                                    className={`snap-center shrink-0 w-[240px] h-[420px] flex flex-col rounded-[2rem] overflow-hidden border transition-all duration-300 group hover:-translate-y-2 cursor-pointer ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                                >
                                    <div className="h-48 relative overflow-hidden bg-gray-100">
                                        <img 
                                            src={item.images[0]} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); isProduct ? (addToCart(item.name, 1), showToast(`Added ${item.name}`, 'success')) : handleServiceBooking(category.title, item.name)}}
                                            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${isProduct ? '' : 'bg-emerald-500/10 text-emerald-500'}`}
                                        >
                                            {isProduct ? <Plus className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                                        </button>
                                        {isProduct && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); addToWishlist(item); }}
                                                className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors shadow ${isWished ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-rose-500'}`}
                                            >
                                                <Heart className="w-4 h-4" fill={isWished ? 'currentColor' : 'none'} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-1 flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className={`text-xs font-bold ${textMutedClass}`}>{item.rating || 4.5}</span>
                                        </div>
                                        <h4 className={`font-bold text-base leading-tight mb-1 line-clamp-2 ${textHeadingClass}`}>{item.name}</h4>
                                        <p className={`text-xs mb-4 ${textMutedClass} line-clamp-1`}>{item.category}</p>
                                        
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className={`font-bold text-lg ${category.accent}`}>{isProduct ? `AED ${item.price}` : 'Request Quote'}</span>
                                        </div>
                                    </div>
                                </div>
                            )})}

                            <div 
                                onClick={() => handleCategoryClick('main', category.title)}
                                className={`snap-center shrink-0 w-[200px] h-[420px] flex flex-col items-center justify-center text-center p-6 rounded-[2rem] border transition-all cursor-pointer group hover:bg-white/5 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${category.subCardBg} text-white`}>
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                                <h4 className={`font-bold text-lg mb-2 ${textHeadingClass}`}>{t('viewAll')}</h4>
                                <p className={`text-sm ${textMutedClass}`}>Explore complete {category.title} catalog</p>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
      </section>
    );
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-500 ${appBgClass}`}>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes aurora-pulse {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
            100% { opacity: 0.3; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-aurora { animation: aurora-pulse 8s ease-in-out infinite; }
        
        .glass-dark {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-light {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .text-glow { text-shadow: 0 0 30px rgba(139, 92, 246, 0.4); }
        .bg-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, ${isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {(isWidgetListening || widgetTranscript) && (
          <div className={`mb-2 px-4 py-2 rounded-xl backdrop-blur-md shadow-xl animate-fade-in max-w-[200px] text-right border ${isDarkMode ? 'bg-black/80 border-white/10 text-white' : 'bg-white/90 border-gray-200 text-gray-900'}`}>
            <p className="text-sm font-medium">{widgetTranscript || "Listening..."}</p>
          </div>
        )}
        
        <button 
          onClick={() => startVoiceRecognition('widget')}
          className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center ${isWidgetListening ? 'bg-gradient-to-r from-rose-500 to-pink-600 animate-pulse ring-4 ring-rose-500/30' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500'}`}
          title="Voice Commands: 'Add [Item] [Qty]'"
        >
           {isWidgetListening ? <Volume2 className="w-7 h-7 text-white animate-bounce" /> : <Mic className="w-7 h-7 text-white" />}
        </button>
      </div>

      {toast && (
          <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in px-6 py-3 rounded-xl border shadow-2xl flex items-center gap-3 w-11/12 md:w-auto ${cardClass}`}>
              {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Info className="w-5 h-5 text-blue-500" />}
              <span className={`font-medium ${textHeadingClass}`}>{toast.message}</span>
          </div>
      )}
      
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid transition-opacity duration-500">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0B1120]/90' : 'bg-gray-50/90'}`}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-400/20 rounded-full blur-[120px] animate-aurora"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-l from-rose-500/20 via-pink-500/20 to-orange-400/20 rounded-full blur-[120px] animate-aurora" style={{ animationDelay: '4s' }}></div>
      </div>

      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? `${cardClass} shadow-xl py-3` : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer group" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-600/30">
              S
            </div>
            <span className={`text-2xl font-bold tracking-tight hidden md:block ${textHeadingClass}`}>
              Sky<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">Market</span>
            </span>
          </div>

          <div className="hidden md:flex items-center mx-2 lg:mx-4">
              <button 
                  onClick={handleLocationFetch}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border group ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-slate-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
              >
                  <div className={`p-1.5 rounded-full transition-colors ${isLocating ? 'bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                      <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-bounce' : ''}`} />
                  </div>
                  <div className="flex flex-col items-start text-xs text-left">
                      <span className={`opacity-50 font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{t('deliverTo')}</span>
                      <span className={`font-bold max-w-[120px] truncate leading-tight ${isLocating ? 'opacity-50' : ''}`}>
                          {isLocating ? 'Locating...' : location || 'Select Location'}
                      </span>
                  </div>
                  <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
              </button>
          </div>

          <div className="flex-1 max-w-xl mx-auto hidden md:block relative">
            <div className={`relative group transition-all duration-300 ${isVoiceListening ? 'ring-2 ring-rose-500 rounded-full' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-focus-within:opacity-60 transition-opacity"></div>
              <input 
                type="text" 
                placeholder={isVoiceListening ? "Listening..." : t('search')}
                value={transcript && isVoiceListening ? transcript : undefined}
                className={`relative w-full border rounded-full py-3 px-12 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all shadow-lg backdrop-blur-md ${inputBgClass}`}
              />
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-purple-400 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
              <button 
                onClick={() => startVoiceRecognition('header')} 
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/5 transition-colors ${isVoiceListening ? 'text-rose-500 animate-pulse bg-rose-500/20' : isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}
                title="Voice Search"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* --- LANGUAGE SWITCHER --- */}
            <div className={`relative flex items-center rounded-full border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'}`}>
                <Globe className={`w-5 h-5 mx-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <select
                    onChange={(e) => setCurrentLang(e.target.value)}
                    value={currentLang}
                    className={`py-2 pr-4 pl-1 text-sm rounded-full bg-transparent focus:outline-none cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    {LANG_OPTIONS.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* --- END LANGUAGE SWITCHER --- */}

            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-indigo-600 hover:bg-black/5'}`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => setCurrentView('wishlist')} 
              className={`p-2 rounded-full transition-all relative ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-black/5'} ${currentView === 'wishlist' ? 'text-rose-500' : ''}`}
              title={t('wishlist')}
            >
                <Heart className="w-6 h-6" fill={currentView === 'wishlist' ? 'currentColor' : 'none'} />
                {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center rounded-full shadow-lg">{wishlist.length}</span>
                )}
            </button>
            
            <button 
                onClick={() => setCurrentView('cart')}
                className={`p-2 rounded-full transition-all relative ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-black/5'} ${currentView === 'cart' ? 'text-indigo-500' : ''}`}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-red-500 to-blue-500 text-white text-xs flex items-center justify-center rounded-full shadow-lg">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
                <button className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${isDarkMode ? 'text-white border-white/20 hover:bg-white/10' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                    Sign Up
                </button>
                <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-red-500 hover:to-blue-500 transition-all text-sm font-bold shadow-lg shadow-blue-600/30">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
            </div>

            <button className={`p-2 rounded-full sm:hidden ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <User className="w-6 h-6" />
            </button>

            <button className={`p-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} onClick={() => setIsMenuOpen(true)}><Menu className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="md:hidden px-4 pt-3 pb-2 w-full">
            <div className={`relative group w-full ${isVoiceListening ? 'ring-2 ring-rose-500 rounded-full' : ''}`}>
              <input 
                type="text" 
                placeholder={isVoiceListening ? "Listening..." : t('search')}
                value={transcript && isVoiceListening ? transcript : undefined}
                className={`w-full border rounded-full py-2.5 px-10 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-md ${inputBgClass}`}
              />
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
              <button 
                onClick={() => startVoiceRecognition('header')} 
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full ${isVoiceListening ? 'text-rose-500 animate-pulse bg-rose-500/20' : isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
        </div>
      </header>

      {currentView === 'home' ? (
        <>
          <div 
            onClick={handleLocationFetch}
            className={`md:hidden mt-[140px] mx-4 p-3 rounded-xl flex items-center gap-3 active:scale-95 transition-transform cursor-pointer relative z-20 ${cardClass}`}
          >
              <div className="p-2 bg-indigo-500/10 rounded-full text-indigo-500">
                  <MapPin className={`w-4 h-4 ${isLocating ? 'animate-bounce' : ''}`} />
              </div>
              <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${textMutedClass}`}>{t('deliverTo')}</span>
                  <span className={`text-sm font-bold ${textHeadingClass}`}>
                      {isLocating ? 'Locating via GPS...' : location || 'Set your location'}
                  </span>
              </div>
              <ChevronDown className={`w-4 h-4 ml-auto ${textMutedClass}`} />
          </div>

          <section ref={heroRef} className="relative pt-6 md:pt-48 pb-16 lg:pb-24 overflow-visible z-10">
            <div className="container mx-auto px-4 md:px-6 relative">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                <div className="lg:w-1/2 text-center lg:text-left space-y-8 relative z-20">
                  <div className={`inline-flex items-center px-5 py-2.5 rounded-full text-base font-bold tracking-wide backdrop-blur-md transition-all border shadow-lg ${isDarkMode ? 'bg-white/10 border-white/20 text-indigo-300 shadow-indigo-900/40' : 'bg-white/80 border-indigo-300 text-indigo-800 shadow-indigo-300/60'}`}>
                    {t('b2bPartner')}
                  </div>
                  
                  <div className="flex flex-col gap-2 min-h-[160px] md:min-h-[auto]">
                    <h1 className={`text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${isDarkMode ? 'text-glow text-white' : 'text-gray-900'}`}>
                      {t('onePlatform')}
                    </h1>
                    <h1 key={fadeKey} className={`text-5xl lg:text-7xl font-bold leading-tight tracking-tight animate-fade-in text-transparent bg-clip-text bg-gradient-to-r ${heroTexts[heroTextIndex].gradient}`}>
                      {heroTexts[heroTextIndex].text}
                    </h1>
                  </div>
                  
                  <p className={`text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${textMutedClass}`}>
                    The ultimate marketplace bridging the gap between farm-fresh sourcing and professional facility management in the Emirates.
                  </p>
                  
                  <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
                    <button onClick={() => setCurrentView('shop')} className="flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 whitespace-nowrap">
                      <ShoppingBag className="w-5 h-5" /> {t('shop')}
                    </button>
                    <button onClick={() => setCurrentView('services')} className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 border rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 backdrop-blur-md whitespace-nowrap ${isDarkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-white/60 text-gray-900 border-gray-200 hover:bg-white shadow-lg'}`}>
                      <Wrench className="w-5 h-5" /> {t('services')}
                    </button>
                  </div>
                </div>

                <div className="lg:w-1/2 relative h-auto md:h-[700px] w-full flex flex-col md:flex-row items-center justify-center perspective-1000 z-10 gap-6 md:gap-0 mt-24 md:mt-0">
                  <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/5 backdrop-blur-sm animate-pulse hidden md:block"></div>
                  
                  <div className={`relative md:absolute md:left-4 md:top-10 w-72 p-6 rounded-3xl z-20 border-t-2 border-rose-500/50 shadow-2xl md:transform md:-rotate-6 md:hover:rotate-0 transition-all duration-500 group ${cardClass}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="p-3 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-2xl text-rose-500 border border-rose-500/20"><ShoppingBag className="w-6 h-6" /></div>
                        <span className="bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg shadow-rose-500/20">{t('products')}</span>
                    </div>
                    <h3 className={`font-bold text-2xl mb-4 ${textHeadingClass}`}>Our {t('products')}</h3>
                    <div className="space-y-3 mb-6">
                        {CATEGORIES_DATA.products.slice(0, 3).map((cat, i) => (
                          <div key={i} className={`h-12 rounded-xl flex items-center px-4 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <span className={`text-sm font-medium ${textMutedClass}`}>{cat.title}</span>
                          </div>
                        ))}
                    </div>
                    <button 
                      onClick={() => setCurrentView('shop')}
                      className="w-full mt-2 py-3 rounded-xl bg-rose-500/10 text-rose-500 text-sm font-bold border border-rose-500/20 group-hover:bg-rose-600 group-hover:text-white transition-all"
                    >
                      Explore {t('products')}
                    </button>
                  </div>

                  <div className={`relative md:absolute md:right-4 md:bottom-10 w-72 p-6 rounded-3xl z-30 border-t-2 border-indigo-500/50 shadow-2xl md:transform md:rotate-6 md:hover:rotate-0 transition-all duration-500 group ${cardClass}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl text-indigo-500 border border-indigo-500/20"><Wrench className="w-6 h-6" /></div>
                        <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg shadow-indigo-500/20">SERVICES</span>
                    </div>
                    <h3 className={`font-bold text-2xl mb-4 ${textHeadingClass}`}>Our {t('services')}</h3>
                    <div className="space-y-3 mb-6">
                        {CATEGORIES_DATA.services.slice(0, 3).map((cat, i) => (
                          <div key={i} className={`h-12 rounded-xl flex items-center px-4 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <span className={`text-sm font-medium ${textMutedClass}`}>{cat.title}</span>
                          </div>
                        ))}
                    </div>
                    <button 
                      onClick={() => setCurrentView('services')}
                      className="w-full mt-2 py-3 rounded-xl bg-indigo-500/10 text-indigo-500 text-sm font-bold border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all"
                    >
                      Explore {t('services')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 md:px-6">
            <SeasonalHeroSlider 
                isDarkMode={isDarkMode} 
                onShopNow={() => setCurrentView('shop')} 
            />
            <TodaysDealsSlider 
                isDarkMode={isDarkMode} 
                t={t} // Pass translation function
                onAddToCart={(name) => { addToCart(name, 1); showToast(`Added ${name} to cart`, 'success'); }} 
                onDealClick={(deal) => {
                    const existingProduct = MOCK_PRODUCTS.find(p => p.name === deal.name);
                    const productData = existingProduct || {
                         id: deal.id,
                         name: deal.name,
                         price: deal.price,
                         originalPrice: deal.original,
                         images: [deal.image],
                         description: `Special daily deal on ${deal.name}. Limited time offer.`,
                         rating: 4.8,
                         reviews: 156,
                         mainCategory: "Deals",
                         category: "Daily Deal",
                         discount: deal.discount,
                         offers: [{ title: 'Special Deal', desc: 'Limited time daily offer' }]
                    };
                    handleProductClick(productData);
                }}
            />
          </div>

          <section id="unified-catalog" className="py-16 md:py-24 relative z-20">
             <div className="container mx-auto px-4 md:px-6">
                
                <div className="flex flex-col lg:flex-row relative">
                    
                    <div className="w-full lg:w-1/2 lg:pr-8 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                            <div>
                                <span className="text-rose-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block flex items-center gap-2">
                                  <span className="w-8 h-[2px] bg-gradient-to-r from-rose-500 to-orange-500 inline-block"></span>
                                  {t('products')}
                                </span>
                                <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${textHeadingClass}`}>
                                    {t('premiumProducts')}
                                </h2>
                            </div>
                            <button 
                              onClick={() => setCurrentView('shop')}
                              className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition-all text-xs uppercase tracking-wider"
                            >
                                {t('viewAll')}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-grow">
                            {CATEGORIES_DATA.products.map((cat, idx) => (
                            <div key={idx} className={`relative rounded-[2.5rem] overflow-hidden p-1 flex flex-col group border-t hover:border-white/20 transition-all ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                <div className="relative h-56 rounded-[2rem] overflow-hidden m-2">
                                    <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-[#0B1120]' : 'from-white'}`}></div>
                                    <img src={cat.image} alt={cat.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/1e293b/ffffff?text=" + cat.title.replace(/ /g, "+"); }} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                    <div className={`absolute top-3 right-3 z-20 backdrop-blur-md p-2 rounded-2xl border text-white ${cat.glow} ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/30 border-white/30'}`}>
                                        {React.cloneElement(cat.icon, { className: "w-6 h-6" })}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-1">
                                        <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.textGradient}`}>{cat.title}</h3>
                                    </div>
                                </div>

                                <div className="p-3 grid grid-cols-2 gap-3 mb-2">
                                    {cat.subcategories.map((sub, sIdx) => (
                                        <div 
                                            key={sIdx} 
                                            onClick={() => handleCategoryClick('sub', sub.name)} 
                                            className={`${cat.subCardBg} rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group/item h-36 md:h-28 relative overflow-hidden transform hover:scale-[1.03] hover:-translate-y-1 shadow-md`}
                                        >
                                            <div className="p-3 md:p-2 rounded-full bg-white/20 text-white group-hover/item:scale-110 transition-all backdrop-blur-sm shadow-inner">
                                                {React.cloneElement(sub.icon, { className: "w-8 h-8 md:w-5 md:h-5" })}
                                            </div>
                                            <span className="text-base md:text-xs font-bold text-white leading-tight drop-shadow-md tracking-wide text-shadow-sm">
                                                {sub.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 pb-4 mt-auto">
                                    <button onClick={() => handleCategoryClick('main', cat.title)} className={`w-full py-3 rounded-2xl text-xs font-bold text-white uppercase tracking-wider ${cat.buttonGradient} shadow-lg hover:scale-[1.02] transition-transform`}>
                                        {t('browse')}
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                        <button onClick={() => setCurrentView('categories')} className="xl:hidden w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold">View All Categories</button>
                    </div>

                    <div className="hidden lg:block absolute left-1/2 top-12 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-white/10 -translate-x-1/2"></div>


                    <div className="w-full lg:w-1/2 lg:pl-8 mt-16 lg:mt-0 flex flex-col">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                            <div>
                                <span className="text-indigo-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block flex items-center gap-2">
                                  <span className="w-8 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 inline-block"></span>
                                  Services
                                </span>
                                <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${textHeadingClass}`}>
                                    {t('expertServices')}
                                </h2>
                            </div>
                            <button 
                              onClick={() => setCurrentView('services')}
                              className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 text-indigo-500 font-bold hover:bg-indigo-500 hover:text-white transition-all text-xs uppercase tracking-wider"
                            >
                                {t('viewAll')}
                            </button>
                        </div>

                         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-grow">
                            {CATEGORIES_DATA.services.map((cat, idx) => (
                            <div key={idx} className={`relative rounded-[2.5rem] overflow-hidden p-1 flex flex-col group border-t hover:border-white/20 transition-all ${cardClass} ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                <div className="relative h-56 rounded-[2rem] overflow-hidden m-2">
                                    <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${isDarkMode ? 'from-[#0B1120]' : 'from-white'}`}></div>
                                    <img src={cat.image} alt={cat.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/1e293b/ffffff?text=" + cat.title.replace(/ /g, "+"); }} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                            <div className={`absolute top-4 right-4 z-20 backdrop-blur-md p-3 rounded-2xl border text-white ${cat.glow} ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/30 border-white/30'}`}>
                                {React.cloneElement(cat.icon, { className: "w-6 h-6" })}
                            </div>
                            <div className="absolute bottom-6 left-6 z-20">
                                <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.textGradient}`}>{cat.title}</h3>
                            </div>
                        </div>

                                <div className="p-3 grid grid-cols-2 gap-3 mb-2">
                                    {cat.subcategories.map((sub, sIdx) => (
                                        <div 
                                            key={sIdx} 
                                            onClick={() => handleServiceBooking(cat.title, sub.name)} 
                                            className={`${cat.subCardBg} rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group/item h-36 md:h-28 relative overflow-hidden transform hover:scale-[1.03] hover:-translate-y-1 shadow-md`}
                                        >
                                            <div className="p-3 md:p-2 rounded-full bg-white/20 text-white group-hover/item:scale-110 transition-all backdrop-blur-sm shadow-inner">
                                                {React.cloneElement(sub.icon, { className: "w-8 h-8 md:w-5 md:h-5" })}
                                            </div>
                                            <span className="text-base md:text-xs font-bold text-white leading-tight drop-shadow-md tracking-wide text-shadow-sm">
                                                {sub.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 pb-4 mt-auto">
                                    <button onClick={() => handleCategoryClick('main', cat.title)} className={`w-full py-3 rounded-2xl text-xs font-bold text-white uppercase tracking-wider ${cat.buttonGradient} shadow-lg hover:scale-[1.02] transition-transform`}>
                                        Book
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                        <button onClick={() => setCurrentView('services')} className="xl:hidden w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold">{t('viewAll')} {t('services')}</button>
                    </div>

                </div>
             </div>
          </section>

          {renderOfferSection()}

          <section id="download-app" className="py-24 relative z-20">
              <div className="container mx-auto px-4 md:px-6">
                  <div className={`rounded-[3rem] p-8 md:p-16 relative overflow-hidden border ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white shadow-2xl border-gray-200'}`}>
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5"></div>
                     
                     <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                         <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                             <span className="text-sm font-bold uppercase tracking-widest text-indigo-500 block">
                                 Download Now
                             </span>
                             <h2 className={`text-4xl md:text-5xl font-bold leading-tight ${textHeadingClass}`}>
                                 {t('getApp')}
                                 <br/>Experience the future of B2B supply.
                             </h2>
                             <p className={`text-lg max-w-lg mx-auto lg:mx-0 ${textMutedClass}`}>
                                 Order instantly using voice commands, track your fleet of deliveries in real-time, and access exclusive mobile-only deals.
                             </p>
                             
                             <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                                 <a href="#" className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-3 rounded-xl font-bold text-white bg-black hover:scale-105 transition-transform shadow-lg w-full sm:w-auto ${isDarkMode ? 'shadow-black/50' : 'shadow-black/20'}`}>
                                     <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M17.3 22.8c-.5.4-1.2.6-1.9.6-.7 0-1.4-.2-1.9-.6-.5-.4-1.2-.6-1.9-.6-.7 0-1.4.2-1.9.6-.5.4-1.2.6-1.9.6-.7 0-1.4-.2-1.9-.6-.5-.4-.7-.9-.7-1.5 0-.7.3-1.4.8-1.8.5-.4 1.1-.6 1.8-.6.7 0 1.3.2 1.8.6.5.4.7 1 .7 1.7 0 .6-.2 1.2-.7 1.6s-1.2.6-1.9.6c-.7 0-1.4-.2-1.9-.6-.5-.4-1.2-.6-1.9-.6-.7 0-1.4.2-1.9.6-.5.4-.7.9-.7 1.5 0 .7.3 1.4.8 1.8.5.4 1.1.6 1.8.6.7 0 1.4-.2 1.9-.6.5-.4.7-.9.7-1.5 0-.7-.3-1.4-.8-1.8-.5-.4-1.1-.6-1.8-.6-.7 0-1.3.2-1.8.6zM12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-14c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" clipRule="evenodd" fillRule="evenodd"/>
                                         <path d="M12 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
                                         <path d="M12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3-3 3z"/>
                                         <path d="M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
                                     </svg>

                                     <div className="text-left">
                                         <span className="text-[10px] uppercase tracking-wide opacity-80 block leading-none mb-1">Download on the</span>
                                         <span className="text-lg font-bold leading-none block">App Store</span>
                                     </div>
                                 </a>

                                 <a href="#" className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-3 rounded-xl font-bold text-white bg-black hover:scale-105 transition-transform shadow-lg w-full sm:w-auto ${isDarkMode ? 'shadow-black/50' : 'shadow-black/20'}`}>
                                     <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.08 2.08l10.92 10.92-10.92 10.92v-21.84zM14 13.92l3.78-3.78L14 6.36v7.56zM14 6.36L17.78 2.58l-3.78-3.78v7.56zM17.78 2.58L22 6.8l-4.22 4.22L17.78 2.58z" fill="#00C853"/>
                                        <path d="M14 17.64l3.78 3.78-3.78 3.78v-7.56z" fill="#FFC107"/>
                                        <path d="M17.78 2.58L14 6.36v7.56l3.78 3.78L22 13.92V6.8l-4.22-4.22z" fill="#4CAF50"/>
                                        <path d="M14 13.92v7.56L17.78 25.26l4.22-4.22-4.22-4.22z" fill="#FF3D00"/>
                                        <path d="M14 6.36V-1.2l3.78 3.78L14 6.36z" fill="#2196F3"/>
                                     </svg>
                                     <div className="text-left">
                                         <span className="text-[10px] uppercase tracking-wide opacity-80 block leading-none mb-1">Get it on</span>
                                         <span className="text-lg font-bold leading-none block">Google Play</span>
                                     </div>
                                 </a>
                             </div>
                         </div>
                         
                         <div className="lg:w-1/2 flex justify-center relative">
                             <img 
                                 src="https://placehold.co/200x400/36454F/FFFFFF?text=App+Screen+1" 
                                 alt="App Mockup 1" 
                                 onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x400/36454F/FFFFFF?text=App+Screen+1"; }}
                                 className="w-48 h-auto rounded-3xl shadow-2xl rotate-3 translate-x-4 hover:rotate-0 transition-transform duration-500" 
                                 style={{ border: '8px solid black' }}
                             />
                             <img 
                                 src="https://placehold.co/200x400/212121/FFFFFF?text=Deals+Screen" 
                                 alt="App Mockup 2" 
                                 onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x400/212121/FFFFFF?text=Deals+Screen"; }}
                                 className="w-48 h-auto rounded-3xl shadow-2xl -rotate-6 -translate-x-4 opacity-75 hover:opacity-100 transition-transform duration-500 absolute top-10" 
                                 style={{ border: '8px solid black' }}
                             />
                         </div>
                     </div>
                  </div>
              </div>
          </section>

          <section className="pb-16 pt-0 relative z-20">
             <div className="container mx-auto px-4 md:px-6">
                <div className={`relative z-40 mt-12 mb-24 p-8 md:p-12 rounded-[2.5rem] border shadow-2xl overflow-hidden group ${cardClass}`}>
                   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-600/20 via-purple-600/20 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                      <div className="space-y-6">
                          <h3 className={`text-3xl md:text-4xl font-bold leading-tight ${textHeadingClass}`}>
                              Have questions? <br/>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Let's talk business.</span>
                          </h3>
                          <p className={`text-lg max-w-md ${textMutedClass}`}>
                              Whether you need a custom quote for your restaurant or have a question about our supply chain, our team is ready to help.
                          </p>
                          <div className="space-y-4 pt-4">
                              <div className={`flex items-center gap-4 ${textMutedClass}`}>
                                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500">
                                      <Phone className="w-5 h-5" />
                                  </div>
                                  <span>+971 4 123 4567</span>
                              </div>
                              <div className={`flex items-center gap-4 ${textMutedClass}`}>
                                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500">
                                      <Mail className="w-5 h-5" />
                                  </div>
                                  <span>hello@skymarket.com</span>
                              </div>
                              <div className={`flex items-center gap-4 ${textMutedClass}`}>
                                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-indigo-500">
                                      <MapPin className="w-5 h-5" />
                                  </div>
                                  <span>Business Bay, Dubai, UAE</span>
                              </div>
                          </div>
                      </div>

                      <form className={`space-y-4 p-6 rounded-3xl border backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Name</label>
                                  <input type="text" placeholder="John Doe" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} />
                              </div>
                              <div className="space-y-2">
                                  <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Email</label>
                                  <input type="email" placeholder="john@example.com" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${inputBgClass}`} />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Subject</label>
                              <select className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer ${inputBgClass}`}>
                                  <option>General Inquiry</option>
                                  <option>Bulk Order Quote</option>
                                  <option>Partnership</option>
                                  <option>Support</option>
                              </select>
                          </div>
                          <div className="space-y-2">
                              <label className={`text-sm font-medium ml-1 ${textMutedClass}`}>Message</label>
                              <textarea rows="4" placeholder="How can we help you?" className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none ${inputBgClass}`}></textarea>
                          </div>
                          <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                              <Send className="w-5 h-5" /> Send Message
                          </button>
                      </form>
                   </div>
                </div>
             </div>
          </section>
        </>
      ) : currentView === 'cart' ? (
        renderCartPage()
      ) : currentView === 'wishlist' ? ( 
        renderWishlistPage()
      ) : currentView === 'shop' ? (
        renderShopPage()
      ) : currentView === 'product-detail' ? (
        renderProductDetail()
      ) : currentView === 'checkout' ? (
        renderCheckoutPage()
      ) : currentView === 'order-tracking' ? (
        renderOrderTracking()
      ) : currentView === 'categories' ? (
        renderCategoriesPage()
      ) : currentView === 'subcategories' ? (
        renderSubcategoriesPage()
      ) : currentView === 'about' ? (
        renderAboutPage()
      ) : currentView === 'contact' ? (
        renderContactPage()
      ) : currentView === 'service-booking' ? (
        renderServiceBookingFlow()
      ) : (
        renderCatalogPage(currentView)
      )}

      <footer className={`relative pt-16 pb-16 z-30 border-t ${isDarkMode ? 'bg-[#050914] border-white/5' : 'bg-white border-gray-200'}`}>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
          <h1 className={`text-[15vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b opacity-30 ${isDarkMode ? 'from-white/5 to-transparent' : 'from-black/5 to-transparent'}`}>
            SKYMARKET
          </h1>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 border-b border-white/5 pb-16">
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-600/30">
                  S
                </div>
                <span className={`text-2xl font-bold ${textHeadingClass}`}>SkyMarket</span>
              </div>
              <p className={`leading-relaxed text-sm max-w-sm ${textMutedClass}`}>
                Redefining the supply chain experience with technology, transparency, and trust. The one-stop solution for homes and businesses across the globe.
              </p>
              <div className="flex gap-4 pt-2">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border hover:scale-110 ${isDarkMode ? 'bg-white/5 border-white/5 text-slate-400 hover:bg-white hover:text-black' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white'}`}>
                        <Icon className="w-5 h-5"/>
                    </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className={`font-bold mb-6 text-lg ${textHeadingClass}`}>{t('about')}</h4>
               <ul className="space-y-4">
                 {["About Us", "Careers", "Become a Partner", "Blog", "Press"].map((link, i) => (
                   <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); setIsMenuOpen(false); }} className={`transition-colors text-sm hover:translate-x-1 inline-block ${textMutedClass} hover:text-indigo-500`}>{link}</a></li>
                 ))}
               </ul>
            </div>
            <div className="lg:col-span-3">
               <h4 className={`font-bold mb-6 text-lg ${textHeadingClass}`}>{t('categories')}</h4>
               <ul className="space-y-4">
                 {["Fresh Market", "Frozen Goods", "Kitchen Equipment", "Maintenance Services", "Pest Control"].map((link, i) => (
                   <li key={i}><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('categories'); setIsMenuOpen(false); }} className={`transition-colors text-sm hover:translate-x-1 inline-block ${textMutedClass} hover:text-rose-500`}>{link}</a></li>
                 ))}
               </ul>
            </div>
            <div className="lg:col-span-3">
               <h4 className={`font-bold mb-6 text-lg ${textHeadingClass}`}>{t('contact')}</h4>
               <ul className={`space-y-4 text-sm ${textMutedClass}`}>
                 <li className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                   <span>123 Market Street, Suite 400,<br/>Tech City, TC 90210</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                   <span>+1 (555) 123-4567</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                   <span>hello@skymarket.com</span>
                 </li>
               </ul>
            </div>
          </div>
          
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${textMutedClass}`}>
            <p>© 2024 SkyMarket Inc. Designed for the Future.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div className={`relative w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl ${mobileMenuBg} animate-slide-in-right`}>
            <div className="flex justify-between items-center mb-8">
              <span className={`text-xl font-bold ${textHeadingClass}`}>MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              
              <a href="#" onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                  <span className="font-medium">{t('home')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a href="#" onClick={() => { setCurrentView('shop'); setIsMenuOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
                  <span className="font-medium">Shop</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
              
              <a href="#" onClick={() => { setCurrentView('wishlist'); setIsMenuOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="font-medium">{t('wishlist')} ({wishlist.length})</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <div>
                <button 
                  onClick={() => toggleSubMenu('products')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
                    <span className="font-medium">{t('categories')}</span>
                  </div>
                  {expandedMenu === 'products' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {expandedMenu === 'products' && (
                  <div className={`mt-2 ml-4 space-y-2 border-l-2 pl-4 animate-fade-in ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                    {CATEGORIES_DATA.products.map((cat, i) => (
                      <a key={i} href="#" onClick={() => { setCurrentView('shop'); handleCategoryClick('main', cat.title); setIsMenuOpen(false); }} className={`block py-2 text-sm ${textMutedClass} hover:text-rose-500`}>{cat.title}</a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#" onClick={() => { setCurrentView('about'); setIsMenuOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                  <span className="font-medium">{t('about')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a href="#" onClick={() => { setCurrentView('contact'); setIsMenuOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                  <span className="font-medium">{t('contact')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <div className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${mobileMenuItemBg}`}>
                  <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-indigo-500" />
                      <span className="font-medium">Language</span>
                  </div>
                  <select
                      onChange={(e) => setCurrentLang(e.target.value)}
                      value={currentLang}
                      className={`py-1 pr-1 pl-1 text-sm rounded-lg bg-transparent focus:outline-none cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                      {LANG_OPTIONS.map(lang => (
                          <option key={lang.code} value={lang.code}>
                              {lang.name}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="pt-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  <LogIn className="w-5 h-5" /> Sign In
                </button>
                <button className={`w-full bg-transparent border py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${isDarkMode ? 'border-slate-700 text-white hover:bg-slate-800' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>
                  <UserPlus className="w-5 h-5" /> Create Account
                </button>
              </div>

              <div className={`pt-4 text-center text-sm ${textMutedClass}`}>
                © 2024 SkyMarket Inc.
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OneFile;