import React from 'react';
import useSound from '../../hooks/useSound';

const AresHero = ({ setActiveTab }) => {
  const { playSound } = useSound();

  const handleAction = (tabId) => {
    setActiveTab(tabId);
    playSound('transform');
  };

  return (
    <div className="w-full">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden circuit-grid pt-12">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/90 z-0"></div>
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0"></div>
        
        <div className="relative z-10 text-center px-margin-mobile max-w-4xl">
          <div className="mb-6 inline-block px-4 py-1 border border-primary/40 bg-primary/5 font-mono text-xs text-primary uppercase tracking-[0.3em]">
            User: SAISW_ADMIN // Protocol: ACTIVE
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight text-on-surface uppercase">
            THE <span className="text-primary drop-shadow-[0_0_20px_rgba(255,84,75,0.8)]">GRID</span> REBORN
          </h1>
          
          <p className="max-w-2xl mx-auto text-on-surface-variant font-body text-base md:text-lg mb-12 opacity-85 leading-relaxed">
            Welcome to the high-fidelity digital mainframe. I engineer premium frontend interfaces, low-latency API architectures, and immersive cybernetic portfolios.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => handleAction('PROJECTS')}
              onMouseEnter={() => playSound('hover')}
              className="w-full sm:w-auto px-12 py-5 border border-primary text-primary font-label-caps text-xs tracking-[0.2em] bg-transparent hover:bg-primary hover:text-on-primary hover:glow-primary transition-all duration-300 group cursor-pointer flex items-center justify-center gap-2"
            >
              INITIALIZE_LOGS 
              <span className="material-symbols-outlined text-[16px] align-middle">terminal</span>
            </button>
            
            <button 
              onClick={() => handleAction('IDENTITY')}
              onMouseEnter={() => playSound('hover')}
              className="w-full sm:w-auto px-12 py-5 border border-white/10 text-on-surface font-label-caps text-xs tracking-[0.2em] hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              VIEW_DOSSIER
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
          <span className="font-label-caps text-[10px] text-primary mb-2 tracking-[0.2em]">SCROLL_DOWN</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* Grid Entry Transition */}
      <div className="h-32 bg-gradient-to-b from-background/90 to-surface-container-lowest/90 border-y border-primary/10 flex items-center justify-center overflow-hidden">
        <div className="whitespace-nowrap font-label-caps text-[10px] text-primary/30 tracking-[1em] animate-pulse">
          ARES_PROJECT_V.03 // SYSTEM_STATUS_OPTIMAL // GRID_UPLINK_STABLE // NO_DEREZZ_DETECTED
        </div>
      </div>

      {/* Active Protocols (Skills) - Bento Grid Style */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-label-caps text-xs text-primary block mb-3 tracking-[0.2em]">MODULE_02 // SPECIFICATION</span>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface leading-tight font-bold uppercase tracking-tight">ACTIVE_PROTOCOLS</h2>
          </div>
          <div className="font-body text-xs md:text-sm text-on-surface-variant max-w-md md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary/30 pl-4 md:pl-0 md:pr-6 leading-relaxed">
            Core technical competencies synchronized for scalable full-stack system architecture and visually striking visual designs.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Main Protocol Card */}
          <div className="md:col-span-8 glass-panel p-8 md:p-10 relative overflow-hidden group border border-primary/20">
            <div className="absolute top-4 right-4 font-label-caps text-[10px] text-primary/30">S/N: 883-CORE</div>
            <span className="material-symbols-outlined text-primary text-5xl mb-8">dynamic_form</span>
            
            <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-4 font-bold uppercase tracking-wide">NEURAL_INTERFACE_DESIGN</h3>
            
            <p className="text-on-surface-variant font-body text-sm md:text-base mb-8 max-w-xl leading-relaxed">
              Designing modular frontend layout systems, high-fidelity responsive user flows, and modern cyber-brutalist custom dashboards.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">UX_REMAP // REACT</span>
              <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">VISUAL_OVERLAY // TAILWIND</span>
              <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">GLITCH_MITIGATION</span>
            </div>
            
            <img 
              className="absolute -right-20 -bottom-20 w-1/2 opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1m6KIvBL5qBgWApnsxk7rg_PLF7nd3Y2t7oF3H8Yy4evjLhr4WsLuQY1J69eciHGRr1LTrKRd6v5TbSTRsaUEv377MADUsXxx-vH6itp5xEXxA4vNrXNcnxtgNVXGSE-bT3w2lYtLdhK6rgtV0fisMxXkzeP7D0JwkLAH6OwKxT0b9U02hSCqWxp7GW4HkpxwkdtqmHqzN9qnRfQI4V_kf-ePXzapGGb6iC785U2CEpBBvlROiIghow-uLZbMi3ntfTgSISvXr7U"
              alt="glowing red fiber optics"
            />
          </div>

          {/* Protocol Metric 1 */}
          <div className="md:col-span-4 glass-panel p-8 md:p-10 flex flex-col justify-between border border-primary/10">
            <div className="font-label-caps text-xs text-primary/60 mb-8">LATENCY_REDUCTION</div>
            <div>
              <div className="text-5xl md:text-6xl font-display font-bold text-primary leading-none mb-2">0.02ms</div>
              <p className="text-on-surface-variant font-body text-xs tracking-wider uppercase">OPTIMIZED_RESPONSE_TIME</p>
            </div>
            
            <div className="mt-8 space-y-2">
              <div className="h-1.5 bg-primary/10 w-full overflow-hidden">
                <div className="h-full bg-primary w-4/5 glow-sm"></div>
              </div>
              <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant">
                <span>BUFF_READY</span>
                <span>80%_LOAD</span>
              </div>
            </div>
          </div>

          {/* Protocol Sub Card 1 */}
          <div className="md:col-span-4 glass-panel p-8 border border-primary/10 hover:border-primary/40 transition-colors duration-300">
            <span className="material-symbols-outlined text-primary mb-6 text-3xl">memory</span>
            <h4 className="font-display text-lg text-on-surface font-bold mb-3 uppercase tracking-wider">SYNTHETIC_LOGIC</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Executing complex application state management through highly optimized reactive hooks and modular context engines.
            </p>
          </div>

          {/* Protocol Sub Card 2 */}
          <div className="md:col-span-4 glass-panel p-8 border border-primary/10 hover:border-primary/40 transition-colors duration-300">
            <span className="material-symbols-outlined text-primary mb-6 text-3xl">security</span>
            <h4 className="font-display text-lg text-on-surface font-bold mb-3 uppercase tracking-wider">SECURED_API_STREAMS</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Deploying military-grade encryption, secure session handshakes, and strict CORS visual telemetry systems.
            </p>
          </div>

          {/* Protocol Sub Card 3 */}
          <div className="md:col-span-4 glass-panel p-8 bg-primary/5 border border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">rocket_launch</span>
              </div>
              <span className="font-label-caps text-xs text-primary font-bold">PRIORITY_UPLINK</span>
            </div>
            <h4 className="font-display text-lg text-on-surface font-bold mb-3 uppercase tracking-wider">GRID_DEPLOYMENT</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Rapid pipeline compilation, containerized deployments, and globally distributed telemetry networks.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden my-16 border-y border-primary/20">
        <img 
          className="w-full h-full object-cover grayscale brightness-[0.35] contrast-125" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACM4U0lSQDYBHGE1OB3ehoBqxx3XuA4_LuPNIwZO3dv3G7TWRJbDCG89Z5O_1DAU8GeSkmhsfNOJlTZ_X3BztjujT6syoWq_IunVQ-tkGHtXaiyzucfSwT2FXHhFI_G1rgoVAf6JQ2mIt39xb83UcWtTWAx-vdH77j8oZ__V3-9ki4M6acV_hmBbLNuybcvHBerOAmtRcO9S118fYGxFhTDg2dPr2dJFH3jn5rEfWSL4yxeNqPxBKcn7bKHGmCI2cL_Y1p7rynqcM"
          alt="futuristic cyber city"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-margin-mobile">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-on-surface tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(255,84,75,0.4)]">
              SYSTEM_IMMERSED
            </h3>
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="w-2.5 h-2.5 bg-primary animate-pulse"></div>
              <div className="w-2.5 h-2.5 bg-primary/40"></div>
              <div className="w-2.5 h-2.5 bg-primary/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <section className="py-24 bg-surface-container-lowest/60 backdrop-blur-md border-y border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full circuit-grid opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-margin-mobile">
          <h2 className="font-display text-4xl md:text-6xl text-on-surface mb-8 tracking-tighter font-bold uppercase">
            JOIN_THE_FLUX
          </h2>
          
          <p className="font-body text-sm md:text-base text-on-surface-variant mb-12 opacity-80 leading-relaxed">
            Ready to integrate with the ARES protocol? Terminal communication channels are open for premium collaborative software ventures and high-performance network engineering.
          </p>
          
          <button 
            onClick={() => handleAction('STREAM')}
            onMouseEnter={() => playSound('hover')}
            className="px-16 py-6 border border-primary text-primary font-label-caps text-xs tracking-[0.3em] bg-transparent hover:bg-primary hover:text-on-primary hover:glow-primary transition-all duration-300 cursor-pointer"
          >
            UPLINK_NOW
          </button>
        </div>
      </section>
    </div>
  );
};

export default AresHero;
