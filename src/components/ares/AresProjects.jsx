import React, { useState } from 'react';
import useSound from '../../hooks/useSound';

const AresProjects = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'neural-dashboard',
      title: 'NEURAL_DASHBOARD_vX',
      serial: '001-ALPHA',
      stack: 'RUST / WEBASSEMBLY / TAILWIND / REACT',
      status: 'PROTOCOL: ACTIVE',
      date: '2024.Q3',
      description: 'A high-intensity data visualization mainframe designed for monitoring low-latency network nodes. Integrates Rust-compiled telemetry parsers with highly-optimized React dashboards to sustain 120 FPS rendering updates under intense traffic flows.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAES9eO4oH_dtlxl4lTwW16uOiP5oXXVjBp8F1CtgL6pR1KLgHhy9dWxOm4ftnKYwJazFgJiasFSGq8rQKvgEeJ_0cd3d-rEQ92Ub5nPSpVwKn6B9u7KyKfDYQJXJfRkjDVuUoj0MtH3RDZ_tKsRTnYQA5Wip3fvARgiozYNzMHaBRvyEvMY6Cyu__7g0h0lvsAd1p5DdPLe09CYyDo-HT_kBCIOsyZ6WZOIeIw0tj5wOw29MHWYtnawcmNil3FOFcdWNXeEnsTkrI',
      gridClass: 'md:col-span-8',
      features: ['Rust Telemetry Engine', 'WebAssembly Sync Node', '120fps Canvas Rendering', 'Obsidian Glass Layout']
    },
    {
      id: 'void-os',
      title: 'VOID_OS',
      serial: '002-BETA',
      stack: 'TYPESCRIPT / NEXTJS / NODEJS',
      status: 'STATUS: DEPLOYED',
      date: '2024.Q2',
      description: 'A minimalist server administration dashboard configured to monitor deep telemetry parameters. Provides remote shell control and real-time process monitoring layers secured through military-grade AES-256 session handshakes.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAzAdvdgaB2mcWl4TDzrjsEsFnWPoBgfEiYPkZmtxPDr5-nmUoRKXh8UlGd769iFuOtqkamVBTlmpU6n7qW4JOGIiSWK1Zynjn50GuIF7iPwi-LHvR1E4aQ6wT7WTniv0HArOJlT9CEuaE0haB9dQPqw__QlEtD4sOZXrnT01mWsLwBaaYJW9U58LofjcOuJvymWVgf5KSn7JCh_FqGQ1-ZCcDVxY-ExX6WmCrw6Qz8ImbooPD_fIIJ6-FRpdpnQxO1zudVUfc9G4',
      gridClass: 'md:col-span-4',
      features: ['Remote Mainframe Socket', 'Interactive Shell Overlay', 'AES-256 Key Exchange', 'System Profiler Grid']
    },
    {
      id: 'kinetic-flow',
      title: 'KINETIC_FLOW',
      serial: '003-GAMMA',
      stack: 'THREEJS / GLSL / WEBAUDIO',
      status: 'STATUS: ARCHIVED',
      date: '2024.Q1',
      description: 'Generative audio-reactive 3D motion engine running custom shader programs. Designed to dynamically synthesize visual patterns synchronized perfectly with hardware Web Audio synthesizer triggers.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtGDYETwTEx7R8kxco4zskj4A83yo5AbmBAl174yO7_2YlA_mEKNALbFYlH_zcznw6zFeb6QsKfrT_1lguihyKVqEusl2CuYFsWHdcjXvgR-KSa_4aH5VaCTgv09QZ3LC4xFgkU8G1ggqEg8r-ZBlAyfRGZZRk0fc2FPYrbPSrpN-jyQLLOk9awAy0POrlprq772xEF36uEEptOBsqfAZBHA6fQ9LHgfIMNOBsGx06Owj2hTQOgPbVu1IYPTb_Ttpn16p1yjOYR-8',
      gridClass: 'md:col-span-4',
      features: ['GLSL Fragment Shaders', 'Dynamic Vector Fields', 'Web Audio Synthesizer', 'Volumetric Fog Rendering']
    },
    {
      id: 'obsidian-core',
      title: 'OBSIDIAN_CORE',
      serial: '004-DELTA',
      stack: 'GO / KUBERNETES / GRAPHQL',
      status: 'STATUS: ACTIVE',
      date: '2023.ANNUAL',
      description: 'The secure distributed database clustering framework backing ARES. Performs automatic data chunking and ledger integrity verification across globally replicated nodes using a zero-trust consensus layout.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmbZ190Uh8UvHgQEYuSb_dyTT8lea7wKSOejpA_iRiRTFYITfNiBJgW_XgaltoXUZDnHxZiCu0A1piHgqX9oePokFU0c0_40IYHhhjuRfNrh0t9D4mEE87BYCx6JZTHmjWkK8lO01dqhVe1vycf_UPHyiFVaXiMt781xLcRSIdpYy2OWDTxhb5AhjTQuejKhJJOm3kyxIih--ocGEGWBJFh4MFd8a2OheFM192CXFtt9tr41OUm_qJ6zvhD-zeZXIdD7tN63qYniw',
      gridClass: 'md:col-span-8',
      features: ['Go Microservices', 'GraphQL Node Network', 'Consensus Auto-Scaling', 'Decentralized Key Storage']
    }
  ];

  const openProject = (proj) => {
    setSelectedProject(proj);
    playSound('transform');
  };

  const closeProject = () => {
    setSelectedProject(null);
    playSound('tick');
  };

  return (
    <div className="w-full relative">
      {/* AGGRESSIVE HEADER */}
      <header className="mb-20 max-w-container-max mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-primary"></span>
          <span className="font-body text-xs text-primary uppercase tracking-[0.4em]">SYSTEM_ARCHIVE_v4.0</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-on-surface uppercase mb-6">
          PROJECT ARCHIVE
        </h1>
        <p className="max-w-2xl font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
          A high-intensity collection of engineered digital architectures, telemetry interfaces, and distributed mainframe protocols developed under my ARES initiative.
        </p>
      </header>

      {/* BENTO PROJECT GRID */}
      <section className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => openProject(proj)}
            onMouseEnter={() => playSound('hover')}
            className={`group cursor-pointer relative overflow-hidden glass-panel border border-primary/20 p-6 md:p-8 hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,84,75,0.15)] flex flex-col justify-between ${proj.gridClass}`}
          >
            <div className="absolute top-0 right-0 p-4 font-label-caps text-[10px] text-primary/40">
              SERIAL: {proj.serial}
            </div>

            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-6 overflow-hidden border border-primary/10 aspect-video">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    src={proj.image}
                    alt={proj.title}
                  />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 bg-primary-container/20 text-primary border border-primary/20 font-label-caps text-[10px] uppercase">
                    {proj.status}
                  </span>
                  <span className="font-body text-xs text-primary">{proj.date}</span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                
                <p className="font-body text-xs text-on-surface-variant line-clamp-2 md:line-clamp-3 mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 font-body text-[11px] text-on-surface-variant border-t border-primary/10 pt-4 items-center">
                <span className="uppercase text-[10px] tracking-wider text-primary/70">{proj.stack}</span>
                <span className="ml-auto flex items-center gap-2 group-hover:text-primary transition-colors">
                  DECODE_METRICS <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </div>
            
            <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
          </div>
        ))}
      </section>

      {/* REQUEST ACCESS / CTA */}
      <section className="mt-24 flex flex-col items-center gap-8 max-w-container-max mx-auto border-t border-primary/10 pt-20">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface tracking-[0.2em] uppercase">
          ESTABLISH_NEW_UPLINK?
        </h2>
        
        <div className="flex gap-6">
          <button
            onClick={() => {
              setActiveTab('STREAM');
              playSound('transform');
            }}
            onMouseEnter={() => playSound('hover')}
            className="border border-primary bg-primary text-background px-10 py-4 font-label-caps text-xs tracking-widest glow-red hover:shadow-[0_0_25px_rgba(255,84,75,0.6)] transition-all active:scale-95 cursor-pointer"
          >
            UPLINK_TERMINAL
          </button>
          
          <button
            onClick={() => {
              setActiveTab('IDENTITY');
              playSound('tick');
            }}
            onMouseEnter={() => playSound('hover')}
            className="border border-on-surface-variant text-on-surface-variant px-10 py-4 font-label-caps text-xs tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95 cursor-pointer"
          >
            LOGS_DOSSIER
          </button>
        </div>
      </section>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="absolute inset-0 scanline pointer-events-none"></div>
          
          <div className="w-full max-w-3xl glass-panel relative p-8 md:p-10 border border-primary/30 glow-red overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="font-label-caps text-[10px] text-primary/60 mb-2">
              DECODED // PROJECT_DOSSIER: {selectedProject.serial}
            </div>

            <h2 className="font-display text-3xl font-bold text-primary mb-6 uppercase tracking-wider">
              {selectedProject.title}
            </h2>

            <div className="border border-primary/10 overflow-hidden mb-6 aspect-video max-h-[300px]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-label-caps text-xs text-primary/80 tracking-wider">SYSTEM_LOGS_DOSSIER</h4>
                <p className="font-body text-sm text-on-surface/85 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-4 bg-primary/5 p-4 border border-primary/10">
                <h4 className="font-label-caps text-xs text-primary tracking-wider">BUILT_SPECIFICATIONS</h4>
                <ul className="space-y-2 font-body text-xs text-on-surface-variant">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-primary/10 pt-6">
              <span className="font-body text-xs text-primary/70 self-center">
                COMPILED_ON: {selectedProject.date}
              </span>
              
              <button
                onClick={closeProject}
                className="sm:ml-auto w-full sm:w-auto px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-background font-label-caps text-xs tracking-wider transition-all duration-300"
              >
                RETURN_TO_ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AresProjects;
