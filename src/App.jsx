
// ARCT.STUDIO — Pricing Calculator 2026
// Google Sheets Integration Edition
// Sheet data overrides hardcoded defaults — always falls back gracefully.

import { useState, useMemo, useEffect, useCallback, createContext, useContext } from "react";

const LOGO_BASE64 = "data:image/webp;base64,UklGRigGAABXRUJQVlA4WAoAAAAQAAAAlgAAGAAAQUxQSNIEAAABoEVr27E3uv/8qW3bdlPbtm3btu0xands21acYe3G+a+D732/LxgdRsQEKH0fJaK8/o0ehcX/Vlb8PzBhn1/tLj3jdboluN2a488880x1x0/PPHO8ipui0x+7dHpTG5+k4IkL3Q5VhY7uupeWVHT6woULF84eXCvIVm1aDlvR8QfPX3hoenl3BWLprYfxfMEQPPM3jC0czmds/rXxGD8qLw3F9ePqyVg3s2gnFfoT69W9ZUzD2GUqdTQJY+CFmm4WwWtq6em73I7Sn2J18ZbtCDfmV85dblwUf5RQkWbOMMY2a9YsJLN68oybtxwTiencrFmz9mMO/k7sHMspQ4/b/Lq2TfmyzZf8QsJkmz8KAtX0JXw4zvwBxFaRpAq/A/dPLxg/blwRx8Vx48Z1tTTnRkU5C/zIcZm/pr6MPXnBzXuO2RyUOXjKXXa56pkU2JhFRv/cRKZb+gAc1Gi4lVPOXHdglSTl+BEC+/PLfBRWyO0B1sncMiU+W7o4YJHq3GSUizJ3mCSXPZOTGpled9zLk+UKTDOMgtu5HNsgebjsnl5gkEUVW2ZNZ+rNtZy20zwh1+v52FA9ALdgttbBTz7HOTgiSYViYblS7zzTbS7Tj95hiqVsSnwxd9mv0sJxCN5dAaG+4gnQ2fEX9HDMhLDgNFjG11kz0BhetsznnDzuYY+kPPdgUOF46Krj8KKk/EBhx0VYojQocp33amScCtywnGOal158ImkO/B6sp+EFhUBKFSlvPA/k/Amap4WaXiHw0aJavozhTyaX6Us6eqnGVSkoDFZIjSClkj6CA5I67N8/fXof6U+onCYqsCIUiNxcISPoDsVNYYR4KUGs1BXiC0v6GHZrKNzLI0kFIZBdYdAwbSTVXPBmEklrfenPF09B0/e09lKB29KL8LQkDYfbOTP9AXMd/kSopldgcppJKrw+ieXpLz8JQaaXGemlLT+oUgo0cmS+DFO1AiKCJOlHGK4V8G56kEbwIFcqvOjmfdp468RXMm3ikJdlHNUe+FjGtfCDr1Ac9HY8DkdVMQV6pguF09ZTKz5y8z31vD3EVktTLmdx5/uWwTlvw3BT8URor8fhDccAuJ9Xp+FatdQbP8Bne40+nopxJ9iWNT4lt6cysSlVLPqCOe4G8EeWqXA5s0kn4ZLqQqCWpGw3YI1K3YTrfVPtfabbQmnkST/S2zaYj+Ul2/s8LFubwP1abkpdZoy+hbWyNofkknoHHpGkjfCgojolAJ/O7xASEpLLVWfHXP4sZOpDtN/bNMILmQpHMdJL6ff4OqcLbeJyU1v1ME5Jv5NY3KYvoIb6QWwBSfmuwRc51Okm1hZuit0tLCnrN3zbSFKmcfcDA+Ut+C0i+2eRMveP5Hmf4dtcjrwdDsfybiG58e0h+eH6PknVdsRxPovUPeGkXI5lh+SPgiWSNBx4JbtKnkox1dPDtmUslqSi70P02x/eJn6qXNSzKNd5iPvllzg4mk0GYi9fvnIfiJnml3OISRr0O9z65qtrcHOmT5J6N3WTdbUktfgk9A2fJO2PiIg4nVeqsOS578LD9vpU/cPQaYbK71VwKKj/+Zi4e9/vrSj7U09nskntj4bHPgh9ooWMgz40vnlyZasgmfNdWGdS1hFnIx7Exjw3JbecVlA4IDABAAAwCACdASqXABkAPpFGnUolpCMkqBmZELASCUAaWa2JQMFys2sEFPc7S87HlF5Yx67O0KXO+rao8BQcHEqacAWMvuM9B2DNIhrEwAD++pjSrI2ab8E9QvfEX+HCyNcvx5ac53wVNMkTiXv6jWujQHbwpVTR5FWxDbvTfYGrsl2ZecqutQ2uUC868Jdqf9BBSTK7YH8Whf1LDX16HdfRfE80bAzdYoPbFm8WqUqqxpZkS9uqHnRfYIRr3mAq8wSmiTa3odbNRTIfNcnS4HISGD66oC9ScHV5tcLjoLEmiWV9aGknG1d/jzWSUKT/85NvbTdguzv5Y/nAfv/jjrLOk1+rePhq2rih0uRWGrC5aPJOTBt/Pf6Wyj4hIG0raejSTmNuUgEolHMh+GyjxyCUXIAA";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  bg: "#FAFAFA", bgAlt: "#F4F4F5", card: "#FFFFFF", border: "#E4E4E7",
  gold: "#06B6D4", goldFaint: "rgba(6,182,212,0.12)", goldMid: "rgba(6,182,212,0.25)",
  cream: "#09090B", muted: "#71717A", mutedMid: "#52525B",
  red: "#E30B5C", green: "#10B981", yellow: "#F59E0B",
};

// ─────────────────────────────────────────────
// DEFAULT DATA — fallback if Sheets not connected
// ─────────────────────────────────────────────
const DEFAULT_COMPLEXITY = [
  { id: 1, label: "Simple", mult: 1.0 },
  { id: 2, label: "Standard", mult: 1.3 },
  { id: 3, label: "Complex", mult: 1.6 },
  { id: 4, label: "Premium", mult: 2.0 },
  { id: 5, label: "Masterclass", mult: 2.5 },
];
const DEFAULT_URGENCY = [
  { id: 1, label: "Normal", badge: null, mult: 1.0 },
  { id: 2, label: "Rush", badge: "+50%", mult: 1.5 },
  { id: 3, label: "Super Rush", badge: "+100%", mult: 2.0 },
];
const DEFAULT_GD_CATS = ["Print & Promo", "Digital", "Social Media", "Illustration", "Business"];
const DEFAULT_GD_SERVICES = [
  { code:"02-B", name:"Flyer", base:100000, unit:"item", cat:"Print & Promo" },
  { code:"02-G", name:"Banner", base:150000, unit:"item", cat:"Print & Promo" },
  { code:"03-E", name:"Flyer & Poster", base:49000, unit:"item", cat:"Print & Promo" },
  { code:"03-F", name:"Rollup / X-Banner", base:149000, unit:"item", cat:"Print & Promo" },
  { code:"03-G", name:"Greeting Card", base:49000, unit:"item", cat:"Print & Promo" },
  { code:"03-H", name:"Stickers", base:49000, unit:"item", cat:"Print & Promo" },
  { code:"02-C", name:"Kemasan (Packaging)", base:175000, unit:"item", cat:"Print & Promo" },
  { code:"02-D", name:"Merchandise Design", base:50000, unit:"item", cat:"Print & Promo" },
  { code:"02-O", name:"Stationeries Set", base:299000, unit:"set", cat:"Print & Promo" },
  { code:"02-F", name:"Infografis", base:150000, unit:"item", cat:"Digital" },
  { code:"02-Q", name:"Data Visualization", base:100000, unit:"item", cat:"Digital" },
  { code:"02-E", name:"Landing Page Visual", base:299000, unit:"halaman", cat:"Digital" },
  { code:"03-A", name:"Digital Ads Design", base:249000, unit:"item", cat:"Digital" },
  { code:"03-D", name:"Facebook & Google Ads", base:249000, unit:"item", cat:"Digital" },
  { code:"03-C", name:"Print Ads", base:249000, unit:"item", cat:"Digital" },
  { code:"02-L", name:"Billboard Design", base:2490000, unit:"proyek", cat:"Digital" },
  { code:"04-A", name:"Social Media Post", base:69000, unit:"item", cat:"Social Media" },
  { code:"04-B", name:"Instagram Story", base:69000, unit:"item", cat:"Social Media" },
  { code:"04-C", name:"YouTube Thumbnail/Banner", base:69000, unit:"item", cat:"Social Media" },
  { code:"04-D", name:"Facebook & LinkedIn Post", base:69000, unit:"item", cat:"Social Media" },
  { code:"04-E", name:"Twitter/X Banner", base:69000, unit:"item", cat:"Social Media" },
  { code:"04-F", name:"Podcast Cover/Thumbnail", base:69000, unit:"item", cat:"Social Media" },
  { code:"02-H", name:"Icon Custom", base:30000, unit:"icon", cat:"Illustration" },
  { code:"02-I", name:"Ilustrasi Digital", base:199000, unit:"item", cat:"Illustration" },
  { code:"02-J", name:"Mockup Scene", base:35000, unit:"item", cat:"Illustration" },
  { code:"02-K", name:"Portrait Illustration", base:199000, unit:"item", cat:"Illustration" },
  { code:"02-M", name:"Typography Custom", base:175000, unit:"item", cat:"Illustration" },
  { code:"05-A", name:"Company Profile", base:1500000, unit:"proyek", cat:"Business" },
  { code:"05-B", name:"Pitch Deck / Proposal", base:499000, unit:"proyek", cat:"Business" },
  { code:"05-C", name:"Internal Layout/Book", base:50000, unit:"halaman", cat:"Business" },
  { code:"05-D", name:"Presentation Design", base:299000, unit:"proyek", cat:"Business" },
  { code:"02-L-B", name:"Brand Mascot", base:4950000, unit:"proyek", cat:"Business" },
];

const DEFAULT_CONFIG = [
  { key: "logo_base_price", value: 750000 },
  { key: "logo_alt_free", value: 1 },
  { key: "logo_alt_price", value: 250000 },
  { key: "logo_rev_free", value: 2 },
  { key: "logo_rev_price", value: 100000 },
  { key: "logo_mult_files", value: 0.15 },
  { key: "logo_mult_size", value: 0.10 },
  { key: "gd_alt_free", value: 1 },
  { key: "gd_alt_price", value: 150000 },
  { key: "gd_rev_free", value: 2 },
  { key: "gd_rev_price", value: 75000 },
  { key: "gd_mult_files", value: 0.15 },
  { key: "gd_mult_size", value: 0.10 },
  { key: "gd_titip_cetak", value: 0.20 },
  { key: "brand_base_price", value: 750000 },
  { key: "brand_rev_free", value: 2 },
  { key: "brand_rev_price", value: 100000 },
  { key: "uiux_base_price", value: 700000 },
  { key: "uiux_comp_free", value: 10 },
  { key: "uiux_comp_price", value: 50000 },
  { key: "uiux_handoff_price", value: 500000 },
  { key: "uiux_rev_free", value: 2 },
  { key: "uiux_rev_price", value: 150000 },
  { key: "uiux_mult_ratio", value: 0.20 },
  { key: "web_base_price", value: 10000000 },
  { key: "web_page_free", value: 5 },
  { key: "web_page_price", value: 500000 },
];

const DEFAULT_OPTIONS = [
  { category: "logo_type", label: "Combination Mark", value: "Combination Mark" },
  { category: "logo_type", label: "Wordmark", value: "Wordmark" },
  { category: "logo_type", label: "Lettermark / Monogram", value: "Lettermark / Monogram" },
  { category: "logo_type", label: "Pictorial Mark", value: "Pictorial Mark" },
  { category: "logo_type", label: "Abstract Mark", value: "Abstract Mark" },
  { category: "logo_type", label: "Emblem", value: "Emblem" },
  { category: "logo_type", label: "Mascot Logo", value: "Mascot Logo" },
  { category: "gd_ratio", label: "1:1 (Square)", value: "1:1 (Square)" },
  { category: "gd_ratio", label: "4:3 (Standard)", value: "4:3 (Standard)" },
  { category: "gd_ratio", label: "16:9 (Widescreen)", value: "16:9 (Widescreen)" },
  { category: "gd_ratio", label: "9:16 (Portrait/Story)", value: "9:16 (Portrait/Story)" },
  { category: "gd_ratio", label: "A5 (148×210mm)", value: "A5 (148×210mm)" },
  { category: "gd_ratio", label: "A4 (210×297mm)", value: "A4 (210×297mm)" },
  { category: "gd_ratio", label: "A3 (297×420mm)", value: "A3 (297×420mm)" },
  { category: "gd_ratio", label: "Custom", value: "Custom" },
  { category: "uiux_ratio", label: "Mobile (375×812)", value: "Mobile (375×812)" },
  { category: "uiux_ratio", label: "Tablet (768×1024)", value: "Tablet (768×1024)" },
  { category: "uiux_ratio", label: "Desktop (1440×900)", value: "Desktop (1440×900)" },
  { category: "uiux_ratio", label: "Desktop (1920×1080)", value: "Desktop (1920×1080)" },
  { category: "uiux_ratio", label: "TV / Large Screen", value: "TV / Large Screen" },
  { category: "uiux_ratio", label: "Custom", value: "Custom" },
  { category: "prototype", label: "Static Mockup", value: 1.0 },
  { category: "prototype", label: "Clickable Prototype", value: 1.4 },
  { category: "prototype", label: "Hi-Fi Interactive", value: 1.8 },
];

const DEFAULT_ADDONS = [
  // LOGO
  { service: "logo", group: "File Options", id: "multipleFiles", label: "Multiple File Formats", desc: "AI, EPS, SVG, PDF, PNG, JPG semua format", price_val: 0.15, price_type: "percent" },
  { service: "logo", group: "File Options", id: "multipleSize", label: "Multiple Size Export", desc: "Favicon, social media, print sizes", price_val: 0.10, price_type: "percent" },
  { service: "logo", group: "Add-Ons", id: "brand_guidelines", label: "Brand Guidelines (30+ hal.)", price_val: 3500000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "logo_presentation", label: "Logo Presentation Deck", price_val: 500000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "logo_animation", label: "Logo Animation / Sting", price_val: 1500000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "mockup_3scene", label: "Mockup Pack (3 scenes)", price_val: 150000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "files_guarantee", label: "Files Guarantee (Cloud)", price_val: 200000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "brandboard", label: "Brandboard / Style Tile", price_val: 450000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "source_ai", label: "Source File AI/EPS", price_val: 300000, price_type: "flat" },
  { service: "logo", group: "Add-Ons", id: "trademark_prep", label: "Trademark Preparation", price_val: 350000, price_type: "flat" },
  // GD
  { service: "gd", group: "File & Print Options", id: "multipleFiles", label: "Multiple File Formats", desc: "PDF, JPG, PNG, source file", price_val: 0.15, price_type: "percent" },
  { service: "gd", group: "File & Print Options", id: "multipleSize", label: "Multiple Size Variants", desc: "Berbagai ukuran platform", price_val: 0.10, price_type: "percent" },
  { service: "gd", group: "File & Print Options", id: "titipCetak", label: "Titip Cetak (Print Handling)", desc: "ARCT koordinasi ke vendor cetak", price_val: 0.20, price_type: "percent" },
  { service: "gd", group: "Add-Ons", id: "mood_board", label: "Mood Board", price_val: 300000, price_type: "flat" },
  { service: "gd", group: "Add-Ons", id: "mockup_extra", label: "Mockup Scene (+1 scene)", price_val: 35000, price_type: "flat" },
  { service: "gd", group: "Add-Ons", id: "files_guarantee", label: "Files Guarantee (Cloud)", price_val: 150000, price_type: "flat" },
  { service: "gd", group: "Add-Ons", id: "copywriting", label: "Copywriting", price_val: 300000, price_type: "flat" },
  { service: "gd", group: "Add-Ons", id: "source_file", label: "Source File Editable", price_val: 200000, price_type: "flat" },
  { service: "gd", group: "Add-Ons", id: "print_consult", label: "Print Vendor Consultation", price_val: 150000, price_type: "flat" },
  // BRAND
  { service: "brand", group: "Komponen Brand Package", id: "brandGuidelines", label: "Brand Guidelines (Brand Book)", desc: "30–60 halaman komprehensif", price_val: 3500000, price_type: "flat" },
  { service: "brand", group: "Komponen Brand Package", id: "stationeries", label: "Corporate Stationeries", desc: "Kartu nama, kop surat, amplop", price_val: 299000, price_type: "flat" },
  { service: "brand", group: "Komponen Brand Package", id: "maskot", label: "Brand Mascot Character", desc: "Karakter utama + 4–6 ekspresi/pose", price_val: 4950000, price_type: "mult" },
  { service: "brand", group: "Add-Ons", id: "logo_animation", label: "Logo Animation / Sting", price_val: 1500000, price_type: "flat" },
  { service: "brand", group: "Add-Ons", id: "mockup_pack", label: "Mockup Pack (5 scenes)", price_val: 350000, price_type: "flat" },
  { service: "brand", group: "Add-Ons", id: "pitch_template", label: "Pitch Deck Template", price_val: 499000, price_type: "flat" },
  { service: "brand", group: "Add-Ons", id: "social_kit", label: "Social Media Kit (5 posts)", price_val: 345000, price_type: "flat" },
  { service: "brand", group: "Add-Ons", id: "brand_video", label: "Brand Video Intro (2D anim)", price_val: 3500000, price_type: "flat" },
  // UIUX
  { service: "uiux", group: "Platform & Prototype", id: "multipleRatio", label: "Responsive (Multi-Ratio)", desc: "Mobile + Tablet + Desktop all variants", price_val: 0.20, price_type: "percent" },
  { service: "uiux", group: "Handoff & Deliverable", id: "presentationDeck", label: "Presentation Deck", desc: "Deck siap presentasi ke klien/investor", price_val: 299000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "webflow_dev", label: "Development (Webflow/Framer)", price_val: 10000000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "wireframe", label: "Wireframe", price_val: 200000, price_type: "per_page" },
  { service: "uiux", group: "Add-Ons", id: "ux_research", label: "UX Research Report", price_val: 1500000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "mood_board", label: "Mood Board", price_val: 300000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "device_mockup", label: "Device Mockup Pack", price_val: 500000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "files_guarantee", label: "Files Guarantee", price_val: 200000, price_type: "flat" },
  { service: "uiux", group: "Add-Ons", id: "copywriting", label: "Copywriting", price_val: 300000, price_type: "per_page" },
  { service: "uiux", group: "Add-Ons", id: "design_system", label: "Full Design System", price_val: 35000000, price_type: "flat" },
  // WEB
  { service: "web", group: "Built-In Features", id: "cmsSetup", label: "CMS Setup & Training", desc: "Klien kelola konten mandiri", price_val: 2000000, price_type: "flat" },
  { service: "web", group: "Built-In Features", id: "seoBasic", label: "SEO On-Page Basic", desc: "Meta, sitemap, speed optimization", price_val: 1500000, price_type: "flat" },
  { service: "web", group: "Built-In Features", id: "formIntegration", label: "Form & Integration", desc: "Contact form, webhook, email routing", price_val: 750000, price_type: "flat" },
  { service: "web", group: "Built-In Features", id: "analyticsSetup", label: "Analytics & Tracking", desc: "GA4, Meta Pixel, GTM setup", price_val: 500000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "uiux_full", label: "UI/UX Design", price_val: 700000, price_type: "per_page" },
  { service: "web", group: "Add-Ons", id: "custom_animation", label: "Custom Animation / Motion", price_val: 3500000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "ecommerce", label: "E-Commerce Integration", price_val: 5000000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "domain_hosting", label: "Domain & Hosting Setup", price_val: 1000000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "training", label: "Training Session (2 jam)", price_val: 1000000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "maintenance_3mo", label: "Maintenance 3 Bulan", price_val: 2500000, price_type: "flat" },
  { service: "web", group: "Add-Ons", id: "seo_advanced", label: "Advanced SEO Package", price_val: 2000000, price_type: "flat" },
];

// ─────────────────────────────────────────────
// GOOGLE SHEETS INTEGRATION
// ─────────────────────────────────────────────

// Extract Sheet ID from either full URL or raw ID
const extractSheetId = (input) => {
  if (!input) return "";
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
};

// Parse the gviz JSON response (works for public sheets, no API key needed)
const parseGviz = (text) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Format response tidak valid");
  const json = JSON.parse(text.substring(start, end + 1));
  if (!json.table) throw new Error("Sheet kosong atau tidak ditemukan");
  // Normalize column names: lowercase and remove spaces to avoid typos
  const cols = json.table.cols.map((c) => (c.label || c.id || "").toString().toLowerCase().replace(/\s+/g, ""));
  return (json.table.rows || [])
    .filter((r) => r.c && r.c[0] && r.c[0].v != null)
    .map((row) => {
      const obj = {};
      row.c.forEach((cell, i) => { 
        if (cols[i]) obj[cols[i]] = cell ? cell.v : null; 
        obj[`c${i}`] = cell ? cell.v : null; // Fallback by column index
      });
      return obj;
    });
};

const fetchSheet = async (sheetId, sheetName) => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gagal fetch tab "${sheetName}" — pastikan sheet publik`);
  return parseGviz(await res.text());
};

const toBool = (v) => v === true || v === "TRUE" || v === "true" || v === 1;

// Normalize raw Sheets rows into app-ready objects
const normalizeData = (raw) => {
  // If hidden column is present (often c2 for config, or c7 for addons, etc)
  const isHidden = (r, idx) => toBool(r.hidden ?? r[`c${idx}`]);
  
  // Parse config key-value to object
  const config = {};
  const configSource = raw.config?.length ? raw.config : DEFAULT_CONFIG;
  configSource.forEach(r => {
    const key = String(r.key ?? r.c0 ?? "").trim();
    if (key && !isHidden(r, 2)) config[key] = Number(r.value ?? r.c1 ?? 0);
  });

  const COMPLEXITY = raw.complexity?.length
    ? raw.complexity.filter(r => !isHidden(r, 3)).map((r, i) => ({ id: Number(r.id ?? r.code ?? r.c0 ?? i+1), label: String(r.label ?? r.name ?? r.c1 ?? `Level ${i+1}`), mult: Number(r.mult ?? r.c2 ?? 1) }))
    : DEFAULT_COMPLEXITY;
    
  const URGENCY = raw.urgency?.length
    ? raw.urgency.filter(r => !isHidden(r, 4)).map((r, i) => ({ id: Number(r.id ?? r.code ?? r.c0 ?? i+1), label: String(r.label ?? r.name ?? r.c1 ?? `Urgency ${i+1}`), badge: r.badge ?? r.c2 ?? null, mult: Number(r.mult ?? r.c3 ?? 1) }))
    : DEFAULT_URGENCY;
    
  const GD_SERVICES = raw.services?.length
    ? raw.services.filter(r => !isHidden(r, 5)).map((r, i) => ({ code: String(r.code ?? r.id ?? r.c0 ?? `SVC-${i+1}`), name: String(r.name ?? r.label ?? r.c1 ?? `Layanan ${i+1}`), base: Number(r.base ?? r.price ?? r.c2 ?? 0), unit: String(r.unit ?? r.c3 ?? "item"), cat: String(r.cat ?? r.category ?? r.c4 ?? "General") }))
    : DEFAULT_GD_SERVICES;
    
  const GD_CATS = GD_SERVICES.length ? [...new Set(GD_SERVICES.map(s => s.cat))] : DEFAULT_GD_CATS;

  // Per-category fallback: if Sheets options exist but are missing a category,
  // fall back to DEFAULT_OPTIONS items for that missing category.
  let OPTIONS;
  if (raw.options?.length) {
    const sheetOpts = raw.options.filter(r => !isHidden(r, 3)).map(r => ({ category: String(r.category ?? r.c0 ?? ""), label: String(r.label ?? r.c1 ?? ""), value: r.value ?? r.c2 }));
    const sheetCats = new Set(sheetOpts.map(o => o.category));
    const defaultCats = [...new Set(DEFAULT_OPTIONS.map(o => o.category))];
    const merged = [...sheetOpts];
    defaultCats.forEach(cat => {
      if (!sheetCats.has(cat)) merged.push(...DEFAULT_OPTIONS.filter(o => o.category === cat));
    });
    OPTIONS = merged;
  } else {
    OPTIONS = DEFAULT_OPTIONS;
  }

  // NOTE: parseGviz normalizes headers to lowercase+nospace.
  // Sheets column 'type' → r.type, 'price_type' → r.pricetype, 'price_val' → r.priceval
  const ADDONS = raw.addons?.length
    ? raw.addons.filter(r => !isHidden(r, 7)).map((r, i) => ({
        service: String(r.service ?? r.c0 ?? ""),
        group: String(r.group ?? r.c1 ?? "Add-Ons"),
        id: String(r.id ?? r.code ?? r.c2 ?? `add-${i}`),
        label: String(r.label ?? r.name ?? r.c3 ?? `Add-On ${i+1}`),
        desc: String(r.desc ?? r.description ?? r.c4 ?? ""),
        price_val: Number(r.priceval ?? r.price_val ?? r.price ?? r.c5 ?? 0),
        price_type: String(r.type ?? r.pricetype ?? r.price_type ?? r.c6 ?? "flat"),
      }))
    : DEFAULT_ADDONS;

  return { config, COMPLEXITY, URGENCY, GD_SERVICES, GD_CATS, OPTIONS, ADDONS };
};

// ─────────────────────────────────────────────
// DATA CONTEXT
// ─────────────────────────────────────────────
const DataCtx = createContext(null);

function DataProvider({ children }) {
  const [sheetId] = useState(() => import.meta.env.VITE_GOOGLE_SHEET_ID || "");
  const [syncState, setSyncState] = useState({ status: "idle", lastSync: null, error: null, counts: {} });
  const [appData, setAppData] = useState(() => normalizeData({})); // start with defaults

  const sync = useCallback(async (id) => {
    if (!id) return;
    setSyncState((s) => ({ ...s, status: "loading", error: null }));
    try {
      const sheetNames = ["config", "services", "complexity", "urgency", "options", "addons"];
      const results = await Promise.allSettled(sheetNames.map((n) => fetchSheet(id, n)));
      const raw = {};
      const counts = {};
      const errors = [];
      sheetNames.forEach((name, i) => {
        if (results[i].status === "fulfilled") {
          raw[name] = results[i].value;
          counts[name] = results[i].value.length;
        } else {
          raw[name] = [];
          errors.push(`Tab "${name}": ${results[i].reason?.message}`);
        }
      });
      setAppData(normalizeData(raw));
      setSyncState({ status: errors.length > 0 ? "partial" : "ok", lastSync: new Date(), error: errors.length ? errors.join("\n") : null, counts });
    } catch (e) {
      setSyncState({ status: "error", lastSync: null, error: e.message, counts: {} });
    }
  }, []);

  // Auto-connect on mount if ID defined
  useEffect(() => {
    if (sheetId) sync(extractSheetId(sheetId));
  }, [sheetId, sync]);

  return (
    <DataCtx.Provider value={{ appData, syncState, sheetId, sync: () => sync(extractSheetId(sheetId)) }}>
      {children}
    </DataCtx.Provider>
  );
}
const useAppData = () => useContext(DataCtx);

// ─────────────────────────────────────────────
// PRICE CALCULATORS
// ─────────────────────────────────────────────
const fmt = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");

const calcAddOns = (cfg, serviceId, ADDONS, cM, pages) => {
  let addOnFlat = 0;
  let addOnPercent = 0;
  const selectedAddons = ADDONS.filter(a => a.service === serviceId && cfg.addOns.includes(a.id));
  for (const a of selectedAddons) {
    if (a.price_type === "percent") addOnPercent += a.price_val;
    else if (a.price_type === "mult") addOnFlat += a.price_val * cM;
    else if (a.price_type === "per_page") addOnFlat += a.price_val * (pages || 1);
    else addOnFlat += a.price_val;
  }
  return { addOnFlat, addOnPercent };
};

const calcLogo = (cfg, { config, COMPLEXITY, URGENCY, ADDONS }) => {
  const cM = COMPLEXITY.find((c) => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find((u) => u.id === cfg.urgency)?.mult || 1;
  let base = config.logo_base_price * cfg.quantity * cM * uM;
  let opts = 0;
  if (cfg.alternatives > config.logo_alt_free) opts += (cfg.alternatives - config.logo_alt_free) * config.logo_alt_price;
  if (cfg.revisions > config.logo_rev_free) opts += (cfg.revisions - config.logo_rev_free) * config.logo_rev_price;
  
  const { addOnFlat, addOnPercent } = calcAddOns(cfg, "logo", ADDONS, cM, 1);
  const addOnTotal = ((base + opts) * addOnPercent) + addOnFlat;
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

const calcGD = (cfg, { config, COMPLEXITY, URGENCY, GD_SERVICES, ADDONS }) => {
  const svc = GD_SERVICES.find((s) => s.code === cfg.serviceCode);
  if (!svc) return { base: 0, opts: 0, addOnTotal: 0, subtotal: 0 };
  const cM = COMPLEXITY.find((c) => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find((u) => u.id === cfg.urgency)?.mult || 1;
  let base = svc.base * cfg.quantity * cM * uM;
  let opts = 0;
  if (cfg.alternatives > config.gd_alt_free) opts += (cfg.alternatives - config.gd_alt_free) * config.gd_alt_price;
  if (cfg.revisions > config.gd_rev_free) opts += (cfg.revisions - config.gd_rev_free) * config.gd_rev_price;
  
  const { addOnFlat, addOnPercent } = calcAddOns(cfg, "gd", ADDONS, cM, 1);
  const addOnTotal = ((base + opts) * addOnPercent) + addOnFlat;
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal, svc };
};

const calcBrand = (cfg, { config, COMPLEXITY, URGENCY, ADDONS }) => {
  const cM = COMPLEXITY.find((c) => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find((u) => u.id === cfg.urgency)?.mult || 1;
  let base = config.brand_base_price * cM * uM;
  let opts = 0;
  if (cfg.revisions > config.brand_rev_free) opts += (cfg.revisions - config.brand_rev_free) * config.brand_rev_price;
  
  const { addOnFlat, addOnPercent } = calcAddOns(cfg, "brand", ADDONS, cM, 1);
  const addOnTotal = ((base + opts) * addOnPercent) + addOnFlat;
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

const calcUIUX = (cfg, { config, COMPLEXITY, URGENCY, ADDONS }) => {
  const cM = COMPLEXITY.find((c) => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find((u) => u.id === cfg.urgency)?.mult || 1;
  const pM = Number(cfg.prototypeComplexity) || 1;
  
  let base = config.uiux_base_price * cfg.pages * cM * uM * pM;
  let opts = 0;
  if (cfg.components > config.uiux_comp_free) opts += (cfg.components - config.uiux_comp_free) * config.uiux_comp_price;
  if (cfg.handoffHours > 0) opts += cfg.handoffHours * config.uiux_handoff_price;
  if (cfg.revisions > config.uiux_rev_free) opts += (cfg.revisions - config.uiux_rev_free) * config.uiux_rev_price;
  
  const { addOnFlat, addOnPercent } = calcAddOns(cfg, "uiux", ADDONS, cM, cfg.pages);
  const addOnTotal = ((base + opts) * addOnPercent) + addOnFlat;
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

const calcWeb = (cfg, { config, COMPLEXITY, URGENCY, ADDONS }) => {
  const cM = COMPLEXITY.find((c) => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find((u) => u.id === cfg.urgency)?.mult || 1;
  let base = config.web_base_price * cM * uM;
  let opts = 0;
  if (cfg.pages > config.web_page_free) opts += (cfg.pages - config.web_page_free) * config.web_page_price;
  
  const { addOnFlat, addOnPercent } = calcAddOns(cfg, "web", ADDONS, cM, cfg.pages);
  const addOnTotal = ((base + opts) * addOnPercent) + addOnFlat;
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

// ─────────────────────────────────────────────
// DEFAULT CONFIGS
// ─────────────────────────────────────────────
const defaultLogo = { logoType:"Combination Mark",alternatives:3,quantity:1,revisions:3,complexity:2,urgency:1,multipleFiles:true,multipleSize:false,addOns:[] };
const defaultGD = { serviceCode:"02-B",alternatives:2,quantity:10,revisions:2,complexity:2,urgency:1,ratio:"A4 (210×297mm)",multipleFiles:false,multipleSize:false,titipCetak:false,addOns:[] };
const defaultBrand = { complexity:3,urgency:1,revisions:3,brandGuidelines:true,stationeries:true,maskot:false,addOns:[] };
const defaultUIUX = { pages:8,revisions:2,complexity:2,urgency:1,ratio:"Mobile (375×812)",multipleRatio:false,prototypeComplexity:2,components:20,handoffHours:0,presentationDeck:false,addOns:[] };
const defaultWeb = { pages:6,complexity:2,urgency:1,cmsSetup:true,seoBasic:false,formIntegration:false,analyticsSetup:false,addOns:[] };

// ─────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────
const Label = ({ children }) => (
  <div style={{ fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:7,fontWeight:600 }}>{children}</div>
);
const Hint = ({ children }) => (
  <div style={{ fontSize:10.5,color:C.muted,marginTop:-10,lineHeight:1.5 }}>{children}</div>
);

function Stepper({ label, hint, value, onChange, min=1, max=999 }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
        <button onClick={() => onChange(Math.max(min, value-1))} style={{ width:28,height:28,borderRadius:5,background:C.card,border:`1px solid ${C.border}`,color:C.cream,cursor:"pointer",fontSize:15,lineHeight:"1" }}>−</button>
        <span style={{ minWidth:36,textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:15,color:C.gold,fontWeight:500 }}>{value}</span>
        <button onClick={() => onChange(Math.min(max, value+1))} style={{ width:28,height:28,borderRadius:5,background:C.card,border:`1px solid ${C.border}`,color:C.cream,cursor:"pointer",fontSize:15,lineHeight:"1" }}>+</button>
      </div>
      {hint && <div style={{ fontSize:10.5,color:C.muted,marginTop:5,lineHeight:1.5 }}>{hint}</div>}
    </div>
  );
}

function Levels({ label, opts, value, onChange }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
        {opts.map(o => {
          const active = value === o.id;
          return (
            <button key={o.id} onClick={() => onChange(o.id)} style={{ padding:"6px 13px",borderRadius:5,fontSize:11.5,fontFamily:"'Inter',sans-serif",border:`1px solid ${active?C.gold:C.border}`,background:active?C.goldMid:C.card,color:active?C.gold:C.mutedMid,cursor:"pointer",fontWeight:active?600:400,transition:"all 0.12s",display:"flex",alignItems:"center",gap:5 }}>
              {o.label}{o.badge && <span style={{ fontSize:9.5,opacity:.85 }}>{o.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",userSelect:"none" }}>
      <div style={{ width:36,height:20,borderRadius:10,background:checked?C.gold:C.border,padding:2,flexShrink:0,transition:"background 0.18s",marginTop:1 }}>
        <div style={{ width:16,height:16,borderRadius:8,background:"#fff",transform:checked?"translateX(16px)":"translateX(0)",transition:"transform 0.18s" }} />
      </div>
      <div>
        <div style={{ fontSize:12.5,color:checked?C.cream:C.mutedMid }}>{label}</div>
        {desc && <div style={{ fontSize:10.5,color:C.muted,marginTop:2 }}>{desc}</div>}
      </div>
    </div>
  );
}

function DropSelect({ label, value, onChange, options }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width:"100%",padding:"8px 12px",borderRadius:6,background:C.card,border:`1px solid ${C.border}`,color:C.cream,fontSize:12.5,fontFamily:"'Inter',sans-serif",outline:"none",cursor:"pointer" }}>
        {options.map(o => typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Checkboxes({ label, opts, selected, onChange }) {
  const toggle = id => onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
        {opts.map(o => {
          const on = selected.includes(o.id);
          const priceStr = o.priceStr || `+${fmt(o.price)}`;
          return (
            <div key={o.id} onClick={() => toggle(o.id)} style={{ padding:"9px 11px",borderRadius:7,cursor:"pointer",border:`1px solid ${on?C.gold:C.border}`,background:on?C.goldFaint:C.bgAlt,transition:"all 0.12s" }}>
              <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                <div style={{ width:13,height:13,borderRadius:3,border:`1.5px solid ${on?C.gold:C.muted}`,background:on?C.gold:"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  {on && <span style={{ fontSize:8,color:"#000",fontWeight:800 }}>✓</span>}
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:11,color:on?C.cream:C.mutedMid,lineHeight:1.3 }}>{o.label}</div>
                  <div style={{ fontSize:10,color:C.gold,fontFamily:"'DM Mono',monospace",marginTop:2 }}>{priceStr}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, children, open: initOpen=true }) {
  const [open, setOpen] = useState(initOpen);
  return (
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <div onClick={() => setOpen(o => !o)} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",cursor:"pointer",userSelect:"none" }}>
        <span style={{ fontSize:10,fontWeight:700,color:C.mutedMid,textTransform:"uppercase",letterSpacing:"0.12em" }}>{title}</span>
        <span style={{ color:C.muted,fontSize:11,display:"inline-block",transform:open?"rotate(0)":"rotate(-90deg)",transition:"0.18s" }}>▾</span>
      </div>
      {open && <div style={{ paddingBottom:20,display:"flex",flexDirection:"column",gap:16 }}>{children}</div>}
    </div>
  );
}
function TwoCol({ children }) { return <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>{children}</div>; }

// ─────────────────────────────────────────────
// GENERIC ADDON GROUP RENDERER
// ─────────────────────────────────────────────
// Groups named "Add-Ons" render as a 2-col checkbox grid.
// All other groups ("File Options", "Built-In Features", etc.) render as Toggles.
function AddonGroup({ appData, cfg, onChange, serviceId, groupName, defaultOpen = true }) {
  const addons = appData.ADDONS.filter(a => a.service === serviceId && a.group === groupName);
  if (!addons.length) return null;
  const isCheckboxGroup = groupName === "Add-Ons";

  const formatAddonPrice = (a) => {
    if (a.price_type === 'percent') return `+${Math.round(a.price_val * 100)}%`;
    if (a.price_type === 'per_page') return `+${fmt(a.price_val)}/hal`;
    if (a.price_type === 'mult') return `+${fmt(a.price_val)}+`;
    return `+${fmt(a.price_val)}`;
  };

  const setAddons = (newAddons) => onChange({ ...cfg, addOns: newAddons });

  if (isCheckboxGroup) {
    const opts = addons.map(a => ({ id: a.id, label: a.label, priceStr: formatAddonPrice(a) }));
    return (
      <Section title={groupName} open={defaultOpen}>
        <Checkboxes opts={opts} selected={cfg.addOns} onChange={setAddons} />
      </Section>
    );
  }

  return (
    <Section title={groupName} open={defaultOpen}>
      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {addons.map(a => (
          <Toggle
            key={a.id}
            label={a.label}
            desc={`${formatAddonPrice(a)}${a.desc ? " — " + a.desc : ""}`}
            checked={cfg.addOns.includes(a.id)}
            onChange={v => {
              if (v) setAddons([...cfg.addOns, a.id]);
              else setAddons(cfg.addOns.filter(id => id !== a.id));
            }}
          />
        ))}
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────
// SERVICE CONFIGURATORS
// ─────────────────────────────────────────────
function LogoConfig({ cfg, onChange }) {
  const { appData } = useAppData();
  const c = appData.config;
  const set = (k,v) => onChange({ ...cfg, [k]:v });
  const logoTypes = appData.OPTIONS.filter(o => o.category === "logo_type");
  return (
    <>
      <Section title="Identitas & Konsep">
        <DropSelect label="Jenis Logo" value={cfg.logoType} onChange={v => set("logoType",v)} options={logoTypes} />
        <TwoCol>
          <Stepper label="Alternatif Konsep" value={cfg.alternatives} onChange={v => set("alternatives",v)} min={1} max={10} hint={`${c.logo_alt_free} konsep gratis, +${fmt(c.logo_alt_price)}/tambahan`} />
          <Stepper label="Quantity / Item" value={cfg.quantity} onChange={v => set("quantity",v)} min={1} max={100} />
        </TwoCol>
        <Stepper label="Jumlah Revisi" value={cfg.revisions} onChange={v => set("revisions",v)} min={1} max={10} hint={`${c.logo_rev_free} revisi gratis, +${fmt(c.logo_rev_price)}/tambahan`} />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Complexity Level" opts={appData.COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity",v)} />
        <Levels label="Urgency" opts={appData.URGENCY} value={cfg.urgency} onChange={v => set("urgency",v)} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="logo" groupName="File Options" />
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="logo" groupName="Add-Ons" defaultOpen={false} />
    </>
  );
}

function GDConfig({ cfg, onChange }) {
  const { appData } = useAppData();
  const c = appData.config;
  const set = (k,v) => onChange({ ...cfg, [k]:v });
  const [cat, setCat] = useState(appData.GD_CATS[0] || "Print & Promo");
  const filtered = appData.GD_SERVICES.filter(s => s.cat === cat);
  const ratioOpts = appData.OPTIONS.filter(o => o.category === "gd_ratio");
  return (
    <>
      <Section title="Pilih Sub-Layanan">
        <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
          {appData.GD_CATS.map(c => (
            <button key={c} onClick={() => { setCat(c); if (!appData.GD_SERVICES.find(s => s.cat===c && s.code===cfg.serviceCode)) set("serviceCode", appData.GD_SERVICES.find(s => s.cat===c)?.code || "02-B"); }}
              style={{ padding:"5px 11px",borderRadius:4,fontSize:11,fontFamily:"'Inter',sans-serif",border:`1px solid ${cat===c?C.gold:C.border}`,background:cat===c?C.goldMid:C.card,color:cat===c?C.gold:C.muted,cursor:"pointer" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:4,maxHeight:220,overflowY:"auto" }}>
          {filtered.map(s => (
            <div key={s.code} onClick={() => set("serviceCode",s.code)} style={{ padding:"9px 13px",borderRadius:6,cursor:"pointer",border:`1px solid ${cfg.serviceCode===s.code?C.gold:C.border}`,background:cfg.serviceCode===s.code?C.goldFaint:C.card,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.1s" }}>
              <div><span style={{ fontSize:10,color:C.muted,marginRight:7 }}>{s.code}</span><span style={{ fontSize:12.5,color:cfg.serviceCode===s.code?C.cream:C.mutedMid }}>{s.name}</span></div>
              <span style={{ fontSize:11,color:C.gold,fontFamily:"'DM Mono',monospace",flexShrink:0 }}>{fmt(s.base)}/{s.unit}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Parameter Utama">
        <TwoCol>
          <Stepper label="Alternatif Konsep" value={cfg.alternatives} onChange={v => set("alternatives",v)} min={1} max={5} hint={`+${fmt(c.gd_alt_price)}/tambahan`} />
          <Stepper label="Quantity" value={cfg.quantity} onChange={v => set("quantity",v)} min={1} max={1000} />
        </TwoCol>
        <Stepper label="Jumlah Revisi" value={cfg.revisions} onChange={v => set("revisions",v)} min={1} max={10} hint={`${c.gd_rev_free} revisi gratis, +${fmt(c.gd_rev_price)}/tambahan`} />
        <DropSelect label="Ukuran / Ratio" value={cfg.ratio} onChange={v => set("ratio",v)} options={ratioOpts} />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Complexity" opts={appData.COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity",v)} />
        <Levels label="Urgency" opts={appData.URGENCY} value={cfg.urgency} onChange={v => set("urgency",v)} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="gd" groupName="File & Print Options" />
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="gd" groupName="Add-Ons" defaultOpen={false} />
    </>
  );
}

function BrandConfig({ cfg, onChange }) {
  const { appData } = useAppData();
  const c = appData.config;
  const set = (k,v) => onChange({ ...cfg, [k]:v });
  return (
    <>
      <Section title="Komponen Utama">
        <div style={{ padding:"11px 14px",borderRadius:7,border:`1px solid ${C.gold}`,background:C.goldFaint,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div><div style={{ fontSize:12.5,color:C.cream,fontWeight:600 }}>✦  Logo Design</div><div style={{ fontSize:10.5,color:C.muted,marginTop:2 }}>Selalu termasuk — fondasi visual brand</div></div>
          <span style={{ fontSize:11.5,color:C.gold,fontFamily:"'DM Mono',monospace" }}>{fmt(c.brand_base_price)}+</span>
        </div>
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="brand" groupName="Komponen Brand Package" />
      <Section title="Complexity & Urgency">
        <Levels label="Brand Complexity" opts={appData.COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity",v)} />
        <Levels label="Urgency" opts={appData.URGENCY} value={cfg.urgency} onChange={v => set("urgency",v)} />
        <Stepper label="Total Revisi" value={cfg.revisions} onChange={v => set("revisions",v)} min={1} max={10} hint={`${c.brand_rev_free} revisi gratis, +${fmt(c.brand_rev_price)}/tambahan`} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="brand" groupName="Add-Ons" defaultOpen={false} />
    </>
  );
}

function UIUXConfig({ cfg, onChange }) {
  const { appData } = useAppData();
  const c = appData.config;
  const set = (k,v) => onChange({ ...cfg, [k]:v });
  const ratioOpts = appData.OPTIONS.filter(o => o.category === "uiux_ratio");
  const protoOpts = appData.OPTIONS.filter(o => o.category === "prototype").map((o, i) => ({ id: o.value, label: o.label }));
  return (
    <>
      <Section title="Scope & Skala">
        <TwoCol>
          <Stepper label="Jumlah Halaman (Screens)" value={cfg.pages} onChange={v => set("pages",v)} min={1} max={500} />
          <Stepper label="Components Library" value={cfg.components} onChange={v => set("components",v)} min={0} max={500} />
        </TwoCol>
        <Hint>{c.uiux_comp_free} komponen pertama gratis · +{fmt(c.uiux_comp_price)}/komponen selanjutnya</Hint>
        <Stepper label="Revisi (per fase)" value={cfg.revisions} onChange={v => set("revisions",v)} min={1} max={5} hint={`${c.uiux_rev_free} revisi gratis, +${fmt(c.uiux_rev_price)}/tambahan`} />
      </Section>
      <Section title="Platform & Prototype">
        <DropSelect label="Platform Utama" value={cfg.ratio} onChange={v => set("ratio",v)} options={ratioOpts} />
        <Levels label="Prototype Complexity" opts={protoOpts} value={cfg.prototypeComplexity} onChange={v => set("prototypeComplexity",v)} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="uiux" groupName="Platform & Prototype" />
      <Section title="Handoff & Deliverable">
        <Stepper label="Developer Handoff (jam)" value={cfg.handoffHours} onChange={v => set("handoffHours",v)} min={0} max={20} hint={`${fmt(c.uiux_handoff_price)}/jam`} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="uiux" groupName="Handoff & Deliverable" />
      <Section title="Complexity & Urgency">
        <Levels label="Design Complexity" opts={appData.COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity",v)} />
        <Levels label="Urgency" opts={appData.URGENCY} value={cfg.urgency} onChange={v => set("urgency",v)} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="uiux" groupName="Add-Ons" defaultOpen={false} />
    </>
  );
}

function WebConfig({ cfg, onChange }) {
  const { appData } = useAppData();
  const c = appData.config;
  const set = (k,v) => onChange({ ...cfg, [k]:v });
  return (
    <>
      <Section title="Scope Proyek">
        <Stepper label="Jumlah Halaman" value={cfg.pages} onChange={v => set("pages",v)} min={1} max={100} hint={`${c.web_page_free} halaman dasar gratis · +${fmt(c.web_page_price)}/halaman selanjutnya`} />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Project Complexity" opts={appData.COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity",v)} />
        <Levels label="Urgency" opts={appData.URGENCY} value={cfg.urgency} onChange={v => set("urgency",v)} />
      </Section>
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="web" groupName="Built-In Features" />
      <AddonGroup appData={appData} cfg={cfg} onChange={onChange} serviceId="web" groupName="Add-Ons" defaultOpen={false} />
    </>
  );
}

// ─────────────────────────────────────────────
// PRICE PANEL
// ─────────────────────────────────────────────
function PricePanel({ service, cfg, onAddToCart, isMobile, hasCart }) {
  const { appData } = useAppData();
  const [expanded, setExpanded] = useState(false);

  const result = useMemo(() => {
    if (service === "logo") return calcLogo(cfg, appData);
    if (service === "gd") return calcGD(cfg, appData);
    if (service === "brand") return calcBrand(cfg, appData);
    if (service === "uiux") return calcUIUX(cfg, appData);
    if (service === "web") return calcWeb(cfg, appData);
    return { base:0,opts:0,addOnTotal:0,subtotal:0 };
  }, [service, cfg, appData]);

  const ppn = result.subtotal * 0.11;
  const total = result.subtotal + ppn;
  const SVC_LABELS = { logo:"Logo Design",gd:"Graphic Design",brand:"Visual Brand Identity",uiux:"UI/UX Design",web:"Web Development" };
  const SVC_CODES = { logo:"02-A",gd:cfg?.serviceCode||"02-xx",brand:"02-BRAND",uiux:"09-B",web:"09-C" };
  const cartItem = { id:Date.now()+Math.random(),service,cfg:{...cfg},serviceLabel:SVC_LABELS[service],serviceCode:SVC_CODES[service],result:{...result},subtotal:result.subtotal,ppn,total };

  const Breakdown = () => (
    <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
      {result.base > 0 && <BLine label="Layanan Dasar" val={result.base} />}
      {result.opts > 0 && <BLine label="Opsi & Parameter" val={result.opts} />}
      {result.addOnTotal > 0 && <BLine label="Add-Ons" val={result.addOnTotal} />}
      <div style={{ height:1,background:C.border,margin:"4px 0" }} />
      <BLine label="Subtotal" val={result.subtotal} />
      <BLine label="PPN 11%" val={ppn} muted />
      <div style={{ height:1,background:C.gold,opacity:.25,margin:"4px 0" }} />
      <BLine label="Total Estimasi" val={total} bold />
      <div style={{ marginTop:8,padding:"10px 12px",borderRadius:7,background:`${C.gold}07`,border:`1px solid ${C.gold}20`,fontSize:10,color:C.muted,lineHeight:1.65 }}>
        ⚠ Estimasi awal. Harga final dikonfirmasi setelah diskusi detail.
      </div>
    </div>
  );

  if (isMobile) return (
    <div style={{ position:"fixed",bottom:hasCart?104:16,left:16,right:16,zIndex:100,background:C.card,borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 12px 48px rgba(0,0,0,0.18)",overflow:"hidden",display:"flex",flexDirection:"column",transition:"all 0.3s ease",maxHeight:expanded?"80vh":"100px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:C.card,zIndex:2 }}>
        <div style={{ display:"flex",flexDirection:"column",flex:1,minWidth:0 }}>
          <span style={{ fontSize:9.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.13em",marginBottom:2 }}>Estimasi Harga</span>
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:20,fontWeight:800,color:C.gold,lineHeight:1 }}>{fmt(result.subtotal)}</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
          <button onClick={() => { onAddToCart(cartItem); setExpanded(false); }} style={{ padding:"10px 14px",borderRadius:8,background:C.red,border:"none",color:"#FFF",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>+ TAMBAH</button>
          <button onClick={() => setExpanded(!expanded)} style={{ width:36,height:36,borderRadius:8,background:C.bgAlt,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.mutedMid,fontSize:16 }}>{expanded?"▾":"▴"}</button>
        </div>
      </div>
      {expanded && <div style={{ flex:1,overflowY:"auto",padding:"0 16px 16px",borderTop:`1px solid ${C.border}` }}><div style={{ marginTop:16 }}><Breakdown /></div></div>}
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%" }}>
      <div style={{ padding:"22px 20px",borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontSize:9.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.13em",marginBottom:8 }}>Estimasi Harga</div>
        <div style={{ fontFamily:"'Inter',sans-serif",fontSize:30,fontWeight:800,color:C.gold,letterSpacing:"-0.02em",lineHeight:1 }}>{fmt(result.subtotal)}</div>
        <div style={{ fontSize:10.5,color:C.muted,marginTop:5 }}>Belum termasuk PPN 11%</div>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 20px" }}>
        <div style={{ fontSize:9.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:12 }}>Rincian</div>
        <Breakdown />
      </div>
      <div style={{ padding:"14px 18px",borderTop:`1px solid ${C.border}` }}>
        <button onClick={() => onAddToCart(cartItem)} style={{ width:"100%",padding:"13px",borderRadius:8,background:C.red,border:"none",color:"#FFF",fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",letterSpacing:"0.06em",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );
}

function BLine({ label, val, muted, bold }) {
  return (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
      <span style={{ fontSize:bold?13:12,color:muted?C.muted:C.mutedMid,fontWeight:bold?600:400 }}>{label}</span>
      <span style={{ fontSize:bold?14:12.5,color:bold?C.gold:C.cream,fontFamily:"'DM Mono',monospace",fontWeight:bold?700:400 }}>{fmt(val)}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// SHEETS SETTINGS MODAL
// ─────────────────────────────────────────────
function SyncStatusDot({ status }) {
  const color = { ok:C.green, loading:C.yellow, error:C.red, idle:C.muted, partial:C.yellow }[status] || C.muted;
  const anim = status === "loading" ? "pulse 1s infinite" : "none";
  return <div style={{ width:7,height:7,borderRadius:"50%",background:color,flexShrink:0,animation:anim }} />;
}



// ─────────────────────────────────────────────
// CART + QUOTATION (condensed — same logic as original)
// ─────────────────────────────────────────────
const SVC_DOT = { logo:"#8B5CF6",gd:"#3B82F6",brand:"#F59E0B",uiux:"#10B981",web:"#EF4444" };

function Cart({ items, onRemove, onClose, onQuote, appData }) {
  const grand = items.reduce((s,i) => s+i.total, 0);
  return (
    <div style={{ position:"fixed",top:0,right:0,bottom:0,width:400,background:C.card,borderLeft:`1px solid ${C.border}`,display:"flex",flexDirection:"column",zIndex:1000,boxShadow:"-24px 0 60px rgba(0,0,0,0.55)" }}>
      <div style={{ padding:"20px 24px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div><div style={{ fontFamily:"'Inter',sans-serif",fontSize:17,fontWeight:700,color:C.cream }}>Keranjang</div><div style={{ fontSize:11,color:C.muted,marginTop:2 }}>{items.length} layanan dipilih</div></div>
        <button onClick={onClose} style={{ background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:22,lineHeight:1 }}>×</button>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 24px" }}>
        {items.length === 0
          ? <div style={{ textAlign:"center",padding:"40px 0",color:C.muted,fontSize:13,lineHeight:1.7 }}>Keranjang kosong.<br/>Kalkulasi layanan dan<br/>tambahkan ke sini.</div>
          : <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {items.map(item => {
              const gdSvc = item.service==="gd" ? appData.GD_SERVICES.find(s => s.code===item.cfg.serviceCode) : null;
              return (
                <div key={item.id} style={{ padding:"13px 15px",borderRadius:8,background:C.bgAlt,border:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:3 }}>
                        <div style={{ width:6,height:6,borderRadius:"50%",background:SVC_DOT[item.service]||C.muted,flexShrink:0 }} />
                        <span style={{ fontSize:12,fontWeight:600,color:C.cream }}>{item.serviceLabel}</span>
                      </div>
                      {gdSvc && <div style={{ fontSize:11,color:C.mutedMid,marginBottom:2 }}>{gdSvc.name}</div>}
                      <div style={{ fontSize:10.5,color:C.muted }}>
                        {item.cfg.quantity>1 && `${item.cfg.quantity} item`}
                        {item.cfg.pages>1 && `${item.cfg.pages} halaman`}
                        {item.cfg.complexity && ` · ${appData.COMPLEXITY.find(c=>c.id===item.cfg.complexity)?.label}`}
                      </div>
                      <div style={{ fontSize:13.5,color:C.gold,fontFamily:"'DM Mono',monospace",fontWeight:600,marginTop:6 }}>{fmt(item.total)}</div>
                    </div>
                    <button onClick={() => onRemove(item.id)} style={{ background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:"0 0 0 10px",lineHeight:1,flexShrink:0 }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
      {items.length > 0 && (
        <div style={{ padding:"16px 24px",borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:14 }}>
            <span style={{ fontSize:11.5,color:C.mutedMid }}>Grand Total (inc. PPN)</span>
            <span style={{ fontSize:20,fontWeight:800,color:C.gold,fontFamily:"'Inter',sans-serif" }}>{fmt(grand)}</span>
          </div>
          <button onClick={onQuote} style={{ width:"100%",padding:"13px",borderRadius:8,background:C.red,border:"none",color:"#FFF",fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",letterSpacing:"0.06em" }}>GENERATE QUOTATION PDF</button>
        </div>
      )}
    </div>
  );
}

function CartMobile({ items, onRemove, onQuote, appData }) {
  const [expanded, setExpanded] = useState(false);
  const grand = items.reduce((s,i) => s+i.total, 0);
  return (
    <div style={{ position:"fixed",bottom:16,left:16,right:16,zIndex:101,background:C.card,borderRadius:12,border:`1px solid ${C.border}`,boxShadow:"0 12px 48px rgba(0,0,0,0.18)",overflow:"hidden",display:"flex",flexDirection:"column",transition:"max-height 0.3s ease",maxHeight:expanded?"80vh":"72px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:C.card,zIndex:2,cursor:"pointer" }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display:"flex",flexDirection:"column",flex:1,minWidth:0 }}>
          <span style={{ fontSize:9.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.13em",marginBottom:2 }}>Keranjang ({items.length} item)</span>
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:18,fontWeight:800,color:C.gold,lineHeight:1 }}>{fmt(grand)}</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          {expanded ? <div style={{ color:C.mutedMid,fontSize:24,lineHeight:1 }}>▾</div> : (
            <button onClick={e => { e.stopPropagation(); onQuote(); }} style={{ width:40,height:40,borderRadius:8,background:C.red,border:"none",color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
            </button>
          )}
        </div>
      </div>
      {expanded && (
        <div style={{ flex:1,overflowY:"auto",padding:"0 16px 16px",borderTop:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:12,marginTop:16 }}>Rincian Keranjang</div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {items.map(item => {
              const gdSvc = item.service==="gd" ? appData.GD_SERVICES.find(s => s.code===item.cfg.serviceCode) : null;
              return (
                <div key={item.id} style={{ padding:"12px",borderRadius:8,background:C.bgAlt,border:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:3 }}>
                        <div style={{ width:6,height:6,borderRadius:"50%",background:SVC_DOT[item.service]||C.muted,flexShrink:0 }} />
                        <span style={{ fontSize:12,fontWeight:600,color:C.cream }}>{item.serviceLabel}</span>
                      </div>
                      {gdSvc && <div style={{ fontSize:11,color:C.mutedMid,marginBottom:2 }}>{gdSvc.name}</div>}
                      <div style={{ fontSize:13.5,color:C.gold,fontFamily:"'DM Mono',monospace",fontWeight:600,marginTop:6 }}>{fmt(item.total)}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); onRemove(item.id); }} style={{ background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:22,padding:"0 0 0 10px",lineHeight:1,flexShrink:0 }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}` }}>
            <button onClick={() => { setExpanded(false); onQuote(); }} style={{ width:"100%",padding:"13px",borderRadius:8,background:C.red,border:"none",color:"#FFF",fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",letterSpacing:"0.06em" }}>GENERATE QUOTATION</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Quotation modal — same as original, abbreviated for space
function QuotationModal({ items, onClose, appData }) {
  const [name,setName]=useState(""); const [company,setCompany]=useState(""); const [email,setEmail]=useState(""); const [phone,setPhone]=useState(""); const [notes,setNotes]=useState("");
  const [quoteNo]=useState(`QT-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`);
  const today=new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});
  const grandSub=items.reduce((s,i)=>s+i.subtotal,0), grandPPN=items.reduce((s,i)=>s+i.ppn,0), grandTotal=items.reduce((s,i)=>s+i.total,0);
  const inp={width:"100%",padding:"9px 13px",borderRadius:7,background:C.bgAlt,border:`1px solid ${C.border}`,color:C.cream,fontSize:12.5,fontFamily:"'Inter',sans-serif",outline:"none"};

  const download = () => {
    const fmtN = n => "Rp "+Math.round(n||0).toLocaleString("id-ID");
    const rows = items.map((item,i) => {
      const gdSvc = item.service==="gd" ? appData.GD_SERVICES.find(s=>s.code===item.cfg.serviceCode) : null;
      const svcName = item.serviceLabel+(gdSvc?` — ${gdSvc.name}`:"");
      const qty = item.cfg.quantity||item.cfg.pages||1;
      const unit = gdSvc?.unit||(item.service==="uiux"?"screen":item.service==="web"?"halaman":"proyek");
      const cx = appData.COMPLEXITY.find(c=>c.id===item.cfg.complexity)?.label||"";
      const ug = appData.URGENCY.find(u=>u.id===item.cfg.urgency)?.label||"";
      return `<tr><td>${i+1}</td><td><div style="font-weight:500">${svcName}</div><div style="font-size:10px;color:#999">${item.serviceCode} · ${cx} · ${ug}</div></td><td style="text-align:center">${qty} ${unit}</td><td style="text-align:right;font-family:monospace">${fmtN(item.subtotal)}</td></tr>`;
    }).join("");

    const detailTables = items.map((item, i) => {
      const gdSvc = item.service==="gd" ? appData.GD_SERVICES.find(s=>s.code===item.cfg.serviceCode) : null;
      const svcName = item.serviceLabel+(gdSvc?` — ${gdSvc.name}`:"");
      const cx = appData.COMPLEXITY.find(c=>c.id===item.cfg.complexity);
      const ug = appData.URGENCY.find(u=>u.id===item.cfg.urgency);
      const c = appData.config;
      const cfg = item.cfg;
      const service = item.service;
      const unit = gdSvc?.unit||(service==="uiux"?"screen":service==="web"?"halaman":"proyek");
      const qty = cfg.quantity||cfg.pages||1;
      
      let htmlDetail = `<div style="margin-top:24px;background:#fff;border:1px solid #E4E4E7;border-radius:8px;overflow:hidden;page-break-inside:avoid;">
        <div style="background:#FAFAFA;padding:12px 16px;border-bottom:1px solid #E4E4E7;font-weight:600;font-size:13px;color:#111;">Detail ${i+1}. ${svcName}</div>
        <table style="width:100%;border-collapse:collapse;margin:0;">
        <tbody>`;
        
      const addRow = (label, desc, price) => {
        htmlDetail += `<tr style="border-bottom:1px solid #F4F4F5;"><td style="padding:10px 16px;width:30%;font-size:11px;color:#52525B;font-weight:500;">${label}</td><td style="padding:10px 16px;font-size:11px;color:#09090B;">${desc}</td><td style="padding:10px 16px;text-align:right;font-family:monospace;font-size:12px;color:#06B6D4;font-weight:600;">${price ? fmtN(price) : (price === 0 ? "Termasuk" : "-")}</td></tr>`;
      };

      addRow("Layanan Dasar", `${qty} ${unit}`, item.result.base);
      if (cx) addRow("Kompleksitas", `${cx.label} (Mult: x${cx.mult})`, 0);
      if (ug) addRow("Urgensi", `${ug.label} (Mult: x${ug.mult})`, 0);

      if (service === "logo") {
          if (cfg.alternatives > c.logo_alt_free) {
             addRow("Extra Alternatif", `+${cfg.alternatives - c.logo_alt_free} Konsep`, (cfg.alternatives - c.logo_alt_free) * c.logo_alt_price);
          } else {
             addRow("Alternatif", `${cfg.alternatives} Konsep`, 0);
          }
          if (cfg.revisions > c.logo_rev_free) {
             addRow("Extra Revisi", `+${cfg.revisions - c.logo_rev_free}x`, (cfg.revisions - c.logo_rev_free) * c.logo_rev_price);
          } else {
             addRow("Revisi", `${cfg.revisions}x`, 0);
          }
          if (cfg.logoType) addRow("Jenis Logo", cfg.logoType, null);
      }
      if (service === "gd") {
          if (cfg.alternatives > c.gd_alt_free) {
             addRow("Extra Alternatif", `+${cfg.alternatives - c.gd_alt_free} Konsep`, (cfg.alternatives - c.gd_alt_free) * c.gd_alt_price);
          } else {
             addRow("Alternatif", `${cfg.alternatives} Konsep`, 0);
          }
          if (cfg.revisions > c.gd_rev_free) {
             addRow("Extra Revisi", `+${cfg.revisions - c.gd_rev_free}x`, (cfg.revisions - c.gd_rev_free) * c.gd_rev_price);
          } else {
             addRow("Revisi", `${cfg.revisions}x`, 0);
          }
          if (cfg.ratio) addRow("Ukuran/Rasio", cfg.ratio, null);
      }
      if (service === "brand") {
          if (cfg.revisions > c.brand_rev_free) {
             addRow("Extra Revisi", `+${cfg.revisions - c.brand_rev_free}x`, (cfg.revisions - c.brand_rev_free) * c.brand_rev_price);
          } else {
             addRow("Revisi", `${cfg.revisions}x`, 0);
          }
      }
      if (service === "uiux") {
          if (cfg.components > c.uiux_comp_free) {
             addRow("Extra Komponen", `+${cfg.components - c.uiux_comp_free} Komponen`, (cfg.components - c.uiux_comp_free) * c.uiux_comp_price);
          } else {
             addRow("Komponen", `${cfg.components} Komponen`, 0);
          }
          if (cfg.handoffHours > 0) {
             addRow("Developer Handoff", `${cfg.handoffHours} Jam`, cfg.handoffHours * c.uiux_handoff_price);
          }
          if (cfg.revisions > c.uiux_rev_free) {
             addRow("Extra Revisi", `+${cfg.revisions - c.uiux_rev_free}x`, (cfg.revisions - c.uiux_rev_free) * c.uiux_rev_price);
          } else {
             addRow("Revisi", `${cfg.revisions}x`, 0);
          }
          if (cfg.ratio) addRow("Platform Utama", cfg.ratio, null);
          if (cfg.prototypeComplexity) {
             const protoOpts = appData.OPTIONS.filter(o => o.category === "prototype");
             const p = protoOpts.find(o => o.value == cfg.prototypeComplexity);
             if (p) addRow("Prototype", p.label, null);
          }
      }
      if (service === "web") {
          if (cfg.pages > c.web_page_free) {
             addRow("Extra Halaman", `+${cfg.pages - c.web_page_free} Halaman`, (cfg.pages - c.web_page_free) * c.web_page_price);
          } else {
             addRow("Halaman", `${cfg.pages} Halaman`, 0);
          }
      }

      if (cfg.addOns && cfg.addOns.length > 0) {
         const selectedAddons = appData.ADDONS.filter(a => a.service === service && cfg.addOns.includes(a.id));
         selectedAddons.forEach(a => {
           let price = 0;
           const cM = cx?.mult || 1;
           const pages = cfg.pages || 1;
           if (a.price_type === "percent") price = (item.result.base + item.result.opts) * a.price_val;
           else if (a.price_type === "mult") price = a.price_val * cM;
           else if (a.price_type === "per_page") price = a.price_val * pages;
           else price = a.price_val;
           
           addRow(`Add-on: ${a.label}`, a.desc || '-', price);
         });
      }

      htmlDetail += `</tbody></table>
        <div style="background:#FAFAFA;padding:10px 16px;border-top:1px solid #E4E4E7;text-align:right;font-size:12px;font-weight:700;color:#09090B;">Subtotal: <span style="font-family:monospace;color:#06B6D4;">${fmtN(item.subtotal)}</span></div>
      </div>`;
      
      return htmlDetail;
    }).join("");

    const html=`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>Quotation ${quoteNo}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#F7F5F2;color:#111;font-size:13px}.btn{display:block;margin:20px auto;padding:10px 28px;background:#06B6D4;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer}.page{max-width:800px;margin:0 auto;background:#fff;box-shadow:0 2px 24px rgba(238,238,238,1)}.hdr{padding:32px 48px;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #eee}.body{padding:32px 48px}table{width:100%;border-collapse:collapse;margin-bottom:20px}thead{background:#0A0A0C}thead th{padding:10px 16px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#06B6D4;font-weight:600}tbody tr{border-bottom:1px solid #ede9e2ff}tbody td{padding:11px 16px}tfoot td{padding:10px 16px;font-size:12px}.grand td{background:#0A0A0C;color:#EDE8DF;font-weight:700;padding:14px 16px}.grand .r{color:#06B6D4;font-size:15px;text-align:right;font-family:monospace}.client-box{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px;background:#F7F5F2;border-radius:8px;margin-bottom:24px}.cl{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#AAA;margin-bottom:3px}.cv{font-size:13px;font-weight:500}.footer{padding:16px 48px;border-top:1px solid #EEE;display:flex;justify-content:space-between;font-size:10px;color:#AAA;background:#F7F5F2}.note{text-align:center;font-size:10.5px;color:#999;margin-bottom:16px}@media print{.no-print{display:none!important}body{background:#fff}.page{box-shadow:none;max-width:100%}}</style></head><body><div class="no-print"><button class="btn" onclick="window.print()">🖨 Cetak / Simpan sebagai PDF</button><p class="note">Pilih "Save as PDF" saat dialog print muncul</p></div><div class="page"><div class="hdr"><div><img src="${LOGO_BASE64}" alt="ARCT.STUDIO" style="height:22px; width:auto; object-fit:contain; flex-shrink:0;"/><div style="font-size:11px;color:#555;margin-top:6px">Creative Design & Digital Studio</div><div style="font-size:11px;color:#555;margin-top:2px">studio@arct.agency · arct.agency</div></div><div style="text-align:right"><div style="font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#555;margin-bottom:4px">QUOTATION</div><div style="font-size:18px;font-weight:700;color:#06B6D4;font-family:monospace">${quoteNo}</div><div style="font-size:11px;color:#666;margin-top:4px">${today}</div></div></div><div class="body"><div style="font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#AAA;font-weight:600;margin-bottom:10px">Ditujukan Kepada</div><div class="client-box"><div><div class="cl">Nama</div><div class="cv">${name||"—"}</div></div><div><div class="cl">Perusahaan</div><div class="cv">${company||"—"}</div></div><div><div class="cl">Email</div><div class="cv">${email||"—"}</div></div><div><div class="cl">Telepon</div><div class="cv">${phone||"—"}</div></div></div><div style="font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#AAA;font-weight:600;margin-bottom:10px">Rincian Layanan</div><table><thead><tr><th style="width:36px">#</th><th>Layanan</th><th style="width:80px;text-align:center">Qty</th><th style="width:150px;text-align:right">Harga</th></tr></thead><tbody>${rows}</tbody><tfoot style="border-top:2px solid #ddd"><tr><td colspan="3" style="text-align:right;color:#888">Subtotal</td><td style="text-align:right;font-family:monospace">${fmtN(grandSub)}</td></tr><tr><td colspan="3" style="text-align:right;color:#888">PPN 11%</td><td style="text-align:right;font-family:monospace">${fmtN(grandPPN)}</td></tr><tr class="grand"><td colspan="3">TOTAL ESTIMASI</td><td class="r">${fmtN(grandTotal)}</td></tr></tfoot></table>${notes?`<div style="background:#FFFBF2;border:1px solid #EDD58A;border-radius:6px;padding:12px 16px;margin-bottom:16px;font-size:11px;color:#8A6820;line-height:1.65"><strong>Catatan:</strong> ${notes}</div>`:""}<div style="background:#F2FDF7;border:1px solid #8FD3B0;border-radius:6px;padding:10px 14px;font-size:10.5px;color:#2D7A55;margin-bottom:32px;">✓ Estimasi berdasarkan brief awal. Harga final dikonfirmasi setelah diskusi detail & persetujuan scope.</div><div style="page-break-before: always; border-top: 1px dashed #CCC; padding-top: 32px;"><div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#06B6D4;text-transform:uppercase;letter-spacing:0.12em;">Lampiran: Breakdown Layanan</div>${detailTables}</div></div><div class="footer"><span>ARCT.STUDIO © ${new Date().getFullYear()}</span><span>Pricing Calculator 2026</span></div></div></body></html>`;
    const blob=new Blob([html],{type:"text/html;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    const a=document.createElement("a"); a.href=url; a.download=`Quotation_${quoteNo}_ARCT.html`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),5000);
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:20 }}>
      <div style={{ background:C.card,borderRadius:14,border:`1px solid ${C.border}`,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 40px 100px rgba(0,0,0,0.7)" }}>
        <div style={{ padding:"22px 26px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
          <div><div style={{ fontFamily:"'Inter',sans-serif",fontSize:18,fontWeight:800,color:C.gold }}>Generate Quotation</div><div style={{ fontSize:11,color:C.muted,marginTop:3 }}>{quoteNo} · {today}</div></div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:22,lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding:"18px 26px",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9.5,color:C.mutedMid,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:14 }}>Informasi Klien</div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              <div><Label>Nama Klien</Label><input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" /></div>
              <div><Label>Perusahaan / Brand</Label><input style={inp} value={company} onChange={e=>setCompany(e.target.value)} placeholder="PT. Contoh Brand" /></div>
              <div><Label>Email</Label><input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="client@brand.com" /></div>
              <div><Label>Nomor Telepon</Label><input style={inp} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+62 812 xxxx xxxx" /></div>
            </div>
            <div><Label>Catatan</Label><textarea style={{...inp,resize:"vertical",minHeight:60}} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Catatan tambahan…" /></div>
          </div>
        </div>
        <div style={{ padding:"18px 26px",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9.5,color:C.mutedMid,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:14 }}>Ringkasan ({items.length} layanan)</div>
          {items.map((item,i) => {
            const gdSvc = item.service==="gd"?appData.GD_SERVICES.find(s=>s.code===item.cfg.serviceCode):null;
            return <div key={item.id} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<items.length-1?`1px solid ${C.border}`:"none" }}><div><div style={{ fontSize:12.5,color:C.cream,fontWeight:500 }}>{item.serviceLabel}{gdSvc?` — ${gdSvc.name}`:""}</div></div><div style={{ textAlign:"right" }}><div style={{ fontSize:12.5,color:C.cream,fontFamily:"'DM Mono',monospace" }}>{fmt(item.subtotal)}</div></div></div>;
          })}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:14,paddingTop:14,borderTop:`1px solid ${C.gold}35` }}>
            <span style={{ fontSize:13,fontWeight:600,color:C.cream }}>Total Estimasi</span>
            <span style={{ fontSize:18,fontWeight:800,color:C.gold,fontFamily:"'Inter',sans-serif" }}>{fmt(grandTotal)}</span>
          </div>
        </div>
        <div style={{ padding:"16px 26px",display:"flex",gap:10 }}>
          <button onClick={onClose} style={{ flex:1,padding:"12px",borderRadius:8,background:"none",border:`1px solid ${C.border}`,color:C.mutedMid,cursor:"pointer",fontSize:12,fontFamily:"'Inter',sans-serif" }}>Batal</button>
          <button onClick={download} style={{ flex:2.5,padding:"12px",borderRadius:8,background:C.gold,border:"none",color:"#080809",fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",letterSpacing:"0.05em" }}>↓ DOWNLOAD QUOTATION HTML</button>
        </div>
        <div style={{ textAlign:"center",fontSize:10,color:C.muted,paddingBottom:16 }}>Buka file HTML → Ctrl+P → "Save as PDF"</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
const SERVICES = [
  { id:"logo",label:"Logo Design",icon:"◈" },
  { id:"gd",label:"Graphic Design",icon:"▣" },
  { id:"brand",label:"Visual Brand Identity",icon:"◆" },
  { id:"uiux",label:"UI/UX Design",icon:"⬡" },
  { id:"web",label:"Web Development",icon:"⬢" },
];

function AppInner() {
  const { appData, syncState, sync } = useAppData();
  const [active,setActive] = useState("logo");
  const [logoCfg,setLogoCfg] = useState(defaultLogo);
  const [gdCfg,setGdCfg] = useState(defaultGD);
  const [brandCfg,setBrandCfg] = useState(defaultBrand);
  const [uiuxCfg,setUIUXCfg] = useState(defaultUIUX);
  const [webCfg,setWebCfg] = useState(defaultWeb);
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [quoteOpen,setQuoteOpen] = useState(false);
  const [isMobile,setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check(); window.addEventListener("resize",check); return () => window.removeEventListener("resize",check);
  }, []);

  // Auto-reset GD serviceCode when Sheets data changes and current code no longer exists
  useEffect(() => {
    if (appData.GD_SERVICES.length > 0) {
      const valid = appData.GD_SERVICES.find(s => s.code === gdCfg.serviceCode);
      if (!valid) setGdCfg(c => ({ ...c, serviceCode: appData.GD_SERVICES[0].code }));
    }
  }, [appData.GD_SERVICES]);

  const cfgMap = { logo:[logoCfg,setLogoCfg],gd:[gdCfg,setGdCfg],brand:[brandCfg,setBrandCfg],uiux:[uiuxCfg,setUIUXCfg],web:[webCfg,setWebCfg] };
  const [cfg] = cfgMap[active];

  const addToCart = item => { setCart(c => [...c,item]); setCartOpen(true); };
  const removeFromCart = id => setCart(c => c.filter(i => i.id!==id));

  const syncColor = { ok:C.green,loading:C.yellow,error:C.red,partial:C.yellow,idle:C.muted }[syncState.status] || C.muted;
  const syncLabel = { ok:"Sheets ✓",loading:"Syncing…",error:"Sheets Error",partial:"Sheets ~",idle:"Data Default" }[syncState.status];

  return (
    <div style={{ height:"100vh",background:C.bg,fontFamily:"'Inter',sans-serif",display:"flex",flexDirection:"column",overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
        select option{background:${C.card};color:${C.cream}}
        input::placeholder,textarea::placeholder{color:${C.muted}}
        input,textarea,select{outline:none}
        button{cursor:pointer}
        button:active{transform:scale(.98)}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      `}</style>

      {/* HEADER */}
      <div style={{ height:52,background:C.card,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",flexShrink:0,position:"sticky",top:0,zIndex:200 }}>
        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <picture>
            <source srcSet="asset/logo-main.webp" type="image/avif" />
            <source srcSet="asset/logo-main.png" type="image/webp" />
            <img src="asset/main.webp" alt="Logo" width="auto" height="auto" />
          </picture>
          {!isMobile && (
            <>
              <div style={{ width:1,height:18,background:C.border }} />
              <div style={{ fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.12em" }}>Pricing Calculator 2026</div>
            </>
          )}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          {/* Sync status badge */}
          <button onClick={() => sync()}
            style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 11px",borderRadius:6,background:C.bgAlt,border:`1px solid ${C.border}`,color:C.mutedMid,fontSize:10.5,fontFamily:"'Inter',sans-serif",cursor:"pointer",transition:"all 0.15s" }}>
            <SyncStatusDot status={syncState.status} />
            <span style={{ color:syncColor }}>{syncLabel}</span>
            <span style={{ opacity:.5 }}>↻</span>
          </button>

          {!isMobile && (
            <button onClick={() => setCartOpen(true)}
              style={{ display:"flex",alignItems:"center",gap:8,padding:"7px 15px",borderRadius:6,background:cart.length>0?C.goldMid:C.bgAlt,border:`1px solid ${cart.length>0?C.gold:C.border}`,color:cart.length>0?C.gold:C.mutedMid,fontSize:12,fontFamily:"'Inter',sans-serif",transition:"all 0.15s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Keranjang
              {cart.length>0 && <span style={{ background:C.gold,color:"#080809",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800 }}>{cart.length}</span>}
            </button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div style={{ background:C.bgAlt,borderBottom:`1px solid ${C.border}`,display:"flex",padding:"0 22px",overflowX:"auto",flexShrink:0 }}>
        {SERVICES.map(svc => (
          <button key={svc.id} onClick={() => setActive(svc.id)}
            style={{ padding:"13px 18px",background:"none",border:"none",borderBottom:`2px solid ${active===svc.id?C.gold:"transparent"}`,color:active===svc.id?C.gold:C.muted,fontSize:12.5,fontFamily:"'Inter',sans-serif",fontWeight:active===svc.id?600:400,whiteSpace:"nowrap",transition:"all 0.13s",display:"flex",alignItems:"center",gap:7 }}>
            <span style={{ fontSize:13 }}>{svc.icon}</span>{svc.label}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex:1,display:"flex",overflow:"hidden" }}>
        <div style={{ flex:1,overflowY:"auto",padding:`18px 24px ${isMobile?(cart.length>0?"200px":"120px"):"40px"}` }}>
          <div style={{ marginBottom:22 }}>
            <div style={{ fontFamily:"'Inter',sans-serif",fontSize:21,fontWeight:700,color:C.cream,lineHeight:1.2 }}>{SERVICES.find(s=>s.id===active)?.label}</div>
            <div style={{ fontSize:11.5,color:C.muted,marginTop:5 }}>Atur parameter layanan di bawah. Estimasi harga diperbarui secara realtime.</div>
          </div>
          {active==="logo" && <LogoConfig cfg={logoCfg} onChange={setLogoCfg} />}
          {active==="gd" && <GDConfig cfg={gdCfg} onChange={setGdCfg} />}
          {active==="brand" && <BrandConfig cfg={brandCfg} onChange={setBrandCfg} />}
          {active==="uiux" && <UIUXConfig cfg={uiuxCfg} onChange={setUIUXCfg} />}
          {active==="web" && <WebConfig cfg={webCfg} onChange={setWebCfg} />}
        </div>

        {!isMobile && (
          <div style={{ width:340,padding:"24px",flexShrink:0,display:"flex",flexDirection:"column" }}>
            <div style={{ background:C.card,borderRadius:16,border:`1px solid ${C.border}`,boxShadow:"0 12px 32px rgba(0,0,0,0.08)",display:"flex",flexDirection:"column",flex:1,overflow:"hidden" }}>
              <PricePanel service={active} cfg={cfg} onAddToCart={addToCart} isMobile={false} />
            </div>
          </div>
        )}
      </div>

      {isMobile && <PricePanel service={active} cfg={cfg} onAddToCart={addToCart} isMobile={true} hasCart={cart.length>0} />}

      {/* OVERLAYS */}
      {cartOpen && !isMobile && <>
        <div onClick={() => setCartOpen(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:999 }} />
        <Cart items={cart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} onQuote={() => { setCartOpen(false); setQuoteOpen(true); }} appData={appData} />
      </>}
      {isMobile && cart.length>0 && <CartMobile items={cart} onRemove={removeFromCart} onQuote={() => setQuoteOpen(true)} appData={appData} />}
      {quoteOpen && <QuotationModal items={cart} onClose={() => setQuoteOpen(false)} appData={appData} />}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppInner />
    </DataProvider>
  );
}
