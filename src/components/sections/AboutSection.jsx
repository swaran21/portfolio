import React from 'react';
import { User, MapPin, Calendar, Shield, Award, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

const AboutSection = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* LEFT COLUMN: ID CARD & VITALS */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        {/* ID CARD */}
        <div className="relative p-1 bg-green-900/20 border border-green-500/30 rounded-lg backdrop-blur-md overflow-hidden">
            {/* Holographic scanning line effect */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-scanline" style={{ height: '200%' }}></div>
            
            <div className="relative z-10 bg-black/40 p-6 flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full border-4 border-green-500/30 p-1 mb-6 relative group">
                    <div className="absolute inset-0 rounded-full border border-green-500 animate-spin-slow opacity-50"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>
                
                <h2 className="text-3xl font-black uppercase text-green-100 mb-1">Ben Tennyson</h2>
                <p className="text-green-500 font-mono text-sm tracking-widest mb-6">PLUMBER RANK: MAGISTER</p>
                
                <div className="w-full grid grid-cols-2 gap-4 text-left text-xs font-mono border-t border-green-500/30 pt-4 text-green-400/80">
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">ID Number</span>
                        <span className="text-green-100">10-10-10</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">Clearance</span>
                        <span className="text-green-100">LEVEL 5</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">Species</span>
                        <span className="text-green-100">HUMAN</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">Home World</span>
                        <span className="text-green-100">EARTH</span>
                    </div>
                </div>
            </div>
        </div>

        {/* STATUS MODULE */}
        <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg">
             <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
                <Shield size={18} /> Active Status
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono text-green-300">
                    <span>Mission Readiness</span>
                    <span>100%</span>
                </div>
                <div className="h-1.5 w-full bg-green-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full animate-pulse"></div>
                </div>

                <div className="flex justify-between text-xs font-mono text-green-300">
                    <span>Omnitrix Sync</span>
                    <span>STABLE</span>
                </div>
                <div className="h-1.5 w-full bg-green-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%]"></div>
                </div>
             </div>
        </div>
      </div>


      {/* RIGHT COLUMN: BIO & STATS */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* BIO MODULE */}
        <div className="p-8 bg-black/40 border border-green-500/30 rounded-lg backdrop-blur relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-20">
                 <User size={120} className="text-green-500" />
             </div>
             
             <h3 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-green-500 block"></span>
                Personnel Bio
             </h3>
             
             <div className="space-y-4 text-green-300/90 text-lg leading-relaxed font-sans">
                 <p>
                     Full stack developer with a passion for building intergalactic web applications. 
                     Like the Omnitrix, I adapt to any challenge—whether it's frontend architecture, 
                     backend systems, or alien invasions.
                 </p>
                 <p>
                     Specialized in the React ecosystem ("Upgrade"), high-performance Node.js APIs ("XLR8"), 
                     and robust system architecture ("Diamondhead"). Committed to protecting the codebase 
                     from bugs and maintaining universal order.
                 </p>
             </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg relative hover:bg-green-500/5 transition-colors">
                <Target className="absolute top-4 right-4 text-green-500/20" size={40} />
                <h4 className="font-bold text-green-100 uppercase mb-2">Core Objective</h4>
                <p className="text-sm text-green-400/70">
                    To engineer scalable solutions that solve universal problems.
                </p>
            </div>
            
            <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg relative hover:bg-green-500/5 transition-colors">
                <Award className="absolute top-4 right-4 text-green-500/20" size={40} />
                <h4 className="font-bold text-green-100 uppercase mb-2"> Achievements</h4>
                <p className="text-sm text-green-400/70">
                    Saved the production database 50+ times.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
