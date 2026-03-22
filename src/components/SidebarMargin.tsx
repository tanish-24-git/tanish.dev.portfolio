import React, { useEffect, useState } from 'react';
import './SidebarMargin.css';

const sections = ['Home', 'About', 'Awards', 'Blogs', 'Project', 'Contacts'];

const SidebarMargin = () => {
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
      <div className="sidebar-section-label">{activeSection}</div>
      <div className="sidebar-line" />
    </div>
  );
};

export default SidebarMargin;
