import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Clock, 
  Star, 
  SlidersHorizontal, 
  CheckCircle2, 
  Zap, 
  ArrowRight
} from 'lucide-react';

export default function NegotiateModal({ 
  isOpen, 
  onClose, 
  pro, 
  currency, 
  onConfirmDispatch 
}) {
  if (!isOpen || !pro) return null;

  const baseRate = currency === 'NGN' ? pro.hourlyRateNGN : pro.hourlyRateUSD;
  const [offerRate, setOfferRate] = useState(baseRate);
  const [percentDiff, setPercentDiff] = useState(0); // -20% to +20%

  const mobilizationFee = currency === 'NGN' ? 35000 : 25;
  const escrowFee = currency === 'NGN' ? 20000 : 15;
  const totalDeposit = offerRate + mobilizationFee + escrowFee;

  const formatPrice = (amount) => {
    if (currency === 'NGN') {
      return `₦${Math.round(amount).toLocaleString()}`;
    }
    return `$${Math.round(amount)}`;
  };

  const handleSliderChange = (e) => {
    const pct = parseInt(e.target.value, 10);
    setPercentDiff(pct);
    const newRate = baseRate * (1 + pct / 100);
    setOfferRate(newRate);
  };

  const handleAcceptStandard = () => {
    setPercentDiff(0);
    setOfferRate(baseRate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDispatch({
      pro,
      agreedRate: offerRate,
      totalDeposit
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Service Booking & Rate Confirmation
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Clear upfront pricing • Protected by Vanguard SafePay
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
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          
          {/* Pro Snapshot */}
          <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="relative shrink-0">
              {pro.photo ? (
                <img src={pro.photo} alt={pro.name} className="h-12 w-12 rounded-2xl object-cover border border-slate-200 shadow-xs" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 font-bold text-slate-900 text-sm shadow-xs">
                  {pro.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm truncate">{pro.name}</h4>
                <span className="flex items-center gap-0.5 text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  Verified Pro
                </span>
              </div>
              <p className="text-xs text-slate-600 truncate font-medium">{pro.title}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="text-emerald-800 font-bold">{pro.distanceMiles} mi away</span>
                <span>•</span>
                <span>⚡ Responds in ~{pro.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Rate Negotiation / Custom Offer Slider */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Hourly Rate Offer</span>
              <button
                type="button"
                onClick={handleAcceptStandard}
                className="text-xs text-emerald-700 hover:underline font-bold"
              >
                Use Standard Rate
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-2xl font-black font-mono text-slate-900">
                  {formatPrice(offerRate)}
                </span>
                <span className="text-xs text-slate-500 font-normal"> / hour</span>
              </div>
              <span className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold ${
                percentDiff === 0 
                  ? 'bg-slate-200 text-slate-700' 
                  : percentDiff < 0 
                  ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {percentDiff > 0 ? `+${percentDiff}%` : `${percentDiff}%`} {percentDiff === 0 ? '(Standard)' : ''}
              </span>
            </div>

            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={percentDiff}
              onChange={handleSliderChange}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>-20% (Budget Offer)</span>
              <span>Pro Standard Rate</span>
              <span>+20% (Urgent Rush)</span>
            </div>

            <div className="rounded-lg bg-white border border-slate-200 p-2.5 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {percentDiff < -10
                  ? 'Technician will be notified of your budget offer before dispatch.'
                  : 'Instant dispatch: rate matches the technician’s standard verified pricing.'}
              </span>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Estimated Initial Labor (1st Hour)</span>
              <span className="font-mono text-slate-900 font-bold">{formatPrice(offerRate)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Travel & Fuel Callout Fee ({pro.distanceMiles} mi)</span>
              <span className="font-mono text-slate-900 font-bold">{formatPrice(mobilizationFee)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Vanguard SafePay Escrow & Insurance</span>
              <span className="font-mono text-emerald-700 font-bold">{formatPrice(escrowFee)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
              <span>Total Payment Hold</span>
              <span className="font-mono text-emerald-800 font-black">{formatPrice(totalDeposit)}</span>
            </div>
          </div>

          {/* Safety alert */}
          <div className="flex items-start gap-2 text-xs text-slate-700 bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl">
            <Lock className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Your card or transfer is only authorized. Payment is held securely and only transferred after the specialist completes the repair and you provide the arrival PIN.
            </span>
          </div>

          {/* Actions */}
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
              <span>Confirm & Dispatch Specialist</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
