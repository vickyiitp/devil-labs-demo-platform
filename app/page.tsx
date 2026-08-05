'use client';

import React, { useState } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_LEADS,
  INITIAL_INVENTORY,
  INITIAL_ORDERS,
  NexaProduct,
  CrmLead,
  InventoryItem,
  CustomerOrder,
} from '@/lib/nexaData';

import ComponentViewer3D from '@/components/ComponentViewer3D';
import CinematicIntro from '@/components/CinematicIntro';
import ProductDiscovery from '@/components/ProductDiscovery';
import RfqSystem from '@/components/RfqSystem';

import CrmModule from '@/components/modules/CrmModule';
import CustomerPortalModule from '@/components/modules/CustomerPortalModule';
import InventoryModule from '@/components/modules/InventoryModule';
import FinanceModule from '@/components/modules/FinanceModule';
import DealerPortalModule from '@/components/modules/DealerPortalModule';
import AutomationModule from '@/components/modules/AutomationModule';
import AiProductAssistant from '@/components/modules/AiProductAssistant';
import QuotePdfModal from '@/components/QuotePdfModal';

import {
  ShieldCheck,
  Layers,
  Cpu,
  Users,
  Package,
  DollarSign,
  Briefcase,
  Zap,
  Bot,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Globe2,
  Activity,
  Play,
  RotateCcw,
} from 'lucide-react';

export default function NexaIndustriesApp() {
  // Navigation Mode: 'PUBLIC_SITE' | 'ENTERPRISE_OS'
  const [viewMode, setViewMode] = useState<'PUBLIC_SITE' | 'ENTERPRISE_OS'>('PUBLIC_SITE');

  // Enterprise OS Sub-Module: 'CRM' | 'PORTAL' | 'INVENTORY' | 'FINANCE' | 'DEALER' | 'AUTOMATION' | 'AI_ASSISTANT'
  const [activeOsModule, setActiveOsModule] = useState<
    'CRM' | 'PORTAL' | 'INVENTORY' | 'FINANCE' | 'DEALER' | 'AUTOMATION' | 'AI_ASSISTANT'
  >('CRM');

  // Intro Cinema State
  const [showCinematicIntro, setShowCinematicIntro] = useState<boolean>(true);

  // Data States
  const [products] = useState<NexaProduct[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<NexaProduct>(INITIAL_PRODUCTS[0]);
  const [configuredParams, setConfiguredParams] = useState<Record<string, string>>({});
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [orders] = useState<CustomerOrder[]>(INITIAL_ORDERS);

  // Modal State
  const [quoteLeadForPdf, setQuoteLeadForPdf] = useState<CrmLead | null>(null);

  // Handle RFQ Submission from Public Web App
  const handleRfqSubmitted = (newLead: CrmLead) => {
    setLeads((prev) => [newLead, ...prev]);
    setViewMode('ENTERPRISE_OS');
    setActiveOsModule('CRM');
  };

  // Update Lead Stage in CRM
  const handleUpdateLeadStage = (leadId: string, newStage: CrmLead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  // Scroll smooth to RFQ section
  const scrollToRfqSection = () => {
    const el = document.getElementById('rfq-builder-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F4F4F6] font-sans flex flex-col selection:bg-[#E11D48] selection:text-white">
      {/* Global Top Infrastructure Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0E1014]/90 border-b border-white/10 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E11D48] rounded flex items-center justify-center font-tech font-black text-white text-lg tracking-wider shadow-[0_0_15px_rgba(225,29,72,0.5)]">
              N
            </div>
            <div>
              <span className="font-tech text-xl font-extrabold tracking-widest text-white uppercase">
                NEXA
              </span>
              <span className="text-[10px] font-mono text-gray-400 block -mt-1 tracking-widest">
                INDUSTRIES // B2B INFRASTRUCTURE
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded font-mono text-[11px] text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>8 MANUFACTURING PLANTS LIVE</span>
          </div>
        </div>

        {/* View Switcher: Public Capability Showcase vs Enterprise Operating System */}
        <div className="flex items-center gap-2 bg-[#14171D] border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setViewMode('PUBLIC_SITE')}
            className={`px-4 py-2 font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              viewMode === 'PUBLIC_SITE'
                ? 'bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>PUBLIC SHOWCASE &amp; RFQ</span>
          </button>

          <button
            onClick={() => setViewMode('ENTERPRISE_OS')}
            className={`px-4 py-2 font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              viewMode === 'ENTERPRISE_OS'
                ? 'bg-[#E11D48] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>NEXA OPERATING SYSTEM</span>
          </button>
        </div>
      </header>

      {/* VIEW 1: PUBLIC CAPABILITY SHOWCASE & RFQ BUILDER */}
      {viewMode === 'PUBLIC_SITE' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-16">
          {/* Section 1: Cinematic Opening Sequence */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E11D48] font-bold">
                <Activity className="w-4 h-4" />
                <span>CINEMATIC INDUSTRIAL ENGINEERING INTRO</span>
              </div>

              {!showCinematicIntro && (
                <button
                  onClick={() => setShowCinematicIntro(true)}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs rounded border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY CINEMATIC INTRO</span>
                </button>
              )}
            </div>

            {showCinematicIntro ? (
              <CinematicIntro onComplete={() => setShowCinematicIntro(false)} />
            ) : (
              <div className="bg-[#121418] border border-white/10 rounded-2xl p-8 text-center space-y-4">
                <div className="font-tech text-4xl md:text-6xl font-black text-white tracking-widest uppercase">
                  NEXA INDUSTRIES
                </div>
                <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed">
                  Precision engineered components for aerospace turbines, cryogenic manifolds, deepsea wellheads, and zero-backlash robotic transmissions.
                </p>
              </div>
            )}
          </section>

          {/* Section 2: Interactive 3D Model Inspection with Exploded View */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#E11D48] font-bold uppercase">
                  INTERACTIVE 3D COMPONENT INSPECTION
                </span>
                <h2 className="text-2xl font-bold text-white font-tech">
                  REAL-TIME WEBGL METALLURGY &amp; EXPLODED VIEW
                </h2>
              </div>

              {/* Select Product for 3D View */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-gray-400 hidden sm:inline">SELECT PRODUCT:</span>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const match = products.find((p) => p.id === e.target.value);
                    if (match) setSelectedProduct(match);
                  }}
                  className="bg-[#121418] border border-white/20 text-white rounded-lg px-3 py-1.5 focus:border-[#E11D48] outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.partNumber} - {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ComponentViewer3D
              product={selectedProduct}
              onRequestQuote={scrollToRfqSection}
            />
          </section>

          {/* Section 3: Product Discovery Hierarchy */}
          <section>
            <ProductDiscovery
              products={products}
              onSelectConfiguredProduct={(prod, config) => {
                setSelectedProduct(prod);
                setConfiguredParams(config);
                scrollToRfqSection();
              }}
            />
          </section>

          {/* Section 4: RFQ System Builder */}
          <section id="rfq-builder-section">
            <RfqSystem
              initialProduct={selectedProduct}
              initialConfig={configuredParams}
              onSubmitRfq={handleRfqSubmitted}
            />
          </section>
        </main>
      )}

      {/* VIEW 2: NEXA ENTERPRISE OPERATING SYSTEM */}
      {viewMode === 'ENTERPRISE_OS' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* OS Header Telemetry & Module Switcher Tabs */}
          <div className="bg-[#121418] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-mono text-[#E11D48] font-bold uppercase tracking-widest">
                  INTERNAL COMPANY OPERATING SYSTEM
                </div>
                <h1 className="text-3xl font-extrabold text-white font-tech tracking-tight">
                  NEXA ENTERPRISE INFRASTRUCTURE OS
                </h1>
              </div>

              {/* Status Telemetry */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-300">
                <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg font-bold">
                  ● CRM SYNC ACTIVE
                </span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                  PLANTS: GERMANY / US / JAPAN
                </span>
              </div>
            </div>

            {/* Operating System Module Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {[
                { id: 'CRM', label: 'CRM PIPELINE', icon: Users },
                { id: 'PORTAL', label: 'CLIENT PORTAL', icon: Briefcase },
                { id: 'INVENTORY', label: 'INVENTORY', icon: Package },
                { id: 'FINANCE', label: 'FINANCE', icon: DollarSign },
                { id: 'DEALER', label: 'DEALERS', icon: ShieldCheck },
                { id: 'AUTOMATION', label: 'AUTOMATION', icon: Zap },
                { id: 'AI_ASSISTANT', label: 'AI ASSISTANT', icon: Bot },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeOsModule === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveOsModule(tab.id as any)}
                    className={`p-3 rounded-xl border font-mono text-xs font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_20px_rgba(225,29,72,0.4)]'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Render Active Sub-Module */}
          {activeOsModule === 'CRM' && (
            <CrmModule
              leads={leads}
              onUpdateLeadStage={handleUpdateLeadStage}
              onOpenQuotePreview={(lead) => setQuoteLeadForPdf(lead)}
            />
          )}

          {activeOsModule === 'PORTAL' && (
            <CustomerPortalModule orders={orders} />
          )}

          {activeOsModule === 'INVENTORY' && (
            <InventoryModule inventory={inventory} />
          )}

          {activeOsModule === 'FINANCE' && <FinanceModule />}

          {activeOsModule === 'DEALER' && <DealerPortalModule />}

          {activeOsModule === 'AUTOMATION' && <AutomationModule />}

          {activeOsModule === 'AI_ASSISTANT' && (
            <AiProductAssistant
              onApplyRecommendationToRfq={() => {
                setViewMode('PUBLIC_SITE');
                setTimeout(() => scrollToRfqSection(), 300);
              }}
            />
          )}
        </main>
      )}

      {/* Official Quotation PDF Modal */}
      {quoteLeadForPdf && (
        <QuotePdfModal
          lead={quoteLeadForPdf}
          onClose={() => setQuoteLeadForPdf(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#0B0C0E] border-t border-white/10 py-8 px-4 sm:px-8 text-center text-xs font-mono text-gray-500 space-y-2 mt-auto">
        <div>NEXA INDUSTRIES GMBH // DIGITAL MANUFACTURING INFRASTRUCTURE</div>
        <div>ISO 9001:2015 &amp; AS9100D AEROSPACE CERTIFIED // STUTTGART • HOUSTON • SINGAPORE • NAGOYA</div>
      </footer>
    </div>
  );
}
