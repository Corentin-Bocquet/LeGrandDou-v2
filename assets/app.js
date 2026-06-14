/* ============================================================
   LE GRAND DOU : moteur du site
   Saison (hiver/ete), langue (fr/en), rendu des listes,
   reveals au scroll, navigation mobile, utilitaires.
   ============================================================ */
(function () {
  "use strict";
  var D = window.GD_DATA;

  /* ---------- Icones SVG (zero emoji) ---------- */
  var ICONS = {
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="3.5" y1="7" x2="20.5" y2="17"/><line x1="3.5" y1="17" x2="20.5" y2="7"/><path d="M12 2l-2 3h4l-2-3zM12 22l-2-3h4l-2 3z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.6" y1="4.6" x2="6.4" y2="6.4"/><line x1="17.6" y1="17.6" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.4" y2="17.6"/><line x1="17.6" y1="6.4" x2="19.4" y2="4.6"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>',
    mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M2 20L9 6l4 7 3-4 6 11z"/></svg>',
    ski: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="5" r="2"/><path d="M7 8l5 3 1 5"/><path d="M3 21h18"/><path d="M9 21l3-5"/></svg>',
    shop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 8l1.5-4h13L20 8"/><path d="M4 8h16v3a3 3 0 0 1-3-1 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-3 1z"/><path d="M5 12v8h14v-8"/><path d="M9 20v-5h6v5"/></svg>',
    bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="14" rx="3"/><line x1="4" y1="10" x2="20" y2="10"/><circle cx="8.5" cy="19.5" r="1.5"/><circle cx="15.5" cy="19.5" r="1.5"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="3" width="14" height="13" rx="3"/><line x1="5" y1="9" x2="19" y2="9"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M8 16l-2 5M16 16l2 5M7 21h10"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M10.5 13.5L3 11l1.5-2 6.5 1 5-6 2 1-3 6.5 5 2.5-1 2-6-1-2.5 4-2-.5z"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 13l2-6h12l2 6"/><rect x="3" y="13" width="18" height="5" rx="1.5"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/></svg>',
    taxi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l1.5-5h11L19 12"/><rect x="4" y="12" width="16" height="5" rx="1.5"/><circle cx="8" cy="17.5" r="1.5"/><circle cx="16" cy="17.5" r="1.5"/><path d="M10 7V5h4v2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2-6-2-4 1-4 4 2 2 2"/><path d="M10 11l-3 2 1 3"/><path d="M14 15l2 6"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.7 0-3 1.1-3 4s1.3 4 3 4c1.1 0 2-.5 2.5-1.5M8 12h5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="15" r="4.5"/><path d="M11.5 11.5L20 3M16 7l3 3M13.5 9.5l2 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.8" r="0.4" fill="currentColor"/></svg>',
    health: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
  };
  window.GD_ICONS = ICONS;

  /* ---------- Etat : saison et langue ---------- */
  function autoSeason() {
    var m = new Date().getMonth() + 1; /* 12,1,2,3,4 = hiver */
    return (m === 12 || m <= 4) ? "winter" : "summer";
  }
  var season = localStorage.getItem("gd-season") || autoSeason();
  var lang = localStorage.getItem("gd-lang") || ((navigator.language || "fr").slice(0, 2) === "en" ? "en" : "fr");
  if (lang !== "fr" && lang !== "en") lang = "fr";

  /* appliquer immediatement, avant le chargement de la scene 3D */
  document.documentElement.setAttribute("data-season", season);
  document.documentElement.setAttribute("lang", lang);

  function t(key) {
    var dict = D.i18n[lang] || D.i18n.fr;
    return dict[key] !== undefined ? dict[key] : (D.i18n.fr[key] !== undefined ? D.i18n.fr[key] : key);
  }
  function tx(obj) { return (obj && (obj[lang] || obj.fr)) || ""; }

  window.GD = {
    get season() { return season; },
    get lang() { return lang; },
    t: t, tx: tx, icon: function (n) { return ICONS[n] || ""; }
  };

  function applySeason(s, animate) {
    season = s;
    localStorage.setItem("gd-season", s);
    document.documentElement.setAttribute("data-season", s);
    document.querySelectorAll(".season-switch button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-season") === s);
    });
    applyI18n();
    renderAll();
    document.dispatchEvent(new CustomEvent("gd:season", { detail: { season: s, animate: !!animate } }));
  }

  function applyLang(l) {
    lang = l;
    localStorage.setItem("gd-lang", l);
    document.documentElement.setAttribute("lang", l);
    var btn = document.querySelector(".lang-switch");
    if (btn) btn.textContent = l === "fr" ? "EN" : "FR";
    applyI18n();
    renderAll();
  }

  /* ---------- i18n : remplace les textes marques data-i18n ---------- */
  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    /* textes dependant de la saison : data-i18n-season="prefix" -> prefix.winter / prefix.summer */
    document.querySelectorAll("[data-i18n-season]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n-season") + "." + season);
    });
  }

  /* ---------- Rendus de listes ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderDoorSteps() {
    var host = document.getElementById("door-steps");
    if (!host) return;
    host.innerHTML = (D.doorSteps[lang] || D.doorSteps.fr).map(function (s) {
      return '<div class="step reveal vis"><div><h4>' + esc(s.t) + "</h4><p>" + esc(s.d) + "</p></div></div>";
    }).join("");
  }

  function renderEquipment(filter) {
    var host = document.getElementById("equip-list");
    if (!host) return;
    var q = (filter || "").toLowerCase().trim();
    host.innerHTML = D.equipment.map(function (cat) {
      var items = cat.items.filter(function (it) {
        if (!q) return true;
        return (tx(it) + " " + tx(it.loc)).toLowerCase().indexOf(q) !== -1;
      });
      if (!items.length) return "";
      return '<div class="card equip-cat"><h3>' + esc(tx(cat.cat)) +
        ' <span class="count">' + items.length + "</span></h3><ul>" +
        items.map(function (it) {
          return "<li><span>" + esc(tx(it)) + '</span><span class="loc">' + esc(tx(it.loc)) + "</span></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }

  function renderChecklists() {
    ["arrival", "departure", "packing"].forEach(function (k) {
      var host = document.getElementById("check-" + k);
      if (!host) return;
      host.innerHTML = (D.checklists[k][lang] || D.checklists[k].fr).map(function (item, i) {
        var id = "ck-" + k + "-" + i;
        var saved = localStorage.getItem("gd-" + id) === "1";
        return "<li><input type=\"checkbox\" id=\"" + id + "\"" + (saved ? " checked" : "") +
          "><label for=\"" + id + "\">" + esc(item) + "</label></li>";
      }).join("");
      host.querySelectorAll("input").forEach(function (cb) {
        cb.addEventListener("change", function () {
          localStorage.setItem("gd-" + cb.id, cb.checked ? "1" : "0");
        });
      });
    });
  }

  function renderLandmarks() {
    var host = document.getElementById("landmarks");
    if (!host) return;
    host.innerHTML = D.landmarks.map(function (l) {
      return '<div class="card act-card"><div class="card-icon">' + ICONS.pin + "</div><h3>" +
        esc(tx(l)) + "</h3><p>" + esc(tx(l.d)) + "</p></div>";
    }).join("");
  }

  var actFilter = "all";
  function renderActivities() {
    var host = document.getElementById("act-list");
    if (!host) return;
    var list = D.activities.filter(function (a) { return a.season === season; });
    if (actFilter === "free") list = list.filter(function (a) { return a.free; });
    else if (actFilter !== "all") list = list.filter(function (a) { return a.tags.indexOf(actFilter) !== -1; });
    host.innerHTML = list.map(function (a) {
      return '<article class="card act-card">' +
        (a.img ? '<div class="act-img"><img src="' + a.img + '" alt="' + esc(tx(a.t)) + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></div>' : "") +
        '<div class="act-head"><h3>' + esc(tx(a.t)) + "</h3>" +
        (a.free ? '<span class="badge">' + esc(t("act.filter.free")) + "</span>" : "") + "</div>" +
        "<p>" + esc(tx(a.d)) + "</p>" +
        '<div class="act-meta">' +
        '<div class="row">' + ICONS.pin + "<span><b>" + esc(t("act.card.where")) + " : </b>" + esc(tx(a.where)) + "</span></div>" +
        '<div class="row">' + ICONS.coin + "<span><b>" + esc(t("act.card.price")) + " : </b>" + esc(tx(a.price)) + "</span></div>" +
        "</div>" +
        '<div class="act-tip">' + esc(tx(a.tip)) + "</div>" +
        '<div class="act-links">' +
        '<a href="https://www.google.com/maps/search/?api=1&query=' + a.maps + '" target="_blank" rel="noopener">' + esc(t("act.maps")) + "</a>" +
        '<a href="' + a.link + '" target="_blank" rel="noopener">' + esc(t("act.site")) + "</a>" +
        "</div></article>";
    }).join("");
  }

  var shopFilter = "all";
  function renderShops() {
    var host = document.getElementById("shop-list");
    if (!host) return;
    var list = D.shops.filter(function (s) { return shopFilter === "all" || s.cat === shopFilter; });
    host.innerHTML = list.map(function (s) {
      return '<article class="card act-card">' +
        (s.img ? '<div class="act-img"><img src="' + s.img + '" alt="' + esc(tx(s.t)) + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></div>' : "") +
        '<div class="act-head"><h3>' + esc(tx(s.t)) + '</h3><span class="walk-pill">' + ICONS.walk + s.walk + " " + esc(t("shops.card.walk")) + "</span></div>" +
        "<p>" + esc(tx(s.d)) + "</p>" +
        '<div class="act-meta"><div class="row">' + ICONS.clock + "<span><b>" + esc(t("shops.card.hours")) + " : </b>" + esc(tx(s.hours)) + "</span></div></div>" +
        '<div class="act-tip">' + esc(tx(s.tip)) + "</div>" +
        '<div class="act-links"><a href="https://www.google.com/maps/search/?api=1&query=' + s.maps + '" target="_blank" rel="noopener">' + esc(t("shops.go")) + "</a></div>" +
        "</article>";
    }).join("");
  }

  function renderTransportModes() {
    var host = document.getElementById("modes-list");
    if (!host) return;
    host.innerHTML = D.transportModes.map(function (m) {
      return '<article class="card act-card">' +
        (m.img ? '<div class="act-img"><img src="' + m.img + '" alt="' + esc(tx(m.t)) + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></div>' : "") +
        '<div class="act-head"><div class="card-icon" style="margin-bottom:0">' + (ICONS[m.icon] || ICONS.pin) + "</div><h3>" + esc(tx(m.t)) + "</h3></div>" +
        "<p>" + esc(tx(m.d)) + "</p>" +
        '<div class="act-tip">' + esc(tx(m.tip)) + "</div>" +
        '<div class="act-links"><a href="' + m.link + '" target="_blank" rel="noopener">' + esc(tx(m.cta)) + "</a></div>" +
        "</article>";
    }).join("");
  }

  function renderEmergency() {
    var host = document.getElementById("emg-list");
    if (host) {
      host.innerHTML = D.emergency.map(function (e) {
        return '<div class="emg">' +
          (e.img ? '<div class="emg-img"><img src="' + e.img + '" alt="' + esc(tx(e.t)) + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></div>' : "") +
          '<b class="num">' + esc(e.num) + '</b><div class="t">' + esc(tx(e.t)) + "</div><p>" + esc(tx(e.d)) + "</p></div>";
      }).join("");
    }
    var hh = document.getElementById("health-list");
    if (hh) {
      hh.innerHTML = D.health.map(function (h) {
        return '<div class="card act-card">' +
          (h.img ? '<div class="act-img"><img src="' + h.img + '" alt="' + esc(tx(h.t)) + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'"></div>' : "") +
          '<div class="card-icon">' + ICONS.health + "</div><h3>" + esc(tx(h.t)) + "</h3><p>" + esc(tx(h.d)) + "</p></div>";
      }).join("");
    }
    var rl = document.getElementById("rules-list");
    if (rl) {
      rl.innerHTML = (D.rules[lang] || D.rules.fr).map(function (r) {
        return '<li style="list-style:none;display:flex;gap:10px"><span style="color:var(--accent-2);font-weight:700">&#8250;</span><span>' + esc(r) + "</span></li>";
      }).join("");
    }
  }

  function renderAll() {
    renderDoorSteps();
    renderEquipment(document.getElementById("equip-search") ? document.getElementById("equip-search").value : "");
    renderChecklists();
    renderLandmarks();
    renderActivities();
    renderShops();
    renderTransportModes();
    renderEmergency();
  }

  /* ---------- Demarrage ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.setAttribute("data-season", season);
    document.documentElement.setAttribute("lang", lang);

    /* injecter icones statiques data-icon */
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = ICONS[el.getAttribute("data-icon")] || "";
    });

    /* interrupteurs */
    document.querySelectorAll(".season-switch button").forEach(function (b) {
      b.addEventListener("click", function () { applySeason(b.getAttribute("data-season"), true); });
      b.classList.toggle("on", b.getAttribute("data-season") === season);
    });
    var langBtn = document.querySelector(".lang-switch");
    if (langBtn) {
      langBtn.textContent = lang === "fr" ? "EN" : "FR";
      langBtn.addEventListener("click", function () { applyLang(lang === "fr" ? "en" : "fr"); });
    }

    /* burger */
    var burger = document.querySelector(".burger");
    var links = document.querySelector(".nav-links");
    if (burger && links) {
      burger.addEventListener("click", function () { links.classList.toggle("open"); });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }

    /* page active dans la nav */
    var here = (location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("href") === here) a.classList.add("active");
    });

    /* recherche equipements */
    var es = document.getElementById("equip-search");
    if (es) es.addEventListener("input", function () { renderEquipment(es.value); });

    /* chips de filtres */
    document.querySelectorAll(".chips").forEach(function (group) {
      group.addEventListener("click", function (ev) {
        var c = ev.target.closest(".chip");
        if (!c) return;
        group.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); });
        c.classList.add("on");
        if (group.id === "act-chips") { actFilter = c.getAttribute("data-f"); renderActivities(); }
        if (group.id === "shop-chips") { shopFilter = c.getAttribute("data-f"); renderShops(); }
      });
    });

    /* copier l'adresse */
    var copyBtn = document.getElementById("copy-addr");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(D.address.full).then(function () {
          var span = copyBtn.querySelector("span");
          if (span) {
            span.textContent = t("tr.addr.copied");
            setTimeout(function () { span.textContent = t("tr.addr.copy"); }, 1800);
          }
        });
      });
    }

    /* image cassee : remplacement par un degrade elegant */
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function () {
        var div = document.createElement("div");
        div.style.cssText = "width:100%;height:100%;min-height:150px;background:linear-gradient(135deg,var(--surface-2),var(--surface));display:flex;align-items:center;justify-content:center;color:var(--ink-3);font-size:0.8rem;";
        div.textContent = img.alt || "Photo";
        img.replaceWith(div);
      });
    });

    applyI18n();
    renderAll();

    /* reveals */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  });
})();
