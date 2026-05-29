"use client"


import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronLeft, ChevronRight, Clock, MapPin, 
  Phone, Mail, Instagram, Facebook, Twitter, Star, 
  ChefHat, Utensils, CalendarDays, ArrowRight, Quote,
  Wine, Coffee, GlassWater, Lock, Edit2, Trash2, Plus, LogOut, Upload,
  Users, Image as ImageIcon, BookOpen, CheckCircle, Tag
} from 'lucide-react';

// --- DATA & CONTENT ---

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'About Us' },
  { id: 'team', label: 'Our Team' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'blog', label: 'Journal' },
  { id: 'reservations', label: 'Reservations' },
  { id: 'contact', label: 'Contact' }
];

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070",
    title: "A Symphony of Flavors",
    subtitle: "Experience modern gastronomy in the heart of the city.",
    cta: "Explore Menu",
    ctaLink: "menu"
  },
  {
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2070",
    title: "Elegance in Every Bite",
    subtitle: "Curated ingredients, masterful execution, unforgettable moments.",
    cta: "Book a Table",
    ctaLink: "reservations"
  },
  {
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1974",
    title: "The Art of Fine Dining",
    subtitle: "Where culinary tradition meets bold innovation.",
    cta: "Our Story",
    ctaLink: "about"
  }
];

let MENU_CATEGORIES = [
  {
    category: "Starters",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1541525048530-58957bdcd554?auto=format&fit=crop&q=80&w=800",
    items: [
      { name: "Truffle Arancini", description: "Crispy risotto balls, wild mushroom, black truffle aioli, parmesan tuile.", price: "AED 18", image: "https://images.unsplash.com/photo-1541525048530-58957bdcd554?auto=format&fit=crop&q=80&w=600" },
      { name: "Wagyu Beef Carpaccio", description: "Thinly sliced wagyu, caper berries, pickled shallots, quail egg, mustard emulsion.", price: "AED 24", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
      { name: "Seared Scallops", description: "Hokkaido scallops, cauliflower purée, crispy pancetta, brown butter, sage.", price: "AED 22", image: "https://images.unsplash.com/photo-1599084942896-675e73122f87?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    category: "Main Courses",
    icon: ChefHat,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
    items: [
      { name: "Pan-Roasted Halibut", description: "Wild-caught halibut, saffron risotto, charred asparagus, lemon-caper beurre blanc.", price: "AED 42", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600" },
      { name: "Dry-Aged Ribeye", description: "14oz prime ribeye, bone marrow crust, potato mille-feuille, seasonal greens, red wine jus.", price: "AED 65", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600" },
      { name: "Duck Breast à l'Orange", description: "Spiced duck breast, sweet potato fondant, braised endive, Grand Marnier glaze.", price: "AED 48", image: "https://images.unsplash.com/photo-1628191138865-c8c3666fddcd?auto=format&fit=crop&q=80&w=600" },
      { name: "Wild Mushroom Risotto", description: "Arborio rice, porcini, chanterelles, cashew cream, vegan parmesan, truffle oil.", price: "AED 34", image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    category: "Desserts",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800",
    items: [
      { name: "Dark Chocolate Sphere", description: "Valrhona chocolate, hazelnut praline, vanilla bean ice cream, warm caramel pour.", price: "AED 16", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600" },
      { name: "Lemon Basil Tart", description: "Meyer lemon curd, basil meringue, butter pastry, raspberry coulis.", price: "AED 14", image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    category: "Cocktails",
    icon: GlassWater,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    items: [
      { name: "Smoked Old Fashioned", description: "Kentucky Bourbon, hickory smoke, angostura bitters, flamed orange peel.", price: "AED 22", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" },
      { name: "The Mother Martini", description: "Botanical Gin, dry vermouth, olive oil wash, Mediterranean sea salt.", price: "AED 20", image: "https://images.unsplash.com/photo-1575037614876-c3858d44ea04?auto=format&fit=crop&q=80&w=600" }
    ]
  },
  {
    category: "Wine List",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    items: [
      { name: "Cabernet Sauvignon", description: "Napa Valley, 2018. Full-bodied, notes of dark fruit, oak, and vanilla.", price: "AED 28 / gls", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600" },
      { name: "Chablis Grand Cru", description: "Burgundy, France, 2020. Crisp, mineral-driven with bright citrus notes.", price: "AED 24 / gls", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600" }
    ]
  }
];

let TESTIMONIALS = [
  { name: "Eleanor Sterling", role: "Food Critic", text: "An absolute revelation. The attention to detail in every dish is unparalleled. The Mother is setting a new standard for modern gastronomy.", rating: 5 },
  { name: "Marcus Thorne", role: "Local Guide", text: "From the dramatic ambiance to the final dessert course, everything was flawless. The Wagyu Carpaccio is a definitive must-try.", rating: 5 },
  { name: "Sophia Lin", role: "Gastronomer", text: "A theatrical dining experience that doesn't compromise on flavor. The perfect, intimate venue for truly special occasions.", rating: 5 }
];

let GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
];

let BLOG_POSTS = [
  { 
    id: 1, 
    title: "The Art of Dry Aging", 
    excerpt: "Discover our meticulous 45-day dry-aging process that gives our ribeye its signature depth of flavor.", 
    date: "Oct 12, 2023", 
    author: "Chef Sterling", 
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800",
    content: [
      "At The Mother, we believe that time is an ingredient just as crucial as salt or heat. Our signature 14oz prime ribeye isn't simply sourced and seared; it undergoes a transformative 45-day journey in our custom-built, climate-controlled dry-aging chamber.",
      "During this meticulously monitored process, natural enzymes break down the tough muscle tissue, resulting in unparalleled tenderness. Simultaneously, the loss of moisture concentrates the meat's natural flavors, producing the dense, deeply savory, and slightly nutty profile that our regulars have come to crave.",
      "The environment inside the chamber is calibrated to exact specifications: a constant 34°F (1°C) with 85% humidity, aided by blocks of Himalayan pink salt that naturally purify the air and impart a subtle seasoning over time.",
      "When an aged cut finally reaches the kitchen, it requires absolute respect. We reverse-sear it to a perfect medium-rare and finish it under a 1500°F broiler with a rich bone marrow crust. It is a labor of love, patience, and science—a true testament to our culinary philosophy."
    ]
  },
  { 
    id: 2, 
    title: "Spring Menu Unveiled", 
    excerpt: "Embracing the season's vibrant produce with innovative new dishes featuring local asparagus and morel mushrooms.", 
    date: "Mar 05, 2024", 
    author: "Culinary Team", 
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
    content: [
      "As the frost thaws and the earth awakens, so too does the culinary imagination at The Mother. Our new Spring menu is a celebration of rebirth, heavily inspired by the vibrant, fleeting produce sourced directly from our local farming partners.",
      "This season, we are spotlighting the delicate complexity of white asparagus, paired with rich, earthy morel mushrooms foraged just miles from the city limits. One of our standout additions is a velvety asparagus velouté, poured table-side over a slow-poached quail egg and crispy pancetta.",
      "Our seafood offerings have also shifted to embrace the season. The Pan-Roasted Halibut now sits atop a bright, herbaceous saffron risotto, cut with a sharp lemon-caper beurre blanc that perfectly balances the dish's richness.",
      "Join us this season to experience plates that are as visually stunning as they are palate-awakening. The Spring menu will be available exclusively through the end of June."
    ]
  },
  { 
    id: 3, 
    title: "Mastering the Perfect Pair", 
    excerpt: "Our head sommelier shares insights on matching our robust main courses with the perfect vintage.", 
    date: "Jan 22, 2024", 
    author: "Sommelier Davis", 
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    content: [
      "The intersection of food and wine is where a meal elevates from sustenance to a symphony. A thoughtful pairing does not merely wash down a bite; it highlights hidden notes in the dish while the food, in turn, softens or amplifies the characteristics of the wine.",
      "Take, for example, our Dry-Aged Ribeye. A steak of this magnitude, with its rich bone marrow crust and deep umami profile, demands a wine that can stand up to its intensity without being overshadowed. I often reach for a structured, tannin-rich Cabernet Sauvignon from the Napa Valley. The tannins bind with the proteins in the meat, cleansing the palate, while the wine's dark fruit notes complement the smoky char of the beef.",
      "Conversely, our delicate Seared Scallops require a lighter touch. A Chablis Grand Cru, with its razor-sharp acidity and profound minerality, slices through the rich cauliflower purée and brown butter, elevating the subtle sweetness of the scallop itself.",
      "The true joy of my role at The Mother is guiding our guests through these discoveries. Never hesitate to ask for a pairing recommendation—it is often the key to unlocking the full potential of your dining experience."
    ]
  }
];

let OFFERS = [
  {
    id: 1,
    title: "Early Evening Tasting",
    description: "Experience our signature 5-course tasting menu at a special rate when booking between 17:30 and 18:30.",
    price: "AED 145",
    originalPrice: "AED 185",
    tag: "Daily",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Sommelier's Selection",
    description: "Enjoy complimentary premium wine pairings hand-selected by Julian Davis with any main course ordered.",
    price: "Complimentary Pairing",
    originalPrice: null,
    tag: "Thursdays",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Weekend Champagne Brunch",
    description: "Elevate your weekend with our exclusive 3-course brunch featuring free-flowing artisanal champagne.",
    price: "AED 220",
    originalPrice: null,
    tag: "Weekends",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800"
  }
];

let TEAM_MEMBERS = [
  { name: "Alexander Sterling", role: "Executive Chef", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800" },
  { name: "Julian Davis", role: "Head Sommelier", image: "https://images.unsplash.com/photo-1559832269-e14b8f52f8ce?auto=format&fit=crop&q=80&w=800" },
  { name: "Elena Rostova", role: "Pastry Chef", image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800" }
];

let RESERVATIONS_LIST = [
  { id: 1, name: "Alexander Wright", email: "alex@example.com", date: "2026-10-15", guests: "2 People", timeFrom: "19:00", requests: "Anniversary dinner" },
  { id: 2, name: "Sarah Jenkins", email: "sarah@example.com", date: "2026-10-16", guests: "4 People", timeFrom: "20:00", requests: "Window seat preferred" }
];

// --- COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', type = "button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-sm font-medium transition-all duration-300 tracking-wider uppercase rounded-sm";
  const variants = {
    primary: "border-[#B46B61] bg-[#B46B61] text-white hover:bg-[#C77C72] hover:border-[#C77C72] shadow-[0_0_15px_rgba(180,107,97,0.2)] hover:shadow-[0_0_25px_rgba(180,107,97,0.4)]",
    outline: "border-[#B46B61] text-[#B46B61] hover:bg-[#B46B61] hover:text-white",
    ghost: "border-transparent text-zinc-300 hover:text-[#B46B61]"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 md:mb-20 px-4">
    <p className="text-[#B46B61] font-serif italic tracking-[0.2em] text-xs md:text-sm mb-3 md:mb-4 uppercase">{subtitle}</p>
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white">{title}</h2>
    <div className="h-px w-16 md:w-24 bg-[#B46B61]/50 mx-auto mt-6 md:mt-8"></div>
  </div>
);

// --- PAGES ---

const HomePage = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);

  const [offerDragStartX, setOfferDragStartX] = useState(null);
  const [offerDragDistance, setOfferDragDistance] = useState(0);
  const [testDragStartX, setTestDragStartX] = useState(null);
  const [testDragDistance, setTestDragDistance] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length), 7000);
    const testimonialTimer = setInterval(() => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length), 6000);
    const offerTimer = setInterval(() => setCurrentOffer((prev) => (prev + 1) % OFFERS.length), 8000);
    return () => { clearInterval(heroTimer); clearInterval(testimonialTimer); clearInterval(offerTimer); };
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));

  const nextOffer = () => setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
  const prevOffer = () => setCurrentOffer((prev) => (prev === 0 ? OFFERS.length - 1 : prev - 1));

  const handleOfferDragStart = (e) => setOfferDragStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  const handleOfferDragMove = (e) => {
    if (offerDragStartX === null) return;
    setOfferDragDistance((e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - offerDragStartX);
  };
  const handleOfferDragEnd = () => {
    if (offerDragStartX === null) return;
    if (offerDragDistance < -50) nextOffer();
    else if (offerDragDistance > 50) prevOffer();
    setOfferDragStartX(null);
    setOfferDragDistance(0);
  };
  
  const handleTestDragStart = (e) => setTestDragStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  const handleTestDragMove = (e) => {
    if (testDragStartX === null) return;
    setTestDragDistance((e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - testDragStartX);
  };
  const handleTestDragEnd = () => {
    if (testDragStartX === null) return;
    if (testDragDistance < -50) nextTestimonial();
    else if (testDragDistance > 50) prevTestimonial();
    setTestDragStartX(null);
    setTestDragDistance(0);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-black">
      {/* Hero Slider */}
      <div className="relative h-[100svh] w-full overflow-hidden bg-black">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-black/60 z-10" /> 
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-10" />
            
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center mt-12 md:mt-0">
              <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <p className="text-[#B46B61] font-serif italic tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mb-4 md:mb-6 uppercase">
                  Love is her secret ingredient
                </p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-6 md:mb-8 tracking-tighter drop-shadow-2xl leading-[1.1] md:leading-[1.05] px-2">
                  {slide.title}
                </h1>
              </div>
              <div className={`transform transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <p className="text-sm sm:text-base md:text-xl text-zinc-300 mb-8 md:mb-12 max-w-sm sm:max-w-xl md:max-w-2xl mx-auto font-light tracking-widest leading-relaxed uppercase px-4">
                  {slide.subtitle}
                </p>
              </div>
              <div className={`transform transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <Button onClick={() => navigate(slide.ctaLink)} variant="primary" className="py-3 px-8 md:py-4 md:px-10 text-xs md:text-sm tracking-[0.2em] transition-all duration-500 backdrop-blur-sm">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-3 md:space-x-6">
          {HERO_SLIDES.map((_, idx) => (
            <div key={idx} className="w-10 md:w-16 h-[2px] bg-zinc-800 relative overflow-hidden cursor-pointer" onClick={() => setCurrentSlide(idx)}>
              <div className={`absolute top-0 left-0 h-full bg-white transition-all ease-linear ${idx === currentSlide ? 'w-full duration-[7000ms]' : 'w-0 duration-0'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Category Cards Section */}
      <section className="py-20 md:py-32 bg-[#050505] px-4 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Collections" title="Explore By Category" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {MENU_CATEGORIES.map((cat, i) => (
              <div key={i} onClick={() => navigate('menu', cat.category)} className="group relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl cursor-pointer bg-[#0a0a0a] border border-white/5 shadow-2xl">
                <img src={cat.image} alt={cat.category} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-colors duration-500 group-hover:from-black/90" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-[#B46B61]/20 flex items-center justify-center mb-3 md:mb-4 text-[#B46B61] group-hover:bg-[#B46B61] group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(180,107,97,0.1)]">
                    {cat.icon && typeof cat.icon === 'object' ? <cat.icon size={20} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" /> : <Utensils size={20}/>}
                  </div>
                  <h3 className="text-zinc-100 text-sm sm:text-base md:text-lg font-light tracking-widest uppercase text-center">{cat.category}</h3>
                  <div className="h-[1px] w-0 bg-[#B46B61] mt-3 transition-all duration-500 group-hover:w-8 md:group-hover:w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-32 bg-black px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/10 via-black to-black pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle subtitle="Our Signatures" title="Featured Creations" />
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 text-zinc-400 font-light leading-relaxed text-base md:text-lg px-4">
            Every plate at The Mother is a deliberate canvas. Our executive chefs blend seasonal, locally sourced ingredients with avant-garde techniques to create dishes that consistently delight the senses.
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {[
              { img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800", title: "Dry-Aged Ribeye", desc: "14oz prime ribeye with bone marrow crust, aged 45 days in-house." },
              { img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", title: "Seared Scallops", desc: "Hokkaido scallops with cauliflower purée, brown butter, and crisp sage." },
              { img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800", title: "Dark Chocolate Sphere", desc: "Valrhona chocolate with warm caramel pour and hazelnut praline." }
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col items-center cursor-pointer w-full" onClick={() => navigate('menu')}>
                <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl relative shadow-2xl border border-white/5">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                </div>
                
                <div className="w-[85%] md:w-[90%] -mt-20 md:-mt-24 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] transform transition-all duration-500 group-hover:-translate-y-4 group-hover:border-[#B46B61]/30 group-hover:bg-[#0f0f0f]/90">
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#B46B61]/50 rounded-full transition-all duration-500 group-hover:w-16 group-hover:bg-[#B46B61]"></div>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-2 md:mb-3 text-center tracking-wide">{item.title}</h3>
                  <p className="text-zinc-400 font-light text-xs md:text-sm text-center mb-5 md:mb-6 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-center">
                    <button className="text-[#B46B61] hover:text-[#C77C72] transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium flex items-center gap-2 group/btn">
                      Discover <ArrowRight size={14} className="transform transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-20 md:py-32 bg-black px-4 relative overflow-hidden border-t border-white/5">
        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B46B61]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle subtitle="Exclusives" title="Current Offers" />
          <div className="relative mt-12 md:mt-16">
            <div 
              className="overflow-hidden px-2 md:px-12 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleOfferDragStart} onTouchMove={handleOfferDragMove} onTouchEnd={handleOfferDragEnd}
              onMouseDown={handleOfferDragStart} onMouseMove={handleOfferDragMove} onMouseUp={handleOfferDragEnd} onMouseLeave={handleOfferDragEnd}
            >
              <div 
                className="flex ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ 
                  transform: `translateX(calc(-${currentOffer * 100}% + ${offerDragDistance}px))`,
                  transitionProperty: 'transform',
                  transitionDuration: offerDragStartX !== null ? '0ms' : '1000ms'
                }}
              >
                {OFFERS.map((offer) => (
                  <div key={offer.id} className="w-full flex-shrink-0 px-2 md:px-4 flex justify-center pointer-events-none">
                    <div className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#B46B61]/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl w-full max-w-5xl pointer-events-auto">
                      <div className="h-64 md:h-auto md:w-1/2 overflow-hidden relative shrink-0">
                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-90" />
                        <div className="absolute top-6 left-6 bg-[#B46B61] text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-[0_0_15px_rgba(180,107,97,0.4)] z-10">
                          {offer.tag}
                        </div>
                      </div>
                      <div className="p-8 md:p-12 lg:p-16 flex flex-col flex-grow relative bg-[#0a0a0a] justify-center md:w-1/2">
                        <h3 className="text-2xl md:text-4xl text-white font-light mb-4">{offer.title}</h3>
                        <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed mb-10">{offer.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                          <div className="flex flex-col">
                            {offer.originalPrice && <span className="text-zinc-600 line-through text-[10px] md:text-xs mb-1">{offer.originalPrice}</span>}
                            <span className="text-[#B46B61] font-medium tracking-wider text-lg md:text-2xl">{offer.price}</span>
                          </div>
                          <button onClick={() => navigate('reservations')} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#B46B61] hover:bg-[#B46B61] hover:text-white hover:border-[#B46B61] transition-all duration-300 group/btn shrink-0">
                            <ArrowRight size={20} className="transform transition-transform group-hover/btn:-rotate-45" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevOffer} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#B46B61] hover:text-white hover:border-[#B46B61] transition-all shadow-xl hidden md:block group">
              <ChevronLeft size={24} strokeWidth={1.5} className="transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextOffer} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#B46B61] hover:text-white hover:border-[#B46B61] transition-all shadow-xl hidden md:block group">
              <ChevronRight size={24} strokeWidth={1.5} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
            <div className="flex justify-center space-x-2 md:space-x-3 mt-10 md:mt-12">
              {OFFERS.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentOffer(idx)} className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${idx === currentOffer ? 'bg-[#B46B61] w-8 md:w-12 shadow-[0_0_10px_rgba(180,107,97,0.5)]' : 'bg-zinc-800 w-2 md:w-3 hover:bg-zinc-600'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-[#030303] px-4 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-[#B46B61]/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Guest Experiences" title="Voices of The Mother" />
          <div className="relative mt-12 md:mt-20">
            <div 
              className="overflow-hidden px-2 md:px-16 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTestDragStart} onTouchMove={handleTestDragMove} onTouchEnd={handleTestDragEnd}
              onMouseDown={handleTestDragStart} onMouseMove={handleTestDragMove} onMouseUp={handleTestDragEnd} onMouseLeave={handleTestDragEnd}
            >
              <div 
                className="flex ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ 
                  transform: `translateX(calc(-${currentTestimonial * 100}% + ${testDragDistance}px))`,
                  transitionProperty: 'transform',
                  transitionDuration: testDragStartX !== null ? '0ms' : '1000ms'
                }}
              >
                {TESTIMONIALS.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2 md:px-8">
                    <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 p-8 md:p-16 lg:p-20 flex flex-col items-center text-center relative rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.8)] overflow-hidden group pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B46B61]/30 to-transparent"></div>
                      <Quote className="absolute top-6 left-6 md:top-12 md:left-12 text-[#B46B61]/10 transform -scale-x-100" size={48} />
                      <Quote className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-[#B46B61]/10" size={48} />
                      <div className="flex mb-6 md:mb-10 gap-1.5 relative z-10">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} size={16} className="text-[#B46B61] fill-[#B46B61] drop-shadow-[0_0_8px_rgba(180,107,97,0.5)] md:w-5 md:h-5" />
                        ))}
                      </div>
                      <p className="text-lg sm:text-xl md:text-3xl text-zinc-200 font-serif italic mb-8 md:mb-12 leading-relaxed max-w-4xl relative z-10 px-4 md:px-0">
                        "{testimonial.text}"
                      </p>
                      <div className="pt-6 relative z-10 flex flex-col items-center">
                        <div className="w-8 md:w-12 h-[1px] bg-[#B46B61] mb-4 md:mb-6"></div>
                        <h4 className="text-zinc-50 font-medium tracking-widest uppercase text-xs md:text-sm">{testimonial.name}</h4>
                        <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#B46B61] hover:text-white hover:border-[#B46B61] transition-all shadow-xl hidden md:block group">
              <ChevronLeft size={24} strokeWidth={1.5} className="transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#B46B61] hover:text-white hover:border-[#B46B61] transition-all shadow-xl hidden md:block group">
              <ChevronRight size={24} strokeWidth={1.5} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="flex justify-center space-x-2 md:space-x-3 mt-10 md:mt-16">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${idx === currentTestimonial ? 'bg-[#B46B61] w-8 md:w-12 shadow-[0_0_10px_rgba(180,107,97,0.5)]' : 'bg-zinc-800 w-2 md:w-3 hover:bg-zinc-600'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 md:py-32 bg-black px-4 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Visual Tasting" title="A Glimpse Inside" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-16">
            {GALLERY_IMAGES.slice(0, 4).map((src, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('gallery')} 
                className="group relative overflow-hidden aspect-square md:aspect-[4/5] bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl cursor-pointer shadow-xl"
              >
                <img src={src} alt={`Gallery preview ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#B46B61]/0 group-hover:bg-[#B46B61]/10 transition-colors duration-500 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-xl"><Plus size={20} /></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={() => navigate('gallery')} variant="outline" className="px-8 py-3.5 md:px-10 md:py-4 rounded-xl text-xs md:text-sm group flex items-center mx-auto">
              View Full Gallery <ArrowRight size={14} className="ml-2 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Journal Preview Section */}
      <section className="py-20 md:py-32 bg-[#050505] px-4 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="News & Stories" title="The Journal" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article key={post.id} onClick={() => navigate('journal-detail', post.id)} className="bg-[#0a0a0a] border border-white/5 group overflow-hidden flex flex-col rounded-3xl shadow-2xl hover:border-[#B46B61]/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="h-48 md:h-56 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center justify-between text-[10px] md:text-xs font-medium text-[#B46B61] tracking-[0.15em] uppercase mb-4">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl text-white font-light mb-4 group-hover:text-[#B46B61] transition-colors line-clamp-1">{post.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed text-xs md:text-sm mb-8 flex-grow line-clamp-2">{post.excerpt}</p>
                  <button className="flex items-center text-[#B46B61] hover:text-[#C77C72] transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mt-auto group/btn">
                    Read Article <ArrowRight size={14} className="ml-2 transform transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => navigate('blog')} variant="outline" className="px-8 py-3.5 md:px-10 md:py-4 rounded-xl text-xs md:text-sm group flex items-center mx-auto">
              Read All Stories <BookOpen size={14} className="ml-2 opacity-70" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ambiance Parallax */}
      <section className="relative py-24 md:py-48 bg-black flex items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover grayscale" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90"></div>
        <div className="relative z-10 text-center max-w-5xl px-4 w-[90%] md:w-full bg-black/50 p-8 md:p-24 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl">
          <ChefHat size={40} className="mx-auto text-[#B46B61] mb-6 md:mb-10 md:w-12 md:h-12" strokeWidth={1} />
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-10 leading-tight md:leading-tight tracking-tight px-2 md:px-0">
            "Cooking is an art of subtraction. We strip away the unnecessary until only the essence of flavor remains."
          </h2>
          <p className="text-sm md:text-xl text-[#B46B61]/80 font-serif italic mb-10 md:mb-16">— Executive Chef Alexander Sterling</p>
          <Button onClick={() => navigate('about')} variant="primary" className="px-8 py-3 md:px-12 md:py-4 text-xs md:text-sm">Discover Our Story</Button>
        </div>
      </section>
    </div>
  );
};

const MenuPage = ({ activeTab, setActiveTab }) => {
  const activeSection = MENU_CATEGORIES.find(s => s.category === activeTab) || MENU_CATEGORIES[0];
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (category) => {
    if (category === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(category);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle subtitle="Culinary Journey" title="Our Menu" />
        
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-zinc-400 font-light text-base md:text-xl leading-relaxed">
            Our menu is a living document, evolving with the seasons and reflecting the micro-climates of our trusted local purveyors. We invite you to explore a symphony of textures, temperatures, and tastes designed to provoke thought and inspire joy.
          </p>
        </div>
        
        {/* MOBILE WRAPPING FIX FOR TABS */}
        <div className="flex justify-center w-full mb-20 md:mb-28 relative z-20 px-2 sm:px-0">
          <div className="flex flex-wrap justify-center gap-2 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full md:w-auto max-w-full">
            {MENU_CATEGORIES.map((section, idx) => (
              <button
                key={idx}
                onClick={() => handleTabChange(section.category)}
                className={`relative flex items-center justify-center gap-2 md:gap-3 flex-grow md:flex-grow-0 px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-full text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 whitespace-nowrap overflow-hidden ${
                  activeTab === section.category ? 'text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {activeTab === section.category && (
                  <div className="absolute inset-0 bg-[#B46B61] rounded-xl md:rounded-full transition-all duration-500 -z-10 shadow-[0_0_20px_rgba(180,107,97,0.4)]"></div>
                )}
                {section.icon && typeof section.icon === 'object' ? <section.icon size={18} strokeWidth={activeTab === section.category ? 2 : 1.5} className={`relative z-10 ${activeTab === section.category ? 'text-white' : 'text-[#B46B61]'} transition-colors duration-500`} /> : <Utensils size={18} className={`relative z-10 ${activeTab === section.category ? 'text-white' : 'text-[#B46B61]'}`}/>}
                <span className="relative z-10">{section.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-20 md:mb-32 relative rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-[3s]" alt="Tasting Menu" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-[#B46B61]/20"></div>
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#B46B61]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
          </div>
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-10 lg:mb-0 max-w-2xl">
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-6 w-full">
                <span className="w-8 h-[1px] bg-[#B46B61]"></span>
                <span className="text-[#B46B61] text-xs font-medium tracking-[0.2em] uppercase">Signature Experience</span>
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl text-white font-light mb-6 tracking-wide">The Chef's Tasting</h3>
              <p className="text-zinc-300 font-light text-base md:text-lg leading-relaxed">
                Surrender to the kitchen. An immersive 7-course journey through our seasonal highlights, meticulously paired with rare vintages from our award-winning cellar.
              </p>
            </div>
            
            <div className="bg-[#050505]/40 backdrop-blur-2xl p-8 md:p-10 border border-white/10 rounded-[2rem] shrink-0 w-full lg:w-auto text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#B46B61] to-transparent"></div>
              <span className="text-4xl md:text-5xl text-white font-light block mb-2">AED 185</span>
              <span className="text-sm text-zinc-400 font-light tracking-widest uppercase mb-6 block">Per Guest</span>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
              <span className="text-[10px] md:text-xs text-[#B46B61] tracking-[0.2em] uppercase block font-medium flex items-center justify-center gap-2">
                <Wine size={16} /> Optional Wine Pairing +AED 95
              </span>
            </div>
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-10">
            {activeSection?.items.map((item, itemIdx) => (
              <div key={itemIdx} className="group flex flex-col sm:flex-row gap-6 md:gap-8 p-4 md:p-6 -mx-4 md:-mx-6 rounded-3xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-500">
                <div className="w-full sm:w-40 md:w-48 aspect-square shrink-0 overflow-hidden rounded-2xl relative shadow-xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col justify-center flex-grow pt-2 sm:pt-0">
                  <div className="flex justify-between items-baseline mb-4 w-full">
                    <h4 className="text-xl md:text-2xl text-white font-light group-hover:text-[#B46B61] transition-colors duration-300">{item.name}</h4>
                    <div className="flex-grow border-b-2 border-dotted border-white/20 mx-4 relative top-[-6px] hidden sm:block group-hover:border-[#B46B61]/40 transition-colors duration-300"></div>
                    <span className="text-lg md:text-xl text-[#B46B61] font-medium tracking-wider whitespace-nowrap pl-2 sm:pl-0">{item.price}</span>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base pr-0 sm:pr-4">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 md:mt-32 text-center p-10 md:p-16 border border-white/5 bg-[#050505] rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#B46B61] to-transparent"></div>
          <p className="text-zinc-300 font-light text-base md:text-lg mb-4 md:mb-5 tracking-wide">
            We accommodate most dietary restrictions. Please inform your server of any allergies.
          </p>
          <p className="text-[#B46B61] text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
            A 20% gratuity is added to parties of 6 or more.
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="The Legacy" title="About The Mother" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-32">
        <div className="relative group px-4 md:px-0">
          <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000" alt="Chef preparing food" className="w-full h-[400px] md:h-[700px] object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] shadow-2xl rounded-2xl md:rounded-3xl border border-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 rounded-2xl md:rounded-3xl" />
          <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 w-40 h-40 md:w-64 md:h-64 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 md:p-8 flex flex-col justify-center items-center text-center shadow-[0_10px_50px_rgba(0,0,0,0.8)] transform group-hover:-translate-y-4 transition-transform duration-700 rounded-2xl md:rounded-3xl">
            <Star className="text-[#B46B61] mb-2 md:mb-4 w-6 h-6 md:w-10 md:h-10" />
            <h4 className="text-white text-lg md:text-2xl font-light mb-1 md:mb-2">Michelin Star</h4>
            <p className="text-zinc-400 text-[8px] md:text-xs tracking-[0.2em] uppercase">Awarded 23' & 24'</p>
          </div>
        </div>
        <div className="space-y-6 md:space-y-8 text-zinc-300 font-light text-base md:text-lg leading-relaxed mt-12 lg:mt-0">
          <p className="text-xl md:text-2xl text-white font-serif italic border-l-2 md:border-l-4 border-[#B46B61] pl-4 md:pl-6 py-2">
            "Love is her secret ingredient. We do not merely serve food; we craft temporal art meant to be consumed and remembered."
          </p>
          <p>Founded in 2018 by visionary culinary artist Alexander Sterling, <span className="text-white font-medium">The Mother</span> was born out of a profound desire to create a dining experience that challenges the senses while deeply respecting classical culinary traditions.</p>
          <p>Our philosophy is rigorously simple yet endlessly complex in execution: we source the absolute finest ingredients from ethical, local purveyors, treat them with absolute respect, and present them in ways that surprise, delight, and provoke conversation.</p>
          <p>Every dish is a narrative, constructed meticulously to guide our guests through a sensory journey. From the crisp bite of locally foraged greens to the rich, slow-developed umami of our 45-day dry-aged cuts, we believe that fine dining is not merely about sustenance, but about crafting indelible memories.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 bg-[#0a0a0a] p-8 md:p-16 lg:p-20 border border-white/5 rounded-3xl shadow-2xl">
        <div>
          <h3 className="text-2xl md:text-3xl text-white font-light mb-4 md:mb-6 flex items-center">
            <span className="w-6 md:w-8 h-[2px] bg-[#B46B61] mr-3 md:mr-4"></span> The Architecture
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6 text-sm md:text-lg">The physical space of The Mother acts as the perfect canvas. Intentionally dark, intimate, and moody, our dining room strips away external distractions. Designed by award-winning architectural firm Studio V, the space uses raw concrete, scorched wood, and subtle earthy lighting to create a cocoon of culinary focus.</p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl text-white font-light mb-4 md:mb-6 flex items-center">
            <span className="w-6 md:w-8 h-[2px] bg-[#B46B61] mr-3 md:mr-4"></span> Sustainable Sourcing
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6 text-sm md:text-lg">Great food begins in the soil and the sea. We maintain direct relationships with over 40 independent farmers, foragers, and fishermen within a 100-mile radius. Our commitment to sustainability isn't a marketing tool; it is the fundamental baseline of our operations. We operate a true zero-waste kitchen.</p>
        </div>
      </div>
    </div>
  </div>
);

const TeamPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="The Artisans" title="Meet Our Team" />
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 text-zinc-400 font-light leading-relaxed text-base md:text-lg">
        The visionaries behind The Mother's culinary excellence. Our team brings together decades of experience from the world's most celebrated kitchens, united by a passion for perfection and innovation.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
        {TEAM_MEMBERS.map((member, i) => (
          <div key={i} className="group text-center">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden mb-6 md:mb-8 border-[6px] border-[#0a0a0a] group-hover:border-[#B46B61]/50 transition-colors duration-700 shadow-2xl relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110" />
            </div>
            <h4 className="text-xl md:text-2xl text-white font-light tracking-wide mb-2">{member.name}</h4>
            <div className="h-[1px] w-8 bg-[#B46B61] mx-auto mb-2 opacity-50"></div>
            <p className="text-[#B46B61] text-xs tracking-[0.2em] uppercase font-medium">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GalleryPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="Visual Tasting" title="Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {GALLERY_IMAGES.map((src, idx) => (
          <div key={idx} className="group relative overflow-hidden aspect-[4/3] bg-[#0a0a0a] border border-white/5 rounded-2xl cursor-pointer shadow-xl">
            <img src={src} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[#B46B61]/0 group-hover:bg-[#B46B61]/10 transition-colors duration-500 mix-blend-overlay" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BlogPage = ({ navigate }) => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="News & Stories" title="The Journal" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} onClick={() => navigate('journal-detail', post.id)} className="bg-[#0a0a0a] border border-white/5 group overflow-hidden flex flex-col rounded-3xl shadow-2xl hover:border-[#B46B61]/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="h-56 md:h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center justify-between text-[10px] md:text-xs font-medium text-[#B46B61] tracking-[0.15em] uppercase mb-4">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h3 className="text-xl md:text-2xl text-white font-light mb-4 group-hover:text-[#B46B61] transition-colors">{post.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-xs md:text-sm mb-8 flex-grow">{post.excerpt}</p>
              <button className="flex items-center text-[#B46B61] hover:text-[#C77C72] transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mt-auto group/btn">
                Read Article <ArrowRight size={14} className="ml-2 transform transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const JournalDetailPage = ({ postId, navigate }) => {
  const post = BLOG_POSTS.find(p => p.id === postId) || BLOG_POSTS[0];
  useEffect(() => { window.scrollTo(0, 0); }, [postId]);

  return (
    <div className="animate-in fade-in duration-700 bg-black min-h-screen pb-24">
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-black z-10" />
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-50 transform scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
        <div className="relative z-30 w-full max-w-4xl mx-auto px-4 pb-12 md:pb-20">
          <button onClick={() => navigate('blog')} className="flex items-center text-[#B46B61] hover:text-[#C77C72] transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mb-8 md:mb-12 group">
            <ChevronLeft size={16} className="mr-2 transform transition-transform group-hover:-translate-x-1" /> Back to Journal
          </button>
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-[#B46B61] tracking-[0.15em] uppercase mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight drop-shadow-2xl mb-6">{post.title}</h1>
          <div className="w-24 h-[2px] bg-[#B46B61]"></div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 relative z-30">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 rounded-3xl shadow-2xl -mt-32 relative z-40">
          <div className="absolute -top-6 right-10 text-[#B46B61]/10 hidden md:block"><Quote size={120} className="transform rotate-180" /></div>
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-light leading-relaxed space-y-8">
            <p className="text-xl md:text-2xl text-white font-serif italic border-l-4 border-[#B46B61] pl-6 py-2 mb-10 text-zinc-200">{post.excerpt}</p>
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-sm md:text-lg text-zinc-400 tracking-wide">
                {index === 0 ? <><span className="float-left text-5xl md:text-7xl font-serif text-[#B46B61] leading-none pr-3 pt-2">{paragraph.charAt(0)}</span>{paragraph.slice(1)}</> : paragraph}
              </p>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Share Article</span>
              <div className="flex space-x-3">
                <button className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#B46B61] hover:border-[#B46B61] transition-colors"><Twitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#B46B61] hover:border-[#B46B61] transition-colors"><Facebook size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10">
          <h3 className="text-xl md:text-2xl text-white font-light tracking-wide">Read Next</h3>
          <button onClick={() => navigate('blog')} className="text-[#B46B61] text-xs tracking-[0.2em] uppercase hover:text-[#C77C72] transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.id !== postId).slice(0, 2).map((post) => (
            <article key={post.id} onClick={() => navigate('journal-detail', post.id)} className="flex flex-col sm:flex-row gap-6 bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 shadow-xl hover:border-[#B46B61]/30 transition-all cursor-pointer group">
              <div className="w-full sm:w-1/3 h-40 rounded-xl overflow-hidden shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-medium text-[#B46B61] tracking-[0.15em] uppercase mb-2">{post.date}</span>
                <h4 className="text-lg text-white font-light mb-2 group-hover:text-[#B46B61] transition-colors">{post.title}</h4>
                <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReservationsPage = () => {
  const [date, setDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !date || !timeFrom) return;
    RESERVATIONS_LIST.unshift({
      id: Date.now(), name, email, date, timeFrom, timeTo, guests, requests, status: 'Confirmed'
    });
    setSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle subtitle="Secure Your Table" title="Reservations" />
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-zinc-300 font-light text-base md:text-xl leading-relaxed">
            Join us for an unforgettable evening. Reservations open 30 days in advance at midnight. For the ultimate experience, we recommend booking the Chef's Tasting Menu upon arrival.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-6 md:p-12 shadow-2xl rounded-3xl">
            {submitted ? (
              <div className="text-center py-16 animate-in zoom-in duration-500">
                <CheckCircle size={64} className="mx-auto text-[#B46B61] mb-6" strokeWidth={1} />
                <h3 className="text-3xl text-white font-light mb-4">Request Confirmed</h3>
                <p className="text-zinc-400 text-lg mb-8">Thank you, {name}. We look forward to welcoming you.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Make Another Booking</Button>
              </div>
            ) : (
              <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Date</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B46B61]/70" size={18} />
                      <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Guests</label>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all appearance-none text-sm cursor-pointer">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <option key={num}>{num} {num === 1 ? 'Person' : 'People'}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Time From</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B46B61]/70" size={18} />
                      <input type="time" required value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Time To</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B46B61]/70" size={18} />
                      <input type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Special Requests (Optional)</label>
                  <textarea rows="4" value={requests} onChange={(e) => setRequests(e.target.value)} placeholder="Dietary restrictions, special occasions..." className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-[#B46B61] focus:ring-1 focus:ring-[#B46B61]/50 transition-all resize-none text-sm"></textarea>
                </div>
                <Button type="submit" className="w-full py-4 text-sm md:text-base rounded-xl font-semibold tracking-widest">
                  Confirm Reservation
                </Button>
              </form>
            )}
          </div>
          <div className="bg-[#050505] border border-white/5 p-6 md:p-10 h-fit rounded-3xl shadow-xl">
            <h4 className="text-[#B46B61] text-base md:text-lg font-light tracking-[0.2em] uppercase mb-8 flex items-center">
              <div className="w-4 h-[1px] bg-[#B46B61] mr-3"></div> Policies
            </h4>
            <ul className="space-y-8 text-zinc-400 font-light text-xs md:text-sm">
              <li><strong className="text-white block mb-2 font-medium tracking-wide">Dress Code</strong> Smart elegant. Jackets are preferred for gentlemen. Athletic wear, shorts, and flip-flops are not permitted.</li>
              <li><strong className="text-white block mb-2 font-medium tracking-wide">Cancellation Policy</strong> We require 48 hours notice for cancellations. Late cancellations or no-shows are subject to a AED 50 per person fee.</li>
              <li><strong className="text-white block mb-2 font-medium tracking-wide">Dietary Requirements</strong> Please inform us of any severe allergies at least 24 hours prior to your reservation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="Get in Touch" title="Contact Us" />
      <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-white/5 mb-12 lg:mb-16 relative grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-700 shadow-2xl">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175407399587!2d-73.9878235234559!3d40.7484445353846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689254330960!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Restaurant Location Map"></iframe>
        <div className="absolute inset-0 bg-[#B46B61]/5 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-8 md:space-y-12">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 space-y-8 md:space-y-10 rounded-3xl shadow-2xl">
            <div className="flex items-start space-x-5 md:space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0"><MapPin className="text-[#B46B61]" size={20} /></div>
              <div><h4 className="text-white text-lg md:text-xl mb-2 font-light">Location</h4><p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">123 Culinary Avenue<br/>Gastronomy District<br/>Metropolis, NY 10012</p></div>
            </div>
            <div className="flex items-start space-x-5 md:space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0"><Clock className="text-[#B46B61]" size={20} /></div>
              <div>
                <h4 className="text-white text-lg md:text-xl mb-2 font-light">Hours of Operation</h4>
                <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                  <span className="block mb-1"><strong className="text-zinc-200 font-medium">Mon - Thu:</strong> 17:30 - 22:30</span>
                  <span className="block mb-1"><strong className="text-zinc-200 font-medium">Fri - Sat:</strong> 17:00 - 23:30</span>
                  <span className="block"><strong className="text-zinc-200 font-medium">Sunday:</strong> Closed</span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-5 md:space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0"><Phone className="text-[#B46B61]" size={20} /></div>
              <div><h4 className="text-white text-lg md:text-xl mb-2 font-light">Direct Lines</h4><p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">General: +1 (555) 123-4567<br/>Events: +1 (555) 123-4568</p></div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <form className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 space-y-6 md:space-y-8 rounded-3xl shadow-2xl" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-2xl md:text-3xl text-white font-light border-b border-white/5 pb-4 md:pb-6 mb-6 md:mb-8">Send an Inquiry</h3>
            <input type="text" placeholder="Name" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#B46B61] transition-colors text-sm" />
            <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#B46B61] transition-colors text-sm" />
            <textarea rows="4" placeholder="Message" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#B46B61] transition-colors resize-none text-sm"></textarea>
            <Button variant="outline" className="w-full rounded-xl py-4 font-semibold tracking-widest text-xs md:text-sm">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- ADMIN COMPONENTS ---

const AdminModal = ({ isOpen, title, onClose, onSave, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-white/[0.02]">
          <Button variant="ghost" onClick={onClose} className="px-4 py-2 text-xs">Cancel</Button>
          <Button onClick={onSave} className="px-6 py-2 text-xs">Confirm</Button>
        </div>
      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') onLogin();
    else setError('Invalid credentials. Use admin / admin');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#B46B61] to-transparent"></div>
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#B46B61]/10 flex items-center justify-center mx-auto mb-6"><Lock className="text-[#B46B61] w-8 h-8" /></div>
          <h2 className="text-3xl text-white font-light tracking-wide">Admin Access</h2>
          <p className="text-zinc-500 text-sm mt-2">Manage your restaurant content</p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-6 text-center p-3 rounded-xl">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="text" placeholder="Username (admin)" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#B46B61] transition-colors text-sm" />
          <input type="password" placeholder="Password (admin)" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#B46B61] transition-colors text-sm" />
          <Button type="submit" className="w-full py-4 rounded-xl font-semibold tracking-widest mt-2">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onUpdate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [menuCat, setMenuCat] = useState(MENU_CATEGORIES[0]?.category || '');
  const [modal, setModal] = useState({ isOpen: false, type: '', action: '', data: null, index: null });
  const [formData, setFormData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ADMIN_TABS = [
    { id: 'reservations', label: 'Reservations', icon: CalendarDays },
    { id: 'menu', label: 'Menu Catalog', icon: Utensils },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'team', label: 'Team Roster', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'journal', label: 'Journal Posts', icon: BookOpen },
    { id: 'testimonials', label: 'Testimonials', icon: Star }
  ];

  const refresh = () => onUpdate();

  const openModal = (type, action, data = null, index = null) => {
    setFormData(data ? { ...data, url: data.image || data.url } : {});
    setModal({ isOpen: true, type, action, data, index });
  };
  const closeModal = () => setModal({ isOpen: false, type: '', action: '', data: null, index: null });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result, url: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (modal.action === 'delete') {
        if (modal.type === 'reservation') RESERVATIONS_LIST.splice(modal.index, 1);
        if (modal.type === 'category') {
            const idx = MENU_CATEGORIES.findIndex(c => c.category === menuCat);
            MENU_CATEGORIES.splice(idx, 1);
            setMenuCat(MENU_CATEGORIES[0]?.category || '');
        }
        if (modal.type === 'menu') MENU_CATEGORIES.find(c => c.category === menuCat).items.splice(modal.index, 1);
        if (modal.type === 'team') TEAM_MEMBERS.splice(modal.index, 1);
        if (modal.type === 'gallery') GALLERY_IMAGES.splice(modal.index, 1);
        if (modal.type === 'journal') BLOG_POSTS.splice(modal.index, 1);
        if (modal.type === 'offer') OFFERS.splice(modal.index, 1);
        if (modal.type === 'testimonial') TESTIMONIALS.splice(modal.index, 1);
    } else if (modal.action === 'edit') {
        if (modal.type === 'category') {
            const cat = MENU_CATEGORIES.find(c => c.category === menuCat);
            cat.category = formData.name;
            if(formData.image) cat.image = formData.image;
            setMenuCat(formData.name);
        }
        if (modal.type === 'menu') MENU_CATEGORIES.find(c => c.category === menuCat).items[modal.index] = formData;
        if (modal.type === 'team') TEAM_MEMBERS[modal.index] = formData;
        if (modal.type === 'journal') BLOG_POSTS[modal.index] = { ...BLOG_POSTS[modal.index], ...formData };
        if (modal.type === 'offer') OFFERS[modal.index] = { ...OFFERS[modal.index], ...formData };
        if (modal.type === 'testimonial') TESTIMONIALS[modal.index] = { ...formData, rating: Number(formData.rating) || 5 };
    } else if (modal.action === 'add') {
        if (modal.type === 'category') {
            MENU_CATEGORIES.push({
                category: formData.name || 'New Category',
                icon: Utensils,
                image: formData.image || "https://images.unsplash.com/photo-1541525048530-58957bdcd554?auto=format&fit=crop&q=80&w=800",
                items: []
            });
            setMenuCat(formData.name || 'New Category');
        }
        if (modal.type === 'menu') MENU_CATEGORIES.find(c => c.category === menuCat).items.push({...formData, image: formData.image || "https://images.unsplash.com/photo-1541525048530-58957bdcd554?auto=format&fit=crop&q=80&w=600"});
        if (modal.type === 'team') TEAM_MEMBERS.push({...formData, image: formData.image || "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"});
        if (modal.type === 'gallery') GALLERY_IMAGES.push(formData.url || formData.image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800");
        if (modal.type === 'journal') BLOG_POSTS.push({ ...formData, id: Date.now(), date: new Date().toLocaleDateString(), author: "Admin", image: formData.image || "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800", content: [formData.excerpt || "New content"]});
        if (modal.type === 'offer') OFFERS.push({ ...formData, id: Date.now(), image: formData.image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" });
        if (modal.type === 'testimonial') TESTIMONIALS.push({ ...formData, rating: Number(formData.rating) || 5 });
    }
    refresh();
    closeModal();
  };

  const renderReservationsAdmin = () => (
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-2xl text-white font-light">Recent Reservations</h3>
        <span className="bg-[#B46B61]/20 text-[#B46B61] text-xs font-bold px-3 py-1 rounded-full">{RESERVATIONS_LIST.length} Total</span>
      </div>
      <div className="space-y-4">
        {RESERVATIONS_LIST.length > 0 ? RESERVATIONS_LIST.map((res, idx) => (
          <div key={res.id} className="bg-black p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/10 transition-colors">
            <div>
              <p className="text-white font-medium text-lg md:text-xl">{res.name} <span className="text-zinc-500 text-sm md:text-base ml-2 font-normal block md:inline">{res.email}</span></p>
              <p className="text-[#B46B61] text-xs uppercase tracking-widest mt-1.5 md:mt-1 font-medium">{res.date} at {res.timeFrom} &bull; {res.guests}</p>
              {res.requests && <p className="text-zinc-400 text-sm mt-3 flex items-start"><Quote size={12} className="mr-2 mt-1 text-zinc-600 shrink-0"/> {res.requests}</p>}
            </div>
            <button onClick={() => openModal('reservation', 'delete', res, idx)} className="p-2.5 text-red-400 hover:text-red-300 bg-white/5 rounded-xl shrink-0 h-fit transition-colors self-end md:self-auto"><Trash2 size={16} /></button>
          </div>
        )) : (
          <p className="text-zinc-500 text-center py-12 border border-dashed border-white/10 rounded-2xl">No reservations found.</p>
        )}
      </div>
    </div>
  );

  const renderMenuAdmin = () => {
    const category = MENU_CATEGORIES.find(c => c.category === menuCat);
    return (
      <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in h-full">
        <div className="w-full lg:w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl p-3 md:p-5 flex flex-wrap lg:flex-col gap-2 shrink-0 shadow-xl items-stretch">
          <div className="w-full lg:w-auto mb-2 lg:mb-4 px-2 flex justify-between items-center pb-2 border-b border-white/5 shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Categories</span>
            <button onClick={() => openModal('category', 'add')} className="text-[#B46B61] hover:text-white transition-colors bg-[#B46B61]/10 p-1.5 rounded-md flex items-center"><Plus size={14}/><span className="lg:hidden ml-1 text-xs font-medium">New</span></button>
          </div>
          {MENU_CATEGORIES.map(c => (
            <button key={c.category} onClick={() => setMenuCat(c.category)} className={`flex-grow lg:flex-grow-0 text-center lg:text-left px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all ${menuCat === c.category ? 'bg-[#B46B61] text-white shadow-lg' : 'bg-white/5 lg:bg-transparent text-zinc-400 hover:bg-white/10 hover:text-white'}`}>
              {c.category}
            </button>
          ))}
          {MENU_CATEGORIES.length === 0 && <p className="text-zinc-600 text-xs text-center py-4 w-full">No categories</p>}
        </div>
        
        <div className="flex-1 min-w-0">
          {category ? (
            <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl h-full flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/5 gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl text-white font-light">{category.category}</h3>
                  <div className="flex gap-1 ml-2">
                    <button onClick={() => openModal('category', 'edit', {name: category.category, image: category.image})} className="p-1.5 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-lg" title="Edit Category"><Edit2 size={14}/></button>
                    <button onClick={() => openModal('category', 'delete')} className="p-1.5 text-red-500/70 hover:text-red-400 transition-colors bg-white/5 rounded-lg" title="Delete Category"><Trash2 size={14}/></button>
                  </div>
                </div>
                <Button onClick={() => openModal('menu', 'add')} variant="outline" className="text-xs py-2 md:py-2.5 px-4 shrink-0"><Plus size={14} className="mr-2" /> Add Item</Button>
              </div>
              
              <div className="space-y-4 overflow-y-auto flex-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                {category.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center bg-black p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <p className="text-white font-medium mb-1 flex flex-wrap items-center gap-2">{item.name} <span className="text-[#B46B61] text-xs bg-[#B46B61]/10 px-2 py-0.5 rounded-md whitespace-nowrap">{item.price}</span></p>
                        <p className="text-zinc-500 text-xs line-clamp-2 md:line-clamp-1 max-w-md">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 self-end sm:self-auto">
                      <button onClick={() => openModal('menu', 'edit', item, idx)} className="p-2.5 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => openModal('menu', 'delete', item, idx)} className="p-2.5 text-red-400 hover:text-red-300 bg-white/5 rounded-xl transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                {category.items.length === 0 && <p className="text-zinc-500 text-center py-8">No items in this category.</p>}
              </div>
            </div>
          ) : (
            <div className="bg-[#0a0a0a] p-12 text-center rounded-3xl border border-white/5 shadow-2xl h-full flex items-center justify-center">
              <p className="text-zinc-500 font-light tracking-wide">Select or create a menu category to get started.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOffersAdmin = () => (
    <div className="bg-[#0a0a0a] p-4 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/5">
        <h3 className="text-xl md:text-2xl text-white font-light">Manage Offers</h3>
        <Button onClick={() => openModal('offer', 'add')} variant="outline" className="text-xs py-2 px-4 shrink-0"><Plus size={14} className="mr-2 hidden sm:inline" /> Add Offer</Button>
      </div>
      <div className="space-y-4">
        {OFFERS.map((offer, idx) => (
          <div key={offer.id} className="flex flex-col md:flex-row justify-between md:items-center bg-black p-4 md:p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors gap-4">
            <div className="flex items-center gap-4">
              <img src={offer.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div>
                <p className="text-white font-medium text-base md:text-lg flex flex-wrap items-center gap-2">{offer.title} <span className="bg-[#B46B61] text-white text-[10px] uppercase px-2 py-0.5 rounded shadow-sm">{offer.tag}</span></p>
                <p className="text-[#B46B61] font-medium text-sm mt-1 mb-1.5">{offer.price} {offer.originalPrice && <span className="text-zinc-500 line-through text-xs ml-2">{offer.originalPrice}</span>}</p>
                <p className="text-zinc-500 text-xs line-clamp-1">{offer.description}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 self-end md:self-auto">
              <button onClick={() => openModal('offer', 'edit', offer, idx)} className="p-2.5 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => openModal('offer', 'delete', offer, idx)} className="p-2.5 text-red-400 hover:text-red-300 bg-white/5 rounded-xl transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {OFFERS.length === 0 && <p className="text-zinc-500 text-center py-8">No current offers active.</p>}
      </div>
    </div>
  );

  const renderTeamAdmin = () => (
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-2xl text-white font-light">Team Members</h3>
        <Button onClick={() => openModal('team', 'add')} variant="outline" className="text-xs py-2 px-4"><Plus size={14} className="mr-2" /> Add Member</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEAM_MEMBERS.map((member, idx) => (
          <div key={idx} className="flex justify-between items-center bg-black p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <img src={member.image} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <p className="text-white font-medium">{member.name}</p>
                <p className="text-[#B46B61] text-xs uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal('team', 'edit', member, idx)} className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"><Edit2 size={16} /></button>
              <button onClick={() => openModal('team', 'delete', member, idx)} className="p-2 text-red-400 hover:text-red-300 bg-white/5 rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryAdmin = () => (
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-2xl text-white font-light">Gallery Images</h3>
        <Button onClick={() => openModal('gallery', 'add')} variant="outline" className="text-xs py-2 px-4"><Plus size={14} className="mr-2" /> Add Image</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((img, idx) => (
          <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square border border-white/10">
            <img src={img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => openModal('gallery', 'delete', null, idx)} className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJournalAdmin = () => (
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-2xl text-white font-light">Journal Posts</h3>
        <Button onClick={() => openModal('journal', 'add')} variant="outline" className="text-xs py-2 px-4"><Plus size={14} className="mr-2" /> Add Post</Button>
      </div>
      <div className="space-y-4">
        {BLOG_POSTS.map((post, idx) => (
          <div key={post.id} className="flex justify-between items-center bg-black p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div>
              <p className="text-white font-medium text-base md:text-lg line-clamp-1">{post.title}</p>
              <p className="text-zinc-500 text-xs mt-1 font-medium tracking-widest uppercase">{post.date} &bull; {post.author}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openModal('journal', 'edit', post, idx)} className="p-2 md:p-2.5 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => openModal('journal', 'delete', post, idx)} className="p-2 md:p-2.5 text-red-400 hover:text-red-300 bg-white/5 rounded-xl transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsAdmin = () => (
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl animate-in fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-2xl text-white font-light">Testimonials</h3>
        <Button onClick={() => openModal('testimonial', 'add')} variant="outline" className="text-xs py-2 px-4"><Plus size={14} className="mr-2" /> Add Testimonial</Button>
      </div>
      <div className="space-y-4">
        {TESTIMONIALS.map((test, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center bg-black p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-base md:text-lg truncate">{test.name} <span className="text-zinc-500 text-xs font-normal ml-2">{test.role}</span></p>
              <div className="flex gap-1 text-[#B46B61] my-2">
                {[...Array(Number(test.rating) || 5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
              </div>
              <p className="text-zinc-400 text-sm italic line-clamp-2">"{test.text}"</p>
            </div>
            <div className="flex gap-2 shrink-0 self-end sm:self-auto">
              <button onClick={() => openModal('testimonial', 'edit', test, idx)} className="p-2 md:p-2.5 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => openModal('testimonial', 'delete', test, idx)} className="p-2 md:p-2.5 text-red-400 hover:text-red-300 bg-white/5 rounded-xl transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {TESTIMONIALS.length === 0 && <p className="text-zinc-500 text-center py-8">No testimonials yet.</p>}
      </div>
    </div>
  );

  return (
    <div className="flex h-[100svh] bg-black text-white overflow-hidden flex-col md:flex-row relative">
      
      {/* Mobile Admin Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/5 z-30 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#B46B61]/10 flex items-center justify-center">
            <Lock className="text-[#B46B61] w-4 h-4" />
          </div>
          <span className="font-serif tracking-widest text-white uppercase text-sm">Admin Control</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#B46B61] hover:text-white transition-colors p-2 bg-white/5 rounded-full border border-white/10">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar for Admin */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 transform transition-transform duration-300 md:relative md:translate-x-0 shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 py-6 md:py-8 border-b border-white/5 text-center relative">
          <button className="md:hidden absolute top-4 right-4 text-zinc-500 hover:text-white" onClick={() => setIsSidebarOpen(false)}><X size={20}/></button>
          <div className="w-12 h-12 rounded-full bg-[#B46B61]/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="text-[#B46B61] w-6 h-6" />
          </div>
          <span className="text-xl font-serif tracking-widest text-white uppercase block">Admin</span>
          <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mt-1 block">Control Panel</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {ADMIN_TABS.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl uppercase tracking-widest text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-[#B46B61] text-white shadow-lg' : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-[#B46B61]'} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/5">
          <Button onClick={onLogout} variant="ghost" className="w-full justify-start px-4 py-3 text-xs bg-white/5 hover:bg-white/10 text-white rounded-xl">
            <LogOut size={16} className="mr-3 text-[#B46B61]"/> Exit Dashboard
          </Button>
        </div>
      </div>

      {/* Main Admin View Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black z-10 overflow-hidden">
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'reservations' && renderReservationsAdmin()}
          {activeTab === 'menu' && renderMenuAdmin()}
          {activeTab === 'offers' && renderOffersAdmin()}
          {activeTab === 'team' && renderTeamAdmin()}
          {activeTab === 'gallery' && renderGalleryAdmin()}
          {activeTab === 'journal' && renderJournalAdmin()}
          {activeTab === 'testimonials' && renderTestimonialsAdmin()}
        </div>
      </div>

      <AdminModal isOpen={modal.isOpen} title={`${modal.action === 'add' ? 'Add New' : modal.action === 'edit' ? 'Edit' : 'Delete'} ${modal.type.charAt(0).toUpperCase() + modal.type.slice(1)}`} onClose={closeModal} onSave={handleSave}>
        {modal.action === 'delete' ? (
          <p className="text-zinc-300 text-sm leading-relaxed">Are you sure you want to delete this item? This action cannot be undone.</p>
        ) : (
          <>
            {['category', 'menu', 'team', 'gallery', 'journal', 'offer'].includes(modal.type) && (
              <div className="p-4 border border-dashed border-white/20 rounded-xl bg-white/[0.02] flex flex-col items-center justify-center text-center relative group overflow-hidden shrink-0">
                {(formData.image || formData.url) ? (
                  <>
                    <img src={formData.image || formData.url} alt="Preview" className="w-full h-32 object-cover rounded-lg opacity-80 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="bg-black/90 text-white px-4 py-2 rounded-full text-xs flex items-center border border-white/10 shadow-xl">
                        <Upload size={14} className="mr-2"/> Replace Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="py-6">
                    <Upload className="mx-auto text-zinc-500 mb-3" size={28} />
                    <p className="text-sm text-zinc-300 font-medium tracking-wide">Upload an image file</p>
                    <p className="text-xs text-zinc-500 mt-1">Click or drag a file here</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            )}

            {modal.type === 'category' && (
              <>
                <input type="text" placeholder="Category Name (e.g. Desserts)" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <p className="text-[10px] text-zinc-500 italic mt-1 px-1">Upload an image above for the category cover.</p>
              </>
            )}
            {modal.type === 'menu' && (
              <>
                <input type="text" placeholder="Item Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <input type="text" placeholder="Price (e.g. AED 20)" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <textarea placeholder="Description" rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none resize-none transition-colors"></textarea>
              </>
            )}
            {modal.type === 'offer' && (
              <>
                <input type="text" placeholder="Offer Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <textarea placeholder="Description" rows="2" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none resize-none transition-colors"></textarea>
                <div className="flex gap-4">
                  <input type="text" placeholder="Price" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-1/2 bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                  <input type="text" placeholder="Orig. Price" value={formData.originalPrice || ''} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-1/2 bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                </div>
                <input type="text" placeholder="Tag (e.g. Daily)" value={formData.tag || ''} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
              </>
            )}
            {modal.type === 'team' && (
              <>
                <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <input type="text" placeholder="Role (e.g. Head Sommelier)" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
              </>
            )}
            {modal.type === 'gallery' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">OR</span>
                </div>
                <input type="text" placeholder="Paste Image URL..." value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
              </div>
            )}
            {modal.type === 'journal' && (
              <>
                <input type="text" placeholder="Post Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <textarea placeholder="Short Excerpt" rows="3" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none resize-none transition-colors"></textarea>
              </>
            )}
            {modal.type === 'testimonial' && (
              <>
                <input type="text" placeholder="Author Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <input type="text" placeholder="Role (e.g. Food Critic)" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors" />
                <select value={formData.rating || 5} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none transition-colors appearance-none">
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                <textarea placeholder="Testimonial text..." rows="4" value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#B46B61] outline-none resize-none transition-colors"></textarea>
              </>
            )}
          </>
        )}
      </AdminModal>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0].category);
  const [activePostId, setActivePostId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [updateTick, setUpdateTick] = useState(0);

  const forceUpdate = () => setUpdateTick(t => t + 1);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (pageId, extraParam = null) => {
    setCurrentPage(pageId);
    if (pageId === 'menu' && extraParam) setActiveMenuTab(extraParam);
    if (pageId === 'journal-detail' && extraParam) setActivePostId(extraParam);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage navigate={navigateTo} />;
      case 'menu': return <MenuPage activeTab={activeMenuTab} setActiveTab={setActiveMenuTab} />;
      case 'about': return <AboutPage />;
      case 'team': return <TeamPage />;
      case 'gallery': return <GalleryPage />;
      case 'blog': return <BlogPage navigate={navigateTo} />;
      case 'journal-detail': return <JournalDetailPage postId={activePostId} navigate={navigateTo} />;
      case 'reservations': return <ReservationsPage />;
      case 'contact': return <ContactPage />;
      case 'admin': return isAdminLoggedIn ? <AdminDashboard onUpdate={forceUpdate} onLogout={() => { setIsAdminLoggedIn(false); navigateTo('home'); }} /> : <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
      default: return <HomePage navigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-[#B46B61] selection:text-white flex flex-col">
      
      {currentPage !== 'admin' && (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="cursor-pointer flex flex-col group relative z-50" onClick={() => navigateTo('home')}>
              <span className="text-2xl md:text-3xl font-serif tracking-widest text-white uppercase group-hover:text-[#B46B61] transition-colors duration-500">The Mother</span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-zinc-500 uppercase mt-1 transition-colors duration-500 group-hover:text-[#B46B61]/70">Est. 2018</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {NAV_LINKS.filter(link => link.id !== 'reservations').map(link => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`text-xs tracking-[0.15em] uppercase transition-all duration-500 relative group font-bold ${currentPage === link.id ? 'text-[#B46B61]' : 'text-zinc-400 hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-[#B46B61] transition-all duration-500 ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
                </button>
              ))}
              <button 
                onClick={() => navigateTo('reservations')}
                className="px-6 py-2.5 bg-[#B46B61] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#C77C72] transition-colors shadow-[0_0_15px_rgba(180,107,97,0.2)] rounded-sm"
              >
                Book Table
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-3 relative z-50">
              <button 
                onClick={() => navigateTo('reservations')}
                className="px-4 py-2 bg-[#B46B61]/10 border border-[#B46B61]/50 text-[#B46B61] text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#B46B61] hover:text-white transition-colors rounded-sm backdrop-blur-md"
              >
                Book
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#B46B61] hover:text-white transition-colors p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      )}

      {currentPage !== 'admin' && (
        <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-6 md:space-y-8 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B46B61]/5 via-transparent to-transparent pointer-events-none"></div>
          {NAV_LINKS.map((link, index) => (
            <button key={link.id} onClick={() => navigateTo(link.id)} style={{ transitionDelay: `${index * 50}ms` }} className={`text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-500 transform font-bold ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${currentPage === link.id ? 'text-[#B46B61]' : 'text-zinc-500 hover:text-white'}`}>
              {link.label}
            </button>
          ))}
          <div className={`pt-10 border-t border-white/10 flex space-x-8 transition-all duration-700 delay-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
             <Instagram className="text-zinc-600 hover:text-[#B46B61] cursor-pointer transition-colors" size={24} />
             <Facebook className="text-zinc-600 hover:text-[#B46B61] cursor-pointer transition-colors" size={24} />
             <Twitter className="text-zinc-600 hover:text-[#B46B61] cursor-pointer transition-colors" size={24} />
          </div>
        </div>
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {currentPage !== 'admin' && currentPage !== 'reservations' && (
        <section className="relative py-20 md:py-32 border-t border-white/5 flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070" 
              className="w-full h-full object-cover opacity-[0.15] grayscale" 
              alt="Dining Experience" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#B46B61]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl px-4">
            <span className="text-[#B46B61] text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              Reserve Your Table
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
              Experience The Mother
            </h2>
            <p className="text-zinc-400 font-light text-sm md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join us for an unforgettable culinary journey where love is our secret ingredient. Secure your table today.
            </p>
            <Button onClick={() => navigateTo('reservations')} variant="primary" className="px-8 py-3.5 md:px-12 md:py-4 text-xs md:text-sm tracking-widest shadow-2xl">
              Book a Reservation
            </Button>
          </div>
        </section>
      )}

      {currentPage !== 'admin' && (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
              
              <div className="col-span-1 lg:col-span-1">
                <span className="text-2xl font-serif tracking-widest text-white uppercase block mb-6">The Mother</span>
                <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8 pr-4">Redefining modern gastronomy in an atmosphere of unparalleled, intentional elegance.</p>
                <div className="flex space-x-5">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-[#B46B61] hover:border-[#B46B61]/50 transition-all duration-300"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-[#B46B61] hover:border-[#B46B61]/50 transition-all duration-300"><Facebook size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-[#B46B61] hover:border-[#B46B61]/50 transition-all duration-300"><Twitter size={18} /></a>
                </div>
              </div>

              <div>
                <h4 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center"><span className="w-4 h-px bg-[#B46B61] mr-3"></span>Explore</h4>
                <ul className="space-y-4 text-zinc-500 font-light text-sm">
                  <li><button onClick={() => navigateTo('home')} className="hover:text-[#B46B61] transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Home</button></li>
                  <li><button onClick={() => navigateTo('menu')} className="hover:text-[#B46B61] transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Menu</button></li>
                  <li><button onClick={() => navigateTo('team')} className="hover:text-[#B46B61] transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Team</button></li>
                  <li><button onClick={() => navigateTo('gallery')} className="hover:text-[#B46B61] transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Gallery</button></li>
                  <li><button onClick={() => navigateTo('blog')} className="hover:text-[#B46B61] transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Journal</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center"><span className="w-4 h-px bg-[#B46B61] mr-3"></span>Contact</h4>
                <ul className="space-y-5 text-zinc-500 font-light text-sm">
                  <li className="flex items-start"><MapPin size={16} className="mr-3 text-[#B46B61] shrink-0 mt-0.5" /> 123 Culinary Ave, NY</li>
                  <li className="flex items-center"><Phone size={16} className="mr-3 text-[#B46B61] shrink-0" /> +1 (555) 123-4567</li>
                  <li className="flex items-center"><Mail size={16} className="mr-3 text-[#B46B61] shrink-0" /> info@themother.com</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-zinc-600 font-light tracking-widest uppercase">
              <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} The Mother. All Rights Reserved.</p>
              <div className="space-x-6 flex items-center">
                <a href="#" className="hover:text-[#B46B61] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#B46B61] transition-colors">Terms of Service</a>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#B46B61] transition-colors text-zinc-600 flex items-center"><Lock size={10} className="mr-1" />Admin</button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}