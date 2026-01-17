import React from 'react';
import { Code, Database, Cloud, Zap, Brain, Wrench } from 'lucide-react';
import { cn } from '../../lib/utils';

const skillCategories = [
  {
    category: 'Languages',
    icon: Code,
    color: 'cyan',
    skills: ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL']
  },
  {
    category: 'Frameworks',
    icon: Wrench,
    color: 'green',
    skills: ['Spring Boot', 'React', 'Tailwind', 'Hibernate']
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'emerald',
    skills: ['MongoDB', 'MySQL', 'Postgres', 'Redis']
  },
  {
    category: 'Developer Tools',
    icon: Zap,
    color: 'lime',
    skills: ['Git', 'GitHub', 'VS Code', 'Eclipse', 'IntelliJ']
  },
  {
    category: 'AI & Cloud',
    icon: Brain,
    color: 'teal',
    skills: ['AI', 'Generative AI', 'Docker', 'Microservices']
  }
];

const SkillsSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black uppercase text-green-100 mb-4">
          Tech Arsenal
        </h2>
        <p className="text-green-400/70 font-mono">
          // CLASSIFIED - Level 5 Access Required
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={cat.category}
              className="group relative bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
                  <IconComponent size={24} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold uppercase text-green-100">
                  {cat.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-2">
                {cat.skills.map((skill, skillIdx) => (
                  <div 
                    key={skill}
                    className="flex items-center gap-2 group/skill"
                  >
                    <div className="w-1 h-1 rounded-full bg-green-500 group-hover/skill:scale-150 transition-transform"></div>
                    <span className="text-green-300/80 font-mono text-sm group-hover/skill:text-green-100 group-hover/skill:translate-x-1 transition-all">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-20 transition-opacity">
                <IconComponent size={60} className="text-green-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Coursework & Certifications */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coursework */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
            <Code size={18} /> Relevant Coursework
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['DSA using Java', 'Spring Boot', 'MicroServices', 'Docker', 'DBMS', 'Operating Systems', 'Software Engineering', 'Web Development'].map(course => (
              <div key={course} className="text-green-300/70 text-sm font-mono">
                ▸ {course}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
            <Cloud size={18} /> Certifications
          </h3>
          <ul className="space-y-2">
            <li className="text-green-300/70 text-sm">
              <span className="text-green-500">▸</span> Career Essentials in Generative AI (Microsoft + LinkedIn)
            </li>
            <li className="text-green-300/70 text-sm">
              <span className="text-green-500">▸</span> Spring: Framework in Depth (LinkedIn)
            </li>
            <li className="text-green-300/70 text-sm">
              <span className="text-green-500">▸</span> AI & Machine Learning using Python (NIELIT)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
