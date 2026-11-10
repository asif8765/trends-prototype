/* Early-access application + waitlist. Static-site friendly. */
(function () {
  var C = window.APPLY_CONFIG || { FORM_ENDPOINT: "", spots: { supplier: 80, reseller: 120 }, demoTaken: { supplier: 57, reseller: 96 } };
  var $ = function (id) { return document.getElementById(id); };
  var LS = "trends-applications";
  var params = new URLSearchParams(location.search);
  var forceFull = params.get("full") === "1";
  var refBy = (params.get("ref") || "").replace(/[^A-Z0-9-]/gi, "").slice(0, 16);
  var track = params.get("track") === "reseller" ? "reseller" : "supplier";
  var live = null; // live counts from endpoint

  var CATS = ["Home & kitchen", "Women's fashion", "Men's fashion", "Kids & toys", "Beauty & personal care", "Electronics & gadgets", "Mobile accessories", "Health & fitness", "Shoes & bags", "Jewellery & watches", "Home décor", "Other"];
  var COURIERS = ["PostEx", "Trax", "Leopards", "TCS", "M&P", "Call Courier", "BlueEx", "Rider", "Own delivery / other"];
  var CITIES = (window.DEMO && DEMO.cities ? DEMO.cities : []).concat(["Other"]);

  var SCHEMA = {
    supplier: [
      { n: "businessName", l: "Business name", ur: "کاروبار کا نام", t: "text", req: true },
      { n: "contactName", l: "Your name", ur: "آپ کا نام", t: "text", req: true },
      { n: "whatsapp", l: "WhatsApp number", ur: "واٹس ایپ نمبر", t: "tel", req: true, ph: "03XX XXXXXXX" },
      { n: "city", l: "City", ur: "شہر", t: "select", opts: CITIES, req: true },
      { n: "categories", l: "What do you sell?", ur: "آپ کیا بیچتے ہیں؟", t: "multi", opts: CATS, req: true },
      { n: "skus", l: "How many products (SKUs)?", ur: "کتنی پروڈکٹس", t: "radio", opts: ["1–20", "21–100", "101–500", "500+"], req: true },
      { n: "monthlyOrders", l: "Orders per month (all channels)", ur: "ماہانہ آرڈر", t: "radio", opts: ["Under 300", "300–1,000", "1,000–5,000", "5,000+"], req: true },
      { n: "couriers", l: "Courier(s) you use now", ur: "کوریئر", t: "multi", opts: COURIERS },
      { n: "sellsOn", l: "Where do you sell online now?", ur: "آن لائن کہاں بیچتے ہیں؟", t: "multi", opts: ["Own website", "Daraz", "Facebook", "Instagram", "TikTok", "WhatsApp only", "Not online yet"] },
      { n: "hasVideos", l: "Do you have product videos?", ur: "پروڈکٹ ویڈیوز ہیں؟", t: "radio", opts: ["Yes", "No"], req: true },
      { n: "dispatch48h", l: "Can you dispatch within 24–48 hours?", ur: "24–48 گھنٹے میں ڈسپیچ؟", t: "radio", opts: ["Yes", "Sometimes", "No"], req: true },
    ],
    reseller: [
      { n: "contactName", l: "Your name", ur: "آپ کا نام", t: "text", req: true },
      { n: "whatsapp", l: "WhatsApp number", ur: "واٹس ایپ نمبر", t: "tel", req: true, ph: "03XX XXXXXXX" },
      { n: "city", l: "City", ur: "شہر", t: "select", opts: CITIES, req: true },
      { n: "storeType", l: "Your store", ur: "آپ کا اسٹور", t: "multi", opts: ["Shopify", "WooCommerce", "Facebook page", "Instagram", "TikTok", "None yet"], req: true },
      { n: "monthlyOrders", l: "Orders per month", ur: "ماہانہ آرڈر", t: "radio", opts: ["Just starting", "Under 100", "100–500", "500–2,000", "2,000+"], req: true },
      { n: "categories", l: "Categories you want to sell", ur: "کون سی پروڈکٹس بیچنا چاہتے ہیں", t: "multi", opts: CATS, req: true },
      { n: "deliveryRatio", l: "Your current delivery ratio (COD delivered %)", ur: "ڈیلیوری ریشو", t: "radio", opts: ["Not sure / new", "Below 60%", "60–75%", "75–85%", "Above 85%"], req: true },
      { n: "wouldPay", l: "Which monthly plan would you pay for?", ur: "ماہانہ کتنا ادا کریں گے؟", t: "radio", opts: ["Rs 2,999 (Basic)", "Rs 7,999 (Pro)", "Rs 19,999 (Agency)", "Not yet"], req: true },
    ],
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function local() { try { return JSON.parse(localStorage.getItem(LS) || "[]"); } catch (e) { return []; } }
  function taken(t) {
    if (forceFull) return C.spots[t];
    if (live && typeof live[t] === "number") return live[t];
    return Math.min(C.spots[t], C.demoTaken[t] + local().filter(function (a) { return a.track === t && a.status === "founding"; }).length);
  }
  function waitlistCount(t) {
    if (live && live.waitlist && typeof live.waitlist[t] === "number") return live.waitlist[t];
    return (forceFull ? 143 : 0) + local().filter(function (a) { return a.track === t && a.status === "waitlist"; }).length;
  }

  function renderCounters() {
    $("counters").innerHTML = ["supplier", "reseller"].map(function (t) {
      var total = C.spots[t], used = taken(t), left = Math.max(0, total - used);
      var pct = Math.round((used / total) * 100);
      var label = t === "supplier" ? "Supplier spots" : "Store owner spots";
      return '<div class="card p-4"><div class="flex justify-between items-baseline"><span class="font-semibold">' + label + '</span><span class="text-sm text-muted">' + total + ' total</span></div>' +
        '<div class="font-display text-4xl mt-1 ' + (left ? "" : "metric-bad") + '">' + (left ? left + ' <span class="text-base text-muted font-sans">left</span>' : "Full — waitlist open") + "</div>" +
        '<div class="progress gold mt-2"><span style="width:' + pct + '%"></span></div></div>';
    }).join("");
  }

  function fieldHtml(f) {
    var lab = '<div class="field-row"><label class="field" for="f-' + f.n + '" style="margin:0">' + f.l + (f.req ? ' <span class="metric-bad">*</span>' : "") + '</label><span class="ur-hint">' + f.ur + "</span></div>";
    if (f.t === "text" || f.t === "tel") {
      return "<div>" + lab + '<input id="f-' + f.n + '" name="' + f.n + '" type="' + f.t + '" ' + (f.t === "tel" ? 'inputmode="tel" autocomplete="tel"' : "") + ' placeholder="' + (f.ph || "") + '" ' + (f.req ? "required" : "") + " /></div>";
    }
    if (f.t === "select") {
      return "<div>" + lab + '<select id="f-' + f.n + '" name="' + f.n + '" ' + (f.req ? "required" : "") + '><option value="">Choose…</option>' + f.opts.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select></div>";
    }
    var type = f.t === "multi" ? "checkbox" : "radio";
    return '<fieldset data-group="' + f.n + '" ' + (f.req ? 'data-req="1"' : "") + ">" + lab + '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">' +
      f.opts.map(function (o) { return '<label class="choice"><input type="' + type + '" name="' + f.n + '" value="' + esc(o) + '" />' + esc(o) + "</label>"; }).join("") + "</div></fieldset>";
  }

  function setTrack(t) {
    track = t;
    document.querySelectorAll("[data-track]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-track") === t); });
    $("fields").innerHTML = '<div class="space-y-4">' + SCHEMA[t].map(fieldHtml).join("") + "</div>";
    var full = taken(t) >= C.spots[t];
    $("submit-btn").textContent = full ? "Join the waitlist" : "Submit application";
  }

  function collect() {
    var data = { track: track, referredBy: refBy, submittedAt: new Date().toISOString(), page: location.href.split("?")[0] };
    var errors = [];
    SCHEMA[track].forEach(function (f) {
      if (f.t === "multi" || f.t === "radio") {
        var vals = Array.prototype.map.call(document.querySelectorAll('[name="' + f.n + '"]:checked'), function (i) { return i.value; });
        data[f.n] = vals.join(", ");
        if (f.req && !vals.length) errors.push(f.l);
      } else {
        var v = (document.querySelector('[name="' + f.n + '"]').value || "").trim();
        data[f.n] = v;
        if (f.req && !v) errors.push(f.l);
      }
    });
    if (data.whatsapp && !/^(\+?92|0)3\d{2}[\s-]?\d{7}$/.test(data.whatsapp.replace(/\s+/g, ""))) errors.push("WhatsApp number (format 03XX XXXXXXX)");
    if (!document.querySelector('[name="consent"]').checked) errors.push("consent checkbox");
    return { data: data, errors: errors };
  }

  function makeCode() {
    var a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", s = "";
    for (var i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
    return (track === "supplier" ? "S-" : "R-") + s;
  }

  function showResult(res) {
    $("form-wrap").classList.add("hidden");
    $("result").classList.remove("hidden");
    var who = track === "supplier" ? "supplier" : "store owner";
    if (res.status === "founding") {
      $("res-emoji").textContent = "🎉";
      $("res-title").textContent = "Application received!";
      $("res-text").innerHTML = "You're founding " + who + " applicant <strong>#" + res.position + "</strong> of " + C.spots[track] + ". Our team will review it and contact you on WhatsApp. Founding member benefits apply once your spot is confirmed.";
      $("ref-title").textContent = "Know other good sellers? Invite them";
      $("ref-text").textContent = "Share your link. People who apply with it are tagged to you.";
    } else {
      $("res-emoji").textContent = "⏳";
      $("res-title").textContent = "You're on the waitlist";
      $("res-text").innerHTML = "All " + C.spots[track] + " founding " + who + " spots are taken. Your waitlist position: <strong>#" + res.position + "</strong>. We'll message you on WhatsApp when a spot opens.";
      $("ref-title").textContent = "Move up by inviting others";
      $("ref-text").textContent = "Every supplier or store owner who applies with your link moves you up the waitlist.";
    }
    var link = location.href.split("?")[0].split("#")[0] + "?ref=" + encodeURIComponent(res.referralCode);
    $("ref-link").value = link;
    $("ref-code").textContent = res.referralCode;
    var brand = (window.BRAND && BRAND.name) || "Trends";
    $("wa-share").href = "https://wa.me/?text=" + encodeURIComponent("I applied for early access to " + brand + " — Pakistan's COD dropshipping platform for suppliers and store owners. Apply here: " + link);
    window.scrollTo(0, 0);
  }

  function submitDemo(d) {
    var status = taken(track) >= C.spots[track] ? "waitlist" : "founding";
    var pos = status === "founding" ? taken(track) + 1 : waitlistCount(track) + 1;
    var rec = Object.assign({}, d, { status: status, position: pos, referralCode: makeCode() });
    var all = local(); all.push(rec); localStorage.setItem(LS, JSON.stringify(all));
    return Promise.resolve(rec);
  }
  function submitLive(d) {
    return fetch(C.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.error) || "Submit failed"); return j; });
  }

  document.querySelectorAll("[data-track]").forEach(function (b) { b.addEventListener("click", function () { setTrack(b.getAttribute("data-track")); }); });
  $("apply-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = collect();
    if (c.errors.length) { toast("Please fill: " + c.errors.slice(0, 3).join(", ") + (c.errors.length > 3 ? "…" : "")); return; }
    var btn = $("submit-btn"); btn.disabled = true; btn.textContent = "Sending…";
    (C.FORM_ENDPOINT ? submitLive(c.data) : submitDemo(c.data))
      .then(function (res) { renderCounters(); showResult(res); })
      .catch(function () { toast("Couldn't send right now. Please check your internet and try again."); })
      .then(function () { btn.disabled = false; setTrack(track); });
  });
  $("copy-ref").addEventListener("click", function () {
    var i = $("ref-link"); i.select();
    (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.reject()).then(function () { toast("Link copied."); }, function () { document.execCommand && document.execCommand("copy"); toast("Link copied."); });
  });

  $("launch").textContent = C.launchText || "launching early 2027";
  $("mode-note").textContent = C.FORM_ENDPOINT ? "Your answers go securely to our team's sheet." : "Demo mode: answers are saved only in this browser until the Google Sheet link is added.";
  if (refBy) $("mode-note").textContent += " Referred by " + refBy + ".";
  setTrack(track);
  renderCounters();
  if (C.FORM_ENDPOINT) {
    fetch(C.FORM_ENDPOINT + (C.FORM_ENDPOINT.indexOf("?") > -1 ? "&" : "?") + "action=counts")
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.ok) { live = j.taken; live.waitlist = j.waitlist; renderCounters(); setTrack(track); } })
      .catch(function () {});
  }
})();
