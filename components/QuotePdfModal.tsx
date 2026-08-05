'use client';

import React from 'react';
import { CrmLead } from '@/lib/nexaData';
import { X, Printer, Download, ShieldCheck, CheckCircle2, Building, Calendar, FileText } from 'lucide-react';

interface QuotePdfModalProps {
  lead: CrmLead | null;
  onClose: () => void;
}

export default function QuotePdfModal({ lead, onClose }: QuotePdfModalProps) {
  if (!lead) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121418] border border-white/20 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#E11D48] font-bold">
            <FileText className="w-4 h-4" />
            <span>NEXA ENTERPRISE OFFICIAL QUOTATION PDF</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded border border-white/20 flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>
        </div>

        {/* PDF Document Container */}
        <div id="quote-document-print" className="bg-[#F8FAFC] text-[#0F172A] p-8 rounded-xl space-y-8 font-sans shadow-lg">
          {/* Document Header */}
          <div className="flex justify-between items-start border-b border-slate-300 pb-6">
            <div>
              <div className="font-tech text-3xl font-black text-[#0F172A] tracking-widest uppercase">
                NEXA INDUSTRIES
              </div>
              <div className="text-xs font-mono text-slate-500 mt-1">
                GLOBAL PRECISION ENGINEERING &amp; MANUFACTURING INFRASTRUCTURE
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Stuttgart Plant 1 // Industriestraße 42, 70565 Stuttgart, Germany
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-bold text-[#E11D48] uppercase">COMMERCIAL QUOTATION</div>
              <div className="text-lg font-mono font-black text-[#0F172A]">QT-{lead.rfqNumber.replace('RFQ-', '')}</div>
              <div className="text-xs font-mono text-slate-500 mt-1">Date: {new Date().toLocaleDateString()}</div>
              <div className="text-xs font-mono text-slate-500">Valid Until: 60 Days from Issue</div>
            </div>
          </div>

          {/* Client & Vendor Information */}
          <div className="grid grid-cols-2 gap-6 text-xs font-mono border-b border-slate-300 pb-6">
            <div>
              <div className="text-slate-400 font-bold uppercase mb-1">PREPARED FOR CLIENT:</div>
              <div className="font-bold text-sm text-[#0F172A]">{lead.companyName}</div>
              <div className="text-slate-600">Attn: {lead.contactName} ({lead.email})</div>
              <div className="text-slate-600">Destination: {lead.country}</div>
            </div>

            <div className="text-right">
              <div className="text-slate-400 font-bold uppercase mb-1">ASSIGNED NEXA ENGINEERING LEAD:</div>
              <div className="font-bold text-sm text-[#0F172A]">{lead.assignedSalesperson}</div>
              <div className="text-slate-600">Division: Senior Aerospace &amp; Energy Procurement</div>
              <div className="text-slate-600">VAT/Tax ID: DE811492019</div>
            </div>
          </div>

          {/* Line Item Table */}
          <div>
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-slate-800 text-slate-700">
                  <th className="py-2">ITEM &amp; SPECIFICATION</th>
                  <th className="py-2">PART NO</th>
                  <th className="py-2 text-center">QTY</th>
                  <th className="py-2 text-right">UNIT PRICE</th>
                  <th className="py-2 text-right">TOTAL (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4">
                    <div className="font-bold text-[#0F172A]">{lead.productName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{lead.specifications}</div>
                  </td>
                  <td className="py-4 text-slate-600">{lead.partNumber}</td>
                  <td className="py-4 text-center font-bold">{lead.quantity}</td>
                  <td className="py-4 text-right">${Math.round(lead.estimatedValue / lead.quantity).toLocaleString()}</td>
                  <td className="py-4 text-right font-bold text-[#0F172A]">${lead.estimatedValue.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total & Terms */}
          <div className="flex justify-between items-end border-t-2 border-slate-800 pt-6">
            <div className="text-[11px] font-mono text-slate-500 max-w-sm space-y-1">
              <div>* Includes EN 10204 3.1 Mill Test certificates and X-ray inspection.</div>
              <div>* Terms: Irrevocable Letter of Credit or SWIFT wire transfer.</div>
              <div>* Incoterms: CIF Destination Port ({lead.country}).</div>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs text-slate-500">TOTAL CONTRACT VALUE:</div>
              <div className="text-3xl font-black text-[#E11D48]">${lead.estimatedValue.toLocaleString()} USD</div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-300 flex justify-between items-center text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E11D48]" />
              <span>OFFICIAL SEAL // AS9100D CERTIFIED MANUFACTURER</span>
            </div>
            <div>Authorized Signature: _______________________</div>
          </div>
        </div>
      </div>
    </div>
  );
}
