'use client';

import React, { useState } from 'react';
import { CrmLead } from '@/lib/nexaData';
import { Users, FileText, CheckCircle2, DollarSign, Award, Clock, ArrowRight, ShieldCheck, ChevronRight, Plus, Sparkles, AlertCircle } from 'lucide-react';

interface CrmModuleProps {
  leads: CrmLead[];
  onUpdateLeadStage: (leadId: string, newStage: CrmLead['stage']) => void;
  onOpenQuotePreview?: (lead: CrmLead) => void;
}

const STAGES: CrmLead['stage'][] = [
  'New Lead',
  'Qualified',
  'Quotation',
  'Negotiation',
  'Won',
  'Production',
  'Dispatch',
  'Completed',
];

export default function CrmModule({ leads, onUpdateLeadStage, onOpenQuotePreview }: CrmModuleProps) {
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(leads[0] || null);
  const [activeTabStage, setActiveTabStage] = useState<string>('ALL');

  const filteredLeads = activeTabStage === 'ALL'
    ? leads
    : leads.filter((l) => l.stage === activeTabStage);

  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
  const wonValue = leads.filter((l) => l.stage === 'Won' || l.stage === 'Production' || l.stage === 'Completed').reduce((acc, curr) => acc + curr.estimatedValue, 0);

  return (
    <div className="space-y-6">
      {/* Top Telemetry KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">TOTAL PIPELINE VALUE</div>
          <div className="text-2xl font-black font-tech text-white mt-1">
            ${(totalPipelineValue / 1000000).toFixed(2)}M USD
          </div>
          <div className="text-[11px] font-mono text-[#E11D48] mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Lead Velocity +24% YoY</span>
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">WON / PRODUCTION REVENUE</div>
          <div className="text-2xl font-black font-tech text-[#E11D48] mt-1">
            ${(wonValue / 1000000).toFixed(2)}M USD
          </div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">
            Contract Win Rate: 72.8%
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">ACTIVE ENTERPRISE LEADS</div>
          <div className="text-2xl font-black font-tech text-white mt-1">
            {leads.length} LEADS
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">
            100% Verified Tier-1 OEMs
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">AVG AI LEAD SCORE</div>
          <div className="text-2xl font-black font-tech text-white mt-1">
            95.5 / 100
          </div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">
            Automated Qualification Active
          </div>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        <button
          onClick={() => setActiveTabStage('ALL')}
          className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-lg border transition-all ${
            activeTabStage === 'ALL'
              ? 'bg-[#E11D48] text-white border-[#E11D48]'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
          }`}
        >
          ALL LEADS ({leads.length})
        </button>
        {STAGES.map((stg) => {
          const count = leads.filter((l) => l.stage === stg).length;
          return (
            <button
              key={stg}
              onClick={() => setActiveTabStage(stg)}
              className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                activeTabStage === stg
                  ? 'bg-[#E11D48] text-white border-[#E11D48]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              {stg.toUpperCase()} ({count})
            </button>
          );
        })}
      </div>

      {/* CRM Main Grid View: Leads List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads Table / Cards Column */}
        <div className="lg:col-span-7 space-y-3">
          {filteredLeads.map((lead) => {
            const isSelected = selectedLead?.id === lead.id;
            return (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#181B22] border-[#E11D48] shadow-[0_0_20px_rgba(225,29,72,0.2)]'
                    : 'bg-[#121418] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#E11D48] font-bold">{lead.rfqNumber}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                      {lead.country}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-white">
                    ${lead.estimatedValue.toLocaleString()} USD
                  </span>
                </div>

                <div className="text-base font-bold text-white font-tech">{lead.companyName}</div>
                <div className="text-xs text-gray-400 mt-1 font-sans">
                  {lead.productName} ({lead.quantity} units)
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">STAGE:</span>
                    <span className="px-2 py-0.5 bg-[#E11D48]/20 text-[#E11D48] rounded font-bold">
                      {lead.stage}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span>AI SCORE: {lead.leadScore}/100</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Lead Inspector Box */}
        {selectedLead ? (
          <div className="lg:col-span-5 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#E11D48] font-bold">{selectedLead.rfqNumber}</span>
                <h3 className="text-xl font-bold text-white font-tech">{selectedLead.companyName}</h3>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono text-gray-400">DEAL VALUE</div>
                <div className="text-lg font-bold text-white font-tech">${selectedLead.estimatedValue.toLocaleString()}</div>
              </div>
            </div>

            {/* Quick Stage Change Controls */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase font-semibold">
                PIPELINE STAGE PROGRESSION
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STAGES.map((stg) => {
                  const isActive = selectedLead.stage === stg;
                  return (
                    <button
                      key={stg}
                      onClick={() => onUpdateLeadStage(selectedLead.id, stg)}
                      className={`px-3 py-2 text-xs font-mono rounded border transition-all ${
                        isActive
                          ? 'bg-[#E11D48] text-white border-[#E11D48] font-bold'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {stg}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lead Specifications */}
            <div className="bg-[#0B0C0E] border border-white/10 rounded-lg p-4 space-y-2 text-xs font-mono">
              <div className="text-[#E11D48] font-bold">SPECIFICATION HIGHLIGHTS</div>
              <div className="text-gray-300">{selectedLead.specifications}</div>
              <div className="text-gray-400 pt-2 border-t border-white/10">
                Contact: <span className="text-white">{selectedLead.contactName}</span> ({selectedLead.email})
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase font-semibold">
                AUTOMATED ACTIVITY &amp; AUDIT LOG
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedLead.activityLog.map((log, i) => (
                  <div key={i} className="text-xs font-mono bg-white/[0.02] border border-white/5 p-2.5 rounded">
                    <span className="text-[#E11D48] font-bold">{log.time}</span>: <span className="text-gray-300">{log.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Action */}
            <button
              onClick={() => onOpenQuotePreview?.(selectedLead)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#E11D48]" />
              <span>GENERATE OFFICIAL QUOTATION PDF</span>
            </button>
          </div>
        ) : (
          <div className="lg:col-span-5 bg-[#121418] border border-white/10 rounded-xl p-8 flex items-center justify-center text-center text-gray-500 font-mono text-xs">
            SELECT A LEAD FROM THE PIPELINE LIST TO INSPECT &amp; ADVANCE STAGE
          </div>
        )}
      </div>
    </div>
  );
}
