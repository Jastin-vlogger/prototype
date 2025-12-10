"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBasket, Wrench, Mic, Search, ChevronLeft, Snowflake, Fish, Milk, Package, 
  ChefHat, Armchair, MapPin, Hammer, Bug, ShieldCheck, X, ArrowRight, Check, Menu, 
  User, LogIn, FileText, HelpCircle, LogOut, Settings, Bell, Home, Info, Phone, 
  ShoppingBag, Mail, LayoutDashboard, ClipboardList, FileBarChart, Percent, Plus, 
  Minus, Trash2, CreditCard, Download, Star, Filter, Heart, Share2,
  Beef, Carrot, Apple, Coffee, Wine, Lamp, Sofa, Zap, Droplet, SprayCan, ClipboardCheck, 
  GraduationCap, Microscope, Utensils, Truck, Map, Calendar, Clock, ArrowUpRight,
  TrendingUp, Shield, Truck as TruckIcon, Award, ArrowDown, Smartphone, Star as StarIcon,
  Activity, DollarSign, Users, AlertCircle, Building2, MessageCircle, Globe, Mail as MailIcon,
  Send, HelpCircle as QuestionIcon
} from 'lucide-react';

// --- ICONS (Custom SVGs for Brand Logos) ---
const AppleLogo = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3-58.9-58.9L47 499z"/>
  </svg>
);

// --- REUSABLE FOOTER COMPONENT ---
const Footer = () => (
  <footer className="relative z-10 bg-black pt-24 pb-12 border-t border-white/10">
     <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
           <div className="font-black text-2xl flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg transform rotate-3"></div>
              <span className="text-white">SKY<span className="text-emerald-400">MARKET</span></span>
           </div>
           <p className="text-slate-400 max-w-sm mb-8 text-lg">The world's first unified marketplace for products and professional services. Redefining digital commerce.</p>
           <div className="flex gap-4">
              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 cursor-pointer transition-colors"><Share2 size={18}/></div>)}
           </div>
        </div>
        <div>
           <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
           <ul className="space-y-4 text-slate-400">
              {['Browse Products', 'Find Services', 'Sell on SkyMarket', 'Enterprise', 'Partner Program'].map(l => <li key={l}><a href="#" className="hover:text-emerald-400 transition-colors">{l}</a></li>)}
           </ul>
        </div>
        <div>
           <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
           <ul className="space-y-4 text-slate-400">
              {['Help Center', 'Trust & Safety', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map(l => <li key={l}><a href="#" className="hover:text-emerald-400 transition-colors">{l}</a></li>)}
           </ul>
        </div>
     </div>
     <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
        © 2024 SkyMarket Inc. All rights reserved.
     </div>
  </footer>
);

// --- NEW PAGES COMPONENTS (ENHANCED DARK THEME) ---

const AboutPage = () => (
  <div className="flex-1 bg-gray-900 text-white pt-20 animate-in fade-in">
    {/* Hero Section */}
    <div className="relative overflow-hidden border-b border-white/5 pb-20">
       <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
             <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 text-sm font-bold uppercase tracking-wider">
                   <Building2 size={16}/> Since 2024
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                   Born in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Emirates.</span><br/>
                   Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Future.</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                   SkyMarket isn't just a marketplace; it's a digital ecosystem bridging the gap between premium global products and world-class local services.
                </p>
                <div className="flex gap-8 pt-4">
                   {[
                      { l: 'Happy Users', v: '50k+' },
                      { l: 'Partners', v: '1.2k' },
                      { l: 'Emirates', v: '7' }
                   ].map((s,i) => (
                      <div key={i}>
                         <div className="text-3xl font-black text-white">{s.v}</div>
                         <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.l}</div>
                      </div>
                   ))}
                </div>
             </div>
             
             {/* Abstract Visual */}
             <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-800 to-black rounded-[3rem] border border-white/10 overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea932a23518?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                <div className="relative z-10 p-8 text-center bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 max-w-xs">
                   <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                      <Award size={32} className="text-white"/>
                   </div>
                   <h3 className="text-xl font-bold mb-2">Vision 2030</h3>
                   <p className="text-sm text-slate-300">Aligned with the UAE's vision for a digital, sustainable, and innovative future economy.</p>
                </div>
             </div>
          </div>
       </div>
    </div>

    {/* Values Grid */}
    <div className="max-w-7xl mx-auto px-6 py-24">
       <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">Our Core Values</h2>
          <p className="text-slate-400">The principles that drive every decision we make.</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
             { t: 'Innovation', d: 'Pushing boundaries with AI-driven logistics.', i: <Zap size={24}/>, c: 'text-yellow-400', b: 'bg-yellow-400/10' },
             { t: 'Integrity', d: '100% Halal certified and ethically sourced.', i: <ShieldCheck size={24}/>, c: 'text-emerald-400', b: 'bg-emerald-400/10' },
             { t: 'Community', d: 'Supporting local farmers and technicians.', i: <Users size={24}/>, c: 'text-blue-400', b: 'bg-blue-400/10' }
          ].map((v, i) => (
             <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${v.b} ${v.c}`}>{v.i}</div>
                <h3 className="text-xl font-bold mb-3">{v.t}</h3>
                <p className="text-slate-400 leading-relaxed">{v.d}</p>
             </div>
          ))}
       </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="flex-1 bg-gray-900 text-white pt-20 animate-in fade-in">
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
         {/* Left Info */}
         <div className="lg:col-span-2 space-y-12">
            <div>
               <h1 className="text-4xl md:text-6xl font-black mb-6">Let's <span className="text-emerald-400">Chat.</span></h1>
               <p className="text-lg text-slate-400 leading-relaxed">
                  Have a question about an order, a partnership proposal, or just want to say marhaba? We're all ears.
               </p>
            </div>

            <div className="space-y-6">
               {[
                  { t: 'Headquarters', d: 'Level 42, Sky Tower, Business Bay, Dubai, UAE', i: <MapPin/> },
                  { t: 'Phone', d: '+971 4 123 4567', i: <Phone/> },
                  { t: 'Email', d: 'marhaba@skymarket.ae', i: <MailIcon/> }
               ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                     <div className="p-3 bg-gray-800 rounded-xl text-emerald-400 border border-white/10">{c.i}</div>
                     <div>
                        <h4 className="font-bold text-white mb-1">{c.t}</h4>
                        <p className="text-sm text-slate-400">{c.d}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="pt-8 border-t border-white/10">
               <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Follow Us</h4>
               <div className="flex gap-4">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all cursor-pointer">
                        <Share2 size={16}/>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Form - Glassmorphism */}
         <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
               
               <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-1">First Name</label>
                        <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="Ahmed" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-1">Last Name</label>
                        <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="Ali" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-400 ml-1">Email</label>
                     <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="ahmed@example.ae" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-400 ml-1">Message</label>
                     <textarea rows="4" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="button" className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                     <Send size={20}/> Send Message
                  </button>
               </form>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const SupportPage = () => (
  <div className="flex-1 bg-gray-900 text-white pt-20 animate-in fade-in">
    {/* Hero Search */}
    <div className="relative py-20 px-6 text-center border-b border-white/5">
       <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-gray-900 z-0"></div>
       <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6 text-emerald-400 shadow-lg ring-1 ring-white/10"><HelpCircle size={32}/></div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Help Center</h1>
          <p className="text-slate-400 mb-8">Search our knowledge base or browse frequently asked questions.</p>
          
          <div className="relative group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors"/>
             <input type="text" placeholder="e.g. 'Refund status', 'Delivery to Sharjah'" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xl" />
          </div>
       </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-12">
       {/* Quick Actions */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { t: 'Track Order', i: <Package/>, d: 'Check shipment status' },
            { t: 'Returns', i: <ArrowUpRight/>, d: 'Process a return' },
            { t: 'My Account', i: <User/>, d: 'Manage preferences' }
          ].map((c, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">{c.i}</div>
                <h3 className="font-bold text-white mb-1">{c.t}</h3>
                <p className="text-xs text-slate-400">{c.d}</p>
             </div>
          ))}
       </div>

       {/* FAQ Accordion Style */}
       <div className="space-y-8">
          <h2 className="text-2xl font-black text-white">Common Questions</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { q: "Do you deliver to all Emirates?", a: "Yes! We offer same-day delivery in Dubai, Abu Dhabi, and Sharjah. Next-day delivery is available for Ajman, Fujairah, Ras Al Khaimah, and Umm Al Quwain via our climate-controlled fleet." },
              { q: "Are all food products Halal?", a: "Absolutely. 100% of our meat and poultry products are Halal certified. We strictly vet all suppliers to ensure compliance with UAE standards." },
              { q: "How do I schedule an AC service?", a: "Navigate to the 'Services' tab, select 'Maintenance', then 'AC Service'. You can choose a specific date and time slot. Our technicians bring all necessary equipment." },
              { q: "What if I'm not home for delivery?", a: "Our drivers will attempt to contact you. If missed, we can reschedule for the next slot or leave it with your building reception if permitted." },
              { q: "Is there a minimum order value?", a: "Minimum order is AED 50 for free delivery. Orders below AED 50 incur a small AED 10 delivery fee." }
            ].map((faq, i) => (
               <div key={i} className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                  <h3 className="font-bold text-lg text-emerald-100 mb-3 flex items-start gap-3">
                     <QuestionIcon size={20} className="mt-1 text-emerald-500 shrink-0"/>
                     {faq.q}
                  </h3>
                  <p className="text-slate-400 pl-8 leading-relaxed text-sm md:text-base">{faq.a}</p>
               </div>
            ))}
          </div>
       </div>

       <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-white/10 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
          <p className="text-slate-400 mb-6">Our support team is available 24/7.</p>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors">Start Live Chat</button>
       </div>
    </div>
  </div>
);

// --- DATA SETS ---

const ProductsData = [
  {
    id: 'fresh',
    title: 'Fresh Food',
    subtitle: 'Farm to Table',
    icon: <Fish className="w-8 h-8" />,
    items: [
      { id: 'p1', name: 'Atlantic Salmon', type: 'Fish', price: 120, unit: 'kg', rating: 4.8, reviews: 124, description: 'Premium grade, sustainably sourced Atlantic Salmon.', images: ['salmon1'], icon: <Fish size={20}/> },
      { id: 'p2', name: 'Chicken Breast', type: 'Chicken', price: 45, unit: 'kg', rating: 4.5, reviews: 89, description: 'Free-range, organic chicken breast.', images: ['chk1'], icon: <Utensils size={20}/> }, 
      { id: 'p3', name: 'Veg Box', type: 'Veg', price: 30, unit: 'box', rating: 4.9, reviews: 210, description: 'Weekly selection of seasonal organic vegetables.', images: ['veg1'], icon: <Carrot size={20}/> },
      { id: 'p4', name: 'Fresh Herbs', type: 'Veg', price: 15, unit: 'bunch', rating: 4.7, reviews: 56, description: 'Aromatic mix of Basil, Thyme, and Rosemary.', images: ['herb1'], icon: <Apple size={20}/> }
    ],
    gradient: 'from-emerald-600 to-teal-700',
    blobColor: 'bg-emerald-500',
    itemBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-700',
  },
  {
    id: 'frozen',
    title: 'Frozen Goods',
    subtitle: 'Premium Quality',
    icon: <Snowflake className="w-8 h-8" />,
    items: [
      { id: 'p5', name: 'Jumbo Prawns', type: 'Seafood', price: 180, unit: 'kg', rating: 4.9, reviews: 312, description: 'Flash-frozen jumbo tiger prawns.', images: ['prawn1'], icon: <Fish size={20}/> },
      { id: 'p6', name: 'Mixed Berries', type: 'Dessert', price: 40, unit: 'bag', rating: 4.6, reviews: 150, description: 'Antioxidant-rich blend of berries.', images: ['berry1'], icon: <Apple size={20}/> },
      { id: 'p7', name: 'Angus Beef', type: 'Meat', price: 90, unit: 'box', rating: 4.8, reviews: 200, description: 'Premium Angus beef patties.', images: ['beef1'], icon: <Beef size={20}/> },
      { id: 'p8', name: 'Spinach', type: 'Veg', price: 20, unit: 'bag', rating: 4.4, reviews: 90, description: 'Chopped spinach cubes.', images: ['spin1'], icon: <Carrot size={20}/> }
    ],
    gradient: 'from-sky-600 to-blue-700',
    blobColor: 'bg-sky-500',
    itemBg: 'bg-gradient-to-br from-sky-500/20 to-blue-500/10',
    accent: 'text-sky-700',
  },
  {
    id: 'chilled',
    title: 'Chilled Dairy',
    subtitle: 'Fresh Daily',
    icon: <Milk className="w-8 h-8" />,
    items: [
      { id: 'p9', name: 'Full Cream Milk', type: 'Dairy', price: 12, unit: 'gal', rating: 4.7, reviews: 500, description: 'Fresh full cream milk.', images: ['milk1'], icon: <Milk size={20}/> },
      { id: 'p10', name: 'Greek Yogurt', type: 'Yogurt', price: 8, unit: 'tub', rating: 4.8, reviews: 120, description: 'Thick and creamy authentic Greek yogurt.', images: ['yog1'], icon: <Package size={20}/> },
      { id: 'p11', name: 'Cheddar Block', type: 'Cheese', price: 60, unit: 'block', rating: 4.5, reviews: 80, description: 'Aged cheddar cheese block.', images: ['ch1'], icon: <Package size={20}/> },
      { id: 'p12', name: 'Butter', type: 'Dairy', price: 25, unit: 'pack', rating: 4.9, reviews: 300, description: 'Premium unsalted butter.', images: ['but1'], icon: <Milk size={20}/> }
    ],
    gradient: 'from-blue-600 to-indigo-700',
    blobColor: 'bg-blue-500',
    itemBg: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/10',
    accent: 'text-blue-700',
  },
  {
    id: 'ambient',
    title: 'Pantry',
    subtitle: 'Essentials',
    icon: <Package className="w-8 h-8" />,
    items: [
      { id: 'p13', name: 'Basmati Rice', type: 'Rice', price: 80, unit: 'sack', rating: 4.6, reviews: 450, description: 'Long grain aromatic Basmati rice.', images: ['rice1'], icon: <Package size={20}/> },
      { id: 'p14', name: 'Olive Oil', type: 'Oil', price: 55, unit: 'tin', rating: 4.8, reviews: 220, description: 'Extra virgin olive oil.', images: ['oil1'], icon: <Droplet size={20}/> },
      { id: 'p15', name: 'Tomato Paste', type: 'Sauces', price: 40, unit: 'case', rating: 4.5, reviews: 110, description: 'Concentrated tomato paste.', images: ['tom1'], icon: <Apple size={20}/> },
      { id: 'p16', name: 'Coffee Beans', type: 'Coffee', price: 120, unit: 'kg', rating: 4.9, reviews: 340, description: 'Roasted Arabica coffee beans.', images: ['cof1'], icon: <Coffee size={20}/> }
    ],
    gradient: 'from-amber-600 to-orange-700',
    blobColor: 'bg-amber-500',
    itemBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/10',
    accent: 'text-amber-700',
  }
];

const ServicesData = [
  {
    id: 'kitchen',
    title: 'Equipment',
    subtitle: 'Professional',
    icon: <ChefHat className="w-8 h-8" />,
    items: [
      { id: 's1', name: 'Chef Knife Set', type: 'Knives', price: 300, unit: 'set', rating: 4.9, reviews: 50, stock: 'In Stock', description: 'High carbon stainless steel knife set.', icon: <Utensils size={20}/> },
      { id: 's2', name: 'Industrial Mixer', type: 'Mixers', price: 2500, unit: 'unit', rating: 4.8, reviews: 20, stock: 'Low Stock', description: 'Heavy duty planetary mixer.', icon: <ChefHat size={20}/> },
      { id: 's3', name: 'Convection Oven', type: 'Ovens', price: 5000, unit: 'unit', rating: 4.7, reviews: 15, stock: 'Pre-Order', description: 'Professional convection oven.', icon: <Package size={20}/> },
      { id: 's4', name: 'Gas Grill', type: 'Ovens', price: 1200, unit: 'unit', rating: 4.6, reviews: 35, stock: 'In Stock', description: 'Commercial gas grill.', icon: <Utensils size={20}/> }
    ],
    gradient: 'from-slate-700 to-gray-800',
    blobColor: 'bg-slate-500',
    itemBg: 'bg-gradient-to-br from-slate-500/20 to-gray-500/10',
    accent: 'text-slate-700',
  },
  {
    id: 'furniture',
    title: 'Furniture',
    subtitle: 'Interior',
    icon: <Armchair className="w-8 h-8" />,
    items: [
      { id: 's5', name: 'Dining Table', type: 'Table', price: 400, unit: 'pc', rating: 4.5, reviews: 40, stock: 'In Stock', description: 'Solid wood dining table.', icon: <Sofa size={20}/> },
      { id: 's6', name: 'Stackable Chairs', type: 'Chair', price: 45, unit: 'pc', rating: 4.6, reviews: 100, stock: 'Bulk', description: 'Durable stackable chairs.', icon: <Armchair size={20}/> },
      { id: 's7', name: 'Wall Art Set', type: 'Decor', price: 120, unit: 'set', rating: 4.3, reviews: 25, stock: 'In Stock', description: 'Modern abstract wall art set.', icon: <MapPin size={20}/> },
      { id: 's8', name: 'Patio Umbrella', type: 'Decor', price: 150, unit: 'pc', rating: 4.7, reviews: 60, stock: 'In Stock', description: 'Heavy duty patio umbrella.', icon: <Lamp size={20}/> }
    ],
    gradient: 'from-orange-600 to-red-700',
    blobColor: 'bg-orange-500',
    itemBg: 'bg-gradient-to-br from-orange-500/20 to-red-500/10',
    accent: 'text-orange-700',
  },
  {
    id: 'signboards',
    title: 'Branding',
    subtitle: 'Signage',
    icon: <MapPin className="w-8 h-8" />,
    items: [
      { id: 's9', name: 'Neon Sign', type: 'Signage', price: 400, unit: 'unit', rating: 4.8, reviews: 12, stock: 'Custom', description: 'Custom LED neon sign.', icon: <Zap size={20}/> },
      { id: 's10', name: '3D Lettering', type: 'Signage', price: 80, unit: 'letter', rating: 4.7, reviews: 20, stock: 'Custom', description: '3D acrylic lettering.', icon: <FileText size={20}/> },
      { id: 's11', name: 'Window Vinyl', type: 'Print', price: 120, unit: 'sqm', rating: 4.5, reviews: 30, stock: 'Custom', description: 'High quality window vinyl.', icon: <MapPin size={20}/> },
      { id: 's12', name: 'A-Frame Board', type: 'Signage', price: 150, unit: 'pc', rating: 4.6, reviews: 45, stock: 'In Stock', description: 'Durable A-frame sign.', icon: <MapPin size={20}/> }
    ],
    gradient: 'from-purple-600 to-fuchsia-700',
    blobColor: 'bg-purple-500',
    itemBg: 'bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10',
    accent: 'text-purple-700',
  },
  {
    id: 'repairs',
    title: 'Maintenance',
    subtitle: 'Repairs',
    icon: <Hammer className="w-8 h-8" />,
    items: [
      { id: 's13', name: 'AC Service', type: 'AC', price: 150, unit: 'unit', rating: 4.9, reviews: 150, stock: 'Available', description: 'Complete AC cleaning.', icon: <Snowflake size={20}/> },
      { id: 's14', name: 'Plumbing Check', type: 'Plumbing', price: 80, unit: 'hr', rating: 4.8, reviews: 90, stock: 'Available', description: 'Professional plumbing.', icon: <Droplet size={20}/> },
      { id: 's15', name: 'Electrical Fix', type: 'Electric', price: 90, unit: 'hr', rating: 4.8, reviews: 110, stock: 'Available', description: 'Certified electrical repair.', icon: <Zap size={20}/> },
      { id: 's16', name: 'Painting', type: 'Painting', price: 25, unit: 'sqm', rating: 4.5, reviews: 60, stock: 'Available', description: 'Interior/Exterior painting.', icon: <SprayCan size={20}/> }
    ],
    gradient: 'from-red-600 to-pink-700',
    blobColor: 'bg-red-500',
    itemBg: 'bg-gradient-to-br from-red-500/20 to-pink-500/10',
    accent: 'text-red-700',
  },
  {
    id: 'pest',
    title: 'Pest Control',
    subtitle: 'Hygiene',
    icon: <Bug className="w-8 h-8" />,
    items: [
      { id: 's17', name: 'Fumigation', type: 'Fumigation', price: 300, unit: 'visit', rating: 4.9, reviews: 80, stock: 'Available', description: 'Whole premise fumigation.', icon: <SprayCan size={20}/> },
      { id: 's18', name: 'Rodent Control', type: 'Control', price: 150, unit: 'visit', rating: 4.7, reviews: 100, stock: 'Available', description: 'Effective rodent control.', icon: <Bug size={20}/> },
      { id: 's19', name: 'Insect Spray', type: 'Control', price: 100, unit: 'visit', rating: 4.6, reviews: 120, stock: 'Available', description: 'Targeted insect spraying.', icon: <SprayCan size={20}/> },
      { id: 's20', name: 'Prevention Plan', type: 'Prevention', price: 500, unit: 'yr', rating: 4.8, reviews: 40, stock: 'Available', description: 'Annual pest prevention.', icon: <ShieldCheck size={20}/> }
    ],
    gradient: 'from-teal-600 to-green-700',
    blobColor: 'bg-teal-500',
    itemBg: 'bg-gradient-to-br from-teal-500/20 to-green-500/10',
    accent: 'text-teal-700',
  },
  {
    id: 'safety',
    title: 'Food Safety',
    subtitle: 'Assurance',
    icon: <ShieldCheck className="w-8 h-8" />,
    items: [
      { id: 's21', name: 'HACCP Audit', type: 'Audit', price: 800, unit: 'audit', rating: 5.0, reviews: 20, stock: 'Book', description: 'Comprehensive HACCP audit.', icon: <ClipboardCheck size={20}/> },
      { id: 's22', name: 'Hygiene Training', type: 'Training', price: 50, unit: 'person', rating: 4.8, reviews: 200, stock: 'Available', description: 'Staff hygiene training.', icon: <GraduationCap size={20}/> },
      { id: 's23', name: 'Lab Testing', type: 'Lab', price: 120, unit: 'sample', rating: 4.9, reviews: 60, stock: 'Available', description: 'Laboratory food testing.', icon: <Microscope size={20}/> },
      { id: 's24', name: 'Safety Cert', type: 'Cert', price: 200, unit: 'cert', rating: 4.7, reviews: 100, stock: 'Available', description: 'Official certification.', icon: <ShieldCheck size={20}/> }
    ],
    gradient: 'from-indigo-600 to-violet-700',
    blobColor: 'bg-indigo-500',
    itemBg: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/10',
    accent: 'text-indigo-700',
  }
];

// --- MOCK DATABASE ---
const generateMockProducts = () => {
  const baseProducts = [];
  const categories = [
    { id: 'fresh', name: 'Fresh', subs: ['Fish', 'Chicken', 'Fruit', 'Veg'] },
    { id: 'frozen', name: 'Frozen', subs: ['Seafood', 'Meat', 'Dessert', 'Veg'] },
    { id: 'chilled', name: 'Chilled', subs: ['Dairy', 'Cheese', 'Yogurt'] },
    { id: 'ambient', name: 'Ambient', subs: ['Rice', 'Pasta', 'Sauces', 'Oil', 'Coffee'] },
    { id: 'kitchen', name: 'Kitchen', subs: ['Knives', 'Ovens', 'Mixers'] },
    { id: 'furniture', name: 'Furniture', subs: ['Table', 'Chair', 'Decor'] },
    { id: 'repairs', name: 'Repairs', subs: ['AC', 'Plumbing', 'Electric', 'Painting'] },
    { id: 'signboards', name: 'Signboards', subs: ['Signage', 'Print'] },
    { id: 'pest', name: 'Pest Control', subs: ['Fumigation', 'Control', 'Prevention'] },
    { id: 'safety', name: 'Food Safety', subs: ['Audit', 'Training', 'Lab', 'Cert'] }
  ];

  categories.forEach(cat => {
    cat.subs.forEach(sub => {
      for (let i = 1; i <= 6; i++) {
        baseProducts.push({
          id: `${cat.id}-${sub}-${i}`,
          categoryId: cat.id,
          subCategory: sub,
          name: `${sub} Item ${i}`,
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
  // Add original landing items with explicit subCategories
  [...ProductsData, ...ServicesData].forEach(c => c.items.forEach(i => baseProducts.push({...i, categoryId: c.id, subCategory: i.type})));
  return baseProducts;
};

const ALL_PRODUCTS_DB = generateMockProducts();

// --- TOAST NOTIFICATION SYSTEM ---
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map(toast => (
      <div 
        key={toast.id} 
        className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right fade-in pointer-events-auto max-w-sm border border-slate-700"
      >
        <div className="text-emerald-400 bg-emerald-400/10 p-2 rounded-full"><Check size={16} strokeWidth={3}/></div>
        <div>
          <h4 className="font-bold text-sm">{toast.title}</h4>
          <p className="text-xs text-slate-400">{toast.message}</p>
        </div>
        <button onClick={() => removeToast(toast.id)} className="ml-auto text-slate-500 hover:text-white"><X size={14}/></button>
      </div>
    ))}
  </div>
);

// --- COMPONENTS ---

// Product Details
const ProductDetailsPage = ({ product, onBack, addToCart, buyNow, wishlist, toggleWishlist }) => {
  const [activeImg, setActiveImg] = useState(0);
  const relatedProducts = ALL_PRODUCTS_DB.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in slide-in-from-right-10 duration-300 pt-20">
      <div className="sticky top-16 z-30 bg-white border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft/></button>
        <h1 className="font-bold text-lg truncate">{product.name}</h1>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-md cursor-pointer hover:bg-white transition-colors" onClick={() => toggleWishlist(product.id)}>
               <Heart className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
             </div>
             <div className="text-slate-100 group-hover:scale-105 transition-transform duration-700"><Package size={200} strokeWidth={0.5} className="md:w-[300px] md:h-[300px]" /></div>
             <div className="absolute inset-0 flex items-center justify-center text-slate-800 transform scale-150">{product.icon}</div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white border-2 flex-shrink-0 flex items-center justify-center transition-all ${activeImg === i ? 'border-emerald-500 shadow-md scale-105' : 'border-transparent hover:border-gray-200'}`}>
                <Package size={24} className="text-slate-300 md:w-8 md:h-8"/>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-24 lg:pb-0">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-bold"><Star size={14} fill="currentColor"/> {product.rating}</div>
              <span className="text-gray-500 underline">{product.reviews || 0} Reviews</span>
              <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock}</span>
            </div>
          </div>

          <div className="text-3xl md:text-4xl font-black text-slate-900 mb-8">AED {product.price}<span className="text-lg text-gray-400 font-medium">/{product.unit}</span></div>

          <div className="prose prose-lg prose-slate text-gray-600 mb-8">
            <p>{product.description || "Premium quality product sourced from top suppliers."}</p>
            <h4 className="font-bold text-slate-900 mt-4 mb-2">Specifications</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
               {product.specifications && Object.entries(product.specifications).map(([k,v]) => (
                 <li key={k} className="capitalize"><span className="font-semibold">{k}:</span> {v}</li>
               ))}
               {!product.specifications && <li>Standard Grade A</li>}
            </ul>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 lg:static lg:bg-transparent lg:p-0 lg:border-none shadow-[0_-5px_10px_rgba(0,0,0,0.05)] lg:shadow-none z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-4 py-3 sm:py-0 justify-between sm:justify-start">
                  <button className="p-2 hover:text-emerald-600 transition-colors"><Minus size={20}/></button>
                  <span className="font-bold text-lg min-w-[20px] text-center">1</span>
                  <button className="p-2 hover:text-emerald-600 transition-colors"><Plus size={20}/></button>
               </div>
               <div className="flex gap-4 flex-1">
                 <button onClick={() => addToCart(product)} className="flex-1 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                   <ShoppingBasket size={20}/> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
                 </button>
                 <button onClick={() => buyNow(product)} className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                   <CreditCard size={20}/> Buy Now
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 border-t mt-8 mb-20">
        <h3 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           {relatedProducts.map(p => (
             <div key={p.id} className="bg-white p-3 md:p-4 rounded-2xl border hover:shadow-lg transition-all cursor-pointer group" onClick={() => addToCart(p)}>
                <div className="h-24 md:h-32 bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 transition-colors"><Package size={32} className="md:w-10 md:h-10"/></div>
                <h4 className="font-bold text-sm truncate">{p.name}</h4>
                <div className="flex justify-between items-center mt-2">
                   <span className="font-bold text-emerald-600">AED {p.price}</span>
                   <button className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-emerald-600 transition-colors"><Plus size={14}/></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// Shop Listing
const ShopListingPage = ({ categoryId, initialSearch, onClose, onProductClick, addToCart }) => {
  const [filter, setFilter] = useState(initialSearch && initialSearch !== 'All' ? initialSearch : 'All');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    let filtered = ALL_PRODUCTS_DB;
    
    // Filter by Category if not "Search Results"
    if (categoryId !== 'Search Results') {
      filtered = filtered.filter(p => p.categoryId === categoryId);
    } 

    // Filter by Search Query (if category is Search Results) or Subcategory (if standard view)
    if (categoryId === 'Search Results' && initialSearch) {
       filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(initialSearch.toLowerCase()) || 
          p.subCategory?.toLowerCase().includes(initialSearch.toLowerCase())
       );
    } else if (filter && filter !== 'All') {
      filtered = filtered.filter(p => p.subCategory === filter);
    }
    
    setProducts(filtered);
  }, [categoryId, filter, initialSearch]);

  const subCategories = categoryId === 'Search Results' 
    ? [] 
    : ['All', ...new Set(ALL_PRODUCTS_DB.filter(p => p.categoryId === categoryId).map(p => p.subCategory).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in pt-20">
      <div className="bg-white sticky top-16 z-30 border-b shadow-sm">
         <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft/></button>
               <div>
                  <h1 className="font-black text-lg md:text-xl capitalize text-slate-800">{categoryId}</h1>
                  <p className="text-xs text-gray-500">{products.length} Products Found</p>
               </div>
            </div>
            <button className="p-2 bg-gray-100 rounded-full"><Filter size={20}/></button>
         </div>
         {subCategories.length > 0 && (
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
         )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
         {categoryId !== 'Search Results' && (
           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                 <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Flash Deal</span>
                 <h2 className="text-xl md:text-2xl font-black mt-2 mb-1">Up to 30% Off {filter === 'All' ? categoryId : filter}</h2>
                 <p className="text-indigo-100 text-sm mb-4">Ends in 04:23:12</p>
                 <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">Shop Now</button>
              </div>
              <Percent className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
           </div>
         )}

         {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <Search size={48} className="mb-4 opacity-20"/>
               <p>No products found.</p>
            </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <div key={product.id} onClick={() => onProductClick(product)} className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between">
                   <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-3 relative flex items-center justify-center overflow-hidden">
                      <div className="text-slate-300 group-hover:scale-110 transition-transform duration-500">{product.icon || <Package size={32} className="md:w-12 md:h-12"/>}</div>
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">{product.stock}</div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:bg-emerald-600"><Plus size={16}/></button>
                   </div>
                   <div>
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="font-bold text-slate-800 line-clamp-1 text-sm md:text-base">{product.name}</h3>
                         <div className="flex items-center text-xs font-bold text-yellow-500"><Star size={10} fill="currentColor" className="mr-0.5"/>{product.rating}</div>
                      </div>
                      <div className="font-black text-base md:text-lg text-slate-900">AED {product.price}<span className="text-[10px] md:text-xs text-gray-400 font-normal">/{product.unit}</span></div>
                   </div>
                </div>
              ))}
           </div>
         )}
      </div>
    </div>
  );
};

// Checkout & Order
const CheckoutPage = ({ cart, total, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  
  // Shipping State
  const [addressMode, setAddressMode] = useState('saved'); // 'saved' | 'new'
  const [selectedAddressId, setSelectedAddressId] = useState('addr1');
  const [customAddress, setCustomAddress] = useState({ fullName: '', address: '', city: '', phone: '' });
  
  const savedAddresses = [
    { id: 'addr1', type: 'Home', name: 'John Doe', address: '123 Palm Jumeirah', city: 'Dubai', phone: '+971 50 123 4567' },
    { id: 'addr2', type: 'Office', name: 'John Doe', address: 'Level 42, Sky Tower, Business Bay', city: 'Dubai', phone: '+971 50 123 4567' }
  ];

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple' | 'cod'
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const getActiveAddress = () => {
    if (addressMode === 'saved') return savedAddresses.find(a => a.id === selectedAddressId);
    return { ...customAddress, type: 'Custom Address' }; // Return custom address object
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-[110] overflow-y-auto animate-in slide-in-from-right pt-20">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
         <div className="flex justify-between items-center mb-8">
            <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 font-bold"><ChevronLeft/> Back to Cart</button>
            <div className="flex gap-2">
                {[1,2,3].map(i => (
                    <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                ))}
            </div>
         </div>

        {/* Steps Indicator */}

        {/* Step 1: Shipping */}
        {step === 1 && (
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
                <h2 className="text-xl md:text-2xl font-black mb-6">Shipping Address</h2>
                
                {/* Saved Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {savedAddresses.map(addr => (
                        <div 
                            key={addr.id}
                            onClick={() => { setAddressMode('saved'); setSelectedAddressId(addr.id); }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${addressMode === 'saved' && selectedAddressId === addr.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-slate-800 flex items-center gap-2">
                                    {addr.type === 'Home' ? <Home size={16}/> : <Building2 size={16}/>} {addr.type}
                                </span>
                                {addressMode === 'saved' && selectedAddressId === addr.id && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Check size={12}/></div>}
                            </div>
                            <p className="text-sm text-slate-500">{addr.address}, {addr.city}</p>
                            <p className="text-xs text-slate-400 mt-1">{addr.phone}</p>
                        </div>
                    ))}
                    
                    {/* Add New Option */}
                    <div 
                        onClick={() => setAddressMode('new')}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${addressMode === 'new' ? 'border-emerald-500 bg-emerald-50' : 'border-dashed border-gray-300 hover:border-emerald-400 hover:text-emerald-500 text-gray-400'}`}
                    >
                        <Plus size={24} />
                        <span className="font-bold text-sm">Add New Address</span>
                    </div>
                </div>

                {/* Custom Address Form */}
                {addressMode === 'new' && (
                    <div className="space-y-4 animate-in slide-in-from-top-2">
                        <input 
                            className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="Full Name"
                            value={customAddress.fullName}
                            onChange={e => setCustomAddress({...customAddress, fullName: e.target.value})}
                        />
                        <input 
                            className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="Street Address"
                            value={customAddress.address}
                            onChange={e => setCustomAddress({...customAddress, address: e.target.value})}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="City"
                                value={customAddress.city}
                                onChange={e => setCustomAddress({...customAddress, city: e.target.value})}
                            />
                            <input 
                                className="w-full p-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="Phone Number"
                                value={customAddress.phone}
                                onChange={e => setCustomAddress({...customAddress, phone: e.target.value})}
                            />
                        </div>
                    </div>
                )}
                
                <button onClick={() => setStep(2)} className="mt-8 w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all">Continue to Payment</button>
             </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
                <h2 className="text-xl md:text-2xl font-black mb-6">Payment Method</h2>
                
                <div className="space-y-3 mb-8">
                    {[
                        { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={20}/> },
                        { id: 'apple', label: 'Apple Pay', icon: <AppleLogo /> }, // Need to adjust icon component usage
                        { id: 'cod', label: 'Cash on Delivery', icon: <DollarSign size={20}/> }
                    ].map(method => (
                        <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className={`p-2 rounded-full ${paymentMethod === method.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-slate-500'}`}>{method.icon}</div>
                            <span className="font-bold text-slate-800 flex-1">{method.label}</span>
                            {paymentMethod === method.id && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Check size={12}/></div>}
                        </div>
                    ))}
                </div>

                {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-sm text-slate-500 uppercase">Card Details</h3>
                            <div className="flex gap-2">
                                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                <div className="w-8 h-5 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        <input 
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="Card Number"
                            value={cardDetails.number}
                            onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                            />
                            <input 
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="CVC"
                                value={cardDetails.cvv}
                                onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})}
                            />
                        </div>
                         <input 
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="Cardholder Name"
                            value={cardDetails.name}
                            onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-8">
                     <button onClick={() => setStep(1)} className="py-4 border border-gray-200 text-slate-600 font-bold rounded-xl hover:bg-gray-50">Back</button>
                     <button onClick={() => setStep(3)} className="py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800">Review Order</button>
                </div>
            </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in">
                <h2 className="text-xl md:text-2xl font-black mb-6">Review Order</h2>
                
                {/* Shipping Review */}
                <div className="bg-gray-50 p-4 rounded-xl mb-4 flex justify-between items-start">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping To</h4>
                        <div className="font-bold text-slate-900">{addressMode === 'saved' ? getActiveAddress().address : customAddress.address}</div>
                        <div className="text-sm text-slate-500">{addressMode === 'saved' ? getActiveAddress().city : customAddress.city}</div>
                        <div className="text-sm text-slate-500 mt-1">{addressMode === 'saved' ? getActiveAddress().phone : customAddress.phone}</div>
                    </div>
                    <button onClick={() => setStep(1)} className="text-emerald-600 text-sm font-bold hover:underline">Edit</button>
                </div>

                {/* Payment Review */}
                <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-between items-center">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Method</h4>
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                           {paymentMethod === 'card' && <><CreditCard size={18}/> Credit Card ending in {cardDetails.number.slice(-4) || '****'}</>}
                           {paymentMethod === 'apple' && <><AppleLogo /> Apple Pay</>}
                           {paymentMethod === 'cod' && <><DollarSign size={18}/> Cash on Delivery</>}
                        </div>
                    </div>
                    <button onClick={() => setStep(2)} className="text-emerald-600 text-sm font-bold hover:underline">Edit</button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                     <button onClick={() => setStep(2)} className="py-4 border border-gray-200 text-slate-600 font-bold rounded-xl hover:bg-gray-50">Back</button>
                     <button onClick={onComplete} className="py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 shadow-emerald-500/20">Place Order (AED {total.toFixed(2)})</button>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

const OrderTracking = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-50 z-[120] overflow-y-auto animate-in fade-in slide-in-from-bottom-10">
    <div className="max-w-3xl mx-auto min-h-screen bg-white shadow-2xl pb-10">
      <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 flex justify-between items-center">
        <div><h2 className="text-xl font-bold">Order #ORD-8829</h2><p className="text-slate-400 text-sm">Estimated Delivery: Today, 2:00 PM</p></div>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X/></button>
      </div>
      <div className="p-8">
        <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {[ { t: 'Order Placed', time: '10:00 AM', a: true, i: <ClipboardList size={16}/> }, { t: 'Processing', time: '10:30 AM', a: true, i: <Package size={16}/> }, { t: 'Out for Delivery', time: '1:15 PM', a: true, i: <Truck size={16}/> }, { t: 'Delivered', time: 'Pending', a: false, i: <Check size={16}/> } ].map((s, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[29px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${s.a ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{s.i}</div>
              <h3 className={`font-bold ${s.a ? 'text-slate-900' : 'text-gray-400'}`}>{s.t}</h3>
              <p className="text-xs text-gray-500">{s.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-[90vw] max-w-[400px] bg-white z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center bg-gray-50"><h2 className="font-bold text-lg flex items-center gap-2"><ShoppingBasket size={24} className="text-emerald-600"/> Your Cart</h2><button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X size={20}/></button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">{cartItems.length === 0 ? <div className="text-center text-gray-400 mt-20">Cart Empty</div> : cartItems.map(item => (<div key={item.cartId} className="flex gap-4 p-4 border rounded-xl shadow-sm"><div className="flex-1"><h4 className="font-bold text-gray-800 text-sm">{item.name}</h4><p className="text-xs text-gray-500">AED {item.price}/{item.unit}</p><div className="flex items-center gap-2 mt-2 bg-gray-50 w-fit rounded-lg px-2"><button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-red-500">-</button><span className="font-bold text-sm w-4 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-emerald-500">+</button></div></div><button onClick={() => removeItem(item.cartId)} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button></div>))}</div>
        <div className="p-6 border-t bg-gray-50"><div className="flex justify-between mb-4 font-bold text-xl text-gray-800"><span>Total</span><span>AED {total.toFixed(2)}</span></div><button onClick={onCheckout} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700">Checkout</button></div>
      </div>
    </>
  );
};

// --- ENHANCED DASHBOARD ---
const DashboardHome = () => {
  const stats = [
    { label: 'Total Sales', value: 'AED 124,500', sub: '+12% from last month', icon: <DollarSign size={20}/>, color: 'bg-emerald-500' },
    { label: 'Total Orders', value: '1,240', sub: '+5% new orders', icon: <ShoppingBag size={20}/>, color: 'bg-blue-500' },
    { label: 'Active Users', value: '3,400', sub: '+18% user growth', icon: <Users size={20}/>, color: 'bg-purple-500' },
    { label: 'Pending Issues', value: '12', sub: 'Requires attention', icon: <AlertCircle size={20}/>, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s,i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-xl text-white ${s.color}`}>{s.icon}</div>
                   <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{s.sub.split(' ')[0]}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900">{s.value}</h3>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
                <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
             </div>
          ))}
       </div>

       {/* Revenue Chart Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
                <select className="bg-gray-50 border-none text-sm font-bold text-slate-500 rounded-lg"><option>This Week</option><option>This Month</option></select>
             </div>
             {/* Simple SVG Chart */}
             <div className="h-64 flex items-end justify-between gap-2 px-4">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                   <div key={i} className="w-full bg-emerald-100 rounded-t-lg relative group">
                      <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg transition-all duration-1000 group-hover:bg-emerald-600"></div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">AED {h}k</div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Orders</h3>
             <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">#{8820+i}</div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-800">Alex Johnson</h4>
                         <p className="text-xs text-slate-400">2 mins ago</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">+AED 120.00</span>
                   </div>
                ))}
             </div>
             <button className="w-full mt-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">View All</button>
          </div>
       </div>
    </div>
  );
};

// ... existing Invoice/Offers/Catalogue/Sidebar components ...
const InvoicesView = () => (<div className="space-y-6"><h2 className="text-2xl font-black text-gray-800">Invoices</h2><div className="bg-white rounded-2xl shadow-sm border p-6">Invoice list here...</div></div>);
const OffersView = () => (<div className="space-y-6"><h2 className="text-2xl font-black text-gray-800">Offers</h2><div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white"><h3 className="text-3xl font-black">20% OFF</h3><p>On all Frozen Seafood.</p></div></div>);
const CatalogueView = ({ addToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{[...ProductsData, ...ServicesData].map(cat => (<div key={cat.id} className="bg-white rounded-2xl border p-4"><h3>{cat.title}</h3></div>))}</div>
);

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

const GuestSidebar = ({ isOpen, onClose, onNavigate, onLogin }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', action: 'landing' },
    { icon: <Info size={20} />, label: 'About Us', action: 'about' },
    { icon: <Phone size={20} />, label: 'Contact', action: 'contact' },
    { icon: <HelpCircle size={20} />, label: 'Support', action: 'support' }
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-[#0B1120] text-white z-[110] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl flex flex-col border-r border-white/5`}>
        
        {/* Header */}
        <div className="p-8 pt-10 pb-4 flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-widest text-white uppercase">Menu</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X size={24}/>
            </button>
        </div>

        {/* Menu Items */}
        <div className="px-6 flex-1 overflow-y-auto space-y-3">
            {menuItems.map((item, i) => (
                <button 
                    key={i} 
                    onClick={() => { onNavigate(item.action); onClose(); }} 
                    className="w-full flex items-center p-4 bg-[#1e293b] hover:bg-[#334155] rounded-2xl gap-4 text-white font-bold transition-all group active:scale-[0.98]"
                >
                    <span className="text-gray-400 group-hover:text-emerald-400 transition-colors">{item.icon}</span> 
                    {item.label}
                </button>
            ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/5 space-y-3 bg-[#0B1120]">
            <button 
                onClick={() => { onLogin(); onClose(); }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]"
            >
                <LogIn size={20} /> Sign In
            </button>
            <button 
                onClick={onClose}
                className="w-full py-4 rounded-xl bg-[#1e293b] border border-white/5 text-white font-bold hover:bg-[#334155] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
                <User size={20} /> Create Account
            </button>
        </div>
      </div>
    </>
  );
};

// --- NEWS TICKER COMPONENT ---
const NewsTicker = () => (
  <div className="bg-emerald-900/50 backdrop-blur-sm border-y border-white/5 py-2 overflow-hidden relative z-20">
    <div className="animate-marquee whitespace-nowrap flex gap-8 text-emerald-100/80 text-xs font-bold uppercase tracking-widest">
      <span>🚀 New: Same-day delivery now available in New York</span>
      <span>•</span>
      <span>🌱 Organic Veggies - 20% Off This Week</span>
      <span>•</span>
      <span>🔧 Professional AC Servicing starting at AED 49</span>
      <span>•</span>
      <span>📱 Download our new app for exclusive deals</span>
      <span>•</span>
      <span>❄️ Frozen Seafood Sale - Buy 1 Get 1 Free</span>
      <span>•</span>
      <span>🚀 New: Same-day delivery now available in New York</span>
    </div>
  </div>
);

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [landingSearch, setLandingSearch] = useState('');
  
  // Toasts State
  const [toasts, setToasts] = useState([]);
  const addToast = (title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Cart & Search Logic
  const addToCart = (item, openSidebar = true) => { 
    setCart(prev => { 
      const existing = prev.find(i => i.id === item.id); 
      return existing ? prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, { ...item, quantity: 1, cartId: Date.now() }]; 
    }); 
    addToast('Added to Cart', `${item.name} has been added.`);
    if(openSidebar) setIsCartOpen(true); 
  };
  
  const updateQuantity = (id, delta) => setCart(prev => prev.map(i => i.cartId === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  const removeItem = (id) => setCart(prev => prev.filter(i => i.cartId !== id));
  
  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      addToast(exists ? 'Removed from Wishlist' : 'Added to Wishlist', exists ? 'Item removed.' : 'Item saved for later.');
      return exists ? prev.filter(i => i !== id) : [...prev, id];
    });
  };

  const buyNow = (item) => { addToCart(item, false); setCurrentView('checkout'); };
  
  // Navigation for Search
  const handleSearch = (q) => { 
    if(q) { 
      setLandingSearch(q); 
      setActiveSubCategory('Search Results'); 
      setCurrentView('shop-listing'); 
      setMobileSearchOpen(false); 
      window.scrollTo(0,0);
    } 
  };
  
  const processVoiceCommand = (command) => {
    const lowerCmd = command.toLowerCase();
    
    // Check for intents: Add, Buy, Get
    if (lowerCmd.includes('add') || lowerCmd.includes('buy') || lowerCmd.includes('get')) {
        // Advanced Cleaning: Remove common filler words to isolate the product keyword
        const cleanName = lowerCmd
            .replace(/add|buy|get|to|cart|please|the|a|an|my|in/g, '')
            .trim(); // e.g., "Add the Atlantic Salmon please" -> "atlantic salmon"
            
        if (cleanName) {
            let product = null;

            // STRATEGY 1: Exact Name Match (Best)
            product = ALL_PRODUCTS_DB.find(p => p.name.toLowerCase() === cleanName);

            // STRATEGY 2: Priority Curated Match (Partial)
            // If we don't find exact, look for partial matches in the Curated (non-generated) list first.
            // Curated IDs don't have hyphens (e.g., 'p1', 's1'), Generated ones do (e.g., 'fresh-Fish-1')
            if (!product) {
               const curatedItems = ALL_PRODUCTS_DB.filter(p => !p.id.includes('-'));
               product = curatedItems.find(p => p.name.toLowerCase().includes(cleanName));
            }

            // STRATEGY 3: SubCategory/Type Match (e.g., "Add Fish")
            // If user says "Add Fish", and we have no product named "Fish", find the highest rated item of type "Fish"
            if (!product) {
                const categoryMatches = ALL_PRODUCTS_DB.filter(p => 
                    p.subCategory && p.subCategory.toLowerCase().includes(cleanName)
                );
                if (categoryMatches.length > 0) {
                    // Sort by rating to give the "best" product in that category
                    product = categoryMatches.sort((a,b) => b.rating - a.rating)[0];
                }
            }

            // STRATEGY 4: General Partial Match (Fallback)
            // Look through everything (including generated items)
            if (!product) {
                product = ALL_PRODUCTS_DB.find(p => p.name.toLowerCase().includes(cleanName));
            }
            
            if (product) {
                addToCart(product);
                addToast('Voice Command', `Added ${product.name} to cart`);
                return;
            } else {
                 addToast('Voice Command', `Not found: ${cleanName}. Searching...`);
                 // Fallback to search if product not found directly
                 setLandingSearch(cleanName);
                 setActiveSubCategory('Search Results');
                 setCurrentView('shop-listing');
                 return;
            }
        }
    }
    
    // Default: Search
    setLandingSearch(command);
    setActiveSubCategory('Search Results');
    setCurrentView('shop-listing');
    addToast('Voice Search', `Searching for: ${command}`);
  };

  const toggleListening = () => {
    if (isListening) {
        setIsListening(false); 
        return; 
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        addToast('Error', 'Voice not supported');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        setIsListening(true);
        addToast('Listening...', 'Try "Add Salmon to cart"');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        setIsListening(false);
        addToast('Error', 'Voice input failed');
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.start();
  };

  // Main Header Component
  const renderHeader = (isDark, isSticky = false) => (
    <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${isSticky || !isDark ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' : 'bg-white/5 backdrop-blur-md border-b border-white/5'}`}>
       <div className="flex justify-between items-center px-4 py-3 md:px-6">
         <div className="flex items-center gap-3">
           <button onClick={() => setIsSidebarOpen(true)} className={`p-2 rounded-xl transition-all active:scale-95 ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}><Menu size={24}/></button>
           <div onClick={() => {setCurrentView('landing'); setLandingSearch('');}} className="font-black text-xl flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg transform rotate-3 shadow-lg group-hover:rotate-6 transition-transform"></div>
              <div className={`tracking-tight ${!isDark || isSticky ? 'text-slate-900' : 'text-white'}`}>SKY<span className="text-emerald-400">MARKET</span></div>
           </div>
         </div>

         {/* Desktop Search */}
         <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${!isDark || isSticky ? 'text-gray-400 group-hover:text-emerald-500' : 'text-white/50 group-hover:text-white'}`}/>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search products & services..." 
              className={`w-full pl-12 pr-12 py-2.5 rounded-full border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${!isDark || isSticky ? 'bg-gray-100 border-transparent focus:bg-white text-slate-800 placeholder-gray-400' : 'bg-white/10 border-white/10 focus:bg-white/20 text-white placeholder-white/60'}`} 
            />
            <button onClick={toggleListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : !isDark || isSticky ? 'text-gray-400 hover:text-emerald-500' : 'text-white/50 hover:text-white'}`}>
               <Mic size={18}/>
            </button>
         </div>

         <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className={`md:hidden p-2 rounded-xl active:scale-95 transition-transform ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}><Search size={24}/></button>
            <button onClick={() => setIsCartOpen(true)} className={`relative p-2 rounded-xl active:scale-95 transition-transform ${!isDark || isSticky ? 'hover:bg-gray-100 text-slate-800' : 'hover:bg-white/10 text-white'}`}>
               <ShoppingBasket size={24} />
               {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">{cart.length}</span>}
            </button>
            {!isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 hover:shadow-emerald-500/30 transition-all active:scale-95"><LogIn size={18}/> <span className="hidden sm:inline">Login</span></button>
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-white/20 flex items-center justify-center font-bold text-white cursor-pointer shadow-lg hover:border-emerald-500 transition-colors" onClick={() => setIsSidebarOpen(true)}>JD</div>
            )}
         </div>
       </div>
       {mobileSearchOpen && (<div className="md:hidden px-4 pb-4 animate-in slide-in-from-top-5"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)} placeholder="Search..." className="w-full pl-10 pr-10 py-3 rounded-xl border bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xl" autoFocus /><button onClick={toggleListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full ${isListening ? 'bg-red-500 text-white' : 'text-gray-400'}`}><Mic size={16}/></button></div></div>)}
    </div>
  );

  // Routing Logic
  if (currentView === 'product' && activeProduct) return <><ToastContainer toasts={toasts} removeToast={removeToast} /><ProductDetailsPage product={activeProduct} onBack={() => setCurrentView('landing')} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />{renderHeader(true, true)}</>;
  if (currentView === 'checkout') return <><ToastContainer toasts={toasts} removeToast={removeToast} /><CheckoutPage cart={cart} total={cart.reduce((a,i)=>a+(i.price*i.quantity),0)} onBack={() => setIsCartOpen(true)} onComplete={() => { setCurrentView('tracking'); setCart([]); setIsCartOpen(false); addToast('Order Placed', 'Your order is being processed.'); }} /></>;
  if (currentView === 'tracking') return <OrderTracking onClose={() => setCurrentView('landing')} />;
  
  // Updated Pages with Layout Wrapping
  if (currentView === 'about') return (
     <div className="relative min-h-screen bg-gray-900 font-sans flex flex-col">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        {renderHeader(true, true)}
        <GuestSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            onLogin={() => setIsLoggedIn(true)}
            onNavigate={(c) => { 
                if(c==='landing') { setActiveSubCategory(null); setCurrentView('landing'); }
                else if (['about', 'contact', 'support'].includes(c)) { setCurrentView(c); window.scrollTo(0,0); }
                else if(c==='products'||c==='services') { document.getElementById('split-section')?.scrollIntoView({ behavior: 'smooth' }); }
            }} 
        />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
        <AboutPage />
        <Footer />
     </div>
  );

  if (currentView === 'contact') return (
     <div className="relative min-h-screen bg-gray-900 font-sans flex flex-col">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        {renderHeader(true, true)}
        <GuestSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            onLogin={() => setIsLoggedIn(true)}
            onNavigate={(c) => { 
                if(c==='landing') { setActiveSubCategory(null); setCurrentView('landing'); }
                else if (['about', 'contact', 'support'].includes(c)) { setCurrentView(c); window.scrollTo(0,0); }
                else if(c==='products'||c==='services') { document.getElementById('split-section')?.scrollIntoView({ behavior: 'smooth' }); }
            }} 
        />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
        <ContactPage />
        <Footer />
     </div>
  );

  if (currentView === 'support') return (
     <div className="relative min-h-screen bg-gray-900 font-sans flex flex-col">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        {renderHeader(true, true)}
        <GuestSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            onLogin={() => setIsLoggedIn(true)}
            onNavigate={(c) => { 
                if(c==='landing') { setActiveSubCategory(null); setCurrentView('landing'); }
                else if (['about', 'contact', 'support'].includes(c)) { setCurrentView(c); window.scrollTo(0,0); }
                else if(c==='products'||c==='services') { document.getElementById('split-section')?.scrollIntoView({ behavior: 'smooth' }); }
            }} 
        />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
        <SupportPage />
        <Footer />
     </div>
  );

  if (currentView === 'shop-listing' && activeSubCategory) return (<><ToastContainer toasts={toasts} removeToast={removeToast} /><div className="relative"><CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} /><ShopListingPage categoryId={activeSubCategory} initialSearch={landingSearch} onClose={() => setCurrentView('landing')} onProductClick={(p) => { setActiveProduct(p); setCurrentView('product'); }} addToCart={addToCart} />{renderHeader(true, true)}</div></>);
  if (isLoggedIn) return (<div className="flex min-h-screen bg-gray-50 font-sans"><DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLogout={() => setIsLoggedIn(false)} /><div className="flex-1 flex flex-col h-screen overflow-hidden"><header className="bg-white border-b p-4 flex justify-between items-center"><div className="flex items-center gap-4"><button className="md:hidden text-gray-500" onClick={() => setIsSidebarOpen(true)}><Menu/></button><h1 className="text-xl font-bold capitalize text-gray-800">{activeTab}</h1></div><button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full"><ShoppingBasket/>{cart.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">{cart.length}</span>}</button></header><main className="flex-1 overflow-y-auto p-6">{activeTab === 'dashboard' && <DashboardHome />}{activeTab === 'catalogue' && <CatalogueView addToCart={addToCart} />}{activeTab === 'invoices' && <InvoicesView />}{activeTab === 'offers' && <OffersView />}{activeTab === 'orders' && <div className="text-center text-gray-400 mt-20">Orders Module Loading...</div>}</main></div><CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} /></div>);

  // LANDING PAGE
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex flex-col font-sans overflow-y-auto scrollbar-hide">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {renderHeader(false, true)}
      <GuestSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogin={() => setIsLoggedIn(true)}
        onNavigate={(c) => { 
            if(c==='landing') { setActiveSubCategory(null); setCurrentView('landing'); }
            else if (['about', 'contact', 'support'].includes(c)) { setCurrentView(c); window.scrollTo(0,0); }
            else if(c==='products'||c==='services') { 
                // Just scroll to products for now or open listing
                document.getElementById('split-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        }} 
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={() => {setIsCartOpen(false); setCurrentView('checkout');}} />
      
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-24 pb-12">
         <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-1000 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-300 text-sm font-bold tracking-wide uppercase">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
               The Future of Commerce
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
               One Platform.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Limitless</span> Possibilities.
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
               Experience the seamless convergence of premium products and professional services. Everything you need, unified in one elegant ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
               <button onClick={() => document.getElementById('split-section').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  Start Exploring <ArrowDown size={20}/>
               </button>
               <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white text-emerald-900 flex items-center justify-center"><ArrowRight size={16}/></span> Learn More
               </button>
            </div>
         </div>
      </div>
      
      <NewsTicker />

      {/* Main Split Content - ID for scrolling */}
      <div id="split-section" className="flex flex-col lg:flex-row min-h-screen relative z-10 border-t border-white/5 bg-gray-900">
         
         {/* Left: Products */}
         <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-b from-emerald-950/80 to-gray-900/90 relative group/panel">
            <div className="p-6 lg:p-8 sticky top-16 z-20 bg-emerald-950/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-2xl shadow-inner ring-1 ring-white/10"><ShoppingBasket size={32} /></div>
                     <div>
                        <h2 className="text-3xl font-black text-white tracking-tight leading-none">Products</h2>
                        <p className="text-emerald-200/50 text-xs font-bold uppercase tracking-widest mt-1">Fresh • Frozen • Pantry</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="flex-1 p-6 lg:p-8">
               <div className="grid grid-cols-1 gap-8">
                  {ProductsData.map((cat) => (
                     <div key={cat.id} className="group/card relative bg-white/5 border border-white/10 hover:border-emerald-500/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20 hover:-translate-y-2">
                        {/* Hero Card Header */}
                        <div onClick={() => { setActiveSubCategory(cat.id); setLandingSearch('All'); setCurrentView('shop-listing'); }} className={`h-32 bg-gradient-to-br ${cat.gradient} p-8 relative overflow-hidden cursor-pointer group/header`}>
                           <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover/header:scale-150 transition-transform duration-700"></div>
                           <div className="relative z-10 text-white h-full flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-black tracking-tight">{cat.title}</h3>
                                <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover/header:opacity-100 group-hover/header:translate-x-0 transition-all" />
                              </div>
                              <span className="inline-block px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider w-fit">{cat.subtitle}</span>
                           </div>
                           <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-xl group-hover/header:rotate-12 transition-transform duration-500">{React.cloneElement(cat.icon, { size: 32 })}</div>
                        </div>

                        {/* Sub Items Grid - COLORED & HIGHLIGHTED */}
                        <div className="p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm">
                           <div className="grid grid-cols-2 gap-4 mb-6">
                              {cat.items.slice(0, 4).map((item, i) => (
                                 <button 
                                    key={i} 
                                    onClick={(e) => { 
                                       e.stopPropagation(); 
                                       setActiveSubCategory(cat.id); 
                                       setLandingSearch(item.type); 
                                       setCurrentView('shop-listing'); 
                                    }}
                                    className={`
                                       relative overflow-hidden group/item 
                                       flex flex-col justify-between 
                                       p-4 h-36 rounded-2xl 
                                       ${cat.itemBg} 
                                       border border-white/10
                                       shadow-lg
                                       hover:-translate-y-1 hover:scale-[1.02]
                                       transition-all duration-300 
                                       text-left backdrop-blur-md
                                    `}
                                 >
                                    <div className="relative z-10 w-full flex justify-between items-start">
                                        <div className={`p-2.5 rounded-xl bg-white/20 text-white shadow-inner border border-white/10 group-hover/item:scale-110 transition-transform`}>{item.icon}</div>
                                    </div>
                                    <div className="relative z-10 w-full mt-auto">
                                        <span className="block text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-md">{item.name}</span>
                                        <span className="text-[10px] text-white/70 mt-1 block font-medium uppercase tracking-wider">{item.type}</span>
                                    </div>
                                 </button>
                              ))}
                           </div>
                           <button onClick={() => { setActiveSubCategory(cat.id); setLandingSearch('All'); setCurrentView('shop-listing'); }} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-white/80 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]`}>
                              Explore All {cat.title} <ArrowRight size={16}/>
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right: Services */}
         <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/90 to-black/95 relative group/panel">
            <div className="p-6 lg:p-8 sticky top-16 z-20 bg-slate-900/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/20 text-blue-300 rounded-2xl shadow-inner ring-1 ring-white/10"><Wrench size={32} /></div>
                     <div>
                        <h2 className="text-3xl font-black text-white tracking-tight leading-none">Services</h2>
                        <p className="text-blue-200/50 text-xs font-bold uppercase tracking-widest mt-1">Maintenance • Branding</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 p-6 lg:p-8">
               <div className="grid grid-cols-1 gap-8">
                  {ServicesData.map((cat) => (
                     <div key={cat.id} className="group/card relative bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2">
                        <div onClick={() => { setActiveSubCategory(cat.id); setLandingSearch('All'); setCurrentView('shop-listing'); }} className={`h-32 bg-gradient-to-br ${cat.gradient} p-8 relative overflow-hidden cursor-pointer group/header`}>
                           <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover/header:scale-150 transition-transform duration-700"></div>
                           <div className="relative z-10 text-white h-full flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-black tracking-tight">{cat.title}</h3>
                                <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover/header:opacity-100 group-hover/header:translate-x-0 transition-all" />
                              </div>
                              <span className="inline-block px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider w-fit">{cat.subtitle}</span>
                           </div>
                           <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-xl group-hover/header:rotate-12 transition-transform duration-500">{React.cloneElement(cat.icon, { size: 32 })}</div>
                        </div>

                        <div className="p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm">
                           <div className="grid grid-cols-2 gap-4 mb-6">
                              {cat.items.slice(0, 4).map((item, i) => (
                                 <button 
                                    key={i} 
                                    onClick={(e) => { 
                                       e.stopPropagation(); 
                                       setActiveSubCategory(cat.id); 
                                       setLandingSearch(item.type); 
                                       setCurrentView('shop-listing'); 
                                    }}
                                    className={`
                                       relative overflow-hidden group/item 
                                       flex flex-col justify-between 
                                       p-4 h-36 rounded-2xl 
                                       ${cat.itemBg}
                                       border border-white/10
                                       shadow-lg
                                       hover:-translate-y-1 hover:scale-[1.02]
                                       transition-all duration-300 
                                       text-left backdrop-blur-md
                                    `}
                                 >
                                    <div className="relative z-10 w-full flex justify-between items-start">
                                        <div className={`p-2.5 rounded-xl bg-white/20 text-white shadow-inner border border-white/10 group-hover/item:scale-110 transition-transform`}>{item.icon}</div>
                                    </div>
                                    <div className="relative z-10 w-full mt-auto">
                                        <span className="block text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-md">{item.name}</span>
                                        <span className="text-[10px] text-white/70 mt-1 block font-medium uppercase tracking-wider">{item.type}</span>
                                    </div>
                                 </button>
                              ))}
                           </div>
                           <button onClick={() => { setActiveSubCategory(cat.id); setLandingSearch('All'); setCurrentView('shop-listing'); }} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-white/80 bg-white/5 hover:bg-blue-500 hover:text-white border border-white/10 transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]`}>
                              Explore All {cat.title} <ArrowRight size={16}/>
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-24 bg-gray-900 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose SkyMarket?</h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-lg">We combine cutting-edge technology with premium quality to deliver an unmatched experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { icon: <TruckIcon size={32}/>, title: "Global Logistics", desc: "Seamless delivery network spanning 150+ countries with real-time tracking.", color: "text-emerald-400" },
                  { icon: <Shield size={32}/>, title: "Secure Payments", desc: "Bank-grade encryption ensuring your transactions are safe and protected.", color: "text-blue-400" },
                  { icon: <Award size={32}/>, title: "Premium Quality", desc: "Curated selection of verified products and certified service professionals.", color: "text-purple-400" }
               ].map((f, i) => (
                  <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2">
                     <div className={`mb-6 p-4 rounded-2xl bg-white/5 w-fit ${f.color}`}>{f.icon}</div>
                     <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
                     <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* NEW: App Download Section */}
      <div className="relative z-10 py-24 bg-black border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]"></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  <Smartphone size={14}/> Mobile App
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Experience SkyMarket<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">On the Go.</span>
               </h2>
               <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Download our award-winning app for exclusive mobile-only deals, real-time order tracking, and seamless 1-click checkout.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors">
                     <AppleLogo />
                     <div className="text-left leading-tight">
                        <div className="text-[10px] font-medium uppercase">Download on the</div>
                        <div className="text-lg font-bold font-sans">App Store</div>
                     </div>
                  </button>
                  <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-transparent border border-white/20 text-white hover:bg-white/10 transition-colors">
                     <GooglePlayLogo />
                     <div className="text-left leading-tight">
                        <div className="text-[10px] font-medium uppercase">Get it on</div>
                        <div className="text-lg font-bold font-sans">Google Play</div>
                     </div>
                  </button>
               </div>
               <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-700"></div>)}
                  </div>
                  <div className="text-sm text-slate-400">
                     <span className="text-white font-bold">4.9/5</span> rating based on <span className="text-white font-bold">12k+</span> reviews
                  </div>
               </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px] flex justify-center items-center">
               {/* Phone Mockup - CSS Only */}
               <div className="relative w-[300px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-20"></div>
                  <div className="absolute inset-0 bg-gray-900 flex flex-col">
                     {/* Mock App Header */}
                     <div className="h-20 bg-gray-900 border-b border-white/10 flex items-end p-4">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="ml-auto w-24 h-8 rounded-full bg-white/10"></div>
                     </div>
                     {/* Mock App Content */}
                     <div className="p-4 space-y-4">
                        <div className="h-40 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600"></div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="h-32 rounded-2xl bg-white/10"></div>
                           <div className="h-32 rounded-2xl bg-white/10"></div>
                           <div className="h-32 rounded-2xl bg-white/10"></div>
                           <div className="h-32 rounded-2xl bg-white/10"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Footer />
    </div>
  );
}