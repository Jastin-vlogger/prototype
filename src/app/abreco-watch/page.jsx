"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, MessageCircle, 
  MapPin, Play, Sparkles, Moon, Sun, 
  ArrowUpRight, Check, ArrowLeft, ChevronLeft, ChevronRight, Plus
} from 'lucide-react';

// --- DATA: 100% EXCLUSIVELY WATCH IMAGES ---
const products = [
  {
    id: 1, name: "Desert Mirage Chronograph", category: "Chronograph", price: "AED 18,900",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Swiss movement tailored for the desert climate. The Desert Mirage features a scratch-resistant sapphire crystal and a hand-polished 18k rose gold casing. Engineered to track split seconds with flawless precision.", 
    specs: ["42mm 18k Rose Gold Case", "Anti-reflective Sapphire Crystal", "Water Resistant to 100m", "Swiss Automatic Chronograph", "72-hour Power Reserve", "Hand-stitched Alligator Strap"]
  },
  {
    id: 2, name: "Tourbillon Aerodynamics", category: "Tourbillon", price: "AED 145,000",
    images: [
      "https://images.unsplash.com/photo-1587836374828-cb4387d605c8?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1614165936126-22485e533087?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1495856453086-6ba6eb45ce28?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "A skeletonized masterpiece defying gravity. Forged from aerospace-grade titanium, revealing a mesmerizing in-house flying tourbillon movement. A hyper-watch for the modern era.", 
    specs: ["Grade 5 Titanium Case", "In-house Flying Tourbillon", "Fully Skeletonized Dial", "Exhibition Sapphire Caseback", "Hyper-lightweight Construction", "Limited Edition of 50"]
  },
  {
    id: 3, name: "Deep Sea Vanguard", category: "Diver", price: "AED 24,500",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Built for the abyss. Featuring a unidirectional ceramic bezel, helium escape valve, and luminescent markers that charge in sunlight to glow intensely in absolute darkness.", 
    specs: ["44mm 904L Steel Case", "Ceramic Unidirectional Bezel", "Water Resistant to 1000m", "Helium Escape Valve", "Super-LumiNova Markers", "Integrated Rubber Strap"]
  },
  {
    id: 4, name: "Midnight Onyx Minimalist", category: "Dress", price: "AED 12,200",
    images: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "The epitome of understated elegance. An ultra-thin profile crafted from solid platinum, framing a dial made from a single, flawless slice of black onyx. Perfect for black-tie galas.", 
    specs: ["38mm Platinum 950 Case", "Ultra-thin 6mm Profile", "Genuine Black Onyx Dial", "Manual Wind Movement", "No-date Symmetry", "Seamless Black Leather"]
  },
  {
    id: 5, name: "Celestial Perpetual", category: "Complication", price: "AED 210,000",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1507764923504-cd90bf7da772?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1619647202358-154df66a5061?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "A mechanical computer on your wrist. This perpetual calendar tracks the date, day, month, leap year, and moon phase without needing adjustment until the year 2100.", 
    specs: ["41mm 18k White Gold Case", "Perpetual Calendar Module", "Aventurine Moonphase Dial", "Micro-rotor Automatic", "Hand-finished Anglage", "Over 400 Components"]
  },
  {
    id: 6, name: "Skeleton Royal", category: "Skeleton", price: "AED 58,000",
    images: [
      "https://images.unsplash.com/photo-1623998021446-45ca9e528d56?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Art meets engineering. Stripped of its dial to reveal the beating heart within. The bridges are hand-chamfered and coated in black DLC for a striking, aggressive aesthetic.", 
    specs: ["40mm Carbon Fiber Case", "Black DLC Coated Bridges", "Openworked Barrel", "Visible Escapement", "100m Water Resistance", "Integrated Bracelet"]
  },
  {
    id: 7, name: "Regatta Flyback", category: "Chronograph", price: "AED 34,000",
    images: [
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Engineered for the high seas. Featuring a sophisticated flyback chronograph mechanism allowing instant restarting of the timer with a single push. Cased in corrosion-resistant bronze.", 
    specs: ["43mm Marine Bronze Case", "Flyback Chronograph", "Regatta Countdown Timer", "Antimagnetic Shielding", "Tritium Lume", "Sailcloth Strap"]
  },
  {
    id: 8, name: "Rose Gold Grandeur", category: "Dress", price: "AED 28,500",
    images: [
      "https://images.unsplash.com/photo-1549972574-87cc72eb62a7?auto=format&fit=crop&q=80&w=1200", 
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1507764923504-cd90bf7da772?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Classic proportions and timeless design. A stark white enamel dial paired with blued-steel Breguet hands and a solid 18k rose gold case. Horological purity at its finest.", 
    specs: ["39mm 18k Rose Gold Case", "Grand Feu Enamel Dial", "Blued-steel Hands", "Manual Wind Caliber", "Sapphire Caseback", "Brown Crocodile Leather"]
  }
];

const blogPosts = [
  { id: 1, title: "The Architecture of Time", category: "Design", date: "AUG 2026", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200", excerpt: "Exploring the relationship between Dubai's skyline and our latest skeletonized tourbillon movement. In a city that defies gravity and convention, our engineers sought to create a movement that mirrors this boundless ambition." },
  { id: 2, title: "Forging Aerospace Titanium", category: "Innovation", date: "JUL 2026", image: "https://images.unsplash.com/photo-1587836374828-cb4387d605c8?auto=format&fit=crop&q=80&w=1200", excerpt: "A deep dive into the complex machining process required to create our ultra-lightweight watch cases. Sourced from the same foundries used by international space agencies." },
  { id: 3, title: "The Art of the Flyback", category: "Mechanics", date: "JUN 2026", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=1200", excerpt: "Understanding the intricate mechanics behind the instantaneous reset of our Regatta chronograph. An innovation forged out of pure necessity for professional sailors." },
  { id: 4, title: "Mastering the Enamel Dial", category: "Craftsmanship", date: "MAY 2026", image: "https://images.unsplash.com/photo-1549972574-87cc72eb62a7?auto=format&fit=crop&q=80&w=1200", excerpt: "The painstaking process of firing Grand Feu enamel dials at 800 degrees Celsius. A single degree of error means starting the entire two-week process from scratch." }
];

const faqs = [
  { q: "Do you offer international shipping?", a: "Yes. We offer complimentary insured global shipping via secure couriers for all timepieces over AED 10,000." },
  { q: "How long does a custom bespoke order take?", a: "Depending on the complexity of the complications, bespoke horological orders require between 6 to 18 months from final design approval to delivery." },
  { q: "Are your materials ethically sourced?", a: "Absolutely. 100% of our precious metals are responsibly mined, and our diamonds are strictly Kimberley Process certified." },
  { q: "Can I book a private viewing in Dubai?", a: "Yes. Private viewings at our Downtown Dubai flagship can be arranged through our Contact Us page or via WhatsApp concierge." },
  { q: "What is your warranty policy?", a: "Every ABRECO WATCHES timepiece comes with a comprehensive 5-year international warranty covering manufacturing defects." }
];

// --- UTILITY COMPONENTS ---

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-5 dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setIsTouch(true); return; }
    const updatePosition = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => setIsHovering(!!e.target.closest('button, a, .magnetic, .product-card, .hover-trigger, .faq-item'));
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => { window.removeEventListener('mousemove', updatePosition); window.removeEventListener('mouseover', handleMouseOver); };
  }, []);

  if (isTouch) return null;

  return (
    <div className={`fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-300 ease-out mix-blend-difference rounded-full bg-white
      ${isHovering ? 'w-24 h-24 backdrop-blur-md opacity-100' : 'w-4 h-4 opacity-100'}`}
      style={{ transform: `translate3d(${pos.x - (isHovering ? 48 : 8)}px, ${pos.y - (isHovering ? 48 : 8)}px, 0)` }}
    />
  );
};

const MagneticButton = ({ children, className = "", variant = "outline", inverted = false, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => { if (window.matchMedia("(pointer: coarse)").matches) setIsTouch(true); }, []);

  const handleMouse = (e) => {
    if (isTouch) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.3, y: (clientY - (top + height / 2)) * 0.3 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  const isSolid = variant === "solid";
  let baseBg, hoverFill, textColors;

  if (isSolid) {
    baseBg = inverted ? "bg-white dark:bg-black border-transparent" : "bg-black dark:bg-white border-transparent";
    hoverFill = inverted ? "bg-black dark:bg-white" : "bg-white dark:bg-black";
    textColors = inverted 
      ? "text-black dark:text-white group-hover:text-white dark:group-hover:text-black"
      : "text-white dark:text-black group-hover:text-black dark:group-hover:text-white";
  } else {
    if (inverted) {
      baseBg = "bg-transparent border-white/20 dark:border-black/20";
      hoverFill = "bg-white dark:bg-black";
      textColors = "text-white dark:text-black group-hover:text-black dark:group-hover:text-white";
    } else {
      baseBg = "bg-transparent border-black/20 dark:border-white/20";
      hoverFill = "bg-black dark:bg-white";
      textColors = "text-black dark:text-white group-hover:text-white dark:group-hover:text-black";
    }
  }

  return (
    <button
      ref={ref} onClick={onClick} onMouseMove={handleMouse} onMouseLeave={reset}
      className={`relative overflow-hidden group magnetic transition-transform duration-300 ease-out rounded-full border ${baseBg} ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      {...props}
    >
      <div className={`absolute inset-0 w-full h-full ${hoverFill} translate-y-[100%] rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom`}></div>
      <span className={`relative z-10 flex items-center justify-center gap-2 w-full h-full transition-colors duration-300 ${textColors}`}>
        {children}
      </span>
    </button>
  );
};

const MaskReveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${className}`}>
      <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]" 
           style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)', transitionDelay: `${delay}ms`, opacity: isVisible ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
};

const Marquee = ({ text }) => (
  <div className="w-full overflow-hidden bg-black text-white dark:bg-white dark:text-black py-4 border-y border-black/10 dark:border-white/10">
    <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-8">
          {text} <Sparkles size={40} className="text-amber-500" />
        </span>
      ))}
    </div>
  </div>
);

const PageHeader = ({ title, subtitle }) => (
  <div className="pt-28 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 max-w-[100rem] mx-auto">
    <MaskReveal>
      <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.95] md:leading-[0.85] mb-6 md:mb-8 break-words text-black dark:text-white">{title}</h1>
    </MaskReveal>
    {subtitle && (
      <MaskReveal delay={200}>
        <p className="text-stone-600 dark:text-stone-400 font-medium max-w-2xl text-xs sm:text-sm md:text-base uppercase tracking-widest leading-relaxed">
          {subtitle}
        </p>
      </MaskReveal>
    )}
  </div>
);

const ModernImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-stone-200 dark:bg-zinc-900 group shadow-lg">
      {images.map((img, idx) => (
        <div key={idx} className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)]" style={{ transform: `translateX(${(idx - currentIndex) * 100}%)` }}>
          <img src={img} alt="Product view" className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-[2s]" />
        </div>
      ))}
      
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="pointer-events-auto p-2 md:p-4 bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full text-black dark:text-white hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="pointer-events-auto p-2 md:p-4 bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full text-black dark:text-white hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 dark:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        {images.map((_, idx) => (
          <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} className={`transition-all duration-500 rounded-full h-1.5 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
        ))}
      </div>
    </div>
  );
};

const FAQAccordion = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/10 dark:border-white/10 faq-item cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="py-8 flex justify-between items-center group">
        <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-black dark:text-white pr-8">{item.q}</h3>
        <div className={`p-2 rounded-full border border-black/10 dark:border-white/10 transition-transform duration-500 flex-shrink-0 ${isOpen ? 'rotate-45' : 'group-hover:scale-110'}`}>
          <Plus size={20} className="text-black dark:text-white" />
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-stone-600 dark:text-stone-400 font-medium md:text-lg leading-relaxed max-w-3xl">{item.a}</p>
      </div>
    </div>
  );
};

const TestimonialSlider = () => {
  const testimonials = [
    { quote: "ABRECO WATCHES has redefined what true horological luxury means in the modern era. Their timepieces are not just worn; they are experienced.", author: "Vogue Arabia" },
    { quote: "A masterful synthesis of aerospace engineering and centuries-old Swiss watchmaking traditions.", author: "GQ Horology" },
    { quote: "The Tourbillon Aerodynamics is a breathtaking achievement. It completely shatters expectations of what an independent Maison can produce.", author: "Watch Time" }
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 md:py-48 px-6 md:px-12 max-w-[80rem] mx-auto text-center border-t border-black/10 dark:border-white/10 overflow-hidden">
      <div className="relative w-full h-[40vh] md:h-[45vh] flex items-center justify-center">
        {testimonials.map((t, i) => (
          <div key={i} className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] ${i === current ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-12 z-0'}`}>
             <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic font-light text-black dark:text-white leading-snug md:leading-tight mb-8 md:mb-12 max-w-5xl px-4">
               "{t.quote}"
             </h3>
             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">— {t.author}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4">
         {testimonials.map((_, i) => (
           <button 
             key={i} 
             onClick={() => setCurrent(i)} 
             className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? 'w-8 bg-black dark:bg-white' : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/50 dark:hover:bg-white/50'}`} 
           />
         ))}
      </div>
    </section>
  );
};


// --- PAGES ---

const Home = ({ setPage, openModal, openBlog }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const slides = [
    { img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=2000", word1: "NEO", word2: "HOROLOGY" },
    { img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=2000", word1: "PURE", word2: "CALIBER" },
    { img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2000", word1: "RARE", word2: "TIME" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40; 
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  return (
    <div className="animate-in fade-in duration-1000">
      
      <section 
        className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black text-white"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div 
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0) scale(1.1)` }}
            >
              <img src={slide.img} className="w-full h-full object-cover opacity-50 dark:opacity-40 grayscale" alt="hero" />
            </div>
          </div>
        ))}
        
        <div 
          className="relative z-20 w-full px-4 md:px-12 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
        >
          <h1 className="text-[18vw] md:text-[15vw] leading-[0.9] md:leading-[0.8] font-black uppercase tracking-tighter text-center drop-shadow-2xl flex flex-col items-center">
            <MaskReveal delay={100}>{slides[currentSlide].word1}</MaskReveal>
            <MaskReveal delay={200} className="italic font-serif font-light text-[14vw] md:text-[12vw] text-amber-500 lowercase mt-0 md:-mt-8 block">{slides[currentSlide].word2}</MaskReveal>
          </h1>
        </div>
      </section>

      <Marquee text="THE NEW STANDARD • OBSESSIVE HOROLOGY • AVANT-GARDE" />

      <section className="py-24 md:py-48 px-6 md:px-12 max-w-[100rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <MaskReveal>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white">Curated<br/><span className="text-stone-400 dark:text-stone-600 font-serif italic font-light">Archive</span></h2>
          </MaskReveal>
          <MaskReveal delay={200}>
            <MagneticButton onClick={() => setPage('products')} className="px-8 py-4 text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Explore Collection
            </MagneticButton>
          </MaskReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {products.slice(0, 4).map((product, i) => (
            <div key={product.id} className={`product-card group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`} onClick={() => openModal(product)}>
              <MaskReveal delay={i * 100}>
                <div className="relative overflow-hidden aspect-[4/5] bg-stone-200 dark:bg-zinc-900 mb-6 rounded-[2rem] md:rounded-[2.5rem]">
                  <img src={product.images[0]} className="w-full h-full object-cover opacity-90 md:grayscale md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-105" alt={product.name}/>
                  <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 translate-x-4 md:group-hover:translate-x-0 hidden md:block">
                    Acquire
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 pr-4 text-black dark:text-white">{product.name}</h3>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500">{product.category}</p>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap text-black dark:text-white">{product.price}</span>
                </div>
              </MaskReveal>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-48 bg-black text-white dark:bg-white dark:text-black relative overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 md:gap-32">
          <div className="w-full lg:w-1/2">
            <MaskReveal>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Mastery<br/><span className="text-stone-500 font-serif italic font-light">& Vision</span>
              </h2>
              <p className="text-base md:text-lg font-medium max-w-md mb-12 text-stone-400 dark:text-stone-600 leading-relaxed">
                Step inside the atelier where raw elements are forged into horological icons. We reject compromise in pursuit of absolute perfection.
              </p>
              <MagneticButton inverted onClick={() => setPage('about')} className="px-10 py-5 text-[10px] md:text-xs uppercase tracking-[0.2em] border-white/20 dark:border-black/20">
                Discover About Us
              </MagneticButton>
            </MaskReveal>
          </div>
          <div className="w-full lg:w-1/2">
            <MaskReveal delay={200}>
              <div className="relative aspect-[4/3] md:aspect-video bg-zinc-900 overflow-hidden group cursor-pointer rounded-[2rem] md:rounded-[2.5rem]">
                <img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-[2s]" alt="Craft" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-full flex items-center justify-center text-white dark:text-black group-hover:scale-90 transition-transform">
                    <Play className="ml-2" fill="currentColor" size={32} />
                  </div>
                </div>
              </div>
            </MaskReveal>
          </div>
        </div>
      </section>

      <TestimonialSlider />

      <section className="py-24 md:py-48 px-6 md:px-12 max-w-[100rem] mx-auto border-t border-stone-200 dark:border-zinc-900">
         <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <MaskReveal>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-black dark:text-white">The<br/>Blog</h2>
              <MagneticButton onClick={() => setPage('blog')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] mt-4 md:mt-8">
                Read Editorials
              </MagneticButton>
            </MaskReveal>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {blogPosts.slice(0,3).map((post, i) => (
              <MaskReveal key={post.id} delay={i * 100}>
                <div className="group cursor-pointer hover-trigger flex flex-col h-full" onClick={() => openBlog(post)}>
                  <div className="overflow-hidden aspect-[4/3] mb-6 bg-stone-200 dark:bg-zinc-900 w-full rounded-[2rem]">
                    <img src={post.image} className="w-full h-full object-cover opacity-90 md:grayscale md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-[2s] md:group-hover:scale-105" alt={post.title}/>
                  </div>
                  <div className="px-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block mb-3">{post.category} • {post.date}</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight text-black dark:text-white">{post.title}</h3>
                  </div>
                </div>
              </MaskReveal>
            ))}
         </div>
      </section>
    </div>
  );
};

const Products = ({ openModal }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Chronograph', 'Tourbillon', 'Diver', 'Dress', 'Complication', 'Skeleton'];
  const filteredProducts = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

  return (
    <div className="animate-in fade-in duration-700 min-h-screen pb-32">
      <PageHeader title="Products" subtitle="The complete collection of masterful timepieces. Direct consultation available exclusively via concierge." />

      <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 md:mb-24 flex gap-6 overflow-x-auto custom-scrollbar pb-4 border-b border-black/10 dark:border-white/10">
         {categories.map((cat, i) => (
           <button 
             key={i} 
             onClick={() => setActiveFilter(cat)}
             className={`text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap pb-2 transition-colors ${activeFilter === cat ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-stone-400 hover:text-black dark:hover:text-white'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      {activeFilter === 'All' && (
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-48">
          <MaskReveal>
            <div className="bg-stone-200 dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 flex flex-col md:flex-row items-center gap-12 group cursor-pointer" onClick={() => openModal(products[1])}>
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                <span className="text-[10px] tracking-[0.4em] uppercase font-black text-amber-600 dark:text-amber-500 mb-4 block">Masterpiece</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-black dark:text-white leading-[0.9]">{products[1].name}</h2>
                <p className="text-stone-600 dark:text-stone-400 font-medium mb-8 md:mb-10 max-w-lg mx-auto md:mx-0">{products[1].description}</p>
                <MagneticButton variant="solid" className="px-10 py-5 text-[10px] uppercase tracking-[0.2em] w-max mx-auto md:mx-0">
                   Discover Piece
                </MagneticButton>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                   <img src={products[1].images[0]} className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105" alt="Best Seller"/>
                </div>
              </div>
            </div>
          </MaskReveal>
        </div>
      )}

      <div className="px-6 md:px-12 max-w-[100rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24">
        {filteredProducts.map((product, i) => (
          <div key={product.id} className="product-card group cursor-pointer flex flex-col" onClick={() => openModal(product)}>
            <MaskReveal delay={(i % 4) * 100}>
              <div className="relative overflow-hidden mb-4 md:mb-6 bg-stone-200 dark:bg-zinc-900 aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem]">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-90 md:grayscale md:opacity-80 md:group-hover:opacity-0 transition-all duration-700" />
                <img src={product.images[1]} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 md:group-hover:opacity-100 md:scale-105" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] p-4 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full opacity-0 translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out hidden md:flex justify-between items-center shadow-xl">
                  <span className="text-black dark:text-white text-[10px] font-black uppercase tracking-widest pl-2">View Spec</span>
                  <div className="bg-black dark:bg-white p-2 rounded-full">
                    <ArrowRight size={14} className="text-white dark:text-black" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-2">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                  <h3 className="text-lg font-black uppercase tracking-tight leading-tight text-black dark:text-white">{product.name}</h3>
                  <span className="text-sm font-medium whitespace-nowrap text-black dark:text-white">{product.price}</span>
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500">{product.category}</p>
              </div>
            </MaskReveal>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
         <div className="text-center py-24">
            <p className="text-stone-500 uppercase tracking-widest font-black">No timepieces found in this category.</p>
         </div>
      )}
    </div>
  );
};

const Bespoke = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen pb-32">
    <PageHeader title="Bespoke" subtitle="The ultimate expression of individuality. Transform your horological vision into a physical masterpiece." />
    
    <div className="max-w-[100rem] mx-auto px-6 md:px-12 space-y-24 md:space-y-48">
      {[
        { title: "I. Vision", text: "It begins with a dialogue. In our private suite in Downtown Dubai, we discuss your desires, complications, and the legacy you wish to create.", img: "https://images.unsplash.com/photo-1549972574-87cc72eb62a7?auto=format&fit=crop&q=80&w=1200" },
        { title: "II. Engineering", text: "Our master watchmakers draft meticulous sketches and CAD renders. We source the highest-grade titanium, proprietary alloys, and VVS1 diamonds for your personal review.", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200" },
        { title: "III. Assembly", text: "Your piece enters the atelier. Over hundreds of hours, artisans employ techniques passed down through generations. You receive updates as raw materials take form.", img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=1200" }
      ].map((step, idx) => (
        <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-32`}>
          <div className="w-full md:w-1/2">
            <MaskReveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 dark:bg-zinc-900 hover-trigger group rounded-[2rem] md:rounded-[2.5rem]">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-[2s] md:group-hover:scale-105" />
              </div>
            </MaskReveal>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <MaskReveal delay={200}>
              <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-[0.9] text-black dark:text-white">{step.title}</h3>
              <p className="text-stone-600 dark:text-stone-400 font-medium leading-relaxed text-base md:text-xl max-w-lg mb-8 md:mb-12">{step.text}</p>
              {idx === 2 && (
                <MagneticButton onClick={() => window.open('https://wa.me/971501234567', '_blank')} className="px-10 py-5 text-[10px] uppercase tracking-[0.2em] w-max">
                  Initiate Commission
                </MagneticButton>
              )}
            </MaskReveal>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Blog = ({ openBlog }) => (
  <div className="animate-in fade-in duration-1000 min-h-screen pb-32">
    <PageHeader title="Blog" subtitle="Editorials on design, horological heritage, and the future of uncompromising luxury." />
    
    <div className="max-w-[100rem] mx-auto px-6 md:px-12">
      <MaskReveal>
        <div className="relative aspect-[4/5] md:aspect-[21/9] overflow-hidden mb-16 md:mb-24 group cursor-pointer hover-trigger rounded-[2rem] md:rounded-[2.5rem]" onClick={() => openBlog(blogPosts[0])}>
          <img src={blogPosts[0].image} className="w-full h-full object-cover md:grayscale opacity-90 md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-[2s] md:group-hover:scale-105" alt="cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-16 text-white">
            <span className="text-amber-500 text-[10px] tracking-[0.3em] uppercase mb-4 block">Featured • {blogPosts[0].date}</span>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6 max-w-4xl">{blogPosts[0].title}</h2>
            <p className="text-stone-300 font-medium max-w-2xl mb-6 md:mb-8 text-sm md:text-base hidden sm:block">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-2 text-white text-[10px] md:text-xs font-black uppercase tracking-widest md:group-hover:gap-4 transition-all">
               Read Article <ArrowRight size={16}/>
            </div>
          </div>
        </div>
      </MaskReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
        {blogPosts.slice(1).map((post, i) => (
          <MaskReveal key={post.id} delay={i * 100}>
            <div className="group cursor-pointer hover-trigger flex flex-col h-full" onClick={() => openBlog(post)}>
              <div className="overflow-hidden aspect-[4/3] mb-6 md:mb-8 bg-stone-200 dark:bg-zinc-900 w-full rounded-[2rem]">
                <img src={post.image} className="w-full h-full object-cover md:grayscale opacity-90 md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-[2s] md:group-hover:scale-105" alt={post.title}/>
              </div>
              <div className="flex-grow px-2">
                <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3 block">{post.category} • {post.date}</span>
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-[0.9] mb-3 pr-4 text-black dark:text-white">{post.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 font-medium leading-relaxed text-sm">{post.excerpt}</p>
              </div>
            </div>
          </MaskReveal>
        ))}
      </div>
    </div>
  </div>
);

const AboutUs = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen pb-32">
    <PageHeader title="About Us" subtitle="Born in Dubai. Engineered for the world. A legacy of defying expectations." />
    
    <div className="max-w-[100rem] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 mb-24 md:mb-48 items-center">
        <MaskReveal>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black dark:text-white">The Genesis<br/><span className="text-stone-400 dark:text-stone-600 font-serif italic font-light">of a Maison</span></h2>
          <div className="space-y-6 text-stone-600 dark:text-stone-400 font-medium text-base md:text-xl leading-relaxed">
            <p>Founded at the intersection of sweeping desert dunes and towering steel skylines, ABRECO WATCHES represents the duality of the modern UAE.</p>
            <p>We recognized that true luxury was stagnating. It relied too heavily on centuries-old European laurels. We sought to inject the relentless, forward-thinking ambition of Dubai into the meticulous, ancestral craft of horology.</p>
          </div>
        </MaskReveal>
        <MaskReveal delay={200}>
          <div className="aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-stone-200 dark:bg-zinc-900 hover-trigger group rounded-[2rem] md:rounded-[2.5rem]">
             <img src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80&w=1200" alt="Founders" className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-[2s] md:group-hover:scale-105" />
          </div>
        </MaskReveal>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-24 md:pt-32">
        <MaskReveal>
           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16 md:mb-24 text-black dark:text-white">The Timeline</h2>
        </MaskReveal>
        <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
          {[
            { year: "2018", title: "The Concept", text: "Conceived in a small atelier in Al Quoz, focusing purely on bespoke horological commissions for local royalty." },
            { year: "2021", title: "Engineering Expansion", text: "Partnered with independent Swiss watchmakers to develop movements capable of withstanding extreme Middle Eastern temperatures." },
            { year: "2024", title: "The Flagship", text: "Opened the brutalist-inspired Maison in Downtown Dubai, redefining the physical retail experience." },
            { year: "2026", title: "Global Vision", text: "Expanding the archive to a global audience, maintaining zero-compromise limited production runs." }
          ].map((item, idx) => (
             <MaskReveal key={idx} delay={idx * 100}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-start group hover-trigger border-b border-black/10 dark:border-white/10 pb-12">
                   <div className="text-3xl md:text-6xl font-serif italic font-light text-stone-400 dark:text-stone-600 md:group-hover:text-amber-500 transition-colors">{item.year}</div>
                   <div>
                      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-2 md:mb-4 text-black dark:text-white">{item.title}</h3>
                      <p className="text-stone-600 dark:text-stone-400 font-medium text-sm md:text-lg leading-relaxed">{item.text}</p>
                   </div>
                </div>
             </MaskReveal>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactUs = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen pb-32">
    <PageHeader title="Contact Us" subtitle="Global advisory. Private viewings. Immediate acquisitions. We are at your disposal." />
    
    <div className="max-w-[100rem] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-32">
        <div className="lg:col-span-5 space-y-12 md:space-y-16">
          <MaskReveal>
            <div className="bg-black text-white dark:bg-white dark:text-black p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem]">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 md:mb-6">Direct Access</h3>
              <p className="font-medium text-stone-400 dark:text-stone-600 mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
                Skip the waiting lists. Connect with our dedicated WhatsApp concierge for seamless, instant, and personalized service anywhere in the world.
              </p>
              <MagneticButton variant="solid" inverted onClick={() => window.open('https://wa.me/971501234567', '_blank')} className="w-full py-4 md:py-5 text-[10px] uppercase tracking-[0.2em] border-none">
                 Initiate WhatsApp Chat
              </MagneticButton>
            </div>
          </MaskReveal>

          <MaskReveal delay={200}>
            <div className="space-y-8 md:space-y-10 border-t border-black/10 dark:border-white/10 pt-8">
               <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-500 mb-2 md:mb-4 flex items-center gap-2"><MapPin size={14}/> Maison Flagship</h4>
                  <p className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight text-black dark:text-white">Mohammed Bin Rashid Blvd<br/>Downtown Dubai, UAE</p>
                  <p className="text-stone-500 text-xs mt-2 font-medium">By Appointment Only</p>
               </div>
               <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-500 mb-2 md:mb-4 flex items-center gap-2"><MessageCircle size={14}/> Digital Correspondence</h4>
                  <p className="text-lg md:text-xl font-black uppercase tracking-tight text-black dark:text-white">concierge@abrecowatches.com</p>
               </div>
            </div>
          </MaskReveal>
        </div>

        <div className="lg:col-span-7">
          <MaskReveal delay={300}>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 md:mb-12 text-black dark:text-white">Formal Inquiry</h3>
            <form className="space-y-8 md:space-y-12" onSubmit={(e) => { e.preventDefault(); alert("Inquiry sent securely."); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative">
                  <input type="text" className="w-full bg-transparent border-b border-stone-300 dark:border-zinc-700 py-3 text-base sm:text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-black dark:focus:border-white transition-colors peer placeholder-transparent text-black dark:text-white" placeholder="First Name" required />
                  <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white pointer-events-none">First Name</label>
                </div>
                <div className="relative">
                  <input type="text" className="w-full bg-transparent border-b border-stone-300 dark:border-zinc-700 py-3 text-base sm:text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-black dark:focus:border-white transition-colors peer placeholder-transparent text-black dark:text-white" placeholder="Last Name" required />
                  <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white pointer-events-none">Last Name</label>
                </div>
              </div>
              <div className="relative">
                <input type="email" className="w-full bg-transparent border-b border-stone-300 dark:border-zinc-700 py-3 text-base sm:text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-black dark:focus:border-white transition-colors peer placeholder-transparent text-black dark:text-white" placeholder="Email" required />
                <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white pointer-events-none">Email Address</label>
              </div>
              <div className="relative">
                <textarea rows="4" className="w-full bg-transparent border-b border-stone-300 dark:border-zinc-700 py-3 text-base sm:text-lg md:text-xl font-black uppercase tracking-tight focus:outline-none focus:border-black dark:focus:border-white transition-colors peer placeholder-transparent resize-none text-black dark:text-white" placeholder="Message" required></textarea>
                <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white pointer-events-none">Nature of Inquiry</label>
              </div>
              <MagneticButton type="submit" className="px-10 py-4 md:py-5 text-[10px] uppercase tracking-[0.2em]">
                Submit Request
              </MagneticButton>
            </form>
          </MaskReveal>
        </div>
      </div>
    </div>
  </div>
);

const FAQ = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen pb-32">
    <PageHeader title="FAQ" subtitle="Common inquiries regarding our horological archive, bespoke services, and global shipping policies." />
    
    <div className="max-w-[80rem] mx-auto px-6 md:px-12">
      <div className="border-t border-black/10 dark:border-white/10">
        {faqs.map((faq, i) => (
          <MaskReveal key={i} delay={i * 100}>
            <FAQAccordion item={faq} />
          </MaskReveal>
        ))}
      </div>
      
      <div className="mt-32 text-center">
         <MaskReveal>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-6">Still have questions?</h3>
            <MagneticButton variant="solid" onClick={() => window.open('https://wa.me/971501234567', '_blank')} className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] mx-auto border-none">Contact Concierge</MagneticButton>
         </MaskReveal>
      </div>
    </div>
  </div>
);

// --- PRODUCT DETAIL PAGE ---
const ProductDetail = ({ product, onBack }) => {
  if (!product) return null;

  const handlePurchase = () => {
    const text = `Hello ABRECO WATCHES, I am interested in acquiring the ${product.name} (${product.price}). Please provide availability and details.`;
    window.open(`https://wa.me/971501234567?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[100rem] mx-auto animate-in fade-in duration-1000 min-h-screen">
      <button 
        onClick={onBack} 
        className="relative z-10 flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-12 md:mb-24 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Return to Archive
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
        
        <div className="lg:sticky lg:top-32 w-full">
           <MaskReveal>
              <ModernImageSlider images={product.images} />
           </MaskReveal>
        </div>

        <div className="flex flex-col pt-4 lg:pt-0">
          <MaskReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 dark:text-stone-400 mb-6">{product.category}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black dark:text-white">{product.name}</h1>
            <p className="text-2xl md:text-4xl font-serif italic text-amber-600 dark:text-amber-500 mb-12">{product.price}</p>
          </MaskReveal>

          <MaskReveal delay={150}>
            <p className="text-stone-600 dark:text-stone-400 text-sm md:text-lg font-medium leading-relaxed mb-12">{product.description}</p>

            <div className="border-t border-black/10 dark:border-white/10 pt-12 mb-12">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black dark:text-white mb-8">Technical Specifications</h4>
              <ul className="flex flex-col gap-4">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-4 text-xs md:text-sm font-medium text-stone-600 dark:text-stone-400 uppercase tracking-widest border-b border-black/5 dark:border-white/5 pb-4 leading-tight">
                    <Check size={16} className="text-amber-500 flex-shrink-0" /> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </MaskReveal>

          <MaskReveal delay={300}>
            <MagneticButton 
              variant="solid"
              onClick={handlePurchase} 
              className="w-full py-6 md:py-8 text-xs md:text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 border-none"
            >
               <span className="flex items-center justify-center gap-3">
                 <MessageCircle size={20} /> Acquire via WhatsApp
               </span>
            </MagneticButton>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] font-black text-stone-500">
              Complimentary global shipping • Dedicated VIP advisory
            </p>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
};

// --- BLOG DETAIL PAGE ---
const BlogDetail = ({ post, onBack }) => {
  if (!post) return null;

  return (
    <div className="pt-32 md:pt-40 pb-32 animate-in fade-in duration-1000 min-h-screen">
      <div className="px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
        <button onClick={onBack} className="relative z-10 flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> Return to Journal
        </button>
      </div>

      <div className="max-w-[80rem] mx-auto px-6 md:px-12 mb-16 text-center">
         <MaskReveal>
            <span className="text-amber-500 text-[10px] tracking-[0.4em] uppercase font-black block mb-6">{post.category} • {post.date}</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white mb-8">{post.title}</h1>
         </MaskReveal>
      </div>

      <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24">
         <MaskReveal delay={200}>
            <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
               <img src={post.image} className="w-full h-full object-cover filter md:grayscale hover:grayscale-0 transition-all duration-[3s]" alt={post.title} />
            </div>
         </MaskReveal>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
         <MaskReveal delay={300}>
            <p className="text-lg md:text-2xl font-serif italic font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-16 border-l-2 border-amber-500 pl-8">
               "{post.excerpt}"
            </p>
            <div className="space-y-8 text-stone-800 dark:text-stone-300 font-medium text-base md:text-lg leading-loose">
               <p>The pursuit of horological perfection is a relentless journey, one that requires abandoning preconceived notions of what is possible within the microscopic confines of a watch case. In Dubai, a city built on the very concept of the impossible, our master watchmakers find their ultimate muse.</p>
               <p>We do not simply assemble components; we orchestrate a symphony of high-grade metallurgy, zero-tolerance precision, and centuries-old hand-finishing techniques. Every bevel, every polished screw head, and every jewel is scrutinized under immense magnification to ensure it meets the ABRECO WATCHES standard.</p>
               <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black dark:text-white mt-16 mb-8">The Relentless Pursuit</h3>
               <p>When you strap one of our timepieces to your wrist, you are not just wearing a tool for telling time. You are wearing a defiant statement. You are wearing a physical manifestation of human ingenuity and artistic obsession.</p>
               <p>Our commitment remains absolute. We will continue to source the rarest materials, employ the most talented artisans on earth, and push the boundaries of mechanical horology to its absolute limits.</p>
            </div>
         </MaskReveal>

         <div className="mt-32 pt-16 border-t border-black/10 dark:border-white/10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-500 mb-8">Share this editorial</p>
            <div className="flex justify-center gap-4">
               {['X', 'LinkedIn', 'Facebook'].map(social => (
                 <button key={social} className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black border border-black/20 dark:border-white/20 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">{social}</button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      .animate-marquee { display: flex; width: max-content; animation: marquee 20s linear infinite; }
      .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: ${theme === 'dark' ? '#3f3f46' : '#d6d3d1'}; border-radius: 4px; }
      .clip-path-full { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
      .clip-path-inset { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%); }
      * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      html { scroll-behavior: smooth; }
      body { background-color: ${theme === 'dark' ? '#000' : '#fafaf9'}; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isMenuOpen, theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Bespoke', id: 'bespoke' },
    { name: 'Blog', id: 'blog' },
    { name: 'About Us', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact Us', id: 'contact' }
  ];

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    setSelectedProduct(null); 
    setSelectedBlog(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'dark bg-black text-white' : 'bg-stone-50 text-black'} min-h-screen font-sans selection:bg-amber-500 selection:text-black flex flex-col relative transition-colors duration-1000 overflow-x-hidden`}>
      <NoiseOverlay />
      <CustomCursor />
      
      {/* Floating Capsule Dock */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[90] w-max max-w-[95vw]">
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/10 dark:border-white/20 p-1.5 md:p-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 shadow-2xl overflow-x-auto custom-scrollbar flex-nowrap">
          <div className="hidden md:flex items-center gap-2">
             {navLinks.slice(0,3).map(link => (
               <button key={link.id} onClick={() => navigateTo(link.id)} className={`relative px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black transition-colors duration-300 rounded-full flex-shrink-0 ${currentPage === link.id && !selectedProduct && !selectedBlog ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10'}`}>
                 {link.name}
               </button>
             ))}
             <div className="w-px h-8 bg-black/20 dark:bg-white/20 mx-2"></div>
          </div>
          
          <button onClick={() => setIsMenuOpen(true)} className="px-5 md:px-6 py-3 md:py-3 text-[10px] uppercase tracking-[0.2em] font-black transition-colors duration-300 rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2 flex-shrink-0">
            <Menu size={16}/> <span className="hidden sm:inline">Menu</span>
          </button>
          
          <button onClick={toggleTheme} className="p-3 md:p-3 bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors flex-shrink-0">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Brutalist Menu */}
      <div className={`fixed inset-0 z-[150] bg-stone-50 dark:bg-black transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         <div className="flex justify-between items-center p-6 md:p-12 border-b border-black/10 dark:border-white/10 bg-stone-50 dark:bg-black z-10">
            <div className="text-lg md:text-xl font-black tracking-tighter uppercase leading-none text-black dark:text-white">Main Menu</div>
            <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-black/5 dark:bg-white/10 rounded-full hover:scale-110 transition-transform text-black dark:text-white">
               <X size={24} />
            </button>
         </div>
         <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-start md:justify-center gap-4 md:gap-6 overflow-y-auto custom-scrollbar pb-32 md:pb-12">
               {navLinks.map((link, idx) => (
                  <button key={link.id} onClick={() => navigateTo(link.id)} className={`text-left text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter transition-colors flex items-center gap-3 md:gap-8 group ${currentPage === link.id && !selectedProduct && !selectedBlog ? 'text-amber-600 dark:text-amber-500' : 'text-black dark:text-white hover:text-stone-500 dark:hover:text-stone-400'}`}>
                     <span className="text-xs sm:text-sm md:text-base font-serif italic font-light opacity-40 md:opacity-0 md:group-hover:opacity-100 w-5 md:w-8 transition-opacity flex-shrink-0">0{idx+1}</span>
                     <span className="break-words flex-1">{link.name}</span>
                  </button>
               ))}
            </div>
            <div className="hidden md:flex w-1/3 bg-stone-200 dark:bg-zinc-900 border-l border-black/10 dark:border-white/10 p-12 flex-col justify-end text-black dark:text-white">
               <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">ABRECO WATCHES</h3>
               <p className="text-stone-600 dark:text-stone-400 font-medium mb-8 text-sm leading-relaxed">Mohammed Bin Rashid Blvd<br/>Downtown Dubai, UAE</p>
               <MagneticButton onClick={() => window.open('https://wa.me/971501234567', '_blank')} className="w-max px-8 py-4 text-[10px] uppercase tracking-[0.2em] border-black/20 dark:border-white/20">
                  Contact Concierge
               </MagneticButton>
            </div>
         </div>
      </div>

      {/* Top Logo */}
      <header className="absolute w-full top-0 z-50 p-6 md:p-12 pointer-events-none flex justify-between items-start mix-blend-difference text-white">
        <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none pointer-events-auto cursor-pointer" onClick={() => navigateTo('home')}>
          ABRECO<br/>
          <span className="text-[10px] tracking-[0.5em] font-medium opacity-50 block mt-2">WATCHES</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-black pointer-events-auto opacity-50">
          <MapPin size={12}/> UAE
        </div>
      </header>

      <main className="flex-grow z-10 w-full">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => { setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        ) : selectedBlog ? (
          <BlogDetail post={selectedBlog} onBack={() => { setSelectedBlog(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        ) : (
          <>
            {currentPage === 'home' && <Home setPage={navigateTo} openModal={(p) => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} openBlog={(p) => { setSelectedBlog(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {currentPage === 'products' && <Products openModal={(p) => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {currentPage === 'about' && <AboutUs />}
            {currentPage === 'bespoke' && <Bespoke />}
            {currentPage === 'blog' && <Blog openBlog={(p) => { setSelectedBlog(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
            {currentPage === 'faq' && <FAQ />}
            {currentPage === 'contact' && <ContactUs />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 text-black dark:bg-black dark:text-white pt-24 md:pt-32 pb-40 md:pb-48 px-6 md:px-12 border-t border-black/10 dark:border-white/10 relative z-10 overflow-hidden">
        <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6">ABRECO</h2>
            <p className="text-sm md:text-base font-medium text-stone-500 dark:text-stone-400 max-w-md mb-10 md:mb-12 leading-relaxed">
              Uncompromising horological luxury, engineered for the future in the heart of the Emirates.
            </p>
            <div className="flex gap-3 md:gap-4 flex-wrap">
              {['IG', 'X', 'IN'].map(social => (
                <a key={social} href="#" className="text-[10px] uppercase tracking-[0.2em] font-black border border-black/20 dark:border-white/20 px-5 py-3 md:px-6 md:py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">{social}</a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-6 lg:col-span-3">
             <h4 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-6 md:mb-8 font-black">Maison Directory</h4>
             <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-black uppercase tracking-widest">
               {navLinks.slice(1,6).map(link => (
                 <li key={link.id}><button onClick={() => navigateTo(link.id)} className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center gap-2 group">{link.name} <ArrowUpRight size={12} className="opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity"/></button></li>
               ))}
             </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-3">
             <h4 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-6 md:mb-8 font-black">Private List</h4>
             <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">Subscribe to gain access to exclusive releases and viewing events.</p>
             <div className="relative border-b border-black/30 dark:border-white/30 pb-2 flex group">
               <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent w-full text-xs font-black tracking-widest outline-none text-black dark:text-white placeholder-stone-400 dark:placeholder-stone-600 uppercase" />
               <button className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors p-2 -mr-2"><ArrowRight size={16}/></button>
             </div>
          </div>
        </div>
        <div className="max-w-[100rem] mx-auto mt-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-500 dark:text-stone-500">© 2026 ABRECO WATCHES. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}