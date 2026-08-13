"use client"
import React, { useState, useEffect, useMemo } from 'react';


// --- CDN Imports ---
// Chart.js will be loaded from the browser window object
let ChartJS = null;
if (typeof window !== 'undefined') {
  ChartJS = window.Chart;
  
  // Register Chart.js components
  if (ChartJS) {
    ChartJS.register(
      ChartJS.CategoryScale, 
      ChartJS.LinearScale, 
      ChartJS.BarElement, 
      ChartJS.Title, 
      ChartJS.Tooltip, 
      ChartJS.Legend, 
      ChartJS.ArcElement, 
      ChartJS.PointElement, 
      ChartJS.LineElement, 
      ChartJS.Filler
    );
  }
}
// --- End CDN Imports ---
// --- CHART COMPONENT ---
const ChartComponent = ({ type, data, options, height = 200 }) => {
  const chartRef = React.useRef(null);
  const chartInstance = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current && ChartJS) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = new ChartJS(chartRef.current, {
        type: type,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
               position: 'bottom',
               labels: { 
                   usePointStyle: true, 
                   boxWidth: 8,
                   font: { size: 10, weight: 'bold', family: "'Inter', sans-serif" },
                   color: '#64748b'
               }
            },
            title: { display: false }
          },
          scales: type !== 'doughnut' && type !== 'pie' ? {
              x: { grid: { display: false }, ticks: { font: { size: 10 } } },
              y: { grid: { borderDash: [4, 4] }, ticks: { font: { size: 10 } } }
          } : { x: { display: false }, y: { display: false } },
          ...options
        }
      });
    }
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [type, data, options]);

  return <div style={{ height: height, width: '100%' }}><canvas ref={chartRef} /></div>;
};

// --- ICON COMPONENT ---
function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    LayoutDashboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
    Store: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>,
    Check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>,
    ChevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
    ChevronLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16.5 9.4 7.5 4.6"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    Warehouse: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M15 22v-8"/><path d="M9 22v-8"/></svg>,
    PackageOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><path d="m14 6-3-1.7L8 6"/><path d="M12 12 3.3 7"/></svg>,
    Truck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 17h4V5H2v12h3"/><path d="M14 17h5v-3.11"/><path d="M20 17h1.72a2 2 0 0 0 1.94-2.51l-1.55-5.28A2 2 0 0 0 18.21 8H14v9Z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    User: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Bell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
    Search: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    Settings: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0 .73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l-.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    HelpCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
    LogOut: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>,
    Menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>,
    ShoppingCart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    PackageSearch: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2.24-1.28"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>,
    AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
    Archive: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/><path d="M22 4H2v4h20V4Z"/></svg>,
    BarChart2: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
    Boxes: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><path d="M12 12 3.3 7"/><path d="M20.7 7 12 12"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    ClipboardList: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
    ScanLine: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>,
    Fingerprint: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 12a2 2 0 0 1 2 2c0 1.02.1 2.51.26 4"/><path d="M14 10a2 2 0 0 0-2-2"/><path d="M12 14a2 2 0 0 1 2-2"/><path d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10c0 4.8-3.2 8.8-7.5 9.8"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .13-4.2-.23-6.15"/><path d="M16 4.13c1.8.63 3.3 1.9 4.3 3.6"/><path d="M4.1 16c-.2-2-.13-4.2.23-6.15"/><path d="M8 4.13c-1.8.63-3.3 1.9-4.3 3.6"/><path d="M7 18a2 2 0 0 0-2-2"/><path d="M17 18a2 2 0 0 1 2-2"/></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    HardDriveUpload: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 16v-7m3 3-3-3-3 3"/><rect width="20" height="8" x="2" y="4" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="m2 16 2.1 3.5c.2.4.6.5 1 .5h13.8c.4 0 .8-.2 1-.5L22 16"/></svg>,
    ArrowRightLeft: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>,
    FileText: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
    DollarSign: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    List: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
    CreditCard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    Globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
    TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    Activity: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    Eye: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    Edit3: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>,
    Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    Trash: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    Plus: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>,
    Tag: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>,
    MessageSquare: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    ShoppingBag: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    Basket: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="m9 11 1 9"/><path d="m4.5 11 .1 9"/><path d="m12 11 2 9"/><path d="m15.5 11-.1 9"/></svg>,
    Moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
    Expand: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="m9 9-6-6"/><path d="m9 15-6 6"/><path d="M21 16.2V21h-4.8"/><path d="M16.2 3H21v4.8"/><path d="M7.8 21H3v-4.8"/><path d="M3 7.8V3h4.8"/></svg>,
    Home: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    MapPin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    RefreshCcw: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
    Ban: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
    Clock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>,
    Copy: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
    Play: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    PauseCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/></svg>,
    CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    Filter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    Printer: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>,
  };
  return icons[name] || null;
}

// --- SHARED COMPONENTS ---
const SectionTitle = ({ title }) => <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">{title}</h3>;

// --- DUMMY DATASETS ---
const initialProducts = [
  { id: 1, name: 'Wireless Mouse M510', sku: 'LOGI-M510', barcode: '890101992', stock: 145, category: 'Electronics', vendor: 'Tech Supplies Co', uom: 'Pcs', status: 'Approved', price: 45, wholesalePrice: 40, visibility: true, unit: '1', conv: '1.00', dept: 'Electronics', group: 'Peripherals' },
  { id: 40, name: 'Gaming Chair Pro', sku: 'CHR-GAME-X', barcode: '890104099', stock: 0, category: 'Furniture', vendor: 'Elite Office Furniture', uom: 'Pcs', status: 'Rejected', price: 850, wholesalePrice: 700, visibility: false, rejectionReason: 'Price too high vs market', unit: '1', conv: '1.00', dept: 'Furniture', group: 'Seating' },
  { id: 41, name: 'Smart Watch Series 5', sku: 'WTC-SMR-5', barcode: '890104199', stock: 50, category: 'Electronics', vendor: 'Global Tech', uom: 'Pcs', status: 'Update Requested', price: 1200, wholesalePrice: 1100, visibility: true, updateDetails: 'Price Change: 1200 -> 1250', unit: '1', conv: '1.00', dept: 'Electronics', group: 'Wearables', shortDescription: 'Advanced smartwatch with health tracking and seamless connectivity.' },
  { id: 42, name: 'Wireless Earbuds Pro', sku: 'AUD-BUDS-P', barcode: '890104299', stock: 200, category: 'Electronics', vendor: 'SoundWave Inc', uom: 'Pcs', status: 'Pending', price: 350, wholesalePrice: 300, visibility: false, unit: '1', conv: '1.00', dept: 'Electronics', group: 'Accessories', shortDescription: 'Noise-cancelling wireless earbuds with premium sound quality.' },
];

// --- VENDOR REQUEST PAGE (DEDICATED VIEW WITH TWO-STEP APPROVAL & MANUAL PRODUCT ID MODAL) ---
function VendorRequestPage({ products, setProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedProductDetail, setSelectedProductDetail] = useState(null);
    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [manualProductId, setManualProductId] = useState(''); 
    
    const [activeTab, setActiveTab] = useState('New Requests');
    const [vendorFilter, setVendorFilter] = useState('All');
    const [dateFilterType, setDateFilterType] = useState('All');
    const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });

    const allVendorsList = useMemo(() => [...new Set(products.filter(p => p.vendor && p.vendor !== 'In-House').map(p => p.vendor))], [products]);

    const pendingProducts = products.filter(p => {
        if (!p.vendor || p.vendor === 'In-House') return false;
        if (activeTab === 'New Requests' && p.status !== 'Pending') return false;
        if (activeTab === 'Updated Request' && p.status !== 'Update Requested') return false;
        if (activeTab === 'Reviewed' && p.status !== '1st Level Approved') return false;
        if (vendorFilter !== 'All' && p.vendor !== vendorFilter) return false;
        
        // Mock Date filtering safely (applies if products had a strictly formatted date field)
        if (dateFilterType !== 'All' && p.date) {
             const pDate = new Date(p.date);
             const today = new Date();
             
             if (dateFilterType === 'Today') {
                 const start = new Date(today); start.setHours(0,0,0,0);
                 const end = new Date(today); end.setHours(23,59,59,999);
                 if (pDate < start || pDate > end) return false;
             } else if (dateFilterType === 'Yesterday') {
                 const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
                 const start = new Date(yesterday); start.setHours(0,0,0,0);
                 const end = new Date(yesterday); end.setHours(23,59,59,999);
                 if (pDate < start || pDate > end) return false;
             } else if (dateFilterType === 'Custom' && customDateRange.start && customDateRange.end) {
                 const start = new Date(customDateRange.start); start.setHours(0,0,0,0);
                 const end = new Date(customDateRange.end); end.setHours(23,59,59,999);
                 if (pDate < start || pDate > end) return false;
             }
        }
        return true;
    });

    const vendorCounts = useMemo(() => {
        const counts = {};
        pendingProducts.forEach(p => {
            if (!counts[p.vendor]) {
                counts[p.vendor] = [];
            }
            counts[p.vendor].push(p);
        });
        return counts;
    }, [pendingProducts]);

    const vendorList = Object.keys(vendorCounts).map(vendorName => ({
        vendorName,
        products: vendorCounts[vendorName]
    })).filter(v => v.vendorName.toLowerCase().includes(searchTerm.toLowerCase()));

    // 1st Level Confirm / Approval
    const handleFirstConfirm = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, status: '1st Level Approved' } : p));
        setSelectedProductDetail(prev => ({ ...prev, status: '1st Level Approved' }));
        alert('First confirmation successful. Product is ready for final approval.');
    };

    // Finalize Approval Submission
    const handleFinalizeSubmit = () => {
        if (!manualProductId.trim()) {
            alert('Please enter a Product ID manually.');
            return;
        }
        const id = selectedProductDetail.id;
        setProducts(products.map(p => p.id === id ? { ...p, status: 'Approved', productIdAssigned: manualProductId, updateDetails: null } : p));
        
        alert(`Product successfully finalized and approved with Product ID: ${manualProductId}`);
        setShowFinalizeModal(false);
        setSelectedProductDetail(null);
        setManualProductId('');
    };

    const handleReject = (id) => {
        const reason = prompt("Enter rejection reason for vendor request:");
        if (reason) {
            setProducts(products.map(p => p.id === id ? { ...p, status: 'Rejected', rejectionReason: reason } : p));
            setSelectedProductDetail(null);
        }
    };

    // If viewing a specific product's details with modern e-commerce detail layout
    if (selectedProductDetail) {
        return (
            <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedProductDetail(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <Icon name="ChevronLeft" className="w-4 h-4" /> Back to Vendor Products
                    </button>
                    <div className="flex items-center gap-3 flex-wrap">
                        {selectedProductDetail.status === 'Pending' && (
                            <button 
                                onClick={() => handleFirstConfirm(selectedProductDetail.id)} 
                                className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
                            >
                                <Icon name="Check" className="w-4 h-4"/> First Confirm
                            </button>
                        )}
                        <button 
                            onClick={() => setShowFinalizeModal(true)} 
                            className="px-5 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 flex items-center gap-2"
                        >
                            <Icon name="Check" className="w-4 h-4"/> Finalize Approve
                        </button>
                        <button 
                            onClick={() => handleReject(selectedProductDetail.id)} 
                            className="px-5 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2"
                        >
                            <Icon name="X" className="w-4 h-4"/> Reject
                        </button>
                    </div>
                </div>

                {/* E-Commerce Product Detail Container */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-10">
                    
                    {/* Top Row: Gallery & Buy Box Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left: Multiple Images Gallery Only */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Product Images Gallery</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3].map((imgIdx) => (
                                        <div key={imgIdx} className="aspect-square bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 p-2 text-center shadow-sm hover:border-blue-300 transition-all cursor-pointer">
                                            <Icon name="Boxes" className="w-6 h-6 mb-1 text-slate-300"/>
                                            <span className="text-[9px] font-bold text-slate-500">Variant {imgIdx}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Product Identification & Specifications */}
                        <div className="space-y-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedProductDetail.status}</span>
                                    <span className="text-xs font-bold text-slate-400">• Vendor: {selectedProductDetail.vendor}</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-800">{selectedProductDetail.name}</h2>
                                {selectedProductDetail.shortDescription && (
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{selectedProductDetail.shortDescription}</p>
                                )}
                                <p className="text-2xl font-black text-blue-600 mt-3">AED {selectedProductDetail.price} <span className="text-xs text-slate-400 font-bold">/ unit</span></p>
                            </div>

                            {/* Schema Grid: PRODUCT_CODE, SKU, UNIT, UOM, CONV, DEPT, GROUP, CATEGORY */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-inner">
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Product Specifications</h4>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">PRODUCT_CODE</span>
                                        <span className="font-mono font-bold text-blue-600">PC-{selectedProductDetail.id}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">SKU</span>
                                        <span className="font-mono font-bold text-slate-800">{selectedProductDetail.sku}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">UNIT</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.unit || '1'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">UOM</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.uom || 'Pcs'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">CONV</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.conv || '1.00'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">DEPT</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.dept || 'General'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">GROUP</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.group || 'General'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">CATEGORY</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL FOR MANUAL PRODUCT ID ON FINAL APPROVAL */}
                {showFinalizeModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
                            <h3 className="text-xl font-black text-slate-800">Finalize Approval</h3>
                            <p className="text-sm text-slate-500">Please enter the Product ID manually to complete approval:</p>
                            <input 
                                type="text" 
                                placeholder="Enter Product ID" 
                                value={manualProductId}
                                onChange={(e) => setManualProductId(e.target.value)}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                            <div className="flex gap-2 pt-2">
                                <button 
                                    onClick={() => setShowFinalizeModal(false)}
                                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleFinalizeSubmit}
                                    className="flex-1 py-3 bg-green-600 text-white font-bold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // If viewing products for a specific vendor with updated table showing Product Name, SKU, Barcode
    if (selectedVendor) {
        return (
            <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedVendor(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <Icon name="ChevronLeft" className="w-4 h-4" /> Back to Vendors List
                    </button>
                    <h2 className="text-xl font-black text-slate-800">Vendor: {selectedVendor.vendorName}</h2>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Product Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">SKU</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Barcode</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 bg-white">
                                {selectedVendor.products.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{p.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-blue-600">{p.sku}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-500">{p.barcode || '890101992'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider bg-orange-100 text-orange-700">
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => setSelectedProductDetail(p)}
                                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                    title="View Product"
                                                >
                                                    <Icon name="Eye" className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setProducts(products.map(item => item.id === p.id ? { ...item, status: '1st Level Approved' } : item));
                                                        alert('First confirmation successful.');
                                                    }}
                                                    className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                                                    title="Confirm Product"
                                                >
                                                    <Icon name="Check" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vendor Requests</h2>
                    <p className="text-slate-500 mt-1">Select a vendor to review their submitted catalog products.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
                {['New Requests', 'Updated Request', 'Reviewed'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-slate-100 text-slate-800 border-b-2 border-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                    <input 
                        type="text" 
                        placeholder="Search Vendor Name..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" 
                    />
                </div>
                
                <select 
                    value={vendorFilter} 
                    onChange={e => setVendorFilter(e.target.value)} 
                    className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                    <option value="All">All Vendors</option>
                    {allVendorsList.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                    <select 
                        value={dateFilterType} 
                        onChange={e => setDateFilterType(e.target.value)} 
                        className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                        <option value="All">All Dates</option>
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="Custom">Custom Range</option>
                    </select>
                    {dateFilterType === 'Custom' && (
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <input type="date" value={customDateRange.start} onChange={e => setCustomDateRange({...customDateRange, start: e.target.value})} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
                            <span className="text-slate-400">-</span>
                            <input type="date" value={customDateRange.end} onChange={e => setCustomDateRange({...customDateRange, end: e.target.value})} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    )}
                </div>
            </div>

            {/* Vendors List Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor Name</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Total Product Count</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {vendorList.map((v, idx) => (
                                <tr key={idx} className="hover:bg-indigo-50/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 shadow-sm group-hover:scale-105 transition-transform">
                                            {v.vendorName.charAt(0)}
                                        </div>
                                        {v.vendorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                                            {v.products.length} Products
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button onClick={() => setSelectedVendor(v)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm flex items-center justify-end gap-2 ml-auto group-hover:border-indigo-300">
                                            <Icon name="Eye" className="w-4 h-4"/> View Products
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {vendorList.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-slate-400 italic">No vendor requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- LIST OF VENDOR PRODUCT PAGE ---
function ListOfVendorProductPage({ products, setProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [vendorFilter, setVendorFilter] = useState('All');
    const [deptFilter, setDeptFilter] = useState('All');
    const [groupFilter, setGroupFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [selectedProductDetail, setSelectedProductDetail] = useState(null);

    // Only show products that have been finalized/approved
    const vendorProducts = products.filter(p => p.vendor && p.vendor !== 'In-House' && p.status === 'Approved');
    const allVendorsList = useMemo(() => [...new Set(vendorProducts.map(p => p.vendor))], [vendorProducts]);
    const allDeptsList = useMemo(() => [...new Set(vendorProducts.map(p => p.dept || 'General'))], [vendorProducts]);
    const allGroupsList = useMemo(() => [...new Set(vendorProducts.map(p => p.group || 'General'))], [vendorProducts]);
    const allCategoriesList = useMemo(() => [...new Set(vendorProducts.map(p => p.category))], [vendorProducts]);

    const filteredProducts = vendorProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesVendor = vendorFilter === 'All' || p.vendor === vendorFilter;
        const matchesDept = deptFilter === 'All' || (p.dept || 'General') === deptFilter;
        const matchesGroup = groupFilter === 'All' || (p.group || 'General') === groupFilter;
        const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
        
        return matchesSearch && matchesVendor && matchesDept && matchesGroup && matchesCategory;
    });

    // Calculate Summary Stats
    const stats = useMemo(() => {
        const totalProducts = vendorProducts.length;
        const totalVendors = allVendorsList.length;
        const uniqueCategories = new Set(vendorProducts.map(p => p.category)).size;
        const totalValue = vendorProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
        const avgPrice = totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : '0.00';
        
        return { totalProducts, totalVendors, uniqueCategories, avgPrice };
    }, [vendorProducts, allVendorsList]);

    // 1st Level Confirm / Approval helper for List view
    const handleListConfirm = (id, e) => {
        e.stopPropagation();
        setProducts(products.map(p => p.id === id ? { ...p, status: '1st Level Approved' } : p));
        alert('First confirmation successful.');
    };

    // If viewing e-commerce style detail view for a specific product
    if (selectedProductDetail) {
        return (
            <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedProductDetail(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <Icon name="ChevronLeft" className="w-4 h-4" /> Back to Vendor Product List
                    </button>
                </div>

                {/* E-Commerce Product Detail Container */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left: Gallery */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Multiple Images</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3].map((imgIdx) => (
                                        <div key={imgIdx} className="aspect-square bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 p-2 text-center shadow-sm">
                                            <Icon name="Boxes" className="w-6 h-6 mb-1 text-slate-300"/>
                                            <span className="text-[9px] font-bold text-slate-500">Variant {imgIdx}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Info & Specs */}
                        <div className="space-y-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                        selectedProductDetail.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>{selectedProductDetail.status}</span>
                                    <span className="text-xs font-bold text-slate-400">• Vendor: {selectedProductDetail.vendor}</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-800">{selectedProductDetail.name}</h2>
                                {selectedProductDetail.shortDescription && (
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{selectedProductDetail.shortDescription}</p>
                                )}
                                <p className="text-2xl font-black text-blue-600 mt-3">AED {selectedProductDetail.price} <span className="text-xs text-slate-400 font-bold">/ unit</span></p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-inner">
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Product Specifications</h4>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">PRODUCT_CODE</span>
                                        <span className="font-mono font-bold text-blue-600">{selectedProductDetail.productIdAssigned ? `PROD-${selectedProductDetail.productIdAssigned}` : `PC-${selectedProductDetail.id}`}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">SKU</span>
                                        <span className="font-mono font-bold text-slate-800">{selectedProductDetail.sku}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">UNIT</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.unit || '1'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">UOM</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.uom || 'Pcs'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">CONV</span>
                                        <span className="font-bold text-slate-800">{selectedProductDetail.conv || '1.00'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">DEPT</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.dept || 'General'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">GROUP</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.group || 'General'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block font-bold mb-0.5">CATEGORY</span>
                                        <span className="font-bold text-slate-700">{selectedProductDetail.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">List of Vendor Product</h2>
                    <p className="text-slate-500 mt-1">Complete catalog of all vendor-supplied products and their current statuses.</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Total Products</p>
                        <h3 className="text-3xl font-black mt-2">{stats.totalProducts}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl shadow-lg shadow-emerald-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Active Vendors</p>
                        <h3 className="text-3xl font-black mt-2">{stats.totalVendors}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-purple-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Categories</p>
                        <h3 className="text-3xl font-black mt-2">{stats.uniqueCategories}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg shadow-orange-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Avg Unit Price</p>
                        <h3 className="text-3xl font-black mt-2">AED {stats.avgPrice}</h3>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px] relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                    <input 
                        type="text" 
                        placeholder="Search by Product Name, SKU or Vendor..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <select 
                    value={vendorFilter} 
                    onChange={e => setVendorFilter(e.target.value)} 
                    className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="All">All Vendors</option>
                    {allVendorsList.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <select 
                    value={deptFilter} 
                    onChange={e => setDeptFilter(e.target.value)} 
                    className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="All">All Depts</option>
                    {allDeptsList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select 
                    value={groupFilter} 
                    onChange={e => setGroupFilter(e.target.value)} 
                    className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="All">All Groups</option>
                    {allGroupsList.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select 
                    value={categoryFilter} 
                    onChange={e => setCategoryFilter(e.target.value)} 
                    className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value="All">All Categories</option>
                    {allCategoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Products Table with View and Confirm Icon Actions */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Primary Image</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Product Code</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">SKU</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Product Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Unit</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">UOM</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Conv</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Dept</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Group</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                            {filteredProducts.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                            <Icon name="Boxes" className="w-5 h-5"/>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-blue-600">{p.productIdAssigned ? `PROD-${p.productIdAssigned}` : `PC-${p.id}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{p.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.unit || '1'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.uom || 'Pcs'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.conv || '1.00'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.dept || 'General'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.group || 'General'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => setSelectedProductDetail(p)}
                                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                title="View Product"
                                            >
                                                <Icon name="Eye" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="11" className="p-12 text-center text-slate-400 italic">No vendor products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- SERVICES LISTING PAGE ---
function ServicesListingPage() {
    const initialServicesData = [
        { id: 1, name: 'Office Equipment Installation', provider: 'Clean & Clear Services', category: 'Installation', rate: 'AED 350.00 / visit', status: 'Active', shopStatus: 'Not in Shop', listingStatus: 'New Listing', description: 'Professional installation of office desks, chairs, and electronic equipment. Includes assembly and cable management.' },
        { id: 2, name: 'HVAC Maintenance Support', provider: 'Rapid Logistics Solutions', category: 'Maintenance', rate: 'AED 500.00 / month', status: 'Active', shopStatus: 'Live', listingStatus: 'Reviewed', description: 'Monthly maintenance and support for commercial HVAC systems. Includes filter replacement and performance checks.' },
        { id: 3, name: 'IT Network Setup', provider: 'Global Tech', category: 'IT Support', rate: 'AED 1500.00 / project', status: 'Active', shopStatus: 'Not in Shop', listingStatus: 'Reviewed', description: 'Complete IT network setup and infrastructure installation for new offices.' }
    ];

    const [services, setServices] = useState(initialServicesData);
    const [selectedService, setSelectedService] = useState(null);

    // NEW STATE FOR FILTERS & TABS
    const [activeTab, setActiveTab] = useState('New Listing');
    const [vendorFilter, setVendorFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const allVendors = useMemo(() => ['All', ...new Set(services.map(s => s.provider))], [services]);
    const allCategories = useMemo(() => ['All', ...new Set(services.map(s => s.category))], [services]);

    const filteredServices = services.filter(s => {
        const matchVendor = vendorFilter === 'All' || s.provider === vendorFilter;
        const matchCategory = categoryFilter === 'All' || s.category === categoryFilter;
        const matchStatus = statusFilter === 'All' || s.status === statusFilter;
        
        let matchTab = false;
        if (activeTab === 'New Listing') matchTab = s.listingStatus === 'New Listing' && s.shopStatus !== 'Live';
        else if (activeTab === 'Reviewed') matchTab = s.listingStatus === 'Reviewed' && s.shopStatus !== 'Live';
        else if (activeTab === 'InShop Services') matchTab = s.shopStatus === 'Live';

        return matchVendor && matchCategory && matchStatus && matchTab;
    });

    // Calculate Summary Stats
    const stats = useMemo(() => {
        return {
            total: services.length,
            active: services.filter(s => s.status === 'Active').length,
            inShop: services.filter(s => s.shopStatus === 'Live').length,
            providers: new Set(services.map(s => s.provider)).size
        };
    }, [services]);

    const handleAddToShop = (id) => {
        setServices(services.map(s => s.id === id ? { ...s, shopStatus: 'Live', listingStatus: 'Reviewed' } : s));
        alert('Service added to shop successfully!');
    };

    const handleToggleStatus = (id) => {
        setServices(services.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    };

    const handleConfirmListing = (id) => {
        setServices(services.map(s => s.id === id ? { ...s, listingStatus: 'Reviewed' } : s));
    };

    const handleCancelListing = (id) => {
        setServices(services.map(s => s.id === id ? { ...s, listingStatus: 'Canceled' } : s));
    };

    if (selectedService) {
        return (
            <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                    <button onClick={() => setSelectedService(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <Icon name="ChevronLeft" className="w-4 h-4" /> Back to Services List
                    </button>
                    {selectedService.shopStatus !== 'Live' && (
                        <button 
                            onClick={() => { handleAddToShop(selectedService.id); setSelectedService({...selectedService, shopStatus: 'Live'}); }} 
                            className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-md flex items-center gap-2"
                        >
                            <Icon name="Store" className="w-4 h-4"/> Add to Shop
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-black text-slate-800">{selectedService.name}</h2>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedService.status}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                            <Icon name="User" className="w-4 h-4 text-blue-500"/> Provider: {selectedService.provider}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Category</span>
                            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-sm">{selectedService.category}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Standard Rate</span>
                            <p className="text-lg font-black text-slate-800">{selectedService.rate}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Shop Visibility</span>
                            <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider border ${
                                selectedService.shopStatus === 'Live' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-200 text-slate-500 border-slate-300'
                            }`}>
                                {selectedService.shopStatus}
                            </span>
                        </div>
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Service Description</span>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">{selectedService.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Services Listing</h2>
                    <p className="text-slate-500 mt-1">Manage vendor-offered professional and technical services.</p>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-black shadow-lg shadow-slate-200">
                    <Icon name="Plus" className="w-4 h-4"/> Add Service
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Total Services</p>
                        <h3 className="text-3xl font-black mt-2">{stats.total}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl shadow-lg shadow-emerald-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Active Services</p>
                        <h3 className="text-3xl font-black mt-2">{stats.active}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-purple-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">In-Shop Services</p>
                        <h3 className="text-3xl font-black mt-2">{stats.inShop}</h3>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg shadow-orange-100 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-80">Total Providers</p>
                        <h3 className="text-3xl font-black mt-2">{stats.providers}</h3>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
                {['New Listing', 'Reviewed', 'InShop Services'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-slate-100 text-slate-800 border-b-2 border-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
                <select value={vendorFilter} onChange={e => setVendorFilter(e.target.value)} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allVendors.map(v => <option key={v} value={v}>{v === 'All' ? 'All Vendors' : v}</option>)}
                </select>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Service Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Provider / Vendor</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Standard Rate</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Shop Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                            {filteredServices.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{s.name}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{s.provider}</td>
                                    <td className="px-6 py-4 text-xs text-slate-600">{s.category}</td>
                                    <td className="px-6 py-4 text-right text-xs font-black text-slate-800">{s.rate}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider border ${
                                            s.shopStatus === 'Live' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {s.shopStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setSelectedService(s)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="View Details">
                                                <Icon name="Eye" className="w-4 h-4"/>
                                            </button>
                                            {s.listingStatus === 'New Listing' && (
                                                <>
                                                    <button onClick={() => handleConfirmListing(s.id)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors" title="Confirm">
                                                        <Icon name="CheckCircle" className="w-4 h-4"/>
                                                    </button>
                                                    <button onClick={() => handleCancelListing(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Cancel">
                                                        <Icon name="X" className="w-4 h-4"/>
                                                    </button>
                                                </>
                                            )}
                                            {s.shopStatus !== 'Live' && (
                                                <button onClick={() => handleAddToShop(s.id)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors" title="Add to Shop">
                                                    <Icon name="Store" className="w-4 h-4"/>
                                                </button>
                                            )}
                                            <button onClick={() => handleToggleStatus(s.id)} className={`p-2 rounded-xl transition-colors ${s.status === 'Active' ? 'text-red-400 hover:text-red-600 hover:bg-red-50' : 'text-green-400 hover:text-green-600 hover:bg-green-50'}`} title={s.status === 'Active' ? 'Deactivate' : 'Activate'}>
                                                <Icon name={s.status === 'Active' ? 'Ban' : 'Check'} className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredServices.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center text-slate-400 italic">No services found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- LOW STOCK LIST PAGE ---
function LowStockListPage({ products }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ dept: 'All', group: 'All', category: 'All', vendor: 'All' });

    const lowStockProducts = products.filter(p => p.stock < 50); // Assuming < 50 is low stock

    const allDepts = useMemo(() => ['All', ...new Set(lowStockProducts.map(p => p.dept || 'General'))], [lowStockProducts]);
    const allGroups = useMemo(() => ['All', ...new Set(lowStockProducts.map(p => p.group || 'General'))], [lowStockProducts]);
    const allCategories = useMemo(() => ['All', ...new Set(lowStockProducts.map(p => p.category))], [lowStockProducts]);
    const allVendors = useMemo(() => ['All', ...new Set(lowStockProducts.map(p => p.vendor))], [lowStockProducts]);

    const filteredProducts = lowStockProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (p.vendor && p.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesSearch &&
               (filters.dept === 'All' || (p.dept || 'General') === filters.dept) &&
               (filters.group === 'All' || (p.group || 'General') === filters.group) &&
               (filters.category === 'All' || p.category === filters.category) &&
               (filters.vendor === 'All' || p.vendor === filters.vendor);
    });

    return (
        <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Low Stock List</h2>
                    <p className="text-slate-500 mt-1">Monitor products that are running low on inventory.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px] relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                    <input 
                        type="text" 
                        placeholder="Search by Product Name, SKU or Vendor..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <select value={filters.dept} onChange={e => setFilters({...filters, dept: e.target.value})} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allDepts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Depts' : d}</option>)}
                </select>
                <select value={filters.group} onChange={e => setFilters({...filters, group: e.target.value})} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allGroups.map(g => <option key={g} value={g}>{g === 'All' ? 'All Groups' : g}</option>)}
                </select>
                <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                </select>
                <select value={filters.vendor} onChange={e => setFilters({...filters, vendor: e.target.value})} className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {allVendors.map(v => <option key={v} value={v}>{v === 'All' ? 'All Vendors' : v}</option>)}
                </select>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Primary Image</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Product Code</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">SKU</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Unit</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">UOM</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Conv</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Dept</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Group</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Vendor</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Current Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                            {filteredProducts.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                            <Icon name="Boxes" className="w-5 h-5"/>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-blue-600">PC-{p.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{p.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.unit || '1'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.uom || 'Pcs'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.conv || '1.00'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.dept || 'General'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.group || 'General'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-600">{p.vendor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {p.stock}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="12" className="p-12 text-center text-slate-400 italic">No low stock products found matching filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- PURCHASE ORDER LIST PAGE ---
function PurchaseOrderListPage() {
    // Dummy data modeled after "LPO Vendor Copy (2).pdf"
    const initialPOs = [
        {
            id: 'ARE-PO-2512-0785',
            date: '2025-12-10',
            supplier: 'SHABEEB GENERAL TRADING L.L.C',
            contactPerson: 'Thufail',
            paymentTerms: 'Credit',
            status: 'Approved',
            totalQty: 395,
            totalAmount: 18082.00,
            vatAmount: 904.10,
            netAmount: 18986.10,
            grnAmount: 15200.00,
            receivedStatus: 'Partially Received',
            items: [
                { si: 1, code: '10392', barcode: '6291016011416', product: 'LACNOR UHT MILK 1 LTR', unit: 'PCS-12', qty: 212, givenQty: 200, price: 33.50, amount: 7102.00, vat: 5.00, vatAmount: 355.10, net: 7457.10 },
                { si: 2, code: '10407', barcode: '8700216001380', product: 'ARIEL POWER GEL ORIGINAL 1.8 LTR', unit: 'PCS-4', qty: 183, givenQty: 150, price: 60.00, amount: 10980.00, vat: 5.00, vatAmount: 549.00, net: 11529.00 }
            ]
        },
        {
            id: 'ARE-PO-2512-0786',
            date: '2025-12-11',
            supplier: 'TECH SUPPLIES CO',
            contactPerson: 'Ali',
            paymentTerms: 'Cash',
            status: 'Pending',
            totalQty: 50,
            totalAmount: 4500.00,
            vatAmount: 225.00,
            netAmount: 4725.00,
            grnAmount: 0.00,
            receivedStatus: 'Not Received',
            items: [
                { si: 1, code: '20199', barcode: '890101992', product: 'Wireless Mouse M510', unit: 'PCS-1', qty: 50, givenQty: 0, price: 90.00, amount: 4500.00, vat: 5.00, vatAmount: 225.00, net: 4725.00 }
            ]
        },
        {
            id: 'ARE-PO-2512-0787',
            date: '2025-12-12',
            supplier: 'GLOBAL TECH L.L.C',
            contactPerson: 'Sarah',
            paymentTerms: 'Credit',
            status: 'Received',
            totalQty: 120,
            totalAmount: 12500.00,
            vatAmount: 625.00,
            netAmount: 13125.00,
            grnAmount: 13125.00,
            receivedStatus: 'Fully Received',
            items: [
                { si: 1, code: '30122', barcode: '890104199', product: 'Smart Watch Series 5', unit: 'PCS-1', qty: 120, givenQty: 120, price: 104.17, amount: 12500.00, vat: 5.00, vatAmount: 625.00, net: 13125.00 }
            ]
        }
    ];

    const [pos, setPos] = useState(initialPOs);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedPO, setSelectedPO] = useState(null);
    
    // NEW STATES FOR CREATE PO
    const [isCreatingPO, setIsCreatingPO] = useState(false);
    const [vendorSearch, setVendorSearch] = useState('');
    const [showVendorDropdown, setShowVendorDropdown] = useState(false);
    const [newPOData, setNewPOData] = useState({
        supplier: '',
        date: new Date().toISOString().split('T')[0],
        paymentTerms: 'Credit',
        shippingAddress: 'Warehouse S3, Al Qusais, Dubai',
        billingAddress: 'Same as Shipping',
        items: []
    });

    // NEW STATES FOR RECEIVE MODAL
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    const [receivingPO, setReceivingPO] = useState(null);
    const [scannedQty, setScannedQty] = useState({});
    const [barcodeInput, setBarcodeInput] = useState('');

    // DUMMY DATA FOR CREATE PO
    const dummyVendorsList = [
        'SHABEEB GENERAL TRADING L.L.C',
        'TECH SUPPLIES CO',
        'GLOBAL TECH L.L.C',
        'SUN FLOWER INTERNATIONAL GOODS WHOLESALERS L.L.C',
        'ELITE OFFICE FURNITURE'
    ];
    
    const dummyAddresses = [
        'Warehouse S3, Al Qusais, Dubai',
        'Warehouse S1, Al Quoz, Dubai',
        'Main Office, Al Qusais, Dubai',
        'Same as Shipping'
    ];

    const dummyProductsList = [
        { id: '10392', name: 'LACNOR UHT MILK 1 LTR', price: 33.50, unit: 'PCS-12', barcode: '6291016011416', vendor: 'SHABEEB GENERAL TRADING L.L.C' },
        { id: '10407', name: 'ARIEL POWER GEL ORIGINAL 1.8 LTR', price: 60.00, unit: 'PCS-4', barcode: '8700216001380', vendor: 'SHABEEB GENERAL TRADING L.L.C' },
        { id: '11565', name: 'LOTUS JASMINE RICE 5KG', price: 165.00, unit: 'PCS-8', barcode: '0000000005128', vendor: 'SUN FLOWER INTERNATIONAL GOODS WHOLESALERS L.L.C' },
        { id: '20199', name: 'Wireless Mouse M510', price: 90.00, unit: 'PCS-1', barcode: '890101992', vendor: 'TECH SUPPLIES CO' },
        { id: '30122', name: 'Smart Watch Series 5', price: 104.17, unit: 'PCS-1', barcode: '890104199', vendor: 'GLOBAL TECH L.L.C' }
    ];

    const filteredPOs = pos.filter(po => {
        const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              po.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeTab === 'All' || po.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    // Calculate Summary Stats
    const stats = useMemo(() => {
        return {
            total: pos.length,
            approved: pos.filter(p => p.status === 'Approved').length,
            pending: pos.filter(p => p.status === 'Pending').length,
            received: pos.filter(p => p.status === 'Received').length,
            totalValue: pos.reduce((sum, p) => sum + p.netAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    }, [pos]);

    const handleOpenReceive = (po) => {
        setReceivingPO(po);
        const initialMap = {};
        po.items.forEach(i => {
            initialMap[i.si] = i.givenQty || 0;
        });
        setScannedQty(initialMap);
        setBarcodeInput('');
        setShowReceiveModal(true);
    };

    const handleBarcodeScan = (e) => {
        e.preventDefault();
        if (!barcodeInput.trim()) return;
        
        const item = receivingPO.items.find(i => i.barcode === barcodeInput.trim() || i.code === barcodeInput.trim());
        if (item) {
            setScannedQty(prev => {
                const currentQty = prev[item.si] || 0;
                if (currentQty < item.qty) {
                    return { ...prev, [item.si]: currentQty + 1 };
                } else {
                    alert('Maximum quantity reached for this item.');
                    return prev;
                }
            });
        } else {
            alert('Barcode not found in this Purchase Order.');
        }
        setBarcodeInput('');
    };

    const handleConvertToGRN = () => {
        const hasScannedItems = Object.values(scannedQty).some(q => q > 0);
        if (!hasScannedItems) {
            alert('Please scan or enter quantities before converting to GRN.');
            return;
        }

        // Update items with givenQty and calculate new GRN amount
        const updatedItems = receivingPO.items.map(item => ({
            ...item,
            givenQty: scannedQty[item.si] || 0
        }));

        let newGrnAmount = 0;
        updatedItems.forEach(item => {
            const unitNet = item.net / item.qty;
            newGrnAmount += unitNet * item.givenQty;
        });

        const totalOrderQty = updatedItems.reduce((sum, i) => sum + i.qty, 0);
        const totalGivenQty = updatedItems.reduce((sum, i) => sum + i.givenQty, 0);
        
        let newStatus = 'Partially Received';
        if (totalGivenQty === 0) newStatus = 'Not Received';
        else if (totalGivenQty >= totalOrderQty) newStatus = 'Fully Received';

        const updatedPO = {
            ...receivingPO,
            status: 'Received',
            receivedStatus: newStatus,
            grnAmount: newGrnAmount,
            items: updatedItems
        };

        setPos(pos.map(p => p.id === receivingPO.id ? updatedPO : p));
        setSelectedPO(updatedPO);

        alert(`GRN Created successfully for PO ${receivingPO.id}!`);
        setShowReceiveModal(false);
        setReceivingPO(null);
    };

    // --- CREATE PO HANDLERS ---
    const handleAddPORow = () => {
        setNewPOData(prev => ({
            ...prev,
            items: [...prev.items, { si: Date.now(), productId: '', qty: 1, price: '', amount: 0 }]
        }));
    };

    const handlePORowChange = (index, field, value) => {
        const updatedItems = [...newPOData.items];
        const currentItem = { ...updatedItems[index] };
        
        if (field === 'productId') {
            const product = dummyProductsList.find(p => p.id === value);
            currentItem.productId = value;
            if (product) {
                // Auto-fill Unit Price and other product details
                currentItem.price = product.price;
                currentItem.code = product.id;
                currentItem.product = product.name;
                currentItem.unit = product.unit;
                currentItem.barcode = product.barcode;
            } else {
                currentItem.price = '';
                currentItem.code = '';
                currentItem.product = '';
                currentItem.unit = '';
                currentItem.barcode = '';
            }
        } else {
            currentItem[field] = value;
        }
        
        // Auto-calculate line amount instantly
        const qty = parseFloat(currentItem.qty) || 0;
        const price = parseFloat(currentItem.price) || 0;
        currentItem.amount = qty * price;
        currentItem.vatAmount = currentItem.amount * 0.05;
        currentItem.net = currentItem.amount + currentItem.vatAmount;

        updatedItems[index] = currentItem;
        setNewPOData({ ...newPOData, items: updatedItems });
    };

    const handleRemovePORow = (index) => {
        const updatedItems = newPOData.items.filter((_, i) => i !== index);
        setNewPOData({ ...newPOData, items: updatedItems });
    };

    const handleSubmitPO = () => {
        if (!newPOData.supplier) { alert('Please select a supplier.'); return; }
        if (newPOData.items.length === 0) { alert('Please add at least one product.'); return; }
        
        const hasEmptyProducts = newPOData.items.some(i => !i.productId || i.qty <= 0);
        if (hasEmptyProducts) { alert('Please fill in all product details and ensure quantities are greater than 0.'); return; }

        const totalQty = newPOData.items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0);
        const totalAmount = newPOData.items.reduce((sum, item) => sum + item.amount, 0);
        const vatAmount = totalAmount * 0.05;
        const netAmount = totalAmount + vatAmount;

        const generatedPO = {
            id: `ARE-PO-2512-0${Math.floor(1000 + Math.random() * 9000)}`,
            date: newPOData.date,
            supplier: newPOData.supplier,
            contactPerson: 'N/A',
            paymentTerms: newPOData.paymentTerms,
            shippingAddress: newPOData.shippingAddress,
            billingAddress: newPOData.billingAddress,
            status: 'Pending',
            totalQty: totalQty,
            totalAmount: totalAmount,
            vatAmount: vatAmount,
            netAmount: netAmount,
            grnAmount: 0,
            receivedStatus: 'Not Received',
            items: newPOData.items.map((i, idx) => ({
                si: idx + 1,
                code: i.code,
                barcode: i.barcode,
                product: i.product,
                unit: i.unit,
                qty: parseFloat(i.qty),
                givenQty: 0,
                price: i.price,
                amount: i.amount,
                vat: 5.00,
                vatAmount: i.vatAmount,
                net: i.net
            }))
        };

        setPos([generatedPO, ...pos]);
        alert(`Purchase Order ${generatedPO.id} created successfully!`);
        setIsCreatingPO(false);
        setNewPOData({ supplier: '', date: new Date().toISOString().split('T')[0], paymentTerms: 'Credit', shippingAddress: 'Warehouse S3, Al Qusais, Dubai', billingAddress: 'Same as Shipping', items: [] });
        setVendorSearch('');
    };

    // Create PO View
    if (isCreatingPO) {
        const calcTotalAmount = newPOData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
        const calcVat = calcTotalAmount * 0.05;
        const calcNet = calcTotalAmount + calcVat;

        return (
            <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 bg-slate-50 min-h-full">
                {/* Header Action Bar */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsCreatingPO(false)} className="flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <Icon name="ChevronLeft" className="w-5 h-5" />
                        </button>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Create Purchase Order</h2>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Drafting new order</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsCreatingPO(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleSubmitPO} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 flex items-center gap-2 transition-colors">
                            <Icon name="Check" className="w-4 h-4"/> Submit Order
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto space-y-6">
                    {/* General Information Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                            <Icon name="FileText" className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Document References</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="relative col-span-1 md:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Supplier *</label>
                                <input 
                                    type="text" 
                                    value={vendorSearch}
                                    onChange={(e) => {
                                        setVendorSearch(e.target.value);
                                        setNewPOData({...newPOData, supplier: e.target.value});
                                        setShowVendorDropdown(true);
                                    }}
                                    onFocus={() => setShowVendorDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowVendorDropdown(false), 200)}
                                    placeholder="Search and select vendor..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                {showVendorDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                        {dummyVendorsList.filter(v => v.toLowerCase().includes(vendorSearch.toLowerCase())).length > 0 ? (
                                            dummyVendorsList.filter(v => v.toLowerCase().includes(vendorSearch.toLowerCase())).map((v, i) => (
                                                <div 
                                                    key={i} 
                                                    className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer border-b border-slate-50 last:border-0"
                                                    onClick={() => {
                                                        setVendorSearch(v);
                                                        setNewPOData({...newPOData, supplier: v});
                                                        setShowVendorDropdown(false);
                                                    }}
                                                >
                                                    {v}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-slate-400 italic">No vendors found. Type to add custom.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Transaction Date *</label>
                                <input 
                                    type="date"
                                    value={newPOData.date}
                                    onChange={(e) => setNewPOData({...newPOData, date: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-6 border-t border-slate-100">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address *</label>
                                <select 
                                    value={newPOData.shippingAddress}
                                    onChange={(e) => setNewPOData({...newPOData, shippingAddress: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                >
                                    {dummyAddresses.map(addr => <option key={addr} value={addr}>{addr}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Billing Address *</label>
                                <select 
                                    value={newPOData.billingAddress}
                                    onChange={(e) => setNewPOData({...newPOData, billingAddress: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                >
                                    {dummyAddresses.map(addr => <option key={addr} value={addr}>{addr}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <Icon name="PackageSearch" className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Products & Items</h3>
                            </div>
                            <button onClick={handleAddPORow} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black shadow-sm flex items-center gap-2 transition-colors">
                                <Icon name="Plus" className="w-3 h-3"/> Add Line
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-12">#</th>
                                        <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[300px]">Product Selection</th>
                                        <th className="px-6 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">Quantity</th>
                                        <th className="px-6 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">Unit Price</th>
                                        <th className="px-6 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest w-32">Amount</th>
                                        <th className="px-6 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 bg-slate-50/20">
                                    {newPOData.items.map((item, index) => (
                                        <tr key={item.si} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-xs font-bold text-slate-400">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <select 
                                                    value={item.productId}
                                                    onChange={(e) => handlePORowChange(index, 'productId', e.target.value)}
                                                    disabled={!newPOData.supplier}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                                                >
                                                    <option value="">{newPOData.supplier ? "-- Select Product --" : "-- Select Vendor First --"}</option>
                                                    {dummyProductsList.filter(p => p.vendor === newPOData.supplier).map(p => (
                                                        <option key={p.id} value={p.id}>[{p.id}] {p.name}</option>
                                                    ))}
                                                </select>
                                                {item.productId && (
                                                    <p className="mt-1.5 text-[10px] text-slate-400 font-medium ml-1">
                                                        UOM: <span className="text-slate-600 font-bold mr-3">{item.unit}</span> 
                                                        Barcode: <span className="font-mono text-slate-600">{item.barcode}</span>
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="number"
                                                    min="1"
                                                    value={item.qty}
                                                    onChange={(e) => handlePORowChange(index, 'qty', e.target.value)}
                                                    className="w-full px-3 py-2 text-center bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <input 
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.price}
                                                    onChange={(e) => handlePORowChange(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full px-3 py-2 text-right bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-black text-slate-800">
                                                    {(item.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => handleRemovePORow(index)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Icon name="Trash" className="w-4 h-4"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {newPOData.items.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm italic">
                                                No products added yet. Select a vendor and click "Add Next Line" to start building the order.
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 bg-white/30 border-t border-slate-100">
                                            <button onClick={handleAddPORow} className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-sm hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                                <Icon name="Plus" className="w-4 h-4"/> Add Next Line
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Section */}
                        {newPOData.items.length > 0 && (
                            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                                <div className="w-full max-w-sm space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-500">Subtotal</span>
                                        <span className="font-bold text-slate-700">{calcTotalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-500">VAT (5%)</span>
                                        <span className="font-bold text-slate-700">{calcVat.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                        <span className="text-base font-black text-slate-800">Net Amount</span>
                                        <span className="text-xl font-black text-blue-600">AED {calcNet.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Detail View
    if (selectedPO) {
        return (
            <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 bg-slate-50 min-h-full">
                {/* Header Action Bar */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedPO(null)} className="flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <Icon name="ChevronLeft" className="w-5 h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Order #{selectedPO.id}</h2>
                                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                                    selectedPO.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                    selectedPO.status === 'Pending' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                    {selectedPO.status}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Created on {selectedPO.date}, 09:00</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="Printer" className="w-4 h-4"/> Print
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="HardDriveUpload" className="w-4 h-4"/> Download
                        </button>
                        {selectedPO.receivedStatus !== 'Fully Received' && (
                            <button onClick={() => handleOpenReceive(selectedPO)} className="px-5 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 shadow-sm shadow-green-200 flex items-center gap-2 ml-2">
                                <Icon name="Check" className="w-4 h-4"/> Receive Goods
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6 max-w-6xl mx-auto">
                    
                    {/* FINANCIAL SUMMARY CARD */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Icon name="FileText" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO Financial Summary</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-y-8 gap-x-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Grand Total (Net)</p>
                                <p className="text-2xl font-black text-slate-800">{selectedPO.netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total GRN Value (Received)</p>
                                <p className="text-2xl font-black text-emerald-600">{(selectedPO.grnAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Remaining to Receive</p>
                                <p className="text-2xl font-black text-orange-500">{(selectedPO.netAmount - (selectedPO.grnAmount || 0)).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Excl. VAT</p>
                                <p className="text-lg font-bold text-slate-600">{selectedPO.totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total VAT Amount</p>
                                <p className="text-lg font-bold text-slate-600">{selectedPO.vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Receive Status</p>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider inline-block mt-1 ${
                                    selectedPO.receivedStatus === 'Fully Received' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                    selectedPO.receivedStatus === 'Partially Received' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                                }`}>
                                    {selectedPO.receivedStatus || 'Not Received'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* TWO COLUMN CARDS: VENDOR & ADDRESS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VENDOR INFO */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="User" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="User" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor Info</h3>
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {selectedPO.supplier.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">{selectedPO.supplier}</h4>
                                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded mt-1">VENDOR ID: VEN-0{selectedPO.id.slice(-3)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs border-t border-slate-100 pt-4">
                                <div className="col-span-1 text-slate-500 font-medium">Contact</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedPO.contactPerson}</div>
                                <div className="col-span-1 text-slate-500 font-medium">Terms</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedPO.paymentTerms}</div>
                            </div>
                        </div>

                        {/* ADDRESSES */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="MapPin" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="MapPin" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery Address</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Shipping Address</h5>
                                    <p className="text-sm font-bold text-slate-800">{selectedPO.shippingAddress || 'Warehouse S3, Al Qusais, Dubai'}</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Billing Address</h5>
                                    <p className={`text-xs ${selectedPO.billingAddress === 'Same as Shipping' || !selectedPO.billingAddress ? 'text-slate-500 font-medium italic' : 'font-bold text-slate-800'}`}>
                                        {selectedPO.billingAddress || 'Same as Shipping'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ORDER ITEMS TABLE */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Package" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO Items</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider w-16">Unit</th>
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider">SKU / Product</th>
                                        <th className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Order Qty</th>
                                        <th className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Received Qty</th>
                                        <th className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Remaining</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Unit Price</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">GRN Total</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Line Total</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {selectedPO.items && selectedPO.items.map((item) => {
                                        const rcvd = item.givenQty || 0;
                                        const remaining = item.qty - rcvd;
                                        const unitNet = item.net / item.qty;
                                        const grnTotal = unitNet * rcvd;

                                        return (
                                            <tr key={item.si} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 text-xs font-medium text-slate-600">{item.unit.split('-')[0]}</td>
                                                <td className="py-4">
                                                    <p className="text-xs font-mono text-slate-400 mb-0.5">{item.code}</p>
                                                    <p className="text-xs font-bold text-slate-800">{item.product}</p>
                                                </td>
                                                <td className="py-4 text-center text-sm font-bold text-slate-800">{item.qty}</td>
                                                <td className="py-4 text-center text-sm font-bold text-emerald-600">{rcvd}</td>
                                                <td className="py-4 text-center">
                                                    <span className={`text-sm font-bold ${remaining > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                        {remaining}
                                                        {remaining > 0 && <span className="block text-[8px] text-red-400 uppercase">[Short]</span>}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right text-xs font-medium text-slate-600">{unitNet.toFixed(2)}</td>
                                                <td className="py-4 text-right text-xs font-bold text-slate-800">{grnTotal.toFixed(2)}</td>
                                                <td className="py-4 text-right text-sm font-black text-slate-800">{item.net.toFixed(2)}</td>
                                                <td className="py-4 text-right text-[10px] text-slate-400">
                                                    {rcvd} of {item.qty}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-slate-100">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grand Total (PO Amount)</td>
                                        <td colSpan="2" className="py-4 text-right text-lg font-black text-slate-800 pr-4">{selectedPO.netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total GRN Amount (Received)</td>
                                        <td colSpan="2" className="py-4 text-right text-lg font-black text-emerald-600 pr-4">{(selectedPO.grnAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* THREE BOTTOM CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* PAYMENT */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="CreditCard" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Details</h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="font-medium text-slate-500">Status</span>
                                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded text-[10px] font-bold uppercase tracking-wider">Pending</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-slate-500">Terms</span>
                                    <span className="font-bold text-slate-800">{selectedPO.paymentTerms}</span>
                                </div>
                            </div>
                        </div>

                        {/* TIMELINE */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="Clock" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</h3>
                            </div>
                            <div className="relative pl-4 space-y-4">
                                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-100"></div>
                                <div className="relative">
                                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 bg-slate-400 rounded-full border-2 border-white"></div>
                                    <p className="text-xs font-bold text-slate-800">PO Created</p>
                                    <p className="text-[10px] text-slate-400">{selectedPO.date}, 09:00</p>
                                </div>
                                <div className="relative">
                                    <div className={`absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${selectedPO.grnAmount > 0 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                    <p className={`text-xs font-bold ${selectedPO.grnAmount > 0 ? 'text-slate-800' : 'text-slate-400'}`}>Goods Received (GRN)</p>
                                    <p className="text-[10px] text-slate-400">{selectedPO.grnAmount > 0 ? '24/07/2026, 11:30' : 'Pending'}</p>
                                </div>
                            </div>
                        </div>

                        {/* RECEIVING INFO */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="Truck" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receiving Info</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Receiver</p>
                                    <p className="text-xs text-slate-600 font-medium italic">Warehouse Team S3</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Delivery Vehicle/Note</p>
                                    <p className="text-xs text-slate-400 italic">No notes added</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Purchase Orders</h2>
                    <p className="text-slate-500 mt-1">Manage and track vendor purchase orders and their statuses.</p>
                </div>
                <button 
                    onClick={() => setIsCreatingPO(true)}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-black shadow-lg shadow-slate-200 transition-all"
                >
                    <Icon name="Plus" className="w-4 h-4"/> Create PO
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#3b82f6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Total POs</p>
                    <h3 className="text-4xl font-black">{stats.total}</h3>
                </div>
                <div className="bg-[#8b5cf6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Processing</p>
                    <h3 className="text-4xl font-black">{stats.approved}</h3>
                </div>
                <div className="bg-[#10b981] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Received</p>
                    <h3 className="text-4xl font-black">{stats.received}</h3>
                </div>
                <div className="bg-[#ef4444] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Pending</p>
                    <h3 className="text-4xl font-black">{stats.pending}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar items-center">
                {['All', 'Draft', 'Pending', 'Approved', 'Received', 'Hold', 'Canceled'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
                            activeTab === tab 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                        <input 
                            type="text" 
                            placeholder="Search PO Number, Supplier..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 flex-1 xl:flex-none">
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Date Range</option>
                    </select>
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Statuses</option>
                    </select>
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Receive Status</option>
                    </select>
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Payment Terms</option>
                    </select>
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Suppliers</option>
                    </select>
                    <button className="px-3 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors">
                        Reset
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                <div className="overflow-x-auto flex-1 p-2">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO Number</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Terms</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Products</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Amount</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRN Amount</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receive Status</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPOs.map((po) => (
                                <tr key={po.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-800">{po.id}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{po.date}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{po.supplier}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{po.paymentTerms}</td>
                                    <td className="px-4 py-4 text-sm text-center font-semibold text-slate-700">{po.items?.length || 0}</td>
                                    <td className="px-4 py-4 text-sm text-right font-bold text-slate-700">{po.netAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td className="px-4 py-4 text-sm text-right font-bold text-slate-700">{(po.grnAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                            po.status === 'Approved' ? 'bg-blue-50 text-blue-600' : 
                                            po.status === 'Received' ? 'bg-emerald-50 text-emerald-600' :
                                            po.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {po.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                            po.receivedStatus === 'Fully Received' ? 'bg-emerald-50 text-emerald-600' : 
                                            po.receivedStatus === 'Partially Received' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                                        }`}>
                                            {po.receivedStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button 
                                                onClick={() => setSelectedPO(po)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Icon name="Eye" className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Icon name="Edit3" className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleOpenReceive(po)}
                                                className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Receive Confirmation"
                                            >
                                                <Icon name="CheckCircle" className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                title="Hold"
                                            >
                                                <Icon name="PauseCircle" className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="Return"
                                            >
                                                <Icon name="RefreshCcw" className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Cancel"
                                            >
                                                <Icon name="Ban" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPOs.length === 0 && (
                                <tr>
                                    <td colSpan="10" className="p-12 text-center text-slate-400 italic">No purchase orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-500">Page 1 of 5</span>
                        <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 outline-none">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 transition-colors"><Icon name="ChevronLeft" className="w-4 h-4" /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-900 text-white font-bold text-xs shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">5</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 transition-colors"><Icon name="ChevronRight" className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* RECEIVE CONFIRMATION MODAL */}
            {showReceiveModal && receivingPO && (
                <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Receive Goods - {receivingPO.id}</h3>
                                <p className="text-sm font-medium text-slate-500 mt-1">Supplier: {receivingPO.supplier}</p>
                            </div>
                            <button onClick={() => setShowReceiveModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <Icon name="X" className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 bg-blue-50/50 border-b border-slate-100">
                            <form onSubmit={handleBarcodeScan} className="flex gap-4 items-end">
                                <div className="flex-1 relative">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Scan Barcode / Enter Product Code</label>
                                    <div className="absolute left-4 top-[38px] text-slate-400"><Icon name="ScanLine" className="w-5 h-5" /></div>
                                    <input 
                                        type="text" 
                                        autoFocus
                                        value={barcodeInput}
                                        onChange={(e) => setBarcodeInput(e.target.value)}
                                        placeholder="Ready to scan..." 
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                                    />
                                </div>
                                <button type="submit" className="px-6 py-3 bg-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-900 transition-colors shadow-md flex items-center gap-2">
                                    Confirm Item
                                </button>
                            </form>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500">Code</th>
                                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500">Barcode</th>
                                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500">Product</th>
                                            <th className="px-4 py-3 text-center text-xs font-bold text-slate-500">PO Qty</th>
                                            <th className="px-4 py-3 text-center text-xs font-bold text-slate-500">Confirmed Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {receivingPO.items.map((item) => (
                                            <tr key={item.si} className={`hover:bg-slate-50 transition-colors ${scannedQty[item.si] === item.qty ? 'bg-green-50/50' : ''}`}>
                                                <td className="px-4 py-3 text-xs font-medium text-slate-600">{item.code}</td>
                                                <td className="px-4 py-3 text-xs font-mono text-slate-500">{item.barcode}</td>
                                                <td className="px-4 py-3 text-xs font-bold text-slate-800">{item.product}</td>
                                                <td className="px-4 py-3 text-center text-sm font-bold text-slate-600">{item.qty}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <input 
                                                        type="number"
                                                        min="0"
                                                        max={item.qty}
                                                        value={scannedQty[item.si] !== undefined ? scannedQty[item.si] : ''}
                                                        onChange={(e) => setScannedQty({...scannedQty, [item.si]: parseInt(e.target.value) || 0})}
                                                        placeholder="0"
                                                        className={`w-20 text-center py-1.5 border rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 ${
                                                            scannedQty[item.si] === item.qty 
                                                            ? 'border-green-300 bg-green-50 text-green-700' 
                                                            : (scannedQty[item.si] > 0 ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-800')
                                                        }`}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-white">
                            <button 
                                onClick={() => setShowReceiveModal(false)}
                                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConvertToGRN}
                                className="px-6 py-2.5 bg-green-600 text-white font-bold text-sm rounded-xl hover:bg-green-700 shadow-md shadow-green-200 flex items-center gap-2 transition-colors"
                            >
                                <Icon name="CheckCircle" className="w-4 h-4"/> Convert to GRN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- GOOD RECEIVE NOTE (GRN) PAGE ---
function GoodReceiveNotePage() {
    // Dummy data demonstrating that multiple GRNs can link back to a single PO
    const initialGRNs = [
        {
            id: 'ARE-GRN-2512-9001',
            poRef: 'ARE-PO-2512-0785',
            date: '2025-12-12',
            supplier: 'SHABEEB GENERAL TRADING L.L.C',
            totalItems: 2,
            receivedQty: 150,
            grnAmount: 7500.00,
            totalAmount: 7142.86,
            vatAmount: 357.14,
            rounded: 0,
            status: 'Paid Invoice',
            contactPerson: 'Thufail',
            paymentTerms: 'Credit',
            supplierTRN: '100391799200004',
            items: [
                { si: 1, code: '10392', barcode: '6291016011416', product: 'LACNOR UHT MILK 1 LTR', unit: 'PCS-12', qty: 75, price: 33.50, amount: 2512.50, vat: 5.00, vatAmount: 125.63, net: 2638.13 },
                { si: 2, code: '10407', barcode: '8700216001380', product: 'ARIEL POWER GEL ORIGINAL 1.8 LTR', unit: 'PCS-4', qty: 75, price: 60.00, amount: 4500.00, vat: 5.00, vatAmount: 225.00, net: 4725.00 }
            ]
        },
        {
            id: 'ARE-GRN-2512-9002',
            poRef: 'ARE-PO-2512-0785', // Same PO as above (Partial Receive 2)
            date: '2025-12-14',
            supplier: 'SHABEEB GENERAL TRADING L.L.C',
            totalItems: 2,
            receivedQty: 200,
            grnAmount: 7700.00,
            totalAmount: 7333.33,
            vatAmount: 366.67,
            rounded: 0,
            status: 'Pending GRN',
            contactPerson: 'Thufail',
            paymentTerms: 'Credit',
            supplierTRN: '100391799200004',
            items: [
                { si: 1, code: '10392', barcode: '6291016011416', product: 'LACNOR UHT MILK 1 LTR', unit: 'PCS-12', qty: 125, price: 33.50, amount: 4187.50, vat: 5.00, vatAmount: 209.38, net: 4396.88 },
                { si: 2, code: '10407', barcode: '8700216001380', product: 'ARIEL POWER GEL ORIGINAL 1.8 LTR', unit: 'PCS-4', qty: 75, price: 60.00, amount: 4500.00, vat: 5.00, vatAmount: 225.00, net: 4725.00 }
            ]
        },
        {
            id: 'ARE-GRN-2512-9003',
            poRef: 'ARE-PO-2512-0787',
            date: '2025-12-15',
            supplier: 'GLOBAL TECH L.L.C',
            totalItems: 1,
            receivedQty: 120,
            grnAmount: 13125.00,
            totalAmount: 12500.00,
            vatAmount: 625.00,
            rounded: 0,
            status: 'Paid Invoice',
            contactPerson: 'Sarah',
            paymentTerms: 'Credit',
            supplierTRN: '100391799200005',
            items: [
                { si: 1, code: '30122', barcode: '890104199', product: 'Smart Watch Series 5', unit: 'PCS-1', qty: 120, price: 104.17, amount: 12500.00, vat: 5.00, vatAmount: 625.00, net: 13125.00 }
            ]
        },
        {
            id: 'ARE-PI-2512-2479',
            poRef: 'INV-137177',
            date: '2025-12-01',
            supplier: 'RIGHT WAY FOODSTUFF TRADING',
            totalItems: 3,
            receivedQty: 5,
            grnAmount: 721.00,
            totalAmount: 687.00,
            vatAmount: 34.35,
            rounded: -0.35,
            status: 'Paid Invoice',
            contactPerson: 'Shajin',
            paymentTerms: 'Credit',
            supplierTRN: '100391799200003',
            items: [
                { si: 1, code: '11609', barcode: '0000000005302', product: 'CHICKEN BREAST 4x2.5 KG', unit: 'CTN', qty: 3, price: 95.00, amount: 285.00, vat: 5.00, vatAmount: 14.25, net: 299.25 },
                { si: 2, code: '11598', barcode: '0000000005296', product: 'CHICKEN LEG QUARTER 15 KG', unit: 'CTN', qty: 1, price: 78.00, amount: 78.00, vat: 5.00, vatAmount: 3.90, net: 81.90 },
                { si: 3, code: '11684', barcode: '0000000005852', product: 'VEAL LEG 18 KG', unit: 'CTN', qty: 1, price: 324.00, amount: 324.00, vat: 5.00, vatAmount: 16.20, net: 340.20 }
            ]
        }
    ];

    const [grns, setGrns] = useState(initialGRNs);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedGRN, setSelectedGRN] = useState(null);

    const filteredGRNs = grns.filter(grn => {
        const matchesSearch = grn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              grn.poRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              grn.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeTab === 'All' || grn.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    const stats = useMemo(() => {
        return {
            total: grns.length,
            paid: grns.filter(g => g.status === 'Paid Invoice').length,
            pending: grns.filter(g => g.status === 'Pending GRN').length,
            totalValue: grns.reduce((sum, g) => sum + g.grnAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    }, [grns]);

    const handlePayInvoice = (id, e) => {
        if (e) e.stopPropagation();
        setGrns(grns.map(g => g.id === id ? { ...g, status: 'Paid Invoice' } : g));
        if (selectedGRN && selectedGRN.id === id) {
            setSelectedGRN(prev => ({ ...prev, status: 'Paid Invoice' }));
        }
    };

    if (selectedGRN) {
        return (
            <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 bg-slate-50 min-h-full">
                {/* Header Action Bar */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedGRN(null)} className="flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <Icon name="ChevronLeft" className="w-5 h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">GRN / Invoice #{selectedGRN.id}</h2>
                                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                                    selectedGRN.status === 'Paid Invoice' ? 'bg-green-100 text-green-700' : 
                                    selectedGRN.status === 'Pending GRN' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                    {selectedGRN.status}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Received on {selectedGRN.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedGRN.status === 'Pending GRN' && (
                            <button onClick={() => handlePayInvoice(selectedGRN.id)} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 shadow-sm shadow-emerald-200 flex items-center gap-2">
                                <Icon name="DollarSign" className="w-4 h-4"/> Pay Invoice
                            </button>
                        )}
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="Printer" className="w-4 h-4"/> Print
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="HardDriveUpload" className="w-4 h-4"/> Download
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6 max-w-6xl mx-auto">
                    
                    {/* FINANCIAL SUMMARY CARD */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Icon name="FileText" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRN Financial Summary</h3>
                        </div>
                        <div className="grid grid-cols-4 gap-y-8 gap-x-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Grand Total (Net)</p>
                                <p className="text-2xl font-black text-slate-800">{selectedGRN.grnAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Excl. VAT</p>
                                <p className="text-lg font-bold text-slate-600">{(selectedGRN.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total VAT Amount</p>
                                <p className="text-lg font-bold text-slate-600">{(selectedGRN.vatAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Qty</p>
                                <p className="text-lg font-bold text-slate-600">{selectedGRN.receivedQty}</p>
                            </div>
                        </div>
                    </div>

                    {/* TWO COLUMN CARDS: VENDOR & ADDRESS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VENDOR INFO */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="User" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="User" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor Info</h3>
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {selectedGRN.supplier.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">{selectedGRN.supplier}</h4>
                                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded mt-1">TRN: {selectedGRN.supplierTRN || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs border-t border-slate-100 pt-4">
                                <div className="col-span-1 text-slate-500 font-medium">Contact</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedGRN.contactPerson || 'N/A'}</div>
                                <div className="col-span-1 text-slate-500 font-medium">Terms</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedGRN.paymentTerms || 'Credit'}</div>
                            </div>
                        </div>

                        {/* ADDRESSES & REF */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="MapPin" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="MapPin" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery & Reference</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Receiving Warehouse</h5>
                                    <p className="text-sm font-bold text-slate-800">Abreco Trading L.L.C Warehouse S3</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Al Qusais Industrial Area 1, Qusais<br/>Dubai, UAE</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Supplier Ref / PO</h5>
                                    <p className="text-sm font-bold text-blue-600">{selectedGRN.poRef}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ORDER ITEMS TABLE */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Package" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Received Items</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider w-16">Unit</th>
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider">SKU / Product</th>
                                        <th className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Received Qty</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Unit Price</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">VAT%</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">VAT Amount</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Net Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {selectedGRN.items && selectedGRN.items.map((item) => (
                                        <tr key={item.si} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 text-xs font-medium text-slate-600">{item.unit}</td>
                                            <td className="py-4">
                                                <p className="text-xs font-mono text-slate-400 mb-0.5">{item.code} | {item.barcode}</p>
                                                <p className="text-xs font-bold text-slate-800">{item.product}</p>
                                            </td>
                                            <td className="py-4 text-center text-sm font-bold text-slate-800">{item.qty}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.price.toFixed(2)}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.amount.toFixed(2)}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.vat}%</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.vatAmount.toFixed(2)}</td>
                                            <td className="py-4 text-right text-sm font-black text-slate-800">{item.net.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-slate-100">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedGRN.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vat Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedGRN.vatAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                    {selectedGRN.rounded ? (
                                        <tr className="border-t border-slate-50">
                                            <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rounded</td>
                                            <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedGRN.rounded || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                        </tr>
                                    ) : null}
                                    <tr className="border-t-2 border-slate-100">
                                        <td colSpan="7" className="py-4 text-right text-[12px] font-black text-slate-600 uppercase tracking-wider">Net Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-lg font-black text-emerald-600">{selectedGRN.grnAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Good Receive Notes</h2>
                    <p className="text-slate-500 mt-1">Manage GRNs and purchase invoices generated from received orders.</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#3b82f6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Total GRNs</p>
                    <h3 className="text-4xl font-black">{stats.total}</h3>
                </div>
                <div className="bg-[#10b981] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Paid Invoice</p>
                    <h3 className="text-4xl font-black">{stats.paid}</h3>
                </div>
                <div className="bg-[#ef4444] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Pending GRN</p>
                    <h3 className="text-4xl font-black">{stats.pending}</h3>
                </div>
                <div className="bg-[#8b5cf6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Total GRN Value</p>
                    <h3 className="text-3xl font-black mt-1">AED {stats.totalValue}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar items-center">
                {['All', 'Pending GRN', 'Paid Invoice'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
                            activeTab === tab 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                        <input 
                            type="text" 
                            placeholder="Search GRN, PO Number, Supplier..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Date Range</option>
                    </select>
                    <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Suppliers</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                <div className="overflow-x-auto flex-1 p-2">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRN Number</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO Reference</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Received</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Received Qty</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRN Amount</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredGRNs.map((grn) => (
                                <tr key={grn.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-800">{grn.id}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-blue-600">{grn.poRef}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{grn.date}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{grn.supplier}</td>
                                    <td className="px-4 py-4 text-sm text-center font-semibold text-slate-700">{grn.receivedQty}</td>
                                    <td className="px-4 py-4 text-sm text-right font-bold text-slate-700">{grn.grnAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                            grn.status === 'Paid Invoice' ? 'bg-emerald-50 text-emerald-600' : 
                                            grn.status === 'Pending GRN' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {grn.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {grn.status === 'Pending GRN' && (
                                                <button onClick={(e) => handlePayInvoice(grn.id, e)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Pay Invoice (Manual / ERP Sync)">
                                                    <Icon name="DollarSign" className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => setSelectedGRN(grn)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                                title="View GRN"
                                            >
                                                <Icon name="Eye" className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" title="Print">
                                                <Icon name="Printer" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredGRNs.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-12 text-center text-slate-400 italic">No Good Receive Notes found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- PURCHASE RETURN PAGE ---
function PurchaseReturnPage() {
    const initialReturns = [
        {
            id: 'ARE-PRT-2512-0078',
            vendor: 'FOODEX WAY GENERAL TRADING L.L.C',
            piRef: 'SRFD001070',
            amount: 17.00,
            totalAmount: 16.00,
            vatAmount: 0.80,
            rounded: 0.20,
            totalProducts: 1,
            qty: 1,
            status: 'Refunded',
            date: '2025-12-05',
            refundAmount: 17.00,
            refundNote: 'Processed via Bank Transfer. Ref: TRX-99821',
            vendorTRN: '104171448400003',
            vendorAddress: 'AFRA KHALIFA BUILDING SHOPNO.2, PLOT No.216-0 FRIJMURAR, DIERA - DUBAI',
            contactNo: '042723530',
            preparedBy: 'Shajin',
            authorizedBy: 'Lintu',
            paymentTerms: 'Credit',
            items: [
                { si: 1, code: '11649', barcode: '9501100018335', product: 'OMAN CHIPS 2X25X15GM', unit: 'CTN', qty: 1, price: 16.00, amount: 16.00, vat: 5.00, vatAmount: 0.80, net: 16.80 }
            ]
        },
        { id: 'ARE-PR-2607-002', vendor: 'GLOBAL TECH L.L.C', piRef: 'ARE-GRN-2512-9003', amount: 104.17, totalAmount: 99.21, vatAmount: 4.96, rounded: 0, qty: 1, totalProducts: 1, status: 'Pending', date: '2026-07-22', items: [] },
        { id: 'ARE-PR-2607-003', vendor: 'RIGHT WAY FOODSTUFF TRADING', piRef: 'ARE-PI-2512-2479', amount: 81.90, totalAmount: 78.00, vatAmount: 3.90, rounded: 0, qty: 1, totalProducts: 1, status: 'Confirmed', date: '2026-07-24', items: [] }
    ];

    const [returns, setReturns] = useState(initialReturns);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedReturn, setSelectedReturn] = useState(null);

    const [showRefundModal, setShowRefundModal] = useState(false);
    const [refundForm, setRefundForm] = useState({ id: null, amount: '', note: '' });

    const filteredReturns = returns.filter(pr => {
        const matchesSearch = pr.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              pr.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              pr.piRef.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeTab === 'All' || pr.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    const stats = useMemo(() => {
        return {
            total: returns.length,
            refunded: returns.filter(r => r.status === 'Refunded').length,
            pending: returns.filter(r => r.status === 'Pending').length,
            totalValue: returns.reduce((sum, r) => sum + r.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    }, [returns]);

    const handleOpenRefundModal = (id, expectedAmount, e) => {
        if (e) e.stopPropagation();
        setRefundForm({ id, amount: expectedAmount, note: '' });
        setShowRefundModal(true);
    };

    const handleSubmitRefund = () => {
        if (!refundForm.amount) {
            alert('Please enter the received amount.');
            return;
        }
        setReturns(returns.map(r => r.id === refundForm.id ? { ...r, status: 'Refunded', refundAmount: refundForm.amount, refundNote: refundForm.note } : r));
        if (selectedReturn && selectedReturn.id === refundForm.id) {
            setSelectedReturn(prev => ({ ...prev, status: 'Refunded', refundAmount: refundForm.amount, refundNote: refundForm.note }));
        }
        setShowRefundModal(false);
        setRefundForm({ id: null, amount: '', note: '' });
    };

    const renderRefundModal = () => {
        if (!showRefundModal) return null;
        return (
            <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h3 className="text-lg font-black text-slate-800">Process Refund</h3>
                        <button onClick={() => setShowRefundModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <Icon name="X" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Received Amount (AED)</label>
                            <input 
                                type="number" 
                                value={refundForm.amount}
                                onChange={(e) => setRefundForm({...refundForm, amount: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Notes (Optional)</label>
                            <textarea 
                                value={refundForm.note}
                                onChange={(e) => setRefundForm({...refundForm, note: e.target.value})}
                                rows="3"
                                placeholder="Enter payment reference or notes..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            ></textarea>
                        </div>
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-white flex gap-3">
                        <button 
                            onClick={() => setShowRefundModal(false)}
                            className="flex-1 py-2.5 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmitRefund}
                            className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition-colors"
                        >
                            <Icon name="Check" className="w-4 h-4"/> Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (selectedReturn) {
        return (
            <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 bg-slate-50 min-h-full">
                {/* Header Action Bar */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedReturn(null)} className="flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <Icon name="ChevronLeft" className="w-5 h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black text-slate-800 tracking-tight">Debit Note #{selectedReturn.id}</h2>
                                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                                    selectedReturn.status === 'Refunded' ? 'bg-emerald-100 text-emerald-700' : 
                                    selectedReturn.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                    selectedReturn.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                    {selectedReturn.status}
                                </span>
                            </div>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Created on {selectedReturn.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedReturn.status === 'Confirmed' && (
                            <button onClick={() => handleOpenRefundModal(selectedReturn.id, selectedReturn.amount)} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 shadow-sm shadow-emerald-200 flex items-center gap-2">
                                <Icon name="RefreshCcw" className="w-4 h-4"/> Mark Refunded
                            </button>
                        )}
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="Printer" className="w-4 h-4"/> Print
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
                            <Icon name="HardDriveUpload" className="w-4 h-4"/> Download
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6 max-w-6xl mx-auto">
                    
                    {/* FINANCIAL SUMMARY CARD */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Icon name="FileText" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Return Financial Summary</h3>
                        </div>
                        <div className="grid grid-cols-4 gap-y-8 gap-x-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Grand Total (Net)</p>
                                <p className="text-2xl font-black text-slate-800">{selectedReturn.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Excl. VAT</p>
                                <p className="text-lg font-bold text-slate-600">{(selectedReturn.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total VAT Amount</p>
                                <p className="text-lg font-bold text-slate-600">{(selectedReturn.vatAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Qty</p>
                                <p className="text-lg font-bold text-slate-600">{selectedReturn.qty || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* REFUND DETAILS BANNER */}
                    {selectedReturn.status === 'Refunded' && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Icon name="CheckCircle" className="w-4 h-4 text-emerald-600" />
                                <h3 className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Refund Processed</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Refunded Amount</p>
                                    <p className="text-xl font-black text-emerald-800">AED {Number(selectedReturn.refundAmount || selectedReturn.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Refund Notes</p>
                                    <p className="text-sm font-medium text-emerald-800">{selectedReturn.refundNote || 'No notes provided.'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TWO COLUMN CARDS: VENDOR & ADDRESS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VENDOR INFO */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="User" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="User" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier Info</h3>
                            </div>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                                    {selectedReturn.vendor.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">{selectedReturn.vendor}</h4>
                                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded mt-1">TRN: {selectedReturn.vendorTRN || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-xs border-t border-slate-100 pt-4">
                                <div className="col-span-1 text-slate-500 font-medium">Contact No.</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedReturn.contactNo || 'N/A'}</div>
                                <div className="col-span-1 text-slate-500 font-medium">Terms</div>
                                <div className="col-span-2 font-bold text-slate-800 text-right">{selectedReturn.paymentTerms || 'N/A'}</div>
                            </div>
                            {selectedReturn.vendorAddress && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Supplier Address</h5>
                                    <p className="text-xs font-medium text-slate-600">{selectedReturn.vendorAddress}</p>
                                </div>
                            )}
                        </div>

                        {/* ADDRESSES & REF */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] opacity-5">
                                <Icon name="MapPin" className="w-40 h-40" />
                            </div>
                            <div className="flex items-center gap-2 mb-6">
                                <Icon name="MapPin" className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Warehouse & Reference</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Returning From Warehouse</h5>
                                    <p className="text-sm font-bold text-slate-800">Abreco Trading L.L.C Warehouse S3</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Al Qusais Industrial Area 1, Qusais<br/>Dubai, UAE</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Supplier Ref</h5>
                                    <p className="text-sm font-bold text-blue-600">{selectedReturn.piRef}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                                    <div>
                                        <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Prepared By</h5>
                                        <p className="text-xs font-bold text-slate-800">{selectedReturn.preparedBy || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Authorized By</h5>
                                        <p className="text-xs font-bold text-slate-800">{selectedReturn.authorizedBy || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ORDER ITEMS TABLE */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="Package" className="w-4 h-4 text-slate-400" />
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Returned Items</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider w-16">Unit</th>
                                        <th className="py-3 text-left text-[9px] font-bold text-slate-400 uppercase tracking-wider">SKU / Product</th>
                                        <th className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">Qty</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Unit Price</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">VAT%</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">VAT Amount</th>
                                        <th className="py-3 text-right text-[9px] font-bold text-slate-400 uppercase tracking-wider">Net Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {selectedReturn.items && selectedReturn.items.map((item) => (
                                        <tr key={item.si} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 text-xs font-medium text-slate-600">{item.unit}</td>
                                            <td className="py-4">
                                                <p className="text-xs font-mono text-slate-400 mb-0.5">{item.code} | {item.barcode}</p>
                                                <p className="text-xs font-bold text-slate-800">{item.product}</p>
                                            </td>
                                            <td className="py-4 text-center text-sm font-bold text-slate-800">{item.qty}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.price.toFixed(2)}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.amount.toFixed(2)}</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.vat}%</td>
                                            <td className="py-4 text-right text-xs font-medium text-slate-600">{item.vatAmount.toFixed(2)}</td>
                                            <td className="py-4 text-right text-sm font-black text-slate-800">{item.net.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {(!selectedReturn.items || selectedReturn.items.length === 0) && (
                                        <tr>
                                            <td colSpan="8" className="py-8 text-center text-xs text-slate-400 italic">No item details available for this return record.</td>
                                        </tr>
                                    )}
                                </tbody>
                                {selectedReturn.items && selectedReturn.items.length > 0 && (
                                <tfoot>
                                    <tr className="border-t-2 border-slate-100">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedReturn.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vat Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedReturn.vatAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                    {selectedReturn.rounded !== undefined && selectedReturn.rounded !== 0 ? (
                                        <tr className="border-t border-slate-50">
                                            <td colSpan="7" className="py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rounded</td>
                                            <td colSpan="1" className="py-4 text-right text-sm font-bold text-slate-800">{(selectedReturn.rounded || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                        </tr>
                                    ) : null}
                                    <tr className="border-t-2 border-slate-100">
                                        <td colSpan="7" className="py-4 text-right text-[12px] font-black text-slate-600 uppercase tracking-wider">Net Amount</td>
                                        <td colSpan="1" className="py-4 text-right text-lg font-black text-red-600">{selectedReturn.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    </tr>
                                </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                {renderRefundModal()}
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Purchase Returns</h2>
                    <p className="text-slate-500 mt-1">Manage vendor returns, debit notes, and refunds.</p>
                </div>
                <button className="px-5 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-black shadow-lg shadow-slate-200 transition-all">
                    <Icon name="Plus" className="w-4 h-4"/> Create Return
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#3b82f6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Total Returns</p>
                    <h3 className="text-4xl font-black">{stats.total}</h3>
                </div>
                <div className="bg-[#10b981] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Refunded</p>
                    <h3 className="text-4xl font-black">{stats.refunded}</h3>
                </div>
                <div className="bg-[#ef4444] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Pending</p>
                    <h3 className="text-4xl font-black">{stats.pending}</h3>
                </div>
                <div className="bg-[#8b5cf6] p-6 rounded-2xl shadow-sm flex flex-col justify-between text-white">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">Total Refund Value</p>
                    <h3 className="text-3xl font-black mt-1">AED {stats.totalValue}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar items-center">
                {['All', 'Pending', 'Confirmed', 'Refunded'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
                            activeTab === tab 
                                ? 'bg-slate-900 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                    <div className="relative w-full max-w-lg">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Search" className="w-5 h-5" /></div>
                        <input 
                            type="text" 
                            placeholder="Search Ref Number, Vendor, Purchase Invoice..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1 xl:flex-none">
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Date Range</option>
                    </select>
                    <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Vendors</option>
                    </select>
                    <button className="px-3 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors">
                        Reset
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                <div className="overflow-x-auto flex-1 p-2">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reference Number</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purchase Invoice</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Product</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                <th className="px-4 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-4 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredReturns.map((pr) => (
                                <tr key={pr.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-800">{pr.id}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{pr.vendor}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-blue-600">{pr.piRef}</td>
                                    <td className="px-4 py-4 text-sm text-center font-semibold text-slate-700">{pr.totalProducts}</td>
                                    <td className="px-4 py-4 text-sm text-right font-bold text-slate-700">{pr.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                            pr.status === 'Refunded' ? 'bg-emerald-50 text-emerald-600' : 
                                            pr.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 
                                            pr.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {pr.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{pr.date}</td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {pr.status === 'Confirmed' && (
                                                <button onClick={(e) => handleOpenRefundModal(pr.id, pr.amount, e)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Refunded">
                                                    <Icon name="RefreshCcw" className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button onClick={() => setSelectedReturn(pr)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                                <Icon name="Eye" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredReturns.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-12 text-center text-slate-400 italic">No purchase returns found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-500">Page 1 of 1</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 transition-colors"><Icon name="ChevronLeft" className="w-4 h-4" /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-900 text-white font-bold text-xs shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-200 transition-colors"><Icon name="ChevronRight" className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
            {renderRefundModal()}
        </div>
    );
}

// --- REPORTS PAGE ---
function ReportsPage() {
    const [activeCategory, setActiveCategory] = useState('Sales & Orders');
    const [activeReport, setActiveReport] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportData, setReportData] = useState(null);

    // Filters state
    const [filters, setFilters] = useState({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        branch: 'All Branches',
        warehouse: 'All Warehouses',
        vendor: 'All Vendors',
        customer: 'All Customers',
        salesperson: 'All Staff',
        driver: 'All Drivers',
        category: 'All Categories',
        product: 'All Products',
        status: 'All'
    });

    const reportCategories = [
        {
            name: 'Sales & Orders',
            icon: 'ShoppingCart',
            reports: [
                { id: 'sales_summary', name: 'Sales Summary Report', columns: ['Report Date', 'Company', 'Branch', 'Total Orders', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'Tax', 'Total Sales', 'Cost of Goods', 'Gross Profit', 'Gross Margin %'] },
                { id: 'daily_sales', name: 'Daily Sales Report', columns: ['Date', 'Company', 'Branch', 'Order Count', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'Tax', 'Total Sales'] },
                { id: 'monthly_sales', name: 'Monthly Sales Report', columns: ['Month', 'Company', 'Branch', 'Order Count', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'customer_sales', name: 'Customer-wise Sales Report', columns: ['Customer ID', 'Customer Name', 'Customer Type', 'Branch', 'Order Count', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'product_sales', name: 'Product-wise Sales Report', columns: ['SKU', 'Product Name', 'Category', 'Subcategory', 'UOM', 'Quantity Sold', 'Gross Sales', 'Discount', 'Returns Qty', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'category_sales', name: 'Category-wise Sales Report', columns: ['Category', 'Subcategory', 'Order Count', 'Quantity Sold', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'vendor_sales', name: 'Vendor-wise Sales Report', columns: ['Vendor ID', 'Vendor Name', 'Product Count', 'Quantity Sold', 'Order Count', 'Gross Sales', 'Discount', 'Returns', 'Net Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'order_summary', name: 'Order Summary Report', columns: ['Order ID', 'Order Date', 'Customer', 'Branch', 'Order Type', 'Salesperson', 'Order Status', 'Payment Status', 'Gross Amount', 'Discount', 'Tax', 'Net Amount', 'Delivery Status'] },
                { id: 'order_status', name: 'Order Status Report', columns: ['Order ID', 'Order Date', 'Customer', 'Branch', 'Order Status', 'Status Date', 'Payment Status', 'Total Amount', 'Delivery Status'] },
                { id: 'cancelled_orders', name: 'Cancelled Orders Report', columns: ['Order ID', 'Order Date', 'Customer', 'Branch', 'Cancelled Date', 'Cancelled By', 'Cancellation Reason', 'Order Amount', 'Refund Amount'] },
                { id: 'returned_orders', name: 'Returned Orders Report', columns: ['Return ID', 'Order ID', 'Return Date', 'Customer', 'SKU', 'Product Name', 'Qty Returned', 'Return Reason', 'Return Amount', 'Credit Note No', 'Status'] },
                { id: 'sales_by_salesperson', name: 'Sales by Salesperson', columns: ['Salesperson ID', 'Salesperson Name', 'Branch', 'Order Count', 'Customer Count', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'top_selling', name: 'Top Selling Products', columns: ['Rank', 'SKU', 'Product Name', 'Category', 'Quantity Sold', 'Order Count', 'Net Sales', 'Gross Profit', 'Margin %'] },
                { id: 'slow_moving', name: 'Slow Moving Products', columns: ['SKU', 'Product Name', 'Category', 'Current Stock', 'Qty Sold', 'Last Sale Date', 'Days Since Last Sale', 'Stock Value'] },
                { id: 'jit_procurement', name: 'Consolidated JIT Procurement Report', columns: ['Item Code', 'Item Name', '# of Cust Ordered', 'UOM', 'Qty', 'Unit Value', 'Total Value'] },
                { id: 'jit_customer_details', name: 'Consolidated JIT Customer Details', columns: ['Customer Code', 'Customer Name', 'Item Name', 'Contact #', 'Contact Name', 'Qty', 'Unit Value', 'Total Value'] },
                { id: 'orders_accepted_pending', name: 'Orders List Accepted & Pending', columns: ['Order No', 'Customer Name', 'Date', 'Value'] },
                { id: 'pending_assign_picker', name: 'Pending list For Assigning to Picker', columns: ['Order No', 'Customer Name', 'Date', 'Value'] },
                { id: 'daily_sales_summary', name: 'Daily Sales Summary', columns: ['Customer Name', 'No of Inv', 'Value'] },
                { id: 'ignore_stock_items', name: 'Orders Received for IGNORE STOCK ITEMS', columns: ['Item Code', 'Item Name', 'UOM', 'Qty', 'Value'] },
                { id: 'ignore_stock_items_customer', name: 'Orders Received for IGNORE STOCK ITEMS - Customer Wise', columns: ['Customer Name', 'Item Code', 'Item Name', 'UOM', 'Qty', 'Value'] }
            ]
        },
        {
            name: 'Purchasing',
            icon: 'ShoppingBag',
            reports: [
                { id: 'purchase_summary', name: 'Purchase Summary Report', columns: ['Date', 'Company', 'Branch', 'Vendor Count', 'PO Count', 'GRN Count', 'Gross Purchase', 'Discount', 'Tax', 'Net Purchase', 'Paid Amount', 'Outstanding'] },
                { id: 'vendor_purchase', name: 'Vendor-wise Purchase Report', columns: ['Vendor ID', 'Vendor Name', 'PO Count', 'GRN Count', 'Invoice Count', 'Purchase Qty', 'Gross Purchase', 'Discount', 'Tax', 'Net Purchase', 'Paid', 'Outstanding'] },
                { id: 'vendor_product', name: 'Vendor Product Report', columns: ['Vendor ID', 'Vendor Name', 'SKU', 'Product Name', 'Category', 'UOM', 'Purchase Price', 'MOQ', 'Lead Time', 'Status'] },
                { id: 'po_report', name: 'Purchase Order Report', columns: ['PO No', 'PO Date', 'Vendor', 'Branch', 'Warehouse', 'PO Status', 'Expected Date', 'Item Count', 'PO Amount', 'Tax', 'Total Amount'] },
                { id: 'po_status', name: 'PO Status Report', columns: ['PO No', 'PO Date', 'Vendor', 'PO Status', 'Expected Date', 'Received Amount', 'Pending Amount', 'Days Pending'] },
                { id: 'grn_report', name: 'GRN Report', columns: ['GRN No', 'GRN Date', 'PO No', 'Vendor', 'Warehouse', 'SKU', 'Product Name', 'Ordered Qty', 'Received Qty', 'Accepted Qty', 'Rejected Qty', 'Unit Cost', 'Total Cost', 'Status'] },
                { id: 'pending_grn', name: 'Pending GRN Report', columns: ['PO No', 'PO Date', 'Vendor', 'Expected Date', 'Ordered Qty', 'Received Qty', 'Pending Qty', 'Pending Amount', 'Days Pending'] },
                { id: 'vendor_return', name: 'Vendor Return Report', columns: ['Return ID', 'Return Date', 'Vendor', 'PO No', 'GRN No', 'SKU', 'Product Name', 'Qty', 'Return Reason', 'Return Amount', 'Status'] },
                { id: 'vendor_credit_note', name: 'Vendor Credit Note Report', columns: ['Credit Note No', 'Date', 'Vendor', 'Reference Return', 'Amount Before Tax', 'Tax', 'Total Amount', 'Status'] },
                { id: 'vendor_outstanding', name: 'Vendor Outstanding Report', columns: ['Vendor ID', 'Vendor Name', 'Invoice Count', 'Invoice Amount', 'Paid Amount', 'Credit Note', 'Outstanding', 'Overdue Amount'] },
                { id: 'vendor_statement', name: 'Vendor Statement of Account', columns: ['Date', 'Vendor', 'Reference No', 'Transaction Type', 'Debit', 'Credit', 'Running Balance'] },
                { id: 'vendor_performance', name: 'Vendor Performance Report', columns: ['Vendor', 'PO Count', 'On-Time Deliveries', 'Late Deliveries', 'Fill Rate %', 'Rejected Qty', 'Return Value', 'Average Lead Time', 'Performance Score'] }
            ]
        },
        {
            name: 'Inventory',
            icon: 'Boxes',
            reports: [
                { id: 'stock_summary', name: 'Stock Summary Report', columns: ['SKU', 'Product Name', 'Category', 'Warehouse', 'Opening Stock', 'Received Qty', 'Sold Qty', 'Returned Qty', 'Adjusted Qty', 'Closing Stock', 'Stock Value'] },
                { id: 'current_stock', name: 'Current Stock Report', columns: ['SKU', 'Product Name', 'Category', 'Warehouse', 'Bin', 'Batch No', 'Expiry Date', 'Available Qty', 'Reserved Qty', 'Damaged Qty', 'Total Qty', 'Unit Cost', 'Stock Value'] },
                { id: 'stock_valuation', name: 'Stock Valuation Report', columns: ['Warehouse', 'SKU', 'Product Name', 'Batch No', 'Qty', 'Unit Cost', 'Stock Value', 'Valuation Method'] },
                { id: 'low_stock', name: 'Low Stock Report', columns: ['SKU', 'Product Name', 'Category', 'Warehouse', 'Current Stock', 'Minimum Stock', 'Reorder Level', 'Shortage Qty', 'Suggested Order Qty'] },
                { id: 'out_of_stock', name: 'Out-of-Stock Report', columns: ['SKU', 'Product Name', 'Category', 'Warehouse', 'Available Qty', 'Reserved Qty', 'Last Stock Date', 'Last Sale Date'] },
                { id: 'expiry_report', name: 'Expiry/Near-Expiry Report', columns: ['SKU', 'Product Name', 'Warehouse', 'Batch No', 'Expiry Date', 'Days to Expiry', 'Available Qty', 'Stock Value', 'Expiry Status'] },
                { id: 'stock_movement', name: 'Stock Movement Report', columns: ['Date', 'Transaction ID', 'Transaction Type', 'SKU', 'Product Name', 'Warehouse', 'Batch No', 'Qty In', 'Qty Out', 'Balance Qty', 'Reference No', 'User'] },
                { id: 'stock_adjustment', name: 'Stock Adjustment Report', columns: ['Adjustment ID', 'Date', 'Warehouse', 'SKU', 'Product Name', 'Batch No', 'System Qty', 'Adjusted Qty', 'Variance', 'Reason', 'Approved By'] },
                { id: 'warehouse_wise', name: 'Warehouse-wise Stock Report', columns: ['Warehouse', 'SKU', 'Product Name', 'Category', 'Available Qty', 'Reserved Qty', 'Total Qty', 'Unit Cost', 'Stock Value'] },
                { id: 'product_batch', name: 'Product Batch Report', columns: ['SKU', 'Product Name', 'Warehouse', 'Batch No', 'Manufacturing Date', 'Expiry Date', 'Qty', 'Unit Cost', 'Stock Value', 'Status'] },
                { id: 'damaged_stock', name: 'Damaged Stock Report', columns: ['Date', 'Warehouse', 'SKU', 'Product Name', 'Batch No', 'Damaged Qty', 'Unit Cost', 'Damaged Value', 'Reason', 'Approved By'] },
                { id: 'out_of_stock_list', name: 'Out-of-Stock Product List', columns: ['Item Code', 'Item Name', 'UOM', 'Qty'] },
                { id: 'low_inventory_alert', name: 'Low Inventory Alert Report', columns: ['Item Code', 'Item Name', 'Stock Qty'] },
                { id: 'slabwise_price', name: 'Slabwise Price Report', columns: ['Item Code', 'Item Name', 'Slab 1', 'Slab 2', 'Slab 3'] }
            ]
        },
        {
            name: 'Customer',
            icon: 'Users',
            reports: [
                { id: 'cust_sales', name: 'Customer Sales Report', columns: ['Customer ID', 'Customer Name', 'Branch', 'Order Count', 'Qty Purchased', 'Net Sales', 'Tax', 'Total Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'cust_order', name: 'Customer Order Report', columns: ['Order ID', 'Order Date', 'Customer ID', 'Customer Name', 'Branch', 'Order Status', 'Payment Status', 'Net Amount', 'Delivery Status'] },
                { id: 'cust_outstanding', name: 'Customer Outstanding Report', columns: ['Customer ID', 'Customer Name', 'Invoice Count', 'Invoice Amount', 'Paid Amount', 'Credit Note', 'Outstanding', 'Overdue'] },
                { id: 'cust_statement', name: 'Customer Statement of Account', columns: ['Date', 'Customer', 'Reference No', 'Transaction Type', 'Debit', 'Credit', 'Running Balance'] },
                { id: 'cust_payment', name: 'Customer Payment Report', columns: ['Payment ID', 'Payment Date', 'Customer', 'Invoice No', 'Payment Method', 'Reference No', 'Amount', 'Status'] },
                { id: 'cust_credit_limit', name: 'Customer Credit Limit Report', columns: ['Customer ID', 'Customer Name', 'Credit Limit', 'Current Outstanding', 'Available Credit', 'Overdue Amount', 'Credit Status'] },
                { id: 'cust_product_purchase', name: 'Customer-wise Product Purchase', columns: ['Customer ID', 'Customer Name', 'SKU', 'Product Name', 'Category', 'Qty Purchased', 'Net Sales', 'Last Purchase Date'] },
                { id: 'cust_return', name: 'Customer Return Report', columns: ['Return ID', 'Date', 'Customer', 'Order ID', 'SKU', 'Product Name', 'Qty Returned', 'Return Reason', 'Return Amount', 'Status'] },
                { id: 'cust_profitability', name: 'Customer-wise Profitability', columns: ['Customer ID', 'Customer Name', 'Sales', 'COGS', 'Gross Profit', 'Margin %', 'Delivery Cost', 'Other Cost', 'Net Profit', 'Net Margin %'] },
                { id: 'active_customer_dir', name: 'Active Customer Directory', columns: ['Customer Name', 'Address', 'No of Product', 'Monthly Value'] },
                { id: 'inactive_customer_dir', name: 'Inactive Customer Directory', columns: ['Customer Name', 'Address', 'Contact No'] },
                { id: 'no_transaction_week', name: 'No Transaction Report (Last 1 Week)', columns: ['Customer Name', 'Address', 'Contact No', 'Last Invoice Date', 'Value'] }
            ]
        },
        {
            name: 'Delivery',
            icon: 'Truck',
            reports: [
                { id: 'delivery_summary', name: 'Delivery Summary Report', columns: ['Date', 'Delivery ID', 'Order ID', 'Customer', 'Branch', 'Delivery Team', 'Driver', 'Route', 'Delivery Status', 'Delivery Date', 'Delivery Time', 'Total Amount'] },
                { id: 'pending_delivery', name: 'Pending Delivery Report', columns: ['Order ID', 'Order Date', 'Customer', 'Address', 'Branch', 'Delivery Team', 'Driver', 'Route', 'Pending Since', 'Order Amount', 'Payment Status'] },
                { id: 'completed_delivery', name: 'Completed Delivery Report', columns: ['Delivery ID', 'Order ID', 'Customer', 'Driver', 'Route', 'Dispatch Date', 'Delivered Date', 'Delivered Time', 'OTP/Acknowledgement', 'Status'] },
                { id: 'failed_delivery', name: 'Failed Delivery Report', columns: ['Delivery ID', 'Order ID', 'Customer', 'Driver', 'Attempt Date', 'Failure Reason', 'Remarks', 'Next Attempt Date', 'Status'] },
                { id: 'team_performance', name: 'Delivery Team Performance', columns: ['Team', 'Driver', 'Assigned Orders', 'Delivered Orders', 'Failed Orders', 'Pending Orders', 'Success Rate %', 'Average Delivery Time'] },
                { id: 'driver_performance', name: 'Driver-wise Delivery Report', columns: ['Driver ID', 'Driver Name', 'Team', 'Assigned', 'Delivered', 'Failed', 'Pending', 'Success Rate %', 'Average Delivery Time'] },
                { id: 'route_delivery', name: 'Route-wise Delivery Report', columns: ['Route', 'Delivery Date', 'Order Count', 'Delivered', 'Failed', 'Pending', 'Total Sales', 'Average Delivery Time'] },
                { id: 'time_performance', name: 'Delivery Time Performance', columns: ['Delivery ID', 'Order ID', 'Dispatch Time', 'Delivered Time', 'Delivery Duration', 'Target Duration', 'Variance', 'Performance Status'] },
                { id: 'otp_ack', name: 'OTP/Customer Acknowledgement', columns: ['Delivery ID', 'Order ID', 'Customer', 'OTP Status', 'OTP Verified Time', 'Acknowledgement Status', 'Acknowledged By', 'Acknowledged Time'] },
                { id: 'pending_assign_driver', name: 'Pending list for Assigning Driver', columns: ['Order No', 'Customer Name', 'Date', 'Value'] },
                { id: 'dispatched_driver', name: 'Dispatched Order List By Drivers', columns: ['Driver Name', 'Customer Name', 'Order No', 'Value'] },
                { id: 'product_return_driver', name: 'Product Return Report', columns: ['Customer Name', 'Item Code', 'Item Name', 'UOM', 'Qty', 'Driver Name', 'Value'] },
                { id: 'daily_sales_driver', name: 'Daily Sales Report (By Driver)', columns: ['Customer Name', 'No of Inv', 'Value', 'Driver'] }
            ]
        },
        {
            name: 'Finance',
            icon: 'DollarSign',
            reports: [
                { id: 'sales_invoice', name: 'Sales Invoice Report', columns: ['Invoice No', 'Invoice Date', 'Order ID', 'Customer', 'Branch', 'Subtotal', 'Discount', 'Tax', 'Total', 'Paid', 'Outstanding', 'Invoice Status'] },
                { id: 'purchase_invoice', name: 'Purchase Invoice Report', columns: ['Invoice No', 'Invoice Date', 'PO No', 'Vendor', 'Branch', 'Subtotal', 'Discount', 'Tax', 'Total', 'Paid', 'Outstanding', 'Invoice Status'] },
                { id: 'credit_note', name: 'Credit Note Report', columns: ['Credit Note No', 'Date', 'Customer/Vendor', 'Reference No', 'Reason', 'Subtotal', 'Tax', 'Total', 'Status'] },
                { id: 'debit_note', name: 'Debit Note Report', columns: ['Debit Note No', 'Date', 'Customer/Vendor', 'Reference No', 'Reason', 'Subtotal', 'Tax', 'Total', 'Status'] },
                { id: 'payment_collection', name: 'Payment Collection Report', columns: ['Payment ID', 'Date', 'Customer', 'Invoice No', 'Payment Method', 'Reference No', 'Collected By', 'Amount', 'Status'] },
                { id: 'ar_report', name: 'Accounts Receivable Report', columns: ['Customer', 'Invoice Count', 'Invoice Amount', 'Paid', 'Credit Note', 'Outstanding', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'] },
                { id: 'ap_report', name: 'Accounts Payable Report', columns: ['Vendor', 'Invoice Count', 'Invoice Amount', 'Paid', 'Credit Note', 'Outstanding', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'] },
                { id: 'cust_aging', name: 'Customer Outstanding Aging', columns: ['Customer', 'Total Outstanding', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days', 'Overdue'] },
                { id: 'vendor_aging', name: 'Vendor Outstanding Aging', columns: ['Vendor', 'Total Outstanding', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days', 'Overdue'] },
                { id: 'profit_loss', name: 'Profit & Loss Report', columns: ['Period', 'Revenue', 'Sales Returns', 'Net Revenue', 'COGS', 'Gross Profit', 'Operating Expenses', 'Other Income', 'Other Expenses', 'Net Profit', 'Net Margin %'] },
                { id: 'gross_margin', name: 'Gross Margin Report', columns: ['Period', 'Sales', 'COGS', 'Gross Profit', 'Gross Margin %'] },
                { id: 'tax_vat', name: 'Tax-VAT Report', columns: ['Period', 'Tax Type', 'Taxable Sales', 'Output Tax', 'Taxable Purchase', 'Input Tax', 'Net Tax Payable'] },
                { id: 'pending_payment_summary', name: 'Pending Payment Summary', columns: ['Customer Name', 'Invoice No', 'Reference', 'Value'] },
                { id: 'daily_cash_report', name: 'Daily Cash Report', columns: ['Driver Name', 'Date', 'Customer Name', 'Value', 'Received Amt'] },
                { id: 'customer_detailed_ledger', name: 'Customer Detailed Ledger', columns: ['Customer Name', 'Invoice No', 'Doc Type', 'Doc No', 'Date', 'Inv Value', 'Received Amt'] },
                { id: 'card_payment_summary', name: 'Card Payment Summary & History', columns: ['Date', 'Customer Name', 'Invoice No', 'Value'] }
            ]
        },
        {
            name: 'ERP Integration',
            icon: 'ArrowRightLeft',
            reports: [
                { id: 'erp_status', name: 'ERP Sync Status Report', columns: ['Sync ID', 'Date/Time', 'Module', 'Direction', 'Records', 'Success Count', 'Failed Count', 'Status', 'Duration'] },
                { id: 'failed_sync', name: 'Failed ERP Sync Report', columns: ['Sync ID', 'Date/Time', 'Module', 'Record ID', 'Reference No', 'Error Code', 'Error Message', 'Retry Count', 'Status'] },
                { id: 'product_sync', name: 'Product Sync Report', columns: ['Sync Date', 'SKU', 'Product Name', 'ERP ID', 'Horeca Hub ID', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'customer_sync', name: 'Customer Sync Report', columns: ['Sync Date', 'Customer ID', 'Customer Name', 'ERP ID', 'Horeca Hub ID', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'vendor_sync', name: 'Vendor Sync Report', columns: ['Sync Date', 'Vendor ID', 'Vendor Name', 'ERP ID', 'Horeca Hub ID', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'stock_sync', name: 'Stock Sync Report', columns: ['Sync Date', 'SKU', 'Warehouse', 'ERP Stock', 'Horeca Hub Stock', 'Variance', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'order_sync', name: 'Order Sync Report', columns: ['Sync Date', 'Order ID', 'ERP Order ID', 'Customer', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'invoice_sync', name: 'Invoice Sync Report', columns: ['Sync Date', 'Invoice No', 'ERP Invoice ID', 'Customer/Vendor', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'po_sync', name: 'PO Sync Report', columns: ['Sync Date', 'PO No', 'ERP PO ID', 'Vendor', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] },
                { id: 'grn_sync', name: 'GRN Sync Report', columns: ['Sync Date', 'GRN No', 'ERP GRN ID', 'Vendor', 'Sync Direction', 'Sync Status', 'Last Sync', 'Error'] }
            ]
        },
        {
            name: 'Management',
            icon: 'Activity',
            reports: [
                { id: 'daily_business', name: 'Daily Business Summary', columns: ['Date', 'Orders', 'Customers', 'Sales', 'Purchase', 'Gross Profit', 'Collections', 'Receivables', 'Payables', 'Stock Value', 'Pending Deliveries'] },
                { id: 'sales_vs_purchase', name: 'Sales vs Purchase Report', columns: ['Period', 'Sales', 'Purchase', 'Sales-Purchase Variance', 'Gross Profit', 'Margin %'] },
                { id: 'revenue_profit', name: 'Revenue & Profit Report', columns: ['Period', 'Revenue', 'COGS', 'Gross Profit', 'Operating Cost', 'Net Profit', 'Net Margin %'] },
                { id: 'margin_product', name: 'Gross Margin by Product', columns: ['SKU', 'Product Name', 'Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'margin_customer', name: 'Gross Margin by Customer', columns: ['Customer', 'Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'margin_category', name: 'Gross Margin by Category', columns: ['Category', 'Sales', 'COGS', 'Gross Profit', 'Margin %'] },
                { id: 'branch_perf', name: 'Branch Performance Report', columns: ['Branch', 'Orders', 'Customers', 'Sales', 'Purchase', 'Gross Profit', 'Margin %', 'Collections', 'Outstanding'] },
                { id: 'vendor_perf_dash', name: 'Vendor Performance Dashboard', columns: ['Vendor', 'Purchase Value', 'PO Count', 'On-Time %', 'Fill Rate %', 'Return %', 'Outstanding', 'Performance Score'] },
                { id: 'customer_perf_dash', name: 'Customer Performance Dashboard', columns: ['Customer', 'Orders', 'Sales', 'Average Order Value', 'Returns', 'Payments', 'Outstanding', 'Gross Profit', 'Margin %'] },
                { id: 'business_kpi', name: 'Business KPI Report', columns: ['Period', 'Revenue', 'Orders', 'AOV', 'Gross Profit', 'Margin %, New Customers, Repeat Customers', 'Order Fulfillment %', 'On-Time Delivery %', 'Stock Availability %'] }
            ]
        }
    ];

    // Auto-select first report when category changes
    useEffect(() => {
        const cat = reportCategories.find(c => c.name === activeCategory);
        if (cat && cat.reports.length > 0) {
            setActiveReport(cat.reports[0]);
            setReportData(null); 
        }
    }, [activeCategory]);

    const handleGenerate = () => {
        if (!activeReport) return;
        setIsGenerating(true);
        // Simulate extraction & generation time based on active filters
        setTimeout(() => {
            const data = [];
            for (let i = 0; i < 45; i++) {
                const row = {};
                activeReport.columns.forEach(col => {
                    // Logic mapped data generator for a realistic Excel output responding to Filters
                    if (col.includes('Date') || col.includes('Time') || col === 'Period' || col === 'Month' || col.includes('Last Sync')) row[col] = `2026-08-${String((i%28)+1).padStart(2, '0')}`;
                    else if (col.includes('ID') || col.includes('No') || col === 'SKU') row[col] = `${col.split(' ')[0].toUpperCase()}-${1000 + i}`;
                    else if (col.includes('Amount') || col.includes('Sales') || col.includes('Cost') || col.includes('Profit') || col.includes('Value') || col.includes('Tax') || col.includes('Outstanding') || col === 'Debit' || col === 'Credit' || col.includes('Balance') || col === 'Revenue' || col === 'COGS') row[col] = (Math.random() * 5000 + 500).toFixed(2);
                    else if (col.includes('Qty') || col.includes('Count') || col.includes('Days') || col.includes('Orders') || col.includes('Stock') || col === 'Rank' || col === 'Records') row[col] = Math.floor(Math.random() * 150) + 1;
                    else if (col.includes('%') || col.includes('Rate')) row[col] = (Math.random() * 40 + 60).toFixed(1) + '%';
                    
                    // Connected closely to Filters to make Preview Realistic
                    else if (col.includes('Customer')) row[col] = filters.customer !== 'All Customers' ? filters.customer : `Partner Corp ${String.fromCharCode(65 + (i%5))}`;
                    else if (col.includes('Vendor')) row[col] = filters.vendor !== 'All Vendors' ? filters.vendor : `Partner Corp ${String.fromCharCode(65 + (i%5))}`;
                    else if (col.includes('Branch') || col.includes('Location')) row[col] = filters.branch !== 'All Branches' ? filters.branch : ['Main Branch', 'Warehouse S1', 'Warehouse S3'][i%3];
                    else if (col.includes('Warehouse')) row[col] = filters.warehouse !== 'All Warehouses' ? filters.warehouse : ['Main Branch', 'Warehouse S1', 'Warehouse S3'][i%3];
                    else if (col.includes('Category')) row[col] = filters.category !== 'All Categories' ? filters.category : ['Electronics', 'FMCG', 'Furniture', 'Services'][i%4];
                    else if (col.includes('Product') || col.includes('Item') || col.includes('SKU')) row[col] = filters.product !== 'All Products' ? filters.product : `Premium Commercial Product ${i+1}`;
                    else if (col.includes('Status') || col === 'Sync Direction') row[col] = filters.status !== 'All' ? filters.status : ['Completed', 'Pending', 'Processing', 'Failed', 'Success', 'Inbound', 'Outbound'][i%7];
                    else if (col.includes('Driver')) row[col] = filters.driver !== 'All Drivers' ? filters.driver : ['Ali V.', 'Sarah K.', 'John D.', 'Mohammad'][i%4];
                    else if (col.includes('Salesperson') || col.includes('User')) row[col] = filters.salesperson !== 'All Staff' ? filters.salesperson : ['Ali V.', 'Sarah K.', 'John D.', 'Mohammad'][i%4];
                    else if (col === 'Route') row[col] = `Route ${String.fromCharCode(65 + (i%4))}-${i%3}`;
                    else if (col === 'Team') row[col] = `Logistics Team ${i%3 + 1}`;
                    else if (col.includes('Subcategory')) row[col] = ['Accessories', 'Perishables', 'Seating', 'Maintenance'][i%4];
                    else if (col.includes('Method') || col.includes('Type')) row[col] = ['Credit', 'Cash', 'Bank Transfer', 'Cheque'][i%4];
                    else if (col === 'UOM') row[col] = ['PCS', 'CTN', 'KG', 'LTR'][i%4];
                    else row[col] = `Sample ${col}`;
                });
                data.push(row);
            }
            setReportData(data);
            setIsGenerating(false);
        }, 1200);
    };

    const handleExportCSV = () => {
        if (!reportData || !activeReport) return;

        const headers = activeReport.columns;
        const csvRows = reportData.map(row => {
            return headers.map(col => {
                let cellValue = row[col] === null || row[col] === undefined ? '' : String(row[col]);
                // Escape quotes and wrap in quotes if the value contains a comma, newline, or quote
                if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
                    cellValue = `"${cellValue.replace(/"/g, '""')}"`;
                }
                return cellValue;
            }).join(',');
        });

        const csvString = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `${activeReport.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Logical rendering of filters based specifically on activeReport Columns
    const renderFilters = () => {
        if (!activeReport) return null;

        // Extract column names into a lowercase string to determine what filters to show dynamically
        const cols = activeReport.columns.join(' ').toLowerCase();

        const needsBranch = cols.includes('branch');
        const needsWarehouse = cols.includes('warehouse');
        const needsVendor = cols.includes('vendor');
        const needsCustomer = cols.includes('customer');
        const needsProduct = cols.includes('product') || cols.includes('sku') || cols.includes('item');
        const needsCategory = cols.includes('category');
        const needsSalesperson = cols.includes('salesperson');
        const needsDriver = cols.includes('driver') || cols.includes('team');
        const needsStatus = cols.includes('status') || cols.includes('direction');

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Always Show Date Filters */}
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
                    <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
                    <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm" />
                </div>

                {/* Conditional Dynamic Filters based on Columns */}
                {needsBranch && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Branch / Location</label>
                        <select value={filters.branch} onChange={e => setFilters({...filters, branch: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Branches</option><option>Main Branch</option><option>Warehouse S3</option>
                        </select>
                    </div>
                )}

                {needsWarehouse && !needsBranch && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Warehouse</label>
                        <select value={filters.warehouse} onChange={e => setFilters({...filters, warehouse: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Warehouses</option><option>Warehouse S1</option><option>Warehouse S3</option>
                        </select>
                    </div>
                )}

                {needsVendor && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vendor / Supplier</label>
                        <select value={filters.vendor} onChange={e => setFilters({...filters, vendor: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Vendors</option><option>SHABEEB TRADING</option><option>GLOBAL TECH</option>
                        </select>
                    </div>
                )}

                {needsCustomer && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Customer</label>
                        <select value={filters.customer} onChange={e => setFilters({...filters, customer: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Customers</option><option>B2B Partner</option><option>Retail Store</option>
                        </select>
                    </div>
                )}

                {needsProduct && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Product / Item</label>
                        <select value={filters.product} onChange={e => setFilters({...filters, product: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Products</option><option>Premium Commercial Product 1</option><option>Premium Commercial Product 2</option>
                        </select>
                    </div>
                )}

                {needsCategory && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Product Category</label>
                        <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Categories</option><option>Electronics</option><option>FMCG</option><option>Furniture</option>
                        </select>
                    </div>
                )}

                {needsSalesperson && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Salesperson</label>
                        <select value={filters.salesperson} onChange={e => setFilters({...filters, salesperson: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Staff</option><option>Ali V.</option><option>Sarah K.</option>
                        </select>
                    </div>
                )}

                {needsDriver && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Driver / Team</label>
                        <select value={filters.driver} onChange={e => setFilters({...filters, driver: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All Drivers</option><option>Logistics Team 1</option><option>Logistics Team 2</option>
                        </select>
                    </div>
                )}

                {needsStatus && (
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status Filter</label>
                        <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer">
                            <option>All</option><option>Pending</option><option>Completed</option><option>Processing</option><option>Failed</option>
                        </select>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 h-full flex flex-col bg-slate-50/50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">360° Report Generator</h2>
                    <p className="text-sm text-slate-500 mt-1">Select a report, configure parameters, and generate data exports.</p>
                </div>
            </div>

            {/* TOP WIZARD: Configuration Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col w-full">
                {/* Step 1: Categories Horizontal Tabs */}
                <div className="flex gap-2 p-2 px-4 overflow-x-auto no-scrollbar items-center border-b border-slate-100 bg-slate-50 rounded-t-2xl">
                    {reportCategories.map(cat => (
                        <button 
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                                activeCategory === cat.name 
                                    ? 'bg-red-600 text-white shadow-sm' 
                                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                        >
                            <Icon name={cat.icon} className="w-4 h-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                    {/* Step 2: Select Exact Report */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Select Report Type</label>
                        <select
                            value={activeReport?.id || ''}
                            onChange={(e) => {
                                const rep = reportCategories.find(c => c.name === activeCategory)?.reports.find(r => r.id === e.target.value);
                                setActiveReport(rep);
                                setReportData(null);
                            }}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-500 shadow-sm cursor-pointer hover:border-red-300 transition-colors"
                        >
                            <option value="" disabled>-- Select a Report --</option>
                            {reportCategories.find(c => c.name === activeCategory)?.reports.map(report => (
                                <option key={report.id} value={report.id}>{report.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Step 3: Dynamic Filters */}
                    {activeReport && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Configure Parameters</label>
                            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                {renderFilters()}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Action Buttons */}
                    {activeReport && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="flex-1 sm:flex-none px-8 py-3 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 shadow-md shadow-red-200 flex items-center justify-center gap-2 transition-all disabled:opacity-70 whitespace-nowrap"
                            >
                                {isGenerating ? <Icon name="RefreshCcw" className="w-5 h-5 animate-spin"/> : <Icon name="Play" className="w-5 h-5"/>}
                                {isGenerating ? 'Generating Data...' : 'Generate Report'}
                            </button>
                            {reportData && (
                                <button 
                                    onClick={handleExportCSV}
                                    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-100 flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap" 
                                    title="Export to Excel CSV"
                                >
                                    <Icon name="HardDriveUpload" className="w-5 h-5"/> Export CSV
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* DYNAMIC SUMMARY CARDS & TOTALS (Multi-Colour Modern) */}
            {reportData && !isGenerating && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    
                    {/* Primary Card: Total Records */}
                    <div className="bg-[#3b82f6] p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 text-white">
                        <div className="absolute right-[-10px] top-[-10px] opacity-20 text-white"><Icon name="List" className="w-20 h-20"/></div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1 relative z-10 opacity-90">Total Records Generated</p>
                        <h3 className="text-3xl font-black relative z-10">{reportData.length}</h3>
                    </div>

                    {/* Dynamic Metric Cards */}
                    {(() => {
                        const numericCols = activeReport?.columns.filter(col => 
                            col.includes('Amount') || col.includes('Sales') || col.includes('Cost') || col.includes('Profit') || 
                            col.includes('Value') || col.includes('Tax') || col === 'Debit' || col === 'Credit' || 
                            col.includes('Balance') || col === 'Revenue' || col === 'COGS' || col.includes('Qty') || col.includes('Count') || col.includes('Total')
                        ).slice(0, 3) || []; 

                        // Pre-defined solid vibrant modern colour palettes
                        const colorStyles = [
                            'bg-[#10b981]', // Emerald
                            'bg-[#8b5cf6]', // Purple
                            'bg-[#f59e0b]'  // Amber
                        ];

                        return numericCols.map((col, idx) => {
                            const sum = reportData.reduce((acc, row) => acc + (Number(row[col]) || 0), 0);
                            const isCurrency = col.includes('Amount') || col.includes('Sales') || col.includes('Cost') || col.includes('Profit') || col.includes('Value') || col.includes('Tax') || col === 'Debit' || col === 'Credit' || col.includes('Balance') || col === 'Revenue' || col === 'COGS' || col.includes('Total');
                            
                            const styleClass = colorStyles[idx % colorStyles.length];

                            return (
                                <div key={idx} className={`${styleClass} p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 text-white`}>
                                     <div className="absolute right-[-10px] top-[-10px] opacity-20 text-white">
                                         <Icon name={isCurrency ? "DollarSign" : "BarChart2"} className="w-20 h-20"/>
                                     </div>
                                     <p className="text-xs font-bold uppercase tracking-wider mb-1 relative z-10 line-clamp-1 opacity-90" title={`Total ${col}`}>Total {col}</p>
                                     <h3 className="text-3xl font-black relative z-10">
                                         {isCurrency ? sum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : sum.toLocaleString()}
                                     </h3>
                                </div>
                            );
                        });
                    })()}
                </div>
            )}

            {/* BOTTOM: Spreadsheet Preview Area */}
            <div className="flex-1 min-h-[400px] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative mt-2">
                
                {/* Table Header Bar */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between z-20 shadow-sm">
                    <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <Icon name="FileText" className="w-4 h-4 text-red-500 hidden sm:block"/> 
                        {activeReport ? activeReport.name : 'Data Preview'}
                    </h4>
                    {reportData && !isGenerating && (
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                            {reportData.length} Records
                        </span>
                    )}
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-auto custom-scrollbar relative bg-slate-100/50">
                    {/* Loading Overlay */}
                    {isGenerating && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                            <Icon name="RefreshCcw" className="w-10 h-10 text-red-500 animate-spin mb-4" />
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Extracting Data</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1 text-center px-4">Crunching numbers for {activeReport?.name}...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!reportData && !isGenerating && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-slate-200">
                                <Icon name="List" className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-black text-slate-700 mb-2">Ready to Generate</h3>
                            <p className="text-sm text-slate-500 max-w-sm">
                                {activeReport 
                                    ? `Configure your filters and click "Generate Report" to view the data.` 
                                    : `Select a report category and type to get started.`}
                            </p>
                        </div>
                    )}

                    {/* Rendered Table */}
                    {reportData && !isGenerating && (
                        <table className="min-w-full border-collapse bg-white">
                            <thead>
                                <tr>
                                    <th className="border-r border-b border-slate-200 bg-white text-slate-400 font-bold px-3 py-2 text-center text-[10px] w-12 sticky top-0 z-10 uppercase tracking-wider shadow-sm">#</th>
                                    {activeReport?.columns.map((col, idx) => (
                                        <th key={idx} className="border-r border-b border-slate-200 bg-white text-slate-600 font-bold px-5 py-3 text-left text-[11px] whitespace-nowrap sticky top-0 z-10 uppercase tracking-wider shadow-sm">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-red-50/60 transition-colors group">
                                        <td className="border-r border-b border-slate-100 bg-slate-50 text-slate-400 font-medium px-3 py-2 text-center text-xs group-hover:bg-red-100/50">{rowIdx + 1}</td>
                                        {activeReport?.columns.map((col, colIdx) => {
                                            const isNumeric = col.includes('Amount') || col.includes('Sales') || col.includes('Cost') || col.includes('Profit') || col.includes('Value') || col.includes('Tax') || col === 'Debit' || col === 'Credit' || col.includes('Balance') || col === 'Revenue' || col === 'COGS';
                                            const isStatus = col.includes('Status') || col.includes('Direction');
                                            return (
                                                <td key={colIdx} className={`border-r border-b border-slate-100 px-5 py-2.5 text-xs whitespace-nowrap ${
                                                    isNumeric ? 'text-right font-medium text-slate-800' : 'text-slate-600'
                                                }`}>
                                                    {isNumeric ? Number(row[col]).toLocaleString(undefined, {minimumFractionDigits: 2}) : 
                                                        isStatus ? (
                                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                            row[col] === 'Completed' || row[col] === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                            row[col] === 'Failed' ? 'bg-red-50 text-red-700 border border-red-200' :
                                                            row[col] === 'Pending' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-slate-50 text-slate-700 border border-slate-200'
                                                        }`}>{row[col]}</span>
                                                        ) : row[col]}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- SIDEBAR & LAYOUT ---
function Sidebar({ page, setPage, user, setUser, isMobileOpen, setMobileOpen, products }) {
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    const activeId = page[0];
    const newExpanded = {};
    const findPath = (items, targetId, path = []) => {
        for (const item of items) {
            if (item.id === targetId) return [...path, item.id];
            if (item.subItems) {
                const found = findPath(item.subItems, targetId, [...path, item.id]);
                if (found) return found;
            }
        }
        return null;
    };

    const allItems = menuSections.flatMap(s => s.items);
    const path = findPath(allItems, activeId);
    
    if (path) {
        path.forEach(id => {
            if (id !== activeId) newExpanded[id] = true;
        });
        setExpandedMenus(prev => ({ ...prev, ...newExpanded }));
    }
  }, [page]);

  const menuSections = [
    {
      title: "", 
      items: [
        { id: 'dashboard', label: 'Overview', icon: "BarChart2", roles: ['Admin', 'Picker', 'Warehouse Picker', 'Customer Service', 'Order CORDINATOR', 'MARKET COORDINATOR', 'Buyer'] },
      ]
    },
    {
      title: "PRODUCT MANAGEMENT",
      items: [
        {
          id: 'product_management',
          label: 'Products',
          icon: 'Boxes',
          roles: ['Admin', 'Buyer'],
          subItems: [
            { id: 'in_house_list', label: 'In-House Products' },
            { id: 'website_products', label: 'Website Products' },
            {
              id: 'vendor_products_request',
              label: 'Vendor Products Request',
              subItems: [
                { id: 'vendor_request', label: 'Vendor Request' },
                { id: 'list_vendor_product', label: 'List of Vendor Product' },
                { id: 'services_listing', label: 'Services Listing' }
              ]
            }
          ]
        }
      ]
    },
    {
      title: "PURCHASE MANAGEMENT",
      items: [
        { 
            id: 'purchase_management', 
            label: 'Purchase', 
            icon: "ShoppingBag", 
            roles: ['Buyer', 'Admin'],
            subItems: [
                 { id: 'buyerPo', label: 'Purchase Orders' },
                 { id: 'low_stock_report', label: 'Low Stock List', roles: ['Admin', 'Buyer'] },
                 { id: 'good_receive_note', label: 'Good Receive Note', roles: ['Admin', 'Buyer'] },
                 { id: 'purchase_return', label: 'Purchase Return', roles: ['Admin', 'Buyer'] }
            ]
        }
      ]
    },
    {
      title: "REPORTS",
      items: [
        {
          id: 'reports',
          label: 'Reports',
          icon: 'FileText',
          roles: ['Admin', 'Buyer', 'Manager']
        }
      ]
    }
  ];
  
  const toggleMenu = (id) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const NavItem = ({ item, depth = 0 }) => {
    const hasRole = !item.roles || item.roles.includes(user.role);
    if (!hasRole) return null;

    const hasChildren = item.subItems && item.subItems.length > 0;
    const isExpanded = !!expandedMenus[item.id];
    const isActive = page[0] === item.id;

    const iconStyle = isActive || isExpanded 
        ? 'bg-red-600 text-white shadow-sm' 
        : item.iconClass 
            ? item.iconClass 
            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200';

    if (item.id === 'dashboard') {
        return (
            <div className="mb-3 px-2">
                <button
                    onClick={() => { setPage([item.id]); setMobileOpen(false); }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 border border-transparent ${
                        isActive
                        ? 'bg-gradient-to-r from-red-100 to-blue-100 text-blue-900 border-blue-200 shadow-md' 
                        : 'bg-white border-slate-100 shadow-sm text-slate-700 hover:shadow-md hover:border-blue-100'
                    }`}
                >
                    <div className={`p-1.5 rounded-lg mr-3 transition-colors ${isActive ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm">{item.label}</span>
                </button>
            </div>
        );
    }

    return (
      <div className={`relative ${depth === 0 ? 'mb-3 px-2' : 'mb-0.5'}`}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id);
            } else {
              setPage([item.id]);
              setMobileOpen(false);
            }
          }}
          className={`
            relative group flex items-center w-full justify-between rounded-xl cursor-pointer transition-all duration-200
            ${depth === 0 
                ? 'px-4 py-3 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 hover:bg-slate-50' 
                : 'px-3 py-1.5 rounded-lg text-sm hover:text-slate-900'}
            ${isActive && !hasChildren 
                ? 'bg-gradient-to-r from-red-100 to-blue-100 text-blue-900 shadow-sm border-l-4 border-blue-600' 
                : ''}
            ${!isActive && depth === 0 ? 'text-slate-700' : ''}
            ${!isActive && depth > 0 ? 'text-slate-600 hover:bg-slate-50' : ''}
            ${isExpanded && depth === 0 ? 'bg-slate-50 ring-1 ring-slate-200 shadow-inner' : ''}
          `}
        >
          <div className="flex items-center flex-1">
            {depth === 0 && (
                <div className={`p-1.5 rounded-lg mr-3 transition-colors ${iconStyle}`}>
                    <Icon name={item.icon || 'Check'} className="w-5 h-5" />
                </div>
            )}
            
            <span className={`
                text-sm
                ${depth === 0 ? 'font-bold tracking-wide' : 'font-medium'}
                ${isActive ? 'font-bold' : ''}
            `}>
                {item.label}
            </span>

            {item.badge !== undefined && item.badge > 0 && (
                <span className={`ml-auto mr-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-sm ${item.badgeColor || 'bg-red-500'}`}>
                    {item.badge}
                </span>
            )}
          </div>
          {hasChildren && (
            <Icon name="ChevronDown" className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
          )}
        </button>
        
        {hasChildren && (
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="relative ml-4 pt-2 pb-2 pl-4 border-l border-slate-100">
                    {item.subItems.map((sub, index) => (
                        <div key={sub.id} className="relative pl-2">
                            <div className="absolute left-0 top-3.5 w-2 h-px bg-slate-200"></div>
                            <NavItem item={sub} depth={depth + 1} />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`fixed lg:static inset-y-0 left-0 w-[280px] bg-white border-r border-slate-100 z-30 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col font-sans`}>
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pb-4 pt-4">
          {menuSections.map((section, idx) => {
              const hasVisibleItems = section.items.some(item => !item.roles || item.roles.includes(user.role));
              if (!hasVisibleItems) return null;

              return (
                  <div key={idx} className="mb-2">
                      {section.title && (
                          <div className="flex items-center px-6 mb-2 mt-4">
                              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap mr-2">{section.title}</h3>
                              <div className="h-px bg-slate-200 flex-1"></div>
                          </div>
                      )}
                      <div>
                          {section.items.map(item => <NavItem key={item.id} item={item} />)}
                      </div>
                  </div>
              );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 flex justify-around text-slate-400">
            <button className="hover:text-slate-600"><Icon name="Expand" className="w-5 h-5"/></button>
            <button className="hover:text-slate-600"><Icon name="User" className="w-5 h-5"/></button>
            <button className="hover:text-slate-600"><Icon name="Home" className="w-5 h-5"/></button>
        </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [user, setUser] = useState({ name: 'Super Admin', role: 'Admin' });
  const [page, setPage] = useState(['dashboard']); 
  const [isMobileOpen, setMobileOpen] = useState(false);
  
  const [products, setProducts] = useState(initialProducts);

  const renderPage = () => {
    const pageId = page[0];
    switch (pageId) {
      case 'dashboard': return <div className="p-8"><h2 className="text-2xl font-black text-slate-800">Dashboard Overview</h2></div>;
      case 'in_house_list': return <div className="p-8">In-House Products List</div>;
      case 'website_products': return <div className="p-8">Website Products</div>;
      
      // Vendor Products Request Submenu Routes
      case 'vendor_request': return <VendorRequestPage products={products} setProducts={setProducts} />;
      case 'list_vendor_product': return <ListOfVendorProductPage products={products} setProducts={setProducts} />;
      case 'services_listing': return <ServicesListingPage />;

      case 'buyerPo': return <PurchaseOrderListPage />;
      case 'low_stock_report': return <LowStockListPage products={products} />;
      case 'good_receive_note': return <GoodReceiveNotePage />;
      case 'purchase_return': return <PurchaseReturnPage />;
      case 'reports': return <ReportsPage />;

      default: return <div className="p-8 text-center text-gray-500">Page: {pageId}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 font-sans text-slate-600">
      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMobileOpen(false)}></div>}
      <Sidebar page={page} setPage={setPage} user={user} setUser={setUser} isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} products={products} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-500"><Icon name="Menu" /></button>
              <div>
                  <h2 className="text-xl font-bold text-slate-800">Welcome Back, {user.name} <span className="ml-2 px-3 py-1 bg-gradient-to-r from-red-500 to-blue-600 text-white text-xs rounded-md font-bold uppercase tracking-wide shadow-sm">Portal</span></h2>
              </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}