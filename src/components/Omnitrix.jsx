import React, { useState, useRef } from "react";
import anime from "animejs";
import { User, Code, Mail, FileText } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "About Me", icon: <User size={24} /> },
  { id: "projects", label: "Projects", icon: <Code size={24} /> },
  { id: "resume", label: "Resume", icon: <FileText size={24} /> },
  { id: "contact", label: "Contact", icon: <Mail size={24} /> },
];

const Omnitrix = ({ onTransform }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const dialRef = useRef(null);

  const handleMouseEnter = () => {
    setIsActive(true);
    anime({
      targets: dialRef.current,
      scale: 1.1,
      duration: 800,
      easing: "easeOutElastic(1, .8)",
    });
    anime({
      targets: ".icon-item",
      opacity: [0, 1],
      translateX: (el) => el.getAttribute("data-x"),
      translateY: (el) => el.getAttribute("data-y"),
      scale: [0, 1],
      delay: anime.stagger(50),
      duration: 600,
      easing: "easeOutBack",
    });
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    anime({
      targets: dialRef.current,
      scale: 1,
      duration: 500,
      easing: "easeOutQuad",
    });
    anime({
      targets: ".icon-item",
      opacity: 0,
      translateX: 0,
      translateY: 0,
      scale: 0,
      duration: 300,
      easing: "easeInQuad",
    });
  };

  const rotateDial = (newIndex) => {
    setSelectedIdx(newIndex);
    anime({
      targets: ".center-ring",
      rotate: "+=90deg",
      duration: 400,
      easing: "spring(1, 80, 10, 0)",
    });
  };

  const handleTransform = () => {
    anime({
      targets: dialRef.current,
      scale: 0.8,
      duration: 150,
      easing: "easeInQuad",
      complete: () => {
        anime({
          targets: ".flash-overlay",
          opacity: [0, 1, 0],
          duration: 1200,
          easing: "easeInOutQuad",
          begin: () => {
            setTimeout(() => onTransform(SECTIONS[selectedIdx].id), 400);
          },
        });
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-neutral-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="flash-overlay fixed inset-0 bg-[#39ff14] z-50 pointer-events-none opacity-0" />

      <div
        className="relative flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {SECTIONS.map((section, index) => {
            const total = SECTIONS.length;
            const angle = (index * (360 / total) - 90) * (Math.PI / 180);
            const radius = 160;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = index === selectedIdx;

            return (
              <div
                key={section.id}
                className={`icon-item absolute flex flex-col items-center justify-center w-24 pointer-events-auto cursor-pointer z-20`}
                data-x={x}
                data-y={y}
                style={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  rotateDial(index);
                }}
              >
                <div
                  className={`p-3 rounded-full border-2 transition-all duration-300 bg-black
                            ${
                              isSelected
                                ? "border-[#39ff14] text-[#39ff14] shadow-[0_0_15px_#39ff14]"
                                : "border-gray-700 text-gray-500 hover:border-gray-400"
                            }`}
                >
                  {section.icon}
                </div>
                <span
                  className={`mt-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300
                            ${
                              isSelected
                                ? "text-[#39ff14] drop-shadow-[0_0_5px_#39ff14]"
                                : "text-gray-600"
                            }`}
                >
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          ref={dialRef}
          onClick={handleTransform}
          className="w-64 h-64 rounded-full relative z-10 cursor-pointer transition-shadow duration-300 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 bg-neutral-900 rounded-full border-4 border-neutral-700 shadow-xl"></div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-neutral-800 border-x border-neutral-700"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-neutral-800 border-y border-neutral-700"></div>

          <div className="center-ring absolute inset-4 bg-black rounded-full border-[6px] border-neutral-600 flex items-center justify-center shadow-inner">
            <div className="w-32 h-32 clip-path-hourglass animate-pulse"></div>
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
            <p
              className={`text-[#39ff14] text-xs font-mono tracking-[0.2em] transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {isActive ? "SYSTEM: ACTIVE" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Omnitrix;
