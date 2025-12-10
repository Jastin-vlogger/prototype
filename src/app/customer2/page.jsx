"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBasket, Wrench, Mic, Search, ChevronLeft, Snowflake, Fish, Milk, Package, 
  ChefHat, Armchair, MapPin, Hammer, Bug, ShieldCheck, X, ArrowRight, Check, Menu, 
  User, LogIn, FileText, HelpCircle, LogOut, Settings, Bell, Home, Info, Phone, 
  ShoppingBag, Mail, LayoutDashboard, ClipboardList, FileBarChart, Percent, Plus, 
  Minus, Trash2, CreditCard, Download, Star, Filter, Heart, Share2,
  Beef, Carrot, Apple, Coffee, Wine, Lamp, Sofa, Zap, Droplet, SprayCan, ClipboardCheck, 
  GraduationCap, Microscope, Utensils, Truck, Map, Calendar, Clock
} from 'lucide-react';

// --- DATA SETS ---

const ProductsData = [
  {
    id: 'fresh',
    title: 'Fresh Food',
    subtitle: 'Farm to table essentials',
    icon: <Fish className="w-8 h-8" />,
    items: [
      { id: 'p1', name: 'Atlantic Salmon', price: 120, unit: 'kg', rating: 4.8, reviews: 124, description: 'Premium grade, sustainably sourced Atlantic Salmon. Rich in Omega-3, perfect for grilling or sushi.', images: ['salmon1', 'salmon2', 'salmon3'], icon: <Fish size={20}/> },
      { id: 'p2', name: 'Chicken Breast', price: 45, unit: 'kg', rating: 4.5, reviews: 89, description: 'Free-range, organic chicken breast. Boneless and skinless, ideal for healthy meals.', images: ['chk1'], icon: <Utensils size={20}/> }, 
      { id: 'p3', name: 'Veg Box', price: 30, unit: 'box', rating: 4.9, reviews: 210, description: 'Weekly selection of seasonal organic vegetables. Farm fresh delivery.', images: ['veg1'], icon: <Carrot size={20}/> },
      { id: 'p4', name: 'Fresh Herbs', price: 15, unit: 'bunch', rating: 4.7, reviews: 56, description: 'Aromatic mix of Basil, Thyme, and Rosemary.', images: ['herb1'], icon: <Apple size={20}/> }
    ],
    gradient: 'from-emerald-500 to-teal-600',
    lightGradient: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
    border: 'border-emerald-100',
    subItemBorder: 'border-emerald-100 hover:border-emerald-300',
    subItemIconBg: 'bg-emerald-100 text-emerald-600',
    subCardGradient: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    subCardText: 'text-emerald-900',
    subCardIconBg: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'frozen',
    title: 'Frozen Goods',
    subtitle: 'Premium long-lasting quality',
    icon: <Snowflake className="w-8 h-8" />,
    items: [
      { id: 'p5', name: 'Jumbo Prawns', price: 180, unit: 'kg', rating: 4.9, reviews: 312, description: 'Flash-frozen jumbo tiger prawns. Deveined and ready to cook.', images: ['prawn1'], icon: <Fish size={20}/> },
      { id: 'p6', name: 'Mixed Berries', price: 40, unit: 'bag', rating: 4.6, reviews: 150, description: 'Antioxidant-rich blend of strawberries, blueberries, and raspberries.', images: ['berry1'], icon: <Apple size={20}/> },
      { id: 'p7', name: 'Angus Beef', price: 90, unit: 'box', rating: 4.8, reviews: 200, description: 'Premium Angus beef patties, perfect for gourmet burgers.', images: ['beef1'], icon: <Beef size={20}/> },
      { id: 'p8', name: 'Spinach', price: 20, unit: 'bag', rating: 4.4, reviews: 90, description: 'Chopped spinach cubes, frozen at peak freshness.', images: ['spin1'], icon: <Carrot size={20}/> }
    ],
    gradient: 'from-sky-500 to-blue-600',
    lightGradient: 'from-sky-50 to-blue-50',
    accent: 'text-sky-700',
    iconBg: 'bg-sky-100 text-sky-600',
    button: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200',
    border: 'border-sky-100',
    subItemBorder: 'border-sky-100 hover:border-sky-300',
    subItemIconBg: 'bg-sky-100 text-sky-600',
    subCardGradient: 'bg-gradient-to-br from-sky-500 to-blue-600',
    subCardText: 'text-sky-900',
    subCardIconBg: 'bg-sky-100 text-sky-600'
  },
  {
    id: 'chilled',
    title: 'Chilled Dairy',
    subtitle: 'Daily fresh dairy needs',
    icon: <Milk className="w-8 h-8" />,
    items: [
      { id: 'p9', name: 'Full Cream Milk', price: 12, unit: 'gal', rating: 4.7, reviews: 500, description: 'Fresh full cream milk, pasteurized and homogenized.', images: ['milk1'], icon: <Milk size={20}/> },
      { id: 'p10', name: 'Greek Yogurt', price: 8, unit: 'tub', rating: 4.8, reviews: 120, description: 'Thick and creamy authentic Greek yogurt.', images: ['yog1'], icon: <Package size={20}/> },
      { id: 'p11', name: 'Cheddar Block', price: 60, unit: 'block', rating: 4.5, reviews: 80, description: 'Aged cheddar cheese block, sharp and flavorful.', images: ['ch1'], icon: <Package size={20}/> },
      { id: 'p12', name: 'Butter', price: 25, unit: 'pack', rating: 4.9, reviews: 300, description: 'Premium unsalted butter for baking and cooking.', images: ['but1'], icon: <Milk size={20}/> }
    ],
    gradient: 'from-blue-500 to-indigo-600',
    lightGradient: 'from-blue-50 to-indigo-50',
    accent: 'text-blue-700',
    iconBg: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
    border: 'border-blue-100',
    subItemBorder: 'border-blue-100 hover:border-blue-300',
    subItemIconBg: 'bg-blue-100 text-blue-600',
    subCardGradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    subCardText: 'text-blue-900',
    subCardIconBg: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'ambient',
    title: 'Ambient & Pantry',
    subtitle: 'Essential pantry staples',
    icon: <Package className="w-8 h-8" />,
    items: [
      { id: 'p13', name: 'Basmati Rice', price: 80, unit: 'sack', rating: 4.6, reviews: 450, description: 'Long grain aromatic Basmati rice.', images: ['rice1'], icon: <Package size={20}/> },
      { id: 'p14', name: 'Olive Oil', price: 55, unit: 'tin', rating: 4.8, reviews: 220, description: 'Extra virgin olive oil, cold pressed.', images: ['oil1'], icon: <Droplet size={20}/> },
      { id: 'p15', name: 'Tomato Paste', price: 40, unit: 'case', rating: 4.5, reviews: 110, description: 'Concentrated tomato paste for rich sauces.', images: ['tom1'], icon: <Apple size={20}/> },
      { id: 'p16', name: 'Coffee Beans', price: 120, unit: 'kg', rating: 4.9, reviews: 340, description: 'Roasted Arabica coffee beans.', images: ['cof1'], icon: <Coffee size={20}/> }
    ],
    gradient: 'from-amber-500 to-orange-600',
    lightGradient: 'from-amber-50 to-orange-50',
    accent: 'text-amber-700',
    iconBg: 'bg-amber-100 text-amber-600',
    button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
    border: 'border-amber-100',
    subItemBorder: 'border-amber-100 hover:border-amber-300',
    subItemIconBg: 'bg-amber-100 text-amber-600',
    subCardGradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    subCardText: 'text-amber-900',
    subCardIconBg: 'bg-amber-100 text-amber-600'
  }
];

const ServicesData = [
  {
    id: 'kitchen',
    title: 'Kitchen Equipment',
    subtitle: 'Professional grade tools',
    icon: <ChefHat className="w-8 h-8" />,
    items: [
      { id: 's1', name: 'Chef Knife Set', price: 300, unit: 'set', rating: 4.9, reviews: 50, stock: 'In Stock', description: 'High carbon stainless steel knife set.', icon: <Utensils size={20}/> },
      { id: 's2', name: 'Industrial Mixer', price: 2500, unit: 'unit', rating: 4.8, reviews: 20, stock: 'Low Stock', description: 'Heavy duty planetary mixer for bakeries.', icon: <ChefHat size={20}/> },
      { id: 's3', name: 'Convection Oven', price: 5000, unit: 'unit', rating: 4.7, reviews: 15, stock: 'Pre-Order', description: 'Professional convection oven with steam function.', icon: <Package size={20}/> },
      { id: 's4', name: 'Gas Grill', price: 1200, unit: 'unit', rating: 4.6, reviews: 35, stock: 'In Stock', description: 'Commercial gas grill with 4 burners.', icon: <Utensils size={20}/> }
    ],
    gradient: 'from-slate-600 to-gray-700',
    lightGradient: 'from-slate-50 to-gray-100',
    accent: 'text-slate-700',
    iconBg: 'bg-slate-200 text-slate-700',
    button: 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200',
    border: 'border-slate-200',
    subItemBorder: 'border-slate-200 hover:border-slate-300',
    subItemIconBg: 'bg-slate-100 text-slate-600',
    subCardGradient: 'bg-gradient-to-br from-slate-600 to-gray-700',
    subCardText: 'text-slate-900',
    subCardIconBg: 'bg-slate-100 text-slate-600'
  },
  {
    id: 'furniture',
    title: 'Furniture',
    subtitle: 'Interior & Exterior',
    icon: <Armchair className="w-8 h-8" />,
    items: [
      { id: 's5', name: 'Dining Table', price: 400, unit: 'pc', rating: 4.5, reviews: 40, stock: 'In Stock', description: 'Solid wood dining table for commercial use.', icon: <Sofa size={20}/> },
      { id: 's6', name: 'Stackable Chairs', price: 45, unit: 'pc', rating: 4.6, reviews: 100, stock: 'Bulk', description: 'Durable stackable chairs for events.', icon: <Armchair size={20}/> },
      { id: 's7', name: 'Wall Art Set', price: 120, unit: 'set', rating: 4.3, reviews: 25, stock: 'In Stock', description: 'Modern abstract wall art set.', icon: <MapPin size={20}/> },
      { id: 's8', name: 'Patio Umbrella', price: 150, unit: 'pc', rating: 4.7, reviews: 60, stock: 'In Stock', description: 'Heavy duty patio umbrella with stand.', icon: <Lamp size={20}/> }
    ],
    gradient: 'from-orange-500 to-red-600',
    lightGradient: 'from-orange-50 to-red-50',
    accent: 'text-orange-700',
    iconBg: 'bg-orange-100 text-orange-600',
    button: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200',
    border: 'border-orange-100',
    subItemBorder: 'border-orange-100 hover:border-orange-300',
    subItemIconBg: 'bg-orange-100 text-orange-600',
    subCardGradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    subCardText: 'text-orange-900',
    subCardIconBg: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'signboards',
    title: 'Signboards',
    subtitle: 'Branding solutions',
    icon: <MapPin className="w-8 h-8" />,
    items: [
      { id: 's9', name: 'Neon Sign', price: 400, unit: 'unit', rating: 4.8, reviews: 12, stock: 'Custom', description: 'Custom LED neon sign for branding.', icon: <Zap size={20}/> },
      { id: 's10', name: '3D Lettering', price: 80, unit: 'letter', rating: 4.7, reviews: 20, stock: 'Custom', description: '3D acrylic lettering for storefronts.', icon: <FileText size={20}/> },
      { id: 's11', name: 'Window Vinyl', price: 120, unit: 'sqm', rating: 4.5, reviews: 30, stock: 'Custom', description: 'High quality window vinyl graphics.', icon: <MapPin size={20}/> },
      { id: 's12', name: 'A-Frame Board', price: 150, unit: 'pc', rating: 4.6, reviews: 45, stock: 'In Stock', description: 'Durable A-frame pavement sign.', icon: <MapPin size={20}/> }
    ],
    gradient: 'from-purple-500 to-fuchsia-600',
    lightGradient: 'from-purple-50 to-fuchsia-50',
    accent: 'text-purple-700',
    iconBg: 'bg-purple-100 text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200',
    border: 'border-purple-100',
    subItemBorder: 'border-purple-100 hover:border-purple-300',
    subItemIconBg: 'bg-purple-100 text-purple-600',
    subCardGradient: 'bg-gradient-to-br from-purple-500 to-fuchsia-100',
    subCardText: 'text-purple-900',
    subCardIconBg: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'repairs',
    title: 'Repairs',
    subtitle: 'Professional Maintenance',
    icon: <Hammer className="w-8 h-8" />,
    items: [
      { id: 's13', name: 'AC Service', price: 150, unit: 'unit', rating: 4.9, reviews: 150, stock: 'Available', description: 'Complete AC cleaning and maintenance.', icon: <Snowflake size={20}/> },
      { id: 's14', name: 'Plumbing Check', price: 80, unit: 'hr', rating: 4.8, reviews: 90, stock: 'Available', description: 'Professional plumbing inspection and repair.', icon: <Droplet size={20}/> },
      { id: 's15', name: 'Electrical Fix', price: 90, unit: 'hr', rating: 4.8, reviews: 110, stock: 'Available', description: 'Certified electrical repair services.', icon: <Zap size={20}/> },
      { id: 's16', name: 'Painting', price: 25, unit: 'sqm', rating: 4.5, reviews: 60, stock: 'Available', description: 'Interior and exterior painting services.', icon: <SprayCan size={20}/> }
    ],
    gradient: 'from-red-500 to-pink-600',
    lightGradient: 'from-red-50 to-pink-50',
    accent: 'text-red-700',
    iconBg: 'bg-red-100 text-red-600',
    button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-200',
    border: 'border-red-100',
    subItemBorder: 'border-red-100 hover:border-red-300',
    subItemIconBg: 'bg-red-100 text-red-600',
    subCardGradient: 'bg-gradient-to-br from-red-500 to-pink-100',
    subCardText: 'text-red-900',
    subCardIconBg: 'bg-red-100 text-red-600'
  },
  {
    id: 'pest',
    title: 'Pest Control',
    subtitle: 'Hygiene standards',
    icon: <Bug className="w-8 h-8" />,
    items: [
      { id: 's17', name: 'Fumigation', price: 300, unit: 'visit', rating: 4.9, reviews: 80, stock: 'Available', description: 'Whole premise fumigation service.', icon: <SprayCan size={20}/> },
      { id: 's18', name: 'Rodent Control', price: 150, unit: 'visit', rating: 4.7, reviews: 100, stock: 'Available', description: 'Effective rodent control and prevention.', icon: <Bug size={20}/> },
      { id: 's19', name: 'Insect Spray', price: 100, unit: 'visit', rating: 4.6, reviews: 120, stock: 'Available', description: 'Targeted insect spraying service.', icon: <SprayCan size={20}/> },
      { id: 's20', name: 'Prevention Plan', price: 500, unit: 'yr', rating: 4.8, reviews: 40, stock: 'Available', description: 'Annual pest prevention maintenance plan.', icon: <ShieldCheck size={20}/> }
    ],
    gradient: 'from-teal-500 to-green-600',
    lightGradient: 'from-teal-50 to-green-50',
    accent: 'text-teal-700',
    iconBg: 'bg-teal-100 text-teal-600',
    button: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200',
    border: 'border-teal-100',
    subItemBorder: 'border-teal-100 hover:border-teal-300',
    subItemIconBg: 'bg-teal-100 text-teal-600',
    subCardGradient: 'bg-gradient-to-br from-teal-500 to-green-100',
    subCardText: 'text-teal-900',
    subCardIconBg: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'safety',
    title: 'Food Safety',
    subtitle: 'Quality Assurance',
    icon: <ShieldCheck className="w-8 h-8" />,
    items: [
      { id: 's21', name: 'HACCP Audit', price: 800, unit: 'audit', rating: 5.0, reviews: 20, stock: 'Book', description: 'Comprehensive HACCP compliance audit.', icon: <ClipboardCheck size={20}/> },
      { id: 's22', name: 'Hygiene Training', price: 50, unit: 'person', rating: 4.8, reviews: 200, stock: 'Available', description: 'Staff food hygiene training certification.', icon: <GraduationCap size={20}/> },
      { id: 's23', name: 'Lab Testing', price: 120, unit: 'sample', rating: 4.9, reviews: 60, stock: 'Available', description: 'Laboratory food safety testing.', icon: <Microscope size={20}/> },
      { id: 's24', name: 'Safety Cert', price: 200, unit: 'cert', rating: 4.7, reviews: 100, stock: 'Available', description: 'Official food safety certification.', icon: <ShieldCheck size={20}/> }
    ],
    gradient: 'from-indigo-500 to-violet-600',
    lightGradient: 'from-indigo-50 to-violet-50',
    accent: 'text-indigo-700',
    iconBg: 'bg-indigo-100 text-indigo-600',
    button: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    border: 'border-indigo-100',
    subItemBorder: 'border-indigo-100 hover:border-indigo-300',
    subItemIconBg: 'bg-indigo-100 text-indigo-600',
    subCardGradient: 'bg-gradient-to-br from-indigo-500 to-violet-100',
    subCardText: 'text-indigo-900',
    subCardIconBg: 'bg-indigo-100 text-indigo-600'
  }
];

// --- MOCK DATABASE FOR E-COMMERCE ---
const generateMockProducts = () => {
  const baseProducts = [];
  const categories = [
    { id: 'fresh', name: 'Fresh', subs: ['Fish', 'Chicken', 'Fruit', 'Veg'] },
    { id: 'frozen', name: 'Frozen', subs: ['Seafood', 'Meat', 'Dessert', 'Veg'] },
    { id: 'chilled', name: 'Chilled', subs: ['Dairy', 'Cheese', 'Yogurt'] },
    { id: 'ambient', name: 'Ambient', subs: ['Rice', 'Pasta', 'Sauces', 'Oil'] },
    { id: 'kitchen', name: 'Kitchen', subs: ['Knives', 'Ovens', 'Mixers'] },
    { id: 'furniture', name: 'Furniture', subs: ['Table', 'Chair', 'Decor'] },
    { id: 'repairs', name: 'Repairs', subs: ['AC', 'Plumbing', 'Electric'] }
  ];

  categories.forEach(cat => {
    cat.subs.forEach(sub => {
      for (let i = 1; i <= 6; i++) {
        baseProducts.push({
          id: `${cat.id}-${sub}-${i}`,
          categoryId: cat.id,
          subCategory: sub,
          name: `${sub} Item ${i} - Premium`,
          price: Math.floor(Math.random() * 200) + 20,
          unit: 'unit',
          rating: (4 + Math.random()).toFixed(1),
          reviews: Math.floor(Math.random() * 500),
          stock: Math.random() > 0.2 ? 'In Stock' : 'Low Stock',
          description: `High-quality ${sub.toLowerCase()} sourced from the best suppliers. Perfect for your business needs.`,
          specifications: { origin: 'Local Farm', shelfLife: '7 Days', grade: 'A+' },
          images: [1,2,3,4],
          icon: <Package size={40} />
        });
      }
    });
  });
  // Add original landing items to DB to match IDs
  [...ProductsData, ...ServicesData].forEach(c => c.items.forEach(i => baseProducts.push({...i, categoryId: c.id, subCategory: i.name.split(' ')[0]})));
  return baseProducts;
};

const ALL_PRODUCTS_DB = generateMockProducts();

// --- COMPONENTS ---

// 1. Reusable Components
const RatingStars = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= Math.round(rating) ? "currentColor" : "none"} className={i > Math.round(rating) ? "text-gray-300" : ""} />)}
  </div>
);

// 2. Full Page Components (E-Commerce)

const ProductDetailsPage = ({ product, onBack, addToCart, buyNow, wishlist, toggleWishlist }) => {
  const [activeImg, setActiveImg] = useState(0);
  const relatedProducts = ALL_PRODUCTS_DB.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in slide-in-from-right-10 duration-300 pt-16">
      {/* Page Header is part of the main App shell, so we add pt-16 here to clear it */}
      <div className="sticky top-16 z-30 bg-white border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft/></button>
        <h1 className="font-bold text-lg truncate">{product.name}</h1>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer" onClick={() => toggleWishlist(product.id)}>
               <Heart className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
             </div>
             <div className="text-slate-100"><Package size={200} strokeWidth={0.5} className="md:w-[300px] md:h-[300px]" /></div>
             <div className="absolute inset-0 flex items-center justify-center text-slate-800 transform scale-150">{product.icon}</div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white border-2 flex-shrink-0 flex items-center justify-center ${activeImg === i ? 'border-emerald-500' : 'border-transparent'}`}>
                <Package size={24} className="text-slate-300 md:w-8 md:h-8"/>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pb-24 lg:pb-0">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-bold"><Star size={14} fill="currentColor"/> {product.rating}</div>
              <span className="text-gray-500 underline">{product.reviews || 0} Reviews</span>
              <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock}</span>
            </div>
          </div>

          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-8">${product.price}<span className="text-lg text-gray-400 font-medium">/{product.unit}</span></div>

          <div className="prose prose-slate text-gray-600 mb-8">
            <p>{product.description || "Premium quality product sourced from top suppliers."}</p>
            <h4 className="font-bold text-slate-900 mt-4 mb-2">Specifications</h4>
            <ul className="list-disc pl-5 space-y-1">
               {product.specifications && Object.entries(product.specifications).map(([k,v]) => (
                 <li key={k} className="capitalize"><span className="font-semibold">{k}:</span> {v}</li>
               ))}
               {!product.specifications && <li>Standard Grade A</li>}
            </ul>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 lg:static lg:bg-transparent lg:p-0 lg:border-none shadow-[0_-5px_10px_rgba(0,0,0,0.05)] lg:shadow-none z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 py-3 sm:py-0 justify-between sm:justify-start">
                  <button className="p-2 hover:text-emerald-600"><Minus size={20}/></button>
                  <span className="font-bold text-lg">1</span>
                  <button className="p-2 hover:text-emerald-600"><Plus size={20}/></button>
               </div>
               <div className="flex gap-4 flex-1">
                 <button onClick={() => addToCart(product)} className="flex-1 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-xl transition-colors flex items-center justify-center gap-2">
                   <ShoppingBasket size={20}/> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
                 </button>
                 <button onClick={() => buyNow(product)} className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-colors flex items-center justify-center gap-2">
                   <CreditCard size={20}/> Buy Now
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 border-t mt-8 mb-20">
        <h3 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           {relatedProducts.map(p => (
             <div key={p.id} className="bg-white p-3 md:p-4 rounded-2xl border hover:shadow-lg transition-all cursor-pointer">
                <div className="h-24 md:h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-slate-400"><Package size={32} className="md:w-10 md:h-10"/></div>
                <h4 className="font-bold text-sm truncate">{p.name}</h4>
                <div className="flex justify-between items-center mt-2">
                   <span className="font-bold text-emerald-600">${p.price}</span>
                   <button className="p-1.5 bg-slate-900 text-white rounded-lg"><Plus size={14}/></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const ShopListingPage = ({ categoryId, initialSearch, onClose, onProductClick, addToCart }) => {
  const categoryData = [...ProductsData, ...ServicesData].find(c => c.id === categoryId);
  const [filter, setFilter] = useState(initialSearch || 'All');
  const [products, setProducts] = useState([]);
  
  // Filter logic
  useEffect(() => {
    let filtered = ALL_PRODUCTS_DB.filter(p => p.categoryId === categoryId);
    if (filter && filter !== 'All') {
      filtered = filtered.filter(p => 
        p.subCategory?.toLowerCase().includes(filter.toLowerCase()) || 
        p.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    setProducts(filtered);
  }, [categoryId, filter]);

  // Derive subs from actual data
  const subCategories = ['All', ...new Set(ALL_PRODUCTS_DB.filter(p => p.categoryId === categoryId).map(p => p.subCategory).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in pt-16">
      {/* Header */}
      <div className="bg-white sticky top-16 z-30 border-b shadow-sm">
         <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft/></button>
               <div>
                  <h1 className="font-black text-lg md:text-xl capitalize text-slate-800">{categoryId} Store</h1>
                  <p className="text-xs text-gray-500">{products.length} Products Found</p>
               </div>
            </div>
            <button className="p-2 bg-gray-100 rounded-full"><Filter size={20}/></button>
         </div>
         {/* Sub Nav */}
         <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {subCategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setFilter(sub)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === sub ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sub}
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
         {/* Offers Banner */}
         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
            <div className="relative z-10">
               <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Flash Deal</span>
               <h2 className="text-xl md:text-2xl font-black mt-2 mb-1">Up to 30% Off {filter === 'All' ? categoryId : filter}</h2>
               <p className="text-indigo-100 text-sm mb-4">Ends in 04:23:12</p>
               <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm">Shop Now</button>
            </div>
            <Percent className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
         </div>

         {/* Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product.id} onClick={() => onProductClick(product)} className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                 <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-3 relative flex items-center justify-center overflow-hidden">
                    <div className="text-slate-300 group-hover:scale-110 transition-transform duration-500">{product.icon || <Package size={32} className="md:w-12 md:h-12"/>}</div>
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">{product.stock}</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                    >
                       <Plus size={16}/>
                    </button>
                 </div>
                 <div>
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-slate-800 line-clamp-1 text-sm md:text-base">{product.name}</h3>
                       <div className="flex items-center text-xs font-bold text-yellow-500"><Star size={10} fill="currentColor" className="mr-0.5"/>{product.rating}</div>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-1 hidden md:block">{product.description}</p>
                    <div className="font-black text-base md:text-lg text-slate-900">${product.price}<span className="text-[10px] md:text-xs text-gray-400 font-normal">/{product.unit}</span></div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const OrderTracking = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-50 z-[120] overflow-y-auto animate-in fade-in slide-in-from-bottom-10">
    <div className="max-w-3xl mx-auto min-h-screen bg-white shadow-2xl pb-10">
      <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Order #ORD-8829</h2>
          <p className="text-slate-400 text-sm">Estimated Delivery: Today, 2:00 PM</p>
        </div>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X/></button>
      </div>
      
      <div className="p-8">
        <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {[
            { title: 'Order Placed', time: '10:00 AM', active: true, icon: <ClipboardList size={16}/> },
            { title: 'Processing', time: '10:30 AM', active: true, icon: <Package size={16}/> },
            { title: 'Out for Delivery', time: '1:15 PM', active: true, icon: <Truck size={16}/> },
            { title: 'Delivered', time: 'Pending', active: false, icon: <Check size={16}/> },
          ].map((step, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[29px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${step.active ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step.icon}
              </div>
              <h3 className={`font-bold ${step.active ? 'text-slate-900' : 'text-gray-400'}`}>{step.title}</h3>
              <p className="text-xs text-gray-500">{step.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CheckoutPage = ({ cart, total, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  return (
    <div className="fixed inset-0 bg-gray-50 z-[110] overflow-y-auto animate-in slide-in-from-right pt-16">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 font-bold"><ChevronLeft/> Back to Cart</button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             <div className="flex justify-between items-center mb-8 px-2 md:px-4">{['Shipping', 'Payment', 'Review'].map((s, i) => (<div key={s} className={`flex items-center gap-2 font-bold text-sm md:text-base ${step === i+1 ? 'text-emerald-600' : 'text-gray-300'}`}><div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm ${step === i+1 ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>{i+1}</div><span>{s}</span></div>))}</div>
             {step === 1 && (<div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in"><h2 className="text-xl md:text-2xl font-black mb-6">Shipping</h2><input className="w-full p-4 bg-gray-50 rounded-xl mb-4" placeholder="Full Name"/><button onClick={() => setStep(2)} className="mt-6 w-full py-4 bg-slate-900 text-white font-bold rounded-xl">Next</button></div>)}
             {step === 2 && (<div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in"><h2 className="text-xl md:text-2xl font-black mb-6">Payment</h2><div className="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-xl flex items-center gap-4 mb-4"><CreditCard className="text-emerald-600"/><span className="font-bold">Credit Card</span></div><button onClick={() => setStep(3)} className="mt-6 w-full py-4 bg-slate-900 text-white font-bold rounded-xl">Review</button></div>)}
             {step === 3 && (<div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in"><h2 className="text-xl md:text-2xl font-black mb-4">Confirm</h2><div className="bg-gray-50 p-4 rounded-xl mb-4"><p>Total: ${total.toFixed(2)}</p></div><button onClick={onComplete} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">Place Order</button></div>)}
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit"><h3 className="font-bold mb-4">Summary</h3><div className="space-y-3 mb-4">{cart.map(item => (<div key={item.cartId} className="flex justify-between text-sm"><span>{item.quantity}x {item.name}</span><span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span></div>))}</div><div className="border-t pt-4 flex justify-between font-black text-xl"><span>Total</span><span>${total.toFixed(2)}</span></div></div>
        </div>
      </div>
    </div>
  );
};

const OrderSuccess = ({ onViewOrder }) => (
  <div className="fixed inset-0 bg-white z-[150] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95">
     <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl"><Check size={48} strokeWidth={4} /></div>
     <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
     <p className="text-gray-500 mb-8 max-w-sm">Thank you for your purchase. Your order has been placed.</p>
     <div className="flex gap-4 w-full max-w-sm"><button onClick={onViewOrder} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl">Track Order</button><button onClick={() => window.location.reload()} className="flex-1 py-3 border border-gray-200 font-bold rounded-xl">Close</button></div>
  </div>
);

// 3. Cart Sidebar
const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-[60] ${isOpen ? 'block' : 'hidden'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-[90vw] max-w-[400px] bg-white z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center bg-gray-50"><h2 className="font-bold text-lg flex items-center gap-2"><ShoppingBasket size={24} className="text-emerald-600"/> Your Cart</h2><button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X size={20}/></button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">{cartItems.length === 0 ? <div className="text-center text-gray-400 mt-20">Cart Empty</div> : cartItems.map(item => (<div key={item.cartId} className="flex gap-4 p-4 border rounded-xl shadow-sm"><div className="flex-1"><h4 className="font-bold text-gray-800 text-sm">{item.name}</h4><p className="text-xs text-gray-500">${item.price}/{item.unit}</p><div className="flex items-center gap-2 mt-2 bg-gray-50 w-fit rounded-lg px-2"><button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-red-500">-</button><span className="font-bold text-sm w-4 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-emerald-500">+</button></div></div><button onClick={() => removeItem(item.cartId)} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button></div>))}</div>
        <div className="p-6 border-t bg-gray-50"><div className="flex justify-between mb-4 font-bold text-xl text-gray-800"><span>Total</span><span>${total.toFixed(2)}</span></div><button onClick={onCheckout} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700">Checkout</button></div>
      </div>
    </>
  );
};

// 4. Dashboard Components
const DashboardHome = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[{l:'Orders',v:'124',c:'bg-blue-500'},{l:'Pending',v:'5',c:'bg-orange-500'},{l:'Spend',v:'$12k',c:'bg-emerald-500'},{l:'Points',v:'850',c:'bg-purple-500'}].map((s,i)=>(<div key={i} className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4"><div className={`p-3 rounded-xl text-white ${s.c}`}><CreditCard/></div><div><div className="text-2xl font-black text-gray-800">{s.v}</div><div className="text-xs font-bold text-gray-500 uppercase">{s.l}</div></div></div>))}
  </div>
);
const InvoicesView = () => (<div className="space-y-6"><h2 className="text-2xl font-black text-gray-800">Invoices</h2><div className="bg-white rounded-2xl shadow-sm border p-6">Invoice list here...</div></div>);
const OffersView = () => (<div className="space-y-6"><h2 className="text-2xl font-black text-gray-800">Offers</h2><div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white"><h3 className="text-3xl font-black">20% OFF</h3><p>On all Frozen Seafood.</p></div></div>);
const CatalogueView = ({ addToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{[...ProductsData, ...ServicesData].map(cat => (<div key={cat.id} className="bg-white rounded-2xl border p-4"><h3>{cat.title}</h3></div>))}</div>
);

// 2. Dashboard Sidebar
const DashboardSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout }) => {
  const menuItems = [ { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' }, { id: 'catalogue', icon: <ShoppingBag size={20} />, label: 'Catalogue' }, { id: 'orders', icon: <ClipboardList size={20} />, label: 'Orders' }, { id: 'invoices', icon: <FileText size={20} />, label: 'Invoices' }, { id: 'offers', icon: <Percent size={20} />, label: 'Offers' } ];
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      <div className={`fixed md:relative top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 font-black text-xl flex justify-between items-center"><span>SKY<span className="text-emerald-400">MARKET</span></span><button className="md:hidden text-gray-400" onClick={() => setIsOpen(false)}><X/></button></div>
        <div className="p-4 space-y-1">{menuItems.map(item => (<button key={item.id} onClick={() => { setActiveTab(item.id); setIsOpen(false); }} className={`w-full flex items-center p-3 rounded-xl gap-3 font-medium transition-colors ${activeTab === item.id ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>{item.icon} {item.label}</button>))}</div>
        <div className="p-4 mt-auto"><button onClick={onLogout} className="w-full flex items-center p-3 rounded-xl gap-3 text-red-400 hover:bg-red-900/20"><LogOut size={20}/> Sign Out</button></div>
      </div>
    </>
  );
};

// 1. Guest Sidebar
const GuestSidebar = ({ isOpen, onClose, onNavigate }) => {
  const menuItems = [ { icon: <Home size={20} />, label: 'Home', action: 'landing' }, { icon: <ShoppingBag size={20} />, label: 'Products', action: 'products' }, { icon: <Wrench size={20} />, label: 'Services', action: 'services' }, { icon: <Mail size={20} />, label: 'Contact', action: 'contact' } ];
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 left-0 h-full w-[85vw] max-w-[300px] bg-white z-[110] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl flex flex-col`}>
        <div className="p-6 border-b flex justify-between items-center bg-gray-50"><div className="font-black text-xl flex items-center gap-2"><div className="w-6 h-6 bg-emerald-500 rounded-lg transform rotate-3"></div><span>MENU</span></div><button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X size={20}/></button></div>
        <div className="p-4 space-y-2">{menuItems.map((item, i) => (<button key={i} onClick={() => { onNavigate(item.action); onClose(); }} className="w-full flex items-center p-3 hover:bg-emerald-50 rounded-xl gap-3 text-gray-600 font-bold transition-colors">{item.icon} {item.label}</button>))}</div>
      </div>
    </>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // No longer used for main nav, but kept for logic
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // New state for mobile search

  // Cart Logic
  const addToCart = (item, openSidebar = true) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      return existing ? prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, { ...item, quantity: 1, cartId: Date.now() }];
    });
    if(openSidebar) setIsCartOpen(true);
  };
  const updateQuantity = (id, delta) => setCart(prev => prev.map(i => i.cartId === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  const removeItem = (id) => setCart(prev => prev.filter(i => i.cartId !== id));
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const buyNow = (item) => { addToCart(item, false); setCurrentView('checkout'); };

  const handleSearch = (q) => { if(q) { setSearchQuery(q); setShowSearchResults(true); setMobileSearchOpen(false); } };
  const getAllItems = () => [...ProductsData.map(c=>({...c,type:'Product'})), ...ServicesData.map(c=>({...c,type:'Service'}))];
  const filteredItems = getAllItems().filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())));

  const recognitionRef = useRef(null);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('add') && transcript.includes('cart')) {
           const productName = transcript.replace('add', '').replace('to cart', '').trim();
           const product = ALL_PRODUCTS_DB.find(p => p.name.toLowerCase().includes(productName));
           if (product) { addToCart(product); alert(`Added ${product.name} to cart!`); }
        }
        setSearchQuery(transcript); setIsListening(false); handleSearch(transcript);
      };
      recognitionRef.current.onerror = (e) => { console.error(e); setIsListening(false); };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);
  const toggleListening = () => { if(!isListening) {setIsListening(true); recognitionRef.current?.start();} else {setIsListening(false); recognitionRef.current?.stop();} };

  const renderHeader = (isDark, isSticky = false) => (
    <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isSticky || !isDark ? 'bg-white/80 backdrop-blur-md shadow-sm border-b' : 'bg-white/10 backdrop-blur-md border-b border-white/10 md:bg-transparent md:border-none md:backdrop-blur-none'}`}>
       <div className="flex justify-between items-center px-4 py-3">
         <div className="flex items-center gap-2 md:gap-4">
           <button onClick={() => setIsSidebarOpen(true)} className={`p-2 rounded-xl transition-colors ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}><Menu size={24}/></button>
           <div onClick={() => {setSelectedCategory(null); setCurrentView('landing');}} className="font-black text-lg md:text-xl flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg transform rotate-3 shadow-lg"></div>
              <div className={!isDark || isSticky ? 'text-slate-900' : 'text-white'}>SKY<span className="text-emerald-400">MARKET</span></div>
           </div>
         </div>

         {/* CENTER SEARCH BAR - DESKTOP */}
         <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search products & services..." 
              className={`w-full pl-12 pr-12 py-2.5 rounded-full border focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all ${!isDark || isSticky ? 'bg-gray-100 border-transparent text-slate-800' : 'bg-white/10 border-white/20 text-white placeholder-white/60'}`} 
            />
            <button onClick={toggleListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-emerald-500'}`}>
               <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
            </button>
         </div>

         <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Toggle */}
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className={`md:hidden p-2 rounded-xl ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}>
               <Search size={24} />
            </button>

            <button onClick={() => setIsCartOpen(true)} className={`relative p-2 rounded-xl ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}>
               <ShoppingBasket size={24} />
               {cart.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">{cart.length}</span>}
            </button>
            {!isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(true)} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-transform"><LogIn size={16}/> <span className="hidden sm:inline">Login</span></button>
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center font-bold text-white cursor-pointer text-sm md:text-base" onClick={() => setIsSidebarOpen(true)}>JD</div>
            )}
         </div>
       </div>

       {/* MOBILE SEARCH BAR - EXPANDABLE */}
       {mobileSearchOpen && (
         <div className="md:hidden px-4 pb-3 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Search..." 
                className="w-full pl-10 pr-10 py-2 rounded-full border bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
                autoFocus
              />
              <button onClick={toggleListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${isListening ? 'bg-red-500 text-white' : 'text-gray-400'}`}>
                 <Mic size={16} className={isListening ? 'animate-pulse' : ''} />
              </button>
            </div>
         </div>
       )}
    </div>
  );

  // VIEW ROUTING
  if (currentView === 'product' && activeProduct) return <ProductDetailsPage product={activeProduct} onBack={() => setCurrentView('landing')} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
  if (currentView === 'checkout') return <CheckoutPage cart={cart} total={cart.reduce((a,i)=>a+(i.price*i.quantity),0)} onBack={() => setIsCartOpen(true)} onComplete={() => { setCurrentView('tracking'); setCart([]); setIsCartOpen(false); }} />;
  if (currentView === 'tracking') return <OrderTracking onClose={() => setCurrentView('landing')} />;
  if (currentView === 'shop-listing' && activeSubCategory) return (<div className="relative"><CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} /><ShopListingPage categoryId={activeSubCategory} onClose={() => setCurrentView('landing')} onProductClick={(p) => { setActiveProduct(p); setCurrentView('product'); }} addToCart={addToCart} /></div>);

  // LOGGED IN VIEW
  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen bg-gray-50 font-sans">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLogout={() => setIsLoggedIn(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex items-center gap-4"><button className="md:hidden text-gray-500" onClick={() => setIsSidebarOpen(true)}><Menu/></button><h1 className="text-xl font-bold capitalize text-gray-800">{activeTab}</h1></div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full"><ShoppingBasket/>{cart.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">{cart.length}</span>}</button>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
             {activeTab === 'dashboard' && <DashboardHome />}
             {activeTab === 'catalogue' && <CatalogueView addToCart={addToCart} />}
             {activeTab === 'invoices' && <InvoicesView />}
             {activeTab === 'offers' && <OffersView />}
             {activeTab === 'orders' && <div className="text-center text-gray-400 mt-20">Orders Module Loading...</div>}
          </main>
        </div>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
      </div>
    );
  }

  // DEFAULT LANDING - SPLIT SCREEN WITH DARK GRADIENTS (RESPONSIVE)
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex flex-col font-sans">
      {renderHeader(false, true)}
      <GuestSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={(c) => { if(c==='home') setSelectedCategory(null); else if(c==='products'||c==='services') setSelectedCategory(c); }} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
      
      {/* Search Overlay */}
      {showSearchResults && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl p-4 md:p-8 overflow-y-auto animate-in fade-in duration-300">
          <div className="max-w-4xl mx-auto pt-24 md:pt-20">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 break-words pr-4">Results for "{searchQuery}"</h2>
              <button onClick={() => {setShowSearchResults(false); setSearchQuery('')}} className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"><X className="w-6 h-6" /></button>
            </div>
            {filteredItems.length === 0 ? (
              <div className="text-center py-10 md:py-20 text-gray-500"><Search className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-20" /><p className="text-base md:text-lg">No matching products found.</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
                {filteredItems.map((cat, idx) => (
                  <div key={idx} className={`border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between bg-gradient-to-br ${cat.gradient}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-bold text-lg md:text-xl text-white`}>{cat.title}</h3>
                          <span className={`text-[10px] md:text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide bg-white/20 text-white`}>{cat.type}</span>
                        </div>
                        <div className="space-y-1 mb-4">
                           {cat.items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map((i, k) => (
                             <div key={k} className="text-sm text-white/90 font-medium flex justify-between"><span>• {i.name}</span><span className="text-white/60 text-xs">${i.price}</span></div>
                           ))}
                        </div>
                      </div>
                      <button onClick={() => {setShowSearchResults(false); setActiveSubCategory(cat.id); setCurrentView('shop-listing')}} className={`text-sm font-bold hover:underline flex items-center gap-1 text-white mt-2`}>Go to category <ArrowRight className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Split Content - Responsive Stack */}
      <div className="flex flex-col md:flex-row h-auto md:h-screen pt-16 overflow-visible md:overflow-hidden">
         {/* Left Side: Products - Dark Green Gradient */}
         <div className="w-full md:flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-b from-emerald-900 to-emerald-950 md:overflow-y-auto">
            {/* Mobile Header - Sticks below main nav */}
            <div className="p-4 md:p-6 pb-2 sticky top-16 md:top-0 z-20 bg-emerald-900/95 backdrop-blur shadow-sm transition-all">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg"><ShoppingBasket size={24} /></div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Products</h2>
               </div>
               <p className="text-emerald-200/60 font-medium ml-1 text-sm md:text-base">Fresh, Frozen & Essentials</p>
            </div>
            
            <div className="p-4 md:p-6 pt-2 pb-12 md:pb-32">
               <div className="grid grid-cols-1 gap-6">
                  {ProductsData.map((cat, idx) => (
                     <div 
                       key={cat.id} 
                       className={`
                         group relative flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-hidden
                         border border-white/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                       `}
                     >
                        <div className={`h-20 md:h-24 bg-gradient-to-br ${cat.gradient} relative overflow-hidden p-4 md:p-6`}>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                           <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>
                           <div className="relative z-10 flex justify-between items-start">
                              <div className="text-white">
                                 <h3 className="text-lg md:text-xl font-black tracking-tight mb-1">{cat.title}</h3>
                                 <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">{cat.subtitle}</p>
                              </div>
                           </div>
                        </div>
                        <div className={`
                          absolute top-12 md:top-16 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center 
                          shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500
                          bg-white text-gray-800 z-20 border-4 border-gray-50
                        `}>
                          {React.cloneElement(cat.icon, { size: 20 })}
                        </div>
                        <div className="p-4 pt-6 md:pt-8 flex-1 bg-gradient-to-b from-gray-50/30 to-white">
                          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                            {cat.items.slice(0, 4).map((item, i) => (
                              <button 
                                key={i} 
                                onClick={(e) => { e.stopPropagation(); setActiveSubCategory(cat.id); setCurrentView('shop-listing'); }}
                                className={`
                                  relative overflow-hidden flex flex-col justify-between p-2 h-20 md:h-24 rounded-xl border border-transparent
                                  ${cat.subCardGradient} shadow-sm
                                  transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group/item
                                  text-left
                                `}
                              >
                                <div className="relative z-10 w-full flex justify-between items-start mb-1">
                                   <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-sm bg-white/20 backdrop-blur-md text-white border border-white/10`}>{React.cloneElement(item.icon, { size: 10 })}</div>
                                </div>
                                <div className="relative z-10">
                                   <span className={`block text-[10px] font-bold ${cat.subCardText} leading-tight mb-0.5 line-clamp-1`}>{item.name}</span>
                                   <span className={`text-[10px] md:text-xs font-black ${cat.subCardText}`}>${item.price}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                          <button onClick={() => { setActiveSubCategory(cat.id); setCurrentView('shop-listing'); }} className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-white shadow-lg shadow-gray-200 flex items-center justify-center gap-2 text-xs transition-all duration-300 transform active:scale-95 bg-gradient-to-r ${cat.gradient} opacity-90 hover:opacity-100`}>View All <ArrowRight size={14} /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Side: Services - Dark Blue Gradient */}
         <div className="w-full md:flex-1 flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 md:overflow-y-auto">
            {/* Mobile Header - Sticks below main nav */}
            <div className="p-4 md:p-6 pb-2 sticky top-16 md:top-0 z-20 bg-slate-900/95 backdrop-blur shadow-sm transition-all">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg"><Wrench size={24} /></div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Services</h2>
               </div>
               <p className="text-blue-200/60 font-medium ml-1 text-sm md:text-base">Equipment & Solutions</p>
            </div>

            <div className="p-4 md:p-6 pt-2 pb-24 md:pb-32">
               <div className="grid grid-cols-1 gap-6">
                  {ServicesData.map((cat, idx) => (
                     <div 
                       key={cat.id} 
                       className={`
                         group relative flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-hidden
                         border border-white/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                       `}
                     >
                        <div className={`h-20 md:h-24 bg-gradient-to-br ${cat.gradient} relative overflow-hidden p-4 md:p-6`}>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                           <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>
                           <div className="relative z-10 flex justify-between items-start">
                              <div className="text-white">
                                 <h3 className="text-lg md:text-xl font-black tracking-tight mb-1">{cat.title}</h3>
                                 <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">{cat.subtitle}</p>
                              </div>
                           </div>
                        </div>
                        <div className={`
                          absolute top-12 md:top-16 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center 
                          shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500
                          bg-white text-gray-800 z-20 border-4 border-gray-50
                        `}>
                          {React.cloneElement(cat.icon, { size: 20 })}
                        </div>
                        <div className="p-4 pt-6 md:pt-8 flex-1 bg-gradient-to-b from-gray-50/30 to-white">
                          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                            {cat.items.slice(0, 4).map((item, i) => (
                              <button 
                                key={i} 
                                onClick={(e) => { e.stopPropagation(); setActiveSubCategory(cat.id); setCurrentView('shop-listing'); }}
                                className={`
                                  relative overflow-hidden flex flex-col justify-between p-2 h-20 md:h-24 rounded-xl border border-transparent
                                  ${cat.subCardGradient} shadow-sm
                                  transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group/item
                                  text-left
                                `}
                              >
                                <div className="relative z-10 w-full flex justify-between items-start mb-1">
                                   <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-sm bg-white/20 backdrop-blur-md text-white border border-white/10`}>{React.cloneElement(item.icon, { size: 10 })}</div>
                                </div>
                                <div className="relative z-10">
                                   <span className={`block text-[10px] font-bold ${cat.subCardText} leading-tight mb-0.5 line-clamp-1`}>{item.name}</span>
                                   <span className={`text-[10px] md:text-xs font-black ${cat.subCardText}`}>${item.price}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                          <button onClick={() => { setActiveSubCategory(cat.id); setCurrentView('shop-listing'); }} className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-white shadow-lg shadow-gray-200 flex items-center justify-center gap-2 text-xs transition-all duration-300 transform active:scale-95 bg-gradient-to-r ${cat.gradient} opacity-90 hover:opacity-100`}>View All <ArrowRight size={14} /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}