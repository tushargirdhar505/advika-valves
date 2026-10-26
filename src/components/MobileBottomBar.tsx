"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Phone, Download, X } from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";

export default function MobileBottomBar() {
  const [callModalOpen, setCallModalOpen] = useState(false);

  return (
    <>
      {/* Floating Bottom Quick Action Bar for Smartphones */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-around gap-2">
        {/* Quick Call Trigger */}
        <button
          type="button"
          onClick={() => setCallModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-blue-600" />
          <span>Call Team</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={BUSINESS_INFO.contacts[0].whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 active:scale-95 shadow-sm transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Enquiry</span>
        </a>

        {/* Catalog PDF */}
        <Link
          href="/download-catalog"
          className="flex items-center justify-center p-2.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
          title="Download PDF"
        >
          <Download className="w-4 h-4 text-blue-600" />
        </Link>
      </div>

      {/* Call Selector Modal on Mobile */}
      {callModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
          onClick={() => setCallModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-navy-900">Direct Telephone Call</h3>
              <button 
                type="button" 
                onClick={() => setCallModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select an Advika Valves manager to connect directly:
            </p>

            <div className="space-y-2.5">
              <a
                href={BUSINESS_INFO.contacts[0].telUrl}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <div>Dinesh Jain (Manager)</div>
                    <div className="font-mono text-[11px] text-slate-500">{BUSINESS_INFO.contacts[0].phoneDisplay}</div>
                  </div>
                </div>
                <span className="text-[11px] text-blue-600 font-bold">Call &rarr;</span>
              </a>

              <a
                href={BUSINESS_INFO.contacts[1].telUrl}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <div>Sidharth Jain (Manager)</div>
                    <div className="font-mono text-[11px] text-slate-500">{BUSINESS_INFO.contacts[1].phoneDisplay}</div>
                  </div>
                </div>
                <span className="text-[11px] text-blue-600 font-bold">Call &rarr;</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
