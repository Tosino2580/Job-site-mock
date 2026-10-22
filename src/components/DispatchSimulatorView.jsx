import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Send, 
  Lock, 
  RotateCcw, 
  Play, 
  Pause, 
  User, 
  Check, 
  DollarSign,
  AlertCircle,
  Truck,
  FileText
} from 'lucide-react';

export default function DispatchSimulatorView({ 
  professionals, 
  selectedPro, 
  currency, 
  onResetSimulation,
  onFinishContract 
}) {
  const pro = selectedPro || professionals[0];

  // Steps: 1: Service Requested, 2: Specialist Assigned, 3: Payment Secured in Escrow, 4: Technician En Route
  const [currentStep, setCurrentStep] = useState(4); // Default to En Route for instant satisfaction
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(680); // ~11 mins 20s
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'system',
      text: 'Dispatch confirmed. Your technician has accepted the service request.',
      time: '10:41 AM'
    },
    {
      sender: 'pro',
      text: `Good morning! I have loaded the testing meters and spare breaker parts in my service vehicle. Heading over from ${pro.address}.`,
      time: '10:42 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const formatPrice = (usd, ngn) => {
    if (currency === 'NGN') {
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${usd}`;
  };

  // Format countdown mm:ss
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Countdown timer effect during Step 4
  useEffect(() => {
    let interval = null;
    if (currentStep === 4 && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, countdownSeconds]);

  // Automated stepper
  useEffect(() => {
    let timeout = null;
    if (isAutoPlaying) {
      if (currentStep < 4) {
        timeout = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 2800);
      } else {
        setIsAutoPlaying(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [isAutoPlaying, currentStep]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const newMsg = {
      sender: 'client',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Realistic technician reply after 1.5s
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'pro',
          text: 'Received! Approaching your street now. I will notify you once I reach the security gate.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const steps = [
    { num: 1, label: '1. Request Sent', subtitle: 'Matching nearest pro' },
    { num: 2, label: '2. Pro Assigned', subtitle: pro.name.split(' ')[0] + ' ' + (pro.name.split(' ')[1] || '') },
    { num: 3, label: '3. Escrow Secured', subtitle: 'Funds held safely' },
    { num: 4, label: '4. Technician En Route', subtitle: 'Live arrival tracking' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Simulation Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            <h2 className="text-sm sm:text-lg font-extrabold text-slate-900">
              Live Service Dispatch & Arrival Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Ticket #VG-8921 • Assigned: <span className="font-bold text-slate-900">{pro.name}</span>
          </p>
        </div>

        {/* Step Simulator Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
              isAutoPlaying 
                ? 'bg-amber-500 text-slate-950 animate-pulse' 
                : 'border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isAutoPlaying ? 'Simulating Steps...' : 'Simulate Workflow'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentStep(1);
              setCountdownSeconds(680);
              setIsAutoPlaying(false);
            }}
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            title="Reset workflow to Step 1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Realistic 4-Step Progress Track */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {steps.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <button
                key={st.num}
                onClick={() => {
                  setCurrentStep(st.num);
                  setIsAutoPlaying(false);
                }}
                className={`flex flex-col text-left p-2.5 sm:p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/30'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20 text-slate-800'
                    : 'border-slate-200 bg-slate-50 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : st.num}
                  </span>

                  {isCurrent && (
                    <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </div>

                <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight">{st.label}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">{st.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Contents Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Work Column (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* STEP 1: SERVICE REQUESTED */}
          {currentStep === 1 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Looking for Available Specialists Nearby</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Broadcasting your request to qualified technicians within 3 miles of Lekki Phase 1...
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Service Category:</span>
                  <span className="font-bold text-slate-900">Electrical & Power Tech</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Job Description:</span>
                  <span className="font-bold text-slate-900">3-Phase Distribution Panel Trip Diagnosis</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Client Location:</span>
                  <span className="font-bold text-slate-900">Admiralty Way, Lekki Phase 1</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
              >
                Simulate: Technician Accepts Job &rarr;
              </button>
            </div>
          )}

          {/* STEP 2: SPECIALIST ASSIGNED */}
          {currentStep === 2 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                  ✓ Specialist Assigned
                </span>
                <span className="text-xs text-slate-500 font-medium">Response time: ~10 mins</span>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="relative shrink-0">
                  {pro.photo ? (
                    <img src={pro.photo} alt={pro.name} className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-lg font-black text-slate-900 shadow-xs">
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-900">{pro.name}</h4>
                  <p className="text-xs text-slate-600">{pro.title}</p>
                  <p className="text-[11px] text-slate-500">{pro.company}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-700">
                    <span className="font-bold text-emerald-800">{pro.distanceMiles} mi away</span>
                    <span>•</span>
                    <span className="font-bold text-amber-600">★ {pro.rating}</span>
                    <span>•</span>
                    <span>{pro.completedJobs} jobs completed</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  Proceed to Payment & Secure Escrow &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT SECURED IN ESCROW */}
          {currentStep === 3 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Review Pricing & Authorize Escrow Hold</h3>
                <span className="flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  <Lock className="h-3.5 w-3.5" />
                  Escrow Protected
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Initial Diagnostic Callout (Standard 1st Hour)</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {formatPrice(pro.hourlyRateUSD, pro.hourlyRateNGN)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Urgent Mobilization & Fuel ({pro.distanceMiles} mi)</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {formatPrice(25, 35000)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Vanguard Customer Protection Guarantee</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {formatPrice(15, 20000)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                  <span>Total Payment Authorization</span>
                  <span className="font-mono text-emerald-800 font-black">
                    {formatPrice(pro.hourlyRateUSD + 40, pro.hourlyRateNGN + 55000)}
                  </span>
                </div>
              </div>

              {/* Security notice */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Your money is held securely in escrow. Funds will not be released to the technician until you inspect the work, provide the arrival PIN code, and approve the completed ticket.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/30"
                >
                  Confirm & Dispatch Technician Now &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TECHNICIAN EN ROUTE */}
          {currentStep === 4 && (
            <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 p-6 space-y-6 shadow-xs">
              
              {/* Active Dispatch Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-600 animate-ping"></span>
                    <h3 className="text-lg font-black text-slate-900">Technician is On the Way</h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Route: Admiralty Way &rarr; Your Location in Lekki Phase 1
                  </p>
                </div>

                {/* Arrival Countdown Clock */}
                <div className="rounded-2xl border border-emerald-300 bg-white px-5 py-2.5 text-center shadow-xs">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Estimated Arrival</span>
                  <div className="font-mono text-2xl font-black text-emerald-800 tracking-wider">
                    {formatTimer(countdownSeconds)}
                  </div>
                </div>
              </div>

              {/* Technician Contact Card */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {pro.photo ? (
                      <img src={pro.photo} alt={pro.name} className="h-12 w-12 rounded-2xl object-cover border border-slate-200" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-extrabold text-slate-800 border border-slate-200">
                        {pro.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{pro.name}</h4>
                    <p className="text-xs text-slate-500">Service Vehicle: Toyota Hilux (White)</p>
                    <p className="text-xs text-emerald-700 font-bold mt-0.5">Licensed & Background Verified</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+2348030000000"
                    onClick={(e) => { e.preventDefault(); alert(`Calling ${pro.name} at +234 803 123 4567...`); }}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-xs"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              {/* Security Arrival PIN Code */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Your Arrival Verification PIN</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Share this 4-digit code with {pro.name.split(' ')[0]} when he arrives at your gate to verify identity.
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xl font-black tracking-widest text-emerald-900 border border-emerald-300 bg-emerald-50 px-4 py-2 rounded-xl shadow-xs">
                  <span>8</span>
                  <span>4</span>
                  <span>2</span>
                  <span>9</span>
                </div>
              </div>

              {/* Progress Stepper Visualizer Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-semibold">
                  <span>Dispatched from Office</span>
                  <span className="text-emerald-800 font-bold">On Admiralty Way (~65%)</span>
                  <span>Arrival at Gate</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[65%] transition-all duration-500" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    alert(`Job completed! Escrow payment of ${formatPrice(pro.hourlyRateUSD + 40, pro.hourlyRateNGN + 55000)} released to ${pro.name}. Receipt emailed to client.`);
                    setCurrentStep(1);
                  }}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-center text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  Confirm Arrival & Inspect Work
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-600 hover:text-rose-600"
                >
                  Cancel Service
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: In-App Message Drawer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col h-[340px] sm:h-[420px] lg:h-[480px] shadow-xs">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {pro.photo ? (
                    <img src={pro.photo} alt={pro.name} className="h-9 w-9 rounded-xl object-cover border border-slate-200" />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-900 text-xs">
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pro.name}</h4>
                  <p className="text-[10px] text-emerald-700 font-bold">● En Route to Your Address</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>Ticket #VG-8921</span>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'client' 
                      ? 'items-end' 
                      : msg.sender === 'pro' 
                      ? 'items-start' 
                      : 'items-center'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-600 text-center font-medium my-1">
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'client'
                          ? 'bg-emerald-600 text-white font-medium rounded-br-none shadow-xs'
                          : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'client' ? 'text-emerald-100' : 'text-slate-500'
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 border-t border-slate-200 pt-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message technician (e.g. gate code, parking)..."
                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

          {/* Service Guarantee Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Vanguard Workmanship Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              All jobs booked through Vanguard are insured up to ₦50M and backed by our 100% satisfaction re-work policy.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
