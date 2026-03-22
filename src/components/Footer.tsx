import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="portfolio-footer">
      {/* ── Top Section (Dark) ── */}
      <div className="footer-top">
        <div className="footer-top-container">
          <h1 className="footer-huge-title">BUILDING SOMETHING BIG? I’M IN.</h1>

          <div className="footer-info-row">
            <div className="footer-info-left">
              <h2 className="footer-subtitle">
                From ideas to execution, I work on AI-driven systems that solve real problems.
              </h2>
              <p className="footer-description">
                Let’s collaborate and make it happen.
              </p>
            </div>
            
            <div className="footer-info-right">
              <div className="primary-contact-box">
                <span className="contact-label">PRIMARY CONTACT</span>
                <a href="mailto:tanishjagtap91@gmail.com" className="contact-email">
                  tanishjagtap91@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer-social-row">
            <div className="social-links-text">
              <a href="https://github.com/tanish-24-git" target="_blank" rel="noreferrer" className="social-text-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/tanish-jagtap/" target="_blank" rel="noreferrer" className="social-text-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LinkedIn ↗
              </a>
              <a href="mailto:tanishjagtap91@gmail.com" className="social-text-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Email ↗
              </a>
            </div>
            <div className="watermark-connect">CONNECT</div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section (Light) ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-top">
            <h2 className="footer-bottom-heading">
              Take a Look Around<br />
              Everything you need is just a click away.
            </h2>
            <div className="social-icon-circles">
              <a href="https://github.com/tanish-24-git" target="_blank" rel="noreferrer" className="circle-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/tanish-jagtap/" target="_blank" rel="noreferrer" className="circle-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="mailto:tanishjagtap91@gmail.com" className="circle-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          <div className="quick-links-grid">
            <a href="#hero" className="quick-link">Home</a>
            <a href="#blogs" className="quick-link">Blogs</a>
            <a href="#about" className="quick-link">About</a>
            <a href="#project" className="quick-link">Projects</a>
            <a href="#awards" className="quick-link">Awards</a>
            <a href="#contacts" className="quick-link">Contact</a>
          </div>

          <div className="footer-copyright-divider"></div>
          
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Tanish Jagtap</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
