import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MapRadarView from './components/MapRadarView';
import ProProfileView from './components/ProProfileView';
import DispatchSimulatorView from './components/DispatchSimulatorView';
import PostJobModal from './components/PostJobModal';
import NegotiateModal from './components/NegotiateModal';
import AuthModal from './components/AuthModal';
import ProDashboardModal from './components/ProDashboardModal';
import Toast from './components/Toast';
import { PROFESSIONALS, MOCK_RECENT_DISPATCHES } from './data/mockData';
import { ShieldCheck, MapPin, Truck, Activity, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('discovery'); // 'discovery', 'profile', 'simulator'
  const [professionalsList, setProfessionalsList] = useState(PROFESSIONALS);
  const [selectedProId, setSelectedProId] = useState(PROFESSIONALS[0].id);
  const [proForNegotiation, setProForNegotiation] = useState(null);
  const [isNegotiateModalOpen, setIsNegotiateModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  
  // Auth & Professional Portal states
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' or 'register'
  const [isProDashboardOpen, setIsProDashboardOpen] = useState(false);

  const [currency, setCurrency] = useState('NGN'); // 'NGN' | 'USD'
  const [toast, setToast] = useState(null);
  const [activeDispatchesCount, setActiveDispatchesCount] = useState(1);

  const availableProsCount = professionalsList.filter(p => p.availableNow).length;

  const showToast = (title, message) => {
    setToast({ title, message });
  };

  // Toggle availability handler
  const handleToggleAvailability = (proId) => {
    setProfessionalsList(prev => prev.map(p => {
      if (p.id === proId) {
        const nextState = !p.availableNow;
        showToast(
          nextState ? 'Status: Available for Jobs' : 'Status: Booked / Offline',
          `${p.name}'s status updated on the directory map.`
        );
        return { ...p, availableNow: nextState };
      }
      return p;
    }));
  };

  // Open Auth modal in specific mode
  const handleOpenAuth = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthModalOpen(false);
    showToast(
      'Signed In Successfully',
      `Welcome, ${userData.name}. Logged in as a ${userData.role === 'pro' ? 'Verified Specialist' : 'Client'}.`
    );
    if (userData.proProfileId) {
      setSelectedProId(userData.proProfileId);
    }
  };

  // Handle successful client registration
  const handleRegisterClientSuccess = (clientData) => {
    setCurrentUser({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      neighborhood: clientData.neighborhood,
      role: 'client',
      proProfileId: null
    });
    setIsAuthModalOpen(false);
    showToast(
      '🎉 Account Created!',
      `Welcome to Vanguard, ${clientData.name}. You can now book specialists and post jobs.`
    );
  };

  // Handle successful registration of professional & skill publication
  const handleRegisterProSuccess = (newPro) => {
    setProfessionalsList(prev => [newPro, ...prev]);
    setCurrentUser({
      name: newPro.name,
      email: `${newPro.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@vanguard.ng`,
      role: 'pro',
      proProfileId: newPro.id
    });
    setSelectedProId(newPro.id);
    setIsAuthModalOpen(false);
    
    showToast(
      '🎉 Profile Published!',
      `${newPro.name} is now listed and visible on the Lagos directory map.`
    );
    setActiveView('profile');
  };

  // Update existing professional from Pro Dashboard
  const handleUpdateProProfile = (updatedPro) => {
    setProfessionalsList(prev => prev.map(p => p.id === updatedPro.id ? updatedPro : p));
    showToast(
      'Rates & Details Updated',
      'Your profile changes have been saved.'
    );
  };

  // Sign out handler
  const handleSignOut = () => {
    setCurrentUser(null);
    showToast('Signed Out', 'You have been logged out.');
  };

  // Select pro for negotiation modal
  const handleSelectProForNegotiation = (pro) => {
    setProForNegotiation(pro);
    setIsNegotiateModalOpen(true);
  };

  // View specific pro in profile view
  const handleViewProProfile = (proId) => {
    setSelectedProId(proId);
    setActiveView('profile');
  };

  // Submit job from Post Job modal
  const handleSubmitJob = (jobData) => {
    setIsPostJobModalOpen(false);
    showToast(
      'Service Request Received',
      `Your request has been matched with a verified technician in ${jobData.locationZone}.`
    );
    if (jobData.matchedPro) {
      setProForNegotiation(jobData.matchedPro);
      setSelectedProId(jobData.matchedPro.id);
      setActiveView('simulator');
    }
  };

  // Confirm dispatch from Negotiate modal -> switches to Dispatch Tracker
  const handleConfirmDispatch = (contractData) => {
    setIsNegotiateModalOpen(false);
    setSelectedProId(contractData.pro.id);
    setActiveDispatchesCount(prev => prev + 1);
    showToast(
      'Booking Confirmed & Dispatched',
      `Escrow payment authorized. Technician is now en route.`
    );
    setActiveView('simulator');
  };

  // Active pro profile for dashboard
  const userProProfile = currentUser?.proProfileId 
    ? professionalsList.find(p => p.id === currentUser.proProfileId)
    : professionalsList[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation */}
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
      />

      {/* Main App Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        
        {/* VIEW 1: CLIENT DISCOVERY & DIRECTORY */}
        {activeView === 'discovery' && (
          <MapRadarView
            professionals={professionalsList}
            currency={currency}
            onSelectProForNegotiation={handleSelectProForNegotiation}
            onViewProProfile={handleViewProProfile}
            onOpenPostJob={() => setIsPostJobModalOpen(true)}
          />
        )}

        {/* VIEW 2: PROFESSIONAL / WORKER PROFILE & VERIFICATION VIEW */}
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

        {/* VIEW 3: DISPATCH TRACKER */}
        {activeView === 'simulator' && (
          <DispatchSimulatorView
            professionals={professionalsList}
            selectedPro={professionalsList.find(p => p.id === selectedProId)}
            currency={currency}
            onResetSimulation={() => {
              showToast('Tracker Reset', 'Returned to service request step.');
            }}
            onFinishContract={() => {
              showToast('Job Completed', 'Escrow released and rating submitted.');
            }}
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 sm:py-8 text-xs text-slate-600 mb-14 md:mb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <span className="font-black text-slate-900 text-sm">Vanguard</span>
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

      {/* Post Job Modal (Client) */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        professionals={professionalsList}
        currency={currency}
        onSubmitJob={handleSubmitJob}
      />

      {/* Negotiate / Dispatch Modal */}
      <NegotiateModal
        isOpen={isNegotiateModalOpen}
        onClose={() => setIsNegotiateModalOpen(false)}
        pro={proForNegotiation}
        currency={currency}
        onConfirmDispatch={handleConfirmDispatch}
      />

      {/* Auth Modal (Sign In / Register Client / Join as Pro) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        currency={currency}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClientSuccess={handleRegisterClientSuccess}
        onRegisterProSuccess={handleRegisterProSuccess}
      />

      {/* Pro Skills & Rates Dashboard Modal */}
      <ProDashboardModal
        isOpen={isProDashboardOpen}
        onClose={() => setIsProDashboardOpen(false)}
        currentUser={currentUser}
        proProfile={userProProfile}
        currency={currency}
        onUpdateProProfile={handleUpdateProProfile}
        onToggleAvailability={handleToggleAvailability}
      />

      {/* Interactive Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
