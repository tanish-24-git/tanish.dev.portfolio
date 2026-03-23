import React, { useEffect, useState } from 'react';
import './SidebarMargin.css';

const sections = ['Home', 'About', 'Awards', 'Blogs', 'Project', 'Contacts'];

const SidebarMargin = ({ onOpen }: { onOpen?: () => void }) => {
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'awards', 'blogs', 'project', 'contacts'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const label = id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1);
            setActiveSection(label);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sidebar-margin">
      {/* Top Hamburger */}
      <div className="cursor-pointer group flex items-center justify-center pt-[18px]" onClick={onOpen}>
        <div className="relative w-9 h-9 md:w-12 md:h-12 rounded-full border border-white/10 flex flex-col items-end justify-center gap-[4px] md:gap-[5px] transition-all duration-500 group-hover:border-[#61dca3]/50 group-hover:bg-[#61dca3]/5 hover:shadow-[0_0_20px_rgba(97,220,163,0.15)] pr-[10px] md:pr-[14px]">
          <div className="w-[16px] md:w-[20px] h-[1.5px] md:h-[2px] bg-[#61dca3] rounded-full transition-all duration-400 group-hover:w-[22px] md:group-hover:w-[26px]"></div>
          <div className="w-[10px] md:w-[12px] h-[1.5px] md:h-[2px] bg-[#61dca3] rounded-full transition-all duration-400 group-hover:w-[22px] md:group-hover:w-[26px]"></div>
          <div className="w-[16px] md:w-[20px] h-[1.5px] md:h-[2px] bg-[#61dca3] rounded-full transition-all duration-400 group-hover:w-[12px] md:group-hover:w-[14px]"></div>
        </div>
      </div>

      {/* Center Label */}
      <div className="sidebar-section-label">{activeSection}</div>
      <div className="sidebar-line" />

      {/* Bottom Socials */}
      <div className="sidebar-socials">
        <span>Tw</span>
        <span>In</span>
        <span>Fb</span>
      </div>
    </div>
  );
};

export default SidebarMargin;
