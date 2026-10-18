import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

export default function MapView({ coordinates, title, sector }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const stayLat = coordinates?.lat || 28.3688;
  const stayLng = coordinates?.lng || 77.3162;
  const ymcaLat = 28.3678;
  const ymcaLng = 77.3155;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up previous instance
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    // Initialize map
    const map = L.map(mapContainer.current, {
      center: [stayLat, stayLng],
      zoom: 15,
      scrollWheelZoom: false,
    });

    // Add high-resolution OpenStreetMap street tiles (100% free, reliable, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Custom Blue Pin for the Stay
    const stayIcon = L.divIcon({
      className: 'custom-stay-pin',
      html: `
        <div style="background-color: #2563eb; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(37,99,235,0.4); border: 2.5px solid white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    // Custom Amber Pin for YMCA Campus
    const ymcaIcon = L.divIcon({
      className: 'custom-ymca-pin',
      html: `
        <div style="background-color: #d97706; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(217,119,6,0.4); border: 2.5px solid white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    // Add Stay Marker + Popup
    const stayMarker = L.marker([stayLat, stayLng], { icon: stayIcon }).addTo(map);
    stayMarker.bindPopup(`
      <div style="padding: 4px; font-family: sans-serif;">
        <span style="font-size: 10px; font-weight: 800; color: #2563eb; text-transform: uppercase;">Student Stay</span>
        <h4 style="margin: 2px 0 0 0; font-size: 13px; font-weight: bold; color: #0f172a;">${title}</h4>
        <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">${sector}, Faridabad</p>
      </div>
    `).openPopup();

    // Add YMCA Campus Marker + Popup
    const ymcaMarker = L.marker([ymcaLat, ymcaLng], { icon: ymcaIcon }).addTo(map);
    ymcaMarker.bindPopup(`
      <div style="padding: 4px; font-family: sans-serif;">
        <span style="font-size: 10px; font-weight: 800; color: #d97706; text-transform: uppercase;">University Campus</span>
        <h4 style="margin: 2px 0 0 0; font-size: 13px; font-weight: bold; color: #b45309;">🎓 J.C. Bose UST (YMCA)</h4>
        <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">Main Gate • Mathura Road</p>
      </div>
    `);

    // Draw dashed walking line between the stay and YMCA campus
    const latlngs = [
      [stayLat, stayLng],
      [ymcaLat, ymcaLng],
    ];
    L.polyline(latlngs, {
      color: '#2563eb',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8,
    }).addTo(map);

    // Fit map bounds to show both locations perfectly
    const bounds = L.latLngBounds([stayLat, stayLng], [ymcaLat, ymcaLng]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [stayLat, stayLng, title, sector]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-600 gap-2">
        <span className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>Interactive Campus Route & Proximity Map</span>
        </span>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Blue Pin = Stay</span>
          </span>
          <span className="flex items-center space-x-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Amber Pin = YMCA Campus</span>
          </span>
        </div>
      </div>

      <div
        ref={mapContainer}
        className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0"
        style={{ minHeight: '320px' }}
      ></div>
    </div>
  );
}
