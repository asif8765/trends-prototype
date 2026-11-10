/* Demo data only — clearly labeled in the UI. Not live orders or prices. */
window.DEMO = {
  notice: "Demo data — not live orders, inventory, or prices.",
  computedAt: "10 Nov 2026, 1:40 PM (Asia/Karachi)",
  window: "Last 30 days",
  couriers: ["PostEx", "Trax", "Leopards", "TCS", "M&P"],
  cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Sialkot", "Hyderabad", "Gujranwala"],
  plans: [
    { id: "basic", name: "Basic", price: 2999, stores: 1, skuCap: 200, features: ["1 connected store (Shopify or Woo)", "200 imported SKUs", "Catalog + door-price math", "WhatsApp confirmation", "Weekly payouts", "Account Health"], gated: ["Daraz channel", "Priority confirmation queue", "Team seats", "Creative pack auto-refresh"] },
    { id: "pro", name: "Pro", price: 7999, stores: 3, skuCap: 1500, featured: true, features: ["3 stores (Shopify + Woo)", "1,500 imported SKUs", "Live stock & price sync", "Ad creative packs (Urdu / English)", "Priority confirmation", "Payout holds linked to health"], gated: ["Daraz / Agency API", "Team seats"] },
    { id: "agency", name: "Agency", price: 19999, stores: 10, skuCap: "Unlimited", features: ["Up to 10 stores, incl. Daraz", "Unlimited SKUs", "Team seats", "API access", "Dedicated success queue", "Custom MAP exemptions"], gated: [] },
  ],
  perOrderFee: 25,
  suppliers: [
    { id: "sup-01", name: "Lahore Home Goods", city: "Lahore", rating: 4.8, onTime: 97, health: "Healthy", sla: "24h" },
    { id: "sup-02", name: "Karachi Glow Co.", city: "Karachi", rating: 4.6, onTime: 94, health: "Warning", sla: "48h" },
    { id: "sup-03", name: "Sialkot Daily Wear", city: "Sialkot", rating: 4.9, onTime: 98, health: "Healthy", sla: "24h" },
    { id: "sup-04", name: "Faisalabad Kitchen Lab", city: "Faisalabad", rating: 4.4, onTime: 92, health: "Warning", sla: "48h" },
    { id: "sup-05", name: "Islamabad Tech Nest", city: "Islamabad", rating: 4.7, onTime: 96, health: "Healthy", sla: "24h" },
  ],
  products: [
    { id: "p1", name: "3-tier stainless tiffin", cat: "Home & Kitchen", emoji: "🍱", hue: "#C9E4DE", wholesale: 890, map: 1290, suggested: 1690, courier: 165, weight: "0.7 kg", sla: "24h", stock: 420, supplier: "sup-01", dispatch: "Ships from Lahore in 24h", rating: 4.8, returns: 2.1, video: { duration: "0:28", source: "upload", sourceLabel: "Supplier upload", storeOk: true, adsOk: true, watermarkRequired: false, captionsEn: "3-tier stainless tiffin. Leak-resistant stacks. Ships from Lahore in 24 hours. Cash on delivery across Pakistan.", captionsUr: "تین منزلہ سٹینلیس ٹفن۔ لاہور سے 24 گھنٹے میں روانہ۔ پاکستان بھر میں کیش آن ڈیلیوری۔" } },
    { id: "p2", name: "Warm-white fairy lights 10m", cat: "Home Decor & Bedding", emoji: "✨", hue: "#F8E7C3", wholesale: 420, map: 690, suggested: 990, courier: 150, weight: "0.25 kg", sla: "48h", stock: 1100, supplier: "sup-02", dispatch: "Ships from Karachi in 48h", rating: 4.6, returns: 3.4, video: { duration: "0:19", source: "instagram", sourceLabel: "Instagram post (platform copy)", storeOk: true, adsOk: false, watermarkRequired: false, captionsEn: "10m warm-white fairy lights. Indoor and covered outdoor use.", captionsUr: "10 میٹر گرم سفید فیری لائٹس۔" } },
    { id: "p3", name: "Lawn hijab — sage set of 3", cat: "Women's Fashion & Clothing", emoji: "🧣", hue: "#D9E8C8", wholesale: 780, map: 1190, suggested: 1590, courier: 150, weight: "0.3 kg", sla: "24h", stock: 260, supplier: "sup-03", dispatch: "Ships from Sialkot in 24h", rating: 4.9, returns: 1.4, video: { duration: "0:35", source: "tiktok", sourceLabel: "TikTok post (platform copy)", storeOk: true, adsOk: true, watermarkRequired: true, captionsEn: "Lawn hijab, sage set of three. Soft lawn, ships from Sialkot in 24 hours.", captionsUr: "لان حجاب، سیج سیٹ آف تھری۔ سیالکوٹ سے 24 گھنٹے میں۔" } },
    { id: "p4", name: "Manual vegetable chopper", cat: "Home & Kitchen", emoji: "🥗", hue: "#F3D5C0", wholesale: 560, map: 850, suggested: 1190, courier: 165, weight: "0.55 kg", sla: "48h", stock: 80, supplier: "sup-04", dispatch: "Ships from Faisalabad in 48h", rating: 4.4, returns: 4.8 },
    { id: "p5", name: "Wireless earbuds TWS", cat: "Mobile Accessories", emoji: "🎧", hue: "#D5D9F0", wholesale: 1450, map: 2190, suggested: 2790, courier: 180, weight: "0.2 kg", sla: "24h", stock: 190, supplier: "sup-05", dispatch: "Ships from Islamabad in 24h", rating: 4.7, returns: 2.8, video: { duration: "0:22", source: "youtube", sourceLabel: "YouTube link (platform copy)", storeOk: true, adsOk: true, watermarkRequired: false, captionsEn: "Wireless TWS earbuds. Ships from Islamabad in 24 hours. Cash on delivery.", captionsUr: "وائرلیس ایئربڈز۔ اسلام آباد سے 24 گھنٹے میں روانہ۔" } },
    { id: "p6", name: "Ceramic dinner set 16 pcs", cat: "Home & Kitchen", emoji: "🍽️", hue: "#F0E6DA", wholesale: 3200, map: 4490, suggested: 5490, courier: 280, weight: "3.4 kg", sla: "48h", stock: 44, supplier: "sup-01", dispatch: "Ships from Lahore in 48h", rating: 4.8, returns: 3.0 },
    { id: "p7", name: "Cotton baby wrap carrier", cat: "Kids & Baby", emoji: "👶", hue: "#F5D0D0", wholesale: 990, map: 1490, suggested: 1990, courier: 165, weight: "0.45 kg", sla: "24h", stock: 150, supplier: "sup-03", dispatch: "Ships from Sialkot in 24h", rating: 4.9, returns: 1.8 },
    { id: "p8", name: "Vitamin C face serum 30ml", cat: "Beauty & Skincare", emoji: "💧", hue: "#E4F0C8", wholesale: 640, map: 990, suggested: 1390, courier: 150, weight: "0.12 kg", sla: "24h", stock: 310, supplier: "sup-02", dispatch: "Ships from Karachi in 24h", rating: 4.5, returns: 2.2, video: { duration: "0:16", source: "facebook", sourceLabel: "Facebook post (platform copy)", storeOk: true, adsOk: false, watermarkRequired: false, captionsEn: "Vitamin C face serum, 30ml. For store use only — supplier has not allowed paid ads.", captionsUr: "وٹامن سی فیشل سیرم، 30 ملی لیٹر۔" } },
    { id: "p9", name: "20,000 mAh power bank", cat: "Mobile Accessories", emoji: "🔋", hue: "#D7E3F4", wholesale: 2100, map: 2890, suggested: 3490, courier: 180, weight: "0.48 kg", sla: "24h", stock: 95, supplier: "sup-05", dispatch: "Ships from Islamabad in 24h", rating: 4.7, returns: 1.9 },
    { id: "p10", name: "Silent wall clock 30cm", cat: "Home Decor & Bedding", emoji: "🕰️", hue: "#E8DCC8", wholesale: 730, map: 1090, suggested: 1490, courier: 165, weight: "0.6 kg", sla: "48h", stock: 210, supplier: "sup-04", dispatch: "Ships from Faisalabad in 48h", rating: 4.3, returns: 3.9 },
    { id: "p11", name: "Non-stick karahi 24cm", cat: "Home & Kitchen", emoji: "🍳", hue: "#F3C9B8", wholesale: 1180, map: 1690, suggested: 2190, courier: 200, weight: "1.1 kg", sla: "24h", stock: 70, supplier: "sup-01", dispatch: "Ships from Lahore in 24h", rating: 4.8, returns: 2.4, video: { duration: "0:24", source: "upload", sourceLabel: "Supplier upload", storeOk: true, adsOk: true, watermarkRequired: false, captionsEn: "Non-stick karahi, 24cm. Ships from Lahore in 24 hours.", captionsUr: "نان اسٹک کڑاہی، 24 سینٹی میٹر۔ لاہور سے 24 گھنٹے میں۔" } },
    { id: "p12", name: "Prayer mat — foam padded", cat: "Islamic Products & Gifts", emoji: "🕌", hue: "#CDE5D5", wholesale: 850, map: 1290, suggested: 1690, courier: 165, weight: "0.8 kg", sla: "24h", stock: 330, supplier: "sup-03", dispatch: "Ships from Sialkot in 24h", rating: 4.9, returns: 1.1, video: { duration: "0:18", source: "upload", sourceLabel: "Supplier upload", storeOk: true, adsOk: true, watermarkRequired: true, captionsEn: "Foam-padded prayer mat. Ships from Sialkot in 24 hours.", captionsUr: "فوم پیڈڈ جانماز۔ سیالکوٹ سے 24 گھنٹے میں روانہ۔" } },
  ],
  reseller: {
    name: "Ayesha Mart",
    owner: "Ayesha Khan",
    phone: "03xx-xxxxxxx",
    city: "Lahore",
    plan: "Pro",
    health: "Warning",
    score: 78,
    ordersToday: 46,
    deliveryRatio: 72,
    confirmationRate: 88,
    fakeOrderRate: 0.4,
    disputesLost: 0.6,
    complaints: 1.4,
    mapViolations: 1,
    wallet: { pending: 186400, available: 62450, held: 18000, heldReason: "MAP warning reserve — release 24 Nov 2026", negative: 0 },
    profitWeek: 38420,
    earnings: [18200, 21100, 19840, 24600, 22150, 26800, 31200, 27440, 30110, 33800, 29420, 38420],
    stores: [
      { name: "Ayesha Mart", platform: "Shopify", url: "ayeshamart.myshopify.com", status: "Connected" },
      { name: "Ayesha Woo", platform: "WooCommerce", url: "ayesha.store", status: "Connected" },
      { name: "Daraz shop", platform: "Daraz", url: "—", status: "Agency plan required" },
    ],
    devices: [
      { name: "Chrome on Windows · Lahore", last: "Today, 11:20 AM", current: true },
      { name: "Safari on iPhone · Lahore", last: "9 Nov 2026, 8:14 PM", current: false },
    ],
  },
  supplier: {
    name: "Lahore Home Goods",
    owner: "Imran Malik",
    city: "Lahore",
    ntn: "XXXXXXX-X",
    health: "Warning",
    score: 82,
    toPack: 14,
    onTime: 94,
    cancelRate: 1.8,
    defectRate: 0.9,
    returnsAttr: 3.2,
    response12h: 91,
    listingFails: 0,
    rating: 4.8,
    nextPayout: 214800,
    payoutDate: "Friday, 13 Nov 2026",
    openDisputes: 2,
    wallet: { pending: 412000, available: 214800, held: 25000, heldReason: "On-time dispatch below 96% — 14-day reserve", negative: 0 },
    dailyCap: 80,
    usedCap: 23,
  },
  ordersReseller: [
    { id: "TR-10482", product: "3-tier stainless tiffin", city: "Karachi", confirm: "WhatsApp confirmed", status: "In transit", courier: "PostEx", track: "PEX-883921", cod: 1855, sla: "—" },
    { id: "TR-10481", product: "Wireless earbuds TWS", city: "Islamabad", confirm: "Pending", status: "Awaiting confirmation", courier: "—", track: "—", cod: 2970, sla: "Confirm by 4:10 PM" },
    { id: "TR-10477", product: "Lawn hijab — sage set of 3", city: "Multan", confirm: "WhatsApp confirmed", status: "Delivered", courier: "Leopards", track: "LP-229184", cod: 1740, sla: "—" },
    { id: "TR-10470", product: "Warm-white fairy lights 10m", city: "Peshawar", confirm: "IVR confirmed", status: "RTO", courier: "Trax", track: "TX-441902", cod: 1140, sla: "Returned" },
    { id: "TR-10466", product: "20,000 mAh power bank", city: "Faisalabad", confirm: "WhatsApp confirmed", status: "Booked", courier: "TCS", track: "TCS-110284", cod: 3670, sla: "Handover today" },
    { id: "TR-10461", product: "Prayer mat — foam padded", city: "Hyderabad", confirm: "No answer ×2", status: "Confirmation retry", courier: "—", track: "—", cod: 1855, sla: "Retry 3:00 PM" },
    { id: "TR-10455", product: "Non-stick karahi 24cm", city: "Lahore", confirm: "WhatsApp confirmed", status: "Delivered", courier: "M&P", track: "MP-773201", cod: 2390, sla: "—" },
    { id: "TR-10448", product: "Ceramic dinner set 16 pcs", city: "Gujranwala", confirm: "WhatsApp confirmed", status: "In transit", courier: "PostEx", track: "PEX-883104", cod: 5770, sla: "—" },
  ],
  ordersSupplier: [
    { id: "TR-10482", sku: "TIF-3SS", product: "3-tier stainless tiffin", city: "Karachi", reseller: "Ayesha Mart", status: "Ready to pack", slaHours: 6, courier: "PostEx" },
    { id: "TR-10466", sku: "PB-20K", product: "20,000 mAh power bank", city: "Faisalabad", reseller: "Gulberg Gadgets", status: "Label printed", slaHours: 11, courier: "TCS" },
    { id: "TR-10490", sku: "KRH-24", product: "Non-stick karahi 24cm", city: "Rawalpindi", reseller: "Potters Lane", status: "Ready to pack", slaHours: 3, courier: "Leopards" },
    { id: "TR-10491", sku: "CLK-30", product: "Silent wall clock 30cm", city: "Sialkot", reseller: "Home Circle", status: "Ready to pack", slaHours: 18, courier: "Trax" },
    { id: "TR-10455", sku: "KRH-24", product: "Non-stick karahi 24cm", city: "Lahore", reseller: "Ayesha Mart", status: "Handed to courier", slaHours: 0, courier: "M&P" },
    { id: "TR-10440", sku: "DIN-16", product: "Ceramic dinner set 16 pcs", city: "Karachi", reseller: "Sea View Home", status: "Overdue", slaHours: -2, courier: "PostEx" },
  ],
  ledgerReseller: [
    { id: "TR-10477", date: "9 Nov", cod: 1740, courier: 150, supplier: 780, fee: 25, rto: 0, penalty: 0, margin: 785, state: "Available" },
    { id: "TR-10455", date: "8 Nov", cod: 2390, courier: 200, supplier: 1180, fee: 25, rto: 0, penalty: 0, margin: 985, state: "Available" },
    { id: "TR-10470", date: "8 Nov", cod: 0, courier: 150, supplier: 0, fee: 0, rto: 150, penalty: 0, margin: -150, state: "RTO deducted" },
    { id: "TR-10448", date: "10 Nov", cod: 5770, courier: 280, supplier: 3200, fee: 25, rto: 0, penalty: 0, margin: 2265, state: "Pending COD" },
    { id: "TR-10412", date: "2 Nov", cod: 1690, courier: 165, supplier: 890, fee: 25, rto: 0, penalty: 2000, margin: -390, state: "Held — MAP" },
  ],
  ledgerSupplier: [
    { id: "TR-10477", date: "9 Nov", wholesale: 780, courier: 0, fee: 0, penalty: 0, net: 780, state: "Available" },
    { id: "TR-10455", date: "8 Nov", wholesale: 1180, courier: 0, fee: 0, penalty: 0, net: 1180, state: "Available" },
    { id: "TR-10448", date: "10 Nov", wholesale: 3200, courier: 0, fee: 0, penalty: 0, net: 3200, state: "Pending COD" },
    { id: "TR-10440", date: "7 Nov", wholesale: 3200, courier: 0, fee: 0, penalty: 500, net: 2700, state: "Held — late dispatch" },
  ],
  payouts: [
    { id: "PO-8841", date: "6 Nov 2026", method: "Raast · HBL ****4412", amount: 51200, status: "Paid" },
    { id: "PO-8790", date: "30 Oct 2026", method: "JazzCash 0300****19", amount: 44800, status: "Paid" },
    { id: "PO-8712", date: "23 Oct 2026", method: "Bank transfer · HBL", amount: 39150, status: "Paid" },
  ],
  healthReseller: {
    status: "Warning",
    score: 78,
    metrics: [
      { key: "delivery", name: "Delivery ratio (RTO inverse)", value: "72%", target: "≥ 75%", window: "30 days", tone: "warn", accountable: "Reseller", trend: "−3 pts vs prior 30d", def: "Delivered orders ÷ booked orders after confirmation. Restrict if < 60%." },
      { key: "fake", name: "Fake-order rate", value: "0.4%", target: "< 1%", window: "30 days", tone: "ok", accountable: "Reseller", trend: "Stable", def: "Orders matching blacklist or failed-confirm fraud patterns." },
      { key: "confirm", name: "Customer confirmation rate", value: "88%", target: "≥ 85%", window: "30 days", tone: "ok", accountable: "Reseller + platform", trend: "+2 pts", def: "Share of booked orders confirmed on WhatsApp/IVR before pack." },
      { key: "disputes", name: "Disputes lost", value: "0.6%", target: "< 1%", window: "60 days", tone: "ok", accountable: "Reseller", trend: "Stable", def: "Claims granted against the reseller ÷ delivered orders." },
      { key: "complaints", name: "Customer complaint rate", value: "1.4%", target: "< 2%", window: "30 days", tone: "ok", accountable: "Shared", trend: "−0.2 pts", def: "Negative post-delivery WhatsApp survey responses." },
      { key: "map", name: "MAP violations", value: "1", target: "0", window: "30 days", tone: "warn", accountable: "Reseller", trend: "1 open warning", def: "Listing sold below supplier MAP. One warning, then listing block." },
      { key: "wallet", name: "Wallet balance", value: "Rs 62,450", target: "≥ 0", window: "Current", tone: "ok", accountable: "Reseller", trend: "No negative balance", def: "Order lock example: below Rs −500, uncured." },
    ],
    actions: [
      { title: "Delivery ratio below healthy target", detail: "72% vs ≥ 75% (30-day window). Improve confirmation quality and avoid shipping unconfirmed orders. A drop below 60% auto-restricts order volume." },
      { title: "MAP warning — Rs 18,000 reserve", detail: "Listing TR-SKU p1 was advertised at Rs 1,190 vs MAP Rs 1,290 on 2 Nov. Reserve releases 24 Nov 2026 if no repeat." },
    ],
    violations: [
      { date: "2 Nov 2026", policy: "MAP / pricing", detail: "Ayesha Mart Shopify: tiffin listed at Rs 1,190 (MAP Rs 1,290).", state: "Warning + reserve", evidence: "Price snapshot" },
      { date: "28 Oct 2026", policy: "Delivery ratio", detail: "Ratio dipped to 71% mid-window; recovered to 72%.", state: "Watching", evidence: "Order cohort" },
    ],
    history: [
      { date: "2 Nov 2026, 6:10 PM", text: "Status moved Healthy → Warning after MAP event. WhatsApp notice sent.", tone: "warn" },
      { date: "2 Nov 2026, 6:12 PM", text: "Payout reserve Rs 18,000 applied (release 24 Nov 2026).", tone: "warn" },
      { date: "12 Oct 2026", text: "Account opened at Healthy after KYC and first 20 delivered orders.", tone: "ok" },
    ],
  },
  healthSupplier: {
    status: "Warning",
    score: 82,
    metrics: [
      { key: "ontime", name: "On-time dispatch (24/48h SLA)", value: "94%", target: "≥ 96%", window: "30 days", tone: "warn", accountable: "Supplier", trend: "−2 pts", def: "Orders handed to courier within the listing SLA. Amazon late-shipment analog." },
      { key: "cancel", name: "Cancellation / stock-out after accept", value: "1.8%", target: "< 2.5%", window: "30 days", tone: "ok", accountable: "Supplier", trend: "Stable", def: "Cancels after the order is accepted, usually stock-outs." },
      { key: "defect", name: "Defect or wrong item", value: "0.9%", target: "< 1.5%", window: "60 days", tone: "ok", accountable: "Supplier", trend: "Stable", def: "Needs courier or unboxing evidence." },
      { key: "returns", name: "Supplier-attributable returns", value: "3.2%", target: "< 5%", window: "60 days", tone: "ok", accountable: "Supplier", trend: "+0.4 pts", def: "Returns for quality or mismatch, not customer RTO." },
      { key: "response", name: "Ticket response within 12 hours", value: "91%", target: "≥ 90%", window: "30 days", tone: "ok", accountable: "Supplier", trend: "+3 pts", def: "Walmart 48h analog, tightened to 12h." },
      { key: "listing", name: "Listing accuracy / MAP faults", value: "No open fails", target: "No open fails", window: "Current", tone: "ok", accountable: "Supplier", trend: "Clean", def: "Weight, photo, or MAP mismatches raised by catalog QA." },
      { key: "rating", name: "Verified reseller rating", value: "4.8 / 5", target: "Shown, not a hard gate", window: "90 days", tone: "ok", accountable: "Resellers (verified orders)", trend: "124 reviews", def: "Verified-order reviews only." },
    ],
    actions: [
      { title: "On-time dispatch below 96%", detail: "94% in the last 30 days. Two orders missed the 48h handover. A payout reserve of Rs 25,000 is held for 14 days. Submit a Plan of Action if you expect this to continue." },
      { title: "1 overdue pack ticket", detail: "TR-10440 ceramic dinner set — SLA breached by 2 hours. Print the label and hand over today to limit further penalty." },
    ],
    violations: [
      { date: "7 Nov 2026", policy: "Dispatch SLA", detail: "TR-10440 handed over 2h after 48h window (Faisalabad dinner set).", state: "Warning + reserve", evidence: "Courier scan" },
      { date: "29 Oct 2026", policy: "Dispatch SLA", detail: "TR-10211 clock missed 48h by 5 hours.", state: "Recorded", evidence: "Handover scan" },
    ],
    history: [
      { date: "7 Nov 2026, 9:40 PM", text: "Status moved Healthy → Warning. Rs 25,000 reserve, 14-day hold.", tone: "warn" },
      { date: "7 Nov 2026, 9:41 PM", text: "WhatsApp + email notice sent to Imran Malik.", tone: "warn" },
      { date: "18 Sep 2026", text: "Supplier verified after CNIC, NTN, bank, and warehouse photos.", tone: "ok" },
    ],
  },
  exceptions: [
    { id: "EX-201", type: "Flagged KYC", party: "Multan Fabric House (supplier)", reason: "CNIC OCR name mismatch vs NTN record", age: "2h", priority: "High" },
    { id: "EX-198", type: "Dispute", party: "Order TR-10390 · buyer in Peshawar", reason: "Wrong item claimed — awaiting unboxing video", age: "6h", priority: "Medium" },
    { id: "EX-194", type: "Plan of Action appeal", party: "Ayesha Mart (reseller)", reason: "MAP warning appeal submitted", age: "1d", priority: "Medium" },
    { id: "EX-188", type: "Recon exception", party: "PostEx settlement 8 Nov", reason: "3 COD amounts off by Rs 150–200", age: "2d", priority: "Low" },
    { id: "EX-181", type: "Flagged KYC", party: "Quetta Outdoor Co. (supplier)", reason: "Warehouse photo flagged as stock image", age: "3d", priority: "High" },
  ],
  listings: [
    { sku: "TIF-3SS", name: "3-tier stainless tiffin", cat: "Home & Kitchen", map: 1290, wholesale: 890, stock: 420, cap: 40, used: 9, status: "Live", video: { duration: "0:28", source: "upload", sourceLabel: "Supplier upload", storeOk: true, adsOk: true, watermarkRequired: false, socialLink: "" } },
    { sku: "DIN-16", name: "Ceramic dinner set 16 pcs", cat: "Home & Kitchen", map: 4490, wholesale: 3200, stock: 44, cap: 10, used: 3, status: "Live", video: null },
    { sku: "KRH-24", name: "Non-stick karahi 24cm", cat: "Home & Kitchen", map: 1690, wholesale: 1180, stock: 70, cap: 20, used: 6, status: "Live", video: { duration: "0:24", source: "instagram", sourceLabel: "Instagram post (platform copy)", storeOk: true, adsOk: true, watermarkRequired: false, socialLink: "https://www.instagram.com/reel/demo-karahi/" } },
    { sku: "CLK-30", name: "Silent wall clock 30cm", cat: "Home Decor & Bedding", map: 1090, wholesale: 730, stock: 0, cap: 15, used: 0, status: "Out of stock", video: null },
  ],
};

window.DEMO.hasVideo = function (p) {
  return !!(p && p.video);
};
window.DEMO.supplierOf = function (id) {
  return this.suppliers.find(function (s) { return s.id === id; }) || {};
};
window.DEMO.productById = function (id) {
  return this.products.find(function (p) { return p.id === id; }) || this.products[0];
};
window.DEMO.door = function (p, sell) {
  var price = sell == null ? p.suggested : Number(sell);
  var door = price + p.courier;
  var profit = price - p.wholesale - 25;
  return { sell: price, door: door, profit: profit, fee: 25 };
};
window.DEMO.pkr = function (n) {
  var v = Math.round(Number(n) || 0);
  var sign = v < 0 ? "-" : "";
  return sign + "Rs " + Math.abs(v).toLocaleString("en-PK");
};
