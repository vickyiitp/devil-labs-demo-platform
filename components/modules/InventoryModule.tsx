'use client';

import React, { useState } from 'react';
import { InventoryItem } from '@/lib/nexaData';
import { Warehouse, AlertTriangle, CheckCircle2, RefreshCw, BarChart2, Package, Layers } from 'lucide-react';

interface InventoryModuleProps {
  inventory: InventoryItem[];
}

export default function InventoryModule({ inventory }: InventoryModuleProps) {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('ALL');

  const filteredInventory = selectedWarehouse === 'ALL'
    ? inventory
    : inventory.filter((item) => item.warehouse === selectedWarehouse);

  const lowStockAlerts = inventory.filter((item) => item.status === 'LOW_STOCK' || item.status === 'CRITICAL');

  return (
    <div className="space-y-6">
      {/* Top Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">GLOBAL STOCK VALUE</div>
          <div className="text-2xl font-black font-tech text-white mt-1">$14,850,200 USD</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">4 Global Plants Connected</div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400 font-semibold">REORDER &amp; CRITICAL ALERTS</div>
          <div className="text-2xl font-black font-tech text-[#E11D48] mt-1">{lowStockAlerts.length} ALERTS</div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">Automated Supplier Trigger Active</div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">BATCH TRACEABILITY</div>
          <div className="text-2xl font-black font-tech text-white mt-1">100% SERIALIZED</div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">Full Metallurgical Traceability</div>
        </div>
      </div>

      {/* Warehouse Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {['ALL', 'Stuttgart Plant 1', 'Houston Logistics Hub', 'Singapore Port Depot'].map((wh) => (
          <button
            key={wh}
            onClick={() => setSelectedWarehouse(wh)}
            className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-lg border transition-all ${
              selectedWarehouse === wh
                ? 'bg-[#E11D48] text-white border-[#E11D48]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {wh.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Inventory Items Grid */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-gray-300">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-3 px-2">SKU / BATCH</th>
              <th className="py-3 px-2">ITEM NAME</th>
              <th className="py-3 px-2">PLANT / WAREHOUSE</th>
              <th className="py-3 px-2">STOCK QTY</th>
              <th className="py-3 px-2">STATUS</th>
              <th className="py-3 px-2 text-right">UNIT COST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02]">
                <td className="py-4 px-2 font-bold text-[#E11D48]">{item.sku}<br/><span className="text-[10px] text-gray-400">{item.batchNumber}</span></td>
                <td className="py-4 px-2 font-bold text-white font-sans">{item.name}</td>
                <td className="py-4 px-2 text-gray-400">{item.warehouse}</td>
                <td className="py-4 px-2 font-bold text-white">{item.stockQty.toLocaleString()} units</td>
                <td className="py-4 px-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'OPTIMAL'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.status === 'LOW_STOCK'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-[#E11D48]/20 text-[#E11D48]'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-right text-white font-bold">${item.unitCost} USD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
