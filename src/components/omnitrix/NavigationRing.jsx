import React from 'react';
import { cn } from '../../lib/utils';
import { Code, User, Brain, Mail, FileText } from 'lucide-react';

const NavigationRing = ({ isActive, activeIndex, masterControl }) => {
  const icons = [
    { id: 'projects', icon: Code, label: 'Projects' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Brain, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'resume', icon: FileText, label: 'Resume' },
  ];

  return (
    <div className={cn(
      "absolute w-[140%] h-[140%] rounded-full transition-all duration-500 pointer-events-none",
      isActive ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
    )}>
      {icons.map((item, index) => {
        // Position icons in a circle
        // We want index 0 to be at the top (0 degrees)
        const angle = (index * 360) / icons.length;
        const radius = 140; // Distance from center
        const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
        const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

        const isSelected = index === activeIndex;

        return (
          <div
            key={item.id}
            className={cn(
              "absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 flex items-center justify-center rounded-full transition-all duration-300",
              isSelected 
                ? (masterControl 
                    ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,255,255,0.8)] scale-125 z-10"
                    : "bg-green-500 text-black shadow-[0_0_20px_rgba(0,255,0,0.8)] scale-125 z-10")
                : (masterControl
                    ? "bg-gray-900 border border-cyan-500/30 text-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                    : "bg-gray-900 border border-green-500/30 text-green-500 shadow-[0_0_10px_rgba(0,255,0,0.2)]")
            )}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <item.icon size={isSelected ? 24 : 20} />
            
            {/* Label */}
            <span className={cn(
                "absolute -bottom-6 text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-opacity duration-300",
                isSelected 
                    ? (masterControl ? "opacity-100 text-cyan-400" : "opacity-100 text-green-400")
                    : "opacity-0"
            )}>
                {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationRing;
