# Advika Valves — Official Website & Industrial Catalog

> **Authorised Dealer of Flowsid Valves**  
> Complete, production-ready website and digitized product catalog engineered from the 27-page *Flowsid Price LIST 2026.pdf* publication.

---

## 🏢 Business Identity & Commercial Details

- **Business Name:** Advika Valves
- **Business Designation:** Authorised Dealer of Flowsid Valves
- **Legal Owner:** Alka Jain
- **Managers:**
  - **Dinesh Jain:** [+91 9811049614](tel:+919811049614) | [WhatsApp](https://wa.me/919811049614)
  - **Sidharth Jain:** [+91 8447952332](tel:+918447952332) | [WhatsApp](https://wa.me/918447952332)
- **Business Email:** [advikavalves@gmail.com](mailto:advikavalves@gmail.com)
- **Registered Address:** 831, Kucha Pati Ram, Sita Ram Bazaar, Chawri Bazar, Delhi – 110006, India.
- **Location on Google Maps:** [View on Google Maps](https://www.google.com/maps/search/?api=1&query=831,+Kucha+Pati+Ram,+Sita+Ram+Bazaar,+Chawri+Bazar,+Delhi+–+110006,+India)

---

## 📊 Catalog Extraction & Data Audit Summary

| Metric | Verified Value | Notes |
| :--- | :--- | :--- |
| **Source Document** | *Flowsid Price LIST 2026.pdf* | 27 Pages comprehensively inspected |
| **Total Numbered Items** | **78 Products** | Item 1 through Item 78 |
| **Catalog Records Created** | **78 Unique Records** | 1 catalog item = 1 unique identity |
| **Verified Image Crops** | **78 / 78 (100%)** | Extracted at 216 DPI from source pages |
| **Price Exclusion Audit** | **100% Verified** | Zero prices in frontend, DB, search, or metadata |
| **Sanitized Customer PDF** | **Verified & Operational** | `Advika-Valves-Product-Catalog.pdf` (21 Pages) |
| **Automated QA Tests** | **18 / 18 Passed (0 Failed)** | Zero price leaks, valid 200 & 404 responses |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router, Server-Side Rendering & Static Site Generation)
- **UI Library:** React 19, TypeScript, Tailwind CSS
- **Icons:** Lucide React
- **Data Architecture:** Fully typed static JSON product database (`src/data/products.json`)
- **PDF Generation & Extraction:** Python 3, PyMuPDF (`fitz`), Pillow (`PIL`), ReportLab

---

## 🌐 Key Pages & Features

1. **Homepage (`/`)**
   - Official announcement strip: *"Authorised Dealer of Flowsid Valves"*
   - Sticky navigation with authentic Advika Valves branding and mobile drawer
   - Hero section with genuine catalog products presentation
   - *Browse by Category* with dynamically calculated product counts
   - *Featured Products* highlighting 6 distinct valve categories
   - *Why Advika Valves* engineering advantages
   - *Direct Product Enquiry CTA* connecting to WhatsApp

2. **Complete Catalog (`/products`)**
   - Real-time client-side search across product name, item number, material, size, pressure class, and make
   - Multi-facet filters: Category, Material, Valve Design, Connection Type, Manufacturer
   - Sorting: Item # Asc/Desc, Name A–Z, Name Z–A, Category
   - Pagination (12 products/page) maintaining filter state
   - Product cards with authentic image, item number, material, rating, and WhatsApp button

3. **Individual Product Detail Pages (`/products/[slug]`)**
   - Dedicated shareable URL for every single product (78 static pages generated)
   - High-resolution product image with modal enlargement
   - Individually written engineering description
   - Structured technical specifications table (body, ball, stem, seat, test standards, pressure, temperature)
   - Available sizes table (Inch & MM) with interactive size selector
   - Documented applications badges (Water, Steam, Gas, Oil, Air)
   - Dynamic WhatsApp enquiry generator that pre-fills the exact product name, item number, selected size, and selected variant for either Dinesh Jain or Sidharth Jain
   - Direct Email enquiry with pre-filled subject and body
   - Related products from the same category

4. **Product Categories (`/categories` and `/categories/[categorySlug]`)**
   - Dedicated taxonomy overview and category-specific landing pages

5. **About Us (`/about`)**
   - Authorised dealer designation and business background
   - Authentic leadership credentials: Alka Jain (Legal Owner), Dinesh Jain (Manager), Sidharth Jain (Manager)

6. **Contact Us (`/contact`)**
   - Direct call and WhatsApp buttons for both managers
   - Responsive enquiry form with validation and honest WhatsApp/Email fallback
   - Clickable Google Maps search link

7. **Download Catalog (`/download-catalog`)**
   - Verified 21-page customer-facing PDF catalog (`Advika-Valves-Product-Catalog.pdf`) with 0 prices

8. **Extraction Audit (`/audit`)**
   - Complete technical traceability table listing all 78 items with source page, item number, original name, and verification status

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start -p 3005
```

### 4. Run Automated QA Tests
```bash
.venv/bin/python3 scripts/qa_audit_test.py
```

---

## 📋 PDF Extraction Scripts

- `scripts/extract_images.py`: Extracts and crops all 78 product photos from the PDF at 216 DPI.
- `scripts/assemble_catalog.py`: Merges and validates the 78 product records into `src/data/products.json` and audits for zero prices.
- `scripts/generate_pdf_catalog.py`: Generates the customer-facing 21-page price-free PDF catalog using ReportLab.
- `scripts/qa_audit_test.py`: Runs automated functional tests against the running application.

---

&copy; 2026 Advika Valves. All rights reserved. Authorised Dealer of Flowsid Valves.
