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
      <div className="cursor-pointer group flex items-center justify-center pt-8 pointer-events-auto" onClick={onOpen}>
        <div className="flex flex-col items-start gap-[5px] w-[24px] pointer-events-none">
          <div className="w-[18px] h-[2.5px] bg-[#61dca3] rounded-full self-end transition-all duration-300 group-hover:w-[24px]"></div>
          <div className="w-[24px] h-[2.5px] bg-[#61dca3] rounded-full transition-all duration-300 group-hover:bg-[#61dca3]/80"></div>
          <div className="w-[12px] h-[2.5px] bg-[#61dca3] rounded-full transition-all duration-300 group-hover:w-[18px]"></div>
        </div>
      </div>

      {/* Center Label */}
      <div className="sidebar-section-label">{activeSection}</div>

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
