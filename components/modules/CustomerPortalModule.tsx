'use client';

import React, { useState } from 'react';
import { CustomerOrder } from '@/lib/nexaData';
import { Package, Truck, FileText, Download, ShieldCheck, MapPin, ExternalLink, Anchor } from 'lucide-react';

interface CustomerPortalProps {
  orders: CustomerOrder[];
}

export default function CustomerPortalModule({ orders }: CustomerPortalProps) {
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(orders[0] || null);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#121418] border border-white/10 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#E11D48] font-bold uppercase">
            SECURE CLIENT PORTAL // LOCKHEED MARTIN DEFENSE
          </div>
          <h2 className="text-2xl font-bold text-white font-tech">ORDERS, SHIPMENT GPS &amp; DOCUMENT VAULT</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>256-BIT ENCRYPTED CERTIFICATE VAULT</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-gray-400 uppercase font-semibold">
            CONTRACTED PURCHASE ORDERS ({orders.length})
          </div>

          <div className="space-y-3">
            {orders.map((ord) => {
              const isSelected = selectedOrder?.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#181B22] border-[#E11D48] shadow-md'
                      : 'bg-[#121418] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#E11D48] font-bold">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 bg-white/10 text-white font-mono text-[10px] rounded uppercase font-semibold">
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white font-tech">
                    {ord.items[0]?.part}
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs font-mono text-gray-400">
                    <span>ETA: {ord.eta}</span>
                    <span className="text-white font-bold">${ord.totalAmount.toLocaleString()} USD</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Shipment GPS & Document Inspector */}
        {selectedOrder && (
          <div className="lg:col-span-7 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#E11D48] font-bold">{selectedOrder.orderNumber}</span>
                <h3 className="text-xl font-bold text-white font-tech">LIVE VESSEL &amp; AIR FREIGHT GPS</h3>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono text-gray-400">TRACKING REF</div>
                <div className="text-sm font-mono text-white font-bold">{selectedOrder.trackingNumber}</div>
              </div>
            </div>

            {/* Simulated Live Route Map Box */}
            <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-6 relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-[#E11D48]" />
                  <span>ORIGIN: {selectedOrder.originPort}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Anchor className="w-4 h-4 text-sky-400" />
                  <span>DEST: {selectedOrder.destPort}</span>
                </div>
              </div>

              {/* Progress Line */}
              <div className="relative py-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E11D48] via-amber-400 to-emerald-400 w-3/4 rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mt-2">
                  <span>DEPARTED PORT</span>
                  <span className="text-amber-400 font-bold">IN TRANSIT (75% ROUTE COMPLETE)</span>
                  <span>CUSTOMS CLEARANCE</span>
                </div>
              </div>

              {selectedOrder.vesselName && (
                <div className="text-xs font-mono text-gray-300 bg-white/5 p-3 rounded border border-white/10 flex items-center justify-between">
                  <span>CARRIER: {selectedOrder.vesselName}</span>
                  <span className="text-emerald-400">SATELLITE POSITION OK</span>
                </div>
              )}
            </div>

            {/* Document Vault Downloads */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase font-semibold">
                EN 10204 3.1 MILL TEST &amp; QUALITY CERTIFICATES
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'EN_10204_3.1_MILL_INSPECTION_CERT.PDF',
                  'XRAY_RADIOGRAPH_BLADE_INSPECTION.PDF',
                  'ISO_9001_AEROSPACE_COMPLIANCE.PDF',
                  'COMMERCIAL_INVOICE_TAX_PAID.PDF',
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#0B0C0E] border border-white/10 rounded-lg flex items-center justify-between hover:border-[#E11D48] transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-300 truncate">
                      <FileText className="w-4 h-4 text-[#E11D48]" />
                      <span className="truncate">{doc}</span>
                    </div>

                    <button className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
