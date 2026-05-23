"use client"

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronLeft, ChevronRight, Clock, MapPin, 
  Phone, Mail, Instagram, Facebook, Twitter, Star, 
  ChefHat, Utensils, CalendarDays, ArrowRight, Quote,
  Wine, Coffee, GlassWater
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

const MENU_CATEGORIES = [
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
      { name: "Nocturne Martini", description: "Botanical Gin, dry vermouth, olive oil wash, Mediterranean sea salt.", price: "AED 20", image: "https://images.unsplash.com/photo-1575037614876-c3858d44ea04?auto=format&fit=crop&q=80&w=600" }
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

const TESTIMONIALS = [
  { name: "Eleanor Sterling", role: "Food Critic", text: "An absolute revelation. The attention to detail in every dish is unparalleled. Nocturne is setting a new standard for modern gastronomy.", rating: 5 },
  { name: "Marcus Thorne", role: "Local Guide", text: "From the dramatic ambiance to the final dessert course, everything was flawless. The Wagyu Carpaccio is a definitive must-try.", rating: 5 },
  { name: "Sophia Lin", role: "Gastronomer", text: "A theatrical dining experience that doesn't compromise on flavor. The perfect, intimate venue for truly special occasions.", rating: 5 }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
];

const BLOG_POSTS = [
  { 
    id: 1, 
    title: "The Art of Dry Aging", 
    excerpt: "Discover our meticulous 45-day dry-aging process that gives our ribeye its signature depth of flavor.", 
    date: "Oct 12, 2023", 
    author: "Chef Sterling", 
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800",
    content: [
      "At Nocturne, we believe that time is an ingredient just as crucial as salt or heat. Our signature 14oz prime ribeye isn't simply sourced and seared; it undergoes a transformative 45-day journey in our custom-built, climate-controlled dry-aging chamber.",
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
      "As the frost thaws and the earth awakens, so too does the culinary imagination at Nocturne. Our new Spring menu is a celebration of rebirth, heavily inspired by the vibrant, fleeting produce sourced directly from our local farming partners.",
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
      "The true joy of my role at Nocturne is guiding our guests through these discoveries. Never hesitate to ask for a pairing recommendation—it is often the key to unlocking the full potential of your dining experience."
    ]
  }
];

const OFFERS = [
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

const TEAM_MEMBERS = [
  { name: "Alexander Sterling", role: "Executive Chef", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800" },
  { name: "Julian Davis", role: "Head Sommelier", image: "https://images.unsplash.com/photo-1559832269-e14b8f52f8ce?auto=format&fit=crop&q=80&w=800" },
  { name: "Elena Rostova", role: "Pastry Chef", image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800" }
];

// --- COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-sm font-medium transition-all duration-300 tracking-wider uppercase rounded-sm";
  const variants = {
    primary: "border-amber-500 bg-amber-500 text-black hover:bg-amber-400 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]",
    outline: "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black",
    ghost: "border-transparent text-zinc-300 hover:text-amber-500"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12 md:mb-20 px-4">
    <p className="text-amber-500 font-serif italic tracking-[0.2em] text-xs md:text-sm mb-3 md:mb-4 uppercase">{subtitle}</p>
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white">{title}</h2>
    <div className="h-px w-16 md:w-24 bg-amber-500/50 mx-auto mt-6 md:mt-8"></div>
  </div>
);

// --- PAGES ---

const HomePage = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);

  // Drag states for touch & mouse swiping
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

  // --- Offers Drag Handlers ---
  const handleOfferDragStart = (e) => {
    setOfferDragStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  };

  const handleOfferDragMove = (e) => {
    if (offerDragStartX === null) return;
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setOfferDragDistance(currentX - offerDragStartX);
  };

  const handleOfferDragEnd = () => {
    if (offerDragStartX === null) return;
    if (offerDragDistance < -50) nextOffer();
    else if (offerDragDistance > 50) prevOffer();
    setOfferDragStartX(null);
    setOfferDragDistance(0);
  };

  // --- Testimonials Drag Handlers ---
  const handleTestDragStart = (e) => {
    setTestDragStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  };

  const handleTestDragMove = (e) => {
    if (testDragStartX === null) return;
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setTestDragDistance(currentX - testDragStartX);
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
      {/* Modern Hero Slider Section */}
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
            
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center mt-12 md:mt-0">
              <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <p className="text-amber-500 font-serif italic tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mb-4 md:mb-6 uppercase">
                  The Nocturne Experience
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
                <Button onClick={() => navigate(slide.ctaLink)} variant="outline" className="py-3 px-8 md:py-4 md:px-10 text-xs md:text-sm tracking-[0.2em] border-zinc-50 text-zinc-50 hover:bg-zinc-50 hover:text-black transition-all duration-500 backdrop-blur-sm bg-black/10">
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
              <div 
                key={i} 
                onClick={() => navigate('menu', cat.category)} 
                className="group relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl cursor-pointer bg-[#0a0a0a] border border-white/5 shadow-2xl"
              >
                <img 
                  src={cat.image} 
                  alt={cat.category} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-colors duration-500 group-hover:from-black/90" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/20 flex items-center justify-center mb-3 md:mb-4 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <cat.icon size={20} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <h3 className="text-zinc-100 text-sm sm:text-base md:text-lg font-light tracking-widest uppercase text-center">{cat.category}</h3>
                  <div className="h-[1px] w-0 bg-amber-500 mt-3 transition-all duration-500 group-hover:w-8 md:group-hover:w-12"></div>
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
            Every plate at Nocturne is a deliberate canvas. Our executive chefs blend seasonal, locally sourced ingredients with avant-garde techniques to create dishes that consistently delight the senses.
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
                
                <div className="w-[85%] md:w-[90%] -mt-20 md:-mt-24 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] transform transition-all duration-500 group-hover:-translate-y-4 group-hover:border-amber-500/30 group-hover:bg-[#0f0f0f]/90">
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-amber-500/50 rounded-full transition-all duration-500 group-hover:w-16 group-hover:bg-amber-500"></div>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-2 md:mb-3 text-center tracking-wide">{item.title}</h3>
                  <p className="text-zinc-400 font-light text-xs md:text-sm text-center mb-5 md:mb-6 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-center">
                    <button className="text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium flex items-center gap-2 group/btn">
                      Discover <ArrowRight size={14} className="transform transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Offers Section */}
      <section className="py-20 md:py-32 bg-black px-4 relative overflow-hidden border-t border-white/5">
        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle subtitle="Exclusives" title="Current Offers" />

          <div className="relative mt-12 md:mt-16">
            <div 
              className="overflow-hidden px-2 md:px-12 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleOfferDragStart}
              onTouchMove={handleOfferDragMove}
              onTouchEnd={handleOfferDragEnd}
              onMouseDown={handleOfferDragStart}
              onMouseMove={handleOfferDragMove}
              onMouseUp={handleOfferDragEnd}
              onMouseLeave={handleOfferDragEnd}
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
                    <div className="group relative bg-[#0a0a0a] border border-white/5 hover:border-amber-500/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl w-full max-w-5xl pointer-events-auto">
                      
                      {/* Image Header */}
                      <div className="h-64 md:h-auto md:w-1/2 overflow-hidden relative shrink-0">
                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-90" />
                        
                        {/* Glowing Tag */}
                        <div className="absolute top-6 left-6 bg-amber-500 text-black text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] z-10">
                          {offer.tag}
                        </div>
                      </div>

                      {/* Offer Content */}
                      <div className="p-8 md:p-12 lg:p-16 flex flex-col flex-grow relative bg-[#0a0a0a] justify-center md:w-1/2">
                        <h3 className="text-2xl md:text-4xl text-white font-light mb-4">{offer.title}</h3>
                        <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed mb-10">{offer.description}</p>

                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                          <div className="flex flex-col">
                            {offer.originalPrice && <span className="text-zinc-600 line-through text-[10px] md:text-xs mb-1">{offer.originalPrice}</span>}
                            <span className="text-amber-500 font-medium tracking-wider text-lg md:text-2xl">{offer.price}</span>
                          </div>
                          <button onClick={() => navigate('reservations')} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group/btn shrink-0">
                            <ArrowRight size={20} className="transform transition-transform group-hover/btn:-rotate-45" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button onClick={prevOffer} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl hidden md:block group">
              <ChevronLeft size={24} strokeWidth={1.5} className="transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextOffer} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl hidden md:block group">
              <ChevronRight size={24} strokeWidth={1.5} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            {/* Pagination Pills */}
            <div className="flex justify-center space-x-2 md:space-x-3 mt-10 md:mt-12">
              {OFFERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentOffer(idx)}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${idx === currentOffer ? 'bg-amber-500 w-8 md:w-12 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-zinc-800 w-2 md:w-3 hover:bg-zinc-600'}`}
                  aria-label={`Go to offer ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Premium Testimonials Slider Section */}
      <section className="py-20 md:py-32 bg-[#030303] px-4 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-amber-500/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Guest Experiences" title="Voices of Nocturne" />
          
          <div className="relative mt-12 md:mt-20">
            <div 
              className="overflow-hidden px-2 md:px-16 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTestDragStart}
              onTouchMove={handleTestDragMove}
              onTouchEnd={handleTestDragEnd}
              onMouseDown={handleTestDragStart}
              onMouseMove={handleTestDragMove}
              onMouseUp={handleTestDragEnd}
              onMouseLeave={handleTestDragEnd}
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
                    {/* Premium Glassmorphism Card */}
                    <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 p-8 md:p-16 lg:p-20 flex flex-col items-center text-center relative rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.8)] overflow-hidden group pointer-events-none">
                      
                      {/* Subtle Top Glow */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
                      
                      <Quote className="absolute top-6 left-6 md:top-12 md:left-12 text-amber-500/10 transform -scale-x-100" size={48} />
                      <Quote className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-amber-500/10" size={48} />
                      
                      <div className="flex mb-6 md:mb-10 gap-1.5 relative z-10">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} size={16} className="text-amber-500 fill-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] md:w-5 md:h-5" />
                        ))}
                      </div>
                      
                      <p className="text-lg sm:text-xl md:text-3xl text-zinc-200 font-serif italic mb-8 md:mb-12 leading-relaxed max-w-4xl relative z-10 px-4 md:px-0">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="pt-6 relative z-10 flex flex-col items-center">
                        <div className="w-8 md:w-12 h-[1px] bg-amber-500 mb-4 md:mb-6"></div>
                        <h4 className="text-zinc-50 font-medium tracking-widest uppercase text-xs md:text-sm">{testimonial.name}</h4>
                        <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl hidden md:block group">
              <ChevronLeft size={24} strokeWidth={1.5} className="transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl hidden md:block group">
              <ChevronRight size={24} strokeWidth={1.5} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          {/* Pagination Pills */}
          <div className="flex justify-center space-x-2 md:space-x-3 mt-10 md:mt-16">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${idx === currentTestimonial ? 'bg-amber-500 w-8 md:w-12 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-zinc-800 w-2 md:w-3 hover:bg-zinc-600'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ambiance Parallax Section */}
      <section className="relative py-24 md:py-48 bg-black flex items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover grayscale" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90"></div>
        <div className="relative z-10 text-center max-w-5xl px-4 w-[90%] md:w-full bg-black/50 p-8 md:p-24 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl">
          <ChefHat size={40} className="mx-auto text-amber-500 mb-6 md:mb-10 md:w-12 md:h-12" strokeWidth={1} />
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-10 leading-tight md:leading-tight tracking-tight px-2 md:px-0">
            "Cooking is an art of subtraction. We strip away the unnecessary until only the essence of flavor remains."
          </h2>
          <p className="text-sm md:text-xl text-amber-500/80 font-serif italic mb-10 md:mb-16">— Executive Chef Alexander Sterling</p>
          <Button onClick={() => navigate('about')} variant="primary" className="px-8 py-3 md:px-12 md:py-4 text-xs md:text-sm">Discover Our Story</Button>
        </div>
      </section>
    </div>
  );
};

const MenuPage = ({ activeTab, setActiveTab }) => {
  const activeSection = MENU_CATEGORIES.find(s => s.category === activeTab) || MENU_CATEGORIES[0];

  return (
    <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle subtitle="Culinary Journey" title="Our Menu" />
        
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">
            Our menu is a living document, evolving with the seasons and reflecting the micro-climates of our trusted local purveyors. We invite you to explore a symphony of textures, temperatures, and tastes designed to provoke thought and inspire joy.
          </p>
        </div>
        
        {/* Modern Glassmorphism Segmented Tab Container */}
        <div className="flex justify-center w-full mb-16 md:mb-24">
          <div className="inline-flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 p-1.5 md:p-2 rounded-2xl md:rounded-full shadow-2xl w-full md:w-auto max-w-full">
            {MENU_CATEGORIES.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(section.category)}
                className={`flex items-center gap-2 md:gap-3 px-4 py-3 md:px-8 md:py-3.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 whitespace-nowrap shrink-0 ${
                  activeTab === section.category
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <section.icon 
                  size={16} 
                  strokeWidth={activeTab === section.category ? 2 : 1.5}
                  className={`${activeTab === section.category ? 'text-black' : 'text-amber-500'} md:w-[18px] md:h-[18px]`} 
                />
                {section.category}
              </button>
            ))}
          </div>
        </div>

        {/* Tasting Menu Banner */}
        <div className="mb-16 md:mb-24 bg-[#0a0a0a] border border-white/5 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50"></div>
          <div className="absolute right-0 top-0 w-48 h-48 md:w-80 md:h-80 bg-amber-500/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="text-xl md:text-3xl text-amber-500 font-light tracking-[0.2em] uppercase mb-4">The Chef's Tasting Experience</h3>
            <p className="text-zinc-300 font-light max-w-2xl text-sm md:text-lg leading-relaxed">
              Surrender to the kitchen. An immersive 7-course journey through our seasonal highlights, meticulously paired with rare vintages from our award-winning cellar.
            </p>
          </div>
          
          <div className="relative z-10 bg-black/60 backdrop-blur-md p-6 md:p-8 border border-white/10 rounded-2xl shrink-0 w-full lg:w-auto text-center shadow-xl">
            <span className="text-3xl md:text-4xl text-white font-light block mb-2">AED 185 <span className="text-sm md:text-base text-zinc-500 font-light">/ guest</span></span>
            <div className="w-full h-px bg-white/10 my-4"></div>
            <span className="text-xs md:text-sm text-amber-500 tracking-[0.15em] uppercase block font-medium">+ AED 95 Wine Pairing</span>
          </div>
        </div>

        {/* Modern Menu Items Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700" key={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {activeSection?.items.map((item, itemIdx) => (
              <div key={itemIdx} className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 hover:border-amber-500/30 transition-all duration-500 rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full shadow-lg hover:shadow-[0_10px_40px_rgba(245,158,11,0.05)] hover:-translate-y-1">
                
                {/* Image Section */}
                <div className="relative h-56 sm:h-auto sm:w-[45%] overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  {/* Floating Price Badge */}
                  <div className="absolute top-4 right-4 sm:left-4 sm:right-auto bg-black/80 backdrop-blur-md border border-white/10 text-amber-500 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wider shadow-xl">
                    {item.price}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-gradient-to-r from-transparent to-black/40">
                  <div className="absolute top-0 left-6 md:left-8 w-12 h-[1px] bg-amber-500/30"></div>
                  <h4 className="text-xl md:text-2xl text-white font-light mb-3 group-hover:text-amber-500 transition-colors duration-300">{item.name}</h4>
                  <p className="text-zinc-400 font-light leading-relaxed text-xs md:text-sm flex-grow">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 md:mt-32 text-center p-8 md:p-12 border border-white/5 bg-[#0a0a0a] rounded-3xl">
          <p className="text-zinc-400 font-light text-sm md:text-base mb-3 md:mb-4">We accommodate most dietary restrictions. Please inform your server of any allergies.</p>
          <p className="text-zinc-500 text-xs md:text-sm italic">A 20% gratuity is added to parties of 6 or more.</p>
        </div>
      </div>
    </div>
  );
};

// ... ALL OTHER PAGES MAINTAIN THE DARK THEME UPGRADES ...
const AboutPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 bg-black min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle subtitle="The Legacy" title="About Nocturne" />
      
      {/* Introduction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-32">
        <div className="relative group px-4 md:px-0">
          <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000" alt="Chef preparing food" className="w-full h-[400px] md:h-[700px] object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] shadow-2xl rounded-2xl md:rounded-3xl border border-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 rounded-2xl md:rounded-3xl" />
          <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 w-40 h-40 md:w-64 md:h-64 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 md:p-8 flex flex-col justify-center items-center text-center shadow-[0_10px_50px_rgba(0,0,0,0.8)] transform group-hover:-translate-y-4 transition-transform duration-700 rounded-2xl md:rounded-3xl">
            <Star className="text-amber-500 mb-2 md:mb-4 w-6 h-6 md:w-10 md:h-10" />
            <h4 className="text-white text-lg md:text-2xl font-light mb-1 md:mb-2">Michelin Star</h4>
            <p className="text-zinc-400 text-[8px] md:text-xs tracking-[0.2em] uppercase">Awarded 23' & 24'</p>
          </div>
        </div>
        <div className="space-y-6 md:space-y-8 text-zinc-300 font-light text-base md:text-lg leading-relaxed mt-12 lg:mt-0">
          <p className="text-xl md:text-2xl text-white font-serif italic border-l-2 md:border-l-4 border-amber-500 pl-4 md:pl-6 py-2">
            "We do not merely serve food; we craft temporal art meant to be consumed and remembered."
          </p>
          <p>
            Founded in 2018 by visionary culinary artist Alexander Sterling, <span className="text-white font-medium">Nocturne</span> was born out of a profound desire to create a dining experience that challenges the senses while deeply respecting classical culinary traditions.
          </p>
          <p>
            Our philosophy is rigorously simple yet endlessly complex in execution: we source the absolute finest ingredients from ethical, local purveyors, treat them with absolute respect, and present them in ways that surprise, delight, and provoke conversation.
          </p>
          <p>
            Every dish is a narrative, constructed meticulously to guide our guests through a sensory journey. From the crisp bite of locally foraged greens to the rich, slow-developed umami of our 45-day dry-aged cuts, we believe that fine dining is not merely about sustenance, but about crafting indelible memories.
          </p>
        </div>
      </div>

      {/* Expanded Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 bg-[#0a0a0a] p-8 md:p-16 lg:p-20 border border-white/5 rounded-3xl shadow-2xl">
        <div>
          <h3 className="text-2xl md:text-3xl text-white font-light mb-4 md:mb-6 flex items-center">
            <span className="w-6 md:w-8 h-[2px] bg-amber-500 mr-3 md:mr-4"></span> The Architecture
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6 text-sm md:text-lg">
            The physical space of Nocturne acts as the perfect canvas. Intentionally dark, intimate, and moody, our dining room strips away external distractions. Designed by award-winning architectural firm Studio V, the space uses raw concrete, scorched wood, and subtle amber lighting to create a cocoon of culinary focus.
          </p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl text-white font-light mb-4 md:mb-6 flex items-center">
            <span className="w-6 md:w-8 h-[2px] bg-amber-500 mr-3 md:mr-4"></span> Sustainable Sourcing
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6 text-sm md:text-lg">
            Great food begins in the soil and the sea. We maintain direct relationships with over 40 independent farmers, foragers, and fishermen within a 100-mile radius. Our commitment to sustainability isn't a marketing tool; it is the fundamental baseline of our operations. We operate a true zero-waste kitchen.
          </p>
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
        The visionaries behind Nocturne's culinary excellence. Our team brings together decades of experience from the world's most celebrated kitchens, united by a passion for perfection and innovation.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
        {TEAM_MEMBERS.map((member, i) => (
          <div key={i} className="group text-center">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden mb-6 md:mb-8 border-[6px] border-[#0a0a0a] group-hover:border-amber-500/50 transition-colors duration-700 shadow-2xl relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110" />
            </div>
            <h4 className="text-xl md:text-2xl text-white font-light tracking-wide mb-2">{member.name}</h4>
            <div className="h-[1px] w-8 bg-amber-500 mx-auto mb-2 opacity-50"></div>
            <p className="text-amber-500 text-xs tracking-[0.2em] uppercase font-medium">{member.role}</p>
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
            <img 
              src={src} 
              alt={`Gallery image ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500 mix-blend-overlay" />
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
          <article 
            key={post.id} 
            onClick={() => navigate('journal-detail', post.id)}
            className="bg-[#0a0a0a] border border-white/5 group overflow-hidden flex flex-col rounded-3xl shadow-2xl hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <div className="h-56 md:h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center justify-between text-[10px] md:text-xs font-medium text-amber-500 tracking-[0.15em] uppercase mb-4">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h3 className="text-xl md:text-2xl text-white font-light mb-4 group-hover:text-amber-500 transition-colors">{post.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-xs md:text-sm mb-8 flex-grow">{post.excerpt}</p>
              <button className="flex items-center text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mt-auto group/btn">
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
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  return (
    <div className="animate-in fade-in duration-700 bg-black min-h-screen pb-24">
      {/* Editorial Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-black z-10" />
        <img 
          src={post.image} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
        
        <div className="relative z-30 w-full max-w-4xl mx-auto px-4 pb-12 md:pb-20">
          <button 
            onClick={() => navigate('blog')}
            className="flex items-center text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium mb-8 md:mb-12 group"
          >
            <ChevronLeft size={16} className="mr-2 transform transition-transform group-hover:-translate-x-1" /> Back to Journal
          </button>
          
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-amber-500 tracking-[0.15em] uppercase mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span>{post.author}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight drop-shadow-2xl mb-6">
            {post.title}
          </h1>
          <div className="w-24 h-[2px] bg-amber-500"></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 relative z-30">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 rounded-3xl shadow-2xl -mt-32 relative z-40">
          
          {/* Decorative Quote Icon */}
          <div className="absolute -top-6 right-10 text-amber-500/10 hidden md:block">
            <Quote size={120} className="transform rotate-180" />
          </div>

          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-light leading-relaxed space-y-8">
            <p className="text-xl md:text-2xl text-white font-serif italic border-l-4 border-amber-500 pl-6 py-2 mb-10 text-zinc-200">
              {post.excerpt}
            </p>
            
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-sm md:text-lg text-zinc-400 tracking-wide">
                {/* Add a subtle drop-cap to the first letter of the first paragraph */}
                {index === 0 ? (
                  <>
                    <span className="float-left text-5xl md:text-7xl font-serif text-amber-500 leading-none pr-3 pt-2">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          
          {/* Share / Footer of Article */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Share Article</span>
              <div className="flex space-x-3">
                <button className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-colors"><Twitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-colors"><Facebook size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Read Next Section */}
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10">
          <h3 className="text-xl md:text-2xl text-white font-light tracking-wide">Read Next</h3>
          <button onClick={() => navigate('blog')} className="text-amber-500 text-xs tracking-[0.2em] uppercase hover:text-amber-400 transition-colors">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.id !== postId).slice(0, 2).map((post) => (
            <article 
              key={post.id} 
              onClick={() => navigate('journal-detail', post.id)}
              className="flex flex-col sm:flex-row gap-6 bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 shadow-xl hover:border-amber-500/30 transition-all cursor-pointer group"
            >
              <div className="w-full sm:w-1/3 h-40 rounded-xl overflow-hidden shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-medium text-amber-500 tracking-[0.15em] uppercase mb-2">{post.date}</span>
                <h4 className="text-lg text-white font-light mb-2 group-hover:text-amber-500 transition-colors">{post.title}</h4>
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
            <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Date</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70" size={18} />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Guests</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none text-sm cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <option key={num}>{num} {num === 1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Time From</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70" size={18} />
                    <input 
                      type="time"
                      value={timeFrom}
                      onChange={(e) => setTimeFrom(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Time To</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70" size={18} />
                    <input 
                      type="time"
                      value={timeTo}
                      onChange={(e) => setTimeTo(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl text-white px-12 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs tracking-[0.15em] text-zinc-400 uppercase font-medium">Special Requests (Optional)</label>
                <textarea rows="4" placeholder="Dietary restrictions, special occasions..." className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none text-sm"></textarea>
              </div>

              <Button className="w-full py-4 text-sm md:text-base rounded-xl font-semibold tracking-widest">
                Confirm Reservation
              </Button>
            </form>
          </div>
          
          {/* Policies Side Panel */}
          <div className="bg-[#050505] border border-white/5 p-6 md:p-10 h-fit rounded-3xl shadow-xl">
            <h4 className="text-amber-500 text-base md:text-lg font-light tracking-[0.2em] uppercase mb-8 flex items-center">
              <div className="w-4 h-[1px] bg-amber-500 mr-3"></div> Policies
            </h4>
            <ul className="space-y-8 text-zinc-400 font-light text-xs md:text-sm">
              <li>
                <strong className="text-white block mb-2 font-medium tracking-wide">Dress Code</strong>
                Smart elegant. Jackets are preferred for gentlemen. Athletic wear, shorts, and flip-flops are not permitted.
              </li>
              <li>
                <strong className="text-white block mb-2 font-medium tracking-wide">Cancellation Policy</strong>
                We require 48 hours notice for cancellations. Late cancellations or no-shows are subject to a AED 50 per person fee.
              </li>
              <li>
                <strong className="text-white block mb-2 font-medium tracking-wide">Dietary Requirements</strong>
                Please inform us of any severe allergies at least 24 hours prior to your reservation.
              </li>
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
      
      {/* Immersive Map Section */}
      <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-white/5 mb-12 lg:mb-16 relative grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-700 shadow-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175407399587!2d-73.9878235234559!3d40.7484445353846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689254330960!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location Map"
        ></iframe>
        {/* Subtle amber overlay to blend map into the theme */}
        <div className="absolute inset-0 bg-amber-500/5 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Info */}
        <div className="space-y-8 md:space-y-12">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 space-y-8 md:space-y-10 rounded-3xl shadow-2xl">
            <div className="flex items-start space-x-5 md:space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                <MapPin className="text-amber-500" size={20} />
              </div>
              <div>
                <h4 className="text-white text-lg md:text-xl mb-2 font-light">Location</h4>
                <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">123 Culinary Avenue<br/>Gastronomy District<br/>Metropolis, NY 10012</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-5 md:space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                <Clock className="text-amber-500" size={20} />
              </div>
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
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                <Phone className="text-amber-500" size={20} />
              </div>
              <div>
                <h4 className="text-white text-lg md:text-xl mb-2 font-light">Direct Lines</h4>
                <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                  General: +1 (555) 123-4567<br/>
                  Events: +1 (555) 123-4568
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <form className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 space-y-6 md:space-y-8 rounded-3xl shadow-2xl" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-2xl md:text-3xl text-white font-light border-b border-white/5 pb-4 md:pb-6 mb-6 md:mb-8">Send an Inquiry</h3>
            <div className="space-y-2">
              <input type="text" placeholder="Name" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <textarea rows="4" placeholder="Message" className="w-full bg-black border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-amber-500 transition-colors resize-none text-sm"></textarea>
            </div>
            <Button variant="outline" className="w-full rounded-xl py-4 font-semibold tracking-widest text-xs md:text-sm">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeMenuTab, setActiveMenuTab] = useState(MENU_CATEGORIES[0].category);
  const [activePostId, setActivePostId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      default: return <HomePage navigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="cursor-pointer flex flex-col group relative z-50"
            onClick={() => navigateTo('home')}
          >
            <span className="text-2xl md:text-3xl font-serif tracking-widest text-white uppercase group-hover:text-amber-500 transition-colors duration-500">
              Nocturne
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-zinc-500 uppercase mt-1 transition-colors duration-500 group-hover:text-amber-500/70">Est. 2018</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-xs tracking-[0.15em] uppercase transition-all duration-500 relative group font-medium ${
                  currentPage === link.id ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-amber-500 transition-all duration-500 ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden relative z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-amber-500 transition-colors p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-6 md:space-y-8 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
        {NAV_LINKS.map((link, index) => (
          <button
            key={link.id}
            onClick={() => navigateTo(link.id)}
            style={{ transitionDelay: `${index * 50}ms` }}
            className={`text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${
              currentPage === link.id ? 'text-amber-500 font-light' : 'text-zinc-500 hover:text-white font-thin'
            }`}
          >
            {link.label}
          </button>
        ))}
        <div className={`pt-10 border-t border-white/10 flex space-x-8 transition-all duration-700 delay-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
           <Instagram className="text-zinc-600 hover:text-amber-500 cursor-pointer transition-colors" size={24} />
           <Facebook className="text-zinc-600 hover:text-amber-500 cursor-pointer transition-colors" size={24} />
           <Twitter className="text-zinc-600 hover:text-amber-500 cursor-pointer transition-colors" size={24} />
        </div>
      </div>

      {/* Main Content Area */}
      <main>
        {renderPage()}
      </main>

      {/* Premium Footer */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            
            {/* Brand */}
            <div className="col-span-1 lg:col-span-1">
              <span className="text-2xl font-serif tracking-widest text-white uppercase block mb-6">Nocturne</span>
              <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8 pr-4">
                Redefining modern gastronomy in an atmosphere of unparalleled, intentional elegance.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300"><Twitter size={18} /></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center"><span className="w-4 h-px bg-amber-500 mr-3"></span>Explore</h4>
              <ul className="space-y-4 text-zinc-500 font-light text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Home</button></li>
                <li><button onClick={() => navigateTo('menu')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Menu</button></li>
                <li><button onClick={() => navigateTo('team')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Team</button></li>
                <li><button onClick={() => navigateTo('gallery')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Gallery</button></li>
                <li><button onClick={() => navigateTo('blog')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Journal</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-amber-500 transition-colors flex items-center group"><ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Story</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center"><span className="w-4 h-px bg-amber-500 mr-3"></span>Contact</h4>
              <ul className="space-y-5 text-zinc-500 font-light text-sm">
                <li className="flex items-start"><MapPin size={16} className="mr-3 text-amber-500 shrink-0 mt-0.5" /> 123 Culinary Ave, NY</li>
                <li className="flex items-center"><Phone size={16} className="mr-3 text-amber-500 shrink-0" /> +1 (555) 123-4567</li>
                <li className="flex items-center"><Mail size={16} className="mr-3 text-amber-500 shrink-0" /> info@nocturne.com</li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-zinc-600 font-light tracking-widest uppercase">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Nocturne. All Rights Reserved.</p>
            <div className="space-x-6">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}