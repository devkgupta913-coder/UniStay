import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Upload, 
  Check, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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
    imageUrl: '',
    contactNumber: user?.phone || '',
    contactWhatsApp: user?.phone || '',
    curfewTime: '10:30 PM',
    amenities: ['WiFi', 'Power Backup', 'RO Water'],
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
    if (!isAuthenticated) {
      alert('Please log in to post a listing');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const submission = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'amenities') {
          submission.append('amenities', JSON.stringify(formData.amenities));
        } else {
          submission.append(key, formData[key]);
        }
      });

      if (imageFile) {
        submission.append('image', imageFile);
      }

      const res = await api.post('/listings', submission, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        alert('Stay listed successfully!');
        navigate(`/listings/${res.data.listing._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Link
        to="/"
        className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Cancel and Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            YMCA Campus Housing
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Post a Student Stay or PG
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in the details to list your PG, flat, or private room for YMCA Faridabad students.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Basic Accommodation Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Boys PG - Opposite YMCA Gate 2"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Accommodation Type *
                </label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gender Preference *
                </label>
                <select
                  value={formData.genderPreference}
                  onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Co-ed">Co-ed</option>
                  <option value="Any">Any</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Room Occupancy *
                </label>
                <select
                  value={formData.occupancy}
                  onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Single">Single (1 Student)</option>
                  <option value="Double">Double Sharing (2 Students)</option>
                  <option value="Triple">Triple Sharing (3 Students)</option>
                  <option value="4+ Sharing">4+ Sharing</option>
                  <option value="1 BHK">1 BHK Entire Flat</option>
                  <option value="2 BHK">2 BHK Entire Flat</option>
                  <option value="3 BHK">3 BHK Entire Flat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Curfew Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:30 PM or No Curfew"
                  value={formData.curfewTime}
                  onChange={(e) => setFormData({ ...formData, curfewTime: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Describe room condition, mess timing, study environment, and rules..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Monthly Rent & Charges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 6500"
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Security Deposit (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000 (0 for nil)"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maintenance / Extra (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 0"
                  value={formData.maintenanceCharges}
                  onChange={(e) => setFormData({ ...formData, maintenanceCharges: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="sm:col-span-3 flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="foodIncluded"
                  checked={formData.foodIncluded}
                  onChange={(e) => setFormData({ ...formData, foodIncluded: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="foodIncluded" className="text-xs font-semibold text-slate-800">
                  Food / Mess Service is included in the monthly rent
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: YMCA Faridabad Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. YMCA Location & Sector
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Distance from YMCA Campus (km) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="e.g. 0.5"
                  value={formData.distanceFromYMCA}
                  onChange={(e) => setFormData({ ...formData, distanceFromYMCA: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sector in Faridabad *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Sector 6">Sector 6 (Opposite YMCA Campus)</option>
                  <option value="Sector 7">Sector 7 (Main Market)</option>
                  <option value="Sector 8">Sector 8</option>
                  <option value="Sector 9">Sector 9</option>
                  <option value="Sector 10">Sector 10</option>
                  <option value="Sector 11">Sector 11 (Mathura Road)</option>
                  <option value="NIT 1">NIT 1</option>
                  <option value="NIT 2">NIT 2</option>
                  <option value="NIT 5">NIT 5</option>
                  <option value="Escorts Mujesar">Escorts Mujesar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nearest Metro Station
                </label>
                <select
                  value={formData.nearestMetro}
                  onChange={(e) => setFormData({ ...formData, nearestMetro: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Escorts Mujesar">Escorts Mujesar (Walking to YMCA)</option>
                  <option value="Bata Chowk">Bata Chowk</option>
                  <option value="Neelam Chowk Ajronda">Neelam Chowk Ajronda</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complete Address / Landmark *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. H.No 142, Near Gate 2, Sector 6, Faridabad"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Amenities */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Included Amenities
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

          {/* Section 5: Image & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              5. Photos & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Room Photo (Cloudinary)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Or Direct Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Owner Phone Number (For Calls) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98112 34567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98112 34567"
                  value={formData.contactWhatsApp}
                  onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              {loading ? 'Submitting Stay...' : 'Publish Stay Listing'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
