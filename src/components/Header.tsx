'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  
  const ringColors: { color: string; style: string }[] = [
    { color: '#00BFFF', style: 'border-olympic-blue' },     // Brighter blue for better contrast
    { color: '#FFD700', style: 'border-olympic-yellow' },   // More vibrant gold yellow
    { color: '#FFFFFF', style: 'border-olympic-black' },    // White instead of black for visibility
    { color: '#32CD32', style: 'border-olympic-green' },    // Brighter lime green
    { color: '#FF1744', style: 'border-olympic-red' },      // More vibrant red
  ];

  return (
    <header className="text-center mb-10 py-5 relative">
      {/* Theme Toggle - positioned in top right */}
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <span className="text-white text-sm font-medium">
          {isDark ? '🌙' : '☀️'}
        </span>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-2.5 tracking-tight">
        Medal Count
      </h1>
      <div className="flex justify-center gap-1.5 sm:gap-2 my-5">
        {ringColors.map((ring, index) => (
          <div 
            key={index} 
            className={`olympic-ring sm:olympic-ring ${ring.style}`}
            style={{ borderColor: ring.color }}
          />
        ))}
      </div>
      <p className="text-base md:text-lg lg:text-xl text-white/90 font-light drop-shadow-sm">
        Olympic Medal Standings
      </p>
    </header>
  );
};

export default Header; 