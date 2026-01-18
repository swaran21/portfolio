import React, { useState, useEffect } from 'react';
import Omnitrix from './components/omnitrix/Omnitrix';
import SectionOverlay from './components/sections/SectionOverlay';
import SpaceBackground from './components/ui/SpaceBackground';
import GalvanJourney3D from './components/ui/GalvanJourney3D';
import CursorTrail from './components/ui/CursorTrail';
import GlitchTransition from './components/ui/GlitchTransition';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showGlitch, setShowGlitch] = useState(false);

  const handleTransform = (sectionId) => {
    // Trigger glitch transition
    setShowGlitch(true);
    
    // Set active section after glitch
    setTimeout(() => {
      setActiveSection(sectionId);
    }, 300);
  };

  const handleClose = () => {
    setShowGlitch(true);
    setTimeout(() => {
      setActiveSection(null);
    }, 300);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleGlitchComplete = () => {
    setShowGlitch(false);
  };

  if (isLoading) {
    return <GalvanJourney3D onJourneyComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 overflow-hidden font-sans selection:bg-green-500 selection:text-black">
      {/* Visual Effects */}
      <CursorTrail />
      <GlitchTransition isActive={showGlitch} onComplete={handleGlitchComplete} />
      
      {/* Space Environment Background */}
      <SpaceBackground />
      
      <main className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10">
        <Omnitrix onTransform={handleTransform} />
      </main>
      
      <SectionOverlay activeSection={activeSection} onClose={handleClose} />
    </div>
  );
};

export default App;
