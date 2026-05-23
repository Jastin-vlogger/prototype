"use client"
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Calendar, Clock, 
  ChevronRight, ChevronLeft, ChevronDown, Activity, Heart, Sparkles, 
  User, Star, CheckCircle, ArrowRight, Facebook, Instagram, Twitter, 
  Quote, Shield, Award, Users, MessageCircle, ZoomIn, Linkedin, Lock, Plus, Trash2
} from 'lucide-react';

// --- BRAND COLORS ---
const BRAND_TEAL = '#68a69e';
const BRAND_GREY = '#737976';

// --- INITIAL DATA ---

const initialTeamMembers = [
  { 
    id: 't1', name: "Dr. Sarah Jenkins", role: "Chief Physiatrist", category: "PMR", 
    bio: "Specializes in neuro-rehabilitation and non-invasive pain management.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 't2', name: "Dr. Michael Chen", role: "Lead Dermatologist", category: "SKIN", 
    bio: "Expert in advanced laser therapies and aesthetic skin rejuvenation.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 't3', name: "Emily Rogers", role: "Senior Physical Therapist", category: "PMR", 
    bio: "Focuses on sports injuries and post-surgical orthopedic recovery.",
    img: "https://images.unsplash.com/photo-1594824436998-d58593aecf4a?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 't4', name: "David Kim", role: "Occupational Therapist", category: "PMR", 
    bio: "Dedicated to helping stroke survivors regain daily independence.",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 't5', name: "Dr. Olivia Bennett", role: "Aesthetic Medicine Specialist", category: "SKIN", 
    bio: "Specializes in bespoke cosmetic treatments and hair restoration.",
    img: "https://images.unsplash.com/photo-1527613426401-41c9ee90a369?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 't6', name: "Dr. James Wilson", role: "Sports Medicine Physician", category: "PMR", 
    bio: "Focuses on athletic performance optimization and injury prevention.",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" 
  }
];

const initialPmrMainServices = [
  {
    id: 'pmr-1',
    title: "PMR Clinic",
    icon: <Activity className="w-8 h-8" color={BRAND_TEAL} />,
    shortDesc: "Treating musculoskeletal, neurological, and cardiovascular ailments with minimally invasive techniques.",
    description: "Physical Medicine and Rehabilitation, also known as Physiatry, is a specialty of Modern Medicine that assists patients who have disabilities caused by pain, paralysis, functional limitations (cardio-pulmonary) or limb loss. Physiatrists treat patients with musculoskeletal, neurological, rheumatological (joint-related), pulmonary, and cardiovascular system ailments and are trained to perform minimally invasive pain and spasticity operations such as neurolysis, intra-articular/spinal injection techniques, and wound and contracture management surgeries. To deliver comprehensive, cutting-edge, and cost-effective rehabilitation, Physiatrists are trained to deliver the best therapeutic interventions using evidence-based research and technological innovations.",
    image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'pmr-2',
    title: "Sports Medicine",
    icon: <Heart className="w-8 h-8" color={BRAND_TEAL} />,
    shortDesc: "Treatment and prevention of injuries related to sports and exercise.",
    description: "Sports medicine is a branch of medicine that deals with physical fitness and the treatment and prevention of injuries related to sports and exercise. Sports Medicine is all about preventing and treating injuries and conditions so that you can begin or return, to the “Sports and Physical activities” you love, whether your “Activity” is professional, recreational or just a walk with your children. The goal is to allow you to reach your desired level of activity as quickly as possible by optimizing musculoskeletal function, minimizing pain, and addressing your orthopaedic, nutritional, pulmonary & cardiovascular health and well-being.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'pmr-3',
    title: "Physical Therapy",
    icon: <User className="w-8 h-8" color={BRAND_TEAL} />,
    shortDesc: "Remediation of impairments and promotion of mobility, functional ability, and quality of life.",
    description: "Physical Therapy /Physiotherapy (PT) is a healthcare profession primarily concerned with the remediation of impairments and disabilities and the promotion of mobility, functional ability, quality of life and movement potential. These are done through examination, evaluation, diagnosis and physical therapy interventions. Physical therapy helps the patient restore the use of muscles, bones, and the nervous system using various physical modalities and other techniques. It seeks to relieve pain, improve strength and mobility, and train the patient to perform important everyday tasks. Physical therapy is prescribed to rehabilitate a patient after orthopaedic injuries, arthritis, cardiac disease, cervical and lumbar dysfunction, neurological problems, pulmonary disease, spinal cord injuries, stroke, traumatic brain injuries, burns, cancer, amputations and other injuries/illnesses. In addition to clinical practice, other activities encompassed in the physical therapy profession include research, education, consultation, and administration.",
    image: "https://images.unsplash.com/photo-1594824436998-d58593aecf4a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'pmr-4',
    title: "Occupational Therapy",
    icon: <CheckCircle className="w-8 h-8" color={BRAND_TEAL} />,
    shortDesc: "Assisting people in pursuing their interests through therapeutic activities.",
    description: "Occupational Therapy (OT) involves the use of assessment and interventions to develop, recover or maintain a person’s ability to perform an activity which carries a purpose and meaning for the patient. Occupational therapy is significant as it assists people in pursuing their interests through therapeutic activities. It aids in dealing with daily activity requirements. It assists in the development of personality, which in turn facilitate and encourage the development of self-esteem and confidence. Occupational therapy involves evaluating a person’s physical, psychological, and social abilities in order to obtain the desired results. An appropriate intervention therapy is planned in order to increase the person’s ability to repair and do daily tasks such as feeding, brushing, clothing, playing, socialising, and so on. Leʹ Regain’s occupational therapy assessment, in other words, is a thorough examination of a person’s daily activities, handwriting, cognitive, perceptual, visual-motor, oral-motor skills, sensory processing, social, emotional, and functional behavioural abilities. The goal is to enhance a person’s capability to perform his/her roles and responsibilities in a desired and satisfactory manner.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'pmr-5',
    title: "Speech & Language Therapy",
    icon: <MessageCircle className="w-8 h-8" color={BRAND_TEAL} />,
    shortDesc: "Therapy for speech, language, communication disorders, and swallowing difficulties.",
    description: "Speech and language Therapy (SLT) is for both children and adults who have speech, language and communication disorders as well as swallowing difficulties. These issues might emerge as a result of congenital or acquired neurological disorders such as stroke, head injury, cerebral palsy among others. Leʹ Regain’s speech therapy programme begins with an assessment of person’s speech as well as communication skills and related conditions by a Speech & Language Pathologist (SLP). Based on this examination, the SLP develops individualized therapy plans. Common objectives may include increasing receptive and expressive language skills, deciding on other modes of communication, improving speech and swallowing skills with the help of different approaches or technology.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200"
  }
];

const rehabSubServices = [
  "Orthopedics And Rheumatology", "Neuro Rehabilitation", "Cardiovascular & Pulmonary",
  "Pediatric/Child Development Clinic", "Sports Injury Rehabilitation", "Pain Clinic",
  "Geriatric Rehabilitation", "Plastic Surgery and Burns", "Hand Rehabilitation",
  "Women’s Health Clinic", "Palliative Care & Rehabilitation", "Life Style & Weight Reduction Clinic",
  "Diabetes Clinic", "Balance And Vertigo Clinic", "Ergonomics Clinic", "Home Care Services"
];

const initialSkinServices = [
  {
    id: 'skin-1',
    title: "Skin Care Treatment",
    icon: <Sparkles className="w-10 h-10" color={BRAND_TEAL} />,
    shortDesc: "Hydrate, repair, and rejuvenate your skin for a smooth, radiant, and healthy appearance.",
    description: "Hydrate, repair, and rejuvenate your skin for a smooth, radiant, and healthy appearance. Our expert dermatologists use cutting-edge technology and tailored treatments to address acne, aging, pigmentation, and overall skin health.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'skin-2',
    title: "Hair Care Treatment",
    icon: <Sparkles className="w-10 h-10" color={BRAND_TEAL} />,
    shortDesc: "Strengthen, nourish, and revive your hair for a healthier, shinier, and more vibrant look.",
    description: "Strengthen, nourish, and revive your hair for a healthier, shinier, and more vibrant look. We offer comprehensive solutions for hair loss, scalp health, and aesthetic restoration using the latest medical advancements.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'skin-3',
    title: "Beauty Consultation",
    icon: <Sparkles className="w-10 h-10" color={BRAND_TEAL} />,
    shortDesc: "Personalized guidance to help you choose the right treatments for your skin, body, and wellness goals.",
    description: "Personalized guidance to help you choose the right treatments for your skin, body, and wellness goals. Sit down with our specialists to create a bespoke aesthetic roadmap designed entirely around your unique needs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
  }
];

const initialBlogPosts = [
  { 
    id: 'blog-1', title: "Top 5 Exercises for Knee Pain", category: "Rehabilitation", date: "Oct 12, 2023", 
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
    excerpt: "Discover simple, effective exercises you can do at home to alleviate chronic knee pain and strengthen supporting muscles.",
    content: "Chronic knee pain can significantly impact your daily life. However, targeted exercises can strengthen the muscles around the joint, providing better support and reducing discomfort. 1. Straight Leg Raises: Great for the quadriceps without straining the knee. 2. Hamstring Curls: Strengthens the back of your legs. 3. Calf Raises: Essential for lower leg stability. 4. Step-Ups: Mimics daily movements safely. 5. Side Leg Raises: Targets the abductors. Always consult with a physical therapist before starting a new regimen."
  },
  { 
    id: 'blog-2', title: "Understanding Your Skin Type", category: "Skin Care", date: "Oct 05, 2023", 
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    excerpt: "Not all skin is created equal. Learn how to identify whether you have oily, dry, combination, or sensitive skin.",
    content: "The first step to a flawless complexion is understanding what your skin actually needs. Using the wrong products can exacerbate issues rather than fix them. If your face feels tight after washing, you likely have dry skin. If you notice a shine by midday, you might have oily skin. Combination skin features an oily T-zone with dry cheeks. Sensitive skin reacts quickly to new products with redness or itching. Our beauty consultants can perform an in-depth analysis to formulate your perfect routine."
  },
  { 
    id: 'blog-3', title: "The Role of OT in Stroke Recovery", category: "Therapy", date: "Sep 28, 2023", 
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    excerpt: "Occupational therapy is a critical component in helping stroke survivors regain their independence and quality of life.",
    content: "Surviving a stroke is a monumental victory, but the journey to recovery often requires dedicated support. Occupational Therapy (OT) focuses on the 'occupations' of daily life—eating, dressing, bathing, and cognitive tasks. OT interventions are designed to rewire the brain (neuroplasticity) and teach adaptive strategies. At Le Regain, our OTs work closely with patients and families to modify home environments and practice essential skills, ensuring a safer, more confident return to daily activities."
  }
];

const initialGalleryImages = [
  { id: 'g1', category: 'Facility', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200', title: 'Modern Reception' },
  { id: 'g2', category: 'Therapy', url: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200', title: 'Physical Rehabilitation' },
  { id: 'g3', category: 'Aesthetics', url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200', title: 'Skin Consultation' },
  { id: 'g4', category: 'Facility', url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1200', title: 'Treatment Room' },
  { id: 'g5', category: 'Therapy', url: 'https://images.unsplash.com/photo-1594824436998-d58593aecf4a?auto=format&fit=crop&q=80&w=1200', title: 'Advanced Physiotherapy' },
  { id: 'g6', category: 'Aesthetics', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200', title: 'Laser Treatment' },
  { id: 'g7', category: 'Therapy', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200', title: 'Sports Medicine' },
  { id: 'g8', category: 'Aesthetics', url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200', title: 'Facial Aesthetics' },
  { id: 'g9', category: 'Facility', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200', title: 'Robotic Rehab Center' }
];

const initialTestimonials = [
  { id: 'test1', name: "John D.", text: "The physical therapy team at Le Regain helped me recover from my knee surgery faster than I ever expected. The modern equipment and personalized care were exceptional.", role: "PMR Patient", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: 'test2', name: "Sarah M.", text: "I've been visiting the Skin Clinic for months. The beauty consultation was eye-opening, and the treatments have completely transformed my skin's texture and glow.", role: "Aesthetics Client", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { id: 'test3', name: "Robert T.", text: "After my stroke, the speech and occupational therapy here gave me my life back. The staff is incredibly patient, skilled, and encouraging.", role: "Rehab Patient", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
];

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1920",
    title: "Welcome to Le Regain",
    subtitle: "Comprehensive care for your Body, Skin, and Hair under one roof.",
    button: "Discover Our Services"
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1920",
    title: "Advanced Rehabilitation",
    subtitle: "State-of-the-art Physical Medicine to help you regain mobility and strength.",
    button: "Explore PMR Clinic"
  },
  {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1920",
    title: "Aesthetic Excellence",
    subtitle: "Reveal your natural radiance with our specialized skin and hair treatments.",
    button: "View Skin Clinic"
  }
];


// --- ADMIN DASHBOARD COMPONENTS ---

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin/admin');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 pt-32 pb-24 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-[#68a69e]" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-center mb-8">Login to manage clinic content</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all" placeholder="admin" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full py-4 bg-[#68a69e] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ data, setData, onLogout }) {
  const [activeTab, setActiveTab] = useState('blogs');
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [e.target.name]: reader.result }));
      };
      reader.readAsDataURL(file); // Converts image to Base64 to store in state
    }
  };

  const handleAdd = (e, category) => {
    e.preventDefault();
    const newItem = { id: `new-${Date.now()}`, ...formData };
    
    // Add default icon for services if omitted, as it expects React components
    if((category === 'pmr' || category === 'skin') && !newItem.icon) {
       newItem.icon = category === 'pmr' ? <Activity className="w-8 h-8 text-[#68a69e]"/> : <Sparkles className="w-8 h-8 text-[#68a69e]"/>;
    }

    setData(prev => ({
      ...prev,
      [category]: [newItem, ...prev[category]]
    }));
    
    // Clear form and reset native file inputs
    setFormData({});
    e.target.reset();
  };

  const handleDelete = (category, id) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const renderFormInput = (name, placeholder, type="text") => (
    <input type={type} name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={placeholder} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm mb-3 transition-all" required />
  );

  const renderFormTextarea = (name, placeholder) => (
    <textarea name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={placeholder} rows="3" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm mb-3 resize-none transition-all" required />
  );

  const renderFileInput = (name, label) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-teal-50/50 hover:border-[#68a69e] transition-all relative overflow-hidden group">
              {formData[name] ? (
                  <div className="absolute inset-0 w-full h-full bg-black">
                      <img src={formData[name]} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-gray-900/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                             Change Image
                          </span>
                      </div>
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-[#68a69e]" />
                      </div>
                      <p className="mb-1 text-sm text-gray-500"><span className="font-bold text-[#68a69e]">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                  </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                name={name} 
                onChange={handleFileChange} 
                onClick={(e) => { e.target.value = null; }} // Fixes double-upload issue
                className="hidden" 
                required={!formData[name]} // Only required if image isn't already in state
              />
          </label>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your website content in real-time.</p>
          </div>
          <button onClick={onLogout} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-sm">
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {[
            { id: 'blogs', label: 'Blogs' },
            { id: 'team', label: 'Team Members' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'pmr', label: 'PMR Services' },
            { id: 'skin', label: 'Skin Services' },
            { id: 'testimonials', label: 'Testimonials' }
          ].map(tab => (
            <button key={tab.id} onClick={() => {setActiveTab(tab.id); setFormData({});}} className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#68a69e] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Plus className="w-5 h-5 mr-2 text-[#68a69e]" /> Add New Entry</h3>
              <form onSubmit={(e) => handleAdd(e, activeTab)}>
                {activeTab === 'blogs' && (
                  <>
                    {renderFormInput('title', 'Blog Title')}
                    {renderFormInput('category', 'Category (e.g. Skin Care)')}
                    {renderFormInput('date', 'Date (e.g. Oct 12, 2023)')}
                    {renderFileInput('image', 'Upload Blog Image')}
                    {renderFormTextarea('excerpt', 'Short Excerpt')}
                    {renderFormTextarea('content', 'Full Content')}
                  </>
                )}
                {activeTab === 'team' && (
                  <>
                    {renderFormInput('name', 'Full Name')}
                    {renderFormInput('role', 'Job Role / Title')}
                    <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-3 text-gray-700" required>
                      <option value="">Select Department...</option>
                      <option value="PMR">PMR (Rehab)</option>
                      <option value="SKIN">Hair & Skin Clinic</option>
                    </select>
                    {renderFileInput('img', 'Upload Profile Image')}
                    {renderFormTextarea('bio', 'Short Biography')}
                  </>
                )}
                {activeTab === 'gallery' && (
                  <>
                    {renderFormInput('title', 'Image Title')}
                    <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-3 text-gray-700" required>
                      <option value="">Select Category...</option>
                      <option value="Facility">Facility</option>
                      <option value="Therapy">Therapy</option>
                      <option value="Aesthetics">Aesthetics</option>
                    </select>
                    {renderFileInput('url', 'Upload High-Res Image')}
                  </>
                )}
                {(activeTab === 'pmr' || activeTab === 'skin') && (
                  <>
                    {renderFormInput('title', 'Service Title')}
                    {renderFileInput('image', 'Upload Hero Image')}
                    {renderFormTextarea('shortDesc', 'Short Summary')}
                    {renderFormTextarea('description', 'Full Detailed Description')}
                  </>
                )}
                {activeTab === 'testimonials' && (
                  <>
                    {renderFormInput('name', 'Patient Name')}
                    {renderFormInput('role', 'Patient Tag (e.g. PMR Patient)')}
                    <select name="rating" value={formData.rating || ''} onChange={handleInputChange} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-3 text-gray-700" required>
                      <option value="">Select Rating...</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                    {renderFormTextarea('text', 'Testimonial Review')}
                    {renderFileInput('img', 'Upload Patient Photo')}
                  </>
                )}
                <button type="submit" className="w-full mt-4 py-4 bg-[#68a69e] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">Publish Entry</button>
              </form>
            </div>
          </div>

          {/* List/Manage Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                 <h3 className="text-xl font-bold text-gray-900">Manage Entries</h3>
                 <span className="bg-teal-50 text-[#68a69e] px-3 py-1 rounded-full text-sm font-bold">{data[activeTab]?.length || 0} Total</span>
              </div>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {data[activeTab]?.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex items-center space-x-4 overflow-hidden">
                      <img src={item.image || item.img || item.url} alt={item.title || item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 truncate text-base">{item.title || item.name}</h4>
                        <p className="text-sm text-gray-500 truncate mt-0.5">{item.category || item.role || item.shortDesc || item.excerpt}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(activeTab, item.id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {(!data[activeTab] || data[activeTab].length === 0) && (
                   <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                     <p className="text-gray-500 font-medium">No entries found for this category.</p>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- HELPER COMPONENTS ---

function MessageCircleIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
    </svg>
  );
}

const AppointmentModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
          <X className="w-5 h-5" />
        </button>
        
        {submitted ? (
          <div className="text-center py-10 animate-in slide-in-from-bottom-4">
            <CheckCircle className="w-20 h-20 mx-auto mb-6" color={BRAND_TEAL} />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: BRAND_GREY }}>Request Sent!</h3>
            <p className="text-gray-600 text-sm sm:text-base">Our team will contact you shortly to confirm your appointment details.</p>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 pt-2 sm:pt-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: BRAND_GREY }}>Book Appointment</h2>
              <p className="text-sm text-gray-500">Take the first step towards better health and radiance.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Clinic Branch</label>
                <div className="relative">
                  <select required className="w-full p-3 sm:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] focus:border-transparent outline-none appearance-none transition-all text-sm sm:text-base">
                    <option value="">Select a branch...</option>
                    <option value="pmr">Physical Medicine & Rehab</option>
                    <option value="skin">Hair & Skin Clinic</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                  <input required type="text" className="w-full p-3 sm:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input required type="text" className="w-full p-3 sm:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input required type="tel" className="w-full p-3 sm:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date</label>
                <input required type="date" className="w-full p-3 sm:p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" />
              </div>
              <button type="submit" className="w-full py-3.5 sm:py-4 mt-6 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" style={{ backgroundColor: BRAND_TEAL }}>
                Confirm Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  // Advanced routing & UI state
  const [route, setRoute] = useState({ path: 'HOME', params: {} });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePmrOpen, setMobilePmrOpen] = useState(false);
  const [mobileSkinOpen, setMobileSkinOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- APP GLOBAL DATA STATE ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [appData, setAppData] = useState({
    pmr: initialPmrMainServices,
    skin: initialSkinServices,
    team: initialTeamMembers,
    blogs: initialBlogPosts,
    gallery: initialGalleryImages,
    testimonials: initialTestimonials
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path, params = {}) => {
    setRoute({ path, params });
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileTeamOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparent = !scrolled && (route.path === 'HOME' || route.path === 'SERVICE_DETAIL');

  const Logo = () => (
    <div className="flex flex-col items-center cursor-pointer group shrink-0" onClick={() => navigateTo('HOME')}>
      <div className="flex items-baseline">
        <span className={`text-2xl sm:text-3xl font-serif italic mr-1 transition-colors ${isTransparent ? 'text-white' : 'text-[#737976] group-hover:text-black'}`}>Le</span>
        <span className={`text-4xl sm:text-5xl font-serif font-bold italic transition-transform group-hover:scale-105 ${isTransparent ? 'text-white' : 'text-[#68a69e]'}`}>Regain</span>
      </div>
      <div className={`mt-[-6px] sm:mt-[-8px] ml-8 sm:ml-12 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center transition-all shadow-sm group-hover:shadow-md ${isTransparent ? 'bg-white/20 backdrop-blur-md border border-white/20' : 'bg-[#737976]'}`}>
        <span className="text-white text-[10px] sm:text-xs tracking-widest uppercase font-serif">Hair & Skin Clinic</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fafafa]">
      
      {/* Modern Transparent High-End Header */}
      <header className="fixed w-full top-0 z-50">
        {/* Top Bar */}
        <div className={`hidden md:flex justify-between items-center px-8 text-xs font-medium tracking-wide transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0 py-0' : 'h-10 opacity-100 py-2.5'} ${isTransparent ? 'bg-white/10 backdrop-blur-md border-b border-white/10 text-white/90' : 'bg-[#737976] text-white'}`}>
          <div className="flex space-x-8">
            <a href="tel:+15551234567" className="flex items-center hover:text-[#68a69e] transition"><Phone className="w-3.5 h-3.5 mr-2" /> +1 (555) 123-4567</a>
            <a href="mailto:info@leregain.com" className="flex items-center hover:text-[#68a69e] transition"><Mail className="w-3.5 h-3.5 mr-2" /> info@leregain.com</a>
          </div>
          <div className="flex space-x-6">
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2" /> Mon-Sat: 9AM - 8PM</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className={`transition-all duration-500 ${scrolled ? 'pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8' : 'px-0'}`}>
          <nav className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-6xl bg-white/95 backdrop-blur-xl shadow-2xl shadow-[#68a69e]/10 rounded-full border border-gray-100 py-2.5 sm:py-2 px-5 sm:px-6' : 'w-full py-4 sm:py-5 px-4 sm:px-6 lg:px-8'} ${!scrolled && !isTransparent ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center">
              <Logo />
              
              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-3">
                {['HOME', 'ABOUT'].map(path => (
                   <button key={path} onClick={() => navigateTo(path)} className={`relative px-4 py-2 text-sm font-bold transition-colors group ${route.path === path ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}>
                     {path}
                     <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${route.path === path ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isTransparent ? 'bg-white' : 'bg-[#68a69e]'}`}></span>
                   </button>
                ))}
                
                {/* Dropdown for Services - READS FROM STATE */}
                <div className="relative group px-4 py-2">
                  <button 
                    onClick={() => navigateTo('SERVICES')} 
                    className={`relative flex items-center text-sm font-bold transition-colors group-hover:text-gray-900 ${route.path === 'SERVICES' || route.path === 'SERVICE_DETAIL' ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600')}`}
                  >
                    SERVICES <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${route.path === 'SERVICES' || route.path === 'SERVICE_DETAIL' ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isTransparent ? 'bg-white' : 'bg-[#68a69e]'}`}></span>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[650px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 overflow-hidden flex">
                    <div className="flex-1 p-6 border-r border-gray-100/50 bg-gray-50/50">
                      <button onClick={() => navigateTo('SERVICES', { tab: 'PMR' })} className="flex items-center text-[#68a69e] font-black tracking-widest text-xs uppercase mb-4 hover:text-gray-900 transition-colors w-full text-left">
                        <Activity className="w-4 h-4 mr-2" /> Physical Medicine & Rehab
                      </button>
                      <ul className="space-y-1">
                        {appData.pmr.map(service => (
                           <li key={service.id}>
                             <button onClick={() => navigateTo('SERVICE_DETAIL', { category: 'PMR', id: service.id })} className="text-sm font-semibold text-gray-700 hover:text-[#68a69e] hover:translate-x-1 transition-all w-full text-left py-1.5 flex items-center">
                               <ChevronRight className="w-3 h-3 mr-1.5 opacity-0 -ml-4 transition-all" /> {service.title}
                             </button>
                           </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 p-6">
                      <button onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })} className="flex items-center text-[#68a69e] font-black tracking-widest text-xs uppercase mb-4 hover:text-gray-900 transition-colors w-full text-left">
                        <Sparkles className="w-4 h-4 mr-2" /> Hair & Skin Clinic
                      </button>
                      <ul className="space-y-1">
                        {appData.skin.map(service => (
                           <li key={service.id}>
                             <button onClick={() => navigateTo('SERVICE_DETAIL', { category: 'SKIN', id: service.id })} className="text-sm font-semibold text-gray-700 hover:text-[#68a69e] hover:translate-x-1 transition-all w-full text-left py-1.5 flex items-center">
                               <ChevronRight className="w-3 h-3 mr-1.5 opacity-0 -ml-4 transition-all" /> {service.title}
                             </button>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dropdown for OUR TEAM */}
                <div className="relative group px-4 py-2">
                  <button 
                    onClick={() => navigateTo('TEAM')} 
                    className={`relative flex items-center text-sm font-bold transition-colors group-hover:text-gray-900 ${route.path === 'TEAM' ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600')}`}
                  >
                    OUR TEAM <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${route.path === 'TEAM' ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isTransparent ? 'bg-white' : 'bg-[#68a69e]'}`}></span>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 overflow-hidden">
                    <div className="p-3">
                      <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100/50 mb-2">Our Experts</div>
                      <button onClick={() => navigateTo('TEAM', { tab: 'PMR' })} className="w-full text-left px-4 py-4 text-sm font-bold text-gray-700 hover:bg-teal-50/50 hover:text-[#68a69e] rounded-2xl transition-all flex items-start group/item">
                        <div className="bg-white shadow-sm p-2 rounded-xl mr-4 group-hover/item:scale-110 transition-transform"><Activity className="w-5 h-5 text-[#68a69e]" /></div>
                        <div>
                          <span className="block text-gray-900">PMR Team</span>
                          <span className="block text-xs text-gray-500 font-normal mt-0.5">Physical Medicine Experts</span>
                        </div>
                      </button>
                      <button onClick={() => navigateTo('TEAM', { tab: 'SKIN' })} className="w-full text-left px-4 py-4 text-sm font-bold text-gray-700 hover:bg-teal-50/50 hover:text-[#68a69e] rounded-2xl transition-all flex items-start group/item">
                        <div className="bg-white shadow-sm p-2 rounded-xl mr-4 group-hover/item:scale-110 transition-transform"><Sparkles className="w-5 h-5 text-[#68a69e]" /></div>
                        <div>
                          <span className="block text-gray-900">Hair & Skin Team</span>
                          <span className="block text-xs text-gray-500 font-normal mt-0.5">Aesthetic Specialists</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {['TECHNOLOGIES', 'GALLERY', 'BLOG', 'CONTACT US'].map(path => (
                   <button key={path} onClick={() => navigateTo(path)} className={`relative px-4 py-2 text-sm font-bold transition-colors group ${route.path === path ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}>
                     {path === 'CONTACT US' ? 'CONTACT' : path}
                     <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${route.path === path ? 'w-1/2' : 'w-0 group-hover:w-1/2'} ${isTransparent ? 'bg-white' : 'bg-[#68a69e]'}`}></span>
                   </button>
                ))}
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`ml-6 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:-translate-y-1 flex items-center relative overflow-hidden group shadow-lg shrink-0 ${isTransparent ? 'bg-white text-[#68a69e] hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)]' : 'bg-[#68a69e] text-white hover:shadow-[0_8px_20px_rgba(104,166,158,0.4)]'}`}
                >
                  <span className={`absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${isTransparent ? 'bg-[#68a69e]/10' : 'bg-white/20'}`}></span>
                  <span className="relative flex items-center">Book Appointment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(true)} className={`p-2.5 rounded-xl focus:outline-none transition-colors ${isTransparent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-50 text-gray-600 hover:bg-teal-50 hover:text-[#68a69e]'}`}>
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-out Drawer */}
      <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 shrink-0">
           <div className="scale-75 origin-left"><Logo /></div>
           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
             <X className="w-6 h-6" />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 sm:py-6 px-4 space-y-2">
          {['HOME', 'ABOUT'].map((link) => (
            <button key={link} onClick={() => navigateTo(link)} className={`block w-full text-left px-5 py-4 text-sm font-bold tracking-wide rounded-2xl transition-colors ${route.path === link ? 'bg-teal-50 text-[#68a69e]' : 'text-gray-700 hover:bg-gray-50'}`}>{link}</button>
          ))}
          
          <div className="bg-gray-50/50 rounded-3xl p-2 my-2 border border-gray-100">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-sm font-bold tracking-wide text-gray-700 rounded-2xl hover:bg-white transition-colors"
            >
              SERVICES <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-[#68a69e]' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <div className="mb-2">
                <button onClick={() => setMobilePmrOpen(!mobilePmrOpen)} className="w-full flex justify-between items-center px-4 sm:px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-xl shadow-sm border border-gray-100/50">
                  <span className="flex items-center"><Activity className="w-4 h-4 mr-2 sm:mr-3 text-[#68a69e]" /> Physical Medicine</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobilePmrOpen ? 'rotate-180 text-[#68a69e]' : 'text-gray-400'}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 pl-6 sm:pl-8 pr-2 ${mobilePmrOpen ? 'max-h-96 opacity-100 mt-2 mb-3' : 'max-h-0 opacity-0'}`}>
                  <button onClick={() => navigateTo('SERVICES', { tab: 'PMR' })} className="block w-full text-left py-2 text-sm font-bold text-[#68a69e] mb-1">View All Department</button>
                  {appData.pmr.map(service => (
                     <button key={service.id} onClick={() => navigateTo('SERVICE_DETAIL', { category: 'PMR', id: service.id })} className="block w-full text-left py-2 text-sm text-gray-600 hover:text-[#68a69e]">{service.title}</button>
                  ))}
                </div>
              </div>
              <div>
                <button onClick={() => setMobileSkinOpen(!mobileSkinOpen)} className="w-full flex justify-between items-center px-4 sm:px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-xl shadow-sm border border-gray-100/50">
                  <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2 sm:mr-3 text-[#68a69e]" /> Hair & Skin Clinic</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSkinOpen ? 'rotate-180 text-[#68a69e]' : 'text-gray-400'}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 pl-6 sm:pl-8 pr-2 ${mobileSkinOpen ? 'max-h-96 opacity-100 mt-2 mb-3' : 'max-h-0 opacity-0'}`}>
                  <button onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })} className="block w-full text-left py-2 text-sm font-bold text-[#68a69e] mb-1">View All Department</button>
                  {appData.skin.map(service => (
                     <button key={service.id} onClick={() => navigateTo('SERVICE_DETAIL', { category: 'SKIN', id: service.id })} className="block w-full text-left py-2 text-sm text-gray-600 hover:text-[#68a69e]">{service.title}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-3xl p-2 my-2 border border-gray-100">
            <button 
              onClick={() => setMobileTeamOpen(!mobileTeamOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-sm font-bold tracking-wide text-gray-700 rounded-2xl hover:bg-white transition-colors"
            >
              OUR TEAM <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileTeamOpen ? 'rotate-180 text-[#68a69e]' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileTeamOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <button onClick={() => navigateTo('TEAM', { tab: 'PMR' })} className="w-full text-left px-5 py-3 text-sm font-semibold text-gray-600 hover:text-[#68a69e] flex items-center bg-white rounded-xl mb-2 shadow-sm"><Activity className="w-4 h-4 mr-3 text-[#68a69e]" /> PMR Team</button>
              <button onClick={() => navigateTo('TEAM', { tab: 'SKIN' })} className="w-full text-left px-5 py-3 text-sm font-semibold text-gray-600 hover:text-[#68a69e] flex items-center bg-white rounded-xl shadow-sm"><Sparkles className="w-4 h-4 mr-3 text-[#68a69e]" /> Hair & Skin Team</button>
            </div>
          </div>

          {['TECHNOLOGIES', 'GALLERY', 'BLOG', 'CONTACT US'].map((link) => (
            <button key={link} onClick={() => navigateTo(link)} className={`block w-full text-left px-5 py-4 text-sm font-bold tracking-wide rounded-2xl transition-colors ${route.path === link ? 'bg-teal-50 text-[#68a69e]' : 'text-gray-700 hover:bg-gray-50'}`}>{link === 'CONTACT US' ? 'CONTACT' : link}</button>
          ))}
        </div>

        <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50 shrink-0">
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: BRAND_TEAL }}>Book Appointment</button>
        </div>
      </div>

      {/* Main Route Rendering */}
      <main className="flex-grow flex flex-col">
        {route.path === 'HOME' && <HomePage openModal={() => setIsModalOpen(true)} navigateTo={navigateTo} data={appData} />}
        {route.path === 'ABOUT' && <AboutPage />}
        {route.path === 'SERVICES' && <ServicesPage initialTab={route.params.tab} navigateTo={navigateTo} data={appData} />}
        {route.path === 'SERVICE_DETAIL' && <ServiceDetailPage serviceId={route.params.id} category={route.params.category} openModal={() => setIsModalOpen(true)} navigateTo={navigateTo} data={appData} />}
        {route.path === 'TEAM' && <TeamPage initialTab={route.params.tab} navigateTo={navigateTo} data={appData} />}
        {route.path === 'TECHNOLOGIES' && <TechnologiesPage />}
        {route.path === 'GALLERY' && <GalleryPage data={appData} />}
        {route.path === 'BLOG' && <BlogPage navigateTo={navigateTo} data={appData} />}
        {route.path === 'BLOG_DETAIL' && <BlogDetailPage blogId={route.params.id} data={appData} />}
        {route.path === 'CONTACT US' && <ContactPage />}
        
        {/* Admin Portal Route */}
        {route.path === 'ADMIN' && (
          !isAdminLoggedIn ? 
            <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} /> : 
            <AdminDashboard data={appData} setData={setAppData} onLogout={() => {setIsAdminLoggedIn(false); navigateTo('HOME');}} />
        )}
      </main>

      {/* Floating Footer CTA */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <div className="bg-[#15201e]/95 backdrop-blur-3xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-[#68a69e]/20 to-transparent opacity-50"></div>
           <div className="relative z-10 text-center lg:text-left mb-6 lg:mb-0 lg:mr-8 max-w-2xl">
             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white tracking-tight">Join the Le Regain Community</h3>
             <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">Subscribe to our newsletter for exclusive wellness tips, aesthetic trends, and priority booking notifications.</p>
           </div>
           <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
             <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-white outline-none w-full sm:w-72 focus:ring-2 focus:ring-[#68a69e] transition-all font-medium placeholder:text-gray-500" />
             <button className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#68a69e] text-white font-bold hover:bg-white hover:text-[#0a0f0e] transition-colors shrink-0 shadow-lg w-full sm:w-auto">Subscribe</button>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0f0e] text-white pt-10 sm:pt-16 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none leading-none">
          LE REGAIN
        </div>
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#68a69e]/10 rounded-full blur-[100px] sm:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#68a69e]/10 rounded-full blur-[100px] sm:blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 sm:mb-20">
            <div className="sm:col-span-2 lg:col-span-4 pr-0 lg:pr-8">
              <div className="bg-white/5 backdrop-blur-md inline-block p-5 sm:p-6 rounded-3xl mb-6 sm:mb-8 border border-white/10 shadow-xl">
                 <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigateTo('HOME')}>
                   <div className="flex items-baseline">
                     <span className="text-2xl sm:text-3xl font-serif italic mr-1 text-white">Le</span>
                     <span className="text-4xl sm:text-5xl font-serif font-bold italic text-[#68a69e]">Regain</span>
                   </div>
                   <div className="mt-[-6px] sm:mt-[-8px] ml-8 sm:ml-12 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center shadow-sm bg-[#68a69e]/20 border border-[#68a69e]/30">
                     <span className="text-white text-[10px] sm:text-xs tracking-widest uppercase font-serif">Hair & Skin Clinic</span>
                   </div>
                 </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 font-light text-sm sm:text-base">
                A premier destination for restorative physical medicine and advanced aesthetic treatments. Blending cutting-edge medical technology with compassionate care.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white tracking-wide uppercase">Explore</h4>
              <ul className="space-y-3 sm:space-y-4">
                {['Home', 'About Us', 'Our Team', 'Technologies', 'Gallery'].map(link => (
                  <li key={link}>
                    <button onClick={() => navigateTo(link.split(' ')[1] === 'Team' ? 'TEAM' : link.split(' ')[0].toUpperCase())} className="text-gray-400 hover:text-[#68a69e] transition-colors flex items-center group font-medium text-sm sm:text-base">
                      <ChevronRight className="w-4 h-4 mr-2 text-[#68a69e]/50 group-hover:text-[#68a69e] transition-colors" /> {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white tracking-wide uppercase">Departments</h4>
              <ul className="space-y-5 sm:space-y-6">
                <li>
                  <button onClick={() => navigateTo('SERVICES', {tab: 'PMR'})} className="text-left group block">
                    <strong className="block text-gray-200 font-semibold mb-1 group-hover:text-[#68a69e] transition-colors text-sm sm:text-base">Physical Medicine & Rehab</strong>
                    <span className="text-gray-500 text-xs sm:text-sm leading-tight block">Sports medicine, pain management.</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('SERVICES', {tab: 'SKIN'})} className="text-left group block">
                    <strong className="block text-gray-200 font-semibold mb-1 group-hover:text-[#68a69e] transition-colors text-sm sm:text-base">Hair & Skin Clinic</strong>
                    <span className="text-gray-500 text-xs sm:text-sm leading-tight block">Advanced dermatology, aesthetics.</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 text-white tracking-wide uppercase">Contact Us</h4>
              <ul className="space-y-4 sm:space-y-6">
                <li className="flex items-start group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-3 sm:mr-4 shrink-0 group-hover:bg-[#68a69e]/20 transition-colors"><MapPin className="w-4 h-4 text-[#68a69e]" /></div>
                  <span className="text-gray-400 text-sm mt-1 leading-relaxed">123 Wellness Avenue,<br/>Health District, NY 10001</span>
                </li>
                <li className="flex items-center group cursor-pointer" onClick={() => window.location.href="tel:+15551234567"}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-3 sm:mr-4 shrink-0 group-hover:bg-[#68a69e]/20 transition-colors"><Phone className="w-4 h-4 text-[#68a69e]" /></div>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              &copy; {new Date().getFullYear()} Le Regain Clinics. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-gray-500 font-medium">
              <a href="#" className="hover:text-[#68a69e] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#68a69e] transition-colors">Terms of Service</a>
              <button onClick={() => navigateTo('ADMIN')} className="text-[#68a69e] hover:text-white transition-colors font-bold">Admin Login</button>
            </div>
          </div>
        </div>
      </footer>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}


// --- PAGE COMPONENTS ---

function HomePage({ openModal, navigateTo, data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const slideDuration = 6000;
    const interval = 50; 
    const step = (interval / slideDuration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { setCurrentSlide((s) => (s + 1) % heroSlides.length); return 0; }
        return prev + step;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (data.testimonials.length === 0) return;
    const testTimer = setInterval(() => setCurrentTestimonial((prev) => (prev + 1) % data.testimonials.length), 5000);
    return () => clearInterval(testTimer);
  }, [data.testimonials.length]);

  const manualSlide = (index) => { setCurrentSlide(index); setProgress(0); };

  return (
    <div className="animate-in fade-in duration-500 w-full overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-[85vh] min-h-[600px] bg-black overflow-hidden group">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/80 via-black/50 sm:via-black/40 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`} />
            <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-0">
              <div className="max-w-2xl text-left w-full">
                <div className={`inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-1000 delay-100 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Welcome to Excellence</div>
                <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.15] drop-shadow-2xl transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.title}</h1>
                <p className={`text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-10 drop-shadow-md font-light leading-relaxed transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.subtitle}</p>
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <button onClick={() => { if(index === 1) navigateTo('SERVICES', {tab: 'PMR'}); else if(index === 2) navigateTo('SERVICES', {tab: 'SKIN'}); else navigateTo('SERVICES'); }} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-base sm:text-lg font-bold transition-all shadow-[0_0_20px_rgba(104,166,158,0.4)] hover:shadow-[0_0_30px_rgba(104,166,158,0.6)] hover:bg-white hover:text-[#68a69e] border-2 border-transparent text-center" style={{ backgroundColor: index !== 0 ? BRAND_TEAL : undefined, ...(index === 0 && {backgroundColor: BRAND_TEAL}) }}>{slide.button}</button>
                  <button onClick={openModal} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-base sm:text-lg font-bold border-2 border-white/50 hover:bg-white hover:text-black transition-colors backdrop-blur-sm text-center">Book Consultation</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Animated Progress Indicators */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex justify-center space-x-3 sm:space-x-4 px-4">
          {heroSlides.map((_, idx) => (
            <div key={idx} onClick={() => manualSlide(idx)} className="h-1.5 w-12 sm:w-16 bg-white/30 rounded-full cursor-pointer overflow-hidden relative">
              {idx === currentSlide && <div className="absolute top-0 left-0 h-full bg-[#68a69e]" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />}
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Why Choose Le Regain</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">Elevating Standards in <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#68a69e] to-[#4a8079]">Healthcare & Aesthetics</span></h3>
            <p className="text-base sm:text-lg text-gray-600 px-2">We integrate medical expertise with innovative technology to provide holistic, results-driven care tailored perfectly to you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[
              { icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />, title: "Expert Specialists", desc: "Board-certified physiatrists and dermatologists leading your care plan." },
              { icon: <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />, title: "Advanced Tech", desc: "Utilizing state-of-the-art robotic rehab and premium aesthetic lasers." },
              { icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />, title: "Holistic Approach", desc: "Treating the whole person, integrating functional recovery and external radiance." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-8 sm:p-10 text-center hover:bg-white hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-[#68a69e] to-[#4a8079] rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-lg group-hover:-translate-y-2 transition-transform rotate-3 group-hover:rotate-0">{feature.icon}</div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#68a69e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-0">
            <div className="max-w-2xl">
              <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Our Departments</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Comprehensive Care Centers</h3>
            </div>
            <button onClick={() => navigateTo('SERVICES')} className="hidden md:flex items-center text-[#68a69e] font-bold hover:text-gray-900 transition-colors group whitespace-nowrap">View All Services <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" /></button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* PMR Card */}
            <div className="group relative rounded-[2rem] sm:rounded-3xl overflow-hidden cursor-pointer" onClick={() => navigateTo('SERVICES', { tab: 'PMR' })}>
              <div className="absolute inset-0 bg-gray-900/50 sm:bg-gray-900/40 z-10 group-hover:bg-gray-900/30 transition-colors duration-500"></div>
              <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200" alt="PMR" className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 sm:mb-6"><Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" /></div>
                <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Physical Medicine & Rehab</h3>
                <p className="text-gray-200 text-sm sm:text-lg mb-5 sm:mb-6 line-clamp-2 max-w-md">Expert physiotherapy, sports medicine, and rehabilitation services to restore your mobility.</p>
                <span className="inline-flex items-center text-white font-bold bg-[#68a69e] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full w-max text-sm sm:text-base hover:bg-white hover:text-[#68a69e] transition-colors">Explore Department <ArrowRight className="w-4 h-4 ml-2" /></span>
              </div>
            </div>
            {/* Skin Card */}
            <div className="group relative rounded-[2rem] sm:rounded-3xl overflow-hidden cursor-pointer" onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })}>
              <div className="absolute inset-0 bg-gray-900/50 sm:bg-gray-900/40 z-10 group-hover:bg-gray-900/30 transition-colors duration-500"></div>
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200" alt="Skin Care" className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 sm:mb-6"><Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" /></div>
                <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Hair & Skin Clinic</h3>
                <p className="text-gray-200 text-sm sm:text-lg mb-5 sm:mb-6 line-clamp-2 max-w-md">Advanced dermatological treatments, hair restoration, and bespoke aesthetic consultations.</p>
                <span className="inline-flex items-center text-white font-bold bg-[#737976] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full w-max text-sm sm:text-base hover:bg-white hover:text-[#737976] transition-colors">Explore Department <ArrowRight className="w-4 h-4 ml-2" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Patient Stories</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Hear from our Community</h3>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* The Slider Container */}
            <div className="relative h-[450px] sm:h-[400px] md:h-[300px]">
              {data.testimonials.length > 0 ? data.testimonials.map((test, idx) => (
                <div 
                  key={test.id || idx} 
                  className={`absolute inset-0 w-full transition-all duration-700 ease-in-out flex flex-col items-center text-center px-2 sm:px-0
                    ${idx === currentTestimonial ? 'opacity-100 translate-x-0 z-20' : 
                      idx < currentTestimonial ? 'opacity-0 -translate-x-full z-0' : 'opacity-0 translate-x-full z-0'}`}
                >
                  <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-gray-100 mb-4 sm:mb-6" />
                  <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-gray-700 leading-relaxed mb-6 sm:mb-8 md:px-12">
                    "{test.text}"
                  </p>
                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <img src={test.img || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} alt={test.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-gray-50 shadow-md" />
                    <div className="text-center sm:text-left">
                      <h5 className="font-bold text-gray-900 text-base sm:text-lg">{test.name}</h5>
                      <span className="text-[#68a69e] font-medium text-xs sm:text-sm">{test.role}</span>
                      <div className="flex justify-center sm:justify-start text-yellow-400 mt-1">
                        {[...Array(Number(test.rating) || 5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />)}
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="flex items-center justify-center h-full text-gray-500 font-medium">No testimonials available.</div>
              )}
            </div>

            {/* Slider Controls */}
            {data.testimonials.length > 0 && (
              <div className="flex justify-center items-center space-x-4 sm:space-x-6 mt-4 sm:mt-8">
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length)}
                  className="p-2 sm:p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-[#68a69e] hover:text-white transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex space-x-2">
                  {data.testimonials.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'bg-[#68a69e] w-6 sm:w-8' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % data.testimonials.length)}
                  className="p-2 sm:p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-[#68a69e] hover:text-white transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4 sm:gap-0">
            <div>
              <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Our Blog</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Latest Insights & News</h3>
            </div>
            <button onClick={() => navigateTo('BLOG')} className="text-[#68a69e] font-bold hover:underline text-sm sm:text-base">View All Articles</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.blogs.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col" onClick={() => navigateTo('BLOG_DETAIL', { id: post.id })}>
                <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                  <img src={post.image || post.url || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-[#68a69e] uppercase tracking-wider">{post.category}</div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium mb-2 flex items-center"><Calendar className="w-3.5 h-3.5 mr-2" /> {post.date || 'Recent'}</span>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#68a69e] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>
                  <span className="text-[#68a69e] font-bold flex items-center text-sm sm:text-base mt-auto">Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 relative bg-[#1a2b29] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover mix-blend-overlay" alt="bg" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">Ready to Start Your Wellness Journey?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-300 font-light px-2 sm:px-0">Whether you need advanced physical rehabilitation or expert aesthetic care, our multidisciplinary team is here for you.</p>
          <button onClick={openModal} className="w-full sm:w-auto bg-[#68a69e] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(104,166,158,0.3)] hover:shadow-[0_0_40px_rgba(104,166,158,0.6)] hover:-translate-y-1 transition-all duration-300">
            Book an Appointment Today
          </button>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ initialTab = 'PMR', navigateTo, data }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => { setActiveTab(initialTab || 'PMR'); }, [initialTab]);

  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 animate-in slide-in-from-bottom-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Our Services</h1>
          <p className="text-base sm:text-lg text-gray-600">Select a department below to explore our comprehensive range of specialized medical and aesthetic treatments.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10 sm:mb-12 animate-in slide-in-from-bottom-8">
          <button onClick={() => setActiveTab('PMR')} className={`px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl transition-all flex items-center justify-center ${activeTab === 'PMR' ? 'bg-[#68a69e] text-white shadow-xl sm:scale-105' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}><Activity className="w-5 h-5 mr-3 shrink-0" /> Physical Medicine & Rehab</button>
          <button onClick={() => setActiveTab('SKIN')} className={`px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl transition-all flex items-center justify-center ${activeTab === 'SKIN' ? 'bg-[#737976] text-white shadow-xl sm:scale-105' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}><Sparkles className="w-5 h-5 mr-3 shrink-0" /> Hair & Skin Clinic</button>
        </div>

        <div className="animate-in fade-in duration-500">
          {activeTab === 'PMR' ? (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {data.pmr.map((service) => (
                  <div key={service.id} className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col sm:flex-row items-start" onClick={() => navigateTo('SERVICE_DETAIL', { category: 'PMR', id: service.id })}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 mb-4 sm:mb-0 group-hover:scale-110 transition-transform overflow-hidden">
                       {service.icon ? service.icon : (service.image && <img src={service.image} className="w-full h-full object-cover"/>)}
                    </div>
                    <div className="sm:ml-6 flex-grow">
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">{service.shortDesc}</p>
                      <span className="text-[#68a69e] font-bold inline-flex items-center text-sm sm:text-base">View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-gray-200">
                <div className="text-center mb-8 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Rehabilitation Programs</h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">In addition to our core clinics, we offer an extensive array of specialized rehabilitation programs tailored to unique conditions.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
                  {rehabSubServices.map((item, idx) => (
                    <span key={idx} className="px-4 sm:px-5 py-2 sm:py-3 bg-white text-gray-700 rounded-full text-xs sm:text-sm font-semibold shadow-sm border border-gray-100 hover:bg-[#68a69e] hover:text-white transition-colors cursor-default text-center">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {data.skin.map((service) => (
                <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col" onClick={() => navigateTo('SERVICE_DETAIL', { category: 'SKIN', id: service.id })}>
                  <div className="h-56 sm:h-64 overflow-hidden relative shrink-0">
                     <img src={service.image || "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={service.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                     <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mr-3 sm:mr-4 shrink-0 overflow-hidden">
                           {service.icon ? React.cloneElement(service.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6', color: 'white' }) : <Sparkles className="w-5 h-5 text-white"/>}
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h4>
                     </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">{service.shortDesc}</p>
                    <span className="text-[#737976] font-bold flex items-center group-hover:text-[#68a69e] transition-colors text-sm sm:text-base">View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceDetailPage({ serviceId, category, openModal, navigateTo, data }) {
  let serviceData = category === 'PMR' ? data.pmr.find(s => s.id === serviceId) : data.skin.find(s => s.id === serviceId);
  if (!serviceData) return <div className="py-32 text-center text-xl sm:text-2xl text-gray-500">Service not found. <button onClick={() => navigateTo('SERVICES')} className="text-[#68a69e] underline ml-2">Back to Services</button></div>;
  const themeColor = category === 'PMR' ? BRAND_TEAL : BRAND_GREY;

  return (
    <div className="bg-white pb-16 sm:pb-24 animate-in fade-in duration-500">
      <div className="relative h-[40vh] md:h-[50vh] min-h-[350px] overflow-hidden">
        <img src={serviceData.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"} alt={serviceData.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigateTo('SERVICES', {tab: category})} className="text-white/80 hover:text-white flex items-center mb-4 sm:mb-6 w-max font-semibold text-xs sm:text-sm uppercase tracking-wider"><ChevronLeft className="w-4 h-4 mr-1" /> Back to {category === 'PMR' ? 'PMR Clinic' : 'Hair & Skin Clinic'}</button>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl hidden sm:flex items-center justify-center border border-white/20 shrink-0">
              {serviceData.icon ? React.cloneElement(serviceData.icon, { color: 'white', className: 'w-8 h-8 sm:w-10 sm:h-10' }) : <Activity className="w-8 h-8 text-white"/>}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">{serviceData.title}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Overview</h2>
            <div className="prose prose-base sm:prose-lg prose-teal max-w-none text-gray-600 leading-relaxed mb-10 sm:mb-12">
              <p>{serviceData.description}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4">Our Approach</h3>
              <p>At Le Regain, we believe in a holistic and individualized approach. Every patient receives a comprehensive evaluation from our expert team to determine the root cause of their concerns.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 font-medium text-gray-700">
                <li>Personalized consultation and assessment.</li>
                <li>Utilization of cutting-edge technology and techniques.</li>
                <li>Continuous monitoring and plan adjustment.</li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 sm:top-32 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to get started?</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Schedule a consultation with our specialized experts today.</p>
              <button onClick={openModal} className="w-full py-3.5 sm:py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-sm sm:text-base" style={{ backgroundColor: themeColor }}>Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPage({ initialTab = 'PMR', navigateTo, data }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => { setActiveTab(initialTab || 'PMR'); }, [initialTab]);
  const displayedTeam = data.team.filter(member => member.category === activeTab);

  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 animate-in slide-in-from-bottom-4">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Le Regain Experts</h2>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Meet Our Team</h1>
          <p className="text-base sm:text-lg text-gray-600">Our dedicated professionals are committed to your recovery, health, and aesthetic goals.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10 sm:mb-16 animate-in slide-in-from-bottom-8">
          <button onClick={() => setActiveTab('PMR')} className={`px-6 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-full transition-all flex items-center justify-center ${activeTab === 'PMR' ? 'bg-[#68a69e] text-white shadow-xl sm:scale-105' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}><Activity className="w-5 h-5 mr-3 shrink-0" /> PMR Specialists</button>
          <button onClick={() => setActiveTab('SKIN')} className={`px-6 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-full transition-all flex items-center justify-center ${activeTab === 'SKIN' ? 'bg-[#737976] text-white shadow-xl sm:scale-105' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}><Sparkles className="w-5 h-5 mr-3 shrink-0" /> Hair & Skin Specialists</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 animate-in fade-in duration-500">
          {displayedTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100">
              <div className="relative h-72 sm:h-80 overflow-hidden bg-gray-100">
                <img src={member.img || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#68a69e] hover:bg-[#68a69e] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#68a69e] hover:bg-[#68a69e] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"><Mail className="w-5 h-5" /></a>
                </div>
              </div>
              <div className="p-8 text-center">
                <span className="inline-block px-3 py-1 bg-teal-50 text-[#68a69e] text-xs font-bold rounded-full uppercase tracking-wider mb-4">{member.category === 'PMR' ? 'Rehabilitation' : 'Aesthetics'}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <h4 className="text-[#68a69e] font-semibold mb-4 text-sm sm:text-base">{member.role}</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
          {displayedTeam.length === 0 && <p className="col-span-full text-center text-gray-500 py-10">No team members found for this department.</p>}
        </div>
      </div>
    </div>
  );
}

function GalleryPage({ data }) {
  const [filter, setFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const categories = ['All', 'Facility', 'Therapy', 'Aesthetics'];
  const filteredImages = filter === 'All' ? data.gallery : data.gallery.filter(img => img.category === filter);

  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-gray-50 min-h-screen animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Our Environment</h2>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Clinic Gallery</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${filter === cat ? 'bg-[#68a69e] text-white shadow-lg sm:scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative h-64 sm:h-80 rounded-[2rem] sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-white" onClick={() => setLightboxImage(image)}>
              <img src={image.url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"} alt={image.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-14 h-14 rounded-full bg-[#68a69e]/90 backdrop-blur-sm flex items-center justify-center text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"><ZoomIn className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{image.title}</h3>
                <span className="text-gray-300 text-sm mt-1 uppercase tracking-wider font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50" onClick={() => setLightboxImage(null)}><X className="w-6 h-6 sm:w-8 sm:h-8" /></button>
          <div className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <img src={lightboxImage.url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"} alt={lightboxImage.title} className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" />
            <div className="text-center mt-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{lightboxImage.title}</h3>
              <p className="text-[#68a69e] font-semibold uppercase tracking-widest text-sm">{lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogPage({ navigateTo, data }) {
  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 animate-in slide-in-from-bottom-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Health & Beauty Insights</h1>
          <p className="text-base sm:text-lg text-gray-600">Expert articles, tips, and news from the medical and aesthetic professionals at Le Regain.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {data.blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col" onClick={() => navigateTo('BLOG_DETAIL', { id: post.id })}>
              <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                <img src={post.image || post.url || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-[#68a69e] uppercase tracking-wider">{post.category}</div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                <span className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 flex items-center"><Calendar className="w-3.5 h-3.5 sm:w-4 h-4 mr-2" /> {post.date || 'Recent'}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#68a69e] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow">{post.excerpt}</p>
                <span className="text-[#68a69e] font-bold flex items-center mt-auto text-sm sm:text-base">Read Full Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></span>
              </div>
            </div>
          ))}
          {data.blogs.length === 0 && <p className="col-span-full text-center text-gray-500 py-10">No articles published yet.</p>}
        </div>
      </div>
    </div>
  );
}

function BlogDetailPage({ blogId, data }) {
  const post = data.blogs.find(p => p.id === blogId);
  if(!post) return <div className="py-32 text-center text-xl">Article not found.</div>;

  return (
    <div className="bg-white pb-16 sm:pb-24 animate-in fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-50 text-[#68a69e] font-bold text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-center text-gray-500 font-medium text-sm sm:text-base gap-2 sm:gap-0">
            <span className="flex items-center"><Calendar className="w-4 sm:w-5 h-4 sm:h-5 mr-2" /> {post.date || 'Recent'}</span>
            <span className="hidden sm:inline mx-4">•</span><span>By Le Regain Experts</span>
          </div>
        </div>
        <div className="rounded-[2rem] sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 shadow-xl h-[300px] sm:h-[400px] md:h-[500px]">
          <img src={post.image || post.url || "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200"} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="prose prose-base sm:prose-lg prose-teal mx-auto text-gray-700 leading-relaxed px-2 sm:px-0">
          <p className="text-lg sm:text-xl font-medium text-gray-900 mb-6 sm:mb-8 leading-relaxed">{post.excerpt}</p>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}

// --- STATIC PAGES ---
function AboutPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-white animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-[#68a69e] rounded-3xl translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10" />
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="rounded-3xl shadow-2xl object-cover h-[400px] sm:h-[500px] md:h-[600px] w-full" />
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex items-center z-10">
              <div className="text-3xl sm:text-4xl font-bold text-[#68a69e] mr-3 sm:mr-4">15+</div>
              <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase">Years of<br/>Excellence</div>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>About Le Regain</h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Empowering your health, restoring your confidence.</h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light">At Le Regain, our mission is to empower individuals to achieve optimal health, function, and confidence through a uniquely integrated approach.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
              <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center"><Activity className="w-5 h-5 text-[#68a69e] mr-2 shrink-0"/> Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">To provide holistic solutions tailored to each patient's needs, combining Physical Medicine with advanced aesthetics.</p>
              </div>
              <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center"><Star className="w-5 h-5 text-[#68a69e] mr-2 shrink-0"/> Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">To be the premier destination for comprehensive care, recognized for innovative therapies and exceptional outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechnologiesPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-gray-50 min-h-screen animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: BRAND_TEAL }}>Innovation</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 text-gray-900">Advanced Technologies</h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 sm:mb-16 font-light">We invest in the absolute latest medical and aesthetic technologies to ensure the safest, fastest, and best outcomes for our patients.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {[
            { title: "Robotic Rehabilitation", desc: "State-of-the-art robotic assistance for precise, repetitive motion therapy, crucial for neuro-rehabilitation and fast-tracking stroke recovery." },
            { title: "Advanced Laser Therapy", desc: "Modern laser tech for non-invasive skin rejuvenation, targeted hair growth stimulation, and effective pain management in deep tissues." },
            { title: "3D Motion Analysis", desc: "High-speed cameras and software to analyze gait and sports mechanics, helping to pinpoint exactly where biomechanical faults occur." }
          ].map((tech, i) => (
             <div key={i} className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#68a69e] transition-colors"><Activity className="w-6 h-6 sm:w-8 sm:h-8 text-[#68a69e] group-hover:text-white transition-colors" /></div>
               <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{tech.title}</h3>
               <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{tech.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 sm:pb-24 bg-white animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">Get in Touch</h1>
          <p className="text-base sm:text-lg text-gray-600">Have a question or want to schedule a visit? Our team is ready to assist you with all your wellness needs.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">Send us a Message</h3>
            <form className="space-y-4 sm:space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full p-3.5 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full p-3.5 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full p-3.5 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm sm:text-base" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea rows="4" className="w-full p-3.5 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all resize-none text-sm sm:text-base" placeholder="How can we help you today?"></textarea>
              </div>
              <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" style={{ backgroundColor: BRAND_TEAL }}>Send Message</button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-gray-50 p-6 sm:p-10 rounded-[2rem] sm:rounded-3xl border border-gray-100">
               <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">Contact Information</h3>
               <ul className="space-y-5 sm:space-y-6">
                  <li className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mr-3 sm:mr-4 shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#68a69e]" /></div>
                    <div>
                      <strong className="block text-gray-900 font-bold mb-1 text-sm sm:text-base">Clinic Address</strong>
                      <span className="text-gray-600 leading-relaxed text-sm sm:text-base">123 Wellness Avenue,<br/>Health District, NY 10001</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mr-3 sm:mr-4 shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#68a69e]" /></div>
                    <div>
                      <strong className="block text-gray-900 font-bold mb-1 text-sm sm:text-base">Phone Number</strong>
                      <span className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</span>
                    </div>
                  </li>
               </ul>
            </div>
            <div className="h-48 sm:h-64 bg-gray-200 rounded-[2rem] sm:rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Map View" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}