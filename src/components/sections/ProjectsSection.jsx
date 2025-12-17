import React from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock Data - Replace with real projects
const projects = [
  {
    id: 'ALN-001',
    title: 'Project Heatblast',
    type: 'Web Application',
    description: 'A high-performance React dashboard with real-time data visualization and thermal analytics.',
    tech: ['React', 'Firebase', 'Tailwind'],
    status: 'UNLOCKED',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'ALN-002',
    title: 'Project XLR8',
    type: 'API Service',
    description: 'Lightning fast Node.js backend handling thousands of requests per second for logistics tracking.',
    tech: ['Node.js', 'Redis', 'Docker'],
    status: 'UNLOCKED',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'ALN-003',
    title: 'Project Upgrade',
    type: 'AI Tool',
    description: 'An AI-powered code refactoring tool that enhances legacy systems with modern patterns.',
    tech: ['Python', 'TensorFlow', 'OpenAI'],
    status: 'UNLOCKED',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
  }
];

const ProjectsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <div 
          key={project.id}
          className="group relative bg-green-900/10 border border-green-500/30 rounded-xl overflow-hidden backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Image / Preview Area */}
          <div className="h-48 overflow-hidden relative border-b border-green-500/30">
            <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
            />
            
            {/* ID Badge */}
            <div className="absolute top-2 right-2 z-20 bg-black/80 border border-green-500/50 px-2 py-1 text-xs font-mono text-green-400">
                {project.id}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold uppercase tracking-wide text-green-100 group-hover:text-green-400 transition-colors">
                    {project.title}
                </h3>
                <Code2 size={20} className="text-green-500/50" />
            </div>
            
            <p className="text-green-400/70 text-sm mb-4 font-mono leading-relaxed h-20 overflow-hidden">
                {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-bold uppercase border border-green-500/30 bg-green-500/10 rounded text-green-300">
                        {t}
                    </span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/10 hover:bg-green-500 hover:text-black border border-green-500/50 rounded transition-all text-sm font-bold uppercase">
                    <Github size={16} /> Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/10 hover:bg-green-500 hover:text-black border border-green-500/50 rounded transition-all text-sm font-bold uppercase">
                    <ExternalLink size={16} /> Demo
                </button>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-green-500/20 border-r-transparent"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;
