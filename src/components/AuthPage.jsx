import React, { useState } from 'react';
import { Eye, EyeOff, Wrench, ArrowLeft, ShieldCheck, CheckCircle2, User, Briefcase, Mail, Lock, Phone, MapPin, ChevronRight } from 'lucide-react';

const INPUT = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all';
const LABEL = 'block text-xs font-bold text-slate-700 mb-1.5';

export default function AuthPage({ defaultMode = 'signin', defaultRole = 'client', onAuthSuccess, onBack, onExploreGuest }) {
  const [mode, setMode] = useState(defaultMode); // 'signin' | 'register'
  const [role, setRole] = useState(defaultRole);  // 'client' | 'pro'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // For pro registration multi-step

  // Form fields
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    trade: '',
    company: '',
    experience: '',
    licenseNumber: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = {
        name: mode === 'signin' ? 'Demo User' : `${form.firstName} ${form.lastName}`,
        email: form.email || 'demo@vanguard.ng',
        role: role,
        avatar: role === 'pro' ? '/images/pro4.jpg' : null,
      };
      onAuthSuccess(user);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* LEFT PANEL — Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        {/* Emerald glow */}
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-600/15 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-10">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold">
              <ArrowLeft className="h-4 w-4" />
              View Landing Page
            </button>
            {onExploreGuest && (
              <button onClick={onExploreGuest} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                Explore as Guest <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/30">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg">Vanguard</p>
              <p className="text-slate-400 text-xs font-medium">Professional Services</p>
            </div>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight">
            Lagos's most trusted trades platform.
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Every specialist is background-checked, trade-licensed, and insured. Secure payments, real reviews, and same-day dispatch.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10 rounded-2xl border border-slate-700 bg-slate-800/80 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-1 text-amber-400 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-sm">★</span>)}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            "Vanguard found me a licensed electrician in 12 minutes. The escrow payment meant I never had to worry about paying upfront."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black">FA</div>
            <div>
              <p className="text-white text-xs font-bold">Folake Adeleke</p>
              <p className="text-slate-500 text-[10px]">Facility Manager, Victoria Island</p>
            </div>
          </div>
        </div>

        {/* Pro thumbnails */}
        <div className="relative z-10 mt-6 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['/images/pro1.jpg', '/images/pro2.jpg', '/images/pro3.jpg', '/images/pro4.jpg', '/images/pro5.jpg'].map((src, i) => (
              <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-slate-700 object-cover" />
            ))}
          </div>
          <div>
            <p className="text-white text-xs font-bold">4,200+ verified pros</p>
            <p className="text-emerald-400 text-[10px] font-semibold">● 840 available now in Lagos</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto">

        {/* Mobile top navigation */}
        <div className="w-full max-w-md mb-6 flex items-center justify-between lg:hidden text-xs">
          <button onClick={onBack} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            Landing Page
          </button>
          {onExploreGuest && (
            <button onClick={onExploreGuest} className="text-emerald-700 font-bold hover:underline flex items-center gap-0.5">
              Guest Preview <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex rounded-2xl border border-slate-200 bg-white p-1 mb-8 shadow-xs">
            <button
              onClick={() => { setMode('signin'); setStep(1); }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${mode === 'signin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setStep(1); }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${mode === 'register' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Register
            </button>
          </div>

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Welcome back</h1>
                <p className="text-slate-500 text-sm mt-1">Sign in to your Vanguard account</p>
              </div>

              {/* Quick demo buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setForm(f => ({ ...f, email: 'client@demo.ng', password: 'demo123' })); setRole('client'); }}
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <User className="h-4 w-4 text-slate-500 group-hover:text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-800">Client Demo</p>
                    <p className="text-[10px] text-slate-400">Find professionals</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { setForm(f => ({ ...f, email: 'pro@demo.ng', password: 'demo123' })); setRole('pro'); }}
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <Briefcase className="h-4 w-4 text-slate-500 group-hover:text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-800">Pro Demo</p>
                    <p className="text-[10px] text-slate-400">Manage your profile</p>
                  </div>
                </button>
              </div>

              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">or sign in with email</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div>
                <label className={LABEL}>Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={`${INPUT} pl-10`} placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={LABEL.replace('mb-1.5', '')}>Password</label>
                  <button type="button" className="text-[11px] text-emerald-600 font-semibold hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} className={`${INPUT} pl-10 pr-10`} placeholder="Enter your password" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Signing in...</span>
                ) : (
                  <><ShieldCheck className="h-4 w-4" />Sign In to Vanguard</>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={step === 1 && role === 'pro' ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-5">

              {step === 1 && (
                <>
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Create your account</h1>
                    <p className="text-slate-500 text-sm mt-1">Join 28,000+ users on Vanguard</p>
                  </div>

                  {/* Role selector */}
                  <div>
                    <label className={LABEL}>I want to...</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={`flex flex-col items-start gap-1.5 rounded-xl border-2 p-4 text-left transition-all ${role === 'client' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <User className={`h-5 w-5 ${role === 'client' ? 'text-emerald-600' : 'text-slate-500'}`} />
                        <p className="text-xs font-bold text-slate-900">Hire a Professional</p>
                        <p className="text-[10px] text-slate-500 leading-snug">Book verified trade specialists for my home or business</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('pro')}
                        className={`flex flex-col items-start gap-1.5 rounded-xl border-2 p-4 text-left transition-all ${role === 'pro' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <Briefcase className={`h-5 w-5 ${role === 'pro' ? 'text-emerald-600' : 'text-slate-500'}`} />
                        <p className="text-xs font-bold text-slate-900">List My Services</p>
                        <p className="text-[10px] text-slate-500 leading-snug">Join as a verified trade professional and get clients</p>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>First Name</label>
                      <input type="text" value={form.firstName} onChange={e => update('firstName', e.target.value)} className={INPUT} placeholder="Emeka" required />
                    </div>
                    <div>
                      <label className={LABEL}>Last Name</label>
                      <input type="text" value={form.lastName} onChange={e => update('lastName', e.target.value)} className={INPUT} placeholder="Okonkwo" required />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={`${INPUT} pl-10`} placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Phone number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={`${INPUT} pl-10`} placeholder="+234 801 000 0000" required />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} className={`${INPUT} pl-10 pr-10`} placeholder="Create a strong password" required />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Creating account...</span>
                    ) : role === 'pro' ? (
                      <>Continue — Add Professional Details <ChevronRight className="h-4 w-4" /></>
                    ) : (
                      <><ShieldCheck className="h-4 w-4" />Create Account</>
                    )}
                  </button>
                </>
              )}

              {/* Step 2 — Pro-specific details */}
              {step === 2 && role === 'pro' && (
                <>
                  <div>
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-semibold mb-4">
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <h1 className="text-2xl font-black text-slate-900">Professional Details</h1>
                    <p className="text-slate-500 text-sm mt-1">Tell us about your trade and credentials</p>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">✓</div>
                    <div className="h-px flex-1 bg-emerald-300" />
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">2</div>
                    <span className="text-slate-400">Step 2 of 2</span>
                  </div>

                  <div>
                    <label className={LABEL}>Trade / Specialty</label>
                    <select value={form.trade} onChange={e => update('trade', e.target.value)} className={INPUT} required>
                      <option value="">Select your primary trade</option>
                      <option>Electrical & Power Systems</option>
                      <option>Solar & Inverter Installation</option>
                      <option>HVAC & Air Conditioning</option>
                      <option>Smart Home & IoT</option>
                      <option>Fiber Optic & Networking</option>
                      <option>CCTV & Security Systems</option>
                      <option>Plumbing & Water Systems</option>
                      <option>Generator Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className={LABEL}>Company / Business Name</label>
                    <input type="text" value={form.company} onChange={e => update('company', e.target.value)} className={INPUT} placeholder="e.g. Alabi Electrical Services" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>Years of Experience</label>
                      <select value={form.experience} onChange={e => update('experience', e.target.value)} className={INPUT} required>
                        <option value="">Select</option>
                        <option>1–3 years</option>
                        <option>4–7 years</option>
                        <option>8–12 years</option>
                        <option>13+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL}>Base Area (Lagos)</label>
                      <select value={form.location} onChange={e => update('location', e.target.value)} className={INPUT} required>
                        <option value="">Select</option>
                        <option>Lekki Phase 1</option>
                        <option>Victoria Island</option>
                        <option>Ikoyi & Banana Island</option>
                        <option>Ikeja GRA</option>
                        <option>Yaba & Surulere</option>
                        <option>Ajah & Sangotedo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Trade License / Certification Number</label>
                    <input type="text" value={form.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} className={INPUT} placeholder="e.g. COREN #ER-88491 (optional for now)" />
                  </div>

                  {/* Verification commitments */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                    <p className="text-xs font-bold text-emerald-800 mb-3">What happens after registration:</p>
                    {[
                      "We'll verify your identity within 24 hours",
                      "Trade license and insurance will be reviewed",
                      "A background check is conducted",
                      "You'll receive a Vanguard Verified badge",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Submitting application...</span>
                    ) : (
                      <><ShieldCheck className="h-4 w-4" />Submit Professional Application</>
                    )}
                  </button>
                </>
              )}

              <p className="text-center text-[11px] text-slate-500">
                By continuing, you agree to Vanguard's{' '}
                <a href="#" className="text-emerald-600 font-semibold hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</a>.
              </p>
            </form>
          )}

          {/* Guest Explorer Option */}
          {onExploreGuest && (
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={onExploreGuest}
                className="text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>Just looking around? Explore live directory as guest</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
