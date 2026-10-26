import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Download, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Layers, 
  FileCheck2,
  Lock
} from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";

export const metadata = {
  title: "Download Technical Product Catalog | Advika Valves",
  description: "Download the complete price-free technical catalog for Advika Valves, Authorised Dealer of Flowsid Valves. Comprehensive 78-product specifications.",
};

export default function DownloadCatalogPage() {
  const catalogPdfUrl = "/catalogs/Advika-Valves-Product-Catalog.pdf";

  const features = [
    "Full range of 78 authenticated industrial valve products",
    "High-resolution authentic product photographs and diagrams",
    "Complete technical specifications: body, disc, ball, stem, seat, and liner materials",
    "Comprehensive size tables with Inch and MM metric sizing",
    "Documented fluid suitability: Water, Steam, Gas, Oil, Air",
    "Manufacturing and inspection standards: API 600, API 602, API 609, API 598, BS 5351, BS 5159, BS 1868",
    "Zero prices: 100% price-free edition designed strictly for engineering reviews",
    "Direct contact credentials for Dinesh Jain and Sidharth Jain"
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-navy-900 font-semibold">Download Catalog</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Price-Free Technical Catalog</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Advika Valves Product Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Authorised Dealer of Flowsid Valves — 2026 Engineering Technical Specification Edition
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={catalogPdfUrl}
                download="Advika-Valves-Product-Catalog.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (Direct)</span>
              </a>
            </div>
          </div>

          {/* Catalog File Details Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div>
              <div className="text-xl font-extrabold text-navy-900">78</div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Catalog Items</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-navy-900">21</div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Pages</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-green-700">100%</div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Price-Free</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-navy-900">PDF</div>
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Format</div>
            </div>
          </div>

          {/* Description & Transparency Note */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base font-bold text-navy-900">
              About This Downloadable Document
            </h2>
            <p>
              In accordance with commercial distributor guidelines, this customer-facing catalog has been specially compiled from the original Flowsid technical data to remove all internal price lists, distributor margin tables, and pricing columns, while preserving every single product item, image, dimensional table, and engineering specification.
            </p>
            <p>
              Engineers and procurement managers can freely share and archive this file for project planning, piping drafting, and tender preparation.
            </p>
          </div>

          {/* Key Features Included */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900">
              What Is Included in This Document:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Action */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <a
              href={catalogPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              <Eye className="w-4 h-4" />
              <span>Preview in Browser Tab</span>
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-navy-900"
            >
              <span>Explore Interactive Online Catalog</span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
