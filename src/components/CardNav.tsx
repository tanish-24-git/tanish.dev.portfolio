import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './CardNav.css';

const items = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects", 
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#271E37", 
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const CardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Update IST time every minute
  useEffect(() => {
    const updateTime = () => {
      // Calculate Indian Standard Time (UTC+5:30)
      const now = new Date();
      // Format time safely
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      
      setTimeStr(`${formattedTime} IST`);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-nav-container">
      <motion.div 
        className={`card-nav ${isOpen ? 'open' : ''}`}
        initial={{ height: 60 }}
        animate={{ height: isOpen ? 340 : 60 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="card-nav-top">
          {/* Left: Hamburger menu */}
          <div 
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>

          {/* Center: Name/Logo */}
          <div className="logo-container">
            tanish.dev
          </div>

          {/* Right: IST Time Button */}
          <button className="card-nav-cta-button">
            {timeStr || 'Loading...'}
          </button>
        </div>
        
        {/* Dropdown Content */}
        <div className="card-nav-content">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="nav-card"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((link, j) => (
                  <a key={j} href="#" aria-label={link.ariaLabel} className="nav-card-link" style={{ color: item.textColor }}>
                    <ArrowIcon />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CardNav;
