import React from 'react';
import { Database, Code, Settings, Binary, Network, Cpu } from 'lucide-react';

const TechGlobe = () => {
  // Define orbital paths for logos with more dynamic configurations
  const orbits = [
    { radius: 120, duration: 20, offset: 0, color: '#FF6B6B' },
    { radius: 160, duration: 25, offset: 60, color: '#4ECDC4' },
    { radius: 200, duration: 30, offset: 120, color: '#45B7D1' }
  ];

  // Tech logos with their configurations and unique colors
  const techLogos = [
    { icon: Database, orbit: 0, color: '#FF6B6B', glowColor: '#FF6B6B33' },
    { icon: Code, orbit: 1, color: '#4ECDC4', glowColor: '#4ECDC433' },
    { icon: Settings, orbit: 2, color: '#45B7D1', glowColor: '#45B7D133' },
    { icon: Binary, orbit: 0, color: '#FFE66D', glowColor: '#FFE66D33' },
    { icon: Network, orbit: 1, color: '#FF9F1C', glowColor: '#FF9F1C33' },
    { icon: Cpu, orbit: 2, color: '#A64AC9', glowColor: '#A64AC933' }
  ];

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg
        viewBox="-250 -250 500 500"
        className="w-full h-full max-w-xl"
      >
        {/* Orbital paths with gradient strokes */}
        {orbits.map((orbit, index) => (
          <circle
            key={`orbit-${index}`}
            cx="0"
            cy="0"
            r={orbit.radius}
            fill="none"
            stroke={`url(#orbit-gradient-${index})`}
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
          />
        ))}

        {/* Enhanced 3D Globe */}
        <g>
          {/* Base globe sphere with realistic gradient */}
          <circle
            cx="0"
            cy="0"
            r="100"
            fill="url(#globe-gradient)"
            filter="url(#glow)"
            className="opacity-90"
          />
          
          {/* Latitude lines for 3D effect */}
          {Array.from({ length: 8 }).map((_, index) => (
            <ellipse
              key={`lat-${index}`}
              cx="0"
              cy="0"
              rx="100"
              ry={15 + index * 12}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="0.5"
              className="opacity-30"
            />
          ))}

          {/* Longitude lines for enhanced 3D effect */}
          {Array.from({ length: 12 }).map((_, index) => (
            <path
              key={`long-${index}`}
              d={`M ${100 * Math.cos(index * Math.PI / 6)} ${100 * Math.sin(index * Math.PI / 6)} 
                 A 100 100 0 0 1 ${100 * Math.cos((index + 6) * Math.PI / 6)} ${100 * Math.sin((index + 6) * Math.PI / 6)}`}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="0.5"
              className="opacity-30"
            />
          ))}
        </g>

        {/* Orbiting tech logos with enhanced effects */}
        {techLogos.map((tech, index) => {
          const orbit = orbits[tech.orbit];
          return (
            <g key={`tech-${index}`}>
              {/* Animated connecting line with gradient */}
              <line
                x1="0"
                y1="0"
                x2={orbit.radius * Math.cos((index * 60 + orbit.offset) * Math.PI / 180)}
                y2={orbit.radius * Math.sin((index * 60 + orbit.offset) * Math.PI / 180)}
                stroke={`url(#line-gradient-${index})`}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-60"
              />
              
              {/* Animated logo container */}
              <g className={`animate-spin-slow-${orbit.duration}`}>
                <g
                  transform={`rotate(${index * 60 + orbit.offset}) translate(${orbit.radius}, 0)`}
                >
                  {/* Background circle with glow effect */}
                  <circle
                    r="22"
                    fill={tech.glowColor}
                    filter="url(#glow)"
                    className="opacity-90"
                  />
                  <circle
                    r="20"
                    fill="rgba(17, 24, 39, 0.8)"
                    className="opacity-90"
                  />
                  <g transform="translate(-12, -12)">
                    {React.createElement(tech.icon, {
                      size: 24,
                      color: tech.color,
                      className: "animate-pulse"
                    })}
                  </g>
                </g>
              </g>
            </g>
          );
        })}

        {/* Enhanced gradients and filters */}
        <defs>
          {/* Main globe gradient */}
          <radialGradient id="globe-gradient">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
          </radialGradient>

          {/* Line gradient for latitude/longitude */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>

          {/* Orbit path gradients */}
          {orbits.map((orbit, index) => (
            <linearGradient
              key={`orbit-gradient-${index}`}
              id={`orbit-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={orbit.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={orbit.color} stopOpacity="0.1" />
            </linearGradient>
          ))}

          {/* Connecting line gradients */}
          {techLogos.map((tech, index) => (
            <linearGradient
              key={`line-gradient-${index}`}
              id={`line-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={tech.color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={tech.color} stopOpacity="0.2" />
            </linearGradient>
          ))}

          {/* Glow effect filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animation keyframes */}
        <style>
          {`
            @keyframes spin-slow-20 {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-slow-25 {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-slow-30 {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow-20 {
              animation: spin-slow-20 20s linear infinite;
            }
            .animate-spin-slow-25 {
              animation: spin-slow-25 25s linear infinite;
            }
            .animate-spin-slow-30 {
              animation: spin-slow-30 30s linear infinite;
            }
          `}
        </style>
      </svg>
    </div>
  );
};

export default TechGlobe;