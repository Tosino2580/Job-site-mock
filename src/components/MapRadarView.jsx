import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  SlidersHorizontal,
  Navigation,
  Eye,
  Phone,
  Layers,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../data/mockData';

export default function MapRadarView({ 
  professionals, 
  currency, 
  onSelectProForNegotiation,
  onViewProProfile,
  onOpenPostJob 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [maxDistance, setMaxDistance] = useState(3.0); // in miles
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'rating', 'rate'
  const [hoveredProId, setHoveredProId] = useState(null);
  const [selectedProId, setSelectedProId] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);

  // Filtered and sorted professionals
  const filteredPros = useMemo(() => {
    return professionals.filter(pro => {
      // Category filter
      if (selectedCategory !== 'all' && pro.category !== selectedCategory) {
        return false;
      }
      // Neighborhood filter
      if (selectedNeighborhood !== 'all') {
        const targetLoc = LOCATIONS.find(l => l.id === selectedNeighborhood);
        if (targetLoc && !pro.neighborhood.toLowerCase().includes(targetLoc.name.toLowerCase())) {
          return false;
        }
      }
      // Distance filter
      if (pro.distanceMiles > maxDistance) {
        return false;
      }
      // Availability filter
      if (onlyAvailable && !pro.availableNow) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(query);
        const matchesTitle = pro.title.toLowerCase().includes(query);
        const matchesCompany = pro.company?.toLowerCase().includes(query);
        const matchesSkills = pro.skills.some(skill => skill.toLowerCase().includes(query));
        if (!matchesName && !matchesTitle && !matchesCompany && !matchesSkills) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceMiles - b.distanceMiles;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rate') {
        const rateA = currency === 'NGN' ? a.hourlyRateNGN : a.hourlyRateUSD;
        const rateB = currency === 'NGN' ? b.hourlyRateNGN : b.hourlyRateUSD;
        return rateA - rateB;
      }
      return 0;
    });
  }, [professionals, selectedCategory, selectedNeighborhood, maxDistance, onlyAvailable, searchQuery, sortBy, currency]);

  // Selected Pro detail
  const activePro = useMemo(() => {
    return professionals.find(p => p.id === (selectedProId || hoveredProId)) || filteredPros[0];
  }, [professionals, selectedProId, hoveredProId, filteredPros]);

  const formatPrice = (usd, ngn) => {
    if (currency === 'NGN') {
      return `₦${ngn.toLocaleString()}`;
    }
    return `$${usd}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Verified Trade Specialists & On-Demand Dispatch in Lagos
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Connect directly with licensed electricians, solar engineers, and HVAC specialists nearby. Background-checked, verified credentials, and protected with secure escrow payments.
          </p>
        </div>

        {/* Search & Location Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Service Search */}
          <div className="relative sm:col-span-5">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service do you need? (e.g. Solar inverter, ATS, AC gas...)"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Neighborhood Selector */}
          <div className="sm:col-span-4">
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Post a Job Button */}
          <div className="sm:col-span-3">
            <button
              onClick={onOpenPostJob}
              className="w-full rounded-xl bg-emerald-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Post a Job / Request Help
            </button>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'border border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Interactive Map (Left) & Professionals List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Street Map (5 Columns) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            
            {/* Map Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-200 p-3 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>Live Map View: Lekki & Victoria Island</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.4))}
                  className="rounded border border-slate-200 bg-white p-1 text-slate-700 hover:bg-slate-100 shadow-xs"
                  title="Zoom In"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                  className="rounded border border-slate-200 bg-white p-1 text-slate-700 hover:bg-slate-100 shadow-xs"
                  title="Zoom Out"
                >
                  <Minus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Interactive Vector Street Map */}
            <div className="relative aspect-4/3 w-full bg-[#f4f6f8] overflow-hidden select-none">
              
              {/* Map Canvas with Waterways and Roads */}
              <div 
                className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              >
                {/* Lagos Lagoon & Five Cowries Creek (Clean Blue Waterway) */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Water body */}
                  <path 
                    d="M 0,20 Q 25,30 45,22 T 100,28 L 100,0 L 0,0 Z" 
                    fill="#e0f2fe" 
                  />
                  <path 
                    d="M 0,65 Q 35,55 60,62 T 100,58 L 100,75 Q 70,70 45,78 T 0,72 Z" 
                    fill="#e0f2fe" 
                  />
                  {/* Water label */}
                  <text x="12" y="14" fontSize="3" fill="#0284c7" fontWeight="bold" fontFamily="sans-serif">Five Cowries Creek</text>
                  <text x="65" y="68" fontSize="3" fill="#0284c7" fontWeight="bold" fontFamily="sans-serif">Lagos Lagoon</text>

                  {/* Major Expressways & Avenues */}
                  {/* Lekki-Epe Expressway */}
                  <path d="M 0,48 L 100,42" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                  <path d="M 0,48 L 100,42" stroke="#ffffff" strokeWidth="2" fill="none" />
                  
                  {/* Admiralty Way */}
                  <path d="M 40,45 C 55,42 62,35 75,32" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                  <path d="M 40,45 C 55,42 62,35 75,32" stroke="#ffffff" strokeWidth="1.5" fill="none" />

                  {/* Ahmadu Bello Way (VI) */}
                  <path d="M 15,25 L 35,55" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                  <path d="M 15,25 L 35,55" stroke="#ffffff" strokeWidth="1.5" fill="none" />

                  {/* Ozumba Mbadiwe Ave */}
                  <path d="M 10,32 L 45,28" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  <path d="M 10,32 L 45,28" stroke="#ffffff" strokeWidth="1.2" fill="none" />

                  {/* Secondary Streets */}
                  <path d="M 50,44 L 55,60" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                  <path d="M 65,38 L 70,55" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                  <path d="M 25,40 L 30,55" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                </svg>

                {/* Street Name Labels */}
                <span className="absolute top-[38%] left-[48%] text-[8px] font-bold text-slate-500 transform -rotate-8 bg-white/70 px-1 rounded pointer-events-none">
                  Admiralty Way
                </span>
                <span className="absolute top-[49%] left-[10%] text-[8px] font-bold text-slate-500 transform -rotate-4 bg-white/70 px-1 rounded pointer-events-none">
                  Lekki-Epe Expressway
                </span>
                <span className="absolute top-[28%] left-[16%] text-[8px] font-bold text-slate-500 transform 45 bg-white/70 px-1 rounded pointer-events-none">
                  Ahmadu Bello Way
                </span>

                {/* Client's Pin (Your Location) */}
                <div className="absolute left-[45%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white shadow-md ring-4 ring-slate-900/10">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="mt-1 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-xs">
                    Your Location (Lekki)
                  </span>
                </div>

                {/* Interactive Pro Price Badge Pins (Like Airbnb/Uber) */}
                {professionals.map(pro => {
                  const isFiltered = filteredPros.some(fp => fp.id === pro.id);
                  const isHovered = hoveredProId === pro.id;
                  const isSelected = selectedProId === pro.id;

                  if (!isFiltered) return null;

                  return (
                    <div
                      key={pro.id}
                      style={{ left: `${pro.coordinates.x}%`, top: `${pro.coordinates.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredProId(pro.id)}
                      onMouseLeave={() => setHoveredProId(null)}
                      onClick={() => {
                        setSelectedProId(pro.id);
                        onSelectProForNegotiation(pro);
                      }}
                    >
                      {/* Price Badge Pin */}
                      <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold shadow-md transition-colors ${
                        isSelected || isHovered
                          ? 'bg-slate-900 text-white ring-2 ring-emerald-500 scale-105'
                          : pro.availableNow
                          ? 'bg-white text-slate-900 border border-slate-300 hover:border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}>
                        {pro.availableNow && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                        )}
                        <span>{formatPrice(pro.hourlyRateUSD, pro.hourlyRateNGN)}/hr</span>
                      </div>

                      {/* Tooltip Card on Hover */}
                      {(isHovered || isSelected) && (
                        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 w-44 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl text-left">
                          <p className="text-[11px] font-bold text-slate-900 truncate">{pro.name}</p>
                          <p className="text-[9px] text-slate-500 truncate">{pro.title}</p>
                          <div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold">
                            <span className="text-emerald-700">{pro.distanceMiles} mi away</span>
                            <span className="text-amber-600">★ {pro.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

            </div>

            {/* Map Sub-Bar: Radius slider */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>Distance radius:</span>
                <span className="font-bold text-slate-900">{maxDistance} miles</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                className="w-32 accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

          </div>

          {/* Quick Spotlight Card */}
          {activePro && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Selected Specialist</span>
                <span className="text-emerald-700 font-bold">{activePro.distanceMiles} miles away</span>
              </div>

              <div className="mt-3 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-800 border border-slate-200">
                  {activePro.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 truncate text-sm">{activePro.name}</h4>
                  <p className="text-xs text-slate-600 truncate">{activePro.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{activePro.address}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => onSelectProForNegotiation(activePro)}
                  className="flex-1 rounded-xl bg-emerald-600 py-2 text-center text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  Book / Request Dispatch
                </button>
                <button
                  onClick={() => onViewProProfile(activePro.id)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  View Profile
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Verified Professionals Directory (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-semibold">
            <span>
              Showing {filteredPros.length} Available Professionals in Lagos
            </span>
            <div className="flex items-center gap-2">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white py-1 px-2 text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="distance">Nearest First</option>
                <option value="rating">Top Rated</option>
                <option value="rate">Lowest Rate</option>
              </select>
            </div>
          </div>

          {filteredPros.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
              <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No professionals found in this exact radius</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Try widening your search radius slider or choosing "All Services" to discover qualified specialists nearby.
              </p>
              <button
                onClick={() => {
                  setMaxDistance(5.0);
                  setSelectedCategory('all');
                  setSelectedNeighborhood('all');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                Reset Filters to 5.0 miles
              </button>
            </div>
          ) : (
            filteredPros.map(pro => {
              const isSelected = selectedProId === pro.id;
              const isHovered = hoveredProId === pro.id;

              return (
                <div
                  key={pro.id}
                  onMouseEnter={() => setHoveredProId(pro.id)}
                  onMouseLeave={() => setHoveredProId(null)}
                  className={`rounded-2xl border transition-all p-5 ${
                    isSelected || isHovered
                      ? 'border-emerald-600 bg-white shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Pro Identity & Credentials */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-base font-extrabold text-slate-800 border border-slate-200 shadow-xs">
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {pro.availableNow && (
                          <span 
                            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-600" 
                            title="Available for immediate dispatch"
                          />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold text-base text-slate-900">
                            {pro.name}
                          </h3>
                          <span className="flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            <ShieldCheck className="h-3 w-3" />
                            Verified Pro
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-700">
                          {pro.title}
                        </p>

                        <p className="text-[11px] text-slate-500 font-medium">
                          {pro.company}
                        </p>

                        {/* Location & Reviews row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1">
                          <span className="flex items-center gap-1 text-emerald-800 font-bold">
                            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                            {pro.distanceMiles} mi away • {pro.neighborhood}
                          </span>
                          <span className="flex items-center gap-1 text-amber-600 font-bold">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            {pro.rating} ({pro.reviewsCount} reviews)
                          </span>
                          <span className="text-slate-500">
                            ⚡ Responds in ~{pro.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rates & Booking Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <div className="font-mono text-lg font-black text-slate-900">
                          {formatPrice(pro.hourlyRateUSD, pro.hourlyRateNGN)}
                          <span className="text-xs font-normal text-slate-500">/hr</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Diagnostic visit: <span className="font-bold text-slate-800">{formatPrice(pro.fixedRateUSD, pro.fixedRateNGN)}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-3">
                        <button
                          onClick={() => onViewProProfile(pro.id)}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => onSelectProForNegotiation(pro)}
                          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs active:scale-95 transition-all"
                        >
                          <span>Request Dispatch</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Skills Pills */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Services:</span>
                    {pro.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {pro.skills.length > 4 && (
                      <span className="text-[10px] font-semibold text-slate-500">
                        +{pro.skills.length - 4} more
                      </span>
                    )}
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
}
