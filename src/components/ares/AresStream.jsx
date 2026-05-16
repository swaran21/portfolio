import React, { useState } from 'react';
import useSound from '../../hooks/useSound';

const AresStream = () => {
  const { playSound } = useSound();
  const [transmitter, setTransmitter] = useState('');
  const [channel, setChannel] = useState('GENERAL_FEEDBACK');
  const [payload, setPayload] = useState('');
  const [status, setStatus] = useState('AWAITING_INPUT');
  const [sessions, setSessions] = useState(1042);
  const [sentMessages, setSentMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transmitter || !payload) {
      playSound('tick');
      setStatus('ERROR_MISSING_PAYLOAD');
      return;
    }

    setStatus('TRANSMITTING_ENCRYPTED_PACKETS...');
    playSound('transform');

    setTimeout(() => {
      setStatus('TRANSMISSION_EXECUTED // SECURE_SHELL_DISPATCHED');
      playSound('hover');
      setSentMessages(prev => [
        {
          id: Date.now(),
          transmitter: transmitter.toUpperCase(),
          channel,
          content: payload,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
      setSessions(prev => prev + 1);
      
      // Reset form
      setTransmitter('');
      setPayload('');
    }, 1800);
  };

  return (
    <div className="w-full data-grid">
      <section className="mb-16">
        <div className="flex flex-col gap-4">
          <span className="font-label-caps text-primary tracking-[0.4em] text-xs font-bold uppercase">
            SYSTEM_PROTOCOL: CONTACT
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none text-on-surface">
            ESTABLISH <span className="text-primary italic drop-shadow-[0_0_15px_rgba(255,84,75,0.4)]">UPLINK</span>
          </h1>
          <p className="max-w-2xl font-body text-base text-on-surface-variant leading-relaxed opacity-85">
            Bypass standard communication layers. Dispatch your encrypted message or inquiries directly into the host mainframe database core.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Terminal Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden border border-primary/20">
            <div className="absolute top-4 right-4 font-label-caps text-primary/40 text-[10px]">
              SERIAL: AR-7742-STREAM
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="relative group">
                <label className="block font-label-caps text-on-surface-variant mb-2 tracking-widest text-[10px] font-bold">
                  TRANSMITTER_ID (NAME / NODE)
                </label>
                <input 
                  value={transmitter}
                  onChange={(e) => setTransmitter(e.target.value)}
                  onFocus={() => playSound('tick')}
                  className="w-full bg-transparent border-b border-primary/30 py-4 font-body text-primary placeholder:text-primary/20 transition-all focus:border-primary text-sm"
                  placeholder="ENTER_IDENTITY..." 
                  type="text"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <label className="block font-label-caps text-on-surface-variant mb-2 tracking-widest text-[10px] font-bold">
                  FREQUENCY_CHANNEL
                </label>
                <select 
                  value={channel}
                  onChange={(e) => { setChannel(e.target.value); playSound('tick'); }}
                  className="w-full bg-transparent border-b border-primary/30 py-4 font-body text-primary focus:border-primary cursor-pointer text-sm"
                >
                  <option className="bg-surface-container" value="GENERAL_FEEDBACK">GENERAL_FEEDBACK</option>
                  <option className="bg-surface-container" value="COLLABORATION_REQUEST">COLLABORATION_REQUEST</option>
                  <option className="bg-surface-container" value="ENCRYPTED_QUERY">ENCRYPTED_QUERY</option>
                  <option className="bg-surface-container" value="SYSTEM_ERROR_REPORT">SYSTEM_ERROR_REPORT</option>
                </select>
              </div>

              <div className="relative group">
                <label className="block font-label-caps text-on-surface-variant mb-2 tracking-widest text-[10px] font-bold">
                  PAYLOAD_CONTENT
                </label>
                <textarea 
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  onFocus={() => playSound('tick')}
                  className="w-full bg-transparent border-b border-primary/30 py-4 font-body text-primary placeholder:text-primary/20 transition-all focus:border-primary resize-none text-sm"
                  placeholder="ENCODE_MESSAGE..." 
                  rows={4}
                  required
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-focus-within:w-full"></div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button 
                  type="submit"
                  onMouseEnter={() => playSound('hover')}
                  className="w-full sm:w-auto px-12 py-5 bg-transparent border border-primary text-primary font-label-caps text-xs tracking-widest hover:bg-primary hover:text-on-primary hover:glow-red transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer"
                >
                  EXECUTE_TRANSMISSION
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
                
                <span className="font-body text-xs text-on-surface-variant/70 uppercase tracking-tight">
                  status: <span className="text-primary font-bold">{status}</span>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Info/Assets */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          {/* Status Card */}
          <div className="border border-primary/20 p-6 flex flex-col gap-6 bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <span className="font-label-caps text-on-surface-variant text-xs">CORE_STATUS</span>
              <span className="flex items-center gap-2 font-body text-xs text-primary font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#ffb4ab]"></span>
                OPERATIONAL
              </span>
            </div>
            
            <div className="space-y-4 font-body text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant/60">LATENCY:</span>
                <span className="text-primary font-bold">12ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant/60">ENCRYPTION:</span>
                <span className="text-primary font-bold">AES-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant/60">LOCATION:</span>
                <span className="text-primary font-bold">REDACTED</span>
              </div>
            </div>

            {/* Visual Asset */}
            <div className="mt-4 relative aspect-video overflow-hidden border border-primary/20">
              <img 
                className="w-full h-full object-cover opacity-70" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXobRErEGaY9q-lLQb_Lv6qU0lUbT3DpggadGhcSfhpFr2SeFd4JTnaCESb5ULQaV38BddjGoWkxWRH61p9zPkg56eLh4Sm2TMkqJ1snKkM0RPClNJXOkonzc2zmcpdxs4CZ2ZWdOo5HUgiHok7CKVEaXhhXJMh5e3tLiRrrRmS-onp5oquaIGhVcbG_LJrupFU4n-anpn7H7SeovcxSGO_4bdZaf0-xoOfjjT0rqS2cSqWkjJqpNpuGzFGom0HQgk2DCa7Xc3beM"
                alt="Glowing red mainframe server stacks"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <div className="absolute bottom-4 left-4 font-label-caps text-[9px] bg-background/80 px-2 py-1 border border-primary/20">
                REALTIME_VISUAL_01
              </div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="grid grid-cols-1 gap-4">
            <a 
              href="mailto:saisw@example.com"
              onMouseEnter={() => playSound('hover')}
              className="p-6 border border-primary/20 hover:border-primary transition-colors flex items-center justify-between group bg-surface-container-lowest"
            >
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-bold">DIRECT_LINE</span>
                <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">SAISW@EXAMPLE.COM</span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={() => playSound('hover')}
              className="p-6 border border-primary/20 hover:border-primary transition-colors flex items-center justify-between group bg-surface-container-lowest"
            >
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-bold">SOCIAL_UPLINK</span>
                <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">@SAISW_NETWORK</span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">alternate_email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Outbound Transmission Log */}
      {sentMessages.length > 0 && (
        <section className="mt-16 border border-primary/20 p-6 glass-panel">
          <h3 className="font-display text-lg text-primary font-bold uppercase mb-4 tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-base">receipt_long</span>
            DECODED_OUTBOUND_QUEUE
          </h3>
          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
            {sentMessages.map((msg) => (
              <div key={msg.id} className="p-4 border border-primary/10 bg-primary/5 flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <span className="font-label-caps text-[9px] text-primary block">{msg.channel} // {msg.timestamp}</span>
                  <p className="font-body text-xs text-on-surface mt-1">{msg.content}</p>
                </div>
                <span className="font-label-caps text-[9px] text-on-surface-variant border border-primary/20 px-2 py-0.5 self-start md:self-center">
                  DISPATCHED // {msg.transmitter}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Transmission Log (Bento Style) */}
      <section className="mt-20">
        <h2 className="font-display text-xl md:text-2xl font-bold text-primary mb-12 flex items-center gap-4 uppercase tracking-wider">
          <span className="material-symbols-outlined">analytics</span>
          TRANSMISSION_STATS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 glass-panel p-6 border-l-4 border-l-primary flex flex-col gap-4">
            <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">ACTIVE_SESSIONS</span>
            <div className="text-4xl font-display font-bold text-on-surface">{sessions.toLocaleString()}</div>
            <div className="w-full bg-surface-container-high h-1.5 overflow-hidden">
              <div className="bg-primary w-2/3 h-full glow-red animate-pulse"></div>
            </div>
            <p className="font-body text-xs text-on-surface-variant/80 uppercase">
              Load distribution optimized for secure terminal streams.
            </p>
          </div>
          
          <div className="glass-panel p-6 flex flex-col justify-between border border-primary/10">
            <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">UPTIME</span>
            <div className="text-4xl font-display font-bold text-on-surface mt-4">99.9%</div>
            <span className="font-body text-[10px] text-primary mt-2 uppercase tracking-widest font-bold">CONTINUOUS_FLUX</span>
          </div>
          
          <div className="glass-panel p-6 flex flex-col justify-between border border-primary/10">
            <span className="material-symbols-outlined text-primary text-4xl">shield_lock</span>
            <div className="mt-4">
              <span className="font-label-caps text-[10px] text-on-surface-variant block font-bold">PROTOCOL</span>
              <span className="font-body text-sm text-on-surface font-bold">SECURED</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AresStream;
