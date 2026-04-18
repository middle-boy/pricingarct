
// ARCT.STUDIO — Pricing Calculator 2026
// Full-featured: Logo, Graphic Design, Brand Identity, UI/UX, Web Dev
import { useState, useMemo, useEffect } from "react";

const LOGO_BASE64 = "data:image/png;base64,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";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  bg: "#FAFAFA",
  bgAlt: "#F4F4F5",
  card: "#FFFFFF",
  cardHover: "#FAFAFA",
  border: "#E4E4E7",
  borderMid: "#D4D4D8",
  gold: "#06B6D4", /* Primary: Bright Turquoise */
  goldFaint: "rgba(6,182,212,0.12)",
  goldMid: "rgba(6,182,212,0.25)",
  cream: "#09090B", /* Text: Dark */
  muted: "#71717A",
  mutedMid: "#52525B",
  green: "#10B981",
  red: "#E30B5C", /* Accent: Raspberry */
};

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────
const fmt = (n) => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
const pct = (n) => (n > 0 ? "+" : "") + (n * 100).toFixed(0) + "%";

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────
const COMPLEXITY = [
  { id: 1, label: "Simple", mult: 1.0 },
  { id: 2, label: "Standard", mult: 1.3 },
  { id: 3, label: "Complex", mult: 1.6 },
  { id: 4, label: "Premium", mult: 2.0 },
  { id: 5, label: "Masterclass", mult: 2.5 },
];

const URGENCY = [
  { id: 1, label: "Normal", badge: null, mult: 1.0 },
  { id: 2, label: "Rush", badge: "+50%", mult: 1.5 },
  { id: 3, label: "Super Rush", badge: "+100%", mult: 2.0 },
];

const LOGO_TYPES = [
  "Combination Mark", "Wordmark", "Lettermark / Monogram",
  "Pictorial Mark", "Abstract Mark", "Emblem", "Mascot Logo",
];

const LOGO_ADDONS = [
  { id: "brand_guidelines", label: "Brand Guidelines (30+ hal.)", price: 3500000 },
  { id: "logo_presentation", label: "Logo Presentation Deck", price: 500000 },
  { id: "logo_animation", label: "Logo Animation / Sting", price: 1500000 },
  { id: "mockup_3scene", label: "Mockup Pack (3 scenes)", price: 150000 },
  { id: "files_guarantee", label: "Files Guarantee (Cloud)", price: 200000 },
  { id: "brandboard", label: "Brandboard / Style Tile", price: 450000 },
  { id: "source_ai", label: "Source File AI/EPS", price: 300000 },
  { id: "trademark_prep", label: "Trademark Preparation", price: 350000 },
];

const GD_CATS = ["Print & Promo", "Digital", "Social Media", "Illustration", "Business"];

const GD_SERVICES = [
  // Print & Promo
  { code: "02-B", name: "Flyer", base: 100000, unit: "item", cat: "Print & Promo" },
  { code: "02-G", name: "Banner", base: 150000, unit: "item", cat: "Print & Promo" },
  { code: "03-E", name: "Flyer & Poster", base: 49000, unit: "item", cat: "Print & Promo" },
  { code: "03-F", name: "Rollup / X-Banner", base: 149000, unit: "item", cat: "Print & Promo" },
  { code: "03-G", name: "Greeting Card", base: 49000, unit: "item", cat: "Print & Promo" },
  { code: "03-H", name: "Stickers", base: 49000, unit: "item", cat: "Print & Promo" },
  { code: "02-C", name: "Kemasan (Packaging)", base: 175000, unit: "item", cat: "Print & Promo" },
  { code: "02-D", name: "Merchandise Design", base: 50000, unit: "item", cat: "Print & Promo" },
  { code: "02-O", name: "Stationeries Set", base: 299000, unit: "set", cat: "Print & Promo" },
  // Digital
  { code: "02-F", name: "Infografis", base: 150000, unit: "item", cat: "Digital" },
  { code: "02-Q", name: "Data Visualization", base: 100000, unit: "item", cat: "Digital" },
  { code: "02-E", name: "Landing Page Visual", base: 299000, unit: "halaman", cat: "Digital" },
  { code: "03-A", name: "Digital Ads Design", base: 249000, unit: "item", cat: "Digital" },
  { code: "03-D", name: "Facebook & Google Ads", base: 249000, unit: "item", cat: "Digital" },
  { code: "03-C", name: "Print Ads", base: 249000, unit: "item", cat: "Digital" },
  { code: "02-L", name: "Billboard Design", base: 2490000, unit: "proyek", cat: "Digital" },
  // Social Media
  { code: "04-A", name: "Social Media Post", base: 69000, unit: "item", cat: "Social Media" },
  { code: "04-B", name: "Instagram Story", base: 69000, unit: "item", cat: "Social Media" },
  { code: "04-C", name: "YouTube Thumbnail/Banner", base: 69000, unit: "item", cat: "Social Media" },
  { code: "04-D", name: "Facebook & LinkedIn Post", base: 69000, unit: "item", cat: "Social Media" },
  { code: "04-E", name: "Twitter/X Banner", base: 69000, unit: "item", cat: "Social Media" },
  { code: "04-F", name: "Podcast Cover/Thumbnail", base: 69000, unit: "item", cat: "Social Media" },
  // Illustration
  { code: "02-H", name: "Icon Custom", base: 30000, unit: "icon", cat: "Illustration" },
  { code: "02-I", name: "Ilustrasi Digital", base: 199000, unit: "item", cat: "Illustration" },
  { code: "02-J", name: "Mockup Scene", base: 35000, unit: "item", cat: "Illustration" },
  { code: "02-K", name: "Portrait Illustration", base: 199000, unit: "item", cat: "Illustration" },
  { code: "02-M", name: "Typography Custom", base: 175000, unit: "item", cat: "Illustration" },
  // Business
  { code: "05-A", name: "Company Profile", base: 1500000, unit: "proyek", cat: "Business" },
  { code: "05-B", name: "Pitch Deck / Proposal", base: 499000, unit: "proyek", cat: "Business" },
  { code: "05-C", name: "Internal Layout/Book", base: 50000, unit: "halaman", cat: "Business" },
  { code: "05-D", name: "Presentation Design", base: 299000, unit: "proyek", cat: "Business" },
  { code: "02-L-B", name: "Brand Mascot", base: 4950000, unit: "proyek", cat: "Business" },
];

const GD_ADDONS = [
  { id: "mood_board", label: "Mood Board", price: 300000 },
  { id: "mockup_extra", label: "Mockup Scene (+1 scene)", price: 35000 },
  { id: "files_guarantee", label: "Files Guarantee (Cloud)", price: 150000 },
  { id: "copywriting", label: "Copywriting", price: 300000 },
  { id: "source_file", label: "Source File Editable", price: 200000 },
  { id: "print_consult", label: "Print Vendor Consultation", price: 150000 },
];

const BRAND_ADDONS = [
  { id: "logo_animation", label: "Logo Animation / Sting", price: 1500000 },
  { id: "mockup_pack", label: "Mockup Pack (5 scenes)", price: 350000 },
  { id: "pitch_template", label: "Pitch Deck Template", price: 499000 },
  { id: "social_kit", label: "Social Media Kit (5 posts)", price: 345000 },
  { id: "brand_video", label: "Brand Video Intro (2D anim)", price: 3500000 },
];

const UIUX_ADDONS = [
  { id: "webflow_dev", label: "Development (Webflow/Framer)", price: 10000000, perPage: false },
  { id: "wireframe", label: "Wireframe (per halaman)", price: 200000, perPage: true },
  { id: "ux_research", label: "UX Research Report", price: 1500000, perPage: false },
  { id: "mood_board", label: "Mood Board", price: 300000, perPage: false },
  { id: "device_mockup", label: "Device Mockup Pack", price: 500000, perPage: false },
  { id: "files_guarantee", label: "Files Guarantee", price: 200000, perPage: false },
  { id: "copywriting", label: "Copywriting (per halaman)", price: 300000, perPage: true },
  { id: "design_system", label: "Full Design System", price: 35000000, perPage: false },
];

const WEB_ADDONS = [
  { id: "uiux_full", label: "UI/UX Design (per halaman)", price: 700000, perPage: true },
  { id: "custom_animation", label: "Custom Animation / Motion", price: 3500000, perPage: false },
  { id: "ecommerce", label: "E-Commerce Integration", price: 5000000, perPage: false },
  { id: "domain_hosting", label: "Domain & Hosting Setup", price: 1000000, perPage: false },
  { id: "training", label: "Training Session (2 jam)", price: 1000000, perPage: false },
  { id: "maintenance_3mo", label: "Maintenance 3 Bulan", price: 2500000, perPage: false },
  { id: "seo_advanced", label: "Advanced SEO Package", price: 2000000, perPage: false },
];

// ─────────────────────────────────────────────
// PRICE CALCULATORS
// ─────────────────────────────────────────────
const calcLogo = (cfg) => {
  const cM = COMPLEXITY.find(c => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find(u => u.id === cfg.urgency)?.mult || 1;
  let base = 750000 * cfg.quantity * cM * uM;
  let opts = 0;
  if (cfg.alternatives > 1) opts += (cfg.alternatives - 1) * 250000;
  if (cfg.revisions > 2) opts += (cfg.revisions - 2) * 100000;
  let withOpts = base + opts;
  if (cfg.multipleFiles) withOpts *= 1.15;
  if (cfg.multipleSize) withOpts *= 1.10;
  const addOnTotal = cfg.addOns.reduce((s, id) => s + (LOGO_ADDONS.find(a => a.id === id)?.price || 0), 0);
  return { base, opts: withOpts - base, addOnTotal, subtotal: withOpts + addOnTotal };
};

const calcGD = (cfg) => {
  const svc = GD_SERVICES.find(s => s.code === cfg.serviceCode);
  if (!svc) return { base: 0, opts: 0, addOnTotal: 0, subtotal: 0 };
  const cM = COMPLEXITY.find(c => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find(u => u.id === cfg.urgency)?.mult || 1;
  let base = svc.base * cfg.quantity * cM * uM;
  let opts = 0;
  if (cfg.alternatives > 1) opts += (cfg.alternatives - 1) * 150000;
  if (cfg.revisions > 2) opts += (cfg.revisions - 2) * 75000;
  let withOpts = base + opts;
  if (cfg.multipleFiles) withOpts *= 1.15;
  if (cfg.multipleSize) withOpts *= 1.10;
  if (cfg.titipCetak) withOpts *= 1.20;
  const addOnTotal = cfg.addOns.reduce((s, id) => s + (GD_ADDONS.find(a => a.id === id)?.price || 0), 0);
  return { base, opts: withOpts - base, addOnTotal, subtotal: withOpts + addOnTotal, svc };
};

const calcBrand = (cfg) => {
  const cM = COMPLEXITY.find(c => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find(u => u.id === cfg.urgency)?.mult || 1;
  let base = 750000 * cM * uM;
  let opts = 0;
  if (cfg.revisions > 2) opts += (cfg.revisions - 2) * 100000;
  if (cfg.brandGuidelines) opts += 3500000;
  if (cfg.stationeries) opts += 299000;
  if (cfg.maskot) opts += 4950000 * cM;
  const addOnTotal = cfg.addOns.reduce((s, id) => s + (BRAND_ADDONS.find(a => a.id === id)?.price || 0), 0);
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

const calcUIUX = (cfg) => {
  const cM = COMPLEXITY.find(c => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find(u => u.id === cfg.urgency)?.mult || 1;
  const pM = [1.0, 1.4, 1.8][cfg.prototypeComplexity - 1] || 1;
  let base = 700000 * cfg.pages * cM * uM * pM;
  let opts = 0;
  if (cfg.components > 10) opts += (cfg.components - 10) * 50000;
  if (cfg.handoffHours > 0) opts += cfg.handoffHours * 500000;
  if (cfg.revisions > 2) opts += (cfg.revisions - 2) * 150000;
  let withOpts = base + opts;
  if (cfg.multipleRatio) withOpts *= 1.20;
  if (cfg.presentationDeck) withOpts += 299000;
  const addOnTotal = cfg.addOns.reduce((s, id) => {
    const a = UIUX_ADDONS.find(x => x.id === id);
    return s + (a ? (a.perPage ? a.price * cfg.pages : a.price) : 0);
  }, 0);
  return { base, opts: withOpts - base, addOnTotal, subtotal: withOpts + addOnTotal };
};

const calcWeb = (cfg) => {
  const cM = COMPLEXITY.find(c => c.id === cfg.complexity)?.mult || 1;
  const uM = URGENCY.find(u => u.id === cfg.urgency)?.mult || 1;
  let base = 10000000 * cM * uM;
  let opts = 0;
  if (cfg.pages > 5) opts += (cfg.pages - 5) * 500000;
  if (cfg.cmsSetup) opts += 2000000;
  if (cfg.seoBasic) opts += 1500000;
  if (cfg.formIntegration) opts += 750000;
  if (cfg.analyticsSetup) opts += 500000;
  const addOnTotal = cfg.addOns.reduce((s, id) => {
    const a = WEB_ADDONS.find(x => x.id === id);
    return s + (a ? (a.perPage ? a.price * cfg.pages : a.price) : 0);
  }, 0);
  return { base, opts, addOnTotal, subtotal: base + opts + addOnTotal };
};

// ─────────────────────────────────────────────
// DEFAULT CONFIGS
// ─────────────────────────────────────────────
const defaultLogo = { logoType: "Combination Mark", alternatives: 3, quantity: 1, revisions: 3, complexity: 2, urgency: 1, multipleFiles: true, multipleSize: false, addOns: [] };
const defaultGD = { serviceCode: "02-B", alternatives: 2, quantity: 10, revisions: 2, complexity: 2, urgency: 1, ratio: "A4 (210×297mm)", multipleFiles: false, multipleSize: false, titipCetak: false, addOns: [] };
const defaultBrand = { complexity: 3, urgency: 1, revisions: 3, brandGuidelines: true, stationeries: true, maskot: false, addOns: [] };
const defaultUIUX = { pages: 8, revisions: 2, complexity: 2, urgency: 1, ratio: "Mobile (375×812)", multipleRatio: false, prototypeComplexity: 2, components: 20, handoffHours: 0, presentationDeck: false, addOns: [] };
const defaultWeb = { pages: 6, complexity: 2, urgency: 1, cmsSetup: true, seoBasic: false, formIntegration: false, analyticsSetup: false, addOns: [] };

// ─────────────────────────────────────────────
// PRIMITIVE COMPONENTS
// ─────────────────────────────────────────────

const Label = ({ children }) => (
  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 7, fontWeight: 600 }}>
    {children}
  </div>
);

const Hint = ({ children }) => (
  <div style={{ fontSize: 10.5, color: C.muted, marginTop: -10, lineHeight: 1.5 }}>{children}</div>
);

function Stepper({ label, hint, value, onChange, min = 1, max = 999 }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => onChange(Math.max(min, value - 1))}
          style={{
            width: 28, height: 28, borderRadius: 5, background: C.card, border: `1px solid ${C.border}`,
            color: C.cream, cursor: "pointer", fontSize: 15, lineHeight: "1"
          }}>−</button>
        <span style={{
          minWidth: 36, textAlign: "center", fontFamily: "'DM Mono',monospace", fontSize: 15,
          color: C.gold, fontWeight: 500
        }}>{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))}
          style={{
            width: 28, height: 28, borderRadius: 5, background: C.card, border: `1px solid ${C.border}`,
            color: C.cream, cursor: "pointer", fontSize: 15, lineHeight: "1"
          }}>+</button>
      </div>
      {hint && <div style={{ fontSize: 10.5, color: C.muted, marginTop: 5, lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

function Levels({ label, opts, value, onChange }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {opts.map(o => {
          const active = value === o.id;
          return (
            <button key={o.id} onClick={() => onChange(o.id)}
              style={{
                padding: "6px 13px", borderRadius: 5, fontSize: 11.5, fontFamily: "'Inter',sans-serif",
                border: `1px solid ${active ? C.gold : C.border}`,
                background: active ? C.goldMid : C.card,
                color: active ? C.gold : C.mutedMid,
                cursor: "pointer", fontWeight: active ? 600 : 400, transition: "all 0.12s",
                display: "flex", alignItems: "center", gap: 5
              }}>
              {o.label}
              {o.badge && <span style={{ fontSize: 9.5, opacity: 0.85 }}>{o.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <div style={{
        width: 36, height: 20, borderRadius: 10, background: checked ? C.gold : C.border,
        padding: 2, flexShrink: 0, transition: "background 0.18s", marginTop: 1
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: 8, background: "#fff",
          transform: checked ? "translateX(16px)" : "translateX(0)", transition: "transform 0.18s"
        }} />
      </div>
      <div>
        <div style={{ fontSize: 12.5, color: checked ? C.cream : C.mutedMid }}>{label}</div>
        {desc && <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>{desc}</div>}
      </div>
    </div>
  );
}

function DropSelect({ label, value, onChange, options }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "8px 12px", borderRadius: 6, background: C.card,
          border: `1px solid ${C.border}`, color: C.cream, fontSize: 12.5,
          fontFamily: "'Inter',sans-serif", outline: "none", cursor: "pointer"
        }}>
        {options.map(o => typeof o === "string"
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Checkboxes({ label, opts, selected, onChange }) {
  const toggle = id => onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {opts.map(o => {
          const on = selected.includes(o.id);
          return (
            <div key={o.id} onClick={() => toggle(o.id)}
              style={{
                padding: "9px 11px", borderRadius: 7, cursor: "pointer",
                border: `1px solid ${on ? C.gold : C.border}`,
                background: on ? C.goldFaint : C.bgAlt, transition: "all 0.12s"
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{
                  width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${on ? C.gold : C.muted}`,
                  background: on ? C.gold : "transparent", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {on && <span style={{ fontSize: 8, color: "#000", fontWeight: 800 }}>✓</span>}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: on ? C.cream : C.mutedMid, lineHeight: 1.3 }}>{o.label}</div>
                  <div style={{ fontSize: 10, color: C.gold, fontFamily: "'DM Mono',monospace", marginTop: 2 }}>
                    +{fmt(o.price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, children, open: initOpen = true }) {
  const [open, setOpen] = useState(initOpen);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <div onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 0", cursor: "pointer", userSelect: "none"
        }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.mutedMid, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          {title}
        </span>
        <span style={{
          color: C.muted, fontSize: 11, display: "inline-block",
          transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "0.18s"
        }}>▾</span>
      </div>
      {open && (
        <div style={{ paddingBottom: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function TwoCol({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;
}

// ─────────────────────────────────────────────
// SERVICE CONFIGURATORS
// ─────────────────────────────────────────────

function LogoConfig({ cfg, onChange }) {
  const set = (k, v) => onChange({ ...cfg, [k]: v });
  return (
    <>
      <Section title="Identitas & Konsep">
        <DropSelect label="Jenis Logo" value={cfg.logoType} onChange={v => set("logoType", v)} options={LOGO_TYPES} />
        <TwoCol>
          <Stepper label="Alternatif Konsep" value={cfg.alternatives} onChange={v => set("alternatives", v)} min={1} max={10}
            hint="1 konsep gratis, +Rp 250.000/konsep tambahan" />
          <Stepper label="Quantity / Item" value={cfg.quantity} onChange={v => set("quantity", v)} min={1} max={100} />
        </TwoCol>
        <Stepper label="Jumlah Revisi" value={cfg.revisions} onChange={v => set("revisions", v)} min={1} max={10}
          hint="2 revisi mayor gratis, selanjutnya +Rp 100.000/revisi" />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Complexity Level" opts={COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity", v)} />
        <Levels label="Urgency" opts={URGENCY} value={cfg.urgency} onChange={v => set("urgency", v)} />
      </Section>
      <Section title="File Options">
        <Toggle checked={cfg.multipleFiles} onChange={v => set("multipleFiles", v)}
          label="Multiple File Formats" desc="+15% — AI, EPS, SVG, PDF, PNG, JPG semua format" />
        <Toggle checked={cfg.multipleSize} onChange={v => set("multipleSize", v)}
          label="Multiple Size Export" desc="+10% — Favicon, social media, print sizes" />
      </Section>
      <Section title="Add-Ons" open={false}>
        <Checkboxes opts={LOGO_ADDONS} selected={cfg.addOns} onChange={v => set("addOns", v)} />
      </Section>
    </>
  );
}

function GDConfig({ cfg, onChange }) {
  const set = (k, v) => onChange({ ...cfg, [k]: v });
  const [cat, setCat] = useState("Print & Promo");
  const filtered = GD_SERVICES.filter(s => s.cat === cat);

  return (
    <>
      <Section title="Pilih Sub-Layanan">
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {GD_CATS.map(c => (
            <button key={c} onClick={() => {
              setCat(c);
              if (!GD_SERVICES.find(s => s.cat === c && s.code === cfg.serviceCode)) {
                set("serviceCode", GD_SERVICES.find(s => s.cat === c)?.code || "02-B");
              }
            }}
              style={{
                padding: "5px 11px", borderRadius: 4, fontSize: 11, fontFamily: "'Inter',sans-serif",
                border: `1px solid ${cat === c ? C.gold : C.border}`,
                background: cat === c ? C.goldMid : C.card,
                color: cat === c ? C.gold : C.muted, cursor: "pointer"
              }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 220, overflowY: "auto" }}>
          {filtered.map(s => (
            <div key={s.code} onClick={() => set("serviceCode", s.code)}
              style={{
                padding: "9px 13px", borderRadius: 6, cursor: "pointer",
                border: `1px solid ${cfg.serviceCode === s.code ? C.gold : C.border}`,
                background: cfg.serviceCode === s.code ? C.goldFaint : C.card,
                display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.1s"
              }}>
              <div>
                <span style={{ fontSize: 10, color: C.muted, marginRight: 7 }}>{s.code}</span>
                <span style={{ fontSize: 12.5, color: cfg.serviceCode === s.code ? C.cream : C.mutedMid }}>{s.name}</span>
              </div>
              <span style={{ fontSize: 11, color: C.gold, fontFamily: "'DM Mono',monospace", flexShrink: 0 }}>
                {fmt(s.base)}/{s.unit}
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Parameter Utama">
        <TwoCol>
          <Stepper label="Alternatif Konsep" value={cfg.alternatives} onChange={v => set("alternatives", v)} min={1} max={5}
            hint="+Rp 150.000/konsep tambahan" />
          <Stepper label="Quantity" value={cfg.quantity} onChange={v => set("quantity", v)} min={1} max={1000} />
        </TwoCol>
        <Stepper label="Jumlah Revisi" value={cfg.revisions} onChange={v => set("revisions", v)} min={1} max={10}
          hint="2 revisi gratis, +Rp 75.000/revisi tambahan" />
        <DropSelect label="Ukuran / Ratio" value={cfg.ratio} onChange={v => set("ratio", v)}
          options={["1:1 (Square)", "4:3 (Standard)", "16:9 (Widescreen)", "9:16 (Portrait/Story)", "A5 (148×210mm)", "A4 (210×297mm)", "A3 (297×420mm)", "Custom"]} />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Complexity" opts={COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity", v)} />
        <Levels label="Urgency" opts={URGENCY} value={cfg.urgency} onChange={v => set("urgency", v)} />
      </Section>
      <Section title="File & Print Options">
        <Toggle checked={cfg.multipleFiles} onChange={v => set("multipleFiles", v)}
          label="Multiple File Formats" desc="+15% — PDF, JPG, PNG, source file" />
        <Toggle checked={cfg.multipleSize} onChange={v => set("multipleSize", v)}
          label="Multiple Size Variants" desc="+10% — Berbagai ukuran platform" />
        <Toggle checked={cfg.titipCetak} onChange={v => set("titipCetak", v)}
          label="Titip Cetak (Print Handling)" desc="+20% handling — ARCT koordinasi ke vendor cetak" />
      </Section>
      <Section title="Add-Ons" open={false}>
        <Checkboxes opts={GD_ADDONS} selected={cfg.addOns} onChange={v => set("addOns", v)} />
      </Section>
    </>
  );
}

function BrandConfig({ cfg, onChange }) {
  const set = (k, v) => onChange({ ...cfg, [k]: v });
  return (
    <>
      <Section title="Komponen Brand Package">
        <div style={{
          padding: "11px 14px", borderRadius: 7, border: `1px solid ${C.gold}`,
          background: C.goldFaint, display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: 12.5, color: C.cream, fontWeight: 600 }}>✦  Logo Design</div>
            <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>Selalu termasuk — fondasi visual brand</div>
          </div>
          <span style={{ fontSize: 11.5, color: C.gold, fontFamily: "'DM Mono',monospace" }}>Rp 750.000+</span>
        </div>
        <Toggle checked={cfg.brandGuidelines} onChange={v => set("brandGuidelines", v)}
          label="Brand Guidelines (Brand Book)" desc="Rp 3.500.000 — 30–60 halaman komprehensif" />
        <Toggle checked={cfg.stationeries} onChange={v => set("stationeries", v)}
          label="Corporate Stationeries" desc="Rp 299.000 — Kartu nama, kop surat, amplop" />
        <Toggle checked={cfg.maskot} onChange={v => set("maskot", v)}
          label="Brand Mascot Character" desc="Rp 4.950.000+ — Karakter utama + 4–6 ekspresi/pose" />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Brand Complexity" opts={COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity", v)} />
        <Levels label="Urgency" opts={URGENCY} value={cfg.urgency} onChange={v => set("urgency", v)} />
        <Stepper label="Total Revisi" value={cfg.revisions} onChange={v => set("revisions", v)} min={1} max={10}
          hint="2 revisi gratis, +Rp 100.000/revisi tambahan" />
      </Section>
      <Section title="Add-Ons" open={false}>
        <Checkboxes opts={BRAND_ADDONS} selected={cfg.addOns} onChange={v => set("addOns", v)} />
      </Section>
    </>
  );
}

const PROTO_OPTS = [
  { id: 1, label: "Static Mockup" },
  { id: 2, label: "Clickable Prototype" },
  { id: 3, label: "Hi-Fi Interactive" },
];

function UIUXConfig({ cfg, onChange }) {
  const set = (k, v) => onChange({ ...cfg, [k]: v });
  return (
    <>
      <Section title="Scope & Skala">
        <TwoCol>
          <Stepper label="Jumlah Halaman (Screens)" value={cfg.pages} onChange={v => set("pages", v)} min={1} max={500} />
          <Stepper label="Components Library" value={cfg.components} onChange={v => set("components", v)} min={0} max={500} />
        </TwoCol>
        <Hint>10 komponen pertama gratis · +Rp 50.000/komponen selanjutnya</Hint>
        <Stepper label="Revisi (per fase)" value={cfg.revisions} onChange={v => set("revisions", v)} min={1} max={5}
          hint="2 revisi gratis, +Rp 150.000/revisi tambahan" />
      </Section>
      <Section title="Platform & Prototype">
        <DropSelect label="Platform Utama" value={cfg.ratio} onChange={v => set("ratio", v)}
          options={["Mobile (375×812)", "Tablet (768×1024)", "Desktop (1440×900)", "Desktop (1920×1080)", "TV / Large Screen", "Custom"]} />
        <Toggle checked={cfg.multipleRatio} onChange={v => set("multipleRatio", v)}
          label="Responsive (Multi-Ratio)" desc="+20% — Mobile + Tablet + Desktop all variants" />
        <Levels label="Prototype Complexity" opts={PROTO_OPTS} value={cfg.prototypeComplexity} onChange={v => set("prototypeComplexity", v)} />
      </Section>
      <Section title="Handoff & Deliverable">
        <Stepper label="Developer Handoff Meeting (jam)" value={cfg.handoffHours} onChange={v => set("handoffHours", v)} min={0} max={20}
          hint="Rp 500.000/jam — live Figma walkthrough dengan tim developer" />
        <Toggle checked={cfg.presentationDeck} onChange={v => set("presentationDeck", v)}
          label="Presentation Deck" desc="+Rp 299.000 — Deck siap presentasi ke klien/investor" />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Design Complexity" opts={COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity", v)} />
        <Levels label="Urgency" opts={URGENCY} value={cfg.urgency} onChange={v => set("urgency", v)} />
      </Section>
      <Section title="Add-Ons" open={false}>
        <Checkboxes opts={UIUX_ADDONS} selected={cfg.addOns} onChange={v => set("addOns", v)} />
      </Section>
    </>
  );
}

function WebConfig({ cfg, onChange }) {
  const set = (k, v) => onChange({ ...cfg, [k]: v });
  return (
    <>
      <Section title="Scope Proyek">
        <Stepper label="Jumlah Halaman" value={cfg.pages} onChange={v => set("pages", v)} min={1} max={100}
          hint="5 halaman termasuk dalam base price · +Rp 500.000/halaman ke-6 dst" />
      </Section>
      <Section title="Complexity & Urgency">
        <Levels label="Project Complexity" opts={COMPLEXITY} value={cfg.complexity} onChange={v => set("complexity", v)} />
        <Levels label="Urgency" opts={URGENCY} value={cfg.urgency} onChange={v => set("urgency", v)} />
      </Section>
      <Section title="Built-In Features">
        <Toggle checked={cfg.cmsSetup} onChange={v => set("cmsSetup", v)}
          label="CMS Setup & Training" desc="+Rp 2.000.000 — Klien kelola konten mandiri" />
        <Toggle checked={cfg.seoBasic} onChange={v => set("seoBasic", v)}
          label="SEO On-Page Basic" desc="+Rp 1.500.000 — Meta, sitemap, speed optimization" />
        <Toggle checked={cfg.formIntegration} onChange={v => set("formIntegration", v)}
          label="Form & Integration" desc="+Rp 750.000 — Contact form, webhook, email routing" />
        <Toggle checked={cfg.analyticsSetup} onChange={v => set("analyticsSetup", v)}
          label="Analytics & Tracking" desc="+Rp 500.000 — GA4, Meta Pixel, GTM setup" />
      </Section>
      <Section title="Add-Ons" open={false}>
        <Checkboxes opts={WEB_ADDONS} selected={cfg.addOns} onChange={v => set("addOns", v)} />
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────
// PRICE PANEL
// ─────────────────────────────────────────────
function PricePanel({ service, cfg, onAddToCart, isMobile, hasCart }) {
  const [isMaximized, setIsMaximized] = useState(false);

  const result = useMemo(() => {
    if (service === "logo") return calcLogo(cfg);
    if (service === "gd") return calcGD(cfg);
    if (service === "brand") return calcBrand(cfg);
    if (service === "uiux") return calcUIUX(cfg);
    if (service === "web") return calcWeb(cfg);
    return { base: 0, opts: 0, addOnTotal: 0, subtotal: 0 };
  }, [service, cfg]);

  const ppn = result.subtotal * 0.11;
  const total = result.subtotal + ppn;

  const SVC_LABELS = { logo: "Logo Design", gd: "Graphic Design", brand: "Visual Brand Identity", uiux: "UI/UX Design", web: "Web Development" };
  const SVC_CODES = { logo: "02-A", gd: cfg?.serviceCode || "02-xx", brand: "02-BRAND", uiux: "09-B", web: "09-C" };

  const addToCartParams = {
    id: Date.now() + Math.random(),
    service, cfg: { ...cfg },
    serviceLabel: SVC_LABELS[service],
    serviceCode: SVC_CODES[service],
    result: { ...result },
    subtotal: result.subtotal,
    ppn, total,
  };

  if (isMobile) {
    return (
      <div style={{
        position: "fixed", bottom: hasCart ? 104 : 16, left: 16, right: 16, zIndex: 100,
        background: C.card, borderRadius: 12, border: `1px solid ${C.border}`,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease",
        maxHeight: isMaximized ? "80vh" : "100px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px", background: C.card, zIndex: 2
        }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 2 }}>Estimasi Harga</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 800, color: C.gold, lineHeight: 1 }}>{fmt(result.subtotal)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => { onAddToCart(addToCartParams); setIsMaximized(false); }}
              style={{
                padding: "10px 14px", borderRadius: 8, background: C.red,
                border: "none", color: "#FFFFFF", fontSize: 12, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Inter',sans-serif"
              }}>
              + TAMBAH
            </button>
            <button onClick={() => setIsMaximized(!isMaximized)}
              style={{
                width: 36, height: 36, borderRadius: 8, background: C.bgAlt, border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.mutedMid, fontSize: 16
              }}>
              {isMaximized ? "▾" : "▴"}
            </button>
          </div>
        </div>

        {isMaximized && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12, marginTop: 16 }}>
              Rincian
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {result.base > 0 && <BLine label="Layanan Dasar" val={result.base} />}
              {result.opts > 0 && <BLine label="Opsi & Parameter" val={result.opts} />}
              {result.addOnTotal > 0 && <BLine label="Add-Ons" val={result.addOnTotal} />}
              <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
              <BLine label="Subtotal" val={result.subtotal} />
              <BLine label="PPN 11%" val={ppn} muted />
              <div style={{ height: 1, background: C.gold, opacity: 0.25, margin: "4px 0" }} />
              <BLine label="Total Estimasi" val={total} bold />
            </div>
            <div style={{
              marginTop: 16, padding: "10px 12px", borderRadius: 7,
              background: `${C.gold}07`, border: `1px solid ${C.gold}20`, fontSize: 10, color: C.muted, lineHeight: 1.65
            }}>
              ⚠ Estimasi awal. Harga final dikonfirmasi setelah diskusi detail.
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Big price */}
      <div style={{ padding: "22px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 8 }}>
          Estimasi Harga
        </div>
        <div style={{
          fontFamily: "'Inter',sans-serif", fontSize: 30, fontWeight: 800, color: C.gold,
          letterSpacing: "-0.02em", lineHeight: 1
        }}>
          {fmt(result.subtotal)}
        </div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 5 }}>Belum termasuk PPN 11%</div>
      </div>

      {/* Breakdown */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        <div style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
          Rincian
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {result.base > 0 && (
            <BLine label="Layanan Dasar" val={result.base} />
          )}
          {result.opts > 0 && (
            <BLine label="Opsi & Parameter" val={result.opts} />
          )}
          {result.addOnTotal > 0 && (
            <BLine label="Add-Ons" val={result.addOnTotal} />
          )}

          <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
          <BLine label="Subtotal" val={result.subtotal} />
          <BLine label="PPN 11%" val={ppn} muted />

          <div style={{ height: 1, background: C.gold, opacity: 0.25, margin: "4px 0" }} />
          <BLine label="Total Estimasi" val={total} bold />
        </div>

        <div style={{
          marginTop: 16, padding: "10px 12px", borderRadius: 7,
          background: `${C.gold}07`, border: `1px solid ${C.gold}20`, fontSize: 10, color: C.muted, lineHeight: 1.65
        }}>
          ⚠ Estimasi awal. Harga final dikonfirmasi setelah diskusi detail.
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => onAddToCart(addToCartParams)}
          style={{
            width: "100%", padding: "13px", borderRadius: 8, background: C.red,
            border: "none", color: "#FFFFFF", fontSize: 12.5, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.06em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );
}

function BLine({ label, val, muted, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: bold ? 13 : 12, color: muted ? C.muted : C.mutedMid, fontWeight: bold ? 600 : 400 }}>
        {label}
      </span>
      <span style={{
        fontSize: bold ? 14 : 12.5, color: bold ? C.gold : C.cream,
        fontFamily: "'DM Mono',monospace", fontWeight: bold ? 700 : 400
      }}>
        {fmt(val)}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────
const SVC_DOT = { logo: "#8B5CF6", gd: "#3B82F6", brand: "#F59E0B", uiux: "#10B981", web: "#EF4444" };

function Cart({ items, onRemove, onClose, onQuote }) {
  const grand = items.reduce((s, i) => s + i.total, 0);

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 400, background: C.card,
      borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column",
      zIndex: 1000, boxShadow: "-24px 0 60px rgba(0,0,0,0.55)"
    }}>
      <div style={{
        padding: "20px 24px", borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 700, color: C.cream }}>Keranjang</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{items.length} layanan dipilih</div>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: C.muted,
          cursor: "pointer", fontSize: 22, lineHeight: 1
        }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
        {items.length === 0
          ? <div style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Keranjang kosong.<br />Kalkulasi layanan dan<br />tambahkan ke sini.
          </div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map(item => {
              const gdSvc = item.service === "gd" ? GD_SERVICES.find(s => s.code === item.cfg.serviceCode) : null;
              return (
                <div key={item.id} style={{
                  padding: "13px 15px", borderRadius: 8,
                  background: C.bgAlt, border: `1px solid ${C.border}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: SVC_DOT[item.service] || C.muted, flexShrink: 0
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.cream }}>{item.serviceLabel}</span>
                      </div>
                      {gdSvc && <div style={{ fontSize: 11, color: C.mutedMid, marginBottom: 2 }}>{gdSvc.name}</div>}
                      <div style={{ fontSize: 10.5, color: C.muted }}>
                        {item.cfg.quantity > 1 && `${item.cfg.quantity} item`}
                        {item.cfg.pages > 1 && `${item.cfg.pages} halaman`}
                        {item.cfg.complexity && ` · ${COMPLEXITY.find(c => c.id === item.cfg.complexity)?.label}`}
                      </div>
                      <div style={{
                        fontSize: 13.5, color: C.gold, fontFamily: "'DM Mono',monospace",
                        fontWeight: 600, marginTop: 6
                      }}>{fmt(item.total)}</div>
                    </div>
                    <button onClick={() => onRemove(item.id)}
                      style={{
                        background: "none", border: "none", color: C.muted, cursor: "pointer",
                        fontSize: 18, padding: "0 0 0 10px", lineHeight: 1, flexShrink: 0
                      }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>

      {items.length > 0 && (
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <span style={{ fontSize: 11.5, color: C.mutedMid }}>Grand Total (inc. PPN)</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: C.gold, fontFamily: "'Inter',sans-serif" }}>
              {fmt(grand)}
            </span>
          </div>
          <button onClick={onQuote}
            style={{
              width: "100%", padding: "13px", borderRadius: 8, background: C.red,
              border: "none", color: "#FFFFFF", fontSize: 12.5, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.06em"
            }}>
            GENERATE QUOTATION PDF
          </button>
        </div>
      )}
    </div>
  );
}

function CartMobile({ items, onRemove, onQuote }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const grand = items.reduce((s, i) => s + i.total, 0);

  return (
    <div style={{
      position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 101,
      background: C.card, borderRadius: 12, border: `1px solid ${C.border}`,
      boxShadow: "0 12px 48px rgba(0,0,0,0.18)", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "max-height 0.3s ease",
      maxHeight: isMaximized ? "80vh" : "72px"
    }}>
      {/* Minimized / Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px", background: C.card, zIndex: 2, cursor: "pointer"
      }} onClick={() => setIsMaximized(!isMaximized)}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 2 }}>
            Keranjang ({items.length} item)
          </span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: C.gold, lineHeight: 1 }}>
            {fmt(grand)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {isMaximized ? (
            <div style={{ color: C.mutedMid, fontSize: 24, lineHeight: 1 }}>▾</div>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); onQuote(); }}
              style={{
                width: 40, height: 40, borderRadius: 8, background: C.red,
                border: "none", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Maximized Content */}
      {isMaximized && (
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12, marginTop: 16 }}>
            Rincian Keranjang
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map(item => {
              const gdSvc = item.service === "gd" ? GD_SERVICES.find(s => s.code === item.cfg.serviceCode) : null;
              return (
                <div key={item.id} style={{
                  padding: "12px", borderRadius: 8,
                  background: C.bgAlt, border: `1px solid ${C.border}`
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: SVC_DOT[item.service] || C.muted, flexShrink: 0
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.cream }}>{item.serviceLabel}</span>
                      </div>
                      {gdSvc && <div style={{ fontSize: 11, color: C.mutedMid, marginBottom: 2 }}>{gdSvc.name}</div>}
                      <div style={{ fontSize: 10.5, color: C.muted }}>
                        {item.cfg.quantity > 1 && `${item.cfg.quantity} item`}
                        {item.cfg.pages > 1 && `${item.cfg.pages} halaman`}
                        {item.cfg.complexity && ` · ${COMPLEXITY.find(c => c.id === item.cfg.complexity)?.label}`}
                      </div>
                      <div style={{
                        fontSize: 13.5, color: C.gold, fontFamily: "'DM Mono',monospace",
                        fontWeight: 600, marginTop: 6
                      }}>{fmt(item.total)}</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                      style={{
                        background: "none", border: "none", color: C.muted, cursor: "pointer",
                        fontSize: 22, padding: "0 0 0 10px", lineHeight: 1, flexShrink: 0
                      }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
             <button onClick={() => { setIsMaximized(false); onQuote(); }}
              style={{
                width: "100%", padding: "13px", borderRadius: 8, background: C.red,
                border: "none", color: "#FFFFFF", fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.06em",
                display: "flex", justifyContent: "center", alignItems: "center", gap: 8
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
              GENERATE QUOTATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// QUOTATION MODAL + HTML GENERATOR
// ─────────────────────────────────────────────
function QuotationModal({ items, onClose }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [quoteNo] = useState(`QT-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`);
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const grandSub = items.reduce((s, i) => s + i.subtotal, 0);
  const grandPPN = items.reduce((s, i) => s + i.ppn, 0);
  const grandTotal = items.reduce((s, i) => s + i.total, 0);

  const download = () => {
    const html = buildQuotHTML({ items, name, company, email, phone, notes, quoteNo, today, grandSub, grandPPN, grandTotal });
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    window.open(url, "_blank");

    const a = document.createElement("a");
    a.href = url; a.download = `Quotation_${quoteNo}_ARCT.STUDIO.html`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); 
    
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const inp = {
    width: "100%", padding: "9px 13px", borderRadius: 7, background: C.bgAlt,
    border: `1px solid ${C.border}`, color: C.cream, fontSize: 12.5,
    fontFamily: "'Inter',sans-serif", outline: "none"
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20
    }}>
      <div style={{
        background: C.card, borderRadius: 14, border: `1px solid ${C.border}`,
        width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)"
      }}>

        <div style={{
          padding: "22px 26px 18px", borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start"
        }}>
          <div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: C.gold }}>
              Generate Quotation
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{quoteNo} · {today}</div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none",
            color: C.muted, cursor: "pointer", fontSize: 22, lineHeight: 1
          }}>×</button>
        </div>

        <div style={{ padding: "18px 26px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9.5, color: C.mutedMid, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
            Informasi Klien
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <Label>Nama Klien</Label>
                <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label>Perusahaan / Brand</Label>
                <input style={inp} value={company} onChange={e => setCompany(e.target.value)} placeholder="PT. Contoh Brand" />
              </div>
              <div>
                <Label>Email</Label>
                <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="client@brand.com" />
              </div>
              <div>
                <Label>Nomor Telepon</Label>
                <input style={inp} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+62 812 xxxx xxxx" />
              </div>
            </div>
            <div>
              <Label>Catatan / Keterangan</Label>
              <textarea style={{ ...inp, resize: "vertical", minHeight: 60 }} value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Catatan tambahan untuk quotation..." />
            </div>
          </div>
        </div>

        <div style={{ padding: "18px 26px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9.5, color: C.mutedMid, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
            Ringkasan Layanan ({items.length} item)
          </div>
          {items.map((item, i) => {
            const gdSvc = item.service === "gd" ? GD_SERVICES.find(s => s.code === item.cfg.serviceCode) : null;
            return (
              <div key={item.id} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none"
              }}>
                <div>
                  <div style={{ fontSize: 12.5, color: C.cream, fontWeight: 500 }}>
                    {item.serviceLabel}{gdSvc ? ` — ${gdSvc.name}` : ""}
                  </div>
                  <div style={{ fontSize: 10.5, color: C.muted }}>
                    {item.cfg.quantity ? `${item.cfg.quantity} item` : ""}
                    {item.cfg.pages ? `${item.cfg.pages} halaman` : ""}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12.5, color: C.cream, fontFamily: "'DM Mono',monospace" }}>{fmt(item.subtotal)}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>+{fmt(item.ppn)} PPN</div>
                </div>
              </div>
            );
          })}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.gold}35`
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.cream }}>Total Estimasi</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: C.gold, fontFamily: "'Inter',sans-serif" }}>
              {fmt(grandTotal)}
            </span>
          </div>
        </div>

        <div style={{ padding: "16px 26px", display: "flex", gap: 10 }}>
          <button onClick={onClose}
            style={{
              flex: 1, padding: "12px", borderRadius: 8, background: "none",
              border: `1px solid ${C.border}`, color: C.mutedMid, cursor: "pointer",
              fontSize: 12, fontFamily: "'Inter',sans-serif"
            }}>Batal</button>
          <button onClick={download}
            style={{
              flex: 2.5, padding: "12px", borderRadius: 8, background: C.gold,
              border: "none", color: "#080809", fontSize: 12.5, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Inter',sans-serif", letterSpacing: "0.05em"
            }}>
            ↓ DOWNLOAD QUOTATION HTML
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: C.muted, paddingBottom: 16 }}>
          Buka file HTML yang diunduh → Ctrl+P → "Save as PDF"
        </div>
      </div>
    </div>
  );
}

function getConfigDetails(item) {
  const c = item.cfg;
  const s = item.service;
  const cx = COMPLEXITY.find(x => x.id === c.complexity)?.label || "-";
  const ur = URGENCY.find(x => x.id === c.urgency)?.label || "-";
  const bool = v => v ? "Ya" : "Tidak";
  const getAddons = (ids, list) => ids && ids.length ? ids.map(id => list.find(a => a.id === id)?.label).join(", ") : "Tidak ada";

  const details = [];

  if (s === "logo") {
    details.push({ label: "Jenis Logo", value: c.logoType });
    details.push({ label: "Alternatif Konsep", value: c.alternatives });
    details.push({ label: "Quantity", value: c.quantity });
    details.push({ label: "Jumlah Revisi", value: c.revisions });
    details.push({ label: "Complexity Level", value: cx });
    details.push({ label: "Urgency", value: ur });
    details.push({ label: "Multiple File Formats", value: bool(c.multipleFiles) });
    details.push({ label: "Multiple Size Export", value: bool(c.multipleSize) });
    details.push({ label: "Add-Ons", value: getAddons(c.addOns, LOGO_ADDONS) });
  } else if (s === "gd") {
    const gdSvc = GD_SERVICES.find(x => x.code === c.serviceCode);
    details.push({ label: "Layanan", value: gdSvc ? gdSvc.name : c.serviceCode });
    details.push({ label: "Alternatif Konsep", value: c.alternatives });
    details.push({ label: "Quantity", value: c.quantity });
    details.push({ label: "Jumlah Revisi", value: c.revisions });
    details.push({ label: "Ukuran / Ratio", value: c.ratio });
    details.push({ label: "Complexity Level", value: cx });
    details.push({ label: "Urgency", value: ur });
    details.push({ label: "Multiple File Formats", value: bool(c.multipleFiles) });
    details.push({ label: "Multiple Size Variants", value: bool(c.multipleSize) });
    details.push({ label: "Titip Cetak", value: bool(c.titipCetak) });
    details.push({ label: "Add-Ons", value: getAddons(c.addOns, GD_ADDONS) });
  } else if (s === "brand") {
    details.push({ label: "Brand Guidelines", value: bool(c.brandGuidelines) });
    details.push({ label: "Corporate Stationeries", value: bool(c.stationeries) });
    details.push({ label: "Brand Mascot", value: bool(c.maskot) });
    details.push({ label: "Complexity Level", value: cx });
    details.push({ label: "Urgency", value: ur });
    details.push({ label: "Jumlah Revisi", value: c.revisions });
    details.push({ label: "Add-Ons", value: getAddons(c.addOns, BRAND_ADDONS) });
  } else if (s === "uiux") {
    details.push({ label: "Jumlah Halaman", value: c.pages });
    details.push({ label: "Components Library", value: c.components });
    details.push({ label: "Revisi (per fase)", value: c.revisions });
    details.push({ label: "Platform Utama", value: c.ratio });
    details.push({ label: "Responsive (Multi-Ratio)", value: bool(c.multipleRatio) });
    const proto = PROTO_OPTS.find(x => x.id === c.prototypeComplexity)?.label || "-";
    details.push({ label: "Prototype", value: proto });
    details.push({ label: "Developer Handoff", value: c.handoffHours > 0 ? `${c.handoffHours} jam` : "Tidak" });
    details.push({ label: "Presentation Deck", value: bool(c.presentationDeck) });
    details.push({ label: "Complexity Level", value: cx });
    details.push({ label: "Urgency", value: ur });
    details.push({ label: "Add-Ons", value: getAddons(c.addOns, UIUX_ADDONS) });
  } else if (s === "web") {
    details.push({ label: "Jumlah Halaman", value: c.pages });
    details.push({ label: "CMS Setup & Training", value: bool(c.cmsSetup) });
    details.push({ label: "SEO On-Page Basic", value: bool(c.seoBasic) });
    details.push({ label: "Form & Integration", value: bool(c.formIntegration) });
    details.push({ label: "Analytics & Tracking", value: bool(c.analyticsSetup) });
    details.push({ label: "Complexity Level", value: cx });
    details.push({ label: "Urgency", value: ur });
    details.push({ label: "Add-Ons", value: getAddons(c.addOns, WEB_ADDONS) });
  }

  return details;
}

function buildQuotHTML({ items, name, company, email, phone, notes, quoteNo, today, grandSub, grandPPN, grandTotal }) {
  const fmt2 = n => "Rp " + Math.round(n || 0).toLocaleString("id-ID");
  const attachmentPages = items.map((item, i) => {
    const details = getConfigDetails(item);
    const gdSvc = item.service === "gd" ? GD_SERVICES.find(s => s.code === item.cfg.serviceCode) : null;
    const svcName = item.serviceLabel + (gdSvc ? ` — ${gdSvc.name}` : "");

    const rowsHTML = details.map(d => `
      <tr>
        <td style="width: 40%; color: #666;">${d.label}</td>
        <td style="font-weight: 500;">${d.value}</td>
      </tr>
    `).join("");

    return `
      <div class="page" style="page-break-before: always; margin-top: 40px;">
        <div class="hdr">
          <div>
            <img src="${LOGO_BASE64}" alt="ARCT.STUDIO" style="height: 24px;" />
          </div>
          <div>
            <div style="font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#555;text-align:right;">LAMPIRAN ${i + 1}</div>
          </div>
        </div>
        <div class="body" style="padding-top: 0;">
          <div style="font-size: 16px; font-weight: 700; color: #06B6D4; margin-bottom: 20px;">Rincian Konfigurasi: ${svcName}</div>
          <table class="detail-table">
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");

  const rows = items.map((item, i) => {
    const gdSvc = item.service === "gd" ? GD_SERVICES.find(s => s.code === item.cfg.serviceCode) : null;
    const svcName = item.serviceLabel + (gdSvc ? ` — ${gdSvc.name}` : "");
    const qty = item.cfg.quantity || item.cfg.pages || 1;
    const unit = gdSvc?.unit || (item.service === "uiux" ? "screen" : item.service === "web" ? "halaman" : "proyek");
    const cxLabel = COMPLEXITY.find(c => c.id === item.cfg.complexity)?.label || "";
    const ugLabel = URGENCY.find(u => u.id === item.cfg.urgency)?.label || "";
    return `<tr>
      <td>${i + 1}</td>
      <td>
        <div class="item-name">${svcName}</div>
        <div class="item-sub">${item.serviceCode} &nbsp;·&nbsp; ${cxLabel} &nbsp;·&nbsp; ${ugLabel}</div>
      </td>
      <td class="center">${qty} ${unit}</td>
      <td class="right mono">${fmt2(item.subtotal)}</td>
    </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Quotation ${quoteNo} — ARCT.STUDIO</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#F7F5F2;color:#111;font-size:13px}
.btn-print{display:block;margin:24px auto;padding:11px 32px;background:#06B6D4;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
.note{text-align:center;font-size:11px;color:#999;margin-bottom:24px}
.page{max-width:820px;margin:0 auto;background:#fff;box-shadow:0 2px 24px rgba(238, 238, 238, 1)}
.hdr{background:#ffffff;padding:36px 48px;display:flex;justify-content:space-between;align-items:flex-start}
.logo{font-family:'Inter',sans-serif;font-size:22px;font-weight:800;color:#06B6D4;letter-spacing:.06em}
.logo span{color:#EDE8DF}
.tagline{font-size:11px;color:#555;margin-top:6px}
.qno{font-size:18px;font-weight:700;color:#06B6D4;font-family:monospace;text-align:right}
.qdate{font-size:11px;color:#666;margin-top:4px;text-align:right}
.body{padding:36px 48px}
.section-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#AAA;font-weight:600;margin-bottom:10px}
.client-box{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px 24px;background:#F7F5F2;border-radius:8px;border:1px solid #EAE6DF;margin-bottom:28px}
.client-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#AAA;margin-bottom:3px}
.client-val{font-size:13px;font-weight:500;color:#1A1A1A}
table{width:100%;border-collapse:collapse;margin-bottom:0}
thead{background:#0A0A0C}
thead th{padding:10px 16px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#06B6D4;font-weight:600}
.center{text-align:center!important}
.right{text-align:right!important}
.mono{font-family:monospace!important}
tbody tr{border-bottom:1px solid #ede9e2ff}
tbody td{padding:11px 16px;color:#1A1A1A;vertical-align:top}
.item-name{font-weight:500;font-size:13px}
.item-sub{font-size:10px;color:#999;margin-top:2px}
.totals-section{border-top:2px solid #dbdbdbff}
.tot-row td{padding:9px 16px;font-size:12px}
.grand-row td{padding:14px 16px;background:#0A0A0C;color:#EDE8DF;font-weight:700}
.grand-row .right{color:#06B6D4;font-size:15px}
.notes-box{background:#FFFBF2;border:1px solid #EDD58A;border-radius:6px;padding:13px 16px;margin:20px 0;font-size:11px;color:#8A6820;line-height:1.65}
.footer{padding:20px 48px;border-top:1px solid #EEE;display:flex;justify-content:space-between;font-size:10px;color:#AAA;background:#F7F5F2}
.validity{background:#F2FDF7;border:1px solid #8FD3B0;border-radius:6px;padding:10px 14px;font-size:10.5px;color:#2D7A55;margin-bottom:12px}
.detail-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.detail-table td { padding: 12px 16px; border-bottom: 1px solid #EAE6DF; font-size: 13px; }
.detail-table tr:last-child td { border-bottom: none; }
@media print{.no-print{display:none!important}body{background:#fff}.page{box-shadow:none;max-width:100%;margin:0}}
</style>
</head>
<body>
<div class="no-print">
  <button class="btn-print" onclick="window.print()">🖨&nbsp; Cetak / Simpan sebagai PDF</button>
  <p class="note">Pilih "Save as PDF" saat dialog print muncul · Recommended: A4, Portrait</p>
</div>
<div class="page">
  <div class="hdr">
    <div>
      <img src="${LOGO_BASE64}" alt="ARCT.STUDIO" style="height: 24px;" />
      <div class="tagline">Creative Design & Digital Studio</div>
      <div class="tagline" style="margin-top:4px">studio@arct.agency · arct.agency</div>
    </div>
    <div>
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#555;text-align:right;margin-bottom:4px">QUOTATION</div>
      <div class="qno">${quoteNo}</div>
      <div class="qdate">${today}</div>
      <div class="qdate" style="margin-top:8px;padding:4px 10px;background:#1A1A20;border-radius:4px;display:inline-block;float:right">Berlaku 14 Hari</div>
    </div>
  </div>
  <div class="body">
    <div class="section-lbl">Ditujukan Kepada</div>
    <div class="client-box">
      <div><div class="client-lbl">Nama</div><div class="client-val">${name || "—"}</div></div>
      <div><div class="client-lbl">Perusahaan / Brand</div><div class="client-val">${company || "—"}</div></div>
      <div><div class="client-lbl">Email</div><div class="client-val">${email || "—"}</div></div>
      <div><div class="client-lbl">Telepon</div><div class="client-val">${phone || "—"}</div></div>
    </div>
    <div class="section-lbl">Rincian Layanan</div>
    <table>
      <thead>
        <tr>
          <th style="width:36px">#</th>
          <th>Layanan</th>
          <th style="width:90px" class="center">Qty</th>
          <th style="width:150px" class="right">Harga (excl. PPN)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot class="totals-section">
        <tr class="tot-row"><td colspan="3" class="right" style="color:#888">Subtotal</td><td class="right mono">${fmt2(grandSub)}</td></tr>
        <tr class="tot-row"><td colspan="3" class="right" style="color:#888">PPN 11%</td><td class="right mono">${fmt2(grandPPN)}</td></tr>
        <tr class="grand-row"><td colspan="3">TOTAL ESTIMASI</td><td class="right mono">${fmt2(grandTotal)}</td></tr>
      </tfoot>
    </table>
    ${notes ? `<div class="notes-box"><strong>Catatan:</strong> ${notes}</div>` : ""}
    <div class="validity">✓ Quotation ini bersifat estimasi berdasarkan brief awal. Harga final dikonfirmasi setelah diskusi detail & persetujuan scope pekerjaan.</div>
  </div>
  <div class="footer">
    <span>ARCT.STUDIO © ${new Date().getFullYear()} — All Rights Reserved</span>
    <span>Dibuat menggunakan Pricing Calculator ARCT.STUDIO</span>
  </div>
</div>
${attachmentPages}
</body></html>`;
}

// ─────────────────────────────────────────────
// SERVICE DEFINITIONS
// ─────────────────────────────────────────────
const SERVICES = [
  { id: "logo", label: "Logo Design", icon: "◈", code: "02-A" },
  { id: "gd", label: "Graphic Design", icon: "▣", code: "02-xx" },
  { id: "brand", label: "Visual Brand Identity", icon: "◆", code: "BRAND" },
  { id: "uiux", label: "UI/UX Design", icon: "⬡", code: "09-B" },
  { id: "web", label: "Web Development", icon: "⬢", code: "09-C" },
];

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("logo");
  const [logoCfg, setLogoCfg] = useState(defaultLogo);
  const [gdCfg, setGdCfg] = useState(defaultGD);
  const [brandCfg, setBrandCfg] = useState(defaultBrand);
  const [uiuxCfg, setUIUXCfg] = useState(defaultUIUX);
  const [webCfg, setWebCfg] = useState(defaultWeb);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cfgMap = { logo: [logoCfg, setLogoCfg], gd: [gdCfg, setGdCfg], brand: [brandCfg, setBrandCfg], uiux: [uiuxCfg, setUIUXCfg], web: [webCfg, setWebCfg] };
  const [cfg, setCfg] = cfgMap[active];

  const addToCart = item => { setCart(c => [...c, item]); setCartOpen(true); };
  const removeFromCart = id => setCart(c => c.filter(i => i.id !== id));

  return (
    <div style={{
      height: "100vh", background: C.bg, fontFamily: "'Inter',sans-serif",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
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
      `}</style>

      {/* HEADER */}
      <div style={{
        height: 52, background: C.card, borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 22px", flexShrink: 0, position: "sticky", top: 0, zIndex: 200
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="./asset/logo-main.png" alt="ARCT.STUDIO" style={{ height: 24 }} />
          <div style={{ width: 1, height: 18, background: C.border }} />
          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Pricing Calculator 2026
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!isMobile && (
            <button onClick={() => setCartOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "7px 15px",
                borderRadius: 6, background: cart.length > 0 ? C.goldMid : C.bgAlt,
                border: `1px solid ${cart.length > 0 ? C.gold : C.border}`,
                color: cart.length > 0 ? C.gold : C.mutedMid, fontSize: 12,
                fontFamily: "'Inter',sans-serif", transition: "all 0.15s"
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Keranjang
              {cart.length > 0 && (
                <span style={{
                  background: C.gold, color: "#080809", borderRadius: "50%",
                  width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800
                }}>{cart.length}</span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* SERVICE TABS */}
      <div style={{
        background: C.bgAlt, borderBottom: `1px solid ${C.border}`,
        display: "flex", padding: "0 22px", overflowX: "auto", flexShrink: 0
      }}>
        {SERVICES.map(svc => (
          <button key={svc.id} onClick={() => setActive(svc.id)}
            style={{
              padding: "13px 18px", background: "none", border: "none",
              borderBottom: `2px solid ${active === svc.id ? C.gold : "transparent"}`,
              color: active === svc.id ? C.gold : C.muted, fontSize: 12.5,
              fontFamily: "'Inter',sans-serif", fontWeight: active === svc.id ? 600 : 400,
              whiteSpace: "nowrap", transition: "all 0.13s",
              display: "flex", alignItems: "center", gap: 7
            }}>
            <span style={{ fontSize: 13 }}>{svc.icon}</span>
            {svc.label}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Config Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: `18px 24px ${isMobile ? (cart.length > 0 ? '200px' : '120px') : '40px'}` }}>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 21, fontWeight: 700, color: C.cream, lineHeight: 1.2 }}>
              {SERVICES.find(s => s.id === active)?.label}
            </div>
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 5 }}>
              Atur parameter layanan di bawah. Estimasi harga diperbarui secara realtime.
            </div>
          </div>

          {active === "logo" && <LogoConfig cfg={logoCfg} onChange={setLogoCfg} />}
          {active === "gd" && <GDConfig cfg={gdCfg} onChange={setGdCfg} />}
          {active === "brand" && <BrandConfig cfg={brandCfg} onChange={setBrandCfg} />}
          {active === "uiux" && <UIUXConfig cfg={uiuxCfg} onChange={setUIUXCfg} />}
          {active === "web" && <WebConfig cfg={webCfg} onChange={setWebCfg} />}
        </div>

        {/* Price Panel Desktop */}
        {!isMobile && (
          <div style={{
            width: 340, padding: "24px", flexShrink: 0,
            display: "flex", flexDirection: "column"
          }}>
            <div style={{
              background: C.card, borderRadius: 16,
              border: `1px solid ${C.border}`,
              boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column",
              flex: 1, overflow: "hidden"
            }}>
              <PricePanel service={active} cfg={cfg} onAddToCart={addToCart} isMobile={false} />
            </div>
          </div>
        )}
      </div>

      {/* Price Panel Mobile */}
      {isMobile && <PricePanel service={active} cfg={cfg} onAddToCart={addToCart} isMobile={true} hasCart={cart.length > 0} />}

      {/* OVERLAYS */}
      {cartOpen && !isMobile && <>
        <div onClick={() => setCartOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 999 }} />
        <Cart items={cart} onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
          onQuote={() => { setCartOpen(false); setQuoteOpen(true); }} />
      </>}

      {isMobile && cart.length > 0 && (
        <CartMobile items={cart} onRemove={removeFromCart} onQuote={() => setQuoteOpen(true)} />
      )}

      {quoteOpen && (
        <QuotationModal items={cart} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
