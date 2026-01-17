import React from 'react';
import { Github, ExternalLink, Code2, MessageSquare, Dumbbell } from 'lucide-react';
import { cn } from '../../lib/utils';

// Real Projects from Resume
const projects = [
  {
    id: 'ALN-001',
    title: 'AI-Powered Chat App',
    type: 'Full-Stack Real-Time Application',
    description: 'Real-time chat platform using Java/Spring Boot backend, React frontend, WebSockets, and Gemini API-powered intelligent chatbot for enhanced user engagement.',
    tech: ['Spring Boot', 'React', 'WebSockets', 'Gemini API'],
    status: 'ACTIVE',
    date: 'July 2025',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'ALN-002',
    title: 'Fitness AI',
    type: 'Cloud Native Microservices Platform',
    description: 'AI-driven wellness platform with Java/Spring Boot microservices architecture, RabbitMQ, and Keycloak, providing personalized fitness recommendations via Gemini API.',
    tech: ['Spring Boot', 'Microservices', 'RabbitMQ', 'Keycloak', 'Gemini API'],
    status: 'ACTIVE',
    date: 'July 2025',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
  }
];

const ProjectsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {projects.map((project, index) => {
        const IconComponent = project.icon;
        return (
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

              {/* Date Badge */}
              <div className="absolute bottom-2 left-2 z-20 bg-black/80 border border-green-500/50 px-2 py-1 text-xs font-mono text-green-400">
                  {project.date}
              </div>

              {/* Icon Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10">
                  <IconComponent size={80} className="text-green-400" />
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

              <p className="text-green-400/60 text-xs font-mono uppercase mb-3 tracking-wider">
                  {project.type}
              </p>
              
              <p className="text-green-400/70 text-sm mb-4 font-mono leading-relaxed h-24 overflow-hidden">
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

            {/* Status Indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  project.status === 'ACTIVE' ? "bg-green-400" : "bg-yellow-400"
                )}></div>
                <span className="text-xs font-mono text-green-400">{project.status}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsSection;
