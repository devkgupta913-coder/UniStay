import React from 'react';
import { 
  Wifi, 
  Utensils, 
  Wind, 
  Zap, 
  Droplet, 
  Shirt, 
  BookOpen, 
  Bath, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Refrigerator, 
  Car, 
  CheckCircle2,
  Fan
} from 'lucide-react';

export default function AmenitiesGrid({ amenities = [] }) {
  const getAmenityDetails = (amenity) => {
    switch (amenity) {
      case 'WiFi':
        return { icon: Wifi, label: 'High-Speed Wi-Fi', desc: 'Fiber broadband for online classes & coding' };
      case 'Food Included':
        return { icon: Utensils, label: 'Mess / Meals Included', desc: 'Hygienic breakfast, lunch & dinner' };
      case 'AC':
        return { icon: Wind, label: 'Air Conditioning', desc: 'Split / window AC in room' };
      case 'Cooler':
        return { icon: Fan, label: 'Desert Air Cooler', desc: 'Cooler provided for summers' };
      case 'Power Backup':
        return { icon: Zap, label: '24x7 Power Backup', desc: 'Inverter / generator during outages' };
      case 'RO Water':
        return { icon: Droplet, label: 'RO Drinking Water', desc: 'Purified mineral drinking water' };
      case 'Washing Machine':
        return { icon: Shirt, label: 'Washing Machine', desc: 'Common laundry area available' };
      case 'Study Table':
        return { icon: BookOpen, label: 'Study Table & Chair', desc: 'Ergonomic desk for exam prep' };
      case 'Attached Washroom':
        return { icon: Bath, label: 'Attached Washroom', desc: 'Private bathroom inside the room' };
      case 'Geyser':
        return { icon: Flame, label: 'Geyser / Hot Water', desc: 'Instant hot water for winters' };
      case 'CCTV/Security':
        return { icon: ShieldCheck, label: 'CCTV & Security', desc: 'Round-the-clock monitoring & warden' };
      case 'Housekeeping':
        return { icon: Sparkles, label: 'Daily Housekeeping', desc: 'Regular room and washroom cleaning' };
      case 'Refrigerator':
        return { icon: Refrigerator, label: 'Refrigerator', desc: 'Fridge available for student use' };
      case 'Parking':
        return { icon: Car, label: 'Two-Wheeler Parking', desc: 'Safe bike / scooty parking inside' };
      default:
        return { icon: CheckCircle2, label: amenity, desc: 'Verified facility' };
    }
  };

  if (!amenities || amenities.length === 0) {
    return <p className="text-sm text-slate-500 italic">No amenities specified.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      {amenities.map((item) => {
        const { icon: Icon, label, desc } = getAmenityDetails(item);
        return (
          <div
            key={item}
            className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-300 transition-colors shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{label}</h4>
              <p className="text-xs text-slate-500 leading-snug">{desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
