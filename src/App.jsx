import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import MapRadarView from './components/MapRadarView';
import ProProfileView from './components/ProProfileView';
import DispatchSimulatorView from './components/DispatchSimulatorView';
import PostJobModal from './components/PostJobModal';
import NegotiateModal from './components/NegotiateModal';
import ProDashboardModal from './components/ProDashboardModal';
import Toast from './components/Toast';
import { PROFESSIONALS, MOCK_RECENT_DISPATCHES } from './data/mockData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  // ─── App Flow State ─────────────────────────────────────────────────────────
  // Starts on 'auth' (Sign In / Register) as requested
  // User can also visit 'landing' or go straight to 'app' (dashboard)
  const [appScreen, setAppScreen] = useState('auth');
  const [authConfig, setAuthConfig] = useState({ mode: 'signin', role: 'client' });

  // ─── Dashboard State ─────────────────────────────────────────────────────────
  const [activeView, setActiveView] = useState('discovery');
  const [professionalsList, setProfessionalsList] = useState(PROFESSIONALS);
  const [selectedProId, setSelectedProId] = useState(PROFESSIONALS[0].id);
  const [proForNegotiation, setProForNegotiation] = useState(null);
  const [isNegotiateModalOpen, setIsNegotiateModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProDashboardOpen, setIsProDashboardOpen] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  const [toast, setToast] = useState(null);
  const [activeDispatchesCount, setActiveDispatchesCount] = useState(1);

  const availableProsCount = professionalsList.filter(p => p.availableNow).length;

  // ─── Toast Helper ─────────────────────────────────────────────────────────
  const showToast = (title, message) => setToast({ title, message });

  // ─── Landing Page Handlers ────────────────────────────────────────────────
  const handleGetStarted = (role = 'client') => {
    setAuthConfig({ mode: 'register', role });
    setAppScreen('auth');
  };

  const handleSignIn = () => {
    setAuthConfig({ mode: 'signin', role: 'client' });
    setAppScreen('auth');
  };

  // ─── Auth Handlers ────────────────────────────────────────────────────────
  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setAppScreen('app');
    showToast(
      userData.role === 'pro' ? 'Welcome, Professional!' : 'Welcome to Vanguard!',
      `Signed in as ${userData.name}. ${userData.role === 'pro' ? 'Your specialist dashboard is ready.' : 'Browse verified specialists near you.'}`
    );
  };

  // ─── Dashboard Handlers ────────────────────────────────────────────────────
  const handleToggleAvailability = (proId) => {
    setProfessionalsList(prev => prev.map(p => {
      if (p.id === proId) {
        const nextState = !p.availableNow;
        showToast(
          nextState ? 'Status: Available' : 'Status: Offline',
          `${p.name}'s availability updated on the directory.`
        );
        return { ...p, availableNow: nextState };
      }
      return p;
    }));
  };

  // Called from Navbar when "Sign In" is clicked while already in the app
  const handleOpenAuth = (mode = 'signin') => {
    setAuthConfig({ mode, role: 'client' });
    setAppScreen('auth');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setAppScreen('landing');
    showToast('Signed Out', 'You have been signed out of your account.');
  };

  const handleSelectProForNegotiation = (pro) => {
    setProForNegotiation(pro);
    setIsNegotiateModalOpen(true);
  };

  const handleViewProProfile = (proId) => {
    setSelectedProId(proId);
    setActiveView('profile');
  };

  const handleSubmitJob = (jobData) => {
    setIsPostJobModalOpen(false);
    showToast('Service Request Received', `Your request has been matched with a verified technician in ${jobData.locationZone}.`);
    if (jobData.matchedPro) {
      setProForNegotiation(jobData.matchedPro);
      setSelectedProId(jobData.matchedPro.id);
      setActiveView('simulator');
    }
  };

  const handleConfirmDispatch = (contractData) => {
    setIsNegotiateModalOpen(false);
    setSelectedProId(contractData.pro.id);
    setActiveDispatchesCount(prev => prev + 1);
    showToast('Booking Confirmed & Dispatched', 'Escrow payment authorized. Technician is now en route.');
    setActiveView('simulator');
  };

  const handleUpdateProProfile = (updatedPro) => {
    setProfessionalsList(prev => prev.map(p => p.id === updatedPro.id ? updatedPro : p));
    showToast('Profile Updated', 'Your profile changes have been saved.');
  };

  const userProProfile = currentUser?.proProfileId
    ? professionalsList.find(p => p.id === currentUser.proProfileId)
    : professionalsList[0];

  // ─── SCREEN: LANDING ───────────────────────────────────────────────────────
  if (appScreen === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={handleGetStarted}
          onSignIn={handleSignIn}
          onExploreDirectory={() => setAppScreen('app')}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  // ─── SCREEN: AUTH ──────────────────────────────────────────────────────────
  if (appScreen === 'auth') {
    return (
      <>
        <AuthPage
          defaultMode={authConfig.mode}
          defaultRole={authConfig.role}
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setAppScreen('landing')}
          onExploreGuest={() => setAppScreen('app')}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  // ─── SCREEN: MAIN APP DASHBOARD ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">

      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currency={currency}
        setCurrency={setCurrency}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        activeDispatchesCount={activeDispatchesCount}
        availableProsCount={availableProsCount}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenProDashboard={() => setIsProDashboardOpen(true)}
        onSignOut={handleSignOut}
        onGoHome={() => setAppScreen('landing')}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">

        {activeView === 'discovery' && (
          <MapRadarView
            professionals={professionalsList}
            currency={currency}
            onSelectProForNegotiation={handleSelectProForNegotiation}
            onViewProProfile={handleViewProProfile}
            onOpenPostJob={() => setIsPostJobModalOpen(true)}
          />
        )}

        {activeView === 'profile' && (
          <ProProfileView
            professionals={professionalsList}
            selectedProId={selectedProId}
            onSelectProId={setSelectedProId}
            currency={currency}
            onToggleAvailability={handleToggleAvailability}
            onInitiateDispatch={handleSelectProForNegotiation}
            onBackToRadar={() => setActiveView('discovery')}
          />
        )}

        {activeView === 'simulator' && (
          <DispatchSimulatorView
            professionals={professionalsList}
            selectedPro={professionalsList.find(p => p.id === selectedProId)}
            currency={currency}
            onResetSimulation={() => showToast('Tracker Reset', 'Returned to service request step.')}
            onFinishContract={() => showToast('Job Completed', 'Escrow released and rating submitted.')}
          />
        )}

        {/* Recent Jobs Strip */}
        <section className="mt-8 sm:mt-12 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] sm:text-[11px]">
                Recently Completed Jobs Across Lagos
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-5 text-slate-600 text-[11px]">
              {MOCK_RECENT_DISPATCHES.map((disp) => (
                <div key={disp.id} className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-slate-900 font-bold">{disp.title}</span>
                  <span className="text-slate-500">• {disp.location}</span>
                  <span className="text-slate-700 font-medium font-mono">{disp.amount}</span>
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">{disp.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 sm:py-8 text-xs text-slate-600 mb-14 md:mb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <button onClick={() => setAppScreen('landing')} className="font-black text-slate-900 text-sm hover:text-emerald-700 transition-colors">Vanguard</button>
            <span>•</span>
            <span>Local Technical Services & Escrow Protection in Lagos, Nigeria</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span className="flex items-center gap-1 text-emerald-800 font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              100% Satisfaction Guarantee
            </span>
            <span>Customer Support: 0800-VANGUARD</span>
          </div>
        </div>
      </footer>

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        professionals={professionalsList}
        currency={currency}
        onSubmitJob={handleSubmitJob}
      />

      <NegotiateModal
        isOpen={isNegotiateModalOpen}
        onClose={() => setIsNegotiateModalOpen(false)}
        pro={proForNegotiation}
        currency={currency}
        onConfirmDispatch={handleConfirmDispatch}
      />

      <ProDashboardModal
        isOpen={isProDashboardOpen}
        onClose={() => setIsProDashboardOpen(false)}
        currentUser={currentUser}
        proProfile={userProProfile}
        currency={currency}
        onUpdateProProfile={handleUpdateProProfile}
        onToggleAvailability={handleToggleAvailability}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
