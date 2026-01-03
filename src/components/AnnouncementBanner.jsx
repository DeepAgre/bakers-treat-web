import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div 
      className="w-full h-[40px] fixed top-0 left-0 text-center flex items-center justify-center z-[110] border-none"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-white m-0 leading-none">
        ✨ 24-Hour Notice Required • <span style={{ color: '#E89EB8' }}>Handcrafted in Thane</span> ✨
      </p>
    </div>
  );
};

export default AnnouncementBanner;