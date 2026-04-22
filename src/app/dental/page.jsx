"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Sparkles, Calendar, Star, Phone, MapPin, Mail, ChevronRight, 
  ChevronLeft, Clock, ShieldCheck, Smile, Activity, Menu, X,
  Moon, Sun, Users, Microscope, Award, Quote, Plus, Minus, CheckCircle2,
  ArrowRight, Info, Image as ImageIcon, FileText, MessageSquare, Linkedin, 
  Twitter, ArrowLeft, HeartPulse, Shield, Zap, Home,
  Cpu, Camera, Laptop, Video, Crosshair, Tv, LayoutDashboard, 
  CalendarRange, HelpCircle, Trash2, Lock, LogOut, UploadCloud
} from 'lucide-react';

// --- Centralized Initial Data ---

const servicesData = [
  { id: 'dental-implants', title: "Dental Implants", desc: "Foundation for replacement teeth that look, feel, and function like natural teeth.", fullDesc: "Dental implants are changing the way people live. They are designed to provide a foundation for replacement teeth that look, feel, and function like natural teeth. The person who has lost teeth regains the ability to eat virtually anything and can smile with confidence.", price: "Custom Quote", icon: ShieldCheck, color: "text-teal-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-teal-400", cardBg: "bg-gradient-to-br from-teal-500 to-cyan-600 border-teal-400 text-white", btnBg: "bg-white text-teal-700 hover:bg-teal-50", shadow: "shadow-teal-500/20 hover:shadow-teal-500/40", process: ["Clinical Consultation & 3D Imaging", "Surgical Implant Placement", "Osseointegration (Healing)", "Prosthetic Crown Attachment"] },
  { id: 'invisalign', title: "Invisalign", desc: "Straighten teeth using custom-made clear braces that gently pull them into position.", fullDesc: "Invisalign is an orthodontic treatment that straightens teeth by using custom-made clear braces that cover your teeth and gently pull them into the proper position over time. Because they are clear and removable, they are far less noticeable and more convenient than traditional braces.", price: "From $2,500", icon: Star, color: "text-cyan-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-cyan-400", cardBg: "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white", btnBg: "bg-white text-cyan-700 hover:bg-cyan-50", shadow: "shadow-cyan-500/20 hover:shadow-cyan-500/40", process: ["Digital 3D Oral Scan", "Custom Aligner Fabrication", "Initial Clinical Fitting", "Progress Monitoring"] },
  { id: 'smile-makeover', title: "Smile Makeover", desc: "Cosmetic procedure that changes appearance and restores optimal dental function.", fullDesc: "Smile makeover is a cosmetic dental procedure that not only changes the appearance of your teeth, smile, or bite but also optimizes and restores your function. We combine multiple advanced treatments to give you the perfect, radiant smile you deserve.", price: "Consultation Free", icon: Sparkles, color: "text-amber-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-amber-400", cardBg: "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400 text-white", btnBg: "bg-white text-amber-700 hover:bg-amber-50", shadow: "shadow-amber-500/20 hover:shadow-amber-500/40", process: ["Aesthetic & Clinical Evaluation", "Digital Smile Design", "Preparatory Dental Treatments", "Final Restorations"] },
  { id: 'orthodontics', title: "Orthodontic Treatment", desc: "Address misaligned teeth early for perfect chewing, biting, and speaking.", fullDesc: "Address your child’s misaligned teeth as early as they can chew, bite and speak normally. For children’s and adult orthodontics, our expert team is here for you and your family, utilizing the latest in both traditional and invisible alignment technology.", price: "Consultation Free", icon: Smile, color: "text-blue-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-blue-400", cardBg: "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 text-white", btnBg: "bg-white text-blue-700 hover:bg-blue-50", shadow: "shadow-blue-500/20 hover:shadow-blue-500/40", process: ["Comprehensive Orthodontic Assessment", "Treatment Planning", "Appliance Placement", "Routine Clinical Adjustments"] },
  { id: 'root-canal', title: "Root Canal Treatment", desc: "Prevent tooth loss by removing infected tissue and sealing with biocompatible material.", fullDesc: "Root canal treatment is a procedure intended to prevent tooth loss and a widespread infection by removing the infected pulp tissue, cleaning and filling the canals with a biocompatible material. Our advanced techniques make this process practically painless.", price: "From $400", icon: Activity, color: "text-rose-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-rose-400", cardBg: "bg-gradient-to-br from-rose-500 to-pink-600 border-rose-400 text-white", btnBg: "bg-white text-rose-700 hover:bg-rose-50", shadow: "shadow-rose-500/20 hover:shadow-rose-500/40", process: ["Digital Radiography & Diagnosis", "Local Anesthesia Administration", "Endodontic Infection Removal", "Sealing & Crown Placement"] },
  { id: 'laser-whitening', title: "Laser Teeth Whitening", desc: "Lighten teeth to a brighter color using strong dental gel activated by a laser.", fullDesc: "Laser teeth whitening is a technique that lightens teeth to a whiter and brighter color with the use of a strong dental bleaching gel that is activated by a laser beam. Achieve a stellar, radiant smile in just a single one-hour visit.", price: "From $199", icon: Zap, color: "text-sky-50", bg: "bg-white/20 backdrop-blur-md", hoverGlow: "bg-sky-400", cardBg: "bg-gradient-to-br from-sky-500 to-cyan-600 border-sky-400 text-white", btnBg: "bg-white text-sky-700 hover:bg-sky-50", shadow: "shadow-sky-500/20 hover:shadow-sky-500/40", process: ["Clinical Shade Assessment", "Gingival Protection", "Laser Gel Application", "Final Enamel Polish"] }
];

const comprehensiveCategories = [
  { title: "General Dentistry", bgClass: "from-emerald-100 to-white border-emerald-200 shadow-emerald-500/10 hover:shadow-emerald-500/20", titleClass: "border-emerald-200 text-emerald-800", iconClass: "text-emerald-600", items: ["Comprehensive Oral Exams", "Routine Teeth Cleaning", "Deep Cleaning for Teeth & Gums", "Composite Fillings", "Dental Inlays & Onlays", "Periodical Care", "Preventive Dentistry", "Orthodontic Treatment", "Pediatric Dentistry Care", "Root Canal Treatment", "Tooth Extractions", "Wisdom Tooth Removal"] },
  { title: "Cosmetic Dentistry", bgClass: "from-amber-100 to-white border-amber-200 shadow-amber-500/10 hover:shadow-amber-500/20", titleClass: "border-amber-200 text-amber-800", iconClass: "text-amber-600", items: ["Invisalign Clear Aligners", "Complete Smile Makeovers", "Ceramic Veneers", "Laser Teeth Whitening", "Enamel Reshaping", "Dental Bonding", "Gummy Smile Correction"] },
  { title: "Restorative Dentistry", bgClass: "from-teal-100 to-white border-teal-200 shadow-teal-500/10 hover:shadow-teal-500/20", titleClass: "border-teal-200 text-teal-800", iconClass: "text-teal-600", items: ["Dental Crowns & Bridges", "Dental Implants", "Implant-Supported Crowns", "Removable Dentures", "Snap-On Dentures", "Fixed Dentures", "Full Mouth Rehabilitation", "All-On-Four Implants"] }
];

const initialDoctorsData = [
  { id: 'dr-poojitha-pasupuleti', name: "Dr. Poojitha Pasupuleti", role: "Resident Dental Surgeon", img: "https://images.unsplash.com/photo-1594824436998-ef22497d7681?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Poojitha is dedicated to providing comprehensive and compassionate routine dental care. With a focus on preventive dentistry, she ensures every patient maintains optimal oral health through meticulous diagnostics and patient education.", credentials: ["BDS", "Certified in Preventive Dentistry", "Advanced Diagnostics Training"], specialty: "General Dentistry", specializations: ["Routine Oral Care", "Preventive Dentistry", "Comprehensive Exams", "Composite Fillings"], rating: "4.8", reviews: 124, quote: "Preventive care today ensures a healthy, radiant smile for a lifetime." },
  { id: 'dr-anjali-raval', name: "Dr. Anjali Raval", role: "MDS - Prosthodontist & Implantologist", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Anjali specializes in restoring oral function and aesthetics. Her profound expertise in prosthodontics and implantology allows her to craft perfect, natural-looking replacements that seamlessly integrate with your smile.", credentials: ["MDS in Prosthodontics", "Certified Implantologist", "Specialist in Full-Mouth Restorations"], specialty: "Prosthodontics & Implants", specializations: ["Dental Implants", "Crowns & Bridges", "Removable/Fixed Dentures", "Full Mouth Rehabilitation"], rating: "4.9", reviews: 210, quote: "Restoring your smile is about restoring your confidence and overall quality of life." },
  { id: 'dr-prahlad-shenava', name: "Dr. Prahlad Shenava", role: "MDS - Orthodontist & Invisalign Specialist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Prahlad is passionate about the biomechanics of a perfect bite. Specializing in advanced clear aligners and traditional orthodontics, he crafts customized treatment trajectories that are highly efficient and transformative.", credentials: ["MDS in Orthodontics", "Certified Invisalign Specialist", "Expert in Craniofacial Biomechanics"], specialty: "Orthodontics", specializations: ["Invisalign Clear Aligners", "Traditional Braces", "Complex Bite Correction", "Adult Orthodontics"], rating: "5.0", reviews: 318, quote: "A perfectly aligned smile is the greatest foundation for lifelong oral health." },
  { id: 'dr-yogesh-reddy', name: "Dr. Yogesh Reddy", role: "MDS - Endodontist & Esthetic Dentist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Yogesh brings unparalleled precision to root canal therapies and cosmetic enhancements. His dual expertise ensures that saving a natural tooth also means keeping it looking flawless and structurally sound.", credentials: ["MDS in Endodontics", "Advanced Certification in Esthetic Dentistry", "Microscopic Endodontics Specialist"], specialty: "Endodontics & Esthetics", specializations: ["Painless Root Canals", "Smile Makeovers", "Porcelain Veneers", "Dental Trauma Management"], rating: "4.9", reviews: 185, quote: "Saving a tooth through precision endodontics is always our first priority." },
  { id: 'dr-swati-reddy', name: "Dr. Swati Reddy", role: "MDS - Pedodontist", img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Swati specializes in the unique dental needs of children. With a gentle, anxiety-free approach, she ensures early dental experiences are positive, laying the groundwork for a lifetime of excellent oral hygiene habits.", credentials: ["MDS in Pedodontics", "Specialist in Child Dental Care", "Certified in Conscious Sedation"], specialty: "Pediatric Dentistry", specializations: ["Child Preventive Care", "Early Interceptive Orthodontics", "Painless Milk Tooth Extractions", "Fluoride & Sealants"], rating: "5.0", reviews: 256, quote: "A child's positive early dental experience sets the tone for their future health." },
  { id: 'dr-ashish-sharma', name: "Dr. Ashish Sharma", role: "MDS - Periodontist & Implantologist", img: "https://images.unsplash.com/photo-1590611936760-eeb9bc50228d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Ashish is dedicated to the foundational health of your smile. Specializing in gum health and complex implantology, he utilizes advanced techniques to treat periodontal disease and provide secure, lasting bases for dental implants.", credentials: ["MDS in Periodontics", "Certified Implantologist", "Expert in Soft Tissue Grafting"], specialty: "Periodontics & Implants", specializations: ["Advanced Gum Therapy", "Dental Implants", "Bone & Tissue Grafting", "Laser Periodontics"], rating: "4.8", reviews: 142, quote: "Healthy gums are the essential foundation in which a beautiful smile can grow." },
  { id: 'dr-shameel-ahmed-shariff', name: "Dr. Shameel Ahmed Shariff", role: "MDS(OMFS) - Consultant OMFS & Implantologist", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Shameel specializes in complex oral and maxillofacial surgeries. From impacted wisdom teeth extractions to advanced reconstructive implantology, his extensive surgical training ensures safe, comfortable, and highly successful outcomes.", credentials: ["MDS in Oral & Maxillofacial Surgery", "Consultant OMFS", "Advanced Implantology Surgeon"], specialty: "Oral & Maxillofacial Surgery", specializations: ["Wisdom Tooth Removal", "Complex Maxillofacial Surgery", "Surgical Implant Placements", "Jaw Reconstruction"], rating: "4.9", reviews: 198, quote: "Surgical excellence is about combining technical mastery with utmost patient comfort." },
  { id: 'dr-prashant', name: "Dr. Prashant", role: "MDS - Endodontist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Prashant specializes in diagnosing and treating complex tooth pain and performing advanced root canal treatments. He is dedicated to saving natural teeth using the latest micro-endodontic technology, ensuring patients experience minimal discomfort and exceptional clinical results.", credentials: ["MDS in Endodontics", "Micro-Endodontics Specialist", "Expert in Pain Management"], specialty: "Endodontics", specializations: ["Painless Root Canal Therapy", "Endodontic Retreatment", "Dental Trauma Care", "Apicoectomy"], rating: "4.9", reviews: 165, quote: "Preserving your natural smile through painless, highly precise care is my ultimate goal." },
  { id: 'dr-zubair', name: "Dr. Zubair", role: "MDS - Oral Maxillofacial Surgeon", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", bio: "Dr. Zubair is a highly skilled Oral and Maxillofacial Surgeon with extensive clinical experience in surgical extractions, facial trauma, and complex implant procedures. He prioritizes patient safety, precise surgical planning, and rapid recovery in every intervention.", credentials: ["MDS in Oral & Maxillofacial Surgery", "Advanced Surgical Implantology", "Trauma & Reconstructive Surgery"], specialty: "Oral & Maxillofacial Surgery", specializations: ["Impacted Wisdom Tooth Extraction", "Advanced Dental Implants", "Maxillofacial Trauma", "Bone Grafting"], rating: "4.8", reviews: 182, quote: "Expert surgical care combined with a compassionate approach ensures the best possible recovery." }
];

const initialTestimonials = [
  { id: 1, text: "My experience with Cosmo Dental and Dr. Anjali and Dr. Pujita was extremely good. Both doctors were very helpful, patient, and professional. They took the time to understand my concerns and gave me the right advice with complete transparency. Their experience and expertise were clearly reflected in the way they handled my treatment. I truly appreciate their guidance and the comfortable environment they provided. I would highly recommend Cosmo Dental to anyone looking for quality dental care.", author: "Richa Likhyani", role: "Dental Patient", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" },
  { id: 2, text: "I had a wonderful experience with Dr Anjali, Dr Mallika, Dr Poojitha they treated me with so much care throughout my root canal procedure and made sure I was comfortable at every step. The treatment was smooth, gentle, and far less stressful than I expected. They made sure i was not having too much pain and helped calm my jittery nerves before the procedure. I truly appreciate her skill and kindness. Highly recommended!", author: "Vijay Sah", role: "Root Canal Patient", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80" },
  { id: 3, text: "Great Experience!! I went in for a root canal expecting the worst, but Dr. Poojitha completely changed that experience. She's exceptionally skilled, confident, and clearly knows her craft. The procedure was smooth, well explained, and surprisingly comfortable. Her calm demeanor and warm smile make a big difference — it's hard not to feel relaxed in her chair. When expertise meets such a pleasant presence, you know you're in great hands. Highly recommended", author: "Abhiram Chowdary", role: "Root Canal Patient", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&q=80" },
];

const initialFaqs = [
  { id: 1, q: "Do you accept dental and medical insurance?", a: "Yes, we accept a wide variety of major dental and medical insurance plans. Our clinical patient coordinators will help you maximize your health benefits during your visit." },
  { id: 2, q: "What should I expect on my first clinical visit?", a: "Your first visit includes a comprehensive oral evaluation, 3D mapping of your dental structure, and a customized treatment plan designed by our expert medical team to deliver optimal oral health." },
  { id: 3, q: "Is professional laser teeth whitening safe for my enamel?", a: "Absolutely. Our professional dental whitening procedures use advanced, safe light frequencies that lift surface stains without damaging the structural integrity of your enamel." },
  { id: 4, q: "Do these dental procedures require significant recovery time?", a: "At COSMO DENTAL, we prioritize state-of-the-art medical technology that provides maximum transformative clinical results with minimal to zero downtime, getting you back to your routine quickly." }
];

const initialAppointments = [
  { id: 101, name: "Alice Vanderbilt", email: "alice@example.com", phone: "9876543210", service: "Invisalign / Braces", date: "2026-04-24", status: "Confirmed" },
  { id: 102, name: "John Smith", email: "john.s@example.com", phone: "9123456789", service: "Dental Implants", date: "2026-04-25", status: "Pending" }
];

const initialNewsData = [
  { id: 1, title: "The Future of AI in Orthodontics", date: "April 12, 2026", author: "Dr. Prahlad Shenava", category: "Technology", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "How predictive modeling and 3D scanning are making treatments more precise than ever.", content: "Artificial Intelligence is no longer just a concept; it's a daily reality in modern dentistry. At COSMO DENTAL, we utilize AI-driven algorithms to map your oral cavity with microscopic precision. This allows us to predict how teeth will shift over time and tailor aligners perfectly. By integrating these systems, we deliver maximum clinical results with minimal chair time." },
  { id: 2, title: "Why Dental Implants are Changing Lives", date: "March 28, 2026", author: "Dr. Anjali Raval", category: "Treatments", img: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "Discover the unseen benefits of permanent replacements over traditional dentures.", content: "For decades, removable dentures were the only reliable path to restoring a full smile. Today, Dental Implants have changed the field. Made from medical-grade titanium, these posts fuse with your jawbone. The benefits aren't just aesthetic; they prevent bone loss, restore full chewing power, and never slip or click while you speak. It is a true, permanent return to function." },
  { id: 3, title: "Maintaining Your Oral Health Daily", date: "March 15, 2026", author: "Dr. Poojitha Pasupuleti", category: "Oral Health", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", excerpt: "Daily habits and modern tools to keep your enamel strong and your gums healthy.", content: "Keeping your smile stellar between clinical visits requires daily dedication. We recommend brushing twice daily using an ultrasonic toothbrush, which operates at frequencies high enough to disrupt plaque colonies even slightly beyond the bristles' reach. Flossing is non-negotiable; consider water flossers to clear interdental debris gently. Lastly, limit highly acidic and sugary foods which can erode enamel over time." },
];

const initialGalleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590664095641-7fa05f689813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// --- Shared UI Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform active:scale-95 font-heading tracking-wide";
  const sizeStyle = "px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-300",
    secondary: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    cosmic: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-lg shadow-emerald-300/50",
    glass: "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
  };
  return <button className={`${baseStyle} ${sizeStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '', hover = true }) => (
  <div className={`backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-md ${hover ? 'hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500' : ''} relative overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Breadcrumbs & Headers ---
const Breadcrumbs = ({ paths, navigateTo }) => (
  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-slate-300 mb-6 font-medium tracking-wide">
    <button onClick={() => navigateTo('home')} className="flex items-center gap-1 hover:text-white transition-colors"><Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Home</button>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
        {p.action ? <button onClick={p.action} className="hover:text-white transition-colors break-words">{p.label}</button> : <span className="text-white font-bold break-words">{p.label}</span>}
      </React.Fragment>
    ))}
  </div>
);

const PageHeader = ({ title, subtitle, icon: Icon, breadcrumbs, navigateTo, bgImage }) => (
  <div className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 w-full mx-auto text-center bg-slate-900 text-white overflow-hidden animate-in fade-in duration-700">
    {bgImage && <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105 animate-[pulse_20s_ease-in-out_infinite]" />}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900"></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      {breadcrumbs && <Breadcrumbs paths={breadcrumbs} navigateTo={navigateTo} />}
      {Icon && <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl shadow-emerald-900/50 mb-6 sm:mb-8"><Icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-300" /></div>}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight drop-shadow-lg leading-tight font-heading">{title}</h1>
      <p className="text-sm sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">{subtitle}</p>
    </div>
  </div>
);


// --- Public Site Components ---

const TestimonialCarousel = ({ testimonials }) => {
  const scrollRef = useRef(null);
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
                    {[...Array(Number(review.rating) || 5)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />)}
                  </div>
                  <p className="text-emerald-950 mb-6 sm:mb-8 italic text-sm sm:text-base leading-relaxed flex-grow font-medium">"{review.text}"</p>
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto border-t border-emerald-100/50 pt-4 sm:pt-6">
                    <img src={review.avatar || 'https://via.placeholder.com/150'} alt={review.author} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-200 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm sm:text-base font-heading">{review.author}</h4>
                      <p className="text-xs sm:text-sm text-emerald-600 font-bold uppercase tracking-wider">{review.role}</p>
                    </div>
                  </div>
               </Card>
            </div>
         ))}
       </div>
    </div>
  );
};

const DoctorsCarousel = ({ doctors, navigateTo }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth - 48 : 380;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group w-full">
       <div className="flex justify-end gap-3 mb-2 sm:mb-6">
          <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
       </div>
       <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
         {doctors.map((doc, idx) => (
            <div key={idx} className="w-[85vw] sm:w-[350px] snap-center sm:snap-start shrink-0 flex">
               <Card className="w-full flex flex-col items-center text-center !p-6 sm:!p-8 group bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden" hover={false}>
                  <div className="absolute top-0 left-0 w-full h-32 bg-emerald-50/50 -z-10"></div>
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl shadow-emerald-500/10 group-hover:border-emerald-100 transition-colors cursor-pointer shrink-0" onClick={() => navigateTo('doctor-detail', doc)}>
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors tracking-wide cursor-pointer line-clamp-1" onClick={() => navigateTo('doctor-detail', doc)}>{doc.name}</h3>
                  <p className="text-emerald-600 font-bold mb-4 text-[10px] uppercase tracking-[0.2em] line-clamp-1 min-h-[15px]">{doc.role}</p>
                  <p className="text-slate-600 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-medium">{doc.bio}</p>
                  <Button variant="primary" onClick={() => navigateTo('doctor-detail', doc)} className="w-full mt-auto tracking-[0.15em] uppercase text-[10px] sm:text-xs shadow-md shadow-emerald-500/20 shrink-0">View Profile</Button>
               </Card>
            </div>
         ))}
       </div>
    </div>
  );
};

const HeroSlider = ({ navigateTo }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const slides = [
    { id: 1, title: "Radiant Smiles", subtitle: "A New Era of", desc: "At COSMO DENTAL, the best dental clinic in Sarjapur road, we combine state-of-the-art medical technology with expert clinical care to help you achieve perfect oral health.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&w=2000&q=80", badge: "Premium Dental Care" },
    { id: 2, title: "Precision Implants", subtitle: "Restore Your Bite with", desc: "From advanced All-On-Four surgical implants to flawless ceramic crowns, we deliver maximum clinical results with minimal recovery time to elevate your confidence.", img: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?ixlib=rb-4.0.3&w=2000&q=80", badge: "Restorative Excellence" },
    { id: 3, title: "Ultimate Comfort", subtitle: "Painless Procedures &", desc: "Whether you're looking to perfect your smile with porcelain veneers or invisible aligners near Kodathi gate, our specialized dental team provides transformative solutions effortlessly.", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&w=2000&q=80", badge: "Anxiety-Free Clinic" }
  ];
  const nextSlide = useCallback(() => { setCurrent(p => (p === slides.length - 1 ? 0 : p + 1)); setProgress(0); }, [slides.length]);
  const prevSlide = () => { setCurrent(p => (p === 0 ? slides.length - 1 : p - 1)); setProgress(0); };

  useEffect(() => { const interval = setInterval(() => { setProgress(p => { if (p >= 100) { nextSlide(); return 0; } return p + 1.5; }); }, 50); return () => clearInterval(interval); }, [nextSlide]);

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
                      <Sparkles className="w-4 h-4 text-amber-300" /> <span className="uppercase tracking-widest">{slide.badge}</span>
                    </div>
                  </div>
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-xl tracking-tight">
                    <span className="block text-slate-200 font-light text-2xl sm:text-4xl lg:text-5xl mb-2 drop-shadow-md tracking-normal">{slide.subtitle}</span>
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

const BookingBanner = ({ navigateTo }) => (
  <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-10 pb-16">
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 text-center text-white shadow-2xl shadow-emerald-200 relative overflow-hidden border border-emerald-400">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 relative z-10 drop-shadow-md leading-tight tracking-tight">Experience the Best Dental Care on Sarjapur Road</h2>
      <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-8 sm:mb-10 max-w-2xl mx-auto relative z-10 drop-shadow-sm leading-relaxed font-medium">Join thousands of happy patients who have discovered the clinical excellence of COSMO DENTAL. Your comprehensive oral health transformation awaits.</p>
      <Button variant="glass" onClick={() => navigateTo('booking')} className="relative z-10 bg-white text-emerald-600 hover:bg-slate-50 border-white px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg w-full sm:w-auto tracking-wide">Book Your Consultation</Button>
    </div>
  </section>
);

const HomePage = ({ navigateTo, doctors, faqs, testimonials, gallery }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="space-y-20 sm:space-y-32 pb-20">
      <HeroSlider navigateTo={navigateTo} />

      {/* Trust / Stats Banner */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto -mt-24 sm:-mt-28 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full -z-10 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
            <div className="w-[72px] h-[72px] bg-emerald-100/50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-6"><Users className="w-8 h-8 stroke-[1.5]" /></div>
            <h3 className="font-heading text-[2.75rem] sm:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-none">15k<span className="text-emerald-500">+</span></h3>
            <p className="text-emerald-800 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] mt-1">Happy Patients</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full -z-10 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
            <div className="w-[72px] h-[72px] bg-amber-100/50 text-amber-500 rounded-[1.5rem] flex items-center justify-center mb-6"><Star className="w-8 h-8 fill-amber-500 stroke-amber-500 stroke-1" /></div>
            <h3 className="font-heading text-[2.75rem] sm:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-none">4.9<span className="text-3xl sm:text-4xl text-slate-400 font-bold">/5</span></h3>
            <p className="text-amber-800 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] mt-1">Average Rating</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-50 rounded-full -z-10 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
            <div className="w-[72px] h-[72px] bg-teal-100/50 text-teal-600 rounded-[1.5rem] flex items-center justify-center mb-6"><Award className="w-8 h-8 stroke-[1.5]" /></div>
            <h3 className="font-heading text-[2.75rem] sm:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-none">15<span className="text-teal-500">+</span></h3>
            <p className="text-teal-800 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] mt-1">Years Experience</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-widest"><Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> About Us</div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-6 leading-tight tracking-tight max-w-4xl">Welcome to Cosmodental — Your Trusted Cosmetic & Dental Care Partner</h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mb-6 max-w-4xl">At Cosmodental, we combine advanced dental science with aesthetic excellence to bring you comprehensive care for your smile and confidence. Our expert team is dedicated to delivering personalized treatments that focus on both your oral health and your natural beauty.</p>
        <p className="text-sm sm:text-base text-emerald-700 font-bold tracking-wider uppercase">Recognized as the Best Dental Clinic in Sarjapur Road, near Kodathi Gate</p>
      </section>

      {/* Our Technology */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-left max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-widest"><Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Our Technology</div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">Providing Top-Quality Care with Advanced Dental Technology and Equipment</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">We use the latest dental technology to provide faster, more accurate, and minimally invasive treatments. Our advanced tools ensure comfort, precision, and effective outcomes.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {[ { name: "Digital X-Rays", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100/50" }, { name: "Intra-Oral Cameras", icon: Camera, color: "text-teal-600", bg: "bg-teal-100/50" }, { name: "Intra-Oral Scanners", icon: Zap, color: "text-amber-600", bg: "bg-amber-100/50" }, { name: "Virtual Implant Planning", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-100/50" }, { name: "Digital Smile Design", icon: Smile, color: "text-purple-600", bg: "bg-purple-100/50" }, { name: "Dental Laser", icon: Sparkles, color: "text-rose-600", bg: "bg-rose-100/50" }, { name: "Design Workstations", icon: Laptop, color: "text-indigo-600", bg: "bg-indigo-100/50" }, { name: "Virtual Consultation", icon: Video, color: "text-sky-600", bg: "bg-sky-100/50" }, { name: "Guided Implant Surgery", icon: Crosshair, color: "text-emerald-600", bg: "bg-emerald-100/50" }, { name: "42\" 4K TV Screens", subtitle: "For Patient Education", icon: Tv, color: "text-slate-600", bg: "bg-slate-100/50" } ].map((tech, idx) => (
            <div key={idx} className="bg-white rounded-[1.5rem] p-5 sm:p-6 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 group">
               <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center mb-4 ${tech.bg} ${tech.color} group-hover:scale-110 transition-transform duration-300`}><tech.icon className="w-6 h-6 stroke-[1.5]" /></div>
               <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug">{tech.name}</h3>
               {tech.subtitle && <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 font-bold uppercase tracking-wider">{tech.subtitle}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Delivering Outstanding Care</h2>
            <p className="text-base sm:text-lg text-slate-600">Your oral health deserves the best. Discover the comprehensive clinical treatments we provide.</p>
          </div>
          <Button variant="outline" onClick={() => navigateTo('services')} className="hidden sm:flex bg-white tracking-widest text-sm uppercase">View All Services</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <div key={idx} className={`group relative rounded-[2.5rem] p-8 sm:p-10 border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 ${service.cardBg} ${service.shadow}`}>
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-white`}></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20 ${service.bg}`}><service.icon className={`w-8 h-8 ${service.color}`} /></div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 transition-colors relative z-10 leading-tight drop-shadow-md">{service.title}</h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium">{service.desc}</p>
              <button onClick={() => navigateTo('service-detail', service)} className={`w-full py-4 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 relative z-10 font-heading tracking-wide ${service.btnBg}`}>Learn More <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></button>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:hidden"><Button variant="outline" onClick={() => navigateTo('services')} className="w-full bg-white tracking-widest text-sm uppercase">View All Services</Button></div>
      </section>

      {/* Doctors Carousel Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-4 sm:mb-8">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Our Medical Experts</h2>
            <p className="text-base sm:text-lg text-slate-600">Our team of specialized and expert doctors is dedicated to delivering top-tier dental care.</p>
          </div>
          <Button variant="outline" onClick={() => navigateTo('doctors')} className="hidden sm:flex bg-white tracking-widest text-sm uppercase">View All Doctors</Button>
        </div>
        <DoctorsCarousel doctors={doctors} navigateTo={navigateTo} />
        <div className="mt-4 sm:hidden">
          <Button variant="outline" onClick={() => navigateTo('doctors')} className="w-full bg-white tracking-widest text-sm uppercase">View All Doctors</Button>
        </div>
      </section>

      {/* Clinic Gallery Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Clinic Gallery</h2>
            <p className="text-base sm:text-lg text-slate-600">Take a tour through our state-of-the-art medical facility near Kodathi gate.</p>
          </div>
          <Button variant="outline" onClick={() => navigateTo('gallery')} className="hidden sm:flex bg-white tracking-widest text-sm uppercase">View Full Gallery</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {gallery.slice(0, 4).map((src, idx) => (
            <div key={idx} className="relative group rounded-[1.5rem] overflow-hidden cursor-pointer shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 aspect-square" onClick={() => navigateTo('gallery')}>
              <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300 z-10"></div>
              <img src={src} alt={`Gallery Preview ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl text-emerald-600 shadow-lg"><ImageIcon className="w-6 h-6" /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Button variant="outline" onClick={() => navigateTo('gallery')} className="w-full bg-white tracking-widest text-sm uppercase">View Full Gallery</Button>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="bg-slate-900 text-white py-20 sm:py-32 relative overflow-hidden sm:rounded-[3rem] sm:mx-6 lg:mx-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative px-4 sm:px-0 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 rounded-[2rem] sm:rounded-[3rem] transform rotate-3 sm:rotate-6 scale-105 blur-xl -z-10 group-hover:rotate-12 transition-transform duration-700"></div>
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&w=1000&q=80" alt="Dental Technology" className="rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl w-full object-cover relative z-10" />
          </div>
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase"><Microscope className="w-4 h-4" /><span>State-of-the-Art Medical Technology</span></div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">Advanced Clinical Care for <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Maximum Results.</span></h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">We've equipped our clinic near Kodathi gate with the most advanced medical and dental technology. From surgical laser therapies to 3D oral mapping, your healthcare is faster, safer, and remarkably precise.</p>
            <ul className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              {["3D Oral Scanners (No messy clinical impressions)", "Advanced Laser Therapies (Painless gum treatments)", "AI-Assisted Orthodontic Treatment Planning", "Silent Micro-Drills (Anxiety-free dental treatments)"].map((tech, i) => (
                <li key={i} className="flex items-start sm:items-center gap-3 text-slate-200 text-sm sm:text-base font-medium"><CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5 sm:mt-0" /><span>{tech}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-[#FAFAFC] to-emerald-50/50 py-16 sm:py-24 sm:rounded-[3rem] sm:mx-6 lg:mx-12 overflow-hidden border border-slate-100/50 shadow-sm">
        <div className="text-left mb-8 sm:mb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
           <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">Patient Reviews</h2>
           <p className="text-base sm:text-lg text-slate-600">Hear from patients who have completed their dental care journey with us.</p>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

       {/* FAQs */}
       <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
        <div className="text-left">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Patient FAQs</h2>
          <p className="text-base sm:text-lg text-slate-600">Common medical questions about beginning your dental treatment.</p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-emerald-100/50 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50/30 to-white hover:border-emerald-300 transition-colors shadow-sm hover:shadow-md">
              <button className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between font-bold text-emerald-950 focus:outline-none" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span className="font-heading text-sm sm:text-base pr-4 tracking-wide">{faq.q}</span>{activeFaq === idx ? <Minus className="w-5 h-5 text-emerald-500 shrink-0" /> : <Plus className="w-5 h-5 text-emerald-300 shrink-0" />}
              </button>
              <div className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-48 pb-4 sm:pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-emerald-900/80 font-medium text-sm sm:text-base leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ... Additional Public Pages ...

const AboutPage = ({ navigateTo }) => (
  <div className="pb-20">
    <PageHeader title="Our Clinical Excellence" subtitle="Pioneering the future of dentistry with compassion, advanced medical technology, and a commitment to your complete oral health." icon={Info} breadcrumbs={[{ label: 'About Us' }]} navigateTo={navigateTo} bgImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-16 mb-24">
      <div className="relative px-4 sm:px-0 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-emerald-100 rounded-[2rem] sm:rounded-[3rem] transform -rotate-3 scale-105 -z-10 group-hover:-rotate-6 transition-transform duration-700"></div>
        <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Clinic Interior" className="rounded-[2rem] sm:rounded-[3rem] shadow-xl w-full object-cover h-[400px] sm:h-[500px] group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="space-y-6">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">The Best Dental Clinic in Sarjapur Road!</h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">Located conveniently near Kodathi gate, COSMO DENTAL represents a new era in advanced healthcare. We combine state-of-the-art medical technology with specialized clinical care to help you achieve optimum oral hygiene. Whether you're looking to maintain your dental health or require complex surgical intervention, we provide comprehensive treatments under one roof.</p>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">Our multidisciplinary team includes endodontists, orthodontists, and oral surgeons who collaborate to deliver a full spectrum of dental services. From early pediatric interventions to full-mouth rehabilitations, our clinical protocols are designed to ensure your lasting health and comfort.</p>
        <p className="font-heading text-base sm:text-lg leading-relaxed font-bold text-emerald-700 tracking-wide">Trust your smile to the leading medical professionals on Sarjapur Road.</p>
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div><div className="font-heading text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-2">15k+</div><div className="text-emerald-900 font-bold text-sm sm:text-base uppercase tracking-wider">Happy Patients</div></div>
          <div><div className="font-heading text-3xl sm:text-4xl font-extrabold text-teal-600 mb-2">20+</div><div className="text-emerald-900 font-bold text-sm sm:text-base uppercase tracking-wider">Clinical Awards</div></div>
        </div>
      </div>
    </section>
  </div>
);

const DoctorsPage = ({ doctors, navigateTo }) => (
  <div className="pb-20">
    <PageHeader title="Our Specialized Doctors" subtitle="Our team of specialized and expert doctors is dedicated to delivering top-tier dental care. Whether it’s routine care or complex procedures, you can trust our professionals for personalized, precise treatment." icon={Users} breadcrumbs={[{ label: 'Doctors' }]} navigateTo={navigateTo} bgImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-16">
      {doctors.map((doc, idx) => (
        <Card key={idx} className="flex flex-col items-center text-center !p-6 sm:!p-8 group bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden" hover={false}>
          <div className="absolute top-0 left-0 w-full h-32 bg-emerald-50/50 -z-10"></div>
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl shadow-emerald-500/10 group-hover:border-emerald-100 transition-colors cursor-pointer shrink-0" onClick={() => navigateTo('doctor-detail', doc)}><img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors tracking-wide cursor-pointer" onClick={() => navigateTo('doctor-detail', doc)}>{doc.name}</h3>
          <p className="text-emerald-600 font-bold mb-4 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{doc.role}</p>
          <p className="text-slate-600 text-sm sm:text-base mb-8 line-clamp-3 flex-grow leading-relaxed font-medium">{doc.bio}</p>
          <Button variant="primary" onClick={() => navigateTo('doctor-detail', doc)} className="w-full mt-auto tracking-[0.15em] uppercase text-xs shadow-md shadow-emerald-500/20">View Profile</Button>
        </Card>
      ))}
    </section>
  </div>
);

const DoctorDetailPage = ({ doctor, navigateTo }) => {
  if (!doctor) return <div className="pt-40 text-center"><Button onClick={() => navigateTo('doctors')}>Return to Doctors</Button></div>;
  return (
    <div className="pb-20 bg-[#FAFAFC]">
      <PageHeader title={doctor.name} subtitle={doctor.specialty} breadcrumbs={[{ label: 'Doctors', action: () => navigateTo('doctors') }, { label: doctor.name }]} navigateTo={navigateTo} bgImage={doctor.img} />
      <div className="pt-8 sm:pt-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button onClick={() => navigateTo('doctors')} className="flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:text-emerald-700 transition-colors tracking-[0.15em] uppercase text-xs sm:text-sm"><ArrowLeft className="w-4 h-4" /> Back to All Doctors</button>
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
               <div className="h-[350px] sm:h-[450px] w-full relative group">
                 <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white pr-6"><h2 className="font-heading text-3xl sm:text-4xl font-bold drop-shadow-md leading-tight tracking-tight">{doctor.name}</h2><p className="text-emerald-300 font-bold uppercase tracking-[0.15em] drop-shadow-sm text-[10px] sm:text-xs mt-2">{doctor.role}</p></div>
               </div>
               <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-50">
                    <div className="text-center"><div className="font-heading text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-1 tracking-tight">{doctor.rating} <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" /></div><p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Reviews</p></div>
                    <div className="w-px h-10 bg-slate-100"></div>
                    <div className="text-center"><div className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">15+</div><p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Years Exp.</p></div>
                  </div>
                  <Button variant="primary" onClick={() => navigateTo('booking')} className="w-full py-4 text-sm sm:text-base tracking-[0.15em] uppercase shadow-md shadow-emerald-500/20">Book Appointment</Button>
               </div>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20 border border-emerald-400">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300 mb-4 sm:mb-6 opacity-80" />
              <p className="font-heading text-lg sm:text-2xl font-medium leading-relaxed mb-2 sm:mb-6 relative z-10 tracking-wide">"{doctor.quote}"</p>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-4 tracking-tight"><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Info className="w-5 h-5 sm:w-6 sm:h-6"/></div>About {doctor.name}</h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">{doctor.bio}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-4 tracking-tight"><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Star className="w-5 h-5 sm:w-6 sm:h-6"/></div>Specializations</h3>
                <div className="flex flex-wrap gap-2">{doctor.specializations?.map((spec, i) => <span key={i} className="px-4 py-2 bg-emerald-50/80 border border-emerald-100 text-emerald-800 rounded-xl text-xs sm:text-sm font-bold tracking-wide">{spec}</span>)}</div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-4 tracking-tight"><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Award className="w-5 h-5 sm:w-6 sm:h-6"/></div>Credentials</h3>
                <ul className="space-y-4">{doctor.credentials?.map((cred, i) => <li key={i} className="flex items-start gap-3 text-slate-600 text-xs sm:text-sm md:text-base font-bold"><CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-0.5" /><span className="leading-relaxed">{cred}</span></li>)}</ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
               <h3 className="font-heading text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-4 relative z-10 tracking-tight"><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0"><Clock className="w-5 h-5 sm:w-6 sm:h-6"/></div>Consultation Hours</h3>
               <div className="grid grid-cols-2 gap-6 sm:gap-8 text-xs sm:text-sm relative z-10">
                 <div><p className="text-slate-400 mb-1.5 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Mon - Sat</p><p className="font-bold text-white tracking-wide">9:00 AM - 9:00 PM</p></div>
                 <div><p className="text-slate-400 mb-1.5 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Sunday</p><p className="font-bold text-emerald-400 tracking-wide mt-2">Closed</p></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = ({ news, navigateTo }) => (
  <div className="pb-20">
    <PageHeader title="Dental Health Blog" subtitle="The latest clinical insights, oral hygiene tips, and technological breakthroughs from our medical team." icon={FileText} breadcrumbs={[{ label: 'News' }]} navigateTo={navigateTo} bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
    <div className="pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item) => (
        <Card key={item.id} className="!p-0 flex flex-col h-full group cursor-pointer bg-gradient-to-br from-white to-emerald-50/50 border-emerald-100 hover:border-emerald-300" hover={false}>
          <div className="relative h-48 sm:h-56 overflow-hidden" onClick={() => navigateTo('news-detail', item)}>
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-600 z-20 shadow-sm border border-white">{item.category}</div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col flex-grow">
            <p className="text-[10px] sm:text-xs text-emerald-500 mb-3 font-extrabold uppercase tracking-widest">{item.date}</p>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight tracking-wide" onClick={() => navigateTo('news-detail', item)}>{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">{item.excerpt}</p>
            <button onClick={() => navigateTo('news-detail', item)} className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 mt-auto font-heading tracking-widest uppercase">Read Article <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" /></button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const NewsDetailPage = ({ news, navigateTo }) => {
  if (!news) return <div className="pt-40 text-center"><Button onClick={() => navigateTo('news')}>Return to Blog</Button></div>;
  return (
    <div className="pb-20">
      <PageHeader title={news.title} subtitle={`${news.date} • ${news.author}`} breadcrumbs={[{ label: 'News', action: () => navigateTo('news') }, { label: 'Article' }]} navigateTo={navigateTo} bgImage={news.img} />
      <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-xl border border-slate-100">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-6 sm:mb-8 uppercase tracking-widest"><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {news.category}</div>
           <div className="prose prose-base sm:prose-lg prose-slate max-w-none">
             <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">{news.content}</p>
             <p className="text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">Medical innovation in this sector is advancing rapidly. By staying updated with our clinical blog, you can ensure that you are making the most informed decisions about your oral health and aesthetic goals at our Sarjapur road clinic.</p>
           </div>
           <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 flex items-center justify-between">
              <Button variant="outline" onClick={() => navigateTo('news')} className="flex gap-2 items-center text-xs sm:text-sm tracking-widest uppercase"><ArrowLeft className="w-4 h-4" /> Back to Blog</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = ({ gallery, navigateTo }) => (
  <div className="pb-20">
    <PageHeader title="Clinic Gallery" subtitle="Take a tour through our state-of-the-art medical facility near Kodathi gate and see the smiles we've crafted." icon={ImageIcon} breadcrumbs={[{ label: 'Gallery' }]} navigateTo={navigateTo} bgImage="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
    <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {gallery.map((src, idx) => (
        <div key={idx} className="break-inside-avoid relative group rounded-[1.5rem] sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300 z-10"></div>
          <img src={src} alt={`Clinical Facility Image ${idx + 1}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
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
    <PageHeader title="Contact Our Clinic" subtitle="Ready to align your smile and enhance your oral health? Reach out to our clinical team, we are always here to help." icon={MessageSquare} breadcrumbs={[{ label: 'Contact' }]} navigateTo={navigateTo} />
    <div className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">Clinic Location</h2>
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-emerald-500/5 border border-emerald-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /></div>
          <div><h4 className="font-heading font-bold text-emerald-950 mb-1 text-sm sm:text-base tracking-wide">Address</h4><p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">Sarjapur Main Rd, Ambedkar Nagar,<br/>Chikkabellandur,<br/>Bengaluru, Karnataka 560035</p></div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-emerald-500/5 border border-emerald-100 flex items-start gap-4 hover:shadow-xl transition-shadow">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /></div>
          <div><h4 className="font-heading font-bold text-emerald-950 mb-1 text-sm sm:text-base tracking-wide">Direct Line</h4><p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">063620 40923</p></div>
        </div>
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
           <h4 className="font-heading font-bold text-base sm:text-lg mb-4 flex items-center gap-2 relative z-10 tracking-wide"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400"/> Clinic Timings</h4>
           <ul className="space-y-3 relative z-10 text-sm sm:text-base">
              <li className="flex justify-between border-b border-slate-800 pb-2"><span>Mon - Sat</span><span className="font-bold">9:00 AM - 9:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-emerald-400 font-bold">Closed</span></li>
            </ul>
        </div>
      </div>
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-100 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full -z-10"></div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">Send a Message</h3>
        <form className="space-y-5 sm:space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Transmission Sent!"); }}>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div><label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Name</label><input required type="text" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none text-sm sm:text-base font-medium" placeholder="Jane Doe" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Email</label><input required type="email" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none text-sm sm:text-base font-medium" placeholder="jane@example.com" /></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Subject</label><select className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-white text-sm sm:text-base font-medium"><option>General Medical Inquiry</option><option>Book Appointment</option></select></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-widest">Message</label><textarea required rows="4" className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none resize-none text-sm sm:text-base font-medium" placeholder="How can we help you today?"></textarea></div>
          <Button variant="primary" type="submit" className="w-full py-3.5 sm:py-4 text-sm sm:text-base uppercase tracking-widest">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);


// --- ADMIN LOGIN & DASHBOARD ---

const AdminLoginPage = ({ onLogin, navigateTo }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-12 relative">
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100/50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 stroke-[1.5]" /></div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Authorized personnel only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 text-center uppercase tracking-wide">{error}</div>}
          <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Username</label><input required type="text" value={credentials.username} onChange={e=>setCredentials({...credentials, username: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-slate-50 text-sm font-medium" placeholder="Enter username" /></div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Password</label><input required type="password" value={credentials.password} onChange={e=>setCredentials({...credentials, password: e.target.value})} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 outline-none bg-slate-50 text-sm font-medium" placeholder="Enter password" /></div>
          <Button variant="primary" type="submit" className="w-full py-4 uppercase tracking-widest text-sm mt-2 shadow-md shadow-emerald-500/20">Secure Login</Button>
        </form>
        <button onClick={() => navigateTo('home')} className="w-full text-center mt-6 text-xs font-bold text-slate-400 hover:text-emerald-600 tracking-widest uppercase transition-colors">&larr; Back to Public Site</button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ navigateTo, onLogout, doctors, setDoctors, faqs, setFaqs, testimonials, setTestimonials, appointments, news, setNews, gallery, setGallery }) => {
  const [activeTab, setActiveTab] = useState('appointments');

  const [newDoc, setNewDoc] = useState({ name: '', role: '', img: '', bio: '', credentials: '', specializations: '', quote: '' });
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [newTestimonial, setNewTestimonial] = useState({ text: '', author: '', role: '', rating: '5' });
  const [newNewsItem, setNewNewsItem] = useState({ title: '', author: '', category: 'Treatments', img: '', excerpt: '', content: '' });

  // File Upload Handlers (Converts image to Base64 to display instantly)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = (e) => {
    handleImageUpload(e, (base64) => {
      setGallery([base64, ...gallery]);
      alert("Gallery Image Uploaded Successfully");
    });
  };

  // Submit Handlers
  const handleAddDoctor = (e) => {
    e.preventDefault();
    if(!newDoc.img) return alert("Please upload a doctor image.");
    const docToAdd = { 
      ...newDoc, 
      id: `dr-${newDoc.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      credentials: newDoc.credentials.split(',').map(s => s.trim()),
      specializations: newDoc.specializations.split(',').map(s => s.trim()),
      rating: "5.0", reviews: 0
    };
    setDoctors([docToAdd, ...doctors]);
    setNewDoc({ name: '', role: '', img: '', bio: '', credentials: '', specializations: '', quote: '' });
    alert("Doctor Added Successfully");
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if(!newNewsItem.img) return alert("Please upload a blog cover image.");
    const newsToAdd = {
      ...newNewsItem,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setNews([newsToAdd, ...news]);
    setNewNewsItem({ title: '', author: '', category: 'Treatments', img: '', excerpt: '', content: '' });
    alert("News Article Published Successfully");
  };

  const handleAddFaq = (e) => {
    e.preventDefault();
    setFaqs([{ id: Date.now(), ...newFaq }, ...faqs]);
    setNewFaq({ q: '', a: '' });
    alert("FAQ Added Successfully");
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    setTestimonials([{ id: Date.now(), ...newTestimonial, avatar: 'https://via.placeholder.com/150' }, ...testimonials]);
    setNewTestimonial({ text: '', author: '', role: '', rating: '5' });
    alert("Testimonial Added Successfully");
  };

  const handleDelete = (type, id) => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      if (type === 'doc') setDoctors(doctors.filter(d => d.id !== id));
      if (type === 'faq') setFaqs(faqs.filter(f => f.id !== id));
      if (type === 'test') setTestimonials(testimonials.filter(t => t.id !== id));
      if (type === 'news') setNews(news.filter(n => n.id !== id));
      if (type === 'gallery') setGallery(gallery.filter((_, index) => index !== id));
    }
  };

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: CalendarRange },
    { id: 'doctors', label: 'Manage Doctors', icon: Users },
    { id: 'news', label: 'Manage News', icon: FileText },
    { id: 'gallery', label: 'Clinic Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'faqs', label: 'Manage FAQs', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"><LayoutDashboard className="w-6 h-6" /></div>
            <div><h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1><p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Clinic Management System</p></div>
          </div>
          <Button variant="danger" onClick={() => { onLogout(); navigateTo('home'); }} className="gap-2 text-xs uppercase tracking-widest"><LogOut className="w-4 h-4" /> Logout</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-64 bg-white rounded-[2rem] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 p-4 shrink-0">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-sm tracking-wide transition-all mb-2 last:mb-0 ${activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'}`} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow w-full bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-10">
            
            {activeTab === 'appointments' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Recent Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest border-b border-slate-200">
                        <th className="p-4 font-bold">Patient Name</th><th className="p-4 font-bold">Contact</th><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">Date</th><th className="p-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                      {appointments.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">No appointments found.</td></tr>
                      ) : (
                        appointments.map(appt => (
                          <tr key={appt.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-slate-900 font-bold">{appt.name}</td>
                            <td className="p-4 text-slate-600">{appt.phone}<br/><span className="text-xs text-slate-400">{appt.email}</span></td>
                            <td className="p-4 text-emerald-700 font-bold">{appt.service}</td>
                            <td className="p-4 text-slate-600">{appt.date}</td>
                            <td className="p-4"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{appt.status}</span></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="animate-in fade-in duration-500 space-y-10">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Add New Doctor</h2>
                  <form onSubmit={handleAddDoctor} className="bg-slate-50 p-6 rounded-[1.5rem] space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Name</label><input required value={newDoc.name} onChange={e=>setNewDoc({...newDoc, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" placeholder="Dr. Jane Doe" /></div>
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Designation/Role</label><input required value={newDoc.role} onChange={e=>setNewDoc({...newDoc, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" placeholder="MDS - Endodontist" /></div>
                    </div>
                    
                    {/* Custom Image File Upload */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Doctor Photo (Upload)</label>
                      <div className="flex items-center gap-4">
                        {newDoc.img && <img src={newDoc.img} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-emerald-200 shadow-sm shrink-0" />}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => setNewDoc({...newDoc, img: base64}))} className="w-full file:cursor-pointer file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all text-sm text-slate-500 outline-none" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Credentials (Comma separated)</label><input required value={newDoc.credentials} onChange={e=>setNewDoc({...newDoc, credentials: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" placeholder="BDS, MDS..." /></div>
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Specializations (Comma separated)</label><input required value={newDoc.specializations} onChange={e=>setNewDoc({...newDoc, specializations: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" placeholder="Root Canal, Implants..." /></div>
                    </div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Bio</label><textarea required value={newDoc.bio} onChange={e=>setNewDoc({...newDoc, bio: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" rows="3"></textarea></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Quote</label><input required value={newDoc.quote} onChange={e=>setNewDoc({...newDoc, quote: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" /></div>
                    <Button type="submit" className="uppercase tracking-widest text-xs">Save Doctor</Button>
                  </form>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Existing Doctors</h2>
                  <div className="space-y-4">
                    {doctors.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                          <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                          <div><h4 className="font-bold text-slate-900">{doc.name}</h4><p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{doc.role}</p></div>
                        </div>
                        <button onClick={() => handleDelete('doc', doc.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="animate-in fade-in duration-500 space-y-10">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Publish News Article</h2>
                  <form onSubmit={handleAddNews} className="bg-slate-50 p-6 rounded-[1.5rem] space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Title</label><input required value={newNewsItem.title} onChange={e=>setNewNewsItem({...newNewsItem, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" /></div>
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Category</label><select required value={newNewsItem.category} onChange={e=>setNewNewsItem({...newNewsItem, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none bg-white"><option>Technology</option><option>Treatments</option><option>Oral Health</option><option>Clinic News</option></select></div>
                    </div>
                    
                    {/* Custom Image File Upload */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Article Cover Image (Upload)</label>
                      <div className="flex items-center gap-4">
                        {newNewsItem.img && <img src={newNewsItem.img} alt="Preview" className="w-20 h-14 rounded-lg object-cover border border-emerald-200 shadow-sm shrink-0" />}
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (base64) => setNewNewsItem({...newNewsItem, img: base64}))} className="w-full file:cursor-pointer file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all text-sm text-slate-500 outline-none" />
                      </div>
                    </div>

                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Author Name</label><input required value={newNewsItem.author} onChange={e=>setNewNewsItem({...newNewsItem, author: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Short Excerpt</label><textarea required value={newNewsItem.excerpt} onChange={e=>setNewNewsItem({...newNewsItem, excerpt: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" rows="2"></textarea></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Full Content</label><textarea required value={newNewsItem.content} onChange={e=>setNewNewsItem({...newNewsItem, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" rows="4"></textarea></div>
                    <Button type="submit" className="uppercase tracking-widest text-xs">Publish Article</Button>
                  </form>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Published Articles</h2>
                  <div className="space-y-4">
                    {news.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                          <img src={item.img} alt={item.title} className="w-16 h-12 rounded-lg object-cover" />
                          <div><h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.date}</p></div>
                        </div>
                        <button onClick={() => handleDelete('news', item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="animate-in fade-in duration-500 space-y-10">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Upload to Gallery</h2>
                  <div className="bg-slate-50 p-6 sm:p-10 rounded-[1.5rem] border border-slate-200 border-dashed text-center">
                     <UploadCloud className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                     <p className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">Select an image to add to the clinic gallery</p>
                     <input type="file" accept="image/*" onChange={handleAddGalleryImage} className="mx-auto block file:cursor-pointer file:py-3 file:px-8 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 hover:file:shadow-lg transition-all text-sm text-slate-500 outline-none" />
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Existing Gallery Images</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((src, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200 shadow-sm">
                        <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => handleDelete('gallery', index)} className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg"><Trash2 className="w-5 h-5"/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="animate-in fade-in duration-500 space-y-10">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Add Testimonial</h2>
                  <form onSubmit={handleAddTestimonial} className="bg-slate-50 p-6 rounded-[1.5rem] space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Patient Name</label><input required value={newTestimonial.author} onChange={e=>setNewTestimonial({...newTestimonial, author: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" /></div>
                      <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Treatment Type</label><input required value={newTestimonial.role} onChange={e=>setNewTestimonial({...newTestimonial, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" placeholder="e.g. Root Canal Patient" /></div>
                    </div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Review Text</label><textarea required value={newTestimonial.text} onChange={e=>setNewTestimonial({...newTestimonial, text: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" rows="3"></textarea></div>
                    <Button type="submit" className="uppercase tracking-widest text-xs">Save Testimonial</Button>
                  </form>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Existing Testimonials</h2>
                  <div className="space-y-4">
                    {testimonials.map(test => (
                      <div key={test.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div><h4 className="font-bold text-slate-900">{test.author}</h4><p className="text-sm text-slate-600 line-clamp-1 mt-1">"{test.text}"</p></div>
                        <button onClick={() => handleDelete('test', test.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="animate-in fade-in duration-500 space-y-10">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Add New FAQ</h2>
                  <form onSubmit={handleAddFaq} className="bg-slate-50 p-6 rounded-[1.5rem] space-y-5">
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Question</label><input required value={newFaq.q} onChange={e=>setNewFaq({...newFaq, q: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Answer</label><textarea required value={newFaq.a} onChange={e=>setNewFaq({...newFaq, a: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none" rows="3"></textarea></div>
                    <Button type="submit" className="uppercase tracking-widest text-xs">Save FAQ</Button>
                  </form>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Existing FAQs</h2>
                  <div className="space-y-4">
                    {faqs.map(faq => (
                      <div key={faq.id} className="flex items-start justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm gap-4">
                        <div><h4 className="font-bold text-slate-900 text-sm mb-1">{faq.q}</h4><p className="text-xs text-slate-600 line-clamp-2">{faq.a}</p></div>
                        <button onClick={() => handleDelete('faq', faq.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                </div>
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
  
  // --- Admin State ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState(initialDoctorsData);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [news, setNews] = useState(initialNewsData);
  const [gallery, setGallery] = useState(initialGalleryImages);

  const handleAddAppointment = (newAppt) => {
    setAppointments([newAppt, ...appointments]);
  };

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
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-body selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden flex flex-col">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .font-body { font-family: 'Inter', sans-serif; letter-spacing: -0.015em; }
        .font-heading { font-family: 'Manrope', sans-serif; letter-spacing: -0.03em; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Manrope', sans-serif; letter-spacing: -0.03em; }
        button, input, textarea, select { font-family: inherit; }
      `}} />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-gradient-to-b from-emerald-50 via-teal-50/20 to-transparent rounded-full blur-[120px] -z-10 opacity-60 pointer-events-none"></div>

      {/* Public Navigation - Hidden on Admin routes */}
      {route.page !== 'admin' && (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3 sm:py-4 border-b border-slate-100' : 'bg-transparent py-4 sm:py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
            <div className="flex items-center gap-1.5 cursor-pointer group z-50 font-heading" onClick={() => navigateTo('home')}>
              <span className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none -mt-1 group-hover:scale-110 transition-transform ${(!isScrolled && !mobileMenuOpen) ? 'text-emerald-400 drop-shadow-md' : 'text-emerald-600'}`}>5</span>
              <div className={`flex flex-col leading-none font-black tracking-widest ${(!isScrolled && !mobileMenuOpen) ? 'text-white drop-shadow-md' : 'text-emerald-800'}`}>
                <span className="text-sm sm:text-base">COSMO</span>
                <span className="text-sm sm:text-base">DENTAL</span>
              </div>
            </div>
            <div className={`hidden lg:flex items-center gap-6 xl:gap-8 px-8 py-3.5 rounded-full transition-all duration-300 ${(!isScrolled) ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm' : 'bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-xl shadow-slate-900/10'}`}>
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.id)} className={`font-bold text-sm xl:text-base transition-colors tracking-wide ${route.page === link.id ? 'text-white drop-shadow-sm' : 'text-slate-300 hover:text-white'}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:gap-4 z-50">
              <Button variant="cosmic" className="hidden sm:flex shadow-emerald-200 tracking-widest uppercase text-xs" onClick={() => navigateTo('booking')}>Book Now</Button>
              <button className={`lg:hidden p-2.5 rounded-xl border transition-colors ${(!isScrolled && !mobileMenuOpen) ? 'border-white/30 text-white bg-white/10 backdrop-blur-sm' : 'border-slate-200 text-slate-600 bg-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && route.page !== 'admin' && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-3xl pt-28 px-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto pb-10">
          <div className="flex flex-col gap-3 sm:gap-4 text-white">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`font-heading text-xl sm:text-2xl font-bold text-left py-3 border-b border-slate-800 tracking-wide ${route.page === link.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                {link.label}
              </button>
            ))}
            <div className="pt-6">
              <Button variant="cosmic" className="w-full py-4 text-sm sm:text-base rounded-2xl tracking-widest uppercase" onClick={() => navigateTo('booking')}>Book Appointment</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Routing */}
      <main className="relative flex-grow">
        {route.page === 'home' && <HomePage doctors={doctors} faqs={faqs} testimonials={testimonials} gallery={gallery} navigateTo={navigateTo} />}
        {route.page === 'about' && <AboutPage navigateTo={navigateTo} />}
        {route.page === 'services' && <ServicesPage navigateTo={navigateTo} />}
        {route.page === 'service-detail' && <ServiceDetailPage service={route.item} navigateTo={navigateTo} />}
        {route.page === 'doctors' && <DoctorsPage doctors={doctors} navigateTo={navigateTo} />}
        {route.page === 'doctor-detail' && <DoctorDetailPage doctor={route.item} navigateTo={navigateTo} />}
        {route.page === 'gallery' && <GalleryPage gallery={gallery} navigateTo={navigateTo} />}
        {route.page === 'news' && <NewsPage news={news} navigateTo={navigateTo} />}
        {route.page === 'news-detail' && <NewsDetailPage news={route.item} navigateTo={navigateTo} />}
        {route.page === 'contact' && <ContactPage navigateTo={navigateTo} />}
        {route.page === 'booking' && <BookingPage onAddAppointment={handleAddAppointment} navigateTo={navigateTo} />}
        
        {/* Admin Routing */}
        {route.page === 'admin' && !isAdminLoggedIn && <AdminLoginPage onLogin={() => setIsAdminLoggedIn(true)} navigateTo={navigateTo} />}
        {route.page === 'admin' && isAdminLoggedIn && <AdminDashboard navigateTo={navigateTo} onLogout={() => setIsAdminLoggedIn(false)} doctors={doctors} setDoctors={setDoctors} faqs={faqs} setFaqs={setFaqs} testimonials={testimonials} setTestimonials={setTestimonials} appointments={appointments} news={news} setNews={setNews} gallery={gallery} setGallery={setGallery} />}

        {/* Global Booking Banner */}
        {route.page !== 'booking' && route.page !== 'admin' && <BookingBanner navigateTo={navigateTo} />}
      </main>

      {/* Footer (Hidden on Admin panel for cleaner app feel) */}
      {route.page !== 'admin' && (
      <footer className="bg-slate-900 text-slate-300 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 -z-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-1.5 text-white cursor-pointer group w-max font-heading" onClick={() => navigateTo('home')}>
              <span className="text-4xl sm:text-5xl font-black text-emerald-500 tracking-tighter leading-none -mt-1 group-hover:scale-110 transition-transform">5</span>
              <div className="flex flex-col leading-none font-black tracking-widest text-emerald-50"><span className="text-sm sm:text-base">COSMO</span><span className="text-sm sm:text-base">DENTAL</span></div>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm sm:text-base font-medium">As the best dental clinic in Sarjapur road, near Kodathi gate, we combine state-of-the-art medical technology with expert clinical care to help you maintain perfect oral health.</p>
          </div>
          <div>
            <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide">Contact Information</h4>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /> <span>063620 40923</span></p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-400 shrink-0" /> care@5sportshealth.com</p>
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" /> <span className="leading-relaxed">Sarjapur Main Rd, Ambedkar Nagar,<br/>Chikkabellandur,<br/>Bengaluru, Karnataka 560035</span></p>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm sm:text-base font-medium">
              {['Home', 'About', 'Services', 'Doctors', 'Gallery', 'Admin'].map(link => (
                <button key={link} onClick={() => navigateTo(link.toLowerCase())} className="hover:text-emerald-300 transition-colors w-fit flex items-center gap-2 text-left tracking-wide"><ChevronRight className="w-4 h-4 text-slate-600" /> {link}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-white font-bold text-lg mb-4 sm:mb-6 tracking-wide">Clinic Timings</h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-slate-800 pb-2 sm:pb-3"><span className="tracking-wide">Mon - Sat</span><span className="text-white font-bold">9:00 AM - 9:00 PM</span></li>
              <li className="flex justify-between pb-2"><span className="tracking-wide">Sunday</span><span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">Closed</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-10 sm:mt-16 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase"><p className="text-center md:text-left">&copy; 2026 COSMO DENTAL. All rights reserved.</p></div>
      </footer>
      )}
    </div>
  );
}