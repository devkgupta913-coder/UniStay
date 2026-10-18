import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Train, 
  Utensils, 
  ShieldAlert, 
  CheckCircle2, 
  Footprints,
  ArrowRight
} from 'lucide-react';

export default function AboutYMCAPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <GraduationCap className="w-4 h-4 text-amber-500" />
          <span>J.C. Bose UST, YMCA Faridabad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          YMCA Faridabad Student Living Guide
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500">
          Everything freshers and seniors need to know about finding PGs, flats, and mess facilities around the YMCA campus on Mathura Road.
        </p>
      </div>

      {/* Sector by Sector Guide */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Top Student Residential Sectors Near Campus</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Sector 6 (Opposite Campus)</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Walking Distance (~3 min)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Located directly across Mathura Road from YMCA Gate 1 & Gate 2. The most popular area for 1st and 2nd-year students who prioritize zero commute time. Houses dozens of Boys & Girls PGs.
            </p>
            <div className="text-xs font-semibold text-blue-600">
              Avg Rent: ₹5,500 – ₹8,000 / month (Food included)
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Sector 7 (Main Market & Girls PGs)</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                ~10 min walk (0.8 km)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A peaceful residential area with the famous Sector 7 market, gyms, stationery shops, and popular Girls Hostels with 24/7 security wardens and biometric entry.
            </p>
            <div className="text-xs font-semibold text-blue-600">
              Avg Rent: ₹6,500 – ₹9,500 / month
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Sector 8 & 9 (Independent Flats)</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                ~15 min walk / E-rickshaw
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Preferred by 3rd and 4th-year engineering students renting 2 BHK or 3 BHK flats in groups. More privacy, self-cooking arrangements, and zero curfew restrictions.
            </p>
            <div className="text-xs font-semibold text-blue-600">
              Avg Flat Rent: ₹12,000 – ₹18,000 / month (Split among 3-4 friends)
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Sector 11 & Escorts Mujesar Metro</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Violet Line Metro Hub
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Convenient access to Escorts Mujesar Metro Station (Delhi Metro Violet line). Ideal for students who commute to Delhi on weekends or want budget living near coaching institutes.
            </p>
            <div className="text-xs font-semibold text-blue-600">
              Avg Rent: ₹4,000 – ₹6,500 / month
            </div>
          </div>

        </div>
      </section>

      {/* Fresher Checklist */}
      <section className="bg-blue-50 border border-blue-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-blue-900 font-bold text-lg">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          <span>YMCA Fresher Accommodation Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Always check sub-meter electricity rates (standard is ₹8 to ₹10 per unit in Faridabad).</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Ensure the PG has dual inverter or generator power backup for Faridabad peak summer months.</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Clarify security deposit refund terms (usually 1-month notice before leaving).</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Verify water supply quality and whether an RO drinking water purifier is maintained.</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-2 transition-colors"
          >
            <span>Explore Verified Stays Near YMCA Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
