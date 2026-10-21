import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  Briefcase, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  MapPin, 
  Wrench, 
  User,
  Phone,
  Building,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../data/mockData';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'signin', // 'signin' or 'register'
  currency, 
  onLoginSuccess, 
  onRegisterClientSuccess,
  onRegisterProSuccess 
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'register'
  const [registerType, setRegisterType] = useState('client'); // 'client' or 'pro'

  // Sign In State
  const [signInRole, setSignInRole] = useState('client'); // 'client' or 'pro'
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register Client State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNeighborhood, setClientNeighborhood] = useState('Lekki Phase 1');
  const [clientPassword, setClientPassword] = useState('');

  // Register Pro State
  const [proName, setProName] = useState('');
  const [proTitle, setProTitle] = useState('');
  const [proCompany, setProCompany] = useState('');
  const [proCategory, setProCategory] = useState('electrical');
  const [proNeighborhood, setProNeighborhood] = useState('Lekki Phase 1');
  const [proHourlyRateUSD, setProHourlyRateUSD] = useState(65);
  const [proHourlyRateNGN, setProHourlyRateNGN] = useState(95000);
  const [proFixedRateUSD, setProFixedRateUSD] = useState(220);
  const [proFixedRateNGN, setProFixedRateNGN] = useState(320000);
  const [proLicense, setProLicense] = useState('');
  const [proBio, setProBio] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['3-Phase Distribution', 'Panel Breakers', 'Troubleshooting']);
  const [toolInput, setToolInput] = useState('');
  const [toolsEquipment, setToolsEquipment] = useState(['Fluke Multimeter', 'Insulated Hand Tools']);
  const [availableNow, setAvailableNow] = useState(true);

  // Suggested skills by category
  const suggestedSkills = {
    electrical: ['Schneider Panels', 'ATS Generator Changeover', 'Earth Leakage Repair', 'Load Balancing'],
    solar: ['Victron Energy', 'LiFePO4 Lithium Batteries', 'Deye Inverters', 'Solar String Wiring'],
    hvac: ['Daikin VRV/VRF', 'R410A Refrigerant', 'Server Room Cooling', 'Compressor Repair'],
    software: ['Smart Lighting', 'Smart Locks', 'Wi-Fi Mesh Setup', 'Home Automation'],
    network: ['Fiber Splicing', 'OTDR Testing', 'UniFi Networking', 'Cat6A Structured Cabling'],
    security: ['Hikvision 4K Cameras', 'Biometric Access Control', 'Maglocks', 'IP Surveillance']
  };

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Handle Add/Remove Skills
  const handleAddSkill = (skillToAdd) => {
    const s = (skillToAdd || skillInput).trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  // Handle Add/Remove Tools
  const handleAddTool = () => {
    const t = toolInput.trim();
    if (t && !toolsEquipment.includes(t)) {
      setToolsEquipment(prev => [...prev, t]);
      setToolInput('');
    }
  };

  const handleRemoveTool = (toolToRemove) => {
    setToolsEquipment(prev => prev.filter(t => t !== toolToRemove));
  };

  // Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    
    // Determine friendly display name
    let displayName = '';
    if (signInEmail.trim()) {
      const username = signInEmail.split('@')[0];
      displayName = username.charAt(0).toUpperCase() + username.slice(1);
    } else {
      displayName = signInRole === 'pro' ? 'Engr. Babatunde Alabi' : 'Apex Medical Labs';
    }

    onLoginSuccess({
      name: signInRole === 'pro' && !signInEmail.trim() ? 'Engr. Babatunde Alabi' : displayName,
      email: signInEmail.trim() || (signInRole === 'pro' ? 'babatunde@vanguard.ng' : 'director@apexlabs.com'),
      role: signInRole,
      proProfileId: signInRole === 'pro' ? 'pro-1' : null
    });
  };

  // Quick 1-Click Demo Login
  const handleQuickDemo = (roleType) => {
    if (roleType === 'pro') {
      onLoginSuccess({
        name: 'Engr. Babatunde Alabi',
        email: 'babatunde@vanguard.ng',
        role: 'pro',
        proProfileId: 'pro-1'
      });
    } else {
      onLoginSuccess({
        name: 'Apex Medical Labs (Client)',
        email: 'director@apexlabs.com',
        role: 'client',
        proProfileId: null
      });
    }
  };

  // Register Client Submit
  const handleRegisterClientSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    onRegisterClientSuccess({
      name: clientName.trim(),
      email: clientEmail.trim(),
      phone: clientPhone.trim() || '+234 800 000 0000',
      neighborhood: clientNeighborhood,
      role: 'client'
    });
  };

  // Register Pro Submit
  const handleRegisterProSubmit = (e) => {
    e.preventDefault();
    if (!proName.trim() || !proTitle.trim()) return;

    const newPro = {
      id: `pro-${Date.now()}`,
      name: proName.trim(),
      title: proTitle.trim(),
      company: proCompany.trim() || `${proName.trim()} Technical Services Ltd`,
      category: proCategory,
      rating: 5.0,
      reviewsCount: 1,
      completedJobs: 0,
      responseTime: '15 mins',
      distanceMiles: 0.5,
      distanceKm: 0.8,
      hourlyRateUSD: Number(proHourlyRateUSD),
      hourlyRateNGN: Number(proHourlyRateNGN),
      fixedRateUSD: Number(proFixedRateUSD),
      fixedRateNGN: Number(proFixedRateNGN),
      address: `${proNeighborhood}, Lagos`,
      neighborhood: proNeighborhood,
      coordinates: { 
        x: Math.floor(Math.random() * 35) + 30, 
        y: Math.floor(Math.random() * 35) + 30 
      },
      availableNow: availableNow,
      verification: {
        idVerified: true,
        backgroundChecked: true,
        tradeLicense: proLicense.trim() || 'COREN / Trade Licensed Professional',
        insuranceCoverage: '₦50,000,000 Workmanship & Third-Party Policy',
        experienceYears: '10 years',
      },
      bio: proBio.trim() || `Experienced ${proTitle} providing certified maintenance, repair, and diagnostic services across ${proNeighborhood} and greater Lagos.`,
      skills: skills.length > 0 ? skills : ['System Repair', 'Diagnostics'],
      toolsEquipment: toolsEquipment.length > 0 ? toolsEquipment : ['Calibrated Testing Kit'],
      portfolio: [
        {
          title: 'Residential Diagnostic & Maintenance Service',
          location: `${proNeighborhood}, Lagos`,
          duration: 'Same-Day Service',
          summary: 'Completed full on-site testing, replaced worn components, and verified normal operation under full load.',
          tag: 'Verified Work'
        }
      ],
      recentReviews: [
        {
          client: 'Verified Customer',
          role: 'Homeowner',
          rating: 5,
          date: 'Today',
          comment: 'Punctual arrival, certified tools, and transparent breakdown of pricing.'
        }
      ]
    };

    onRegisterProSuccess(newPro);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {mode === 'signin' ? 'Sign In to Vanguard' : 'Create an Account on Vanguard'}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {mode === 'signin'
                ? 'Access your bookings, track dispatches, or manage your service profile'
                : 'Join Vanguard to book trade specialists or offer your services across Lagos'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation: Sign In vs Register */}
        <div className="flex border-b border-slate-200 bg-white px-6 text-xs font-bold">
          <button
            onClick={() => setMode('signin')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              mode === 'signin'
                ? 'border-emerald-600 text-emerald-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1">
          
          {/* ================= VIEW 1: SIGN IN ================= */}
          {mode === 'signin' && (
            <div className="space-y-5">
              
              {/* Account Type Selector for Sign In */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Sign in as:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSignInRole('client')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      signInRole === 'client'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-xs font-bold">🏢 Client / Customer</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Book & hire specialists</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignInRole('pro')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      signInRole === 'pro'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-xs font-bold">🛠️ Service Specialist</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Manage rates, get jobs</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder={signInRole === 'client' ? 'client@apexlabs.com' : 'babatunde@vanguard.ng'}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all active:scale-98"
                >
                  Sign In to Dashboard
                </button>
              </form>

              {/* Quick 1-Click Interactive Demo */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  ⚡ 1-Click Instant Demo Login (For Client Presentation)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('client')}
                    className="rounded-xl border border-slate-300 bg-white p-2.5 text-left hover:bg-slate-100 shadow-xs transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-xs block">🏢 Apex Medical Labs</span>
                    <span className="text-[10px] text-slate-500 font-medium">Customer / Client Demo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('pro')}
                    className="rounded-xl border border-slate-300 bg-white p-2.5 text-left hover:bg-slate-100 shadow-xs transition-colors"
                  >
                    <span className="font-bold text-emerald-800 text-xs block">🛠️ Engr. Babatunde Alabi</span>
                    <span className="text-[10px] text-slate-500 font-medium">Electrician (Pro Demo)</span>
                  </button>
                </div>
              </div>

              {/* Switch to Register */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">Don't have an account yet? </span>
                <button
                  onClick={() => setMode('register')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Create Account here
                </button>
              </div>

            </div>
          )}

          {/* ================= VIEW 2: REGISTRATION ================= */}
          {mode === 'register' && (
            <div className="space-y-5">
              
              {/* Register Role Selector: Client vs Pro */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">I want to register as:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterType('client')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      registerType === 'client'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-xs font-bold">🏢 Client / Customer</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">I need to hire technicians</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterType('pro')}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      registerType === 'pro'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-xs font-bold">🛠️ Service Specialist</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">I want to offer my services</span>
                  </button>
                </div>
              </div>

              {/* FORM A: REGISTER AS CLIENT */}
              {registerType === 'client' && (
                <form onSubmit={handleRegisterClientSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Full Name / Business Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Folake Adeleke or Apex Medical Group"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+234 803 000 0000"
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Your Neighborhood (Lagos)
                      </label>
                      <select
                        value={clientNeighborhood}
                        onChange={(e) => setClientNeighborhood(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                      >
                        {LOCATIONS.filter(l => l.id !== 'all').map(loc => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={clientPassword}
                          onChange={(e) => setClientPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer Benefits */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Free Client Account Privileges</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      ✓ Post service requests with instant dispatch • 100% Escrow payment protection • Direct in-app communication with verified technicians.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all active:scale-98"
                  >
                    Create Free Client Account
                  </button>
                </form>
              )}

              {/* FORM B: REGISTER AS PROFESSIONAL / SPECIALIST */}
              {registerType === 'pro' && (
                <form onSubmit={handleRegisterProSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Full Name & Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={proName}
                        onChange={(e) => setProName(e.target.value)}
                        placeholder="e.g. Engr. David Okon"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Trade Specialty <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={proTitle}
                        onChange={(e) => setProTitle(e.target.value)}
                        placeholder="e.g. Master Solar Inverter Technician"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Service Category
                      </label>
                      <select
                        value={proCategory}
                        onChange={(e) => setProCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Operating Neighborhood
                      </label>
                      <select
                        value={proNeighborhood}
                        onChange={(e) => setProNeighborhood(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                      >
                        {LOCATIONS.filter(l => l.id !== 'all').map(loc => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Hourly Rate (₦ NGN / $ USD)
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-slate-500">₦</span>
                          <input
                            type="number"
                            value={proHourlyRateNGN}
                            onChange={(e) => setProHourlyRateNGN(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-8 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                        <div className="relative w-28">
                          <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-slate-500">$</span>
                          <input
                            type="number"
                            value={proHourlyRateUSD}
                            onChange={(e) => setProHourlyRateUSD(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-8 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Diagnostic Visit Fee
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-slate-500">₦</span>
                          <input
                            type="number"
                            value={proFixedRateNGN}
                            onChange={(e) => setProFixedRateNGN(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-8 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                        <div className="relative w-28">
                          <span className="absolute left-3 top-2.5 text-xs font-mono font-bold text-slate-500">$</span>
                          <input
                            type="number"
                            value={proFixedRateUSD}
                            onChange={(e) => setProFixedRateUSD(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-8 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Skills & Services Offered
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-slate-200 bg-slate-50 mb-2">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 rounded-md bg-white border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-xs"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        placeholder="Add another service and press Enter..."
                        className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill()}
                        className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Available today toggle */}
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Show as Available Today</h5>
                      <p className="text-[11px] text-slate-600">
                        Appear on the interactive map with an active green pin.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={availableNow}
                      onChange={(e) => setAvailableNow(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all active:scale-98"
                  >
                    Complete Professional Registration & Publish
                  </button>
                </form>
              )}

              {/* Switch to Sign In */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">Already have an account? </span>
                <button
                  onClick={() => setMode('signin')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Sign In here
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
