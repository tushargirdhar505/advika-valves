"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Send,
  AlertCircle
} from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

export default function ContactPage() {
  const products: Product[] = (productsData as unknown) as Product[];

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    productId: "",
    sizeOrVariant: "",
    quantity: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedManager, setSelectedManager] = useState<"dinesh" | "sidharth">("dinesh");

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!formData.message.trim()) errors.message = "Please enter a brief message or requirements.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Honest delivery workflow: construct a pre-filled WhatsApp & email dispatch
    const chosenContact = selectedManager === "dinesh" ? BUSINESS_INFO.contacts[0] : BUSINESS_INFO.contacts[1];

    let summary = `Hello Advika Valves (${chosenContact.name}),\n\nI am submitting an enquiry from your website:\n`;
    summary += `Name: ${formData.fullName}\n`;
    if (formData.companyName) summary += `Company: ${formData.companyName}\n`;
    summary += `Phone: ${formData.phone}\n`;
    if (formData.email) summary += `Email: ${formData.email}\n`;
    if (formData.productId) {
      const prod = products.find((p) => p.id === formData.productId);
      if (prod) {
        summary += `Product of Interest: ${prod.displayName} (Item #${prod.catalogItemNumber})\n`;
      }
    }
    if (formData.sizeOrVariant) summary += `Required Size / Variant: ${formData.sizeOrVariant}\n`;
    if (formData.quantity) summary += `Quantity: ${formData.quantity}\n`;
    summary += `Message: ${formData.message}\n`;

    const cleanPhone = chosenContact.phone.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(summary)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      // Open WhatsApp automatically
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Contact Us</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Contact Advika Valves
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Authorised Dealer of Flowsid Valves. Connect directly with our management team for technical clarifications, sizing assistance, and formal quotations.
          </p>
        </div>

        {/* Top 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dinesh Jain */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                Direct Line
              </span>
              <Phone className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-navy-900">Dinesh Jain</h2>
              <span className="text-xs text-slate-500 font-medium">Manager</span>
            </div>
            <div className="text-sm font-mono font-bold text-navy-900">
              <a href={BUSINESS_INFO.contacts[0].telUrl} className="hover:text-blue-600">
                {BUSINESS_INFO.contacts[0].phoneDisplay}
              </a>
            </div>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.contacts[0].whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Sidharth Jain */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                Direct Line
              </span>
              <Phone className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-navy-900">Sidharth Jain</h2>
              <span className="text-xs text-slate-500 font-medium">Manager</span>
            </div>
            <div className="text-sm font-mono font-bold text-navy-900">
              <a href={BUSINESS_INFO.contacts[1].telUrl} className="hover:text-blue-600">
                {BUSINESS_INFO.contacts[1].phoneDisplay}
              </a>
            </div>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.contacts[1].whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Email & Owner */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Email Dispatch
              </span>
              <Mail className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-navy-900">{BUSINESS_INFO.email}</h2>
              <span className="text-xs text-slate-500 font-medium">Proprietor: {BUSINESS_INFO.legalOwner}</span>
            </div>
            <p className="text-xs text-slate-600">
              Official email for RFQs, purchase orders, and technical tenders.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-navy-900 hover:text-white rounded-lg transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Compose Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Main Grid: Form + Office Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-lg font-bold text-navy-900">
                Submit a Product Enquiry
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in your application details for immediate routing to our WhatsApp and email desk.
              </p>
            </div>

            {submissionSuccess ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-xl space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h3 className="text-base font-bold text-green-900">Enquiry Prepared Successfully!</h3>
                <p className="text-xs text-green-800 leading-relaxed max-w-md mx-auto">
                  Your enquiry has been formatted and opened in WhatsApp for instant dispatch. If WhatsApp did not launch automatically, click the button below:
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={selectedManager === "dinesh" ? BUSINESS_INFO.contacts[0].whatsappUrl : BUSINESS_INFO.contacts[1].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionSuccess(false);
                      setFormData({
                        fullName: "",
                        companyName: "",
                        phone: "",
                        email: "",
                        productId: "",
                        sizeOrVariant: "",
                        quantity: "",
                        message: "",
                      });
                    }}
                    className="py-2 px-4 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Manager Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Contact Manager:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                      selectedManager === "dinesh"
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <input
                        type="radio"
                        name="manager"
                        value="dinesh"
                        checked={selectedManager === "dinesh"}
                        onChange={() => setSelectedManager("dinesh")}
                        className="text-blue-600"
                      />
                      <span>Dinesh Jain (+91 9811049614)</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                      selectedManager === "sidharth"
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <input
                        type="radio"
                        name="manager"
                        value="sidharth"
                        checked={selectedManager === "sidharth"}
                        onChange={() => setSelectedManager("sidharth")}
                        className="text-blue-600"
                      />
                      <span>Sidharth Jain (+91 8447952332)</span>
                    </label>
                  </div>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-red-500">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Industrial Enterprises Ltd."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-500">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. engineer@company.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Product of Interest Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Product of Interest (Optional)
                  </label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">-- Select from 78 Catalog Products --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        Item #{p.catalogItemNumber}: {p.displayName} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size / Variant & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Required Size or Variant (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.sizeOrVariant}
                      onChange={(e) => setFormData({ ...formData, sizeOrVariant: e.target.value })}
                      placeholder={'e.g. 2" (50mm), SS 316, Flanged 150#'}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Estimated Quantity (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 10 Pcs / Project Lot"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Your Requirements / Technical Notes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe line pressure, fluid medium, delivery timeline, or technical requirements..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-red-500">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Routing Enquiry..." : "Submit Enquiry & Connect on WhatsApp"}</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Your information is processed strictly for quotation communications and never shared with third parties.
                </p>
              </form>
            )}
          </div>

          {/* Business Office Details & Clickable Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-navy-900 pb-3 border-b border-slate-200">
                Business Location
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-navy-900 block text-sm">Advika Valves</strong>
                    <p className="leading-relaxed text-slate-600">
                      {BUSINESS_INFO.address}
                    </p>
                    <a
                      href={BUSINESS_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-md bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Search on Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-semibold text-navy-900">Trading Hours:</div>
                  <p className="text-slate-600">
                    Monday to Saturday: 10:00 AM – 7:30 PM (IST)<br />
                    Sunday: Closed
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-semibold text-navy-900">Direct Inquiries:</div>
                  <div className="space-y-1 text-slate-600">
                    <div>Dinesh Jain: <span className="font-mono text-navy-900 font-bold">+91 9811049614</span></div>
                    <div>Sidharth Jain: <span className="font-mono text-navy-900 font-bold">+91 8447952332</span></div>
                    <div>Email: <span className="text-blue-600">{BUSINESS_INFO.email}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Catalog Download Card */}
            <div className="bg-navy-900 text-white rounded-2xl p-6 border border-navy-800 space-y-3">
              <h3 className="text-base font-bold">Download Price-Free Catalog</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the complete technical engineering catalog PDF covering all 78 Flowsid products for offline procurement reviews.
              </p>
              <Link
                href="/download-catalog"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <span>Download PDF (21 Pages)</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
