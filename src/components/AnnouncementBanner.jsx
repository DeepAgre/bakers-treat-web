import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div 
      className="w-full h-[40px] flex items-center justify-center border-none relative overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white m-0 leading-none text-center px-4">
        ✨ 24-Hour Notice Required • <span style={{ color: '#E89EB8' }}>Handcrafted in Thane</span> ✨
      </p>
    </div>
  );
};

export default AnnouncementBanner;