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
      <div className="sidebar-hamburger" onClick={onOpen}>
        <div className="sidebar-hamburger-line line-1" />
        <div className="sidebar-hamburger-line line-2" />
        <div className="sidebar-hamburger-line line-3" />
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
