'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, Send, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Cpu, Wrench } from 'lucide-react';
import { NexaProduct } from '@/lib/nexaData';

interface AiProductAssistantProps {
  onApplyRecommendationToRfq?: (recommendation: any) => void;
}

const PRESET_PROMPTS = [
  'I need a corrosion-resistant component for outdoor industrial use.',
  'Recommend a high-pressure valve for subsea hydrogen and cryogenic fluids.',
  'Suggest a zero-backlash high torque gearbox for 6-axis industrial robots.',
  'Find an aerospace superalloy turbine rotor for 1,100°C thermal environments.',
];

export default function AiProductAssistant({ onApplyRecommendationToRfq }: AiProductAssistantProps) {
  const [query, setQuery] = useState<string>('I need a corrosion-resistant component for outdoor industrial use.');
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAskAssistant = async (promptText: string) => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const res = await fetch('/api/gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: promptText }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate recommendation');
      }

      setRecommendation(data.recommendation);
    } catch (err: any) {
      console.error('AI Assistant Error:', err);
      setError(err?.message || 'Error communicating with Gemini AI assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#E11D48] font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>GEMINI 3.6 FLASH POWERED METALLURGICAL CONSULTANT</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-tech">AI PRODUCT &amp; MATERIAL ASSISTANT</h2>
        </div>

        <div className="px-3 py-1.5 bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] font-mono text-xs rounded-lg flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span>STRUCTURED ENGINEERING REASONING ENGINE</span>
        </div>
      </div>

      {/* Query Input Section */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 space-y-4">
        <label className="text-xs font-mono text-gray-300 font-bold uppercase">
          DESCRIBE YOUR OPERATING ENVIRONMENT &amp; TECHNICAL REQUIREMENTS:
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) handleAskAssistant(query);
            }}
            placeholder="e.g. I need a corrosion-resistant component for outdoor industrial use..."
            className="flex-1 bg-[#0B0C0E] border border-white/20 rounded-xl p-3.5 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
          />

          <button
            onClick={() => query.trim() && handleAskAssistant(query)}
            disabled={loading}
            className="px-6 py-3.5 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-tech text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>CONSULT AI ENGINEER</span>
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-gray-400">PRESET TECHNICAL QUERIES:</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(prompt);
                  handleAskAssistant(prompt);
                }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-xs rounded-lg border border-white/10 transition-all text-left"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State Indicator */}
      {loading && (
        <div className="bg-[#121418] border border-white/10 rounded-xl p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#E11D48] animate-spin mx-auto" />
          <div className="text-sm font-bold text-white font-tech">ANALYZING METALLURGICAL &amp; STRESS LOAD PARAMETERS...</div>
          <p className="text-xs font-mono text-gray-400">
            Evaluating Inconel, Duplex Stainless, Monel, and Titanium superalloys against ISO/AS9100 standards.
          </p>
        </div>
      )}

      {/* Error Output */}
      {error && (
        <div className="bg-[#1B1216] border border-[#E11D48] rounded-xl p-5 text-xs font-mono text-[#E11D48]">
          ERROR: {error}
        </div>
      )}

      {/* AI Recommendation Result Card */}
      {recommendation && (
        <div className="bg-[#121418] border border-[#E11D48]/50 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48]/10 blur-3xl pointer-events-none" />

          {/* Result Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-[#E11D48] font-bold">
                RECOMMENDED PART: {recommendation.recommendedPartNumber}
              </div>
              <h3 className="text-2xl font-bold text-white font-tech">{recommendation.productName}</h3>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-gray-400">ESTIMATED UNIT PRICE</div>
              <div className="text-xl font-bold text-white font-tech">{recommendation.estimatedUnitPrice}</div>
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#0B0C0E] border border-white/10 rounded-xl p-4 font-mono text-xs">
            <div>
              <span className="text-gray-400">PRIMARY MATERIAL:</span>
              <div className="text-white font-bold">{recommendation.primaryMaterial}</div>
            </div>
            <div>
              <span className="text-gray-400">MAX PRESSURE:</span>
              <div className="text-white font-bold">{recommendation.specifications?.maxPressure}</div>
            </div>
            <div>
              <span className="text-gray-400">TEMP RATING:</span>
              <div className="text-white font-bold">{recommendation.specifications?.temperatureRating}</div>
            </div>
            <div>
              <span className="text-gray-400">SURFACE TOLERANCE:</span>
              <div className="text-white font-bold">{recommendation.specifications?.surfaceTolerance}</div>
            </div>
          </div>

          {/* Rationale & Certifications */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-mono text-[#E11D48] font-bold uppercase">METALLURGICAL &amp; ENGINEERING RATIONALE</h4>
            <p className="text-xs text-gray-300 leading-relaxed bg-[#0B0C0E] p-4 rounded-xl border border-white/10">
              {recommendation.engineeringRationale}
            </p>
          </div>

          {/* Certifications Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-gray-400 mr-2">COMPLIANCE CERTIFICATIONS:</span>
            {recommendation.certifications?.map((cert: string, i: number) => (
              <span key={i} className="px-2.5 py-1 bg-white/10 border border-white/20 text-white font-mono text-[11px] rounded">
                {cert}
              </span>
            ))}
          </div>

          {/* Transfer to RFQ Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => onApplyRecommendationToRfq?.(recommendation)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-tech text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
            >
              <span>APPLY THIS AI RECOMMENDATION TO RFQ BUILDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
