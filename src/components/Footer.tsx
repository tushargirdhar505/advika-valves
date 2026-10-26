import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";

export default function Footer() {
  const categories = [
    { name: "Stainless Steel Ball Valves", href: "/categories/stainless-steel-ball-valves" },
    { name: "Cast Iron Butterfly Valves", href: "/categories/cast-iron-butterfly-valves" },
    { name: "Cast Steel & Forged Valves", href: "/categories/cast-steel-valves" },
    { name: "Stainless Steel Check Valves", href: "/categories/stainless-steel-check-valves" },
    { name: "Dairy & Sanitary Valves", href: "/categories/stainless-steel-dairy-and-sanitary-valves" },
    { name: "Steam Traps & Accessories", href: "/categories/steam-traps" },
    { name: "Polypropylene (PP) Valves", href: "/categories/polypropylene-pp-valves" },
    { name: "Brass & Balancing Valves", href: "/categories/brass-and-balancing-valves" },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-navy-800">
          
          {/* Col 1: Brand & Designation */}
          <div className="space-y-4">
            <div className="relative h-14 w-52 flex items-center bg-navy-900/60 p-2 rounded-lg border border-navy-800">
              <Image
                src="/images/logo-light.png"
                alt="Advika Valves"
                fill
                className="object-contain object-left p-1"
              />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Authorised Dealer of Flowsid Valves</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Advika Valves is an authorized distributor of industrial valve products representing Flowsid Valves, Connect (CE), CPI, and allied engineering manufacturers. Supplying high-integrity industrial valves across India.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Legal Owner:</strong> {BUSINESS_INFO.legalOwner}</div>
              <div><strong className="text-slate-200">Business Hub:</strong> Chawri Bazar, Delhi</div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-500 rounded-sm"></span>
              Product Range
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link 
                    href={cat.href}
                    className="text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link 
                  href="/products" 
                  className="text-blue-400 font-semibold hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>View All 78 Products</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Management Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-500 rounded-sm"></span>
              Direct Management
            </h3>
            <div className="space-y-4 text-xs">
              {/* Dinesh Jain */}
              <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 space-y-1.5">
                <div className="font-semibold text-white">Dinesh Jain — Manager</div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href={BUSINESS_INFO.contacts[0].telUrl} className="hover:text-white font-mono">
                    {BUSINESS_INFO.contacts[0].phoneDisplay}
                  </a>
                </div>
                <div>
                  <a 
                    href={BUSINESS_INFO.contacts[0].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-green-400 hover:text-green-300 font-medium"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Dinesh Jain</span>
                  </a>
                </div>
              </div>

              {/* Sidharth Jain */}
              <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 space-y-1.5">
                <div className="font-semibold text-white">Sidharth Jain — Manager</div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href={BUSINESS_INFO.contacts[1].telUrl} className="hover:text-white font-mono">
                    {BUSINESS_INFO.contacts[1].phoneDisplay}
                  </a>
                </div>
                <div>
                  <a 
                    href={BUSINESS_INFO.contacts[1].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-green-400 hover:text-green-300 font-medium"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Sidharth Jain</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Download */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-500 rounded-sm"></span>
              Office & Catalog
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="leading-relaxed">{BUSINESS_INFO.address}</p>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold mt-1"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 pt-1">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="pt-3">
                <Link
                  href="/download-catalog"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Price-Free Catalog PDF</span>
                </Link>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>Verified 78 Catalog Products | Price-Free</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Advika Valves. All rights reserved. Authorised Dealer of Flowsid Valves.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400">About Business</Link>
            <Link href="/products" className="hover:text-slate-400">Product Index</Link>
            <Link href="/contact" className="hover:text-slate-400">Contact</Link>
            <Link href="/audit" className="hover:text-slate-400 text-blue-400">Catalog Extraction Audit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
