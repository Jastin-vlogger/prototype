"use client"
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Calendar, Clock, 
  ChevronRight, ChevronLeft, ChevronDown, Activity, Heart, Sparkles, 
  User, Star, CheckCircle, ArrowRight, Facebook, Instagram, Twitter, 
  Quote, Shield, Award, Users, MessageCircle, ZoomIn, Linkedin, Lock, Plus, Trash2,
  MousePointer2
} from 'lucide-react';

// --- BRAND COLORS ---
const BRAND_TEAL = '#68a69e';
const BRAND_GREY = '#737976';

// --- INITIAL DATA ---
const initialTeamMembers = [
  { id: 't1', name: "Dr. Sarah Jenkins", role: "Chief Physiatrist", category: "PMR", bio: "Specializes in neuro-rehabilitation and non-invasive pain management.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
  { id: 't2', name: "Dr. Michael Chen", role: "Lead Dermatologist", category: "SKIN", bio: "Expert in advanced laser therapies and aesthetic skin rejuvenation.", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" },
  { id: 't3', name: "Emily Rogers", role: "Senior Physical Therapist", category: "PMR", bio: "Focuses on sports injuries and post-surgical orthopedic recovery.", img: "https://images.unsplash.com/photo-1594824436998-d58593aecf4a?auto=format&fit=crop&q=80&w=600" },
  { id: 't4', name: "David Kim", role: "Occupational Therapist", category: "PMR", bio: "Dedicated to helping stroke survivors regain daily independence.", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
  { id: 't5', name: "Dr. Olivia Bennett", role: "Aesthetic Medicine Specialist", category: "SKIN", bio: "Specializes in bespoke cosmetic treatments and hair restoration.", img: "https://images.unsplash.com/photo-1527613426401-41c9ee90a369?auto=format&fit=crop&q=80&w=600" },
  { id: 't6', name: "Dr. James Wilson", role: "Sports Medicine Physician", category: "PMR", bio: "Focuses on athletic performance optimization and injury prevention.", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" }
];

const initialPmrMainServices = [
  { id: 'pmr-1', title: "PMR Clinic", icon: <Activity className="w-8 h-8" />, shortDesc: "Treating musculoskeletal, neurological, and cardiovascular ailments with minimally invasive techniques.", description: "Physical Medicine and Rehabilitation, also known as Physiatry, is a specialty of Modern Medicine that assists patients who have disabilities caused by pain, paralysis, functional limitations (cardio-pulmonary) or limb loss. Physiatrists treat patients with musculoskeletal, neurological, rheumatological (joint-related), pulmonary, and cardiovascular system ailments and are trained to perform minimally invasive pain and spasticity operations such as neurolysis, intra-articular/spinal injection techniques, and wound and contracture management surgeries. To deliver comprehensive, cutting-edge, and cost-effective rehabilitation, Physiatrists are trained to deliver the best therapeutic interventions using evidence-based research and technological innovations.", image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200" },
  { id: 'pmr-2', title: "Sports Medicine", icon: <Heart className="w-8 h-8" />, shortDesc: "Treatment and prevention of injuries related to sports and exercise.", description: "Sports medicine is a branch of medicine that deals with physical fitness and the treatment and prevention of injuries related to sports and exercise. Sports Medicine is all about preventing and treating injuries and conditions so that you can begin or return, to the “Sports and Physical activities” you love, whether your “Activity” is professional, recreational or just a walk with your children. The goal is to allow you to reach your desired level of activity as quickly as possible by optimizing musculoskeletal function, minimizing pain, and addressing your orthopaedic, nutritional, pulmonary & cardiovascular health and well-being.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200" },
  { id: 'pmr-3', title: "Physical Therapy", icon: <User className="w-8 h-8" />, shortDesc: "Remediation of impairments and promotion of mobility, functional ability, and quality of life.", description: "Physical Therapy /Physiotherapy (PT) is a healthcare profession primarily concerned with the remediation of impairments and disabilities and the promotion of mobility, functional ability, quality of life and movement potential. These are done through examination, evaluation, diagnosis and physical therapy interventions. Physical therapy helps the patient restore the use of muscles, bones, and the nervous system using various physical modalities and other techniques. It seeks to relieve pain, improve strength and mobility, and train the patient to perform important everyday tasks. Physical therapy is prescribed to rehabilitate a patient after orthopaedic injuries, arthritis, cardiac disease, cervical and lumbar dysfunction, neurological problems, pulmonary disease, spinal cord injuries, stroke, traumatic brain injuries, burns, cancer, amputations and other injuries/illnesses. In addition to clinical practice, other activities encompassed in the physical therapy profession include research, education, consultation, and administration.", image: "https://images.unsplash.com/photo-1594824436998-d58593aecf4a?auto=format&fit=crop&q=80&w=1200" },
  { id: 'pmr-4', title: "Occupational Therapy", icon: <CheckCircle className="w-8 h-8" />, shortDesc: "Assisting people in pursuing their interests through therapeutic activities.", description: "Occupational Therapy (OT) involves the use of assessment and interventions to develop, recover or maintain a person’s ability to perform an activity which carries a purpose and meaning for the patient. Occupational therapy is significant as it assists people in pursuing their interests through therapeutic activities. It aids in dealing with daily activity requirements. It assists in the development of personality, which in turn facilitate and encourage the development of self-esteem and confidence. Occupational therapy involves evaluating a person’s physical, psychological, and social abilities in order to obtain the desired results. An appropriate intervention therapy is planned in order to increase the person’s ability to repair and do daily tasks such as feeding, brushing, clothing, playing, socialising, and so on. Leʹ Regain’s occupational therapy assessment, in other words, is a thorough examination of a person’s daily activities, handwriting, cognitive, perceptual, visual-motor, oral-motor skills, sensory processing, social, emotional, and functional behavioural abilities. The goal is to enhance a person’s capability to perform his/her roles and responsibilities in a desired and satisfactory manner.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" },
  { id: 'pmr-5', title: "Speech & Language Therapy", icon: <MessageCircle className="w-8 h-8" />, shortDesc: "Therapy for speech, language, communication disorders, and swallowing difficulties.", description: "Speech and language Therapy (SLT) is for both children and adults who have speech, language and communication disorders as well as swallowing difficulties. These issues might emerge as a result of congenital or acquired neurological disorders such as stroke, head injury, cerebral palsy among others. Leʹ Regain’s speech therapy programme begins with an assessment of person’s speech as well as communication skills and related conditions by a Speech & Language Pathologist (SLP). Based on this examination, the SLP develops individualized therapy plans. Common objectives may include increasing receptive and expressive language skills, deciding on other modes of communication, improving speech and swallowing skills with the help of different approaches or technology.", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200" }
];

const rehabSubServices = [
  "Orthopedics And Rheumatology", "Neuro Rehabilitation", "Cardiovascular & Pulmonary",
  "Pediatric/Child Development Clinic", "Sports Injury Rehabilitation", "Pain Clinic",
  "Geriatric Rehabilitation", "Plastic Surgery and Burns", "Hand Rehabilitation",
  "Women’s Health Clinic", "Palliative Care & Rehabilitation", "Life Style & Weight Reduction Clinic",
  "Diabetes Clinic", "Balance And Vertigo Clinic", "Ergonomics Clinic", "Home Care Services"
];

const initialSkinServices = [
  { id: 'skin-1', title: "Skin Care Treatment", icon: <Sparkles className="w-8 h-8" />, shortDesc: "Hydrate, repair, and rejuvenate your skin for a smooth, radiant, and healthy appearance.", description: "Hydrate, repair, and rejuvenate your skin for a smooth, radiant, and healthy appearance. Our expert dermatologists use cutting-edge technology and tailored treatments to address acne, aging, pigmentation, and overall skin health.", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200" },
  { id: 'skin-2', title: "Hair Care Treatment", icon: <Sparkles className="w-8 h-8" />, shortDesc: "Strengthen, nourish, and revive your hair for a healthier, shinier, and more vibrant look.", description: "Strengthen, nourish, and revive your hair for a healthier, shinier, and more vibrant look. We offer comprehensive solutions for hair loss, scalp health, and aesthetic restoration using the latest medical advancements.", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200" },
  { id: 'skin-3', title: "Beauty Consultation", icon: <Sparkles className="w-8 h-8" />, shortDesc: "Personalized guidance to help you choose the right treatments for your skin, body, and wellness goals.", description: "Personalized guidance to help you choose the right treatments for your skin, body, and wellness goals. Sit down with our specialists to create a bespoke aesthetic roadmap designed entirely around your unique needs.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" }
];

const initialBlogPosts = [
  { id: 'blog-1', title: "Top 5 Exercises for Knee Pain", category: "Rehabilitation", date: "Oct 12, 2023", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800", excerpt: "Discover simple, effective exercises you can do at home to alleviate chronic knee pain and strengthen supporting muscles.", content: "Chronic knee pain can significantly impact your daily life. However, targeted exercises can strengthen the muscles around the joint, providing better support and reducing discomfort. 1. Straight Leg Raises: Great for the quadriceps without straining the knee. 2. Hamstring Curls: Strengthens the back of your legs. 3. Calf Raises: Essential for lower leg stability. 4. Step-Ups: Mimics daily movements safely. 5. Side Leg Raises: Targets the abductors. Always consult with a physical therapist before starting a new regimen." },
  { id: 'blog-2', title: "Understanding Your Skin Type", category: "Skin Care", date: "Oct 05, 2023", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800", excerpt: "Not all skin is created equal. Learn how to identify whether you have oily, dry, combination, or sensitive skin.", content: "The first step to a flawless complexion is understanding what your skin actually needs. Using the wrong products can exacerbate issues rather than fix them. If your face feels tight after washing, you likely have dry skin. If you notice a shine by midday, you might have oily skin. Combination skin features an oily T-zone with dry cheeks. Sensitive skin reacts quickly to new products with redness or itching. Our beauty consultants can perform an in-depth analysis to formulate your perfect routine." },
  { id: 'blog-3', title: "The Role of OT in Stroke Recovery", category: "Therapy", date: "Sep 28, 2023", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800", excerpt: "Occupational therapy is a critical component in helping stroke survivors regain their independence and quality of life.", content: "Surviving a stroke is a monumental victory, but the journey to recovery often requires dedicated support. Occupational Therapy (OT) focuses on the 'occupations' of daily life—eating, dressing, bathing, and cognitive tasks. OT interventions are designed to rewire the brain (neuroplasticity) and teach adaptive strategies. At Le Regain, our OTs work closely with patients and families to modify home environments and practice essential skills, ensuring a safer, more confident return to daily activities." }
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
    title: "The Pinnacle of Wellness",
    subtitle: "Comprehensive, bespoke care for your Body, Skin, and Hair under one distinguished roof.",
    button: "Discover Our Approach"
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1920",
    title: "Advanced Rehabilitation",
    subtitle: "State-of-the-art Physical Medicine designed to restore your absolute mobility and strength.",
    button: "Explore PMR Clinic"
  },
  {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1920",
    title: "Aesthetic Excellence",
    subtitle: "Reveal your natural, timeless radiance with our specialized clinical skin and hair treatments.",
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
    if (username === 'admin' && password === 'admin') onLogin();
    else setError('Invalid credentials. Use admin/admin');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8faf9] pt-32 pb-24 px-4 font-sans">
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(104,166,158,0.15)] w-full max-w-md border border-gray-100/50">
        <div className="w-16 h-16 bg-[#68a69e]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Lock className="w-8 h-8 text-[#68a69e]" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Secure login to manage clinic content</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center font-medium border border-red-100">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all" placeholder="admin" required />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full py-4 bg-[#68a69e] text-white font-bold rounded-xl shadow-lg hover:shadow-[0_8px_25px_-5px_rgba(104,166,158,0.4)] hover:-translate-y-0.5 transition-all">
            Authenticate
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
      reader.onloadend = () => setFormData(prev => ({ ...prev, [e.target.name]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e, category) => {
    e.preventDefault();
    const newItem = { id: `new-${Date.now()}`, ...formData };
    if((category === 'pmr' || category === 'skin') && !newItem.icon) {
       newItem.icon = category === 'pmr' ? <Activity className="w-8 h-8"/> : <Sparkles className="w-8 h-8"/>;
    }
    setData(prev => ({ ...prev, [category]: [newItem, ...prev[category]] }));
    setFormData({});
    e.target.reset();
  };

  const handleDelete = (category, id) => setData(prev => ({ ...prev, [category]: prev[category].filter(item => item.id !== id) }));

  const renderFormInput = (name, placeholder, type="text") => (
    <input type={type} name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={placeholder} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm mb-4 transition-all" required />
  );

  const renderFormTextarea = (name, placeholder) => (
    <textarea name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={placeholder} rows="4" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm mb-4 resize-none transition-all" required />
  );

  const renderFileInput = (name, label) => (
    <div className="mb-5">
      <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">{label}</label>
      <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-[#68a69e]/5 hover:border-[#68a69e] transition-all relative overflow-hidden group">
              {formData[name] ? (
                  <div className="absolute inset-0 w-full h-full bg-black">
                      <img src={formData[name]} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">Change Image</span>
                      </div>
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-[#68a69e]" />
                      </div>
                      <p className="mb-1 text-sm text-gray-500"><span className="font-bold text-[#68a69e]">Click to upload</span></p>
                  </div>
              )}
              <input type="file" accept="image/*" name={name} onChange={handleFileChange} onClick={(e) => { e.target.value = null; }} className="hidden" required={!formData[name]} />
          </label>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-[#f8faf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">Manage clinic content securely.</p>
          </div>
          <button onClick={onLogout} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm">
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {[{ id: 'blogs', label: 'Blogs' }, { id: 'team', label: 'Team Members' }, { id: 'gallery', label: 'Gallery' }, { id: 'pmr', label: 'PMR Services' }, { id: 'skin', label: 'Skin Services' }, { id: 'testimonials', label: 'Testimonials' }].map(tab => (
            <button key={tab.id} onClick={() => {setActiveTab(tab.id); setFormData({});}} className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#68a69e] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-32">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 flex items-center"><Plus className="w-5 h-5 mr-2 text-[#68a69e]" /> Add New Entry</h3>
              <form onSubmit={(e) => handleAdd(e, activeTab)}>
                {/* Form fields identical to original logic but styled cleanly */}
                {activeTab === 'blogs' && (<>{renderFormInput('title', 'Blog Title')} {renderFormInput('category', 'Category')} {renderFormInput('date', 'Date')} {renderFileInput('image', 'Upload Image')} {renderFormTextarea('excerpt', 'Excerpt')} {renderFormTextarea('content', 'Content')}</>)}
                {activeTab === 'team' && (<>{renderFormInput('name', 'Full Name')} {renderFormInput('role', 'Job Role')} <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-4" required><option value="">Select Department...</option><option value="PMR">PMR (Rehab)</option><option value="SKIN">Hair & Skin</option></select> {renderFileInput('img', 'Profile Image')} {renderFormTextarea('bio', 'Biography')}</>)}
                {activeTab === 'gallery' && (<>{renderFormInput('title', 'Image Title')} <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-4" required><option value="">Category...</option><option value="Facility">Facility</option><option value="Therapy">Therapy</option><option value="Aesthetics">Aesthetics</option></select> {renderFileInput('url', 'High-Res Image')}</>)}
                {(activeTab === 'pmr' || activeTab === 'skin') && (<>{renderFormInput('title', 'Service Title')} {renderFileInput('image', 'Hero Image')} {renderFormTextarea('shortDesc', 'Short Summary')} {renderFormTextarea('description', 'Detailed Description')}</>)}
                {activeTab === 'testimonials' && (<>{renderFormInput('name', 'Patient Name')} {renderFormInput('role', 'Patient Tag')} <select name="rating" value={formData.rating || ''} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm mb-4" required><option value="">Rating...</option><option value="5">5 Stars</option><option value="4">4 Stars</option></select> {renderFormTextarea('text', 'Review')} {renderFileInput('img', 'Patient Photo')}</>)}
                <button type="submit" className="w-full mt-4 py-4 bg-[#68a69e] text-white font-bold rounded-xl shadow-md hover:shadow-[0_8px_25px_-5px_rgba(104,166,158,0.4)] transition-all hover:-translate-y-0.5">Publish Entry</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                 <h3 className="text-xl font-serif font-bold text-gray-900">Manage Entries</h3>
                 <span className="bg-[#68a69e]/10 text-[#68a69e] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{data[activeTab]?.length || 0} Total</span>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                {data[activeTab]?.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-5 bg-[#f8faf9] rounded-2xl border border-gray-100 hover:border-[#68a69e]/30 transition-colors">
                    <div className="flex items-center space-x-5 overflow-hidden">
                      <img src={item.image || item.img || item.url} alt={item.title || item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 truncate text-base">{item.title || item.name}</h4>
                        <p className="text-sm text-gray-500 truncate mt-1">{item.category || item.role || item.shortDesc || item.excerpt}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(activeTab, item.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shrink-0 shadow-sm">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {(!data[activeTab] || data[activeTab].length === 0) && (
                   <div className="text-center py-20 bg-[#f8faf9] rounded-2xl border border-dashed border-gray-200">
                     <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">No entries found</p>
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
const AppointmentModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 w-full max-w-lg relative shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-3 rounded-full">
          <X className="w-5 h-5" />
        </button>
        {submitted ? (
          <div className="text-center py-12 animate-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-[#68a69e]" /></div>
            <h3 className="text-3xl font-serif font-bold mb-3 text-gray-900">Request Confirmed</h3>
            <p className="text-gray-500 text-base">Our concierge will contact you shortly to finalize your appointment details.</p>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 pt-2">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold mb-3 text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-500">Take the first elegant step towards optimal health and radiance.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Clinic Department</label>
                <div className="relative">
                  <select required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] appearance-none outline-none transition-all text-sm">
                    <option value="">Select a department...</option>
                    <option value="pmr">Physical Medicine & Rehab</option>
                    <option value="skin">Hair & Skin Clinic</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">First Name</label>
                  <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm" placeholder="First" />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Last Name</label>
                  <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm" placeholder="Last" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Phone</label>
                <input required type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">Preferred Date</label>
                <input required type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none transition-all text-sm text-gray-600" />
              </div>
              <button type="submit" className="w-full py-4 mt-6 text-white text-base font-bold rounded-xl shadow-[0_8px_25px_-5px_rgba(104,166,158,0.4)] hover:-translate-y-0.5 transition-all bg-[#68a69e]">
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
  const [route, setRoute] = useState({ path: 'HOME', params: {} });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePmrOpen, setMobilePmrOpen] = useState(false);
  const [mobileSkinOpen, setMobileSkinOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [appData, setAppData] = useState({
    pmr: initialPmrMainServices, skin: initialSkinServices, team: initialTeamMembers,
    blogs: initialBlogPosts, gallery: initialGalleryImages, testimonials: initialTestimonials
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path, params = {}) => {
    setRoute({ path, params });
    setIsMobileMenuOpen(false); setMobileServicesOpen(false); setMobileTeamOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparent = !scrolled && (route.path === 'HOME' || route.path === 'SERVICE_DETAIL');

  const Logo = () => (
    <div className="flex flex-col items-center cursor-pointer group shrink-0" onClick={() => navigateTo('HOME')}>
      <div className="flex items-baseline">
        <span className={`text-3xl sm:text-4xl font-serif italic mr-1 transition-colors ${isTransparent ? 'text-white' : 'text-[#737976] group-hover:text-black'}`}>Le</span>
        <span className={`text-4xl sm:text-5xl font-serif font-bold italic transition-transform group-hover:scale-105 ${isTransparent ? 'text-white' : 'text-[#68a69e]'}`}>Regain</span>
      </div>
      <div className={`mt-[-8px] ml-12 px-4 py-0.5 rounded-full flex items-center transition-all shadow-sm ${isTransparent ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-[#f4f7f6] border border-[#68a69e]/20'}`}>
        <span className={`text-[10px] tracking-[0.2em] uppercase font-bold ${isTransparent ? 'text-white/90' : 'text-[#68a69e]'}`}>Clinic</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fdfdfd] selection:bg-[#68a69e] selection:text-white">
      
      {/* Modern High-End Header */}
      <header className="fixed w-full top-0 z-50">
        <div className={`hidden md:flex justify-between items-center px-10 text-xs font-bold tracking-widest transition-all duration-500 overflow-hidden uppercase ${scrolled ? 'h-0 opacity-0 py-0' : 'h-10 opacity-100 py-2.5'} ${isTransparent ? 'bg-black/10 backdrop-blur-sm border-b border-white/10 text-white/90' : 'bg-[#0a0f0e] text-white'}`}>
          <div className="flex space-x-10">
            <a href="tel:+15551234567" className="flex items-center hover:text-[#68a69e] transition"><Phone className="w-3.5 h-3.5 mr-2 opacity-70" /> +1 (555) 123-4567</a>
            <a href="mailto:info@leregain.com" className="flex items-center hover:text-[#68a69e] transition"><Mail className="w-3.5 h-3.5 mr-2 opacity-70" /> info@leregain.com</a>
          </div>
          <div className="flex space-x-6"><span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 opacity-70" /> Mon-Sat: 9AM - 8PM</span></div>
        </div>

        <div className={`transition-all duration-500 ${scrolled ? 'pt-4 px-4 sm:px-8' : 'px-0'}`}>
          <nav className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-6xl bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-full border border-gray-100 py-2 px-6' : 'w-full py-5 px-6 lg:px-10'} ${!scrolled && !isTransparent ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center">
              <Logo />
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
                {['HOME', 'ABOUT'].map(path => (
                   <button key={path} onClick={() => navigateTo(path)} className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors group ${route.path === path ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}>
                     {path}
                   </button>
                ))}
                
                {/* Services Dropdown */}
                <div className="relative group px-4 py-2">
                  <button onClick={() => navigateTo('SERVICES')} className={`relative flex items-center text-xs font-bold tracking-widest uppercase transition-colors group-hover:text-gray-900 ${route.path === 'SERVICES' || route.path === 'SERVICE_DETAIL' ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/70 hover:text-white' : 'text-gray-500')}`}>
                    SERVICES <ChevronDown className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 overflow-hidden flex">
                    <div className="flex-1 p-8 border-r border-gray-50 bg-[#f8faf9]">
                      <button onClick={() => navigateTo('SERVICES', { tab: 'PMR' })} className="flex items-center text-[#68a69e] font-bold tracking-widest text-xs uppercase mb-6 hover:text-gray-900 transition-colors w-full text-left">
                        <Activity className="w-4 h-4 mr-3" /> PMR Clinic
                      </button>
                      <ul className="space-y-3">
                        {appData.pmr.map(service => (
                           <li key={service.id}>
                             <button onClick={() => navigateTo('SERVICE_DETAIL', { category: 'PMR', id: service.id })} className="text-sm font-semibold text-gray-600 hover:text-[#68a69e] transition-colors w-full text-left flex items-center group/link">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#68a69e] opacity-0 group-hover/link:opacity-100 mr-2 transition-opacity"></span> {service.title}
                             </button>
                           </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 p-8 bg-white">
                      <button onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })} className="flex items-center text-[#737976] font-bold tracking-widest text-xs uppercase mb-6 hover:text-gray-900 transition-colors w-full text-left">
                        <Sparkles className="w-4 h-4 mr-3" /> Skin Clinic
                      </button>
                      <ul className="space-y-3">
                        {appData.skin.map(service => (
                           <li key={service.id}>
                             <button onClick={() => navigateTo('SERVICE_DETAIL', { category: 'SKIN', id: service.id })} className="text-sm font-semibold text-gray-600 hover:text-[#737976] transition-colors w-full text-left flex items-center group/link">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#737976] opacity-0 group-hover/link:opacity-100 mr-2 transition-opacity"></span> {service.title}
                             </button>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {['TEAM', 'TECHNOLOGIES', 'GALLERY', 'BLOG', 'CONTACT'].map(path => (
                   <button key={path} onClick={() => navigateTo(path === 'CONTACT' ? 'CONTACT US' : path)} className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors group ${route.path === (path === 'CONTACT' ? 'CONTACT US' : path) ? (isTransparent ? 'text-white' : 'text-[#68a69e]') : (isTransparent ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}>
                     {path}
                   </button>
                ))}
                
                <button onClick={() => setIsModalOpen(true)} className={`ml-4 px-8 py-3.5 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-300 flex items-center shrink-0 ${isTransparent ? 'bg-white text-[#68a69e] hover:bg-gray-100' : 'bg-[#68a69e] text-white hover:bg-[#57948c] hover:shadow-[0_8px_25px_-5px_rgba(104,166,158,0.4)]'}`}>
                  Book Appt
                </button>
              </div>

              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(true)} className={`p-3 rounded-full focus:outline-none transition-colors ${isTransparent ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu logic unchanged structurally, styling refined */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
           <div className="scale-75 origin-left"><Logo /></div>
           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {['HOME', 'ABOUT'].map((link) => (
            <button key={link} onClick={() => navigateTo(link)} className={`block w-full text-left px-5 py-4 text-xs font-bold tracking-widest uppercase rounded-2xl transition-colors ${route.path === link ? 'bg-[#f4f7f6] text-[#68a69e]' : 'text-gray-600 hover:bg-gray-50'}`}>{link}</button>
          ))}
          <div className="bg-[#f4f7f6]/50 rounded-3xl p-2 my-2 border border-gray-100">
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between items-center px-4 py-4 text-xs font-bold tracking-widest uppercase text-gray-700 rounded-2xl">
              SERVICES <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#68a69e]' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <div className="px-4 pb-4">
                 <button onClick={() => navigateTo('SERVICES', { tab: 'PMR' })} className="block w-full text-left py-3 text-sm font-bold text-[#68a69e]">PMR Clinic</button>
                 {appData.pmr.map(s => <button key={s.id} onClick={() => navigateTo('SERVICE_DETAIL', { category: 'PMR', id: s.id })} className="block w-full text-left py-2.5 text-sm text-gray-500">{s.title}</button>)}
                 <div className="h-px bg-gray-200 my-3"></div>
                 <button onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })} className="block w-full text-left py-3 text-sm font-bold text-[#737976]">Skin Clinic</button>
                 {appData.skin.map(s => <button key={s.id} onClick={() => navigateTo('SERVICE_DETAIL', { category: 'SKIN', id: s.id })} className="block w-full text-left py-2.5 text-sm text-gray-500">{s.title}</button>)}
              </div>
            </div>
          </div>
          {['TEAM', 'TECHNOLOGIES', 'GALLERY', 'BLOG', 'CONTACT US'].map((link) => (
            <button key={link} onClick={() => navigateTo(link)} className={`block w-full text-left px-5 py-4 text-xs font-bold tracking-widest uppercase rounded-2xl transition-colors ${route.path === link ? 'bg-[#f4f7f6] text-[#68a69e]' : 'text-gray-600 hover:bg-gray-50'}`}>{link === 'CONTACT US' ? 'CONTACT' : link}</button>
          ))}
        </div>
        <div className="p-6 border-t border-gray-100 bg-[#f8faf9] shrink-0">
          <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-center py-4 rounded-xl text-white font-bold tracking-widest uppercase text-xs shadow-lg bg-[#68a69e]">Book Appointment</button>
        </div>
      </div>

      {/* Main Content */}
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
        {route.path === 'ADMIN' && (!isAdminLoggedIn ? <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} /> : <AdminDashboard data={appData} setData={setAppData} onLogout={() => {setIsAdminLoggedIn(false); navigateTo('HOME');}} />)}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f0e] text-white pt-24 pb-12 relative overflow-hidden mt-auto border-t border-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#68a69e]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#68a69e]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-4 pr-0 lg:pr-12">
              <div className="mb-8 scale-90 origin-left"><Logo /></div>
              <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base mb-8">
                A premier destination for restorative physical medicine and advanced aesthetic treatments. Blending cutting-edge medical technology with sophisticated care.
              </p>
              <div className="flex space-x-4">
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#68a69e] hover:border-transparent transition-colors cursor-pointer"><Facebook className="w-4 h-4" /></div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#68a69e] hover:border-transparent transition-colors cursor-pointer"><Instagram className="w-4 h-4" /></div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#68a69e] hover:border-transparent transition-colors cursor-pointer"><Linkedin className="w-4 h-4" /></div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold mb-8 text-white tracking-[0.2em] uppercase">Explore</h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Our Team', 'Gallery'].map(link => (
                  <li key={link}>
                    <button onClick={() => navigateTo(link.split(' ')[1] === 'Team' ? 'TEAM' : link.split(' ')[0].toUpperCase())} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold mb-8 text-white tracking-[0.2em] uppercase">Departments</h4>
              <ul className="space-y-6">
                <li>
                  <button onClick={() => navigateTo('SERVICES', {tab: 'PMR'})} className="text-left group block">
                    <strong className="block text-gray-200 font-medium mb-1 group-hover:text-[#68a69e] transition-colors text-sm">Physical Medicine & Rehab</strong>
                    <span className="text-gray-500 text-xs leading-relaxed block font-light">Advanced sports medicine and pain management.</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('SERVICES', {tab: 'SKIN'})} className="text-left group block">
                    <strong className="block text-gray-200 font-medium mb-1 group-hover:text-[#68a69e] transition-colors text-sm">Hair & Skin Clinic</strong>
                    <span className="text-gray-500 text-xs leading-relaxed block font-light">Bespoke dermatology and clinical aesthetics.</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold mb-8 text-white tracking-[0.2em] uppercase">Connect</h4>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#68a69e] mr-4 shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm leading-relaxed font-light">123 Wellness Avenue,<br/>Medical District, NY 10001</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-[#68a69e] mr-4 shrink-0" />
                  <span className="text-gray-400 text-sm font-light">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-gray-500 text-xs font-medium tracking-wide">
              &copy; {new Date().getFullYear()} Le Regain. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-8 text-xs text-gray-500 font-medium tracking-wide uppercase">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <button onClick={() => navigateTo('ADMIN')} className="text-[#68a69e] hover:text-white transition-colors">Admin</button>
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
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 w-full overflow-hidden">
      {/* Premium Hero Slider */}
      <div className="relative h-screen min-h-[700px] max-h-[1000px] bg-[#0a0f0e] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <img src={slide.image} alt={slide.title} className={`w-full h-full object-cover transform transition-transform duration-[12000ms] ease-out ${index === currentSlide ? 'scale-105' : 'scale-100'}`} />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0e]/90 via-[#0a0f0e]/20 to-transparent" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 mt-16">
              <span className={`inline-block mb-6 text-[#68a69e] font-bold tracking-[0.25em] uppercase text-xs sm:text-sm transition-all duration-1000 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {index === 0 ? 'Welcome to Le Regain' : index === 1 ? 'Physical Medicine' : 'Clinical Aesthetics'}
              </span>
              <h1 className={`text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-[1.05] max-w-5xl transition-all duration-1000 delay-200 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {slide.title}
              </h1>
              <div className={`w-16 h-px bg-[#68a69e] mb-6 transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
              <p className={`text-lg sm:text-xl md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed mb-10 sm:mb-14 transition-all duration-1000 delay-400 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {slide.subtitle}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <button onClick={() => navigateTo('SERVICES', {tab: index===1?'PMR':index===2?'SKIN':''})} className="px-10 py-4 rounded-full text-white text-sm font-bold tracking-widest uppercase transition-all bg-[#68a69e] hover:bg-white hover:text-[#0a0f0e] shadow-[0_8px_30px_rgba(104,166,158,0.3)]">
                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Sleek Progress Indicators */}
        <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center space-x-4">
          {heroSlides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-16 bg-[#68a69e]' : 'w-8 bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
        <div className="absolute bottom-10 right-10 z-30 hidden md:flex flex-col items-center animate-bounce text-white/50">
           <MousePointer2 className="w-5 h-5 mb-2" />
        </div>
      </div>

      {/* Modern Minimalist Features */}
      <section className="py-24 sm:py-32 bg-[#fdfdfd]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Why Choose Us</h2>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">Elevating Standards in <br/><span className="text-[#737976] italic font-light">Healthcare & Aesthetics</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: <Shield />, title: "Expert Specialists", desc: "Board-certified physiatrists and dermatologists curating your holistic care plan." },
              { icon: <Award />, title: "Advanced Technology", desc: "Utilizing state-of-the-art robotic rehab and premium aesthetic lasers." },
              { icon: <Users />, title: "Holistic Approach", desc: "Integrating functional recovery and external radiance for comprehensive wellness." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 lg:p-12 text-center hover:shadow-[0_20px_50px_-15px_rgba(104,166,158,0.15)] transition-all duration-700 group border border-gray-100 hover:border-[#68a69e]/20">
                <div className="w-20 h-20 mx-auto bg-[#f8faf9] group-hover:bg-[#68a69e] rounded-full flex items-center justify-center mb-8 transition-colors duration-500">
                   {React.cloneElement(feature.icon, { className: "w-8 h-8 text-[#68a69e] group-hover:text-white transition-colors duration-500 stroke-[1.5]" })}
                </div>
                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Image Departments */}
      <section className="py-24 sm:py-32 bg-[#f4f7f6] relative overflow-hidden border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Our Departments</h2>
              <h3 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">Comprehensive Care</h3>
            </div>
            <button onClick={() => navigateTo('SERVICES')} className="hidden md:flex items-center text-xs font-bold uppercase tracking-widest text-[#68a69e] hover:text-gray-900 transition-colors group mt-6 md:mt-0">
              View All Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl h-[500px] lg:h-[650px]" onClick={() => navigateTo('SERVICES', { tab: 'PMR' })}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200" alt="PMR" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-xl p-8 rounded-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#f4f7f6] rounded-full flex items-center justify-center"><Activity className="w-5 h-5 text-[#68a69e]" /></div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#68a69e] group-hover:border-[#68a69e] transition-colors"><ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" /></div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Physical Medicine</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Expert physiotherapy, sports medicine, and targeted rehabilitation services designed to restore absolute mobility.</p>
              </div>
            </div>
            
            <div className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl h-[500px] lg:h-[650px]" onClick={() => navigateTo('SERVICES', { tab: 'SKIN' })}>
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200" alt="Skin Care" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-xl p-8 rounded-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#f4f7f6] rounded-full flex items-center justify-center"><Sparkles className="w-5 h-5 text-[#737976]" /></div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#737976] group-hover:border-[#737976] transition-colors"><ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" /></div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Clinical Aesthetics</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Advanced dermatological treatments, hair restoration, and bespoke aesthetic consultations for timeless beauty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Testimonials */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-16 h-16 mx-auto text-[#68a69e]/20 mb-8" />
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-gray-900 leading-tight mb-12">
            "The personalized care at Le Regain transcends typical clinical experiences. It is a sanctuary for holistic recovery and refined aesthetics."
          </h3>
          <div className="flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" alt="Patient" className="w-16 h-16 rounded-full object-cover shadow-lg" />
            <div className="ml-4 text-left">
              <h5 className="font-bold text-gray-900 text-lg">Sarah M.</h5>
              <span className="text-[#68a69e] text-xs font-bold uppercase tracking-widest">Aesthetics Client</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 relative bg-[#0a0f0e] overflow-hidden">
        <div className="absolute inset-0 opacity-30"><img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover mix-blend-luminosity" alt="bg" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0e] via-[#0a0f0e]/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-white leading-tight">Commence Your Wellness Journey</h2>
            <p className="text-lg md:text-xl mb-10 text-gray-400 font-light leading-relaxed">Experience the pinnacle of physical medicine and clinical aesthetics. Our specialists await to curate your bespoke care plan.</p>
            <button onClick={openModal} className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ initialTab = 'PMR', navigateTo, data }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => { setActiveTab(initialTab || 'PMR'); }, [initialTab]);

  return (
    <div className="pt-32 pb-24 bg-[#f8faf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Our Services</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gray-900">Clinical Excellence</h1>
          <p className="text-lg text-gray-500 font-light">Explore our comprehensive array of specialized medical and aesthetic treatments.</p>
        </div>

        <div className="flex justify-center mb-16 animate-in slide-in-from-bottom-8">
          <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
            <button onClick={() => setActiveTab('PMR')} className={`px-8 py-3.5 text-sm font-bold tracking-widest uppercase rounded-full transition-all flex items-center ${activeTab === 'PMR' ? 'bg-[#68a69e] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>PMR Clinic</button>
            <button onClick={() => setActiveTab('SKIN')} className={`px-8 py-3.5 text-sm font-bold tracking-widest uppercase rounded-full transition-all flex items-center ${activeTab === 'SKIN' ? 'bg-[#737976] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>Skin Clinic</button>
          </div>
        </div>

        <div className="animate-in fade-in duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {(activeTab === 'PMR' ? data.pmr : data.skin).map((service) => (
              <div key={service.id} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 hover:shadow-[0_20px_50px_-15px_rgba(104,166,158,0.15)] transition-all duration-700 cursor-pointer flex flex-col group" onClick={() => navigateTo('SERVICE_DETAIL', { category: activeTab, id: service.id })}>
                <div className="w-16 h-16 rounded-full bg-[#f4f7f6] group-hover:bg-[#68a69e] flex items-center justify-center mb-8 transition-colors duration-500 shrink-0">
                   {service.icon ? React.cloneElement(service.icon, { className: 'w-7 h-7 transition-colors duration-500 group-hover:text-white', color: activeTab === 'PMR' ? '#68a69e' : '#737976' }) : null}
                </div>
                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light mb-8 flex-grow">{service.shortDesc}</p>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 group-hover:text-[#68a69e] transition-colors flex items-center mt-auto">View Service Details <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceDetailPage({ serviceId, category, openModal, navigateTo, data }) {
  let serviceData = category === 'PMR' ? data.pmr.find(s => s.id === serviceId) : data.skin.find(s => s.id === serviceId);
  if (!serviceData) return <div className="py-32 text-center text-xl text-gray-500 font-serif">Service not found.</div>;
  
  return (
    <div className="bg-[#f8faf9] pb-24 animate-in fade-in duration-700">
      <div className="relative h-[50vh] min-h-[450px] overflow-hidden">
        <img src={serviceData.image} alt={serviceData.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0e]/90 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
          <button onClick={() => navigateTo('SERVICES', {tab: category})} className="text-white/60 hover:text-white flex items-center mb-6 w-max font-bold text-xs uppercase tracking-[0.2em] transition-colors"><ChevronLeft className="w-4 h-4 mr-2" /> Back to {category === 'PMR' ? 'PMR Clinic' : 'Skin Clinic'}</button>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-tight max-w-4xl">{serviceData.title}</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-400">Overview</h2>
            <div className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed max-w-none mb-12">
              <p className="text-xl text-gray-800 font-medium mb-8">{serviceData.shortDesc}</p>
              <p>{serviceData.description}</p>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(104,166,158,0.1)] border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-5 h-5 text-[#68a69e]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Begin Your Journey</h3>
              <p className="text-sm text-gray-500 mb-8 font-light">Schedule a private consultation with our specialized experts to discuss a tailored approach.</p>
              <button onClick={openModal} className="w-full py-4 text-white font-bold tracking-widest uppercase text-xs rounded-full shadow-lg transition-all bg-[#68a69e] hover:shadow-[0_8px_25px_-5px_rgba(104,166,158,0.4)]">Book Appointment</button>
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
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-4">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">The Experts</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gray-900">Our Clinical Team</h1>
          <p className="text-lg text-gray-500 font-light">Dedicated professionals committed to your absolute recovery and aesthetic refinement.</p>
        </div>
        
        <div className="flex justify-center mb-16 animate-in slide-in-from-bottom-8">
          <div className="inline-flex bg-[#f8faf9] p-1.5 rounded-full border border-gray-100">
            <button onClick={() => setActiveTab('PMR')} className={`px-8 py-3.5 text-sm font-bold tracking-widest uppercase rounded-full transition-all ${activeTab === 'PMR' ? 'bg-[#68a69e] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>Rehabilitation</button>
            <button onClick={() => setActiveTab('SKIN')} className={`px-8 py-3.5 text-sm font-bold tracking-widest uppercase rounded-full transition-all ${activeTab === 'SKIN' ? 'bg-[#737976] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>Aesthetics</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 animate-in fade-in duration-700">
          {displayedTeam.map((member) => (
            <div key={member.id} className="group">
              <div className="relative h-[400px] overflow-hidden rounded-[2.5rem] mb-6 shadow-sm border border-gray-100">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0a0f0e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 gap-4">
                  <a href="#" className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-[#68a69e] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="text-center px-4">
                <span className="text-[#68a69e] text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">{member.role}</span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
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
    <div className="pt-32 pb-24 bg-[#f8faf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">The Environment</h2>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">Clinic Gallery</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${filter === cat ? 'bg-[#68a69e] text-white shadow-md' : 'bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer bg-gray-200" onClick={() => setLightboxImage(image)}>
              <img src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.title}</h3>
                <span className="text-[#68a69e] text-[10px] font-bold tracking-[0.2em] uppercase mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white p-2 transition-colors z-50"><X className="w-8 h-8" /></button>
          <div className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={lightboxImage.url} alt={lightboxImage.title} className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-serif text-white mb-2">{lightboxImage.title}</h3>
              <p className="text-[#68a69e] text-xs font-bold tracking-[0.2em] uppercase">{lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogPage({ navigateTo, data }) {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-4">
           <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Journal</h2>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gray-900">Insights & News</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.blogs.map((post) => (
            <div key={post.id} className="group cursor-pointer" onClick={() => navigateTo('BLOG_DETAIL', { id: post.id })}>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
              </div>
              <div className="px-2">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                  <span className="text-[#68a69e] mr-3">{post.category}</span> | <span className="ml-3">{post.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#68a69e] transition-colors">{post.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-900 flex items-center group-hover:text-[#68a69e] transition-colors">Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogDetailPage({ blogId, data }) {
  const post = data.blogs.find(p => p.id === blogId);
  if(!post) return <div className="py-32 text-center text-xl font-serif">Article not found.</div>;

  return (
    <div className="bg-[#f8faf9] pb-24 pt-32 animate-in fade-in">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12">
        <span className="text-[#68a69e] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">{post.category}</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
        <div className="text-sm font-light text-gray-500 uppercase tracking-widest">{post.date} • Le Regain Experts</div>
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16">
        <img src={post.image} alt={post.title} className="w-full h-[40vh] sm:h-[60vh] object-cover rounded-[2.5rem] shadow-xl" />
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="prose prose-lg prose-headings:font-serif prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed mx-auto text-gray-800">
          <p className="text-xl sm:text-2xl font-serif italic text-gray-800 mb-10 leading-relaxed border-l-4 border-[#68a69e] pl-6">{post.excerpt}</p>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1 mt-10 lg:mt-0">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="rounded-[2.5rem] shadow-2xl object-cover h-[500px] lg:h-[700px] w-full" />
            <div className="absolute -bottom-10 -right-4 sm:-right-10 bg-white p-8 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center z-10 border border-gray-100">
              <div className="text-5xl font-serif font-bold text-[#68a69e] mb-2">15+</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] text-center">Years of<br/>Excellence</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#68a69e]">About Le Regain</h2>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight mb-8">Empowering health, <br/><span className="italic font-light text-gray-500">restoring confidence.</span></h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light mb-12">At Le Regain, our mission is to empower individuals to achieve optimal health, function, and confidence through a uniquely integrated, highly personalized approach.</p>
            <div className="space-y-8">
              <div className="pl-6 border-l-2 border-[#68a69e]">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-500 font-light leading-relaxed">To provide holistic, cutting-edge solutions tailored to each patient's exact needs, seamlessly combining Physical Medicine with advanced aesthetics.</p>
              </div>
              <div className="pl-6 border-l-2 border-gray-200">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-500 font-light leading-relaxed">To remain the premier destination for comprehensive care, recognized globally for innovative therapies and exceptionally beautiful outcomes.</p>
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
    <div className="pt-32 pb-24 bg-[#f8faf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Innovation</h2>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gray-900">Advanced Technologies</h1>
          <p className="text-lg text-gray-500 font-light">We invest in the absolute latest medical and aesthetic technologies to ensure the safest, fastest, and most precise outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[
            { title: "Robotic Rehabilitation", desc: "State-of-the-art robotic assistance for precise, repetitive motion therapy, crucial for neuro-rehabilitation." },
            { title: "Advanced Laser Therapy", desc: "Modern laser tech for non-invasive skin rejuvenation, targeted hair growth, and deep tissue pain management." },
            { title: "3D Motion Analysis", desc: "High-speed cameras and software to analyze biomechanics, pinpointing exactly where structural faults occur." }
          ].map((tech, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(104,166,158,0.1)] transition-all duration-500 border border-gray-100">
               <div className="w-16 h-16 bg-[#f4f7f6] rounded-full flex items-center justify-center mb-8"><Activity className="w-6 h-6 text-[#68a69e]" /></div>
               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{tech.title}</h3>
               <p className="text-gray-500 font-light leading-relaxed">{tech.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#68a69e]">Connect</h2>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gray-900">Get in Touch</h1>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-serif font-bold mb-8 text-gray-900">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">First Name</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm" placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Last Name</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm" placeholder="Last Name" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Email Address</label>
                <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none text-sm" placeholder="email@address.com" />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">Message</label>
                <textarea rows="5" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#68a69e] outline-none resize-none text-sm" placeholder="How may we assist you?"></textarea>
              </div>
              <button className="px-10 py-4 bg-[#68a69e] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:-translate-y-0.5 transition-all">Submit Inquiry</button>
            </form>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-[#f8faf9] p-10 rounded-[2.5rem] border border-gray-100 h-full">
               <h3 className="text-2xl font-serif font-bold mb-8 text-gray-900">Concierge Desk</h3>
               <ul className="space-y-8">
                  <li className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#68a69e] mr-4 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-gray-900 font-bold mb-2 text-sm uppercase tracking-wider">Location</strong>
                      <span className="text-gray-500 font-light leading-relaxed">123 Wellness Avenue,<br/>Medical District, NY 10001</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="w-6 h-6 text-[#68a69e] mr-4 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-gray-900 font-bold mb-2 text-sm uppercase tracking-wider">Phone</strong>
                      <span className="text-gray-500 font-light">+1 (555) 123-4567</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="w-6 h-6 text-[#68a69e] mr-4 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-gray-900 font-bold mb-2 text-sm uppercase tracking-wider">Email</strong>
                      <span className="text-gray-500 font-light">info@leregain.com</span>
                    </div>
                  </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}