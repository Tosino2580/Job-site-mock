import React from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  Activity, 
  MapPin, 
  DollarSign, 
  UserCheck, 
  Truck,
  LogIn,
  LogOut,
  Settings,
  User,
  Wrench
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  currency, 
  setCurrency, 
  onOpenPostJob,
  activeDispatchesCount,
  availableProsCount,
  currentUser,
  onOpenAuth,
  onOpenProDashboard,
  onSignOut,
  onGoHome
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Brand & Location */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            onClick={onGoHome || (() => setActiveView('discovery'))}
            className="flex cursor-pointer items-center gap-2 sm:gap-2.5 transition-opacity hover:opacity-90"
            title="Return to Vanguard Home"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs font-bold shrink-0">
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">Vanguard</span>
                <span className="rounded-full bg-slate-100 border border-slate-200 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Services
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                <span className="hidden sm:inline">Lagos, Nigeria • </span>
                <span className="text-emerald-700 font-bold">{availableProsCount} Pros Online</span>
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            onClick={() => setActiveView('discovery')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeView === 'discovery'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
            <span>Find Specialists</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeView === 'profile'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 text-sky-600" />
            <span>Specialist Profile</span>
          </button>

          <button
            onClick={() => setActiveView('simulator')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all relative ${
              activeView === 'simulator'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Truck className="h-3.5 w-3.5 text-amber-600" />
            <span>Dispatch Tracker</span>
            {activeDispatchesCount > 0 && (
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 ring-4 ring-emerald-600/20" />
            )}
          </button>
        </nav>

        {/* Action Controls: Currency, Post Job, and Auth / Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Currency Toggle (Compact on mobile) */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5 text-xs">
            <button
              onClick={() => setCurrency('NGN')}
              className={`rounded-lg px-2 sm:px-2.5 py-1 font-mono font-bold text-[11px] sm:text-xs transition-colors ${
                currency === 'NGN'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Display rates in Nigerian Naira"
            >
              <span className="sm:hidden">₦</span>
              <span className="hidden sm:inline">₦ NGN</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`rounded-lg px-2 sm:px-2.5 py-1 font-mono font-bold text-[11px] sm:text-xs transition-colors ${
                currency === 'USD'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Display rates in US Dollars"
            >
              <span className="sm:hidden">$</span>
              <span className="hidden sm:inline">$ USD</span>
            </button>
          </div>

          {/* Quick Post CTA (Desktop) */}
          <button
            onClick={onOpenPostJob}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 shadow-xs"
          >
            <PlusCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Post a Job</span>
          </button>

          {/* User Auth Section */}
          {!currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-500" />
                <span className="hidden xs:inline">Sign In</span>
                <span className="xs:hidden">Login</span>
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1 rounded-xl bg-emerald-600 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-xs shadow-emerald-600/30 active:scale-95"
              >
                <span>Register</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-slate-200">
              
              {/* Profile button */}
              <div 
                onClick={currentUser.role === 'pro' ? onOpenProDashboard : undefined}
                className={`flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1.5 text-xs transition-colors ${
                  currentUser.role === 'pro' ? 'cursor-pointer hover:bg-slate-100 hover:border-slate-300' : ''
                }`}
                title={currentUser.role === 'pro' ? 'Click to manage your rates and skills' : 'Logged in'}
              >
                <div className="relative shrink-0">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-6 w-6 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px]">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-600 border border-white" />
                </div>
                
                <div className="hidden md:block text-left">
                  <div className="font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                    {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1] || ''}
                  </div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase">
                    {currentUser.role === 'pro' ? 'Specialist' : 'Client'}
                  </div>
                </div>

                {currentUser.role === 'pro' && (
                  <span className="hidden lg:inline text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded ml-1">
                    Manage Rates
                  </span>
                )}
              </div>

              {/* Sign Out */}
              <button
                onClick={onSignOut}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Sign out of account"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar - Fixed App Bar */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1.5 shadow-lg safe-bottom">
        <div className="flex items-center justify-around text-xs">
          
          <button
            onClick={() => setActiveView('discovery')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
              activeView === 'discovery' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <MapPin className={`h-4 w-4 ${activeView === 'discovery' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="text-[10px]">Find Pros</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
              activeView === 'profile' ? 'text-sky-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <UserCheck className={`h-4 w-4 ${activeView === 'profile' ? 'text-sky-600' : 'text-slate-400'}`} />
            <span className="text-[10px]">Specialists</span>
          </button>

          <button
            onClick={() => setActiveView('simulator')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors relative ${
              activeView === 'simulator' ? 'text-amber-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <div className="relative">
              <Truck className={`h-4 w-4 ${activeView === 'simulator' ? 'text-amber-600' : 'text-slate-400'}`} />
              {activeDispatchesCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-600 ring-2 ring-white" />
              )}
            </div>
            <span className="text-[10px]">Tracker</span>
          </button>

          <button
            onClick={onOpenPostJob}
            className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-emerald-800 font-bold"
          >
            <PlusCircle className="h-4 w-4 text-emerald-600" />
            <span className="text-[10px]">Post Job</span>
          </button>

          {currentUser ? (
            <button
              onClick={currentUser.role === 'pro' ? onOpenProDashboard : onSignOut}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-slate-700 font-medium"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[8px]">
                {currentUser.name[0]}
              </div>
              <span className="text-[10px]">{currentUser.role === 'pro' ? 'Rates' : 'Account'}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-slate-600 font-medium"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              <span className="text-[10px]">Sign In</span>
            </button>
          )}

        </div>
      </nav>
    </header>
  );
}
