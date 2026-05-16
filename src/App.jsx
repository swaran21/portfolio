import React, { useState } from 'react';
import AresBootScreen from './components/ares/AresBootScreen';
import AresHeader from './components/ares/AresHeader';
import AresHero from './components/ares/AresHero';
import AresProjects from './components/ares/AresProjects';
import AresIdentity from './components/ares/AresIdentity';
import AresStream from './components/ares/AresStream';
import AresFooter from './components/ares/AresFooter';
import './App.css';

const App = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [activeTab, setActiveTab] = useState('HERO');

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  const handleReboot = () => {
    setIsBooted(false);
    setActiveTab('HERO');
  };

  if (!isBooted) {
    return <AresBootScreen onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-background relative overflow-x-hidden pt-28 pb-12 selection:bg-primary selection:text-background font-body">
      
      {/* TRON World Fixed Environment Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <img 
          alt="TRON: Ares red world environment" 
          className="w-full h-full object-cover opacity-60" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5hToL5ipSoQJxk-FASvhg2pFYJqkYugF7Sx3vnSuAqx11sjkS-L44RIh4b2iq7GRfWAaBzbvOZ7F9lK45wSHZVm10I_DV-jaGSM2mFK6xZbkfdWcup_KKApJjl4wxWGNix8-8xWUyBj9PbOBMmGgsOm0sGckM_1F3ez8k34V1VTraSalpziaIHV-d4ElWbwuovY-mVVbDNsUH7QUzW8AuiTvhXJhNhud8e9OE-rWI-WUnUGxAiDjdOHCsvjAsbcB9PkHBCWVADyk"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"></div>
      </div>

      {/* High-Tech Grid Overlays & Glows */}
      <div className="absolute inset-0 circuit-grid pointer-events-none opacity-20 z-0"></div>
      <div className="absolute inset-0 scanline-static pointer-events-none z-0"></div>
      <div className="absolute inset-0 scanline pointer-events-none z-10"></div>
      
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Mainframe Header Navigation */}
      <AresHeader activeTab={activeTab} setActiveTab={setActiveTab} onReboot={handleReboot} />

      {/* Active Tab Viewport Section */}
      <main className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto transition-all duration-500 pt-8">
        
        {activeTab === 'HERO' && (
          <div className="animate-fade-in">
            <AresHero setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'PROJECTS' && (
          <div className="animate-fade-in">
            <AresProjects setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'IDENTITY' && (
          <div className="animate-fade-in">
            <AresIdentity setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'STREAM' && (
          <div className="animate-fade-in">
            <AresStream />
          </div>
        )}

      </main>

      {/* Footer Interface */}
      <AresFooter setActiveTab={setActiveTab} />
      
    </div>
  );
};

export default App;
