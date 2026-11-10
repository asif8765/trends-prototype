/* AI Listing Builder — simulated. No real AI calls; demo output only. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var mode = "single";
  var media = []; // {url, type, name, demo}

  function bottleSvg(body, bg, clutter) {
    var extra = clutter
      ? '<rect x="0" y="70" width="100" height="30" fill="#b9a98f"/><circle cx="14" cy="22" r="10" fill="#d8cfc0"/><rect x="72" y="12" width="20" height="30" rx="3" fill="#cfc5b3"/>'
      : '<ellipse cx="50" cy="92" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="' + bg + '"/>' + extra +
      '<rect x="40" y="10" width="20" height="10" rx="3" fill="#2b2b2b"/><rect x="43" y="6" width="14" height="6" rx="2" fill="#444"/>' +
      '<rect x="35" y="19" width="30" height="72" rx="10" fill="' + body + '"/>' +
      '<rect x="39" y="24" width="5" height="60" rx="2.5" fill="rgba(255,255,255,.45)"/>' +
      '<rect x="35" y="44" width="30" height="8" fill="rgba(0,0,0,.08)"/></svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }
  var DEMO_MEDIA = [
    { body: "#1f2a2e", type: "image", name: "bottle-black.jpg" },
    { body: "#c9ced1", type: "image", name: "bottle-steel.jpg" },
    { body: "#7fb6d9", type: "image", name: "bottle-blue.jpg" },
    { body: "#e9a6b8", type: "image", name: "bottle-pink.jpg" },
    { body: "#c9ced1", type: "video", name: "unboxing.mp4" },
  ];

  var AI = {
    title: "Insulated Stainless Steel Water Bottle 1L — Leak-Proof, Cold 24h / Hot 12h",
    titleUr: "اسٹین لیس اسٹیل انسولیٹڈ واٹر بوتل، 1 لیٹر — 24 گھنٹے ٹھنڈا، 12 گھنٹے گرم",
    bullets: [
      "Keeps water cold for 24 hours and tea hot for 12 hours",
      "Double-wall stainless steel, BPA free — no sweating on the outside",
      "Leak-proof screw lid with carry handle",
      "1 litre — right size for school, office, gym and travel",
      "Available in 4 colours: Black, Steel, Sky Blue, Pink",
    ],
    desc: "A strong double-wall stainless steel bottle that keeps water cold all day in Pakistani summers and keeps tea hot on winter trips. The leak-proof lid and handle make it easy to carry in a school bag or car. Wipe clean; hand wash recommended.",
    descUr: "یہ مضبوط اسٹین لیس اسٹیل بوتل گرمیوں میں پانی کو پورا دن ٹھنڈا اور سردیوں میں چائے کو گرم رکھتی ہے۔ لیک پروف ڈھکن اور ہینڈل کی وجہ سے اسکول بیگ یا گاڑی میں رکھنا آسان ہے۔ چار رنگوں میں دستیاب۔",
    category: "Home & Kitchen › Drinkware › Water bottles",
    categories: ["Home & Kitchen › Drinkware › Water bottles", "Sports & Fitness › Bottles & shakers", "Kids › School supplies › Lunch & bottles"],
    material: "Stainless steel (double wall)",
    colours: ["Black", "Steel", "Sky Blue", "Pink"],
    sizes: ["1 L"],
    resale: 1490, map: 1290, weight: 0.55, dims: "9 × 9 × 30",
    tags: ["steel water bottle", "insulated bottle", "thermos bottle", "school water bottle", "gym bottle", "pani ki bottle", "1 litre bottle", "leak proof bottle", "garam thanda bottle"],
    capEn: "Ice-cold water for 24 hours, even in June 🧊 Leak-proof steel bottle in 4 colours. Cash on delivery all over Pakistan.",
    capRoman: "Garmi mein bhi 24 ghante thanda pani! 🧊 Leak-proof steel bottle, 4 rang. Poore Pakistan mein cash on delivery.",
    capUr: "گرمی میں بھی 24 گھنٹے ٹھنڈا پانی! لیک پروف اسٹیل بوتل، 4 رنگ۔ پورے پاکستان میں کیش آن ڈیلیوری۔",
    policy: [
      { kind: "fix", text: "Removed the brand word “Milton” seen on the box. Brand names need brand permission on " + (window.BRAND ? BRAND.name : "Trends") + "." },
      { kind: "ask", text: "“BPA free” needs proof (lab report). Keep it only if you can upload the report; otherwise we show “food-grade steel”." },
      { kind: "ok", text: "No prohibited or restricted item detected." },
      { kind: "ok", text: "No phone numbers, shop names or watermarks found in photos." },
    ],
  };

  var TASKS_SINGLE = [
    ["Looking at your photos — detecting the product", "Found: insulated steel water bottle"],
    ["Removing backgrounds and fixing light", "4 photos cleaned"],
    ["Writing the title and key points", "English done"],
    ["Writing the description in English and Urdu", "Urdu done"],
    ["Choosing the category", "Home & Kitchen › Drinkware"],
    ["Finding colours, sizes and material", "4 colours · 1 size"],
    ["Adding search tags", "9 tags"],
    ["Checking prices of similar items", "37 matches · Rs 820–950 wholesale"],
    ["Suggesting resale price and minimum price (MAP)", "Resale Rs 1,490 · MAP Rs 1,290"],
    ["Estimating weight and box size for the courier", "~0.55 kg"],
    ["Writing ad captions", "English, Roman Urdu, Urdu"],
    ["Cutting the video for ads (9:16 and 1:1)", "3 cuts · 15–28 sec"],
    ["Policy check: brand names and prohibited items", "1 fixed · 1 to confirm", true],
  ];
  var TASKS_BULK = [
    ["Reading 24 files", "22 photos · 2 videos"],
    ["Grouping photos into products", "8 products found"],
    ["Removing backgrounds and fixing light", "22 photos cleaned"],
    ["Writing titles and descriptions in English and Urdu", "8 of 8"],
    ["Choosing categories and variants", "8 of 8"],
    ["Checking prices of similar items", "Ranges for 8 items"],
    ["Estimating weight and box size", "8 of 8"],
    ["Writing ad captions and cutting videos", "8 caption sets · 2 videos"],
    ["Policy check", "2 items need your attention", true],
  ];
  var BULK = [
    { e: "🧴", t: "Insulated Steel Water Bottle 1L", c: "Drinkware", r: "Rs 820–950", conf: "hi", st: "ready" },
    { e: "🍳", t: "Non-stick Frying Pan 26cm with Glass Lid", c: "Cookware", r: "Rs 1,350–1,600", conf: "hi", st: "ready" },
    { e: "🥣", t: "Melamine Bowl Set — 6 pcs", c: "Dinnerware", r: "Rs 640–760", conf: "md", st: "ready" },
    { e: "🔪", t: "Stainless Kitchen Knife Set — 5 pcs with Stand", c: "Kitchen tools", r: "Rs 980–1,150", conf: "md", st: "flag", flag: "Knives: age-check label needed" },
    { e: "🧺", t: "Foldable Laundry Basket — Large", c: "Home storage", r: "Rs 520–640", conf: "hi", st: "ready" },
    { e: "☕", t: "Ceramic Mug Set — 4 pcs", c: "Drinkware", r: "Rs 700–820", conf: "md", st: "ready" },
    { e: "🕯️", t: "Scented Candle Jar Set", c: "Home décor", r: "Rs 450–590", conf: "lo", st: "flag", flag: "Brand name “Bath & Body” in photo — remove" },
    { e: "🧽", t: "Kitchen Sponge & Scrubber Pack — 12 pcs", c: "Cleaning", r: "Rs 210–280", conf: "hi", st: "ready" },
  ];

  // ---------- helpers ----------
  function setStep(n) {
    document.querySelectorAll("#stepper .st").forEach(function (el) {
      var k = Number(el.getAttribute("data-st"));
      el.classList.toggle("on", k === n);
      el.classList.toggle("done", k < n);
    });
    ["step1-single", "step1-bulk", "step2", "step3-single", "step3-bulk"].forEach(function (id) { $(id).classList.add("hidden"); });
    if (n === 1) $(mode === "bulk" ? "step1-bulk" : "step1-single").classList.remove("hidden");
    if (n === 2) $("step2").classList.remove("hidden");
    if (n === 3) $(mode === "bulk" ? "step3-bulk" : "step3-single").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  function setMode(m) {
    mode = m;
    document.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-mode") === m); });
    setStep(1);
  }

  function renderThumbs() {
    $("media-count").textContent = media.length;
    $("thumbs").innerHTML = media.map(function (m, i) {
      var inner = m.type === "video"
        ? (m.demo ? '<img src="' + m.url + '" alt="">' : '<video src="' + m.url + '" muted playsinline></video>')
        : '<img src="' + m.url + '" alt="">';
      return '<div class="thumb">' + inner + '<span class="tag">' + (m.type === "video" ? "▶ Video" : "Photo") + '</span><button type="button" class="x" data-rm="' + i + '" aria-label="Remove">✕</button></div>';
    }).join("");
  }
  function addFiles(list) {
    Array.prototype.forEach.call(list || [], function (f) {
      if (media.length >= 12) return;
      var type = /^video/.test(f.type) ? "video" : "image";
      if (!/^(image|video)/.test(f.type)) return;
      media.push({ url: URL.createObjectURL(f), type: type, name: f.name });
    });
    renderThumbs();
  }
  function useDemo() {
    media = DEMO_MEDIA.map(function (d) { return { url: bottleSvg(d.body, "#e9e2d6", true), type: d.type, name: d.name, demo: true, body: d.body }; });
    if (!$("notes").value) $("notes").value = "steel ki bottle 1 litre, 4 colour, thanda 24 ghante garam 12 ghante";
    renderThumbs();
  }

  function runTasks(tasks, done) {
    var i = 0, fast = false;
    $("tasks").innerHTML = tasks.map(function (t, k) {
      return '<div class="ai-task wait" id="tk' + k + '"><span class="s"></span><div class="flex-1"><div>' + t[0] + '</div><div class="text-xs text-muted hidden" id="tkr' + k + '">' + t[1] + "</div></div></div>";
    }).join("");
    $("skip").onclick = function () { fast = true; };
    function tick() {
      if (i > 0) {
        var prev = $("tk" + (i - 1));
        prev.className = "ai-task " + (tasks[i - 1][2] ? "flag" : "ok");
        prev.querySelector(".s").textContent = tasks[i - 1][2] ? "!" : "✓";
        $("tkr" + (i - 1)).classList.remove("hidden");
      }
      var pct = Math.round((i / tasks.length) * 100);
      $("pct").textContent = pct + "%";
      $("bar").style.width = pct + "%";
      if (i >= tasks.length) { setTimeout(done, fast ? 50 : 500); return; }
      $("tk" + i).className = "ai-task run";
      i++;
      setTimeout(tick, fast ? 30 : 380 + Math.random() * 260);
    }
    tick();
  }

  // ---------- review (single) ----------
  function fillReview() {
    $("r-title").value = AI.title;
    $("r-title-ur").value = AI.titleUr;
    $("r-bullets").value = AI.bullets.join("\n");
    $("r-desc").value = AI.desc;
    $("r-desc-ur").value = AI.descUr;
    $("r-cat").innerHTML = AI.categories.map(function (c) { return "<option" + (c === AI.category ? " selected" : "") + ">" + c + "</option>"; }).join("");
    $("r-material").value = AI.material;
    $("r-resale").value = AI.resale;
    $("r-map").value = AI.map;
    $("r-weight").value = AI.weight;
    $("r-dims").value = AI.dims;
    $("r-cap-en").value = AI.capEn;
    $("r-cap-roman").value = AI.capRoman;
    $("r-cap-ur").value = AI.capUr;
    $("r-city").innerHTML = DEMO.cities.map(function (c) { return "<option" + (c === DEMO.supplier.city ? " selected" : "") + ">" + c + "</option>"; }).join("");
    renderChips("r-colours", AI.colours, "+ Add colour");
    renderChips("r-sizes", AI.sizes, "+ Add size");
    renderChips("r-tags", AI.tags, "+ Add tag");
    renderPhotos(false);
    var srcBody = (media.find(function (m) { return m.type === "image" && m.body; }) || { body: "#c9ced1" }).body;
    $("r-cuts").innerHTML = [["9:16", "ratio-916", "0:15", "Reels / TikTok"], ["1:1", "ratio-11", "0:15", "Feed"], ["16:9", "", "0:28", "YouTube"]].map(function (c) {
      return '<div class="text-center"><div class="thumb" style="height:96px;aspect-ratio:' + (c[0] === "9:16" ? "9/16" : c[0] === "1:1" ? "1/1" : "16/9") + '"><img src="' + bottleSvg(srcBody, "#F6F3EE") + '" alt=""><span class="tag">▶ ' + c[2] + '</span></div><div class="text-xs font-bold mt-1">' + c[0] + '</div><div class="text-[11px] text-muted">' + c[3] + "</div></div>";
    }).join("");
    $("r-policy").innerHTML = AI.policy.map(function (p, i) {
      var icon = p.kind === "ok" ? "✓" : p.kind === "fix" ? "✎" : "!";
      var cls = p.kind === "ok" ? "ok" : "flag";
      var extra = p.kind === "ask" ? '<div class="flex gap-2 mt-2"><button type="button" class="btn-ghost btn-sm" data-pol="keep">Upload report</button><button type="button" class="btn-ghost btn-sm" data-pol="drop">Use “food-grade steel”</button></div>' : "";
      return '<div class="ai-task ' + cls + '"><span class="s">' + icon + '</span><div class="flex-1 text-sm">' + p.text + extra + "</div></div>";
    }).join("");
    updateMargin();
  }
  function renderPhotos(orig) {
    var imgs = media.filter(function (m) { return m.type === "image"; });
    $("r-photos").innerHTML = imgs.map(function (m, i) {
      var src = m.demo ? bottleSvg(m.body, orig ? "#e9e2d6" : "#ffffff", orig) : m.url;
      var style = (!m.demo && !orig) ? ' style="background:#fff"' : "";
      return '<div class="thumb"' + style + '><img src="' + src + '" alt=""><span class="tag">' + (orig ? "Original" : (i === 0 ? "Main · BG removed" : "Enhanced")) + "</span></div>";
    }).join("") || '<p class="text-sm text-muted">No photos.</p>';
  }
  function renderChips(id, arr, addLabel) {
    $(id).innerHTML = arr.map(function (c, i) { return '<span class="chip">' + c + ' <button type="button" data-chip="' + id + '" data-i="' + i + '" aria-label="Remove">✕</button></span>'; }).join("") +
      '<button type="button" class="chip" style="border-style:dashed" data-add="' + id + '">' + addLabel + "</button>";
  }
  function chipArr(id) { return id === "r-colours" ? AI.colours : id === "r-sizes" ? AI.sizes : AI.tags; }
  function updateMargin() {
    var w = Number($("r-wholesale").value), map = Number($("r-map").value), rs = Number($("r-resale").value);
    var el = $("r-margin");
    if (w > 0 && rs > 0) {
      var profit = rs - w - DEMO.perOrderFee;
      el.innerHTML = "Reseller profit at suggested price: <strong>" + DEMO.pkr(profit) + "</strong> per delivered order" + (map && w >= map ? ' · <span class="metric-bad">MAP must be higher than wholesale</span>' : "") + ". Based on 37 similar items (demo).";
    } else {
      el.textContent = "Based on 37 similar items sold on Pakistani stores in the last 60 days (demo). Enter wholesale to see reseller profit.";
    }
  }

  // ---------- review (bulk) ----------
  function renderBulk() {
    $("bulk-n").textContent = BULK.length;
    $("bulk-list").innerHTML = BULK.map(function (b, i) {
      var confTxt = b.conf === "hi" ? "High" : b.conf === "md" ? "Check" : "Please confirm";
      var status = b.st === "flag" ? '<span class="badge badge-warning">Needs attention</span>' : '<span class="badge badge-neutral">Add price &amp; stock</span>';
      return '<div class="card p-4"><div class="flex gap-3 items-start">' +
        '<input type="checkbox" class="mt-1" style="width:auto" data-bk="' + i + '" ' + (b.st === "flag" ? "disabled" : "") + ' />' +
        '<div class="thumb shrink-0" style="width:64px;height:64px;font-size:1.8rem;background:#fff;border:1px solid var(--color-line)">' + b.e + "</div>" +
        '<div class="flex-1 min-w-0"><div class="font-semibold leading-tight">' + b.t + '</div><div class="text-xs text-muted mt-1">' + b.c + " · AI price range " + b.r + '</div><div class="flex flex-wrap gap-1 mt-1"><span class="conf ' + b.conf + '">' + confTxt + "</span> " + status + "</div>" +
        (b.flag ? '<div class="text-xs metric-warn mt-1">⚠ ' + b.flag + "</div>" : "") + "</div></div>" +
        '<div class="grid grid-cols-2 gap-2 mt-3"><input type="number" inputmode="numeric" placeholder="Wholesale Rs" data-bw="' + i + '" /><input type="number" inputmode="numeric" placeholder="Stock" data-bs="' + i + '" /></div>' +
        '<button type="button" class="btn-ghost btn-sm mt-2" data-review="' + i + '">Review all details</button></div>';
    }).join("");
  }

  // ---------- events ----------
  document.querySelectorAll("[data-mode]").forEach(function (b) { b.addEventListener("click", function () { setMode(b.getAttribute("data-mode")); }); });
  ["media", "cam-photo", "cam-video"].forEach(function (id) { $(id).addEventListener("change", function () { addFiles(this.files); this.value = ""; }); });
  var drop = $("drop");
  ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); }); });
  ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); }); });
  drop.addEventListener("drop", function (e) { addFiles(e.dataTransfer && e.dataTransfer.files); });
  $("thumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-rm]"); if (!b) return;
    e.preventDefault(); media.splice(Number(b.getAttribute("data-rm")), 1); renderThumbs();
  });
  $("use-demo").addEventListener("click", useDemo);
  $("mic").addEventListener("click", function () {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var status = $("mic-status");
    if (SR) {
      try {
        var rec = new SR(); rec.lang = "ur-PK"; rec.interimResults = false;
        rec.onresult = function (ev) { $("notes").value = ($("notes").value + " " + ev.results[0][0].transcript).trim(); status.textContent = "Got it. You can edit the text."; };
        rec.onerror = function () { demoVoice(); };
        rec.start(); status.textContent = "Listening… speak now (Urdu or English).";
        return;
      } catch (err) { /* fall through */ }
    }
    demoVoice();
    function demoVoice() {
      status.textContent = "Listening… (demo)";
      setTimeout(function () { $("notes").value = "steel ki bottle 1 litre, 4 colour, thanda 24 ghante garam 12 ghante"; status.textContent = "Demo voice note added. You can edit the text."; }, 900);
    }
  });
  $("build").addEventListener("click", function () {
    if (!media.length) { toast("Add at least one photo or video — or tap “Use demo photos”."); return; }
    if (!media.some(function (m) { return m.demo; })) {
      // Real uploads: keep their photos, demo text output.
      toast("Demo: your photos are used; the text below is sample AI output.");
    }
    setStep(2);
    runTasks(TASKS_SINGLE, function () { fillReview(); setStep(3); });
  });
  var bulkReady = false;
  function bulkPicked(label) { bulkReady = true; $("bulk-status").innerHTML = "✓ " + label + " — ready for AI."; }
  ["bulk-photos", "bulk-folder", "bulk-csv"].forEach(function (id) {
    $(id).addEventListener("change", function () { if (this.files && this.files.length) bulkPicked(this.files.length + " file(s) selected (demo — not uploaded)"); });
  });
  $("bulk-status").addEventListener("click", function (e) { if (e.target.id === "bulk-demo") bulkPicked("Demo catalog: 24 photos"); });
  $("wa-cat").addEventListener("input", function () { if (this.value.length > 10) bulkPicked("WhatsApp catalog link added"); });
  $("csv-template").addEventListener("click", function () {
    var csv = "product_name,wholesale_pkr,stock,dispatch_city,photo_links,notes\nSteel water bottle 1L,880,200,Lahore,https://example.com/photo1.jpg,4 colours\n";
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "listings-template.csv"; document.body.appendChild(a); a.click(); a.remove();
  });
  $("build-bulk").addEventListener("click", function () {
    if (!bulkReady) { toast("Upload photos, a file or a catalog link — or tap “Use demo catalog”."); return; }
    setStep(2);
    runTasks(TASKS_BULK, function () { renderBulk(); setStep(3); });
  });

  document.addEventListener("click", function (e) {
    var rmChip = e.target.closest("[data-chip]");
    if (rmChip) { var id = rmChip.getAttribute("data-chip"); chipArr(id).splice(Number(rmChip.getAttribute("data-i")), 1); renderChips(id, chipArr(id), $(id).lastChild.textContent); return; }
    var add = e.target.closest("[data-add]");
    if (add) { var aid = add.getAttribute("data-add"); var v = prompt("Add:"); if (v) { chipArr(aid).push(v.trim()); renderChips(aid, chipArr(aid), add.textContent); } return; }
    var pol = e.target.closest("[data-pol]");
    if (pol) {
      if (pol.getAttribute("data-pol") === "drop") {
        $("r-bullets").value = $("r-bullets").value.replace(/BPA[- ]free/gi, "food-grade steel");
        toast("Done — we'll say “food-grade steel”.");
      } else toast("Upload the lab report in the live app (demo).");
      pol.parentNode.innerHTML = '<span class="text-xs metric-ok font-semibold">✓ Resolved</span>';
      return;
    }
    var rv = e.target.closest("[data-review]");
    if (rv) { mode = "single"; useDemo(); document.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-mode") === "single"); }); fillReview(); setStep(3); }
  });
  $("show-orig").addEventListener("change", function () { renderPhotos(this.checked); });
  ["r-wholesale", "r-resale", "r-map"].forEach(function (id) { $(id).addEventListener("input", updateMargin); });

  function done(title, text) {
    $("done-title").textContent = title; $("done-text").textContent = text; openModal("done-modal");
  }
  $("publish").addEventListener("click", function () {
    var missing = [];
    var w = Number($("r-wholesale").value), st = $("r-stock").value;
    if (!(w > 0)) missing.push("wholesale price");
    if (st === "" || Number(st) < 0) missing.push("stock");
    if (!$("r-city").value) missing.push("dispatch city");
    if (missing.length) {
      toast("Please add your " + missing.join(", ") + " first.");
      (w > 0 ? (st === "" ? $("r-stock") : $("r-city")) : $("r-wholesale")).focus();
      return;
    }
    if (Number($("r-map").value) <= w) { toast("Minimum resale price (MAP) must be higher than your wholesale price."); $("r-map").focus(); return; }
    done("Published (demo)", "After a quick automatic check (about 15 minutes in the live app), resellers can import it with photos, video cuts and captions.");
  });
  $("save-draft").addEventListener("click", function () { toast("Saved as draft (demo). Finish it any time from My products."); });
  $("bulk-all").addEventListener("change", function () { var on = this.checked; document.querySelectorAll("[data-bk]:not(:disabled)").forEach(function (c) { c.checked = on; }); });
  $("bulk-draft").addEventListener("click", function () { done("Saved " + BULK.length + " drafts (demo)", "Finish price and stock for each draft any time from My products."); });
  $("bulk-publish").addEventListener("click", function () {
    var sel = Array.prototype.filter.call(document.querySelectorAll("[data-bk]"), function (c) { return c.checked; });
    if (!sel.length) { toast("Select the listings you want to publish."); return; }
    var bad = sel.filter(function (c) { var i = c.getAttribute("data-bk"); return !(Number(document.querySelector('[data-bw="' + i + '"]').value) > 0) || document.querySelector('[data-bs="' + i + '"]').value === ""; });
    if (bad.length) { toast(bad.length + " selected listing(s) still need wholesale price and stock."); return; }
    done("Published " + sel.length + (sel.length === 1 ? " listing" : " listings") + " (demo)", "Each one goes through the same quick automatic check before resellers can import it.");
  });

  // Deep links for demos/screenshots: #demo, #review, #bulk, #bulk-review
  var h = location.hash;
  if (h === "#demo") useDemo();
  if (h === "#review") { useDemo(); fillReview(); setStep(3); }
  if (h === "#bulk") setMode("bulk");
  if (h === "#bulk-review") { mode = "bulk"; document.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-mode") === "bulk"); }); renderBulk(); setStep(3); }
})();
