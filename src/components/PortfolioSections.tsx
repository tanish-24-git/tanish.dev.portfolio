import React from 'react';
import './PortfolioSections.css';

const sections = [
  { id: 'about',    title: 'About',    bgColor: '#000000', content: 'Passionate full-stack developer with a focus on creating beautiful and functional web experiences.' },
  { id: 'awards',   title: 'Awards',   bgColor: '#111111', content: 'Recognized for excellence in UI/UX design and technical innovation in web development.' },
  { id: 'blogs',    title: 'Blogs',    bgColor: '#1A1A1A', content: 'Sharing insights on modern web technologies, design patterns, and full-stack development.' },
  { id: 'project',  title: 'Project',  bgColor: '#222222', content: 'A collection of featured works ranging from complex web applications to elegant interfaces.' },
  { id: 'contacts', title: 'Contacts', bgColor: '#2D2D2D', content: "Let's build something amazing together. Reach out via email or connect on social platforms." },
];

const PortfolioSections = () => {
  return (
    <div className="portfolio-sections-container">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="portfolio-section"
          style={{ backgroundColor: section.bgColor }}
        >
          {/* ── Top bar ── */}
          <div className="section-top-bar">
            {/* left corner: vertical mini-label */}
            <div className="top-bar-corner">
              <span className="corner-label">{section.title.toLowerCase()}</span>
            </div>

            {/* right: big bold section title */}
            <div className="top-bar-title">
              <span className="first-letter">{section.title[0]}</span>
              {section.title.slice(1).toUpperCase()}
            </div>
          </div>

          {/* ── Body ── */}
          <div className="section-body">
            {/* left margin column (continues the vertical line) */}
            <div className="body-left-margin" />

            {/* actual content */}
            <div className="section-content">
              <h2 className="section-header">
                <span className="first-letter">{section.title[0]}</span>
                {section.title.slice(1)}
              </h2>
              <p className="section-description">{section.content}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PortfolioSections;
