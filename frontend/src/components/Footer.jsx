import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, MapPin, Heart, ShieldCheck, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">
                Uni<span className="text-blue-400">Stay</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier student housing and PG discovery platform exclusively designed for students of J.C. Bose UST (YMCA) Faridabad.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Built by Students, For Students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore Housing
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/?type=Boys+PG" className="hover:text-blue-400 transition-colors">
                  Boys PGs near YMCA
                </Link>
              </li>
              <li>
                <Link to="/?type=Girls+PG" className="hover:text-blue-400 transition-colors">
                  Girls PGs near YMCA
                </Link>
              </li>
              <li>
                <Link to="/?type=Flat" className="hover:text-blue-400 transition-colors">
                  Shared Flats & 2BHKs
                </Link>
              </li>
              <li>
                <Link to="/?type=Private+Room" className="hover:text-blue-400 transition-colors">
                  Private Single Rooms
                </Link>
              </li>
              <li>
                <Link to="/?maxDistance=1" className="hover:text-blue-400 transition-colors">
                  Within 1km Walking Distance
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Campus Sectors */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Key YMCA Sectors
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Sector 6 (Opposite YMCA Campus)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Sector 7 (Main Market & Girls PGs)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Sector 8 & 11 (Mathura Road)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Escorts Mujesar Metro (Violet Line)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Bata Chowk Metro Hub</span>
              </li>
            </ul>
          </div>

          {/* Student Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  100% verified student accommodations with verified landlord phone numbers.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  Zero Brokerage. Contact owners directly via phone or WhatsApp.
                </span>
              </div>
              <div className="pt-2">
                <Link
                  to="/create-listing"
                  className="inline-block w-full text-center py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  List a PG / Room Near YMCA
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UniStay Faridabad. Dedicated to J.C. Bose UST, YMCA students.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 mx-1 text-red-500 fill-red-500" /> for YMCA Students
          </p>
        </div>
      </div>
    </footer>
  );
}
