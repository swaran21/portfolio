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
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setStatus('COPIED_TO_CLIPBOARD');
    playSound('tick');
    setTimeout(() => {
      setCopied(false);
      setStatus('AWAITING_INPUT');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transmitter || !payload) {
      playSound('tick');
      setStatus('ERROR_MISSING_PAYLOAD');
      return;
    }

    setStatus('SENDING_MESSAGE...');
    playSound('transform');

    setTimeout(() => {
      setStatus('MESSAGE_SENT');
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
      setTransmitter('');
      setPayload('');
    }, 1800);
  };

  return (
    <div className="w-full px-5 md:px-16 max-w-[1400px] mx-auto text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em] font-bold bg-background/50 px-2 py-0.5">SECTION_004 // CONTACT_ME</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16 drop-shadow-md">
        CONTACT ME <span className="text-primary drop-shadow-[0_0_15px_var(--color-primary)]">FLUX</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Links & Narrative */}
        <div className="glass-panel p-8 md:p-10 flex flex-col justify-between group">
          <div>
            <p className="font-sans text-sm text-on-surface font-normal leading-relaxed mb-8 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] opacity-90">
              READY TO INTEGRATE WITH THE SYSTEM PROTOCOL? UPLINK TRANSMISSIONS ARE OPEN FOR SECURE SYSTEM ARCHITECT COLLABORATIONS, PRODUCTION-GRADE FRAMEWORK DEPLOYMENTS, OR DIRECT DATA QUERIES. BYPASS STANDARD NETWORKS AND DISPATCH DIRECTLY.
            </p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => handleCopy('saiswaran212005@gmail.com')}
              onMouseEnter={() => playSound('hover')} 
              className="w-full text-left p-4 border border-primary/20 bg-background/40 hover:border-primary transition-colors cursor-pointer group/btn flex justify-between items-center"
            >
              <div>
                <span className="font-body text-[9px] text-primary/80 font-bold block drop-shadow-md tracking-widest uppercase">DIRECT_LINE (COPY)</span>
                <span className="font-sans text-sm text-on-surface font-bold group-hover/btn:text-primary transition-colors drop-shadow-md">saiswaran212005@gmail.com</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] ${copied ? 'text-green-400' : 'text-primary'}`}>
                {copied ? 'check_circle' : 'content_copy'}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/swaran21" target="_blank" rel="noreferrer" onMouseEnter={() => playSound('hover')} className="block p-4 border border-primary/20 bg-background/40 hover:border-primary transition-colors group/link">
                <span className="font-body text-[9px] text-primary/80 font-bold block drop-shadow-md tracking-widest uppercase">GITHUB_CORE</span>
                <span className="font-sans text-sm text-on-surface font-bold group-hover/link:text-primary transition-colors drop-shadow-md">SWARAN21</span>
              </a>
              <a href="https://www.linkedin.com/in/sai-swaran-maram-117870298/" target="_blank" rel="noreferrer" onMouseEnter={() => playSound('hover')} className="block p-4 border border-primary/20 bg-background/40 hover:border-primary transition-colors group/link">
                <span className="font-body text-[9px] text-primary/80 font-bold block drop-shadow-md tracking-widest uppercase">LINKEDIN_NODE</span>
                <span className="font-sans text-sm text-on-surface font-bold group-hover/link:text-primary transition-colors drop-shadow-md">SAI SWARAN</span>
              </a>
              <a href="https://leetcode.com/swaran21" target="_blank" rel="noreferrer" onMouseEnter={() => playSound('hover')} className="col-span-2 block p-4 border border-primary/20 bg-background/40 hover:border-primary transition-colors group/link">
                <span className="font-body text-[9px] text-primary/80 font-bold block drop-shadow-md tracking-widest uppercase">LEETCODE_STATS</span>
                <span className="font-sans text-sm text-on-surface font-bold group-hover/link:text-primary transition-colors drop-shadow-md flex justify-between">
                  <span>SWARAN21</span>
                  <span className="text-xs opacity-60 font-body">Rating 1937 // Global Rank 31,199</span>
                </span>
              </a>
            </div>
            
            <a href="/Maram_Sai_Swaran_Resume.pdf" target="_blank" rel="noreferrer" className="mt-4 block w-full p-4 border border-primary bg-primary/10 hover:bg-primary transition-colors group/cv text-center rounded-sm glow-sm">
              <span className="font-body text-xs text-primary group-hover/cv:text-background font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                DOWNLOAD_MAIN_MANIFEST (CV) <span className="material-symbols-outlined text-[16px]">download</span>
              </span>
            </a>
          </div>
        </div>

        {/* Transmission Dispatch Terminal */}
        <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-4 right-4 font-label-caps text-primary/60 text-[10px] font-bold bg-background/80 px-2 py-1">
            SERIAL: AR-7742-STREAM
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
            <div className="relative group">
              <label className="block font-label-caps text-on-surface mb-2 tracking-widest text-[10px] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                TRANSMITTER_ID (NAME / NODE)
              </label>
              <input 
                value={transmitter}
                onChange={(e) => setTransmitter(e.target.value)}
                onFocus={() => playSound('tick')}
                className="w-full bg-background/50 border-b border-primary/40 py-3 px-2 font-body text-primary font-bold placeholder:text-primary/30 transition-all focus:border-primary text-sm focus:outline-none drop-shadow-md"
                placeholder="ENTER_IDENTITY..." 
                type="text"
                required
              />
            </div>

            <div className="relative group">
              <label className="block font-label-caps text-on-surface mb-2 tracking-widest text-[10px] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                FREQUENCY_CHANNEL
              </label>
              <select 
                value={channel}
                onChange={(e) => { setChannel(e.target.value); playSound('tick'); }}
                className="w-full bg-background/50 border-b border-primary/40 py-3 px-2 font-body text-primary font-bold focus:border-primary cursor-pointer text-sm focus:outline-none drop-shadow-md"
              >
                <option className="bg-background text-primary" value="GENERAL_FEEDBACK">GENERAL_FEEDBACK</option>
                <option className="bg-background text-primary" value="COLLABORATION_REQUEST">COLLABORATION_REQUEST</option>
                <option className="bg-background text-primary" value="ENCRYPTED_QUERY">ENCRYPTED_QUERY</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block font-label-caps text-on-surface mb-2 tracking-widest text-[10px] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                PAYLOAD_CONTENT
              </label>
              <textarea 
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                onFocus={() => playSound('tick')}
                className="w-full bg-background/50 border-b border-primary/40 py-3 px-2 font-body text-primary font-bold placeholder:text-primary/30 transition-all focus:border-primary resize-none text-sm focus:outline-none drop-shadow-md"
                placeholder="ENCODE_MESSAGE..." 
                rows={3}
                required
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                type="submit"
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-10 py-4 glass-panel border border-primary text-primary font-body text-xs tracking-widest font-bold hover:bg-primary hover:text-background transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer rounded-sm"
              >
                EXECUTE_TRANSMISSION
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
              
              <span className="font-body text-[10px] text-on-surface font-bold uppercase tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,1)] bg-background/50 px-2 py-1 rounded-sm">
                status: <span className="text-primary">{status}</span>
              </span>
            </div>
          </form>
        </div>

      </div>

      {/* Outbound Log */}
      {sentMessages.length > 0 && (
        <div className="mt-12 p-6 glass-panel">
          <h3 className="font-display text-lg text-primary font-bold uppercase mb-4 tracking-wider flex items-center gap-2 drop-shadow-md">
            <span className="material-symbols-outlined text-base">receipt_long</span>
            DECODED_OUTBOUND_QUEUE
          </h3>
          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
            {sentMessages.map((msg) => (
              <div key={msg.id} className="p-4 border border-primary/20 bg-background/40 flex flex-col md:flex-row justify-between md:items-center gap-2 rounded-sm">
                <div>
                  <span className="font-body text-[9px] text-primary font-bold block drop-shadow-md tracking-widest">{msg.channel} // {msg.timestamp}</span>
                  <p className="font-sans text-xs text-on-surface font-normal mt-1 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">{msg.content}</p>
                </div>
                <span className="font-body text-[9px] text-on-surface font-bold border border-primary/40 bg-primary/10 px-2 py-0.5 self-start md:self-center drop-shadow-md tracking-widest rounded-sm">
                  DISPATCHED // {msg.transmitter}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mainframe Metrics */}
      {/* <div className="mt-12 glass-panel p-6 border border-primary/30 bg-background/85 text-left">
        <div className="flex items-center justify-between mb-4 border-b border-primary/20 pb-4">
          <span className="font-label-caps text-[10px] text-on-surface font-bold drop-shadow-md">ACTIVE_SESSIONS</span>
          <span className="flex items-center gap-2 font-body text-xs text-primary font-bold bg-background/50 px-2 py-1">
            <span className="w-2 h-2 bg-primary animate-pulse rounded-full shadow-[0_0_6px_var(--color-primary)]"></span>
            OPERATIONAL
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col justify-center drop-shadow-md">
            <div className="text-4xl font-display font-bold text-on-surface">1,042</div>
            <span className="font-body text-[10px] text-primary font-bold uppercase mt-1">SESSIONS ACTIVE</span>
          </div>
          <div className="flex flex-col justify-center drop-shadow-md">
            <div className="text-4xl font-display font-bold text-on-surface">12ms</div>
            <span className="font-body text-[10px] text-primary font-bold uppercase mt-1">LATENCY</span>
          </div>
          <div className="flex flex-col justify-center drop-shadow-md">
            <div className="text-4xl font-display font-bold text-on-surface">99.9%</div>
            <span className="font-body text-[10px] text-primary font-bold uppercase mt-1">UPTIME</span>
          </div>
          <div className="flex flex-col justify-center drop-shadow-md">
            <div className="text-4xl font-display font-bold text-on-surface">AES-256</div>
            <span className="font-body text-[10px] text-primary font-bold uppercase mt-1">ENCRYPTION</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AresStream;