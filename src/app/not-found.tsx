import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-navy-900">
          Product or Page Not Found
        </h1>

        <p className="text-xs text-slate-600 leading-relaxed">
          The requested valve item or page does not exist in our catalog. You can search our complete 78-product catalog or return to the homepage.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Products</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
