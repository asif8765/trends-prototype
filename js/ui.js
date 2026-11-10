(function () {
  var pkr = (window.DEMO && window.DEMO.pkr) || function (n) { return "Rs " + n; };

  window.toast = function (msg) {
    var stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    stack.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  };

  window.openModal = function (id) {
    var m = document.getElementById(id);
    if (m) m.classList.remove("hidden");
  };
  window.closeModal = function (id) {
    var m = document.getElementById(id);
    if (m) m.classList.add("hidden");
  };
  document.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close-modal")) {
      e.target.closest(".modal-backdrop").classList.add("hidden");
    }
  });

  window.renderChart = function (el, values) {
    if (!el) return;
    var max = Math.max.apply(null, values.concat([1]));
    el.className = "chart-bars";
    el.innerHTML = values.map(function (v, i) {
      var h = Math.round((v / max) * 100);
      var cls = i === values.length - 1 ? "bar alt" : "bar";
      return '<div class="' + cls + '" style="height:' + h + '%" title="Week ' + (i + 1) + ': ' + pkr(v) + '"></div>';
    }).join("");
  };

  window.statusBadge = function (s) {
    var key = String(s || "").replace(/\s+/g, "");
    var map = {
      Delivered: "healthy", "WhatsApp confirmed": "healthy", Confirmed: "healthy", Paid: "healthy",
      Connected: "healthy", Live: "healthy", Healthy: "healthy",
      "In transit": "neutral", Booked: "neutral", "Label printed": "neutral", "Handed to courier": "neutral",
      "Ready to pack": "neutral", Available: "healthy", "Pending COD": "neutral",
      Pending: "warning", "Awaiting confirmation": "warning", "Confirmation retry": "warning",
      "No answer ×2": "warning", Warning: "warning", Watching: "warning",
      RTO: "atrisk", "RTO deducted": "atrisk", Overdue: "danger",
      "Held — MAP": "warning", "Held — late dispatch": "warning",
      Restricted: "restricted", Suspended: "suspended",
      "Out of stock": "warning", "Agency plan required": "warning", High: "danger", Medium: "warning", Low: "neutral",
    };
    var cls = map[s] || "neutral";
    return '<span class="badge badge-' + cls + '">' + s + "</span>";
  };

  window.slaClass = function (hours) {
    if (hours < 0) return "sla-urgent";
    if (hours <= 6) return "sla-soon";
    return "sla-ok";
  };

  window.slaLabel = function (hours) {
    if (hours < 0) return Math.abs(hours) + "h overdue";
    return hours + "h left";
  };

  // OTP demo: any 6 digits
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (form.id === "otp-form") {
      e.preventDefault();
      var val = (form.querySelector('[name="otp"]') || {}).value || "";
      if (!/^\d{6}$/.test(val)) {
        toast("Enter any 6 digits to continue this demo.");
        return;
      }
      var role = sessionStorage.getItem("trends-role") || "reseller";
      var next = role === "supplier" ? "../supplier/dashboard.html" : "../reseller/dashboard.html";
      if (role === "supplier") next = "../auth/kyc.html";
      toast("OTP accepted (demo).");
      setTimeout(function () { location.href = next; }, 500);
    }
    if (form.id === "signup-form") {
      e.preventDefault();
      var role = (form.querySelector('[name="role"]:checked') || {}).value || "reseller";
      sessionStorage.setItem("trends-role", role);
      sessionStorage.setItem("trends-phone", (form.querySelector('[name="phone"]') || {}).value || "03xx-xxxxxxx");
      location.href = "otp.html";
    }
    if (form.id === "kyc-form") {
      e.preventDefault();
      toast("KYC submitted for auto-review (demo). Flagged cases go to the admin queue.");
      setTimeout(function () { location.href = "../supplier/dashboard.html"; }, 700);
    }
    if (form.id === "poa-form") {
      e.preventDefault();
      toast("Plan of Action submitted. A human reviews appeals and terminations only.");
      form.reset();
    }
    if (form.id === "withdraw-form") {
      e.preventDefault();
      toast("Withdrawal requested (demo). OTP would be sent to confirm a live payout.");
      closeModal("withdraw-modal");
    }
    if (form.id === "import-form") {
      e.preventDefault();
      var includeVideo = form.querySelector('[name="includeVideo"]');
      var store = (form.querySelector('[name="store"]') || {}).value || "";
      if (includeVideo && includeVideo.checked && /Daraz/i.test(store)) {
        toast("Daraz import is mostly images — the video cannot be pushed on this channel (demo). Listing staged without video.");
      } else if (includeVideo && includeVideo.checked) {
        toast("Listing + video staged in My Products and queued for import (demo).");
      } else {
        toast("Listing staged in My Products and queued for import (demo).");
      }
      closeModal("import-modal");
    }
    if (form.id === "listing-form") {
      e.preventDefault();
      var rights = form.querySelector('[name="rights"]');
      var file = form.querySelector('[name="videoFile"]');
      var link = form.querySelector('[name="socialLink"]');
      var hasMedia = (file && file.files && file.files.length) || (link && link.value && link.value.trim()) || (document.getElementById("video-file-name") && /platform copy|Supplier upload/i.test(document.getElementById("video-file-name").textContent || ""));
      if (hasMedia && rights && !rights.checked) {
        toast("Please declare that you own the rights to this video before saving.");
        return;
      }
      toast("Listing saved with video permissions (demo). A live build would transcode to 720p/1080p and store a platform copy.");
      closeModal("listing-modal");
    }
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-action]");
    if (!t) return;
    var act = t.getAttribute("data-action");
    if (act === "import") {
      openModal("import-modal");
    } else if (act === "download-pack") {
      toast("Ad creative pack (Urdu + English captions) would download here.");
    } else if (act === "download-ads") {
      if (t.getAttribute("data-locked") === "true") {
        toast("The supplier has not allowed paid-ads use of this video.");
        return;
      }
      var fmt = t.getAttribute("data-format") || "file";
      toast("Demo download: " + fmt + " ads-kit file would start here. No media file is hosted in this prototype.");
    } else if (act === "download-captions") {
      if (t.getAttribute("data-locked") === "true") {
        toast("The supplier has not allowed paid-ads use of this video.");
        return;
      }
      var lang = t.getAttribute("data-lang") || "captions";
      toast("Demo download: " + lang + " caption file (.srt) would start here.");
    } else if (act === "import-with-video") {
      var cb = document.querySelector("#import-form [name='includeVideo']");
      if (cb) cb.checked = true;
      openModal("import-modal");
    } else if (act === "print-label") {
      toast("Courier label queued for print (demo).");
    } else if (act === "connect-store") {
      toast("Store OAuth would open here. Marked connected in this demo.");
    } else if (act === "revoke-device") {
      toast("Device session revoked (demo).");
      t.closest("tr") && t.closest("tr").remove();
    } else if (act === "approve-ex") {
      toast("Exception marked resolved (demo).");
      t.closest("tr") && t.closest("tr").remove();
    } else if (act === "escalate-ex") {
      toast("Escalated to a human reviewer.");
    } else if (act === "filter") {
      /* handled per page */
    } else if (act === "copy-track") {
      toast("Tracking number copied (demo).");
    }
  });
})();
