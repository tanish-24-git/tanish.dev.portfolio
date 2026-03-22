import React from 'react';
import './PortfolioSections.css';
import ScrambledText from './ScrambledText';
import './ScrambledText.css';
import FlipCard from './FlipCard';
import ScrollingLogos from './ScrollingLogos';
import './ScrollingLogos.css';

const sections = [
  { id: 'about',    title: 'About',    bgColor: '#000000', content: 'Passionate full-stack developer with a focus on creating beautiful and functional web experiences.' },
  { id: 'awards',   title: 'Awards',   bgColor: '#111111', content: 'Recognized for excellence in UI/UX design and technical innovation in web development.' },
  { id: 'blogs',    title: 'Blogs',    bgColor: '#1A1A1A', content: 'Sharing insights on modern web technologies, design patterns, and full-stack development.' },
  { id: 'project',  title: 'Project',  bgColor: '#222222', content: 'A collection of featured works ranging from complex web applications to elegant interfaces.' },
  { id: 'contacts', title: 'Contacts', bgColor: '#2D2D2D', content: "Let's build something amazing together. Reach out via email or connect on social platforms." },
];

const PortfolioSections = ({ currentView = 'home' }: { currentView?: string }) => {
  const visibleSections = sections.filter((section) => {
    if (currentView === 'home') {
      return section.id === 'about' || section.id === 'contacts';
    }
    return section.id === currentView;
  });

  return (
    <div className="portfolio-sections-container">
      {visibleSections.map((section) => (
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
            <div className="body-left-margin">
              <ScrollingLogos />
            </div>

            {/* actual content */}
            <div className="section-content">
              {section.id === 'about' ? (
                <div className="about-grid">
                  <div className="about-text-column">
                    <ScrambledText className="scrambled-text-demo" radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
                      Hi, I’m Tanish Jagtap an AI & Data Science student passionate about artificial intelligence, machine learning, and intelligent systems.
                    </ScrambledText>
                    <ScrambledText className="scrambled-text-demo" radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
                      My interests lie in exploring advanced AI systems, deep learning, and the intersection of artificial intelligence with quantum computing. I’m particularly focused on understanding how machine learning models work, how they can be optimized, and how they can be applied to solve real-world problems.
                    </ScrambledText>
                    <ScrambledText className="scrambled-text-demo" radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
                      I actively study AI concepts, read research, and experiment with building intelligent systems to deepen my understanding of artificial intelligence and data-driven technologies. This combination of practical development and continuous learning helps me approach problems with a strong foundation in both theory and application.
                    </ScrambledText>
                    <ScrambledText className="scrambled-text-demo" radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
                      I aim to contribute to the future of AI by exploring innovative ideas, improving system efficiency, and building impactful intelligent solutions.
                    </ScrambledText>
                    
                    {/* Resume Section */}
                    <div className="resume-section">
                      <h3 className="resume-heading">Here’s a link to my résumé.</h3>
                      <a 
                        href="https://drive.google.com/file/d/19SQZPEm0zcmAsnQ4A5xcU_0JiayEUn6h/view?usp=sharing" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="resume-link"
                      >
                        My Résumé <span className="resume-arrow">↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="about-media-column" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                    <FlipCard
                      frontImage="/about/overlay.png"
                      backImage="/about/base.jpeg"
                      alt="Tanish Jagtap"
                    />
                  </div>
                </div>
              ) : section.id === 'contacts' ? (
                <div className="contact-section">
                  <div className="contact-heading-row">
                    <h2 className="contact-main-title">
                      GET IN TOUCH WITH ME<span className="contact-dot">.</span>
                    </h2>
                  </div>
                  <div className="contact-links">
                    <a
                      href="https://www.linkedin.com/in/tanish-jagtap/"
                      target="_blank"
                      rel="noreferrer"
                      className="contact-link-row"
                    >
                      <span className="contact-link-name">LINKEDIN</span>
                      <span className="contact-link-desc">Connect with me professionally ↗</span>
                    </a>
                    <a
                      href="https://github.com/tanish-24-git"
                      target="_blank"
                      rel="noreferrer"
                      className="contact-link-row"
                    >
                      <span className="contact-link-name">GITHUB</span>
                      <span className="contact-link-desc">Explore my open-source projects ↗</span>
                    </a>
                    <a
                      href="mailto:tanishjagtap24@gmail.com"
                      className="contact-link-row"
                    >
                      <span className="contact-link-name">GMAIL</span>
                      <span className="contact-link-desc">Reach out to me via email for collaborations or inquiries ↗</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="section-header">
                    <span className="first-letter">{section.title[0]}</span>
                    {section.title.slice(1)}
                  </h2>
                  <p className="section-description">{section.content}</p>
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PortfolioSections;
