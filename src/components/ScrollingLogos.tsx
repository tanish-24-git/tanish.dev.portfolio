import React from 'react';
import './ScrollingLogos.css';

const logos = [
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/white' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'React', url: 'https://cdn.simpleicons.org/react/white' },
  { name: 'TensorFlow', url: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'Keras', url: 'https://cdn.simpleicons.org/keras/white' },
  { name: 'OpenCV', url: 'https://cdn.simpleicons.org/opencv/white' },
  { name: 'PyTorch', url: 'https://cdn.simpleicons.org/pytorch/white' },
  { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/white' },
  { name: 'Qiskit', url: 'https://cdn.simpleicons.org/qiskit/white' },
  { name: 'Jupyter', url: 'https://cdn.simpleicons.org/jupyter/white' },
  { name: 'C++', url: 'https://cdn.simpleicons.org/cplusplus/white' },
];

const ScrollingLogos = () => {
  // Duplicate the list to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="scrolling-logos-container">
      <div className="logos-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="logo-item">
            <img src={logo.url} alt={logo.name} title={logo.name} className="tech-logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingLogos;
