import React from 'react';
import { User, MapPin, Calendar, Shield, Award, Target, GraduationCap, Briefcase } from 'lucide-react';
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
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                        <User size={120} className="text-green-400" />
                    </div>
                </div>
                
                <h2 className="text-3xl font-black uppercase text-green-100 mb-1">Maram Sai Swaran</h2>
                <p className="text-green-500 font-mono text-sm tracking-widest mb-6">DEVELOPER • ENGINEER</p>
                
                <div className="w-full grid grid-cols-2 gap-4 text-left text-xs font-mono border-t border-green-500/30 pt-4 text-green-400/80">
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">GitHub</span>
                        <span className="text-green-100">swaran21</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-green-600 uppercase text-[10px] mb-1">LinkedIn</span>
                        <span className="text-green-100">sai-swaran-maram</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-green-600 uppercase text-[10px] mb-1">Email</span>
                        <span className="text-green-100 break-all">saiswaran212005@gmail.com</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-green-600 uppercase text-[10px] mb-1">Phone</span>
                        <span className="text-green-100">+91-8688971168</span>
                    </div>
                </div>
            </div>
        </div>

        {/* EDUCATION MODULE */}
        <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg">
             <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
                <GraduationCap size={18} /> Education
             </h3>
             <div className="space-y-3">
                <div className="border-l-2 border-green-500 pl-3">
                    <p className="text-green-100 font-bold">B.Tech - Computer Science</p>
                    <p className="text-green-400 text-sm">Vardhaman College of Engineering</p>
                    <p className="text-green-400/60 text-xs mt-1">2023 - 2027 • CGPA: 8.73</p>
                </div>
             </div>
        </div>

        {/* STATUS MODULE */}
        <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg">
             <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
                <Shield size={18} /> Status
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono text-green-300">
                    <span>Academic Performance</span>
                    <span>87%</span>
                </div>
                <div className="h-1.5 w-full bg-green-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[87%] animate-pulse"></div>
                </div>

                <div className="flex justify-between text-xs font-mono text-green-300">
                    <span>Project Completion</span>
                    <span>100%</span>
                </div>
                <div className="h-1.5 w-full bg-green-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>
                </div>
             </div>
        </div>
      </div>


      {/* RIGHT COLUMN: BIO & EXPERIENCE */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* BIO MODULE */}
        <div className="p-8 bg-black/40 border border-green-500/30 rounded-lg backdrop-blur relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-20">
                 <User size={120} className="text-green-500" />
             </div>
             
             <h3 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-green-500 block"></span>
                About Me
             </h3>
             
             <div className="space-y-4 text-green-300/90 text-lg leading-relaxed font-sans">
                 <p>
                     Full-stack developer and AI enthusiast currently pursuing B.Tech in Computer Science at 
                     Vardhaman College of Engineering with an 8.73 CGPA. Passionate about building scalable, 
                     intelligent applications that solve real-world problems.
                 </p>
                 <p>
                     Specialized in Java Spring Boot microservices, React frontends, and AI integration. 
                     Experienced in developing cloud-native applications with Docker, RabbitMQ, and modern 
                     DevOps practices. Committed to writing clean, testable code and staying updated with 
                     emerging technologies.
                 </p>
             </div>
        </div>

        {/* EXPERIENCE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pearl Thoughts Internship */}
            <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg relative hover:bg-green-500/5 transition-colors">
                <Briefcase className="absolute top-4 right-4 text-green-500/20" size={40} />
                <p className="text-green-600 text-xs uppercase mb-1">Jul 2025 - Aug 2025</p>
                <h4 className="font-bold text-green-100 uppercase mb-2">Backend Developer Intern</h4>
                <p className="text-sm text-green-400 font-bold mb-2">PearlThoughts</p>
                <p className="text-sm text-green-400/70">
                    Designed RESTful APIs, optimized databases, and contributed to full development lifecycle in agile environment.
                </p>
            </div>
            
            {/* NIELIT Internship */}
            <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg relative hover:bg-green-500/5 transition-colors">
                <Briefcase className="absolute top-4 right-4 text-green-500/20" size={40} />
                <p className="text-green-600 text-xs uppercase mb-1">Aug 2024 - Oct 2024</p>
                <h4 className="font-bold text-green-100 uppercase mb-2">AI & ML Intern</h4>
                <p className="text-sm text-green-400 font-bold mb-2">NIELIT</p>
                <p className="text-sm text-green-400/70">
                    Completed comprehensive training on ML/DL algorithms via hands-on Python projects.
                </p>
            </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="p-6 bg-green-900/10 border border-green-500/30 rounded-lg">
             <h3 className="text-lg font-bold uppercase text-green-400 mb-4 flex items-center gap-2">
                <Award size={18} /> Notable Achievements
             </h3>
             <ul className="space-y-2 text-green-300/80">
                <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">▸</span>
                    <span>Microsoft Azure Subscription & Award - Modernize Java Applications Using AI Workshop (March 2025)</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">▸</span>
                    <span>Built 2 production-ready AI-powered full-stack applications</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">▸</span>
                    <span>Multiple certifications in Generative AI, Spring Framework, and AI/ML</span>
                </li>
             </ul>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
