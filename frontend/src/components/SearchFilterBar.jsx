import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  IndianRupee, 
  MapPin, 
  Users, 
  Utensils, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function SearchFilterBar({ filters, setFilters, onSearch }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { label: 'All Stays', value: 'All' },
    { label: 'Boys PG', value: 'Boys PG' },
    { label: 'Girls PG', value: 'Girls PG' },
    { label: 'Co-ed PG', value: 'Co-ed PG' },
    { label: 'Flats & 2BHK', value: 'Flat' },
    { label: 'Private Room', value: 'Private Room' },
    { label: 'Shared Room', value: 'Shared Room' },
  ];

  const amenityOptions = [
    'WiFi',
    'Food Included',
    'AC',
    'Power Backup',
    'RO Water',
    'Washing Machine',
    'Study Table',
    'Attached Washroom',
    'Geyser',
    'CCTV/Security',
  ];

  const handleCategorySelect = (val) => {
    setFilters((prev) => ({ ...prev, accommodationType: val }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters((prev) => {
      const current = prev.amenities || [];
      const updated = current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const resetFilters = () => {
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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full space-y-4">
      {/* Primary Search Bar */}
      <form onSubmit={handleFormSubmit} className="relative flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-blue-600" />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search by PG name, Sector (e.g. Sector 6, 7, 11), landmark, or metro station..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
              showAdvanced
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Filters</span>
            {(filters.maxRent || filters.maxDistance !== 'All' || filters.amenities.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            )}
          </button>

          <button
            type="submit"
            className="flex-1 md:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Find Stays</span>
          </button>
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = filters.accommodationType === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategorySelect(cat.value)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-6 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Filter Accommodations</h3>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Max Budget Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Monthly Budget (Max)
              </label>
              <div className="relative">
                <select
                  value={filters.maxRent}
                  onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Budget</option>
                  <option value="5000">Up to ₹5,000 / month</option>
                  <option value="7500">Up to ₹7,500 / month</option>
                  <option value="10000">Up to ₹10,000 / month</option>
                  <option value="15000">Up to ₹15,000 / month</option>
                  <option value="20000">Up to ₹20,000 / month</option>
                </select>
              </div>
            </div>

            {/* Distance from YMCA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Distance from YMCA Gate
              </label>
              <select
                value={filters.maxDistance}
                onChange={(e) => setFilters({ ...filters, maxDistance: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">Any Distance</option>
                <option value="0.5">Under 500m (Walking ~5 min)</option>
                <option value="1.0">Under 1.0 km (Walking ~10 min)</option>
                <option value="2.0">Under 2.0 km (~5 min e-rickshaw)</option>
                <option value="3.0">Under 3.0 km (Metro accessible)</option>
              </select>
            </div>

            {/* Gender Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Gender Preference
              </label>
              <select
                value={filters.genderPreference}
                onChange={(e) => setFilters({ ...filters, genderPreference: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Co-ed">Co-ed / Shared</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Sort Results By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="distance-asc">Distance: Closest to YMCA</option>
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="rating-desc">Student Rating: Highest</option>
              </select>
            </div>

          </div>

          {/* Student Amenities Multi-Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Included Amenities & Perks
            </label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => {
                const isSelected = filters.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apply Button in Drawer */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Apply All Filters
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
