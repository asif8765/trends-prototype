/* Early-access application + waitlist. Static-site friendly. */
(function () {
  var C = window.APPLY_CONFIG || { FORM_ENDPOINT: "", spots: { supplier: 80, reseller: 120 }, demoTaken: { supplier: 57, reseller: 96 } };
  var $ = function (id) { return document.getElementById(id); };
  var LS = "trends-applications";
  var params = new URLSearchParams(location.search);
  var forceFull = params.get("full") === "1";
  var refBy = (params.get("ref") || "").replace(/[^A-Z0-9-]/gi, "").slice(0, 16);
  var trackParam = (params.get("track") || "").toLowerCase();
  var role = trackParam === "reseller" || trackParam === "supplier" || trackParam === "both" ? trackParam : null;
  var live = null;
  var helperAnswers = { helperHasOwnStock: "", helperWantOthersToSell: "" };
  var draft = {};

  var Cats = window.TrendsCats;
  var COURIERS = ["PostEx", "Trax", "Leopards", "TCS", "M&P", "Call Courier", "BlueEx", "Rider", "Own delivery / other"];
  var CITIES = (window.DEMO && DEMO.cities ? DEMO.cities : []).concat(["Other"]);

  var ROLE_LABEL = {
    supplier: "Supplier (Wholesaler) — I have stock",
    reseller: "Store owner (Reseller) — I sell online",
    both: "Both — Supplier (Wholesaler) and Store owner (Reseller)"
  };

  var SHARED = [
    { n: "contactName", l: "Your name", ur: "آپ کا نام", t: "text", req: true },
    { n: "whatsapp", l: "WhatsApp number", ur: "واٹس ایپ نمبر", t: "tel", req: true, ph: "03XX XXXXXXX" },
    { n: "city", l: "City", ur: "شہر", t: "select", opts: CITIES, req: true }
  ];

  var SUPPLIER = [
    { n: "businessName", l: "Business name", ur: "کاروبار کا نام", t: "text", req: true },
    { n: "categories", l: "What do you supply?", ur: "آپ کیا سپلائی کرتے ہیں؟", t: "categories", req: true },
    { n: "hasStock", l: "Do you currently hold stock of these products?", ur: "کیا ان پروڈکٹس کا سٹاک آپ کے پاس موجود ہے؟", t: "radio", opts: ["Yes", "No"], req: true },
    { n: "stockCity", l: "Where is your stock/warehouse? (city)", ur: "آپ کا سٹاک / گودام کس شہر میں ہے؟", t: "select", opts: CITIES, req: true },
    { n: "dispatchPerDay", l: "How many units can you dispatch per day?", ur: "آپ ایک دن میں کتنے یونٹ بھیج سکتے ہیں؟", t: "radio", opts: ["1–10", "11–50", "51–200", "200+"], req: true },
    { n: "skus", l: "How many products (SKUs)?", ur: "کتنی پروڈکٹس", t: "radio", opts: ["1–20", "21–100", "101–500", "500+"], req: true },
    { n: "monthlyOrders", l: "Orders per month (all channels)", ur: "ماہانہ آرڈر", t: "radio", opts: ["Under 300", "300–1,000", "1,000–5,000", "5,000+"], req: true },
    { n: "couriers", l: "Courier(s) you use now", ur: "کوریئر", t: "multi", opts: COURIERS },
    { n: "sellsOn", l: "Where do you sell online now?", ur: "آن لائن کہاں بیچتے ہیں؟", t: "multi", opts: ["Own website", "Daraz", "Facebook", "Instagram", "TikTok", "WhatsApp only", "Not online yet"] },
    { n: "hasVideos", l: "Do you have product videos?", ur: "پروڈکٹ ویڈیوز ہیں؟", t: "radio", opts: ["Yes", "No"], req: true },
    { n: "dispatch48h", l: "Can you dispatch within 24–48 hours?", ur: "24–48 گھنٹے میں ڈسپیچ؟", t: "radio", opts: ["Yes", "Sometimes", "No"], req: true }
  ];

  var RESELLER = [
    { n: "categories", l: "What do you want to sell?", ur: "آپ کیا بیچنا چاہتے ہیں؟", t: "categories", req: true },
    { n: "storeType", l: "Your store", ur: "آپ کا اسٹور", t: "multi", opts: ["Shopify", "WooCommerce", "Facebook page", "Instagram", "TikTok", "None yet"], req: true },
    { n: "resellerMonthlyOrders", l: "Orders per month from your store / page", ur: "آپ کے اسٹور کے ماہانہ آرڈر", t: "radio", opts: ["Just starting", "Under 100", "100–500", "500–2,000", "2,000+"], req: true },
    { n: "deliveryRatio", l: "Your current delivery ratio (COD delivered %)", ur: "ڈیلیوری ریشو", t: "radio", opts: ["Not sure / new", "Below 60%", "60–75%", "75–85%", "Above 85%"], req: true },
    { n: "wouldPay", l: "Which monthly plan would you pay for?", ur: "ماہانہ کتنا ادا کریں گے؟", t: "radio", opts: ["Rs 2,999 (Basic)", "Rs 7,999 (Pro)", "Rs 19,999 (Agency)", "Not yet"], req: true }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function local() { try { return JSON.parse(localStorage.getItem(LS) || "[]"); } catch (e) { return []; } }

  function countsAs(rec, t) {
    return rec.role === t || rec.track === t || rec.role === "both" || rec.track === "both";
  }
  function recStatus(rec, t) {
    if (rec.role === "both" || rec.track === "both") {
      if (t === "supplier") return rec.supplierStatus || rec.status;
      if (t === "reseller") return rec.resellerStatus || rec.status;
    }
    return rec.status;
  }
  function taken(t) {
    if (forceFull) return C.spots[t];
    if (live && typeof live[t] === "number") return live[t];
    return Math.min(C.spots[t], C.demoTaken[t] + local().filter(function (a) { return countsAs(a, t) && recStatus(a, t) === "founding"; }).length);
  }
  function waitlistCount(t) {
    if (live && live.waitlist && typeof live.waitlist[t] === "number") return live.waitlist[t];
    return (forceFull ? 143 : 0) + local().filter(function (a) { return countsAs(a, t) && recStatus(a, t) === "waitlist"; }).length;
  }

  function renderCounters() {
    $("counters").innerHTML = ["supplier", "reseller"].map(function (t) {
      var total = C.spots[t], used = taken(t), left = Math.max(0, total - used);
      var pct = Math.round((used / total) * 100);
      var label = t === "supplier" ? "Supplier (Wholesaler) spots" : "Store owner (Reseller) spots";
      return '<div class="card p-4"><div class="flex justify-between items-baseline"><span class="font-semibold">' + label + '</span><span class="text-sm text-muted">' + total + ' total</span></div>' +
        '<div class="font-display text-4xl mt-1 ' + (left ? "" : "metric-bad") + '">' + (left ? left + ' <span class="text-base text-muted font-sans">left</span>' : "Full — waitlist open") + "</div>" +
        '<div class="progress gold mt-2"><span style="width:' + pct + '%"></span></div></div>';
    }).join("");
  }

  function fieldsFor(r) {
    var list = SHARED.slice();
    if (r === "supplier" || r === "both") list = list.concat(SUPPLIER);
    if (r === "reseller" || r === "both") {
      var res = RESELLER;
      if (r === "both") {
        // categories already asked on the supplier half
        res = RESELLER.filter(function (f) { return f.n !== "categories"; });
      }
      list = list.concat(res);
    }
    return list;
  }

  function selectedSlugs() {
    return Array.prototype.map.call(document.querySelectorAll('[name="categories"]:checked'), function (i) { return i.value; });
  }

  function toggleOther() {
    var wrap = document.getElementById("other-cat-wrap");
    var input = document.getElementById("other-cat");
    if (!wrap) return;
    var on = selectedSlugs().indexOf("other") > -1;
    wrap.classList.toggle("hidden", !on);
    if (input) {
      if (on) input.setAttribute("required", "required");
      else input.removeAttribute("required");
    }
  }

  function preselectFromUrl() {
    var slug = (params.get("cat") || "").toLowerCase();
    if (!slug || !Cats || !Cats.bySlug(slug)) return;
    var box = document.querySelector('[name="categories"][value="' + slug + '"]');
    if (box) {
      box.checked = true;
      var tile = box.closest(".cat-tile");
      if (tile) tile.classList.add("on");
    }
    toggleOther();
  }

  function categoryFieldHtml(f) {
    var tiles = (Cats && Cats.tilesHtml)
      ? Cats.tilesHtml({ mode: "select", includeOther: true, selected: [] })
      : "";
    var note = (Cats && Cats.notAllowedNote) ? Cats.notAllowedNote("policies.html#prohibited") : "";
    var lab = '<div class="field-row"><label class="field">' + f.l + (f.req ? ' <span class="metric-bad">*</span>' : "") + '</label><span class="ur-hint">' + f.ur + "</span></div>";
    return '<fieldset data-group="categories" ' + (f.req ? 'data-req="1"' : "") + ' id="category-field">' +
      lab +
      '<p class="text-sm text-muted mb-3">Tap every category that applies. Pick at least one.</p>' +
      '<div class="cat-grid" id="cat-grid">' + tiles + "</div>" +
      '<div id="other-cat-wrap" class="hidden mt-3">' +
        '<label class="field" for="other-cat">Type your own category <span class="metric-bad">*</span></label>' +
        '<input id="other-cat" name="otherCategory" type="text" placeholder="e.g. Wedding favours, school uniforms" maxlength="80" />' +
      "</div>" +
      note +
      "</fieldset>";
  }

  function fieldHtml(f) {
    if (f.t === "categories") return categoryFieldHtml(f);

    var extra = "";
    if (f.n === "hasStock") {
      extra = '<div id="switch-prompt" class="switch-prompt hidden mt-3">' +
        "<p>Sounds like Store owner is a better fit for you — switch?</p>" +
        '<p class="ur-hint mt-1">لگتا ہے اسٹور مالک (ری سیلر) آپ کے لیے بہتر ہے — تبدیل کریں؟</p>' +
        '<div class="flex flex-wrap gap-2 mt-3">' +
          '<button type="button" class="btn-accent btn-sm" id="switch-to-reseller">Switch to Store owner (Reseller)</button>' +
          '<button type="button" class="btn-ghost btn-sm" id="stay-supplier">No, I will have stock</button>' +
        "</div></div>";
    }

    var lab = '<div class="field-row"><label class="field" for="f-' + f.n + '" style="margin:0">' + f.l + (f.req ? ' <span class="metric-bad">*</span>' : "") + '</label><span class="ur-hint">' + f.ur + "</span></div>";
    if (f.t === "text" || f.t === "tel") {
      return "<div>" + lab + '<input id="f-' + f.n + '" name="' + f.n + '" type="' + f.t + '" ' + (f.t === "tel" ? 'inputmode="tel" autocomplete="tel"' : "") + ' placeholder="' + (f.ph || "") + '" ' + (f.req ? "required" : "") + " /></div>";
    }
    if (f.t === "select") {
      return '<div data-field="' + f.n + '">' + lab + '<select id="f-' + f.n + '" name="' + f.n + '" ' + (f.req ? "required" : "") + '><option value="">Choose…</option>' + f.opts.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select></div>";
    }
    var type = f.t === "multi" ? "checkbox" : "radio";
    return '<fieldset data-group="' + f.n + '" data-field="' + f.n + '" ' + (f.req ? 'data-req="1"' : "") + ">" + lab + '<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">' +
      f.opts.map(function (o) { return '<label class="choice"><input type="' + type + '" name="' + f.n + '" value="' + esc(o) + '" />' + esc(o) + "</label>"; }).join("") + "</div>" + extra + "</fieldset>";
  }

  function sectionHead(title, ur) {
    return '<div class="form-section-head"><h3 class="font-semibold">' + title + '</h3><p class="ur-hint">' + ur + "</p></div>";
  }

  function bothCheckboxHtml() {
    if (role === "supplier") {
      return '<label class="both-check"><input type="checkbox" id="also-both" />' +
        "<span>I also want to sell online as a store owner (apply for both)</span></label>";
    }
    if (role === "reseller") {
      return '<label class="both-check"><input type="checkbox" id="also-both" />' +
        "<span>I also have my own stock and want other sellers to sell it (apply for both)</span></label>";
    }
    return '<p class="text-sm text-muted">You are applying for both roles. Supplier questions come first, then store-owner questions.</p>';
  }

  function stashDraft() {
    var form = $("apply-form");
    if (!form) return;
    Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (el) {
      if (!el.name || el.name === "consent") return;
      if (el.type === "checkbox" || el.type === "radio") return;
      draft[el.name] = el.value;
    });
    var groups = {};
    Array.prototype.forEach.call(form.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'), function (el) {
      if (!el.name || el.name === "consent" || el.name === "helperQ1" || el.name === "helperQ2") return;
      if (!groups[el.name]) groups[el.name] = [];
      groups[el.name].push(el.value);
    });
    Object.keys(groups).forEach(function (k) { draft[k] = groups[k]; });
  }

  function restoreDraft() {
    Object.keys(draft).forEach(function (name) {
      var val = draft[name];
      if (Array.isArray(val)) {
        val.forEach(function (v) {
          var safe = (window.CSS && CSS.escape) ? CSS.escape(v) : String(v).replace(/"/g, "\\");
          var el = document.querySelector('[name="' + name + '"][value="' + safe + '"]');
          if (el) {
            el.checked = true;
            var tile = el.closest(".cat-tile");
            if (tile) tile.classList.add("on");
          }
        });
      } else {
        var el = document.querySelector('[name="' + name + '"]');
        if (el && el.type !== "checkbox" && el.type !== "radio") el.value = val;
      }
    });
    toggleOther();
    syncStockUi();
  }

  function renderRoleBanner() {
    var html = '<div><div class="text-xs text-muted uppercase tracking-wide">Applying as</div>' +
      '<div class="font-semibold">' + ROLE_LABEL[role] + "</div></div>" +
      '<button type="button" class="change-role" id="change-role">Change</button>';
    $("role-banner").innerHTML = html;
    $("change-role").addEventListener("click", function () {
      stashDraft();
      role = null;
      showRoleStep();
      try {
        var u = new URL(location.href);
        u.searchParams.delete("track");
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) {}
    });
  }

  function bindFormExtras() {
    var grid = document.getElementById("cat-grid");
    if (grid) {
      grid.addEventListener("change", function () { toggleOther(); });
      preselectFromUrl();
    }
    var hasStock = document.querySelectorAll('[name="hasStock"]');
    hasStock.forEach(function (el) {
      el.addEventListener("change", syncStockUi);
    });
    var sw = $("switch-to-reseller");
    if (sw) sw.addEventListener("click", function () {
      stashDraft();
      startForm("reseller");
    });
    var stay = $("stay-supplier");
    if (stay) stay.addEventListener("click", function () {
      var prompt = $("switch-prompt");
      if (prompt) prompt.classList.add("dismissed");
    });
    var also = $("also-both");
    if (also) {
      also.addEventListener("change", function () {
        stashDraft();
        startForm(also.checked ? "both" : (role === "both" ? "supplier" : role));
      });
    }
    syncStockUi();
  }

  function syncStockUi() {
    var chosen = document.querySelector('[name="hasStock"]:checked');
    var prompt = $("switch-prompt");
    var stockCity = document.querySelector('[data-field="stockCity"]') || $("f-stockCity") && $("f-stockCity").closest("div");
    var dispatch = document.querySelector('[data-field="dispatchPerDay"]');
    var noStock = chosen && chosen.value === "No";
    if (prompt && !prompt.classList.contains("dismissed")) prompt.classList.toggle("hidden", !noStock);
    if (prompt && !noStock) prompt.classList.remove("dismissed");
    // Keep warehouse + dispatch visible; if they said No and have not dismissed, they can still switch.
  }

  function submitLabel() {
    if (!role) return "Submit application";
    var tracks = role === "both" ? ["supplier", "reseller"] : [role];
    var allFull = tracks.every(function (t) { return taken(t) >= C.spots[t]; });
    return allFull ? "Join the waitlist" : "Submit application";
  }

  function renderForm() {
    var html = bothCheckboxHtml();
    if (role === "both") {
      html += sectionHead("1. Supplier (Wholesaler) — I have stock", "سپلائر / ہول سیلر");
      html += SHARED.map(fieldHtml).join("");
      html += SUPPLIER.map(fieldHtml).join("");
      html += sectionHead("2. Store owner (Reseller) — I sell online", "اسٹور مالک / ری سیلر");
      html += RESELLER.filter(function (f) { return f.n !== "categories"; }).map(fieldHtml).join("");
      $("fields").innerHTML = '<div class="space-y-4">' + html + "</div>";
    } else {
      html += fieldsFor(role).map(fieldHtml).join("");
      $("fields").innerHTML = '<div class="space-y-4">' + html + "</div>";
    }
    $("submit-btn").textContent = submitLabel();
    bindFormExtras();
    restoreDraft();
  }

  function showRoleStep() {
    $("role-step").classList.remove("hidden");
    $("form-step").classList.add("hidden");
    window.scrollTo(0, $("form-wrap").offsetTop - 20);
  }

  function startForm(r) {
    role = r;
    $("role-step").classList.add("hidden");
    $("form-step").classList.remove("hidden");
    renderRoleBanner();
    renderForm();
    var top = $("form-step").getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function collect() {
    var data = {
      role: role,
      track: role,
      referredBy: refBy,
      submittedAt: new Date().toISOString(),
      page: location.href.split("?")[0],
      helperHasOwnStock: helperAnswers.helperHasOwnStock || "",
      helperWantOthersToSell: helperAnswers.helperWantOthersToSell || ""
    };
    var errors = [];
    var schema = [];
    if (role === "both") {
      schema = SHARED.concat(SUPPLIER).concat(RESELLER.filter(function (f) { return f.n !== "categories"; }));
    } else {
      schema = fieldsFor(role);
    }
    schema.forEach(function (f) {
      if (f.t === "categories") {
        var slugs = selectedSlugs();
        var names = slugs.map(function (s) {
          var c = Cats && Cats.bySlug(s);
          return c ? c.name : s;
        });
        data.categories = names.join(", ");
        data.categorySlugs = slugs.join(",");
        var otherVal = ((document.getElementById("other-cat") || {}).value || "").trim();
        data.otherCategory = slugs.indexOf("other") > -1 ? otherVal : "";
        if (f.req && !slugs.length) errors.push(f.l);
        if (slugs.indexOf("other") > -1 && !otherVal) errors.push("Other category (please type your own)");
      } else if (f.t === "multi" || f.t === "radio") {
        var vals = Array.prototype.map.call(document.querySelectorAll('[name="' + f.n + '"]:checked'), function (i) { return i.value; });
        data[f.n] = vals.join(", ");
        if (f.req && !vals.length) errors.push(f.l);
      } else {
        var el = document.querySelector('[name="' + f.n + '"]');
        var v = el ? (el.value || "").trim() : "";
        data[f.n] = v;
        if (f.req && !v) errors.push(f.l);
      }
    });
    if (role === "reseller" && data.resellerMonthlyOrders && !data.monthlyOrders) {
      data.monthlyOrders = data.resellerMonthlyOrders;
    }
    if (data.whatsapp && !/^(\+?92|0)3\d{2}[\s-]?\d{7}$/.test(data.whatsapp.replace(/\s+/g, ""))) {
      errors.push("WhatsApp number (format 03XX XXXXXXX)");
    }
    if (!document.querySelector('[name="consent"]').checked) errors.push("consent checkbox");
    if (data.hasStock === "No" && role !== "reseller") {
      var prompt = $("switch-prompt");
      if (prompt && !prompt.classList.contains("dismissed")) {
        prompt.classList.remove("hidden");
        prompt.scrollIntoView({ behavior: "smooth", block: "center" });
        errors.push("stock question (switch to Store owner, or confirm you will have stock)");
      }
    }
    return { data: data, errors: errors };
  }

  function makeCode(r) {
    var a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", s = "";
    for (var i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
    var prefix = r === "supplier" ? "S-" : r === "reseller" ? "R-" : "B-";
    return prefix + s;
  }

  function trackPhrase(t) {
    return t === "supplier" ? "supplier (wholesaler)" : "store owner (reseller)";
  }

  function resultLine(t, status, position) {
    if (status === "founding") {
      return "You're founding " + trackPhrase(t) + " applicant <strong>#" + position + "</strong> of " + C.spots[t] + ".";
    }
    return "All " + C.spots[t] + " founding " + trackPhrase(t) + " spots are taken. Your waitlist position: <strong>#" + position + "</strong>.";
  }

  function showResult(res) {
    $("form-wrap").classList.add("hidden");
    $("result").classList.remove("hidden");
    var parts = [];
    var anyFounding = false;
    if (role === "both") {
      var s = res.supplier || { status: res.status, position: res.position };
      var r = res.reseller || { status: res.status, position: res.position };
      parts.push(resultLine("supplier", s.status, s.position));
      parts.push(resultLine("reseller", r.status, r.position));
      anyFounding = s.status === "founding" || r.status === "founding";
    } else {
      parts.push(resultLine(role, res.status, res.position));
      anyFounding = res.status === "founding";
    }
    parts.push("Our team will review it and contact you on WhatsApp." + (anyFounding ? " Founding member benefits apply once your spot is confirmed." : " We'll message you when a spot opens."));
    $("res-emoji").textContent = anyFounding ? "🎉" : "⏳";
    $("res-title").textContent = anyFounding ? "Application received!" : "You're on the waitlist";
    $("res-text").innerHTML = parts.join(" ");
    $("ref-title").textContent = anyFounding ? "Know other good sellers? Invite them" : "Move up by inviting others";
    $("ref-text").textContent = anyFounding
      ? "Share your link. People who apply with it are tagged to you."
      : "Every supplier or store owner who applies with your link moves you up the waitlist.";
    var link = location.href.split("?")[0].split("#")[0] + "?ref=" + encodeURIComponent(res.referralCode);
    $("ref-link").value = link;
    $("ref-code").textContent = res.referralCode;
    var brand = (window.BRAND && BRAND.name) || "Trends";
    $("wa-share").href = "https://wa.me/?text=" + encodeURIComponent("I applied for early access to " + brand + " — Pakistan's COD dropshipping platform for suppliers and store owners. Apply here: " + link);
    window.scrollTo(0, 0);
  }

  function submitDemo(d) {
    var rec = Object.assign({}, d, { referralCode: makeCode(role) });
    if (role === "both") {
      rec.supplierStatus = taken("supplier") >= C.spots.supplier ? "waitlist" : "founding";
      rec.supplierPosition = rec.supplierStatus === "founding" ? taken("supplier") + 1 : waitlistCount("supplier") + 1;
      rec.resellerStatus = taken("reseller") >= C.spots.reseller ? "waitlist" : "founding";
      rec.resellerPosition = rec.resellerStatus === "founding" ? taken("reseller") + 1 : waitlistCount("reseller") + 1;
      rec.status = rec.supplierStatus === "founding" || rec.resellerStatus === "founding" ? "founding" : "waitlist";
      rec.position = rec.supplierPosition;
      rec.supplier = { status: rec.supplierStatus, position: rec.supplierPosition };
      rec.reseller = { status: rec.resellerStatus, position: rec.resellerPosition };
    } else {
      rec.status = taken(role) >= C.spots[role] ? "waitlist" : "founding";
      rec.position = rec.status === "founding" ? taken(role) + 1 : waitlistCount(role) + 1;
    }
    var all = local(); all.push(rec); localStorage.setItem(LS, JSON.stringify(all));
    return Promise.resolve(rec);
  }
  function submitLive(d) {
    return fetch(C.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.error) || "Submit failed"); return j; });
  }

  function openHelper() {
    $("helper").classList.remove("hidden");
    $("helper").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateHelper() {
    var q1 = (document.querySelector('[name="helperQ1"]:checked') || {}).value || "";
    var q2 = (document.querySelector('[name="helperQ2"]:checked') || {}).value || "";
    helperAnswers.helperHasOwnStock = q1;
    helperAnswers.helperWantOthersToSell = q1 === "Yes" ? q2 : (q1 === "No" ? "n/a" : "");
    $("helper-q2-wrap").classList.toggle("hidden", q1 !== "Yes");
    if (q1 !== "Yes") {
      document.querySelectorAll('[name="helperQ2"]').forEach(function (el) { el.checked = false; });
    }
    var box = $("helper-result");
    var rec = null, reason = "";
    if (q1 === "No") {
      rec = "reseller";
      reason = "Join as Store owner (Reseller) — I sell online. You don't need to keep stock; the supplier packs and ships.";
    } else if (q1 === "Yes" && q2 === "Yes") {
      rec = "supplier";
      reason = "Join as Supplier (Wholesaler) — I have stock. You keep the goods and other store owners can sell them for you.";
    } else if (q1 === "Yes" && q2 === "No") {
      rec = "reseller";
      reason = "Join as Store owner (Reseller) — I sell online. You can sell here without using your own stock, and you can add your own stock later.";
    }
    if (!rec) { box.classList.add("hidden"); box.innerHTML = ""; return; }
    box.classList.remove("hidden");
    box.innerHTML = "<p class='font-semibold'>We recommend: " + ROLE_LABEL[rec] + "</p>" +
      "<p class='text-sm mt-1'>" + reason + "</p>" +
      (rec === "reseller" && q1 === "Yes" && q2 === "No"
        ? "<p class='ur-hint mt-1'>آپ بغیر اپنے سٹاک کے بیچ سکتے ہیں، اور بعد میں اپنا سٹاک بھی شامل کر سکتے ہیں۔</p>"
        : "") +
      '<button type="button" class="btn-primary mt-3" id="helper-continue">Continue as ' + (rec === "supplier" ? "Supplier (Wholesaler)" : "Store owner (Reseller)") + "</button>";
    $("helper-continue").addEventListener("click", function () { startForm(rec); });
  }

  document.querySelectorAll("[data-pick]").forEach(function (b) {
    b.addEventListener("click", function () { startForm(b.getAttribute("data-pick")); });
  });
  $("open-helper").addEventListener("click", function () {
    var hidden = $("helper").classList.contains("hidden");
    if (hidden) openHelper();
    else $("helper").classList.add("hidden");
  });
  document.querySelectorAll('[name="helperQ1"], [name="helperQ2"]').forEach(function (el) {
    el.addEventListener("change", updateHelper);
  });

  $("apply-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = collect();
    if (c.errors.length) { toast("Please fill: " + c.errors.slice(0, 3).join(", ") + (c.errors.length > 3 ? "…" : "")); return; }
    var btn = $("submit-btn"); btn.disabled = true; btn.textContent = "Sending…";
    (C.FORM_ENDPOINT ? submitLive(c.data) : submitDemo(c.data))
      .then(function (res) { renderCounters(); showResult(res); })
      .catch(function () { toast("Couldn't send right now. Please check your internet and try again."); })
      .then(function () { btn.disabled = false; if (role && !$("form-wrap").classList.contains("hidden")) { $("submit-btn").textContent = submitLabel(); } });
  });
  $("copy-ref").addEventListener("click", function () {
    var i = $("ref-link"); i.select();
    (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.reject()).then(function () { toast("Link copied."); }, function () { document.execCommand && document.execCommand("copy"); toast("Link copied."); });
  });

  $("launch").textContent = C.launchText || (Cats && Cats.launchText) || "launching in the coming weeks";
  $("mode-note").textContent = C.FORM_ENDPOINT ? "Your answers go securely to our team's sheet." : "Demo mode: answers are saved only in this browser until the Google Sheet link is added.";
  if (refBy) $("mode-note").textContent += " Referred by " + refBy + ".";

  renderCounters();
  if (role) startForm(role);
  if (location.hash === "#not-sure" || location.hash === "#helper" || params.get("help") === "1") {
    if (!role) openHelper();
  }

  if (C.FORM_ENDPOINT) {
    fetch(C.FORM_ENDPOINT + (C.FORM_ENDPOINT.indexOf("?") > -1 ? "&" : "?") + "action=counts")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.ok) {
          live = j.taken;
          live.waitlist = j.waitlist;
          renderCounters();
          if (role && $("submit-btn")) $("submit-btn").textContent = submitLabel();
        }
      })
      .catch(function () {});
  }
})();
