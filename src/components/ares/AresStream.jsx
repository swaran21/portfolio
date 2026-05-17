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
    <div className="w-full px-5 md:px-16 max-w-[1400px] mx-auto text-left">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_004 // ESTABLISH_UPLINK</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">
        JOIN_THE <span className="text-primary drop-shadow-[0_0_20px_rgba(255,84,75,0.6)]">FLUX</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Links & Terminal Panel (Left) */}
        <div className="glass-panel p-8 md:p-10 border border-primary/20 flex flex-col justify-between">
          <div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
              Ready to integrate with the ARES protocol? Terminal access is open for collaborative ventures, high-stakes system development, or general inquiries. Bypass standard networks and dispatch directly.
            </p>
          </div>
          <div className="space-y-4">
            <a href="mailto:maramsaiswaran@gmail.com" onMouseEnter={() => playSound('hover')} className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
              <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">DIRECT_LINE</span>
              <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">MARAMSAISWARAN@GMAIL.COM</span>
            </a>
            <a href="https://github.com/saiswaran1607" target="_blank" rel="noreferrer" onMouseEnter={() => playSound('hover')} className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
              <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">GITHUB_CORE</span>
              <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">GITHUB.COM/SAISWARAN1607</span>
            </a>
            <a href="https://linkedin.com/in/maramsaiswaran" target="_blank" rel="noreferrer" onMouseEnter={() => playSound('hover')} className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
              <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">LINKED_NODE</span>
              <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">LINKEDIN.COM/IN/MARAMSAISWARAN</span>
            </a>
          </div>
        </div>

        {/* Transmission Dispatch Terminal (Right) */}
        <div className="glass-panel p-8 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-4 right-4 font-label-caps text-primary/40 text-[10px]">
            SERIAL: AR-7742-STREAM
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="relative group">
              <label className="block font-label-caps text-on-surface-variant mb-2 tracking-widest text-[10px] font-bold">
                TRANSMITTER_ID (NAME / NODE)
              </label>
              <input 
                value={transmitter}
                onChange={(e) => setTransmitter(e.target.value)}
                onFocus={() => playSound('tick')}
                className="w-full bg-transparent border-b border-primary/30 py-3 font-body text-primary placeholder:text-primary/20 transition-all focus:border-primary text-sm focus:outline-none"
                placeholder="ENTER_IDENTITY..." 
                type="text"
                required
              />
            </div>

            <div className="relative group">
              <label className="block font-label-caps text-on-surface-variant mb-2 tracking-widest text-[10px] font-bold">
                FREQUENCY_CHANNEL
              </label>
              <select 
                value={channel}
                onChange={(e) => { setChannel(e.target.value); playSound('tick'); }}
                className="w-full bg-transparent border-b border-primary/30 py-3 font-body text-primary focus:border-primary cursor-pointer text-sm focus:outline-none"
              >
                <option className="bg-[#020202] text-primary" value="GENERAL_FEEDBACK">GENERAL_FEEDBACK</option>
                <option className="bg-[#020202] text-primary" value="COLLABORATION_REQUEST">COLLABORATION_REQUEST</option>
                <option className="bg-[#020202] text-primary" value="ENCRYPTED_QUERY">ENCRYPTED_QUERY</option>
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
                className="w-full bg-transparent border-b border-primary/30 py-3 font-body text-primary placeholder:text-primary/20 transition-all focus:border-primary resize-none text-sm focus:outline-none"
                placeholder="ENCODE_MESSAGE..." 
                rows={3}
                required
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                type="submit"
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-primary text-primary font-label-caps text-xs tracking-widest hover:bg-primary hover:text-on-primary hover:glow-red transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer"
              >
                EXECUTE_TRANSMISSION
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
              
              <span className="font-body text-[10px] text-on-surface-variant/70 uppercase tracking-tight">
                status: <span className="text-primary font-bold">{status}</span>
              </span>
            </div>
          </form>
        </div>

      </div>

      {/* Outbound Transmission Log Queue */}
      {sentMessages.length > 0 && (
        <div className="mt-12 border border-primary/20 p-6 glass-panel">
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
        </div>
      )}

      {/* Mainframe System Status Metrics */}
      <div className="mt-12 glass-panel p-6 border border-primary/20 text-left">
        <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-4">
          <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">ACTIVE_SESSIONS</span>
          <span className="flex items-center gap-2 font-body text-xs text-primary font-bold">
            <span className="w-2 h-2 bg-primary animate-pulse rounded-full shadow-[0_0_6px_rgba(255,84,75,0.6)]"></span>
            OPERATIONAL
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-display font-bold text-on-surface">{sessions.toLocaleString()}</div>
            <span className="font-body text-[10px] text-on-surface-variant uppercase mt-1">SESSIONS ACTIVE</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-display font-bold text-on-surface">12ms</div>
            <span className="font-body text-[10px] text-on-surface-variant uppercase mt-1">LATENCY</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-display font-bold text-on-surface">99.9%</div>
            <span className="font-body text-[10px] text-on-surface-variant uppercase mt-1">UPTIME</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl font-display font-bold text-on-surface">AES-256</div>
            <span className="font-body text-[10px] text-on-surface-variant uppercase mt-1">ENCRYPTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AresStream;
