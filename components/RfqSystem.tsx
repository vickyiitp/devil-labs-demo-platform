'use client';

import React, { useState } from 'react';
import { NexaProduct, CrmLead } from '@/lib/nexaData';
import { Send, UploadCloud, CheckCircle2, FileText, Globe2, ShieldCheck, Calendar, DollarSign, Building, User, Mail, ArrowRight } from 'lucide-react';

interface RfqSystemProps {
  initialProduct?: NexaProduct;
  initialConfig?: Record<string, string>;
  onSubmitRfq: (newLead: CrmLead) => void;
}

export default function RfqSystem({ initialProduct, initialConfig, onSubmitRfq }: RfqSystemProps) {
  const [quantity, setQuantity] = useState<number>(250);
  const [companyName, setCompanyName] = useState<string>('Lockheed Martin Defense Systems');
  const [contactName, setContactName] = useState<string>('Dr. Sarah Jenkins');
  const [email, setEmail] = useState<string>('s.jenkins@lmco.com');
  const [country, setCountry] = useState<string>('United States');
  const [requiredDate, setRequiredDate] = useState<string>('2026-10-30');
  const [cadFileUploaded, setCadFileUploaded] = useState<boolean>(true);
  const [cadFileName, setCadFileName] = useState<string>('NX_TURBO_ASSEMBLY_REV4.STEP');
  const [additionalNotes, setAdditionalNotes] = useState<string>(
    'Requires EN 10204 3.1 Mill Test certificates and 100% dye penetrant non-destructive testing prior to air shipment.'
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const unitPrice = initialProduct?.basePrice || 12500;
  // Volume discount curve
  const discountFactor = quantity >= 500 ? 0.82 : quantity >= 200 ? 0.88 : quantity >= 50 ? 0.92 : 1.0;
  const calculatedUnitPrice = Math.round(unitPrice * discountFactor);
  const totalValue = calculatedUnitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRfqNum = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newLead: CrmLead = {
        id: `lead-${Date.now()}`,
        rfqNumber: generatedRfqNum,
        companyName: companyName || 'Global Enterprise OEM',
        contactName: contactName || 'Senior Procurement Director',
        email: email || 'procurement@enterprise.com',
        country: country || 'United States',
        productName: initialProduct?.name || 'NEXA Precision Component',
        partNumber: initialProduct?.partNumber || 'NX-X1-TURBO',
        quantity,
        estimatedValue: totalValue,
        stage: 'New Lead',
        leadScore: 96,
        assignedSalesperson: 'Marcus Vance (Sr. Aerospace)',
        requiredDate: requiredDate || '2026-10-30',
        specifications: `${initialConfig?.alloyGrade || 'Inconel 718'} | ${initialConfig?.surfaceFinish || 'Ra 0.2µm'} | ${additionalNotes}`,
        createdTime: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        activityLog: [
          {
            time: new Date().toISOString().replace('T', ' ').substring(0, 16),
            note: 'RFQ submitted online by buyer with CAD assembly attachment.',
          },
          {
            time: new Date().toISOString().replace('T', ' ').substring(0, 16),
            note: 'AI Lead Scoring Engine calculated 96/100 (Tier A Account).',
          },
        ],
      };

      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        onSubmitRfq(newLead);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#101216] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E11D48]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-mono text-[#E11D48] tracking-widest uppercase font-semibold">
            ENTERPRISE QUOTATION BUILDER
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-tech tracking-tight">
            REQUEST FOR QUOTATION (RFQ)
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
          <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
          <span>ISO 9001:2015 &amp; AS9100D COMPLIANT RFQ ENGINE</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Buyer & Technical Specifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#15181F] border border-white/10 rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-mono text-white font-bold uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#E11D48]" />
              <span>1. BUYER &amp; ORGANIZATION IDENTIFICATION</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">COMPANY / ENTERPRISE NAME *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
                  placeholder="e.g. Siemens Energy AG"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">CONTACT LEAD NAME *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
                  placeholder="e.g. Dr. Marcus Vance"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">CORPORATE EMAIL *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
                  placeholder="m.vance@siemens.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">DESTINATION COUNTRY / PORT *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
                  placeholder="e.g. Germany / Hamburg Europort"
                />
              </div>
            </div>
          </div>

          {/* Technical Requirements & CAD File */}
          <div className="bg-[#15181F] border border-white/10 rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-mono text-white font-bold uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E11D48]" />
              <span>2. CAD DRAWING &amp; QUALITY CERTIFICATION SPECS</span>
            </h3>

            {/* Simulated CAD Drag & Drop File Upload */}
            <div className="border-2 border-dashed border-white/20 hover:border-[#E11D48] rounded-xl p-5 text-center transition-all bg-[#0B0C0E]/50">
              <UploadCloud className="w-8 h-8 text-[#E11D48] mx-auto mb-2 animate-bounce" />
              <div className="text-xs font-mono text-white font-semibold">
                DRAG &amp; DROP 3D STEP / IGES / DWG CAD FILE HERE
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Automated geometry analysis &amp; tolerance collision detection engine.
              </p>

              {cadFileUploaded ? (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[#E11D48]/20 border border-[#E11D48] rounded-lg text-xs font-mono text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>FILE ATTACHED: {cadFileName}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCadFileUploaded(true);
                    setCadFileName('ATTACHED_MODEL_REV1.STEP');
                  }}
                  className="mt-3 px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded"
                >
                  SIMULATE CAD UPLOAD
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">ADDITIONAL TECHNICAL SPECIFICATIONS / INSPECTIONS</label>
              <textarea
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
                placeholder="Specify surface roughness, non-destructive testing (NDT), heat treatment codes..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Volume & Live Cost Estimate */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#15181F] border border-white/10 rounded-xl p-6 space-y-6">
            <h3 className="text-sm font-mono text-white font-bold uppercase tracking-wider border-b border-white/10 pb-3 flex items-center justify-between">
              <span>3. VOLUME &amp; TARGET DELIVERY</span>
              <span className="text-[#E11D48] font-mono text-xs">DYNAMIC VOLUME PRICING</span>
            </h3>

            {/* Quantity Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300">ORDER QUANTITY:</span>
                <span className="text-white font-bold font-mono text-base">{quantity} UNITS</span>
              </div>
              <input
                type="range"
                min={10}
                max={2000}
                step={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-[#E11D48] bg-white/20 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>10 Units (Standard)</span>
                <span>500 Units (OEM Tier -12%)</span>
                <span>2,000 Units (Bulk -18%)</span>
              </div>
            </div>

            {/* Target Delivery Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>REQUIRED ON-SITE DELIVERY DATE *</span>
              </label>
              <input
                type="date"
                required
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full bg-[#0B0C0E] border border-white/20 rounded-lg p-3 text-xs font-mono text-white focus:border-[#E11D48] outline-none"
              />
            </div>

            {/* Quotation Estimate Box */}
            <div className="bg-[#0B0C0E] border border-white/15 rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono text-gray-400">ESTIMATED COMMERCIAL SUMMARY</div>

              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">Unit Price ({quantity} qty tier):</span>
                <span className="text-white font-semibold">${calculatedUnitPrice.toLocaleString()} USD</span>
              </div>

              {discountFactor < 1.0 && (
                <div className="flex justify-between text-xs font-mono text-[#E11D48]">
                  <span>Applied OEM Volume Discount:</span>
                  <span>-{Math.round((1 - discountFactor) * 100)}%</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs font-mono text-white font-bold">ESTIMATED CONTRACT VALUE:</span>
                <span className="text-2xl font-black font-tech text-[#E11D48]">
                  ${totalValue.toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Submit RFQ CTA */}
            <button
              type="submit"
              disabled={isSubmitting || submittedSuccess}
              className="w-full py-4 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-tech text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(225,29,72,0.5)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>ROUTING RFQ TO ENTERPRISE CRM...</span>
              ) : submittedSuccess ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>RFQ SUBMITTED // TRANSITIONING TO CRM OS...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>SUBMIT RFQ &amp; ENTER NEXA OPERATING SYSTEM</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
