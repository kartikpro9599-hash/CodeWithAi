import React from 'react';

const AdSlot = ({ className = '' }) => {
  return (
    <div className={`w-full bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center p-4 text-slate-400 text-sm ${className}`}>
      {/* 
        Google AdSense Placeholder 
        Replace this div with actual Google AdSense script tags later.
        e.g.,
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
      <div className="flex flex-col items-center">
        <span className="font-semibold text-slate-500 mb-1">Advertisement</span>
        <span className="text-xs">728 x 90 Leaderboard</span>
      </div>
    </div>
  );
};

export default AdSlot;
