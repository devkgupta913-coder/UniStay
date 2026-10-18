import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Footprints, 
  Star, 
  Utensils, 
  Wifi, 
  Zap, 
  Wind, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

export default function ListingCard({ listing }) {
  const primaryImage =
    listing.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80';

  const formatRent = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Boys PG':
        return 'bg-blue-600 text-white';
      case 'Girls PG':
        return 'bg-rose-600 text-white';
      case 'Co-ed PG':
        return 'bg-purple-600 text-white';
      case 'Flat':
        return 'bg-emerald-700 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm stay-card flex flex-col h-full group">
      
      {/* Image Container with Badges */}
      <Link to={`/listings/${listing._id}`} className="relative block h-52 sm:h-56 overflow-hidden bg-slate-100">
        <img
          src={primaryImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${getTypeBadgeColor(listing.accommodationType)}`}>
            {listing.accommodationType}
          </span>
          {listing.foodIncluded && (
            <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
              <Utensils className="w-3 h-3" />
              <span>Mess Included</span>
            </span>
          )}
        </div>

        {/* YMCA Distance Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
            <Footprints className="w-3.5 h-3.5 text-blue-400" />
            <span>{listing.distanceFromYMCA} km to YMCA (~{listing.walkingTimeToYMCA || Math.round(listing.distanceFromYMCA * 12)} min walk)</span>
          </div>
        </div>

        {/* Rating Badge */}
        {listing.rating > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({listing.numReviews})</span>
            </div>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Sector & Landmark */}
          <div className="flex items-center text-xs font-semibold text-slate-500 mb-1.5 space-x-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{listing.sector} • Near {listing.nearestMetro} Metro</span>
          </div>

          {/* Title */}
          <Link to={`/listings/${listing._id}`}>
            <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
              {listing.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Amenities Preview */}
        <div className="flex items-center space-x-3 text-slate-400 text-xs py-1 border-y border-slate-100">
          {listing.amenities?.includes('WiFi') && (
            <span className="flex items-center space-x-1" title="High-Speed Wi-Fi">
              <Wifi className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-slate-600 text-[11px]">Wi-Fi</span>
            </span>
          )}
          {listing.amenities?.includes('AC') && (
            <span className="flex items-center space-x-1" title="Air Conditioned">
              <Wind className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-slate-600 text-[11px]">AC</span>
            </span>
          )}
          {listing.amenities?.includes('Power Backup') && (
            <span className="flex items-center space-x-1" title="Power Backup">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-600 text-[11px]">Backup</span>
            </span>
          )}
          <span className="text-[11px] text-slate-400 ml-auto">
            {listing.occupancy} Room
          </span>
        </div>

        {/* Price & Action */}
        <div className="pt-1 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                {formatRent(listing.rent)}
              </span>
              <span className="text-xs font-medium text-slate-500">/ month</span>
            </div>
            {listing.securityDeposit > 0 ? (
              <p className="text-[10px] text-slate-400">
                Deposit: ₹{listing.securityDeposit.toLocaleString('en-IN')}
              </p>
            ) : (
              <p className="text-[10px] text-emerald-600 font-medium">Zero Deposit</p>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            {listing.contactNumber && (
              <a
                href={`tel:${listing.contactNumber}`}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Call Owner"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
              </a>
            )}
            <Link
              to={`/listings/${listing._id}`}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Details
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
