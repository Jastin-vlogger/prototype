"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Sparkles, Calendar, Star, Phone, MapPin, Mail, ChevronRight, 
  ChevronLeft, Clock, ShieldCheck, Smile, Activity, Menu, X,
  Moon, Sun, Users, Microscope, Award, Quote, Plus, Minus, CheckCircle2,
  ArrowRight, Info, Image as ImageIcon, FileText, MessageSquare, Linkedin, 
  Twitter, ArrowLeft, HeartPulse, Shield, Zap, Home
} from 'lucide-react';

// --- Centralized Data ---

const servicesData = [
  { id: 'dental-implants', title: "Dental Implants", desc: "Foundation for replacement teeth that look, feel, and function like natural teeth.", fullDesc: "Dental implants are changing the way people live. They are designed to provide a foundation for replacement teeth that look, feel, and function like natural teeth. The person who has lost teeth regains the ability to eat virtually anything and can smile with confidence.", price: "Custom Quote", icon: ShieldCheck, color: "text-teal-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-teal-400", cardBg: "bg-gradient-to-br from-teal-500 to-cyan-600 border-teal-400 text-white", btnBg: "bg-white text-teal-700 hover:bg-teal-50", shadow: "shadow-teal-500/20 hover:shadow-teal-500/40", process: ["Consultation & 3D Imaging", "Implant Placement", "Osseointegration (Healing)", "Crown Attachment"] },
  { id: 'invisalign', title: "Invisalign", desc: "Straighten teeth using custom-made clear braces that gently pull them into position.", fullDesc: "Invisalign is an orthodontic treatment that straightens teeth by using custom-made clear braces that cover your teeth and gently pull them into the proper position over time. Because they are clear and removable, they are far less noticeable and more convenient than traditional braces.", price: "From $2,500", icon: Star, color: "text-cyan-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-cyan-400", cardBg: "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white", btnBg: "bg-white text-cyan-700 hover:bg-cyan-50", shadow: "shadow-cyan-500/20 hover:shadow-cyan-500/40", process: ["Digital 3D Scan", "Custom Aligner Creation", "Initial Fitting", "Progress Monitoring"] },
  { id: 'smile-makeover', title: "Smile Makeover", desc: "Cosmetic procedure that changes appearance and restores optimal dental function.", fullDesc: "Smile makeover is a cosmetic dental procedure that not only changes the appearance of your teeth, smile, or bite but also optimizes and restores your function. We combine multiple advanced treatments to give you the perfect, radiant smile you deserve.", price: "Consultation Free", icon: Sparkles, color: "text-amber-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-amber-400", cardBg: "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400 text-white", btnBg: "bg-white text-amber-700 hover:bg-amber-50", shadow: "shadow-amber-500/20 hover:shadow-amber-500/40", process: ["Aesthetic Evaluation", "Digital Smile Design", "Preparatory Treatments", "Final Restorations"] },
  { id: 'orthodontics', title: "Orthodontic Treatment", desc: "Address misaligned teeth early for perfect chewing, biting, and speaking.", fullDesc: "Address your child’s misaligned teeth as early as they can chew, bite and speak normally. For children’s and adult orthodontics, our expert team is here for you and your family, utilizing the latest in both traditional and invisible alignment technology.", price: "Consultation Free", icon: Smile, color: "text-blue-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-blue-400", cardBg: "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 text-white", btnBg: "bg-white text-blue-700 hover:bg-blue-50", shadow: "shadow-blue-500/20 hover:shadow-blue-500/40", process: ["Orthodontic Assessment", "Treatment Planning", "Appliance Placement", "Routine Adjustments"] },
  { id: 'root-canal', title: "Root Canal Treatment", desc: "Prevent tooth loss by removing infected tissue and sealing with biocompatible material.", fullDesc: "Root canal treatment is a procedure intended to prevent tooth loss and a widespread infection by removing the infected pulp tissue, cleaning and filling the canals with a biocompatible material. Our advanced techniques make this process practically painless.", price: "From $400", icon: Activity, color: "text-rose-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-rose-400", cardBg: "bg-gradient-to-br from-rose-500 to-pink-600 border-rose-400 text-white", btnBg: "bg-white text-rose-700 hover:bg-rose-50", shadow: "shadow-rose-500/20 hover:shadow-rose-500/40", process: ["Digital X-Ray & Diagnosis", "Local Anesthesia", "Infection Removal", "Sealing & Crowning"] },
  { id: 'laser-whitening', title: "Laser Teeth Whitening", desc: "Lighten teeth to a brighter color using strong dental gel activated by a laser.", fullDesc: "Laser teeth whitening is a technique that lightens teeth to a whiter and brighter color with the use of a strong dental bleaching gel that is activated by a laser beam. Achieve a stellar, radiant smile in just a single one-hour visit.", price: "From $199", icon: Zap, color: "text-sky-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-sky-400", cardBg: "bg-gradient-to-br from-sky-500 to-cyan-600 border-sky-400 text-white", btnBg: "bg-white text-sky-700 hover:bg-sky-50", shadow: "shadow-sky-500/20 hover:shadow-sky-500/40", process: ["Shade Assessment", "Gum Protection", "Laser Gel Application", "Final Polish"] }
];

const comprehensiveCategories = [
  {
    title: "General Dentistry",
    bgClass: "from-emerald-100 to-white border-emerald-200 shadow-emerald-500/10 hover:shadow-emerald-500/20",
    titleClass: "border-emerald-200 text-emerald-800",
    iconClass: "text-emerald-600",
    items: ["Comprehensive Oral Exams", "Routine Teeth Cleaning", "Deep Cleaning for Teeth & Gums", "Composite Fillings", "Dental Inlays & Onlays", "Periodical (Gum) Care", "Preventive Dentistry", "Orthodontic Treatment (Braces)", "Pediatric Dentistry Care", "Root Canal Treatment", "Tooth Extractions", "Wisdom Tooth (3rd Molar) Removal"]
  },
  {
    title: "Cosmetic Dentistry",
    bgClass: "from-amber-100 to-white border-amber-200 shadow-amber-500/10 hover:shadow-amber-500/20",
    titleClass: "border-amber-200 text-amber-800",
    iconClass: "text-amber-600",
    items: ["Invisalign Clear Aligners", "Complete Smile Makeovers", "Ceramic Veneers", "Laser Teeth Whitening", "Enamel Reshaping", "Dental Bonding", "Gummy Smile Correction"]
  },
  {
    title: "Restorative Dentistry",
    bgClass: "from-teal-100 to-white border-teal-200 shadow-teal-500/10 hover:shadow-teal-500/20",
    titleClass: "border-teal-200 text-teal-800",
    iconClass: "text-teal-600",
    items: ["Dental Crowns & Bridges", "Dental Implants", "Implant-Supported Crowns & Bridges", "Removable Dentures", "Snap-On Dentures", "Fixed Dentures", "Full Mouth Rehabilitation", "All-On-Four Dental Implants"]
  }
];

const doctorsData = [
  { 
    id: 'dr-orion-pax', 
    name: "Dr. Orion Pax", 
    role: "Lead Cosmetic Specialist", 
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    bio: "With over 15 years navigating the complexities of cosmetic dentistry, Dr. Pax is a pioneer in complete smile makeovers. He believes every patient deserves to shine inside and out, blending artistic vision with microscopic medical precision.", 
    credentials: ["DDS, Nova University of Dental Medicine", "Fellow, Galactic Academy of Cosmetic Dentistry", "Certified Invisalign Provider", "Over 5,000 successful smile makeovers"], 
    specialty: "Cosmetic Dentistry",
    specializations: ["Porcelain Veneers", "Smile Makeovers", "Laser Teeth Whitening", "Dental Bonding"],
    rating: 4.9,
    reviews: 342,
    quote: "My mission is to craft a look that perfectly reflects the radiant star you are."
  },
  { 
    id: 'dr-lyra-vance', 
    name: "Dr. Lyra Vance", 
    role: "Orthodontic Director", 
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    bio: "Dr. Vance is passionate about the biomechanics of a perfect bite. Specializing in advanced aligners and traditional orthodontics, she crafts customized treatment trajectories that are efficient and transformative for both children and adults.", 
    credentials: ["DMD, Cosmos Medical School", "Board Certified Orthodontist", "Platinum Provider for Invisalign", "M.S. in Craniofacial Biology"], 
    specialty: "Orthodontics",
    specializations: ["Clear Aligners", "Pediatric Orthodontics", "Complex Bite Correction", "Early Interceptive Care"],
    rating: 5.0,
    reviews: 218,
    quote: "A perfectly aligned smile is the foundation of lifelong oral health and confidence."
  },
  { 
    id: 'dr-nova-sterling', 
    name: "Dr. Nova Sterling", 
    role: "Implantologist & Surgeon", 
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    bio: "Dr. Sterling brings unparalleled precision to restorative and surgical dentistry. Her calm demeanor and expertise ensure that even the most complex reconstructions, extractions, and implant procedures deliver maximum results with minimal downtime.", 
    credentials: ["MD, DDS, Stellar Medical College", "Chief of Surgery, Nebula Health", "Specialist in Full-Mouth Restorations", "Board Certified Oral Surgeon"], 
    specialty: "Surgery & Implants",
    specializations: ["Titanium Implants", "All-On-Four Implants", "Complex Extractions", "Full Mouth Rehabilitation"],
    rating: 4.8,
    reviews: 156,
    quote: "Restoring your dental foundation restores your entire quality of life."
  },
];

const newsData = [
  { id: 1, title: "The Future of AI in Orthodontics", date: "April 12, 2026", author: "Dr. Lyra Vance", category: "Technology", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "How predictive modeling and 3D scanning are making treatments more precise than ever.", content: "Artificial Intelligence is no longer just a sci-fi concept; it's a daily reality in modern dentistry. At COSMO DENTAL, we utilize AI-driven algorithms to map your oral cavity with microscopic precision. This allows us to predict how teeth will shift over time and tailor aligners perfectly. By integrating these systems, we deliver maximum results with minimal chair time." },
  { id: 2, title: "Why Dental Implants are Changing Lives", date: "March 28, 2026", author: "Dr. Nova Sterling", category: "Treatments", img: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "Discover the unseen benefits of permanent replacements over traditional dentures.", content: "For decades, removable dentures were the only reliable path to restoring a full smile. Today, Dental Implants have changed the game. Made from medical-grade titanium, these posts fuse with your jawbone. The benefits aren't just aesthetic; they prevent bone loss, restore full chewing power, and never slip or click while you speak. It is a true, permanent return to form." },
  { id: 3, title: "Maintaining Your Smile in Zero Gravity", date: "March 15, 2026", author: "Dr. Orion Pax", category: "Oral Health", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "Daily habits and futuristic tools to keep your enamel strong and your breath fresh.", content: "Keeping your smile stellar between visits requires daily dedication. We recommend brushing twice daily using an ultrasonic toothbrush, which operates at frequencies high enough to disrupt plaque colonies even slightly beyond the bristles' reach. Flossing is non-negotiable; consider water flossers to clear interdental debris gently. Lastly, limit highly acidic and sugary fuels which can erode enamel over time." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590664095641-7fa05f689813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// --- Shared UI Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform active:scale-95";
  const sizeStyle = "px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-300",
    secondary: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    cosmic: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-lg shadow-emerald-300/50",
    glass: "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
  };
  return <button className={`${baseStyle} ${sizeStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '', hover = true }) => (
  <div className={`backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-md ${hover ? 'hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500' : ''} relative overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Breadcrumb Page Header (Inner Pages Only) ---
const Breadcrumbs = ({ paths, navigateTo }) => (
  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-slate-300 mb-6 font-medium tracking-wide">
    <button onClick={() => navigateTo('home')} className="flex items-center gap-1 hover:text-white transition-colors">
      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Home
    </button>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
        {p.action ? (
          <button onClick={p.action} className="hover:text-white transition-colors break-words">{p.label}</button>
        ) : (
          <span className="text-white font-bold break-words">{p.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

const PageHeader = ({ title, subtitle, icon: Icon, breadcrumbs, navigateTo, bgImage }) => (
  <div className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 w-full mx-auto text-center bg-slate-900 text-white overflow-hidden animate-in fade-in duration-700">
    {bgImage && (
      <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105 animate-[pulse_20s_ease-in-out_infinite]" />
    )}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto">
      {breadcrumbs && <Breadcrumbs paths={breadcrumbs} navigateTo={navigateTo} />}
      
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl shadow-emerald-900/50 mb-6 sm:mb-8">
          <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-300" />
        </div>
      )}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-lg leading-tight">{title}</h1>
      <p className="text-sm sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">{subtitle}</p>
    </div>
  </div>
);

// --- Modern Testimonial Slider Component ---
const TestimonialCarousel = () => {
  const scrollRef = useRef(null);
  const testimonials = [
    { text: "COSMO DENTAL completely elevated my dental routine. From my pristine implants to the flawless root canal, I look and feel amazing.", author: "Sarah Jenkins", role: "Restorative Patient", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" },
    { text: "The smile makeover transformed my confidence perfectly, and their laser tech is unmatched. Truly a one-stop clinic for shining inside and out.", author: "Marcus Thorne", role: "Cosmetic Patient", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80" },
    { text: "I used to have severe clinic anxiety. The calming spa aesthetic and their incredibly transparent, expert care completely cured my fear.", author: "Elena Rostova", role: "General Care", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80" },
    { text: "Best orthodontics experience for my teenager. The invisible aligners worked exactly as predicted by the AI models. Highly recommend the team here.", author: "David Chen", role: "Parent", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&q=80" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth - 48 : 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
       <div className="flex justify-end gap-3 mb-6">
          <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
       </div>
       <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
         {testimonials.map((review, idx) => (
            <div key={idx} className="w-[85vw] sm:w-[400px] snap-center sm:snap-start shrink-0 flex">
               <Card className="w-full bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 flex flex-col hover:border-emerald-300 transition-colors shadow-lg shadow-emerald-500/5">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-200 mb-4 sm:mb-6 shrink-0" />
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />)}
                  </div>
                  <p className="text-emerald-950 mb-6 sm:mb-8 italic text-sm sm:text-base leading-relaxed flex-grow">"{review.text}"</p>
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto border-t border-emerald-100/50 pt-4 sm:pt-6">
                    <img src={review.avatar} alt={review.author} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-200 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm sm:text-base">{review.author}</h4>
                      <p className="text-xs sm:text-sm text-emerald-600 font-medium">{review.role}</p>
                    </div>
                  </div>
               </Card>
            </div>
         ))}
       </div>
    </div>
  );
};

// --- Hero Slider Component (Home Page Only) ---
const HeroSlider = ({ navigateTo }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const slides = [
    { id: 1, title: "Radiant Smiles", subtitle: "A New Era of", desc: "At COSMO DENTAL, we’re all about combining state-of-the-art technology with expert care to help you shine. Your ultimate smile awaits.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&w=2000&q=80", badge: "Premium Dentistry" },
    { id: 2, title: "Precision Implants", subtitle: "Restore Your Bite with", desc: "From advanced All-On-Four implants to flawless cosmetic crowns, we deliver maximum results with minimal downtime to elevate your confidence.", img: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&w=2000&q=80", badge: "Restorative Excellence" },
    { id: 3, title: "Zero-Gravity Comfort", subtitle: "Painless Procedures &", desc: "Whether you're looking to perfect your smile with ultra-thin veneers or invisible aligners, our expert team provides transformative solutions effortlessly.", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&w=2000&q=80", badge: "Anxiety-Free Care" }
  ];

  const nextSlide = useCallback(() => { setCurrent(p => (p === slides.length - 1 ? 0 : p + 1)); setProgress(0); }, [slides.length]);
  const prevSlide = () => { setCurrent(p => (p === 0 ? slides.length - 1 : p - 1)); setProgress(0); };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 100) { nextSlide(); return 0; } return p + 1.5; });
    }, 50);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] sm:p-4 lg:p-6 overflow-hidden">
      <div className="relative w-full h-full sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 group">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40 z-10"></div>
            <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-[12000ms] ease-out" style={{ transform: index === current ? 'scale(1)' : 'scale(1.1)' }} />
            <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 w-full max-w-7xl mx-auto">
              {index === current && (
                <div className="space-y-6 sm:space-y-8 max-w-2xl mb-16 sm:mb-0">
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-300" /> <span className="uppercase tracking-wide">{slide.badge}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-xl">
                    <span className="block text-slate-200 font-light text-2xl sm:text-4xl lg:text-5xl mb-2 drop-shadow-md">{slide.subtitle}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">{slide.title}</span>
                  </h1>
                  <p className="text-sm sm:text-lg lg:text-xl text-slate-100 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 leading-relaxed drop-shadow-lg">{slide.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                    <Button variant="cosmic" onClick={() => navigateTo('booking')} className="gap-2 shadow-xl shadow-emerald-500/20 w-full sm:w-auto">Book Consultation <ArrowRight className="w-5 h-5" /></Button>
                    <Button variant="glass" onClick={() => navigateTo('services')} className="w-full sm:w-auto">Explore Services</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Adjusted bottom to prevent overlap with Trust Banner on small screens */}
        <div className="absolute bottom-20 sm:bottom-32 left-0 w-full z-30 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            {slides.map((_, idx) => (
              <div key={idx} onClick={() => { setCurrent(idx); setProgress(0); }} className="h-1.5 rounded-full overflow-hidden bg-white/20 cursor-pointer flex-1 sm:flex-none sm:w-16">
                <div className={`h-full bg-white ${idx === current ? 'transition-all duration-50 ease-linear' : ''}`} style={{ width: idx === current ? `${progress}%` : (idx < current ? '100%' : '0%') }} />
              </div>
            ))}
          </div>
          <div className="gap-3 hidden sm:flex">
            <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Pages / Sections ---

const HomePage = ({ navigateTo }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = [
    { q: "Do you accept terrestrial insurance?", a: "Yes, we accept a wide variety of major insurance plans. Our galactic coordinators will help you maximize your benefits during your visit." },
    { q: "What should I expect on my first dental visit?", a: "Your first journey includes a comprehensive consultation, 3D mapping of your oral galaxy, and a customized treatment plan designed by our expert team to deliver maximum results." },
    { q: "Is laser teeth whitening safe for my enamel?", a: "Absolutely. Our professional whitening procedures use advanced, safe light frequencies that lift stains without damaging the structural integrity of your enamel." },
    { q: "Do these procedures require significant downtime?", a: "At COSMO DENTAL, we prioritize state-of-the-art technology that provides maximum transformative results with minimal downtime, getting you back to your life quickly." }
  ];

  return (
    <div className="space-y-20 sm:space-y-32 pb-20">
      <HeroSlider navigateTo={navigateTo} />

      {/* Trust / Stats Banner - Modern Separate Cards */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto -mt-24 sm:-mt-28 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/40 border border-white/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="w-16 h-16 bg-emerald-100/80 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner rotate-3 group-hover:-rotate-3 transition-transform duration-300 border border-emerald-200/50">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tight">15k<span className="text-emerald-500">+</span></h3>
            <p className="text-emerald-700 font-extrabold text-xs sm:text-sm uppercase tracking-widest">Radiant Patients</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/40 border border-white/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="w-16 h-16 bg-amber-100/80 text-amber-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner rotate-3 group-hover:-rotate-3 transition-transform duration-300 border border-amber-200/50">
              <Star className="w-8 h-8 fill-amber-500" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tight">4.9<span className="text-2xl sm:text-3xl text-slate-400 font-bold">/5</span></h3>
            <p className="text-amber-700 font-extrabold text-xs sm:text-sm uppercase tracking-widest">Average Rating</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/40 border border-white/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="w-16 h-16 bg-teal-100/80 text-teal-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner rotate-3 group-hover:-rotate-3 transition-transform duration-300 border border-teal-200/50">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tight">15<span className="text-teal-500">+</span></h3>
            <p className="text-teal-700 font-extrabold text-xs sm:text-sm uppercase tracking-widest">Years Experience</p>
          </div>

        </div>
      </section>

      {/* Intro Text Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-6 leading-tight">A New Era of Radiant Smiles & Unmatched Dental Care!</h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium">
          At COSMO DENTAL, we’re all about combining state-of-the-art technology with expert care to help you shine, inside and out. Whether you're looking to perfect your smile or restore your oral health, we’ve got you covered with treatments that elevate your confidence to the next level.
        </p>
      </section>

      {/* Why Choose Us - Beautiful Colored Gradient Cards */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">The COSMO Advantage</h2>
          <p className="text-base sm:text-lg text-slate-600">Redefining what it means to visit the clinic.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="relative p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 hover:-translate-y-2 transition-transform duration-500 overflow-hidden group border border-emerald-400">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-inner">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">Expert Care</h3>
            <p className="text-emerald-50 leading-relaxed text-sm sm:text-base font-medium">From dental precision to aesthetic transformations, our medical experts ensure you remain entirely relaxed and safe throughout your visit.</p>
          </div>

          <div className="relative p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl shadow-teal-500/20 hover:-translate-y-2 transition-transform duration-500 overflow-hidden group border border-teal-400">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">Absolute Transparency</h3>
            <p className="text-teal-50 leading-relaxed text-sm sm:text-base font-medium">No surprise fees or hidden procedures. We provide clear, upfront maps of your restorative and cosmetic dental treatment costs.</p>
          </div>

          <div className="relative p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/20 hover:-translate-y-2 transition-transform duration-500 overflow-hidden group border border-amber-400">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-inner">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">Minimal Downtime</h3>
            <p className="text-amber-50 leading-relaxed text-sm sm:text-base font-medium">Advanced 3D scanning, non-invasive tech, and precision lasers allow us to complete transformative procedures faster than ever.</p>
          </div>

        </div>
      </section>

      {/* Services Overview - Beautiful Colored Gradient Cards */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="text-center sm:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Delivering Outstanding Care</h2>
            <p className="text-base sm:text-lg text-slate-600">Your smile deserves the best. And at COSMO DENTAL, we’re here to give it just that.</p>
          </div>
          <Button variant="outline" onClick={() => navigateTo('services')} className="hidden sm:flex bg-white">View All Services</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <div key={idx} className={`group relative rounded-[2.5rem] p-8 sm:p-10 border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 ${service.cardBg} ${service.shadow}`}>
              
              {/* Dynamic hover background glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-white`}></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20 ${service.bg}`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 transition-colors relative z-10 leading-tight drop-shadow-md">{service.title}</h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium">{service.desc}</p>

              <button 
                onClick={() => navigateTo('service-detail', service)} 
                className={`w-full py-4 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 relative z-10 ${service.btnBg}`}
              >
                Learn More <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden"><Button variant="outline" onClick={() => navigateTo('services')} className="w-full bg-white">View All Services</Button></div>
      </section>

      {/* Technology Section */}
      <section className="bg-slate-900 text-white py-20 sm:py-32 relative overflow-hidden sm:rounded-[3rem] sm:mx-6 lg:mx-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative px-4 sm:px-0 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 rounded-[2rem] sm:rounded-[3rem] transform rotate-3 sm:rotate-6 scale-105 blur-xl -z-10 group-hover:rotate-12 transition-transform duration-700"></div>
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&w=1000&q=80" alt="Dental Technology" className="rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl w-full object-cover relative z-10" />
          </div>
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold"><Microscope className="w-4 h-4" /><span>State-of-the-Art Technology</span></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Advanced Care for <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Maximum Results.</span></h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">We've equipped our clinic with the most advanced aesthetic and dental technology. From laser skin resurfacing to 3D oral mapping, your care is faster, safer, and remarkably precise.</p>
            <ul className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              {["3D Oral Scanners (No messy impressions)", "Advanced Laser Therapies (Painless rejuvenation)", "AI-Assisted Orthodontic Planning", "Silent Micro-Drills (Anxiety-free treatments)"].map((tech, i) => (
                <li key={i} className="flex items-start sm:items-center gap-3 text-slate-200 text-sm sm:text-base"><CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5 sm:mt-0" /><span>{tech}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-gradient-to-b from-[#FAFAFC] to-emerald-50/50 py-16 sm:py-24 sm:rounded-[3rem] sm:mx-6 lg:mx-12 overflow-hidden border border-slate-100/50 shadow-sm">
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">Patient Transmissions</h2>
           <p className="text-base sm:text-lg text-slate-600">Hear from those who have completed their journey with us.</p>
        </div>
        <TestimonialCarousel />
      </section>

       {/* FAQ Section */}
       <section className="px-4 sm:px-6 lg:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Mission Briefing</h2>
          <p className="text-base sm:text-lg text-slate-600">Common questions about launching your dental journey.</p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-emerald-100/50 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50/30 to-white hover:border-emerald-300 transition-colors shadow-sm hover:shadow-md">
              <button className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between font-bold text-emerald-950 focus:outline-none" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>{activeFaq === idx ? <Minus className="w-5 h-5 text-emerald-500 shrink-0" /> : <Plus className="w-5 h-5 text-emerald-300 shrink-0" />}
              </button>
              <div className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-48 pb-4 sm:pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-emerald-900/80 font-medium text-sm sm:text-base">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-10">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 text-center text-white shadow-2xl shadow-emerald-200 relative overflow-hidden border border-emerald-400">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 relative z-10 drop-shadow-md leading-tight">Ready to Shine Inside and Out?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-8 sm:mb-10 max-w-2xl mx-auto relative z-10 drop-shadow-sm leading-relaxed font-medium">Join thousands of satisfied passengers who have discovered the COSMO DENTAL difference. Your transformation awaits.</p>
          <Button variant="glass" onClick={() => navigateTo('booking')} className="relative z-10 bg-white text-emerald-600 hover:bg-slate-50 border-white font-bold px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg w-full sm:w-auto">Initiate Launch Sequence</Button>
        </div>
      </section>
    </div>
  );
};

// --- Additional Pages (With Breadcrumbs and Page Headers) ---

const AboutPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="Our Story" 
      subtitle="Pioneering the future of dentistry with compassion, advanced technology, and a commitment to your stellar smile." 
      icon={Info} 
      breadcrumbs={[{ label: 'About Us' }]}
      navigateTo={navigateTo}
      bgImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    />
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-16 mb-24">
      <div className="relative px-4 sm:px-0 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-emerald-100 rounded-[2rem] sm:rounded-[3rem] transform -rotate-3 scale-105 -z-10 group-hover:-rotate-6 transition-transform duration-700"></div>
        <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Clinic Interior" className="rounded-[2rem] sm:rounded-[3rem] shadow-xl w-full object-cover h-[400px] sm:h-[500px] group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">A New Era of Radiant Smiles & Unmatched Care!</h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">At COSMO DENTAL, we’re all about combining state-of-the-art technology with expert care to help you shine, inside and out. Whether you're looking to perfect your smile or restore function, we’ve got you covered with treatments that elevate your confidence to the next level.</p>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">We offer a full spectrum of dental services designed to bring out the best in you. Our advanced restorations, smile makeovers, and orthodontic care are tailored to give you a youthful, healthy glow with minimal effort.</p>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-bold text-emerald-700">Your smile deserves the best. And at COSMO DENTAL, we’re here to give it just that.</p>
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div><div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-2">15k+</div><div className="text-emerald-900 font-bold text-sm sm:text-base">Radiant Patients</div></div>
          <div><div className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-2">20+</div><div className="text-emerald-900 font-bold text-sm sm:text-base">Industry Awards</div></div>
        </div>
      </div>
    </section>
  </div>
);

const DoctorsPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="The COSMO Crew" 
      subtitle="Meet the elite navigators of health and aesthetics dedicated to perfecting your look." 
      icon={Users} 
      breadcrumbs={[{ label: 'Doctors' }]}
      navigateTo={navigateTo}
      bgImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    />
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-16">
      {doctorsData.map((doc, idx) => (
        <Card key={idx} className="flex flex-col items-center text-center !p-6 sm:!p-8 group hover:border-emerald-300 cursor-pointer bg-gradient-to-b from-emerald-50/50 to-white border-emerald-100" onClick={() => navigateTo('doctor-detail', doc)}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl shadow-emerald-500/20 group-hover:border-emerald-200 transition-colors">
            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">{doc.name}</h3>
          <p className="text-emerald-600 font-bold mb-4 text-sm sm:text-base">{doc.role}</p>
          <p className="text-slate-600 text-sm sm:text-base mb-8 line-clamp-3 flex-grow leading-relaxed font-medium">{doc.bio}</p>
          <Button variant="primary" className="w-full mt-auto">View Profile</Button>
        </Card>
      ))}
    </section>
  </div>
);

const DoctorDetailPage = ({ doctor, navigateTo }) => {
  if (!doctor) return <div className="pt-40 text-center"><Button onClick={() => navigateTo('doctors')}>Return to Doctors</Button></div>;
  
  return (
    <div className="pb-20 bg-slate-50/50">
      <PageHeader 
        title={doctor.name} 
        subtitle={doctor.specialty}
        breadcrumbs={[{ label: 'Doctors', action: () => navigateTo('doctors') }, { label: doctor.name }]}
        navigateTo={navigateTo}
        bgImage={doctor.img}
      />
      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Main Profile Layout */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* Sticky Left Sidebar */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-10"></div>
               
               {/* Doctor Image */}
               <div className="h-[300px] sm:h-[400px] w-full relative group">
                 <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white pr-6">
                    <h2 className="text-2xl font-bold drop-shadow-md leading-tight">{doctor.name}</h2>
                    <p className="text-emerald-300 font-medium drop-shadow-sm text-sm sm:text-base mt-1">{doctor.role}</p>
                 </div>
               </div>

               {/* Quick Stats & Booking */}
               <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center justify-center gap-1">
                        {doctor.rating} <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-bold">{doctor.reviews} Reviews</p>
                    </div>
                    <div className="w-px h-12 bg-slate-200"></div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900">15+</div>
                      <p className="text-xs sm:text-sm text-slate-500 font-bold">Years Exp.</p>
                    </div>
                  </div>
                  
                  <Button variant="primary" onClick={() => navigateTo('booking')} className="w-full py-4 text-base sm:text-lg">
                    Book Appointment
                  </Button>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-slate-100 shadow-sm"><Linkedin className="w-4 h-4" /></button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-slate-100 shadow-sm"><Twitter className="w-4 h-4" /></button>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border border-slate-100 shadow-sm"><Mail className="w-4 h-4" /></button>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* Quote Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20 hover:-translate-y-1 transition-transform duration-500 border border-emerald-400">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300 mb-4 sm:mb-6 opacity-80" />
              <p className="text-lg sm:text-2xl font-medium leading-relaxed mb-2 sm:mb-6 relative z-10">"{doctor.quote}"</p>
            </div>

            {/* About / Bio */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-500">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Info className="w-4 h-4 sm:w-5 sm:h-5"/></div>
                About {doctor.name}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">{doctor.bio}</p>
            </div>

            {/* Specializations & Credentials */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Star className="w-4 h-4 sm:w-5 sm:h-5"/></div>
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-bold">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Award className="w-4 h-4 sm:w-5 sm:h-5"/></div>
                  Credentials
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {doctor.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-xs sm:text-sm md:text-base font-bold">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Office Hours specific to Doctor */}
            <div className="bg-slate-900 rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
               <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3 relative z-10">
                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 shrink-0"><Clock className="w-4 h-4 sm:w-5 sm:h-5"/></div>
                 Consultation Hours
               </h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm relative z-10">
                 <div><p className="text-slate-400 mb-1">Mon - Wed</p><p className="font-bold text-white">8:00 AM - 5:00 PM</p></div>
                 <div><p className="text-slate-400 mb-1">Thursday</p><p className="font-bold text-white">9:00 AM - 6:00 PM</p></div>
                 <div><p className="text-slate-400 mb-1">Friday</p><p className="font-bold text-white">8:00 AM - 2:00 PM</p></div>
                 <div><p className="text-slate-400 mb-1">Weekend</p><p className="font-bold text-emerald-400">Surgery Only</p></div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="Our Services" 
      subtitle="Dedicated to Delivering Outstanding Dental Care. Explore our comprehensive treatment options." 
      icon={Moon} 
      breadcrumbs={[{ label: 'Services' }]}
      navigateTo={navigateTo}
      bgImage="https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    />
    
    {/* Featured Services Cards */}
    <div className="pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
      {servicesData.map((service, idx) => (
        <div key={idx} className={`group relative rounded-[2.5rem] p-8 sm:p-10 border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 ${service.cardBg} ${service.shadow}`}>
          <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-white`}></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20 ${service.bg}`}>
              <service.icon className={`w-8 h-8 ${service.color}`} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 transition-colors relative z-10 leading-tight drop-shadow-md">{service.title}</h3>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium">{service.desc}</p>
          <button 
            onClick={() => navigateTo('service-detail', service)} 
            className={`w-full py-4 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 relative z-10 ${service.btnBg}`}
          >
            Learn More <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      ))}
    </div>

    {/* Comprehensive Services Lists */}
    <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Comprehensive Dental Care</h2>
        <p className="text-base sm:text-lg text-slate-600">Explore the full spectrum of high-end treatments we provide for you and your family.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {comprehensiveCategories.map((category, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${category.bgClass} rounded-[2rem] p-6 sm:p-8 border hover:-translate-y-1 transition-all duration-300`}>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pb-3 sm:pb-4 border-b ${category.titleClass}`}>
              {category.title}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${category.iconClass} shrink-0 mt-0.5`} />
                  <span className="text-slate-800 font-bold text-sm sm:text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServiceDetailPage = ({ service, navigateTo }) => {
  if (!service) return <div className="pt-40 text-center"><Button onClick={() => navigateTo('services')}>Return to Services</Button></div>;
  return (
    <div className="pb-20">
      <PageHeader 
        title={service.title} 
        subtitle={service.desc}
        breadcrumbs={[{ label: 'Services', action: () => navigateTo('services') }, { label: service.title }]}
        navigateTo={navigateTo}
      />
      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20 -z-10 ${service.bg.replace('bg-white/20', service.hoverGlow)}`}></div>
          <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
            <div className="md:w-1/2 space-y-6">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg ${service.bg.replace('bg-white/20', 'bg-emerald-50 border border-emerald-100')}`}><service.icon className={`w-8 h-8 sm:w-10 sm:h-10 text-emerald-600`} /></div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">{service.title}</h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">{service.fullDesc}</p>
              <Button variant="primary" onClick={() => navigateTo('booking')} className="w-full mt-4 sm:mt-6 py-4 text-base sm:text-lg">Book Consultation</Button>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">The Process</h3>
              <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:ml-4 sm:before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                {service.process.map((step, i) => (
                  <div key={i} className="relative flex items-center gap-4 sm:gap-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-emerald-100 text-emerald-600 font-bold flex items-center justify-center z-10 shrink-0 shadow-sm text-sm sm:text-base">{i + 1}</div>
                    <div className="bg-slate-50 p-3 sm:p-4 rounded-xl flex-grow border border-slate-100"><p className="font-bold text-slate-800 text-sm sm:text-base">{step}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="Cosmic Logs" 
      subtitle="The latest news, tips, and technological breakthroughs from the COSMO DENTAL team." 
      icon={FileText} 
      breadcrumbs={[{ label: 'News' }]}
      navigateTo={navigateTo}
      bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    />
    <div className="pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsData.map((news) => (
        <Card key={news.id} className="!p-0 flex flex-col h-full group cursor-pointer bg-gradient-to-br from-white to-emerald-50/50 border-emerald-100 hover:border-emerald-300" hover={false}>
          <div className="relative h-48 sm:h-56 overflow-hidden" onClick={() => navigateTo('news-detail', news)}>
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
            <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600 z-20 shadow-sm border border-white">{news.category}</div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col flex-grow">
            <p className="text-xs sm:text-sm text-emerald-500 mb-3 font-bold uppercase tracking-wider">{news.date}</p>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight" onClick={() => navigateTo('news-detail', news)}>{news.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">{news.excerpt}</p>
            <button 
              onClick={() => navigateTo('news-detail', news)} 
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 mt-auto"
            >
              Read Article <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const NewsDetailPage = ({ news, navigateTo }) => {
  if (!news) return <div className="pt-40 text-center"><Button onClick={() => navigateTo('news')}>Return to News</Button></div>;
  return (
    <div className="pb-20">
      <PageHeader 
        title={news.title} 
        subtitle={`${news.date} • ${news.author}`}
        breadcrumbs={[{ label: 'News', action: () => navigateTo('news') }, { label: 'Article' }]}
        navigateTo={navigateTo}
        bgImage={news.img}
      />
      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-xl border border-slate-100">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-6 sm:mb-8">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {news.category}
           </div>
           <div className="prose prose-base sm:prose-lg prose-slate max-w-none">
             <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">{news.content}</p>
             <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">Innovation in this sector is moving faster than light. By staying updated with our cosmic logs, you can ensure that you are making the most informed decisions about your oral and aesthetic health.</p>
           </div>
           <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 flex items-center justify-between">
              <Button variant="outline" onClick={() => navigateTo('news')} className="flex gap-2 items-center text-sm sm:text-base"><ArrowLeft className="w-4 h-4" /> Back to Logs</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="Visual Orbit" 
      subtitle="Take a tour through our state-of-the-art clinic and see the smiles we've crafted." 
      icon={ImageIcon} 
      breadcrumbs={[{ label: 'Gallery' }]}
      navigateTo={navigateTo}
      bgImage="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    />
    <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {galleryImages.map((src, idx) => (
        <div key={idx} className="break-inside-avoid relative group rounded-[1.5rem] sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300 z-10"></div>
          <img src={src} alt={`Gallery Image ${idx + 1}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full text-white shadow-lg"><ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" /></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader 
      title="Open Comms" 
      subtitle="Ready to align your smile and enhance your glow? Reach out to our team, we are always on standby." 
      icon={MessageSquare} 
      breadcrumbs={[{ label: 'Contact' }]}
      navigateTo={navigateTo}
    />
    <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Base Station Coordinates</h2>
        
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-emerald-500/5 border border-emerald-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /></div>
          <div><h4 className="font-bold text-emerald-950 mb-1 text-sm sm:text-base">Location</h4><p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">Site No 40 & 41, 1st floor MPS Building,<br/>Ambedkar Nagar Mullur Sarjapur Road,<br/>Carmelram Bangalore, Karnataka - 560035 IN</p></div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-emerald-500/5 border border-emerald-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /></div>
          <div><h4 className="font-bold text-emerald-950 mb-1 text-sm sm:text-base">Direct Line</h4><p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">+91 9353555755<br/>+91 9353555855</p></div>
        </div>
        
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
           <h4 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 relative z-10"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400"/> Docking Hours</h4>
           <ul className="space-y-3 relative z-10 text-sm sm:text-base">
              <li className="flex justify-between border-b border-slate-800 pb-2"><span>Mon - Thu</span><span className="font-bold">8:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between border-b border-slate-800 pb-2"><span>Friday</span><span className="font-bold">8:00 AM - 4:00 PM</span></li>
              <li className="flex justify-between"><span>Weekend</span><span className="text-emerald-400 font-bold">By Appointment</span></li>
            </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-100 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full -z-10"></div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
        <form className="space-y-5 sm:space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Transmission Sent!"); }}>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Name</label><input required type="text" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none text-sm sm:text-base" placeholder="Jane Doe" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Email</label><input required type="email" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none text-sm sm:text-base" placeholder="jane@example.com" /></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Subject</label><select className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base"><option>General Inquiry</option><option>Book Appointment</option></select></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Message</label><textarea required rows="4" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none resize-none text-sm sm:text-base" placeholder="How can we help you today?"></textarea></div>
          <Button variant="primary" type="submit" className="w-full py-3.5 sm:py-4 text-base sm:text-lg">Transmit Message</Button>
        </form>
      </div>
    </div>
  </div>
);

const BookingPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setStep(3); }, 1500); };
  return (
    <div className="pb-20">
      <PageHeader 
        title="Schedule Orbit" 
        subtitle="Book your appointment to begin your journey to a stellar smile." 
        icon={Calendar} 
        breadcrumbs={[{ label: 'Booking' }]}
        navigateTo={navigateTo}
      />
      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto flex items-center">
        <div className="w-full bg-white/90 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-emerald-100/50 border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-bl-full opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-tr-full opacity-60 pointer-events-none"></div>
          <div className="p-6 sm:p-10 lg:p-16 relative z-10">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8 sm:mb-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Select Service</h2>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">What brings you in today?</p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {['Dental Implants', 'Invisalign / Braces', 'Smile Makeover', 'Root Canal / Pain', 'Laser Whitening', 'General Checkup'].map(type => (
                      <button key={type} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-100 text-left hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-sm focus:border-emerald-500 focus:bg-emerald-50 focus:ring-0 transition-all font-bold text-slate-700 text-sm sm:text-base">
                        {type}
                      </button>
                    ))}
                  </div>
                  <Button variant="primary" className="w-full py-3.5 sm:py-4 text-base sm:text-lg mt-6 sm:mt-8" onClick={() => setStep(2)}>Continue to Details <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /></Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-100">
                  <button onClick={() => setStep(1)} className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Passenger Details</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">First Name</label><input required type="text" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base" /></div>
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Last Name</label><input required type="text" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Email</label><input required type="email" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base" /></div>
                    <div><label className="block text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Phone</label><input required type="tel" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base" /></div>
                  </div>
                  <Button variant="primary" type="submit" className="w-full py-3.5 sm:py-4 text-base sm:text-lg mt-6" disabled={isSubmitting}>{isSubmitting ? 'Confirming...' : 'Confirm Appointment'}</Button>
                </form>
              </div>
            )}
            {step === 3 && (
              <div className="text-center animate-in zoom-in-95 duration-500 py-8 sm:py-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><Sparkles className="w-8 h-8 sm:w-10 sm:h-10" /></div>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Launch Sequence Initiated!</h2>
                <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto font-medium">Your coordinates are set. Check your email for details.</p>
                <Button onClick={() => navigateTo('home')} variant="outline">Return to Base</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Route Manager ---

export default function App() {
  const [route, setRoute] = useState({ page: 'home', item: null });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page, item = null) => {
    setRoute({ page, item });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'; return () => { document.body.style.overflow = 'unset'; } }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden flex flex-col">
      
      {/* Decorative Global Background */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-gradient-to-b from-emerald-50 via-teal-50/20 to-transparent rounded-full blur-[120px] -z-10 opacity-60 pointer-events-none"></div>

      {/* Navigation - Always visible correctly */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3 sm:py-4 border-b border-slate-100' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Newly Styled Logo specifically matching the reference image */}
          <div className="flex items-center gap-1.5 cursor-pointer group z-50" onClick={() => navigateTo('home')}>
            <span className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none -mt-1 group-hover:scale-110 transition-transform ${(!isScrolled && !mobileMenuOpen) ? 'text-emerald-400 drop-shadow-md' : 'text-emerald-600'}`}>5</span>
            <div className={`flex flex-col leading-none font-black tracking-widest ${(!isScrolled && !mobileMenuOpen) ? 'text-white drop-shadow-md' : 'text-emerald-800'}`}>
              <span className="text-sm sm:text-base">COSMO</span>
              <span className="text-sm sm:text-base">DENTAL</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-6 xl:gap-8 px-8 py-3.5 rounded-full transition-all duration-300 ${(!isScrolled) ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm' : 'bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-xl shadow-slate-900/10'}`}>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`font-bold text-sm xl:text-base transition-colors ${route.page === link.id ? 'text-white drop-shadow-sm' : 'text-slate-300 hover:text-white'}`}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 z-50">
            <Button variant="cosmic" className="hidden sm:flex shadow-emerald-200" onClick={() => navigateTo('booking')}>Book Now</Button>
            <button className={`lg:hidden p-2.5 rounded-xl border transition-colors ${(!isScrolled && !mobileMenuOpen) ? 'border-white/30 text-white bg-white/10 backdrop-blur-sm' : 'border-slate-200 text-slate-600 bg-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Dark Theme to match Desktop Pill */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-3xl pt-28 px-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto pb-10">
          <div className="flex flex-col gap-3 sm:gap-4 text-white">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`text-xl sm:text-2xl font-bold text-left py-3 border-b border-slate-800 ${route.page === link.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                {link.label}
              </button>
            ))}
            <div className="pt-6">
              <Button variant="cosmic" className="w-full py-4 text-base sm:text-lg rounded-2xl" onClick={() => navigateTo('booking')}>Book Appointment</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Routing */}
      <main className="relative flex-grow">
        {route.page === 'home' && <HomePage navigateTo={navigateTo} />}
        {route.page === 'about' && <AboutPage navigateTo={navigateTo} />}
        {route.page === 'services' && <ServicesPage navigateTo={navigateTo} />}
        {route.page === 'service-detail' && <ServiceDetailPage service={route.item} navigateTo={navigateTo} />}
        {route.page === 'doctors' && <DoctorsPage navigateTo={navigateTo} />}
        {route.page === 'doctor-detail' && <DoctorDetailPage doctor={route.item} navigateTo={navigateTo} />}
        {route.page === 'gallery' && <GalleryPage navigateTo={navigateTo} />}
        {route.page === 'news' && <NewsPage navigateTo={navigateTo} />}
        {route.page === 'news-detail' && <NewsDetailPage news={route.item} navigateTo={navigateTo} />}
        {route.page === 'contact' && <ContactPage navigateTo={navigateTo} />}
        {route.page === 'booking' && <BookingPage navigateTo={navigateTo} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 -z-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="space-y-6">
            
            {/* Dark Mode Footer Logo Match */}
            <div className="flex items-center gap-1.5 text-white cursor-pointer group w-max" onClick={() => navigateTo('home')}>
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 tracking-tighter leading-none -mt-1 group-hover:scale-110 transition-transform">5</span>
              <div className="flex flex-col leading-none font-black tracking-widest text-emerald-50">
                <span className="text-sm sm:text-base">COSMO</span>
                <span className="text-sm sm:text-base">DENTAL</span>
              </div>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-sm sm:text-base font-medium">Modern dentistry designed around you. We combine state-of-the-art technology with expert care to help you shine, inside and out.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4 sm:mb-6">Comms Channel</h4>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /> <span>+91 9353555755 <br className="sm:hidden" />/ +91 9353555855</span></p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-400 shrink-0" /> care@5sportshealth.com</p>
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> <span>Site No 40 & 41, 1st floor MPS Building, <br/>Ambedkar Nagar Mullur Sarjapur Road, <br/>Carmelram Bangalore, Karnataka - 560035 IN</span></p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4 sm:mb-6">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm sm:text-base font-medium">
              {['Home', 'About', 'Services', 'Doctors', 'Gallery'].map(link => (
                <button key={link} onClick={() => navigateTo(link.toLowerCase())} className="hover:text-emerald-300 transition-colors w-fit flex items-center gap-2 text-left">
                  <ChevronRight className="w-4 h-4 text-slate-600" /> {link}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4 sm:mb-6">Docking Hours</h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-slate-800 pb-2 sm:pb-3"><span>Mon - Thu</span><span className="text-white">8:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between border-b border-slate-800 pb-2 sm:pb-3"><span>Friday</span><span className="text-white">8:00 AM - 4:00 PM</span></li>
              <li className="flex justify-between pb-2"><span>Weekend</span><span className="text-emerald-400">By Appointment</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-10 sm:mt-16 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-bold">
          <p className="text-center md:text-left">&copy; 2026 COSMO DENTAL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}