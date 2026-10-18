import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import AmenitiesGrid from '../components/AmenitiesGrid';
import ReviewSection from '../components/ReviewSection';
import MapView from '../components/MapView';
import { 
  MapPin, 
  Footprints, 
  Star, 
  Utensils, 
  IndianRupee, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  Building2, 
  Train, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Calendar,
  Users,
  Check
} from 'lucide-react';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async (retryCount = 0) => {
      try {
        setLoading(true);
        const res = await api.get(`/listings/${id}`);
        if (res.data.success) {
          setListing(res.data.listing);
          setError('');
          setLoading(false);
        }
      } catch (err) {
        if (retryCount < 3) {
          setTimeout(() => fetchListing(retryCount + 1), 1500);
        } else {
          setError(err.response?.data?.message || 'Failed to load stay details');
          setLoading(false);
        }
      }
    };

    fetchListing();
  }, [id]);

  const handleDeleteListing = async () => {
    if (!window.confirm('Are you sure you want to permanently delete this listing?')) return;
    try {
      const res = await api.delete(`/listings/${id}`);
      if (res.data.success) {
        alert('Listing removed successfully');
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete listing');
    }
  };

  const handleReviewAdded = (newReview) => {
    setListing((prev) => {
      const updatedReviews = [newReview, ...(prev.reviews || [])];
      const avg =
        updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
      return {
        ...prev,
        reviews: updatedReviews,
        rating: parseFloat(avg.toFixed(1)),
        numReviews: updatedReviews.length,
      };
    });
  };

  const handleReviewDeleted = (reviewId) => {
    setListing((prev) => {
      const remaining = (prev.reviews || []).filter((r) => r._id !== reviewId);
      const avg =
        remaining.length > 0
          ? remaining.reduce((acc, r) => acc + r.rating, 0) / remaining.length
          : 0;
      return {
        ...prev,
        reviews: remaining,
        rating: parseFloat(avg.toFixed(1)),
        numReviews: remaining.length,
      };
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-500">Loading YMCA stay details...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-red-600">{error || 'Stay not found'}</h3>
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all YMCA stays
        </Link>
      </div>
    );
  }

  const isOwner =
    user && (user.id === listing.owner?._id || user._id === listing.owner?._id || user.role === 'admin');

  const cleanPhone = listing.contactNumber?.replace(/[^0-9]/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button & Owner Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Stays</span>
        </Link>

        {isOwner && (
          <div className="flex items-center space-x-2">
            <Link
              to={`/listings/${listing._id}/edit`}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
            >
              <Edit className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit Stay</span>
            </Link>
            <button
              onClick={handleDeleteListing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Title & Key Header Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
            {listing.accommodationType}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Student Stay</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {listing.genderPreference} Preference
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {listing.title}
        </h1>

        <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-500 gap-y-2 gap-x-4">
          <span className="flex items-center space-x-1 font-semibold text-slate-700">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{listing.sector}, Faridabad • {listing.address}</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-700 font-semibold">
            <Footprints className="w-4 h-4 text-amber-600" />
            <span>{listing.distanceFromYMCA} km from YMCA Campus (~{listing.walkingTimeToYMCA} min walk)</span>
          </span>
          {listing.rating > 0 && (
            <span className="flex items-center space-x-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating} ({listing.numReviews} student reviews)</span>
            </span>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="h-80 sm:h-[420px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs relative">
          <img
            src={listing.images?.[activeImageIndex]?.url || listing.images?.[0]?.url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        {listing.images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {listing.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (Details, Amenities, Map, Reviews) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* YMCA Student Commute Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-blue-950 flex items-center space-x-2 mb-3">
              <Footprints className="w-4 h-4 text-blue-600" />
              <span>Commute to J.C. Bose UST (YMCA) Campus</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-blue-100">
                <span className="text-slate-500 block">Walking Distance</span>
                <span className="font-extrabold text-slate-900 text-sm">{listing.distanceFromYMCA} km</span>
                <span className="text-[11px] text-blue-600 block mt-0.5">~{listing.walkingTimeToYMCA} mins on foot</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-blue-100">
                <span className="text-slate-500 block">Nearest Metro</span>
                <span className="font-extrabold text-slate-900 text-sm">{listing.nearestMetro}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Violet Line (Direct to Delhi)</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-blue-100">
                <span className="text-slate-500 block">E-Rickshaw Availability</span>
                <span className="font-extrabold text-emerald-700 text-sm">Frequent (₹10)</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Available right outside gate</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">About this Accommodation</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Key Specs Breakdown */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Room Specifications & Policies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Occupancy</span>
                <strong className="text-slate-800 text-sm">{listing.occupancy}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Curfew Timing</span>
                <strong className="text-slate-800 text-sm">{listing.curfewTime || 'No Curfew'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Mess / Meals</span>
                <strong className="text-slate-800 text-sm">
                  {listing.foodIncluded ? 'Included in Rent' : 'Available separately / self'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Maintenance</span>
                <strong className="text-slate-800 text-sm">
                  {listing.maintenanceCharges ? `₹${listing.maintenanceCharges}/mo` : 'Included'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Security Deposit</span>
                <strong className="text-slate-800 text-sm">
                  {listing.securityDeposit ? `₹${listing.securityDeposit}` : 'Nil'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Target Students</span>
                <strong className="text-slate-800 text-sm">YMCA Boys / Girls</strong>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Amenities & Facilities</h3>
            <AmenitiesGrid amenities={listing.amenities} />
          </div>

          {/* Interactive Map */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Location & Surroundings</h3>
            <MapView
              coordinates={listing.locationCoordinates}
              title={listing.title}
              sector={listing.sector}
            />
          </div>

          {/* Student Reviews */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                YMCA Student Reviews ({listing.reviews?.length || 0})
              </h3>
            </div>
            <ReviewSection
              listingId={listing._id}
              reviews={listing.reviews || []}
              onReviewAdded={handleReviewAdded}
              onReviewDeleted={handleReviewDeleted}
            />
          </div>

        </div>

        {/* Right Sticky Column (Price & Landlord Contact) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
            
            {/* Rent Block */}
            <div className="pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Monthly Rent
              </span>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{listing.rent?.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ month</span>
              </div>
              {listing.securityDeposit > 0 ? (
                <p className="text-xs text-slate-500 mt-1">
                  Security Deposit: ₹{listing.securityDeposit.toLocaleString('en-IN')} (Refundable)
                </p>
              ) : (
                <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Zero Security Deposit</p>
              )}
            </div>

            {/* Inclusions summary */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Room Occupancy</span>
                <strong className="text-slate-800">{listing.occupancy}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Mess / Food</span>
                <strong className={listing.foodIncluded ? 'text-emerald-600' : 'text-slate-600'}>
                  {listing.foodIncluded ? 'Included' : 'Self / Extra'}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Brokerage</span>
                <strong className="text-emerald-600">₹0 (Zero Brokerage)</strong>
              </div>
            </div>

            {/* Landlord Contact Box */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 block">
                Owner / Caretaker Contact
              </span>

              {/* Call Button */}
              <a
                href={`tel:${listing.contactNumber}`}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Owner ({listing.contactNumber})</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi,%20I%20am%20a%20YMCA%20student%20interested%20in%20your%20listing:%20${encodeURIComponent(
                  listing.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Owner profile card */}
            <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
              <img
                src={listing.owner?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt=""
                className="w-10 h-10 rounded-full border border-slate-200 object-cover"
              />
              <div className="text-xs">
                <p className="font-bold text-slate-900">{listing.owner?.name || 'Verified Landlord'}</p>
                <p className="text-slate-400">{listing.owner?.role === 'owner' ? 'PG Owner / Warden' : 'Student Host'}</p>
              </div>
            </div>

            {/* YMCA Student Safety Notice */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 leading-snug">
              🔒 <strong>UniStay Student Shield:</strong> Always visit the accommodation in person and verify electricity meter & deposit terms before making payments.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
