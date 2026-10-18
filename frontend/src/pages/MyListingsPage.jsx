import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { Building2, PlusCircle, Edit, Trash2, MapPin, Footprints, AlertCircle } from 'lucide-react';

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/listings/my/listings');
      if (res.data.success) {
        setListings(res.data.listings);
      }
    } catch (err) {
      setError('Failed to fetch your listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await api.delete(`/listings/${id}`);
      if (res.data.success) {
        setListings(listings.filter((l) => l._id !== id));
      }
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Posted Stays</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your accommodations and student inquiries
          </p>
        </div>

        <Link
          to="/create-listing"
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm self-start sm:self-auto transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Another Stay</span>
        </Link>
      </div>

      {loading && (
        <div className="py-12 text-center text-sm font-semibold text-slate-500">
          Loading your listings...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-semibold flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && listings.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-md mx-auto">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">You haven't posted any stays yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Are you a PG owner or student with a spare room near YMCA Faridabad?
          </p>
          <Link
            to="/create-listing"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm inline-flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Stay Now</span>
          </Link>
        </div>
      )}

      {!loading && !error && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>{item.accommodationType}</span>
                    <span className="text-slate-800">₹{item.rent?.toLocaleString('en-IN')}/mo</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h3>
                  
                  <div className="flex items-center text-xs text-slate-500 space-x-2">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{item.sector}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Footprints className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.distanceFromYMCA} km from YMCA</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <Link
                  to={`/listings/${item._id}`}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600"
                >
                  View Details
                </Link>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/listings/${item._id}/edit`}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600"
                    title="Edit Listing"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-red-600 hover:bg-red-50"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
