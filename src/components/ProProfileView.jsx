import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  Wrench, 
  Award, 
  ArrowLeft, 
  Zap, 
  Check, 
  Lock, 
  FileText,
  UserCheck,
  ChevronDown,
  Phone,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function ProProfileView({ 
  professionals, 
  selectedProId, 
  onSelectProId,
  currency, 
  onToggleAvailability,
  onInitiateDispatch,
  onBackToRadar 
}) {
  const activePro = professionals.find(p => p.id === selectedProId) || professionals[0];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'portfolio', 'verification', 'reviews'

  const formatPrice = (usd, ngn) => {
    if (currency === 'NGN') {
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${usd}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Top Navigation & Specialist Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
        <button
          onClick={onBackToRadar}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Professionals</span>
        </button>

        {/* Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium hidden sm:inline">Select Specialist:</span>
          <div className="relative">
            <select
              value={activePro.id}
              onChange={(e) => onSelectProId(e.target.value)}
              className="appearance-none rounded-xl border border-slate-300 bg-slate-50 py-2 pl-3 pr-8 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
            >
              {professionals.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.title.split('&')[0]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Hero Profile Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          {/* Main Identity Info */}
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              {activePro.photo ? (
                <img
                  src={activePro.photo}
                  alt={activePro.name}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-black text-slate-900 border border-slate-200 shadow-xs ${activePro.photo ? 'hidden' : 'flex'}`}
              >
                {activePro.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span 
                className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white ${
                  activePro.availableNow ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
                title={activePro.availableNow ? 'Available today' : 'Currently booked'}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activePro.name}
                </h1>
                <div className="flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Licensed & Background Checked</span>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-700">
                {activePro.title}
              </p>

              <p className="text-xs text-slate-500 font-medium">
                {activePro.company} • {activePro.verification.experienceYears} field experience
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  {activePro.address}
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {activePro.rating} ({activePro.reviewsCount} customer reviews)
                </span>
                <span className="text-slate-500">
                  ⚡ Responds in ~{activePro.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3.5 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
            
            <div className="text-left md:text-right">
              <div className="font-mono text-2xl font-black text-slate-900">
                {formatPrice(activePro.hourlyRateUSD, activePro.hourlyRateNGN)}
                <span className="text-xs font-normal text-slate-500">/hr</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard diagnostic callout: <span className="font-bold text-slate-800">{formatPrice(activePro.fixedRateUSD, activePro.fixedRateNGN)}</span>
              </p>
            </div>

            <button
              onClick={() => onInitiateDispatch(activePro)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/30 transition-all"
            >
              <Zap className="h-4 w-4" />
              <span>Book / Request Dispatch</span>
            </button>

          </div>

        </div>

        {/* Real-World Trust Metric Counters */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Completed Jobs</span>
            <p className="text-base font-black text-slate-900 mt-0.5">{activePro.completedJobs} Verified</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Trade Registration</span>
            <p className="text-xs font-bold text-slate-800 mt-1 truncate">{activePro.verification.tradeLicense.split('(')[0]}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Insurance Cover</span>
            <p className="text-xs font-bold text-emerald-800 mt-1">{activePro.verification.insuranceCoverage.split(' ')[0]} Policy</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Customer Rating</span>
            <p className="text-base font-black text-slate-900 mt-0.5">4.98 ★</p>
          </div>
        </div>
      </div>

      {/* Tabs navigation - horizontal scroll on mobile */}
      <div className="flex overflow-x-auto scrollbar-none border-b border-slate-200 gap-6 sm:gap-8 text-xs font-bold min-w-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`shrink-0 whitespace-nowrap pb-3 transition-colors relative ${
            activeTab === 'overview' ? 'text-emerald-800 border-b-2 border-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Overview & Tools
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`shrink-0 whitespace-nowrap pb-3 transition-colors relative ${
            activeTab === 'portfolio' ? 'text-emerald-800 border-b-2 border-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Recent Projects ({activePro.portfolio.length})
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`shrink-0 whitespace-nowrap pb-3 transition-colors relative ${
            activeTab === 'verification' ? 'text-emerald-800 border-b-2 border-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Licenses & Insurance
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`shrink-0 whitespace-nowrap pb-3 transition-colors relative ${
            activeTab === 'reviews' ? 'text-emerald-800 border-b-2 border-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Reviews ({activePro.recentReviews.length})
        </button>
      </div>

      {/* Tab 1: Overview & Tools */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 space-y-5">
            {/* Bio */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                About the Specialist
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {activePro.bio}
              </p>
            </div>

            {/* Active Skills Matrix */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Core Specialties & Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {activePro.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            {/* Field Instrumentation & Equipment */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Testing Equipment Carried
                </h3>
                <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  Calibrated
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Carries dedicated testing apparatus in service vehicle:
              </p>
              <div className="space-y-2">
                {activePro.toolsEquipment.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 font-medium"
                  >
                    <Wrench className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SafePay Escrow Guarantee Seal */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-xs shadow-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1.5">
                <Lock className="h-4 w-4 text-emerald-700" />
                <span>Vanguard SafePay Protection</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                Your payment is held safely until you verify that the repair or installation is completed satisfactorily. No upfront risk.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Recent Projects */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activePro.portfolio.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {item.tag}
                  </span>
                  <span className="text-slate-500 text-[11px] font-semibold">{item.duration}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 mb-3">Location: <span className="text-slate-800 font-bold">{item.location}</span></p>
                <p className="text-xs text-slate-700 leading-relaxed">{item.summary}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Verified Work Completed
                </span>
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Licenses & Insurance */}
      {activeTab === 'verification' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <ShieldCheck className="h-6 w-6 text-emerald-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">National ID & NIN Verified</h4>
              <p className="text-[11px] text-slate-600 mt-1">Identity, biometric registration, and criminal background cleared.</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <Award className="h-6 w-6 text-sky-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Professional Engineering License</h4>
              <p className="text-[11px] text-slate-600 mt-1">{activePro.verification.tradeLicense}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <Lock className="h-6 w-6 text-amber-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Insurance & Workmanship Cover</h4>
              <p className="text-[11px] text-slate-600 mt-1">{activePro.verification.insuranceCoverage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Customer Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {activePro.recentReviews.map((review, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-xs shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-900 border border-slate-200">
                    {review.client[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{review.client}</h5>
                    <p className="text-[11px] text-slate-500">{review.role} • {review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mt-2.5">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
