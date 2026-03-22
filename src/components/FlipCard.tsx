import React from 'react';
import './FlipCard.css';

interface FlipCardProps {
  frontImage: string;
  backImage: string;
  alt?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage, alt = 'Profile' }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <img src={frontImage} alt={alt} className="flip-card-img" />
        </div>
        {/* BACK */}
        <div className="flip-card-back">
          <img src={backImage} alt={alt} className="flip-card-img" />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
