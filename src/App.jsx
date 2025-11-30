import React from 'react';
import Omnitrix from './components/omnitrix/Omnitrix';
import SectionOverlay from './components/sections/SectionOverlay';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = React.useState(null);

  const handleTransform = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleClose = () => {
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 overflow-hidden font-sans selection:bg-green-500 selection:text-black">
      <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Omnitrix onTransform={handleTransform} />
      </main>
      
      <SectionOverlay activeSection={activeSection} onClose={handleClose} />
    </div>
  );
};

export default App;
