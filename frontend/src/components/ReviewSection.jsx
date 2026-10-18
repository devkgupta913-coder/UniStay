import React, { useState } from 'react';
import { Star, MessageSquare, Trash2, Send, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function ReviewSection({ listingId, reviews = [], onReviewAdded, onReviewDeleted }) {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [cleanliness, setCleanliness] = useState(5);
  const [foodQuality, setFoodQuality] = useState(5);
  const [wifiSpeed, setWifiSpeed] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write a review comment');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const res = await api.post(`/listings/${listingId}/reviews`, {
        rating,
        comment,
        cleanliness,
        foodQuality,
        wifiSpeed,
      });

      if (res.data.success) {
        setComment('');
        onReviewAdded(res.data.review);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    try {
      const res = await api.delete(`/listings/${listingId}/reviews/${reviewId}`);
      if (res.data.success) {
        onReviewDeleted(reviewId);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">No reviews yet for this stay.</p>
            <p className="text-xs text-slate-400 mt-0.5">Be the first YMCA student to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={rev.user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={rev.user?.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 leading-none">
                        {rev.user?.name || 'YMCA Student'}
                      </h5>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {rev.user?.college || 'YMCA Faridabad'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                {/* Sub-ratings badges */}
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Cleanliness: <strong className="text-slate-600">{rev.cleanliness}/5</strong></span>
                  <span>Food: <strong className="text-slate-600">{rev.foodQuality}/5</strong></span>
                  <span>Wi-Fi: <strong className="text-slate-600">{rev.wifiSpeed}/5</strong></span>
                </div>

                {/* Delete button if owner */}
                {user && (user.id === rev.user?._id || user._id === rev.user?._id || user.role === 'admin') && (
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leave a Review Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Rate Your Experience as a YMCA Student</span>
          </h4>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* Overall Rating Slider / Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Overall Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 - Amazing)</option>
                <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value="3">⭐⭐⭐ (3 - Average)</option>
                <option value="2">⭐⭐ (2 - Below Avg)</option>
                <option value="1">⭐ (1 - Terrible)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cleanliness</label>
              <select
                value={cleanliness}
                onChange={(e) => setCleanliness(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} / 5</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Food / Mess</label>
              <select
                value={foodQuality}
                onChange={(e) => setFoodQuality(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} / 5</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Wi-Fi Speed</label>
              <select
                value={wifiSpeed}
                onChange={(e) => setWifiSpeed(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} / 5</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How is the environment? Is food hot and hygienic? Any curfew issues? Walk to YMCA?"
              rows="3"
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Post Review'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
          <p className="text-xs text-blue-900 font-medium">
            Are you staying here or visited recently?{' '}
            <a href="/login" className="font-bold underline text-blue-700">
              Log in with your YMCA student account
            </a>{' '}
            to post a verified review.
          </p>
        </div>
      )}
    </div>
  );
}
