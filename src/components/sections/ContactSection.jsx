import React from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

const ContactSection = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black uppercase text-green-100 mb-4">
          Initiate Contact Sequence
        </h2>
        <p className="text-green-400/70 font-mono">
          // ENCRYPTED CHANNEL - SECURE TRANSMISSION
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Panel */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold uppercase text-green-100 mb-6">
            Direct Channels
          </h3>

          {/* Email */}
          <div className="group relative bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                <Mail size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-green-600 text-xs uppercase mb-1 font-mono">Primary Email</p>
                <a href="mailto:saiswaran212005@gmail.com" className="text-green-100 font-mono hover:text-green-400 transition-colors break-all">
                  saiswaran212005@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group relative bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                <Phone size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-green-600 text-xs uppercase mb-1 font-mono">Mobile</p>
                <a href="tel:+918688971168" className="text-green-100 font-mono hover:text-green-400 transition-colors">
                  +91-8688971168
                </a>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className="group relative bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                <Github size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-green-600 text-xs uppercase mb-1 font-mono">GitHub</p>
                <a href="https://github.com/swaran21" target="_blank" rel="noopener noreferrer" className="text-green-100 font-mono hover:text-green-400 transition-colors">
                  github.com/swaran21
                </a>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="group relative bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                <Linkedin size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-green-600 text-xs uppercase mb-1 font-mono">LinkedIn</p>
                <a href="https://linkedin.com/in/sai-swaran-maram" target="_blank" rel="noopener noreferrer" className="text-green-100 font-mono hover:text-green-400 transition-colors">
                  linkedin.com/in/sai-swaran-maram
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <MapPin size={24} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-green-600 text-xs uppercase mb-1 font-mono">Location</p>
                <p className="text-green-100 font-mono">
                  Hyderabad, Telangana, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Panel */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold uppercase text-green-100 mb-6">
            Send Message
          </h3>

          <form className="space-y-4">
            <div>
              <label className="block text-green-400 text-sm font-mono uppercase mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-black/40 border border-green-500/30 rounded px-4 py-2 text-green-100 font-mono focus:border-green-400 focus:outline-none transition-colors"
                placeholder="Enter name..."
              />
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono uppercase mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-black/40 border border-green-500/30 rounded px-4 py-2 text-green-100 font-mono focus:border-green-400 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono uppercase mb-2">Subject</label>
              <input 
                type="text" 
                className="w-full bg-black/40 border border-green-500/30 rounded px-4 py-2 text-green-100 font-mono focus:border-green-400 focus:outline-none transition-colors"
                placeholder="Message subject..."
              />
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono uppercase mb-2">Message</label>
              <textarea 
                rows="6"
                className="w-full bg-black/40 border border-green-500/30 rounded px-4 py-2 text-green-100 font-mono focus:border-green-400 focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-500/10 hover:bg-green-500 hover:text-black border border-green-500/50 rounded transition-all font-bold uppercase"
            >
              <Send size={18} /> Transmit Message
            </button>
          </form>

          <p className="mt-6 text-xs text-green-400/60 font-mono text-center">
            ⚠️ Encrypted via quantum encryption protocols
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
