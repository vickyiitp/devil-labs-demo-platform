'use client';

import React from 'react';
import { Award, Layers, Download, Users, Briefcase, Percent, Shield } from 'lucide-react';

export default function DealerPortalModule() {
  return (
    <div className="space-y-6">
      {/* Dealer Level Banner */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#E11D48] font-bold uppercase">
            CERTIFIED DEALER &amp; REGIONAL WHOLESALER NETWORK
          </div>
          <h2 className="text-2xl font-bold text-white font-tech">TIER-1 OEM DEALER DASHBOARD</h2>
        </div>

        <div className="px-4 py-2 bg-[#E11D48]/20 border border-[#E11D48] text-white font-mono text-xs font-bold rounded-lg flex items-center gap-2">
          <Award className="w-4 h-4 text-[#E11D48]" />
          <span>GOLD AUTHORIZED WHOLESALER (TIER A -18% DISCOUNT)</span>
        </div>
      </div>

      {/* Dealer Matrix & Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tier Pricing Table */}
        <div className="lg:col-span-8 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-tech border-b border-white/10 pb-4">
            WHOLESALE DISCOUNT TIER STRUCTURE
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {[
              { tier: 'TIER 1 GOLD OEM DIRECT', minVolume: '$1,000,000+', margin: '18% Wholesale Discount', support: '24/7 Dedicated Engineering Lead' },
              { tier: 'TIER 2 SILVER DISTRIBUTOR', minVolume: '$250,000+', margin: '12% Wholesale Discount', support: 'Priority 12h Email Support' },
              { tier: 'TIER 3 REGIONAL AGENT', minVolume: '$50,000+', margin: '8% Wholesale Discount', support: 'Standard Portal Access' },
            ].map((row, i) => (
              <div key={i} className="p-4 bg-[#0B0C0E] border border-white/10 rounded-lg flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-white font-tech">{row.tier}</div>
                  <div className="text-gray-400 text-[11px]">Annual Volume: {row.minVolume}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#E11D48] font-bold">{row.margin}</div>
                  <div className="text-gray-400 text-[11px]">{row.support}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing & Technical Asset Download Hub */}
        <div className="lg:col-span-4 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-tech border-b border-white/10 pb-4">
            DEALER ASSETS &amp; BRAND KITS
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {[
              'NEXA_PRODUCT_CATALOG_2026_HIGHRES.PDF',
              'CAD_3D_ASSEMBLY_LIBRARY_PACK.ZIP',
              'DEALER_COMMISSION_STRUCTURE_2026.PDF',
              'SUPERALLOY_TECHNICAL_SPECS_WHITE_PAPER.PDF',
            ].map((file, i) => (
              <div key={i} className="p-3 bg-[#0B0C0E] border border-white/10 rounded-lg flex items-center justify-between hover:border-[#E11D48] transition-all">
                <span className="truncate text-gray-300 pr-2">{file}</span>
                <button className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
