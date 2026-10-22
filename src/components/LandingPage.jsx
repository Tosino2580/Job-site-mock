import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Star, MapPin, Zap, ChevronRight, ArrowRight,
  CheckCircle2, Clock, Lock, Users, Wrench, Phone, Building,
  Sun, Wind, Radio, Cpu
} from 'lucide-react';

const STATS = [
  { value: '4,200+', label: 'Verified Specialists' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '₦2.4B+', label: 'Safely Escrowed' },
  { value: '12 min', label: 'Avg. Response Time' },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Verified & Licensed',
    desc: 'Every specialist is background-checked, trade-licensed, and insured before joining the platform.',
  },
  {
    icon: Lock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Secure Escrow Payment',
    desc: 'Your payment is held in escrow and only released after you inspect and approve the completed work.',
  },
  {
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Same-Day Dispatch',
    desc: 'Available specialists respond within minutes. Live GPS tracking from dispatch to arrival.',
  },
  {
    icon: Star,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    title: 'Rated & Reviewed',
    desc: 'Real reviews from verified clients. See completed jobs, tools carried, and certifications.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Post or Search', desc: 'Describe what you need or browse specialists by trade category and neighborhood.' },
  { step: '02', title: 'Match & Confirm', desc: 'Review verified specialist profiles, ratings, and transparent pricing. Book instantly.' },
  { step: '03', title: 'Pay Safely', desc: 'Funds held in secure escrow. Technician is dispatched after payment is authorized.' },
  { step: '04', title: 'Rate & Release', desc: 'Inspect the work, provide the arrival PIN, and release payment when satisfied.' },
];

const CATEGORIES = [
  { icon: Zap, label: 'Electrical & Power', count: '840 pros' },
  { icon: Sun, label: 'Solar & Inverters', count: '620 pros' },
  { icon: Wind, label: 'AC & HVAC', count: '510 pros' },
  { icon: Cpu, label: 'Smart Home & IoT', count: '380 pros' },
  { icon: Radio, label: 'Fiber & Networking', count: '430 pros' },
  { icon: ShieldCheck, label: 'CCTV & Security', count: '290 pros' },
];

const TESTIMONIALS = [
  {
    name: 'Folake Adeleke',
    role: 'Facility Manager, Apex Capital — Victoria Island',
    avatar: 'FA',
    rating: 5,
    text: 'Engr. Babatunde arrived in 15 minutes during our evening peak power outage. Diagnosed the earth fault immediately and repaired the breaker. Extremely professional.',
  },
  {
    name: 'Dr. Obinna Nwosu',
    role: 'Homeowner — Lekki Phase 1',
    avatar: 'ON',
    rating: 5,
    text: 'Vanguard completely changed how I think about hiring tradespeople. Everything was documented, insured, and the escrow payment gave me total peace of mind.',
  },
  {
    name: 'Kunle Danjuma',
    role: 'CTO, Vantage Logistics — Ikoyi',
    avatar: 'KD',
    rating: 5,
    text: 'Our data center needed emergency cooling repair at midnight. Vanguard had a verified HVAC specialist on-site within 20 minutes. Saved us from catastrophe.',
  },
];

export default function LandingPage({ onGetStarted, onSignIn, onExploreDirectory }) {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Wrench className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">Vanguard</span>
            <span className="hidden sm:inline rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Lagos
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#how" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#categories" className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#trust" className="hover:text-slate-900 transition-colors">Why Vanguard</a>
            {onExploreDirectory && (
              <button onClick={onExploreDirectory} className="hover:text-emerald-700 transition-colors font-bold text-emerald-800 flex items-center gap-1">
                <span>Live Radar</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onSignIn} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5">
              Sign In
            </button>
            <button
              onClick={() => onGetStarted('client')}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
            >
              Get Started
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Lagos's Verified Trades Marketplace
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight">
                Trusted Trade{' '}
                <span className="text-emerald-600">Professionals,</span>{' '}
                On Demand.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
                Connect with licensed electricians, solar engineers, HVAC specialists, and more across Lagos. Verified credentials, transparent pricing, secure escrow.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onExploreDirectory || (() => onGetStarted('client'))}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 active:scale-95"
                >
                  <MapPin className="h-4 w-4" />
                  Find Specialists Near Me
                </button>
                <button
                  onClick={() => onGetStarted('pro')}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <Wrench className="h-4 w-4 text-emerald-600" />
                  Join as a Professional
                </button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" />Background Verified</span>
                <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-blue-600" />Escrow Protected</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-500 fill-amber-500" />4.97 Avg Rating</span>
              </div>
            </div>

            <div className={`relative transition-all duration-700 delay-200 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/80">
                <img src="/images/hero.jpg" alt="Vanguard professionals at work in Lagos" className="w-full h-80 sm:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 sm:-left-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['/images/pro1.jpg', '/images/pro2.jpg', '/images/pro3.jpg'].map((src, i) => (
                      <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">42 pros nearby</p>
                    <p className="text-[10px] text-emerald-600 font-bold">● Available now</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-right-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-900">Job Completed</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">Escrow of ₦150,000 released to Engr. Alabi</p>
                <p className="text-[10px] text-slate-400 mt-1">2 min ago • Lekki Phase 1</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-100 pt-12">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section id="categories" className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Services</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Every trade, fully covered.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map(({ icon: Icon, label, count }) => (
              <button key={label} onClick={onExploreDirectory || (() => onGetStarted('client'))} className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{label}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{count}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Process</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How Vanguard works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative flex flex-col gap-4">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%-8px)] w-full h-px bg-slate-200 z-0" />
                )}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-lg shadow-emerald-600/20">{item.step}</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VANGUARD / FEATURES */}
      <section id="trust" className="bg-slate-50 border-y border-slate-200 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Why Vanguard</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">The professional standard for trades in Lagos.</h2>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">We vet every specialist before they join. No unverified contractors, no upfront risk. You only pay after the work is done and you're satisfied.</p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}><Icon className={`h-4 w-4 ${color}`} /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { photo: '/images/pro1.jpg', name: 'Engr. Babatunde Alabi', title: 'Senior Electrician & Power Specialist', rating: 4.98, reviews: 314, location: 'Lekki Phase 1' },
                { photo: '/images/pro2.jpg', name: 'Amina Bello', title: 'Lead Solar & Inverter Engineer', rating: 4.96, reviews: 228, location: 'Victoria Island' },
                { photo: '/images/pro3.jpg', name: 'Tariq Adeleke', title: 'HVAC & Central AC Specialist', rating: 4.93, reviews: 189, location: 'Ikoyi' },
              ].map((pro) => (
                <div key={pro.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-200 hover:shadow-sm transition-all">
                  <img src={pro.photo} alt={pro.name} className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-sm truncate">{pro.name}</p>
                      <span className="shrink-0 text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">✓ Verified</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{pro.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px]">
                      <span className="text-amber-600 font-bold">★ {pro.rating}</span>
                      <span className="text-slate-400">({pro.reviews})</span>
                      <span className="text-emerald-700 font-semibold">● {pro.location}</span>
                    </div>
                  </div>
                  <button onClick={() => onGetStarted('client')} className="shrink-0 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-all">Book</button>
                </div>
              ))}
              <button onClick={onExploreDirectory || (() => onGetStarted('client'))} className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 py-3 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                View all 4,200+ specialists <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Reviews</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Trusted by thousands across Lagos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-0.5 text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">{t.avatar}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">Ready to book a specialist?</h2>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">Join over 28,000 clients and 4,200 specialists across Lagos.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onGetStarted} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              Get Started — It's Free <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onGetStarted('pro')} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all">
              <Wrench className="h-4 w-4 text-emerald-400" />List Your Skills as a Pro
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600"><Wrench className="h-3.5 w-3.5 text-white" /></div>
            <span className="font-bold text-slate-400">Vanguard Services</span>
            <span className="text-slate-600">• Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-5 text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy</a>
            <a href="#" className="hover:text-slate-400">Terms</a>
            <a href="#" className="hover:text-slate-400">Support</a>
            <span className="text-slate-700">0800-VANGUARD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
