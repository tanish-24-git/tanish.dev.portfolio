import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './NotFound404.css';

interface NotFound404Props {
  onGoHome: () => void;
  sectionName?: string;
}

const NotFound404 = ({ onGoHome, sectionName = 'this page' }: NotFound404Props) => {
  return (
    <div className="nf-root">
      {/* Giant background 404 */}
      <div className="nf-bg-text" aria-hidden="true">404</div>

      {/* Left content panel */}
      <div className="nf-left">
        <div className="nf-accent-line" />
        <div className="nf-left-content">
          <h1 className="nf-title">WOAHH.</h1>
          <p className="nf-subtitle">
            404 — Route not found.<br />
            Resources were allocated to higher-impact systems.<br />
            Let's redirect you accordingly.
          </p>
          <p className="nf-caption">(Honestly? {sectionName} is still in the works.)</p>
          <button className="nf-cta" onClick={onGoHome}>
            GET ME OUT OF HERE →
          </button>
        </div>
      </div>

      {/* Right: Lottie Animation */}
      <div className="nf-right">
        <DotLottieReact
          src="/cat-404.lottie"
          loop
          autoplay
          className="nf-lottie"
        />
      </div>
    </div>
  );
};

export default NotFound404;
