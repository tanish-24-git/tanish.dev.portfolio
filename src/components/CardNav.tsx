import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './CardNav.css';

const items = [
  {
    label: "About",
    bgColor: "#000000",
    textColor: "#fff",
    links: [
      { label: "My Story", ariaLabel: "About My Story" },
      { label: "Skills", ariaLabel: "About Skills" }
    ]
  },
  {
    label: "Awards",
    bgColor: "#111111",
    textColor: "#fff",
    links: [
      { label: "Achievements", ariaLabel: "My Achievements" },
      { label: "Certifications", ariaLabel: "My Certifications" }
    ]
  },
  {
    label: "Blogs",
    bgColor: "#1A1A1A",
    textColor: "#fff",
    links: [
      { label: "Recent Posts", ariaLabel: "Recent Blog Posts" },
      { label: "Tech Talks", ariaLabel: "Technology Blogs" }
    ]
  },
  {
    label: "Project",
    bgColor: "#222222",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contacts",
    bgColor: "#2D2D2D",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];


const CardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Update IST time and detect screen size
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      
      setTimeStr(`${formattedTime} IST`);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateTime(); // initial call
    checkMobile(); // initial call
    
    const interval = setInterval(updateTime, 60000); // update every minute
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="card-nav-container">
      <motion.div 
        className={`card-nav ${isOpen ? 'open' : ''}`}
        initial={{ height: 60 }}
        animate={{ height: isOpen ? (isMobile ? 400 : 145) : 60 }}
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
            <a
              key={i}
              href={`#${item.label.toLowerCase()}`}
              className="nav-card"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-card-label">{item.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CardNav;
