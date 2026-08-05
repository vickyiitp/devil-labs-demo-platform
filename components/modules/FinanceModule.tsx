'use client';

import React from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, PieChart } from 'lucide-react';

export default function FinanceModule() {
  return (
    <div className="space-y-6">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">YTD NET REVENUE</div>
          <div className="text-2xl font-black font-tech text-white mt-1">$42,850,000 USD</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs Previous Fiscal Year</span>
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">OUTSTANDING RECEIVABLES</div>
          <div className="text-2xl font-black font-tech text-[#E11D48] mt-1">$6,420,000 USD</div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">Avg Collection Term: 34 Days</div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">GROSS OPERATING MARGIN</div>
          <div className="text-2xl font-black font-tech text-white mt-1">34.2%</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">High Value Superalloy Mix</div>
        </div>

        <div className="bg-[#121418] border border-white/10 rounded-xl p-5">
          <div className="text-xs font-mono text-gray-400">CASH FLOW VELOCITY</div>
          <div className="text-2xl font-black font-tech text-white mt-1">$3.8M / MONTH</div>
          <div className="text-[11px] font-mono text-gray-400 mt-2">Working Capital Surplus</div>
        </div>
      </div>

      {/* Revenue & Expenses Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white font-tech">QUARTERLY REVENUE &amp; CONTRACT CASH FLOW</h3>
            <span className="text-xs font-mono text-[#E11D48]">AUDITED CONSOLIDATED METRICS</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { quarter: 'Q1 2026', revenue: '$10,200,000', margin: '33.8%', status: 'Audited' },
              { quarter: 'Q2 2026', revenue: '$11,850,000', margin: '34.5%', status: 'Audited' },
              { quarter: 'Q3 2026 (PROJECTED)', revenue: '$12,400,000', margin: '35.1%', status: 'Active' },
              { quarter: 'Q4 2026 (CONTRACTED)', revenue: '$8,400,000', margin: '33.5%', status: 'Booked' },
            ].map((row, i) => (
              <div key={i} className="p-4 bg-[#0B0C0E] border border-white/10 rounded-lg flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white font-tech text-sm">{row.quarter}</span>
                <span className="text-gray-300">Revenue: <strong className="text-white">{row.revenue}</strong></span>
                <span className="text-gray-300">Margin: <strong className="text-emerald-400">{row.margin}</strong></span>
                <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded text-[10px]">{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods & Escrow */}
        <div className="lg:col-span-4 bg-[#121418] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white font-tech border-b border-white/10 pb-4">
            B2B PAYMENT CHANNELS
          </h3>

          <div className="space-y-3 font-mono text-xs text-gray-300">
            <div className="p-3 bg-[#0B0C0E] border border-white/10 rounded-lg">
              <div className="text-white font-bold">Irrevocable Letter of Credit (LC)</div>
              <div className="text-gray-400 text-[11px] mt-1">Deutsche Bank / HSBC Global Escrow</div>
            </div>

            <div className="p-3 bg-[#0B0C0E] border border-white/10 rounded-lg">
              <div className="text-white font-bold">SWIFT / Fedwire Direct Transfer</div>
              <div className="text-gray-400 text-[11px] mt-1">Same-Day Settlement for OEM Orders</div>
            </div>

            <div className="p-3 bg-[#0B0C0E] border border-white/10 rounded-lg">
              <div className="text-white font-bold">Milestone Payment Schedules</div>
              <div className="text-[#E11D48] text-[11px] mt-1">30% Deposit | 50% Testing | 20% Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
