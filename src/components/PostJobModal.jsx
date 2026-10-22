import React, { useState, useMemo } from 'react';
import { 
  X, 
  Zap, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../data/mockData';

export default function PostJobModal({ 
  isOpen, 
  onClose, 
  professionals, 
  currency, 
  onSubmitJob 
}) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('3-Phase Electrical Panel Breaker Overheating');
  const [category, setCategory] = useState('electrical');
  const [locationZone, setLocationZone] = useState('lekki');
  const [urgency, setUrgency] = useState('emergency'); // 'emergency' or 'scheduled'
  const [budgetType, setBudgetType] = useState('fixed'); // 'fixed' or 'hourly'
  const [budgetAmount, setBudgetAmount] = useState(
    currency === 'NGN' ? 350000 : 240
  );
  const [description, setDescription] = useState(
    'Main 250A Schneider breaker is buzzing under load and throwing intermittent trip alarms. Need a licensed electrician to inspect and repair.'
  );

  // Dynamic matching: find closest specialist
  const topMatch = useMemo(() => {
    const candidates = professionals.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      return true;
    });

    if (candidates.length === 0) return professionals[0];
    return candidates.sort((a, b) => a.distanceMiles - b.distanceMiles)[0];
  }, [professionals, category]);

  const formatPrice = (usd, ngn) => {
    if (currency === 'NGN') {
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitJob({
      title,
      category,
      locationZone,
      urgency,
      budgetType,
      budgetAmount,
      description,
      matchedPro: topMatch
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Request a Service / Post a Job
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Connect with verified technicians and electricians in your neighborhood
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          
          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Service Needed / Brief Summary
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inverter Error Code 08, AC Not Cooling, Distribution Board Repair..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Category & Location Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Service Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Neighborhood
              </label>
              <select
                value={locationZone}
                onChange={(e) => setLocationZone(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
              >
                {LOCATIONS.filter(l => l.id !== 'all').map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Urgency & Budget Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Timing Preference
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setUrgency('emergency')}
                  className={`rounded-xl border p-2.5 text-left transition-all ${
                    urgency === 'emergency'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="font-bold block">⚡ Emergency Service</span>
                  <span className="text-[10px] text-slate-500">Need tech today (&lt; 1 hr)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('scheduled')}
                  className={`rounded-xl border p-2.5 text-left transition-all ${
                    urgency === 'scheduled'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="font-bold block">📅 Schedule for Later</span>
                  <span className="text-[10px] text-slate-500">Select date & time</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Estimated Budget ({currency})
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={budgetType}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                >
                  <option value="fixed">Fixed</option>
                  <option value="hourly">Hourly</option>
                </select>
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Job Details & Symptoms
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue, building type, or any parts that might be needed..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Recommended Nearby Specialist Card */}
          {topMatch && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-3.5 text-xs shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  <span>Available Technician Nearby</span>
                </div>
                <span className="text-[10px] text-slate-600 font-bold">
                  {topMatch.distanceMiles} mi away • {topMatch.neighborhood}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    {topMatch.photo ? (
                      <img src={topMatch.photo} alt={topMatch.name} className="h-9 w-9 rounded-xl object-cover border border-slate-200 shadow-xs" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 font-bold text-slate-900 text-xs shadow-xs">
                        {topMatch.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{topMatch.name}</h5>
                    <p className="text-[11px] text-slate-600">{topMatch.title}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-800 text-xs">
                    {formatPrice(topMatch.hourlyRateUSD, topMatch.hourlyRateNGN)}/hr
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium">★ {topMatch.rating} • Responds in ~{topMatch.responseTime}</p>
                </div>
              </div>
            </div>
          )}

          {/* Vanguard SafePay Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Vanguard SafePay: payment is only authorized now and released after you approve the completed repair.</span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/30 active:scale-95"
            >
              <span>Submit Request & Find Pros</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
