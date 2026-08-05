'use client';

import React from 'react';
import { Cpu, Zap, CheckCircle2, ArrowRight, Play, Terminal, Sparkles, ShieldCheck } from 'lucide-react';

export default function AutomationModule() {
  const WORKFLOW_STEPS = [
    { step: '01', title: 'RFQ RECEIVED', desc: 'Buyer submits RFQ on public web portal with attached CAD step file', duration: '0.2s', status: 'COMPLETED' },
    { step: '02', title: 'CRM RECORD CREATED', desc: 'Auto-generates serialized lead entry in PostgreSQL / Firestore CRM pipeline', duration: '0.1s', status: 'COMPLETED' },
    { step: '03', title: 'AI LEAD SCORING', desc: 'Gemini AI evaluates company domain, revenue tier & tolerance specs (Score 98/100)', duration: '0.4s', status: 'COMPLETED' },
    { step: '04', title: 'SALES REP ASSIGNED', desc: 'Routed automatically to Marcus Vance (Sr. Aerospace Lead)', duration: '0.1s', status: 'COMPLETED' },
    { step: '05', title: 'AUTO ACKNOWLEDGEMENT', desc: 'Branded email confirmation sent to client with live tracking link', duration: '0.3s', status: 'COMPLETED' },
    { step: '06', title: 'FEASIBILITY CHECK', desc: 'CMM tolerance and plant machine capacity simulation passed', duration: '0.5s', status: 'COMPLETED' },
    { step: '07', title: 'QUOTATION GENERATED', desc: 'Official PDF quotation QT-8891 rendered with volume discount pricing', duration: '0.3s', status: 'COMPLETED' },
    { step: '08', title: 'CUSTOMER APPROVAL', desc: 'Digital signature & milestone escrow payment link dispatched', duration: 'WAITING', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#E11D48] font-bold uppercase">
            AUTOMATED INDUSTRIAL WORKFLOW ORCHESTRATOR
          </div>
          <h2 className="text-2xl font-bold text-white font-tech">ZERO-FRICTION B2B AUTOMATION ENGINE</h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg">
          <Zap className="w-4 h-4" />
          <span>WORKFLOW EXECUTION: 1.9 SECONDS END-TO-END</span>
        </div>
      </div>

      {/* Visual Workflow Map */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 space-y-6">
        <h3 className="text-sm font-mono text-gray-400 uppercase font-semibold border-b border-white/10 pb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#E11D48]" />
          <span>LIVE EVENT ORCHESTRATION PIPELINE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((ws, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border relative space-y-2 ${
                ws.status === 'COMPLETED'
                  ? 'bg-[#15181F] border-emerald-500/40'
                  : 'bg-[#1B1216] border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E11D48] font-bold">STEP {ws.step}</span>
                <span className="text-gray-400">{ws.duration}</span>
              </div>

              <div className="text-sm font-bold text-white font-tech">{ws.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{ws.desc}</p>

              <div className="pt-2 flex items-center justify-between text-[10px] font-mono border-t border-white/10">
                <span
                  className={ws.status === 'COMPLETED' ? 'text-emerald-400 font-bold' : 'text-[#E11D48] font-bold animate-pulse'}
                >
                  [{ws.status}]
                </span>
                <CheckCircle2 className={`w-3.5 h-3.5 ${ws.status === 'COMPLETED' ? 'text-emerald-400' : 'text-[#E11D48]'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live System Execution Terminal Log */}
      <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-5 font-mono text-xs text-gray-300 space-y-2">
        <div className="flex items-center gap-2 text-gray-400 pb-2 border-b border-white/10">
          <Terminal className="w-4 h-4 text-[#E11D48]" />
          <span>NEXA AUTOMATION SYSTEM LOG CONSOLE</span>
        </div>

        <div className="space-y-1 font-mono text-[11px] text-gray-300">
          <div><span className="text-[#E11D48]">[23:47:18]</span> EVENT: Public RFQ #8891 received from IP 185.220.101.4</div>
          <div><span className="text-[#E11D48]">[23:47:18]</span> DB: Inserted record into PostgreSQL table `crm_leads` (ID: lead-101)</div>
          <div><span className="text-[#E11D48]">[23:47:19]</span> AI: Gemini 3.6 Flash calculated lead confidence index: 98/100</div>
          <div><span className="text-[#E11D48]">[23:47:19]</span> MAIL: Automated SMTP confirmation dispatched to h.vance@airbussafran.de</div>
          <div><span className="text-[#E11D48]">[23:47:20]</span> PDF: Generated quotation document QT-8891 ($1,500,000 USD)</div>
        </div>
      </div>
    </div>
  );
}
