import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import SearchFilterBar from '../components/SearchFilterBar';
import ListingCard from '../components/ListingCard';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Footprints, 
  PhoneCall, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    accommodationType: searchParams.get('type') || 'All',
    genderPreference: searchParams.get('gender') || 'All',
    maxRent: searchParams.get('maxRent') || '',
    maxDistance: searchParams.get('maxDistance') || 'All',
    occupancy: 'All',
    sector: 'All',
    foodIncluded: false,
    amenities: [],
    sort: 'distance-asc',
  });

  const fetchListings = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.accommodationType !== 'All') params.accommodationType = filters.accommodationType;
      if (filters.genderPreference !== 'All') params.genderPreference = filters.genderPreference;
      if (filters.maxRent) params.maxRent = filters.maxRent;
      if (filters.maxDistance !== 'All') params.maxDistance = filters.maxDistance;
      if (filters.occupancy !== 'All') params.occupancy = filters.occupancy;
      if (filters.foodIncluded) params.foodIncluded = true;
      if (filters.amenities.length > 0) params.amenities = filters.amenities.join(',');
      if (filters.sort) params.sort = filters.sort;

      const res = await api.get('/listings', { params });
      if (res.data.success) {
        setListings(res.data.listings);
        setError('');
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to load listings:', err);
      // Auto-retry up to 3 times with 1.5s delay during backend cold-start
      if (retryCount < 3) {
        setTimeout(() => {
          fetchListings(retryCount + 1);
        }, 1500);
      } else {
        setError('Unable to fetch accommodations. Please ensure the backend is running.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters.accommodationType, filters.sort]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 -mt-6 rounded-b-[2.5rem] shadow-xl overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Dedicated Student Housing • YMCA Faridabad</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Ideal Student Stay <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Minutes from YMCA Campus
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Verified PGs, flats, and rooms with food, Wi-Fi, and power backup across Sector 6, 7, 8, 11, and Escorts Mujesar. Zero brokerage, straight to owners.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Stays</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Footprints className="w-4 h-4 text-blue-400" />
              <span>Under 15 Min Walk to YMCA</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Zero Brokerage Direct Contact</span>
            </span>
          </div>

          {/* Search Bar Embedded in Hero */}
          <div className="max-w-4xl mx-auto pt-4 text-left">
            <SearchFilterBar
              filters={filters}
              setFilters={setFilters}
              onSearch={fetchListings}
            />
          </div>

        </div>
      </section>

      {/* Main Content Listings Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Student Accommodations Near YMCA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing <span className="font-bold text-slate-800">{listings.length}</span> verified stays matching your preferences
            </p>
          </div>

          {filters.accommodationType !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 self-start sm:self-auto">
              Filtering by: {filters.accommodationType}
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-80 border border-slate-200 animate-pulse p-4 space-y-4">
                <div className="h-44 bg-slate-200 rounded-xl"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200 p-6 my-6">
            <p className="text-red-700 font-bold mb-2">{error}</p>
            <button
              onClick={fetchListings}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {/* Zero Results State */}
        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 my-8 shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No student stays found</h3>
            <p className="text-xs text-slate-500 mb-6">
              No stays matched your current filters. Try relaxing your budget or expanding the distance radius.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  accommodationType: 'All',
                  genderPreference: 'All',
                  maxRent: '',
                  maxDistance: 'All',
                  occupancy: 'All',
                  sector: 'All',
                  foodIncluded: false,
                  amenities: [],
                  sort: 'distance-asc',
                });
                setTimeout(fetchListings, 50);
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Why UniStay Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Why YMCA Students Choose UniStay
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Finding accommodation around Mathura Road and YMCA campus used to mean walking door-to-door in Sector 6. UniStay simplifies campus living with transparent pricing and student-rated PGs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Walking Distance</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real walking distance calculations to YMCA Gate 1 & Gate 2 so you are never late for 9 AM lectures.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Zero Brokerage</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct phone & WhatsApp contact with verified PG owners and wardens. No middlemen fees.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Peer Reviews</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real reviews from YMCA seniors on Wi-Fi speeds, mess hygiene, and study environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
