'use client';

import React, { useState } from 'react';
import { NexaProduct } from '@/lib/nexaData';
import { ArrowRight, CheckCircle2, Sliders, ShieldCheck, Cpu, Factory, ChevronRight } from 'lucide-react';

interface ProductDiscoveryProps {
  products: NexaProduct[];
  onSelectConfiguredProduct: (product: NexaProduct, config: Record<string, string>) => void;
}

const INDUSTRIES = [
  { id: 'aerospace', name: 'Aerospace & Defense', icon: '✈️', desc: 'Turbomachinery, jet propulsion, missile actuation & space launch' },
  { id: 'energy', name: 'Energy & Offshore', icon: '⚡', desc: 'Subsea oil & gas wellheads, LNG regasification, hydrogen valves' },
  { id: 'mining', name: 'Heavy Machinery & Mining', icon: '🚜', desc: 'Autonomous excavators, hydraulic presses, tunneling shields' },
  { id: 'robotics', name: 'Precision Robotics & Industrial Automation', icon: '🤖', desc: '6-axis articulated robots, semiconductor stages, CNC drives' },
];

const APPLICATIONS: Record<string, string[]> = {
  aerospace: ['Extreme Temperature Turbines', 'Cryogenic Propellant Valves', 'High-Temperature Turbines'],
  energy: ['High-Pressure Flow Control', 'Cryogenic Fluids', 'Subsea Manifolds'],
  mining: ['Hydro-Mechanical Actuators', 'Precision Motion Transmissions', 'Heavy Thrust Cylinders'],
  robotics: ['Precision Motion Transmissions', 'Zero-Backlash Servo Drives', 'Smart Sensor Housings'],
};

export default function ProductDiscovery({ products, onSelectConfiguredProduct }: ProductDiscoveryProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('aerospace');
  const [selectedApplication, setSelectedApplication] = useState<string>('Extreme Temperature Turbines');
  const [selectedFamily, setSelectedFamily] = useState<string>(products[0]?.id || 'prod-x1');

  // Configuration options
  const [alloyGrade, setAlloyGrade] = useState<string>('Inconel 718 Vacuum Melted');
  const [surfaceFinish, setSurfaceFinish] = useState<string>('Ra 0.2µm Diamond Polished');
  const [toleranceGrade, setToleranceGrade] = useState<string>('ISO Grade IT 4 (±0.002mm)');
  const [pressureClass, setPressureClass] = useState<string>('Class 2500 (500 Bar)');

  const currentProduct = products.find((p) => p.id === selectedFamily) || products[0];

  const handleLaunchRfq = () => {
    if (!currentProduct) return;
    onSelectConfiguredProduct(currentProduct, {
      industry: INDUSTRIES.find((i) => i.id === selectedIndustry)?.name || 'Aerospace',
      application: selectedApplication,
      alloyGrade,
      surfaceFinish,
      toleranceGrade,
      pressureClass,
    });
  };

  return (
    <div className="w-full bg-[#111317] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-[#E11D48] tracking-widest uppercase font-semibold">
            5-STEP GUIDED SELECTED ENGINE
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-tech tracking-tight">
            PRODUCT DISCOVERY &amp; CUSTOM CONFIGURATION
          </h2>
        </div>

        {/* Workflow Breadcrumb Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="text-[#E11D48] font-bold">1. INDUSTRY</span>
          <span>→</span>
          <span className="text-white">2. APPLICATION</span>
          <span>→</span>
          <span className="text-white">3. FAMILY</span>
          <span>→</span>
          <span className="text-white">4. CONFIG</span>
          <span>→</span>
          <span className="text-[#E11D48]">5. RFQ</span>
        </div>
      </div>

      {/* Step 1: Industry Selection Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-400 uppercase font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
          <span>STEP 1: SELECT YOUR INDUSTRIAL SECTOR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setSelectedIndustry(ind.id);
                  const apps = APPLICATIONS[ind.id] || [];
                  if (apps.length > 0) setSelectedApplication(apps[0]);
                }}
                className={`text-left p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-[#1C1F26] border-[#E11D48] shadow-[0_0_20px_rgba(225,29,72,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ind.icon}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#E11D48]" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-tech">{ind.name}</div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ind.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Application Context */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-400 uppercase font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
          <span>STEP 2: TARGET ENGINEERING APPLICATION</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {(APPLICATIONS[selectedIndustry] || []).map((app) => {
            const isSelected = selectedApplication === app;
            return (
              <button
                key={app}
                onClick={() => setSelectedApplication(app)}
                className={`px-5 py-2.5 rounded-lg font-mono text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {app}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Product Family Match */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-400 uppercase font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
          <span>STEP 3: MATCHING PRODUCT FAMILY CATALOG</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => {
            const isSelected = selectedFamily === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedFamily(p.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#1C2028] border-[#E11D48] shadow-md'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-[11px] font-mono text-[#E11D48] font-bold">{p.partNumber}</div>
                <div className="text-sm font-bold text-white font-tech mt-1">{p.name}</div>
                <div className="text-xs text-gray-400 mt-2 font-mono">{p.material.split(' ')[0]}</div>
                <div className="text-xs text-white font-semibold mt-3">From ${p.basePrice.toLocaleString()} USD</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: Configuration Matrix */}
      {currentProduct && (
        <div className="bg-[#15181E] border border-white/10 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#E11D48] font-bold uppercase">
                STEP 4: PARAMETRIC CONFIGURATION
              </span>
              <h3 className="text-xl font-bold text-white font-tech">{currentProduct.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-gray-400">ESTIMATED LEAD TIME</div>
              <div className="text-sm font-bold text-white font-mono">{currentProduct.leadTime}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Config 1: Alloy Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-semibold uppercase">
                ALLOY &amp; METALLURGY
              </label>
              <select
                value={alloyGrade}
                onChange={(e) => setAlloyGrade(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
              >
                <option value="Inconel 718 Vacuum Melted">Inconel 718 Vacuum Melted</option>
                <option value="Monel 400 Nickel Alloy">Monel 400 Nickel Alloy</option>
                <option value="Duplex 2205 Super Stainless">Duplex 2205 Super Stainless</option>
                <option value="Titanium Grade 5 Ti-6Al-4V">Titanium Grade 5 Ti-6Al-4V</option>
                <option value="AISI 4340 Nitrided Alloy Steel">AISI 4340 Nitrided Alloy Steel</option>
              </select>
            </div>

            {/* Config 2: Surface Finish */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-semibold uppercase">
                SURFACE FINISHING
              </label>
              <select
                value={surfaceFinish}
                onChange={(e) => setSurfaceFinish(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
              >
                <option value="Ra 0.2µm Diamond Polished">Ra 0.2µm Diamond Polished</option>
                <option value="Ra 0.4µm Precision Ground">Ra 0.4µm Precision Ground</option>
                <option value="Plasma Nitrided 68 HRC">Plasma Nitrided 68 HRC</option>
                <option value="Thermal Barrier Ceramic Coating">Thermal Barrier Ceramic Coating</option>
              </select>
            </div>

            {/* Config 3: Tolerance Class */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-semibold uppercase">
                TOLERANCE CLASS
              </label>
              <select
                value={toleranceGrade}
                onChange={(e) => setToleranceGrade(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
              >
                <option value="ISO Grade IT 4 (±0.002mm)">ISO Grade IT 4 (±0.002mm)</option>
                <option value="ISO Grade IT 6 (±0.005mm)">ISO Grade IT 6 (±0.005mm)</option>
                <option value="Aerospace Class A1 Micro-Tolerance">Aerospace Class A1 Micro-Tolerance</option>
              </select>
            </div>

            {/* Config 4: Pressure Rating */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 font-semibold uppercase">
                PRESSURE CLASS
              </label>
              <select
                value={pressureClass}
                onChange={(e) => setPressureClass(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
              >
                <option value="Class 2500 (500 Bar)">Class 2500 (500 Bar / 7,250 PSI)</option>
                <option value="Class 1500 (300 Bar)">Class 1500 (300 Bar)</option>
                <option value="Ultra-High 1000 Bar Pressure">Ultra-High 1000 Bar Pressure</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Submit & Request Quote Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="text-xs font-mono text-gray-400">
          CONFIRMED SPECIFICATION MATCH: <span className="text-white font-bold">{currentProduct?.partNumber}</span> ({alloyGrade})
        </div>

        <button
          onClick={handleLaunchRfq}
          className="w-full sm:w-auto px-8 py-4 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-tech text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(225,29,72,0.4)] flex items-center justify-center gap-3"
        >
          <span>TRANSFER CONFIGURATION TO RFQ SYSTEM</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
