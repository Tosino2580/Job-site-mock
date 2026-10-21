import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Save, 
  ShieldCheck, 
  Wrench, 
  Check, 
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';

export default function ProDashboardModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  proProfile, 
  currency, 
  onUpdateProProfile,
  onToggleAvailability 
}) {
  if (!isOpen || !proProfile) return null;

  const [hourlyRateNGN, setHourlyRateNGN] = useState(proProfile.hourlyRateNGN);
  const [hourlyRateUSD, setHourlyRateUSD] = useState(proProfile.hourlyRateUSD);
  const [fixedRateNGN, setFixedRateNGN] = useState(proProfile.fixedRateNGN);
  const [fixedRateUSD, setFixedRateUSD] = useState(proProfile.fixedRateUSD);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState(proProfile.skills);

  const formatPrice = (usd, ngn) => {
    if (currency === 'NGN') {
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const handleAddSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProProfile({
      ...proProfile,
      hourlyRateNGN: Number(hourlyRateNGN),
      hourlyRateUSD: Number(hourlyRateUSD),
      fixedRateNGN: Number(fixedRateNGN),
      fixedRateUSD: Number(fixedRateUSD),
      skills
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Manage Your Service Profile & Rates
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Profile for <span className="font-bold text-slate-800">{proProfile.name}</span> ({proProfile.company || proProfile.title})
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-5">
          
          {/* Availability Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {proProfile.availableNow ? 'Status: Available for Jobs Today' : 'Status: Booked / Offline'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {proProfile.availableNow ? 'Your profile is shown with an active green pin on the map' : 'You are currently not taking instant requests'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleAvailability(proProfile.id)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                proProfile.availableNow ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  proProfile.availableNow ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Jobs Done</span>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{proProfile.completedJobs}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Rating</span>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">★ {proProfile.rating}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Reviews</span>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{proProfile.reviewsCount}</p>
            </div>
          </div>

          {/* Rates Adjustment */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-800">
              Update Your Pricing ({currency})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Hourly Labor Rate
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-500">₦</span>
                    <input
                      type="number"
                      value={hourlyRateNGN}
                      onChange={(e) => setHourlyRateNGN(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-7 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="relative w-24">
                    <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-500">$</span>
                    <input
                      type="number"
                      value={hourlyRateUSD}
                      onChange={(e) => setHourlyRateUSD(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-7 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Diagnostic Visit Fee
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-500">₦</span>
                    <input
                      type="number"
                      value={fixedRateNGN}
                      onChange={(e) => setFixedRateNGN(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-7 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="relative w-24">
                    <span className="absolute left-3 top-2 text-xs font-mono font-bold text-slate-500">$</span>
                    <input
                      type="number"
                      value={fixedRateUSD}
                      onChange={(e) => setFixedRateUSD(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-7 pr-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Services */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-800">
              Active Listed Services
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add another service..."
                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
