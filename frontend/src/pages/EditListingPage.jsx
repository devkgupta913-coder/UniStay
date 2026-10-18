import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

export default function EditListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    accommodationType: 'Boys PG',
    genderPreference: 'Boys',
    occupancy: 'Double',
    rent: '',
    securityDeposit: '',
    maintenanceCharges: '',
    foodIncluded: false,
    distanceFromYMCA: '',
    walkingTimeToYMCA: '',
    nearestMetro: 'Escorts Mujesar',
    sector: 'Sector 6',
    address: '',
    contactNumber: '',
    contactWhatsApp: '',
    curfewTime: '10:30 PM',
    amenities: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const allAmenities = [
    'WiFi',
    'Food Included',
    'AC',
    'Cooler',
    'Power Backup',
    'RO Water',
    'Washing Machine',
    'Study Table',
    'Attached Washroom',
    'Geyser',
    'CCTV/Security',
    'Housekeeping',
    'Refrigerator',
    'Parking',
  ];

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/listings/${id}`);
        if (res.data.success) {
          const l = res.data.listing;
          setFormData({
            title: l.title || '',
            description: l.description || '',
            accommodationType: l.accommodationType || 'Boys PG',
            genderPreference: l.genderPreference || 'Boys',
            occupancy: l.occupancy || 'Double',
            rent: l.rent || '',
            securityDeposit: l.securityDeposit || '',
            maintenanceCharges: l.maintenanceCharges || '',
            foodIncluded: l.foodIncluded || false,
            distanceFromYMCA: l.distanceFromYMCA || '',
            walkingTimeToYMCA: l.walkingTimeToYMCA || '',
            nearestMetro: l.nearestMetro || 'Escorts Mujesar',
            sector: l.sector || 'Sector 6',
            address: l.address || '',
            contactNumber: l.contactNumber || '',
            contactWhatsApp: l.contactWhatsApp || '',
            curfewTime: l.curfewTime || '10:30 PM',
            amenities: l.amenities || [],
          });
        }
      } catch (err) {
        setError('Failed to load listing for editing');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');

      const res = await api.put(`/listings/${id}`, formData);

      if (res.data.success) {
        alert('Listing updated successfully!');
        navigate(`/listings/${id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500 font-bold">
        Loading stay details for editing...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Link
        to={`/listings/${id}`}
        className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Cancel and Back to Listing</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Edit Stay
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Update Accommodation Details
          </h1>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Title & Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Accommodation Type</label>
                <select
                  value={formData.accommodationType}
                  onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Boys PG">Boys PG</option>
                  <option value="Girls PG">Girls PG</option>
                  <option value="Co-ed PG">Co-ed PG</option>
                  <option value="Flat">Flat / Apartment</option>
                  <option value="Private Room">Private Single Room</option>
                  <option value="Shared Room">Shared Room</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Occupancy</label>
                <select
                  value={formData.occupancy}
                  onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="4+ Sharing">4+ Sharing</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Pricing & Deposit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rent (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Security Deposit (₹)</label>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Maintenance (₹)</label>
                <input
                  type="number"
                  value={formData.maintenanceCharges}
                  onChange={(e) => setFormData({ ...formData, maintenanceCharges: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. Location & Distance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Distance from YMCA (km)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.distanceFromYMCA}
                  onChange={(e) => setFormData({ ...formData, distanceFromYMCA: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sector</label>
                <input
                  type="text"
                  required
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Owner Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.contactWhatsApp}
                  onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {allAmenities.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-blue-800'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              {submitting ? 'Saving Changes...' : 'Save and Update Stay'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
