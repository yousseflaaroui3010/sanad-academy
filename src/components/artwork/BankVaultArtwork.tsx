import React, { useState } from 'react';
import { Shield, Lock, Unlock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const BankVaultArtwork: React.FC = () => {
  const [selectedBox, setSelectedBox] = useState<'hr' | 'finance' | 'exec'>('hr');

  // User holds the key for 'hr' only
  const userKey = 'hr';
  const hasAccess = selectedBox === userKey;

  const handleSelectBox = (box: 'hr' | 'finance' | 'exec') => {
    setSelectedBox(box);
    if (box === 'hr') {
      playSuccessChime();
    } else {
      playWarningThud();
    }
  };

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-[#0d0f17] text-amber-400 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6 relative">
      {/* Bank Vault Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Shield size={16} className="text-amber-400" />
            <span>Bank Vault Cutaway • Multi-Tenant BOLA Defense</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            You hold Keycard: <span className="text-amber-300 font-mono font-bold">ws_legal_hr</span>. Try opening other department safe deposit boxes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Security Rule:</span>
          <span className="font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/40">
            Silent 404 (Never 403)
          </span>
        </div>
      </div>

      {/* Visual Vault Steel Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
        {/* Box 1: Legal HR (Authorized) */}
        <button
          onClick={() => handleSelectBox('hr')}
          className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
            selectedBox === 'hr'
              ? 'bg-[#1a1708] border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/20'
              : 'bg-[#121420] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-200">Box #101: ws_legal_hr</span>
            <Unlock size={16} className="text-emerald-400" />
          </div>
          <div className="text-xs text-gray-400 font-sans space-y-1">
            <p className="text-emerald-400 font-semibold font-mono text-[11px]">✓ Keycard Matches</p>
            <p>Contains: Moroccan Labor Code, HR policies, collective agreements.</p>
          </div>
        </button>

        {/* Box 2: Finance & Payroll (Unauthorized) */}
        <button
          onClick={() => handleSelectBox('finance')}
          className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
            selectedBox === 'finance'
              ? 'bg-[#1c0c14] border-rose-500 shadow-lg shadow-rose-500/10 ring-2 ring-rose-400/20'
              : 'bg-[#121420] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-200">Box #204: ws_finance</span>
            <Lock size={16} className="text-rose-400" />
          </div>
          <div className="text-xs text-gray-400 font-sans space-y-1">
            <p className="text-rose-400 font-semibold font-mono text-[11px]">🛑 Unauthorized Access</p>
            <p>Contains: Executive salary grids and banking wire ledgers.</p>
          </div>
        </button>

        {/* Box 3: Executive Board (Unauthorized) */}
        <button
          onClick={() => handleSelectBox('exec')}
          className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
            selectedBox === 'exec'
              ? 'bg-[#1c0c14] border-rose-500 shadow-lg shadow-rose-500/10 ring-2 ring-rose-400/20'
              : 'bg-[#121420] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-200">Box #900: ws_executive</span>
            <Lock size={16} className="text-rose-400" />
          </div>
          <div className="text-xs text-gray-400 font-sans space-y-1">
            <p className="text-rose-400 font-semibold font-mono text-[11px]">🛑 Unauthorized Access</p>
            <p>Contains: Merger minutes and board acquisition strategies.</p>
          </div>
        </button>
      </div>

      {/* Vault Response Simulation Screen */}
      <div className={`rounded-2xl p-5 border font-sans text-xs sm:text-sm leading-relaxed transition ${
        hasAccess
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 font-bold font-mono">
            {hasAccess ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-emerald-300">HTTP 200 OK — Safe Deposit Box Opened</span>
              </>
            ) : (
              <>
                <ShieldAlert size={16} className="text-rose-400" />
                <span className="text-rose-300">HTTP 404 Not Found — Silent BOLA Defense</span>
              </>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded text-gray-400">
            {hasAccess ? 'Authorized Grant' : 'Defense Triggered'}
          </span>
        </div>

        <p className="text-gray-300 text-xs leading-relaxed">
          {hasAccess
            ? 'Your JWT claim matches workspace_id = ws_legal_hr. Relational SQLite rows and Qdrant vectors are released.'
            : 'Crucial OWASP defense: The server returns 404 (Not Found) rather than 403 (Forbidden). The attacker receives zero confirmation that Box #204 exists, completely preventing ID enumeration.'}
        </p>
      </div>
    </div>
  );
};
