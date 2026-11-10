/* Shared product categories for Trends (Pakistan COD catalogue).
   Used by the apply form, home grid, catalog filters, AI listing builder,
   and the supplier listing form. Edit this file to change the list everywhere. */
(function (root) {
  var CATEGORIES = [
    { slug: "womens-fashion", name: "Women's Fashion & Clothing", ur: "خواتین کا فیشن", icon: "👗" },
    { slug: "mens-fashion", name: "Men's Fashion & Clothing", ur: "مردانہ فیشن", icon: "👔" },
    { slug: "kids-baby", name: "Kids & Baby", ur: "بچے اور نوزائیدہ", icon: "🍼" },
    { slug: "shoes-bags", name: "Shoes & Bags", ur: "جوتے اور بیگز", icon: "👜" },
    { slug: "jewellery-watches", name: "Jewellery & Watches", ur: "زیورات اور گھڑیاں", icon: "💍" },
    { slug: "beauty-skincare", name: "Beauty & Skincare", ur: "بیوٹی اور سکن کیئر", icon: "💄" },
    { slug: "fragrances", name: "Fragrances", ur: "خوشبوئیں", icon: "🌸" },
    { slug: "health-personal-care", name: "Health & Personal Care", ur: "صحت اور ذاتی نگہداشت", icon: "🧼" },
    { slug: "home-kitchen", name: "Home & Kitchen", ur: "گھر اور باورچی خانہ", icon: "🍳" },
    { slug: "home-decor-bedding", name: "Home Decor & Bedding", ur: "گھر کی سجاوٹ اور بستر", icon: "🛋️" },
    { slug: "mobile-accessories", name: "Mobile Accessories", ur: "موبائل لوازمات", icon: "📱" },
    { slug: "electronics-gadgets", name: "Electronics & Gadgets", ur: "الیکٹرانکس اور گیجٹس", icon: "🎧" },
    { slug: "computer-accessories", name: "Computer Accessories", ur: "کمپیوٹر لوازمات", icon: "⌨️" },
    { slug: "appliances-small", name: "Appliances (small)", ur: "چھوٹے گھریلو آلات", icon: "🌀" },
    { slug: "sports-fitness", name: "Sports & Fitness", ur: "کھیل اور فٹنس", icon: "🏋️" },
    { slug: "toys-games", name: "Toys & Games", ur: "کھلونے اور کھیل", icon: "🧸" },
    { slug: "car-bike-accessories", name: "Car & Bike Accessories", ur: "کار اور بائیک لوازمات", icon: "🛵" },
    { slug: "tools-hardware", name: "Tools & Hardware", ur: "اوزار اور ہارڈویئر", icon: "🔧" },
    { slug: "stationery-office", name: "Stationery & Office", ur: "سٹیشنری اور دفتر", icon: "📎" },
    { slug: "pet-supplies", name: "Pet Supplies", ur: "پالتو جانوروں کا سامان", icon: "🐾" },
    { slug: "islamic-products-gifts", name: "Islamic Products & Gifts", ur: "اسلامی مصنوعات اور تحائف", icon: "🕌" },
    { slug: "grocery-health-foods", name: "Grocery & Health Foods (packaged, non-perishable)", ur: "گروسری اور صحت بخش غذائیں", icon: "🥫" },
    { slug: "other", name: "Other (type your own)", ur: "دیگر (خود لکھیں)", icon: "✨", other: true }
  ];

  var PROHIBITED = [
    { name: "Medicines and prescription drugs", ur: "ادویات اور نسخے کی دوائیں" },
    { name: "Weapons", ur: "ہتھیار" },
    { name: "Counterfeit or replica brands", ur: "نقل یا جعلی برانڈز" },
    { name: "Adult items", ur: "بالغ مواد" },
    { name: "Hazardous or flammable goods", ur: "خطرناک یا آتش گیر اشیاء" },
    { name: "Live animals", ur: "زندہ جانور" },
    { name: "Tobacco and vapes", ur: "تمباکو اور ویپس" }
  ];

  var FREE_EN = "Applying is free. You pay nothing until the platform goes live for business in the coming weeks.";
  var FREE_UR = "درخواست دینا بالکل مفت ہے۔ جب تک کاروبار شروع نہیں ہوتا، آپ سے کوئی فیس نہیں لی جائے گی۔";
  var LAUNCH = "launching in the coming weeks";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function bySlug(slug) {
    slug = String(slug || "").toLowerCase();
    return CATEGORIES.filter(function (c) { return c.slug === slug; })[0] || null;
  }

  function byName(name) {
    name = String(name || "").trim().toLowerCase();
    return CATEGORIES.filter(function (c) { return c.name.toLowerCase() === name; })[0] || null;
  }

  function sellable() {
    return CATEGORIES.slice();
  }

  function catalog() {
    return CATEGORIES.filter(function (c) { return !c.other; });
  }

  function optionsHtml(selected) {
    var sel = String(selected || "");
    return catalog().map(function (c) {
      var on = c.name === sel || c.slug === sel ? " selected" : "";
      return "<option value=\"" + esc(c.name) + "\"" + on + ">" + c.icon + " " + esc(c.name) + "</option>";
    }).join("");
  }

  function notAllowedNote(policiesHref) {
    var href = policiesHref || "policies.html#prohibited";
    var list = PROHIBITED.map(function (p) { return p.name.charAt(0).toLowerCase() + p.name.slice(1); }).join(", ");
    // Oxford-style "and" before the last item
    var idx = list.lastIndexOf(", ");
    if (idx > -1) list = list.slice(0, idx) + ", and " + list.slice(idx + 2);
    return '<p class="not-allowed-note"><strong>Not allowed:</strong> ' + esc(list) +
      '. <a class="underline" href="' + esc(href) + '">See prohibited items</a>.</p>';
  }

  function freeApplyHtml(extraClass) {
    return '<div class="free-apply' + (extraClass ? " " + extraClass : "") + '">' +
      "<p>" + esc(FREE_EN) + "</p>" +
      '<p class="ur-hint mt-1">' + FREE_UR + "</p></div>";
  }

  function tilesHtml(opts) {
    opts = opts || {};
    var mode = opts.mode || "link"; // 'link' | 'select'
    var selected = opts.selected || [];
    var hrefBase = opts.hrefBase || "apply.html?cat=";
    var includeOther = !!opts.includeOther;
    var list = includeOther ? sellable() : catalog();
    return list.map(function (c) {
      var on = selected.indexOf(c.slug) > -1 || selected.indexOf(c.name) > -1;
      if (mode === "select") {
        return '<label class="cat-tile' + (on ? " on" : "") + '">' +
          '<input type="checkbox" name="categories" value="' + esc(c.slug) + '"' + (on ? " checked" : "") + " />" +
          '<span class="ico" aria-hidden="true">' + c.icon + "</span>" +
          '<span class="nm">' + esc(c.name) + "</span>" +
          '<span class="ur-hint">' + c.ur + "</span></label>";
      }
      return '<a class="cat-tile" href="' + esc(hrefBase + encodeURIComponent(c.slug)) + '">' +
        '<span class="ico" aria-hidden="true">' + c.icon + "</span>" +
        '<span class="nm">' + esc(c.name) + "</span>" +
        '<span class="ur-hint">' + c.ur + "</span></a>";
    }).join("");
  }

  function prohibitedListHtml() {
    return PROHIBITED.map(function (p) {
      return "<li><strong>" + esc(p.name) + '</strong> <span class="ur-hint">' + p.ur + "</span></li>";
    }).join("");
  }

  root.TRENDS_CATEGORIES = CATEGORIES;
  root.TRENDS_PROHIBITED = PROHIBITED;
  root.TrendsCats = {
    list: CATEGORIES,
    prohibited: PROHIBITED,
    freeEn: FREE_EN,
    freeUr: FREE_UR,
    launchText: LAUNCH,
    bySlug: bySlug,
    byName: byName,
    sellable: sellable,
    catalog: catalog,
    optionsHtml: optionsHtml,
    notAllowedNote: notAllowedNote,
    freeApplyHtml: freeApplyHtml,
    tilesHtml: tilesHtml,
    prohibitedListHtml: prohibitedListHtml,
    esc: esc
  };
})(window);
