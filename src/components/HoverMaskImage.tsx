import React, { useState, useRef } from 'react';
import './HoverMaskImage.css';

interface HoverMaskImageProps {
  baseImage: string;
  overlayImage: string;
}

const HoverMaskImage: React.FC<HoverMaskImageProps> = ({ baseImage, overlayImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div 
      className="hover-mask-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The non-hovered state (overlay image) */}
      <img src={overlayImage} alt="Overlay" className="mask-base-img" />
      
      {/* The hovered state revealed by mask (base image) */}
      <div 
        className="mask-reveal-layer"
        style={{
          WebkitMaskImage: isHovered 
            ? `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`
            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
          maskImage: isHovered 
            ? `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`
            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
        }}
      >
        <img src={baseImage} alt="Base Revealed" className="mask-revealed-img" />
      </div>
    </div>
  );
};

export default HoverMaskImage;
