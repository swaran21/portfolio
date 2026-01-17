import React from 'react';
import { Download, FileText, Calendar, Award, Code, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';

const ResumeSection = () => {
  const handleDownload = () => {
    // TODO: Add actual resume PDF path
    alert('Resume download feature - Add your PDF file to public folder and link it here!');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Download */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black uppercase text-green-100 mb-2">
            Resume File
          </h2>
          <p className="text-green-400/70 font-mono">
            // PERSONNEL RECORD - FULL ACCESS
          </p>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-green-500/10 hover:bg-green-500 hover:text-black border-2 border-green-500 rounded transition-all font-bold uppercase"
        >
          <Download size={20} /> Download PDF
        </button>
      </div>

      {/* Resume Content */}
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h1 className="text-4xl font-black uppercase text-green-100 mb-2">Maram Sai Swaran</h1>
          <div className="flex flex-wrap gap-4 text-sm font-mono text-green-400">
            <span>📧 saiswaran212005@gmail.com</span>
            <span>📱 +91-8688971168</span>
            <span>🔗 github.com/swaran21</span>
            <span>💼 linkedin.com/in/sai-swaran-maram</span>
          </div>
        </div>

        {/* Education */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Education
          </h2>
          <div className="border-l-2 border-green-500 pl-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-green-100">Bachelor of Technology in Computer Science</h3>
                <p className="text-green-400">Vardhaman College of Engineering</p>
              </div>
              <span className="text-green-400 font-mono text-sm">2023 - 2027</span>
            </div>
            <p className="text-green-300/70 mb-2">CGPA: 8.73</p>
            <p className="text-green-400/60 text-sm">
              <strong className="text-green-400">Relevant Coursework:</strong> DSA using Java, Spring Boot, MicroServices, Docker, 
              Database Management, Operating Systems, Software Engineering, Unit Testing, Generative AI, Web Development
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Experience
          </h2>
          
          <div className="space-y-6">
            {/* PearlThoughts */}
            <div className="border-l-2 border-green-500 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-green-100">Backend Developer Intern</h3>
                  <p className="text-green-400">PearlThoughts</p>
                </div>
                <span className="text-green-400 font-mono text-sm">Jul 2025 - Aug 2025</span>
              </div>
              <p className="text-green-300/80">
                Designed RESTful APIs, optimized databases, and contributed to the full development lifecycle in an agile environment.
              </p>
            </div>

            {/* NIELIT */}
            <div className="border-l-2 border-green-500 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-green-100">AI & ML Intern</h3>
                  <p className="text-green-400">NIELIT</p>
                </div>
                <span className="text-green-400 font-mono text-sm">Aug 2024 - Oct 2024</span>
              </div>
              <p className="text-green-300/80">
                Completed comprehensive training on implementing key Machine Learning and Deep Learning algorithms via hands-on Python projects.
              </p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Projects
          </h2>
          
          <div className="space-y-6">
            {/* AI Chat App */}
            <div className="border-l-2 border-green-500 pl-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-green-100">AI-Powered Chat App – Full-Stack Real-Time Application</h3>
                <span className="text-green-400 font-mono text-sm">July 2025</span>
              </div>
              <p className="text-green-300/80 mb-2">
                Developed a real-time chat platform using a Java/Spring Boot backend, React frontend, WebSockets, and 
                a Gemini API-powered intelligent chatbot for enhanced user engagement.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Spring Boot', 'React', 'WebSockets', 'Gemini API'].map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs border border-green-500/30 bg-green-500/10 rounded text-green-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Fitness AI */}
            <div className="border-l-2 border-green-500 pl-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-green-100">Fitness AI – Cloud Native Microservices Platform</h3>
                <span className="text-green-400 font-mono text-sm">July 2025</span>
              </div>
              <p className="text-green-300/80 mb-2">
                Built an AI-driven wellness platform with a Java/Spring Boot microservices architecture, RabbitMQ, and 
                Keycloak, providing personalized fitness recommendations via the Gemini API.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Spring Boot', 'Microservices', 'RabbitMQ', 'Keycloak', 'Gemini API'].map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs border border-green-500/30 bg-green-500/10 rounded text-green-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-2">Languages</h4>
              <p className="text-green-300/80">Python, Java, C, HTML/CSS, JavaScript, SQL</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Developer Tools</h4>
              <p className="text-green-300/80">Git, GitHub, VS Code, Eclipse, IntelliJ</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Frameworks</h4>
              <p className="text-green-300/80">Spring Boot, React, Tailwind, Hibernate</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Databases</h4>
              <p className="text-green-300/80">MongoDB, MySQL, Postgres, Redis</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">AI & Cloud</h4>
              <p className="text-green-300/80">AI, Generative AI, Docker, Microservices</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Courses/Certifications
          </h2>
          
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-green-300/80">
              <span className="text-green-500 mt-1">▸</span>
              <span>Career Essentials in Generative AI - Microsoft and LinkedIn</span>
            </li>
            <li className="flex items-start gap-2 text-green-300/80">
              <span className="text-green-500 mt-1">▸</span>
              <span>Spring: Framework in Depth - LinkedIn</span>
            </li>
            <li className="flex items-start gap-2 text-green-300/80">
              <span className="text-green-500 mt-1">▸</span>
              <span>Artificial Intelligence & Machine Learning using Python – NIELIT</span>
            </li>
          </ul>
        </div>

        {/* Workshops */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-black uppercase text-green-100 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 block"></span>
            Workshops & Events
          </h2>
          
          <div className="border-l-2 border-green-500 pl-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-green-100">Modernize Java Applications Using AI – Microsoft</h3>
              <span className="text-green-400 font-mono text-sm">March 2025</span>
            </div>
            <p className="text-green-300/80">
              Attended an expert-led workshop on integrating AI into Java applications, earning an Azure subscription 
              and award for outstanding participation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeSection;
