import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Download, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Gauge, 
  Settings2,
  FileText,
  PhoneCall,
  Search
} from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { BUSINESS_INFO } from "@/types/product";
import { Product } from "@/types/product";

export default function HomePage() {
  const products: Product[] = (productsData as unknown) as Product[];

  // Calculate dynamic category counts & representative image
  const categoryMap: Record<string, { count: number; image: string; description: string; slug: string }> = {};

  products.forEach((p) => {
    const catSlug = p.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!categoryMap[p.category]) {
      let desc = "Engineered industrial valves adhering to strict national and international standards.";
      if (p.category.includes("Ball")) desc = "Screwed, flanged, 2-piece, 3-piece, and multi-port ball valves in SS 304, SS 316, and Cast Iron.";
      else if (p.category.includes("Butterfly")) desc = "Wafer, double flanged, and damper butterfly valves for water, steam, and HVAC distribution.";
      else if (p.category.includes("Check")) desc = "Wafer check, lift check, dual-plate, and swing non-return valves preventing reverse pipeline flow.";
      else if (p.category.includes("Dairy")) desc = "Sanitary Tri-Clamp, union-type, and weldable butterfly valves in SS 304 and SS 304L for food & dairy.";
      else if (p.category.includes("Gate & Globe")) desc = "Heavy-duty API 600 gate and globe valves for isolation and flow regulation under severe conditions.";
      else if (p.category.includes("Sight Glasses")) desc = "Toughened glass sight flow indicators and fine Y-strainers for inline visual inspection and filtration.";
      else if (p.category.includes("Steam Traps")) desc = "Thermodynamic Td3, inverted bucket, and ball float steam traps for condensate discharge up to 425°C.";
      else if (p.category.includes("Polypropylene")) desc = "Chemically inert polypropylene ball, foot, check, diaphragm, and butterfly valves for acid/alkali duties.";
      else if (p.category.includes("Brass")) desc = "High-density forged brass ball valves and calibrated hydronic balancing valves for HVAC installations.";

      categoryMap[p.category] = {
        count: 0,
        image: p.image,
        description: desc,
        slug: catSlug,
      };
    }
    categoryMap[p.category].count += 1;
  });

  const categories = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    ...data,
  }));

  // Curate 6 prominent featured products across different families
  const featuredIds = [1, 4, 10, 22, 60, 66];
  const featuredProducts = products.filter((p) => featuredIds.includes(p.catalogItemNumber));

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden py-20 lg:py-28 border-b border-navy-800">
        {/* Engineering Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Authorised Dealer of Flowsid Valves</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Precision Flow Control. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-slate-200">
                  Trusted Valve Solutions.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Explore a comprehensive range of industrial valve products through Advika Valves, your authorised dealer of Flowsid Valves. Supplying authentic stainless steel, cast iron, cast steel, forged steel, and polypropylene valves.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-blue-600/30 transition-all"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/download-catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-200 bg-navy-800/80 hover:bg-navy-800 border border-navy-700 hover:text-white transition-all"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download Catalog</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-slate-400" />
                  <span>Talk to Our Team</span>
                </Link>
              </div>

              {/* Technical Trust Strip */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-extrabold text-white">78</div>
                  <div className="text-xs text-slate-400">Catalog Items</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">100%</div>
                  <div className="text-xs text-slate-400">Price-Free Discovery</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">Direct</div>
                  <div className="text-xs text-slate-400">WhatsApp Enquiries</div>
                </div>
              </div>
            </div>

            {/* Right Visual Layout: Real Catalog Products Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="relative bg-navy-900/90 rounded-2xl p-6 border border-navy-700/80 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-navy-800 text-xs font-mono text-slate-400">
                    <span>FLOWSID INDUSTRIAL CATALOG</span>
                    <span className="text-green-400 flex items-center gap-1 font-sans">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Verified Stock Data
                    </span>
                  </div>

                  {/* Curated 4-valve visual grid using real extracted images */}
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="bg-white/95 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                      <div className="relative w-28 h-28">
                        <Image
                          src="/images/products/flowsid-004.png"
                          alt="Flanged Ball Valve"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-navy-900 mt-2 truncate w-full">
                        3-Pc Flanged Ball Valve
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">SS 304 / 316 (150#)</span>
                    </div>

                    <div className="bg-white/95 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                      <div className="relative w-28 h-28">
                        <Image
                          src="/images/products/flowsid-010.png"
                          alt="Butterfly Valve"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-navy-900 mt-2 truncate w-full">
                        Silicon Kit Butterfly
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">PN-16 (-23°C to 200°C)</span>
                    </div>

                    <div className="bg-white/95 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                      <div className="relative w-28 h-28">
                        <Image
                          src="/images/products/flowsid-022.png"
                          alt="Gate Valve API 600"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-navy-900 mt-2 truncate w-full">
                        Flanged Gate Valve
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">API 600 (Class 150#)</span>
                    </div>

                    <div className="bg-white/95 rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                      <div className="relative w-28 h-28">
                        <Image
                          src="/images/products/flowsid-066.png"
                          alt="Thermodynamic Steam Trap"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-navy-900 mt-2 truncate w-full">
                        Steam Trap Td3
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">Investment 410 (425°C)</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium">Chawri Bazar, Delhi – 110006</span>
                    <Link href="/products" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                      Browse Full Range &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Catalog Taxonomy
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Browse Industrial Valves by Category
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every category reflects the authenticated catalog indexing from page 2 through page 27 of the Flowsid publication. Product counts are dynamically computed from our verified 78 catalog items.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                      {cat.count} Distinct Products
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Category
                    </span>
                  </div>

                  <div className="my-5 flex items-center justify-center h-36 bg-slate-50 rounded-lg p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors mb-2">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-navy-900 bg-slate-100 group-hover:bg-navy-900 group-hover:text-white transition-colors"
                  >
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Curated Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Featured Catalog Entries
              </h2>
              <p className="text-sm text-slate-600">
                Accurate technical specifications and authentic product images directly from the Flowsid catalog.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>View All 78 Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY ADVIKA VALVES SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Dealer Advantages
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Why Partner with Advika Valves
            </h3>
            <p className="text-sm text-slate-600">
              Clear, factual business advantages grounded directly in authorized representation and transparent engineering specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-900">Comprehensive Industrial Catalog</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct access to all 78 documented items from the Flowsid catalog, covering Stainless Steel, Cast Iron, Cast Steel, Forged Steel, Polypropylene, and Brass.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-900">Documented Material & Design Options</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear distinction of material grades (SS 202, 304, 316, 304L, WCB, A105) and documented constructions including screwed, flanged, wafer, and dairy tri-clamp ends.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-navy-900">Direct Product-Specific Enquiries</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every product generates a dedicated WhatsApp message pre-populated with exact item numbers and selected sizes, connecting you immediately with managers Dinesh Jain and Sidharth Jain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT ENQUIRY CTA SECTION */}
      <section className="py-16 bg-navy-950 text-white relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Looking for the Right Valve for Your Application?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our complete technical specifications or send your requirements directly to the Advika Valves management team in Chawri Bazar, Delhi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-navy-950 bg-white hover:bg-slate-100 shadow transition-all"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Browse Products</span>
            </Link>

            <a
              href={BUSINESS_INFO.contacts[0].whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
