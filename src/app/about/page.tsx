import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Building2, 
  FileText,
  UserCheck
} from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";

export const metadata = {
  title: "About Us | Advika Valves",
  description: "Learn about Advika Valves, Authorised Dealer of Flowsid Valves located in Chawri Bazar, Delhi. Supplying comprehensive industrial valve solutions.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-navy-900 font-semibold">About Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorised Dealer of Flowsid Valves</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            About Advika Valves
          </h1>

          <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 max-w-none">
            <p>
              <strong>Advika Valves</strong> is an authorised dealer of Flowsid Valves, operating from the established engineering and metal market of Chawri Bazar, Delhi. The business provides procurement teams, plant engineers, contractors, and industrial buyers with access to the comprehensive Flowsid catalog of industrial valves.
            </p>
            <p>
              As an authorized distributor, Advika Valves supplies industrial flow control products across diverse metallurgical categories, including Stainless Steel (SS 304, SS 316, SS 304L), Cast Iron, Cast Steel (WCB), Forged Carbon Steel (A105), Polypropylene (PP), and Forged Brass. The catalog represents products engineered to rigorous British Standards (BS), American Petroleum Institute (API), and ASME requirements.
            </p>
            <p>
              Our objective is to facilitate convenient technical product discovery and direct communication for product enquiries, availability, and official technical quotations.
            </p>
          </div>
        </div>

        {/* Key Leadership & Management */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-navy-900">
              Business Leadership &amp; Management
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Contact our designated legal owner and commercial managers directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Alka Jain */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Alka Jain</h3>
                <span className="text-xs font-semibold text-blue-600 block">Legal Owner</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Legal owner and proprietary authority of Advika Valves.
              </p>
            </div>

            {/* Dinesh Jain */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Dinesh Jain</h3>
                <span className="text-xs font-semibold text-green-700 block">Manager</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={BUSINESS_INFO.contacts[0].telUrl} className="hover:text-blue-600">
                    {BUSINESS_INFO.contacts[0].phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.contacts[0].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Dinesh</span>
                </a>
              </div>
            </div>

            {/* Sidharth Jain */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Sidharth Jain</h3>
                <span className="text-xs font-semibold text-green-700 block">Manager</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={BUSINESS_INFO.contacts[1].telUrl} className="hover:text-blue-600">
                    {BUSINESS_INFO.contacts[1].phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.contacts[1].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Sidharth</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Business Office & Operating Location */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-navy-900">
              Registered Office &amp; Contact Information
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Visit our business location in Central Delhi or connect through electronic channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 block mb-0.5">Physical Address:</strong>
                  <p className="leading-relaxed text-slate-600">{BUSINESS_INFO.address}</p>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline mt-2"
                  >
                    <span>Open in Google Maps Search</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="text-navy-900 block mb-0.5">Email Communications:</strong>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-blue-600 hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-3">
              <h4 className="font-bold text-navy-900 text-sm">Authorised Dealer Representation</h4>
              <p className="leading-relaxed">
                Advika Valves distributes industrial valves directly matching the documented items of Flowsid Valves, Connect (CE), and CPI manufacturers. All product enquiries are addressed directly by our team.
              </p>
              <div className="pt-2 flex items-center gap-2 text-navy-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Price-Free Industrial Catalog Specification Service</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
