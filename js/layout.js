(function () {
  var brand = window.BRAND || { name: "Trends", logoText: "Trends", tagline: "" };
  var root = document.documentElement.getAttribute("data-root") || computeRoot();

  function computeRoot() {
    var path = location.pathname.replace(/\\/g, "/");
    var depth = path.split("/").filter(Boolean).length;
    if (path.endsWith("/")) depth += 0;
    else depth -= 1;
    if (depth < 0) depth = 0;
    // files in /reseller, /supplier, /admin, /auth need ../
    if (/\/(reseller|supplier|admin|auth)(\/|$)/.test(path)) return "..";
    return ".";
  }

  function href(p) {
    if (p.charAt(0) === "/") p = p.slice(1);
    return (root === "." ? "" : root + "/") + p;
  }

  window.TRENDS = window.TRENDS || {};
  window.TRENDS.root = root;
  window.TRENDS.href = href;
  window.TRENDS.brand = brand;

  document.querySelectorAll("[data-brand]").forEach(function (el) {
    el.textContent = brand.name;
  });
  document.querySelectorAll("[data-logo]").forEach(function (el) {
    el.textContent = brand.logoText;
  });
  document.querySelectorAll("[data-tagline]").forEach(function (el) {
    el.textContent = el.getAttribute("data-tagline") === "short"
      ? (brand.shortTagline || brand.tagline)
      : brand.tagline;
  });
  document.title = document.title.replace(/\{Brand\}/g, brand.name);
  var titleEl = document.querySelector("title");
  if (titleEl && titleEl.textContent.indexOf(brand.name) === -1 && titleEl.textContent.indexOf("{Brand}") === -1) {
    // keep as authored
  }

  var layout = document.body.getAttribute("data-layout") || "public";
  mountRibbon();
  if (layout === "public") mountPublicNav();
  if (layout === "auth") mountAuthChrome();
  if (layout === "reseller" || layout === "supplier" || layout === "admin") mountApp(layout);
  mountFooter(layout);
  wireMobile();

  function logoHtml(light) {
    var color = light ? "color:#fff" : "";
    return '<a href="' + href("index.html") + '" class="flex items-center gap-2 font-semibold" style="' + color + '">' +
      '<span class="logo-mark">' + (brand.logoText || "T").charAt(0) + '</span>' +
      '<span class="text-lg tracking-tight" data-logo>' + brand.logoText + '</span></a>';
  }

  function mountRibbon() {
    if (document.querySelector(".demo-ribbon")) return;
    var bar = document.createElement("div");
    bar.className = "demo-ribbon";
    bar.innerHTML = "<strong>Demo prototype</strong> · Sample Pakistani data only — not live orders, inventory, or prices · Brand is easy to rename in <code>brand.config.js</code>";
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function mountPublicNav() {
    var host = document.getElementById("site-nav");
    if (!host) return;
    var page = document.body.getAttribute("data-page") || "";
    function item(key, label, url) {
      var on = page === key ? "text-primary font-semibold" : "text-muted hover:text-ink";
      return '<a class="' + on + '" href="' + href(url) + '">' + label + "</a>";
    }
    host.innerHTML =
      '<header class="public-nav sticky top-0 z-40">' +
      '<div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">' +
      logoHtml(false) +
      '<nav class="hidden md:flex items-center gap-6 text-sm">' +
      item("how", "How it works", "how-it-works.html") +
      item("resellers", "For resellers", "for-resellers.html") +
      item("suppliers", "For suppliers", "for-suppliers.html") +
      item("pricing", "Pricing", "pricing.html") +
      item("policies", "Policies", "policies.html") +
      "</nav>" +
      '<div class="flex items-center gap-2">' +
      '<button class="md:hidden btn-ghost btn-sm" data-open-nav aria-label="Open menu">Menu</button>' +
      '<a class="btn-ghost btn-sm hidden sm:inline-flex" href="' + href("auth/signup.html") + '">Log in</a>' +
      '<a class="btn-primary btn-sm" href="' + href("auth/signup.html") + '">Start</a>' +
      "</div></div>" +
      '<div class="hidden md:hidden border-t border-line px-4 pb-4" id="mobile-public-nav">' +
      item("how", "How it works", "how-it-works.html") +
      item("resellers", "For resellers", "for-resellers.html") +
      item("suppliers", "For suppliers", "for-suppliers.html") +
      item("pricing", "Pricing", "pricing.html") +
      item("policies", "Policies", "policies.html") +
      "</div></header>";
    var btn = host.querySelector("[data-open-nav]");
    var panel = host.querySelector("#mobile-public-nav");
    if (btn && panel) {
      btn.addEventListener("click", function () {
        panel.classList.toggle("hidden");
        panel.classList.toggle("flex");
        panel.classList.toggle("flex-col");
        panel.classList.toggle("gap-3");
        panel.classList.toggle("py-3");
      });
    }
  }

  function mountAuthChrome() {
    var host = document.getElementById("site-nav");
    if (!host) return;
    host.innerHTML = '<header class="public-nav"><div class="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">' +
      logoHtml(false) +
      '<a class="text-sm text-muted" href="' + href("index.html") + '">Back to home</a></div></header>';
  }

  function mountApp(role) {
    var host = document.getElementById("app-shell");
    var main = document.getElementById("app-main");
    if (!host || !main) return;
    var page = document.body.getAttribute("data-page") || "";
    var links = {
      reseller: [
        ["dashboard", "Overview", "reseller/dashboard.html"],
        ["catalog", "Catalog", "reseller/catalog.html"],
        ["orders", "Orders", "reseller/orders.html"],
        ["payouts", "Payouts", "reseller/payouts.html"],
        ["health", "Account Health", "reseller/account-health.html"],
        ["settings", "Settings", "reseller/settings.html"],
      ],
      supplier: [
        ["dashboard", "Overview", "supplier/dashboard.html"],
        ["products", "Listings", "supplier/products.html"],
        ["orders", "Orders to dispatch", "supplier/orders.html"],
        ["payouts", "Payouts", "supplier/payouts.html"],
        ["health", "Account Health", "supplier/account-health.html"],
        ["settings", "Settings", "supplier/settings.html"],
      ],
      admin: [
        ["exceptions", "Exception queue", "admin/exceptions.html"],
      ],
    }[role];

    var nav = links.map(function (l) {
      var on = page === l[0] ? " active" : "";
      return '<a class="' + on + '" href="' + href(l[2]) + '"><span>▸</span>' + l[1] + "</a>";
    }).join("");

    var who = role === "reseller" ? "Ayesha Mart · Reseller"
      : role === "supplier" ? "Lahore Home Goods · Supplier"
      : "Ops · Admin";

    var health = role === "admin" ? "" :
      (role === "reseller" ? window.DEMO.reseller.health : window.DEMO.supplier.health);

    var switcher = role === "admin"
      ? ""
      : '<a class="text-xs text-white/60 hover:text-white" href="' +
        href(role === "reseller" ? "supplier/dashboard.html" : "reseller/dashboard.html") +
        '">Switch to ' + (role === "reseller" ? "supplier" : "reseller") + " demo</a>";

    var aside =
      '<aside class="sidebar" id="sidebar">' +
      '<div class="px-4 pt-5 pb-4 flex items-center justify-between gap-2">' +
      '<a href="' + href("index.html") + '" class="flex items-center gap-2">' +
      '<span class="logo-mark">' + (brand.logoText || "T").charAt(0) + "</span>" +
      '<span class="text-white font-semibold text-lg" data-logo>' + brand.logoText + "</span></a>" +
      '<button class="md:hidden text-white/70" data-close-side>✕</button></div>' +
      '<div class="px-3 text-[11px] uppercase tracking-wider text-white/40 mb-2">' + role + "</div>" +
      '<nav class="px-3 flex flex-col gap-0.5">' + nav + "</nav>" +
      '<div class="sidebar-footer">' +
      (health ? '<div class="mb-2"><span class="badge badge-' + health + '">' + health + "</span></div>" : "") +
      '<div class="text-white/80 text-sm font-medium">' + who + "</div>" +
      switcher +
      '<div class="mt-2"><a class="!p-0 !text-white/50 hover:!bg-transparent" href="' + href("index.html") + '">Sign out (demo)</a></div>' +
      "</div></aside>";

    var top =
      '<div class="mobile-bar items-center justify-between px-4 py-3 bg-surface border-b border-line">' +
      '<button class="btn-ghost btn-sm" data-open-side>Menu</button>' +
      '<span class="font-semibold">' + (brand.logoText) + "</span>" +
      '<span class="badge badge-neutral">Demo</span></div>';

    host.insertAdjacentHTML("afterbegin", aside + top);
  }

  function mountFooter(layout) {
    var host = document.getElementById("site-footer");
    if (!host) return;
    if (layout !== "public" && layout !== "auth") {
      host.innerHTML = '<p class="text-xs text-muted text-center py-6">© ' + new Date().getFullYear() + " " + brand.name +
        " · Demo prototype · Courier names are logistics partners, not endorsements.</p>";
      return;
    }
    host.innerHTML =
      '<footer class="border-t border-line mt-16">' +
      '<div class="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">' +
      "<div>" + logoHtml(false) +
      '<p class="text-muted mt-3" data-tagline>' + brand.tagline + "</p></div>" +
      '<div><div class="font-semibold mb-2">Product</div>' +
      '<div class="flex flex-col gap-1 text-muted">' +
      '<a href="' + href("how-it-works.html") + '">How it works</a>' +
      '<a href="' + href("pricing.html") + '">Pricing</a>' +
      '<a href="' + href("for-resellers.html") + '">For resellers</a>' +
      '<a href="' + href("for-suppliers.html") + '">For suppliers</a></div></div>' +
      '<div><div class="font-semibold mb-2">Trust</div>' +
      '<div class="flex flex-col gap-1 text-muted">' +
      '<a href="' + href("policies.html") + '">Policies & help</a>' +
      '<a href="' + href("reseller/account-health.html") + '">Account Health</a>' +
      '<a href="' + href("auth/signup.html") + '">Sign up</a></div></div>' +
      '<div><div class="font-semibold mb-2">Logistics partners</div>' +
      '<p class="text-muted">PostEx, Trax, Leopards, TCS, and M&P are listed as courier partners for this prototype — not as endorsements.</p></div>' +
      "</div>" +
      '<div class="border-t border-line py-4 text-center text-xs text-muted">© ' +
      new Date().getFullYear() + " " + brand.name +
      " · Clickable prototype with demo data only.</div></footer>";
  }

  function wireMobile() {
    document.addEventListener("click", function (e) {
      var open = e.target.closest("[data-open-side]");
      var close = e.target.closest("[data-close-side]");
      var side = document.getElementById("sidebar");
      if (open && side) side.classList.add("open");
      if (close && side) side.classList.remove("open");
    });
  }
})();
